if _G.environment == nil then
  environment = {{}}
end
function _G.nil63(x)
  return x == nil
end
function _G.is63(x)
  return not nil63(x)
end
function _G.no(x)
  return nil63(x) or x == false
end
function _G.yes(x)
  return not no(x)
end
function _G.either(x, y)
  if is63(x) then
    return x
  else
    return y
  end
end
function _G.has63(l, k)
  return is63(l[k])
end
function _G.has(l, k, _else)
  if has63(l, k) then
    return l[k]
  else
    return _else
  end
end
function _G.array63(x)
  return type(x) == "table"
end
function _G.array(x)
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
function _G.object(x)
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
function _G.length(x, upto)
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
function _G._35(x, upto)
  return #x
end
function _G.none63(x)
  return _35(x, 0) == 0
end
function _G.some63(x)
  return _35(x, 0) > 0
end
function _G.one63(x)
  return _35(x, 1) == 1
end
function _G.two63(x)
  return _35(x, 2) == 2
end
function _G.hd(l)
  return l[1]
end
function _G.string63(x)
  return type(x) == "string"
end
function _G.number63(x)
  return type(x) == "number"
end
function _G.boolean63(x)
  return type(x) == "boolean"
end
function _G.function63(x)
  return type(x) == "function"
end
function _G.obj63(x)
  return is63(x) and type(x) == "table"
end
function _G.list63(x)
  return obj63(x) or array63(x)
end
function _G.atom63(x)
  return nil63(x) or (string63(x) or (number63(x) or boolean63(x)))
end
function _G.hd63(l, x)
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
function _G.nan63(n)
  return not( n == n)
end
function _G.inf63(n)
  return n == inf or n == _inf
end
function _G.clip(s, from, upto)
  return string.sub(s, from + 1, upto)
end
function _G.dupe(x)
  return {}
end
function _G.cut(x, from, upto)
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
function _G.props(x)
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
function _G.values(x)
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
function _G.edge(x)
  return _35(x) - 1
end
function _G.inner(x)
  return clip(x, 1, edge(x))
end
function _G.tl(l)
  return cut(l, 1)
end
function _G.char(s, n)
  return clip(s, n, n + 1)
end
function _G.code(s, n)
  local __e14 = nil
  if n then
    __e14 = n + 1
  end
  return string.byte(s, __e14)
end
function _G.string_literal63(x)
  return string63(x) and char(x, 0) == "\""
end
function _G.id_literal63(x)
  return string63(x) and char(x, 0) == "|"
end
function _G.add(l, x)
  return table.insert(l, x)
end
function _G.drop(l)
  return table.remove(l)
end
function _G.last(l)
  return l[edge(l) + 1]
end
function _G.almost(l)
  return cut(l, 0, edge(l))
end
function _G.reverse(l)
  local __l11 = props(l)
  local __i7 = edge(l)
  while __i7 >= 0 do
    add(__l11, l[__i7 + 1])
    __i7 = __i7 - 1
  end
  return __l11
end
function _G.reduce(f, x, _else)
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
function _G.join(...)
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
function _G.find(f, t)
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
function _G.first(f, l)
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
function _G.in63(x, t)
  return find(function (y)
    return x == y
  end, t)
end
function _G.pair(l)
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
function _G.sort(l, f)
  table.sort(l, f)
  return l
end
function _G.map(f, x)
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
function _G.mapcat(f, x, sep)
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
function _G.keep(f, x)
  return map(function (v)
    if yes(f(v)) then
      return v
    end
  end, x)
end
function _G.props63(t)
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
function _G.empty63(t)
  local ____o10 = t
  local ____i17 = nil
  for ____i17 in next, ____o10 do
    local __x10 = ____o10[____i17]
    return false
  end
  return true
end
function _G.stash(args)
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
function _G.unstash(args, params)
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
function _G.destash33(l, args1)
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
function _G.search(s, pattern, start)
  local __e16 = nil
  if start then
    __e16 = start + 1
  end
  local __start = __e16
  local __i23 = string.find(s, pattern, __start, true)
  return __i23 and __i23 - 1
end
function _G.string_ends63(str, x, pos)
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
function _G.string_starts63(str, x, pos)
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
function _G.split(s, sep)
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
local function tostr(x)
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
function _G.cat(...)
  local __xs = unstash({...})
  return reduce(function (a, b)
    return cat2(a, b)
  end, __xs, "")
end
function _G._43(...)
  local __xs1 = unstash({...})
  return reduce(function (a, b)
    return a + b
  end, __xs1, 0)
end
function _G._45(...)
  local __xs2 = unstash({...})
  return reduce(function (b, a)
    return a - b
  end, reverse(__xs2), 0)
end
function _G._42(...)
  local __xs3 = unstash({...})
  return reduce(function (a, b)
    return a * b
  end, __xs3, 1)
end
function _G._47(...)
  local __xs4 = unstash({...})
  return reduce(function (b, a)
    return a / b
  end, reverse(__xs4), 1)
end
function _G._37(...)
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
function _G._60(...)
  local __xs6 = unstash({...})
  return pairwise(function (a, b)
    return a < b
  end, __xs6)
end
function _G._62(...)
  local __xs7 = unstash({...})
  return pairwise(function (a, b)
    return a > b
  end, __xs7)
end
function _G._61(...)
  local __xs8 = unstash({...})
  return pairwise(function (a, b)
    return a == b
  end, __xs8)
end
function _G._6061(...)
  local __xs9 = unstash({...})
  return pairwise(function (a, b)
    return a <= b
  end, __xs9)
end
function _G._6261(...)
  local __xs10 = unstash({...})
  return pairwise(function (a, b)
    return a >= b
  end, __xs10)
end
function _G.number_code63(n)
  return n > 47 and n < 58
end
function _G.number(s)
  return tonumber(s)
end
function _G.numeric63(s)
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
function _G.escape(s)
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
function _G.simple_id63(x)
  local ____id = {xpcall(function ()
    return read_string(x)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e23 = nil
      if string63(m) then
        __e23 = clip(m, search(m, ": ") + 2)
      else
        local __e24 = nil
        if nil63(m) then
          __e24 = ""
        else
          __e24 = str(m)
        end
        __e23 = __e24
      end
      return {
        stack = debug.traceback(),
        message = __e23
      }
    end
  end)}
  local ____ok = has(____id, 1)
  local ____v16 = has(____id, 2)
  local __e25 = nil
  if ____ok then
    __e25 = ____v16
  else
    __e25 = nil
  end
  local __r87 = __e25
  if __r87 == x then
    return __r87
  end
end
function _G.str(x, repr, stack)
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
                          local __v17 = ____o16[__k14]
                          if number63(__k14) then
                            __xs11[__k14] = str(__v17, repr, __l6)
                          else
                            if not string63(__k14) then
                              __k14 = str(__k14, repr, __l6)
                            end
                            if function63(__v17) then
                              add(__ks, {"." .. __k14, ""})
                            else
                              add(__ks, {__k14 .. ": ", str(__v17, repr, __l6)})
                            end
                          end
                        end
                        sort(__ks, function (__x27, __x28)
                          local ____id1 = __x27
                          local __a2 = has(____id1, 1)
                          local ____id2 = __x28
                          local __b2 = has(____id2, 1)
                          return __a2 < __b2
                        end)
                        drop(__l6)
                        local ____x29 = __xs11
                        local ____i29 = 0
                        while ____i29 < _35(____x29) do
                          local __v18 = ____x29[____i29 + 1]
                          __s = __s .. (__sp .. __v18)
                          __sp = " "
                          ____i29 = ____i29 + 1
                        end
                        local ____x30 = __ks
                        local ____i30 = 0
                        while ____i30 < _35(____x30) do
                          local ____id3 = ____x30[____i30 + 1]
                          local __k15 = has(____id3, 1)
                          local __v19 = has(____id3, 2)
                          __s = __s .. (__sp .. (__k15 .. __v19))
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
function _G.apply(f, args)
  local __args2 = stash(args)
  return f(unpack(__args2))
end
function _G.call(f, ...)
  local ____r91 = unstash({...})
  local __f1 = destash33(f, ____r91)
  local ____id4 = ____r91
  local __args3 = cut(____id4, 0)
  return apply(__f1, __args3)
end
function _G.setenv(k, ...)
  local ____r92 = unstash({...})
  local __k16 = destash33(k, ____r92)
  local ____id5 = ____r92
  local __keys = cut(____id5, 0)
  if string63(__k16) then
    local __e26 = nil
    if has63(__keys, "toplevel") then
      __e26 = hd(environment)
    else
      __e26 = last(environment)
    end
    local __frame = __e26
    local __e27 = nil
    if has63(__frame, __k16) then
      __e27 = __frame[__k16]
    else
      __e27 = {}
    end
    local __entry = __e27
    local ____o17 = __keys
    local __k17 = nil
    for __k17 in next, ____o17 do
      local __v20 = ____o17[__k17]
      if not( __k17 == "toplevel") then
        __entry[__k17] = __v20
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
  local __args5 = unstash({...})
  return join({"%do"}, map(function (__x43)
    local ____id7 = __x43
    local __lh1 = has(____id7, 1)
    local __rh1 = has(____id7, 2)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has" then
      return {"%set", join({"%get"}, tl(__lh1)), __rh1}
    else
      return {"%set", __lh1, __rh1}
    end
  end, pair(__args5)))
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
      local ____id11 = __body2
      local __expr2 = has(____id11, 1)
      local __body3 = cut(____id11, 1)
      local __comps1 = {}
      local __cond1 = nil
      while _35(__body3) > 2 and (__body3[1] == "for" and __body3[3] == "in") do
        local ____id12 = __body3
        local ___for1 = has(____id12, 1)
        local __names1 = has(____id12, 2)
        local ___in1 = has(____id12, 3)
        local __l9 = has(____id12, 4)
        local __body12 = cut(____id12, 4)
        add(__comps1, {__names1, __l9})
        __body3 = __body12
      end
      if hd(__body3) == "if" then
        local ____id13 = __body3
        local ___if1 = has(____id13, 1)
        local __expr3 = has(____id13, 2)
        __cond1 = __expr3
      end
      return {"%list", __expr2, __comps1, __cond1}
    else
      local __x70 = unique("x")
      local __l10 = {}
      local __forms1 = {}
      local ____o19 = __body2
      local __k19 = nil
      for __k19 in next, ____o19 do
        local __v22 = ____o19[__k19]
        if number63(__k19) then
          __l10[__k19] = __v22
        else
          add(__forms1, {"%set", {"%get", __x70, {"quote", __k19}}, __v22})
        end
      end
      if some63(__forms1) then
        return join({"let", __x70, {"object", join({"%array"}, __l10)}}, __forms1, {__x70})
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
  local ____r106 = unstash({...})
  local __expr5 = destash33(expr, ____r106)
  local ____id16 = ____r106
  local __e28 = nil
  if nil63(has(____id16, "cmp")) then
    __e28 = "="
  else
    __e28 = has(____id16, "cmp")
  end
  local __cmp1 = __e28
  local __clauses1 = cut(____id16, 0)
  local __x94 = unique("x")
  local __eq1 = function (_)
    return {__cmp1, _, __x94}
  end
  local __cl1 = function (__x96)
    local ____id17 = __x96
    local __a4 = has(____id17, 1)
    local __b4 = has(____id17, 2)
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
  return {"let", __x94, __expr5, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end
setenv("case", {
  _stash = true,
  macro = __case__macro
})
local function __of__macro(x, ...)
  local ____r110 = unstash({...})
  local __x109 = destash33(x, ____r110)
  local ____id19 = ____r110
  local __values1 = cut(____id19, 0)
  return join({"case", __x109, __values1, true, false}, props(__values1))
end
setenv("of", {
  _stash = true,
  macro = __of__macro
})
local function __when__macro(cond, ...)
  local ____r112 = unstash({...})
  local __cond3 = destash33(cond, ____r112)
  local ____id21 = ____r112
  local __body5 = cut(____id21, 0)
  return {"%if", __cond3, join({"%do"}, __body5)}
end
setenv("when", {
  _stash = true,
  macro = __when__macro
})
local function __unless__macro(cond, ...)
  local ____r114 = unstash({...})
  local __cond5 = destash33(cond, ____r114)
  local ____id23 = ____r114
  local __body7 = cut(____id23, 0)
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
      local ____id27 = __body10
      local __expr8 = has(____id27, 1)
      local __body111 = cut(____id27, 1)
      local __comps3 = {}
      local __cond7 = nil
      while _35(__body111) > 2 and (__body111[1] == "for" and __body111[3] == "in") do
        local ____id28 = __body111
        local ___for3 = has(____id28, 1)
        local __names3 = has(____id28, 2)
        local ___in3 = has(____id28, 3)
        local __l121 = has(____id28, 4)
        local __body14 = cut(____id28, 4)
        add(__comps3, {__names3, __l121})
        __body111 = __body14
      end
      if hd(__body111) == "if" then
        local ____id29 = __body111
        local ___if3 = has(____id29, 1)
        local __expr9 = has(____id29, 2)
        __cond7 = __expr9
      end
      if list63(__expr8) and hd63(__expr8, ",") then
        __expr8 = join({":"}, tl(__expr8))
      end
      local ____x133 = object({"%list", __expr8, __comps3, __cond7})
      ____x133.kind = "object"
      return ____x133
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
  local ____r118 = unstash({...})
  local __bs11 = destash33(bs, ____r118)
  local ____id34 = ____r118
  local __body131 = cut(____id34, 0)
  if atom63(__bs11) or hd63(__bs11, ",") then
    return join({"let", {__bs11, hd(__body131)}}, tl(__body131))
  else
    if none63(__bs11) then
      return join({"%do"}, __body131)
    else
      local ____id35 = __bs11
      local __lh3 = has(____id35, 1)
      local __rh3 = has(____id35, 2)
      local __bs21 = cut(____id35, 2)
      local ____id36 = bind(__lh3, __rh3)
      local __id37 = has(____id36, 1)
      local __val1 = has(____id36, 2)
      local __bs12 = cut(____id36, 2)
      local __renames1 = {}
      if not id_literal63(__id37) then
        local __id121 = unique(__id37)
        __renames1 = {__id37, __id121}
        __id37 = __id121
      end
      return {"%do", {"%local", __id37, __val1}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body131)}}
    end
  end
end
setenv("let", {
  _stash = true,
  macro = __let__macro
})
local function __with__macro(x, v, ...)
  local ____r120 = unstash({...})
  local __x162 = destash33(x, ____r120)
  local __v24 = destash33(v, ____r120)
  local ____id39 = ____r120
  local __body15 = cut(____id39, 0)
  if __v24 == "as" then
    return join({"%with", {"%as", __x162, hd(__body15)}}, tl(__body15))
  else
    if not atom63(__x162) or has(__body15, "async") then
      return join({"%with", __x162, __v24}, __body15)
    else
      return join({"let", {__x162, __v24}}, __body15, {__x162})
    end
  end
end
setenv("with", {
  _stash = true,
  macro = __with__macro
})
local function __let_when__macro(x, v, ...)
  local ____r122 = unstash({...})
  local __x177 = destash33(x, ____r122)
  local __v26 = destash33(v, ____r122)
  local ____id41 = ____r122
  local __body17 = cut(____id41, 0)
  local __y6 = unique("y")
  return {"let", __y6, __v26, {"when", {"yes", __y6}, join({"let", {__x177, __y6}}, __body17)}}
end
setenv("let-when", {
  _stash = true,
  macro = __let_when__macro
})
local function __define_macro__macro(name, args, ...)
  local ____r124 = unstash({...})
  local __name1 = destash33(name, ____r124)
  local __args7 = destash33(args, ____r124)
  local ____id44 = ____r124
  local __body19 = cut(____id44, 0)
  local __id45 = unique(__name1 .. "--macro")
  local ____x191 = object({"setenv", {"quote", __name1}})
  ____x191.macro = __id45
  local __form1 = {"do", join({"define", __id45, __args7}, __body19), ____x191}
  eval(__form1)
  return __form1
end
setenv("define-macro", {
  _stash = true,
  macro = __define_macro__macro
})
local function __define_special__macro(name, args, ...)
  local ____r126 = unstash({...})
  local __name3 = destash33(name, ____r126)
  local __args9 = destash33(args, ____r126)
  local ____id48 = ____r126
  local __body21 = cut(____id48, 0)
  local __id49 = unique(__name3 .. "--special")
  local ____x201 = object({"setenv", {"quote", __name3}})
  ____x201.special = __id49
  local __form3 = {"do", join({"define", __id49, __args9}, __body21), join(____x201, props(__body21))}
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
  local ____x206 = object({"setenv", {"quote", name}})
  ____x206.symbol = {"quote", expansion}
  return ____x206
end
setenv("define-symbol", {
  _stash = true,
  macro = __define_symbol__macro
})
local function __define_reader__macro(__x215, ...)
  local ____r130 = unstash({...})
  local ____x215 = destash33(__x215, ____r130)
  local ____id52 = ____x215
  local __char1 = has(____id52, 1)
  local __s2 = has(____id52, 2)
  local ____id53 = ____r130
  local __body23 = cut(____id53, 0)
  return {"%set", {"%get", "read-table", __char1}, join({"fn", {__s2}}, __body23)}
end
setenv("define-reader", {
  _stash = true,
  macro = __define_reader__macro
})
local function __define__macro(name, x, ...)
  local ____r132 = unstash({...})
  local __name5 = destash33(name, ____r132)
  local __x226 = destash33(x, ____r132)
  local ____id55 = ____r132
  local __body25 = cut(____id55, 0)
  setenv(__name5, {
    _stash = true,
    variable = true
  })
  if some63(__body25) then
    return join({"%local-function", __name5}, bind42(__x226, __body25), props(__body25))
  else
    return join({"%local", __name5, __x226}, props(__body25))
  end
end
setenv("define", {
  _stash = true,
  macro = __define__macro
})
local function __define_global__macro(name, x, ...)
  local ____r134 = unstash({...})
  local __name7 = destash33(name, ____r134)
  local __x234 = destash33(x, ____r134)
  local ____id57 = ____r134
  local __body27 = cut(____id57, 0)
  setenv(__name7, {
    _stash = true,
    toplevel = true,
    variable = true
  })
  if some63(__body27) then
    return join({"%global-function", __name7}, bind42(__x234, __body27), props(__body27))
  else
    return join({"set", __name7, __x234}, props(__body27))
  end
end
setenv("define-global", {
  _stash = true,
  macro = __define_global__macro
})
local function __get_value__macro(x)
  local ____x241 = object({"setenv", x})
  ____x241.toplevel = true
  return {"has", ____x241, {"quote", "value"}}
end
setenv("get-value", {
  _stash = true,
  macro = __get_value__macro
})
local function __define_constant__macro(name, x)
  local ____x252 = object({"setenv", {"quote", name}})
  ____x252.toplevel = true
  ____x252.value = either(x, {"get-value", {"quote", name}})
  return {"%do", ____x252, {"define-symbol", name, {"get-value", {"quote", name}}}}
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
  local ____r143 = unstash({...})
  local __x282 = destash33(x, ____r143)
  local ____id59 = ____r143
  local __body29 = cut(____id59, 0)
  local __ok2 = unique("ok")
  local __r144 = unique("r")
  local ____x283 = object({"target", {"try", __x282, join({"finally"}, __body29)}})
  ____x283.lua = join({"let", {{__ok2, __r144}, {"guard", __x282}}}, __body29, {{"if", __ok2, __r144, {"throw", __r144}}})
  return ____x283
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
  local __k21 = nil
  for __k21 in next, ____o21 do
    local __v28 = ____o21[__k21]
    if not number63(__k21) then
      local ____x313 = object({"setenv", {"quote", __k21}})
      ____x313.value = __v28
      add(__forms3, ____x313)
    end
  end
  return join({"with-frame"}, __forms3)
end
setenv("with-values", {
  _stash = true,
  macro = __with_values__macro
})
local function __with_bindings__macro(__x321, ...)
  local ____r146 = unstash({...})
  local ____x321 = destash33(__x321, ____r146)
  local ____id62 = ____x321
  local __names5 = has(____id62, 1)
  local ____id63 = ____r146
  local __body35 = cut(____id63, 0)
  local __x323 = unique("x")
  local ____x326 = object({"setenv", __x323})
  ____x326.variable = true
  return join({"with-frame", {"each", __x323, __names5, ____x326}}, __body35)
end
setenv("with-bindings", {
  _stash = true,
  macro = __with_bindings__macro
})
local function __let_macro__macro(definitions, ...)
  local ____r150 = unstash({...})
  local __definitions1 = destash33(definitions, ____r150)
  local ____id66 = ____r150
  local __body37 = cut(____id66, 0)
  add(environment, {})
  local ____id67 = {xpcall(function ()
    map(function (m)
      return macroexpand(join({"define-macro"}, m))
    end, __definitions1)
    return join({"%do"}, macroexpand(__body37))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e29 = nil
      if string63(m) then
        __e29 = clip(m, search(m, ": ") + 2)
      else
        local __e30 = nil
        if nil63(m) then
          __e30 = ""
        else
          __e30 = str(m)
        end
        __e29 = __e30
      end
      return {
        stack = debug.traceback(),
        message = __e29
      }
    end
  end)}
  local ____ok4 = has(____id67, 1)
  local ____r151 = has(____id67, 2)
  drop(environment)
  if ____ok4 then
    return ____r151
  else
    error(____r151)
  end
end
setenv("let-macro", {
  _stash = true,
  macro = __let_macro__macro
})
local function __let_symbol__macro(expansions, ...)
  local ____r156 = unstash({...})
  local __expansions1 = destash33(expansions, ____r156)
  local ____id71 = ____r156
  local __body39 = cut(____id71, 0)
  add(environment, {})
  local ____id72 = {xpcall(function ()
    map(function (__x350)
      local ____id73 = __x350
      local __name9 = has(____id73, 1)
      local __exp1 = has(____id73, 2)
      return macroexpand({"define-symbol", __name9, __exp1})
    end, pair(__expansions1))
    return join({"%do"}, macroexpand(__body39))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e31 = nil
      if string63(m) then
        __e31 = clip(m, search(m, ": ") + 2)
      else
        local __e32 = nil
        if nil63(m) then
          __e32 = ""
        else
          __e32 = str(m)
        end
        __e31 = __e32
      end
      return {
        stack = debug.traceback(),
        message = __e31
      }
    end
  end)}
  local ____ok6 = has(____id72, 1)
  local ____r157 = has(____id72, 2)
  drop(environment)
  if ____ok6 then
    return ____r157
  else
    error(____r157)
  end
end
setenv("let-symbol", {
  _stash = true,
  macro = __let_symbol__macro
})
local function __let_unique__macro(names, ...)
  local ____r161 = unstash({...})
  local __names7 = destash33(names, ____r161)
  local ____id75 = ____r161
  local __body41 = cut(____id75, 0)
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
  local ____r164 = unstash({...})
  local __args19 = destash33(args, ____r164)
  local ____id77 = ____r164
  local __body43 = cut(____id77, 0)
  return join({"%function"}, bind42(__args19, __body43), props(__body43))
end
setenv("fn", {
  _stash = true,
  macro = __fn__macro
})
local function __apply__macro(f, ...)
  local ____r166 = unstash({...})
  local __f3 = destash33(f, ____r166)
  local ____id79 = ____r166
  local __args21 = cut(____id79, 0)
  if _35(__args21) > 1 then
    return {"%call", "apply", __f3, {"join", join({"list"}, almost(__args21)), last(__args21), join({"list"}, props(__args21))}}
  else
    if props63(__args21) then
      return {"%call", "apply", __f3, join({"join"}, __args21, {join({"list"}, props(__args21))})}
    else
      return join({"%call", "apply", __f3}, __args21)
    end
  end
end
setenv("apply", {
  _stash = true,
  macro = __apply__macro
})
local function __guard__macro(expr)
  local ____x417 = object({"target", {{"%function", join(), {"%try", {"list", true, expr}}}}})
  local ____x429 = object({"obj"})
  ____x429.stack = {{"idx", "debug", "traceback"}}
  ____x429.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
  ____x417.lua = {"list", {"xpcall", {"%function", join(), expr}, {"%function", {"m"}, {"if", {"obj?", "m"}, "m", ____x429}}}}
  return {"let-macro", {{"%return", "args", {"error", "\"Can't return from guard\""}}}, ____x417}
end
setenv("guard", {
  _stash = true,
  macro = __guard__macro
})
local function __each__macro(x, t, ...)
  local ____r170 = unstash({...})
  local __x458 = destash33(x, ____r170)
  local __t4 = destash33(t, ____r170)
  local ____id82 = ____r170
  local __body45 = cut(____id82, 0)
  local __o23 = unique("o")
  local __n29 = unique("n")
  local __i37 = unique("i")
  local __e33 = nil
  if atom63(__x458) then
    __e33 = {__i37, __x458}
  else
    local __e34 = nil
    if _35(__x458) > 1 then
      __e34 = __x458
    else
      __e34 = {__i37, hd(__x458)}
    end
    __e33 = __e34
  end
  local ____id83 = __e33
  local __k23 = has(____id83, 1)
  local __v30 = has(____id83, 2)
  local ____x464 = object({"target", __o23})
  ____x464.py = {"indices", __o23}
  local __e35 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e35 = __body45
  else
    __e35 = {join({"let", __k23, {"if", {"numeric?", __k23}, {"parseInt", __k23}, __k23}}, __body45)}
  end
  return {"let", {__o23, __t4, __k23, "nil"}, join({"%for", ____x464, __k23}, props(__body45), {join({"let", {__v30, {"%get", __o23, __k23}}}, __e35)})}
end
setenv("each", {
  _stash = true,
  macro = __each__macro
})
local function __for__macro(i, to, ...)
  local ____r172 = unstash({...})
  local __i39 = destash33(i, ____r172)
  local __to1 = destash33(to, ____r172)
  local ____id85 = ____r172
  local __body47 = cut(____id85, 0)
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
  local ____r174 = unstash({...})
  local __v32 = destash33(v, ____r174)
  local __t6 = destash33(t, ____r174)
  local ____id87 = ____r174
  local __body49 = cut(____id87, 0)
  local __x501 = unique("x")
  local __i41 = unique("i")
  return {"let", {__x501, __t6}, {"for", __i41, {"#", __x501}, join({"let", {__v32, {"at", __x501, __i41}}}, __body49)}}
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
    local __x513 = ____o25[____i43]
    __l14[__x513] = true
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
  local ____r180 = unstash({...})
  local __a6 = destash33(a, ____r180)
  local ____id89 = ____r180
  local __bs5 = cut(____id89, 0)
  return {"set", __a6, join({"join", __a6}, __bs5)}
end
setenv("join!", {
  _stash = true,
  macro = __join33__macro
})
local function __cat33__macro(a, ...)
  local ____r182 = unstash({...})
  local __a8 = destash33(a, ____r182)
  local ____id91 = ____r182
  local __bs7 = cut(____id91, 0)
  return {"set", __a8, join({"cat", __a8}, __bs7)}
end
setenv("cat!", {
  _stash = true,
  macro = __cat33__macro
})
local function __inc__macro(n, by)
  local __e36 = nil
  if nil63(by) then
    __e36 = 1
  else
    __e36 = by
  end
  return {"set", n, {"+", n, __e36}}
end
setenv("inc", {
  _stash = true,
  macro = __inc__macro
})
local function __dec__macro(n, by)
  local __e37 = nil
  if nil63(by) then
    __e37 = 1
  else
    __e37 = by
  end
  return {"set", n, {"-", n, __e37}}
end
setenv("dec", {
  _stash = true,
  macro = __dec__macro
})
local function __with_indent__macro(form)
  local __x546 = unique("x")
  return {"%do", {"inc", "indent-level"}, {"with", __x546, form, {"dec", "indent-level"}}}
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
  local ____r192 = unstash({...})
  local __name11 = destash33(name, ____r192)
  local ____id93 = ____r192
  local __body55 = cut(____id93, 0)
  return join({"define-global", __name11}, __body55)
end
setenv("def", {
  _stash = true,
  macro = __def__macro
})
local function __mac__macro(name, ...)
  local ____r194 = unstash({...})
  local __name13 = destash33(name, ____r194)
  local ____id95 = ____r194
  local __body57 = cut(____id95, 0)
  return join({"define-macro", __name13}, __body57)
end
setenv("mac", {
  _stash = true,
  macro = __mac__macro
})
local function __defconst__macro(name, ...)
  local ____r196 = unstash({...})
  local __name15 = destash33(name, ____r196)
  local ____id97 = ____r196
  local __value1 = cut(____id97, 0)
  return join({"def", __name15}, __value1)
end
setenv("defconst", {
  _stash = true,
  macro = __defconst__macro
})
local function __undefined63__macro(name)
  local ____x610 = object({"target"})
  ____x610.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x610.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x610.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x610
end
setenv("undefined?", {
  _stash = true,
  macro = __undefined63__macro
})
local function __defvar__macro(name, ...)
  local ____r200 = unstash({...})
  local __name17 = destash33(name, ____r200)
  local ____id99 = ____r200
  local __value3 = cut(____id99, 0)
  local ____x628 = object({"target"})
  ____x628.py = {"global", __name17}
  return {"when", {"undefined?", __name17}, ____x628, join({"defconst", __name17}, __value3)}
end
setenv("defvar", {
  _stash = true,
  macro = __defvar__macro
})
local function __async__macro(keyword, ...)
  local ____r202 = unstash({...})
  local __keyword1 = destash33(keyword, ____r202)
  local ____id101 = ____r202
  local __body59 = cut(____id101, 0)
  local ____x634 = object({__keyword1})
  ____x634.async = true
  return join(____x634, __body59)
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
  local ____r208 = unstash({...})
  local __a10 = destash33(a, ____r208)
  local ____id103 = ____r208
  local __bs9 = cut(____id103, 0)
  if nil63(__a10) then
    return ""
  else
    if none63(__bs9) then
      return __a10
    else
      if one63(__bs9) then
        local ____x660 = object({"target", join({"%cat", __a10}, __bs9)})
        ____x660.py = join({"%call", "cat", __a10}, __bs9)
        return ____x660
      else
        local ____x663 = object({"target", {"%cat", __a10, join({"cat"}, __bs9)}})
        ____x663.py = join({"%call", "cat", __a10}, __bs9)
        return ____x663
      end
    end
  end
end
setenv("cat", {
  _stash = true,
  macro = __cat__macro
})
local function ___43__macro(...)
  local __args23 = unstash({...})
  if none63(__args23) then
    return 0
  else
    if one63(__args23) then
      return hd(__args23)
    else
      return join({"%add"}, __args23)
    end
  end
end
setenv("+", {
  _stash = true,
  macro = ___43__macro
})
local function _____macro(...)
  local __args25 = unstash({...})
  if none63(__args25) then
    return 0
  else
    if one63(__args25) then
      return {"%unm", hd(__args25)}
    else
      return join({"%sub"}, __args25)
    end
  end
end
setenv("-", {
  _stash = true,
  macro = _____macro
})
local function ___42__macro(...)
  local __args27 = unstash({...})
  if none63(__args27) then
    return 1
  else
    if one63(__args27) then
      return hd(__args27)
    else
      return join({"%mul"}, __args27)
    end
  end
end
setenv("*", {
  _stash = true,
  macro = ___42__macro
})
local function ___47__macro(...)
  local __args29 = unstash({...})
  if none63(__args29) then
    return 1
  else
    if one63(__args29) then
      return hd(__args29)
    else
      return join({"%div"}, __args29)
    end
  end
end
setenv("/", {
  _stash = true,
  macro = ___47__macro
})
local function ___4747__macro(...)
  local __args31 = unstash({...})
  if none63(__args31) then
    return 1
  else
    if one63(__args31) then
      return hd(__args31)
    else
      return join({"%idiv"}, __args31)
    end
  end
end
setenv("//", {
  _stash = true,
  macro = ___4747__macro
})
local function ___37__macro(...)
  local __args33 = unstash({...})
  if none63(__args33) then
    return 0
  else
    if one63(__args33) then
      return hd(__args33)
    else
      return join({"%mod"}, __args33)
    end
  end
end
setenv("%", {
  _stash = true,
  macro = ___37__macro
})
local function ___60__macro(a, ...)
  local ____r210 = unstash({...})
  local __a12 = destash33(a, ____r210)
  local ____id105 = ____r210
  local __bs111 = cut(____id105, 0)
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
  local ____r212 = unstash({...})
  local __a14 = destash33(a, ____r212)
  local ____id107 = ____r212
  local __bs13 = cut(____id107, 0)
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
  local ____r214 = unstash({...})
  local __a16 = destash33(a, ____r214)
  local ____id109 = ____r214
  local __bs15 = cut(____id109, 0)
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
  local ____r216 = unstash({...})
  local __a18 = destash33(a, ____r216)
  local ____id1111 = ____r216
  local __bs17 = cut(____id1111, 0)
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
  local ____r218 = unstash({...})
  local __a20 = destash33(a, ____r218)
  local ____id113 = ____r218
  local __bs19 = cut(____id113, 0)
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
  local __args35 = unstash({...})
  if none63(__args35) then
    return false
  else
    if one63(__args35) then
      return join({"%not"}, __args35)
    else
      return {"%and", {"%not", hd(__args35)}, join({"not"}, tl(__args35))}
    end
  end
end
setenv("not", {
  _stash = true,
  macro = __not__macro
})
local function __and__macro(a, ...)
  local ____r220 = unstash({...})
  local __a22 = destash33(a, ____r220)
  local ____id115 = ____r220
  local __bs211 = cut(____id115, 0)
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
  local ____r222 = unstash({...})
  local __a24 = destash33(a, ____r222)
  local ____id117 = ____r222
  local __bs23 = cut(____id117, 0)
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
  local __args37 = unstash({...})
  return join({"%break"}, __args37)
end
setenv("break", {
  _stash = true,
  macro = __break__macro
})
local function __return__macro(...)
  local __args39 = unstash({...})
  return join({"%return"}, __args39)
end
setenv("return", {
  _stash = true,
  macro = __return__macro
})
local function __while__macro(c, ...)
  local ____r224 = unstash({...})
  local __c3 = destash33(c, ____r224)
  local ____id119 = ____r224
  local __body61 = cut(____id119, 0)
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
  local __args41 = unstash({...})
  return join({"%get"}, __args41)
end
setenv("get", {
  _stash = true,
  macro = __get__macro
})
local function __idx__macro(...)
  local __args43 = unstash({...})
  return join({"%idx"}, __args43)
end
setenv("idx", {
  _stash = true,
  macro = __idx__macro
})
local function __new__macro(...)
  local __args45 = unstash({...})
  return join({"%new"}, __args45)
end
setenv("new", {
  _stash = true,
  macro = __new__macro
})
local function __typeof__macro(...)
  local __args47 = unstash({...})
  return join({"%typeof"}, __args47)
end
setenv("typeof", {
  _stash = true,
  macro = __typeof__macro
})
local function __error__macro(...)
  local __args49 = unstash({...})
  return join({"%error"}, __args49)
end
setenv("error", {
  _stash = true,
  macro = __error__macro
})
local function __throw__macro(...)
  local __args51 = unstash({...})
  return join({"%throw"}, __args51)
end
setenv("throw", {
  _stash = true,
  macro = __throw__macro
})
local function __raise__macro(...)
  local __args53 = unstash({...})
  return join({"%throw"}, __args53)
end
setenv("raise", {
  _stash = true,
  macro = __raise__macro
})
local function __is__macro(...)
  local __args55 = unstash({...})
  local ____x818 = object({"target", join({"="}, __args55)})
  ____x818.py = join({"%is"}, __args55)
  return ____x818
end
setenv("is", {
  _stash = true,
  macro = __is__macro
})
local function __in__macro(...)
  local __args57 = unstash({...})
  return join({"%in"}, __args57)
end
setenv("in", {
  _stash = true,
  macro = __in__macro
})
local function __as__macro(...)
  local __args59 = unstash({...})
  return join({"%as"}, __args59)
end
setenv("as", {
  _stash = true,
  macro = __as__macro
})
local function ___37expand_case__macro(x, ...)
  local ____r226 = unstash({...})
  local __x836 = destash33(x, ____r226)
  local ____id122 = ____r226
  local __body65 = cut(____id122, 0)
  local __e38 = nil
  if atom63(__x836) then
    __e38 = {__x836}
  else
    __e38 = __x836
  end
  local ____id123 = __e38
  local __a26 = has(____id123, 1)
  local __bs25 = cut(____id123, 1)
  local __e39 = nil
  if none63(__bs25) then
    __e39 = {{"%literal"}}
  else
    __e39 = __bs25
  end
  return join({"%block", __a26}, __e39, __body65)
end
setenv("%expand-case", {
  _stash = true,
  macro = ___37expand_case__macro
})
local function ___37cases__macro(...)
  local __args61 = unstash({...})
  if none63(__args61) then
    return {"do"}
  else
    if one63(__args61) then
      return join({"%expand-case"}, hd(__args61))
    else
      local __r229 = unique("r")
      return join({"with", __r229, "nil"}, map(function (__x856)
        local ____id125 = __x856
        local __x857 = has(____id125, 1)
        local __body67 = cut(____id125, 1)
        return {"%expand-case", __x857, {"%set", __r229, join({"%do"}, __body67)}}
      end, almost(__args61)), {join({"%expand-case"}, last(__args61))})
    end
  end
end
setenv("%cases", {
  _stash = true,
  macro = ___37cases__macro
})
local function __try__macro(x, ...)
  local ____r232 = unstash({...})
  local __x878 = destash33(x, ____r232)
  local ____id130 = ____r232
  local __cases1 = cut(____id130, 0)
  local __fin1 = {"finally"}
  local ____o27 = __cases1
  local ____i46 = nil
  for ____i46 in next, ____o27 do
    local __x880 = ____o27[____i46]
    if hd63(__x880, "finally") then
      __fin1 = __x880
    end
  end
  local __forms7 = {}
  local ____x883 = __cases1
  local ____i47 = 0
  while ____i47 < _35(____x883) do
    local ____id131 = ____x883[____i47 + 1]
    local __x884 = has(____id131, 1)
    local __body71 = cut(____id131, 1)
    if __x884 == "finally" then
    else
      if __x884 == "except" and has(__body71, 1) == "as" then
        local ____id132 = __body71
        local __kind2 = has(____id132, 1)
        local ___1 = has(____id132, 2)
        local __name19 = has(____id132, 3)
        local __body72 = cut(____id132, 3)
        add(__forms7, join({{__x884, {"%as", __kind2, __name19}}}, __body72))
      else
        if __x884 == "except" then
          local ____id133 = __body71
          local __kind3 = has(____id133, 1)
          local __body73 = cut(____id133, 1)
          add(__forms7, join({{__x884, __kind3}}, __body73))
        else
          error("Unknown try clause")
        end
      end
    end
    ____i47 = ____i47 + 1
  end
  return join({"%cases", {"try", __x878}}, __forms7, {__fin1})
end
setenv("try", {
  _stash = true,
  macro = __try__macro
})
local function __errsafe__macro(x, _else)
  if nil63(_else) then
    _else = "nil"
  end
  local __ok8 = unique("ok")
  local __v34 = unique("v")
  return {"let", {{__ok8, __v34}, {"guard", x}}, {"if", __ok8, __v34, _else}}
end
setenv("errsafe", {
  _stash = true,
  macro = __errsafe__macro
})
local function __dbg__macro()
  local ____x907 = object({"target", {"do"}})
  ____x907.py = {"do", {"import", "pdb"}, {{"idx", "pdb", "set-trace"}}}
  return ____x907
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
local runtime = require("runtime")
local macros = require("macros")
local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
function _G.disp(str)
  system.write(str)
  return system.flush()
end
function _G.pp(x)
  if list63(x) and _35(x) > 1 then
    local __c4 = "  "
    local __nl = nil
    print("(")
    local ____x915 = x
    local ____i48 = 0
    while ____i48 < _35(____x915) do
      local __v35 = ____x915[____i48 + 1]
      if __nl then
        print("")
      end
      disp(__c4)
      __nl = true
      __c4 = "  "
      print(str(__v35))
      ____i48 = ____i48 + 1
    end
    return print(")")
  else
    return print(str(x))
  end
end
function _G.dir(x)
  local __r242 = {}
  local ____o28 = x
  local __k24 = nil
  for __k24 in next, ____o28 do
    local __v36 = ____o28[__k24]
    add(__r242, __k24)
  end
  return __r242
end
function _G.lines(x)
  return split(x, "\n")
end
function _G.get_indentation(s)
  local __r245 = ""
  local __i50 = 0
  while __i50 < _35(s) do
    local __c5 = char(s, __i50)
    if __c5 == " " then
      __r245 = __r245 .. __c5
    end
    __i50 = __i50 + 1
  end
  return __r245
end
function _G.strip_outer(s, lh, rh)
  if string_starts63(s, lh) and string_ends63(s, rh) then
    return clip(clip(s, 0, _35(s) - _35(rh)), _35(lh))
  else
    return s
  end
end
function _G.toplevel_print(v)
  return pp(v)
end
function _G.print_exception(v, ex)
  print("error: " .. (v.message .. ("\n" .. v.stack)))
  return nil
end
_37self = reader
local function accessor_literal63(form)
  return string63(form) and (not string_literal63(form) and (not id_literal63(form) and (char(form, 0) == "." and (not( clip(form, 0, 2) == "..") and _35(form) > 1))))
end
function _G.eval_self_form(form)
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
function _G.eval_print(form)
  local __form8 = eval_self_form(form)
  local ____id134 = {xpcall(function ()
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
  local __ok9 = has(____id134, 1)
  local __v37 = has(____id134, 2)
  local __ex = has(____id134, 3)
  if not __ok9 then
    return print_exception(__v37, __ex)
  else
    if is63(__v37) then
      return toplevel_print(__v37)
    end
  end
end
function _G.read_toplevel(str, more)
  local __s3 = reader.stream(str, more)
  local ____id135 = {xpcall(function ()
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
  local ____ok10 = has(____id135, 1)
  local ____v38 = has(____id135, 2)
  local __e44 = nil
  if ____ok10 then
    __e44 = ____v38
  else
    __e44 = nil
  end
  local __x924 = __e44
  if __x924 == more then
    return more
  else
    if nil63(__x924) then
      return __x924
    else
      if one63(__x924) then
        return hd(__x924)
      else
        return __x924
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
local function __with_file_directory__macro(file, name, ...)
  local ____r259 = unstash({...})
  local __file1 = destash33(file, ____r259)
  local __name21 = destash33(name, ____r259)
  local ____id137 = ____r259
  local __body75 = cut(____id137, 0)
  local __cwd1 = unique("cwd")
  return {"let", {__cwd1, {"system", {".cwd"}}, __name21, __file1, __name21, {"system", {".basename", __file1}}}, {"system", {".chdir", {"system", {".dirname", __file1}}}}, {"after", join({"do"}, __body75), {"system", {".chdir", __cwd1}}}}
end
setenv("with-file-directory", {
  _stash = true,
  macro = __with_file_directory__macro
})
function _G.read_file(path)
  local ____cwd2 = system.cwd()
  local __name22 = path
  local __name23 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id138 = {xpcall(function ()
    return system.read_file(__name23)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e45 = nil
      if string63(m) then
        __e45 = clip(m, search(m, ": ") + 2)
      else
        local __e46 = nil
        if nil63(m) then
          __e46 = ""
        else
          __e46 = str(m)
        end
        __e45 = __e46
      end
      return {
        stack = debug.traceback(),
        message = __e45
      }
    end
  end)}
  local ____ok11 = has(____id138, 1)
  local ____r261 = has(____id138, 2)
  system.chdir(____cwd2)
  if ____ok11 then
    return ____r261
  else
    error(____r261)
  end
end
function _G.read_from_file(path)
  local __data = read_file(path)
  local ____cwd3 = system.cwd()
  local __name24 = path
  local __name25 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id139 = {xpcall(function ()
    local __s5 = reader.stream(__data)
    return reader.read_all(__s5)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e47 = nil
      if string63(m) then
        __e47 = clip(m, search(m, ": ") + 2)
      else
        local __e48 = nil
        if nil63(m) then
          __e48 = ""
        else
          __e48 = str(m)
        end
        __e47 = __e48
      end
      return {
        stack = debug.traceback(),
        message = __e47
      }
    end
  end)}
  local ____ok12 = has(____id139, 1)
  local ____r263 = has(____id139, 2)
  system.chdir(____cwd3)
  if ____ok12 then
    return ____r263
  else
    error(____r263)
  end
end
function _G.expand_file(path)
  local __body76 = read_from_file(path)
  local ____cwd4 = system.cwd()
  local __name26 = path
  local __name27 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id140 = {xpcall(function ()
    return compiler.expand(join({"do"}, __body76))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e49 = nil
      if string63(m) then
        __e49 = clip(m, search(m, ": ") + 2)
      else
        local __e50 = nil
        if nil63(m) then
          __e50 = ""
        else
          __e50 = str(m)
        end
        __e49 = __e50
      end
      return {
        stack = debug.traceback(),
        message = __e49
      }
    end
  end)}
  local ____ok13 = has(____id140, 1)
  local ____r265 = has(____id140, 2)
  system.chdir(____cwd4)
  if ____ok13 then
    return ____r265
  else
    error(____r265)
  end
end
function _G.compile_file(path)
  local __form10 = expand_file(path)
  local ____cwd5 = system.cwd()
  local __name28 = path
  local __name29 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id141 = {xpcall(function ()
    return compiler.compile(__form10, {
      _stash = true,
      stmt = true
    })
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e51 = nil
      if string63(m) then
        __e51 = clip(m, search(m, ": ") + 2)
      else
        local __e52 = nil
        if nil63(m) then
          __e52 = ""
        else
          __e52 = str(m)
        end
        __e51 = __e52
      end
      return {
        stack = debug.traceback(),
        message = __e51
      }
    end
  end)}
  local ____ok14 = has(____id141, 1)
  local ____r267 = has(____id141, 2)
  system.chdir(____cwd5)
  if ____ok14 then
    return ____r267
  else
    error(____r267)
  end
end
function _G.load(path)
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
  local ____cwd6 = system.cwd()
  local __name30 = path
  local __name31 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id142 = {xpcall(function ()
    return compiler.run(__code)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e53 = nil
      if string63(m) then
        __e53 = clip(m, search(m, ": ") + 2)
      else
        local __e54 = nil
        if nil63(m) then
          __e54 = ""
        else
          __e54 = str(m)
        end
        __e53 = __e54
      end
      return {
        stack = debug.traceback(),
        message = __e53
      }
    end
  end)}
  local ____ok15 = has(____id142, 1)
  local ____r269 = has(____id142, 2)
  system.chdir(____cwd6)
  if ____ok15 then
    return ____r269
  else
    error(____r269)
  end
end
local function script_file63(path)
  return not( "-" == char(path, 0) or (".py" == clip(path, _35(path) - 3) or (".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4))))
end
local function run_file(path)
  if script_file63(path) then
    return load(path)
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
    return load(__arg)
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
      local ____x974 = __pre
      local ____i52 = 0
      while ____i52 < _35(____x974) do
        local __file2 = ____x974[____i52 + 1]
        run_file(__file2)
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
