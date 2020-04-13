function getenv(k, p)
  if string63(k) then
    local __i = edge(environment)
    while __i >= 0 do
      if has63(environment[__i + 1], k) then
        local __b = environment[__i + 1][k]
        local __e34 = nil
        if p then
          __e34 = has(__b, p)
        else
          __e34 = __b
        end
        return __e34
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
    if hd(lh) == "t" then
      local ____id = lh
      local ___ = has(____id, 1)
      local ___var = has(____id, 2)
      local __val = has(____id, 3)
      return bind({"o", ___var, {"the", __val}}, rh)
    else
      if hd(lh) == "o" then
        local ____id1 = lh
        local ___1 = has(____id1, 1)
        local ___var1 = has(____id1, 2)
        local __val1 = has(____id1, 3)
        return {___var1, {"if", {"nil?", rh}, __val1, rh}}
      else
        local __id2 = unique("id")
        local __bs = {__id2, rh}
        local ____o2 = lh
        local __k2 = nil
        for __k2 in next, ____o2 do
          local __v2 = ____o2[__k2]
          local __e35 = nil
          if __k2 == "rest" then
            __e35 = {"cut", __id2, _35(lh)}
          else
            __e35 = {"has", __id2, {"quote", bias(__k2)}}
          end
          local __x11 = __e35
          if is63(__k2) then
            local __e36 = nil
            if __v2 == true then
              __e36 = __k2
            else
              __e36 = __v2
            end
            local __k3 = __e36
            __bs = join(__bs, bind(__k3, __x11))
          end
        end
        return __bs
      end
    end
  end
end
setenv("arguments%", {_stash = true, macro = function (_from)
  local ____x22 = object({"target"})
  ____x22.js = {{"idx", {"idx", {"idx", "Array", "prototype"}, "slice"}, "call"}, "arguments", _from}
  ____x22.py = {"|list|", "|_args|"}
  ____x22.lua = {"list", "|...|"}
  return ____x22
end})
function bind42(args, body)
  local __args1 = {}
  local function rest()
    __args1.rest = true
    local ____x31 = object({"target"})
    ____x31.py = "|_keys|"
    return {"unstash", {"arguments%", _35(__args1)}, ____x31}
  end
  if atom63(args) then
    return {__args1, join({"let", {args, rest()}}, body)}
  else
    local __pre = {}
    local __bs1 = {}
    local __inits = {}
    local __r19 = unique("r")
    local ____o3 = args
    local __k4 = nil
    for __k4 in next, ____o3 do
      local __v3 = ____o3[__k4]
      if number63(__k4) then
        if atom63(__v3) then
          add(__args1, __v3)
        else
          if hd(__v3) == "o" then
            local ____id3 = __v3
            local ___2 = has(____id3, 1)
            local ___var2 = has(____id3, 2)
            local __val2 = has(____id3, 3)
            add(__args1, ___var2)
            add(__inits, {"if", {"nil?", ___var2}, {"%set", ___var2, __val2}})
          else
            if hd(__v3) == "t" then
              local ____id4 = __v3
              local ___3 = has(____id4, 1)
              local ___var3 = has(____id4, 2)
              local __val3 = has(____id4, 3)
              add(__args1, ___var3)
              add(__inits, {"if", {"nil?", ___var3}, {"%set", ___var3, {"the", __val3}}})
            else
              local __x42 = unique("x")
              add(__args1, __x42)
              __bs1 = join(__bs1, {__v3, __x42})
            end
          end
        end
      end
    end
    if keys63(args) then
      __pre = join(__pre, {__r19, rest()})
      local __n4 = _35(__args1)
      local __i5 = 0
      while __i5 < __n4 do
        local __v4 = __args1[__i5 + 1]
        __pre = join(__pre, {__v4, {"destash!", __v4, __r19}})
        __i5 = __i5 + 1
      end
      __bs1 = join(__bs1, {keys(args), __r19})
    end
    return {__args1, join({"let", __pre}, __inits, {join({"let", __bs1}, body)})}
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
local function expand_local(__x52)
  local ____id5 = __x52
  local __x53 = has(____id5, 1)
  local __name = has(____id5, 2)
  local __value = has(____id5, 3)
  setenv(__name, {_stash = true, variable = true})
  return {"%local", __name, macroexpand(__value)}
end
local function expand_function(__x55)
  local ____id6 = __x55
  local __x56 = has(____id6, 1)
  local __args = has(____id6, 2)
  local __body = cut(____id6, 2)
  add(environment, {})
  local ____o4 = __args
  local ____i6 = nil
  for ____i6 in next, ____o4 do
    local ____x57 = ____o4[____i6]
    setenv(____x57, {_stash = true, variable = true})
  end
  local ____x58 = join({"%function", __args}, macroexpand(__body))
  drop(environment)
  return ____x58
end
local function expand_definition(__x60)
  local ____id7 = __x60
  local __x61 = has(____id7, 1)
  local __name1 = has(____id7, 2)
  local __args11 = has(____id7, 3)
  local __body1 = cut(____id7, 3)
  add(environment, {})
  local ____o5 = __args11
  local ____i7 = nil
  for ____i7 in next, ____o5 do
    local ____x62 = ____o5[____i7]
    setenv(____x62, {_stash = true, variable = true})
  end
  local ____x63 = join({__x61, __name1, __args11}, macroexpand(__body1))
  drop(environment)
  return ____x63
end
local function expand_macro(form)
  return macroexpand(expand1(form))
end
function expand1(__x65)
  local ____id8 = __x65
  local __name2 = has(____id8, 1)
  local __body2 = cut(____id8, 1)
  return apply(macro_function(__name2), __body2)
end
function real63(x)
  return number63(x) and not nan63(x) and not inf63(x)
end
function valid_access63(_str)
  return _35(_str) > 2 and not( "." == char(_str, 0)) and not( "." == char(_str, edge(_str))) and not search(_str, "..")
end
function parse_access(_str)
  return reduce(function (a, b)
    local __n7 = number(a)
    if is63(__n7) then
      return {"at", b, __n7}
    else
      return {"idx", b, a}
    end
  end, reverse(split(_str, ".")))
end
function parse_access63(form)
  return string63(form) and not string_literal63(form) and not id_literal63(form) and search(form, ".") and valid_access63(form)
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
        local __x68 = hd(form)
        if __x68 == "%local" then
          return expand_local(form)
        else
          if __x68 == "%function" then
            return expand_function(form)
          else
            if __x68 == "%global-function" then
              return expand_definition(form)
            else
              if __x68 == "%local-function" then
                return expand_definition(form)
              else
                if __x68 == "%expansion" then
                  return form[2]
                else
                  if macro63(__x68) then
                    return expand_macro(form)
                  else
                    if parse_access63(__x68) then
                      return macroexpand(join({parse_access(__x68)}, tl(form)))
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
  local ____o6 = form
  local __k5 = nil
  for __k5 in next, ____o6 do
    local __v5 = ____o6[__k5]
    if not number63(__k5) then
      local __e37 = nil
      if quasisplice63(__v5, depth) then
        __e37 = quasiexpand(__v5[2])
      else
        __e37 = quasiexpand(__v5, depth)
      end
      local __v6 = __e37
      last(__xs)[__k5] = __v6
    end
  end
  local ____x72 = form
  local ____i9 = 0
  while ____i9 < _35(____x72) do
    local __x73 = ____x72[____i9 + 1]
    if quasisplice63(__x73, depth) then
      local __x74 = quasiexpand(__x73[2])
      add(__xs, __x74)
      add(__xs, {"list"})
    else
      add(last(__xs), quasiexpand(__x73, depth))
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
function expand_if(__x78)
  local ____id9 = __x78
  local __a = has(____id9, 1)
  local __b1 = has(____id9, 2)
  local __c = cut(____id9, 2)
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
local reserved = {["="] = true, ["=="] = true, ["+"] = true, ["-"] = true, ["%"] = true, ["*"] = true, ["/"] = true, ["<"] = true, [">"] = true, ["<="] = true, [">="] = true, ["break"] = true, ["case"] = true, ["catch"] = true, ["class"] = true, ["const"] = true, ["continue"] = true, ["debugger"] = true, ["default"] = true, ["delete"] = true, ["do"] = true, ["else"] = true, ["eval"] = true, ["finally"] = true, ["for"] = true, ["function"] = true, ["if"] = true, ["import"] = true, ["in"] = true, ["instanceof"] = true, ["let"] = true, ["return"] = true, ["switch"] = true, ["throw"] = true, ["try"] = true, ["typeof"] = true, ["var"] = true, ["void"] = true, ["with"] = true, ["and"] = true, ["end"] = true, ["load"] = true, ["repeat"] = true, ["while"] = true, ["false"] = true, ["local"] = true, ["nil"] = true, ["then"] = true, ["not"] = true, ["true"] = true, ["elseif"] = true, ["or"] = true, ["until"] = true, ["from"] = true, ["str"] = true, ["print"] = true}
function reserved63(x)
  return has63(reserved, x)
end
local function valid_code63(n)
  return number_code63(n) or n > 64 and n < 91 or n > 96 and n < 123 or n == 95
end
function compile_id(id, raw63)
  if code(id, 0) == 46 then
    return "." .. compile_id(clip(id, 1), true)
  else
    local __e38 = nil
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      __e38 = "L_"
    else
      __e38 = "_"
    end
    local __x84 = __e38
    local __e39 = nil
    if number_code63(code(id, 0)) then
      __e39 = __x84
    else
      __e39 = ""
    end
    local __id11 = __e39
    local __i11 = 0
    while __i11 < _35(id) do
      local __c1 = char(id, __i11)
      local __n9 = code(__c1)
      local __e40 = nil
      if __c1 == "-" and not( id == "-") then
        local __e43 = nil
        if __i11 == 0 then
          __e43 = __x84
        else
          __e43 = "_"
        end
        __e40 = __e43
      else
        local __e41 = nil
        if valid_code63(__n9) then
          __e41 = __c1
        else
          local __e42 = nil
          if __i11 == 0 then
            __e42 = __x84 .. __n9
          else
            __e42 = __n9
          end
          __e41 = __e42
        end
        __e40 = __e41
      end
      local __c11 = __e40
      __id11 = __id11 .. __c11
      __i11 = __i11 + 1
    end
    if raw63 then
      return __id11
    else
      if reserved63(__id11) then
        return __x84 .. __id11
      else
        return __id11
      end
    end
  end
end
function valid_id63(x)
  return some63(x) and x == compile_id(x)
end
local __names = {}
function unique(x)
  local __x85 = compile_id(x)
  if has63(__names, __x85) then
    local __i12 = __names[__x85]
    __names[__x85] = __names[__x85] + 1
    return unique(__x85 .. __i12)
  else
    __names[__x85] = 1
    return "__" .. __x85
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
    local __x86 = f(__v7)
    if is63(__x86) then
      add(__o7, literal(__k6))
      add(__o7, __x86)
    end
  end
  return __o7
end
local ____x88 = object({})
local ____x89 = object({})
____x89.js = "!"
____x89.lua = "not"
____x89.py = "not"
____x88["not"] = ____x89
local ____x90 = object({})
____x90.js = "!"
____x90.lua = "not"
____x90.py = "not"
____x88["%not"] = ____x90
____x88["%unm"] = "-"
local ____x91 = object({})
____x91["*"] = true
____x91["/"] = true
____x91["%"] = true
____x91["%mul"] = "*"
____x91["%div"] = "/"
____x91["%idiv"] = "//"
____x91["%mod"] = "%"
local ____x92 = object({})
local ____x93 = object({})
____x93.js = "+"
____x93.lua = ".."
____x92.cat = ____x93
local ____x94 = object({})
____x94.js = "+"
____x94.lua = ".."
____x92["%cat"] = ____x94
local ____x95 = object({})
____x95["+"] = true
____x95["-"] = true
____x95["%add"] = "+"
____x95["%sub"] = "-"
local ____x96 = object({})
____x96["<"] = true
____x96[">"] = true
____x96["<="] = true
____x96[">="] = true
____x96["%lt"] = "<"
____x96["%gt"] = ">"
____x96["%le"] = "<="
____x96["%ge"] = ">="
local ____x97 = object({})
local ____x98 = object({})
____x98.js = "==="
____x98.lua = "=="
____x98.py = "=="
____x97["="] = ____x98
local ____x99 = object({})
____x99.js = "==="
____x99.lua = "=="
____x99.py = "=="
____x97["%eq"] = ____x99
local ____x100 = object({})
local ____x101 = object({})
____x101.js = "&&"
____x101.lua = "and"
____x101.py = "and"
____x100["and"] = ____x101
local ____x102 = object({})
____x102.js = "&&"
____x102.lua = "and"
____x102.py = "and"
____x100["%and"] = ____x102
local ____x103 = object({})
local ____x104 = object({})
____x104.js = "||"
____x104.lua = "or"
____x104.py = "or"
____x103["or"] = ____x104
local ____x105 = object({})
____x105.js = "||"
____x105.lua = "or"
____x105.py = "or"
____x103["%or"] = ____x105
local infix = {____x88, ____x91, ____x92, ____x95, ____x96, ____x97, ____x100, ____x103}
local function unary63(form)
  return two63(form) and in63(hd(form), {"not", "-", "%not", "%unm"})
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
    local __x107 = has(level, op)
    if __x107 == true then
      return op
    else
      if string63(__x107) then
        return __x107
      else
        if is63(__x107) then
          return has(__x107, has(setenv("target", {_stash = true, toplevel = true}), "value"))
        end
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
  local ____x108 = args
  local ____i16 = 0
  while ____i16 < _35(____x108) do
    local __x109 = ____x108[____i16 + 1]
    __s1 = __s1 .. __c2 .. compile(__x109)
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" and default63 and not id_literal63(__x109) then
      __s1 = __s1 .. "=None"
    end
    __c2 = ", "
    ____i16 = ____i16 + 1
  end
  return __s1 .. ")"
end
local function escape_newlines(s)
  if nil63(search(s, "\n")) and nil63(search(s, "\r")) then
    return s
  else
    local __s11 = ""
    local __i17 = 0
    while __i17 < _35(s) do
      local __c3 = char(s, __i17)
      local __e44 = nil
      if __c3 == "\n" then
        __e44 = "\\n"
      else
        local __e45 = nil
        if __c3 == "\r" then
          __e45 = "\\r"
        else
          __e45 = __c3
        end
        __e44 = __e45
      end
      __s11 = __s11 .. __e44
      __i17 = __i17 + 1
    end
    return __s11
  end
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
          return compile_id(x)
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
  local ____id10 = form
  local __x110 = has(____id10, 1)
  local __args2 = cut(____id10, 1)
  local ____id111 = getenv(__x110)
  local __special = has(____id111, "special")
  local __stmt = has(____id111, "stmt")
  local __self_tr63 = has(____id111, "tr")
  local __e46 = nil
  if stmt63 and not __stmt then
    __e46 = indentation()
  else
    __e46 = ""
  end
  local __p = __e46
  local __tr = terminator(stmt63 and not __self_tr63)
  return __p .. apply(__special, __args2) .. __tr
end
local function parenthesize_call63(x)
  return not atom63(x) and hd(x) == "%function" or precedence(x) > 0
end
local function method_call63(form)
  local __e47 = nil
  if list63(form) then
    __e47 = hd(form)
  else
    __e47 = form
  end
  local __x111 = __e47
  return string63(__x111) and _35(__x111, 1) > 1 and char(__x111, 0) == "."
end
local function compile_call(form)
  local __f = hd(form)
  local __f1 = compile(__f)
  local __args3 = stash42(tl(form))
  local __e48 = nil
  if method_call63(hd(__args3)) then
    __e48 = mapcat(compile, __args3, "")
  else
    __e48 = compile_args(__args3)
  end
  local __args4 = __e48
  if parenthesize_call63(__f) then
    return "(" .. __f1 .. ")" .. __args4
  else
    return __f1 .. __args4
  end
end
local function op_delims(parent, child, ...)
  local ____r65 = unstash({...})
  local __parent = destash33(parent, ____r65)
  local __child = destash33(child, ____r65)
  local ____id12 = ____r65
  local __right = has(____id12, "right")
  local __e49 = nil
  if __right then
    __e49 = _6261
  else
    __e49 = _62
  end
  if __e49(precedence(__child), precedence(__parent)) then
    return {"(", ")"}
  else
    return {"", ""}
  end
end
local function compile_infix(form)
  local ____id13 = form
  local __op = has(____id13, 1)
  local ____id14 = cut(____id13, 1)
  local __a1 = has(____id14, 1)
  local __b2 = has(____id14, 2)
  local ____id15 = op_delims(form, __a1)
  local __ao = has(____id15, 1)
  local __ac = has(____id15, 2)
  local ____id16 = op_delims(form, __b2, {_stash = true, right = true})
  local __bo = has(____id16, 1)
  local __bc = has(____id16, 2)
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
  local ____x115 = compile(body, {_stash = true, stmt = true})
  setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") - 1
  local __s2 = ____x115
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" and none63(__s2) then
    setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") + 1
    local ____x116 = indentation() .. "pass\n"
    setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") - 1
    return ____x116
  else
    return __s2
  end
end
function compile_function(args, body, ...)
  local ____r68 = unstash({...})
  local __args5 = destash33(args, ____r68)
  local __body3 = destash33(body, ____r68)
  local ____id17 = ____r68
  local __name3 = has(____id17, "name")
  local __prefix = has(____id17, "prefix")
  local __async = has(____id17, "async")
  local __e50 = nil
  if __name3 then
    __e50 = compile(__name3)
  else
    __e50 = ""
  end
  local __id18 = __e50
  local __e51 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" and has63(__args5, "rest") then
    __e51 = join(__args5, {"|...|"})
  else
    local __e52 = nil
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" and has63(__args5, "rest") then
      __e52 = join(__args5, {"|*_args|", "|**_keys|"})
    else
      __e52 = __args5
    end
    __e51 = __e52
  end
  local __args12 = __e51
  local __args6 = compile_args(__args12, true)
  local __body4 = compile_body(__body3)
  local __ind = indentation()
  local __e53 = nil
  if __prefix then
    __e53 = __prefix .. " "
  else
    __e53 = ""
  end
  local __p1 = __e53
  local __e54 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    __e54 = ""
  else
    __e54 = "end"
  end
  local __tr1 = __e54
  local __e55 = nil
  if __async and not( has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua") then
    __e55 = "async "
  else
    __e55 = ""
  end
  local __a3 = __e55
  if __name3 then
    __tr1 = __tr1 .. "\n"
  end
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    return __a3 .. "function " .. __id18 .. __args6 .. " {\n" .. __body4 .. __ind .. "}" .. __tr1
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      return __a3 .. "def " .. __id18 .. __args6 .. ":\n" .. __body4
    else
      return __p1 .. "function " .. __id18 .. __args6 .. "\n" .. __body4 .. __ind .. __tr1
    end
  end
end
local function can_return63(form)
  return is63(form) and (atom63(form) or not( hd(form) == "return") and not statement63(hd(form)))
end
function compile(form, ...)
  local ____r70 = unstash({...})
  local __form = destash33(form, ____r70)
  local ____id19 = ____r70
  local __stmt1 = has(____id19, "stmt")
  if nil63(__form) then
    return ""
  else
    if special_form63(__form) then
      return compile_special(__form, __stmt1)
    else
      local __tr2 = terminator(__stmt1)
      local __e56 = nil
      if __stmt1 then
        __e56 = indentation()
      else
        __e56 = ""
      end
      local __ind1 = __e56
      local __e57 = nil
      if atom63(__form) then
        __e57 = compile_atom(__form)
      else
        local __e58 = nil
        if infix63(hd(__form)) then
          __e58 = compile_infix(__form)
        else
          __e58 = compile_call(__form)
        end
        __e57 = __e58
      end
      local __form1 = __e57
      return __ind1 .. __form1 .. __tr2
    end
  end
end
local function lower_statement(form, tail63)
  local __hoist = {}
  local __e = lower(form, __hoist, true, tail63)
  local __e59 = nil
  if some63(__hoist) and is63(__e) then
    __e59 = join({"do"}, __hoist, {__e})
  else
    local __e60 = nil
    if is63(__e) then
      __e60 = __e
    else
      local __e61 = nil
      if _35(__hoist) > 1 then
        __e61 = join({"do"}, __hoist)
      else
        __e61 = hd(__hoist)
      end
      __e60 = __e61
    end
    __e59 = __e60
  end
  return either(__e59, {"do"})
end
local function lower_body(body, tail63)
  return lower_statement(join({"do"}, body), tail63)
end
local function literal63(form)
  return atom63(form) or hd(form) == "%array" or hd(form) == "%object" or hd(form) == "%list"
end
local function standalone63(form)
  return not atom63(form) and not infix63(hd(form)) and not literal63(form) and not( "get" == hd(form)) or id_literal63(form)
end
local function lower_do(args, hoist, stmt63, tail63)
  local ____x126 = almost(args)
  local ____i18 = 0
  while ____i18 < _35(____x126) do
    local __x127 = ____x126[____i18 + 1]
    local ____y = lower(__x127, hoist, stmt63)
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
  local ____id20 = args
  local __lh = has(____id20, 1)
  local __rh = has(____id20, 2)
  local __lh1 = lower(__lh, hoist)
  local __rh1 = lower(__rh, hoist)
  add(hoist, {"%set", __lh1, __rh1})
  if not( stmt63 and not tail63) then
    return __lh1
  end
end
local function lower_if(args, hoist, stmt63, tail63)
  local ____id21 = args
  local __cond = has(____id21, 1)
  local ___then = has(____id21, 2)
  local ___else = has(____id21, 3)
  if stmt63 then
    local __e63 = nil
    if is63(___else) then
      __e63 = {lower_body({___else}, tail63)}
    end
    return add(hoist, join({"%if", lower(__cond, hoist), lower_body({___then}, tail63)}, __e63))
  else
    local __e3 = unique("e")
    add(hoist, {"%local", __e3, "nil"})
    local __e62 = nil
    if is63(___else) then
      __e62 = {lower({"%set", __e3, ___else})}
    end
    add(hoist, join({"%if", lower(__cond, hoist), lower({"%set", __e3, ___then})}, __e62))
    return __e3
  end
end
local function lower_short(x, args, hoist)
  local ____id22 = args
  local __a4 = has(____id22, 1)
  local __b4 = has(____id22, 2)
  local __hoist1 = {}
  local __b11 = lower(__b4, __hoist1)
  if some63(__hoist1) then
    local __id23 = unique("id")
    local __e64 = nil
    if x == "and" then
      __e64 = {"%if", __id23, __b4, __id23}
    else
      __e64 = {"%if", __id23, __id23, __b4}
    end
    return lower({"do", {"%local", __id23, __a4}, __e64}, hoist)
  else
    return {x, lower(__a4, hoist), __b11}
  end
end
local function lower_try(args, hoist, tail63)
  return add(hoist, {"%try", lower_body(args, tail63)})
end
local function lower_while(args, hoist)
  local ____id24 = args
  local __c4 = has(____id24, 1)
  local __body5 = cut(____id24, 1)
  local __pre1 = {}
  local __c5 = lower(__c4, __pre1)
  local __e65 = nil
  if none63(__pre1) then
    __e65 = {"while", __c5, lower_body(__body5)}
  else
    __e65 = {"while", true, join({"do"}, __pre1, {{"%if", {"not", __c5}, {"break"}}, lower_body(__body5)})}
  end
  return add(hoist, __e65)
end
local function lower_for(args, hoist)
  local ____id25 = args
  local __h = has(____id25, 1)
  local __k8 = has(____id25, 2)
  local __body6 = cut(____id25, 2)
  return add(hoist, join({"%for", lower(__h, hoist), __k8, lower_body(__body6)}, keys(__body6)))
end
local function lower_with(args, hoist, stmt63, tail63)
  local ____id26 = args
  local __h1 = has(____id26, 1)
  local __body7 = cut(____id26, 1)
  if stmt63 and not tail63 then
    return add(hoist, join({"%with", lower(__h1, hoist), lower_body(__body7, tail63)}, keys(__body7)))
  else
    local __e4 = unique("e")
    add(hoist, {"%local", __e4})
    add(hoist, join({"%with", lower(__h1, hoist), lower({"%set", __e4, join({"do"}, __body7)})}, keys(__body7)))
    return __e4
  end
end
local function lower_block(args, hoist, stmt63, tail63)
  local ____id27 = args
  local __name4 = has(____id27, 1)
  local __h2 = has(____id27, 2)
  local __body8 = cut(____id27, 2)
  return add(hoist, {"%block", __name4, lower(__h2, hoist), lower_body(__body8, tail63)})
end
local function lower_function(args, hoist)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    local __f11 = unique("f")
    return lower({"do", join({"%local-function", __f11}, args), __f11}, hoist)
  else
    local ____id28 = args
    local __a5 = has(____id28, 1)
    local __body9 = cut(____id28, 1)
    return join({"%function", __a5, lower_body(__body9, true)}, keys(__body9))
  end
end
local function lower_definition(kind, args, hoist)
  local ____id29 = args
  local __name5 = has(____id29, 1)
  local __args7 = has(____id29, 2)
  local __body10 = cut(____id29, 2)
  return add(hoist, join({kind, __name5, __args7, lower_body(__body10, true)}, keys(__body10)))
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
    local __e5 = {}
    local ____id30 = form
    local __x164 = has(____id30, 1)
    local __args8 = cut(____id30, 1)
    reduce(function (a, b)
      add(__e5, {__x164, a, b})
      return a
    end, __args8)
    return join({"and"}, reverse(__e5))
  else
    return form
  end
end
local function lower_infix63(form)
  return infix63(hd(form)) and _35(form) > 3
end
local function lower_infix(form, hoist)
  local __form3 = lower_pairwise(form)
  local ____id31 = __form3
  local __x167 = has(____id31, 1)
  local __args9 = cut(____id31, 1)
  return lower(reduce(function (a, b)
    return {__x167, b, a}
  end, reverse(__args9)), hoist)
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
          local ____id32 = form
          local __x170 = has(____id32, 1)
          local __args10 = cut(____id32, 1)
          if __x170 == "do" then
            return lower_do(__args10, hoist, stmt63, tail63)
          else
            if __x170 == "%call" then
              return lower(__args10, hoist, stmt63, tail63)
            else
              if __x170 == "%set" then
                return lower_set(__args10, hoist, stmt63, tail63)
              else
                if __x170 == "%if" then
                  return lower_if(__args10, hoist, stmt63, tail63)
                else
                  if __x170 == "%try" then
                    return lower_try(__args10, hoist, tail63)
                  else
                    if __x170 == "while" then
                      return lower_while(__args10, hoist)
                    else
                      if __x170 == "%for" then
                        return lower_for(__args10, hoist)
                      else
                        if __x170 == "%with" then
                          return lower_with(__args10, hoist, stmt63, tail63)
                        else
                          if __x170 == "%block" then
                            return lower_block(__args10, hoist, stmt63, tail63)
                          else
                            if __x170 == "%function" then
                              return lower_function(__args10, hoist)
                            else
                              if __x170 == "%local-function" or __x170 == "%global-function" then
                                return lower_definition(__x170, __args10, hoist)
                              else
                                if in63(__x170, {"and", "or"}) then
                                  return lower_short(__x170, __args10, hoist)
                                else
                                  if statement63(__x170) then
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
local function eval_result(globals, locals)
  return lumen_result
end
function _eval(form, globals, locals)
  local __previous = has(setenv("target", {_stash = true, toplevel = true}), "value")
  setenv("target", {_stash = true, toplevel = true}).value = "lua"
  local __code = compile(expand({"set", "lumen-result", form}))
  setenv("target", {_stash = true, toplevel = true}).value = __previous
  run(__code, globals, locals)
  return eval_result(globals, locals)
end
function immediate_call63(x)
  return not atom63(x) and not atom63(hd(x)) and hd(hd(x)) == "%function"
end
setenv("do", {_stash = true, special = function (...)
  local __forms1 = unstash({...})
  local __s4 = ""
  local ____x176 = __forms1
  local ____i20 = 0
  while ____i20 < _35(____x176) do
    local __x177 = ____x176[____i20 + 1]
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" and immediate_call63(__x177) and "\n" == char(__s4, edge(__s4)) then
      __s4 = clip(__s4, 0, edge(__s4)) .. ";\n"
    end
    __s4 = __s4 .. compile(__x177, {_stash = true, stmt = true})
    if not atom63(__x177) then
      if hd(__x177) == "return" or hd(__x177) == "break" then
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
  local __e66 = nil
  if alt then
    __e66 = compile_body(alt)
  end
  local __alt1 = __e66
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
  local __body12 = compile_body(form)
  local __ind5 = indentation()
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    return __ind5 .. "while (" .. __cond4 .. ") {\n" .. __body12 .. __ind5 .. "}\n"
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      return __ind5 .. "while " .. __cond4 .. ":\n" .. __body12
    else
      return __ind5 .. "while " .. __cond4 .. " do\n" .. __body12 .. __ind5 .. "end\n"
    end
  end
end, stmt = true, tr = true})
setenv("%for", {_stash = true, special = function (t, k, form, ...)
  local ____r106 = unstash({...})
  local __t2 = destash33(t, ____r106)
  local __k11 = destash33(k, ____r106)
  local __form5 = destash33(form, ____r106)
  local ____id34 = ____r106
  local __async2 = has(____id34, "async")
  local __t3 = compile(__t2)
  local __k12 = compile(__k11)
  local __ind7 = indentation()
  local __body14 = compile_body(__form5)
  local __e67 = nil
  if __async2 then
    __e67 = "async "
  else
    __e67 = ""
  end
  local __a7 = __e67
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    return __ind7 .. "for " .. __k12 .. " in next, " .. __t3 .. " do\n" .. __body14 .. __ind7 .. "end\n"
  else
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      return __ind7 .. __a7 .. "for " .. __k12 .. " in " .. __t3 .. ":\n" .. __body14
    else
      return __ind7 .. "for (" .. __k12 .. " in " .. __t3 .. ") {\n" .. __body14 .. __ind7 .. "}\n"
    end
  end
end, stmt = true, tr = true})
setenv("%with", {_stash = true, special = function (t, form, ...)
  local ____r108 = unstash({...})
  local __t6 = destash33(t, ____r108)
  local __form7 = destash33(form, ____r108)
  local ____id36 = ____r108
  local __async4 = has(____id36, "async")
  local __t7 = compile(__t6)
  local __ind9 = indentation()
  local __body16 = compile_body(__form7)
  local __e68 = nil
  if __async4 then
    __e68 = "async "
  else
    __e68 = ""
  end
  local __a9 = __e68
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    return __ind9 .. __a9 .. "with " .. __t7 .. ":\n" .. __body16
  else
    return ""
  end
end, stmt = true, tr = true})
setenv("%block", {_stash = true, special = function (name, t, form)
  local __t9 = compile(t)
  local __ind11 = indentation()
  local __body18 = compile_body(form)
  local __e69 = nil
  if some63(__t9) then
    __e69 = " "
  else
    __e69 = ""
  end
  local __sep1 = __e69
  return __ind11 .. name .. __sep1 .. __t9 .. ":\n" .. __body18
end, stmt = true, tr = true})
setenv("%try", {_stash = true, special = function (form)
  local __ind13 = indentation()
  local __body20 = compile_body(form)
  local __e70 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    __e70 = {"do", {"import", "sys"}, {"%local", "e", {{"idx", "sys", "exc_info"}}}, {"return", {"%array", false, {"get", "e", 1}, "e"}}}
  else
    __e70 = {"return", {"%array", false, "e"}}
  end
  local __hf1 = __e70
  setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") + 1
  local ____x201 = compile(__hf1, {_stash = true, stmt = true})
  setenv("indent-level", {_stash = true, toplevel = true}).value = has(setenv("indent-level", {_stash = true, toplevel = true}), "value") - 1
  local __h4 = ____x201
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    return __ind13 .. "try {\n" .. __body20 .. __ind13 .. "}\n" .. __ind13 .. "catch (e) {\n" .. __h4 .. __ind13 .. "}\n"
  else
    return __ind13 .. "try:\n" .. __body20 .. __ind13 .. "except:\n" .. __h4
  end
end, stmt = true, tr = true})
setenv("%delete", {_stash = true, special = function (place)
  local __e71 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    __e71 = "del "
  else
    __e71 = "delete "
  end
  return indentation() .. __e71 .. compile(place)
end, stmt = true})
setenv("break", {_stash = true, special = function ()
  return indentation() .. "break"
end, stmt = true})
setenv("%function", {_stash = true, special = function (args, ...)
  local ____r118 = unstash({...})
  local __args121 = destash33(args, ____r118)
  local ____id38 = ____r118
  local __body22 = cut(____id38, 0)
  return apply(compile_function, join({__args121}, __body22, {}))
end})
setenv("%global-function", {_stash = true, special = function (name, args, ...)
  local ____r120 = unstash({...})
  local __name7 = destash33(name, ____r120)
  local __args14 = destash33(args, ____r120)
  local ____id40 = ____r120
  local __body24 = cut(____id40, 0)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" or has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    local ____x214 = object({__args14})
    ____x214.name = __name7
    local ____x215 = object({})
    ____x215.name = __name7
    local __x213 = apply(compile_function, join(____x214, __body24, ____x215))
    return indentation() .. __x213
  else
    return compile({"%set", __name7, join({"%function", __args14}, __body24)}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("%local-function", {_stash = true, special = function (name, args, ...)
  local ____r122 = unstash({...})
  local __name9 = destash33(name, ____r122)
  local __args16 = destash33(args, ____r122)
  local ____id42 = ____r122
  local __body26 = cut(____id42, 0)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" or has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    local ____x225 = object({__args16})
    ____x225.name = __name9
    ____x225.prefix = "local"
    local ____x226 = object({})
    ____x226.name = __name9
    ____x226.prefix = "local"
    local __x224 = apply(compile_function, join(____x225, __body26, ____x226))
    return indentation() .. __x224
  else
    return compile({"%local", __name9, join({"%function", __args16}, __body26)}, {_stash = true, stmt = true})
  end
end, stmt = true, tr = true})
setenv("return", {_stash = true, special = function (x)
  local __e72 = nil
  if nil63(x) then
    __e72 = "return"
  else
    __e72 = "return " .. compile(x)
  end
  local __x230 = __e72
  return indentation() .. __x230
end, stmt = true})
setenv("new", {_stash = true, special = function (x)
  return "new " .. compile(x)
end})
setenv("typeof", {_stash = true, special = function (x)
  return "typeof(" .. compile(x) .. ")"
end})
setenv("error", {_stash = true, special = function (x)
  local __e73 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    __e73 = "throw " .. compile({"new", {"Error", x}})
  else
    local __e74 = nil
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      __e74 = "raise " .. compile({"Exception", x})
    else
      __e74 = "error(" .. compile(x) .. ")"
    end
    __e73 = __e74
  end
  local __e17 = __e73
  return indentation() .. __e17
end, stmt = true})
setenv("throw", {_stash = true, special = function (x)
  local __e75 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    __e75 = "throw " .. compile(x)
  else
    local __e76 = nil
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
      __e76 = "raise " .. compile(x)
    else
      __e76 = "error(" .. compile(x) .. ")"
    end
    __e75 = __e76
  end
  local __e21 = __e75
  return indentation() .. __e21
end, stmt = true})
setenv("%local", {_stash = true, special = function (name, value)
  if nil63(value) and has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    value = "nil"
  end
  local __id44 = compile(name)
  local __value11 = compile(value)
  local __e77 = nil
  if is63(value) then
    __e77 = " = " .. __value11
  else
    __e77 = ""
  end
  local __rh2 = __e77
  local __e78 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "js" then
    __e78 = "var "
  else
    local __e79 = nil
    if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
      __e79 = "local "
    else
      __e79 = ""
    end
    __e78 = __e79
  end
  local __keyword1 = __e78
  local __ind15 = indentation()
  return __ind15 .. __keyword1 .. __id44 .. __rh2
end, stmt = true})
setenv("%set", {_stash = true, special = function (lh, rh)
  local __lh2 = compile(lh)
  local __e80 = nil
  if nil63(rh) then
    __e80 = "nil"
  else
    __e80 = rh
  end
  local __rh4 = compile(__e80)
  return indentation() .. __lh2 .. " = " .. __rh4
end, stmt = true})
setenv("get", {_stash = true, special = function (t, k)
  local __t12 = compile(t)
  local __k121 = compile(k)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" and char(__t12, 0) == "{" or infix_operator63(t) then
    __t12 = "(" .. __t12 .. ")"
  end
  if string_literal63(k) and valid_id63(inner(k)) and not( has(setenv("target", {_stash = true, toplevel = true}), "value") == "py") then
    return __t12 .. "." .. inner(k)
  else
    return __t12 .. "[" .. __k121 .. "]"
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
  local __e81 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    __e81 = "{"
  else
    __e81 = "["
  end
  local __open1 = __e81
  local __e82 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    __e82 = "}"
  else
    __e82 = "]"
  end
  local __close1 = __e82
  local __s8 = ""
  local __c7 = ""
  local ____o11 = __forms3
  local __k15 = nil
  for __k15 in next, ____o11 do
    local __v10 = ____o11[__k15]
    if number63(__k15) then
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
  local __e83 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    __e83 = " = "
  else
    __e83 = ": "
  end
  local __sep3 = __e83
  local ____o13 = pair(__forms5)
  local __k19 = nil
  for __k19 in next, ____o13 do
    local __v13 = ____o13[__k19]
    if number63(__k19) then
      local ____id46 = __v13
      local __k20 = has(____id46, 1)
      local __v14 = has(____id46, 2)
      if not string63(__k20) then
        error("Illegal key: " .. _str(__k20))
      end
      __s10 = __s10 .. __c9 .. key(__k20) .. __sep3 .. compile(__v14)
      __c9 = ", "
    end
  end
  return __s10 .. "}"
end})
setenv("%list", {_stash = true, special = function (form, comps, cond)
  local __s12 = compile(form)
  local ____x240 = comps
  local ____i26 = 0
  while ____i26 < _35(____x240) do
    local ____id48 = ____x240[____i26 + 1]
    local __k22 = has(____id48, 1)
    local __v16 = has(____id48, 2)
    __s12 = __s12 .. " for " .. compile(__k22) .. " in " .. compile(__v16)
    ____i26 = ____i26 + 1
  end
  if is63(cond) then
    __s12 = __s12 .. " if " .. compile(cond)
  end
  return "[" .. __s12 .. "]"
end})
setenv("%literal", {_stash = true, special = function (...)
  local __args18 = unstash({...})
  return apply(cat, map(compile, __args18))
end})
setenv("global", {_stash = true, special = function (x)
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    return indentation() .. "global " .. compile(x) .. "\n"
  else
    return ""
  end
end, stmt = true, tr = true})
setenv("import", {_stash = true, special = function (name, ...)
  local ____r146 = unstash({...})
  local __name11 = destash33(name, ____r146)
  local ____id51 = ____r146
  local __alias1 = cut(____id51, 0)
  local __ind17 = indentation()
  local __e84 = nil
  if hd(__alias1) == "as" then
    __e84 = __alias1[2]
  else
    __e84 = hd(__alias1)
  end
  local __as1 = __e84
  local __id52 = __as1 or __name11
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    local __s14 = __ind17 .. "import " .. compile(__name11)
    if __as1 then
      __s14 = __s14 .. " as " .. compile(__id52)
    end
    return __s14
  else
    return __ind17 .. compile({"%local", __id52, {"require", escape(__name11)}})
  end
end, stmt = true})
setenv("from", {_stash = true, special = function (name, ...)
  local ____r149 = unstash({...})
  local __name13 = destash33(name, ____r149)
  local ____id55 = ____r149
  local __imports1 = cut(____id55, 0)
  local __ind19 = indentation()
  local __id56 = __name13
  local __e85 = nil
  if hd(__imports1) == "import" then
    __e85 = tl(__imports1)
  else
    __e85 = __imports1
  end
  local __names3 = __e85
  local __names4 = mapcat(function (x)
    if x == "*" then
      return x
    else
      return compile(x)
    end
  end, __names3, ", ")
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "py" then
    return __ind19 .. "from " .. compile(__name13) .. " import " .. __names4
  else
    return ""
  end
end, stmt = true})
setenv(",", {_stash = true, special = function (...)
  local __args20 = unstash({...})
  if none63(__args20) then
    return ", "
  else
    if one63(__args20) then
      return ", " .. compile(hd(__args20))
    else
      return mapcat(compile, __args20, ", ")
    end
  end
end})
setenv(":", {_stash = true, special = function (...)
  local __args22 = unstash({...})
  if none63(__args22) then
    return ":"
  else
    if one63(__args22) then
      return ":" .. compile(hd(__args22))
    else
      return mapcat(compile, __args22, ":")
    end
  end
end})
setenv("%as", {_stash = true, special = function (form, id)
  return compile(form) .. " as " .. compile(id)
end})
setenv("%in", {_stash = true, special = function (x, l)
  return compile(x) .. " in " .. compile(l)
end})
setenv("yield", {_stash = true, special = function (...)
  local __args24 = unstash({...})
  return indentation() .. "yield " .. mapcat(compile, __args24, ", ")
end, stmt = true})
setenv("await", {_stash = true, special = function (x)
  local __e86 = nil
  if has(setenv("target", {_stash = true, toplevel = true}), "value") == "lua" then
    __e86 = ""
  else
    __e86 = "await "
  end
  local __a11 = __e86
  return __a11 .. compile(x)
end})
setenv("%b", {_stash = true, special = function (x)
  return "b" .. compile(x)
end})
setenv("%f", {_stash = true, special = function (x)
  return "f" .. compile(x)
end})
setenv("%r", {_stash = true, special = function (x)
  return "r" .. compile(x)
end})
setenv("@", {_stash = true, special = function (x)
  return indentation() .. "@" .. compile(x)
end, stmt = true})
local __exports = exports or {}
__exports.run = run
__exports["eval"] = _eval
__exports._eval = _eval
__exports.expand = expand
__exports.compile = compile
return __exports
