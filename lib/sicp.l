(from PIL import Image)
(from PIL import ImageDraw)
(from PIL import ImagePath)
(from PIL import ImageColor)
(import numpy as np)

(defconst black* (ImageColor.getrgb "#000"))
(defconst white* (ImageColor.getrgb "#fff"))
(defconst red* (ImageColor.getrgb "#f00"))
(defconst green* (ImageColor.getrgb "#0f0"))
(defconst blue* (ImageColor.getrgb "#00f"))

(defconst smile* (Image
                   (.open "./smile.png")
                   (.resize (list 256 256))))

(def make-frame (origin edge1 edge2)
  (list origin edge1 edge2))

(def origin-frame (self) (at self 0))
(def edge1-frame (self) (at self 1))
(def edge2-frame (self) (at self 2))

(def make-vect (x y)
  (np.array (list x y) dtype: np.float32))

(def xcor-vect (v) (at v 0))
(def ycor-vect (v) (at v 1))

(def scale-vect (s v) (* v s))
(def add-vect (a b) (+ a b))
(def sub-vect (a b) (- a b))

(def frame-coord-map (frame)
  (fn (v)
    (add-vect
      (origin-frame frame)
      (add-vect (scale-vect (xcor-vect v)
                            (edge1-frame frame))
                (scale-vect (ycor-vect v)
                            (edge2-frame frame))))))

(defvar a-frame (make-frame (make-vect 0 0) (make-vect 1 0) (make-vect 0 1)))

(def segments->painter (segment-list |**kws|)
  (fn (frame)
    (each segment segment-list
      (draw-line
        ((frame-coord-map frame) (start-segment segment))
        ((frame-coord-map frame) (end-segment segment))
        |**kws|))))

(def painter-outline (|**kws|)
  (let (ul (make-vect 0 0)
        ur (make-vect 1 0)
        lr (make-vect 1 1)
        ll (make-vect 0 1))
    (segments->painter
      (list (make-segment ul ur)
            (make-segment ur lr)
            (make-segment lr ll)
            (make-segment ll ul))
      |**kws|)))

(def make-segment (start end)
  (list start end))

(def start-segment (segment) (at segment 0))
(def end-segment (segment) (at segment 1))

(defvar draw* nil)

(def make-idraw (image)
  (list image (ImageDraw.Draw image)))

(def image-idraw (idraw) (at idraw 0))
(def draw-idraw (idraw) (at idraw 1))

(def image-width (image) image.width)
(def image-height (image) image.height)

(mac with-draw (image rest: body)
  (let-unique (prev result)
    `(do (global draw*)
         (let ,prev draw*
           (set draw* (make-idraw ,image))
           (let ,result (do ,@body)
             (set draw* ,prev))))))

(def draw-line (start end |*| (o width 1) (o fill black*) |**kws|)
  (let (i (image-idraw draw*)
        d (draw-idraw draw*)
        w (- (image-width i) 1)
        h (- (image-height i) 1))
    (d.line
      (list (* w (xcor-vect start))
            (* h (ycor-vect start))
            (* w (xcor-vect end))
            (* h (ycor-vect end)))
      width: width
      fill: fill
      |**kws|)))

(def transform-painter (painter origin corner1 corner2)
  (fn (frame)
    (let (m (frame-coord-map frame)
          new-origin (m origin))
      (painter
        (make-frame new-origin
                    (sub-vect (m corner1) new-origin)
                    (sub-vect (m corner2) new-origin))))))

(def flip-vert (painter)
  (transform-painter painter
                     (make-vect 0 1)
                     (make-vect 1 1)
                     (make-vect 0 0)))

(def shrink-to-upper-right (painter)
  (transform-painter painter
                     (make-vect 0.5 0.5)
                     (make-vect 1.0 0.5)
                     (make-vect 0.5 1.0))) 
(def rotate90 (painter)
  (transform-painter painter
                     (make-vect 1.0 0.0)
                     (make-vect 1.0 1.0)
                     (make-vect 0.0 0.0)))

(def squash-inwards (painter)
  (transform-painter painter
                     (make-vect 0.0 0.0)
                     (make-vect 0.65 0.35)
                     (make-vect 0.35 0.65)))

(def beside (painter1 painter2)
  (let split-point (make-vect 0.5 0.0)
    (let (paint-left
           (transform-painter painter1
                              (make-vect 0.0 0.0)
                              split-point
                              (make-vect 0.0 1.0))
          paint-right
           (transform-painter painter2
                              split-point
                              (make-vect 1.0 0.0)
                              (make-vect 0.5 1.0)))
      (fn (frame)
        (paint-left frame)
        (paint-right frame)))))

; (with-draw smile* ((flip-vert (shrink-to-upper-right (beside (painter-outline) (painter-outline fill: red*)))) a-frame))
; (smile*.save "test.png")


; ============================

(during-compilation

(def null? (x)
  (or (no x)
      (and (list? x)
           (none? x))))

(def pair? (x)
  (list? x))

(def new-list ((o l '()))
  (with r (obj)
    (step x l
      (add r x))
    (each (k v) l
      (unless (number? k)
        (set (get r k) v)))))
  
(def cons (a b)
  (if (null? b)
      (new-list `(,a))
      (pair? b)
      (new-list `(,a ,@b))
    `(,a rest: ,b)))

(def car (a)
  (if (null? a) a (hd a)))

(def cdr (a)
  (if (null? a) a
    (let x (tl a)
      (if (none? x)
          (has x 'rest)
        x))))

(def cadr (x) (car (cdr x)))
(def cddr (x) (cdr (cdr x)))

(def eq? (a b)
  (= a b))

(def equal? (a b)
  (= (repr a) (repr b)))

(def assoc (x values (o test equal?))
  (let-when pos (first (fn (entry)
                         (test (car entry) x))
                       values)
    (at values pos)))

(def nth (n lst)
  (when (< n (len lst))
    (at lst n)))
)

; 5.2.1 the machine model

(def make-machine (register-names ops controller-text)
  (let machine (make-new-machine)
    (each register-name register-names
      ((machine 'allocate-register) register-name))
    ((machine 'install-operations) ops)
    ((machine 'install-instruction-sequence)
     (assemble controller-text machine))
    machine))

(def set-name (f name)
  (set f.__name__
       (set f.__qualname__
            name))
  f)

; registers

(def make-register (name)
  (let contents '*unassigned*
    (def dispatch (message)
      (if (= message 'get) contents
          (= message 'set)
          (fn (value)
            (nonlocal contents)
            (set contents value))
        (error (cat "register: unknown request " (str message)))))
    (set-name dispatch (cat "register_" name))))

(def get-contents (register)
  (register 'get))

(def set-contents! (register value)
  ((register 'set) value))

; the stack

(def make-stack ()
  (let s (new-list)
    (def push (x)
      (nonlocal s)
      (set s (cons x s)))
    (def pop ()
      (nonlocal s)
      (if (null? s)
          (error "Empty stack -- POP")
          (let top (car s)
            (set s (cdr s))
            top)))
    (def initialize ()
      (nonlocal s)
      (set s (new-list))
      'done)
    (def dispatch (message)
      (if (= message 'push) push
          (= message 'pop) (pop)
          (= message 'get) s
          (= message 'initialize) (initialize)
        (error (cat "Unknown request -- STACK: " (str message)))))
    (set-name dispatch "stack")))

(def pop (stack)
  (stack 'pop))

(def push (stack value)
  ((stack 'push) value))

; the basic machine

(def make-new-machine ()
  (let (pc (make-register 'pc)
        flag (make-register 'flag)
        stack (make-stack)
        the-instruction-sequence (new-list))
    (let (the-ops (list (list 'initialize-stack
                              (fn () (stack 'initialize))))
          register-table (list (list 'pc pc) (list 'flag flag)))
      (def allocate-register (name)
        (nonlocal register-table)
        (if (not (null? (assoc name register-table)))
            (error (cat "Multiply defined register: " (str name)))
          (set register-table (cons (list name (make-register name))
                                    register-table))))
      (def lookup-register (name)
        (let val (assoc name register-table)
          (if (null? val)
              (error (cat "Unknown register: " (str name)))
            (car (cdr val)))))
      (def execute ()
        (let insts (get-contents pc)
          (if (null? insts)
              'done
              (do
                ((instruction-execution-proc (car insts)))
                (execute)))))
      (def dispatch (message)
        (if (= message 'start)
            (do (set-contents! pc the-instruction-sequence)
                (execute))
            (= message 'install-instruction-sequence)
            (fn (seq)
              (print (cat "Installing instruction sequence: " (str seq)))
              (nonlocal the-instruction-sequence)
              (set the-instruction-sequence seq))
            (= message 'allocate-register) allocate-register
            (= message 'get-register) lookup-register
            (= message 'install-operations)
            (fn (ops)
              (nonlocal the-ops)
              (set the-ops (join the-ops ops)))
            (= message 'stack) stack
            (= message 'operations) the-ops
          (error (cat "Unknown request -- MACHINE: " (str message)))))
      (set-name dispatch "machine"))))

(def start (machine)
  (machine 'start))

(def get-register-contents (machine register-name)
  (get-contents (get-register machine register-name)))

(def set-register-contents! (machine register-name value)
  (set-contents! (get-register machine register-name) value)
  'done)

(def get-register (machine reg-name)
  ((machine 'get-register) reg-name))

; 5.2.2 the assembler

(def assemble (controller-text machine)
  (extract-labels controller-text
                  (fn (insts labels)
                    (print (str `(assemble 'insts ,insts 'labels ,labels)))
                    (update-insts! insts labels machine)
                    insts)))

(def sym? (x)
  (and (string? x)
       (not (string-literal? x))))

(def extract-labels (text receive)
  (print (str `(extract-labels ,text ,receive)))
  (if (null? text)
      (receive (new-list) (new-list))
      (extract-labels (cdr text)
                      (fn (insts labels)
                        (print (str `(extract-labels insts ,insts labels ,labels)))
                        (let next-inst (car text)
                          (if (sym? next-inst)
                              (receive insts
                                       (cons (make-label-entry next-inst insts)
                                             labels))
                            (receive (cons (make-instruction next-inst)
                                           insts)
                                     labels)))))))

(def update-insts! (insts labels machine)
  (let (pc (get-register machine 'pc)
        flag (get-register machine 'flag)
        stack (machine 'stack)
        ops (machine 'operations))
    (each inst insts
      (set-instruction-execution-proc!
        inst
        (make-execution-procedure
          (instruction-text inst) labels machine
          pc flag stack ops)))
    insts))

(def make-instruction (text)
  (cons text (new-list)))

(def instruction-text (inst)
  (car inst))

(def instruction-execution-proc (inst)
  (cdr inst))

(def set-instruction-execution-proc! (inst proc)
  (set-cdr! inst proc))

(def set-cdr! (cell x)
  (|assert| (and (list? cell) (some? cell)))
  (while (> (# cell) 1)
    (drop cell))
  (when (has cell 'rest)
    (wipe (get cell 'rest)))
  (if (list? x)
      (do (step v x
            (add cell v))
          (when (has x 'rest)
            (set (get cell 'rest) (get x 'rest))))
    (set (get cell 'rest) x))
  cell)

(def make-label-entry (label-name insts)
  (cons label-name insts))

(def lookup-label (labels label-name)
  (let val (assoc label-name labels)
    (if (null? val)
        (error (cat "Undefinend label -- ASSEMBLE: " (str label-name)))
      (cdr val))))


; 5.2.3 Generating Execution Procedures for Instructions

(def make-execution-procedure (inst labels machine pc flag stack ops)
  (if (eq? (car inst) 'assign)
      (make-assign inst machine labels ops pc)
      (eq? (car inst) 'test)
      (make-test inst machine labels ops flag pc)
      (eq? (car inst) 'branch)
      (make-branch inst machine labels flag pc)
      (eq? (car inst) 'goto)
      (make-goto inst machine labels pc)
      (eq? (car inst) 'save)
      (make-save inst machine stack pc)
      (eq? (car inst) 'restore)
      (make-restore inst machine stack pc)
      (eq? (car inst) 'perform)
      (make-perform inst machine labels ops pc)
    (error (cat "Unknown instruction type -- ASSEMBLE: " (str inst)))))

; assign instructions

(def make-assign (inst machine labels operations pc)
  (let (target (get-register machine (assign-reg-name inst))
        value-exp (assign-value-exp inst)
        value-proc (if (operation-exp? value-exp)
                       (make-operation-exp
                         value-exp machine labels operations)
                      (make-primitive-exp
                        (car value-exp) machine labels)))
    (fn ()
      (set-contents! target (value-proc))
      (advance-pc pc))))

(def assign-reg-name (assign-instruction)
  (cadr assign-instruction))

(def assign-value-exp (assign-instruction)
  (cddr assign-instruction))

(def advance-pc (pc)
  (set-contents! pc (cdr (get-contents pc))))

; test, branch, and goto instructions

(def make-test (inst machine labels operations flag pc)
  (let condition (test-condition inst)
    (if (operation-exp? condition)
        (let condition-proc (make-operation-exp condition machine labels operations)
          (fn ()
            (set-contents! flag (condition-proc))
            (advance-pc pc)))
      (error (cat "Bad TEST instruction -- ASSEMBLE: " (str inst))))))

(def test-condition (test-instruction)
  (cdr test-instruction))

(def make-branch (inst machine labels flag pc)
  (let dest (branch-dest inst)
    (if (label-exp? dest)
        (let insts (lookup-label labels (label-exp-label dest))
          (fn ()
            (if (null? (get-contents flag))
                (advance-pc pc)
                (set-contents! pc insts))))
      (error (cat "Bad BRANCH instruction -- ASSEMBLE: " (str inst))))))

(def branch-dest (branch-instruction)
  (cadr branch-instruction))

(def make-goto (inst machine labels pc)
  (let dest (goto-dest inst)
    (if (label-exp? dest)
        (let insts (lookup-label labels (label-exp-label dest))
          (fn () (set-contents! pc insts)))
        (register-exp? dest)
        (let reg (get-register machine (register-exp-reg dest))
          (fn ()
            (set-contents! pc (get-contents reg))))
      (error (cat "Bad GOTO instruction -- ASSEMBLE: " (str inst))))))

(def goto-dest (goto-instruction)
  (cadr goto-instruction))

; other instructions

(def make-save (inst machine stack pc)
  (let reg (get-register machine (stack-inst-reg-name inst))
    (fn ()
      (push stack (get-contents reg))
      (advance-pc pc))))

(def make-restore (inst machine stack pc)
  (let reg (get-register machine (stack-inst-reg-name inst))
    (fn ()
      (set-contents! reg (pop stack))
      (advance-pc pc))))

(def stack-inst-reg-name (stack-instruction)
  (cadr stack-instruction))


(def make-perform (inst machine labels operations pc)
  (let action (perform-action inst)
    (if (operation-exp? action)
        (let action-proc (make-operation-exp action machine labels operations)
          (fn ()
            (action-proc)
            (advance-pc pc)))
      (error (cat "Bad PERFORM instruction -- ASSEMBLE: " (st rinst))))))

(def perform-action (inst) (cdr inst))

; execution procedures for subexpressions

(def make-primitive-exp (exp machine labels)
  (if (constant-exp? exp)
      (let c (constant-exp-value exp)
        (fn () c))
      (label-exp? exp)
      (let insts (lookup-label labels (label-explabel exp))
        (fn () insts))
      (register-exp? exp)
      (let r (get-register machine (register-exp-reg exp))
        (fn () (get-contents r)))
    (error (cat "Unknown expression type -- ASSEMBLE: " (str exp)))))

(def tagged-list? (lst tag) (eq? (car lst) tag))
(def register-exp? (exp) (tagged-list? exp 'reg))
(def register-exp-reg (exp) (cadr exp))
(def constant-exp? (exp) (tagged-list? exp 'const))
(def constant-exp-value (exp) (cadr exp))
(def label-exp? (exp) (tagged-list? exp 'label))
(def label-exp-label (exp) (cadr exp))

(def make-operation-exp (exp machine labels operations)
  (let (op (lookup-prim (operation-exp-op exp) operations)
        aprocs (map (fn (e)
                      (make-primitive-exp e machine labels))
                    (operation-exp-operands exp)))
    (set-name (fn ()
                (apply op (map (fn (p) (p)) aprocs)))
              "operation_exp")))

(def operation-exp? (exp)
  (and (pair? exp) (tagged-list? (car exp) 'op)))

(def operation-exp-op (operation-exp)
  (cadr (car operation-exp)))

(def operation-exp-operands (operation-exp)
  (cdr operation-exp))

(def lookup-prim (symbol operations)
  (let val (assoc symbol operations)
    (if (null? val)
        (error (cat "Unknown operation -- ASSEMBLE: " (str symbol)))
      (cadr val))))

(def test-machine ()
  (make-machine
    '(a)
    '()
    '(start
       (goto (label here))
      here
       (assign a (const 3))
       (goto (label there))
      there)))

(def make-gcd-machine ()
  (make-machine
    '(a b t)
    (list (list 'rem %) (list '= =))
    '(test-b
       (test (op =) (reg b) (const 0))
       (branch (label gcd-done))
       (assign t (op rem) (reg a) (reg b))
       (assign a (reg b))
       (assign b (reg t))
       (goto (label test-b))
      gcd-done)))

(defconst gcd-machine (make-gcd-machine))

(def test-gcd-machine ((o a 206) (o b 40))
  (set-register-contents! gcd-machine 'a a)
  (set-register-contents! gcd-machine 'b b)
  (start gcd-machine)
  (get-register-contents gcd-machine 'a))


(def make-my-machine ()
  (make-machine
    '(a b)
    (list (list '+ +) (list '- -) (list '* *) (list '/ /)
          (list '= =) (list '> >) (list '< <) (list '>= >=) (list '<= <=)
          (list 'print print))
    '(start
       (save a)
       (perform (op print) (const 42))
       (assign a (op +) (const 1) (const 2))
       (restore a)
      done)))

(defconst my-machine (make-my-machine))

(def test-my-machine ()
  (start my-machine))
