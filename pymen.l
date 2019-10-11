(defvar pymen (obj))

(%read-from-file "runtime.l")
(%read-from-file "macros.l")

(def make-pymen-reader (exports module)
 (set exports (or exports (obj))
      module (or module (obj exports: exports)))
 (%read-from-file "reader.l")
 exports)

(def make-pymen-compiler (exports module)
 (set exports (or exports (obj))
      module (or module (obj exports: exports)))
 (%read-from-file "compiler.l")
 exports)

(set pymen.reader (make-pymen-reader)
     pymen.compiler (make-pymen-compiler))

