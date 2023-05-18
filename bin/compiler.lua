function getenv(k, p)
  if string63(k) then
    local __i = edge(environment)
    while __i >= 0 do
      if has63(environment[__i + 1], k) then
        local __b = environment[__i + 1][k]
        local __e10 = nil
        if p then
          __e10 = has(__b, p)
        else
          __e10 = __b
        end
        return __e10
      else
        __i = __i - 1
      end
    end
  end
end
local function macro_function(k)
  return getenv(k, "macro")
end
local function macro63(k)
  return is63(macro_function(k))
end
local function special63(k)
  return is63(getenv(k, "special"))
end
local function special_form63(form)
  return not atom63(form) and special63(hd(form))
end
local function statement63(k)
  return special63(k) and getenv(k, "stmt")
end
local function symbol_expansion(k)
  return getenv(k, "symbol")
end
local function symbol63(k)
  return is63(symbol_expansion(k))
end
local function variable63(k)
  return is63(getenv(k, "variable"))
end
function bound63(x)
  return macro63(x) or (special63(x) or (symbol63(x) or variable63(x)))
end
function keyword63(atom)
  return string63(atom) and (_35(atom) > 1 and char(atom, 0) == ":")
end
function quoted(form)
  if keyword63(form) then
    return form
  else
    if string63(form) then
      return escape(form)
    else
      if atom63(form) then
        return form
      else
        return join({"quasilist"}, map(quoted, form))
      end
    end
  end
end
local function literal(s)
  if string_literal63(s) then
    return s
  else
    return quoted(s)
  end
end
local function stash42(args)
  if props63(args) then
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      local __l = array(args)
      local ____o = args
      local __k = nil
      for __k in next, ____o do
        local __v = ____o[__k]
        if not number63(__k) then
          add(__l, {"%compile", __k, "|=|", __v})
        end
      end
      return __l
    else
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        local __l1 = array(args)
        local ____o1 = args
        local __k1 = nil
        for __k1 in next, ____o1 do
          local __v1 = ____o1[__k1]
          if not number63(__k1) then
            add(__l1, {"%compile", __k1, "| |", __v1})
          end
        end
        return __l1
      else
        local __l2 = {"%object", "\"_stash\"", true}
        local ____o2 = args
        local __k2 = nil
        for __k2 in next, ____o2 do
          local __v2 = ____o2[__k2]
          if not number63(__k2) then
            add(__l2, literal(__k2))
            add(__l2, __v2)
          end
        end
        return join({}, args, {__l2})
      end
    end
  else
    return args
  end
end
local function bias(k)
  if number63(k) then
    k = k - 1
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      k = k + 1
    end
    return k
  else
    return k
  end
end
function bind(lh, rh)
  if atom63(lh) then
    return {lh, rh}
  else
    if hd63(lh, ",") then
      return bind(cut(lh, 1), rh)
    else
      if hd(lh) == "t" then
        local ____id = lh
        local ___ = has(____id, 1)
        local __var = has(____id, 2)
        local __val = has(____id, 3)
        local __val1 = either(__val, __var)
        return bind({"o", __var, {"the", __val1}}, rh)
      else
        if hd(lh) == "o" then
          local ____id1 = lh
          local ___1 = has(____id1, 1)
          local __var1 = has(____id1, 2)
          local __val2 = has(____id1, 3)
          return {__var1, {"if", {"nil?", rh}, __val2, rh}}
        else
          local __id2 = unique("id")
          local __bs = {__id2, rh}
          local ____o3 = lh
          local __k3 = nil
          for __k3 in next, ____o3 do
            local __v3 = ____o3[__k3]
            local __e11 = nil
            if __k3 == "rest" then
              __e11 = {"cut", __id2, _35(lh)}
            else
              __e11 = {"has", __id2, {"quote", bias(__k3)}}
            end
            local __x12 = __e11
            if is63(__k3) then
              local __e12 = nil
              if __v3 == true then
                __e12 = __k3
              else
                __e12 = __v3
              end
              local __k4 = __e12
              __bs = join(__bs, bind(__k4, __x12))
            end
          end
          return __bs
        end
      end
    end
  end
end
local function __arguments37__macro(from)
  local ____x16 = object({"target"})
  ____x16.js = {{"%idx", {"%idx", {"%idx", "Array", "prototype"}, "slice"}, "call"}, "arguments", from}
  ____x16.py = {"list", "|_args|"}
  ____x16.lua = {"quasilist", "|...|"}
  ____x16.cmake = {"%ref", "ARGN"}
  return ____x16
end
setenv("arguments%", {
  _stash = true,
  macro = __arguments37__macro
})
local function body_docstring(body)
  if _35(body) > 1 and string_literal63(hd(body)) then
    return {hd(body), tl(body)}
  else
    return {{}, body}
  end
end
function bind42(args, body)
  local __args1 = {}
  local function rest()
    __args1.rest = true
    local ____x28 = object({"target"})
    ____x28.py = {"obj", "..."}
    return {"unstash", {"quasilist", "..."}, ____x28}
  end
  if atom63(args) then
    return {__args1, join({"let", {args, rest()}}, body)}
  else
    local ____id3 = body_docstring(body)
    local __doc = has(____id3, 1)
    local __body = has(____id3, 2)
    local __pre = {}
    local __bs1 = {}
    local __inits = {}
    local __r20 = unique("r")
    local ____o4 = args
    local __k5 = nil
    for __k5 in next, ____o4 do
      local __v4 = ____o4[__k5]
      if number63(__k5) then
        if atom63(__v4) then
          add(__args1, __v4)
        else
          if hd(__v4) == "o" then
            local ____id4 = __v4
            local ___2 = has(____id4, 1)
            local __var2 = has(____id4, 2)
            local __val3 = has(____id4, 3)
            add(__args1, __var2)
            add(__inits, {"%if", {"nil?", __var2}, {"%set", __var2, __val3}})
          else
            if hd(__v4) == "t" then
              local ____id5 = __v4
              local ___3 = has(____id5, 1)
              local __var3 = has(____id5, 2)
              local __val4 = has(____id5, 3)
              local __val5 = either(__val4, __var3)
              add(__args1, __var3)
              add(__inits, {"%if", {"nil?", __var3}, {"%set", __var3, {"the", __val5}}})
            else
              local __x40 = unique("x")
              add(__args1, __x40)
              __bs1 = join(__bs1, {__v4, __x40})
            end
          end
        end
      end
    end
    if props63(args) then
      __pre = join(__pre, {__r20, rest()})
      local __n5 = _35(__args1)
      local __i6 = 0
      while __i6 < __n5 do
        local __v5 = __args1[__i6 + 1]
        __pre = join(__pre, {__v5, {"destash!", __v5, __r20}})
        __i6 = __i6 + 1
      end
      __bs1 = join(__bs1, {props(args), __r20})
    end
    local __forms = join({"let", __pre}, __inits, {join({"let", __bs1}, __body)})
    local __e13 = nil
    if is63(__doc) then
      __e13 = {"do", __doc, __forms}
    else
      __e13 = __forms
    end
    return {__args1, __e13}
  end
end
local function quoting63(depth)
  return number63(depth)
end
local function quasiquoting63(depth)
  return quoting63(depth) and depth > 0
end
local function can_unquote63(depth)
  return quoting63(depth) and depth == 1
end
local function quasisplice63(x, depth)
  return can_unquote63(depth) and (not atom63(x) and hd(x) == "unquote-splicing")
end
local function expand_local(__x51)
  local ____id6 = __x51
  local __x52 = has(____id6, 1)
  local __name = has(____id6, 2)
  local __value = has(____id6, 3)
  setenv(__name, {
    _stash = true,
    variable = true
  })
  return {"%local", __name, macroexpand(__value)}
end
local function expand_function(__x54)
  local ____id7 = __x54
  local __x55 = has(____id7, 1)
  local __args = has(____id7, 2)
  local __body1 = cut(____id7, 2)
  add(environment, {})
  local ____id8 = {xpcall(function ()
    local ____o5 = __args
    local ____i7 = nil
    for ____i7 in next, ____o5 do
      local ____x56 = ____o5[____i7]
      setenv(____x56, {
        _stash = true,
        variable = true
      })
    end
    return join({"%function", __args}, macroexpand(__body1))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e14 = nil
      if string63(m) then
        __e14 = clip(m, search(m, ": ") + 2)
      else
        local __e15 = nil
        if nil63(m) then
          __e15 = ""
        else
          __e15 = str(m)
        end
        __e14 = __e15
      end
      return {
        stack = debug.traceback(),
        message = __e14
      }
    end
  end)}
  local ____ok = has(____id8, 1)
  local ____r27 = has(____id8, 2)
  drop(environment)
  if ____ok then
    return ____r27
  else
    error(____r27)
  end
end
local function expand_definition(__x60)
  local ____id9 = __x60
  local __x61 = has(____id9, 1)
  local __name1 = has(____id9, 2)
  local __args2 = has(____id9, 3)
  local __body2 = cut(____id9, 3)
  add(environment, {})
  local ____id10 = {xpcall(function ()
    local ____o6 = __args2
    local ____i8 = nil
    for ____i8 in next, ____o6 do
      local ____x62 = ____o6[____i8]
      setenv(____x62, {
        _stash = true,
        variable = true
      })
    end
    return join({__x61, __name1, __args2}, macroexpand(__body2))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e16 = nil
      if string63(m) then
        __e16 = clip(m, search(m, ": ") + 2)
      else
        local __e17 = nil
        if nil63(m) then
          __e17 = ""
        else
          __e17 = str(m)
        end
        __e16 = __e17
      end
      return {
        stack = debug.traceback(),
        message = __e16
      }
    end
  end)}
  local ____ok1 = has(____id10, 1)
  local ____r29 = has(____id10, 2)
  drop(environment)
  if ____ok1 then
    return ____r29
  else
    error(____r29)
  end
end
local function expand_macro(form)
  return macroexpand(expand1(form))
end
function expand1(__x66)
  local ____id11 = __x66
  local __name2 = has(____id11, 1)
  local __body3 = cut(____id11, 1)
  return apply(macro_function(__name2), __body3)
end
function real63(x)
  return number63(x) and (not nan63(x) and not inf63(x))
end
function valid_access63(str)
  return _35(str) > 2 and (not( "." == char(str, 0)) and (not( "." == char(str, edge(str))) and not search(str, "..")))
end
function parse_access(str)
  return reduce(function (a, b)
    local __n8 = number(a)
    if is63(__n8) then
      return {"at", b, __n8}
    else
      return {"%idx", b, a}
    end
  end, reverse(split(str, ".")))
end
function parse_access63(form)
  return string63(form) and (not string_literal63(form) and (not id_literal63(form) and (is63(search(form, ".")) and valid_access63(form))))
end
function expand_access(form)
  if parse_access63(form) then
    return parse_access(form)
  end
end
expand_atom_functions42 = {}
add(expand_atom_functions42, expand_access)
function expand_atom(form)
  local ____x69 = expand_atom_functions42
  local ____i9 = 0
  while ____i9 < _35(____x69) do
    local __f = ____x69[____i9 + 1]
    local __x70 = __f(form)
    if not( __x70 == nil) then
      return __x70
    end
    ____i9 = ____i9 + 1
  end
  return form
end
function macroexpand_atom(form)
  if symbol63(form) then
    return macroexpand(symbol_expansion(form))
  else
    local __expr = expand_atom(form)
    if __expr == form then
      return __expr
    else
      return macroexpand(__expr)
    end
  end
end
function macroexpand(form)
  if atom63(form) then
    return macroexpand_atom(form)
  else
    if none63(form) then
      return map(macroexpand, form)
    else
      local __x71 = macroexpand(hd(form))
      local __args4 = tl(form)
      if nil63(__x71) then
        return macroexpand(__args4)
      else
        if __x71 == "%local" then
          return expand_local(form)
        else
          if __x71 == "%function" then
            return expand_function(form)
          else
            if __x71 == "%global-function" then
              return expand_definition(form)
            else
              if __x71 == "%local-function" then
                return expand_definition(form)
              else
                if __x71 == "%expansion" then
                  return form[2]
                else
                  if macro63(__x71) then
                    return expand_macro(form)
                  else
                    return join({__x71}, map(macroexpand, __args4))
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
function macroexpand(form)
  print(str({"macroexpand", form}))
  if parse_access63(form) then
    return macroexpand(parse_access(form))
  else
    if symbol63(form) then
      return macroexpand(symbol_expansion(form))
    else
      if atom63(form) then
        return form
      else
        if none63(form) then
          return map(macroexpand, form)
        else
          local __x74 = macroexpand(hd(form))
          local __args5 = tl(form)
          local __form = join({__x74}, __args5)
          if __x74 == nil then
            return macroexpand(__args5)
          else
            if __x74 == "%local" then
              return expand_local(__form)
            else
              if __x74 == "%function" then
                return expand_function(__form)
              else
                if __x74 == "%global-function" then
                  return expand_definition(__form)
                else
                  if __x74 == "%local-function" then
                    return expand_definition(__form)
                  else
                    if __x74 == "%expansion" then
                      return __form[2]
                    else
                      if macro63(__x74) then
                        return expand_macro(__form)
                      else
                        return join({__x74}, map(macroexpand, __args5))
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
function macroexpand(form)
  if parse_access63(form) then
    return macroexpand(parse_access(form))
  else
    if symbol63(form) then
      return macroexpand(symbol_expansion(form))
    else
      if atom63(form) then
        return form
      else
        local __x77 = hd(form)
        if __x77 == "%local" then
          return expand_local(form)
        else
          if __x77 == "%function" then
            return expand_function(form)
          else
            if __x77 == "%global-function" then
              return expand_definition(form)
            else
              if __x77 == "%local-function" then
                return expand_definition(form)
              else
                if __x77 == "%expansion" then
                  return form[2]
                else
                  if macro63(__x77) then
                    return expand_macro(form)
                  else
                    if parse_access63(__x77) then
                      return macroexpand(join({parse_access(__x77)}, tl(form)))
                    else
                      return map(macroexpand, form)
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
local function quasiquote_list(form, depth)
  local __xs = {{"quasilist"}}
  local ____o7 = form
  local __k6 = nil
  for __k6 in next, ____o7 do
    local __v6 = ____o7[__k6]
    if not number63(__k6) then
      local __e18 = nil
      if quasisplice63(__v6, depth) then
        __e18 = quasiexpand(__v6[2])
      else
        __e18 = quasiexpand(__v6, depth)
      end
      local __v7 = __e18
      last(__xs)[__k6] = __v7
    end
  end
  local ____x81 = form
  local ____i11 = 0
  while ____i11 < _35(____x81) do
    local __x82 = ____x81[____i11 + 1]
    if quasisplice63(__x82, depth) then
      local __x83 = quasiexpand(__x82[2])
      add(__xs, __x83)
      add(__xs, {"quasilist"})
    else
      add(last(__xs), quasiexpand(__x82, depth))
    end
    ____i11 = ____i11 + 1
  end
  local __pruned = keep(function (x)
    return _35(x) > 1 or (not( hd(x) == "quasilist") or props63(x))
  end, __xs)
  if one63(__pruned) then
    return hd(__pruned)
  else
    return join({"join"}, __pruned)
  end
end
function quasiexpand(form, depth)
  if quasiquoting63(depth) then
    if atom63(form) then
      return {"quote", form}
    else
      if can_unquote63(depth) and hd(form) == "unquote" then
        return quasiexpand(form[2])
      else
        if hd(form) == "unquote" or hd(form) == "unquote-splicing" then
          return quasiquote_list(form, depth - 1)
        else
          if hd(form) == "quasiquote" then
            return quasiquote_list(form, depth + 1)
          else
            return quasiquote_list(form, depth)
          end
        end
      end
    end
  else
    if atom63(form) then
      return form
    else
      if hd(form) == "quote" then
        return form
      else
        if hd(form) == "quasiquote" then
          return quasiexpand(form[2], 1)
        else
          return map(function (x)
            return quasiexpand(x, depth)
          end, form)
        end
      end
    end
  end
end
function expand_if(__x87)
  local ____id12 = __x87
  local __a = has(____id12, 1)
  local __b1 = has(____id12, 2)
  local __c = cut(____id12, 2)
  if is63(__b1) then
    return {join({"%if", __a, __b1}, expand_if(__c))}
  else
    if is63(__a) then
      return {__a}
    end
  end
end
setenv("indent-level", {
  _stash = true,
  toplevel = true,
  value = 0
})
setenv("indent-level", {
  _stash = true,
  symbol = {"get-value", {"quote", "indent-level"}}
})
function indentation()
  local __s = ""
  local __i12 = 0
  while __i12 < has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") do
    __s = __s .. "  "
    __i12 = __i12 + 1
  end
  return __s
end
local reserved = {
  all = {
    ["="] = true,
    ["=="] = true,
    ["+"] = true,
    ["-"] = true,
    ["%"] = true,
    ["*"] = true,
    ["/"] = true,
    ["<"] = true,
    [">"] = true,
    ["<="] = true,
    [">="] = true
  },
  js = {
    ["break"] = true,
    case = true,
    catch = true,
    class = true,
    const = true,
    continue = true,
    debugger = true,
    default = true,
    delete = true,
    ["do"] = true,
    ["else"] = true,
    eval = true,
    finally = true,
    ["for"] = true,
    ["function"] = true,
    ["if"] = true,
    import = true,
    ["in"] = true,
    instanceof = true,
    let = true,
    ["return"] = true,
    switch = true,
    throw = true,
    try = true,
    typeof = true,
    var = true,
    void = true,
    with = true
  },
  lua = {
    ["and"] = true,
    ["end"] = true,
    ["in"] = true,
    ["load"] = true,
    ["repeat"] = true,
    ["while"] = true,
    ["break"] = true,
    ["false"] = true,
    ["local"] = true,
    ["return"] = true,
    ["do"] = true,
    ["for"] = true,
    ["nil"] = true,
    ["then"] = true,
    ["else"] = true,
    ["function"] = true,
    ["not"] = true,
    ["true"] = true,
    ["elseif"] = true,
    ["if"] = true,
    ["or"] = true,
    ["until"] = true
  },
  py = {
    ["and"] = true,
    except = true,
    lambda = true,
    with = true,
    as = true,
    finally = true,
    nonlocal = true,
    ["while"] = true,
    assert = true,
    ["false"] = true,
    None = true,
    yield = true,
    ["break"] = true,
    ["for"] = true,
    ["not"] = true,
    class = true,
    from = true,
    ["or"] = true,
    continue = true,
    global = true,
    pass = true,
    def = true,
    ["if"] = true,
    raise = true,
    del = true,
    import = true,
    ["return"] = true,
    elif = true,
    ["in"] = true,
    True = true,
    ["else"] = true,
    is = true,
    try = true,
    str = true,
    print = true
  },
  cmake = {
    AND = true,
    OR = true,
    TRUE = true,
    FALSE = true,
    ON = true,
    OFF = true,
    Y = true,
    N = true
  }
}
function reserved63(x)
  return has63(reserved.all, x) or has63(reserved[has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")], x)
end
local function valid_code63(n)
  return number_code63(n) or (n > 64 and n < 91 or (n > 96 and n < 123 or n == 95))
end
local function compile_keyword(x)
  return escape(x)
end
function compile_name(name)
  if keyword63(name) then
    return compile(clip(name, 1))
  else
    return compile(name)
  end
end
function compile_id(id, raw63)
  if keyword63(id) then
    return compile_keyword(id)
  else
    if code(id, 0) == 46 then
      return "." .. compile_id(clip(id, 1), true)
    else
      local __e19 = nil
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "py" then
        __e19 = "L_"
      else
        __e19 = "_"
      end
      local __x93 = __e19
      local __e20 = nil
      if number_code63(code(id, 0)) then
        __e20 = __x93
      else
        __e20 = ""
      end
      local __id111 = __e20
      local __i13 = 0
      while __i13 < _35(id) do
        local __c1 = char(id, __i13)
        local __n10 = code(__c1)
        local __e21 = nil
        if __c1 == "-" and not( id == "-") then
          local __e24 = nil
          if __i13 == 0 then
            __e24 = __x93
          else
            __e24 = "_"
          end
          __e21 = __e24
        else
          local __e22 = nil
          if valid_code63(__n10) then
            __e22 = __c1
          else
            local __e23 = nil
            if __i13 == 0 then
              __e23 = __x93 .. __n10
            else
              __e23 = __n10
            end
            __e22 = __e23
          end
          __e21 = __e22
        end
        local __c11 = __e21
        __id111 = __id111 .. __c11
        __i13 = __i13 + 1
      end
      if raw63 then
        return __id111
      else
        if reserved63(__id111) then
          return __x93 .. __id111
        else
          return __id111
        end
      end
    end
  end
end
function valid_id63(x)
  return some63(x) and x == compile_id(x)
end
local __names = {}
function unique(x)
  local __x94 = compile_id(x)
  if has63(__names, __x94) then
    local __i14 = __names[__x94]
    __names[__x94] = __names[__x94] + 1
    return unique(__x94 .. __i14)
  else
    __names[__x94] = 1
    return "__" .. __x94
  end
end
function key(k)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    return compile(k)
  else
    if string_literal63(k) then
      local __i15 = inner(k)
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        local __e25 = nil
        if valid_id63(__i15) then
          __e25 = __i15
        else
          __e25 = k
        end
        return screamcase(__e25)
      else
        if valid_id63(__i15) then
          return __i15
        else
          return "[" .. (k .. "]")
        end
      end
    else
      return "[" .. (compile(k) .. "]")
    end
  end
end
function mapo(f, t)
  local __o8 = {}
  local ____o9 = t
  local __k7 = nil
  for __k7 in next, ____o9 do
    local __v8 = ____o9[__k7]
    local __x95 = f(__v8)
    if is63(__x95) then
      add(__o8, literal(__k7))
      add(__o8, __x95)
    end
  end
  return __o8
end
local ____x97 = object({})
local ____x98 = object({})
____x98.js = "!"
____x98.lua = "not"
____x98.py = "not"
____x98.cmake = "NOT"
____x97["%not"] = ____x98
____x97["%unm"] = "-"
local ____x99 = object({})
____x99["%mul"] = "*"
____x99["%div"] = "/"
____x99["%idiv"] = "//"
____x99["%mod"] = "%"
local ____x100 = object({})
local ____x101 = object({})
____x101.js = "+"
____x101.lua = ".."
____x101.py = "+"
____x100["%cat"] = ____x101
local ____x102 = object({})
____x102["%add"] = "+"
____x102["%sub"] = "-"
local ____x103 = object({})
local ____x104 = object({})
____x104.cmake = "LESS"
____x104.all = "<"
____x103["%lt"] = ____x104
local ____x105 = object({})
____x105.cmake = "GREATER"
____x105.all = ">"
____x103["%gt"] = ____x105
local ____x106 = object({})
____x106.cmake = "LESS_EQUAL"
____x106.all = "<="
____x103["%le"] = ____x106
local ____x107 = object({})
____x107.cmake = "GREATER_EQUAL"
____x107.all = ">="
____x103["%ge"] = ____x107
local ____x108 = object({})
local ____x109 = object({})
____x109.js = "==="
____x109.lua = "=="
____x109.py = "=="
____x108["%eq"] = ____x109
local ____x110 = object({})
local ____x111 = object({})
____x111.py = "in"
____x110["%in"] = ____x111
local ____x112 = object({})
____x112.py = "is"
____x110["%is"] = ____x112
local ____x113 = object({})
local ____x114 = object({})
____x114.js = "&&"
____x114.lua = "and"
____x114.py = "and"
____x114.cmake = "AND"
____x113["%and"] = ____x114
local ____x115 = object({})
local ____x116 = object({})
____x116.js = "||"
____x116.lua = "or"
____x116.py = "or"
____x116.cmake = "OR"
____x115["%or"] = ____x116
local infix = {____x97, ____x99, ____x100, ____x102, ____x103, ____x108, ____x110, ____x113, ____x115}
local function unary63(form)
  return two63(form) and in63(hd(form), {"%not", "%unm"})
end
local function index(k)
  if number63(k) then
    return k - 1
  end
end
local function precedence(form)
  if not( atom63(form) or unary63(form)) then
    if atom63(hd(form)) then
      local ____o10 = infix
      local __k8 = nil
      for __k8 in next, ____o10 do
        local __v9 = ____o10[__k8]
        if has63(__v9, hd(form)) then
          return index(__k8)
        end
      end
    end
  end
  return 0
end
local function getop(op)
  if string63(op) then
    return find(function (level)
      local __x118 = has(level, op)
      if __x118 == true then
        return op
      else
        if string63(__x118) then
          return __x118
        else
          if is63(__x118) then
            return has(__x118, has(setenv("target", {
              _stash = true,
              toplevel = true
            }), "value")) or has(__x118, "all")
          end
        end
      end
    end, infix)
  end
end
local function infix63(x)
  return is63(getop(x))
end
function infix_operator63(x)
  return not atom63(x) and infix63(hd(x))
end
function compile_args(args, default63)
  local __s1 = "("
  local __c2 = ""
  local ____x119 = args
  local ____i18 = 0
  while ____i18 < _35(____x119) do
    local __x120 = ____x119[____i18 + 1]
    __s1 = __s1 .. (__c2 .. compile(__x120))
    if (has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" or has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake") and (default63 and (not id_literal63(__x120) and not( __x120 == "..."))) then
      local __e26 = nil
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        __e26 = ""
      else
        __e26 = "=None"
      end
      __s1 = __s1 .. __e26
    end
    local __e27 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      __e27 = " "
    else
      __e27 = ", "
    end
    __c2 = __e27
    ____i18 = ____i18 + 1
  end
  return __s1 .. ")"
end
local function escape_newlines(s)
  if nil63(search(s, "\n")) and nil63(search(s, "\r")) then
    return s
  else
    local __s11 = ""
    local __i19 = 0
    while __i19 < _35(s) do
      local __c3 = char(s, __i19)
      local __e28 = nil
      if __c3 == "\n" then
        __e28 = "\\n"
      else
        local __e29 = nil
        if __c3 == "\r" then
          __e29 = "\\r"
        else
          __e29 = __c3
        end
        __e28 = __e29
      end
      __s11 = __s11 .. __e28
      __i19 = __i19 + 1
    end
    return __s11
  end
end
local function compile_nil()
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    return "None"
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      return "\"\""
    else
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "lua" then
        return "nil"
      else
        return "undefined"
      end
    end
  end
end
local function compile_boolean(x)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    if x then
      return "True"
    else
      return "False"
    end
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      if x then
        return "ON"
      else
        return "OFF"
      end
    else
      if x then
        return "true"
      else
        return "false"
      end
    end
  end
end
local function triple_quoted63(x)
  return string_literal63(x) and (string_literal63(inner(x)) and string_literal63(inner(inner(x))))
end
local function un_triple_quote(x)
  return escape(inner(inner(inner(x))))
end
local function compile_string(x)
  if triple_quoted63(x) then
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      return x
    else
      return escape_newlines(un_triple_quote(x))
    end
  else
    return escape_newlines(x)
  end
end
local function compile_rest()
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    return "*_args, **_keys"
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "js" then
      return "..." .. compile("*args")
    else
      return "..."
    end
  end
end
local function compile_atom(x, raw63)
  if x == "nil" then
    return compile_nil()
  else
    if x == "..." then
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
                if x == inf then
                  return "inf"
                else
                  if x == _inf then
                    return "-inf"
                  else
                    if number63(x) then
                      return x .. ""
                    else
                      error("Cannot compile atom: " .. str(x))
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
local function terminator(stmt63)
  if not stmt63 then
    return ""
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "js" then
      return ";\n"
    else
      return "\n"
    end
  end
end
local function compile_special(form, stmt63)
  local ____id13 = form
  local __x121 = has(____id13, 1)
  local __args6 = cut(____id13, 1)
  local ____id14 = getenv(__x121)
  local __special = has(____id14, "special")
  local __stmt = has(____id14, "stmt")
  local __self_tr63 = has(____id14, "tr")
  local __e30 = nil
  if stmt63 and not __stmt then
    __e30 = indentation()
  else
    __e30 = ""
  end
  local __p = __e30
  local __tr = terminator(stmt63 and not __self_tr63)
  return __p .. (apply(__special, __args6) .. __tr)
end
local function parenthesize_call63(x)
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0
end
function method_call63(form)
  local __e31 = nil
  if list63(form) then
    __e31 = hd(form)
  else
    __e31 = form
  end
  local __x122 = __e31
  return string63(__x122) and (_35(__x122, 1) > 1 and char(__x122, 0) == ".")
end
local function compile_call(form)
  local __f1 = hd(form)
  local __f11 = compile_name(__f1)
  local __args7 = stash42(tl(form))
  local __e32 = nil
  if method_call63(hd(__args7)) then
    __e32 = mapcat(compile, __args7, "")
  else
    __e32 = compile_args(__args7)
  end
  local __args8 = __e32
  if parenthesize_call63(__f1) then
    return "(" .. (__f11 .. (")" .. __args8))
  else
    return __f11 .. __args8
  end
end
local function op_delims(parent, child, ...)
  local ____r79 = unstash({...})
  local __parent = destash33(parent, ____r79)
  local __child = destash33(child, ____r79)
  local ____id15 = ____r79
  local __right = has(____id15, "right")
  local __e33 = nil
  if __right then
    __e33 = _6261
  else
    __e33 = _62
  end
  if __e33(precedence(__child), precedence(__parent)) then
    return {"(", ")"}
  else
    return {"", ""}
  end
end
local function compile_infix(form)
  local ____id16 = form
  local __op = has(____id16, 1)
  local ____id17 = cut(____id16, 1)
  local __a1 = has(____id17, 1)
  local __b2 = has(____id17, 2)
  local ____id18 = op_delims(form, __a1)
  local __ao = has(____id18, 1)
  local __ac = has(____id18, 2)
  local ____id19 = op_delims(form, __b2, {
    _stash = true,
    right = true
  })
  local __bo = has(____id19, 1)
  local __bc = has(____id19, 2)
  local __a2 = compile(__a1)
  local __b3 = compile(__b2)
  local __op1 = getop(__op)
  if unary63(form) then
    return __op1 .. (__ao .. (" " .. (__a2 .. __ac)))
  else
    return __ao .. (__a2 .. (__ac .. (" " .. (__op1 .. (" " .. (__bo .. (__b3 .. __bc)))))))
  end
end
function compile_body(body)
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") + 1
  local ____x126 = compile(body, {
    _stash = true,
    stmt = true
  })
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") - 1
  local __s2 = ____x126
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" and none63(__s2) then
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = has(setenv("indent-level", {
      _stash = true,
      toplevel = true
    }), "value") + 1
    local ____x127 = indentation() .. "pass\n"
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = has(setenv("indent-level", {
      _stash = true,
      toplevel = true
    }), "value") - 1
    return ____x127
  else
    return __s2
  end
end
function compile_function(args, body, ...)
  local ____r82 = unstash({...})
  local __args9 = destash33(args, ____r82)
  local __body4 = destash33(body, ____r82)
  local ____id20 = ____r82
  local __name3 = has(____id20, "name")
  local __prefix = has(____id20, "prefix")
  local __async = has(____id20, "async")
  local __e34 = nil
  if __name3 then
    __e34 = compile_name(__name3)
  else
    __e34 = ""
  end
  local __id21 = __e34
  local __e35 = nil
  if has(__args9, "rest") then
    __e35 = join(__args9, {"..."})
  else
    __e35 = __args9
  end
  local __args12 = __e35
  local __e36 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    __e36 = compile_args(join({{"%compile", __id21}}, __args12), true)
  else
    __e36 = compile_args(__args12, true)
  end
  local __args10 = __e36
  local __body5 = compile_body(__body4)
  local __ind = indentation()
  local __e37 = nil
  if __prefix then
    __e37 = __prefix .. " "
  else
    __e37 = ""
  end
  local __p1 = __e37
  local __e38 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __e38 = ""
  else
    local __e39 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      __e39 = "endfunction()"
    else
      __e39 = "end"
    end
    __e38 = __e39
  end
  local __tr1 = __e38
  local __e40 = nil
  if __async and not( has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua") then
    __e40 = "async "
  else
    __e40 = ""
  end
  local __a3 = __e40
  if __name3 then
    __tr1 = __tr1 .. "\n"
  end
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    return __a3 .. ("function " .. (__id21 .. (__args10 .. (" {\n" .. (__body5 .. (__ind .. ("}" .. __tr1)))))))
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      local __e41 = nil
      if none63(__ind) then
        __e41 = "\n"
      else
        __e41 = ""
      end
      local __ws = __e41
      return __a3 .. ("def " .. (__id21 .. (__args10 .. (":\n" .. (__body5 .. __ws)))))
    else
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        return __a3 .. ("function" .. (__args10 .. ("\n" .. (__body5 .. (__ind .. __tr1)))))
      else
        return __p1 .. ("function " .. (__id21 .. (__args10 .. ("\n" .. (__body5 .. (__ind .. __tr1))))))
      end
    end
  end
end
local function can_return63(form)
  return is63(form) and (atom63(form) or not( hd(form) == "%return") and not statement63(hd(form)))
end
function compile(form, raw63, ...)
  local ____r84 = unstash({...})
  local __form1 = destash33(form, ____r84)
  local __raw63 = destash33(raw63, ____r84)
  local ____id22 = ____r84
  local __stmt1 = has(____id22, "stmt")
  if nil63(__form1) then
    return ""
  else
    if special_form63(__form1) then
      return compile_special(__form1, __stmt1)
    else
      local __tr2 = terminator(__stmt1)
      local __e42 = nil
      if __stmt1 then
        __e42 = indentation()
      else
        __e42 = ""
      end
      local __ind1 = __e42
      local __e43 = nil
      if atom63(__form1) then
        __e43 = compile_atom(__form1, __raw63)
      else
        local __e44 = nil
        if infix63(hd(__form1)) then
          __e44 = compile_infix(__form1)
        else
          __e44 = compile_call(__form1)
        end
        __e43 = __e44
      end
      local __form2 = __e43
      return __ind1 .. (__form2 .. __tr2)
    end
  end
end
local function lower_statement(form, tail63)
  local __hoist = {}
  local __e = lower(form, __hoist, true, tail63)
  local __e45 = nil
  if some63(__hoist) and is63(__e) then
    __e45 = join({"%do"}, __hoist, {__e})
  else
    local __e46 = nil
    if is63(__e) then
      __e46 = __e
    else
      local __e47 = nil
      if _35(__hoist) > 1 then
        __e47 = join({"%do"}, __hoist)
      else
        __e47 = hd(__hoist)
      end
      __e46 = __e47
    end
    __e45 = __e46
  end
  return either(__e45, {"%do"})
end
local function lower_body(body, tail63)
  return lower_statement(join({"%do"}, body), tail63)
end
local function literal63(form)
  return atom63(form) or (hd(form) == "%array" or (hd(form) == "%object" or (hd(form) == "%list" or (hd(form) == "%ptr" or (hd(form) == "%id" or (hd(form) == "%ref" or hd(form) == ","))))))
end
local function standalone63(form)
  return not( has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua") and string_literal63(form) or (not atom63(form) and (not infix63(hd(form)) and (not literal63(form) and not( "%get" == hd(form)))) or id_literal63(form))
end
local function lower_do(args, hoist, stmt63, tail63)
  local ____x138 = almost(args)
  local ____i20 = 0
  while ____i20 < _35(____x138) do
    local __x139 = ____x138[____i20 + 1]
    local ____y = lower(__x139, hoist, stmt63)
    if yes(____y) then
      local __e1 = ____y
      if standalone63(__e1) then
        add(hoist, __e1)
      end
    end
    ____i20 = ____i20 + 1
  end
  local __e2 = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(__e2) then
    return {"%return", __e2}
  else
    return __e2
  end
end
local function lower_set(args, hoist, stmt63, tail63)
  local ____id23 = args
  local __lh = has(____id23, 1)
  local __rh = has(____id23, 2)
  local __lh1 = lower(__lh, hoist)
  local __rh1 = lower(__rh, hoist)
  add(hoist, {"%set", __lh1, __rh1})
  if not( stmt63 and not tail63 or false) then
    return __lh1
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local ____id24 = args
  local __cond = has(____id24, 1)
  local ___then = has(____id24, 2)
  local ___else = has(____id24, 3)
  if stmt63 then
    local __e49 = nil
    if is63(___else) then
      __e49 = {lower_body({___else}, tail63)}
    end
    return add(hoist, join({"%if", lower(__cond, hoist), lower_body({___then}, tail63)}, __e49))
  else
    local __e3 = unique("e")
    add(hoist, {"%local", __e3, "nil"})
    local __e48 = nil
    if is63(___else) then
      __e48 = {lower({"%set", __e3, ___else})}
    end
    add(hoist, join({"%if", lower(__cond, hoist), lower({"%set", __e3, ___then})}, __e48))
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      return {"%id", __e3}
    else
      return __e3
    end
  end
end
local function lower_short(x, args, hoist)
  local ____id25 = args
  local __a4 = has(____id25, 1)
  local __b4 = has(____id25, 2)
  local __hoist1 = {}
  local __b11 = lower(__b4, __hoist1)
  if some63(__hoist1) then
    local __id26 = unique("id")
    local __e50 = nil
    if x == "%and" then
      __e50 = {"%if", __id26, __b4, __id26}
    else
      __e50 = {"%if", __id26, __id26, __b4}
    end
    return lower({"%do", {"%local", __id26, __a4}, __e50}, hoist)
  else
    return {x, lower(__a4, hoist), __b11}
  end
end
local function lower_try(args, hoist, tail63)
  return add(hoist, {"%try", lower_body(args, tail63)})
end
local function lower_while(args, hoist)
  local ____id27 = args
  local __c4 = has(____id27, 1)
  local __body6 = cut(____id27, 1)
  local __pre1 = {}
  local __c5 = lower(__c4, __pre1)
  local __e51 = nil
  if none63(__pre1) then
    __e51 = {"%while", __c5, lower_body(__body6)}
  else
    __e51 = {"%while", true, join({"%do"}, __pre1, {{"%if", {"%not", __c5}, {"%break"}}, lower_body(__body6)})}
  end
  return add(hoist, __e51)
end
local function lower_for(args, hoist)
  local ____id28 = args
  local __h = has(____id28, 1)
  local __k9 = has(____id28, 2)
  local __body7 = cut(____id28, 2)
  return add(hoist, join({"%for", lower(__h, hoist), __k9, lower_body(__body7)}, props(__body7)))
end
local function lower_with(args, hoist, stmt63, tail63)
  local ____id29 = args
  local __h1 = has(____id29, 1)
  local __body8 = cut(____id29, 1)
  if stmt63 and not tail63 then
    return add(hoist, join({"%with", lower(__h1, hoist), lower_body(__body8, tail63)}, props(__body8)))
  else
    local __e4 = unique("e")
    add(hoist, {"%local", __e4})
    add(hoist, join({"%with", lower(__h1, hoist), lower({"%set", __e4, join({"%do"}, __body8)})}, props(__body8)))
    return __e4
  end
end
local function lower_block(kind, args, hoist, stmt63, tail63)
  local ____id30 = args
  local __name4 = has(____id30, 1)
  local __h2 = has(____id30, 2)
  local __body9 = cut(____id30, 2)
  return add(hoist, {kind, __name4, lower(__h2, hoist), lower_body(__body9, tail63)})
end
local function lower_from(args, hoist, stmt63, tail63)
  local ____id31 = args
  local __name5 = has(____id31, 1)
  local __import_ = has(____id31, 2)
  local __id32 = has(____id31, 3)
  local __as_ = has(____id31, 4)
  local __alias = has(____id31, 5)
  add(hoist, join({"from"}, args))
  return __alias or __id32
end
local function lower_import(__x173, hoist, stmt63, tail63)
  local ____id33 = __x173
  local __name6 = has(____id33, 1)
  local __alias1 = cut(____id33, 1)
  local __e52 = nil
  if hd(__alias1) == "as" then
    __e52 = __alias1[2]
  else
    __e52 = hd(__alias1)
  end
  local __as = __e52
  local __id34 = __as or __name6
  add(hoist, join({"import", __name6}, __alias1))
  if not stmt63 then
    return __id34
  end
end
local function lower_function(args, hoist)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    local __f2 = unique("f")
    return lower({"%do", join({"%local-function", __f2}, args), __f2}, hoist)
  else
    local ____id35 = args
    local __a5 = has(____id35, 1)
    local __body10 = cut(____id35, 1)
    return join({"%function", __a5, lower_body(__body10, true)}, props(__body10))
  end
end
local function lower_definition(kind, args, hoist)
  local ____id36 = args
  local __name7 = has(____id36, 1)
  local __args111 = has(____id36, 2)
  local __body11 = cut(____id36, 2)
  return add(hoist, join({kind, __name7, __args111, lower_body(__body11, true)}, props(__body11)))
end
function ref63(x)
  return list63(x) and hd63(x, "%ref")
end
function id63(x)
  return list63(x) and hd63(x, "%id")
end
function ptr63(x)
  return list63(x) and hd63(x, "%ptr")
end
function reference63(x)
  return ref63(x) or (id63(x) or ptr63(x))
end
function ptr_name(x)
  return x[2]
end
function ptr_decay(x)
  local __x181 = ptr_name(x)
  if id63(__x181) then
    return __x181
  else
    if ref63(__x181) then
      return __x181
    else
      return {"%id", __x181}
    end
  end
end
function ptr_decay(x)
  return x
end
local function lower_invoke(form, hoist)
  local __ptr = nil
  local function lower_ptr(x)
    if ptr63(x) then
      __ptr = ptr_decay(x)
      x = ptr_name(x)
    end
    return x
  end
  local __form3 = map(lower_ptr, form)
  if is63(__ptr) and not literal63(__form3) then
    add(hoist, __form3)
  else
    __ptr = __form3
  end
  return __ptr
end
local function lower_call(form, hoist)
  local __form4 = map(function (x)
    return lower(x, hoist)
  end, form)
  if some63(__form4) then
    return lower_invoke(__form4, hoist)
  end
end
local function pairwise63(form)
  return in63(hd(form), {"%lt", "%le", "%eq", "%ge", "%gt"})
end
local function lower_pairwise(form)
  if pairwise63(form) then
    local __e5 = {}
    local ____id37 = form
    local __x184 = has(____id37, 1)
    local __args121 = cut(____id37, 1)
    reduce(function (a, b)
      add(__e5, {__x184, a, b})
      return a
    end, __args121)
    return join({"%and"}, reverse(__e5))
  else
    return form
  end
end
local function lower_infix63(form)
  return infix63(hd(form)) and _35(form) > 3
end
local function lower_infix(form, hoist)
  local __form5 = lower_pairwise(form)
  local ____id38 = __form5
  local __x187 = has(____id38, 1)
  local __args13 = cut(____id38, 1)
  return lower(reduce(function (a, b)
    return {__x187, b, a}
  end, reverse(__args13)), hoist)
end
local function lower_special(form, hoist)
  local __e6 = lower_call(form, hoist)
  if __e6 then
    return add(hoist, __e6)
  end
end
function lower(form, hoist, stmt63, tail63)
  if atom63(form) then
    return form
  else
    if empty63(form) then
      return {"%array"}
    else
      if nil63(hoist) then
        return lower_statement(form)
      else
        if lower_infix63(form) then
          return lower_infix(form, hoist)
        else
          local ____id39 = form
          local __x190 = has(____id39, 1)
          local __args14 = cut(____id39, 1)
          if __x190 == "%do" then
            return lower_do(__args14, hoist, stmt63, tail63)
          else
            if __x190 == "%call" then
              return lower(__args14, hoist, stmt63, tail63)
            else
              if __x190 == "%set" then
                return lower_set(__args14, hoist, stmt63, tail63)
              else
                if __x190 == "%if" then
                  return lower_if(__args14, hoist, stmt63, tail63)
                else
                  if __x190 == "%try" then
                    return lower_try(__args14, hoist, tail63)
                  else
                    if __x190 == "%while" then
                      return lower_while(__args14, hoist)
                    else
                      if __x190 == "%for" then
                        return lower_for(__args14, hoist)
                      else
                        if __x190 == "%with" then
                          return lower_with(__args14, hoist, stmt63, tail63)
                        else
                          if __x190 == "%block" then
                            return lower_block("%block", __args14, hoist, stmt63, tail63)
                          else
                            if __x190 == "%cases" then
                              return lower_cases(__args14, hoist, stmt63, tail63)
                            else
                              if __x190 == "import" then
                                return lower_import(__args14, hoist, stmt63, tail63)
                              else
                                if __x190 == "from" then
                                  return lower_from(__args14, hoist, stmt63, tail63)
                                else
                                  if __x190 == "%function" then
                                    return lower_function(__args14, hoist)
                                  else
                                    if __x190 == "%local-function" or __x190 == "%global-function" then
                                      return lower_definition(__x190, __args14, hoist)
                                    else
                                      if in63(__x190, {"%and", "%or"}) then
                                        return lower_short(__x190, __args14, hoist)
                                      else
                                        if statement63(__x190) then
                                          return lower_special(form, hoist)
                                        else
                                          return lower_call(form, hoist)
                                        end
                                      end
                                    end
                                  end
                                end
                              end
                            end
                          end
                        end
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
    end
  end
end
function expand(form)
  return lower(macroexpand(form))
end
local load1 = loadstring or load
local function run(code)
  local ____id40 = {load1(code)}
  local __f3 = has(____id40, 1)
  local __e7 = has(____id40, 2)
  if __f3 then
    return __f3()
  else
    error(__e7 .. (" in " .. code))
  end
end
local function eval_result(globals, locals)
  return lumen_result
end
function eval(form, globals, locals)
  local ____prev = has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = "lua"
  local ____id41 = {xpcall(function ()
    local ____prev1 = has(setenv("indent-level", {
      _stash = true,
      toplevel = true
    }), "value")
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = 0
    local ____id42 = {xpcall(function ()
      return compile(expand({"%set", "lumen-result", form}))
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
    local ____ok3 = has(____id42, 1)
    local ____x196 = has(____id42, 2)
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = ____prev1
    if ____ok3 then
      return ____x196
    else
      error(____x196)
    end
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e55 = nil
      if string63(m) then
        __e55 = clip(m, search(m, ": ") + 2)
      else
        local __e56 = nil
        if nil63(m) then
          __e56 = ""
        else
          __e56 = str(m)
        end
        __e55 = __e56
      end
      return {
        stack = debug.traceback(),
        message = __e55
      }
    end
  end)}
  local ____ok2 = has(____id41, 1)
  local ____x193 = has(____id41, 2)
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = ____prev
  local __e57 = nil
  if ____ok2 then
    __e57 = ____x193
  else
    error(____x193)
    __e57 = nil
  end
  local __code = __e57
  run(__code, globals, locals)
  return eval_result(globals, locals)
end
function immediate_call63(x)
  return not atom63(x) and (not atom63(hd(x)) and hd(hd(x)) == "%function")
end
local function ___37do__special(...)
  local __forms1 = unstash({...})
  local __s3 = ""
  local ____x201 = __forms1
  local ____i21 = 0
  while ____i21 < _35(____x201) do
    local __x202 = ____x201[____i21 + 1]
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" and (immediate_call63(__x202) and "\n" == char(__s3, edge(__s3))) then
      __s3 = clip(__s3, 0, edge(__s3)) .. ";\n"
    end
    __s3 = __s3 .. compile(__x202, {
      _stash = true,
      stmt = true
    })
    if not atom63(__x202) then
      if hd(__x202) == "%return" or hd(__x202) == "%break" then
        break
      end
    end
    ____i21 = ____i21 + 1
  end
  return __s3
end
setenv("%do", {
  _stash = true,
  special = ___37do__special,
  stmt = true,
  tr = true
})
local function ___37cmake_block__special(body)
  local __ind2 = indentation()
  local __s4 = ""
  __s4 = __s4 .. (__ind2 .. "block(SCOPE_FOR VARIABLES)\n")
  __s4 = __s4 .. compile_body(body)
  __s4 = __s4 .. (__ind2 .. "endblock()\n")
  return __s4
end
setenv("%cmake-block", {
  _stash = true,
  special = ___37cmake_block__special,
  stmt = true,
  tr = true
})
local function ___37if__special(cond, cons, alt)
  local __cond1 = compile(cond)
  local __cons = compile_body(cons)
  local __e58 = nil
  if alt then
    __e58 = compile_body(alt)
  end
  local __alt = __e58
  local __ind3 = indentation()
  local __s5 = ""
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __s5 = __s5 .. (__ind3 .. ("if (" .. (__cond1 .. (") {\n" .. (__cons .. (__ind3 .. "}"))))))
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      __s5 = __s5 .. (__ind3 .. ("if " .. (__cond1 .. (":\n" .. __cons))))
    else
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        __s5 = __s5 .. (__ind3 .. ("if(" .. (__cond1 .. (")\n" .. __cons))))
      else
        __s5 = __s5 .. (__ind3 .. ("if " .. (__cond1 .. (" then\n" .. __cons))))
      end
    end
  end
  if __alt and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __s5 = __s5 .. (" else {\n" .. (__alt .. (__ind3 .. "}")))
  else
    if __alt and has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      __s5 = __s5 .. (__ind3 .. ("else:\n" .. __alt))
    else
      if __alt and has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        __s5 = __s5 .. (__ind3 .. ("else()\n" .. __alt))
      else
        if __alt then
          __s5 = __s5 .. (__ind3 .. ("else\n" .. __alt))
        end
      end
    end
  end
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    return __s5 .. (__ind3 .. "end\n")
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "js" then
      return __s5 .. "\n"
    else
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        return __s5 .. (__ind3 .. "endif()\n")
      else
        return __s5
      end
    end
  end
end
setenv("%if", {
  _stash = true,
  special = ___37if__special,
  stmt = true,
  tr = true
})
local function ___37while__special(cond, form)
  local __cond2 = compile(cond)
  local __body12 = compile_body(form)
  local __ind4 = indentation()
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    return __ind4 .. ("while (" .. (__cond2 .. (") {\n" .. (__body12 .. (__ind4 .. "}\n")))))
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      return __ind4 .. ("while " .. (__cond2 .. (":\n" .. __body12)))
    else
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        return __ind4 .. ("while(" .. (__cond2 .. (")\n" .. (__body12 .. (__ind4 .. "endwhile()\n")))))
      else
        return __ind4 .. ("while " .. (__cond2 .. (" do\n" .. (__body12 .. (__ind4 .. "end\n")))))
      end
    end
  end
end
setenv("%while", {
  _stash = true,
  special = ___37while__special,
  stmt = true,
  tr = true
})
local function ___37for__special(t, k, form, ...)
  local ____r136 = unstash({...})
  local __t = destash33(t, ____r136)
  local __k10 = destash33(k, ____r136)
  local __form6 = destash33(form, ____r136)
  local ____id43 = ____r136
  local __async1 = has(____id43, "async")
  local __t1 = compile(__t)
  local __k11 = compile(__k10)
  local __ind5 = indentation()
  local __body13 = compile_body(__form6)
  local __e59 = nil
  if __async1 then
    __e59 = "async "
  else
    __e59 = ""
  end
  local __a6 = __e59
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    return __ind5 .. ("for " .. (__k11 .. (" in next, " .. (__t1 .. (" do\n" .. (__body13 .. (__ind5 .. "end\n")))))))
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      return __ind5 .. (__a6 .. ("for " .. (__k11 .. (" in " .. (__t1 .. (":\n" .. __body13))))))
    else
      return __ind5 .. ("for (" .. (__k11 .. (" in " .. (__t1 .. (") {\n" .. (__body13 .. (__ind5 .. "}\n")))))))
    end
  end
end
setenv("%for", {
  _stash = true,
  special = ___37for__special,
  stmt = true,
  tr = true
})
local function ___37with__special(t, form, ...)
  local ____r137 = unstash({...})
  local __t2 = destash33(t, ____r137)
  local __form7 = destash33(form, ____r137)
  local ____id44 = ____r137
  local __async2 = has(____id44, "async")
  local __t3 = compile(__t2)
  local __ind6 = indentation()
  local __body14 = compile_body(__form7)
  local __e60 = nil
  if __async2 then
    __e60 = "async "
  else
    __e60 = ""
  end
  local __a7 = __e60
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    return __ind6 .. (__a7 .. ("with " .. (__t3 .. (":\n" .. __body14))))
  else
    return ""
  end
end
setenv("%with", {
  _stash = true,
  special = ___37with__special,
  stmt = true,
  tr = true
})
local function ___37block__special(name, t, form)
  local __t4 = compile(t)
  local __ind7 = indentation()
  local __body15 = compile_body(form)
  local __e61 = nil
  if some63(__t4) then
    __e61 = " "
  else
    __e61 = ""
  end
  local __sep = __e61
  local __e62 = nil
  if some63(__t4) then
    __e62 = "("
  else
    __e62 = ""
  end
  local __lh11 = __e62
  local __e63 = nil
  if some63(__t4) then
    __e63 = ")"
  else
    __e63 = ""
  end
  local __rh11 = __e63
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    return __ind7 .. (name .. (__sep .. (__t4 .. (":\n" .. __body15))))
  else
    return __ind7 .. (name .. (__sep .. (__lh11 .. (__t4 .. (__rh11 .. (__sep .. ("{\n" .. (__body15 .. (__ind7 .. "}\n")))))))))
  end
end
setenv("%block", {
  _stash = true,
  special = ___37block__special,
  stmt = true,
  tr = true
})
local function ___37try__special(form)
  local __ind8 = indentation()
  local __body16 = compile_body(form)
  local __e64 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e64 = {"%do", {"import", "sys"}, {"%local", "e", {{"%idx", "sys", "exc_info"}}}, {"%return", {"%array", false, {"%get", "e", 1}, "e"}}}
  else
    __e64 = {"%return", {"%array", false, "e"}}
  end
  local __hf = __e64
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") + 1
  local ____x215 = compile(__hf, {
    _stash = true,
    stmt = true
  })
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") - 1
  local __h3 = ____x215
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    return __ind8 .. ("try {\n" .. (__body16 .. (__ind8 .. ("}\n" .. (__ind8 .. ("catch (e) {\n" .. (__h3 .. (__ind8 .. "}\n"))))))))
  else
    return __ind8 .. ("try:\n" .. (__body16 .. (__ind8 .. ("except:\n" .. __h3))))
  end
end
setenv("%try", {
  _stash = true,
  special = ___37try__special,
  stmt = true,
  tr = true
})
local function ___37delete__special(place)
  local __e65 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e65 = "del "
  else
    __e65 = "delete "
  end
  return indentation() .. (__e65 .. compile(place))
end
setenv("%delete", {
  _stash = true,
  special = ___37delete__special,
  stmt = true
})
local function ___37break__special()
  local __e66 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    __e66 = "()"
  else
    __e66 = ""
  end
  return indentation() .. ("break" .. __e66)
end
setenv("%break", {
  _stash = true,
  special = ___37break__special,
  stmt = true
})
local function ___37function__special(args, ...)
  local ____r142 = unstash({...})
  local __args17 = destash33(args, ____r142)
  local ____id45 = ____r142
  local __body17 = cut(____id45, 0)
  return apply(compile_function, join({__args17}, __body17, {}))
end
setenv("%function", {
  _stash = true,
  special = ___37function__special
})
local function ___37global_function__special(name, args, ...)
  local ____r143 = unstash({...})
  local __name8 = destash33(name, ____r143)
  local __args18 = destash33(args, ____r143)
  local ____id46 = ____r143
  local __body18 = cut(____id46, 0)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or (has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake") then
    local ____x221 = object({__args18})
    ____x221.name = __name8
    local ____x222 = object({})
    ____x222.name = __name8
    local __x220 = apply(compile_function, join(____x221, __body18, ____x222))
    return indentation() .. __x220
  else
    return compile({"%set", __name8, join({"%function", __args18}, __body18)}, {
      _stash = true,
      stmt = true
    })
  end
end
setenv("%global-function", {
  _stash = true,
  special = ___37global_function__special,
  stmt = true,
  tr = true
})
local function ___37local_function__special(name, args, ...)
  local ____r144 = unstash({...})
  local __name9 = destash33(name, ____r144)
  local __args19 = destash33(args, ____r144)
  local ____id47 = ____r144
  local __body19 = cut(____id47, 0)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" or (has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" or has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake") then
    local ____x227 = object({__args19})
    ____x227.name = __name9
    ____x227.prefix = "local"
    local ____x228 = object({})
    ____x228.name = __name9
    ____x228.prefix = "local"
    local __x226 = apply(compile_function, join(____x227, __body19, ____x228))
    return indentation() .. __x226
  else
    return compile({"%local", __name9, join({"%function", __args19}, __body19)}, {
      _stash = true,
      stmt = true
    })
  end
end
setenv("%local-function", {
  _stash = true,
  special = ___37local_function__special,
  stmt = true,
  tr = true
})
local function ___37ref__special(variable)
  if id63(variable) then
    return compile(variable)
  else
    return "${" .. (compile(variable) .. "}")
  end
end
setenv("%ref", {
  _stash = true,
  special = ___37ref__special
})
local function ___37id__special(x)
  return escape(compile({"%ptr", x}))
end
setenv("%id", {
  _stash = true,
  special = ___37id__special
})
local function ___37ptr__special(x)
  local __e67 = nil
  if reference63(x) then
    __e67 = x
  else
    __e67 = {"%ref", x}
  end
  return compile(__e67)
end
setenv("%ptr", {
  _stash = true,
  special = ___37ptr__special
})
local function ___37return__special(x)
  local __e68 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    local __e70 = nil
    if nil63(x) then
      __e70 = {"return"}
    else
      __e70 = {"return", "PROPAGATE", x}
    end
    __e68 = compile(__e70)
  else
    local __e69 = nil
    if nil63(x) then
      __e69 = "return"
    else
      __e69 = "return " .. compile(x)
    end
    __e68 = __e69
  end
  return indentation() .. __e68
end
setenv("%return", {
  _stash = true,
  special = ___37return__special,
  stmt = true
})
local function ___37new__special(x)
  return "new " .. compile(x)
end
setenv("%new", {
  _stash = true,
  special = ___37new__special
})
local function ___37typeof__special(x)
  return "typeof(" .. (compile(x) .. ")")
end
setenv("%typeof", {
  _stash = true,
  special = ___37typeof__special
})
local function ___37error__special(x)
  local __e71 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __e71 = "throw " .. compile({"%new", {"Error", x}})
  else
    local __e72 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      __e72 = "raise " .. compile({"Exception", x})
    else
      __e72 = "error(" .. (compile(x) .. ")")
    end
    __e71 = __e72
  end
  local __e8 = __e71
  return indentation() .. __e8
end
setenv("%error", {
  _stash = true,
  special = ___37error__special,
  stmt = true
})
local function ___37throw__special(x)
  local __e73 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __e73 = "throw " .. compile(x)
  else
    local __e74 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      __e74 = "raise " .. compile(x)
    else
      __e74 = "error(" .. (compile(x) .. ")")
    end
    __e73 = __e74
  end
  local __e9 = __e73
  return indentation() .. __e9
end
setenv("%throw", {
  _stash = true,
  special = ___37throw__special,
  stmt = true
})
local function ___37local__special(name, value)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    return compile({"%set", name, value})
  end
  if nil63(value) and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    value = "nil"
  end
  local __id48 = compile(name)
  local __value1 = compile(value)
  local __e75 = nil
  if is63(value) then
    __e75 = " = " .. __value1
  else
    __e75 = ""
  end
  local __rh2 = __e75
  local __e76 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __e76 = "var "
  else
    local __e77 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      __e77 = "local "
    else
      __e77 = ""
    end
    __e76 = __e77
  end
  local __keyword = __e76
  local __ind9 = indentation()
  return __ind9 .. (__keyword .. (__id48 .. __rh2))
end
setenv("%local", {
  _stash = true,
  special = ___37local__special,
  stmt = true
})
local function ___37set__special(lh, rh)
  local __lh2 = compile(lh)
  local __e78 = nil
  if nil63(rh) then
    __e78 = "nil"
  else
    __e78 = rh
  end
  local __rh3 = compile(__e78)
  local __ind10 = indentation()
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    return indentation() .. ("set(" .. (__lh2 .. (" " .. (__rh3 .. ")"))))
  else
    return indentation() .. (__lh2 .. (" = " .. __rh3))
  end
end
setenv("%set", {
  _stash = true,
  special = ___37set__special,
  stmt = true
})
local function ___37get__special(t, k)
  local __t11 = compile(t)
  local __k111 = compile(k)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" and char(__t11, 0) == "{" or infix_operator63(t) then
    __t11 = "(" .. (__t11 .. ")")
  end
  if string_literal63(k) and (valid_id63(inner(k)) and not( has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py")) then
    return __t11 .. ("." .. inner(k))
  else
    return __t11 .. ("[" .. (__k111 .. "]"))
  end
end
setenv("%get", {
  _stash = true,
  special = ___37get__special
})
local function ___37idx__special(t, k)
  local __t12 = compile(t)
  local __k12 = compile(k, "raw")
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" and char(__t12, 0) == "{" or infix_operator63(t) then
    __t12 = "(" .. (__t12 .. ")")
  end
  return __t12 .. ("." .. __k12)
end
setenv("%idx", {
  _stash = true,
  special = ___37idx__special
})
local function ___37array__special(...)
  local __forms2 = unstash({...})
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    return mapcat(compile, __forms2, " ")
  else
    local __e79 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      __e79 = "{"
    else
      __e79 = "["
    end
    local __open = __e79
    local __e80 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      __e80 = "}"
    else
      __e80 = "]"
    end
    local __close = __e80
    local __s6 = ""
    local __c6 = ""
    local ____o11 = __forms2
    local __k121 = nil
    for __k121 in next, ____o11 do
      local __v10 = ____o11[__k121]
      if number63(__k121) then
        __s6 = __s6 .. (__c6 .. compile(__v10))
        __c6 = ", "
      end
    end
    return __open .. (__s6 .. __close)
  end
end
setenv("%array", {
  _stash = true,
  special = ___37array__special
})
local function ___37object__special(...)
  local __forms3 = unstash({...})
  local __e81 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    __e81 = ""
  else
    __e81 = "{"
  end
  local __s7 = __e81
  local __c7 = ""
  local __e82 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    __e82 = " = "
  else
    local __e83 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      __e83 = " "
    else
      __e83 = ": "
    end
    __e82 = __e83
  end
  local __sep1 = __e82
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") + 1
  local ____x241 = indentation()
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") - 1
  local __ind11 = ____x241
  local __e84 = nil
  if _35(__forms3) > 2 then
    __e84 = "\n" .. __ind11
  end
  local __pad = __e84
  local __e85 = nil
  if is63(__pad) then
    __e85 = "\n" .. indentation()
  else
    __e85 = ""
  end
  local ___end = __e85
  __s7 = __s7 .. either(__pad, "")
  local ____x242 = pair(__forms3)
  local ____i23 = 0
  while ____i23 < _35(____x242) do
    local ____id49 = ____x242[____i23 + 1]
    local __k13 = has(____id49, 1)
    local __v11 = has(____id49, 2)
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = has(setenv("indent-level", {
      _stash = true,
      toplevel = true
    }), "value") + 1
    local ____x243 = compile(__v11)
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = has(setenv("indent-level", {
      _stash = true,
      toplevel = true
    }), "value") - 1
    __s7 = __s7 .. (__c7 .. (key(__k13) .. (__sep1 .. ____x243)))
    local __e86 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      __e86 = ""
    else
      __e86 = ","
    end
    __c7 = __e86 .. either(__pad, " ")
    ____i23 = ____i23 + 1
  end
  local __e87 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    __e87 = ""
  else
    __e87 = "}"
  end
  return __s7 .. (___end .. __e87)
end
setenv("%object", {
  _stash = true,
  special = ___37object__special
})
local function ___37list__special(form, comps, cond, ...)
  local ____r157 = unstash({...})
  local __form8 = destash33(form, ____r157)
  local __comps = destash33(comps, ____r157)
  local __cond3 = destash33(cond, ____r157)
  local ____id50 = ____r157
  local __kind = has(____id50, "kind")
  local __s8 = compile(__form8)
  local __e88 = nil
  if __kind == "object" then
    __e88 = {"{", "}"}
  else
    __e88 = {"[", "]"}
  end
  local ____id51 = __e88
  local __lh3 = has(____id51, 1)
  local __rh4 = has(____id51, 2)
  if not( __kind == "object") then
    __s8 = "(" .. (__s8 .. ")")
  end
  local ____x247 = __comps
  local ____i24 = 0
  while ____i24 < _35(____x247) do
    local ____id52 = ____x247[____i24 + 1]
    local __k14 = has(____id52, 1)
    local __v12 = has(____id52, 2)
    __s8 = __s8 .. (" for " .. (compile(__k14) .. (" in " .. compile(__v12))))
    ____i24 = ____i24 + 1
  end
  if is63(__cond3) then
    __s8 = __s8 .. (" if " .. compile(__cond3))
  end
  return __lh3 .. (__s8 .. __rh4)
end
setenv("%list", {
  _stash = true,
  special = ___37list__special
})
function compile_literal(x)
  if string_literal63(x) then
    return inner(x)
  else
    return compile(x)
  end
end
local function ___37literal__special(...)
  local __args20 = unstash({...})
  return mapcat(compile_literal, __args20)
end
setenv("%literal", {
  _stash = true,
  special = ___37literal__special
})
local function ___37compile__special(...)
  local __args21 = unstash({...})
  return mapcat(compile, __args21)
end
setenv("%compile", {
  _stash = true,
  special = ___37compile__special
})
local function __global__special(x)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    return indentation() .. ("global " .. (compile(x) .. "\n"))
  else
    return ""
  end
end
setenv("global", {
  _stash = true,
  special = __global__special,
  stmt = true,
  tr = true
})
local function __import__special(name, ...)
  local ____r160 = unstash({...})
  local __name10 = destash33(name, ____r160)
  local ____id53 = ____r160
  local __alias2 = cut(____id53, 0)
  local __ind12 = indentation()
  local __e89 = nil
  if hd(__alias2) == "as" then
    __e89 = __alias2[2]
  else
    __e89 = hd(__alias2)
  end
  local __as1 = __e89
  local __id54 = __as1 or __name10
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    local __s9 = __ind12 .. ("import " .. compile(__name10))
    if __as1 then
      __s9 = __s9 .. (" as " .. compile(__id54))
    end
    return __s9
  else
    return __ind12 .. compile({"%local", __id54, {"require", escape(__name10)}})
  end
end
setenv("import", {
  _stash = true,
  special = __import__special,
  stmt = true
})
local function __from__special(name, ...)
  local ____r161 = unstash({...})
  local __name11 = destash33(name, ____r161)
  local ____id55 = ____r161
  local __imports = cut(____id55, 0)
  local __ind13 = indentation()
  local __id56 = __name11
  local __r162 = nil
  __r162 = drop(__imports)
  local __e90 = nil
  if last(__imports) == "as" then
    __e90 = drop(__imports)
  else
    add(__imports, __r162)
    __r162 = nil
    __e90 = __r162
  end
  local __as2 = __r162
  local __e91 = nil
  if hd(__imports) == "import" then
    __e91 = tl(__imports)
  else
    __e91 = __imports
  end
  local __names1 = __e91
  local __names2 = mapcat(function (x)
    if x == "*" then
      return x
    else
      return compile(x)
    end
  end, __names1, ", ")
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    local __s10 = __ind13 .. ("from " .. (compile(__name11) .. (" import " .. __names2)))
    if __as2 then
      __s10 = __s10 .. (" as " .. compile(__as2))
    end
    return __s10
  else
    return ""
  end
end
setenv("from", {
  _stash = true,
  special = __from__special,
  stmt = true
})
local function ___44__special(...)
  local __args22 = unstash({...})
  if none63(__args22) then
    return ", "
  else
    if one63(__args22) then
      return ", " .. compile(hd(__args22))
    else
      return mapcat(compile, __args22, ", ")
    end
  end
end
setenv(",", {
  _stash = true,
  special = ___44__special
})
local function __3458__special34(...)
  local __args23 = unstash({...})
  if none63(__args23) then
    return ":"
  else
    if one63(__args23) then
      return ":" .. compile(hd(__args23))
    else
      return mapcat(compile, __args23, ":")
    end
  end
end
setenv(":", {
  _stash = true,
  special = __3458__special34
})
local function ___37as__special(form, id)
  return compile(form) .. (" as " .. compile(id))
end
setenv("%as", {
  _stash = true,
  special = ___37as__special
})
local function __yield__special(...)
  local __args24 = unstash({...})
  return indentation() .. ("yield " .. mapcat(compile, __args24, ", "))
end
setenv("yield", {
  _stash = true,
  special = __yield__special,
  stmt = true
})
local function __await__special(x)
  local __e92 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    __e92 = ""
  else
    __e92 = "await "
  end
  local __a8 = __e92
  return __a8 .. compile(x)
end
setenv("await", {
  _stash = true,
  special = __await__special
})
local function ___37b__special(x)
  return "b" .. compile(x)
end
setenv("%b", {
  _stash = true,
  special = ___37b__special
})
local function ___37f__special(x)
  return "f" .. compile(x)
end
setenv("%f", {
  _stash = true,
  special = ___37f__special
})
local function ___37r__special(x)
  return "r" .. compile(x)
end
setenv("%r", {
  _stash = true,
  special = ___37r__special
})
local function ___64__special(x)
  return indentation() .. ("@" .. compile(x))
end
setenv("@", {
  _stash = true,
  special = ___64__special,
  stmt = true
})
local __exports = exports or {}
__exports.run = run
__exports.eval = eval
__exports.expand = expand
__exports.compile = compile
return __exports
