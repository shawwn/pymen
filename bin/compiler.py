from lumen import *
def getenv(k=None, p=None):
  if string63(k):
    __i = edge(environment)
    while __i >= 0:
      if has63(environment[__i], k):
        __b = environment[__i][k]
        __e46 = None
        if p:
          __e46 = has(__b, p)
        else:
          __e46 = __b
        return __e46
      else:
        __i = __i - 1

def macro_function(k=None):
  return getenv(k, "macro")

def macro63(k=None):
  return is63(macro_function(k))

def special63(k=None):
  return is63(getenv(k, "special"))

def special_form63(form=None):
  return not atom63(form) and special63(hd(form))

def statement63(k=None):
  return special63(k) and getenv(k, "stmt")

def symbol_expansion(k=None):
  return getenv(k, "symbol")

def symbol63(k=None):
  return is63(symbol_expansion(k))

def variable63(k=None):
  return is63(getenv(k, "variable"))

def bound63(x=None):
  return macro63(x) or (special63(x) or (symbol63(x) or variable63(x)))

def keyword63(atom=None):
  return string63(atom) and (L_35(atom) > 1 and char(atom, 0) == ":")

def quoted(form=None):
  if keyword63(form):
    return form
  else:
    if string63(form):
      return escape(form)
    else:
      if atom63(form):
        return form
      else:
        return join(["list"], map(quoted, form))

def literal(s=None):
  if string_literal63(s):
    return s
  else:
    return quoted(s)

def stash42(args=None):
  if props63(args):
    if has(setenv("target", toplevel=True), "value") == "py":
      __l = array(args)
      ____o = args
      __k = None
      for __k in indices(____o):
        __v = ____o[__k]
        if not number63(__k):
          add(__l, ["%literal", __k, "|=|", __v])
      return __l
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        __l1 = array(args)
        ____o1 = args
        __k1 = None
        for __k1 in indices(____o1):
          __v1 = ____o1[__k1]
          if not number63(__k1):
            add(__l1, ["%literal", __k1, "| |", __v1])
        return __l1
      else:
        __l2 = ["%object", "\"_stash\"", True]
        ____o2 = args
        __k2 = None
        for __k2 in indices(____o2):
          __v2 = ____o2[__k2]
          if not number63(__k2):
            add(__l2, literal(__k2))
            add(__l2, __v2)
        return join({}, args, [__l2])
  else:
    return args

def bias(k=None):
  if number63(k):
    if has(setenv("target", toplevel=True), "value") == "lua":
      k = k + 1
    return k
  else:
    return k

def bind(lh=None, rh=None):
  if atom63(lh):
    return [lh, rh]
  else:
    if hd63(lh, ","):
      return bind(cut(lh, 1), rh)
    else:
      if hd(lh) == "t":
        ____id = lh
        ___ = has(____id, 0)
        __var = has(____id, 1)
        __val = has(____id, 2)
        __val1 = either(__val, __var)
        return bind(["o", __var, ["the", __val1]], rh)
      else:
        if hd(lh) == "o":
          ____id1 = lh
          ___1 = has(____id1, 0)
          __var1 = has(____id1, 1)
          __val2 = has(____id1, 2)
          return [__var1, ["if", ["nil?", rh], __val2, rh]]
        else:
          __id2 = unique("id")
          __bs = [__id2, rh]
          ____o3 = lh
          __k3 = None
          for __k3 in indices(____o3):
            __v3 = ____o3[__k3]
            __e47 = None
            if __k3 == "rest":
              __e47 = ["cut", __id2, L_35(lh)]
            else:
              __e47 = ["has", __id2, ["quote", bias(__k3)]]
            __x12 = __e47
            if is63(__k3):
              __e48 = None
              if __v3 == True:
                __e48 = __k3
              else:
                __e48 = __v3
              __k4 = __e48
              __bs = join(__bs, bind(__k4, __x12))
          return __bs

def __arguments37__macro(L_from=None):
  ____x23 = object(["target"])
  ____x23["js"] = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", L_from]
  ____x23["py"] = ["|list|", "|_args|"]
  ____x23["lua"] = ["list", "|...|"]
  return ____x23

setenv("arguments%", macro=__arguments37__macro)
def body_docstring(body=None):
  if L_35(body) > 1 and string_literal63(hd(body)):
    return [hd(body), tl(body)]
  else:
    return [[], body]

def bind42(args=None, body=None):
  __args1 = {}
  def rest():
    __args1["rest"] = True
    ____x34 = object(["target"])
    ____x34["py"] = ["obj", "..."]
    return ["unstash", ["list", "..."], ____x34]
  if atom63(args):
    return [__args1, join(["let", [args, rest()]], body)]
  else:
    ____id3 = body_docstring(body)
    __doc = has(____id3, 0)
    __body = has(____id3, 1)
    __pre = []
    __bs1 = []
    __inits = []
    __r21 = unique("r")
    ____o4 = args
    __k5 = None
    for __k5 in indices(____o4):
      __v4 = ____o4[__k5]
      if number63(__k5):
        if atom63(__v4):
          add(__args1, __v4)
        else:
          if hd(__v4) == "o":
            ____id4 = __v4
            ___2 = has(____id4, 0)
            __var2 = has(____id4, 1)
            __val3 = has(____id4, 2)
            add(__args1, __var2)
            add(__inits, ["%if", ["nil?", __var2], ["%set", __var2, __val3]])
          else:
            if hd(__v4) == "t":
              ____id5 = __v4
              ___3 = has(____id5, 0)
              __var3 = has(____id5, 1)
              __val4 = has(____id5, 2)
              __val5 = either(__val4, __var3)
              add(__args1, __var3)
              add(__inits, ["%if", ["nil?", __var3], ["%set", __var3, ["the", __val5]]])
            else:
              __x46 = unique("x")
              add(__args1, __x46)
              __bs1 = join(__bs1, [__v4, __x46])
    if props63(args):
      __pre = join(__pre, [__r21, rest()])
      __n5 = L_35(__args1)
      __i6 = 0
      while __i6 < __n5:
        __v5 = __args1[__i6]
        __pre = join(__pre, [__v5, ["destash!", __v5, __r21]])
        __i6 = __i6 + 1
      __bs1 = join(__bs1, [props(args), __r21])
    __forms = join(["let", __pre], __inits, [join(["let", __bs1], __body)])
    __e49 = None
    if is63(__doc):
      __e49 = ["do", __doc, __forms]
    else:
      __e49 = __forms
    return [__args1, __e49]

def quoting63(depth=None):
  return number63(depth)

def quasiquoting63(depth=None):
  return quoting63(depth) and depth > 0

def can_unquote63(depth=None):
  return quoting63(depth) and depth == 1

def quasisplice63(x=None, depth=None):
  return can_unquote63(depth) and (not atom63(x) and hd(x) == "unquote-splicing")

def expand_local(__x57=None):
  ____id6 = __x57
  __x58 = has(____id6, 0)
  __name = has(____id6, 1)
  __value = has(____id6, 2)
  setenv(__name, variable=True)
  return ["%local", __name, macroexpand(__value)]

def expand_function(__x60=None):
  ____id7 = __x60
  __x61 = has(____id7, 0)
  __args = has(____id7, 1)
  __body1 = cut(____id7, 2)
  add(environment, {})
  ____r29 = None
  try:
    ____o5 = __args
    ____i7 = None
    for ____i7 in indices(____o5):
      ____x62 = ____o5[____i7]
      setenv(____x62, variable=True)
    ____r29 = join(["%function", __args], macroexpand(__body1))
  finally:
    drop(environment)
  return ____r29

def expand_definition(__x64=None):
  ____id8 = __x64
  __x65 = has(____id8, 0)
  __name1 = has(____id8, 1)
  __args11 = has(____id8, 2)
  __body2 = cut(____id8, 3)
  add(environment, {})
  ____r32 = None
  try:
    ____o6 = __args11
    ____i8 = None
    for ____i8 in indices(____o6):
      ____x66 = ____o6[____i8]
      setenv(____x66, variable=True)
    ____r32 = join([__x65, __name1, __args11], macroexpand(__body2))
  finally:
    drop(environment)
  return ____r32

def expand_macro(form=None):
  return macroexpand(expand1(form))

def expand1(__x68=None):
  ____id9 = __x68
  __name2 = has(____id9, 0)
  __body3 = cut(____id9, 1)
  return apply(macro_function(__name2), __body3)

def real63(x=None):
  return number63(x) and (not nan63(x) and not inf63(x))

def valid_access63(L_str=None):
  return L_35(L_str) > 2 and (not( "." == char(L_str, 0)) and (not( "." == char(L_str, edge(L_str))) and not search(L_str, "..")))

def parse_access(L_str=None):
  def __f2(a=None, b=None):
    __n8 = number(a)
    if is63(__n8):
      return ["at", b, __n8]
    else:
      return ["%idx", b, a]
  return reduce(__f2, reverse(split(L_str, ".")))

def parse_access63(form=None):
  return string63(form) and (not string_literal63(form) and (not id_literal63(form) and (is63(search(form, ".")) and valid_access63(form))))

def macroexpand(form=None):
  if parse_access63(form):
    return macroexpand(parse_access(form))
  else:
    if symbol63(form):
      return macroexpand(symbol_expansion(form))
    else:
      if atom63(form):
        return form
      else:
        __x71 = hd(form)
        if __x71 == "%local":
          return expand_local(form)
        else:
          if __x71 == "%function":
            return expand_function(form)
          else:
            if __x71 == "%global-function":
              return expand_definition(form)
            else:
              if __x71 == "%local-function":
                return expand_definition(form)
              else:
                if __x71 == "%expansion":
                  return form[1]
                else:
                  if macro63(__x71):
                    return expand_macro(form)
                  else:
                    if parse_access63(__x71):
                      return macroexpand(join([parse_access(__x71)], tl(form)))
                    else:
                      return map(macroexpand, form)

def quasiquote_list(form=None, depth=None):
  __xs = [object(["list"])]
  ____o7 = form
  __k6 = None
  for __k6 in indices(____o7):
    __v6 = ____o7[__k6]
    if not number63(__k6):
      __e50 = None
      if quasisplice63(__v6, depth):
        __e50 = quasiexpand(__v6[1])
      else:
        __e50 = quasiexpand(__v6, depth)
      __v7 = __e50
      last(__xs)[__k6] = __v7
  ____x75 = form
  ____i10 = 0
  while ____i10 < L_35(____x75):
    __x76 = ____x75[____i10]
    if quasisplice63(__x76, depth):
      __x77 = quasiexpand(__x76[1])
      add(__xs, __x77)
      add(__xs, ["list"])
    else:
      add(last(__xs), quasiexpand(__x76, depth))
    ____i10 = ____i10 + 1
  def __f3(x=None):
    return L_35(x) > 1 or (not( hd(x) == "list") or props63(x))
  __pruned = keep(__f3, __xs)
  if one63(__pruned):
    return hd(__pruned)
  else:
    return join(["join"], __pruned)

def quasiexpand(form=None, depth=None):
  if quasiquoting63(depth):
    if atom63(form):
      return ["quote", form]
    else:
      if can_unquote63(depth) and hd(form) == "unquote":
        return quasiexpand(form[1])
      else:
        if hd(form) == "unquote" or hd(form) == "unquote-splicing":
          return quasiquote_list(form, depth - 1)
        else:
          if hd(form) == "quasiquote":
            return quasiquote_list(form, depth + 1)
          else:
            return quasiquote_list(form, depth)
  else:
    if atom63(form):
      return form
    else:
      if hd(form) == "quote":
        return form
      else:
        if hd(form) == "quasiquote":
          return quasiexpand(form[1], 1)
        else:
          def __f4(x=None):
            return quasiexpand(x, depth)
          return map(__f4, form)

def expand_if(__x81=None):
  ____id10 = __x81
  __a = has(____id10, 0)
  __b1 = has(____id10, 1)
  __c = cut(____id10, 2)
  if is63(__b1):
    return [join(["%if", __a, __b1], expand_if(__c))]
  else:
    if is63(__a):
      return [__a]

setenv("indent-level", toplevel=True, value=0)
setenv("indent-level", symbol=["get-value", ["quote", "indent-level"]])
def indentation():
  __s = ""
  __i11 = 0
  while __i11 < has(setenv("indent-level", toplevel=True), "value"):
    __s = cat(__s, "  ")
    __i11 = __i11 + 1
  return __s

reserved = {
  "all": {
    "=": True,
    "==": True,
    "+": True,
    "-": True,
    "%": True,
    "*": True,
    "/": True,
    "<": True,
    ">": True,
    "<=": True,
    ">=": True
  },
  "js": {
    "break": True,
    "case": True,
    "catch": True,
    "class": True,
    "const": True,
    "continue": True,
    "debugger": True,
    "default": True,
    "delete": True,
    "do": True,
    "else": True,
    "eval": True,
    "finally": True,
    "for": True,
    "function": True,
    "if": True,
    "import": True,
    "in": True,
    "instanceof": True,
    "let": True,
    "return": True,
    "switch": True,
    "throw": True,
    "try": True,
    "typeof": True,
    "var": True,
    "void": True,
    "with": True
  },
  "lua": {
    "and": True,
    "end": True,
    "in": True,
    "load": True,
    "repeat": True,
    "while": True,
    "break": True,
    "false": True,
    "local": True,
    "return": True,
    "do": True,
    "for": True,
    "nil": True,
    "then": True,
    "else": True,
    "function": True,
    "not": True,
    "true": True,
    "elseif": True,
    "if": True,
    "or": True,
    "until": True
  },
  "py": {
    "and": True,
    "except": True,
    "lambda": True,
    "with": True,
    "as": True,
    "finally": True,
    "nonlocal": True,
    "while": True,
    "assert": True,
    "false": True,
    "None": True,
    "yield": True,
    "break": True,
    "for": True,
    "not": True,
    "class": True,
    "from": True,
    "or": True,
    "continue": True,
    "global": True,
    "pass": True,
    "def": True,
    "if": True,
    "raise": True,
    "del": True,
    "import": True,
    "return": True,
    "elif": True,
    "in": True,
    "True": True,
    "else": True,
    "is": True,
    "try": True,
    "str": True,
    "print": True
  },
  "cmake": {
    "AND": True,
    "OR": True,
    "TRUE": True,
    "FALSE": True,
    "ON": True,
    "OFF": True,
    "Y": True,
    "N": True
  }
}
def reserved63(x=None):
  return has63(reserved["all"], x) or has63(reserved[has(setenv("target", toplevel=True), "value")], x)

def valid_code63(n=None):
  return number_code63(n) or (n > 64 and n < 91 or (n > 96 and n < 123 or n == 95))

def compile_keyword(x=None):
  return escape(x)

def compile_name(name=None):
  if keyword63(name):
    return compile(clip(name, 1))
  else:
    return compile(name)

def compile_id(id=None, raw63=None):
  if keyword63(id):
    return compile_keyword(id)
  else:
    if code(id, 0) == 46:
      return cat(".", compile_id(clip(id, 1), True))
    else:
      __e51 = None
      if has(setenv("target", toplevel=True), "value") == "py":
        __e51 = "L_"
      else:
        __e51 = "_"
      __x87 = __e51
      __e52 = None
      if number_code63(code(id, 0)):
        __e52 = __x87
      else:
        __e52 = ""
      __id11 = __e52
      __i12 = 0
      while __i12 < L_35(id):
        __c1 = char(id, __i12)
        __n10 = code(__c1)
        __e53 = None
        if __c1 == "-" and not( id == "-"):
          __e56 = None
          if __i12 == 0:
            __e56 = __x87
          else:
            __e56 = "_"
          __e53 = __e56
        else:
          __e54 = None
          if valid_code63(__n10):
            __e54 = __c1
          else:
            __e55 = None
            if __i12 == 0:
              __e55 = cat(__x87, __n10)
            else:
              __e55 = __n10
            __e54 = __e55
          __e53 = __e54
        __c11 = __e53
        __id11 = cat(__id11, __c11)
        __i12 = __i12 + 1
      if raw63:
        return __id11
      else:
        if reserved63(__id11):
          return cat(__x87, __id11)
        else:
          return __id11

def valid_id63(x=None):
  return some63(x) and x == compile_id(x)

__names = {}
def unique(x=None):
  __x88 = compile_id(x)
  if has63(__names, __x88):
    __i13 = __names[__x88]
    __names[__x88] = __names[__x88] + 1
    return unique(cat(__x88, __i13))
  else:
    __names[__x88] = 1
    return cat("__", __x88)

def key(k=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    return compile(k)
  else:
    if string_literal63(k):
      __i14 = inner(k)
      if has(setenv("target", toplevel=True), "value") == "cmake":
        __e57 = None
        if valid_id63(__i14):
          __e57 = __i14
        else:
          __e57 = k
        return screamcase(__e57)
      else:
        if valid_id63(__i14):
          return __i14
        else:
          return cat("[", k, "]")
    else:
      return cat("[", compile(k), "]")

def mapo(f=None, t=None):
  __o8 = []
  ____o9 = t
  __k7 = None
  for __k7 in indices(____o9):
    __v8 = ____o9[__k7]
    __x89 = f(__v8)
    if is63(__x89):
      add(__o8, literal(__k7))
      add(__o8, __x89)
  return __o8

____x91 = object([])
____x92 = object([])
____x92["js"] = "!"
____x92["lua"] = "not"
____x92["py"] = "not"
____x92["cmake"] = "NOT"
____x91["%not"] = ____x92
____x91["%unm"] = "-"
____x93 = object([])
____x93["%mul"] = "*"
____x93["%div"] = "/"
____x93["%idiv"] = "//"
____x93["%mod"] = "%"
____x94 = object([])
____x95 = object([])
____x95["js"] = "+"
____x95["lua"] = ".."
____x95["py"] = "+"
____x94["%cat"] = ____x95
____x96 = object([])
____x96["%add"] = "+"
____x96["%sub"] = "-"
____x97 = object([])
____x98 = object([])
____x98["cmake"] = "LESS"
____x98["all"] = "<"
____x97["%lt"] = ____x98
____x99 = object([])
____x99["cmake"] = "GREATER"
____x99["all"] = ">"
____x97["%gt"] = ____x99
____x100 = object([])
____x100["cmake"] = "LESS_EQUAL"
____x100["all"] = "<="
____x97["%le"] = ____x100
____x101 = object([])
____x101["cmake"] = "GREATER_EQUAL"
____x101["all"] = ">="
____x97["%ge"] = ____x101
____x102 = object([])
____x103 = object([])
____x103["js"] = "==="
____x103["lua"] = "=="
____x103["py"] = "=="
____x102["%eq"] = ____x103
____x104 = object([])
____x105 = object([])
____x105["py"] = "in"
____x104["%in"] = ____x105
____x106 = object([])
____x106["py"] = "is"
____x104["%is"] = ____x106
____x107 = object([])
____x108 = object([])
____x108["js"] = "&&"
____x108["lua"] = "and"
____x108["py"] = "and"
____x108["cmake"] = "AND"
____x107["%and"] = ____x108
____x109 = object([])
____x110 = object([])
____x110["js"] = "||"
____x110["lua"] = "or"
____x110["py"] = "or"
____x110["cmake"] = "OR"
____x109["%or"] = ____x110
infix = [____x91, ____x93, ____x94, ____x96, ____x97, ____x102, ____x104, ____x107, ____x109]
def unary63(form=None):
  return two63(form) and in63(hd(form), ["%not", "%unm"])

def index(k=None):
  return k

def precedence(form=None):
  if not( atom63(form) or unary63(form)):
    if atom63(hd(form)):
      ____o10 = infix
      __k8 = None
      for __k8 in indices(____o10):
        __v9 = ____o10[__k8]
        if has63(__v9, hd(form)):
          return index(__k8)
  return 0

def getop(op=None):
  if string63(op):
    def __f5(level=None):
      __x112 = has(level, op)
      if __x112 == True:
        return op
      else:
        if string63(__x112):
          return __x112
        else:
          if is63(__x112):
            return has(__x112, has(setenv("target", toplevel=True), "value")) or has(__x112, "all")
    return find(__f5, infix)

def infix63(x=None):
  return is63(getop(x))

def infix_operator63(x=None):
  return not atom63(x) and infix63(hd(x))

def compile_args(args=None, default63=None):
  __s1 = "("
  __c2 = ""
  ____x113 = args
  ____i17 = 0
  while ____i17 < L_35(____x113):
    __x114 = ____x113[____i17]
    __s1 = cat(__s1, __c2, compile(__x114))
    if (has(setenv("target", toplevel=True), "value") == "py" or has(setenv("target", toplevel=True), "value") == "cmake") and (default63 and (not id_literal63(__x114) and not( __x114 == "..."))):
      __e58 = None
      if has(setenv("target", toplevel=True), "value") == "cmake":
        __e58 = ""
      else:
        __e58 = "=None"
      __s1 = cat(__s1, __e58)
    __e59 = None
    if has(setenv("target", toplevel=True), "value") == "cmake":
      __e59 = " "
    else:
      __e59 = ", "
    __c2 = __e59
    ____i17 = ____i17 + 1
  return cat(__s1, ")")

def escape_newlines(s=None):
  if nil63(search(s, "\n")) and nil63(search(s, "\r")):
    return s
  else:
    __s11 = ""
    __i18 = 0
    while __i18 < L_35(s):
      __c3 = char(s, __i18)
      __e60 = None
      if __c3 == "\n":
        __e60 = "\\n"
      else:
        __e61 = None
        if __c3 == "\r":
          __e61 = "\\r"
        else:
          __e61 = __c3
        __e60 = __e61
      __s11 = cat(__s11, __e60)
      __i18 = __i18 + 1
    return __s11

def compile_nil():
  if has(setenv("target", toplevel=True), "value") == "py":
    return "None"
  else:
    if has(setenv("target", toplevel=True), "value") == "cmake":
      return "\"\""
    else:
      if has(setenv("target", toplevel=True), "value") == "lua":
        return "nil"
      else:
        return "undefined"

def compile_boolean(x=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    if x:
      return "True"
    else:
      return "False"
  else:
    if has(setenv("target", toplevel=True), "value") == "cmake":
      if x:
        return "ON"
      else:
        return "OFF"
    else:
      if x:
        return "true"
      else:
        return "false"

def triple_quoted63(x=None):
  return string_literal63(x) and (string_literal63(inner(x)) and string_literal63(inner(inner(x))))

def un_triple_quote(x=None):
  return escape(inner(inner(inner(x))))

def compile_string(x=None):
  if triple_quoted63(x):
    if has(setenv("target", toplevel=True), "value") == "py":
      return x
    else:
      return escape_newlines(un_triple_quote(x))
  else:
    return escape_newlines(x)

def compile_rest():
  if has(setenv("target", toplevel=True), "value") == "py":
    return "*_args, **_keys"
  else:
    if has(setenv("target", toplevel=True), "value") == "js":
      return cat("...", compile("*args"))
    else:
      return "..."

def compile_atom(x=None, raw63=None):
  if x == "nil":
    return compile_nil()
  else:
    if x == "...":
      return compile_rest()
    else:
      if id_literal63(x):
        return inner(x)
      else:
        if string_literal63(x):
          return compile_string(x)
        else:
          if string63(x):
            return compile_id(x, raw63)
          else:
            if boolean63(x):
              return compile_boolean(x)
            else:
              if nan63(x):
                return "nan"
              else:
                if x == inf:
                  return "inf"
                else:
                  if x == L_inf:
                    return "-inf"
                  else:
                    if number63(x):
                      return cat(x, "")
                    else:
                      raise Exception(cat("Cannot compile atom: ", L_str(x)))

def terminator(stmt63=None):
  if not stmt63:
    return ""
  else:
    if has(setenv("target", toplevel=True), "value") == "js":
      return ";\n"
    else:
      return "\n"

def compile_special(form=None, stmt63=None):
  ____id111 = form
  __x115 = has(____id111, 0)
  __args2 = cut(____id111, 1)
  ____id12 = getenv(__x115)
  __special = has(____id12, "special")
  __stmt = has(____id12, "stmt")
  __self_tr63 = has(____id12, "tr")
  __e62 = None
  if stmt63 and not __stmt:
    __e62 = indentation()
  else:
    __e62 = ""
  __p = __e62
  __tr = terminator(stmt63 and not __self_tr63)
  return cat(__p, apply(__special, __args2), __tr)

def parenthesize_call63(x=None):
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0

def method_call63(form=None):
  __e63 = None
  if list63(form):
    __e63 = hd(form)
  else:
    __e63 = form
  __x116 = __e63
  return string63(__x116) and (L_35(__x116, 1) > 1 and char(__x116, 0) == ".")

def compile_call(form=None):
  __f = hd(form)
  __f1 = compile_name(__f)
  __args3 = stash42(tl(form))
  __e64 = None
  if method_call63(hd(__args3)):
    __e64 = mapcat(compile, __args3, "")
  else:
    __e64 = compile_args(__args3)
  __args4 = __e64
  if parenthesize_call63(__f):
    return cat("(", __f1, ")", __args4)
  else:
    return cat(__f1, __args4)

def op_delims(parent=None, child=None, *_args, **_keys):
  ____r77 = unstash(_args, _keys)
  __parent = destash33(parent, ____r77)
  __child = destash33(child, ____r77)
  ____id13 = ____r77
  __right = has(____id13, "right")
  __e65 = None
  if __right:
    __e65 = L_6261
  else:
    __e65 = L_62
  if __e65(precedence(__child), precedence(__parent)):
    return ["(", ")"]
  else:
    return ["", ""]

def compile_infix(form=None):
  ____id14 = form
  __op = has(____id14, 0)
  ____id15 = cut(____id14, 1)
  __a1 = has(____id15, 0)
  __b2 = has(____id15, 1)
  ____id16 = op_delims(form, __a1)
  __ao = has(____id16, 0)
  __ac = has(____id16, 1)
  ____id17 = op_delims(form, __b2, right=True)
  __bo = has(____id17, 0)
  __bc = has(____id17, 1)
  __a2 = compile(__a1)
  __b3 = compile(__b2)
  __op1 = getop(__op)
  if unary63(form):
    return cat(__op1, __ao, " ", __a2, __ac)
  else:
    return cat(__ao, __a2, __ac, " ", __op1, " ", __bo, __b3, __bc)

def compile_body(body=None):
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
  ____x119 = compile(body, stmt=True)
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __s2 = ____x119
  if has(setenv("target", toplevel=True), "value") == "py" and none63(__s2):
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
    ____x120 = cat(indentation(), "pass\n")
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
    return ____x120
  else:
    return __s2

def compile_function(args=None, body=None, *_args, **_keys):
  ____r80 = unstash(_args, _keys)
  __args5 = destash33(args, ____r80)
  __body4 = destash33(body, ____r80)
  ____id18 = ____r80
  __name3 = has(____id18, "name")
  __prefix = has(____id18, "prefix")
  __async = has(____id18, "async")
  __e66 = None
  if __name3:
    __e66 = compile_name(__name3)
  else:
    __e66 = ""
  __id19 = __e66
  __e67 = None
  if has(__args5, "rest"):
    __e67 = join(__args5, ["..."])
  else:
    __e67 = __args5
  __args12 = __e67
  __e68 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e68 = compile_args(join([["%literal", __id19]], __args12), True)
  else:
    __e68 = compile_args(__args12, True)
  __args6 = __e68
  __body5 = compile_body(__body4)
  __ind = indentation()
  __e69 = None
  if __prefix:
    __e69 = cat(__prefix, " ")
  else:
    __e69 = ""
  __p1 = __e69
  __e70 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e70 = ""
  else:
    __e71 = None
    if has(setenv("target", toplevel=True), "value") == "cmake":
      __e71 = "endfunction()"
    else:
      __e71 = "end"
    __e70 = __e71
  __tr1 = __e70
  __e72 = None
  if __async and not( has(setenv("target", toplevel=True), "value") == "lua"):
    __e72 = "async "
  else:
    __e72 = ""
  __a3 = __e72
  if __name3:
    __tr1 = cat(__tr1, "\n")
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__a3, "function ", __id19, __args6, " {\n", __body5, __ind, "}", __tr1)
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      __e73 = None
      if none63(__ind):
        __e73 = "\n"
      else:
        __e73 = ""
      __ws = __e73
      return cat(__a3, "def ", __id19, __args6, ":\n", __body5, __ws)
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        return cat(__a3, "function", __args6, "\n", __body5, __ind, __tr1)
      else:
        return cat(__p1, "function ", __id19, __args6, "\n", __body5, __ind, __tr1)

def can_return63(form=None):
  return is63(form) and (atom63(form) or not( hd(form) == "%return") and not statement63(hd(form)))

def compile(form=None, raw63=None, *_args, **_keys):
  ____r82 = unstash(_args, _keys)
  __form = destash33(form, ____r82)
  __raw63 = destash33(raw63, ____r82)
  ____id20 = ____r82
  __stmt1 = has(____id20, "stmt")
  if nil63(__form):
    return ""
  else:
    if special_form63(__form):
      return compile_special(__form, __stmt1)
    else:
      __tr2 = terminator(__stmt1)
      __e74 = None
      if __stmt1:
        __e74 = indentation()
      else:
        __e74 = ""
      __ind1 = __e74
      __e75 = None
      if atom63(__form):
        __e75 = compile_atom(__form, __raw63)
      else:
        __e76 = None
        if infix63(hd(__form)):
          __e76 = compile_infix(__form)
        else:
          __e76 = compile_call(__form)
        __e75 = __e76
      __form1 = __e75
      return cat(__ind1, __form1, __tr2)

def lower_statement(form=None, tail63=None):
  __hoist = []
  __e = lower(form, __hoist, True, tail63)
  __e77 = None
  if some63(__hoist) and is63(__e):
    __e77 = join(["%do"], __hoist, [__e])
  else:
    __e78 = None
    if is63(__e):
      __e78 = __e
    else:
      __e79 = None
      if L_35(__hoist) > 1:
        __e79 = join(["%do"], __hoist)
      else:
        __e79 = hd(__hoist)
      __e78 = __e79
    __e77 = __e78
  return either(__e77, ["%do"])

def lower_body(body=None, tail63=None):
  return lower_statement(join(["%do"], body), tail63)

def literal63(form=None):
  return atom63(form) or (hd(form) == "%array" or (hd(form) == "%object" or (hd(form) == "%list" or hd(form) == ",")))

def standalone63(form=None):
  return not( has(setenv("target", toplevel=True), "value") == "lua") and string_literal63(form) or (not atom63(form) and (not infix63(hd(form)) and (not literal63(form) and not( "%get" == hd(form)))) or id_literal63(form))

def lower_do(args=None, hoist=None, stmt63=None, tail63=None):
  ____x129 = almost(args)
  ____i19 = 0
  while ____i19 < L_35(____x129):
    __x130 = ____x129[____i19]
    ____y = lower(__x130, hoist, stmt63)
    if yes(____y):
      __e1 = ____y
      if standalone63(__e1):
        add(hoist, __e1)
    ____i19 = ____i19 + 1
  __e2 = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(__e2):
    return ["%return", __e2]
  else:
    return __e2

def lower_set(args=None, hoist=None, stmt63=None, tail63=None):
  ____id21 = args
  __lh = has(____id21, 0)
  __rh = has(____id21, 1)
  __lh1 = lower(__lh, hoist)
  __rh1 = lower(__rh, hoist)
  add(hoist, ["%set", __lh1, __rh1])
  if not( stmt63 and not tail63 or False):
    return __lh1

def lower_if(args=None, hoist=None, stmt63=None, tail63=None):
  ____id22 = args
  __cond = has(____id22, 0)
  __then = has(____id22, 1)
  __L_else = has(____id22, 2)
  if stmt63:
    __e81 = None
    if is63(__L_else):
      __e81 = [lower_body([__L_else], tail63)]
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([__then], tail63)], __e81))
  else:
    __e3 = unique("e")
    add(hoist, ["%local", __e3, "nil"])
    __e80 = None
    if is63(__L_else):
      __e80 = [lower(["%set", __e3, __L_else])]
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, __then])], __e80))
    if has(setenv("target", toplevel=True), "value") == "cmake":
      return ["%id", __e3]
    else:
      return __e3

def lower_short(x=None, args=None, hoist=None):
  ____id23 = args
  __a4 = has(____id23, 0)
  __b4 = has(____id23, 1)
  __hoist1 = []
  __b11 = lower(__b4, __hoist1)
  if some63(__hoist1):
    __id24 = unique("id")
    __e82 = None
    if x == "%and":
      __e82 = ["%if", __id24, __b4, __id24]
    else:
      __e82 = ["%if", __id24, __id24, __b4]
    return lower(["%do", ["%local", __id24, __a4], __e82], hoist)
  else:
    return [x, lower(__a4, hoist), __b11]

def lower_try(args=None, hoist=None, tail63=None):
  return add(hoist, ["%try", lower_body(args, tail63)])

def lower_while(args=None, hoist=None):
  ____id25 = args
  __c4 = has(____id25, 0)
  __body6 = cut(____id25, 1)
  __pre1 = []
  __c5 = lower(__c4, __pre1)
  __e83 = None
  if none63(__pre1):
    __e83 = ["%while", __c5, lower_body(__body6)]
  else:
    __e83 = ["%while", True, join(["%do"], __pre1, [["%if", ["%not", __c5], ["%break"]], lower_body(__body6)])]
  return add(hoist, __e83)

def lower_for(args=None, hoist=None):
  ____id26 = args
  __h = has(____id26, 0)
  __k9 = has(____id26, 1)
  __body7 = cut(____id26, 2)
  return add(hoist, join(["%for", lower(__h, hoist), __k9, lower_body(__body7)], props(__body7)))

def lower_with(args=None, hoist=None, stmt63=None, tail63=None):
  ____id27 = args
  __h1 = has(____id27, 0)
  __body8 = cut(____id27, 1)
  if stmt63 and not tail63:
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body8, tail63)], props(__body8)))
  else:
    __e4 = unique("e")
    add(hoist, ["%local", __e4])
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e4, join(["%do"], __body8)])], props(__body8)))
    return __e4

def lower_block(kind=None, args=None, hoist=None, stmt63=None, tail63=None):
  ____id28 = args
  __name4 = has(____id28, 0)
  __h2 = has(____id28, 1)
  __body9 = cut(____id28, 2)
  return add(hoist, [kind, __name4, lower(__h2, hoist), lower_body(__body9, tail63)])

def lower_from(args=None, hoist=None, stmt63=None, tail63=None):
  ____id29 = args
  __name5 = has(____id29, 0)
  __import_ = has(____id29, 1)
  __id30 = has(____id29, 2)
  __as_ = has(____id29, 3)
  __alias = has(____id29, 4)
  add(hoist, join(["from"], args))
  return __alias or __id30

def lower_import(__x164=None, hoist=None, stmt63=None, tail63=None):
  ____id31 = __x164
  __name6 = has(____id31, 0)
  __alias1 = cut(____id31, 1)
  __e84 = None
  if hd(__alias1) == "as":
    __e84 = __alias1[1]
  else:
    __e84 = hd(__alias1)
  __L_as = __e84
  __id32 = __L_as or __name6
  add(hoist, join(["import", __name6], __alias1))
  if not stmt63:
    return __id32

def lower_function(args=None, hoist=None):
  if has(setenv("target", toplevel=True), "value") == "py" or has(setenv("target", toplevel=True), "value") == "cmake":
    __f11 = unique("f")
    return lower(["%do", join(["%local-function", __f11], args), __f11], hoist)
  else:
    ____id33 = args
    __a5 = has(____id33, 0)
    __body10 = cut(____id33, 1)
    return join(["%function", __a5, lower_body(__body10, True)], props(__body10))

def lower_definition(kind=None, args=None, hoist=None):
  ____id34 = args
  __name7 = has(____id34, 0)
  __args7 = has(____id34, 1)
  __body11 = cut(____id34, 2)
  return add(hoist, join([kind, __name7, __args7, lower_body(__body11, True)], props(__body11)))

def lower_call(form=None, hoist=None):
  def __f6(x=None):
    return lower(x, hoist)
  __form2 = map(__f6, form)
  if some63(__form2):
    return __form2

def pairwise63(form=None):
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"])

def lower_pairwise(form=None):
  if pairwise63(form):
    __e5 = []
    ____id35 = form
    __x171 = has(____id35, 0)
    __args8 = cut(____id35, 1)
    def __f7(a=None, b=None):
      add(__e5, [__x171, a, b])
      return a
    reduce(__f7, __args8)
    return join(["%and"], reverse(__e5))
  else:
    return form

def lower_infix63(form=None):
  return infix63(hd(form)) and L_35(form) > 3

def lower_infix(form=None, hoist=None):
  __form3 = lower_pairwise(form)
  ____id36 = __form3
  __x174 = has(____id36, 0)
  __args9 = cut(____id36, 1)
  def __f8(a=None, b=None):
    return [__x174, b, a]
  return lower(reduce(__f8, reverse(__args9)), hoist)

def lower_special(form=None, hoist=None):
  __e6 = lower_call(form, hoist)
  if __e6:
    return add(hoist, __e6)

def lower(form=None, hoist=None, stmt63=None, tail63=None):
  if atom63(form):
    return form
  else:
    if empty63(form):
      return ["%array"]
    else:
      if nil63(hoist):
        return lower_statement(form)
      else:
        if lower_infix63(form):
          return lower_infix(form, hoist)
        else:
          ____id37 = form
          __x177 = has(____id37, 0)
          __args10 = cut(____id37, 1)
          if __x177 == "%do":
            return lower_do(__args10, hoist, stmt63, tail63)
          else:
            if __x177 == "%call":
              return lower(__args10, hoist, stmt63, tail63)
            else:
              if __x177 == "%set":
                return lower_set(__args10, hoist, stmt63, tail63)
              else:
                if __x177 == "%if":
                  return lower_if(__args10, hoist, stmt63, tail63)
                else:
                  if __x177 == "%try":
                    return lower_try(__args10, hoist, tail63)
                  else:
                    if __x177 == "%while":
                      return lower_while(__args10, hoist)
                    else:
                      if __x177 == "%for":
                        return lower_for(__args10, hoist)
                      else:
                        if __x177 == "%with":
                          return lower_with(__args10, hoist, stmt63, tail63)
                        else:
                          if __x177 == "%block":
                            return lower_block("%block", __args10, hoist, stmt63, tail63)
                          else:
                            if __x177 == "%cases":
                              return lower_cases(__args10, hoist, stmt63, tail63)
                            else:
                              if __x177 == "import":
                                return lower_import(__args10, hoist, stmt63, tail63)
                              else:
                                if __x177 == "from":
                                  return lower_from(__args10, hoist, stmt63, tail63)
                                else:
                                  if __x177 == "%function":
                                    return lower_function(__args10, hoist)
                                  else:
                                    if __x177 == "%local-function" or __x177 == "%global-function":
                                      return lower_definition(__x177, __args10, hoist)
                                    else:
                                      if in63(__x177, ["%and", "%or"]):
                                        return lower_short(__x177, __args10, hoist)
                                      else:
                                        if statement63(__x177):
                                          return lower_special(form, hoist)
                                        else:
                                          return lower_call(form, hoist)

def expand(form=None):
  return lower(macroexpand(form))

def run(code=None, globals=None, locals=None):
  __globals = either(globals, lumen_globals)
  __locals = either(locals, __globals)
  exec(code, __globals, __locals)
  return None

def eval_result(globals=None, locals=None):
  __state = locals or (globals or lumen_globals)
  return __state["lumen_result"]

def eval(form=None, globals=None, locals=None):
  __previous = has(setenv("target", toplevel=True), "value")
  setenv("target", toplevel=True)["value"] = "py"
  __code = compile(expand(["%set", "lumen-result", form]))
  setenv("target", toplevel=True)["value"] = __previous
  run(__code, globals, locals)
  return eval_result(globals, locals)

def immediate_call63(x=None):
  return not atom63(x) and (not atom63(hd(x)) and hd(hd(x)) == "%function")

def __L_37do__special(*_args, **_keys):
  __forms2 = unstash(_args, _keys)
  __s4 = ""
  ____x183 = __forms2
  ____i21 = 0
  while ____i21 < L_35(____x183):
    __x184 = ____x183[____i21]
    if has(setenv("target", toplevel=True), "value") == "lua" and (immediate_call63(__x184) and "\n" == char(__s4, edge(__s4))):
      __s4 = cat(clip(__s4, 0, edge(__s4)), ";\n")
    __s4 = cat(__s4, compile(__x184, stmt=True))
    if not atom63(__x184):
      if hd(__x184) == "%return" or hd(__x184) == "%break":
        break
    ____i21 = ____i21 + 1
  return __s4

setenv("%do", special=__L_37do__special, stmt=True, tr=True)
def __L_37cmake_block__special(body=None):
  __ind3 = indentation()
  __s6 = ""
  __s6 = cat(__s6, __ind3, "block(SCOPE_FOR VARIABLES)\n")
  __s6 = cat(__s6, compile_body(body))
  __s6 = cat(__s6, __ind3, "endblock()\n")
  return __s6

setenv("%cmake-block", special=__L_37cmake_block__special, stmt=True, tr=True)
def __L_37if__special(cond=None, cons=None, alt=None):
  __cond2 = compile(cond)
  __cons1 = compile_body(cons)
  __e85 = None
  if alt:
    __e85 = compile_body(alt)
  __alt1 = __e85
  __ind5 = indentation()
  __s8 = ""
  if has(setenv("target", toplevel=True), "value") == "js":
    __s8 = cat(__s8, __ind5, "if (", __cond2, ") {\n", __cons1, __ind5, "}")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      __s8 = cat(__s8, __ind5, "if ", __cond2, ":\n", __cons1)
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        __s8 = cat(__s8, __ind5, "if(", __cond2, ")\n", __cons1)
      else:
        __s8 = cat(__s8, __ind5, "if ", __cond2, " then\n", __cons1)
  if __alt1 and has(setenv("target", toplevel=True), "value") == "js":
    __s8 = cat(__s8, " else {\n", __alt1, __ind5, "}")
  else:
    if __alt1 and has(setenv("target", toplevel=True), "value") == "py":
      __s8 = cat(__s8, __ind5, "else:\n", __alt1)
    else:
      if __alt1 and has(setenv("target", toplevel=True), "value") == "cmake":
        __s8 = cat(__s8, __ind5, "else()\n", __alt1)
      else:
        if __alt1:
          __s8 = cat(__s8, __ind5, "else\n", __alt1)
  if has(setenv("target", toplevel=True), "value") == "lua":
    return cat(__s8, __ind5, "end\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "js":
      return cat(__s8, "\n")
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        return cat(__s8, __ind5, "endif()\n")
      else:
        return __s8

setenv("%if", special=__L_37if__special, stmt=True, tr=True)
def __L_37while__special(cond=None, form=None):
  __cond4 = compile(cond)
  __body13 = compile_body(form)
  __ind7 = indentation()
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__ind7, "while (", __cond4, ") {\n", __body13, __ind7, "}\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      return cat(__ind7, "while ", __cond4, ":\n", __body13)
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        return cat(__ind7, "while(", __cond4, ")\n", __body13, __ind7, "endwhile()\n")
      else:
        return cat(__ind7, "while ", __cond4, " do\n", __body13, __ind7, "end\n")

setenv("%while", special=__L_37while__special, stmt=True, tr=True)
def __L_37for__special(t=None, k=None, form=None, *_args, **_keys):
  ____r122 = unstash(_args, _keys)
  __t2 = destash33(t, ____r122)
  __k12 = destash33(k, ____r122)
  __form5 = destash33(form, ____r122)
  ____id39 = ____r122
  __async2 = has(____id39, "async")
  __t3 = compile(__t2)
  __k13 = compile(__k12)
  __ind9 = indentation()
  __body15 = compile_body(__form5)
  __e86 = None
  if __async2:
    __e86 = "async "
  else:
    __e86 = ""
  __a7 = __e86
  if has(setenv("target", toplevel=True), "value") == "lua":
    return cat(__ind9, "for ", __k13, " in next, ", __t3, " do\n", __body15, __ind9, "end\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      return cat(__ind9, __a7, "for ", __k13, " in ", __t3, ":\n", __body15)
    else:
      return cat(__ind9, "for (", __k13, " in ", __t3, ") {\n", __body15, __ind9, "}\n")

setenv("%for", special=__L_37for__special, stmt=True, tr=True)
def __L_37with__special(t=None, form=None, *_args, **_keys):
  ____r124 = unstash(_args, _keys)
  __t6 = destash33(t, ____r124)
  __form7 = destash33(form, ____r124)
  ____id41 = ____r124
  __async4 = has(____id41, "async")
  __t7 = compile(__t6)
  __ind11 = indentation()
  __body17 = compile_body(__form7)
  __e87 = None
  if __async4:
    __e87 = "async "
  else:
    __e87 = ""
  __a9 = __e87
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(__ind11, __a9, "with ", __t7, ":\n", __body17)
  else:
    return ""

setenv("%with", special=__L_37with__special, stmt=True, tr=True)
def __L_37block__special(name=None, t=None, form=None):
  __t9 = compile(t)
  __ind13 = indentation()
  __body19 = compile_body(form)
  __e88 = None
  if some63(__t9):
    __e88 = " "
  else:
    __e88 = ""
  __sep1 = __e88
  __e89 = None
  if some63(__t9):
    __e89 = "("
  else:
    __e89 = ""
  __lh2 = __e89
  __e90 = None
  if some63(__t9):
    __e90 = ")"
  else:
    __e90 = ""
  __rh2 = __e90
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(__ind13, name, __sep1, __t9, ":\n", __body19)
  else:
    return cat(__ind13, name, __sep1, __lh2, __t9, __rh2, __sep1, "{\n", __body19, __ind13, "}\n")

setenv("%block", special=__L_37block__special, stmt=True, tr=True)
def __L_37try__special(form=None):
  __ind15 = indentation()
  __body21 = compile_body(form)
  __e91 = None
  if has(setenv("target", toplevel=True), "value") == "py":
    __e91 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", False, ["%get", "e", 1], "e"]]]
  else:
    __e91 = ["%return", ["%array", False, "e"]]
  __hf1 = __e91
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
  ____x208 = compile(__hf1, stmt=True)
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __h4 = ____x208
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__ind15, "try {\n", __body21, __ind15, "}\n", __ind15, "catch (e) {\n", __h4, __ind15, "}\n")
  else:
    return cat(__ind15, "try:\n", __body21, __ind15, "except:\n", __h4)

setenv("%try", special=__L_37try__special, stmt=True, tr=True)
def __L_37delete__special(place=None):
  __e92 = None
  if has(setenv("target", toplevel=True), "value") == "py":
    __e92 = "del "
  else:
    __e92 = "delete "
  return cat(indentation(), __e92, compile(place))

setenv("%delete", special=__L_37delete__special, stmt=True)
def __L_37break__special():
  __e93 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e93 = "()"
  else:
    __e93 = ""
  return cat(indentation(), "break", __e93)

setenv("%break", special=__L_37break__special, stmt=True)
def __L_37function__special(args=None, *_args, **_keys):
  ____r134 = unstash(_args, _keys)
  __args121 = destash33(args, ____r134)
  ____id43 = ____r134
  __body23 = cut(____id43, 0)
  return apply(compile_function, join([__args121], __body23, []))

setenv("%function", special=__L_37function__special)
def __L_37global_function__special(name=None, args=None, *_args, **_keys):
  ____r136 = unstash(_args, _keys)
  __name9 = destash33(name, ____r136)
  __args14 = destash33(args, ____r136)
  ____id45 = ____r136
  __body25 = cut(____id45, 0)
  if has(setenv("target", toplevel=True), "value") == "lua" or (has(setenv("target", toplevel=True), "value") == "py" or has(setenv("target", toplevel=True), "value") == "cmake"):
    ____x221 = object([__args14])
    ____x221["name"] = __name9
    ____x222 = object([])
    ____x222["name"] = __name9
    __x220 = apply(compile_function, join(____x221, __body25, ____x222))
    return cat(indentation(), __x220)
  else:
    return compile(["%set", __name9, join(["%function", __args14], __body25)], stmt=True)

setenv("%global-function", special=__L_37global_function__special, stmt=True, tr=True)
def __L_37local_function__special(name=None, args=None, *_args, **_keys):
  ____r138 = unstash(_args, _keys)
  __name11 = destash33(name, ____r138)
  __args16 = destash33(args, ____r138)
  ____id47 = ____r138
  __body27 = cut(____id47, 0)
  if has(setenv("target", toplevel=True), "value") == "lua" or (has(setenv("target", toplevel=True), "value") == "py" or has(setenv("target", toplevel=True), "value") == "cmake"):
    ____x232 = object([__args16])
    ____x232["name"] = __name11
    ____x232["prefix"] = "local"
    ____x233 = object([])
    ____x233["name"] = __name11
    ____x233["prefix"] = "local"
    __x231 = apply(compile_function, join(____x232, __body27, ____x233))
    return cat(indentation(), __x231)
  else:
    return compile(["%local", __name11, join(["%function", __args16], __body27)], stmt=True)

setenv("%local-function", special=__L_37local_function__special, stmt=True, tr=True)
def __L_37ref__special(variable=None):
  return cat("${", compile_id(tostr(variable)), "}")

setenv("%ref", special=__L_37ref__special)
def __L_37id__special(variable=None):
  return escape(compile(["%ref", variable]))

setenv("%id", special=__L_37id__special)
def __L_37return__special(x=None):
  __e94 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e96 = None
    if nil63(x):
      __e96 = ["return"]
    else:
      __e96 = ["return", "PROPAGATE", x]
    __e94 = compile(__e96)
  else:
    __e95 = None
    if nil63(x):
      __e95 = "return"
    else:
      __e95 = cat("return ", compile(x))
    __e94 = __e95
  return cat(indentation(), __e94)

setenv("%return", special=__L_37return__special, stmt=True)
def __L_37new__special(x=None):
  return cat("new ", compile(x))

setenv("%new", special=__L_37new__special)
def __L_37typeof__special(x=None):
  return cat("typeof(", compile(x), ")")

setenv("%typeof", special=__L_37typeof__special)
def __L_37error__special(x=None):
  __e97 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e97 = cat("throw ", compile(["%new", ["Error", x]]))
  else:
    __e98 = None
    if has(setenv("target", toplevel=True), "value") == "py":
      __e98 = cat("raise ", compile(["Exception", x]))
    else:
      __e98 = cat("error(", compile(x), ")")
    __e97 = __e98
  __e22 = __e97
  return cat(indentation(), __e22)

setenv("%error", special=__L_37error__special, stmt=True)
def __L_37throw__special(x=None):
  __e99 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e99 = cat("throw ", compile(x))
  else:
    __e100 = None
    if has(setenv("target", toplevel=True), "value") == "py":
      __e100 = cat("raise ", compile(x))
    else:
      __e100 = cat("error(", compile(x), ")")
    __e99 = __e100
  __e26 = __e99
  return cat(indentation(), __e26)

setenv("%throw", special=__L_37throw__special, stmt=True)
def __L_37local__special(name=None, value=None):
  if has(setenv("target", toplevel=True), "value") == "cmake":
    return compile(["%set", name, value])
  if nil63(value) and has(setenv("target", toplevel=True), "value") == "py":
    value = "nil"
  __id49 = compile(name)
  __value11 = compile(value)
  __e101 = None
  if is63(value):
    __e101 = cat(" = ", __value11)
  else:
    __e101 = ""
  __rh4 = __e101
  __e102 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e102 = "var "
  else:
    __e103 = None
    if has(setenv("target", toplevel=True), "value") == "lua":
      __e103 = "local "
    else:
      __e103 = ""
    __e102 = __e103
  __keyword1 = __e102
  __ind17 = indentation()
  return cat(__ind17, __keyword1, __id49, __rh4)

setenv("%local", special=__L_37local__special, stmt=True)
def __L_37set__special(lh=None, rh=None):
  __lh4 = compile(lh)
  __e104 = None
  if nil63(rh):
    __e104 = "nil"
  else:
    __e104 = rh
  __rh6 = compile(__e104)
  __ind19 = indentation()
  if has(setenv("target", toplevel=True), "value") == "cmake":
    return cat(indentation(), "set(", __lh4, " ", __rh6, ")")
  else:
    return cat(indentation(), __lh4, " = ", __rh6)

setenv("%set", special=__L_37set__special, stmt=True)
def __L_37get__special(t=None, k=None):
  __t12 = compile(t)
  __k121 = compile(k)
  if has(setenv("target", toplevel=True), "value") == "lua" and char(__t12, 0) == "{" or infix_operator63(t):
    __t12 = cat("(", __t12, ")")
  if string_literal63(k) and (valid_id63(inner(k)) and not( has(setenv("target", toplevel=True), "value") == "py")):
    return cat(__t12, ".", inner(k))
  else:
    return cat(__t12, "[", __k121, "]")

setenv("%get", special=__L_37get__special)
def __L_37idx__special(t=None, k=None):
  __t14 = compile(t)
  __k14 = compile(k, "raw")
  if has(setenv("target", toplevel=True), "value") == "lua" and char(__t14, 0) == "{" or infix_operator63(t):
    __t14 = cat("(", __t14, ")")
  return cat(__t14, ".", __k14)

setenv("%idx", special=__L_37idx__special)
def __L_37array__special(*_args, **_keys):
  __forms4 = unstash(_args, _keys)
  if has(setenv("target", toplevel=True), "value") == "cmake":
    return mapcat(compile, __forms4, " ")
  else:
    __e105 = None
    if has(setenv("target", toplevel=True), "value") == "lua":
      __e105 = "{"
    else:
      __e105 = "["
    __open1 = __e105
    __e106 = None
    if has(setenv("target", toplevel=True), "value") == "lua":
      __e106 = "}"
    else:
      __e106 = "]"
    __close1 = __e106
    __s10 = ""
    __c7 = ""
    ____o12 = __forms4
    __k16 = None
    for __k16 in indices(____o12):
      __v11 = ____o12[__k16]
      if number63(__k16):
        __s10 = cat(__s10, __c7, compile(__v11))
        __c7 = ", "
    return cat(__open1, __s10, __close1)

setenv("%array", special=__L_37array__special)
def __L_37object__special(*_args, **_keys):
  __forms6 = unstash(_args, _keys)
  __e107 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e107 = ""
  else:
    __e107 = "{"
  __s12 = __e107
  __c9 = ""
  __e108 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e108 = " = "
  else:
    __e109 = None
    if has(setenv("target", toplevel=True), "value") == "cmake":
      __e109 = " "
    else:
      __e109 = ": "
    __e108 = __e109
  __sep3 = __e108
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
  ____x255 = indentation()
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __ind21 = ____x255
  __e110 = None
  if L_35(__forms6) > 2:
    __e110 = cat("\n", __ind21)
  __pad1 = __e110
  __e111 = None
  if is63(__pad1):
    __e111 = cat("\n", indentation())
  else:
    __e111 = ""
  __end1 = __e111
  __s12 = cat(__s12, either(__pad1, ""))
  ____x256 = pair(__forms6)
  ____i25 = 0
  while ____i25 < L_35(____x256):
    ____id51 = ____x256[____i25]
    __k18 = has(____id51, 0)
    __v13 = has(____id51, 1)
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
    ____x257 = compile(__v13)
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
    __s12 = cat(__s12, __c9, key(__k18), __sep3, ____x257)
    __e112 = None
    if has(setenv("target", toplevel=True), "value") == "cmake":
      __e112 = ""
    else:
      __e112 = ","
    __c9 = cat(__e112, either(__pad1, " "))
    ____i25 = ____i25 + 1
  __e113 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e113 = ""
  else:
    __e113 = "}"
  return cat(__s12, __end1, __e113)

setenv("%object", special=__L_37object__special)
def __L_37list__special(form=None, comps=None, cond=None, *_args, **_keys):
  ____r162 = unstash(_args, _keys)
  __form9 = destash33(form, ____r162)
  __comps1 = destash33(comps, ____r162)
  __cond6 = destash33(cond, ____r162)
  ____id55 = ____r162
  __kind1 = has(____id55, "kind")
  __s14 = compile(__form9)
  __e114 = None
  if __kind1 == "object":
    __e114 = ["{", "}"]
  else:
    __e114 = ["[", "]"]
  ____id56 = __e114
  __lh6 = has(____id56, 0)
  __rh8 = has(____id56, 1)
  if not( __kind1 == "object"):
    __s14 = cat("(", __s14, ")")
  ____x264 = __comps1
  ____i27 = 0
  while ____i27 < L_35(____x264):
    ____id57 = ____x264[____i27]
    __k20 = has(____id57, 0)
    __v15 = has(____id57, 1)
    __s14 = cat(__s14, " for ", compile(__k20), " in ", compile(__v15))
    ____i27 = ____i27 + 1
  if is63(__cond6):
    __s14 = cat(__s14, " if ", compile(__cond6))
  return cat(__lh6, __s14, __rh8)

setenv("%list", special=__L_37list__special)
def compile_literal(x=None):
  if string_literal63(x):
    return inner(x)
  else:
    return compile(x)

def __L_37literal__special(*_args, **_keys):
  __args18 = unstash(_args, _keys)
  return mapcat(compile_literal, __args18)

setenv("%literal", special=__L_37literal__special)
def __global__special(x=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(indentation(), "global ", compile(x), "\n")
  else:
    return ""

setenv("global", special=__global__special, stmt=True, tr=True)
def __import__special(name=None, *_args, **_keys):
  ____r167 = unstash(_args, _keys)
  __name13 = destash33(name, ____r167)
  ____id60 = ____r167
  __alias3 = cut(____id60, 0)
  __ind23 = indentation()
  __e115 = None
  if hd(__alias3) == "as":
    __e115 = __alias3[1]
  else:
    __e115 = hd(__alias3)
  __L_as1 = __e115
  __id61 = __L_as1 or __name13
  if has(setenv("target", toplevel=True), "value") == "py":
    __s16 = cat(__ind23, "import ", compile(__name13))
    if __L_as1:
      __s16 = cat(__s16, " as ", compile(__id61))
    return __s16
  else:
    return cat(__ind23, compile(["%local", __id61, ["require", escape(__name13)]]))

setenv("import", special=__import__special, stmt=True)
def __from__special(name=None, *_args, **_keys):
  ____r171 = unstash(_args, _keys)
  __name15 = destash33(name, ____r171)
  ____id64 = ____r171
  __imports1 = cut(____id64, 0)
  __ind25 = indentation()
  __id65 = __name15
  __r172 = None
  __r172 = drop(__imports1)
  __e116 = None
  if last(__imports1) == "as":
    __e116 = drop(__imports1)
  else:
    add(__imports1, __r172)
    __r172 = None
    __e116 = __r172
  __L_as2 = __r172
  __e117 = None
  if hd(__imports1) == "import":
    __e117 = tl(__imports1)
  else:
    __e117 = __imports1
  __names3 = __e117
  def __f9(x=None):
    if x == "*":
      return x
    else:
      return compile(x)
  __names4 = mapcat(__f9, __names3, ", ")
  if has(setenv("target", toplevel=True), "value") == "py":
    __s18 = cat(__ind25, "from ", compile(__name15), " import ", __names4)
    if __L_as2:
      __s18 = cat(__s18, " as ", compile(__L_as2))
    return __s18
  else:
    return ""

setenv("from", special=__from__special, stmt=True)
def __L_44__special(*_args, **_keys):
  __args20 = unstash(_args, _keys)
  if none63(__args20):
    return ", "
  else:
    if one63(__args20):
      return cat(", ", compile(hd(__args20)))
    else:
      return mapcat(compile, __args20, ", ")

setenv(",", special=__L_44__special)
def __3458__special34(*_args, **_keys):
  __args22 = unstash(_args, _keys)
  if none63(__args22):
    return ":"
  else:
    if one63(__args22):
      return cat(":", compile(hd(__args22)))
    else:
      return mapcat(compile, __args22, ":")

setenv(":", special=__3458__special34)
def __L_37as__special(form=None, id=None):
  return cat(compile(form), " as ", compile(id))

setenv("%as", special=__L_37as__special)
def __yield__special(*_args, **_keys):
  __args24 = unstash(_args, _keys)
  return cat(indentation(), "yield ", mapcat(compile, __args24, ", "))

setenv("yield", special=__yield__special, stmt=True)
def __await__special(x=None):
  __e118 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e118 = ""
  else:
    __e118 = "await "
  __a11 = __e118
  return cat(__a11, compile(x))

setenv("await", special=__await__special)
def __L_37b__special(x=None):
  return cat("b", compile(x))

setenv("%b", special=__L_37b__special)
def __L_37f__special(x=None):
  return cat("f", compile(x))

setenv("%f", special=__L_37f__special)
def __L_37r__special(x=None):
  return cat("r", compile(x))

setenv("%r", special=__L_37r__special)
def __L_64__special(x=None):
  return cat(indentation(), "@", compile(x))

setenv("@", special=__L_64__special, stmt=True)
