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
  return nil63(x) or string63(x) or number63(x) or boolean63(x)
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
function clip(s, _from, upto)
  return string.sub(s, _from + 1, upto)
end
function dupe(x)
  return {}
end
function cut(x, _from, upto)
  local __l2 = dupe(x)
  local __j = 0
  local __e8 = nil
  if nil63(_from) or _from < 0 then
    __e8 = 0
  else
    __e8 = _from
  end
  local __i3 = __e8
  local __n4 = _35(x)
  local __e9 = nil
  if nil63(upto) or upto > __n4 then
    __e9 = __n4
  else
    __e9 = upto
  end
  local __upto1 = __e9
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
function keys(x)
  local __t = dupe(x)
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
  local __e10 = nil
  if n then
    __e10 = n + 1
  end
  return string.byte(s, __e10)
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
  local __l11 = keys(l)
  local __i6 = edge(l)
  while __i6 >= 0 do
    add(__l11, l[__i6 + 1])
    __i6 = __i6 - 1
  end
  return __l11
end
function reduce(f, x)
  if none63(x) then
    return nil
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
  local __r44 = {}
  local ____x3 = __ls
  local ____i7 = 0
  while ____i7 < _35(____x3) do
    local __l3 = ____x3[____i7 + 1]
    if __l3 then
      local __n7 = _35(__r44)
      local ____o5 = __l3
      local __k5 = nil
      for __k5 in next, ____o5 do
        local __v5 = ____o5[__k5]
        if number63(__k5) then
          __k5 = __k5 + __n7
        else
          __l3 = object(__l3)
        end
        __r44[__k5] = __v5
      end
    end
    ____i7 = ____i7 + 1
  end
  return __r44
end
function find(f, t)
  local ____o6 = t
  local ____i9 = nil
  for ____i9 in next, ____o6 do
    local __x4 = ____o6[____i9]
    local __y = f(__x4)
    if __y then
      return __y
    end
  end
end
function first(f, l)
  local ____x5 = l
  local ____i10 = 0
  while ____i10 < _35(____x5) do
    local __x6 = ____x5[____i10 + 1]
    local __y1 = f(__x6)
    if __y1 then
      return __y1
    end
    ____i10 = ____i10 + 1
  end
end
function in63(x, t)
  return find(function (y)
    return x == y
  end, t)
end
function pair(l)
  local __l12 = dupe(l)
  local __n10 = _35(l)
  local __i11 = 0
  while __i11 < __n10 do
    local __a = l[__i11 + 1]
    local __b = l[__i11 + 1 + 1]
    add(__l12, {__a, __b})
    __i11 = __i11 + 1
    __i11 = __i11 + 1
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
  local __t1 = dupe(x)
  local ____x8 = x
  local ____i12 = 0
  while ____i12 < _35(____x8) do
    local __v6 = ____x8[____i12 + 1]
    local __y2 = f(__v6)
    if is63(__y2) then
      add(__t1, __y2)
    end
    ____i12 = ____i12 + 1
  end
  local ____o7 = x
  local __k6 = nil
  for __k6 in next, ____o7 do
    local __v7 = ____o7[__k6]
    if not number63(__k6) then
      local __y3 = f(__v7)
      if is63(__y3) then
        __t1[__k6] = __y3
      end
    end
  end
  return __t1
end
function mapcat(f, x, sep)
  local __r55 = ""
  local __c = ""
  local ____x9 = x
  local ____i14 = 0
  while ____i14 < _35(____x9) do
    local __v8 = ____x9[____i14 + 1]
    local __e11 = nil
    if f then
      __e11 = f(__v8)
    else
      __e11 = __v8
    end
    local __y4 = __e11
    if is63(__y4) then
      __r55 = __r55 .. __c .. __y4
      __c = sep or ""
    end
    ____i14 = ____i14 + 1
  end
  return __r55
end
function keep(f, x)
  return map(function (v)
    if yes(f(v)) then
      return v
    end
  end, x)
end
function keys63(t)
  local ____o8 = t
  local __k7 = nil
  for __k7 in next, ____o8 do
    local __v9 = ____o8[__k7]
    if not number63(__k7) then
      return true
    end
  end
  return false
end
function empty63(t)
  local ____o9 = t
  local ____i16 = nil
  for ____i16 in next, ____o9 do
    local __x10 = ____o9[____i16]
    return false
  end
  return true
end
function stash(args)
  if keys63(args) then
    local __p = {}
    local ____o10 = args
    local __k8 = nil
    for __k8 in next, ____o10 do
      local __v10 = ____o10[__k8]
      if not number63(__k8) then
        __p[__k8] = __v10
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
      local ____o11 = __l4
      local __k9 = nil
      for __k9 in next, ____o11 do
        local __v11 = ____o11[__k9]
        if not( __k9 == "_stash") then
          __args1[__k9] = __v11
        end
      end
      if params then
        local ____o12 = params
        local __k10 = nil
        for __k10 in next, ____o12 do
          local __v12 = ____o12[__k10]
          __args1[__k10] = __v12
        end
      end
      return __args1
    else
      if params then
        local __args11 = object(args)
        local ____o13 = params
        local __k11 = nil
        for __k11 in next, ____o13 do
          local __v13 = ____o13[__k11]
          __args11[__k11] = __v13
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
    local ____o14 = l
    local __k12 = nil
    for __k12 in next, ____o14 do
      local __v14 = ____o14[__k12]
      if not( __k12 == "_stash") then
        args1[__k12] = __v14
      end
    end
  else
    return l
  end
end
function search(s, pattern, start)
  local __e12 = nil
  if start then
    __e12 = start + 1
  end
  local __start = __e12
  local __i22 = string.find(s, pattern, __start, true)
  return __i22 and __i22 - 1
end
function split(s, sep)
  if s == "" or sep == "" then
    return {}
  else
    local __l5 = {}
    local __n19 = _35(sep)
    while true do
      local __i23 = search(s, sep)
      if nil63(__i23) then
        break
      else
        add(__l5, clip(s, 0, __i23))
        s = clip(s, __i23 + __n19)
      end
    end
    add(__l5, s)
    return __l5
  end
end
local function tostr(x)
  if string63(x) then
    return x
  else
    if nil63(x) then
      return ""
    else
      return _str(x)
    end
  end
end
local function cat2(a, b)
  return a .. b
end
function cat(...)
  local __xs = unstash({...})
  return either(reduce(function (a, b)
    return cat2(a, b)
  end, __xs), "")
end
function _43(...)
  local __xs1 = unstash({...})
  return either(reduce(function (a, b)
    return a + b
  end, __xs1), 0)
end
function _45(...)
  local __xs2 = unstash({...})
  return either(reduce(function (b, a)
    return a - b
  end, reverse(__xs2)), 0)
end
function _42(...)
  local __xs3 = unstash({...})
  return either(reduce(function (a, b)
    return a * b
  end, __xs3), 1)
end
function _47(...)
  local __xs4 = unstash({...})
  return either(reduce(function (b, a)
    return a / b
  end, reverse(__xs4)), 1)
end
function _37(...)
  local __xs5 = unstash({...})
  return either(reduce(function (b, a)
    return a % b
  end, reverse(__xs5)), 0)
end
local function pairwise(f, xs)
  local __i24 = 0
  while __i24 < edge(xs) do
    local __a1 = xs[__i24 + 1]
    local __b1 = xs[__i24 + 1 + 1]
    if not f(__a1, __b1) then
      return false
    end
    __i24 = __i24 + 1
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
  local __n20 = _35(s)
  local __i25 = 0
  while __i25 < __n20 do
    if not number_code63(code(s, __i25)) then
      return false
    end
    __i25 = __i25 + 1
  end
  return some63(s)
end
function escape(s)
  if nil63(search(s, "\n")) and nil63(search(s, "\r")) and nil63(search(s, "\"")) and nil63(search(s, "\\")) then
    return "\"" .. s .. "\""
  else
    local __s1 = "\""
    local __i26 = 0
    while __i26 < _35(s) do
      local __c1 = char(s, __i26)
      local __e13 = nil
      if __c1 == "\n" then
        __e13 = "\\n"
      else
        local __e14 = nil
        if __c1 == "\r" then
          __e14 = "\\r"
        else
          local __e15 = nil
          if __c1 == "\"" then
            __e15 = "\\\""
          else
            local __e16 = nil
            if __c1 == "\\" then
              __e16 = "\\\\"
            else
              __e16 = __c1
            end
            __e15 = __e16
          end
          __e14 = __e15
        end
        __e13 = __e14
      end
      local __c11 = __e13
      __s1 = __s1 .. __c11
      __i26 = __i26 + 1
    end
    return __s1 .. "\""
  end
end
function _str(x, repr, stack)
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
                        return "|" .. tostring(x) .. "|"
                      end
                    else
                      local __s = "("
                      local __sp = ""
                      local __xs11 = {}
                      local __ks = {}
                      local __l6 = stack or {}
                      add(__l6, x)
                      local ____o15 = x
                      local __k13 = nil
                      for __k13 in next, ____o15 do
                        local __v15 = ____o15[__k13]
                        if number63(__k13) then
                          __xs11[__k13] = _str(__v15, repr, __l6)
                        else
                          if not string63(__k13) then
                            __k13 = _str(__k13, repr, __l6)
                          end
                          add(__ks, {__k13 .. ":", _str(__v15, repr, __l6)})
                        end
                      end
                      sort(__ks, function (__x23, __x24)
                        local ____id = __x23
                        local __a2 = has(____id, 1)
                        local ____id1 = __x24
                        local __b2 = has(____id1, 1)
                        return __a2 < __b2
                      end)
                      drop(__l6)
                      local ____x25 = __xs11
                      local ____i28 = 0
                      while ____i28 < _35(____x25) do
                        local __v16 = ____x25[____i28 + 1]
                        __s = __s .. __sp .. __v16
                        __sp = " "
                        ____i28 = ____i28 + 1
                      end
                      local ____x26 = __ks
                      local ____i29 = 0
                      while ____i29 < _35(____x26) do
                        local ____id2 = ____x26[____i29 + 1]
                        local __k14 = has(____id2, 1)
                        local __v17 = has(____id2, 2)
                        __s = __s .. __sp .. __k14 .. " " .. __v17
                        __sp = " "
                        ____i29 = ____i29 + 1
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
local values = unpack or table.unpack
function apply(f, args)
  local __args = stash(args)
  return f(values(__args))
end
function call(f, ...)
  local ____r86 = unstash({...})
  local __f1 = destash33(f, ____r86)
  local ____id3 = ____r86
  local __args12 = cut(____id3, 0)
  return apply(__f1, __args12)
end
function setenv(k, ...)
  local ____r87 = unstash({...})
  local __k15 = destash33(k, ____r87)
  local ____id4 = ____r87
  local __keys = cut(____id4, 0)
  if string63(__k15) then
    local __e17 = nil
    if has63(__keys, "toplevel") then
      __e17 = hd(environment)
    else
      __e17 = last(environment)
    end
    local __frame = __e17
    local __e18 = nil
    if has63(__frame, __k15) then
      __e18 = __frame[__k15]
    else
      __e18 = {}
    end
    local __entry = __e18
    local ____o16 = __keys
    local __k16 = nil
    for __k16 in next, ____o16 do
      local __v18 = ____o16[__k16]
      if not( __k16 == "toplevel") then
        __entry[__k16] = __v18
      end
    end
    __frame[__k15] = __entry
    return __frame[__k15]
  end
end
function _print(x)
  return print(x)
end
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
setenv("target", {_stash = true, toplevel = true, value = either(has(setenv("target", {_stash = true, toplevel = true}), "value"), "lua")})
setenv("target", {_stash = true, symbol = {"get-value", {"quote", "target"}}})
setenv("quote", {_stash = true, macro = function (form)
  return quoted(form)
end})
setenv("quasiquote", {_stash = true, macro = function (form)
  return quasiexpand(form, 1)
end})
setenv("set", {_stash = true, macro = function (...)
  local __args3 = unstash({...})
  return join({"do"}, map(function (__x38)
    local ____id6 = __x38
    local __lh1 = has(____id6, 1)
    local __rh1 = has(____id6, 2)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has" then
      return {"%set", join({"get"}, tl(__lh1)), __rh1}
    else
      return {"%set", __lh1, __rh1}
    end
  end, pair(__args3)))
end})
setenv("at", {_stash = true, macro = function (l, i)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" and number63(i) then
    i = i + 1
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
      i = {"+", i, 1}
    end
  end
  return {"get", l, i}
end})
setenv("wipe", {_stash = true, macro = function (place)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    return {"set", place, "nil"}
  else
    return {"%delete", place}
  end
end})
setenv("list", {_stash = true, macro = function (...)
  local __body2 = unstash({...})
  if _35(__body2) > 2 and __body2[2] == "for" and __body2[4] == "in" then
    local ____id10 = __body2
    local __expr2 = has(____id10, 1)
    local __body3 = cut(____id10, 1)
    local __comps1 = {}
    local __cond1 = nil
    while _35(__body3) > 2 and __body3[1] == "for" and __body3[3] == "in" do
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
    local __x64 = unique("x")
    local __l10 = {}
    local __forms1 = {}
    local ____o18 = __body2
    local __k19 = nil
    for __k19 in next, ____o18 do
      local __v20 = ____o18[__k19]
      if number63(__k19) then
        __l10[__k19] = __v20
      else
        add(__forms1, {"set", {"get", __x64, {"quote", __k19}}, __v20})
      end
    end
    if some63(__forms1) then
      return join({"let", __x64, {"object", join({"%array"}, __l10)}}, __forms1, {__x64})
    else
      return join({"%array"}, __l10)
    end
  end
end})
setenv("if", {_stash = true, macro = function (...)
  local __branches1 = unstash({...})
  return hd(expand_if(__branches1))
end})
setenv("case", {_stash = true, macro = function (expr, ...)
  local ____r102 = unstash({...})
  local __expr5 = destash33(expr, ____r102)
  local ____id15 = ____r102
  local __clauses1 = cut(____id15, 0)
  local __x86 = unique("x")
  local __eq1 = function (_)
    return {"=", {"quote", _}, __x86}
  end
  local __cl1 = function (__x89)
    local ____id16 = __x89
    local __a4 = has(____id16, 1)
    local __b4 = has(____id16, 2)
    if nil63(__b4) then
      return {__a4}
    else
      if string63(__a4) or number63(__a4) then
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
  return {"let", __x86, __expr5, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end})
setenv("when", {_stash = true, macro = function (cond, ...)
  local ____r106 = unstash({...})
  local __cond3 = destash33(cond, ____r106)
  local ____id18 = ____r106
  local __body5 = cut(____id18, 0)
  return {"if", __cond3, join({"do"}, __body5)}
end})
setenv("unless", {_stash = true, macro = function (cond, ...)
  local ____r108 = unstash({...})
  local __cond5 = destash33(cond, ____r108)
  local ____id20 = ____r108
  local __body7 = cut(____id20, 0)
  return {"if", {"not", __cond5}, join({"do"}, __body7)}
end})
setenv("obj", {_stash = true, macro = function (...)
  local __body9 = unstash({...})
  return join({"%object"}, mapo(function (x)
    return x
  end, __body9))
end})
setenv("let", {_stash = true, macro = function (bs, ...)
  local ____r112 = unstash({...})
  local __bs11 = destash33(bs, ____r112)
  local ____id25 = ____r112
  local __body111 = cut(____id25, 0)
  if atom63(__bs11) then
    return join({"let", {__bs11, hd(__body111)}}, tl(__body111))
  else
    if none63(__bs11) then
      return join({"do"}, __body111)
    else
      local ____id26 = __bs11
      local __lh3 = has(____id26, 1)
      local __rh3 = has(____id26, 2)
      local __bs21 = cut(____id26, 2)
      local ____id27 = bind(__lh3, __rh3)
      local __id28 = has(____id27, 1)
      local __val1 = has(____id27, 2)
      local __bs12 = cut(____id27, 2)
      local __renames1 = {}
      if not id_literal63(__id28) then
        local __id121 = unique(__id28)
        __renames1 = {__id28, __id121}
        __id28 = __id121
      end
      return {"do", {"%local", __id28, __val1}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body111)}}
    end
  end
end})
setenv("with", {_stash = true, macro = function (x, v, ...)
  local ____r114 = unstash({...})
  local __x137 = destash33(x, ____r114)
  local __v22 = destash33(v, ____r114)
  local ____id30 = ____r114
  local __body13 = cut(____id30, 0)
  if __v22 == "as" then
    return join({"%with", {"%as", __x137, hd(__body13)}}, tl(__body13))
  else
    if not atom63(__x137) or has(__body13, "async") then
      return join({"%with", __x137, __v22}, __body13)
    else
      return join({"let", {__x137, __v22}}, __body13, {__x137})
    end
  end
end})
setenv("let-when", {_stash = true, macro = function (x, v, ...)
  local ____r116 = unstash({...})
  local __x151 = destash33(x, ____r116)
  local __v24 = destash33(v, ____r116)
  local ____id32 = ____r116
  local __body15 = cut(____id32, 0)
  local __y6 = unique("y")
  return {"let", __y6, __v24, {"when", {"yes", __y6}, join({"let", {__x151, __y6}}, __body15)}}
end})
setenv("define-macro", {_stash = true, macro = function (name, args, ...)
  local ____r118 = unstash({...})
  local __name1 = destash33(name, ____r118)
  local __args5 = destash33(args, ____r118)
  local ____id34 = ____r118
  local __body17 = cut(____id34, 0)
  local ____x161 = object({"setenv", {"quote", __name1}})
  ____x161.macro = join({"fn", __args5}, __body17)
  local __form1 = ____x161
  _eval(__form1)
  return __form1
end})
setenv("define-special", {_stash = true, macro = function (name, args, ...)
  local ____r120 = unstash({...})
  local __name3 = destash33(name, ____r120)
  local __args7 = destash33(args, ____r120)
  local ____id36 = ____r120
  local __body19 = cut(____id36, 0)
  local ____x168 = object({"setenv", {"quote", __name3}})
  ____x168.special = join({"fn", __args7}, __body19)
  local __form3 = join(____x168, keys(__body19))
  _eval(__form3)
  return __form3
end})
setenv("define-symbol", {_stash = true, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  local ____x174 = object({"setenv", {"quote", name}})
  ____x174.symbol = {"quote", expansion}
  return ____x174
end})
setenv("define-reader", {_stash = true, macro = function (__x182, ...)
  local ____r124 = unstash({...})
  local ____x182 = destash33(__x182, ____r124)
  local ____id39 = ____x182
  local __char1 = has(____id39, 1)
  local __s2 = has(____id39, 2)
  local ____id40 = ____r124
  local __body21 = cut(____id40, 0)
  return {"set", {"get", "read-table", __char1}, join({"fn", {__s2}}, __body21)}
end})
setenv("define", {_stash = true, macro = function (name, x, ...)
  local ____r126 = unstash({...})
  local __name5 = destash33(name, ____r126)
  local __x192 = destash33(x, ____r126)
  local ____id42 = ____r126
  local __body23 = cut(____id42, 0)
  setenv(__name5, {_stash = true, variable = true})
  if some63(__body23) then
    return join({"%local-function", __name5}, bind42(__x192, __body23), keys(__body23))
  else
    return join({"%local", __name5, __x192}, keys(__body23))
  end
end})
setenv("define-global", {_stash = true, macro = function (name, x, ...)
  local ____r128 = unstash({...})
  local __name7 = destash33(name, ____r128)
  local __x199 = destash33(x, ____r128)
  local ____id44 = ____r128
  local __body25 = cut(____id44, 0)
  setenv(__name7, {_stash = true, toplevel = true, variable = true})
  if some63(__body25) then
    return join({"%global-function", __name7}, bind42(__x199, __body25), keys(__body25))
  else
    return join({"set", __name7, __x199}, keys(__body25))
  end
end})
setenv("get-value", {_stash = true, macro = function (x)
  local ____x206 = object({"setenv", x})
  ____x206.toplevel = true
  return {"has", ____x206, {"quote", "value"}}
end})
setenv("define-constant", {_stash = true, macro = function (name, x)
  local ____x217 = object({"setenv", {"quote", name}})
  ____x217.toplevel = true
  ____x217.value = either(x, {"get-value", {"quote", name}})
  return {"do", ____x217, {"define-symbol", name, {"get-value", {"quote", name}}}}
end})
setenv("define-variable", {_stash = true, macro = function (name, x)
  if is63(x) then
    return {"define-constant", name, {"either", {"get-value", {"quote", name}}, x}}
  else
    return {"define-constant", name}
  end
end})
setenv("after", {_stash = true, macro = function (x, ...)
  local ____r137 = unstash({...})
  local __x241 = destash33(x, ____r137)
  local ____id46 = ____r137
  local __body27 = cut(____id46, 0)
  local __r138 = unique("r")
  return {"with", __r138, "nil", {"%block", "try", "||", {"set", __r138, __x241}}, {"%block", "finally", "||", join({"do"}, __body27)}}
end})
setenv("with-frame", {_stash = true, macro = function (...)
  local __body29 = unstash({...})
  local __x258 = unique("x")
  local __forms3 = {}
  local ____o20 = __body29
  local __k22 = nil
  for __k22 in next, ____o20 do
    local __v26 = ____o20[__k22]
    if not number63(__k22) then
      local ____x262 = object({"setenv", {"quote", __k22}})
      ____x262.value = __v26
      add(__forms3, ____x262)
    end
  end
  return join({"do", {"add", "environment", {"obj"}}}, __forms3, {{"with", __x258, join({"do"}, __body29), {"drop", "environment"}}})
end})
setenv("with-bindings", {_stash = true, macro = function (__x273, ...)
  local ____r140 = unstash({...})
  local ____x273 = destash33(__x273, ____r140)
  local ____id49 = ____x273
  local __names3 = has(____id49, 1)
  local ____id50 = ____r140
  local __body31 = cut(____id50, 0)
  local __x275 = unique("x")
  local ____x278 = object({"setenv", __x275})
  ____x278.variable = true
  return join({"with-frame", {"each", __x275, __names3, ____x278}}, __body31)
end})
setenv("let-macro", {_stash = true, macro = function (definitions, ...)
  local ____r143 = unstash({...})
  local __definitions1 = destash33(definitions, ____r143)
  local ____id52 = ____r143
  local __body33 = cut(____id52, 0)
  add(environment, {})
  map(function (m)
    return macroexpand(join({"define-macro"}, m))
  end, __definitions1)
  local ____x283 = join({"do"}, macroexpand(__body33))
  drop(environment)
  return ____x283
end})
setenv("let-symbol", {_stash = true, macro = function (expansions, ...)
  local ____r147 = unstash({...})
  local __expansions1 = destash33(expansions, ____r147)
  local ____id55 = ____r147
  local __body35 = cut(____id55, 0)
  add(environment, {})
  map(function (__x292)
    local ____id56 = __x292
    local __name9 = has(____id56, 1)
    local __exp1 = has(____id56, 2)
    return macroexpand({"define-symbol", __name9, __exp1})
  end, pair(__expansions1))
  local ____x291 = join({"do"}, macroexpand(__body35))
  drop(environment)
  return ____x291
end})
setenv("let-unique", {_stash = true, macro = function (names, ...)
  local ____r151 = unstash({...})
  local __names5 = destash33(names, ____r151)
  local ____id58 = ____r151
  local __body37 = cut(____id58, 0)
  local __bs3 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names5)
  return join({"let", apply(join, __bs3)}, __body37)
end})
setenv("fn", {_stash = true, macro = function (args, ...)
  local ____r154 = unstash({...})
  local __args9 = destash33(args, ____r154)
  local ____id60 = ____r154
  local __body39 = cut(____id60, 0)
  return join({"%function"}, bind42(__args9, __body39), keys(__body39))
end})
setenv("apply", {_stash = true, macro = function (f, ...)
  local ____r156 = unstash({...})
  local __f3 = destash33(f, ____r156)
  local ____id62 = ____r156
  local __args111 = cut(____id62, 0)
  if _35(__args111) > 1 then
    return {"%call", "apply", __f3, {"join", join({"list"}, almost(__args111)), last(__args111), join({"list"}, keys(__args111))}}
  else
    if keys63(__args111) then
      return {"%call", "apply", __f3, join({"join"}, __args111, {join({"list"}, keys(__args111))})}
    else
      return join({"%call", "apply", __f3}, __args111)
    end
  end
end})
setenv("guard", {_stash = true, macro = function (expr)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" or has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    return {{"fn", join(), {"%try", {"list", true, expr}}}}
  else
    local ____x358 = object({"obj"})
    ____x358.stack = {{"idx", "debug", "traceback"}}
    ____x358.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
    return {"list", {"xpcall", {"fn", join(), expr}, {"fn", {"m"}, {"if", {"obj?", "m"}, "m", ____x358}}}}
  end
end})
setenv("each", {_stash = true, macro = function (x, t, ...)
  local ____r160 = unstash({...})
  local __x386 = destash33(x, ____r160)
  local __t3 = destash33(t, ____r160)
  local ____id65 = ____r160
  local __body41 = cut(____id65, 0)
  local __o22 = unique("o")
  local __n28 = unique("n")
  local __i36 = unique("i")
  local __e19 = nil
  if atom63(__x386) then
    __e19 = {__i36, __x386}
  else
    local __e20 = nil
    if _35(__x386) > 1 then
      __e20 = __x386
    else
      __e20 = {__i36, hd(__x386)}
    end
    __e19 = __e20
  end
  local ____id66 = __e19
  local __k24 = has(____id66, 1)
  local __v28 = has(____id66, 2)
  local ____x392 = object({"target", __o22})
  ____x392.py = {"indices", __o22}
  local __e21 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" or has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    __e21 = __body41
  else
    __e21 = {join({"let", __k24, {"if", {"numeric?", __k24}, {"parseInt", __k24}, __k24}}, __body41)}
  end
  return {"let", {__o22, __t3, __k24, "nil"}, join({"%for", ____x392, __k24}, keys(__body41), {join({"let", {__v28, {"get", __o22, __k24}}}, __e21)})}
end})
setenv("for", {_stash = true, macro = function (i, to, ...)
  local ____r162 = unstash({...})
  local __i38 = destash33(i, ____r162)
  local __to1 = destash33(to, ____r162)
  local ____id68 = ____r162
  local __body43 = cut(____id68, 0)
  if __to1 == "in" then
    return join({"%for", hd(__body43), __i38, join({"do"}, tl(__body43))}, keys(__body43))
  else
    return {"let", __i38, 0, join({"while", {"<", __i38, __to1}}, __body43, {{"inc", __i38}})}
  end
end})
setenv("step", {_stash = true, macro = function (v, t, ...)
  local ____r164 = unstash({...})
  local __v30 = destash33(v, ____r164)
  local __t5 = destash33(t, ____r164)
  local ____id70 = ____r164
  local __body45 = cut(____id70, 0)
  local __x427 = unique("x")
  local __i40 = unique("i")
  return {"let", {__x427, __t5}, {"for", __i40, {"#", __x427}, join({"let", {__v30, {"at", __x427, __i40}}}, __body45)}}
end})
setenv("set-of", {_stash = true, macro = function (...)
  local __xs13 = unstash({...})
  local __l121 = {}
  local ____o24 = __xs13
  local ____i42 = nil
  for ____i42 in next, ____o24 do
    local __x438 = ____o24[____i42]
    __l121[__x438] = true
  end
  return join({"obj"}, __l121)
end})
setenv("target?", {_stash = true, macro = function (x)
  return {"=", "target", x}
end})
setenv("target", {_stash = true, macro = function (...)
  local __clauses3 = unstash({...})
  if has63(__clauses3, has(setenv("target", {_stash = true, toplevel = true}), "value")) then
    return __clauses3[has(setenv("target", {_stash = true, toplevel = true}), "value")]
  else
    return hd(__clauses3)
  end
end})
setenv("language", {_stash = true, macro = function ()
  return {"quote", has(setenv("target", {_stash = true, toplevel = true}), "value")}
end})
setenv("join!", {_stash = true, macro = function (a, ...)
  local ____r170 = unstash({...})
  local __a6 = destash33(a, ____r170)
  local ____id72 = ____r170
  local __bs5 = cut(____id72, 0)
  return {"set", __a6, join({"join", __a6}, __bs5)}
end})
setenv("cat!", {_stash = true, macro = function (a, ...)
  local ____r172 = unstash({...})
  local __a8 = destash33(a, ____r172)
  local ____id74 = ____r172
  local __bs7 = cut(____id74, 0)
  return {"set", __a8, join({"cat", __a8}, __bs7)}
end})
setenv("inc", {_stash = true, macro = function (n, by)
  local __e22 = nil
  if nil63(by) then
    __e22 = 1
  else
    __e22 = by
  end
  return {"set", n, {"+", n, __e22}}
end})
setenv("dec", {_stash = true, macro = function (n, by)
  local __e23 = nil
  if nil63(by) then
    __e23 = 1
  else
    __e23 = by
  end
  return {"set", n, {"-", n, __e23}}
end})
setenv("with-indent", {_stash = true, macro = function (form)
  local __x468 = unique("x")
  return {"do", {"inc", "indent-level"}, {"with", __x468, form, {"dec", "indent-level"}}}
end})
setenv("export", {_stash = true, macro = function (...)
  local __names7 = unstash({...})
  local __forms5 = map(function (k)
    if k == compile(k) then
      return {"set", {"idx", "exports", k}, k}
    else
      return {"set", {"get", "exports", {"quote", k}}, k, {"idx", "exports", k}, k}
    end
  end, __names7)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    return join({"do"}, __forms5)
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
      return join({"let", "exports", {"or", "exports", {"obj"}}}, __forms5, {{"return", "exports"}})
    end
  end
end})
setenv("when-compiling", {_stash = true, macro = function (...)
  local __body47 = unstash({...})
  return _eval(join({"do"}, __body47))
end})
setenv("during-compilation", {_stash = true, macro = function (...)
  local __body49 = unstash({...})
  local __form5 = join({"do"}, __body49)
  _eval(__form5)
  return __form5
end})
setenv("def", {_stash = true, macro = function (name, ...)
  local ____r182 = unstash({...})
  local __name11 = destash33(name, ____r182)
  local ____id76 = ____r182
  local __body51 = cut(____id76, 0)
  return join({"define-global", __name11}, __body51)
end})
setenv("mac", {_stash = true, macro = function (name, ...)
  local ____r184 = unstash({...})
  local __name13 = destash33(name, ____r184)
  local ____id78 = ____r184
  local __body53 = cut(____id78, 0)
  return join({"define-macro", __name13}, __body53)
end})
setenv("defconst", {_stash = true, macro = function (name, ...)
  local ____r186 = unstash({...})
  local __name15 = destash33(name, ____r186)
  local ____id80 = ____r186
  local __value1 = cut(____id80, 0)
  return join({"def", __name15}, __value1)
end})
setenv("undefined?", {_stash = true, macro = function (name)
  local ____x522 = object({"target"})
  ____x522.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x522.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x522.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x522
end})
setenv("defvar", {_stash = true, macro = function (name, ...)
  local ____r190 = unstash({...})
  local __name17 = destash33(name, ____r190)
  local ____id82 = ____r190
  local __value3 = cut(____id82, 0)
  local ____x539 = object({"target"})
  ____x539.py = {"global", __name17}
  return {"when", {"undefined?", __name17}, ____x539, join({"defconst", __name17}, __value3)}
end})
setenv("+", {_stash = true, macro = function (...)
  local __args13 = unstash({...})
  if none63(__args13) then
    return 0
  else
    if one63(__args13) then
      return hd(__args13)
    else
      return join({"%add"}, __args13)
    end
  end
end})
setenv("-", {_stash = true, macro = function (...)
  local __args15 = unstash({...})
  if none63(__args15) then
    return 0
  else
    if one63(__args15) then
      return {"%unm", hd(__args15)}
    else
      return join({"%sub"}, __args15)
    end
  end
end})
setenv("*", {_stash = true, macro = function (...)
  local __args17 = unstash({...})
  if none63(__args17) then
    return 1
  else
    if one63(__args17) then
      return hd(__args17)
    else
      return join({"%mul"}, __args17)
    end
  end
end})
setenv("/", {_stash = true, macro = function (...)
  local __args19 = unstash({...})
  if none63(__args19) then
    return 1
  else
    if one63(__args19) then
      return hd(__args19)
    else
      return join({"%div"}, __args19)
    end
  end
end})
setenv("//", {_stash = true, macro = function (...)
  local __args21 = unstash({...})
  if none63(__args21) then
    return 1
  else
    if one63(__args21) then
      return hd(__args21)
    else
      return join({"%idiv"}, __args21)
    end
  end
end})
setenv("async", {_stash = true, macro = function (keyword, ...)
  local ____r192 = unstash({...})
  local __keyword1 = destash33(keyword, ____r192)
  local ____id84 = ____r192
  local __body55 = cut(____id84, 0)
  local ____x561 = object({__keyword1})
  ____x561.async = true
  return join(____x561, __body55)
end})
setenv("%read-from-file", {_stash = true, macro = function (name)
  return {"when-compiling", {"quasiquote", {"do", {"unquote-splicing", {"read-from-file", name}}}}}
end})
setenv("the", {_stash = true, macro = function (name)
  return {"getenv", {"quote", name}, {"quote", "value"}}
end})
local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
function toplevel_repr(v)
  return _str(v)
end
function toplevel_print(v)
  _print(toplevel_repr(v))
  return v
end
function print_exception(v, ex)
  _print("error: " .. v.message .. "\n" .. v.stack)
  return nil
end
function eval_print(form)
  local ____id85 = {xpcall(function ()
    return compiler._eval(form)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e24 = nil
      if string63(m) then
        __e24 = clip(m, search(m, ": ") + 2)
      else
        local __e25 = nil
        if nil63(m) then
          __e25 = ""
        else
          __e25 = _str(m)
        end
        __e24 = __e25
      end
      return {stack = debug.traceback(), message = __e24}
    end
  end)}
  local __ok = has(____id85, 1)
  local __v31 = has(____id85, 2)
  local __ex = has(____id85, 3)
  if not __ok then
    return print_exception(__v31, __ex)
  else
    if is63(__v31) then
      return toplevel_print(__v31)
    end
  end
end
local function rep(s)
  local __v32 = _eval(reader.read_string(s))
  if is63(__v32) then
    return toplevel_print(__v32)
  end
end
local function repl()
  local __o25 = {buf = ""}
  local function rep1(s)
    __o25.buf = __o25.buf .. s
    local __more = {}
    local __form6 = reader.read_string(__o25.buf, __more)
    if not( __form6 == __more) then
      eval_print(__form6)
      __o25.buf = ""
      system.write("> ")
      return system.flush()
    end
  end
  system.write("> ")
  system.flush()
  while true do
    local __s3 = system.read_line()
    if __s3 then
      rep1(__s3 .. "\n")
    else
      break
    end
  end
end
function read_from_file(path)
  local __s4 = reader.stream(system.read_file(path))
  return reader.read_all(__s4)
end
function expand_file(path)
  local __body56 = read_from_file(path)
  return compiler.expand(join({"do"}, __body56))
end
function compile_file(path)
  local __form7 = expand_file(path)
  return compiler.compile(__form7, {_stash = true, stmt = true})
end
function _load(path)
  local __previous = has(setenv("target", {_stash = true, toplevel = true}), "value")
  local __previous_indent = has(setenv("indent-level", {_stash = true, toplevel = true}), "value")
  setenv("target", {_stash = true, toplevel = true}).value = "lua"
  setenv("indent-level", {_stash = true, toplevel = true}).value = 0
  local __code = compile_file(path)
  setenv("indent-level", {_stash = true, toplevel = true}).value = __previous_indent
  setenv("target", {_stash = true, toplevel = true}).value = __previous
  return compiler.run(__code)
end
local function script_file63(path)
  return not( "-" == char(path, 0) or ".py" == clip(path, _35(path) - 3) or ".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4))
end
local function run_file(path)
  if script_file63(path) then
    return _load(path)
  else
    return compiler.run(system.read_file(path))
  end
end
local function usage()
  _print("usage: lumen [<file> <arguments> | options <object files>]")
  _print(" <file>\t\tProgram read from script file")
  _print(" <arguments>\tPassed to program in system.argv")
  _print(" <object files>\tLoaded before compiling <input>")
  _print("options:")
  _print(" -c <input>\tCompile input file")
  _print(" -o <output>\tOutput file")
  _print(" -t <target>\tTarget language (default: lua)")
  return _print(" -e <expr>\tExpression to evaluate")
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
      local __expr6 = nil
      local __argv = system.argv
      local __i43 = 0
      while __i43 < _35(__argv) do
        local __a9 = __argv[__i43 + 1]
        if __a9 == "-c" or __a9 == "-o" or __a9 == "-t" or __a9 == "-e" then
          if __i43 == edge(__argv) then
            _print("missing argument for " .. __a9)
          else
            __i43 = __i43 + 1
            local __val2 = __argv[__i43 + 1]
            if __a9 == "-c" then
              __input = __val2
            else
              if __a9 == "-o" then
                __output = __val2
              else
                if __a9 == "-t" then
                  __target1 = __val2
                else
                  if __a9 == "-e" then
                    __expr6 = __val2
                  end
                end
              end
            end
          end
        else
          if not( "-" == char(__a9, 0)) then
            add(__pre, __a9)
          end
        end
        __i43 = __i43 + 1
      end
      local ____x580 = __pre
      local ____i44 = 0
      while ____i44 < _35(____x580) do
        local __file = ____x580[____i44 + 1]
        run_file(__file)
        ____i44 = ____i44 + 1
      end
      if nil63(__input) then
        if __expr6 then
          return rep(__expr6)
        else
          return repl()
        end
      else
        if __target1 then
          setenv("target", {_stash = true, toplevel = true}).value = __target1
        end
        local __code1 = compile_file(__input)
        if nil63(__output) or __output == "-" then
          return _print(__code1)
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
