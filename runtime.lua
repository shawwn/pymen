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
  if nil63(x) then
    return 0
  else
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
end
function _G._35(x, upto)
  if x then
    return #x
  else
    return 0
  end
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
  if is63(l) then
    return l[1]
  end
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
  if is63(l) then
    return cut(l, 1)
  end
end
function _G.char(s, n)
  return clip(s, n, n + 1)
end
function _G.code(s, n)
  local __e2 = nil
  if n then
    __e2 = n + 1
  end
  return string.byte(s, __e2)
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
  local ____x2 = __ls
  local ____i8 = 0
  while ____i8 < _35(____x2) do
    local __l3 = ____x2[____i8 + 1]
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
function _G.testify(x, test)
  if function63(x) then
    return x
  else
    if test then
      return function (y)
        return test(y, x)
      end
    else
      return function (y)
        return x == y
      end
    end
  end
end
function _G.find(x, t)
  local __f = testify(x)
  local ____o7 = t
  local ____i10 = nil
  for ____i10 in next, ____o7 do
    local __x3 = ____o7[____i10]
    local __y = __f(__x3)
    if __y then
      return __y
    end
  end
end
function _G.first(x, l, pos)
  local __f1 = testify(x)
  local __i11 = either(pos, 0)
  local __n11 = -1
  local ____o8 = l
  local __k7 = nil
  for __k7 in next, ____o8 do
    local __v7 = ____o8[__k7]
    if number63(__k7) then
      __k7 = __k7 - 1
      __n11 = max(__n11, __k7)
    end
  end
  __n11 = __n11 + 1
  while __i11 < __n11 do
    local __v8 = l[__i11 + 1]
    local ____y1 = __f1(__v8)
    if yes(____y1) then
      local __y2 = ____y1
      return __i11
    end
    __i11 = __i11 + 1
  end
end
function _G.in63(x, t)
  return find(testify(x), t)
end
function _G.pair(l)
  local __l12 = dupe(l)
  local __n13 = _35(l)
  local __i13 = 0
  while __i13 < __n13 do
    local __a = l[__i13 + 1]
    local __b = l[__i13 + 1 + 1]
    add(__l12, {__a, __b})
    __i13 = __i13 + 1
    __i13 = __i13 + 1
  end
  return __l12
end
local function sortfunc(f)
  if f then
    local __f2 = function (a, b)
      if f(a, b) then
        return -1
      else
        return 1
      end
    end
    return __f2
  end
end
function _G.sort(l, f)
  table.sort(l, f)
  return l
end
function _G.map(f, x)
  local __t2 = dupe(x)
  local ____x5 = x
  local ____i14 = 0
  while ____i14 < _35(____x5) do
    local __v9 = ____x5[____i14 + 1]
    local __y3 = f(__v9)
    if is63(__y3) then
      add(__t2, __y3)
    end
    ____i14 = ____i14 + 1
  end
  local ____o9 = x
  local __k8 = nil
  for __k8 in next, ____o9 do
    local __v10 = ____o9[__k8]
    if not number63(__k8) then
      local __y4 = f(__v10)
      if is63(__y4) then
        __t2[__k8] = __y4
      end
    end
  end
  return __t2
end
function _G.mapcat(f, x, sep)
  local __r58 = ""
  local __c = ""
  local ____x6 = x
  local ____i16 = 0
  while ____i16 < _35(____x6) do
    local __v11 = ____x6[____i16 + 1]
    local __e3 = nil
    if f then
      __e3 = f(__v11)
    else
      __e3 = __v11
    end
    local __y5 = __e3
    if is63(__y5) then
      __r58 = __r58 .. (__c .. __y5)
      __c = sep or ""
    end
    ____i16 = ____i16 + 1
  end
  return __r58
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
    local __v12 = ____o10[__k9]
    if not number63(__k9) then
      return true
    end
  end
  return false
end
function _G.empty63(t)
  local ____o11 = t
  local ____i18 = nil
  for ____i18 in next, ____o11 do
    local __x7 = ____o11[____i18]
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
      local __v13 = ____o12[__k10]
      if not number63(__k10) then
        __p[__k10] = __v13
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
      local ____o13 = __l4
      local __k11 = nil
      for __k11 in next, ____o13 do
        local __v14 = ____o13[__k11]
        if not( __k11 == "_stash") then
          __args1[__k11] = __v14
        end
      end
      if params then
        local ____o14 = params
        local __k12 = nil
        for __k12 in next, ____o14 do
          local __v15 = ____o14[__k12]
          __args1[__k12] = __v15
        end
      end
      return __args1
    else
      if params then
        local __args11 = object(args)
        local ____o15 = params
        local __k13 = nil
        for __k13 in next, ____o15 do
          local __v16 = ____o15[__k13]
          __args11[__k13] = __v16
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
    local ____o16 = l
    local __k14 = nil
    for __k14 in next, ____o16 do
      local __v17 = ____o16[__k14]
      if not( __k14 == "_stash") then
        args1[__k14] = __v17
      end
    end
  else
    return l
  end
end
function _G.search(s, pattern, start)
  local __e4 = nil
  if start then
    __e4 = start + 1
  end
  local __start = __e4
  local __i24 = string.find(s, pattern, __start, true)
  return __i24 and __i24 - 1
end
function _G.string_ends63(str, x, pos)
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
function _G.string_starts63(str, x, pos)
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
function _G.split(s, sep)
  if s == "" or sep == "" then
    return {}
  else
    local __l5 = {}
    local __n22 = _35(sep)
    while true do
      local __i25 = search(s, sep)
      if nil63(__i25) then
        break
      else
        add(__l5, clip(s, 0, __i25))
        s = clip(s, __i25 + __n22)
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
  local __i26 = 0
  while __i26 < edge(xs) do
    local __a1 = xs[__i26 + 1]
    local __b1 = xs[__i26 + 1 + 1]
    if not f(__a1, __b1) then
      return false
    end
    __i26 = __i26 + 1
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
  local __n23 = _35(s)
  local __i27 = 0
  while __i27 < __n23 do
    if not number_code63(code(s, __i27)) then
      return false
    end
    __i27 = __i27 + 1
  end
  return some63(s)
end
function _G.escape(s)
  if nil63(search(s, "\n")) and (nil63(search(s, "\r")) and (nil63(search(s, "\"")) and nil63(search(s, "\\")))) then
    return "\"" .. (s .. "\"")
  else
    local __s1 = "\""
    local __i28 = 0
    while __i28 < _35(s) do
      local __c1 = char(s, __i28)
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
      __i28 = __i28 + 1
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
      local __e11 = nil
      if string63(m) then
        __e11 = clip(m, search(m, ": ") + 2)
      else
        local __e12 = nil
        if nil63(m) then
          __e12 = ""
        else
          __e12 = str(m)
        end
        __e11 = __e12
      end
      return {
        stack = debug.traceback(),
        message = __e11
      }
    end
  end)}
  local ____ok = has(____id, 1)
  local ____v18 = has(____id, 2)
  local __e13 = nil
  if ____ok then
    __e13 = ____v18
  else
    __e13 = nil
  end
  local __r89 = __e13
  if __r89 == x then
    return __r89
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
                        local ____o17 = x
                        local __k15 = nil
                        for __k15 in next, ____o17 do
                          local __v19 = ____o17[__k15]
                          if number63(__k15) then
                            __xs11[__k15] = str(__v19, repr, __l6)
                          else
                            if not string63(__k15) then
                              __k15 = str(__k15, repr, __l6)
                            end
                            if function63(__v19) then
                              add(__ks, {"." .. __k15, ""})
                            else
                              add(__ks, {__k15 .. ": ", str(__v19, repr, __l6)})
                            end
                          end
                        end
                        sort(__ks, function (__x24, __x25)
                          local ____id1 = __x24
                          local __a2 = has(____id1, 1)
                          local ____id2 = __x25
                          local __b2 = has(____id2, 1)
                          return __a2 < __b2
                        end)
                        drop(__l6)
                        local ____x26 = __xs11
                        local ____i30 = 0
                        while ____i30 < _35(____x26) do
                          local __v20 = ____x26[____i30 + 1]
                          __s = __s .. (__sp .. __v20)
                          __sp = " "
                          ____i30 = ____i30 + 1
                        end
                        local ____x27 = __ks
                        local ____i31 = 0
                        while ____i31 < _35(____x27) do
                          local ____id3 = ____x27[____i31 + 1]
                          local __k16 = has(____id3, 1)
                          local __v21 = has(____id3, 2)
                          __s = __s .. (__sp .. (__k16 .. __v21))
                          __sp = " "
                          ____i31 = ____i31 + 1
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
  local ____r93 = unstash({...})
  local __f3 = destash33(f, ____r93)
  local ____id4 = ____r93
  local __args3 = cut(____id4, 0)
  return apply(__f3, __args3)
end
local function identifier(k)
  return reduce(function (a, b)
    return a .. ("_" .. b)
  end, split(k, "-"))
end
function _G.setenv(k, ...)
  local ____r96 = unstash({...})
  local __k17 = destash33(k, ____r96)
  local ____id5 = ____r96
  local __keys = cut(____id5, 0)
  if string63(__k17) then
    local __e14 = nil
    if has63(__keys, "toplevel") then
      __e14 = hd(environment)
    else
      __e14 = last(environment)
    end
    local __frame = __e14
    local __e15 = nil
    if has63(__frame, __k17) then
      __e15 = __frame[__k17]
    else
      __e15 = {}
    end
    local __entry = __e15
    local ____o18 = __keys
    local __k18 = nil
    for __k18 in next, ____o18 do
      local __v22 = ____o18[__k18]
      local __k19 = identifier(__k18)
      if not( __k19 == "toplevel") then
        __entry[__k19] = __v22
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
