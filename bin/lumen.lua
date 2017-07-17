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
function array63(x)
  return obj63(x)
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
  local __r41 = {}
  local ____x2 = __ls
  local ____i7 = 0
  while ____i7 < _35(____x2) do
    local __l3 = ____x2[____i7 + 1]
    if __l3 then
      local __n7 = _35(__r41)
      local ____o5 = __l3
      local __k5 = nil
      for __k5 in next, ____o5 do
        local __v5 = ____o5[__k5]
        if number63(__k5) then
          __k5 = __k5 + __n7
        else
          __l3 = object(__l3)
        end
        __r41[__k5] = __v5
      end
    end
    ____i7 = ____i7 + 1
  end
  return __r41
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
  local __i11 = 0
  while __i11 < _35(l) do
    add(__l12, {l[__i11 + 1], l[__i11 + 1 + 1]})
    __i11 = __i11 + 1
    __i11 = __i11 + 1
  end
  return __l12
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
    local __v8 = ____o8[__k7]
    if not number63(__k7) then
      return true
    end
  end
  return false
end
function empty63(t)
  local ____o9 = t
  local ____i15 = nil
  for ____i15 in next, ____o9 do
    local __x8 = ____o9[____i15]
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
      local __v9 = ____o10[__k8]
      if not number63(__k8) then
        __p[__k8] = __v9
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
function unstash(args)
  if none63(args) then
    return {}
  else
    local __l4 = last(args)
    if obj63(__l4) and __l4._stash then
      local __args1 = object(almost(args))
      local ____o11 = __l4
      local __k9 = nil
      for __k9 in next, ____o11 do
        local __v10 = ____o11[__k9]
        if not( __k9 == "_stash") then
          __args1[__k9] = __v10
        end
      end
      return __args1
    else
      return args
    end
  end
end
function destash33(l, args1)
  if obj63(l) and l._stash then
    local ____o12 = l
    local __k10 = nil
    for __k10 in next, ____o12 do
      local __v11 = ____o12[__k10]
      if not( __k10 == "_stash") then
        args1[__k10] = __v11
      end
    end
  else
    return l
  end
end
function search(s, pattern, start)
  local __e3
  if start then
    __e3 = start + 1
  end
  local __start = __e3
  local __i19 = string.find(s, pattern, __start, true)
  return __i19 and __i19 - 1
end
function split(s, sep)
  if s == "" or sep == "" then
    return {}
  else
    local __l5 = {}
    local __n16 = _35(sep)
    while true do
      local __i20 = search(s, sep)
      if nil63(__i20) then
        break
      else
        add(__l5, clip(s, 0, __i20))
        s = clip(s, __i20 + __n16)
      end
    end
    add(__l5, s)
    return __l5
  end
end
function cat(...)
  local __xs = unstash({...})
  return either(reduce(function (a, b)
    return a .. b
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
  local __i21 = 0
  while __i21 < edge(xs) do
    local __a = xs[__i21 + 1]
    local __b = xs[__i21 + 1 + 1]
    if not f(__a, __b) then
      return false
    end
    __i21 = __i21 + 1
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
function number(s)
  return tonumber(s)
end
function number_code63(n)
  return n > 47 and n < 58
end
function numeric63(s)
  local __n17 = _35(s)
  local __i22 = 0
  while __i22 < __n17 do
    if not number_code63(code(s, __i22)) then
      return false
    end
    __i22 = __i22 + 1
  end
  return some63(s)
end
function escape(s)
  local __s1 = "\""
  local __i23 = 0
  while __i23 < _35(s) do
    local __c = char(s, __i23)
    local __e4
    if __c == "\n" then
      __e4 = "\\n"
    else
      local __e5
      if __c == "\r" then
        __e5 = "\\r"
      else
        local __e6
        if __c == "\"" then
          __e6 = "\\\""
        else
          local __e7
          if __c == "\\" then
            __e7 = "\\\\"
          else
            __e7 = __c
          end
          __e6 = __e7
        end
        __e5 = __e6
      end
      __e4 = __e5
    end
    local __c1 = __e4
    __s1 = __s1 .. __c1
    __i23 = __i23 + 1
  end
  return __s1 .. "\""
end
function _str(x, stack)
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
                      return escape(tostring(x))
                    else
                      local __s = "("
                      local __sp = ""
                      local __xs11 = {}
                      local __ks = {}
                      local __l6 = stack or {}
                      add(__l6, x)
                      local ____o13 = x
                      local __k11 = nil
                      for __k11 in next, ____o13 do
                        local __v12 = ____o13[__k11]
                        if number63(__k11) then
                          __xs11[__k11] = _str(__v12, __l6)
                        else
                          if not string63(__k11) then
                            __k11 = _str(__k11, __l6)
                          end
                          add(__ks, __k11 .. ":")
                          add(__ks, _str(__v12, __l6))
                        end
                      end
                      drop(__l6)
                      local ____o14 = join(__xs11, __ks)
                      local ____i25 = nil
                      for ____i25 in next, ____o14 do
                        local __v13 = ____o14[____i25]
                        __s = __s .. __sp .. __v13
                        __sp = " "
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
  local ____r76 = unstash({...})
  local __f = destash33(f, ____r76)
  local ____id = ____r76
  local __args11 = cut(____id, 0)
  return apply(__f, __args11)
end
function setenv(k, ...)
  local ____r77 = unstash({...})
  local __k12 = destash33(k, ____r77)
  local ____id1 = ____r77
  local __keys = cut(____id1, 0)
  if string63(__k12) then
    local __e8
    if __keys.toplevel then
      __e8 = hd(environment)
    else
      __e8 = last(environment)
    end
    local __frame = __e8
    local __entry = __frame[__k12] or {}
    local ____o15 = __keys
    local __k13 = nil
    for __k13 in next, ____o15 do
      local __v14 = ____o15[__k13]
      if not( __k13 == "toplevel") then
        __entry[__k13] = __v14
      end
    end
    __frame[__k12] = __entry
    return __frame[__k12]
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
setenv("target", {_stash = true, toplevel = true, value = either(setenv("target", {_stash = true, toplevel = true}).value, "lua")})
setenv("target", {_stash = true, symbol = {"get-value", {"quote", "target"}}})
setenv("quote", {_stash = true, macro = function (form)
  return quoted(form)
end})
setenv("quasiquote", {_stash = true, macro = function (form)
  return quasiexpand(form, 1)
end})
setenv("set", {_stash = true, macro = function (...)
  local __args1 = unstash({...})
  return join({"do"}, map(function (__x5)
    local ____id1 = __x5
    local __lh1 = ____id1[1]
    local __rh1 = ____id1[2]
    return {"%set", __lh1, __rh1}
  end, pair(__args1)))
end})
setenv("at", {_stash = true, macro = function (l, i)
  if setenv("target", {_stash = true, toplevel = true}).value == "lua" and number63(i) then
    i = i + 1
  else
    if setenv("target", {_stash = true, toplevel = true}).value == "lua" then
      i = {"+", i, 1}
    end
  end
  return {"get", l, i}
end})
setenv("wipe", {_stash = true, macro = function (place)
  if setenv("target", {_stash = true, toplevel = true}).value == "lua" then
    return {"set", place, "nil"}
  else
    return {"%delete", place}
  end
end})
setenv("list", {_stash = true, macro = function (...)
  local __body1 = unstash({...})
  local __x25 = unique("x")
  local __l1 = {}
  local __forms1 = {}
  local ____o1 = __body1
  local __k2 = nil
  for __k2 in next, ____o1 do
    local __v1 = ____o1[__k2]
    if number63(__k2) then
      __l1[__k2] = __v1
    else
      add(__forms1, {"set", {"get", __x25, {"quote", __k2}}, __v1})
    end
  end
  if some63(__forms1) then
    return join({"let", __x25, {"object", join({"%array"}, __l1)}}, __forms1, {__x25})
  else
    return join({"%array"}, __l1)
  end
end})
setenv("if", {_stash = true, macro = function (...)
  local __branches1 = unstash({...})
  return hd(expand_if(__branches1))
end})
setenv("case", {_stash = true, macro = function (expr, ...)
  local ____r13 = unstash({...})
  local __expr1 = destash33(expr, ____r13)
  local ____id4 = ____r13
  local __clauses1 = cut(____id4, 0)
  local __x47 = unique("x")
  local __eq1 = function (_)
    return {"=", {"quote", _}, __x47}
  end
  local __cl1 = function (__x50)
    local ____id5 = __x50
    local __a1 = ____id5[1]
    local __b1 = ____id5[2]
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
  return {"let", __x47, __expr1, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end})
setenv("when", {_stash = true, macro = function (cond, ...)
  local ____r17 = unstash({...})
  local __cond1 = destash33(cond, ____r17)
  local ____id7 = ____r17
  local __body3 = cut(____id7, 0)
  return {"if", __cond1, join({"do"}, __body3)}
end})
setenv("unless", {_stash = true, macro = function (cond, ...)
  local ____r19 = unstash({...})
  local __cond3 = destash33(cond, ____r19)
  local ____id9 = ____r19
  local __body5 = cut(____id9, 0)
  return {"if", {"not", __cond3}, join({"do"}, __body5)}
end})
setenv("obj", {_stash = true, macro = function (...)
  local __body7 = unstash({...})
  return join({"%object"}, mapo(function (x)
    return x
  end, __body7))
end})
setenv("let", {_stash = true, macro = function (bs, ...)
  local ____r23 = unstash({...})
  local __bs11 = destash33(bs, ____r23)
  local ____id14 = ____r23
  local __body9 = cut(____id14, 0)
  if atom63(__bs11) then
    return join({"let", {__bs11, hd(__body9)}}, tl(__body9))
  else
    if none63(__bs11) then
      return join({"do"}, __body9)
    else
      local ____id15 = __bs11
      local __lh3 = ____id15[1]
      local __rh3 = ____id15[2]
      local __bs21 = cut(____id15, 2)
      local ____id16 = bind(__lh3, __rh3)
      local __id17 = ____id16[1]
      local __val1 = ____id16[2]
      local __bs12 = cut(____id16, 2)
      local __renames1 = {}
      if not id_literal63(__id17) then
        local __id121 = unique(__id17)
        __renames1 = {__id17, __id121}
        __id17 = __id121
      end
      return {"do", {"%local", __id17, __val1}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body9)}}
    end
  end
end})
setenv("with", {_stash = true, macro = function (x, v, ...)
  local ____r25 = unstash({...})
  local __x95 = destash33(x, ____r25)
  local __v3 = destash33(v, ____r25)
  local ____id19 = ____r25
  local __body11 = cut(____id19, 0)
  return join({"let", {__x95, __v3}}, __body11, {__x95})
end})
setenv("let-when", {_stash = true, macro = function (x, v, ...)
  local ____r27 = unstash({...})
  local __x106 = destash33(x, ____r27)
  local __v5 = destash33(v, ____r27)
  local ____id21 = ____r27
  local __body13 = cut(____id21, 0)
  local __y1 = unique("y")
  return {"let", __y1, __v5, {"when", {"yes", __y1}, join({"let", {__x106, __y1}}, __body13)}}
end})
setenv("define-macro", {_stash = true, macro = function (name, args, ...)
  local ____r29 = unstash({...})
  local __name1 = destash33(name, ____r29)
  local __args3 = destash33(args, ____r29)
  local ____id23 = ____r29
  local __body15 = cut(____id23, 0)
  local ____x116 = object({"setenv", {"quote", __name1}})
  ____x116.macro = join({"fn", __args3}, __body15)
  local __form1 = ____x116
  _eval(__form1)
  return __form1
end})
setenv("define-special", {_stash = true, macro = function (name, args, ...)
  local ____r31 = unstash({...})
  local __name3 = destash33(name, ____r31)
  local __args5 = destash33(args, ____r31)
  local ____id25 = ____r31
  local __body17 = cut(____id25, 0)
  local ____x123 = object({"setenv", {"quote", __name3}})
  ____x123.special = join({"fn", __args5}, __body17)
  local __form3 = join(____x123, keys(__body17))
  _eval(__form3)
  return __form3
end})
setenv("define-symbol", {_stash = true, macro = function (name, expansion)
  setenv(name, {_stash = true, symbol = expansion})
  local ____x129 = object({"setenv", {"quote", name}})
  ____x129.symbol = {"quote", expansion}
  return ____x129
end})
setenv("define-reader", {_stash = true, macro = function (__x137, ...)
  local ____id28 = __x137
  local __char1 = ____id28[1]
  local __s1 = ____id28[2]
  local ____r35 = unstash({...})
  local ____x137 = destash33(__x137, ____r35)
  local ____id29 = ____r35
  local __body19 = cut(____id29, 0)
  return {"set", {"get", "read-table", __char1}, join({"fn", {__s1}}, __body19)}
end})
setenv("define", {_stash = true, macro = function (name, x, ...)
  local ____r37 = unstash({...})
  local __name5 = destash33(name, ____r37)
  local __x147 = destash33(x, ____r37)
  local ____id31 = ____r37
  local __body21 = cut(____id31, 0)
  setenv(__name5, {_stash = true, variable = true})
  if some63(__body21) then
    return join({"%local-function", __name5}, bind42(__x147, __body21))
  else
    return {"%local", __name5, __x147}
  end
end})
setenv("define-global", {_stash = true, macro = function (name, x, ...)
  local ____r39 = unstash({...})
  local __name7 = destash33(name, ____r39)
  local __x154 = destash33(x, ____r39)
  local ____id33 = ____r39
  local __body23 = cut(____id33, 0)
  setenv(__name7, {_stash = true, toplevel = true, variable = true})
  if some63(__body23) then
    return join({"%global-function", __name7}, bind42(__x154, __body23))
  else
    return {"set", __name7, __x154}
  end
end})
setenv("get-value", {_stash = true, macro = function (x)
  local ____x161 = object({"setenv", x})
  ____x161.toplevel = true
  return {"get", ____x161, {"quote", "value"}}
end})
setenv("define-constant", {_stash = true, macro = function (name, x)
  local ____x172 = object({"setenv", {"quote", name}})
  ____x172.toplevel = true
  ____x172.value = either(x, {"get-value", {"quote", name}})
  return {"do", ____x172, {"define-symbol", name, {"get-value", {"quote", name}}}}
end})
setenv("define-variable", {_stash = true, macro = function (name, x)
  if is63(x) then
    return {"define-constant", name, {"either", {"get-value", {"quote", name}}, x}}
  else
    return {"define-constant", name}
  end
end})
setenv("with-frame", {_stash = true, macro = function (...)
  local __body25 = unstash({...})
  local __x197 = unique("x")
  return {"do", {"add", "environment", {"obj"}}, {"with", __x197, join({"do"}, __body25), {"drop", "environment"}}}
end})
setenv("with-bindings", {_stash = true, macro = function (__x209, ...)
  local ____id36 = __x209
  local __names1 = ____id36[1]
  local ____r47 = unstash({...})
  local ____x209 = destash33(__x209, ____r47)
  local ____id37 = ____r47
  local __body27 = cut(____id37, 0)
  local __x211 = unique("x")
  local ____x214 = object({"setenv", __x211})
  ____x214.variable = true
  return join({"with-frame", {"each", __x211, __names1, ____x214}}, __body27)
end})
setenv("let-macro", {_stash = true, macro = function (definitions, ...)
  local ____r50 = unstash({...})
  local __definitions1 = destash33(definitions, ____r50)
  local ____id39 = ____r50
  local __body29 = cut(____id39, 0)
  add(environment, {})
  map(function (m)
    return macroexpand(join({"define-macro"}, m))
  end, __definitions1)
  local ____x219 = join({"do"}, macroexpand(__body29))
  drop(environment)
  return ____x219
end})
setenv("let-symbol", {_stash = true, macro = function (expansions, ...)
  local ____r54 = unstash({...})
  local __expansions1 = destash33(expansions, ____r54)
  local ____id42 = ____r54
  local __body31 = cut(____id42, 0)
  add(environment, {})
  map(function (__x228)
    local ____id43 = __x228
    local __name9 = ____id43[1]
    local __exp1 = ____id43[2]
    return macroexpand({"define-symbol", __name9, __exp1})
  end, pair(__expansions1))
  local ____x227 = join({"do"}, macroexpand(__body31))
  drop(environment)
  return ____x227
end})
setenv("let-unique", {_stash = true, macro = function (names, ...)
  local ____r58 = unstash({...})
  local __names3 = destash33(names, ____r58)
  local ____id45 = ____r58
  local __body33 = cut(____id45, 0)
  local __bs3 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names3)
  return join({"let", apply(join, __bs3)}, __body33)
end})
setenv("fn", {_stash = true, macro = function (args, ...)
  local ____r61 = unstash({...})
  local __args7 = destash33(args, ____r61)
  local ____id47 = ____r61
  local __body35 = cut(____id47, 0)
  return join({"%function"}, bind42(__args7, __body35))
end})
setenv("apply", {_stash = true, macro = function (f, ...)
  local ____r63 = unstash({...})
  local __f1 = destash33(f, ____r63)
  local ____id49 = ____r63
  local __args9 = cut(____id49, 0)
  if _35(__args9) > 1 then
    return {{"do", "apply"}, __f1, {"join", join({"list"}, almost(__args9)), last(__args9)}}
  else
    return join({{"do", "apply"}, __f1}, __args9)
  end
end})
setenv("guard", {_stash = true, macro = function (expr)
  if setenv("target", {_stash = true, toplevel = true}).value == "js" then
    return {{"fn", join(), {"%try", {"list", true, expr}}}}
  else
    local ____x288 = object({"obj"})
    ____x288.stack = {{"idx", "debug", "traceback"}}
    ____x288.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
    return {"list", {"xpcall", {"fn", join(), expr}, {"fn", {"m"}, {"if", {"obj?", "m"}, "m", ____x288}}}}
  end
end})
setenv("each", {_stash = true, macro = function (x, t, ...)
  local ____r67 = unstash({...})
  local __x313 = destash33(x, ____r67)
  local __t1 = destash33(t, ____r67)
  local ____id52 = ____r67
  local __body37 = cut(____id52, 0)
  local __o3 = unique("o")
  local __n3 = unique("n")
  local __i3 = unique("i")
  local __e7
  if atom63(__x313) then
    __e7 = {__i3, __x313}
  else
    local __e8
    if _35(__x313) > 1 then
      __e8 = __x313
    else
      __e8 = {__i3, hd(__x313)}
    end
    __e7 = __e8
  end
  local ____id53 = __e7
  local __k4 = ____id53[1]
  local __v7 = ____id53[2]
  local __e9
  if setenv("target", {_stash = true, toplevel = true}).value == "lua" then
    __e9 = __body37
  else
    __e9 = {join({"let", __k4, {"if", {"numeric?", __k4}, {"parseInt", __k4}, __k4}}, __body37)}
  end
  return {"let", {__o3, __t1, __k4, "nil"}, {"%for", __o3, __k4, join({"let", {__v7, {"get", __o3, __k4}}}, __e9)}}
end})
setenv("for", {_stash = true, macro = function (i, to, ...)
  local ____r69 = unstash({...})
  local __i5 = destash33(i, ____r69)
  local __to1 = destash33(to, ____r69)
  local ____id55 = ____r69
  local __body39 = cut(____id55, 0)
  return {"let", __i5, 0, join({"while", {"<", __i5, __to1}}, __body39, {{"inc", __i5}})}
end})
setenv("step", {_stash = true, macro = function (v, t, ...)
  local ____r71 = unstash({...})
  local __v9 = destash33(v, ____r71)
  local __t3 = destash33(t, ____r71)
  local ____id57 = ____r71
  local __body41 = cut(____id57, 0)
  local __x347 = unique("x")
  local __i7 = unique("i")
  return {"let", {__x347, __t3}, {"for", __i7, {"#", __x347}, join({"let", {__v9, {"at", __x347, __i7}}}, __body41)}}
end})
setenv("set-of", {_stash = true, macro = function (...)
  local __xs1 = unstash({...})
  local __l3 = {}
  local ____o5 = __xs1
  local ____i9 = nil
  for ____i9 in next, ____o5 do
    local __x358 = ____o5[____i9]
    __l3[__x358] = true
  end
  return join({"obj"}, __l3)
end})
setenv("target?", {_stash = true, macro = function (x)
  return {"=", "target", x}
end})
setenv("target", {_stash = true, macro = function (...)
  local __clauses3 = unstash({...})
  if has63(__clauses3, setenv("target", {_stash = true, toplevel = true}).value) then
    return __clauses3[setenv("target", {_stash = true, toplevel = true}).value]
  else
    return hd(__clauses3)
  end
end})
setenv("language", {_stash = true, macro = function ()
  return {"quote", setenv("target", {_stash = true, toplevel = true}).value}
end})
setenv("join!", {_stash = true, macro = function (a, ...)
  local ____r77 = unstash({...})
  local __a3 = destash33(a, ____r77)
  local ____id59 = ____r77
  local __bs5 = cut(____id59, 0)
  return {"set", __a3, join({"join", __a3}, __bs5)}
end})
setenv("cat!", {_stash = true, macro = function (a, ...)
  local ____r79 = unstash({...})
  local __a5 = destash33(a, ____r79)
  local ____id61 = ____r79
  local __bs7 = cut(____id61, 0)
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
  local __x388 = unique("x")
  return {"do", {"inc", "indent-level"}, {"with", __x388, form, {"dec", "indent-level"}}}
end})
setenv("export", {_stash = true, macro = function (...)
  local __names5 = unstash({...})
  local __forms3 = map(function (k)
    if k == compile(k) then
      return {"set", {"idx", "exports", k}, k}
    else
      return {"set", {"get", "exports", {"quote", k}}, k, {"idx", "exports", k}, k}
    end
  end, __names5)
  if setenv("target", {_stash = true, toplevel = true}).value == "js" then
    return join({"do"}, __forms3)
  else
    if setenv("target", {_stash = true, toplevel = true}).value == "lua" then
      return join({"let", "exports", {"or", "exports", {"obj"}}}, __forms3, {{"return", "exports"}})
    end
  end
end})
setenv("when-compiling", {_stash = true, macro = function (...)
  local __body43 = unstash({...})
  return _eval(join({"do"}, __body43))
end})
local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
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
  local __ok = ____id[1]
  local __v = ____id[2]
  if not __ok then
    return _print("error: " .. __v.message .. "\n" .. __v.stack)
  else
    if is63(__v) then
      return _print(_str(__v))
    end
  end
end
local function rep(s)
  return eval_print(reader.read_string(s))
end
local function repl()
  local __buf = ""
  local function rep1(s)
    __buf = __buf .. s
    local __more = {}
    local __form = reader.read_string(__buf, __more)
    if not( __form == __more) then
      eval_print(__form)
      __buf = ""
      return system.write("> ")
    end
  end
  system.write("> ")
  while true do
    local __s = io.read()
    if __s then
      rep1(__s .. "\n")
    else
      break
    end
  end
end
function compile_file(path)
  local __s1 = reader.stream(system.read_file(path))
  local __body = reader.read_all(__s1)
  local __form1 = compiler.expand(join({"do"}, __body))
  return compiler.compile(__form1, {_stash = true, stmt = true})
end
function _load(path)
  local __previous = setenv("target", {_stash = true, toplevel = true}).value
  setenv("target", {_stash = true, toplevel = true}).value = "lua"
  local __code = compile_file(path)
  setenv("target", {_stash = true, toplevel = true}).value = __previous
  return compiler.run(__code)
end
local function script_file63(path)
  return not( "-" == char(path, 0) or ".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4))
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
