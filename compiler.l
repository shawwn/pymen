(target py: |from lumen import *|)

(define getenv (k p)
  (when (string? k)
    (let i (edge environment)
      (while (>= i 0)
        (if (has? (at environment i) k)
            (let b (get (at environment i) k)
              (return (if p (has b p) b)))
          (dec i))))))

(define macro-function (k)
  (getenv k 'macro))

(define macro? (k)
  (is? (macro-function k)))

(define special? (k)
  (is? (getenv k 'special)))

(define special-form? (form)
  (and (not (atom? form)) (special? (hd form))))

(define statement? (k)
  (and (special? k) (getenv k 'stmt)))

(define symbol-expansion (k)
  (getenv k 'symbol))

(define symbol? (k)
  (is? (symbol-expansion k)))

(define variable? (k)
  (is? (getenv k 'variable)))

(define-global bound? (x)
  (or (macro? x)
      (special? x)
      (symbol? x)
      (variable? x)))

(define-global quoted (form)
  (if (string? form) (escape form)
      (atom? form) form
    `(list ,@(map quoted form))))

(define literal (s)
  (if (string-literal? s) s (quoted s)))

(define stash* (args)
  (if (keys? args)
      (if (= target 'py)
          (with l (array args)
            (each (k v) args
              (unless (number? k)
                (add l `(%literal ,(cat "|" k "=|") ,v)))))
        (let l '(%object "_stash" true)
          (each (k v) args
            (unless (number? k)
              (add l (literal k))
              (add l v)))
          (join args (list l))))
    args))

(define bias (k)
  (if (number? k)
      (do (target lua: (dec k))
          (if (target? 'lua) (inc k))
          k)
    k))

(define-global bind (lh rh)
  (if (atom? lh) `(,lh ,rh)
    (let-unique (id)
      (with bs (list id rh)
        (each (k v) lh
          (let x (if (= k 'rest)
                     `(cut ,id ,(# lh))
                   `(has ,id ',(bias k)))
            (when (is? k)
              (let k (if (= v true) k v)
                (join! bs (bind k x))))))))))

(define-macro arguments% (from)
  `(target js: ((idx (idx (idx Array prototype) slice) call) arguments ,from)
           py: (|list| |_args|)
           lua: (list |...|)))

(define-global bind* (args body)
  (let args1 (obj)
    (define rest ()
      (set (get args1 'rest) true)
      `(unstash (arguments% ,(# args1)) (target py: |_keys|)))
    (if (atom? args)
        (list args1 `(let ,(list args (rest)) ,@body))
      (let bs ()
        (let-unique (r)
          (each (k v) args
            (when (number? k)
              (if (atom? v) (add args1 v)
                (let-unique (x)
                  (add args1 x)
                  (join! bs (list v x))))))
          (when (keys? args)
            (join! bs (list r (rest)))
            (let n (# args1)
              (for i n
                (let v (at args1 i)
                  (join! bs (list v `(destash! ,v ,r))))))
            (join! bs (list (keys args) r))))
        (list args1 `(let ,bs ,@body))))))

(define quoting? (depth)
  (number? depth))

(define quasiquoting? (depth)
  (and (quoting? depth) (> depth 0)))

(define can-unquote? (depth)
  (and (quoting? depth) (= depth 1)))

(define quasisplice? (x depth)
  (and (can-unquote? depth)
       (not (atom? x))
       (= (hd x) 'unquote-splicing)))

(define expand-local ((x name value))
  (setenv name :variable)
  `(%local ,name ,(macroexpand value)))

(define expand-function ((x args rest: body))
  (with-bindings (args)
    `(%function ,args ,@(macroexpand body))))

(define expand-definition ((x name args rest: body))
  (with-bindings (args)
    `(,x ,name ,args ,@(macroexpand body))))

(define expand-macro (form)
  (macroexpand (expand1 form)))

(define-global expand1 ((name rest: body))
  (apply (macro-function name) body))

(define-global real? (x)
  (and (number? x) (not (nan? x)) (not (inf? x))))

(define-global valid-access? (str)
  (and (> (# str) 2)
       (not (= "." (char str 0)))
       (not (= "." (char str (edge str))))
       (not (search str ".."))))

(define-global parse-access (str)
  (reduce (fn (a b)
            (let n (number a)
              (if (is? n)
                  `(at ,b ,n)
                `(idx ,b ,a))))
          (reverse (split str "."))))

(define-global parse-access? (form)
  (and (string? form)
       (not (string-literal? form))
       (not (id-literal? form))
       (search form ".")
       (valid-access? form)))

(define-global macroexpand (form)
  (if (parse-access? form) (macroexpand (parse-access form))
      (symbol? form)
      (macroexpand (symbol-expansion form))
      (atom? form) form
    (let x (hd form)
      (if (= x '%local) (expand-local form)
          (= x '%function) (expand-function form)
          (= x '%global-function) (expand-definition form)
          (= x '%local-function) (expand-definition form)
          (macro? x) (expand-macro form)
          (parse-access? x) (macroexpand `(,(parse-access x) ,@(tl form)))
        (map macroexpand form)))))

(define quasiquote-list (form depth)
  (let xs (list (target py: (object '(list)) '(list)))
    (each (k v) form
      (unless (number? k)
        (let v (if (quasisplice? v depth)
                   ;; don't splice, just expand
                   (quasiexpand (at v 1))
                 (quasiexpand v depth))
          (set (get (last xs) k) v))))
    ;; collect sibling lists
    (step x form
      (if (quasisplice? x depth)
          (let x (quasiexpand (at x 1))
            (add xs x)
            (add xs '(list)))
        (add (last xs) (quasiexpand x depth))))
    (let pruned
        (keep (fn (x)
                (or (> (# x) 1)
                    (not (= (hd x) 'list))
                    (keys? x)))
              xs)
      (if (one? pruned)
          (hd pruned)
        `(join ,@pruned)))))

(define-global quasiexpand (form depth)
  (if (quasiquoting? depth)
      (if (atom? form) (list 'quote form)
          ;; unquote
          (and (can-unquote? depth)
               (= (hd form) 'unquote))
          (quasiexpand (at form 1))
          ;; decrease quasiquoting depth
          (or (= (hd form) 'unquote)
              (= (hd form) 'unquote-splicing))
          (quasiquote-list form (- depth 1))
          ;; increase quasiquoting depth
          (= (hd form) 'quasiquote)
          (quasiquote-list form (+ depth 1))
        (quasiquote-list form depth))
      (atom? form) form
      (= (hd form) 'quote) form
      (= (hd form) 'quasiquote)
      ;; start quasiquoting
      (quasiexpand (at form 1) 1)
    (map (fn (x) (quasiexpand x depth)) form)))

(define-global expand-if ((a b rest: c))
  (if (is? b) `((%if ,a ,b ,@(expand-if c)))
      (is? a) (list a)))

(define-constant indent-level 0)

(define-global indentation ()
  (with s ""
    (for i indent-level
      (cat! s "  "))))

(define reserved
  (set-of "=" "==" "+" "-" "%" "*" "/" "<" ">" "<=" ">="
          ;; js
          "break" "case" "catch" "class" "const" "continue"
          "debugger" "default" "delete" "do" "else" "eval"
          "finally" "for" "function" "if" "import" "in"
          "instanceof" "let" "return" "switch" "throw"
          "try" "typeof" "var" "void" "with"
          ;; lua
          "and" "end" "in" "load" "repeat" "while" "break"
          "false" "local" "return" "do" "for" "nil" "then"
          "else" "function" "not" "true" "elseif" "if" "or"
          "until"
          ;; python
          "from" "str" "print"))

(define-global reserved? (x)
  (has? reserved x))

(define valid-code? (n)
  (or (number-code? n)         ; 0-9
      (and (> n 64) (< n 91))  ; A-Z
      (and (> n 96) (< n 123)) ; a-z
      (= n 95)))               ; _

(define id (id)
  (let (x (if (= target 'py) "L_" "_")
        id1 (if (number-code? (code id 0)) x ""))
    (for i (# id)
      (let (c (char id i)
            n (code c)
            c1 (if (and (= c "-")
                        (not (= id "-")))
                   (if (= i 0) x "_")
                   (valid-code? n) c
                   (= i 0) (cat x n)
                 n))
        (cat! id1 c1)))
    (if (reserved? id1)
        (cat x id1)
        id1)))

(define-global valid-id? (x)
  (and (some? x) (= x (id x))))

(let (names (obj))
  (define-global unique (x)
    (let x (id x)
      (if (has? names x)
          (let i (get names x)
            (inc (get names x))
            (unique (cat x i)))
        (do (set (get names x) 1)
            (cat "__" x))))))

(define-global key (k)
  (if (target? 'py) k
    (let i (inner k)
      (if (valid-id? i) i
          (target? 'js) k
        (cat "[" k "]")))))

(define-global mapo (f t)
  (with o ()
    (each (k v) t
      (let x (f v)
        (when (is? x)
          (add o (literal k))
          (add o x))))))

(define infix
  `((not: (js: ! lua: ,"not" py: ,"not"))
    (:* :/ :%)
    (cat: (js: + lua: ..))
    (:+ :-)
    (:< :> :<= :>=)
    (=: (js: === lua: == py: ==))
    (and: (js: && lua: and py: and))
    (or: (js: ,"||" lua: or py: or))))

(define unary? (form)
  (and (two? form) (in? (hd form) '(not -))))

(define index (k)
  (target k lua: (when (number? k) (- k 1))))

(define precedence (form)
  (unless (or (atom? form) (unary? form))
    (each (k v) infix
      (if (has? v (hd form)) (return (index k)))))
  0)

(define getop (op)
  (find (fn (level)
          (let x (has level op)
            (if (= x true) op
                (is? x) (has x target))))
        infix))

(define infix? (x)
  (is? (getop x)))

(define-global infix-operator? (x)
  (and (not (atom? x)) (infix? (hd x))))

(define-global compile-args (args default?)
  (let (s "(" c "")
    (step x args
      (cat! s c (compile x))
      (when (and (= target 'py)
                 default?
                 (not (id-literal? x)))
        (cat! s "=None"))
      (set c ", "))
    (cat s ")")))

(define escape-newlines (s)
  (with s1 ""
    (for i (# s)
      (let c (char s i)
        (cat! s1 (if (= c "\n") "\\n"
                     (= c "\r") "\\r"
                   c))))))

(define compile-nil ()
  (if (target? 'py) "None"
      (target? 'lua) "nil"
    "undefined"))

(define compile-boolean (x)
  (if (target? 'py)
      (if x "True" "False")
    (if x "true" "false")))

(define compile-atom (x)
  (if (= x "nil") (compile-nil)
      (id-literal? x) (inner x)
      (string-literal? x) (escape-newlines x)
      (string? x) (id x)
      (boolean? x) (compile-boolean x)
      (nan? x) "nan"
      (= x inf) "inf"
      (= x -inf) "-inf"
      (number? x) (cat x "")
    (error (cat "Cannot compile atom: " (str x)))))

(define terminator (stmt?)
  (if (not stmt?) ""
      (target? 'js) ";\n"
    "\n"))

(define compile-special (form stmt?)
  (let ((x rest: args) form
        (:special :stmt tr: self-tr?) (getenv x)
        tr (terminator (and stmt? (not self-tr?))))
    (cat (apply special args) tr)))

(define parenthesize-call? (x)
  (or (and (not (atom? x))
           (= (hd x) '%function))
      (> (precedence x) 0)))

(define compile-call (form)
  (let (f (hd form)
        f1 (compile f)
        args (compile-args (stash* (tl form))))
    (if (parenthesize-call? f)
        (cat "(" f1 ")" args)
      (cat f1 args))))

(define op-delims (parent child :right)
  (if ((if right >= >)
       (precedence child)
       (precedence parent))
      (list "(" ")")
    (list "" "")))

(define compile-infix (form)
  (let ((op rest: (a b)) form
        (ao ac) (op-delims form a)
        (bo bc) (op-delims form b :right)
        a (compile a)
        b (compile b)
        op (getop op))
    (if (unary? form)
        (cat op ao " " a ac)
      (cat ao a ac " " op " " bo b bc))))

(define-global compile-body (body)
  (let s (with-indent (compile body :stmt))
      (if (and (target? 'py) (none? s))
          (with-indent (cat (indentation) "pass\n"))
        s)))

(define-global compile-function (args body :name :prefix)
  (let (id (if name (compile name) "")
        args1 (if (and (target? 'lua)
                       (has? args 'rest))
                  `(,@args |...|)
                  (and (target? 'py)
                       (has? args 'rest))
                  `(,@args |*_args| |**_keys|)
                args)
        args (compile-args args1 true)
        body (compile-body body)
        ind (indentation)
        p (if prefix (cat prefix " ") "")
        tr (if (target? 'js) "" "end"))
    (if name (cat! tr "\n"))
    (if (target? 'js)
        (cat "function " id args " {\n" body ind "}" tr)
        (target? 'py)
        (cat "def " id args ":\n" body)
      (cat p "function " id args "\n" body ind tr))))

(define can-return? (form)
  (and (is? form)
       (or (atom? form)
           (and (not (= (hd form) 'return))
                (not (statement? (hd form)))))))

(define-global compile (form :stmt)
  (if (nil? form) ""
      (special-form? form)
      (compile-special form stmt)
    (let (tr (terminator stmt)
          ind (if stmt (indentation) "")
          form (if (atom? form) (compile-atom form)
                   (infix? (hd form)) (compile-infix form)
                 (compile-call form)))
      (cat ind form tr))))

(define lower-statement (form tail?)
  (either
    (let (hoist () e (lower form hoist true tail?))
      (if (and (some? hoist) (is? e))
          `(do ,@hoist ,e)
          (is? e) e
          (> (# hoist) 1) `(do ,@hoist)
        (hd hoist)))
    '(do)))

(define lower-body (body tail?)
  (lower-statement `(do ,@body) tail?))

(define literal? (form)
  (or (atom? form)
      (= (hd form) '%array)
      (= (hd form) '%object)
      (= (hd form) '%list)))

(define standalone? (form)
  (or (and (not (atom? form))
           (not (infix? (hd form)))
           (not (literal? form))
           (not (= 'get (hd form))))
      (id-literal? form)))

(define lower-do (args hoist stmt? tail?)
  (step x (almost args)
    (let-when e (lower x hoist stmt?)
      (when (standalone? e)
        (add hoist e))))
  (let e (lower (last args) hoist stmt? tail?)
    (if (and tail? (can-return? e))
        `(return ,e)
      e)))

(define lower-set (args hoist stmt? tail?)
  (let ((lh rh) args)
    (add hoist `(%set ,(lower lh hoist) ,(lower rh hoist)))
    (unless (and stmt? (not tail?))
      lh)))

(define lower-if (args hoist stmt? tail?)
  (let ((cond then else) args)
    (if stmt?
        (add hoist
             `(%if ,(lower cond hoist)
                   ,(lower-body (list then) tail?)
                   ,@(if (is? else) (list (lower-body (list else) tail?)))))
      (let-unique (e)
        (add hoist `(%local ,e))
        (add hoist
             `(%if ,(lower cond hoist)
                   ,(lower `(%set ,e ,then))
                   ,@(if (is? else)
                         (list (lower `(%set ,e ,else))))))
        e))))

(define lower-short (x args hoist)
  (let ((a b) args
        hoist1 ()
        b1 (lower b hoist1))
    (if (some? hoist1)
        (let-unique (id)
          (lower `(do (%local ,id ,a)
                      ,(if (= x 'and)
                           `(%if ,id ,b ,id)
                         `(%if ,id ,id ,b)))
                 hoist))
      `(,x ,(lower a hoist) ,b1))))

(define lower-try (args hoist tail?)
  (add hoist `(%try ,(lower-body args tail?))))

(define lower-while (args hoist)
  (let ((c rest: body) args
        pre ()
        c (lower c pre))
    (add hoist
      (if (none? pre)
          `(while ,c
            ,(lower-body body))
        `(while true
           (do ,@pre
               (%if (not ,c) (break))
               ,(lower-body body)))))))

(define lower-for (args hoist)
  (let ((t k rest: body) args)
    (add hoist
         `(%for ,(lower t hoist) ,k
            ,(lower-body body)))))

(define lower-with (args hoist stmt? tail?)
  (let ((t rest: body) args)
    (if (and stmt? (not tail?))
        (add hoist
           `(%with ,(lower t hoist)
              ,(lower-body body tail?)))
      (let-unique (e)
        (add hoist `(%local ,e))
        (add hoist `(%with ,(lower t hoist)
                     ,(lower `(%set ,e (do ,@body)))))
        e))))

(define lower-function (args hoist)
  (if (target? 'py)
      (let-unique (f)
        (lower `(do (%local-function ,f ,@args) ,f) hoist))
    (let ((a rest: body) args)
      `(%function ,a ,(lower-body body true)))))

(define lower-definition (kind args hoist)
  (let ((name args rest: body) args)
    (add hoist `(,kind ,name ,args ,(lower-body body true)))))

(define lower-call (form hoist)
  (let form (map (fn (x) (lower x hoist)) form)
    (if (some? form) form)))

(define pairwise? (form)
  (in? (hd form) '(< <= = >= >)))

(define lower-pairwise (form)
  (if (pairwise? form)
      (let (e () (x rest: args) form)
        (reduce (fn (a b)
                  (add e `(,x ,a ,b)) a)
                args)
        `(and ,@(reverse e)))
    form))

(define lower-infix? (form)
  (and (infix? (hd form)) (> (# form) 3)))

(define lower-infix (form hoist)
  (let (form (lower-pairwise form)
        (x rest: args) form)
    (lower (reduce (fn (a b)
                     (list x b a))
                   (reverse args))
           hoist)))

(define lower-special (form hoist)
  (let e (lower-call form hoist)
    (if e (add hoist e))))

(define-global lower (form hoist stmt? tail?)
  (if (atom? form) form
      (empty? form) '(%array)
      (nil? hoist) (lower-statement form)
      (lower-infix? form) (lower-infix form hoist)
    (let ((x rest: args) form)
      (if (= x 'do) (lower-do args hoist stmt? tail?)
          (= x '%set) (lower-set args hoist stmt? tail?)
          (= x '%if) (lower-if args hoist stmt? tail?)
          (= x '%try) (lower-try args hoist tail?)
          (= x 'while) (lower-while args hoist)
          (= x '%for) (lower-for args hoist)
          (= x '%with) (lower-with args hoist stmt? tail?)
          (= x '%function) (lower-function args hoist)
          (or (= x '%local-function)
              (= x '%global-function))
          (lower-definition x args hoist)
          (in? x '(and or))
          (lower-short x args hoist)
          (statement? x) (lower-special form hoist)
        (lower-call form hoist)))))

(define-global expand (form)
  (lower (macroexpand form)))

(target js: (set (idx global require) |require|))
(target js: (define run |eval|))

(target lua: (define load1 (or |loadstring| |load|)))
(target lua:
  (define run (code)
    (let |f,e| (load1 code)
      (if f (f) (error (cat e " in " code))))))

(target py:
  (define run (code globals)
    (let state (or globals lumen-globals)
      (|exec| code state state)
      nil)))

(define eval-result (globals)
  (target py:
    (let state (or globals lumen-globals)
      (get state "lumen_result"))
    lumen-result))

(define-global eval (form globals)
  (let previous target
    (set target (language))
    (let code (compile (expand `(set lumen-result ,form)))
      (set target previous)
      (run code globals)
      (eval-result globals))))

(define-global immediate-call? (x)
  (and (not (atom? x)) (not (atom? (hd x))) (= (hd (hd x)) '%function)))

(define-special do forms :stmt :tr
  (with s ""
    (step x forms
      (when (and (target? 'lua)
                 (immediate-call? x)
                 (= "\n" (char s (edge s))))
        (set s (cat (clip s 0 (edge s)) ";\n")))
      (cat! s (compile x :stmt))
      (unless (atom? x)
        (if (or (= (hd x) 'return)
                (= (hd x) 'break))
            (break))))))

(define-special %if (cond cons alt) :stmt :tr
  (let (cond (compile cond)
        cons (compile-body cons)
        alt (if alt (compile-body alt))
        ind (indentation)
        s "")
    (if (target? 'js)
        (cat! s ind "if (" cond ") {\n" cons ind "}")
        (target? 'py)
        (cat! s ind "if " cond ":\n" cons)
      (cat! s ind "if " cond " then\n" cons))
    (if (and alt (target? 'js))
        (cat! s " else {\n" alt ind "}")
        (and alt (target? 'py))
        (cat! s ind "else:\n" alt)
        alt (cat! s ind "else\n" alt))
    (if (target? 'lua)
        (cat s ind "end\n")
        (target? 'js)
        (cat s "\n")
      s)))

(define-special while (cond form) :stmt :tr
  (let (cond (compile cond)
        body (compile-body form)
        ind (indentation))
    (if (target? 'js)
        (cat ind "while (" cond ") {\n" body ind "}\n")
        (target? 'py)
        (cat ind "while " cond ":\n" body)
      (cat ind "while " cond " do\n" body ind "end\n"))))

(define-special %for (t k form) :stmt :tr
  (let (t (compile t)
        ind (indentation)
        body (compile-body form))
    (if (target? 'lua)
        (cat ind "for " k " in next, " t " do\n" body ind "end\n")
        (target? 'py)
        (cat ind "for " k " in indices(" t "):\n" body)
      (cat ind "for (" k " in " t ") {\n" body ind "}\n"))))

(define-special %with (t form) :stmt :tr
  (let (t (compile t)
        ind (indentation)
        body (compile-body form))
    (if (target? 'py)
        (cat ind "with " t ":\n" body)
      "")))

(define-special %try (form) :stmt :tr
  (let (ind (indentation)
        body (compile-body form)
        hf (if (target? 'py)
               `(do (import sys)
                    (%local e ((idx sys exc_info)))
                    (return (%array false (get e 1) e)))
             `(return (%array false e)))
        h (with-indent (compile hf :stmt)))
    (if (target? 'js)
        (cat ind "try {\n" body ind "}\n"
             ind "catch (e) {\n" h ind "}\n")
      (cat ind "try:\n" body
           ind "except:\n" h))))

(define-special %delete (place) :stmt
  (cat (indentation) (if (target? 'py) "del " "delete ") (compile place)))

(define-special break () :stmt
  (cat (indentation) "break"))

(define-special %function (args body)
  (compile-function args body))

(define-special %global-function (name args body) :stmt :tr
  (if (or (target? 'lua) (target? 'py))
      (let x (compile-function args body name: name)
        (cat (indentation) x))
    (compile `(%set ,name (%function ,args ,body)) :stmt)))

(define-special %local-function (name args body) :stmt :tr
  (if (or (target? 'lua) (target? 'py))
      (let x (compile-function args body name: name prefix: 'local)
        (cat (indentation) x))
    (compile `(%local ,name (%function ,args ,body)) :stmt)))

(define-special return (x) :stmt
  (let x (if (nil? x)
             "return"
           (cat "return " (compile x)))
    (cat (indentation) x)))

(define-special new (x)
  (cat "new " (compile x)))

(define-special typeof (x)
  (cat "typeof(" (compile x) ")"))

(define-special error (x) :stmt
  (let e (if (target? 'js)
             (cat "throw " (compile `(new (Error ,x))))
             (target? 'py)
             (cat "raise " (compile `(Exception ,x)))
           (cat "error(" (compile x) ")"))
    (cat (indentation) e)))

(define-special %local (name value) :stmt
  (if (and (nil? value) (target? 'py)) (set value "nil"))
  (let (id (compile name)
        value1 (compile value)
        rh (if (is? value) (cat " = " value1) "")
        keyword (if (target? 'js) "var " (target? 'lua) "local " "")
        ind (indentation))
    (cat ind keyword id rh)))

(define-special %set (lh rh) :stmt
  (let (lh (compile lh)
        rh (compile (if (nil? rh) 'nil rh)))
    (cat (indentation) lh " = " rh)))

(define-special get (t k)
  (let (t1 (compile t)
        k1 (compile k))
    (when (or (and (target? 'lua)
                   (= (char t1 0) "{"))
              (infix-operator? t))
      (set t1 (cat "(" t1 ")")))
    (if (and (string-literal? k)
             (valid-id? (inner k))
             (not (target? 'py)))
        (cat t1 "." (inner k))
      (cat t1 "[" k1 "]"))))

(define-special idx (t k)
  (let (t1 (compile t)
        k1 (compile k))
    (when (or (and (target? 'lua)
                   (= (char t1 0) "{"))
              (infix-operator? t))
      (set t1 (cat "(" t1 ")")))
    (cat t1 "." k1)))

(define-special %array forms
  (let (open (if (target? 'lua) "{" "[")
        close (if (target? 'lua) "}" "]")
        s "" c "")
    (each (k v) forms
      (when (number? k)
        (cat! s c (compile v))
        (set c ", ")))
    (cat open s close)))

(define-special %object forms
  (let (s "{" c ""
        sep (if (target? 'lua) " = " ": "))
    (each (k v) (pair forms)
      (when (number? k)
        (let ((k v) v)
          (unless (string? k)
            (error (cat "Illegal key: " (str k))))
          (cat! s c (key k) sep (compile v))
          (set c ", "))))
    (cat s "}")))

(define-special %list (form comps cond)
  (let s (compile form)
    (step (k v) comps
      (let k1 (if (obj? k) (mapcat compile k ", ") (compile k))
        (cat! s " for " k1 " in " (compile v))))
    (when (is? cond)
      (cat! s " if " (compile cond)))
    (cat "[" s "]")))

(define-special %literal args
  (apply cat (map compile args)))

(define-special global (x) :stmt :tr
  (if (target? 'py)
      (cat (indentation) "global " (compile x) "\n")
    ""))

(define-special import (name rest: alias) :stmt
  (let (ind (indentation)
        as (if (= (hd alias) "as") (at alias 1) (hd alias))
        id (or as name))
    (if (target? 'py)
        (with s (cat ind "import " (compile name))
          (if as (cat! s " as " (compile id))))
      (cat ind (compile `(%local ,id (require ,(escape name))))))))

(define-special from (name rest: imports) :stmt
  (let (ind (indentation)
        id name
        names (if (= (hd imports) "import") (tl imports) imports)
        names (mapcat (fn (x) (if (= x "*") x (compile x))) names ", "))
    (if (target? 'py)
        (cat ind "from " (compile name) " import " names)
      "")))

(define-special \, args
  (if (none? args) ","
      (one? args) (cat "," (compile (hd args)))
    (mapcat compile args ",")))

(define-special : args
  (if (none? args) ":"
      (one? args) (cat ":" (compile (hd args)))
    (mapcat compile args ":")))

(define-special %as (form id)
  (cat (compile form) " as " (compile id)))

(export run
        eval
        expand
        compile)
