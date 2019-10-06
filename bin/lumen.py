lumen_globals = globals()
environment = [{}]
def nil63(x=None):
  return x is None
def is63(x=None):
  return not nil63(x)
def no(x=None):
  return nil63(x) or x is False
def yes(x=None):
  return not no(x)
def either(x=None, y=None):
  if is63(x):
    return x
  else:
    return y
def has63(l=None, k=None):
  if isinstance(l, dict):
    return (number63(k) or string63(k)) and k in l
  else:
    return number63(k) and k >= 0 and k < len(l)
def has(l=None, k=None, L_else=None):
  if has63(l, k):
    return l[k]
  else:
    return L_else
def array63(x=None):
  return isinstance(x, list) or isinstance(x, tuple)
def indices(x=None):
  if isinstance(x, dict):
    return x
  else:
    return range(len(x))
def array(x=None):
  if array63(x):
    return x
  else:
    __l = []
    ____x1 = x
    ____i = 0
    while ____i < L_35(____x1):
      __v = ____x1[____i]
      add(__l, __v)
      ____i = ____i + 1
    return __l
def object(x=None):
  if array63(x):
    __l1 = {}
    ____o = x
    __k = None
    for __k in indices(____o):
      __v1 = ____o[__k]
      __l1[__k] = __v1
    return __l1
  else:
    return x
def length(x=None):
  __n1 = -1
  ____o1 = x
  __k1 = None
  for __k1 in indices(____o1):
    __v2 = ____o1[__k1]
    if number63(__k1):
      if __k1 > __n1:
        __n1 = __k1
  __n1 = __n1 + 1
  return __n1
def L_35(x=None):
  if string63(x) or array63(x):
    return len(x)
  else:
    return length(x)
def none63(x=None):
  return L_35(x) == 0
def some63(x=None):
  return L_35(x) > 0
def one63(x=None):
  return L_35(x) == 1
def two63(x=None):
  return L_35(x) == 2
def hd(l=None):
  return has(l, 0)
import numbers
def string63(x=None):
  return isinstance(x, str)
def number63(x=None):
  return not boolean63(x) and isinstance(x, numbers.Number)
def boolean63(x=None):
  return isinstance(x, bool)
def function63(x=None):
  return callable(x)
def obj63(x=None):
  return is63(x) and isinstance(x, dict)
def atom63(x=None):
  return nil63(x) or string63(x) or number63(x) or boolean63(x)
nan = float("nan")
inf = float("inf")
L_inf = - inf
def nan63(n=None):
  return not( n == n)
def inf63(n=None):
  return n == inf or n == L_inf
def clip(s=None, L_from=None, upto=None):
  __n3 = L_35(s)
  __e = None
  if nil63(L_from) or L_from < 0:
    __e = 0
  else:
    __e = L_from
  __L_from = __e
  __e1 = None
  if nil63(upto) or upto > __n3:
    __e1 = __n3
  else:
    __e1 = upto
  __upto = __e1
  return s[__L_from:__upto]
def dupe(x=None):
  return {}
def cut(x=None, L_from=None, upto=None):
  __l2 = dupe(x)
  __j = 0
  __e2 = None
  if nil63(L_from) or L_from < 0:
    __e2 = 0
  else:
    __e2 = L_from
  __i3 = __e2
  __n4 = L_35(x)
  __e3 = None
  if nil63(upto) or upto > __n4:
    __e3 = __n4
  else:
    __e3 = upto
  __upto1 = __e3
  while __i3 < __upto1:
    __l2[__j] = x[__i3]
    __i3 = __i3 + 1
    __j = __j + 1
  ____o2 = x
  __k2 = None
  for __k2 in indices(____o2):
    __v3 = ____o2[__k2]
    if not number63(__k2):
      __l2[__k2] = __v3
  return __l2
def keys(x=None):
  __t = dupe(x)
  ____o3 = x
  __k3 = None
  for __k3 in indices(____o3):
    __v4 = ____o3[__k3]
    if not number63(__k3):
      __t[__k3] = __v4
  return __t
def edge(x=None):
  return L_35(x) - 1
def inner(x=None):
  return clip(x, 1, edge(x))
def tl(l=None):
  return cut(l, 1)
def char(s=None, n=None):
  __n7 = n or 0
  if __n7 >= 0 and __n7 < len(s):
    return s[__n7]
def code(s=None, n=None):
  __x2 = char(s, n)
  if __x2:
    return ord(__x2)
def string_literal63(x=None):
  return string63(x) and char(x, 0) == "\""
def id_literal63(x=None):
  return string63(x) and char(x, 0) == "|"
def add(l=None, x=None):
  if array63(l):
    l.append(x)
  else:
    l[L_35(l)] = x
  return None
def drop(l=None):
  if array63(l):
    if some63(l):
      return l.pop()
  else:
    __n8 = edge(l)
    if __n8 >= 0:
      __r39 = l[__n8]
      del l[__n8]
      return __r39
def last(l=None):
  return has(l, edge(l))
def almost(l=None):
  return cut(l, 0, edge(l))
def reverse(l=None):
  __l11 = keys(l)
  __i6 = edge(l)
  while __i6 >= 0:
    add(__l11, l[__i6])
    __i6 = __i6 - 1
  return __l11
def reduce(f=None, x=None):
  if none63(x):
    return None
  else:
    if one63(x):
      return hd(x)
    else:
      return f(hd(x), reduce(f, tl(x)))
def join(*_args, **_keys):
  __ls = unstash(list(_args), _keys)
  __r44 = {}
  ____x3 = __ls
  ____i7 = 0
  while ____i7 < L_35(____x3):
    __l3 = ____x3[____i7]
    if __l3:
      __n9 = L_35(__r44)
      ____o4 = __l3
      __k4 = None
      for __k4 in indices(____o4):
        __v5 = ____o4[__k4]
        if number63(__k4):
          __k4 = __k4 + __n9
        else:
          __l3 = object(__l3)
        __r44[__k4] = __v5
    ____i7 = ____i7 + 1
  return __r44
def find(f=None, t=None):
  ____o5 = t
  ____i9 = None
  for ____i9 in indices(____o5):
    __x4 = ____o5[____i9]
    __y = f(__x4)
    if __y:
      return __y
def first(f=None, l=None):
  ____x5 = l
  ____i10 = 0
  while ____i10 < L_35(____x5):
    __x6 = ____x5[____i10]
    __y1 = f(__x6)
    if __y1:
      return __y1
    ____i10 = ____i10 + 1
def in63(x=None, t=None):
  def __f2(y=None):
    return x == y
  return find(__f2, t)
def pair(l=None):
  __l12 = dupe(l)
  __n12 = L_35(l)
  __i11 = 0
  while __i11 < __n12:
    __a = l[__i11]
    __e4 = None
    if __i11 + 1 < __n12:
      __e4 = l[__i11 + 1]
    __b = __e4
    add(__l12, [__a, __b])
    __i11 = __i11 + 1
    __i11 = __i11 + 1
  return __l12
import functools
def sortfunc(f=None):
  if f:
    def __f3(a=None, b=None):
      if f(a, b):
        return -1
      else:
        return 1
    __f = __f3
    return functools.cmp_to_key(__f)
def sort(l=None, f=None):
  l.sort(key=sortfunc(f))
  return l
def map(f=None, x=None):
  __t1 = dupe(x)
  ____x8 = x
  ____i12 = 0
  while ____i12 < L_35(____x8):
    __v6 = ____x8[____i12]
    __y2 = f(__v6)
    if is63(__y2):
      add(__t1, __y2)
    ____i12 = ____i12 + 1
  ____o6 = x
  __k5 = None
  for __k5 in indices(____o6):
    __v7 = ____o6[__k5]
    if not number63(__k5):
      __y3 = f(__v7)
      if is63(__y3):
        __t1[__k5] = __y3
  return __t1
def mapcat(f=None, x=None, sep=None):
  __r55 = ""
  __c = ""
  ____x9 = x
  ____i14 = 0
  while ____i14 < L_35(____x9):
    __v8 = ____x9[____i14]
    __e5 = None
    if f:
      __e5 = f(__v8)
    else:
      __e5 = __v8
    __y4 = __e5
    if is63(__y4):
      __r55 = cat(__r55, __c, __y4)
      __c = sep or ""
    ____i14 = ____i14 + 1
  return __r55
def keep(f=None, x=None):
  def __f4(v=None):
    if yes(f(v)):
      return v
  return map(__f4, x)
def keys63(t=None):
  ____o7 = t
  __k6 = None
  for __k6 in indices(____o7):
    __v9 = ____o7[__k6]
    if not number63(__k6):
      return True
  return False
def empty63(t=None):
  ____o8 = t
  ____i16 = None
  for ____i16 in indices(____o8):
    __x10 = ____o8[____i16]
    return False
  return True
def stash(args=None):
  if keys63(args):
    __p = {}
    ____o9 = args
    __k7 = None
    for __k7 in indices(____o9):
      __v10 = ____o9[__k7]
      if not number63(__k7):
        __p[__k7] = __v10
    __p["_stash"] = True
    add(args, __p)
  if array63(args):
    return args
  else:
    return array(args)
def unstash(args=None, params=None):
  if none63(args):
    return params or {}
  else:
    __l4 = last(args)
    if obj63(__l4) and has63(__l4, "_stash"):
      __args1 = object(almost(args))
      ____o10 = __l4
      __k8 = None
      for __k8 in indices(____o10):
        __v11 = ____o10[__k8]
        if not( __k8 == "_stash"):
          __args1[__k8] = __v11
      if params:
        ____o11 = params
        __k9 = None
        for __k9 in indices(____o11):
          __v12 = ____o11[__k9]
          __args1[__k9] = __v12
      return __args1
    else:
      if params:
        __args11 = object(args)
        ____o12 = params
        __k10 = None
        for __k10 in indices(____o12):
          __v13 = ____o12[__k10]
          __args11[__k10] = __v13
        return __args11
      else:
        return args
def destash33(l=None, args1=None):
  if obj63(l) and has63(l, "_stash"):
    ____o13 = l
    __k11 = None
    for __k11 in indices(____o13):
      __v14 = ____o13[__k11]
      if not( __k11 == "_stash"):
        args1[__k11] = __v14
  else:
    return l
def search(s=None, pattern=None, start=None):
  __i22 = s.find(pattern, start)
  if __i22 >= 0:
    return __i22
def split(s=None, sep=None):
  if s == "" or sep == "":
    return []
  else:
    __l5 = []
    __n21 = L_35(sep)
    while True:
      __i23 = search(s, sep)
      if nil63(__i23):
        break
      else:
        add(__l5, clip(s, 0, __i23))
        s = clip(s, __i23 + __n21)
    add(__l5, s)
    return __l5
def tostr(x=None):
  if string63(x):
    return x
  else:
    if nil63(x):
      return ""
    else:
      return L_str(x)
def cat2(a=None, b=None):
  return tostr(a) + tostr(b)
def cat(*_args, **_keys):
  __xs = unstash(list(_args), _keys)
  def __f5(a=None, b=None):
    return cat2(a, b)
  return either(reduce(__f5, __xs), "")
def L_43(*_args, **_keys):
  __xs1 = unstash(list(_args), _keys)
  def __f6(a=None, b=None):
    return a + b
  return either(reduce(__f6, __xs1), 0)
def L_45(*_args, **_keys):
  __xs2 = unstash(list(_args), _keys)
  def __f7(b=None, a=None):
    return a - b
  return either(reduce(__f7, reverse(__xs2)), 0)
def L_42(*_args, **_keys):
  __xs3 = unstash(list(_args), _keys)
  def __f8(a=None, b=None):
    return a * b
  return either(reduce(__f8, __xs3), 1)
def L_47(*_args, **_keys):
  __xs4 = unstash(list(_args), _keys)
  def __f9(b=None, a=None):
    return a / b
  return either(reduce(__f9, reverse(__xs4)), 1)
def L_37(*_args, **_keys):
  __xs5 = unstash(list(_args), _keys)
  def __f10(b=None, a=None):
    return a % b
  return either(reduce(__f10, reverse(__xs5)), 0)
def pairwise(f=None, xs=None):
  __i24 = 0
  while __i24 < edge(xs):
    __a1 = xs[__i24]
    __b1 = xs[__i24 + 1]
    if not f(__a1, __b1):
      return False
    __i24 = __i24 + 1
  return True
def L_60(*_args, **_keys):
  __xs6 = unstash(list(_args), _keys)
  def __f11(a=None, b=None):
    return a < b
  return pairwise(__f11, __xs6)
def L_62(*_args, **_keys):
  __xs7 = unstash(list(_args), _keys)
  def __f12(a=None, b=None):
    return a > b
  return pairwise(__f12, __xs7)
def L_61(*_args, **_keys):
  __xs8 = unstash(list(_args), _keys)
  def __f13(a=None, b=None):
    return a == b
  return pairwise(__f13, __xs8)
def L_6061(*_args, **_keys):
  __xs9 = unstash(list(_args), _keys)
  def __f14(a=None, b=None):
    return a <= b
  return pairwise(__f14, __xs9)
def L_6261(*_args, **_keys):
  __xs10 = unstash(list(_args), _keys)
  def __f15(a=None, b=None):
    return a >= b
  return pairwise(__f15, __xs10)
def number_code63(n=None):
  return n > 47 and n < 58
def number(s=None):
  if char(s, 0) == "-" and number_code63(code(s, 1)) or number_code63(code(s, 0)):
    try:
      return int(s)
    except ValueError:
      try:
        return float(s)
      except ValueError:
        return None

    return None
def numeric63(s=None):
  __n22 = L_35(s)
  __i25 = 0
  while __i25 < __n22:
    if not number_code63(code(s, __i25)):
      return False
    __i25 = __i25 + 1
  return some63(s)
def tostring(x=None):
  return repr(x)
def escape(s=None):
  __s1 = "\""
  __i26 = 0
  while __i26 < L_35(s):
    __c1 = char(s, __i26)
    __e6 = None
    if __c1 == "\n":
      __e6 = "\\n"
    else:
      __e7 = None
      if __c1 == "\r":
        __e7 = "\\r"
      else:
        __e8 = None
        if __c1 == "\"":
          __e8 = "\\\""
        else:
          __e9 = None
          if __c1 == "\\":
            __e9 = "\\\\"
          else:
            __e9 = __c1
          __e8 = __e9
        __e7 = __e8
      __e6 = __e7
    __c11 = __e6
    __s1 = cat(__s1, __c11)
    __i26 = __i26 + 1
  return cat(__s1, "\"")
def L_str(x=None, repr=None, stack=None):
  if nil63(x):
    return "nil"
  else:
    if nan63(x):
      return "nan"
    else:
      if x == inf:
        return "inf"
      else:
        if x == L_inf:
          return "-inf"
        else:
          if boolean63(x):
            if x:
              return "true"
            else:
              return "false"
          else:
            if string63(x):
              return escape(x)
            else:
              if atom63(x):
                return tostring(x)
              else:
                if function63(x):
                  return "function"
                else:
                  if stack and in63(x, stack):
                    return "circular"
                  else:
                    if not( array63(x) or obj63(x)):
                      if repr:
                        return repr(x)
                      else:
                        return cat("|", tostring(x), "|")
                    else:
                      __s = "("
                      __sp = ""
                      __xs11 = {}
                      __ks = []
                      __l6 = stack or []
                      add(__l6, x)
                      ____o14 = x
                      __k12 = None
                      for __k12 in indices(____o14):
                        __v15 = ____o14[__k12]
                        if number63(__k12):
                          __xs11[__k12] = L_str(__v15, repr, __l6)
                        else:
                          add(__ks, [cat(__k12, ":"), L_str(__v15, repr, __l6)])
                      def __f16(__x12=None, __x13=None):
                        ____id = __x12
                        __a2 = has(____id, 0)
                        ____id1 = __x13
                        __b2 = has(____id1, 0)
                        return __a2 < __b2
                      sort(__ks, __f16)
                      drop(__l6)
                      ____x14 = __xs11
                      ____i28 = 0
                      while ____i28 < L_35(____x14):
                        __v16 = ____x14[____i28]
                        __s = cat(__s, __sp, __v16)
                        __sp = " "
                        ____i28 = ____i28 + 1
                      ____x15 = __ks
                      ____i29 = 0
                      while ____i29 < L_35(____x15):
                        ____id2 = ____x15[____i29]
                        __k13 = has(____id2, 0)
                        __v17 = has(____id2, 1)
                        __s = cat(__s, __sp, __k13, " ", __v17)
                        __sp = " "
                        ____i29 = ____i29 + 1
                      return cat(__s, ")")
def apply(f=None, args=None):
  __args = stash(args)
  return f(*__args)
def call(f=None, *_args, **_keys):
  ____r87 = unstash(list(_args), _keys)
  __f1 = destash33(f, ____r87)
  ____id3 = ____r87
  __args12 = cut(____id3, 0)
  return apply(__f1, __args12)
def setenv(k=None, *_args, **_keys):
  ____r88 = unstash(list(_args), _keys)
  __k14 = destash33(k, ____r88)
  ____id4 = ____r88
  __keys = cut(____id4, 0)
  if string63(__k14):
    __e10 = None
    if has63(__keys, "toplevel"):
      __e10 = hd(environment)
    else:
      __e10 = last(environment)
    __frame = __e10
    __e11 = None
    if has63(__frame, __k14):
      __e11 = __frame[__k14]
    else:
      __e11 = {}
    __entry = __e11
    ____o15 = __keys
    __k15 = None
    for __k15 in indices(____o15):
      __v18 = ____o15[__k15]
      if not( __k15 == "toplevel"):
        __entry[__k15] = __v18
    __frame[__k14] = __entry
    return __frame[__k14]
def L_print(x=None):
  print(x)
  return None
import math
import random

acos = math.acos
asin = math.asin
atan = math.atan
atan2 = math.atan2
ceil = math.ceil
cos = math.cos
floor = math.floor
log = math.log
log10 = math.log10



random = random.random
sin = math.sin
sinh = math.sinh
sqrt = math.sqrt
tan = math.tan
tanh = math.tanh
trunc = math.floor
setenv("target", toplevel=True, value=either(has(setenv("target", toplevel=True), "value"), "py"))
setenv("target", symbol=["get-value", ["quote", "target"]])
def __f2(form=None):
  return quoted(form)
setenv("quote", macro=__f2)
def __f3(form=None):
  return quasiexpand(form, 1)
setenv("quasiquote", macro=__f3)
def __f4(*_args, **_keys):
  __args1 = unstash(list(_args), _keys)
  def __f5(__x6=None):
    ____id1 = __x6
    __lh1 = has(____id1, 0)
    __rh1 = has(____id1, 1)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has":
      return ["%set", join(["get"], tl(__lh1)), __rh1]
    else:
      return ["%set", __lh1, __rh1]
  return join(["do"], map(__f5, pair(__args1)))
setenv("set", macro=__f4)
def __f6(l=None, i=None):
  if has(setenv("target", toplevel=True), "value") == "lua" and number63(i):
    i = i + 1
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      i = ["+", i, 1]
  return ["get", l, i]
setenv("at", macro=__f6)
def __f7(place=None):
  if has(setenv("target", toplevel=True), "value") == "lua":
    return ["set", place, "nil"]
  else:
    return ["%delete", place]
setenv("wipe", macro=__f7)
def __f8(*_args, **_keys):
  __body2 = unstash(list(_args), _keys)
  if L_35(__body2) > 2 and __body2[1] == "for" and __body2[3] == "in":
    ____id5 = __body2
    __expr2 = has(____id5, 0)
    __body3 = cut(____id5, 1)
    __comps1 = []
    __cond1 = None
    while L_35(__body3) > 2 and __body3[0] == "for" and __body3[2] == "in":
      ____id6 = __body3
      ___for1 = has(____id6, 0)
      __names1 = has(____id6, 1)
      ___in1 = has(____id6, 2)
      __l2 = has(____id6, 3)
      __body12 = cut(____id6, 4)
      add(__comps1, [__names1, __l2])
      __body3 = __body12
    if hd(__body3) == "if":
      ____id7 = __body3
      ___if1 = has(____id7, 0)
      __expr3 = has(____id7, 1)
      __cond1 = __expr3
    return ["%list", __expr2, __comps1, __cond1]
  else:
    __x31 = unique("x")
    __l3 = {}
    __forms1 = []
    ____o1 = __body2
    __k2 = None
    for __k2 in indices(____o1):
      __v1 = ____o1[__k2]
      if number63(__k2):
        __l3[__k2] = __v1
      else:
        add(__forms1, ["set", ["get", __x31, ["quote", __k2]], __v1])
    if some63(__forms1):
      return join(["let", __x31, ["object", join(["%array"], __l3)]], __forms1, [__x31])
    else:
      return join(["%array"], __l3)
setenv("list", macro=__f8)
def __f9(*_args, **_keys):
  __branches1 = unstash(list(_args), _keys)
  return hd(expand_if(__branches1))
setenv("if", macro=__f9)
def __f10(expr=None, *_args, **_keys):
  ____r13 = unstash(list(_args), _keys)
  __expr5 = destash33(expr, ____r13)
  ____id10 = ____r13
  __clauses1 = cut(____id10, 0)
  __x51 = unique("x")
  def __f11(_=None):
    return ["=", ["quote", _], __x51]
  __eq1 = __f11
  def __f12(__x54=None):
    ____id11 = __x54
    __a1 = has(____id11, 0)
    __b1 = has(____id11, 1)
    if nil63(__b1):
      return [__a1]
    else:
      if string63(__a1) or number63(__a1):
        return [__eq1(__a1), __b1]
      else:
        if one63(__a1):
          return [__eq1(hd(__a1)), __b1]
        else:
          if L_35(__a1) > 1:
            return [join(["or"], map(__eq1, __a1)), __b1]
  __cl1 = __f12
  return ["let", __x51, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]
setenv("case", macro=__f10)
def __f13(cond=None, *_args, **_keys):
  ____r17 = unstash(list(_args), _keys)
  __cond3 = destash33(cond, ____r17)
  ____id13 = ____r17
  __body5 = cut(____id13, 0)
  return ["if", __cond3, join(["do"], __body5)]
setenv("when", macro=__f13)
def __f14(cond=None, *_args, **_keys):
  ____r19 = unstash(list(_args), _keys)
  __cond5 = destash33(cond, ____r19)
  ____id15 = ____r19
  __body7 = cut(____id15, 0)
  return ["if", ["not", __cond5], join(["do"], __body7)]
setenv("unless", macro=__f14)
def __f15(*_args, **_keys):
  __body9 = unstash(list(_args), _keys)
  def __f16(x=None):
    return x
  return join(["%object"], mapo(__f16, __body9))
setenv("obj", macro=__f15)
def __f17(bs=None, *_args, **_keys):
  ____r23 = unstash(list(_args), _keys)
  __bs11 = destash33(bs, ____r23)
  ____id20 = ____r23
  __body111 = cut(____id20, 0)
  if atom63(__bs11):
    return join(["let", [__bs11, hd(__body111)]], tl(__body111))
  else:
    if none63(__bs11):
      return join(["do"], __body111)
    else:
      ____id21 = __bs11
      __lh3 = has(____id21, 0)
      __rh3 = has(____id21, 1)
      __bs21 = cut(____id21, 2)
      ____id22 = bind(__lh3, __rh3)
      __id23 = has(____id22, 0)
      __val1 = has(____id22, 1)
      __bs12 = cut(____id22, 2)
      __renames1 = []
      if not id_literal63(__id23):
        __id121 = unique(__id23)
        __renames1 = [__id23, __id121]
        __id23 = __id121
      return ["do", ["%local", __id23, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body111)]]
setenv("let", macro=__f17)
def __f18(x=None, v=None, *_args, **_keys):
  ____r25 = unstash(list(_args), _keys)
  __x97 = destash33(x, ____r25)
  __v3 = destash33(v, ____r25)
  ____id25 = ____r25
  __body13 = cut(____id25, 0)
  if __v3 == "as":
    return join(["%with", ["%as", __x97, hd(__body13)]], tl(__body13))
  else:
    if not atom63(__x97):
      return join(["%with", __x97, __v3], __body13)
    else:
      return join(["let", [__x97, __v3]], __body13, [__x97])
setenv("with", macro=__f18)
def __f19(x=None, v=None, *_args, **_keys):
  ____r27 = unstash(list(_args), _keys)
  __x110 = destash33(x, ____r27)
  __v5 = destash33(v, ____r27)
  ____id27 = ____r27
  __body15 = cut(____id27, 0)
  __y1 = unique("y")
  return ["let", __y1, __v5, ["when", ["yes", __y1], join(["let", [__x110, __y1]], __body15)]]
setenv("let-when", macro=__f19)
def __f20(name=None, args=None, *_args, **_keys):
  ____r29 = unstash(list(_args), _keys)
  __name1 = destash33(name, ____r29)
  __args3 = destash33(args, ____r29)
  ____id29 = ____r29
  __body17 = cut(____id29, 0)
  ____x119 = object(["setenv", ["quote", __name1]])
  ____x119["macro"] = join(["fn", __args3], __body17)
  __form1 = ____x119
  L_eval(__form1)
  return __form1
setenv("define-macro", macro=__f20)
def __f21(name=None, args=None, *_args, **_keys):
  ____r31 = unstash(list(_args), _keys)
  __name3 = destash33(name, ____r31)
  __args5 = destash33(args, ____r31)
  ____id31 = ____r31
  __body19 = cut(____id31, 0)
  ____x125 = object(["setenv", ["quote", __name3]])
  ____x125["special"] = join(["fn", __args5], __body19)
  __form3 = join(____x125, keys(__body19))
  L_eval(__form3)
  return __form3
setenv("define-special", macro=__f21)
def __f22(name=None, expansion=None):
  setenv(name, symbol=expansion)
  ____x131 = object(["setenv", ["quote", name]])
  ____x131["symbol"] = ["quote", expansion]
  return ____x131
setenv("define-symbol", macro=__f22)
def __f23(__x139=None, *_args, **_keys):
  ____id34 = __x139
  __char1 = has(____id34, 0)
  __s1 = has(____id34, 1)
  ____r35 = unstash(list(_args), _keys)
  ____x139 = destash33(__x139, ____r35)
  ____id35 = ____r35
  __body21 = cut(____id35, 0)
  return ["set", ["get", "read-table", __char1], join(["fn", [__s1]], __body21)]
setenv("define-reader", macro=__f23)
def __f24(name=None, x=None, *_args, **_keys):
  ____r37 = unstash(list(_args), _keys)
  __name5 = destash33(name, ____r37)
  __x147 = destash33(x, ____r37)
  ____id37 = ____r37
  __body23 = cut(____id37, 0)
  setenv(__name5, variable=True)
  if some63(__body23):
    return join(["%local-function", __name5], bind42(__x147, __body23), keys(__body23))
  else:
    return join(["%local", __name5, __x147], keys(__body23))
setenv("define", macro=__f24)
def __f25(name=None, x=None, *_args, **_keys):
  ____r39 = unstash(list(_args), _keys)
  __name7 = destash33(name, ____r39)
  __x153 = destash33(x, ____r39)
  ____id39 = ____r39
  __body25 = cut(____id39, 0)
  setenv(__name7, toplevel=True, variable=True)
  if some63(__body25):
    return join(["%global-function", __name7], bind42(__x153, __body25), keys(__body25))
  else:
    return join(["set", __name7, __x153], keys(__body25))
setenv("define-global", macro=__f25)
def __f26(x=None):
  ____x160 = object(["setenv", x])
  ____x160["toplevel"] = True
  return ["has", ____x160, ["quote", "value"]]
setenv("get-value", macro=__f26)
def __f27(name=None, x=None):
  ____x171 = object(["setenv", ["quote", name]])
  ____x171["toplevel"] = True
  ____x171["value"] = either(x, ["get-value", ["quote", name]])
  return ["do", ____x171, ["define-symbol", name, ["get-value", ["quote", name]]]]
setenv("define-constant", macro=__f27)
def __f28(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]
setenv("define-variable", macro=__f28)
def __f29(*_args, **_keys):
  __body27 = unstash(list(_args), _keys)
  __x195 = unique("x")
  return ["do", ["add", "environment", ["obj"]], ["with", __x195, join(["do"], __body27), ["drop", "environment"]]]
setenv("with-frame", macro=__f29)
def __f30(__x207=None, *_args, **_keys):
  ____id42 = __x207
  __names3 = has(____id42, 0)
  ____r47 = unstash(list(_args), _keys)
  ____x207 = destash33(__x207, ____r47)
  ____id43 = ____r47
  __body29 = cut(____id43, 0)
  __x208 = unique("x")
  ____x211 = object(["setenv", __x208])
  ____x211["variable"] = True
  return join(["with-frame", ["each", __x208, __names3, ____x211]], __body29)
setenv("with-bindings", macro=__f30)
def __f31(definitions=None, *_args, **_keys):
  ____r50 = unstash(list(_args), _keys)
  __definitions1 = destash33(definitions, ____r50)
  ____id45 = ____r50
  __body31 = cut(____id45, 0)
  add(environment, {})
  def __f32(m=None):
    return macroexpand(join(["define-macro"], m))
  map(__f32, __definitions1)
  ____x215 = join(["do"], macroexpand(__body31))
  drop(environment)
  return ____x215
setenv("let-macro", macro=__f31)
def __f33(expansions=None, *_args, **_keys):
  ____r54 = unstash(list(_args), _keys)
  __expansions1 = destash33(expansions, ____r54)
  ____id48 = ____r54
  __body33 = cut(____id48, 0)
  add(environment, {})
  def __f34(__x223=None):
    ____id49 = __x223
    __name9 = has(____id49, 0)
    __exp1 = has(____id49, 1)
    return macroexpand(["define-symbol", __name9, __exp1])
  map(__f34, pair(__expansions1))
  ____x222 = join(["do"], macroexpand(__body33))
  drop(environment)
  return ____x222
setenv("let-symbol", macro=__f33)
def __f35(names=None, *_args, **_keys):
  ____r58 = unstash(list(_args), _keys)
  __names5 = destash33(names, ____r58)
  ____id51 = ____r58
  __body35 = cut(____id51, 0)
  def __f36(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f36, __names5)
  return join(["let", apply(join, __bs3)], __body35)
setenv("let-unique", macro=__f35)
def __f37(args=None, *_args, **_keys):
  ____r61 = unstash(list(_args), _keys)
  __args7 = destash33(args, ____r61)
  ____id53 = ____r61
  __body37 = cut(____id53, 0)
  return join(["%function"], bind42(__args7, __body37), keys(__body37))
setenv("fn", macro=__f37)
def __f38(f=None, *_args, **_keys):
  ____r63 = unstash(list(_args), _keys)
  __f1 = destash33(f, ____r63)
  ____id55 = ____r63
  __args9 = cut(____id55, 0)
  if L_35(__args9) > 1:
    return ["%call", "apply", __f1, ["join", join(["list"], almost(__args9)), last(__args9), join(["list"], keys(__args9))]]
  else:
    if keys63(__args9):
      return ["%call", "apply", __f1, join(["join"], __args9, [join(["list"], keys(__args9))])]
    else:
      return join(["%call", "apply", __f1], __args9)
setenv("apply", macro=__f38)
def __f39(expr=None):
  if has(setenv("target", toplevel=True), "value") == "js" or has(setenv("target", toplevel=True), "value") == "py":
    return [["fn", join(), ["%try", ["list", True, expr]]]]
  else:
    ____x286 = object(["obj"])
    ____x286["stack"] = [["idx", "debug", "traceback"]]
    ____x286["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x286]]]]
setenv("guard", macro=__f39)
def __f40(x=None, t=None, *_args, **_keys):
  ____r67 = unstash(list(_args), _keys)
  __x312 = destash33(x, ____r67)
  __t1 = destash33(t, ____r67)
  ____id58 = ____r67
  __body39 = cut(____id58, 0)
  __o3 = unique("o")
  __n3 = unique("n")
  __i3 = unique("i")
  __e7 = None
  if atom63(__x312):
    __e7 = [__i3, __x312]
  else:
    __e8 = None
    if L_35(__x312) > 1:
      __e8 = __x312
    else:
      __e8 = [__i3, hd(__x312)]
    __e7 = __e8
  ____id59 = __e7
  __k4 = has(____id59, 0)
  __v7 = has(____id59, 1)
  ____x318 = object(["target", __o3])
  ____x318["py"] = ["indices", __o3]
  __e9 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e9 = __body39
  else:
    __e9 = [join(["let", __k4, ["if", ["numeric?", __k4], ["parseInt", __k4], __k4]], __body39)]
  return ["let", [__o3, __t1, __k4, "nil"], ["%for", ____x318, __k4, join(["let", [__v7, ["get", __o3, __k4]]], __e9)]]
setenv("each", macro=__f40)
def __f41(i=None, to=None, *_args, **_keys):
  ____r69 = unstash(list(_args), _keys)
  __i5 = destash33(i, ____r69)
  __to1 = destash33(to, ____r69)
  ____id61 = ____r69
  __body41 = cut(____id61, 0)
  if __to1 == "in":
    return ["%for", hd(__body41), __i5, join(["do"], tl(__body41))]
  else:
    return ["let", __i5, 0, join(["while", ["<", __i5, __to1]], __body41, [["inc", __i5]])]
setenv("for", macro=__f41)
def __f42(v=None, t=None, *_args, **_keys):
  ____r71 = unstash(list(_args), _keys)
  __v9 = destash33(v, ____r71)
  __t3 = destash33(t, ____r71)
  ____id63 = ____r71
  __body43 = cut(____id63, 0)
  __x350 = unique("x")
  __i7 = unique("i")
  return ["let", [__x350, __t3], ["for", __i7, ["#", __x350], join(["let", [__v9, ["at", __x350, __i7]]], __body43)]]
setenv("step", macro=__f42)
def __f43(*_args, **_keys):
  __xs1 = unstash(list(_args), _keys)
  __l5 = {}
  ____o5 = __xs1
  ____i9 = None
  for ____i9 in indices(____o5):
    __x360 = ____o5[____i9]
    __l5[__x360] = True
  return join(["obj"], __l5)
setenv("set-of", macro=__f43)
def __f44(x=None):
  return ["=", "target", x]
setenv("target?", macro=__f44)
def __f45(*_args, **_keys):
  __clauses3 = unstash(list(_args), _keys)
  if has63(__clauses3, has(setenv("target", toplevel=True), "value")):
    return __clauses3[has(setenv("target", toplevel=True), "value")]
  else:
    return hd(__clauses3)
setenv("target", macro=__f45)
def __f46():
  return ["quote", has(setenv("target", toplevel=True), "value")]
setenv("language", macro=__f46)
def __f47(a=None, *_args, **_keys):
  ____r77 = unstash(list(_args), _keys)
  __a3 = destash33(a, ____r77)
  ____id65 = ____r77
  __bs5 = cut(____id65, 0)
  return ["set", __a3, join(["join", __a3], __bs5)]
setenv("join!", macro=__f47)
def __f48(a=None, *_args, **_keys):
  ____r79 = unstash(list(_args), _keys)
  __a5 = destash33(a, ____r79)
  ____id67 = ____r79
  __bs7 = cut(____id67, 0)
  return ["set", __a5, join(["cat", __a5], __bs7)]
setenv("cat!", macro=__f48)
def __f49(n=None, by=None):
  __e10 = None
  if nil63(by):
    __e10 = 1
  else:
    __e10 = by
  return ["set", n, ["+", n, __e10]]
setenv("inc", macro=__f49)
def __f50(n=None, by=None):
  __e11 = None
  if nil63(by):
    __e11 = 1
  else:
    __e11 = by
  return ["set", n, ["-", n, __e11]]
setenv("dec", macro=__f50)
def __f51(form=None):
  __x387 = unique("x")
  return ["do", ["inc", "indent-level"], ["with", __x387, form, ["dec", "indent-level"]]]
setenv("with-indent", macro=__f51)
def __f52(*_args, **_keys):
  __names7 = unstash(list(_args), _keys)
  def __f53(k=None):
    if k == compile(k):
      return ["set", ["idx", "exports", k], k]
    else:
      return ["set", ["get", "exports", ["quote", k]], k, ["idx", "exports", k], k]
  __forms3 = map(__f53, __names7)
  if has(setenv("target", toplevel=True), "value") == "js":
    return join(["do"], __forms3)
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms3, [["return", "exports"]])
setenv("export", macro=__f52)
def __f54(*_args, **_keys):
  __body45 = unstash(list(_args), _keys)
  return L_eval(join(["do"], __body45))
setenv("when-compiling", macro=__f54)
def __f55(*_args, **_keys):
  __body47 = unstash(list(_args), _keys)
  __form5 = join(["do"], __body47)
  L_eval(__form5)
  return __form5
setenv("during-compilation", macro=__f55)
def __f56(name=None, *_args, **_keys):
  ____r89 = unstash(list(_args), _keys)
  __name11 = destash33(name, ____r89)
  ____id69 = ____r89
  __body49 = cut(____id69, 0)
  return join(["define-global", __name11], __body49)
setenv("def", macro=__f56)
def __f57(name=None, *_args, **_keys):
  ____r91 = unstash(list(_args), _keys)
  __name13 = destash33(name, ____r91)
  ____id71 = ____r91
  __body51 = cut(____id71, 0)
  return join(["define-macro", __name13], __body51)
setenv("mac", macro=__f57)
def __f58(name=None, *_args, **_keys):
  ____r93 = unstash(list(_args), _keys)
  __name15 = destash33(name, ____r93)
  ____id73 = ____r93
  __value1 = cut(____id73, 0)
  return join(["def", __name15], __value1)
setenv("defconst", macro=__f58)
def __f59(name=None):
  ____x435 = object(["target"])
  ____x435["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x435["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x435["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x435
setenv("undefined?", macro=__f59)
def __f60(name=None, *_args, **_keys):
  ____r97 = unstash(list(_args), _keys)
  __name17 = destash33(name, ____r97)
  ____id75 = ____r97
  __value3 = cut(____id75, 0)
  ____x451 = object(["target"])
  ____x451["py"] = ["global", __name17]
  return ["when", ["undefined?", __name17], ____x451, join(["defconst", __name17], __value3)]
setenv("defvar", macro=__f60)
def __f61(*_args, **_keys):
  __args11 = unstash(list(_args), _keys)
  if none63(__args11):
    return 0
  else:
    if one63(__args11):
      return hd(__args11)
    else:
      return join(["%add"], __args11)
setenv("+", macro=__f61)
def __f62(*_args, **_keys):
  __args13 = unstash(list(_args), _keys)
  if none63(__args13):
    return 0
  else:
    if one63(__args13):
      return ["%unm", hd(__args13)]
    else:
      return join(["%sub"], __args13)
setenv("-", macro=__f62)
def __f63(*_args, **_keys):
  __args15 = unstash(list(_args), _keys)
  if none63(__args15):
    return 1
  else:
    if one63(__args15):
      return hd(__args15)
    else:
      return join(["%mul"], __args15)
setenv("*", macro=__f63)
def __f64(*_args, **_keys):
  __args17 = unstash(list(_args), _keys)
  if none63(__args17):
    return 1
  else:
    if one63(__args17):
      return hd(__args17)
    else:
      return join(["%div"], __args17)
setenv("/", macro=__f64)
def __f65(keyword=None, *_args, **_keys):
  ____r99 = unstash(list(_args), _keys)
  __keyword1 = destash33(keyword, ____r99)
  ____id77 = ____r99
  __body53 = cut(____id77, 0)
  ____x465 = object([__keyword1])
  ____x465["async"] = True
  return join(____x465, __body53)
setenv("async", macro=__f65)
import reader
import compiler
import system
import traceback
from compiler import *
def lumen_set_globals(x=None):
  compiler.lumen_globals = x
  return compiler.lumen_globals
def toplevel_repr(v=None):
  return repr(v)
def toplevel_print(v=None):
  return L_print(toplevel_repr(v))
def eval_print(form=None):
  def __f():
    try:
      return [True, compiler.L_eval(form)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id = __f()
  __ok = has(____id, 0)
  __v = has(____id, 1)
  __ex = has(____id, 2)
  if not __ok:
    return traceback.print_exception(*__ex)
  else:
    if is63(__v):
      return toplevel_print(__v)
def rep(s=None):
  __v1 = L_eval(reader.read_string(s))
  if is63(__v1):
    return toplevel_print(__v1)
def repl():
  __o = {"buf": ""}
  def rep1(s=None):
    __o["buf"] = cat(__o["buf"], s)
    __more = []
    __form = reader.read_string(__o["buf"], __more)
    if not( __form == __more):
      eval_print(__form)
      __o["buf"] = ""
      system.write("> ")
      return system.flush()
  system.write("> ")
  system.flush()
  while True:
    __s = system.read_line()
    if __s:
      rep1(cat(__s, "\n"))
    else:
      break
def read_from_file(path=None):
  __s1 = reader.stream(system.read_file(path))
  return reader.read_all(__s1)
def expand_file(path=None):
  __body = read_from_file(path)
  return compiler.expand(join(["do"], __body))
def compile_file(path=None):
  __form1 = expand_file(path)
  return compiler.compile(__form1, stmt=True)
def L_load(path=None):
  __previous = has(setenv("target", toplevel=True), "value")
  setenv("target", toplevel=True)["value"] = "py"
  __code = compile_file(path)
  setenv("target", toplevel=True)["value"] = __previous
  return compiler.run(__code)
def script_file63(path=None):
  return not( "-" == char(path, 0) or ".py" == clip(path, L_35(path) - 3) or ".js" == clip(path, L_35(path) - 3) or ".lua" == clip(path, L_35(path) - 4))
def run_file(path=None):
  if script_file63(path):
    return L_load(path)
  else:
    return compiler.run(system.read_file(path))
def usage():
  L_print("usage: lumen [<file> <arguments> | options <object files>]")
  L_print(" <file>\t\tProgram read from script file")
  L_print(" <arguments>\tPassed to program in system.argv")
  L_print(" <object files>\tLoaded before compiling <input>")
  L_print("options:")
  L_print(" -c <input>\tCompile input file")
  L_print(" -o <output>\tOutput file")
  L_print(" -t <target>\tTarget language (default: lua)")
  return L_print(" -e <expr>\tExpression to evaluate")
def main():
  __arg = hd(system.argv)
  if __arg and script_file63(__arg):
    return L_load(__arg)
  else:
    if __arg == "-h" or __arg == "--help":
      return usage()
    else:
      __pre = []
      __input = None
      __output = None
      __target1 = None
      __expr = None
      __argv = system.argv
      __i = 0
      while __i < L_35(__argv):
        __a = __argv[__i]
        if __a == "-c" or __a == "-o" or __a == "-t" or __a == "-e":
          if __i == edge(__argv):
            L_print(cat("missing argument for ", __a))
          else:
            __i = __i + 1
            __val = __argv[__i]
            if __a == "-c":
              __input = __val
            else:
              if __a == "-o":
                __output = __val
              else:
                if __a == "-t":
                  __target1 = __val
                else:
                  if __a == "-e":
                    __expr = __val
        else:
          if not( "-" == char(__a, 0)):
            add(__pre, __a)
        __i = __i + 1
      ____x2 = __pre
      ____i1 = 0
      while ____i1 < L_35(____x2):
        __file = ____x2[____i1]
        run_file(__file)
        ____i1 = ____i1 + 1
      if nil63(__input):
        if __expr:
          return rep(__expr)
        else:
          return repl()
      else:
        if __target1:
          setenv("target", toplevel=True)["value"] = __target1
        __code1 = compile_file(__input)
        if nil63(__output) or __output == "-":
          return L_print(__code1)
        else:
          return system.write_file(__output, __code1)
def main63():
  return __name__ == "__main__"
if main63():
  main()
