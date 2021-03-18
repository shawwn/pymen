#!/usr/bin/env bin/pymen

(define usage () "
JSON RPC.
")

(define main (argv)
  (let (args (parse-arguments
               (obj h: 'help)
               argv))
    (if (args .help)
        (print (usage))
      (do))))

(export usage main)

