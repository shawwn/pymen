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
def more63(s=None, x=None):
  return is63(s["more"]) and x == s["more"]

def eof63(s=None, x=None):
  return x == eof or more63(s, x)

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
    __r8 = [",", __form]
    while True:
      read_char(s)
      __form = read_1(s)
      if eof63(s, __form):
        return expected(s, "tuple")
      add(__r8, __form)
      if not( "," == peek_char(s)):
        break
    return __r8
  else:
    return __form

def read_all(s=None):
  __r10 = None
  __l = []
  while nil63(__r10):
    __form1 = read(s)
    if more63(s, __form1):
      __r10 = s["more"]
    else:
      if eof63(s, __form1):
        __r10 = __l
      else:
        add(__l, __form1)
  return __r10

def read_string(L_str=None, more=None):
  __s = stream(L_str, more)
  __x1 = read(__s)
  if not( __x1 == eof):
    return __x1

def key63(atom=None):
  return string63(atom) and (L_35(atom) > 1 and char(atom, edge(atom)) == ":")

def expected(s=None, c=None):
  if is63(s["more"]):
    return s["more"]
  else:
    raise Exception(cat("Expected ", c, " at ", s["pos"]))

def wrap(s=None, x=None):
  __y = read(s)
  if more63(s, __y):
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
  __r20 = None
  __l1 = []
  while nil63(__r20):
    skip_non_code(s)
    __c4 = peek_char(s)
    if __c4 == ")":
      read_char(s)
      __r20 = __l1
    else:
      if nil63(__c4):
        __r20 = expected(s, ")")
      else:
        __x5 = read(s)
        if eof63(s, __x5):
          __r20 = expected(s, ")")
        else:
          if key63(__x5):
            __k = clip(__x5, 0, edge(__x5))
            __v1 = read(s)
            __l1 = object(__l1)
            __l1[__k] = __v1
          else:
            add(__l1, __x5)
  return __r20

read_table["("] = __f2
def __f3(s=None):
  raise Exception(cat("Unexpected ) at ", s["pos"]))

read_table[")"] = __f3
def read_matching(opener=None, closer=None, s=None):
  __r23 = None
  __pos1 = s["pos"]
  __L_str1 = ""
  __i1 = 0
  while __i1 < L_35(opener):
    __L_str1 = cat(__L_str1, read_char(s) or "")
    __i1 = __i1 + 1
  if __L_str1 == opener:
    while nil63(__r23):
      if clip(s["string"], s["pos"], s["pos"] + L_35(closer)) == closer:
        __i2 = 0
        while __i2 < L_35(closer):
          __L_str1 = cat(__L_str1, read_char(s))
          __i2 = __i2 + 1
        __r23 = __L_str1
      else:
        if nil63(peek_char(s)):
          __r23 = expected(s, closer)
        else:
          __L_str1 = cat(__L_str1, read_char(s))
          if peek_char(s) == "\\":
            __L_str1 = cat(__L_str1, read_char(s))
  return __r23

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
      __r25 = None
      read_char(s)
      while nil63(__r25):
        __c5 = peek_char(s)
        if __c5 == "\"":
          read_char(s)
          __r25 = clip(s["string"], __i3, s["pos"])
        else:
          if nil63(__c5):
            __r25 = expected(s, "\"")
          else:
            if __c5 == "\\":
              read_char(s)
            read_char(s)
      return __r25

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
