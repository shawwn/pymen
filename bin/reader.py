from lumen import *
delimiters = {
  "(": True,
  ")": True,
  ";": True,
  ",": True,
  "\r": True,
  "\n": True
}
closing_delimiters = {")": True}
whitespace = {
  " ": True,
  "\t": True,
  "\r": True,
  "\n": True
}
def stream(L_str=None, more=None):
  return {
    "pos": 0,
    "string": L_str,
    "len": L_35(L_str),
    "more": more
  }

def peek_char(s=None):
  ____id = s
  __pos = has(____id, "pos")
  __len = has(____id, "len")
  __string = has(____id, "string")
  if __pos < __len:
    return char(__string, __pos)

def read_char(s=None):
  __c = peek_char(s)
  if __c:
    s["pos"] = s["pos"] + 1
    return __c

def skip_non_code(s=None):
  while True:
    __c1 = peek_char(s)
    if nil63(__c1):
      break
    else:
      if has63(whitespace, __c1):
        read_char(s)
      else:
        if __c1 == ";":
          while __c1 and not( __c1 == "\n"):
            __c1 = read_char(s)
          skip_non_code(s)
        else:
          break

read_table = {}
eof = {}
def eof63(s=None, x=None):
  return x == eof or is63(s["more"]) and x == s["more"]

def read_1(s=None):
  skip_non_code(s)
  __c2 = peek_char(s)
  if is63(__c2):
    return (has(read_table, __c2) or has(read_table, ""))(s)
  else:
    return eof

def read(s=None):
  __form = read_1(s)
  if "," == peek_char(s):
    __r7 = [",", __form]
    while True:
      read_char(s)
      __form = read_1(s)
      if eof63(s, __form):
        return expected(s, "tuple")
      add(__r7, __form)
      if not( "," == peek_char(s)):
        break
    return __r7
  else:
    return __form

def read_all(s=None):
  __l = []
  while True:
    __form1 = read(s)
    if eof63(s, __form1):
      break
    add(__l, __form1)
  return __l

def read_string(L_str=None, more=None):
  __s = stream(L_str, more)
  __x1 = read(__s)
  if not( __x1 == eof):
    return __x1

def key63(atom=None):
  return string63(atom) and (L_35(atom) > 1 and char(atom, edge(atom)) == ":")

def flag63(atom=None):
  return string63(atom) and (L_35(atom) > 1 and char(atom, 0) == ":")

def expected(s=None, c=None):
  if is63(s["more"]):
    return s["more"]
  else:
    raise Exception(cat("Expected ", c, " at ", s["pos"]))

def wrap(s=None, x=None):
  __y = read(s)
  if __y == s["more"]:
    return __y
  else:
    return [x, __y]

def hex_prefix63(L_str=None):
  __e = None
  if code(L_str, 0) == 45:
    __e = 1
  else:
    __e = 0
  __i = __e
  __id2 = code(L_str, __i) == 48
  __e1 = None
  if __id2:
    __i = __i + 1
    __n = code(L_str, __i)
    __e1 = __n == 120 or __n == 88
  else:
    __e1 = __id2
  return __e1

def maybe_number(L_str=None):
  if hex_prefix63(L_str):
    def __f():
      try:
        return [True, int(L_str, 16)]
      except:
        import sys
        e = sys.exc_info()
        return [False, e[1], e]
    ____id1 = __f()
    __ok = has(____id1, 0)
    __v = has(____id1, 1)
    if __ok:
      return __v
  else:
    if number_code63(code(L_str, edge(L_str))):
      return number(L_str)

def real63(x=None):
  return number63(x) and (not nan63(x) and not inf63(x))

def __f1(s=None):
  __L_str = ""
  while True:
    __c3 = peek_char(s)
    if __c3 and (not has63(whitespace, __c3) and not has63(delimiters, __c3)):
      __L_str = cat(__L_str, read_char(s))
    else:
      break
  if __L_str == "true":
    return True
  else:
    if __L_str == "false":
      return False
    else:
      __n1 = maybe_number(__L_str)
      if real63(__n1):
        return __n1
      else:
        return __L_str

read_table[""] = __f1
def __f2(s=None):
  read_char(s)
  __r19 = None
  __l1 = []
  while nil63(__r19):
    skip_non_code(s)
    __c4 = peek_char(s)
    if __c4 == ")":
      read_char(s)
      __r19 = __l1
    else:
      if nil63(__c4):
        __r19 = expected(s, ")")
      else:
        __x4 = read(s)
        if key63(__x4):
          __k = clip(__x4, 0, edge(__x4))
          __v1 = read(s)
          __l1 = object(__l1)
          __l1[__k] = __v1
        else:
          if flag63(__x4):
            __l1 = object(__l1)
            __l1[clip(__x4, 1)] = True
          else:
            add(__l1, __x4)
  return __r19

read_table["("] = __f2
def __f3(s=None):
  raise Exception(cat("Unexpected ) at ", s["pos"]))

read_table[")"] = __f3
def read_matching(opener=None, closer=None, s=None):
  __r22 = None
  __pos1 = s["pos"]
  __L_str1 = ""
  __i1 = 0
  while __i1 < L_35(opener):
    __L_str1 = cat(__L_str1, read_char(s) or "")
    __i1 = __i1 + 1
  if __L_str1 == opener:
    while nil63(__r22):
      if clip(s["string"], s["pos"], s["pos"] + L_35(closer)) == closer:
        __i2 = 0
        while __i2 < L_35(closer):
          __L_str1 = cat(__L_str1, read_char(s))
          __i2 = __i2 + 1
        __r22 = __L_str1
      else:
        if nil63(peek_char(s)):
          __r22 = expected(s, closer)
        else:
          __L_str1 = cat(__L_str1, read_char(s))
          if peek_char(s) == "\\":
            __L_str1 = cat(__L_str1, read_char(s))
  return __r22

def __f4(s=None):
  if string_starts63(s["string"], "\"\"\"", s["pos"]):
    return read_matching("\"\"\"", "\"\"\"", s)
  else:
    __i3 = s["pos"]
    __j = search(s["string"], "\"", __i3 + 1)
    __b = either(search(s["string"], "\\", __i3 + 1), __j)
    if is63(__j) and (__j < s["len"] and __b >= __j):
      s["pos"] = __j + 1
      return clip(s["string"], __i3, __j + 1)
    else:
      __r24 = None
      read_char(s)
      while nil63(__r24):
        __c5 = peek_char(s)
        if __c5 == "\"":
          read_char(s)
          __r24 = clip(s["string"], __i3, s["pos"])
        else:
          if nil63(__c5):
            __r24 = expected(s, "\"")
          else:
            if __c5 == "\\":
              read_char(s)
            read_char(s)
      return __r24

read_table["\""] = __f4
def __f5(s=None):
  __i4 = s["pos"]
  __j1 = search(s["string"], "|", __i4 + 1)
  if is63(__j1) and __j1 < s["len"]:
    s["pos"] = __j1 + 1
    return clip(s["string"], __i4, __j1 + 1)
  else:
    return expected(s, "|")

read_table["|"] = __f5
def __f6(s=None):
  read_char(s)
  return wrap(s, "quote")

read_table["'"] = __f6
def __f7(s=None):
  read_char(s)
  return wrap(s, "quasiquote")

read_table["`"] = __f7
def __f8(s=None):
  read_char(s)
  __c6 = peek_char(s)
  if nil63(__c6) or (has63(whitespace, __c6) or has63(closing_delimiters, __c6)):
    return ","
  else:
    if __c6 == "@":
      read_char(s)
      return wrap(s, "unquote-splicing")
    else:
      return wrap(s, "unquote")

read_table[","] = __f8
