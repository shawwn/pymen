(when-compiling
  ; (from pymen.main import load)
  (load "lib.l")
  nil)

(define-global foo (a b: (o b 42))
  (+ a b 99))

;(asdf)

(export foo)
