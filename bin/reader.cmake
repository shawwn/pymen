delimiters = {
  ["("]: ON,
  [")"]: ON,
  [";"]: ON,
  [","]: ON,
  ["\r"]: ON,
  ["\n"]: ON
}
closing_delimiters = {[")"]: ON}
whitespace = {
  [" "]: ON,
  ["\t"]: ON,
  ["\r"]: ON,
  ["\n"]: ON
}
stream = function (str, more)
  return {
    pos: 0,
    string: str,
    len: _35(str),
    more: more
  }
end
peek_char = function (s)
  ____id = s
  __pos = has(____id, "pos")
  __len = has(____id, "len")
  __string = has(____id, "string")
  if __pos < __len then
    return char(__string, __pos)
end
read_char = function (s)
  __c = peek_char(s)
  if __c then
    s.pos = s.pos + 1
    return __c
end
skip_non_code = function (s)
  while ON do
    __c1 = peek_char(s)
    if nil63(__c1) then
      break
    else
      if has63(whitespace, __c1) then
        read_char(s)
      else
        if _37eq(__c1, ";") then
          while _37and(__c1, _37not(_37eq(__c1, "\n"))) do
            __c1 = read_char(s)
          end
          skip_non_code(s)
        else
          break
  end
end
read_table = {}
eof = {}
more63 = function (s, x)
  return _37and(is63(s.more), _37eq(x, s.more))
end
eof63 = function (s, x)
  return _37or(_37eq(x, eof), more63(s, x))
end
read_1 = function (s)
  skip_non_code(s)
  __c2 = peek_char(s)
  if is63(__c2) then
    return (_37or(has(read_table, __c2), has(read_table, "")))(s)
  else
    return eof
end
read = function (s)
  __form = read_1(s)
  if _37eq(",", peek_char(s)) then
    __r8 = [",", __form]
    while ON do
      read_char(s)
      __form = read_1(s)
      if eof63(s, __form) then
        return expected(s, "tuple")
      add(__r8, __form)
      if _37not(_37eq(",", peek_char(s))) then
        break
    end
    return __r8
  else
    return __form
end
read_all = function (s)
  __r10 = ""
  __l = []
  while nil63(__r10) do
    __form1 = read(s)
    if more63(s, __form1) then
      __r10 = s.more
    else
      if eof63(s, __form1) then
        __r10 = __l
      else
        add(__l, __form1)
  end
  return __r10
end
read_string = function (str, more)
  __s = stream(str, more)
  __x1 = read(__s)
  if _37not(_37eq(__x1, eof)) then
    return __x1
end
key63 = function (atom)
  return _37and(string63(atom), _37and(_35(atom) > 1, _37eq(char(atom, edge(atom)), ":")))
end
expected = function (s, c)
  if is63(s.more) then
    return s.more
  else
    error(_37cat("Expected ", _37cat(c, _37cat(" at ", s.pos))))
end
wrap = function (s, x)
  __y = read(s)
  if more63(s, __y) then
    return __y
  else
    return [x, __y]
end
hex_prefix63 = function (str)
  __e = ""
  if _37eq(code(str, 0), 45) then
    __e = 1
  else
    __e = 0
  __i = __e
  __id1 = _37eq(code(str, __i), 48)
  __e1 = ""
  if __id1 then
    __i = __i + 1
    __n = code(str, __i)
    __e1 = _37or(_37eq(__n, 120), _37eq(__n, 88))
  else
    __e1 = __id1
  return __e1
end
maybe_number = function (str)
  if hex_prefix63(str) then
    if number_code63(code(str, edge(str))) then
      return number(str)
end
real63 = function (x)
  return _37and(number63(x), _37and(_37not(nan63(x)), _37not(inf63(x))))
end
read_table[""] = function (s)
  __str = ""
  while ON do
    __c3 = peek_char(s)
    if _37and(__c3, _37and(_37not(has63(whitespace, __c3)), _37not(has63(delimiters, __c3)))) then
      __str = _37cat(__str, read_char(s))
    else
      break
  end
  if _37eq(__str, "true") then
    return ON
  else
    if _37eq(__str, "false") then
      return OFF
    else
      __n1 = maybe_number(__str)
      if real63(__n1) then
        return __n1
      else
        return __str
end
read_table["("] = function (s)
  read_char(s)
  __r20 = ""
  __l1 = []
  while nil63(__r20) do
    skip_non_code(s)
    __c4 = peek_char(s)
    if _37eq(__c4, ")") then
      read_char(s)
      __r20 = __l1
    else
      if nil63(__c4) then
        __r20 = expected(s, ")")
      else
        __x3 = read(s)
        if eof63(s, __x3) then
          __r20 = expected(s, ")")
        else
          if key63(__x3) then
            __k = clip(__x3, 0, edge(__x3))
            __v = read(s)
            __l1 = object(__l1)
            __l1[__k] = __v
          else
            add(__l1, __x3)
  end
  return __r20
end
read_table[")"] = function (s)
  error(_37cat("Unexpected ) at ", s.pos))
end
read_matching = function (opener, closer, s)
  __r23 = ""
  __pos1 = s.pos
  __str1 = ""
  __i1 = 0
  while __i1 < _35(opener) do
    __str1 = _37cat(__str1, _37or(read_char(s), ""))
    __i1 = __i1 + 1
  end
  if _37eq(__str1, opener) then
    while nil63(__r23) do
      if _37eq(clip(s.string, s.pos, s.pos + _35(closer)), closer) then
        __i2 = 0
        while __i2 < _35(closer) do
          __str1 = _37cat(__str1, read_char(s))
          __i2 = __i2 + 1
        end
        __r23 = __str1
      else
        if nil63(peek_char(s)) then
          __r23 = expected(s, closer)
        else
          __str1 = _37cat(__str1, read_char(s))
          if _37eq(peek_char(s), "\\") then
            __str1 = _37cat(__str1, read_char(s))
    end
  return __r23
end
read_table["\""] = function (s)
  if string_starts63(s.string, "\"\"\"", s.pos) then
    return read_matching("\"\"\"", "\"\"\"", s)
  else
    __i3 = s.pos
    __j = search(s.string, "\"", __i3 + 1)
    __b = either(search(s.string, "\\", __i3 + 1), __j)
    if _37and(is63(__j), _37and(__j < s.len, __b >= __j)) then
      s.pos = __j + 1
      return clip(s.string, __i3, __j + 1)
    else
      __r25 = ""
      read_char(s)
      while nil63(__r25) do
        __c5 = peek_char(s)
        if _37eq(__c5, "\"") then
          read_char(s)
          __r25 = clip(s.string, __i3, s.pos)
        else
          if nil63(__c5) then
            __r25 = expected(s, "\"")
          else
            if _37eq(__c5, "\\") then
              read_char(s)
            read_char(s)
      end
      return __r25
end
read_table["|"] = function (s)
  __i4 = s.pos
  __j1 = search(s.string, "|", __i4 + 1)
  if _37and(is63(__j1), __j1 < s.len) then
    s.pos = __j1 + 1
    return clip(s.string, __i4, __j1 + 1)
  else
    return expected(s, "|")
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
  __c6 = peek_char(s)
  if _37or(nil63(__c6), _37or(has63(whitespace, __c6), has63(closing_delimiters, __c6))) then
    return ","
  else
    if _37eq(__c6, "@") then
      read_char(s)
      return wrap(s, "unquote-splicing")
    else
      return wrap(s, "unquote")
end
