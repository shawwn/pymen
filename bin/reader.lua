local delimiters = {["("] = true, [")"] = true, [";"] = true, ["\r"] = true, ["\n"] = true}
local whitespace = {[" "] = true, ["\t"] = true, ["\r"] = true, ["\n"] = true}
local function stream(_str, more)
  return {pos = 0, string = _str, len = _35(_str), more = more}
end
local function peek_char(s)
  local ____id = s
  local __pos = has(____id, "pos")
  local __len = has(____id, "len")
  local __string = has(____id, "string")
  if __pos < __len then
    return char(__string, __pos)
  end
end
local function read_char(s)
  local __c = peek_char(s)
  if __c then
    s.pos = s.pos + 1
    return __c
  end
end
local function skip_non_code(s)
  while true do
    local __c1 = peek_char(s)
    if nil63(__c1) then
      break
    else
      if has63(whitespace, __c1) then
        read_char(s)
      else
        if __c1 == ";" then
          while __c1 and not( __c1 == "\n") do
            __c1 = read_char(s)
          end
          skip_non_code(s)
        else
          break
        end
      end
    end
  end
end
local read_table = {}
local eof = {}
local function read(s)
  skip_non_code(s)
  local __c2 = peek_char(s)
  if is63(__c2) then
    return (has(read_table, __c2) or has(read_table, ""))(s)
  else
    return eof
  end
end
local function read_all(s)
  local __l = {}
  while true do
    local __form = read(s)
    if __form == eof then
      break
    end
    add(__l, __form)
  end
  return __l
end
function read_string(_str, more)
  local __x = read(stream(_str, more))
  if not( __x == eof) then
    return __x
  end
end
local function key63(atom)
  return string63(atom) and _35(atom) > 1 and char(atom, edge(atom)) == ":"
end
local function flag63(atom)
  return string63(atom) and _35(atom) > 1 and char(atom, 0) == ":"
end
local function expected(s, c)
  if has63(s, "more") then
    return s.more
  else
    local ____id1 = s
    local __more = has(____id1, "more")
    local __pos1 = has(____id1, "pos")
    error("Expected " .. c .. " at " .. __pos1)
  end
end
local function wrap(s, x)
  local __y = read(s)
  if __y == s.more then
    return __y
  else
    return {x, __y}
  end
end
local function hex_prefix63(_str)
  local __e
  if code(_str, 0) == 45 then
    __e = 1
  else
    __e = 0
  end
  local __i = __e
  local __id2 = code(_str, __i) == 48
  local __e1
  if __id2 then
    __i = __i + 1
    local __n = code(_str, __i)
    __e1 = __n == 120 or __n == 88
  else
    __e1 = __id2
  end
  return __e1
end
local function maybe_number(_str)
  if hex_prefix63(_str) then
    return tonumber(_str)
  else
    if number_code63(code(_str, edge(_str))) then
      return number(_str)
    end
  end
end
local function real63(x)
  return number63(x) and not nan63(x) and not inf63(x)
end
read_table[""] = function (s)
  local ___str = ""
  while true do
    local __c3 = peek_char(s)
    if __c3 and (not has63(whitespace, __c3) and not has63(delimiters, __c3)) then
      ___str = ___str .. read_char(s)
    else
      break
    end
  end
  if ___str == "true" then
    return true
  else
    if ___str == "false" then
      return false
    else
      local __n1 = maybe_number(___str)
      if real63(__n1) then
        return __n1
      else
        return ___str
      end
    end
  end
end
read_table["("] = function (s)
  read_char(s)
  local __r16 = nil
  local __l1 = {}
  while nil63(__r16) do
    skip_non_code(s)
    local __c4 = peek_char(s)
    if __c4 == ")" then
      read_char(s)
      __r16 = __l1
    else
      if nil63(__c4) then
        __r16 = expected(s, ")")
      else
        local __x2 = read(s)
        if key63(__x2) then
          local __k = clip(__x2, 0, edge(__x2))
          local __v = read(s)
          __l1 = object(__l1)
          __l1[__k] = __v
        else
          if flag63(__x2) then
            __l1 = object(__l1)
            __l1[clip(__x2, 1)] = true
          else
            add(__l1, __x2)
          end
        end
      end
    end
  end
  return __r16
end
read_table[")"] = function (s)
  error("Unexpected ) at " .. s.pos)
end
read_table["\""] = function (s)
  read_char(s)
  local __r19 = nil
  local ___str1 = "\""
  while nil63(__r19) do
    local __c5 = peek_char(s)
    if __c5 == "\"" then
      __r19 = ___str1 .. read_char(s)
    else
      if nil63(__c5) then
        __r19 = expected(s, "\"")
      else
        if __c5 == "\\" then
          ___str1 = ___str1 .. read_char(s)
        end
        ___str1 = ___str1 .. read_char(s)
      end
    end
  end
  return __r19
end
read_table["|"] = function (s)
  read_char(s)
  local __r21 = nil
  local ___str2 = "|"
  while nil63(__r21) do
    local __c6 = peek_char(s)
    if __c6 == "|" then
      __r21 = ___str2 .. read_char(s)
    else
      if nil63(__c6) then
        __r21 = expected(s, "|")
      else
        ___str2 = ___str2 .. read_char(s)
      end
    end
  end
  return __r21
end
read_table["'"] = function (s)
  read_char(s)
  return wrap(s, "quote")
end
read_table["`"] = function (s)
  read_char(s)
  return wrap(s, "quasiquote")
end
read_table[","] = function (s)
  read_char(s)
  if peek_char(s) == "@" then
    read_char(s)
    return wrap(s, "unquote-splicing")
  else
    return wrap(s, "unquote")
  end
end
local __exports = exports or {}
__exports.stream = stream
__exports.read = read
__exports["read-all"] = read_all
__exports.read_all = read_all
__exports["read-string"] = read_string
__exports.read_string = read_string
__exports["read-table"] = read_table
__exports.read_table = read_table
return __exports
