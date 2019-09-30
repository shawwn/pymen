(import reader)
(import compiler)
(import system)
(target py: (import traceback))

(target py: |from compiler import *|)

(target py:
  (define-global lumen-set-globals (x)
    (set (idx compiler lumen-globals) x)))

(define-global toplevel-repr (v)
  (target py: (repr v) (str v)))

(define-global toplevel-print (v)
  (print (toplevel-repr v)))

(define eval-print (form)
  (let ((ok v ex) (guard ((idx compiler eval) form)))
    (if (not ok)
        (target
          py: ((idx traceback print_exception) (%literal |*| ex))
          js: (print (idx v stack))
          lua: (print (cat "error: " (idx v message) "\n" (idx v stack))))
        (is? v) (toplevel-print v))))

(define rep (s)
  (let v (eval ((idx reader read-string) s))
    (if (is? v) (toplevel-print v))))

(define repl ()
  (let o (obj buf: "")
    (define rep1 (s)
      (cat! (get o 'buf) s)
      (let (more ()
            form ((idx reader read-string) (get o 'buf) more))
          (unless (= form more)
            (eval-print form)
            (set (get o 'buf) "")
            ((idx system write) "> ")
            ((idx system flush))))))
  ((idx system write) "> ")
  ((idx system flush))
  (target
    js: (let in (idx process stdin)
          ((idx in setEncoding) "utf8")
          ((idx in on) "data" rep1))
    (while true
      (let s ((idx system read-line))
        (if s (rep1 (cat s "\n")) (break))))))

(define-global read-from-file (path)
  (let s ((idx reader stream) ((idx system read-file) path))
    ((idx reader read-all) s)))

(define-global expand-file (path)
  (let body (read-from-file path)
    ((idx compiler expand) `(do ,@body))))

(define-global compile-file (path)
  (let form (expand-file path)
    ((idx compiler compile) form :stmt)))

(define-global load (path)
  (let previous target
    (set target (language))
    (let code (compile-file path)
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

(define main ()
  (let arg (hd (idx system argv))
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
    js: (= (get |require| 'main) |module|)
    py: (= |__name__| "__main__")))

(when (main?)
  (main))
