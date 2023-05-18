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
  local __e = nil
  if nil63(from) or from < 0 then
    __e = 0
  else
    __e = from
  end
  local __i3 = __e
  local __n4 = _35(x)
  local __e1 = nil
  if nil63(upto) or upto > __n4 then
    __e1 = __n4
  else
    __e1 = upto
  end
  local __upto1 = __e1
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
  local __e2 = nil
  if n then
    __e2 = n + 1
  end
  return string.byte(s, __e2)
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
    local __e3 = nil
    if f then
      __e3 = f(__v9)
    else
      __e3 = __v9
    end
    local __y4 = __e3
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
  local __e4 = nil
  if start then
    __e4 = start + 1
  end
  local __start = __e4
  local __i23 = string.find(s, pattern, __start, true)
  return __i23 and __i23 - 1
end
function string_ends63(str, x, pos)
  local __e5 = nil
  if is63(pos) then
    __e5 = clip(str, pos)
  else
    __e5 = str
  end
  local __str = __e5
  if _35(x) > _35(__str) then
    return false
  else
    return x == clip(__str, _35(__str) - _35(x))
  end
end
function string_starts63(str, x, pos)
  local __e6 = nil
  if is63(pos) then
    __e6 = clip(str, pos)
  else
    __e6 = str
  end
  local __str1 = __e6
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
      local __e7 = nil
      if __c1 == "\n" then
        __e7 = "\\n"
      else
        local __e8 = nil
        if __c1 == "\r" then
          __e8 = "\\r"
        else
          local __e9 = nil
          if __c1 == "\"" then
            __e9 = "\\\""
          else
            local __e10 = nil
            if __c1 == "\\" then
              __e10 = "\\\\"
            else
              __e10 = __c1
            end
            __e9 = __e10
          end
          __e8 = __e9
        end
        __e7 = __e8
      end
      local __c11 = __e7
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
    local __e11 = nil
    if has63(__keys, "toplevel") then
      __e11 = hd(environment)
    else
      __e11 = last(environment)
    end
    local __frame = __e11
    local __e12 = nil
    if has63(__frame, __k16) then
      __e12 = __frame[__k16]
    else
      __e12 = {}
    end
    local __entry = __e12
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
  local __args2 = unstash({...})
  return join({"%do"}, map(function (__x34)
    local ____id5 = __x34
    local __lh = has(____id5, 1)
    local __rh = has(____id5, 2)
    __lh = macroexpand(__lh)
    if not atom63(__lh) and hd(__lh) == "has" then
      return {"%set", join({"%get"}, tl(__lh)), __rh}
    else
      return {"%set", __lh, __rh}
    end
  end, pair(__args2)))
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
local function __quasilist__macro(...)
  local __body = unstash({...})
  if one63(__body) and (hd63(__body, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_args"
  else
    if _35(__body) > 2 and (__body[2] == "for" and __body[4] == "in") then
      local ____id6 = __body
      local __expr = has(____id6, 1)
      local __body1 = cut(____id6, 1)
      local __comps = {}
      local __cond = nil
      while _35(__body1) > 2 and (__body1[1] == "for" and __body1[3] == "in") do
        local ____id7 = __body1
        local ___for = has(____id7, 1)
        local __names = has(____id7, 2)
        local ___in = has(____id7, 3)
        local __l7 = has(____id7, 4)
        local __body11 = cut(____id7, 4)
        add(__comps, {__names, __l7})
        __body1 = __body11
      end
      if hd(__body1) == "if" then
        local ____id8 = __body1
        local ___if = has(____id8, 1)
        local __expr1 = has(____id8, 2)
        __cond = __expr1
      end
      return {"%list", __expr, __comps, __cond}
    else
      local __x45 = unique("x")
      local __l8 = {}
      local __forms = {}
      local ____o18 = __body
      local __k18 = nil
      for __k18 in next, ____o18 do
        local __v20 = ____o18[__k18]
        if number63(__k18) then
          __l8[__k18] = __v20
        else
          add(__forms, {"%set", {"%get", __x45, {"quote", __k18}}, __v20})
        end
      end
      if some63(__forms) then
        return join({"let", __x45, {"object", join({"%array"}, __l8)}}, __forms, {__x45})
      else
        return join({"%array"}, __l8)
      end
    end
  end
end
setenv("quasilist", {
  _stash = true,
  macro = __quasilist__macro
})
local function __list__macro(...)
  local __args3 = unstash({...})
  return join({"quasilist"}, __args3)
end
setenv("list", {
  _stash = true,
  macro = __list__macro
})
local function __if__macro(...)
  local __branches = unstash({...})
  return hd(expand_if(__branches))
end
setenv("if", {
  _stash = true,
  macro = __if__macro
})
local function __case__macro(expr, ...)
  local ____r101 = unstash({...})
  local __expr2 = destash33(expr, ____r101)
  local ____id9 = ____r101
  local __e13 = nil
  if nil63(has(____id9, "cmp")) then
    __e13 = "="
  else
    __e13 = has(____id9, "cmp")
  end
  local __cmp = __e13
  local __clauses = cut(____id9, 0)
  local __x58 = unique("x")
  local __eq = function (_)
    return {__cmp, _, __x58}
  end
  local __cl = function (__x60)
    local ____id10 = __x60
    local __a3 = has(____id10, 1)
    local __b3 = has(____id10, 2)
    if nil63(__b3) then
      return {__a3}
    else
      if string63(__a3) or number63(__a3) then
        return {__eq(__a3), __b3}
      else
        if list63(__a3) and hd63(__a3, "quote") then
          return {__eq(__a3), __b3}
        else
          if one63(__a3) then
            return {__eq(hd(__a3)), __b3}
          else
            if _35(__a3) > 1 then
              return {join({"or"}, map(__eq, __a3)), __b3}
            end
          end
        end
      end
    end
  end
  return {"let", __x58, __expr2, join({"if"}, apply(join, map(__cl, pair(__clauses))))}
end
setenv("case", {
  _stash = true,
  macro = __case__macro
})
local function __of__macro(x, ...)
  local ____r104 = unstash({...})
  local __x70 = destash33(x, ____r104)
  local ____id11 = ____r104
  local __values = cut(____id11, 0)
  return join({"case", __x70, __values, true, false}, props(__values))
end
setenv("of", {
  _stash = true,
  macro = __of__macro
})
local function __when__macro(cond, ...)
  local ____r105 = unstash({...})
  local __cond1 = destash33(cond, ____r105)
  local ____id12 = ____r105
  local __body2 = cut(____id12, 0)
  return {"%if", __cond1, join({"%do"}, __body2)}
end
setenv("when", {
  _stash = true,
  macro = __when__macro
})
local function __unless__macro(cond, ...)
  local ____r106 = unstash({...})
  local __cond2 = destash33(cond, ____r106)
  local ____id13 = ____r106
  local __body3 = cut(____id13, 0)
  return {"%if", {"%not", __cond2}, join({"%do"}, __body3)}
end
setenv("unless", {
  _stash = true,
  macro = __unless__macro
})
local function __obj__macro(...)
  local __body4 = unstash({...})
  if one63(__body4) and (hd63(__body4, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_keys"
  else
    if _35(__body4) > 2 and (__body4[2] == "for" and __body4[4] == "in") then
      local ____id14 = __body4
      local __expr3 = has(____id14, 1)
      local __body5 = cut(____id14, 1)
      local __comps1 = {}
      local __cond3 = nil
      while _35(__body5) > 2 and (__body5[1] == "for" and __body5[3] == "in") do
        local ____id15 = __body5
        local ___for1 = has(____id15, 1)
        local __names1 = has(____id15, 2)
        local ___in1 = has(____id15, 3)
        local __l9 = has(____id15, 4)
        local __body12 = cut(____id15, 4)
        add(__comps1, {__names1, __l9})
        __body5 = __body12
      end
      if hd(__body5) == "if" then
        local ____id16 = __body5
        local ___if1 = has(____id16, 1)
        local __expr4 = has(____id16, 2)
        __cond3 = __expr4
      end
      if list63(__expr3) and hd63(__expr3, ",") then
        __expr3 = join({":"}, tl(__expr3))
      end
      local ____x82 = object({"%list", __expr3, __comps1, __cond3})
      ____x82.kind = "object"
      return ____x82
    else
      return join({"%object"}, mapo(function (x)
        return x
      end, __body4))
    end
  end
end
setenv("obj", {
  _stash = true,
  macro = __obj__macro
})
local function __let__macro(bs, ...)
  local ____r108 = unstash({...})
  local __bs = destash33(bs, ____r108)
  local ____id17 = ____r108
  local __body6 = cut(____id17, 0)
  if atom63(__bs) or hd63(__bs, ",") then
    return join({"let", {__bs, hd(__body6)}}, tl(__body6))
  else
    if none63(__bs) then
      return join({"%do"}, __body6)
    else
      local ____id18 = __bs
      local __lh1 = has(____id18, 1)
      local __rh1 = has(____id18, 2)
      local __bs2 = cut(____id18, 2)
      local ____id19 = bind(__lh1, __rh1)
      local __id20 = has(____id19, 1)
      local __val = has(____id19, 2)
      local __bs1 = cut(____id19, 2)
      local __id111 = unique(__id20)
      return {"%do", {"%local", __id111, __val}, {"let-symbol", {__id20, __id111}, join({"let", join(__bs1, __bs2)}, __body6)}}
    end
  end
end
setenv("let", {
  _stash = true,
  macro = __let__macro
})
local function __let42__macro(bs, ...)
  local ____r109 = unstash({...})
  local __bs11 = destash33(bs, ____r109)
  local ____id21 = ____r109
  local __body7 = cut(____id21, 0)
  if atom63(__bs11) then
    return join({"let*", {__bs11, hd(__body7)}}, tl(__body7))
  else
    if none63(__bs11) then
      return join({"%do"}, __body7)
    else
      local ____id22 = __bs11
      local __lh2 = has(____id22, 1)
      local __rh2 = has(____id22, 2)
      local __bs21 = cut(____id22, 2)
      return {"let-global", __lh2, __rh2, join({"let*", __bs21}, __body7)}
    end
  end
end
setenv("let*", {
  _stash = true,
  macro = __let42__macro
})
local function __let_global__macro(name, value, ...)
  local ____r110 = unstash({...})
  local __name = destash33(name, ____r110)
  local __value = destash33(value, ____r110)
  local ____id23 = ____r110
  local __body8 = cut(____id23, 0)
  local __prev = unique("prev")
  local __ok = unique("ok")
  local __x100 = unique("x")
  return {"let", __prev, __name, {"set", __name, __value}, {"let", {{__ok, __x100}, {"guard", join({"%do"}, __body8)}}, {"set", __name, __prev}, {"if", __ok, __x100, {"throw", __x100}}}}
end
setenv("let-global", {
  _stash = true,
  macro = __let_global__macro
})
local function __with__macro(x, v, ...)
  local ____r111 = unstash({...})
  local __x112 = destash33(x, ____r111)
  local __v21 = destash33(v, ____r111)
  local ____id24 = ____r111
  local __body9 = cut(____id24, 0)
  if __v21 == "as" then
    return join({"%with", {"%as", __x112, hd(__body9)}}, tl(__body9))
  else
    if not atom63(__x112) or has(__body9, "async") then
      return join({"%with", __x112, __v21}, __body9)
    else
      return join({"let", {__x112, __v21}}, __body9, {__x112})
    end
  end
end
setenv("with", {
  _stash = true,
  macro = __with__macro
})
local function __let_when__macro(x, v, ...)
  local ____r112 = unstash({...})
  local __x120 = destash33(x, ____r112)
  local __v22 = destash33(v, ____r112)
  local ____id25 = ____r112
  local __body10 = cut(____id25, 0)
  local __y5 = unique("y")
  return {"let", __y5, __v22, {"when", {"yes", __y5}, join({"let", {__x120, __y5}}, __body10)}}
end
setenv("let-when", {
  _stash = true,
  macro = __let_when__macro
})
local function __define_macro__macro(name, args, ...)
  local ____r113 = unstash({...})
  local __name1 = destash33(name, ____r113)
  local __args4 = destash33(args, ____r113)
  local ____id26 = ____r113
  local __body111 = cut(____id26, 0)
  local __id27 = unique(__name1 .. "--macro")
  local ____x129 = object({"setenv", {"quote", __name1}})
  ____x129.macro = __id27
  local __form = {"do", join({"define", __id27, __args4}, __body111), ____x129}
  return __form
end
setenv("define-macro", {
  _stash = true,
  macro = __define_macro__macro
})
local function __define_special__macro(name, args, ...)
  local ____r114 = unstash({...})
  local __name2 = destash33(name, ____r114)
  local __args5 = destash33(args, ____r114)
  local ____id28 = ____r114
  local __body121 = cut(____id28, 0)
  local __id29 = unique(__name2 .. "--special")
  local ____x134 = object({"setenv", {"quote", __name2}})
  ____x134.special = __id29
  local __form1 = {"do", join({"define", __id29, __args5}, __body121), join(____x134, props(__body121))}
  return __form1
end
setenv("define-special", {
  _stash = true,
  macro = __define_special__macro
})
local function __define_symbol__macro(name, expansion)
  local ____x136 = object({"setenv", {"quote", name}})
  ____x136.symbol = {"quote", expansion}
  return ____x136
end
setenv("define-symbol", {
  _stash = true,
  macro = __define_symbol__macro
})
local function __define_reader__macro(__x139, ...)
  local ____r116 = unstash({...})
  local ____x139 = destash33(__x139, ____r116)
  local ____id30 = ____x139
  local __char = has(____id30, 1)
  local __s11 = has(____id30, 2)
  local ____id31 = ____r116
  local __body13 = cut(____id31, 0)
  return {"%set", {"%get", "read-table", __char}, join({"fn", {__s11}}, __body13)}
end
setenv("define-reader", {
  _stash = true,
  macro = __define_reader__macro
})
local function __define__macro(name, x, ...)
  local ____r117 = unstash({...})
  local __name3 = destash33(name, ____r117)
  local __x146 = destash33(x, ____r117)
  local ____id32 = ____r117
  local __body14 = cut(____id32, 0)
  setenv(__name3, {
    _stash = true,
    variable = true
  })
  if some63(__body14) then
    return join({"%local-function", __name3}, bind42(__x146, __body14), props(__body14))
  else
    return join({"%local", __name3, __x146}, props(__body14))
  end
end
setenv("define", {
  _stash = true,
  macro = __define__macro
})
local function __define_global__macro(name, x, ...)
  local ____r118 = unstash({...})
  local __name4 = destash33(name, ____r118)
  local __x150 = destash33(x, ____r118)
  local ____id33 = ____r118
  local __body15 = cut(____id33, 0)
  setenv(__name4, {
    _stash = true,
    toplevel = true,
    variable = true
  })
  if some63(__body15) then
    return join({"%global-function", __name4}, bind42(__x150, __body15), props(__body15))
  else
    return join({"set", __name4, __x150}, props(__body15))
  end
end
setenv("define-global", {
  _stash = true,
  macro = __define_global__macro
})
local function __get_value__macro(x)
  local ____x154 = object({"setenv", x})
  ____x154.toplevel = true
  return {"has", ____x154, {"quote", "value"}}
end
setenv("get-value", {
  _stash = true,
  macro = __get_value__macro
})
local function __define_constant__macro(name, x)
  local ____x157 = object({"setenv", {"quote", name}})
  ____x157.toplevel = true
  ____x157.value = either(x, {"get-value", {"quote", name}})
  return {"%do", ____x157, {"define-symbol", name, {"get-value", {"quote", name}}}}
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
  local ____r122 = unstash({...})
  local __x170 = destash33(x, ____r122)
  local ____id34 = ____r122
  local __body16 = cut(____id34, 0)
  local __ok1 = unique("ok")
  local __r123 = unique("r")
  local ____x171 = object({"target", {"try", __x170, join({"finally"}, __body16)}})
  ____x171.lua = join({"let", {{__ok1, __r123}, {"guard", __x170}}}, __body16, {{"if", __ok1, __r123, {"throw", __r123}}})
  return ____x171
end
setenv("after", {
  _stash = true,
  macro = __after__macro
})
local function __with_frame__macro(...)
  local __body17 = unstash({...})
  return {"%do", {"add", "environment", {"obj"}}, {"after", join({"%do"}, __body17), {"drop", "environment"}}}
end
setenv("with-frame", {
  _stash = true,
  macro = __with_frame__macro
})
local function __with_values__macro(...)
  local __body18 = unstash({...})
  local __forms1 = {}
  local ____o19 = __body18
  local __k19 = nil
  for __k19 in next, ____o19 do
    local __v23 = ____o19[__k19]
    if not number63(__k19) then
      local ____x190 = object({"setenv", {"quote", __k19}})
      ____x190.value = __v23
      add(__forms1, ____x190)
    end
  end
  return join({"with-frame"}, __forms1)
end
setenv("with-values", {
  _stash = true,
  macro = __with_values__macro
})
local function __with_bindings__macro(__x192, ...)
  local ____r124 = unstash({...})
  local ____x192 = destash33(__x192, ____r124)
  local ____id35 = ____x192
  local __names2 = has(____id35, 1)
  local ____id36 = ____r124
  local __body19 = cut(____id36, 0)
  local __x194 = unique("x")
  local ____x197 = object({"setenv", __x194})
  ____x197.variable = true
  return join({"with-frame", {"each", __x194, __names2, ____x197}}, __body19)
end
setenv("with-bindings", {
  _stash = true,
  macro = __with_bindings__macro
})
local function __let_macro__macro(definitions, ...)
  local ____r125 = unstash({...})
  local __definitions = destash33(definitions, ____r125)
  local ____id37 = ____r125
  local __body20 = cut(____id37, 0)
  add(environment, {})
  local ____id38 = {xpcall(function ()
    map(function (m)
      return eval(join({"define-macro"}, m))
    end, __definitions)
    return {"%expansion", join({"%do"}, macroexpand(__body20))}
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e14 = nil
      if string63(m) then
        __e14 = clip(m, search(m, ": ") + 2)
      else
        local __e15 = nil
        if nil63(m) then
          __e15 = ""
        else
          __e15 = str(m)
        end
        __e14 = __e15
      end
      return {
        stack = debug.traceback(),
        message = __e14
      }
    end
  end)}
  local ____ok2 = has(____id38, 1)
  local ____r126 = has(____id38, 2)
  drop(environment)
  if ____ok2 then
    return ____r126
  else
    error(____r126)
  end
end
setenv("let-macro", {
  _stash = true,
  macro = __let_macro__macro
})
local function __let_symbol__macro(expansions, ...)
  local ____r128 = unstash({...})
  local __expansions = destash33(expansions, ____r128)
  local ____id39 = ____r128
  local __body21 = cut(____id39, 0)
  if atom63(__expansions) then
    return join({"let-symbol", {__expansions, hd(__body21)}}, tl(__body21))
  else
    add(environment, {})
    local ____id40 = {xpcall(function ()
      map(function (__x209)
        local ____id41 = __x209
        local __name5 = has(____id41, 1)
        local __exp = has(____id41, 2)
        return eval({"define-symbol", __name5, __exp})
      end, pair(__expansions))
      return {"%expansion", join({"%do"}, macroexpand(__body21))}
    end, function (m)
      if obj63(m) then
        return m
      else
        local __e16 = nil
        if string63(m) then
          __e16 = clip(m, search(m, ": ") + 2)
        else
          local __e17 = nil
          if nil63(m) then
            __e17 = ""
          else
            __e17 = str(m)
          end
          __e16 = __e17
        end
        return {
          stack = debug.traceback(),
          message = __e16
        }
      end
    end)}
    local ____ok3 = has(____id40, 1)
    local ____r129 = has(____id40, 2)
    drop(environment)
    if ____ok3 then
      return ____r129
    else
      error(____r129)
    end
  end
end
setenv("let-symbol", {
  _stash = true,
  macro = __let_symbol__macro
})
local function __let_unique__macro(names, ...)
  local ____r131 = unstash({...})
  local __names3 = destash33(names, ____r131)
  local ____id42 = ____r131
  local __body22 = cut(____id42, 0)
  local __bs22 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names3)
  return join({"let", apply(join, __bs22)}, __body22)
end
setenv("let-unique", {
  _stash = true,
  macro = __let_unique__macro
})
local function __fn__macro(args, ...)
  local ____r133 = unstash({...})
  local __args8 = destash33(args, ____r133)
  local ____id43 = ____r133
  local __body23 = cut(____id43, 0)
  return join({"%function"}, bind42(__args8, __body23), props(__body23))
end
setenv("fn", {
  _stash = true,
  macro = __fn__macro
})
local function __apply__macro(f, ...)
  local ____r134 = unstash({...})
  local __f2 = destash33(f, ____r134)
  local ____id44 = ____r134
  local __args9 = cut(____id44, 0)
  if _35(__args9) > 1 then
    return {"%call", "apply", __f2, {"join", join({"list"}, almost(__args9)), last(__args9), join({"list"}, props(__args9))}}
  else
    if props63(__args9) then
      return {"%call", "apply", __f2, join({"join"}, __args9, {join({"list"}, props(__args9))})}
    else
      return join({"%call", "apply", __f2}, __args9)
    end
  end
end
setenv("apply", {
  _stash = true,
  macro = __apply__macro
})
local function __guard__macro(expr)
  local ____x234 = object({"target", {{"%function", join(), {"%try", {"list", true, expr}}}}})
  local ____x246 = object({"obj"})
  ____x246.stack = {{"idx", "debug", "traceback"}}
  ____x246.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
  ____x234.lua = {"list", {"xpcall", {"%function", join(), expr}, {"%function", {"m"}, {"if", {"obj?", "m"}, "m", ____x246}}}}
  return {"let-macro", {{"%return", "args", {"error", "\"Can't return from guard\""}}}, ____x234}
end
setenv("guard", {
  _stash = true,
  macro = __guard__macro
})
local function __each__macro(x, t, ...)
  local ____r136 = unstash({...})
  local __x257 = destash33(x, ____r136)
  local __t3 = destash33(t, ____r136)
  local ____id45 = ____r136
  local __body24 = cut(____id45, 0)
  local __o20 = unique("o")
  local __n26 = unique("n")
  local __i34 = unique("i")
  local __e18 = nil
  if atom63(__x257) then
    __e18 = {__i34, __x257}
  else
    local __e19 = nil
    if _35(__x257) > 1 then
      __e19 = __x257
    else
      __e19 = {__i34, hd(__x257)}
    end
    __e18 = __e19
  end
  local ____id46 = __e18
  local __k20 = has(____id46, 1)
  local __v24 = has(____id46, 2)
  local ____x263 = object({"target", __o20})
  ____x263.py = {"indices", __o20}
  local __e20 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e20 = __body24
  else
    __e20 = {join({"let", __k20, {"if", {"numeric?", __k20}, {"parseInt", __k20}, __k20}}, __body24)}
  end
  return {"let", {__o20, __t3, __k20, "nil"}, join({"%for", ____x263, __k20}, props(__body24), {join({"let", {__v24, {"%get", __o20, __k20}}}, __e20)})}
end
setenv("each", {
  _stash = true,
  macro = __each__macro
})
local function __for__macro(i, to, ...)
  local ____r137 = unstash({...})
  local __i35 = destash33(i, ____r137)
  local __to = destash33(to, ____r137)
  local ____id47 = ____r137
  local __body25 = cut(____id47, 0)
  if __to == "in" then
    return join({"%for", hd(__body25), __i35, join({"%do"}, tl(__body25))}, props(__body25))
  else
    return {"let", __i35, 0, join({"while", {"<", __i35, __to}}, __body25, {{"inc", __i35}})}
  end
end
setenv("for", {
  _stash = true,
  macro = __for__macro
})
local function __step__macro(v, t, ...)
  local ____r138 = unstash({...})
  local __v25 = destash33(v, ____r138)
  local __t4 = destash33(t, ____r138)
  local ____id48 = ____r138
  local __body26 = cut(____id48, 0)
  local __x283 = unique("x")
  local __i36 = unique("i")
  return {"let", {__x283, __t4}, {"for", __i36, {"#", __x283}, join({"let", {__v25, {"at", __x283, __i36}}}, __body26)}}
end
setenv("step", {
  _stash = true,
  macro = __step__macro
})
local function __set_of__macro(...)
  local __xs12 = unstash({...})
  local __l10 = {}
  local ____o21 = __xs12
  local ____i37 = nil
  for ____i37 in next, ____o21 do
    local __x292 = ____o21[____i37]
    __l10[__x292] = true
  end
  return join({"obj"}, __l10)
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
  local __clauses1 = unstash({...})
  if has63(__clauses1, has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")) then
    return __clauses1[has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value")]
  else
    return hd(__clauses1)
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
  local ____r141 = unstash({...})
  local __a4 = destash33(a, ____r141)
  local ____id49 = ____r141
  local __bs3 = cut(____id49, 0)
  return {"set", __a4, join({"join", __a4}, __bs3)}
end
setenv("join!", {
  _stash = true,
  macro = __join33__macro
})
local function __cat33__macro(a, ...)
  local ____r142 = unstash({...})
  local __a5 = destash33(a, ____r142)
  local ____id50 = ____r142
  local __bs4 = cut(____id50, 0)
  return {"set", __a5, join({"cat", __a5}, __bs4)}
end
setenv("cat!", {
  _stash = true,
  macro = __cat33__macro
})
local function __inc__macro(n, by)
  local __e21 = nil
  if nil63(by) then
    __e21 = 1
  else
    __e21 = by
  end
  return {"set", n, {"+", n, __e21}}
end
setenv("inc", {
  _stash = true,
  macro = __inc__macro
})
local function __dec__macro(n, by)
  local __e22 = nil
  if nil63(by) then
    __e22 = 1
  else
    __e22 = by
  end
  return {"set", n, {"-", n, __e22}}
end
setenv("dec", {
  _stash = true,
  macro = __dec__macro
})
local function __with_indent__macro(form)
  local __x307 = unique("x")
  return {"%do", {"inc", "indent-level"}, {"with", __x307, form, {"dec", "indent-level"}}}
end
setenv("with-indent", {
  _stash = true,
  macro = __with_indent__macro
})
local function __export__macro(...)
  local __names4 = unstash({...})
  local __forms2 = map(function (k)
    if k == compile(k) then
      return {"%set", {"idx", "exports", k}, k}
    else
      return {"%do", {"%set", {"%get", "exports", {"quote", k}}, k}, {"%set", {"idx", "exports", k}, k}}
    end
  end, __names4)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    return join({"%do"}, __forms2)
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      return join({"let", "exports", {"or", "exports", {"obj"}}}, __forms2, {{"return", "exports"}})
    end
  end
end
setenv("export", {
  _stash = true,
  macro = __export__macro
})
local function __when_compiling__macro(...)
  local __body27 = unstash({...})
  return eval(join({"%do"}, __body27))
end
setenv("when-compiling", {
  _stash = true,
  macro = __when_compiling__macro
})
local function __during_compilation__macro(...)
  local __body28 = unstash({...})
  local __form2 = join({"%do"}, __body28)
  eval(__form2)
  return __form2
end
setenv("during-compilation", {
  _stash = true,
  macro = __during_compilation__macro
})
local function __def__macro(name, ...)
  local ____r147 = unstash({...})
  local __name6 = destash33(name, ____r147)
  local ____id51 = ____r147
  local __body29 = cut(____id51, 0)
  return join({"define-global", __name6}, __body29)
end
setenv("def", {
  _stash = true,
  macro = __def__macro
})
local function __mac__macro(name, ...)
  local ____r148 = unstash({...})
  local __name7 = destash33(name, ____r148)
  local ____id52 = ____r148
  local __body30 = cut(____id52, 0)
  return join({"define-macro", __name7}, __body30)
end
setenv("mac", {
  _stash = true,
  macro = __mac__macro
})
local function __defconst__macro(name, ...)
  local ____r149 = unstash({...})
  local __name8 = destash33(name, ____r149)
  local ____id53 = ____r149
  local __value1 = cut(____id53, 0)
  return join({"def", __name8}, __value1)
end
setenv("defconst", {
  _stash = true,
  macro = __defconst__macro
})
local function __undefined63__macro(name)
  local ____x337 = object({"target"})
  ____x337.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x337.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x337.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x337
end
setenv("undefined?", {
  _stash = true,
  macro = __undefined63__macro
})
local function __defvar__macro(name, ...)
  local ____r151 = unstash({...})
  local __name9 = destash33(name, ____r151)
  local ____id54 = ____r151
  local __value2 = cut(____id54, 0)
  local ____x349 = object({"target"})
  ____x349.py = {"global", __name9}
  return {"when", {"undefined?", __name9}, ____x349, join({"defconst", __name9}, __value2)}
end
setenv("defvar", {
  _stash = true,
  macro = __defvar__macro
})
local function __async__macro(keyword, ...)
  local ____r152 = unstash({...})
  local __keyword = destash33(keyword, ____r152)
  local ____id55 = ____r152
  local __body31 = cut(____id55, 0)
  local ____x353 = object({__keyword})
  ____x353.async = true
  return join(____x353, __body31)
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
  local ____r155 = unstash({...})
  local __a6 = destash33(a, ____r155)
  local ____id56 = ____r155
  local __bs5 = cut(____id56, 0)
  if nil63(__a6) then
    return ""
  else
    if none63(__bs5) then
      return __a6
    else
      if one63(__bs5) then
        local ____x363 = object({"target", join({"%cat", __a6}, __bs5)})
        ____x363.py = join({"%call", "cat", __a6}, __bs5)
        ____x363.cmake = join({"%call", "cat", __a6}, __bs5)
        return ____x363
      else
        local ____x367 = object({"target", {"%cat", __a6, join({"cat"}, __bs5)}})
        ____x367.py = join({"%call", "cat", __a6}, __bs5)
        ____x367.cmake = join({"%call", "cat", __a6}, __bs5)
        return ____x367
      end
    end
  end
end
setenv("cat", {
  _stash = true,
  macro = __cat__macro
})
local function ___43__macro(...)
  local __args10 = unstash({...})
  if none63(__args10) then
    return 0
  else
    if one63(__args10) then
      return hd(__args10)
    else
      return join({"%add"}, __args10)
    end
  end
end
setenv("+", {
  _stash = true,
  macro = ___43__macro
})
local function _____macro(...)
  local __args111 = unstash({...})
  if none63(__args111) then
    return 0
  else
    if one63(__args111) then
      return {"%unm", hd(__args111)}
    else
      return join({"%sub"}, __args111)
    end
  end
end
setenv("-", {
  _stash = true,
  macro = _____macro
})
local function ___42__macro(...)
  local __args121 = unstash({...})
  if none63(__args121) then
    return 1
  else
    if one63(__args121) then
      return hd(__args121)
    else
      return join({"%mul"}, __args121)
    end
  end
end
setenv("*", {
  _stash = true,
  macro = ___42__macro
})
local function ___47__macro(...)
  local __args13 = unstash({...})
  if none63(__args13) then
    return 1
  else
    if one63(__args13) then
      return hd(__args13)
    else
      return join({"%div"}, __args13)
    end
  end
end
setenv("/", {
  _stash = true,
  macro = ___47__macro
})
local function ___4747__macro(...)
  local __args14 = unstash({...})
  if none63(__args14) then
    return 1
  else
    if one63(__args14) then
      return hd(__args14)
    else
      return join({"%idiv"}, __args14)
    end
  end
end
setenv("//", {
  _stash = true,
  macro = ___4747__macro
})
local function ___37__macro(...)
  local __args15 = unstash({...})
  if none63(__args15) then
    return 0
  else
    if one63(__args15) then
      return hd(__args15)
    else
      return join({"%mod"}, __args15)
    end
  end
end
setenv("%", {
  _stash = true,
  macro = ___37__macro
})
local function ___60__macro(a, ...)
  local ____r156 = unstash({...})
  local __a7 = destash33(a, ____r156)
  local ____id57 = ____r156
  local __bs6 = cut(____id57, 0)
  if none63(__bs6) then
    return true
  else
    if one63(__bs6) then
      return join({"%lt", __a7}, __bs6)
    else
      return {"%and", {"%lt", __a7, hd(__bs6)}, join({"<"}, __bs6)}
    end
  end
end
setenv("<", {
  _stash = true,
  macro = ___60__macro
})
local function ___6061__macro(a, ...)
  local ____r157 = unstash({...})
  local __a8 = destash33(a, ____r157)
  local ____id58 = ____r157
  local __bs7 = cut(____id58, 0)
  if none63(__bs7) then
    return true
  else
    if one63(__bs7) then
      return join({"%le", __a8}, __bs7)
    else
      return {"%and", {"%le", __a8, hd(__bs7)}, join({"<="}, __bs7)}
    end
  end
end
setenv("<=", {
  _stash = true,
  macro = ___6061__macro
})
local function ___61__macro(a, ...)
  local ____r158 = unstash({...})
  local __a9 = destash33(a, ____r158)
  local ____id59 = ____r158
  local __bs8 = cut(____id59, 0)
  if none63(__bs8) then
    return true
  else
    if one63(__bs8) then
      return join({"%eq", __a9}, __bs8)
    else
      return {"%and", {"%eq", __a9, hd(__bs8)}, join({"="}, __bs8)}
    end
  end
end
setenv("=", {
  _stash = true,
  macro = ___61__macro
})
local function ___6261__macro(a, ...)
  local ____r159 = unstash({...})
  local __a10 = destash33(a, ____r159)
  local ____id60 = ____r159
  local __bs9 = cut(____id60, 0)
  if none63(__bs9) then
    return true
  else
    if one63(__bs9) then
      return join({"%ge", __a10}, __bs9)
    else
      return {"%and", {"%ge", __a10, hd(__bs9)}, join({">="}, __bs9)}
    end
  end
end
setenv(">=", {
  _stash = true,
  macro = ___6261__macro
})
local function ___62__macro(a, ...)
  local ____r160 = unstash({...})
  local __a11 = destash33(a, ____r160)
  local ____id61 = ____r160
  local __bs10 = cut(____id61, 0)
  if none63(__bs10) then
    return true
  else
    if one63(__bs10) then
      return join({"%gt", __a11}, __bs10)
    else
      return {"%and", {"%gt", __a11, hd(__bs10)}, join({">"}, __bs10)}
    end
  end
end
setenv(">", {
  _stash = true,
  macro = ___62__macro
})
local function __not__macro(...)
  local __args16 = unstash({...})
  if none63(__args16) then
    return false
  else
    if one63(__args16) then
      return join({"%not"}, __args16)
    else
      return {"%and", {"%not", hd(__args16)}, join({"not"}, tl(__args16))}
    end
  end
end
setenv("not", {
  _stash = true,
  macro = __not__macro
})
local function __and__macro(a, ...)
  local ____r161 = unstash({...})
  local __a12 = destash33(a, ____r161)
  local ____id62 = ____r161
  local __bs111 = cut(____id62, 0)
  if nil63(__a12) then
    return true
  else
    if none63(__bs111) then
      return __a12
    else
      if one63(__bs111) then
        return join({"%and", __a12}, __bs111)
      else
        return {"%and", __a12, join({"and"}, __bs111)}
      end
    end
  end
end
setenv("and", {
  _stash = true,
  macro = __and__macro
})
local function __or__macro(a, ...)
  local ____r162 = unstash({...})
  local __a13 = destash33(a, ____r162)
  local ____id63 = ____r162
  local __bs12 = cut(____id63, 0)
  if nil63(__a13) then
    return false
  else
    if none63(__bs12) then
      return __a13
    else
      if one63(__bs12) then
        return join({"%or", __a13}, __bs12)
      else
        return {"%or", __a13, join({"or"}, __bs12)}
      end
    end
  end
end
setenv("or", {
  _stash = true,
  macro = __or__macro
})
local function __break__macro(...)
  local __args17 = unstash({...})
  return join({"%break"}, __args17)
end
setenv("break", {
  _stash = true,
  macro = __break__macro
})
local function __return__macro(...)
  local __args18 = unstash({...})
  return join({"%return"}, __args18)
end
setenv("return", {
  _stash = true,
  macro = __return__macro
})
local function __while__macro(c, ...)
  local ____r163 = unstash({...})
  local __c2 = destash33(c, ____r163)
  local ____id64 = ____r163
  local __body32 = cut(____id64, 0)
  return join({"%while", __c2}, __body32)
end
setenv("while", {
  _stash = true,
  macro = __while__macro
})
local function __do__macro(...)
  local __body33 = unstash({...})
  return join({"%do"}, __body33)
end
setenv("do", {
  _stash = true,
  macro = __do__macro
})
local function __get__macro(...)
  local __args19 = unstash({...})
  return join({"%get"}, __args19)
end
setenv("get", {
  _stash = true,
  macro = __get__macro
})
local function __idx__macro(...)
  local __args20 = unstash({...})
  return join({"%idx"}, __args20)
end
setenv("idx", {
  _stash = true,
  macro = __idx__macro
})
local function __new__macro(...)
  local __args21 = unstash({...})
  return join({"%new"}, __args21)
end
setenv("new", {
  _stash = true,
  macro = __new__macro
})
local function __typeof__macro(...)
  local __args22 = unstash({...})
  return join({"%typeof"}, __args22)
end
setenv("typeof", {
  _stash = true,
  macro = __typeof__macro
})
local function __error__macro(...)
  local __args23 = unstash({...})
  return join({"%error"}, __args23)
end
setenv("error", {
  _stash = true,
  macro = __error__macro
})
local function __throw__macro(...)
  local __args24 = unstash({...})
  return join({"%throw"}, __args24)
end
setenv("throw", {
  _stash = true,
  macro = __throw__macro
})
local function __raise__macro(...)
  local __args25 = unstash({...})
  return join({"%throw"}, __args25)
end
setenv("raise", {
  _stash = true,
  macro = __raise__macro
})
local function __is__macro(...)
  local __args26 = unstash({...})
  local ____x446 = object({"target", join({"="}, __args26)})
  ____x446.py = join({"%is"}, __args26)
  return ____x446
end
setenv("is", {
  _stash = true,
  macro = __is__macro
})
local function __in__macro(...)
  local __args27 = unstash({...})
  return join({"%in"}, __args27)
end
setenv("in", {
  _stash = true,
  macro = __in__macro
})
local function __as__macro(...)
  local __args28 = unstash({...})
  return join({"%as"}, __args28)
end
setenv("as", {
  _stash = true,
  macro = __as__macro
})
local function ___37expand_case__macro(x, ...)
  local ____r164 = unstash({...})
  local __x454 = destash33(x, ____r164)
  local ____id65 = ____r164
  local __body34 = cut(____id65, 0)
  local __e23 = nil
  if atom63(__x454) then
    __e23 = {__x454}
  else
    __e23 = __x454
  end
  local ____id66 = __e23
  local __a14 = has(____id66, 1)
  local __bs13 = cut(____id66, 1)
  local __e24 = nil
  if none63(__bs13) then
    __e24 = {{"%literal"}}
  else
    __e24 = __bs13
  end
  return join({"%block", __a14}, __e24, __body34)
end
setenv("%expand-case", {
  _stash = true,
  macro = ___37expand_case__macro
})
local function ___37cases__macro(...)
  local __args29 = unstash({...})
  if none63(__args29) then
    return {"do"}
  else
    if one63(__args29) then
      return join({"%expand-case"}, hd(__args29))
    else
      local __r165 = unique("r")
      return join({"with", __r165, "nil"}, map(function (__x463)
        local ____id67 = __x463
        local __x464 = has(____id67, 1)
        local __body35 = cut(____id67, 1)
        return {"%expand-case", __x464, {"%set", __r165, join({"%do"}, __body35)}}
      end, almost(__args29)), {join({"%expand-case"}, last(__args29))})
    end
  end
end
setenv("%cases", {
  _stash = true,
  macro = ___37cases__macro
})
local function __try__macro(x, ...)
  local ____r167 = unstash({...})
  local __x471 = destash33(x, ____r167)
  local ____id68 = ____r167
  local __cases = cut(____id68, 0)
  local __fin = {"finally"}
  local ____o22 = __cases
  local ____i38 = nil
  for ____i38 in next, ____o22 do
    local __x473 = ____o22[____i38]
    if hd63(__x473, "finally") then
      __fin = __x473
    end
  end
  local __forms3 = {}
  local ____x476 = __cases
  local ____i39 = 0
  while ____i39 < _35(____x476) do
    local ____id69 = ____x476[____i39 + 1]
    local __x477 = has(____id69, 1)
    local __body36 = cut(____id69, 1)
    if __x477 == "finally" then
    else
      if __x477 == "except" and has(__body36, 1) == "as" then
        local ____id70 = __body36
        local __kind = has(____id70, 1)
        local ___ = has(____id70, 2)
        local __name10 = has(____id70, 3)
        local __body37 = cut(____id70, 3)
        add(__forms3, join({{__x477, {"%as", __kind, __name10}}}, __body37))
      else
        if __x477 == "except" then
          local ____id71 = __body36
          local __kind1 = has(____id71, 1)
          local __body38 = cut(____id71, 1)
          add(__forms3, join({{__x477, __kind1}}, __body38))
        else
          error("Unknown try clause")
        end
      end
    end
    ____i39 = ____i39 + 1
  end
  return join({"%cases", {"try", __x471}}, __forms3, {__fin})
end
setenv("try", {
  _stash = true,
  macro = __try__macro
})
local function __eif__macro(var, expr, fail, ok)
  if nil63(expr) then
    expr = "nil"
  end
  if nil63(fail) then
    fail = "nil"
  end
  if nil63(ok) then
    ok = "nil"
  end
  local __ok63 = unique("ok?")
  return {"let", {{__ok63, var}, {"guard", expr}}, {"if", __ok63, ok, fail}}
end
setenv("eif", {
  _stash = true,
  macro = __eif__macro
})
local function __errsafe__macro(x, _else)
  if nil63(_else) then
    _else = "nil"
  end
  local __ok4 = unique("ok")
  local __v26 = unique("v")
  return {"let", {{__ok4, __v26}, {"guard", x}}, {"if", __ok4, __v26, _else}}
end
setenv("errsafe", {
  _stash = true,
  macro = __errsafe__macro
})
local function __dbg__macro()
  local ____x494 = object({"target", {"do"}})
  ____x494.py = {"do", {"import", "pdb"}, {{"idx", "pdb", "set-trace"}}}
  return ____x494
end
setenv("dbg", {
  _stash = true,
  macro = __dbg__macro
})
function prcode(form)
  return print(str(expand({"%set", "lumen-result", form})))
end
local function __see__macro(form)
  local __form3 = expand(form)
  print(compile(expand({"%set", "lumen-result", __form3})))
  return __form3
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
local function ___37ampersand__macro(x)
  return {"%ptr", x}
end
setenv("%ampersand", {
  _stash = true,
  macro = ___37ampersand__macro
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
    local __c3 = "  "
    local __nl = nil
    print("(")
    local ____x504 = x
    local ____i40 = 0
    while ____i40 < _35(____x504) do
      local __v27 = ____x504[____i40 + 1]
      if __nl then
        print("")
      end
      disp(__c3)
      __nl = true
      __c3 = "  "
      print(str(__v27))
      ____i40 = ____i40 + 1
    end
    return print(")")
  else
    return print(str(x))
  end
end
function dir(x)
  local __r178 = {}
  local ____o23 = x
  local __k21 = nil
  for __k21 in next, ____o23 do
    local __v28 = ____o23[__k21]
    add(__r178, __k21)
  end
  return __r178
end
function lines(x)
  return split(x, "\n")
end
function get_indentation(s)
  local __r181 = ""
  local __i42 = 0
  while __i42 < _35(s) do
    local __c4 = char(s, __i42)
    if __c4 == " " then
      __r181 = __r181 .. __c4
    end
    __i42 = __i42 + 1
  end
  return __r181
end
function strip_outer(s, lh, rh)
  if string_starts63(s, lh) and string_ends63(s, rh) then
    return clip(clip(s, 0, _35(s) - _35(rh)), _35(lh))
  else
    return s
  end
end
function simple_id63(x)
  local ____id72 = {xpcall(function ()
    return reader.read_string(x)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e25 = nil
      if string63(m) then
        __e25 = clip(m, search(m, ": ") + 2)
      else
        local __e26 = nil
        if nil63(m) then
          __e26 = ""
        else
          __e26 = str(m)
        end
        __e25 = __e26
      end
      return {
        stack = debug.traceback(),
        message = __e25
      }
    end
  end)}
  local ____ok5 = has(____id72, 1)
  local ____v29 = has(____id72, 2)
  local __e27 = nil
  if ____ok5 then
    __e27 = ____v29
  else
    __e27 = nil
  end
  local __r184 = __e27
  if __r184 == x then
    return __r184
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
  local __form4 = eval_self_form(form)
  local ____id73 = {xpcall(function ()
    return compiler.eval(__form4)
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
  local __ok6 = has(____id73, 1)
  local __v30 = has(____id73, 2)
  local __ex = has(____id73, 3)
  if not __ok6 then
    return print_exception(__v30, __ex)
  else
    if is63(__v30) then
      return toplevel_print(__v30)
    end
  end
end
function read_toplevel(str, more)
  local __s2 = reader.stream(str, more)
  local ____id74 = {xpcall(function ()
    return reader.read_all(__s2)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e30 = nil
      if string63(m) then
        __e30 = clip(m, search(m, ": ") + 2)
      else
        local __e31 = nil
        if nil63(m) then
          __e31 = ""
        else
          __e31 = str(m)
        end
        __e30 = __e31
      end
      return {
        stack = debug.traceback(),
        message = __e30
      }
    end
  end)}
  local ____ok7 = has(____id74, 1)
  local ____v31 = has(____id74, 2)
  local __e32 = nil
  if ____ok7 then
    __e32 = ____v31
  else
    __e32 = nil
  end
  local __x514 = __e32
  if __x514 == more then
    return more
  else
    if nil63(__x514) then
      return __x514
    else
      if one63(__x514) then
        return hd(__x514)
      else
        return __x514
      end
    end
  end
end
local function rep(str)
  local __v32 = eval(read_toplevel(str))
  if is63(__v32) then
    return toplevel_print(__v32)
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
    local __form5 = read_toplevel(o.buf, __more)
    if not( __form5 == __more) then
      eval_print(__form5)
      return reset()
    end
  end
  reset()
  while true do
    local __s3 = system.read_line(ctrl_c)
    if not( __s3 == ctrl_c) then
      if is63(__s3) then
        rep1(__s3 .. "\n")
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
  local __s4 = reader.stream(read_file(path))
  return reader.read_all(__s4)
end
function expand_file(path)
  local __body39 = read_from_file(path)
  return compiler.expand(join({"do"}, __body39))
end
function compile_file(path)
  local __form6 = expand_file(path)
  return compiler.compile(__form6, {
    _stash = true,
    stmt = true
  })
end
function _load(path)
  local ____prev1 = has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = "lua"
  local ____id75 = {xpcall(function ()
    local ____prev2 = has(setenv("indent-level", {
      _stash = true,
      toplevel = true
    }), "value")
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = 0
    local ____id76 = {xpcall(function ()
      return compile_file(path)
    end, function (m)
      if obj63(m) then
        return m
      else
        local __e33 = nil
        if string63(m) then
          __e33 = clip(m, search(m, ": ") + 2)
        else
          local __e34 = nil
          if nil63(m) then
            __e34 = ""
          else
            __e34 = str(m)
          end
          __e33 = __e34
        end
        return {
          stack = debug.traceback(),
          message = __e33
        }
      end
    end)}
    local ____ok9 = has(____id76, 1)
    local ____x521 = has(____id76, 2)
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = ____prev2
    if ____ok9 then
      return ____x521
    else
      error(____x521)
    end
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e35 = nil
      if string63(m) then
        __e35 = clip(m, search(m, ": ") + 2)
      else
        local __e36 = nil
        if nil63(m) then
          __e36 = ""
        else
          __e36 = str(m)
        end
        __e35 = __e36
      end
      return {
        stack = debug.traceback(),
        message = __e35
      }
    end
  end)}
  local ____ok8 = has(____id75, 1)
  local ____x518 = has(____id75, 2)
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = ____prev1
  local __e37 = nil
  if ____ok8 then
    __e37 = ____x518
  else
    error(____x518)
    __e37 = nil
  end
  local __code = __e37
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
      local __expr5 = nil
      local __argv = system.argv
      local __i43 = 0
      while __i43 < _35(__argv) do
        local __a15 = __argv[__i43 + 1]
        if __a15 == "-c" or (__a15 == "-o" or (__a15 == "-t" or __a15 == "-e")) then
          if __i43 == edge(__argv) then
            print("missing argument for " .. __a15)
          else
            __i43 = __i43 + 1
            local __val1 = __argv[__i43 + 1]
            if __a15 == "-c" then
              __input = __val1
            else
              if __a15 == "-o" then
                __output = __val1
              else
                if __a15 == "-t" then
                  __target1 = __val1
                else
                  if __a15 == "-e" then
                    __expr5 = __val1
                  end
                end
              end
            end
          end
        else
          if not( "-" == char(__a15, 0)) then
            add(__pre, __a15)
          end
        end
        __i43 = __i43 + 1
      end
      local ____x524 = __pre
      local ____i44 = 0
      while ____i44 < _35(____x524) do
        local __file = ____x524[____i44 + 1]
        run_file(__file)
        ____i44 = ____i44 + 1
      end
      if nil63(__input) then
        if __expr5 then
          return rep(__expr5)
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
