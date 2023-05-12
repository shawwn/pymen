environment = [{}]
nil63 = function (x)
end
is63 = function (x)
  return _37not(nil63(x))
end
no = function (x)
  return _37or(nil63(x), _37eq(x, OFF))
end
yes = function (x)
  return _37not(no(x))
end
either = function (x, y)
  if is63(x) then
    return x
  else
    return y
end
has63 = function (l, k)
end
has = function (l, k, _else)
  if has63(l, k) then
    return l[k]
  else
    return _else
end
array63 = function (x)
end
array = function (x)
  if array63(x) then
    return x
  else
    __l = []
    ____o = x
    __k = ""
    for (__k in ____o) {
      __v = ____o[__k]
      __e12 = ""
      if numeric63(__k) then
        __e12 = parseInt(__k)
      else
        __e12 = __k
      __k1 = __e12
      if number63(__k1) then
        __l[__k1] = __v
    }
    return __l
end
object = function (x)
  if array63(x) then
    __l1 = {}
    ____o1 = x
    __k2 = ""
    for (__k2 in ____o1) {
      __v1 = ____o1[__k2]
      __e13 = ""
      if numeric63(__k2) then
        __e13 = parseInt(__k2)
      else
        __e13 = __k2
      __k3 = __e13
      __l1[__k3] = __v1
    }
    return __l1
  else
    return x
end
length = function (x, upto)
  __n2 = -1
  __upto = either(upto, inf)
  ____o2 = x
  __k4 = ""
  for (__k4 in ____o2) {
    __v2 = ____o2[__k4]
    __e14 = ""
    if numeric63(__k4) then
      __e14 = parseInt(__k4)
    else
      __e14 = __k4
    __k5 = __e14
    if number63(__k5) then
      if __k5 > __n2 then
        __n2 = __k5
        if __n2 >= __upto then
          break
  }
  __n2 = __n2 + 1
  return __n2
end
_35 = function (x, upto)
  return string({
    _stash: ON,
    length: x
  })
end
none63 = function (x)
  return _37eq(_35(x, 0), 0)
end
some63 = function (x)
  return _35(x, 0) > 0
end
one63 = function (x)
  return _37eq(_35(x, 1), 1)
end
two63 = function (x)
  return _37eq(_35(x, 2), 2)
end
hd = function (l)
  return l[0]
end
string63 = function (x)
  return _37eq(type(x), "string")
end
number63 = function (x)
  return _37eq(type(x), "number")
end
boolean63 = function (x)
  return _37eq(type(x), "boolean")
end
function63 = function (x)
  return _37eq(type(x), "function")
end
obj63 = function (x)
  return _37and(is63(x), )
end
list63 = function (x)
  return _37or(obj63(x), array63(x))
end
atom63 = function (x)
  return _37or(nil63(x), _37or(string63(x), _37or(number63(x), boolean63(x))))
end
hd63 = function (l, x)
  if function63(x) then
    return x(hd(l))
  else
    if nil63(x) then
      return some63(l)
    else
      return _37eq(x, hd(l))
end
nan = ""
inf = ""
_inf = - inf
nan63 = function (n)
  return _37not(_37eq(n, n))
end
inf63 = function (n)
  return _37or(_37eq(n, inf), _37eq(n, _inf))
end
clip = function (s, from, upto)
end
dupe = function (x)
end
cut = function (x, from, upto)
  __l2 = dupe(x)
  __j = 0
  __e15 = ""
  if _37or(nil63(from), from < 0) then
    __e15 = 0
  else
    __e15 = from
  __i3 = __e15
  __n4 = _35(x)
  __e16 = ""
  if _37or(nil63(upto), upto > __n4) then
    __e16 = __n4
  else
    __e16 = upto
  __upto1 = __e16
  while __i3 < __upto1 do
    __l2[__j] = x[__i3]
    __i3 = __i3 + 1
    __j = __j + 1
  end
  ____o3 = x
  __k6 = ""
  for (__k6 in ____o3) {
    __v3 = ____o3[__k6]
    __e17 = ""
    if numeric63(__k6) then
      __e17 = parseInt(__k6)
    else
      __e17 = __k6
    __k7 = __e17
    if _37not(number63(__k7)) then
      __l2[__k7] = __v3
  }
  return __l2
end
props = function (x)
  __t = {}
  ____o4 = x
  __k8 = ""
  for (__k8 in ____o4) {
    __v4 = ____o4[__k8]
    __e18 = ""
    if numeric63(__k8) then
      __e18 = parseInt(__k8)
    else
      __e18 = __k8
    __k9 = __e18
    if _37not(number63(__k9)) then
      __t[__k9] = __v4
  }
  return __t
end
values = function (x)
  if array63(x) then
    return x
  else
    __t1 = {}
    ____o5 = x
    __k10 = ""
    for (__k10 in ____o5) {
      __v5 = ____o5[__k10]
      __e19 = ""
      if numeric63(__k10) then
        __e19 = parseInt(__k10)
      else
        __e19 = __k10
      __k11 = __e19
      if number63(__k11) then
        __t1[__k11] = __v5
    }
    return array(__t1)
end
edge = function (x)
  return _35(x) - 1
end
inner = function (x)
  return clip(x, 1, edge(x))
end
tl = function (l)
  return cut(l, 1)
end
char = function (s, n)
end
code = function (s, n)
end
string_literal63 = function (x)
  return _37and(string63(x), _37eq(char(x, 0), "\""))
end
id_literal63 = function (x)
  return _37and(string63(x), _37eq(char(x, 0), "|"))
end
add = function (l, x)
  if array63(l) then
    l.(x)
  else
    l[_35(l)] = x
  return ""
end
drop = function (l)
  if array63(l) then
    if some63(l) then
      return l.pop()
  else
    __n8 = edge(l)
    if __n8 >= 0 then
      __r41 = l[__n8]
      delete l[__n8]
      return __r41
end
last = function (l)
  return l[edge(l)]
end
almost = function (l)
  return cut(l, 0, edge(l))
end
reverse = function (l)
  __l11 = props(l)
  __i7 = edge(l)
  while __i7 >= 0 do
    add(__l11, l[__i7])
    __i7 = __i7 - 1
  end
  return __l11
end
reduce = function (f, x, _else)
  if none63(x) then
    return _else
  else
    if one63(x) then
      return hd(x)
    else
      return f(hd(x), reduce(f, tl(x)))
end
join = function (...)
  __ls = unstash([...])
  __r46 = []
  ____x3 = __ls
  ____i8 = 0
  while ____i8 < _35(____x3) do
    __l3 = ____x3[____i8]
    if __l3 then
      __n9 = _35(__r46)
      ____o6 = __l3
      __k12 = ""
      for (__k12 in ____o6) {
        __v6 = ____o6[__k12]
        __e20 = ""
        if numeric63(__k12) then
          __e20 = parseInt(__k12)
        else
          __e20 = __k12
        __k13 = __e20
        if number63(__k13) then
          __k13 = __k13 + __n9
        else
          __l3 = object(__l3)
        __r46[__k13] = __v6
      }
    ____i8 = ____i8 + 1
  end
  return __r46
end
find = function (f, t)
  ____o7 = t
  ____i10 = ""
  for (____i10 in ____o7) {
    __x4 = ____o7[____i10]
    __e21 = ""
    if numeric63(____i10) then
      __e21 = parseInt(____i10)
    else
      __e21 = ____i10
    ____i101 = __e21
    __y = f(__x4)
    if __y then
      return __y
  }
end
first = function (f, l)
  ____x5 = l
  ____i11 = 0
  while ____i11 < _35(____x5) do
    __x6 = ____x5[____i11]
    __y1 = f(__x6)
    if __y1 then
      return __y1
    ____i11 = ____i11 + 1
  end
end
in63 = function (x, t)
  return find(function (y)
    return _37eq(x, y)
  end, t)
end
pair = function (l)
  __l12 = dupe(l)
  __n12 = _35(l)
  __i12 = 0
  while __i12 < __n12 do
    __a = l[__i12]
    __b = l[__i12 + 1]
    add(__l12, [__a, __b])
    __i12 = __i12 + 1
    __i12 = __i12 + 1
  end
  return __l12
end
sortfunc = function (f)
  if f then
    __f = function (a, b)
      if f(a, b) then
        return -1
      else
        return 1
    end
    return __f
end
sort = function (l, f)
  return l
end
map = function (f, x)
  __t2 = dupe(x)
  ____x8 = x
  ____i13 = 0
  while ____i13 < _35(____x8) do
    __v7 = ____x8[____i13]
    __y2 = f(__v7)
    if is63(__y2) then
      add(__t2, __y2)
    ____i13 = ____i13 + 1
  end
  ____o8 = x
  __k14 = ""
  for (__k14 in ____o8) {
    __v8 = ____o8[__k14]
    __e22 = ""
    if numeric63(__k14) then
      __e22 = parseInt(__k14)
    else
      __e22 = __k14
    __k15 = __e22
    if _37not(number63(__k15)) then
      __y3 = f(__v8)
      if is63(__y3) then
        __t2[__k15] = __y3
  }
  return __t2
end
mapcat = function (f, x, sep)
  __r57 = ""
  __c = ""
  ____x9 = x
  ____i15 = 0
  while ____i15 < _35(____x9) do
    __v9 = ____x9[____i15]
    __e23 = ""
    if f then
      __e23 = f(__v9)
    else
      __e23 = __v9
    __y4 = __e23
    if is63(__y4) then
      __r57 = _37cat(__r57, _37cat(__c, __y4))
      __c = _37or(sep, "")
    ____i15 = ____i15 + 1
  end
  return __r57
end
concat = function (sep, x, f)
  return mapcat(f, x, sep)
end
keep = function (f, x)
  return map(function (v)
    if yes(f(v)) then
      return v
  end, x)
end
props63 = function (t)
  ____o9 = t
  __k16 = ""
  for (__k16 in ____o9) {
    __v10 = ____o9[__k16]
    __e24 = ""
    if numeric63(__k16) then
      __e24 = parseInt(__k16)
    else
      __e24 = __k16
    __k17 = __e24
    if _37not(number63(__k17)) then
      return ON
  }
  return OFF
end
empty63 = function (t)
  ____o10 = t
  ____i17 = ""
  for (____i17 in ____o10) {
    __x10 = ____o10[____i17]
    __e25 = ""
    if numeric63(____i17) then
      __e25 = parseInt(____i17)
    else
      __e25 = ____i17
    ____i171 = __e25
    return OFF
  }
  return ON
end
stash = function (args)
  if props63(args) then
    __p = {}
    ____o11 = args
    __k18 = ""
    for (__k18 in ____o11) {
      __v11 = ____o11[__k18]
      __e26 = ""
      if numeric63(__k18) then
        __e26 = parseInt(__k18)
      else
        __e26 = __k18
      __k19 = __e26
      if _37not(number63(__k19)) then
        __p[__k19] = __v11
    }
    __p._stash = ON
    add(args, __p)
  if array63(args) then
    return args
  else
    return array(args)
end
unstash = function (args, params)
  if none63(args) then
    return _37or(params, {})
  else
    __l4 = last(args)
    if _37and(obj63(__l4), has63(__l4, "_stash")) then
      __args1 = object(almost(args))
      ____o12 = __l4
      __k20 = ""
      for (__k20 in ____o12) {
        __v12 = ____o12[__k20]
        __e28 = ""
        if numeric63(__k20) then
          __e28 = parseInt(__k20)
        else
          __e28 = __k20
        __k21 = __e28
        if _37not(_37eq(__k21, "_stash")) then
          __args1[__k21] = __v12
      }
      if params then
        ____o13 = params
        __k22 = ""
        for (__k22 in ____o13) {
          __v13 = ____o13[__k22]
          __e29 = ""
          if numeric63(__k22) then
            __e29 = parseInt(__k22)
          else
            __e29 = __k22
          __k23 = __e29
          __args1[__k23] = __v13
        }
      return __args1
    else
      if params then
        __args11 = object(args)
        ____o14 = params
        __k24 = ""
        for (__k24 in ____o14) {
          __v14 = ____o14[__k24]
          __e27 = ""
          if numeric63(__k24) then
            __e27 = parseInt(__k24)
          else
            __e27 = __k24
          __k25 = __e27
          __args11[__k25] = __v14
        }
        return __args11
      else
        return args
end
destash33 = function (l, args1)
  if _37and(obj63(l), has63(l, "_stash")) then
    ____o15 = l
    __k26 = ""
    for (__k26 in ____o15) {
      __v15 = ____o15[__k26]
      __e30 = ""
      if numeric63(__k26) then
        __e30 = parseInt(__k26)
      else
        __e30 = __k26
      __k27 = __e30
      if _37not(_37eq(__k27, "_stash")) then
        args1[__k27] = __v15
    }
  else
    return l
end
search = function (s, pattern, start)
  __i23 = s.(pattern, start)
  if __i23 >= 0 then
    return __i23
end
string_ends63 = function (str, x, pos)
  __e31 = ""
  if is63(pos) then
    __e31 = clip(str, pos)
  else
    __e31 = str
  __str = __e31
  if _35(x) > _35(__str) then
    return OFF
  else
    return _37eq(x, clip(__str, _35(__str) - _35(x)))
end
string_starts63 = function (str, x, pos)
  __e32 = ""
  if is63(pos) then
    __e32 = clip(str, pos)
  else
    __e32 = str
  __str1 = __e32
  if _35(x) > _35(__str1) then
    return OFF
  else
    return _37eq(x, clip(__str1, 0, _35(x)))
end
split = function (s, sep)
  if _37or(_37eq(s, ""), _37eq(sep, "")) then
    return []
  else
    __l5 = []
    __n21 = _35(sep)
    while ON do
      __i24 = search(s, sep)
      if nil63(__i24) then
        break
      else
        add(__l5, clip(s, 0, __i24))
        s = clip(s, __i24 + __n21)
    end
    add(__l5, s)
    return __l5
end
tostr = function (x)
  if string63(x) then
    return x
  else
    if nil63(x) then
      return ""
    else
      return str(x)
end
cat2 = function (a, b)
  return _37cat(a, b)
end
cat = function (...)
  __xs = unstash([...])
  return reduce(function (a, b)
    return cat2(a, b)
  end, __xs, "")
end
_43 = function (...)
  __xs1 = unstash([...])
  return reduce(function (a, b)
    return a + b
  end, __xs1, 0)
end
_45 = function (...)
  __xs2 = unstash([...])
  return reduce(function (b, a)
    return a - b
  end, reverse(__xs2), 0)
end
_42 = function (...)
  __xs3 = unstash([...])
  return reduce(function (a, b)
    return a * b
  end, __xs3, 1)
end
_47 = function (...)
  __xs4 = unstash([...])
  return reduce(function (b, a)
    return a / b
  end, reverse(__xs4), 1)
end
_37 = function (...)
  __xs5 = unstash([...])
  return reduce(function (b, a)
    return a % b
  end, reverse(__xs5), 1)
end
pairwise = function (f, xs)
  __i25 = 0
  while __i25 < edge(xs) do
    __a1 = xs[__i25]
    __b1 = xs[__i25 + 1]
    if _37not(f(__a1, __b1)) then
      return OFF
    __i25 = __i25 + 1
  end
  return ON
end
_60 = function (...)
  __xs6 = unstash([...])
  return pairwise(function (a, b)
    return a < b
  end, __xs6)
end
_62 = function (...)
  __xs7 = unstash([...])
  return pairwise(function (a, b)
    return a > b
  end, __xs7)
end
_61 = function (...)
  __xs8 = unstash([...])
  return pairwise(function (a, b)
    return _37eq(a, b)
  end, __xs8)
end
_6061 = function (...)
  __xs9 = unstash([...])
  return pairwise(function (a, b)
    return a <= b
  end, __xs9)
end
_6261 = function (...)
  __xs10 = unstash([...])
  return pairwise(function (a, b)
    return a >= b
  end, __xs10)
end
number_code63 = function (n)
  return _37and(n > 47, n < 58)
end
number = function (s)
end
numeric63 = function (s)
  __n22 = _35(s)
  __i26 = 0
  while __i26 < __n22 do
    if _37not(number_code63(code(s, __i26))) then
      return OFF
    __i26 = __i26 + 1
  end
  return some63(s)
end
uppercase = function (x)
  return string({
    _stash: ON,
    toupper: x
  })
end
lowercase = function (x)
  return string({
    _stash: ON,
    tolower: x
  })
end
dashcase = function (x)
  return mapcat(lowercase, split(x, "_"), "-")
end
screamcase = function (x)
  return mapcat(uppercase, split(x, "-"), "_")
end
escape = function (s)
  if _37and(nil63(search(s, "\n")), _37and(nil63(search(s, "\r")), _37and(nil63(search(s, "\"")), nil63(search(s, "\\"))))) then
    return _37cat("\"", _37cat(s, "\""))
  else
    __s1 = "\""
    __i27 = 0
    while __i27 < _35(s) do
      __c1 = char(s, __i27)
      __e33 = ""
      if _37eq(__c1, "\n") then
        __e33 = "\\n"
      else
        __e34 = ""
        if _37eq(__c1, "\r") then
          __e34 = "\\r"
        else
          __e35 = ""
          if _37eq(__c1, "\"") then
            __e35 = "\\\""
          else
            __e36 = ""
            if _37eq(__c1, "\\") then
              __e36 = "\\\\"
            else
              __e36 = __c1
            __e35 = __e36
          __e34 = __e35
        __e33 = __e34
      __c11 = __e33
      __s1 = _37cat(__s1, __c11)
      __i27 = __i27 + 1
    end
    return _37cat(__s1, "\"")
end
str = function (x, repr, stack)
  if nil63(x) then
    return "nil"
  else
    if nan63(x) then
      return "nan"
    else
      if _37eq(x, inf) then
        return "inf"
      else
        if _37eq(x, _inf) then
          return "-inf"
        else
          if boolean63(x) then
            if x then
              return "true"
            else
              return "false"
          else
            if simple_id63(x) then
              return x
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
                    if _37and(stack, in63(x, stack)) then
                      return "circular"
                    else
                      __e37 = ""
                      if repr then
                        __e37 = repr(x)
                      else
                        __e37 = _37cat("|", _37cat(tostring(x), "|"))
                      if __e37 then
                        __s = "("
                        __sp = ""
                        __xs11 = {}
                        __ks = []
                        __l6 = _37or(stack, [])
                        add(__l6, x)
                        ____o16 = x
                        __k28 = ""
                        for (__k28 in ____o16) {
                          __v16 = ____o16[__k28]
                          __e38 = ""
                          if numeric63(__k28) then
                            __e38 = parseInt(__k28)
                          else
                            __e38 = __k28
                          __k29 = __e38
                          if number63(__k29) then
                            __xs11[__k29] = str(__v16, repr, __l6)
                          else
                            if function63(__v16) then
                              add(__ks, [_37cat(".", __k29), ""])
                            else
                              add(__ks, [_37cat(__k29, ": "), str(__v16, repr, __l6)])
                        }
                        sort(__ks, function (__x24, __x25)
                          ____id = __x24
                          __a2 = has(____id, 0)
                          ____id1 = __x25
                          __b2 = has(____id1, 0)
                          return __a2 < __b2
                        end)
                        drop(__l6)
                        ____x26 = __xs11
                        ____i29 = 0
                        while ____i29 < _35(____x26) do
                          __v17 = ____x26[____i29]
                          __s = _37cat(__s, _37cat(__sp, __v17))
                          __sp = " "
                          ____i29 = ____i29 + 1
                        end
                        ____x27 = __ks
                        ____i30 = 0
                        while ____i30 < _35(____x27) do
                          ____id2 = ____x27[____i30]
                          __k30 = has(____id2, 0)
                          __v18 = has(____id2, 1)
                          __s = _37cat(__s, _37cat(__sp, _37cat(__k30, __v18)))
                          __sp = " "
                          ____i30 = ____i30 + 1
                        end
                        return _37cat(__s, ")")
end
apply = function (f, args)
  __args = stash(args)
end
call = function (f, ...)
  ____r95 = unstash([...])
  __f1 = destash33(f, ____r95)
  ____id3 = ____r95
  __args12 = cut(____id3, 0)
  return apply(__f1, __args12)
end
setenv = function (k, ...)
  ____r96 = unstash([...])
  __k31 = destash33(k, ____r96)
  ____id4 = ____r96
  __keys = cut(____id4, 0)
  if string63(__k31) then
    __e39 = ""
    if has63(__keys, "toplevel") then
      __e39 = hd(environment)
    else
      __e39 = last(environment)
    __frame = __e39
    __e40 = ""
    if has63(__frame, __k31) then
      __e40 = __frame[__k31]
    else
      __e40 = {}
    __entry = __e40
    ____o17 = __keys
    __k32 = ""
    for (__k32 in ____o17) {
      __v19 = ____o17[__k32]
      __e41 = ""
      if numeric63(__k32) then
        __e41 = parseInt(__k32)
      else
        __e41 = __k32
      __k33 = __e41
      if _37not(_37eq(__k33, "toplevel")) then
        __entry[__k33] = __v19
    }
    __frame[__k31] = __entry
    return __frame[__k31]
end
print = ""
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
setenv("target", {
  _stash: ON,
  toplevel: ON,
  value: either(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "cmake")
})
setenv("target", {
  _stash: ON,
  symbol: ["get-value", ["quote", "target"]]
})
__quote__macro = function (form)
  return quoted(form)
end
setenv("quote", {
  _stash: ON,
  ["macro"]: __quote__macro
})
__quasiquote__macro = function (form)
  return quasiexpand(form, 1)
end
setenv("quasiquote", {
  _stash: ON,
  ["macro"]: __quasiquote__macro
})
__set__macro = function (...)
  __args3 = unstash([...])
  return join(["%do"], map(function (__x40)
    ____id6 = __x40
    __lh1 = has(____id6, 0)
    __rh1 = has(____id6, 1)
    __lh1 = macroexpand(__lh1)
    if _37and(_37not(atom63(__lh1)), _37eq(hd(__lh1), "has")) then
      return ["%set", join(["%get"], tl(__lh1)), __rh1]
    else
      return ["%set", __lh1, __rh1]
  end, pair(__args3)))
end
setenv("set", {
  _stash: ON,
  ["macro"]: __set__macro
})
__at__macro = function (l, i)
  if _37and(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua"), number63(i)) then
    i = i + 1
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "lua") then
      i = ["+", i, 1]
  return ["%get", l, i]
end
setenv("at", {
  _stash: ON,
  ["macro"]: __at__macro
})
__wipe__macro = function (place)
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua") then
    return ["set", place, "nil"]
  else
    return ["%delete", place]
end
setenv("wipe", {
  _stash: ON,
  ["macro"]: __wipe__macro
})
__list__macro = function (...)
  __body2 = unstash([...])
  if _37and(one63(__body2), _37and(hd63(__body2, "..."), _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py"))) then
    return "_args"
  else
    if _37and(_35(__body2) > 2, _37and(_37eq(__body2[1], "for"), _37eq(__body2[3], "in"))) then
      ____id10 = __body2
      __expr2 = has(____id10, 0)
      __body3 = cut(____id10, 1)
      __comps1 = []
      __cond1 = ""
      while _37and(_35(__body3) > 2, _37and(_37eq(__body3[0], "for"), _37eq(__body3[2], "in"))) do
        ____id11 = __body3
        ___for1 = has(____id11, 0)
        __names1 = has(____id11, 1)
        ___in1 = has(____id11, 2)
        __l9 = has(____id11, 3)
        __body12 = cut(____id11, 4)
        add(__comps1, [__names1, __l9])
        __body3 = __body12
      end
      if _37eq(hd(__body3), "if") then
        ____id12 = __body3
        ___if1 = has(____id12, 0)
        __expr3 = has(____id12, 1)
        __cond1 = __expr3
      return ["%list", __expr2, __comps1, __cond1]
    else
      __x67 = unique("x")
      __l10 = []
      __forms1 = []
      ____o19 = __body2
      __k36 = ""
      for (__k36 in ____o19) {
        __v21 = ____o19[__k36]
        __e42 = ""
        if numeric63(__k36) then
          __e42 = parseInt(__k36)
        else
          __e42 = __k36
        __k37 = __e42
        if number63(__k37) then
          __l10[__k37] = __v21
        else
          add(__forms1, ["%set", ["%get", __x67, ["quote", __k37]], __v21])
      }
      if some63(__forms1) then
        return join(["let", __x67, ["object", join(["%array"], __l10)]], __forms1, [__x67])
      else
        return join(["%array"], __l10)
end
setenv("list", {
  _stash: ON,
  ["macro"]: __list__macro
})
__if__macro = function (...)
  __branches1 = unstash([...])
  return hd(expand_if(__branches1))
end
setenv("if", {
  _stash: ON,
  ["macro"]: __if__macro
})
__case__macro = function (expr, ...)
  ____r110 = unstash([...])
  __expr5 = destash33(expr, ____r110)
  ____id15 = ____r110
  __e43 = ""
  if nil63(has(____id15, "cmp")) then
    __e43 = "="
  else
    __e43 = has(____id15, "cmp")
  __cmp1 = __e43
  __clauses1 = cut(____id15, 0)
  __x91 = unique("x")
  __eq1 = function (_)
    return [__cmp1, _, __x91]
  end
  __cl1 = function (__x93)
    ____id16 = __x93
    __a4 = has(____id16, 0)
    __b4 = has(____id16, 1)
    if nil63(__b4) then
      return [__a4]
    else
      if _37or(string63(__a4), number63(__a4)) then
        return [__eq1(__a4), __b4]
      else
        if _37and(list63(__a4), hd63(__a4, "quote")) then
          return [__eq1(__a4), __b4]
        else
          if one63(__a4) then
            return [__eq1(hd(__a4)), __b4]
          else
            if _35(__a4) > 1 then
              return [join(["or"], map(__eq1, __a4)), __b4]
  end
  return ["let", __x91, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]
end
setenv("case", {
  _stash: ON,
  ["macro"]: __case__macro
})
__of__macro = function (x, ...)
  ____r114 = unstash([...])
  __x106 = destash33(x, ____r114)
  ____id18 = ____r114
  __values1 = cut(____id18, 0)
  return join(["case", __x106, __values1, ON, OFF], props(__values1))
end
setenv("of", {
  _stash: ON,
  ["macro"]: __of__macro
})
__when__macro = function (cond, ...)
  ____r116 = unstash([...])
  __cond3 = destash33(cond, ____r116)
  ____id20 = ____r116
  __body5 = cut(____id20, 0)
  return ["%if", __cond3, join(["%do"], __body5)]
end
setenv("when", {
  _stash: ON,
  ["macro"]: __when__macro
})
__unless__macro = function (cond, ...)
  ____r118 = unstash([...])
  __cond5 = destash33(cond, ____r118)
  ____id22 = ____r118
  __body7 = cut(____id22, 0)
  return ["%if", ["%not", __cond5], join(["%do"], __body7)]
end
setenv("unless", {
  _stash: ON,
  ["macro"]: __unless__macro
})
__obj__macro = function (...)
  __body10 = unstash([...])
  if _37and(one63(__body10), _37and(hd63(__body10, "..."), _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py"))) then
    return "_keys"
  else
    if _37and(_35(__body10) > 2, _37and(_37eq(__body10[1], "for"), _37eq(__body10[3], "in"))) then
      ____id26 = __body10
      __expr8 = has(____id26, 0)
      __body111 = cut(____id26, 1)
      __comps3 = []
      __cond7 = ""
      while _37and(_35(__body111) > 2, _37and(_37eq(__body111[0], "for"), _37eq(__body111[2], "in"))) do
        ____id27 = __body111
        ___for3 = has(____id27, 0)
        __names3 = has(____id27, 1)
        ___in3 = has(____id27, 2)
        __l121 = has(____id27, 3)
        __body14 = cut(____id27, 4)
        add(__comps3, [__names3, __l121])
        __body111 = __body14
      end
      if _37eq(hd(__body111), "if") then
        ____id28 = __body111
        ___if3 = has(____id28, 0)
        __expr9 = has(____id28, 1)
        __cond7 = __expr9
      if _37and(list63(__expr8), hd63(__expr8, ",")) then
        __expr8 = join([":"], tl(__expr8))
      ____x130 = object(["%list", __expr8, __comps3, __cond7])
      ____x130.kind = "object"
      return ____x130
    else
      return join(["%object"], mapo(function (x)
        return x
      end, __body10))
end
setenv("obj", {
  _stash: ON,
  ["macro"]: __obj__macro
})
__let__macro = function (bs, ...)
  ____r122 = unstash([...])
  __bs11 = destash33(bs, ____r122)
  ____id33 = ____r122
  __body131 = cut(____id33, 0)
  if _37or(atom63(__bs11), hd63(__bs11, ",")) then
    return join(["let", [__bs11, hd(__body131)]], tl(__body131))
  else
    if none63(__bs11) then
      return join(["%do"], __body131)
    else
      ____id34 = __bs11
      __lh3 = has(____id34, 0)
      __rh3 = has(____id34, 1)
      __bs21 = cut(____id34, 2)
      ____id35 = bind(__lh3, __rh3)
      __id36 = has(____id35, 0)
      __val1 = has(____id35, 1)
      __bs12 = cut(____id35, 2)
      __renames1 = []
      if _37not(id_literal63(__id36)) then
        __id121 = unique(__id36)
        __renames1 = [__id36, __id121]
        __id36 = __id121
      return ["%do", ["%local", __id36, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body131)]]
end
setenv("let", {
  _stash: ON,
  ["macro"]: __let__macro
})
__with__macro = function (x, v, ...)
  ____r124 = unstash([...])
  __x159 = destash33(x, ____r124)
  __v23 = destash33(v, ____r124)
  ____id38 = ____r124
  __body15 = cut(____id38, 0)
  if _37eq(__v23, "as") then
    return join(["%with", ["%as", __x159, hd(__body15)]], tl(__body15))
  else
    if _37or(_37not(atom63(__x159)), has(__body15, "async")) then
      return join(["%with", __x159, __v23], __body15)
    else
      return join(["let", [__x159, __v23]], __body15, [__x159])
end
setenv("with", {
  _stash: ON,
  ["macro"]: __with__macro
})
__let_when__macro = function (x, v, ...)
  ____r126 = unstash([...])
  __x174 = destash33(x, ____r126)
  __v25 = destash33(v, ____r126)
  ____id40 = ____r126
  __body17 = cut(____id40, 0)
  __y6 = unique("y")
  return ["let", __y6, __v25, ["when", ["yes", __y6], join(["let", [__x174, __y6]], __body17)]]
end
setenv("let-when", {
  _stash: ON,
  ["macro"]: __let_when__macro
})
__define_macro__macro = function (name, args, ...)
  ____r128 = unstash([...])
  __name1 = destash33(name, ____r128)
  __args5 = destash33(args, ____r128)
  ____id43 = ____r128
  __body19 = cut(____id43, 0)
  __id44 = unique(_37cat(__name1, "--macro"))
  ____x188 = object(["setenv", ["quote", __name1]])
  ____x188["macro"] = __id44
  __form1 = ["do", join(["define", __id44, __args5], __body19), ____x188]
  eval(__form1)
  return __form1
end
setenv("define-macro", {
  _stash: ON,
  ["macro"]: __define_macro__macro
})
__define_special__macro = function (name, args, ...)
  ____r130 = unstash([...])
  __name3 = destash33(name, ____r130)
  __args7 = destash33(args, ____r130)
  ____id47 = ____r130
  __body21 = cut(____id47, 0)
  __id48 = unique(_37cat(__name3, "--special"))
  ____x198 = object(["setenv", ["quote", __name3]])
  ____x198.special = __id48
  __form3 = ["do", join(["define", __id48, __args7], __body21), join(____x198, props(__body21))]
  eval(__form3)
  return __form3
end
setenv("define-special", {
  _stash: ON,
  ["macro"]: __define_special__macro
})
__define_symbol__macro = function (name, expansion)
  setenv(name, {
    _stash: ON,
    symbol: expansion
  })
  ____x203 = object(["setenv", ["quote", name]])
  ____x203.symbol = ["quote", expansion]
  return ____x203
end
setenv("define-symbol", {
  _stash: ON,
  ["macro"]: __define_symbol__macro
})
__define_reader__macro = function (__x212, ...)
  ____r134 = unstash([...])
  ____x212 = destash33(__x212, ____r134)
  ____id51 = ____x212
  __char1 = has(____id51, 0)
  __s2 = has(____id51, 1)
  ____id52 = ____r134
  __body23 = cut(____id52, 0)
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body23)]
end
setenv("define-reader", {
  _stash: ON,
  ["macro"]: __define_reader__macro
})
__define__macro = function (name, x, ...)
  ____r136 = unstash([...])
  __name5 = destash33(name, ____r136)
  __x223 = destash33(x, ____r136)
  ____id54 = ____r136
  __body25 = cut(____id54, 0)
  setenv(__name5, {
    _stash: ON,
    variable: ON
  })
  if some63(__body25) then
    return join(["%local-function", __name5], bind42(__x223, __body25), props(__body25))
  else
    return join(["%local", __name5, __x223], props(__body25))
end
setenv("define", {
  _stash: ON,
  ["macro"]: __define__macro
})
__define_global__macro = function (name, x, ...)
  ____r138 = unstash([...])
  __name7 = destash33(name, ____r138)
  __x231 = destash33(x, ____r138)
  ____id56 = ____r138
  __body27 = cut(____id56, 0)
  setenv(__name7, {
    _stash: ON,
    toplevel: ON,
    variable: ON
  })
  if some63(__body27) then
    return join(["%global-function", __name7], bind42(__x231, __body27), props(__body27))
  else
    return join(["set", __name7, __x231], props(__body27))
end
setenv("define-global", {
  _stash: ON,
  ["macro"]: __define_global__macro
})
__get_value__macro = function (x)
  ____x238 = object(["setenv", x])
  ____x238.toplevel = ON
  return ["has", ____x238, ["quote", "value"]]
end
setenv("get-value", {
  _stash: ON,
  ["macro"]: __get_value__macro
})
__define_constant__macro = function (name, x)
  ____x249 = object(["setenv", ["quote", name]])
  ____x249.toplevel = ON
  ____x249.value = either(x, ["get-value", ["quote", name]])
  return ["%do", ____x249, ["define-symbol", name, ["get-value", ["quote", name]]]]
end
setenv("define-constant", {
  _stash: ON,
  ["macro"]: __define_constant__macro
})
__define_variable__macro = function (name, x)
  if is63(x) then
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else
    return ["define-constant", name]
end
setenv("define-variable", {
  _stash: ON,
  ["macro"]: __define_variable__macro
})
__after__macro = function (x, ...)
  ____r147 = unstash([...])
  __x279 = destash33(x, ____r147)
  ____id58 = ____r147
  __body29 = cut(____id58, 0)
  __ok1 = unique("ok")
  __r148 = unique("r")
  ____x280 = object(["target", ["try", __x279, join(["finally"], __body29)]])
  ____x280.lua = join(["let", [[__ok1, __r148], ["guard", __x279]]], __body29, [["if", __ok1, __r148, ["throw", __r148]]])
  return ____x280
end
setenv("after", {
  _stash: ON,
  ["macro"]: __after__macro
})
__with_frame__macro = function (...)
  __body31 = unstash([...])
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body31), ["drop", "environment"]]]
end
setenv("with-frame", {
  _stash: ON,
  ["macro"]: __with_frame__macro
})
__with_values__macro = function (...)
  __body33 = unstash([...])
  __forms3 = []
  ____o21 = __body33
  __k40 = ""
  for (__k40 in ____o21) {
    __v27 = ____o21[__k40]
    __e44 = ""
    if numeric63(__k40) then
      __e44 = parseInt(__k40)
    else
      __e44 = __k40
    __k41 = __e44
    if _37not(number63(__k41)) then
      ____x310 = object(["setenv", ["quote", __k41]])
      ____x310.value = __v27
      add(__forms3, ____x310)
  }
  return join(["with-frame"], __forms3)
end
setenv("with-values", {
  _stash: ON,
  ["macro"]: __with_values__macro
})
__with_bindings__macro = function (__x318, ...)
  ____r150 = unstash([...])
  ____x318 = destash33(__x318, ____r150)
  ____id61 = ____x318
  __names5 = has(____id61, 0)
  ____id62 = ____r150
  __body35 = cut(____id62, 0)
  __x320 = unique("x")
  ____x323 = object(["setenv", __x320])
  ____x323.variable = ON
  return join(["with-frame", ["each", __x320, __names5, ____x323]], __body35)
end
setenv("with-bindings", {
  _stash: ON,
  ["macro"]: __with_bindings__macro
})
__let_macro__macro = function (definitions, ...)
  ____r155 = unstash([...])
  __definitions1 = destash33(definitions, ____r155)
  ____id64 = ____r155
  __body37 = cut(____id64, 0)
  add(environment, {})
  ____r157 = ""
  try{
    map(function (m)
      return macroexpand(join(["define-macro"], m))
    end, __definitions1)
    ____r157 = join(["%do"], macroexpand(__body37))
  }
  finally{
    drop(environment)
  }
  return ____r157
end
setenv("let-macro", {
  _stash: ON,
  ["macro"]: __let_macro__macro
})
__let_symbol__macro = function (expansions, ...)
  ____r163 = unstash([...])
  __expansions1 = destash33(expansions, ____r163)
  ____id67 = ____r163
  __body39 = cut(____id67, 0)
  add(environment, {})
  ____r165 = ""
  try{
    map(function (__x335)
      ____id68 = __x335
      __name9 = has(____id68, 0)
      __exp1 = has(____id68, 1)
      return macroexpand(["define-symbol", __name9, __exp1])
    end, pair(__expansions1))
    ____r165 = join(["%do"], macroexpand(__body39))
  }
  finally{
    drop(environment)
  }
  return ____r165
end
setenv("let-symbol", {
  _stash: ON,
  ["macro"]: __let_symbol__macro
})
__let_unique__macro = function (names, ...)
  ____r169 = unstash([...])
  __names7 = destash33(names, ____r169)
  ____id70 = ____r169
  __body41 = cut(____id70, 0)
  __bs3 = map(function (n)
    return [n, ["unique", ["quote", n]]]
  end, __names7)
  return join(["let", apply(join, __bs3)], __body41)
end
setenv("let-unique", {
  _stash: ON,
  ["macro"]: __let_unique__macro
})
__fn__macro = function (args, ...)
  ____r172 = unstash([...])
  __args9 = destash33(args, ____r172)
  ____id72 = ____r172
  __body43 = cut(____id72, 0)
  return join(["%function"], bind42(__args9, __body43), props(__body43))
end
setenv("fn", {
  _stash: ON,
  ["macro"]: __fn__macro
})
__apply__macro = function (f, ...)
  ____r174 = unstash([...])
  __f3 = destash33(f, ____r174)
  ____id74 = ____r174
  __args111 = cut(____id74, 0)
  if _35(__args111) > 1 then
    return ["%call", "apply", __f3, ["join", join(["list"], almost(__args111)), last(__args111), join(["list"], props(__args111))]]
  else
    if props63(__args111) then
      return ["%call", "apply", __f3, join(["join"], __args111, [join(["list"], props(__args111))])]
    else
      return join(["%call", "apply", __f3], __args111)
end
setenv("apply", {
  _stash: ON,
  ["macro"]: __apply__macro
})
__guard__macro = function (expr)
  ____x402 = object(["target", [["%function", join(), ["%try", ["list", ON, expr]]]]])
  ____x414 = object(["obj"])
  ____x414.stack = [["idx", "debug", "traceback"]]
  ____x414.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
  ____x402.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x414]]]]
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x402]
end
setenv("guard", {
  _stash: ON,
  ["macro"]: __guard__macro
})
__each__macro = function (x, t, ...)
  ____r178 = unstash([...])
  __x443 = destash33(x, ____r178)
  __t4 = destash33(t, ____r178)
  ____id77 = ____r178
  __body45 = cut(____id77, 0)
  __o23 = unique("o")
  __n30 = unique("n")
  __i37 = unique("i")
  __e45 = ""
  if atom63(__x443) then
    __e45 = [__i37, __x443]
  else
    __e46 = ""
    if _35(__x443) > 1 then
      __e46 = __x443
    else
      __e46 = [__i37, hd(__x443)]
    __e45 = __e46
  ____id78 = __e45
  __k43 = has(____id78, 0)
  __v29 = has(____id78, 1)
  ____x449 = object(["target", __o23])
  ____x449.py = ["indices", __o23]
  __e47 = ""
  if _37or(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua"), _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py")) then
    __e47 = __body45
  else
    __e47 = [join(["let", __k43, ["if", ["numeric?", __k43], ["parseInt", __k43], __k43]], __body45)]
  return ["let", [__o23, __t4, __k43, "nil"], join(["%for", ____x449, __k43], props(__body45), [join(["let", [__v29, ["%get", __o23, __k43]]], __e47)])]
end
setenv("each", {
  _stash: ON,
  ["macro"]: __each__macro
})
__for__macro = function (i, to, ...)
  ____r180 = unstash([...])
  __i39 = destash33(i, ____r180)
  __to1 = destash33(to, ____r180)
  ____id80 = ____r180
  __body47 = cut(____id80, 0)
  if _37eq(__to1, "in") then
    return join(["%for", hd(__body47), __i39, join(["%do"], tl(__body47))], props(__body47))
  else
    return ["let", __i39, 0, join(["while", ["<", __i39, __to1]], __body47, [["inc", __i39]])]
end
setenv("for", {
  _stash: ON,
  ["macro"]: __for__macro
})
__step__macro = function (v, t, ...)
  ____r182 = unstash([...])
  __v31 = destash33(v, ____r182)
  __t6 = destash33(t, ____r182)
  ____id82 = ____r182
  __body49 = cut(____id82, 0)
  __x486 = unique("x")
  __i41 = unique("i")
  return ["let", [__x486, __t6], ["for", __i41, ["#", __x486], join(["let", [__v31, ["at", __x486, __i41]]], __body49)]]
end
setenv("step", {
  _stash: ON,
  ["macro"]: __step__macro
})
__set_of__macro = function (...)
  __xs13 = unstash([...])
  __l14 = []
  ____o25 = __xs13
  ____i43 = ""
  for (____i43 in ____o25) {
    __x498 = ____o25[____i43]
    __e48 = ""
    if numeric63(____i43) then
      __e48 = parseInt(____i43)
    else
      __e48 = ____i43
    ____i431 = __e48
    __l14[__x498] = ON
  }
  return join(["obj"], __l14)
end
setenv("set-of", {
  _stash: ON,
  ["macro"]: __set_of__macro
})
__target63__macro = function (x)
  return ["=", "target", x]
end
setenv("target?", {
  _stash: ON,
  ["macro"]: __target63__macro
})
__target__macro = function (...)
  __clauses3 = unstash([...])
  if has63(__clauses3, has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value")) then
    return __clauses3[has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value")]
  else
    return hd(__clauses3)
end
setenv("target", {
  _stash: ON,
  ["macro"]: __target__macro
})
__language__macro = function ()
  return ["quote", has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value")]
end
setenv("language", {
  _stash: ON,
  ["macro"]: __language__macro
})
__join33__macro = function (a, ...)
  ____r188 = unstash([...])
  __a6 = destash33(a, ____r188)
  ____id84 = ____r188
  __bs5 = cut(____id84, 0)
  return ["set", __a6, join(["join", __a6], __bs5)]
end
setenv("join!", {
  _stash: ON,
  ["macro"]: __join33__macro
})
__cat33__macro = function (a, ...)
  ____r190 = unstash([...])
  __a8 = destash33(a, ____r190)
  ____id86 = ____r190
  __bs7 = cut(____id86, 0)
  return ["set", __a8, join(["cat", __a8], __bs7)]
end
setenv("cat!", {
  _stash: ON,
  ["macro"]: __cat33__macro
})
__inc__macro = function (n, by)
  __e49 = ""
  if nil63(by) then
    __e49 = 1
  else
    __e49 = by
  return ["set", n, ["+", n, __e49]]
end
setenv("inc", {
  _stash: ON,
  ["macro"]: __inc__macro
})
__dec__macro = function (n, by)
  __e50 = ""
  if nil63(by) then
    __e50 = 1
  else
    __e50 = by
  return ["set", n, ["-", n, __e50]]
end
setenv("dec", {
  _stash: ON,
  ["macro"]: __dec__macro
})
__with_indent__macro = function (form)
  __x531 = unique("x")
  return ["%do", ["inc", "indent-level"], ["with", __x531, form, ["dec", "indent-level"]]]
end
setenv("with-indent", {
  _stash: ON,
  ["macro"]: __with_indent__macro
})
__export__macro = function (...)
  __names9 = unstash([...])
  __forms5 = map(function (k)
    if _37eq(k, compile(k)) then
      return ["%set", ["idx", "exports", k], k]
    else
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]]
  end, __names9)
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js") then
    return join(["%do"], __forms5)
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "lua") then
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]])
end
setenv("export", {
  _stash: ON,
  ["macro"]: __export__macro
})
__when_compiling__macro = function (...)
  __body51 = unstash([...])
  return eval(join(["%do"], __body51))
end
setenv("when-compiling", {
  _stash: ON,
  ["macro"]: __when_compiling__macro
})
__during_compilation__macro = function (...)
  __body53 = unstash([...])
  __form5 = join(["%do"], __body53)
  eval(__form5)
  return __form5
end
setenv("during-compilation", {
  _stash: ON,
  ["macro"]: __during_compilation__macro
})
__def__macro = function (name, ...)
  ____r200 = unstash([...])
  __name11 = destash33(name, ____r200)
  ____id88 = ____r200
  __body55 = cut(____id88, 0)
  return join(["define-global", __name11], __body55)
end
setenv("def", {
  _stash: ON,
  ["macro"]: __def__macro
})
__mac__macro = function (name, ...)
  ____r202 = unstash([...])
  __name13 = destash33(name, ____r202)
  ____id90 = ____r202
  __body57 = cut(____id90, 0)
  return join(["define-macro", __name13], __body57)
end
setenv("mac", {
  _stash: ON,
  ["macro"]: __mac__macro
})
__defconst__macro = function (name, ...)
  ____r204 = unstash([...])
  __name15 = destash33(name, ____r204)
  ____id92 = ____r204
  __value1 = cut(____id92, 0)
  return join(["def", __name15], __value1)
end
setenv("defconst", {
  _stash: ON,
  ["macro"]: __defconst__macro
})
__undefined63__macro = function (name)
  ____x595 = object(["target"])
  ____x595.js = ["=", ["typeof", name], "\"undefined\""]
  ____x595.lua = ["=", ["idx", "_G", name], "nil"]
  ____x595.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x595
end
setenv("undefined?", {
  _stash: ON,
  ["macro"]: __undefined63__macro
})
__defvar__macro = function (name, ...)
  ____r208 = unstash([...])
  __name17 = destash33(name, ____r208)
  ____id94 = ____r208
  __value3 = cut(____id94, 0)
  ____x613 = object(["target"])
  ____x613.py = ["global", __name17]
  return ["when", ["undefined?", __name17], ____x613, join(["defconst", __name17], __value3)]
end
setenv("defvar", {
  _stash: ON,
  ["macro"]: __defvar__macro
})
__async__macro = function (keyword, ...)
  ____r210 = unstash([...])
  __keyword1 = destash33(keyword, ____r210)
  ____id96 = ____r210
  __body59 = cut(____id96, 0)
  ____x619 = object([__keyword1])
  ____x619.async = ON
  return join(____x619, __body59)
end
setenv("async", {
  _stash: ON,
  ["macro"]: __async__macro
})
___37read_from_file__macro = function (name)
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]]
end
setenv("%read-from-file", {
  _stash: ON,
  ["macro"]: ___37read_from_file__macro
})
__the__macro = function (name)
  return ["getenv", ["quote", name], ["quote", "value"]]
end
setenv("the", {
  _stash: ON,
  ["macro"]: __the__macro
})
__cat__macro = function (a, ...)
  ____r216 = unstash([...])
  __a10 = destash33(a, ____r216)
  ____id98 = ____r216
  __bs9 = cut(____id98, 0)
  if nil63(__a10) then
    return ""
  else
    if none63(__bs9) then
      return __a10
    else
      if one63(__bs9) then
        ____x645 = object(["target", join(["%cat", __a10], __bs9)])
        ____x645.py = join(["%call", "cat", __a10], __bs9)
        return ____x645
      else
        ____x648 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]])
        ____x648.py = join(["%call", "cat", __a10], __bs9)
        return ____x648
end
setenv("cat", {
  _stash: ON,
  ["macro"]: __cat__macro
})
___43__macro = function (...)
  __args13 = unstash([...])
  if none63(__args13) then
    return 0
  else
    if one63(__args13) then
      return hd(__args13)
    else
      return join(["%add"], __args13)
end
setenv("+", {
  _stash: ON,
  ["macro"]: ___43__macro
})
_____macro = function (...)
  __args15 = unstash([...])
  if none63(__args15) then
    return 0
  else
    if one63(__args15) then
      return ["%unm", hd(__args15)]
    else
      return join(["%sub"], __args15)
end
setenv("-", {
  _stash: ON,
  ["macro"]: _____macro
})
___42__macro = function (...)
  __args17 = unstash([...])
  if none63(__args17) then
    return 1
  else
    if one63(__args17) then
      return hd(__args17)
    else
      return join(["%mul"], __args17)
end
setenv("*", {
  _stash: ON,
  ["macro"]: ___42__macro
})
___47__macro = function (...)
  __args19 = unstash([...])
  if none63(__args19) then
    return 1
  else
    if one63(__args19) then
      return hd(__args19)
    else
      return join(["%div"], __args19)
end
setenv("/", {
  _stash: ON,
  ["macro"]: ___47__macro
})
___4747__macro = function (...)
  __args21 = unstash([...])
  if none63(__args21) then
    return 1
  else
    if one63(__args21) then
      return hd(__args21)
    else
      return join(["%idiv"], __args21)
end
setenv("//", {
  _stash: ON,
  ["macro"]: ___4747__macro
})
___37__macro = function (...)
  __args23 = unstash([...])
  if none63(__args23) then
    return 0
  else
    if one63(__args23) then
      return hd(__args23)
    else
      return join(["%mod"], __args23)
end
setenv("%", {
  _stash: ON,
  ["macro"]: ___37__macro
})
___60__macro = function (a, ...)
  ____r218 = unstash([...])
  __a12 = destash33(a, ____r218)
  ____id100 = ____r218
  __bs111 = cut(____id100, 0)
  if none63(__bs111) then
    return ON
  else
    if one63(__bs111) then
      return join(["%lt", __a12], __bs111)
    else
      return ["%and", ["%lt", __a12, hd(__bs111)], join(["<"], __bs111)]
end
setenv("<", {
  _stash: ON,
  ["macro"]: ___60__macro
})
___6061__macro = function (a, ...)
  ____r220 = unstash([...])
  __a14 = destash33(a, ____r220)
  ____id102 = ____r220
  __bs13 = cut(____id102, 0)
  if none63(__bs13) then
    return ON
  else
    if one63(__bs13) then
      return join(["%le", __a14], __bs13)
    else
      return ["%and", ["%le", __a14, hd(__bs13)], join(["<="], __bs13)]
end
setenv("<=", {
  _stash: ON,
  ["macro"]: ___6061__macro
})
___61__macro = function (a, ...)
  ____r222 = unstash([...])
  __a16 = destash33(a, ____r222)
  ____id104 = ____r222
  __bs15 = cut(____id104, 0)
  if none63(__bs15) then
    return ON
  else
    if one63(__bs15) then
      return join(["%eq", __a16], __bs15)
    else
      return ["%and", ["%eq", __a16, hd(__bs15)], join(["="], __bs15)]
end
setenv("=", {
  _stash: ON,
  ["macro"]: ___61__macro
})
___6261__macro = function (a, ...)
  ____r224 = unstash([...])
  __a18 = destash33(a, ____r224)
  ____id106 = ____r224
  __bs17 = cut(____id106, 0)
  if none63(__bs17) then
    return ON
  else
    if one63(__bs17) then
      return join(["%ge", __a18], __bs17)
    else
      return ["%and", ["%ge", __a18, hd(__bs17)], join([">="], __bs17)]
end
setenv(">=", {
  _stash: ON,
  ["macro"]: ___6261__macro
})
___62__macro = function (a, ...)
  ____r226 = unstash([...])
  __a20 = destash33(a, ____r226)
  ____id108 = ____r226
  __bs19 = cut(____id108, 0)
  if none63(__bs19) then
    return ON
  else
    if one63(__bs19) then
      return join(["%gt", __a20], __bs19)
    else
      return ["%and", ["%gt", __a20, hd(__bs19)], join([">"], __bs19)]
end
setenv(">", {
  _stash: ON,
  ["macro"]: ___62__macro
})
__not__macro = function (...)
  __args25 = unstash([...])
  if none63(__args25) then
    return OFF
  else
    if one63(__args25) then
      return join(["%not"], __args25)
    else
      return ["%and", ["%not", hd(__args25)], join(["not"], tl(__args25))]
end
setenv("not", {
  _stash: ON,
  ["macro"]: __not__macro
})
__and__macro = function (a, ...)
  ____r228 = unstash([...])
  __a22 = destash33(a, ____r228)
  ____id110 = ____r228
  __bs211 = cut(____id110, 0)
  if nil63(__a22) then
    return ON
  else
    if none63(__bs211) then
      return __a22
    else
      if one63(__bs211) then
        return join(["%and", __a22], __bs211)
      else
        return ["%and", __a22, join(["and"], __bs211)]
end
setenv("and", {
  _stash: ON,
  ["macro"]: __and__macro
})
__or__macro = function (a, ...)
  ____r230 = unstash([...])
  __a24 = destash33(a, ____r230)
  ____id112 = ____r230
  __bs23 = cut(____id112, 0)
  if nil63(__a24) then
    return OFF
  else
    if none63(__bs23) then
      return __a24
    else
      if one63(__bs23) then
        return join(["%or", __a24], __bs23)
      else
        return ["%or", __a24, join(["or"], __bs23)]
end
setenv("or", {
  _stash: ON,
  ["macro"]: __or__macro
})
__break__macro = function (...)
  __args27 = unstash([...])
  return join(["%break"], __args27)
end
setenv("break", {
  _stash: ON,
  ["macro"]: __break__macro
})
__return__macro = function (...)
  __args29 = unstash([...])
  return join(["%return"], __args29)
end
setenv("return", {
  _stash: ON,
  ["macro"]: __return__macro
})
__while__macro = function (c, ...)
  ____r232 = unstash([...])
  __c3 = destash33(c, ____r232)
  ____id114 = ____r232
  __body61 = cut(____id114, 0)
  return join(["%while", __c3], __body61)
end
setenv("while", {
  _stash: ON,
  ["macro"]: __while__macro
})
__do__macro = function (...)
  __body63 = unstash([...])
  return join(["%do"], __body63)
end
setenv("do", {
  _stash: ON,
  ["macro"]: __do__macro
})
__get__macro = function (...)
  __args31 = unstash([...])
  return join(["%get"], __args31)
end
setenv("get", {
  _stash: ON,
  ["macro"]: __get__macro
})
__idx__macro = function (...)
  __args33 = unstash([...])
  return join(["%idx"], __args33)
end
setenv("idx", {
  _stash: ON,
  ["macro"]: __idx__macro
})
__new__macro = function (...)
  __args35 = unstash([...])
  return join(["%new"], __args35)
end
setenv("new", {
  _stash: ON,
  ["macro"]: __new__macro
})
__typeof__macro = function (...)
  __args37 = unstash([...])
  return join(["%typeof"], __args37)
end
setenv("typeof", {
  _stash: ON,
  ["macro"]: __typeof__macro
})
__error__macro = function (...)
  __args39 = unstash([...])
  return join(["%error"], __args39)
end
setenv("error", {
  _stash: ON,
  ["macro"]: __error__macro
})
__throw__macro = function (...)
  __args41 = unstash([...])
  return join(["%throw"], __args41)
end
setenv("throw", {
  _stash: ON,
  ["macro"]: __throw__macro
})
__raise__macro = function (...)
  __args43 = unstash([...])
  return join(["%throw"], __args43)
end
setenv("raise", {
  _stash: ON,
  ["macro"]: __raise__macro
})
__is__macro = function (...)
  __args45 = unstash([...])
  ____x803 = object(["target", join(["="], __args45)])
  ____x803.py = join(["%is"], __args45)
  return ____x803
end
setenv("is", {
  _stash: ON,
  ["macro"]: __is__macro
})
__in__macro = function (...)
  __args47 = unstash([...])
  return join(["%in"], __args47)
end
setenv("in", {
  _stash: ON,
  ["macro"]: __in__macro
})
__as__macro = function (...)
  __args49 = unstash([...])
  return join(["%as"], __args49)
end
setenv("as", {
  _stash: ON,
  ["macro"]: __as__macro
})
___37expand_case__macro = function (x, ...)
  ____r234 = unstash([...])
  __x821 = destash33(x, ____r234)
  ____id117 = ____r234
  __body65 = cut(____id117, 0)
  __e51 = ""
  if atom63(__x821) then
    __e51 = [__x821]
  else
    __e51 = __x821
  ____id118 = __e51
  __a26 = has(____id118, 0)
  __bs25 = cut(____id118, 1)
  __e52 = ""
  if none63(__bs25) then
    __e52 = [["%literal"]]
  else
    __e52 = __bs25
  return join(["%block", __a26], __e52, __body65)
end
setenv("%expand-case", {
  _stash: ON,
  ["macro"]: ___37expand_case__macro
})
___37cases__macro = function (...)
  __args51 = unstash([...])
  if none63(__args51) then
    return ["do"]
  else
    if one63(__args51) then
      return join(["%expand-case"], hd(__args51))
    else
      __r237 = unique("r")
      return join(["with", __r237, "nil"], map(function (__x841)
        ____id120 = __x841
        __x842 = has(____id120, 0)
        __body67 = cut(____id120, 1)
        return ["%expand-case", __x842, ["%set", __r237, join(["%do"], __body67)]]
      end, almost(__args51)), [join(["%expand-case"], last(__args51))])
end
setenv("%cases", {
  _stash: ON,
  ["macro"]: ___37cases__macro
})
__try__macro = function (x, ...)
  ____r240 = unstash([...])
  __x863 = destash33(x, ____r240)
  ____id125 = ____r240
  __cases1 = cut(____id125, 0)
  __fin1 = ["finally"]
  ____o27 = __cases1
  ____i46 = ""
  for (____i46 in ____o27) {
    __x865 = ____o27[____i46]
    __e53 = ""
    if numeric63(____i46) then
      __e53 = parseInt(____i46)
    else
      __e53 = ____i46
    ____i461 = __e53
    if hd63(__x865, "finally") then
      __fin1 = __x865
  }
  __forms7 = []
  ____x868 = __cases1
  ____i47 = 0
  while ____i47 < _35(____x868) do
    ____id126 = ____x868[____i47]
    __x869 = has(____id126, 0)
    __body71 = cut(____id126, 1)
    if _37eq(__x869, "finally") then
    else
      if _37and(_37eq(__x869, "except"), _37eq(has(__body71, 1), "as")) then
        ____id127 = __body71
        __kind2 = has(____id127, 0)
        ___1 = has(____id127, 1)
        __name19 = has(____id127, 2)
        __body72 = cut(____id127, 3)
        add(__forms7, join([[__x869, ["%as", __kind2, __name19]]], __body72))
      else
        if _37eq(__x869, "except") then
          ____id128 = __body71
          __kind3 = has(____id128, 0)
          __body73 = cut(____id128, 1)
          add(__forms7, join([[__x869, __kind3]], __body73))
        else
          error("Unknown try clause")
    ____i47 = ____i47 + 1
  end
  return join(["%cases", ["try", __x863]], __forms7, [__fin1])
end
setenv("try", {
  _stash: ON,
  ["macro"]: __try__macro
})
__errsafe__macro = function (x, _else)
  if nil63(_else) then
    _else = "nil"
  __ok7 = unique("ok")
  __v33 = unique("v")
  return ["let", [[__ok7, __v33], ["guard", x]], ["if", __ok7, __v33, _else]]
end
setenv("errsafe", {
  _stash: ON,
  ["macro"]: __errsafe__macro
})
__dbg__macro = function ()
  ____x892 = object(["target", ["do"]])
  ____x892.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]]
  return ____x892
end
setenv("dbg", {
  _stash: ON,
  ["macro"]: __dbg__macro
})
__see__macro = function (form)
  __form7 = expand(form)
  print(compile(expand(["%set", "lumen-result", __form7])))
  return __form7
end
setenv("see", {
  _stash: ON,
  ["macro"]: __see__macro
})
reader = require("reader")
compiler = require("compiler")
system = require("system")
disp = function (str)
  system.write(str)
  return system.flush()
end
pp = function (x)
  if _37and(list63(x), _35(x) > 1) then
    __c4 = "  "
    __nl = ""
    print("(")
    ____x900 = x
    ____i48 = 0
    while ____i48 < _35(____x900) do
      __v34 = ____x900[____i48]
      if __nl then
        print("")
      disp(__c4)
      __nl = ON
      __c4 = "  "
      print(str(__v34))
      ____i48 = ____i48 + 1
    end
    return print(")")
  else
    return print(str(x))
end
lines = function (x)
  return split(x, "\n")
end
get_indentation = function (s)
  __r251 = ""
  __i49 = 0
  while __i49 < _35(s) do
    __c5 = char(s, __i49)
    if _37eq(__c5, " ") then
      __r251 = _37cat(__r251, __c5)
    __i49 = __i49 + 1
  end
  return __r251
end
strip_outer = function (s, lh, rh)
  if _37and(string_starts63(s, lh), string_ends63(s, rh)) then
    return clip(clip(s, 0, _35(s) - _35(rh)), _35(lh))
  else
    return s
end
simple_id63 = function (x)
  ____id129 = (function ()
    try:
      return [ON, reader.read_string(x)]
    except:
      return [OFF, e]
  end)()
  ____ok8 = has(____id129, 0)
  ____v35 = has(____id129, 1)
  __e54 = ""
  if ____ok8 then
    __e54 = ____v35
  else
    __e54 = ""
  __r254 = __e54
  if _37eq(__r254, x) then
    return __r254
end
toplevel_print = function (v)
  return pp(v)
end
print_exception = function (v, ex)
  return ""
end
_37self = reader
accessor_literal63 = function (form)
  return _37and(string63(form), _37and(_37not(string_literal63(form)), _37and(_37not(id_literal63(form)), _37and(_37eq(char(form, 0), "."), _37and(_37not(_37eq(clip(form, 0, 2), "..")), _35(form) > 1)))))
end
eval_self_form = function (form)
  if _37eq(form, ".") then
    return "%self"
  else
    if accessor_literal63(form) then
      return ["%self", form]
    else
      if _37not(list63(form)) then
        return form
      else
        if _37and(hd63(form, "%self"), _35(form) > 1) then
          return ["%set", "%self", form[1]]
        else
          if _37or(hd63(form, "import"), _37and(hd63(form, "from"), _37eq(has(form, 2), "import"))) then
            return ["%do", form, ["%set", "%self", last(form)]]
          else
            if accessor_literal63(hd(form)) then
              return join(["%self"], form)
            else
              return form
end
eval_print = function (form)
  __form8 = eval_self_form(form)
  ____id130 = (function ()
    try:
      return [ON, compiler.eval(__form8)]
    except:
      return [OFF, e]
  end)()
  __ok9 = has(____id130, 0)
  __v36 = has(____id130, 1)
  __ex = has(____id130, 2)
  if _37not(__ok9) then
    return print_exception(__v36, __ex)
  else
    if is63(__v36) then
      return toplevel_print(__v36)
end
read_toplevel = function (str, more)
  __s3 = reader.stream(str, more)
  ____id131 = (function ()
    try:
      return [ON, reader.read_all(__s3)]
    except:
      return [OFF, e]
  end)()
  ____ok10 = has(____id131, 0)
  ____v37 = has(____id131, 1)
  __e55 = ""
  if ____ok10 then
    __e55 = ____v37
  else
    __e55 = ""
  __x912 = __e55
  if _37eq(__x912, more) then
    return more
  else
    if nil63(__x912) then
      return __x912
    else
      if one63(__x912) then
        return hd(__x912)
      else
        return __x912
end
rep = function (str)
  __v38 = eval(read_toplevel(str))
  if is63(__v38) then
    return toplevel_print(__v38)
end
repl = function ()
  o = {buf: ""}
  reset = function ()
    o.buf = ""
    return disp("> ")
  end
  ctrl_c = function ()
    print("")
    reset()
    return ctrl_c
  end
  rep1 = function (s)
    o.buf = _37cat(o.buf, s)
    __more = []
    __form9 = read_toplevel(o.buf, __more)
    if _37not(_37eq(__form9, __more)) then
      eval_print(__form9)
      return reset()
  end
  reset()
  while ON do
    __s4 = system.read_line(ctrl_c)
    if _37not(_37eq(__s4, ctrl_c)) then
      if is63(__s4) then
        rep1(_37cat(__s4, "\n"))
      else
        break
  end
end
read_file = function (path)
  return system.read_file(path)
end
read_from_file = function (path)
  __s5 = reader.stream(read_file(path))
  return reader.read_all(__s5)
end
expand_file = function (path)
  __body74 = read_from_file(path)
  return compiler.expand(join(["do"], __body74))
end
compile_file = function (path)
  __form10 = expand_file(path)
  return compiler.compile(__form10, {
    _stash: ON,
    stmt: ON
  })
end
load = function (path)
  __previous = has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value")
  __previous_indent = has(setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }), "value")
  setenv("target", {
    _stash: ON,
    toplevel: ON
  }).value = "cmake"
  setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }).value = 0
  __code = compile_file(path)
  setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }).value = __previous_indent
  setenv("target", {
    _stash: ON,
    toplevel: ON
  }).value = __previous
  return compiler.run(__code)
end
script_file63 = function (path)
  return _37not(_37or(_37eq("-", char(path, 0)), _37or(_37eq(".py", clip(path, _35(path) - 3)), _37or(_37eq(".js", clip(path, _35(path) - 3)), _37eq(".lua", clip(path, _35(path) - 4))))))
end
run_file = function (path)
  if script_file63(path) then
    return load(path)
  else
    return compiler.run(system.read_file(path))
end
usage = function ()
  print("usage: lumen [<file> <arguments> | options <object files>]")
  print(" <file>\t\tProgram read from script file")
  print(" <arguments>\tPassed to program in system.argv")
  print(" <object files>\tLoaded before compiling <input>")
  print("options:")
  print(" -c <input>\tCompile input file")
  print(" -o <output>\tOutput file")
  print(" -t <target>\tTarget language (default: lua)")
  return print(" -e <expr>\tExpression to evaluate")
end
main = function (args)
  __arg = hd(args)
  if _37and(__arg, script_file63(__arg)) then
    return load(__arg)
  else
    if _37or(_37eq(__arg, "-h"), _37eq(__arg, "--help")) then
      return usage()
    else
      __pre = []
      __input = ""
      __output = ""
      __target1 = ""
      __expr10 = ""
      __argv = system.argv
      __i50 = 0
      while __i50 < _35(__argv) do
        __a27 = __argv[__i50]
        if _37or(_37eq(__a27, "-c"), _37or(_37eq(__a27, "-o"), _37or(_37eq(__a27, "-t"), _37eq(__a27, "-e")))) then
          if _37eq(__i50, edge(__argv)) then
            print(_37cat("missing argument for ", __a27))
          else
            __i50 = __i50 + 1
            __val2 = __argv[__i50]
            if _37eq(__a27, "-c") then
              __input = __val2
            else
              if _37eq(__a27, "-o") then
                __output = __val2
              else
                if _37eq(__a27, "-t") then
                  __target1 = __val2
                else
                  if _37eq(__a27, "-e") then
                    __expr10 = __val2
        else
          if _37not(_37eq("-", char(__a27, 0))) then
            add(__pre, __a27)
        __i50 = __i50 + 1
      end
      ____x917 = __pre
      ____i51 = 0
      while ____i51 < _35(____x917) do
        __file = ____x917[____i51]
        run_file(__file)
        ____i51 = ____i51 + 1
      end
      if nil63(__input) then
        if __expr10 then
          return rep(__expr10)
        else
          return repl()
      else
        if __target1 then
          setenv("target", {
            _stash: ON,
            toplevel: ON
          }).value = __target1
        __code1 = compile_file(__input)
        if _37or(nil63(__output), _37eq(__output, "-")) then
          return print(__code1)
        else
          return system.write_file(__output, __code1)
end
main63 = function ()
end
if main63() then
  main(system.argv)
