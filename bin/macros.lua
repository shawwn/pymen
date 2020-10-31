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
  local __args1 = unstash({...})
  return join({"%do"}, map(function (__x8)
    local ____id1 = __x8
    local __lh1 = has(____id1, 1)
    local __rh1 = has(____id1, 2)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has" then
      return {"%set", join({"%get"}, tl(__lh1)), __rh1}
    else
      return {"%set", __lh1, __rh1}
    end
  end, pair(__args1)))
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
  local __body2 = unstash({...})
  if one63(__body2) and (hd63(__body2, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_args"
  else
    if _35(__body2) > 2 and (__body2[2] == "for" and __body2[4] == "in") then
      local ____id5 = __body2
      local __expr2 = has(____id5, 1)
      local __body3 = cut(____id5, 1)
      local __comps1 = {}
      local __cond1 = nil
      while _35(__body3) > 2 and (__body3[1] == "for" and __body3[3] == "in") do
        local ____id6 = __body3
        local ___for1 = has(____id6, 1)
        local __names1 = has(____id6, 2)
        local ___in1 = has(____id6, 3)
        local __l2 = has(____id6, 4)
        local __body12 = cut(____id6, 4)
        add(__comps1, {__names1, __l2})
        __body3 = __body12
      end
      if hd(__body3) == "if" then
        local ____id7 = __body3
        local ___if1 = has(____id7, 1)
        local __expr3 = has(____id7, 2)
        __cond1 = __expr3
      end
      return {"%list", __expr2, __comps1, __cond1}
    else
      local __x35 = unique("x")
      local __l3 = {}
      local __forms1 = {}
      local ____o1 = __body2
      local __k2 = nil
      for __k2 in next, ____o1 do
        local __v1 = ____o1[__k2]
        if number63(__k2) then
          __l3[__k2] = __v1
        else
          add(__forms1, {"%set", {"%get", __x35, {"quote", __k2}}, __v1})
        end
      end
      if some63(__forms1) then
        return join({"let", __x35, {"object", join({"%array"}, __l3)}}, __forms1, {__x35})
      else
        return join({"%array"}, __l3)
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
  local ____r13 = unstash({...})
  local __expr5 = destash33(expr, ____r13)
  local ____id10 = ____r13
  local __e12 = nil
  if nil63(has(____id10, "cmp")) then
    __e12 = "="
  else
    __e12 = has(____id10, "cmp")
  end
  local __cmp1 = __e12
  local __clauses1 = cut(____id10, 0)
  local __x59 = unique("x")
  local __eq1 = function (_)
    return {__cmp1, _, __x59}
  end
  local __cl1 = function (__x61)
    local ____id11 = __x61
    local __a1 = has(____id11, 1)
    local __b1 = has(____id11, 2)
    if nil63(__b1) then
      return {__a1}
    else
      if string63(__a1) or number63(__a1) then
        return {__eq1(__a1), __b1}
      else
        if list63(__a1) and hd63(__a1, "quote") then
          return {__eq1(__a1), __b1}
        else
          if one63(__a1) then
            return {__eq1(hd(__a1)), __b1}
          else
            if _35(__a1) > 1 then
              return {join({"or"}, map(__eq1, __a1)), __b1}
            end
          end
        end
      end
    end
  end
  return {"let", __x59, __expr5, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end
setenv("case", {
  _stash = true,
  macro = __case__macro
})
local function __of__macro(x, ...)
  local ____r17 = unstash({...})
  local __x74 = destash33(x, ____r17)
  local ____id13 = ____r17
  local __values1 = cut(____id13, 0)
  return join({"case", __x74, __values1, true, false}, props(__values1))
end
setenv("of", {
  _stash = true,
  macro = __of__macro
})
local function __when__macro(cond, ...)
  local ____r19 = unstash({...})
  local __cond3 = destash33(cond, ____r19)
  local ____id15 = ____r19
  local __body5 = cut(____id15, 0)
  return {"%if", __cond3, join({"%do"}, __body5)}
end
setenv("when", {
  _stash = true,
  macro = __when__macro
})
local function __unless__macro(cond, ...)
  local ____r21 = unstash({...})
  local __cond5 = destash33(cond, ____r21)
  local ____id17 = ____r21
  local __body7 = cut(____id17, 0)
  return {"%if", {"%not", __cond5}, join({"%do"}, __body7)}
end
setenv("unless", {
  _stash = true,
  macro = __unless__macro
})
local function __obj__macro(...)
  local __body10 = unstash({...})
  if one63(__body10) and (hd63(__body10, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_keys"
  else
    if _35(__body10) > 2 and (__body10[2] == "for" and __body10[4] == "in") then
      local ____id21 = __body10
      local __expr8 = has(____id21, 1)
      local __body111 = cut(____id21, 1)
      local __comps3 = {}
      local __cond7 = nil
      while _35(__body111) > 2 and (__body111[1] == "for" and __body111[3] == "in") do
        local ____id22 = __body111
        local ___for3 = has(____id22, 1)
        local __names3 = has(____id22, 2)
        local ___in3 = has(____id22, 3)
        local __l5 = has(____id22, 4)
        local __body14 = cut(____id22, 4)
        add(__comps3, {__names3, __l5})
        __body111 = __body14
      end
      if hd(__body111) == "if" then
        local ____id23 = __body111
        local ___if3 = has(____id23, 1)
        local __expr9 = has(____id23, 2)
        __cond7 = __expr9
      end
      if list63(__expr8) and hd63(__expr8, ",") then
        __expr8 = join({":"}, tl(__expr8))
      end
      local ____x98 = object({"%list", __expr8, __comps3, __cond7})
      ____x98.kind = "object"
      return ____x98
    else
      return join({"%object"}, mapo(function (x)
        return x
      end, __body10))
    end
  end
end
setenv("obj", {
  _stash = true,
  macro = __obj__macro
})
local function __let__macro(bs, ...)
  local ____r25 = unstash({...})
  local __bs11 = destash33(bs, ____r25)
  local ____id28 = ____r25
  local __body131 = cut(____id28, 0)
  if atom63(__bs11) or hd63(__bs11, ",") then
    return join({"let", {__bs11, hd(__body131)}}, tl(__body131))
  else
    if none63(__bs11) then
      return join({"%do"}, __body131)
    else
      local ____id29 = __bs11
      local __lh3 = has(____id29, 1)
      local __rh3 = has(____id29, 2)
      local __bs21 = cut(____id29, 2)
      local ____id30 = bind(__lh3, __rh3)
      local __id31 = has(____id30, 1)
      local __val1 = has(____id30, 2)
      local __bs12 = cut(____id30, 2)
      local __renames1 = {}
      if not id_literal63(__id31) then
        local __id121 = unique(__id31)
        __renames1 = {__id31, __id121}
        __id31 = __id121
      end
      return {"%do", {"%local", __id31, __val1}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body131)}}
    end
  end
end
setenv("let", {
  _stash = true,
  macro = __let__macro
})
local function __with__macro(x, v, ...)
  local ____r27 = unstash({...})
  local __x127 = destash33(x, ____r27)
  local __v3 = destash33(v, ____r27)
  local ____id33 = ____r27
  local __body15 = cut(____id33, 0)
  if __v3 == "as" then
    return join({"%with", {"%as", __x127, hd(__body15)}}, tl(__body15))
  else
    if not atom63(__x127) or has(__body15, "async") then
      return join({"%with", __x127, __v3}, __body15)
    else
      return join({"let", {__x127, __v3}}, __body15, {__x127})
    end
  end
end
setenv("with", {
  _stash = true,
  macro = __with__macro
})
local function __let_when__macro(x, v, ...)
  local ____r29 = unstash({...})
  local __x142 = destash33(x, ____r29)
  local __v5 = destash33(v, ____r29)
  local ____id35 = ____r29
  local __body17 = cut(____id35, 0)
  local __y1 = unique("y")
  return {"let", __y1, __v5, {"when", {"yes", __y1}, join({"let", {__x142, __y1}}, __body17)}}
end
setenv("let-when", {
  _stash = true,
  macro = __let_when__macro
})
local function __define_macro__macro(name, args, ...)
  local ____r31 = unstash({...})
  local __name1 = destash33(name, ____r31)
  local __args3 = destash33(args, ____r31)
  local ____id38 = ____r31
  local __body19 = cut(____id38, 0)
  local __id39 = unique(__name1 .. "--macro")
  local ____x156 = object({"setenv", {"quote", __name1}})
  ____x156.macro = __id39
  local __form1 = {"do", join({"define", __id39, __args3}, __body19), ____x156}
  eval(__form1)
  return __form1
end
setenv("define-macro", {
  _stash = true,
  macro = __define_macro__macro
})
local function __define_special__macro(name, args, ...)
  local ____r33 = unstash({...})
  local __name3 = destash33(name, ____r33)
  local __args5 = destash33(args, ____r33)
  local ____id42 = ____r33
  local __body21 = cut(____id42, 0)
  local __id43 = unique(__name3 .. "--special")
  local ____x166 = object({"setenv", {"quote", __name3}})
  ____x166.special = __id43
  local __form3 = {"do", join({"define", __id43, __args5}, __body21), join(____x166, props(__body21))}
  eval(__form3)
  return __form3
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
  local ____x171 = object({"setenv", {"quote", name}})
  ____x171.symbol = {"quote", expansion}
  return ____x171
end
setenv("define-symbol", {
  _stash = true,
  macro = __define_symbol__macro
})
local function __define_reader__macro(__x180, ...)
  local ____r37 = unstash({...})
  local ____x180 = destash33(__x180, ____r37)
  local ____id46 = ____x180
  local __char1 = has(____id46, 1)
  local __s1 = has(____id46, 2)
  local ____id47 = ____r37
  local __body23 = cut(____id47, 0)
  return {"%set", {"%get", "read-table", __char1}, join({"fn", {__s1}}, __body23)}
end
setenv("define-reader", {
  _stash = true,
  macro = __define_reader__macro
})
local function __define__macro(name, x, ...)
  local ____r39 = unstash({...})
  local __name5 = destash33(name, ____r39)
  local __x191 = destash33(x, ____r39)
  local ____id49 = ____r39
  local __body25 = cut(____id49, 0)
  setenv(__name5, {
    _stash = true,
    variable = true
  })
  if some63(__body25) then
    return join({"%local-function", __name5}, bind42(__x191, __body25), props(__body25))
  else
    return join({"%local", __name5, __x191}, props(__body25))
  end
end
setenv("define", {
  _stash = true,
  macro = __define__macro
})
local function __define_global__macro(name, x, ...)
  local ____r41 = unstash({...})
  local __name7 = destash33(name, ____r41)
  local __x199 = destash33(x, ____r41)
  local ____id51 = ____r41
  local __body27 = cut(____id51, 0)
  setenv(__name7, {
    _stash = true,
    toplevel = true,
    variable = true
  })
  if some63(__body27) then
    return join({"%global-function", __name7}, bind42(__x199, __body27), props(__body27))
  else
    return join({"set", __name7, __x199}, props(__body27))
  end
end
setenv("define-global", {
  _stash = true,
  macro = __define_global__macro
})
local function __get_value__macro(x)
  local ____x206 = object({"setenv", x})
  ____x206.toplevel = true
  return {"has", ____x206, {"quote", "value"}}
end
setenv("get-value", {
  _stash = true,
  macro = __get_value__macro
})
local function __define_constant__macro(name, x)
  local ____x217 = object({"setenv", {"quote", name}})
  ____x217.toplevel = true
  ____x217.value = either(x, {"get-value", {"quote", name}})
  return {"%do", ____x217, {"define-symbol", name, {"get-value", {"quote", name}}}}
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
  local ____r50 = unstash({...})
  local __x247 = destash33(x, ____r50)
  local ____id53 = ____r50
  local __body29 = cut(____id53, 0)
  local __ok1 = unique("ok")
  local __r51 = unique("r")
  local ____x248 = object({"target", {"try", __x247, join({"finally"}, __body29)}})
  ____x248.lua = join({"let", {{__ok1, __r51}, {"guard", __x247}}}, __body29, {{"if", __ok1, __r51, {"throw", __r51}}})
  return ____x248
end
setenv("after", {
  _stash = true,
  macro = __after__macro
})
local function __with_frame__macro(...)
  local __body31 = unstash({...})
  return {"%do", {"add", "environment", {"obj"}}, {"after", join({"%do"}, __body31), {"drop", "environment"}}}
end
setenv("with-frame", {
  _stash = true,
  macro = __with_frame__macro
})
local function __with_values__macro(...)
  local __body33 = unstash({...})
  local __forms3 = {}
  local ____o3 = __body33
  local __k5 = nil
  for __k5 in next, ____o3 do
    local __v7 = ____o3[__k5]
    if not number63(__k5) then
      local ____x278 = object({"setenv", {"quote", __k5}})
      ____x278.value = __v7
      add(__forms3, ____x278)
    end
  end
  return join({"with-frame"}, __forms3)
end
setenv("with-values", {
  _stash = true,
  macro = __with_values__macro
})
local function __with_bindings__macro(__x286, ...)
  local ____r53 = unstash({...})
  local ____x286 = destash33(__x286, ____r53)
  local ____id56 = ____x286
  local __names5 = has(____id56, 1)
  local ____id57 = ____r53
  local __body35 = cut(____id57, 0)
  local __x288 = unique("x")
  local ____x291 = object({"setenv", __x288})
  ____x291.variable = true
  return join({"with-frame", {"each", __x288, __names5, ____x291}}, __body35)
end
setenv("with-bindings", {
  _stash = true,
  macro = __with_bindings__macro
})
local function __let_macro__macro(definitions, ...)
  local ____r58 = unstash({...})
  local __definitions1 = destash33(definitions, ____r58)
  local ____id59 = ____r58
  local __body37 = cut(____id59, 0)
  add(environment, {})
  local ____id60 = {xpcall(function ()
    map(function (m)
      return macroexpand(join({"define-macro"}, m))
    end, __definitions1)
    return join({"%do"}, macroexpand(__body37))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e13 = nil
      if string63(m) then
        __e13 = clip(m, search(m, ": ") + 2)
      else
        local __e14 = nil
        if nil63(m) then
          __e14 = ""
        else
          __e14 = str(m)
        end
        __e13 = __e14
      end
      return {
        stack = debug.traceback(),
        message = __e13
      }
    end
  end)}
  local ____ok3 = has(____id60, 1)
  local ____r59 = has(____id60, 2)
  drop(environment)
  if ____ok3 then
    return ____r59
  else
    error(____r59)
  end
end
setenv("let-macro", {
  _stash = true,
  macro = __let_macro__macro
})
local function __let_symbol__macro(expansions, ...)
  local ____r65 = unstash({...})
  local __expansions1 = destash33(expansions, ____r65)
  local ____id63 = ____r65
  local __body39 = cut(____id63, 0)
  add(environment, {})
  local ____id64 = {xpcall(function ()
    map(function (__x309)
      local ____id65 = __x309
      local __name9 = has(____id65, 1)
      local __exp1 = has(____id65, 2)
      return macroexpand({"define-symbol", __name9, __exp1})
    end, pair(__expansions1))
    return join({"%do"}, macroexpand(__body39))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e15 = nil
      if string63(m) then
        __e15 = clip(m, search(m, ": ") + 2)
      else
        local __e16 = nil
        if nil63(m) then
          __e16 = ""
        else
          __e16 = str(m)
        end
        __e15 = __e16
      end
      return {
        stack = debug.traceback(),
        message = __e15
      }
    end
  end)}
  local ____ok5 = has(____id64, 1)
  local ____r66 = has(____id64, 2)
  drop(environment)
  if ____ok5 then
    return ____r66
  else
    error(____r66)
  end
end
setenv("let-symbol", {
  _stash = true,
  macro = __let_symbol__macro
})
local function __let_unique__macro(names, ...)
  local ____r70 = unstash({...})
  local __names7 = destash33(names, ____r70)
  local ____id67 = ____r70
  local __body41 = cut(____id67, 0)
  local __bs3 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names7)
  return join({"let", apply(join, __bs3)}, __body41)
end
setenv("let-unique", {
  _stash = true,
  macro = __let_unique__macro
})
local function __fn__macro(args, ...)
  local ____r73 = unstash({...})
  local __args11 = destash33(args, ____r73)
  local ____id69 = ____r73
  local __body43 = cut(____id69, 0)
  return join({"%function"}, bind42(__args11, __body43), props(__body43))
end
setenv("fn", {
  _stash = true,
  macro = __fn__macro
})
local function __apply__macro(f, ...)
  local ____r75 = unstash({...})
  local __f1 = destash33(f, ____r75)
  local ____id71 = ____r75
  local __args13 = cut(____id71, 0)
  if _35(__args13) > 1 then
    return {"%call", "apply", __f1, {"join", join({"list"}, almost(__args13)), last(__args13), join({"list"}, props(__args13))}}
  else
    if props63(__args13) then
      return {"%call", "apply", __f1, join({"join"}, __args13, {join({"list"}, props(__args13))})}
    else
      return join({"%call", "apply", __f1}, __args13)
    end
  end
end
setenv("apply", {
  _stash = true,
  macro = __apply__macro
})
local function __guard__macro(expr)
  local ____x376 = object({"target", {{"%function", join(), {"%try", {"list", true, expr}}}}})
  local ____x388 = object({"obj"})
  ____x388.stack = {{"idx", "debug", "traceback"}}
  ____x388.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
  ____x376.lua = {"list", {"xpcall", {"%function", join(), expr}, {"%function", {"m"}, {"if", {"obj?", "m"}, "m", ____x388}}}}
  return {"let-macro", {{"%return", "args", {"error", "\"Can't return from guard\""}}}, ____x376}
end
setenv("guard", {
  _stash = true,
  macro = __guard__macro
})
local function __each__macro(x, t, ...)
  local ____r79 = unstash({...})
  local __x417 = destash33(x, ____r79)
  local __t1 = destash33(t, ____r79)
  local ____id74 = ____r79
  local __body45 = cut(____id74, 0)
  local __o5 = unique("o")
  local __n5 = unique("n")
  local __i5 = unique("i")
  local __e17 = nil
  if atom63(__x417) then
    __e17 = {__i5, __x417}
  else
    local __e18 = nil
    if _35(__x417) > 1 then
      __e18 = __x417
    else
      __e18 = {__i5, hd(__x417)}
    end
    __e17 = __e18
  end
  local ____id75 = __e17
  local __k7 = has(____id75, 1)
  local __v9 = has(____id75, 2)
  local ____x423 = object({"target", __o5})
  ____x423.py = {"indices", __o5}
  local __e19 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e19 = __body45
  else
    __e19 = {join({"let", __k7, {"if", {"numeric?", __k7}, {"parseInt", __k7}, __k7}}, __body45)}
  end
  return {"let", {__o5, __t1, __k7, "nil"}, join({"%for", ____x423, __k7}, props(__body45), {join({"let", {__v9, {"%get", __o5, __k7}}}, __e19)})}
end
setenv("each", {
  _stash = true,
  macro = __each__macro
})
local function __for__macro(i, to, ...)
  local ____r81 = unstash({...})
  local __i7 = destash33(i, ____r81)
  local __to1 = destash33(to, ____r81)
  local ____id77 = ____r81
  local __body47 = cut(____id77, 0)
  if __to1 == "in" then
    return join({"%for", hd(__body47), __i7, join({"%do"}, tl(__body47))}, props(__body47))
  else
    return {"let", __i7, 0, join({"while", {"<", __i7, __to1}}, __body47, {{"inc", __i7}})}
  end
end
setenv("for", {
  _stash = true,
  macro = __for__macro
})
local function __step__macro(v, t, ...)
  local ____r83 = unstash({...})
  local __v11 = destash33(v, ____r83)
  local __t3 = destash33(t, ____r83)
  local ____id79 = ____r83
  local __body49 = cut(____id79, 0)
  local __x460 = unique("x")
  local __i9 = unique("i")
  return {"let", {__x460, __t3}, {"for", __i9, {"#", __x460}, join({"let", {__v11, {"at", __x460, __i9}}}, __body49)}}
end
setenv("step", {
  _stash = true,
  macro = __step__macro
})
local function __set_of__macro(...)
  local __xs1 = unstash({...})
  local __l7 = {}
  local ____o7 = __xs1
  local ____i11 = nil
  for ____i11 in next, ____o7 do
    local __x472 = ____o7[____i11]
    __l7[__x472] = true
  end
  return join({"obj"}, __l7)
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
  local ____r89 = unstash({...})
  local __a3 = destash33(a, ____r89)
  local ____id81 = ____r89
  local __bs5 = cut(____id81, 0)
  return {"set", __a3, join({"join", __a3}, __bs5)}
end
setenv("join!", {
  _stash = true,
  macro = __join33__macro
})
local function __cat33__macro(a, ...)
  local ____r91 = unstash({...})
  local __a5 = destash33(a, ____r91)
  local ____id83 = ____r91
  local __bs7 = cut(____id83, 0)
  return {"set", __a5, join({"cat", __a5}, __bs7)}
end
setenv("cat!", {
  _stash = true,
  macro = __cat33__macro
})
local function __inc__macro(n, by)
  local __e20 = nil
  if nil63(by) then
    __e20 = 1
  else
    __e20 = by
  end
  return {"set", n, {"+", n, __e20}}
end
setenv("inc", {
  _stash = true,
  macro = __inc__macro
})
local function __dec__macro(n, by)
  local __e21 = nil
  if nil63(by) then
    __e21 = 1
  else
    __e21 = by
  end
  return {"set", n, {"-", n, __e21}}
end
setenv("dec", {
  _stash = true,
  macro = __dec__macro
})
local function __with_indent__macro(form)
  local __x505 = unique("x")
  return {"%do", {"inc", "indent-level"}, {"with", __x505, form, {"dec", "indent-level"}}}
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
  local __body51 = unstash({...})
  return eval(join({"%do"}, __body51))
end
setenv("when-compiling", {
  _stash = true,
  macro = __when_compiling__macro
})
local function __during_compilation__macro(...)
  local __body53 = unstash({...})
  local __form5 = join({"%do"}, __body53)
  eval(__form5)
  return __form5
end
setenv("during-compilation", {
  _stash = true,
  macro = __during_compilation__macro
})
local function __def__macro(name, ...)
  local ____r101 = unstash({...})
  local __name11 = destash33(name, ____r101)
  local ____id85 = ____r101
  local __body55 = cut(____id85, 0)
  return join({"define-global", __name11}, __body55)
end
setenv("def", {
  _stash = true,
  macro = __def__macro
})
local function __mac__macro(name, ...)
  local ____r103 = unstash({...})
  local __name13 = destash33(name, ____r103)
  local ____id87 = ____r103
  local __body57 = cut(____id87, 0)
  return join({"define-macro", __name13}, __body57)
end
setenv("mac", {
  _stash = true,
  macro = __mac__macro
})
local function __defconst__macro(name, ...)
  local ____r105 = unstash({...})
  local __name15 = destash33(name, ____r105)
  local ____id89 = ____r105
  local __value1 = cut(____id89, 0)
  return join({"def", __name15}, __value1)
end
setenv("defconst", {
  _stash = true,
  macro = __defconst__macro
})
local function __undefined63__macro(name)
  local ____x569 = object({"target"})
  ____x569.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x569.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x569.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x569
end
setenv("undefined?", {
  _stash = true,
  macro = __undefined63__macro
})
local function __defvar__macro(name, ...)
  local ____r109 = unstash({...})
  local __name17 = destash33(name, ____r109)
  local ____id91 = ____r109
  local __value3 = cut(____id91, 0)
  local ____x587 = object({"target"})
  ____x587.py = {"global", __name17}
  return {"when", {"undefined?", __name17}, ____x587, join({"defconst", __name17}, __value3)}
end
setenv("defvar", {
  _stash = true,
  macro = __defvar__macro
})
local function __async__macro(keyword, ...)
  local ____r111 = unstash({...})
  local __keyword1 = destash33(keyword, ____r111)
  local ____id93 = ____r111
  local __body59 = cut(____id93, 0)
  local ____x593 = object({__keyword1})
  ____x593.async = true
  return join(____x593, __body59)
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
  local ____r117 = unstash({...})
  local __a7 = destash33(a, ____r117)
  local ____id95 = ____r117
  local __bs9 = cut(____id95, 0)
  if nil63(__a7) then
    return ""
  else
    if none63(__bs9) then
      return __a7
    else
      if one63(__bs9) then
        local ____x619 = object({"target", join({"%cat", __a7}, __bs9)})
        ____x619.py = join({"%call", "cat", __a7}, __bs9)
        return ____x619
      else
        local ____x622 = object({"target", {"%cat", __a7, join({"cat"}, __bs9)}})
        ____x622.py = join({"%call", "cat", __a7}, __bs9)
        return ____x622
      end
    end
  end
end
setenv("cat", {
  _stash = true,
  macro = __cat__macro
})
local function ___43__macro(...)
  local __args15 = unstash({...})
  if none63(__args15) then
    return 0
  else
    if one63(__args15) then
      return hd(__args15)
    else
      return join({"%add"}, __args15)
    end
  end
end
setenv("+", {
  _stash = true,
  macro = ___43__macro
})
local function _____macro(...)
  local __args17 = unstash({...})
  if none63(__args17) then
    return 0
  else
    if one63(__args17) then
      return {"%unm", hd(__args17)}
    else
      return join({"%sub"}, __args17)
    end
  end
end
setenv("-", {
  _stash = true,
  macro = _____macro
})
local function ___42__macro(...)
  local __args19 = unstash({...})
  if none63(__args19) then
    return 1
  else
    if one63(__args19) then
      return hd(__args19)
    else
      return join({"%mul"}, __args19)
    end
  end
end
setenv("*", {
  _stash = true,
  macro = ___42__macro
})
local function ___47__macro(...)
  local __args21 = unstash({...})
  if none63(__args21) then
    return 1
  else
    if one63(__args21) then
      return hd(__args21)
    else
      return join({"%div"}, __args21)
    end
  end
end
setenv("/", {
  _stash = true,
  macro = ___47__macro
})
local function ___4747__macro(...)
  local __args23 = unstash({...})
  if none63(__args23) then
    return 1
  else
    if one63(__args23) then
      return hd(__args23)
    else
      return join({"%idiv"}, __args23)
    end
  end
end
setenv("//", {
  _stash = true,
  macro = ___4747__macro
})
local function ___37__macro(...)
  local __args25 = unstash({...})
  if none63(__args25) then
    return 0
  else
    if one63(__args25) then
      return hd(__args25)
    else
      return join({"%mod"}, __args25)
    end
  end
end
setenv("%", {
  _stash = true,
  macro = ___37__macro
})
local function ___60__macro(a, ...)
  local ____r119 = unstash({...})
  local __a9 = destash33(a, ____r119)
  local ____id97 = ____r119
  local __bs111 = cut(____id97, 0)
  if none63(__bs111) then
    return true
  else
    if one63(__bs111) then
      return join({"%lt", __a9}, __bs111)
    else
      return {"%and", {"%lt", __a9, hd(__bs111)}, join({"<"}, __bs111)}
    end
  end
end
setenv("<", {
  _stash = true,
  macro = ___60__macro
})
local function ___6061__macro(a, ...)
  local ____r121 = unstash({...})
  local __a11 = destash33(a, ____r121)
  local ____id99 = ____r121
  local __bs13 = cut(____id99, 0)
  if none63(__bs13) then
    return true
  else
    if one63(__bs13) then
      return join({"%le", __a11}, __bs13)
    else
      return {"%and", {"%le", __a11, hd(__bs13)}, join({"<="}, __bs13)}
    end
  end
end
setenv("<=", {
  _stash = true,
  macro = ___6061__macro
})
local function ___61__macro(a, ...)
  local ____r123 = unstash({...})
  local __a13 = destash33(a, ____r123)
  local ____id101 = ____r123
  local __bs15 = cut(____id101, 0)
  if none63(__bs15) then
    return true
  else
    if one63(__bs15) then
      return join({"%eq", __a13}, __bs15)
    else
      return {"%and", {"%eq", __a13, hd(__bs15)}, join({"="}, __bs15)}
    end
  end
end
setenv("=", {
  _stash = true,
  macro = ___61__macro
})
local function ___6261__macro(a, ...)
  local ____r125 = unstash({...})
  local __a15 = destash33(a, ____r125)
  local ____id103 = ____r125
  local __bs17 = cut(____id103, 0)
  if none63(__bs17) then
    return true
  else
    if one63(__bs17) then
      return join({"%ge", __a15}, __bs17)
    else
      return {"%and", {"%ge", __a15, hd(__bs17)}, join({">="}, __bs17)}
    end
  end
end
setenv(">=", {
  _stash = true,
  macro = ___6261__macro
})
local function ___62__macro(a, ...)
  local ____r127 = unstash({...})
  local __a17 = destash33(a, ____r127)
  local ____id105 = ____r127
  local __bs19 = cut(____id105, 0)
  if none63(__bs19) then
    return true
  else
    if one63(__bs19) then
      return join({"%gt", __a17}, __bs19)
    else
      return {"%and", {"%gt", __a17, hd(__bs19)}, join({">"}, __bs19)}
    end
  end
end
setenv(">", {
  _stash = true,
  macro = ___62__macro
})
local function __not__macro(...)
  local __args27 = unstash({...})
  if none63(__args27) then
    return false
  else
    if one63(__args27) then
      return join({"%not"}, __args27)
    else
      return {"%and", {"%not", hd(__args27)}, join({"not"}, tl(__args27))}
    end
  end
end
setenv("not", {
  _stash = true,
  macro = __not__macro
})
local function __and__macro(a, ...)
  local ____r129 = unstash({...})
  local __a19 = destash33(a, ____r129)
  local ____id107 = ____r129
  local __bs211 = cut(____id107, 0)
  if nil63(__a19) then
    return true
  else
    if none63(__bs211) then
      return __a19
    else
      if one63(__bs211) then
        return join({"%and", __a19}, __bs211)
      else
        return {"%and", __a19, join({"and"}, __bs211)}
      end
    end
  end
end
setenv("and", {
  _stash = true,
  macro = __and__macro
})
local function __or__macro(a, ...)
  local ____r131 = unstash({...})
  local __a21 = destash33(a, ____r131)
  local ____id109 = ____r131
  local __bs23 = cut(____id109, 0)
  if nil63(__a21) then
    return false
  else
    if none63(__bs23) then
      return __a21
    else
      if one63(__bs23) then
        return join({"%or", __a21}, __bs23)
      else
        return {"%or", __a21, join({"or"}, __bs23)}
      end
    end
  end
end
setenv("or", {
  _stash = true,
  macro = __or__macro
})
local function __break__macro(...)
  local __args29 = unstash({...})
  return join({"%break"}, __args29)
end
setenv("break", {
  _stash = true,
  macro = __break__macro
})
local function __return__macro(...)
  local __args31 = unstash({...})
  return join({"%return"}, __args31)
end
setenv("return", {
  _stash = true,
  macro = __return__macro
})
local function __while__macro(c, ...)
  local ____r133 = unstash({...})
  local __c1 = destash33(c, ____r133)
  local ____id1111 = ____r133
  local __body61 = cut(____id1111, 0)
  return join({"%while", __c1}, __body61)
end
setenv("while", {
  _stash = true,
  macro = __while__macro
})
local function __do__macro(...)
  local __body63 = unstash({...})
  return join({"%do"}, __body63)
end
setenv("do", {
  _stash = true,
  macro = __do__macro
})
local function __get__macro(...)
  local __args33 = unstash({...})
  return join({"%get"}, __args33)
end
setenv("get", {
  _stash = true,
  macro = __get__macro
})
local function __idx__macro(...)
  local __args35 = unstash({...})
  return join({"%idx"}, __args35)
end
setenv("idx", {
  _stash = true,
  macro = __idx__macro
})
local function __new__macro(...)
  local __args37 = unstash({...})
  return join({"%new"}, __args37)
end
setenv("new", {
  _stash = true,
  macro = __new__macro
})
local function __typeof__macro(...)
  local __args39 = unstash({...})
  return join({"%typeof"}, __args39)
end
setenv("typeof", {
  _stash = true,
  macro = __typeof__macro
})
local function __error__macro(...)
  local __args41 = unstash({...})
  return join({"%error"}, __args41)
end
setenv("error", {
  _stash = true,
  macro = __error__macro
})
local function __throw__macro(...)
  local __args43 = unstash({...})
  return join({"%throw"}, __args43)
end
setenv("throw", {
  _stash = true,
  macro = __throw__macro
})
local function __raise__macro(...)
  local __args45 = unstash({...})
  return join({"%throw"}, __args45)
end
setenv("raise", {
  _stash = true,
  macro = __raise__macro
})
local function __is__macro(...)
  local __args47 = unstash({...})
  local ____x777 = object({"target", join({"="}, __args47)})
  ____x777.py = join({"%is"}, __args47)
  return ____x777
end
setenv("is", {
  _stash = true,
  macro = __is__macro
})
local function __in__macro(...)
  local __args49 = unstash({...})
  return join({"%in"}, __args49)
end
setenv("in", {
  _stash = true,
  macro = __in__macro
})
local function __as__macro(...)
  local __args51 = unstash({...})
  return join({"%as"}, __args51)
end
setenv("as", {
  _stash = true,
  macro = __as__macro
})
local function ___37expand_case__macro(x, ...)
  local ____r135 = unstash({...})
  local __x795 = destash33(x, ____r135)
  local ____id114 = ____r135
  local __body65 = cut(____id114, 0)
  local __e22 = nil
  if atom63(__x795) then
    __e22 = {__x795}
  else
    __e22 = __x795
  end
  local ____id115 = __e22
  local __a23 = has(____id115, 1)
  local __bs25 = cut(____id115, 1)
  local __e23 = nil
  if none63(__bs25) then
    __e23 = {{"%literal"}}
  else
    __e23 = __bs25
  end
  return join({"%block", __a23}, __e23, __body65)
end
setenv("%expand-case", {
  _stash = true,
  macro = ___37expand_case__macro
})
local function ___37cases__macro(...)
  local __args53 = unstash({...})
  if none63(__args53) then
    return {"do"}
  else
    if one63(__args53) then
      return join({"%expand-case"}, hd(__args53))
    else
      local __r138 = unique("r")
      return join({"with", __r138, "nil"}, map(function (__x815)
        local ____id117 = __x815
        local __x816 = has(____id117, 1)
        local __body67 = cut(____id117, 1)
        return {"%expand-case", __x816, {"%set", __r138, join({"%do"}, __body67)}}
      end, almost(__args53)), {join({"%expand-case"}, last(__args53))})
    end
  end
end
setenv("%cases", {
  _stash = true,
  macro = ___37cases__macro
})
local function __try__macro(x, ...)
  local ____r141 = unstash({...})
  local __x837 = destash33(x, ____r141)
  local ____id122 = ____r141
  local __cases1 = cut(____id122, 0)
  local __fin1 = {"finally"}
  local ____o9 = __cases1
  local ____i14 = nil
  for ____i14 in next, ____o9 do
    local __x839 = ____o9[____i14]
    if hd63(__x839, "finally") then
      __fin1 = __x839
    end
  end
  local __forms7 = {}
  local ____x842 = __cases1
  local ____i15 = 0
  while ____i15 < _35(____x842) do
    local ____id123 = ____x842[____i15 + 1]
    local __x843 = has(____id123, 1)
    local __body71 = cut(____id123, 1)
    if __x843 == "finally" then
    else
      if __x843 == "except" and has(__body71, 1) == "as" then
        local ____id124 = __body71
        local __kind2 = has(____id124, 1)
        local ___1 = has(____id124, 2)
        local __name19 = has(____id124, 3)
        local __body72 = cut(____id124, 3)
        add(__forms7, join({{__x843, {"%as", __kind2, __name19}}}, __body72))
      else
        if __x843 == "except" then
          local ____id125 = __body71
          local __kind3 = has(____id125, 1)
          local __body73 = cut(____id125, 1)
          add(__forms7, join({{__x843, __kind3}}, __body73))
        else
          error("Unknown try clause")
        end
      end
    end
    ____i15 = ____i15 + 1
  end
  return join({"%cases", {"try", __x837}}, __forms7, {__fin1})
end
setenv("try", {
  _stash = true,
  macro = __try__macro
})
local function __errsafe__macro(x, _else)
  if nil63(_else) then
    _else = "nil"
  end
  local __ok7 = unique("ok")
  local __v13 = unique("v")
  return {"let", {{__ok7, __v13}, {"guard", x}}, {"if", __ok7, __v13, _else}}
end
setenv("errsafe", {
  _stash = true,
  macro = __errsafe__macro
})
local function __dbg__macro()
  local ____x866 = object({"target", {"do"}})
  ____x866.py = {"do", {"import", "pdb"}, {{"idx", "pdb", "set-trace"}}}
  return ____x866
end
setenv("dbg", {
  _stash = true,
  macro = __dbg__macro
})
local function __see__macro(form)
  local __form7 = expand(form)
  print(compile(expand({"%set", "lumen-result", __form7})))
  return __form7
end
setenv("see", {
  _stash = true,
  macro = __see__macro
})
