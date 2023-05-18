(target py: (from lumen import *))
(target py: (import sys))
(target js: (define fs (require 'fs)))
(target js: (define pathlib (require 'path)))
(target js: (define child_process (require 'child_process)))

(target lua:
  (define call-with-file (f path mode)
    (let ((h e) (list ((idx io open) path mode)))
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
    js: (and ((idx fs existsSync) path 'utf8)
             ((idx ((idx fs statSync) path) isFile)))
    lua: (let f ((idx io open) path)
           (and (is? f)
                (with r (or (is? ((idx f read) f 0))
                            (= 0 ((idx f seek) f 'end)))
                  ((idx f close) f))))))

(define directory-exists? (path)
  (target
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
    lua: (char (idx (idx _G package) config) 0)))

(define path-join parts
  (or (reduce (fn (x y) (cat x path-separator y)) parts) ""))

(define get-environment-variable (name)
  (target
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

(define argv
  (target js: (cut (idx process argv) 2)
          py: (cut (idx sys argv) 1)
          lua: arg))

(define reload (module)
  (target py: ||
    (do (wipe (target
                lua: (get (idx package loaded) module)
                js: (get (idx require cache) ((idx require resolve) module))))
        (require module))))

(define shell (command)
  (target
    js: ((idx ((idx child_process execSync) command) toString))
    lua: (let f ((idx io popen) command)
           (with x ((idx f read) f '*all)
             ((idx f close) f)))))

(define chdir (dir)
  (target
    js: ((idx process chdir) dir)
    py: ((idx os chdir) dir)
    (error "Don't know how to chdir on this host")))

(define dirname (path)
  (target
    js: ((idx pathlib dirname) path)
    py: ((idx (idx os path) dirname) path)
    (error "Don't know how to dirname on this host")))

(define basename (path)
  (target
    js: ((idx pathlib basename) path)
    py: ((idx (idx os path) basename) path)
    (error "Don't know how to basename on this host")))

(define extname (path)
  (target
    js: ((idx pathlib extname) path)
    py: (at ((idx (idx os path) splitext) path) 1)
    (error "Don't know how to extname on this host")))

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
        reload
        shell
        chdir)
