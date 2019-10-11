(defvar pymen (obj))

(%read-from-file "runtime.l")
(%read-from-file "macros.l")

(set (idx pymen reader)
     (with exports (obj)
       (let module (obj exports: exports)
         (%read-from-file "reader.l"))))

(set (idx pymen compiler)
     (with exports (obj)
       (let module (obj exports: exports)
         (%read-from-file "compiler.l"))))

(export pymen)
