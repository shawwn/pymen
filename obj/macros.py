__f2 = function (form)
  return quoted(form)
end
setenv("quote", {"_stash": True, "macro": __f2})
__f3 = function (form)
  return quasiexpand(form, 1)
end
setenv("quasiquote", {"_stash": True, "macro": __f3})
__f4 = function ()
  __args1 = unstash([...])
  __f5 = function (__x5)
    ____id1 = __x5
    __lh1 = ____id1[1]
    __rh1 = ____id1[2]
    return ["%set", __lh1, __rh1]
  end
  return join(["do"], map(__f5, pair(__args1)))
end
setenv("set", {"_stash": True, "macro": __f4})
__f6 = function (l, i)
  if _and(_61(target, "lua"), number63(i)) then
    i = i + 1
  else
    if _61(target, "lua") then
      i = ["+", i, 1]


  return ["get", l, i]
end
setenv("at", {"_stash": True, "macro": __f6})
__f7 = function (place)
  if _61(target, "lua") then
    return ["set", place, "nil"]
  else
    return ["%delete", place]

end
setenv("wipe", {"_stash": True, "macro": __f7})
__f8 = function ()
  __body1 = unstash([...])
  __x25 = unique("x")
  __l1 = []
  __forms1 = []
  ____o1 = __body1
  __k2 = None
  for (__k2 in ____o1) {
    __v1 = ____o1[__k2]

    if numeric63(__k2) then
      __e8 = parseInt(__k2)
    else
      __e8 = __k2

    __k3 = __e8
    if number63(__k3) then
      __l1[__k3] = __v1
    else
      add(__forms1, ["set", ["get", __x25, ["quote", __k3]], __v1])

  }
  if some63(__forms1) then
    return join(["let", __x25, ["object", join(["%array"], __l1)]], __forms1, [__x25])
  else
    return join(["%array"], __l1)

end
setenv("list", {"_stash": True, "macro": __f8})
__f9 = function ()
  __branches1 = unstash([...])
  return hd(expand_if(__branches1))
end
setenv("if", {"_stash": True, "macro": __f9})
__f10 = function (expr)
  ____r13 = unstash([...])
  __expr1 = destash33(expr, ____r13)
  ____id4 = ____r13
  __clauses1 = cut(____id4, 0)
  __x47 = unique("x")
  __f11 = function (_)
    return ["=", ["quote", _], __x47]
  end
  __eq1 = __f11
  __f12 = function (__x50)
    ____id5 = __x50
    __a1 = ____id5[1]
    __b1 = ____id5[2]
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
  __cl1 = __f12
  return ["let", __x47, __expr1, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]
end
setenv("case", {"_stash": True, "macro": __f10})
__f13 = function (cond)
  ____r17 = unstash([...])
  __cond1 = destash33(cond, ____r17)
  ____id7 = ____r17
  __body3 = cut(____id7, 0)
  return ["if", __cond1, join(["do"], __body3)]
end
setenv("when", {"_stash": True, "macro": __f13})
__f14 = function (cond)
  ____r19 = unstash([...])
  __cond3 = destash33(cond, ____r19)
  ____id9 = ____r19
  __body5 = cut(____id9, 0)
  return ["if", ["not", __cond3], join(["do"], __body5)]
end
setenv("unless", {"_stash": True, "macro": __f14})
__f15 = function ()
  __body7 = unstash([...])
  __f16 = function (x)
    return x
  end
  return join(["%object"], mapo(__f16, __body7))
end
setenv("obj", {"_stash": True, "macro": __f15})
__f17 = function (bs)
  ____r23 = unstash([...])
  __bs11 = destash33(bs, ____r23)
  ____id14 = ____r23
  __body9 = cut(____id14, 0)
  if atom63(__bs11) then
    return join(["let", [__bs11, hd(__body9)]], tl(__body9))
  else
    if none63(__bs11) then
      return join(["do"], __body9)
    else
      ____id15 = __bs11
      __lh3 = ____id15[1]
      __rh3 = ____id15[2]
      __bs21 = cut(____id15, 2)
      ____id16 = bind(__lh3, __rh3)
      __id17 = ____id16[1]
      __val1 = ____id16[2]
      __bs12 = cut(____id16, 2)
      __renames1 = []
      if _not(id_literal63(__id17)) then
        __id121 = unique(__id17)
        __renames1 = [__id17, __id121]
        __id17 = __id121

      return ["do", ["%local", __id17, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body9)]]


end
setenv("let", {"_stash": True, "macro": __f17})
__f18 = function (x, v)
  ____r25 = unstash([...])
  __x95 = destash33(x, ____r25)
  __v3 = destash33(v, ____r25)
  ____id19 = ____r25
  __body11 = cut(____id19, 0)
  return join(["let", [__x95, __v3]], __body11, [__x95])
end
setenv("with", {"_stash": True, "macro": __f18})
__f19 = function (x, v)
  ____r27 = unstash([...])
  __x106 = destash33(x, ____r27)
  __v5 = destash33(v, ____r27)
  ____id21 = ____r27
  __body13 = cut(____id21, 0)
  __y1 = unique("y")
  return ["let", __y1, __v5, ["when", ["yes", __y1], join(["let", [__x106, __y1]], __body13)]]
end
setenv("let-when", {"_stash": True, "macro": __f19})
__f20 = function (name, args)
  ____r29 = unstash([...])
  __name1 = destash33(name, ____r29)
  __args3 = destash33(args, ____r29)
  ____id23 = ____r29
  __body15 = cut(____id23, 0)
  ____x116 = object(["setenv", ["quote", __name1]])
  ____x116.macro = join(["fn", __args3], __body15)
  __form1 = ____x116
  _eval(__form1)
  return __form1
end
setenv("define-macro", {"_stash": True, "macro": __f20})
__f21 = function (name, args)
  ____r31 = unstash([...])
  __name3 = destash33(name, ____r31)
  __args5 = destash33(args, ____r31)
  ____id25 = ____r31
  __body17 = cut(____id25, 0)
  ____x123 = object(["setenv", ["quote", __name3]])
  ____x123.special = join(["fn", __args5], __body17)
  __form3 = join(____x123, keys(__body17))
  _eval(__form3)
  return __form3
end
setenv("define-special", {"_stash": True, "macro": __f21})
__f22 = function (name, expansion)
  setenv(name, {"_stash": True, "symbol": expansion})
  ____x129 = object(["setenv", ["quote", name]])
  ____x129.symbol = ["quote", expansion]
  return ____x129
end
setenv("define-symbol", {"_stash": True, "macro": __f22})
__f23 = function (__x137)
  ____id28 = __x137
  __char1 = ____id28[1]
  __s1 = ____id28[2]
  ____r35 = unstash([...])
  ____x137 = destash33(__x137, ____r35)
  ____id29 = ____r35
  __body19 = cut(____id29, 0)
  return ["set", ["get", "read-table", __char1], join(["fn", [__s1]], __body19)]
end
setenv("define-reader", {"_stash": True, "macro": __f23})
__f24 = function (name, x)
  ____r37 = unstash([...])
  __name5 = destash33(name, ____r37)
  __x147 = destash33(x, ____r37)
  ____id31 = ____r37
  __body21 = cut(____id31, 0)
  setenv(__name5, {"_stash": True, "variable": True})
  if some63(__body21) then
    return join(["%local-function", __name5], bind42(__x147, __body21))
  else
    return ["%local", __name5, __x147]

end
setenv("define", {"_stash": True, "macro": __f24})
__f25 = function (name, x)
  ____r39 = unstash([...])
  __name7 = destash33(name, ____r39)
  __x154 = destash33(x, ____r39)
  ____id33 = ____r39
  __body23 = cut(____id33, 0)
  setenv(__name7, {"_stash": True, "toplevel": True, "variable": True})
  if some63(__body23) then
    return join(["%global-function", __name7], bind42(__x154, __body23))
  else
    return ["set", __name7, __x154]

end
setenv("define-global", {"_stash": True, "macro": __f25})
__f26 = function ()
  __body25 = unstash([...])
  __x165 = unique("x")
  return ["do", ["add", "environment", ["obj"]], ["with", __x165, join(["do"], __body25), ["drop", "environment"]]]
end
setenv("with-frame", {"_stash": True, "macro": __f26})
__f27 = function (__x177)
  ____id36 = __x177
  __names1 = ____id36[1]
  ____r41 = unstash([...])
  ____x177 = destash33(__x177, ____r41)
  ____id37 = ____r41
  __body27 = cut(____id37, 0)
  __x179 = unique("x")
  ____x182 = object(["setenv", __x179])
  ____x182.variable = True
  return join(["with-frame", ["each", __x179, __names1, ____x182]], __body27)
end
setenv("with-bindings", {"_stash": True, "macro": __f27})
__f28 = function (definitions)
  ____r44 = unstash([...])
  __definitions1 = destash33(definitions, ____r44)
  ____id39 = ____r44
  __body29 = cut(____id39, 0)
  add(environment, {})
  __f29 = function (m)
    return macroexpand(join(["define-macro"], m))
  end
  map(__f29, __definitions1)
  ____x187 = join(["do"], macroexpand(__body29))
  drop(environment)
  return ____x187
end
setenv("let-macro", {"_stash": True, "macro": __f28})
__f30 = function (expansions)
  ____r48 = unstash([...])
  __expansions1 = destash33(expansions, ____r48)
  ____id42 = ____r48
  __body31 = cut(____id42, 0)
  add(environment, {})
  __f31 = function (__x196)
    ____id43 = __x196
    __name9 = ____id43[1]
    __exp1 = ____id43[2]
    return macroexpand(["define-symbol", __name9, __exp1])
  end
  map(__f31, pair(__expansions1))
  ____x195 = join(["do"], macroexpand(__body31))
  drop(environment)
  return ____x195
end
setenv("let-symbol", {"_stash": True, "macro": __f30})
__f32 = function (names)
  ____r52 = unstash([...])
  __names3 = destash33(names, ____r52)
  ____id45 = ____r52
  __body33 = cut(____id45, 0)
  __f33 = function (n)
    return [n, ["unique", ["quote", n]]]
  end
  __bs3 = map(__f33, __names3)
  return join(["let", apply(join, __bs3)], __body33)
end
setenv("let-unique", {"_stash": True, "macro": __f32})
__f34 = function (args)
  ____r55 = unstash([...])
  __args7 = destash33(args, ____r55)
  ____id47 = ____r55
  __body35 = cut(____id47, 0)
  return join(["%function"], bind42(__args7, __body35))
end
setenv("fn", {"_stash": True, "macro": __f34})
__f35 = function (f)
  ____r57 = unstash([...])
  __f1 = destash33(f, ____r57)
  ____id49 = ____r57
  __args9 = cut(____id49, 0)
  if _35(__args9) > 1 then
    return [["do", "apply"], __f1, ["join", join(["list"], almost(__args9)), last(__args9)]]
  else
    return join([["do", "apply"], __f1], __args9)

end
setenv("apply", {"_stash": True, "macro": __f35})
__f36 = function (expr)
  if _61(target, "js") then
    return [["fn", join(), ["%try", ["list", True, expr]]]]
  else
    ____x257 = object(["obj"])
    ____x257.stack = [["get", "debug", ["quote", "traceback"]]]
    ____x257.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x257]]]]

end
setenv("guard", {"_stash": True, "macro": __f36})
__f37 = function (x, t)
  ____r61 = unstash([...])
  __x283 = destash33(x, ____r61)
  __t1 = destash33(t, ____r61)
  ____id52 = ____r61
  __body37 = cut(____id52, 0)
  __o3 = unique("o")
  __n3 = unique("n")
  __i3 = unique("i")

  if atom63(__x283) then
    __e9 = [__i3, __x283]
  else

    if _35(__x283) > 1 then
      __e10 = __x283
    else
      __e10 = [__i3, hd(__x283)]

    __e9 = __e10

  ____id53 = __e9
  __k5 = ____id53[1]
  __v7 = ____id53[2]

  if _61(target, "lua") then
    __e11 = __body37
  else
    __e11 = [join(["let", __k5, ["if", ["numeric?", __k5], ["parseInt", __k5], __k5]], __body37)]

  return ["let", [__o3, __t1, __k5, "nil"], ["%for", __o3, __k5, join(["let", [__v7, ["get", __o3, __k5]]], __e11)]]
end
setenv("each", {"_stash": True, "macro": __f37})
__f38 = function (i, to)
  ____r63 = unstash([...])
  __i5 = destash33(i, ____r63)
  __to1 = destash33(to, ____r63)
  ____id55 = ____r63
  __body39 = cut(____id55, 0)
  return ["let", __i5, 0, join(["while", ["<", __i5, __to1]], __body39, [["inc", __i5]])]
end
setenv("for", {"_stash": True, "macro": __f38})
__f39 = function (v, t)
  ____r65 = unstash([...])
  __v9 = destash33(v, ____r65)
  __t3 = destash33(t, ____r65)
  ____id57 = ____r65
  __body41 = cut(____id57, 0)
  __x317 = unique("x")
  __i7 = unique("i")
  return ["let", [__x317, __t3], ["for", __i7, ["#", __x317], join(["let", [__v9, ["at", __x317, __i7]]], __body41)]]
end
setenv("step", {"_stash": True, "macro": __f39})
__f40 = function ()
  __xs1 = unstash([...])
  __l3 = []
  ____o5 = __xs1
  ____i9 = None
  for (____i9 in ____o5) {
    __x328 = ____o5[____i9]

    if numeric63(____i9) then
      __e12 = parseInt(____i9)
    else
      __e12 = ____i9

    ____i91 = __e12
    __l3[__x328] = True
  }
  return join(["obj"], __l3)
end
setenv("set-of", {"_stash": True, "macro": __f40})
__f41 = function ()
  return ["quote", target]
end
setenv("language", {"_stash": True, "macro": __f41})
__f42 = function ()
  __clauses3 = unstash([...])
  if has63(__clauses3, target) then
    return __clauses3[target]
  else
    return hd(__clauses3)

end
setenv("target", {"_stash": True, "macro": __f42})
__f43 = function (a)
  ____r69 = unstash([...])
  __a3 = destash33(a, ____r69)
  ____id59 = ____r69
  __bs5 = cut(____id59, 0)
  return ["set", __a3, join(["join", __a3], __bs5)]
end
setenv("join!", {"_stash": True, "macro": __f43})
__f44 = function (a)
  ____r71 = unstash([...])
  __a5 = destash33(a, ____r71)
  ____id61 = ____r71
  __bs7 = cut(____id61, 0)
  return ["set", __a5, join(["cat", __a5], __bs7)]
end
setenv("cat!", {"_stash": True, "macro": __f44})
__f45 = function (n, by)

  if nil63(by) then
    __e13 = 1
  else
    __e13 = by

  return ["set", n, ["+", n, __e13]]
end
setenv("inc", {"_stash": True, "macro": __f45})
__f46 = function (n, by)

  if nil63(by) then
    __e14 = 1
  else
    __e14 = by

  return ["set", n, ["-", n, __e14]]
end
setenv("dec", {"_stash": True, "macro": __f46})
__f47 = function (form)
  __x356 = unique("x")
  return ["do", ["inc", "indent-level"], ["with", __x356, form, ["dec", "indent-level"]]]
end
setenv("with-indent", {"_stash": True, "macro": __f47})
__f48 = function ()
  __names5 = unstash([...])
  if _61(target, "js") then
    __f50 = function (k)
      return ["set", ["get", "exports", ["quote", k]], k]
    end
    return join(["do"], map(__f50, __names5))
  else
    __x373 = {}
    ____o7 = __names5
    ____i11 = None
    for (____i11 in ____o7) {
      __k7 = ____o7[____i11]

      if numeric63(____i11) then
        __e15 = parseInt(____i11)
      else
        __e15 = ____i11

      ____i111 = __e15
      __x373[__k7] = __k7
    }
    __f49 = function (x)
      return x
    end
    return ["return", join(["%object"], mapo(__f49, __x373))]

end
setenv("export", {"_stash": True, "macro": __f48})
__f51 = function ()
  __body43 = unstash([...])
  return _eval(join(["do"], __body43))
end
setenv("when-compiling", {"_stash": True, "macro": __f51})
