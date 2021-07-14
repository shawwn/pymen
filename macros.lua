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
function _G.get_place(place, setfn)
  local __place = macroexpand(place)
  if atom63(__place) or (hd63(__place, "%get") and nil63(getenv("%get", "place-expander")) or (hd63(__place, "%idx") and nil63(getenv("%idx", "place-expander")) or accessor_literal63(hd(tl(__place))))) then
    return setfn(__place, function (v)
      return {"%set", __place, v}
    end)
  else
    if hd63(__place, "has") and nil63(getenv("has", "place-expander")) then
      return setfn(__place, function (v)
        return {"%set", join({"%get"}, tl(__place)), v}
      end)
    else
      local __head = hd(__place)
      local __gf = getenv(__head, "place-expander")
      if __gf then
        return apply(__gf, join({setfn}, tl(__place), {}))
      else
        error(str(__place) .. (" is not a valid place expression: no place-expander for " .. __head))
      end
    end
  end
end
local function __let_place__macro(vars, place, ...)
  local ____r8 = unstash({...})
  local __vars1 = destash33(vars, ____r8)
  local __place2 = destash33(place, ____r8)
  local ____id1 = ____r8
  local __body1 = cut(____id1, 0)
  return {"get-place", __place2, join({"fn", __vars1}, __body1)}
end
setenv("let-place", {
  _stash = true,
  macro = __let_place__macro
})
local function __define_expander__macro(name, handler)
  local ____x13 = object({"setenv", {"quote", name}})
  ____x13["place-expander"] = handler
  local __form1 = ____x13
  eval(__form1)
  return __form1
end
setenv("define-expander", {
  _stash = true,
  macro = __define_expander__macro
})
function _G.define_setter(name, setter, setfn, args, vars)
  if none63(args) then
    local __vars2 = reverse(vars or {})
    return setfn(join({name}, __vars2), function (v)
      return apply(setter, join({v}, __vars2, {}))
    end)
  else
    local __v = hd(args)
    return define_setter(name, setter, setfn, tl(args), join({__v}, vars))
  end
end
local function __define_setter__macro(name, arglist, ...)
  local ____r14 = unstash({...})
  local __name1 = destash33(name, ____r14)
  local __arglist1 = destash33(arglist, ____r14)
  local ____id3 = ____r14
  local __body3 = cut(____id3, 0)
  local ____x29 = object({"setfn"})
  ____x29.rest = "args"
  return {"define-expander", __name1, {"fn", ____x29, {"%call", "define-setter", {"quote", __name1}, join({"fn", __arglist1}, __body3), "setfn", "args"}}}
end
setenv("define-setter", {
  _stash = true,
  macro = __define_setter__macro
})
local function __set__macro(...)
  local __args1 = unstash({...})
  return join({"%do"}, map(function (__x38)
    local ____id5 = __x38
    local __lh1 = has(____id5, 1)
    local __rh1 = has(____id5, 2)
    return get_place(__lh1, function (getter, setter)
      return setter(__rh1)
    end)
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
  local __body6 = unstash({...})
  if one63(__body6) and (hd63(__body6, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_args"
  else
    if _35(__body6) > 2 and (__body6[2] == "for" and __body6[4] == "in") then
      local ____id9 = __body6
      local __expr2 = has(____id9, 1)
      local __body7 = cut(____id9, 1)
      local __comps1 = {}
      local __cond1 = nil
      while _35(__body7) > 2 and (__body7[1] == "for" and __body7[3] == "in") do
        local ____id10 = __body7
        local ___for1 = has(____id10, 1)
        local __names1 = has(____id10, 2)
        local ___in1 = has(____id10, 3)
        local __l2 = has(____id10, 4)
        local __body12 = cut(____id10, 4)
        add(__comps1, {__names1, __l2})
        __body7 = __body12
      end
      if hd(__body7) == "if" then
        local ____id11 = __body7
        local ___if1 = has(____id11, 1)
        local __expr3 = has(____id11, 2)
        __cond1 = __expr3
      end
      return {"%list", __expr2, __comps1, __cond1}
    else
      local __x62 = unique("x")
      local __l3 = {}
      local __forms1 = {}
      local ____o1 = __body6
      local __k2 = nil
      for __k2 in next, ____o1 do
        local __v2 = ____o1[__k2]
        if number63(__k2) then
          __l3[__k2] = __v2
        else
          add(__forms1, {"%set", {"%get", __x62, {"quote", __k2}}, __v2})
        end
      end
      if some63(__forms1) then
        return join({"let", __x62, {"object", join({"%array"}, __l3)}}, __forms1, {__x62})
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
  local ____r26 = unstash({...})
  local __expr5 = destash33(expr, ____r26)
  local ____id14 = ____r26
  local __e12 = nil
  if nil63(has(____id14, "cmp")) then
    __e12 = "="
  else
    __e12 = has(____id14, "cmp")
  end
  local __cmp1 = __e12
  local __clauses1 = cut(____id14, 0)
  local __x86 = unique("x")
  local __eq1 = function (_)
    return {__cmp1, _, __x86}
  end
  local __cl1 = function (__x88)
    local ____id15 = __x88
    local __a1 = has(____id15, 1)
    local __b1 = has(____id15, 2)
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
  return {"let", __x86, __expr5, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end
setenv("case", {
  _stash = true,
  macro = __case__macro
})
local function __of__macro(x, ...)
  local ____r30 = unstash({...})
  local __x101 = destash33(x, ____r30)
  local ____id17 = ____r30
  local __values1 = cut(____id17, 0)
  return join({"case", __x101, __values1, true, false}, props(__values1))
end
setenv("of", {
  _stash = true,
  macro = __of__macro
})
local function __when__macro(cond, ...)
  local ____r32 = unstash({...})
  local __cond3 = destash33(cond, ____r32)
  local ____id19 = ____r32
  local __body9 = cut(____id19, 0)
  return {"%if", __cond3, join({"%do"}, __body9)}
end
setenv("when", {
  _stash = true,
  macro = __when__macro
})
local function __unless__macro(cond, ...)
  local ____r34 = unstash({...})
  local __cond5 = destash33(cond, ____r34)
  local ____id21 = ____r34
  local __body111 = cut(____id21, 0)
  return {"%if", {"%not", __cond5}, join({"%do"}, __body111)}
end
setenv("unless", {
  _stash = true,
  macro = __unless__macro
})
local function __obj__macro(...)
  local __body14 = unstash({...})
  if one63(__body14) and (hd63(__body14, "...") and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py") then
    return "_keys"
  else
    if _35(__body14) > 2 and (__body14[2] == "for" and __body14[4] == "in") then
      local ____id25 = __body14
      local __expr8 = has(____id25, 1)
      local __body15 = cut(____id25, 1)
      local __comps3 = {}
      local __cond7 = nil
      while _35(__body15) > 2 and (__body15[1] == "for" and __body15[3] == "in") do
        local ____id26 = __body15
        local ___for3 = has(____id26, 1)
        local __names3 = has(____id26, 2)
        local ___in3 = has(____id26, 3)
        local __l5 = has(____id26, 4)
        local __body141 = cut(____id26, 4)
        add(__comps3, {__names3, __l5})
        __body15 = __body141
      end
      if hd(__body15) == "if" then
        local ____id27 = __body15
        local ___if3 = has(____id27, 1)
        local __expr9 = has(____id27, 2)
        __cond7 = __expr9
      end
      if list63(__expr8) and hd63(__expr8, ",") then
        __expr8 = join({":"}, tl(__expr8))
      end
      local ____x125 = object({"%list", __expr8, __comps3, __cond7})
      ____x125.kind = "object"
      return ____x125
    else
      return join({"%object"}, mapo(function (x)
        return x
      end, __body14))
    end
  end
end
setenv("obj", {
  _stash = true,
  macro = __obj__macro
})
local function __let__macro(bs, ...)
  local ____r38 = unstash({...})
  local __bs11 = destash33(bs, ____r38)
  local ____id32 = ____r38
  local __body17 = cut(____id32, 0)
  if atom63(__bs11) or hd63(__bs11, ",") then
    return join({"let", {__bs11, hd(__body17)}}, tl(__body17))
  else
    if none63(__bs11) then
      return join({"%do"}, __body17)
    else
      local ____id33 = __bs11
      local __lh3 = has(____id33, 1)
      local __rh3 = has(____id33, 2)
      local __bs21 = cut(____id33, 2)
      local ____id34 = bind(__lh3, __rh3)
      local __id35 = has(____id34, 1)
      local __val1 = has(____id34, 2)
      local __bs12 = cut(____id34, 2)
      local __renames1 = {}
      if not id_literal63(__id35) then
        local __id121 = unique(__id35)
        __renames1 = {__id35, __id121}
        __id35 = __id121
      end
      return {"%do", {"%local", __id35, __val1}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body17)}}
    end
  end
end
setenv("let", {
  _stash = true,
  macro = __let__macro
})
local function __with__macro(x, v, ...)
  local ____r40 = unstash({...})
  local __x154 = destash33(x, ____r40)
  local __v4 = destash33(v, ____r40)
  local ____id37 = ____r40
  local __body19 = cut(____id37, 0)
  if __v4 == "as" then
    return join({"%with", {"%as", __x154, hd(__body19)}}, tl(__body19))
  else
    if not atom63(__x154) or has(__body19, "async") then
      return join({"%with", __x154, __v4}, __body19)
    else
      return join({"let", {__x154, __v4}}, __body19, {__x154})
    end
  end
end
setenv("with", {
  _stash = true,
  macro = __with__macro
})
local function __let_when__macro(x, v, ...)
  local ____r42 = unstash({...})
  local __x169 = destash33(x, ____r42)
  local __v6 = destash33(v, ____r42)
  local ____id39 = ____r42
  local __body21 = cut(____id39, 0)
  local __y1 = unique("y")
  return {"let", __y1, __v6, {"when", {"yes", __y1}, join({"let", {__x169, __y1}}, __body21)}}
end
setenv("let-when", {
  _stash = true,
  macro = __let_when__macro
})
local function __define_macro__macro(name, args, ...)
  local ____r44 = unstash({...})
  local __name3 = destash33(name, ____r44)
  local __args3 = destash33(args, ____r44)
  local ____id42 = ____r44
  local __body23 = cut(____id42, 0)
  local __id43 = unique(__name3 .. "--macro")
  local ____x183 = object({"setenv", {"quote", __name3}})
  ____x183.macro = __id43
  local __form3 = {"do", join({"define", __id43, __args3}, __body23), ____x183}
  eval(__form3)
  return __form3
end
setenv("define-macro", {
  _stash = true,
  macro = __define_macro__macro
})
local function __define_transformer__macro(name, args, ...)
  local ____r46 = unstash({...})
  local __name5 = destash33(name, ____r46)
  local __args5 = destash33(args, ____r46)
  local ____id46 = ____r46
  local __body25 = cut(____id46, 0)
  local __id47 = unique(__name5 .. "--transformer")
  local ____x193 = object({"setenv", {"quote", __name5}})
  ____x193.transformer = __id47
  local __form5 = {"do", join({"define", __id47, __args5}, __body25), ____x193}
  return __form5
end
setenv("define-transformer", {
  _stash = true,
  macro = __define_transformer__macro
})
local function __define_special__macro(name, args, ...)
  local ____r48 = unstash({...})
  local __name7 = destash33(name, ____r48)
  local __args7 = destash33(args, ____r48)
  local ____id50 = ____r48
  local __body27 = cut(____id50, 0)
  local __id51 = unique(__name7 .. "--special")
  local ____x203 = object({"setenv", {"quote", __name7}})
  ____x203.special = __id51
  local __form7 = {"do", join({"define", __id51, __args7}, __body27), join(____x203, props(__body27))}
  eval(__form7)
  return __form7
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
  local ____x208 = object({"setenv", {"quote", name}})
  ____x208.symbol = {"quote", expansion}
  return ____x208
end
setenv("define-symbol", {
  _stash = true,
  macro = __define_symbol__macro
})
local function __define_reader__macro(__x217, ...)
  local ____r52 = unstash({...})
  local ____x217 = destash33(__x217, ____r52)
  local ____id54 = ____x217
  local __char1 = has(____id54, 1)
  local __s1 = has(____id54, 2)
  local ____id55 = ____r52
  local __body29 = cut(____id55, 0)
  return {"%set", {"%get", "read-table", __char1}, join({"fn", {__s1}}, __body29)}
end
setenv("define-reader", {
  _stash = true,
  macro = __define_reader__macro
})
local function __define__macro(name, x, ...)
  local ____r54 = unstash({...})
  local __name9 = destash33(name, ____r54)
  local __x228 = destash33(x, ____r54)
  local ____id57 = ____r54
  local __body31 = cut(____id57, 0)
  setenv(__name9, {
    _stash = true,
    variable = true
  })
  if some63(__body31) then
    return join({"%local-function", __name9}, bind42(__x228, __body31), props(__body31))
  else
    return join({"%local", __name9, __x228}, props(__body31))
  end
end
setenv("define", {
  _stash = true,
  macro = __define__macro
})
local function __define_global__macro(name, x, ...)
  local ____r56 = unstash({...})
  local __name11 = destash33(name, ____r56)
  local __x236 = destash33(x, ____r56)
  local ____id59 = ____r56
  local __body33 = cut(____id59, 0)
  setenv(__name11, {
    _stash = true,
    toplevel = true,
    variable = true
  })
  if some63(__body33) then
    return join({"%global-function", __name11}, bind42(__x236, __body33), props(__body33))
  else
    return join({"set", __name11, __x236}, props(__body33))
  end
end
setenv("define-global", {
  _stash = true,
  macro = __define_global__macro
})
local function __get_value__macro(x)
  local ____x243 = object({"setenv", x})
  ____x243.toplevel = true
  return {"has", ____x243, {"quote", "value"}}
end
setenv("get-value", {
  _stash = true,
  macro = __get_value__macro
})
local function __define_constant__macro(name, x)
  local ____x254 = object({"setenv", {"quote", name}})
  ____x254.toplevel = true
  ____x254.value = either(x, {"get-value", {"quote", name}})
  return {"%do", ____x254, {"define-symbol", name, {"get-value", {"quote", name}}}}
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
  local ____r65 = unstash({...})
  local __x284 = destash33(x, ____r65)
  local ____id61 = ____r65
  local __body35 = cut(____id61, 0)
  local __ok1 = unique("ok")
  local __r66 = unique("r")
  local ____x285 = object({"target", {"try", __x284, join({"finally"}, __body35)}})
  ____x285.lua = join({"let", {{__ok1, __r66}, {"guard", __x284}}}, __body35, {{"if", __ok1, __r66, {"throw", __r66}}})
  return ____x285
end
setenv("after", {
  _stash = true,
  macro = __after__macro
})
local function __with_frame__macro(...)
  local __body37 = unstash({...})
  return {"%do", {"add", "environment", {"obj"}}, {"after", join({"%do"}, __body37), {"drop", "environment"}}}
end
setenv("with-frame", {
  _stash = true,
  macro = __with_frame__macro
})
local function __with_values__macro(...)
  local __body39 = unstash({...})
  local __forms3 = {}
  local ____o3 = __body39
  local __k5 = nil
  for __k5 in next, ____o3 do
    local __v8 = ____o3[__k5]
    if not number63(__k5) then
      local ____x315 = object({"setenv", {"quote", __k5}})
      ____x315.value = __v8
      add(__forms3, ____x315)
    end
  end
  return join({"with-frame"}, __forms3)
end
setenv("with-values", {
  _stash = true,
  macro = __with_values__macro
})
local function __with_bindings__macro(__x323, ...)
  local ____r68 = unstash({...})
  local ____x323 = destash33(__x323, ____r68)
  local ____id64 = ____x323
  local __names5 = has(____id64, 1)
  local ____id65 = ____r68
  local __body41 = cut(____id65, 0)
  local __x325 = unique("x")
  local ____x328 = object({"setenv", __x325})
  ____x328.variable = true
  return join({"with-frame", {"each", __x325, __names5, ____x328}}, __body41)
end
setenv("with-bindings", {
  _stash = true,
  macro = __with_bindings__macro
})
local function __let_macro__macro(definitions, ...)
  local ____r73 = unstash({...})
  local __definitions1 = destash33(definitions, ____r73)
  local ____id67 = ____r73
  local __body43 = cut(____id67, 0)
  add(environment, {})
  local ____id68 = {xpcall(function ()
    map(function (m)
      return macroexpand(join({"define-macro"}, m))
    end, __definitions1)
    return join({"%do"}, macroexpand(__body43))
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
  local ____ok3 = has(____id68, 1)
  local ____r74 = has(____id68, 2)
  drop(environment)
  if ____ok3 then
    return ____r74
  else
    error(____r74)
  end
end
setenv("let-macro", {
  _stash = true,
  macro = __let_macro__macro
})
local function __let_symbol__macro(expansions, ...)
  local ____r80 = unstash({...})
  local __expansions1 = destash33(expansions, ____r80)
  local ____id71 = ____r80
  local __body45 = cut(____id71, 0)
  add(environment, {})
  local ____id72 = {xpcall(function ()
    map(function (__x346)
      local ____id73 = __x346
      local __name13 = has(____id73, 1)
      local __exp1 = has(____id73, 2)
      return macroexpand({"define-symbol", __name13, __exp1})
    end, pair(__expansions1))
    return join({"%do"}, macroexpand(__body45))
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
  local ____ok5 = has(____id72, 1)
  local ____r81 = has(____id72, 2)
  drop(environment)
  if ____ok5 then
    return ____r81
  else
    error(____r81)
  end
end
setenv("let-symbol", {
  _stash = true,
  macro = __let_symbol__macro
})
local function __let_unique__macro(names, ...)
  local ____r85 = unstash({...})
  local __names7 = destash33(names, ____r85)
  local ____id75 = ____r85
  local __body47 = cut(____id75, 0)
  local __bs3 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names7)
  return join({"let", apply(join, __bs3)}, __body47)
end
setenv("let-unique", {
  _stash = true,
  macro = __let_unique__macro
})
local function __fn__macro(args, ...)
  local ____r88 = unstash({...})
  local __args13 = destash33(args, ____r88)
  local ____id77 = ____r88
  local __body49 = cut(____id77, 0)
  return join({"%function"}, bind42(__args13, __body49), props(__body49))
end
setenv("fn", {
  _stash = true,
  macro = __fn__macro
})
local function __apply__macro(f, ...)
  local ____r90 = unstash({...})
  local __f1 = destash33(f, ____r90)
  local ____id79 = ____r90
  local __args15 = cut(____id79, 0)
  if _35(__args15) > 1 then
    return {"%call", "apply", __f1, {"join", join({"list"}, almost(__args15)), last(__args15), join({"list"}, props(__args15))}}
  else
    if props63(__args15) then
      return {"%call", "apply", __f1, join({"join"}, __args15, {join({"list"}, props(__args15))})}
    else
      return join({"%call", "apply", __f1}, __args15)
    end
  end
end
setenv("apply", {
  _stash = true,
  macro = __apply__macro
})
local function __guard__macro(expr)
  local ____x413 = object({"target", {{"%function", join(), {"%try", {"list", true, expr}}}}})
  local ____x425 = object({"obj"})
  ____x425.stack = {{"idx", "debug", "traceback"}}
  ____x425.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
  ____x413.lua = {"list", {"xpcall", {"%function", join(), expr}, {"%function", {"m"}, {"if", {"obj?", "m"}, "m", ____x425}}}}
  return {"let-macro", {{"%return", "args", {"error", "\"Can't return from guard\""}}}, ____x413}
end
setenv("guard", {
  _stash = true,
  macro = __guard__macro
})
local function __each__macro(x, t, ...)
  local ____r94 = unstash({...})
  local __x454 = destash33(x, ____r94)
  local __t1 = destash33(t, ____r94)
  local ____id82 = ____r94
  local __body51 = cut(____id82, 0)
  local __o5 = unique("o")
  local __n5 = unique("n")
  local __i5 = unique("i")
  local __e17 = nil
  if atom63(__x454) then
    __e17 = {__i5, __x454}
  else
    local __e18 = nil
    if _35(__x454) > 1 then
      __e18 = __x454
    else
      __e18 = {__i5, hd(__x454)}
    end
    __e17 = __e18
  end
  local ____id83 = __e17
  local __k7 = has(____id83, 1)
  local __v10 = has(____id83, 2)
  local ____x460 = object({"target", __o5})
  ____x460.py = {"indices", __o5}
  local __e19 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e19 = __body51
  else
    __e19 = {join({"let", __k7, {"if", {"numeric?", __k7}, {"parseInt", __k7}, __k7}}, __body51)}
  end
  return {"let", {__o5, __t1, __k7, "nil"}, join({"%for", ____x460, __k7}, props(__body51), {join({"let", {__v10, {"%get", __o5, __k7}}}, __e19)})}
end
setenv("each", {
  _stash = true,
  macro = __each__macro
})
local function __for__macro(i, to, ...)
  local ____r96 = unstash({...})
  local __i7 = destash33(i, ____r96)
  local __to1 = destash33(to, ____r96)
  local ____id85 = ____r96
  local __body53 = cut(____id85, 0)
  if __to1 == "in" then
    return join({"%for", hd(__body53), __i7, join({"%do"}, tl(__body53))}, props(__body53))
  else
    return {"let", __i7, 0, join({"while", {"<", __i7, __to1}}, __body53, {{"inc", __i7}})}
  end
end
setenv("for", {
  _stash = true,
  macro = __for__macro
})
local function __step__macro(v, t, ...)
  local ____r98 = unstash({...})
  local __v12 = destash33(v, ____r98)
  local __t3 = destash33(t, ____r98)
  local ____id87 = ____r98
  local __body55 = cut(____id87, 0)
  local __x497 = unique("x")
  local __i9 = unique("i")
  return {"let", {__x497, __t3}, {"for", __i9, {"#", __x497}, join({"let", {__v12, {"at", __x497, __i9}}}, __body55)}}
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
    local __x509 = ____o7[____i11]
    __l7[__x509] = true
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
  local ____r104 = unstash({...})
  local __a3 = destash33(a, ____r104)
  local ____id89 = ____r104
  local __bs5 = cut(____id89, 0)
  return {"set", __a3, join({"join", __a3}, __bs5)}
end
setenv("join!", {
  _stash = true,
  macro = __join33__macro
})
local function __cat33__macro(a, ...)
  local ____r106 = unstash({...})
  local __a5 = destash33(a, ____r106)
  local ____id91 = ____r106
  local __bs7 = cut(____id91, 0)
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
  local __x542 = unique("x")
  return {"%do", {"inc", "indent-level"}, {"with", __x542, form, {"dec", "indent-level"}}}
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
  local __body57 = unstash({...})
  return eval(join({"%do"}, __body57))
end
setenv("when-compiling", {
  _stash = true,
  macro = __when_compiling__macro
})
local function __during_compilation__macro(...)
  local __body59 = unstash({...})
  local __form9 = join({"%do"}, __body59)
  eval(__form9)
  return __form9
end
setenv("during-compilation", {
  _stash = true,
  macro = __during_compilation__macro
})
setenv("has", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r117 = unstash({...})
    local __setfn1 = destash33(setfn, ____r117)
    local ____id93 = ____r117
    local __args17 = cut(____id93, 0)
    return define_setter("has", function (v, l, k)
      return {"%set", {"%get", l, k}, v}
    end, __setfn1, __args17)
  end
})
setenv("char", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r121 = unstash({...})
    local __setfn3 = destash33(setfn, ____r121)
    local ____id95 = ____r121
    local __args19 = cut(____id95, 0)
    return define_setter("char", function (c, str, pos)
      return {"set", str, {"cat", {"clip", str, 0, pos}, c, {"clip", str, {"+", pos, 1}}}}
    end, __setfn3, __args19)
  end
})
setenv("clip", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r125 = unstash({...})
    local __setfn5 = destash33(setfn, ____r125)
    local ____id97 = ____r125
    local __args21 = cut(____id97, 0)
    return define_setter("clip", function (c, str, from, upto)
      return {"set", str, {"cat", {"clip", str, 0, from}, c, {"clip", str, upto}}}
    end, __setfn5, __args21)
  end
})
setenv("inner", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r129 = unstash({...})
    local __setfn7 = destash33(setfn, ____r129)
    local ____id99 = ____r129
    local __args23 = cut(____id99, 0)
    return define_setter("inner", function (c, str)
      return {"set", str, {"cat", {"char", str, 0}, c, {"char", str, {"edge", str}}}}
    end, __setfn7, __args23)
  end
})
setenv("cut", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r133 = unstash({...})
    local __setfn9 = destash33(setfn, ____r133)
    local ____id101 = ____r133
    local __args25 = cut(____id101, 0)
    return define_setter("cut", function (v, l, from, upto)
      return {"set", l, {"join", {"cut", l, 0, from}, v, {"cut", l, either(upto, {"#", l})}, {"keys", v}}}
    end, __setfn9, __args25)
  end
})
setenv("tl", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r137 = unstash({...})
    local __setfn11 = destash33(setfn, ____r137)
    local ____id103 = ____r137
    local __args27 = cut(____id103, 0)
    return define_setter("tl", function (v, l, from)
      return {"set", {"cut", l, either(from, 1)}, v}
    end, __setfn11, __args27)
  end
})
setenv("hd", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r141 = unstash({...})
    local __setfn13 = destash33(setfn, ____r141)
    local ____id105 = ____r141
    local __args29 = cut(____id105, 0)
    return define_setter("hd", function (v, l, n)
      return {"set", {"at", l, either(n, 0)}, v}
    end, __setfn13, __args29)
  end
})
setenv("last", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r145 = unstash({...})
    local __setfn15 = destash33(setfn, ____r145)
    local ____id107 = ____r145
    local __args31 = cut(____id107, 0)
    return define_setter("last", function (v, l)
      return {"set", {"at", l, {"edge", l}}, v}
    end, __setfn15, __args31)
  end
})
local function __def__macro(name, ...)
  local ____r148 = unstash({...})
  local __name15 = destash33(name, ____r148)
  local ____id109 = ____r148
  local __body61 = cut(____id109, 0)
  return join({"define-global", __name15}, __body61)
end
setenv("def", {
  _stash = true,
  macro = __def__macro
})
local function __mac__macro(name, ...)
  local ____r150 = unstash({...})
  local __name17 = destash33(name, ____r150)
  local ____id1111 = ____r150
  local __body63 = cut(____id1111, 0)
  return join({"define-macro", __name17}, __body63)
end
setenv("mac", {
  _stash = true,
  macro = __mac__macro
})
local function __defconst__macro(name, ...)
  local ____r152 = unstash({...})
  local __name19 = destash33(name, ____r152)
  local ____id113 = ____r152
  local __value1 = cut(____id113, 0)
  return join({"def", __name19}, __value1)
end
setenv("defconst", {
  _stash = true,
  macro = __defconst__macro
})
local function __undefined63__macro(name)
  local ____x680 = object({"target"})
  ____x680.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x680.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x680.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x680
end
setenv("undefined?", {
  _stash = true,
  macro = __undefined63__macro
})
local function __defvar__macro(name, ...)
  local ____r156 = unstash({...})
  local __name21 = destash33(name, ____r156)
  local ____id115 = ____r156
  local __value3 = cut(____id115, 0)
  local ____x698 = object({"target"})
  ____x698.py = {"global", __name21}
  return {"when", {"undefined?", __name21}, ____x698, join({"defconst", __name21}, __value3)}
end
setenv("defvar", {
  _stash = true,
  macro = __defvar__macro
})
local function __async__macro(keyword, ...)
  local ____r158 = unstash({...})
  local __keyword1 = destash33(keyword, ____r158)
  local ____id117 = ____r158
  local __body65 = cut(____id117, 0)
  local ____x704 = object({__keyword1})
  ____x704.async = true
  return join(____x704, __body65)
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
  local ____r164 = unstash({...})
  local __a7 = destash33(a, ____r164)
  local ____id119 = ____r164
  local __bs9 = cut(____id119, 0)
  if nil63(__a7) then
    return ""
  else
    if none63(__bs9) then
      return __a7
    else
      if one63(__bs9) then
        local ____x730 = object({"target", join({"%cat", __a7}, __bs9)})
        ____x730.py = join({"%call", "cat", __a7}, __bs9)
        return ____x730
      else
        local ____x733 = object({"target", {"%cat", __a7, join({"cat"}, __bs9)}})
        ____x733.py = join({"%call", "cat", __a7}, __bs9)
        return ____x733
      end
    end
  end
end
setenv("cat", {
  _stash = true,
  macro = __cat__macro
})
local function ___43__macro(...)
  local __args33 = unstash({...})
  if none63(__args33) then
    return 0
  else
    if one63(__args33) then
      return hd(__args33)
    else
      return join({"%add"}, __args33)
    end
  end
end
setenv("+", {
  _stash = true,
  macro = ___43__macro
})
local function _____macro(...)
  local __args35 = unstash({...})
  if none63(__args35) then
    return 0
  else
    if one63(__args35) then
      return {"%unm", hd(__args35)}
    else
      return join({"%sub"}, __args35)
    end
  end
end
setenv("-", {
  _stash = true,
  macro = _____macro
})
local function ___42__macro(...)
  local __args37 = unstash({...})
  if none63(__args37) then
    return 1
  else
    if one63(__args37) then
      return hd(__args37)
    else
      return join({"%mul"}, __args37)
    end
  end
end
setenv("*", {
  _stash = true,
  macro = ___42__macro
})
local function ___47__macro(...)
  local __args39 = unstash({...})
  if none63(__args39) then
    return 1
  else
    if one63(__args39) then
      return hd(__args39)
    else
      return join({"%div"}, __args39)
    end
  end
end
setenv("/", {
  _stash = true,
  macro = ___47__macro
})
local function ___4747__macro(...)
  local __args41 = unstash({...})
  if none63(__args41) then
    return 1
  else
    if one63(__args41) then
      return hd(__args41)
    else
      return join({"%idiv"}, __args41)
    end
  end
end
setenv("//", {
  _stash = true,
  macro = ___4747__macro
})
local function ___37__macro(...)
  local __args43 = unstash({...})
  if none63(__args43) then
    return 0
  else
    if one63(__args43) then
      return hd(__args43)
    else
      return join({"%mod"}, __args43)
    end
  end
end
setenv("%", {
  _stash = true,
  macro = ___37__macro
})
local function ___60__macro(a, ...)
  local ____r166 = unstash({...})
  local __a9 = destash33(a, ____r166)
  local ____id1211 = ____r166
  local __bs111 = cut(____id1211, 0)
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
  local ____r168 = unstash({...})
  local __a11 = destash33(a, ____r168)
  local ____id123 = ____r168
  local __bs13 = cut(____id123, 0)
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
  local ____r170 = unstash({...})
  local __a13 = destash33(a, ____r170)
  local ____id125 = ____r170
  local __bs15 = cut(____id125, 0)
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
  local ____r172 = unstash({...})
  local __a15 = destash33(a, ____r172)
  local ____id127 = ____r172
  local __bs17 = cut(____id127, 0)
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
  local ____r174 = unstash({...})
  local __a17 = destash33(a, ____r174)
  local ____id129 = ____r174
  local __bs19 = cut(____id129, 0)
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
  local __args45 = unstash({...})
  if none63(__args45) then
    return false
  else
    if one63(__args45) then
      return join({"%not"}, __args45)
    else
      return {"%and", {"%not", hd(__args45)}, join({"not"}, tl(__args45))}
    end
  end
end
setenv("not", {
  _stash = true,
  macro = __not__macro
})
local function __and__macro(a, ...)
  local ____r176 = unstash({...})
  local __a19 = destash33(a, ____r176)
  local ____id131 = ____r176
  local __bs211 = cut(____id131, 0)
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
  local ____r178 = unstash({...})
  local __a21 = destash33(a, ____r178)
  local ____id133 = ____r178
  local __bs23 = cut(____id133, 0)
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
  local __args47 = unstash({...})
  return join({"%break"}, __args47)
end
setenv("break", {
  _stash = true,
  macro = __break__macro
})
local function __return__macro(...)
  local __args49 = unstash({...})
  return join({"%return"}, __args49)
end
setenv("return", {
  _stash = true,
  macro = __return__macro
})
local function __while__macro(c, ...)
  local ____r180 = unstash({...})
  local __c1 = destash33(c, ____r180)
  local ____id135 = ____r180
  local __body67 = cut(____id135, 0)
  return join({"%while", __c1}, __body67)
end
setenv("while", {
  _stash = true,
  macro = __while__macro
})
local function __do__macro(...)
  local __body69 = unstash({...})
  return join({"%do"}, __body69)
end
setenv("do", {
  _stash = true,
  macro = __do__macro
})
local function __get__macro(...)
  local __args51 = unstash({...})
  return join({"%get"}, __args51)
end
setenv("get", {
  _stash = true,
  macro = __get__macro
})
local function __idx__macro(...)
  local __args53 = unstash({...})
  return join({"%idx"}, __args53)
end
setenv("idx", {
  _stash = true,
  macro = __idx__macro
})
local function __new__macro(...)
  local __args55 = unstash({...})
  return join({"%new"}, __args55)
end
setenv("new", {
  _stash = true,
  macro = __new__macro
})
local function __typeof__macro(...)
  local __args57 = unstash({...})
  return join({"%typeof"}, __args57)
end
setenv("typeof", {
  _stash = true,
  macro = __typeof__macro
})
local function __error__macro(...)
  local __args59 = unstash({...})
  return join({"%error"}, __args59)
end
setenv("error", {
  _stash = true,
  macro = __error__macro
})
local function __throw__macro(...)
  local __args61 = unstash({...})
  return join({"%throw"}, __args61)
end
setenv("throw", {
  _stash = true,
  macro = __throw__macro
})
local function __raise__macro(...)
  local __args63 = unstash({...})
  return join({"%throw"}, __args63)
end
setenv("raise", {
  _stash = true,
  macro = __raise__macro
})
local function __is__macro(...)
  local __args65 = unstash({...})
  local ____x888 = object({"target", join({"="}, __args65)})
  ____x888.py = join({"%is"}, __args65)
  return ____x888
end
setenv("is", {
  _stash = true,
  macro = __is__macro
})
local function __in__macro(...)
  local __args67 = unstash({...})
  return join({"%in"}, __args67)
end
setenv("in", {
  _stash = true,
  macro = __in__macro
})
local function __as__macro(...)
  local __args69 = unstash({...})
  return join({"%as"}, __args69)
end
setenv("as", {
  _stash = true,
  macro = __as__macro
})
local function ___37expand_case__macro(x, ...)
  local ____r182 = unstash({...})
  local __x906 = destash33(x, ____r182)
  local ____id138 = ____r182
  local __body71 = cut(____id138, 0)
  local __e22 = nil
  if atom63(__x906) then
    __e22 = {__x906}
  else
    __e22 = __x906
  end
  local ____id139 = __e22
  local __a23 = has(____id139, 1)
  local __bs25 = cut(____id139, 1)
  local __e23 = nil
  if none63(__bs25) then
    __e23 = {{"%literal"}}
  else
    __e23 = __bs25
  end
  return join({"%block", __a23}, __e23, __body71)
end
setenv("%expand-case", {
  _stash = true,
  macro = ___37expand_case__macro
})
local function ___37cases__macro(...)
  local __args71 = unstash({...})
  if none63(__args71) then
    return {"do"}
  else
    if one63(__args71) then
      return join({"%expand-case"}, hd(__args71))
    else
      local __r185 = unique("r")
      return join({"with", __r185, "nil"}, map(function (__x926)
        local ____id141 = __x926
        local __x927 = has(____id141, 1)
        local __body73 = cut(____id141, 1)
        return {"%expand-case", __x927, {"%set", __r185, join({"%do"}, __body73)}}
      end, almost(__args71)), {join({"%expand-case"}, last(__args71))})
    end
  end
end
setenv("%cases", {
  _stash = true,
  macro = ___37cases__macro
})
local function __try__macro(x, ...)
  local ____r188 = unstash({...})
  local __x948 = destash33(x, ____r188)
  local ____id146 = ____r188
  local __cases1 = cut(____id146, 0)
  local __fin1 = {"finally"}
  local ____o9 = __cases1
  local ____i14 = nil
  for ____i14 in next, ____o9 do
    local __x950 = ____o9[____i14]
    if hd63(__x950, "finally") then
      __fin1 = __x950
    end
  end
  local __forms7 = {}
  local ____x953 = __cases1
  local ____i15 = 0
  while ____i15 < _35(____x953) do
    local ____id147 = ____x953[____i15 + 1]
    local __x954 = has(____id147, 1)
    local __body77 = cut(____id147, 1)
    if __x954 == "finally" then
    else
      if __x954 == "except" and has(__body77, 1) == "as" then
        local ____id148 = __body77
        local __kind2 = has(____id148, 1)
        local ___1 = has(____id148, 2)
        local __name23 = has(____id148, 3)
        local __body78 = cut(____id148, 3)
        add(__forms7, join({{__x954, {"%as", __kind2, __name23}}}, __body78))
      else
        if __x954 == "except" then
          local ____id149 = __body77
          local __kind3 = has(____id149, 1)
          local __body79 = cut(____id149, 1)
          add(__forms7, join({{__x954, __kind3}}, __body79))
        else
          error("Unknown try clause")
        end
      end
    end
    ____i15 = ____i15 + 1
  end
  return join({"%cases", {"try", __x948}}, __forms7, {__fin1})
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
  local __v14 = unique("v")
  return {"let", {{__ok7, __v14}, {"guard", x}}, {"if", __ok7, __v14, _else}}
end
setenv("errsafe", {
  _stash = true,
  macro = __errsafe__macro
})
local function __dbg__macro()
  local ____x977 = object({"target", {"do"}})
  ____x977.py = {"do", {"import", "pdb"}, {{"idx", "pdb", "set-trace"}}}
  return ____x977
end
setenv("dbg", {
  _stash = true,
  macro = __dbg__macro
})
local function __see__macro(form)
  local __form11 = expand(form)
  print(compile(expand({"%set", "lumen-result", __form11})))
  return __form11
end
setenv("see", {
  _stash = true,
  macro = __see__macro
})
local function __class__macro(name, ...)
  local ____r196 = unstash({...})
  local __name25 = destash33(name, ____r196)
  local ____id151 = ____r196
  local __body81 = cut(____id151, 0)
  return join({"%block", "class", __name25}, __body81)
end
setenv("class", {
  _stash = true,
  macro = __class__macro
})
local function __expansion__transformer(__x989, form)
  local ____id152 = __x989
  local __expansion = has(____id152, 1)
  return form
end
setenv("expansion", {
  _stash = true,
  transformer = __expansion__transformer
})
local function __compose__transformer(__x990, ...)
  local ____r198 = unstash({...})
  local ____x990 = destash33(__x990, ____r198)
  local ____id153 = ____x990
  local __compose = has(____id153, 1)
  local __fns = cut(____id153, 1)
  local ____id154 = ____r198
  local __body82 = cut(____id154, 0)
  local __e24 = nil
  if none63(__fns) then
    __e24 = unquote_splicing(__body82)
  else
    local __e25 = nil
    if one63(__fns) then
      __e25 = join(__fns, __body82)
    else
      __e25 = {join({__compose}, almost(__fns)), join({last(__fns)}, __body82)}
    end
    __e24 = __e25
  end
  return macroexpand(__e24)
end
setenv("compose", {
  _stash = true,
  transformer = __compose__transformer
})
local function __complement__transformer(__x995, ...)
  local ____r199 = unstash({...})
  local ____x995 = destash33(__x995, ____r199)
  local ____id155 = ____x995
  local __complement = has(____id155, 1)
  local __form12 = has(____id155, 2)
  local ____id156 = ____r199
  local __body83 = cut(____id156, 0)
  local __e26 = nil
  if hd63(__form12, "complement") then
    __e26 = join({__form12[2]}, __body83)
  else
    __e26 = {"no", join({__form12}, __body83)}
  end
  return macroexpand(__e26)
end
setenv("complement", {
  _stash = true,
  transformer = __complement__transformer
})
local function ___37brackets__transformer(__x1000, ...)
  local ____r200 = unstash({...})
  local ____x1000 = destash33(__x1000, ____r200)
  local ____id157 = ____x1000
  local ___37brackets = has(____id157, 1)
  local ____id158 = ____r200
  local __body84 = cut(____id158, 0)
  return macroexpand({"%function", {"%1", "%2"}, {"let-symbol", {"_", "%1"}, __body84}})
end
setenv("%brackets", {
  _stash = true,
  transformer = ___37brackets__transformer
})
local function ___37braces__transformer(__x1006, ...)
  local ____r201 = unstash({...})
  local ____x1006 = destash33(__x1006, ____r201)
  local ____id159 = ____x1006
  local ___37braces = has(____id159, 1)
  local ____id160 = ____r201
  local __body85 = cut(____id160, 0)
  return macroexpand(join({"%object"}, __body85))
end
setenv("%braces", {
  _stash = true,
  transformer = ___37braces__transformer
})
