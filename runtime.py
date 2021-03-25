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
    ____x2 = x
    ____i = 0
    while ____i < L_35(____x2):
      __v = ____x2[____i]
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

clip = clip
def dupe(x=None):
  return {}

dupe = dupe
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
  __x3 = char(s, n)
  if __x3:
    return ord(__x3)

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
  ____x4 = __ls
  ____i8 = 0
  while ____i8 < L_35(____x4):
    __l3 = ____x4[____i8]
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
      def __f5(y=None):
        return test(y, x)
      return __f5
    else:
      def __f4(y=None):
        return x == y
      return __f4

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
    __e4 = None
    if __i13 + 1 < __n15:
      __e4 = l[__i13 + 1]
    __b = __e4
    add(__l12, [__a, __b])
    __i13 = __i13 + 1
    __i13 = __i13 + 1
  return __l12

pair = pair
import functools
def sortfunc(f=None):
  if f:
    def __f6(a=None, b=None):
      if f(a, b):
        return -1
      else:
        return 1
    __f2 = __f6
    return functools.cmp_to_key(__f2)

def sort(l=None, f=None):
  l.sort(key=sortfunc(f))
  return l

sort = sort
def map(f=None, x=None):
  __t2 = dupe(x)
  ____x6 = x
  ____i14 = 0
  while ____i14 < L_35(____x6):
    __v10 = ____x6[____i14]
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
  ____x7 = x
  ____i16 = 0
  while ____i16 < L_35(____x7):
    __v12 = ____x7[____i16]
    __e5 = None
    if f:
      __e5 = f(__v12)
    else:
      __e5 = __v12
    __y6 = __e5
    if is63(__y6):
      __r62 = cat(__r62, __c, __y6)
      __c = sep or ""
    ____i16 = ____i16 + 1
  return __r62

mapcat = mapcat
def keep(f=None, x=None):
  def __f7(v=None):
    if yes(f(v)):
      return v
  return map(__f7, x)

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
    __x8 = ____o10[____i18]
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

string_ends63 = string_ends63
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
  def __f8(a=None, b=None):
    return cat2(a, b)
  return reduce(__f8, __xs, "")

cat = cat
def L_43(*_args, **_keys):
  __xs1 = unstash(_args, _keys)
  def __f9(a=None, b=None):
    return a + b
  return reduce(__f9, __xs1, 0)

L_43 = L_43
def L_45(*_args, **_keys):
  __xs2 = unstash(_args, _keys)
  def __f10(b=None, a=None):
    return a - b
  return reduce(__f10, reverse(__xs2), 0)

L_45 = L_45
def L_42(*_args, **_keys):
  __xs3 = unstash(_args, _keys)
  def __f11(a=None, b=None):
    return a * b
  return reduce(__f11, __xs3, 1)

L_42 = L_42
def L_47(*_args, **_keys):
  __xs4 = unstash(_args, _keys)
  def __f12(b=None, a=None):
    return a / b
  return reduce(__f12, reverse(__xs4), 1)

L_47 = L_47
def L_37(*_args, **_keys):
  __xs5 = unstash(_args, _keys)
  def __f13(b=None, a=None):
    return a % b
  return reduce(__f13, reverse(__xs5), 1)

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
  def __f14(a=None, b=None):
    return a < b
  return pairwise(__f14, __xs6)

L_60 = L_60
def L_62(*_args, **_keys):
  __xs7 = unstash(_args, _keys)
  def __f15(a=None, b=None):
    return a > b
  return pairwise(__f15, __xs7)

L_62 = L_62
def L_61(*_args, **_keys):
  __xs8 = unstash(_args, _keys)
  def __f16(a=None, b=None):
    return a == b
  return pairwise(__f16, __xs8)

L_61 = L_61
def L_6061(*_args, **_keys):
  __xs9 = unstash(_args, _keys)
  def __f17(a=None, b=None):
    return a <= b
  return pairwise(__f17, __xs9)

L_6061 = L_6061
def L_6261(*_args, **_keys):
  __xs10 = unstash(_args, _keys)
  def __f18(a=None, b=None):
    return a >= b
  return pairwise(__f18, __xs10)

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
      __i27 = __i27 + 1
    return cat(__s1, "\"")

escape = escape
def simple_id63(x=None):
  from pymen.reader import read_string
  def __f19():
    try:
      return [True, read_string(x)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id = __f19()
  ____ok = has(____id, 0)
  ____v19 = has(____id, 1)
  __e12 = None
  if ____ok:
    __e12 = ____v19
  else:
    __e12 = None
  __r96 = __e12
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
                        def __f20(__x14=None, __x15=None):
                          ____id1 = __x14
                          __a2 = has(____id1, 0)
                          ____id2 = __x15
                          __b2 = has(____id2, 0)
                          return __a2 < __b2
                        sort(__ks, __f20)
                        drop(__l5)
                        ____x16 = __xs11
                        ____i29 = 0
                        while ____i29 < L_35(____x16):
                          __v21 = ____x16[____i29]
                          __s = cat(__s, __sp, __v21)
                          __sp = " "
                          ____i29 = ____i29 + 1
                        ____x17 = __ks
                        ____i30 = 0
                        while ____i30 < L_35(____x17):
                          ____id3 = ____x17[____i30]
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
  def __f21(a=None, b=None):
    return cat(a, "_", b)
  return reduce(__f21, split(k, "-"))

identifier = identifier
def setenv(k=None, *_args, **_keys):
  ____r103 = unstash(_args, _keys)
  __k17 = destash33(k, ____r103)
  ____id5 = ____r103
  __keys = cut(____id5, 0)
  if string63(__k17):
    __e13 = None
    if has63(__keys, "toplevel"):
      __e13 = hd(environment)
    else:
      __e13 = last(environment)
    __frame = __e13
    __e14 = None
    if has63(__frame, __k17):
      __e14 = __frame[__k17]
    else:
      __e14 = {}
    __entry = __e14
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
