from lumen import *
def getenv(k=None, p=None):
  if string63(k):
    __i = edge(environment)
    while __i >= 0:
      if has63(environment[__i], k):
        __b = environment[__i][k]
        __e28 = None
        if p:
          __e28 = has(__b, p)
        else:
          __e28 = __b
        return __e28
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
  return macro63(x) or special63(x) or symbol63(x) or variable63(x)
def quoted(form=None):
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
  if keys63(args):
    if has(setenv("target", toplevel=True), "value") == "py":
      __l = array(args)
      ____o = args
      __k = None
      for __k in indices(____o):
        __v = ____o[__k]
        if not number63(__k):
          add(__l, ["%literal", cat("|", __k, "=|"), __v])
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
    __id = unique("id")
    __bs = [__id, rh]
    ____o2 = lh
    __k2 = None
    for __k2 in indices(____o2):
      __v2 = ____o2[__k2]
      __e29 = None
      if __k2 == "rest":
        __e29 = ["cut", __id, L_35(lh)]
      else:
        __e29 = ["has", __id, ["quote", bias(__k2)]]
      __x6 = __e29
      if is63(__k2):
        __e30 = None
        if __v2 == True:
          __e30 = __k2
        else:
          __e30 = __v2
        __k3 = __e30
        __bs = join(__bs, bind(__k3, __x6))
    return __bs
def __f2(L_from=None):
  ____x17 = object(["target"])
  ____x17["js"] = [["idx", ["idx", ["idx", "Array", "prototype"], "slice"], "call"], "arguments", L_from]
  ____x17["py"] = ["|list|", "|_args|"]
  ____x17["lua"] = ["list", "|...|"]
  return ____x17
setenv("arguments%", macro=__f2)
def bind42(args=None, body=None):
  __args1 = {}
  def rest():
    __args1["rest"] = True
    ____x26 = object(["target"])
    ____x26["py"] = "|_keys|"
    return ["unstash", ["arguments%", L_35(__args1)], ____x26]
  if atom63(args):
    return [__args1, join(["let", [args, rest()]], body)]
  else:
    __bs1 = []
    __r19 = unique("r")
    ____o3 = args
    __k4 = None
    for __k4 in indices(____o3):
      __v3 = ____o3[__k4]
      if number63(__k4):
        if atom63(__v3):
          add(__args1, __v3)
        else:
          __x30 = unique("x")
          add(__args1, __x30)
          __bs1 = join(__bs1, [__v3, __x30])
    if keys63(args):
      __bs1 = join(__bs1, [__r19, rest()])
      __n4 = L_35(__args1)
      __i5 = 0
      while __i5 < __n4:
        __v4 = __args1[__i5]
        __bs1 = join(__bs1, [__v4, ["destash!", __v4, __r19]])
        __i5 = __i5 + 1
      __bs1 = join(__bs1, [keys(args), __r19])
    return [__args1, join(["let", __bs1], body)]
def quoting63(depth=None):
  return number63(depth)
def quasiquoting63(depth=None):
  return quoting63(depth) and depth > 0
def can_unquote63(depth=None):
  return quoting63(depth) and depth == 1
def quasisplice63(x=None, depth=None):
  return can_unquote63(depth) and not atom63(x) and hd(x) == "unquote-splicing"
def expand_local(__x38=None):
  ____id1 = __x38
  __x39 = has(____id1, 0)
  __name = has(____id1, 1)
  __value = has(____id1, 2)
  setenv(__name, variable=True)
  return ["%local", __name, macroexpand(__value)]
def expand_function(__x41=None):
  ____id2 = __x41
  __x42 = has(____id2, 0)
  __args = has(____id2, 1)
  __body = cut(____id2, 2)
  add(environment, {})
  ____o4 = __args
  ____i6 = None
  for ____i6 in indices(____o4):
    ____x43 = ____o4[____i6]
    setenv(____x43, variable=True)
  ____x44 = join(["%function", __args], macroexpand(__body))
  drop(environment)
  return ____x44
def expand_definition(__x46=None):
  ____id3 = __x46
  __x47 = has(____id3, 0)
  __name1 = has(____id3, 1)
  __args11 = has(____id3, 2)
  __body1 = cut(____id3, 3)
  add(environment, {})
  ____o5 = __args11
  ____i7 = None
  for ____i7 in indices(____o5):
    ____x48 = ____o5[____i7]
    setenv(____x48, variable=True)
  ____x49 = join([__x47, __name1, __args11], macroexpand(__body1))
  drop(environment)
  return ____x49
def expand_macro(form=None):
  return macroexpand(expand1(form))
def expand1(__x51=None):
  ____id4 = __x51
  __name2 = has(____id4, 0)
  __body2 = cut(____id4, 1)
  return apply(macro_function(__name2), __body2)
def real63(x=None):
  return number63(x) and not nan63(x) and not inf63(x)
def valid_access63(L_str=None):
  return L_35(L_str) > 2 and not( "." == char(L_str, 0)) and not( "." == char(L_str, edge(L_str))) and not search(L_str, "..")
def parse_access(L_str=None):
  def __f3(a=None, b=None):
    __n7 = number(a)
    if is63(__n7):
      return ["at", b, __n7]
    else:
      return ["idx", b, a]
  return reduce(__f3, reverse(split(L_str, ".")))
def parse_access63(form=None):
  return string63(form) and not string_literal63(form) and not id_literal63(form) and search(form, ".") and valid_access63(form)
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
        __x54 = hd(form)
        if __x54 == "%local":
          return expand_local(form)
        else:
          if __x54 == "%function":
            return expand_function(form)
          else:
            if __x54 == "%global-function":
              return expand_definition(form)
            else:
              if __x54 == "%local-function":
                return expand_definition(form)
              else:
                if __x54 == "%expansion":
                  return form[1]
                else:
                  if macro63(__x54):
                    return expand_macro(form)
                  else:
                    if parse_access63(__x54):
                      return macroexpand(join([parse_access(__x54)], tl(form)))
                    else:
                      return map(macroexpand, form)
def quasiquote_list(form=None, depth=None):
  __xs = [object(["list"])]
  ____o6 = form
  __k5 = None
  for __k5 in indices(____o6):
    __v5 = ____o6[__k5]
    if not number63(__k5):
      __e31 = None
      if quasisplice63(__v5, depth):
        __e31 = quasiexpand(__v5[1])
      else:
        __e31 = quasiexpand(__v5, depth)
      __v6 = __e31
      last(__xs)[__k5] = __v6
  ____x58 = form
  ____i9 = 0
  while ____i9 < L_35(____x58):
    __x59 = ____x58[____i9]
    if quasisplice63(__x59, depth):
      __x60 = quasiexpand(__x59[1])
      add(__xs, __x60)
      add(__xs, ["list"])
    else:
      add(last(__xs), quasiexpand(__x59, depth))
    ____i9 = ____i9 + 1
  def __f4(x=None):
    return L_35(x) > 1 or not( hd(x) == "list") or keys63(x)
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
def expand_if(__x64=None):
  ____id5 = __x64
  __a = has(____id5, 0)
  __b1 = has(____id5, 1)
  __c = cut(____id5, 2)
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
reserved = {"=": True, "==": True, "+": True, "-": True, "%": True, "*": True, "/": True, "<": True, ">": True, "<=": True, ">=": True, "break": True, "case": True, "catch": True, "class": True, "const": True, "continue": True, "debugger": True, "default": True, "delete": True, "do": True, "else": True, "eval": True, "finally": True, "for": True, "function": True, "if": True, "import": True, "in": True, "instanceof": True, "let": True, "return": True, "switch": True, "throw": True, "try": True, "typeof": True, "var": True, "void": True, "with": True, "and": True, "end": True, "load": True, "repeat": True, "while": True, "false": True, "local": True, "nil": True, "then": True, "not": True, "true": True, "elseif": True, "or": True, "until": True, "from": True, "str": True, "print": True}
def reserved63(x=None):
  return has63(reserved, x)
def valid_code63(n=None):
  return number_code63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95
def id(id=None):
  __e32 = None
  if has(setenv("target", toplevel=True), "value") == "py":
    __e32 = "L_"
  else:
    __e32 = "_"
  __x70 = __e32
  __e33 = None
  if number_code63(code(id, 0)):
    __e33 = __x70
  else:
    __e33 = ""
  __id11 = __e33
  __i11 = 0
  while __i11 < L_35(id):
    __c1 = char(id, __i11)
    __n9 = code(__c1)
    __e34 = None
    if __c1 == "-" and not( id == "-"):
      __e37 = None
      if __i11 == 0:
        __e37 = __x70
      else:
        __e37 = "_"
      __e34 = __e37
    else:
      __e35 = None
      if valid_code63(__n9):
        __e35 = __c1
      else:
        __e36 = None
        if __i11 == 0:
          __e36 = cat(__x70, __n9)
        else:
          __e36 = __n9
        __e35 = __e36
      __e34 = __e35
    __c11 = __e34
    __id11 = cat(__id11, __c11)
    __i11 = __i11 + 1
  if reserved63(__id11):
    return cat(__x70, __id11)
  else:
    return __id11
def valid_id63(x=None):
  return some63(x) and x == id(x)
__names = {}
def unique(x=None):
  __x71 = id(x)
  if has63(__names, __x71):
    __i12 = __names[__x71]
    __names[__x71] = __names[__x71] + 1
    return unique(cat(__x71, __i12))
  else:
    __names[__x71] = 1
    return cat("__", __x71)
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
    __x72 = f(__v7)
    if is63(__x72):
      add(__o7, literal(__k6))
      add(__o7, __x72)
  return __o7
____x74 = object([])
____x75 = object([])
____x75["js"] = "!"
____x75["lua"] = "not"
____x75["py"] = "not"
____x74["not"] = ____x75
____x76 = object([])
____x76["js"] = "!"
____x76["lua"] = "not"
____x76["py"] = "not"
____x74["%not"] = ____x76
____x74["%unm"] = "-"
____x77 = object([])
____x77["*"] = True
____x77["/"] = True
____x77["%"] = True
____x77["%mul"] = "*"
____x77["%div"] = "/"
____x77["%mod"] = "%"
____x78 = object([])
____x79 = object([])
____x79["js"] = "+"
____x79["lua"] = ".."
____x78["cat"] = ____x79
____x80 = object([])
____x80["js"] = "+"
____x80["lua"] = ".."
____x78["%cat"] = ____x80
____x81 = object([])
____x81["+"] = True
____x81["-"] = True
____x81["%add"] = "+"
____x81["%sub"] = "-"
____x82 = object([])
____x82["<"] = True
____x82[">"] = True
____x82["<="] = True
____x82[">="] = True
____x82["%lt"] = "<"
____x82["%gt"] = ">"
____x82["%le"] = "<="
____x82["%ge"] = ">="
____x83 = object([])
____x84 = object([])
____x84["js"] = "==="
____x84["lua"] = "=="
____x84["py"] = "=="
____x83["="] = ____x84
____x85 = object([])
____x85["js"] = "==="
____x85["lua"] = "=="
____x85["py"] = "=="
____x83["%eq"] = ____x85
____x86 = object([])
____x87 = object([])
____x87["js"] = "&&"
____x87["lua"] = "and"
____x87["py"] = "and"
____x86["and"] = ____x87
____x88 = object([])
____x88["js"] = "&&"
____x88["lua"] = "and"
____x88["py"] = "and"
____x86["%and"] = ____x88
____x89 = object([])
____x90 = object([])
____x90["js"] = "||"
____x90["lua"] = "or"
____x90["py"] = "or"
____x89["or"] = ____x90
____x91 = object([])
____x91["js"] = "||"
____x91["lua"] = "or"
____x91["py"] = "or"
____x89["%or"] = ____x91
infix = [____x74, ____x77, ____x78, ____x81, ____x82, ____x83, ____x86, ____x89]
def unary63(form=None):
  return two63(form) and in63(hd(form), ["not", "-", "%not", "%unm"])
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
  def __f6(level=None):
    __x93 = has(level, op)
    if __x93 == True:
      return op
    else:
      if string63(__x93):
        return __x93
      else:
        if is63(__x93):
          return has(__x93, has(setenv("target", toplevel=True), "value"))
  return find(__f6, infix)
def infix63(x=None):
  return is63(getop(x))
def infix_operator63(x=None):
  return not atom63(x) and infix63(hd(x))
def compile_args(args=None, default63=None):
  __s1 = "("
  __c2 = ""
  ____x94 = args
  ____i16 = 0
  while ____i16 < L_35(____x94):
    __x95 = ____x94[____i16]
    __s1 = cat(__s1, __c2, compile(__x95))
    if has(setenv("target", toplevel=True), "value") == "py" and default63 and not id_literal63(__x95):
      __s1 = cat(__s1, "=None")
    __c2 = ", "
    ____i16 = ____i16 + 1
  return cat(__s1, ")")
def escape_newlines(s=None):
  __s11 = ""
  __i17 = 0
  while __i17 < L_35(s):
    __c3 = char(s, __i17)
    __e38 = None
    if __c3 == "\n":
      __e38 = "\\n"
    else:
      __e39 = None
      if __c3 == "\r":
        __e39 = "\\r"
      else:
        __e39 = __c3
      __e38 = __e39
    __s11 = cat(__s11, __e38)
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
def compile_atom(x=None):
  if x == "nil":
    return compile_nil()
  else:
    if id_literal63(x):
      return inner(x)
    else:
      if string_literal63(x):
        return escape_newlines(x)
      else:
        if string63(x):
          return id(x)
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
  ____id6 = form
  __x96 = has(____id6, 0)
  __args2 = cut(____id6, 1)
  ____id7 = getenv(__x96)
  __special = has(____id7, "special")
  __stmt = has(____id7, "stmt")
  __self_tr63 = has(____id7, "tr")
  __e40 = None
  if stmt63 and not __stmt:
    __e40 = indentation()
  else:
    __e40 = ""
  __p = __e40
  __tr = terminator(stmt63 and not __self_tr63)
  return cat(__p, apply(__special, __args2), __tr)
def parenthesize_call63(x=None):
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0
def compile_call(form=None):
  __f = hd(form)
  __f1 = compile(__f)
  __args3 = compile_args(stash42(tl(form)))
  if parenthesize_call63(__f):
    return cat("(", __f1, ")", __args3)
  else:
    return cat(__f1, __args3)
def op_delims(parent=None, child=None, *_args, **_keys):
  ____r64 = unstash(list(_args), _keys)
  __parent = destash33(parent, ____r64)
  __child = destash33(child, ____r64)
  ____id8 = ____r64
  __right = has(____id8, "right")
  __e41 = None
  if __right:
    __e41 = L_6261
  else:
    __e41 = L_62
  if __e41(precedence(__child), precedence(__parent)):
    return ["(", ")"]
  else:
    return ["", ""]
def compile_infix(form=None):
  ____id9 = form
  __op = has(____id9, 0)
  ____id10 = cut(____id9, 1)
  __a1 = has(____id10, 0)
  __b2 = has(____id10, 1)
  ____id111 = op_delims(form, __a1)
  __ao = has(____id111, 0)
  __ac = has(____id111, 1)
  ____id12 = op_delims(form, __b2, right=True)
  __bo = has(____id12, 0)
  __bc = has(____id12, 1)
  __a2 = compile(__a1)
  __b3 = compile(__b2)
  __op1 = getop(__op)
  if unary63(form):
    return cat(__op1, __ao, " ", __a2, __ac)
  else:
    return cat(__ao, __a2, __ac, " ", __op1, " ", __bo, __b3, __bc)
def compile_body(body=None):
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
  ____x99 = compile(body, stmt=True)
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __s2 = ____x99
  if has(setenv("target", toplevel=True), "value") == "py" and none63(__s2):
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
    ____x100 = cat(indentation(), "pass\n")
    setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
    return ____x100
  else:
    return __s2
def compile_function(args=None, body=None, *_args, **_keys):
  ____r67 = unstash(list(_args), _keys)
  __args4 = destash33(args, ____r67)
  __body3 = destash33(body, ____r67)
  ____id13 = ____r67
  __name3 = has(____id13, "name")
  __prefix = has(____id13, "prefix")
  __e42 = None
  if __name3:
    __e42 = compile(__name3)
  else:
    __e42 = ""
  __id14 = __e42
  __e43 = None
  if has(setenv("target", toplevel=True), "value") == "lua" and has63(__args4, "rest"):
    __e43 = join(__args4, ["|...|"])
  else:
    __e44 = None
    if has(setenv("target", toplevel=True), "value") == "py" and has63(__args4, "rest"):
      __e44 = join(__args4, ["|*_args|", "|**_keys|"])
    else:
      __e44 = __args4
    __e43 = __e44
  __args12 = __e43
  __args5 = compile_args(__args12, True)
  __body4 = compile_body(__body3)
  __ind = indentation()
  __e45 = None
  if __prefix:
    __e45 = cat(__prefix, " ")
  else:
    __e45 = ""
  __p1 = __e45
  __e46 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e46 = ""
  else:
    __e46 = "end"
  __tr1 = __e46
  if __name3:
    __tr1 = cat(__tr1, "\n")
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat("function ", __id14, __args5, " {\n", __body4, __ind, "}", __tr1)
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      return cat("def ", __id14, __args5, ":\n", __body4)
    else:
      return cat(__p1, "function ", __id14, __args5, "\n", __body4, __ind, __tr1)
def can_return63(form=None):
  return is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form)))
def compile(form=None, *_args, **_keys):
  ____r69 = unstash(list(_args), _keys)
  __form = destash33(form, ____r69)
  ____id15 = ____r69
  __stmt1 = has(____id15, "stmt")
  if nil63(__form):
    return ""
  else:
    if special_form63(__form):
      return compile_special(__form, __stmt1)
    else:
      __tr2 = terminator(__stmt1)
      __e47 = None
      if __stmt1:
        __e47 = indentation()
      else:
        __e47 = ""
      __ind1 = __e47
      __e48 = None
      if atom63(__form):
        __e48 = compile_atom(__form)
      else:
        __e49 = None
        if infix63(hd(__form)):
          __e49 = compile_infix(__form)
        else:
          __e49 = compile_call(__form)
        __e48 = __e49
      __form1 = __e48
      return cat(__ind1, __form1, __tr2)
def lower_statement(form=None, tail63=None):
  __hoist = []
  __e = lower(form, __hoist, True, tail63)
  __e50 = None
  if some63(__hoist) and is63(__e):
    __e50 = join(["do"], __hoist, [__e])
  else:
    __e51 = None
    if is63(__e):
      __e51 = __e
    else:
      __e52 = None
      if L_35(__hoist) > 1:
        __e52 = join(["do"], __hoist)
      else:
        __e52 = hd(__hoist)
      __e51 = __e52
    __e50 = __e51
  return either(__e50, ["do"])
def lower_body(body=None, tail63=None):
  return lower_statement(join(["do"], body), tail63)
def literal63(form=None):
  return atom63(form) or hd(form) == "%array" or hd(form) == "%object" or hd(form) == "%list"
def standalone63(form=None):
  return not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)) or id_literal63(form)
def lower_do(args=None, hoist=None, stmt63=None, tail63=None):
  ____x108 = almost(args)
  ____i18 = 0
  while ____i18 < L_35(____x108):
    __x109 = ____x108[____i18]
    ____y = lower(__x109, hoist, stmt63)
    if yes(____y):
      __e1 = ____y
      if standalone63(__e1):
        add(hoist, __e1)
    ____i18 = ____i18 + 1
  __e2 = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(__e2):
    return ["return", __e2]
  else:
    return __e2
def lower_set(args=None, hoist=None, stmt63=None, tail63=None):
  ____id16 = args
  __lh = has(____id16, 0)
  __rh = has(____id16, 1)
  add(hoist, ["%set", lower(__lh, hoist), lower(__rh, hoist)])
  if not( stmt63 and not tail63):
    return __lh
def lower_if(args=None, hoist=None, stmt63=None, tail63=None):
  ____id17 = args
  __cond = has(____id17, 0)
  __L_then = has(____id17, 1)
  __L_else = has(____id17, 2)
  if stmt63:
    __e54 = None
    if is63(__L_else):
      __e54 = [lower_body([__L_else], tail63)]
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([__L_then], tail63)], __e54))
  else:
    __e3 = unique("e")
    add(hoist, ["%local", __e3])
    __e53 = None
    if is63(__L_else):
      __e53 = [lower(["%set", __e3, __L_else])]
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, __L_then])], __e53))
    return __e3
def lower_short(x=None, args=None, hoist=None):
  ____id18 = args
  __a3 = has(____id18, 0)
  __b4 = has(____id18, 1)
  __hoist1 = []
  __b11 = lower(__b4, __hoist1)
  if some63(__hoist1):
    __id19 = unique("id")
    __e55 = None
    if x == "and":
      __e55 = ["%if", __id19, __b4, __id19]
    else:
      __e55 = ["%if", __id19, __id19, __b4]
    return lower(["do", ["%local", __id19, __a3], __e55], hoist)
  else:
    return [x, lower(__a3, hoist), __b11]
def lower_try(args=None, hoist=None, tail63=None):
  return add(hoist, ["%try", lower_body(args, tail63)])
def lower_while(args=None, hoist=None):
  ____id20 = args
  __c4 = has(____id20, 0)
  __body5 = cut(____id20, 1)
  __pre = []
  __c5 = lower(__c4, __pre)
  __e56 = None
  if none63(__pre):
    __e56 = ["while", __c5, lower_body(__body5)]
  else:
    __e56 = ["while", True, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lower_body(__body5)])]
  return add(hoist, __e56)
def lower_for(args=None, hoist=None):
  ____id21 = args
  __t = has(____id21, 0)
  __k8 = has(____id21, 1)
  __body6 = cut(____id21, 2)
  return add(hoist, ["%for", lower(__t, hoist), __k8, lower_body(__body6)])
def lower_with(args=None, hoist=None, stmt63=None, tail63=None):
  ____id22 = args
  __t1 = has(____id22, 0)
  __body7 = cut(____id22, 1)
  if stmt63 and not tail63:
    return add(hoist, ["%with", lower(__t1, hoist), lower_body(__body7, tail63)])
  else:
    __e4 = unique("e")
    add(hoist, ["%local", __e4])
    add(hoist, ["%with", lower(__t1, hoist), lower(["%set", __e4, join(["do"], __body7)])])
    return __e4
def lower_function(args=None, hoist=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    __f11 = unique("f")
    return lower(["do", join(["%local-function", __f11], args), __f11], hoist)
  else:
    ____id23 = args
    __a4 = has(____id23, 0)
    __body8 = cut(____id23, 1)
    return ["%function", __a4, lower_body(__body8, True)]
def lower_definition(kind=None, args=None, hoist=None):
  ____id24 = args
  __name4 = has(____id24, 0)
  __args6 = has(____id24, 1)
  __body9 = cut(____id24, 2)
  return add(hoist, [kind, __name4, __args6, lower_body(__body9, True)])
def lower_call(form=None, hoist=None):
  def __f7(x=None):
    return lower(x, hoist)
  __form2 = map(__f7, form)
  if some63(__form2):
    return __form2
def pairwise63(form=None):
  return in63(hd(form), ["<", "<=", "=", ">=", ">"])
def lower_pairwise(form=None):
  if pairwise63(form):
    __e5 = []
    ____id25 = form
    __x145 = has(____id25, 0)
    __args7 = cut(____id25, 1)
    def __f8(a=None, b=None):
      add(__e5, [__x145, a, b])
      return a
    reduce(__f8, __args7)
    return join(["and"], reverse(__e5))
  else:
    return form
def lower_infix63(form=None):
  return infix63(hd(form)) and L_35(form) > 3
def lower_infix(form=None, hoist=None):
  __form3 = lower_pairwise(form)
  ____id26 = __form3
  __x148 = has(____id26, 0)
  __args8 = cut(____id26, 1)
  def __f9(a=None, b=None):
    return [__x148, b, a]
  return lower(reduce(__f9, reverse(__args8)), hoist)
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
          ____id27 = form
          __x151 = has(____id27, 0)
          __args9 = cut(____id27, 1)
          if __x151 == "do":
            return lower_do(__args9, hoist, stmt63, tail63)
          else:
            if __x151 == "%set":
              return lower_set(__args9, hoist, stmt63, tail63)
            else:
              if __x151 == "%if":
                return lower_if(__args9, hoist, stmt63, tail63)
              else:
                if __x151 == "%try":
                  return lower_try(__args9, hoist, tail63)
                else:
                  if __x151 == "while":
                    return lower_while(__args9, hoist)
                  else:
                    if __x151 == "%for":
                      return lower_for(__args9, hoist)
                    else:
                      if __x151 == "%with":
                        return lower_with(__args9, hoist, stmt63, tail63)
                      else:
                        if __x151 == "%function":
                          return lower_function(__args9, hoist)
                        else:
                          if __x151 == "%local-function" or __x151 == "%global-function":
                            return lower_definition(__x151, __args9, hoist)
                          else:
                            if in63(__x151, ["and", "or"]):
                              return lower_short(__x151, __args9, hoist)
                            else:
                              if statement63(__x151):
                                return lower_special(form, hoist)
                              else:
                                return lower_call(form, hoist)
def expand(form=None):
  return lower(macroexpand(form))
def run(code=None, globals=None):
  __state = globals or lumen_globals
  exec(code, __state, __state)
  return None
def eval_result(globals=None):
  __state1 = globals or lumen_globals
  return __state1["lumen_result"]
def L_eval(form=None, globals=None):
  __previous = has(setenv("target", toplevel=True), "value")
  setenv("target", toplevel=True)["value"] = "py"
  __code = compile(expand(["set", "lumen-result", form]))
  setenv("target", toplevel=True)["value"] = __previous
  run(__code, globals)
  return eval_result(globals)
def immediate_call63(x=None):
  return not atom63(x) and not atom63(hd(x)) and hd(hd(x)) == "%function"
def __f10(*_args, **_keys):
  __forms1 = unstash(list(_args), _keys)
  __s4 = ""
  ____x156 = __forms1
  ____i20 = 0
  while ____i20 < L_35(____x156):
    __x157 = ____x156[____i20]
    if has(setenv("target", toplevel=True), "value") == "lua" and immediate_call63(__x157) and "\n" == char(__s4, edge(__s4)):
      __s4 = cat(clip(__s4, 0, edge(__s4)), ";\n")
    __s4 = cat(__s4, compile(__x157, stmt=True))
    if not atom63(__x157):
      if hd(__x157) == "return" or hd(__x157) == "break":
        break
    ____i20 = ____i20 + 1
  return __s4
setenv("do", special=__f10, stmt=True, tr=True)
def __f111(cond=None, cons=None, alt=None):
  __cond2 = compile(cond)
  __cons1 = compile_body(cons)
  __e57 = None
  if alt:
    __e57 = compile_body(alt)
  __alt1 = __e57
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
  __body11 = compile_body(form)
  __ind5 = indentation()
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__ind5, "while (", __cond4, ") {\n", __body11, __ind5, "}\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      return cat(__ind5, "while ", __cond4, ":\n", __body11)
    else:
      return cat(__ind5, "while ", __cond4, " do\n", __body11, __ind5, "end\n")
setenv("while", special=__f12, stmt=True, tr=True)
def __f13(t=None, k=None, form=None):
  __t3 = compile(t)
  __e58 = None
  if atom63(k):
    __e58 = compile(k)
  else:
    __e58 = mapcat(compile, k, ", ")
  __k10 = __e58
  __ind7 = indentation()
  __body13 = compile_body(form)
  if has(setenv("target", toplevel=True), "value") == "lua":
    return cat(__ind7, "for ", __k10, " in next, ", __t3, " do\n", __body13, __ind7, "end\n")
  else:
    if has(setenv("target", toplevel=True), "value") == "py":
      return cat(__ind7, "for ", __k10, " in ", __t3, ":\n", __body13)
    else:
      return cat(__ind7, "for (", __k10, " in ", __t3, ") {\n", __body13, __ind7, "}\n")
setenv("%for", special=__f13, stmt=True, tr=True)
def __f14(t=None, form=None):
  __t5 = compile(t)
  __ind9 = indentation()
  __body15 = compile_body(form)
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(__ind9, "with ", __t5, ":\n", __body15)
  else:
    return ""
setenv("%with", special=__f14, stmt=True, tr=True)
def __f15(form=None):
  __ind11 = indentation()
  __body17 = compile_body(form)
  __e59 = None
  if has(setenv("target", toplevel=True), "value") == "py":
    __e59 = ["do", ["import", "sys"], ["%local", "e", [["idx", "sys", "exc_info"]]], ["return", ["%array", False, ["get", "e", 1], "e"]]]
  else:
    __e59 = ["return", ["%array", False, "e"]]
  __hf1 = __e59
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") + 1
  ____x179 = compile(__hf1, stmt=True)
  setenv("indent-level", toplevel=True)["value"] = has(setenv("indent-level", toplevel=True), "value") - 1
  __h1 = ____x179
  if has(setenv("target", toplevel=True), "value") == "js":
    return cat(__ind11, "try {\n", __body17, __ind11, "}\n", __ind11, "catch (e) {\n", __h1, __ind11, "}\n")
  else:
    return cat(__ind11, "try:\n", __body17, __ind11, "except:\n", __h1)
setenv("%try", special=__f15, stmt=True, tr=True)
def __f16(place=None):
  __e60 = None
  if has(setenv("target", toplevel=True), "value") == "py":
    __e60 = "del "
  else:
    __e60 = "delete "
  return cat(indentation(), __e60, compile(place))
setenv("%delete", special=__f16, stmt=True)
def __f17():
  return cat(indentation(), "break")
setenv("break", special=__f17, stmt=True)
def __f18(args=None, body=None):
  return compile_function(args, body)
setenv("%function", special=__f18)
def __f19(name=None, args=None, body=None):
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __x183 = compile_function(args, body, name=name)
    return cat(indentation(), __x183)
  else:
    return compile(["%set", name, ["%function", args, body]], stmt=True)
setenv("%global-function", special=__f19, stmt=True, tr=True)
def __f20(name=None, args=None, body=None):
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __x189 = compile_function(args, body, name=name, prefix="local")
    return cat(indentation(), __x189)
  else:
    return compile(["%local", name, ["%function", args, body]], stmt=True)
setenv("%local-function", special=__f20, stmt=True, tr=True)
def __f21(x=None):
  __e61 = None
  if nil63(x):
    __e61 = "return"
  else:
    __e61 = cat("return ", compile(x))
  __x193 = __e61
  return cat(indentation(), __x193)
setenv("return", special=__f21, stmt=True)
def __f22(x=None):
  return cat("new ", compile(x))
setenv("new", special=__f22)
def __f23(x=None):
  return cat("typeof(", compile(x), ")")
setenv("typeof", special=__f23)
def __f24(x=None):
  __e62 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e62 = cat("throw ", compile(["new", ["Error", x]]))
  else:
    __e63 = None
    if has(setenv("target", toplevel=True), "value") == "py":
      __e63 = cat("raise ", compile(["Exception", x]))
    else:
      __e63 = cat("error(", compile(x), ")")
    __e62 = __e63
  __e15 = __e62
  return cat(indentation(), __e15)
setenv("error", special=__f24, stmt=True)
def __f25(name=None, value=None):
  if nil63(value) and has(setenv("target", toplevel=True), "value") == "py":
    value = "nil"
  __id29 = compile(name)
  __value11 = compile(value)
  __e64 = None
  if is63(value):
    __e64 = cat(" = ", __value11)
  else:
    __e64 = ""
  __rh2 = __e64
  __e65 = None
  if has(setenv("target", toplevel=True), "value") == "js":
    __e65 = "var "
  else:
    __e66 = None
    if has(setenv("target", toplevel=True), "value") == "lua":
      __e66 = "local "
    else:
      __e66 = ""
    __e65 = __e66
  __keyword1 = __e65
  __ind13 = indentation()
  return cat(__ind13, __keyword1, __id29, __rh2)
setenv("%local", special=__f25, stmt=True)
def __f26(lh=None, rh=None):
  __lh2 = compile(lh)
  __e67 = None
  if nil63(rh):
    __e67 = "nil"
  else:
    __e67 = rh
  __rh4 = compile(__e67)
  return cat(indentation(), __lh2, " = ", __rh4)
setenv("%set", special=__f26, stmt=True)
def __f27(t=None, k=None):
  __t12 = compile(t)
  __k12 = compile(k)
  if has(setenv("target", toplevel=True), "value") == "lua" and char(__t12, 0) == "{" or infix_operator63(t):
    __t12 = cat("(", __t12, ")")
  if string_literal63(k) and valid_id63(inner(k)) and not( has(setenv("target", toplevel=True), "value") == "py"):
    return cat(__t12, ".", inner(k))
  else:
    return cat(__t12, "[", __k12, "]")
setenv("get", special=__f27)
def __f28(t=None, k=None):
  __t14 = compile(t)
  __k14 = compile(k)
  if has(setenv("target", toplevel=True), "value") == "lua" and char(__t14, 0) == "{" or infix_operator63(t):
    __t14 = cat("(", __t14, ")")
  return cat(__t14, ".", __k14)
setenv("idx", special=__f28)
def __f29(*_args, **_keys):
  __forms3 = unstash(list(_args), _keys)
  __e68 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e68 = "{"
  else:
    __e68 = "["
  __open1 = __e68
  __e69 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e69 = "}"
  else:
    __e69 = "]"
  __close1 = __e69
  __s8 = ""
  __c7 = ""
  ____o11 = __forms3
  __k131 = None
  for __k131 in indices(____o11):
    __v10 = ____o11[__k131]
    if number63(__k131):
      __s8 = cat(__s8, __c7, compile(__v10))
      __c7 = ", "
  return cat(__open1, __s8, __close1)
setenv("%array", special=__f29)
def __f30(*_args, **_keys):
  __forms5 = unstash(list(_args), _keys)
  __s10 = "{"
  __c9 = ""
  __e70 = None
  if has(setenv("target", toplevel=True), "value") == "lua":
    __e70 = " = "
  else:
    __e70 = ": "
  __sep1 = __e70
  ____o13 = pair(__forms5)
  __k17 = None
  for __k17 in indices(____o13):
    __v13 = ____o13[__k17]
    if number63(__k17):
      ____id31 = __v13
      __k18 = has(____id31, 0)
      __v14 = has(____id31, 1)
      if not string63(__k18):
        raise Exception(cat("Illegal key: ", L_str(__k18)))
      __s10 = cat(__s10, __c9, key(__k18), __sep1, compile(__v14))
      __c9 = ", "
  return cat(__s10, "}")
setenv("%object", special=__f30)
def __f31(form=None, comps=None, cond=None):
  __s12 = compile(form)
  ____x201 = comps
  ____i26 = 0
  while ____i26 < L_35(____x201):
    ____id33 = ____x201[____i26]
    __k20 = has(____id33, 0)
    __v16 = has(____id33, 1)
    __e71 = None
    if obj63(__k20):
      __e71 = mapcat(compile, __k20, ", ")
    else:
      __e71 = compile(__k20)
    __k161 = __e71
    __s12 = cat(__s12, " for ", __k161, " in ", compile(__v16))
    ____i26 = ____i26 + 1
  if is63(cond):
    __s12 = cat(__s12, " if ", compile(cond))
  return cat("[", __s12, "]")
setenv("%list", special=__f31)
def __f32(*_args, **_keys):
  __args111 = unstash(list(_args), _keys)
  return apply(cat, map(compile, __args111))
setenv("%literal", special=__f32)
def __f33(x=None):
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(indentation(), "global ", compile(x), "\n")
  else:
    return ""
setenv("global", special=__f33, stmt=True, tr=True)
def __f34(name=None, *_args, **_keys):
  ____r140 = unstash(list(_args), _keys)
  __name6 = destash33(name, ____r140)
  ____id36 = ____r140
  __alias1 = cut(____id36, 0)
  __ind15 = indentation()
  __e72 = None
  if hd(__alias1) == "as":
    __e72 = __alias1[1]
  else:
    __e72 = hd(__alias1)
  __as1 = __e72
  __id37 = __as1 or __name6
  if has(setenv("target", toplevel=True), "value") == "py":
    __s14 = cat(__ind15, "import ", compile(__name6))
    if __as1:
      __s14 = cat(__s14, " as ", compile(__id37))
    return __s14
  else:
    return cat(__ind15, compile(["%local", __id37, ["require", escape(__name6)]]))
setenv("import", special=__f34, stmt=True)
def __f35(name=None, *_args, **_keys):
  ____r143 = unstash(list(_args), _keys)
  __name8 = destash33(name, ____r143)
  ____id40 = ____r143
  __imports1 = cut(____id40, 0)
  __ind17 = indentation()
  __id41 = __name8
  __e73 = None
  if hd(__imports1) == "import":
    __e73 = tl(__imports1)
  else:
    __e73 = __imports1
  __names3 = __e73
  def __f36(x=None):
    if x == "*":
      return x
    else:
      return compile(x)
  __names4 = mapcat(__f36, __names3, ", ")
  if has(setenv("target", toplevel=True), "value") == "py":
    return cat(__ind17, "from ", compile(__name8), " import ", __names4)
  else:
    return ""
setenv("from", special=__f35, stmt=True)
def __f37(*_args, **_keys):
  __args13 = unstash(list(_args), _keys)
  if none63(__args13):
    return ","
  else:
    if one63(__args13):
      return cat(",", compile(hd(__args13)))
    else:
      return mapcat(compile, __args13, ",")
setenv("\\,", special=__f37)
def __f38(*_args, **_keys):
  __args15 = unstash(list(_args), _keys)
  if none63(__args15):
    return ":"
  else:
    if one63(__args15):
      return cat(":", compile(hd(__args15)))
    else:
      return mapcat(compile, __args15, ":")
setenv(":", special=__f38)
def __f39(form=None, id=None):
  return cat(compile(form), " as ", compile(id))
setenv("%as", special=__f39)
def __f40(x=None, l=None):
  return cat(compile(x), " in ", compile(l))
setenv("%in", special=__f40)
def __f41(*_args, **_keys):
  __args17 = unstash(list(_args), _keys)
  return cat(indentation(), "yield ", mapcat(compile, __args17, ", "))
setenv("yield", special=__f41, stmt=True)
