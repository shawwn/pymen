if not( "environment" in globals()):
  global environment
  environment = [{}]
def nil63(x=None):
  return x is None

nil63 = nil63
def is63(x=None):
  return not nil63(x)

is63 = is63
def no(x=None):
  return nil63(x) or x is False

no = no
def yes(x=None):
  return not no(x)

yes = yes
def either(x=None, y=None):
  if is63(x):
    return x
  else:
    return y

either = either
def has63(l=None, k=None):
  if obj63(l):
    return k in l
  else:
    if array63(l):
      return number63(k) and (k >= 0 and k < len(l))
    else:
      return False

has63 = has63
def has(l=None, k=None, L_else=None):
  if has63(l, k):
    return l[k]
  else:
    return L_else

has = has
____r7 = None
try:
  from collections.abc import Sequence
  ____r7 = Sequence
except ImportError:
  from collections import Sequence
  ____r7 = Sequence
finally:
  pass
____r8 = None
try:
  import numpy as np
  from numpy import ndarray
  ____r8 = ndarray
except ImportError:
  ndarray = Sequence
  ____r8 = ndarray
finally:
  pass
def array63(x=None):
  return not string63(x) and isinstance(x, tuple([Sequence, ndarray]))

array63 = array63
def indices(x=None):
  if isinstance(x, dict):
    return x
  else:
    return range(len(x))

indices = indices
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

array = array
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

object = object
def length(x=None, upto=None):
  if nil63(x):
    return 0
  else:
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

length = length
def L_35(x=None, upto=None):
  if string63(x) or array63(x):
    return len(x)
  else:
    return length(x, upto)

L_35 = L_35
def none63(x=None):
  return L_35(x, 0) == 0

none63 = none63
def some63(x=None):
  return L_35(x, 0) > 0

some63 = some63
def one63(x=None):
  return L_35(x, 1) == 1

one63 = one63
def two63(x=None):
  return L_35(x, 2) == 2

two63 = two63
def hd(l=None):
  if is63(l):
    return has(l, 0)

hd = hd
import numbers
def string63(x=None):
  return isinstance(x, str)

string63 = string63
def number63(x=None):
  return not boolean63(x) and isinstance(x, numbers.Number)

number63 = number63
def boolean63(x=None):
  return isinstance(x, bool)

boolean63 = boolean63
def function63(x=None):
  return callable(x)

function63 = function63
def obj63(x=None):
  return is63(x) and isinstance(x, dict)

obj63 = obj63
def list63(x=None):
  return obj63(x) or array63(x)

list63 = list63
def atom63(x=None):
  return nil63(x) or (string63(x) or (number63(x) or boolean63(x)))

atom63 = atom63
def hd63(l=None, x=None):
  if function63(x):
    return x(hd(l))
  else:
    if nil63(x):
      return some63(l)
    else:
      return x == hd(l)

hd63 = hd63
nan = float("nan")
inf = float("inf")
L_inf = - inf
def nan63(n=None):
  return not( n == n)

nan63 = nan63
def inf63(n=None):
  return n == inf or n == L_inf

inf63 = inf63
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

clip = clip
def dupe(x=None):
  return {}

dupe = dupe
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

cut = cut
def props(x=None):
  __t = {}
  ____o3 = x
  __k3 = None
  for __k3 in indices(____o3):
    __v4 = ____o3[__k3]
    if not number63(__k3):
      __t[__k3] = __v4
  return __t

props = props
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

values = values
def edge(x=None):
  return L_35(x) - 1

edge = edge
def inner(x=None):
  return clip(x, 1, edge(x))

inner = inner
def tl(l=None):
  if is63(l):
    return cut(l, 1)

tl = tl
def char(s=None, n=None):
  __n8 = n or 0
  if __n8 >= 0 and __n8 < len(s):
    return s[__n8]

char = char
def code(s=None, n=None):
  __x4 = char(s, n)
  if __x4:
    return ord(__x4)

code = code
def string_literal63(x=None):
  return string63(x) and char(x, 0) == "\""

string_literal63 = string_literal63
def id_literal63(x=None):
  return string63(x) and char(x, 0) == "|"

id_literal63 = id_literal63
def add(l=None, x=None):
  if array63(l):
    l.append(x)
  else:
    l[L_35(l)] = x
  return None

add = add
def drop(l=None):
  if array63(l):
    if some63(l):
      return l.pop()
  else:
    __n9 = edge(l)
    if __n9 >= 0:
      __r44 = l[__n9]
      del l[__n9]
      return __r44

drop = drop
def last(l=None):
  return has(l, edge(l))

last = last
def almost(l=None):
  return cut(l, 0, edge(l))

almost = almost
def reverse(l=None):
  __l11 = props(l)
  __i7 = edge(l)
  while __i7 >= 0:
    add(__l11, l[__i7])
    __i7 = __i7 - 1
  return __l11

reverse = reverse
def reduce(f=None, x=None, L_else=None):
  if none63(x):
    return L_else
  else:
    if one63(x):
      return hd(x)
    else:
      return f(hd(x), reduce(f, tl(x)))

reduce = reduce
def join(*_args, **_keys):
  __ls = unstash(_args, _keys)
  __r49 = {}
  ____x5 = __ls
  ____i8 = 0
  while ____i8 < L_35(____x5):
    __l3 = ____x5[____i8]
    if __l3:
      __n10 = L_35(__r49)
      ____o5 = __l3
      __k5 = None
      for __k5 in indices(____o5):
        __v6 = ____o5[__k5]
        if number63(__k5):
          __k5 = __k5 + __n10
        else:
          __l3 = object(__l3)
        __r49[__k5] = __v6
    ____i8 = ____i8 + 1
  return __r49

join = join
def testify(x=None, test=None):
  if function63(x):
    return x
  else:
    if test:
      def __f7(y=None):
        return test(y, x)
      return __f7
    else:
      def __f6(y=None):
        return x == y
      return __f6

testify = testify
def find(x=None, t=None):
  __f = testify(x)
  ____o6 = t
  __k6 = None
  for __k6 in indices(____o6):
    __v7 = ____o6[__k6]
    ____y = __f(__v7, __k6)
    if yes(____y):
      __y1 = ____y
      return __k6

find = find
def first(x=None, l=None, pos=None):
  __f1 = testify(x)
  __i11 = either(pos, 0)
  __n13 = -1
  ____o7 = l
  __k7 = None
  for __k7 in indices(____o7):
    __v8 = ____o7[__k7]
    if number63(__k7):
      __n13 = max(__n13, __k7)
  __n13 = __n13 + 1
  while __i11 < __n13:
    __v9 = l[__i11]
    ____y2 = __f1(__v9)
    if yes(____y2):
      __y3 = ____y2
      return __i11
    __i11 = __i11 + 1

first = first
def in63(x=None, t=None):
  return yes(find(testify(x), t))

in63 = in63
def pair(l=None):
  __l12 = dupe(l)
  __n15 = L_35(l)
  __i13 = 0
  while __i13 < __n15:
    __a = l[__i13]
    __e16 = None
    if __i13 + 1 < __n15:
      __e16 = l[__i13 + 1]
    __b = __e16
    add(__l12, [__a, __b])
    __i13 = __i13 + 1
    __i13 = __i13 + 1
  return __l12

pair = pair
import functools
def sortfunc(f=None):
  if f:
    def __f8(a=None, b=None):
      if f(a, b):
        return -1
      else:
        return 1
    __f2 = __f8
    return functools.cmp_to_key(__f2)

def sort(l=None, f=None):
  l.sort(key=sortfunc(f))
  return l

sort = sort
def map(f=None, x=None):
  __t2 = dupe(x)
  ____x7 = x
  ____i14 = 0
  while ____i14 < L_35(____x7):
    __v10 = ____x7[____i14]
    __y4 = f(__v10)
    if is63(__y4):
      add(__t2, __y4)
    ____i14 = ____i14 + 1
  ____o8 = x
  __k8 = None
  for __k8 in indices(____o8):
    __v11 = ____o8[__k8]
    if not number63(__k8):
      __y5 = f(__v11)
      if is63(__y5):
        __t2[__k8] = __y5
  return __t2

map = map
def mapcat(f=None, x=None, sep=None):
  __r62 = ""
  __c = ""
  ____x8 = x
  ____i16 = 0
  while ____i16 < L_35(____x8):
    __v12 = ____x8[____i16]
    __e17 = None
    if f:
      __e17 = f(__v12)
    else:
      __e17 = __v12
    __y6 = __e17
    if is63(__y6):
      __r62 = cat(__r62, __c, __y6)
      __c = sep or ""
    ____i16 = ____i16 + 1
  return __r62

mapcat = mapcat
def keep(f=None, x=None):
  def __f9(v=None):
    if yes(f(v)):
      return v
  return map(__f9, x)

keep = keep
def props63(t=None):
  ____o9 = t
  __k9 = None
  for __k9 in indices(____o9):
    __v13 = ____o9[__k9]
    if not number63(__k9):
      return True
  return False

props63 = props63
def empty63(t=None):
  ____o10 = t
  ____i18 = None
  for ____i18 in indices(____o10):
    __x9 = ____o10[____i18]
    return False
  return True

empty63 = empty63
def stash(args=None):
  if props63(args):
    __p = {}
    ____o11 = args
    __k10 = None
    for __k10 in indices(____o11):
      __v14 = ____o11[__k10]
      if not number63(__k10):
        __p[__k10] = __v14
    __p["_stash"] = True
    add(args, __p)
  if array63(args):
    return args
  else:
    return array(args)

stash = stash
def unstash(args=None, params=None):
  if none63(args):
    return params or {}
  else:
    __l4 = last(args)
    if obj63(__l4) and has63(__l4, "_stash"):
      __args1 = object(almost(args))
      ____o12 = __l4
      __k11 = None
      for __k11 in indices(____o12):
        __v15 = ____o12[__k11]
        if not( __k11 == "_stash"):
          __args1[__k11] = __v15
      if params:
        ____o13 = params
        __k12 = None
        for __k12 in indices(____o13):
          __v16 = ____o13[__k12]
          __args1[__k12] = __v16
      return __args1
    else:
      if params:
        __args11 = object(args)
        ____o14 = params
        __k13 = None
        for __k13 in indices(____o14):
          __v17 = ____o14[__k13]
          __args11[__k13] = __v17
        return __args11
      else:
        return args

unstash = unstash
def destash33(l=None, args1=None):
  if obj63(l) and has63(l, "_stash"):
    ____o15 = l
    __k14 = None
    for __k14 in indices(____o15):
      __v18 = ____o15[__k14]
      if not( __k14 == "_stash"):
        args1[__k14] = __v18
  else:
    return l

destash33 = destash33
def search(s=None, pattern=None, start=None):
  __i24 = s.find(pattern, start)
  if __i24 >= 0:
    return __i24

search = search
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

string_ends63 = string_ends63
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

string_starts63 = string_starts63
def split(s=None, sep=None):
  if s == "" or sep == "":
    return []
  else:
    return s.split(sep)

split = split
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
  def __f10(a=None, b=None):
    return cat2(a, b)
  return reduce(__f10, __xs, "")

cat = cat
def L_43(*_args, **_keys):
  __xs1 = unstash(_args, _keys)
  def __f11(a=None, b=None):
    return a + b
  return reduce(__f11, __xs1, 0)

L_43 = L_43
def L_45(*_args, **_keys):
  __xs2 = unstash(_args, _keys)
  def __f12(b=None, a=None):
    return a - b
  return reduce(__f12, reverse(__xs2), 0)

L_45 = L_45
def L_42(*_args, **_keys):
  __xs3 = unstash(_args, _keys)
  def __f13(a=None, b=None):
    return a * b
  return reduce(__f13, __xs3, 1)

L_42 = L_42
def L_47(*_args, **_keys):
  __xs4 = unstash(_args, _keys)
  def __f14(b=None, a=None):
    return a / b
  return reduce(__f14, reverse(__xs4), 1)

L_47 = L_47
def L_37(*_args, **_keys):
  __xs5 = unstash(_args, _keys)
  def __f15(b=None, a=None):
    return a % b
  return reduce(__f15, reverse(__xs5), 1)

L_37 = L_37
def pairwise(f=None, xs=None):
  __i25 = 0
  while __i25 < edge(xs):
    __a1 = xs[__i25]
    __b1 = xs[__i25 + 1]
    if not f(__a1, __b1):
      return False
    __i25 = __i25 + 1
  return True

def L_60(*_args, **_keys):
  __xs6 = unstash(_args, _keys)
  def __f16(a=None, b=None):
    return a < b
  return pairwise(__f16, __xs6)

L_60 = L_60
def L_62(*_args, **_keys):
  __xs7 = unstash(_args, _keys)
  def __f17(a=None, b=None):
    return a > b
  return pairwise(__f17, __xs7)

L_62 = L_62
def L_61(*_args, **_keys):
  __xs8 = unstash(_args, _keys)
  def __f18(a=None, b=None):
    return a == b
  return pairwise(__f18, __xs8)

L_61 = L_61
def L_6061(*_args, **_keys):
  __xs9 = unstash(_args, _keys)
  def __f19(a=None, b=None):
    return a <= b
  return pairwise(__f19, __xs9)

L_6061 = L_6061
def L_6261(*_args, **_keys):
  __xs10 = unstash(_args, _keys)
  def __f20(a=None, b=None):
    return a >= b
  return pairwise(__f20, __xs10)

L_6261 = L_6261
def number_code63(n=None):
  return n > 47 and n < 58

number_code63 = number_code63
def number(s=None):
  if string63(s):
    ____r90 = None
    try:
      return int(s)
    except ValueError:
      ____r90 = None
    finally:
      pass
    ____r91 = None
    try:
      return float(s)
    except ValueError:
      ____r91 = None
    finally:
      pass
    return ____r91
  else:
    if number63(s):
      return s

number = number
def numeric63(s=None):
  __n24 = L_35(s)
  __i26 = 0
  while __i26 < __n24:
    if not number_code63(code(s, __i26)):
      return False
    __i26 = __i26 + 1
  return some63(s)

numeric63 = numeric63
def tostring(x=None):
  return repr(x)

def escape(s=None):
  if nil63(search(s, "\n")) and (nil63(search(s, "\r")) and (nil63(search(s, "\"")) and nil63(search(s, "\\")))):
    return "".join(["\"", s, "\""])
  else:
    __s1 = "\""
    __i27 = 0
    while __i27 < L_35(s):
      __c1 = char(s, __i27)
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
      __i27 = __i27 + 1
    return cat(__s1, "\"")

escape = escape
def simple_id63(x=None):
  from pymen.reader import read_string
  def __f21():
    try:
      return [True, read_string(x)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id = __f21()
  ____ok = has(____id, 0)
  ____v19 = has(____id, 1)
  __e24 = None
  if ____ok:
    __e24 = ____v19
  else:
    __e24 = None
  __r96 = __e24
  if __r96 == x:
    return __r96

simple_id63 = simple_id63
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
                        ____o16 = x
                        __k15 = None
                        for __k15 in indices(____o16):
                          __v20 = ____o16[__k15]
                          if number63(__k15):
                            __xs11[__k15] = L_str(__v20, repr, __l5)
                          else:
                            if function63(__v20):
                              add(__ks, [cat(".", __k15), ""])
                            else:
                              add(__ks, [cat(__k15, ": "), L_str(__v20, repr, __l5)])
                        def __f22(__x15=None, __x16=None):
                          ____id1 = __x15
                          __a2 = has(____id1, 0)
                          ____id2 = __x16
                          __b2 = has(____id2, 0)
                          return __a2 < __b2
                        sort(__ks, __f22)
                        drop(__l5)
                        ____x17 = __xs11
                        ____i29 = 0
                        while ____i29 < L_35(____x17):
                          __v21 = ____x17[____i29]
                          __s = cat(__s, __sp, __v21)
                          __sp = " "
                          ____i29 = ____i29 + 1
                        ____x18 = __ks
                        ____i30 = 0
                        while ____i30 < L_35(____x18):
                          ____id3 = ____x18[____i30]
                          __k16 = has(____id3, 0)
                          __v22 = has(____id3, 1)
                          __s = cat(__s, __sp, __k16, __v22)
                          __sp = " "
                          ____i30 = ____i30 + 1
                        return cat(__s, ")")

L_str = L_str
def apply(f=None, args=None):
  __args2 = stash(args)
  return f(*__args2)

apply = apply
def call(f=None, *_args, **_keys):
  ____r100 = unstash(_args, _keys)
  __f3 = destash33(f, ____r100)
  ____id4 = ____r100
  __args3 = cut(____id4, 0)
  return apply(__f3, __args3)

call = call
def identifier(k=None):
  def __f23(a=None, b=None):
    return cat(a, "_", b)
  return reduce(__f23, split(k, "-"))

identifier = identifier
def setenv(k=None, *_args, **_keys):
  ____r103 = unstash(_args, _keys)
  __k17 = destash33(k, ____r103)
  ____id5 = ____r103
  __keys = cut(____id5, 0)
  if string63(__k17):
    __e25 = None
    if has63(__keys, "toplevel"):
      __e25 = hd(environment)
    else:
      __e25 = last(environment)
    __frame = __e25
    __e26 = None
    if has63(__frame, __k17):
      __e26 = __frame[__k17]
    else:
      __e26 = {}
    __entry = __e26
    ____o17 = __keys
    __k18 = None
    for __k18 in indices(____o17):
      __v23 = ____o17[__k18]
      __k19 = identifier(__k18)
      if not( __k19 == "toplevel"):
        __entry[__k19] = __v23
    __frame[__k17] = __entry
    return __frame[__k17]

setenv = setenv
def L_print(x=None):
  print(x)
  return None

L_print = L_print
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
def get_place(place=None, setfn=None):
  __place = macroexpand(place)
  if atom63(__place) or (hd63(__place, "%get") and nil63(getenv("%get", "place-expander")) or (hd63(__place, "%idx") and nil63(getenv("%idx", "place-expander")) or accessor_literal63(hd(tl(__place))))):
    def __f25(v=None):
      return ["%set", __place, v]
    return setfn(__place, __f25)
  else:
    if hd63(__place, "has") and nil63(getenv("has", "place-expander")):
      def __f24(v=None):
        return ["%set", join(["%get"], tl(__place)), v]
      return setfn(__place, __f24)
    else:
      __head = hd(__place)
      __gf = getenv(__head, "place-expander")
      if __gf:
        return apply(__gf, join([setfn], tl(__place), []))
      else:
        raise Exception(cat(L_str(__place), " is not a valid place expression: no place-expander for ", __head))

get_place = get_place
def __let_place__macro(vars=None, place=None, *_args, **_keys):
  ____r113 = unstash(_args, _keys)
  __vars1 = destash33(vars, ____r113)
  __place2 = destash33(place, ____r113)
  ____id7 = ____r113
  __body1 = cut(____id7, 0)
  return ["get-place", __place2, join(["fn", __vars1], __body1)]

setenv("let-place", macro=__let_place__macro)
def __define_expander__macro(name=None, handler=None):
  ____x33 = object(["setenv", ["quote", name]])
  ____x33["place-expander"] = handler
  __form1 = ____x33
  eval(__form1)
  return __form1

setenv("define-expander", macro=__define_expander__macro)
def define_setter(name=None, setter=None, setfn=None, args=None, vars=None):
  if none63(args):
    __vars2 = reverse(vars or [])
    def __f26(v=None):
      return apply(setter, join([v], __vars2, []))
    return setfn(join([name], __vars2), __f26)
  else:
    __v24 = hd(args)
    return define_setter(name, setter, setfn, tl(args), join([__v24], vars))

define_setter = define_setter
def __define_setter__macro(name=None, arglist=None, *_args, **_keys):
  ____r119 = unstash(_args, _keys)
  __name1 = destash33(name, ____r119)
  __arglist1 = destash33(arglist, ____r119)
  ____id9 = ____r119
  __body3 = cut(____id9, 0)
  ____x48 = object(["setfn"])
  ____x48["rest"] = "args"
  return ["define-expander", __name1, ["fn", ____x48, ["%call", "define-setter", ["quote", __name1], join(["fn", __arglist1], __body3), "setfn", "args"]]]

setenv("define-setter", macro=__define_setter__macro)
def __set__macro(*_args, **_keys):
  __args5 = unstash(_args, _keys)
  def __f27(__x56=None):
    ____id11 = __x56
    __lh1 = has(____id11, 0)
    __rh1 = has(____id11, 1)
    def __f28(getter=None, setter=None):
      return setter(__rh1)
    return get_place(__lh1, __f28)
  return join(["%do"], map(__f27, pair(__args5)))

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
  __body6 = unstash(_args, _keys)
  if one63(__body6) and (hd63(__body6, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_args"
  else:
    if L_35(__body6) > 2 and (__body6[1] == "for" and __body6[3] == "in"):
      ____id15 = __body6
      __expr2 = has(____id15, 0)
      __body7 = cut(____id15, 1)
      __comps1 = []
      __cond1 = None
      while L_35(__body7) > 2 and (__body7[0] == "for" and __body7[2] == "in"):
        ____id16 = __body7
        ___for1 = has(____id16, 0)
        __names1 = has(____id16, 1)
        ___in1 = has(____id16, 2)
        __l8 = has(____id16, 3)
        __body12 = cut(____id16, 4)
        add(__comps1, [__names1, __l8])
        __body7 = __body12
      if hd(__body7) == "if":
        ____id17 = __body7
        ___if1 = has(____id17, 0)
        __expr3 = has(____id17, 1)
        __cond1 = __expr3
      return ["%list", __expr2, __comps1, __cond1]
    else:
      __x79 = unique("x")
      __l9 = {}
      __forms1 = []
      ____o19 = __body6
      __k22 = None
      for __k22 in indices(____o19):
        __v26 = ____o19[__k22]
        if number63(__k22):
          __l9[__k22] = __v26
        else:
          add(__forms1, ["%set", ["%get", __x79, ["quote", __k22]], __v26])
      if some63(__forms1):
        return join(["let", __x79, ["object", join(["%array"], __l9)]], __forms1, [__x79])
      else:
        return join(["%array"], __l9)

setenv("list", macro=__list__macro)
def __if__macro(*_args, **_keys):
  __branches1 = unstash(_args, _keys)
  return hd(expand_if(__branches1))

setenv("if", macro=__if__macro)
def __case__macro(expr=None, *_args, **_keys):
  ____r131 = unstash(_args, _keys)
  __expr5 = destash33(expr, ____r131)
  ____id20 = ____r131
  __e27 = None
  if nil63(has(____id20, "cmp")):
    __e27 = "="
  else:
    __e27 = has(____id20, "cmp")
  __cmp1 = __e27
  __clauses1 = cut(____id20, 0)
  __x101 = unique("x")
  def __f29(_=None):
    return [__cmp1, _, __x101]
  __eq1 = __f29
  def __f30(__x103=None):
    ____id21 = __x103
    __a4 = has(____id21, 0)
    __b4 = has(____id21, 1)
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
  __cl1 = __f30
  return ["let", __x101, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]

setenv("case", macro=__case__macro)
def __of__macro(x=None, *_args, **_keys):
  ____r135 = unstash(_args, _keys)
  __x115 = destash33(x, ____r135)
  ____id23 = ____r135
  __values1 = cut(____id23, 0)
  return join(["case", __x115, __values1, True, False], props(__values1))

setenv("of", macro=__of__macro)
def __when__macro(cond=None, *_args, **_keys):
  ____r137 = unstash(_args, _keys)
  __cond3 = destash33(cond, ____r137)
  ____id25 = ____r137
  __body9 = cut(____id25, 0)
  return ["%if", __cond3, join(["%do"], __body9)]

setenv("when", macro=__when__macro)
def __unless__macro(cond=None, *_args, **_keys):
  ____r139 = unstash(_args, _keys)
  __cond5 = destash33(cond, ____r139)
  ____id27 = ____r139
  __body111 = cut(____id27, 0)
  return ["%if", ["%not", __cond5], join(["%do"], __body111)]

setenv("unless", macro=__unless__macro)
def __obj__macro(*_args, **_keys):
  __body14 = unstash(_args, _keys)
  if one63(__body14) and (hd63(__body14, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_keys"
  else:
    if L_35(__body14) > 2 and (__body14[1] == "for" and __body14[3] == "in"):
      ____id31 = __body14
      __expr8 = has(____id31, 0)
      __body15 = cut(____id31, 1)
      __comps3 = []
      __cond7 = None
      while L_35(__body15) > 2 and (__body15[0] == "for" and __body15[2] == "in"):
        ____id32 = __body15
        ___for3 = has(____id32, 0)
        __names3 = has(____id32, 1)
        ___in3 = has(____id32, 2)
        __l111 = has(____id32, 3)
        __body141 = cut(____id32, 4)
        add(__comps3, [__names3, __l111])
        __body15 = __body141
      if hd(__body15) == "if":
        ____id33 = __body15
        ___if3 = has(____id33, 0)
        __expr9 = has(____id33, 1)
        __cond7 = __expr9
      if list63(__expr8) and hd63(__expr8, ","):
        __expr8 = join([":"], tl(__expr8))
      ____x136 = object(["%list", __expr8, __comps3, __cond7])
      ____x136["kind"] = "object"
      return ____x136
    else:
      def __f31(x=None):
        return x
      return join(["%object"], mapo(__f31, __body14))

setenv("obj", macro=__obj__macro)
def __let__macro(bs=None, *_args, **_keys):
  ____r143 = unstash(_args, _keys)
  __bs11 = destash33(bs, ____r143)
  ____id38 = ____r143
  __body17 = cut(____id38, 0)
  if atom63(__bs11) or hd63(__bs11, ","):
    return join(["let", [__bs11, hd(__body17)]], tl(__body17))
  else:
    if none63(__bs11):
      return join(["%do"], __body17)
    else:
      ____id39 = __bs11
      __lh3 = has(____id39, 0)
      __rh3 = has(____id39, 1)
      __bs21 = cut(____id39, 2)
      ____id40 = bind(__lh3, __rh3)
      __id41 = has(____id40, 0)
      __val1 = has(____id40, 1)
      __bs12 = cut(____id40, 2)
      __renames1 = []
      if not id_literal63(__id41):
        __id121 = unique(__id41)
        __renames1 = [__id41, __id121]
        __id41 = __id121
      return ["%do", ["%local", __id41, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body17)]]

setenv("let", macro=__let__macro)
def __with__macro(x=None, v=None, *_args, **_keys):
  ____r145 = unstash(_args, _keys)
  __x163 = destash33(x, ____r145)
  __v28 = destash33(v, ____r145)
  ____id43 = ____r145
  __body19 = cut(____id43, 0)
  if __v28 == "as":
    return join(["%with", ["%as", __x163, hd(__body19)]], tl(__body19))
  else:
    if not atom63(__x163) or has(__body19, "async"):
      return join(["%with", __x163, __v28], __body19)
    else:
      return join(["let", [__x163, __v28]], __body19, [__x163])

setenv("with", macro=__with__macro)
def __let_when__macro(x=None, v=None, *_args, **_keys):
  ____r147 = unstash(_args, _keys)
  __x177 = destash33(x, ____r147)
  __v30 = destash33(v, ____r147)
  ____id45 = ____r147
  __body21 = cut(____id45, 0)
  __y8 = unique("y")
  return ["let", __y8, __v30, ["when", ["yes", __y8], join(["let", [__x177, __y8]], __body21)]]

setenv("let-when", macro=__let_when__macro)
def __define_macro__macro(name=None, args=None, *_args, **_keys):
  ____r149 = unstash(_args, _keys)
  __name3 = destash33(name, ____r149)
  __args7 = destash33(args, ____r149)
  ____id48 = ____r149
  __body23 = cut(____id48, 0)
  __id49 = unique(cat(__name3, "--macro"))
  ____x190 = object(["setenv", ["quote", __name3]])
  ____x190["macro"] = __id49
  __form3 = ["do", join(["define", __id49, __args7], __body23), ____x190]
  eval(__form3)
  return __form3

setenv("define-macro", macro=__define_macro__macro)
def __define_special__macro(name=None, args=None, *_args, **_keys):
  ____r151 = unstash(_args, _keys)
  __name5 = destash33(name, ____r151)
  __args9 = destash33(args, ____r151)
  ____id52 = ____r151
  __body25 = cut(____id52, 0)
  __id53 = unique(cat(__name5, "--special"))
  ____x199 = object(["setenv", ["quote", __name5]])
  ____x199["special"] = __id53
  __form5 = ["do", join(["define", __id53, __args9], __body25), join(____x199, props(__body25))]
  eval(__form5)
  return __form5

setenv("define-special", macro=__define_special__macro)
def __define_symbol__macro(name=None, expansion=None):
  setenv(name, symbol=expansion)
  ____x204 = object(["setenv", ["quote", name]])
  ____x204["symbol"] = ["quote", expansion]
  return ____x204

setenv("define-symbol", macro=__define_symbol__macro)
def __define_reader__macro(__x213=None, *_args, **_keys):
  ____r155 = unstash(_args, _keys)
  ____x213 = destash33(__x213, ____r155)
  ____id56 = ____x213
  __char1 = has(____id56, 0)
  __s2 = has(____id56, 1)
  ____id57 = ____r155
  __body27 = cut(____id57, 0)
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body27)]

setenv("define-reader", macro=__define_reader__macro)
def __define__macro(name=None, x=None, *_args, **_keys):
  ____r157 = unstash(_args, _keys)
  __name7 = destash33(name, ____r157)
  __x222 = destash33(x, ____r157)
  ____id59 = ____r157
  __body29 = cut(____id59, 0)
  setenv(__name7, variable=True)
  if some63(__body29):
    return join(["%local-function", __name7], bind42(__x222, __body29), props(__body29))
  else:
    return join(["%local", __name7, __x222], props(__body29))

setenv("define", macro=__define__macro)
def __define_global__macro(name=None, x=None, *_args, **_keys):
  ____r159 = unstash(_args, _keys)
  __name9 = destash33(name, ____r159)
  __x231 = destash33(x, ____r159)
  ____id61 = ____r159
  __body31 = cut(____id61, 0)
  setenv(__name9, toplevel=True, variable=True)
  if some63(__body31):
    __i35 = compile(compile(__name9))
    return ["do", join(["%global-function", __i35], bind42(__x231, __body31), props(__body31)), ["set", __name9, __i35]]
  else:
    return join(["set", __name9, __x231], props(__body31))

setenv("define-global", macro=__define_global__macro)
def __get_value__macro(x=None):
  ____x240 = object(["setenv", x])
  ____x240["toplevel"] = True
  return ["has", ____x240, ["quote", "value"]]

setenv("get-value", macro=__get_value__macro)
def __define_constant__macro(name=None, x=None):
  ____x251 = object(["setenv", ["quote", name]])
  ____x251["toplevel"] = True
  ____x251["value"] = either(x, ["get-value", ["quote", name]])
  return ["%do", ____x251, ["define-symbol", name, ["get-value", ["quote", name]]]]

setenv("define-constant", macro=__define_constant__macro)
def __define_variable__macro(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]

setenv("define-variable", macro=__define_variable__macro)
def __after__macro(x=None, *_args, **_keys):
  ____r168 = unstash(_args, _keys)
  __x280 = destash33(x, ____r168)
  ____id63 = ____r168
  __body33 = cut(____id63, 0)
  __ok2 = unique("ok")
  __r169 = unique("r")
  ____x281 = object(["target", ["try", __x280, join(["finally"], __body33)]])
  ____x281["lua"] = join(["let", [[__ok2, __r169], ["guard", __x280]]], __body33, [["if", __ok2, __r169, ["throw", __r169]]])
  return ____x281

setenv("after", macro=__after__macro)
def __with_frame__macro(*_args, **_keys):
  __body35 = unstash(_args, _keys)
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body35), ["drop", "environment"]]]

setenv("with-frame", macro=__with_frame__macro)
def __with_values__macro(*_args, **_keys):
  __body37 = unstash(_args, _keys)
  __forms3 = []
  ____o21 = __body37
  __k25 = None
  for __k25 in indices(____o21):
    __v32 = ____o21[__k25]
    if not number63(__k25):
      ____x309 = object(["setenv", ["quote", __k25]])
      ____x309["value"] = __v32
      add(__forms3, ____x309)
  return join(["with-frame"], __forms3)

setenv("with-values", macro=__with_values__macro)
def __with_bindings__macro(__x317=None, *_args, **_keys):
  ____r171 = unstash(_args, _keys)
  ____x317 = destash33(__x317, ____r171)
  ____id66 = ____x317
  __names5 = has(____id66, 0)
  ____id67 = ____r171
  __body39 = cut(____id67, 0)
  __x318 = unique("x")
  ____x321 = object(["setenv", __x318])
  ____x321["variable"] = True
  return join(["with-frame", ["each", __x318, __names5, ____x321]], __body39)

setenv("with-bindings", macro=__with_bindings__macro)
def __let_macro__macro(definitions=None, *_args, **_keys):
  ____r176 = unstash(_args, _keys)
  __definitions1 = destash33(definitions, ____r176)
  ____id69 = ____r176
  __body41 = cut(____id69, 0)
  add(environment, {})
  ____r178 = None
  try:
    def __f32(m=None):
      return macroexpand(join(["define-macro"], m))
    map(__f32, __definitions1)
    ____r178 = join(["%do"], macroexpand(__body41))
  finally:
    drop(environment)
  return ____r178

setenv("let-macro", macro=__let_macro__macro)
def __let_symbol__macro(expansions=None, *_args, **_keys):
  ____r184 = unstash(_args, _keys)
  __expansions1 = destash33(expansions, ____r184)
  ____id72 = ____r184
  __body43 = cut(____id72, 0)
  add(environment, {})
  ____r186 = None
  try:
    def __f33(__x331=None):
      ____id73 = __x331
      __name11 = has(____id73, 0)
      __exp1 = has(____id73, 1)
      return macroexpand(["define-symbol", __name11, __exp1])
    map(__f33, pair(__expansions1))
    ____r186 = join(["%do"], macroexpand(__body43))
  finally:
    drop(environment)
  return ____r186

setenv("let-symbol", macro=__let_symbol__macro)
def __let_unique__macro(names=None, *_args, **_keys):
  ____r190 = unstash(_args, _keys)
  __names7 = destash33(names, ____r190)
  ____id75 = ____r190
  __body45 = cut(____id75, 0)
  def __f34(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f34, __names7)
  return join(["let", apply(join, __bs3)], __body45)

setenv("let-unique", macro=__let_unique__macro)
def __fn__macro(args=None, *_args, **_keys):
  ____r193 = unstash(_args, _keys)
  __args111 = destash33(args, ____r193)
  ____id77 = ____r193
  __body47 = cut(____id77, 0)
  return join(["%function"], bind42(__args111, __body47), props(__body47))

setenv("fn", macro=__fn__macro)
def __apply__macro(f=None, *_args, **_keys):
  ____r195 = unstash(_args, _keys)
  __f5 = destash33(f, ____r195)
  ____id79 = ____r195
  __args13 = cut(____id79, 0)
  if L_35(__args13) > 1:
    return ["%call", "apply", __f5, ["join", join(["list"], almost(__args13)), last(__args13), join(["list"], props(__args13))]]
  else:
    if props63(__args13):
      return ["%call", "apply", __f5, join(["join"], __args13, [join(["list"], props(__args13))])]
    else:
      return join(["%call", "apply", __f5], __args13)

setenv("apply", macro=__apply__macro)
def __guard__macro(expr=None):
  ____x395 = object(["target", [["%function", join(), ["%try", ["list", True, expr]]]]])
  ____x407 = object(["obj"])
  ____x407["stack"] = [["idx", "debug", "traceback"]]
  ____x407["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
  ____x395["lua"] = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x407]]]]
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x395]

setenv("guard", macro=__guard__macro)
def __each__macro(x=None, t=None, *_args, **_keys):
  ____r199 = unstash(_args, _keys)
  __x435 = destash33(x, ____r199)
  __t4 = destash33(t, ____r199)
  ____id82 = ____r199
  __body49 = cut(____id82, 0)
  __o23 = unique("o")
  __n32 = unique("n")
  __i39 = unique("i")
  __e28 = None
  if atom63(__x435):
    __e28 = [__i39, __x435]
  else:
    __e29 = None
    if L_35(__x435) > 1:
      __e29 = __x435
    else:
      __e29 = [__i39, hd(__x435)]
    __e28 = __e29
  ____id83 = __e28
  __k27 = has(____id83, 0)
  __v34 = has(____id83, 1)
  ____x441 = object(["target", __o23])
  ____x441["py"] = ["indices", __o23]
  __e30 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e30 = __body49
  else:
    __e30 = [join(["let", __k27, ["if", ["numeric?", __k27], ["parseInt", __k27], __k27]], __body49)]
  return ["let", [__o23, __t4, __k27, "nil"], join(["%for", ____x441, __k27], props(__body49), [join(["let", [__v34, ["%get", __o23, __k27]]], __e30)])]

setenv("each", macro=__each__macro)
def __for__macro(i=None, to=None, *_args, **_keys):
  ____r201 = unstash(_args, _keys)
  __i41 = destash33(i, ____r201)
  __to1 = destash33(to, ____r201)
  ____id85 = ____r201
  __body51 = cut(____id85, 0)
  if __to1 == "in":
    return join(["%for", hd(__body51), __i41, join(["%do"], tl(__body51))], props(__body51))
  else:
    return ["let", __i41, 0, join(["while", ["<", __i41, __to1]], __body51, [["inc", __i41]])]

setenv("for", macro=__for__macro)
def __step__macro(v=None, t=None, *_args, **_keys):
  ____r203 = unstash(_args, _keys)
  __v36 = destash33(v, ____r203)
  __t6 = destash33(t, ____r203)
  ____id87 = ____r203
  __body53 = cut(____id87, 0)
  __x476 = unique("x")
  __i43 = unique("i")
  return ["let", [__x476, __t6], ["for", __i43, ["#", __x476], join(["let", [__v36, ["at", __x476, __i43]]], __body53)]]

setenv("step", macro=__step__macro)
def __set_of__macro(*_args, **_keys):
  __xs13 = unstash(_args, _keys)
  __l13 = {}
  ____o25 = __xs13
  ____i45 = None
  for ____i45 in indices(____o25):
    __x487 = ____o25[____i45]
    __l13[__x487] = True
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
  ____r209 = unstash(_args, _keys)
  __a6 = destash33(a, ____r209)
  ____id89 = ____r209
  __bs5 = cut(____id89, 0)
  return ["set", __a6, join(["join", __a6], __bs5)]

setenv("join!", macro=__join33__macro)
def __cat33__macro(a=None, *_args, **_keys):
  ____r211 = unstash(_args, _keys)
  __a8 = destash33(a, ____r211)
  ____id91 = ____r211
  __bs7 = cut(____id91, 0)
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
  __x517 = unique("x")
  return ["%do", ["inc", "indent-level"], ["with", __x517, form, ["dec", "indent-level"]]]

setenv("with-indent", macro=__with_indent__macro)
def __export__macro(*_args, **_keys):
  __names9 = unstash(_args, _keys)
  def __f35(k=None):
    if k == compile(k):
      return ["%set", ["idx", "exports", k], k]
    else:
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]]
  __forms5 = map(__f35, __names9)
  if has(setenv("target", toplevel=True), "value") == "js":
    return join(["%do"], __forms5)
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]])

setenv("export", macro=__export__macro)
def __when_compiling__macro(*_args, **_keys):
  __body55 = unstash(_args, _keys)
  return eval(join(["%do"], __body55))

setenv("when-compiling", macro=__when_compiling__macro)
def __during_compilation__macro(*_args, **_keys):
  __body57 = unstash(_args, _keys)
  __form7 = join(["%do"], __body57)
  eval(__form7)
  return __form7

setenv("during-compilation", macro=__during_compilation__macro)
def __f36(setfn=None, *_args, **_keys):
  ____r222 = unstash(_args, _keys)
  __setfn1 = destash33(setfn, ____r222)
  ____id93 = ____r222
  __args15 = cut(____id93, 0)
  def __f37(v=None, l=None, k=None):
    return ["%set", ["%get", l, k], v]
  return define_setter("has", __f37, __setfn1, __args15)

setenv("has", place_expander=__f36)
def __f38(setfn=None, *_args, **_keys):
  ____r226 = unstash(_args, _keys)
  __setfn3 = destash33(setfn, ____r226)
  ____id95 = ____r226
  __args17 = cut(____id95, 0)
  def __f39(c=None, L_str=None, pos=None):
    return ["set", L_str, ["cat", ["clip", L_str, 0, pos], c, ["clip", L_str, ["+", pos, 1]]]]
  return define_setter("char", __f39, __setfn3, __args17)

setenv("char", place_expander=__f38)
def __f40(setfn=None, *_args, **_keys):
  ____r230 = unstash(_args, _keys)
  __setfn5 = destash33(setfn, ____r230)
  ____id97 = ____r230
  __args19 = cut(____id97, 0)
  def __f41(c=None, L_str=None, L_from=None, upto=None):
    return ["set", L_str, ["cat", ["clip", L_str, 0, L_from], c, ["clip", L_str, upto]]]
  return define_setter("clip", __f41, __setfn5, __args19)

setenv("clip", place_expander=__f40)
def __f42(setfn=None, *_args, **_keys):
  ____r234 = unstash(_args, _keys)
  __setfn7 = destash33(setfn, ____r234)
  ____id99 = ____r234
  __args21 = cut(____id99, 0)
  def __f43(c=None, L_str=None):
    return ["set", L_str, ["cat", ["char", L_str, 0], c, ["char", L_str, ["edge", L_str]]]]
  return define_setter("inner", __f43, __setfn7, __args21)

setenv("inner", place_expander=__f42)
def __f44(setfn=None, *_args, **_keys):
  ____r238 = unstash(_args, _keys)
  __setfn9 = destash33(setfn, ____r238)
  ____id101 = ____r238
  __args23 = cut(____id101, 0)
  def __f45(v=None, l=None, L_from=None, upto=None):
    return ["set", l, ["join", ["cut", l, 0, L_from], v, ["cut", l, either(upto, ["#", l])], ["keys", v]]]
  return define_setter("cut", __f45, __setfn9, __args23)

setenv("cut", place_expander=__f44)
def __f46(setfn=None, *_args, **_keys):
  ____r242 = unstash(_args, _keys)
  __setfn11 = destash33(setfn, ____r242)
  ____id103 = ____r242
  __args25 = cut(____id103, 0)
  def __f47(v=None, l=None, L_from=None):
    return ["set", ["cut", l, either(L_from, 1)], v]
  return define_setter("tl", __f47, __setfn11, __args25)

setenv("tl", place_expander=__f46)
def __f48(setfn=None, *_args, **_keys):
  ____r246 = unstash(_args, _keys)
  __setfn13 = destash33(setfn, ____r246)
  ____id105 = ____r246
  __args27 = cut(____id105, 0)
  def __f49(v=None, l=None, n=None):
    return ["set", ["at", l, either(n, 0)], v]
  return define_setter("hd", __f49, __setfn13, __args27)

setenv("hd", place_expander=__f48)
def __f50(setfn=None, *_args, **_keys):
  ____r250 = unstash(_args, _keys)
  __setfn15 = destash33(setfn, ____r250)
  ____id107 = ____r250
  __args29 = cut(____id107, 0)
  def __f51(v=None, l=None):
    return ["set", ["at", l, ["edge", l]], v]
  return define_setter("last", __f51, __setfn15, __args29)

setenv("last", place_expander=__f50)
def __def__macro(name=None, *_args, **_keys):
  ____r253 = unstash(_args, _keys)
  __name13 = destash33(name, ____r253)
  ____id109 = ____r253
  __body59 = cut(____id109, 0)
  return join(["define-global", __name13], __body59)

setenv("def", macro=__def__macro)
def __mac__macro(name=None, *_args, **_keys):
  ____r255 = unstash(_args, _keys)
  __name15 = destash33(name, ____r255)
  ____id1111 = ____r255
  __body61 = cut(____id1111, 0)
  return join(["define-macro", __name15], __body61)

setenv("mac", macro=__mac__macro)
def __defconst__macro(name=None, *_args, **_keys):
  ____r257 = unstash(_args, _keys)
  __name17 = destash33(name, ____r257)
  ____id113 = ____r257
  __value1 = cut(____id113, 0)
  return join(["def", __name17], __value1)

setenv("defconst", macro=__defconst__macro)
def __undefined63__macro(name=None):
  ____x641 = object(["target"])
  ____x641["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x641["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x641["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x641

setenv("undefined?", macro=__undefined63__macro)
def __defvar__macro(name=None, *_args, **_keys):
  ____r261 = unstash(_args, _keys)
  __name19 = destash33(name, ____r261)
  ____id115 = ____r261
  __value3 = cut(____id115, 0)
  ____x658 = object(["target"])
  ____x658["py"] = ["global", __name19]
  return ["when", ["undefined?", __name19], ____x658, join(["defconst", __name19], __value3)]

setenv("defvar", macro=__defvar__macro)
def __async__macro(keyword=None, *_args, **_keys):
  ____r263 = unstash(_args, _keys)
  __keyword1 = destash33(keyword, ____r263)
  ____id117 = ____r263
  __body63 = cut(____id117, 0)
  ____x663 = object([__keyword1])
  ____x663["async"] = True
  return join(____x663, __body63)

setenv("async", macro=__async__macro)
def __L_37read_from_file__macro(name=None):
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]]

setenv("%read-from-file", macro=__L_37read_from_file__macro)
def __the__macro(name=None):
  return ["getenv", ["quote", name], ["quote", "value"]]

setenv("the", macro=__the__macro)
def __cat__macro(a=None, *_args, **_keys):
  ____r269 = unstash(_args, _keys)
  __a10 = destash33(a, ____r269)
  ____id119 = ____r269
  __bs9 = cut(____id119, 0)
  if nil63(__a10):
    return ""
  else:
    if none63(__bs9):
      return __a10
    else:
      if one63(__bs9):
        ____x688 = object(["target", join(["%cat", __a10], __bs9)])
        ____x688["py"] = join(["%call", "cat", __a10], __bs9)
        return ____x688
      else:
        ____x691 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]])
        ____x691["py"] = join(["%call", "cat", __a10], __bs9)
        return ____x691

setenv("cat", macro=__cat__macro)
def __L_43__macro(*_args, **_keys):
  __args31 = unstash(_args, _keys)
  if none63(__args31):
    return 0
  else:
    if one63(__args31):
      return hd(__args31)
    else:
      return join(["%add"], __args31)

setenv("+", macro=__L_43__macro)
def __L___macro(*_args, **_keys):
  __args33 = unstash(_args, _keys)
  if none63(__args33):
    return 0
  else:
    if one63(__args33):
      return ["%unm", hd(__args33)]
    else:
      return join(["%sub"], __args33)

setenv("-", macro=__L___macro)
def __L_42__macro(*_args, **_keys):
  __args35 = unstash(_args, _keys)
  if none63(__args35):
    return 1
  else:
    if one63(__args35):
      return hd(__args35)
    else:
      return join(["%mul"], __args35)

setenv("*", macro=__L_42__macro)
def __L_47__macro(*_args, **_keys):
  __args37 = unstash(_args, _keys)
  if none63(__args37):
    return 1
  else:
    if one63(__args37):
      return hd(__args37)
    else:
      return join(["%div"], __args37)

setenv("/", macro=__L_47__macro)
def __L_4747__macro(*_args, **_keys):
  __args39 = unstash(_args, _keys)
  if none63(__args39):
    return 1
  else:
    if one63(__args39):
      return hd(__args39)
    else:
      return join(["%idiv"], __args39)

setenv("//", macro=__L_4747__macro)
def __L_37__macro(*_args, **_keys):
  __args41 = unstash(_args, _keys)
  if none63(__args41):
    return 0
  else:
    if one63(__args41):
      return hd(__args41)
    else:
      return join(["%mod"], __args41)

setenv("%", macro=__L_37__macro)
def __L_60__macro(a=None, *_args, **_keys):
  ____r271 = unstash(_args, _keys)
  __a12 = destash33(a, ____r271)
  ____id1211 = ____r271
  __bs111 = cut(____id1211, 0)
  if none63(__bs111):
    return True
  else:
    if one63(__bs111):
      return join(["%lt", __a12], __bs111)
    else:
      return ["%and", ["%lt", __a12, hd(__bs111)], join(["<"], __bs111)]

setenv("<", macro=__L_60__macro)
def __L_6061__macro(a=None, *_args, **_keys):
  ____r273 = unstash(_args, _keys)
  __a14 = destash33(a, ____r273)
  ____id123 = ____r273
  __bs13 = cut(____id123, 0)
  if none63(__bs13):
    return True
  else:
    if one63(__bs13):
      return join(["%le", __a14], __bs13)
    else:
      return ["%and", ["%le", __a14, hd(__bs13)], join(["<="], __bs13)]

setenv("<=", macro=__L_6061__macro)
def __L_61__macro(a=None, *_args, **_keys):
  ____r275 = unstash(_args, _keys)
  __a16 = destash33(a, ____r275)
  ____id125 = ____r275
  __bs15 = cut(____id125, 0)
  if none63(__bs15):
    return True
  else:
    if one63(__bs15):
      return join(["%eq", __a16], __bs15)
    else:
      return ["%and", ["%eq", __a16, hd(__bs15)], join(["="], __bs15)]

setenv("=", macro=__L_61__macro)
def __L_6261__macro(a=None, *_args, **_keys):
  ____r277 = unstash(_args, _keys)
  __a18 = destash33(a, ____r277)
  ____id127 = ____r277
  __bs17 = cut(____id127, 0)
  if none63(__bs17):
    return True
  else:
    if one63(__bs17):
      return join(["%ge", __a18], __bs17)
    else:
      return ["%and", ["%ge", __a18, hd(__bs17)], join([">="], __bs17)]

setenv(">=", macro=__L_6261__macro)
def __L_62__macro(a=None, *_args, **_keys):
  ____r279 = unstash(_args, _keys)
  __a20 = destash33(a, ____r279)
  ____id129 = ____r279
  __bs19 = cut(____id129, 0)
  if none63(__bs19):
    return True
  else:
    if one63(__bs19):
      return join(["%gt", __a20], __bs19)
    else:
      return ["%and", ["%gt", __a20, hd(__bs19)], join([">"], __bs19)]

setenv(">", macro=__L_62__macro)
def __not__macro(*_args, **_keys):
  __args43 = unstash(_args, _keys)
  if none63(__args43):
    return False
  else:
    if one63(__args43):
      return join(["%not"], __args43)
    else:
      return ["%and", ["%not", hd(__args43)], join(["not"], tl(__args43))]

setenv("not", macro=__not__macro)
def __and__macro(a=None, *_args, **_keys):
  ____r281 = unstash(_args, _keys)
  __a22 = destash33(a, ____r281)
  ____id131 = ____r281
  __bs211 = cut(____id131, 0)
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
  ____r283 = unstash(_args, _keys)
  __a24 = destash33(a, ____r283)
  ____id133 = ____r283
  __bs23 = cut(____id133, 0)
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
def __bnot__macro(*_args, **_keys):
  __args45 = unstash(_args, _keys)
  def __f52(x=None):
    return ["%bnot", x]
  return join(["band"], map(__f52, __args45))

setenv("bnot", macro=__bnot__macro)
def __band__macro(a=None, *_args, **_keys):
  ____r287 = unstash(_args, _keys)
  __a26 = destash33(a, ____r287)
  ____id135 = ____r287
  __bs25 = cut(____id135, 0)
  if none63(__bs25):
    return __a26
  else:
    return ["%band", __a26, join(["band"], __bs25)]

setenv("band", macro=__band__macro)
def __bor__macro(a=None, *_args, **_keys):
  ____r289 = unstash(_args, _keys)
  __a28 = destash33(a, ____r289)
  ____id137 = ____r289
  __bs27 = cut(____id137, 0)
  if none63(__bs27):
    return __a28
  else:
    return ["%bor", __a28, join(["bor"], __bs27)]

setenv("bor", macro=__bor__macro)
def __break__macro(*_args, **_keys):
  __args47 = unstash(_args, _keys)
  return join(["%break"], __args47)

setenv("break", macro=__break__macro)
def __return__macro(*_args, **_keys):
  __args49 = unstash(_args, _keys)
  return join(["%return"], __args49)

setenv("return", macro=__return__macro)
def __while__macro(c=None, *_args, **_keys):
  ____r291 = unstash(_args, _keys)
  __c3 = destash33(c, ____r291)
  ____id139 = ____r291
  __body65 = cut(____id139, 0)
  return join(["%while", __c3], __body65)

setenv("while", macro=__while__macro)
def __do__macro(*_args, **_keys):
  __body67 = unstash(_args, _keys)
  return join(["%do"], __body67)

setenv("do", macro=__do__macro)
def __get__macro(*_args, **_keys):
  __args51 = unstash(_args, _keys)
  return join(["%get"], __args51)

setenv("get", macro=__get__macro)
def __idx__macro(*_args, **_keys):
  __args53 = unstash(_args, _keys)
  return join(["%idx"], __args53)

setenv("idx", macro=__idx__macro)
def __new__macro(*_args, **_keys):
  __args55 = unstash(_args, _keys)
  return join(["%new"], __args55)

setenv("new", macro=__new__macro)
def __typeof__macro(*_args, **_keys):
  __args57 = unstash(_args, _keys)
  return join(["%typeof"], __args57)

setenv("typeof", macro=__typeof__macro)
def __error__macro(*_args, **_keys):
  __args59 = unstash(_args, _keys)
  return join(["%error"], __args59)

setenv("error", macro=__error__macro)
def __throw__macro(*_args, **_keys):
  __args61 = unstash(_args, _keys)
  return join(["%throw"], __args61)

setenv("throw", macro=__throw__macro)
def __raise__macro(*_args, **_keys):
  __args63 = unstash(_args, _keys)
  return join(["%throw"], __args63)

setenv("raise", macro=__raise__macro)
def __is__macro(*_args, **_keys):
  __args65 = unstash(_args, _keys)
  ____x835 = object(["target", join(["="], __args65)])
  ____x835["py"] = join(["%is"], __args65)
  return ____x835

setenv("is", macro=__is__macro)
def __in__macro(*_args, **_keys):
  __args67 = unstash(_args, _keys)
  return join(["%in"], __args67)

setenv("in", macro=__in__macro)
def __as__macro(*_args, **_keys):
  __args69 = unstash(_args, _keys)
  return join(["%as"], __args69)

setenv("as", macro=__as__macro)
def __L_37expand_case__macro(x=None, *_args, **_keys):
  ____r293 = unstash(_args, _keys)
  __x850 = destash33(x, ____r293)
  ____id142 = ____r293
  __body69 = cut(____id142, 0)
  __e33 = None
  if atom63(__x850):
    __e33 = [__x850]
  else:
    __e33 = __x850
  ____id143 = __e33
  __a30 = has(____id143, 0)
  __bs29 = cut(____id143, 1)
  __e34 = None
  if none63(__bs29):
    __e34 = [["%literal"]]
  else:
    __e34 = __bs29
  return join(["%block", __a30], __e34, __body69)

setenv("%expand-case", macro=__L_37expand_case__macro)
def __L_37cases__macro(*_args, **_keys):
  __args71 = unstash(_args, _keys)
  if none63(__args71):
    return ["do"]
  else:
    if one63(__args71):
      return join(["%expand-case"], hd(__args71))
    else:
      __r296 = unique("r")
      def __f53(__x869=None):
        ____id145 = __x869
        __x870 = has(____id145, 0)
        __body71 = cut(____id145, 1)
        return ["%expand-case", __x870, ["%set", __r296, join(["%do"], __body71)]]
      return join(["with", __r296, "nil"], map(__f53, almost(__args71)), [join(["%expand-case"], last(__args71))])

setenv("%cases", macro=__L_37cases__macro)
def __try__macro(x=None, *_args, **_keys):
  ____r299 = unstash(_args, _keys)
  __x890 = destash33(x, ____r299)
  ____id150 = ____r299
  __cases1 = cut(____id150, 0)
  __fin1 = ["finally"]
  ____o27 = __cases1
  ____i48 = None
  for ____i48 in indices(____o27):
    __x892 = ____o27[____i48]
    if hd63(__x892, "finally"):
      __fin1 = __x892
  __forms7 = []
  ____x895 = __cases1
  ____i49 = 0
  while ____i49 < L_35(____x895):
    ____id151 = ____x895[____i49]
    __x896 = has(____id151, 0)
    __body75 = cut(____id151, 1)
    if __x896 == "finally":
      pass
    else:
      if __x896 == "except" and has(__body75, 1) == "as":
        ____id152 = __body75
        __kind2 = has(____id152, 0)
        ___1 = has(____id152, 1)
        __name21 = has(____id152, 2)
        __body76 = cut(____id152, 3)
        add(__forms7, join([[__x896, ["%as", __kind2, __name21]]], __body76))
      else:
        if __x896 == "except":
          ____id153 = __body75
          __kind3 = has(____id153, 0)
          __body77 = cut(____id153, 1)
          add(__forms7, join([[__x896, __kind3]], __body77))
        else:
          raise Exception("Unknown try clause")
    ____i49 = ____i49 + 1
  return join(["%cases", ["try", __x890]], __forms7, [__fin1])

setenv("try", macro=__try__macro)
def __errsafe__macro(x=None, L_else=None):
  if nil63(L_else):
    L_else = "nil"
  __ok8 = unique("ok")
  __v38 = unique("v")
  return ["let", [[__ok8, __v38], ["guard", x]], ["if", __ok8, __v38, L_else]]

setenv("errsafe", macro=__errsafe__macro)
def __dbg__macro():
  ____x919 = object(["target", ["do"]])
  ____x919["py"] = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]]
  return ____x919

setenv("dbg", macro=__dbg__macro)
def __see__macro(form=None):
  __form9 = expand(form)
  L_print(compile(expand(["%set", "lumen-result", __form9])))
  return __form9

setenv("see", macro=__see__macro)
def __class__macro(name=None, *_args, **_keys):
  ____r307 = unstash(_args, _keys)
  __name23 = destash33(name, ____r307)
  ____id155 = ____r307
  __body79 = cut(____id155, 0)
  return join(["%block", "class", __name23], __body79)

setenv("class", macro=__class__macro)
import sys
_G = sys.modules["__main__"]
from .runtime import *
from .macros import *
from . import reader
from . import compiler
from . import system
compiler.lumen_globals42 = globals()
import traceback
____r308 = None
try:
  import numpy as np
  ____r308 = np
except ImportError:
  ____r308 = None
finally:
  pass
import inspect
def module63(x=None):
  return inspect.ismodule(x)

module63 = module63
import inspect
def class63(x=None):
  return inspect.isclass(x)

class63 = class63
def disp(L_str=None):
  system.write(L_str)
  return system.flush()

disp = disp
from pprint import pprint as pp
def entries(x=None):
  __r313 = []
  __mods = []
  ____x930 = dir(x)
  ____i50 = 0
  while ____i50 < L_35(____x930):
    __k28 = ____x930[____i50]
    if not( clip(__k28, 0, 2) == "__"):
      __v39 = getattr(x, __k28)
      if function63(__v39):
        add(__r313, __k28)
      else:
        if module63(__v39):
          add(__mods, cat(".", __k28))
        else:
          add(__r313, [__k28, __v39])
    ____i50 = ____i50 + 1
  ____x932 = __mods
  ____i51 = 0
  while ____i51 < L_35(____x932):
    __x933 = ____x932[____i51]
    add(__r313, __x933)
    ____i51 = ____i51 + 1
  return __r313

entries = entries
from io import StringIO
def pp_to_string(x=None):
  __r315 = StringIO()
  pp(x, __r315)
  return __r315.getvalue()

pp_to_string = pp_to_string
def lines(x=None):
  return split(x, "\n")

lines = lines
def get_indentation(s=None):
  __r318 = ""
  __i52 = 0
  while __i52 < L_35(s):
    __c4 = char(s, __i52)
    if __c4 == " ":
      __r318 = cat(__r318, __c4)
    __i52 = __i52 + 1
  return __r318

get_indentation = get_indentation
def strip_outer(s=None, lh=None, rh=None):
  if string_starts63(s, lh) and string_ends63(s, rh):
    return clip(clip(s, 0, L_35(s) - L_35(rh)), L_35(lh))
  else:
    return s

strip_outer = strip_outer
def pp_obj(x=None):
  s = pp_to_string(entries(x))
  s = s.rstrip()
  s = strip_outer(s, "[", "]")
  s = cat(" ", s)
  ____x934 = lines(s)
  ____i53 = 0
  while ____i53 < L_35(____x934):
    __x935 = ____x934[____i53]
    __ind = get_indentation(__x935)
    __x935 = __x935.rstrip(",")
    __id156 = simple_id63(strip_outer(__x935.strip(), "'", "'"))
    __e35 = None
    if __id156:
      __e35 = cat(__ind, __id156)
    else:
      __e35 = __x935
    L_print(__e35)
    ____i53 = ____i53 + 1
  return L_print(repr(x))

pp_obj = pp_obj
def pp_doc(x=None):
  __doc = docstring(x)
  if __doc:
    return L_print(cat("\n\"\"\"\n", __doc.strip(), "\n\"\"\""))

pp_doc = pp_doc
def pp_toplevel(x=None):
  if not( atom63(x) or (isinstance(x, list) or (isinstance(x, tuple) or (isinstance(x, dict) or module63(x))))):
    pp_doc(x)
  if module63(x) or class63(x):
    pp_obj(x)
  else:
    pp(x)
  if module63(x):
    return pp_doc(x)

pp_toplevel = pp_toplevel
def docstring(x=None):
  def __f54():
    try:
      ____y9 = inspect.getdoc(x)
      __e36 = None
      if yes(____y9):
        __x938 = ____y9
        __e37 = None
        if string63(__x938):
          __e37 = __x938
        else:
          __e37 = L_str(__x938)
        __e36 = __e37
      return [True, __e36]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id157 = __f54()
  ____ok9 = has(____id157, 0)
  ____v40 = has(____id157, 1)
  if ____ok9:
    return ____v40
  else:
    return None

docstring = docstring
def lumen_set_globals(x=None):
  compiler.lumen_globals = x
  return compiler.lumen_globals

lumen_set_globals = lumen_set_globals
def toplevel_print(v=None):
  return pp_toplevel(v)

toplevel_print = toplevel_print
def print_exception(v=None, ex=None):
  traceback.print_exception(*ex)
  return None

print_exception = print_exception
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

eval_self_form = eval_self_form
def eval_print(form=None):
  __form10 = eval_self_form(form)
  def __f55():
    try:
      return [True, compiler.eval(__form10)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id158 = __f55()
  __ok10 = has(____id158, 0)
  __v41 = has(____id158, 1)
  __ex = has(____id158, 2)
  if not __ok10:
    return print_exception(__v41, __ex)
  else:
    if is63(__v41):
      return toplevel_print(__v41)

eval_print = eval_print
def read_toplevel(L_str=None, more=None):
  __s3 = reader.stream(L_str, more)
  def __f56():
    try:
      return [True, reader.read_all(__s3)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id159 = __f56()
  ____ok11 = has(____id159, 0)
  ____v42 = has(____id159, 1)
  __e38 = None
  if ____ok11:
    __e38 = ____v42
  else:
    __e38 = None
  __x946 = __e38
  if __x946 == more:
    return more
  else:
    if nil63(__x946):
      return __x946
    else:
      if one63(__x946):
        return hd(__x946)
      else:
        return __x946

read_toplevel = read_toplevel
def rep(L_str=None):
  __v43 = eval(read_toplevel(L_str))
  if is63(__v43):
    return toplevel_print(__v43)

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
    __form11 = read_toplevel(o["buf"], __more)
    if not( __form11 == __more):
      eval_print(__form11)
      return reset()
  reset()
  while True:
    __s4 = system.read_line(ctrl_c)
    if not( __s4 == ctrl_c):
      if is63(__s4):
        rep1(cat(__s4, "\n"))
      else:
        break

def __with_file_directory__macro(file=None, name=None, *_args, **_keys):
  ____r337 = unstash(_args, _keys)
  __file1 = destash33(file, ____r337)
  __name25 = destash33(name, ____r337)
  ____id161 = ____r337
  __body81 = cut(____id161, 0)
  __cwd1 = unique("cwd")
  return ["let", [__cwd1, ["system", [".cwd"]], __name25, __file1, __name25, ["system", [".basename", __file1]]], ["system", [".chdir", ["system", [".dirname", __file1]]]], ["after", join(["do"], __body81), ["system", [".chdir", __cwd1]]]]

setenv("with-file-directory", macro=__with_file_directory__macro)
def read_file(path=None):
  ____cwd2 = system.cwd()
  __name26 = path
  __name27 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r340 = None
  try:
    ____r340 = system.read_file(__name27)
  finally:
    system.chdir(____cwd2)
  return ____r340

read_file = read_file
def read_from_file(path=None):
  __data = read_file(path)
  ____cwd3 = system.cwd()
  __name28 = path
  __name29 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r343 = None
  try:
    __s5 = reader.stream(__data)
    ____r343 = reader.read_all(__s5)
  finally:
    system.chdir(____cwd3)
  return ____r343

read_from_file = read_from_file
def expand_file(path=None):
  __body82 = read_from_file(path)
  ____cwd4 = system.cwd()
  __name30 = path
  __name31 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r346 = None
  try:
    ____r346 = compiler.expand(join(["do"], __body82))
  finally:
    system.chdir(____cwd4)
  return ____r346

expand_file = expand_file
def compile_file(path=None):
  __form12 = expand_file(path)
  ____cwd5 = system.cwd()
  __name32 = path
  __name33 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r349 = None
  try:
    ____r349 = compiler.compile(__form12, stmt=True)
  finally:
    system.chdir(____cwd5)
  return ____r349

compile_file = compile_file
def load(path=None):
  __previous = has(setenv("target", toplevel=True), "value")
  __previous_indent = has(setenv("indent-level", toplevel=True), "value")
  setenv("target", toplevel=True)["value"] = "py"
  setenv("indent-level", toplevel=True)["value"] = 0
  __code = compile_file(path)
  setenv("indent-level", toplevel=True)["value"] = __previous_indent
  setenv("target", toplevel=True)["value"] = __previous
  ____cwd6 = system.cwd()
  __name34 = path
  __name35 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r352 = None
  try:
    ____r352 = compiler.run(__code)
  finally:
    system.chdir(____cwd6)
  return ____r352

load = load
def run_script(path=None, argv=None):
  if nil63(argv):
    argv = []
  L_print(L_str(["run-script", path, argv]))
  system.set_argv(argv)
  _G.exports = {}
  load(path)
  if has(_G.exports, "main"):
    return _G.exports["main"](argv)

run_script = run_script
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
    return run_script(__arg, tl(args))
  else:
    if __arg == "-h" or __arg == "--help":
      return usage()
    else:
      __pre = []
      __input = None
      __output = None
      __target1 = None
      __expr10 = None
      __argv = args
      __i54 = 0
      while __i54 < L_35(__argv):
        __a31 = __argv[__i54]
        if __a31 == "-c" or (__a31 == "-o" or (__a31 == "-t" or __a31 == "-e")):
          if __i54 == edge(__argv):
            L_print(cat("missing argument for ", __a31))
          else:
            __i54 = __i54 + 1
            __val2 = __argv[__i54]
            if __a31 == "-c":
              __input = __val2
            else:
              if __a31 == "-o":
                __output = __val2
              else:
                if __a31 == "-t":
                  __target1 = __val2
                else:
                  if __a31 == "-e":
                    __expr10 = __val2
        else:
          if not( "-" == char(__a31, 0)):
            add(__pre, __a31)
        __i54 = __i54 + 1
      ____x980 = __pre
      ____i55 = 0
      while ____i55 < L_35(____x980):
        __file2 = ____x980[____i55]
        run_file(__file2)
        ____i55 = ____i55 + 1
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
  main(system.get_argv())
