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
  if atom63(__place) or (hd(__place) == "get" and nil63(getenv("get", "place-expander")) or accessor_literal63(hd(tl(__place)))) then
    return setfn(__place, function (v)
      return {"%set", __place, v}
    end)
  else
    local __head = hd(__place)
    local __gf = getenv(__head, "place-expander")
    if __gf then
      return apply(__gf, join({setfn}, tl(__place), {}))
    else
      error(str(__place) .. " is not a valid place expression")
    end
  end
end
local function __let_place__macro(vars, place, ...)
  local ____r7 = unstash({...})
  local __vars1 = destash33(vars, ____r7)
  local __place2 = destash33(place, ____r7)
  local ____id1 = ____r7
  local __body1 = cut(____id1, 0)
  return {"get-place", __place2, join({"fn", __vars1}, __body1)}
end
setenv("let-place", {
  _stash = true,
  macro = __let_place__macro
})
local function __define_expander__macro(name, handler)
  local ____x11 = object({"setenv", {"quote", name}})
  ____x11["place-expander"] = handler
  local __form1 = ____x11
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
  local ____r13 = unstash({...})
  local __name1 = destash33(name, ____r13)
  local __arglist1 = destash33(arglist, ____r13)
  local ____id3 = ____r13
  local __body3 = cut(____id3, 0)
  local ____x27 = object({"setfn"})
  ____x27.rest = "args"
  return {"define-expander", __name1, {"fn", ____x27, {"%call", "define-setter", {"quote", __name1}, join({"fn", __arglist1}, __body3), "setfn", "args"}}}
end
setenv("define-setter", {
  _stash = true,
  macro = __define_setter__macro
})
local function __set33__macro(...)
  local __args1 = unstash({...})
  return join({"%do"}, map(function (__x36)
    local ____id5 = __x36
    local __lh1 = has(____id5, 1)
    local __rh1 = has(____id5, 2)
    return get_place(__lh1, function (getter, setter)
      return setter(__rh1)
    end)
  end, pair(__args1)))
end
setenv("set!", {
  _stash = true,
  macro = __set33__macro
})
setenv("char", {
  _stash = true,
  ["place-expander"] = function (setfn, ...)
    local ____r20 = unstash({...})
    local __setfn1 = destash33(setfn, ____r20)
    local ____id7 = ____r20
    local __args3 = cut(____id7, 0)
    return define_setter("char", function (c, str, pos)
      return {"set!", str, {"cat", {"clip", str, 0, pos}, c, {"clip", str, {"+", pos, 1}}}}
    end, __setfn1, __args3)
  end
})
local function __set__macro(...)
  local __args5 = unstash({...})
  return join({"%do"}, map(function (__x57)
    local ____id9 = __x57
    local __lh3 = has(____id9, 1)
    local __rh3 = has(____id9, 2)
    __lh3 = macroexpand(__lh3)
    if not atom63(__lh3) and hd(__lh3) == "has" then
      return {"%set", join({"%get"}, tl(__lh3)), __rh3}
    else
      return {"%set", __lh3, __rh3}
    end
  end, pair(__args5)))
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
      local ____id13 = __body6
      local __expr2 = has(____id13, 1)
      local __body7 = cut(____id13, 1)
      local __comps1 = {}
      local __cond1 = nil
      while _35(__body7) > 2 and (__body7[1] == "for" and __body7[3] == "in") do
        local ____id14 = __body7
        local ___for1 = has(____id14, 1)
        local __names1 = has(____id14, 2)
        local ___in1 = has(____id14, 3)
        local __l2 = has(____id14, 4)
        local __body12 = cut(____id14, 4)
        add(__comps1, {__names1, __l2})
        __body7 = __body12
      end
      if hd(__body7) == "if" then
        local ____id15 = __body7
        local ___if1 = has(____id15, 1)
        local __expr3 = has(____id15, 2)
        __cond1 = __expr3
      end
      return {"%list", __expr2, __comps1, __cond1}
    else
      local __x84 = unique("x")
      local __l3 = {}
      local __forms1 = {}
      local ____o1 = __body6
      local __k2 = nil
      for __k2 in next, ____o1 do
        local __v2 = ____o1[__k2]
        if number63(__k2) then
          __l3[__k2] = __v2
        else
          add(__forms1, {"%set", {"%get", __x84, {"quote", __k2}}, __v2})
        end
      end
      if some63(__forms1) then
        return join({"let", __x84, {"object", join({"%array"}, __l3)}}, __forms1, {__x84})
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
  local ____r31 = unstash({...})
  local __expr5 = destash33(expr, ____r31)
  local ____id18 = ____r31
  local __e12 = nil
  if nil63(has(____id18, "cmp")) then
    __e12 = "="
  else
    __e12 = has(____id18, "cmp")
  end
  local __cmp1 = __e12
  local __clauses1 = cut(____id18, 0)
  local __x108 = unique("x")
  local __eq1 = function (_)
    return {__cmp1, _, __x108}
  end
  local __cl1 = function (__x110)
    local ____id19 = __x110
    local __a1 = has(____id19, 1)
    local __b1 = has(____id19, 2)
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
  return {"let", __x108, __expr5, join({"if"}, apply(join, map(__cl1, pair(__clauses1))))}
end
setenv("case", {
  _stash = true,
  macro = __case__macro
})
local function __of__macro(x, ...)
  local ____r35 = unstash({...})
  local __x123 = destash33(x, ____r35)
  local ____id21 = ____r35
  local __values1 = cut(____id21, 0)
  return join({"case", __x123, __values1, true, false}, props(__values1))
end
setenv("of", {
  _stash = true,
  macro = __of__macro
})
local function __when__macro(cond, ...)
  local ____r37 = unstash({...})
  local __cond3 = destash33(cond, ____r37)
  local ____id23 = ____r37
  local __body9 = cut(____id23, 0)
  return {"%if", __cond3, join({"%do"}, __body9)}
end
setenv("when", {
  _stash = true,
  macro = __when__macro
})
local function __unless__macro(cond, ...)
  local ____r39 = unstash({...})
  local __cond5 = destash33(cond, ____r39)
  local ____id25 = ____r39
  local __body111 = cut(____id25, 0)
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
      local ____id29 = __body14
      local __expr8 = has(____id29, 1)
      local __body15 = cut(____id29, 1)
      local __comps3 = {}
      local __cond7 = nil
      while _35(__body15) > 2 and (__body15[1] == "for" and __body15[3] == "in") do
        local ____id30 = __body15
        local ___for3 = has(____id30, 1)
        local __names3 = has(____id30, 2)
        local ___in3 = has(____id30, 3)
        local __l5 = has(____id30, 4)
        local __body141 = cut(____id30, 4)
        add(__comps3, {__names3, __l5})
        __body15 = __body141
      end
      if hd(__body15) == "if" then
        local ____id31 = __body15
        local ___if3 = has(____id31, 1)
        local __expr9 = has(____id31, 2)
        __cond7 = __expr9
      end
      if list63(__expr8) and hd63(__expr8, ",") then
        __expr8 = join({":"}, tl(__expr8))
      end
      local ____x147 = object({"%list", __expr8, __comps3, __cond7})
      ____x147.kind = "object"
      return ____x147
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
  local ____r43 = unstash({...})
  local __bs11 = destash33(bs, ____r43)
  local ____id36 = ____r43
  local __body17 = cut(____id36, 0)
  if atom63(__bs11) or hd63(__bs11, ",") then
    return join({"let", {__bs11, hd(__body17)}}, tl(__body17))
  else
    if none63(__bs11) then
      return join({"%do"}, __body17)
    else
      local ____id37 = __bs11
      local __lh5 = has(____id37, 1)
      local __rh5 = has(____id37, 2)
      local __bs21 = cut(____id37, 2)
      local ____id38 = bind(__lh5, __rh5)
      local __id39 = has(____id38, 1)
      local __val1 = has(____id38, 2)
      local __bs12 = cut(____id38, 2)
      local __renames1 = {}
      if not id_literal63(__id39) then
        local __id121 = unique(__id39)
        __renames1 = {__id39, __id121}
        __id39 = __id121
      end
      return {"%do", {"%local", __id39, __val1}, {"let-symbol", __renames1, join({"let", join(__bs12, __bs21)}, __body17)}}
    end
  end
end
setenv("let", {
  _stash = true,
  macro = __let__macro
})
local function __with__macro(x, v, ...)
  local ____r45 = unstash({...})
  local __x176 = destash33(x, ____r45)
  local __v4 = destash33(v, ____r45)
  local ____id41 = ____r45
  local __body19 = cut(____id41, 0)
  if __v4 == "as" then
    return join({"%with", {"%as", __x176, hd(__body19)}}, tl(__body19))
  else
    if not atom63(__x176) or has(__body19, "async") then
      return join({"%with", __x176, __v4}, __body19)
    else
      return join({"let", {__x176, __v4}}, __body19, {__x176})
    end
  end
end
setenv("with", {
  _stash = true,
  macro = __with__macro
})
local function __let_when__macro(x, v, ...)
  local ____r47 = unstash({...})
  local __x191 = destash33(x, ____r47)
  local __v6 = destash33(v, ____r47)
  local ____id43 = ____r47
  local __body21 = cut(____id43, 0)
  local __y1 = unique("y")
  return {"let", __y1, __v6, {"when", {"yes", __y1}, join({"let", {__x191, __y1}}, __body21)}}
end
setenv("let-when", {
  _stash = true,
  macro = __let_when__macro
})
local function __define_macro__macro(name, args, ...)
  local ____r49 = unstash({...})
  local __name3 = destash33(name, ____r49)
  local __args7 = destash33(args, ____r49)
  local ____id46 = ____r49
  local __body23 = cut(____id46, 0)
  local __id47 = unique(__name3 .. "--macro")
  local ____x205 = object({"setenv", {"quote", __name3}})
  ____x205.macro = __id47
  local __form3 = {"do", join({"define", __id47, __args7}, __body23), ____x205}
  eval(__form3)
  return __form3
end
setenv("define-macro", {
  _stash = true,
  macro = __define_macro__macro
})
local function __define_special__macro(name, args, ...)
  local ____r51 = unstash({...})
  local __name5 = destash33(name, ____r51)
  local __args9 = destash33(args, ____r51)
  local ____id50 = ____r51
  local __body25 = cut(____id50, 0)
  local __id51 = unique(__name5 .. "--special")
  local ____x215 = object({"setenv", {"quote", __name5}})
  ____x215.special = __id51
  local __form5 = {"do", join({"define", __id51, __args9}, __body25), join(____x215, props(__body25))}
  eval(__form5)
  return __form5
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
  local ____x220 = object({"setenv", {"quote", name}})
  ____x220.symbol = {"quote", expansion}
  return ____x220
end
setenv("define-symbol", {
  _stash = true,
  macro = __define_symbol__macro
})
local function __define_reader__macro(__x229, ...)
  local ____r55 = unstash({...})
  local ____x229 = destash33(__x229, ____r55)
  local ____id54 = ____x229
  local __char1 = has(____id54, 1)
  local __s1 = has(____id54, 2)
  local ____id55 = ____r55
  local __body27 = cut(____id55, 0)
  return {"%set", {"%get", "read-table", __char1}, join({"fn", {__s1}}, __body27)}
end
setenv("define-reader", {
  _stash = true,
  macro = __define_reader__macro
})
local function __define__macro(name, x, ...)
  local ____r57 = unstash({...})
  local __name7 = destash33(name, ____r57)
  local __x240 = destash33(x, ____r57)
  local ____id57 = ____r57
  local __body29 = cut(____id57, 0)
  setenv(__name7, {
    _stash = true,
    variable = true
  })
  if some63(__body29) then
    return join({"%local-function", __name7}, bind42(__x240, __body29), props(__body29))
  else
    return join({"%local", __name7, __x240}, props(__body29))
  end
end
setenv("define", {
  _stash = true,
  macro = __define__macro
})
local function __define_global__macro(name, x, ...)
  local ____r59 = unstash({...})
  local __name9 = destash33(name, ____r59)
  local __x248 = destash33(x, ____r59)
  local ____id59 = ____r59
  local __body31 = cut(____id59, 0)
  setenv(__name9, {
    _stash = true,
    toplevel = true,
    variable = true
  })
  if some63(__body31) then
    return join({"%global-function", __name9}, bind42(__x248, __body31), props(__body31))
  else
    return join({"set", __name9, __x248}, props(__body31))
  end
end
setenv("define-global", {
  _stash = true,
  macro = __define_global__macro
})
local function __get_value__macro(x)
  local ____x255 = object({"setenv", x})
  ____x255.toplevel = true
  return {"has", ____x255, {"quote", "value"}}
end
setenv("get-value", {
  _stash = true,
  macro = __get_value__macro
})
local function __define_constant__macro(name, x)
  local ____x266 = object({"setenv", {"quote", name}})
  ____x266.toplevel = true
  ____x266.value = either(x, {"get-value", {"quote", name}})
  return {"%do", ____x266, {"define-symbol", name, {"get-value", {"quote", name}}}}
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
  local ____r68 = unstash({...})
  local __x296 = destash33(x, ____r68)
  local ____id61 = ____r68
  local __body33 = cut(____id61, 0)
  local __ok1 = unique("ok")
  local __r69 = unique("r")
  local ____x297 = object({"target", {"try", __x296, join({"finally"}, __body33)}})
  ____x297.lua = join({"let", {{__ok1, __r69}, {"guard", __x296}}}, __body33, {{"if", __ok1, __r69, {"throw", __r69}}})
  return ____x297
end
setenv("after", {
  _stash = true,
  macro = __after__macro
})
local function __with_frame__macro(...)
  local __body35 = unstash({...})
  return {"%do", {"add", "environment", {"obj"}}, {"after", join({"%do"}, __body35), {"drop", "environment"}}}
end
setenv("with-frame", {
  _stash = true,
  macro = __with_frame__macro
})
local function __with_values__macro(...)
  local __body37 = unstash({...})
  local __forms3 = {}
  local ____o3 = __body37
  local __k5 = nil
  for __k5 in next, ____o3 do
    local __v8 = ____o3[__k5]
    if not number63(__k5) then
      local ____x327 = object({"setenv", {"quote", __k5}})
      ____x327.value = __v8
      add(__forms3, ____x327)
    end
  end
  return join({"with-frame"}, __forms3)
end
setenv("with-values", {
  _stash = true,
  macro = __with_values__macro
})
local function __with_bindings__macro(__x335, ...)
  local ____r71 = unstash({...})
  local ____x335 = destash33(__x335, ____r71)
  local ____id64 = ____x335
  local __names5 = has(____id64, 1)
  local ____id65 = ____r71
  local __body39 = cut(____id65, 0)
  local __x337 = unique("x")
  local ____x340 = object({"setenv", __x337})
  ____x340.variable = true
  return join({"with-frame", {"each", __x337, __names5, ____x340}}, __body39)
end
setenv("with-bindings", {
  _stash = true,
  macro = __with_bindings__macro
})
local function __let_macro__macro(definitions, ...)
  local ____r76 = unstash({...})
  local __definitions1 = destash33(definitions, ____r76)
  local ____id67 = ____r76
  local __body41 = cut(____id67, 0)
  add(environment, {})
  local ____id68 = {xpcall(function ()
    map(function (m)
      return macroexpand(join({"define-macro"}, m))
    end, __definitions1)
    return join({"%do"}, macroexpand(__body41))
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
  local ____r77 = has(____id68, 2)
  drop(environment)
  if ____ok3 then
    return ____r77
  else
    error(____r77)
  end
end
setenv("let-macro", {
  _stash = true,
  macro = __let_macro__macro
})
local function __let_symbol__macro(expansions, ...)
  local ____r83 = unstash({...})
  local __expansions1 = destash33(expansions, ____r83)
  local ____id71 = ____r83
  local __body43 = cut(____id71, 0)
  add(environment, {})
  local ____id72 = {xpcall(function ()
    map(function (__x358)
      local ____id73 = __x358
      local __name11 = has(____id73, 1)
      local __exp1 = has(____id73, 2)
      return macroexpand({"define-symbol", __name11, __exp1})
    end, pair(__expansions1))
    return join({"%do"}, macroexpand(__body43))
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
  local ____r84 = has(____id72, 2)
  drop(environment)
  if ____ok5 then
    return ____r84
  else
    error(____r84)
  end
end
setenv("let-symbol", {
  _stash = true,
  macro = __let_symbol__macro
})
local function __let_unique__macro(names, ...)
  local ____r88 = unstash({...})
  local __names7 = destash33(names, ____r88)
  local ____id75 = ____r88
  local __body45 = cut(____id75, 0)
  local __bs3 = map(function (n)
    return {n, {"unique", {"quote", n}}}
  end, __names7)
  return join({"let", apply(join, __bs3)}, __body45)
end
setenv("let-unique", {
  _stash = true,
  macro = __let_unique__macro
})
local function __fn__macro(args, ...)
  local ____r91 = unstash({...})
  local __args15 = destash33(args, ____r91)
  local ____id77 = ____r91
  local __body47 = cut(____id77, 0)
  return join({"%function"}, bind42(__args15, __body47), props(__body47))
end
setenv("fn", {
  _stash = true,
  macro = __fn__macro
})
local function __apply__macro(f, ...)
  local ____r93 = unstash({...})
  local __f1 = destash33(f, ____r93)
  local ____id79 = ____r93
  local __args17 = cut(____id79, 0)
  if _35(__args17) > 1 then
    return {"%call", "apply", __f1, {"join", join({"list"}, almost(__args17)), last(__args17), join({"list"}, props(__args17))}}
  else
    if props63(__args17) then
      return {"%call", "apply", __f1, join({"join"}, __args17, {join({"list"}, props(__args17))})}
    else
      return join({"%call", "apply", __f1}, __args17)
    end
  end
end
setenv("apply", {
  _stash = true,
  macro = __apply__macro
})
local function __guard__macro(expr)
  local ____x425 = object({"target", {{"%function", join(), {"%try", {"list", true, expr}}}}})
  local ____x437 = object({"obj"})
  ____x437.stack = {{"idx", "debug", "traceback"}}
  ____x437.message = {"if", {"string?", "m"}, {"clip", "m", {"+", {"search", "m", "\": \""}, 2}}, {"nil?", "m"}, "\"\"", {"str", "m"}}
  ____x425.lua = {"list", {"xpcall", {"%function", join(), expr}, {"%function", {"m"}, {"if", {"obj?", "m"}, "m", ____x437}}}}
  return {"let-macro", {{"%return", "args", {"error", "\"Can't return from guard\""}}}, ____x425}
end
setenv("guard", {
  _stash = true,
  macro = __guard__macro
})
local function __each__macro(x, t, ...)
  local ____r97 = unstash({...})
  local __x466 = destash33(x, ____r97)
  local __t1 = destash33(t, ____r97)
  local ____id82 = ____r97
  local __body49 = cut(____id82, 0)
  local __o5 = unique("o")
  local __n5 = unique("n")
  local __i5 = unique("i")
  local __e17 = nil
  if atom63(__x466) then
    __e17 = {__i5, __x466}
  else
    local __e18 = nil
    if _35(__x466) > 1 then
      __e18 = __x466
    else
      __e18 = {__i5, hd(__x466)}
    end
    __e17 = __e18
  end
  local ____id83 = __e17
  local __k7 = has(____id83, 1)
  local __v10 = has(____id83, 2)
  local ____x472 = object({"target", __o5})
  ____x472.py = {"indices", __o5}
  local __e19 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e19 = __body49
  else
    __e19 = {join({"let", __k7, {"if", {"numeric?", __k7}, {"parseInt", __k7}, __k7}}, __body49)}
  end
  return {"let", {__o5, __t1, __k7, "nil"}, join({"%for", ____x472, __k7}, props(__body49), {join({"let", {__v10, {"%get", __o5, __k7}}}, __e19)})}
end
setenv("each", {
  _stash = true,
  macro = __each__macro
})
local function __for__macro(i, to, ...)
  local ____r99 = unstash({...})
  local __i7 = destash33(i, ____r99)
  local __to1 = destash33(to, ____r99)
  local ____id85 = ____r99
  local __body51 = cut(____id85, 0)
  if __to1 == "in" then
    return join({"%for", hd(__body51), __i7, join({"%do"}, tl(__body51))}, props(__body51))
  else
    return {"let", __i7, 0, join({"while", {"<", __i7, __to1}}, __body51, {{"inc", __i7}})}
  end
end
setenv("for", {
  _stash = true,
  macro = __for__macro
})
local function __step__macro(v, t, ...)
  local ____r101 = unstash({...})
  local __v12 = destash33(v, ____r101)
  local __t3 = destash33(t, ____r101)
  local ____id87 = ____r101
  local __body53 = cut(____id87, 0)
  local __x509 = unique("x")
  local __i9 = unique("i")
  return {"let", {__x509, __t3}, {"for", __i9, {"#", __x509}, join({"let", {__v12, {"at", __x509, __i9}}}, __body53)}}
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
    local __x521 = ____o7[____i11]
    __l7[__x521] = true
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
  local ____r107 = unstash({...})
  local __a3 = destash33(a, ____r107)
  local ____id89 = ____r107
  local __bs5 = cut(____id89, 0)
  return {"set", __a3, join({"join", __a3}, __bs5)}
end
setenv("join!", {
  _stash = true,
  macro = __join33__macro
})
local function __cat33__macro(a, ...)
  local ____r109 = unstash({...})
  local __a5 = destash33(a, ____r109)
  local ____id91 = ____r109
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
  local __x554 = unique("x")
  return {"%do", {"inc", "indent-level"}, {"with", __x554, form, {"dec", "indent-level"}}}
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
  local __body55 = unstash({...})
  return eval(join({"%do"}, __body55))
end
setenv("when-compiling", {
  _stash = true,
  macro = __when_compiling__macro
})
local function __during_compilation__macro(...)
  local __body57 = unstash({...})
  local __form7 = join({"%do"}, __body57)
  eval(__form7)
  return __form7
end
setenv("during-compilation", {
  _stash = true,
  macro = __during_compilation__macro
})
local function __def__macro(name, ...)
  local ____r119 = unstash({...})
  local __name13 = destash33(name, ____r119)
  local ____id93 = ____r119
  local __body59 = cut(____id93, 0)
  return join({"define-global", __name13}, __body59)
end
setenv("def", {
  _stash = true,
  macro = __def__macro
})
local function __mac__macro(name, ...)
  local ____r121 = unstash({...})
  local __name15 = destash33(name, ____r121)
  local ____id95 = ____r121
  local __body61 = cut(____id95, 0)
  return join({"define-macro", __name15}, __body61)
end
setenv("mac", {
  _stash = true,
  macro = __mac__macro
})
local function __defconst__macro(name, ...)
  local ____r123 = unstash({...})
  local __name17 = destash33(name, ____r123)
  local ____id97 = ____r123
  local __value1 = cut(____id97, 0)
  return join({"def", __name17}, __value1)
end
setenv("defconst", {
  _stash = true,
  macro = __defconst__macro
})
local function __undefined63__macro(name)
  local ____x618 = object({"target"})
  ____x618.js = {"=", {"typeof", name}, "\"undefined\""}
  ____x618.lua = {"=", {"idx", "_G", name}, "nil"}
  ____x618.py = {"not", {"%in", {"quote", compile(name)}, {"globals"}}}
  return ____x618
end
setenv("undefined?", {
  _stash = true,
  macro = __undefined63__macro
})
local function __defvar__macro(name, ...)
  local ____r127 = unstash({...})
  local __name19 = destash33(name, ____r127)
  local ____id99 = ____r127
  local __value3 = cut(____id99, 0)
  local ____x636 = object({"target"})
  ____x636.py = {"global", __name19}
  return {"when", {"undefined?", __name19}, ____x636, join({"defconst", __name19}, __value3)}
end
setenv("defvar", {
  _stash = true,
  macro = __defvar__macro
})
local function __async__macro(keyword, ...)
  local ____r129 = unstash({...})
  local __keyword1 = destash33(keyword, ____r129)
  local ____id101 = ____r129
  local __body63 = cut(____id101, 0)
  local ____x642 = object({__keyword1})
  ____x642.async = true
  return join(____x642, __body63)
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
  local ____r135 = unstash({...})
  local __a7 = destash33(a, ____r135)
  local ____id103 = ____r135
  local __bs9 = cut(____id103, 0)
  if nil63(__a7) then
    return ""
  else
    if none63(__bs9) then
      return __a7
    else
      if one63(__bs9) then
        local ____x668 = object({"target", join({"%cat", __a7}, __bs9)})
        ____x668.py = join({"%call", "cat", __a7}, __bs9)
        return ____x668
      else
        local ____x671 = object({"target", {"%cat", __a7, join({"cat"}, __bs9)}})
        ____x671.py = join({"%call", "cat", __a7}, __bs9)
        return ____x671
      end
    end
  end
end
setenv("cat", {
  _stash = true,
  macro = __cat__macro
})
local function ___43__macro(...)
  local __args19 = unstash({...})
  if none63(__args19) then
    return 0
  else
    if one63(__args19) then
      return hd(__args19)
    else
      return join({"%add"}, __args19)
    end
  end
end
setenv("+", {
  _stash = true,
  macro = ___43__macro
})
local function _____macro(...)
  local __args21 = unstash({...})
  if none63(__args21) then
    return 0
  else
    if one63(__args21) then
      return {"%unm", hd(__args21)}
    else
      return join({"%sub"}, __args21)
    end
  end
end
setenv("-", {
  _stash = true,
  macro = _____macro
})
local function ___42__macro(...)
  local __args23 = unstash({...})
  if none63(__args23) then
    return 1
  else
    if one63(__args23) then
      return hd(__args23)
    else
      return join({"%mul"}, __args23)
    end
  end
end
setenv("*", {
  _stash = true,
  macro = ___42__macro
})
local function ___47__macro(...)
  local __args25 = unstash({...})
  if none63(__args25) then
    return 1
  else
    if one63(__args25) then
      return hd(__args25)
    else
      return join({"%div"}, __args25)
    end
  end
end
setenv("/", {
  _stash = true,
  macro = ___47__macro
})
local function ___4747__macro(...)
  local __args27 = unstash({...})
  if none63(__args27) then
    return 1
  else
    if one63(__args27) then
      return hd(__args27)
    else
      return join({"%idiv"}, __args27)
    end
  end
end
setenv("//", {
  _stash = true,
  macro = ___4747__macro
})
local function ___37__macro(...)
  local __args29 = unstash({...})
  if none63(__args29) then
    return 0
  else
    if one63(__args29) then
      return hd(__args29)
    else
      return join({"%mod"}, __args29)
    end
  end
end
setenv("%", {
  _stash = true,
  macro = ___37__macro
})
local function ___60__macro(a, ...)
  local ____r137 = unstash({...})
  local __a9 = destash33(a, ____r137)
  local ____id105 = ____r137
  local __bs111 = cut(____id105, 0)
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
  local ____r139 = unstash({...})
  local __a11 = destash33(a, ____r139)
  local ____id107 = ____r139
  local __bs13 = cut(____id107, 0)
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
  local ____r141 = unstash({...})
  local __a13 = destash33(a, ____r141)
  local ____id109 = ____r141
  local __bs15 = cut(____id109, 0)
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
  local ____r143 = unstash({...})
  local __a15 = destash33(a, ____r143)
  local ____id1111 = ____r143
  local __bs17 = cut(____id1111, 0)
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
  local ____r145 = unstash({...})
  local __a17 = destash33(a, ____r145)
  local ____id113 = ____r145
  local __bs19 = cut(____id113, 0)
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
  local __args31 = unstash({...})
  if none63(__args31) then
    return false
  else
    if one63(__args31) then
      return join({"%not"}, __args31)
    else
      return {"%and", {"%not", hd(__args31)}, join({"not"}, tl(__args31))}
    end
  end
end
setenv("not", {
  _stash = true,
  macro = __not__macro
})
local function __and__macro(a, ...)
  local ____r147 = unstash({...})
  local __a19 = destash33(a, ____r147)
  local ____id115 = ____r147
  local __bs211 = cut(____id115, 0)
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
  local ____r149 = unstash({...})
  local __a21 = destash33(a, ____r149)
  local ____id117 = ____r149
  local __bs23 = cut(____id117, 0)
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
  local __args33 = unstash({...})
  return join({"%break"}, __args33)
end
setenv("break", {
  _stash = true,
  macro = __break__macro
})
local function __return__macro(...)
  local __args35 = unstash({...})
  return join({"%return"}, __args35)
end
setenv("return", {
  _stash = true,
  macro = __return__macro
})
local function __while__macro(c, ...)
  local ____r151 = unstash({...})
  local __c1 = destash33(c, ____r151)
  local ____id119 = ____r151
  local __body65 = cut(____id119, 0)
  return join({"%while", __c1}, __body65)
end
setenv("while", {
  _stash = true,
  macro = __while__macro
})
local function __do__macro(...)
  local __body67 = unstash({...})
  return join({"%do"}, __body67)
end
setenv("do", {
  _stash = true,
  macro = __do__macro
})
local function __get__macro(...)
  local __args37 = unstash({...})
  return join({"%get"}, __args37)
end
setenv("get", {
  _stash = true,
  macro = __get__macro
})
local function __idx__macro(...)
  local __args39 = unstash({...})
  return join({"%idx"}, __args39)
end
setenv("idx", {
  _stash = true,
  macro = __idx__macro
})
local function __new__macro(...)
  local __args41 = unstash({...})
  return join({"%new"}, __args41)
end
setenv("new", {
  _stash = true,
  macro = __new__macro
})
local function __typeof__macro(...)
  local __args43 = unstash({...})
  return join({"%typeof"}, __args43)
end
setenv("typeof", {
  _stash = true,
  macro = __typeof__macro
})
local function __error__macro(...)
  local __args45 = unstash({...})
  return join({"%error"}, __args45)
end
setenv("error", {
  _stash = true,
  macro = __error__macro
})
local function __throw__macro(...)
  local __args47 = unstash({...})
  return join({"%throw"}, __args47)
end
setenv("throw", {
  _stash = true,
  macro = __throw__macro
})
local function __raise__macro(...)
  local __args49 = unstash({...})
  return join({"%throw"}, __args49)
end
setenv("raise", {
  _stash = true,
  macro = __raise__macro
})
local function __is__macro(...)
  local __args51 = unstash({...})
  local ____x826 = object({"target", join({"="}, __args51)})
  ____x826.py = join({"%is"}, __args51)
  return ____x826
end
setenv("is", {
  _stash = true,
  macro = __is__macro
})
local function __in__macro(...)
  local __args53 = unstash({...})
  return join({"%in"}, __args53)
end
setenv("in", {
  _stash = true,
  macro = __in__macro
})
local function __as__macro(...)
  local __args55 = unstash({...})
  return join({"%as"}, __args55)
end
setenv("as", {
  _stash = true,
  macro = __as__macro
})
local function ___37expand_case__macro(x, ...)
  local ____r153 = unstash({...})
  local __x844 = destash33(x, ____r153)
  local ____id122 = ____r153
  local __body69 = cut(____id122, 0)
  local __e22 = nil
  if atom63(__x844) then
    __e22 = {__x844}
  else
    __e22 = __x844
  end
  local ____id123 = __e22
  local __a23 = has(____id123, 1)
  local __bs25 = cut(____id123, 1)
  local __e23 = nil
  if none63(__bs25) then
    __e23 = {{"%literal"}}
  else
    __e23 = __bs25
  end
  return join({"%block", __a23}, __e23, __body69)
end
setenv("%expand-case", {
  _stash = true,
  macro = ___37expand_case__macro
})
local function ___37cases__macro(...)
  local __args57 = unstash({...})
  if none63(__args57) then
    return {"do"}
  else
    if one63(__args57) then
      return join({"%expand-case"}, hd(__args57))
    else
      local __r156 = unique("r")
      return join({"with", __r156, "nil"}, map(function (__x864)
        local ____id125 = __x864
        local __x865 = has(____id125, 1)
        local __body71 = cut(____id125, 1)
        return {"%expand-case", __x865, {"%set", __r156, join({"%do"}, __body71)}}
      end, almost(__args57)), {join({"%expand-case"}, last(__args57))})
    end
  end
end
setenv("%cases", {
  _stash = true,
  macro = ___37cases__macro
})
local function __try__macro(x, ...)
  local ____r159 = unstash({...})
  local __x886 = destash33(x, ____r159)
  local ____id130 = ____r159
  local __cases1 = cut(____id130, 0)
  local __fin1 = {"finally"}
  local ____o9 = __cases1
  local ____i14 = nil
  for ____i14 in next, ____o9 do
    local __x888 = ____o9[____i14]
    if hd63(__x888, "finally") then
      __fin1 = __x888
    end
  end
  local __forms7 = {}
  local ____x891 = __cases1
  local ____i15 = 0
  while ____i15 < _35(____x891) do
    local ____id131 = ____x891[____i15 + 1]
    local __x892 = has(____id131, 1)
    local __body75 = cut(____id131, 1)
    if __x892 == "finally" then
    else
      if __x892 == "except" and has(__body75, 1) == "as" then
        local ____id132 = __body75
        local __kind2 = has(____id132, 1)
        local ___1 = has(____id132, 2)
        local __name21 = has(____id132, 3)
        local __body76 = cut(____id132, 3)
        add(__forms7, join({{__x892, {"%as", __kind2, __name21}}}, __body76))
      else
        if __x892 == "except" then
          local ____id133 = __body75
          local __kind3 = has(____id133, 1)
          local __body77 = cut(____id133, 1)
          add(__forms7, join({{__x892, __kind3}}, __body77))
        else
          error("Unknown try clause")
        end
      end
    end
    ____i15 = ____i15 + 1
  end
  return join({"%cases", {"try", __x886}}, __forms7, {__fin1})
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
  local ____x915 = object({"target", {"do"}})
  ____x915.py = {"do", {"import", "pdb"}, {{"idx", "pdb", "set-trace"}}}
  return ____x915
end
setenv("dbg", {
  _stash = true,
  macro = __dbg__macro
})
local function __see__macro(form)
  local __form9 = expand(form)
  print(compile(expand({"%set", "lumen-result", __form9})))
  return __form9
end
setenv("see", {
  _stash = true,
  macro = __see__macro
})
