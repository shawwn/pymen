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
    return number63(k) and (k >= 0 and k < len(l))

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
    __n9 = edge(l)
    if __n9 >= 0:
      __r42 = l[__n9]
      del l[__n9]
      return __r42

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
  __r47 = {}
  ____x4 = __ls
  ____i8 = 0
  while ____i8 < L_35(____x4):
    __l3 = ____x4[____i8]
    if __l3:
      __n10 = L_35(__r47)
      ____o5 = __l3
      __k5 = None
      for __k5 in indices(____o5):
        __v6 = ____o5[__k5]
        if number63(__k5):
          __k5 = __k5 + __n10
        else:
          __l3 = object(__l3)
        __r47[__k5] = __v6
    ____i8 = ____i8 + 1
  return __r47

def find(f=None, t=None):
  ____o6 = t
  ____i10 = None
  for ____i10 in indices(____o6):
    __x5 = ____o6[____i10]
    __y = f(__x5)
    if __y:
      return __y

def first(f=None, l=None):
  ____x6 = l
  ____i11 = 0
  while ____i11 < L_35(____x6):
    __x7 = ____x6[____i11]
    __y1 = f(__x7)
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
  ____x9 = x
  ____i13 = 0
  while ____i13 < L_35(____x9):
    __v7 = ____x9[____i13]
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
  __r58 = ""
  __c = ""
  ____x10 = x
  ____i15 = 0
  while ____i15 < L_35(____x10):
    __v9 = ____x10[____i15]
    __e17 = None
    if f:
      __e17 = f(__v9)
    else:
      __e17 = __v9
    __y4 = __e17
    if is63(__y4):
      __r58 = cat(__r58, __c, __y4)
      __c = sep or ""
    ____i15 = ____i15 + 1
  return __r58

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
    __x11 = ____o9[____i17]
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
    ____r86 = None
    try:
      return int(s)
    except ValueError:
      ____r86 = None
    finally:
      pass
    ____r87 = None
    try:
      return float(s)
    except ValueError:
      ____r87 = None
    finally:
      pass
    return ____r87

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
                      __l5 = stack or []
                      add(__l5, x)
                      ____o15 = x
                      __k13 = None
                      for __k13 in indices(____o15):
                        __v16 = ____o15[__k13]
                        if number63(__k13):
                          __xs11[__k13] = L_str(__v16, repr, __l5)
                        else:
                          add(__ks, [cat(__k13, ":"), L_str(__v16, repr, __l5)])
                      def __f18(__x14=None, __x15=None):
                        ____id = __x14
                        __a2 = has(____id, 0)
                        ____id1 = __x15
                        __b2 = has(____id1, 0)
                        return __a2 < __b2
                      sort(__ks, __f18)
                      drop(__l5)
                      ____x16 = __xs11
                      ____i28 = 0
                      while ____i28 < L_35(____x16):
                        __v17 = ____x16[____i28]
                        __s = cat(__s, __sp, __v17)
                        __sp = " "
                        ____i28 = ____i28 + 1
                      ____x17 = __ks
                      ____i29 = 0
                      while ____i29 < L_35(____x17):
                        ____id2 = ____x17[____i29]
                        __k14 = has(____id2, 0)
                        __v18 = has(____id2, 1)
                        __s = cat(__s, __sp, __k14, " ", __v18)
                        __sp = " "
                        ____i29 = ____i29 + 1
                      return cat(__s, ")")

def apply(f=None, args=None):
  __args = stash(args)
  return f(*__args)

def call(f=None, *_args, **_keys):
  ____r94 = unstash(list(_args), _keys)
  __f1 = destash33(f, ____r94)
  ____id3 = ____r94
  __args12 = cut(____id3, 0)
  return apply(__f1, __args12)

def setenv(k=None, *_args, **_keys):
  ____r95 = unstash(list(_args), _keys)
  __k15 = destash33(k, ____r95)
  ____id4 = ____r95
  __keys = cut(____id4, 0)
  if string63(__k15):
    __e24 = None
    if has63(__keys, "toplevel"):
      __e24 = hd(environment)
    else:
      __e24 = last(environment)
    __frame = __e24
    __e25 = None
    if has63(__frame, __k15):
      __e25 = __frame[__k15]
    else:
      __e25 = {}
    __entry = __e25
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
      return ["%set", join(["%get"], tl(__lh1)), __rh1]
    else:
      return ["%set", __lh1, __rh1]
  return join(["%do"], map(__f22, pair(__args3)))

setenv("set", macro=__f21)
def __f23(l=None, i=None):
  if has(setenv("target", toplevel=True), "value") == "lua" and number63(i):
    i = i + 1
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      i = ["+", i, 1]
  return ["%get", l, i]

setenv("at", macro=__f23)
def __f24(place=None):
  if has(setenv("target", toplevel=True), "value") == "lua":
    return ["set", place, "nil"]
  else:
    return ["%delete", place]

setenv("wipe", macro=__f24)
def __f25(*_args, **_keys):
  __body2 = unstash(list(_args), _keys)
  if L_35(__body2) > 2 and (__body2[1] == "for" and __body2[3] == "in"):
    ____id10 = __body2
    __expr2 = has(____id10, 0)
    __body3 = cut(____id10, 1)
    __comps1 = []
    __cond1 = None
    while L_35(__body3) > 2 and (__body3[0] == "for" and __body3[2] == "in"):
      ____id11 = __body3
      ___for1 = has(____id11, 0)
      __names1 = has(____id11, 1)
      ___in1 = has(____id11, 2)
      __l8 = has(____id11, 3)
      __body12 = cut(____id11, 4)
      add(__comps1, [__names1, __l8])
      __body3 = __body12
    if hd(__body3) == "if":
      ____id12 = __body3
      ___if1 = has(____id12, 0)
      __expr3 = has(____id12, 1)
      __cond1 = __expr3
    return ["%list", __expr2, __comps1, __cond1]
  else:
    __x51 = unique("x")
    __l9 = {}
    __forms1 = []
    ____o18 = __body2
    __k19 = None
    for __k19 in indices(____o18):
      __v21 = ____o18[__k19]
      if number63(__k19):
        __l9[__k19] = __v21
      else:
        add(__forms1, ["%set", ["%get", __x51, ["quote", __k19]], __v21])
    if some63(__forms1):
      return join(["let", __x51, ["object", join(["%array"], __l9)]], __forms1, [__x51])
    else:
      return join(["%array"], __l9)

setenv("list", macro=__f25)
def __f26(*_args, **_keys):
  __branches1 = unstash(list(_args), _keys)
  return hd(expand_if(__branches1))

setenv("if", macro=__f26)
def __f27(expr=None, *_args, **_keys):
  ____r110 = unstash(list(_args), _keys)
  __expr5 = destash33(expr, ____r110)
  ____id15 = ____r110
  __e26 = None
  if nil63(has(____id15, "cmp")):
    __e26 = "="
  else:
    __e26 = has(____id15, "cmp")
  __cmp1 = __e26
  __clauses1 = cut(____id15, 0)
  __x71 = unique("x")
  def __f28(_=None):
    return [__cmp1, _, __x71]
  __eq1 = __f28
  def __f29(__x73=None):
    ____id16 = __x73
    __a4 = has(____id16, 0)
    __b4 = has(____id16, 1)
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
  __cl1 = __f29
  return ["let", __x71, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]

setenv("case", macro=__f27)
def __f30(x=None, *_args, **_keys):
  ____r114 = unstash(list(_args), _keys)
  __x84 = destash33(x, ____r114)
  ____id18 = ____r114
  __values1 = cut(____id18, 0)
  return join(["case", __x84, __values1, True, False], props(__values1))

setenv("of", macro=__f30)
def __f31(cond=None, *_args, **_keys):
  ____r116 = unstash(list(_args), _keys)
  __cond3 = destash33(cond, ____r116)
  ____id20 = ____r116
  __body5 = cut(____id20, 0)
  return ["%if", __cond3, join(["%do"], __body5)]

setenv("when", macro=__f31)
def __f32(cond=None, *_args, **_keys):
  ____r118 = unstash(list(_args), _keys)
  __cond5 = destash33(cond, ____r118)
  ____id22 = ____r118
  __body7 = cut(____id22, 0)
  return ["%if", ["%not", __cond5], join(["%do"], __body7)]

setenv("unless", macro=__f32)
def __f33(*_args, **_keys):
  __body10 = unstash(list(_args), _keys)
  if L_35(__body10) > 2 and (__body10[1] == "for" and __body10[3] == "in"):
    ____id26 = __body10
    __expr8 = has(____id26, 0)
    __body111 = cut(____id26, 1)
    __comps3 = []
    __cond7 = None
    while L_35(__body111) > 2 and (__body111[0] == "for" and __body111[2] == "in"):
      ____id27 = __body111
      ___for3 = has(____id27, 0)
      __names3 = has(____id27, 1)
      ___in3 = has(____id27, 2)
      __l111 = has(____id27, 3)
      __body14 = cut(____id27, 4)
      add(__comps3, [__names3, __l111])
      __body111 = __body14
    if hd(__body111) == "if":
      ____id28 = __body111
      ___if3 = has(____id28, 0)
      __expr9 = has(____id28, 1)
      __cond7 = __expr9
    if list63(__expr8) and hd63(__expr8, ","):
      __expr8 = join([":"], tl(__expr8))
    ____x102 = object(["%list", __expr8, __comps3, __cond7])
    ____x102["kind"] = "object"
    return ____x102
  else:
    def __f34(x=None):
      return x
    return join(["%object"], mapo(__f34, __body10))

setenv("obj", macro=__f33)
def __f35(bs=None, *_args, **_keys):
  ____r122 = unstash(list(_args), _keys)
  __bs11 = destash33(bs, ____r122)
  ____id33 = ____r122
  __body131 = cut(____id33, 0)
  if atom63(__bs11) or hd63(__bs11, ","):
    return join(["let", [__bs11, hd(__body131)]], tl(__body131))
  else:
    if none63(__bs11):
      return join(["%do"], __body131)
    else:
      ____id34 = __bs11
      __lh3 = has(____id34, 0)
      __rh3 = has(____id34, 1)
      __bs21 = cut(____id34, 2)
      ____id35 = bind(__lh3, __rh3)
      __id36 = has(____id35, 0)
      __val1 = has(____id35, 1)
      __bs12 = cut(____id35, 2)
      __renames1 = []
      if not id_literal63(__id36):
        __id121 = unique(__id36)
        __renames1 = [__id36, __id121]
        __id36 = __id121
      return ["%do", ["%local", __id36, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body131)]]

setenv("let", macro=__f35)
def __f36(x=None, v=None, *_args, **_keys):
  ____r124 = unstash(list(_args), _keys)
  __x127 = destash33(x, ____r124)
  __v23 = destash33(v, ____r124)
  ____id38 = ____r124
  __body15 = cut(____id38, 0)
  if __v23 == "as":
    return join(["%with", ["%as", __x127, hd(__body15)]], tl(__body15))
  else:
    if not atom63(__x127) or has(__body15, "async"):
      return join(["%with", __x127, __v23], __body15)
    else:
      return join(["let", [__x127, __v23]], __body15, [__x127])

setenv("with", macro=__f36)
def __f37(x=None, v=None, *_args, **_keys):
  ____r126 = unstash(list(_args), _keys)
  __x140 = destash33(x, ____r126)
  __v25 = destash33(v, ____r126)
  ____id40 = ____r126
  __body17 = cut(____id40, 0)
  __y6 = unique("y")
  return ["let", __y6, __v25, ["when", ["yes", __y6], join(["let", [__x140, __y6]], __body17)]]

setenv("let-when", macro=__f37)
def __f38(name=None, args=None, *_args, **_keys):
  ____r128 = unstash(list(_args), _keys)
  __name1 = destash33(name, ____r128)
  __args5 = destash33(args, ____r128)
  ____id42 = ____r128
  __body19 = cut(____id42, 0)
  ____x149 = object(["setenv", ["quote", __name1]])
  ____x149["macro"] = join(["fn", __args5], __body19)
  __form1 = ____x149
  eval(__form1)
  return __form1

setenv("define-macro", macro=__f38)
def __f39(name=None, args=None, *_args, **_keys):
  ____r130 = unstash(list(_args), _keys)
  __name3 = destash33(name, ____r130)
  __args7 = destash33(args, ____r130)
  ____id44 = ____r130
  __body21 = cut(____id44, 0)
  ____x155 = object(["setenv", ["quote", __name3]])
  ____x155["special"] = join(["fn", __args7], __body21)
  __form3 = join(____x155, props(__body21))
  eval(__form3)
  return __form3

setenv("define-special", macro=__f39)
def __f40(name=None, expansion=None):
  setenv(name, symbol=expansion)
  ____x161 = object(["setenv", ["quote", name]])
  ____x161["symbol"] = ["quote", expansion]
  return ____x161

setenv("define-symbol", macro=__f40)
def __f41(__x169=None, *_args, **_keys):
  ____r134 = unstash(list(_args), _keys)
  ____x169 = destash33(__x169, ____r134)
  ____id47 = ____x169
  __char1 = has(____id47, 0)
  __s2 = has(____id47, 1)
  ____id48 = ____r134
  __body23 = cut(____id48, 0)
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body23)]

setenv("define-reader", macro=__f41)
def __f42(name=None, x=None, *_args, **_keys):
  ____r136 = unstash(list(_args), _keys)
  __name5 = destash33(name, ____r136)
  __x177 = destash33(x, ____r136)
  ____id50 = ____r136
  __body25 = cut(____id50, 0)
  setenv(__name5, variable=True)
  if some63(__body25):
    return join(["%local-function", __name5], bind42(__x177, __body25), props(__body25))
  else:
    return join(["%local", __name5, __x177], props(__body25))

setenv("define", macro=__f42)
def __f43(name=None, x=None, *_args, **_keys):
  ____r138 = unstash(list(_args), _keys)
  __name7 = destash33(name, ____r138)
  __x183 = destash33(x, ____r138)
  ____id52 = ____r138
  __body27 = cut(____id52, 0)
  setenv(__name7, toplevel=True, variable=True)
  if some63(__body27):
    return join(["%global-function", __name7], bind42(__x183, __body27), props(__body27))
  else:
    return join(["set", __name7, __x183], props(__body27))

setenv("define-global", macro=__f43)
def __f44(x=None):
  ____x190 = object(["setenv", x])
  ____x190["toplevel"] = True
  return ["has", ____x190, ["quote", "value"]]

setenv("get-value", macro=__f44)
def __f45(name=None, x=None):
  ____x201 = object(["setenv", ["quote", name]])
  ____x201["toplevel"] = True
  ____x201["value"] = either(x, ["get-value", ["quote", name]])
  return ["%do", ____x201, ["define-symbol", name, ["get-value", ["quote", name]]]]

setenv("define-constant", macro=__f45)
def __f46(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]

setenv("define-variable", macro=__f46)
def __f47(x=None, *_args, **_keys):
  ____r147 = unstash(list(_args), _keys)
  __x229 = destash33(x, ____r147)
  ____id54 = ____r147
  __body29 = cut(____id54, 0)
  __ok1 = unique("ok")
  __r148 = unique("r")
  ____x230 = object(["target", ["try", __x229, join(["finally"], __body29)]])
  ____x230["lua"] = join(["let", [[__ok1, __r148], ["guard", __x229]]], __body29, [["if", __ok1, __r148, ["throw", __r148]]])
  return ____x230

setenv("after", macro=__f47)
def __f48(*_args, **_keys):
  __body31 = unstash(list(_args), _keys)
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body31), ["drop", "environment"]]]

setenv("with-frame", macro=__f48)
def __f49(*_args, **_keys):
  __body33 = unstash(list(_args), _keys)
  __forms3 = []
  ____o20 = __body33
  __k22 = None
  for __k22 in indices(____o20):
    __v27 = ____o20[__k22]
    if not number63(__k22):
      ____x256 = object(["setenv", ["quote", __k22]])
      ____x256["value"] = __v27
      add(__forms3, ____x256)
  return join(["with-frame"], __forms3)

setenv("with-values", macro=__f49)
def __f50(__x263=None, *_args, **_keys):
  ____r150 = unstash(list(_args), _keys)
  ____x263 = destash33(__x263, ____r150)
  ____id57 = ____x263
  __names5 = has(____id57, 0)
  ____id58 = ____r150
  __body35 = cut(____id58, 0)
  __x264 = unique("x")
  ____x267 = object(["setenv", __x264])
  ____x267["variable"] = True
  return join(["with-frame", ["each", __x264, __names5, ____x267]], __body35)

setenv("with-bindings", macro=__f50)
def __f51(definitions=None, *_args, **_keys):
  ____r155 = unstash(list(_args), _keys)
  __definitions1 = destash33(definitions, ____r155)
  ____id60 = ____r155
  __body37 = cut(____id60, 0)
  add(environment, {})
  ____r157 = None
  try:
    def __f52(m=None):
      return macroexpand(join(["define-macro"], m))
    map(__f52, __definitions1)
    ____r157 = join(["%do"], macroexpand(__body37))
  finally:
    drop(environment)
  return ____r157

setenv("let-macro", macro=__f51)
def __f53(expansions=None, *_args, **_keys):
  ____r163 = unstash(list(_args), _keys)
  __expansions1 = destash33(expansions, ____r163)
  ____id63 = ____r163
  __body39 = cut(____id63, 0)
  add(environment, {})
  ____r165 = None
  try:
    def __f54(__x275=None):
      ____id64 = __x275
      __name9 = has(____id64, 0)
      __exp1 = has(____id64, 1)
      return macroexpand(["define-symbol", __name9, __exp1])
    map(__f54, pair(__expansions1))
    ____r165 = join(["%do"], macroexpand(__body39))
  finally:
    drop(environment)
  return ____r165

setenv("let-symbol", macro=__f53)
def __f55(names=None, *_args, **_keys):
  ____r169 = unstash(list(_args), _keys)
  __names7 = destash33(names, ____r169)
  ____id66 = ____r169
  __body41 = cut(____id66, 0)
  def __f56(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f56, __names7)
  return join(["let", apply(join, __bs3)], __body41)

setenv("let-unique", macro=__f55)
def __f57(args=None, *_args, **_keys):
  ____r172 = unstash(list(_args), _keys)
  __args9 = destash33(args, ____r172)
  ____id68 = ____r172
  __body43 = cut(____id68, 0)
  return join(["%function"], bind42(__args9, __body43), props(__body43))

setenv("fn", macro=__f57)
def __f58(f=None, *_args, **_keys):
  ____r174 = unstash(list(_args), _keys)
  __f3 = destash33(f, ____r174)
  ____id70 = ____r174
  __args111 = cut(____id70, 0)
  if L_35(__args111) > 1:
    return ["%call", "apply", __f3, ["join", join(["list"], almost(__args111)), last(__args111), join(["list"], props(__args111))]]
  else:
    if props63(__args111):
      return ["%call", "apply", __f3, join(["join"], __args111, [join(["list"], props(__args111))])]
    else:
      return join(["%call", "apply", __f3], __args111)

setenv("apply", macro=__f58)
def __f59(expr=None):
  ____x336 = object(["target", [["%function", join(), ["%try", ["list", True, expr]]]]])
  ____x348 = object(["obj"])
  ____x348["stack"] = [["idx", "debug", "traceback"]]
  ____x348["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
  ____x336["lua"] = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x348]]]]
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x336]

setenv("guard", macro=__f59)
def __f60(x=None, t=None, *_args, **_keys):
  ____r178 = unstash(list(_args), _keys)
  __x375 = destash33(x, ____r178)
  __t4 = destash33(t, ____r178)
  ____id73 = ____r178
  __body45 = cut(____id73, 0)
  __o22 = unique("o")
  __n30 = unique("n")
  __i36 = unique("i")
  __e27 = None
  if atom63(__x375):
    __e27 = [__i36, __x375]
  else:
    __e28 = None
    if L_35(__x375) > 1:
      __e28 = __x375
    else:
      __e28 = [__i36, hd(__x375)]
    __e27 = __e28
  ____id74 = __e27
  __k24 = has(____id74, 0)
  __v29 = has(____id74, 1)
  ____x381 = object(["target", __o22])
  ____x381["py"] = ["indices", __o22]
  __e29 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e29 = __body45
  else:
    __e29 = [join(["let", __k24, ["if", ["numeric?", __k24], ["parseInt", __k24], __k24]], __body45)]
  return ["let", [__o22, __t4, __k24, "nil"], join(["%for", ____x381, __k24], props(__body45), [join(["let", [__v29, ["%get", __o22, __k24]]], __e29)])]

setenv("each", macro=__f60)
def __f61(i=None, to=None, *_args, **_keys):
  ____r180 = unstash(list(_args), _keys)
  __i38 = destash33(i, ____r180)
  __to1 = destash33(to, ____r180)
  ____id76 = ____r180
  __body47 = cut(____id76, 0)
  if __to1 == "in":
    return join(["%for", hd(__body47), __i38, join(["%do"], tl(__body47))], props(__body47))
  else:
    return ["let", __i38, 0, join(["while", ["<", __i38, __to1]], __body47, [["inc", __i38]])]

setenv("for", macro=__f61)
def __f62(v=None, t=None, *_args, **_keys):
  ____r182 = unstash(list(_args), _keys)
  __v31 = destash33(v, ____r182)
  __t6 = destash33(t, ____r182)
  ____id78 = ____r182
  __body49 = cut(____id78, 0)
  __x414 = unique("x")
  __i40 = unique("i")
  return ["let", [__x414, __t6], ["for", __i40, ["#", __x414], join(["let", [__v31, ["at", __x414, __i40]]], __body49)]]

setenv("step", macro=__f62)
def __f63(*_args, **_keys):
  __xs13 = unstash(list(_args), _keys)
  __l13 = {}
  ____o24 = __xs13
  ____i42 = None
  for ____i42 in indices(____o24):
    __x424 = ____o24[____i42]
    __l13[__x424] = True
  return join(["obj"], __l13)

setenv("set-of", macro=__f63)
def __f64(x=None):
  return ["=", "target", x]

setenv("target?", macro=__f64)
def __f65(*_args, **_keys):
  __clauses3 = unstash(list(_args), _keys)
  if has63(__clauses3, has(setenv("target", toplevel=True), "value")):
    return __clauses3[has(setenv("target", toplevel=True), "value")]
  else:
    return hd(__clauses3)

setenv("target", macro=__f65)
def __f66():
  return ["quote", has(setenv("target", toplevel=True), "value")]

setenv("language", macro=__f66)
def __f67(a=None, *_args, **_keys):
  ____r188 = unstash(list(_args), _keys)
  __a6 = destash33(a, ____r188)
  ____id80 = ____r188
  __bs5 = cut(____id80, 0)
  return ["set", __a6, join(["join", __a6], __bs5)]

setenv("join!", macro=__f67)
def __f68(a=None, *_args, **_keys):
  ____r190 = unstash(list(_args), _keys)
  __a8 = destash33(a, ____r190)
  ____id82 = ____r190
  __bs7 = cut(____id82, 0)
  return ["set", __a8, join(["cat", __a8], __bs7)]

setenv("cat!", macro=__f68)
def __f69(n=None, by=None):
  __e30 = None
  if nil63(by):
    __e30 = 1
  else:
    __e30 = by
  return ["set", n, ["+", n, __e30]]

setenv("inc", macro=__f69)
def __f70(n=None, by=None):
  __e31 = None
  if nil63(by):
    __e31 = 1
  else:
    __e31 = by
  return ["set", n, ["-", n, __e31]]

setenv("dec", macro=__f70)
def __f71(form=None):
  __x451 = unique("x")
  return ["%do", ["inc", "indent-level"], ["with", __x451, form, ["dec", "indent-level"]]]

setenv("with-indent", macro=__f71)
def __f72(*_args, **_keys):
  __names9 = unstash(list(_args), _keys)
  def __f73(k=None):
    if k == compile(k):
      return ["%set", ["idx", "exports", k], k]
    else:
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]]
  __forms5 = map(__f73, __names9)
  if has(setenv("target", toplevel=True), "value") == "js":
    return join(["%do"], __forms5)
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]])

setenv("export", macro=__f72)
def __f74(*_args, **_keys):
  __body51 = unstash(list(_args), _keys)
  return eval(join(["%do"], __body51))

setenv("when-compiling", macro=__f74)
def __f75(*_args, **_keys):
  __body53 = unstash(list(_args), _keys)
  __form5 = join(["%do"], __body53)
  eval(__form5)
  return __form5

setenv("during-compilation", macro=__f75)
def __f76(name=None, *_args, **_keys):
  ____r200 = unstash(list(_args), _keys)
  __name11 = destash33(name, ____r200)
  ____id84 = ____r200
  __body55 = cut(____id84, 0)
  return join(["define-global", __name11], __body55)

setenv("def", macro=__f76)
def __f77(name=None, *_args, **_keys):
  ____r202 = unstash(list(_args), _keys)
  __name13 = destash33(name, ____r202)
  ____id86 = ____r202
  __body57 = cut(____id86, 0)
  return join(["define-macro", __name13], __body57)

setenv("mac", macro=__f77)
def __f78(name=None, *_args, **_keys):
  ____r204 = unstash(list(_args), _keys)
  __name15 = destash33(name, ____r204)
  ____id88 = ____r204
  __value1 = cut(____id88, 0)
  return join(["def", __name15], __value1)

setenv("defconst", macro=__f78)
def __f79(name=None):
  ____x503 = object(["target"])
  ____x503["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x503["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x503["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x503

setenv("undefined?", macro=__f79)
def __f80(name=None, *_args, **_keys):
  ____r208 = unstash(list(_args), _keys)
  __name17 = destash33(name, ____r208)
  ____id90 = ____r208
  __value3 = cut(____id90, 0)
  ____x519 = object(["target"])
  ____x519["py"] = ["global", __name17]
  return ["when", ["undefined?", __name17], ____x519, join(["defconst", __name17], __value3)]

setenv("defvar", macro=__f80)
def __f81(keyword=None, *_args, **_keys):
  ____r210 = unstash(list(_args), _keys)
  __keyword1 = destash33(keyword, ____r210)
  ____id92 = ____r210
  __body59 = cut(____id92, 0)
  ____x523 = object([__keyword1])
  ____x523["async"] = True
  return join(____x523, __body59)

setenv("async", macro=__f81)
def __f82(name=None):
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]]

setenv("%read-from-file", macro=__f82)
def __f83(name=None):
  return ["getenv", ["quote", name], ["quote", "value"]]

setenv("the", macro=__f83)
def __f84(a=None, *_args, **_keys):
  ____r216 = unstash(list(_args), _keys)
  __a10 = destash33(a, ____r216)
  ____id94 = ____r216
  __bs9 = cut(____id94, 0)
  if nil63(__a10):
    return ""
  else:
    if none63(__bs9):
      return __a10
    else:
      if one63(__bs9):
        ____x547 = object(["target", join(["%cat", __a10], __bs9)])
        ____x547["py"] = join(["%call", "cat", __a10], __bs9)
        return ____x547
      else:
        ____x550 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]])
        ____x550["py"] = join(["%call", "cat", __a10], __bs9)
        return ____x550

setenv("cat", macro=__f84)
def __f85(*_args, **_keys):
  __args13 = unstash(list(_args), _keys)
  if none63(__args13):
    return 0
  else:
    if one63(__args13):
      return hd(__args13)
    else:
      return join(["%add"], __args13)

setenv("+", macro=__f85)
def __f86(*_args, **_keys):
  __args15 = unstash(list(_args), _keys)
  if none63(__args15):
    return 0
  else:
    if one63(__args15):
      return ["%unm", hd(__args15)]
    else:
      return join(["%sub"], __args15)

setenv("-", macro=__f86)
def __f87(*_args, **_keys):
  __args17 = unstash(list(_args), _keys)
  if none63(__args17):
    return 1
  else:
    if one63(__args17):
      return hd(__args17)
    else:
      return join(["%mul"], __args17)

setenv("*", macro=__f87)
def __f88(*_args, **_keys):
  __args19 = unstash(list(_args), _keys)
  if none63(__args19):
    return 1
  else:
    if one63(__args19):
      return hd(__args19)
    else:
      return join(["%div"], __args19)

setenv("/", macro=__f88)
def __f89(*_args, **_keys):
  __args21 = unstash(list(_args), _keys)
  if none63(__args21):
    return 1
  else:
    if one63(__args21):
      return hd(__args21)
    else:
      return join(["%idiv"], __args21)

setenv("//", macro=__f89)
def __f90(*_args, **_keys):
  __args23 = unstash(list(_args), _keys)
  if none63(__args23):
    return 0
  else:
    if one63(__args23):
      return hd(__args23)
    else:
      return join(["%mod"], __args23)

setenv("%", macro=__f90)
def __f91(a=None, *_args, **_keys):
  ____r218 = unstash(list(_args), _keys)
  __a12 = destash33(a, ____r218)
  ____id96 = ____r218
  __bs111 = cut(____id96, 0)
  if none63(__bs111):
    return True
  else:
    if one63(__bs111):
      return join(["%lt", __a12], __bs111)
    else:
      return ["%and", ["%lt", __a12, hd(__bs111)], join(["<"], __bs111)]

setenv("<", macro=__f91)
def __f92(a=None, *_args, **_keys):
  ____r220 = unstash(list(_args), _keys)
  __a14 = destash33(a, ____r220)
  ____id98 = ____r220
  __bs13 = cut(____id98, 0)
  if none63(__bs13):
    return True
  else:
    if one63(__bs13):
      return join(["%le", __a14], __bs13)
    else:
      return ["%and", ["%le", __a14, hd(__bs13)], join(["<="], __bs13)]

setenv("<=", macro=__f92)
def __f93(a=None, *_args, **_keys):
  ____r222 = unstash(list(_args), _keys)
  __a16 = destash33(a, ____r222)
  ____id100 = ____r222
  __bs15 = cut(____id100, 0)
  if none63(__bs15):
    return True
  else:
    if one63(__bs15):
      return join(["%eq", __a16], __bs15)
    else:
      return ["%and", ["%eq", __a16, hd(__bs15)], join(["="], __bs15)]

setenv("=", macro=__f93)
def __f94(a=None, *_args, **_keys):
  ____r224 = unstash(list(_args), _keys)
  __a18 = destash33(a, ____r224)
  ____id102 = ____r224
  __bs17 = cut(____id102, 0)
  if none63(__bs17):
    return True
  else:
    if one63(__bs17):
      return join(["%ge", __a18], __bs17)
    else:
      return ["%and", ["%ge", __a18, hd(__bs17)], join([">="], __bs17)]

setenv(">=", macro=__f94)
def __f95(a=None, *_args, **_keys):
  ____r226 = unstash(list(_args), _keys)
  __a20 = destash33(a, ____r226)
  ____id104 = ____r226
  __bs19 = cut(____id104, 0)
  if none63(__bs19):
    return True
  else:
    if one63(__bs19):
      return join(["%gt", __a20], __bs19)
    else:
      return ["%and", ["%gt", __a20, hd(__bs19)], join([">"], __bs19)]

setenv(">", macro=__f95)
def __f96(*_args, **_keys):
  __args25 = unstash(list(_args), _keys)
  if none63(__args25):
    return False
  else:
    if one63(__args25):
      return join(["%not"], __args25)
    else:
      return ["%and", ["%not", hd(__args25)], join(["not"], tl(__args25))]

setenv("not", macro=__f96)
def __f97(a=None, *_args, **_keys):
  ____r228 = unstash(list(_args), _keys)
  __a22 = destash33(a, ____r228)
  ____id106 = ____r228
  __bs211 = cut(____id106, 0)
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

setenv("and", macro=__f97)
def __f98(a=None, *_args, **_keys):
  ____r230 = unstash(list(_args), _keys)
  __a24 = destash33(a, ____r230)
  ____id108 = ____r230
  __bs23 = cut(____id108, 0)
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

setenv("or", macro=__f98)
def __f99(*_args, **_keys):
  __args27 = unstash(list(_args), _keys)
  return join(["%break"], __args27)

setenv("break", macro=__f99)
def __f100(*_args, **_keys):
  __args29 = unstash(list(_args), _keys)
  return join(["%return"], __args29)

setenv("return", macro=__f100)
def __f101(c=None, *_args, **_keys):
  ____r232 = unstash(list(_args), _keys)
  __c3 = destash33(c, ____r232)
  ____id110 = ____r232
  __body61 = cut(____id110, 0)
  return join(["%while", __c3], __body61)

setenv("while", macro=__f101)
def __f102(*_args, **_keys):
  __body63 = unstash(list(_args), _keys)
  return join(["%do"], __body63)

setenv("do", macro=__f102)
def __f103(*_args, **_keys):
  __args31 = unstash(list(_args), _keys)
  return join(["%get"], __args31)

setenv("get", macro=__f103)
def __f104(*_args, **_keys):
  __args33 = unstash(list(_args), _keys)
  return join(["%idx"], __args33)

setenv("idx", macro=__f104)
def __f105(*_args, **_keys):
  __args35 = unstash(list(_args), _keys)
  return join(["%new"], __args35)

setenv("new", macro=__f105)
def __f106(*_args, **_keys):
  __args37 = unstash(list(_args), _keys)
  return join(["%typeof"], __args37)

setenv("typeof", macro=__f106)
def __f107(*_args, **_keys):
  __args39 = unstash(list(_args), _keys)
  return join(["%error"], __args39)

setenv("error", macro=__f107)
def __f108(*_args, **_keys):
  __args41 = unstash(list(_args), _keys)
  return join(["%throw"], __args41)

setenv("throw", macro=__f108)
def __f109(*_args, **_keys):
  __args43 = unstash(list(_args), _keys)
  return join(["%throw"], __args43)

setenv("raise", macro=__f109)
def __f110(*_args, **_keys):
  __args45 = unstash(list(_args), _keys)
  return join(["%is"], __args45)

setenv("is", macro=__f110)
def __f111(*_args, **_keys):
  __args47 = unstash(list(_args), _keys)
  return join(["%in"], __args47)

setenv("in", macro=__f111)
def __f112(*_args, **_keys):
  __args49 = unstash(list(_args), _keys)
  return join(["%as"], __args49)

setenv("as", macro=__f112)
def __f113(x=None, *_args, **_keys):
  ____r234 = unstash(list(_args), _keys)
  __x661 = destash33(x, ____r234)
  ____id113 = ____r234
  __body65 = cut(____id113, 0)
  __e32 = None
  if atom63(__x661):
    __e32 = [__x661]
  else:
    __e32 = __x661
  ____id114 = __e32
  __a26 = has(____id114, 0)
  __bs25 = cut(____id114, 1)
  __e33 = None
  if none63(__bs25):
    __e33 = [["%literal"]]
  else:
    __e33 = __bs25
  return join(["%block", __a26], __e33, __body65)

setenv("%expand-case", macro=__f113)
def __f114(*_args, **_keys):
  __args51 = unstash(list(_args), _keys)
  if none63(__args51):
    return ["do"]
  else:
    if one63(__args51):
      return join(["%expand-case"], hd(__args51))
    else:
      __r237 = unique("r")
      def __f115(__x679=None):
        ____id116 = __x679
        __x680 = has(____id116, 0)
        __body67 = cut(____id116, 1)
        return ["%expand-case", __x680, ["%set", __r237, join(["%do"], __body67)]]
      return join(["with", __r237, "nil"], map(__f115, almost(__args51)), [join(["%expand-case"], last(__args51))])

setenv("%cases", macro=__f114)
def __f116(x=None, *_args, **_keys):
  ____r240 = unstash(list(_args), _keys)
  __x699 = destash33(x, ____r240)
  ____id1211 = ____r240
  __cases1 = cut(____id1211, 0)
  __fin1 = ["finally"]
  ____o26 = __cases1
  ____i45 = None
  for ____i45 in indices(____o26):
    __x701 = ____o26[____i45]
    if hd63(__x701, "finally"):
      __fin1 = __x701
  __forms7 = []
  ____x704 = __cases1
  ____i46 = 0
  while ____i46 < L_35(____x704):
    ____id122 = ____x704[____i46]
    __x705 = has(____id122, 0)
    __body71 = cut(____id122, 1)
    if __x705 == "finally":
      pass
    else:
      if __x705 == "except" and has(__body71, 1) == "as":
        ____id123 = __body71
        __kind2 = has(____id123, 0)
        ___1 = has(____id123, 1)
        __name19 = has(____id123, 2)
        __body72 = cut(____id123, 3)
        add(__forms7, join([[__x705, ["%as", __kind2, __name19]]], __body72))
      else:
        if __x705 == "except":
          ____id124 = __body71
          __kind3 = has(____id124, 0)
          __body73 = cut(____id124, 1)
          add(__forms7, join([[__x705, __kind3]], __body73))
        else:
          raise Exception("Unknown try clause")
    ____i46 = ____i46 + 1
  return join(["%cases", ["try", __x699]], __forms7, [__fin1])

setenv("try", macro=__f116)
def __f117(x=None, L_else=None):
  if nil63(L_else):
    L_else = "nil"
  return ["let", [["ok", "v"], ["guard", x]], ["if", "ok", "v", L_else]]

setenv("errsafe", macro=__f117)
def __f118():
  ____x728 = object(["target", ["do"]])
  ____x728["py"] = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]]
  return ____x728

setenv("dbg", macro=__f118)
def __f119(form=None):
  __form7 = expand(form)
  L_print(compile(expand(["%set", "lumen-result", __form7])))
  return __form7

setenv("prc", macro=__f119)
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

from pprint import pprint as pp
def entries(x=None):
  __r250 = []
  __mods = []
  ____x736 = dir(x)
  ____i47 = 0
  while ____i47 < L_35(____x736):
    __k25 = ____x736[____i47]
    if not( clip(__k25, 0, 2) == "__"):
      __v32 = getattr(x, __k25)
      if function63(__v32):
        add(__r250, __k25)
      else:
        if module63(__v32):
          add(__mods, cat(".", __k25))
        else:
          add(__r250, [__k25, __v32])
    ____i47 = ____i47 + 1
  ____x738 = __mods
  ____i48 = 0
  while ____i48 < L_35(____x738):
    __x739 = ____x738[____i48]
    add(__r250, __x739)
    ____i48 = ____i48 + 1
  return __r250

from io import StringIO
def pp_to_string(x=None):
  __r252 = StringIO()
  pp(x, __r252)
  return __r252.getvalue()

def lines(x=None):
  return split(x, "\n")

def simple_id63(x=None):
  def __f120():
    try:
      return [True, reader.read_string(x)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id125 = __f120()
  __ok6 = has(____id125, 0)
  __v33 = has(____id125, 1)
  __e34 = None
  if __ok6:
    __e34 = __v33
  else:
    __e34 = None
  __r255 = __e34
  if __r255 == x:
    return __r255

def get_indentation(s=None):
  __r257 = ""
  __i49 = 0
  while __i49 < L_35(s):
    __c4 = char(s, __i49)
    if __c4 == " ":
      __r257 = cat(__r257, __c4)
    __i49 = __i49 + 1
  return __r257

def strip_outer(s=None, lh=None, rh=None):
  if string_starts63(s, lh) and string_ends63(s, rh):
    return clip(clip(s, 0, L_35(s) - L_35(rh)), L_35(lh))
  else:
    return s

def pp_toplevel(x=None):
  __doc = docstring(x)
  if __doc:
    L_print(cat("\n\"\"\"\n", __doc.strip(), "\n\"\"\""))
  if module63(x) or class63(x):
    s = pp_to_string(entries(x))
    s = s.rstrip()
    s = strip_outer(s, "[", "]")
    s = cat(" ", s)
    ____x741 = lines(s)
    ____i50 = 0
    while ____i50 < L_35(____x741):
      __x742 = ____x741[____i50]
      __ind = get_indentation(__x742)
      __x742 = __x742.rstrip(",")
      __id126 = simple_id63(strip_outer(__x742.strip(), "'", "'"))
      __e35 = None
      if __id126:
        __e35 = cat(__ind, __id126)
      else:
        __e35 = __x742
      L_print(__e35)
      ____i50 = ____i50 + 1
    return L_print(repr(x))
  else:
    return pp(x)

def docstring(x=None):
  def __f121():
    try:
      return [True, x.__doc__]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id127 = __f121()
  __ok7 = has(____id127, 0)
  __v34 = has(____id127, 1)
  if __ok7:
    return __v34
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
  def __f122():
    try:
      return [True, compiler.eval(__form8)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id128 = __f122()
  __ok8 = has(____id128, 0)
  __v35 = has(____id128, 1)
  __ex = has(____id128, 2)
  if not __ok8:
    return print_exception(__v35, __ex)
  else:
    if is63(__v35):
      return toplevel_print(__v35)

def read_toplevel(L_str=None, more=None):
  __s3 = reader.stream(L_str, more)
  def __f123():
    try:
      return [True, reader.read_all(__s3)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id129 = __f123()
  __ok9 = has(____id129, 0)
  __v36 = has(____id129, 1)
  __e36 = None
  if __ok9:
    __e36 = __v36
  else:
    __e36 = None
  __x750 = __e36
  if __x750 == more:
    return more
  else:
    if nil63(__x750):
      return __x750
    else:
      if one63(__x750):
        return hd(__x750)
      else:
        return __x750

def rep(L_str=None):
  __v37 = eval(read_toplevel(L_str))
  if is63(__v37):
    return toplevel_print(__v37)

def repl():
  o = {"buf": ""}
  def reset():
    o["buf"] = ""
    system.write("> ")
    return system.flush()
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

def read_from_file(path=None):
  __s5 = reader.stream(system.read_file(path))
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
      ____x753 = __pre
      ____i52 = 0
      while ____i52 < L_35(____x753):
        __file = ____x753[____i52]
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
