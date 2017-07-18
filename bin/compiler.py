from lumen import *
def getenv(k=None, p=None):
  if string63(k):
    __i = edge(environment)
    while __i >= 0:
      if has63(environment[__i], k):
        __b = environment[__i][k]

        if p:
          __e25 = has(__b, p)
        else:
          __e25 = __b
        return __e25
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
    __l = ["%object", "\"_stash\"", True]
    ____o = args
    __k = None
    for __k in indices(____o):
      __v = ____o[__k]
      if not number63(__k):
        add(__l, literal(__k))
        add(__l, __v)
    return join(args, [__l])
  else:
    return args
def bias(k=None):
  if number63(k):
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua":
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
    ____o1 = lh
    __k1 = None
    for __k1 in indices(____o1):
      __v1 = ____o1[__k1]

      if __k1 == "rest":
        __e26 = ["cut", __id, L_35(lh)]
      else:
        __e26 = ["has", __id, ["quote", bias(__k1)]]
      __x5 = __e26
      if is63(__k1):

        if __v1 == True:
          __e27 = __k1
        else:
          __e27 = __v1
        __k2 = __e27
        __bs = join(__bs, bind(__k2, __x5))
    return __bs
def __f2(L_from=None):
  ____x16 = object(["target"])
  ____x16["js"] = [["idx", ["idx", ["idx", "Array", "prototype"], "slice"], "call"], "arguments", L_from]
  ____x16["py"] = ["|list|", "|_rest|"]
  ____x16["lua"] = ["list", "|...|"]
  return ____x16
setenv("arguments%", {"_stash": True, "macro": __f2})
def bind42(args=None, body=None):
  __args1 = {}
  def rest():
    __args1["rest"] = True
    return ["unstash", ["arguments%", L_35(__args1)]]
  if atom63(args):
    return [__args1, join(["let", [args, rest()]], body)]
  else:
    __bs1 = []
    __r19 = unique("r")
    ____o2 = args
    __k3 = None
    for __k3 in indices(____o2):
      __v2 = ____o2[__k3]
      if number63(__k3):
        if atom63(__v2):
          add(__args1, __v2)
        else:
          __x28 = unique("x")
          add(__args1, __x28)
          __bs1 = join(__bs1, [__v2, __x28])
    if keys63(args):
      __bs1 = join(__bs1, [__r19, rest()])
      __n3 = L_35(__args1)
      __i4 = 0
      while __i4 < __n3:
        __v3 = __args1[__i4]
        __bs1 = join(__bs1, [__v3, ["destash!", __v3, __r19]])
        __i4 = __i4 + 1
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
def expand_local(__x36=None):
  ____id1 = __x36
  __x37 = has(____id1, 0)
  __name = has(____id1, 1)
  __value = has(____id1, 2)
  setenv(__name, {"_stash": True, "variable": True})
  return ["%local", __name, macroexpand(__value)]
def expand_function(__x39=None):
  ____id2 = __x39
  __x40 = has(____id2, 0)
  __args = has(____id2, 1)
  __body = cut(____id2, 2)
  add(environment, {})
  ____o3 = __args
  ____i5 = None
  for ____i5 in indices(____o3):
    ____x41 = ____o3[____i5]
    setenv(____x41, {"_stash": True, "variable": True})
  ____x42 = join(["%function", __args], macroexpand(__body))
  drop(environment)
  return ____x42
def expand_definition(__x44=None):
  ____id3 = __x44
  __x45 = has(____id3, 0)
  __name1 = has(____id3, 1)
  __args11 = has(____id3, 2)
  __body1 = cut(____id3, 3)
  add(environment, {})
  ____o4 = __args11
  ____i6 = None
  for ____i6 in indices(____o4):
    ____x46 = ____o4[____i6]
    setenv(____x46, {"_stash": True, "variable": True})
  ____x47 = join([__x45, __name1, __args11], macroexpand(__body1))
  drop(environment)
  return ____x47
def expand_macro(form=None):
  return macroexpand(expand1(form))
def expand1(__x49=None):
  ____id4 = __x49
  __name2 = has(____id4, 0)
  __body2 = cut(____id4, 1)
  return apply(macro_function(__name2), __body2)
def macroexpand(form=None):
  if symbol63(form):
    return macroexpand(symbol_expansion(form))
  else:
    if atom63(form):
      return form
    else:
      __x50 = hd(form)
      if __x50 == "%local":
        return expand_local(form)
      else:
        if __x50 == "%function":
          return expand_function(form)
        else:
          if __x50 == "%global-function":
            return expand_definition(form)
          else:
            if __x50 == "%local-function":
              return expand_definition(form)
            else:
              if macro63(__x50):
                return expand_macro(form)
              else:
                return map(macroexpand, form)
def quasiquote_list(form=None, depth=None):
  __xs = [["list"]]
  ____o5 = form
  __k4 = None
  for __k4 in indices(____o5):
    __v4 = ____o5[__k4]
    if not number63(__k4):

      if quasisplice63(__v4, depth):
        __e28 = quasiexpand(__v4[1])
      else:
        __e28 = quasiexpand(__v4, depth)
      __v5 = __e28
      last(__xs)[__k4] = __v5
  ____x53 = form
  ____i8 = 0
  while ____i8 < L_35(____x53):
    __x54 = ____x53[____i8]
    if quasisplice63(__x54, depth):
      __x55 = quasiexpand(__x54[1])
      add(__xs, __x55)
      add(__xs, ["list"])
    else:
      add(last(__xs), quasiexpand(__x54, depth))
    ____i8 = ____i8 + 1
  def __f3(x=None):
    return L_35(x) > 1 or not( hd(x) == "list") or keys63(x)
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
def expand_if(__x59=None):
  ____id5 = __x59
  __a = has(____id5, 0)
  __b1 = has(____id5, 1)
  __c = cut(____id5, 2)
  if is63(__b1):
    return [join(["%if", __a, __b1], expand_if(__c))]
  else:
    if is63(__a):
      return [__a]
setenv("indent-level", {"_stash": True, "toplevel": True, "value": 0})
setenv("indent-level", {"_stash": True, "symbol": ["get-value", ["quote", "indent-level"]]})
def indentation():
  __s = ""
  __i9 = 0
  while __i9 < has(setenv("indent-level", {"_stash": True, "toplevel": True}), "value"):
    __s = cat(__s, "  ")
    __i9 = __i9 + 1
  return __s
reserved = {"=": True, "==": True, "+": True, "-": True, "%": True, "*": True, "/": True, "<": True, ">": True, "<=": True, ">=": True, "break": True, "case": True, "catch": True, "class": True, "const": True, "continue": True, "debugger": True, "default": True, "delete": True, "do": True, "else": True, "eval": True, "finally": True, "for": True, "function": True, "if": True, "import": True, "in": True, "instanceof": True, "let": True, "new": True, "return": True, "switch": True, "throw": True, "try": True, "typeof": True, "var": True, "void": True, "with": True, "and": True, "end": True, "load": True, "repeat": True, "while": True, "false": True, "local": True, "nil": True, "then": True, "not": True, "true": True, "elseif": True, "or": True, "until": True, "from": True, "str": True, "print": True}
def reserved63(x=None):
  return has63(reserved, x)
def valid_code63(n=None):
  return number_code63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95
def id(id=None):

  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    __e29 = "L_"
  else:
    __e29 = "_"
  __x65 = __e29

  if number_code63(code(id, 0)):
    __e30 = __x65
  else:
    __e30 = ""
  __id11 = __e30
  __i10 = 0
  while __i10 < L_35(id):
    __c1 = char(id, __i10)
    __n7 = code(__c1)

    if __c1 == "-" and not( id == "-"):

      if __i10 == 0:
        __e34 = __x65
      else:
        __e34 = "_"
      __e31 = __e34
    else:

      if valid_code63(__n7):
        __e32 = __c1
      else:

        if __i10 == 0:
          __e33 = cat(__x65, __n7)
        else:
          __e33 = __n7
        __e32 = __e33
      __e31 = __e32
    __c11 = __e31
    __id11 = cat(__id11, __c11)
    __i10 = __i10 + 1
  if reserved63(__id11):
    return cat(__x65, __id11)
  else:
    return __id11
def valid_id63(x=None):
  return some63(x) and x == id(x)
__names = {}
def unique(x=None):
  __x66 = id(x)
  if has63(__names, __x66):
    __i11 = __names[__x66]
    __names[__x66] = __names[__x66] + 1
    return unique(cat(__x66, __i11))
  else:
    __names[__x66] = 1
    return cat("__", __x66)
def key(k=None):
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    return k
  else:
    __i12 = inner(k)
    if valid_id63(__i12):
      return __i12
    else:
      if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
        return k
      else:
        return cat("[", k, "]")
def mapo(f=None, t=None):
  __o6 = []
  ____o7 = t
  __k5 = None
  for __k5 in indices(____o7):
    __v6 = ____o7[__k5]
    __x67 = f(__v6)
    if is63(__x67):
      add(__o6, literal(__k5))
      add(__o6, __x67)
  return __o6
____x69 = object([])
____x70 = object([])
____x70["js"] = "!"
____x70["lua"] = "not"
____x70["py"] = "not"
____x69["not"] = ____x70
____x71 = object([])
____x71["*"] = True
____x71["/"] = True
____x71["%"] = True
____x72 = object([])
____x73 = object([])
____x73["js"] = "+"
____x73["lua"] = ".."
____x72["cat"] = ____x73
____x74 = object([])
____x74["+"] = True
____x74["-"] = True
____x75 = object([])
____x75["<"] = True
____x75[">"] = True
____x75["<="] = True
____x75[">="] = True
____x76 = object([])
____x77 = object([])
____x77["js"] = "==="
____x77["lua"] = "=="
____x77["py"] = "=="
____x76["="] = ____x77
____x78 = object([])
____x79 = object([])
____x79["js"] = "&&"
____x79["lua"] = "and"
____x79["py"] = "and"
____x78["and"] = ____x79
____x80 = object([])
____x81 = object([])
____x81["js"] = "||"
____x81["lua"] = "or"
____x81["py"] = "or"
____x80["or"] = ____x81
infix = [____x69, ____x71, ____x72, ____x74, ____x75, ____x76, ____x78, ____x80]
def unary63(form=None):
  return two63(form) and in63(hd(form), ["not", "-"])
def index(k=None):
  pass
def precedence(form=None):
  if not( atom63(form) or unary63(form)):
    ____o8 = infix
    __k6 = None
    for __k6 in indices(____o8):
      __v7 = ____o8[__k6]
      if has63(__v7, hd(form)):
        return index(__k6)
  return 0
def getop(op=None):
  def __f5(level=None):
    __x83 = has(level, op)
    if __x83 == True:
      return op
    else:
      if is63(__x83):
        return has(__x83, has(setenv("target", {"_stash": True, "toplevel": True}), "value"))
  return find(__f5, infix)
def infix63(x=None):
  return is63(getop(x))
def infix_operator63(x=None):
  return obj63(x) and infix63(hd(x))
def compile_args(args=None, default63=None):
  __s1 = "("
  __c2 = ""
  ____x84 = args
  ____i15 = 0
  while ____i15 < L_35(____x84):
    __x85 = ____x84[____i15]
    __s1 = cat(__s1, __c2, compile(__x85))
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py" and default63 and not id_literal63(__x85):
      __s1 = cat(__s1, "=None")
    __c2 = ", "
    ____i15 = ____i15 + 1
  return cat(__s1, ")")
def escape_newlines(s=None):
  __s11 = ""
  __i16 = 0
  while __i16 < L_35(s):
    __c3 = char(s, __i16)

    if __c3 == "\n":
      __e35 = "\\n"
    else:

      if __c3 == "\r":
        __e36 = "\\r"
      else:
        __e36 = __c3
      __e35 = __e36
    __s11 = cat(__s11, __e35)
    __i16 = __i16 + 1
  return __s11
def compile_nil():
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    return "None"
  else:
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua":
      return "nil"
    else:
      return "undefined"
def compile_boolean(x=None):
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
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
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
      return ";\n"
    else:
      return "\n"
def compile_special(form=None, stmt63=None):
  ____id6 = form
  __x86 = has(____id6, 0)
  __args2 = cut(____id6, 1)
  ____id7 = getenv(__x86)
  __special = has(____id7, "special")
  __stmt = has(____id7, "stmt")
  __self_tr63 = has(____id7, "tr")
  __tr = terminator(stmt63 and not __self_tr63)
  return cat(apply(__special, __args2), __tr)
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
def op_delims(parent=None, child=None, *_rest, **_params):
  ____r59 = unstash(list(_rest))
  __parent = destash33(parent, ____r59)
  __child = destash33(child, ____r59)
  ____id8 = ____r59
  __right = has(____id8, "right")

  if __right:
    __e37 = L_6261
  else:
    __e37 = L_62
  if __e37(precedence(__child), precedence(__parent)):
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
  ____id12 = op_delims(form, __b2, {"_stash": True, "right": True})
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
  setenv("indent-level", {"_stash": True, "toplevel": True})["value"] = has(setenv("indent-level", {"_stash": True, "toplevel": True}), "value") + 1
  ____x89 = compile(body, {"_stash": True, "stmt": True})
  setenv("indent-level", {"_stash": True, "toplevel": True})["value"] = has(setenv("indent-level", {"_stash": True, "toplevel": True}), "value") - 1
  __s2 = ____x89
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py" and none63(__s2):
    setenv("indent-level", {"_stash": True, "toplevel": True})["value"] = has(setenv("indent-level", {"_stash": True, "toplevel": True}), "value") + 1
    ____x90 = cat(indentation(), "pass\n")
    setenv("indent-level", {"_stash": True, "toplevel": True})["value"] = has(setenv("indent-level", {"_stash": True, "toplevel": True}), "value") - 1
    return ____x90
  else:
    return __s2
def compile_function(args=None, body=None, *_rest, **_params):
  ____r62 = unstash(list(_rest))
  __args4 = destash33(args, ____r62)
  __body3 = destash33(body, ____r62)
  ____id13 = ____r62
  __name3 = has(____id13, "name")
  __prefix = has(____id13, "prefix")

  if __name3:
    __e38 = compile(__name3)
  else:
    __e38 = ""
  __id14 = __e38

  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua" and has63(__args4, "rest"):
    __e39 = join(__args4, ["|...|"])
  else:

    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py" and has63(__args4, "rest"):
      __e40 = join(__args4, ["|*_rest|", "|**_params|"])
    else:
      __e40 = __args4
    __e39 = __e40
  __args12 = __e39
  __args5 = compile_args(__args12, True)
  __body4 = compile_body(__body3)
  __ind = indentation()

  if __prefix:
    __e41 = cat(__prefix, " ")
  else:
    __e41 = ""
  __p = __e41

  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
    __e42 = ""
  else:
    __e42 = "end"
  __tr1 = __e42
  if __name3:
    __tr1 = cat(__tr1, "\n")
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
    return cat("function ", __id14, __args5, " {\n", __body4, __ind, "}", __tr1)
  else:
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
      return cat("def ", __id14, __args5, ":\n", __body4)
    else:
      return cat(__p, "function ", __id14, __args5, "\n", __body4, __ind, __tr1)
def can_return63(form=None):
  return is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form)))
def compile(form=None, *_rest, **_params):
  ____r64 = unstash(list(_rest))
  __form = destash33(form, ____r64)
  ____id15 = ____r64
  __stmt1 = has(____id15, "stmt")
  if nil63(__form):
    return ""
  else:
    if special_form63(__form):
      return compile_special(__form, __stmt1)
    else:
      __tr2 = terminator(__stmt1)

      if __stmt1:
        __e43 = indentation()
      else:
        __e43 = ""
      __ind1 = __e43

      if atom63(__form):
        __e44 = compile_atom(__form)
      else:

        if infix63(hd(__form)):
          __e45 = compile_infix(__form)
        else:
          __e45 = compile_call(__form)
        __e44 = __e45
      __form1 = __e44
      return cat(__ind1, __form1, __tr2)
def lower_statement(form=None, tail63=None):
  __hoist = []
  __e = lower(form, __hoist, True, tail63)

  if some63(__hoist) and is63(__e):
    __e46 = join(["do"], __hoist, [__e])
  else:

    if is63(__e):
      __e47 = __e
    else:

      if L_35(__hoist) > 1:
        __e48 = join(["do"], __hoist)
      else:
        __e48 = hd(__hoist)
      __e47 = __e48
    __e46 = __e47
  return either(__e46, ["do"])
def lower_body(body=None, tail63=None):
  return lower_statement(join(["do"], body), tail63)
def literal63(form=None):
  return atom63(form) or hd(form) == "%array" or hd(form) == "%object"
def standalone63(form=None):
  return not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)) or id_literal63(form)
def lower_do(args=None, hoist=None, stmt63=None, tail63=None):
  ____x98 = almost(args)
  ____i17 = 0
  while ____i17 < L_35(____x98):
    __x99 = ____x98[____i17]
    ____y = lower(__x99, hoist, stmt63)
    if yes(____y):
      __e1 = ____y
      if standalone63(__e1):
        add(hoist, __e1)
    ____i17 = ____i17 + 1
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

    if is63(__L_else):
      __e50 = [lower_body([__L_else], tail63)]
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([__L_then], tail63)], __e50))
  else:
    __e3 = unique("e")
    add(hoist, ["%local", __e3])

    if is63(__L_else):
      __e49 = [lower(["%set", __e3, __L_else])]
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, __L_then])], __e49))
    return __e3
def lower_short(x=None, args=None, hoist=None):
  ____id18 = args
  __a3 = has(____id18, 0)
  __b4 = has(____id18, 1)
  __hoist1 = []
  __b11 = lower(__b4, __hoist1)
  if some63(__hoist1):
    __id19 = unique("id")

    if x == "and":
      __e51 = ["%if", __id19, __b4, __id19]
    else:
      __e51 = ["%if", __id19, __id19, __b4]
    return lower(["do", ["%local", __id19, __a3], __e51], hoist)
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

  if none63(__pre):
    __e52 = ["while", __c5, lower_body(__body5)]
  else:
    __e52 = ["while", True, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lower_body(__body5)])]
  return add(hoist, __e52)
def lower_for(args=None, hoist=None):
  ____id21 = args
  __t = has(____id21, 0)
  __k7 = has(____id21, 1)
  __body6 = cut(____id21, 2)
  return add(hoist, ["%for", lower(__t, hoist), __k7, lower_body(__body6)])
def lower_function(args=None, hoist=None):
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    __f11 = unique("f")
    return lower(["do", join(["%local-function", __f11], args), __f11], hoist)
  else:
    ____id22 = args
    __a4 = has(____id22, 0)
    __body7 = cut(____id22, 1)
    return ["%function", __a4, lower_body(__body7, True)]
def lower_definition(kind=None, args=None, hoist=None):
  ____id23 = args
  __name4 = has(____id23, 0)
  __args6 = has(____id23, 1)
  __body8 = cut(____id23, 2)
  return add(hoist, [kind, __name4, __args6, lower_body(__body8, True)])
def lower_call(form=None, hoist=None):
  def __f6(x=None):
    return lower(x, hoist)
  __form2 = map(__f6, form)
  if some63(__form2):
    return __form2
def pairwise63(form=None):
  return in63(hd(form), ["<", "<=", "=", ">=", ">"])
def lower_pairwise(form=None):
  if pairwise63(form):
    __e4 = []
    ____id24 = form
    __x130 = has(____id24, 0)
    __args7 = cut(____id24, 1)
    def __f7(a=None, b=None):
      add(__e4, [__x130, a, b])
      return a
    reduce(__f7, __args7)
    return join(["and"], reverse(__e4))
  else:
    return form
def lower_infix63(form=None):
  return infix63(hd(form)) and L_35(form) > 3
def lower_infix(form=None, hoist=None):
  __form3 = lower_pairwise(form)
  ____id25 = __form3
  __x133 = has(____id25, 0)
  __args8 = cut(____id25, 1)
  def __f8(a=None, b=None):
    return [__x133, b, a]
  return lower(reduce(__f8, reverse(__args8)), hoist)
def lower_special(form=None, hoist=None):
  __e5 = lower_call(form, hoist)
  if __e5:
    return add(hoist, __e5)
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
          ____id26 = form
          __x136 = has(____id26, 0)
          __args9 = cut(____id26, 1)
          if __x136 == "do":
            return lower_do(__args9, hoist, stmt63, tail63)
          else:
            if __x136 == "%set":
              return lower_set(__args9, hoist, stmt63, tail63)
            else:
              if __x136 == "%if":
                return lower_if(__args9, hoist, stmt63, tail63)
              else:
                if __x136 == "%try":
                  return lower_try(__args9, hoist, tail63)
                else:
                  if __x136 == "while":
                    return lower_while(__args9, hoist)
                  else:
                    if __x136 == "%for":
                      return lower_for(__args9, hoist)
                    else:
                      if __x136 == "%function":
                        return lower_function(__args9, hoist)
                      else:
                        if __x136 == "%local-function" or __x136 == "%global-function":
                          return lower_definition(__x136, __args9, hoist)
                        else:
                          if in63(__x136, ["and", "or"]):
                            return lower_short(__x136, __args9, hoist)
                          else:
                            if statement63(__x136):
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
  __previous = has(setenv("target", {"_stash": True, "toplevel": True}), "value")
  setenv("target", {"_stash": True, "toplevel": True})["value"] = "py"
  __code = compile(expand(["set", "lumen-result", form]))
  setenv("target", {"_stash": True, "toplevel": True})["value"] = __previous
  run(__code, globals)
  return eval_result(globals)
def immediate_call63(x=None):
  return obj63(x) and obj63(hd(x)) and hd(hd(x)) == "%function"
def __f9(*_rest, **_params):
  __forms1 = unstash(list(_rest))
  __s4 = ""
  ____x141 = __forms1
  ____i19 = 0
  while ____i19 < L_35(____x141):
    __x142 = ____x141[____i19]
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua" and immediate_call63(__x142) and "\n" == char(__s4, edge(__s4)):
      __s4 = cat(clip(__s4, 0, edge(__s4)), ";\n")
    __s4 = cat(__s4, compile(__x142, {"_stash": True, "stmt": True}))
    if not atom63(__x142):
      if hd(__x142) == "return" or hd(__x142) == "break":
        break
    ____i19 = ____i19 + 1
  return __s4
setenv("do", {"_stash": True, "special": __f9, "stmt": True, "tr": True})
def __f10(cond=None, cons=None, alt=None):
  __cond2 = compile(cond)
  __cons1 = compile_body(cons)

  if alt:
    __e53 = compile_body(alt)
  __alt1 = __e53
  __ind3 = indentation()
  __s6 = ""
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
    __s6 = cat(__s6, __ind3, "if (", __cond2, ") {\n", __cons1, __ind3, "}")
  else:
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
      __s6 = cat(__s6, __ind3, "if ", __cond2, ":\n", __cons1)
    else:
      __s6 = cat(__s6, __ind3, "if ", __cond2, " then\n", __cons1)
  if __alt1 and has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
    __s6 = cat(__s6, " else {\n", __alt1, __ind3, "}")
  else:
    if __alt1 and has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
      __s6 = cat(__s6, __ind3, "else:\n", __alt1)
    else:
      if __alt1:
        __s6 = cat(__s6, __ind3, "else\n", __alt1)
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua":
    return cat(__s6, __ind3, "end\n")
  else:
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
      return cat(__s6, "\n")
    else:
      return __s6
setenv("%if", {"_stash": True, "special": __f10, "stmt": True, "tr": True})
def __f111(cond=None, form=None):
  __cond4 = compile(cond)
  __body10 = compile_body(form)
  __ind5 = indentation()
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
    return cat(__ind5, "while (", __cond4, ") {\n", __body10, __ind5, "}\n")
  else:
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
      return cat(__ind5, "while ", __cond4, ":\n", __body10)
    else:
      return cat(__ind5, "while ", __cond4, " do\n", __body10, __ind5, "end\n")
setenv("while", {"_stash": True, "special": __f111, "stmt": True, "tr": True})
def __f12(t=None, k=None, form=None):
  __t2 = compile(t)
  __ind7 = indentation()
  __body12 = compile_body(form)
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua":
    return cat(__ind7, "for ", k, " in next, ", __t2, " do\n", __body12, __ind7, "end\n")
  else:
    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
      return cat(__ind7, "for ", k, " in indices(", __t2, "):\n", __body12)
    else:
      return cat(__ind7, "for (", k, " in ", __t2, ") {\n", __body12, __ind7, "}\n")
setenv("%for", {"_stash": True, "special": __f12, "stmt": True, "tr": True})
def __f13(form=None):
  __e9 = unique("e")
  __ind9 = indentation()
  __body14 = compile_body(form)

  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    __e54 = ["do", ["import", "sys"], ["return", ["%array", False, __e9, [["idx", "sys", "exc_info"]]]]]
  else:
    __e54 = ["return", ["%array", False, __e9]]
  __hf1 = __e54
  setenv("indent-level", {"_stash": True, "toplevel": True})["value"] = has(setenv("indent-level", {"_stash": True, "toplevel": True}), "value") + 1
  ____x160 = compile(__hf1, {"_stash": True, "stmt": True})
  setenv("indent-level", {"_stash": True, "toplevel": True})["value"] = has(setenv("indent-level", {"_stash": True, "toplevel": True}), "value") - 1
  __h1 = ____x160
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
    return cat(__ind9, "try {\n", __body14, __ind9, "}\n", __ind9, "catch (", __e9, ") {\n", __h1, __ind9, "}\n")
  else:
    return cat(__ind9, "try:\n", __body14, __ind9, "except Exception as ", __e9, ":\n", __h1)
setenv("%try", {"_stash": True, "special": __f13, "stmt": True, "tr": True})
def __f14(place=None):

  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    __e55 = "del "
  else:
    __e55 = "delete "
  return cat(indentation(), __e55, compile(place))
setenv("%delete", {"_stash": True, "special": __f14, "stmt": True})
def __f15():
  return cat(indentation(), "break")
setenv("break", {"_stash": True, "special": __f15, "stmt": True})
def __f16(args=None, body=None):
  return compile_function(args, body)
setenv("%function", {"_stash": True, "special": __f16})
def __f17(name=None, args=None, body=None):
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua" or has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    __x164 = compile_function(args, body, {"_stash": True, "name": name})
    return cat(indentation(), __x164)
  else:
    return compile(["%set", name, ["%function", args, body]], {"_stash": True, "stmt": True})
setenv("%global-function", {"_stash": True, "special": __f17, "stmt": True, "tr": True})
def __f18(name=None, args=None, body=None):
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua" or has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    __x170 = compile_function(args, body, {"_stash": True, "name": name, "prefix": "local"})
    return cat(indentation(), __x170)
  else:
    return compile(["%local", name, ["%function", args, body]], {"_stash": True, "stmt": True})
setenv("%local-function", {"_stash": True, "special": __f18, "stmt": True, "tr": True})
def __f19(x=None):

  if nil63(x):
    __e56 = "return"
  else:
    __e56 = cat("return ", compile(x))
  __x174 = __e56
  return cat(indentation(), __x174)
setenv("return", {"_stash": True, "special": __f19, "stmt": True})
def __f20(x=None):
  return cat("new ", compile(x))
setenv("new", {"_stash": True, "special": __f20})
def __f21(x=None):
  return cat("typeof(", compile(x), ")")
setenv("typeof", {"_stash": True, "special": __f21})
def __f22(x=None):

  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
    __e57 = cat("throw ", compile(["new", ["Error", x]]))
  else:

    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
      __e58 = cat("raise ", compile(["Exception", x]))
    else:
      __e58 = cat("error(", compile(x), ")")
    __e57 = __e58
  __e15 = __e57
  return cat(indentation(), __e15)
setenv("error", {"_stash": True, "special": __f22, "stmt": True})
def __f23(name=None, value=None):
  if nil63(value) and has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    return ""
  else:
    __id28 = compile(name)
    __value11 = compile(value)

    if is63(value):
      __e59 = cat(" = ", __value11)
    else:
      __e59 = ""
    __rh2 = __e59

    if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "js":
      __e60 = "var "
    else:

      if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua":
        __e61 = "local "
      else:
        __e61 = ""
      __e60 = __e61
    __keyword1 = __e60
    __ind11 = indentation()
    return cat(__ind11, __keyword1, __id28, __rh2)
setenv("%local", {"_stash": True, "special": __f23, "stmt": True})
def __f24(lh=None, rh=None):
  __lh2 = compile(lh)

  if nil63(rh):
    __e62 = "nil"
  else:
    __e62 = rh
  __rh4 = compile(__e62)
  return cat(indentation(), __lh2, " = ", __rh4)
setenv("%set", {"_stash": True, "special": __f24, "stmt": True})
def __f25(t=None, k=None):
  __t12 = compile(t)
  __k12 = compile(k)
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua" and char(__t12, 0) == "{" or infix_operator63(t):
    __t12 = cat("(", __t12, ")")
  if string_literal63(k) and valid_id63(inner(k)) and not( has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py"):
    return cat(__t12, ".", inner(k))
  else:
    return cat(__t12, "[", __k12, "]")
setenv("get", {"_stash": True, "special": __f25})
def __f26(t=None, k=None):
  __t14 = compile(t)
  __k14 = compile(k)
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua" and char(__t14, 0) == "{" or infix_operator63(t):
    __t14 = cat("(", __t14, ")")
  return cat(__t14, ".", __k14)
setenv("idx", {"_stash": True, "special": __f26})
def __f27(*_rest, **_params):
  __forms3 = unstash(list(_rest))

  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua":
    __e63 = "{"
  else:
    __e63 = "["
  __open1 = __e63

  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua":
    __e64 = "}"
  else:
    __e64 = "]"
  __close1 = __e64
  __s8 = ""
  __c7 = ""
  ____o10 = __forms3
  __k10 = None
  for __k10 in indices(____o10):
    __v9 = ____o10[__k10]
    if number63(__k10):
      __s8 = cat(__s8, __c7, compile(__v9))
      __c7 = ", "
  return cat(__open1, __s8, __close1)
setenv("%array", {"_stash": True, "special": __f27})
def __f28(*_rest, **_params):
  __forms5 = unstash(list(_rest))
  __s10 = "{"
  __c9 = ""

  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "lua":
    __e65 = " = "
  else:
    __e65 = ": "
  __sep1 = __e65
  ____o12 = pair(__forms5)
  __k141 = None
  for __k141 in indices(____o12):
    __v12 = ____o12[__k141]
    if number63(__k141):
      ____id30 = __v12
      __k15 = has(____id30, 0)
      __v13 = has(____id30, 1)
      if not string63(__k15):
        raise Exception(cat("Illegal key: ", L_str(__k15)))
      __s10 = cat(__s10, __c9, key(__k15), __sep1, compile(__v13))
      __c9 = ", "
  return cat(__s10, "}")
setenv("%object", {"_stash": True, "special": __f28})
def __f29(*_rest, **_params):
  __args111 = unstash(list(_rest))
  return apply(cat, map(compile, __args111))
setenv("%literal", {"_stash": True, "special": __f29})
def __f30(x=None):
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    return cat(indentation(), "global ", compile(x), "\n")
  else:
    return ""
setenv("global", {"_stash": True, "special": __f30, "stmt": True, "tr": True})
def __f31(x=None):
  if has(setenv("target", {"_stash": True, "toplevel": True}), "value") == "py":
    return cat(indentation(), "import ", compile(x))
  else:
    return cat(indentation(), compile(["%local", x, ["require", escape(x)]]))
setenv("import", {"_stash": True, "special": __f31, "stmt": True})
