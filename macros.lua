local function __quote__macro(form)
  return quoted(form)
end
setenv("quote", {
  _stash = true,
  macro = __quote__macro
})
local function __quasiquote__macro(form)
  return quasiexpand(form, 1)
end
setenv("quasiquote", {
  _stash = true,
  macro = __quasiquote__macro
})
local function __set__macro(...)
  local __args23 = unstash({...})
  return join({"%do"}, map(function (__x111)
    local ____id20 = __x111
    local __lh1 = has(____id20, 1)
    local __rh1 = has(____id20, 2)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has" then
      return {"%set", join({"%get"}, tl(__lh1)), __rh1}
    else
      return {"%set", __lh1, __rh1}
    end
  end, pair(__args23)))
end
setenv("set", {
  _stash = true,
  macro = __set__macro
})
local function __at__macro(l, i)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" and number63(i) then
    i = i + 1
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      i = {"+", i, 1}
    end
  end
  return {"%get", l, i}
end
setenv("at", {
  _stash = true,
  macro = __at__macro
})
local function __wipe__macro(place)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    return {"set", place, "nil"}
  else
    return {"%delete", place}
  end
end
setenv("wipe", {
  _stash = true,
  macro = __wipe__macro
})
local function __list__macro(...)
  local __body5 = unstash({...})
  if one63(__body5) and (hd63(__body5, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_args"
  else
    if _35(__body5) > 2 and (__body5[2] == "for" and __body5[4] == "in") then
      local ____id24 = __body5
      local __expr3 = has(____id24, 1)
      local __body6 = cut(____id24, 1)
      local __comps1 = {}
      local __cond1 = nil
      while _35(__body6) > 2 and (__body6[1] == "for" and __body6[3] == "in") do
        local ____id25 = __body6
        local ___for1 = has(____id25, 1)
        local __names1 = has(____id25, 2)
        local ___in1 = has(____id25, 3)
        local __l9 = has(____id25, 4)
        local __body12 = cut(____id25, 4)
        add(__comps1, {__names1, __l9})
        __body6 = __body12
      end
      if hd(__body6) == "if" then
        local ____id26 = __body6
        local ___if1 = has(____id26, 1)
        local __expr4 = has(____id26, 2)
        __cond1 = __expr4
      end
      return {"%list", __expr3, __comps1, __cond1}
    else
      local __x138 = unique("x")
      local __l10 = {}
      local __forms1 = {}
      local ____o20 = __body5
      local __k20 = nil
      for __k20 in next, ____o20 do
        local __v29 = ____o20[__k20]
        if number63(__k20) then
          __l10[__k20] = __v29
        else
          add(__forms1, {"%set", {"%get", __x138, {"quote", __k20}}, __v29})
        end
      end
      if some63(__forms1) then
        return join({"let", __x138, {"object", join({"%array"}, __l10)}}, __forms1, {__x138})
      else
        return join({"%array"}, __l10)
      end
    end
  end
end
setenv("list", {
  _stash = true,
  macro = __list__macro
})
local function __if__macro(...)
  local __branches1 = unstash({...})
  return hd(expand_if(__branches1))
end
setenv("if", {
  _stash = true,
  macro = __if__macro
})
local function __case__macro(expr, ...)
  local ____r167 = unstash({...})
  local __expr6 = destash33(expr, ____r167)
  local ____id29 = ____r167
  local __e50 = nil
  if nil63(has(____id29, "cmp")) then
    __e50 = "="
  else
    __e50 = has(____id29, "cmp")
  end
  local __cmp1 = __e50
  local __clauses1 = cut(____id29, 0)
  local __x162 = unique("x")
  local __eq1 = function (_)
    return {__cmp1, _, __x162}
  end
  local __cl1 = function (__x164)
    local ____id30 = __x164
    local __a5 = has(____id30, 1)
    local __b4 = has(____id30, 2)
    if nil63(__b4) then
      return {__a5}
    else
      if string63(__a5) or number63(__a5) then
        return {__eq1(__a5), __b4}
      else
        if list63(__a5) and hd63(__a5, "quote") then
          return {__eq1(__a5), __b4}
        else
          if one63(__a5) then
            return {__eq1(hd(__a5)), __b4}
          else
            if _35(__a5) > 1 then
              return {join({"or"}, map(__eq1, __a5)), __b4}
            end
          end
        end
      end
    end
  end
  return {"let", __x162, __expr6, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end
setenv("case", {
  _stash = true,
  macro = __case__macro
})
local function __of__macro(x, ...)
  local ____r171 = unstash({...})
  local __x177 = destash33(x, ____r171)
  local ____id32 = ____r171
  local __values1 = cut(____id32, 0)
  return join({"case", __x177, __values1, true, false}, props(__values1))
end
setenv("of", {
  _stash = true,
  macro = __of__macro
})
local function __when__macro(cond, ...)
  local ____r173 = unstash({...})
  local __cond3 = destash33(cond, ____r173)
  local ____id34 = ____r173
  local __body8 = cut(____id34, 0)
  return {"%if", __cond3, join({"%do"}, __body8)}
end
setenv("when", {
  _stash = true,
  macro = __when__macro
})
local function __unless__macro(cond, ...)
  local ____r175 = unstash({...})
  local __cond5 = destash33(cond, ____r175)
  local ____id36 = ____r175
  local __body10 = cut(____id36, 0)
  return {"%if", {"%not", __cond5}, join({"%do"}, __body10)}
end
setenv("unless", {
  _stash = true,
  macro = __unless__macro
})
local function __obj__macro(...)
  local __body131 = unstash({...})
  if one63(__body131) and (hd63(__body131, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_keys"
  else
    if _35(__body131) > 2 and (__body131[2] == "for" and __body131[4] == "in") then
      local ____id40 = __body131
      local __expr9 = has(____id40, 1)
      local __body14 = cut(____id40, 1)
      local __comps3 = {}
      local __cond7 = nil
      while _35(__body14) > 2 and (__body14[1] == "for" and __body14[3] == "in") do
        local ____id41 = __body14
        local ___for3 = has(____id41, 1)
        local __names3 = has(____id41, 2)
        local ___in3 = has(____id41, 3)
        local __l121 = has(____id41, 4)
        local __body141 = cut(____id41, 4)
        add(__comps3, {__names3, __l121})
        __body14 = __body141
      end
      if hd(__body14) == "if" then
        local ____id42 = __body14
        local ___if3 = has(____id42, 1)
        local __expr10 = has(____id42, 2)
        __cond7 = __expr10
      end
      if list63(__expr9) and hd63(__expr9, ",") then
        __expr9 = join({":"}, tl(__expr9))
      end
      local ____x201 = object({"%list", __expr9, __comps3, __cond7})
      ____x201.kind = "object"
      return ____x201
    else
      return join({"%object"}, mapo(function (x)
        return x
      end, __body131))
    end
  end
end
setenv("obj", {
  _stash = true,
  macro = __obj__macro
})
local function __let__macro(bs, ...)
  local ____r179 = unstash({...})
  local __bs11 = destash33(bs, ____r179)
  local ____id47 = ____r179
  local __body16 = cut(____id47, 0)
  if atom63(__bs11) or hd63(__bs11, ",") then
    return join({"let", {__bs11, hd(__body16)}}, tl(__body16))
  else
    if none63(__bs11) then
      return join({"%do"}, __body16)
    else
      local ____id48 = __bs11
      local __lh3 = has(____id48, 1)
      local __rh3 = has(____id48, 2)
      local __bs21 = cut(____id48, 2)
      local ____id49 = bind(__lh3, __rh3)
      local __id50 = has(____id49, 1)
      local __val2 = has(____id49, 2)
      local __bs12 = cut(____id49, 2)
      local __renames1 = {}
      if not id_literal63(__id50) then
        local __id121 = unique(__id50)
        __renames1 = {__id50, __id121}
        __id50 = __id121
      end
      return {"%do", {"%local", __id50, __val2}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body16)}}
    end
  end
end
setenv("let", {
  _stash = true,
  macro = __let__macro
})
local function __with__macro(x, v, ...)
  local ____r181 = unstash({...})
  local __x230 = destash33(x, ____r181)
  local __v31 = destash33(v, ____r181)
  local ____id52 = ____r181
  local __body18 = cut(____id52, 0)
  if __v31 == "as" then
    return join({"%with", {"%as", __x230, hd(__body18)}}, tl(__body18))
  else
    if not atom63(__x230) or has(__body18, "async") then
      return join({"%with", __x230, __v31}, __body18)
    else
      return join({"let", {__x230, __v31}}, __body18, {__x230})
    end
  end
end
setenv("with", {
  _stash = true,
  macro = __with__macro
})
local function __let_when__macro(x, v, ...)
  local ____r183 = unstash({...})
  local __x245 = destash33(x, ____r183)
  local __v33 = destash33(v, ____r183)
  local ____id54 = ____r183
  local __body20 = cut(____id54, 0)
  local __y7 = unique("y")
  return {"let", __y7, __v33, {"when", {"yes", __y7}, join({"let", {__x245, __y7}}, __body20)}}
end
setenv("let-when", {
  _stash = true,
  macro = __let_when__macro
})
local function __define_macro__macro(name, args, ...)
  local ____r185 = unstash({...})
  local __name13 = destash33(name, ____r185)
  local __args25 = destash33(args, ____r185)
  local ____id57 = ____r185
  local __body22 = cut(____id57, 0)
  local __id58 = unique(__name13 .. "--macro")
  local ____x259 = object({"setenv", {"quote", __name13}})
  ____x259.macro = __id58
  local __form4 = {"do", join({"define", __id58, __args25}, __body22), ____x259}
  eval(__form4)
  return __form4
end
setenv("define-macro", {
  _stash = true,
  macro = __define_macro__macro
})
local function __define_special__macro(name, args, ...)
  local ____r187 = unstash({...})
  local __name15 = destash33(name, ____r187)
  local __args27 = destash33(args, ____r187)
  local ____id61 = ____r187
  local __body24 = cut(____id61, 0)
  local __id62 = unique(__name15 .. "--special")
  local ____x269 = object({"setenv", {"quote", __name15}})
  ____x269.special = __id62
  local __form6 = {"do", join({"define", __id62, __args27}, __body24), join(____x269, props(__body24))}
  eval(__form6)
  return __form6
end
setenv("define-special", {
  _stash = true,
  macro = __define_special__macro
})
local function __define_symbol__macro(name, expansion)
  setenv(name, {
    _stash = true,
    symbol = expansion
  })
  local ____x274 = object({"setenv", {"quote", name}})
  ____x274.symbol = {"quote", expansion}
  return ____x274
end
setenv("define-symbol", {
  _stash = true,
  macro = __define_symbol__macro
})
local function __define_reader__macro(__x283, ...)
  local ____r191 = unstash({...})
  local ____x283 = destash33(__x283, ____r191)
  local ____id65 = ____x283
  local __char1 = has(____id65, 1)
  local __s5 = has(____id65, 2)
  local ____id66 = ____r191
  local __body26 = cut(____id66, 0)
  return {"%set", {"%get", "read-table", __char1}, join({"fn", {__s5}}, __body26)}
end
setenv("define-reader", {
  _stash = true,
  macro = __define_reader__macro
})
local function __define__macro(name, x, ...)
  local ____r193 = unstash({...})
  local __name17 = destash33(name, ____r193)
  local __x294 = destash33(x, ____r193)
  local ____id68 = ____r193
  local __body28 = cut(____id68, 0)
  setenv(__name17, {
    _stash = true,
    variable = true
  })
  if some63(__body28) then
    return join({"%local-function", __name17}, bind42(__x294, __body28), props(__body28))
  else
    return join({"%local", __name17, __x294}, props(__body28))
  end
end
setenv("define", {
  _stash = true,
  macro = __define__macro
})
local function __define_global__macro(name, x, ...)
  local ____r195 = unstash({...})
  local __name19 = destash33(name, ____r195)
  local __x302 = destash33(x, ____r195)
  local ____id70 = ____r195
  local __body30 = cut(____id70, 0)
  setenv(__name19, {
    _stash = true,
    toplevel = true,
    variable = true
  })
  if some63(__body30) then
    return join({"%global-function", __name19}, bind42(__x302, __body30), props(__body30))
  else
    return join({"set", __name19, __x302}, props(__body30))
  end
end
setenv("define-global", {
  _stash = true,
  macro = __define_global__macro
})
local function __get_value__macro(x)
  local ____x309 = object({"setenv", x})
  ____x309.toplevel = true
  return {"has", ____x309, {"quote", "value"}}
end
setenv("get-value", {
  _stash = true,
  macro = __get_value__macro
})
local function __define_constant__macro(name, x)
  local ____x320 = object({"setenv", {"quote", name}})
  ____x320.toplevel = true
  ____x320.value = either(x, {"get-value", {"quote", name}})
  return {"%do", ____x320, {"define-symbol", name, {"get-value", {"quote", name}}}}
end
setenv("define-constant", {
  _stash = true,
  macro = __define_constant__macro
})
local function __define_variable__macro(name, x)
  if is63(x) then
    return {"define-constant", name, {"either", {"get-value", {"quote", name}}, x}}
  else
    return {"define-constant", name}
  end
end
setenv("define-variable", {
  _stash = true,
  macro = __define_variable__macro
})
local function __after__macro(x, ...)
  local ____r204 = unstash({...})
  local __x350 = destash33(x, ____r204)
  local ____id72 = ____r204
  local __body32 = cut(____id72, 0)
  local __ok11 = unique("ok")
  local __r205 = unique("r")
  local ____x351 = object({"target", {"try", __x350, join({"finally"}, __body32)}})
  ____x351.lua = join({"let", {{__ok11, __r205}, {"guard", __x350}}}, __body32, {{"if", __ok11, __r205, {"throw", __r205}}})
  return ____x351
end
setenv("after", {
  _stash = true,
  macro = __after__macro
})
local function __with_frame__macro(...)
  local __body34 = unstash({...})
  return {"%do", {"add", "environment", {"obj"}}, {"after", join({"%do"}, __body34), {"drop", "environment"}}}
end
setenv("with-frame", {
  _stash = true,
  macro = __with_frame__macro
})
local function __with_values__macro(...)
  local __body36 = unstash({...})
  local __forms3 = {}
  local ____o22 = __body36
  local __k22 = nil
  for __k22 in next, ____o22 do
    local __v35 = ____o22[__k22]
    if not number63(__k22) then
      local ____x381 = object({"setenv", {"quote", __k22}})
      ____x381.value = __v35
      add(__forms3, ____x381)
    end
  end
  return join({"with-frame"}, __forms3)
end
setenv("with-values", {
  _stash = true,
  macro = __with_values__macro
})
local function __with_bindings__macro(__x389, ...)
  local ____r207 = unstash({...})
  local ____x389 = destash33(__x389, ____r207)
  local ____id75 = ____x389
  local __names5 = has(____id75, 1)
  local ____id76 = ____r207
  local __body38 = cut(____id76, 0)
  local __x391 = unique("x")
  local ____x394 = object({"setenv", __x391})
  ____x394.variable = true
  return join({"with-frame", {"each", __x391, __names5, ____x394}}, __body38)
end
setenv("with-bindings", {
  _stash = true,
  macro = __with_bindings__macro
})
local function __let_macro__macro(definitions, ...)
  local ____r211 = unstash({...})
  local __definitions1 = destash33(definitions, ____r211)
  local ____id79 = ____r211
  local __body40 = cut(____id79, 0)
  add(environment, {})
  local ____id80 = {xpcall(function ()
    map(function (m)
      return macroexpand(join({"define-macro"}, m))
    end, __definitions1)
    return join({"%do"}, macroexpand(__body40))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e51 = nil
      if string63(m) then
        __e51 = clip(m, search(m, ": ") + 2)
      else
        local __e52 = nil
        if nil63(m) then
          __e52 = ""
        else
          __e52 = str(m)
        end
        __e51 = __e52
      end
      return {
        stack = debug.traceback(),
        message = __e51
      }
    end
  end)}
  local ____ok13 = has(____id80, 1)
  local ____r212 = has(____id80, 2)
  drop(environment)
  if ____ok13 then
    return ____r212
  else
    error(____r212)
  end
end
setenv("let-macro", {
  _stash = true,
  macro = __let_macro__macro
})
local function __let_symbol__macro(expansions, ...)
  local ____r217 = unstash({...})
  local __expansions1 = destash33(expansions, ____r217)
  local ____id84 = ____r217
  local __body42 = cut(____id84, 0)
  add(environment, {})
  local ____id85 = {xpcall(function ()
    map(function (__x418)
      local ____id86 = __x418
      local __name21 = has(____id86, 1)
      local __exp1 = has(____id86, 2)
      return macroexpand({"define-symbol", __name21, __exp1})
    end, pair(__expansions1))
    return join({"%do"}, macroexpand(__body42))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e53 = nil
      if string63(m) then
        __e53 = clip(m, search(m, ": ") + 2)
      else
        local __e54 = nil
        if nil63(m) then
          __e54 = ""
        else
          __e54 = str(m)
        end
        __e53 = __e54
      end
      return {
        stack = debug.traceback(),
        message = __e53
      }
    end
  end)}
  local ____ok15 = has(____id85, 1)
  local ____r218 = has(____id85, 2)
  drop(environment)
  if ____ok15 then
    return ____r218
  else
    error(____r218)
  end
end
setenv("let-symbol", {
  _stash = true,
  macro = __let_symbol__macro
})
local function __let_unique__macro(names, ...)
  local ____r222 = unstash({...})
  local __names7 = destash33(names, ____r222)
  local ____id88 = ____r222
  local __body44 = cut(____id88, 0)
  local __bs3 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names7)
  return join({"let", apply(join, __bs3)}, __body44)
end
setenv("let-unique", {
  _stash = true,
  macro = __let_unique__macro
})
local function __fn__macro(args, ...)
  local ____r225 = unstash({...})
  local __args37 = destash33(args, ____r225)
  local ____id90 = ____r225
  local __body46 = cut(____id90, 0)
  return join({"%function"}, bind42(__args37, __body46), props(__body46))
end
setenv("fn", {
  _stash = true,
  macro = __fn__macro
})
local function __apply__macro(f, ...)
  local ____r227 = unstash({...})
  local __f6 = destash33(f, ____r227)
  local ____id92 = ____r227
  local __args39 = cut(____id92, 0)
  if _35(__args39) > 1 then
    return {"%call", "apply", __f6, {"join", join({"list"}, almost(__args39)), last(__args39), join({"list"}, props(__args39))}}
  else
    if props63(__args39) then
      return {"%call", "apply", __f6, join({"join"}, __args39, {join({"list"}, props(__args39))})}
    else
      return join({"%call", "apply", __f6}, __args39)
    end
  end
end
setenv("apply", {
  _stash = true,
  macro = __apply__macro
})
local function __guard__macro(expr)
  local ____x485 = object({"target", {{"%function", join(), {"%try", {"list", true, expr}}}}})
  local ____x497 = object({"obj"})
  ____x497.stack = {{"idx", "debug", "traceback"}}
  ____x497.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
  ____x485.lua = {"list", {"xpcall", {"%function", join(), expr}, {"%function", {"m"}, {"if", {"obj?", "m"}, "m", ____x497}}}}
  return {"let-macro", {{"%return", "args", {"error", "\"Can't return from guard\""}}}, ____x485}
end
setenv("guard", {
  _stash = true,
  macro = __guard__macro
})
local function __each__macro(x, t, ...)
  local ____r231 = unstash({...})
  local __x526 = destash33(x, ____r231)
  local __t4 = destash33(t, ____r231)
  local ____id95 = ____r231
  local __body48 = cut(____id95, 0)
  local __o24 = unique("o")
  local __n30 = unique("n")
  local __i42 = unique("i")
  local __e55 = nil
  if atom63(__x526) then
    __e55 = {__i42, __x526}
  else
    local __e56 = nil
    if _35(__x526) > 1 then
      __e56 = __x526
    else
      __e56 = {__i42, hd(__x526)}
    end
    __e55 = __e56
  end
  local ____id96 = __e55
  local __k24 = has(____id96, 1)
  local __v37 = has(____id96, 2)
  local ____x532 = object({"target", __o24})
  ____x532.py = {"indices", __o24}
  local __e57 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e57 = __body48
  else
    __e57 = {join({"let", __k24, {"if", {"numeric?", __k24}, {"parseInt", __k24}, __k24}}, __body48)}
  end
  return {"let", {__o24, __t4, __k24, "nil"}, join({"%for", ____x532, __k24}, props(__body48), {join({"let", {__v37, {"%get", __o24, __k24}}}, __e57)})}
end
setenv("each", {
  _stash = true,
  macro = __each__macro
})
local function __for__macro(i, to, ...)
  local ____r233 = unstash({...})
  local __i44 = destash33(i, ____r233)
  local __to1 = destash33(to, ____r233)
  local ____id98 = ____r233
  local __body50 = cut(____id98, 0)
  if __to1 == "in" then
    return join({"%for", hd(__body50), __i44, join({"%do"}, tl(__body50))}, props(__body50))
  else
    return {"let", __i44, 0, join({"while", {"<", __i44, __to1}}, __body50, {{"inc", __i44}})}
  end
end
setenv("for", {
  _stash = true,
  macro = __for__macro
})
local function __step__macro(v, t, ...)
  local ____r235 = unstash({...})
  local __v39 = destash33(v, ____r235)
  local __t6 = destash33(t, ____r235)
  local ____id100 = ____r235
  local __body52 = cut(____id100, 0)
  local __x569 = unique("x")
  local __i46 = unique("i")
  return {"let", {__x569, __t6}, {"for", __i46, {"#", __x569}, join({"let", {__v39, {"at", __x569, __i46}}}, __body52)}}
end
setenv("step", {
  _stash = true,
  macro = __step__macro
})
local function __set_of__macro(...)
  local __xs13 = unstash({...})
  local __l14 = {}
  local ____o26 = __xs13
  local ____i48 = nil
  for ____i48 in next, ____o26 do
    local __x581 = ____o26[____i48]
    __l14[__x581] = true
  end
  return join({"obj"}, __l14)
end
setenv("set-of", {
  _stash = true,
  macro = __set_of__macro
})
local function __target63__macro(x)
  return {"=", "target", x}
end
setenv("target?", {
  _stash = true,
  macro = __target63__macro
})
local function __target__macro(...)
  local __clauses3 = unstash({...})
  if has63(__clauses3, has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")) then
    return __clauses3[has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value")]
  else
    return hd(__clauses3)
  end
end
setenv("target", {
  _stash = true,
  macro = __target__macro
})
local function __language__macro()
  return {"quote", has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")}
end
setenv("language", {
  _stash = true,
  macro = __language__macro
})
local function __join33__macro(a, ...)
  local ____r241 = unstash({...})
  local __a7 = destash33(a, ____r241)
  local ____id102 = ____r241
  local __bs5 = cut(____id102, 0)
  return {"set", __a7, join({"join", __a7}, __bs5)}
end
setenv("join!", {
  _stash = true,
  macro = __join33__macro
})
local function __cat33__macro(a, ...)
  local ____r243 = unstash({...})
  local __a9 = destash33(a, ____r243)
  local ____id104 = ____r243
  local __bs7 = cut(____id104, 0)
  return {"set", __a9, join({"cat", __a9}, __bs7)}
end
setenv("cat!", {
  _stash = true,
  macro = __cat33__macro
})
local function __inc__macro(n, by)
  local __e58 = nil
  if nil63(by) then
    __e58 = 1
  else
    __e58 = by
  end
  return {"set", n, {"+", n, __e58}}
end
setenv("inc", {
  _stash = true,
  macro = __inc__macro
})
local function __dec__macro(n, by)
  local __e59 = nil
  if nil63(by) then
    __e59 = 1
  else
    __e59 = by
  end
  return {"set", n, {"-", n, __e59}}
end
setenv("dec", {
  _stash = true,
  macro = __dec__macro
})
local function __with_indent__macro(form)
  local __x614 = unique("x")
  return {"%do", {"inc", "indent-level"}, {"with", __x614, form, {"dec", "indent-level"}}}
end
setenv("with-indent", {
  _stash = true,
  macro = __with_indent__macro
})
local function __export__macro(...)
  local __names9 = unstash({...})
  local __forms5 = map(function (k)
    if k == compile(k) then
      return {"%set", {"idx", "exports", k}, k}
    else
      return {"%do", {"%set", {"%get", "exports", {"quote", k}}, k}, {"%set", {"idx", "exports", k}, k}}
    end
  end, __names9)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    return join({"%do"}, __forms5)
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      return join({"let", "exports", {"or", "exports", {"obj"}}}, __forms5, {{"return", "exports"}})
    end
  end
end
setenv("export", {
  _stash = true,
  macro = __export__macro
})
local function __when_compiling__macro(...)
  local __body54 = unstash({...})
  return eval(join({"%do"}, __body54))
end
setenv("when-compiling", {
  _stash = true,
  macro = __when_compiling__macro
})
local function __during_compilation__macro(...)
  local __body56 = unstash({...})
  local __form8 = join({"%do"}, __body56)
  eval(__form8)
  return __form8
end
setenv("during-compilation", {
  _stash = true,
  macro = __during_compilation__macro
})
local function __def__macro(name, ...)
  local ____r253 = unstash({...})
  local __name23 = destash33(name, ____r253)
  local ____id106 = ____r253
  local __body58 = cut(____id106, 0)
  return join({"define-global", __name23}, __body58)
end
setenv("def", {
  _stash = true,
  macro = __def__macro
})
local function __mac__macro(name, ...)
  local ____r255 = unstash({...})
  local __name25 = destash33(name, ____r255)
  local ____id108 = ____r255
  local __body60 = cut(____id108, 0)
  return join({"define-macro", __name25}, __body60)
end
setenv("mac", {
  _stash = true,
  macro = __mac__macro
})
local function __defconst__macro(name, ...)
  local ____r257 = unstash({...})
  local __name27 = destash33(name, ____r257)
  local ____id110 = ____r257
  local __value1 = cut(____id110, 0)
  return join({"def", __name27}, __value1)
end
setenv("defconst", {
  _stash = true,
  macro = __defconst__macro
})
local function __undefined63__macro(name)
  local ____x678 = object({"target"})
  ____x678.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x678.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x678.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x678
end
setenv("undefined?", {
  _stash = true,
  macro = __undefined63__macro
})
local function __defvar__macro(name, ...)
  local ____r261 = unstash({...})
  local __name29 = destash33(name, ____r261)
  local ____id112 = ____r261
  local __value3 = cut(____id112, 0)
  local ____x696 = object({"target"})
  ____x696.py = {"global", __name29}
  return {"when", {"undefined?", __name29}, ____x696, join({"defconst", __name29}, __value3)}
end
setenv("defvar", {
  _stash = true,
  macro = __defvar__macro
})
local function __async__macro(keyword, ...)
  local ____r263 = unstash({...})
  local __keyword1 = destash33(keyword, ____r263)
  local ____id114 = ____r263
  local __body62 = cut(____id114, 0)
  local ____x702 = object({__keyword1})
  ____x702.async = true
  return join(____x702, __body62)
end
setenv("async", {
  _stash = true,
  macro = __async__macro
})
local function ___37read_from_file__macro(name)
  return {"when-compiling", {"quasiquote", {"%do", {"unquote-splicing", {"read-from-file", name}}}}}
end
setenv("%read-from-file", {
  _stash = true,
  macro = ___37read_from_file__macro
})
local function __the__macro(name)
  return {"getenv", {"quote", name}, {"quote", "value"}}
end
setenv("the", {
  _stash = true,
  macro = __the__macro
})
local function __cat__macro(a, ...)
  local ____r269 = unstash({...})
  local __a11 = destash33(a, ____r269)
  local ____id116 = ____r269
  local __bs9 = cut(____id116, 0)
  if nil63(__a11) then
    return ""
  else
    if none63(__bs9) then
      return __a11
    else
      if one63(__bs9) then
        local ____x728 = object({"target", join({"%cat", __a11}, __bs9)})
        ____x728.py = join({"%call", "cat", __a11}, __bs9)
        return ____x728
      else
        local ____x731 = object({"target", {"%cat", __a11, join({"cat"}, __bs9)}})
        ____x731.py = join({"%call", "cat", __a11}, __bs9)
        return ____x731
      end
    end
  end
end
setenv("cat", {
  _stash = true,
  macro = __cat__macro
})
local function ___43__macro(...)
  local __args41 = unstash({...})
  if none63(__args41) then
    return 0
  else
    if one63(__args41) then
      return hd(__args41)
    else
      return join({"%add"}, __args41)
    end
  end
end
setenv("+", {
  _stash = true,
  macro = ___43__macro
})
local function _____macro(...)
  local __args43 = unstash({...})
  if none63(__args43) then
    return 0
  else
    if one63(__args43) then
      return {"%unm", hd(__args43)}
    else
      return join({"%sub"}, __args43)
    end
  end
end
setenv("-", {
  _stash = true,
  macro = _____macro
})
local function ___42__macro(...)
  local __args45 = unstash({...})
  if none63(__args45) then
    return 1
  else
    if one63(__args45) then
      return hd(__args45)
    else
      return join({"%mul"}, __args45)
    end
  end
end
setenv("*", {
  _stash = true,
  macro = ___42__macro
})
local function ___47__macro(...)
  local __args47 = unstash({...})
  if none63(__args47) then
    return 1
  else
    if one63(__args47) then
      return hd(__args47)
    else
      return join({"%div"}, __args47)
    end
  end
end
setenv("/", {
  _stash = true,
  macro = ___47__macro
})
local function ___4747__macro(...)
  local __args49 = unstash({...})
  if none63(__args49) then
    return 1
  else
    if one63(__args49) then
      return hd(__args49)
    else
      return join({"%idiv"}, __args49)
    end
  end
end
setenv("//", {
  _stash = true,
  macro = ___4747__macro
})
local function ___37__macro(...)
  local __args51 = unstash({...})
  if none63(__args51) then
    return 0
  else
    if one63(__args51) then
      return hd(__args51)
    else
      return join({"%mod"}, __args51)
    end
  end
end
setenv("%", {
  _stash = true,
  macro = ___37__macro
})
local function ___60__macro(a, ...)
  local ____r271 = unstash({...})
  local __a13 = destash33(a, ____r271)
  local ____id118 = ____r271
  local __bs111 = cut(____id118, 0)
  if none63(__bs111) then
    return true
  else
    if one63(__bs111) then
      return join({"%lt", __a13}, __bs111)
    else
      return {"%and", {"%lt", __a13, hd(__bs111)}, join({"<"}, __bs111)}
    end
  end
end
setenv("<", {
  _stash = true,
  macro = ___60__macro
})
local function ___6061__macro(a, ...)
  local ____r273 = unstash({...})
  local __a15 = destash33(a, ____r273)
  local ____id120 = ____r273
  local __bs13 = cut(____id120, 0)
  if none63(__bs13) then
    return true
  else
    if one63(__bs13) then
      return join({"%le", __a15}, __bs13)
    else
      return {"%and", {"%le", __a15, hd(__bs13)}, join({"<="}, __bs13)}
    end
  end
end
setenv("<=", {
  _stash = true,
  macro = ___6061__macro
})
local function ___61__macro(a, ...)
  local ____r275 = unstash({...})
  local __a17 = destash33(a, ____r275)
  local ____id122 = ____r275
  local __bs15 = cut(____id122, 0)
  if none63(__bs15) then
    return true
  else
    if one63(__bs15) then
      return join({"%eq", __a17}, __bs15)
    else
      return {"%and", {"%eq", __a17, hd(__bs15)}, join({"="}, __bs15)}
    end
  end
end
setenv("=", {
  _stash = true,
  macro = ___61__macro
})
local function ___6261__macro(a, ...)
  local ____r277 = unstash({...})
  local __a19 = destash33(a, ____r277)
  local ____id124 = ____r277
  local __bs17 = cut(____id124, 0)
  if none63(__bs17) then
    return true
  else
    if one63(__bs17) then
      return join({"%ge", __a19}, __bs17)
    else
      return {"%and", {"%ge", __a19, hd(__bs17)}, join({">="}, __bs17)}
    end
  end
end
setenv(">=", {
  _stash = true,
  macro = ___6261__macro
})
local function ___62__macro(a, ...)
  local ____r279 = unstash({...})
  local __a21 = destash33(a, ____r279)
  local ____id126 = ____r279
  local __bs19 = cut(____id126, 0)
  if none63(__bs19) then
    return true
  else
    if one63(__bs19) then
      return join({"%gt", __a21}, __bs19)
    else
      return {"%and", {"%gt", __a21, hd(__bs19)}, join({">"}, __bs19)}
    end
  end
end
setenv(">", {
  _stash = true,
  macro = ___62__macro
})
local function __not__macro(...)
  local __args53 = unstash({...})
  if none63(__args53) then
    return false
  else
    if one63(__args53) then
      return join({"%not"}, __args53)
    else
      return {"%and", {"%not", hd(__args53)}, join({"not"}, tl(__args53))}
    end
  end
end
setenv("not", {
  _stash = true,
  macro = __not__macro
})
local function __and__macro(a, ...)
  local ____r281 = unstash({...})
  local __a23 = destash33(a, ____r281)
  local ____id128 = ____r281
  local __bs211 = cut(____id128, 0)
  if nil63(__a23) then
    return true
  else
    if none63(__bs211) then
      return __a23
    else
      if one63(__bs211) then
        return join({"%and", __a23}, __bs211)
      else
        return {"%and", __a23, join({"and"}, __bs211)}
      end
    end
  end
end
setenv("and", {
  _stash = true,
  macro = __and__macro
})
local function __or__macro(a, ...)
  local ____r283 = unstash({...})
  local __a25 = destash33(a, ____r283)
  local ____id130 = ____r283
  local __bs23 = cut(____id130, 0)
  if nil63(__a25) then
    return false
  else
    if none63(__bs23) then
      return __a25
    else
      if one63(__bs23) then
        return join({"%or", __a25}, __bs23)
      else
        return {"%or", __a25, join({"or"}, __bs23)}
      end
    end
  end
end
setenv("or", {
  _stash = true,
  macro = __or__macro
})
local function __break__macro(...)
  local __args55 = unstash({...})
  return join({"%break"}, __args55)
end
setenv("break", {
  _stash = true,
  macro = __break__macro
})
local function __return__macro(...)
  local __args57 = unstash({...})
  return join({"%return"}, __args57)
end
setenv("return", {
  _stash = true,
  macro = __return__macro
})
local function __while__macro(c, ...)
  local ____r285 = unstash({...})
  local __c5 = destash33(c, ____r285)
  local ____id132 = ____r285
  local __body64 = cut(____id132, 0)
  return join({"%while", __c5}, __body64)
end
setenv("while", {
  _stash = true,
  macro = __while__macro
})
local function __do__macro(...)
  local __body66 = unstash({...})
  return join({"%do"}, __body66)
end
setenv("do", {
  _stash = true,
  macro = __do__macro
})
local function __get__macro(...)
  local __args59 = unstash({...})
  return join({"%get"}, __args59)
end
setenv("get", {
  _stash = true,
  macro = __get__macro
})
local function __idx__macro(...)
  local __args61 = unstash({...})
  return join({"%idx"}, __args61)
end
setenv("idx", {
  _stash = true,
  macro = __idx__macro
})
local function __new__macro(...)
  local __args63 = unstash({...})
  return join({"%new"}, __args63)
end
setenv("new", {
  _stash = true,
  macro = __new__macro
})
local function __typeof__macro(...)
  local __args65 = unstash({...})
  return join({"%typeof"}, __args65)
end
setenv("typeof", {
  _stash = true,
  macro = __typeof__macro
})
local function __error__macro(...)
  local __args67 = unstash({...})
  return join({"%error"}, __args67)
end
setenv("error", {
  _stash = true,
  macro = __error__macro
})
local function __throw__macro(...)
  local __args69 = unstash({...})
  return join({"%throw"}, __args69)
end
setenv("throw", {
  _stash = true,
  macro = __throw__macro
})
local function __raise__macro(...)
  local __args71 = unstash({...})
  return join({"%throw"}, __args71)
end
setenv("raise", {
  _stash = true,
  macro = __raise__macro
})
local function __is__macro(...)
  local __args73 = unstash({...})
  local ____x886 = object({"target", join({"="}, __args73)})
  ____x886.py = join({"%is"}, __args73)
  return ____x886
end
setenv("is", {
  _stash = true,
  macro = __is__macro
})
local function __in__macro(...)
  local __args75 = unstash({...})
  return join({"%in"}, __args75)
end
setenv("in", {
  _stash = true,
  macro = __in__macro
})
local function __as__macro(...)
  local __args77 = unstash({...})
  return join({"%as"}, __args77)
end
setenv("as", {
  _stash = true,
  macro = __as__macro
})
local function ___37expand_case__macro(x, ...)
  local ____r287 = unstash({...})
  local __x904 = destash33(x, ____r287)
  local ____id135 = ____r287
  local __body68 = cut(____id135, 0)
  local __e60 = nil
  if atom63(__x904) then
    __e60 = {__x904}
  else
    __e60 = __x904
  end
  local ____id136 = __e60
  local __a27 = has(____id136, 1)
  local __bs25 = cut(____id136, 1)
  local __e61 = nil
  if none63(__bs25) then
    __e61 = {{"%literal"}}
  else
    __e61 = __bs25
  end
  return join({"%block", __a27}, __e61, __body68)
end
setenv("%expand-case", {
  _stash = true,
  macro = ___37expand_case__macro
})
local function ___37cases__macro(...)
  local __args79 = unstash({...})
  if none63(__args79) then
    return {"do"}
  else
    if one63(__args79) then
      return join({"%expand-case"}, hd(__args79))
    else
      local __r290 = unique("r")
      return join({"with", __r290, "nil"}, map(function (__x924)
        local ____id138 = __x924
        local __x925 = has(____id138, 1)
        local __body70 = cut(____id138, 1)
        return {"%expand-case", __x925, {"%set", __r290, join({"%do"}, __body70)}}
      end, almost(__args79)), {join({"%expand-case"}, last(__args79))})
    end
  end
end
setenv("%cases", {
  _stash = true,
  macro = ___37cases__macro
})
local function __try__macro(x, ...)
  local ____r293 = unstash({...})
  local __x946 = destash33(x, ____r293)
  local ____id143 = ____r293
  local __cases1 = cut(____id143, 0)
  local __fin1 = {"finally"}
  local ____o28 = __cases1
  local ____i51 = nil
  for ____i51 in next, ____o28 do
    local __x948 = ____o28[____i51]
    if hd63(__x948, "finally") then
      __fin1 = __x948
    end
  end
  local __forms7 = {}
  local ____x951 = __cases1
  local ____i52 = 0
  while ____i52 < _35(____x951) do
    local ____id144 = ____x951[____i52 + 1]
    local __x952 = has(____id144, 1)
    local __body74 = cut(____id144, 1)
    if __x952 == "finally" then
    else
      if __x952 == "except" and has(__body74, 1) == "as" then
        local ____id145 = __body74
        local __kind2 = has(____id145, 1)
        local ___1 = has(____id145, 2)
        local __name31 = has(____id145, 3)
        local __body75 = cut(____id145, 3)
        add(__forms7, join({{__x952, {"%as", __kind2, __name31}}}, __body75))
      else
        if __x952 == "except" then
          local ____id146 = __body74
          local __kind3 = has(____id146, 1)
          local __body76 = cut(____id146, 1)
          add(__forms7, join({{__x952, __kind3}}, __body76))
        else
          error("Unknown try clause")
        end
      end
    end
    ____i52 = ____i52 + 1
  end
  return join({"%cases", {"try", __x946}}, __forms7, {__fin1})
end
setenv("try", {
  _stash = true,
  macro = __try__macro
})
local function __errsafe__macro(x, _else)
  if nil63(_else) then
    _else = "nil"
  end
  local __ok17 = unique("ok")
  local __v41 = unique("v")
  return {"let", {{__ok17, __v41}, {"guard", x}}, {"if", __ok17, __v41, _else}}
end
setenv("errsafe", {
  _stash = true,
  macro = __errsafe__macro
})
local function __dbg__macro()
  local ____x975 = object({"target", {"do"}})
  ____x975.py = {"do", {"import", "pdb"}, {{"idx", "pdb", "set-trace"}}}
  return ____x975
end
setenv("dbg", {
  _stash = true,
  macro = __dbg__macro
})
local function __see__macro(form)
  local __form10 = expand(form)
  print(compile(expand({"%set", "lumen-result", __form10})))
  return __form10
end
setenv("see", {
  _stash = true,
  macro = __see__macro
})
