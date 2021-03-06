(target py: (from lumen import *))

(define-global getenv (k p)
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

(define-global keyword? (atom)
  (and (string? atom)
       (> (# atom) 1)
       (= (char atom 0) ":")))

(define-global quoted (form)
  (if (keyword? form) form
      (string? form) (escape form)
      (atom? form) form
    `(list ,@(map quoted form))))

(define literal (s)
  (if (string-literal? s) s (quoted s)))

(define stash* (args)
  (if (props? args)
      (if (target? 'py)
          (with l (array args)
            (each (k v) args
              (unless (number? k)
                (add l `(%literal ,k |=| ,v)))))
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
  (if (atom? lh)
      `(,lh ,rh)
      (hd? lh ',)
      (bind (cut lh 1) rh)
      (= (hd lh) 't)
      (let ((_ var val) lh
            val (either val var))
        (bind `(o ,var (the ,val)) rh))
      (= (hd lh) 'o)
      (let ((_ var val) lh)
        (list var `(if (nil? ,rh) ,val ,rh)))
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
  `(target js: ((%idx (%idx (%idx Array prototype) slice) call) arguments ,from)
           py: (|list| |_args|)
           lua: (list |...|)))

(define body-docstring (body)
  (if (and (> (# body) 1)
           (string-literal? (hd body)))
      (list (hd body) (tl body))
    (list () body)))

(define-global bind* (args body)
  (let args1 (obj)
    (define rest ()
      (set (get args1 'rest) true)
      `(unstash (list ,"...") (target py: (obj ,"..."))))
    (if (atom? args)
        (list args1 `(let ,(list args (rest)) ,@body))
      (let ((doc body) (body-docstring body)
            pre () bs () inits ())
        (let-unique (r)
          (each (k v) args
            (when (number? k)
              (if (atom? v) (add args1 v)
                  (= (hd v) 'o)
                  (let ((_ var val) v)
                    (add args1 var)
                    (add inits `(%if (nil? ,var) (%set ,var ,val))))
                  (= (hd v) 't)
                  (let ((_ var val) v
                        val (either val var))
                    (add args1 var)
                    (add inits `(%if (nil? ,var) (%set ,var (the ,val)))))
                (let-unique (x)
                  (add args1 x)
                  (join! bs (list v x))))))
          (when (props? args)
            (join! pre (list r (rest)))
            (let n (# args1)
              (for i n
                (let v (at args1 i)
                  (join! pre (list v `(destash! ,v ,r))))))
            (join! bs (list (props args) r))))
        (let forms `(let ,pre ,@inits (let ,bs ,@body))
          (list args1 (if (is? doc) `(do ,doc ,forms) forms)))))))

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
  (setenv name variable: true)
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
                `(%idx ,b ,a))))
          (reverse (split str "."))))

(define-global parse-access? (form)
  (and (string? form)
       (not (string-literal? form))
       (not (id-literal? form))
       (is? (search form "."))
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
          (= x '%expansion) (at form 1)
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
                    (props? x)))
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
          "from" "str" "print")))

(define-global reserved? (x)
  (or (has? (get reserved 'all) x)
      (has? (get reserved target) x)))

(define valid-code? (n)
  (or (number-code? n)         ; 0-9
      (and (> n 64) (< n 91))  ; A-Z
      (and (> n 96) (< n 123)) ; a-z
      (= n 95)))               ; _

(define compile-keyword (x)
  (escape x))

(define-global compile-name (name)
  (if (keyword? name) (compile (clip name 1)) (compile name)))

(define-global compile-id (id raw?)
  (if (keyword? id)
      (compile-keyword id)
      (= (code id 0) 46) ; .
      (cat "." (compile-id (clip id 1) true))
    (let (x (if (target? 'py) "L_" "_")
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
      (if raw? id1
          (reserved? id1)
          (cat x id1)
          id1))))

(define-global valid-id? (x)
  (and (some? x) (= x (compile-id x))))

(let (names (obj))
  (define-global unique (x)
    (let x (compile-id x)
      (if (has? names x)
          (let i (get names x)
            (inc (get names x))
            (unique (cat x i)))
        (do (set (get names x) 1)
            (cat "__" x))))))

(define-global key (k)
  (if (target? 'py)
      (compile k)
      (string-literal? k)
      (let i (inner k)
        (if (valid-id? i)
            i
          (cat "[" k "]")))
      (cat "[" (compile k) "]")))

(define-global mapo (f t)
  (with o ()
    (each (k v) t
      (let x (f v)
        (when (is? x)
          (add o (literal k))
          (add o x))))))

(define infix
  `((%not: (js: ! lua: not py: not) %unm: -)
    (%mul: * %div: / %idiv: // %mod: %)
    (%cat: (js: + lua: .. py: +))
    (%add: + %sub: -)
    (%lt: < %gt: > %le: <= %ge: >=)
    (%eq: (js: === lua: == py: ==))
    (%in: (py: in) %is: (py: is))
    (%and: (js: && lua: and py: and))
    (%or: (js: ,"||" lua: or py: or))))

(define unary? (form)
  (and (two? form) (in? (hd form) '(%not %unm))))

(define index (k)
  (target k lua: (when (number? k) (- k 1))))

(define precedence (form)
  (unless (or (atom? form) (unary? form))
    (when (atom? (hd form))
      (each (k v) infix
        (if (has? v (hd form)) (return (index k))))))
  0)

(define getop (op)
  (when (string? op)
    (find (fn (level)
            (let x (has level op)
              (if (= x true) op
                  (string? x) x
                  (is? x) (has x target))))
          infix)))

(define infix? (x)
  (is? (getop x)))

(define-global infix-operator? (x)
  (and (not (atom? x)) (infix? (hd x))))

(define-global compile-args (args default?)
  (let (s "(" c "")
    (step x args
      (cat! s c (compile x))
      (when (and (target? 'py)
                 default?
                 (not (id-literal? x))
                 (not (= x "...")))
        (cat! s "=None"))
      (set c ", "))
    (cat s ")")))

(define escape-newlines (s)
  (if (and (nil? (search s "\n"))
           (nil? (search s "\r")))
      s
    (with s1 ""
      (for i (# s)
        (let c (char s i)
          (cat! s1 (if (= c "\n") "\\n"
                       (= c "\r") "\\r"
                     c)))))))

(define compile-nil ()
  (if (target? 'py) "None"
      (target? 'lua) "nil"
    "undefined"))

(define compile-boolean (x)
  (if (target? 'py)
      (if x "True" "False")
    (if x "true" "false")))

(define triple-quoted? (x)
  (and (string-literal? x)
       (string-literal? (inner x))
       (string-literal? (inner (inner x)))))

(define un-triple-quote (x)
  (escape (inner (inner (inner x)))))

(define compile-string (x)
  (if (triple-quoted? x)
      (if (target? 'py) x
        (escape-newlines (un-triple-quote x)))
    (escape-newlines x)))

(define compile-rest ()
  (if (target? 'py)
      "*_args, **_keys"
      (target? 'js)
      (cat "..." (compile "*args"))
    "..."))

(define compile-atom (x raw?)
  (if (= x "nil") (compile-nil)
      (= x "...") (compile-rest)
      (id-literal? x) (inner x)
      (string-literal? x) (compile-string x)
      (string? x) (compile-id x raw?)
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
        (special: special stmt: stmt tr: self-tr?) (getenv x)
        p (if (and stmt? (not stmt)) (indentation) "")
        tr (terminator (and stmt? (not self-tr?))))
    (cat p (apply special args) tr)))

(define parenthesize-call? (x)
  (or (and (not (atom? x))
           (= (hd x) '%function))
      (> (precedence x) 0)))

(define-global method-call? (form)
  (let x (if (list? form) (hd form) form)
    (and (string? x)
         (> (# x 1) 1)
         (= (char x 0) "."))))

(define compile-call (form)
  (let (f (hd form)
        f1 (compile-name f)
        args (stash* (tl form))
        args (if (method-call? (hd args))
                 (mapcat compile args "")
                 (compile-args args)))
    (if (parenthesize-call? f)
        (cat "(" f1 ")" args)
      (cat f1 args))))

(define op-delims (parent child right: right)
  (if ((if right >= >)
       (precedence child)
       (precedence parent))
      (list "(" ")")
    (list "" "")))

(define compile-infix (form)
  (let ((op rest: (a b)) form
        (ao ac) (op-delims form a)
        (bo bc) (op-delims form b right: true)
        a (compile a)
        b (compile b)
        op (getop op))
    (if (unary? form)
        (cat op ao " " a ac)
      (cat ao a ac " " op " " bo b bc))))

(define-global compile-body (body)
  (let s (with-indent (compile body stmt: true))
      (if (and (target? 'py) (none? s))
          (with-indent (cat (indentation) "pass\n"))
        s)))

(define-global compile-function (args body name: name prefix: prefix async: async)
  (let (id (if name (compile-name name) "")
        args1 (if (has args 'rest)
                  `(,@args ,"...")
                args)
        args (compile-args args1 true)
        body (compile-body body)
        ind (indentation)
        p (if prefix (cat prefix " ") "")
        tr (if (target? 'js) "" "end")
        a (if (and async (not (target? 'lua))) "async " ""))
    (if name (cat! tr "\n"))
    (if (target? 'js)
        (cat a "function " id args " {\n" body ind "}" tr)
        (target? 'py)
        (let ws (if (none? ind) "\n" "")
          (cat a "def " id args ":\n" body ws))
      (cat p "function " id args "\n" body ind tr))))

(define can-return? (form)
  (and (is? form)
       (or (atom? form)
           (and (not (= (hd form) '%return))
                (not (statement? (hd form)))))))

(define-global compile (form raw? stmt: stmt)
  (if (nil? form) ""
      (special-form? form)
      (compile-special form stmt)
    (let (tr (terminator stmt)
          ind (if stmt (indentation) "")
          form (if (atom? form) (compile-atom form raw?)
                   (infix? (hd form)) (compile-infix form)
                 (compile-call form)))
      (cat ind form tr))))

(define lower-statement (form tail?)
  (either
    (let (hoist () e (lower form hoist true tail?))
      (if (and (some? hoist) (is? e))
          `(%do ,@hoist ,e)
          (is? e) e
          (> (# hoist) 1) `(%do ,@hoist)
        (hd hoist)))
    '(%do)))

(define lower-body (body tail?)
  (lower-statement `(%do ,@body) tail?))

(define literal? (form)
  (or (atom? form)
      (= (hd form) '%array)
      (= (hd form) '%object)
      (= (hd form) '%list)
      (= (hd form) ',)))

(define standalone? (form)
  (or (and (not (target? 'lua)) (string-literal? form))
      (and (not (atom? form))
           (not (infix? (hd form)))
           (not (literal? form))
           (not (= '%get (hd form))))
      (id-literal? form)))

(define lower-do (args hoist stmt? tail?)
  (step x (almost args)
    (let-when e (lower x hoist stmt?)
      (when (standalone? e)
        (add hoist e))))
  (let e (lower (last args) hoist stmt? tail?)
    (if (and tail? (can-return? e))
        `(%return ,e)
      e)))

(define lower-set (args hoist stmt? tail?)
  (let ((lh rh) args
        lh1 (lower lh hoist)
        rh1 (lower rh hoist))
    (add hoist `(%set ,lh1 ,rh1))
    (unless (and stmt? (not tail?))
      lh1)))

(define lower-if (args hoist stmt? tail?)
  (let ((cond then else) args)
    (if stmt?
        (add hoist
             `(%if ,(lower cond hoist)
                   ,(lower-body (list then) tail?)
                   ,@(if (is? else) (list (lower-body (list else) tail?)))))
      (let-unique (e)
        (add hoist `(%local ,e nil))
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
          (lower `(%do (%local ,id ,a)
                      ,(if (= x '%and)
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
          `(%while ,c
            ,(lower-body body))
        `(%while true
           (%do ,@pre
                (%if (%not ,c) (%break))
                ,(lower-body body)))))))

(define lower-for (args hoist)
  (let ((h k rest: body) args)
    (add hoist
         `(%for ,(lower h hoist) ,k
            ,(lower-body body)
            ,@(props body)))))

(define lower-with (args hoist stmt? tail?)
  (let ((h rest: body) args)
    (if (and stmt? (not tail?))
        (add hoist
           `(%with ,(lower h hoist)
              ,(lower-body body tail?)
              ,@(props body)))
      (let-unique (e)
        (add hoist `(%local ,e))
        (add hoist `(%with ,(lower h hoist)
                     ,(lower `(%set ,e (%do ,@body)))
                     ,@(props body)))
        e))))

(define lower-block (args hoist stmt? tail?)
  (let ((name h rest: body) args)
    (add hoist
       `(%block ,name ,(lower h hoist)
          ,(lower-body body tail?)))))

(define lower-from (args hoist stmt? tail?)
  (let ((name import_ id as_ alias) args)
    (add hoist `(from ,@args))
    (or alias id)))

(define lower-import ((name rest: alias) hoist stmt? tail?)
  (let (as (if (= (hd alias) "as") (at alias 1) (hd alias))
        id (or as name))
    (add hoist `(import ,name ,@alias))
    (unless stmt?
      id)))

(define lower-function (args hoist)
  (if (target? 'py)
      (let-unique (f)
        (lower `(%do (%local-function ,f ,@args) ,f) hoist))
    (let ((a rest: body) args)
      `(%function ,a ,(lower-body body true) ,@(props body)))))

(define lower-definition (kind args hoist)
  (let ((name args rest: body) args)
    (add hoist `(,kind ,name ,args ,(lower-body body true) ,@(props body)))))

(define lower-call (form hoist)
  (let form (map (fn (x) (lower x hoist)) form)
    (if (some? form) form)))

(define pairwise? (form)
  (in? (hd form) '(%lt %le %eq %ge %gt)))

(define lower-pairwise (form)
  (if (pairwise? form)
      (let (e () (x rest: args) form)
        (reduce (fn (a b)
                  (add e `(,x ,a ,b)) a)
                args)
        `(%and ,@(reverse e)))
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
      (if (= x '%do) (lower-do args hoist stmt? tail?)
          (= x '%call) (lower args hoist stmt? tail?)
          (= x '%set) (lower-set args hoist stmt? tail?)
          (= x '%if) (lower-if args hoist stmt? tail?)
          (= x '%try) (lower-try args hoist tail?)
          (= x '%while) (lower-while args hoist)
          (= x '%for) (lower-for args hoist)
          (= x '%with) (lower-with args hoist stmt? tail?)
          (= x '%block) (lower-block args hoist stmt? tail?)
          (= x '%cases) (lower-cases args hoist stmt? tail?)
          (= x 'import) (lower-import args hoist stmt? tail?)
          (= x 'from) (lower-from args hoist stmt? tail?)
          (= x '%function) (lower-function args hoist)
          (or (= x '%local-function)
              (= x '%global-function))
          (lower-definition x args hoist)
          (in? x '(%and %or))
          (lower-short x args hoist)
          (statement? x) (lower-special form hoist)
        (lower-call form hoist)))))

(define-global expand (form)
  (lower (macroexpand form)))

(target js:
  (defvar global (if (not (undefined? window)) window
                     (not (undefined? self)) self this)))

(target js:
  (unless (undefined? require)
    (set (idx global require) |require|)
    (unless (undefined? module)
      (set (idx module filename) ((idx (require 'path) resolve) "repl")
           (idx module paths) ((idx (require 'module) _nodeModulePaths)
                               (idx module filename))))))

(target js:
  (define run (code context)
    (let f (new (Function (cat "with(this) {\n" code "\n}" )))
      ((idx f call) (either context global)))))

(target lua: (define load1 (or |loadstring| |load|)))
(target lua:
  (define run (code)
    (let |f,e| (load1 code)
      (if f (f) (error (cat e " in " code))))))

(target py:
  (define run (code globals locals)
    (let (globals (either globals lumen-globals)
          locals (either locals globals))
      (|exec| code globals locals)
      nil)))

(define eval-result (globals locals)
  (target py:
    (let state (or locals globals lumen-globals)
      (get state "lumen_result"))
    lumen-result))

(define-global eval (form globals locals)
  (let previous target
    (set target (language))
    (let code (compile (expand `(%set lumen-result ,form)))
      (set target previous)
      (run code globals locals)
      (eval-result globals locals))))

(define-global immediate-call? (x)
  (and (not (atom? x)) (not (atom? (hd x))) (= (hd (hd x)) '%function)))

(define-special %do forms stmt: true tr: true
  (with s ""
    (step x forms
      (when (and (target? 'lua)
                 (immediate-call? x)
                 (= "\n" (char s (edge s))))
        (set s (cat (clip s 0 (edge s)) ";\n")))
      (cat! s (compile x stmt: true))
      (unless (atom? x)
        (if (or (= (hd x) '%return)
                (= (hd x) '%break))
            (break))))))

(define-special %if (cond cons alt) stmt: true tr: true
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

(define-special %while (cond form) stmt: true tr: true
  (let (cond (compile cond)
        body (compile-body form)
        ind (indentation))
    (if (target? 'js)
        (cat ind "while (" cond ") {\n" body ind "}\n")
        (target? 'py)
        (cat ind "while " cond ":\n" body)
      (cat ind "while " cond " do\n" body ind "end\n"))))

(define-special %for (t k form async: async) stmt: true tr: true
  (let (t (compile t)
        k (compile k)
        ind (indentation)
        body (compile-body form)
        a (if async "async " ""))
    (if (target? 'lua)
        (cat ind "for " k " in next, " t " do\n" body ind "end\n")
        (target? 'py)
        (cat ind a "for " k " in " t ":\n" body)
      (cat ind "for (" k " in " t ") {\n" body ind "}\n"))))

(define-special %with (t form async: async) stmt: true tr: true
  (let (t (compile t)
        ind (indentation)
        body (compile-body form)
        a (if async "async " ""))
    (if (target? 'py)
        (cat ind a "with " t ":\n" body)
      "")))

(define-special %block (name t form) stmt: true tr: true
  (let (t (compile t)
        ind (indentation)
        body (compile-body form)
        sep (if (some? t) " " "")
        lh (if (some? t) "(" "")
        rh (if (some? t) ")" ""))
    (if (target? 'py)
        (cat ind name sep t ":\n" body)
      (cat ind name sep lh t rh sep "{\n" body ind "}\n"))))

(define-special %try (form) stmt: true tr: true
  (let (ind (indentation)
        body (compile-body form)
        hf (if (target? 'py)
               `(%do (import sys)
                     (%local e ((%idx sys exc_info)))
                     (%return (%array false (%get e 1) e)))
             `(%return (%array false e)))
        h (with-indent (compile hf stmt: true)))
    (if (target? 'js)
        (cat ind "try {\n" body ind "}\n"
             ind "catch (e) {\n" h ind "}\n")
      (cat ind "try:\n" body
           ind "except:\n" h))))

(define-special %delete (place) stmt: true
  (cat (indentation) (if (target? 'py) "del " "delete ") (compile place)))

(define-special %break () stmt: true
  (cat (indentation) "break"))

(define-special %function (args rest: body)
  (apply compile-function args body))

(define-special %global-function (name args rest: body) stmt: true tr: true
  (if (or (target? 'lua) (target? 'py))
      (let x (apply compile-function args body name: name)
        (cat (indentation) x))
    (compile `(%set ,name (%function ,args ,@body)) stmt: true)))

(define-special %local-function (name args rest: body) stmt: true tr: true
  (if (or (target? 'lua) (target? 'py))
      (let x (apply compile-function args body name: name prefix: 'local)
        (cat (indentation) x))
    (compile `(%local ,name (%function ,args ,@body)) stmt: true)))

(define-special %return (x) stmt: true
  (let x (if (nil? x)
             "return"
           (cat "return " (compile x)))
    (cat (indentation) x)))

(define-special %new (x)
  (cat "new " (compile x)))

(define-special %typeof (x)
  (cat "typeof(" (compile x) ")"))

(define-special %error (x) stmt: true
  (let e (if (target? 'js)
             (cat "throw " (compile `(%new (Error ,x))))
             (target? 'py)
             (cat "raise " (compile `(Exception ,x)))
           (cat "error(" (compile x) ")"))
    (cat (indentation) e)))

(define-special %throw (x) stmt: true
  (let e (if (target? 'js)
             (cat "throw " (compile x))
             (target? 'py)
             (cat "raise " (compile x))
           (cat "error(" (compile x) ")"))
    (cat (indentation) e)))

(define-special %local (name value) stmt: true
  (if (and (nil? value) (target? 'py)) (set value "nil"))
  (let (id (compile name)
        value1 (compile value)
        rh (if (is? value) (cat " = " value1) "")
        keyword (if (target? 'js) "var " (target? 'lua) "local " "")
        ind (indentation))
    (cat ind keyword id rh)))

(define-special %set (lh rh) stmt: true
  (let (lh (compile lh)
        rh (compile (if (nil? rh) 'nil rh)))
    (cat (indentation) lh " = " rh)))

(define-special %get (t k)
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

(define-special %idx (t k)
  (let (t1 (compile t)
        k1 (compile k 'raw))
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
        sep (if (target? 'lua) " = " ": ")
        ind (with-indent (indentation))
        pad (if (> (# forms) 2) (cat "\n" ind))
        end (if (is? pad) (cat "\n" (indentation)) ""))
    (cat! s (either pad ""))
    (each (k v) (pair forms)
      (when (number? k)
        (let ((k v) v)
          (cat! s c (key k) sep (with-indent (compile v)))
          (set c (cat "," (either pad " "))))))
    (cat s end "}")))

(define-special %list (form comps cond kind: kind)
  (let (s (compile form)
        (lh rh) (if (= kind 'object) (list "{" "}") (list "[" "]")))
    (unless (= kind 'object)
      (set s (cat "(" s ")")))
    (step (k v) comps
      (cat! s " for " (compile k) " in " (compile v)))
    (when (is? cond)
      (cat! s " if " (compile cond)))
    (cat lh s rh)))

(define-special %literal args
  (apply cat (map compile args)))

(define-special global (x) stmt: true tr: true
  (if (target? 'py)
      (cat (indentation) "global " (compile x) "\n")
    ""))

(define-special import (name rest: alias) stmt: true
  (let (ind (indentation)
        as (if (= (hd alias) "as") (at alias 1) (hd alias))
        id (or as name))
    (if (target? 'py)
        (with s (cat ind "import " (compile name))
          (if as (cat! s " as " (compile id))))
      (cat ind (compile `(%local ,id (require ,(escape name))))))))

(define-special from (name rest: imports) stmt: true
  (let (ind (indentation)
        id name
        as (with r nil
             (set r (drop imports))
             (if (= (last imports) "as")
                 (drop imports)
              (do (add imports r)
                  (set r nil))))
        names (if (= (hd imports) "import") (tl imports) imports)
        names (mapcat (fn (x) (if (= x "*") x (compile x))) names ", "))
    (if (target? 'py)
        (with s (cat ind "from " (compile name) " import " names)
          (if as (cat! s " as " (compile as))))
      "")))

(define-special , args
  (if (none? args) ", "
      (one? args) (cat ", " (compile (hd args)))
    (mapcat compile args ", ")))

(define-special : args
  (if (none? args) ":"
      (one? args) (cat ":" (compile (hd args)))
    (mapcat compile args ":")))

(define-special %as (form id)
  (cat (compile form) " as " (compile id)))

(define-special yield args stmt: true
  (cat (indentation) "yield " (mapcat compile args ", ")))

(define-special await (x)
  (let a (if (target? 'lua) "" "await ")
    (cat a (compile x))))

(define-special %b (x)
  (cat "b" (compile x)))

(define-special %f (x)
  (cat "f" (compile x)))

(define-special %r (x)
  (cat "r" (compile x)))

(define-special @ (x) stmt: true
  (cat (indentation) "@" (compile x)))

(export run
        eval
        expand
        compile)
