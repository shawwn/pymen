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
