passed = 0
failed = 0
tests = []
from .runtime import *
from .macros import *
from . import reader
from . import compiler
from . import system
def __test__macro(x=None, msg=None):
  return ["if", ["not", x], ["do", ["set", "failed", ["+", "failed", 1]], ["return", msg]], ["inc", "passed"]]

setenv("test", macro=__test__macro)
def equal63(a=None, b=None):
  if atom63(a):
    return a == b
  else:
    return L_str(a) == L_str(b)

def __test61__macro(a=None, b=None):
  __x22 = unique("x")
  __y1 = unique("y")
  return ["let", [__x22, a, __y1, b], ["test", ["equal?", __x22, __y1], ["cat", "\"failed: expected \"", ["str", __x22], "\", was \"", ["str", __y1]]]]

setenv("test=", macro=__test61__macro)
def __prep__macro():
  return ["do", ["global", "passed"], ["global", "failed"]]

setenv("prep", macro=__prep__macro)
def __define_test__macro(name=None, *_args, **_keys):
  ____r8 = unstash(_args, _keys)
  __name1 = destash33(name, ____r8)
  ____id1 = ____r8
  __body1 = cut(____id1, 0)
  return ["add", "tests", ["list", ["quote", __name1], join(["fn", join(), ["prep"]], __body1)]]

setenv("define-test", macro=__define_test__macro)
def main():
  ____x47 = tests
  ____i = 0
  while ____i < L_35(____x47):
    ____id2 = ____x47[____i]
    __name2 = has(____id2, 0)
    __f = has(____id2, 1)
    __result = __f()
    if string63(__result):
      L_print(cat(" ", __name2, " ", __result))
    ____i = ____i + 1
  return L_print(cat(" ", passed, " passed, ", failed, " failed"))

def __f16():
  global passed
  global failed
  __read = reader.read_string
  ____x49 = None
  ____y2 = __read("")
  if not equal63(____x49, ____y2):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x49), ", was ", L_str(____y2))
  else:
    passed = passed + 1
  ____x50 = "nil"
  ____y3 = __read("nil")
  if not equal63(____x50, ____y3):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x50), ", was ", L_str(____y3))
  else:
    passed = passed + 1
  ____x51 = 17
  ____y4 = __read("17")
  if not equal63(____x51, ____y4):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x51), ", was ", L_str(____y4))
  else:
    passed = passed + 1
  ____x52 = 0.015
  ____y5 = __read("1.5e-2")
  if not equal63(____x52, ____y5):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x52), ", was ", L_str(____y5))
  else:
    passed = passed + 1
  ____x53 = 15
  ____y6 = __read("0xF")
  if not equal63(____x53, ____y6):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x53), ", was ", L_str(____y6))
  else:
    passed = passed + 1
  ____x54 = -15
  ____y7 = __read("-0Xf")
  if not equal63(____x54, ____y7):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x54), ", was ", L_str(____y7))
  else:
    passed = passed + 1
  ____x55 = "0x"
  ____y8 = __read("0x")
  if not equal63(____x55, ____y8):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x55), ", was ", L_str(____y8))
  else:
    passed = passed + 1
  ____x56 = "-0X"
  ____y9 = __read("-0X")
  if not equal63(____x56, ____y9):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x56), ", was ", L_str(____y9))
  else:
    passed = passed + 1
  ____x57 = "-0Xg"
  ____y10 = __read("-0Xg")
  if not equal63(____x57, ____y10):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x57), ", was ", L_str(____y10))
  else:
    passed = passed + 1
  ____x58 = True
  ____y11 = __read("true")
  if not equal63(____x58, ____y11):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x58), ", was ", L_str(____y11))
  else:
    passed = passed + 1
  ____x59 = not True
  ____y12 = __read("false")
  if not equal63(____x59, ____y12):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x59), ", was ", L_str(____y12))
  else:
    passed = passed + 1
  ____x60 = "hi"
  ____y13 = __read("hi")
  if not equal63(____x60, ____y13):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x60), ", was ", L_str(____y13))
  else:
    passed = passed + 1
  ____x61 = "\"hi\""
  ____y14 = __read("\"hi\"")
  if not equal63(____x61, ____y14):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x61), ", was ", L_str(____y14))
  else:
    passed = passed + 1
  ____x62 = "\"\"\"hi\"\"\""
  ____y15 = __read("\"\"\"hi\"\"\"")
  if not equal63(____x62, ____y15):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x62), ", was ", L_str(____y15))
  else:
    passed = passed + 1
  ____x63 = "|hi|"
  ____y16 = __read("|hi|")
  if not equal63(____x63, ____y16):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x63), ", was ", L_str(____y16))
  else:
    passed = passed + 1
  ____x64 = [1, 2]
  ____y17 = __read("(1 2)")
  if not equal63(____x64, ____y17):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x64), ", was ", L_str(____y17))
  else:
    passed = passed + 1
  ____x66 = [1, ["a"]]
  ____y18 = __read("(1 (a))")
  if not equal63(____x66, ____y18):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x66), ", was ", L_str(____y18))
  else:
    passed = passed + 1
  ____x69 = ["quote", "a"]
  ____y19 = __read("'a")
  if not equal63(____x69, ____y19):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x69), ", was ", L_str(____y19))
  else:
    passed = passed + 1
  ____x71 = ["quasiquote", "a"]
  ____y20 = __read("`a")
  if not equal63(____x71, ____y20):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x71), ", was ", L_str(____y20))
  else:
    passed = passed + 1
  ____x73 = ["quasiquote", ["unquote", "a"]]
  ____y21 = __read("`,a")
  if not equal63(____x73, ____y21):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x73), ", was ", L_str(____y21))
  else:
    passed = passed + 1
  ____x76 = ["quasiquote", ["unquote-splicing", "a"]]
  ____y22 = __read("`,@a")
  if not equal63(____x76, ____y22):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x76), ", was ", L_str(____y22))
  else:
    passed = passed + 1
  ____x79 = 2
  ____y23 = L_35(__read("(1 2 a: 7)"))
  if not equal63(____x79, ____y23):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x79), ", was ", L_str(____y23))
  else:
    passed = passed + 1
  ____x80 = 7
  ____y24 = __read("(1 2 a: 7)")["a"]
  if not equal63(____x80, ____y24):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x80), ", was ", L_str(____y24))
  else:
    passed = passed + 1
  ____x81 = True
  ____y25 = __read("(a: true)")["a"]
  if not equal63(____x81, ____y25):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x81), ", was ", L_str(____y25))
  else:
    passed = passed + 1
  ____x82 = 1
  ____y26 = - -1
  if not equal63(____x82, ____y26):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x82), ", was ", L_str(____y26))
  else:
    passed = passed + 1
  ____x83 = "0?"
  ____y27 = __read("0?")
  if not equal63(____x83, ____y27):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x83), ", was ", L_str(____y27))
  else:
    passed = passed + 1
  ____x84 = "0!"
  ____y28 = __read("0!")
  if not equal63(____x84, ____y28):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x84), ", was ", L_str(____y28))
  else:
    passed = passed + 1
  ____x85 = "0."
  ____y29 = __read("0.")
  if not equal63(____x85, ____y29):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x85), ", was ", L_str(____y29))
  else:
    passed = passed + 1
  ____x86 = ","
  ____y30 = __read(",")
  if not equal63(____x86, ____y30):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x86), ", was ", L_str(____y30))
  else:
    passed = passed + 1
  ____x87 = [","]
  ____y31 = __read("(,)")
  if not equal63(____x87, ____y31):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x87), ", was ", L_str(____y31))
  else:
    passed = passed + 1
  ____x89 = [",", "a", "b"]
  ____y32 = __read("a, b")
  if not equal63(____x89, ____y32):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x89), ", was ", L_str(____y32))
  else:
    passed = passed + 1
    return passed

add(tests, ["reader", __f16])
def __f17():
  global passed
  global failed
  __read1 = reader.read_string
  ____x92 = 17
  ____y33 = __read1("17", True)
  if not equal63(____x92, ____y33):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x92), ", was ", L_str(____y33))
  else:
    passed = passed + 1
  __more = []
  ____x93 = __more
  ____y34 = __read1("(open", __more)
  if not equal63(____x93, ____y34):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x93), ", was ", L_str(____y34))
  else:
    passed = passed + 1
  ____x94 = __more
  ____y35 = __read1("\"unterminated ", __more)
  if not equal63(____x94, ____y35):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x94), ", was ", L_str(____y35))
  else:
    passed = passed + 1
  ____x95 = __more
  ____y36 = __read1("|identifier", __more)
  if not equal63(____x95, ____y36):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x95), ", was ", L_str(____y36))
  else:
    passed = passed + 1
  ____x96 = __more
  ____y37 = __read1("'(a b c", __more)
  if not equal63(____x96, ____y37):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x96), ", was ", L_str(____y37))
  else:
    passed = passed + 1
  ____x97 = __more
  ____y38 = __read1("`(a b c", __more)
  if not equal63(____x97, ____y38):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x97), ", was ", L_str(____y38))
  else:
    passed = passed + 1
  ____x98 = __more
  ____y39 = __read1("`(a b ,(z", __more)
  if not equal63(____x98, ____y39):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x98), ", was ", L_str(____y39))
  else:
    passed = passed + 1
  ____x99 = __more
  ____y40 = __read1("`\"biz", __more)
  if not equal63(____x99, ____y40):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x99), ", was ", L_str(____y40))
  else:
    passed = passed + 1
  ____x100 = __more
  ____y41 = __read1("'\"boz", __more)
  if not equal63(____x100, ____y41):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x100), ", was ", L_str(____y41))
  else:
    passed = passed + 1
  def __f18():
    try:
      return [True, __read1("(open")]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id3 = __f18()
  __ok = has(____id3, 0)
  __e = has(____id3, 1)
  ____x103 = False
  ____y42 = __ok
  if not equal63(____x103, ____y42):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x103), ", was ", L_str(____y42))
  else:
    passed = passed + 1
  ____x104 = "Expected ) at 5"
  ____y43 = str(__e)
  if not equal63(____x104, ____y43):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x104), ", was ", L_str(____y43))
  else:
    passed = passed + 1
    return passed

add(tests, ["read-more", __f17])
def __f19():
  global passed
  global failed
  ____x106 = True
  ____y44 = nil63(None)
  if not equal63(____x106, ____y44):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x106), ", was ", L_str(____y44))
  else:
    passed = passed + 1
  ____x107 = False
  ____y45 = nil63(True)
  if not equal63(____x107, ____y45):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x107), ", was ", L_str(____y45))
  else:
    passed = passed + 1
  ____x108 = False
  ____y46 = nil63(False)
  if not equal63(____x108, ____y46):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x108), ", was ", L_str(____y46))
  else:
    passed = passed + 1
  ____x109 = False
  ____y47 = nil63({})
  if not equal63(____x109, ____y47):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x109), ", was ", L_str(____y47))
  else:
    passed = passed + 1
    return passed

add(tests, ["nil?", __f19])
def __f20():
  global passed
  global failed
  ____x111 = False
  ____y48 = is63(None)
  if not equal63(____x111, ____y48):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x111), ", was ", L_str(____y48))
  else:
    passed = passed + 1
  ____x112 = True
  ____y49 = is63(True)
  if not equal63(____x112, ____y49):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x112), ", was ", L_str(____y49))
  else:
    passed = passed + 1
  ____x113 = True
  ____y50 = is63(False)
  if not equal63(____x113, ____y50):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x113), ", was ", L_str(____y50))
  else:
    passed = passed + 1
  ____x114 = True
  ____y51 = is63({})
  if not equal63(____x114, ____y51):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x114), ", was ", L_str(____y51))
  else:
    passed = passed + 1
    return passed

add(tests, ["is?", __f20])
def __f21():
  global passed
  global failed
  ____x116 = True
  ____y52 = no(None)
  if not equal63(____x116, ____y52):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x116), ", was ", L_str(____y52))
  else:
    passed = passed + 1
  ____x117 = False
  ____y53 = no(True)
  if not equal63(____x117, ____y53):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x117), ", was ", L_str(____y53))
  else:
    passed = passed + 1
  ____x118 = True
  ____y54 = no(False)
  if not equal63(____x118, ____y54):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x118), ", was ", L_str(____y54))
  else:
    passed = passed + 1
  ____x119 = False
  ____y55 = no({})
  if not equal63(____x119, ____y55):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x119), ", was ", L_str(____y55))
  else:
    passed = passed + 1
  ____x120 = False
  ____y56 = no(0)
  if not equal63(____x120, ____y56):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x120), ", was ", L_str(____y56))
  else:
    passed = passed + 1
    return passed

add(tests, ["no", __f21])
def __f22():
  global passed
  global failed
  ____x122 = False
  ____y57 = yes(None)
  if not equal63(____x122, ____y57):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x122), ", was ", L_str(____y57))
  else:
    passed = passed + 1
  ____x123 = True
  ____y58 = yes(True)
  if not equal63(____x123, ____y58):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x123), ", was ", L_str(____y58))
  else:
    passed = passed + 1
  ____x124 = False
  ____y59 = yes(False)
  if not equal63(____x124, ____y59):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x124), ", was ", L_str(____y59))
  else:
    passed = passed + 1
  ____x125 = True
  ____y60 = yes({})
  if not equal63(____x125, ____y60):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x125), ", was ", L_str(____y60))
  else:
    passed = passed + 1
  ____x126 = True
  ____y61 = yes(0)
  if not equal63(____x126, ____y61):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x126), ", was ", L_str(____y61))
  else:
    passed = passed + 1
    return passed

add(tests, ["yes", __f22])
def __f23():
  global passed
  global failed
  ____x128 = True
  ____y62 = True or False
  if not equal63(____x128, ____y62):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x128), ", was ", L_str(____y62))
  else:
    passed = passed + 1
  ____x129 = False
  ____y63 = False or False
  if not equal63(____x129, ____y63):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x129), ", was ", L_str(____y63))
  else:
    passed = passed + 1
  ____x130 = True
  ____y64 = False or (False or True)
  if not equal63(____x130, ____y64):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x130), ", was ", L_str(____y64))
  else:
    passed = passed + 1
  ____x131 = True
  ____y65 = not False
  if not equal63(____x131, ____y65):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x131), ", was ", L_str(____y65))
  else:
    passed = passed + 1
  ____x132 = True
  ____y66 = not( False and True)
  if not equal63(____x132, ____y66):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x132), ", was ", L_str(____y66))
  else:
    passed = passed + 1
  ____x133 = False
  ____y67 = not( False or True)
  if not equal63(____x133, ____y67):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x133), ", was ", L_str(____y67))
  else:
    passed = passed + 1
  ____x134 = True
  ____y68 = True and True
  if not equal63(____x134, ____y68):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x134), ", was ", L_str(____y68))
  else:
    passed = passed + 1
  ____x135 = False
  ____y69 = True and False
  if not equal63(____x135, ____y69):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x135), ", was ", L_str(____y69))
  else:
    passed = passed + 1
  ____x136 = False
  ____y70 = True and (True and False)
  if not equal63(____x136, ____y70):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x136), ", was ", L_str(____y70))
  else:
    passed = passed + 1
    return passed

add(tests, ["boolean", __f23])
def __f24():
  global passed
  global failed
  ____x138 = True
  __id68 = True
  __e1 = None
  if __id68:
    __e1 = __id68
  else:
    raise Exception("bad")
    __e1 = None
  ____y71 = __e1
  if not equal63(____x138, ____y71):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x138), ", was ", L_str(____y71))
  else:
    passed = passed + 1
  ____x139 = False
  __id69 = False
  __e2 = None
  if __id69:
    raise Exception("bad")
    __e2 = None
  else:
    __e2 = __id69
  ____y72 = __e2
  if not equal63(____x139, ____y72):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x139), ", was ", L_str(____y72))
  else:
    passed = passed + 1
  __a = True
  ____x140 = True
  __id70 = True
  __e3 = None
  if __id70:
    __e3 = __id70
  else:
    __a = False
    __e3 = False
  ____y73 = __e3
  if not equal63(____x140, ____y73):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x140), ", was ", L_str(____y73))
  else:
    passed = passed + 1
  ____x141 = True
  ____y74 = __a
  if not equal63(____x141, ____y74):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x141), ", was ", L_str(____y74))
  else:
    passed = passed + 1
  ____x142 = False
  __id71 = False
  __e4 = None
  if __id71:
    __a = False
    __e4 = True
  else:
    __e4 = __id71
  ____y75 = __e4
  if not equal63(____x142, ____y75):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x142), ", was ", L_str(____y75))
  else:
    passed = passed + 1
  ____x143 = True
  ____y76 = __a
  if not equal63(____x143, ____y76):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x143), ", was ", L_str(____y76))
  else:
    passed = passed + 1
  __b = True
  ____x144 = True
  __b = False
  __id72 = False
  __e5 = None
  if __id72:
    __e5 = __id72
  else:
    __b = True
    __e5 = __b
  ____y77 = __e5
  if not equal63(____x144, ____y77):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x144), ", was ", L_str(____y77))
  else:
    passed = passed + 1
  ____x145 = True
  ____y78 = __b
  if not equal63(____x145, ____y78):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x145), ", was ", L_str(____y78))
  else:
    passed = passed + 1
  ____x146 = True
  __b = True
  __id73 = __b
  __e6 = None
  if __id73:
    __e6 = __id73
  else:
    __b = True
    __e6 = __b
  ____y79 = __e6
  if not equal63(____x146, ____y79):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x146), ", was ", L_str(____y79))
  else:
    passed = passed + 1
  ____x147 = True
  ____y80 = __b
  if not equal63(____x147, ____y80):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x147), ", was ", L_str(____y80))
  else:
    passed = passed + 1
  ____x148 = True
  __b = False
  __id74 = True
  __e7 = None
  if __id74:
    __b = True
    __e7 = __b
  else:
    __e7 = __id74
  ____y81 = __e7
  if not equal63(____x148, ____y81):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x148), ", was ", L_str(____y81))
  else:
    passed = passed + 1
  ____x149 = True
  ____y82 = __b
  if not equal63(____x149, ____y82):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x149), ", was ", L_str(____y82))
  else:
    passed = passed + 1
  ____x150 = False
  __b = False
  __id75 = __b
  __e8 = None
  if __id75:
    __b = True
    __e8 = __b
  else:
    __e8 = __id75
  ____y83 = __e8
  if not equal63(____x150, ____y83):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x150), ", was ", L_str(____y83))
  else:
    passed = passed + 1
  ____x151 = False
  ____y84 = __b
  if not equal63(____x151, ____y84):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x151), ", was ", L_str(____y84))
  else:
    passed = passed + 1
    return passed

add(tests, ["short", __f24])
def __f25():
  global passed
  global failed
  ____x153 = 4
  ____y85 = 2 + 2
  if not equal63(____x153, ____y85):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x153), ", was ", L_str(____y85))
  else:
    passed = passed + 1
  ____x154 = 0
  ____y86 = apply(L_42, [0, 0])
  if not equal63(____x154, ____y86):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x154), ", was ", L_str(____y86))
  else:
    passed = passed + 1
  ____x156 = 4
  ____y87 = apply(L_43, [2, 2])
  if not equal63(____x156, ____y87):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x156), ", was ", L_str(____y87))
  else:
    passed = passed + 1
  ____x158 = 0
  ____y88 = apply(L_43, [])
  if not equal63(____x158, ____y88):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x158), ", was ", L_str(____y88))
  else:
    passed = passed + 1
  ____x159 = 18
  ____y89 = 18
  if not equal63(____x159, ____y89):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x159), ", was ", L_str(____y89))
  else:
    passed = passed + 1
  ____x160 = 4
  ____y90 = 7 - 3
  if not equal63(____x160, ____y90):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x160), ", was ", L_str(____y90))
  else:
    passed = passed + 1
  ____x161 = 4
  ____y91 = apply(L_45, [7, 3])
  if not equal63(____x161, ____y91):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x161), ", was ", L_str(____y91))
  else:
    passed = passed + 1
  ____x163 = 0
  ____y92 = apply(L_45, [])
  if not equal63(____x163, ____y92):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x163), ", was ", L_str(____y92))
  else:
    passed = passed + 1
  ____x164 = 5
  ____y93 = 10 / 2
  if not equal63(____x164, ____y93):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x164), ", was ", L_str(____y93))
  else:
    passed = passed + 1
  ____x165 = 5
  ____y94 = apply(L_47, [10, 2])
  if not equal63(____x165, ____y94):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x165), ", was ", L_str(____y94))
  else:
    passed = passed + 1
  ____x167 = 1
  ____y95 = apply(L_47, [])
  if not equal63(____x167, ____y95):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x167), ", was ", L_str(____y95))
  else:
    passed = passed + 1
  ____x168 = 6
  ____y96 = 2 * 3
  if not equal63(____x168, ____y96):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x168), ", was ", L_str(____y96))
  else:
    passed = passed + 1
  ____x169 = 6
  ____y97 = apply(L_42, [2, 3])
  if not equal63(____x169, ____y97):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x169), ", was ", L_str(____y97))
  else:
    passed = passed + 1
  ____x171 = 1
  ____y98 = apply(L_42, [])
  if not equal63(____x171, ____y98):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x171), ", was ", L_str(____y98))
  else:
    passed = passed + 1
  ____x172 = True
  ____y99 = 2.01 > 2
  if not equal63(____x172, ____y99):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x172), ", was ", L_str(____y99))
  else:
    passed = passed + 1
  ____x173 = True
  ____y100 = 5 >= 5
  if not equal63(____x173, ____y100):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x173), ", was ", L_str(____y100))
  else:
    passed = passed + 1
  ____x174 = True
  ____y101 = 2100 > 2000
  if not equal63(____x174, ____y101):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x174), ", was ", L_str(____y101))
  else:
    passed = passed + 1
  ____x175 = True
  ____y102 = 0.002 < 0.0021
  if not equal63(____x175, ____y102):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x175), ", was ", L_str(____y102))
  else:
    passed = passed + 1
  ____x176 = False
  ____y103 = 2 < 2
  if not equal63(____x176, ____y103):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x176), ", was ", L_str(____y103))
  else:
    passed = passed + 1
  ____x177 = True
  ____y104 = 2 <= 2
  if not equal63(____x177, ____y104):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x177), ", was ", L_str(____y104))
  else:
    passed = passed + 1
  ____x178 = -7
  ____y105 = - 7
  if not equal63(____x178, ____y105):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x178), ", was ", L_str(____y105))
  else:
    passed = passed + 1
  ____x179 = False
  ____y106 = numeric63("")
  if not equal63(____x179, ____y106):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x179), ", was ", L_str(____y106))
  else:
    passed = passed + 1
    return passed

add(tests, ["numeric", __f25])
def __f26():
  global passed
  global failed
  ____x181 = 3
  ____y107 = max(1, 3)
  if not equal63(____x181, ____y107):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x181), ", was ", L_str(____y107))
  else:
    passed = passed + 1
  ____x182 = 2
  ____y108 = min(2, 7)
  if not equal63(____x182, ____y108):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x182), ", was ", L_str(____y108))
  else:
    passed = passed + 1
  __n = random()
  ____x183 = True
  ____y109 = __n > 0 and __n < 1
  if not equal63(____x183, ____y109):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x183), ", was ", L_str(____y109))
  else:
    passed = passed + 1
  ____x184 = 4
  ____y110 = floor(4.78)
  if not equal63(____x184, ____y110):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x184), ", was ", L_str(____y110))
  else:
    passed = passed + 1
    return passed

add(tests, ["math", __f26])
def __f27():
  global passed
  global failed
  ____x186 = -3
  ____y111 = -( 1 + 2)
  if not equal63(____x186, ____y111):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x186), ", was ", L_str(____y111))
  else:
    passed = passed + 1
  ____x187 = 10
  ____y112 = 12 - (1 + 1)
  if not equal63(____x187, ____y112):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x187), ", was ", L_str(____y112))
  else:
    passed = passed + 1
  ____x188 = 11
  ____y113 = 12 - 1 * 1
  if not equal63(____x188, ____y113):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x188), ", was ", L_str(____y113))
  else:
    passed = passed + 1
  ____x189 = 10
  ____y114 = 4 / 2 + 8
  if not equal63(____x189, ____y114):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x189), ", was ", L_str(____y114))
  else:
    passed = passed + 1
    return passed

add(tests, ["precedence", __f27])
def __f28():
  global passed
  global failed
  __l = [1, 1, 2, 3]
  ____id4 = __l
  __a1 = has(____id4, 0)
  __b1 = has(____id4, 1)
  __c = has(____id4, 2)
  __d = has(____id4, 3)
  ____x192 = True
  ____y115 = apply(L_6061, __l)
  if not equal63(____x192, ____y115):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x192), ", was ", L_str(____y115))
  else:
    passed = passed + 1
  ____x193 = False
  ____y116 = apply(L_60, __l)
  if not equal63(____x193, ____y116):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x193), ", was ", L_str(____y116))
  else:
    passed = passed + 1
  ____x194 = False
  ____y117 = apply(L_61, __l)
  if not equal63(____x194, ____y117):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x194), ", was ", L_str(____y117))
  else:
    passed = passed + 1
  ____x195 = True
  ____y118 = call(L_61, 1, __a1, __b1)
  if not equal63(____x195, ____y118):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x195), ", was ", L_str(____y118))
  else:
    passed = passed + 1
  ____x196 = False
  ____y119 = apply(L_62, reverse(__l))
  if not equal63(____x196, ____y119):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x196), ", was ", L_str(____y119))
  else:
    passed = passed + 1
  ____x197 = True
  ____y120 = apply(L_6261, reverse(__l))
  if not equal63(____x197, ____y120):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x197), ", was ", L_str(____y120))
  else:
    passed = passed + 1
  ____x198 = True
  ____y121 = __a1 <= __b1 and (__b1 <= __c and __c <= __d)
  if not equal63(____x198, ____y121):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x198), ", was ", L_str(____y121))
  else:
    passed = passed + 1
  ____x199 = True
  ____y122 = __a1 <= __b1 and (__b1 <= __c and __c <= __d)
  if not equal63(____x199, ____y122):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x199), ", was ", L_str(____y122))
  else:
    passed = passed + 1
  ____x200 = False
  ____y123 = __a1 < __b1 and (__b1 < __c and __c < __d)
  if not equal63(____x200, ____y123):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x200), ", was ", L_str(____y123))
  else:
    passed = passed + 1
  ____x201 = False
  ____y124 = __a1 == __b1 and (__b1 == __c and __c == __d)
  if not equal63(____x201, ____y124):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x201), ", was ", L_str(____y124))
  else:
    passed = passed + 1
  ____x202 = True
  ____y125 = 1 == __a1 and __a1 == __b1
  if not equal63(____x202, ____y125):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x202), ", was ", L_str(____y125))
  else:
    passed = passed + 1
  ____x203 = False
  ____y126 = __d > __c and (__c > __b1 and __b1 > __a1)
  if not equal63(____x203, ____y126):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x203), ", was ", L_str(____y126))
  else:
    passed = passed + 1
  ____x204 = True
  ____y127 = __d >= __c and (__c >= __b1 and __b1 >= __a1)
  if not equal63(____x204, ____y127):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x204), ", was ", L_str(____y127))
  else:
    passed = passed + 1
    return passed

add(tests, ["infix", __f28])
def __f29():
  global passed
  global failed
  ____x206 = 10
  ____y128 = 10
  if not equal63(____x206, ____y128):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x206), ", was ", L_str(____y128))
  else:
    passed = passed + 1
  __x207 = None
  ____x208 = 9
  __x207 = 10
  ____y129 = 9
  if not equal63(____x208, ____y129):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x208), ", was ", L_str(____y129))
  else:
    passed = passed + 1
  ____x210 = 10
  ____y130 = __x207
  if not equal63(____x210, ____y130):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x210), ", was ", L_str(____y130))
  else:
    passed = passed + 1
  ____x211 = 12
  ____y131 = 12
  if not equal63(____x211, ____y131):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x211), ", was ", L_str(____y131))
  else:
    passed = passed + 1
  __y132 = None
  __y132 = 10;
  __ignore = 42
  ____x212 = 10
  ____y133 = __y132
  if not equal63(____x212, ____y133):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x212), ", was ", L_str(____y133))
  else:
    passed = passed + 1
    return passed

add(tests, ["standalone", __f29])
def __f30():
  global passed
  global failed
  ____x214 = 3
  ____y134 = L_35("foo")
  if not equal63(____x214, ____y134):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x214), ", was ", L_str(____y134))
  else:
    passed = passed + 1
  ____x215 = 3
  ____y135 = L_35("\"a\"")
  if not equal63(____x215, ____y135):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x215), ", was ", L_str(____y135))
  else:
    passed = passed + 1
  ____x216 = "a"
  ____y136 = "a"
  if not equal63(____x216, ____y136):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x216), ", was ", L_str(____y136))
  else:
    passed = passed + 1
  ____x217 = "a"
  ____y137 = char("bar", 1)
  if not equal63(____x217, ____y137):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x217), ", was ", L_str(____y137))
  else:
    passed = passed + 1
  __s = "a\nb"
  ____x218 = 3
  ____y138 = L_35(__s)
  if not equal63(____x218, ____y138):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x218), ", was ", L_str(____y138))
  else:
    passed = passed + 1
  __s1 = "a\nb\nc"
  ____x219 = 5
  ____y139 = L_35(__s1)
  if not equal63(____x219, ____y139):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x219), ", was ", L_str(____y139))
  else:
    passed = passed + 1
  ____x220 = 3
  ____y140 = L_35("a\nb")
  if not equal63(____x220, ____y140):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x220), ", was ", L_str(____y140))
  else:
    passed = passed + 1
  ____x221 = 3
  ____y141 = L_35("a\\b")
  if not equal63(____x221, ____y141):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x221), ", was ", L_str(____y141))
  else:
    passed = passed + 1
  ____x222 = "x3"
  ____y142 = cat("x", 1 + 2)
  if not equal63(____x222, ____y142):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x222), ", was ", L_str(____y142))
  else:
    passed = passed + 1
    return passed

add(tests, ["string", __f30])
def __f31():
  global passed
  global failed
  ____x224 = 7
  ____y143 = 7
  if not equal63(____x224, ____y143):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x224), ", was ", L_str(____y143))
  else:
    passed = passed + 1
  ____x225 = True
  ____y144 = True
  if not equal63(____x225, ____y144):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x225), ", was ", L_str(____y144))
  else:
    passed = passed + 1
  ____x226 = False
  ____y145 = False
  if not equal63(____x226, ____y145):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x226), ", was ", L_str(____y145))
  else:
    passed = passed + 1
  ____x227 = "a"
  ____y146 = "a"
  if not equal63(____x227, ____y146):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x227), ", was ", L_str(____y146))
  else:
    passed = passed + 1
  ____x228 = ["quote", "a"]
  ____y147 = ["quote", "a"]
  if not equal63(____x228, ____y147):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x228), ", was ", L_str(____y147))
  else:
    passed = passed + 1
  ____x231 = "\"a\""
  ____y148 = "\"a\""
  if not equal63(____x231, ____y148):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x231), ", was ", L_str(____y148))
  else:
    passed = passed + 1
  ____x232 = "\"\\n\""
  ____y149 = "\"\\n\""
  if not equal63(____x232, ____y149):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x232), ", was ", L_str(____y149))
  else:
    passed = passed + 1
  ____x233 = "\"\\r\\n\""
  ____y150 = "\"\\r\\n\""
  if not equal63(____x233, ____y150):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x233), ", was ", L_str(____y150))
  else:
    passed = passed + 1
  ____x234 = "\"\\\\\""
  ____y151 = "\"\\\\\""
  if not equal63(____x234, ____y151):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x234), ", was ", L_str(____y151))
  else:
    passed = passed + 1
  ____x235 = ["quote", "\"a\""]
  ____y152 = ["quote", "\"a\""]
  if not equal63(____x235, ____y152):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x235), ", was ", L_str(____y152))
  else:
    passed = passed + 1
  ____x238 = "|(|"
  ____y153 = "|(|"
  if not equal63(____x238, ____y153):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x238), ", was ", L_str(____y153))
  else:
    passed = passed + 1
  ____x239 = "unquote"
  ____y154 = "unquote"
  if not equal63(____x239, ____y154):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x239), ", was ", L_str(____y154))
  else:
    passed = passed + 1
  ____x240 = ["unquote"]
  ____y155 = ["unquote"]
  if not equal63(____x240, ____y155):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x240), ", was ", L_str(____y155))
  else:
    passed = passed + 1
  ____x243 = ["unquote", "a"]
  ____y156 = ["unquote", "a"]
  if not equal63(____x243, ____y156):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x243), ", was ", L_str(____y156))
  else:
    passed = passed + 1
  ____x247 = object([10, 20])
  ____x247["a"] = 33
  ____x247["1a"] = 44
  __x246 = ____x247
  ____x248 = 20
  ____y157 = __x246[1]
  if not equal63(____x248, ____y157):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x248), ", was ", L_str(____y157))
  else:
    passed = passed + 1
  ____x249 = 33
  ____y158 = __x246["a"]
  if not equal63(____x249, ____y158):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x249), ", was ", L_str(____y158))
  else:
    passed = passed + 1
  ____x250 = 44
  ____y159 = __x246["1a"]
  if not equal63(____x250, ____y159):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x250), ", was ", L_str(____y159))
  else:
    passed = passed + 1
    return passed

add(tests, ["quote", __f31])
def __f32():
  global passed
  global failed
  ____x252 = []
  ____y160 = []
  if not equal63(____x252, ____y160):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x252), ", was ", L_str(____y160))
  else:
    passed = passed + 1
  ____x255 = []
  ____y161 = []
  if not equal63(____x255, ____y161):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x255), ", was ", L_str(____y161))
  else:
    passed = passed + 1
  ____x257 = ["a"]
  ____y162 = ["a"]
  if not equal63(____x257, ____y162):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x257), ", was ", L_str(____y162))
  else:
    passed = passed + 1
  ____x260 = ["a"]
  ____y163 = ["a"]
  if not equal63(____x260, ____y163):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x260), ", was ", L_str(____y163))
  else:
    passed = passed + 1
  ____x263 = [[]]
  ____y164 = [[]]
  if not equal63(____x263, ____y164):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x263), ", was ", L_str(____y164))
  else:
    passed = passed + 1
  ____x268 = 0
  ____y165 = L_35([])
  if not equal63(____x268, ____y165):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x268), ", was ", L_str(____y165))
  else:
    passed = passed + 1
  ____x270 = 2
  ____y166 = L_35([1, 2])
  if not equal63(____x270, ____y166):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x270), ", was ", L_str(____y166))
  else:
    passed = passed + 1
  ____x272 = [1, 2, 3]
  ____y167 = [1, 2, 3]
  if not equal63(____x272, ____y167):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x272), ", was ", L_str(____y167))
  else:
    passed = passed + 1
  ____x275 = 17
  ____x276 = object([])
  ____x276["foo"] = 17
  ____y168 = ____x276["foo"]
  if not equal63(____x275, ____y168):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x275), ", was ", L_str(____y168))
  else:
    passed = passed + 1
  ____x277 = 17
  ____x278 = object([1])
  ____x278["foo"] = 17
  ____y169 = ____x278["foo"]
  if not equal63(____x277, ____y169):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x277), ", was ", L_str(____y169))
  else:
    passed = passed + 1
  ____x279 = True
  ____x280 = object([])
  ____x280["foo"] = True
  ____y170 = ____x280["foo"]
  if not equal63(____x279, ____y170):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x279), ", was ", L_str(____y170))
  else:
    passed = passed + 1
  ____x281 = True
  ____x282 = object([])
  ____x282["foo"] = True
  ____y171 = ____x282["foo"]
  if not equal63(____x281, ____y171):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x281), ", was ", L_str(____y171))
  else:
    passed = passed + 1
  ____x283 = True
  ____x285 = object([])
  ____x285["foo"] = True
  ____y172 = hd([____x285])["foo"]
  if not equal63(____x283, ____y172):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x283), ", was ", L_str(____y172))
  else:
    passed = passed + 1
  ____x287 = object([])
  ____x287["a"] = "a"
  ____x286 = ____x287
  ____x288 = object([])
  ____x288["a"] = "a"
  ____y173 = ____x288
  if not equal63(____x286, ____y173):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x286), ", was ", L_str(____y173))
  else:
    passed = passed + 1
  ____x290 = object([])
  ____x290["b"] = False
  ____x289 = ____x290
  ____x291 = object([])
  ____x291["b"] = False
  ____y174 = ____x291
  if not equal63(____x289, ____y174):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x289), ", was ", L_str(____y174))
  else:
    passed = passed + 1
  ____x293 = object([])
  ____x293["c"] = 0
  ____x292 = ____x293
  ____x294 = object([])
  ____x294["c"] = 0
  ____y175 = ____x294
  if not equal63(____x292, ____y175):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x292), ", was ", L_str(____y175))
  else:
    passed = passed + 1
    return passed

add(tests, ["list", __f32])
def __f33():
  global passed
  global failed
  ____x296 = "a"
  ____y176 = "a"
  if not equal63(____x296, ____y176):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x296), ", was ", L_str(____y176))
  else:
    passed = passed + 1
  ____x297 = "a"
  ____y177 = "a"
  if not equal63(____x297, ____y177):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x297), ", was ", L_str(____y177))
  else:
    passed = passed + 1
  ____x298 = []
  ____y178 = join()
  if not equal63(____x298, ____y178):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x298), ", was ", L_str(____y178))
  else:
    passed = passed + 1
  ____x299 = 2
  ____y179 = 2
  if not equal63(____x299, ____y179):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x299), ", was ", L_str(____y179))
  else:
    passed = passed + 1
  ____x300 = None
  ____y180 = None
  if not equal63(____x300, ____y180):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x300), ", was ", L_str(____y180))
  else:
    passed = passed + 1
  __a2 = 42
  ____x301 = 42
  ____y181 = __a2
  if not equal63(____x301, ____y181):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x301), ", was ", L_str(____y181))
  else:
    passed = passed + 1
  ____x302 = 42
  ____y182 = __a2
  if not equal63(____x302, ____y182):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x302), ", was ", L_str(____y182))
  else:
    passed = passed + 1
  ____x303 = ["quasiquote", ["unquote", "a"]]
  ____y183 = ["quasiquote", ["unquote", "a"]]
  if not equal63(____x303, ____y183):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x303), ", was ", L_str(____y183))
  else:
    passed = passed + 1
  ____x308 = ["quasiquote", ["unquote", 42]]
  ____y184 = ["quasiquote", ["unquote", __a2]]
  if not equal63(____x308, ____y184):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x308), ", was ", L_str(____y184))
  else:
    passed = passed + 1
  ____x313 = ["quasiquote", ["quasiquote", ["unquote", ["unquote", "a"]]]]
  ____y185 = ["quasiquote", ["quasiquote", ["unquote", ["unquote", "a"]]]]
  if not equal63(____x313, ____y185):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x313), ", was ", L_str(____y185))
  else:
    passed = passed + 1
  ____x322 = ["quasiquote", ["quasiquote", ["unquote", ["unquote", 42]]]]
  ____y186 = ["quasiquote", ["quasiquote", ["unquote", ["unquote", __a2]]]]
  if not equal63(____x322, ____y186):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x322), ", was ", L_str(____y186))
  else:
    passed = passed + 1
  ____x331 = ["a", ["quasiquote", ["b", ["unquote", "c"]]]]
  ____y187 = ["a", ["quasiquote", ["b", ["unquote", "c"]]]]
  if not equal63(____x331, ____y187):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x331), ", was ", L_str(____y187))
  else:
    passed = passed + 1
  ____x340 = ["a", ["quasiquote", ["b", ["unquote", 42]]]]
  ____y188 = ["a", ["quasiquote", ["b", ["unquote", __a2]]]]
  if not equal63(____x340, ____y188):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x340), ", was ", L_str(____y188))
  else:
    passed = passed + 1
  __b2 = "c"
  ____x349 = ["quote", "c"]
  ____y189 = ["quote", __b2]
  if not equal63(____x349, ____y189):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x349), ", was ", L_str(____y189))
  else:
    passed = passed + 1
  ____x352 = [42]
  ____y190 = [__a2]
  if not equal63(____x352, ____y190):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x352), ", was ", L_str(____y190))
  else:
    passed = passed + 1
  ____x355 = [[42]]
  ____y191 = [[__a2]]
  if not equal63(____x355, ____y191):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x355), ", was ", L_str(____y191))
  else:
    passed = passed + 1
  ____x360 = [41, [42]]
  ____y192 = [41, [__a2]]
  if not equal63(____x360, ____y192):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x360), ", was ", L_str(____y192))
  else:
    passed = passed + 1
  __c1 = [1, 2, 3]
  ____x366 = [[1, 2, 3]]
  ____y193 = [__c1]
  if not equal63(____x366, ____y193):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x366), ", was ", L_str(____y193))
  else:
    passed = passed + 1
  ____x370 = [1, 2, 3]
  ____y194 = __c1
  if not equal63(____x370, ____y194):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x370), ", was ", L_str(____y194))
  else:
    passed = passed + 1
  ____x372 = [0, 1, 2, 3]
  ____y195 = join([0], __c1)
  if not equal63(____x372, ____y195):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x372), ", was ", L_str(____y195))
  else:
    passed = passed + 1
  ____x375 = [0, 1, 2, 3, 4]
  ____y196 = join([0], __c1, [4])
  if not equal63(____x375, ____y196):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x375), ", was ", L_str(____y196))
  else:
    passed = passed + 1
  ____x379 = [0, [1, 2, 3], 4]
  ____y197 = [0, __c1, 4]
  if not equal63(____x379, ____y197):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x379), ", was ", L_str(____y197))
  else:
    passed = passed + 1
  ____x383 = [1, 2, 3, 1, 2, 3]
  ____y198 = join(__c1, __c1)
  if not equal63(____x383, ____y198):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x383), ", was ", L_str(____y198))
  else:
    passed = passed + 1
  ____x385 = [[1, 2, 3], 1, 2, 3]
  ____y199 = join([__c1], __c1)
  if not equal63(____x385, ____y199):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x385), ", was ", L_str(____y199))
  else:
    passed = passed + 1
  __a3 = 42
  ____x389 = ["quasiquote", [["unquote-splicing", ["list", "a"]]]]
  ____y200 = ["quasiquote", [["unquote-splicing", ["list", "a"]]]]
  if not equal63(____x389, ____y200):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x389), ", was ", L_str(____y200))
  else:
    passed = passed + 1
  ____x398 = ["quasiquote", [["unquote-splicing", ["list", 42]]]]
  ____y201 = ["quasiquote", [["unquote-splicing", ["list", __a3]]]]
  if not equal63(____x398, ____y201):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x398), ", was ", L_str(____y201))
  else:
    passed = passed + 1
  ____x407 = True
  ____x408 = object([])
  ____x408["foo"] = True
  ____y202 = ____x408["foo"]
  if not equal63(____x407, ____y202):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x407), ", was ", L_str(____y202))
  else:
    passed = passed + 1
  __a4 = 17
  __b3 = [1, 2]
  __c2 = {"a": 10}
  ____x410 = object([])
  ____x410["a"] = 10
  __d1 = ____x410
  ____x411 = 17
  ____x412 = object([])
  ____x412["foo"] = __a4
  ____y203 = ____x412["foo"]
  if not equal63(____x411, ____y203):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x411), ", was ", L_str(____y203))
  else:
    passed = passed + 1
  ____x413 = 2
  ____x414 = object([])
  ____x414["foo"] = __a4
  ____y204 = L_35(join(____x414, __b3))
  if not equal63(____x413, ____y204):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x413), ", was ", L_str(____y204))
  else:
    passed = passed + 1
  ____x415 = 17
  ____x416 = object([])
  ____x416["foo"] = __a4
  ____y205 = ____x416["foo"]
  if not equal63(____x415, ____y205):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x415), ", was ", L_str(____y205))
  else:
    passed = passed + 1
  ____x418 = object([1])
  ____x418["a"] = 10
  ____x417 = ____x418
  ____y206 = join([1], __c2)
  if not equal63(____x417, ____y206):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x417), ", was ", L_str(____y206))
  else:
    passed = passed + 1
  ____x421 = object([1])
  ____x421["a"] = 10
  ____x420 = ____x421
  ____y207 = join([1], __d1)
  if not equal63(____x420, ____y207):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x420), ", was ", L_str(____y207))
  else:
    passed = passed + 1
  ____x423 = True
  ____x425 = object([])
  ____x425["foo"] = True
  ____y208 = hd([____x425])["foo"]
  if not equal63(____x423, ____y208):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x423), ", was ", L_str(____y208))
  else:
    passed = passed + 1
  ____x426 = True
  ____x428 = object([])
  ____x428["foo"] = True
  ____y209 = hd([____x428])["foo"]
  if not equal63(____x426, ____y209):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x426), ", was ", L_str(____y209))
  else:
    passed = passed + 1
  ____x429 = True
  ____x430 = object([])
  ____x430["foo"] = True
  ____y210 = ____x430["foo"]
  if not equal63(____x429, ____y210):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x429), ", was ", L_str(____y210))
  else:
    passed = passed + 1
  ____x431 = True
  ____x433 = object([])
  ____x433["foo"] = True
  ____y211 = join([1, 2, 3], ____x433)["foo"]
  if not equal63(____x431, ____y211):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x431), ", was ", L_str(____y211))
  else:
    passed = passed + 1
  ____x437 = True
  ____y212 = {"foo": True}["foo"]
  if not equal63(____x437, ____y212):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x437), ", was ", L_str(____y212))
  else:
    passed = passed + 1
  ____x438 = 17
  ____y213 = {"bar": 17}["bar"]
  if not equal63(____x438, ____y213):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x438), ", was ", L_str(____y213))
  else:
    passed = passed + 1
  ____x443 = 17
  def __f34():
    return 17
  ____y214 = {"baz": __f34}["baz"]()
  if not equal63(____x443, ____y214):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x443), ", was ", L_str(____y214))
  else:
    passed = passed + 1
    return passed

add(tests, ["quasiquote", __f33])
def __f35():
  global passed
  global failed
  ____x445 = "a"
  ____y215 = macroexpand("a")
  if not equal63(____x445, ____y215):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x445), ", was ", L_str(____y215))
  else:
    passed = passed + 1
  ____x446 = [17]
  ____y216 = macroexpand([17])
  if not equal63(____x446, ____y216):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x446), ", was ", L_str(____y216))
  else:
    passed = passed + 1
  ____x449 = [1, "z"]
  ____y217 = macroexpand([1, "z"])
  if not equal63(____x449, ____y217):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x449), ", was ", L_str(____y217))
  else:
    passed = passed + 1
  ____x452 = ["%array", 1, "\"z\""]
  ____y218 = macroexpand(["quasiquote", [1, "z"]])
  if not equal63(____x452, ____y218):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x452), ", was ", L_str(____y218))
  else:
    passed = passed + 1
  ____x456 = ["%array", 1, "z"]
  ____y219 = macroexpand(["quasiquote", [["unquote", 1], ["unquote", "z"]]])
  if not equal63(____x456, ____y219):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x456), ", was ", L_str(____y219))
  else:
    passed = passed + 1
  ____x462 = "z"
  ____y220 = macroexpand(["quasiquote", [["unquote-splicing", "z"]]])
  if not equal63(____x462, ____y220):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x462), ", was ", L_str(____y220))
  else:
    passed = passed + 1
  ____x466 = ["join", ["%array", 1], "z"]
  ____y221 = macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "z"]]])
  if not equal63(____x466, ____y221):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x466), ", was ", L_str(____y221))
  else:
    passed = passed + 1
  ____x473 = ["join", ["%array", 1], "x", "y"]
  ____y222 = macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "x"], ["unquote-splicing", "y"]]])
  if not equal63(____x473, ____y222):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x473), ", was ", L_str(____y222))
  else:
    passed = passed + 1
  ____x481 = ["join", ["%array", 1], "z", ["%array", 2]]
  ____y223 = macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "z"], ["unquote", 2]]])
  if not equal63(____x481, ____y223):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x481), ", was ", L_str(____y223))
  else:
    passed = passed + 1
  ____x490 = ["join", ["%array", 1], "z", ["%array", "\"a\""]]
  ____y224 = macroexpand(["quasiquote", [["unquote", 1], ["unquote-splicing", "z"], "a"]])
  if not equal63(____x490, ____y224):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x490), ", was ", L_str(____y224))
  else:
    passed = passed + 1
  ____x498 = "\"x\""
  ____y225 = macroexpand(["quasiquote", "x"])
  if not equal63(____x498, ____y225):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x498), ", was ", L_str(____y225))
  else:
    passed = passed + 1
  ____x500 = ["%array", "\"quasiquote\"", "\"x\""]
  ____y226 = macroexpand(["quasiquote", ["quasiquote", "x"]])
  if not equal63(____x500, ____y226):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x500), ", was ", L_str(____y226))
  else:
    passed = passed + 1
  ____x504 = ["%array", "\"quasiquote\"", ["%array", "\"quasiquote\"", "\"x\""]]
  ____y227 = macroexpand(["quasiquote", ["quasiquote", ["quasiquote", "x"]]])
  if not equal63(____x504, ____y227):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x504), ", was ", L_str(____y227))
  else:
    passed = passed + 1
  ____x510 = "x"
  ____y228 = macroexpand(["quasiquote", ["unquote", "x"]])
  if not equal63(____x510, ____y228):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x510), ", was ", L_str(____y228))
  else:
    passed = passed + 1
  ____x513 = ["%array", "\"quote\"", "x"]
  ____y229 = macroexpand(["quasiquote", ["quote", ["unquote", "x"]]])
  if not equal63(____x513, ____y229):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x513), ", was ", L_str(____y229))
  else:
    passed = passed + 1
  ____x518 = ["%array", "\"quasiquote\"", ["%array", "\"x\""]]
  ____y230 = macroexpand(["quasiquote", ["quasiquote", ["x"]]])
  if not equal63(____x518, ____y230):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x518), ", was ", L_str(____y230))
  else:
    passed = passed + 1
  ____x524 = ["%array", "\"quasiquote\"", ["%array", "\"unquote\"", "\"a\""]]
  ____y231 = macroexpand(["quasiquote", ["quasiquote", ["unquote", "a"]]])
  if not equal63(____x524, ____y231):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x524), ", was ", L_str(____y231))
  else:
    passed = passed + 1
  ____x530 = ["%array", "\"quasiquote\"", ["%array", ["%array", "\"unquote\"", "\"x\""]]]
  ____y232 = macroexpand(["quasiquote", ["quasiquote", [["unquote", "x"]]]])
  if not equal63(____x530, ____y232):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x530), ", was ", L_str(____y232))
  else:
    passed = passed + 1
    return passed

add(tests, ["quasiexpand", __f35])
def __f36():
  global passed
  global failed
  def __f37():
    return 42
  __f1 = __f37
  __l1 = [__f1]
  __t = {"f": __f1}
  __f1()
  def __f38():
    global passed
    global failed
    ____x540 = 42
    ____y233 = __f1()
    if not equal63(____x540, ____y233):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x540), ", was ", L_str(____y233))
    else:
      passed = passed + 1
      return passed
  __f38()
  ____x541 = 42
  ____y234 = __l1[0]()
  if not equal63(____x541, ____y234):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x541), ", was ", L_str(____y234))
  else:
    passed = passed + 1
  ____x542 = 42
  ____y235 = __t["f"]()
  if not equal63(____x542, ____y235):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x542), ", was ", L_str(____y235))
  else:
    passed = passed + 1
  ____x543 = None
  def __f39():
    return
  ____y236 = __f39()
  if not equal63(____x543, ____y236):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x543), ", was ", L_str(____y236))
  else:
    passed = passed + 1
  ____x544 = 10
  def __f40(x=None):
    return x - 2
  ____y237 = __f40(12)
  if not equal63(____x544, ____y237):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x544), ", was ", L_str(____y237))
  else:
    passed = passed + 1
    return passed

add(tests, ["calls", __f36])
def __f41():
  global passed
  global failed
  __a5 = 10
  __b4 = {"x": 20}
  def __f42():
    return 30
  __f2 = __f42
  ____x546 = 10
  ____y238 = __a5
  if not equal63(____x546, ____y238):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x546), ", was ", L_str(____y238))
  else:
    passed = passed + 1
  ____x547 = 10
  ____y239 = __a5
  if not equal63(____x547, ____y239):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x547), ", was ", L_str(____y239))
  else:
    passed = passed + 1
  ____x548 = 20
  ____y240 = __b4["x"]
  if not equal63(____x548, ____y240):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x548), ", was ", L_str(____y240))
  else:
    passed = passed + 1
  ____x549 = 30
  ____y241 = __f2()
  if not equal63(____x549, ____y241):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x549), ", was ", L_str(____y241))
  else:
    passed = passed + 1
    return passed

add(tests, ["id", __f41])
def __f43():
  global passed
  global failed
  __a33 = 0
  __b63 = 1
  __L_37 = 2
  __L_4242 = 3
  __L_break = 4
  ____x551 = 0
  ____y242 = __a33
  if not equal63(____x551, ____y242):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x551), ", was ", L_str(____y242))
  else:
    passed = passed + 1
  ____x552 = 1
  ____y243 = __b63
  if not equal63(____x552, ____y243):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x552), ", was ", L_str(____y243))
  else:
    passed = passed + 1
  ____x553 = 2
  ____y244 = __L_37
  if not equal63(____x553, ____y244):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x553), ", was ", L_str(____y244))
  else:
    passed = passed + 1
  ____x554 = 3
  ____y245 = __L_4242
  if not equal63(____x554, ____y245):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x554), ", was ", L_str(____y245))
  else:
    passed = passed + 1
  ____x555 = 4
  ____y246 = __L_break
  if not equal63(____x555, ____y246):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x555), ", was ", L_str(____y246))
  else:
    passed = passed + 1
    return passed

add(tests, ["names", __f43])
def __f44():
  global passed
  global failed
  ____x557 = 1
  xx = 1
  ____y247 = xx
  if not equal63(____x557, ____y247):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x557), ", was ", L_str(____y247))
  else:
    passed = passed + 1
  ____x558 = 1
  ____y248 = xx
  if not equal63(____x558, ____y248):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x558), ", was ", L_str(____y248))
  else:
    passed = passed + 1
  ____x559 = 2
  yy = 1
  zz = 2
  ____y249 = zz
  if not equal63(____x559, ____y249):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x559), ", was ", L_str(____y249))
  else:
    passed = passed + 1
  ____x560 = 1
  ____y250 = yy
  if not equal63(____x560, ____y250):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x560), ", was ", L_str(____y250))
  else:
    passed = passed + 1
  ____x561 = 2
  ____y251 = zz
  if not equal63(____x561, ____y251):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x561), ", was ", L_str(____y251))
  else:
    passed = passed + 1
  __a6 = 42
  __a6 = "bar"
  ____x562 = "bar"
  ____y252 = __a6
  if not equal63(____x562, ____y252):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x562), ", was ", L_str(____y252))
  else:
    passed = passed + 1
  __a6 = 10
  __x563 = __a6
  ____x564 = 10
  ____y253 = __x563
  if not equal63(____x564, ____y253):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x564), ", was ", L_str(____y253))
  else:
    passed = passed + 1
  ____x565 = 10
  ____y254 = __a6
  if not equal63(____x565, ____y254):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x565), ", was ", L_str(____y254))
  else:
    passed = passed + 1
  __a6 = False
  ____x566 = False
  ____y255 = __a6
  if not equal63(____x566, ____y255):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x566), ", was ", L_str(____y255))
  else:
    passed = passed + 1
  __a6 = None
  ____x567 = None
  ____y256 = __a6
  if not equal63(____x567, ____y256):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x567), ", was ", L_str(____y256))
  else:
    passed = passed + 1
    return passed

add(tests, ["set", __f44])
def __f45():
  global passed
  global failed
  ____x570 = object([])
  ____x570["a"] = True
  ____x570["b"] = True
  ____x570["c"] = True
  __x569 = ____x570
  del __x569["a"]
  ____x571 = None
  ____y257 = has(__x569, "a")
  if not equal63(____x571, ____y257):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x571), ", was ", L_str(____y257))
  else:
    passed = passed + 1
  ____x572 = True
  ____y258 = has(__x569, "b")
  if not equal63(____x572, ____y258):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x572), ", was ", L_str(____y258))
  else:
    passed = passed + 1
  del __x569["c"]
  ____x573 = None
  ____y259 = has(__x569, "c")
  if not equal63(____x573, ____y259):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x573), ", was ", L_str(____y259))
  else:
    passed = passed + 1
  ____x574 = True
  ____y260 = has(__x569, "b")
  if not equal63(____x574, ____y260):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x574), ", was ", L_str(____y260))
  else:
    passed = passed + 1
  del __x569["b"]
  ____x575 = None
  ____y261 = has(__x569, "b")
  if not equal63(____x575, ____y261):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x575), ", was ", L_str(____y261))
  else:
    passed = passed + 1
  ____x576 = []
  ____y262 = __x569
  if not equal63(____x576, ____y262):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x576), ", was ", L_str(____y262))
  else:
    passed = passed + 1
    return passed

add(tests, ["wipe", __f45])
def __f46():
  global passed
  global failed
  __a7 = 17
  __a7 = 10
  ____x578 = 10
  ____y263 = __a7
  if not equal63(____x578, ____y263):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x578), ", was ", L_str(____y263))
  else:
    passed = passed + 1
  ____x579 = 10
  ____y264 = __a7
  if not equal63(____x579, ____y264):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x579), ", was ", L_str(____y264))
  else:
    passed = passed + 1
  __a7 = 2
  __b5 = __a7 + 5
  ____x580 = __a7
  ____y265 = 2
  if not equal63(____x580, ____y265):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x580), ", was ", L_str(____y265))
  else:
    passed = passed + 1
  ____x581 = __b5
  ____y266 = 7
  if not equal63(____x581, ____y266):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x581), ", was ", L_str(____y266))
  else:
    passed = passed + 1
  __a7 = 10
  __a7 = 20
  ____x582 = 20
  ____y267 = __a7
  if not equal63(____x582, ____y267):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x582), ", was ", L_str(____y267))
  else:
    passed = passed + 1
  ____x583 = 20
  __a7 = 10
  __a7 = 20
  ____y268 = __a7
  if not equal63(____x583, ____y268):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x583), ", was ", L_str(____y268))
  else:
    passed = passed + 1
  ____x584 = ["%do"]
  ____y269 = expand(["do"])
  if not equal63(____x584, ____y269):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x584), ", was ", L_str(____y269))
  else:
    passed = passed + 1
    return passed

add(tests, ["do", __f46])
def __f47():
  global passed
  global failed
  ____x588 = "a"
  ____y270 = macroexpand(["if", "a"])
  if not equal63(____x588, ____y270):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x588), ", was ", L_str(____y270))
  else:
    passed = passed + 1
  ____x590 = ["%if", "a", "b"]
  ____y271 = macroexpand(["if", "a", "b"])
  if not equal63(____x590, ____y271):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x590), ", was ", L_str(____y271))
  else:
    passed = passed + 1
  ____x593 = ["%if", "a", "b", "c"]
  ____y272 = macroexpand(["if", "a", "b", "c"])
  if not equal63(____x593, ____y272):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x593), ", was ", L_str(____y272))
  else:
    passed = passed + 1
  ____x596 = ["%if", "a", "b", ["%if", "c", "d"]]
  ____y273 = macroexpand(["if", "a", "b", "c", "d"])
  if not equal63(____x596, ____y273):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x596), ", was ", L_str(____y273))
  else:
    passed = passed + 1
  ____x600 = ["%if", "a", "b", ["%if", "c", "d", "e"]]
  ____y274 = macroexpand(["if", "a", "b", "c", "d", "e"])
  if not equal63(____x600, ____y274):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x600), ", was ", L_str(____y274))
  else:
    passed = passed + 1
  if True:
    ____x604 = True
    ____y275 = True
    if not equal63(____x604, ____y275):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x604), ", was ", L_str(____y275))
    else:
      passed = passed + 1
  else:
    ____x605 = True
    ____y276 = False
    if not equal63(____x605, ____y276):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x605), ", was ", L_str(____y276))
    else:
      passed = passed + 1
  if False:
    ____x606 = True
    ____y277 = False
    if not equal63(____x606, ____y277):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x606), ", was ", L_str(____y277))
    else:
      passed = passed + 1
  else:
    if False:
      ____x607 = False
      ____y278 = True
      if not equal63(____x607, ____y278):
        failed = failed + 1
        return cat("failed: expected ", L_str(____x607), ", was ", L_str(____y278))
      else:
        passed = passed + 1
    else:
      ____x608 = True
      ____y279 = True
      if not equal63(____x608, ____y279):
        failed = failed + 1
        return cat("failed: expected ", L_str(____x608), ", was ", L_str(____y279))
      else:
        passed = passed + 1
  if False:
    ____x609 = True
    ____y280 = False
    if not equal63(____x609, ____y280):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x609), ", was ", L_str(____y280))
    else:
      passed = passed + 1
  else:
    if False:
      ____x610 = False
      ____y281 = True
      if not equal63(____x610, ____y281):
        failed = failed + 1
        return cat("failed: expected ", L_str(____x610), ", was ", L_str(____y281))
      else:
        passed = passed + 1
    else:
      if False:
        ____x611 = False
        ____y282 = True
        if not equal63(____x611, ____y282):
          failed = failed + 1
          return cat("failed: expected ", L_str(____x611), ", was ", L_str(____y282))
        else:
          passed = passed + 1
      else:
        ____x612 = True
        ____y283 = True
        if not equal63(____x612, ____y283):
          failed = failed + 1
          return cat("failed: expected ", L_str(____x612), ", was ", L_str(____y283))
        else:
          passed = passed + 1
  if False:
    ____x613 = True
    ____y284 = False
    if not equal63(____x613, ____y284):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x613), ", was ", L_str(____y284))
    else:
      passed = passed + 1
  else:
    if True:
      ____x614 = True
      ____y285 = True
      if not equal63(____x614, ____y285):
        failed = failed + 1
        return cat("failed: expected ", L_str(____x614), ", was ", L_str(____y285))
      else:
        passed = passed + 1
    else:
      if False:
        ____x615 = False
        ____y286 = True
        if not equal63(____x615, ____y286):
          failed = failed + 1
          return cat("failed: expected ", L_str(____x615), ", was ", L_str(____y286))
        else:
          passed = passed + 1
      else:
        ____x616 = True
        ____y287 = True
        if not equal63(____x616, ____y287):
          failed = failed + 1
          return cat("failed: expected ", L_str(____x616), ", was ", L_str(____y287))
        else:
          passed = passed + 1
  ____x617 = False
  __e9 = None
  if False:
    __e9 = True
  else:
    __e9 = False
  ____y288 = __e9
  if not equal63(____x617, ____y288):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x617), ", was ", L_str(____y288))
  else:
    passed = passed + 1
  ____x618 = 1
  __e10 = None
  if True:
    __e10 = 1
  else:
    __e10 = 2
  ____y289 = __e10
  if not equal63(____x618, ____y289):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x618), ", was ", L_str(____y289))
  else:
    passed = passed + 1
  ____x619 = 1
  __e11 = None
  __a8 = 10
  if __a8:
    __e11 = 1
  else:
    __e11 = 2
  ____y290 = __e11
  if not equal63(____x619, ____y290):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x619), ", was ", L_str(____y290))
  else:
    passed = passed + 1
  ____x620 = 1
  __e12 = None
  if True:
    __a9 = 1
    __e12 = __a9
  else:
    __e12 = 2
  ____y291 = __e12
  if not equal63(____x620, ____y291):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x620), ", was ", L_str(____y291))
  else:
    passed = passed + 1
  ____x621 = 1
  __e13 = None
  if False:
    __e13 = 2
  else:
    __a10 = 1
    __e13 = __a10
  ____y292 = __e13
  if not equal63(____x621, ____y292):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x621), ", was ", L_str(____y292))
  else:
    passed = passed + 1
  ____x622 = 1
  __e14 = None
  if False:
    __e14 = 2
  else:
    __e15 = None
    if True:
      __a11 = 1
      __e15 = __a11
    __e14 = __e15
  ____y293 = __e14
  if not equal63(____x622, ____y293):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x622), ", was ", L_str(____y293))
  else:
    passed = passed + 1
  ____x623 = 1
  __e16 = None
  if False:
    __e16 = 2
  else:
    __e17 = None
    if False:
      __e17 = 3
    else:
      __a12 = 1
      __e17 = __a12
    __e16 = __e17
  ____y294 = __e16
  if not equal63(____x623, ____y294):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x623), ", was ", L_str(____y294))
  else:
    passed = passed + 1
  ____x624 = 0
  __e18 = None
  if False:
    __e18 = 1
  else:
    __e18 = 0
  ____y295 = __e18
  if not equal63(____x624, ____y295):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x624), ", was ", L_str(____y295))
  else:
    passed = passed + 1
    return passed

add(tests, ["if", __f47])
def __f48():
  global passed
  global failed
  __x626 = 10
  ____x627 = 2
  ____x628 = __x626
  __e19 = None
  if 9 == ____x628:
    __e19 = 9
  else:
    __e20 = None
    if 10 == ____x628:
      __e20 = 2
    else:
      __e20 = 4
    __e19 = __e20
  ____y296 = __e19
  if not equal63(____x627, ____y296):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x627), ", was ", L_str(____y296))
  else:
    passed = passed + 1
  ____x629 = 2
  ____x630 = __x626
  __e21 = None
  if 9 == ____x630:
    __e21 = 9
  else:
    __e22 = None
    if 10 == ____x630:
      __e22 = 2
    else:
      __e22 = 4
    __e21 = __e22
  ____y297 = __e21
  if not equal63(____x629, ____y297):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x629), ", was ", L_str(____y297))
  else:
    passed = passed + 1
  ____x631 = 2
  ____x632 = __x626
  __e23 = None
  if 9 == ____x632:
    __e23 = 9
  else:
    __e24 = None
    if 10 == ____x632 or 20 == ____x632:
      __e24 = 2
    else:
      __e24 = 4
    __e23 = __e24
  ____y298 = __e23
  if not equal63(____x631, ____y298):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x631), ", was ", L_str(____y298))
  else:
    passed = passed + 1
  __x633 = "z"
  ____x634 = 9
  ____x635 = __x633
  __e25 = None
  if "z" == ____x635:
    __e25 = 9
  else:
    __e25 = 10
  ____y299 = __e25
  if not equal63(____x634, ____y299):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x634), ", was ", L_str(____y299))
  else:
    passed = passed + 1
  ____x636 = 7
  ____x637 = __x633
  __e26 = None
  if "a" == ____x637:
    __e26 = 1
  else:
    __e27 = None
    if "b" == ____x637:
      __e27 = 2
    else:
      __e27 = 7
    __e26 = __e27
  ____y300 = __e26
  if not equal63(____x636, ____y300):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x636), ", was ", L_str(____y300))
  else:
    passed = passed + 1
  ____x638 = 2
  ____x639 = __x633
  __e28 = None
  if "a" == ____x639:
    __e28 = 1
  else:
    __e29 = None
    if "z" == ____x639:
      __e29 = 2
    else:
      __e29 = 7
    __e28 = __e29
  ____y301 = __e28
  if not equal63(____x638, ____y301):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x638), ", was ", L_str(____y301))
  else:
    passed = passed + 1
  ____x640 = 2
  ____x641 = __x633
  __e30 = None
  if "a" == ____x641:
    __e30 = 1
  else:
    __e31 = None
    if "b" == ____x641 or "z" == ____x641:
      __e31 = 2
    else:
      __e31 = 7
    __e30 = __e31
  ____y302 = __e30
  if not equal63(____x640, ____y302):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x640), ", was ", L_str(____y302))
  else:
    passed = passed + 1
  __n1 = [0]
  def __f49():
    __n1[0] = __n1[0] + 1
    return __n1[0]
  __f3 = __f49
  ____x643 = "b"
  ____x644 = __f3()
  __e32 = None
  if 0 == ____x644:
    __e32 = "a"
  else:
    __e33 = None
    if 1 == ____x644:
      __e33 = "b"
    else:
      __e33 = "c"
    __e32 = __e33
  ____y303 = __e32
  if not equal63(____x643, ____y303):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x643), ", was ", L_str(____y303))
  else:
    passed = passed + 1
  ____x645 = "b"
  def __f50():
    ____x646 = 2
    if 0 == ____x646:
      pass
    else:
      if 1 == ____x646:
        return "a"
      else:
        if 2 == ____x646:
          return "b"
  ____y304 = __f50()
  if not equal63(____x645, ____y304):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x645), ", was ", L_str(____y304))
  else:
    passed = passed + 1
    return passed

add(tests, ["case", __f48])
def __f51():
  global passed
  global failed
  __i1 = 0
  while __i1 < 5:
    if __i1 == 3:
      break
    else:
      __i1 = __i1 + 1
  ____x648 = 3
  ____y305 = __i1
  if not equal63(____x648, ____y305):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x648), ", was ", L_str(____y305))
  else:
    passed = passed + 1
  while __i1 < 10:
    __i1 = __i1 + 1
  ____x649 = 10
  ____y306 = __i1
  if not equal63(____x649, ____y306):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x649), ", was ", L_str(____y306))
  else:
    passed = passed + 1
  while __i1 < 15:
    __i1 = __i1 + 1
  __a13 = None
  ____x650 = None
  ____y307 = __a13
  if not equal63(____x650, ____y307):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x650), ", was ", L_str(____y307))
  else:
    passed = passed + 1
  ____x651 = 15
  ____y308 = __i1
  if not equal63(____x651, ____y308):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x651), ", was ", L_str(____y308))
  else:
    passed = passed + 1
  while __i1 < 20:
    if __i1 == 19:
      break
    else:
      __i1 = __i1 + 1
  __b6 = None
  ____x652 = None
  ____y309 = __b6
  if not equal63(____x652, ____y309):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x652), ", was ", L_str(____y309))
  else:
    passed = passed + 1
  ____x653 = 19
  ____y310 = __i1
  if not equal63(____x653, ____y310):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x653), ", was ", L_str(____y310))
  else:
    passed = passed + 1
    return passed

add(tests, ["while", __f51])
def __f52():
  global passed
  global failed
  __l2 = []
  __i2 = 0
  while __i2 < 5:
    add(__l2, __i2)
    __i2 = __i2 + 1
  ____x655 = [0, 1, 2, 3, 4]
  ____y311 = __l2
  if not equal63(____x655, ____y311):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x655), ", was ", L_str(____y311))
  else:
    passed = passed + 1
  ____x657 = [0, 1]
  __l3 = []
  __i3 = 0
  while __i3 < 2:
    add(__l3, __i3)
    __i3 = __i3 + 1
  ____y312 = __l3
  if not equal63(____x657, ____y312):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x657), ", was ", L_str(____y312))
  else:
    passed = passed + 1
  __n2 = 0
  __l4 = ["a", "b", "c", "d", "e"]
  __i4 = 0
  while __i4 < L_35(__l4):
    __n2 = __n2 + __i4
    __l4 = ["a", "b", "c"]
    __i4 = __i4 + 1
  ____x661 = 3
  ____y313 = __n2
  if not equal63(____x661, ____y313):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x661), ", was ", L_str(____y313))
  else:
    passed = passed + 1
    return passed

add(tests, ["for", __f52])
def __f53():
  global passed
  global failed
  ____x663 = 10
  ____y314 = {"a": 10}["a"]
  if not equal63(____x663, ____y314):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x663), ", was ", L_str(____y314))
  else:
    passed = passed + 1
  ____x664 = True
  ____y315 = {"a": True}["a"]
  if not equal63(____x664, ____y315):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x664), ", was ", L_str(____y315))
  else:
    passed = passed + 1
    return passed

add(tests, ["table", __f53])
def __f54():
  global passed
  global failed
  ____x666 = True
  ____y316 = empty63([])
  if not equal63(____x666, ____y316):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x666), ", was ", L_str(____y316))
  else:
    passed = passed + 1
  ____x667 = True
  ____y317 = empty63({})
  if not equal63(____x667, ____y317):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x667), ", was ", L_str(____y317))
  else:
    passed = passed + 1
  ____x668 = False
  ____y318 = empty63([1])
  if not equal63(____x668, ____y318):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x668), ", was ", L_str(____y318))
  else:
    passed = passed + 1
  ____x670 = False
  ____x671 = object([])
  ____x671["a"] = "a"
  ____y319 = empty63(____x671)
  if not equal63(____x670, ____y319):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x670), ", was ", L_str(____y319))
  else:
    passed = passed + 1
  ____x672 = False
  ____y320 = empty63({"a": True})
  if not equal63(____x672, ____y320):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x672), ", was ", L_str(____y320))
  else:
    passed = passed + 1
  ____x673 = False
  ____x674 = object([])
  ____x674["b"] = False
  ____y321 = empty63(____x674)
  if not equal63(____x673, ____y321):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x673), ", was ", L_str(____y321))
  else:
    passed = passed + 1
    return passed

add(tests, ["empty", __f54])
def __f55():
  global passed
  global failed
  __l5 = ["a", "b", "c", "d"]
  ____x677 = "a"
  ____y322 = __l5[0]
  if not equal63(____x677, ____y322):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x677), ", was ", L_str(____y322))
  else:
    passed = passed + 1
  ____x678 = "b"
  ____y323 = __l5[1]
  if not equal63(____x678, ____y323):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x678), ", was ", L_str(____y323))
  else:
    passed = passed + 1
  __l5[0] = 9
  ____x679 = 9
  ____y324 = __l5[0]
  if not equal63(____x679, ____y324):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x679), ", was ", L_str(____y324))
  else:
    passed = passed + 1
  __l5[3] = 10
  ____x680 = 10
  ____y325 = __l5[3]
  if not equal63(____x680, ____y325):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x680), ", was ", L_str(____y325))
  else:
    passed = passed + 1
    return passed

add(tests, ["at", __f55])
def __f56():
  global passed
  global failed
  __t1 = {}
  __t1["foo"] = "bar"
  ____x682 = "bar"
  ____y326 = __t1["foo"]
  if not equal63(____x682, ____y326):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x682), ", was ", L_str(____y326))
  else:
    passed = passed + 1
  ____x683 = "bar"
  ____y327 = __t1["foo"]
  if not equal63(____x683, ____y327):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x683), ", was ", L_str(____y327))
  else:
    passed = passed + 1
  __k = "foo"
  ____x684 = "bar"
  ____y328 = __t1[__k]
  if not equal63(____x684, ____y328):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x684), ", was ", L_str(____y328))
  else:
    passed = passed + 1
  ____x685 = "bar"
  ____y329 = __t1[cat("f", "oo")]
  if not equal63(____x685, ____y329):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x685), ", was ", L_str(____y329))
  else:
    passed = passed + 1
  __t11 = {}
  __t2 = {}
  (None or (__t11 or __t2))["foo"] = "bar"
  ____x686 = "bar"
  ____y330 = __t2["foo"]
  if not equal63(____x686, ____y330):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x686), ", was ", L_str(____y330))
  else:
    passed = passed + 1
  ____x687 = None
  ____y331 = has(__t11, "foo")
  if not equal63(____x687, ____y331):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x687), ", was ", L_str(____y331))
  else:
    passed = passed + 1
    return passed

add(tests, ["get-set", __f56])
def __f57():
  global passed
  global failed
  ____x689 = object([1, 2, 3])
  ____x689["a"] = True
  ____x689["b"] = False
  __t21 = ____x689
  __a14 = 0
  __b7 = 0
  ____o = __t21
  __k1 = None
  for __k1 in indices(____o):
    __v = ____o[__k1]
    if number63(__k1):
      __a14 = __a14 + 1
    else:
      __b7 = __b7 + 1
  ____x690 = 3
  ____y332 = __a14
  if not equal63(____x690, ____y332):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x690), ", was ", L_str(____y332))
  else:
    passed = passed + 1
  ____x691 = 2
  ____y333 = __b7
  if not equal63(____x691, ____y333):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x691), ", was ", L_str(____y333))
  else:
    passed = passed + 1
  __a15 = 0
  ____o1 = __t21
  ____i6 = None
  for ____i6 in indices(____o1):
    __x692 = ____o1[____i6]
    __a15 = __a15 + 1
  ____x693 = 5
  ____y334 = __a15
  if not equal63(____x693, ____y334):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x693), ", was ", L_str(____y334))
  else:
    passed = passed + 1
  ____x694 = object([[1], [2]])
  ____x694["b"] = [3]
  __t3 = ____x694
  ____o2 = __t3
  ____i7 = None
  for ____i7 in indices(____o2):
    __x698 = ____o2[____i7]
    ____x699 = False
    ____y335 = atom63(__x698)
    if not equal63(____x699, ____y335):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x699), ", was ", L_str(____y335))
    else:
      passed = passed + 1
  ____o3 = __t3
  ____i8 = None
  for ____i8 in indices(____o3):
    __x700 = ____o3[____i8]
    ____x701 = False
    ____y336 = atom63(__x700)
    if not equal63(____x701, ____y336):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x701), ", was ", L_str(____y336))
    else:
      passed = passed + 1
  ____o4 = __t3
  ____i9 = None
  for ____i9 in indices(____o4):
    ____id5 = ____o4[____i9]
    __x702 = has(____id5, 0)
    ____x703 = True
    ____y337 = number63(__x702)
    if not equal63(____x703, ____y337):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x703), ", was ", L_str(____y337))
    else:
      passed = passed + 1

add(tests, ["each", __f57])
def __f58():
  global passed
  global failed
  __n8 = 0
  ____x705 = [1, 2, 3]
  ____i10 = 0
  while ____i10 < L_35(____x705):
    __x707 = ____x705[____i10]
    __n8 = __n8 + __x707
    ____i10 = ____i10 + 1
  ____x708 = 6
  ____y338 = __n8
  if not equal63(____x708, ____y338):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x708), ", was ", L_str(____y338))
  else:
    passed = passed + 1
  __n9 = 0
  ____x709 = [[1, 2], [3, 4]]
  ____i11 = 0
  while ____i11 < L_35(____x709):
    ____id6 = ____x709[____i11]
    __x713 = has(____id6, 0)
    __y339 = has(____id6, 1)
    __n9 = __n9 + (__x713 + __y339)
    ____i11 = ____i11 + 1
  ____x714 = 10
  ____y340 = __n9
  if not equal63(____x714, ____y340):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x714), ", was ", L_str(____y340))
  else:
    passed = passed + 1
  __xs = []
  __l6 = [{
    "a": 1,
    "b": 2
  }, {
    "a": 2,
    "b": 4
  }]
  ____x716 = __l6
  ____i12 = 0
  while ____i12 < L_35(____x716):
    ____id7 = ____x716[____i12]
    __a16 = has(____id7, "a")
    __b8 = has(____id7, "b")
    add(__xs, __a16 + __b8)
    ____i12 = ____i12 + 1
  ____x717 = [3, 6]
  ____y341 = __xs
  if not equal63(____x717, ____y341):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x717), ", was ", L_str(____y341))
  else:
    passed = passed + 1
  __l7 = ["a", "b"]
  ____x720 = __l7
  ____i13 = 0
  while ____i13 < L_35(____x720):
    __x721 = ____x720[____i13]
    if __x721 == "a":
      add(__l7, "c")
    else:
      if __x721 == "c":
        add(__l7, "d")
    ____i13 = ____i13 + 1
  ____x722 = ["a", "b", "c", "d"]
  ____y342 = __l7
  if not equal63(____x722, ____y342):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x722), ", was ", L_str(____y342))
  else:
    passed = passed + 1
    return passed

add(tests, ["step", __f58])
def __f59():
  global passed
  global failed
  __x725 = 2
  __x725 = __x725 + 1
  ____x726 = 3
  ____y343 = __x725
  if not equal63(____x726, ____y343):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x726), ", was ", L_str(____y343))
  else:
    passed = passed + 1
  __x727 = 2
  ____x728 = 3
  __x727 = __x727 + 1
  ____y344 = __x727
  if not equal63(____x728, ____y344):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x728), ", was ", L_str(____y344))
  else:
    passed = passed + 1
  __x729 = 2
  ____x730 = 4
  __x729 = __x729 + 2
  ____y345 = __x729
  if not equal63(____x730, ____y345):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x730), ", was ", L_str(____y345))
  else:
    passed = passed + 1
  __x731 = 2
  ____x732 = 2
  __x731 = __x731 + 0
  ____y346 = __x731
  if not equal63(____x732, ____y346):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x732), ", was ", L_str(____y346))
  else:
    passed = passed + 1
    return passed

add(tests, ["inc", __f59])
def __f60():
  global passed
  global failed
  __x734 = 2
  __x734 = __x734 - 1
  ____x735 = 1
  ____y347 = __x734
  if not equal63(____x735, ____y347):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x735), ", was ", L_str(____y347))
  else:
    passed = passed + 1
  __x736 = 2
  ____x737 = 1
  __x736 = __x736 - 1
  ____y348 = __x736
  if not equal63(____x737, ____y348):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x737), ", was ", L_str(____y348))
  else:
    passed = passed + 1
  __x738 = 4
  ____x739 = 2
  __x738 = __x738 - 2
  ____y349 = __x738
  if not equal63(____x739, ____y349):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x739), ", was ", L_str(____y349))
  else:
    passed = passed + 1
  __x740 = 2
  ____x741 = 2
  __x740 = __x740 - 0
  ____y350 = __x740
  if not equal63(____x741, ____y350):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x741), ", was ", L_str(____y350))
  else:
    passed = passed + 1
    return passed

add(tests, ["dec", __f60])
def __f61():
  global passed
  global failed
  def __f62(n=None):
    return n + 10
  __f4 = __f62
  ____x743 = 20
  ____y351 = __f4(10)
  if not equal63(____x743, ____y351):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x743), ", was ", L_str(____y351))
  else:
    passed = passed + 1
  ____x744 = 30
  ____y352 = __f4(20)
  if not equal63(____x744, ____y352):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x744), ", was ", L_str(____y352))
  else:
    passed = passed + 1
  ____x745 = 40
  def __f63(n=None):
    return n + 10
  ____y353 = __f63(30)
  if not equal63(____x745, ____y353):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x745), ", was ", L_str(____y353))
  else:
    passed = passed + 1
  ____x746 = [2, 3, 4]
  def __f64(x=None):
    return x + 1
  ____y354 = map(__f64, [1, 2, 3])
  if not equal63(____x746, ____y354):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x746), ", was ", L_str(____y354))
  else:
    passed = passed + 1
    return passed

add(tests, ["fn", __f61])
def __f65():
  global passed
  global failed
  x = 20
  def f():
    return 42
  ____x750 = 20
  ____y355 = x
  if not equal63(____x750, ____y355):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x750), ", was ", L_str(____y355))
  else:
    passed = passed + 1
  ____x751 = 42
  ____y356 = f()
  if not equal63(____x751, ____y356):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x751), ", was ", L_str(____y356))
  else:
    passed = passed + 1
  def __f66():
    global passed
    global failed
    def f():
      return 38
    ____x752 = 38
    ____y357 = f()
    if not equal63(____x752, ____y357):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x752), ", was ", L_str(____y357))
    else:
      passed = passed + 1
      return passed
  __f66()
  ____x753 = 42
  ____y358 = f()
  if not equal63(____x753, ____y358):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x753), ", was ", L_str(____y358))
  else:
    passed = passed + 1
    return passed

add(tests, ["define", __f65])
def __f67():
  global passed
  global failed
  def __f68():
    return 17
  __a17 = __f68()
  ____x755 = 17
  ____y359 = __a17
  if not equal63(____x755, ____y359):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x755), ", was ", L_str(____y359))
  else:
    passed = passed + 1
  def __f69():
    if True:
      return 10
    else:
      return 20
  __a18 = __f69()
  ____x756 = 10
  ____y360 = __a18
  if not equal63(____x756, ____y360):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x756), ", was ", L_str(____y360))
  else:
    passed = passed + 1
  def __f70():
    while False:
      blah()
  __a19 = __f70()
  ____x757 = None
  ____y361 = __a19
  if not equal63(____x757, ____y361):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x757), ", was ", L_str(____y361))
  else:
    passed = passed + 1
  __a20 = [11]
  def __f71():
    __a20[0] = __a20[0] + 1
    return __a20[0]
  __b9 = __f71()
  ____x759 = 12
  ____y362 = __b9
  if not equal63(____x759, ____y362):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x759), ", was ", L_str(____y362))
  else:
    passed = passed + 1
  ____x760 = [12]
  ____y363 = __a20
  if not equal63(____x760, ____y363):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x760), ", was ", L_str(____y363))
  else:
    passed = passed + 1
  ____x762 = 1
  def __f72():
    __e34 = None
    if True:
      return 1
    else:
      __e34 = 2
    return __e34
  ____y364 = __f72()
  if not equal63(____x762, ____y364):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x762), ", was ", L_str(____y364))
  else:
    passed = passed + 1
    return passed

add(tests, ["return", __f67])
def __f73():
  global passed
  global failed
  ____x782 = [False, ""]
  def __f74():
    try:
      raise Exception()
      return [True]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id8 = __f74()
  ____ok3 = has(____id8, 0)
  ____v3 = has(____id8, 1)
  __e35 = None
  if ____ok3:
    __e35 = ____v3
  else:
    __e35 = str(____v3)
  ____y365 = [____ok3, __e35]
  if not equal63(____x782, ____y365):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x782), ", was ", L_str(____y365))
  else:
    passed = passed + 1
  ____x787 = [False, "None"]
  def __f75():
    try:
      raise Exception(None)
      return [True]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id9 = __f75()
  ____ok4 = has(____id9, 0)
  ____v4 = has(____id9, 1)
  __e36 = None
  if ____ok4:
    __e36 = ____v4
  else:
    __e36 = str(____v4)
  ____y366 = [____ok4, __e36]
  if not equal63(____x787, ____y366):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x787), ", was ", L_str(____y366))
  else:
    passed = passed + 1
  ____x792 = [False, "False"]
  def __f76():
    try:
      raise Exception(False)
      return [True]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id10 = __f76()
  ____ok5 = has(____id10, 0)
  ____v5 = has(____id10, 1)
  __e37 = None
  if ____ok5:
    __e37 = ____v5
  else:
    __e37 = str(____v5)
  ____y367 = [____ok5, __e37]
  if not equal63(____x792, ____y367):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x792), ", was ", L_str(____y367))
  else:
    passed = passed + 1
  ____x797 = [False, "True"]
  def __f77():
    try:
      raise Exception(True)
      return [True]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id11 = __f77()
  ____ok6 = has(____id11, 0)
  ____v6 = has(____id11, 1)
  __e38 = None
  if ____ok6:
    __e38 = ____v6
  else:
    __e38 = str(____v6)
  ____y368 = [____ok6, __e38]
  if not equal63(____x797, ____y368):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x797), ", was ", L_str(____y368))
  else:
    passed = passed + 1
  ____x802 = [False, "42"]
  def __f78():
    try:
      raise Exception(42)
      return [True]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id12 = __f78()
  ____ok7 = has(____id12, 0)
  ____v7 = has(____id12, 1)
  __e39 = None
  if ____ok7:
    __e39 = ____v7
  else:
    __e39 = str(____v7)
  ____y369 = [____ok7, __e39]
  if not equal63(____x802, ____y369):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x802), ", was ", L_str(____y369))
  else:
    passed = passed + 1
  ____x807 = [True, 42]
  def __f79():
    try:
      return [True, 42]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id13 = __f79()
  ____ok8 = has(____id13, 0)
  ____v8 = has(____id13, 1)
  __e40 = None
  if ____ok8:
    __e40 = ____v8
  else:
    __e40 = str(____v8)
  ____y370 = [____ok8, __e40]
  if not equal63(____x807, ____y370):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x807), ", was ", L_str(____y370))
  else:
    passed = passed + 1
  ____x812 = [False, "foo"]
  def __f80():
    try:
      raise Exception("foo")
      return [True]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id14 = __f80()
  ____ok9 = has(____id14, 0)
  ____v9 = has(____id14, 1)
  __e41 = None
  if ____ok9:
    __e41 = ____v9
  else:
    __e41 = str(____v9)
  ____y371 = [____ok9, __e41]
  if not equal63(____x812, ____y371):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x812), ", was ", L_str(____y371))
  else:
    passed = passed + 1
  ____x817 = [False, "foo"]
  def __f81():
    try:
      raise Exception("foo")
      raise Exception("baz")
      return [True]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id15 = __f81()
  ____ok10 = has(____id15, 0)
  ____v10 = has(____id15, 1)
  __e42 = None
  if ____ok10:
    __e42 = ____v10
  else:
    __e42 = str(____v10)
  ____y372 = [____ok10, __e42]
  if not equal63(____x817, ____y372):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x817), ", was ", L_str(____y372))
  else:
    passed = passed + 1
  ____x822 = [False, "baz"]
  def __f82():
    try:
      def __f83():
        try:
          raise Exception("foo")
          return [True]
        except:
          import sys
          e = sys.exc_info()
          return [False, e[1], e]
      ____id17 = __f83()
      ____ok12 = has(____id17, 0)
      ____v12 = has(____id17, 1)
      __e43 = None
      if ____ok12:
        __e43 = ____v12
      else:
        __e43 = str(____v12)
      raise Exception("baz")
      return [True]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id16 = __f82()
  ____ok11 = has(____id16, 0)
  ____v11 = has(____id16, 1)
  __e44 = None
  if ____ok11:
    __e44 = ____v11
  else:
    __e44 = str(____v11)
  ____y373 = [____ok11, __e44]
  if not equal63(____x822, ____y373):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x822), ", was ", L_str(____y373))
  else:
    passed = passed + 1
  ____x830 = [True, 42]
  def __f84():
    try:
      __e45 = None
      if True:
        __e45 = 42
      else:
        raise Exception("baz")
        __e45 = None
      return [True, __e45]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id18 = __f84()
  ____ok13 = has(____id18, 0)
  ____v13 = has(____id18, 1)
  __e46 = None
  if ____ok13:
    __e46 = ____v13
  else:
    __e46 = str(____v13)
  ____y374 = [____ok13, __e46]
  if not equal63(____x830, ____y374):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x830), ", was ", L_str(____y374))
  else:
    passed = passed + 1
  ____x835 = [False, "baz"]
  def __f85():
    try:
      __e47 = None
      if False:
        __e47 = 42
      else:
        raise Exception("baz")
        __e47 = None
      return [True, __e47]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id19 = __f85()
  ____ok14 = has(____id19, 0)
  ____v14 = has(____id19, 1)
  __e48 = None
  if ____ok14:
    __e48 = ____v14
  else:
    __e48 = str(____v14)
  ____y375 = [____ok14, __e48]
  if not equal63(____x835, ____y375):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x835), ", was ", L_str(____y375))
  else:
    passed = passed + 1
  ____x840 = False
  def __f86():
    try:
      return [True, expand([["fn", [], ["guard", ["return", 42]]]])]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____y376 = hd(__f86())
  if not equal63(____x840, ____y376):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x840), ", was ", L_str(____y376))
  else:
    passed = passed + 1
    return passed

add(tests, ["guard", __f73])
def __f87():
  global passed
  global failed
  __a21 = 10
  ____x849 = 10
  ____y377 = __a21
  if not equal63(____x849, ____y377):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x849), ", was ", L_str(____y377))
  else:
    passed = passed + 1
  __a22 = 10
  ____x850 = 10
  ____y378 = __a22
  if not equal63(____x850, ____y378):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x850), ", was ", L_str(____y378))
  else:
    passed = passed + 1
  __a23 = 11
  __b10 = 12
  ____x851 = 11
  ____y379 = __a23
  if not equal63(____x851, ____y379):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x851), ", was ", L_str(____y379))
  else:
    passed = passed + 1
  ____x852 = 12
  ____y380 = __b10
  if not equal63(____x852, ____y380):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x852), ", was ", L_str(____y380))
  else:
    passed = passed + 1
  __a24 = 1
  ____x853 = 1
  ____y381 = __a24
  if not equal63(____x853, ____y381):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x853), ", was ", L_str(____y381))
  else:
    passed = passed + 1
  __a25 = 2
  ____x854 = 2
  ____y382 = __a25
  if not equal63(____x854, ____y382):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x854), ", was ", L_str(____y382))
  else:
    passed = passed + 1
  ____x855 = 1
  ____y383 = __a24
  if not equal63(____x855, ____y383):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x855), ", was ", L_str(____y383))
  else:
    passed = passed + 1
  __a26 = 1
  __a27 = 2
  __a28 = 3
  ____x856 = __a28
  ____y384 = 3
  if not equal63(____x856, ____y384):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x856), ", was ", L_str(____y384))
  else:
    passed = passed + 1
  ____x857 = __a27
  ____y385 = 2
  if not equal63(____x857, ____y385):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x857), ", was ", L_str(____y385))
  else:
    passed = passed + 1
  ____x858 = __a26
  ____y386 = 1
  if not equal63(____x858, ____y386):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x858), ", was ", L_str(____y386))
  else:
    passed = passed + 1
  __a29 = 20
  ____x859 = 20
  ____y387 = __a29
  if not equal63(____x859, ____y387):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x859), ", was ", L_str(____y387))
  else:
    passed = passed + 1
  __a30 = __a29 + 7
  ____x860 = 27
  ____y388 = __a30
  if not equal63(____x860, ____y388):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x860), ", was ", L_str(____y388))
  else:
    passed = passed + 1
  __a31 = __a29 + 10
  ____x861 = 30
  ____y389 = __a31
  if not equal63(____x861, ____y389):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x861), ", was ", L_str(____y389))
  else:
    passed = passed + 1
  ____x862 = 20
  ____y390 = __a29
  if not equal63(____x862, ____y390):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x862), ", was ", L_str(____y390))
  else:
    passed = passed + 1
  ____x863 = 10
  __a32 = 10
  ____y391 = __a32
  if not equal63(____x863, ____y391):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x863), ", was ", L_str(____y391))
  else:
    passed = passed + 1
  __b11 = 12
  __a331 = __b11
  ____x864 = 12
  ____y392 = __a331
  if not equal63(____x864, ____y392):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x864), ", was ", L_str(____y392))
  else:
    passed = passed + 1
  __a35 = 10
  __a34 = __a35
  ____x865 = 10
  ____y393 = __a34
  if not equal63(____x865, ____y393):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x865), ", was ", L_str(____y393))
  else:
    passed = passed + 1
  __a37 = 0
  __a37 = 10
  __a36 = __a37 + 2 + 3
  ____x866 = __a36
  ____y394 = 15
  if not equal63(____x866, ____y394):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x866), ", was ", L_str(____y394))
  else:
    passed = passed + 1
  def __f88(zz=None):
    global passed
    global failed
    ____x867 = 20
    ____y395 = zz
    if not equal63(____x867, ____y395):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x867), ", was ", L_str(____y395))
    else:
      passed = passed + 1
    __zz = 21
    ____x868 = 21
    ____y396 = __zz
    if not equal63(____x868, ____y396):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x868), ", was ", L_str(____y396))
    else:
      passed = passed + 1
    ____x869 = 20
    ____y397 = zz
    if not equal63(____x869, ____y397):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x869), ", was ", L_str(____y397))
    else:
      passed = passed + 1
      return passed
  __f88(20)
  __q = 9
  def __f89():
    global passed
    global failed
    __q1 = 10
    ____x870 = 10
    ____y398 = __q1
    if not equal63(____x870, ____y398):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x870), ", was ", L_str(____y398))
    else:
      passed = passed + 1
    ____x871 = 9
    ____y399 = __q
    if not equal63(____x871, ____y399):
      failed = failed + 1
      return cat("failed: expected ", L_str(____x871), ", was ", L_str(____y399))
    else:
      passed = passed + 1
      return passed
  __f89()
  ____x872 = 0
  def __f90(x=None):
    return x
  __abs = __f90
  ____y400 = abs(-1) + __abs(-1)
  if not equal63(____x872, ____y400):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x872), ", was ", L_str(____y400))
  else:
    passed = passed + 1
  ____x873 = [1, 2]
  def __f91(x=None):
    return x, 2
  ____id20 = __f91(1)
  __a38 = has(____id20, 0)
  __b12 = has(____id20, 1)
  ____y401 = [__a38, __b12]
  if not equal63(____x873, ____y401):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x873), ", was ", L_str(____y401))
  else:
    passed = passed + 1
    return passed

add(tests, ["let", __f87])
def __f92():
  global passed
  global failed
  ____x877 = 10
  __x878 = 9
  __x878 = __x878 + 1
  ____y402 = __x878
  if not equal63(____x877, ____y402):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x877), ", was ", L_str(____y402))
  else:
    passed = passed + 1
    return passed

add(tests, ["with", __f92])
def __f93():
  global passed
  global failed
  ____x880 = None
  ____y404 = "a" == "b"
  __e49 = None
  if yes(____y404):
    __frips = ____y404
    __e49 = 19
  ____y403 = __e49
  if not equal63(____x880, ____y403):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x880), ", was ", L_str(____y403))
  else:
    passed = passed + 1
  ____x881 = 19
  ____y406 = 20
  __e50 = None
  if yes(____y406):
    __frips1 = ____y406
    __e50 = __frips1 - 1
  ____y405 = __e50
  if not equal63(____x881, ____y405):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x881), ", was ", L_str(____y405))
  else:
    passed = passed + 1
  ____x882 = 20
  ____y408 = [19, 20]
  __e51 = None
  if yes(____y408):
    ____id21 = ____y408
    __a39 = has(____id21, 0)
    __b13 = has(____id21, 1)
    __e51 = __b13
  ____y407 = __e51
  if not equal63(____x882, ____y407):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x882), ", was ", L_str(____y407))
  else:
    passed = passed + 1
  ____x884 = None
  ____y410 = None
  __e52 = None
  if yes(____y410):
    ____id22 = ____y410
    __a40 = has(____id22, 0)
    __b14 = has(____id22, 1)
    __e52 = __b14
  ____y409 = __e52
  if not equal63(____x884, ____y409):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x884), ", was ", L_str(____y409))
  else:
    passed = passed + 1
  ____x885 = 123
  ____y412 = 0
  __e53 = None
  if yes(____y412):
    __a41 = ____y412
    __e53 = __a41 + 123
  ____y411 = __e53
  if not equal63(____x885, ____y411):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x885), ", was ", L_str(____y411))
  else:
    passed = passed + 1
    return passed

add(tests, ["let-when", __f93])
zzop = 99
zzap = 100
__zzop = 10
__zzap = __zzop + 10
____x886 = object([1, 2, 3])
____x886["a"] = 10
____x886["b"] = 20
____id23 = ____x886
__zza = has(____id23, 0)
__zzb = has(____id23, 1)
def __f94():
  global passed
  global failed
  ____x888 = 10
  ____y413 = __zzop
  if not equal63(____x888, ____y413):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x888), ", was ", L_str(____y413))
  else:
    passed = passed + 1
  ____x889 = 20
  ____y414 = __zzap
  if not equal63(____x889, ____y414):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x889), ", was ", L_str(____y414))
  else:
    passed = passed + 1
  ____x890 = 1
  ____y415 = __zza
  if not equal63(____x890, ____y415):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x890), ", was ", L_str(____y415))
  else:
    passed = passed + 1
  ____x891 = 2
  ____y416 = __zzb
  if not equal63(____x891, ____y416):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x891), ", was ", L_str(____y416))
  else:
    passed = passed + 1
    return passed

add(tests, ["let-toplevel1", __f94])
def __f95():
  global passed
  global failed
  ____x893 = 99
  ____y417 = zzop
  if not equal63(____x893, ____y417):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x893), ", was ", L_str(____y417))
  else:
    passed = passed + 1
  ____x894 = 100
  ____y418 = zzap
  if not equal63(____x894, ____y418):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x894), ", was ", L_str(____y418))
  else:
    passed = passed + 1
    return passed

add(tests, ["let-toplevel", __f95])
def __f96():
  global passed
  global failed
  __end = "zz"
  __L_try = "yy"
  __L_return = 99
  ____x896 = "zz"
  ____y419 = __end
  if not equal63(____x896, ____y419):
    failed = failed + 1
    __L_return(cat("failed: expected ", L_str(____x896), ", was ", L_str(____y419)))
  else:
    passed = passed + 1
  ____x897 = "yy"
  ____y420 = __L_try
  if not equal63(____x897, ____y420):
    failed = failed + 1
    __L_return(cat("failed: expected ", L_str(____x897), ", was ", L_str(____y420)))
  else:
    passed = passed + 1
  ____x898 = 99
  ____y421 = __L_return
  if not equal63(____x898, ____y421):
    failed = failed + 1
    __L_return(cat("failed: expected ", L_str(____x898), ", was ", L_str(____y421)))
  else:
    passed = passed + 1
  def var(L_if=None, end=None, L_return=None):
    return L_if + end + L_return
  ____x899 = 6
  ____y422 = var(1, 2, 3)
  if not equal63(____x899, ____y422):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x899), ", was ", L_str(____y422))
  else:
    passed = passed + 1
  def L_143(x=None):
    return x + 1
  ____x900 = 6
  ____y423 = L_143(5)
  if not equal63(____x900, ____y423):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x900), ", was ", L_str(____y423))
  else:
    passed = passed + 1
    return passed

add(tests, ["reserved", __f96])
def __f97():
  global passed
  global failed
  ____id24 = [1, 2, 3]
  __a42 = has(____id24, 0)
  __b15 = has(____id24, 1)
  __c3 = has(____id24, 2)
  ____x903 = 1
  ____y424 = __a42
  if not equal63(____x903, ____y424):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x903), ", was ", L_str(____y424))
  else:
    passed = passed + 1
  ____x904 = 2
  ____y425 = __b15
  if not equal63(____x904, ____y425):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x904), ", was ", L_str(____y425))
  else:
    passed = passed + 1
  ____x905 = 3
  ____y426 = __c3
  if not equal63(____x905, ____y426):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x905), ", was ", L_str(____y426))
  else:
    passed = passed + 1
  ____id25 = [1, [2, [3], 4]]
  __w = has(____id25, 0)
  ____id26 = has(____id25, 1)
  __x909 = has(____id26, 0)
  ____id27 = has(____id26, 1)
  __y427 = has(____id27, 0)
  __z = has(____id26, 2)
  ____x910 = 1
  ____y428 = __w
  if not equal63(____x910, ____y428):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x910), ", was ", L_str(____y428))
  else:
    passed = passed + 1
  ____x911 = 2
  ____y429 = __x909
  if not equal63(____x911, ____y429):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x911), ", was ", L_str(____y429))
  else:
    passed = passed + 1
  ____x912 = 3
  ____y430 = __y427
  if not equal63(____x912, ____y430):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x912), ", was ", L_str(____y430))
  else:
    passed = passed + 1
  ____x913 = 4
  ____y431 = __z
  if not equal63(____x913, ____y431):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x913), ", was ", L_str(____y431))
  else:
    passed = passed + 1
  ____id28 = [1, 2, 3, 4]
  __a43 = has(____id28, 0)
  __b16 = has(____id28, 1)
  __c4 = cut(____id28, 2)
  ____x915 = [3, 4]
  ____y432 = __c4
  if not equal63(____x915, ____y432):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x915), ", was ", L_str(____y432))
  else:
    passed = passed + 1
  ____id29 = [1, [2, 3, 4], 5, 6, 7]
  __w1 = has(____id29, 0)
  ____id30 = has(____id29, 1)
  __x919 = has(____id30, 0)
  __y433 = cut(____id30, 1)
  __z1 = cut(____id29, 2)
  ____x920 = [3, 4]
  ____y434 = __y433
  if not equal63(____x920, ____y434):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x920), ", was ", L_str(____y434))
  else:
    passed = passed + 1
  ____x922 = [5, 6, 7]
  ____y435 = __z1
  if not equal63(____x922, ____y435):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x922), ", was ", L_str(____y435))
  else:
    passed = passed + 1
  ____id31 = {"foo": 99}
  __foo = has(____id31, "foo")
  ____x924 = 99
  ____y436 = __foo
  if not equal63(____x924, ____y436):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x924), ", was ", L_str(____y436))
  else:
    passed = passed + 1
  ____x925 = object([])
  ____x925["foo"] = 99
  ____id32 = ____x925
  __foo1 = has(____id32, "foo")
  ____x926 = 99
  ____y437 = __foo1
  if not equal63(____x926, ____y437):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x926), ", was ", L_str(____y437))
  else:
    passed = passed + 1
  ____id33 = {"foo": 99}
  __a44 = has(____id33, "foo")
  ____x927 = 99
  ____y438 = __a44
  if not equal63(____x927, ____y438):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x927), ", was ", L_str(____y438))
  else:
    passed = passed + 1
  ____id34 = {"foo": [98, 99]}
  ____id35 = has(____id34, "foo")
  __a45 = has(____id35, 0)
  __b17 = has(____id35, 1)
  ____x929 = 98
  ____y439 = __a45
  if not equal63(____x929, ____y439):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x929), ", was ", L_str(____y439))
  else:
    passed = passed + 1
  ____x930 = 99
  ____y440 = __b17
  if not equal63(____x930, ____y440):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x930), ", was ", L_str(____y440))
  else:
    passed = passed + 1
  ____x931 = object([99])
  ____x931["baz"] = True
  ____id36 = {
    "foo": 42,
    "bar": ____x931
  }
  __foo2 = has(____id36, "foo")
  ____id37 = has(____id36, "bar")
  __baz = has(____id37, "baz")
  ____x932 = 42
  ____y441 = __foo2
  if not equal63(____x932, ____y441):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x932), ", was ", L_str(____y441))
  else:
    passed = passed + 1
  ____x933 = True
  ____y442 = __baz
  if not equal63(____x933, ____y442):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x933), ", was ", L_str(____y442))
  else:
    passed = passed + 1
  ____x935 = object([20])
  ____x935["foo"] = 17
  ____x934 = object([10, ____x935])
  ____x934["bar"] = [1, 2, 3]
  ____id38 = ____x934
  __a46 = has(____id38, 0)
  ____id39 = has(____id38, 1)
  __b18 = has(____id39, 0)
  __foo3 = has(____id39, "foo")
  __bar = has(____id38, "bar")
  ____x937 = 10
  ____y443 = __a46
  if not equal63(____x937, ____y443):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x937), ", was ", L_str(____y443))
  else:
    passed = passed + 1
  ____x938 = 20
  ____y444 = __b18
  if not equal63(____x938, ____y444):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x938), ", was ", L_str(____y444))
  else:
    passed = passed + 1
  ____x939 = 17
  ____y445 = __foo3
  if not equal63(____x939, ____y445):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x939), ", was ", L_str(____y445))
  else:
    passed = passed + 1
  ____x940 = [1, 2, 3]
  ____y446 = __bar
  if not equal63(____x940, ____y446):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x940), ", was ", L_str(____y446))
  else:
    passed = passed + 1
  __yy = [1, 2, 3]
  ____id40 = __yy
  __xx = has(____id40, 0)
  __yy1 = has(____id40, 1)
  __zz1 = cut(____id40, 2)
  ____x943 = 1
  ____y447 = __xx
  if not equal63(____x943, ____y447):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x943), ", was ", L_str(____y447))
  else:
    passed = passed + 1
  ____x944 = 2
  ____y448 = __yy1
  if not equal63(____x944, ____y448):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x944), ", was ", L_str(____y448))
  else:
    passed = passed + 1
  ____x945 = [3]
  ____y449 = __zz1
  if not equal63(____x945, ____y449):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x945), ", was ", L_str(____y449))
  else:
    passed = passed + 1
    return passed

add(tests, ["destructuring", __f97])
def __f98():
  global passed
  global failed
  ____x950 = 17
  ____y450 = 17
  if not equal63(____x950, ____y450):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x950), ", was ", L_str(____y450))
  else:
    passed = passed + 1
  ____x951 = 42
  ____y451 = 32 + 10
  if not equal63(____x951, ____y451):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x951), ", was ", L_str(____y451))
  else:
    passed = passed + 1
  ____x952 = 1
  ____y452 = 1
  if not equal63(____x952, ____y452):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x952), ", was ", L_str(____y452))
  else:
    passed = passed + 1
  ____x953 = 17
  ____y453 = 17
  if not equal63(____x953, ____y453):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x953), ", was ", L_str(____y453))
  else:
    passed = passed + 1
  def __f99():
    return 20
  __b19 = __f99
  ____x954 = 18
  ____y454 = 18
  if not equal63(____x954, ____y454):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x954), ", was ", L_str(____y454))
  else:
    passed = passed + 1
  ____x955 = 20
  ____y455 = __b19()
  if not equal63(____x955, ____y455):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x955), ", was ", L_str(____y455))
  else:
    passed = passed + 1
  ____x960 = 2
  ____y456 = 1 + 1
  if not equal63(____x960, ____y456):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x960), ", was ", L_str(____y456))
  else:
    passed = passed + 1
    return passed

add(tests, ["let-macro", __f98])
def __f100():
  global passed
  global failed
  ____x963 = 17
  ____y457 = 17
  if not equal63(____x963, ____y457):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x963), ", was ", L_str(____y457))
  else:
    passed = passed + 1
  ____x964 = 17
  ____y458 = 10 + 7
  if not equal63(____x964, ____y458):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x964), ", was ", L_str(____y458))
  else:
    passed = passed + 1
  ____x965 = 1
  ____y459 = 1
  if not equal63(____x965, ____y459):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x965), ", was ", L_str(____y459))
  else:
    passed = passed + 1
  ____x966 = 17
  ____y460 = 17
  if not equal63(____x966, ____y460):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x966), ", was ", L_str(____y460))
  else:
    passed = passed + 1
  __b20 = 20
  ____x967 = 18
  ____y461 = 18
  if not equal63(____x967, ____y461):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x967), ", was ", L_str(____y461))
  else:
    passed = passed + 1
  ____x968 = 20
  ____y462 = __b20
  if not equal63(____x968, ____y462):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x968), ", was ", L_str(____y462))
  else:
    passed = passed + 1
    return passed

add(tests, ["let-symbol", __f100])
def __f101():
  global passed
  global failed
  setenv("zzz", symbol=42)
  ____x970 = 42
  ____y463 = 42
  if not equal63(____x970, ____y463):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x970), ", was ", L_str(____y463))
  else:
    passed = passed + 1
    return passed

add(tests, ["define-symbol", __f101])
def __f102():
  global passed
  global failed
  ____x972 = 2
  ____y464 = 2
  if not equal63(____x972, ____y464):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x972), ", was ", L_str(____y464))
  else:
    passed = passed + 1
  ____x973 = 1
  ____y465 = 1
  if not equal63(____x973, ____y465):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x973), ", was ", L_str(____y465))
  else:
    passed = passed + 1
  ____x974 = 1
  ____y466 = 1
  if not equal63(____x974, ____y466):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x974), ", was ", L_str(____y466))
  else:
    passed = passed + 1
  ____x975 = 2
  ____y467 = 2
  if not equal63(____x975, ____y467):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x975), ", was ", L_str(____y467))
  else:
    passed = passed + 1
    return passed

add(tests, ["macros-and-symbols", __f102])
def __f103():
  global passed
  global failed
  __a47 = 10
  ____x977 = __a47
  ____y468 = 10
  if not equal63(____x977, ____y468):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x977), ", was ", L_str(____y468))
  else:
    passed = passed + 1
  ____x978 = 12
  ____y469 = 12
  if not equal63(____x978, ____y469):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x978), ", was ", L_str(____y469))
  else:
    passed = passed + 1
  ____x979 = __a47
  ____y470 = 10
  if not equal63(____x979, ____y470):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x979), ", was ", L_str(____y470))
  else:
    passed = passed + 1
  __b21 = 20
  ____x980 = __b21
  ____y471 = 20
  if not equal63(____x980, ____y471):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x980), ", was ", L_str(____y471))
  else:
    passed = passed + 1
  ____x981 = 22
  ____y472 = 22
  if not equal63(____x981, ____y472):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x981), ", was ", L_str(____y472))
  else:
    passed = passed + 1
  ____x982 = __b21
  ____y473 = 20
  if not equal63(____x982, ____y473):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x982), ", was ", L_str(____y473))
  else:
    passed = passed + 1
  ____x983 = 30
  ____y474 = 30
  if not equal63(____x983, ____y474):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x983), ", was ", L_str(____y474))
  else:
    passed = passed + 1
  __c5 = 32
  ____x984 = 32
  ____y475 = __c5
  if not equal63(____x984, ____y475):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x984), ", was ", L_str(____y475))
  else:
    passed = passed + 1
  ____x985 = 30
  ____y476 = 30
  if not equal63(____x985, ____y476):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x985), ", was ", L_str(____y476))
  else:
    passed = passed + 1
  ____x986 = 40
  ____y477 = 40
  if not equal63(____x986, ____y477):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x986), ", was ", L_str(____y477))
  else:
    passed = passed + 1
  __d2 = 42
  ____x987 = 42
  ____y478 = __d2
  if not equal63(____x987, ____y478):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x987), ", was ", L_str(____y478))
  else:
    passed = passed + 1
  ____x988 = 40
  ____y479 = 40
  if not equal63(____x988, ____y479):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x988), ", was ", L_str(____y479))
  else:
    passed = passed + 1
    return passed

add(tests, ["macros-and-let", __f103])
def __f104():
  global passed
  global failed
  __ham = unique("ham")
  __chap = unique("chap")
  ____x990 = "__ham2"
  ____y480 = __ham
  if not equal63(____x990, ____y480):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x990), ", was ", L_str(____y480))
  else:
    passed = passed + 1
  ____x991 = "__chap1"
  ____y481 = __chap
  if not equal63(____x991, ____y481):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x991), ", was ", L_str(____y481))
  else:
    passed = passed + 1
  __ham1 = unique("ham")
  ____x992 = "__ham3"
  ____y482 = __ham1
  if not equal63(____x992, ____y482):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x992), ", was ", L_str(____y482))
  else:
    passed = passed + 1
    return passed

add(tests, ["let-unique", __f104])
def __f105():
  global passed
  global failed
  ____x994 = True
  ____y483 = True
  if not equal63(____x994, ____y483):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x994), ", was ", L_str(____y483))
  else:
    passed = passed + 1
  ____x995 = False
  ____y484 = False
  if not equal63(____x995, ____y484):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x995), ", was ", L_str(____y484))
  else:
    passed = passed + 1
  ____x996 = True
  ____y485 = L_inf < -10000000000
  if not equal63(____x996, ____y485):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x996), ", was ", L_str(____y485))
  else:
    passed = passed + 1
  ____x997 = False
  ____y486 = inf < -10000000000
  if not equal63(____x997, ____y486):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x997), ", was ", L_str(____y486))
  else:
    passed = passed + 1
  ____x998 = False
  ____y487 = nan == nan
  if not equal63(____x998, ____y487):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x998), ", was ", L_str(____y487))
  else:
    passed = passed + 1
  ____x999 = True
  ____y488 = nan63(nan)
  if not equal63(____x999, ____y488):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x999), ", was ", L_str(____y488))
  else:
    passed = passed + 1
  ____x1000 = True
  ____y489 = nan63(- nan)
  if not equal63(____x1000, ____y489):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1000), ", was ", L_str(____y489))
  else:
    passed = passed + 1
  ____x1001 = True
  ____y490 = nan63(nan * 20)
  if not equal63(____x1001, ____y490):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1001), ", was ", L_str(____y490))
  else:
    passed = passed + 1
  ____x1002 = L_inf
  ____y491 = - inf
  if not equal63(____x1002, ____y491):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1002), ", was ", L_str(____y491))
  else:
    passed = passed + 1
  ____x1003 = inf
  ____y492 = - L_inf
  if not equal63(____x1003, ____y492):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1003), ", was ", L_str(____y492))
  else:
    passed = passed + 1
  __Inf = 1
  __NaN = 2
  __L_Inf = "a"
  __L_NaN = "b"
  ____x1004 = __Inf
  ____y493 = 1
  if not equal63(____x1004, ____y493):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1004), ", was ", L_str(____y493))
  else:
    passed = passed + 1
  ____x1005 = __NaN
  ____y494 = 2
  if not equal63(____x1005, ____y494):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1005), ", was ", L_str(____y494))
  else:
    passed = passed + 1
  ____x1006 = __L_Inf
  ____y495 = "a"
  if not equal63(____x1006, ____y495):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1006), ", was ", L_str(____y495))
  else:
    passed = passed + 1
  ____x1007 = __L_NaN
  ____y496 = "b"
  if not equal63(____x1007, ____y496):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1007), ", was ", L_str(____y496))
  else:
    passed = passed + 1
    return passed

add(tests, ["literals", __f105])
def __f106():
  global passed
  global failed
  __l8 = []
  add(__l8, "a")
  add(__l8, "b")
  add(__l8, "c")
  ____x1009 = ["a", "b", "c"]
  ____y497 = __l8
  if not equal63(____x1009, ____y497):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1009), ", was ", L_str(____y497))
  else:
    passed = passed + 1
  ____x1011 = None
  ____y498 = add([], "a")
  if not equal63(____x1011, ____y498):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1011), ", was ", L_str(____y498))
  else:
    passed = passed + 1
    return passed

add(tests, ["add", __f106])
def __f107():
  global passed
  global failed
  __l9 = ["a", "b", "c"]
  ____x1014 = "c"
  ____y499 = drop(__l9)
  if not equal63(____x1014, ____y499):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1014), ", was ", L_str(____y499))
  else:
    passed = passed + 1
  ____x1015 = "b"
  ____y500 = drop(__l9)
  if not equal63(____x1015, ____y500):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1015), ", was ", L_str(____y500))
  else:
    passed = passed + 1
  ____x1016 = "a"
  ____y501 = drop(__l9)
  if not equal63(____x1016, ____y501):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1016), ", was ", L_str(____y501))
  else:
    passed = passed + 1
  ____x1017 = None
  ____y502 = drop(__l9)
  if not equal63(____x1017, ____y502):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1017), ", was ", L_str(____y502))
  else:
    passed = passed + 1
    return passed

add(tests, ["drop", __f107])
def __f108():
  global passed
  global failed
  ____x1019 = 3
  ____y503 = last([1, 2, 3])
  if not equal63(____x1019, ____y503):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1019), ", was ", L_str(____y503))
  else:
    passed = passed + 1
  ____x1021 = None
  ____y504 = last([])
  if not equal63(____x1021, ____y504):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1021), ", was ", L_str(____y504))
  else:
    passed = passed + 1
  ____x1022 = "c"
  ____y505 = last(["a", "b", "c"])
  if not equal63(____x1022, ____y505):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1022), ", was ", L_str(____y505))
  else:
    passed = passed + 1
    return passed

add(tests, ["last", __f108])
def __f109():
  global passed
  global failed
  ____x1025 = [1, 2, 3]
  ____y506 = join([1, 2], [3])
  if not equal63(____x1025, ____y506):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1025), ", was ", L_str(____y506))
  else:
    passed = passed + 1
  ____x1029 = [1, 2]
  ____y507 = join([], [1, 2])
  if not equal63(____x1029, ____y507):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1029), ", was ", L_str(____y507))
  else:
    passed = passed + 1
  ____x1032 = []
  ____y508 = join([], [])
  if not equal63(____x1032, ____y508):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1032), ", was ", L_str(____y508))
  else:
    passed = passed + 1
  ____x1033 = []
  ____y509 = join(None, None)
  if not equal63(____x1033, ____y509):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1033), ", was ", L_str(____y509))
  else:
    passed = passed + 1
  ____x1034 = []
  ____y510 = join(None, [])
  if not equal63(____x1034, ____y510):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1034), ", was ", L_str(____y510))
  else:
    passed = passed + 1
  ____x1035 = []
  ____y511 = join()
  if not equal63(____x1035, ____y511):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1035), ", was ", L_str(____y511))
  else:
    passed = passed + 1
  ____x1036 = []
  ____y512 = join([])
  if not equal63(____x1036, ____y512):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1036), ", was ", L_str(____y512))
  else:
    passed = passed + 1
  ____x1037 = [1]
  ____y513 = join([1], None)
  if not equal63(____x1037, ____y513):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1037), ", was ", L_str(____y513))
  else:
    passed = passed + 1
  ____x1040 = ["a"]
  ____y514 = join(["a"], [])
  if not equal63(____x1040, ____y514):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1040), ", was ", L_str(____y514))
  else:
    passed = passed + 1
  ____x1043 = ["a"]
  ____y515 = join(None, ["a"])
  if not equal63(____x1043, ____y515):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1043), ", was ", L_str(____y515))
  else:
    passed = passed + 1
  ____x1046 = ["a"]
  ____y516 = join(["a"])
  if not equal63(____x1046, ____y516):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1046), ", was ", L_str(____y516))
  else:
    passed = passed + 1
  ____x1050 = object(["a"])
  ____x1050["b"] = True
  ____x1049 = ____x1050
  ____y517 = join(["a"], {"b": True})
  if not equal63(____x1049, ____y517):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1049), ", was ", L_str(____y517))
  else:
    passed = passed + 1
  ____x1053 = object(["a", "b"])
  ____x1053["b"] = True
  ____x1052 = ____x1053
  ____x1055 = object(["b"])
  ____x1055["b"] = True
  ____y518 = join(["a"], ____x1055)
  if not equal63(____x1052, ____y518):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1052), ", was ", L_str(____y518))
  else:
    passed = passed + 1
  ____x1057 = object(["a"])
  ____x1057["b"] = 10
  ____x1056 = ____x1057
  ____x1058 = object(["a"])
  ____x1058["b"] = True
  ____y519 = join(____x1058, {"b": 10})
  if not equal63(____x1056, ____y519):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1056), ", was ", L_str(____y519))
  else:
    passed = passed + 1
  ____x1060 = object([])
  ____x1060["b"] = 10
  ____x1059 = ____x1060
  ____x1061 = object([])
  ____x1061["b"] = 10
  ____y520 = join({"b": True}, ____x1061)
  if not equal63(____x1059, ____y520):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1059), ", was ", L_str(____y520))
  else:
    passed = passed + 1
  ____x1062 = object(["a"])
  ____x1062["b"] = 1
  ____x1063 = object(["b"])
  ____x1063["c"] = 2
  __t4 = join(____x1062, ____x1063)
  ____x1064 = 1
  ____y521 = __t4["b"]
  if not equal63(____x1064, ____y521):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1064), ", was ", L_str(____y521))
  else:
    passed = passed + 1
  ____x1065 = 2
  ____y522 = __t4["c"]
  if not equal63(____x1065, ____y522):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1065), ", was ", L_str(____y522))
  else:
    passed = passed + 1
  ____x1066 = "b"
  ____y523 = __t4[1]
  if not equal63(____x1066, ____y523):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1066), ", was ", L_str(____y523))
  else:
    passed = passed + 1
    return passed

add(tests, ["join", __f109])
def __f110():
  global passed
  global failed
  ____x1068 = []
  ____y524 = reverse([])
  if not equal63(____x1068, ____y524):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1068), ", was ", L_str(____y524))
  else:
    passed = passed + 1
  ____x1069 = [3, 2, 1]
  ____y525 = reverse([1, 2, 3])
  if not equal63(____x1069, ____y525):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1069), ", was ", L_str(____y525))
  else:
    passed = passed + 1
  ____x1073 = object([3, 2, 1])
  ____x1073["a"] = True
  ____x1072 = ____x1073
  ____x1074 = object([1, 2, 3])
  ____x1074["a"] = True
  ____y526 = reverse(____x1074)
  if not equal63(____x1072, ____y526):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1072), ", was ", L_str(____y526))
  else:
    passed = passed + 1
    return passed

add(tests, ["reverse", __f110])
def __f111():
  global passed
  global failed
  ____x1076 = []
  def __f112(x=None):
    return x
  ____y527 = map(__f112, [])
  if not equal63(____x1076, ____y527):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1076), ", was ", L_str(____y527))
  else:
    passed = passed + 1
  ____x1077 = [1]
  def __f113(x=None):
    return x
  ____y528 = map(__f113, [1])
  if not equal63(____x1077, ____y528):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1077), ", was ", L_str(____y528))
  else:
    passed = passed + 1
  ____x1080 = [2, 3, 4]
  def __f114(x=None):
    return x + 1
  ____y529 = map(__f114, [1, 2, 3])
  if not equal63(____x1080, ____y529):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1080), ", was ", L_str(____y529))
  else:
    passed = passed + 1
  ____x1084 = object([2, 3, 4])
  ____x1084["a"] = 5
  ____x1083 = ____x1084
  def __f115(x=None):
    return x + 1
  ____x1085 = object([1, 2, 3])
  ____x1085["a"] = 4
  ____y530 = map(__f115, ____x1085)
  if not equal63(____x1083, ____y530):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1083), ", was ", L_str(____y530))
  else:
    passed = passed + 1
  ____x1087 = object([])
  ____x1087["a"] = True
  ____x1086 = ____x1087
  def __f116(x=None):
    return x
  ____x1088 = object([])
  ____x1088["a"] = True
  ____y531 = map(__f116, ____x1088)
  if not equal63(____x1086, ____y531):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1086), ", was ", L_str(____y531))
  else:
    passed = passed + 1
  ____x1090 = object([])
  ____x1090["b"] = False
  ____x1089 = ____x1090
  def __f117(x=None):
    return x
  ____x1091 = object([])
  ____x1091["b"] = False
  ____y532 = map(__f117, ____x1091)
  if not equal63(____x1089, ____y532):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1089), ", was ", L_str(____y532))
  else:
    passed = passed + 1
  ____x1093 = object([])
  ____x1093["a"] = True
  ____x1093["b"] = False
  ____x1092 = ____x1093
  def __f118(x=None):
    return x
  ____x1094 = object([])
  ____x1094["a"] = True
  ____x1094["b"] = False
  ____y533 = map(__f118, ____x1094)
  if not equal63(____x1092, ____y533):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1092), ", was ", L_str(____y533))
  else:
    passed = passed + 1
  def __f119(x=None):
    if x % 2 == 0:
      return x
  __evens = __f119
  ____x1095 = [2, 4, 6]
  ____y534 = map(__evens, [1, 2, 3, 4, 5, 6])
  if not equal63(____x1095, ____y534):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1095), ", was ", L_str(____y534))
  else:
    passed = passed + 1
  ____x1099 = object([2, 4, 6])
  ____x1099["b"] = 8
  ____x1098 = ____x1099
  ____x1100 = object([1, 2, 3, 4, 5, 6])
  ____x1100["a"] = 7
  ____x1100["b"] = 8
  ____y535 = map(__evens, ____x1100)
  if not equal63(____x1098, ____y535):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1098), ", was ", L_str(____y535))
  else:
    passed = passed + 1
    return passed

add(tests, ["map", __f111])
def __f120():
  global passed
  global failed
  ____x1102 = []
  ____y536 = cut([])
  if not equal63(____x1102, ____y536):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1102), ", was ", L_str(____y536))
  else:
    passed = passed + 1
  ____x1103 = ["a"]
  ____y537 = cut(["a"])
  if not equal63(____x1103, ____y537):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1103), ", was ", L_str(____y537))
  else:
    passed = passed + 1
  ____x1106 = ["b", "c"]
  ____y538 = cut(["a", "b", "c"], 1)
  if not equal63(____x1106, ____y538):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1106), ", was ", L_str(____y538))
  else:
    passed = passed + 1
  ____x1109 = ["b", "c"]
  ____y539 = cut(["a", "b", "c", "d"], 1, 3)
  if not equal63(____x1109, ____y539):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1109), ", was ", L_str(____y539))
  else:
    passed = passed + 1
  ____x1112 = [1, 2, 3]
  ____y540 = cut([1, 2, 3], 0, 10)
  if not equal63(____x1112, ____y540):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1112), ", was ", L_str(____y540))
  else:
    passed = passed + 1
  ____x1115 = [1]
  ____y541 = cut([1, 2, 3], -4, 1)
  if not equal63(____x1115, ____y541):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1115), ", was ", L_str(____y541))
  else:
    passed = passed + 1
  ____x1118 = [1, 2, 3]
  ____y542 = cut([1, 2, 3], -4)
  if not equal63(____x1118, ____y542):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1118), ", was ", L_str(____y542))
  else:
    passed = passed + 1
  ____x1122 = object([2])
  ____x1122["a"] = True
  ____x1121 = ____x1122
  ____x1123 = object([1, 2])
  ____x1123["a"] = True
  ____y543 = cut(____x1123, 1)
  if not equal63(____x1121, ____y543):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1121), ", was ", L_str(____y543))
  else:
    passed = passed + 1
  ____x1125 = object([])
  ____x1125["a"] = True
  ____x1125["b"] = 2
  ____x1124 = ____x1125
  ____x1126 = object([])
  ____x1126["a"] = True
  ____x1126["b"] = 2
  ____y544 = cut(____x1126)
  if not equal63(____x1124, ____y544):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1124), ", was ", L_str(____y544))
  else:
    passed = passed + 1
  __t5 = [1, 2, 3]
  ____x1128 = []
  ____y545 = cut(__t5, L_35(__t5))
  if not equal63(____x1128, ____y545):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1128), ", was ", L_str(____y545))
  else:
    passed = passed + 1
  ____x1129 = object([1, 2, 3])
  ____x1129["a"] = True
  __t6 = ____x1129
  ____x1131 = object([])
  ____x1131["a"] = True
  ____x1130 = ____x1131
  ____y546 = cut(__t6, L_35(__t6))
  if not equal63(____x1130, ____y546):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1130), ", was ", L_str(____y546))
  else:
    passed = passed + 1
    return passed

add(tests, ["cut", __f120])
def __f121():
  global passed
  global failed
  ____x1133 = "uux"
  ____y547 = clip("quux", 1)
  if not equal63(____x1133, ____y547):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1133), ", was ", L_str(____y547))
  else:
    passed = passed + 1
  ____x1134 = "uu"
  ____y548 = clip("quux", 1, 3)
  if not equal63(____x1134, ____y548):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1134), ", was ", L_str(____y548))
  else:
    passed = passed + 1
  ____x1135 = ""
  ____y549 = clip("quux", 5)
  if not equal63(____x1135, ____y549):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1135), ", was ", L_str(____y549))
  else:
    passed = passed + 1
  ____x1136 = "ab"
  ____y550 = clip("ab", 0, 4)
  if not equal63(____x1136, ____y550):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1136), ", was ", L_str(____y550))
  else:
    passed = passed + 1
  ____x1137 = "ab"
  ____y551 = clip("ab", -4, 4)
  if not equal63(____x1137, ____y551):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1137), ", was ", L_str(____y551))
  else:
    passed = passed + 1
  ____x1138 = "a"
  ____y552 = clip("ab", -1, 1)
  if not equal63(____x1138, ____y552):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1138), ", was ", L_str(____y552))
  else:
    passed = passed + 1
    return passed

add(tests, ["clip", __f121])
def __f122():
  global passed
  global failed
  ____x1140 = None
  ____y553 = search("", "a")
  if not equal63(____x1140, ____y553):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1140), ", was ", L_str(____y553))
  else:
    passed = passed + 1
  ____x1141 = 0
  ____y554 = search("", "")
  if not equal63(____x1141, ____y554):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1141), ", was ", L_str(____y554))
  else:
    passed = passed + 1
  ____x1142 = 0
  ____y555 = search("a", "")
  if not equal63(____x1142, ____y555):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1142), ", was ", L_str(____y555))
  else:
    passed = passed + 1
  ____x1143 = 0
  ____y556 = search("abc", "a")
  if not equal63(____x1143, ____y556):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1143), ", was ", L_str(____y556))
  else:
    passed = passed + 1
  ____x1144 = 2
  ____y557 = search("abcd", "cd")
  if not equal63(____x1144, ____y557):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1144), ", was ", L_str(____y557))
  else:
    passed = passed + 1
  ____x1145 = None
  ____y558 = search("abcd", "ce")
  if not equal63(____x1145, ____y558):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1145), ", was ", L_str(____y558))
  else:
    passed = passed + 1
  ____x1146 = None
  ____y559 = search("abc", "z")
  if not equal63(____x1146, ____y559):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1146), ", was ", L_str(____y559))
  else:
    passed = passed + 1
    return passed

add(tests, ["search", __f122])
def __f123():
  global passed
  global failed
  ____x1148 = []
  ____y560 = split("", "")
  if not equal63(____x1148, ____y560):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1148), ", was ", L_str(____y560))
  else:
    passed = passed + 1
  ____x1149 = []
  ____y561 = split("", ",")
  if not equal63(____x1149, ____y561):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1149), ", was ", L_str(____y561))
  else:
    passed = passed + 1
  ____x1150 = ["a"]
  ____y562 = split("a", ",")
  if not equal63(____x1150, ____y562):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1150), ", was ", L_str(____y562))
  else:
    passed = passed + 1
  ____x1152 = ["a", ""]
  ____y563 = split("a,", ",")
  if not equal63(____x1152, ____y563):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1152), ", was ", L_str(____y563))
  else:
    passed = passed + 1
  ____x1154 = ["a", "b"]
  ____y564 = split("a,b", ",")
  if not equal63(____x1154, ____y564):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1154), ", was ", L_str(____y564))
  else:
    passed = passed + 1
  ____x1156 = ["a", "b", ""]
  ____y565 = split("a,b,", ",")
  if not equal63(____x1156, ____y565):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1156), ", was ", L_str(____y565))
  else:
    passed = passed + 1
  ____x1158 = ["a", "b"]
  ____y566 = split("azzb", "zz")
  if not equal63(____x1158, ____y566):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1158), ", was ", L_str(____y566))
  else:
    passed = passed + 1
  ____x1160 = ["a", "b", ""]
  ____y567 = split("azzbzz", "zz")
  if not equal63(____x1160, ____y567):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1160), ", was ", L_str(____y567))
  else:
    passed = passed + 1
    return passed

add(tests, ["split", __f123])
def __f124():
  global passed
  global failed
  ____x1163 = "a"
  def __f125(a=None, b=None):
    return a + b
  ____y568 = either(reduce(__f125, []), "a")
  if not equal63(____x1163, ____y568):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1163), ", was ", L_str(____y568))
  else:
    passed = passed + 1
  ____x1165 = "a"
  def __f126(a=None, b=None):
    return a + b
  ____y569 = either(reduce(__f126, ["a"]), "a")
  if not equal63(____x1165, ____y569):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1165), ", was ", L_str(____y569))
  else:
    passed = passed + 1
  ____x1167 = 6
  def __f127(a=None, b=None):
    return a + b
  ____y570 = reduce(__f127, [1, 2, 3])
  if not equal63(____x1167, ____y570):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1167), ", was ", L_str(____y570))
  else:
    passed = passed + 1
  ____x1169 = [1, [2, 3]]
  def __f128(a=None, b=None):
    return [a, b]
  ____y571 = reduce(__f128, [1, 2, 3])
  if not equal63(____x1169, ____y571):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1169), ", was ", L_str(____y571))
  else:
    passed = passed + 1
  ____x1174 = [1, 2, 3, 4, 5]
  def __f129(a=None, b=None):
    return join(a, b)
  ____y572 = reduce(__f129, [[1], [2, 3], [4, 5]])
  if not equal63(____x1174, ____y572):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1174), ", was ", L_str(____y572))
  else:
    passed = passed + 1
    return passed

add(tests, ["reduce", __f124])
def __f130():
  global passed
  global failed
  ____x1181 = []
  def __f131(x=None):
    return x
  ____y573 = keep(__f131, [])
  if not equal63(____x1181, ____y573):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1181), ", was ", L_str(____y573))
  else:
    passed = passed + 1
  ____x1182 = [0, 1, 2]
  def __f132(x=None):
    return x
  ____y574 = keep(__f132, [0, 1, 2])
  if not equal63(____x1182, ____y574):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1182), ", was ", L_str(____y574))
  else:
    passed = passed + 1
  ____x1185 = [[1], [2, 3]]
  ____y575 = keep(some63, [[], [1], [], [2, 3]])
  if not equal63(____x1185, ____y575):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1185), ", was ", L_str(____y575))
  else:
    passed = passed + 1
  def __f133(x=None):
    return x % 2 == 0
  __evens1 = __f133
  ____x1194 = [6]
  ____y576 = keep(__evens1, [5, 6, 7])
  if not equal63(____x1194, ____y576):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1194), ", was ", L_str(____y576))
  else:
    passed = passed + 1
  ____x1197 = [2, 4, 6]
  ____y577 = keep(__evens1, [1, 2, 3, 4, 5, 6])
  if not equal63(____x1197, ____y577):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1197), ", was ", L_str(____y577))
  else:
    passed = passed + 1
  ____x1201 = object([2, 4, 6])
  ____x1201["b"] = 8
  ____x1200 = ____x1201
  ____x1202 = object([1, 2, 3, 4, 5, 6])
  ____x1202["a"] = 7
  ____x1202["b"] = 8
  ____y578 = keep(__evens1, ____x1202)
  if not equal63(____x1200, ____y578):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1200), ", was ", L_str(____y578))
  else:
    passed = passed + 1
    return passed

add(tests, ["keep", __f130])
def __f134():
  global passed
  global failed
  ____x1204 = True
  ____y579 = in63("x", ["x", "y", "z"])
  if not equal63(____x1204, ____y579):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1204), ", was ", L_str(____y579))
  else:
    passed = passed + 1
  ____x1206 = True
  ____y580 = in63(7, [5, 6, 7])
  if not equal63(____x1206, ____y580):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1206), ", was ", L_str(____y580))
  else:
    passed = passed + 1
  ____x1208 = None
  ____y581 = in63("baz", ["no", "can", "do"])
  if not equal63(____x1208, ____y581):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1208), ", was ", L_str(____y581))
  else:
    passed = passed + 1
    return passed

add(tests, ["in?", __f134])
def __f135():
  global passed
  global failed
  ____x1211 = None
  def __f136(x=None):
    return x
  ____y582 = find(__f136, [])
  if not equal63(____x1211, ____y582):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1211), ", was ", L_str(____y582))
  else:
    passed = passed + 1
  ____x1212 = 7
  def __f137(x=None):
    return x
  ____y583 = find(__f137, [7])
  if not equal63(____x1212, ____y583):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1212), ", was ", L_str(____y583))
  else:
    passed = passed + 1
  ____x1214 = True
  def __f138(x=None):
    return x == 7
  ____y584 = find(__f138, [2, 4, 7])
  if not equal63(____x1214, ____y584):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1214), ", was ", L_str(____y584))
  else:
    passed = passed + 1
  ____x1216 = True
  def __f139(x=None):
    return x == 7
  ____x1217 = object([2, 4])
  ____x1217["foo"] = 7
  ____y585 = find(__f139, ____x1217)
  if not equal63(____x1216, ____y585):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1216), ", was ", L_str(____y585))
  else:
    passed = passed + 1
  ____x1218 = True
  def __f140(x=None):
    return x == True
  ____x1219 = object([2, 4])
  ____x1219["bar"] = True
  ____y586 = find(__f140, ____x1219)
  if not equal63(____x1218, ____y586):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1218), ", was ", L_str(____y586))
  else:
    passed = passed + 1
  ____x1220 = True
  ____y587 = in63(7, [2, 4, 7])
  if not equal63(____x1220, ____y587):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1220), ", was ", L_str(____y587))
  else:
    passed = passed + 1
  ____x1222 = True
  ____x1223 = object([2, 4])
  ____x1223["foo"] = 7
  ____y588 = in63(7, ____x1223)
  if not equal63(____x1222, ____y588):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1222), ", was ", L_str(____y588))
  else:
    passed = passed + 1
  ____x1224 = True
  ____x1225 = object([2, 4])
  ____x1225["bar"] = True
  ____y589 = in63(True, ____x1225)
  if not equal63(____x1224, ____y589):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1224), ", was ", L_str(____y589))
  else:
    passed = passed + 1
    return passed

add(tests, ["find", __f135])
def __f141():
  global passed
  global failed
  ____x1227 = None
  def __f142(x=None):
    return x
  ____y590 = first(__f142, [])
  if not equal63(____x1227, ____y590):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1227), ", was ", L_str(____y590))
  else:
    passed = passed + 1
  ____x1228 = 7
  def __f143(x=None):
    return x
  ____y591 = first(__f143, [7])
  if not equal63(____x1228, ____y591):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1228), ", was ", L_str(____y591))
  else:
    passed = passed + 1
  ____x1230 = True
  def __f144(x=None):
    return x == 7
  ____y592 = first(__f144, [2, 4, 7])
  if not equal63(____x1230, ____y592):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1230), ", was ", L_str(____y592))
  else:
    passed = passed + 1
  ____x1232 = 4
  def __f145(x=None):
    return x > 3 and x
  ____y593 = first(__f145, [1, 2, 3, 4, 5, 6])
  if not equal63(____x1232, ____y593):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1232), ", was ", L_str(____y593))
  else:
    passed = passed + 1
    return passed

add(tests, ["first", __f141])
def __f146():
  global passed
  global failed
  ____x1235 = ["a", "b", "c"]
  ____y594 = sort(["c", "a", "b"])
  if not equal63(____x1235, ____y594):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1235), ", was ", L_str(____y594))
  else:
    passed = passed + 1
  ____x1238 = [3, 2, 1]
  ____y595 = sort([1, 2, 3], L_62)
  if not equal63(____x1238, ____y595):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1238), ", was ", L_str(____y595))
  else:
    passed = passed + 1
    return passed

add(tests, ["sort", __f146])
def __f147():
  global passed
  global failed
  ____x1242 = True
  ____y596 = string63("abc")
  if not equal63(____x1242, ____y596):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1242), ", was ", L_str(____y596))
  else:
    passed = passed + 1
  ____x1243 = False
  ____y597 = string63(17)
  if not equal63(____x1243, ____y597):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1243), ", was ", L_str(____y597))
  else:
    passed = passed + 1
  ____x1244 = False
  ____y598 = string63(["a"])
  if not equal63(____x1244, ____y598):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1244), ", was ", L_str(____y598))
  else:
    passed = passed + 1
  ____x1246 = False
  ____y599 = string63(True)
  if not equal63(____x1246, ____y599):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1246), ", was ", L_str(____y599))
  else:
    passed = passed + 1
  ____x1247 = False
  ____y600 = string63({})
  if not equal63(____x1247, ____y600):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1247), ", was ", L_str(____y600))
  else:
    passed = passed + 1
  ____x1248 = False
  ____y601 = number63("abc")
  if not equal63(____x1248, ____y601):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1248), ", was ", L_str(____y601))
  else:
    passed = passed + 1
  ____x1249 = True
  ____y602 = number63(17)
  if not equal63(____x1249, ____y602):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1249), ", was ", L_str(____y602))
  else:
    passed = passed + 1
  ____x1250 = False
  ____y603 = number63(["a"])
  if not equal63(____x1250, ____y603):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1250), ", was ", L_str(____y603))
  else:
    passed = passed + 1
  ____x1252 = False
  ____y604 = number63(True)
  if not equal63(____x1252, ____y604):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1252), ", was ", L_str(____y604))
  else:
    passed = passed + 1
  ____x1253 = False
  ____y605 = number63({})
  if not equal63(____x1253, ____y605):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1253), ", was ", L_str(____y605))
  else:
    passed = passed + 1
  ____x1254 = False
  ____y606 = boolean63("abc")
  if not equal63(____x1254, ____y606):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1254), ", was ", L_str(____y606))
  else:
    passed = passed + 1
  ____x1255 = False
  ____y607 = boolean63(17)
  if not equal63(____x1255, ____y607):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1255), ", was ", L_str(____y607))
  else:
    passed = passed + 1
  ____x1256 = False
  ____y608 = boolean63(["a"])
  if not equal63(____x1256, ____y608):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1256), ", was ", L_str(____y608))
  else:
    passed = passed + 1
  ____x1258 = True
  ____y609 = boolean63(True)
  if not equal63(____x1258, ____y609):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1258), ", was ", L_str(____y609))
  else:
    passed = passed + 1
  ____x1259 = False
  ____y610 = boolean63({})
  if not equal63(____x1259, ____y610):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1259), ", was ", L_str(____y610))
  else:
    passed = passed + 1
  ____x1260 = True
  ____y611 = atom63(None)
  if not equal63(____x1260, ____y611):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1260), ", was ", L_str(____y611))
  else:
    passed = passed + 1
  ____x1261 = True
  ____y612 = atom63("abc")
  if not equal63(____x1261, ____y612):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1261), ", was ", L_str(____y612))
  else:
    passed = passed + 1
  ____x1262 = True
  ____y613 = atom63(42)
  if not equal63(____x1262, ____y613):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1262), ", was ", L_str(____y613))
  else:
    passed = passed + 1
  ____x1263 = True
  ____y614 = atom63(True)
  if not equal63(____x1263, ____y614):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1263), ", was ", L_str(____y614))
  else:
    passed = passed + 1
  ____x1264 = False
  def __f148():
    pass
  ____y615 = atom63(__f148)
  if not equal63(____x1264, ____y615):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1264), ", was ", L_str(____y615))
  else:
    passed = passed + 1
  ____x1265 = False
  ____y616 = atom63([1])
  if not equal63(____x1265, ____y616):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1265), ", was ", L_str(____y616))
  else:
    passed = passed + 1
  ____x1267 = False
  ____y617 = atom63({})
  if not equal63(____x1267, ____y617):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1267), ", was ", L_str(____y617))
  else:
    passed = passed + 1
  ____x1268 = True
  ____y618 = obj63({"a": 10})
  if not equal63(____x1268, ____y618):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1268), ", was ", L_str(____y618))
  else:
    passed = passed + 1
  ____x1269 = False
  ____y619 = obj63(1)
  if not equal63(____x1269, ____y619):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1269), ", was ", L_str(____y619))
  else:
    passed = passed + 1
  ____x1270 = False
  ____y620 = obj63("zz")
  if not equal63(____x1270, ____y620):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1270), ", was ", L_str(____y620))
  else:
    passed = passed + 1
  ____x1271 = False
  def __f149():
    pass
  ____y621 = obj63(__f149)
  if not equal63(____x1271, ____y621):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1271), ", was ", L_str(____y621))
  else:
    passed = passed + 1
    return passed

add(tests, ["type", __f147])
def __f150():
  global passed
  global failed
  def f(x=None):
    return x
  __l10 = {}
  __l21 = {}
  __l10[f] = True
  __l21[L_str(__l10)] = True
  __k2 = "function"
  ____x1273 = cat("(", __k2, ": true)")
  ____y622 = L_str(__l10)
  if not equal63(____x1273, ____y622):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1273), ", was ", L_str(____y622))
  else:
    passed = passed + 1
  ____x1274 = cat("((", __k2, ": true): true)")
  ____y623 = L_str(__l21)
  if not equal63(____x1274, ____y623):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1274), ", was ", L_str(____y623))
  else:
    passed = passed + 1
    return passed

add(tests, ["str", __f150])
def __f151():
  global passed
  global failed
  ____x1276 = 4
  def __f152(a=None, b=None):
    return a + b
  ____y624 = apply(__f152, [2, 2])
  if not equal63(____x1276, ____y624):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1276), ", was ", L_str(____y624))
  else:
    passed = passed + 1
  ____x1278 = [2, 2]
  def __f153(*_args, **_keys):
    __a48 = unstash(_args, _keys)
    return __a48
  ____y625 = apply(__f153, [2, 2])
  if not equal63(____x1278, ____y625):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1278), ", was ", L_str(____y625))
  else:
    passed = passed + 1
  __t7 = object([1])
  __t7["foo"] = 17
  ____x1282 = 17
  def __f154(*_args, **_keys):
    __a49 = unstash(_args, _keys)
    return __a49["foo"]
  ____y626 = apply(__f154, __t7)
  if not equal63(____x1282, ____y626):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1282), ", was ", L_str(____y626))
  else:
    passed = passed + 1
  ____x1283 = 42
  def __f155(*_args, **_keys):
    ____r160 = unstash(_args, _keys)
    ____id41 = ____r160
    __foo4 = has(____id41, "foo")
    return __foo4
  ____x1284 = object([])
  ____x1284["foo"] = 42
  ____y627 = apply(__f155, ____x1284)
  if not equal63(____x1283, ____y627):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1283), ", was ", L_str(____y627))
  else:
    passed = passed + 1
  ____x1285 = 42
  def __f156(__x1286=None):
    ____id42 = __x1286
    __foo5 = has(____id42, "foo")
    return __foo5
  ____x1288 = object([])
  ____x1288["foo"] = 42
  ____y628 = apply(__f156, [____x1288])
  if not equal63(____x1285, ____y628):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1285), ", was ", L_str(____y628))
  else:
    passed = passed + 1
  ____x1289 = 116
  ____y629 = apply(L_43, join([1, 5], [100, 10], []))
  if not equal63(____x1289, ____y629):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1289), ", was ", L_str(____y629))
  else:
    passed = passed + 1
  def __f157(a=None, *_args, **_keys):
    ____r162 = unstash(_args, _keys)
    __a50 = destash33(a, ____r162)
    ____id43 = ____r162
    __b22 = has(____id43, "b")
    return (__a50 or 1) + __b22
  __f5 = __f157
  ____x1293 = 3
  ____x1294 = object([])
  ____x1294["b"] = 2
  ____y630 = apply(__f5, join(____x1294, b=2))
  if not equal63(____x1293, ____y630):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1293), ", was ", L_str(____y630))
  else:
    passed = passed + 1
  ____x1295 = 3
  ____x1297 = object([])
  ____x1297["b"] = 2
  ____y631 = apply(__f5, join([1], ____x1297, b=2))
  if not equal63(____x1295, ____y631):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1295), ", was ", L_str(____y631))
  else:
    passed = passed + 1
  ____x1298 = 3
  ____x1299 = object([1])
  ____x1299["b"] = 42
  ____x1300 = object([])
  ____x1300["b"] = 2
  ____y632 = apply(__f5, join(____x1299, ____x1300, b=2))
  if not equal63(____x1298, ____y632):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1298), ", was ", L_str(____y632))
  else:
    passed = passed + 1
  ____x1301 = 3
  ____x1302 = object([1])
  ____x1302["b"] = 2
  ____x1303 = object([])
  ____x1303["b"] = 42
  ____x1304 = object([])
  ____x1304["b"] = 2
  ____y633 = apply(__f5, join(____x1302, ____x1303, ____x1304))
  if not equal63(____x1301, ____y633):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1301), ", was ", L_str(____y633))
  else:
    passed = passed + 1
  ____x1305 = 3
  ____x1307 = object([])
  ____x1307["b"] = 2
  ____y634 = apply(__f5, join([1], ____x1307, []))
  if not equal63(____x1305, ____y634):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1305), ", was ", L_str(____y634))
  else:
    passed = passed + 1
    return passed

add(tests, ["apply", __f151])
def __f158():
  global passed
  global failed
  __eval = compiler.eval
  ____x1310 = 4
  ____y635 = __eval(["+", 2, 2])
  if not equal63(____x1310, ____y635):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1310), ", was ", L_str(____y635))
  else:
    passed = passed + 1
  ____x1312 = 5
  ____y636 = __eval(["let", "a", 3, ["+", 2, "a"]])
  if not equal63(____x1312, ____y636):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1312), ", was ", L_str(____y636))
  else:
    passed = passed + 1
  ____x1315 = 9
  ____y637 = __eval(["do", ["define", "x", 7], ["+", "x", 2]])
  if not equal63(____x1315, ____y637):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1315), ", was ", L_str(____y637))
  else:
    passed = passed + 1
  ____x1319 = 6
  ____y638 = __eval(["apply", "+", ["quote", [1, 2, 3]]])
  if not equal63(____x1319, ____y638):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1319), ", was ", L_str(____y638))
  else:
    passed = passed + 1
    return passed

add(tests, ["eval", __f158])
def __f159():
  global passed
  global failed
  def __f160():
    return 42
  __f6 = __f160
  ____x1324 = 42
  ____y639 = call(__f6)
  if not equal63(____x1324, ____y639):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1324), ", was ", L_str(____y639))
  else:
    passed = passed + 1
  def __f161():
    return 1
  def __f162():
    return 10
  __fs = [__f161, __f162]
  ____x1326 = [1, 10]
  ____y640 = map(call, __fs)
  if not equal63(____x1326, ____y640):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1326), ", was ", L_str(____y640))
  else:
    passed = passed + 1
  def __f163(x=None, y=None):
    return x + y + 1
  __f7 = __f163
  ____x1328 = 42
  ____y641 = call(__f7, 40, 1)
  if not equal63(____x1328, ____y641):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1328), ", was ", L_str(____y641))
  else:
    passed = passed + 1
    return passed

add(tests, ["call", __f159])
def __f164():
  global passed
  global failed
  ____x1330 = 42
  def __f165(__x1331=None):
    ____id44 = __x1331
    __a51 = has(____id44, 0)
    return __a51
  ____y642 = __f165([42])
  if not equal63(____x1330, ____y642):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1330), ", was ", L_str(____y642))
  else:
    passed = passed + 1
  def __f166(a=None, __x1333=None):
    ____id45 = __x1333
    __b23 = has(____id45, 0)
    __c6 = has(____id45, 1)
    return [a, __b23, __c6]
  __f8 = __f166
  ____x1335 = [1, 2, 3]
  ____y643 = __f8(1, [2, 3])
  if not equal63(____x1335, ____y643):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1335), ", was ", L_str(____y643))
  else:
    passed = passed + 1
  def __f167(a=None, __x1338=None, *_args, **_keys):
    ____r172 = unstash(_args, _keys)
    __a52 = destash33(a, ____r172)
    ____x1338 = destash33(__x1338, ____r172)
    ____id46 = ____x1338
    __b24 = has(____id46, 0)
    __c7 = cut(____id46, 1)
    ____id47 = ____r172
    __d3 = cut(____id47, 0)
    return [__a52, __b24, __c7, __d3]
  __f9 = __f167
  ____x1340 = [1, 2, [3, 4], [5, 6, 7]]
  ____y644 = __f9(1, [2, 3, 4], 5, 6, 7)
  if not equal63(____x1340, ____y644):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1340), ", was ", L_str(____y644))
  else:
    passed = passed + 1
  def __f168(a=None, __x1345=None, *_args, **_keys):
    ____r173 = unstash(_args, _keys)
    __a53 = destash33(a, ____r173)
    ____x1345 = destash33(__x1345, ____r173)
    ____id48 = ____x1345
    __b25 = has(____id48, 0)
    __c8 = cut(____id48, 1)
    ____id49 = ____r173
    __d4 = cut(____id49, 0)
    return [__a53, __b25, __c8, __d4]
  __f10 = __f168
  ____x1347 = [1, 2, [3, 4], [5, 6, 7]]
  ____y645 = apply(__f10, [1, [2, 3, 4], 5, 6, 7])
  if not equal63(____x1347, ____y645):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1347), ", was ", L_str(____y645))
  else:
    passed = passed + 1
  ____x1353 = [3, 4]
  def __f169(a=None, b=None, *_args, **_keys):
    ____r174 = unstash(_args, _keys)
    __a54 = destash33(a, ____r174)
    __b26 = destash33(b, ____r174)
    ____id50 = ____r174
    __c9 = cut(____id50, 0)
    return __c9
  ____y646 = __f169(1, 2, 3, 4)
  if not equal63(____x1353, ____y646):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1353), ", was ", L_str(____y646))
  else:
    passed = passed + 1
  def __f170(w=None, __x1355=None, *_args, **_keys):
    ____r175 = unstash(_args, _keys)
    __w2 = destash33(w, ____r175)
    ____x1355 = destash33(__x1355, ____r175)
    ____id51 = ____x1355
    __x1356 = has(____id51, 0)
    __y647 = cut(____id51, 1)
    ____id52 = ____r175
    __z2 = cut(____id52, 0)
    return [__y647, __z2]
  __f11 = __f170
  ____x1358 = [[3, 4], [5, 6, 7]]
  ____y648 = __f11(1, [2, 3, 4], 5, 6, 7)
  if not equal63(____x1358, ____y648):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1358), ", was ", L_str(____y648))
  else:
    passed = passed + 1
  ____x1363 = 42
  def __f171(*_args, **_keys):
    ____r176 = unstash(_args, _keys)
    ____id53 = ____r176
    __foo6 = has(____id53, "foo")
    return __foo6
  ____y649 = __f171(foo=42)
  if not equal63(____x1363, ____y649):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1363), ", was ", L_str(____y649))
  else:
    passed = passed + 1
  ____x1364 = 42
  def __f172(*_args, **_keys):
    ____r177 = unstash(_args, _keys)
    ____id54 = ____r177
    __foo7 = has(____id54, "foo")
    return __foo7
  ____x1365 = object([])
  ____x1365["foo"] = 42
  ____y650 = apply(__f172, ____x1365)
  if not equal63(____x1364, ____y650):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1364), ", was ", L_str(____y650))
  else:
    passed = passed + 1
  ____x1366 = 42
  def __f173(__x1367=None):
    ____id55 = __x1367
    __foo8 = has(____id55, "foo")
    return __foo8
  ____x1368 = object([])
  ____x1368["foo"] = 42
  ____y651 = __f173(____x1368)
  if not equal63(____x1366, ____y651):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1366), ", was ", L_str(____y651))
  else:
    passed = passed + 1
  def __f174(a=None, __x1369=None, *_args, **_keys):
    ____r179 = unstash(_args, _keys)
    __a55 = destash33(a, ____r179)
    ____x1369 = destash33(__x1369, ____r179)
    ____id56 = ____x1369
    __foo9 = has(____id56, "foo")
    ____id57 = ____r179
    __b27 = has(____id57, "bar")
    return [__a55, __b27, __foo9]
  __f12 = __f174
  ____x1371 = [10, 20, 42]
  ____x1373 = object([])
  ____x1373["foo"] = 42
  ____y652 = __f12(10, ____x1373, bar=20)
  if not equal63(____x1371, ____y652):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1371), ", was ", L_str(____y652))
  else:
    passed = passed + 1
  def __f175(a=None, __x1374=None, *_args, **_keys):
    ____r180 = unstash(_args, _keys)
    __a56 = destash33(a, ____r180)
    ____x1374 = destash33(__x1374, ____r180)
    ____id58 = ____x1374
    __foo10 = has(____id58, "foo")
    ____id59 = ____r180
    __b28 = has(____id59, "bar")
    return [__a56, __b28, __foo10]
  __f13 = __f175
  ____x1376 = [10, 20, 42]
  ____x1379 = object([])
  ____x1379["foo"] = 42
  ____x1378 = object([10, ____x1379])
  ____x1378["bar"] = 20
  ____y653 = apply(__f13, ____x1378)
  if not equal63(____x1376, ____y653):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1376), ", was ", L_str(____y653))
  else:
    passed = passed + 1
  ____x1380 = 1
  def __f176(a=None, *_args, **_keys):
    ____r181 = unstash(_args, _keys)
    __a57 = destash33(a, ____r181)
    ____id60 = ____r181
    __b29 = has(____id60, "b")
    return (__a57 or 0) + __b29
  ____y654 = __f176(b=1)
  if not equal63(____x1380, ____y654):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1380), ", was ", L_str(____y654))
  else:
    passed = passed + 1
  ____x1381 = 1
  def __f177(a=None, *_args, **_keys):
    ____r182 = unstash(_args, _keys)
    __a58 = destash33(a, ____r182)
    ____id61 = ____r182
    __b30 = has(____id61, "b")
    return (__a58 or 0) + __b30
  ____x1382 = object([])
  ____x1382["b"] = 1
  ____y655 = apply(__f177, ____x1382)
  if not equal63(____x1381, ____y655):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1381), ", was ", L_str(____y655))
  else:
    passed = passed + 1
  def __f178(*_args, **_keys):
    __args28 = unstash(_args, _keys)
    return __args28
  __f14 = __f178
  ____x1383 = [1, 2, 3]
  ____y656 = __f14(1, 2, 3)
  if not equal63(____x1383, ____y656):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1383), ", was ", L_str(____y656))
  else:
    passed = passed + 1
  def __f179(*_args, **_keys):
    __args29 = unstash(_args, _keys)
    return __args29
  __f15 = __f179
  ____x1385 = [1, 2, 3]
  ____y657 = apply(__f15, [1, 2, 3])
  if not equal63(____x1385, ____y657):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1385), ", was ", L_str(____y657))
  else:
    passed = passed + 1
  __l11 = []
  def f(*_args, **_keys):
    ____r183 = unstash(_args, _keys)
    ____id62 = ____r183
    __a59 = has(____id62, "a")
    add(__l11, __a59)
    return __a59
  def g(a=None, b=None, *_args, **_keys):
    ____r184 = unstash(_args, _keys)
    __a60 = destash33(a, ____r184)
    __b31 = destash33(b, ____r184)
    ____id63 = ____r184
    __c10 = has(____id63, "c")
    add(__l11, [__a60, __b31, __c10])
    return __c10
  ____x1389 = 42
  ____y658 = f(a=g(f(a=10), f(a=20), c=f(a=42)))
  if not equal63(____x1389, ____y658):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1389), ", was ", L_str(____y658))
  else:
    passed = passed + 1
  ____x1390 = [10, 20, 42, [10, 20, 42], 42]
  ____y659 = __l11
  if not equal63(____x1390, ____y659):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1390), ", was ", L_str(____y659))
  else:
    passed = passed + 1
  __l12 = [None]
  def f(*_args, **_keys):
    __x1394 = unstash(_args, _keys)
    __l12[0] = __x1394
    return __l12[0]
  def g(a=None, b=None, *_args, **_keys):
    ____r185 = unstash(_args, _keys)
    __a61 = destash33(a, ____r185)
    __b32 = destash33(b, ____r185)
    ____id64 = ____r185
    __c11 = has(____id64, "c")
    return __a61 + __b32
  f(g(1, 2, foo=7))
  ____x1395 = [[3]]
  ____y660 = __l12
  if not equal63(____x1395, ____y660):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1395), ", was ", L_str(____y660))
  else:
    passed = passed + 1
  __l13 = [None]
  def f(*_args, **_keys):
    __x1399 = unstash(_args, _keys)
    __l13[0] = __x1399
    return 10
  def g(a=None, b=None, *_args, **_keys):
    ____r186 = unstash(_args, _keys)
    __a62 = destash33(a, ____r186)
    __b33 = destash33(b, ____r186)
    ____id65 = ____r186
    __c12 = has(____id65, "c")
    return f() + __a62 + __b33
  ____x1400 = 13
  ____y661 = g(1, 2, foo=7)
  if not equal63(____x1400, ____y661):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1400), ", was ", L_str(____y661))
  else:
    passed = passed + 1
  ____x1401 = [[]]
  ____y662 = __l13
  if not equal63(____x1401, ____y662):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1401), ", was ", L_str(____y662))
  else:
    passed = passed + 1
  __l14 = [None]
  def f(x=None, *_args, **_keys):
    ____r187 = unstash(_args, _keys)
    __x1405 = destash33(x, ____r187)
    ____id66 = ____r187
    __ys = cut(____id66, 0)
    __l14[0] = __ys
    return __l14[0]
  def g():
    return None
  f(1, "x", g)
  ____x1406 = [["x", g]]
  ____y663 = __l14
  if not equal63(____x1406, ____y663):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1406), ", was ", L_str(____y663))
  else:
    passed = passed + 1
  __l15 = [None]
  def f(*_args, **_keys):
    __x1410 = unstash(_args, _keys)
    __l15[0] = __x1410
    return 10
  def g(a=None, b=None, *_args, **_keys):
    ____r189 = unstash(_args, _keys)
    __a63 = destash33(a, ____r189)
    __b34 = destash33(b, ____r189)
    ____id67 = ____r189
    __c13 = has(____id67, "c")
    __ls = cut(____id67, 0)
    return [f() + __a63 + __b34, __ls]
  ____x1414 = object([3, 4])
  ____x1414["foo"] = 7
  ____x1412 = [13, ____x1414]
  ____y664 = g(1, 2, 3, 4, foo=7)
  if not equal63(____x1412, ____y664):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1412), ", was ", L_str(____y664))
  else:
    passed = passed + 1
  ____x1415 = [[]]
  ____y665 = __l15
  if not equal63(____x1415, ____y665):
    failed = failed + 1
    return cat("failed: expected ", L_str(____x1415), ", was ", L_str(____y665))
  else:
    passed = passed + 1
    return passed

add(tests, ["parameters", __f164])
None
