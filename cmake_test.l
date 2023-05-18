#!bin/cumen

(when-compiling
  (setenv 'list macro: nil)
  ; (define-symbol ... (target cmake: (arguments%)))
  ;(define-symbol arguments (arguments%))
  (define-symbol arguments (%ref ARGN))
  ; (define-macro unquote-splicing (x)
  ;   (set x (expand x))
  ;   `(%ref ,(if (id? x) (at x 1) x)))
  (define-special unpack (x)
    (compile `(%ref ,(if (id? x) (at x 1) x))))

  (define-macro unquote-splicing (x)
    `(unpack ,x))

  (define-macro mac (name args rest: body)
    `(when-compiling
       (define-macro ,name ,args
         ,@body)
       nil))

  (define-symbol PWD CMAKE_CURRENT_LIST_DIR)
  (define-macro getcwd () '$CMAKE_CURRENT_LIST_DIR)
  nil)

(cmake_policy VERSION "3.25.0")
  

(define reserved
  (obj
    all: '("=" "==" "+" "-" "%" "*" "/" "<" ">" "<=" ">=")
    js: '("break" "case" "catch" "class" "const" "continue"
          "debugger" "default" "delete" "do" "else" "eval"
          "finally" "for" "function" "if" "import" "in"
          "instanceof" "let" "return" "switch" "throw"
          "try" "typeof" "var" "void" "with")
    lua: '("and" "end" "in" "load" "repeat" "while" "break"
           "false" "local" "return" "do" "for" "nil" "then"
           "else" "function" "not" "true" "elseif" "if" "or"
           "until")
    py: '("and" "except" "lambda" "with" "as" "finally" "nonlocal"
          "while" "assert" "false" "None" "yield" "break" "for" "not"
          "class" "from" "or" "continue" "global" "pass" "def" "if"
          "raise" "del" "import" "return" "elif" "in" "True" "else"
          "is" "try"
          "from" "str" "print")
    cmake: '("set"
             "foreach" "endforeach"
             "while" "endwhile"
             "if" "elseif" "else"
             "block" "endblock"
             "macro" "endmacro"
             "function" "endfunction"
             "break" "return" "continue"
             "AND" "OR"
             "TRUE" "FALSE" "ON" "OFF" "Y" "N")
    ))

(message "hi")
(message |"${reserved}"|)

(message (%id reserved))

(if (> 4 3)
    (message "yes")
    (message "no"))

(when-compiling
  )

(string LENGTH "foo" N)
(message $N)

(define foo (VAR)
  (set $VAR 42)
  (return $VAR))

(foo X)
(message $X)

(define strlen (x VAR)
  (string LENGTH $x $VAR)
  (return $VAR))

(strlen "foobar" N)
(message "$N: " $N)
(unset N)

(define count (x VAR)
  (list LENGTH x $VAR)
  (return $VAR))

(define err ()
  ; (message FATAL_ERROR (%ref ARGN))
  ; (message FATAL_ERROR (arguments%))
  (message FATAL_ERROR arguments)
  (return))

(set l '(a b c d e f g))
(count $l N)
(message "count: " $N)
(unset N)

(message (if (and (> 4 3) 2) "yes" "no"))


; https://gitlab.kitware.com/cmake/cmake/-/issues/19834#note_971155
(message (%id (set RGBA_LIST0
                   '((0 0 0 255)
                     (0 0 255 0)
                     (255 0 255 0)
                     (0 255 255 0)))))

(message $RGBA_LIST0)

(set RGBA_LIST0
     '((0 0 0 255)
       (0 0 255 0)
       (255 0 255 0)
       (0 255 255 0)))

(while RGBA_LIST0
  (list POP_FRONT RGBA_LIST0 R G B A)
  (message STATUS "R=${R}, G=${G}, B=${B}, A=${A}"))

(when-compiling
  (define-global listify (x)
    (if (list? x) x (quasilist x)))

  (define-macro step (vars l rest: body)
    (let-unique (step-v)
      `(do (set ,step-v ,l)
           (while ,step-v
             (list POP_FRONT ,step-v ,@(listify vars))
             ,@body))))
  nil)

(step (R G B A) '((0 0 0 255)
                  (0 0 255 0)
                  (255 0 255 0)
                  (0 255 255 0))
  (message STATUS "R=${R}, G=${G}, B=${B}, A=${A}"))

(step x '(a b c d)
  (message $x))

(when-compiling
  (define-special ENV (name)
    (escape (cat "$ENV{" (compile-id name) "}")))
  nil)

(message (ENV PATH))
    

(define replace (input pattern replacement VAR)
  (string REPLACE $pattern $replacement $VAR $input)
  (return $VAR))

(replace (ENV PATH) ":" ";" PATH)
;(string REPLACE ":" ";" PATH (ENV PATH))
(message "$PATH: " $PATH)
(step x $PATH
  (message 'PATH: $x))

(define blank? (x VAR)
  (if (%array $x STREQUAL "")
      (set $VAR true)
      (set $VAR false))
  (return $VAR))

(define is? (x VAR)
  (strlen $x n)
  (set $VAR (if (> $n 0) true false)))

(set HOME (ENV HOME))
(set NOH_ROOT "$ENV{HOME}/ml/noh4")
(set SPEEDTREE_DIR "${NOH_ROOT}/lib/SpeedTree")
(set SPEEDTREE_SOURCE_DIR "${SPEEDTREE_DIR}/source/SourceCode")
(set SPEEDTREE_INCLUDE_DIR "${SPEEDTREE_DIR}/include")

(file GLOB_RECURSE SpeedTree___cpp "${SPEEDTREE_SOURCE_DIR}/*.cpp")
(step x $SpeedTree___cpp
  (message $x))

(define match? (input pattern VAR)
  (string REGEX MATCH $pattern x $input)
  (is? $x $VAR)
  (return $VAR))

(file GLOB_RECURSE files "*")

(step x $files
  (match? $x "[.]l$" ok)
  (if $ok (message $x)))


(blank? "foo" _)
(message STATUS "(blank? \"foo\"): " $_)
(blank? "" _)
(message STATUS "(blank? \"\"): " $_)

(define call (f)
  (cmake-language CALL $f arguments)
  (return))

(call message "hi")

(define eval (x)
  (cmake-language EVAL CODE $x)
  (return))

(eval "message(\"hi\")")

(when-compiling
  (define-macro %compile body
    `(when-compiling (escape (compile (expand '(%do ,@body))))))
  nil)

(eval (%compile (message "hi")))


(step x $(file GLOB_RECURSE &k2_src
               RELATIVE $NOH_ROOT
               "${NOH_ROOT}/src/k2/*.cpp"
               "${NOH_ROOT}/src/k2/*.h")
  (message "foo: " $x)
  (break))
(unset k2_src)

(mac map% (f l)
  (let-unique (map-l)
    `(do (unset ,map-l)
         (step it ,l
           (list APPEND ,map-l ,f))
         $,map-l)))

(define-global add (VAR)
  (step x $arguments
    (list APPEND $VAR $x))
  $VAR)


(define strjoin (VAR)
  (string JOIN "" &$VAR arguments)
  )

(when-compiling
  (define-macro cat args
    `$(strjoin &,(unique 'cat-x) ,@args))
  nil)


(unset x)
(message $(strjoin &x "foo" "bar" $speedtree_src))
(message (cat $NOH_ROOT "/src/k2"))

; (define glob (VAR dir)
;   (unset l)
;   (step x $arguments
;     (list APPEND l "${dir}/${x}"))
;   (file GLOB_RECURSE $VAR
;         RELATIVE $dir
;         (%ref l))
;   (return $VAR))

(define globdir (VAR dir)
  ; (set l (map% "${dir}/${it}" arguments))
  ; (set l (map% (cat $dir "/" $it) arguments))
  (file GLOB_RECURSE &$VAR
        RELATIVE $dir
        (unpack (map% (cat $dir "/" $it) arguments))
        ; (%ref l)
        ))

(mac call% (f rest: args)
  `$(,f ,@(map (fn (x)
                 (if (= x '_)
                     `&,(unique (%cat f "-x"))
                     x))
               args)))

(mac globdir% (dir rest: args)
  ;(set l (map% "${dir}/${it}" arguments))
  ;(set l (map% (cat $dir "/" $it) arguments))
  ; `(file GLOB_RECURSE &,(unique 'globdir-x)
  ;        RELATIVE ,dir
  ;        (map% (cat ,dir "/" $it) arguments))
  ; `$(globdir &,(unique 'globdir-x) ,dir ,@args)
  `(call% globdir _ ,dir ,@args))

(globdir k2_src (cat $NOH_ROOT "/src/k2") "*.cpp" "*.h")
(step x $k2_src
  (message "k2_src: " $x)
  (break))

(globdir speedtree_src $SPEEDTREE_SOURCE_DIR "*.cpp" "*.h")
(globdir speedtree_hdr $SPEEDTREE_INCLUDE_DIR "*.h")
(step x $speedtree_src
  (message "speedtree src: " $x)
  (break))
(step x $speedtree_hdr
  (message "speedtree hdr: " $x)
  (break))


(step x (globdir &speedtree_src $SPEEDTREE_SOURCE_DIR "*.cpp" "*.h")
  (message "yay: " $x)
  (break))

(define match? (input pattern VAR)
  (is? $(string REGEX MATCH $pattern &x $input) &$VAR))

(step x $(file GLOB_RECURSE &files "*")
  (when $(match? $x "[.]l$" &ok)
    (message "YAY: " $x)
    (break)))

(when-compiling
  (define-macro match? (input pattern)
    `$(%call match? ,input ,pattern &,(unique 'ok)))
  nil)

(step x $(file GLOB_RECURSE &files "*")
  (when (match? $x "[.]l$")
    (message "YAY2: " $x)
    (break)))

; (globdir files (getcwd) "*.*")
(step x $(globdir &files (getcwd) "*")
  (when (match? $x "[.]l$")
    (message "YAY3: " $x)
    (break)))

(mac glob% args
  ; `$(file GLOB_RECURSE &,(unique 'glob-x) ,@args)
  `(call% file GLOB_RECURSE _ ,@args))

(step x (glob% "*")
  (when (match? $x "[.]l$")
    (message "YAY4: " $x)
    (break)))


(step x $(add &l 'foo 'bar 'baz)
  (message $x)
  (break))

(message $l)
(message ,@l)

(step x (glob% "*")
  (message "YAY5: " $x)
  (break))

(step x (call% file GLOB_RECURSE _ "*")
  (message "YAY6: " $x)
  (break))

(message $(string TOLOWER $(string MAKE_C_IDENTIFIER "Foo Bar" &Y) &X))
