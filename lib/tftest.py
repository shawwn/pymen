from runtime import *
import tensorflow as tf
import math
if not( "sess" in globals()):
  global sess
  sess = tf.InteractiveSession()
def clone_session(session=None, graph=None, config=None, interactive=None, master=None, **kws):
  if nil63(session):
    session = tf.compat.v1.get_default_session()
  if nil63(graph):
    graph = session.graph
  if nil63(config):
    config = session._config
  if nil63(interactive):
    interactive = False
  if nil63(master):
    master = session.sess_str
  __e = None
  if interactive:
    __e = tf.compat.v1.InteractiveSession
  else:
    __e = tf.compat.v1.Session
  return __e(master, **kws, graph=graph, config=config)

def reset_session(session=None, graph=None, interactive=None, **kws):
  if nil63(session):
    session = tf.compat.v1.get_default_session()
  if nil63(graph):
    graph = tf.Graph()
  if nil63(interactive):
    interactive = True
  graph.as_default().__enter__()
  __session2 = clone_session(session, **kws, graph=graph, interactive=interactive)
  __session2.as_default().__enter__()
  if "sess" in globals():
    globals()["sess"] = __session2
  return __session2

def __with_scope__macro(name=None, *_args, **_keys):
  ____r3 = unstash(_args, _keys)
  __name1 = destash33(name, ____r3)
  ____id1 = ____r3
  __body1 = cut(____id1, 0)
  ____x4 = object(["tf.variable_scope", __name1])
  ____x4["reuse"] = "tf.AUTO_REUSE"
  return join(["with", join(____x4, props(__body1))], __body1)

setenv("with-scope", macro=__with_scope__macro)
def current_scope_name():
  return tf.get_variable_scope().name

def absolute_variable_scope(name=None, **kws):
  if nil63(name):
    name = current_scope_name()
  return tf.variable_scope(tf.VariableScope(**kws, name=name), auxiliary_name_scope=False)

def __with_auto_reuse__macro(*_args, **_keys):
  __body3 = unstash(_args, _keys)
  ____x9 = object(["absolute-variable-scope"])
  ____x9["reuse"] = "tf.AUTO_REUSE"
  return join(["with", ____x9], __body3)

setenv("with-auto-reuse", macro=__with_auto_reuse__macro)
if not( "v" in globals()):
  global v
  v = tf.Variable(42, name="foo", shape=[], dtype=tf.float32)
with tf.variable_scope("test", reuse=tf.AUTO_REUSE):
  if not( "bar" in globals()):
    global bar
    bar = tf.Variable(42, name="bar", shape=[], dtype=tf.float32)
import functools
def op_scope(f=None, name=None):
  if nil63(name):
    name = f.__name__
  @functools.wraps(f)
  def __f(*_args, **_keys):
    __args = unstash(_args, _keys)
    __e1 = None
    with tf.name_scope(name):
      __e1 = f(*_args, **_keys)
    return __e1
  return __f

def globalvar(name=None, shape=None, *, initializer=None, collections=None, trainable=None, use_resource=None, dtype=None, **kws):
  if nil63(initializer):
    initializer = tf.initializers.zeros
  if nil63(collections):
    collections = ["variables"]
  if nil63(trainable):
    trainable = True
  if nil63(use_resource):
    use_resource = True
  if nil63(dtype):
    dtype = tf.float32
  if not is63(shape):
    raise Exception("globalvar: must specify shape")
  __e2 = None
  with absolute_variable_scope(reuse=tf.AUTO_REUSE):
    __e2 = tf.get_variable(name, **kws, dtype=dtype, initializer=initializer, shape=shape, collections=collections, use_resource=use_resource, trainable=trainable)
  return __e2

def localvar(name=None, shape=None, *, collections=None, trainable=None, **kws):
  if nil63(collections):
    collections = ["local_variables"]
  if nil63(trainable):
    trainable = False
  return globalvar(name, shape, **kws, collections=collections, trainable=trainable)

def __class__macro(name=None, *_args, **_keys):
  ____r10 = unstash(_args, _keys)
  __name3 = destash33(name, ____r10)
  ____id3 = ____r10
  __body5 = cut(____id3, 0)
  return join(["%block", "class", __name3], __body5)

setenv("class", macro=__class__macro)
from contextlib import contextmanager
@op_scope
def maybe_cast(v=None, dtype=None):
  __v = tf.convert_to_tensor(v)
  if __v.dtype == dtype:
    return __v
  else:
    return tf.saturate_cast(__v, dtype)

class Module:
  def __init__(self=None, scope=None, index=None, index_prefix=None, index_bias=None):
    if nil63(index_prefix):
      index_prefix = "_"
    if nil63(index_bias):
      index_bias = 0
    self._scope = scope
    self._index = index
    self._index_prefix = index_prefix
    self._index_bias = index_bias
    return None
  def get_scope_name(self=None, name=None, index=None, postfix=None, prefix=None):
    if nil63(name):
      name = self._scope or type(self).__name__
    if nil63(index):
      index = self._index
    if is63(index) and not( index == 0):
      name = cat(name, self._index_prefix, str(index + self._index_bias))
    if is63(postfix):
      name = cat(name, postfix)
    if is63(prefix):
      name = prefix
      name = None
    return name
  @contextmanager
  def scope(self=None, name=None, index=None, postfix=None, prefix=None, *_args, **_keys):
    ____r14 = unstash(_args, _keys)
    __self = destash33(self, ____r14)
    __name4 = destash33(name, ____r14)
    __index = destash33(index, ____r14)
    __postfix = destash33(postfix, ____r14)
    __prefix = destash33(prefix, ____r14)
    ____id4 = ____r14
    __args1 = cut(____id4, 0)
    __scope_name = __self.get_scope_name(__name4, __index, __postfix, __prefix)
    __e3 = None
    ____x15 = object([__scope_name])
    ____x15["reuse"] = tf.AUTO_REUSE
    ____x16 = object([])
    ____x16["reuse"] = tf.AUTO_REUSE
    with apply(tf.variable_scope, join(____x15, __args1, ____x16)):
      yield 
      __e3 = None
    return __e3
  @op_scope
  def register_parameter(self=None, name=None, value=None):
    if nil63(value):
      return setattr(self, name, value)
    else:
      assert(callable(value))
      __val = tf.convert_to_tensor(value())
      @functools.partial(op_scope, name="register_parameter/initializer")
      def initializer(shape=None, *, dtype=None, **kws):
        return maybe_cast(value(), dtype)
      __var = globalvar(name, shape=__val.shape, dtype=__val.dtype, initializer=initializer)
      setattr(self, name, __var)
      return __var
  def __call__(self=None, *input, **kwargs):
    self.__dict__["_input"] = [input, kwargs]
    __result = self.forward(*input, **kwargs)
    self.__dict__["_output"] = [__result]
    return __result
def linear(input=None, weight=None, bias=None):
  if nil63(bias):
    bias = None
  __output = tf.matmul(input, weight)
  if is63(bias):
    return tf.nn.bias_add(__output, bias)
  else:
    return __output

class Linear(Module):
  def __init__(self=None, in_features=None, out_features=None, bias=None, scope=None, **kwargs):
    if nil63(bias):
      bias = True
    if nil63(scope):
      scope = "linear"
    super().__init__(**kwargs, scope=scope)
    with self.scope():
      self.in_features = in_features
      self.out_features = out_features
      self.weight = globalvar("w", shape=[in_features, out_features], initializer=self.weight_initializer)
      __e4 = None
      if bias:
        __e4 = globalvar("b", shape=[out_features], initializer=self.bias_initializer)
      self.bias = __e4
    return None
  def weight_initializer(self=None, shape=None, dtype=None, **kws):
    return kaiming_uniform(shape, dtype=dtype, a=math.sqrt(5))
  def bias_initializer(self=None, shape=None, dtype=None, **kws):
    ____id5 = _calculate_fan_in_and_fan_out(self.weight)
    __fan_in = has(____id5, 0)
    ___ = has(____id5, 1)
    __bound = 1 / math.sqrt(__fan_in)
    return uniform(shape, - __bound, __bound, dtype=dtype)
  def forward(self=None, input=None):
    __e5 = None
    with self.scope():
      __e5 = linear(input, self.weight, self.bias)
    return __e5
def shapelist(x=None):
  if hasattr(x, "shape"):
    x = x.shape
  if isinstance(x, tuple([tuple, list])):
    return x
  else:
    return x.as_list()

def size(tensor=None, index=None):
  if nil63(index):
    index = None
  if nil63(index):
    return shapelist(tensor)
  else:
    return shapelist(tensor)[index]

def dim(tensor=None):
  return len(shapelist(tensor))

@op_scope
def view(tensor=None, *shape):
  return tf.reshape(tensor, shape)

@op_scope
def permute(tensor=None, *pattern):
  return tf.transpose(tensor, pattern)

@op_scope
def randn(*shape, mean=None, std=None):
  if nil63(mean):
    mean = 0
  if nil63(std):
    std = 1
  return tf.random.normal(shape=shape, mean=mean, stddev=std)

def _calculate_fan_in_and_fan_out(tensor=None):
  __dimensions = dim(tensor)
  if __dimensions < 2:
    raise ValueError("Fan in and fan out can not be computed for tensor with fewer than 2 dimensions")
  __num_input_fmaps = size(tensor, 1)
  __num_output_fmaps = size(tensor, 0)
  __e6 = None
  if dim(tensor) <= 2:
    __e6 = 1
  else:
    __e6 = numel(tensor[0][0])
  __receptive_field_size = __e6
  __fan_in1 = __num_input_fmaps * __receptive_field_size
  __fan_out = __num_output_fmaps * __receptive_field_size
  return __fan_in1, __fan_out

def _calculate_correct_fan(tensor=None, mode=None):
  __mode = mode.lower()
  __valid_modes = ["fan_in", "fan_out"]
  if not( __mode in __valid_modes):
    raise ValueError("Mode {} not supported, please use one of {}".format(__mode, __valid_modes))
  ____id6 = _calculate_fan_in_and_fan_out(tensor)
  __fan_in2 = has(____id6, 0)
  __fan_out1 = has(____id6, 1)
  if __mode == "fan_in":
    return __fan_in2
  else:
    return __fan_out1

def calculate_gain(nonlinearity=None, param=None):
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
  if nil63(param):
    param = None
  __linear_fns = ["linear", "conv1d", "conv2d", "conv3d", "conv_transpose1d", "conv_transpose2d", "conv_transpose3d"]
  if nonlinearity in __linear_fns or nonlinearity == "sigmoid":
    return 1
  else:
    if nonlinearity == "tanh":
      return 5 / 3
    else:
      if nonlinearity == "relu":
        return math.sqrt(2)
      else:
        if nonlinearity == "leaky_relu":
          __e7 = None
          if nil63(param):
            __e7 = 0.01
          else:
            __e8 = None
            if isinstance(param, tuple([bool, int, float])):
              __e8 = param
            else:
              raise ValueError("negative_slope {} not a valid number".format(param))
              __e8 = None
            __e7 = __e8
          __negative_slope = __e7
          return math.sqrt(2 / (1 + __negative_slope * __negative_slope))
        else:
          raise ValueError("Unsupported nonlinearity {}".format(nonlinearity))

@op_scope
def no_grad(x=None):
  return tf.stop_gradient(x)

def kaiming_uniform(shape=None, dtype=None, a=None, mode=None, nonlinearity=None):
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
  if nil63(dtype):
    dtype = tf.float32
  if nil63(a):
    a = 0
  if nil63(mode):
    mode = "fan_in"
  if nil63(nonlinearity):
    nonlinearity = "leaky_relu"
  __fan = _calculate_correct_fan(shape, mode)
  __gain = calculate_gain(nonlinearity, a)
  __std = __gain / math.sqrt(__fan)
  __bound1 = math.sqrt(3) * __std
  return no_grad(uniform(shape, - __bound1, __bound1))

@op_scope
def uniform(shape=None, minval=None, maxval=None, dtype=None, **kws):
  if nil63(minval):
    minval = 0
  if nil63(maxval):
    maxval = 1
  if nil63(dtype):
    dtype = tf.float32
  __shape = size(shape)
  return tf.random.uniform(**kws, shape=__shape, minval=minval, maxval=maxval, dtype=dtype)

class Identity(Module):
  def forward(self=None, x=None):
    return x
class BatchNorm2d(Module):
  def __init__(self=None, *args, **kws):
    return L_print("TODO: BatchNorm2d({}, {})".format(args, kws))
  def forward(self=None, input=None):
    return input
class SpectralNorm(Module):
  def __init__(self=None, module=None, scope=None, **kwargs):
    if nil63(scope):
      scope = None
    super().__init__(**kwargs, scope=scope)
    self.module = module
    return None
  def forward(self=None, input=None):
    return self.module.forward(input)
class ConditionalBatchNorm2d(Module):
  def __init__(self=None, num_features=None, num_classes=None, eps=None, momentum=None, scope=None, bn_scope=None, gamma_scope=None, beta_scope=None, **kwargs):
    if nil63(eps):
      eps = 0.0001
    if nil63(momentum):
      momentum = 0.1
    if nil63(scope):
      scope = "HyperBN"
    if nil63(bn_scope):
      bn_scope = "CrossReplicaBN"
    if nil63(gamma_scope):
      gamma_scope = "gamma"
    if nil63(beta_scope):
      beta_scope = "beta"
    super().__init__(**kwargs, scope=scope)
    with self.scope():
      self.num_features = num_features
      self.num_classes = num_classes
      self.gamma_embed = SpectralNorm(Linear(num_classes, num_features, bias=False, scope=gamma_scope))
      self.beta_embed = SpectralNorm(Linear(num_classes, num_features, bias=False, scope=beta_scope))
      self.bn = BatchNorm2d(num_features, affine=False, eps=eps, momentum=momentum, scope=bn_scope)
    return None
  def forward(self=None, x=None, y=None):
    __e9 = None
    with self.scope():
      __scale = self.gamma_embed(y) + 1
      __offset = self.beta_embed(y)
      __out = self.bn(x)
      __out1 = __out * __scale
      __out2 = __out1 + __offset
      __e9 = __out2
    return __e9
class Generator256(Module):
  def __init__(self=None, dim_z=None, n_class=None, chn=None, debug=None, scope=None, **kwargs):
    if nil63(dim_z):
      dim_z = 140
    if nil63(n_class):
      n_class = 1000
    if nil63(chn):
      chn = 96
    if nil63(debug):
      debug = False
    if nil63(scope):
      scope = "Generator"
    super().__init__(**kwargs, scope=scope)
    self.linear = Linear(n_class, 128, bias=False)
    if debug:
      chn = 8
    with self.scope():
      self.dim_z = dim_z
      self.n_class = n_class
      self.chn = chn
      self.first_view = 16 * chn
      with self.scope("G_Z"):
        self.G_linear = SpectralNorm(Linear(20, 4 * 4 * 16 * chn, scope="G_linear"))
      self.num_split = 7
    return None
  def forward(self=None, input=None, class_id=None):
    __e10 = None
    with self.scope():
      __codes = tf.split(input, self.num_split, 1)
      __e11 = None
      with self.scope("G_Z"):
        out = self.G_linear(__codes[0])
        __e11 = out
      out = view(out, size(input, 0), 4, 4, self.first_view)
      __e10 = out
    return __e10
if not( "generator" in globals()):
  global generator
  generator = Generator256()
import numpy as np
from scipy.stats import truncnorm
def truncated_z_sample(batch_size=None, z_dim=None, truncation=None, seed=None):
  if nil63(batch_size):
    batch_size = 1
  if nil63(z_dim):
    z_dim = 140
  if nil63(truncation):
    truncation = 1
  if nil63(seed):
    seed = None
  __e12 = None
  if is63(seed):
    __e12 = np.random.RandomState(seed)
  __state = __e12
  __values = truncnorm.rvs(-2, 2, size=[batch_size, z_dim], random_state=__state)
  __output1 = truncation * __values
  return __output1.astype(np.float32)

def one_hot(batch_size=None, num_classes=None):
  if nil63(batch_size):
    batch_size = 1
  if nil63(num_classes):
    num_classes = 1000
  if isinstance(batch_size, int):
    return one_hot([batch_size], num_classes)[0]
  __a = np.array(batch_size, dtype=np.int32)
  __b = np.zeros([__a.size, num_classes])
  __b[np.arange(__a.size), __a] = 1
  return __b.astype(np.float32)

if not( "z_" in globals()):
  global z_
  z_ = truncated_z_sample()
if not( "y_" in globals()):
  global y_
  y_ = one_hot()
if not( "output_" in globals()):
  global output_
  output_ = generator(z_, y_)
