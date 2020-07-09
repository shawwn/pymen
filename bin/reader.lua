local delimiters = {
  ["("] = true,
  [")"] = true,
  [";"] = true,
  [","] = true,
  ["\r"] = true,
  ["\n"] = true
}
local closing_delimiters = {[")"] = true}
local whitespace = {
  [" "] = true,
  ["\t"] = true,
  ["\r"] = true,
  ["\n"] = true
}
local function stream(str, more)
  return {
    pos = 0,
    string = str,
    len = _35(str),
    more = more
  }
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
local function eof63(s, x)
  return x == eof or is63(s.more) and x == s.more
end
local function read_1(s)
  skip_non_code(s)
  local __c2 = peek_char(s)
  if is63(__c2) then
    return (has(read_table, __c2) or has(read_table, ""))(s)
  else
    return eof
  end
end
local function read(s)
  local __form = read_1(s)
  if "," == peek_char(s) then
    local __r7 = {",", __form}
    while true do
      read_char(s)
      __form = read_1(s)
      if eof63(s, __form) then
        return expected(s, "tuple")
      end
      add(__r7, __form)
      if not( "," == peek_char(s)) then
        break
      end
    end
    return __r7
  else
    return __form
  end
end
local function read_all(s)
  local __l = {}
  while true do
    local __form1 = read(s)
    if eof63(s, __form1) then
      break
    end
    add(__l, __form1)
  end
  return __l
end
function read_string(str, more)
  local __s = stream(str, more)
  local __x1 = read(__s)
  if not( __x1 == eof) then
    return __x1
  end
end
local function key63(atom)
  return string63(atom) and (_35(atom) > 1 and char(atom, edge(atom)) == ":")
end
local function flag63(atom)
  return string63(atom) and (_35(atom) > 1 and char(atom, 0) == ":")
end
local function expected(s, c)
  if is63(s.more) then
    return s.more
  else
    error("Expected " .. (c .. (" at " .. s.pos)))
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
local function hex_prefix63(str)
  local __e = nil
  if code(str, 0) == 45 then
    __e = 1
  else
    __e = 0
  end
  local __i = __e
  local __id1 = code(str, __i) == 48
  local __e1 = nil
  if __id1 then
    __i = __i + 1
    local __n = code(str, __i)
    __e1 = __n == 120 or __n == 88
  else
    __e1 = __id1
  end
  return __e1
end
local function maybe_number(str)
  if hex_prefix63(str) then
    return tonumber(str)
  else
    if number_code63(code(str, edge(str))) then
      return number(str)
    end
  end
end
local function real63(x)
  return number63(x) and (not nan63(x) and not inf63(x))
end
read_table[""] = function (s)
  local __str = ""
  while true do
    local __c3 = peek_char(s)
    if __c3 and (not has63(whitespace, __c3) and not has63(delimiters, __c3)) then
      __str = __str .. read_char(s)
    else
      break
    end
  end
  if __str == "true" then
    return true
  else
    if __str == "false" then
      return false
    else
      local __n1 = maybe_number(__str)
      if real63(__n1) then
        return __n1
      else
        return __str
      end
    end
  end
end
read_table["("] = function (s)
  read_char(s)
  local __r19 = nil
  local __l1 = {}
  while nil63(__r19) do
    skip_non_code(s)
    local __c4 = peek_char(s)
    if __c4 == ")" then
      read_char(s)
      __r19 = __l1
    else
      if nil63(__c4) then
        __r19 = expected(s, ")")
      else
        local __x3 = read(s)
        if key63(__x3) then
          local __k = clip(__x3, 0, edge(__x3))
          local __v = read(s)
          __l1 = object(__l1)
          __l1[__k] = __v
        else
          if flag63(__x3) then
            __l1 = object(__l1)
            __l1[clip(__x3, 1)] = true
          else
            add(__l1, __x3)
          end
        end
      end
    end
  end
  return __r19
end
read_table[")"] = function (s)
  error("Unexpected ) at " .. s.pos)
end
local function read_matching(opener, closer, s)
  local __r22 = nil
  local __pos1 = s.pos
  local __str1 = ""
  local __i1 = 0
  while __i1 < _35(opener) do
    __str1 = __str1 .. (read_char(s) or "")
    __i1 = __i1 + 1
  end
  if __str1 == opener then
    while nil63(__r22) do
      if clip(s.string, s.pos, s.pos + _35(closer)) == closer then
        local __i2 = 0
        while __i2 < _35(closer) do
          __str1 = __str1 .. read_char(s)
          __i2 = __i2 + 1
        end
        __r22 = __str1
      else
        if nil63(peek_char(s)) then
          __r22 = expected(s, closer)
        else
          __str1 = __str1 .. read_char(s)
          if peek_char(s) == "\\" then
            __str1 = __str1 .. read_char(s)
          end
        end
      end
    end
  end
  return __r22
end
read_table["\""] = function (s)
  if string_starts63(s.string, "\"\"\"", s.pos) then
    return read_matching("\"\"\"", "\"\"\"", s)
  else
    local __i3 = s.pos
    local __j = search(s.string, "\"", __i3 + 1)
    local __b = either(search(s.string, "\\", __i3 + 1), __j)
    if is63(__j) and (__j < s.len and __b >= __j) then
      s.pos = __j + 1
      return clip(s.string, __i3, __j + 1)
    else
      local __r24 = nil
      read_char(s)
      while nil63(__r24) do
        local __c5 = peek_char(s)
        if __c5 == "\"" then
          read_char(s)
          __r24 = clip(s.string, __i3, s.pos)
        else
          if nil63(__c5) then
            __r24 = expected(s, "\"")
          else
            if __c5 == "\\" then
              read_char(s)
            end
            read_char(s)
          end
        end
      end
      return __r24
    end
  end
end
read_table["|"] = function (s)
  local __i4 = s.pos
  local __j1 = search(s.string, "|", __i4 + 1)
  if is63(__j1) and __j1 < s.len then
    s.pos = __j1 + 1
    return clip(s.string, __i4, __j1 + 1)
  else
    return expected(s, "|")
  end
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
  local __c6 = peek_char(s)
  if nil63(__c6) or (has63(whitespace, __c6) or has63(closing_delimiters, __c6)) then
    return ","
  else
    if __c6 == "@" then
      read_char(s)
      return wrap(s, "unquote-splicing")
    else
      return wrap(s, "unquote")
    end
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
