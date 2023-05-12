#!bin/cumen

(cmake_policy VERSION "3.25.0")

(define reserved
  (obj
    all: (set-of
          "=" "==" "+" "-" "%" "*" "/" "<" ">" "<=" ">=")
    js: (set-of
          "break" "case" "catch" "class" "const" "continue"
          "debugger" "default" "delete" "do" "else" "eval"
          "finally" "for" "function" "if" "import" "in"
          "instanceof" "let" "return" "switch" "throw"
          "try" "typeof" "var" "void" "with")
    lua: (set-of
          "and" "end" "in" "load" "repeat" "while" "break"
          "false" "local" "return" "do" "for" "nil" "then"
          "else" "function" "not" "true" "elseif" "if" "or"
          "until")
    py: (set-of
          "and" "except" "lambda" "with" "as" "finally" "nonlocal"
          "while" "assert" "false" "None" "yield" "break" "for" "not"
          "class" "from" "or" "continue" "global" "pass" "def" "if"
          "raise" "del" "import" "return" "elif" "in" "True" "else"
          "is" "try"
          "from" "str" "print")
    cmake: (set-of
             "set"
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
  (set $VAR 42))

(foo X)
(message $X)

(define len (x VAR)
  (string LENGTH x VAR))

(len "foo" N)
(message $N)

(message (if (and (> 4 3) 2) "yes" "no"))


; https://gitlab.kitware.com/cmake/cmake/-/issues/19834#note_971155
(message (%id (set RGBA_LIST0
    (list
      '(0 0 0 255)
      '(0 0 255 0)
      '(255 0 255 0)
      '(0 255 255 0)))))

(message $RGBA_LIST0)

(set RGBA_LIST0
     '((0 0 0 255)
       (0 0 255 0)
       (255 0 255 0)
       (0 255 255 0)))

(while RGBA_LIST0
  (%call list POP_FRONT RGBA_LIST0 R G B A)
  (message STATUS "R=${R}, G=${G}, B=${B}, A=${A}"))


