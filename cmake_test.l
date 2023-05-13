#!bin/cumen

(when-compiling
  (setenv 'list macro: nil)
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

(when-compiling
  ; (define-symbol ... (%ref ARGN))
  nil)

(define err ()
  ; (message FATAL_ERROR (%ref ARGN))
  (message FATAL_ERROR (arguments%))
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
    (if (list? x) x (lumen-list x)))

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
  (cmake-language CALL $f (arguments%))
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


(file GLOB_RECURSE k2_src
      RELATIVE $NOH_ROOT
      "${NOH_ROOT}/src/k2/*.cpp"
      "${NOH_ROOT}/src/k2/*.h"
      )
(step x $k2_src
  (message $x))
(unset k2_src)

(when-compiling
  (define-macro map (VAR f l)
    (let-unique (map-l)
      `(do (unset ,map-l)
           (step it ,l
             (list APPEND ,map-l ,f))
           (set ,VAR $,map-l))))
  (define-macro add (l x)
    `(list APPEND ,l ,x))
  nil)



; (define glob (VAR dir)
;   (unset l)
;   (step x (arguments%)
;     (list APPEND l "${dir}/${x}"))
;   (file GLOB_RECURSE $VAR
;         RELATIVE $dir
;         (%ref l))
;   (return $VAR))

(define glob (VAR dir)
  (map l "${dir}/${it}" (arguments%))
  (file GLOB_RECURSE $VAR
        RELATIVE $dir
        (%ref l))
  (return $VAR))

(glob k2_src "${NOH_ROOT}/src/k2" "*.cpp" "*.h")
(step x $k2_src
  (message "yess: " $x))

(glob speedtree_src "${SPEEDTREE_SOURCE_DIR}" "*.cpp" "*.h")
(glob speedtree_hdr "${SPEEDTREE_INCLUDE_DIR}" "*.h")
(step x $speedtree_src
  (message "speedtree src: " $x))
(step x $speedtree_hdr
  (message "speedtree hdr: " $x))

