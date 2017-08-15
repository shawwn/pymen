local function getenv(k, p)
  if string63(k) then
    local __i = edge(environment)
    while __i >= 0 do
      if has63(environment[__i + 1], k) then
        local __b = environment[__i + 1][k]
        local __e23
        if p then
          __e23 = has(__b, p)
        else
          __e23 = __b
        end
        return __e23
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
  return macro63(x) or special63(x) or symbol63(x) or variable63(x)
end
function quoted(form)
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
local function literal(s)
  if string_literal63(s) then
    return s
  else
    return quoted(s)
  end
end
local function stash42(args)
  if keys63(args) then
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      local __l = array(args)
      local ____o = args
      local __k = nil
      for __k in next, ____o do
        local __v = ____o[__k]
        if not number63(__k) then
          add(__l, {"%literal", "|" .. __k .. "=|", __v})
        end
      end
      return __l
    else
      local __l1 = {"%object", "\"_stash\"", true}
      local ____o1 = args
      local __k1 = nil
      for __k1 in next, ____o1 do
        local __v1 = ____o1[__k1]
        if not number63(__k1) then
          add(__l1, literal(__k1))
          add(__l1, __v1)
        end
      end
      return join(args, {__l1})
    end
  else
    return args
  end
end
local function bias(k)
  if number63(k) then
    k = k - 1
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
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
    local __id = unique("id")
    local __bs = {__id, rh}
    local ____o2 = lh
    local __k2 = nil
    for __k2 in next, ____o2 do
      local __v2 = ____o2[__k2]
      local __e24
      if __k2 == "rest" then
        __e24 = {"cut", __id, _35(lh)}
      else
        __e24 = {"has", __id, {"quote", bias(__k2)}}
      end
      local __x6 = __e24
      if is63(__k2) then
        local __e25
        if __v2 == true then
          __e25 = __k2
        else
          __e25 = __v2
        end
        local __k3 = __e25
        __bs = join(__bs, bind(__k3, __x6))
      end
    end
    return __bs
  end
end
setenv("arguments%", {_stash = true, macro = function (_from)
  local ____x17 = object({"target"})
  ____x17.js = {{"idx", {"idx", {"idx", "Array", "prototype"}, "slice"}, "call"}, "arguments", _from}
  ____x17.py = {"|list|", "|_args|"}
  ____x17.lua = {"list", "|...|"}
  return ____x17
end})
function bind42(args, body)
  local __args1 = {}
  local function rest()
    __args1.rest = true
    local ____x26 = object({"target"})
    ____x26.py = "|_keys|"
    return {"unstash", {"arguments%", _35(__args1)}, ____x26}
  end
  if atom63(args) then
    return {__args1, join({"let", {args, rest()}}, body)}
  else
    local __bs1 = {}
    local __r19 = unique("r")
    local ____o3 = args
    local __k4 = nil
    for __k4 in next, ____o3 do
      local __v3 = ____o3[__k4]
      if number63(__k4) then
        if atom63(__v3) then
          add(__args1, __v3)
        else
          local __x30 = unique("x")
          add(__args1, __x30)
          __bs1 = join(__bs1, {__v3, __x30})
        end
      end
    end
    if keys63(args) then
      __bs1 = join(__bs1, {__r19, rest()})
      local __n4 = _35(__args1)
      local __i5 = 0
      while __i5 < __n4 do
        local __v4 = __args1[__i5 + 1]
        __bs1 = join(__bs1, {__v4, {"destash!", __v4, __r19}})
        __i5 = __i5 + 1
      end
      __bs1 = join(__bs1, {keys(args), __r19})
    end
    return {__args1, join({"let", __bs1}, body)}
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
  return can_unquote63(depth) and not atom63(x) and hd(x) == "unquote-splicing"
end
local function expand_local(__x38)
  local ____id1 = __x38
  local __x39 = has(____id1, 1)
  local __name = has(____id1, 2)
  local __value = has(____id1, 3)
  setenv(__name, {_stash = true, variable = true})
  return {"%local", __name, macroexpand(__value)}
end
local function expand_function(__x41)
  local ____id2 = __x41
  local __x42 = has(____id2, 1)
  local __args = has(____id2, 2)
  local __body = cut(____id2, 2)
  add(environment, {})
  local ____o4 = __args
  local ____i6 = nil
  for ____i6 in next, ____o4 do
    local ____x43 = ____o4[____i6]
    setenv(____x43, {_stash = true, variable = true})
  end
  local ____x44 = join({"%function", __args}, macroexpand(__body))
  drop(environment)
  return ____x44
end
local function expand_definition(__x46)
  local ____id3 = __x46
  local __x47 = has(____id3, 1)
  local __name1 = has(____id3, 2)
  local __args11 = has(____id3, 3)
  local __body1 = cut(____id3, 3)
  add(environment, {})
  local ____o5 = __args11
  local ____i7 = nil
  for ____i7 in next, ____o5 do
    local ____x48 = ____o5[____i7]
    setenv(____x48, {_stash = true, variable = true})
  end
  local ____x49 = join({__x47, __name1, __args11}, macroexpand(__body1))
  drop(environment)
  return ____x49
end
local function expand_macro(form)
  return macroexpand(expand1(form))
end
function expand1(__x51)
  local ____id4 = __x51
  local __name2 = has(____id4, 1)
  local __body2 = cut(____id4, 1)
  return apply(macro_function(__name2), __body2)
end
function macroexpand(form)
  if symbol63(form) then
    return macroexpand(symbol_expansion(form))
  else
    if atom63(form) then
      return form
    else
      local __x52 = hd(form)
      if __x52 == "%local" then
        return expand_local(form)
      else
        if __x52 == "%function" then
          return expand_function(form)
        else
          if __x52 == "%global-function" then
            return expand_definition(form)
          else
            if __x52 == "%local-function" then
              return expand_definition(form)
            else
              if macro63(__x52) then
                return expand_macro(form)
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
local function quasiquote_list(form, depth)
  local __xs = {{"list"}}
  local ____o6 = form
  local __k5 = nil
  for __k5 in next, ____o6 do
    local __v5 = ____o6[__k5]
    if not number63(__k5) then
      local __e26
      if quasisplice63(__v5, depth) then
        __e26 = quasiexpand(__v5[2])
      else
        __e26 = quasiexpand(__v5, depth)
      end
      local __v6 = __e26
      last(__xs)[__k5] = __v6
    end
  end
  local ____x55 = form
  local ____i9 = 0
  while ____i9 < _35(____x55) do
    local __x56 = ____x55[____i9 + 1]
    if quasisplice63(__x56, depth) then
      local __x57 = quasiexpand(__x56[2])
      add(__xs, __x57)
      add(__xs, {"list"})
    else
      add(last(__xs), quasiexpand(__x56, depth))
    end
    ____i9 = ____i9 + 1
  end
  local __pruned = keep(function (x)
    return _35(x) > 1 or not( hd(x) == "list") or keys63(x)
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
function expand_if(__x61)
  local ____id5 = __x61
  local __a = has(____id5, 1)
  local __b1 = has(____id5, 2)
  local __c = cut(____id5, 2)
  if is63(__b1) then
    return {join({"%if", __a, __b1}, expand_if(__c))}
  else
    if is63(__a) then
      return {__a}
    end
  end
end
setenv("indent-level", {_stash = true, toplevel = true, value = 0})
setenv("indent-level", {_stash = true, symbol = {"get-value", {"quote", "indent-level"}}})
function indentation()
  local __s = ""
  local __i10 = 0
  while __i10 < has(setenv("indent-level", {_stash = true, toplevel = true}), "value") do
    __s = __s .. "  "
    __i10 = __i10 + 1
  end
  return __s
end
local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["class"] = true, ["const"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["eval"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["import"] = true, ["in"] = true, ["instanceof"] = true, ["let"] = true, ["new"] = true, ["return"] = true, ["switch"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["load"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true, ["from"] = true, ["str"] = true, ["print"] = true}
function reserved63(x)
  return has63(reserved, x)
end
local function valid_code63(n)
  return number_code63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95
end
local function id(id)
  local __e27
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    __e27 = "L_"
  else
    __e27 = "_"
  end
  local __x67 = __e27
  local __e28
  if number_code63(code(id, 0)) then
    __e28 = __x67
  else
    __e28 = ""
  end
  local __id11 = __e28
  local __i11 = 0
  while __i11 < _35(id) do
    local __c1 = char(id, __i11)
    local __n8 = code(__c1)
    local __e29
    if __c1 == "-" and not( id == "-") then
      local __e32
      if __i11 == 0 then
        __e32 = __x67
      else
        __e32 = "_"
      end
      __e29 = __e32
    else
      local __e30
      if valid_code63(__n8) then
        __e30 = __c1
      else
        local __e31
        if __i11 == 0 then
          __e31 = __x67 .. __n8
        else
          __e31 = __n8
        end
        __e30 = __e31
      end
      __e29 = __e30
    end
    local __c11 = __e29
    __id11 = __id11 .. __c11
    __i11 = __i11 + 1
  end
  if reserved63(__id11) then
    return __x67 .. __id11
  else
    return __id11
  end
end
function valid_id63(x)
  return some63(x) and x == id(x)
end
local __names = {}
function unique(x)
  local __x68 = id(x)
  if has63(__names, __x68) then
    local __i12 = __names[__x68]
    __names[__x68] = __names[__x68] + 1
    return unique(__x68 .. __i12)
  else
    __names[__x68] = 1
    return "__" .. __x68
  end
end
function key(k)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    return k
  else
    local __i13 = inner(k)
    if valid_id63(__i13) then
      return __i13
    else
      if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
        return k
      else
        return "[" .. k .. "]"
      end
    end
  end
end
function mapo(f, t)
  local __o7 = {}
  local ____o8 = t
  local __k6 = nil
  for __k6 in next, ____o8 do
    local __v7 = ____o8[__k6]
    local __x69 = f(__v7)
    if is63(__x69) then
      add(__o7, literal(__k6))
      add(__o7, __x69)
    end
  end
  return __o7
end
local ____x71 = object({})
local ____x72 = object({})
____x72.js = "!"
____x72.lua = "not"
____x72.py = "not"
____x71["not"] = ____x72
local ____x73 = object({})
____x73["*"] = true
____x73["/"] = true
____x73["%"] = true
local ____x74 = object({})
local ____x75 = object({})
____x75.js = "+"
____x75.lua = ".."
____x74.cat = ____x75
local ____x76 = object({})
____x76["+"] = true
____x76["-"] = true
local ____x77 = object({})
____x77["<"] = true
____x77[">"] = true
____x77["<="] = true
____x77[">="] = true
local ____x78 = object({})
local ____x79 = object({})
____x79.js = "==="
____x79.lua = "=="
____x79.py = "=="
____x78["="] = ____x79
local ____x80 = object({})
local ____x81 = object({})
____x81.js = "&&"
____x81.lua = "and"
____x81.py = "and"
____x80["and"] = ____x81
local ____x82 = object({})
local ____x83 = object({})
____x83.js = "||"
____x83.lua = "or"
____x83.py = "or"
____x82["or"] = ____x83
local infix = {____x71, ____x73, ____x74, ____x76, ____x77, ____x78, ____x80, ____x82}
local function unary63(form)
  return two63(form) and in63(hd(form), {"not", "-"})
end
local function index(k)
  if number63(k) then
    return k - 1
  end
end
local function precedence(form)
  if not( atom63(form) or unary63(form)) then
    local ____o9 = infix
    local __k7 = nil
    for __k7 in next, ____o9 do
      local __v8 = ____o9[__k7]
      if has63(__v8, hd(form)) then
        return index(__k7)
      end
    end
  end
  return 0
end
local function getop(op)
  return find(function (level)
    local __x85 = has(level, op)
    if __x85 == true then
      return op
    else
      if is63(__x85) then
        return has(__x85, has(setenv("target", {_stash = true, toplevel = true}), "value"))
      end
    end
  end, infix)
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
  local ____x86 = args
  local ____i16 = 0
  while ____i16 < _35(____x86) do
    local __x87 = ____x86[____i16 + 1]
    __s1 = __s1 .. __c2 .. compile(__x87)
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" and default63 and not id_literal63(__x87) then
      __s1 = __s1 .. "=None"
    end
    __c2 = ", "
    ____i16 = ____i16 + 1
  end
  return __s1 .. ")"
end
local function escape_newlines(s)
  local __s11 = ""
  local __i17 = 0
  while __i17 < _35(s) do
    local __c3 = char(s, __i17)
    local __e33
    if __c3 == "\n" then
      __e33 = "\\n"
    else
      local __e34
      if __c3 == "\r" then
        __e34 = "\\r"
      else
        __e34 = __c3
      end
      __e33 = __e34
    end
    __s11 = __s11 .. __e33
    __i17 = __i17 + 1
  end
  return __s11
end
local function compile_nil()
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    return "None"
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
      return "nil"
    else
      return "undefined"
    end
  end
end
local function compile_boolean(x)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    if x then
      return "True"
    else
      return "False"
    end
  else
    if x then
      return "true"
    else
      return "false"
    end
  end
end
local function compile_atom(x)
  if x == "nil" then
    return compile_nil()
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
                    error("Cannot compile atom: " .. _str(x))
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
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
      return ";\n"
    else
      return "\n"
    end
  end
end
local function compile_special(form, stmt63)
  local ____id6 = form
  local __x88 = has(____id6, 1)
  local __args2 = cut(____id6, 1)
  local ____id7 = getenv(__x88)
  local __special = has(____id7, "special")
  local __stmt = has(____id7, "stmt")
  local __self_tr63 = has(____id7, "tr")
  local __tr = terminator(stmt63 and not __self_tr63)
  return apply(__special, __args2) .. __tr
end
local function parenthesize_call63(x)
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0
end
local function compile_call(form)
  local __f = hd(form)
  local __f1 = compile(__f)
  local __args3 = compile_args(stash42(tl(form)))
  if parenthesize_call63(__f) then
    return "(" .. __f1 .. ")" .. __args3
  else
    return __f1 .. __args3
  end
end
local function op_delims(parent, child, ...)
  local ____r59 = unstash({...})
  local __parent = destash33(parent, ____r59)
  local __child = destash33(child, ____r59)
  local ____id8 = ____r59
  local __right = has(____id8, "right")
  local __e35
  if __right then
    __e35 = _6261
  else
    __e35 = _62
  end
  if __e35(precedence(__child), precedence(__parent)) then
    return {"(", ")"}
  else
    return {"", ""}
  end
end
local function compile_infix(form)
  local ____id9 = form
  local __op = has(____id9, 1)
  local ____id10 = cut(____id9, 1)
  local __a1 = has(____id10, 1)
  local __b2 = has(____id10, 2)
  local ____id111 = op_delims(form, __a1)
  local __ao = has(____id111, 1)
  local __ac = has(____id111, 2)
  local ____id12 = op_delims(form, __b2, {_stash = true, right = true})
  local __bo = has(____id12, 1)
  local __bc = has(____id12, 2)
  local __a2 = compile(__a1)
  local __b3 = compile(__b2)
  local __op1 = getop(__op)
  if unary63(form) then
    return __op1 .. __ao .. " " .. __a2 .. __ac
  else
    return __ao .. __a2 .. __ac .. " " .. __op1 .. " " .. __bo .. __b3 .. __bc
  end
end
function compile_body(body)
  setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") + 1
  local ____x92 = compile(body, {_stash = true, stmt = true})
  setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") - 1
  local __s2 = ____x92
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" and none63(__s2) then
    setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") + 1
    local ____x93 = indentation() .. "pass\n"
    setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") - 1
    return ____x93
  else
    return __s2
  end
end
function compile_function(args, body, ...)
  local ____r62 = unstash({...})
  local __args4 = destash33(args, ____r62)
  local __body3 = destash33(body, ____r62)
  local ____id13 = ____r62
  local __name3 = has(____id13, "name")
  local __prefix = has(____id13, "prefix")
  local __e36
  if __name3 then
    __e36 = compile(__name3)
  else
    __e36 = ""
  end
  local __id14 = __e36
  local __e37
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" and has63(__args4, "rest") then
    __e37 = join(__args4, {"|...|"})
  else
    local __e38
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" and has63(__args4, "rest") then
      __e38 = join(__args4, {"|*_args|", "|**_keys|"})
    else
      __e38 = __args4
    end
    __e37 = __e38
  end
  local __args12 = __e37
  local __args5 = compile_args(__args12, true)
  local __body4 = compile_body(__body3)
  local __ind = indentation()
  local __e39
  if __prefix then
    __e39 = __prefix .. " "
  else
    __e39 = ""
  end
  local __p = __e39
  local __e40
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    __e40 = ""
  else
    __e40 = "end"
  end
  local __tr1 = __e40
  if __name3 then
    __tr1 = __tr1 .. "\n"
  end
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    return "function " .. __id14 .. __args5 .. " {\n" .. __body4 .. __ind .. "}" .. __tr1
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      return "def " .. __id14 .. __args5 .. ":\n" .. __body4
    else
      return __p .. "function " .. __id14 .. __args5 .. "\n" .. __body4 .. __ind .. __tr1
    end
  end
end
local function can_return63(form)
  return is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form)))
end
function compile(form, ...)
  local ____r64 = unstash({...})
  local __form = destash33(form, ____r64)
  local ____id15 = ____r64
  local __stmt1 = has(____id15, "stmt")
  if nil63(__form) then
    return ""
  else
    if special_form63(__form) then
      return compile_special(__form, __stmt1)
    else
      local __tr2 = terminator(__stmt1)
      local __e41
      if __stmt1 then
        __e41 = indentation()
      else
        __e41 = ""
      end
      local __ind1 = __e41
      local __e42
      if atom63(__form) then
        __e42 = compile_atom(__form)
      else
        local __e43
        if infix63(hd(__form)) then
          __e43 = compile_infix(__form)
        else
          __e43 = compile_call(__form)
        end
        __e42 = __e43
      end
      local __form1 = __e42
      return __ind1 .. __form1 .. __tr2
    end
  end
end
local function lower_statement(form, tail63)
  local __hoist = {}
  local __e = lower(form, __hoist, true, tail63)
  local __e44
  if some63(__hoist) and is63(__e) then
    __e44 = join({"do"}, __hoist, {__e})
  else
    local __e45
    if is63(__e) then
      __e45 = __e
    else
      local __e46
      if _35(__hoist) > 1 then
        __e46 = join({"do"}, __hoist)
      else
        __e46 = hd(__hoist)
      end
      __e45 = __e46
    end
    __e44 = __e45
  end
  return either(__e44, {"do"})
end
local function lower_body(body, tail63)
  return lower_statement(join({"do"}, body), tail63)
end
local function literal63(form)
  return atom63(form) or hd(form) == "%array" or hd(form) == "%object"
end
local function standalone63(form)
  return not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)) or id_literal63(form)
end
local function lower_do(args, hoist, stmt63, tail63)
  local ____x103 = almost(args)
  local ____i18 = 0
  while ____i18 < _35(____x103) do
    local __x104 = ____x103[____i18 + 1]
    local ____y = lower(__x104, hoist, stmt63)
    if yes(____y) then
      local __e1 = ____y
      if standalone63(__e1) then
        add(hoist, __e1)
      end
    end
    ____i18 = ____i18 + 1
  end
  local __e2 = lower(last(args), hoist, stmt63, tail63)
  if tail63 and can_return63(__e2) then
    return {"return", __e2}
  else
    return __e2
  end
end
local function lower_set(args, hoist, stmt63, tail63)
  local ____id16 = args
  local __lh = has(____id16, 1)
  local __rh = has(____id16, 2)
  add(hoist, {"%set", lower(__lh, hoist), lower(__rh, hoist)})
  if not( stmt63 and not tail63) then
    return __lh
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local ____id17 = args
  local __cond = has(____id17, 1)
  local ___then = has(____id17, 2)
  local ___else = has(____id17, 3)
  if stmt63 then
    local __e48
    if is63(___else) then
      __e48 = {lower_body({___else}, tail63)}
    end
    return add(hoist, join({"%if", lower(__cond, hoist), lower_body({___then}, tail63)}, __e48))
  else
    local __e3 = unique("e")
    add(hoist, {"%local", __e3})
    local __e47
    if is63(___else) then
      __e47 = {lower({"%set", __e3, ___else})}
    end
    add(hoist, join({"%if", lower(__cond, hoist), lower({"%set", __e3, ___then})}, __e47))
    return __e3
  end
end
local function lower_short(x, args, hoist)
  local ____id18 = args
  local __a3 = has(____id18, 1)
  local __b4 = has(____id18, 2)
  local __hoist1 = {}
  local __b11 = lower(__b4, __hoist1)
  if some63(__hoist1) then
    local __id19 = unique("id")
    local __e49
    if x == "and" then
      __e49 = {"%if", __id19, __b4, __id19}
    else
      __e49 = {"%if", __id19, __id19, __b4}
    end
    return lower({"do", {"%local", __id19, __a3}, __e49}, hoist)
  else
    return {x, lower(__a3, hoist), __b11}
  end
end
local function lower_try(args, hoist, tail63)
  return add(hoist, {"%try", lower_body(args, tail63)})
end
local function lower_while(args, hoist)
  local ____id20 = args
  local __c4 = has(____id20, 1)
  local __body5 = cut(____id20, 1)
  local __pre = {}
  local __c5 = lower(__c4, __pre)
  local __e50
  if none63(__pre) then
    __e50 = {"while", __c5, lower_body(__body5)}
  else
    __e50 = {"while", true, join({"do"}, __pre, {{"%if", {"not", __c5}, {"break"}}, lower_body(__body5)})}
  end
  return add(hoist, __e50)
end
local function lower_for(args, hoist)
  local ____id21 = args
  local __t = has(____id21, 1)
  local __k8 = has(____id21, 2)
  local __body6 = cut(____id21, 2)
  return add(hoist, {"%for", lower(__t, hoist), __k8, lower_body(__body6)})
end
local function lower_function(args, hoist)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    local __f11 = unique("f")
    return lower({"do", join({"%local-function", __f11}, args), __f11}, hoist)
  else
    local ____id22 = args
    local __a4 = has(____id22, 1)
    local __body7 = cut(____id22, 1)
    return {"%function", __a4, lower_body(__body7, true)}
  end
end
local function lower_definition(kind, args, hoist)
  local ____id23 = args
  local __name4 = has(____id23, 1)
  local __args6 = has(____id23, 2)
  local __body8 = cut(____id23, 2)
  return add(hoist, {kind, __name4, __args6, lower_body(__body8, true)})
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
  return in63(hd(form), {"<", "<=", "=", ">=", ">"})
end
local function lower_pairwise(form)
  if pairwise63(form) then
    local __e4 = {}
    local ____id24 = form
    local __x135 = has(____id24, 1)
    local __args7 = cut(____id24, 1)
    reduce(function (a, b)
      add(__e4, {__x135, a, b})
      return a
    end, __args7)
    return join({"and"}, reverse(__e4))
  else
    return form
  end
end
local function lower_infix63(form)
  return infix63(hd(form)) and _35(form) > 3
end
local function lower_infix(form, hoist)
  local __form3 = lower_pairwise(form)
  local ____id25 = __form3
  local __x138 = has(____id25, 1)
  local __args8 = cut(____id25, 1)
  return lower(reduce(function (a, b)
    return {__x138, b, a}
  end, reverse(__args8)), hoist)
end
local function lower_special(form, hoist)
  local __e5 = lower_call(form, hoist)
  if __e5 then
    return add(hoist, __e5)
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
          local ____id26 = form
          local __x141 = has(____id26, 1)
          local __args9 = cut(____id26, 1)
          if __x141 == "do" then
            return lower_do(__args9, hoist, stmt63, tail63)
          else
            if __x141 == "%set" then
              return lower_set(__args9, hoist, stmt63, tail63)
            else
              if __x141 == "%if" then
                return lower_if(__args9, hoist, stmt63, tail63)
              else
                if __x141 == "%try" then
                  return lower_try(__args9, hoist, tail63)
                else
                  if __x141 == "while" then
                    return lower_while(__args9, hoist)
                  else
                    if __x141 == "%for" then
                      return lower_for(__args9, hoist)
                    else
                      if __x141 == "%function" then
                        return lower_function(__args9, hoist)
                      else
                        if __x141 == "%local-function" or __x141 == "%global-function" then
                          return lower_definition(__x141, __args9, hoist)
                        else
                          if in63(__x141, {"and", "or"}) then
                            return lower_short(__x141, __args9, hoist)
                          else
                            if statement63(__x141) then
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
function expand(form)
  return lower(macroexpand(form))
end
local load1 = loadstring or load
local function run(code)
  local f,e = load1(code)
  if f then
    return f()
  else
    error(e .. " in " .. code)
  end
end
local function eval_result(globals)
  return lumen_result
end
function _eval(form, globals)
  local __previous = has(setenv("target", {_stash = true, toplevel = true}), "value")
  setenv("target", {_stash = true, toplevel = true}).value = "lua"
  local __code = compile(expand({"set", "lumen-result", form}))
  setenv("target", {_stash = true, toplevel = true}).value = __previous
  run(__code, globals)
  return eval_result(globals)
end
function immediate_call63(x)
  return not atom63(x) and not atom63(hd(x)) and hd(hd(x)) == "%function"
end
setenv("do", {_stash = true, special = function (...)
  local __forms1 = unstash({...})
  local __s4 = ""
  local ____x147 = __forms1
  local ____i20 = 0
  while ____i20 < _35(____x147) do
    local __x148 = ____x147[____i20 + 1]
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" and immediate_call63(__x148) and "\n" == char(__s4, edge(__s4)) then
      __s4 = clip(__s4, 0, edge(__s4)) .. ";\n"
    end
    __s4 = __s4 .. compile(__x148, {_stash = true, stmt = true})
    if not atom63(__x148) then
      if hd(__x148) == "return" or hd(__x148) == "break" then
        break
      end
    end
    ____i20 = ____i20 + 1
  end
  return __s4
end, stmt = true, tr = true})
setenv("%if", {_stash = true, special = function (cond, cons, alt)
  local __cond2 = compile(cond)
  local __cons1 = compile_body(cons)
  local __e51
  if alt then
    __e51 = compile_body(alt)
  end
  local __alt1 = __e51
  local __ind3 = indentation()
  local __s6 = ""
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    __s6 = __s6 .. __ind3 .. "if (" .. __cond2 .. ") {\n" .. __cons1 .. __ind3 .. "}"
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      __s6 = __s6 .. __ind3 .. "if " .. __cond2 .. ":\n" .. __cons1
    else
      __s6 = __s6 .. __ind3 .. "if " .. __cond2 .. " then\n" .. __cons1
    end
  end
  if __alt1 and has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    __s6 = __s6 .. " else {\n" .. __alt1 .. __ind3 .. "}"
  else
    if __alt1 and has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      __s6 = __s6 .. __ind3 .. "else:\n" .. __alt1
    else
      if __alt1 then
        __s6 = __s6 .. __ind3 .. "else\n" .. __alt1
      end
    end
  end
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    return __s6 .. __ind3 .. "end\n"
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
      return __s6 .. "\n"
    else
      return __s6
    end
  end
end, stmt = true, tr = true})
setenv("while", {_stash = true, special = function (cond, form)
  local __cond4 = compile(cond)
  local __body10 = compile_body(form)
  local __ind5 = indentation()
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    return __ind5 .. "while (" .. __cond4 .. ") {\n" .. __body10 .. __ind5 .. "}\n"
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      return __ind5 .. "while " .. __cond4 .. ":\n" .. __body10
    else
      return __ind5 .. "while " .. __cond4 .. " do\n" .. __body10 .. __ind5 .. "end\n"
    end
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form)
  local __t2 = compile(t)
  local __ind7 = indentation()
  local __body12 = compile_body(form)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    return __ind7 .. "for " .. k .. " in next, " .. __t2 .. " do\n" .. __body12 .. __ind7 .. "end\n"
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      return __ind7 .. "for " .. k .. " in indices(" .. __t2 .. "):\n" .. __body12
    else
      return __ind7 .. "for (" .. k .. " in " .. __t2 .. ") {\n" .. __body12 .. __ind7 .. "}\n"
    end
  end
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local __ind9 = indentation()
  local __body14 = compile_body(form)
  local __e52
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    __e52 = {"do", {"import", "sys"}, {"%local", "e", {{"idx", "sys", "exc_info"}}}, {"return", {"%array", false, {"get", "e", 1}, "e"}}}
  else
    __e52 = {"return", {"%array", false, "e"}}
  end
  local __hf1 = __e52
  setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") + 1
  local ____x170 = compile(__hf1, {_stash = true, stmt = true})
  setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") - 1
  local __h1 = ____x170
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    return __ind9 .. "try {\n" .. __body14 .. __ind9 .. "}\n" .. __ind9 .. "catch (e) {\n" .. __h1 .. __ind9 .. "}\n"
  else
    return __ind9 .. "try:\n" .. __body14 .. __ind9 .. "except:\n" .. __h1
  end
end, stmt = true, tr = true})
setenv("%delete", {_stash = true, special = function (place)
  local __e53
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    __e53 = "del "
  else
    __e53 = "delete "
  end
  return indentation() .. __e53 .. compile(place)
end, stmt = true})
setenv("break", {_stash = true, special = function ()
  return indentation() .. "break"
end, stmt = true})
setenv("%function", {_stash = true, special = function (args, body)
  return compile_function(args, body)
end})
setenv("%global-function", {_stash = true, special = function (name, args, body)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" or has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    local __x174 = compile_function(args, body, {_stash = true, name = name})
    return indentation() .. __x174
  else
    return compile({"%set", name, {"%function", args, body}}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("%local-function", {_stash = true, special = function (name, args, body)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" or has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    local __x180 = compile_function(args, body, {_stash = true, name = name, prefix = "local"})
    return indentation() .. __x180
  else
    return compile({"%local", name, {"%function", args, body}}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("return", {_stash = true, special = function (x)
  local __e54
  if nil63(x) then
    __e54 = "return"
  else
    __e54 = "return " .. compile(x)
  end
  local __x184 = __e54
  return indentation() .. __x184
end, stmt = true})
setenv("new", {_stash = true, special = function (x)
  return "new " .. compile(x)
end})
setenv("typeof", {_stash = true, special = function (x)
  return "typeof(" .. compile(x) .. ")"
end})
setenv("error", {_stash = true, special = function (x)
  local __e55
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    __e55 = "throw " .. compile({"new", {"Error", x}})
  else
    local __e56
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      __e56 = "raise " .. compile({"Exception", x})
    else
      __e56 = "error(" .. compile(x) .. ")"
    end
    __e55 = __e56
  end
  local __e13 = __e55
  return indentation() .. __e13
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  if nil63(value) and has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    value = "nil"
  end
  local __id28 = compile(name)
  local __value11 = compile(value)
  local __e57
  if is63(value) then
    __e57 = " = " .. __value11
  else
    __e57 = ""
  end
  local __rh2 = __e57
  local __e58
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    __e58 = "var "
  else
    local __e59
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
      __e59 = "local "
    else
      __e59 = ""
    end
    __e58 = __e59
  end
  local __keyword1 = __e58
  local __ind11 = indentation()
  return __ind11 .. __keyword1 .. __id28 .. __rh2
end, stmt = true})
setenv("%set", {_stash = true, special = function (lh, rh)
  local __lh2 = compile(lh)
  local __e60
  if nil63(rh) then
    __e60 = "nil"
  else
    __e60 = rh
  end
  local __rh4 = compile(__e60)
  return indentation() .. __lh2 .. " = " .. __rh4
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local __t12 = compile(t)
  local __k12 = compile(k)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" and char(__t12, 0) == "{" or infix_operator63(t) then
    __t12 = "(" .. __t12 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) and not( has(setenv("target", {_stash = true, toplevel = true}), "value") == "py") then
    return __t12 .. "." .. inner(k)
  else
    return __t12 .. "[" .. __k12 .. "]"
  end
end})
setenv("idx", {_stash = true, special = function (t, k)
  local __t14 = compile(t)
  local __k14 = compile(k)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" and char(__t14, 0) == "{" or infix_operator63(t) then
    __t14 = "(" .. __t14 .. ")"
  end
  return __t14 .. "." .. __k14
end})
setenv("%array", {_stash = true, special = function (...)
  local __forms3 = unstash({...})
  local __e61
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    __e61 = "{"
  else
    __e61 = "["
  end
  local __open1 = __e61
  local __e62
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    __e62 = "}"
  else
    __e62 = "]"
  end
  local __close1 = __e62
  local __s8 = ""
  local __c7 = ""
  local ____o11 = __forms3
  local __k111 = nil
  for __k111 in next, ____o11 do
    local __v10 = ____o11[__k111]
    if number63(__k111) then
      __s8 = __s8 .. __c7 .. compile(__v10)
      __c7 = ", "
    end
  end
  return __open1 .. __s8 .. __close1
end})
setenv("%object", {_stash = true, special = function (...)
  local __forms5 = unstash({...})
  local __s10 = "{"
  local __c9 = ""
  local __e63
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    __e63 = " = "
  else
    __e63 = ": "
  end
  local __sep1 = __e63
  local ____o13 = pair(__forms5)
  local __k15 = nil
  for __k15 in next, ____o13 do
    local __v13 = ____o13[__k15]
    if number63(__k15) then
      local ____id30 = __v13
      local __k16 = has(____id30, 1)
      local __v14 = has(____id30, 2)
      if not string63(__k16) then
        error("Illegal key: " .. _str(__k16))
      end
      __s10 = __s10 .. __c9 .. key(__k16) .. __sep1 .. compile(__v14)
      __c9 = ", "
    end
  end
  return __s10 .. "}"
end})
setenv("%literal", {_stash = true, special = function (...)
  local __args111 = unstash({...})
  return apply(cat, map(compile, __args111))
end})
setenv("global", {_stash = true, special = function (x)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    return indentation() .. "global " .. compile(x) .. "\n"
  else
    return ""
  end
end, stmt = true, tr = true})
setenv("import", {_stash = true, special = function (name, ...)
  local ____r130 = unstash({...})
  local __name6 = destash33(name, ____r130)
  local ____id33 = ____r130
  local __as1 = has(____id33, "as")
  local __ind13 = indentation()
  local __id34 = __as1 or __name6
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    local __s12 = __ind13 .. "import " .. compile(__name6)
    if __as1 then
      __s12 = __s12 .. " as " .. compile(__id34)
    end
    return __s12
  else
    return __ind13 .. compile({"%local", __id34, {"require", escape(__name6)}})
  end
end, stmt = true})
local __exports = exports or {}
__exports.run = run
__exports["eval"] = _eval
__exports._eval = _eval
__exports.expand = expand
__exports.compile = compile
return __exports
