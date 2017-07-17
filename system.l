(target js: (define fs (require 'fs)))
(target js: (define child_process (require 'child_process)))

(target lua:
  (define call-with-file (f path mode)
    (let |h,e| ((idx io open) path mode)
      (unless h
        (error e))
      (with x (f h)
        ((idx h close) h)))))

(define read-file (path)
  (target
    js: ((idx fs readFileSync) path 'utf8)
    lua: (call-with-file
          (fn (f) ((idx f read) f '*a))
          path)))

(define write-file (path data)
  (target
    js: ((idx fs writeFileSync) path data 'utf8)
    lua: (call-with-file
          (fn (f) ((idx f write) f data))
          path 'w)))

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
          lua: ((idx io write) x)))

(define exit (code)
  (target js: ((idx process exit) code)
          lua: ((idx os exit) code)))

(define argv
  (target js: (cut (idx process argv) 2) lua: arg))

(define reload (module)
  (wipe (target
          lua: (get (idx package loaded) module)
          js: (get (idx require cache) ((idx require resolve) module))))
  (require module))

(define run (command)
  (target
    js: ((idx ((idx child_process execSync) command) toString))
    lua: (let f ((idx io popen) command)
           (with x ((idx f read) f '*all)
             ((idx f close) f)))))

(export read-file
        write-file
        file-exists?
        directory-exists?
        path-separator
        path-join
        get-environment-variable
        write
        exit
        argv
        reload
        run)
