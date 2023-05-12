function getenv(k, p)
  if string63(k) then
    local __i = edge(environment)
    while __i >= 0 do
      if has63(environment[__i + 1], k) then
        local __b = environment[__i + 1][k]
        local __e45 = nil
        if p then
          __e45 = has(__b, p)
        else
          __e45 = __b
        end
        return __e45
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
        return join({"list"}, map(quoted, form))
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
          add(__l, {"%literal", __k, "|=|", __v})
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
            add(__l1, {"%literal", __k1, "| |", __v1})
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
            local __e46 = nil
            if __k3 == "rest" then
              __e46 = {"cut", __id2, _35(lh)}
            else
              __e46 = {"has", __id2, {"quote", bias(__k3)}}
            end
            local __x12 = __e46
            if is63(__k3) then
              local __e47 = nil
              if __v3 == true then
                __e47 = __k3
              else
                __e47 = __v3
              end
              local __k4 = __e47
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
  local ____x23 = object({"target"})
  ____x23.js = {{"%idx", {"%idx", {"%idx", "Array", "prototype"}, "slice"}, "call"}, "arguments", from}
  ____x23.py = {"|list|", "|_args|"}
  ____x23.lua = {"list", "|...|"}
  return ____x23
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
    local ____x34 = object({"target"})
    ____x34.py = {"obj", "..."}
    return {"unstash", {"list", "..."}, ____x34}
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
    local __r21 = unique("r")
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
              local __x46 = unique("x")
              add(__args1, __x46)
              __bs1 = join(__bs1, {__v4, __x46})
            end
          end
        end
      end
    end
    if props63(args) then
      __pre = join(__pre, {__r21, rest()})
      local __n5 = _35(__args1)
      local __i6 = 0
      while __i6 < __n5 do
        local __v5 = __args1[__i6 + 1]
        __pre = join(__pre, {__v5, {"destash!", __v5, __r21}})
        __i6 = __i6 + 1
      end
      __bs1 = join(__bs1, {props(args), __r21})
    end
    local __forms = join({"let", __pre}, __inits, {join({"let", __bs1}, __body)})
    local __e48 = nil
    if is63(__doc) then
      __e48 = {"do", __doc, __forms}
    else
      __e48 = __forms
    end
    return {__args1, __e48}
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
local function expand_local(__x57)
  local ____id6 = __x57
  local __x58 = has(____id6, 1)
  local __name = has(____id6, 2)
  local __value = has(____id6, 3)
  setenv(__name, {
    _stash = true,
    variable = true
  })
  return {"%local", __name, macroexpand(__value)}
end
local function expand_function(__x60)
  local ____id7 = __x60
  local __x61 = has(____id7, 1)
  local __args = has(____id7, 2)
  local __body1 = cut(____id7, 2)
  add(environment, {})
  local ____id8 = {xpcall(function ()
    local ____o5 = __args
    local ____i7 = nil
    for ____i7 in next, ____o5 do
      local ____x62 = ____o5[____i7]
      setenv(____x62, {
        _stash = true,
        variable = true
      })
    end
    return join({"%function", __args}, macroexpand(__body1))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e49 = nil
      if string63(m) then
        __e49 = clip(m, search(m, ": ") + 2)
      else
        local __e50 = nil
        if nil63(m) then
          __e50 = ""
        else
          __e50 = str(m)
        end
        __e49 = __e50
      end
      return {
        stack = debug.traceback(),
        message = __e49
      }
    end
  end)}
  local ____ok = has(____id8, 1)
  local ____r28 = has(____id8, 2)
  drop(environment)
  if ____ok then
    return ____r28
  else
    error(____r28)
  end
end
local function expand_definition(__x67)
  local ____id9 = __x67
  local __x68 = has(____id9, 1)
  local __name1 = has(____id9, 2)
  local __args3 = has(____id9, 3)
  local __body2 = cut(____id9, 3)
  add(environment, {})
  local ____id10 = {xpcall(function ()
    local ____o6 = __args3
    local ____i8 = nil
    for ____i8 in next, ____o6 do
      local ____x69 = ____o6[____i8]
      setenv(____x69, {
        _stash = true,
        variable = true
      })
    end
    return join({__x68, __name1, __args3}, macroexpand(__body2))
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
  local ____ok1 = has(____id10, 1)
  local ____r30 = has(____id10, 2)
  drop(environment)
  if ____ok1 then
    return ____r30
  else
    error(____r30)
  end
end
local function expand_macro(form)
  return macroexpand(expand1(form))
end
function expand1(__x74)
  local ____id11 = __x74
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
  local __xs = {{"list"}}
  local ____o7 = form
  local __k6 = nil
  for __k6 in next, ____o7 do
    local __v6 = ____o7[__k6]
    if not number63(__k6) then
      local __e53 = nil
      if quasisplice63(__v6, depth) then
        __e53 = quasiexpand(__v6[2])
      else
        __e53 = quasiexpand(__v6, depth)
      end
      local __v7 = __e53
      last(__xs)[__k6] = __v7
    end
  end
  local ____x81 = form
  local ____i10 = 0
  while ____i10 < _35(____x81) do
    local __x82 = ____x81[____i10 + 1]
    if quasisplice63(__x82, depth) then
      local __x83 = quasiexpand(__x82[2])
      add(__xs, __x83)
      add(__xs, {"list"})
    else
      add(last(__xs), quasiexpand(__x82, depth))
    end
    ____i10 = ____i10 + 1
  end
  local __pruned = keep(function (x)
    return _35(x) > 1 or (not( hd(x) == "list") or props63(x))
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
  local __i11 = 0
  while __i11 < has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") do
    __s = __s .. "  "
    __i11 = __i11 + 1
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
      local __e54 = nil
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "py" then
        __e54 = "L_"
      else
        __e54 = "_"
      end
      local __x93 = __e54
      local __e55 = nil
      if number_code63(code(id, 0)) then
        __e55 = __x93
      else
        __e55 = ""
      end
      local __id111 = __e55
      local __i12 = 0
      while __i12 < _35(id) do
        local __c1 = char(id, __i12)
        local __n10 = code(__c1)
        local __e56 = nil
        if __c1 == "-" and not( id == "-") then
          local __e59 = nil
          if __i12 == 0 then
            __e59 = __x93
          else
            __e59 = "_"
          end
          __e56 = __e59
        else
          local __e57 = nil
          if valid_code63(__n10) then
            __e57 = __c1
          else
            local __e58 = nil
            if __i12 == 0 then
              __e58 = __x93 .. __n10
            else
              __e58 = __n10
            end
            __e57 = __e58
          end
          __e56 = __e57
        end
        local __c11 = __e56
        __id111 = __id111 .. __c11
        __i12 = __i12 + 1
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
    local __i13 = __names[__x94]
    __names[__x94] = __names[__x94] + 1
    return unique(__x94 .. __i13)
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
      local __i14 = inner(k)
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        local __e60 = nil
        if valid_id63(__i14) then
          __e60 = __i14
        else
          __e60 = k
        end
        return screamcase(__e60)
      else
        if valid_id63(__i14) then
          return __i14
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
  local ____i17 = 0
  while ____i17 < _35(____x119) do
    local __x120 = ____x119[____i17 + 1]
    __s1 = __s1 .. (__c2 .. compile(__x120))
    if (has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" or has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake") and (default63 and (not id_literal63(__x120) and not( __x120 == "..."))) then
      local __e61 = nil
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        __e61 = ""
      else
        __e61 = "=None"
      end
      __s1 = __s1 .. __e61
    end
    local __e62 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      __e62 = " "
    else
      __e62 = ", "
    end
    __c2 = __e62
    ____i17 = ____i17 + 1
  end
  return __s1 .. ")"
end
local function escape_newlines(s)
  if nil63(search(s, "\n")) and nil63(search(s, "\r")) then
    return s
  else
    local __s11 = ""
    local __i18 = 0
    while __i18 < _35(s) do
      local __c3 = char(s, __i18)
      local __e63 = nil
      if __c3 == "\n" then
        __e63 = "\\n"
      else
        local __e64 = nil
        if __c3 == "\r" then
          __e64 = "\\r"
        else
          __e64 = __c3
        end
        __e63 = __e64
      end
      __s11 = __s11 .. __e63
      __i18 = __i18 + 1
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
  local __e65 = nil
  if stmt63 and not __stmt then
    __e65 = indentation()
  else
    __e65 = ""
  end
  local __p = __e65
  local __tr = terminator(stmt63 and not __self_tr63)
  return __p .. (apply(__special, __args6) .. __tr)
end
local function parenthesize_call63(x)
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0
end
function method_call63(form)
  local __e66 = nil
  if list63(form) then
    __e66 = hd(form)
  else
    __e66 = form
  end
  local __x122 = __e66
  return string63(__x122) and (_35(__x122, 1) > 1 and char(__x122, 0) == ".")
end
local function compile_call(form)
  local __f = hd(form)
  local __f1 = compile_name(__f)
  local __args7 = stash42(tl(form))
  local __e67 = nil
  if method_call63(hd(__args7)) then
    __e67 = mapcat(compile, __args7, "")
  else
    __e67 = compile_args(__args7)
  end
  local __args8 = __e67
  if parenthesize_call63(__f) then
    return "(" .. (__f1 .. (")" .. __args8))
  else
    return __f1 .. __args8
  end
end
local function op_delims(parent, child, ...)
  local ____r75 = unstash({...})
  local __parent = destash33(parent, ____r75)
  local __child = destash33(child, ____r75)
  local ____id15 = ____r75
  local __right = has(____id15, "right")
  local __e68 = nil
  if __right then
    __e68 = _6261
  else
    __e68 = _62
  end
  if __e68(precedence(__child), precedence(__parent)) then
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
  local ____r78 = unstash({...})
  local __args9 = destash33(args, ____r78)
  local __body4 = destash33(body, ____r78)
  local ____id20 = ____r78
  local __name3 = has(____id20, "name")
  local __prefix = has(____id20, "prefix")
  local __async = has(____id20, "async")
  local __e69 = nil
  if __name3 then
    __e69 = compile_name(__name3)
  else
    __e69 = ""
  end
  local __id21 = __e69
  local __e70 = nil
  if has(__args9, "rest") then
    __e70 = join(__args9, {"..."})
  else
    __e70 = __args9
  end
  local __args12 = __e70
  local __e71 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    __e71 = compile_args(join({{"%literal", __id21}}, __args12), true)
  else
    __e71 = compile_args(__args12, true)
  end
  local __args10 = __e71
  local __body5 = compile_body(__body4)
  local __ind = indentation()
  local __e72 = nil
  if __prefix then
    __e72 = __prefix .. " "
  else
    __e72 = ""
  end
  local __p1 = __e72
  local __e73 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __e73 = ""
  else
    local __e74 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      __e74 = "endfunction()"
    else
      __e74 = "end"
    end
    __e73 = __e74
  end
  local __tr1 = __e73
  local __e75 = nil
  if __async and not( has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua") then
    __e75 = "async "
  else
    __e75 = ""
  end
  local __a3 = __e75
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
      local __e76 = nil
      if none63(__ind) then
        __e76 = "\n"
      else
        __e76 = ""
      end
      local __ws = __e76
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
  local ____r80 = unstash({...})
  local __form = destash33(form, ____r80)
  local __raw63 = destash33(raw63, ____r80)
  local ____id22 = ____r80
  local __stmt1 = has(____id22, "stmt")
  if nil63(__form) then
    return ""
  else
    if special_form63(__form) then
      return compile_special(__form, __stmt1)
    else
      local __tr2 = terminator(__stmt1)
      local __e77 = nil
      if __stmt1 then
        __e77 = indentation()
      else
        __e77 = ""
      end
      local __ind1 = __e77
      local __e78 = nil
      if atom63(__form) then
        __e78 = compile_atom(__form, __raw63)
      else
        local __e79 = nil
        if infix63(hd(__form)) then
          __e79 = compile_infix(__form)
        else
          __e79 = compile_call(__form)
        end
        __e78 = __e79
      end
      local __form1 = __e78
      return __ind1 .. (__form1 .. __tr2)
    end
  end
end
local function lower_statement(form, tail63)
  local __hoist = {}
  local __e = lower(form, __hoist, true, tail63)
  local __e80 = nil
  if some63(__hoist) and is63(__e) then
    __e80 = join({"%do"}, __hoist, {__e})
  else
    local __e81 = nil
    if is63(__e) then
      __e81 = __e
    else
      local __e82 = nil
      if _35(__hoist) > 1 then
        __e82 = join({"%do"}, __hoist)
      else
        __e82 = hd(__hoist)
      end
      __e81 = __e82
    end
    __e80 = __e81
  end
  return either(__e80, {"%do"})
end
local function lower_body(body, tail63)
  return lower_statement(join({"%do"}, body), tail63)
end
local function literal63(form)
  return atom63(form) or (hd(form) == "%array" or (hd(form) == "%object" or (hd(form) == "%list" or hd(form) == ",")))
end
local function standalone63(form)
  return not( has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua") and string_literal63(form) or (not atom63(form) and (not infix63(hd(form)) and (not literal63(form) and not( "%get" == hd(form)))) or id_literal63(form))
end
local function lower_do(args, hoist, stmt63, tail63)
  local ____x138 = almost(args)
  local ____i19 = 0
  while ____i19 < _35(____x138) do
    local __x139 = ____x138[____i19 + 1]
    local ____y = lower(__x139, hoist, stmt63)
    if yes(____y) then
      local __e1 = ____y
      if standalone63(__e1) then
        add(hoist, __e1)
      end
    end
    ____i19 = ____i19 + 1
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
    local __e84 = nil
    if is63(___else) then
      __e84 = {lower_body({___else}, tail63)}
    end
    return add(hoist, join({"%if", lower(__cond, hoist), lower_body({___then}, tail63)}, __e84))
  else
    local __e3 = unique("e")
    add(hoist, {"%local", __e3, "nil"})
    local __e83 = nil
    if is63(___else) then
      __e83 = {lower({"%set", __e3, ___else})}
    end
    add(hoist, join({"%if", lower(__cond, hoist), lower({"%set", __e3, ___then})}, __e83))
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
    local __e85 = nil
    if x == "%and" then
      __e85 = {"%if", __id26, __b4, __id26}
    else
      __e85 = {"%if", __id26, __id26, __b4}
    end
    return lower({"%do", {"%local", __id26, __a4}, __e85}, hoist)
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
  local __e86 = nil
  if none63(__pre1) then
    __e86 = {"%while", __c5, lower_body(__body6)}
  else
    __e86 = {"%while", true, join({"%do"}, __pre1, {{"%if", {"%not", __c5}, {"%break"}}, lower_body(__body6)})}
  end
  return add(hoist, __e86)
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
  local __e87 = nil
  if hd(__alias1) == "as" then
    __e87 = __alias1[2]
  else
    __e87 = hd(__alias1)
  end
  local __as = __e87
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
    local __f11 = unique("f")
    return lower({"%do", join({"%local-function", __f11}, args), __f11}, hoist)
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
local function lower_call(form, hoist)
  local __form2 = map(function (x)
    return lower(x, hoist)
  end, form)
  if some63(__form2) then
    return __form2
  end
end
local function pairwise63(form)
  return in63(hd(form), {"%lt", "%le", "%eq", "%ge", "%gt"})
end
local function lower_pairwise(form)
  if pairwise63(form) then
    local __e5 = {}
    local ____id37 = form
    local __x180 = has(____id37, 1)
    local __args121 = cut(____id37, 1)
    reduce(function (a, b)
      add(__e5, {__x180, a, b})
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
  local __form3 = lower_pairwise(form)
  local ____id38 = __form3
  local __x183 = has(____id38, 1)
  local __args13 = cut(____id38, 1)
  return lower(reduce(function (a, b)
    return {__x183, b, a}
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
          local __x186 = has(____id39, 1)
          local __args14 = cut(____id39, 1)
          if __x186 == "%do" then
            return lower_do(__args14, hoist, stmt63, tail63)
          else
            if __x186 == "%call" then
              return lower(__args14, hoist, stmt63, tail63)
            else
              if __x186 == "%set" then
                return lower_set(__args14, hoist, stmt63, tail63)
              else
                if __x186 == "%if" then
                  return lower_if(__args14, hoist, stmt63, tail63)
                else
                  if __x186 == "%try" then
                    return lower_try(__args14, hoist, tail63)
                  else
                    if __x186 == "%while" then
                      return lower_while(__args14, hoist)
                    else
                      if __x186 == "%for" then
                        return lower_for(__args14, hoist)
                      else
                        if __x186 == "%with" then
                          return lower_with(__args14, hoist, stmt63, tail63)
                        else
                          if __x186 == "%block" then
                            return lower_block("%block", __args14, hoist, stmt63, tail63)
                          else
                            if __x186 == "%cases" then
                              return lower_cases(__args14, hoist, stmt63, tail63)
                            else
                              if __x186 == "import" then
                                return lower_import(__args14, hoist, stmt63, tail63)
                              else
                                if __x186 == "from" then
                                  return lower_from(__args14, hoist, stmt63, tail63)
                                else
                                  if __x186 == "%function" then
                                    return lower_function(__args14, hoist)
                                  else
                                    if __x186 == "%local-function" or __x186 == "%global-function" then
                                      return lower_definition(__x186, __args14, hoist)
                                    else
                                      if in63(__x186, {"%and", "%or"}) then
                                        return lower_short(__x186, __args14, hoist)
                                      else
                                        if statement63(__x186) then
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
  local f,e = load1(code)
  if f then
    return f()
  else
    error(e .. (" in " .. code))
  end
end
local function eval_result(globals, locals)
  return lumen_result
end
function eval(form, globals, locals)
  local __previous = has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = "lua"
  local __code = compile(expand({"%set", "lumen-result", form}))
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = __previous
  run(__code, globals, locals)
  return eval_result(globals, locals)
end
function immediate_call63(x)
  return not atom63(x) and (not atom63(hd(x)) and hd(hd(x)) == "%function")
end
local function ___37do__special(...)
  local __forms2 = unstash({...})
  local __s4 = ""
  local ____x193 = __forms2
  local ____i21 = 0
  while ____i21 < _35(____x193) do
    local __x194 = ____x193[____i21 + 1]
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" and (immediate_call63(__x194) and "\n" == char(__s4, edge(__s4))) then
      __s4 = clip(__s4, 0, edge(__s4)) .. ";\n"
    end
    __s4 = __s4 .. compile(__x194, {
      _stash = true,
      stmt = true
    })
    if not atom63(__x194) then
      if hd(__x194) == "%return" or hd(__x194) == "%break" then
        break
      end
    end
    ____i21 = ____i21 + 1
  end
  return __s4
end
setenv("%do", {
  _stash = true,
  special = ___37do__special,
  stmt = true,
  tr = true
})
local function ___37cmake_block__special(body)
  local __ind3 = indentation()
  local __s6 = ""
  __s6 = __s6 .. (__ind3 .. "block(SCOPE_FOR VARIABLES)\n")
  __s6 = __s6 .. compile_body(body)
  __s6 = __s6 .. (__ind3 .. "endblock()\n")
  return __s6
end
setenv("%cmake-block", {
  _stash = true,
  special = ___37cmake_block__special,
  stmt = true,
  tr = true
})
local function ___37if__special(cond, cons, alt)
  local __cond2 = compile(cond)
  local __cons1 = compile_body(cons)
  local __e88 = nil
  if alt then
    __e88 = compile_body(alt)
  end
  local __alt1 = __e88
  local __ind5 = indentation()
  local __s8 = ""
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __s8 = __s8 .. (__ind5 .. ("if (" .. (__cond2 .. (") {\n" .. (__cons1 .. (__ind5 .. "}"))))))
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      __s8 = __s8 .. (__ind5 .. ("if " .. (__cond2 .. (":\n" .. __cons1))))
    else
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        __s8 = __s8 .. (__ind5 .. ("if(" .. (__cond2 .. (")\n" .. __cons1))))
      else
        __s8 = __s8 .. (__ind5 .. ("if " .. (__cond2 .. (" then\n" .. __cons1))))
      end
    end
  end
  if __alt1 and has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __s8 = __s8 .. (" else {\n" .. (__alt1 .. (__ind5 .. "}")))
  else
    if __alt1 and has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      __s8 = __s8 .. (__ind5 .. ("else:\n" .. __alt1))
    else
      if __alt1 and has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        __s8 = __s8 .. (__ind5 .. ("else()\n" .. __alt1))
      else
        if __alt1 then
          __s8 = __s8 .. (__ind5 .. ("else\n" .. __alt1))
        end
      end
    end
  end
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    return __s8 .. (__ind5 .. "end\n")
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "js" then
      return __s8 .. "\n"
    else
      if has(setenv("target", {
        _stash = true,
        toplevel = true
      }), "value") == "cmake" then
        return __s8 .. (__ind5 .. "endif()\n")
      else
        return __s8
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
  local __cond4 = compile(cond)
  local __body13 = compile_body(form)
  local __ind7 = indentation()
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    return __ind7 .. ("while (" .. (__cond4 .. (") {\n" .. (__body13 .. (__ind7 .. "}\n")))))
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      return __ind7 .. ("while " .. (__cond4 .. (":\n" .. __body13)))
    else
      return __ind7 .. ("while " .. (__cond4 .. (" do\n" .. (__body13 .. (__ind7 .. "end\n")))))
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
  local ____r120 = unstash({...})
  local __t2 = destash33(t, ____r120)
  local __k12 = destash33(k, ____r120)
  local __form5 = destash33(form, ____r120)
  local ____id41 = ____r120
  local __async2 = has(____id41, "async")
  local __t3 = compile(__t2)
  local __k13 = compile(__k12)
  local __ind9 = indentation()
  local __body15 = compile_body(__form5)
  local __e89 = nil
  if __async2 then
    __e89 = "async "
  else
    __e89 = ""
  end
  local __a7 = __e89
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    return __ind9 .. ("for " .. (__k13 .. (" in next, " .. (__t3 .. (" do\n" .. (__body15 .. (__ind9 .. "end\n")))))))
  else
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      return __ind9 .. (__a7 .. ("for " .. (__k13 .. (" in " .. (__t3 .. (":\n" .. __body15))))))
    else
      return __ind9 .. ("for (" .. (__k13 .. (" in " .. (__t3 .. (") {\n" .. (__body15 .. (__ind9 .. "}\n")))))))
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
  local ____r122 = unstash({...})
  local __t6 = destash33(t, ____r122)
  local __form7 = destash33(form, ____r122)
  local ____id43 = ____r122
  local __async4 = has(____id43, "async")
  local __t7 = compile(__t6)
  local __ind11 = indentation()
  local __body17 = compile_body(__form7)
  local __e90 = nil
  if __async4 then
    __e90 = "async "
  else
    __e90 = ""
  end
  local __a9 = __e90
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    return __ind11 .. (__a9 .. ("with " .. (__t7 .. (":\n" .. __body17))))
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
  local __t9 = compile(t)
  local __ind13 = indentation()
  local __body19 = compile_body(form)
  local __e91 = nil
  if some63(__t9) then
    __e91 = " "
  else
    __e91 = ""
  end
  local __sep1 = __e91
  local __e92 = nil
  if some63(__t9) then
    __e92 = "("
  else
    __e92 = ""
  end
  local __lh2 = __e92
  local __e93 = nil
  if some63(__t9) then
    __e93 = ")"
  else
    __e93 = ""
  end
  local __rh2 = __e93
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    return __ind13 .. (name .. (__sep1 .. (__t9 .. (":\n" .. __body19))))
  else
    return __ind13 .. (name .. (__sep1 .. (__lh2 .. (__t9 .. (__rh2 .. (__sep1 .. ("{\n" .. (__body19 .. (__ind13 .. "}\n")))))))))
  end
end
setenv("%block", {
  _stash = true,
  special = ___37block__special,
  stmt = true,
  tr = true
})
local function ___37try__special(form)
  local __ind15 = indentation()
  local __body21 = compile_body(form)
  local __e94 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e94 = {"%do", {"import", "sys"}, {"%local", "e", {{"%idx", "sys", "exc_info"}}}, {"%return", {"%array", false, {"%get", "e", 1}, "e"}}}
  else
    __e94 = {"%return", {"%array", false, "e"}}
  end
  local __hf1 = __e94
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") + 1
  local ____x220 = compile(__hf1, {
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
  local __h4 = ____x220
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    return __ind15 .. ("try {\n" .. (__body21 .. (__ind15 .. ("}\n" .. (__ind15 .. ("catch (e) {\n" .. (__h4 .. (__ind15 .. "}\n"))))))))
  else
    return __ind15 .. ("try:\n" .. (__body21 .. (__ind15 .. ("except:\n" .. __h4))))
  end
end
setenv("%try", {
  _stash = true,
  special = ___37try__special,
  stmt = true,
  tr = true
})
local function ___37delete__special(place)
  local __e95 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    __e95 = "del "
  else
    __e95 = "delete "
  end
  return indentation() .. (__e95 .. compile(place))
end
setenv("%delete", {
  _stash = true,
  special = ___37delete__special,
  stmt = true
})
local function ___37break__special()
  return indentation() .. "break"
end
setenv("%break", {
  _stash = true,
  special = ___37break__special,
  stmt = true
})
local function ___37function__special(args, ...)
  local ____r132 = unstash({...})
  local __args16 = destash33(args, ____r132)
  local ____id45 = ____r132
  local __body23 = cut(____id45, 0)
  return apply(compile_function, join({__args16}, __body23, {}))
end
setenv("%function", {
  _stash = true,
  special = ___37function__special
})
local function ___37global_function__special(name, args, ...)
  local ____r134 = unstash({...})
  local __name9 = destash33(name, ____r134)
  local __args18 = destash33(args, ____r134)
  local ____id47 = ____r134
  local __body25 = cut(____id47, 0)
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
    local ____x235 = object({__args18})
    ____x235.name = __name9
    local ____x236 = object({})
    ____x236.name = __name9
    local __x234 = apply(compile_function, join(____x235, __body25, ____x236))
    return indentation() .. __x234
  else
    return compile({"%set", __name9, join({"%function", __args18}, __body25)}, {
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
  local ____r136 = unstash({...})
  local __name11 = destash33(name, ____r136)
  local __args20 = destash33(args, ____r136)
  local ____id49 = ____r136
  local __body27 = cut(____id49, 0)
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
    local ____x247 = object({__args20})
    ____x247.name = __name11
    ____x247.prefix = "local"
    local ____x248 = object({})
    ____x248.name = __name11
    ____x248.prefix = "local"
    local __x246 = apply(compile_function, join(____x247, __body27, ____x248))
    return indentation() .. __x246
  else
    return compile({"%local", __name11, join({"%function", __args20}, __body27)}, {
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
  return "${" .. (compile_id(tostr(variable)) .. "}")
end
setenv("%ref", {
  _stash = true,
  special = ___37ref__special
})
local function ___37id__special(variable)
  return escape(compile({"%ref", variable}))
end
setenv("%id", {
  _stash = true,
  special = ___37id__special
})
local function ___37return__special(x)
  local __e96 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    local __e98 = nil
    if nil63(x) then
      __e98 = {"return"}
    else
      __e98 = {"return", "PROPAGATE", x}
    end
    __e96 = compile(__e98)
  else
    local __e97 = nil
    if nil63(x) then
      __e97 = "return"
    else
      __e97 = "return " .. compile(x)
    end
    __e96 = __e97
  end
  return indentation() .. __e96
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
  local __e99 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __e99 = "throw " .. compile({"%new", {"Error", x}})
  else
    local __e100 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      __e100 = "raise " .. compile({"Exception", x})
    else
      __e100 = "error(" .. (compile(x) .. ")")
    end
    __e99 = __e100
  end
  local __e21 = __e99
  return indentation() .. __e21
end
setenv("%error", {
  _stash = true,
  special = ___37error__special,
  stmt = true
})
local function ___37throw__special(x)
  local __e101 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __e101 = "throw " .. compile(x)
  else
    local __e102 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "py" then
      __e102 = "raise " .. compile(x)
    else
      __e102 = "error(" .. (compile(x) .. ")")
    end
    __e101 = __e102
  end
  local __e25 = __e101
  return indentation() .. __e25
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
  local __id51 = compile(name)
  local __value11 = compile(value)
  local __e103 = nil
  if is63(value) then
    __e103 = " = " .. __value11
  else
    __e103 = ""
  end
  local __rh4 = __e103
  local __e104 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "js" then
    __e104 = "var "
  else
    local __e105 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "lua" then
      __e105 = "local "
    else
      __e105 = ""
    end
    __e104 = __e105
  end
  local __keyword1 = __e104
  local __ind17 = indentation()
  return __ind17 .. (__keyword1 .. (__id51 .. __rh4))
end
setenv("%local", {
  _stash = true,
  special = ___37local__special,
  stmt = true
})
local function ___37set__special(lh, rh)
  local __lh4 = compile(lh)
  local __e106 = nil
  if nil63(rh) then
    __e106 = "nil"
  else
    __e106 = rh
  end
  local __rh6 = compile(__e106)
  local __ind19 = indentation()
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    return indentation() .. ("set(" .. (__lh4 .. (" " .. (__rh6 .. ")"))))
  else
    return indentation() .. (__lh4 .. (" = " .. __rh6))
  end
end
setenv("%set", {
  _stash = true,
  special = ___37set__special,
  stmt = true
})
local function ___37get__special(t, k)
  local __t12 = compile(t)
  local __k121 = compile(k)
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" and char(__t12, 0) == "{" or infix_operator63(t) then
    __t12 = "(" .. (__t12 .. ")")
  end
  if string_literal63(k) and (valid_id63(inner(k)) and not( has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py")) then
    return __t12 .. ("." .. inner(k))
  else
    return __t12 .. ("[" .. (__k121 .. "]"))
  end
end
setenv("%get", {
  _stash = true,
  special = ___37get__special
})
local function ___37idx__special(t, k)
  local __t14 = compile(t)
  local __k14 = compile(k, "raw")
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" and char(__t14, 0) == "{" or infix_operator63(t) then
    __t14 = "(" .. (__t14 .. ")")
  end
  return __t14 .. ("." .. __k14)
end
setenv("%idx", {
  _stash = true,
  special = ___37idx__special
})
local function ___37array__special(...)
  local __forms4 = unstash({...})
  local __e107 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    __e107 = "{"
  else
    __e107 = "["
  end
  local __open1 = __e107
  local __e108 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    __e108 = "}"
  else
    __e108 = "]"
  end
  local __close1 = __e108
  local __s10 = ""
  local __c7 = ""
  local ____o12 = __forms4
  local __k16 = nil
  for __k16 in next, ____o12 do
    local __v11 = ____o12[__k16]
    if number63(__k16) then
      __s10 = __s10 .. (__c7 .. compile(__v11))
      __c7 = ", "
    end
  end
  return __open1 .. (__s10 .. __close1)
end
setenv("%array", {
  _stash = true,
  special = ___37array__special
})
local function ___37object__special(...)
  local __forms6 = unstash({...})
  local __e109 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    __e109 = ""
  else
    __e109 = "{"
  end
  local __s12 = __e109
  local __c9 = ""
  local __e110 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    __e110 = " = "
  else
    local __e111 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      __e111 = " "
    else
      __e111 = ": "
    end
    __e110 = __e111
  end
  local __sep3 = __e110
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") + 1
  local ____x272 = indentation()
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value") - 1
  local __ind21 = ____x272
  local __e112 = nil
  if _35(__forms6) > 2 then
    __e112 = "\n" .. __ind21
  end
  local __pad1 = __e112
  local __e113 = nil
  if is63(__pad1) then
    __e113 = "\n" .. indentation()
  else
    __e113 = ""
  end
  local ___end = __e113
  __s12 = __s12 .. either(__pad1, "")
  local ____x273 = pair(__forms6)
  local ____i25 = 0
  while ____i25 < _35(____x273) do
    local ____id53 = ____x273[____i25 + 1]
    local __k18 = has(____id53, 1)
    local __v13 = has(____id53, 2)
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = has(setenv("indent-level", {
      _stash = true,
      toplevel = true
    }), "value") + 1
    local ____x274 = compile(__v13)
    setenv("indent-level", {
      _stash = true,
      toplevel = true
    }).value = has(setenv("indent-level", {
      _stash = true,
      toplevel = true
    }), "value") - 1
    __s12 = __s12 .. (__c9 .. (key(__k18) .. (__sep3 .. ____x274)))
    local __e114 = nil
    if has(setenv("target", {
      _stash = true,
      toplevel = true
    }), "value") == "cmake" then
      __e114 = ""
    else
      __e114 = ","
    end
    __c9 = __e114 .. either(__pad1, " ")
    ____i25 = ____i25 + 1
  end
  local __e115 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "cmake" then
    __e115 = ""
  else
    __e115 = "}"
  end
  return __s12 .. (___end .. __e115)
end
setenv("%object", {
  _stash = true,
  special = ___37object__special
})
local function ___37list__special(form, comps, cond, ...)
  local ____r160 = unstash({...})
  local __form9 = destash33(form, ____r160)
  local __comps1 = destash33(comps, ____r160)
  local __cond6 = destash33(cond, ____r160)
  local ____id57 = ____r160
  local __kind1 = has(____id57, "kind")
  local __s14 = compile(__form9)
  local __e116 = nil
  if __kind1 == "object" then
    __e116 = {"{", "}"}
  else
    __e116 = {"[", "]"}
  end
  local ____id58 = __e116
  local __lh6 = has(____id58, 1)
  local __rh8 = has(____id58, 2)
  if not( __kind1 == "object") then
    __s14 = "(" .. (__s14 .. ")")
  end
  local ____x282 = __comps1
  local ____i27 = 0
  while ____i27 < _35(____x282) do
    local ____id59 = ____x282[____i27 + 1]
    local __k20 = has(____id59, 1)
    local __v15 = has(____id59, 2)
    __s14 = __s14 .. (" for " .. (compile(__k20) .. (" in " .. compile(__v15))))
    ____i27 = ____i27 + 1
  end
  if is63(__cond6) then
    __s14 = __s14 .. (" if " .. compile(__cond6))
  end
  return __lh6 .. (__s14 .. __rh8)
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
  local __args22 = unstash({...})
  return mapcat(compile_literal, __args22)
end
setenv("%literal", {
  _stash = true,
  special = ___37literal__special
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
  local ____r165 = unstash({...})
  local __name13 = destash33(name, ____r165)
  local ____id62 = ____r165
  local __alias3 = cut(____id62, 0)
  local __ind23 = indentation()
  local __e117 = nil
  if hd(__alias3) == "as" then
    __e117 = __alias3[2]
  else
    __e117 = hd(__alias3)
  end
  local __as2 = __e117
  local __id63 = __as2 or __name13
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    local __s16 = __ind23 .. ("import " .. compile(__name13))
    if __as2 then
      __s16 = __s16 .. (" as " .. compile(__id63))
    end
    return __s16
  else
    return __ind23 .. compile({"%local", __id63, {"require", escape(__name13)}})
  end
end
setenv("import", {
  _stash = true,
  special = __import__special,
  stmt = true
})
local function __from__special(name, ...)
  local ____r169 = unstash({...})
  local __name15 = destash33(name, ____r169)
  local ____id66 = ____r169
  local __imports1 = cut(____id66, 0)
  local __ind25 = indentation()
  local __id67 = __name15
  local __r170 = nil
  __r170 = drop(__imports1)
  local __e118 = nil
  if last(__imports1) == "as" then
    __e118 = drop(__imports1)
  else
    add(__imports1, __r170)
    __r170 = nil
    __e118 = __r170
  end
  local __as4 = __r170
  local __e119 = nil
  if hd(__imports1) == "import" then
    __e119 = tl(__imports1)
  else
    __e119 = __imports1
  end
  local __names3 = __e119
  local __names4 = mapcat(function (x)
    if x == "*" then
      return x
    else
      return compile(x)
    end
  end, __names3, ", ")
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "py" then
    local __s18 = __ind25 .. ("from " .. (compile(__name15) .. (" import " .. __names4)))
    if __as4 then
      __s18 = __s18 .. (" as " .. compile(__as4))
    end
    return __s18
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
  local __args24 = unstash({...})
  if none63(__args24) then
    return ", "
  else
    if one63(__args24) then
      return ", " .. compile(hd(__args24))
    else
      return mapcat(compile, __args24, ", ")
    end
  end
end
setenv(",", {
  _stash = true,
  special = ___44__special
})
local function __3458__special34(...)
  local __args26 = unstash({...})
  if none63(__args26) then
    return ":"
  else
    if one63(__args26) then
      return ":" .. compile(hd(__args26))
    else
      return mapcat(compile, __args26, ":")
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
  local __args28 = unstash({...})
  return indentation() .. ("yield " .. mapcat(compile, __args28, ", "))
end
setenv("yield", {
  _stash = true,
  special = __yield__special,
  stmt = true
})
local function __await__special(x)
  local __e120 = nil
  if has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value") == "lua" then
    __e120 = ""
  else
    __e120 = "await "
  end
  local __a11 = __e120
  return __a11 .. compile(x)
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
