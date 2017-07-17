reader = require("reader")
def getenv(k, p):
  if string63(k) then
    __i = edge(environment)
    while __i >= 0 do
      __b = environment[__i][k]
      if is63(__b) then

        if p then
          __e22 = __b[p]
        else
          __e22 = __b

        return __e22
      else
        __i = __i - 1

    end

def macro_function(k):
  return getenv(k, "macro")
def macro63(k):
  return is63(macro_function(k))
def special63(k):
  return is63(getenv(k, "special"))
def special_form63(form):
  return _and(_not(atom63(form)), special63(hd(form)))
def statement63(k):
  return _and(special63(k), getenv(k, "stmt"))
def symbol_expansion(k):
  return getenv(k, "symbol")
def symbol63(k):
  return is63(symbol_expansion(k))
def variable63(k):
  return is63(getenv(k, "variable"))
def bound63(x):
  return _or(macro63(x), special63(x))
def quoted(form):
  if string63(form) then
    return escape(form)
  else
    if atom63(form) then
      return form
    else
      return join(["list"], map(quoted, form))


def literal(s):
  if string_literal63(s) then
    return s
  else
    return quoted(s)

def stash42(args):
  if keys63(args) then
    __l = ["%object", "\"_stash\"", True]
    ____o = args
    __k = None
    for (__k in ____o) {
      __v = ____o[__k]

      if numeric63(__k) then
        __e23 = parseInt(__k)
      else
        __e23 = __k

      __k1 = __e23
      if _not(number63(__k1)) then
        add(__l, literal(__k1))
        add(__l, __v)

    }
    return join(args, [__l])
  else
    return args

def bias(k):
  if _and(number63(k), _not(_61(target, "py"))) then
    if _61(target, "js") then
      k = k - 1
    else
      k = k + 1


  return k
def bind(lh, rh):
  if atom63(lh) then
    return [lh, rh]
  else
    __id = unique("id")
    __bs = [__id, rh]
    ____o1 = lh
    __k2 = None
    for (__k2 in ____o1) {
      __v1 = ____o1[__k2]

      if numeric63(__k2) then
        __e24 = parseInt(__k2)
      else
        __e24 = __k2

      __k3 = __e24

      if _61(__k3, "rest") then
        __e25 = ["cut", __id, _35(lh)]
      else
        __e25 = ["get", __id, ["quote", bias(__k3)]]

      __x5 = __e25
      if is63(__k3) then

        if _61(__v1, True) then
          __e26 = __k3
        else
          __e26 = __v1

        __k4 = __e26
        __bs = join(__bs, bind(__k4, __x5))

    }
    return __bs

def __f2(from):
  return [["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", from]
setenv("arguments%", {"_stash": True, "macro": __f2})
def bind42(args, body):
  __args1 = []
  def rest():
    __args1.rest = True
    if _61(target, "js") then
      return ["unstash", ["arguments%", _35(__args1)]]
    else
      return ["unstash", ["list", "|...|"]]

  if atom63(args) then
    return [__args1, join(["let", [args, rest()]], body)]
  else
    __bs1 = []
    __r19 = unique("r")
    ____o2 = args
    __k5 = None
    for (__k5 in ____o2) {
      __v2 = ____o2[__k5]

      if numeric63(__k5) then
        __e27 = parseInt(__k5)
      else
        __e27 = __k5

      __k6 = __e27
      if number63(__k6) then
        if atom63(__v2) then
          add(__args1, __v2)
        else
          __x30 = unique("x")
          add(__args1, __x30)
          __bs1 = join(__bs1, [__v2, __x30])


    }
    if keys63(args) then
      __bs1 = join(__bs1, [__r19, rest()])
      __n3 = _35(__args1)
      __i4 = 0
      while __i4 < __n3 do
        __v3 = __args1[__i4]
        __bs1 = join(__bs1, [__v3, ["destash!", __v3, __r19]])
        __i4 = __i4 + 1
      end
      __bs1 = join(__bs1, [keys(args), __r19])

    return [__args1, join(["let", __bs1], body)]

def quoting63(depth):
  return number63(depth)
def quasiquoting63(depth):
  return _and(quoting63(depth), depth > 0)
def can_unquote63(depth):
  return _and(quoting63(depth), _61(depth, 1))
def quasisplice63(x, depth):
  return _and(can_unquote63(depth), _not(atom63(x)))
def expand_local(__x38):
  ____id1 = __x38
  __x39 = ____id1[1]
  __name = ____id1[2]
  __value = ____id1[3]
  setenv(__name, {"_stash": True, "variable": True})
  return ["%local", __name, macroexpand(__value)]
def expand_function(__x41):
  ____id2 = __x41
  __x42 = ____id2[1]
  __args = ____id2[2]
  __body = cut(____id2, 2)
  add(environment, {})
  ____o3 = __args
  ____i5 = None
  for (____i5 in ____o3) {
    ____x43 = ____o3[____i5]

    if numeric63(____i5) then
      __e28 = parseInt(____i5)
    else
      __e28 = ____i5

    ____i51 = __e28
    setenv(____x43, {"_stash": True, "variable": True})
  }
  ____x44 = join(["%function", __args], macroexpand(__body))
  drop(environment)
  return ____x44
def expand_definition(__x46):
  ____id3 = __x46
  __x47 = ____id3[1]
  __name1 = ____id3[2]
  __args11 = ____id3[3]
  __body1 = cut(____id3, 3)
  add(environment, {})
  ____o4 = __args11
  ____i6 = None
  for (____i6 in ____o4) {
    ____x48 = ____o4[____i6]

    if numeric63(____i6) then
      __e29 = parseInt(____i6)
    else
      __e29 = ____i6

    ____i61 = __e29
    setenv(____x48, {"_stash": True, "variable": True})
  }
  ____x49 = join([__x47, __name1, __args11], macroexpand(__body1))
  drop(environment)
  return ____x49
def expand_macro(form):
  return macroexpand(expand1(form))
def expand1(__x51):
  ____id4 = __x51
  __name2 = ____id4[1]
  __body2 = cut(____id4, 1)
  return apply(macro_function(__name2), __body2)
def macroexpand(form):
  if symbol63(form) then
    return macroexpand(symbol_expansion(form))
  else
    if atom63(form) then
      return form
    else
      __x52 = hd(form)
      if _61(__x52, "%local") then
        return expand_local(form)
      else
        if _61(__x52, "%function") then
          return expand_function(form)
        else
          if _61(__x52, "%global-function") then
            return expand_definition(form)
          else
            if _61(__x52, "%local-function") then
              return expand_definition(form)
            else
              if macro63(__x52) then
                return expand_macro(form)
              else
                return map(macroexpand, form)







def quasiquote_list(form, depth):
  __xs = [["list"]]
  ____o5 = form
  __k7 = None
  for (__k7 in ____o5) {
    __v4 = ____o5[__k7]

    if numeric63(__k7) then
      __e30 = parseInt(__k7)
    else
      __e30 = __k7

    __k8 = __e30
    if _not(number63(__k8)) then

      if quasisplice63(__v4, depth) then
        __e31 = quasiexpand(__v4[1])
      else
        __e31 = quasiexpand(__v4, depth)

      __v5 = __e31
      last(__xs)[__k8] = __v5

  }
  ____x55 = form
  ____i8 = 0
  while ____i8 < _35(____x55) do
    __x56 = ____x55[____i8]
    if quasisplice63(__x56, depth) then
      __x57 = quasiexpand(__x56[1])
      add(__xs, __x57)
      add(__xs, ["list"])
    else
      add(last(__xs), quasiexpand(__x56, depth))

    ____i8 = ____i8 + 1
  end
  def __f3(x):
    return _or(_35(x) > 1, _not(_61(hd(x), "list")))
  __pruned = keep(__f3, __xs)
  if one63(__pruned) then
    return hd(__pruned)
  else
    return join(["join"], __pruned)

def quasiexpand(form, depth):
  if quasiquoting63(depth) then
    if atom63(form) then
      return ["quote", form]
    else
      if _and(can_unquote63(depth), _61(hd(form), "unquote")) then
        return quasiexpand(form[1])
      else
        if _or(_61(hd(form), "unquote"), _61(hd(form), "unquote-splicing")) then
          return quasiquote_list(form, depth - 1)
        else
          if _61(hd(form), "quasiquote") then
            return quasiquote_list(form, depth + 1)
          else
            return quasiquote_list(form, depth)




  else
    if atom63(form) then
      return form
    else
      if _61(hd(form), "quote") then
        return form
      else
        if _61(hd(form), "quasiquote") then
          return quasiexpand(form[1], 1)
        else
          def __f4(x):
            return quasiexpand(x, depth)
          return map(__f4, form)




def expand_if(__x61):
  ____id5 = __x61
  __a = ____id5[1]
  __b1 = ____id5[2]
  __c = cut(____id5, 2)
  if is63(__b1) then
    return [join(["%if", __a, __b1], expand_if(__c))]
  else
    if is63(__a) then
      return [__a]


indent_level = 0
def indentation():
  __s = ""
  __i9 = 0
  while __i9 < indent_level do
    __s = cat(__s, "  ")
    __i9 = __i9 + 1
  end
  return __s
reserved = {"=": True, "==": True, "+": True, "-": True, "%": True, "*": True, "/": True, "<": True, ">": True, "<=": True, ">=": True, "break": True, "case": True, "catch": True, "class": True, "const": True, "continue": True, "debugger": True, "default": True, "delete": True, "do": True, "else": True, "eval": True, "finally": True, "for": True, "function": True, "if": True, "import": True, "in": True, "instanceof": True, "let": True, "new": True, "return": True, "switch": True, "throw": True, "try": True, "typeof": True, "var": True, "void": True, "with": True, "and": True, "end": True, "load": True, "repeat": True, "while": True, "false": True, "local": True, "nil": True, "then": True, "not": True, "true": True, "elseif": True, "or": True, "until": True}
def reserved63(x):
  return has63(reserved, x)
def valid_code63(n):
  return _or(number_code63(n), _and(n > 64, n < 91))
def id(id):

  if number_code63(code(id, 0)) then
    __e32 = "_"
  else
    __e32 = ""

  __id11 = __e32
  __i10 = 0
  while __i10 < _35(id) do
    __c1 = char(id, __i10)
    __n7 = code(__c1)

    if _and(_61(__c1, "-"), _not(_61(id, "-"))) then
      __e33 = "_"
    else

      if valid_code63(__n7) then
        __e34 = __c1
      else

        if _61(__i10, 0) then
          __e35 = cat("_", __n7)
        else
          __e35 = __n7

        __e34 = __e35

      __e33 = __e34

    __c11 = __e33
    __id11 = cat(__id11, __c11)
    __i10 = __i10 + 1
  end
  if reserved63(__id11) then
    return cat("_", __id11)
  else
    return __id11

def valid_id63(x):
  return _and(some63(x), _61(x, id(x)))
__names = {}
def unique(x):
  __x65 = id(x)
  if __names[__x65] then
    __i11 = __names[__x65]
    __names[__x65] = __names[__x65] + 1
    return unique(cat(__x65, __i11))
  else
    __names[__x65] = 1
    return cat("__", __x65)

def key(k):
  if _61(target, "py") then
    return k
  else
    __i12 = inner(k)
    if valid_id63(__i12) then
      return __i12
    else
      if _61(target, "js") then
        return k
      else
        return cat("[", k, "]")



def mapo(f, t):
  __o6 = []
  ____o7 = t
  __k9 = None
  for (__k9 in ____o7) {
    __v6 = ____o7[__k9]

    if numeric63(__k9) then
      __e36 = parseInt(__k9)
    else
      __e36 = __k9

    __k10 = __e36
    __x66 = f(__v6)
    if is63(__x66) then
      add(__o6, literal(__k10))
      add(__o6, __x66)

  }
  return __o6
____x68 = object([])
____x69 = object([])
____x69.js = "!"
____x69.lua = "not"
____x68["not"] = ____x69
____x70 = object([])
____x70["*"] = True
____x70["/"] = True
____x70["%"] = True
____x71 = object([])
____x72 = object([])
____x72.js = "+"
____x72.lua = ".."
____x71.cat = ____x72
____x73 = object([])
____x73["+"] = True
____x73["-"] = True
____x74 = object([])
____x74["<"] = True
____x74[">"] = True
____x74["<="] = True
____x74[">="] = True
____x75 = object([])
____x76 = object([])
____x76.js = "==="
____x76.lua = "=="
____x75["="] = ____x76
____x77 = object([])
____x78 = object([])
____x78.js = "&&"
____x78.lua = "and"
____x77["and"] = ____x78
____x79 = object([])
____x80 = object([])
____x80.js = "||"
____x80.lua = "or"
____x79["or"] = ____x80
infix = [____x68, ____x70, ____x71, ____x73, ____x74, ____x75, ____x77, ____x79]
def unary63(form):
  return _and(two63(form), in63(hd(form), ["not", "-"]))
def index(k):
  pass
def precedence(form):
  if _not(_or(atom63(form), unary63(form))) then
    ____o8 = infix
    __k11 = None
    for (__k11 in ____o8) {
      __v7 = ____o8[__k11]

      if numeric63(__k11) then
        __e37 = parseInt(__k11)
      else
        __e37 = __k11

      __k12 = __e37
      if __v7[hd(form)] then
        return index(__k12)

    }

  return 0
def getop(op):
  def __f5(level):
    __x82 = level[op]
    if _61(__x82, True) then
      return op
    else
      if is63(__x82) then
        return __x82[target]


  return find(__f5, infix)
def infix63(x):
  return is63(getop(x))
def infix_operator63(x):
  return _and(obj63(x), infix63(hd(x)))
def compile_args(args):
  __s1 = "("
  __c2 = ""
  ____x83 = args
  ____i15 = 0
  while ____i15 < _35(____x83) do
    __x84 = ____x83[____i15]
    __s1 = cat(__s1, __c2, compile(__x84))
    __c2 = ", "
    ____i15 = ____i15 + 1
  end
  return cat(__s1, ")")
def escape_newlines(s):
  __s11 = ""
  __i16 = 0
  while __i16 < _35(s) do
    __c3 = char(s, __i16)

    if _61(__c3, "\n") then
      __e38 = "\\n"
    else

      if _61(__c3, "\r") then
        __e39 = "\\r"
      else
        __e39 = __c3

      __e38 = __e39

    __s11 = cat(__s11, __e38)
    __i16 = __i16 + 1
  end
  return __s11
def compile_nil():
  if _61(target, "py") then
    return "None"
  else
    if _61(target, "lua") then
      return "nil"
    else
      return "undefined"


def compile_boolean(x):
  if _61(target, "py") then
    if x then
      return "True"
    else
      return "False"

  else
    if x then
      return "true"
    else
      return "false"


def compile_atom(x):
  if _61(x, "nil") then
    return compile_nil()
  else
    if id_literal63(x) then
      return inner(x)
    else
      if string_literal63(x) then
        return escape_newlines(x)
      else
        if string63(x) then
          return id(x)
        else
          if boolean63(x) then
            return compile_boolean(x)
          else
            if nan63(x) then
              return "nan"
            else
              if _61(x, inf) then
                return "inf"
              else
                if _61(x, _inf) then
                  return "-inf"
                else
                  if number63(x) then
                    return cat(x, "")
                  else
                    error(cat("Cannot compile atom: ", str(x)))









def terminator(stmt63):
  if _not(stmt63) then
    return ""
  else
    if _61(target, "js") then
      return ";\n"
    else
      return "\n"


def compile_special(form, stmt63):
  ____id6 = form
  __x85 = ____id6[1]
  __args2 = cut(____id6, 1)
  ____id7 = getenv(__x85)
  __special = ____id7.special
  __stmt = ____id7.stmt
  __self_tr63 = ____id7.tr
  __tr = terminator(_and(stmt63, _not(__self_tr63)))
  return cat(apply(__special, __args2), __tr)
def parenthesize_call63(x):
  return _or(_and(_not(atom63(x)), _61(hd(x), "%function")), precedence(x) > 0)
def compile_call(form):
  __f = hd(form)
  __f1 = compile(__f)
  __args3 = compile_args(stash42(tl(form)))
  if parenthesize_call63(__f) then
    return cat("(", __f1, ")", __args3)
  else
    return cat(__f1, __args3)

def op_delims(parent, child):
  ____r59 = unstash([...])
  __parent = destash33(parent, ____r59)
  __child = destash33(child, ____r59)
  ____id8 = ____r59
  __right = ____id8.right

  if __right then
    __e40 = _6261
  else
    __e40 = _62

  if __e40(precedence(__child), precedence(__parent)) then
    return ["(", ")"]
  else
    return ["", ""]

def compile_infix(form):
  ____id9 = form
  __op = ____id9[1]
  ____id10 = cut(____id9, 1)
  __a1 = ____id10[1]
  __b2 = ____id10[2]
  ____id111 = op_delims(form, __a1)
  __ao = ____id111[1]
  __ac = ____id111[2]
  ____id12 = op_delims(form, __b2, {"_stash": True, "right": True})
  __bo = ____id12[1]
  __bc = ____id12[2]
  __a2 = compile(__a1)
  __b3 = compile(__b2)
  __op1 = getop(__op)
  if unary63(form) then
    return cat(__op1, __ao, " ", __a2, __ac)
  else
    return cat(__ao, __a2, __ac, " ", __op1, " ", __bo, __b3, __bc)

def compile_body(body):
  indent_level = indent_level + 1
  ____x89 = compile(body, {"_stash": True, "stmt": True})
  indent_level = indent_level - 1
  __s2 = ____x89
  if _and(_61(target, "py"), none63(__s2)) then
    indent_level = indent_level + 1
    ____x90 = cat(indentation(), "pass\n")
    indent_level = indent_level - 1
    return ____x90
  else
    return __s2

def compile_function(args, body):
  ____r62 = unstash([...])
  __args4 = destash33(args, ____r62)
  __body3 = destash33(body, ____r62)
  ____id13 = ____r62
  __name3 = ____id13.name
  __prefix = ____id13.prefix

  if __name3 then
    __e41 = compile(__name3)
  else
    __e41 = ""

  __id14 = __e41

  if _and(_61(target, "lua"), __args4.rest) then
    __e42 = join(__args4, ["|...|"])
  else
    __e42 = __args4

  __args12 = __e42
  __args5 = compile_args(__args12)
  __body4 = compile_body(__body3)
  __ind = indentation()

  if __prefix then
    __e43 = cat(__prefix, " ")
  else
    __e43 = ""

  __p = __e43

  if _61(target, "js") then
    __e44 = ""
  else
    __e44 = "end"

  __tr1 = __e44
  if __name3 then
    __tr1 = cat(__tr1, "\n")

  if _61(target, "js") then
    return cat("function ", __id14, __args5, " {\n", __body4, __ind, "}", __tr1)
  else
    if _61(target, "py") then
      return cat("def ", __id14, __args5, ":\n", __body4)
    else
      return cat(__p, "function ", __id14, __args5, "\n", __body4, __ind, __tr1)


def can_return63(form):
  return _and(is63(form), _or(atom63(form), _and(_not(_61(hd(form), "return")), _not(statement63(hd(form))))))
def compile(form):
  ____r64 = unstash([...])
  __form = destash33(form, ____r64)
  ____id15 = ____r64
  __stmt1 = ____id15.stmt
  if nil63(__form) then
    return ""
  else
    if special_form63(__form) then
      return compile_special(__form, __stmt1)
    else
      __tr2 = terminator(__stmt1)

      if __stmt1 then
        __e45 = indentation()
      else
        __e45 = ""

      __ind1 = __e45

      if atom63(__form) then
        __e46 = compile_atom(__form)
      else

        if infix63(hd(__form)) then
          __e47 = compile_infix(__form)
        else
          __e47 = compile_call(__form)

        __e46 = __e47

      __form1 = __e46
      return cat(__ind1, __form1, __tr2)


def lower_statement(form, tail63):
  __hoist = []
  __e = lower(form, __hoist, True, tail63)

  if _and(some63(__hoist), is63(__e)) then
    __e48 = join(["do"], __hoist, [__e])
  else

    if is63(__e) then
      __e49 = __e
    else

      if _35(__hoist) > 1 then
        __e50 = join(["do"], __hoist)
      else
        __e50 = hd(__hoist)

      __e49 = __e50

    __e48 = __e49

  return either(__e48, ["do"])
def lower_body(body, tail63):
  return lower_statement(join(["do"], body), tail63)
def literal63(form):
  return _or(atom63(form), _61(hd(form), "%array"))
def standalone63(form):
  return _or(_and(_not(atom63(form)), _not(infix63(hd(form)))), id_literal63(form))
def lower_do(args, hoist, stmt63, tail63):
  ____x99 = almost(args)
  ____i17 = 0
  while ____i17 < _35(____x99) do
    __x100 = ____x99[____i17]
    ____y = lower(__x100, hoist, stmt63)
    if yes(____y) then
      __e1 = ____y
      if standalone63(__e1) then
        add(hoist, __e1)


    ____i17 = ____i17 + 1
  end
  __e2 = lower(last(args), hoist, stmt63, tail63)
  if _and(tail63, can_return63(__e2)) then
    return ["return", __e2]
  else
    return __e2

def lower_set(args, hoist, stmt63, tail63):
  ____id16 = args
  __lh = ____id16[1]
  __rh = ____id16[2]
  add(hoist, ["%set", lower(__lh, hoist), lower(__rh, hoist)])
  if _not(_and(stmt63, _not(tail63))) then
    return __lh

def lower_if(args, hoist, stmt63, tail63):
  ____id17 = args
  __cond = ____id17[1]
  ___then = ____id17[2]
  ___else = ____id17[3]
  if stmt63 then

    if is63(___else) then
      __e52 = [lower_body([___else], tail63)]

    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([___then], tail63)], __e52))
  else
    __e3 = unique("e")
    add(hoist, ["%local", __e3])

    if is63(___else) then
      __e51 = [lower(["%set", __e3, ___else])]

    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, ___then])], __e51))
    return __e3

def lower_short(x, args, hoist):
  ____id18 = args
  __a3 = ____id18[1]
  __b4 = ____id18[2]
  __hoist1 = []
  __b11 = lower(__b4, __hoist1)
  if some63(__hoist1) then
    __id19 = unique("id")

    if _61(x, "and") then
      __e53 = ["%if", __id19, __b4, __id19]
    else
      __e53 = ["%if", __id19, __id19, __b4]

    return lower(["do", ["%local", __id19, __a3], __e53], hoist)
  else
    return [x, lower(__a3, hoist), __b11]

def lower_try(args, hoist, tail63):
  return add(hoist, ["%try", lower_body(args, tail63)])
def lower_while(args, hoist):
  ____id20 = args
  __c4 = ____id20[1]
  __body5 = cut(____id20, 1)
  __pre = []
  __c5 = lower(__c4, __pre)

  if none63(__pre) then
    __e54 = ["while", __c5, lower_body(__body5)]
  else
    __e54 = ["while", True, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lower_body(__body5)])]

  return add(hoist, __e54)
def lower_for(args, hoist):
  ____id21 = args
  __t = ____id21[1]
  __k13 = ____id21[2]
  __body6 = cut(____id21, 2)
  return add(hoist, ["%for", lower(__t, hoist), __k13, lower_body(__body6)])
def lower_function(args, hoist):
  if _61(target, "py") then
    __f11 = unique("f")
    return lower(["do", join(["%local-function", __f11], args), __f11], hoist)
  else
    ____id22 = args
    __a4 = ____id22[1]
    __body7 = cut(____id22, 1)
    return ["%function", __a4, lower_body(__body7, True)]

def lower_definition(kind, args, hoist):
  ____id23 = args
  __name4 = ____id23[1]
  __args6 = ____id23[2]
  __body8 = cut(____id23, 2)
  return add(hoist, [kind, __name4, __args6, lower_body(__body8, True)])
def lower_call(form, hoist):
  def __f6(x):
    return lower(x, hoist)
  __form2 = map(__f6, form)
  if some63(__form2) then
    return __form2

def pairwise63(form):
  return in63(hd(form), ["<", "<=", "=", ">=", ">"])
def lower_pairwise(form):
  if pairwise63(form) then
    __e4 = []
    ____id24 = form
    __x131 = ____id24[1]
    __args7 = cut(____id24, 1)
    def __f7(a, b):
      add(__e4, [__x131, a, b])
      return a
    reduce(__f7, __args7)
    return join(["and"], reverse(__e4))
  else
    return form

def lower_infix63(form):
  return _and(infix63(hd(form)), _35(form) > 3)
def lower_infix(form, hoist):
  __form3 = lower_pairwise(form)
  ____id25 = __form3
  __x134 = ____id25[1]
  __args8 = cut(____id25, 1)
  def __f8(a, b):
    return [__x134, b, a]
  return lower(reduce(__f8, reverse(__args8)), hoist)
def lower_special(form, hoist):
  __e5 = lower_call(form, hoist)
  if __e5 then
    return add(hoist, __e5)

def lower(form, hoist, stmt63, tail63):
  if atom63(form) then
    return form
  else
    if empty63(form) then
      return ["%array"]
    else
      if nil63(hoist) then
        return lower_statement(form)
      else
        if lower_infix63(form) then
          return lower_infix(form, hoist)
        else
          ____id26 = form
          __x137 = ____id26[1]
          __args9 = cut(____id26, 1)
          if _61(__x137, "do") then
            return lower_do(__args9, hoist, stmt63, tail63)
          else
            if _61(__x137, "%set") then
              return lower_set(__args9, hoist, stmt63, tail63)
            else
              if _61(__x137, "%if") then
                return lower_if(__args9, hoist, stmt63, tail63)
              else
                if _61(__x137, "%try") then
                  return lower_try(__args9, hoist, tail63)
                else
                  if _61(__x137, "while") then
                    return lower_while(__args9, hoist)
                  else
                    if _61(__x137, "%for") then
                      return lower_for(__args9, hoist)
                    else
                      if _61(__x137, "%function") then
                        return lower_function(__args9, hoist)
                      else
                        if _or(_61(__x137, "%local-function"), _61(__x137, "%global-function")) then
                          return lower_definition(__x137, __args9, hoist)
                        else
                          if in63(__x137, ["and", "or"]) then
                            return lower_short(__x137, __args9, hoist)
                          else
                            if statement63(__x137) then
                              return lower_special(form, hoist)
                            else
                              return lower_call(form, hoist)














def expand(form):
  return lower(macroexpand(form))
_37result = None
def _eval(form):
  __previous = target
  target = "py"
  __code = compile(expand(["set", "%result", form]))
  target = __previous
  run(__code)
  return _37result
def immediate_call63(x):
  return _and(obj63(x), obj63(hd(x)))
def __f9():
  __forms1 = unstash([...])
  __s4 = ""
  ____x143 = __forms1
  ____i19 = 0
  while ____i19 < _35(____x143) do
    __x144 = ____x143[____i19]
    if _and(_61(target, "lua"), immediate_call63(__x144)) then
      __s4 = cat(clip(__s4, 0, edge(__s4)), ";\n")

    __s4 = cat(__s4, compile(__x144, {"_stash": True, "stmt": True}))
    if _not(atom63(__x144)) then
      if _or(_61(hd(__x144), "return"), _61(hd(__x144), "break")) then
        break


    ____i19 = ____i19 + 1
  end
  return __s4
setenv("do", {"_stash": True, "special": __f9, "stmt": True, "tr": True})
def __f10(cond, cons, alt):
  __cond2 = compile(cond)
  indent_level = indent_level + 1
  ____x147 = compile(cons, {"_stash": True, "stmt": True})
  indent_level = indent_level - 1
  __cons1 = ____x147

  if alt then
    indent_level = indent_level + 1
    ____x148 = compile(alt, {"_stash": True, "stmt": True})
    indent_level = indent_level - 1
    __e55 = ____x148

  __alt1 = __e55
  __ind3 = indentation()
  __s6 = ""
  if _61(target, "js") then
    __s6 = cat(__s6, __ind3, "if (", __cond2, ") {\n", __cons1, __ind3, "}")
  else
    __s6 = cat(__s6, __ind3, "if ", __cond2, " then\n", __cons1)

  if _and(__alt1, _61(target, "js")) then
    __s6 = cat(__s6, " else {\n", __alt1, __ind3, "}")
  else
    if __alt1 then
      __s6 = cat(__s6, __ind3, "else\n", __alt1)


  if _61(target, "lua") then
    return cat(__s6, __ind3, "end\n")
  else
    return cat(__s6, "\n")

setenv("%if", {"_stash": True, "special": __f10, "stmt": True, "tr": True})
def __f111(cond, form):
  __cond4 = compile(cond)
  indent_level = indent_level + 1
  ____x150 = compile(form, {"_stash": True, "stmt": True})
  indent_level = indent_level - 1
  __body10 = ____x150
  __ind5 = indentation()
  if _61(target, "js") then
    return cat(__ind5, "while (", __cond4, ") {\n", __body10, __ind5, "}\n")
  else
    return cat(__ind5, "while ", __cond4, " do\n", __body10, __ind5, "end\n")

setenv("while", {"_stash": True, "special": __f111, "stmt": True, "tr": True})
def __f12(t, k, form):
  __t2 = compile(t)
  __ind7 = indentation()
  indent_level = indent_level + 1
  ____x152 = compile(form, {"_stash": True, "stmt": True})
  indent_level = indent_level - 1
  __body12 = ____x152
  if _61(target, "lua") then
    return cat(__ind7, "for ", k, " in next, ", __t2, " do\n", __body12, __ind7, "end\n")
  else
    return cat(__ind7, "for (", k, " in ", __t2, ") {\n", __body12, __ind7, "}\n")

setenv("%for", {"_stash": True, "special": __f12, "stmt": True, "tr": True})
def __f13(form):
  __e8 = unique("e")
  __ind9 = indentation()
  indent_level = indent_level + 1
  ____x157 = compile(form, {"_stash": True, "stmt": True})
  indent_level = indent_level - 1
  __body14 = ____x157
  __hf1 = ["return", ["%array", False, __e8]]
  indent_level = indent_level + 1
  ____x160 = compile(__hf1, {"_stash": True, "stmt": True})
  indent_level = indent_level - 1
  __h1 = ____x160
  return cat(__ind9, "try {\n", __body14, __ind9, "}\n", __ind9, "catch (", __e8, ") {\n", __h1, __ind9, "}\n")
setenv("%try", {"_stash": True, "special": __f13, "stmt": True, "tr": True})
def __f14(place):
  return cat(indentation(), "delete ", compile(place))
setenv("%delete", {"_stash": True, "special": __f14, "stmt": True})
def __f15():
  return cat(indentation(), "break")
setenv("break", {"_stash": True, "special": __f15, "stmt": True})
def __f16(args, body):
  return compile_function(args, body)
setenv("%function", {"_stash": True, "special": __f16})
def __f17(name, args, body):
  if _or(_61(target, "lua"), _61(target, "py")) then
    __x164 = compile_function(args, body, {"_stash": True, "name": name})
    return cat(indentation(), __x164)
  else
    return compile(["%set", name, ["%function", args, body]], {"_stash": True, "stmt": True})

setenv("%global-function", {"_stash": True, "special": __f17, "stmt": True, "tr": True})
def __f18(name, args, body):
  if _or(_61(target, "lua"), _61(target, "py")) then
    __x170 = compile_function(args, body, {"_stash": True, "name": name, "prefix": "local"})
    return cat(indentation(), __x170)
  else
    return compile(["%local", name, ["%function", args, body]], {"_stash": True, "stmt": True})

setenv("%local-function", {"_stash": True, "special": __f18, "stmt": True, "tr": True})
def __f19(x):

  if nil63(x) then
    __e56 = "return"
  else
    __e56 = cat("return ", compile(x))

  __x174 = __e56
  return cat(indentation(), __x174)
setenv("return", {"_stash": True, "special": __f19, "stmt": True})
def __f20(x):
  return cat("new ", compile(x))
setenv("new", {"_stash": True, "special": __f20})
def __f21(x):
  return cat("typeof(", compile(x), ")")
setenv("typeof", {"_stash": True, "special": __f21})
def __f22(x):

  if _61(target, "js") then
    __e57 = cat("throw ", compile(["new", ["Error", x]]))
  else
    __e57 = cat("error(", compile(x), ")")

  __e12 = __e57
  return cat(indentation(), __e12)
setenv("error", {"_stash": True, "special": __f22, "stmt": True})
def __f23(name, value):
  if _and(nil63(value), _61(target, "py")) then
    return ""
  else
    __id28 = compile(name)
    __value11 = compile(value)

    if is63(value) then
      __e58 = cat(" = ", __value11)
    else
      __e58 = ""

    __rh2 = __e58

    if _61(target, "js") then
      __e59 = "var "
    else

      if _61(target, "lua") then
        __e60 = "local "
      else
        __e60 = ""

      __e59 = __e60

    __keyword1 = __e59
    __ind11 = indentation()
    return cat(__ind11, __keyword1, __id28, __rh2)

setenv("%local", {"_stash": True, "special": __f23, "stmt": True})
def __f24(lh, rh):
  __lh2 = compile(lh)

  if nil63(rh) then
    __e61 = "nil"
  else
    __e61 = rh

  __rh4 = compile(__e61)
  return cat(indentation(), __lh2, " = ", __rh4)
setenv("%set", {"_stash": True, "special": __f24, "stmt": True})
def __f25(t, k):
  __t12 = compile(t)
  __k121 = compile(k)
  if _or(_and(_61(target, "lua"), _61(char(__t12, 0), "{")), infix_operator63(t)) then
    __t12 = cat("(", __t12, ")")

  if _and(string_literal63(k), valid_id63(inner(k))) then
    return cat(__t12, ".", inner(k))
  else
    return cat(__t12, "[", __k121, "]")

setenv("get", {"_stash": True, "special": __f25})
def __f26():
  __forms3 = unstash([...])

  if _61(target, "lua") then
    __e62 = "{"
  else
    __e62 = "["

  __open1 = __e62

  if _61(target, "lua") then
    __e63 = "}"
  else
    __e63 = "]"

  __close1 = __e63
  __s8 = ""
  __c7 = ""
  ____o10 = __forms3
  __k16 = None
  for (__k16 in ____o10) {
    __v9 = ____o10[__k16]

    if numeric63(__k16) then
      __e64 = parseInt(__k16)
    else
      __e64 = __k16

    __k17 = __e64
    if number63(__k17) then
      __s8 = cat(__s8, __c7, compile(__v9))
      __c7 = ", "

  }
  return cat(__open1, __s8, __close1)
setenv("%array", {"_stash": True, "special": __f26})
def __f27():
  __forms5 = unstash([...])
  __s10 = "{"
  __c9 = ""

  if _61(target, "lua") then
    __e65 = " = "
  else
    __e65 = ": "

  __sep1 = __e65
  ____o12 = pair(__forms5)
  __k21 = None
  for (__k21 in ____o12) {
    __v12 = ____o12[__k21]

    if numeric63(__k21) then
      __e66 = parseInt(__k21)
    else
      __e66 = __k21

    __k22 = __e66
    if number63(__k22) then
      ____id30 = __v12
      __k23 = ____id30[1]
      __v13 = ____id30[2]
      if _not(string63(__k23)) then
        error(cat("Illegal key: ", str(__k23)))

      __s10 = cat(__s10, __c9, key(__k23), __sep1, compile(__v13))
      __c9 = ", "

  }
  return cat(__s10, "}")
setenv("%object", {"_stash": True, "special": __f27})
def __f28():
  __args111 = unstash([...])
  return apply(cat, map(compile, __args111))
setenv("%literal", {"_stash": True, "special": __f28})
return {"run": run, "eval": _eval, "expand": expand, "compile": compile}
