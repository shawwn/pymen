if _G.environment == nil then
  environment = {{}}
end
function _G.nil63(x)
  return x == nil
end
nil63 = nil63
function _G.is63(x)
  return not nil63(x)
end
is63 = is63
function _G.no(x)
  return nil63(x) or x == false
end
no = no
function _G.yes(x)
  return not no(x)
end
yes = yes
function _G.either(x, y)
  if is63(x) then
    return x
  else
    return y
  end
end
either = either
function _G.has63(l, k)
  return is63(l[k])
end
has63 = has63
function _G.has(l, k, _else)
  if has63(l, k) then
    return l[k]
  else
    return _else
  end
end
has = has
function _G.array63(x)
  return type(x) == "table"
end
array63 = array63
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
array = array
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
object = object
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
length = length
function _G._35(x, upto)
  if x then
    return #x
  else
    return 0
  end
end
_35 = _35
function _G.none63(x)
  return _35(x, 0) == 0
end
none63 = none63
function _G.some63(x)
  return _35(x, 0) > 0
end
some63 = some63
function _G.one63(x)
  return _35(x, 1) == 1
end
one63 = one63
function _G.two63(x)
  return _35(x, 2) == 2
end
two63 = two63
function _G.hd(l)
  if is63(l) then
    return l[1]
  end
end
hd = hd
function _G.string63(x)
  return type(x) == "string"
end
string63 = string63
function _G.number63(x)
  return type(x) == "number"
end
number63 = number63
function _G.boolean63(x)
  return type(x) == "boolean"
end
boolean63 = boolean63
function _G.function63(x)
  return type(x) == "function"
end
function63 = function63
function _G.obj63(x)
  return is63(x) and type(x) == "table"
end
obj63 = obj63
function _G.list63(x)
  return obj63(x) or array63(x)
end
list63 = list63
function _G.atom63(x)
  return nil63(x) or (string63(x) or (number63(x) or boolean63(x)))
end
atom63 = atom63
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
hd63 = hd63
nan = 0 / 0
inf = 1 / 0
_inf = - inf
function _G.nan63(n)
  return not( n == n)
end
nan63 = nan63
function _G.inf63(n)
  return n == inf or n == _inf
end
inf63 = inf63
function _G.clip(s, from, upto)
  return string.sub(s, from + 1, upto)
end
clip = clip
function _G.dupe(x)
  return {}
end
dupe = dupe
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
cut = cut
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
props = props
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
values = values
function _G.edge(x)
  return _35(x) - 1
end
edge = edge
function _G.inner(x)
  return clip(x, 1, edge(x))
end
inner = inner
function _G.tl(l)
  if is63(l) then
    return cut(l, 1)
  end
end
tl = tl
function _G.char(s, n)
  return clip(s, n, n + 1)
end
char = char
function _G.code(s, n)
  local __e14 = nil
  if n then
    __e14 = n + 1
  end
  return string.byte(s, __e14)
end
code = code
function _G.string_literal63(x)
  return string63(x) and char(x, 0) == "\""
end
string_literal63 = string_literal63
function _G.id_literal63(x)
  return string63(x) and char(x, 0) == "|"
end
id_literal63 = id_literal63
function _G.add(l, x)
  return table.insert(l, x)
end
add = add
function _G.drop(l)
  return table.remove(l)
end
drop = drop
function _G.last(l)
  return l[edge(l) + 1]
end
last = last
function _G.almost(l)
  return cut(l, 0, edge(l))
end
almost = almost
function _G.reverse(l)
  local __l11 = props(l)
  local __i7 = edge(l)
  while __i7 >= 0 do
    add(__l11, l[__i7 + 1])
    __i7 = __i7 - 1
  end
  return __l11
end
reverse = reverse
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
reduce = reduce
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
join = join
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
testify = testify
function _G.find(x, t)
  local __f = testify(x)
  local ____o7 = t
  local __k7 = nil
  for __k7 in next, ____o7 do
    local __v7 = ____o7[__k7]
    local ____y = __f(__v7, __k7)
    if yes(____y) then
      local __y1 = ____y
      if number63(__k7) then
        __k7 = __k7 - 1
      end
      return __k7
    end
  end
end
find = find
function _G.first(x, l, pos)
  local __f1 = testify(x)
  local __i11 = either(pos, 0)
  local __n11 = -1
  local ____o8 = l
  local __k8 = nil
  for __k8 in next, ____o8 do
    local __v8 = ____o8[__k8]
    if number63(__k8) then
      __k8 = __k8 - 1
      __n11 = max(__n11, __k8)
    end
  end
  __n11 = __n11 + 1
  while __i11 < __n11 do
    local __v9 = l[__i11 + 1]
    local ____y2 = __f1(__v9)
    if yes(____y2) then
      local __y3 = ____y2
      return __i11
    end
    __i11 = __i11 + 1
  end
end
first = first
function _G.in63(x, t)
  return yes(find(testify(x), t))
end
in63 = in63
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
pair = pair
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
sort = sort
function _G.map(f, x)
  local __t2 = dupe(x)
  local ____x5 = x
  local ____i14 = 0
  while ____i14 < _35(____x5) do
    local __v10 = ____x5[____i14 + 1]
    local __y4 = f(__v10)
    if is63(__y4) then
      add(__t2, __y4)
    end
    ____i14 = ____i14 + 1
  end
  local ____o9 = x
  local __k9 = nil
  for __k9 in next, ____o9 do
    local __v11 = ____o9[__k9]
    if not number63(__k9) then
      local __y5 = f(__v11)
      if is63(__y5) then
        __t2[__k9] = __y5
      end
    end
  end
  return __t2
end
map = map
function _G.mapcat(f, x, sep)
  local __r58 = ""
  local __c = ""
  local ____x6 = x
  local ____i16 = 0
  while ____i16 < _35(____x6) do
    local __v12 = ____x6[____i16 + 1]
    local __e15 = nil
    if f then
      __e15 = f(__v12)
    else
      __e15 = __v12
    end
    local __y6 = __e15
    if is63(__y6) then
      __r58 = __r58 .. (__c .. __y6)
      __c = sep or ""
    end
    ____i16 = ____i16 + 1
  end
  return __r58
end
mapcat = mapcat
function _G.keep(f, x)
  return map(function (v)
    if yes(f(v)) then
      return v
    end
  end, x)
end
keep = keep
function _G.props63(t)
  local ____o10 = t
  local __k10 = nil
  for __k10 in next, ____o10 do
    local __v13 = ____o10[__k10]
    if not number63(__k10) then
      return true
    end
  end
  return false
end
props63 = props63
function _G.empty63(t)
  local ____o11 = t
  local ____i18 = nil
  for ____i18 in next, ____o11 do
    local __x7 = ____o11[____i18]
    return false
  end
  return true
end
empty63 = empty63
function _G.stash(args)
  if props63(args) then
    local __p = {}
    local ____o12 = args
    local __k11 = nil
    for __k11 in next, ____o12 do
      local __v14 = ____o12[__k11]
      if not number63(__k11) then
        __p[__k11] = __v14
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
stash = stash
function _G.unstash(args, params)
  if none63(args) then
    return params or {}
  else
    local __l4 = last(args)
    if obj63(__l4) and has63(__l4, "_stash") then
      local __args1 = object(almost(args))
      local ____o13 = __l4
      local __k12 = nil
      for __k12 in next, ____o13 do
        local __v15 = ____o13[__k12]
        if not( __k12 == "_stash") then
          __args1[__k12] = __v15
        end
      end
      if params then
        local ____o14 = params
        local __k13 = nil
        for __k13 in next, ____o14 do
          local __v16 = ____o14[__k13]
          __args1[__k13] = __v16
        end
      end
      return __args1
    else
      if params then
        local __args11 = object(args)
        local ____o15 = params
        local __k14 = nil
        for __k14 in next, ____o15 do
          local __v17 = ____o15[__k14]
          __args11[__k14] = __v17
        end
        return __args11
      else
        return args
      end
    end
  end
end
unstash = unstash
function _G.destash33(l, args1)
  if obj63(l) and has63(l, "_stash") then
    local ____o16 = l
    local __k15 = nil
    for __k15 in next, ____o16 do
      local __v18 = ____o16[__k15]
      if not( __k15 == "_stash") then
        args1[__k15] = __v18
      end
    end
  else
    return l
  end
end
destash33 = destash33
function _G.search(s, pattern, start)
  local __e16 = nil
  if start then
    __e16 = start + 1
  end
  local __start = __e16
  local __i24 = string.find(s, pattern, __start, true)
  return __i24 and __i24 - 1
end
search = search
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
string_ends63 = string_ends63
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
string_starts63 = string_starts63
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
split = split
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
cat = cat
function _G._43(...)
  local __xs1 = unstash({...})
  return reduce(function (a, b)
    return a + b
  end, __xs1, 0)
end
_43 = _43
function _G._45(...)
  local __xs2 = unstash({...})
  return reduce(function (b, a)
    return a - b
  end, reverse(__xs2), 0)
end
_45 = _45
function _G._42(...)
  local __xs3 = unstash({...})
  return reduce(function (a, b)
    return a * b
  end, __xs3, 1)
end
_42 = _42
function _G._47(...)
  local __xs4 = unstash({...})
  return reduce(function (b, a)
    return a / b
  end, reverse(__xs4), 1)
end
_47 = _47
function _G._37(...)
  local __xs5 = unstash({...})
  return reduce(function (b, a)
    return a % b
  end, reverse(__xs5), 1)
end
_37 = _37
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
_60 = _60
function _G._62(...)
  local __xs7 = unstash({...})
  return pairwise(function (a, b)
    return a > b
  end, __xs7)
end
_62 = _62
function _G._61(...)
  local __xs8 = unstash({...})
  return pairwise(function (a, b)
    return a == b
  end, __xs8)
end
_61 = _61
function _G._6061(...)
  local __xs9 = unstash({...})
  return pairwise(function (a, b)
    return a <= b
  end, __xs9)
end
_6061 = _6061
function _G._6261(...)
  local __xs10 = unstash({...})
  return pairwise(function (a, b)
    return a >= b
  end, __xs10)
end
_6261 = _6261
function _G.number_code63(n)
  return n > 47 and n < 58
end
number_code63 = number_code63
function _G.number(s)
  return tonumber(s)
end
number = number
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
numeric63 = numeric63
function _G.escape(s)
  if nil63(search(s, "\n")) and (nil63(search(s, "\r")) and (nil63(search(s, "\"")) and nil63(search(s, "\\")))) then
    return "\"" .. (s .. "\"")
  else
    local __s1 = "\""
    local __i28 = 0
    while __i28 < _35(s) do
      local __c1 = char(s, __i28)
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
      __i28 = __i28 + 1
    end
    return __s1 .. "\""
  end
end
escape = escape
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
  local ____v19 = has(____id, 2)
  local __e25 = nil
  if ____ok then
    __e25 = ____v19
  else
    __e25 = nil
  end
  local __r89 = __e25
  if __r89 == x then
    return __r89
  end
end
simple_id63 = simple_id63
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
                        local __k16 = nil
                        for __k16 in next, ____o17 do
                          local __v20 = ____o17[__k16]
                          if number63(__k16) then
                            __xs11[__k16] = str(__v20, repr, __l6)
                          else
                            if not string63(__k16) then
                              __k16 = str(__k16, repr, __l6)
                            end
                            if function63(__v20) then
                              add(__ks, {"." .. __k16, ""})
                            else
                              add(__ks, {__k16 .. ": ", str(__v20, repr, __l6)})
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
                          local __v21 = ____x26[____i30 + 1]
                          __s = __s .. (__sp .. __v21)
                          __sp = " "
                          ____i30 = ____i30 + 1
                        end
                        local ____x27 = __ks
                        local ____i31 = 0
                        while ____i31 < _35(____x27) do
                          local ____id3 = ____x27[____i31 + 1]
                          local __k17 = has(____id3, 1)
                          local __v22 = has(____id3, 2)
                          __s = __s .. (__sp .. (__k17 .. __v22))
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
str = str
local unpack = unpack or table.unpack
function _G.apply(f, args)
  local __args2 = stash(args)
  return f(unpack(__args2))
end
apply = apply
function _G.call(f, ...)
  local ____r93 = unstash({...})
  local __f3 = destash33(f, ____r93)
  local ____id4 = ____r93
  local __args3 = cut(____id4, 0)
  return apply(__f3, __args3)
end
call = call
function _G.identifier(k)
  return reduce(function (a, b)
    return a .. ("_" .. b)
  end, split(k, "-"))
end
identifier = identifier
function _G.setenv(k, ...)
  local ____r96 = unstash({...})
  local __k18 = destash33(k, ____r96)
  local ____id5 = ____r96
  local __keys = cut(____id5, 0)
  if string63(__k18) then
    local __e26 = nil
    if has63(__keys, "toplevel") then
      __e26 = hd(environment)
    else
      __e26 = last(environment)
    end
    local __frame = __e26
    local __e27 = nil
    if has63(__frame, __k18) then
      __e27 = __frame[__k18]
    else
      __e27 = {}
    end
    local __entry = __e27
    local ____o18 = __keys
    local __k19 = nil
    for __k19 in next, ____o18 do
      local __v23 = ____o18[__k19]
      local __k20 = identifier(__k19)
      if not( __k20 == "toplevel") then
        __entry[__k20] = __v23
      end
    end
    __frame[__k18] = __entry
    return __frame[__k18]
  end
end
setenv = setenv
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
function _G.get_place(place, setfn)
  local __place = macroexpand(place)
  if atom63(__place) or (hd63(__place, "%get") and nil63(getenv("%get", "place-expander")) or (hd63(__place, "%idx") and nil63(getenv("%idx", "place-expander")) or accessor_literal63(hd(tl(__place))))) then
    return setfn(__place, function (v)
      return {"%set", __place, v}
    end)
  else
    if hd63(__place, "has") and nil63(getenv("has", "place-expander")) then
      return setfn(__place, function (v)
        return {"%set", join({"%get"}, tl(__place)), v}
      end)
    else
      local __head = hd(__place)
      local __gf = getenv(__head, "place-expander")
      if __gf then
        return apply(__gf, join({setfn}, tl(__place), {}))
      else
        error(str(__place) .. (" is not a valid place expression: no place-expander for " .. __head))
      end
    end
  end
end
get_place = get_place
local function __let_place__macro(vars, place, ...)
  local ____r105 = unstash({...})
  local __vars1 = destash33(vars, ____r105)
  local __place2 = destash33(place, ____r105)
  local ____id7 = ____r105
  local __body1 = cut(____id7, 0)
  return {"get-place", __place2, join({"fn", __vars1}, __body1)}
end
setenv("let-place", {
  _stash = true,
  macro = __let_place__macro
})
local function __define_expander__macro(name, handler)
  local ____x45 = object({"setenv", {"quote", name}})
  ____x45["place-expander"] = handler
  local __form1 = ____x45
  eval(__form1)
  return __form1
end
setenv("define-expander", {
  _stash = true,
  macro = __define_expander__macro
})
function _G.define_setter(name, setter, setfn, args, vars)
  if none63(args) then
    local __vars2 = reverse(vars or {})
    return setfn(join({name}, __vars2), function (v)
      return apply(setter, join({v}, __vars2, {}))
    end)
  else
    local __v24 = hd(args)
    return define_setter(name, setter, setfn, tl(args), join({__v24}, vars))
  end
end
define_setter = define_setter
local function __define_setter__macro(name, arglist, ...)
  local ____r111 = unstash({...})
  local __name1 = destash33(name, ____r111)
  local __arglist1 = destash33(arglist, ____r111)
  local ____id9 = ____r111
  local __body3 = cut(____id9, 0)
  local ____x61 = object({"setfn"})
  ____x61.rest = "args"
  return {"define-expander", __name1, {"fn", ____x61, {"%call", "define-setter", {"quote", __name1}, join({"fn", __arglist1}, __body3), "setfn", "args"}}}
end
setenv("define-setter", {
  _stash = true,
  macro = __define_setter__macro
})
local function __set__macro(...)
  local __args5 = unstash({...})
  return join({"%do"}, map(function (__x70)
    local ____id11 = __x70
    local __lh1 = has(____id11, 1)
    local __rh1 = has(____id11, 2)
    return get_place(__lh1, function (getter, setter)
      return setter(__rh1)
    end)
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
  local __body6 = unstash({...})
  if one63(__body6) and (hd63(__body6, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_args"
  else
    if _35(__body6) > 2 and (__body6[2] == "for" and __body6[4] == "in") then
      local ____id15 = __body6
      local __expr2 = has(____id15, 1)
      local __body7 = cut(____id15, 1)
      local __comps1 = {}
      local __cond1 = nil
      while _35(__body7) > 2 and (__body7[1] == "for" and __body7[3] == "in") do
        local ____id16 = __body7
        local ___for1 = has(____id16, 1)
        local __names1 = has(____id16, 2)
        local ___in1 = has(____id16, 3)
        local __l9 = has(____id16, 4)
        local __body12 = cut(____id16, 4)
        add(__comps1, {__names1, __l9})
        __body7 = __body12
      end
      if hd(__body7) == "if" then
        local ____id17 = __body7
        local ___if1 = has(____id17, 1)
        local __expr3 = has(____id17, 2)
        __cond1 = __expr3
      end
      return {"%list", __expr2, __comps1, __cond1}
    else
      local __x94 = unique("x")
      local __l10 = {}
      local __forms1 = {}
      local ____o20 = __body6
      local __k23 = nil
      for __k23 in next, ____o20 do
        local __v26 = ____o20[__k23]
        if number63(__k23) then
          __l10[__k23] = __v26
        else
          add(__forms1, {"%set", {"%get", __x94, {"quote", __k23}}, __v26})
        end
      end
      if some63(__forms1) then
        return join({"let", __x94, {"object", join({"%array"}, __l10)}}, __forms1, {__x94})
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
  local ____r123 = unstash({...})
  local __expr5 = destash33(expr, ____r123)
  local ____id20 = ____r123
  local __e28 = nil
  if nil63(has(____id20, "cmp")) then
    __e28 = "="
  else
    __e28 = has(____id20, "cmp")
  end
  local __cmp1 = __e28
  local __clauses1 = cut(____id20, 0)
  local __x118 = unique("x")
  local __eq1 = function (_)
    return {__cmp1, _, __x118}
  end
  local __cl1 = function (__x120)
    local ____id21 = __x120
    local __a4 = has(____id21, 1)
    local __b4 = has(____id21, 2)
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
  return {"let", __x118, __expr5, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end
setenv("case", {
  _stash = true,
  macro = __case__macro
})
local function __of__macro(x, ...)
  local ____r127 = unstash({...})
  local __x133 = destash33(x, ____r127)
  local ____id23 = ____r127
  local __values1 = cut(____id23, 0)
  return join({"case", __x133, __values1, true, false}, props(__values1))
end
setenv("of", {
  _stash = true,
  macro = __of__macro
})
local function __when__macro(cond, ...)
  local ____r129 = unstash({...})
  local __cond3 = destash33(cond, ____r129)
  local ____id25 = ____r129
  local __body9 = cut(____id25, 0)
  return {"%if", __cond3, join({"%do"}, __body9)}
end
setenv("when", {
  _stash = true,
  macro = __when__macro
})
local function __unless__macro(cond, ...)
  local ____r131 = unstash({...})
  local __cond5 = destash33(cond, ____r131)
  local ____id27 = ____r131
  local __body111 = cut(____id27, 0)
  return {"%if", {"%not", __cond5}, join({"%do"}, __body111)}
end
setenv("unless", {
  _stash = true,
  macro = __unless__macro
})
local function __obj__macro(...)
  local __body14 = unstash({...})
  if one63(__body14) and (hd63(__body14, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_keys"
  else
    if _35(__body14) > 2 and (__body14[2] == "for" and __body14[4] == "in") then
      local ____id31 = __body14
      local __expr8 = has(____id31, 1)
      local __body15 = cut(____id31, 1)
      local __comps3 = {}
      local __cond7 = nil
      while _35(__body15) > 2 and (__body15[1] == "for" and __body15[3] == "in") do
        local ____id32 = __body15
        local ___for3 = has(____id32, 1)
        local __names3 = has(____id32, 2)
        local ___in3 = has(____id32, 3)
        local __l121 = has(____id32, 4)
        local __body141 = cut(____id32, 4)
        add(__comps3, {__names3, __l121})
        __body15 = __body141
      end
      if hd(__body15) == "if" then
        local ____id33 = __body15
        local ___if3 = has(____id33, 1)
        local __expr9 = has(____id33, 2)
        __cond7 = __expr9
      end
      if list63(__expr8) and hd63(__expr8, ",") then
        __expr8 = join({":"}, tl(__expr8))
      end
      local ____x157 = object({"%list", __expr8, __comps3, __cond7})
      ____x157.kind = "object"
      return ____x157
    else
      return join({"%object"}, mapo(function (x)
        return x
      end, __body14))
    end
  end
end
setenv("obj", {
  _stash = true,
  macro = __obj__macro
})
local function __let__macro(bs, ...)
  local ____r135 = unstash({...})
  local __bs11 = destash33(bs, ____r135)
  local ____id38 = ____r135
  local __body17 = cut(____id38, 0)
  if atom63(__bs11) or hd63(__bs11, ",") then
    return join({"let", {__bs11, hd(__body17)}}, tl(__body17))
  else
    if none63(__bs11) then
      return join({"%do"}, __body17)
    else
      local ____id39 = __bs11
      local __lh3 = has(____id39, 1)
      local __rh3 = has(____id39, 2)
      local __bs21 = cut(____id39, 2)
      local ____id40 = bind(__lh3, __rh3)
      local __id41 = has(____id40, 1)
      local __val1 = has(____id40, 2)
      local __bs12 = cut(____id40, 2)
      local __renames1 = {}
      if not id_literal63(__id41) then
        local __id121 = unique(__id41)
        __renames1 = {__id41, __id121}
        __id41 = __id121
      end
      return {"%do", {"%local", __id41, __val1}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body17)}}
    end
  end
end
setenv("let", {
  _stash = true,
  macro = __let__macro
})
local function __with__macro(x, v, ...)
  local ____r137 = unstash({...})
  local __x186 = destash33(x, ____r137)
  local __v28 = destash33(v, ____r137)
  local ____id43 = ____r137
  local __body19 = cut(____id43, 0)
  if __v28 == "as" then
    return join({"%with", {"%as", __x186, hd(__body19)}}, tl(__body19))
  else
    if not atom63(__x186) or has(__body19, "async") then
      return join({"%with", __x186, __v28}, __body19)
    else
      return join({"let", {__x186, __v28}}, __body19, {__x186})
    end
  end
end
setenv("with", {
  _stash = true,
  macro = __with__macro
})
local function __let_when__macro(x, v, ...)
  local ____r139 = unstash({...})
  local __x201 = destash33(x, ____r139)
  local __v30 = destash33(v, ____r139)
  local ____id45 = ____r139
  local __body21 = cut(____id45, 0)
  local __y8 = unique("y")
  return {"let", __y8, __v30, {"when", {"yes", __y8}, join({"let", {__x201, __y8}}, __body21)}}
end
setenv("let-when", {
  _stash = true,
  macro = __let_when__macro
})
local function __define_macro__macro(name, args, ...)
  local ____r141 = unstash({...})
  local __name3 = destash33(name, ____r141)
  local __args7 = destash33(args, ____r141)
  local ____id48 = ____r141
  local __body23 = cut(____id48, 0)
  local __id49 = unique(__name3 .. "--macro")
  local ____x215 = object({"setenv", {"quote", __name3}})
  ____x215.macro = __id49
  local __form3 = {"do", join({"define", __id49, __args7}, __body23), ____x215}
  eval(__form3)
  return __form3
end
setenv("define-macro", {
  _stash = true,
  macro = __define_macro__macro
})
local function __define_special__macro(name, args, ...)
  local ____r143 = unstash({...})
  local __name5 = destash33(name, ____r143)
  local __args9 = destash33(args, ____r143)
  local ____id52 = ____r143
  local __body25 = cut(____id52, 0)
  local __id53 = unique(__name5 .. "--special")
  local ____x225 = object({"setenv", {"quote", __name5}})
  ____x225.special = __id53
  local __form5 = {"do", join({"define", __id53, __args9}, __body25), join(____x225, props(__body25))}
  eval(__form5)
  return __form5
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
  local ____x230 = object({"setenv", {"quote", name}})
  ____x230.symbol = {"quote", expansion}
  return ____x230
end
setenv("define-symbol", {
  _stash = true,
  macro = __define_symbol__macro
})
local function __define_reader__macro(__x239, ...)
  local ____r147 = unstash({...})
  local ____x239 = destash33(__x239, ____r147)
  local ____id56 = ____x239
  local __char1 = has(____id56, 1)
  local __s2 = has(____id56, 2)
  local ____id57 = ____r147
  local __body27 = cut(____id57, 0)
  return {"%set", {"%get", "read-table", __char1}, join({"fn", {__s2}}, __body27)}
end
setenv("define-reader", {
  _stash = true,
  macro = __define_reader__macro
})
local function __define__macro(name, x, ...)
  local ____r149 = unstash({...})
  local __name7 = destash33(name, ____r149)
  local __x250 = destash33(x, ____r149)
  local ____id59 = ____r149
  local __body29 = cut(____id59, 0)
  setenv(__name7, {
    _stash = true,
    variable = true
  })
  if some63(__body29) then
    return join({"%local-function", __name7}, bind42(__x250, __body29), props(__body29))
  else
    return join({"%local", __name7, __x250}, props(__body29))
  end
end
setenv("define", {
  _stash = true,
  macro = __define__macro
})
local function __define_global__macro(name, x, ...)
  local ____r151 = unstash({...})
  local __name9 = destash33(name, ____r151)
  local __x260 = destash33(x, ____r151)
  local ____id61 = ____r151
  local __body31 = cut(____id61, 0)
  setenv(__name9, {
    _stash = true,
    toplevel = true,
    variable = true
  })
  if some63(__body31) then
    local __i36 = compile(compile(__name9))
    return {"do", join({"%global-function", __i36}, bind42(__x260, __body31), props(__body31)), {"set", __name9, __i36}}
  else
    return join({"set", __name9, __x260}, props(__body31))
  end
end
setenv("define-global", {
  _stash = true,
  macro = __define_global__macro
})
local function __get_value__macro(x)
  local ____x269 = object({"setenv", x})
  ____x269.toplevel = true
  return {"has", ____x269, {"quote", "value"}}
end
setenv("get-value", {
  _stash = true,
  macro = __get_value__macro
})
local function __define_constant__macro(name, x)
  local ____x280 = object({"setenv", {"quote", name}})
  ____x280.toplevel = true
  ____x280.value = either(x, {"get-value", {"quote", name}})
  return {"%do", ____x280, {"define-symbol", name, {"get-value", {"quote", name}}}}
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
  local ____r160 = unstash({...})
  local __x310 = destash33(x, ____r160)
  local ____id63 = ____r160
  local __body33 = cut(____id63, 0)
  local __ok2 = unique("ok")
  local __r161 = unique("r")
  local ____x311 = object({"target", {"try", __x310, join({"finally"}, __body33)}})
  ____x311.lua = join({"let", {{__ok2, __r161}, {"guard", __x310}}}, __body33, {{"if", __ok2, __r161, {"throw", __r161}}})
  return ____x311
end
setenv("after", {
  _stash = true,
  macro = __after__macro
})
local function __with_frame__macro(...)
  local __body35 = unstash({...})
  return {"%do", {"add", "environment", {"obj"}}, {"after", join({"%do"}, __body35), {"drop", "environment"}}}
end
setenv("with-frame", {
  _stash = true,
  macro = __with_frame__macro
})
local function __with_values__macro(...)
  local __body37 = unstash({...})
  local __forms3 = {}
  local ____o22 = __body37
  local __k26 = nil
  for __k26 in next, ____o22 do
    local __v32 = ____o22[__k26]
    if not number63(__k26) then
      local ____x341 = object({"setenv", {"quote", __k26}})
      ____x341.value = __v32
      add(__forms3, ____x341)
    end
  end
  return join({"with-frame"}, __forms3)
end
setenv("with-values", {
  _stash = true,
  macro = __with_values__macro
})
local function __with_bindings__macro(__x349, ...)
  local ____r163 = unstash({...})
  local ____x349 = destash33(__x349, ____r163)
  local ____id66 = ____x349
  local __names5 = has(____id66, 1)
  local ____id67 = ____r163
  local __body39 = cut(____id67, 0)
  local __x351 = unique("x")
  local ____x354 = object({"setenv", __x351})
  ____x354.variable = true
  return join({"with-frame", {"each", __x351, __names5, ____x354}}, __body39)
end
setenv("with-bindings", {
  _stash = true,
  macro = __with_bindings__macro
})
local function __let_macro__macro(definitions, ...)
  local ____r168 = unstash({...})
  local __definitions1 = destash33(definitions, ____r168)
  local ____id69 = ____r168
  local __body41 = cut(____id69, 0)
  add(environment, {})
  local ____id70 = {xpcall(function ()
    map(function (m)
      return macroexpand(join({"define-macro"}, m))
    end, __definitions1)
    return join({"%do"}, macroexpand(__body41))
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
  local ____ok4 = has(____id70, 1)
  local ____r169 = has(____id70, 2)
  drop(environment)
  if ____ok4 then
    return ____r169
  else
    error(____r169)
  end
end
setenv("let-macro", {
  _stash = true,
  macro = __let_macro__macro
})
local function __let_symbol__macro(expansions, ...)
  local ____r175 = unstash({...})
  local __expansions1 = destash33(expansions, ____r175)
  local ____id73 = ____r175
  local __body43 = cut(____id73, 0)
  add(environment, {})
  local ____id74 = {xpcall(function ()
    map(function (__x372)
      local ____id75 = __x372
      local __name11 = has(____id75, 1)
      local __exp1 = has(____id75, 2)
      return macroexpand({"define-symbol", __name11, __exp1})
    end, pair(__expansions1))
    return join({"%do"}, macroexpand(__body43))
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
  local ____ok6 = has(____id74, 1)
  local ____r176 = has(____id74, 2)
  drop(environment)
  if ____ok6 then
    return ____r176
  else
    error(____r176)
  end
end
setenv("let-symbol", {
  _stash = true,
  macro = __let_symbol__macro
})
local function __let_unique__macro(names, ...)
  local ____r180 = unstash({...})
  local __names7 = destash33(names, ____r180)
  local ____id77 = ____r180
  local __body45 = cut(____id77, 0)
  local __bs3 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names7)
  return join({"let", apply(join, __bs3)}, __body45)
end
setenv("let-unique", {
  _stash = true,
  macro = __let_unique__macro
})
local function __fn__macro(args, ...)
  local ____r183 = unstash({...})
  local __args15 = destash33(args, ____r183)
  local ____id79 = ____r183
  local __body47 = cut(____id79, 0)
  return join({"%function"}, bind42(__args15, __body47), props(__body47))
end
setenv("fn", {
  _stash = true,
  macro = __fn__macro
})
local function __apply__macro(f, ...)
  local ____r185 = unstash({...})
  local __f5 = destash33(f, ____r185)
  local ____id81 = ____r185
  local __args17 = cut(____id81, 0)
  if _35(__args17) > 1 then
    return {"%call", "apply", __f5, {"join", join({"list"}, almost(__args17)), last(__args17), join({"list"}, props(__args17))}}
  else
    if props63(__args17) then
      return {"%call", "apply", __f5, join({"join"}, __args17, {join({"list"}, props(__args17))})}
    else
      return join({"%call", "apply", __f5}, __args17)
    end
  end
end
setenv("apply", {
  _stash = true,
  macro = __apply__macro
})
local function __guard__macro(expr)
  local ____x439 = object({"target", {{"%function", join(), {"%try", {"list", true, expr}}}}})
  local ____x451 = object({"obj"})
  ____x451.stack = {{"idx", "debug", "traceback"}}
  ____x451.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
  ____x439.lua = {"list", {"xpcall", {"%function", join(), expr}, {"%function", {"m"}, {"if", {"obj?", "m"}, "m", ____x451}}}}
  return {"let-macro", {{"%return", "args", {"error", "\"Can't return from guard\""}}}, ____x439}
end
setenv("guard", {
  _stash = true,
  macro = __guard__macro
})
local function __each__macro(x, t, ...)
  local ____r189 = unstash({...})
  local __x480 = destash33(x, ____r189)
  local __t4 = destash33(t, ____r189)
  local ____id84 = ____r189
  local __body49 = cut(____id84, 0)
  local __o24 = unique("o")
  local __n31 = unique("n")
  local __i40 = unique("i")
  local __e33 = nil
  if atom63(__x480) then
    __e33 = {__i40, __x480}
  else
    local __e34 = nil
    if _35(__x480) > 1 then
      __e34 = __x480
    else
      __e34 = {__i40, hd(__x480)}
    end
    __e33 = __e34
  end
  local ____id85 = __e33
  local __k28 = has(____id85, 1)
  local __v34 = has(____id85, 2)
  local ____x486 = object({"target", __o24})
  ____x486.py = {"indices", __o24}
  local __e35 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e35 = __body49
  else
    __e35 = {join({"let", __k28, {"if", {"numeric?", __k28}, {"parseInt", __k28}, __k28}}, __body49)}
  end
  return {"let", {__o24, __t4, __k28, "nil"}, join({"%for", ____x486, __k28}, props(__body49), {join({"let", {__v34, {"%get", __o24, __k28}}}, __e35)})}
end
setenv("each", {
  _stash = true,
  macro = __each__macro
})
local function __for__macro(i, to, ...)
  local ____r191 = unstash({...})
  local __i42 = destash33(i, ____r191)
  local __to1 = destash33(to, ____r191)
  local ____id87 = ____r191
  local __body51 = cut(____id87, 0)
  if __to1 == "in" then
    return join({"%for", hd(__body51), __i42, join({"%do"}, tl(__body51))}, props(__body51))
  else
    return {"let", __i42, 0, join({"while", {"<", __i42, __to1}}, __body51, {{"inc", __i42}})}
  end
end
setenv("for", {
  _stash = true,
  macro = __for__macro
})
local function __step__macro(v, t, ...)
  local ____r193 = unstash({...})
  local __v36 = destash33(v, ____r193)
  local __t6 = destash33(t, ____r193)
  local ____id89 = ____r193
  local __body53 = cut(____id89, 0)
  local __x523 = unique("x")
  local __i44 = unique("i")
  return {"let", {__x523, __t6}, {"for", __i44, {"#", __x523}, join({"let", {__v36, {"at", __x523, __i44}}}, __body53)}}
end
setenv("step", {
  _stash = true,
  macro = __step__macro
})
local function __set_of__macro(...)
  local __xs13 = unstash({...})
  local __l14 = {}
  local ____o26 = __xs13
  local ____i46 = nil
  for ____i46 in next, ____o26 do
    local __x535 = ____o26[____i46]
    __l14[__x535] = true
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
  local ____r199 = unstash({...})
  local __a6 = destash33(a, ____r199)
  local ____id91 = ____r199
  local __bs5 = cut(____id91, 0)
  return {"set", __a6, join({"join", __a6}, __bs5)}
end
setenv("join!", {
  _stash = true,
  macro = __join33__macro
})
local function __cat33__macro(a, ...)
  local ____r201 = unstash({...})
  local __a8 = destash33(a, ____r201)
  local ____id93 = ____r201
  local __bs7 = cut(____id93, 0)
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
  local __x568 = unique("x")
  return {"%do", {"inc", "indent-level"}, {"with", __x568, form, {"dec", "indent-level"}}}
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
  local __body55 = unstash({...})
  return eval(join({"%do"}, __body55))
end
setenv("when-compiling", {
  _stash = true,
  macro = __when_compiling__macro
})
local function __during_compilation__macro(...)
  local __body57 = unstash({...})
  local __form7 = join({"%do"}, __body57)
  eval(__form7)
  return __form7
end
setenv("during-compilation", {
  _stash = true,
  macro = __during_compilation__macro
})
setenv("has", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r212 = unstash({...})
    local __setfn1 = destash33(setfn, ____r212)
    local ____id95 = ____r212
    local __args19 = cut(____id95, 0)
    return define_setter("has", function (v, l, k)
      return {"%set", {"%get", l, k}, v}
    end, __setfn1, __args19)
  end
})
setenv("char", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r216 = unstash({...})
    local __setfn3 = destash33(setfn, ____r216)
    local ____id97 = ____r216
    local __args21 = cut(____id97, 0)
    return define_setter("char", function (c, str, pos)
      return {"set", str, {"cat", {"clip", str, 0, pos}, c, {"clip", str, {"+", pos, 1}}}}
    end, __setfn3, __args21)
  end
})
setenv("clip", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r220 = unstash({...})
    local __setfn5 = destash33(setfn, ____r220)
    local ____id99 = ____r220
    local __args23 = cut(____id99, 0)
    return define_setter("clip", function (c, str, from, upto)
      return {"set", str, {"cat", {"clip", str, 0, from}, c, {"clip", str, upto}}}
    end, __setfn5, __args23)
  end
})
setenv("inner", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r224 = unstash({...})
    local __setfn7 = destash33(setfn, ____r224)
    local ____id101 = ____r224
    local __args25 = cut(____id101, 0)
    return define_setter("inner", function (c, str)
      return {"set", str, {"cat", {"char", str, 0}, c, {"char", str, {"edge", str}}}}
    end, __setfn7, __args25)
  end
})
setenv("cut", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r228 = unstash({...})
    local __setfn9 = destash33(setfn, ____r228)
    local ____id103 = ____r228
    local __args27 = cut(____id103, 0)
    return define_setter("cut", function (v, l, from, upto)
      return {"set", l, {"join", {"cut", l, 0, from}, v, {"cut", l, either(upto, {"#", l})}, {"keys", v}}}
    end, __setfn9, __args27)
  end
})
setenv("tl", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r232 = unstash({...})
    local __setfn11 = destash33(setfn, ____r232)
    local ____id105 = ____r232
    local __args29 = cut(____id105, 0)
    return define_setter("tl", function (v, l, from)
      return {"set", {"cut", l, either(from, 1)}, v}
    end, __setfn11, __args29)
  end
})
setenv("hd", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r236 = unstash({...})
    local __setfn13 = destash33(setfn, ____r236)
    local ____id107 = ____r236
    local __args31 = cut(____id107, 0)
    return define_setter("hd", function (v, l, n)
      return {"set", {"at", l, either(n, 0)}, v}
    end, __setfn13, __args31)
  end
})
setenv("last", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r240 = unstash({...})
    local __setfn15 = destash33(setfn, ____r240)
    local ____id109 = ____r240
    local __args33 = cut(____id109, 0)
    return define_setter("last", function (v, l)
      return {"set", {"at", l, {"edge", l}}, v}
    end, __setfn15, __args33)
  end
})
local function __def__macro(name, ...)
  local ____r243 = unstash({...})
  local __name13 = destash33(name, ____r243)
  local ____id1111 = ____r243
  local __body59 = cut(____id1111, 0)
  return join({"define-global", __name13}, __body59)
end
setenv("def", {
  _stash = true,
  macro = __def__macro
})
local function __mac__macro(name, ...)
  local ____r245 = unstash({...})
  local __name15 = destash33(name, ____r245)
  local ____id113 = ____r245
  local __body61 = cut(____id113, 0)
  return join({"define-macro", __name15}, __body61)
end
setenv("mac", {
  _stash = true,
  macro = __mac__macro
})
local function __defconst__macro(name, ...)
  local ____r247 = unstash({...})
  local __name17 = destash33(name, ____r247)
  local ____id115 = ____r247
  local __value1 = cut(____id115, 0)
  return join({"def", __name17}, __value1)
end
setenv("defconst", {
  _stash = true,
  macro = __defconst__macro
})
local function __undefined63__macro(name)
  local ____x706 = object({"target"})
  ____x706.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x706.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x706.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x706
end
setenv("undefined?", {
  _stash = true,
  macro = __undefined63__macro
})
local function __defvar__macro(name, ...)
  local ____r251 = unstash({...})
  local __name19 = destash33(name, ____r251)
  local ____id117 = ____r251
  local __value3 = cut(____id117, 0)
  local ____x724 = object({"target"})
  ____x724.py = {"global", __name19}
  return {"when", {"undefined?", __name19}, ____x724, join({"defconst", __name19}, __value3)}
end
setenv("defvar", {
  _stash = true,
  macro = __defvar__macro
})
local function __async__macro(keyword, ...)
  local ____r253 = unstash({...})
  local __keyword1 = destash33(keyword, ____r253)
  local ____id119 = ____r253
  local __body63 = cut(____id119, 0)
  local ____x730 = object({__keyword1})
  ____x730.async = true
  return join(____x730, __body63)
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
  local ____r259 = unstash({...})
  local __a10 = destash33(a, ____r259)
  local ____id1211 = ____r259
  local __bs9 = cut(____id1211, 0)
  if nil63(__a10) then
    return ""
  else
    if none63(__bs9) then
      return __a10
    else
      if one63(__bs9) then
        local ____x756 = object({"target", join({"%cat", __a10}, __bs9)})
        ____x756.py = join({"%call", "cat", __a10}, __bs9)
        return ____x756
      else
        local ____x759 = object({"target", {"%cat", __a10, join({"cat"}, __bs9)}})
        ____x759.py = join({"%call", "cat", __a10}, __bs9)
        return ____x759
      end
    end
  end
end
setenv("cat", {
  _stash = true,
  macro = __cat__macro
})
local function ___43__macro(...)
  local __args35 = unstash({...})
  if none63(__args35) then
    return 0
  else
    if one63(__args35) then
      return hd(__args35)
    else
      return join({"%add"}, __args35)
    end
  end
end
setenv("+", {
  _stash = true,
  macro = ___43__macro
})
local function _____macro(...)
  local __args37 = unstash({...})
  if none63(__args37) then
    return 0
  else
    if one63(__args37) then
      return {"%unm", hd(__args37)}
    else
      return join({"%sub"}, __args37)
    end
  end
end
setenv("-", {
  _stash = true,
  macro = _____macro
})
local function ___42__macro(...)
  local __args39 = unstash({...})
  if none63(__args39) then
    return 1
  else
    if one63(__args39) then
      return hd(__args39)
    else
      return join({"%mul"}, __args39)
    end
  end
end
setenv("*", {
  _stash = true,
  macro = ___42__macro
})
local function ___47__macro(...)
  local __args41 = unstash({...})
  if none63(__args41) then
    return 1
  else
    if one63(__args41) then
      return hd(__args41)
    else
      return join({"%div"}, __args41)
    end
  end
end
setenv("/", {
  _stash = true,
  macro = ___47__macro
})
local function ___4747__macro(...)
  local __args43 = unstash({...})
  if none63(__args43) then
    return 1
  else
    if one63(__args43) then
      return hd(__args43)
    else
      return join({"%idiv"}, __args43)
    end
  end
end
setenv("//", {
  _stash = true,
  macro = ___4747__macro
})
local function ___37__macro(...)
  local __args45 = unstash({...})
  if none63(__args45) then
    return 0
  else
    if one63(__args45) then
      return hd(__args45)
    else
      return join({"%mod"}, __args45)
    end
  end
end
setenv("%", {
  _stash = true,
  macro = ___37__macro
})
local function ___60__macro(a, ...)
  local ____r261 = unstash({...})
  local __a12 = destash33(a, ____r261)
  local ____id123 = ____r261
  local __bs111 = cut(____id123, 0)
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
  local ____r263 = unstash({...})
  local __a14 = destash33(a, ____r263)
  local ____id125 = ____r263
  local __bs13 = cut(____id125, 0)
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
  local ____r265 = unstash({...})
  local __a16 = destash33(a, ____r265)
  local ____id127 = ____r265
  local __bs15 = cut(____id127, 0)
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
  local ____r267 = unstash({...})
  local __a18 = destash33(a, ____r267)
  local ____id129 = ____r267
  local __bs17 = cut(____id129, 0)
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
  local ____r269 = unstash({...})
  local __a20 = destash33(a, ____r269)
  local ____id131 = ____r269
  local __bs19 = cut(____id131, 0)
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
  local __args47 = unstash({...})
  if none63(__args47) then
    return false
  else
    if one63(__args47) then
      return join({"%not"}, __args47)
    else
      return {"%and", {"%not", hd(__args47)}, join({"not"}, tl(__args47))}
    end
  end
end
setenv("not", {
  _stash = true,
  macro = __not__macro
})
local function __and__macro(a, ...)
  local ____r271 = unstash({...})
  local __a22 = destash33(a, ____r271)
  local ____id133 = ____r271
  local __bs211 = cut(____id133, 0)
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
  local ____r273 = unstash({...})
  local __a24 = destash33(a, ____r273)
  local ____id135 = ____r273
  local __bs23 = cut(____id135, 0)
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
local function __bnot__macro(...)
  local __args49 = unstash({...})
  return join({"band"}, map(function (x)
    return {"%bnot", x}
  end, __args49))
end
setenv("bnot", {
  _stash = true,
  macro = __bnot__macro
})
local function __band__macro(a, ...)
  local ____r277 = unstash({...})
  local __a26 = destash33(a, ____r277)
  local ____id137 = ____r277
  local __bs25 = cut(____id137, 0)
  if none63(__bs25) then
    return __a26
  else
    return {"%band", __a26, join({"band"}, __bs25)}
  end
end
setenv("band", {
  _stash = true,
  macro = __band__macro
})
local function __bor__macro(a, ...)
  local ____r279 = unstash({...})
  local __a28 = destash33(a, ____r279)
  local ____id139 = ____r279
  local __bs27 = cut(____id139, 0)
  if none63(__bs27) then
    return __a28
  else
    return {"%bor", __a28, join({"bor"}, __bs27)}
  end
end
setenv("bor", {
  _stash = true,
  macro = __bor__macro
})
local function __break__macro(...)
  local __args51 = unstash({...})
  return join({"%break"}, __args51)
end
setenv("break", {
  _stash = true,
  macro = __break__macro
})
local function __return__macro(...)
  local __args53 = unstash({...})
  return join({"%return"}, __args53)
end
setenv("return", {
  _stash = true,
  macro = __return__macro
})
local function __while__macro(c, ...)
  local ____r281 = unstash({...})
  local __c3 = destash33(c, ____r281)
  local ____id141 = ____r281
  local __body65 = cut(____id141, 0)
  return join({"%while", __c3}, __body65)
end
setenv("while", {
  _stash = true,
  macro = __while__macro
})
local function __do__macro(...)
  local __body67 = unstash({...})
  return join({"%do"}, __body67)
end
setenv("do", {
  _stash = true,
  macro = __do__macro
})
local function __get__macro(...)
  local __args55 = unstash({...})
  return join({"%get"}, __args55)
end
setenv("get", {
  _stash = true,
  macro = __get__macro
})
local function __idx__macro(...)
  local __args57 = unstash({...})
  return join({"%idx"}, __args57)
end
setenv("idx", {
  _stash = true,
  macro = __idx__macro
})
local function __new__macro(...)
  local __args59 = unstash({...})
  return join({"%new"}, __args59)
end
setenv("new", {
  _stash = true,
  macro = __new__macro
})
local function __typeof__macro(...)
  local __args61 = unstash({...})
  return join({"%typeof"}, __args61)
end
setenv("typeof", {
  _stash = true,
  macro = __typeof__macro
})
local function __error__macro(...)
  local __args63 = unstash({...})
  return join({"%error"}, __args63)
end
setenv("error", {
  _stash = true,
  macro = __error__macro
})
local function __throw__macro(...)
  local __args65 = unstash({...})
  return join({"%throw"}, __args65)
end
setenv("throw", {
  _stash = true,
  macro = __throw__macro
})
local function __raise__macro(...)
  local __args67 = unstash({...})
  return join({"%throw"}, __args67)
end
setenv("raise", {
  _stash = true,
  macro = __raise__macro
})
local function __is__macro(...)
  local __args69 = unstash({...})
  local ____x932 = object({"target", join({"="}, __args69)})
  ____x932.py = join({"%is"}, __args69)
  return ____x932
end
setenv("is", {
  _stash = true,
  macro = __is__macro
})
local function __in__macro(...)
  local __args71 = unstash({...})
  return join({"%in"}, __args71)
end
setenv("in", {
  _stash = true,
  macro = __in__macro
})
local function __as__macro(...)
  local __args73 = unstash({...})
  return join({"%as"}, __args73)
end
setenv("as", {
  _stash = true,
  macro = __as__macro
})
local function ___37expand_case__macro(x, ...)
  local ____r283 = unstash({...})
  local __x950 = destash33(x, ____r283)
  local ____id144 = ____r283
  local __body69 = cut(____id144, 0)
  local __e38 = nil
  if atom63(__x950) then
    __e38 = {__x950}
  else
    __e38 = __x950
  end
  local ____id145 = __e38
  local __a30 = has(____id145, 1)
  local __bs29 = cut(____id145, 1)
  local __e39 = nil
  if none63(__bs29) then
    __e39 = {{"%literal"}}
  else
    __e39 = __bs29
  end
  return join({"%block", __a30}, __e39, __body69)
end
setenv("%expand-case", {
  _stash = true,
  macro = ___37expand_case__macro
})
local function ___37cases__macro(...)
  local __args75 = unstash({...})
  if none63(__args75) then
    return {"do"}
  else
    if one63(__args75) then
      return join({"%expand-case"}, hd(__args75))
    else
      local __r286 = unique("r")
      return join({"with", __r286, "nil"}, map(function (__x970)
        local ____id147 = __x970
        local __x971 = has(____id147, 1)
        local __body71 = cut(____id147, 1)
        return {"%expand-case", __x971, {"%set", __r286, join({"%do"}, __body71)}}
      end, almost(__args75)), {join({"%expand-case"}, last(__args75))})
    end
  end
end
setenv("%cases", {
  _stash = true,
  macro = ___37cases__macro
})
local function __try__macro(x, ...)
  local ____r289 = unstash({...})
  local __x992 = destash33(x, ____r289)
  local ____id152 = ____r289
  local __cases1 = cut(____id152, 0)
  local __fin1 = {"finally"}
  local ____o28 = __cases1
  local ____i49 = nil
  for ____i49 in next, ____o28 do
    local __x994 = ____o28[____i49]
    if hd63(__x994, "finally") then
      __fin1 = __x994
    end
  end
  local __forms7 = {}
  local ____x997 = __cases1
  local ____i50 = 0
  while ____i50 < _35(____x997) do
    local ____id153 = ____x997[____i50 + 1]
    local __x998 = has(____id153, 1)
    local __body75 = cut(____id153, 1)
    if __x998 == "finally" then
    else
      if __x998 == "except" and has(__body75, 1) == "as" then
        local ____id154 = __body75
        local __kind2 = has(____id154, 1)
        local ___1 = has(____id154, 2)
        local __name21 = has(____id154, 3)
        local __body76 = cut(____id154, 3)
        add(__forms7, join({{__x998, {"%as", __kind2, __name21}}}, __body76))
      else
        if __x998 == "except" then
          local ____id155 = __body75
          local __kind3 = has(____id155, 1)
          local __body77 = cut(____id155, 1)
          add(__forms7, join({{__x998, __kind3}}, __body77))
        else
          error("Unknown try clause")
        end
      end
    end
    ____i50 = ____i50 + 1
  end
  return join({"%cases", {"try", __x992}}, __forms7, {__fin1})
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
  local __v38 = unique("v")
  return {"let", {{__ok8, __v38}, {"guard", x}}, {"if", __ok8, __v38, _else}}
end
setenv("errsafe", {
  _stash = true,
  macro = __errsafe__macro
})
local function __dbg__macro()
  local ____x1021 = object({"target", {"do"}})
  ____x1021.py = {"do", {"import", "pdb"}, {{"idx", "pdb", "set-trace"}}}
  return ____x1021
end
setenv("dbg", {
  _stash = true,
  macro = __dbg__macro
})
local function __see__macro(form)
  local __form9 = expand(form)
  print(compile(expand({"%set", "lumen-result", __form9})))
  return __form9
end
setenv("see", {
  _stash = true,
  macro = __see__macro
})
local function __class__macro(name, ...)
  local ____r297 = unstash({...})
  local __name23 = destash33(name, ____r297)
  local ____id157 = ____r297
  local __body79 = cut(____id157, 0)
  return join({"%block", "class", __name23}, __body79)
end
setenv("class", {
  _stash = true,
  macro = __class__macro
})
local runtime = require("runtime")
local macros = require("macros")
reader = require("./reader")
compiler = require("./compiler")
system = require("./system")
function _G.disp(str)
  system.write(str)
  return system.flush()
end
disp = disp
function _G.pp(x)
  if list63(x) and _35(x) > 1 then
    local __c4 = "  "
    local __nl = nil
    print("(")
    local ____x1033 = x
    local ____i51 = 0
    while ____i51 < _35(____x1033) do
      local __v39 = ____x1033[____i51 + 1]
      if __nl then
        print("")
      end
      disp(__c4)
      __nl = true
      __c4 = "  "
      print(str(__v39))
      ____i51 = ____i51 + 1
    end
    return print(")")
  else
    return print(str(x))
  end
end
pp = pp
function _G.dir(x)
  local __r301 = {}
  local ____o29 = x
  local __k29 = nil
  for __k29 in next, ____o29 do
    local __v40 = ____o29[__k29]
    add(__r301, __k29)
  end
  return __r301
end
dir = dir
function _G.lines(x)
  return split(x, "\n")
end
lines = lines
function _G.get_indentation(s)
  local __r304 = ""
  local __i53 = 0
  while __i53 < _35(s) do
    local __c5 = char(s, __i53)
    if __c5 == " " then
      __r304 = __r304 .. __c5
    end
    __i53 = __i53 + 1
  end
  return __r304
end
get_indentation = get_indentation
function _G.strip_outer(s, lh, rh)
  if string_starts63(s, lh) and string_ends63(s, rh) then
    return clip(clip(s, 0, _35(s) - _35(rh)), _35(lh))
  else
    return s
  end
end
strip_outer = strip_outer
function _G.toplevel_print(v)
  return pp(v)
end
toplevel_print = toplevel_print
function _G.print_exception(v, ex)
  print("error: " .. (v.message .. ("\n" .. v.stack)))
  return nil
end
print_exception = print_exception
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
eval_self_form = eval_self_form
function _G.eval_print(form)
  local __form10 = eval_self_form(form)
  local ____id158 = {xpcall(function ()
    return compiler.eval(__form10)
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
  local __ok9 = has(____id158, 1)
  local __v41 = has(____id158, 2)
  local __ex = has(____id158, 3)
  if not __ok9 then
    return print_exception(__v41, __ex)
  else
    if is63(__v41) then
      return toplevel_print(__v41)
    end
  end
end
eval_print = eval_print
function _G.read_toplevel(str, more)
  local __s3 = reader.stream(str, more)
  local ____id159 = {xpcall(function ()
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
  local ____ok10 = has(____id159, 1)
  local ____v42 = has(____id159, 2)
  local __e44 = nil
  if ____ok10 then
    __e44 = ____v42
  else
    __e44 = nil
  end
  local __x1042 = __e44
  if __x1042 == more then
    return more
  else
    if nil63(__x1042) then
      return __x1042
    else
      if one63(__x1042) then
        return hd(__x1042)
      else
        return __x1042
      end
    end
  end
end
read_toplevel = read_toplevel
local function rep(str)
  local __v43 = eval(read_toplevel(str))
  if is63(__v43) then
    return toplevel_print(__v43)
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
    local __form11 = read_toplevel(o.buf, __more)
    if not( __form11 == __more) then
      eval_print(__form11)
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
  local ____r318 = unstash({...})
  local __file1 = destash33(file, ____r318)
  local __name25 = destash33(name, ____r318)
  local ____id161 = ____r318
  local __body81 = cut(____id161, 0)
  local __cwd1 = unique("cwd")
  return {"let", {__cwd1, {"system", {".cwd"}}, __name25, __file1, __name25, {"system", {".basename", __file1}}}, {"system", {".chdir", {"system", {".dirname", __file1}}}}, {"after", join({"do"}, __body81), {"system", {".chdir", __cwd1}}}}
end
setenv("with-file-directory", {
  _stash = true,
  macro = __with_file_directory__macro
})
function _G.read_file(path)
  local ____cwd2 = system.cwd()
  local __name26 = path
  local __name27 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id162 = {xpcall(function ()
    return system.read_file(__name27)
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
  local ____ok11 = has(____id162, 1)
  local ____r320 = has(____id162, 2)
  system.chdir(____cwd2)
  if ____ok11 then
    return ____r320
  else
    error(____r320)
  end
end
read_file = read_file
function _G.read_from_file(path)
  local __data = read_file(path)
  local ____cwd3 = system.cwd()
  local __name28 = path
  local __name29 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id163 = {xpcall(function ()
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
  local ____ok12 = has(____id163, 1)
  local ____r322 = has(____id163, 2)
  system.chdir(____cwd3)
  if ____ok12 then
    return ____r322
  else
    error(____r322)
  end
end
read_from_file = read_from_file
function _G.expand_file(path)
  local __body82 = read_from_file(path)
  local ____cwd4 = system.cwd()
  local __name30 = path
  local __name31 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id164 = {xpcall(function ()
    return compiler.expand(join({"do"}, __body82))
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
  local ____ok13 = has(____id164, 1)
  local ____r324 = has(____id164, 2)
  system.chdir(____cwd4)
  if ____ok13 then
    return ____r324
  else
    error(____r324)
  end
end
expand_file = expand_file
function _G.compile_file(path)
  local __form12 = expand_file(path)
  local ____cwd5 = system.cwd()
  local __name32 = path
  local __name33 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id165 = {xpcall(function ()
    return compiler.compile(__form12, {
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
  local ____ok14 = has(____id165, 1)
  local ____r326 = has(____id165, 2)
  system.chdir(____cwd5)
  if ____ok14 then
    return ____r326
  else
    error(____r326)
  end
end
compile_file = compile_file
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
  local __name34 = path
  local __name35 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id166 = {xpcall(function ()
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
  local ____ok15 = has(____id166, 1)
  local ____r328 = has(____id166, 2)
  system.chdir(____cwd6)
  if ____ok15 then
    return ____r328
  else
    error(____r328)
  end
end
load = load
function _G.run_script(path, argv)
  if nil63(argv) then
    argv = {}
  end
  print(str({"run-script", path, argv}))
  system.set_argv(argv)
  _G.exports = {}
  load(path)
  if has(_G.exports, "main") then
    return _G.exports.main(argv)
  end
end
run_script = run_script
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
    return run_script(__arg, tl(args))
  else
    if __arg == "-h" or __arg == "--help" then
      return usage()
    else
      local __pre = {}
      local __input = nil
      local __output = nil
      local __target1 = nil
      local __expr10 = nil
      local __argv = args
      local __i54 = 0
      while __i54 < _35(__argv) do
        local __a31 = __argv[__i54 + 1]
        if __a31 == "-c" or (__a31 == "-o" or (__a31 == "-t" or __a31 == "-e")) then
          if __i54 == edge(__argv) then
            print("missing argument for " .. __a31)
          else
            __i54 = __i54 + 1
            local __val2 = __argv[__i54 + 1]
            if __a31 == "-c" then
              __input = __val2
            else
              if __a31 == "-o" then
                __output = __val2
              else
                if __a31 == "-t" then
                  __target1 = __val2
                else
                  if __a31 == "-e" then
                    __expr10 = __val2
                  end
                end
              end
            end
          end
        else
          if not( "-" == char(__a31, 0)) then
            add(__pre, __a31)
          end
        end
        __i54 = __i54 + 1
      end
      local ____x1093 = __pre
      local ____i55 = 0
      while ____i55 < _35(____x1093) do
        local __file2 = ____x1093[____i55 + 1]
        run_file(__file2)
        ____i55 = ____i55 + 1
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
  main(system.get_argv())
end
local __exports = exports or {}
__exports.main = main
__exports.reader = reader
__exports.compiler = compiler
__exports.system = system
return __exports
