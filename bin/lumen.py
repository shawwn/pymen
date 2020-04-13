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
    ____x2 = x
    ____i = 0
    while ____i < L_35(____x2):
      __v = ____x2[____i]
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
def length(x=None, upto=None):
  __n1 = -1
  __upto = either(upto, inf)
  ____o1 = x
  __k1 = None
  for __k1 in indices(____o1):
    __v2 = ____o1[__k1]
    if number63(__k1):
      if __k1 > __n1:
        __n1 = __k1
        if __n1 >= __upto:
          break
  __n1 = __n1 + 1
  return __n1
def L_35(x=None, upto=None):
  if string63(x) or array63(x):
    return len(x)
  else:
    return length(x, upto)
def none63(x=None):
  return L_35(x, 0) == 0
def some63(x=None):
  return L_35(x, 0) > 0
def one63(x=None):
  return L_35(x, 1) == 1
def two63(x=None):
  return L_35(x, 2) == 2
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
def list63(x=None):
  return obj63(x) or array63(x)
def atom63(x=None):
  return nil63(x) or string63(x) or number63(x) or boolean63(x)
def hd63(l=None, x=None):
  if function63(x):
    return x(hd(l))
  else:
    if nil63(x):
      return some63(l)
    else:
      return x == hd(l)
nan = float("nan")
inf = float("inf")
L_inf = - inf
def nan63(n=None):
  return not( n == n)
def inf63(n=None):
  return n == inf or n == L_inf
def clip(s=None, L_from=None, upto=None):
  __n3 = L_35(s)
  __e8 = None
  if nil63(L_from) or L_from < 0:
    __e8 = 0
  else:
    __e8 = L_from
  __L_from = __e8
  __e9 = None
  if nil63(upto) or upto > __n3:
    __e9 = __n3
  else:
    __e9 = upto
  __upto1 = __e9
  return s[__L_from:__upto1]
def dupe(x=None):
  return {}
def cut(x=None, L_from=None, upto=None):
  __l2 = dupe(x)
  __j = 0
  __e10 = None
  if nil63(L_from) or L_from < 0:
    __e10 = 0
  else:
    __e10 = L_from
  __i3 = __e10
  __n4 = L_35(x)
  __e11 = None
  if nil63(upto) or upto > __n4:
    __e11 = __n4
  else:
    __e11 = upto
  __upto2 = __e11
  while __i3 < __upto2:
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
  __x3 = char(s, n)
  if __x3:
    return ord(__x3)
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
      __r41 = l[__n8]
      del l[__n8]
      return __r41
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
  __r46 = {}
  ____x4 = __ls
  ____i7 = 0
  while ____i7 < L_35(____x4):
    __l3 = ____x4[____i7]
    if __l3:
      __n9 = L_35(__r46)
      ____o4 = __l3
      __k4 = None
      for __k4 in indices(____o4):
        __v5 = ____o4[__k4]
        if number63(__k4):
          __k4 = __k4 + __n9
        else:
          __l3 = object(__l3)
        __r46[__k4] = __v5
    ____i7 = ____i7 + 1
  return __r46
def find(f=None, t=None):
  ____o5 = t
  ____i9 = None
  for ____i9 in indices(____o5):
    __x5 = ____o5[____i9]
    __y = f(__x5)
    if __y:
      return __y
def first(f=None, l=None):
  ____x6 = l
  ____i10 = 0
  while ____i10 < L_35(____x6):
    __x7 = ____x6[____i10]
    __y1 = f(__x7)
    if __y1:
      return __y1
    ____i10 = ____i10 + 1
def in63(x=None, t=None):
  def __f4(y=None):
    return x == y
  return find(__f4, t)
def pair(l=None):
  __l12 = dupe(l)
  __n12 = L_35(l)
  __i11 = 0
  while __i11 < __n12:
    __a = l[__i11]
    __e12 = None
    if __i11 + 1 < __n12:
      __e12 = l[__i11 + 1]
    __b = __e12
    add(__l12, [__a, __b])
    __i11 = __i11 + 1
    __i11 = __i11 + 1
  return __l12
import functools
def sortfunc(f=None):
  if f:
    def __f5(a=None, b=None):
      if f(a, b):
        return -1
      else:
        return 1
    __f = __f5
    return functools.cmp_to_key(__f)
def sort(l=None, f=None):
  l.sort(key=sortfunc(f))
  return l
def map(f=None, x=None):
  __t1 = dupe(x)
  ____x9 = x
  ____i12 = 0
  while ____i12 < L_35(____x9):
    __v6 = ____x9[____i12]
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
  __r57 = ""
  __c = ""
  ____x10 = x
  ____i14 = 0
  while ____i14 < L_35(____x10):
    __v8 = ____x10[____i14]
    __e13 = None
    if f:
      __e13 = f(__v8)
    else:
      __e13 = __v8
    __y4 = __e13
    if is63(__y4):
      __r57 = cat(__r57, __c, __y4)
      __c = sep or ""
    ____i14 = ____i14 + 1
  return __r57
def keep(f=None, x=None):
  def __f6(v=None):
    if yes(f(v)):
      return v
  return map(__f6, x)
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
    __x11 = ____o8[____i16]
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
def string_ends63(L_str=None, x=None, pos=None):
  __e14 = None
  if is63(pos):
    __e14 = clip(L_str, pos)
  else:
    __e14 = L_str
  __L_str = __e14
  if L_35(x) > L_35(__L_str):
    return False
  else:
    return x == clip(__L_str, L_35(__L_str) - L_35(x))
def string_starts63(L_str=None, x=None, pos=None):
  __e15 = None
  if is63(pos):
    __e15 = clip(L_str, pos)
  else:
    __e15 = L_str
  __L_str1 = __e15
  if L_35(x) > L_35(__L_str1):
    return False
  else:
    return x == clip(__L_str1, 0, L_35(x))
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
  def __f7(a=None, b=None):
    return cat2(a, b)
  return either(reduce(__f7, __xs), "")
def L_43(*_args, **_keys):
  __xs1 = unstash(list(_args), _keys)
  def __f8(a=None, b=None):
    return a + b
  return either(reduce(__f8, __xs1), 0)
def L_45(*_args, **_keys):
  __xs2 = unstash(list(_args), _keys)
  def __f9(b=None, a=None):
    return a - b
  return either(reduce(__f9, reverse(__xs2)), 0)
def L_42(*_args, **_keys):
  __xs3 = unstash(list(_args), _keys)
  def __f10(a=None, b=None):
    return a * b
  return either(reduce(__f10, __xs3), 1)
def L_47(*_args, **_keys):
  __xs4 = unstash(list(_args), _keys)
  def __f11(b=None, a=None):
    return a / b
  return either(reduce(__f11, reverse(__xs4)), 1)
def L_37(*_args, **_keys):
  __xs5 = unstash(list(_args), _keys)
  def __f12(b=None, a=None):
    return a % b
  return either(reduce(__f12, reverse(__xs5)), 0)
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
  def __f13(a=None, b=None):
    return a < b
  return pairwise(__f13, __xs6)
def L_62(*_args, **_keys):
  __xs7 = unstash(list(_args), _keys)
  def __f14(a=None, b=None):
    return a > b
  return pairwise(__f14, __xs7)
def L_61(*_args, **_keys):
  __xs8 = unstash(list(_args), _keys)
  def __f15(a=None, b=None):
    return a == b
  return pairwise(__f15, __xs8)
def L_6061(*_args, **_keys):
  __xs9 = unstash(list(_args), _keys)
  def __f16(a=None, b=None):
    return a <= b
  return pairwise(__f16, __xs9)
def L_6261(*_args, **_keys):
  __xs10 = unstash(list(_args), _keys)
  def __f17(a=None, b=None):
    return a >= b
  return pairwise(__f17, __xs10)
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
  if nil63(search(s, "\n")) and nil63(search(s, "\r")) and nil63(search(s, "\"")) and nil63(search(s, "\\")):
    return "".join(["\"", s, "\""])
  else:
    __s1 = "\""
    __i26 = 0
    while __i26 < L_35(s):
      __c1 = char(s, __i26)
      __e16 = None
      if __c1 == "\n":
        __e16 = "\\n"
      else:
        __e17 = None
        if __c1 == "\r":
          __e17 = "\\r"
        else:
          __e18 = None
          if __c1 == "\"":
            __e18 = "\\\""
          else:
            __e19 = None
            if __c1 == "\\":
              __e19 = "\\\\"
            else:
              __e19 = __c1
            __e18 = __e19
          __e17 = __e18
        __e16 = __e17
      __c11 = __e16
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
                      def __f18(__x14=None, __x15=None):
                        ____id = __x14
                        __a2 = has(____id, 0)
                        ____id1 = __x15
                        __b2 = has(____id1, 0)
                        return __a2 < __b2
                      sort(__ks, __f18)
                      drop(__l6)
                      ____x16 = __xs11
                      ____i28 = 0
                      while ____i28 < L_35(____x16):
                        __v16 = ____x16[____i28]
                        __s = cat(__s, __sp, __v16)
                        __sp = " "
                        ____i28 = ____i28 + 1
                      ____x17 = __ks
                      ____i29 = 0
                      while ____i29 < L_35(____x17):
                        ____id2 = ____x17[____i29]
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
  ____r91 = unstash(list(_args), _keys)
  __f1 = destash33(f, ____r91)
  ____id3 = ____r91
  __args12 = cut(____id3, 0)
  return apply(__f1, __args12)
def setenv(k=None, *_args, **_keys):
  ____r92 = unstash(list(_args), _keys)
  __k14 = destash33(k, ____r92)
  ____id4 = ____r92
  __keys = cut(____id4, 0)
  if string63(__k14):
    __e20 = None
    if has63(__keys, "toplevel"):
      __e20 = hd(environment)
    else:
      __e20 = last(environment)
    __frame = __e20
    __e21 = None
    if has63(__frame, __k14):
      __e21 = __frame[__k14]
    else:
      __e21 = {}
    __entry = __e21
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
def __f19(form=None):
  return quoted(form)
setenv("quote", macro=__f19)
def __f20(form=None):
  return quasiexpand(form, 1)
setenv("quasiquote", macro=__f20)
def __f21(*_args, **_keys):
  __args3 = unstash(list(_args), _keys)
  def __f22(__x26=None):
    ____id6 = __x26
    __lh1 = has(____id6, 0)
    __rh1 = has(____id6, 1)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has":
      return ["%set", join(["get"], tl(__lh1)), __rh1]
    else:
      return ["%set", __lh1, __rh1]
  return join(["do"], map(__f22, pair(__args3)))
setenv("set", macro=__f21)
def __f23(l=None, i=None):
  if has(setenv("target", toplevel=True), "value") == "lua" and number63(i):
    i = i + 1
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      i = ["+", i, 1]
  return ["get", l, i]
setenv("at", macro=__f23)
def __f24(place=None):
  if has(setenv("target", toplevel=True), "value") == "lua":
    return ["set", place, "nil"]
  else:
    return ["%delete", place]
setenv("wipe", macro=__f24)
def __f25(*_args, **_keys):
  __body2 = unstash(list(_args), _keys)
  if L_35(__body2) > 2 and __body2[1] == "for" and __body2[3] == "in":
    ____id10 = __body2
    __expr2 = has(____id10, 0)
    __body3 = cut(____id10, 1)
    __comps1 = []
    __cond1 = None
    while L_35(__body3) > 2 and __body3[0] == "for" and __body3[2] == "in":
      ____id11 = __body3
      ___for1 = has(____id11, 0)
      __names1 = has(____id11, 1)
      ___in1 = has(____id11, 2)
      __l9 = has(____id11, 3)
      __body12 = cut(____id11, 4)
      add(__comps1, [__names1, __l9])
      __body3 = __body12
    if hd(__body3) == "if":
      ____id12 = __body3
      ___if1 = has(____id12, 0)
      __expr3 = has(____id12, 1)
      __cond1 = __expr3
    return ["%list", __expr2, __comps1, __cond1]
  else:
    __x51 = unique("x")
    __l10 = {}
    __forms1 = []
    ____o17 = __body2
    __k18 = None
    for __k18 in indices(____o17):
      __v20 = ____o17[__k18]
      if number63(__k18):
        __l10[__k18] = __v20
      else:
        add(__forms1, ["set", ["get", __x51, ["quote", __k18]], __v20])
    if some63(__forms1):
      return join(["let", __x51, ["object", join(["%array"], __l10)]], __forms1, [__x51])
    else:
      return join(["%array"], __l10)
setenv("list", macro=__f25)
def __f26(*_args, **_keys):
  __branches1 = unstash(list(_args), _keys)
  return hd(expand_if(__branches1))
setenv("if", macro=__f26)
def __f27(expr=None, *_args, **_keys):
  ____r107 = unstash(list(_args), _keys)
  __expr5 = destash33(expr, ____r107)
  ____id15 = ____r107
  __clauses1 = cut(____id15, 0)
  __x71 = unique("x")
  def __f28(_=None):
    return ["=", ["quote", _], __x71]
  __eq1 = __f28
  def __f29(__x74=None):
    ____id16 = __x74
    __a4 = has(____id16, 0)
    __b4 = has(____id16, 1)
    if nil63(__b4):
      return [__a4]
    else:
      if string63(__a4) or number63(__a4):
        return [__eq1(__a4), __b4]
      else:
        if one63(__a4):
          return [__eq1(hd(__a4)), __b4]
        else:
          if L_35(__a4) > 1:
            return [join(["or"], map(__eq1, __a4)), __b4]
  __cl1 = __f29
  return ["let", __x71, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]
setenv("case", macro=__f27)
def __f30(cond=None, *_args, **_keys):
  ____r111 = unstash(list(_args), _keys)
  __cond3 = destash33(cond, ____r111)
  ____id18 = ____r111
  __body5 = cut(____id18, 0)
  return ["if", __cond3, join(["do"], __body5)]
setenv("when", macro=__f30)
def __f31(cond=None, *_args, **_keys):
  ____r113 = unstash(list(_args), _keys)
  __cond5 = destash33(cond, ____r113)
  ____id20 = ____r113
  __body7 = cut(____id20, 0)
  return ["if", ["not", __cond5], join(["do"], __body7)]
setenv("unless", macro=__f31)
def __f32(*_args, **_keys):
  __body9 = unstash(list(_args), _keys)
  def __f33(x=None):
    return x
  return join(["%object"], mapo(__f33, __body9))
setenv("obj", macro=__f32)
def __f34(bs=None, *_args, **_keys):
  ____r117 = unstash(list(_args), _keys)
  __bs11 = destash33(bs, ____r117)
  ____id25 = ____r117
  __body111 = cut(____id25, 0)
  if atom63(__bs11):
    return join(["let", [__bs11, hd(__body111)]], tl(__body111))
  else:
    if none63(__bs11):
      return join(["do"], __body111)
    else:
      ____id26 = __bs11
      __lh3 = has(____id26, 0)
      __rh3 = has(____id26, 1)
      __bs21 = cut(____id26, 2)
      ____id27 = bind(__lh3, __rh3)
      __id28 = has(____id27, 0)
      __val1 = has(____id27, 1)
      __bs12 = cut(____id27, 2)
      __renames1 = []
      if not id_literal63(__id28):
        __id121 = unique(__id28)
        __renames1 = [__id28, __id121]
        __id28 = __id121
      return ["do", ["%local", __id28, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body111)]]
setenv("let", macro=__f34)
def __f35(x=None, v=None, *_args, **_keys):
  ____r119 = unstash(list(_args), _keys)
  __x117 = destash33(x, ____r119)
  __v22 = destash33(v, ____r119)
  ____id30 = ____r119
  __body13 = cut(____id30, 0)
  if __v22 == "as":
    return join(["%with", ["%as", __x117, hd(__body13)]], tl(__body13))
  else:
    if not atom63(__x117) or has(__body13, "async"):
      return join(["%with", __x117, __v22], __body13)
    else:
      return join(["let", [__x117, __v22]], __body13, [__x117])
setenv("with", macro=__f35)
def __f36(x=None, v=None, *_args, **_keys):
  ____r121 = unstash(list(_args), _keys)
  __x130 = destash33(x, ____r121)
  __v24 = destash33(v, ____r121)
  ____id32 = ____r121
  __body15 = cut(____id32, 0)
  __y6 = unique("y")
  return ["let", __y6, __v24, ["when", ["yes", __y6], join(["let", [__x130, __y6]], __body15)]]
setenv("let-when", macro=__f36)
def __f37(name=None, args=None, *_args, **_keys):
  ____r123 = unstash(list(_args), _keys)
  __name1 = destash33(name, ____r123)
  __args5 = destash33(args, ____r123)
  ____id34 = ____r123
  __body17 = cut(____id34, 0)
  ____x139 = object(["setenv", ["quote", __name1]])
  ____x139["macro"] = join(["fn", __args5], __body17)
  __form1 = ____x139
  L_eval(__form1)
  return __form1
setenv("define-macro", macro=__f37)
def __f38(name=None, args=None, *_args, **_keys):
  ____r125 = unstash(list(_args), _keys)
  __name3 = destash33(name, ____r125)
  __args7 = destash33(args, ____r125)
  ____id36 = ____r125
  __body19 = cut(____id36, 0)
  ____x145 = object(["setenv", ["quote", __name3]])
  ____x145["special"] = join(["fn", __args7], __body19)
  __form3 = join(____x145, keys(__body19))
  L_eval(__form3)
  return __form3
setenv("define-special", macro=__f38)
def __f39(name=None, expansion=None):
  setenv(name, symbol=expansion)
  ____x151 = object(["setenv", ["quote", name]])
  ____x151["symbol"] = ["quote", expansion]
  return ____x151
setenv("define-symbol", macro=__f39)
def __f40(__x159=None, *_args, **_keys):
  ____r129 = unstash(list(_args), _keys)
  ____x159 = destash33(__x159, ____r129)
  ____id39 = ____x159
  __char1 = has(____id39, 0)
  __s2 = has(____id39, 1)
  ____id40 = ____r129
  __body21 = cut(____id40, 0)
  return ["set", ["get", "read-table", __char1], join(["fn", [__s2]], __body21)]
setenv("define-reader", macro=__f40)
def __f41(name=None, x=None, *_args, **_keys):
  ____r131 = unstash(list(_args), _keys)
  __name5 = destash33(name, ____r131)
  __x167 = destash33(x, ____r131)
  ____id42 = ____r131
  __body23 = cut(____id42, 0)
  setenv(__name5, variable=True)
  if some63(__body23):
    return join(["%local-function", __name5], bind42(__x167, __body23), keys(__body23))
  else:
    return join(["%local", __name5, __x167], keys(__body23))
setenv("define", macro=__f41)
def __f42(name=None, x=None, *_args, **_keys):
  ____r133 = unstash(list(_args), _keys)
  __name7 = destash33(name, ____r133)
  __x173 = destash33(x, ____r133)
  ____id44 = ____r133
  __body25 = cut(____id44, 0)
  setenv(__name7, toplevel=True, variable=True)
  if some63(__body25):
    return join(["%global-function", __name7], bind42(__x173, __body25), keys(__body25))
  else:
    return join(["set", __name7, __x173], keys(__body25))
setenv("define-global", macro=__f42)
def __f43(x=None):
  ____x180 = object(["setenv", x])
  ____x180["toplevel"] = True
  return ["has", ____x180, ["quote", "value"]]
setenv("get-value", macro=__f43)
def __f44(name=None, x=None):
  ____x191 = object(["setenv", ["quote", name]])
  ____x191["toplevel"] = True
  ____x191["value"] = either(x, ["get-value", ["quote", name]])
  return ["do", ____x191, ["define-symbol", name, ["get-value", ["quote", name]]]]
setenv("define-constant", macro=__f44)
def __f45(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]
setenv("define-variable", macro=__f45)
def __f46(x=None, *_args, **_keys):
  ____r142 = unstash(list(_args), _keys)
  __x214 = destash33(x, ____r142)
  ____id46 = ____r142
  __body27 = cut(____id46, 0)
  __r143 = unique("r")
  return ["with", __r143, "nil", ["%block", "try", "||", ["set", __r143, __x214]], ["%block", "finally", "||", join(["do"], __body27)]]
setenv("after", macro=__f46)
def __f47(*_args, **_keys):
  __body29 = unstash(list(_args), _keys)
  __x230 = unique("x")
  __forms3 = []
  ____o19 = __body29
  __k21 = None
  for __k21 in indices(____o19):
    __v26 = ____o19[__k21]
    if not number63(__k21):
      ____x234 = object(["setenv", ["quote", __k21]])
      ____x234["value"] = __v26
      add(__forms3, ____x234)
  return join(["do", ["add", "environment", ["obj"]]], __forms3, [["with", __x230, join(["do"], __body29), ["drop", "environment"]]])
setenv("with-frame", macro=__f47)
def __f48(__x245=None, *_args, **_keys):
  ____r145 = unstash(list(_args), _keys)
  ____x245 = destash33(__x245, ____r145)
  ____id49 = ____x245
  __names3 = has(____id49, 0)
  ____id50 = ____r145
  __body31 = cut(____id50, 0)
  __x246 = unique("x")
  ____x249 = object(["setenv", __x246])
  ____x249["variable"] = True
  return join(["with-frame", ["each", __x246, __names3, ____x249]], __body31)
setenv("with-bindings", macro=__f48)
def __f49(definitions=None, *_args, **_keys):
  ____r148 = unstash(list(_args), _keys)
  __definitions1 = destash33(definitions, ____r148)
  ____id52 = ____r148
  __body33 = cut(____id52, 0)
  add(environment, {})
  def __f50(m=None):
    return macroexpand(join(["define-macro"], m))
  map(__f50, __definitions1)
  ____x253 = join(["do"], macroexpand(__body33))
  drop(environment)
  return ____x253
setenv("let-macro", macro=__f49)
def __f51(expansions=None, *_args, **_keys):
  ____r152 = unstash(list(_args), _keys)
  __expansions1 = destash33(expansions, ____r152)
  ____id55 = ____r152
  __body35 = cut(____id55, 0)
  add(environment, {})
  def __f52(__x261=None):
    ____id56 = __x261
    __name9 = has(____id56, 0)
    __exp1 = has(____id56, 1)
    return macroexpand(["define-symbol", __name9, __exp1])
  map(__f52, pair(__expansions1))
  ____x260 = join(["do"], macroexpand(__body35))
  drop(environment)
  return ____x260
setenv("let-symbol", macro=__f51)
def __f53(names=None, *_args, **_keys):
  ____r156 = unstash(list(_args), _keys)
  __names5 = destash33(names, ____r156)
  ____id58 = ____r156
  __body37 = cut(____id58, 0)
  def __f54(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f54, __names5)
  return join(["let", apply(join, __bs3)], __body37)
setenv("let-unique", macro=__f53)
def __f55(args=None, *_args, **_keys):
  ____r159 = unstash(list(_args), _keys)
  __args9 = destash33(args, ____r159)
  ____id60 = ____r159
  __body39 = cut(____id60, 0)
  return join(["%function"], bind42(__args9, __body39), keys(__body39))
setenv("fn", macro=__f55)
def __f56(f=None, *_args, **_keys):
  ____r161 = unstash(list(_args), _keys)
  __f3 = destash33(f, ____r161)
  ____id62 = ____r161
  __args111 = cut(____id62, 0)
  if L_35(__args111) > 1:
    return ["%call", "apply", __f3, ["join", join(["list"], almost(__args111)), last(__args111), join(["list"], keys(__args111))]]
  else:
    if keys63(__args111):
      return ["%call", "apply", __f3, join(["join"], __args111, [join(["list"], keys(__args111))])]
    else:
      return join(["%call", "apply", __f3], __args111)
setenv("apply", macro=__f56)
def __f57(expr=None):
  if has(setenv("target", toplevel=True), "value") == "js" or has(setenv("target", toplevel=True), "value") == "py":
    return [["fn", join(), ["%try", ["list", True, expr]]]]
  else:
    ____x324 = object(["obj"])
    ____x324["stack"] = [["idx", "debug", "traceback"]]
    ____x324["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x324]]]]
setenv("guard", macro=__f57)
def __f58(x=None, t=None, *_args, **_keys):
  ____r165 = unstash(list(_args), _keys)
  __x351 = destash33(x, ____r165)
  __t3 = destash33(t, ____r165)
  ____id65 = ____r165
  __body41 = cut(____id65, 0)
  __o21 = unique("o")
  __n30 = unique("n")
  __i36 = unique("i")
  __e22 = None
  if atom63(__x351):
    __e22 = [__i36, __x351]
  else:
    __e23 = None
    if L_35(__x351) > 1:
      __e23 = __x351
    else:
      __e23 = [__i36, hd(__x351)]
    __e22 = __e23
  ____id66 = __e22
  __k23 = has(____id66, 0)
  __v28 = has(____id66, 1)
  ____x357 = object(["target", __o21])
  ____x357["py"] = ["indices", __o21]
  __e24 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e24 = __body41
  else:
    __e24 = [join(["let", __k23, ["if", ["numeric?", __k23], ["parseInt", __k23], __k23]], __body41)]
  return ["let", [__o21, __t3, __k23, "nil"], join(["%for", ____x357, __k23], keys(__body41), [join(["let", [__v28, ["get", __o21, __k23]]], __e24)])]
setenv("each", macro=__f58)
def __f59(i=None, to=None, *_args, **_keys):
  ____r167 = unstash(list(_args), _keys)
  __i38 = destash33(i, ____r167)
  __to1 = destash33(to, ____r167)
  ____id68 = ____r167
  __body43 = cut(____id68, 0)
  if __to1 == "in":
    return join(["%for", hd(__body43), __i38, join(["do"], tl(__body43))], keys(__body43))
  else:
    return ["let", __i38, 0, join(["while", ["<", __i38, __to1]], __body43, [["inc", __i38]])]
setenv("for", macro=__f59)
def __f60(v=None, t=None, *_args, **_keys):
  ____r169 = unstash(list(_args), _keys)
  __v30 = destash33(v, ____r169)
  __t5 = destash33(t, ____r169)
  ____id70 = ____r169
  __body45 = cut(____id70, 0)
  __x390 = unique("x")
  __i40 = unique("i")
  return ["let", [__x390, __t5], ["for", __i40, ["#", __x390], join(["let", [__v30, ["at", __x390, __i40]]], __body45)]]
setenv("step", macro=__f60)
def __f61(*_args, **_keys):
  __xs13 = unstash(list(_args), _keys)
  __l121 = {}
  ____o23 = __xs13
  ____i42 = None
  for ____i42 in indices(____o23):
    __x400 = ____o23[____i42]
    __l121[__x400] = True
  return join(["obj"], __l121)
setenv("set-of", macro=__f61)
def __f62(x=None):
  return ["=", "target", x]
setenv("target?", macro=__f62)
def __f63(*_args, **_keys):
  __clauses3 = unstash(list(_args), _keys)
  if has63(__clauses3, has(setenv("target", toplevel=True), "value")):
    return __clauses3[has(setenv("target", toplevel=True), "value")]
  else:
    return hd(__clauses3)
setenv("target", macro=__f63)
def __f64():
  return ["quote", has(setenv("target", toplevel=True), "value")]
setenv("language", macro=__f64)
def __f65(a=None, *_args, **_keys):
  ____r175 = unstash(list(_args), _keys)
  __a6 = destash33(a, ____r175)
  ____id72 = ____r175
  __bs5 = cut(____id72, 0)
  return ["set", __a6, join(["join", __a6], __bs5)]
setenv("join!", macro=__f65)
def __f66(a=None, *_args, **_keys):
  ____r177 = unstash(list(_args), _keys)
  __a8 = destash33(a, ____r177)
  ____id74 = ____r177
  __bs7 = cut(____id74, 0)
  return ["set", __a8, join(["cat", __a8], __bs7)]
setenv("cat!", macro=__f66)
def __f67(n=None, by=None):
  __e25 = None
  if nil63(by):
    __e25 = 1
  else:
    __e25 = by
  return ["set", n, ["+", n, __e25]]
setenv("inc", macro=__f67)
def __f68(n=None, by=None):
  __e26 = None
  if nil63(by):
    __e26 = 1
  else:
    __e26 = by
  return ["set", n, ["-", n, __e26]]
setenv("dec", macro=__f68)
def __f69(form=None):
  __x427 = unique("x")
  return ["do", ["inc", "indent-level"], ["with", __x427, form, ["dec", "indent-level"]]]
setenv("with-indent", macro=__f69)
def __f70(*_args, **_keys):
  __names7 = unstash(list(_args), _keys)
  def __f71(k=None):
    if k == compile(k):
      return ["set", ["idx", "exports", k], k]
    else:
      return ["set", ["get", "exports", ["quote", k]], k, ["idx", "exports", k], k]
  __forms5 = map(__f71, __names7)
  if has(setenv("target", toplevel=True), "value") == "js":
    return join(["do"], __forms5)
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]])
setenv("export", macro=__f70)
def __f72(*_args, **_keys):
  __body47 = unstash(list(_args), _keys)
  return L_eval(join(["do"], __body47))
setenv("when-compiling", macro=__f72)
def __f73(*_args, **_keys):
  __body49 = unstash(list(_args), _keys)
  __form5 = join(["do"], __body49)
  L_eval(__form5)
  return __form5
setenv("during-compilation", macro=__f73)
def __f74(name=None, *_args, **_keys):
  ____r187 = unstash(list(_args), _keys)
  __name11 = destash33(name, ____r187)
  ____id76 = ____r187
  __body51 = cut(____id76, 0)
  return join(["define-global", __name11], __body51)
setenv("def", macro=__f74)
def __f75(name=None, *_args, **_keys):
  ____r189 = unstash(list(_args), _keys)
  __name13 = destash33(name, ____r189)
  ____id78 = ____r189
  __body53 = cut(____id78, 0)
  return join(["define-macro", __name13], __body53)
setenv("mac", macro=__f75)
def __f76(name=None, *_args, **_keys):
  ____r191 = unstash(list(_args), _keys)
  __name15 = destash33(name, ____r191)
  ____id80 = ____r191
  __value1 = cut(____id80, 0)
  return join(["def", __name15], __value1)
setenv("defconst", macro=__f76)
def __f77(name=None):
  ____x475 = object(["target"])
  ____x475["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x475["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x475["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x475
setenv("undefined?", macro=__f77)
def __f78(name=None, *_args, **_keys):
  ____r195 = unstash(list(_args), _keys)
  __name17 = destash33(name, ____r195)
  ____id82 = ____r195
  __value3 = cut(____id82, 0)
  ____x491 = object(["target"])
  ____x491["py"] = ["global", __name17]
  return ["when", ["undefined?", __name17], ____x491, join(["defconst", __name17], __value3)]
setenv("defvar", macro=__f78)
def __f79(*_args, **_keys):
  __args13 = unstash(list(_args), _keys)
  if none63(__args13):
    return 0
  else:
    if one63(__args13):
      return hd(__args13)
    else:
      return join(["%add"], __args13)
setenv("+", macro=__f79)
def __f80(*_args, **_keys):
  __args15 = unstash(list(_args), _keys)
  if none63(__args15):
    return 0
  else:
    if one63(__args15):
      return ["%unm", hd(__args15)]
    else:
      return join(["%sub"], __args15)
setenv("-", macro=__f80)
def __f81(*_args, **_keys):
  __args17 = unstash(list(_args), _keys)
  if none63(__args17):
    return 1
  else:
    if one63(__args17):
      return hd(__args17)
    else:
      return join(["%mul"], __args17)
setenv("*", macro=__f81)
def __f82(*_args, **_keys):
  __args19 = unstash(list(_args), _keys)
  if none63(__args19):
    return 1
  else:
    if one63(__args19):
      return hd(__args19)
    else:
      return join(["%div"], __args19)
setenv("/", macro=__f82)
def __f83(*_args, **_keys):
  __args21 = unstash(list(_args), _keys)
  if none63(__args21):
    return 1
  else:
    if one63(__args21):
      return hd(__args21)
    else:
      return join(["%idiv"], __args21)
setenv("//", macro=__f83)
def __f84(keyword=None, *_args, **_keys):
  ____r197 = unstash(list(_args), _keys)
  __keyword1 = destash33(keyword, ____r197)
  ____id84 = ____r197
  __body55 = cut(____id84, 0)
  ____x507 = object([__keyword1])
  ____x507["async"] = True
  return join(____x507, __body55)
setenv("async", macro=__f84)
def __f85(name=None):
  return ["when-compiling", ["quasiquote", ["do", ["unquote-splicing", ["read-from-file", name]]]]]
setenv("%read-from-file", macro=__f85)
def __f86(name=None):
  return ["getenv", ["quote", name], ["quote", "value"]]
setenv("the", macro=__f86)
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
  L_print(toplevel_repr(v))
  return v
def print_exception(v=None, ex=None):
  traceback.print_exception(*ex)
  return None
def eval_print(form=None):
  def __f87():
    try:
      return [True, compiler.L_eval(form)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id85 = __f87()
  __ok = has(____id85, 0)
  __v31 = has(____id85, 1)
  __ex = has(____id85, 2)
  if not __ok:
    return print_exception(__v31, __ex)
  else:
    if is63(__v31):
      return toplevel_print(__v31)
def rep(s=None):
  __v32 = L_eval(reader.read_string(s))
  if is63(__v32):
    return toplevel_print(__v32)
def repl():
  __o24 = {"buf": ""}
  def rep1(s=None):
    __o24["buf"] = cat(__o24["buf"], s)
    __more = []
    __form6 = reader.read_string(__o24["buf"], __more)
    if not( __form6 == __more):
      eval_print(__form6)
      __o24["buf"] = ""
      system.write("> ")
      return system.flush()
  system.write("> ")
  system.flush()
  while True:
    __s3 = system.read_line()
    if __s3:
      rep1(cat(__s3, "\n"))
    else:
      break
def read_from_file(path=None):
  __s4 = reader.stream(system.read_file(path))
  return reader.read_all(__s4)
def expand_file(path=None):
  __body56 = read_from_file(path)
  return compiler.expand(join(["do"], __body56))
def compile_file(path=None):
  __form7 = expand_file(path)
  return compiler.compile(__form7, stmt=True)
def L_load(path=None):
  __previous = has(setenv("target", toplevel=True), "value")
  __previous_indent = has(setenv("indent-level", toplevel=True), "value")
  setenv("target", toplevel=True)["value"] = "py"
  setenv("indent-level", toplevel=True)["value"] = 0
  __code = compile_file(path)
  setenv("indent-level", toplevel=True)["value"] = __previous_indent
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
def main(args=None):
  __arg = hd(args)
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
      __expr6 = None
      __argv = system.argv
      __i43 = 0
      while __i43 < L_35(__argv):
        __a9 = __argv[__i43]
        if __a9 == "-c" or __a9 == "-o" or __a9 == "-t" or __a9 == "-e":
          if __i43 == edge(__argv):
            L_print(cat("missing argument for ", __a9))
          else:
            __i43 = __i43 + 1
            __val2 = __argv[__i43]
            if __a9 == "-c":
              __input = __val2
            else:
              if __a9 == "-o":
                __output = __val2
              else:
                if __a9 == "-t":
                  __target1 = __val2
                else:
                  if __a9 == "-e":
                    __expr6 = __val2
        else:
          if not( "-" == char(__a9, 0)):
            add(__pre, __a9)
        __i43 = __i43 + 1
      ____x526 = __pre
      ____i44 = 0
      while ____i44 < L_35(____x526):
        __file = ____x526[____i44]
        run_file(__file)
        ____i44 = ____i44 + 1
      if nil63(__input):
        if __expr6:
          return rep(__expr6)
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
  main(system.argv)
