(import reader)
(import compiler)
(import system)
(target py: |from compiler import *|)
(target py: (import traceback))
(target py: (import numpy as np))

(target py: (from types import ModuleType as module))
(target py: (define-global module? (x) (isinstance x module)))

(target py: (import inspect))
(target py: (define-global class? (x) ((idx inspect isclass) x)))

(define-global disp (str)
  ((idx system write) str)
  ((idx system flush)))

(target py: (from pprint import pprint as pp)
  (define-global pp (x)
    (if (and (list? x) (> (# x) 1))
        (let (c "  " nl nil)
          (print "(")
          (step v x
            (if nl (print "")) (disp c)
            (set nl true) (set c "  ")
            (print (str v)))
          (print ")"))
      (print (str x)))))

(target js:
  (define-global dir (x)
    ((idx Object getOwnPropertyNames) x)))

(target lua:
  (define-global dir (x)
    (with r ()
      (each (k v) x
        (add r k)))))

(target py:
  (define-global entries (x)
    (with r ()
      (let mods ()
        (step k (dir x)
          (unless (= (clip k 0 2) "__")
            (let v (getattr x k)
              (if (function? v) (add r k)
                  (module? v) (add mods (cat "." k))
                  (add r (list k v))))))
        (step x mods
          (add r x))))))

(target py: (from io import StringIO))

(target py:
  (define-global pp-to-string (x)
    (let r (StringIO)
      (pp x r)
      ((idx r getvalue)))))

(define-global lines (x)
  (split x "\n"))

(define-global get-indentation (s)
  (with r ""
    (for i (# s)
      (let c (char s i)
        (when (= c " ")
          (cat! r c))))))

(define-global strip-outer (s lh rh)
  (if (and (string-starts? s lh)
           (string-ends? s rh))
      (clip (clip s 0 (- (# s) (# rh))) (# lh))
    s))

(define-global simple-id? (x)
  (let r (errsafe ((idx reader read-string) x))
    (when (= r x) r)))

(target py:
  (define-global pp-obj (x)
    (set s (pp-to-string (entries x))
         s (s.rstrip)
         s (strip-outer s "[" "]")
         s (cat " " s))
    (step x (lines s)
      (let ind (get-indentation x)
        (set x (x.rstrip ","))
        (let id (simple-id? (strip-outer (x (.strip)) "'" "'"))
          (print (if id (cat ind id) x)))))
    (print (repr x))))

(target py:
  (define-global pp-doc (x)
    (let doc (docstring x)
      (when doc
        (print (cat "\n\"\"\"\n" (doc.strip) "\n\"\"\""))))))

(target py:
  (define-global pp-toplevel (x)
    (pp-doc x)
    (if (or (module? x) (class? x))
        (pp-obj x)
      (pp x))))

(target py:
  (define-global docstring (x)
    (errsafe (idx x __doc__))))

(target py:
  (define-global lumen-set-globals (x)
    (set (idx compiler lumen-globals) x)))

(define-global toplevel-print (v)
  (target py: (pp-toplevel v) (pp v)))

(define-global print-exception (v ex)
  (target
    py: ((idx traceback print_exception) (%literal |*| ex))
    js: (print (idx v stack))
    lua: (print (cat "error: " (idx v message) "\n" (idx v stack))))
  nil)

(define-global %self reader)

(define accessor-literal? (form)
  (and (string? form)
       (not (string-literal? form))
       (not (id-literal? form))
       (= (char form 0) ".")
       (not (= (clip form 0 2) ".."))
       (> (# form) 1)))

(define-global eval-self-form (form)
  (if (= form ".")
      `%self
      (accessor-literal? form)
      `(%self ,form)
      (not (list? form))
      form
      (and (hd? form '%self)
           (> (# form) 1))
      `(%set %self ,(at form 1))
      (or (hd? form 'import)
          (and (hd? form 'from)
               (= (has form 2) 'import)))
      `(%do ,form (%set %self ,(last form)))
    (if (accessor-literal? (hd form))
        `(%self ,@form)
      form)))

(define-global eval-print (form)
  (let (form (eval-self-form form)
        (ok v ex) (guard ((idx compiler eval) form)))
    (if (not ok)
        (print-exception v ex)
        (is? v)
        (toplevel-print v))))

(define-global read-toplevel (str more)
  (let (s ((idx reader stream) str more)
        x (errsafe ((idx reader read-all) s)))
    (if (= x more) more
        (nil? x) x
        (one? x) (hd x)
      x)))

(define rep (str)
  (let v (eval (read-toplevel str))
    (if (is? v) (toplevel-print v))))

(define repl ()
  (define o (obj buf: ""))
  (define reset ()
    (set (get o 'buf) "")
    (disp "> "))
  (define ctrl-c ()
    (target py: ((idx traceback print-exc))
      (print ""))
    (reset)
    ctrl-c)
  (define rep1 (s)
    (cat! (get o 'buf) s)
    (let (more ()
          form (read-toplevel (get o 'buf) more))
        (unless (= form more)
          (eval-print form)
          (reset))))
  (reset)
  (target
    js: (let in (idx process stdin)
          ((idx in setEncoding) "utf8")
          ((idx in on) "data" rep1))
    (while true
      (let s ((idx system read-line) ctrl-c)
        (unless (= s ctrl-c)
          (if (is? s) (rep1 (cat s "\n")) (break)))))))

(define-global read-file (path)
  ((idx system read-file) path))

(define-global read-from-file (path)
  (let s ((idx reader stream) (read-file path))
    ((idx reader read-all) s)))

(define-global expand-file (path)
  (let body (read-from-file path)
    ((idx compiler expand) `(do ,@body))))

(define-global compile-file (path)
  (let form (expand-file path)
    ((idx compiler compile) form stmt: true)))

(define-global load (path)
  (let (previous target previous-indent indent-level)
    (set target (language))
    (set indent-level 0)
    (let code (compile-file path)
      (set indent-level previous-indent)
      (set target previous)
      ((idx compiler run) code))))

(define script-file? (path)
  (not (or (= "-" (char path 0))
           (= ".py" (clip path (- (# path) 3)))
           (= ".js" (clip path (- (# path) 3)))
           (= ".lua" (clip path (- (# path) 4))))))

(define run-file (path)
  (if (script-file? path)
      (load path)
    ((idx compiler run) ((idx system read-file) path))))

(define usage ()
  (print "usage: lumen [<file> <arguments> | options <object files>]")
  (print " <file>\t\tProgram read from script file")
  (print " <arguments>\tPassed to program in system.argv")
  (print " <object files>\tLoaded before compiling <input>")
  (print "options:")
  (print " -c <input>\tCompile input file")
  (print " -o <output>\tOutput file")
  (print " -t <target>\tTarget language (default: lua)")
  (print " -e <expr>\tExpression to evaluate"))

(define main (args)
  (let arg (hd args)
    (if (and arg (script-file? arg))
        (load arg)
        (or (= arg "-h")
            (= arg "--help"))
        (usage)
      (let (pre ()
            input nil
            output nil
            target1 nil
            expr nil
            argv (idx system argv))
        (for i (# argv)
          (let a (at argv i)
            (if (or (= a "-c") (= a "-o") (= a "-t") (= a "-e"))
                (if (= i (edge argv))
                    (print (cat "missing argument for " a))
                  (do (inc i)
                      (let val (at argv i)
                        (if (= a "-c") (set input val)
                            (= a "-o") (set output val)
                            (= a "-t") (set target1 val)
                            (= a "-e") (set expr val)))))
                (not (= "-" (char a 0))) (add pre a))))
        (step file pre
          (run-file file))
        (if (nil? input) (if expr (rep expr) (repl))
          (do (if target1 (set target target1))
              (let code (compile-file input)
                (if (or (nil? output) (= output "-"))
                    (print code)
                  ((idx system write-file) output code)))))))))

(define main? ()
  (target
    lua: true
    js: (and (not (undefined? require))
             (not (undefined? module))
             (= (idx require main) module))
    py: (= __name__ "__main__")))

(when (main?)
  (main (idx system argv)))

(export main
        reader
        compiler
        system)
