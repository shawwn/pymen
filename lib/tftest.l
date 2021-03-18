(from runtime import *)
(import tensorflow as tf)
(import math)

(defvar sess (tf.InteractiveSession))

(def clone-session ((o session (tf.compat.v1.get-default-session))
                    (o graph session.graph)
                    (o config session._config)
                    (o interactive false)
                    (o master session.sess_str)
                    |**kws|)
  ((if interactive tf.compat.v1.InteractiveSession tf.compat.v1.Session)
   master
   graph: graph
   config: config
   |**kws|))


(def reset-session ((o session (tf.compat.v1.get-default-session))
                    (o graph (tf.Graph))
                    (o interactive true)
                    |**kws|)
  (graph (.as-default) (.__enter__))
  (with session2 (clone-session session graph: graph interactive: interactive |**kws|)
    (session2 (.as-default) (.__enter__))
    (if (in 'sess (globals))
        (set (get (globals) 'sess) session2))))

(mac with-scope (name rest: body)
  `(with (tf.variable_scope ,name reuse: tf.AUTO_REUSE ,@(props body))
     ,@body))

(def current-scope-name ()
  (tf (.get-variable-scope) .name))

(def absolute-variable-scope ((o name (current-scope-name)) |**kws|)
  (tf.variable-scope (tf.VariableScope name: name |**kws|)
                     auxiliary_name_scope: false))

(mac with-auto-reuse body
  `(with (absolute-variable-scope reuse: tf.AUTO_REUSE)
     ,@body))

(defvar v (tf.Variable 42.0 name: "foo" shape: () dtype: tf.float32))

(with-scope "test"
  (defvar bar (tf.Variable 42.0 name: "bar" shape: () dtype: tf.float32)))

(import functools)

(def op-scope (f (o name f.__name__))
  (@ (functools.wraps f))
  (fn args
    (with (tf.name_scope name)
      (f |*_args| |**_keys|))))

; example:
; (@ op-scope)
; (def add1 (x)
;   (+ x 1))

(def globalvar (name shape |*|
                     (o initializer tf.initializers.zeros)
                     (o collections '(variables))
                     (o trainable true)
                     (o use-resource true)
                     (o dtype tf.float32)
                     |**kws|)
  (unless (is? shape) (error "globalvar: must specify shape"))
  (with-auto-reuse
    (tf.get-variable name
                     dtype: dtype
                     initializer: initializer
                     shape: shape
                     collections: collections
                     use-resource: use-resource
                     trainable: trainable
                     |**kws|)))

(def localvar (name shape |*|
                    (o collections '(local_variables))
                    (o trainable false)
                    |**kws|)
  (globalvar name shape collections: collections trainable: trainable |**kws|))

(mac class (name rest: body)
  `(%block class ,name
      ,@body))

(from contextlib import contextmanager)

(@ op-scope)
(def maybe-cast (v dtype)
  (let v (tf.convert-to-tensor v)
    (if (= v.dtype dtype) v (tf.saturate-cast v dtype))))

(class Module
  (def __init__ (self scope index (o index-prefix "_") (o index-bias 0))
    (set self._scope scope
         self._index index
         self._index-prefix index-prefix
         self._index-bias index-bias)
    nil)

  (def get-scope-name (self (o name (or self._scope ((type self) .__name__)))
                            (o index self._index)
                            postfix prefix)
    (if (and (is? index)
             (not (= index 0)))
        (cat! name self._index-prefix (|str| (+ index self._index-bias))))
    (if (is? postfix) (cat! name postfix))
    (if (is? prefix) (set name prefix name))
    name)

  (@ contextmanager)
  (def scope (self name index postfix prefix rest: args)
    (let scope-name (self.get-scope-name name index postfix prefix)
      (with (apply tf.variable-scope scope-name reuse: tf.AUTO_REUSE args)
        (yield))))

  (@ op-scope)
  (def register-parameter (self name value)
    (if (nil? value)
        (setattr self name value)
      (do (|assert| (callable value))
          (let val (tf.convert-to-tensor (value))
            (@ (functools.partial op-scope name: "register_parameter/initializer"))
            (def initializer (shape |*| dtype |**kws|)
              (maybe-cast (value) dtype))
            (with var (globalvar name
                         shape: val.shape
                         dtype: val.dtype
                         initializer: initializer)
            (setattr self name var))))))

  (def __call__ (self |*input| |**kwargs|)
    (set (get self.__dict__ '_input) (list input kwargs))
    (with result (self.forward |*input| |**kwargs|)
      (set (get self.__dict__ '_output) (list result))))
         
)


(def linear (input weight (o bias))
  (let output (tf.matmul input weight)
    (if (is? bias) (tf.nn.bias_add output bias) output)))

(class (Linear Module)
  (def __init__ (self in-features out-features (o bias true) (o scope 'linear) |**kwargs|)
    ((super) (.__init__ scope: scope |**kwargs|))
    (with (self.scope)
      (set self.in-features in-features
           self.out-features out-features
           self.weight (globalvar 'w shape: (list in-features out-features) initializer: self.weight-initializer)
           self.bias (if bias (globalvar 'b shape: (list out-features) initializer: self.bias-initializer))))
    nil)

  (def weight-initializer (self shape dtype |**kws|)
    (kaiming-uniform shape dtype: dtype a: (math.sqrt 5)))

  (def bias-initializer (self shape dtype |**kws|)
    (let ((fan-in _) (_calculate_fan_in_and_fan_out self.weight)
          bound (/ 1 (math.sqrt fan-in)))
      (uniform shape (- bound) bound dtype: dtype)))

  (def forward (self input)
    (with (self.scope)
      (linear input self.weight self.bias)))
  )


(def shapelist (x)
  (when (hasattr x 'shape)
    (set x x.shape))
  (if (isinstance x (tuple (list tuple list)))
      x
    (x (.as-list))))

(def size (tensor (o index))
  (if (nil? index)
      (shapelist tensor)
      (at (shapelist tensor) index)))

(def dim (tensor)
  (len (shapelist tensor)))

(@ op-scope)
(def view (tensor |*shape|)
  (tf.reshape tensor shape))

(@ op-scope)
(def permute (tensor |*pattern|)
  (tf.transpose tensor pattern))

(@ op-scope)
(def randn (|*shape| (o mean 0.0) (o std 1.0))
  (tf.random.normal shape: shape mean: mean stddev: std))

(def _calculate_fan_in_and_fan_out (tensor)
  (let dimensions (dim tensor)
    (when (< dimensions 2)
      (raise (ValueError "Fan in and fan out can not be computed for tensor with fewer than 2 dimensions")))

    (let (num-input-fmaps (size tensor 1)
          num-output-fmaps (size tensor 0)
          receptive-field-size (if (<= (dim tensor) 2)
                                   1
                                   (numel (at (at tensor 0) 0)))
          fan-in (* num-input-fmaps receptive-field-size)
          fan-out (* num-output-fmaps receptive-field-size))
      (return fan-in, fan-out))))


(def _calculate_correct_fan (tensor mode)
  (let (mode (mode.lower)
        valid-modes '(fan_in fan_out))
    (unless (in mode valid-modes)
      (raise (ValueError ("Mode {} not supported, please use one of {}" (.format mode valid-modes)))))
    (let ((fan-in fan-out) (_calculate_fan_in_and_fan_out tensor))
      (if (= mode 'fan_in) fan-in fan-out))))

(def calculate-gain (nonlinearity (o param))
    """Return the recommended gain value for the given nonlinearity function.
    The values are as follows:

    ================= ====================================================
    nonlinearity      gain
    ================= ====================================================
    Linear / Identity :math:`1`
    Conv{1,2,3}D      :math:`1`
    Sigmoid           :math:`1`
    Tanh              :math:`\\frac{5}{3}`
    ReLU              :math:`\\sqrt{2}`
    Leaky Relu        :math:`\\sqrt{\\frac{2}{1 + \\text{negative\\_slope}^2}}`
    ================= ====================================================

    Args:
        nonlinearity: the non-linear function (`nn.functional` name)
        param: optional parameter for the non-linear function

    Examples:
        >>> gain = nn.init.calculate_gain('leaky_relu', 0.2)  # leaky_relu with negative_slope=0.2
    """
    (let linear-fns '(linear conv1d conv2d conv3d conv_transpose1d conv_transpose2d conv_transpose3d)
      (if (or (in nonlinearity linear-fns)
              (= nonlinearity 'sigmoid))
          1
          (= nonlinearity 'tanh)
          (/ 5.0 3)
          (= nonlinearity 'relu)
          (math.sqrt 2.0)
          (= nonlinearity 'leaky_relu)
          (let negative-slope (if (nil? param)
                                  0.01
                                  (isinstance param (tuple (list bool int float)))
                                  param
                                (raise (ValueError ("negative_slope {} not a valid number" (.format param)))))
            (math.sqrt (/ 2.0 (+ 1 (* negative-slope negative-slope)))))
        (raise (ValueError ("Unsupported nonlinearity {}" (.format nonlinearity)))))))


(@ op-scope)
(def no-grad (x)
  (tf.stop_gradient x))

(def kaiming-uniform (shape (o dtype tf.float32) (o a 0) (o mode 'fan_in) (o nonlinearity 'leaky_relu))
    """Returns a `Tensor` of the specified shape with values according to the method
    described in `Delving deep into rectifiers: Surpassing human-level
    performance on ImageNet classification` - He, K. et al. (2015), using a
    uniform distribution. The resulting tensor will have values sampled from
    :math:`\\mathcal{U}(-\\text{bound}, \\text{bound})` where

    .. math::
        \\text{bound} = \\text{gain} \\times \\sqrt{\\frac{3}{\\text{fan\\_mode}}}

    Also known as He initialization.

    Args:
        tensor: an n-dimensional `torch.Tensor`
        a: the negative slope of the rectifier used after this layer (only
            used with ``'leaky_relu'``)
        mode: either ``'fan_in'`` (default) or ``'fan_out'``. Choosing ``'fan_in'``
            preserves the magnitude of the variance of the weights in the
            forward pass. Choosing ``'fan_out'`` preserves the magnitudes in the
            backwards pass.
        nonlinearity: the non-linear function (`nn.functional` name),
            recommended to use only with ``'relu'`` or ``'leaky_relu'`` (default).

    Examples:
        >>> w = nn.init.kaiming_uniform([3, 5], mode='fan_in', nonlinearity='relu')
    """
  
  (let (fan (_calculate_correct_fan shape mode)
        gain (calculate-gain nonlinearity a)
        std (/ gain (math.sqrt fan))
        bound (* (math.sqrt 3.0) std)) ; Calculate uniform bounds from standard deviation
    (no-grad (uniform shape (- bound) bound))))

(@ op-scope)
(def uniform (shape (o minval 0.0) (o maxval 1.0) (o dtype tf.float32) |**kws|)
  (let shape (size shape)
    (tf.random.uniform shape: shape minval: minval maxval: maxval dtype: dtype |**kws|)))

(class (Identity Module)
  (def forward (self x)
    x))


(class (BatchNorm2d Module)
  (def __init__ (self |*args| |**kws|)
    (print ("TODO: BatchNorm2d({}, {})" (.format args kws))))

  (def forward (self input)
    ; (raise (NotImplementedError))
    input
    ))

(class (SpectralNorm Module)
  (def __init__ (self module (o scope nil) |**kwargs|)
    ((super) (.__init__ scope: scope |**kwargs|))
    (set self.module module)
    nil)

  (def forward (self input)
    (self.module.forward input)))

(class (ConditionalBatchNorm2d Module)
  (def __init__ (self num-features num-classes (o eps 1e-4) (o momentum 0.1) (o scope 'HyperBN) (o bn-scope 'CrossReplicaBN) (o gamma-scope 'gamma) (o beta-scope 'beta) |**kwargs|)
    ((super) (.__init__ scope: scope |**kwargs|))
    (with (self.scope)
      (set self.num-features num-features
           self.num-classes num-classes
           self.gamma-embed (SpectralNorm (Linear num-classes num-features bias: false scope: gamma-scope))
           self.beta-embed (SpectralNorm (Linear num-classes num-features bias: false scope: beta-scope))
           self.bn (BatchNorm2d num-features affine: false eps: eps momentum: momentum scope: bn-scope)))
    nil)
  
  (def forward (self x y)
    (with (self.scope)
      (let (scale (+ (self.gamma-embed y) 1)
            offset (self.beta-embed y)
            out (self.bn x)
            out (* out scale)
            out (+ out offset))
        out))))
           

(class (Generator256 Module)
  (def __init__ (self (o dim-z 140) (o n-class 1000) (o chn 96) (o debug false) (o scope 'Generator) |**kwargs|)
    ((super) (.__init__ scope: scope |**kwargs|))
    (set self.linear (Linear n-class 128 bias: false))
    (if debug (set chn 8))
    (with (self.scope)
      (set self.dim-z dim-z
           self.n-class n-class
           self.chn chn
           self.first-view (* 16 chn))
      (with (self.scope 'G_Z)
        (set self.G_linear (SpectralNorm (Linear 20 (* 4 4 16 chn) scope: 'G_linear))))
      (set self.num-split 7)
      (set self.colorize (SpectralNorm (Conv2d (* 1 chn) 3 (list 3 3) padding: 1 scope: 'conv_2d)))
      )
    nil)

  (def forward (self input class-id)
    (with (self.scope)
      (let codes (tf.split input self.num-split 1)
        (with (self.scope "G_Z")
          (set out (self.G_linear (at codes 0))))
        (set out (view out (size input 0) 4 4 self.first-view))
        out)))
  )

(defvar generator (Generator256))

(import numpy as np)

(from scipy.stats import truncnorm)

(def truncated-z-sample ((o batch-size 1) (o z-dim 140) (o truncation 1.0) (o seed nil))
  (let (state (if (is? seed) (np.random.RandomState seed))
        values (truncnorm.rvs -2 2 size: (list batch-size z-dim) random-state: state)
        output (* truncation values))
    (output (.astype np.float32))))

(def one-hot ((o batch-size 1) (o num-classes 1000))
  (when (isinstance batch-size int)
    (return (at (one-hot (list batch-size) num-classes) 0)))
  (let (a (np.array batch-size dtype: np.int32)
        b (np.zeros (list a.size num-classes)))
    (set (at b (np.arange a.size), a) 1)
    (b (.astype np.float32))))

(defvar z_ (truncated-z-sample))
(defvar y_ (one-hot))

(defvar output_ (generator z_ y_))
