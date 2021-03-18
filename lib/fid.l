(import tensorflow as tf)

(def main (argv)
  (set argv (or argv (get-argv)))
  (let args (parse-arguments (obj h: 'help))
    args))

