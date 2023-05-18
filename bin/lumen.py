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
  return isinstance(x, tuple([Sequence, np.ndarray]))

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
  __upto1 = __e1
  return s[__L_from:__upto1]

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
  __upto2 = __e3
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
  def __f3(y=None):
    return x == y
  return find(__f3, t)

def pair(l=None):
  __l12 = dupe(l)
  __n13 = L_35(l)
  __i12 = 0
  while __i12 < __n13:
    __a = l[__i12]
    __e4 = None
    if __i12 + 1 < __n13:
      __e4 = l[__i12 + 1]
    __b = __e4
    add(__l12, [__a, __b])
    __i12 = __i12 + 1
    __i12 = __i12 + 1
  return __l12

import functools
def sortfunc(f=None):
  if f:
    def __f4(a=None, b=None):
      if f(a, b):
        return -1
      else:
        return 1
    __f = __f4
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
    __e5 = None
    if f:
      __e5 = f(__v9)
    else:
      __e5 = __v9
    __y4 = __e5
    if is63(__y4):
      __r59 = cat(__r59, __c, __y4)
      __c = sep or ""
    ____i15 = ____i15 + 1
  return __r59

def concat(sep=None, x=None, f=None):
  return mapcat(f, x, sep)

def keep(f=None, x=None):
  def __f5(v=None):
    if yes(f(v)):
      return v
  return map(__f5, x)

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
  __e6 = None
  if is63(pos):
    __e6 = clip(L_str, pos)
  else:
    __e6 = L_str
  __L_str = __e6
  if L_35(x) > L_35(__L_str):
    return False
  else:
    return x == clip(__L_str, L_35(__L_str) - L_35(x))

def string_starts63(L_str=None, x=None, pos=None):
  __e7 = None
  if is63(pos):
    __e7 = clip(L_str, pos)
  else:
    __e7 = L_str
  __L_str1 = __e7
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
  def __f6(a=None, b=None):
    return cat2(a, b)
  return reduce(__f6, __xs, "")

def L_43(*_args, **_keys):
  __xs1 = unstash(_args, _keys)
  def __f7(a=None, b=None):
    return a + b
  return reduce(__f7, __xs1, 0)

def L_45(*_args, **_keys):
  __xs2 = unstash(_args, _keys)
  def __f8(b=None, a=None):
    return a - b
  return reduce(__f8, reverse(__xs2), 0)

def L_42(*_args, **_keys):
  __xs3 = unstash(_args, _keys)
  def __f9(a=None, b=None):
    return a * b
  return reduce(__f9, __xs3, 1)

def L_47(*_args, **_keys):
  __xs4 = unstash(_args, _keys)
  def __f10(b=None, a=None):
    return a / b
  return reduce(__f10, reverse(__xs4), 1)

def L_37(*_args, **_keys):
  __xs5 = unstash(_args, _keys)
  def __f11(b=None, a=None):
    return a % b
  return reduce(__f11, reverse(__xs5), 1)

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
  def __f12(a=None, b=None):
    return a < b
  return pairwise(__f12, __xs6)

def L_62(*_args, **_keys):
  __xs7 = unstash(_args, _keys)
  def __f13(a=None, b=None):
    return a > b
  return pairwise(__f13, __xs7)

def L_61(*_args, **_keys):
  __xs8 = unstash(_args, _keys)
  def __f14(a=None, b=None):
    return a == b
  return pairwise(__f14, __xs8)

def L_6061(*_args, **_keys):
  __xs9 = unstash(_args, _keys)
  def __f15(a=None, b=None):
    return a <= b
  return pairwise(__f15, __xs9)

def L_6261(*_args, **_keys):
  __xs10 = unstash(_args, _keys)
  def __f16(a=None, b=None):
    return a >= b
  return pairwise(__f16, __xs10)

def number_code63(n=None):
  return n > 47 and n < 58

def number(s=None):
  if string63(s):
    ____r88 = None
    try:
      return int(s)
    except ValueError:
      ____r88 = None
    finally:
      pass
    ____r89 = None
    try:
      return float(s)
    except ValueError:
      ____r89 = None
    finally:
      pass
    return ____r89
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

def uppercase(x=None):
  return x.upper()

def lowercase(x=None):
  return x.lower()

def dashcase(x=None):
  return mapcat(lowercase, split(x, "_"), "-")

def screamcase(x=None):
  return mapcat(uppercase, split(x, "-"), "_")

def escape(s=None):
  if nil63(search(s, "\n")) and (nil63(search(s, "\r")) and (nil63(search(s, "\"")) and nil63(search(s, "\\")))):
    return "".join(["\"", s, "\""])
  else:
    __s1 = "\""
    __i26 = 0
    while __i26 < L_35(s):
      __c1 = char(s, __i26)
      __e8 = None
      if __c1 == "\n":
        __e8 = "\\n"
      else:
        __e9 = None
        if __c1 == "\r":
          __e9 = "\\r"
        else:
          __e10 = None
          if __c1 == "\"":
            __e10 = "\\\""
          else:
            __e11 = None
            if __c1 == "\\":
              __e11 = "\\\\"
            else:
              __e11 = __c1
            __e10 = __e11
          __e9 = __e10
        __e8 = __e9
      __c11 = __e8
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
                          __v16 = ____o15[__k13]
                          if number63(__k13):
                            __xs11[__k13] = L_str(__v16, repr, __l5)
                          else:
                            if function63(__v16):
                              add(__ks, [cat(".", __k13), ""])
                            else:
                              add(__ks, [cat(__k13, ": "), L_str(__v16, repr, __l5)])
                        def __f17(__x16=None, __x17=None):
                          ____id = __x16
                          __a2 = has(____id, 0)
                          ____id1 = __x17
                          __b2 = has(____id1, 0)
                          return __a2 < __b2
                        sort(__ks, __f17)
                        drop(__l5)
                        ____x18 = __xs11
                        ____i28 = 0
                        while ____i28 < L_35(____x18):
                          __v17 = ____x18[____i28]
                          __s = cat(__s, __sp, __v17)
                          __sp = " "
                          ____i28 = ____i28 + 1
                        ____x19 = __ks
                        ____i29 = 0
                        while ____i29 < L_35(____x19):
                          ____id2 = ____x19[____i29]
                          __k14 = has(____id2, 0)
                          __v18 = has(____id2, 1)
                          __s = cat(__s, __sp, __k14, __v18)
                          __sp = " "
                          ____i29 = ____i29 + 1
                        return cat(__s, ")")

def apply(f=None, args=None):
  __args = stash(args)
  return f(*__args)

def call(f=None, *_args, **_keys):
  ____r100 = unstash(_args, _keys)
  __f1 = destash33(f, ____r100)
  ____id3 = ____r100
  __args12 = cut(____id3, 0)
  return apply(__f1, __args12)

def setenv(k=None, *_args, **_keys):
  ____r101 = unstash(_args, _keys)
  __k15 = destash33(k, ____r101)
  ____id4 = ____r101
  __keys = cut(____id4, 0)
  if string63(__k15):
    __e12 = None
    if has63(__keys, "toplevel"):
      __e12 = hd(environment)
    else:
      __e12 = last(environment)
    __frame = __e12
    __e13 = None
    if has63(__frame, __k15):
      __e13 = __frame[__k15]
    else:
      __e13 = {}
    __entry = __e13
    ____o16 = __keys
    __k16 = None
    for __k16 in indices(____o16):
      __v19 = ____o16[__k16]
      if not( __k16 == "toplevel"):
        __entry[__k16] = __v19
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
def __quote__macro(form=None):
  return quoted(form)

setenv("quote", macro=__quote__macro)
def __quasiquote__macro(form=None):
  return quasiexpand(form, 1)

setenv("quasiquote", macro=__quasiquote__macro)
def __set__macro(*_args, **_keys):
  __args2 = unstash(_args, _keys)
  def __f18(__x23=None):
    ____id5 = __x23
    __lh = has(____id5, 0)
    __rh = has(____id5, 1)
    __lh = macroexpand(__lh)
    if not atom63(__lh) and hd(__lh) == "has":
      return ["%set", join(["%get"], tl(__lh)), __rh]
    else:
      return ["%set", __lh, __rh]
  return join(["%do"], map(__f18, pair(__args2)))

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
def __quasilist__macro(*_args, **_keys):
  __body = unstash(_args, _keys)
  if one63(__body) and (hd63(__body, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_args"
  else:
    if L_35(__body) > 2 and (__body[1] == "for" and __body[3] == "in"):
      ____id6 = __body
      __expr = has(____id6, 0)
      __body1 = cut(____id6, 1)
      __comps = []
      __cond = None
      while L_35(__body1) > 2 and (__body1[0] == "for" and __body1[2] == "in"):
        ____id7 = __body1
        ___for = has(____id7, 0)
        __names = has(____id7, 1)
        ___in = has(____id7, 2)
        __l6 = has(____id7, 3)
        __body11 = cut(____id7, 4)
        add(__comps, [__names, __l6])
        __body1 = __body11
      if hd(__body1) == "if":
        ____id8 = __body1
        ___if = has(____id8, 0)
        __expr1 = has(____id8, 1)
        __cond = __expr1
      return ["%list", __expr, __comps, __cond]
    else:
      __x33 = unique("x")
      __l7 = {}
      __forms = []
      ____o17 = __body
      __k17 = None
      for __k17 in indices(____o17):
        __v20 = ____o17[__k17]
        if number63(__k17):
          __l7[__k17] = __v20
        else:
          add(__forms, ["%set", ["%get", __x33, ["quote", __k17]], __v20])
      if some63(__forms):
        return join(["let", __x33, ["object", join(["%array"], __l7)]], __forms, [__x33])
      else:
        return join(["%array"], __l7)

setenv("quasilist", macro=__quasilist__macro)
def __list__macro(*_args, **_keys):
  __args3 = unstash(_args, _keys)
  return join(["quasilist"], __args3)

setenv("list", macro=__list__macro)
def __if__macro(*_args, **_keys):
  __branches = unstash(_args, _keys)
  return hd(expand_if(__branches))

setenv("if", macro=__if__macro)
def __case__macro(expr=None, *_args, **_keys):
  ____r108 = unstash(_args, _keys)
  __expr2 = destash33(expr, ____r108)
  ____id9 = ____r108
  __e14 = None
  if nil63(has(____id9, "cmp")):
    __e14 = "="
  else:
    __e14 = has(____id9, "cmp")
  __cmp = __e14
  __clauses = cut(____id9, 0)
  __x43 = unique("x")
  def __f19(_=None):
    return [__cmp, _, __x43]
  __eq = __f19
  def __f20(__x45=None):
    ____id10 = __x45
    __a3 = has(____id10, 0)
    __b3 = has(____id10, 1)
    if nil63(__b3):
      return [__a3]
    else:
      if string63(__a3) or number63(__a3):
        return [__eq(__a3), __b3]
      else:
        if list63(__a3) and hd63(__a3, "quote"):
          return [__eq(__a3), __b3]
        else:
          if one63(__a3):
            return [__eq(hd(__a3)), __b3]
          else:
            if L_35(__a3) > 1:
              return [join(["or"], map(__eq, __a3)), __b3]
  __cl = __f20
  return ["let", __x43, __expr2, join(["if"], apply(join, map(__cl, pair(__clauses))))]

setenv("case", macro=__case__macro)
def __of__macro(x=None, *_args, **_keys):
  ____r111 = unstash(_args, _keys)
  __x54 = destash33(x, ____r111)
  ____id11 = ____r111
  __values = cut(____id11, 0)
  return join(["case", __x54, __values, True, False], props(__values))

setenv("of", macro=__of__macro)
def __when__macro(cond=None, *_args, **_keys):
  ____r112 = unstash(_args, _keys)
  __cond1 = destash33(cond, ____r112)
  ____id12 = ____r112
  __body2 = cut(____id12, 0)
  return ["%if", __cond1, join(["%do"], __body2)]

setenv("when", macro=__when__macro)
def __unless__macro(cond=None, *_args, **_keys):
  ____r113 = unstash(_args, _keys)
  __cond2 = destash33(cond, ____r113)
  ____id13 = ____r113
  __body3 = cut(____id13, 0)
  return ["%if", ["%not", __cond2], join(["%do"], __body3)]

setenv("unless", macro=__unless__macro)
def __obj__macro(*_args, **_keys):
  __body4 = unstash(_args, _keys)
  if one63(__body4) and (hd63(__body4, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_keys"
  else:
    if L_35(__body4) > 2 and (__body4[1] == "for" and __body4[3] == "in"):
      ____id14 = __body4
      __expr3 = has(____id14, 0)
      __body5 = cut(____id14, 1)
      __comps1 = []
      __cond3 = None
      while L_35(__body5) > 2 and (__body5[0] == "for" and __body5[2] == "in"):
        ____id15 = __body5
        ___for1 = has(____id15, 0)
        __names1 = has(____id15, 1)
        ___in1 = has(____id15, 2)
        __l8 = has(____id15, 3)
        __body12 = cut(____id15, 4)
        add(__comps1, [__names1, __l8])
        __body5 = __body12
      if hd(__body5) == "if":
        ____id16 = __body5
        ___if1 = has(____id16, 0)
        __expr4 = has(____id16, 1)
        __cond3 = __expr4
      if list63(__expr3) and hd63(__expr3, ","):
        __expr3 = join([":"], tl(__expr3))
      ____x63 = object(["%list", __expr3, __comps1, __cond3])
      ____x63["kind"] = "object"
      return ____x63
    else:
      def __f21(x=None):
        return x
      return join(["%object"], mapo(__f21, __body4))

setenv("obj", macro=__obj__macro)
def __let__macro(bs=None, *_args, **_keys):
  ____r115 = unstash(_args, _keys)
  __bs = destash33(bs, ____r115)
  ____id17 = ____r115
  __body6 = cut(____id17, 0)
  if atom63(__bs) or hd63(__bs, ","):
    return join(["let", [__bs, hd(__body6)]], tl(__body6))
  else:
    if none63(__bs):
      return join(["%do"], __body6)
    else:
      ____id18 = __bs
      __lh1 = has(____id18, 0)
      __rh1 = has(____id18, 1)
      __bs2 = cut(____id18, 2)
      ____id19 = bind(__lh1, __rh1)
      __id20 = has(____id19, 0)
      __val = has(____id19, 1)
      __bs1 = cut(____id19, 2)
      __id111 = unique(__id20)
      return ["%do", ["%local", __id111, __val], ["let-symbol", [__id20, __id111], join(["let", join(__bs1, __bs2)], __body6)]]

setenv("let", macro=__let__macro)
def __let42__macro(bs=None, *_args, **_keys):
  ____r116 = unstash(_args, _keys)
  __bs11 = destash33(bs, ____r116)
  ____id21 = ____r116
  __body7 = cut(____id21, 0)
  if atom63(__bs11):
    return join(["let*", [__bs11, hd(__body7)]], tl(__body7))
  else:
    if none63(__bs11):
      return join(["%do"], __body7)
    else:
      ____id22 = __bs11
      __lh2 = has(____id22, 0)
      __rh2 = has(____id22, 1)
      __bs21 = cut(____id22, 2)
      return ["let-global", __lh2, __rh2, join(["let*", __bs21], __body7)]

setenv("let*", macro=__let42__macro)
def __let_global__macro(name=None, value=None, *_args, **_keys):
  ____r117 = unstash(_args, _keys)
  __name = destash33(name, ____r117)
  __value = destash33(value, ____r117)
  ____id23 = ____r117
  __body8 = cut(____id23, 0)
  __prev = unique("prev")
  __ok = unique("ok")
  __x78 = unique("x")
  return ["let", __prev, __name, ["set", __name, __value], ["let", [[__ok, __x78], ["guard", join(["%do"], __body8)]], ["set", __name, __prev], ["if", __ok, __x78, ["throw", __x78]]]]

setenv("let-global", macro=__let_global__macro)
def __with__macro(x=None, v=None, *_args, **_keys):
  ____r118 = unstash(_args, _keys)
  __x89 = destash33(x, ____r118)
  __v21 = destash33(v, ____r118)
  ____id24 = ____r118
  __body9 = cut(____id24, 0)
  if __v21 == "as":
    return join(["%with", ["%as", __x89, hd(__body9)]], tl(__body9))
  else:
    if not atom63(__x89) or has(__body9, "async"):
      return join(["%with", __x89, __v21], __body9)
    else:
      return join(["let", [__x89, __v21]], __body9, [__x89])

setenv("with", macro=__with__macro)
def __let_when__macro(x=None, v=None, *_args, **_keys):
  ____r119 = unstash(_args, _keys)
  __x96 = destash33(x, ____r119)
  __v22 = destash33(v, ____r119)
  ____id25 = ____r119
  __body10 = cut(____id25, 0)
  __y5 = unique("y")
  return ["let", __y5, __v22, ["when", ["yes", __y5], join(["let", [__x96, __y5]], __body10)]]

setenv("let-when", macro=__let_when__macro)
def __define_macro__macro(name=None, args=None, *_args, **_keys):
  ____r120 = unstash(_args, _keys)
  __name1 = destash33(name, ____r120)
  __args4 = destash33(args, ____r120)
  ____id26 = ____r120
  __body111 = cut(____id26, 0)
  __id27 = unique(cat(__name1, "--macro"))
  ____x104 = object(["setenv", ["quote", __name1]])
  ____x104["macro"] = __id27
  __form = ["do", join(["define", __id27, __args4], __body111), ____x104]
  return __form

setenv("define-macro", macro=__define_macro__macro)
def __define_special__macro(name=None, args=None, *_args, **_keys):
  ____r121 = unstash(_args, _keys)
  __name2 = destash33(name, ____r121)
  __args5 = destash33(args, ____r121)
  ____id28 = ____r121
  __body121 = cut(____id28, 0)
  __id29 = unique(cat(__name2, "--special"))
  ____x108 = object(["setenv", ["quote", __name2]])
  ____x108["special"] = __id29
  __form1 = ["do", join(["define", __id29, __args5], __body121), join(____x108, props(__body121))]
  return __form1

setenv("define-special", macro=__define_special__macro)
def __define_symbol__macro(name=None, expansion=None):
  ____x110 = object(["setenv", ["quote", name]])
  ____x110["symbol"] = ["quote", expansion]
  return ____x110

setenv("define-symbol", macro=__define_symbol__macro)
def __define_reader__macro(__x113=None, *_args, **_keys):
  ____r123 = unstash(_args, _keys)
  ____x113 = destash33(__x113, ____r123)
  ____id30 = ____x113
  __char = has(____id30, 0)
  __s11 = has(____id30, 1)
  ____id31 = ____r123
  __body13 = cut(____id31, 0)
  return ["%set", ["%get", "read-table", __char], join(["fn", [__s11]], __body13)]

setenv("define-reader", macro=__define_reader__macro)
def __define__macro(name=None, x=None, *_args, **_keys):
  ____r124 = unstash(_args, _keys)
  __name3 = destash33(name, ____r124)
  __x118 = destash33(x, ____r124)
  ____id32 = ____r124
  __body14 = cut(____id32, 0)
  setenv(__name3, variable=True)
  if some63(__body14):
    return join(["%local-function", __name3], bind42(__x118, __body14), props(__body14))
  else:
    return join(["%local", __name3, __x118], props(__body14))

setenv("define", macro=__define__macro)
def __define_global__macro(name=None, x=None, *_args, **_keys):
  ____r125 = unstash(_args, _keys)
  __name4 = destash33(name, ____r125)
  __x121 = destash33(x, ____r125)
  ____id33 = ____r125
  __body15 = cut(____id33, 0)
  setenv(__name4, toplevel=True, variable=True)
  if some63(__body15):
    return join(["%global-function", __name4], bind42(__x121, __body15), props(__body15))
  else:
    return join(["set", __name4, __x121], props(__body15))

setenv("define-global", macro=__define_global__macro)
def __get_value__macro(x=None):
  ____x125 = object(["setenv", x])
  ____x125["toplevel"] = True
  return ["has", ____x125, ["quote", "value"]]

setenv("get-value", macro=__get_value__macro)
def __define_constant__macro(name=None, x=None):
  ____x128 = object(["setenv", ["quote", name]])
  ____x128["toplevel"] = True
  ____x128["value"] = either(x, ["get-value", ["quote", name]])
  return ["%do", ____x128, ["define-symbol", name, ["get-value", ["quote", name]]]]

setenv("define-constant", macro=__define_constant__macro)
def __define_variable__macro(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]

setenv("define-variable", macro=__define_variable__macro)
def __after__macro(x=None, *_args, **_keys):
  ____r129 = unstash(_args, _keys)
  __x140 = destash33(x, ____r129)
  ____id34 = ____r129
  __body16 = cut(____id34, 0)
  __ok1 = unique("ok")
  __r130 = unique("r")
  ____x141 = object(["target", ["try", __x140, join(["finally"], __body16)]])
  ____x141["lua"] = join(["let", [[__ok1, __r130], ["guard", __x140]]], __body16, [["if", __ok1, __r130, ["throw", __r130]]])
  return ____x141

setenv("after", macro=__after__macro)
def __with_frame__macro(*_args, **_keys):
  __body17 = unstash(_args, _keys)
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body17), ["drop", "environment"]]]

setenv("with-frame", macro=__with_frame__macro)
def __with_values__macro(*_args, **_keys):
  __body18 = unstash(_args, _keys)
  __forms1 = []
  ____o18 = __body18
  __k18 = None
  for __k18 in indices(____o18):
    __v23 = ____o18[__k18]
    if not number63(__k18):
      ____x158 = object(["setenv", ["quote", __k18]])
      ____x158["value"] = __v23
      add(__forms1, ____x158)
  return join(["with-frame"], __forms1)

setenv("with-values", macro=__with_values__macro)
def __with_bindings__macro(__x160=None, *_args, **_keys):
  ____r131 = unstash(_args, _keys)
  ____x160 = destash33(__x160, ____r131)
  ____id35 = ____x160
  __names2 = has(____id35, 0)
  ____id36 = ____r131
  __body19 = cut(____id36, 0)
  __x161 = unique("x")
  ____x164 = object(["setenv", __x161])
  ____x164["variable"] = True
  return join(["with-frame", ["each", __x161, __names2, ____x164]], __body19)

setenv("with-bindings", macro=__with_bindings__macro)
def __let_macro__macro(definitions=None, *_args, **_keys):
  ____r132 = unstash(_args, _keys)
  __definitions = destash33(definitions, ____r132)
  ____id37 = ____r132
  __body20 = cut(____id37, 0)
  add(environment, {})
  ____r134 = None
  try:
    def __f22(m=None):
      return eval(join(["define-macro"], m))
    map(__f22, __definitions)
    ____r134 = ["%expansion", join(["%do"], macroexpand(__body20))]
  finally:
    drop(environment)
  return ____r134

setenv("let-macro", macro=__let_macro__macro)
def __let_symbol__macro(expansions=None, *_args, **_keys):
  ____r136 = unstash(_args, _keys)
  __expansions = destash33(expansions, ____r136)
  ____id38 = ____r136
  __body21 = cut(____id38, 0)
  if atom63(__expansions):
    return join(["let-symbol", [__expansions, hd(__body21)]], tl(__body21))
  else:
    add(environment, {})
    ____r138 = None
    try:
      def __f23(__x170=None):
        ____id39 = __x170
        __name5 = has(____id39, 0)
        __exp = has(____id39, 1)
        return eval(["define-symbol", __name5, __exp])
      map(__f23, pair(__expansions))
      ____r138 = ["%expansion", join(["%do"], macroexpand(__body21))]
    finally:
      drop(environment)
    return ____r138

setenv("let-symbol", macro=__let_symbol__macro)
def __let_unique__macro(names=None, *_args, **_keys):
  ____r140 = unstash(_args, _keys)
  __names3 = destash33(names, ____r140)
  ____id40 = ____r140
  __body22 = cut(____id40, 0)
  def __f24(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs22 = map(__f24, __names3)
  return join(["let", apply(join, __bs22)], __body22)

setenv("let-unique", macro=__let_unique__macro)
def __fn__macro(args=None, *_args, **_keys):
  ____r142 = unstash(_args, _keys)
  __args6 = destash33(args, ____r142)
  ____id41 = ____r142
  __body23 = cut(____id41, 0)
  return join(["%function"], bind42(__args6, __body23), props(__body23))

setenv("fn", macro=__fn__macro)
def __apply__macro(f=None, *_args, **_keys):
  ____r143 = unstash(_args, _keys)
  __f2 = destash33(f, ____r143)
  ____id42 = ____r143
  __args7 = cut(____id42, 0)
  if L_35(__args7) > 1:
    return ["%call", "apply", __f2, ["join", join(["list"], almost(__args7)), last(__args7), join(["list"], props(__args7))]]
  else:
    if props63(__args7):
      return ["%call", "apply", __f2, join(["join"], __args7, [join(["list"], props(__args7))])]
    else:
      return join(["%call", "apply", __f2], __args7)

setenv("apply", macro=__apply__macro)
def __guard__macro(expr=None):
  ____x192 = object(["target", [["%function", join(), ["%try", ["list", True, expr]]]]])
  ____x204 = object(["obj"])
  ____x204["stack"] = [["idx", "debug", "traceback"]]
  ____x204["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
  ____x192["lua"] = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x204]]]]
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x192]

setenv("guard", macro=__guard__macro)
def __each__macro(x=None, t=None, *_args, **_keys):
  ____r145 = unstash(_args, _keys)
  __x214 = destash33(x, ____r145)
  __t3 = destash33(t, ____r145)
  ____id43 = ____r145
  __body24 = cut(____id43, 0)
  __o19 = unique("o")
  __n27 = unique("n")
  __i33 = unique("i")
  __e15 = None
  if atom63(__x214):
    __e15 = [__i33, __x214]
  else:
    __e16 = None
    if L_35(__x214) > 1:
      __e16 = __x214
    else:
      __e16 = [__i33, hd(__x214)]
    __e15 = __e16
  ____id44 = __e15
  __k19 = has(____id44, 0)
  __v24 = has(____id44, 1)
  ____x220 = object(["target", __o19])
  ____x220["py"] = ["indices", __o19]
  __e17 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e17 = __body24
  else:
    __e17 = [join(["let", __k19, ["if", ["numeric?", __k19], ["parseInt", __k19], __k19]], __body24)]
  return ["let", [__o19, __t3, __k19, "nil"], join(["%for", ____x220, __k19], props(__body24), [join(["let", [__v24, ["%get", __o19, __k19]]], __e17)])]

setenv("each", macro=__each__macro)
def __for__macro(i=None, to=None, *_args, **_keys):
  ____r146 = unstash(_args, _keys)
  __i34 = destash33(i, ____r146)
  __to = destash33(to, ____r146)
  ____id45 = ____r146
  __body25 = cut(____id45, 0)
  if __to == "in":
    return join(["%for", hd(__body25), __i34, join(["%do"], tl(__body25))], props(__body25))
  else:
    return ["let", __i34, 0, join(["while", ["<", __i34, __to]], __body25, [["inc", __i34]])]

setenv("for", macro=__for__macro)
def __step__macro(v=None, t=None, *_args, **_keys):
  ____r147 = unstash(_args, _keys)
  __v25 = destash33(v, ____r147)
  __t4 = destash33(t, ____r147)
  ____id46 = ____r147
  __body26 = cut(____id46, 0)
  __x238 = unique("x")
  __i35 = unique("i")
  return ["let", [__x238, __t4], ["for", __i35, ["#", __x238], join(["let", [__v25, ["at", __x238, __i35]]], __body26)]]

setenv("step", macro=__step__macro)
def __set_of__macro(*_args, **_keys):
  __xs12 = unstash(_args, _keys)
  __l9 = {}
  ____o20 = __xs12
  ____i36 = None
  for ____i36 in indices(____o20):
    __x246 = ____o20[____i36]
    __l9[__x246] = True
  return join(["obj"], __l9)

setenv("set-of", macro=__set_of__macro)
def __target63__macro(x=None):
  return ["=", "target", x]

setenv("target?", macro=__target63__macro)
def __target__macro(*_args, **_keys):
  __clauses1 = unstash(_args, _keys)
  if has63(__clauses1, has(setenv("target", toplevel=True), "value")):
    return __clauses1[has(setenv("target", toplevel=True), "value")]
  else:
    return hd(__clauses1)

setenv("target", macro=__target__macro)
def __language__macro():
  return ["quote", has(setenv("target", toplevel=True), "value")]

setenv("language", macro=__language__macro)
def __join33__macro(a=None, *_args, **_keys):
  ____r150 = unstash(_args, _keys)
  __a4 = destash33(a, ____r150)
  ____id47 = ____r150
  __bs3 = cut(____id47, 0)
  return ["set", __a4, join(["join", __a4], __bs3)]

setenv("join!", macro=__join33__macro)
def __cat33__macro(a=None, *_args, **_keys):
  ____r151 = unstash(_args, _keys)
  __a5 = destash33(a, ____r151)
  ____id48 = ____r151
  __bs4 = cut(____id48, 0)
  return ["set", __a5, join(["cat", __a5], __bs4)]

setenv("cat!", macro=__cat33__macro)
def __inc__macro(n=None, by=None):
  __e18 = None
  if nil63(by):
    __e18 = 1
  else:
    __e18 = by
  return ["set", n, ["+", n, __e18]]

setenv("inc", macro=__inc__macro)
def __dec__macro(n=None, by=None):
  __e19 = None
  if nil63(by):
    __e19 = 1
  else:
    __e19 = by
  return ["set", n, ["-", n, __e19]]

setenv("dec", macro=__dec__macro)
def __with_indent__macro(form=None):
  __x258 = unique("x")
  return ["%do", ["inc", "indent-level"], ["with", __x258, form, ["dec", "indent-level"]]]

setenv("with-indent", macro=__with_indent__macro)
def __export__macro(*_args, **_keys):
  __names4 = unstash(_args, _keys)
  def __f25(k=None):
    if k == compile(k):
      return ["%set", ["idx", "exports", k], k]
    else:
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]]
  __forms2 = map(__f25, __names4)
  if has(setenv("target", toplevel=True), "value") == "js":
    return join(["%do"], __forms2)
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms2, [["return", "exports"]])

setenv("export", macro=__export__macro)
def __when_compiling__macro(*_args, **_keys):
  __body27 = unstash(_args, _keys)
  return eval(join(["%do"], __body27))

setenv("when-compiling", macro=__when_compiling__macro)
def __during_compilation__macro(*_args, **_keys):
  __body28 = unstash(_args, _keys)
  __form2 = join(["%do"], __body28)
  eval(__form2)
  return __form2

setenv("during-compilation", macro=__during_compilation__macro)
def __def__macro(name=None, *_args, **_keys):
  ____r156 = unstash(_args, _keys)
  __name6 = destash33(name, ____r156)
  ____id49 = ____r156
  __body29 = cut(____id49, 0)
  return join(["define-global", __name6], __body29)

setenv("def", macro=__def__macro)
def __mac__macro(name=None, *_args, **_keys):
  ____r157 = unstash(_args, _keys)
  __name7 = destash33(name, ____r157)
  ____id50 = ____r157
  __body30 = cut(____id50, 0)
  return join(["define-macro", __name7], __body30)

setenv("mac", macro=__mac__macro)
def __defconst__macro(name=None, *_args, **_keys):
  ____r158 = unstash(_args, _keys)
  __name8 = destash33(name, ____r158)
  ____id51 = ____r158
  __value1 = cut(____id51, 0)
  return join(["def", __name8], __value1)

setenv("defconst", macro=__defconst__macro)
def __undefined63__macro(name=None):
  ____x282 = object(["target"])
  ____x282["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x282["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x282["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x282

setenv("undefined?", macro=__undefined63__macro)
def __defvar__macro(name=None, *_args, **_keys):
  ____r160 = unstash(_args, _keys)
  __name9 = destash33(name, ____r160)
  ____id52 = ____r160
  __value2 = cut(____id52, 0)
  ____x293 = object(["target"])
  ____x293["py"] = ["global", __name9]
  return ["when", ["undefined?", __name9], ____x293, join(["defconst", __name9], __value2)]

setenv("defvar", macro=__defvar__macro)
def __async__macro(keyword=None, *_args, **_keys):
  ____r161 = unstash(_args, _keys)
  __keyword = destash33(keyword, ____r161)
  ____id53 = ____r161
  __body31 = cut(____id53, 0)
  ____x296 = object([__keyword])
  ____x296["async"] = True
  return join(____x296, __body31)

setenv("async", macro=__async__macro)
def __L_37read_from_file__macro(name=None):
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]]

setenv("%read-from-file", macro=__L_37read_from_file__macro)
def __the__macro(name=None):
  return ["getenv", ["quote", name], ["quote", "value"]]

setenv("the", macro=__the__macro)
def __cat__macro(a=None, *_args, **_keys):
  ____r164 = unstash(_args, _keys)
  __a6 = destash33(a, ____r164)
  ____id54 = ____r164
  __bs5 = cut(____id54, 0)
  if nil63(__a6):
    return ""
  else:
    if none63(__bs5):
      return __a6
    else:
      if one63(__bs5):
        ____x305 = object(["target", join(["%cat", __a6], __bs5)])
        ____x305["py"] = join(["%call", "cat", __a6], __bs5)
        ____x305["cmake"] = join(["%call", "cat", __a6], __bs5)
        return ____x305
      else:
        ____x309 = object(["target", ["%cat", __a6, join(["cat"], __bs5)]])
        ____x309["py"] = join(["%call", "cat", __a6], __bs5)
        ____x309["cmake"] = join(["%call", "cat", __a6], __bs5)
        return ____x309

setenv("cat", macro=__cat__macro)
def __L_43__macro(*_args, **_keys):
  __args8 = unstash(_args, _keys)
  if none63(__args8):
    return 0
  else:
    if one63(__args8):
      return hd(__args8)
    else:
      return join(["%add"], __args8)

setenv("+", macro=__L_43__macro)
def __L___macro(*_args, **_keys):
  __args9 = unstash(_args, _keys)
  if none63(__args9):
    return 0
  else:
    if one63(__args9):
      return ["%unm", hd(__args9)]
    else:
      return join(["%sub"], __args9)

setenv("-", macro=__L___macro)
def __L_42__macro(*_args, **_keys):
  __args10 = unstash(_args, _keys)
  if none63(__args10):
    return 1
  else:
    if one63(__args10):
      return hd(__args10)
    else:
      return join(["%mul"], __args10)

setenv("*", macro=__L_42__macro)
def __L_47__macro(*_args, **_keys):
  __args111 = unstash(_args, _keys)
  if none63(__args111):
    return 1
  else:
    if one63(__args111):
      return hd(__args111)
    else:
      return join(["%div"], __args111)

setenv("/", macro=__L_47__macro)
def __L_4747__macro(*_args, **_keys):
  __args121 = unstash(_args, _keys)
  if none63(__args121):
    return 1
  else:
    if one63(__args121):
      return hd(__args121)
    else:
      return join(["%idiv"], __args121)

setenv("//", macro=__L_4747__macro)
def __L_37__macro(*_args, **_keys):
  __args13 = unstash(_args, _keys)
  if none63(__args13):
    return 0
  else:
    if one63(__args13):
      return hd(__args13)
    else:
      return join(["%mod"], __args13)

setenv("%", macro=__L_37__macro)
def __L_60__macro(a=None, *_args, **_keys):
  ____r165 = unstash(_args, _keys)
  __a7 = destash33(a, ____r165)
  ____id55 = ____r165
  __bs6 = cut(____id55, 0)
  if none63(__bs6):
    return True
  else:
    if one63(__bs6):
      return join(["%lt", __a7], __bs6)
    else:
      return ["%and", ["%lt", __a7, hd(__bs6)], join(["<"], __bs6)]

setenv("<", macro=__L_60__macro)
def __L_6061__macro(a=None, *_args, **_keys):
  ____r166 = unstash(_args, _keys)
  __a8 = destash33(a, ____r166)
  ____id56 = ____r166
  __bs7 = cut(____id56, 0)
  if none63(__bs7):
    return True
  else:
    if one63(__bs7):
      return join(["%le", __a8], __bs7)
    else:
      return ["%and", ["%le", __a8, hd(__bs7)], join(["<="], __bs7)]

setenv("<=", macro=__L_6061__macro)
def __L_61__macro(a=None, *_args, **_keys):
  ____r167 = unstash(_args, _keys)
  __a9 = destash33(a, ____r167)
  ____id57 = ____r167
  __bs8 = cut(____id57, 0)
  if none63(__bs8):
    return True
  else:
    if one63(__bs8):
      return join(["%eq", __a9], __bs8)
    else:
      return ["%and", ["%eq", __a9, hd(__bs8)], join(["="], __bs8)]

setenv("=", macro=__L_61__macro)
def __L_6261__macro(a=None, *_args, **_keys):
  ____r168 = unstash(_args, _keys)
  __a10 = destash33(a, ____r168)
  ____id58 = ____r168
  __bs9 = cut(____id58, 0)
  if none63(__bs9):
    return True
  else:
    if one63(__bs9):
      return join(["%ge", __a10], __bs9)
    else:
      return ["%and", ["%ge", __a10, hd(__bs9)], join([">="], __bs9)]

setenv(">=", macro=__L_6261__macro)
def __L_62__macro(a=None, *_args, **_keys):
  ____r169 = unstash(_args, _keys)
  __a11 = destash33(a, ____r169)
  ____id59 = ____r169
  __bs10 = cut(____id59, 0)
  if none63(__bs10):
    return True
  else:
    if one63(__bs10):
      return join(["%gt", __a11], __bs10)
    else:
      return ["%and", ["%gt", __a11, hd(__bs10)], join([">"], __bs10)]

setenv(">", macro=__L_62__macro)
def __not__macro(*_args, **_keys):
  __args14 = unstash(_args, _keys)
  if none63(__args14):
    return False
  else:
    if one63(__args14):
      return join(["%not"], __args14)
    else:
      return ["%and", ["%not", hd(__args14)], join(["not"], tl(__args14))]

setenv("not", macro=__not__macro)
def __and__macro(a=None, *_args, **_keys):
  ____r170 = unstash(_args, _keys)
  __a12 = destash33(a, ____r170)
  ____id60 = ____r170
  __bs111 = cut(____id60, 0)
  if nil63(__a12):
    return True
  else:
    if none63(__bs111):
      return __a12
    else:
      if one63(__bs111):
        return join(["%and", __a12], __bs111)
      else:
        return ["%and", __a12, join(["and"], __bs111)]

setenv("and", macro=__and__macro)
def __or__macro(a=None, *_args, **_keys):
  ____r171 = unstash(_args, _keys)
  __a13 = destash33(a, ____r171)
  ____id61 = ____r171
  __bs12 = cut(____id61, 0)
  if nil63(__a13):
    return False
  else:
    if none63(__bs12):
      return __a13
    else:
      if one63(__bs12):
        return join(["%or", __a13], __bs12)
      else:
        return ["%or", __a13, join(["or"], __bs12)]

setenv("or", macro=__or__macro)
def __break__macro(*_args, **_keys):
  __args15 = unstash(_args, _keys)
  return join(["%break"], __args15)

setenv("break", macro=__break__macro)
def __return__macro(*_args, **_keys):
  __args16 = unstash(_args, _keys)
  return join(["%return"], __args16)

setenv("return", macro=__return__macro)
def __while__macro(c=None, *_args, **_keys):
  ____r172 = unstash(_args, _keys)
  __c2 = destash33(c, ____r172)
  ____id62 = ____r172
  __body32 = cut(____id62, 0)
  return join(["%while", __c2], __body32)

setenv("while", macro=__while__macro)
def __do__macro(*_args, **_keys):
  __body33 = unstash(_args, _keys)
  return join(["%do"], __body33)

setenv("do", macro=__do__macro)
def __get__macro(*_args, **_keys):
  __args17 = unstash(_args, _keys)
  return join(["%get"], __args17)

setenv("get", macro=__get__macro)
def __idx__macro(*_args, **_keys):
  __args18 = unstash(_args, _keys)
  return join(["%idx"], __args18)

setenv("idx", macro=__idx__macro)
def __new__macro(*_args, **_keys):
  __args19 = unstash(_args, _keys)
  return join(["%new"], __args19)

setenv("new", macro=__new__macro)
def __typeof__macro(*_args, **_keys):
  __args20 = unstash(_args, _keys)
  return join(["%typeof"], __args20)

setenv("typeof", macro=__typeof__macro)
def __error__macro(*_args, **_keys):
  __args21 = unstash(_args, _keys)
  return join(["%error"], __args21)

setenv("error", macro=__error__macro)
def __throw__macro(*_args, **_keys):
  __args22 = unstash(_args, _keys)
  return join(["%throw"], __args22)

setenv("throw", macro=__throw__macro)
def __raise__macro(*_args, **_keys):
  __args23 = unstash(_args, _keys)
  return join(["%throw"], __args23)

setenv("raise", macro=__raise__macro)
def __is__macro(*_args, **_keys):
  __args24 = unstash(_args, _keys)
  ____x362 = object(["target", join(["="], __args24)])
  ____x362["py"] = join(["%is"], __args24)
  return ____x362

setenv("is", macro=__is__macro)
def __in__macro(*_args, **_keys):
  __args25 = unstash(_args, _keys)
  return join(["%in"], __args25)

setenv("in", macro=__in__macro)
def __as__macro(*_args, **_keys):
  __args26 = unstash(_args, _keys)
  return join(["%as"], __args26)

setenv("as", macro=__as__macro)
def __L_37expand_case__macro(x=None, *_args, **_keys):
  ____r173 = unstash(_args, _keys)
  __x367 = destash33(x, ____r173)
  ____id63 = ____r173
  __body34 = cut(____id63, 0)
  __e20 = None
  if atom63(__x367):
    __e20 = [__x367]
  else:
    __e20 = __x367
  ____id64 = __e20
  __a14 = has(____id64, 0)
  __bs13 = cut(____id64, 1)
  __e21 = None
  if none63(__bs13):
    __e21 = [["%literal"]]
  else:
    __e21 = __bs13
  return join(["%block", __a14], __e21, __body34)

setenv("%expand-case", macro=__L_37expand_case__macro)
def __L_37cases__macro(*_args, **_keys):
  __args27 = unstash(_args, _keys)
  if none63(__args27):
    return ["do"]
  else:
    if one63(__args27):
      return join(["%expand-case"], hd(__args27))
    else:
      __r174 = unique("r")
      def __f26(__x375=None):
        ____id65 = __x375
        __x376 = has(____id65, 0)
        __body35 = cut(____id65, 1)
        return ["%expand-case", __x376, ["%set", __r174, join(["%do"], __body35)]]
      return join(["with", __r174, "nil"], map(__f26, almost(__args27)), [join(["%expand-case"], last(__args27))])

setenv("%cases", macro=__L_37cases__macro)
def __try__macro(x=None, *_args, **_keys):
  ____r176 = unstash(_args, _keys)
  __x382 = destash33(x, ____r176)
  ____id66 = ____r176
  __cases = cut(____id66, 0)
  __fin = ["finally"]
  ____o21 = __cases
  ____i37 = None
  for ____i37 in indices(____o21):
    __x384 = ____o21[____i37]
    if hd63(__x384, "finally"):
      __fin = __x384
  __forms3 = []
  ____x387 = __cases
  ____i38 = 0
  while ____i38 < L_35(____x387):
    ____id67 = ____x387[____i38]
    __x388 = has(____id67, 0)
    __body36 = cut(____id67, 1)
    if __x388 == "finally":
      pass
    else:
      if __x388 == "except" and has(__body36, 1) == "as":
        ____id68 = __body36
        __kind = has(____id68, 0)
        ___ = has(____id68, 1)
        __name10 = has(____id68, 2)
        __body37 = cut(____id68, 3)
        add(__forms3, join([[__x388, ["%as", __kind, __name10]]], __body37))
      else:
        if __x388 == "except":
          ____id69 = __body36
          __kind1 = has(____id69, 0)
          __body38 = cut(____id69, 1)
          add(__forms3, join([[__x388, __kind1]], __body38))
        else:
          raise Exception("Unknown try clause")
    ____i38 = ____i38 + 1
  return join(["%cases", ["try", __x382]], __forms3, [__fin])

setenv("try", macro=__try__macro)
def __eif__macro(var=None, expr=None, fail=None, ok=None):
  if nil63(expr):
    expr = "nil"
  if nil63(fail):
    fail = "nil"
  if nil63(ok):
    ok = "nil"
  __ok63 = unique("ok?")
  return ["let", [[__ok63, var], ["guard", expr]], ["if", __ok63, ok, fail]]

setenv("eif", macro=__eif__macro)
def __errsafe__macro(x=None, L_else=None):
  if nil63(L_else):
    L_else = "nil"
  __ok4 = unique("ok")
  __v26 = unique("v")
  return ["let", [[__ok4, __v26], ["guard", x]], ["if", __ok4, __v26, L_else]]

setenv("errsafe", macro=__errsafe__macro)
def __dbg__macro():
  ____x405 = object(["target", ["do"]])
  ____x405["py"] = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]]
  return ____x405

setenv("dbg", macro=__dbg__macro)
def prcode(form=None):
  return L_print(L_str(expand(["%set", "lumen-result", form])))

def __see__macro(form=None):
  __form3 = expand(form)
  L_print(compile(expand(["%set", "lumen-result", __form3])))
  return __form3

setenv("see", macro=__see__macro)
def __L_37dollar__macro(x=None):
  return ["%id", x]

setenv("%dollar", macro=__L_37dollar__macro)
def __L_37ampersand__macro(x=None):
  return ["%ptr", x]

setenv("%ampersand", macro=__L_37ampersand__macro)
import reader
import compiler
import system
from compiler import *
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
  __r188 = []
  __mods = []
  ____x415 = dir(x)
  ____i39 = 0
  while ____i39 < L_35(____x415):
    __k20 = ____x415[____i39]
    if not( clip(__k20, 0, 2) == "__"):
      __v27 = getattr(x, __k20)
      if function63(__v27):
        add(__r188, __k20)
      else:
        if module63(__v27):
          add(__mods, cat(".", __k20))
        else:
          add(__r188, [__k20, __v27])
    ____i39 = ____i39 + 1
  ____x417 = __mods
  ____i40 = 0
  while ____i40 < L_35(____x417):
    __x418 = ____x417[____i40]
    add(__r188, __x418)
    ____i40 = ____i40 + 1
  return __r188

from io import StringIO
def pp_to_string(x=None):
  __r190 = StringIO()
  pp(x, __r190)
  return __r190.getvalue()

def lines(x=None):
  return split(x, "\n")

def get_indentation(s=None):
  __r193 = ""
  __i41 = 0
  while __i41 < L_35(s):
    __c3 = char(s, __i41)
    if __c3 == " ":
      __r193 = cat(__r193, __c3)
    __i41 = __i41 + 1
  return __r193

def strip_outer(s=None, lh=None, rh=None):
  if string_starts63(s, lh) and string_ends63(s, rh):
    return clip(clip(s, 0, L_35(s) - L_35(rh)), L_35(lh))
  else:
    return s

def simple_id63(x=None):
  def __f27():
    try:
      return [True, reader.read_string(x)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id70 = __f27()
  ____ok5 = has(____id70, 0)
  ____v28 = has(____id70, 1)
  __e22 = None
  if ____ok5:
    __e22 = ____v28
  else:
    __e22 = None
  __r196 = __e22
  if __r196 == x:
    return __r196

def pp_obj(x=None):
  s = pp_to_string(entries(x))
  s = s.rstrip()
  s = strip_outer(s, "[", "]")
  s = cat(" ", s)
  ____x421 = lines(s)
  ____i42 = 0
  while ____i42 < L_35(____x421):
    __x422 = ____x421[____i42]
    __ind = get_indentation(__x422)
    __x422 = __x422.rstrip(",")
    __id71 = simple_id63(strip_outer(__x422.strip(), "'", "'"))
    __e23 = None
    if __id71:
      __e23 = cat(__ind, __id71)
    else:
      __e23 = __x422
    L_print(__e23)
    ____i42 = ____i42 + 1
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
  def __f28():
    try:
      __x425 = x.__doc__
      __e24 = None
      if string63(__x425):
        __e24 = __x425
      else:
        __e24 = L_str(__x425)
      return [True, __e24]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id72 = __f28()
  ____ok6 = has(____id72, 0)
  ____v29 = has(____id72, 1)
  if ____ok6:
    return ____v29
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
  __form4 = eval_self_form(form)
  def __f29():
    try:
      return [True, compiler.eval(__form4)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id73 = __f29()
  __ok7 = has(____id73, 0)
  __v30 = has(____id73, 1)
  __ex = has(____id73, 2)
  if not __ok7:
    return print_exception(__v30, __ex)
  else:
    if is63(__v30):
      return toplevel_print(__v30)

def read_toplevel(L_str=None, more=None):
  __s2 = reader.stream(L_str, more)
  def __f30():
    try:
      return [True, reader.read_all(__s2)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id74 = __f30()
  ____ok8 = has(____id74, 0)
  ____v31 = has(____id74, 1)
  __e25 = None
  if ____ok8:
    __e25 = ____v31
  else:
    __e25 = None
  __x433 = __e25
  if __x433 == more:
    return more
  else:
    if nil63(__x433):
      return __x433
    else:
      if one63(__x433):
        return hd(__x433)
      else:
        return __x433

def rep(L_str=None):
  __v32 = eval(read_toplevel(L_str))
  if is63(__v32):
    return toplevel_print(__v32)

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
    __form5 = read_toplevel(o["buf"], __more)
    if not( __form5 == __more):
      eval_print(__form5)
      return reset()
  reset()
  while True:
    __s3 = system.read_line(ctrl_c)
    if not( __s3 == ctrl_c):
      if is63(__s3):
        rep1(cat(__s3, "\n"))
      else:
        break

def read_file(path=None):
  return system.read_file(path)

def read_from_file(path=None):
  __s4 = reader.stream(read_file(path))
  return reader.read_all(__s4)

def expand_file(path=None):
  __body39 = read_from_file(path)
  return compiler.expand(join(["do"], __body39))

def compile_file(path=None):
  __form6 = expand_file(path)
  return compiler.compile(__form6, stmt=True)

def load(path=None):
  ____prev1 = has(setenv("target", toplevel=True), "value")
  setenv("target", toplevel=True)["value"] = "py"
  def __f31():
    try:
      ____prev2 = has(setenv("indent-level", toplevel=True), "value")
      setenv("indent-level", toplevel=True)["value"] = 0
      def __f32():
        try:
          return [True, compile_file(path)]
        except:
          import sys
          e = sys.exc_info()
          return [False, e[1], e]
      ____id76 = __f32()
      ____ok10 = has(____id76, 0)
      ____x440 = has(____id76, 1)
      setenv("indent-level", toplevel=True)["value"] = ____prev2
      __e26 = None
      if ____ok10:
        __e26 = ____x440
      else:
        raise ____x440
        __e26 = None
      return [True, __e26]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id75 = __f31()
  ____ok9 = has(____id75, 0)
  ____x437 = has(____id75, 1)
  setenv("target", toplevel=True)["value"] = ____prev1
  __e27 = None
  if ____ok9:
    __e27 = ____x437
  else:
    raise ____x437
    __e27 = None
  __code = __e27
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
      __expr5 = None
      __argv = system.argv
      __i43 = 0
      while __i43 < L_35(__argv):
        __a15 = __argv[__i43]
        if __a15 == "-c" or (__a15 == "-o" or (__a15 == "-t" or __a15 == "-e")):
          if __i43 == edge(__argv):
            L_print(cat("missing argument for ", __a15))
          else:
            __i43 = __i43 + 1
            __val1 = __argv[__i43]
            if __a15 == "-c":
              __input = __val1
            else:
              if __a15 == "-o":
                __output = __val1
              else:
                if __a15 == "-t":
                  __target1 = __val1
                else:
                  if __a15 == "-e":
                    __expr5 = __val1
        else:
          if not( "-" == char(__a15, 0)):
            add(__pre, __a15)
        __i43 = __i43 + 1
      ____x443 = __pre
      ____i44 = 0
      while ____i44 < L_35(____x443):
        __file = ____x443[____i44]
        run_file(__file)
        ____i44 = ____i44 + 1
      if nil63(__input):
        if __expr5:
          return rep(__expr5)
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
