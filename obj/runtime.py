environment = [{}]
target = "py"
nil63 = function (x)
end
is63 = function (x)
  return _not(nil63(x))
end
no = function (x)
  return _or(nil63(x), _61(x, false))
end
yes = function (x)
  return _not(no(x))
end
either = function (x, y)
  if is63(x) then
    return x
  else
    return y

end
has63 = function (l, k)
end
array63 = function (x)
end
array = function (x)
  if array63(x) then
    return x
  else
    local __l = []
    local ____o = x
    local __k = undefined
    for (__k in ____o) {
      local __v = ____o[__k]
      local __e
      if numeric63(__k) then
        __e = parseInt(__k)
      else
        __e = __k

      local __k1 = __e
      if number63(__k1) then
        __l[__k1] = __v

    }
    return __l

end
object = function (x)
  if array63(x) then
    local __l1 = {}
    local ____o1 = x
    local __k2 = undefined
    for (__k2 in ____o1) {
      local __v1 = ____o1[__k2]
      local __e1
      if numeric63(__k2) then
        __e1 = parseInt(__k2)
      else
        __e1 = __k2

      local __k3 = __e1
      __l1[__k3] = __v1
    }
    return __l1
  else
    return x

end
length = function (x)
  local __n2 = -1
  local ____o2 = x
  local __k4 = undefined
  for (__k4 in ____o2) {
    local __v2 = ____o2[__k4]
    local __e2
    if numeric63(__k4) then
      __e2 = parseInt(__k4)
    else
      __e2 = __k4

    local __k5 = __e2
    if number63(__k5) then
      if __k5 > __n2 then
        __n2 = __k5


  }
  __n2 = __n2 + 1
  return __n2
end
_35 = function (x)
end
none63 = function (x)
  return _61(_35(x), 0)
end
some63 = function (x)
  return _35(x) > 0
end
one63 = function (x)
  return _61(_35(x), 1)
end
two63 = function (x)
  return _61(_35(x), 2)
end
hd = function (l)
  return l[0]
end
string63 = function (x)
  return _61(type(x), "string")
end
number63 = function (x)
  return _61(type(x), "number")
end
boolean63 = function (x)
  return _61(type(x), "boolean")
end
function63 = function (x)
  return _61(type(x), "function")
end
obj63 = function (x)
  return _and(is63(x), _61(type(x)))
end
atom63 = function (x)
  return _or(nil63(x), string63(x))
end
nan = 0 / 0
inf = 1 / 0
_inf = - inf
nan63 = function (n)
  return _not(_61(n, n))
end
inf63 = function (n)
  return _or(_61(n, inf), _61(n, _inf))
end
clip = function (s, from, upto)
end
dupe = function (x)
end
cut = function (x, from, upto)
  local __l2 = dupe(x)
  local __j = 0
  local __e3
  if _or(nil63(from), from < 0) then
    __e3 = 0
  else
    __e3 = from

  local __i3 = __e3
  local __n4 = _35(x)
  local __e4
  if _or(nil63(upto), upto > __n4) then
    __e4 = __n4
  else
    __e4 = upto

  local __upto = __e4
  while __i3 < __upto do
    __l2[__j] = x[__i3]
    __i3 = __i3 + 1
    __j = __j + 1
  end
  local ____o3 = x
  local __k6 = undefined
  for (__k6 in ____o3) {
    local __v3 = ____o3[__k6]
    local __e5
    if numeric63(__k6) then
      __e5 = parseInt(__k6)
    else
      __e5 = __k6

    local __k7 = __e5
    if _not(number63(__k7)) then
      __l2[__k7] = __v3

  }
  return __l2
end
keys = function (x)
  local __t = dupe(x)
  local ____o4 = x
  local __k8 = undefined
  for (__k8 in ____o4) {
    local __v4 = ____o4[__k8]
    local __e6
    if numeric63(__k8) then
      __e6 = parseInt(__k8)
    else
      __e6 = __k8

    local __k9 = __e6
    if _not(number63(__k9)) then
      __t[__k9] = __v4

  }
  return __t
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
  return _and(string63(x), _61(char(x, 0), "\""))
end
id_literal63 = function (x)
  return _and(string63(x), _61(char(x, 0), "|"))
end
add = function (l, x)
end
drop = function (l)
end
last = function (l)
  return l[edge(l)]
end
almost = function (l)
  return cut(l, 0, edge(l))
end
reverse = function (l)
  local __l11 = keys(l)
  local __i6 = edge(l)
  while __i6 >= 0 do
    add(__l11, l[__i6])
    __i6 = __i6 - 1
  end
  return __l11
end
reduce = function (f, x)
  if none63(x) then
    return undefined
  else
    if one63(x) then
      return hd(x)
    else
      return f(hd(x), reduce(f, tl(x)))


end
join = function ()
  local __ls = unstash([...])
  local __r41 = []
  local ____x2 = __ls
  local ____i7 = 0
  while ____i7 < _35(____x2) do
    local __l3 = ____x2[____i7]
    if __l3 then
      local __n7 = _35(__r41)
      local ____o5 = __l3
      local __k10 = undefined
      for (__k10 in ____o5) {
        local __v5 = ____o5[__k10]
        local __e7
        if numeric63(__k10) then
          __e7 = parseInt(__k10)
        else
          __e7 = __k10

        local __k11 = __e7
        if number63(__k11) then
          __k11 = __k11 + __n7
        else
          __l3 = object(__l3)

        __r41[__k11] = __v5
      }

    ____i7 = ____i7 + 1
  end
  return __r41
end
find = function (f, t)
  local ____o6 = t
  local ____i9 = undefined
  for (____i9 in ____o6) {
    local __x3 = ____o6[____i9]
    local __e8
    if numeric63(____i9) then
      __e8 = parseInt(____i9)
    else
      __e8 = ____i9

    local ____i91 = __e8
    local __y = f(__x3)
    if __y then
      return __y

  }
end
first = function (f, l)
  local ____x4 = l
  local ____i10 = 0
  while ____i10 < _35(____x4) do
    local __x5 = ____x4[____i10]
    local __y1 = f(__x5)
    if __y1 then
      return __y1

    ____i10 = ____i10 + 1
  end
end
in63 = function (x, t)
  return find(function (y)
    return _61(x, y)
  end, t)
end
pair = function (l)
  local __l12 = dupe(l)
  local __i11 = 0
  while __i11 < _35(l) do
    add(__l12, [l[__i11], l[__i11 + 1]])
    __i11 = __i11 + 1
    __i11 = __i11 + 1
  end
  return __l12
end
sort = function (l, f)
end
map = function (f, x)
  local __t1 = dupe(x)
  local ____x7 = x
  local ____i12 = 0
  while ____i12 < _35(____x7) do
    local __v6 = ____x7[____i12]
    local __y2 = f(__v6)
    if is63(__y2) then
      add(__t1, __y2)

    ____i12 = ____i12 + 1
  end
  local ____o7 = x
  local __k12 = undefined
  for (__k12 in ____o7) {
    local __v7 = ____o7[__k12]
    local __e9
    if numeric63(__k12) then
      __e9 = parseInt(__k12)
    else
      __e9 = __k12

    local __k13 = __e9
    if _not(number63(__k13)) then
      local __y3 = f(__v7)
      if is63(__y3) then
        __t1[__k13] = __y3


  }
  return __t1
end
keep = function (f, x)
  return map(function (v)
    if yes(f(v)) then
      return v

  end, x)
end
keys63 = function (t)
  local ____o8 = t
  local __k14 = undefined
  for (__k14 in ____o8) {
    local __v8 = ____o8[__k14]
    local __e10
    if numeric63(__k14) then
      __e10 = parseInt(__k14)
    else
      __e10 = __k14

    local __k15 = __e10
    if _not(number63(__k15)) then
      return true

  }
  return false
end
empty63 = function (t)
  local ____o9 = t
  local ____i15 = undefined
  for (____i15 in ____o9) {
    local __x8 = ____o9[____i15]
    local __e11
    if numeric63(____i15) then
      __e11 = parseInt(____i15)
    else
      __e11 = ____i15

    local ____i151 = __e11
    return false
  }
  return true
end
stash = function (args)
  if keys63(args) then
    local __p = {}
    local ____o10 = args
    local __k16 = undefined
    for (__k16 in ____o10) {
      local __v9 = ____o10[__k16]
      local __e12
      if numeric63(__k16) then
        __e12 = parseInt(__k16)
      else
        __e12 = __k16

      local __k17 = __e12
      if _not(number63(__k17)) then
        __p[__k17] = __v9

    }
    __p._stash = true
    add(args, __p)

  if array63(args) then
    return args
  else
    return array(args)

end
unstash = function (args)
  if none63(args) then
    return {}
  else
    local __l4 = last(args)
    if _and(obj63(__l4), __l4._stash) then
      local __args1 = object(almost(args))
      local ____o11 = __l4
      local __k18 = undefined
      for (__k18 in ____o11) {
        local __v10 = ____o11[__k18]
        local __e13
        if numeric63(__k18) then
          __e13 = parseInt(__k18)
        else
          __e13 = __k18

        local __k19 = __e13
        if _not(_61(__k19, "_stash")) then
          __args1[__k19] = __v10

      }
      return __args1
    else
      return args


end
destash33 = function (l, args1)
  if _and(obj63(l), l._stash) then
    local ____o12 = l
    local __k20 = undefined
    for (__k20 in ____o12) {
      local __v11 = ____o12[__k20]
      local __e14
      if numeric63(__k20) then
        __e14 = parseInt(__k20)
      else
        __e14 = __k20

      local __k21 = __e14
      if _not(_61(__k21, "_stash")) then
        args1[__k21] = __v11

    }
  else
    return l

end
search = function (s, pattern, start)
end
split = function (s, sep)
  if _or(_61(s, ""), _61(sep, "")) then
    return []
  else
    local __l5 = []
    local __n16 = _35(sep)
    while true do
      local __i19 = search(s, sep)
      if nil63(__i19) then
        break
      else
        add(__l5, clip(s, 0, __i19))
        s = clip(s, __i19 + __n16)

    end
    add(__l5, s)
    return __l5

end
cat = function ()
  local __xs = unstash([...])
  return either(reduce(function (a, b)
    return cat(a, b)
  end, __xs), "")
end
_43 = function ()
  local __xs1 = unstash([...])
  return either(reduce(function (a, b)
    return a + b
  end, __xs1), 0)
end
_45 = function ()
  local __xs2 = unstash([...])
  return either(reduce(function (b, a)
    return a - b
  end, reverse(__xs2)), 0)
end
_42 = function ()
  local __xs3 = unstash([...])
  return either(reduce(function (a, b)
    return a * b
  end, __xs3), 1)
end
_47 = function ()
  local __xs4 = unstash([...])
  return either(reduce(function (b, a)
    return a / b
  end, reverse(__xs4)), 1)
end
_37 = function ()
  local __xs5 = unstash([...])
  return either(reduce(function (b, a)
    return a % b
  end, reverse(__xs5)), 0)
end
local pairwise = function (f, xs)
  local __i20 = 0
  while __i20 < edge(xs) do
    local __a = xs[__i20]
    local __b = xs[__i20 + 1]
    if _not(f(__a, __b)) then
      return false

    __i20 = __i20 + 1
  end
  return true
end
_60 = function ()
  local __xs6 = unstash([...])
  return pairwise(function (a, b)
    return a < b
  end, __xs6)
end
_62 = function ()
  local __xs7 = unstash([...])
  return pairwise(function (a, b)
    return a > b
  end, __xs7)
end
_61 = function ()
  local __xs8 = unstash([...])
  return pairwise(function (a, b)
    return _61(a, b)
  end, __xs8)
end
_6061 = function ()
  local __xs9 = unstash([...])
  return pairwise(function (a, b)
    return a <= b
  end, __xs9)
end
_6261 = function ()
  local __xs10 = unstash([...])
  return pairwise(function (a, b)
    return a >= b
  end, __xs10)
end
number = function (s)
end
number_code63 = function (n)
  return _and(n > 47, n < 58)
end
numeric63 = function (s)
  local __n17 = _35(s)
  local __i21 = 0
  while __i21 < __n17 do
    if _not(number_code63(code(s, __i21))) then
      return false

    __i21 = __i21 + 1
  end
  return some63(s)
end
escape = function (s)
  local __s1 = "\""
  local __i22 = 0
  while __i22 < _35(s) do
    local __c = char(s, __i22)
    local __e15
    if _61(__c, "\n") then
      __e15 = "\\n"
    else
      local __e16
      if _61(__c, "\r") then
        __e16 = "\\r"
      else
        local __e17
        if _61(__c, "\"") then
          __e17 = "\\\""
        else
          local __e18
          if _61(__c, "\\") then
            __e18 = "\\\\"
          else
            __e18 = __c

          __e17 = __e18

        __e16 = __e17

      __e15 = __e16

    local __c1 = __e15
    __s1 = cat(__s1, __c1)
    __i22 = __i22 + 1
  end
  return cat(__s1, "\"")
end
str = function (x, stack)
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
                      local __s = "("
                      local __sp = ""
                      local __xs11 = []
                      local __ks = []
                      local __l6 = _or(stack, [])
                      add(__l6, x)
                      local ____o13 = x
                      local __k22 = undefined
                      for (__k22 in ____o13) {
                        local __v12 = ____o13[__k22]
                        local __e19
                        if numeric63(__k22) then
                          __e19 = parseInt(__k22)
                        else
                          __e19 = __k22

                        local __k23 = __e19
                        if number63(__k23) then
                          __xs11[__k23] = str(__v12, __l6)
                        else
                          add(__ks, cat(__k23, ":"))
                          add(__ks, str(__v12, __l6))

                      }
                      drop(__l6)
                      local ____o14 = join(__xs11, __ks)
                      local ____i24 = undefined
                      for (____i24 in ____o14) {
                        local __v13 = ____o14[____i24]
                        local __e20
                        if numeric63(____i24) then
                          __e20 = parseInt(____i24)
                        else
                          __e20 = ____i24

                        local ____i241 = __e20
                        __s = cat(__s, __sp, __v13)
                        __sp = " "
                      }
                      return cat(__s, ")")










end
apply = function (f, args)
  local __args = stash(args)
end
call = function (f)
  local ____r76 = unstash([...])
  local __f = destash33(f, ____r76)
  local ____id = ____r76
  local __args11 = cut(____id, 0)
  return apply(__f, __args11)
end
setenv = function (k)
  local ____r77 = unstash([...])
  local __k24 = destash33(k, ____r77)
  local ____id1 = ____r77
  local __keys = cut(____id1, 0)
  if string63(__k24) then
    local __e21
    if __keys.toplevel then
      __e21 = hd(environment)
    else
      __e21 = last(environment)

    local __frame = __e21
    local __entry = _or(__frame[__k24], {})
    local ____o15 = __keys
    local __k25 = undefined
    for (__k25 in ____o15) {
      local __v14 = ____o15[__k25]
      local __e22
      if numeric63(__k25) then
        __e22 = parseInt(__k25)
      else
        __e22 = __k25

      local __k26 = __e22
      __entry[__k26] = __v14
    }
    __frame[__k24] = __entry
    return __frame[__k24]

end
local math
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
