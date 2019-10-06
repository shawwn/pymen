from lumen import *
delimiters = {"(": True, ")": True, ";": True, "\r": True, "\n": True}
whitespace = {" ": True, "\t": True, "\r": True, "\n": True}
def stream(L_str=None, more=None):
  return {"pos": 0, "string": L_str, "len": L_35(L_str), "more": more}
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
def read(s=None):
  skip_non_code(s)
  __c2 = peek_char(s)
  if is63(__c2):
    return (has(read_table, __c2) or has(read_table, ""))(s)
  else:
    return eof
def read_all(s=None):
  __l = []
  while True:
    __form = read(s)
    if __form == eof:
      break
    add(__l, __form)
  return __l
def read_string(L_str=None, more=None):
  __x = read(stream(L_str, more))
  if not( __x == eof):
    return __x
def key63(atom=None):
  return string63(atom) and L_35(atom) > 1 and char(atom, edge(atom)) == ":"
def flag63(atom=None):
  return string63(atom) and L_35(atom) > 1 and char(atom, 0) == ":"
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
  return number63(x) and not nan63(x) and not inf63(x)
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
  __r17 = None
  __l1 = []
  while nil63(__r17):
    skip_non_code(s)
    __c4 = peek_char(s)
    if __c4 == ")":
      read_char(s)
      __r17 = __l1
    else:
      if nil63(__c4):
        __r17 = expected(s, ")")
      else:
        __x3 = read(s)
        if key63(__x3):
          __k = clip(__x3, 0, edge(__x3))
          __v1 = read(s)
          __l1 = object(__l1)
          __l1[__k] = __v1
        else:
          if flag63(__x3):
            __l1 = object(__l1)
            __l1[clip(__x3, 1)] = True
          else:
            add(__l1, __x3)
  return __r17
read_table["("] = __f2
def __f3(s=None):
  raise Exception(cat("Unexpected ) at ", s["pos"]))
read_table[")"] = __f3
def __f4(s=None):
  read_char(s)
  __r20 = None
  __L_str1 = "\""
  while nil63(__r20):
    __c5 = peek_char(s)
    if __c5 == "\"":
      __r20 = cat(__L_str1, read_char(s))
    else:
      if nil63(__c5):
        __r20 = expected(s, "\"")
      else:
        if __c5 == "\\":
          __L_str1 = cat(__L_str1, read_char(s))
        __L_str1 = cat(__L_str1, read_char(s))
  return __r20
read_table["\""] = __f4
def __f5(s=None):
  read_char(s)
  __r22 = None
  __L_str2 = "|"
  while nil63(__r22):
    __c6 = peek_char(s)
    if __c6 == "|":
      __r22 = cat(__L_str2, read_char(s))
    else:
      if nil63(__c6):
        __r22 = expected(s, "|")
      else:
        __L_str2 = cat(__L_str2, read_char(s))
  return __r22
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
  __c7 = peek_char(s)
  if nil63(__c7) or has63(whitespace, __c7):
    return ","
  else:
    if __c7 == "@":
      read_char(s)
      return wrap(s, "unquote-splicing")
    else:
      return wrap(s, "unquote")
read_table[","] = __f8
