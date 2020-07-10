(define-macro quote (form)
  (quoted form))

(define-macro quasiquote (form)
  (quasiexpand form 1))

(define-macro set args
  `(%do ,@(map (fn ((lh rh))
                 (set lh (macroexpand lh))
                 (if (and (not (atom? lh)) (= (hd lh) 'has))
                     `(%set (%get ,@(tl lh)) ,rh)
                   `(%set ,lh ,rh)))
               (pair args))))

(define-macro at (l i)
  (if (and (target? 'lua) (number? i))
      (inc i)
      (target? 'lua)
      (set i `(+ ,i 1)))
  `(%get ,l ,i))

(define-macro wipe (place)
  (if (target? 'lua)
      `(set ,place nil)
    `(%delete ,place)))

(define-macro list body
  (if (and (> (# body) 2)
           (= (at body 1) 'for)
           (= (at body 3) 'in))
      (let ((expr rest: body) body
            comps () cond nil)
        (while (and (> (# body) 2)
                    (= (at body 0) 'for)
                    (= (at body 2) 'in))
          (let ((_for names _in l rest: body1) body)
            (add comps (list names l))
            (set body body1)))
        (when (= (hd body) 'if)
          (let ((_if expr) body)
            (set cond expr)))
        `(%list ,expr ,comps ,cond))
    (let-unique (x)
      (let (l (target py: (obj) ()) forms ())
        (each (k v) body
          (if (number? k)
              (set (get l k) v)
            (add forms `(%set (%get ,x ',k) ,v))))
        (if (some? forms)
            `(let ,x (object (%array ,@l)) ,@forms ,x)
          `(%array ,@l))))))

(define-macro if branches
  (hd (expand-if branches)))

(define-macro case (expr cmp: (o cmp '=) rest: clauses)
  (let-unique (x)
    (let (eq (fn (_) `(,cmp ,_ ,x))
          cl (fn ((a b))
               (if (nil? b) (list a)
                   (or (string? a) (number? a)) (list (eq a) b)
                   (and (list? a) (hd? a 'quote)) (list (eq a) b)
                   (one? a) (list (eq (hd a)) b)
                   (> (# a) 1) (list `(or ,@(map eq a)) b))))
      `(let ,x ,expr
         (if ,@(apply join (map cl (pair clauses))))))))

(define-macro of (x rest: values)
  `(case ,x (,@values) true false ,@(props values)))

(define-macro when (cond rest: body)
  `(%if ,cond (%do ,@body)))

(define-macro unless (cond rest: body)
  `(%if (%not ,cond) (%do ,@body)))

(define-macro obj body
  (if (and (> (# body) 2)
           (= (at body 1) 'for)
           (= (at body 3) 'in))
      (let ((expr rest: body) body
            comps () cond nil)
        (while (and (> (# body) 2)
                    (= (at body 0) 'for)
                    (= (at body 2) 'in))
          (let ((_for names _in l rest: body1) body)
            (add comps (list names l))
            (set body body1)))
        (when (= (hd body) 'if)
          (let ((_if expr) body)
            (set cond expr)))
        (when (and (list? expr) (hd? expr ',))
          (set expr `(: ,@(tl expr))))
        `(%list ,expr ,comps ,cond kind: object))
    `(%object ,@(mapo (fn (x) x) body))))

(define-macro let (bs rest: body)
  (if (or (atom? bs) (hd? bs ',)) `(let (,bs ,(hd body)) ,@(tl body))
      (none? bs) `(%do ,@body)
    (let ((lh rh rest: bs2) bs
          (id val rest: bs1) (bind lh rh))
      (let renames ()
        (unless (id-literal? id)
          (let id1 (unique id)
            (set renames (list id id1)
                 id id1)))
        `(%do (%local ,id ,val)
              (let-symbol ,renames
                (let ,(join bs1 bs2) ,@body)))))))

(define-macro with (x v rest: body)
  (if (= v 'as)
      `(%with (%as ,x ,(hd body)) ,@(tl body))
      (or (not (atom? x))
          (has body 'async))
      `(%with ,x ,v ,@body)
    `(let (,x ,v) ,@body ,x)))

(define-macro let-when (x v rest: body)
  (let-unique (y)
    `(let ,y ,v
       (when (yes ,y)
         (let (,x ,y)
           ,@body)))))

(define-macro define-macro (name args rest: body)
  (let form `(setenv ',name macro: (fn ,args ,@body))
    (eval form)
    form))

(define-macro define-special (name args rest: body)
  (let form `(setenv ',name special: (fn ,args ,@body) ,@(props body))
    (eval form)
    form))

(define-macro define-symbol (name expansion)
  (setenv name symbol: expansion)
  `(setenv ',name symbol: ',expansion))

(define-macro define-reader ((char s) rest: body)
  `(%set (%get read-table ,char) (fn (,s) ,@body)))

(define-macro define (name x rest: body)
  (setenv name variable: true)
  (if (some? body)
      `(%local-function ,name ,@(bind* x body) ,@(props body))
    `(%local ,name ,x ,@(props body))))

(define-macro define-global (name x rest: body)
  (setenv name toplevel: true variable: true)
  (if (some? body)
      `(%global-function ,name ,@(bind* x body) ,@(props body))
    `(set ,name ,x ,@(props body))))

(define-macro get-value (x)
  `(has (setenv ,x toplevel: true) 'value))

(define-macro define-constant (name x)
  `(%do (setenv ',name toplevel: true value: ,(either x `(get-value ',name)))
        (define-symbol ,name (get-value ',name))))

(define-macro define-variable (name x)
  (if (is? x)
      `(define-constant ,name (either (get-value ',name) ,x))
    `(define-constant ,name)))

(define-macro after (x rest: body)
  (let-unique (ok r)
    `(target
       lua: (let ((,ok ,r) (guard ,x))
              ,@body
              (if ,ok ,r (throw ,r)))
       (try ,x (finally ,@body)))))

(define-macro with-frame body
  `(%do (add environment (obj))
        (after (%do ,@body)
          (drop environment))))

(define-macro with-values body
  `(with-frame
     ,@(with forms ()
         (each (k v) body
           (unless (number? k)
             (add forms `(setenv ',k value: ,v)))))))

(define-macro with-bindings ((names) rest: body)
  (let-unique (x)
   `(with-frame
      (each ,x ,names
        (setenv ,x variable: true))
      ,@body)))

(define-macro let-macro (definitions rest: body)
  (with-frame
    (map (fn (m)
           (macroexpand `(define-macro ,@m)))
         definitions)
    `(%do ,@(macroexpand body))))

(define-macro let-symbol (expansions rest: body)
  (with-frame
    (map (fn ((name exp))
           (macroexpand `(define-symbol ,name ,exp)))
         (pair expansions))
    `(%do ,@(macroexpand body))))

(define-macro let-unique (names rest: body)
  (let bs (map (fn (n)
                 (list n `(unique ',n)))
               names)
    `(let ,(apply join bs)
       ,@body)))

(define-macro fn (args rest: body)
  `(%function ,@(bind* args body) ,@(props body)))

(define-macro apply (f rest: args)
  (if (> (# args) 1)
      `(%call apply ,f (join (list ,@(almost args)) ,(last args) (list ,@(props args))))
      (props? args)
      `(%call apply ,f (join ,@args (list ,@(props args))))
      `(%call apply ,f ,@args)))

(define-macro guard (expr)
  `(let-macro ((%return args (error "Can't return from guard")))
     (target lua:
             (list (xpcall
                     (%function () ,expr)
                     (%function (m)
                       (if (obj? m) m
                           (obj stack: ((idx debug traceback))
                                message: (if (string? m) (clip m (+ (search m ": ") 2))
                                             (nil? m) ""
                                             (str m)))))))
             ((%function () (%try (list true ,expr)))))))

(define-macro each (x t rest: body)
  (let-unique (o n i)
    (let ((k v) (if (atom? x) (list i x)
                  (if (> (# x) 1) x
                      (list i (hd x)))))
      `(let (,o ,t ,k nil)
         (%for (target py: (indices ,o) ,o) ,k ,@(props body)
           (let (,v (%get ,o ,k))
             ,@(if (or (target? 'lua) (target? 'py))
                   body
                 `((let ,k (if (numeric? ,k)
                               (parseInt ,k)
                             ,k)
                     ,@body)))))))))

(define-macro for (i to rest: body)
  (if (= to 'in)
      `(%for ,(hd body) ,i (%do ,@(tl body)) ,@(props body))
    `(let ,i 0
       (while (< ,i ,to)
         ,@body
         (inc ,i)))))

(define-macro step (v t rest: body)
  (let-unique (x i)
    `(let (,x ,t)
       (for ,i (# ,x)
         (let (,v (at ,x ,i))
           ,@body)))))

(define-macro set-of xs
  (let l (target py: (obj) ())
    (each x xs
      (set (get l x) true))
    `(obj ,@l)))

(define-macro target? (x)
  `(= target ,x))

(define-macro target clauses
  (if (has? clauses target)
      (get clauses target)
    (hd clauses)))

(define-macro language () `',target)

(define-macro join! (a rest: bs)
  `(set ,a (join ,a ,@bs)))

(define-macro cat! (a rest: bs)
  `(set ,a (cat ,a ,@bs)))

(define-macro inc (n by)
  `(set ,n (+ ,n ,(if (nil? by) 1 by))))

(define-macro dec (n by)
  `(set ,n (- ,n ,(if (nil? by) 1 by))))

(define-macro with-indent (form)
  (let-unique (x)
    `(%do (inc indent-level)
          (with ,x ,form
            (dec indent-level)))))

(define-macro export names
  (let forms (map (fn (k)
                    (if (= k (compile k))
                        `(%set (idx exports ,k) ,k)
                      `(%do (%set (%get exports ',k) ,k)
                            (%set (idx exports ,k) ,k))))
                  names)
    (if (target? 'js)
        `(%do ,@forms)
        (target? 'lua)
        `(let exports (or exports (obj))
           ,@forms
           (return exports)))))

(define-macro when-compiling body
  (eval `(%do ,@body)))

(define-macro during-compilation body
  (with form `(%do ,@body)
    (eval form)))

(define-macro def (name rest: body)
  `(define-global ,name ,@body))

(define-macro mac (name rest: body)
  `(define-macro ,name ,@body))

(define-macro defconst (name rest: value)
  `(def ,name ,@value))

(define-macro undefined? (name)
  `(target js: (= (typeof ,name) "undefined")
           lua: (= (idx _G ,name) nil)
           py: (not (%in ',(compile name) (globals)))))

(define-macro defvar (name rest: value)
  `(when (undefined? ,name)
     (target py: (global ,name))
     (defconst ,name ,@value)))

(define-macro async (keyword rest: body)
  `(,keyword ,@body async: true))

(define-macro %read-from-file (name)
  `(when-compiling
     `(%do ,@(read-from-file ,name))))

(mac the (name)
  `(getenv ',name 'value))

(define-macro cat (a rest: bs)
  (if (nil? a) ""
      (none? bs) a
      (one? bs) `(target py: (%call cat ,a ,@bs) (%cat ,a ,@bs))
    `(target py: (%call cat ,a ,@bs) (%cat ,a (cat ,@bs)))))

(define-macro + args
  (if (none? args) 0
      (one? args) (hd args)
    `(%add ,@args)))

(define-macro - args
  (if (none? args) 0
      (one? args) `(%unm ,(hd args))
    `(%sub ,@args)))

(define-macro * args
  (if (none? args) 1
      (one? args) (hd args)
    `(%mul ,@args)))

(define-macro / args
  (if (none? args) 1
      (one? args) (hd args)
    `(%div ,@args)))

(define-macro // args
  (if (none? args) 1
      (one? args) (hd args)
    `(%idiv ,@args)))

(define-macro % args
  (if (none? args) 0
      (one? args) (hd args)
    `(%mod ,@args)))

(define-macro < (a rest: bs)
  (if (none? bs) true
      (one? bs) `(%lt ,a ,@bs)
    `(%and (%lt ,a ,(hd bs)) (< ,@bs))))

(define-macro <= (a rest: bs)
  (if (none? bs) true
      (one? bs) `(%le ,a ,@bs)
    `(%and (%le ,a ,(hd bs)) (<= ,@bs))))

(define-macro = (a rest: bs)
  (if (none? bs) true
      (one? bs) `(%eq ,a ,@bs)
    `(%and (%eq ,a ,(hd bs)) (= ,@bs))))

(define-macro >= (a rest: bs)
  (if (none? bs) true
      (one? bs) `(%ge ,a ,@bs)
    `(%and (%ge ,a ,(hd bs)) (>= ,@bs))))

(define-macro > (a rest: bs)
  (if (none? bs) true
      (one? bs) `(%gt ,a ,@bs)
    `(%and (%gt ,a ,(hd bs)) (> ,@bs))))

(define-macro not args
  (if (none? args) false
      (one? args) `(%not ,@args)
    `(%and (%not ,(hd args)) (not ,@(tl args)))))

(define-macro and (a rest: bs)
  (if (nil? a) true
      (none? bs) a
      (one? bs) `(%and ,a ,@bs)
    `(%and ,a (and ,@bs))))

(define-macro or (a rest: bs)
  (if (nil? a) false
      (none? bs) a
      (one? bs) `(%or ,a ,@bs)
    `(%or ,a (or ,@bs))))

(define-macro break args
  `(%break ,@args))

(define-macro return args
  `(%return ,@args))

(define-macro while (c rest: body)
  `(%while ,c ,@body))

(define-macro do body
  `(%do ,@body))

(define-macro get args
  `(%get ,@args))

(define-macro idx args
  `(%idx ,@args))

(define-macro new args
  `(%new ,@args))

(define-macro typeof args
  `(%typeof ,@args))

(define-macro error args
  `(%error ,@args))

(define-macro throw args
  `(%throw ,@args))

(define-macro raise args
  `(%throw ,@args))

(define-macro is args
  `(%is ,@args))

(define-macro in args
  `(%in ,@args))

(define-macro as args
  `(%as ,@args))

(define-macro %expand-case (x rest: body)
  (let ((a rest: bs) (if (atom? x) `(,x) x))
    `(%block ,a ,@(if (none? bs) '((%literal)) bs) ,@body)))

(define-macro %cases args
  (if (none? args) `(do)
      (one? args) `(%expand-case ,@(hd args))
    (let-unique (r)
      `(with ,r nil
         ,@(map (fn ((x rest: body)) `(%expand-case ,x (%set ,r (%do ,@body))))
                (almost args))
         (%expand-case ,@(last args))))))

; python-specific

(define-macro try (x rest: cases)
  (let fin `(finally)
    (each x cases
      (when (hd? x 'finally)
        (set fin x)))
    `(%cases (try ,x)
       ,@(with forms ()
           (step (x rest: body) cases
             (if (= x 'finally)
                  (do)
                 (and (= x 'except) (= (has body 1) 'as))
                 (let ((kind _ name rest: body) body)
                   (add forms `((,x (%as ,kind ,name)) ,@body)))
                 (= x 'except)
                 (if (one? body)
                     (add forms `((,x Exception) ,@body))
                   (let ((kind rest: body) body)
                     (add forms `((,x ,kind) ,@body))))
                (error "Unknown try clause"))))
       ,fin)))

(define-macro errsafe (x (o else 'nil))
  `(let ((ok v) (guard ,x))
     (if ok v ,else)))

(define-macro dbg ()
  `(target py: (do (import pdb) ((idx pdb set-trace))) (do)))

(define-macro see (form)
  (let form (expand form)
    (print (compile (expand `(%set lumen-result ,form))))
    form))
