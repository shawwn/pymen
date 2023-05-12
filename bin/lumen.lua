environment = {{}}
function nil63(x)
  return x == nil
end
function is63(x)
  return not nil63(x)
end
function no(x)
  return nil63(x) or x == false
end
function yes(x)
  return not no(x)
end
function either(x, y)
  if is63(x) then
    return x
  else
    return y
  end
end
function has63(l, k)
  return is63(l[k])
end
function has(l, k, _else)
  if has63(l, k) then
    return l[k]
  else
    return _else
  end
end
function array63(x)
  return type(x) == "table"
end
function array(x)
  if array63(x) then
    return x
  else
    local __l = {}
    local ____o = x
    local __k = nil
    for __k in next, ____o do
      local __v = ____o[__k]
      if number63(__k) then
        __l[__k] = __v
      end
    end
    return __l
  end
end
function object(x)
  if array63(x) then
    local __l1 = {}
    local ____o1 = x
    local __k1 = nil
    for __k1 in next, ____o1 do
      local __v1 = ____o1[__k1]
      __l1[__k1] = __v1
    end
    return __l1
  else
    return x
  end
end
function length(x, upto)
  local __n2 = -1
  local __upto = either(upto, inf)
  local ____o2 = x
  local __k2 = nil
  for __k2 in next, ____o2 do
    local __v2 = ____o2[__k2]
    if number63(__k2) then
      __k2 = __k2 - 1
      if __k2 > __n2 then
        __n2 = __k2
        if __n2 >= __upto then
          break
        end
      end
    end
  end
  __n2 = __n2 + 1
  return __n2
end
function _35(x, upto)
  return #x
end
function none63(x)
  return _35(x, 0) == 0
end
function some63(x)
  return _35(x, 0) > 0
end
function one63(x)
  return _35(x, 1) == 1
end
function two63(x)
  return _35(x, 2) == 2
end
function hd(l)
  return l[1]
end
function string63(x)
  return type(x) == "string"
end
function number63(x)
  return type(x) == "number"
end
function boolean63(x)
  return type(x) == "boolean"
end
function function63(x)
  return type(x) == "function"
end
function obj63(x)
  return is63(x) and type(x) == "table"
end
function list63(x)
  return obj63(x) or array63(x)
end
function atom63(x)
  return nil63(x) or (string63(x) or (number63(x) or boolean63(x)))
end
function hd63(l, x)
  if function63(x) then
    return x(hd(l))
  else
    if nil63(x) then
      return some63(l)
    else
      return x == hd(l)
    end
  end
end
nan = 0 / 0
inf = 1 / 0
_inf = - inf
function nan63(n)
  return not( n == n)
end
function inf63(n)
  return n == inf or n == _inf
end
function clip(s, from, upto)
  return string.sub(s, from + 1, upto)
end
function dupe(x)
  return {}
end
function cut(x, from, upto)
  local __l2 = dupe(x)
  local __j = 0
  local __e12 = nil
  if nil63(from) or from < 0 then
    __e12 = 0
  else
    __e12 = from
  end
  local __i3 = __e12
  local __n4 = _35(x)
  local __e13 = nil
  if nil63(upto) or upto > __n4 then
    __e13 = __n4
  else
    __e13 = upto
  end
  local __upto1 = __e13
  while __i3 < __upto1 do
    __l2[__j + 1] = x[__i3 + 1]
    __i3 = __i3 + 1
    __j = __j + 1
  end
  local ____o3 = x
  local __k3 = nil
  for __k3 in next, ____o3 do
    local __v3 = ____o3[__k3]
    if not number63(__k3) then
      __l2[__k3] = __v3
    end
  end
  return __l2
end
function props(x)
  local __t = {}
  local ____o4 = x
  local __k4 = nil
  for __k4 in next, ____o4 do
    local __v4 = ____o4[__k4]
    if not number63(__k4) then
      __t[__k4] = __v4
    end
  end
  return __t
end
function values(x)
  if array63(x) then
    return x
  else
    local __t1 = {}
    local ____o5 = x
    local __k5 = nil
    for __k5 in next, ____o5 do
      local __v5 = ____o5[__k5]
      if number63(__k5) then
        __t1[__k5] = __v5
      end
    end
    return array(__t1)
  end
end
function edge(x)
  return _35(x) - 1
end
function inner(x)
  return clip(x, 1, edge(x))
end
function tl(l)
  return cut(l, 1)
end
function char(s, n)
  return clip(s, n, n + 1)
end
function code(s, n)
  local __e14 = nil
  if n then
    __e14 = n + 1
  end
  return string.byte(s, __e14)
end
function string_literal63(x)
  return string63(x) and char(x, 0) == "\""
end
function id_literal63(x)
  return string63(x) and char(x, 0) == "|"
end
function add(l, x)
  return table.insert(l, x)
end
function drop(l)
  return table.remove(l)
end
function last(l)
  return l[edge(l) + 1]
end
function almost(l)
  return cut(l, 0, edge(l))
end
function reverse(l)
  local __l11 = props(l)
  local __i7 = edge(l)
  while __i7 >= 0 do
    add(__l11, l[__i7 + 1])
    __i7 = __i7 - 1
  end
  return __l11
end
function reduce(f, x, _else)
  if none63(x) then
    return _else
  else
    if one63(x) then
      return hd(x)
    else
      return f(hd(x), reduce(f, tl(x)))
    end
  end
end
function join(...)
  local __ls = unstash({...})
  local __r45 = {}
  local ____x3 = __ls
  local ____i8 = 0
  while ____i8 < _35(____x3) do
    local __l3 = ____x3[____i8 + 1]
    if __l3 then
      local __n8 = _35(__r45)
      local ____o6 = __l3
      local __k6 = nil
      for __k6 in next, ____o6 do
        local __v6 = ____o6[__k6]
        if number63(__k6) then
          __k6 = __k6 + __n8
        else
          __l3 = object(__l3)
        end
        __r45[__k6] = __v6
      end
    end
    ____i8 = ____i8 + 1
  end
  return __r45
end
function find(f, t)
  local ____o7 = t
  local ____i10 = nil
  for ____i10 in next, ____o7 do
    local __x4 = ____o7[____i10]
    local __y = f(__x4)
    if __y then
      return __y
    end
  end
end
function first(f, l)
  local ____x5 = l
  local ____i11 = 0
  while ____i11 < _35(____x5) do
    local __x6 = ____x5[____i11 + 1]
    local __y1 = f(__x6)
    if __y1 then
      return __y1
    end
    ____i11 = ____i11 + 1
  end
end
function in63(x, t)
  return find(function (y)
    return x == y
  end, t)
end
function pair(l)
  local __l12 = dupe(l)
  local __n11 = _35(l)
  local __i12 = 0
  while __i12 < __n11 do
    local __a = l[__i12 + 1]
    local __b = l[__i12 + 1 + 1]
    add(__l12, {__a, __b})
    __i12 = __i12 + 1
    __i12 = __i12 + 1
  end
  return __l12
end
local function sortfunc(f)
  if f then
    local __f = function (a, b)
      if f(a, b) then
        return -1
      else
        return 1
      end
    end
    return __f
  end
end
function sort(l, f)
  table.sort(l, f)
  return l
end
function map(f, x)
  local __t2 = dupe(x)
  local ____x8 = x
  local ____i13 = 0
  while ____i13 < _35(____x8) do
    local __v7 = ____x8[____i13 + 1]
    local __y2 = f(__v7)
    if is63(__y2) then
      add(__t2, __y2)
    end
    ____i13 = ____i13 + 1
  end
  local ____o8 = x
  local __k7 = nil
  for __k7 in next, ____o8 do
    local __v8 = ____o8[__k7]
    if not number63(__k7) then
      local __y3 = f(__v8)
      if is63(__y3) then
        __t2[__k7] = __y3
      end
    end
  end
  return __t2
end
function mapcat(f, x, sep)
  local __r56 = ""
  local __c = ""
  local ____x9 = x
  local ____i15 = 0
  while ____i15 < _35(____x9) do
    local __v9 = ____x9[____i15 + 1]
    local __e15 = nil
    if f then
      __e15 = f(__v9)
    else
      __e15 = __v9
    end
    local __y4 = __e15
    if is63(__y4) then
      __r56 = __r56 .. (__c .. __y4)
      __c = sep or ""
    end
    ____i15 = ____i15 + 1
  end
  return __r56
end
function concat(sep, x, f)
  return mapcat(f, x, sep)
end
function keep(f, x)
  return map(function (v)
    if yes(f(v)) then
      return v
    end
  end, x)
end
function props63(t)
  local ____o9 = t
  local __k8 = nil
  for __k8 in next, ____o9 do
    local __v10 = ____o9[__k8]
    if not number63(__k8) then
      return true
    end
  end
  return false
end
function empty63(t)
  local ____o10 = t
  local ____i17 = nil
  for ____i17 in next, ____o10 do
    local __x10 = ____o10[____i17]
    return false
  end
  return true
end
function stash(args)
  if props63(args) then
    local __p = {}
    local ____o11 = args
    local __k9 = nil
    for __k9 in next, ____o11 do
      local __v11 = ____o11[__k9]
      if not number63(__k9) then
        __p[__k9] = __v11
      end
    end
    __p._stash = true
    add(args, __p)
  end
  if array63(args) then
    return args
  else
    return array(args)
  end
end
function unstash(args, params)
  if none63(args) then
    return params or {}
  else
    local __l4 = last(args)
    if obj63(__l4) and has63(__l4, "_stash") then
      local __args1 = object(almost(args))
      local ____o12 = __l4
      local __k10 = nil
      for __k10 in next, ____o12 do
        local __v12 = ____o12[__k10]
        if not( __k10 == "_stash") then
          __args1[__k10] = __v12
        end
      end
      if params then
        local ____o13 = params
        local __k11 = nil
        for __k11 in next, ____o13 do
          local __v13 = ____o13[__k11]
          __args1[__k11] = __v13
        end
      end
      return __args1
    else
      if params then
        local __args11 = object(args)
        local ____o14 = params
        local __k12 = nil
        for __k12 in next, ____o14 do
          local __v14 = ____o14[__k12]
          __args11[__k12] = __v14
        end
        return __args11
      else
        return args
      end
    end
  end
end
function destash33(l, args1)
  if obj63(l) and has63(l, "_stash") then
    local ____o15 = l
    local __k13 = nil
    for __k13 in next, ____o15 do
      local __v15 = ____o15[__k13]
      if not( __k13 == "_stash") then
        args1[__k13] = __v15
      end
    end
  else
    return l
  end
end
function search(s, pattern, start)
  local __e16 = nil
  if start then
    __e16 = start + 1
  end
  local __start = __e16
  local __i23 = string.find(s, pattern, __start, true)
  return __i23 and __i23 - 1
end
function string_ends63(str, x, pos)
  local __e17 = nil
  if is63(pos) then
    __e17 = clip(str, pos)
  else
    __e17 = str
  end
  local __str = __e17
  if _35(x) > _35(__str) then
    return false
  else
    return x == clip(__str, _35(__str) - _35(x))
  end
end
function string_starts63(str, x, pos)
  local __e18 = nil
  if is63(pos) then
    __e18 = clip(str, pos)
  else
    __e18 = str
  end
  local __str1 = __e18
  if _35(x) > _35(__str1) then
    return false
  else
    return x == clip(__str1, 0, _35(x))
  end
end
function split(s, sep)
  if s == "" or sep == "" then
    return {}
  else
    local __l5 = {}
    local __n20 = _35(sep)
    while true do
      local __i24 = search(s, sep)
      if nil63(__i24) then
        break
      else
        add(__l5, clip(s, 0, __i24))
        s = clip(s, __i24 + __n20)
      end
    end
    add(__l5, s)
    return __l5
  end
end
function tostr(x)
  if string63(x) then
    return x
  else
    if nil63(x) then
      return ""
    else
      return str(x)
    end
  end
end
local function cat2(a, b)
  return a .. b
end
function cat(...)
  local __xs = unstash({...})
  return reduce(function (a, b)
    return cat2(a, b)
  end, __xs, "")
end
function _43(...)
  local __xs1 = unstash({...})
  return reduce(function (a, b)
    return a + b
  end, __xs1, 0)
end
function _45(...)
  local __xs2 = unstash({...})
  return reduce(function (b, a)
    return a - b
  end, reverse(__xs2), 0)
end
function _42(...)
  local __xs3 = unstash({...})
  return reduce(function (a, b)
    return a * b
  end, __xs3, 1)
end
function _47(...)
  local __xs4 = unstash({...})
  return reduce(function (b, a)
    return a / b
  end, reverse(__xs4), 1)
end
function _37(...)
  local __xs5 = unstash({...})
  return reduce(function (b, a)
    return a % b
  end, reverse(__xs5), 1)
end
local function pairwise(f, xs)
  local __i25 = 0
  while __i25 < edge(xs) do
    local __a1 = xs[__i25 + 1]
    local __b1 = xs[__i25 + 1 + 1]
    if not f(__a1, __b1) then
      return false
    end
    __i25 = __i25 + 1
  end
  return true
end
function _60(...)
  local __xs6 = unstash({...})
  return pairwise(function (a, b)
    return a < b
  end, __xs6)
end
function _62(...)
  local __xs7 = unstash({...})
  return pairwise(function (a, b)
    return a > b
  end, __xs7)
end
function _61(...)
  local __xs8 = unstash({...})
  return pairwise(function (a, b)
    return a == b
  end, __xs8)
end
function _6061(...)
  local __xs9 = unstash({...})
  return pairwise(function (a, b)
    return a <= b
  end, __xs9)
end
function _6261(...)
  local __xs10 = unstash({...})
  return pairwise(function (a, b)
    return a >= b
  end, __xs10)
end
function number_code63(n)
  return n > 47 and n < 58
end
function number(s)
  return tonumber(s)
end
function numeric63(s)
  local __n21 = _35(s)
  local __i26 = 0
  while __i26 < __n21 do
    if not number_code63(code(s, __i26)) then
      return false
    end
    __i26 = __i26 + 1
  end
  return some63(s)
end
function uppercase(x)
  return string.upper(x)
end
function lowercase(x)
  return string.lower(x)
end
function dashcase(x)
  return mapcat(lowercase, split(x, "_"), "-")
end
function screamcase(x)
  return mapcat(uppercase, split(x, "-"), "_")
end
function escape(s)
  if nil63(search(s, "\n")) and (nil63(search(s, "\r")) and (nil63(search(s, "\"")) and nil63(search(s, "\\")))) then
    return "\"" .. (s .. "\"")
  else
    local __s1 = "\""
    local __i27 = 0
    while __i27 < _35(s) do
      local __c1 = char(s, __i27)
      local __e19 = nil
      if __c1 == "\n" then
        __e19 = "\\n"
      else
        local __e20 = nil
        if __c1 == "\r" then
          __e20 = "\\r"
        else
          local __e21 = nil
          if __c1 == "\"" then
            __e21 = "\\\""
          else
            local __e22 = nil
            if __c1 == "\\" then
              __e22 = "\\\\"
            else
              __e22 = __c1
            end
            __e21 = __e22
          end
          __e20 = __e21
        end
        __e19 = __e20
      end
      local __c11 = __e19
      __s1 = __s1 .. __c11
      __i27 = __i27 + 1
    end
    return __s1 .. "\""
  end
end
function str(x, repr, stack)
  if nil63(x) then
    return "nil"
  else
    if nan63(x) then
      return "nan"
    else
      if x == inf then
        return "inf"
      else
        if x == _inf then
          return "-inf"
        else
          if boolean63(x) then
            if x then
              return "true"
            else
              return "false"
            end
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
                    if stack and in63(x, stack) then
                      return "circular"
                    else
                      if not( type(x) == "table") then
                        if repr then
                          return repr(x)
                        else
                          return "|" .. (tostring(x) .. "|")
                        end
                      else
                        local __s = "("
                        local __sp = ""
                        local __xs11 = {}
                        local __ks = {}
                        local __l6 = stack or {}
                        add(__l6, x)
                        local ____o16 = x
                        local __k14 = nil
                        for __k14 in next, ____o16 do
                          local __v16 = ____o16[__k14]
                          if number63(__k14) then
                            __xs11[__k14] = str(__v16, repr, __l6)
                          else
                            if not string63(__k14) then
                              __k14 = str(__k14, repr, __l6)
                            end
                            if function63(__v16) then
                              add(__ks, {"." .. __k14, ""})
                            else
                              add(__ks, {__k14 .. ": ", str(__v16, repr, __l6)})
                            end
                          end
                        end
                        sort(__ks, function (__x24, __x25)
                          local ____id = __x24
                          local __a2 = has(____id, 1)
                          local ____id1 = __x25
                          local __b2 = has(____id1, 1)
                          return __a2 < __b2
                        end)
                        drop(__l6)
                        local ____x26 = __xs11
                        local ____i29 = 0
                        while ____i29 < _35(____x26) do
                          local __v17 = ____x26[____i29 + 1]
                          __s = __s .. (__sp .. __v17)
                          __sp = " "
                          ____i29 = ____i29 + 1
                        end
                        local ____x27 = __ks
                        local ____i30 = 0
                        while ____i30 < _35(____x27) do
                          local ____id2 = ____x27[____i30 + 1]
                          local __k15 = has(____id2, 1)
                          local __v18 = has(____id2, 2)
                          __s = __s .. (__sp .. (__k15 .. __v18))
                          __sp = " "
                          ____i30 = ____i30 + 1
                        end
                        return __s .. ")"
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
local unpack = unpack or table.unpack
function apply(f, args)
  local __args = stash(args)
  return f(unpack(__args))
end
function call(f, ...)
  local ____r94 = unstash({...})
  local __f1 = destash33(f, ____r94)
  local ____id3 = ____r94
  local __args12 = cut(____id3, 0)
  return apply(__f1, __args12)
end
function setenv(k, ...)
  local ____r95 = unstash({...})
  local __k16 = destash33(k, ____r95)
  local ____id4 = ____r95
  local __keys = cut(____id4, 0)
  if string63(__k16) then
    local __e23 = nil
    if has63(__keys, "toplevel") then
      __e23 = hd(environment)
    else
      __e23 = last(environment)
    end
    local __frame = __e23
    local __e24 = nil
    if has63(__frame, __k16) then
      __e24 = __frame[__k16]
    else
      __e24 = {}
    end
    local __entry = __e24
    local ____o17 = __keys
    local __k17 = nil
    for __k17 in next, ____o17 do
      local __v19 = ____o17[__k17]
      if not( __k17 == "toplevel") then
        __entry[__k17] = __v19
      end
    end
    __frame[__k16] = __entry
    return __frame[__k16]
  end
end
print = print
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
  _stash = true,
  toplevel = true,
  value = either(has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value"), "lua")
})
setenv("target", {
  _stash = true,
  symbol = {"get-value", {"quote", "target"}}
})
local function __quote__macro(form)
  return quoted(form)
end
setenv("quote", {
  _stash = true,
  macro = __quote__macro
})
local function __quasiquote__macro(form)
  return quasiexpand(form, 1)
end
setenv("quasiquote", {
  _stash = true,
  macro = __quasiquote__macro
})
local function __set__macro(...)
  local __args3 = unstash({...})
  return join({"%do"}, map(function (__x40)
    local ____id6 = __x40
    local __lh1 = has(____id6, 1)
    local __rh1 = has(____id6, 2)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has" then
      return {"%set", join({"%get"}, tl(__lh1)), __rh1}
    else
      return {"%set", __lh1, __rh1}
    end
  end, pair(__args3)))
end
setenv("set", {
  _stash = true,
  macro = __set__macro
})
local function __at__macro(l, i)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" and number63(i) then
    i = i + 1
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      i = {"+", i, 1}
    end
  end
  return {"%get", l, i}
end
setenv("at", {
  _stash = true,
  macro = __at__macro
})
local function __wipe__macro(place)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    return {"set", place, "nil"}
  else
    return {"%delete", place}
  end
end
setenv("wipe", {
  _stash = true,
  macro = __wipe__macro
})
local function __list__macro(...)
  local __body2 = unstash({...})
  if one63(__body2) and (hd63(__body2, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_args"
  else
    if _35(__body2) > 2 and (__body2[2] == "for" and __body2[4] == "in") then
      local ____id10 = __body2
      local __expr2 = has(____id10, 1)
      local __body3 = cut(____id10, 1)
      local __comps1 = {}
      local __cond1 = nil
      while _35(__body3) > 2 and (__body3[1] == "for" and __body3[3] == "in") do
        local ____id11 = __body3
        local ___for1 = has(____id11, 1)
        local __names1 = has(____id11, 2)
        local ___in1 = has(____id11, 3)
        local __l9 = has(____id11, 4)
        local __body12 = cut(____id11, 4)
        add(__comps1, {__names1, __l9})
        __body3 = __body12
      end
      if hd(__body3) == "if" then
        local ____id12 = __body3
        local ___if1 = has(____id12, 1)
        local __expr3 = has(____id12, 2)
        __cond1 = __expr3
      end
      return {"%list", __expr2, __comps1, __cond1}
    else
      local __x67 = unique("x")
      local __l10 = {}
      local __forms1 = {}
      local ____o19 = __body2
      local __k20 = nil
      for __k20 in next, ____o19 do
        local __v21 = ____o19[__k20]
        if number63(__k20) then
          __l10[__k20] = __v21
        else
          add(__forms1, {"%set", {"%get", __x67, {"quote", __k20}}, __v21})
        end
      end
      if some63(__forms1) then
        return join({"let", __x67, {"object", join({"%array"}, __l10)}}, __forms1, {__x67})
      else
        return join({"%array"}, __l10)
      end
    end
  end
end
setenv("list", {
  _stash = true,
  macro = __list__macro
})
local function __if__macro(...)
  local __branches1 = unstash({...})
  return hd(expand_if(__branches1))
end
setenv("if", {
  _stash = true,
  macro = __if__macro
})
local function __case__macro(expr, ...)
  local ____r109 = unstash({...})
  local __expr5 = destash33(expr, ____r109)
  local ____id15 = ____r109
  local __e25 = nil
  if nil63(has(____id15, "cmp")) then
    __e25 = "="
  else
    __e25 = has(____id15, "cmp")
  end
  local __cmp1 = __e25
  local __clauses1 = cut(____id15, 0)
  local __x91 = unique("x")
  local __eq1 = function (_)
    return {__cmp1, _, __x91}
  end
  local __cl1 = function (__x93)
    local ____id16 = __x93
    local __a4 = has(____id16, 1)
    local __b4 = has(____id16, 2)
    if nil63(__b4) then
      return {__a4}
    else
      if string63(__a4) or number63(__a4) then
        return {__eq1(__a4), __b4}
      else
        if list63(__a4) and hd63(__a4, "quote") then
          return {__eq1(__a4), __b4}
        else
          if one63(__a4) then
            return {__eq1(hd(__a4)), __b4}
          else
            if _35(__a4) > 1 then
              return {join({"or"}, map(__eq1, __a4)), __b4}
            end
          end
        end
      end
    end
  end
  return {"let", __x91, __expr5, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end
setenv("case", {
  _stash = true,
  macro = __case__macro
})
local function __of__macro(x, ...)
  local ____r113 = unstash({...})
  local __x106 = destash33(x, ____r113)
  local ____id18 = ____r113
  local __values1 = cut(____id18, 0)
  return join({"case", __x106, __values1, true, false}, props(__values1))
end
setenv("of", {
  _stash = true,
  macro = __of__macro
})
local function __when__macro(cond, ...)
  local ____r115 = unstash({...})
  local __cond3 = destash33(cond, ____r115)
  local ____id20 = ____r115
  local __body5 = cut(____id20, 0)
  return {"%if", __cond3, join({"%do"}, __body5)}
end
setenv("when", {
  _stash = true,
  macro = __when__macro
})
local function __unless__macro(cond, ...)
  local ____r117 = unstash({...})
  local __cond5 = destash33(cond, ____r117)
  local ____id22 = ____r117
  local __body7 = cut(____id22, 0)
  return {"%if", {"%not", __cond5}, join({"%do"}, __body7)}
end
setenv("unless", {
  _stash = true,
  macro = __unless__macro
})
local function __obj__macro(...)
  local __body10 = unstash({...})
  if one63(__body10) and (hd63(__body10, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_keys"
  else
    if _35(__body10) > 2 and (__body10[2] == "for" and __body10[4] == "in") then
      local ____id26 = __body10
      local __expr8 = has(____id26, 1)
      local __body111 = cut(____id26, 1)
      local __comps3 = {}
      local __cond7 = nil
      while _35(__body111) > 2 and (__body111[1] == "for" and __body111[3] == "in") do
        local ____id27 = __body111
        local ___for3 = has(____id27, 1)
        local __names3 = has(____id27, 2)
        local ___in3 = has(____id27, 3)
        local __l121 = has(____id27, 4)
        local __body14 = cut(____id27, 4)
        add(__comps3, {__names3, __l121})
        __body111 = __body14
      end
      if hd(__body111) == "if" then
        local ____id28 = __body111
        local ___if3 = has(____id28, 1)
        local __expr9 = has(____id28, 2)
        __cond7 = __expr9
      end
      if list63(__expr8) and hd63(__expr8, ",") then
        __expr8 = join({":"}, tl(__expr8))
      end
      local ____x130 = object({"%list", __expr8, __comps3, __cond7})
      ____x130.kind = "object"
      return ____x130
    else
      return join({"%object"}, mapo(function (x)
        return x
      end, __body10))
    end
  end
end
setenv("obj", {
  _stash = true,
  macro = __obj__macro
})
local function __let__macro(bs, ...)
  local ____r121 = unstash({...})
  local __bs11 = destash33(bs, ____r121)
  local ____id33 = ____r121
  local __body131 = cut(____id33, 0)
  if atom63(__bs11) or hd63(__bs11, ",") then
    return join({"let", {__bs11, hd(__body131)}}, tl(__body131))
  else
    if none63(__bs11) then
      return join({"%do"}, __body131)
    else
      local ____id34 = __bs11
      local __lh3 = has(____id34, 1)
      local __rh3 = has(____id34, 2)
      local __bs21 = cut(____id34, 2)
      local ____id35 = bind(__lh3, __rh3)
      local __id36 = has(____id35, 1)
      local __val1 = has(____id35, 2)
      local __bs12 = cut(____id35, 2)
      local __renames1 = {}
      if not id_literal63(__id36) then
        local __id121 = unique(__id36)
        __renames1 = {__id36, __id121}
        __id36 = __id121
      end
      return {"%do", {"%local", __id36, __val1}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body131)}}
    end
  end
end
setenv("let", {
  _stash = true,
  macro = __let__macro
})
local function __with__macro(x, v, ...)
  local ____r123 = unstash({...})
  local __x159 = destash33(x, ____r123)
  local __v23 = destash33(v, ____r123)
  local ____id38 = ____r123
  local __body15 = cut(____id38, 0)
  if __v23 == "as" then
    return join({"%with", {"%as", __x159, hd(__body15)}}, tl(__body15))
  else
    if not atom63(__x159) or has(__body15, "async") then
      return join({"%with", __x159, __v23}, __body15)
    else
      return join({"let", {__x159, __v23}}, __body15, {__x159})
    end
  end
end
setenv("with", {
  _stash = true,
  macro = __with__macro
})
local function __let_when__macro(x, v, ...)
  local ____r125 = unstash({...})
  local __x174 = destash33(x, ____r125)
  local __v25 = destash33(v, ____r125)
  local ____id40 = ____r125
  local __body17 = cut(____id40, 0)
  local __y6 = unique("y")
  return {"let", __y6, __v25, {"when", {"yes", __y6}, join({"let", {__x174, __y6}}, __body17)}}
end
setenv("let-when", {
  _stash = true,
  macro = __let_when__macro
})
local function __define_macro__macro(name, args, ...)
  local ____r127 = unstash({...})
  local __name1 = destash33(name, ____r127)
  local __args5 = destash33(args, ____r127)
  local ____id43 = ____r127
  local __body19 = cut(____id43, 0)
  local __id44 = unique(__name1 .. "--macro")
  local ____x188 = object({"setenv", {"quote", __name1}})
  ____x188.macro = __id44
  local __form1 = {"do", join({"define", __id44, __args5}, __body19), ____x188}
  eval(__form1)
  return __form1
end
setenv("define-macro", {
  _stash = true,
  macro = __define_macro__macro
})
local function __define_special__macro(name, args, ...)
  local ____r129 = unstash({...})
  local __name3 = destash33(name, ____r129)
  local __args7 = destash33(args, ____r129)
  local ____id47 = ____r129
  local __body21 = cut(____id47, 0)
  local __id48 = unique(__name3 .. "--special")
  local ____x198 = object({"setenv", {"quote", __name3}})
  ____x198.special = __id48
  local __form3 = {"do", join({"define", __id48, __args7}, __body21), join(____x198, props(__body21))}
  eval(__form3)
  return __form3
end
setenv("define-special", {
  _stash = true,
  macro = __define_special__macro
})
local function __define_symbol__macro(name, expansion)
  setenv(name, {
    _stash = true,
    symbol = expansion
  })
  local ____x203 = object({"setenv", {"quote", name}})
  ____x203.symbol = {"quote", expansion}
  return ____x203
end
setenv("define-symbol", {
  _stash = true,
  macro = __define_symbol__macro
})
local function __define_reader__macro(__x212, ...)
  local ____r133 = unstash({...})
  local ____x212 = destash33(__x212, ____r133)
  local ____id51 = ____x212
  local __char1 = has(____id51, 1)
  local __s2 = has(____id51, 2)
  local ____id52 = ____r133
  local __body23 = cut(____id52, 0)
  return {"%set", {"%get", "read-table", __char1}, join({"fn", {__s2}}, __body23)}
end
setenv("define-reader", {
  _stash = true,
  macro = __define_reader__macro
})
local function __define__macro(name, x, ...)
  local ____r135 = unstash({...})
  local __name5 = destash33(name, ____r135)
  local __x223 = destash33(x, ____r135)
  local ____id54 = ____r135
  local __body25 = cut(____id54, 0)
  setenv(__name5, {
    _stash = true,
    variable = true
  })
  if some63(__body25) then
    return join({"%local-function", __name5}, bind42(__x223, __body25), props(__body25))
  else
    return join({"%local", __name5, __x223}, props(__body25))
  end
end
setenv("define", {
  _stash = true,
  macro = __define__macro
})
local function __define_global__macro(name, x, ...)
  local ____r137 = unstash({...})
  local __name7 = destash33(name, ____r137)
  local __x231 = destash33(x, ____r137)
  local ____id56 = ____r137
  local __body27 = cut(____id56, 0)
  setenv(__name7, {
    _stash = true,
    toplevel = true,
    variable = true
  })
  if some63(__body27) then
    return join({"%global-function", __name7}, bind42(__x231, __body27), props(__body27))
  else
    return join({"set", __name7, __x231}, props(__body27))
  end
end
setenv("define-global", {
  _stash = true,
  macro = __define_global__macro
})
local function __get_value__macro(x)
  local ____x238 = object({"setenv", x})
  ____x238.toplevel = true
  return {"has", ____x238, {"quote", "value"}}
end
setenv("get-value", {
  _stash = true,
  macro = __get_value__macro
})
local function __define_constant__macro(name, x)
  local ____x249 = object({"setenv", {"quote", name}})
  ____x249.toplevel = true
  ____x249.value = either(x, {"get-value", {"quote", name}})
  return {"%do", ____x249, {"define-symbol", name, {"get-value", {"quote", name}}}}
end
setenv("define-constant", {
  _stash = true,
  macro = __define_constant__macro
})
local function __define_variable__macro(name, x)
  if is63(x) then
    return {"define-constant", name, {"either", {"get-value", {"quote", name}}, x}}
  else
    return {"define-constant", name}
  end
end
setenv("define-variable", {
  _stash = true,
  macro = __define_variable__macro
})
local function __after__macro(x, ...)
  local ____r146 = unstash({...})
  local __x279 = destash33(x, ____r146)
  local ____id58 = ____r146
  local __body29 = cut(____id58, 0)
  local __ok1 = unique("ok")
  local __r147 = unique("r")
  local ____x280 = object({"target", {"try", __x279, join({"finally"}, __body29)}})
  ____x280.lua = join({"let", {{__ok1, __r147}, {"guard", __x279}}}, __body29, {{"if", __ok1, __r147, {"throw", __r147}}})
  return ____x280
end
setenv("after", {
  _stash = true,
  macro = __after__macro
})
local function __with_frame__macro(...)
  local __body31 = unstash({...})
  return {"%do", {"add", "environment", {"obj"}}, {"after", join({"%do"}, __body31), {"drop", "environment"}}}
end
setenv("with-frame", {
  _stash = true,
  macro = __with_frame__macro
})
local function __with_values__macro(...)
  local __body33 = unstash({...})
  local __forms3 = {}
  local ____o21 = __body33
  local __k23 = nil
  for __k23 in next, ____o21 do
    local __v27 = ____o21[__k23]
    if not number63(__k23) then
      local ____x310 = object({"setenv", {"quote", __k23}})
      ____x310.value = __v27
      add(__forms3, ____x310)
    end
  end
  return join({"with-frame"}, __forms3)
end
setenv("with-values", {
  _stash = true,
  macro = __with_values__macro
})
local function __with_bindings__macro(__x318, ...)
  local ____r149 = unstash({...})
  local ____x318 = destash33(__x318, ____r149)
  local ____id61 = ____x318
  local __names5 = has(____id61, 1)
  local ____id62 = ____r149
  local __body35 = cut(____id62, 0)
  local __x320 = unique("x")
  local ____x323 = object({"setenv", __x320})
  ____x323.variable = true
  return join({"with-frame", {"each", __x320, __names5, ____x323}}, __body35)
end
setenv("with-bindings", {
  _stash = true,
  macro = __with_bindings__macro
})
local function __let_macro__macro(definitions, ...)
  local ____r154 = unstash({...})
  local __definitions1 = destash33(definitions, ____r154)
  local ____id64 = ____r154
  local __body37 = cut(____id64, 0)
  add(environment, {})
  local ____id65 = {xpcall(function ()
    map(function (m)
      return macroexpand(join({"define-macro"}, m))
    end, __definitions1)
    return join({"%do"}, macroexpand(__body37))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e26 = nil
      if string63(m) then
        __e26 = clip(m, search(m, ": ") + 2)
      else
        local __e27 = nil
        if nil63(m) then
          __e27 = ""
        else
          __e27 = str(m)
        end
        __e26 = __e27
      end
      return {
        stack = debug.traceback(),
        message = __e26
      }
    end
  end)}
  local ____ok3 = has(____id65, 1)
  local ____r155 = has(____id65, 2)
  drop(environment)
  if ____ok3 then
    return ____r155
  else
    error(____r155)
  end
end
setenv("let-macro", {
  _stash = true,
  macro = __let_macro__macro
})
local function __let_symbol__macro(expansions, ...)
  local ____r161 = unstash({...})
  local __expansions1 = destash33(expansions, ____r161)
  local ____id68 = ____r161
  local __body39 = cut(____id68, 0)
  add(environment, {})
  local ____id69 = {xpcall(function ()
    map(function (__x341)
      local ____id70 = __x341
      local __name9 = has(____id70, 1)
      local __exp1 = has(____id70, 2)
      return macroexpand({"define-symbol", __name9, __exp1})
    end, pair(__expansions1))
    return join({"%do"}, macroexpand(__body39))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e28 = nil
      if string63(m) then
        __e28 = clip(m, search(m, ": ") + 2)
      else
        local __e29 = nil
        if nil63(m) then
          __e29 = ""
        else
          __e29 = str(m)
        end
        __e28 = __e29
      end
      return {
        stack = debug.traceback(),
        message = __e28
      }
    end
  end)}
  local ____ok5 = has(____id69, 1)
  local ____r162 = has(____id69, 2)
  drop(environment)
  if ____ok5 then
    return ____r162
  else
    error(____r162)
  end
end
setenv("let-symbol", {
  _stash = true,
  macro = __let_symbol__macro
})
local function __let_unique__macro(names, ...)
  local ____r166 = unstash({...})
  local __names7 = destash33(names, ____r166)
  local ____id72 = ____r166
  local __body41 = cut(____id72, 0)
  local __bs3 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names7)
  return join({"let", apply(join, __bs3)}, __body41)
end
setenv("let-unique", {
  _stash = true,
  macro = __let_unique__macro
})
local function __fn__macro(args, ...)
  local ____r169 = unstash({...})
  local __args13 = destash33(args, ____r169)
  local ____id74 = ____r169
  local __body43 = cut(____id74, 0)
  return join({"%function"}, bind42(__args13, __body43), props(__body43))
end
setenv("fn", {
  _stash = true,
  macro = __fn__macro
})
local function __apply__macro(f, ...)
  local ____r171 = unstash({...})
  local __f3 = destash33(f, ____r171)
  local ____id76 = ____r171
  local __args15 = cut(____id76, 0)
  if _35(__args15) > 1 then
    return {"%call", "apply", __f3, {"join", join({"list"}, almost(__args15)), last(__args15), join({"list"}, props(__args15))}}
  else
    if props63(__args15) then
      return {"%call", "apply", __f3, join({"join"}, __args15, {join({"list"}, props(__args15))})}
    else
      return join({"%call", "apply", __f3}, __args15)
    end
  end
end
setenv("apply", {
  _stash = true,
  macro = __apply__macro
})
local function __guard__macro(expr)
  local ____x408 = object({"target", {{"%function", join(), {"%try", {"list", true, expr}}}}})
  local ____x420 = object({"obj"})
  ____x420.stack = {{"idx", "debug", "traceback"}}
  ____x420.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
  ____x408.lua = {"list", {"xpcall", {"%function", join(), expr}, {"%function", {"m"}, {"if", {"obj?", "m"}, "m", ____x420}}}}
  return {"let-macro", {{"%return", "args", {"error", "\"Can't return from guard\""}}}, ____x408}
end
setenv("guard", {
  _stash = true,
  macro = __guard__macro
})
local function __each__macro(x, t, ...)
  local ____r175 = unstash({...})
  local __x449 = destash33(x, ____r175)
  local __t4 = destash33(t, ____r175)
  local ____id79 = ____r175
  local __body45 = cut(____id79, 0)
  local __o23 = unique("o")
  local __n29 = unique("n")
  local __i37 = unique("i")
  local __e30 = nil
  if atom63(__x449) then
    __e30 = {__i37, __x449}
  else
    local __e31 = nil
    if _35(__x449) > 1 then
      __e31 = __x449
    else
      __e31 = {__i37, hd(__x449)}
    end
    __e30 = __e31
  end
  local ____id80 = __e30
  local __k25 = has(____id80, 1)
  local __v29 = has(____id80, 2)
  local ____x455 = object({"target", __o23})
  ____x455.py = {"indices", __o23}
  local __e32 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e32 = __body45
  else
    __e32 = {join({"let", __k25, {"if", {"numeric?", __k25}, {"parseInt", __k25}, __k25}}, __body45)}
  end
  return {"let", {__o23, __t4, __k25, "nil"}, join({"%for", ____x455, __k25}, props(__body45), {join({"let", {__v29, {"%get", __o23, __k25}}}, __e32)})}
end
setenv("each", {
  _stash = true,
  macro = __each__macro
})
local function __for__macro(i, to, ...)
  local ____r177 = unstash({...})
  local __i39 = destash33(i, ____r177)
  local __to1 = destash33(to, ____r177)
  local ____id82 = ____r177
  local __body47 = cut(____id82, 0)
  if __to1 == "in" then
    return join({"%for", hd(__body47), __i39, join({"%do"}, tl(__body47))}, props(__body47))
  else
    return {"let", __i39, 0, join({"while", {"<", __i39, __to1}}, __body47, {{"inc", __i39}})}
  end
end
setenv("for", {
  _stash = true,
  macro = __for__macro
})
local function __step__macro(v, t, ...)
  local ____r179 = unstash({...})
  local __v31 = destash33(v, ____r179)
  local __t6 = destash33(t, ____r179)
  local ____id84 = ____r179
  local __body49 = cut(____id84, 0)
  local __x492 = unique("x")
  local __i41 = unique("i")
  return {"let", {__x492, __t6}, {"for", __i41, {"#", __x492}, join({"let", {__v31, {"at", __x492, __i41}}}, __body49)}}
end
setenv("step", {
  _stash = true,
  macro = __step__macro
})
local function __set_of__macro(...)
  local __xs13 = unstash({...})
  local __l14 = {}
  local ____o25 = __xs13
  local ____i43 = nil
  for ____i43 in next, ____o25 do
    local __x504 = ____o25[____i43]
    __l14[__x504] = true
  end
  return join({"obj"}, __l14)
end
setenv("set-of", {
  _stash = true,
  macro = __set_of__macro
})
local function __target63__macro(x)
  return {"=", "target", x}
end
setenv("target?", {
  _stash = true,
  macro = __target63__macro
})
local function __target__macro(...)
  local __clauses3 = unstash({...})
  if has63(__clauses3, has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")) then
    return __clauses3[has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value")]
  else
    return hd(__clauses3)
  end
end
setenv("target", {
  _stash = true,
  macro = __target__macro
})
local function __language__macro()
  return {"quote", has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")}
end
setenv("language", {
  _stash = true,
  macro = __language__macro
})
local function __join33__macro(a, ...)
  local ____r185 = unstash({...})
  local __a6 = destash33(a, ____r185)
  local ____id86 = ____r185
  local __bs5 = cut(____id86, 0)
  return {"set", __a6, join({"join", __a6}, __bs5)}
end
setenv("join!", {
  _stash = true,
  macro = __join33__macro
})
local function __cat33__macro(a, ...)
  local ____r187 = unstash({...})
  local __a8 = destash33(a, ____r187)
  local ____id88 = ____r187
  local __bs7 = cut(____id88, 0)
  return {"set", __a8, join({"cat", __a8}, __bs7)}
end
setenv("cat!", {
  _stash = true,
  macro = __cat33__macro
})
local function __inc__macro(n, by)
  local __e33 = nil
  if nil63(by) then
    __e33 = 1
  else
    __e33 = by
  end
  return {"set", n, {"+", n, __e33}}
end
setenv("inc", {
  _stash = true,
  macro = __inc__macro
})
local function __dec__macro(n, by)
  local __e34 = nil
  if nil63(by) then
    __e34 = 1
  else
    __e34 = by
  end
  return {"set", n, {"-", n, __e34}}
end
setenv("dec", {
  _stash = true,
  macro = __dec__macro
})
local function __with_indent__macro(form)
  local __x537 = unique("x")
  return {"%do", {"inc", "indent-level"}, {"with", __x537, form, {"dec", "indent-level"}}}
end
setenv("with-indent", {
  _stash = true,
  macro = __with_indent__macro
})
local function __export__macro(...)
  local __names9 = unstash({...})
  local __forms5 = map(function (k)
    if k == compile(k) then
      return {"%set", {"idx", "exports", k}, k}
    else
      return {"%do", {"%set", {"%get", "exports", {"quote", k}}, k}, {"%set", {"idx", "exports", k}, k}}
    end
  end, __names9)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    return join({"%do"}, __forms5)
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      return join({"let", "exports", {"or", "exports", {"obj"}}}, __forms5, {{"return", "exports"}})
    end
  end
end
setenv("export", {
  _stash = true,
  macro = __export__macro
})
local function __when_compiling__macro(...)
  local __body51 = unstash({...})
  return eval(join({"%do"}, __body51))
end
setenv("when-compiling", {
  _stash = true,
  macro = __when_compiling__macro
})
local function __during_compilation__macro(...)
  local __body53 = unstash({...})
  local __form5 = join({"%do"}, __body53)
  eval(__form5)
  return __form5
end
setenv("during-compilation", {
  _stash = true,
  macro = __during_compilation__macro
})
local function __def__macro(name, ...)
  local ____r197 = unstash({...})
  local __name11 = destash33(name, ____r197)
  local ____id90 = ____r197
  local __body55 = cut(____id90, 0)
  return join({"define-global", __name11}, __body55)
end
setenv("def", {
  _stash = true,
  macro = __def__macro
})
local function __mac__macro(name, ...)
  local ____r199 = unstash({...})
  local __name13 = destash33(name, ____r199)
  local ____id92 = ____r199
  local __body57 = cut(____id92, 0)
  return join({"define-macro", __name13}, __body57)
end
setenv("mac", {
  _stash = true,
  macro = __mac__macro
})
local function __defconst__macro(name, ...)
  local ____r201 = unstash({...})
  local __name15 = destash33(name, ____r201)
  local ____id94 = ____r201
  local __value1 = cut(____id94, 0)
  return join({"def", __name15}, __value1)
end
setenv("defconst", {
  _stash = true,
  macro = __defconst__macro
})
local function __undefined63__macro(name)
  local ____x601 = object({"target"})
  ____x601.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x601.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x601.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x601
end
setenv("undefined?", {
  _stash = true,
  macro = __undefined63__macro
})
local function __defvar__macro(name, ...)
  local ____r205 = unstash({...})
  local __name17 = destash33(name, ____r205)
  local ____id96 = ____r205
  local __value3 = cut(____id96, 0)
  local ____x619 = object({"target"})
  ____x619.py = {"global", __name17}
  return {"when", {"undefined?", __name17}, ____x619, join({"defconst", __name17}, __value3)}
end
setenv("defvar", {
  _stash = true,
  macro = __defvar__macro
})
local function __async__macro(keyword, ...)
  local ____r207 = unstash({...})
  local __keyword1 = destash33(keyword, ____r207)
  local ____id98 = ____r207
  local __body59 = cut(____id98, 0)
  local ____x625 = object({__keyword1})
  ____x625.async = true
  return join(____x625, __body59)
end
setenv("async", {
  _stash = true,
  macro = __async__macro
})
local function ___37read_from_file__macro(name)
  return {"when-compiling", {"quasiquote", {"%do", {"unquote-splicing", {"read-from-file", name}}}}}
end
setenv("%read-from-file", {
  _stash = true,
  macro = ___37read_from_file__macro
})
local function __the__macro(name)
  return {"getenv", {"quote", name}, {"quote", "value"}}
end
setenv("the", {
  _stash = true,
  macro = __the__macro
})
local function __cat__macro(a, ...)
  local ____r213 = unstash({...})
  local __a10 = destash33(a, ____r213)
  local ____id100 = ____r213
  local __bs9 = cut(____id100, 0)
  if nil63(__a10) then
    return ""
  else
    if none63(__bs9) then
      return __a10
    else
      if one63(__bs9) then
        local ____x651 = object({"target", join({"%cat", __a10}, __bs9)})
        ____x651.py = join({"%call", "cat", __a10}, __bs9)
        return ____x651
      else
        local ____x654 = object({"target", {"%cat", __a10, join({"cat"}, __bs9)}})
        ____x654.py = join({"%call", "cat", __a10}, __bs9)
        return ____x654
      end
    end
  end
end
setenv("cat", {
  _stash = true,
  macro = __cat__macro
})
local function ___43__macro(...)
  local __args17 = unstash({...})
  if none63(__args17) then
    return 0
  else
    if one63(__args17) then
      return hd(__args17)
    else
      return join({"%add"}, __args17)
    end
  end
end
setenv("+", {
  _stash = true,
  macro = ___43__macro
})
local function _____macro(...)
  local __args19 = unstash({...})
  if none63(__args19) then
    return 0
  else
    if one63(__args19) then
      return {"%unm", hd(__args19)}
    else
      return join({"%sub"}, __args19)
    end
  end
end
setenv("-", {
  _stash = true,
  macro = _____macro
})
local function ___42__macro(...)
  local __args21 = unstash({...})
  if none63(__args21) then
    return 1
  else
    if one63(__args21) then
      return hd(__args21)
    else
      return join({"%mul"}, __args21)
    end
  end
end
setenv("*", {
  _stash = true,
  macro = ___42__macro
})
local function ___47__macro(...)
  local __args23 = unstash({...})
  if none63(__args23) then
    return 1
  else
    if one63(__args23) then
      return hd(__args23)
    else
      return join({"%div"}, __args23)
    end
  end
end
setenv("/", {
  _stash = true,
  macro = ___47__macro
})
local function ___4747__macro(...)
  local __args25 = unstash({...})
  if none63(__args25) then
    return 1
  else
    if one63(__args25) then
      return hd(__args25)
    else
      return join({"%idiv"}, __args25)
    end
  end
end
setenv("//", {
  _stash = true,
  macro = ___4747__macro
})
local function ___37__macro(...)
  local __args27 = unstash({...})
  if none63(__args27) then
    return 0
  else
    if one63(__args27) then
      return hd(__args27)
    else
      return join({"%mod"}, __args27)
    end
  end
end
setenv("%", {
  _stash = true,
  macro = ___37__macro
})
local function ___60__macro(a, ...)
  local ____r215 = unstash({...})
  local __a12 = destash33(a, ____r215)
  local ____id102 = ____r215
  local __bs111 = cut(____id102, 0)
  if none63(__bs111) then
    return true
  else
    if one63(__bs111) then
      return join({"%lt", __a12}, __bs111)
    else
      return {"%and", {"%lt", __a12, hd(__bs111)}, join({"<"}, __bs111)}
    end
  end
end
setenv("<", {
  _stash = true,
  macro = ___60__macro
})
local function ___6061__macro(a, ...)
  local ____r217 = unstash({...})
  local __a14 = destash33(a, ____r217)
  local ____id104 = ____r217
  local __bs13 = cut(____id104, 0)
  if none63(__bs13) then
    return true
  else
    if one63(__bs13) then
      return join({"%le", __a14}, __bs13)
    else
      return {"%and", {"%le", __a14, hd(__bs13)}, join({"<="}, __bs13)}
    end
  end
end
setenv("<=", {
  _stash = true,
  macro = ___6061__macro
})
local function ___61__macro(a, ...)
  local ____r219 = unstash({...})
  local __a16 = destash33(a, ____r219)
  local ____id106 = ____r219
  local __bs15 = cut(____id106, 0)
  if none63(__bs15) then
    return true
  else
    if one63(__bs15) then
      return join({"%eq", __a16}, __bs15)
    else
      return {"%and", {"%eq", __a16, hd(__bs15)}, join({"="}, __bs15)}
    end
  end
end
setenv("=", {
  _stash = true,
  macro = ___61__macro
})
local function ___6261__macro(a, ...)
  local ____r221 = unstash({...})
  local __a18 = destash33(a, ____r221)
  local ____id108 = ____r221
  local __bs17 = cut(____id108, 0)
  if none63(__bs17) then
    return true
  else
    if one63(__bs17) then
      return join({"%ge", __a18}, __bs17)
    else
      return {"%and", {"%ge", __a18, hd(__bs17)}, join({">="}, __bs17)}
    end
  end
end
setenv(">=", {
  _stash = true,
  macro = ___6261__macro
})
local function ___62__macro(a, ...)
  local ____r223 = unstash({...})
  local __a20 = destash33(a, ____r223)
  local ____id110 = ____r223
  local __bs19 = cut(____id110, 0)
  if none63(__bs19) then
    return true
  else
    if one63(__bs19) then
      return join({"%gt", __a20}, __bs19)
    else
      return {"%and", {"%gt", __a20, hd(__bs19)}, join({">"}, __bs19)}
    end
  end
end
setenv(">", {
  _stash = true,
  macro = ___62__macro
})
local function __not__macro(...)
  local __args29 = unstash({...})
  if none63(__args29) then
    return false
  else
    if one63(__args29) then
      return join({"%not"}, __args29)
    else
      return {"%and", {"%not", hd(__args29)}, join({"not"}, tl(__args29))}
    end
  end
end
setenv("not", {
  _stash = true,
  macro = __not__macro
})
local function __and__macro(a, ...)
  local ____r225 = unstash({...})
  local __a22 = destash33(a, ____r225)
  local ____id112 = ____r225
  local __bs211 = cut(____id112, 0)
  if nil63(__a22) then
    return true
  else
    if none63(__bs211) then
      return __a22
    else
      if one63(__bs211) then
        return join({"%and", __a22}, __bs211)
      else
        return {"%and", __a22, join({"and"}, __bs211)}
      end
    end
  end
end
setenv("and", {
  _stash = true,
  macro = __and__macro
})
local function __or__macro(a, ...)
  local ____r227 = unstash({...})
  local __a24 = destash33(a, ____r227)
  local ____id114 = ____r227
  local __bs23 = cut(____id114, 0)
  if nil63(__a24) then
    return false
  else
    if none63(__bs23) then
      return __a24
    else
      if one63(__bs23) then
        return join({"%or", __a24}, __bs23)
      else
        return {"%or", __a24, join({"or"}, __bs23)}
      end
    end
  end
end
setenv("or", {
  _stash = true,
  macro = __or__macro
})
local function __break__macro(...)
  local __args31 = unstash({...})
  return join({"%break"}, __args31)
end
setenv("break", {
  _stash = true,
  macro = __break__macro
})
local function __return__macro(...)
  local __args33 = unstash({...})
  return join({"%return"}, __args33)
end
setenv("return", {
  _stash = true,
  macro = __return__macro
})
local function __while__macro(c, ...)
  local ____r229 = unstash({...})
  local __c3 = destash33(c, ____r229)
  local ____id116 = ____r229
  local __body61 = cut(____id116, 0)
  return join({"%while", __c3}, __body61)
end
setenv("while", {
  _stash = true,
  macro = __while__macro
})
local function __do__macro(...)
  local __body63 = unstash({...})
  return join({"%do"}, __body63)
end
setenv("do", {
  _stash = true,
  macro = __do__macro
})
local function __get__macro(...)
  local __args35 = unstash({...})
  return join({"%get"}, __args35)
end
setenv("get", {
  _stash = true,
  macro = __get__macro
})
local function __idx__macro(...)
  local __args37 = unstash({...})
  return join({"%idx"}, __args37)
end
setenv("idx", {
  _stash = true,
  macro = __idx__macro
})
local function __new__macro(...)
  local __args39 = unstash({...})
  return join({"%new"}, __args39)
end
setenv("new", {
  _stash = true,
  macro = __new__macro
})
local function __typeof__macro(...)
  local __args41 = unstash({...})
  return join({"%typeof"}, __args41)
end
setenv("typeof", {
  _stash = true,
  macro = __typeof__macro
})
local function __error__macro(...)
  local __args43 = unstash({...})
  return join({"%error"}, __args43)
end
setenv("error", {
  _stash = true,
  macro = __error__macro
})
local function __throw__macro(...)
  local __args45 = unstash({...})
  return join({"%throw"}, __args45)
end
setenv("throw", {
  _stash = true,
  macro = __throw__macro
})
local function __raise__macro(...)
  local __args47 = unstash({...})
  return join({"%throw"}, __args47)
end
setenv("raise", {
  _stash = true,
  macro = __raise__macro
})
local function __is__macro(...)
  local __args49 = unstash({...})
  local ____x809 = object({"target", join({"="}, __args49)})
  ____x809.py = join({"%is"}, __args49)
  return ____x809
end
setenv("is", {
  _stash = true,
  macro = __is__macro
})
local function __in__macro(...)
  local __args51 = unstash({...})
  return join({"%in"}, __args51)
end
setenv("in", {
  _stash = true,
  macro = __in__macro
})
local function __as__macro(...)
  local __args53 = unstash({...})
  return join({"%as"}, __args53)
end
setenv("as", {
  _stash = true,
  macro = __as__macro
})
local function ___37expand_case__macro(x, ...)
  local ____r231 = unstash({...})
  local __x827 = destash33(x, ____r231)
  local ____id119 = ____r231
  local __body65 = cut(____id119, 0)
  local __e35 = nil
  if atom63(__x827) then
    __e35 = {__x827}
  else
    __e35 = __x827
  end
  local ____id120 = __e35
  local __a26 = has(____id120, 1)
  local __bs25 = cut(____id120, 1)
  local __e36 = nil
  if none63(__bs25) then
    __e36 = {{"%literal"}}
  else
    __e36 = __bs25
  end
  return join({"%block", __a26}, __e36, __body65)
end
setenv("%expand-case", {
  _stash = true,
  macro = ___37expand_case__macro
})
local function ___37cases__macro(...)
  local __args55 = unstash({...})
  if none63(__args55) then
    return {"do"}
  else
    if one63(__args55) then
      return join({"%expand-case"}, hd(__args55))
    else
      local __r234 = unique("r")
      return join({"with", __r234, "nil"}, map(function (__x847)
        local ____id122 = __x847
        local __x848 = has(____id122, 1)
        local __body67 = cut(____id122, 1)
        return {"%expand-case", __x848, {"%set", __r234, join({"%do"}, __body67)}}
      end, almost(__args55)), {join({"%expand-case"}, last(__args55))})
    end
  end
end
setenv("%cases", {
  _stash = true,
  macro = ___37cases__macro
})
local function __try__macro(x, ...)
  local ____r237 = unstash({...})
  local __x869 = destash33(x, ____r237)
  local ____id127 = ____r237
  local __cases1 = cut(____id127, 0)
  local __fin1 = {"finally"}
  local ____o27 = __cases1
  local ____i46 = nil
  for ____i46 in next, ____o27 do
    local __x871 = ____o27[____i46]
    if hd63(__x871, "finally") then
      __fin1 = __x871
    end
  end
  local __forms7 = {}
  local ____x874 = __cases1
  local ____i47 = 0
  while ____i47 < _35(____x874) do
    local ____id128 = ____x874[____i47 + 1]
    local __x875 = has(____id128, 1)
    local __body71 = cut(____id128, 1)
    if __x875 == "finally" then
    else
      if __x875 == "except" and has(__body71, 1) == "as" then
        local ____id129 = __body71
        local __kind2 = has(____id129, 1)
        local ___1 = has(____id129, 2)
        local __name19 = has(____id129, 3)
        local __body72 = cut(____id129, 3)
        add(__forms7, join({{__x875, {"%as", __kind2, __name19}}}, __body72))
      else
        if __x875 == "except" then
          local ____id130 = __body71
          local __kind3 = has(____id130, 1)
          local __body73 = cut(____id130, 1)
          add(__forms7, join({{__x875, __kind3}}, __body73))
        else
          error("Unknown try clause")
        end
      end
    end
    ____i47 = ____i47 + 1
  end
  return join({"%cases", {"try", __x869}}, __forms7, {__fin1})
end
setenv("try", {
  _stash = true,
  macro = __try__macro
})
local function __errsafe__macro(x, _else)
  if nil63(_else) then
    _else = "nil"
  end
  local __ok7 = unique("ok")
  local __v33 = unique("v")
  return {"let", {{__ok7, __v33}, {"guard", x}}, {"if", __ok7, __v33, _else}}
end
setenv("errsafe", {
  _stash = true,
  macro = __errsafe__macro
})
local function __dbg__macro()
  local ____x898 = object({"target", {"do"}})
  ____x898.py = {"do", {"import", "pdb"}, {{"idx", "pdb", "set-trace"}}}
  return ____x898
end
setenv("dbg", {
  _stash = true,
  macro = __dbg__macro
})
local function __see__macro(form)
  local __form7 = expand(form)
  print(compile(expand({"%set", "lumen-result", __form7})))
  return __form7
end
setenv("see", {
  _stash = true,
  macro = __see__macro
})
local function ___37dollar__macro(x)
  return {"%id", x}
end
setenv("%dollar", {
  _stash = true,
  macro = ___37dollar__macro
})
local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
function disp(str)
  system.write(str)
  return system.flush()
end
function pp(x)
  if list63(x) and _35(x) > 1 then
    local __c4 = "  "
    local __nl = nil
    print("(")
    local ____x908 = x
    local ____i48 = 0
    while ____i48 < _35(____x908) do
      local __v34 = ____x908[____i48 + 1]
      if __nl then
        print("")
      end
      disp(__c4)
      __nl = true
      __c4 = "  "
      print(str(__v34))
      ____i48 = ____i48 + 1
    end
    return print(")")
  else
    return print(str(x))
  end
end
function dir(x)
  local __r249 = {}
  local ____o28 = x
  local __k26 = nil
  for __k26 in next, ____o28 do
    local __v35 = ____o28[__k26]
    add(__r249, __k26)
  end
  return __r249
end
function lines(x)
  return split(x, "\n")
end
function get_indentation(s)
  local __r252 = ""
  local __i50 = 0
  while __i50 < _35(s) do
    local __c5 = char(s, __i50)
    if __c5 == " " then
      __r252 = __r252 .. __c5
    end
    __i50 = __i50 + 1
  end
  return __r252
end
function strip_outer(s, lh, rh)
  if string_starts63(s, lh) and string_ends63(s, rh) then
    return clip(clip(s, 0, _35(s) - _35(rh)), _35(lh))
  else
    return s
  end
end
function simple_id63(x)
  local ____id131 = {xpcall(function ()
    return reader.read_string(x)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e37 = nil
      if string63(m) then
        __e37 = clip(m, search(m, ": ") + 2)
      else
        local __e38 = nil
        if nil63(m) then
          __e38 = ""
        else
          __e38 = str(m)
        end
        __e37 = __e38
      end
      return {
        stack = debug.traceback(),
        message = __e37
      }
    end
  end)}
  local ____ok8 = has(____id131, 1)
  local ____v36 = has(____id131, 2)
  local __e39 = nil
  if ____ok8 then
    __e39 = ____v36
  else
    __e39 = nil
  end
  local __r255 = __e39
  if __r255 == x then
    return __r255
  end
end
function toplevel_print(v)
  return pp(v)
end
function print_exception(v, ex)
  print("error: " .. (v.message .. ("\n" .. v.stack)))
  return nil
end
_37self = reader
local function accessor_literal63(form)
  return string63(form) and (not string_literal63(form) and (not id_literal63(form) and (char(form, 0) == "." and (not( clip(form, 0, 2) == "..") and _35(form) > 1))))
end
function eval_self_form(form)
  if form == "." then
    return "%self"
  else
    if accessor_literal63(form) then
      return {"%self", form}
    else
      if not list63(form) then
        return form
      else
        if hd63(form, "%self") and _35(form) > 1 then
          return {"%set", "%self", form[2]}
        else
          if hd63(form, "import") or hd63(form, "from") and has(form, 2) == "import" then
            return {"%do", form, {"%set", "%self", last(form)}}
          else
            if accessor_literal63(hd(form)) then
              return join({"%self"}, form)
            else
              return form
            end
          end
        end
      end
    end
  end
end
function eval_print(form)
  local __form8 = eval_self_form(form)
  local ____id132 = {xpcall(function ()
    return compiler.eval(__form8)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e40 = nil
      if string63(m) then
        __e40 = clip(m, search(m, ": ") + 2)
      else
        local __e41 = nil
        if nil63(m) then
          __e41 = ""
        else
          __e41 = str(m)
        end
        __e40 = __e41
      end
      return {
        stack = debug.traceback(),
        message = __e40
      }
    end
  end)}
  local __ok9 = has(____id132, 1)
  local __v37 = has(____id132, 2)
  local __ex = has(____id132, 3)
  if not __ok9 then
    return print_exception(__v37, __ex)
  else
    if is63(__v37) then
      return toplevel_print(__v37)
    end
  end
end
function read_toplevel(str, more)
  local __s3 = reader.stream(str, more)
  local ____id133 = {xpcall(function ()
    return reader.read_all(__s3)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e42 = nil
      if string63(m) then
        __e42 = clip(m, search(m, ": ") + 2)
      else
        local __e43 = nil
        if nil63(m) then
          __e43 = ""
        else
          __e43 = str(m)
        end
        __e42 = __e43
      end
      return {
        stack = debug.traceback(),
        message = __e42
      }
    end
  end)}
  local ____ok10 = has(____id133, 1)
  local ____v38 = has(____id133, 2)
  local __e44 = nil
  if ____ok10 then
    __e44 = ____v38
  else
    __e44 = nil
  end
  local __x920 = __e44
  if __x920 == more then
    return more
  else
    if nil63(__x920) then
      return __x920
    else
      if one63(__x920) then
        return hd(__x920)
      else
        return __x920
      end
    end
  end
end
local function rep(str)
  local __v39 = eval(read_toplevel(str))
  if is63(__v39) then
    return toplevel_print(__v39)
  end
end
local function repl()
  local o = {buf = ""}
  local function reset()
    o.buf = ""
    return disp("> ")
  end
  local function ctrl_c()
    print("")
    reset()
    return ctrl_c
  end
  local function rep1(s)
    o.buf = o.buf .. s
    local __more = {}
    local __form9 = read_toplevel(o.buf, __more)
    if not( __form9 == __more) then
      eval_print(__form9)
      return reset()
    end
  end
  reset()
  while true do
    local __s4 = system.read_line(ctrl_c)
    if not( __s4 == ctrl_c) then
      if is63(__s4) then
        rep1(__s4 .. "\n")
      else
        break
      end
    end
  end
end
function read_file(path)
  return system.read_file(path)
end
function read_from_file(path)
  local __s5 = reader.stream(read_file(path))
  return reader.read_all(__s5)
end
function expand_file(path)
  local __body74 = read_from_file(path)
  return compiler.expand(join({"do"}, __body74))
end
function compile_file(path)
  local __form10 = expand_file(path)
  return compiler.compile(__form10, {
    _stash = true,
    stmt = true
  })
end
function _load(path)
  local __previous = has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")
  local __previous_indent = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value")
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = "lua"
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = 0
  local __code = compile_file(path)
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = __previous_indent
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = __previous
  return compiler.run(__code)
end
local function script_file63(path)
  return not( "-" == char(path, 0) or (".py" == clip(path, _35(path) - 3) or (".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4))))
end
local function run_file(path)
  if script_file63(path) then
    return _load(path)
  else
    return compiler.run(system.read_file(path))
  end
end
local function usage()
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
local function main(args)
  local __arg = hd(args)
  if __arg and script_file63(__arg) then
    return _load(__arg)
  else
    if __arg == "-h" or __arg == "--help" then
      return usage()
    else
      local __pre = {}
      local __input = nil
      local __output = nil
      local __target1 = nil
      local __expr10 = nil
      local __argv = system.argv
      local __i51 = 0
      while __i51 < _35(__argv) do
        local __a27 = __argv[__i51 + 1]
        if __a27 == "-c" or (__a27 == "-o" or (__a27 == "-t" or __a27 == "-e")) then
          if __i51 == edge(__argv) then
            print("missing argument for " .. __a27)
          else
            __i51 = __i51 + 1
            local __val2 = __argv[__i51 + 1]
            if __a27 == "-c" then
              __input = __val2
            else
              if __a27 == "-o" then
                __output = __val2
              else
                if __a27 == "-t" then
                  __target1 = __val2
                else
                  if __a27 == "-e" then
                    __expr10 = __val2
                  end
                end
              end
            end
          end
        else
          if not( "-" == char(__a27, 0)) then
            add(__pre, __a27)
          end
        end
        __i51 = __i51 + 1
      end
      local ____x925 = __pre
      local ____i52 = 0
      while ____i52 < _35(____x925) do
        local __file = ____x925[____i52 + 1]
        run_file(__file)
        ____i52 = ____i52 + 1
      end
      if nil63(__input) then
        if __expr10 then
          return rep(__expr10)
        else
          return repl()
        end
      else
        if __target1 then
          setenv("target", {
            _stash = true,
            toplevel = true
          }).value = __target1
        end
        local __code1 = compile_file(__input)
        if nil63(__output) or __output == "-" then
          return print(__code1)
        else
          return system.write_file(__output, __code1)
        end
      end
    end
  end
end
local function main63()
  return true
end
if main63() then
  main(system.argv)
end
local __exports = exports or {}
__exports.main = main
__exports.reader = reader
__exports.compiler = compiler
__exports.system = system
return __exports
