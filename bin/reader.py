from lumen import *
from lumen import _35
delimiters = {"(": True, ")": True, ";": True, "\r": True, "\n": True}
whitespace = {" ": True, "\t": True, "\r": True, "\n": True}
def stream(_str=None, more=None):
  return {"pos": 0, "string": _str, "len": _35(_str), "more": more}
def peek_char(s=None):
  ____id = s
  __pos = ____id["pos"]
  __len = ____id["len"]
  __string = ____id["string"]
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
      if whitespace[__c1]:
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
    return (read_table[__c2] or read_table[""])(s)
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
def read_string(_str=None, more=None):
  __x = read(stream(_str, more))
  if not( __x == eof):
    return __x
def key63(atom=None):
  return string63(atom) and _35(atom) > 1 and char(atom, edge(atom)) == ":"
def flag63(atom=None):
  return string63(atom) and _35(atom) > 1 and char(atom, 0) == ":"
def expected(s=None, c=None):
  ____id1 = s
  __more = ____id1["more"]
  __pos1 = ____id1["pos"]
  __id2 = __more

  if __id2:
    __e = __id2
  else:
    error(cat("Expected ", c, " at ", __pos1))
    __e = None
  return __e
def wrap(s=None, x=None):
  __y = read(s)
  if __y == s["more"]:
    return __y
  else:
    return [x, __y]
def hex_prefix63(_str=None):

  if code(_str, 0) == 45:
    __e1 = 1
  else:
    __e1 = 0
  __i = __e1
  __id3 = code(_str, __i) == 48

  if __id3:
    __i = __i + 1
    __n = code(_str, __i)
    __e2 = __n == 120 or __n == 88
  else:
    __e2 = __id3
  return __e2
def maybe_number(_str=None):
  if hex_prefix63(_str):
    if number_code63(code(_str, edge(_str))):
      return number(_str)
def real63(x=None):
  return number63(x) and not nan63(x) and not inf63(x)
def __f(s=None):
  ___str = ""
  while True:
    __c3 = peek_char(s)
    if __c3 and (not whitespace[__c3] and not delimiters[__c3]):
      ___str = cat(___str, read_char(s))
    else:
      break
  if ___str == "true":
    return True
  else:
    if ___str == "false":
      return False
    else:
      __n1 = maybe_number(___str)
      if real63(__n1):
        return __n1
      else:
        return ___str
read_table[""] = __f
def __f1(s=None):
  read_char(s)
  __r16 = None
  __l1 = []
  while nil63(__r16):
    skip_non_code(s)
    __c4 = peek_char(s)
    if __c4 == ")":
      read_char(s)
      __r16 = __l1
    else:
      if nil63(__c4):
        __r16 = expected(s, ")")
      else:
        __x2 = read(s)
        if key63(__x2):
          __k = clip(__x2, 0, edge(__x2))
          __v = read(s)
          __l1 = object(__l1)
          __l1[__k] = __v
        else:
          if flag63(__x2):
            __l1 = object(__l1)
            __l1[clip(__x2, 1)] = True
          else:
            add(__l1, __x2)
  return __r16
read_table["("] = __f1
def __f2(s=None):
  error(cat("Unexpected ) at ", s["pos"]))
read_table[")"] = __f2
def __f3(s=None):
  read_char(s)
  __r19 = None
  ___str1 = "\""
  while nil63(__r19):
    __c5 = peek_char(s)
    if __c5 == "\"":
      __r19 = cat(___str1, read_char(s))
    else:
      if nil63(__c5):
        __r19 = expected(s, "\"")
      else:
        if __c5 == "\\":
          ___str1 = cat(___str1, read_char(s))
        ___str1 = cat(___str1, read_char(s))
  return __r19
read_table["\""] = __f3
def __f4(s=None):
  read_char(s)
  __r21 = None
  ___str2 = "|"
  while nil63(__r21):
    __c6 = peek_char(s)
    if __c6 == "|":
      __r21 = cat(___str2, read_char(s))
    else:
      if nil63(__c6):
        __r21 = expected(s, "|")
      else:
        ___str2 = cat(___str2, read_char(s))
  return __r21
read_table["|"] = __f4
def __f5(s=None):
  read_char(s)
  return wrap(s, "quote")
read_table["'"] = __f5
def __f6(s=None):
  read_char(s)
  return wrap(s, "quasiquote")
read_table["`"] = __f6
def __f7(s=None):
  read_char(s)
  if peek_char(s) == "@":
    read_char(s)
    return wrap(s, "unquote-splicing")
  else:
    return wrap(s, "unquote")
read_table[","] = __f7
