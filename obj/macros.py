setenv("quote", {_stash: true, macro: function (form)
  return quoted(form)
end})
setenv("quasiquote", {_stash: true, macro: function (form)
  return quasiexpand(form, 1)
end})
setenv("set", {_stash: true, macro: function ()
  local __args1 = unstash([...])
  return join(["do"], map(function (__x5)
    local ____id1 = __x5
    local __lh1 = ____id1[1]
    local __rh1 = ____id1[2]
    return ["%set", __lh1, __rh1]
  end, pair(__args1)))
end})
setenv("at", {_stash: true, macro: function (l, i)
  if _and(_61(target, "lua"), number63(i)) then
    i = i + 1
  else
    if _61(target, "lua") then
      i = ["+", i, 1]


  return ["get", l, i]
end})
setenv("wipe", {_stash: true, macro: function (place)
  if _61(target, "lua") then
    return ["set", place, "nil"]
  else
    return ["%delete", place]

end})
setenv("list", {_stash: true, macro: function ()
  local __body1 = unstash([...])
  local __x25 = unique("x")
  local __l1 = []
  local __forms1 = []
  local ____o1 = __body1
  local __k2 = undefined
  for (__k2 in ____o1) {
    local __v1 = ____o1[__k2]
    local __e8
    if numeric63(__k2) then
      __e8 = parseInt(__k2)
    else
      __e8 = __k2

    local __k3 = __e8
    if number63(__k3) then
      __l1[__k3] = __v1
    else
      add(__forms1, ["set", ["get", __x25, ["quote", __k3]], __v1])

  }
  if some63(__forms1) then
    return join(["let", __x25, ["object", join(["%array"], __l1)]], __forms1, [__x25])
  else
    return join(["%array"], __l1)

end})
setenv("if", {_stash: true, macro: function ()
  local __branches1 = unstash([...])
  return hd(expand_if(__branches1))
end})
setenv("case", {_stash: true, macro: function (expr)
  local ____r13 = unstash([...])
  local __expr1 = destash33(expr, ____r13)
  local ____id4 = ____r13
  local __clauses1 = cut(____id4, 0)
  local __x47 = unique("x")
  local __eq1 = function (_)
    return ["=", ["quote", _], __x47]
  end
  local __cl1 = function (__x50)
    local ____id5 = __x50
    local __a1 = ____id5[1]
    local __b1 = ____id5[2]
    if nil63(__b1) then
      return [__a1]
    else
      if _or(string63(__a1), number63(__a1)) then
        return [__eq1(__a1), __b1]
      else
        if one63(__a1) then
          return [__eq1(hd(__a1)), __b1]
        else
          if _35(__a1) > 1 then
            return [join(["or"], map(__eq1, __a1)), __b1]




  end
  return ["let", __x47, __expr1, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]
end})
setenv("when", {_stash: true, macro: function (cond)
  local ____r17 = unstash([...])
  local __cond1 = destash33(cond, ____r17)
  local ____id7 = ____r17
  local __body3 = cut(____id7, 0)
  return ["if", __cond1, join(["do"], __body3)]
end})
setenv("unless", {_stash: true, macro: function (cond)
  local ____r19 = unstash([...])
  local __cond3 = destash33(cond, ____r19)
  local ____id9 = ____r19
  local __body5 = cut(____id9, 0)
  return ["if", ["not", __cond3], join(["do"], __body5)]
end})
setenv("obj", {_stash: true, macro: function ()
  local __body7 = unstash([...])
  return join(["%object"], mapo(function (x)
    return x
  end, __body7))
end})
setenv("let", {_stash: true, macro: function (bs)
  local ____r23 = unstash([...])
  local __bs11 = destash33(bs, ____r23)
  local ____id14 = ____r23
  local __body9 = cut(____id14, 0)
  if atom63(__bs11) then
    return join(["let", [__bs11, hd(__body9)]], tl(__body9))
  else
    if none63(__bs11) then
      return join(["do"], __body9)
    else
      local ____id15 = __bs11
      local __lh3 = ____id15[1]
      local __rh3 = ____id15[2]
      local __bs21 = cut(____id15, 2)
      local ____id16 = bind(__lh3, __rh3)
      local __id17 = ____id16[1]
      local __val1 = ____id16[2]
      local __bs12 = cut(____id16, 2)
      local __renames1 = []
      if _not(id_literal63(__id17)) then
        local __id121 = unique(__id17)
        __renames1 = [__id17, __id121]
        __id17 = __id121

      return ["do", ["%local", __id17, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body9)]]


end})
setenv("with", {_stash: true, macro: function (x, v)
  local ____r25 = unstash([...])
  local __x95 = destash33(x, ____r25)
  local __v3 = destash33(v, ____r25)
  local ____id19 = ____r25
  local __body11 = cut(____id19, 0)
  return join(["let", [__x95, __v3]], __body11, [__x95])
end})
setenv("let-when", {_stash: true, macro: function (x, v)
  local ____r27 = unstash([...])
  local __x106 = destash33(x, ____r27)
  local __v5 = destash33(v, ____r27)
  local ____id21 = ____r27
  local __body13 = cut(____id21, 0)
  local __y1 = unique("y")
  return ["let", __y1, __v5, ["when", ["yes", __y1], join(["let", [__x106, __y1]], __body13)]]
end})
setenv("define-macro", {_stash: true, macro: function (name, args)
  local ____r29 = unstash([...])
  local __name1 = destash33(name, ____r29)
  local __args3 = destash33(args, ____r29)
  local ____id23 = ____r29
  local __body15 = cut(____id23, 0)
  local ____x116 = object(["setenv", ["quote", __name1]])
  ____x116.macro = join(["fn", __args3], __body15)
  local __form1 = ____x116
  _eval(__form1)
  return __form1
end})
setenv("define-special", {_stash: true, macro: function (name, args)
  local ____r31 = unstash([...])
  local __name3 = destash33(name, ____r31)
  local __args5 = destash33(args, ____r31)
  local ____id25 = ____r31
  local __body17 = cut(____id25, 0)
  local ____x123 = object(["setenv", ["quote", __name3]])
  ____x123.special = join(["fn", __args5], __body17)
  local __form3 = join(____x123, keys(__body17))
  _eval(__form3)
  return __form3
end})
setenv("define-symbol", {_stash: true, macro: function (name, expansion)
  setenv(name, {_stash: true, symbol: expansion})
  local ____x129 = object(["setenv", ["quote", name]])
  ____x129.symbol = ["quote", expansion]
  return ____x129
end})
setenv("define-reader", {_stash: true, macro: function (__x137)
  local ____id28 = __x137
  local __char1 = ____id28[1]
  local __s1 = ____id28[2]
  local ____r35 = unstash([...])
  local ____x137 = destash33(__x137, ____r35)
  local ____id29 = ____r35
  local __body19 = cut(____id29, 0)
  return ["set", ["get", "read-table", __char1], join(["fn", [__s1]], __body19)]
end})
setenv("define", {_stash: true, macro: function (name, x)
  local ____r37 = unstash([...])
  local __name5 = destash33(name, ____r37)
  local __x147 = destash33(x, ____r37)
  local ____id31 = ____r37
  local __body21 = cut(____id31, 0)
  setenv(__name5, {_stash: true, variable: true})
  if some63(__body21) then
    return join(["%local-function", __name5], bind42(__x147, __body21))
  else
    return ["%local", __name5, __x147]

end})
setenv("define-global", {_stash: true, macro: function (name, x)
  local ____r39 = unstash([...])
  local __name7 = destash33(name, ____r39)
  local __x154 = destash33(x, ____r39)
  local ____id33 = ____r39
  local __body23 = cut(____id33, 0)
  setenv(__name7, {_stash: true, toplevel: true, variable: true})
  if some63(__body23) then
    return join(["%global-function", __name7], bind42(__x154, __body23))
  else
    return ["set", __name7, __x154]

end})
setenv("with-frame", {_stash: true, macro: function ()
  local __body25 = unstash([...])
  local __x165 = unique("x")
  return ["do", ["add", "environment", ["obj"]], ["with", __x165, join(["do"], __body25), ["drop", "environment"]]]
end})
setenv("with-bindings", {_stash: true, macro: function (__x177)
  local ____id36 = __x177
  local __names1 = ____id36[1]
  local ____r41 = unstash([...])
  local ____x177 = destash33(__x177, ____r41)
  local ____id37 = ____r41
  local __body27 = cut(____id37, 0)
  local __x179 = unique("x")
  local ____x182 = object(["setenv", __x179])
  ____x182.variable = true
  return join(["with-frame", ["each", __x179, __names1, ____x182]], __body27)
end})
setenv("let-macro", {_stash: true, macro: function (definitions)
  local ____r44 = unstash([...])
  local __definitions1 = destash33(definitions, ____r44)
  local ____id39 = ____r44
  local __body29 = cut(____id39, 0)
  add(environment, {})
  map(function (m)
    return macroexpand(join(["define-macro"], m))
  end, __definitions1)
  local ____x187 = join(["do"], macroexpand(__body29))
  drop(environment)
  return ____x187
end})
setenv("let-symbol", {_stash: true, macro: function (expansions)
  local ____r48 = unstash([...])
  local __expansions1 = destash33(expansions, ____r48)
  local ____id42 = ____r48
  local __body31 = cut(____id42, 0)
  add(environment, {})
  map(function (__x196)
    local ____id43 = __x196
    local __name9 = ____id43[1]
    local __exp1 = ____id43[2]
    return macroexpand(["define-symbol", __name9, __exp1])
  end, pair(__expansions1))
  local ____x195 = join(["do"], macroexpand(__body31))
  drop(environment)
  return ____x195
end})
setenv("let-unique", {_stash: true, macro: function (names)
  local ____r52 = unstash([...])
  local __names3 = destash33(names, ____r52)
  local ____id45 = ____r52
  local __body33 = cut(____id45, 0)
  local __bs3 = map(function (n)
    return [n, ["unique", ["quote", n]]]
  end, __names3)
  return join(["let", apply(join, __bs3)], __body33)
end})
setenv("fn", {_stash: true, macro: function (args)
  local ____r55 = unstash([...])
  local __args7 = destash33(args, ____r55)
  local ____id47 = ____r55
  local __body35 = cut(____id47, 0)
  return join(["%function"], bind42(__args7, __body35))
end})
setenv("apply", {_stash: true, macro: function (f)
  local ____r57 = unstash([...])
  local __f1 = destash33(f, ____r57)
  local ____id49 = ____r57
  local __args9 = cut(____id49, 0)
  if _35(__args9) > 1 then
    return [["do", "apply"], __f1, ["join", join(["list"], almost(__args9)), last(__args9)]]
  else
    return join([["do", "apply"], __f1], __args9)

end})
setenv("guard", {_stash: true, macro: function (expr)
  if _61(target, "js") then
    return [["fn", join(), ["%try", ["list", true, expr]]]]
  else
    local ____x257 = object(["obj"])
    ____x257.stack = [["get", "debug", ["quote", "traceback"]]]
    ____x257.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x257]]]]

end})
setenv("each", {_stash: true, macro: function (x, t)
  local ____r61 = unstash([...])
  local __x283 = destash33(x, ____r61)
  local __t1 = destash33(t, ____r61)
  local ____id52 = ____r61
  local __body37 = cut(____id52, 0)
  local __o3 = unique("o")
  local __n3 = unique("n")
  local __i3 = unique("i")
  local __e9
  if atom63(__x283) then
    __e9 = [__i3, __x283]
  else
    local __e10
    if _35(__x283) > 1 then
      __e10 = __x283
    else
      __e10 = [__i3, hd(__x283)]

    __e9 = __e10

  local ____id53 = __e9
  local __k5 = ____id53[1]
  local __v7 = ____id53[2]
  local __e11
  if _61(target, "lua") then
    __e11 = __body37
  else
    __e11 = [join(["let", __k5, ["if", ["numeric?", __k5], ["parseInt", __k5], __k5]], __body37)]

  return ["let", [__o3, __t1, __k5, "nil"], ["%for", __o3, __k5, join(["let", [__v7, ["get", __o3, __k5]]], __e11)]]
end})
setenv("for", {_stash: true, macro: function (i, to)
  local ____r63 = unstash([...])
  local __i5 = destash33(i, ____r63)
  local __to1 = destash33(to, ____r63)
  local ____id55 = ____r63
  local __body39 = cut(____id55, 0)
  return ["let", __i5, 0, join(["while", ["<", __i5, __to1]], __body39, [["inc", __i5]])]
end})
setenv("step", {_stash: true, macro: function (v, t)
  local ____r65 = unstash([...])
  local __v9 = destash33(v, ____r65)
  local __t3 = destash33(t, ____r65)
  local ____id57 = ____r65
  local __body41 = cut(____id57, 0)
  local __x317 = unique("x")
  local __i7 = unique("i")
  return ["let", [__x317, __t3], ["for", __i7, ["#", __x317], join(["let", [__v9, ["at", __x317, __i7]]], __body41)]]
end})
setenv("set-of", {_stash: true, macro: function ()
  local __xs1 = unstash([...])
  local __l3 = []
  local ____o5 = __xs1
  local ____i9 = undefined
  for (____i9 in ____o5) {
    local __x328 = ____o5[____i9]
    local __e12
    if numeric63(____i9) then
      __e12 = parseInt(____i9)
    else
      __e12 = ____i9

    local ____i91 = __e12
    __l3[__x328] = true
  }
  return join(["obj"], __l3)
end})
setenv("language", {_stash: true, macro: function ()
  return ["quote", target]
end})
setenv("target", {_stash: true, macro: function ()
  local __clauses3 = unstash([...])
  return __clauses3[target]
end})
setenv("join!", {_stash: true, macro: function (a)
  local ____r69 = unstash([...])
  local __a3 = destash33(a, ____r69)
  local ____id59 = ____r69
  local __bs5 = cut(____id59, 0)
  return ["set", __a3, join(["join", __a3], __bs5)]
end})
setenv("cat!", {_stash: true, macro: function (a)
  local ____r71 = unstash([...])
  local __a5 = destash33(a, ____r71)
  local ____id61 = ____r71
  local __bs7 = cut(____id61, 0)
  return ["set", __a5, join(["cat", __a5], __bs7)]
end})
setenv("inc", {_stash: true, macro: function (n, by)
  local __e13
  if nil63(by) then
    __e13 = 1
  else
    __e13 = by

  return ["set", n, ["+", n, __e13]]
end})
setenv("dec", {_stash: true, macro: function (n, by)
  local __e14
  if nil63(by) then
    __e14 = 1
  else
    __e14 = by

  return ["set", n, ["-", n, __e14]]
end})
setenv("with-indent", {_stash: true, macro: function (form)
  local __x356 = unique("x")
  return ["do", ["inc", "indent-level"], ["with", __x356, form, ["dec", "indent-level"]]]
end})
setenv("export", {_stash: true, macro: function ()
  local __names5 = unstash([...])
  if _61(target, "js") then
    return join(["do"], map(function (k)
      return ["set", ["get", "exports", ["quote", k]], k]
    end, __names5))
  else
    local __x373 = {}
    local ____o7 = __names5
    local ____i11 = undefined
    for (____i11 in ____o7) {
      local __k7 = ____o7[____i11]
      local __e15
      if numeric63(____i11) then
        __e15 = parseInt(____i11)
      else
        __e15 = ____i11

      local ____i111 = __e15
      __x373[__k7] = __k7
    }
    return ["return", join(["%object"], mapo(function (x)
      return x
    end, __x373))]

end})
setenv("when-compiling", {_stash: true, macro: function ()
  local __body43 = unstash([...])
  return _eval(join(["do"], __body43))
end})
