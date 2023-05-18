from lumen import *
def getenv(k=None, p=None):
  if string63(k):
    __i = edge(environment)
    while __i >= 0:
      if has63(environment[__i], k):
        __b = environment[__i][k]
        __e9 = None
        if p:
          __e9 = has(__b, p)
        else:
          __e9 = __b
        return __e9
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
        return join(["quasilist"], map(quoted, form))

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
          add(__l, ["%compile", __k, "|=|", __v])
      return __l
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        __l1 = array(args)
        ____o1 = args
        __k1 = None
        for __k1 in indices(____o1):
          __v1 = ____o1[__k1]
          if not number63(__k1):
            add(__l1, ["%compile", __k1, "| |", __v1])
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
            __e10 = None
            if __k3 == "rest":
              __e10 = ["cut", __id2, L_35(lh)]
            else:
              __e10 = ["has", __id2, ["quote", bias(__k3)]]
            __x12 = __e10
            if is63(__k3):
              __e11 = None
              if __v3 == True:
                __e11 = __k3
              else:
                __e11 = __v3
              __k4 = __e11
              __bs = join(__bs, bind(__k4, __x12))
          return __bs

def __arguments37__macro(L_from=None):
  ____x16 = object(["target"])
  ____x16["js"] = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", L_from]
  ____x16["py"] = ["list", "|_args|"]
  ____x16["lua"] = ["quasilist", "|...|"]
  ____x16["cmake"] = ["%ref", "ARGN"]
  return ____x16

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
    ____x28 = object(["target"])
    ____x28["py"] = ["obj", "..."]
    return ["unstash", ["quasilist", "..."], ____x28]
  if atom63(args):
    return [__args1, join(["let", [args, rest()]], body)]
  else:
    ____id3 = body_docstring(body)
    __doc = has(____id3, 0)
    __body = has(____id3, 1)
    __pre = []
    __bs1 = []
    __inits = []
    __r20 = unique("r")
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
              __x40 = unique("x")
              add(__args1, __x40)
              __bs1 = join(__bs1, [__v4, __x40])
    if props63(args):
      __pre = join(__pre, [__r20, rest()])
      __n5 = L_35(__args1)
      __i6 = 0
      while __i6 < __n5:
        __v5 = __args1[__i6]
        __pre = join(__pre, [__v5, ["destash!", __v5, __r20]])
        __i6 = __i6 + 1
      __bs1 = join(__bs1, [props(args), __r20])
    __forms = join(["let", __pre], __inits, [join(["let", __bs1], __body)])
    __e12 = None
    if is63(__doc):
      __e12 = ["do", __doc, __forms]
    else:
      __e12 = __forms
    return [__args1, __e12]

def quoting63(depth=None):
  return number63(depth)

def quasiquoting63(depth=None):
  return quoting63(depth) and depth > 0

def can_unquote63(depth=None):
  return quoting63(depth) and depth == 1

def quasisplice63(x=None, depth=None):
  return can_unquote63(depth) and (not atom63(x) and hd(x) == "unquote-splicing")

def expand_local(__x51=None):
  ____id6 = __x51
  __x52 = has(____id6, 0)
  __name = has(____id6, 1)
  __value = has(____id6, 2)
  setenv(__name, variable=True)
  return ["%local", __name, macroexpand(__value)]

def expand_function(__x54=None):
  ____id7 = __x54
  __x55 = has(____id7, 0)
  __args = has(____id7, 1)
  __body1 = cut(____id7, 2)
  add(environment, {})
  ____r28 = None
  try:
    ____o5 = __args
    ____i7 = None
    for ____i7 in indices(____o5):
      ____x56 = ____o5[____i7]
      setenv(____x56, variable=True)
    ____r28 = join(["%function", __args], macroexpand(__body1))
  finally:
    drop(environment)
  return ____r28

def expand_definition(__x58=None):
  ____id8 = __x58
  __x59 = has(____id8, 0)
  __name1 = has(____id8, 1)
  __args11 = has(____id8, 2)
  __body2 = cut(____id8, 3)
  add(environment, {})
  ____r31 = None
  try:
    ____o6 = __args11
    ____i8 = None
    for ____i8 in indices(____o6):
      ____x60 = ____o6[____i8]
      setenv(____x60, variable=True)
    ____r31 = join([__x59, __name1, __args11], macroexpand(__body2))
  finally:
    drop(environment)
  return ____r31

def expand_macro(form=None):
  return macroexpand(expand1(form))

def expand1(__x62=None):
  ____id9 = __x62
  __name2 = has(____id9, 0)
  __body3 = cut(____id9, 1)
  return apply(macro_function(__name2), __body3)

def real63(x=None):
  return number63(x) and (not nan63(x) and not inf63(x))

def valid_access63(L_str=None):
  return L_35(L_str) > 2 and (not( "." == char(L_str, 0)) and (not( "." == char(L_str, edge(L_str))) and not search(L_str, "..")))

def parse_access(L_str=None):
  def __f3(a=None, b=None):
    __n8 = number(a)
    if is63(__n8):
      return ["at", b, __n8]
    else:
      return ["%idx", b, a]
  return reduce(__f3, reverse(split(L_str, ".")))

def parse_access63(form=None):
  return string63(form) and (not string_literal63(form) and (not id_literal63(form) and (is63(search(form, ".")) and valid_access63(form))))

def expand_access(form=None):
  if parse_access63(form):
    return parse_access(form)

expand_atom_functions42 = []
add(expand_atom_functions42, expand_access)
def expand_atom(form=None):
  ____x65 = expand_atom_functions42
  ____i9 = 0
  while ____i9 < L_35(____x65):
    __f = ____x65[____i9]
    __x66 = __f(form)
    if not( __x66 == None):
      return __x66
    ____i9 = ____i9 + 1
  return form

def macroexpand_atom(form=None):
  if symbol63(form):
    return macroexpand(symbol_expansion(form))
  else:
    __expr = expand_atom(form)
    if __expr == form:
      return __expr
    else:
      return macroexpand(__expr)

def macroexpand(form=None):
  if atom63(form):
    return macroexpand_atom(form)
  else:
    if none63(form):
      return map(macroexpand, form)
    else:
      __x67 = macroexpand(hd(form))
      __args2 = tl(form)
      if nil63(__x67):
        return macroexpand(__args2)
      else:
        if __x67 == "%local":
          return expand_local(form)
        else:
          if __x67 == "%function":
            return expand_function(form)
          else:
            if __x67 == "%global-function":
              return expand_definition(form)
            else:
              if __x67 == "%local-function":
                return expand_definition(form)
              else:
                if __x67 == "%expansion":
                  return form[1]
                else:
                  if macro63(__x67):
                    return expand_macro(form)
                  else:
                    return join([__x67], map(macroexpand, __args2))

def macroexpand(form=None):
  L_print(L_str(["macroexpand", form]))
  if parse_access63(form):
    return macroexpand(parse_access(form))
  else:
    if symbol63(form):
      return macroexpand(symbol_expansion(form))
    else:
      if atom63(form):
        return form
      else:
        if none63(form):
          return map(macroexpand, form)
        else:
          __x70 = macroexpand(hd(form))
          __args3 = tl(form)
          __form = join([__x70], __args3)
          if __x70 == None:
            return macroexpand(__args3)
          else:
            if __x70 == "%local":
              return expand_local(__form)
            else:
              if __x70 == "%function":
                return expand_function(__form)
              else:
                if __x70 == "%global-function":
                  return expand_definition(__form)
                else:
                  if __x70 == "%local-function":
                    return expand_definition(__form)
                  else:
                    if __x70 == "%expansion":
                      return __form[1]
                    else:
                      if macro63(__x70):
                        return expand_macro(__form)
                      else:
                        return join([__x70], map(macroexpand, __args3))

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
        __x73 = hd(form)
        if __x73 == "%local":
          return expand_local(form)
        else:
          if __x73 == "%function":
            return expand_function(form)
          else:
            if __x73 == "%global-function":
              return expand_definition(form)
            else:
              if __x73 == "%local-function":
                return expand_definition(form)
              else:
                if __x73 == "%expansion":
                  return form[1]
                else:
                  if macro63(__x73):
                    return expand_macro(form)
                  else:
                    if parse_access63(__x73):
                      return macroexpand(join([parse_access(__x73)], tl(form)))
                    else:
                      return map(macroexpand, form)

def quasiquote_list(form=None, depth=None):
  __xs = [object(["quasilist"])]
  ____o7 = form
  __k6 = None
  for __k6 in indices(____o7):
    __v6 = ____o7[__k6]
    if not number63(__k6):
      __e13 = None
      if quasisplice63(__v6, depth):
        __e13 = quasiexpand(__v6[1])
      else:
        __e13 = quasiexpand(__v6, depth)
      __v7 = __e13
      last(__xs)[__k6] = __v7
  ____x77 = form
  ____i11 = 0
  while ____i11 < L_35(____x77):
    __x78 = ____x77[____i11]
    if quasisplice63(__x78, depth):
      __x79 = quasiexpand(__x78[1])
      add(__xs, __x79)
      add(__xs, ["quasilist"])
    else:
      add(last(__xs), quasiexpand(__x78, depth))
    ____i11 = ____i11 + 1
  def __f4(x=None):
    return L_35(x) > 1 or (not( hd(x) == "quasilist") or props63(x))
  __pruned = keep(__f4, __xs)
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
          def __f5(x=None):
            return quasiexpand(x, depth)
          return map(__f5, form)

def expand_if(__x83=None):
  ____id10 = __x83
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
  __i12 = 0
  while __i12 < has(setenv("indent-level", toplevel=True), "value"):
    __s = cat(__s, "  ")
    __i12 = __i12 + 1
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
      __e14 = None
      if has(setenv("target", toplevel=True), "value") == "py":
        __e14 = "L_"
      else:
        __e14 = "_"
      __x89 = __e14
      __e15 = None
      if number_code63(code(id, 0)):
        __e15 = __x89
      else:
        __e15 = ""
      __id11 = __e15
      __i13 = 0
      while __i13 < L_35(id):
        __c1 = char(id, __i13)
        __n10 = code(__c1)
        __e16 = None
        if __c1 == "-" and not( id == "-"):
          __e19 = None
          if __i13 == 0:
            __e19 = __x89
          else:
            __e19 = "_"
          __e16 = __e19
        else:
          __e17 = None
          if valid_code63(__n10):
            __e17 = __c1
          else:
            __e18 = None
            if __i13 == 0:
              __e18 = cat(__x89, __n10)
            else:
              __e18 = __n10
            __e17 = __e18
          __e16 = __e17
        __c11 = __e16
        __id11 = cat(__id11, __c11)
        __i13 = __i13 + 1
      if raw63:
        return __id11
      else:
        if reserved63(__id11):
          return cat(__x89, __id11)
        else:
          return __id11

def valid_id63(x=None):
  return some63(x) and x == compile_id(x)

__names = {}
def unique(x=None):
  __x90 = compile_id(x)
  if has63(__names, __x90):
    __i14 = __names[__x90]
    __names[__x90] = __names[__x90] + 1
    return unique(cat(__x90, __i14))
  else:
    __names[__x90] = 1
    return cat("__", __x90)

def key(k=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    return compile(k)
  else:
    if string_literal63(k):
      __i15 = inner(k)
      if has(setenv("target", toplevel=True), "value") == "cmake":
        __e20 = None
        if valid_id63(__i15):
          __e20 = __i15
        else:
          __e20 = k
        return screamcase(__e20)
      else:
        if valid_id63(__i15):
          return __i15
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
    __x91 = f(__v8)
    if is63(__x91):
      add(__o8, literal(__k7))
      add(__o8, __x91)
  return __o8

____x93 = object([])
____x94 = object([])
____x94["js"] = "!"
____x94["lua"] = "not"
____x94["py"] = "not"
____x94["cmake"] = "NOT"
____x93["%not"] = ____x94
____x93["%unm"] = "-"
____x95 = object([])
____x95["%mul"] = "*"
____x95["%div"] = "/"
____x95["%idiv"] = "//"
____x95["%mod"] = "%"
____x96 = object([])
____x97 = object([])
____x97["js"] = "+"
____x97["lua"] = ".."
____x97["py"] = "+"
____x96["%cat"] = ____x97
____x98 = object([])
____x98["%add"] = "+"
____x98["%sub"] = "-"
____x99 = object([])
____x100 = object([])
____x100["cmake"] = "LESS"
____x100["all"] = "<"
____x99["%lt"] = ____x100
____x101 = object([])
____x101["cmake"] = "GREATER"
____x101["all"] = ">"
____x99["%gt"] = ____x101
____x102 = object([])
____x102["cmake"] = "LESS_EQUAL"
____x102["all"] = "<="
____x99["%le"] = ____x102
____x103 = object([])
____x103["cmake"] = "GREATER_EQUAL"
____x103["all"] = ">="
____x99["%ge"] = ____x103
____x104 = object([])
____x105 = object([])
____x105["js"] = "==="
____x105["lua"] = "=="
____x105["py"] = "=="
____x104["%eq"] = ____x105
____x106 = object([])
____x107 = object([])
____x107["py"] = "in"
____x106["%in"] = ____x107
____x108 = object([])
____x108["py"] = "is"
____x106["%is"] = ____x108
____x109 = object([])
____x110 = object([])
____x110["js"] = "&&"
____x110["lua"] = "and"
____x110["py"] = "and"
____x110["cmake"] = "AND"
____x109["%and"] = ____x110
____x111 = object([])
____x112 = object([])
____x112["js"] = "||"
____x112["lua"] = "or"
____x112["py"] = "or"
____x112["cmake"] = "OR"
____x111["%or"] = ____x112
infix = [____x93, ____x95, ____x96, ____x98, ____x99, ____x104, ____x106, ____x109, ____x111]
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
    def __f6(level=None):
      __x114 = has(level, op)
      if __x114 == True:
        return op
      else:
        if string63(__x114):
          return __x114
        else:
          if is63(__x114):
            return has(__x114, has(setenv("target", toplevel=True), "value")) or has(__x114, "all")
    return find(__f6, infix)

def infix63(x=None):
  return is63(getop(x))

def infix_operator63(x=None):
  return not atom63(x) and infix63(hd(x))

def compile_args(args=None, default63=None):
  __s1 = "("
  __c2 = ""
  ____x115 = args
  ____i18 = 0
  while ____i18 < L_35(____x115):
    __x116 = ____x115[____i18]
    __s1 = cat(__s1, __c2, compile(__x116))
    if (has(setenv("target", toplevel=True), "value") == "py" or has(setenv("target", toplevel=True), "value") == "cmake") and (default63 and (not id_literal63(__x116) and not( __x116 == "..."))):
      __e21 = None
      if has(setenv("target", toplevel=True), "value") == "cmake":
        __e21 = ""
      else:
        __e21 = "=None"
      __s1 = cat(__s1, __e21)
    __e22 = None
    if has(setenv("target", toplevel=True), "value") == "cmake":
      __e22 = " "
    else:
      __e22 = ", "
    __c2 = __e22
    ____i18 = ____i18 + 1
  return cat(__s1, ")")

def escape_newlines(s=None):
  if nil63(search(s, "\n")) and nil63(search(s, "\r")):
    return s
  else:
    __s11 = ""
    __i19 = 0
    while __i19 < L_35(s):
      __c3 = char(s, __i19)
      __e23 = None
      if __c3 == "\n":
        __e23 = "\\n"
      else:
        __e24 = None
        if __c3 == "\r":
          __e24 = "\\r"
        else:
          __e24 = __c3
        __e23 = __e24
      __s11 = cat(__s11, __e23)
      __i19 = __i19 + 1
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
  __x117 = has(____id111, 0)
  __args4 = cut(____id111, 1)
  ____id12 = getenv(__x117)
  __special = has(____id12, "special")
  __stmt = has(____id12, "stmt")
  __self_tr63 = has(____id12, "tr")
  __e25 = None
  if stmt63 and not __stmt:
    __e25 = indentation()
  else:
    __e25 = ""
  __p = __e25
  __tr = terminator(stmt63 and not __self_tr63)
  return cat(__p, apply(__special, __args4), __tr)

def parenthesize_call63(x=None):
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0

def method_call63(form=None):
  __e26 = None
  if list63(form):
    __e26 = hd(form)
  else:
    __e26 = form
  __x118 = __e26
  return string63(__x118) and (L_35(__x118, 1) > 1 and char(__x118, 0) == ".")

def compile_call(form=None):
  __f1 = hd(form)
  __f11 = compile_name(__f1)
  __args5 = stash42(tl(form))
  __e27 = None
  if method_call63(hd(__args5)):
    __e27 = mapcat(compile, __args5, "")
  else:
    __e27 = compile_args(__args5)
  __args6 = __e27
  if parenthesize_call63(__f1):
    return cat("(", __f11, ")", __args6)
  else:
    return cat(__f11, __args6)

def op_delims(parent=None, child=None, *_args, **_keys):
  ____r81 = unstash(_args, _keys)
  __parent = destash33(parent, ____r81)
  __child = destash33(child, ____r81)
  ____id13 = ____r81
  __right = has(____id13, "right")
  __e28 = None
  if __right:
    __e28 = L_6261
  else:
    __e28 = L_62
  if __e28(precedence(__child), precedence(__parent)):
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
  ____x121 = compile(body, stmt=True)
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __s2 = ____x121
  if has(setenv("target", toplevel=True), "value") == "py" and none63(__s2):
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
    ____x122 = cat(indentation(), "pass\n")
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
    return ____x122
  else:
    return __s2

def compile_function(args=None, body=None, *_args, **_keys):
  ____r84 = unstash(_args, _keys)
  __args7 = destash33(args, ____r84)
  __body4 = destash33(body, ____r84)
  ____id18 = ____r84
  __name3 = has(____id18, "name")
  __prefix = has(____id18, "prefix")
  __async = has(____id18, "async")
  __e29 = None
  if __name3:
    __e29 = compile_name(__name3)
  else:
    __e29 = ""
  __id19 = __e29
  __e30 = None
  if has(__args7, "rest"):
    __e30 = join(__args7, ["..."])
  else:
    __e30 = __args7
  __args12 = __e30
  __e31 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e31 = compile_args(join([["%compile", __id19]], __args12), True)
  else:
    __e31 = compile_args(__args12, True)
  __args8 = __e31
  __body5 = compile_body(__body4)
  __ind = indentation()
  __e32 = None
  if __prefix:
    __e32 = cat(__prefix, " ")
  else:
    __e32 = ""
  __p1 = __e32
  __e33 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e33 = ""
  else:
    __e34 = None
    if has(setenv("target", toplevel=True), "value") == "cmake":
      __e34 = "endfunction()"
    else:
      __e34 = "end"
    __e33 = __e34
  __tr1 = __e33
  __e35 = None
  if __async and not( has(setenv("target", toplevel=True), "value") == "lua"):
    __e35 = "async "
  else:
    __e35 = ""
  __a3 = __e35
  if __name3:
    __tr1 = cat(__tr1, "\n")
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__a3, "function ", __id19, __args8, " {\n", __body5, __ind, "}", __tr1)
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      __e36 = None
      if none63(__ind):
        __e36 = "\n"
      else:
        __e36 = ""
      __ws = __e36
      return cat(__a3, "def ", __id19, __args8, ":\n", __body5, __ws)
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        return cat(__a3, "function", __args8, "\n", __body5, __ind, __tr1)
      else:
        return cat(__p1, "function ", __id19, __args8, "\n", __body5, __ind, __tr1)

def can_return63(form=None):
  return is63(form) and (atom63(form) or not( hd(form) == "%return") and not statement63(hd(form)))

def compile(form=None, raw63=None, *_args, **_keys):
  ____r86 = unstash(_args, _keys)
  __form1 = destash33(form, ____r86)
  __raw63 = destash33(raw63, ____r86)
  ____id20 = ____r86
  __stmt1 = has(____id20, "stmt")
  if nil63(__form1):
    return ""
  else:
    if special_form63(__form1):
      return compile_special(__form1, __stmt1)
    else:
      __tr2 = terminator(__stmt1)
      __e37 = None
      if __stmt1:
        __e37 = indentation()
      else:
        __e37 = ""
      __ind1 = __e37
      __e38 = None
      if atom63(__form1):
        __e38 = compile_atom(__form1, __raw63)
      else:
        __e39 = None
        if infix63(hd(__form1)):
          __e39 = compile_infix(__form1)
        else:
          __e39 = compile_call(__form1)
        __e38 = __e39
      __form2 = __e38
      return cat(__ind1, __form2, __tr2)

def lower_statement(form=None, tail63=None):
  __hoist = []
  __e = lower(form, __hoist, True, tail63)
  __e40 = None
  if some63(__hoist) and is63(__e):
    __e40 = join(["%do"], __hoist, [__e])
  else:
    __e41 = None
    if is63(__e):
      __e41 = __e
    else:
      __e42 = None
      if L_35(__hoist) > 1:
        __e42 = join(["%do"], __hoist)
      else:
        __e42 = hd(__hoist)
      __e41 = __e42
    __e40 = __e41
  return either(__e40, ["%do"])

def lower_body(body=None, tail63=None):
  return lower_statement(join(["%do"], body), tail63)

def literal63(form=None):
  return atom63(form) or (hd(form) == "%array" or (hd(form) == "%object" or (hd(form) == "%list" or (hd(form) == "%ptr" or (hd(form) == "%id" or (hd(form) == "%ref" or hd(form) == ","))))))

def standalone63(form=None):
  return not( has(setenv("target", toplevel=True), "value") == "lua") and string_literal63(form) or (not atom63(form) and (not infix63(hd(form)) and (not literal63(form) and not( "%get" == hd(form)))) or id_literal63(form))

def lower_do(args=None, hoist=None, stmt63=None, tail63=None):
  ____x131 = almost(args)
  ____i20 = 0
  while ____i20 < L_35(____x131):
    __x132 = ____x131[____i20]
    ____y = lower(__x132, hoist, stmt63)
    if yes(____y):
      __e1 = ____y
      if standalone63(__e1):
        add(hoist, __e1)
    ____i20 = ____i20 + 1
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
    __e44 = None
    if is63(__L_else):
      __e44 = [lower_body([__L_else], tail63)]
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([__then], tail63)], __e44))
  else:
    __e3 = unique("e")
    add(hoist, ["%local", __e3, "nil"])
    __e43 = None
    if is63(__L_else):
      __e43 = [lower(["%set", __e3, __L_else])]
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, __then])], __e43))
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
    __e45 = None
    if x == "%and":
      __e45 = ["%if", __id24, __b4, __id24]
    else:
      __e45 = ["%if", __id24, __id24, __b4]
    return lower(["%do", ["%local", __id24, __a4], __e45], hoist)
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
  __e46 = None
  if none63(__pre1):
    __e46 = ["%while", __c5, lower_body(__body6)]
  else:
    __e46 = ["%while", True, join(["%do"], __pre1, [["%if", ["%not", __c5], ["%break"]], lower_body(__body6)])]
  return add(hoist, __e46)

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

def lower_import(__x166=None, hoist=None, stmt63=None, tail63=None):
  ____id31 = __x166
  __name6 = has(____id31, 0)
  __alias1 = cut(____id31, 1)
  __e47 = None
  if hd(__alias1) == "as":
    __e47 = __alias1[1]
  else:
    __e47 = hd(__alias1)
  __L_as = __e47
  __id32 = __L_as or __name6
  add(hoist, join(["import", __name6], __alias1))
  if not stmt63:
    return __id32

def lower_function(args=None, hoist=None):
  if has(setenv("target", toplevel=True), "value") == "py" or has(setenv("target", toplevel=True), "value") == "cmake":
    __f2 = unique("f")
    return lower(["%do", join(["%local-function", __f2], args), __f2], hoist)
  else:
    ____id33 = args
    __a5 = has(____id33, 0)
    __body10 = cut(____id33, 1)
    return join(["%function", __a5, lower_body(__body10, True)], props(__body10))

def lower_definition(kind=None, args=None, hoist=None):
  ____id34 = args
  __name7 = has(____id34, 0)
  __args9 = has(____id34, 1)
  __body11 = cut(____id34, 2)
  return add(hoist, join([kind, __name7, __args9, lower_body(__body11, True)], props(__body11)))

def ref63(x=None):
  return list63(x) and hd63(x, "%ref")

def id63(x=None):
  return list63(x) and hd63(x, "%id")

def ptr63(x=None):
  return list63(x) and hd63(x, "%ptr")

def reference63(x=None):
  return ref63(x) or (id63(x) or ptr63(x))

def ptr_name(x=None):
  return x[1]

def ptr_decay(x=None):
  __x174 = ptr_name(x)
  if id63(__x174):
    return __x174
  else:
    if ref63(__x174):
      return __x174
    else:
      return ["%id", __x174]

def ptr_decay(x=None):
  return x

def lower_invoke(form=None, hoist=None):
  __ptr = None
  def lower_ptr(x=None):
    if ptr63(x):
      __ptr = ptr_decay(x)
      x = ptr_name(x)
    return x
  __form3 = map(lower_ptr, form)
  if is63(__ptr) and not literal63(__form3):
    add(hoist, __form3)
  else:
    __ptr = __form3
  return __ptr

def lower_call(form=None, hoist=None):
  def __f7(x=None):
    return lower(x, hoist)
  __form4 = map(__f7, form)
  if some63(__form4):
    return lower_invoke(__form4, hoist)

def pairwise63(form=None):
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"])

def lower_pairwise(form=None):
  if pairwise63(form):
    __e5 = []
    ____id35 = form
    __x177 = has(____id35, 0)
    __args10 = cut(____id35, 1)
    def __f8(a=None, b=None):
      add(__e5, [__x177, a, b])
      return a
    reduce(__f8, __args10)
    return join(["%and"], reverse(__e5))
  else:
    return form

def lower_infix63(form=None):
  return infix63(hd(form)) and L_35(form) > 3

def lower_infix(form=None, hoist=None):
  __form5 = lower_pairwise(form)
  ____id36 = __form5
  __x180 = has(____id36, 0)
  __args111 = cut(____id36, 1)
  def __f9(a=None, b=None):
    return [__x180, b, a]
  return lower(reduce(__f9, reverse(__args111)), hoist)

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
          __x183 = has(____id37, 0)
          __args121 = cut(____id37, 1)
          if __x183 == "%do":
            return lower_do(__args121, hoist, stmt63, tail63)
          else:
            if __x183 == "%call":
              return lower(__args121, hoist, stmt63, tail63)
            else:
              if __x183 == "%set":
                return lower_set(__args121, hoist, stmt63, tail63)
              else:
                if __x183 == "%if":
                  return lower_if(__args121, hoist, stmt63, tail63)
                else:
                  if __x183 == "%try":
                    return lower_try(__args121, hoist, tail63)
                  else:
                    if __x183 == "%while":
                      return lower_while(__args121, hoist)
                    else:
                      if __x183 == "%for":
                        return lower_for(__args121, hoist)
                      else:
                        if __x183 == "%with":
                          return lower_with(__args121, hoist, stmt63, tail63)
                        else:
                          if __x183 == "%block":
                            return lower_block("%block", __args121, hoist, stmt63, tail63)
                          else:
                            if __x183 == "%cases":
                              return lower_cases(__args121, hoist, stmt63, tail63)
                            else:
                              if __x183 == "import":
                                return lower_import(__args121, hoist, stmt63, tail63)
                              else:
                                if __x183 == "from":
                                  return lower_from(__args121, hoist, stmt63, tail63)
                                else:
                                  if __x183 == "%function":
                                    return lower_function(__args121, hoist)
                                  else:
                                    if __x183 == "%local-function" or __x183 == "%global-function":
                                      return lower_definition(__x183, __args121, hoist)
                                    else:
                                      if in63(__x183, ["%and", "%or"]):
                                        return lower_short(__x183, __args121, hoist)
                                      else:
                                        if statement63(__x183):
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
  ____prev = has(setenv("target", toplevel=True), "value")
  setenv("target", toplevel=True)["value"] = "py"
  def __f10():
    try:
      ____prev1 = has(setenv("indent-level", toplevel=True), "value")
      setenv("indent-level", toplevel=True)["value"] = 0
      def __f111():
        try:
          return [True, compile(expand(["%set", "lumen-result", form]))]
        except:
          import sys
          e = sys.exc_info()
          return [False, e[1], e]
      ____id39 = __f111()
      ____ok3 = has(____id39, 0)
      ____x188 = has(____id39, 1)
      setenv("indent-level", toplevel=True)["value"] = ____prev1
      __e48 = None
      if ____ok3:
        __e48 = ____x188
      else:
        raise ____x188
        __e48 = None
      return [True, __e48]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id38 = __f10()
  ____ok2 = has(____id38, 0)
  ____x185 = has(____id38, 1)
  setenv("target", toplevel=True)["value"] = ____prev
  __e49 = None
  if ____ok2:
    __e49 = ____x185
  else:
    raise ____x185
    __e49 = None
  __code = __e49
  run(__code, globals, locals)
  return eval_result(globals, locals)

def immediate_call63(x=None):
  return not atom63(x) and (not atom63(hd(x)) and hd(hd(x)) == "%function")

def __L_37do__special(*_args, **_keys):
  __forms1 = unstash(_args, _keys)
  __s3 = ""
  ____x192 = __forms1
  ____i21 = 0
  while ____i21 < L_35(____x192):
    __x193 = ____x192[____i21]
    if has(setenv("target", toplevel=True), "value") == "lua" and (immediate_call63(__x193) and "\n" == char(__s3, edge(__s3))):
      __s3 = cat(clip(__s3, 0, edge(__s3)), ";\n")
    __s3 = cat(__s3, compile(__x193, stmt=True))
    if not atom63(__x193):
      if hd(__x193) == "%return" or hd(__x193) == "%break":
        break
    ____i21 = ____i21 + 1
  return __s3

setenv("%do", special=__L_37do__special, stmt=True, tr=True)
def __L_37cmake_block__special(body=None):
  __ind2 = indentation()
  __s4 = ""
  __s4 = cat(__s4, __ind2, "block(SCOPE_FOR VARIABLES)\n")
  __s4 = cat(__s4, compile_body(body))
  __s4 = cat(__s4, __ind2, "endblock()\n")
  return __s4

setenv("%cmake-block", special=__L_37cmake_block__special, stmt=True, tr=True)
def __L_37if__special(cond=None, cons=None, alt=None):
  __cond1 = compile(cond)
  __cons = compile_body(cons)
  __e50 = None
  if alt:
    __e50 = compile_body(alt)
  __alt = __e50
  __ind3 = indentation()
  __s5 = ""
  if has(setenv("target", toplevel=True), "value") == "js":
    __s5 = cat(__s5, __ind3, "if (", __cond1, ") {\n", __cons, __ind3, "}")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      __s5 = cat(__s5, __ind3, "if ", __cond1, ":\n", __cons)
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        __s5 = cat(__s5, __ind3, "if(", __cond1, ")\n", __cons)
      else:
        __s5 = cat(__s5, __ind3, "if ", __cond1, " then\n", __cons)
  if __alt and has(setenv("target", toplevel=True), "value") == "js":
    __s5 = cat(__s5, " else {\n", __alt, __ind3, "}")
  else:
    if __alt and has(setenv("target", toplevel=True), "value") == "py":
      __s5 = cat(__s5, __ind3, "else:\n", __alt)
    else:
      if __alt and has(setenv("target", toplevel=True), "value") == "cmake":
        __s5 = cat(__s5, __ind3, "else()\n", __alt)
      else:
        if __alt:
          __s5 = cat(__s5, __ind3, "else\n", __alt)
  if has(setenv("target", toplevel=True), "value") == "lua":
    return cat(__s5, __ind3, "end\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "js":
      return cat(__s5, "\n")
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        return cat(__s5, __ind3, "endif()\n")
      else:
        return __s5

setenv("%if", special=__L_37if__special, stmt=True, tr=True)
def __L_37while__special(cond=None, form=None):
  __cond2 = compile(cond)
  __body12 = compile_body(form)
  __ind4 = indentation()
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__ind4, "while (", __cond2, ") {\n", __body12, __ind4, "}\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      return cat(__ind4, "while ", __cond2, ":\n", __body12)
    else:
      if has(setenv("target", toplevel=True), "value") == "cmake":
        return cat(__ind4, "while(", __cond2, ")\n", __body12, __ind4, "endwhile()\n")
      else:
        return cat(__ind4, "while ", __cond2, " do\n", __body12, __ind4, "end\n")

setenv("%while", special=__L_37while__special, stmt=True, tr=True)
def __L_37for__special(t=None, k=None, form=None, *_args, **_keys):
  ____r138 = unstash(_args, _keys)
  __t = destash33(t, ____r138)
  __k10 = destash33(k, ____r138)
  __form6 = destash33(form, ____r138)
  ____id40 = ____r138
  __async1 = has(____id40, "async")
  __t1 = compile(__t)
  __k11 = compile(__k10)
  __ind5 = indentation()
  __body13 = compile_body(__form6)
  __e51 = None
  if __async1:
    __e51 = "async "
  else:
    __e51 = ""
  __a6 = __e51
  if has(setenv("target", toplevel=True), "value") == "lua":
    return cat(__ind5, "for ", __k11, " in next, ", __t1, " do\n", __body13, __ind5, "end\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      return cat(__ind5, __a6, "for ", __k11, " in ", __t1, ":\n", __body13)
    else:
      return cat(__ind5, "for (", __k11, " in ", __t1, ") {\n", __body13, __ind5, "}\n")

setenv("%for", special=__L_37for__special, stmt=True, tr=True)
def __L_37with__special(t=None, form=None, *_args, **_keys):
  ____r139 = unstash(_args, _keys)
  __t2 = destash33(t, ____r139)
  __form7 = destash33(form, ____r139)
  ____id41 = ____r139
  __async2 = has(____id41, "async")
  __t3 = compile(__t2)
  __ind6 = indentation()
  __body14 = compile_body(__form7)
  __e52 = None
  if __async2:
    __e52 = "async "
  else:
    __e52 = ""
  __a7 = __e52
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(__ind6, __a7, "with ", __t3, ":\n", __body14)
  else:
    return ""

setenv("%with", special=__L_37with__special, stmt=True, tr=True)
def __L_37block__special(name=None, t=None, form=None):
  __t4 = compile(t)
  __ind7 = indentation()
  __body15 = compile_body(form)
  __e53 = None
  if some63(__t4):
    __e53 = " "
  else:
    __e53 = ""
  __sep = __e53
  __e54 = None
  if some63(__t4):
    __e54 = "("
  else:
    __e54 = ""
  __lh11 = __e54
  __e55 = None
  if some63(__t4):
    __e55 = ")"
  else:
    __e55 = ""
  __rh11 = __e55
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(__ind7, name, __sep, __t4, ":\n", __body15)
  else:
    return cat(__ind7, name, __sep, __lh11, __t4, __rh11, __sep, "{\n", __body15, __ind7, "}\n")

setenv("%block", special=__L_37block__special, stmt=True, tr=True)
def __L_37try__special(form=None):
  __ind8 = indentation()
  __body16 = compile_body(form)
  __e56 = None
  if has(setenv("target", toplevel=True), "value") == "py":
    __e56 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", False, ["%get", "e", 1], "e"]]]
  else:
    __e56 = ["%return", ["%array", False, "e"]]
  __hf = __e56
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
  ____x204 = compile(__hf, stmt=True)
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __h3 = ____x204
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__ind8, "try {\n", __body16, __ind8, "}\n", __ind8, "catch (e) {\n", __h3, __ind8, "}\n")
  else:
    return cat(__ind8, "try:\n", __body16, __ind8, "except:\n", __h3)

setenv("%try", special=__L_37try__special, stmt=True, tr=True)
def __L_37delete__special(place=None):
  __e57 = None
  if has(setenv("target", toplevel=True), "value") == "py":
    __e57 = "del "
  else:
    __e57 = "delete "
  return cat(indentation(), __e57, compile(place))

setenv("%delete", special=__L_37delete__special, stmt=True)
def __L_37break__special():
  __e58 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e58 = "()"
  else:
    __e58 = ""
  return cat(indentation(), "break", __e58)

setenv("%break", special=__L_37break__special, stmt=True)
def __L_37function__special(args=None, *_args, **_keys):
  ____r144 = unstash(_args, _keys)
  __args15 = destash33(args, ____r144)
  ____id42 = ____r144
  __body17 = cut(____id42, 0)
  return apply(compile_function, join([__args15], __body17, []))

setenv("%function", special=__L_37function__special)
def __L_37global_function__special(name=None, args=None, *_args, **_keys):
  ____r145 = unstash(_args, _keys)
  __name8 = destash33(name, ____r145)
  __args16 = destash33(args, ____r145)
  ____id43 = ____r145
  __body18 = cut(____id43, 0)
  if has(setenv("target", toplevel=True), "value") == "lua" or (has(setenv("target", toplevel=True), "value") == "py" or has(setenv("target", toplevel=True), "value") == "cmake"):
    ____x208 = object([__args16])
    ____x208["name"] = __name8
    ____x209 = object([])
    ____x209["name"] = __name8
    __x207 = apply(compile_function, join(____x208, __body18, ____x209))
    return cat(indentation(), __x207)
  else:
    return compile(["%set", __name8, join(["%function", __args16], __body18)], stmt=True)

setenv("%global-function", special=__L_37global_function__special, stmt=True, tr=True)
def __L_37local_function__special(name=None, args=None, *_args, **_keys):
  ____r146 = unstash(_args, _keys)
  __name9 = destash33(name, ____r146)
  __args17 = destash33(args, ____r146)
  ____id44 = ____r146
  __body19 = cut(____id44, 0)
  if has(setenv("target", toplevel=True), "value") == "lua" or (has(setenv("target", toplevel=True), "value") == "py" or has(setenv("target", toplevel=True), "value") == "cmake"):
    ____x213 = object([__args17])
    ____x213["name"] = __name9
    ____x213["prefix"] = "local"
    ____x214 = object([])
    ____x214["name"] = __name9
    ____x214["prefix"] = "local"
    __x212 = apply(compile_function, join(____x213, __body19, ____x214))
    return cat(indentation(), __x212)
  else:
    return compile(["%local", __name9, join(["%function", __args17], __body19)], stmt=True)

setenv("%local-function", special=__L_37local_function__special, stmt=True, tr=True)
def __L_37ref__special(variable=None):
  if id63(variable):
    return compile(variable)
  else:
    return cat("${", compile(variable), "}")

setenv("%ref", special=__L_37ref__special)
def __L_37id__special(x=None):
  return escape(compile(["%ptr", x]))

setenv("%id", special=__L_37id__special)
def __L_37ptr__special(x=None):
  __e59 = None
  if reference63(x):
    __e59 = x
  else:
    __e59 = ["%ref", x]
  return compile(__e59)

setenv("%ptr", special=__L_37ptr__special)
def __L_37return__special(x=None):
  __e60 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e62 = None
    if nil63(x):
      __e62 = ["return"]
    else:
      __e62 = ["return", "PROPAGATE", x]
    __e60 = compile(__e62)
  else:
    __e61 = None
    if nil63(x):
      __e61 = "return"
    else:
      __e61 = cat("return ", compile(x))
    __e60 = __e61
  return cat(indentation(), __e60)

setenv("%return", special=__L_37return__special, stmt=True)
def __L_37new__special(x=None):
  return cat("new ", compile(x))

setenv("%new", special=__L_37new__special)
def __L_37typeof__special(x=None):
  return cat("typeof(", compile(x), ")")

setenv("%typeof", special=__L_37typeof__special)
def __L_37error__special(x=None):
  __e63 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e63 = cat("throw ", compile(["%new", ["Error", x]]))
  else:
    __e64 = None
    if has(setenv("target", toplevel=True), "value") == "py":
      __e64 = cat("raise ", compile(["Exception", x]))
    else:
      __e64 = cat("error(", compile(x), ")")
    __e63 = __e64
  __e7 = __e63
  return cat(indentation(), __e7)

setenv("%error", special=__L_37error__special, stmt=True)
def __L_37throw__special(x=None):
  __e65 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e65 = cat("throw ", compile(x))
  else:
    __e66 = None
    if has(setenv("target", toplevel=True), "value") == "py":
      __e66 = cat("raise ", compile(x))
    else:
      __e66 = cat("error(", compile(x), ")")
    __e65 = __e66
  __e8 = __e65
  return cat(indentation(), __e8)

setenv("%throw", special=__L_37throw__special, stmt=True)
def __L_37local__special(name=None, value=None):
  if has(setenv("target", toplevel=True), "value") == "cmake":
    return compile(["%set", name, value])
  if nil63(value) and has(setenv("target", toplevel=True), "value") == "py":
    value = "nil"
  __id45 = compile(name)
  __value1 = compile(value)
  __e67 = None
  if is63(value):
    __e67 = cat(" = ", __value1)
  else:
    __e67 = ""
  __rh2 = __e67
  __e68 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e68 = "var "
  else:
    __e69 = None
    if has(setenv("target", toplevel=True), "value") == "lua":
      __e69 = "local "
    else:
      __e69 = ""
    __e68 = __e69
  __keyword = __e68
  __ind9 = indentation()
  return cat(__ind9, __keyword, __id45, __rh2)

setenv("%local", special=__L_37local__special, stmt=True)
def __L_37set__special(lh=None, rh=None):
  __lh2 = compile(lh)
  __e70 = None
  if nil63(rh):
    __e70 = "nil"
  else:
    __e70 = rh
  __rh3 = compile(__e70)
  __ind10 = indentation()
  if has(setenv("target", toplevel=True), "value") == "cmake":
    return cat(indentation(), "set(", __lh2, " ", __rh3, ")")
  else:
    return cat(indentation(), __lh2, " = ", __rh3)

setenv("%set", special=__L_37set__special, stmt=True)
def __L_37get__special(t=None, k=None):
  __t11 = compile(t)
  __k111 = compile(k)
  if has(setenv("target", toplevel=True), "value") == "lua" and char(__t11, 0) == "{" or infix_operator63(t):
    __t11 = cat("(", __t11, ")")
  if string_literal63(k) and (valid_id63(inner(k)) and not( has(setenv("target", toplevel=True), "value") == "py")):
    return cat(__t11, ".", inner(k))
  else:
    return cat(__t11, "[", __k111, "]")

setenv("%get", special=__L_37get__special)
def __L_37idx__special(t=None, k=None):
  __t12 = compile(t)
  __k12 = compile(k, "raw")
  if has(setenv("target", toplevel=True), "value") == "lua" and char(__t12, 0) == "{" or infix_operator63(t):
    __t12 = cat("(", __t12, ")")
  return cat(__t12, ".", __k12)

setenv("%idx", special=__L_37idx__special)
def __L_37array__special(*_args, **_keys):
  __forms2 = unstash(_args, _keys)
  if has(setenv("target", toplevel=True), "value") == "cmake":
    return mapcat(compile, __forms2, " ")
  else:
    __e71 = None
    if has(setenv("target", toplevel=True), "value") == "lua":
      __e71 = "{"
    else:
      __e71 = "["
    __open = __e71
    __e72 = None
    if has(setenv("target", toplevel=True), "value") == "lua":
      __e72 = "}"
    else:
      __e72 = "]"
    __close = __e72
    __s6 = ""
    __c6 = ""
    ____o11 = __forms2
    __k121 = None
    for __k121 in indices(____o11):
      __v10 = ____o11[__k121]
      if number63(__k121):
        __s6 = cat(__s6, __c6, compile(__v10))
        __c6 = ", "
    return cat(__open, __s6, __close)

setenv("%array", special=__L_37array__special)
def __L_37object__special(*_args, **_keys):
  __forms3 = unstash(_args, _keys)
  __e73 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e73 = ""
  else:
    __e73 = "{"
  __s7 = __e73
  __c7 = ""
  __e74 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e74 = " = "
  else:
    __e75 = None
    if has(setenv("target", toplevel=True), "value") == "cmake":
      __e75 = " "
    else:
      __e75 = ": "
    __e74 = __e75
  __sep1 = __e74
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
  ____x225 = indentation()
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __ind11 = ____x225
  __e76 = None
  if L_35(__forms3) > 2:
    __e76 = cat("\n", __ind11)
  __pad = __e76
  __e77 = None
  if is63(__pad):
    __e77 = cat("\n", indentation())
  else:
    __e77 = ""
  __end = __e77
  __s7 = cat(__s7, either(__pad, ""))
  ____x226 = pair(__forms3)
  ____i23 = 0
  while ____i23 < L_35(____x226):
    ____id46 = ____x226[____i23]
    __k13 = has(____id46, 0)
    __v11 = has(____id46, 1)
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
    ____x227 = compile(__v11)
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
    __s7 = cat(__s7, __c7, key(__k13), __sep1, ____x227)
    __e78 = None
    if has(setenv("target", toplevel=True), "value") == "cmake":
      __e78 = ""
    else:
      __e78 = ","
    __c7 = cat(__e78, either(__pad, " "))
    ____i23 = ____i23 + 1
  __e79 = None
  if has(setenv("target", toplevel=True), "value") == "cmake":
    __e79 = ""
  else:
    __e79 = "}"
  return cat(__s7, __end, __e79)

setenv("%object", special=__L_37object__special)
def __L_37list__special(form=None, comps=None, cond=None, *_args, **_keys):
  ____r159 = unstash(_args, _keys)
  __form8 = destash33(form, ____r159)
  __comps = destash33(comps, ____r159)
  __cond3 = destash33(cond, ____r159)
  ____id47 = ____r159
  __kind = has(____id47, "kind")
  __s8 = compile(__form8)
  __e80 = None
  if __kind == "object":
    __e80 = ["{", "}"]
  else:
    __e80 = ["[", "]"]
  ____id48 = __e80
  __lh3 = has(____id48, 0)
  __rh4 = has(____id48, 1)
  if not( __kind == "object"):
    __s8 = cat("(", __s8, ")")
  ____x230 = __comps
  ____i24 = 0
  while ____i24 < L_35(____x230):
    ____id49 = ____x230[____i24]
    __k14 = has(____id49, 0)
    __v12 = has(____id49, 1)
    __s8 = cat(__s8, " for ", compile(__k14), " in ", compile(__v12))
    ____i24 = ____i24 + 1
  if is63(__cond3):
    __s8 = cat(__s8, " if ", compile(__cond3))
  return cat(__lh3, __s8, __rh4)

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
def __L_37compile__special(*_args, **_keys):
  __args19 = unstash(_args, _keys)
  return mapcat(compile, __args19)

setenv("%compile", special=__L_37compile__special)
def __global__special(x=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(indentation(), "global ", compile(x), "\n")
  else:
    return ""

setenv("global", special=__global__special, stmt=True, tr=True)
def __import__special(name=None, *_args, **_keys):
  ____r162 = unstash(_args, _keys)
  __name10 = destash33(name, ____r162)
  ____id50 = ____r162
  __alias2 = cut(____id50, 0)
  __ind12 = indentation()
  __e81 = None
  if hd(__alias2) == "as":
    __e81 = __alias2[1]
  else:
    __e81 = hd(__alias2)
  __L_as1 = __e81
  __id51 = __L_as1 or __name10
  if has(setenv("target", toplevel=True), "value") == "py":
    __s9 = cat(__ind12, "import ", compile(__name10))
    if __L_as1:
      __s9 = cat(__s9, " as ", compile(__id51))
    return __s9
  else:
    return cat(__ind12, compile(["%local", __id51, ["require", escape(__name10)]]))

setenv("import", special=__import__special, stmt=True)
def __from__special(name=None, *_args, **_keys):
  ____r163 = unstash(_args, _keys)
  __name11 = destash33(name, ____r163)
  ____id52 = ____r163
  __imports = cut(____id52, 0)
  __ind13 = indentation()
  __id53 = __name11
  __r164 = None
  __r164 = drop(__imports)
  __e82 = None
  if last(__imports) == "as":
    __e82 = drop(__imports)
  else:
    add(__imports, __r164)
    __r164 = None
    __e82 = __r164
  __L_as2 = __r164
  __e83 = None
  if hd(__imports) == "import":
    __e83 = tl(__imports)
  else:
    __e83 = __imports
  __names1 = __e83
  def __f12(x=None):
    if x == "*":
      return x
    else:
      return compile(x)
  __names2 = mapcat(__f12, __names1, ", ")
  if has(setenv("target", toplevel=True), "value") == "py":
    __s10 = cat(__ind13, "from ", compile(__name11), " import ", __names2)
    if __L_as2:
      __s10 = cat(__s10, " as ", compile(__L_as2))
    return __s10
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
  __args21 = unstash(_args, _keys)
  if none63(__args21):
    return ":"
  else:
    if one63(__args21):
      return cat(":", compile(hd(__args21)))
    else:
      return mapcat(compile, __args21, ":")

setenv(":", special=__3458__special34)
def __L_37as__special(form=None, id=None):
  return cat(compile(form), " as ", compile(id))

setenv("%as", special=__L_37as__special)
def __yield__special(*_args, **_keys):
  __args22 = unstash(_args, _keys)
  return cat(indentation(), "yield ", mapcat(compile, __args22, ", "))

setenv("yield", special=__yield__special, stmt=True)
def __await__special(x=None):
  __e84 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e84 = ""
  else:
    __e84 = "await "
  __a8 = __e84
  return cat(__a8, compile(x))

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
