from lumen import *
def getenv(k=None, p=None):
  if string63(k):
    __i = edge(environment)
    while __i >= 0:
      if has63(environment[__i], k):
        __b = environment[__i][k]
        __e40 = None
        if p:
          __e40 = has(__b, p)
        else:
          __e40 = __b
        return __e40
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
      __l1 = ["%object", "\"_stash\"", True]
      ____o1 = args
      __k1 = None
      for __k1 in indices(____o1):
        __v1 = ____o1[__k1]
        if not number63(__k1):
          add(__l1, literal(__k1))
          add(__l1, __v1)
      return join(args, [__l1])
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
          ____o2 = lh
          __k2 = None
          for __k2 in indices(____o2):
            __v2 = ____o2[__k2]
            __e41 = None
            if __k2 == "rest":
              __e41 = ["cut", __id2, L_35(lh)]
            else:
              __e41 = ["has", __id2, ["quote", bias(__k2)]]
            __x11 = __e41
            if is63(__k2):
              __e42 = None
              if __v2 == True:
                __e42 = __k2
              else:
                __e42 = __v2
              __k3 = __e42
              __bs = join(__bs, bind(__k3, __x11))
          return __bs

def __f2(L_from=None):
  ____x22 = object(["target"])
  ____x22["js"] = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", L_from]
  ____x22["py"] = ["|list|", "|_args|"]
  ____x22["lua"] = ["list", "|...|"]
  return ____x22

setenv("arguments%", macro=__f2)
def body_docstring(body=None):
  if L_35(body) > 1 and string_literal63(hd(body)):
    return [hd(body), tl(body)]
  else:
    return [[], body]

def bind42(args=None, body=None):
  __args1 = {}
  def rest():
    __args1["rest"] = True
    ____x31 = object(["target", ["unstash", ["list", "..."]]])
    ____x31["py"] = ["unstash", "_args", "_keys"]
    return ____x31
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
    ____o3 = args
    __k4 = None
    for __k4 in indices(____o3):
      __v3 = ____o3[__k4]
      if number63(__k4):
        if atom63(__v3):
          add(__args1, __v3)
        else:
          if hd(__v3) == "o":
            ____id4 = __v3
            ___2 = has(____id4, 0)
            __var2 = has(____id4, 1)
            __val3 = has(____id4, 2)
            add(__args1, __var2)
            add(__inits, ["%if", ["nil?", __var2], ["%set", __var2, __val3]])
          else:
            if hd(__v3) == "t":
              ____id5 = __v3
              ___3 = has(____id5, 0)
              __var3 = has(____id5, 1)
              __val4 = has(____id5, 2)
              __val5 = either(__val4, __var3)
              add(__args1, __var3)
              add(__inits, ["%if", ["nil?", __var3], ["%set", __var3, ["the", __val5]]])
            else:
              __x45 = unique("x")
              add(__args1, __x45)
              __bs1 = join(__bs1, [__v3, __x45])
    if props63(args):
      __pre = join(__pre, [__r21, rest()])
      __n4 = L_35(__args1)
      __i5 = 0
      while __i5 < __n4:
        __v4 = __args1[__i5]
        __pre = join(__pre, [__v4, ["destash!", __v4, __r21]])
        __i5 = __i5 + 1
      __bs1 = join(__bs1, [props(args), __r21])
    __forms = join(["let", __pre], __inits, [join(["let", __bs1], __body)])
    __e43 = None
    if is63(__doc):
      __e43 = ["do", __doc, __forms]
    else:
      __e43 = __forms
    return [__args1, __e43]

def quoting63(depth=None):
  return number63(depth)

def quasiquoting63(depth=None):
  return quoting63(depth) and depth > 0

def can_unquote63(depth=None):
  return quoting63(depth) and depth == 1

def quasisplice63(x=None, depth=None):
  return can_unquote63(depth) and (not atom63(x) and hd(x) == "unquote-splicing")

def expand_local(__x56=None):
  ____id6 = __x56
  __x57 = has(____id6, 0)
  __name = has(____id6, 1)
  __value = has(____id6, 2)
  setenv(__name, variable=True)
  return ["%local", __name, macroexpand(__value)]

def expand_function(__x59=None):
  ____id7 = __x59
  __x60 = has(____id7, 0)
  __args = has(____id7, 1)
  __body1 = cut(____id7, 2)
  add(environment, {})
  ____r29 = None
  try:
    ____o4 = __args
    ____i6 = None
    for ____i6 in indices(____o4):
      ____x61 = ____o4[____i6]
      setenv(____x61, variable=True)
    ____r29 = join(["%function", __args], macroexpand(__body1))
  finally:
    drop(environment)
  return ____r29

def expand_definition(__x63=None):
  ____id8 = __x63
  __x64 = has(____id8, 0)
  __name1 = has(____id8, 1)
  __args11 = has(____id8, 2)
  __body2 = cut(____id8, 3)
  add(environment, {})
  ____r32 = None
  try:
    ____o5 = __args11
    ____i7 = None
    for ____i7 in indices(____o5):
      ____x65 = ____o5[____i7]
      setenv(____x65, variable=True)
    ____r32 = join([__x64, __name1, __args11], macroexpand(__body2))
  finally:
    drop(environment)
  return ____r32

def expand_macro(form=None):
  return macroexpand(expand1(form))

def expand1(__x67=None):
  ____id9 = __x67
  __name2 = has(____id9, 0)
  __body3 = cut(____id9, 1)
  return apply(macro_function(__name2), __body3)

def real63(x=None):
  return number63(x) and (not nan63(x) and not inf63(x))

def valid_access63(L_str=None):
  return L_35(L_str) > 2 and (not( "." == char(L_str, 0)) and (not( "." == char(L_str, edge(L_str))) and not search(L_str, "..")))

def parse_access(L_str=None):
  def __f3(a=None, b=None):
    __n7 = number(a)
    if is63(__n7):
      return ["at", b, __n7]
    else:
      return ["%idx", b, a]
  return reduce(__f3, reverse(split(L_str, ".")))

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
        __x70 = hd(form)
        if __x70 == "%local":
          return expand_local(form)
        else:
          if __x70 == "%function":
            return expand_function(form)
          else:
            if __x70 == "%global-function":
              return expand_definition(form)
            else:
              if __x70 == "%local-function":
                return expand_definition(form)
              else:
                if __x70 == "%expansion":
                  return form[1]
                else:
                  if macro63(__x70):
                    return expand_macro(form)
                  else:
                    if parse_access63(__x70):
                      return macroexpand(join([parse_access(__x70)], tl(form)))
                    else:
                      return map(macroexpand, form)

def quasiquote_list(form=None, depth=None):
  __xs = [object(["list"])]
  ____o6 = form
  __k5 = None
  for __k5 in indices(____o6):
    __v5 = ____o6[__k5]
    if not number63(__k5):
      __e44 = None
      if quasisplice63(__v5, depth):
        __e44 = quasiexpand(__v5[1])
      else:
        __e44 = quasiexpand(__v5, depth)
      __v6 = __e44
      last(__xs)[__k5] = __v6
  ____x74 = form
  ____i9 = 0
  while ____i9 < L_35(____x74):
    __x75 = ____x74[____i9]
    if quasisplice63(__x75, depth):
      __x76 = quasiexpand(__x75[1])
      add(__xs, __x76)
      add(__xs, ["list"])
    else:
      add(last(__xs), quasiexpand(__x75, depth))
    ____i9 = ____i9 + 1
  def __f4(x=None):
    return L_35(x) > 1 or (not( hd(x) == "list") or props63(x))
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

def expand_if(__x80=None):
  ____id10 = __x80
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
  __i10 = 0
  while __i10 < has(setenv("indent-level", toplevel=True), "value"):
    __s = cat(__s, "  ")
    __i10 = __i10 + 1
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
  }
}
def reserved63(x=None):
  return has63(reserved["all"], x) or has63(reserved[has(setenv("target", toplevel=True), "value")], x)

def valid_code63(n=None):
  return number_code63(n) or (n > 64 and n < 91 or (n > 96 and n < 123 or n == 95))

def compile_keyword(x=None):
  return escape(x)

def compile_id(id=None, raw63=None):
  if keyword63(id):
    return compile_keyword(id)
  else:
    if code(id, 0) == 46:
      return cat(".", compile_id(clip(id, 1), True))
    else:
      __e45 = None
      if has(setenv("target", toplevel=True), "value") == "py":
        __e45 = "L_"
      else:
        __e45 = "_"
      __x86 = __e45
      __e46 = None
      if number_code63(code(id, 0)):
        __e46 = __x86
      else:
        __e46 = ""
      __id11 = __e46
      __i11 = 0
      while __i11 < L_35(id):
        __c1 = char(id, __i11)
        __n9 = code(__c1)
        __e47 = None
        if __c1 == "-" and not( id == "-"):
          __e50 = None
          if __i11 == 0:
            __e50 = __x86
          else:
            __e50 = "_"
          __e47 = __e50
        else:
          __e48 = None
          if valid_code63(__n9):
            __e48 = __c1
          else:
            __e49 = None
            if __i11 == 0:
              __e49 = cat(__x86, __n9)
            else:
              __e49 = __n9
            __e48 = __e49
          __e47 = __e48
        __c11 = __e47
        __id11 = cat(__id11, __c11)
        __i11 = __i11 + 1
      if raw63:
        return __id11
      else:
        if reserved63(__id11):
          return cat(__x86, __id11)
        else:
          return __id11

def valid_id63(x=None):
  return some63(x) and x == compile_id(x)

__names = {}
def unique(x=None):
  __x87 = compile_id(x)
  if has63(__names, __x87):
    __i12 = __names[__x87]
    __names[__x87] = __names[__x87] + 1
    return unique(cat(__x87, __i12))
  else:
    __names[__x87] = 1
    return cat("__", __x87)

def key(k=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    return k
  else:
    __i13 = inner(k)
    if valid_id63(__i13):
      return __i13
    else:
      if has(setenv("target", toplevel=True), "value") == "js":
        return k
      else:
        return cat("[", k, "]")

def mapo(f=None, t=None):
  __o7 = []
  ____o8 = t
  __k6 = None
  for __k6 in indices(____o8):
    __v7 = ____o8[__k6]
    __x88 = f(__v7)
    if is63(__x88):
      add(__o7, literal(__k6))
      add(__o7, __x88)
  return __o7

____x90 = object([])
____x91 = object([])
____x91["js"] = "!"
____x91["lua"] = "not"
____x91["py"] = "not"
____x90["%not"] = ____x91
____x90["%unm"] = "-"
____x92 = object([])
____x92["%mul"] = "*"
____x92["%div"] = "/"
____x92["%idiv"] = "//"
____x92["%mod"] = "%"
____x93 = object([])
____x94 = object([])
____x94["js"] = "+"
____x94["lua"] = ".."
____x94["py"] = "+"
____x93["%cat"] = ____x94
____x95 = object([])
____x95["%add"] = "+"
____x95["%sub"] = "-"
____x96 = object([])
____x96["%lt"] = "<"
____x96["%gt"] = ">"
____x96["%le"] = "<="
____x96["%ge"] = ">="
____x97 = object([])
____x98 = object([])
____x98["js"] = "==="
____x98["lua"] = "=="
____x98["py"] = "=="
____x97["%eq"] = ____x98
____x99 = object([])
____x100 = object([])
____x100["py"] = "in"
____x99["%in"] = ____x100
____x101 = object([])
____x101["py"] = "is"
____x99["%is"] = ____x101
____x102 = object([])
____x103 = object([])
____x103["js"] = "&&"
____x103["lua"] = "and"
____x103["py"] = "and"
____x102["%and"] = ____x103
____x104 = object([])
____x105 = object([])
____x105["js"] = "||"
____x105["lua"] = "or"
____x105["py"] = "or"
____x104["%or"] = ____x105
infix = [____x90, ____x92, ____x93, ____x95, ____x96, ____x97, ____x99, ____x102, ____x104]
def unary63(form=None):
  return two63(form) and in63(hd(form), ["%not", "%unm"])

def index(k=None):
  return k

def precedence(form=None):
  if not( atom63(form) or unary63(form)):
    ____o9 = infix
    __k7 = None
    for __k7 in indices(____o9):
      __v8 = ____o9[__k7]
      if has63(__v8, hd(form)):
        return index(__k7)
  return 0

def getop(op=None):
  if string63(op):
    def __f6(level=None):
      __x107 = has(level, op)
      if __x107 == True:
        return op
      else:
        if string63(__x107):
          return __x107
        else:
          if is63(__x107):
            return has(__x107, has(setenv("target", toplevel=True), "value"))
    return find(__f6, infix)

def infix63(x=None):
  return is63(getop(x))

def infix_operator63(x=None):
  return not atom63(x) and infix63(hd(x))

def compile_args(args=None, default63=None):
  __s1 = "("
  __c2 = ""
  ____x108 = args
  ____i16 = 0
  while ____i16 < L_35(____x108):
    __x109 = ____x108[____i16]
    __s1 = cat(__s1, __c2, compile(__x109))
    if has(setenv("target", toplevel=True), "value") == "py" and (default63 and (not id_literal63(__x109) and not( __x109 == "..."))):
      __s1 = cat(__s1, "=None")
    __c2 = ", "
    ____i16 = ____i16 + 1
  return cat(__s1, ")")

def escape_newlines(s=None):
  if nil63(search(s, "\n")) and nil63(search(s, "\r")):
    return s
  else:
    __s11 = ""
    __i17 = 0
    while __i17 < L_35(s):
      __c3 = char(s, __i17)
      __e51 = None
      if __c3 == "\n":
        __e51 = "\\n"
      else:
        __e52 = None
        if __c3 == "\r":
          __e52 = "\\r"
        else:
          __e52 = __c3
        __e51 = __e52
      __s11 = cat(__s11, __e51)
      __i17 = __i17 + 1
    return __s11

def compile_nil():
  if has(setenv("target", toplevel=True), "value") == "py":
    return "None"
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
  __x110 = has(____id111, 0)
  __args2 = cut(____id111, 1)
  ____id12 = getenv(__x110)
  __special = has(____id12, "special")
  __stmt = has(____id12, "stmt")
  __self_tr63 = has(____id12, "tr")
  __e53 = None
  if stmt63 and not __stmt:
    __e53 = indentation()
  else:
    __e53 = ""
  __p = __e53
  __tr = terminator(stmt63 and not __self_tr63)
  return cat(__p, apply(__special, __args2), __tr)

def parenthesize_call63(x=None):
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0

def method_call63(form=None):
  __e54 = None
  if list63(form):
    __e54 = hd(form)
  else:
    __e54 = form
  __x111 = __e54
  return string63(__x111) and (L_35(__x111, 1) > 1 and char(__x111, 0) == ".")

def compile_call(form=None):
  __f = hd(form)
  __f1 = compile(__f)
  __args3 = stash42(tl(form))
  __e55 = None
  if method_call63(hd(__args3)):
    __e55 = mapcat(compile, __args3, "")
  else:
    __e55 = compile_args(__args3)
  __args4 = __e55
  if parenthesize_call63(__f):
    return cat("(", __f1, ")", __args4)
  else:
    return cat(__f1, __args4)

def op_delims(parent=None, child=None, *_args, **_keys):
  ____r76 = unstash(_args, _keys)
  __parent = destash33(parent, ____r76)
  __child = destash33(child, ____r76)
  ____id13 = ____r76
  __right = has(____id13, "right")
  __e56 = None
  if __right:
    __e56 = L_6261
  else:
    __e56 = L_62
  if __e56(precedence(__child), precedence(__parent)):
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
  ____x114 = compile(body, stmt=True)
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __s2 = ____x114
  if has(setenv("target", toplevel=True), "value") == "py" and none63(__s2):
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
    ____x115 = cat(indentation(), "pass\n")
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
    return ____x115
  else:
    return __s2

def compile_function(args=None, body=None, *_args, **_keys):
  ____r79 = unstash(_args, _keys)
  __args5 = destash33(args, ____r79)
  __body4 = destash33(body, ____r79)
  ____id18 = ____r79
  __name3 = has(____id18, "name")
  __prefix = has(____id18, "prefix")
  __async = has(____id18, "async")
  __e57 = None
  if __name3:
    __e57 = compile(__name3)
  else:
    __e57 = ""
  __id19 = __e57
  __e58 = None
  if has(__args5, "rest"):
    __e58 = join(__args5, ["..."])
  else:
    __e58 = __args5
  __args12 = __e58
  __args6 = compile_args(__args12, True)
  __body5 = compile_body(__body4)
  __ind = indentation()
  __e59 = None
  if __prefix:
    __e59 = cat(__prefix, " ")
  else:
    __e59 = ""
  __p1 = __e59
  __e60 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e60 = ""
  else:
    __e60 = "end"
  __tr1 = __e60
  __e61 = None
  if __async and not( has(setenv("target", toplevel=True), "value") == "lua"):
    __e61 = "async "
  else:
    __e61 = ""
  __a3 = __e61
  if __name3:
    __tr1 = cat(__tr1, "\n")
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__a3, "function ", __id19, __args6, " {\n", __body5, __ind, "}", __tr1)
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      __e62 = None
      if none63(__ind):
        __e62 = "\n"
      else:
        __e62 = ""
      __ws = __e62
      return cat(__a3, "def ", __id19, __args6, ":\n", __body5, __ws)
    else:
      return cat(__p1, "function ", __id19, __args6, "\n", __body5, __ind, __tr1)

def can_return63(form=None):
  return is63(form) and (atom63(form) or not( hd(form) == "%return") and not statement63(hd(form)))

def compile(form=None, raw63=None, *_args, **_keys):
  ____r81 = unstash(_args, _keys)
  __form = destash33(form, ____r81)
  __raw63 = destash33(raw63, ____r81)
  ____id20 = ____r81
  __stmt1 = has(____id20, "stmt")
  if nil63(__form):
    return ""
  else:
    if special_form63(__form):
      return compile_special(__form, __stmt1)
    else:
      __tr2 = terminator(__stmt1)
      __e63 = None
      if __stmt1:
        __e63 = indentation()
      else:
        __e63 = ""
      __ind1 = __e63
      __e64 = None
      if atom63(__form):
        __e64 = compile_atom(__form, __raw63)
      else:
        __e65 = None
        if infix63(hd(__form)):
          __e65 = compile_infix(__form)
        else:
          __e65 = compile_call(__form)
        __e64 = __e65
      __form1 = __e64
      return cat(__ind1, __form1, __tr2)

def lower_statement(form=None, tail63=None):
  __hoist = []
  __e = lower(form, __hoist, True, tail63)
  __e66 = None
  if some63(__hoist) and is63(__e):
    __e66 = join(["%do"], __hoist, [__e])
  else:
    __e67 = None
    if is63(__e):
      __e67 = __e
    else:
      __e68 = None
      if L_35(__hoist) > 1:
        __e68 = join(["%do"], __hoist)
      else:
        __e68 = hd(__hoist)
      __e67 = __e68
    __e66 = __e67
  return either(__e66, ["%do"])

def lower_body(body=None, tail63=None):
  return lower_statement(join(["%do"], body), tail63)

def literal63(form=None):
  return atom63(form) or (hd(form) == "%array" or (hd(form) == "%object" or (hd(form) == "%list" or hd(form) == ",")))

def standalone63(form=None):
  return not( has(setenv("target", toplevel=True), "value") == "lua") and string_literal63(form) or (not atom63(form) and (not infix63(hd(form)) and (not literal63(form) and not( "%get" == hd(form)))) or id_literal63(form))

def lower_do(args=None, hoist=None, stmt63=None, tail63=None):
  ____x122 = almost(args)
  ____i18 = 0
  while ____i18 < L_35(____x122):
    __x123 = ____x122[____i18]
    ____y = lower(__x123, hoist, stmt63)
    if yes(____y):
      __e1 = ____y
      if standalone63(__e1):
        add(hoist, __e1)
    ____i18 = ____i18 + 1
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
  if not( stmt63 and not tail63):
    return __lh1

def lower_if(args=None, hoist=None, stmt63=None, tail63=None):
  ____id22 = args
  __cond = has(____id22, 0)
  __then = has(____id22, 1)
  __L_else = has(____id22, 2)
  if stmt63:
    __e70 = None
    if is63(__L_else):
      __e70 = [lower_body([__L_else], tail63)]
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([__then], tail63)], __e70))
  else:
    __e3 = unique("e")
    add(hoist, ["%local", __e3, "nil"])
    __e69 = None
    if is63(__L_else):
      __e69 = [lower(["%set", __e3, __L_else])]
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, __then])], __e69))
    return __e3

def lower_short(x=None, args=None, hoist=None):
  ____id23 = args
  __a4 = has(____id23, 0)
  __b4 = has(____id23, 1)
  __hoist1 = []
  __b11 = lower(__b4, __hoist1)
  if some63(__hoist1):
    __id24 = unique("id")
    __e71 = None
    if x == "%and":
      __e71 = ["%if", __id24, __b4, __id24]
    else:
      __e71 = ["%if", __id24, __id24, __b4]
    return lower(["%do", ["%local", __id24, __a4], __e71], hoist)
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
  __e72 = None
  if none63(__pre1):
    __e72 = ["%while", __c5, lower_body(__body6)]
  else:
    __e72 = ["%while", True, join(["%do"], __pre1, [["%if", ["%not", __c5], ["%break"]], lower_body(__body6)])]
  return add(hoist, __e72)

def lower_for(args=None, hoist=None):
  ____id26 = args
  __h = has(____id26, 0)
  __k8 = has(____id26, 1)
  __body7 = cut(____id26, 2)
  return add(hoist, join(["%for", lower(__h, hoist), __k8, lower_body(__body7)], props(__body7)))

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

def lower_block(args=None, hoist=None, stmt63=None, tail63=None):
  ____id28 = args
  __name4 = has(____id28, 0)
  __h2 = has(____id28, 1)
  __body9 = cut(____id28, 2)
  return add(hoist, ["%block", __name4, lower(__h2, hoist), lower_body(__body9, tail63)])

def lower_function(args=None, hoist=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    __f11 = unique("f")
    return lower(["%do", join(["%local-function", __f11], args), __f11], hoist)
  else:
    ____id29 = args
    __a5 = has(____id29, 0)
    __body10 = cut(____id29, 1)
    return join(["%function", __a5, lower_body(__body10, True)], props(__body10))

def lower_definition(kind=None, args=None, hoist=None):
  ____id30 = args
  __name5 = has(____id30, 0)
  __args7 = has(____id30, 1)
  __body11 = cut(____id30, 2)
  return add(hoist, join([kind, __name5, __args7, lower_body(__body11, True)], props(__body11)))

def lower_call(form=None, hoist=None):
  def __f7(x=None):
    return lower(x, hoist)
  __form2 = map(__f7, form)
  if some63(__form2):
    return __form2

def pairwise63(form=None):
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"])

def lower_pairwise(form=None):
  if pairwise63(form):
    __e5 = []
    ____id31 = form
    __x160 = has(____id31, 0)
    __args8 = cut(____id31, 1)
    def __f8(a=None, b=None):
      add(__e5, [__x160, a, b])
      return a
    reduce(__f8, __args8)
    return join(["%and"], reverse(__e5))
  else:
    return form

def lower_infix63(form=None):
  return infix63(hd(form)) and L_35(form) > 3

def lower_infix(form=None, hoist=None):
  __form3 = lower_pairwise(form)
  ____id32 = __form3
  __x163 = has(____id32, 0)
  __args9 = cut(____id32, 1)
  def __f9(a=None, b=None):
    return [__x163, b, a]
  return lower(reduce(__f9, reverse(__args9)), hoist)

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
          ____id33 = form
          __x166 = has(____id33, 0)
          __args10 = cut(____id33, 1)
          if __x166 == "%do":
            return lower_do(__args10, hoist, stmt63, tail63)
          else:
            if __x166 == "%call":
              return lower(__args10, hoist, stmt63, tail63)
            else:
              if __x166 == "%set":
                return lower_set(__args10, hoist, stmt63, tail63)
              else:
                if __x166 == "%if":
                  return lower_if(__args10, hoist, stmt63, tail63)
                else:
                  if __x166 == "%try":
                    return lower_try(__args10, hoist, tail63)
                  else:
                    if __x166 == "%while":
                      return lower_while(__args10, hoist)
                    else:
                      if __x166 == "%for":
                        return lower_for(__args10, hoist)
                      else:
                        if __x166 == "%with":
                          return lower_with(__args10, hoist, stmt63, tail63)
                        else:
                          if __x166 == "%block":
                            return lower_block(__args10, hoist, stmt63, tail63)
                          else:
                            if __x166 == "%cases":
                              return lower_cases(__args10, hoist, stmt63, tail63)
                            else:
                              if __x166 == "%function":
                                return lower_function(__args10, hoist)
                              else:
                                if __x166 == "%local-function" or __x166 == "%global-function":
                                  return lower_definition(__x166, __args10, hoist)
                                else:
                                  if in63(__x166, ["%and", "%or"]):
                                    return lower_short(__x166, __args10, hoist)
                                  else:
                                    if statement63(__x166):
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

def __f10(*_args, **_keys):
  __forms2 = unstash(_args, _keys)
  __s4 = ""
  ____x172 = __forms2
  ____i20 = 0
  while ____i20 < L_35(____x172):
    __x173 = ____x172[____i20]
    if has(setenv("target", toplevel=True), "value") == "lua" and (immediate_call63(__x173) and "\n" == char(__s4, edge(__s4))):
      __s4 = cat(clip(__s4, 0, edge(__s4)), ";\n")
    __s4 = cat(__s4, compile(__x173, stmt=True))
    if not atom63(__x173):
      if hd(__x173) == "%return" or hd(__x173) == "%break":
        break
    ____i20 = ____i20 + 1
  return __s4

setenv("%do", special=__f10, stmt=True, tr=True)
def __f111(cond=None, cons=None, alt=None):
  __cond2 = compile(cond)
  __cons1 = compile_body(cons)
  __e73 = None
  if alt:
    __e73 = compile_body(alt)
  __alt1 = __e73
  __ind3 = indentation()
  __s6 = ""
  if has(setenv("target", toplevel=True), "value") == "js":
    __s6 = cat(__s6, __ind3, "if (", __cond2, ") {\n", __cons1, __ind3, "}")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      __s6 = cat(__s6, __ind3, "if ", __cond2, ":\n", __cons1)
    else:
      __s6 = cat(__s6, __ind3, "if ", __cond2, " then\n", __cons1)
  if __alt1 and has(setenv("target", toplevel=True), "value") == "js":
    __s6 = cat(__s6, " else {\n", __alt1, __ind3, "}")
  else:
    if __alt1 and has(setenv("target", toplevel=True), "value") == "py":
      __s6 = cat(__s6, __ind3, "else:\n", __alt1)
    else:
      if __alt1:
        __s6 = cat(__s6, __ind3, "else\n", __alt1)
  if has(setenv("target", toplevel=True), "value") == "lua":
    return cat(__s6, __ind3, "end\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "js":
      return cat(__s6, "\n")
    else:
      return __s6

setenv("%if", special=__f111, stmt=True, tr=True)
def __f12(cond=None, form=None):
  __cond4 = compile(cond)
  __body13 = compile_body(form)
  __ind5 = indentation()
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__ind5, "while (", __cond4, ") {\n", __body13, __ind5, "}\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      return cat(__ind5, "while ", __cond4, ":\n", __body13)
    else:
      return cat(__ind5, "while ", __cond4, " do\n", __body13, __ind5, "end\n")

setenv("%while", special=__f12, stmt=True, tr=True)
def __f13(t=None, k=None, form=None, *_args, **_keys):
  ____r117 = unstash(_args, _keys)
  __t2 = destash33(t, ____r117)
  __k11 = destash33(k, ____r117)
  __form5 = destash33(form, ____r117)
  ____id35 = ____r117
  __async2 = has(____id35, "async")
  __t3 = compile(__t2)
  __k12 = compile(__k11)
  __ind7 = indentation()
  __body15 = compile_body(__form5)
  __e74 = None
  if __async2:
    __e74 = "async "
  else:
    __e74 = ""
  __a7 = __e74
  if has(setenv("target", toplevel=True), "value") == "lua":
    return cat(__ind7, "for ", __k12, " in next, ", __t3, " do\n", __body15, __ind7, "end\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      return cat(__ind7, __a7, "for ", __k12, " in ", __t3, ":\n", __body15)
    else:
      return cat(__ind7, "for (", __k12, " in ", __t3, ") {\n", __body15, __ind7, "}\n")

setenv("%for", special=__f13, stmt=True, tr=True)
def __f14(t=None, form=None, *_args, **_keys):
  ____r119 = unstash(_args, _keys)
  __t6 = destash33(t, ____r119)
  __form7 = destash33(form, ____r119)
  ____id37 = ____r119
  __async4 = has(____id37, "async")
  __t7 = compile(__t6)
  __ind9 = indentation()
  __body17 = compile_body(__form7)
  __e75 = None
  if __async4:
    __e75 = "async "
  else:
    __e75 = ""
  __a9 = __e75
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(__ind9, __a9, "with ", __t7, ":\n", __body17)
  else:
    return ""

setenv("%with", special=__f14, stmt=True, tr=True)
def __f15(name=None, t=None, form=None):
  __t9 = compile(t)
  __ind11 = indentation()
  __body19 = compile_body(form)
  __e76 = None
  if some63(__t9):
    __e76 = " "
  else:
    __e76 = ""
  __sep1 = __e76
  __e77 = None
  if some63(__t9):
    __e77 = "("
  else:
    __e77 = ""
  __lh2 = __e77
  __e78 = None
  if some63(__t9):
    __e78 = ")"
  else:
    __e78 = ""
  __rh2 = __e78
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(__ind11, name, __sep1, __t9, ":\n", __body19)
  else:
    return cat(__ind11, name, __sep1, __lh2, __t9, __rh2, __sep1, "{\n", __body19, __ind11, "}\n")

setenv("%block", special=__f15, stmt=True, tr=True)
def __f16(form=None):
  __ind13 = indentation()
  __body21 = compile_body(form)
  __e79 = None
  if has(setenv("target", toplevel=True), "value") == "py":
    __e79 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", False, ["%get", "e", 1], "e"]]]
  else:
    __e79 = ["%return", ["%array", False, "e"]]
  __hf1 = __e79
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
  ____x197 = compile(__hf1, stmt=True)
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __h4 = ____x197
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__ind13, "try {\n", __body21, __ind13, "}\n", __ind13, "catch (e) {\n", __h4, __ind13, "}\n")
  else:
    return cat(__ind13, "try:\n", __body21, __ind13, "except:\n", __h4)

setenv("%try", special=__f16, stmt=True, tr=True)
def __f17(place=None):
  __e80 = None
  if has(setenv("target", toplevel=True), "value") == "py":
    __e80 = "del "
  else:
    __e80 = "delete "
  return cat(indentation(), __e80, compile(place))

setenv("%delete", special=__f17, stmt=True)
def __f18():
  return cat(indentation(), "break")

setenv("%break", special=__f18, stmt=True)
def __f19(args=None, *_args, **_keys):
  ____r129 = unstash(_args, _keys)
  __args121 = destash33(args, ____r129)
  ____id39 = ____r129
  __body23 = cut(____id39, 0)
  return apply(compile_function, join([__args121], __body23, []))

setenv("%function", special=__f19)
def __f20(name=None, args=None, *_args, **_keys):
  ____r131 = unstash(_args, _keys)
  __name7 = destash33(name, ____r131)
  __args14 = destash33(args, ____r131)
  ____id41 = ____r131
  __body25 = cut(____id41, 0)
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    ____x210 = object([__args14])
    ____x210["name"] = __name7
    ____x211 = object([])
    ____x211["name"] = __name7
    __x209 = apply(compile_function, join(____x210, __body25, ____x211))
    return cat(indentation(), __x209)
  else:
    return compile(["%set", __name7, join(["%function", __args14], __body25)], stmt=True)

setenv("%global-function", special=__f20, stmt=True, tr=True)
def __f21(name=None, args=None, *_args, **_keys):
  ____r133 = unstash(_args, _keys)
  __name9 = destash33(name, ____r133)
  __args16 = destash33(args, ____r133)
  ____id43 = ____r133
  __body27 = cut(____id43, 0)
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    ____x221 = object([__args16])
    ____x221["name"] = __name9
    ____x221["prefix"] = "local"
    ____x222 = object([])
    ____x222["name"] = __name9
    ____x222["prefix"] = "local"
    __x220 = apply(compile_function, join(____x221, __body27, ____x222))
    return cat(indentation(), __x220)
  else:
    return compile(["%local", __name9, join(["%function", __args16], __body27)], stmt=True)

setenv("%local-function", special=__f21, stmt=True, tr=True)
def __f22(x=None):
  __e81 = None
  if nil63(x):
    __e81 = "return"
  else:
    __e81 = cat("return ", compile(x))
  __x226 = __e81
  return cat(indentation(), __x226)

setenv("%return", special=__f22, stmt=True)
def __f23(x=None):
  return cat("new ", compile(x))

setenv("%new", special=__f23)
def __f24(x=None):
  return cat("typeof(", compile(x), ")")

setenv("%typeof", special=__f24)
def __f25(x=None):
  __e82 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e82 = cat("throw ", compile(["%new", ["Error", x]]))
  else:
    __e83 = None
    if has(setenv("target", toplevel=True), "value") == "py":
      __e83 = cat("raise ", compile(["Exception", x]))
    else:
      __e83 = cat("error(", compile(x), ")")
    __e82 = __e83
  __e19 = __e82
  return cat(indentation(), __e19)

setenv("%error", special=__f25, stmt=True)
def __f26(x=None):
  __e84 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e84 = cat("throw ", compile(x))
  else:
    __e85 = None
    if has(setenv("target", toplevel=True), "value") == "py":
      __e85 = cat("raise ", compile(x))
    else:
      __e85 = cat("error(", compile(x), ")")
    __e84 = __e85
  __e23 = __e84
  return cat(indentation(), __e23)

setenv("%throw", special=__f26, stmt=True)
def __f27(name=None, value=None):
  if nil63(value) and has(setenv("target", toplevel=True), "value") == "py":
    value = "nil"
  __id45 = compile(name)
  __value11 = compile(value)
  __e86 = None
  if is63(value):
    __e86 = cat(" = ", __value11)
  else:
    __e86 = ""
  __rh4 = __e86
  __e87 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e87 = "var "
  else:
    __e88 = None
    if has(setenv("target", toplevel=True), "value") == "lua":
      __e88 = "local "
    else:
      __e88 = ""
    __e87 = __e88
  __keyword1 = __e87
  __ind15 = indentation()
  return cat(__ind15, __keyword1, __id45, __rh4)

setenv("%local", special=__f27, stmt=True)
def __f28(lh=None, rh=None):
  __lh4 = compile(lh)
  __e89 = None
  if nil63(rh):
    __e89 = "nil"
  else:
    __e89 = rh
  __rh6 = compile(__e89)
  return cat(indentation(), __lh4, " = ", __rh6)

setenv("%set", special=__f28, stmt=True)
def __f29(t=None, k=None):
  __t12 = compile(t)
  __k121 = compile(k)
  if has(setenv("target", toplevel=True), "value") == "lua" and char(__t12, 0) == "{" or infix_operator63(t):
    __t12 = cat("(", __t12, ")")
  if string_literal63(k) and (valid_id63(inner(k)) and not( has(setenv("target", toplevel=True), "value") == "py")):
    return cat(__t12, ".", inner(k))
  else:
    return cat(__t12, "[", __k121, "]")

setenv("%get", special=__f29)
def __f30(t=None, k=None):
  __t14 = compile(t)
  __k14 = compile(k, "raw")
  if has(setenv("target", toplevel=True), "value") == "lua" and char(__t14, 0) == "{" or infix_operator63(t):
    __t14 = cat("(", __t14, ")")
  return cat(__t14, ".", __k14)

setenv("%idx", special=__f30)
def __f31(*_args, **_keys):
  __forms4 = unstash(_args, _keys)
  __e90 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e90 = "{"
  else:
    __e90 = "["
  __open1 = __e90
  __e91 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e91 = "}"
  else:
    __e91 = "]"
  __close1 = __e91
  __s8 = ""
  __c7 = ""
  ____o11 = __forms4
  __k15 = None
  for __k15 in indices(____o11):
    __v10 = ____o11[__k15]
    if number63(__k15):
      __s8 = cat(__s8, __c7, compile(__v10))
      __c7 = ", "
  return cat(__open1, __s8, __close1)

setenv("%array", special=__f31)
def __f32(*_args, **_keys):
  __forms6 = unstash(_args, _keys)
  __s10 = "{"
  __c9 = ""
  __e92 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e92 = " = "
  else:
    __e92 = ": "
  __sep3 = __e92
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
  ____x237 = indentation()
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __ind17 = ____x237
  __e93 = None
  if L_35(__forms6) > 2:
    __e93 = cat("\n", __ind17)
  __pad1 = __e93
  __e94 = None
  if is63(__pad1):
    __e94 = cat("\n", indentation())
  else:
    __e94 = ""
  __end1 = __e94
  __s10 = cat(__s10, either(__pad1, ""))
  ____o13 = pair(__forms6)
  __k19 = None
  for __k19 in indices(____o13):
    __v13 = ____o13[__k19]
    if number63(__k19):
      ____id47 = __v13
      __k20 = has(____id47, 0)
      __v14 = has(____id47, 1)
      if not string63(__k20):
        raise Exception(cat("Illegal key: ", L_str(__k20)))
      setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
      ____x238 = compile(__v14)
      setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
      __s10 = cat(__s10, __c9, key(__k20), __sep3, ____x238)
      __c9 = cat(",", either(__pad1, " "))
  return cat(__s10, __end1, "}")

setenv("%object", special=__f32)
def __f33(form=None, comps=None, cond=None, *_args, **_keys):
  ____r153 = unstash(_args, _keys)
  __form9 = destash33(form, ____r153)
  __comps1 = destash33(comps, ____r153)
  __cond6 = destash33(cond, ____r153)
  ____id51 = ____r153
  __kind1 = has(____id51, "kind")
  __s12 = compile(__form9)
  __e95 = None
  if __kind1 == "object":
    __e95 = ["{", "}"]
  else:
    __e95 = ["[", "]"]
  ____id52 = __e95
  __lh6 = has(____id52, 0)
  __rh8 = has(____id52, 1)
  if not( __kind1 == "object"):
    __s12 = cat("(", __s12, ")")
  ____x245 = __comps1
  ____i26 = 0
  while ____i26 < L_35(____x245):
    ____id53 = ____x245[____i26]
    __k22 = has(____id53, 0)
    __v16 = has(____id53, 1)
    __s12 = cat(__s12, " for ", compile(__k22), " in ", compile(__v16))
    ____i26 = ____i26 + 1
  if is63(__cond6):
    __s12 = cat(__s12, " if ", compile(__cond6))
  return cat(__lh6, __s12, __rh8)

setenv("%list", special=__f33)
def __f34(*_args, **_keys):
  __args18 = unstash(_args, _keys)
  return apply(cat, map(compile, __args18))

setenv("%literal", special=__f34)
def __f35(x=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(indentation(), "global ", compile(x), "\n")
  else:
    return ""

setenv("global", special=__f35, stmt=True, tr=True)
def __f36(name=None, *_args, **_keys):
  ____r157 = unstash(_args, _keys)
  __name11 = destash33(name, ____r157)
  ____id56 = ____r157
  __alias1 = cut(____id56, 0)
  __ind19 = indentation()
  __e96 = None
  if hd(__alias1) == "as":
    __e96 = __alias1[1]
  else:
    __e96 = hd(__alias1)
  __L_as = __e96
  __id57 = __L_as or __name11
  if has(setenv("target", toplevel=True), "value") == "py":
    __s14 = cat(__ind19, "import ", compile(__name11))
    if __L_as:
      __s14 = cat(__s14, " as ", compile(__id57))
    return __s14
  else:
    return cat(__ind19, compile(["%local", __id57, ["require", escape(__name11)]]))

setenv("import", special=__f36, stmt=True)
def __f37(name=None, *_args, **_keys):
  ____r161 = unstash(_args, _keys)
  __name13 = destash33(name, ____r161)
  ____id60 = ____r161
  __imports1 = cut(____id60, 0)
  __ind21 = indentation()
  __id61 = __name13
  __r162 = None
  __r162 = drop(__imports1)
  __e97 = None
  if last(__imports1) == "as":
    __e97 = drop(__imports1)
  else:
    add(__imports1, __r162)
    __r162 = None
    __e97 = __r162
  __L_as1 = __r162
  __e98 = None
  if hd(__imports1) == "import":
    __e98 = tl(__imports1)
  else:
    __e98 = __imports1
  __names3 = __e98
  def __f38(x=None):
    if x == "*":
      return x
    else:
      return compile(x)
  __names4 = mapcat(__f38, __names3, ", ")
  if has(setenv("target", toplevel=True), "value") == "py":
    __s16 = cat(__ind21, "from ", compile(__name13), " import ", __names4)
    if __L_as1:
      __s16 = cat(__s16, " as ", compile(__L_as1))
    return __s16
  else:
    return ""

setenv("from", special=__f37, stmt=True)
def __f39(*_args, **_keys):
  __args20 = unstash(_args, _keys)
  if none63(__args20):
    return ", "
  else:
    if one63(__args20):
      return cat(", ", compile(hd(__args20)))
    else:
      return mapcat(compile, __args20, ", ")

setenv(",", special=__f39)
def __f40(*_args, **_keys):
  __args22 = unstash(_args, _keys)
  if none63(__args22):
    return ":"
  else:
    if one63(__args22):
      return cat(":", compile(hd(__args22)))
    else:
      return mapcat(compile, __args22, ":")

setenv(":", special=__f40)
def __f41(form=None, id=None):
  return cat(compile(form), " as ", compile(id))

setenv("%as", special=__f41)
def __f42(*_args, **_keys):
  __args24 = unstash(_args, _keys)
  return cat(indentation(), "yield ", mapcat(compile, __args24, ", "))

setenv("yield", special=__f42, stmt=True)
def __f43(x=None):
  __e99 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e99 = ""
  else:
    __e99 = "await "
  __a11 = __e99
  return cat(__a11, compile(x))

setenv("await", special=__f43)
def __f44(x=None):
  return cat("b", compile(x))

setenv("%b", special=__f44)
def __f45(x=None):
  return cat("f", compile(x))

setenv("%f", special=__f45)
def __f46(x=None):
  return cat("r", compile(x))

setenv("%r", special=__f46)
def __f47(x=None):
  return cat(indentation(), "@", compile(x))

setenv("@", special=__f47, stmt=True)
