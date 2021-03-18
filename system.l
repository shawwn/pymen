(target py: (from .runtime import *))
(target py: (import sys))
(target py: (import os))
(target js: (define fs (require 'fs)))
(target js: (define child_process (require 'child_process)))
(target lua: (define uv (errsafe (require 'luv))))

(target lua:
  (define call-with-file (f path mode)
    (let |h,e| ((idx io open) path mode)
      (unless h
        (error e))
      (with x (f h)
        ((idx h close) h)))))

(target py:
  (define call-with-file (f path mode)
    (with (open path mode) as h
      (f h))))

(define read-file (path)
  (target
    js: ((idx fs readFileSync) path 'utf8)
    (call-with-file
     (fn (f) ((idx f read) (target lua: f) (target lua: '*a)))
     path "r")))

(define write-file (path data)
  (target
    js: ((idx fs writeFileSync) path data 'utf8)
    (call-with-file
     (fn (f) ((idx f write) (target lua: f) data))
     path "w")))

(define file-exists? (path)
  (target
    py: ((idx (idx os path) isfile) path)
    js: (and ((idx fs existsSync) path 'utf8)
             ((idx ((idx fs statSync) path) isFile)))
    lua: (let f ((idx io open) path)
           (and (is? f)
                (with r (or (is? ((idx f read) f 0))
                            (= 0 ((idx f seek) f 'end)))
                  ((idx f close) f))))))

(define directory-exists? (path)
  (target
    py: ((idx (idx os path) isdir) path)
    js: (and ((idx fs existsSync) path 'utf8)
             ((idx ((idx fs statSync) path) isDirectory)))
    lua: (let f ((idx io open) path)
           (and (is? f)
                (with r (and (not ((idx f read) f 0))
                             (not (= 0 ((idx f seek) f 'end))))
                  ((idx f close) f))))))

(define path-separator
  (target
    js: (idx (require 'path) sep)
    lua: (char (idx (idx _G package) config) 0)
    py: (os .path .sep)))

(define path-join parts
  (or (reduce (fn (x y) (cat x path-separator y)) parts) ""))

(define get-environment-variable (name)
  (target
    py: ((idx os getenv) name)
    js: (get (idx process env) name)
    lua: ((idx os getenv) name)))

(define write (x)
  (target js: (let out (idx process stdout)
                ((idx out write) x))
          lua: ((idx io write) x)
          py: ((idx (idx sys stdout) write) x)))

(define flush (x)
  (target py: ((idx (idx sys stdout) flush))))

(define remove-newline (s)
  (if (= (char s (edge s)) "\n") (set s (clip s 0 (edge s))))
  (if (= (char s (edge s)) "\r") (set s (clip s 0 (edge s))))
  s)

(define read-line (on-ctrl-c)
  (target lua: ((idx io read))
          py: (try (let line ((idx (idx sys stdin) readline))
                     (unless (= line "")
                       (remove-newline line)))
                (except KeyboardInterrupt
                        (if (function? on-ctrl-c)
                            (on-ctrl-c)
                          on-ctrl-c)))))

(define exit (code)
  (target js: ((idx process exit) code)
          lua: ((idx os exit) code)))

; (define argv
;   (target js: (cut (idx process argv) 2)
;           py: (cut (idx sys argv) 1)
;           lua: arg))

(define argv nil)

(define-global set-argv (l)
  (global argv)
  (set argv l))

(define-global get-argv ()
  (when (nil? argv)
    (set-argv (target js: (cut (get process 'argv) 2)
                      lua: (or (get _G 'arg) (get _G 'args) ())
                      py: (cut (idx sys argv) 1))))
  argv)

(define opt? (x)
  (and (string? x) (= (char x 0) "-") (not (= x "-"))))

(define-global parse-positional (args (o pos 0))
  (cut args (either pos 0) (first opt? args pos)))

(define-global parse-option (args)
  (when (opt? (hd args))
    `(,(hd args) ,(parse-positional args 1))))

(define-global parse-arguments (aliases argv)
  (let (l (or argv (get-argv))
        a (or aliases (obj)))
    (with r (parse-positional l)
      (set l (cut l (# r)))
      (while true
        (let p (parse-option l)
          (unless p (break))
          (let-when (op args) p
            (when (= op "--")
              (set l (cut l 1))
              (break))
            (set l (cut l (+ 1 (# args))))
            (let (k (if (= (clip op 0 2) "--") (clip op 2) (clip op 1))
                  k (has a k k)
                  v (if (none? args) true args))
              (set (get r k) v)
              (add r (list k v))))))
      (set (get r 'rest) l)
      (set-argv (get r 'rest)))))

(define-global arguments (aliases argv)
  (let argv (or argv (get-argv))
    (let r (parse-arguments argv aliases)
      (set-argv (get r 'rest))
      (wipe (get r 'rest))
      (unless (empty? r) r))))

(define realpath (filename)
  (target lua: (if (and uv (uv .fs_realpath))
                   ((uv .fs_realpath) filename)
                   filename)
          js: (fs (.realpathSync filename))  ;((require 'path) (.resolve filename))
          py: (fs (.realpath filename))))

(define reload (module)
  (target py: ((import importlib) (.reload module))
    (do (target lua: (let-when file (realpath (requireResolve module))
                       (wipe (get (idx package loaded) file))))
        (wipe (target
                lua: (get (idx package loaded) module)
                js: (get (idx require cache) (realpath ((idx require resolve) module)))))
        (require module))))

(define shell (command)
  (target
    js: ((idx ((idx child_process execSync) command) toString))
    lua: (let f ((idx io popen) command)
           (with x ((idx f read) f '*all)
             ((idx f close) f)))))

(define cwd ()
  (target py: ((idx os getcwd)) ((target js: process lua: uv) (.cwd))))

(define chdir (path)
  (target py: ((idx os chdir) path) ((target js: process lua: uv) (.chdir path))))

(define call-with-directory (path f)
  (unless (directory-exists? path)
    ((import pdb) (.set-trace))
    (error "Directory doesn't exist"))
  (let pwd (cwd)
    (chdir path)
    (let ((ok v) (guard (f)))
      (chdir pwd)
      (if ok v (throw v)))))

(define dirname (filename)
  (let result (apply path-join (almost (split filename path-separator)))
    (if (none? result) "." result)))

(define basename (filename)
  (last (split filename path-separator)))

(define call-with-file-directory (file f)
  (unless (file-exists? file)
    ((import pdb) (.set-trace))
    (error "File doesn't exist"))
  (call-with-directory (dirname file) f))

(export read-file
        write-file
        file-exists?
        directory-exists?
        path-separator
        path-join
        get-environment-variable
        write
        flush
        read-line
        exit
        argv
        set-argv
        get-argv
        parse-positional
        parse-option
        parse-arguments
        arguments
        reload
        shell
        cwd
        chdir
        call-with-directory
        call-with-file-directory
        dirname
        basename
        realpath)
