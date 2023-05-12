getenv = function (k, p)
  if string63(k) then
    __i = edge(environment)
    while __i >= 0 do
      if has63(environment[__i], k) then
        __b = environment[__i][k]
        __e40 = ""
        if p then
          __e40 = has(__b, p)
        else
          __e40 = __b
        return __e40
      else
        __i = __i - 1
    end
end
macro_function = function (k)
  return getenv(k, "macro")
end
macro63 = function (k)
  return is63(macro_function(k))
end
special63 = function (k)
  return is63(getenv(k, "special"))
end
special_form63 = function (form)
  return _37and(_37not(atom63(form)), special63(hd(form)))
end
statement63 = function (k)
  return _37and(special63(k), getenv(k, "stmt"))
end
symbol_expansion = function (k)
  return getenv(k, "symbol")
end
symbol63 = function (k)
  return is63(symbol_expansion(k))
end
variable63 = function (k)
  return is63(getenv(k, "variable"))
end
bound63 = function (x)
  return _37or(macro63(x), _37or(special63(x), _37or(symbol63(x), variable63(x))))
end
keyword63 = function (atom)
  return _37and(string63(atom), _37and(_35(atom) > 1, _37eq(char(atom, 0), ":")))
end
quoted = function (form)
  if keyword63(form) then
    return form
  else
    if string63(form) then
      return escape(form)
    else
      if atom63(form) then
        return form
      else
        return join(["list"], map(quoted, form))
end
literal = function (s)
  if string_literal63(s) then
    return s
  else
    return quoted(s)
end
stash42 = function (args)
  if props63(args) then
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py") then
      __l = array(args)
      ____o = args
      __k = ""
      for (__k in ____o) {
        __v = ____o[__k]
        __e42 = ""
        if numeric63(__k) then
          __e42 = parseInt(__k)
        else
          __e42 = __k
        __k1 = __e42
        if _37not(number63(__k1)) then
          add(__l, ["%literal", __k1, "|=|", __v])
      }
      return __l
    else
      __l1 = ["%object", "\"_stash\"", ON]
      ____o1 = args
      __k2 = ""
      for (__k2 in ____o1) {
        __v1 = ____o1[__k2]
        __e41 = ""
        if numeric63(__k2) then
          __e41 = parseInt(__k2)
        else
          __e41 = __k2
        __k3 = __e41
        if _37not(number63(__k3)) then
          add(__l1, literal(__k3))
          add(__l1, __v1)
      }
      return join({}, args, [__l1])
  else
    return args
end
bias = function (k)
  if number63(k) then
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "lua") then
      k = k + 1
    return k
  else
    return k
end
bind = function (lh, rh)
  if atom63(lh) then
    return [lh, rh]
  else
    if hd63(lh, ",") then
      return bind(cut(lh, 1), rh)
    else
      if _37eq(hd(lh), "t") then
        ____id = lh
        ___ = has(____id, 0)
        __var = has(____id, 1)
        __val = has(____id, 2)
        __val1 = either(__val, __var)
        return bind(["o", __var, ["the", __val1]], rh)
      else
        if _37eq(hd(lh), "o") then
          ____id1 = lh
          ___1 = has(____id1, 0)
          __var1 = has(____id1, 1)
          __val2 = has(____id1, 2)
          return [__var1, ["if", ["nil?", rh], __val2, rh]]
        else
          __id2 = unique("id")
          __bs = [__id2, rh]
          ____o2 = lh
          __k4 = ""
          for (__k4 in ____o2) {
            __v2 = ____o2[__k4]
            __e43 = ""
            if numeric63(__k4) then
              __e43 = parseInt(__k4)
            else
              __e43 = __k4
            __k5 = __e43
            __e44 = ""
            if _37eq(__k5, "rest") then
              __e44 = ["cut", __id2, _35(lh)]
            else
              __e44 = ["has", __id2, ["quote", bias(__k5)]]
            __x11 = __e44
            if is63(__k5) then
              __e45 = ""
              if _37eq(__v2, ON) then
                __e45 = __k5
              else
                __e45 = __v2
              __k6 = __e45
              __bs = join(__bs, bind(__k6, __x11))
          }
          return __bs
end
__arguments37__macro = function (from)
  ____x22 = object(["target"])
  ____x22.js = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", from]
  ____x22.py = ["|list|", "|_args|"]
  ____x22.lua = ["list", "|...|"]
  return ____x22
end
setenv("arguments%", {
  _stash: ON,
  ["macro"]: __arguments37__macro
})
body_docstring = function (body)
  if _37and(_35(body) > 1, string_literal63(hd(body))) then
    return [hd(body), tl(body)]
  else
    return [[], body]
end
bind42 = function (args, body)
  __args1 = {}
  rest = function ()
    __args1.rest = ON
    ____x33 = object(["target"])
    ____x33.py = ["obj", "..."]
    return ["unstash", ["list", "..."], ____x33]
  end
  if atom63(args) then
    return [__args1, join(["let", [args, rest()]], body)]
  else
    ____id3 = body_docstring(body)
    __doc = has(____id3, 0)
    __body = has(____id3, 1)
    __pre = []
    __bs1 = []
    __inits = []
    __r21 = unique("r")
    ____o3 = args
    __k7 = ""
    for (__k7 in ____o3) {
      __v3 = ____o3[__k7]
      __e46 = ""
      if numeric63(__k7) then
        __e46 = parseInt(__k7)
      else
        __e46 = __k7
      __k8 = __e46
      if number63(__k8) then
        if atom63(__v3) then
          add(__args1, __v3)
        else
          if _37eq(hd(__v3), "o") then
            ____id4 = __v3
            ___2 = has(____id4, 0)
            __var2 = has(____id4, 1)
            __val3 = has(____id4, 2)
            add(__args1, __var2)
            add(__inits, ["%if", ["nil?", __var2], ["%set", __var2, __val3]])
          else
            if _37eq(hd(__v3), "t") then
              ____id5 = __v3
              ___3 = has(____id5, 0)
              __var3 = has(____id5, 1)
              __val4 = has(____id5, 2)
              __val5 = either(__val4, __var3)
              add(__args1, __var3)
              add(__inits, ["%if", ["nil?", __var3], ["%set", __var3, ["the", __val5]]])
            else
              __x45 = unique("x")
              add(__args1, __x45)
              __bs1 = join(__bs1, [__v3, __x45])
    }
    if props63(args) then
      __pre = join(__pre, [__r21, rest()])
      __n4 = _35(__args1)
      __i5 = 0
      while __i5 < __n4 do
        __v4 = __args1[__i5]
        __pre = join(__pre, [__v4, ["destash!", __v4, __r21]])
        __i5 = __i5 + 1
      end
      __bs1 = join(__bs1, [props(args), __r21])
    __forms = join(["let", __pre], __inits, [join(["let", __bs1], __body)])
    __e47 = ""
    if is63(__doc) then
      __e47 = ["do", __doc, __forms]
    else
      __e47 = __forms
    return [__args1, __e47]
end
quoting63 = function (depth)
  return number63(depth)
end
quasiquoting63 = function (depth)
  return _37and(quoting63(depth), depth > 0)
end
can_unquote63 = function (depth)
  return _37and(quoting63(depth), _37eq(depth, 1))
end
quasisplice63 = function (x, depth)
  return _37and(can_unquote63(depth), _37and(_37not(atom63(x)), _37eq(hd(x), "unquote-splicing")))
end
expand_local = function (__x56)
  ____id6 = __x56
  __x57 = has(____id6, 0)
  __name = has(____id6, 1)
  __value = has(____id6, 2)
  setenv(__name, {
    _stash: ON,
    variable: ON
  })
  return ["%local", __name, macroexpand(__value)]
end
expand_function = function (__x59)
  ____id7 = __x59
  __x60 = has(____id7, 0)
  __args = has(____id7, 1)
  __body1 = cut(____id7, 2)
  add(environment, {})
  ____r29 = ""
  try{
    ____o4 = __args
    ____i6 = ""
    for (____i6 in ____o4) {
      ____x61 = ____o4[____i6]
      __e48 = ""
      if numeric63(____i6) then
        __e48 = parseInt(____i6)
      else
        __e48 = ____i6
      ____i61 = __e48
      setenv(____x61, {
        _stash: ON,
        variable: ON
      })
    }
    ____r29 = join(["%function", __args], macroexpand(__body1))
  }
  finally{
    drop(environment)
  }
  return ____r29
end
expand_definition = function (__x63)
  ____id8 = __x63
  __x64 = has(____id8, 0)
  __name1 = has(____id8, 1)
  __args11 = has(____id8, 2)
  __body2 = cut(____id8, 3)
  add(environment, {})
  ____r32 = ""
  try{
    ____o5 = __args11
    ____i7 = ""
    for (____i7 in ____o5) {
      ____x65 = ____o5[____i7]
      __e49 = ""
      if numeric63(____i7) then
        __e49 = parseInt(____i7)
      else
        __e49 = ____i7
      ____i71 = __e49
      setenv(____x65, {
        _stash: ON,
        variable: ON
      })
    }
    ____r32 = join([__x64, __name1, __args11], macroexpand(__body2))
  }
  finally{
    drop(environment)
  }
  return ____r32
end
expand_macro = function (form)
  return macroexpand(expand1(form))
end
expand1 = function (__x67)
  ____id9 = __x67
  __name2 = has(____id9, 0)
  __body3 = cut(____id9, 1)
  return apply(macro_function(__name2), __body3)
end
real63 = function (x)
  return _37and(number63(x), _37and(_37not(nan63(x)), _37not(inf63(x))))
end
valid_access63 = function (str)
  return _37and(_35(str) > 2, _37and(_37not(_37eq(".", char(str, 0))), _37and(_37not(_37eq(".", char(str, edge(str)))), _37not(search(str, "..")))))
end
parse_access = function (str)
  return reduce(function (a, b)
    __n7 = number(a)
    if is63(__n7) then
      return ["at", b, __n7]
    else
      return ["%idx", b, a]
  end, reverse(split(str, ".")))
end
parse_access63 = function (form)
  return _37and(string63(form), _37and(_37not(string_literal63(form)), _37and(_37not(id_literal63(form)), _37and(is63(search(form, ".")), valid_access63(form)))))
end
macroexpand = function (form)
  if parse_access63(form) then
    return macroexpand(parse_access(form))
  else
    if symbol63(form) then
      return macroexpand(symbol_expansion(form))
    else
      if atom63(form) then
        return form
      else
        __x70 = hd(form)
        if _37eq(__x70, "%local") then
          return expand_local(form)
        else
          if _37eq(__x70, "%function") then
            return expand_function(form)
          else
            if _37eq(__x70, "%global-function") then
              return expand_definition(form)
            else
              if _37eq(__x70, "%local-function") then
                return expand_definition(form)
              else
                if _37eq(__x70, "%expansion") then
                  return form[1]
                else
                  if macro63(__x70) then
                    return expand_macro(form)
                  else
                    if parse_access63(__x70) then
                      return macroexpand(join([parse_access(__x70)], tl(form)))
                    else
                      return map(macroexpand, form)
end
quasiquote_list = function (form, depth)
  __xs = [["list"]]
  ____o6 = form
  __k9 = ""
  for (__k9 in ____o6) {
    __v5 = ____o6[__k9]
    __e50 = ""
    if numeric63(__k9) then
      __e50 = parseInt(__k9)
    else
      __e50 = __k9
    __k10 = __e50
    if _37not(number63(__k10)) then
      __e51 = ""
      if quasisplice63(__v5, depth) then
        __e51 = quasiexpand(__v5[1])
      else
        __e51 = quasiexpand(__v5, depth)
      __v6 = __e51
      last(__xs)[__k10] = __v6
  }
  ____x74 = form
  ____i9 = 0
  while ____i9 < _35(____x74) do
    __x75 = ____x74[____i9]
    if quasisplice63(__x75, depth) then
      __x76 = quasiexpand(__x75[1])
      add(__xs, __x76)
      add(__xs, ["list"])
    else
      add(last(__xs), quasiexpand(__x75, depth))
    ____i9 = ____i9 + 1
  end
  __pruned = keep(function (x)
    return _37or(_35(x) > 1, _37or(_37not(_37eq(hd(x), "list")), props63(x)))
  end, __xs)
  if one63(__pruned) then
    return hd(__pruned)
  else
    return join(["join"], __pruned)
end
quasiexpand = function (form, depth)
  if quasiquoting63(depth) then
    if atom63(form) then
      return ["quote", form]
    else
      if _37and(can_unquote63(depth), _37eq(hd(form), "unquote")) then
        return quasiexpand(form[1])
      else
        if _37or(_37eq(hd(form), "unquote"), _37eq(hd(form), "unquote-splicing")) then
          return quasiquote_list(form, depth - 1)
        else
          if _37eq(hd(form), "quasiquote") then
            return quasiquote_list(form, depth + 1)
          else
            return quasiquote_list(form, depth)
  else
    if atom63(form) then
      return form
    else
      if _37eq(hd(form), "quote") then
        return form
      else
        if _37eq(hd(form), "quasiquote") then
          return quasiexpand(form[1], 1)
        else
          return map(function (x)
            return quasiexpand(x, depth)
          end, form)
end
expand_if = function (__x80)
  ____id10 = __x80
  __a = has(____id10, 0)
  __b1 = has(____id10, 1)
  __c = cut(____id10, 2)
  if is63(__b1) then
    return [join(["%if", __a, __b1], expand_if(__c))]
  else
    if is63(__a) then
      return [__a]
end
setenv("indent-level", {
  _stash: ON,
  toplevel: ON,
  value: 0
})
setenv("indent-level", {
  _stash: ON,
  symbol: ["get-value", ["quote", "indent-level"]]
})
indentation = function ()
  __s = ""
  __i10 = 0
  while __i10 < has(setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }), "value") do
    __s = _37cat(__s, "  ")
    __i10 = __i10 + 1
  end
  return __s
end
reserved = {
  all: {
    ["="]: ON,
    ["=="]: ON,
    ["+"]: ON,
    ["-"]: ON,
    ["%"]: ON,
    ["*"]: ON,
    ["/"]: ON,
    ["<"]: ON,
    [">"]: ON,
    ["<="]: ON,
    [">="]: ON
  },
  js: {
    ["break"]: ON,
    case: ON,
    catch: ON,
    class: ON,
    const: ON,
    ["continue"]: ON,
    debugger: ON,
    default: ON,
    delete: ON,
    do: ON,
    ["else"]: ON,
    eval: ON,
    finally: ON,
    for: ON,
    ["function"]: ON,
    ["if"]: ON,
    import: ON,
    in: ON,
    instanceof: ON,
    let: ON,
    ["return"]: ON,
    switch: ON,
    throw: ON,
    try: ON,
    typeof: ON,
    var: ON,
    void: ON,
    with: ON
  },
  lua: {
    and: ON,
    end: ON,
    in: ON,
    load: ON,
    repeat: ON,
    ["while"]: ON,
    ["break"]: ON,
    false: ON,
    local: ON,
    ["return"]: ON,
    do: ON,
    for: ON,
    nil: ON,
    then: ON,
    ["else"]: ON,
    ["function"]: ON,
    not: ON,
    true: ON,
    ["elseif"]: ON,
    ["if"]: ON,
    or: ON,
    until: ON
  },
  py: {
    and: ON,
    except: ON,
    lambda: ON,
    with: ON,
    as: ON,
    finally: ON,
    nonlocal: ON,
    ["while"]: ON,
    assert: ON,
    false: ON,
    None: ON,
    yield: ON,
    ["break"]: ON,
    for: ON,
    not: ON,
    class: ON,
    from: ON,
    or: ON,
    ["continue"]: ON,
    global: ON,
    pass: ON,
    def: ON,
    ["if"]: ON,
    raise: ON,
    del: ON,
    import: ON,
    ["return"]: ON,
    elif: ON,
    in: ON,
    True: ON,
    ["else"]: ON,
    is: ON,
    try: ON,
    str: ON,
    print: ON
  },
  cmake: {
    ["set"]: ON,
    ["foreach"]: ON,
    ["endforeach"]: ON,
    ["while"]: ON,
    ["endwhile"]: ON,
    ["if"]: ON,
    ["elseif"]: ON,
    ["else"]: ON,
    ["block"]: ON,
    ["endblock"]: ON,
    ["macro"]: ON,
    ["endmacro"]: ON,
    ["function"]: ON,
    ["endfunction"]: ON,
    ["break"]: ON,
    ["return"]: ON,
    ["continue"]: ON,
    ["AND"]: ON,
    ["OR"]: ON,
    ["TRUE"]: ON,
    ["FALSE"]: ON,
    ["ON"]: ON,
    ["OFF"]: ON,
    ["Y"]: ON,
    ["N"]: ON
  }
}
reserved63 = function (x)
  return _37or(has63(reserved.all, x), has63(reserved[has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value")], x))
end
valid_code63 = function (n)
  return _37or(number_code63(n), _37or(_37and(n > 64, n < 91), _37or(_37and(n > 96, n < 123), _37eq(n, 95))))
end
compile_keyword = function (x)
  return escape(x)
end
compile_name = function (name)
  if keyword63(name) then
    return compile(clip(name, 1))
  else
    return compile(name)
end
compile_id = function (id, raw63)
  if keyword63(id) then
    return compile_keyword(id)
  else
    if _37eq(code(id, 0), 46) then
      return _37cat(".", compile_id(clip(id, 1), ON))
    else
      __e52 = ""
      if _37eq(has(setenv("target", {
        _stash: ON,
        toplevel: ON
      }), "value"), "py") then
        __e52 = "L_"
      else
        __e52 = "_"
      __x86 = __e52
      __e53 = ""
      if number_code63(code(id, 0)) then
        __e53 = __x86
      else
        __e53 = ""
      __id11 = __e53
      __i11 = 0
      while __i11 < _35(id) do
        __c1 = char(id, __i11)
        __n9 = code(__c1)
        __e54 = ""
        if _37and(_37eq(__c1, "-"), _37not(_37eq(id, "-"))) then
          __e57 = ""
          if _37eq(__i11, 0) then
            __e57 = __x86
          else
            __e57 = "_"
          __e54 = __e57
        else
          __e55 = ""
          if valid_code63(__n9) then
            __e55 = __c1
          else
            __e56 = ""
            if _37eq(__i11, 0) then
              __e56 = _37cat(__x86, __n9)
            else
              __e56 = __n9
            __e55 = __e56
          __e54 = __e55
        __c11 = __e54
        __id11 = _37cat(__id11, __c11)
        __i11 = __i11 + 1
      end
      if raw63 then
        return __id11
      else
        if reserved63(__id11) then
          return _37cat(__x86, __id11)
        else
          return __id11
end
valid_id63 = function (x)
  return _37and(some63(x), _37eq(x, compile_id(x)))
end
__names = {}
unique = function (x)
  __x87 = compile_id(x)
  if has63(__names, __x87) then
    __i12 = __names[__x87]
    __names[__x87] = __names[__x87] + 1
    return unique(_37cat(__x87, __i12))
  else
    __names[__x87] = 1
    return _37cat("__", __x87)
end
key = function (k)
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    return compile(k)
  else
    if string_literal63(k) then
      __i13 = inner(k)
      if valid_id63(__i13) then
        return __i13
      else
        return _37cat("[", _37cat(k, "]"))
    else
      return _37cat("[", _37cat(compile(k), "]"))
end
mapo = function (f, t)
  __o7 = []
  ____o8 = t
  __k11 = ""
  for (__k11 in ____o8) {
    __v7 = ____o8[__k11]
    __e58 = ""
    if numeric63(__k11) then
      __e58 = parseInt(__k11)
    else
      __e58 = __k11
    __k12 = __e58
    __x88 = f(__v7)
    if is63(__x88) then
      add(__o7, literal(__k12))
      add(__o7, __x88)
  }
  return __o7
end
____x90 = object([])
____x91 = object([])
____x91.js = "!"
____x91.lua = "not"
____x91.py = "not"
____x90["%not"] = ____x91
____x90["%unm"] = "-"
____x92 = object([])
____x92["%mul"] = "*"
____x92["%div"] = "/"
____x92["%idiv"] = "//"
____x92["%mod"] = "%"
____x93 = object([])
____x94 = object([])
____x94.js = "+"
____x94.lua = ".."
____x94.py = "+"
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
____x98.js = "==="
____x98.lua = "=="
____x98.py = "=="
____x97["%eq"] = ____x98
____x99 = object([])
____x100 = object([])
____x100.py = "in"
____x99["%in"] = ____x100
____x101 = object([])
____x101.py = "is"
____x99["%is"] = ____x101
____x102 = object([])
____x103 = object([])
____x103.js = "&&"
____x103.lua = "and"
____x103.py = "and"
____x102["%and"] = ____x103
____x104 = object([])
____x105 = object([])
____x105.js = "||"
____x105.lua = "or"
____x105.py = "or"
____x104["%or"] = ____x105
infix = [____x90, ____x92, ____x93, ____x95, ____x96, ____x97, ____x99, ____x102, ____x104]
unary63 = function (form)
  return _37and(two63(form), in63(hd(form), ["%not", "%unm"]))
end
index = function (k)
  return k
end
precedence = function (form)
  if _37not(_37or(atom63(form), unary63(form))) then
    if atom63(hd(form)) then
      ____o9 = infix
      __k13 = ""
      for (__k13 in ____o9) {
        __v8 = ____o9[__k13]
        __e59 = ""
        if numeric63(__k13) then
          __e59 = parseInt(__k13)
        else
          __e59 = __k13
        __k14 = __e59
        if has63(__v8, hd(form)) then
          return index(__k14)
      }
  return 0
end
getop = function (op)
  if string63(op) then
    return find(function (level)
      __x107 = has(level, op)
      if _37eq(__x107, ON) then
        return op
      else
        if string63(__x107) then
          return __x107
        else
          if is63(__x107) then
            return has(__x107, has(setenv("target", {
              _stash: ON,
              toplevel: ON
            }), "value"))
    end, infix)
end
infix63 = function (x)
  return is63(getop(x))
end
infix_operator63 = function (x)
  return _37and(_37not(atom63(x)), infix63(hd(x)))
end
compile_args = function (args, default63)
  __s1 = "("
  __c2 = ""
  ____x108 = args
  ____i16 = 0
  while ____i16 < _35(____x108) do
    __x109 = ____x108[____i16]
    __s1 = _37cat(__s1, _37cat(__c2, compile(__x109)))
    if _37and(_37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py"), _37and(default63, _37and(_37not(id_literal63(__x109)), _37not(_37eq(__x109, "..."))))) then
      __s1 = _37cat(__s1, "=None")
    __c2 = ", "
    ____i16 = ____i16 + 1
  end
  return _37cat(__s1, ")")
end
escape_newlines = function (s)
  if _37and(nil63(search(s, "\n")), nil63(search(s, "\r"))) then
    return s
  else
    __s11 = ""
    __i17 = 0
    while __i17 < _35(s) do
      __c3 = char(s, __i17)
      __e60 = ""
      if _37eq(__c3, "\n") then
        __e60 = "\\n"
      else
        __e61 = ""
        if _37eq(__c3, "\r") then
          __e61 = "\\r"
        else
          __e61 = __c3
        __e60 = __e61
      __s11 = _37cat(__s11, __e60)
      __i17 = __i17 + 1
    end
    return __s11
end
compile_nil = function ()
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    return "None"
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "cmake") then
      return "\"\""
    else
      if _37eq(has(setenv("target", {
        _stash: ON,
        toplevel: ON
      }), "value"), "lua") then
        return "nil"
      else
        return "undefined"
end
compile_boolean = function (x)
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    if x then
      return "True"
    else
      return "False"
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "cmake") then
      if x then
        return "ON"
      else
        return "OFF"
    else
      if x then
        return "true"
      else
        return "false"
end
triple_quoted63 = function (x)
  return _37and(string_literal63(x), _37and(string_literal63(inner(x)), string_literal63(inner(inner(x)))))
end
un_triple_quote = function (x)
  return escape(inner(inner(inner(x))))
end
compile_string = function (x)
  if triple_quoted63(x) then
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py") then
      return x
    else
      return escape_newlines(un_triple_quote(x))
  else
    return escape_newlines(x)
end
compile_rest = function ()
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    return "*_args, **_keys"
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "js") then
      return _37cat("...", compile("*args"))
    else
      return "..."
end
compile_atom = function (x, raw63)
  if _37eq(x, "nil") then
    return compile_nil()
  else
    if _37eq(x, "...") then
      return compile_rest()
    else
      if id_literal63(x) then
        return inner(x)
      else
        if string_literal63(x) then
          return compile_string(x)
        else
          if string63(x) then
            return compile_id(x, raw63)
          else
            if boolean63(x) then
              return compile_boolean(x)
            else
              if nan63(x) then
                return "nan"
              else
                if _37eq(x, inf) then
                  return "inf"
                else
                  if _37eq(x, _inf) then
                    return "-inf"
                  else
                    if number63(x) then
                      return _37cat(x, "")
                    else
                      error(_37cat("Cannot compile atom: ", str(x)))
end
terminator = function (stmt63)
  if _37not(stmt63) then
    return ""
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "js") then
      return ";\n"
    else
      return "\n"
end
compile_special = function (form, stmt63)
  ____id111 = form
  __x110 = has(____id111, 0)
  __args2 = cut(____id111, 1)
  ____id12 = getenv(__x110)
  __special = has(____id12, "special")
  __stmt = has(____id12, "stmt")
  __self_tr63 = has(____id12, "tr")
  __e62 = ""
  if _37and(stmt63, _37not(__stmt)) then
    __e62 = indentation()
  else
    __e62 = ""
  __p = __e62
  __tr = terminator(_37and(stmt63, _37not(__self_tr63)))
  return _37cat(__p, _37cat(apply(__special, __args2), __tr))
end
parenthesize_call63 = function (x)
  return _37or(_37and(_37not(atom63(x)), _37eq(hd(x), "%function")), precedence(x) > 0)
end
method_call63 = function (form)
  __e63 = ""
  if list63(form) then
    __e63 = hd(form)
  else
    __e63 = form
  __x111 = __e63
  return _37and(string63(__x111), _37and(_35(__x111, 1) > 1, _37eq(char(__x111, 0), ".")))
end
compile_call = function (form)
  __f = hd(form)
  __f1 = compile_name(__f)
  __args3 = stash42(tl(form))
  __e64 = ""
  if method_call63(hd(__args3)) then
    __e64 = mapcat(compile, __args3, "")
  else
    __e64 = compile_args(__args3)
  __args4 = __e64
  if parenthesize_call63(__f) then
    return _37cat("(", _37cat(__f1, _37cat(")", __args4)))
  else
    return _37cat(__f1, __args4)
end
op_delims = function (parent, child, ...)
  ____r77 = unstash([...])
  __parent = destash33(parent, ____r77)
  __child = destash33(child, ____r77)
  ____id13 = ____r77
  __right = has(____id13, "right")
  __e65 = ""
  if __right then
    __e65 = _6261
  else
    __e65 = _62
  if __e65(precedence(__child), precedence(__parent)) then
    return ["(", ")"]
  else
    return ["", ""]
end
compile_infix = function (form)
  ____id14 = form
  __op = has(____id14, 0)
  ____id15 = cut(____id14, 1)
  __a1 = has(____id15, 0)
  __b2 = has(____id15, 1)
  ____id16 = op_delims(form, __a1)
  __ao = has(____id16, 0)
  __ac = has(____id16, 1)
  ____id17 = op_delims(form, __b2, {
    _stash: ON,
    right: ON
  })
  __bo = has(____id17, 0)
  __bc = has(____id17, 1)
  __a2 = compile(__a1)
  __b3 = compile(__b2)
  __op1 = getop(__op)
  if unary63(form) then
    return _37cat(__op1, _37cat(__ao, _37cat(" ", _37cat(__a2, __ac))))
  else
    return _37cat(__ao, _37cat(__a2, _37cat(__ac, _37cat(" ", _37cat(__op1, _37cat(" ", _37cat(__bo, _37cat(__b3, __bc))))))))
end
compile_body = function (body)
  setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }).value = has(setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }), "value") + 1
  ____x115 = compile(body, {
    _stash: ON,
    stmt: ON
  })
  setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }).value = has(setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }), "value") - 1
  __s2 = ____x115
  if _37and(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py"), none63(__s2)) then
    setenv("indent-level", {
      _stash: ON,
      toplevel: ON
    }).value = has(setenv("indent-level", {
      _stash: ON,
      toplevel: ON
    }), "value") + 1
    ____x116 = _37cat(indentation(), "pass\n")
    setenv("indent-level", {
      _stash: ON,
      toplevel: ON
    }).value = has(setenv("indent-level", {
      _stash: ON,
      toplevel: ON
    }), "value") - 1
    return ____x116
  else
    return __s2
end
compile_function = function (args, body, ...)
  ____r80 = unstash([...])
  __args5 = destash33(args, ____r80)
  __body4 = destash33(body, ____r80)
  ____id18 = ____r80
  __name3 = has(____id18, "name")
  __prefix = has(____id18, "prefix")
  __async = has(____id18, "async")
  __e66 = ""
  if __name3 then
    __e66 = compile_name(__name3)
  else
    __e66 = ""
  __id19 = __e66
  __e67 = ""
  if has(__args5, "rest") then
    __e67 = join(__args5, ["..."])
  else
    __e67 = __args5
  __args12 = __e67
  __args6 = compile_args(__args12, ON)
  __body5 = compile_body(__body4)
  __ind = indentation()
  __e68 = ""
  if __prefix then
    __e68 = _37cat(__prefix, " ")
  else
    __e68 = ""
  __p1 = __e68
  __e69 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js") then
    __e69 = ""
  else
    __e69 = "end"
  __tr1 = __e69
  __e70 = ""
  if _37and(__async, _37not(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua"))) then
    __e70 = "async "
  else
    __e70 = ""
  __a3 = __e70
  if __name3 then
    __tr1 = _37cat(__tr1, "\n")
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js") then
    return _37cat(__a3, _37cat("function ", _37cat(__id19, _37cat(__args6, _37cat(" {\n", _37cat(__body5, _37cat(__ind, _37cat("}", __tr1))))))))
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py") then
      __e71 = ""
      if none63(__ind) then
        __e71 = "\n"
      else
        __e71 = ""
      __ws = __e71
      return _37cat(__a3, _37cat("def ", _37cat(__id19, _37cat(__args6, _37cat(":\n", _37cat(__body5, __ws))))))
    else
      return _37cat(__p1, _37cat("function ", _37cat(__id19, _37cat(__args6, _37cat("\n", _37cat(__body5, _37cat(__ind, __tr1)))))))
end
can_return63 = function (form)
  return _37and(is63(form), _37or(atom63(form), _37and(_37not(_37eq(hd(form), "%return")), _37not(statement63(hd(form))))))
end
compile = function (form, raw63, ...)
  ____r82 = unstash([...])
  __form = destash33(form, ____r82)
  __raw63 = destash33(raw63, ____r82)
  ____id20 = ____r82
  __stmt1 = has(____id20, "stmt")
  if nil63(__form) then
    return ""
  else
    if special_form63(__form) then
      return compile_special(__form, __stmt1)
    else
      __tr2 = terminator(__stmt1)
      __e72 = ""
      if __stmt1 then
        __e72 = indentation()
      else
        __e72 = ""
      __ind1 = __e72
      __e73 = ""
      if atom63(__form) then
        __e73 = compile_atom(__form, __raw63)
      else
        __e74 = ""
        if infix63(hd(__form)) then
          __e74 = compile_infix(__form)
        else
          __e74 = compile_call(__form)
        __e73 = __e74
      __form1 = __e73
      return _37cat(__ind1, _37cat(__form1, __tr2))
end
lower_statement = function (form, tail63)
  __hoist = []
  __e = lower(form, __hoist, ON, tail63)
  __e75 = ""
  if _37and(some63(__hoist), is63(__e)) then
    __e75 = join(["%do"], __hoist, [__e])
  else
    __e76 = ""
    if is63(__e) then
      __e76 = __e
    else
      __e77 = ""
      if _35(__hoist) > 1 then
        __e77 = join(["%do"], __hoist)
      else
        __e77 = hd(__hoist)
      __e76 = __e77
    __e75 = __e76
  return either(__e75, ["%do"])
end
lower_body = function (body, tail63)
  return lower_statement(join(["%do"], body), tail63)
end
literal63 = function (form)
  return _37or(atom63(form), _37or(_37eq(hd(form), "%array"), _37or(_37eq(hd(form), "%object"), _37or(_37eq(hd(form), "%list"), _37eq(hd(form), ",")))))
end
standalone63 = function (form)
  return _37or(_37and(_37not(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua")), string_literal63(form)), _37or(_37and(_37not(atom63(form)), _37and(_37not(infix63(hd(form))), _37and(_37not(literal63(form)), _37not(_37eq("%get", hd(form)))))), id_literal63(form)))
end
lower_do = function (args, hoist, stmt63, tail63)
  ____x125 = almost(args)
  ____i18 = 0
  while ____i18 < _35(____x125) do
    __x126 = ____x125[____i18]
    ____y = lower(__x126, hoist, stmt63)
    if yes(____y) then
      __e1 = ____y
      if standalone63(__e1) then
        add(hoist, __e1)
    ____i18 = ____i18 + 1
  end
  __e2 = lower(last(args), hoist, stmt63, tail63)
  if _37and(tail63, can_return63(__e2)) then
    return ["%return", __e2]
  else
    return __e2
end
lower_set = function (args, hoist, stmt63, tail63)
  ____id21 = args
  __lh = has(____id21, 0)
  __rh = has(____id21, 1)
  __lh1 = lower(__lh, hoist)
  __rh1 = lower(__rh, hoist)
  add(hoist, ["%set", __lh1, __rh1])
  if _37not(_37and(stmt63, _37not(tail63))) then
    return __lh1
end
lower_if = function (args, hoist, stmt63, tail63)
  ____id22 = args
  __cond = has(____id22, 0)
  __then = has(____id22, 1)
  ___else = has(____id22, 2)
  if stmt63 then
    __e79 = ""
    if is63(___else) then
      __e79 = [lower_body([___else], tail63)]
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([__then], tail63)], __e79))
  else
    __e3 = unique("e")
    add(hoist, ["%local", __e3, "nil"])
    __e78 = ""
    if is63(___else) then
      __e78 = [lower(["%set", __e3, ___else])]
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, __then])], __e78))
    return __e3
end
lower_short = function (x, args, hoist)
  ____id23 = args
  __a4 = has(____id23, 0)
  __b4 = has(____id23, 1)
  __hoist1 = []
  __b11 = lower(__b4, __hoist1)
  if some63(__hoist1) then
    __id24 = unique("id")
    __e80 = ""
    if _37eq(x, "%and") then
      __e80 = ["%if", __id24, __b4, __id24]
    else
      __e80 = ["%if", __id24, __id24, __b4]
    return lower(["%do", ["%local", __id24, __a4], __e80], hoist)
  else
    return [x, lower(__a4, hoist), __b11]
end
lower_try = function (args, hoist, tail63)
  return add(hoist, ["%try", lower_body(args, tail63)])
end
lower_while = function (args, hoist)
  ____id25 = args
  __c4 = has(____id25, 0)
  __body6 = cut(____id25, 1)
  __pre1 = []
  __c5 = lower(__c4, __pre1)
  __e81 = ""
  if none63(__pre1) then
    __e81 = ["%while", __c5, lower_body(__body6)]
  else
    __e81 = ["%while", ON, join(["%do"], __pre1, [["%if", ["%not", __c5], ["%break"]], lower_body(__body6)])]
  return add(hoist, __e81)
end
lower_for = function (args, hoist)
  ____id26 = args
  __h = has(____id26, 0)
  __k15 = has(____id26, 1)
  __body7 = cut(____id26, 2)
  return add(hoist, join(["%for", lower(__h, hoist), __k15, lower_body(__body7)], props(__body7)))
end
lower_with = function (args, hoist, stmt63, tail63)
  ____id27 = args
  __h1 = has(____id27, 0)
  __body8 = cut(____id27, 1)
  if _37and(stmt63, _37not(tail63)) then
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body8, tail63)], props(__body8)))
  else
    __e4 = unique("e")
    add(hoist, ["%local", __e4])
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e4, join(["%do"], __body8)])], props(__body8)))
    return __e4
end
lower_block = function (args, hoist, stmt63, tail63)
  ____id28 = args
  __name4 = has(____id28, 0)
  __h2 = has(____id28, 1)
  __body9 = cut(____id28, 2)
  return add(hoist, ["%block", __name4, lower(__h2, hoist), lower_body(__body9, tail63)])
end
lower_from = function (args, hoist, stmt63, tail63)
  ____id29 = args
  __name5 = has(____id29, 0)
  __import_ = has(____id29, 1)
  __id30 = has(____id29, 2)
  __as_ = has(____id29, 3)
  __alias = has(____id29, 4)
  add(hoist, join(["from"], args))
  return _37or(__alias, __id30)
end
lower_import = function (__x159, hoist, stmt63, tail63)
  ____id31 = __x159
  __name6 = has(____id31, 0)
  __alias1 = cut(____id31, 1)
  __e82 = ""
  if _37eq(hd(__alias1), "as") then
    __e82 = __alias1[1]
  else
    __e82 = hd(__alias1)
  __as = __e82
  __id32 = _37or(__as, __name6)
  add(hoist, join(["import", __name6], __alias1))
  if _37not(stmt63) then
    return __id32
end
lower_function = function (args, hoist)
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    __f11 = unique("f")
    return lower(["%do", join(["%local-function", __f11], args), __f11], hoist)
  else
    ____id33 = args
    __a5 = has(____id33, 0)
    __body10 = cut(____id33, 1)
    return join(["%function", __a5, lower_body(__body10, ON)], props(__body10))
end
lower_definition = function (kind, args, hoist)
  ____id34 = args
  __name7 = has(____id34, 0)
  __args7 = has(____id34, 1)
  __body11 = cut(____id34, 2)
  return add(hoist, join([kind, __name7, __args7, lower_body(__body11, ON)], props(__body11)))
end
lower_call = function (form, hoist)
  __form2 = map(function (x)
    return lower(x, hoist)
  end, form)
  if some63(__form2) then
    return __form2
end
pairwise63 = function (form)
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"])
end
lower_pairwise = function (form)
  if pairwise63(form) then
    __e5 = []
    ____id35 = form
    __x166 = has(____id35, 0)
    __args8 = cut(____id35, 1)
    reduce(function (a, b)
      add(__e5, [__x166, a, b])
      return a
    end, __args8)
    return join(["%and"], reverse(__e5))
  else
    return form
end
lower_infix63 = function (form)
  return _37and(infix63(hd(form)), _35(form) > 3)
end
lower_infix = function (form, hoist)
  __form3 = lower_pairwise(form)
  ____id36 = __form3
  __x169 = has(____id36, 0)
  __args9 = cut(____id36, 1)
  return lower(reduce(function (a, b)
    return [__x169, b, a]
  end, reverse(__args9)), hoist)
end
lower_special = function (form, hoist)
  __e6 = lower_call(form, hoist)
  if __e6 then
    return add(hoist, __e6)
end
lower = function (form, hoist, stmt63, tail63)
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
          ____id37 = form
          __x172 = has(____id37, 0)
          __args10 = cut(____id37, 1)
          if _37eq(__x172, "%do") then
            return lower_do(__args10, hoist, stmt63, tail63)
          else
            if _37eq(__x172, "%call") then
              return lower(__args10, hoist, stmt63, tail63)
            else
              if _37eq(__x172, "%set") then
                return lower_set(__args10, hoist, stmt63, tail63)
              else
                if _37eq(__x172, "%if") then
                  return lower_if(__args10, hoist, stmt63, tail63)
                else
                  if _37eq(__x172, "%try") then
                    return lower_try(__args10, hoist, tail63)
                  else
                    if _37eq(__x172, "%while") then
                      return lower_while(__args10, hoist)
                    else
                      if _37eq(__x172, "%for") then
                        return lower_for(__args10, hoist)
                      else
                        if _37eq(__x172, "%with") then
                          return lower_with(__args10, hoist, stmt63, tail63)
                        else
                          if _37eq(__x172, "%block") then
                            return lower_block(__args10, hoist, stmt63, tail63)
                          else
                            if _37eq(__x172, "%cases") then
                              return lower_cases(__args10, hoist, stmt63, tail63)
                            else
                              if _37eq(__x172, "import") then
                                return lower_import(__args10, hoist, stmt63, tail63)
                              else
                                if _37eq(__x172, "from") then
                                  return lower_from(__args10, hoist, stmt63, tail63)
                                else
                                  if _37eq(__x172, "%function") then
                                    return lower_function(__args10, hoist)
                                  else
                                    if _37or(_37eq(__x172, "%local-function"), _37eq(__x172, "%global-function")) then
                                      return lower_definition(__x172, __args10, hoist)
                                    else
                                      if in63(__x172, ["%and", "%or"]) then
                                        return lower_short(__x172, __args10, hoist)
                                      else
                                        if statement63(__x172) then
                                          return lower_special(form, hoist)
                                        else
                                          return lower_call(form, hoist)
end
expand = function (form)
  return lower(macroexpand(form))
end
eval_result = function (globals, locals)
  return lumen_result
end
eval = function (form, globals, locals)
  __previous = has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value")
  setenv("target", {
    _stash: ON,
    toplevel: ON
  }).value = "cmake"
  __code = compile(expand(["%set", "lumen-result", form]))
  setenv("target", {
    _stash: ON,
    toplevel: ON
  }).value = __previous
  run(__code, globals, locals)
  return eval_result(globals, locals)
end
immediate_call63 = function (x)
  return _37and(_37not(atom63(x)), _37and(_37not(atom63(hd(x))), _37eq(hd(hd(x)), "%function")))
end
___37do__special = function (...)
  __forms2 = unstash([...])
  __s4 = ""
  ____x179 = __forms2
  ____i20 = 0
  while ____i20 < _35(____x179) do
    __x180 = ____x179[____i20]
    if _37and(_37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "lua"), _37and(immediate_call63(__x180), _37eq("\n", char(__s4, edge(__s4))))) then
      __s4 = _37cat(clip(__s4, 0, edge(__s4)), ";\n")
    __s4 = _37cat(__s4, compile(__x180, {
      _stash: ON,
      stmt: ON
    }))
    if _37not(atom63(__x180)) then
      if _37or(_37eq(hd(__x180), "%return"), _37eq(hd(__x180), "%break")) then
        break
    ____i20 = ____i20 + 1
  end
  return __s4
end
setenv("%do", {
  _stash: ON,
  special: ___37do__special,
  stmt: ON,
  tr: ON
})
___37if__special = function (cond, cons, alt)
  __cond2 = compile(cond)
  __cons1 = compile_body(cons)
  __e83 = ""
  if alt then
    __e83 = compile_body(alt)
  __alt1 = __e83
  __ind3 = indentation()
  __s6 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js") then
    __s6 = _37cat(__s6, _37cat(__ind3, _37cat("if (", _37cat(__cond2, _37cat(") {\n", _37cat(__cons1, _37cat(__ind3, "}")))))))
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py") then
      __s6 = _37cat(__s6, _37cat(__ind3, _37cat("if ", _37cat(__cond2, _37cat(":\n", __cons1)))))
    else
      __s6 = _37cat(__s6, _37cat(__ind3, _37cat("if ", _37cat(__cond2, _37cat(" then\n", __cons1)))))
  if _37and(__alt1, _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js")) then
    __s6 = _37cat(__s6, _37cat(" else {\n", _37cat(__alt1, _37cat(__ind3, "}"))))
  else
    if _37and(__alt1, _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py")) then
      __s6 = _37cat(__s6, _37cat(__ind3, _37cat("else:\n", __alt1)))
    else
      if __alt1 then
        __s6 = _37cat(__s6, _37cat(__ind3, _37cat("else\n", __alt1)))
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua") then
    return _37cat(__s6, _37cat(__ind3, "end\n"))
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "js") then
      return _37cat(__s6, "\n")
    else
      return __s6
end
setenv("%if", {
  _stash: ON,
  special: ___37if__special,
  stmt: ON,
  tr: ON
})
___37while__special = function (cond, form)
  __cond4 = compile(cond)
  __body13 = compile_body(form)
  __ind5 = indentation()
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js") then
    return _37cat(__ind5, _37cat("while (", _37cat(__cond4, _37cat(") {\n", _37cat(__body13, _37cat(__ind5, "}\n"))))))
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py") then
      return _37cat(__ind5, _37cat("while ", _37cat(__cond4, _37cat(":\n", __body13))))
    else
      return _37cat(__ind5, _37cat("while ", _37cat(__cond4, _37cat(" do\n", _37cat(__body13, _37cat(__ind5, "end\n"))))))
end
setenv("%while", {
  _stash: ON,
  special: ___37while__special,
  stmt: ON,
  tr: ON
})
___37for__special = function (t, k, form, ...)
  ____r119 = unstash([...])
  __t2 = destash33(t, ____r119)
  __k18 = destash33(k, ____r119)
  __form5 = destash33(form, ____r119)
  ____id39 = ____r119
  __async2 = has(____id39, "async")
  __t3 = compile(__t2)
  __k19 = compile(__k18)
  __ind7 = indentation()
  __body15 = compile_body(__form5)
  __e84 = ""
  if __async2 then
    __e84 = "async "
  else
    __e84 = ""
  __a7 = __e84
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua") then
    return _37cat(__ind7, _37cat("for ", _37cat(__k19, _37cat(" in next, ", _37cat(__t3, _37cat(" do\n", _37cat(__body15, _37cat(__ind7, "end\n"))))))))
  else
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py") then
      return _37cat(__ind7, _37cat(__a7, _37cat("for ", _37cat(__k19, _37cat(" in ", _37cat(__t3, _37cat(":\n", __body15)))))))
    else
      return _37cat(__ind7, _37cat("for (", _37cat(__k19, _37cat(" in ", _37cat(__t3, _37cat(") {\n", _37cat(__body15, _37cat(__ind7, "}\n"))))))))
end
setenv("%for", {
  _stash: ON,
  special: ___37for__special,
  stmt: ON,
  tr: ON
})
___37with__special = function (t, form, ...)
  ____r121 = unstash([...])
  __t6 = destash33(t, ____r121)
  __form7 = destash33(form, ____r121)
  ____id41 = ____r121
  __async4 = has(____id41, "async")
  __t7 = compile(__t6)
  __ind9 = indentation()
  __body17 = compile_body(__form7)
  __e85 = ""
  if __async4 then
    __e85 = "async "
  else
    __e85 = ""
  __a9 = __e85
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    return _37cat(__ind9, _37cat(__a9, _37cat("with ", _37cat(__t7, _37cat(":\n", __body17)))))
  else
    return ""
end
setenv("%with", {
  _stash: ON,
  special: ___37with__special,
  stmt: ON,
  tr: ON
})
___37block__special = function (name, t, form)
  __t9 = compile(t)
  __ind11 = indentation()
  __body19 = compile_body(form)
  __e86 = ""
  if some63(__t9) then
    __e86 = " "
  else
    __e86 = ""
  __sep1 = __e86
  __e87 = ""
  if some63(__t9) then
    __e87 = "("
  else
    __e87 = ""
  __lh2 = __e87
  __e88 = ""
  if some63(__t9) then
    __e88 = ")"
  else
    __e88 = ""
  __rh2 = __e88
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    return _37cat(__ind11, _37cat(name, _37cat(__sep1, _37cat(__t9, _37cat(":\n", __body19)))))
  else
    return _37cat(__ind11, _37cat(name, _37cat(__sep1, _37cat(__lh2, _37cat(__t9, _37cat(__rh2, _37cat(__sep1, _37cat("{\n", _37cat(__body19, _37cat(__ind11, "}\n"))))))))))
end
setenv("%block", {
  _stash: ON,
  special: ___37block__special,
  stmt: ON,
  tr: ON
})
___37try__special = function (form)
  __ind13 = indentation()
  __body21 = compile_body(form)
  __e89 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    __e89 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", OFF, ["%get", "e", 1], "e"]]]
  else
    __e89 = ["%return", ["%array", OFF, "e"]]
  __hf1 = __e89
  setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }).value = has(setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }), "value") + 1
  ____x206 = compile(__hf1, {
    _stash: ON,
    stmt: ON
  })
  setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }).value = has(setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }), "value") - 1
  __h4 = ____x206
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js") then
    return _37cat(__ind13, _37cat("try {\n", _37cat(__body21, _37cat(__ind13, _37cat("}\n", _37cat(__ind13, _37cat("catch (e) {\n", _37cat(__h4, _37cat(__ind13, "}\n")))))))))
  else
    return _37cat(__ind13, _37cat("try:\n", _37cat(__body21, _37cat(__ind13, _37cat("except:\n", __h4)))))
end
setenv("%try", {
  _stash: ON,
  special: ___37try__special,
  stmt: ON,
  tr: ON
})
___37delete__special = function (place)
  __e90 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    __e90 = "del "
  else
    __e90 = "delete "
  return _37cat(indentation(), _37cat(__e90, compile(place)))
end
setenv("%delete", {
  _stash: ON,
  special: ___37delete__special,
  stmt: ON
})
___37break__special = function ()
  return _37cat(indentation(), "break")
end
setenv("%break", {
  _stash: ON,
  special: ___37break__special,
  stmt: ON
})
___37function__special = function (args, ...)
  ____r131 = unstash([...])
  __args121 = destash33(args, ____r131)
  ____id43 = ____r131
  __body23 = cut(____id43, 0)
  return apply(compile_function, join([__args121], __body23, []))
end
setenv("%function", {
  _stash: ON,
  special: ___37function__special
})
___37global_function__special = function (name, args, ...)
  ____r133 = unstash([...])
  __name9 = destash33(name, ____r133)
  __args14 = destash33(args, ____r133)
  ____id45 = ____r133
  __body25 = cut(____id45, 0)
  if _37or(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua"), _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py")) then
    ____x221 = object([__args14])
    ____x221.name = __name9
    ____x222 = object([])
    ____x222.name = __name9
    __x220 = apply(compile_function, join(____x221, __body25, ____x222))
    return _37cat(indentation(), __x220)
  else
    return compile(["%set", __name9, join(["%function", __args14], __body25)], {
      _stash: ON,
      stmt: ON
    })
end
setenv("%global-function", {
  _stash: ON,
  special: ___37global_function__special,
  stmt: ON,
  tr: ON
})
___37local_function__special = function (name, args, ...)
  ____r135 = unstash([...])
  __name11 = destash33(name, ____r135)
  __args16 = destash33(args, ____r135)
  ____id47 = ____r135
  __body27 = cut(____id47, 0)
  if _37or(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua"), _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py")) then
    ____x233 = object([__args16])
    ____x233.name = __name11
    ____x233.prefix = "local"
    ____x234 = object([])
    ____x234.name = __name11
    ____x234.prefix = "local"
    __x232 = apply(compile_function, join(____x233, __body27, ____x234))
    return _37cat(indentation(), __x232)
  else
    return compile(["%local", __name11, join(["%function", __args16], __body27)], {
      _stash: ON,
      stmt: ON
    })
end
setenv("%local-function", {
  _stash: ON,
  special: ___37local_function__special,
  stmt: ON,
  tr: ON
})
___37return__special = function (x)
  __e91 = ""
  if nil63(x) then
    __e91 = "return"
  else
    __e91 = _37cat("return ", compile(x))
  __x238 = __e91
  return _37cat(indentation(), __x238)
end
setenv("%return", {
  _stash: ON,
  special: ___37return__special,
  stmt: ON
})
___37new__special = function (x)
  return _37cat("new ", compile(x))
end
setenv("%new", {
  _stash: ON,
  special: ___37new__special
})
___37typeof__special = function (x)
  return _37cat("typeof(", _37cat(compile(x), ")"))
end
setenv("%typeof", {
  _stash: ON,
  special: ___37typeof__special
})
___37error__special = function (x)
  __e92 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js") then
    __e92 = _37cat("throw ", compile(["%new", ["Error", x]]))
  else
    __e93 = ""
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py") then
      __e93 = _37cat("raise ", compile(["Exception", x]))
    else
      __e93 = _37cat("error(", _37cat(compile(x), ")"))
    __e92 = __e93
  __e19 = __e92
  return _37cat(indentation(), __e19)
end
setenv("%error", {
  _stash: ON,
  special: ___37error__special,
  stmt: ON
})
___37throw__special = function (x)
  __e94 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js") then
    __e94 = _37cat("throw ", compile(x))
  else
    __e95 = ""
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "py") then
      __e95 = _37cat("raise ", compile(x))
    else
      __e95 = _37cat("error(", _37cat(compile(x), ")"))
    __e94 = __e95
  __e23 = __e94
  return _37cat(indentation(), __e23)
end
setenv("%throw", {
  _stash: ON,
  special: ___37throw__special,
  stmt: ON
})
___37local__special = function (name, value)
  if _37and(nil63(value), _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py")) then
    value = "nil"
  __id49 = compile(name)
  __value11 = compile(value)
  __e96 = ""
  if is63(value) then
    __e96 = _37cat(" = ", __value11)
  else
    __e96 = ""
  __rh4 = __e96
  __e97 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "js") then
    __e97 = "var "
  else
    __e98 = ""
    if _37eq(has(setenv("target", {
      _stash: ON,
      toplevel: ON
    }), "value"), "lua") then
      __e98 = "local "
    else
      __e98 = ""
    __e97 = __e98
  __keyword1 = __e97
  __ind15 = indentation()
  return _37cat(__ind15, _37cat(__keyword1, _37cat(__id49, __rh4)))
end
setenv("%local", {
  _stash: ON,
  special: ___37local__special,
  stmt: ON
})
___37set__special = function (lh, rh)
  __lh4 = compile(lh)
  __e99 = ""
  if nil63(rh) then
    __e99 = "nil"
  else
    __e99 = rh
  __rh6 = compile(__e99)
  return _37cat(indentation(), _37cat(__lh4, _37cat(" = ", __rh6)))
end
setenv("%set", {
  _stash: ON,
  special: ___37set__special,
  stmt: ON
})
___37get__special = function (t, k)
  __t12 = compile(t)
  __k121 = compile(k)
  if _37or(_37and(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua"), _37eq(char(__t12, 0), "{")), infix_operator63(t)) then
    __t12 = _37cat("(", _37cat(__t12, ")"))
  if _37and(string_literal63(k), _37and(valid_id63(inner(k)), _37not(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py")))) then
    return _37cat(__t12, _37cat(".", inner(k)))
  else
    return _37cat(__t12, _37cat("[", _37cat(__k121, "]")))
end
setenv("%get", {
  _stash: ON,
  special: ___37get__special
})
___37idx__special = function (t, k)
  __t14 = compile(t)
  __k141 = compile(k, "raw")
  if _37or(_37and(_37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua"), _37eq(char(__t14, 0), "{")), infix_operator63(t)) then
    __t14 = _37cat("(", _37cat(__t14, ")"))
  return _37cat(__t14, _37cat(".", __k141))
end
setenv("%idx", {
  _stash: ON,
  special: ___37idx__special
})
___37array__special = function (...)
  __forms4 = unstash([...])
  __e100 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua") then
    __e100 = "{"
  else
    __e100 = "["
  __open1 = __e100
  __e101 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua") then
    __e101 = "}"
  else
    __e101 = "]"
  __close1 = __e101
  __s8 = ""
  __c7 = ""
  ____o11 = __forms4
  __k22 = ""
  for (__k22 in ____o11) {
    __v10 = ____o11[__k22]
    __e102 = ""
    if numeric63(__k22) then
      __e102 = parseInt(__k22)
    else
      __e102 = __k22
    __k23 = __e102
    if number63(__k23) then
      __s8 = _37cat(__s8, _37cat(__c7, compile(__v10)))
      __c7 = ", "
  }
  return _37cat(__open1, _37cat(__s8, __close1))
end
setenv("%array", {
  _stash: ON,
  special: ___37array__special
})
___37object__special = function (...)
  __forms6 = unstash([...])
  __s10 = "{"
  __c9 = ""
  __e103 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua") then
    __e103 = " = "
  else
    __e103 = ": "
  __sep3 = __e103
  setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }).value = has(setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }), "value") + 1
  ____x251 = indentation()
  setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }).value = has(setenv("indent-level", {
    _stash: ON,
    toplevel: ON
  }), "value") - 1
  __ind17 = ____x251
  __e104 = ""
  if _35(__forms6) > 2 then
    __e104 = _37cat("\n", __ind17)
  __pad1 = __e104
  __e105 = ""
  if is63(__pad1) then
    __e105 = _37cat("\n", indentation())
  else
    __e105 = ""
  __end1 = __e105
  __s10 = _37cat(__s10, either(__pad1, ""))
  ____o13 = pair(__forms6)
  __k27 = ""
  for (__k27 in ____o13) {
    __v13 = ____o13[__k27]
    __e106 = ""
    if numeric63(__k27) then
      __e106 = parseInt(__k27)
    else
      __e106 = __k27
    __k28 = __e106
    if number63(__k28) then
      ____id51 = __v13
      __k29 = has(____id51, 0)
      __v14 = has(____id51, 1)
      setenv("indent-level", {
        _stash: ON,
        toplevel: ON
      }).value = has(setenv("indent-level", {
        _stash: ON,
        toplevel: ON
      }), "value") + 1
      ____x252 = compile(__v14)
      setenv("indent-level", {
        _stash: ON,
        toplevel: ON
      }).value = has(setenv("indent-level", {
        _stash: ON,
        toplevel: ON
      }), "value") - 1
      __s10 = _37cat(__s10, _37cat(__c9, _37cat(key(__k29), _37cat(__sep3, ____x252))))
      __c9 = _37cat(",", either(__pad1, " "))
  }
  return _37cat(__s10, _37cat(__end1, "}"))
end
setenv("%object", {
  _stash: ON,
  special: ___37object__special
})
___37list__special = function (form, comps, cond, ...)
  ____r155 = unstash([...])
  __form9 = destash33(form, ____r155)
  __comps1 = destash33(comps, ____r155)
  __cond6 = destash33(cond, ____r155)
  ____id55 = ____r155
  __kind1 = has(____id55, "kind")
  __s12 = compile(__form9)
  __e107 = ""
  if _37eq(__kind1, "object") then
    __e107 = ["{", "}"]
  else
    __e107 = ["[", "]"]
  ____id56 = __e107
  __lh6 = has(____id56, 0)
  __rh8 = has(____id56, 1)
  if _37not(_37eq(__kind1, "object")) then
    __s12 = _37cat("(", _37cat(__s12, ")"))
  ____x260 = __comps1
  ____i26 = 0
  while ____i26 < _35(____x260) do
    ____id57 = ____x260[____i26]
    __k31 = has(____id57, 0)
    __v16 = has(____id57, 1)
    __s12 = _37cat(__s12, _37cat(" for ", _37cat(compile(__k31), _37cat(" in ", compile(__v16)))))
    ____i26 = ____i26 + 1
  end
  if is63(__cond6) then
    __s12 = _37cat(__s12, _37cat(" if ", compile(__cond6)))
  return _37cat(__lh6, _37cat(__s12, __rh8))
end
setenv("%list", {
  _stash: ON,
  special: ___37list__special
})
___37literal__special = function (...)
  __args18 = unstash([...])
  return apply(cat, map(compile, __args18))
end
setenv("%literal", {
  _stash: ON,
  special: ___37literal__special
})
__global__special = function (x)
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    return _37cat(indentation(), _37cat("global ", _37cat(compile(x), "\n")))
  else
    return ""
end
setenv("global", {
  _stash: ON,
  special: __global__special,
  stmt: ON,
  tr: ON
})
__import__special = function (name, ...)
  ____r159 = unstash([...])
  __name13 = destash33(name, ____r159)
  ____id60 = ____r159
  __alias3 = cut(____id60, 0)
  __ind19 = indentation()
  __e108 = ""
  if _37eq(hd(__alias3), "as") then
    __e108 = __alias3[1]
  else
    __e108 = hd(__alias3)
  __as2 = __e108
  __id61 = _37or(__as2, __name13)
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    __s14 = _37cat(__ind19, _37cat("import ", compile(__name13)))
    if __as2 then
      __s14 = _37cat(__s14, _37cat(" as ", compile(__id61)))
    return __s14
  else
    return _37cat(__ind19, compile(["%local", __id61, ["require", escape(__name13)]]))
end
setenv("import", {
  _stash: ON,
  special: __import__special,
  stmt: ON
})
__from__special = function (name, ...)
  ____r163 = unstash([...])
  __name15 = destash33(name, ____r163)
  ____id64 = ____r163
  __imports1 = cut(____id64, 0)
  __ind21 = indentation()
  __id65 = __name15
  __r164 = ""
  __r164 = drop(__imports1)
  __e109 = ""
  if _37eq(last(__imports1), "as") then
    __e109 = drop(__imports1)
  else
    add(__imports1, __r164)
    __r164 = ""
    __e109 = __r164
  __as4 = __r164
  __e110 = ""
  if _37eq(hd(__imports1), "import") then
    __e110 = tl(__imports1)
  else
    __e110 = __imports1
  __names3 = __e110
  __names4 = mapcat(function (x)
    if _37eq(x, "*") then
      return x
    else
      return compile(x)
  end, __names3, ", ")
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "py") then
    __s16 = _37cat(__ind21, _37cat("from ", _37cat(compile(__name15), _37cat(" import ", __names4))))
    if __as4 then
      __s16 = _37cat(__s16, _37cat(" as ", compile(__as4)))
    return __s16
  else
    return ""
end
setenv("from", {
  _stash: ON,
  special: __from__special,
  stmt: ON
})
___44__special = function (...)
  __args20 = unstash([...])
  if none63(__args20) then
    return ", "
  else
    if one63(__args20) then
      return _37cat(", ", compile(hd(__args20)))
    else
      return mapcat(compile, __args20, ", ")
end
setenv(",", {
  _stash: ON,
  special: ___44__special
})
__3458__special34 = function (...)
  __args22 = unstash([...])
  if none63(__args22) then
    return ":"
  else
    if one63(__args22) then
      return _37cat(":", compile(hd(__args22)))
    else
      return mapcat(compile, __args22, ":")
end
setenv(":", {
  _stash: ON,
  special: __3458__special34
})
___37as__special = function (form, id)
  return _37cat(compile(form), _37cat(" as ", compile(id)))
end
setenv("%as", {
  _stash: ON,
  special: ___37as__special
})
__yield__special = function (...)
  __args24 = unstash([...])
  return _37cat(indentation(), _37cat("yield ", mapcat(compile, __args24, ", ")))
end
setenv("yield", {
  _stash: ON,
  special: __yield__special,
  stmt: ON
})
__await__special = function (x)
  __e111 = ""
  if _37eq(has(setenv("target", {
    _stash: ON,
    toplevel: ON
  }), "value"), "lua") then
    __e111 = ""
  else
    __e111 = "await "
  __a11 = __e111
  return _37cat(__a11, compile(x))
end
setenv("await", {
  _stash: ON,
  special: __await__special
})
___37b__special = function (x)
  return _37cat("b", compile(x))
end
setenv("%b", {
  _stash: ON,
  special: ___37b__special
})
___37f__special = function (x)
  return _37cat("f", compile(x))
end
setenv("%f", {
  _stash: ON,
  special: ___37f__special
})
___37r__special = function (x)
  return _37cat("r", compile(x))
end
setenv("%r", {
  _stash: ON,
  special: ___37r__special
})
___64__special = function (x)
  return _37cat(indentation(), _37cat("@", compile(x)))
end
setenv("@", {
  _stash: ON,
  special: ___64__special,
  stmt: ON
})
