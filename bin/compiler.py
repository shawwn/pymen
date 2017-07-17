local reader = require("reader")
local getenv = function (k, p)
  if string63(k) then
    local __i = edge(environment)
    while __i >= 0 do
      local __b = environment[__i][k]
      if is63(__b) then
        local __e21
        if p then
          __e21 = __b[p]
        else
          __e21 = __b

        return __e21
      else
        __i = __i - 1

    end

end
local macro_function = function (k)
  return getenv(k, "macro")
end
local macro63 = function (k)
  return is63(macro_function(k))
end
local special63 = function (k)
  return is63(getenv(k, "special"))
end
local special_form63 = function (form)
  return _and(_not(atom63(form)), special63(hd(form)))
end
local statement63 = function (k)
  return _and(special63(k), getenv(k, "stmt"))
end
local symbol_expansion = function (k)
  return getenv(k, "symbol")
end
local symbol63 = function (k)
  return is63(symbol_expansion(k))
end
local variable63 = function (k)
  return is63(getenv(k, "variable"))
end
bound63 = function (x)
  return _or(macro63(x), special63(x))
end
quoted = function (form)
  if string63(form) then
    return escape(form)
  else
    if atom63(form) then
      return form
    else
      return join(["list"], map(quoted, form))


end
local literal = function (s)
  if string_literal63(s) then
    return s
  else
    return quoted(s)

end
local stash42 = function (args)
  if keys63(args) then
    local __l = ["%object", "\"_stash\"", true]
    local ____o = args
    local __k = undefined
    for (__k in ____o) {
      local __v = ____o[__k]
      local __e22
      if numeric63(__k) then
        __e22 = parseInt(__k)
      else
        __e22 = __k

      local __k1 = __e22
      if _not(number63(__k1)) then
        add(__l, literal(__k1))
        add(__l, __v)

    }
    return join(args, [__l])
  else
    return args

end
local bias = function (k)
  if _and(number63(k), _not(_61(target, "py"))) then
    if _61(target, "js") then
      k = k - 1
    else
      k = k + 1


  return k
end
bind = function (lh, rh)
  if atom63(lh) then
    return [lh, rh]
  else
    local __id = unique("id")
    local __bs = [__id, rh]
    local ____o1 = lh
    local __k2 = undefined
    for (__k2 in ____o1) {
      local __v1 = ____o1[__k2]
      local __e23
      if numeric63(__k2) then
        __e23 = parseInt(__k2)
      else
        __e23 = __k2

      local __k3 = __e23
      local __e24
      if _61(__k3, "rest") then
        __e24 = ["cut", __id, _35(lh)]
      else
        __e24 = ["get", __id, ["quote", bias(__k3)]]

      local __x5 = __e24
      if is63(__k3) then
        local __e25
        if _61(__v1, true) then
          __e25 = __k3
        else
          __e25 = __v1

        local __k4 = __e25
        __bs = join(__bs, bind(__k4, __x5))

    }
    return __bs

end
local __f2 = function (from)
  return [["get", ["get", ["get", "Array", ["quote", "prototype"]], ["quote", "slice"]], ["quote", "call"]], "arguments", from]
end
setenv("arguments%", {_stash: true, macro: __f2})
bind42 = function (args, body)
  local __args1 = []
  local rest = function ()
    __args1.rest = true
    if _61(target, "js") then
      return ["unstash", ["arguments%", _35(__args1)]]
    else
      return ["unstash", ["list", "|...|"]]

  end
  if atom63(args) then
    return [__args1, join(["let", [args, rest()]], body)]
  else
    local __bs1 = []
    local __r19 = unique("r")
    local ____o2 = args
    local __k5 = undefined
    for (__k5 in ____o2) {
      local __v2 = ____o2[__k5]
      local __e26
      if numeric63(__k5) then
        __e26 = parseInt(__k5)
      else
        __e26 = __k5

      local __k6 = __e26
      if number63(__k6) then
        if atom63(__v2) then
          add(__args1, __v2)
        else
          local __x30 = unique("x")
          add(__args1, __x30)
          __bs1 = join(__bs1, [__v2, __x30])


    }
    if keys63(args) then
      __bs1 = join(__bs1, [__r19, rest()])
      local __n3 = _35(__args1)
      local __i4 = 0
      while __i4 < __n3 do
        local __v3 = __args1[__i4]
        __bs1 = join(__bs1, [__v3, ["destash!", __v3, __r19]])
        __i4 = __i4 + 1
      end
      __bs1 = join(__bs1, [keys(args), __r19])

    return [__args1, join(["let", __bs1], body)]

end
local quoting63 = function (depth)
  return number63(depth)
end
local quasiquoting63 = function (depth)
  return _and(quoting63(depth), depth > 0)
end
local can_unquote63 = function (depth)
  return _and(quoting63(depth), _61(depth, 1))
end
local quasisplice63 = function (x, depth)
  return _and(can_unquote63(depth), _not(atom63(x)))
end
local expand_local = function (__x38)
  local ____id1 = __x38
  local __x39 = ____id1[1]
  local __name = ____id1[2]
  local __value = ____id1[3]
  setenv(__name, {_stash: true, variable: true})
  return ["%local", __name, macroexpand(__value)]
end
local expand_function = function (__x41)
  local ____id2 = __x41
  local __x42 = ____id2[1]
  local __args = ____id2[2]
  local __body = cut(____id2, 2)
  add(environment, {})
  local ____o3 = __args
  local ____i5 = undefined
  for (____i5 in ____o3) {
    local ____x43 = ____o3[____i5]
    local __e27
    if numeric63(____i5) then
      __e27 = parseInt(____i5)
    else
      __e27 = ____i5

    local ____i51 = __e27
    setenv(____x43, {_stash: true, variable: true})
  }
  local ____x44 = join(["%function", __args], macroexpand(__body))
  drop(environment)
  return ____x44
end
local expand_definition = function (__x46)
  local ____id3 = __x46
  local __x47 = ____id3[1]
  local __name1 = ____id3[2]
  local __args11 = ____id3[3]
  local __body1 = cut(____id3, 3)
  add(environment, {})
  local ____o4 = __args11
  local ____i6 = undefined
  for (____i6 in ____o4) {
    local ____x48 = ____o4[____i6]
    local __e28
    if numeric63(____i6) then
      __e28 = parseInt(____i6)
    else
      __e28 = ____i6

    local ____i61 = __e28
    setenv(____x48, {_stash: true, variable: true})
  }
  local ____x49 = join([__x47, __name1, __args11], macroexpand(__body1))
  drop(environment)
  return ____x49
end
local expand_macro = function (form)
  return macroexpand(expand1(form))
end
expand1 = function (__x51)
  local ____id4 = __x51
  local __name2 = ____id4[1]
  local __body2 = cut(____id4, 1)
  return apply(macro_function(__name2), __body2)
end
macroexpand = function (form)
  if symbol63(form) then
    return macroexpand(symbol_expansion(form))
  else
    if atom63(form) then
      return form
    else
      local __x52 = hd(form)
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







end
local quasiquote_list = function (form, depth)
  local __xs = [["list"]]
  local ____o5 = form
  local __k7 = undefined
  for (__k7 in ____o5) {
    local __v4 = ____o5[__k7]
    local __e29
    if numeric63(__k7) then
      __e29 = parseInt(__k7)
    else
      __e29 = __k7

    local __k8 = __e29
    if _not(number63(__k8)) then
      local __e30
      if quasisplice63(__v4, depth) then
        __e30 = quasiexpand(__v4[1])
      else
        __e30 = quasiexpand(__v4, depth)

      local __v5 = __e30
      last(__xs)[__k8] = __v5

  }
  local ____x55 = form
  local ____i8 = 0
  while ____i8 < _35(____x55) do
    local __x56 = ____x55[____i8]
    if quasisplice63(__x56, depth) then
      local __x57 = quasiexpand(__x56[1])
      add(__xs, __x57)
      add(__xs, ["list"])
    else
      add(last(__xs), quasiexpand(__x56, depth))

    ____i8 = ____i8 + 1
  end
  local __f3 = function (x)
    return _or(_35(x) > 1, _not(_61(hd(x), "list")))
  end
  local __pruned = keep(__f3, __xs)
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
          local __f4 = function (x)
            return quasiexpand(x, depth)
          end
          return map(__f4, form)




end
expand_if = function (__x61)
  local ____id5 = __x61
  local __a = ____id5[1]
  local __b1 = ____id5[2]
  local __c = cut(____id5, 2)
  if is63(__b1) then
    return [join(["%if", __a, __b1], expand_if(__c))]
  else
    if is63(__a) then
      return [__a]


end
indent_level = 0
indentation = function ()
  local __s = ""
  local __i9 = 0
  while __i9 < indent_level do
    __s = cat(__s, "  ")
    __i9 = __i9 + 1
  end
  return __s
end
local reserved = {["="]: true, ["=="]: true, ["+"]: true, ["-"]: true, ["%"]: true, ["*"]: true, ["/"]: true, ["<"]: true, [">"]: true, ["<="]: true, [">="]: true, ["break"]: true, ["case"]: true, ["catch"]: true, ["class"]: true, ["const"]: true, ["continue"]: true, ["debugger"]: true, ["default"]: true, ["delete"]: true, ["do"]: true, ["else"]: true, ["eval"]: true, ["finally"]: true, ["for"]: true, ["function"]: true, ["if"]: true, ["import"]: true, ["in"]: true, ["instanceof"]: true, ["let"]: true, ["new"]: true, ["return"]: true, ["switch"]: true, ["throw"]: true, ["try"]: true, ["typeof"]: true, ["var"]: true, ["void"]: true, ["with"]: true, ["and"]: true, ["end"]: true, ["load"]: true, ["repeat"]: true, ["while"]: true, ["false"]: true, ["local"]: true, ["nil"]: true, ["then"]: true, ["not"]: true, ["true"]: true, ["elseif"]: true, ["or"]: true, ["until"]: true}
reserved63 = function (x)
  return has63(reserved, x)
end
local valid_code63 = function (n)
  return _or(number_code63(n), _and(n > 64, n < 91))
end
local id = function (id)
  local __e31
  if number_code63(code(id, 0)) then
    __e31 = "_"
  else
    __e31 = ""

  local __id11 = __e31
  local __i10 = 0
  while __i10 < _35(id) do
    local __c1 = char(id, __i10)
    local __n7 = code(__c1)
    local __e32
    if _and(_61(__c1, "-"), _not(_61(id, "-"))) then
      __e32 = "_"
    else
      local __e33
      if valid_code63(__n7) then
        __e33 = __c1
      else
        local __e34
        if _61(__i10, 0) then
          __e34 = cat("_", __n7)
        else
          __e34 = __n7

        __e33 = __e34

      __e32 = __e33

    local __c11 = __e32
    __id11 = cat(__id11, __c11)
    __i10 = __i10 + 1
  end
  if reserved63(__id11) then
    return cat("_", __id11)
  else
    return __id11

end
valid_id63 = function (x)
  return _and(some63(x), _61(x, id(x)))
end
local __names = {}
unique = function (x)
  local __x65 = id(x)
  if __names[__x65] then
    local __i11 = __names[__x65]
    __names[__x65] = __names[__x65] + 1
    return unique(cat(__x65, __i11))
  else
    __names[__x65] = 1
    return cat("__", __x65)

end
key = function (k)
  local __i12 = inner(k)
  if valid_id63(__i12) then
    return __i12
  else
    if _61(target, "js") then
      return k
    else
      return cat("[", k, "]")


end
mapo = function (f, t)
  local __o6 = []
  local ____o7 = t
  local __k9 = undefined
  for (__k9 in ____o7) {
    local __v6 = ____o7[__k9]
    local __e35
    if numeric63(__k9) then
      __e35 = parseInt(__k9)
    else
      __e35 = __k9

    local __k10 = __e35
    local __x66 = f(__v6)
    if is63(__x66) then
      add(__o6, literal(__k10))
      add(__o6, __x66)

  }
  return __o6
end
local ____x68 = object([])
local ____x69 = object([])
____x69.js = "!"
____x69.lua = "not"
____x68["not"] = ____x69
local ____x70 = object([])
____x70["*"] = true
____x70["/"] = true
____x70["%"] = true
local ____x71 = object([])
local ____x72 = object([])
____x72.js = "+"
____x72.lua = ".."
____x71.cat = ____x72
local ____x73 = object([])
____x73["+"] = true
____x73["-"] = true
local ____x74 = object([])
____x74["<"] = true
____x74[">"] = true
____x74["<="] = true
____x74[">="] = true
local ____x75 = object([])
local ____x76 = object([])
____x76.js = "==="
____x76.lua = "=="
____x75["="] = ____x76
local ____x77 = object([])
local ____x78 = object([])
____x78.js = "&&"
____x78.lua = "and"
____x77["and"] = ____x78
local ____x79 = object([])
local ____x80 = object([])
____x80.js = "||"
____x80.lua = "or"
____x79["or"] = ____x80
local infix = [____x68, ____x70, ____x71, ____x73, ____x74, ____x75, ____x77, ____x79]
local unary63 = function (form)
  return _and(two63(form), in63(hd(form), ["not", "-"]))
end
local index = function (k)
end
local precedence = function (form)
  if _not(_or(atom63(form), unary63(form))) then
    local ____o8 = infix
    local __k11 = undefined
    for (__k11 in ____o8) {
      local __v7 = ____o8[__k11]
      local __e36
      if numeric63(__k11) then
        __e36 = parseInt(__k11)
      else
        __e36 = __k11

      local __k12 = __e36
      if __v7[hd(form)] then
        return index(__k12)

    }

  return 0
end
local getop = function (op)
  local __f5 = function (level)
    local __x82 = level[op]
    if _61(__x82, true) then
      return op
    else
      if is63(__x82) then
        return __x82[target]


  end
  return find(__f5, infix)
end
local infix63 = function (x)
  return is63(getop(x))
end
infix_operator63 = function (x)
  return _and(obj63(x), infix63(hd(x)))
end
local compile_args = function (args)
  local __s1 = "("
  local __c2 = ""
  local ____x83 = args
  local ____i15 = 0
  while ____i15 < _35(____x83) do
    local __x84 = ____x83[____i15]
    __s1 = cat(__s1, __c2, compile(__x84))
    __c2 = ", "
    ____i15 = ____i15 + 1
  end
  return cat(__s1, ")")
end
local escape_newlines = function (s)
  local __s11 = ""
  local __i16 = 0
  while __i16 < _35(s) do
    local __c3 = char(s, __i16)
    local __e37
    if _61(__c3, "\n") then
      __e37 = "\\n"
    else
      local __e38
      if _61(__c3, "\r") then
        __e38 = "\\r"
      else
        __e38 = __c3

      __e37 = __e38

    __s11 = cat(__s11, __e37)
    __i16 = __i16 + 1
  end
  return __s11
end
local compile_atom = function (x)
  if _and(_61(x, "nil"), _61(target, "lua")) then
    return x
  else
    if _61(x, "nil") then
      return "undefined"
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
              if x then
                return "true"
              else
                return "false"

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










end
local terminator = function (stmt63)
  if _not(stmt63) then
    return ""
  else
    if _61(target, "js") then
      return ";\n"
    else
      return "\n"


end
local compile_special = function (form, stmt63)
  local ____id6 = form
  local __x85 = ____id6[1]
  local __args2 = cut(____id6, 1)
  local ____id7 = getenv(__x85)
  local __special = ____id7.special
  local __stmt = ____id7.stmt
  local __self_tr63 = ____id7.tr
  local __tr = terminator(_and(stmt63, _not(__self_tr63)))
  return cat(apply(__special, __args2), __tr)
end
local parenthesize_call63 = function (x)
  return _or(_and(_not(atom63(x)), _61(hd(x), "%function")), precedence(x) > 0)
end
local compile_call = function (form)
  local __f = hd(form)
  local __f1 = compile(__f)
  local __args3 = compile_args(stash42(tl(form)))
  if parenthesize_call63(__f) then
    return cat("(", __f1, ")", __args3)
  else
    return cat(__f1, __args3)

end
local op_delims = function (parent, child)
  local ____r57 = unstash([...])
  local __parent = destash33(parent, ____r57)
  local __child = destash33(child, ____r57)
  local ____id8 = ____r57
  local __right = ____id8.right
  local __e39
  if __right then
    __e39 = _6261
  else
    __e39 = _62

  if __e39(precedence(__child), precedence(__parent)) then
    return ["(", ")"]
  else
    return ["", ""]

end
local compile_infix = function (form)
  local ____id9 = form
  local __op = ____id9[1]
  local ____id10 = cut(____id9, 1)
  local __a1 = ____id10[1]
  local __b2 = ____id10[2]
  local ____id111 = op_delims(form, __a1)
  local __ao = ____id111[1]
  local __ac = ____id111[2]
  local ____id12 = op_delims(form, __b2, {_stash: true, right: true})
  local __bo = ____id12[1]
  local __bc = ____id12[2]
  local __a2 = compile(__a1)
  local __b3 = compile(__b2)
  local __op1 = getop(__op)
  if unary63(form) then
    return cat(__op1, __ao, " ", __a2, __ac)
  else
    return cat(__ao, __a2, __ac, " ", __op1, " ", __bo, __b3, __bc)

end
compile_function = function (args, body)
  local ____r59 = unstash([...])
  local __args4 = destash33(args, ____r59)
  local __body3 = destash33(body, ____r59)
  local ____id13 = ____r59
  local __name3 = ____id13.name
  local __prefix = ____id13.prefix
  local __e40
  if __name3 then
    __e40 = compile(__name3)
  else
    __e40 = ""

  local __id14 = __e40
  local __e41
  if _and(_61(target, "lua"), __args4.rest) then
    __e41 = join(__args4, ["|...|"])
  else
    __e41 = __args4

  local __args12 = __e41
  local __args5 = compile_args(__args12)
  indent_level = indent_level + 1
  local ____x91 = compile(__body3, {_stash: true, stmt: true})
  indent_level = indent_level - 1
  local __body4 = ____x91
  local __ind = indentation()
  local __e42
  if __prefix then
    __e42 = cat(__prefix, " ")
  else
    __e42 = ""

  local __p = __e42
  local __e43
  if _61(target, "js") then
    __e43 = ""
  else
    __e43 = "end"

  local __tr1 = __e43
  if __name3 then
    __tr1 = cat(__tr1, "\n")

  if _61(target, "js") then
    return cat("function ", __id14, __args5, " {\n", __body4, __ind, "}", __tr1)
  else
    return cat(__p, "function ", __id14, __args5, "\n", __body4, __ind, __tr1)

end
local can_return63 = function (form)
  return _and(is63(form), _or(atom63(form), _and(_not(_61(hd(form), "return")), _not(statement63(hd(form))))))
end
compile = function (form)
  local ____r61 = unstash([...])
  local __form = destash33(form, ____r61)
  local ____id15 = ____r61
  local __stmt1 = ____id15.stmt
  if nil63(__form) then
    return ""
  else
    if special_form63(__form) then
      return compile_special(__form, __stmt1)
    else
      local __tr2 = terminator(__stmt1)
      local __e44
      if __stmt1 then
        __e44 = indentation()
      else
        __e44 = ""

      local __ind1 = __e44
      local __e45
      if atom63(__form) then
        __e45 = compile_atom(__form)
      else
        local __e46
        if infix63(hd(__form)) then
          __e46 = compile_infix(__form)
        else
          __e46 = compile_call(__form)

        __e45 = __e46

      local __form1 = __e45
      return cat(__ind1, __form1, __tr2)


end
local lower_statement = function (form, tail63)
  local __hoist = []
  local __e = lower(form, __hoist, true, tail63)
  local __e47
  if _and(some63(__hoist), is63(__e)) then
    __e47 = join(["do"], __hoist, [__e])
  else
    local __e48
    if is63(__e) then
      __e48 = __e
    else
      local __e49
      if _35(__hoist) > 1 then
        __e49 = join(["do"], __hoist)
      else
        __e49 = hd(__hoist)

      __e48 = __e49

    __e47 = __e48

  return either(__e47, ["do"])
end
local lower_body = function (body, tail63)
  return lower_statement(join(["do"], body), tail63)
end
local literal63 = function (form)
  return _or(atom63(form), _61(hd(form), "%array"))
end
local standalone63 = function (form)
  return _or(_and(_not(atom63(form)), _not(infix63(hd(form)))), id_literal63(form))
end
local lower_do = function (args, hoist, stmt63, tail63)
  local ____x98 = almost(args)
  local ____i17 = 0
  while ____i17 < _35(____x98) do
    local __x99 = ____x98[____i17]
    local ____y = lower(__x99, hoist, stmt63)
    if yes(____y) then
      local __e1 = ____y
      if standalone63(__e1) then
        add(hoist, __e1)


    ____i17 = ____i17 + 1
  end
  local __e2 = lower(last(args), hoist, stmt63, tail63)
  if _and(tail63, can_return63(__e2)) then
    return ["return", __e2]
  else
    return __e2

end
local lower_set = function (args, hoist, stmt63, tail63)
  local ____id16 = args
  local __lh = ____id16[1]
  local __rh = ____id16[2]
  add(hoist, ["%set", lower(__lh, hoist), lower(__rh, hoist)])
  if _not(_and(stmt63, _not(tail63))) then
    return __lh

end
local lower_if = function (args, hoist, stmt63, tail63)
  local ____id17 = args
  local __cond = ____id17[1]
  local ___then = ____id17[2]
  local ___else = ____id17[3]
  if stmt63 then
    local __e51
    if is63(___else) then
      __e51 = [lower_body([___else], tail63)]

    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([___then], tail63)], __e51))
  else
    local __e3 = unique("e")
    add(hoist, ["%local", __e3])
    local __e50
    if is63(___else) then
      __e50 = [lower(["%set", __e3, ___else])]

    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, ___then])], __e50))
    return __e3

end
local lower_short = function (x, args, hoist)
  local ____id18 = args
  local __a3 = ____id18[1]
  local __b4 = ____id18[2]
  local __hoist1 = []
  local __b11 = lower(__b4, __hoist1)
  if some63(__hoist1) then
    local __id19 = unique("id")
    local __e52
    if _61(x, "and") then
      __e52 = ["%if", __id19, __b4, __id19]
    else
      __e52 = ["%if", __id19, __id19, __b4]

    return lower(["do", ["%local", __id19, __a3], __e52], hoist)
  else
    return [x, lower(__a3, hoist), __b11]

end
local lower_try = function (args, hoist, tail63)
  return add(hoist, ["%try", lower_body(args, tail63)])
end
local lower_while = function (args, hoist)
  local ____id20 = args
  local __c4 = ____id20[1]
  local __body5 = cut(____id20, 1)
  local __pre = []
  local __c5 = lower(__c4, __pre)
  local __e53
  if none63(__pre) then
    __e53 = ["while", __c5, lower_body(__body5)]
  else
    __e53 = ["while", true, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lower_body(__body5)])]

  return add(hoist, __e53)
end
local lower_for = function (args, hoist)
  local ____id21 = args
  local __t = ____id21[1]
  local __k13 = ____id21[2]
  local __body6 = cut(____id21, 2)
  return add(hoist, ["%for", lower(__t, hoist), __k13, lower_body(__body6)])
end
local lower_function = function (args, hoist)
  if _61(target, "py") then
    local __f11 = unique("f")
    return lower(["do", join(["%local-function", __f11], args), __f11], hoist)
  else
    local ____id22 = args
    local __a4 = ____id22[1]
    local __body7 = cut(____id22, 1)
    return ["%function", __a4, lower_body(__body7, true)]

end
local lower_definition = function (kind, args, hoist)
  local ____id23 = args
  local __name4 = ____id23[1]
  local __args6 = ____id23[2]
  local __body8 = cut(____id23, 2)
  return add(hoist, [kind, __name4, __args6, lower_body(__body8, true)])
end
local lower_call = function (form, hoist)
  local __f6 = function (x)
    return lower(x, hoist)
  end
  local __form2 = map(__f6, form)
  if some63(__form2) then
    return __form2

end
local pairwise63 = function (form)
  return in63(hd(form), ["<", "<=", "=", ">=", ">"])
end
local lower_pairwise = function (form)
  if pairwise63(form) then
    local __e4 = []
    local ____id24 = form
    local __x130 = ____id24[1]
    local __args7 = cut(____id24, 1)
    local __f7 = function (a, b)
      add(__e4, [__x130, a, b])
      return a
    end
    reduce(__f7, __args7)
    return join(["and"], reverse(__e4))
  else
    return form

end
local lower_infix63 = function (form)
  return _and(infix63(hd(form)), _35(form) > 3)
end
local lower_infix = function (form, hoist)
  local __form3 = lower_pairwise(form)
  local ____id25 = __form3
  local __x133 = ____id25[1]
  local __args8 = cut(____id25, 1)
  local __f8 = function (a, b)
    return [__x133, b, a]
  end
  return lower(reduce(__f8, reverse(__args8)), hoist)
end
local lower_special = function (form, hoist)
  local __e5 = lower_call(form, hoist)
  if __e5 then
    return add(hoist, __e5)

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
          local ____id26 = form
          local __x136 = ____id26[1]
          local __args9 = cut(____id26, 1)
          if _61(__x136, "do") then
            return lower_do(__args9, hoist, stmt63, tail63)
          else
            if _61(__x136, "%set") then
              return lower_set(__args9, hoist, stmt63, tail63)
            else
              if _61(__x136, "%if") then
                return lower_if(__args9, hoist, stmt63, tail63)
              else
                if _61(__x136, "%try") then
                  return lower_try(__args9, hoist, tail63)
                else
                  if _61(__x136, "while") then
                    return lower_while(__args9, hoist)
                  else
                    if _61(__x136, "%for") then
                      return lower_for(__args9, hoist)
                    else
                      if _61(__x136, "%function") then
                        return lower_function(__args9, hoist)
                      else
                        if _or(_61(__x136, "%local-function"), _61(__x136, "%global-function")) then
                          return lower_definition(__x136, __args9, hoist)
                        else
                          if in63(__x136, ["and", "or"]) then
                            return lower_short(__x136, __args9, hoist)
                          else
                            if statement63(__x136) then
                              return lower_special(form, hoist)
                            else
                              return lower_call(form, hoist)














end
expand = function (form)
  return lower(macroexpand(form))
end
_37result = undefined
_eval = function (form)
  local __previous = target
  target = "py"
  local __code = compile(expand(["set", "%result", form]))
  target = __previous
  run(__code)
  return _37result
end
immediate_call63 = function (x)
  return _and(obj63(x), obj63(hd(x)))
end
local __f9 = function ()
  local __forms1 = unstash([...])
  local __s3 = ""
  local ____x142 = __forms1
  local ____i19 = 0
  while ____i19 < _35(____x142) do
    local __x143 = ____x142[____i19]
    if _and(_61(target, "lua"), immediate_call63(__x143)) then
      __s3 = cat(clip(__s3, 0, edge(__s3)), ";\n")

    __s3 = cat(__s3, compile(__x143, {_stash: true, stmt: true}))
    if _not(atom63(__x143)) then
      if _or(_61(hd(__x143), "return"), _61(hd(__x143), "break")) then
        break


    ____i19 = ____i19 + 1
  end
  return __s3
end
setenv("do", {_stash: true, special: __f9, stmt: true, tr: true})
local __f10 = function (cond, cons, alt)
  local __cond2 = compile(cond)
  indent_level = indent_level + 1
  local ____x146 = compile(cons, {_stash: true, stmt: true})
  indent_level = indent_level - 1
  local __cons1 = ____x146
  local __e54
  if alt then
    indent_level = indent_level + 1
    local ____x147 = compile(alt, {_stash: true, stmt: true})
    indent_level = indent_level - 1
    __e54 = ____x147

  local __alt1 = __e54
  local __ind3 = indentation()
  local __s5 = ""
  if _61(target, "js") then
    __s5 = cat(__s5, __ind3, "if (", __cond2, ") {\n", __cons1, __ind3, "}")
  else
    __s5 = cat(__s5, __ind3, "if ", __cond2, " then\n", __cons1)

  if _and(__alt1, _61(target, "js")) then
    __s5 = cat(__s5, " else {\n", __alt1, __ind3, "}")
  else
    if __alt1 then
      __s5 = cat(__s5, __ind3, "else\n", __alt1)


  if _61(target, "lua") then
    return cat(__s5, __ind3, "end\n")
  else
    return cat(__s5, "\n")

end
setenv("%if", {_stash: true, special: __f10, stmt: true, tr: true})
local __f111 = function (cond, form)
  local __cond4 = compile(cond)
  indent_level = indent_level + 1
  local ____x149 = compile(form, {_stash: true, stmt: true})
  indent_level = indent_level - 1
  local __body10 = ____x149
  local __ind5 = indentation()
  if _61(target, "js") then
    return cat(__ind5, "while (", __cond4, ") {\n", __body10, __ind5, "}\n")
  else
    return cat(__ind5, "while ", __cond4, " do\n", __body10, __ind5, "end\n")

end
setenv("while", {_stash: true, special: __f111, stmt: true, tr: true})
local __f12 = function (t, k, form)
  local __t2 = compile(t)
  local __ind7 = indentation()
  indent_level = indent_level + 1
  local ____x151 = compile(form, {_stash: true, stmt: true})
  indent_level = indent_level - 1
  local __body12 = ____x151
  if _61(target, "lua") then
    return cat(__ind7, "for ", k, " in next, ", __t2, " do\n", __body12, __ind7, "end\n")
  else
    return cat(__ind7, "for (", k, " in ", __t2, ") {\n", __body12, __ind7, "}\n")

end
setenv("%for", {_stash: true, special: __f12, stmt: true, tr: true})
local __f13 = function (form)
  local __e8 = unique("e")
  local __ind9 = indentation()
  indent_level = indent_level + 1
  local ____x156 = compile(form, {_stash: true, stmt: true})
  indent_level = indent_level - 1
  local __body14 = ____x156
  local __hf1 = ["return", ["%array", false, __e8]]
  indent_level = indent_level + 1
  local ____x159 = compile(__hf1, {_stash: true, stmt: true})
  indent_level = indent_level - 1
  local __h1 = ____x159
  return cat(__ind9, "try {\n", __body14, __ind9, "}\n", __ind9, "catch (", __e8, ") {\n", __h1, __ind9, "}\n")
end
setenv("%try", {_stash: true, special: __f13, stmt: true, tr: true})
local __f14 = function (place)
  return cat(indentation(), "delete ", compile(place))
end
setenv("%delete", {_stash: true, special: __f14, stmt: true})
local __f15 = function ()
  return cat(indentation(), "break")
end
setenv("break", {_stash: true, special: __f15, stmt: true})
local __f16 = function (args, body)
  return compile_function(args, body)
end
setenv("%function", {_stash: true, special: __f16})
local __f17 = function (name, args, body)
  if _61(target, "lua") then
    local __x163 = compile_function(args, body, {_stash: true, name: name})
    return cat(indentation(), __x163)
  else
    return compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true})

end
setenv("%global-function", {_stash: true, special: __f17, stmt: true, tr: true})
local __f18 = function (name, args, body)
  if _61(target, "lua") then
    local __x169 = compile_function(args, body, {_stash: true, name: name, prefix: "local"})
    return cat(indentation(), __x169)
  else
    return compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true})

end
setenv("%local-function", {_stash: true, special: __f18, stmt: true, tr: true})
local __f19 = function (x)
  local __e55
  if nil63(x) then
    __e55 = "return"
  else
    __e55 = cat("return ", compile(x))

  local __x173 = __e55
  return cat(indentation(), __x173)
end
setenv("return", {_stash: true, special: __f19, stmt: true})
local __f20 = function (x)
  return cat("new ", compile(x))
end
setenv("new", {_stash: true, special: __f20})
local __f21 = function (x)
  return cat("typeof(", compile(x), ")")
end
setenv("typeof", {_stash: true, special: __f21})
local __f22 = function (x)
  local __e56
  if _61(target, "js") then
    __e56 = cat("throw ", compile(["new", ["Error", x]]))
  else
    __e56 = cat("error(", compile(x), ")")

  local __e12 = __e56
  return cat(indentation(), __e12)
end
setenv("error", {_stash: true, special: __f22, stmt: true})
local __f23 = function (name, value)
  local __id28 = compile(name)
  local __value11 = compile(value)
  local __e57
  if is63(value) then
    __e57 = cat(" = ", __value11)
  else
    __e57 = ""

  local __rh2 = __e57
  local __e58
  if _61(target, "js") then
    __e58 = "var "
  else
    __e58 = "local "

  local __keyword1 = __e58
  local __ind11 = indentation()
  return cat(__ind11, __keyword1, __id28, __rh2)
end
setenv("%local", {_stash: true, special: __f23, stmt: true})
local __f24 = function (lh, rh)
  local __lh2 = compile(lh)
  local __e59
  if nil63(rh) then
    __e59 = "nil"
  else
    __e59 = rh

  local __rh4 = compile(__e59)
  return cat(indentation(), __lh2, " = ", __rh4)
end
setenv("%set", {_stash: true, special: __f24, stmt: true})
local __f25 = function (t, k)
  local __t12 = compile(t)
  local __k121 = compile(k)
  if _or(_and(_61(target, "lua"), _61(char(__t12, 0), "{")), infix_operator63(t)) then
    __t12 = cat("(", __t12, ")")

  if _and(string_literal63(k), valid_id63(inner(k))) then
    return cat(__t12, ".", inner(k))
  else
    return cat(__t12, "[", __k121, "]")

end
setenv("get", {_stash: true, special: __f25})
local __f26 = function ()
  local __forms3 = unstash([...])
  local __e60
  if _61(target, "lua") then
    __e60 = "{"
  else
    __e60 = "["

  local __open1 = __e60
  local __e61
  if _61(target, "lua") then
    __e61 = "}"
  else
    __e61 = "]"

  local __close1 = __e61
  local __s7 = ""
  local __c7 = ""
  local ____o10 = __forms3
  local __k16 = undefined
  for (__k16 in ____o10) {
    local __v9 = ____o10[__k16]
    local __e62
    if numeric63(__k16) then
      __e62 = parseInt(__k16)
    else
      __e62 = __k16

    local __k17 = __e62
    if number63(__k17) then
      __s7 = cat(__s7, __c7, compile(__v9))
      __c7 = ", "

  }
  return cat(__open1, __s7, __close1)
end
setenv("%array", {_stash: true, special: __f26})
local __f27 = function ()
  local __forms5 = unstash([...])
  local __s9 = "{"
  local __c9 = ""
  local __e63
  if _61(target, "lua") then
    __e63 = " = "
  else
    __e63 = ": "

  local __sep1 = __e63
  local ____o12 = pair(__forms5)
  local __k21 = undefined
  for (__k21 in ____o12) {
    local __v12 = ____o12[__k21]
    local __e64
    if numeric63(__k21) then
      __e64 = parseInt(__k21)
    else
      __e64 = __k21

    local __k22 = __e64
    if number63(__k22) then
      local ____id30 = __v12
      local __k23 = ____id30[1]
      local __v13 = ____id30[2]
      if _not(string63(__k23)) then
        error(cat("Illegal key: ", str(__k23)))

      __s9 = cat(__s9, __c9, key(__k23), __sep1, compile(__v13))
      __c9 = ", "

  }
  return cat(__s9, "}")
end
setenv("%object", {_stash: true, special: __f27})
local __f28 = function ()
  local __args111 = unstash([...])
  return apply(cat, map(compile, __args111))
end
setenv("%literal", {_stash: true, special: __f28})
return {run: run, ["eval"]: _eval, expand: expand, compile: compile}
