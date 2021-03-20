;(from runtime import *)

(define-macro defmacro (name args rest: body)
  (let (id (unique (cat name "--macro"))
        form `(do (define ,id ,args ,@body)
                  (setenv ',name macro: ,id)))
    form))


(during-compilation

(def identity (|*args|) (if (one? args) (hd args) args))

(defconst *cont* identity)

(defmacro =lambda (parms rest: body)
  `(fn (*cont* ,@parms) ,@body))

(defmacro =defun (name parms rest: body)
  (let f (cat "=" name)
    `(during-compilation
       (defmacro ,name ,parms
         (list ',f '*cont* ,@parms)
         ;`(,',f *cont* ,,@parms) ; TODO: Why doesn't this work? Check
         ;for quasisplice errors! It only sends the first parameter.
         ; e.g. (=defun two-foos (a b) ...) (two-foos 1 2) expands to
         ; (=two-foos *cont* 1) when should expand to (=two-foos *cont* 1 2)
         ;
         ;I looked into this. Arc has the same "bug", so I'm inclined
         ;to call it a feature. Common Lisp transforms (quasiquote (x (unquote a b)))
         )
       (define-global ,f (*cont* ,@parms)
         ,@body))))

(defmacro =bind (parms expr rest: body)
  `(let *cont* (fn ,parms ,@body)
     ,expr))

(defmacro =values retvals
  `(*cont* ,@retvals))

(defmacro =funcall (fn rest: args)
  `(,fn *cont* ,@args))

(defmacro =apply (fn rest: args)
  `(apply ,fn *cont* ,@args))
)

(=defun message () (=values 'hello 'there))

(=defun baz ()
  (=bind (m n) (message)
    (=values (list m n))))

(=defun add1 (x)
  (=values (+ x 1)))

(mac push (x place)
  (let-place (getter setter) place
    (setter `(join (list ,x) ,getter))))

(mac pull (x place (o test))
  (let-place (getter setter) place
    (setter `(delete ,x ,getter ,test))))

(def find (x lst (o test equal?))
  (each y lst
    (when (test x y)
      (return y))))

(def delete (item sequence (o test equal?))
  (keep (fn (x) (not (test x item)))
        sequence))

(def eq? (a b)
  (= a b))

(def equal? (a b)
  (= (str a) (str b)))

(from argparse import Namespace)

(when (undefined? Proc)
  (%block class (Proc Namespace)))

(def make-proc ((o pri 0) state wait)
  (with p (Proc)
    (set p.pri pri
         p.state state
         p.wait wait)))

(def proc-pri (p) p.pri)
(def proc-state (p) p.state)
(def proc-wait (p) p.wait)

(define-setter proc-pri (v p)
  `(set (idx ,p pri) ,v))

(define-setter proc-state (v p)
  `(set (idx ,p state) ,v))

(define-setter proc-wait (v p)
  `(set (idx ,p wait) ,v))

(defconst *procs* '())
(defconst *proc* nil)

(import time)
(import pymen.reader)
(import pymen.system)

(def write (x)
  (pymen.system.write x)
  nil)

(def read ()
  (pymen.reader.read-string (input)))

(def princ (x)
  (print (str x)))

(defconst *default-proc*
          (make-proc state: (fn (x)
                              (|print| "default proc" x)
                              (write ">> ")
                              (princ (eval (read)))
                              (pick-process))))

(mac do1 (expr rest: args)
  (let-unique (x)
    `(with ,x ,expr
       ,@args)))

(mac fork (expr pri)
  `(do1 ',expr
        (push (make-proc
                state: (fn (,(unique 'id))
                         ,expr
                         (pick-process))
                pri: ,pri)
              *procs*)))

(when (undefined? Halt)
  (%block class (Halt Exception)))

(defconst *halt* Halt)

(def throw (to value)
  (let e (to)
    (set e.value value)
    (raise e)))

(mac throw args
  `(%call throw ,@args))

(defmacro catch (x rest: body)
  `(try (do ,@body)
     (except ,x as e
       e.value)))

(mac loop body
  `(while (is? (do ,@body))))

(mac program (name args rest: body)
  `(=defun ,name ,args
     (global *procs*)
     (set *procs* nil)
     ,@body
     (catch *halt* (loop (print 'looping) (time.sleep 0.5) (pick-process)))
     ))

(def pick-process ()
  (let ((p val) (most-urgent-process))
    (global *proc*, *procs*)
    (set *proc* p
         *procs* (delete p *procs*))
    ((proc-state p) val)))

(def most-urgent-process ()
  (let (proc1 *default-proc*
        max -1
        val1 true)
    (each p *procs*
      (let pri (proc-pri p)
        (when (> pri max)
          (let-when val (or (nil? (proc-wait p))
                            ((proc-wait p)))
            (set proc1 p
                 max pri
                 val1 val)))))
    proc1, val1))

(def arbitrator (test cont)
  (global *procs*)
  (set (proc-state *proc*) cont
       (proc-wait *proc*) test)
  (push *proc* *procs*)
  (pick-process))

(mac wait (parm test rest: body)
  `(arbitrator (fn () ,test)
               (fn (,parm) ,@body)))

(mac yielding body
  `(arbitrator nil (fn (,(unique 'id)) ,@body)))

(def setpri (n) (set (proc-pri *proc*) n))

(def halt ((o val)) (throw *halt* val))

(def kill ((o obj) rest: args)
  (global *procs*)
  (if (is? obj)
      (set *procs* (apply delete obj *procs* args))
      (pick-process)))


(defvar *open-doors* nil)

(=defun pedestrian ()
  (wait d (hd *open-doors*)
    (print ("Entering {}" (.format d)))))

(program ped ()
  (fork (pedestrian) 1))

(=defun foo (x)
  (print ("Foo was called with {}" (.format x)))
  (=values (if (is? x) (+ x 1))))

(program two-foos (a b)
  (fork (foo a) 99)
  (fork (foo b) 99))


(defconst bboard* ())

(def claim f (global bboard*) (push f bboard*))

(def unclaim f (global bboard*) (pull f bboard* test: equal?))

(def check f (find f bboard* test: equal?))

(=defun visitor (door)
  (write ("Approach {}. " (.format door)))
  (claim 'knock door)
  (wait d (check 'open door)
    (write ("Enter {}. " (.format door)))
    (unclaim 'knock door)
    (claim 'inside door)))

(=defun host (door)
  (wait k (check 'knock door)
    (write ("Open {}. " (.format door)))
    (claim 'open door)
    (wait g (check 'inside door)
      (print ("Close {}." (.format door)))
      (unclaim 'open door))))

(program ballet ()
  (fork (visitor 'door1) 1)
  (fork (host 'door1) 1)
  (fork (visitor 'door2) 1)
  (fork (host 'door2) 1))


(=defun capture (city)
  (take city)
  (setpri 1)
  (yielding
    (fortify city)))

(=defun plunder (city)
  (loot city)
  (ransom city))

(def take (c) (print ("Liberating {}." (.format c))))
(def fortify (c) (print ("Rebuilding {}." (.format c))))
(def loot (c) (print ("Nationalizing {}." (.format c))))
(def ransom (c) (print ("Refinancing {}." (.format c))))

(program barbarians ()
  (fork (capture 'rome) 100)
  (fork (plunder 'rome) 98))