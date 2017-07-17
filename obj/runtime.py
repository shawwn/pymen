environment = [{}]
target = "py"
def nil63(x):
  pass
def is63(x):
  return _not(nil63(x))
def no(x):
  return _or(nil63(x), _61(x, False))
def yes(x):
  return _not(no(x))
def either(x, y):
  if is63(x) then
    return x
  else
    return y

def has63(l, k):
  pass
def array63(x):
  pass
def array(x):
  if array63(x) then
    return x
  else
    __l = []
    ____o = x
    __k = None
    for (__k in ____o) {
      __v = ____o[__k]

      if numeric63(__k) then
        __e = parseInt(__k)
      else
        __e = __k

      __k1 = __e
      if number63(__k1) then
        __l[__k1] = __v

    }
    return __l

def object(x):
  if array63(x) then
    __l1 = {}
    ____o1 = x
    __k2 = None
    for (__k2 in ____o1) {
      __v1 = ____o1[__k2]

      if numeric63(__k2) then
        __e1 = parseInt(__k2)
      else
        __e1 = __k2

      __k3 = __e1
      __l1[__k3] = __v1
    }
    return __l1
  else
    return x

def length(x):
  __n2 = -1
  ____o2 = x
  __k4 = None
  for (__k4 in ____o2) {
    __v2 = ____o2[__k4]

    if numeric63(__k4) then
      __e2 = parseInt(__k4)
    else
      __e2 = __k4

    __k5 = __e2
    if number63(__k5) then
      if __k5 > __n2 then
        __n2 = __k5


  }
  __n2 = __n2 + 1
  return __n2
def _35(x):
  pass
def none63(x):
  return _61(_35(x), 0)
def some63(x):
  return _35(x) > 0
def one63(x):
  return _61(_35(x), 1)
def two63(x):
  return _61(_35(x), 2)
def hd(l):
  return l[0]
def string63(x):
  return _61(type(x), "string")
def number63(x):
  return _61(type(x), "number")
def boolean63(x):
  return _61(type(x), "boolean")
def function63(x):
  return _61(type(x), "function")
def obj63(x):
  return _and(is63(x), _61(type(x)))
def atom63(x):
  return _or(nil63(x), string63(x))
nan = 0 / 0
inf = 1 / 0
_inf = - inf
def nan63(n):
  return _not(_61(n, n))
def inf63(n):
  return _or(_61(n, inf), _61(n, _inf))
def clip(s, from, upto):
  pass
def dupe(x):
  pass
def cut(x, from, upto):
  __l2 = dupe(x)
  __j = 0

  if _or(nil63(from), from < 0) then
    __e3 = 0
  else
    __e3 = from

  __i3 = __e3
  __n4 = _35(x)

  if _or(nil63(upto), upto > __n4) then
    __e4 = __n4
  else
    __e4 = upto

  __upto = __e4
  while __i3 < __upto:
    __l2[__j] = x[__i3]
    __i3 = __i3 + 1
    __j = __j + 1
  ____o3 = x
  __k6 = None
  for (__k6 in ____o3) {
    __v3 = ____o3[__k6]

    if numeric63(__k6) then
      __e5 = parseInt(__k6)
    else
      __e5 = __k6

    __k7 = __e5
    if _not(number63(__k7)) then
      __l2[__k7] = __v3

  }
  return __l2
def keys(x):
  __t = dupe(x)
  ____o4 = x
  __k8 = None
  for (__k8 in ____o4) {
    __v4 = ____o4[__k8]

    if numeric63(__k8) then
      __e6 = parseInt(__k8)
    else
      __e6 = __k8

    __k9 = __e6
    if _not(number63(__k9)) then
      __t[__k9] = __v4

  }
  return __t
def edge(x):
  return _35(x) - 1
def inner(x):
  return clip(x, 1, edge(x))
def tl(l):
  return cut(l, 1)
def char(s, n):
  pass
def code(s, n):
  pass
def string_literal63(x):
  return _and(string63(x), _61(char(x, 0), "\""))
def id_literal63(x):
  return _and(string63(x), _61(char(x, 0), "|"))
def add(l, x):
  pass
def drop(l):
  pass
def last(l):
  return l[edge(l)]
def almost(l):
  return cut(l, 0, edge(l))
def reverse(l):
  __l11 = keys(l)
  __i6 = edge(l)
  while __i6 >= 0:
    add(__l11, l[__i6])
    __i6 = __i6 - 1
  return __l11
def reduce(f, x):
  if none63(x) then
    return None
  else
    if one63(x) then
      return hd(x)
    else
      return f(hd(x), reduce(f, tl(x)))


def join():
  __ls = unstash([...])
  __r41 = []
  ____x2 = __ls
  ____i7 = 0
  while ____i7 < _35(____x2):
    __l3 = ____x2[____i7]
    if __l3 then
      __n7 = _35(__r41)
      ____o5 = __l3
      __k10 = None
      for (__k10 in ____o5) {
        __v5 = ____o5[__k10]

        if numeric63(__k10) then
          __e7 = parseInt(__k10)
        else
          __e7 = __k10

        __k11 = __e7
        if number63(__k11) then
          __k11 = __k11 + __n7
        else
          __l3 = object(__l3)

        __r41[__k11] = __v5
      }

    ____i7 = ____i7 + 1
  return __r41
def find(f, t):
  ____o6 = t
  ____i9 = None
  for (____i9 in ____o6) {
    __x3 = ____o6[____i9]

    if numeric63(____i9) then
      __e8 = parseInt(____i9)
    else
      __e8 = ____i9

    ____i91 = __e8
    __y = f(__x3)
    if __y then
      return __y

  }
def first(f, l):
  ____x4 = l
  ____i10 = 0
  while ____i10 < _35(____x4):
    __x5 = ____x4[____i10]
    __y1 = f(__x5)
    if __y1 then
      return __y1

    ____i10 = ____i10 + 1
def in63(x, t):
  def __f1(y):
    return _61(x, y)
  return find(__f1, t)
def pair(l):
  __l12 = dupe(l)
  __i11 = 0
  while __i11 < _35(l):
    add(__l12, [l[__i11], l[__i11 + 1]])
    __i11 = __i11 + 1
    __i11 = __i11 + 1
  return __l12
def sort(l, f):
  pass
def map(f, x):
  __t1 = dupe(x)
  ____x7 = x
  ____i12 = 0
  while ____i12 < _35(____x7):
    __v6 = ____x7[____i12]
    __y2 = f(__v6)
    if is63(__y2) then
      add(__t1, __y2)

    ____i12 = ____i12 + 1
  ____o7 = x
  __k12 = None
  for (__k12 in ____o7) {
    __v7 = ____o7[__k12]

    if numeric63(__k12) then
      __e9 = parseInt(__k12)
    else
      __e9 = __k12

    __k13 = __e9
    if _not(number63(__k13)) then
      __y3 = f(__v7)
      if is63(__y3) then
        __t1[__k13] = __y3


  }
  return __t1
def keep(f, x):
  def __f2(v):
    if yes(f(v)) then
      return v

  return map(__f2, x)
def keys63(t):
  ____o8 = t
  __k14 = None
  for (__k14 in ____o8) {
    __v8 = ____o8[__k14]

    if numeric63(__k14) then
      __e10 = parseInt(__k14)
    else
      __e10 = __k14

    __k15 = __e10
    if _not(number63(__k15)) then
      return True

  }
  return False
def empty63(t):
  ____o9 = t
  ____i15 = None
  for (____i15 in ____o9) {
    __x8 = ____o9[____i15]

    if numeric63(____i15) then
      __e11 = parseInt(____i15)
    else
      __e11 = ____i15

    ____i151 = __e11
    return False
  }
  return True
def stash(args):
  if keys63(args) then
    __p = {}
    ____o10 = args
    __k16 = None
    for (__k16 in ____o10) {
      __v9 = ____o10[__k16]

      if numeric63(__k16) then
        __e12 = parseInt(__k16)
      else
        __e12 = __k16

      __k17 = __e12
      if _not(number63(__k17)) then
        __p[__k17] = __v9

    }
    __p._stash = True
    add(args, __p)

  if array63(args) then
    return args
  else
    return array(args)

def unstash(args):
  if none63(args) then
    return {}
  else
    __l4 = last(args)
    if _and(obj63(__l4), __l4._stash) then
      __args1 = object(almost(args))
      ____o11 = __l4
      __k18 = None
      for (__k18 in ____o11) {
        __v10 = ____o11[__k18]

        if numeric63(__k18) then
          __e13 = parseInt(__k18)
        else
          __e13 = __k18

        __k19 = __e13
        if _not(_61(__k19, "_stash")) then
          __args1[__k19] = __v10

      }
      return __args1
    else
      return args


def destash33(l, args1):
  if _and(obj63(l), l._stash) then
    ____o12 = l
    __k20 = None
    for (__k20 in ____o12) {
      __v11 = ____o12[__k20]

      if numeric63(__k20) then
        __e14 = parseInt(__k20)
      else
        __e14 = __k20

      __k21 = __e14
      if _not(_61(__k21, "_stash")) then
        args1[__k21] = __v11

    }
  else
    return l

def search(s, pattern, start):
  pass
def split(s, sep):
  if _or(_61(s, ""), _61(sep, "")) then
    return []
  else
    __l5 = []
    __n16 = _35(sep)
    while True:
      __i19 = search(s, sep)
      if nil63(__i19) then
        break
      else
        add(__l5, clip(s, 0, __i19))
        s = clip(s, __i19 + __n16)

    add(__l5, s)
    return __l5

def cat():
  __xs = unstash([...])
  def __f3(a, b):
    return cat(a, b)
  return either(reduce(__f3, __xs), "")
def _43():
  __xs1 = unstash([...])
  def __f4(a, b):
    return a + b
  return either(reduce(__f4, __xs1), 0)
def _45():
  __xs2 = unstash([...])
  def __f5(b, a):
    return a - b
  return either(reduce(__f5, reverse(__xs2)), 0)
def _42():
  __xs3 = unstash([...])
  def __f6(a, b):
    return a * b
  return either(reduce(__f6, __xs3), 1)
def _47():
  __xs4 = unstash([...])
  def __f7(b, a):
    return a / b
  return either(reduce(__f7, reverse(__xs4)), 1)
def _37():
  __xs5 = unstash([...])
  def __f8(b, a):
    return a % b
  return either(reduce(__f8, reverse(__xs5)), 0)
def pairwise(f, xs):
  __i20 = 0
  while __i20 < edge(xs):
    __a = xs[__i20]
    __b = xs[__i20 + 1]
    if _not(f(__a, __b)) then
      return False

    __i20 = __i20 + 1
  return True
def _60():
  __xs6 = unstash([...])
  def __f9(a, b):
    return a < b
  return pairwise(__f9, __xs6)
def _62():
  __xs7 = unstash([...])
  def __f10(a, b):
    return a > b
  return pairwise(__f10, __xs7)
def _61():
  __xs8 = unstash([...])
  def __f11(a, b):
    return _61(a, b)
  return pairwise(__f11, __xs8)
def _6061():
  __xs9 = unstash([...])
  def __f12(a, b):
    return a <= b
  return pairwise(__f12, __xs9)
def _6261():
  __xs10 = unstash([...])
  def __f13(a, b):
    return a >= b
  return pairwise(__f13, __xs10)
def number(s):
  pass
def number_code63(n):
  return _and(n > 47, n < 58)
def numeric63(s):
  __n17 = _35(s)
  __i21 = 0
  while __i21 < __n17:
    if _not(number_code63(code(s, __i21))) then
      return False

    __i21 = __i21 + 1
  return some63(s)
def escape(s):
  __s1 = "\""
  __i22 = 0
  while __i22 < _35(s):
    __c = char(s, __i22)

    if _61(__c, "\n") then
      __e15 = "\\n"
    else

      if _61(__c, "\r") then
        __e16 = "\\r"
      else

        if _61(__c, "\"") then
          __e17 = "\\\""
        else

          if _61(__c, "\\") then
            __e18 = "\\\\"
          else
            __e18 = __c

          __e17 = __e18

        __e16 = __e17

      __e15 = __e16

    __c1 = __e15
    __s1 = cat(__s1, __c1)
    __i22 = __i22 + 1
  return cat(__s1, "\"")
def str(x, stack):
  if nil63(x) then
    return "nil"
  else
    if nan63(x) then
      return "nan"
    else
      if _61(x, inf) then
        return "inf"
      else
        if _61(x, _inf) then
          return "-inf"
        else
          if boolean63(x) then
            if x then
              return "true"
            else
              return "false"

          else
            if string63(x) then
              return escape(x)
            else
              if atom63(x) then
                return tostring(x)
              else
                if function63(x) then
                  return "function"
                else
                  if _and(stack, in63(x, stack)) then
                    return "circular"
                  else
                    if escape(tostring(x)) then
                      __s = "("
                      __sp = ""
                      __xs11 = []
                      __ks = []
                      __l6 = _or(stack, [])
                      add(__l6, x)
                      ____o13 = x
                      __k22 = None
                      for (__k22 in ____o13) {
                        __v12 = ____o13[__k22]

                        if numeric63(__k22) then
                          __e19 = parseInt(__k22)
                        else
                          __e19 = __k22

                        __k23 = __e19
                        if number63(__k23) then
                          __xs11[__k23] = str(__v12, __l6)
                        else
                          add(__ks, cat(__k23, ":"))
                          add(__ks, str(__v12, __l6))

                      }
                      drop(__l6)
                      ____o14 = join(__xs11, __ks)
                      ____i24 = None
                      for (____i24 in ____o14) {
                        __v13 = ____o14[____i24]

                        if numeric63(____i24) then
                          __e20 = parseInt(____i24)
                        else
                          __e20 = ____i24

                        ____i241 = __e20
                        __s = cat(__s, __sp, __v13)
                        __sp = " "
                      }
                      return cat(__s, ")")










def apply(f, args):
  __args = stash(args)
def call(f):
  ____r76 = unstash([...])
  __f = destash33(f, ____r76)
  ____id = ____r76
  __args11 = cut(____id, 0)
  return apply(__f, __args11)
def setenv(k):
  ____r77 = unstash([...])
  __k24 = destash33(k, ____r77)
  ____id1 = ____r77
  __keys = cut(____id1, 0)
  if string63(__k24) then

    if __keys.toplevel then
      __e21 = hd(environment)
    else
      __e21 = last(environment)

    __frame = __e21
    __entry = _or(__frame[__k24], {})
    ____o15 = __keys
    __k25 = None
    for (__k25 in ____o15) {
      __v14 = ____o15[__k25]

      if numeric63(__k25) then
        __e22 = parseInt(__k25)
      else
        __e22 = __k25

      __k26 = __e22
      __entry[__k26] = __v14
    }
    __frame[__k24] = __entry
    return __frame[__k24]


abs = math.abs
acos = math.acos
asin = math.asin
atan = math.atan
atan2 = math.atan2
ceil = math.ceil
cos = math.cos
floor = math.floor
log = math.log
log10 = math.log10
max = math.max
min = math.min
pow = math.pow
random = math.random
sin = math.sin
sinh = math.sinh
sqrt = math.sqrt
tan = math.tan
tanh = math.tanh
trunc = math.floor
