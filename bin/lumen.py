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
  while __i3 < __upto do
    __l2[__j] = x[__i3]
    __i3 = __i3 + 1
    __j = __j + 1
  end
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
  while __i6 >= 0 do
    add(__l11, l[__i6])
    __i6 = __i6 - 1
  end
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
  while ____i7 < _35(____x2) do
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
  end
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
  while ____i10 < _35(____x4) do
    __x5 = ____x4[____i10]
    __y1 = f(__x5)
    if __y1 then
      return __y1

    ____i10 = ____i10 + 1
  end
def in63(x, t):
  def __f1(y):
    return _61(x, y)
  return find(__f1, t)
def pair(l):
  __l12 = dupe(l)
  __i11 = 0
  while __i11 < _35(l) do
    add(__l12, [l[__i11], l[__i11 + 1]])
    __i11 = __i11 + 1
    __i11 = __i11 + 1
  end
  return __l12
def sort(l, f):
  pass
def map(f, x):
  __t1 = dupe(x)
  ____x7 = x
  ____i12 = 0
  while ____i12 < _35(____x7) do
    __v6 = ____x7[____i12]
    __y2 = f(__v6)
    if is63(__y2) then
      add(__t1, __y2)

    ____i12 = ____i12 + 1
  end
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
    while True do
      __i19 = search(s, sep)
      if nil63(__i19) then
        break
      else
        add(__l5, clip(s, 0, __i19))
        s = clip(s, __i19 + __n16)

    end
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
  while __i20 < edge(xs) do
    __a = xs[__i20]
    __b = xs[__i20 + 1]
    if _not(f(__a, __b)) then
      return False

    __i20 = __i20 + 1
  end
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
  while __i21 < __n17 do
    if _not(number_code63(code(s, __i21))) then
      return False

    __i21 = __i21 + 1
  end
  return some63(s)
def escape(s):
  __s1 = "\""
  __i22 = 0
  while __i22 < _35(s) do
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
  end
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
def __f2(form):
  return quoted(form)
setenv("quote", {"_stash": True, "macro": __f2})
def __f3(form):
  return quasiexpand(form, 1)
setenv("quasiquote", {"_stash": True, "macro": __f3})
def __f4():
  __args1 = unstash([...])
  def __f5(__x5):
    ____id1 = __x5
    __lh1 = ____id1[1]
    __rh1 = ____id1[2]
    return ["%set", __lh1, __rh1]
  return join(["do"], map(__f5, pair(__args1)))
setenv("set", {"_stash": True, "macro": __f4})
def __f6(l, i):
  if _and(_61(target, "lua"), number63(i)) then
    i = i + 1
  else
    if _61(target, "lua") then
      i = ["+", i, 1]


  return ["get", l, i]
setenv("at", {"_stash": True, "macro": __f6})
def __f7(place):
  if _61(target, "lua") then
    return ["set", place, "nil"]
  else
    return ["%delete", place]

setenv("wipe", {"_stash": True, "macro": __f7})
def __f8():
  __body1 = unstash([...])
  __x25 = unique("x")
  __l1 = []
  __forms1 = []
  ____o1 = __body1
  __k2 = None
  for (__k2 in ____o1) {
    __v1 = ____o1[__k2]

    if numeric63(__k2) then
      __e8 = parseInt(__k2)
    else
      __e8 = __k2

    __k3 = __e8
    if number63(__k3) then
      __l1[__k3] = __v1
    else
      add(__forms1, ["set", ["get", __x25, ["quote", __k3]], __v1])

  }
  if some63(__forms1) then
    return join(["let", __x25, ["object", join(["%array"], __l1)]], __forms1, [__x25])
  else
    return join(["%array"], __l1)

setenv("list", {"_stash": True, "macro": __f8})
def __f9():
  __branches1 = unstash([...])
  return hd(expand_if(__branches1))
setenv("if", {"_stash": True, "macro": __f9})
def __f10(expr):
  ____r13 = unstash([...])
  __expr1 = destash33(expr, ____r13)
  ____id4 = ____r13
  __clauses1 = cut(____id4, 0)
  __x47 = unique("x")
  def __f11(_):
    return ["=", ["quote", _], __x47]
  __eq1 = __f11
  def __f12(__x50):
    ____id5 = __x50
    __a1 = ____id5[1]
    __b1 = ____id5[2]
    if nil63(__b1) then
      return [__a1]
    else
      if _or(string63(__a1), number63(__a1)) then
        return [__eq1(__a1), __b1]
      else
        if one63(__a1) then
          return [__eq1(hd(__a1)), __b1]
        else
          if _35(__a1) > 1 then
            return [join(["or"], map(__eq1, __a1)), __b1]




  __cl1 = __f12
  return ["let", __x47, __expr1, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]
setenv("case", {"_stash": True, "macro": __f10})
def __f13(cond):
  ____r17 = unstash([...])
  __cond1 = destash33(cond, ____r17)
  ____id7 = ____r17
  __body3 = cut(____id7, 0)
  return ["if", __cond1, join(["do"], __body3)]
setenv("when", {"_stash": True, "macro": __f13})
def __f14(cond):
  ____r19 = unstash([...])
  __cond3 = destash33(cond, ____r19)
  ____id9 = ____r19
  __body5 = cut(____id9, 0)
  return ["if", ["not", __cond3], join(["do"], __body5)]
setenv("unless", {"_stash": True, "macro": __f14})
def __f15():
  __body7 = unstash([...])
  def __f16(x):
    return x
  return join(["%object"], mapo(__f16, __body7))
setenv("obj", {"_stash": True, "macro": __f15})
def __f17(bs):
  ____r23 = unstash([...])
  __bs11 = destash33(bs, ____r23)
  ____id14 = ____r23
  __body9 = cut(____id14, 0)
  if atom63(__bs11) then
    return join(["let", [__bs11, hd(__body9)]], tl(__body9))
  else
    if none63(__bs11) then
      return join(["do"], __body9)
    else
      ____id15 = __bs11
      __lh3 = ____id15[1]
      __rh3 = ____id15[2]
      __bs21 = cut(____id15, 2)
      ____id16 = bind(__lh3, __rh3)
      __id17 = ____id16[1]
      __val1 = ____id16[2]
      __bs12 = cut(____id16, 2)
      __renames1 = []
      if _not(id_literal63(__id17)) then
        __id121 = unique(__id17)
        __renames1 = [__id17, __id121]
        __id17 = __id121

      return ["do", ["%local", __id17, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body9)]]


setenv("let", {"_stash": True, "macro": __f17})
def __f18(x, v):
  ____r25 = unstash([...])
  __x95 = destash33(x, ____r25)
  __v3 = destash33(v, ____r25)
  ____id19 = ____r25
  __body11 = cut(____id19, 0)
  return join(["let", [__x95, __v3]], __body11, [__x95])
setenv("with", {"_stash": True, "macro": __f18})
def __f19(x, v):
  ____r27 = unstash([...])
  __x106 = destash33(x, ____r27)
  __v5 = destash33(v, ____r27)
  ____id21 = ____r27
  __body13 = cut(____id21, 0)
  __y1 = unique("y")
  return ["let", __y1, __v5, ["when", ["yes", __y1], join(["let", [__x106, __y1]], __body13)]]
setenv("let-when", {"_stash": True, "macro": __f19})
def __f20(name, args):
  ____r29 = unstash([...])
  __name1 = destash33(name, ____r29)
  __args3 = destash33(args, ____r29)
  ____id23 = ____r29
  __body15 = cut(____id23, 0)
  ____x116 = object(["setenv", ["quote", __name1]])
  ____x116.macro = join(["fn", __args3], __body15)
  __form1 = ____x116
  _eval(__form1)
  return __form1
setenv("define-macro", {"_stash": True, "macro": __f20})
def __f21(name, args):
  ____r31 = unstash([...])
  __name3 = destash33(name, ____r31)
  __args5 = destash33(args, ____r31)
  ____id25 = ____r31
  __body17 = cut(____id25, 0)
  ____x123 = object(["setenv", ["quote", __name3]])
  ____x123.special = join(["fn", __args5], __body17)
  __form3 = join(____x123, keys(__body17))
  _eval(__form3)
  return __form3
setenv("define-special", {"_stash": True, "macro": __f21})
def __f22(name, expansion):
  setenv(name, {"_stash": True, "symbol": expansion})
  ____x129 = object(["setenv", ["quote", name]])
  ____x129.symbol = ["quote", expansion]
  return ____x129
setenv("define-symbol", {"_stash": True, "macro": __f22})
def __f23(__x137):
  ____id28 = __x137
  __char1 = ____id28[1]
  __s1 = ____id28[2]
  ____r35 = unstash([...])
  ____x137 = destash33(__x137, ____r35)
  ____id29 = ____r35
  __body19 = cut(____id29, 0)
  return ["set", ["get", "read-table", __char1], join(["fn", [__s1]], __body19)]
setenv("define-reader", {"_stash": True, "macro": __f23})
def __f24(name, x):
  ____r37 = unstash([...])
  __name5 = destash33(name, ____r37)
  __x147 = destash33(x, ____r37)
  ____id31 = ____r37
  __body21 = cut(____id31, 0)
  setenv(__name5, {"_stash": True, "variable": True})
  if some63(__body21) then
    return join(["%local-function", __name5], bind42(__x147, __body21))
  else
    return ["%local", __name5, __x147]

setenv("define", {"_stash": True, "macro": __f24})
def __f25(name, x):
  ____r39 = unstash([...])
  __name7 = destash33(name, ____r39)
  __x154 = destash33(x, ____r39)
  ____id33 = ____r39
  __body23 = cut(____id33, 0)
  setenv(__name7, {"_stash": True, "toplevel": True, "variable": True})
  if some63(__body23) then
    return join(["%global-function", __name7], bind42(__x154, __body23))
  else
    return ["set", __name7, __x154]

setenv("define-global", {"_stash": True, "macro": __f25})
def __f26():
  __body25 = unstash([...])
  __x165 = unique("x")
  return ["do", ["add", "environment", ["obj"]], ["with", __x165, join(["do"], __body25), ["drop", "environment"]]]
setenv("with-frame", {"_stash": True, "macro": __f26})
def __f27(__x177):
  ____id36 = __x177
  __names1 = ____id36[1]
  ____r41 = unstash([...])
  ____x177 = destash33(__x177, ____r41)
  ____id37 = ____r41
  __body27 = cut(____id37, 0)
  __x179 = unique("x")
  ____x182 = object(["setenv", __x179])
  ____x182.variable = True
  return join(["with-frame", ["each", __x179, __names1, ____x182]], __body27)
setenv("with-bindings", {"_stash": True, "macro": __f27})
def __f28(definitions):
  ____r44 = unstash([...])
  __definitions1 = destash33(definitions, ____r44)
  ____id39 = ____r44
  __body29 = cut(____id39, 0)
  add(environment, {})
  def __f29(m):
    return macroexpand(join(["define-macro"], m))
  map(__f29, __definitions1)
  ____x187 = join(["do"], macroexpand(__body29))
  drop(environment)
  return ____x187
setenv("let-macro", {"_stash": True, "macro": __f28})
def __f30(expansions):
  ____r48 = unstash([...])
  __expansions1 = destash33(expansions, ____r48)
  ____id42 = ____r48
  __body31 = cut(____id42, 0)
  add(environment, {})
  def __f31(__x196):
    ____id43 = __x196
    __name9 = ____id43[1]
    __exp1 = ____id43[2]
    return macroexpand(["define-symbol", __name9, __exp1])
  map(__f31, pair(__expansions1))
  ____x195 = join(["do"], macroexpand(__body31))
  drop(environment)
  return ____x195
setenv("let-symbol", {"_stash": True, "macro": __f30})
def __f32(names):
  ____r52 = unstash([...])
  __names3 = destash33(names, ____r52)
  ____id45 = ____r52
  __body33 = cut(____id45, 0)
  def __f33(n):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f33, __names3)
  return join(["let", apply(join, __bs3)], __body33)
setenv("let-unique", {"_stash": True, "macro": __f32})
def __f34(args):
  ____r55 = unstash([...])
  __args7 = destash33(args, ____r55)
  ____id47 = ____r55
  __body35 = cut(____id47, 0)
  return join(["%function"], bind42(__args7, __body35))
setenv("fn", {"_stash": True, "macro": __f34})
def __f35(f):
  ____r57 = unstash([...])
  __f1 = destash33(f, ____r57)
  ____id49 = ____r57
  __args9 = cut(____id49, 0)
  if _35(__args9) > 1 then
    return [["do", "apply"], __f1, ["join", join(["list"], almost(__args9)), last(__args9)]]
  else
    return join([["do", "apply"], __f1], __args9)

setenv("apply", {"_stash": True, "macro": __f35})
def __f36(expr):
  if _61(target, "js") then
    return [["fn", join(), ["%try", ["list", True, expr]]]]
  else
    ____x257 = object(["obj"])
    ____x257.stack = [["get", "debug", ["quote", "traceback"]]]
    ____x257.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x257]]]]

setenv("guard", {"_stash": True, "macro": __f36})
def __f37(x, t):
  ____r61 = unstash([...])
  __x283 = destash33(x, ____r61)
  __t1 = destash33(t, ____r61)
  ____id52 = ____r61
  __body37 = cut(____id52, 0)
  __o3 = unique("o")
  __n3 = unique("n")
  __i3 = unique("i")

  if atom63(__x283) then
    __e9 = [__i3, __x283]
  else

    if _35(__x283) > 1 then
      __e10 = __x283
    else
      __e10 = [__i3, hd(__x283)]

    __e9 = __e10

  ____id53 = __e9
  __k5 = ____id53[1]
  __v7 = ____id53[2]

  if _61(target, "lua") then
    __e11 = __body37
  else
    __e11 = [join(["let", __k5, ["if", ["numeric?", __k5], ["parseInt", __k5], __k5]], __body37)]

  return ["let", [__o3, __t1, __k5, "nil"], ["%for", __o3, __k5, join(["let", [__v7, ["get", __o3, __k5]]], __e11)]]
setenv("each", {"_stash": True, "macro": __f37})
def __f38(i, to):
  ____r63 = unstash([...])
  __i5 = destash33(i, ____r63)
  __to1 = destash33(to, ____r63)
  ____id55 = ____r63
  __body39 = cut(____id55, 0)
  return ["let", __i5, 0, join(["while", ["<", __i5, __to1]], __body39, [["inc", __i5]])]
setenv("for", {"_stash": True, "macro": __f38})
def __f39(v, t):
  ____r65 = unstash([...])
  __v9 = destash33(v, ____r65)
  __t3 = destash33(t, ____r65)
  ____id57 = ____r65
  __body41 = cut(____id57, 0)
  __x317 = unique("x")
  __i7 = unique("i")
  return ["let", [__x317, __t3], ["for", __i7, ["#", __x317], join(["let", [__v9, ["at", __x317, __i7]]], __body41)]]
setenv("step", {"_stash": True, "macro": __f39})
def __f40():
  __xs1 = unstash([...])
  __l3 = []
  ____o5 = __xs1
  ____i9 = None
  for (____i9 in ____o5) {
    __x328 = ____o5[____i9]

    if numeric63(____i9) then
      __e12 = parseInt(____i9)
    else
      __e12 = ____i9

    ____i91 = __e12
    __l3[__x328] = True
  }
  return join(["obj"], __l3)
setenv("set-of", {"_stash": True, "macro": __f40})
def __f41():
  return ["quote", target]
setenv("language", {"_stash": True, "macro": __f41})
def __f42():
  __clauses3 = unstash([...])
  if has63(__clauses3, target) then
    return __clauses3[target]
  else
    return hd(__clauses3)

setenv("target", {"_stash": True, "macro": __f42})
def __f43(a):
  ____r69 = unstash([...])
  __a3 = destash33(a, ____r69)
  ____id59 = ____r69
  __bs5 = cut(____id59, 0)
  return ["set", __a3, join(["join", __a3], __bs5)]
setenv("join!", {"_stash": True, "macro": __f43})
def __f44(a):
  ____r71 = unstash([...])
  __a5 = destash33(a, ____r71)
  ____id61 = ____r71
  __bs7 = cut(____id61, 0)
  return ["set", __a5, join(["cat", __a5], __bs7)]
setenv("cat!", {"_stash": True, "macro": __f44})
def __f45(n, by):

  if nil63(by) then
    __e13 = 1
  else
    __e13 = by

  return ["set", n, ["+", n, __e13]]
setenv("inc", {"_stash": True, "macro": __f45})
def __f46(n, by):

  if nil63(by) then
    __e14 = 1
  else
    __e14 = by

  return ["set", n, ["-", n, __e14]]
setenv("dec", {"_stash": True, "macro": __f46})
def __f47(form):
  __x356 = unique("x")
  return ["do", ["inc", "indent-level"], ["with", __x356, form, ["dec", "indent-level"]]]
setenv("with-indent", {"_stash": True, "macro": __f47})
def __f48():
  __names5 = unstash([...])
  if _61(target, "js") then
    def __f50(k):
      return ["set", ["get", "exports", ["quote", k]], k]
    return join(["do"], map(__f50, __names5))
  else
    __x373 = {}
    ____o7 = __names5
    ____i11 = None
    for (____i11 in ____o7) {
      __k7 = ____o7[____i11]

      if numeric63(____i11) then
        __e15 = parseInt(____i11)
      else
        __e15 = ____i11

      ____i111 = __e15
      __x373[__k7] = __k7
    }
    def __f49(x):
      return x
    return ["return", join(["%object"], mapo(__f49, __x373))]

setenv("export", {"_stash": True, "macro": __f48})
def __f51():
  __body43 = unstash([...])
  return _eval(join(["do"], __body43))
setenv("when-compiling", {"_stash": True, "macro": __f51})
reader = require("reader")
compiler = require("compiler")
system = require("system")
def eval_print(form):
  def __f():
    return compiler["eval"](form)
  def __f1(m):
    if obj63(m) then
      return m
    else

      if string63(m) then
        __e = clip(m, search(m, ": ") + 2)
      else

        if nil63(m) then
          __e1 = ""
        else
          __e1 = str(m)

        __e = __e1

      return {"stack": debug.traceback(), "message": __e}

  ____id = [xpcall(__f, __f1)]
  __ok = ____id[1]
  __v = ____id[2]
  if _not(__ok) then
    if is63(__v) then
      return print(str(__v))


def rep(s):
  return eval_print(reader["read-string"](s))
def repl():
  __buf = ""
  def rep1(s):
    __buf = cat(__buf, s)
    __more = []
    __form = reader["read-string"](__buf, __more)
    if _not(_61(__form, __more)) then
      eval_print(__form)
      __buf = ""
      return system.write("> ")

  return system.write("> ")
def compile_file(path):
  __s = reader.stream(system["read-file"](path))
  __body = reader["read-all"](__s)
  __form1 = compiler.expand(join(["do"], __body))
  return compiler.compile(__form1, {"_stash": True, "stmt": True})
def _load(path):
  __previous = target
  target = "py"
  __code = compile_file(path)
  target = __previous
  return compiler.run(__code)
def script_file63(path):
  return _not(_or(_61("-", char(path, 0)), _61(".js", clip(path, _35(path) - 3))))
def run_file(path):
  if script_file63(path) then
    return _load(path)
  else
    return compiler.run(system["read-file"](path))

def usage():
  print("usage: lumen [<file> <arguments> | options <object files>]")
  print(" <file>\t\tProgram read from script file")
  print(" <arguments>\tPassed to program in system.argv")
  print(" <object files>\tLoaded before compiling <input>")
  print("options:")
  print(" -c <input>\tCompile input file")
  print(" -o <output>\tOutput file")
  print(" -t <target>\tTarget language (default: lua)")
  return print(" -e <expr>\tExpression to evaluate")
def main():
  __arg = hd(system.argv)
  if _and(__arg, script_file63(__arg)) then
    return _load(__arg)
  else
    if _or(_61(__arg, "-h"), _61(__arg, "--help")) then
      return usage()
    else
      __pre = []
      __input = None
      __output = None
      __target1 = None
      __expr = None
      __argv = system.argv
      __i = 0
      while __i < _35(__argv) do
        __a = __argv[__i]
        if _or(_61(__a, "-c"), _61(__a, "-o")) then
          if _61(__i, edge(__argv)) then
            print(cat("missing argument for ", __a))
          else
            __i = __i + 1
            __val = __argv[__i]
            if _61(__a, "-c") then
              __input = __val
            else
              if _61(__a, "-o") then
                __output = __val
              else
                if _61(__a, "-t") then
                  __target1 = __val
                else
                  if _61(__a, "-e") then
                    __expr = __val





        else
          if _not(_61("-", char(__a, 0))) then
            add(__pre, __a)


        __i = __i + 1
      end
      ____x2 = __pre
      ____i1 = 0
      while ____i1 < _35(____x2) do
        __file = ____x2[____i1]
        run_file(__file)
        ____i1 = ____i1 + 1
      end
      if nil63(__input) then
        if __expr then
          return rep(__expr)
        else
          return repl()

      else
        if __target1 then
          target = __target1

        __code1 = compile_file(__input)
        if _or(nil63(__output), _61(__output, "-")) then
          return print(__code1)
        else
          return system["write-file"](__output, __code1)




main()
