local delimiters = {["("]: true, [")"]: true, [";"]: true, ["\r"]: true, ["\n"]: true}
local whitespace = {[" "]: true, ["\t"]: true, ["\r"]: true, ["\n"]: true}
local stream = function (str, more)
  return {pos: 0, string: str, len: _35(str), more: more}
end
local peek_char = function (s)
  local ____id = s
  local __pos = ____id.pos
  local __len = ____id.len
  local __string = ____id.string
  if __pos < __len then
    return char(__string, __pos)

end
local read_char = function (s)
  local __c = peek_char(s)
  if __c then
    s.pos = s.pos + 1
    return __c

end
local skip_non_code = function (s)
  while true do
    local __c1 = peek_char(s)
    if nil63(__c1) then
      break
    else
      if whitespace[__c1] then
        read_char(s)
      else
        if _61(__c1, ";") then
          while _and(__c1, _not(_61(__c1, "\n"))) do
            __c1 = read_char(s)
          end
          skip_non_code(s)
        else
          break



  end
end
local read_table = {}
local eof = {}
local read = function (s)
  skip_non_code(s)
  local __c2 = peek_char(s)
  if is63(__c2) then
    return (_or(read_table[__c2], read_table[""]))(s)
  else
    return eof

end
local read_all = function (s)
  local __l = []
  while true do
    local __form = read(s)
    if _61(__form, eof) then
      break

    add(__l, __form)
  end
  return __l
end
read_string = function (str, more)
  local __x = read(stream(str, more))
  if _not(_61(__x, eof)) then
    return __x

end
local key63 = function (atom)
  return _and(string63(atom), _35(atom) > 1)
end
local flag63 = function (atom)
  return _and(string63(atom), _35(atom) > 1)
end
local expected = function (s, c)
  local ____id1 = s
  local __more = ____id1.more
  local __pos1 = ____id1.pos
  local __id2 = __more
  local __e
  if __id2 then
    __e = __id2
  else
    error(cat("Expected ", c, " at ", __pos1))
    __e = undefined

  return __e
end
local wrap = function (s, x)
  local __y = read(s)
  if _61(__y, s.more) then
    return __y
  else
    return [x, __y]

end
local hex_prefix63 = function (str)
  local __e1
  if _61(code(str, 0), 45) then
    __e1 = 1
  else
    __e1 = 0

  local __i = __e1
  local __id3 = _61(code(str, __i), 48)
  local __e2
  if __id3 then
    __i = __i + 1
    local __n = code(str, __i)
    __e2 = _or(_61(__n, 120), _61(__n, 88))
  else
    __e2 = __id3

  return __e2
end
local maybe_number = function (str)
  if hex_prefix63(str) then
    if number_code63(code(str, edge(str))) then
      return number(str)


end
local real63 = function (x)
  return _and(number63(x), _not(nan63(x)))
end
local __f = function (s)
  local __str = ""
  while true do
    local __c3 = peek_char(s)
    if _and(__c3, _and(_not(whitespace[__c3]), _not(delimiters[__c3]))) then
      __str = cat(__str, read_char(s))
    else
      break

  end
  if _61(__str, "true") then
    return true
  else
    if _61(__str, "false") then
      return false
    else
      local __n1 = maybe_number(__str)
      if real63(__n1) then
        return __n1
      else
        return __str



end
read_table[""] = __f
local __f1 = function (s)
  read_char(s)
  local __r16 = undefined
  local __l1 = []
  while nil63(__r16) do
    skip_non_code(s)
    local __c4 = peek_char(s)
    if _61(__c4, ")") then
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
  return __r16
end
read_table["("] = __f1
local __f2 = function (s)
  error(cat("Unexpected ) at ", s.pos))
end
read_table[")"] = __f2
local __f3 = function (s)
  read_char(s)
  local __r19 = undefined
  local __str1 = "\""
  while nil63(__r19) do
    local __c5 = peek_char(s)
    if _61(__c5, "\"") then
      __r19 = cat(__str1, read_char(s))
    else
      if nil63(__c5) then
        __r19 = expected(s, "\"")
      else
        if _61(__c5, "\\") then
          __str1 = cat(__str1, read_char(s))

        __str1 = cat(__str1, read_char(s))


  end
  return __r19
end
read_table["\""] = __f3
local __f4 = function (s)
  read_char(s)
  local __r21 = undefined
  local __str2 = "|"
  while nil63(__r21) do
    local __c6 = peek_char(s)
    if _61(__c6, "|") then
      __r21 = cat(__str2, read_char(s))
    else
      if nil63(__c6) then
        __r21 = expected(s, "|")
      else
        __str2 = cat(__str2, read_char(s))


  end
  return __r21
end
read_table["|"] = __f4
local __f5 = function (s)
  read_char(s)
  return wrap(s, "quote")
end
read_table["'"] = __f5
local __f6 = function (s)
  read_char(s)
  return wrap(s, "quasiquote")
end
read_table["`"] = __f6
local __f7 = function (s)
  read_char(s)
  if _61(peek_char(s), "@") then
    read_char(s)
    return wrap(s, "unquote-splicing")
  else
    return wrap(s, "unquote")

end
read_table[","] = __f7
return {stream: stream, read: read, ["read-all"]: read_all, ["read-string"]: read_string, ["read-table"]: read_table}
