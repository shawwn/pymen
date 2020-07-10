(target py: (set lumen-globals (globals)))
(define-global environment (list (obj)))

(define-global nil? (x)
  (target
    py: (is x nil)
    js: (or (= x nil) (= x null))
    lua: (= x nil)))

(define-global is? (x) (not (nil? x)))

(define-global no (x)
  (or (nil? x)
      (target
        py: (is x false)
        (= x false))))

(define-global yes (x) (not (no x)))
(define-global either (x y) (if (is? x) x y))

(define-global has? (l k)
  (target js: ((idx l hasOwnProperty) k)
          py: (if (isinstance l dict)
                  (%in k l)
                (and (number? k) (>= k 0) (< k (len l))))
          lua: (is? (get l k))))

(define-global has (l k else)
  (if (has? l k) (get l k) else))

(define-global array? (x)
  (target js: ((idx Array isArray) x)
          py: (or (isinstance x list)
                  (isinstance x tuple))
          lua: (= (type x) 'table)))

(target py:
  (define-global indices (x)
    (if (isinstance x dict) x (range (len x)))))

(define-global array (x)
  (if (array? x) x
    (with l ()
      (target
        py: (step v x
              (add l v))
        (each (k v) x
          (when (number? k)
            (set (get l k) v)))))))

(define-global object (x)
  (if (array? x)
      (with l (obj)
        (each (k v) x
          (set (get l k) v)))
    x))

(define-global length (x upto)
  (with n -1
    (let upto (either upto inf)
      (each (k v) x
        (when (number? k)
          (target lua: (dec k))
          (when (> k n)
            (set n k)
            (if (>= n upto) (break)))))
      (inc n))))

(define-global # (x upto)
  (target lua: (%literal |#| x)
    (if (or (string? x)
            (array? x))
        (target js: (idx x length)
                py: (len x))
      (length x upto))))

(define-global none? (x) (= (# x 0) 0))
(define-global some? (x) (> (# x 0) 0))
(define-global one? (x) (= (# x 1) 1))
(define-global two? (x) (= (# x 2) 2))

(define-global hd (l) (target py: (has l 0) (at l 0)))

(target js: (define-global type (x) (typeof x)))

(target py:
  (do (import numbers)
      (define-global string? (x) (isinstance x |str|))
      (define-global number? (x) (and (not (boolean? x)) (isinstance x (idx numbers Number))))
      (define-global boolean? (x) (isinstance x bool))
      (define-global function? (x) (callable x)))
  (do (define-global string? (x) (= (type x) 'string))
      (define-global number? (x) (= (type x) 'number))
      (define-global boolean? (x) (= (type x) 'boolean))
      (define-global function? (x) (= (type x) 'function))))

(define-global obj? (x)
  (and (is? x)
       (target lua: (= (type x) 'table)
               js: (= (type x) 'object)
               py: (isinstance x dict))))

(define-global list? (x)
  (or (obj? x) (array? x)))

(define-global atom? (x)
  (or (nil? x) (string? x) (number? x) (boolean? x)))

(define-global hd? (l x)
  (if (function? x) (x (hd l))
      (nil? x) (some? l)
    (= x (hd l))))

(define-global nan (target js: (/ 0 0) lua: (/ 0 0) py: (float "nan")))
(define-global inf (target js: (/ 1 0) lua: (/ 1 0) py: (float "inf")))
(define-global -inf (- inf))

(define-global nan? (n)
  (not (= n n)))

(define-global inf? (n)
  (or (= n inf) (= n -inf)))

(define-global clip (s from upto)
  (target js: ((idx s substring) from upto)
          lua: ((idx string sub) s (+ from 1) upto)
          py: (let (n (# s)
                    from (if (or (nil? from) (< from 0)) 0 from)
                    upto (if (or (nil? upto) (> upto n)) n upto))
                (get s (: from upto)))))

(define-global dupe (x)
  (target lua: () py: (obj) js: (if (array? x) () (obj))))

(define-global cut (x from upto)
  (with l (dupe x)
    (let (j 0
          i (if (or (nil? from) (< from 0)) 0 from)
          n (# x)
          upto (if (or (nil? upto) (> upto n)) n upto))
      (while (< i upto)
        (set (at l j) (at x i))
        (inc i)
        (inc j))
      (each (k v) x
        (unless (number? k)
          (set (get l k) v))))))

(define-global props (x)
  (with t (obj)
    (each (k v) x
      (unless (number? k)
        (set (get t k) v)))))

(define-global values (x)
  (if (array? x) x
    (let t (obj)
      (each (k v) x
        (when (number? k)
          (set (get t k) v)))
      (array t))))

(define-global edge (x)
  (- (# x) 1))

(define-global inner (x)
  (clip x 1 (edge x)))

(define-global tl (l) (cut l 1))

(define-global char (s n)
  (target js: ((idx s charAt) n)
          lua: (clip s n (+ n 1))
          py: (let n (or n 0)
                (if (and (>= n 0) (< n (len s)))
                  (get s n)))))

(define-global code (s n)
  (target
    js: ((idx s charCodeAt) n)
    lua: ((idx string byte) s (if n (+ n 1)))
    py: (let x (char s n)
          (if x (ord x)))))

(define-global string-literal? (x)
  (and (string? x) (= (char x 0) "\"")))

(define-global id-literal? (x)
  (and (string? x) (= (char x 0) "|")))

(define-global add (l x)
  (target lua: ((idx table insert) l x)
    (do (if (array? l)
            ((idx l (target js: push py: append)) x)
          (set (at l (# l)) x))
        nil)))

(define-global drop (l)
  (target lua: ((idx table remove) l)
    (if (array? l)
        (when (some? l)
          ((idx l pop)))
      (let n (edge l)
        (when (>= n 0)
          (with r (at l n)
            (wipe (at l n))))))))

(define-global last (l)
  (target
    py: (has l (edge l))
    (at l (edge l))))

(define-global almost (l)
  (cut l 0 (edge l)))

(define-global reverse (l)
  (with l1 (props l)
    (let i (edge l)
      (while (>= i 0)
        (add l1 (at l i))
        (dec i)))))

(define-global reduce (f x else)
  (if (none? x) else
      (one? x) (hd x)
    (f (hd x) (reduce f (tl x)))))

(define-global join ls
  (with r (target py: (obj) ())
    (step l ls
      (when l
        (let n (# r)
          (each (k v) l
            (if (number? k) (inc k n) (set l (object l)))
            (set (get r k) v)))))))

(define-global find (f t)
  (each x t
    (let y (f x)
      (if y (return y)))))

(define-global first (f l)
  (step x l
    (let y (f x)
      (if y (return y)))))

(define-global in? (x t)
  (find (fn (y) (= x y)) t))

(define-global pair (l)
  (with l1 (dupe l)
    (let n (# l)
      (for i n
        (let (a (at l i)
              b (target py: (if (< (+ i 1) n) (at l (+ i 1)))
                  (at l (+ i 1))))
          (add l1 (list a b)))
        (inc i)))))

(target py: (import functools))

(define sortfunc (f)
  (when f
    (let f (fn (a b) (if (f a b) -1 1))
      (target
        py: ((idx functools cmp_to_key) f)
        f))))

(define-global sort (l f)
  (target
    lua: ((idx table sort) l f)
    js: ((idx l sort) (sortfunc f))
    py: ((idx l sort) key: (sortfunc f)))
  l)

(define-global map (f x)
  (with t (dupe x)
    (step v x
      (let y (f v)
        (if (is? y)
          (add t y))))
    (each (k v) x
      (unless (number? k)
        (let y (f v)
          (when (is? y)
            (set (get t k) y)))))))

(define-global mapcat (f x sep)
  (with r ""
    (let c ""
      (step v x
        (let y (if f (f v) v)
          (when (is? y)
            (cat! r c y)
            (set c (or sep ""))))))))

(define-global keep (f x)
  (map (fn (v) (when (yes (f v)) v)) x))

(define-global props? (t)
  (each (k v) t
    (unless (number? k)
      (return true)))
  false)

(define-global empty? (t)
  (each x t
    (return false))
  true)

(define-global stash (args)
  (when (props? args)
    (let p (obj)
      (each (k v) args
        (unless (number? k)
          (set (get p k) v)))
      (set (get p '_stash) true)
      (add args p)))
  (if (array? args) args (array args)))

(define-global unstash (args params)
  (if (none? args) (or params (obj))
    (let l (last args)
      (if (and (obj? l) (has? l '_stash))
          (with args1 (object (almost args))
            (each (k v) l
              (unless (= k '_stash)
                (set (get args1 k) v)))
            (when params
              (each (k v) params
                (set (get args1 k) v))))
          params
          (with args1 (object args)
            (each (k v) params
              (set (get args1 k) v)))
        args))))

(define-global destash! (l args1)
  (if (and (obj? l) (has? l '_stash))
      (each (k v) l
        (unless (= k '_stash)
          (set (get args1 k) v)))
    l))

(define-global search (s pattern start)
  (target
    (let i ((idx s (target js: indexOf py: find)) pattern start)
      (if (>= i 0) i))
    lua: (let (start (if start (+ start 1))
               i ((idx string find) s pattern start true))
           (and i (- i 1)))))

(define-global string-ends? (str x pos)
  (let str (if (is? pos) (clip str pos) str)
    (if (> (# x) (# str))
        false
      (= x (clip str (- (# str) (# x)))))))

(define-global string-starts? (str x pos)
  (let str (if (is? pos) (clip str pos) str)
    (if (> (# x) (# str))
        false
      (= x (clip str 0 (# x))))))

(define-global split (s sep)
  (if (or (= s "") (= sep "")) ()
    (target py: ((idx s split) sep)
      (with l ()
        (let n (# sep)
          (while true
            (let i (search s sep)
              (if (nil? i) (break)
                (do (add l (clip s 0 i))
                    (set s (clip s (+ i n)))))))
          (add l s))))))

(define tostr (x)
  (if (string? x) x (nil? x) "" (str x)))

(define cat2 (a b)
  (target py: (+ (tostr a) (tostr b))
    (cat a b)))

(define-global cat xs
  (reduce (fn (a b) (cat2 a b)) xs ""))

(define-global + xs
  (reduce (fn (a b) (+ a b)) xs 0))

(define-global - xs
  (reduce (fn (b a) (- a b)) (reverse xs) 0))

(define-global * xs
  (reduce (fn (a b) (* a b)) xs 1))

(define-global / xs
  (reduce (fn (b a) (/ a b)) (reverse xs) 1))

(define-global % xs
  (reduce (fn (b a) (% a b)) (reverse xs) 1))

(define pairwise (f xs)
  (for i (edge xs)
    (let (a (at xs i)
          b (at xs (+ i 1)))
      (unless (f a b)
        (return false))))
  (return true))

(define-global < xs (pairwise (fn (a b) (< a b)) xs))
(define-global > xs (pairwise (fn (a b) (> a b)) xs))
(define-global = xs (pairwise (fn (a b) (= a b)) xs))
(define-global <= xs (pairwise (fn (a b) (<= a b)) xs))
(define-global >= xs (pairwise (fn (a b) (>= a b)) xs))

(define-global number-code? (n)
  (and (> n 47) (< n 58)))

(define-global number (s)
  (target
    js: (let n (parseFloat s)
          (unless (isNaN n) n))
    lua: (tonumber s)
    py: (if (string? s)
            (do (try (return (int s))
                  (except ValueError))
                (try (return (float s))
                  (except ValueError)))
            (number? s) s)))

(define-global numeric? (s)
  (let n (# s)
    (for i n
      (unless (number-code? (code s i))
        (return false))))
  (some? s))

(target js: (define tostring (x) ((idx x toString))))
(target py: (define tostring (x) (repr x)))

(define-global escape (s)
  (if (and (nil? (search s "\n"))
           (nil? (search s "\r"))
           (nil? (search s "\""))
           (nil? (search s "\\")))
      (target py: ((idx "" join) (list "\"" s "\""))
        (cat "\"" s "\""))
    (let s1 "\""
      (for i (# s)
        (let (c (char s i)
              c1 (if (= c "\n") "\\n"
                     (= c "\r") "\\r"
                     (= c "\"") "\\\""
                     (= c "\\") "\\\\"
                   c))
          (cat! s1 c1)))
      (cat s1 "\""))))

(define-global str (x repr stack)
  (if (nil? x) "nil"
      (nan? x) "nan"
      (= x inf) "inf"
      (= x -inf) "-inf"
      (boolean? x) (if x "true" "false")
      (simple-id? x) x
      (string? x) (escape x)
      (atom? x) (tostring x)
      (function? x) "function"
      (and stack (in? x stack)) "circular"
      (target js: false
              lua: (not (= (type x) 'table))
              py: (not (or (array? x) (obj? x))))
      (if repr (repr x) (cat "|" (tostring x) "|"))
    (let (s "(" sp ""
          xs (obj) ks ()
          l (or stack ()))
      (add l x)
      (each (k v) x
        (if (number? k)
            (set (get xs k) (str v repr l))
          (do (target lua:
                (unless (string? k)
                  (set k (str k repr l))))
              (if (function? v)
                  (add ks (list (cat "." k) ""))
                (add ks (list (cat k ": ") (str v repr l)))))))
      (sort ks (fn ((a) (b)) (< a b)))
      (drop l)
      (step v xs
        (cat! s sp v)
        (set sp " "))
      (step (k v) ks
        (cat! s sp k v)
        (set sp " "))
      (cat s ")"))))

(target lua:
  (define unpack (or unpack (idx table unpack))))

(define-global apply (f args)
  (let args (stash args)
    (target js: ((idx f apply) f args)
            lua: (f (unpack args))
            py: (f (%literal |*| args)))))

(define-global call (f rest: args)
  (apply f args))

(define-global setenv (k rest: keys)
  (when (string? k)
    (let (frame (if (has? keys 'toplevel)
                    (hd environment)
                  (last environment))
          entry (if (has? frame k) (get frame k) (obj)))
      (each (k v) keys
        (unless (= k 'toplevel)
          (set (get entry k) v)))
      (set (get frame k) entry))))

(target
  py: (define-global print (x)
        (do (|print| x) nil))
  (define-global print
    (target js: (idx console log)
            lua: print)))

(target js: (define math Math))
(target py: (import math))
(target py: (import random))
(target py: (do) (define-global abs (idx math abs)))
(define-global acos (idx math acos))
(define-global asin (idx math asin))
(define-global atan (idx math atan))
(define-global atan2 (idx math atan2))
(define-global ceil (idx math ceil))
(define-global cos (idx math cos))
(define-global floor (idx math floor))
(define-global log (idx math log))
(define-global log10 (idx math log10))
(target py: (do) (define-global max (idx math max)))
(target py: (do) (define-global min (idx math min)))
(target py: (do) (define-global pow (idx math pow)))
(define-global random (target py: (idx random random) (idx math random)))
(define-global sin (idx math sin))
(define-global sinh (idx math sinh))
(define-global sqrt (idx math sqrt))
(define-global tan (idx math tan))
(define-global tanh (idx math tanh))
(define-global trunc (idx math floor))

(define-variable target (language))
