if not( "environment" in globals()):
  global environment
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
  if obj63(l):
    return k in l
  else:
    if array63(l):
      return number63(k) and (k >= 0 and k < len(l))
    else:
      return False

def has(l=None, k=None, L_else=None):
  if has63(l, k):
    return l[k]
  else:
    return L_else

____r7 = None
try:
  from collections.abc import Sequence
  ____r7 = Sequence
except ImportError:
  from collections import Sequence
  ____r7 = Sequence
finally:
  pass
import numpy as np
def array63(x=None):
  return not string63(x) and isinstance(x, tuple([Sequence, np.ndarray]))

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
    ____x3 = x
    ____i = 0
    while ____i < L_35(____x3):
      __v = ____x3[____i]
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
  return nil63(x) or (string63(x) or (number63(x) or boolean63(x)))

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
  __e12 = None
  if nil63(L_from) or L_from < 0:
    __e12 = 0
  else:
    __e12 = L_from
  __L_from = __e12
  __e13 = None
  if nil63(upto) or upto > __n3:
    __e13 = __n3
  else:
    __e13 = upto
  __upto1 = __e13
  return s[__L_from:__upto1]

def dupe(x=None):
  return {}

def cut(x=None, L_from=None, upto=None):
  __l2 = dupe(x)
  __j = 0
  __e14 = None
  if nil63(L_from) or L_from < 0:
    __e14 = 0
  else:
    __e14 = L_from
  __i3 = __e14
  __n4 = L_35(x)
  __e15 = None
  if nil63(upto) or upto > __n4:
    __e15 = __n4
  else:
    __e15 = upto
  __upto2 = __e15
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

def props(x=None):
  __t = {}
  ____o3 = x
  __k3 = None
  for __k3 in indices(____o3):
    __v4 = ____o3[__k3]
    if not number63(__k3):
      __t[__k3] = __v4
  return __t

def values(x=None):
  if array63(x):
    return x
  else:
    __t1 = {}
    ____o4 = x
    __k4 = None
    for __k4 in indices(____o4):
      __v5 = ____o4[__k4]
      if number63(__k4):
        __t1[__k4] = __v5
    return array(__t1)

def edge(x=None):
  return L_35(x) - 1

def inner(x=None):
  return clip(x, 1, edge(x))

def tl(l=None):
  return cut(l, 1)

def char(s=None, n=None):
  __n8 = n or 0
  if __n8 >= 0 and __n8 < len(s):
    return s[__n8]

def code(s=None, n=None):
  __x4 = char(s, n)
  if __x4:
    return ord(__x4)

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
    __n9 = edge(l)
    if __n9 >= 0:
      __r43 = l[__n9]
      del l[__n9]
      return __r43

def last(l=None):
  return has(l, edge(l))

def almost(l=None):
  return cut(l, 0, edge(l))

def reverse(l=None):
  __l11 = props(l)
  __i7 = edge(l)
  while __i7 >= 0:
    add(__l11, l[__i7])
    __i7 = __i7 - 1
  return __l11

def reduce(f=None, x=None, L_else=None):
  if none63(x):
    return L_else
  else:
    if one63(x):
      return hd(x)
    else:
      return f(hd(x), reduce(f, tl(x)))

def join(*_args, **_keys):
  __ls = unstash(_args, _keys)
  __r48 = {}
  ____x5 = __ls
  ____i8 = 0
  while ____i8 < L_35(____x5):
    __l3 = ____x5[____i8]
    if __l3:
      __n10 = L_35(__r48)
      ____o5 = __l3
      __k5 = None
      for __k5 in indices(____o5):
        __v6 = ____o5[__k5]
        if number63(__k5):
          __k5 = __k5 + __n10
        else:
          __l3 = object(__l3)
        __r48[__k5] = __v6
    ____i8 = ____i8 + 1
  return __r48

def find(f=None, t=None):
  ____o6 = t
  ____i10 = None
  for ____i10 in indices(____o6):
    __x6 = ____o6[____i10]
    __y = f(__x6)
    if __y:
      return __y

def first(f=None, l=None):
  ____x7 = l
  ____i11 = 0
  while ____i11 < L_35(____x7):
    __x8 = ____x7[____i11]
    __y1 = f(__x8)
    if __y1:
      return __y1
    ____i11 = ____i11 + 1

def in63(x=None, t=None):
  def __f4(y=None):
    return x == y
  return find(__f4, t)

def pair(l=None):
  __l12 = dupe(l)
  __n13 = L_35(l)
  __i12 = 0
  while __i12 < __n13:
    __a = l[__i12]
    __e16 = None
    if __i12 + 1 < __n13:
      __e16 = l[__i12 + 1]
    __b = __e16
    add(__l12, [__a, __b])
    __i12 = __i12 + 1
    __i12 = __i12 + 1
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
  __t2 = dupe(x)
  ____x10 = x
  ____i13 = 0
  while ____i13 < L_35(____x10):
    __v7 = ____x10[____i13]
    __y2 = f(__v7)
    if is63(__y2):
      add(__t2, __y2)
    ____i13 = ____i13 + 1
  ____o7 = x
  __k6 = None
  for __k6 in indices(____o7):
    __v8 = ____o7[__k6]
    if not number63(__k6):
      __y3 = f(__v8)
      if is63(__y3):
        __t2[__k6] = __y3
  return __t2

def mapcat(f=None, x=None, sep=None):
  __r59 = ""
  __c = ""
  ____x11 = x
  ____i15 = 0
  while ____i15 < L_35(____x11):
    __v9 = ____x11[____i15]
    __e17 = None
    if f:
      __e17 = f(__v9)
    else:
      __e17 = __v9
    __y4 = __e17
    if is63(__y4):
      __r59 = cat(__r59, __c, __y4)
      __c = sep or ""
    ____i15 = ____i15 + 1
  return __r59

def keep(f=None, x=None):
  def __f6(v=None):
    if yes(f(v)):
      return v
  return map(__f6, x)

def props63(t=None):
  ____o8 = t
  __k7 = None
  for __k7 in indices(____o8):
    __v10 = ____o8[__k7]
    if not number63(__k7):
      return True
  return False

def empty63(t=None):
  ____o9 = t
  ____i17 = None
  for ____i17 in indices(____o9):
    __x12 = ____o9[____i17]
    return False
  return True

def stash(args=None):
  if props63(args):
    __p = {}
    ____o10 = args
    __k8 = None
    for __k8 in indices(____o10):
      __v11 = ____o10[__k8]
      if not number63(__k8):
        __p[__k8] = __v11
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
      ____o11 = __l4
      __k9 = None
      for __k9 in indices(____o11):
        __v12 = ____o11[__k9]
        if not( __k9 == "_stash"):
          __args1[__k9] = __v12
      if params:
        ____o12 = params
        __k10 = None
        for __k10 in indices(____o12):
          __v13 = ____o12[__k10]
          __args1[__k10] = __v13
      return __args1
    else:
      if params:
        __args11 = object(args)
        ____o13 = params
        __k11 = None
        for __k11 in indices(____o13):
          __v14 = ____o13[__k11]
          __args11[__k11] = __v14
        return __args11
      else:
        return args

def destash33(l=None, args1=None):
  if obj63(l) and has63(l, "_stash"):
    ____o14 = l
    __k12 = None
    for __k12 in indices(____o14):
      __v15 = ____o14[__k12]
      if not( __k12 == "_stash"):
        args1[__k12] = __v15
  else:
    return l

def search(s=None, pattern=None, start=None):
  __i23 = s.find(pattern, start)
  if __i23 >= 0:
    return __i23

def string_ends63(L_str=None, x=None, pos=None):
  __e18 = None
  if is63(pos):
    __e18 = clip(L_str, pos)
  else:
    __e18 = L_str
  __L_str = __e18
  if L_35(x) > L_35(__L_str):
    return False
  else:
    return x == clip(__L_str, L_35(__L_str) - L_35(x))

def string_starts63(L_str=None, x=None, pos=None):
  __e19 = None
  if is63(pos):
    __e19 = clip(L_str, pos)
  else:
    __e19 = L_str
  __L_str1 = __e19
  if L_35(x) > L_35(__L_str1):
    return False
  else:
    return x == clip(__L_str1, 0, L_35(x))

def split(s=None, sep=None):
  if s == "" or sep == "":
    return []
  else:
    return s.split(sep)

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
  __xs = unstash(_args, _keys)
  def __f7(a=None, b=None):
    return cat2(a, b)
  return reduce(__f7, __xs, "")

def L_43(*_args, **_keys):
  __xs1 = unstash(_args, _keys)
  def __f8(a=None, b=None):
    return a + b
  return reduce(__f8, __xs1, 0)

def L_45(*_args, **_keys):
  __xs2 = unstash(_args, _keys)
  def __f9(b=None, a=None):
    return a - b
  return reduce(__f9, reverse(__xs2), 0)

def L_42(*_args, **_keys):
  __xs3 = unstash(_args, _keys)
  def __f10(a=None, b=None):
    return a * b
  return reduce(__f10, __xs3, 1)

def L_47(*_args, **_keys):
  __xs4 = unstash(_args, _keys)
  def __f11(b=None, a=None):
    return a / b
  return reduce(__f11, reverse(__xs4), 1)

def L_37(*_args, **_keys):
  __xs5 = unstash(_args, _keys)
  def __f12(b=None, a=None):
    return a % b
  return reduce(__f12, reverse(__xs5), 1)

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
  __xs6 = unstash(_args, _keys)
  def __f13(a=None, b=None):
    return a < b
  return pairwise(__f13, __xs6)

def L_62(*_args, **_keys):
  __xs7 = unstash(_args, _keys)
  def __f14(a=None, b=None):
    return a > b
  return pairwise(__f14, __xs7)

def L_61(*_args, **_keys):
  __xs8 = unstash(_args, _keys)
  def __f15(a=None, b=None):
    return a == b
  return pairwise(__f15, __xs8)

def L_6061(*_args, **_keys):
  __xs9 = unstash(_args, _keys)
  def __f16(a=None, b=None):
    return a <= b
  return pairwise(__f16, __xs9)

def L_6261(*_args, **_keys):
  __xs10 = unstash(_args, _keys)
  def __f17(a=None, b=None):
    return a >= b
  return pairwise(__f17, __xs10)

def number_code63(n=None):
  return n > 47 and n < 58

def number(s=None):
  if string63(s):
    ____r87 = None
    try:
      return int(s)
    except ValueError:
      ____r87 = None
    finally:
      pass
    ____r88 = None
    try:
      return float(s)
    except ValueError:
      ____r88 = None
    finally:
      pass
    return ____r88
  else:
    if number63(s):
      return s

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
  if nil63(search(s, "\n")) and (nil63(search(s, "\r")) and (nil63(search(s, "\"")) and nil63(search(s, "\\")))):
    return "".join(["\"", s, "\""])
  else:
    __s1 = "\""
    __i26 = 0
    while __i26 < L_35(s):
      __c1 = char(s, __i26)
      __e20 = None
      if __c1 == "\n":
        __e20 = "\\n"
      else:
        __e21 = None
        if __c1 == "\r":
          __e21 = "\\r"
        else:
          __e22 = None
          if __c1 == "\"":
            __e22 = "\\\""
          else:
            __e23 = None
            if __c1 == "\\":
              __e23 = "\\\\"
            else:
              __e23 = __c1
            __e22 = __e23
          __e21 = __e22
        __e20 = __e21
      __c11 = __e20
      __s1 = cat(__s1, __c11)
      __i26 = __i26 + 1
    return cat(__s1, "\"")

def simple_id63(x=None):
  def __f18():
    try:
      return [True, read_string(x)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id = __f18()
  ____ok = has(____id, 0)
  ____v16 = has(____id, 1)
  __e24 = None
  if ____ok:
    __e24 = ____v16
  else:
    __e24 = None
  __r93 = __e24
  if __r93 == x:
    return __r93

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
            if simple_id63(x):
              return x
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
                        __l5 = stack or []
                        add(__l5, x)
                        ____o15 = x
                        __k13 = None
                        for __k13 in indices(____o15):
                          __v17 = ____o15[__k13]
                          if number63(__k13):
                            __xs11[__k13] = L_str(__v17, repr, __l5)
                          else:
                            if function63(__v17):
                              add(__ks, [cat(".", __k13), ""])
                            else:
                              add(__ks, [cat(__k13, ": "), L_str(__v17, repr, __l5)])
                        def __f19(__x18=None, __x19=None):
                          ____id1 = __x18
                          __a2 = has(____id1, 0)
                          ____id2 = __x19
                          __b2 = has(____id2, 0)
                          return __a2 < __b2
                        sort(__ks, __f19)
                        drop(__l5)
                        ____x20 = __xs11
                        ____i28 = 0
                        while ____i28 < L_35(____x20):
                          __v18 = ____x20[____i28]
                          __s = cat(__s, __sp, __v18)
                          __sp = " "
                          ____i28 = ____i28 + 1
                        ____x21 = __ks
                        ____i29 = 0
                        while ____i29 < L_35(____x21):
                          ____id3 = ____x21[____i29]
                          __k14 = has(____id3, 0)
                          __v19 = has(____id3, 1)
                          __s = cat(__s, __sp, __k14, __v19)
                          __sp = " "
                          ____i29 = ____i29 + 1
                        return cat(__s, ")")

def apply(f=None, args=None):
  __args2 = stash(args)
  return f(*__args2)

def call(f=None, *_args, **_keys):
  ____r97 = unstash(_args, _keys)
  __f1 = destash33(f, ____r97)
  ____id4 = ____r97
  __args3 = cut(____id4, 0)
  return apply(__f1, __args3)

def setenv(k=None, *_args, **_keys):
  ____r98 = unstash(_args, _keys)
  __k15 = destash33(k, ____r98)
  ____id5 = ____r98
  __keys = cut(____id5, 0)
  if string63(__k15):
    __e25 = None
    if has63(__keys, "toplevel"):
      __e25 = hd(environment)
    else:
      __e25 = last(environment)
    __frame = __e25
    __e26 = None
    if has63(__frame, __k15):
      __e26 = __frame[__k15]
    else:
      __e26 = {}
    __entry = __e26
    ____o16 = __keys
    __k16 = None
    for __k16 in indices(____o16):
      __v20 = ____o16[__k16]
      if not( __k16 == "toplevel"):
        __entry[__k16] = __v20
    __frame[__k15] = __entry
    return __frame[__k15]

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
from .runtime import *
from .compiler import *
def __quote__macro(form=None):
  return quoted(form)

setenv("quote", macro=__quote__macro)
def __quasiquote__macro(form=None):
  return quasiexpand(form, 1)

setenv("quasiquote", macro=__quasiquote__macro)
def __set__macro(*_args, **_keys):
  __args5 = unstash(_args, _keys)
  def __f20(__x31=None):
    ____id7 = __x31
    __lh1 = has(____id7, 0)
    __rh1 = has(____id7, 1)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has":
      return ["%set", join(["%get"], tl(__lh1)), __rh1]
    else:
      return ["%set", __lh1, __rh1]
  return join(["%do"], map(__f20, pair(__args5)))

setenv("set", macro=__set__macro)
def __at__macro(l=None, i=None):
  if has(setenv("target", toplevel=True), "value") == "lua" and number63(i):
    i = i + 1
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      i = ["+", i, 1]
  return ["%get", l, i]

setenv("at", macro=__at__macro)
def __wipe__macro(place=None):
  if has(setenv("target", toplevel=True), "value") == "lua":
    return ["set", place, "nil"]
  else:
    return ["%delete", place]

setenv("wipe", macro=__wipe__macro)
def __list__macro(*_args, **_keys):
  __body2 = unstash(_args, _keys)
  if one63(__body2) and (hd63(__body2, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_args"
  else:
    if L_35(__body2) > 2 and (__body2[1] == "for" and __body2[3] == "in"):
      ____id11 = __body2
      __expr2 = has(____id11, 0)
      __body3 = cut(____id11, 1)
      __comps1 = []
      __cond1 = None
      while L_35(__body3) > 2 and (__body3[0] == "for" and __body3[2] == "in"):
        ____id12 = __body3
        ___for1 = has(____id12, 0)
        __names1 = has(____id12, 1)
        ___in1 = has(____id12, 2)
        __l8 = has(____id12, 3)
        __body12 = cut(____id12, 4)
        add(__comps1, [__names1, __l8])
        __body3 = __body12
      if hd(__body3) == "if":
        ____id13 = __body3
        ___if1 = has(____id13, 0)
        __expr3 = has(____id13, 1)
        __cond1 = __expr3
      return ["%list", __expr2, __comps1, __cond1]
    else:
      __x57 = unique("x")
      __l9 = {}
      __forms1 = []
      ____o18 = __body2
      __k19 = None
      for __k19 in indices(____o18):
        __v22 = ____o18[__k19]
        if number63(__k19):
          __l9[__k19] = __v22
        else:
          add(__forms1, ["%set", ["%get", __x57, ["quote", __k19]], __v22])
      if some63(__forms1):
        return join(["let", __x57, ["object", join(["%array"], __l9)]], __forms1, [__x57])
      else:
        return join(["%array"], __l9)

setenv("list", macro=__list__macro)
def __if__macro(*_args, **_keys):
  __branches1 = unstash(_args, _keys)
  return hd(expand_if(__branches1))

setenv("if", macro=__if__macro)
def __case__macro(expr=None, *_args, **_keys):
  ____r113 = unstash(_args, _keys)
  __expr5 = destash33(expr, ____r113)
  ____id16 = ____r113
  __e27 = None
  if nil63(has(____id16, "cmp")):
    __e27 = "="
  else:
    __e27 = has(____id16, "cmp")
  __cmp1 = __e27
  __clauses1 = cut(____id16, 0)
  __x79 = unique("x")
  def __f21(_=None):
    return [__cmp1, _, __x79]
  __eq1 = __f21
  def __f22(__x81=None):
    ____id17 = __x81
    __a4 = has(____id17, 0)
    __b4 = has(____id17, 1)
    if nil63(__b4):
      return [__a4]
    else:
      if string63(__a4) or number63(__a4):
        return [__eq1(__a4), __b4]
      else:
        if list63(__a4) and hd63(__a4, "quote"):
          return [__eq1(__a4), __b4]
        else:
          if one63(__a4):
            return [__eq1(hd(__a4)), __b4]
          else:
            if L_35(__a4) > 1:
              return [join(["or"], map(__eq1, __a4)), __b4]
  __cl1 = __f22
  return ["let", __x79, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]

setenv("case", macro=__case__macro)
def __of__macro(x=None, *_args, **_keys):
  ____r117 = unstash(_args, _keys)
  __x93 = destash33(x, ____r117)
  ____id19 = ____r117
  __values1 = cut(____id19, 0)
  return join(["case", __x93, __values1, True, False], props(__values1))

setenv("of", macro=__of__macro)
def __when__macro(cond=None, *_args, **_keys):
  ____r119 = unstash(_args, _keys)
  __cond3 = destash33(cond, ____r119)
  ____id21 = ____r119
  __body5 = cut(____id21, 0)
  return ["%if", __cond3, join(["%do"], __body5)]

setenv("when", macro=__when__macro)
def __unless__macro(cond=None, *_args, **_keys):
  ____r121 = unstash(_args, _keys)
  __cond5 = destash33(cond, ____r121)
  ____id23 = ____r121
  __body7 = cut(____id23, 0)
  return ["%if", ["%not", __cond5], join(["%do"], __body7)]

setenv("unless", macro=__unless__macro)
def __obj__macro(*_args, **_keys):
  __body10 = unstash(_args, _keys)
  if one63(__body10) and (hd63(__body10, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_keys"
  else:
    if L_35(__body10) > 2 and (__body10[1] == "for" and __body10[3] == "in"):
      ____id27 = __body10
      __expr8 = has(____id27, 0)
      __body111 = cut(____id27, 1)
      __comps3 = []
      __cond7 = None
      while L_35(__body111) > 2 and (__body111[0] == "for" and __body111[2] == "in"):
        ____id28 = __body111
        ___for3 = has(____id28, 0)
        __names3 = has(____id28, 1)
        ___in3 = has(____id28, 2)
        __l111 = has(____id28, 3)
        __body14 = cut(____id28, 4)
        add(__comps3, [__names3, __l111])
        __body111 = __body14
      if hd(__body111) == "if":
        ____id29 = __body111
        ___if3 = has(____id29, 0)
        __expr9 = has(____id29, 1)
        __cond7 = __expr9
      if list63(__expr8) and hd63(__expr8, ","):
        __expr8 = join([":"], tl(__expr8))
      ____x114 = object(["%list", __expr8, __comps3, __cond7])
      ____x114["kind"] = "object"
      return ____x114
    else:
      def __f23(x=None):
        return x
      return join(["%object"], mapo(__f23, __body10))

setenv("obj", macro=__obj__macro)
def __let__macro(bs=None, *_args, **_keys):
  ____r125 = unstash(_args, _keys)
  __bs11 = destash33(bs, ____r125)
  ____id34 = ____r125
  __body131 = cut(____id34, 0)
  if atom63(__bs11) or hd63(__bs11, ","):
    return join(["let", [__bs11, hd(__body131)]], tl(__body131))
  else:
    if none63(__bs11):
      return join(["%do"], __body131)
    else:
      ____id35 = __bs11
      __lh3 = has(____id35, 0)
      __rh3 = has(____id35, 1)
      __bs21 = cut(____id35, 2)
      ____id36 = bind(__lh3, __rh3)
      __id37 = has(____id36, 0)
      __val1 = has(____id36, 1)
      __bs12 = cut(____id36, 2)
      __renames1 = []
      if not id_literal63(__id37):
        __id121 = unique(__id37)
        __renames1 = [__id37, __id121]
        __id37 = __id121
      return ["%do", ["%local", __id37, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body131)]]

setenv("let", macro=__let__macro)
def __with__macro(x=None, v=None, *_args, **_keys):
  ____r127 = unstash(_args, _keys)
  __x141 = destash33(x, ____r127)
  __v24 = destash33(v, ____r127)
  ____id39 = ____r127
  __body15 = cut(____id39, 0)
  if __v24 == "as":
    return join(["%with", ["%as", __x141, hd(__body15)]], tl(__body15))
  else:
    if not atom63(__x141) or has(__body15, "async"):
      return join(["%with", __x141, __v24], __body15)
    else:
      return join(["let", [__x141, __v24]], __body15, [__x141])

setenv("with", macro=__with__macro)
def __let_when__macro(x=None, v=None, *_args, **_keys):
  ____r129 = unstash(_args, _keys)
  __x155 = destash33(x, ____r129)
  __v26 = destash33(v, ____r129)
  ____id41 = ____r129
  __body17 = cut(____id41, 0)
  __y6 = unique("y")
  return ["let", __y6, __v26, ["when", ["yes", __y6], join(["let", [__x155, __y6]], __body17)]]

setenv("let-when", macro=__let_when__macro)
def __define_macro__macro(name=None, args=None, *_args, **_keys):
  ____r131 = unstash(_args, _keys)
  __name1 = destash33(name, ____r131)
  __args7 = destash33(args, ____r131)
  ____id44 = ____r131
  __body19 = cut(____id44, 0)
  __id45 = unique(cat(__name1, "--macro"))
  ____x168 = object(["setenv", ["quote", __name1]])
  ____x168["macro"] = __id45
  __form1 = ["do", join(["define", __id45, __args7], __body19), ____x168]
  eval(__form1)
  return __form1

setenv("define-macro", macro=__define_macro__macro)
def __define_special__macro(name=None, args=None, *_args, **_keys):
  ____r133 = unstash(_args, _keys)
  __name3 = destash33(name, ____r133)
  __args9 = destash33(args, ____r133)
  ____id48 = ____r133
  __body21 = cut(____id48, 0)
  __id49 = unique(cat(__name3, "--special"))
  ____x177 = object(["setenv", ["quote", __name3]])
  ____x177["special"] = __id49
  __form3 = ["do", join(["define", __id49, __args9], __body21), join(____x177, props(__body21))]
  eval(__form3)
  return __form3

setenv("define-special", macro=__define_special__macro)
def __define_symbol__macro(name=None, expansion=None):
  setenv(name, symbol=expansion)
  ____x182 = object(["setenv", ["quote", name]])
  ____x182["symbol"] = ["quote", expansion]
  return ____x182

setenv("define-symbol", macro=__define_symbol__macro)
def __define_reader__macro(__x191=None, *_args, **_keys):
  ____r137 = unstash(_args, _keys)
  ____x191 = destash33(__x191, ____r137)
  ____id52 = ____x191
  __char1 = has(____id52, 0)
  __s2 = has(____id52, 1)
  ____id53 = ____r137
  __body23 = cut(____id53, 0)
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body23)]

setenv("define-reader", macro=__define_reader__macro)
def __define__macro(name=None, x=None, *_args, **_keys):
  ____r139 = unstash(_args, _keys)
  __name5 = destash33(name, ____r139)
  __x200 = destash33(x, ____r139)
  ____id55 = ____r139
  __body25 = cut(____id55, 0)
  setenv(__name5, variable=True)
  if some63(__body25):
    return join(["%local-function", __name5], bind42(__x200, __body25), props(__body25))
  else:
    return join(["%local", __name5, __x200], props(__body25))

setenv("define", macro=__define__macro)
def __define_global__macro(name=None, x=None, *_args, **_keys):
  ____r141 = unstash(_args, _keys)
  __name7 = destash33(name, ____r141)
  __x207 = destash33(x, ____r141)
  ____id57 = ____r141
  __body27 = cut(____id57, 0)
  setenv(__name7, toplevel=True, variable=True)
  if some63(__body27):
    return join(["%global-function", __name7], bind42(__x207, __body27), props(__body27))
  else:
    return join(["set", __name7, __x207], props(__body27))

setenv("define-global", macro=__define_global__macro)
def __get_value__macro(x=None):
  ____x214 = object(["setenv", x])
  ____x214["toplevel"] = True
  return ["has", ____x214, ["quote", "value"]]

setenv("get-value", macro=__get_value__macro)
def __define_constant__macro(name=None, x=None):
  ____x225 = object(["setenv", ["quote", name]])
  ____x225["toplevel"] = True
  ____x225["value"] = either(x, ["get-value", ["quote", name]])
  return ["%do", ____x225, ["define-symbol", name, ["get-value", ["quote", name]]]]

setenv("define-constant", macro=__define_constant__macro)
def __define_variable__macro(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]

setenv("define-variable", macro=__define_variable__macro)
def __after__macro(x=None, *_args, **_keys):
  ____r150 = unstash(_args, _keys)
  __x254 = destash33(x, ____r150)
  ____id59 = ____r150
  __body29 = cut(____id59, 0)
  __ok2 = unique("ok")
  __r151 = unique("r")
  ____x255 = object(["target", ["try", __x254, join(["finally"], __body29)]])
  ____x255["lua"] = join(["let", [[__ok2, __r151], ["guard", __x254]]], __body29, [["if", __ok2, __r151, ["throw", __r151]]])
  return ____x255

setenv("after", macro=__after__macro)
def __with_frame__macro(*_args, **_keys):
  __body31 = unstash(_args, _keys)
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body31), ["drop", "environment"]]]

setenv("with-frame", macro=__with_frame__macro)
def __with_values__macro(*_args, **_keys):
  __body33 = unstash(_args, _keys)
  __forms3 = []
  ____o20 = __body33
  __k22 = None
  for __k22 in indices(____o20):
    __v28 = ____o20[__k22]
    if not number63(__k22):
      ____x283 = object(["setenv", ["quote", __k22]])
      ____x283["value"] = __v28
      add(__forms3, ____x283)
  return join(["with-frame"], __forms3)

setenv("with-values", macro=__with_values__macro)
def __with_bindings__macro(__x291=None, *_args, **_keys):
  ____r153 = unstash(_args, _keys)
  ____x291 = destash33(__x291, ____r153)
  ____id62 = ____x291
  __names5 = has(____id62, 0)
  ____id63 = ____r153
  __body35 = cut(____id63, 0)
  __x292 = unique("x")
  ____x295 = object(["setenv", __x292])
  ____x295["variable"] = True
  return join(["with-frame", ["each", __x292, __names5, ____x295]], __body35)

setenv("with-bindings", macro=__with_bindings__macro)
def __let_macro__macro(definitions=None, *_args, **_keys):
  ____r158 = unstash(_args, _keys)
  __definitions1 = destash33(definitions, ____r158)
  ____id65 = ____r158
  __body37 = cut(____id65, 0)
  add(environment, {})
  ____r160 = None
  try:
    def __f24(m=None):
      return macroexpand(join(["define-macro"], m))
    map(__f24, __definitions1)
    ____r160 = join(["%do"], macroexpand(__body37))
  finally:
    drop(environment)
  return ____r160

setenv("let-macro", macro=__let_macro__macro)
def __let_symbol__macro(expansions=None, *_args, **_keys):
  ____r166 = unstash(_args, _keys)
  __expansions1 = destash33(expansions, ____r166)
  ____id68 = ____r166
  __body39 = cut(____id68, 0)
  add(environment, {})
  ____r168 = None
  try:
    def __f25(__x305=None):
      ____id69 = __x305
      __name9 = has(____id69, 0)
      __exp1 = has(____id69, 1)
      return macroexpand(["define-symbol", __name9, __exp1])
    map(__f25, pair(__expansions1))
    ____r168 = join(["%do"], macroexpand(__body39))
  finally:
    drop(environment)
  return ____r168

setenv("let-symbol", macro=__let_symbol__macro)
def __let_unique__macro(names=None, *_args, **_keys):
  ____r172 = unstash(_args, _keys)
  __names7 = destash33(names, ____r172)
  ____id71 = ____r172
  __body41 = cut(____id71, 0)
  def __f26(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f26, __names7)
  return join(["let", apply(join, __bs3)], __body41)

setenv("let-unique", macro=__let_unique__macro)
def __fn__macro(args=None, *_args, **_keys):
  ____r175 = unstash(_args, _keys)
  __args111 = destash33(args, ____r175)
  ____id73 = ____r175
  __body43 = cut(____id73, 0)
  return join(["%function"], bind42(__args111, __body43), props(__body43))

setenv("fn", macro=__fn__macro)
def __apply__macro(f=None, *_args, **_keys):
  ____r177 = unstash(_args, _keys)
  __f3 = destash33(f, ____r177)
  ____id75 = ____r177
  __args13 = cut(____id75, 0)
  if L_35(__args13) > 1:
    return ["%call", "apply", __f3, ["join", join(["list"], almost(__args13)), last(__args13), join(["list"], props(__args13))]]
  else:
    if props63(__args13):
      return ["%call", "apply", __f3, join(["join"], __args13, [join(["list"], props(__args13))])]
    else:
      return join(["%call", "apply", __f3], __args13)

setenv("apply", macro=__apply__macro)
def __guard__macro(expr=None):
  ____x369 = object(["target", [["%function", join(), ["%try", ["list", True, expr]]]]])
  ____x381 = object(["obj"])
  ____x381["stack"] = [["idx", "debug", "traceback"]]
  ____x381["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
  ____x369["lua"] = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x381]]]]
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x369]

setenv("guard", macro=__guard__macro)
def __each__macro(x=None, t=None, *_args, **_keys):
  ____r181 = unstash(_args, _keys)
  __x409 = destash33(x, ____r181)
  __t4 = destash33(t, ____r181)
  ____id78 = ____r181
  __body45 = cut(____id78, 0)
  __o22 = unique("o")
  __n30 = unique("n")
  __i36 = unique("i")
  __e28 = None
  if atom63(__x409):
    __e28 = [__i36, __x409]
  else:
    __e29 = None
    if L_35(__x409) > 1:
      __e29 = __x409
    else:
      __e29 = [__i36, hd(__x409)]
    __e28 = __e29
  ____id79 = __e28
  __k24 = has(____id79, 0)
  __v30 = has(____id79, 1)
  ____x415 = object(["target", __o22])
  ____x415["py"] = ["indices", __o22]
  __e30 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e30 = __body45
  else:
    __e30 = [join(["let", __k24, ["if", ["numeric?", __k24], ["parseInt", __k24], __k24]], __body45)]
  return ["let", [__o22, __t4, __k24, "nil"], join(["%for", ____x415, __k24], props(__body45), [join(["let", [__v30, ["%get", __o22, __k24]]], __e30)])]

setenv("each", macro=__each__macro)
def __for__macro(i=None, to=None, *_args, **_keys):
  ____r183 = unstash(_args, _keys)
  __i38 = destash33(i, ____r183)
  __to1 = destash33(to, ____r183)
  ____id81 = ____r183
  __body47 = cut(____id81, 0)
  if __to1 == "in":
    return join(["%for", hd(__body47), __i38, join(["%do"], tl(__body47))], props(__body47))
  else:
    return ["let", __i38, 0, join(["while", ["<", __i38, __to1]], __body47, [["inc", __i38]])]

setenv("for", macro=__for__macro)
def __step__macro(v=None, t=None, *_args, **_keys):
  ____r185 = unstash(_args, _keys)
  __v32 = destash33(v, ____r185)
  __t6 = destash33(t, ____r185)
  ____id83 = ____r185
  __body49 = cut(____id83, 0)
  __x450 = unique("x")
  __i40 = unique("i")
  return ["let", [__x450, __t6], ["for", __i40, ["#", __x450], join(["let", [__v32, ["at", __x450, __i40]]], __body49)]]

setenv("step", macro=__step__macro)
def __set_of__macro(*_args, **_keys):
  __xs13 = unstash(_args, _keys)
  __l13 = {}
  ____o24 = __xs13
  ____i42 = None
  for ____i42 in indices(____o24):
    __x461 = ____o24[____i42]
    __l13[__x461] = True
  return join(["obj"], __l13)

setenv("set-of", macro=__set_of__macro)
def __target63__macro(x=None):
  return ["=", "target", x]

setenv("target?", macro=__target63__macro)
def __target__macro(*_args, **_keys):
  __clauses3 = unstash(_args, _keys)
  if has63(__clauses3, has(setenv("target", toplevel=True), "value")):
    return __clauses3[has(setenv("target", toplevel=True), "value")]
  else:
    return hd(__clauses3)

setenv("target", macro=__target__macro)
def __language__macro():
  return ["quote", has(setenv("target", toplevel=True), "value")]

setenv("language", macro=__language__macro)
def __join33__macro(a=None, *_args, **_keys):
  ____r191 = unstash(_args, _keys)
  __a6 = destash33(a, ____r191)
  ____id85 = ____r191
  __bs5 = cut(____id85, 0)
  return ["set", __a6, join(["join", __a6], __bs5)]

setenv("join!", macro=__join33__macro)
def __cat33__macro(a=None, *_args, **_keys):
  ____r193 = unstash(_args, _keys)
  __a8 = destash33(a, ____r193)
  ____id87 = ____r193
  __bs7 = cut(____id87, 0)
  return ["set", __a8, join(["cat", __a8], __bs7)]

setenv("cat!", macro=__cat33__macro)
def __inc__macro(n=None, by=None):
  __e31 = None
  if nil63(by):
    __e31 = 1
  else:
    __e31 = by
  return ["set", n, ["+", n, __e31]]

setenv("inc", macro=__inc__macro)
def __dec__macro(n=None, by=None):
  __e32 = None
  if nil63(by):
    __e32 = 1
  else:
    __e32 = by
  return ["set", n, ["-", n, __e32]]

setenv("dec", macro=__dec__macro)
def __with_indent__macro(form=None):
  __x491 = unique("x")
  return ["%do", ["inc", "indent-level"], ["with", __x491, form, ["dec", "indent-level"]]]

setenv("with-indent", macro=__with_indent__macro)
def __export__macro(*_args, **_keys):
  __names9 = unstash(_args, _keys)
  def __f27(k=None):
    if k == compile(k):
      return ["%set", ["idx", "exports", k], k]
    else:
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]]
  __forms5 = map(__f27, __names9)
  if has(setenv("target", toplevel=True), "value") == "js":
    return join(["%do"], __forms5)
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]])

setenv("export", macro=__export__macro)
def __when_compiling__macro(*_args, **_keys):
  __body51 = unstash(_args, _keys)
  return eval(join(["%do"], __body51))

setenv("when-compiling", macro=__when_compiling__macro)
def __during_compilation__macro(*_args, **_keys):
  __body53 = unstash(_args, _keys)
  __form5 = join(["%do"], __body53)
  eval(__form5)
  return __form5

setenv("during-compilation", macro=__during_compilation__macro)
def __def__macro(name=None, *_args, **_keys):
  ____r203 = unstash(_args, _keys)
  __name11 = destash33(name, ____r203)
  ____id89 = ____r203
  __body55 = cut(____id89, 0)
  return join(["define-global", __name11], __body55)

setenv("def", macro=__def__macro)
def __mac__macro(name=None, *_args, **_keys):
  ____r205 = unstash(_args, _keys)
  __name13 = destash33(name, ____r205)
  ____id91 = ____r205
  __body57 = cut(____id91, 0)
  return join(["define-macro", __name13], __body57)

setenv("mac", macro=__mac__macro)
def __defconst__macro(name=None, *_args, **_keys):
  ____r207 = unstash(_args, _keys)
  __name15 = destash33(name, ____r207)
  ____id93 = ____r207
  __value1 = cut(____id93, 0)
  return join(["def", __name15], __value1)

setenv("defconst", macro=__defconst__macro)
def __undefined63__macro(name=None):
  ____x549 = object(["target"])
  ____x549["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x549["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x549["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x549

setenv("undefined?", macro=__undefined63__macro)
def __defvar__macro(name=None, *_args, **_keys):
  ____r211 = unstash(_args, _keys)
  __name17 = destash33(name, ____r211)
  ____id95 = ____r211
  __value3 = cut(____id95, 0)
  ____x566 = object(["target"])
  ____x566["py"] = ["global", __name17]
  return ["when", ["undefined?", __name17], ____x566, join(["defconst", __name17], __value3)]

setenv("defvar", macro=__defvar__macro)
def __async__macro(keyword=None, *_args, **_keys):
  ____r213 = unstash(_args, _keys)
  __keyword1 = destash33(keyword, ____r213)
  ____id97 = ____r213
  __body59 = cut(____id97, 0)
  ____x571 = object([__keyword1])
  ____x571["async"] = True
  return join(____x571, __body59)

setenv("async", macro=__async__macro)
def __L_37read_from_file__macro(name=None):
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]]

setenv("%read-from-file", macro=__L_37read_from_file__macro)
def __the__macro(name=None):
  return ["getenv", ["quote", name], ["quote", "value"]]

setenv("the", macro=__the__macro)
def __cat__macro(a=None, *_args, **_keys):
  ____r219 = unstash(_args, _keys)
  __a10 = destash33(a, ____r219)
  ____id99 = ____r219
  __bs9 = cut(____id99, 0)
  if nil63(__a10):
    return ""
  else:
    if none63(__bs9):
      return __a10
    else:
      if one63(__bs9):
        ____x596 = object(["target", join(["%cat", __a10], __bs9)])
        ____x596["py"] = join(["%call", "cat", __a10], __bs9)
        return ____x596
      else:
        ____x599 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]])
        ____x599["py"] = join(["%call", "cat", __a10], __bs9)
        return ____x599

setenv("cat", macro=__cat__macro)
def __L_43__macro(*_args, **_keys):
  __args15 = unstash(_args, _keys)
  if none63(__args15):
    return 0
  else:
    if one63(__args15):
      return hd(__args15)
    else:
      return join(["%add"], __args15)

setenv("+", macro=__L_43__macro)
def __L___macro(*_args, **_keys):
  __args17 = unstash(_args, _keys)
  if none63(__args17):
    return 0
  else:
    if one63(__args17):
      return ["%unm", hd(__args17)]
    else:
      return join(["%sub"], __args17)

setenv("-", macro=__L___macro)
def __L_42__macro(*_args, **_keys):
  __args19 = unstash(_args, _keys)
  if none63(__args19):
    return 1
  else:
    if one63(__args19):
      return hd(__args19)
    else:
      return join(["%mul"], __args19)

setenv("*", macro=__L_42__macro)
def __L_47__macro(*_args, **_keys):
  __args21 = unstash(_args, _keys)
  if none63(__args21):
    return 1
  else:
    if one63(__args21):
      return hd(__args21)
    else:
      return join(["%div"], __args21)

setenv("/", macro=__L_47__macro)
def __L_4747__macro(*_args, **_keys):
  __args23 = unstash(_args, _keys)
  if none63(__args23):
    return 1
  else:
    if one63(__args23):
      return hd(__args23)
    else:
      return join(["%idiv"], __args23)

setenv("//", macro=__L_4747__macro)
def __L_37__macro(*_args, **_keys):
  __args25 = unstash(_args, _keys)
  if none63(__args25):
    return 0
  else:
    if one63(__args25):
      return hd(__args25)
    else:
      return join(["%mod"], __args25)

setenv("%", macro=__L_37__macro)
def __L_60__macro(a=None, *_args, **_keys):
  ____r221 = unstash(_args, _keys)
  __a12 = destash33(a, ____r221)
  ____id101 = ____r221
  __bs111 = cut(____id101, 0)
  if none63(__bs111):
    return True
  else:
    if one63(__bs111):
      return join(["%lt", __a12], __bs111)
    else:
      return ["%and", ["%lt", __a12, hd(__bs111)], join(["<"], __bs111)]

setenv("<", macro=__L_60__macro)
def __L_6061__macro(a=None, *_args, **_keys):
  ____r223 = unstash(_args, _keys)
  __a14 = destash33(a, ____r223)
  ____id103 = ____r223
  __bs13 = cut(____id103, 0)
  if none63(__bs13):
    return True
  else:
    if one63(__bs13):
      return join(["%le", __a14], __bs13)
    else:
      return ["%and", ["%le", __a14, hd(__bs13)], join(["<="], __bs13)]

setenv("<=", macro=__L_6061__macro)
def __L_61__macro(a=None, *_args, **_keys):
  ____r225 = unstash(_args, _keys)
  __a16 = destash33(a, ____r225)
  ____id105 = ____r225
  __bs15 = cut(____id105, 0)
  if none63(__bs15):
    return True
  else:
    if one63(__bs15):
      return join(["%eq", __a16], __bs15)
    else:
      return ["%and", ["%eq", __a16, hd(__bs15)], join(["="], __bs15)]

setenv("=", macro=__L_61__macro)
def __L_6261__macro(a=None, *_args, **_keys):
  ____r227 = unstash(_args, _keys)
  __a18 = destash33(a, ____r227)
  ____id107 = ____r227
  __bs17 = cut(____id107, 0)
  if none63(__bs17):
    return True
  else:
    if one63(__bs17):
      return join(["%ge", __a18], __bs17)
    else:
      return ["%and", ["%ge", __a18, hd(__bs17)], join([">="], __bs17)]

setenv(">=", macro=__L_6261__macro)
def __L_62__macro(a=None, *_args, **_keys):
  ____r229 = unstash(_args, _keys)
  __a20 = destash33(a, ____r229)
  ____id109 = ____r229
  __bs19 = cut(____id109, 0)
  if none63(__bs19):
    return True
  else:
    if one63(__bs19):
      return join(["%gt", __a20], __bs19)
    else:
      return ["%and", ["%gt", __a20, hd(__bs19)], join([">"], __bs19)]

setenv(">", macro=__L_62__macro)
def __not__macro(*_args, **_keys):
  __args27 = unstash(_args, _keys)
  if none63(__args27):
    return False
  else:
    if one63(__args27):
      return join(["%not"], __args27)
    else:
      return ["%and", ["%not", hd(__args27)], join(["not"], tl(__args27))]

setenv("not", macro=__not__macro)
def __and__macro(a=None, *_args, **_keys):
  ____r231 = unstash(_args, _keys)
  __a22 = destash33(a, ____r231)
  ____id1111 = ____r231
  __bs211 = cut(____id1111, 0)
  if nil63(__a22):
    return True
  else:
    if none63(__bs211):
      return __a22
    else:
      if one63(__bs211):
        return join(["%and", __a22], __bs211)
      else:
        return ["%and", __a22, join(["and"], __bs211)]

setenv("and", macro=__and__macro)
def __or__macro(a=None, *_args, **_keys):
  ____r233 = unstash(_args, _keys)
  __a24 = destash33(a, ____r233)
  ____id113 = ____r233
  __bs23 = cut(____id113, 0)
  if nil63(__a24):
    return False
  else:
    if none63(__bs23):
      return __a24
    else:
      if one63(__bs23):
        return join(["%or", __a24], __bs23)
      else:
        return ["%or", __a24, join(["or"], __bs23)]

setenv("or", macro=__or__macro)
def __break__macro(*_args, **_keys):
  __args29 = unstash(_args, _keys)
  return join(["%break"], __args29)

setenv("break", macro=__break__macro)
def __return__macro(*_args, **_keys):
  __args31 = unstash(_args, _keys)
  return join(["%return"], __args31)

setenv("return", macro=__return__macro)
def __while__macro(c=None, *_args, **_keys):
  ____r235 = unstash(_args, _keys)
  __c3 = destash33(c, ____r235)
  ____id115 = ____r235
  __body61 = cut(____id115, 0)
  return join(["%while", __c3], __body61)

setenv("while", macro=__while__macro)
def __do__macro(*_args, **_keys):
  __body63 = unstash(_args, _keys)
  return join(["%do"], __body63)

setenv("do", macro=__do__macro)
def __get__macro(*_args, **_keys):
  __args33 = unstash(_args, _keys)
  return join(["%get"], __args33)

setenv("get", macro=__get__macro)
def __idx__macro(*_args, **_keys):
  __args35 = unstash(_args, _keys)
  return join(["%idx"], __args35)

setenv("idx", macro=__idx__macro)
def __new__macro(*_args, **_keys):
  __args37 = unstash(_args, _keys)
  return join(["%new"], __args37)

setenv("new", macro=__new__macro)
def __typeof__macro(*_args, **_keys):
  __args39 = unstash(_args, _keys)
  return join(["%typeof"], __args39)

setenv("typeof", macro=__typeof__macro)
def __error__macro(*_args, **_keys):
  __args41 = unstash(_args, _keys)
  return join(["%error"], __args41)

setenv("error", macro=__error__macro)
def __throw__macro(*_args, **_keys):
  __args43 = unstash(_args, _keys)
  return join(["%throw"], __args43)

setenv("throw", macro=__throw__macro)
def __raise__macro(*_args, **_keys):
  __args45 = unstash(_args, _keys)
  return join(["%throw"], __args45)

setenv("raise", macro=__raise__macro)
def __is__macro(*_args, **_keys):
  __args47 = unstash(_args, _keys)
  ____x728 = object(["target", join(["="], __args47)])
  ____x728["py"] = join(["%is"], __args47)
  return ____x728

setenv("is", macro=__is__macro)
def __in__macro(*_args, **_keys):
  __args49 = unstash(_args, _keys)
  return join(["%in"], __args49)

setenv("in", macro=__in__macro)
def __as__macro(*_args, **_keys):
  __args51 = unstash(_args, _keys)
  return join(["%as"], __args51)

setenv("as", macro=__as__macro)
def __L_37expand_case__macro(x=None, *_args, **_keys):
  ____r237 = unstash(_args, _keys)
  __x743 = destash33(x, ____r237)
  ____id118 = ____r237
  __body65 = cut(____id118, 0)
  __e33 = None
  if atom63(__x743):
    __e33 = [__x743]
  else:
    __e33 = __x743
  ____id119 = __e33
  __a26 = has(____id119, 0)
  __bs25 = cut(____id119, 1)
  __e34 = None
  if none63(__bs25):
    __e34 = [["%literal"]]
  else:
    __e34 = __bs25
  return join(["%block", __a26], __e34, __body65)

setenv("%expand-case", macro=__L_37expand_case__macro)
def __L_37cases__macro(*_args, **_keys):
  __args53 = unstash(_args, _keys)
  if none63(__args53):
    return ["do"]
  else:
    if one63(__args53):
      return join(["%expand-case"], hd(__args53))
    else:
      __r240 = unique("r")
      def __f28(__x762=None):
        ____id1211 = __x762
        __x763 = has(____id1211, 0)
        __body67 = cut(____id1211, 1)
        return ["%expand-case", __x763, ["%set", __r240, join(["%do"], __body67)]]
      return join(["with", __r240, "nil"], map(__f28, almost(__args53)), [join(["%expand-case"], last(__args53))])

setenv("%cases", macro=__L_37cases__macro)
def __try__macro(x=None, *_args, **_keys):
  ____r243 = unstash(_args, _keys)
  __x783 = destash33(x, ____r243)
  ____id126 = ____r243
  __cases1 = cut(____id126, 0)
  __fin1 = ["finally"]
  ____o26 = __cases1
  ____i45 = None
  for ____i45 in indices(____o26):
    __x785 = ____o26[____i45]
    if hd63(__x785, "finally"):
      __fin1 = __x785
  __forms7 = []
  ____x788 = __cases1
  ____i46 = 0
  while ____i46 < L_35(____x788):
    ____id127 = ____x788[____i46]
    __x789 = has(____id127, 0)
    __body71 = cut(____id127, 1)
    if __x789 == "finally":
      pass
    else:
      if __x789 == "except" and has(__body71, 1) == "as":
        ____id128 = __body71
        __kind2 = has(____id128, 0)
        ___1 = has(____id128, 1)
        __name19 = has(____id128, 2)
        __body72 = cut(____id128, 3)
        add(__forms7, join([[__x789, ["%as", __kind2, __name19]]], __body72))
      else:
        if __x789 == "except":
          ____id129 = __body71
          __kind3 = has(____id129, 0)
          __body73 = cut(____id129, 1)
          add(__forms7, join([[__x789, __kind3]], __body73))
        else:
          raise Exception("Unknown try clause")
    ____i46 = ____i46 + 1
  return join(["%cases", ["try", __x783]], __forms7, [__fin1])

setenv("try", macro=__try__macro)
def __errsafe__macro(x=None, L_else=None):
  if nil63(L_else):
    L_else = "nil"
  __ok8 = unique("ok")
  __v34 = unique("v")
  return ["let", [[__ok8, __v34], ["guard", x]], ["if", __ok8, __v34, L_else]]

setenv("errsafe", macro=__errsafe__macro)
def __dbg__macro():
  ____x812 = object(["target", ["do"]])
  ____x812["py"] = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]]
  return ____x812

setenv("dbg", macro=__dbg__macro)
def __see__macro(form=None):
  __form7 = expand(form)
  L_print(compile(expand(["%set", "lumen-result", __form7])))
  return __form7

setenv("see", macro=__see__macro)
from .runtime import *
from .macros import *
from . import reader
from . import compiler
from . import system
import traceback
import numpy as np
from types import ModuleType as module
def module63(x=None):
  return isinstance(x, module)

import inspect
def class63(x=None):
  return inspect.isclass(x)

def disp(L_str=None):
  system.write(L_str)
  return system.flush()

from pprint import pprint as pp
def entries(x=None):
  __r254 = []
  __mods = []
  ____x820 = dir(x)
  ____i47 = 0
  while ____i47 < L_35(____x820):
    __k25 = ____x820[____i47]
    if not( clip(__k25, 0, 2) == "__"):
      __v35 = getattr(x, __k25)
      if function63(__v35):
        add(__r254, __k25)
      else:
        if module63(__v35):
          add(__mods, cat(".", __k25))
        else:
          add(__r254, [__k25, __v35])
    ____i47 = ____i47 + 1
  ____x822 = __mods
  ____i48 = 0
  while ____i48 < L_35(____x822):
    __x823 = ____x822[____i48]
    add(__r254, __x823)
    ____i48 = ____i48 + 1
  return __r254

from io import StringIO
def pp_to_string(x=None):
  __r256 = StringIO()
  pp(x, __r256)
  return __r256.getvalue()

def lines(x=None):
  return split(x, "\n")

def get_indentation(s=None):
  __r259 = ""
  __i49 = 0
  while __i49 < L_35(s):
    __c4 = char(s, __i49)
    if __c4 == " ":
      __r259 = cat(__r259, __c4)
    __i49 = __i49 + 1
  return __r259

def strip_outer(s=None, lh=None, rh=None):
  if string_starts63(s, lh) and string_ends63(s, rh):
    return clip(clip(s, 0, L_35(s) - L_35(rh)), L_35(lh))
  else:
    return s

def pp_obj(x=None):
  s = pp_to_string(entries(x))
  s = s.rstrip()
  s = strip_outer(s, "[", "]")
  s = cat(" ", s)
  ____x824 = lines(s)
  ____i50 = 0
  while ____i50 < L_35(____x824):
    __x825 = ____x824[____i50]
    __ind = get_indentation(__x825)
    __x825 = __x825.rstrip(",")
    __id130 = simple_id63(strip_outer(__x825.strip(), "'", "'"))
    __e35 = None
    if __id130:
      __e35 = cat(__ind, __id130)
    else:
      __e35 = __x825
    L_print(__e35)
    ____i50 = ____i50 + 1
  return L_print(repr(x))

def pp_doc(x=None):
  __doc = docstring(x)
  if __doc:
    return L_print(cat("\n\"\"\"\n", __doc.strip(), "\n\"\"\""))

def pp_toplevel(x=None):
  pp_doc(x)
  if module63(x) or class63(x):
    return pp_obj(x)
  else:
    return pp(x)

def docstring(x=None):
  def __f29():
    try:
      __x828 = x.__doc__
      __e36 = None
      if string63(__x828):
        __e36 = __x828
      else:
        __e36 = L_str(__x828)
      return [True, __e36]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id131 = __f29()
  ____ok9 = has(____id131, 0)
  ____v36 = has(____id131, 1)
  if ____ok9:
    return ____v36
  else:
    return None

def lumen_set_globals(x=None):
  compiler.lumen_globals = x
  return compiler.lumen_globals

def toplevel_print(v=None):
  return pp_toplevel(v)

def print_exception(v=None, ex=None):
  traceback.print_exception(*ex)
  return None

L_37self = reader
def accessor_literal63(form=None):
  return string63(form) and (not string_literal63(form) and (not id_literal63(form) and (char(form, 0) == "." and (not( clip(form, 0, 2) == "..") and L_35(form) > 1))))

def eval_self_form(form=None):
  if form == ".":
    return "%self"
  else:
    if accessor_literal63(form):
      return ["%self", form]
    else:
      if not list63(form):
        return form
      else:
        if hd63(form, "%self") and L_35(form) > 1:
          return ["%set", "%self", form[1]]
        else:
          if hd63(form, "import") or hd63(form, "from") and has(form, 2) == "import":
            return ["%do", form, ["%set", "%self", last(form)]]
          else:
            if accessor_literal63(hd(form)):
              return join(["%self"], form)
            else:
              return form

def eval_print(form=None):
  __form8 = eval_self_form(form)
  def __f30():
    try:
      return [True, compiler.eval(__form8)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id132 = __f30()
  __ok10 = has(____id132, 0)
  __v37 = has(____id132, 1)
  __ex = has(____id132, 2)
  if not __ok10:
    return print_exception(__v37, __ex)
  else:
    if is63(__v37):
      return toplevel_print(__v37)

def read_toplevel(L_str=None, more=None):
  __s3 = reader.stream(L_str, more)
  def __f31():
    try:
      return [True, reader.read_all(__s3)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id133 = __f31()
  ____ok11 = has(____id133, 0)
  ____v38 = has(____id133, 1)
  __e37 = None
  if ____ok11:
    __e37 = ____v38
  else:
    __e37 = None
  __x836 = __e37
  if __x836 == more:
    return more
  else:
    if nil63(__x836):
      return __x836
    else:
      if one63(__x836):
        return hd(__x836)
      else:
        return __x836

def rep(L_str=None):
  __v39 = eval(read_toplevel(L_str))
  if is63(__v39):
    return toplevel_print(__v39)

def repl():
  o = {"buf": ""}
  def reset():
    o["buf"] = ""
    return disp("> ")
  def ctrl_c():
    traceback.print_exc()
    reset()
    return ctrl_c
  def rep1(s=None):
    o["buf"] = cat(o["buf"], s)
    __more = []
    __form9 = read_toplevel(o["buf"], __more)
    if not( __form9 == __more):
      eval_print(__form9)
      return reset()
  reset()
  while True:
    __s4 = system.read_line(ctrl_c)
    if not( __s4 == ctrl_c):
      if is63(__s4):
        rep1(cat(__s4, "\n"))
      else:
        break

def read_file(path=None):
  return system.read_file(path)

def read_from_file(path=None):
  __s5 = reader.stream(read_file(path))
  return reader.read_all(__s5)

def expand_file(path=None):
  __body74 = read_from_file(path)
  return compiler.expand(join(["do"], __body74))

def compile_file(path=None):
  __form10 = expand_file(path)
  return compiler.compile(__form10, stmt=True)

def load(path=None):
  __previous = has(setenv("target", toplevel=True), "value")
  __previous_indent = has(setenv("indent-level", toplevel=True), "value")
  setenv("target", toplevel=True)["value"] = "py"
  setenv("indent-level", toplevel=True)["value"] = 0
  __code = compile_file(path)
  setenv("indent-level", toplevel=True)["value"] = __previous_indent
  setenv("target", toplevel=True)["value"] = __previous
  return compiler.run(__code)

def script_file63(path=None):
  return not( "-" == char(path, 0) or (".py" == clip(path, L_35(path) - 3) or (".js" == clip(path, L_35(path) - 3) or ".lua" == clip(path, L_35(path) - 4))))

def run_file(path=None):
  if script_file63(path):
    return load(path)
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
    return load(__arg)
  else:
    if __arg == "-h" or __arg == "--help":
      return usage()
    else:
      __pre = []
      __input = None
      __output = None
      __target1 = None
      __expr10 = None
      __argv = system.argv
      __i51 = 0
      while __i51 < L_35(__argv):
        __a27 = __argv[__i51]
        if __a27 == "-c" or (__a27 == "-o" or (__a27 == "-t" or __a27 == "-e")):
          if __i51 == edge(__argv):
            L_print(cat("missing argument for ", __a27))
          else:
            __i51 = __i51 + 1
            __val2 = __argv[__i51]
            if __a27 == "-c":
              __input = __val2
            else:
              if __a27 == "-o":
                __output = __val2
              else:
                if __a27 == "-t":
                  __target1 = __val2
                else:
                  if __a27 == "-e":
                    __expr10 = __val2
        else:
          if not( "-" == char(__a27, 0)):
            add(__pre, __a27)
        __i51 = __i51 + 1
      ____x840 = __pre
      ____i52 = 0
      while ____i52 < L_35(____x840):
        __file = ____x840[____i52]
        run_file(__file)
        ____i52 = ____i52 + 1
      if nil63(__input):
        if __expr10:
          return rep(__expr10)
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

