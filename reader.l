(target py: (from .runtime import *))

(define delimiters (set-of "(" ")" ";" "," "\r" "\n"))
(define closing-delimiters (set-of ")"))
(define whitespace (set-of " " "\t" "\r" "\n"))

(define stream (str more)
  (obj pos: 0 string: str len: (# str) more: more))

(define peek-char (s)
  (let ((pos: pos len: len string: string) s)
    (when (< pos len)
      (char string pos))))

(define read-char (s)
  (let c (peek-char s)
    (if c (do (inc (get s 'pos)) c))))

(define skip-non-code (s)
  (while true
    (let c (peek-char s)
      (if (nil? c) (break)
          (has? whitespace c) (read-char s)
          (= c ";")
          (do (while (and c (not (= c "\n")))
                (set c (read-char s)))
              (skip-non-code s))
        (break)))))

(define read-table (obj))
(define eof (obj))

(define more? (s x)
  (and (is? (get s 'more))
       (is x (get s 'more))))

(define eof? (s x)
  (or (is x eof) (more? s x)))

(define read-1 (s)
  (skip-non-code s)
  (let c (peek-char s)
    (if (is? c)
        ((or (has read-table c)
             (has read-table ""))
         s)
      eof)))

(define read (s)
  (let form (read-1 s)
    (if (= "," (peek-char s))
        (with r (list "," form)
          (while true
            (read-char s)
            (set form (read-1 s))
            (if (eof? s form) (return (expected s "tuple")))
            (add r form)
            (unless (= "," (peek-char s))
              (break))))
      form)))

(define read-all (s)
  (with r nil
    (let l ()
      (while (nil? r)
        (let form (read s)
          (if (more? s form) (set r (get s 'more))
              (eof? s form) (set r l)
            (add l form)))))))

(define-global read-string (str more)
  (let s (stream str more)
    (let x (read s)
      (unless (= x eof) x))))

(define key? (atom)
  (and (string? atom)
       (> (# atom) 1)
       (= (char atom (edge atom)) ":")))

(define expected (s c)
  (if (is? (get s 'more))
      (get s 'more)
    (error (cat "Expected " c " at " (get s 'pos)))))

(define wrap (s x)
  (let y (read s)
    (if (more? s y) y
      (list x y))))

(define hex-prefix? (str)
  (let i (if (= (code str 0) 45) 1 0)  ; "-"
    (and (= (code str i) 48)           ; "0"
         (let n (code str (inc i))
           (or (= n 120) (= n 88)))))) ; "x" or "X"

(define maybe-number (str)
  (if (hex-prefix? str)
      (target js: (parseInt str 16)
              lua: (tonumber str)
              py: (let ((ok v) (guard (|int| str 16)))
                    (if ok v)))
      (number-code? (code str (edge str)))
    (number str)))

(define real? (x)
  (and (number? x) (not (nan? x)) (not (inf? x))))

(define-reader ("" s) ; atom
  (let (str "")
    (while true
      (let c (peek-char s)
        (if (and c (and (not (has? whitespace c))
                        (not (has? delimiters c))))
            (cat! str (read-char s))
          (break))))
  (if (= str "true") true
      (= str "false") false
    (let n (maybe-number str)
      (if (real? n) n str)))))

(define-reader ("(" s)
  (read-char s)
  (with r nil
    (let l ()
      (while (nil? r)
        (skip-non-code s)
        (let c (peek-char s)
          (if (= c ")") (do (read-char s) (set r l))
              (nil? c) (set r (expected s ")"))
            (let x (read s)
              (if (eof? s x)
                  (set r (expected s ")"))
                  (key? x)
                  (let (k (clip x 0 (edge x))
                        v (read s))
                    (set l (object l) (get l k) v))
                (add l x)))))))))

(define-reader (")" s)
  (error (cat "Unexpected ) at " (get s 'pos))))

; Simplify this.

(define read-matching (opener closer s)
  (with r nil
    (let pos (get s 'pos)
      (let str ""
        (for i (# opener)
          (cat! str (or (read-char s) "")))
        (when (= str opener)
          (while (nil? r)
            (if (= (clip (get s 'string) (get s 'pos) (+ (get s 'pos) (# closer)))
                   closer)
                (do (for i (# closer)
                      (cat! str (read-char s)))
                    (set r str))
                (nil? (peek-char s)) (set r (expected s closer))
              (do (cat! str (read-char s))
                  (when (= (peek-char s) "\\")
                    (cat! str (read-char s)))))))))))

(define-reader ("\"" s)
  (if (string-starts? (get s 'string) "\"\"\"" (get s 'pos))
      (read-matching "\"\"\"" "\"\"\"" s)
    (let (i (get s 'pos)
          j (search (get s 'string) "\"" (+ i 1))
          b (either (search (get s 'string) "\\" (+ i 1)) j))
      (if (and (is? j)
               (< j (get s 'len))
               (>= b j))
          (do (set (get s 'pos) (+ j 1))
              (clip (get s 'string) i (+ j 1)))
        (with r nil
          (read-char s)
          (while (nil? r)
            (let c (peek-char s)
              (if (= c "\"") (do (read-char s) (set r (clip (get s 'string) i (get s 'pos))))
                  (nil? c) (set r (expected s "\""))
                (do (when (= c "\\")
                      (read-char s))
                    (read-char s))))))))))

(define-reader ("|" s)
  (let (i (get s 'pos)
        j (search (get s 'string) "|" (+ i 1)))
    (if (and (is? j)
             (< j (get s 'len)))
        (do (set (get s 'pos) (+ j 1))
            (clip (get s 'string) i (+ j 1)))
      (expected s "|"))))

(define-reader ("'" s)
  (read-char s)
  (wrap s 'quote))

(define-reader ("`" s)
  (read-char s)
  (wrap s 'quasiquote))

(define-reader ("," s)
  (read-char s)
  (let c (peek-char s)
    (if (or (nil? c) (has? whitespace c) (has? closing-delimiters c))
        ","
        (= c "@")
        (do (read-char s)
            (wrap s 'unquote-splicing))
      (wrap s 'unquote))))

(export stream
        read
        read-all
        read-string
        read-table)
