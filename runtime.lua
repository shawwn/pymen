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
    local ____o1 = x
    local __k1 = nil
    for __k1 in next, ____o1 do
      local __v7 = ____o1[__k1]
      if number63(__k1) then
        __l[__k1] = __v7
      end
    end
    return __l
  end
end
function _G.object(x)
  if array63(x) then
    local __l1 = {}
    local ____o2 = x
    local __k2 = nil
    for __k2 in next, ____o2 do
      local __v8 = ____o2[__k2]
      __l1[__k2] = __v8
    end
    return __l1
  else
    return x
  end
end
function _G.length(x, upto)
  local __n3 = -1
  local __upto = either(upto, inf)
  local ____o3 = x
  local __k3 = nil
  for __k3 in next, ____o3 do
    local __v9 = ____o3[__k3]
    if number63(__k3) then
      __k3 = __k3 - 1
      if __k3 > __n3 then
        __n3 = __k3
        if __n3 >= __upto then
          break
        end
      end
    end
  end
  __n3 = __n3 + 1
  return __n3
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
  local __e22 = nil
  if nil63(from) or from < 0 then
    __e22 = 0
  else
    __e22 = from
  end
  local __i8 = __e22
  local __n5 = _35(x)
  local __e23 = nil
  if nil63(upto) or upto > __n5 then
    __e23 = __n5
  else
    __e23 = upto
  end
  local __upto1 = __e23
  while __i8 < __upto1 do
    __l2[__j + 1] = x[__i8 + 1]
    __i8 = __i8 + 1
    __j = __j + 1
  end
  local ____o4 = x
  local __k4 = nil
  for __k4 in next, ____o4 do
    local __v10 = ____o4[__k4]
    if not number63(__k4) then
      __l2[__k4] = __v10
    end
  end
  return __l2
end
function _G.props(x)
  local __t = {}
  local ____o5 = x
  local __k5 = nil
  for __k5 in next, ____o5 do
    local __v11 = ____o5[__k5]
    if not number63(__k5) then
      __t[__k5] = __v11
    end
  end
  return __t
end
function _G.values(x)
  if array63(x) then
    return x
  else
    local __t1 = {}
    local ____o6 = x
    local __k6 = nil
    for __k6 in next, ____o6 do
      local __v12 = ____o6[__k6]
      if number63(__k6) then
        __t1[__k6] = __v12
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
  local __e24 = nil
  if n then
    __e24 = n + 1
  end
  return string.byte(s, __e24)
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
  local __i12 = edge(l)
  while __i12 >= 0 do
    add(__l11, l[__i12 + 1])
    __i12 = __i12 - 1
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
  local __r106 = {}
  local ____x71 = __ls
  local ____i13 = 0
  while ____i13 < _35(____x71) do
    local __l3 = ____x71[____i13 + 1]
    if __l3 then
      local __n9 = _35(__r106)
      local ____o7 = __l3
      local __k7 = nil
      for __k7 in next, ____o7 do
        local __v13 = ____o7[__k7]
        if number63(__k7) then
          __k7 = __k7 + __n9
        else
          __l3 = object(__l3)
        end
        __r106[__k7] = __v13
      end
    end
    ____i13 = ____i13 + 1
  end
  return __r106
end
function _G.find(f, t)
  local ____o8 = t
  local ____i15 = nil
  for ____i15 in next, ____o8 do
    local __x72 = ____o8[____i15]
    local __y1 = f(__x72)
    if __y1 then
      return __y1
    end
  end
end
function _G.first(f, l)
  local ____x73 = l
  local ____i16 = 0
  while ____i16 < _35(____x73) do
    local __x74 = ____x73[____i16 + 1]
    local __y2 = f(__x74)
    if __y2 then
      return __y2
    end
    ____i16 = ____i16 + 1
  end
end
function _G.in63(x, t)
  return find(function (y)
    return x == y
  end, t)
end
function _G.pair(l)
  local __l12 = dupe(l)
  local __n12 = _35(l)
  local __i17 = 0
  while __i17 < __n12 do
    local __a1 = l[__i17 + 1]
    local __b = l[__i17 + 1 + 1]
    add(__l12, {__a1, __b})
    __i17 = __i17 + 1
    __i17 = __i17 + 1
  end
  return __l12
end
local function sortfunc(f)
  if f then
    local __f3 = function (a, b)
      if f(a, b) then
        return -1
      else
        return 1
      end
    end
    return __f3
  end
end
function _G.sort(l, f)
  table.sort(l, f)
  return l
end
function _G.map(f, x)
  local __t2 = dupe(x)
  local ____x76 = x
  local ____i18 = 0
  while ____i18 < _35(____x76) do
    local __v14 = ____x76[____i18 + 1]
    local __y3 = f(__v14)
    if is63(__y3) then
      add(__t2, __y3)
    end
    ____i18 = ____i18 + 1
  end
  local ____o9 = x
  local __k8 = nil
  for __k8 in next, ____o9 do
    local __v15 = ____o9[__k8]
    if not number63(__k8) then
      local __y4 = f(__v15)
      if is63(__y4) then
        __t2[__k8] = __y4
      end
    end
  end
  return __t2
end
function _G.mapcat(f, x, sep)
  local __r117 = ""
  local __c2 = ""
  local ____x77 = x
  local ____i20 = 0
  while ____i20 < _35(____x77) do
    local __v16 = ____x77[____i20 + 1]
    local __e25 = nil
    if f then
      __e25 = f(__v16)
    else
      __e25 = __v16
    end
    local __y5 = __e25
    if is63(__y5) then
      __r117 = __r117 .. (__c2 .. __y5)
      __c2 = sep or ""
    end
    ____i20 = ____i20 + 1
  end
  return __r117
end
function _G.keep(f, x)
  return map(function (v)
    if yes(f(v)) then
      return v
    end
  end, x)
end
function _G.props63(t)
  local ____o10 = t
  local __k9 = nil
  for __k9 in next, ____o10 do
    local __v17 = ____o10[__k9]
    if not number63(__k9) then
      return true
    end
  end
  return false
end
function _G.empty63(t)
  local ____o11 = t
  local ____i22 = nil
  for ____i22 in next, ____o11 do
    local __x78 = ____o11[____i22]
    return false
  end
  return true
end
function _G.stash(args)
  if props63(args) then
    local __p = {}
    local ____o12 = args
    local __k10 = nil
    for __k10 in next, ____o12 do
      local __v18 = ____o12[__k10]
      if not number63(__k10) then
        __p[__k10] = __v18
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
      local __args111 = object(almost(args))
      local ____o13 = __l4
      local __k11 = nil
      for __k11 in next, ____o13 do
        local __v19 = ____o13[__k11]
        if not( __k11 == "_stash") then
          __args111[__k11] = __v19
        end
      end
      if params then
        local ____o14 = params
        local __k12 = nil
        for __k12 in next, ____o14 do
          local __v20 = ____o14[__k12]
          __args111[__k12] = __v20
        end
      end
      return __args111
    else
      if params then
        local __args121 = object(args)
        local ____o15 = params
        local __k13 = nil
        for __k13 in next, ____o15 do
          local __v21 = ____o15[__k13]
          __args121[__k13] = __v21
        end
        return __args121
      else
        return args
      end
    end
  end
end
function _G.destash33(l, args1)
  if obj63(l) and has63(l, "_stash") then
    local ____o16 = l
    local __k14 = nil
    for __k14 in next, ____o16 do
      local __v22 = ____o16[__k14]
      if not( __k14 == "_stash") then
        args1[__k14] = __v22
      end
    end
  else
    return l
  end
end
function _G.search(s, pattern, start)
  local __e26 = nil
  if start then
    __e26 = start + 1
  end
  local __start = __e26
  local __i28 = string.find(s, pattern, __start, true)
  return __i28 and __i28 - 1
end
function _G.string_ends63(str, x, pos)
  local __e27 = nil
  if is63(pos) then
    __e27 = clip(str, pos)
  else
    __e27 = str
  end
  local __str = __e27
  if _35(x) > _35(__str) then
    return false
  else
    return x == clip(__str, _35(__str) - _35(x))
  end
end
function _G.string_starts63(str, x, pos)
  local __e28 = nil
  if is63(pos) then
    __e28 = clip(str, pos)
  else
    __e28 = str
  end
  local __str1 = __e28
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
    local __n21 = _35(sep)
    while true do
      local __i29 = search(s, sep)
      if nil63(__i29) then
        break
      else
        add(__l5, clip(s, 0, __i29))
        s = clip(s, __i29 + __n21)
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
  local __i30 = 0
  while __i30 < edge(xs) do
    local __a2 = xs[__i30 + 1]
    local __b1 = xs[__i30 + 1 + 1]
    if not f(__a2, __b1) then
      return false
    end
    __i30 = __i30 + 1
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
  local __n22 = _35(s)
  local __i31 = 0
  while __i31 < __n22 do
    if not number_code63(code(s, __i31)) then
      return false
    end
    __i31 = __i31 + 1
  end
  return some63(s)
end
function _G.escape(s)
  if nil63(search(s, "\n")) and (nil63(search(s, "\r")) and (nil63(search(s, "\"")) and nil63(search(s, "\\")))) then
    return "\"" .. (s .. "\"")
  else
    local __s11 = "\""
    local __i32 = 0
    while __i32 < _35(s) do
      local __c3 = char(s, __i32)
      local __e29 = nil
      if __c3 == "\n" then
        __e29 = "\\n"
      else
        local __e30 = nil
        if __c3 == "\r" then
          __e30 = "\\r"
        else
          local __e31 = nil
          if __c3 == "\"" then
            __e31 = "\\\""
          else
            local __e32 = nil
            if __c3 == "\\" then
              __e32 = "\\\\"
            else
              __e32 = __c3
            end
            __e31 = __e32
          end
          __e30 = __e31
        end
        __e29 = __e30
      end
      local __c11 = __e29
      __s11 = __s11 .. __c11
      __i32 = __i32 + 1
    end
    return __s11 .. "\""
  end
end
function _G.simple_id63(x)
  local ____id13 = {xpcall(function ()
    return read_string(x)
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
  local ____ok9 = has(____id13, 1)
  local ____v23 = has(____id13, 2)
  local __e35 = nil
  if ____ok9 then
    __e35 = ____v23
  else
    __e35 = nil
  end
  local __r148 = __e35
  if __r148 == x then
    return __r148
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
                        local __s3 = "("
                        local __sp = ""
                        local __xs11 = {}
                        local __ks = {}
                        local __l6 = stack or {}
                        add(__l6, x)
                        local ____o17 = x
                        local __k15 = nil
                        for __k15 in next, ____o17 do
                          local __v24 = ____o17[__k15]
                          if number63(__k15) then
                            __xs11[__k15] = str(__v24, repr, __l6)
                          else
                            if not string63(__k15) then
                              __k15 = str(__k15, repr, __l6)
                            end
                            if function63(__v24) then
                              add(__ks, {"." .. __k15, ""})
                            else
                              add(__ks, {__k15 .. ": ", str(__v24, repr, __l6)})
                            end
                          end
                        end
                        sort(__ks, function (__x95, __x96)
                          local ____id14 = __x95
                          local __a3 = has(____id14, 1)
                          local ____id15 = __x96
                          local __b2 = has(____id15, 1)
                          return __a3 < __b2
                        end)
                        drop(__l6)
                        local ____x97 = __xs11
                        local ____i34 = 0
                        while ____i34 < _35(____x97) do
                          local __v25 = ____x97[____i34 + 1]
                          __s3 = __s3 .. (__sp .. __v25)
                          __sp = " "
                          ____i34 = ____i34 + 1
                        end
                        local ____x98 = __ks
                        local ____i35 = 0
                        while ____i35 < _35(____x98) do
                          local ____id16 = ____x98[____i35 + 1]
                          local __k16 = has(____id16, 1)
                          local __v26 = has(____id16, 2)
                          __s3 = __s3 .. (__sp .. (__k16 .. __v26))
                          __sp = " "
                          ____i35 = ____i35 + 1
                        end
                        return __s3 .. ")"
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
  local __args20 = stash(args)
  return f(unpack(__args20))
end
function _G.call(f, ...)
  local ____r152 = unstash({...})
  local __f4 = destash33(f, ____r152)
  local ____id17 = ____r152
  local __args21 = cut(____id17, 0)
  return apply(__f4, __args21)
end
function _G.setenv(k, ...)
  local ____r153 = unstash({...})
  local __k17 = destash33(k, ____r153)
  local ____id18 = ____r153
  local __keys = cut(____id18, 0)
  if string63(__k17) then
    local __e36 = nil
    if has63(__keys, "toplevel") then
      __e36 = hd(environment)
    else
      __e36 = last(environment)
    end
    local __frame = __e36
    local __e37 = nil
    if has63(__frame, __k17) then
      __e37 = __frame[__k17]
    else
      __e37 = {}
    end
    local __entry = __e37
    local ____o18 = __keys
    local __k18 = nil
    for __k18 in next, ____o18 do
      local __v27 = ____o18[__k18]
      if not( __k18 == "toplevel") then
        __entry[__k18] = __v27
      end
    end
    __frame[__k17] = __entry
    return __frame[__k17]
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
