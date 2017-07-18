environment = [{}]
def nil63(x=None):
  return x is None
def is63(x=None):
  return not nil63(x)
def no(x=None):
  return nil63(x) or x == False
def yes(x=None):
  return not no(x)
def either(x=None, y=None):
  if is63(x):
    return x
  else:
    return y
def has63(l=None, k=None):
  pass
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
    while ____i < _35(____x1):
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
def _35(x=None):
  if string63(x) or array63(x):
    return len(x)
  else:
    return length(x)
def none63(x=None):
  return _35(x) == 0
def some63(x=None):
  return _35(x) > 0
def one63(x=None):
  return _35(x) == 1
def two63(x=None):
  return _35(x) == 2
def hd(l=None):
  return l[0]
import numbers
def string63(x=None):
  return isinstance(x, str)
def number63(x=None):
  return isinstance(x, numbers.Number)
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
_inf = - inf
def nan63(n=None):
  return not( n == n)
def inf63(n=None):
  return n == inf or n == _inf
def clip(s=None, _from=None, upto=None):
  pass
def dupe(x=None):
  return {}
def cut(x=None, _from=None, upto=None):
  __l2 = dupe(x)
  __j = 0

  if nil63(_from) or _from < 0:
    __e = 0
  else:
    __e = _from
  __i3 = __e
  __n3 = _35(x)

  if nil63(upto) or upto > __n3:
    __e1 = __n3
  else:
    __e1 = upto
  __upto = __e1
  while __i3 < __upto:
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
  return _35(x) - 1
def inner(x=None):
  return clip(x, 1, edge(x))
def tl(l=None):
  return cut(l, 1)
def char(s=None, n=None):
  pass
def code(s=None, n=None):
  pass
def string_literal63(x=None):
  return string63(x) and char(x, 0) == "\""
def id_literal63(x=None):
  return string63(x) and char(x, 0) == "|"
def add(l=None, x=None):
  if array63(l):
    l.append(x)
  else:
    l[_35(l)] = x
  return None
def drop(l=None):
  pass
def last(l=None):
  return l[edge(l)]
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
def join(*_rest, **_params):
  __ls = unstash(list(_rest))
  __r42 = []
  ____x2 = __ls
  ____i7 = 0
  while ____i7 < _35(____x2):
    __l3 = ____x2[____i7]
    if __l3:
      __n6 = _35(__r42)
      ____o4 = __l3
      __k4 = None
      for __k4 in indices(____o4):
        __v5 = ____o4[__k4]
        if number63(__k4):
          __k4 = __k4 + __n6
        else:
          __l3 = object(__l3)
        __r42[__k4] = __v5
    ____i7 = ____i7 + 1
  return __r42
def find(f=None, t=None):
  ____o5 = t
  ____i9 = None
  for ____i9 in indices(____o5):
    __x3 = ____o5[____i9]
    __y = f(__x3)
    if __y:
      return __y
def first(f=None, l=None):
  ____x4 = l
  ____i10 = 0
  while ____i10 < _35(____x4):
    __x5 = ____x4[____i10]
    __y1 = f(__x5)
    if __y1:
      return __y1
    ____i10 = ____i10 + 1
def in63(x=None, t=None):
  def __f1(y=None):
    return x == y
  return find(__f1, t)
def pair(l=None):
  __l12 = dupe(l)
  __i11 = 0
  while __i11 < _35(l):
    add(__l12, [l[__i11], l[__i11 + 1]])
    __i11 = __i11 + 1
    __i11 = __i11 + 1
  return __l12
def sort(l=None, f=None):
  pass
def map(f=None, x=None):
  __t1 = dupe(x)
  ____x7 = x
  ____i12 = 0
  while ____i12 < _35(____x7):
    __v6 = ____x7[____i12]
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
def keep(f=None, x=None):
  def __f2(v=None):
    if yes(f(v)):
      return v
  return map(__f2, x)
def keys63(t=None):
  ____o7 = t
  __k6 = None
  for __k6 in indices(____o7):
    __v8 = ____o7[__k6]
    if not number63(__k6):
      return True
  return False
def empty63(t=None):
  ____o8 = t
  ____i15 = None
  for ____i15 in indices(____o8):
    __x8 = ____o8[____i15]
    return False
  return True
def stash(args=None):
  if keys63(args):
    __p = {}
    ____o9 = args
    __k7 = None
    for __k7 in indices(____o9):
      __v9 = ____o9[__k7]
      if not number63(__k7):
        __p[__k7] = __v9
    __p["_stash"] = True
    add(args, __p)
  if array63(args):
    return args
  else:
    return array(args)
def unstash(args=None):
  if none63(args):
    return {}
  else:
    __l4 = last(args)
    if obj63(__l4) and __l4["_stash"]:
      __args1 = object(almost(args))
      ____o10 = __l4
      __k8 = None
      for __k8 in indices(____o10):
        __v10 = ____o10[__k8]
        if not( __k8 == "_stash"):
          __args1[__k8] = __v10
      return __args1
    else:
      return args
def destash33(l=None, args1=None):
  if obj63(l) and l["_stash"]:
    ____o11 = l
    __k9 = None
    for __k9 in indices(____o11):
      __v11 = ____o11[__k9]
      if not( __k9 == "_stash"):
        args1[__k9] = __v11
  else:
    return l
def search(s=None, pattern=None, start=None):
  pass
def split(s=None, sep=None):
  if s == "" or sep == "":
    return []
  else:
    __l5 = []
    __n15 = _35(sep)
    while True:
      __i19 = search(s, sep)
      if nil63(__i19):
        break
      else:
        add(__l5, clip(s, 0, __i19))
        s = clip(s, __i19 + __n15)
    add(__l5, s)
    return __l5
def cat(*_rest, **_params):
  __xs = unstash(list(_rest))
  def __f3(a=None, b=None):
    return cat(a, b)
  return either(reduce(__f3, __xs), "")
def _43(*_rest, **_params):
  __xs1 = unstash(list(_rest))
  def __f4(a=None, b=None):
    return a + b
  return either(reduce(__f4, __xs1), 0)
def _45(*_rest, **_params):
  __xs2 = unstash(list(_rest))
  def __f5(b=None, a=None):
    return a - b
  return either(reduce(__f5, reverse(__xs2)), 0)
def _42(*_rest, **_params):
  __xs3 = unstash(list(_rest))
  def __f6(a=None, b=None):
    return a * b
  return either(reduce(__f6, __xs3), 1)
def _47(*_rest, **_params):
  __xs4 = unstash(list(_rest))
  def __f7(b=None, a=None):
    return a / b
  return either(reduce(__f7, reverse(__xs4)), 1)
def _37(*_rest, **_params):
  __xs5 = unstash(list(_rest))
  def __f8(b=None, a=None):
    return a % b
  return either(reduce(__f8, reverse(__xs5)), 0)
def pairwise(f=None, xs=None):
  __i20 = 0
  while __i20 < edge(xs):
    __a = xs[__i20]
    __b = xs[__i20 + 1]
    if not f(__a, __b):
      return False
    __i20 = __i20 + 1
  return True
def _60(*_rest, **_params):
  __xs6 = unstash(list(_rest))
  def __f9(a=None, b=None):
    return a < b
  return pairwise(__f9, __xs6)
def _62(*_rest, **_params):
  __xs7 = unstash(list(_rest))
  def __f10(a=None, b=None):
    return a > b
  return pairwise(__f10, __xs7)
def _61(*_rest, **_params):
  __xs8 = unstash(list(_rest))
  def __f11(a=None, b=None):
    return a == b
  return pairwise(__f11, __xs8)
def _6061(*_rest, **_params):
  __xs9 = unstash(list(_rest))
  def __f12(a=None, b=None):
    return a <= b
  return pairwise(__f12, __xs9)
def _6261(*_rest, **_params):
  __xs10 = unstash(list(_rest))
  def __f13(a=None, b=None):
    return a >= b
  return pairwise(__f13, __xs10)
def number(s=None):
  pass
def number_code63(n=None):
  return n > 47 and n < 58
def numeric63(s=None):
  __n16 = _35(s)
  __i21 = 0
  while __i21 < __n16:
    if not number_code63(code(s, __i21)):
      return False
    __i21 = __i21 + 1
  return some63(s)
def escape(s=None):
  __s1 = "\""
  __i22 = 0
  while __i22 < _35(s):
    __c = char(s, __i22)

    if __c == "\n":
      __e2 = "\\n"
    else:

      if __c == "\r":
        __e3 = "\\r"
      else:

        if __c == "\"":
          __e4 = "\\\""
        else:

          if __c == "\\":
            __e5 = "\\\\"
          else:
            __e5 = __c
          __e4 = __e5
        __e3 = __e4
      __e2 = __e3
    __c1 = __e2
    __s1 = cat(__s1, __c1)
    __i22 = __i22 + 1
  return cat(__s1, "\"")
def _str(x=None, stack=None):
  if nil63(x):
    return "nil"
  else:
    if nan63(x):
      return "nan"
    else:
      if x == inf:
        return "inf"
      else:
        if x == _inf:
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
                    if escape(tostring(x)):
                      __s = "("
                      __sp = ""
                      __xs11 = []
                      __ks = []
                      __l6 = stack or []
                      add(__l6, x)
                      ____o12 = x
                      __k10 = None
                      for __k10 in indices(____o12):
                        __v12 = ____o12[__k10]
                        if number63(__k10):
                          __xs11[__k10] = _str(__v12, __l6)
                        else:
                          add(__ks, cat(__k10, ":"))
                          add(__ks, _str(__v12, __l6))
                      drop(__l6)
                      ____o13 = join(__xs11, __ks)
                      ____i24 = None
                      for ____i24 in indices(____o13):
                        __v13 = ____o13[____i24]
                        __s = cat(__s, __sp, __v13)
                        __sp = " "
                      return cat(__s, ")")
def apply(f=None, args=None):
  __args = stash(args)
def call(f=None, *_rest, **_params):
  ____r77 = unstash(list(_rest))
  __f = destash33(f, ____r77)
  ____id = ____r77
  __args11 = cut(____id, 0)
  return apply(__f, __args11)
def setenv(k=None, *_rest, **_params):
  ____r78 = unstash(list(_rest))
  __k11 = destash33(k, ____r78)
  ____id1 = ____r78
  __keys = cut(____id1, 0)
  if string63(__k11):

    if __keys["toplevel"]:
      __e6 = hd(environment)
    else:
      __e6 = last(environment)
    __frame = __e6
    __entry = __frame[__k11] or {}
    ____o14 = __keys
    __k12 = None
    for __k12 in indices(____o14):
      __v14 = ____o14[__k12]
      if not( __k12 == "toplevel"):
        __entry[__k12] = __v14
    __frame[__k11] = __entry
    return __frame[__k11]
def _print(x=None):
  print(x)
  return None
import math

acos = math.acos
asin = math.asin
atan = math.atan
atan2 = math.atan2
ceil = math.ceil
cos = math.cos
floor = math.floor
log = math.log
log10 = math.log10




sin = math.sin
sinh = math.sinh
sqrt = math.sqrt
tan = math.tan
tanh = math.tanh
trunc = math.floor
import pdb
pdb.set_trace()
setenv("target", {"_stash": True, "toplevel": True, "value": either(setenv("target", {"_stash": True, "toplevel": True})["value"], "py")})
setenv("target", {"_stash": True, "symbol": ["get-value", ["quote", "target"]]})
def __f2(form=None):
  return quoted(form)
setenv("quote", {"_stash": True, "macro": __f2})
def __f3(form=None):
  return quasiexpand(form, 1)
setenv("quasiquote", {"_stash": True, "macro": __f3})
def __f4(*_rest, **_params):
  __args1 = unstash(list(_rest))
  def __f5(__x4=None):
    ____id1 = __x4
    __lh1 = ____id1[1]
    __rh1 = ____id1[2]
    return ["%set", __lh1, __rh1]
  return join(["do"], map(__f5, pair(__args1)))
setenv("set", {"_stash": True, "macro": __f4})
def __f6(l=None, i=None):
  if setenv("target", {"_stash": True, "toplevel": True})["value"] == "lua" and number63(i):
    i = i + 1
  else:
    if setenv("target", {"_stash": True, "toplevel": True})["value"] == "lua":
      i = ["+", i, 1]
  return ["get", l, i]
setenv("at", {"_stash": True, "macro": __f6})
def __f7(place=None):
  if setenv("target", {"_stash": True, "toplevel": True})["value"] == "lua":
    return ["set", place, "nil"]
  else:
    return ["%delete", place]
setenv("wipe", {"_stash": True, "macro": __f7})
def __f8(*_rest, **_params):
  __body1 = unstash(list(_rest))
  __x23 = unique("x")
  __l1 = []
  __forms1 = []
  ____o1 = __body1
  __k2 = None
  for __k2 in indices(____o1):
    __v1 = ____o1[__k2]
    if number63(__k2):
      __l1[__k2] = __v1
    else:
      add(__forms1, ["set", ["get", __x23, ["quote", __k2]], __v1])
  if some63(__forms1):
    return join(["let", __x23, ["object", join(["%array"], __l1)]], __forms1, [__x23])
  else:
    return join(["%array"], __l1)
setenv("list", {"_stash": True, "macro": __f8})
def __f9(*_rest, **_params):
  __branches1 = unstash(list(_rest))
  return hd(expand_if(__branches1))
setenv("if", {"_stash": True, "macro": __f9})
def __f10(expr=None, *_rest, **_params):
  ____r13 = unstash(list(_rest))
  __expr1 = destash33(expr, ____r13)
  ____id4 = ____r13
  __clauses1 = cut(____id4, 0)
  __x43 = unique("x")
  def __f11(_=None):
    return ["=", ["quote", _], __x43]
  __eq1 = __f11
  def __f12(__x46=None):
    ____id5 = __x46
    __a1 = ____id5[1]
    __b1 = ____id5[2]
    if nil63(__b1):
      return [__a1]
    else:
      if string63(__a1) or number63(__a1):
        return [__eq1(__a1), __b1]
      else:
        if one63(__a1):
          return [__eq1(hd(__a1)), __b1]
        else:
          if _35(__a1) > 1:
            return [join(["or"], map(__eq1, __a1)), __b1]
  __cl1 = __f12
  return ["let", __x43, __expr1, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]
setenv("case", {"_stash": True, "macro": __f10})
def __f13(cond=None, *_rest, **_params):
  ____r17 = unstash(list(_rest))
  __cond1 = destash33(cond, ____r17)
  ____id7 = ____r17
  __body3 = cut(____id7, 0)
  return ["if", __cond1, join(["do"], __body3)]
setenv("when", {"_stash": True, "macro": __f13})
def __f14(cond=None, *_rest, **_params):
  ____r19 = unstash(list(_rest))
  __cond3 = destash33(cond, ____r19)
  ____id9 = ____r19
  __body5 = cut(____id9, 0)
  return ["if", ["not", __cond3], join(["do"], __body5)]
setenv("unless", {"_stash": True, "macro": __f14})
def __f15(*_rest, **_params):
  __body7 = unstash(list(_rest))
  def __f16(x=None):
    return x
  return join(["%object"], mapo(__f16, __body7))
setenv("obj", {"_stash": True, "macro": __f15})
def __f17(bs=None, *_rest, **_params):
  ____r23 = unstash(list(_rest))
  __bs11 = destash33(bs, ____r23)
  ____id14 = ____r23
  __body9 = cut(____id14, 0)
  if atom63(__bs11):
    return join(["let", [__bs11, hd(__body9)]], tl(__body9))
  else:
    if none63(__bs11):
      return join(["do"], __body9)
    else:
      ____id15 = __bs11
      __lh3 = ____id15[1]
      __rh3 = ____id15[2]
      __bs21 = cut(____id15, 2)
      ____id16 = bind(__lh3, __rh3)
      __id17 = ____id16[1]
      __val1 = ____id16[2]
      __bs12 = cut(____id16, 2)
      __renames1 = []
      if not id_literal63(__id17):
        __id121 = unique(__id17)
        __renames1 = [__id17, __id121]
        __id17 = __id121
      return ["do", ["%local", __id17, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body9)]]
setenv("let", {"_stash": True, "macro": __f17})
def __f18(x=None, v=None, *_rest, **_params):
  ____r25 = unstash(list(_rest))
  __x86 = destash33(x, ____r25)
  __v3 = destash33(v, ____r25)
  ____id19 = ____r25
  __body11 = cut(____id19, 0)
  return join(["let", [__x86, __v3]], __body11, [__x86])
setenv("with", {"_stash": True, "macro": __f18})
def __f19(x=None, v=None, *_rest, **_params):
  ____r27 = unstash(list(_rest))
  __x96 = destash33(x, ____r27)
  __v5 = destash33(v, ____r27)
  ____id21 = ____r27
  __body13 = cut(____id21, 0)
  __y1 = unique("y")
  return ["let", __y1, __v5, ["when", ["yes", __y1], join(["let", [__x96, __y1]], __body13)]]
setenv("let-when", {"_stash": True, "macro": __f19})
def __f20(name=None, args=None, *_rest, **_params):
  ____r29 = unstash(list(_rest))
  __name1 = destash33(name, ____r29)
  __args3 = destash33(args, ____r29)
  ____id23 = ____r29
  __body15 = cut(____id23, 0)
  ____x105 = object(["setenv", ["quote", __name1]])
  ____x105["macro"] = join(["fn", __args3], __body15)
  __form1 = ____x105
  _eval(__form1)
  return __form1
setenv("define-macro", {"_stash": True, "macro": __f20})
def __f21(name=None, args=None, *_rest, **_params):
  ____r31 = unstash(list(_rest))
  __name3 = destash33(name, ____r31)
  __args5 = destash33(args, ____r31)
  ____id25 = ____r31
  __body17 = cut(____id25, 0)
  ____x111 = object(["setenv", ["quote", __name3]])
  ____x111["special"] = join(["fn", __args5], __body17)
  __form3 = join(____x111, keys(__body17))
  _eval(__form3)
  return __form3
setenv("define-special", {"_stash": True, "macro": __f21})
def __f22(name=None, expansion=None):
  setenv(name, {"_stash": True, "symbol": expansion})
  ____x117 = object(["setenv", ["quote", name]])
  ____x117["symbol"] = ["quote", expansion]
  return ____x117
setenv("define-symbol", {"_stash": True, "macro": __f22})
def __f23(__x125=None, *_rest, **_params):
  ____id28 = __x125
  __char1 = ____id28[1]
  __s1 = ____id28[2]
  ____r35 = unstash(list(_rest))
  ____x125 = destash33(__x125, ____r35)
  ____id29 = ____r35
  __body19 = cut(____id29, 0)
  return ["set", ["get", "read-table", __char1], join(["fn", [__s1]], __body19)]
setenv("define-reader", {"_stash": True, "macro": __f23})
def __f24(name=None, x=None, *_rest, **_params):
  ____r37 = unstash(list(_rest))
  __name5 = destash33(name, ____r37)
  __x133 = destash33(x, ____r37)
  ____id31 = ____r37
  __body21 = cut(____id31, 0)
  setenv(__name5, {"_stash": True, "variable": True})
  if some63(__body21):
    return join(["%local-function", __name5], bind42(__x133, __body21))
  else:
    return ["%local", __name5, __x133]
setenv("define", {"_stash": True, "macro": __f24})
def __f25(name=None, x=None, *_rest, **_params):
  ____r39 = unstash(list(_rest))
  __name7 = destash33(name, ____r39)
  __x139 = destash33(x, ____r39)
  ____id33 = ____r39
  __body23 = cut(____id33, 0)
  setenv(__name7, {"_stash": True, "toplevel": True, "variable": True})
  if some63(__body23):
    return join(["%global-function", __name7], bind42(__x139, __body23))
  else:
    return ["set", __name7, __x139]
setenv("define-global", {"_stash": True, "macro": __f25})
def __f26(x=None):
  ____x146 = object(["setenv", x])
  ____x146["toplevel"] = True
  return ["get", ____x146, ["quote", "value"]]
setenv("get-value", {"_stash": True, "macro": __f26})
def __f27(name=None, x=None):
  ____x157 = object(["setenv", ["quote", name]])
  ____x157["toplevel"] = True
  ____x157["value"] = either(x, ["get-value", ["quote", name]])
  return ["do", ____x157, ["define-symbol", name, ["get-value", ["quote", name]]]]
setenv("define-constant", {"_stash": True, "macro": __f27})
def __f28(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]
setenv("define-variable", {"_stash": True, "macro": __f28})
def __f29(*_rest, **_params):
  __body25 = unstash(list(_rest))
  __x181 = unique("x")
  return ["do", ["add", "environment", ["obj"]], ["with", __x181, join(["do"], __body25), ["drop", "environment"]]]
setenv("with-frame", {"_stash": True, "macro": __f29})
def __f30(__x193=None, *_rest, **_params):
  ____id36 = __x193
  __names1 = ____id36[1]
  ____r47 = unstash(list(_rest))
  ____x193 = destash33(__x193, ____r47)
  ____id37 = ____r47
  __body27 = cut(____id37, 0)
  __x194 = unique("x")
  ____x197 = object(["setenv", __x194])
  ____x197["variable"] = True
  return join(["with-frame", ["each", __x194, __names1, ____x197]], __body27)
setenv("with-bindings", {"_stash": True, "macro": __f30})
def __f31(definitions=None, *_rest, **_params):
  ____r50 = unstash(list(_rest))
  __definitions1 = destash33(definitions, ____r50)
  ____id39 = ____r50
  __body29 = cut(____id39, 0)
  add(environment, {})
  def __f32(m=None):
    return macroexpand(join(["define-macro"], m))
  map(__f32, __definitions1)
  ____x201 = join(["do"], macroexpand(__body29))
  drop(environment)
  return ____x201
setenv("let-macro", {"_stash": True, "macro": __f31})
def __f33(expansions=None, *_rest, **_params):
  ____r54 = unstash(list(_rest))
  __expansions1 = destash33(expansions, ____r54)
  ____id42 = ____r54
  __body31 = cut(____id42, 0)
  add(environment, {})
  def __f34(__x209=None):
    ____id43 = __x209
    __name9 = ____id43[1]
    __exp1 = ____id43[2]
    return macroexpand(["define-symbol", __name9, __exp1])
  map(__f34, pair(__expansions1))
  ____x208 = join(["do"], macroexpand(__body31))
  drop(environment)
  return ____x208
setenv("let-symbol", {"_stash": True, "macro": __f33})
def __f35(names=None, *_rest, **_params):
  ____r58 = unstash(list(_rest))
  __names3 = destash33(names, ____r58)
  ____id45 = ____r58
  __body33 = cut(____id45, 0)
  def __f36(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f36, __names3)
  return join(["let", apply(join, __bs3)], __body33)
setenv("let-unique", {"_stash": True, "macro": __f35})
def __f37(args=None, *_rest, **_params):
  ____r61 = unstash(list(_rest))
  __args7 = destash33(args, ____r61)
  ____id47 = ____r61
  __body35 = cut(____id47, 0)
  return join(["%function"], bind42(__args7, __body35))
setenv("fn", {"_stash": True, "macro": __f37})
def __f38(f=None, *_rest, **_params):
  ____r63 = unstash(list(_rest))
  __f1 = destash33(f, ____r63)
  ____id49 = ____r63
  __args9 = cut(____id49, 0)
  if _35(__args9) > 1:
    return [["do", "apply"], __f1, ["join", join(["list"], almost(__args9)), last(__args9)]]
  else:
    return join([["do", "apply"], __f1], __args9)
setenv("apply", {"_stash": True, "macro": __f38})
def __f39(expr=None):
  if setenv("target", {"_stash": True, "toplevel": True})["value"] == "js":
    return [["fn", join(), ["%try", ["list", True, expr]]]]
  else:
    ____x266 = object(["obj"])
    ____x266["stack"] = [["idx", "debug", "traceback"]]
    ____x266["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x266]]]]
setenv("guard", {"_stash": True, "macro": __f39})
def __f40(x=None, t=None, *_rest, **_params):
  ____r67 = unstash(list(_rest))
  __x290 = destash33(x, ____r67)
  __t1 = destash33(t, ____r67)
  ____id52 = ____r67
  __body37 = cut(____id52, 0)
  __o3 = unique("o")
  __n3 = unique("n")
  __i3 = unique("i")

  if atom63(__x290):
    __e7 = [__i3, __x290]
  else:

    if _35(__x290) > 1:
      __e8 = __x290
    else:
      __e8 = [__i3, hd(__x290)]
    __e7 = __e8
  ____id53 = __e7
  __k4 = ____id53[1]
  __v7 = ____id53[2]

  if setenv("target", {"_stash": True, "toplevel": True})["value"] == "lua" or setenv("target", {"_stash": True, "toplevel": True})["value"] == "py":
    __e9 = __body37
  else:
    __e9 = [join(["let", __k4, ["if", ["numeric?", __k4], ["parseInt", __k4], __k4]], __body37)]
  return ["let", [__o3, __t1, __k4, "nil"], ["%for", __o3, __k4, join(["let", [__v7, ["get", __o3, __k4]]], __e9)]]
setenv("each", {"_stash": True, "macro": __f40})
def __f41(i=None, to=None, *_rest, **_params):
  ____r69 = unstash(list(_rest))
  __i5 = destash33(i, ____r69)
  __to1 = destash33(to, ____r69)
  ____id55 = ____r69
  __body39 = cut(____id55, 0)
  return ["let", __i5, 0, join(["while", ["<", __i5, __to1]], __body39, [["inc", __i5]])]
setenv("for", {"_stash": True, "macro": __f41})
def __f42(v=None, t=None, *_rest, **_params):
  ____r71 = unstash(list(_rest))
  __v9 = destash33(v, ____r71)
  __t3 = destash33(t, ____r71)
  ____id57 = ____r71
  __body41 = cut(____id57, 0)
  __x322 = unique("x")
  __i7 = unique("i")
  return ["let", [__x322, __t3], ["for", __i7, ["#", __x322], join(["let", [__v9, ["at", __x322, __i7]]], __body41)]]
setenv("step", {"_stash": True, "macro": __f42})
def __f43(*_rest, **_params):
  __xs1 = unstash(list(_rest))
  __l3 = []
  ____o5 = __xs1
  ____i9 = None
  for ____i9 in indices(____o5):
    __x332 = ____o5[____i9]
    __l3[__x332] = True
  return join(["obj"], __l3)
setenv("set-of", {"_stash": True, "macro": __f43})
def __f44(x=None):
  return ["=", "target", x]
setenv("target?", {"_stash": True, "macro": __f44})
def __f45(*_rest, **_params):
  __clauses3 = unstash(list(_rest))
  if has63(__clauses3, setenv("target", {"_stash": True, "toplevel": True})["value"]):
    return __clauses3[setenv("target", {"_stash": True, "toplevel": True})["value"]]
  else:
    return hd(__clauses3)
setenv("target", {"_stash": True, "macro": __f45})
def __f46():
  return ["quote", setenv("target", {"_stash": True, "toplevel": True})["value"]]
setenv("language", {"_stash": True, "macro": __f46})
def __f47(a=None, *_rest, **_params):
  ____r77 = unstash(list(_rest))
  __a3 = destash33(a, ____r77)
  ____id59 = ____r77
  __bs5 = cut(____id59, 0)
  return ["set", __a3, join(["join", __a3], __bs5)]
setenv("join!", {"_stash": True, "macro": __f47})
def __f48(a=None, *_rest, **_params):
  ____r79 = unstash(list(_rest))
  __a5 = destash33(a, ____r79)
  ____id61 = ____r79
  __bs7 = cut(____id61, 0)
  return ["set", __a5, join(["cat", __a5], __bs7)]
setenv("cat!", {"_stash": True, "macro": __f48})
def __f49(n=None, by=None):

  if nil63(by):
    __e10 = 1
  else:
    __e10 = by
  return ["set", n, ["+", n, __e10]]
setenv("inc", {"_stash": True, "macro": __f49})
def __f50(n=None, by=None):

  if nil63(by):
    __e11 = 1
  else:
    __e11 = by
  return ["set", n, ["-", n, __e11]]
setenv("dec", {"_stash": True, "macro": __f50})
def __f51(form=None):
  __x359 = unique("x")
  return ["do", ["inc", "indent-level"], ["with", __x359, form, ["dec", "indent-level"]]]
setenv("with-indent", {"_stash": True, "macro": __f51})
def __f52(*_rest, **_params):
  __names5 = unstash(list(_rest))
  def __f53(k=None):
    if k == compile(k):
      return ["set", ["idx", "exports", k], k]
    else:
      return ["set", ["get", "exports", ["quote", k]], k, ["idx", "exports", k], k]
  __forms3 = map(__f53, __names5)
  if setenv("target", {"_stash": True, "toplevel": True})["value"] == "js":
    return join(["do"], __forms3)
  else:
    if setenv("target", {"_stash": True, "toplevel": True})["value"] == "lua":
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms3, [["return", "exports"]])
setenv("export", {"_stash": True, "macro": __f52})
def __f54(*_rest, **_params):
  __body43 = unstash(list(_rest))
  return _eval(join(["do"], __body43))
setenv("when-compiling", {"_stash": True, "macro": __f54})
import reader
import compiler

def eval_print(form=None):
  def __f():
    return compiler._eval(form)
  def __f1(m=None):
    if obj63(m):
      return m
    else:

      if string63(m):
        __e = clip(m, search(m, ": ") + 2)
      else:

        if nil63(m):
          __e1 = ""
        else:
          __e1 = _str(m)
        __e = __e1
      return {"stack": debug.traceback(), "message": __e}
  ____id = [xpcall(__f, __f1)]
  __ok = ____id[1]
  __v = ____id[2]
  if not __ok:
    if is63(__v):
      return _print(_str(__v))
def rep(s=None):
  return eval_print(reader.read_string(s))
def repl():
  __buf = ""
  def rep1(s=None):
    __buf = cat(__buf, s)
    __more = []
    __form = reader.read_string(__buf, __more)
    if not( __form == __more):
      eval_print(__form)
      __buf = ""
      return system.write("> ")
  return system.write("> ")
def compile_file(path=None):
  __s = reader.stream(system.read_file(path))
  __body = reader.read_all(__s)
  __form1 = compiler.expand(join(["do"], __body))
  return compiler.compile(__form1, {"_stash": True, "stmt": True})
def _load(path=None):
  __previous = setenv("target", {"_stash": True, "toplevel": True})["value"]
  setenv("target", {"_stash": True, "toplevel": True})["value"] = "py"
  __code = compile_file(path)
  setenv("target", {"_stash": True, "toplevel": True})["value"] = __previous
  return compiler.run(__code)
def script_file63(path=None):
  return not( "-" == char(path, 0) or ".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4))
def run_file(path=None):
  if script_file63(path):
    return _load(path)
  else:
    return compiler.run(system.read_file(path))
def usage():
  _print("usage: lumen [<file> <arguments> | options <object files>]")
  _print(" <file>\t\tProgram read from script file")
  _print(" <arguments>\tPassed to program in system.argv")
  _print(" <object files>\tLoaded before compiling <input>")
  _print("options:")
  _print(" -c <input>\tCompile input file")
  _print(" -o <output>\tOutput file")
  _print(" -t <target>\tTarget language (default: lua)")
  return _print(" -e <expr>\tExpression to evaluate")
def main():
  __arg = hd(system.argv)
  if __arg and script_file63(__arg):
    return _load(__arg)
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
      while __i < _35(__argv):
        __a = __argv[__i]
        if __a == "-c" or __a == "-o" or __a == "-t" or __a == "-e":
          if __i == edge(__argv):
            _print(cat("missing argument for ", __a))
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
      while ____i1 < _35(____x2):
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
          setenv("target", {"_stash": True, "toplevel": True})["value"] = __target1
        __code1 = compile_file(__input)
        if nil63(__output) or __output == "-":
          return _print(__code1)
        else:
          return system.write_file(__output, __code1)
def main63():
  return __name__ == "__main__"
if main63():
  main()
