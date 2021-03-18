#!/usr/bin/env bin/lumen

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

