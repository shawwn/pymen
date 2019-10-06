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
function length(x)
  local __n2 = -1
  local ____o2 = x
  local __k2 = nil
  for __k2 in next, ____o2 do
    local __v2 = ____o2[__k2]
    if number63(__k2) then
      __k2 = __k2 - 1
      if __k2 > __n2 then
        __n2 = __k2
      end
    end
  end
  __n2 = __n2 + 1
  return __n2
end
function _35(x)
  return #x
end
function none63(x)
  return _35(x) == 0
end
function some63(x)
  return _35(x) > 0
end
function one63(x)
  return _35(x) == 1
end
function two63(x)
  return _35(x) == 2
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
function atom63(x)
  return nil63(x) or string63(x) or number63(x) or boolean63(x)
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
  local __e
  if nil63(_from) or _from < 0 then
    __e = 0
  else
    __e = _from
  end
  local __i3 = __e
  local __n4 = _35(x)
  local __e1
  if nil63(upto) or upto > __n4 then
    __e1 = __n4
  else
    __e1 = upto
  end
  local __upto = __e1
  while __i3 < __upto do
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
  local __e2
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
  local __r42 = {}
  local ____x2 = __ls
  local ____i7 = 0
  while ____i7 < _35(____x2) do
    local __l3 = ____x2[____i7 + 1]
    if __l3 then
      local __n7 = _35(__r42)
      local ____o5 = __l3
      local __k5 = nil
      for __k5 in next, ____o5 do
        local __v5 = ____o5[__k5]
        if number63(__k5) then
          __k5 = __k5 + __n7
        else
          __l3 = object(__l3)
        end
        __r42[__k5] = __v5
      end
    end
    ____i7 = ____i7 + 1
  end
  return __r42
end
function find(f, t)
  local ____o6 = t
  local ____i9 = nil
  for ____i9 in next, ____o6 do
    local __x3 = ____o6[____i9]
    local __y = f(__x3)
    if __y then
      return __y
    end
  end
end
function first(f, l)
  local ____x4 = l
  local ____i10 = 0
  while ____i10 < _35(____x4) do
    local __x5 = ____x4[____i10 + 1]
    local __y1 = f(__x5)
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
  local ____x7 = x
  local ____i12 = 0
  while ____i12 < _35(____x7) do
    local __v6 = ____x7[____i12 + 1]
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
  local __r53 = ""
  local __c = ""
  local ____x8 = x
  local ____i14 = 0
  while ____i14 < _35(____x8) do
    local __v8 = ____x8[____i14 + 1]
    local __e3
    if f then
      __e3 = f(__v8)
    else
      __e3 = __v8
    end
    local __y4 = __e3
    if is63(__y4) then
      __r53 = __r53 .. __c .. __y4
      __c = sep or ""
    end
    ____i14 = ____i14 + 1
  end
  return __r53
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
    local __x9 = ____o9[____i16]
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
  local __e4
  if start then
    __e4 = start + 1
  end
  local __start = __e4
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
  local __s1 = "\""
  local __i26 = 0
  while __i26 < _35(s) do
    local __c1 = char(s, __i26)
    local __e5
    if __c1 == "\n" then
      __e5 = "\\n"
    else
      local __e6
      if __c1 == "\r" then
        __e6 = "\\r"
      else
        local __e7
        if __c1 == "\"" then
          __e7 = "\\\""
        else
          local __e8
          if __c1 == "\\" then
            __e8 = "\\\\"
          else
            __e8 = __c1
          end
          __e7 = __e8
        end
        __e6 = __e7
      end
      __e5 = __e6
    end
    local __c11 = __e5
    __s1 = __s1 .. __c11
    __i26 = __i26 + 1
  end
  return __s1 .. "\""
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
                      sort(__ks, function (__x22, __x23)
                        local ____id = __x22
                        local __a2 = has(____id, 1)
                        local ____id1 = __x23
                        local __b2 = has(____id1, 1)
                        return __a2 < __b2
                      end)
                      drop(__l6)
                      local ____x24 = __xs11
                      local ____i28 = 0
                      while ____i28 < _35(____x24) do
                        local __v16 = ____x24[____i28 + 1]
                        __s = __s .. __sp .. __v16
                        __sp = " "
                        ____i28 = ____i28 + 1
                      end
                      local ____x25 = __ks
                      local ____i29 = 0
                      while ____i29 < _35(____x25) do
                        local ____id2 = ____x25[____i29 + 1]
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
  local ____r84 = unstash({...})
  local __f1 = destash33(f, ____r84)
  local ____id3 = ____r84
  local __args12 = cut(____id3, 0)
  return apply(__f1, __args12)
end
function setenv(k, ...)
  local ____r85 = unstash({...})
  local __k15 = destash33(k, ____r85)
  local ____id4 = ____r85
  local __keys = cut(____id4, 0)
  if string63(__k15) then
    local __e9
    if has63(__keys, "toplevel") then
      __e9 = hd(environment)
    else
      __e9 = last(environment)
    end
    local __frame = __e9
    local __e10
    if has63(__frame, __k15) then
      __e10 = __frame[__k15]
    else
      __e10 = {}
    end
    local __entry = __e10
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
  local __args1 = unstash({...})
  return join({"do"}, map(function (__x7)
    local ____id1 = __x7
    local __lh1 = has(____id1, 1)
    local __rh1 = has(____id1, 2)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has" then
      return {"%set", join({"get"}, tl(__lh1)), __rh1}
    else
      return {"%set", __lh1, __rh1}
    end
  end, pair(__args1)))
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
    local ____id5 = __body2
    local __expr2 = has(____id5, 1)
    local __body3 = cut(____id5, 1)
    local __comps1 = {}
    local __cond1 = nil
    while _35(__body3) > 2 and __body3[1] == "for" and __body3[3] == "in" do
      local ____id6 = __body3
      local ___for1 = has(____id6, 1)
      local __names1 = has(____id6, 2)
      local ___in1 = has(____id6, 3)
      local __l2 = has(____id6, 4)
      local __body12 = cut(____id6, 4)
      add(__comps1, {__names1, __l2})
      __body3 = __body12
    end
    if hd(__body3) == "if" then
      local ____id7 = __body3
      local ___if1 = has(____id7, 1)
      local __expr3 = has(____id7, 2)
      __cond1 = __expr3
    end
    return {"%list", __expr2, __comps1, __cond1}
  else
    local __x33 = unique("x")
    local __l3 = {}
    local __forms1 = {}
    local ____o1 = __body2
    local __k2 = nil
    for __k2 in next, ____o1 do
      local __v1 = ____o1[__k2]
      if number63(__k2) then
        __l3[__k2] = __v1
      else
        add(__forms1, {"set", {"get", __x33, {"quote", __k2}}, __v1})
      end
    end
    if some63(__forms1) then
      return join({"let", __x33, {"object", join({"%array"}, __l3)}}, __forms1, {__x33})
    else
      return join({"%array"}, __l3)
    end
  end
end})
setenv("if", {_stash = true, macro = function (...)
  local __branches1 = unstash({...})
  return hd(expand_if(__branches1))
end})
setenv("case", {_stash = true, macro = function (expr, ...)
  local ____r13 = unstash({...})
  local __expr5 = destash33(expr, ____r13)
  local ____id10 = ____r13
  local __clauses1 = cut(____id10, 0)
  local __x55 = unique("x")
  local __eq1 = function (_)
    return {"=", {"quote", _}, __x55}
  end
  local __cl1 = function (__x58)
    local ____id11 = __x58
    local __a1 = has(____id11, 1)
    local __b1 = has(____id11, 2)
    if nil63(__b1) then
      return {__a1}
    else
      if string63(__a1) or number63(__a1) then
        return {__eq1(__a1), __b1}
      else
        if one63(__a1) then
          return {__eq1(hd(__a1)), __b1}
        else
          if _35(__a1) > 1 then
            return {join({"or"}, map(__eq1, __a1)), __b1}
          end
        end
      end
    end
  end
  return {"let", __x55, __expr5, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end})
setenv("when", {_stash = true, macro = function (cond, ...)
  local ____r17 = unstash({...})
  local __cond3 = destash33(cond, ____r17)
  local ____id13 = ____r17
  local __body5 = cut(____id13, 0)
  return {"if", __cond3, join({"do"}, __body5)}
end})
setenv("unless", {_stash = true, macro = function (cond, ...)
  local ____r19 = unstash({...})
  local __cond5 = destash33(cond, ____r19)
  local ____id15 = ____r19
  local __body7 = cut(____id15, 0)
  return {"if", {"not", __cond5}, join({"do"}, __body7)}
end})
setenv("obj", {_stash = true, macro = function (...)
  local __body9 = unstash({...})
  return join({"%object"}, mapo(function (x)
    return x
  end, __body9))
end})
setenv("let", {_stash = true, macro = function (bs, ...)
  local ____r23 = unstash({...})
  local __bs11 = destash33(bs, ____r23)
  local ____id20 = ____r23
  local __body111 = cut(____id20, 0)
  if atom63(__bs11) then
    return join({"let", {__bs11, hd(__body111)}}, tl(__body111))
  else
    if none63(__bs11) then
      return join({"do"}, __body111)
    else
      local ____id21 = __bs11
      local __lh3 = has(____id21, 1)
      local __rh3 = has(____id21, 2)
      local __bs21 = cut(____id21, 2)
      local ____id22 = bind(__lh3, __rh3)
      local __id23 = has(____id22, 1)
      local __val1 = has(____id22, 2)
      local __bs12 = cut(____id22, 2)
      local __renames1 = {}
      if not id_literal63(__id23) then
        local __id121 = unique(__id23)
        __renames1 = {__id23, __id121}
        __id23 = __id121
      end
      return {"do", {"%local", __id23, __val1}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body111)}}
    end
  end
end})
setenv("with", {_stash = true, macro = function (x, v, ...)
  local ____r25 = unstash({...})
  local __x105 = destash33(x, ____r25)
  local __v3 = destash33(v, ____r25)
  local ____id25 = ____r25
  local __body13 = cut(____id25, 0)
  if __v3 == "as" then
    return join({"%with", {"%as", __x105, hd(__body13)}}, tl(__body13))
  else
    return join({"let", {__x105, __v3}}, __body13, {__x105})
  end
end})
setenv("let-when", {_stash = true, macro = function (x, v, ...)
  local ____r27 = unstash({...})
  local __x118 = destash33(x, ____r27)
  local __v5 = destash33(v, ____r27)
  local ____id27 = ____r27
  local __body15 = cut(____id27, 0)
  local __y1 = unique("y")
  return {"let", __y1, __v5, {"when", {"yes", __y1}, join({"let", {__x118, __y1}}, __body15)}}
end})
setenv("define-macro", {_stash = true, macro = function (name, args, ...)
  local ____r29 = unstash({...})
  local __name1 = destash33(name, ____r29)
  local __args3 = destash33(args, ____r29)
  local ____id29 = ____r29
  local __body17 = cut(____id29, 0)
  local ____x128 = object({"setenv", {"quote", __name1}})
  ____x128.macro = join({"fn", __args3}, __body17)
  local __form1 = ____x128
  _eval(__form1)
  return __form1
end})
setenv("define-special", {_stash = true, macro = function (name, args, ...)
  local ____r31 = unstash({...})
  local __name3 = destash33(name, ____r31)
  local __args5 = destash33(args, ____r31)
  local ____id31 = ____r31
  local __body19 = cut(____id31, 0)
  local ____x135 = object({"setenv", {"quote", __name3}})
  ____x135.special = join({"fn", __args5}, __body19)
  local __form3 = join(____x135, keys(__body19))
  _eval(__form3)
  return __form3
end})
setenv("define-symbol", {_stash = true, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  local ____x141 = object({"setenv", {"quote", name}})
  ____x141.symbol = {"quote", expansion}
  return ____x141
end})
setenv("define-reader", {_stash = true, macro = function (__x149, ...)
  local ____id34 = __x149
  local __char1 = has(____id34, 1)
  local __s1 = has(____id34, 2)
  local ____r35 = unstash({...})
  local ____x149 = destash33(__x149, ____r35)
  local ____id35 = ____r35
  local __body21 = cut(____id35, 0)
  return {"set", {"get", "read-table", __char1}, join({"fn", {__s1}}, __body21)}
end})
setenv("define", {_stash = true, macro = function (name, x, ...)
  local ____r37 = unstash({...})
  local __name5 = destash33(name, ____r37)
  local __x159 = destash33(x, ____r37)
  local ____id37 = ____r37
  local __body23 = cut(____id37, 0)
  setenv(__name5, {_stash = true, variable = true})
  if some63(__body23) then
    return join({"%local-function", __name5}, bind42(__x159, __body23), keys(__body23))
  else
    return join({"%local", __name5, __x159}, keys(__body23))
  end
end})
setenv("define-global", {_stash = true, macro = function (name, x, ...)
  local ____r39 = unstash({...})
  local __name7 = destash33(name, ____r39)
  local __x166 = destash33(x, ____r39)
  local ____id39 = ____r39
  local __body25 = cut(____id39, 0)
  setenv(__name7, {_stash = true, toplevel = true, variable = true})
  if some63(__body25) then
    return join({"%global-function", __name7}, bind42(__x166, __body25), keys(__body25))
  else
    return join({"set", __name7, __x166}, keys(__body25))
  end
end})
setenv("get-value", {_stash = true, macro = function (x)
  local ____x173 = object({"setenv", x})
  ____x173.toplevel = true
  return {"has", ____x173, {"quote", "value"}}
end})
setenv("define-constant", {_stash = true, macro = function (name, x)
  local ____x184 = object({"setenv", {"quote", name}})
  ____x184.toplevel = true
  ____x184.value = either(x, {"get-value", {"quote", name}})
  return {"do", ____x184, {"define-symbol", name, {"get-value", {"quote", name}}}}
end})
setenv("define-variable", {_stash = true, macro = function (name, x)
  if is63(x) then
    return {"define-constant", name, {"either", {"get-value", {"quote", name}}, x}}
  else
    return {"define-constant", name}
  end
end})
setenv("with-frame", {_stash = true, macro = function (...)
  local __body27 = unstash({...})
  local __x209 = unique("x")
  return {"do", {"add", "environment", {"obj"}}, {"with", __x209, join({"do"}, __body27), {"drop", "environment"}}}
end})
setenv("with-bindings", {_stash = true, macro = function (__x221, ...)
  local ____id42 = __x221
  local __names3 = has(____id42, 1)
  local ____r47 = unstash({...})
  local ____x221 = destash33(__x221, ____r47)
  local ____id43 = ____r47
  local __body29 = cut(____id43, 0)
  local __x223 = unique("x")
  local ____x226 = object({"setenv", __x223})
  ____x226.variable = true
  return join({"with-frame", {"each", __x223, __names3, ____x226}}, __body29)
end})
setenv("let-macro", {_stash = true, macro = function (definitions, ...)
  local ____r50 = unstash({...})
  local __definitions1 = destash33(definitions, ____r50)
  local ____id45 = ____r50
  local __body31 = cut(____id45, 0)
  add(environment, {})
  map(function (m)
    return macroexpand(join({"define-macro"}, m))
  end, __definitions1)
  local ____x231 = join({"do"}, macroexpand(__body31))
  drop(environment)
  return ____x231
end})
setenv("let-symbol", {_stash = true, macro = function (expansions, ...)
  local ____r54 = unstash({...})
  local __expansions1 = destash33(expansions, ____r54)
  local ____id48 = ____r54
  local __body33 = cut(____id48, 0)
  add(environment, {})
  map(function (__x240)
    local ____id49 = __x240
    local __name9 = has(____id49, 1)
    local __exp1 = has(____id49, 2)
    return macroexpand({"define-symbol", __name9, __exp1})
  end, pair(__expansions1))
  local ____x239 = join({"do"}, macroexpand(__body33))
  drop(environment)
  return ____x239
end})
setenv("let-unique", {_stash = true, macro = function (names, ...)
  local ____r58 = unstash({...})
  local __names5 = destash33(names, ____r58)
  local ____id51 = ____r58
  local __body35 = cut(____id51, 0)
  local __bs3 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names5)
  return join({"let", apply(join, __bs3)}, __body35)
end})
setenv("fn", {_stash = true, macro = function (args, ...)
  local ____r61 = unstash({...})
  local __args7 = destash33(args, ____r61)
  local ____id53 = ____r61
  local __body37 = cut(____id53, 0)
  return join({"%function"}, bind42(__args7, __body37), keys(__body37))
end})
setenv("apply", {_stash = true, macro = function (f, ...)
  local ____r63 = unstash({...})
  local __f1 = destash33(f, ____r63)
  local ____id55 = ____r63
  local __args9 = cut(____id55, 0)
  if _35(__args9) > 1 then
    return {{"do", "apply"}, __f1, {"join", join({"list"}, almost(__args9)), last(__args9), join({"list"}, keys(__args9))}}
  else
    if keys63(__args9) then
      return {{"do", "apply"}, __f1, join({"list"}, __args9)}
    else
      return join({{"do", "apply"}, __f1}, __args9)
    end
  end
end})
setenv("guard", {_stash = true, macro = function (expr)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" or has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    return {{"fn", join(), {"%try", {"list", true, expr}}}}
  else
    local ____x308 = object({"obj"})
    ____x308.stack = {{"idx", "debug", "traceback"}}
    ____x308.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
    return {"list", {"xpcall", {"fn", join(), expr}, {"fn", {"m"}, {"if", {"obj?", "m"}, "m", ____x308}}}}
  end
end})
setenv("each", {_stash = true, macro = function (x, t, ...)
  local ____r67 = unstash({...})
  local __x335 = destash33(x, ____r67)
  local __t1 = destash33(t, ____r67)
  local ____id58 = ____r67
  local __body39 = cut(____id58, 0)
  local __o3 = unique("o")
  local __n3 = unique("n")
  local __i3 = unique("i")
  local __e7
  if atom63(__x335) then
    __e7 = {__i3, __x335}
  else
    local __e8
    if _35(__x335) > 1 then
      __e8 = __x335
    else
      __e8 = {__i3, hd(__x335)}
    end
    __e7 = __e8
  end
  local ____id59 = __e7
  local __k4 = has(____id59, 1)
  local __v7 = has(____id59, 2)
  local ____x341 = object({"target", __o3})
  ____x341.py = {"indices", __o3}
  local __e9
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" or has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    __e9 = __body39
  else
    __e9 = {join({"let", __k4, {"if", {"numeric?", __k4}, {"parseInt", __k4}, __k4}}, __body39)}
  end
  return {"let", {__o3, __t1, __k4, "nil"}, {"%for", ____x341, __k4, join({"let", {__v7, {"get", __o3, __k4}}}, __e9)}}
end})
setenv("for", {_stash = true, macro = function (i, to, ...)
  local ____r69 = unstash({...})
  local __i5 = destash33(i, ____r69)
  local __to1 = destash33(to, ____r69)
  local ____id61 = ____r69
  local __body41 = cut(____id61, 0)
  if __to1 == "in" then
    return {"%for", hd(__body41), __i5, join({"do"}, tl(__body41))}
  else
    return {"let", __i5, 0, join({"while", {"<", __i5, __to1}}, __body41, {{"inc", __i5}})}
  end
end})
setenv("step", {_stash = true, macro = function (v, t, ...)
  local ____r71 = unstash({...})
  local __v9 = destash33(v, ____r71)
  local __t3 = destash33(t, ____r71)
  local ____id63 = ____r71
  local __body43 = cut(____id63, 0)
  local __x375 = unique("x")
  local __i7 = unique("i")
  return {"let", {__x375, __t3}, {"for", __i7, {"#", __x375}, join({"let", {__v9, {"at", __x375, __i7}}}, __body43)}}
end})
setenv("set-of", {_stash = true, macro = function (...)
  local __xs1 = unstash({...})
  local __l5 = {}
  local ____o5 = __xs1
  local ____i9 = nil
  for ____i9 in next, ____o5 do
    local __x386 = ____o5[____i9]
    __l5[__x386] = true
  end
  return join({"obj"}, __l5)
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
  local ____r77 = unstash({...})
  local __a3 = destash33(a, ____r77)
  local ____id65 = ____r77
  local __bs5 = cut(____id65, 0)
  return {"set", __a3, join({"join", __a3}, __bs5)}
end})
setenv("cat!", {_stash = true, macro = function (a, ...)
  local ____r79 = unstash({...})
  local __a5 = destash33(a, ____r79)
  local ____id67 = ____r79
  local __bs7 = cut(____id67, 0)
  return {"set", __a5, join({"cat", __a5}, __bs7)}
end})
setenv("inc", {_stash = true, macro = function (n, by)
  local __e10
  if nil63(by) then
    __e10 = 1
  else
    __e10 = by
  end
  return {"set", n, {"+", n, __e10}}
end})
setenv("dec", {_stash = true, macro = function (n, by)
  local __e11
  if nil63(by) then
    __e11 = 1
  else
    __e11 = by
  end
  return {"set", n, {"-", n, __e11}}
end})
setenv("with-indent", {_stash = true, macro = function (form)
  local __x416 = unique("x")
  return {"do", {"inc", "indent-level"}, {"with", __x416, form, {"dec", "indent-level"}}}
end})
setenv("export", {_stash = true, macro = function (...)
  local __names7 = unstash({...})
  local __forms3 = map(function (k)
    if k == compile(k) then
      return {"set", {"idx", "exports", k}, k}
    else
      return {"set", {"get", "exports", {"quote", k}}, k, {"idx", "exports", k}, k}
    end
  end, __names7)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    return join({"do"}, __forms3)
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
      return join({"let", "exports", {"or", "exports", {"obj"}}}, __forms3, {{"return", "exports"}})
    end
  end
end})
setenv("when-compiling", {_stash = true, macro = function (...)
  local __body45 = unstash({...})
  return _eval(join({"do"}, __body45))
end})
setenv("def", {_stash = true, macro = function (name, ...)
  local ____r89 = unstash({...})
  local __name11 = destash33(name, ____r89)
  local ____id69 = ____r89
  local __body47 = cut(____id69, 0)
  return join({"define-global", __name11}, __body47)
end})
setenv("mac", {_stash = true, macro = function (name, ...)
  local ____r91 = unstash({...})
  local __name13 = destash33(name, ____r91)
  local ____id71 = ____r91
  local __body49 = cut(____id71, 0)
  return join({"define-macro", __name13}, __body49)
end})
setenv("defconst", {_stash = true, macro = function (name, ...)
  local ____r93 = unstash({...})
  local __name15 = destash33(name, ____r93)
  local ____id73 = ____r93
  local __value1 = cut(____id73, 0)
  return join({"def", __name15}, __value1)
end})
setenv("undefined?", {_stash = true, macro = function (name)
  local ____x467 = object({"target"})
  ____x467.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x467.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x467.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x467
end})
setenv("defvar", {_stash = true, macro = function (name, ...)
  local ____r97 = unstash({...})
  local __name17 = destash33(name, ____r97)
  local ____id75 = ____r97
  local __value3 = cut(____id75, 0)
  local ____x484 = object({"target"})
  ____x484.py = {"global", __name17}
  return {"when", {"undefined?", __name17}, ____x484, join({"defconst", __name17}, __value3)}
end})
setenv("+", {_stash = true, macro = function (...)
  local __args11 = unstash({...})
  if none63(__args11) then
    return 0
  else
    if one63(__args11) then
      return hd(__args11)
    else
      return join({"%add"}, __args11)
    end
  end
end})
setenv("-", {_stash = true, macro = function (...)
  local __args13 = unstash({...})
  if none63(__args13) then
    return 0
  else
    if one63(__args13) then
      return {"%unm", hd(__args13)}
    else
      return join({"%sub"}, __args13)
    end
  end
end})
setenv("*", {_stash = true, macro = function (...)
  local __args15 = unstash({...})
  if none63(__args15) then
    return 1
  else
    if one63(__args15) then
      return hd(__args15)
    else
      return join({"%mul"}, __args15)
    end
  end
end})
setenv("/", {_stash = true, macro = function (...)
  local __args17 = unstash({...})
  if none63(__args17) then
    return 1
  else
    if one63(__args17) then
      return hd(__args17)
    else
      return join({"%div"}, __args17)
    end
  end
end})
setenv("async", {_stash = true, macro = function (keyword, ...)
  local ____r99 = unstash({...})
  local __keyword1 = destash33(keyword, ____r99)
  local ____id77 = ____r99
  local __body51 = cut(____id77, 0)
  local ____x503 = object({__keyword1})
  ____x503.async = true
  return join(____x503, __body51)
end})
local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
function toplevel_repr(v)
  return _str(v)
end
function toplevel_print(v)
  return _print(toplevel_repr(v))
end
local function eval_print(form)
  local ____id = {xpcall(function ()
    return compiler._eval(form)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e
      if string63(m) then
        __e = clip(m, search(m, ": ") + 2)
      else
        local __e1
        if nil63(m) then
          __e1 = ""
        else
          __e1 = _str(m)
        end
        __e = __e1
      end
      return {stack = debug.traceback(), message = __e}
    end
  end)}
  local __ok = has(____id, 1)
  local __v = has(____id, 2)
  local __ex = has(____id, 3)
  if not __ok then
    return _print("error: " .. __v.message .. "\n" .. __v.stack)
  else
    if is63(__v) then
      return toplevel_print(__v)
    end
  end
end
local function rep(s)
  local __v1 = _eval(reader.read_string(s))
  if is63(__v1) then
    return toplevel_print(__v1)
  end
end
local function repl()
  local __o = {buf = ""}
  local function rep1(s)
    __o.buf = __o.buf .. s
    local __more = {}
    local __form = reader.read_string(__o.buf, __more)
    if not( __form == __more) then
      eval_print(__form)
      __o.buf = ""
      system.write("> ")
      return system.flush()
    end
  end
  system.write("> ")
  system.flush()
  while true do
    local __s = system.read_line()
    if __s then
      rep1(__s .. "\n")
    else
      break
    end
  end
end
function read_from_file(path)
  local __s1 = reader.stream(system.read_file(path))
  return reader.read_all(__s1)
end
function expand_file(path)
  local __body = read_from_file(path)
  return compiler.expand(join({"do"}, __body))
end
function compile_file(path)
  local __form1 = expand_file(path)
  return compiler.compile(__form1, {_stash = true, stmt = true})
end
function _load(path)
  local __previous = has(setenv("target", {_stash = true, toplevel = true}), "value")
  setenv("target", {_stash = true, toplevel = true}).value = "lua"
  local __code = compile_file(path)
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
local function main()
  local __arg = hd(system.argv)
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
      local __expr = nil
      local __argv = system.argv
      local __i = 0
      while __i < _35(__argv) do
        local __a = __argv[__i + 1]
        if __a == "-c" or __a == "-o" or __a == "-t" or __a == "-e" then
          if __i == edge(__argv) then
            _print("missing argument for " .. __a)
          else
            __i = __i + 1
            local __val = __argv[__i + 1]
            if __a == "-c" then
              __input = __val
            else
              if __a == "-o" then
                __output = __val
              else
                if __a == "-t" then
                  __target1 = __val
                else
                  if __a == "-e" then
                    __expr = __val
                  end
                end
              end
            end
          end
        else
          if not( "-" == char(__a, 0)) then
            add(__pre, __a)
          end
        end
        __i = __i + 1
      end
      local ____x2 = __pre
      local ____i1 = 0
      while ____i1 < _35(____x2) do
        local __file = ____x2[____i1 + 1]
        run_file(__file)
        ____i1 = ____i1 + 1
      end
      if nil63(__input) then
        if __expr then
          return rep(__expr)
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
  main()
end
