from .runtime import *
from .compiler import *
def __quote__macro(form=None):
  return quoted(form)

setenv("quote", macro=__quote__macro)
def __quasiquote__macro(form=None):
  return quasiexpand(form, 1)

setenv("quasiquote", macro=__quasiquote__macro)
def get_place(place=None, setfn=None):
  __place = macroexpand(place)
  if atom63(__place) or (hd(__place) == "get" and nil63(getenv("get", "place-expander")) or accessor_literal63(hd(tl(__place)))):
    def __f2(v=None):
      return ["%set", __place, v]
    return setfn(__place, __f2)
  else:
    __head = hd(__place)
    __gf = getenv(__head, "place-expander")
    if __gf:
      return apply(__gf, join([setfn], tl(__place), []))
    else:
      raise Exception(cat(L_str(__place), " is not a valid place expression"))

def __let_place__macro(vars=None, place=None, *_args, **_keys):
  ____r7 = unstash(_args, _keys)
  __vars1 = destash33(vars, ____r7)
  __place2 = destash33(place, ____r7)
  ____id1 = ____r7
  __body1 = cut(____id1, 0)
  return ["get-place", __place2, join(["fn", __vars1], __body1)]

setenv("let-place", macro=__let_place__macro)
def __define_expander__macro(name=None, handler=None):
  ____x10 = object(["setenv", ["quote", name]])
  ____x10["place-expander"] = handler
  __form1 = ____x10
  eval(__form1)
  return __form1

setenv("define-expander", macro=__define_expander__macro)
def define_setter(name=None, setter=None, setfn=None, args=None, vars=None):
  if none63(args):
    __vars2 = reverse(vars or [])
    def __f3(v=None):
      return apply(setter, join([v], __vars2, []))
    return setfn(join([name], __vars2), __f3)
  else:
    __v = hd(args)
    return define_setter(name, setter, setfn, tl(args), join([__v], vars))

def __define_setter__macro(name=None, arglist=None, *_args, **_keys):
  ____r13 = unstash(_args, _keys)
  __name1 = destash33(name, ____r13)
  __arglist1 = destash33(arglist, ____r13)
  ____id3 = ____r13
  __body3 = cut(____id3, 0)
  ____x25 = object(["setfn"])
  ____x25["rest"] = "args"
  return ["define-expander", __name1, ["fn", ____x25, ["%call", "define-setter", ["quote", __name1], join(["fn", __arglist1], __body3), "setfn", "args"]]]

setenv("define-setter", macro=__define_setter__macro)
def __set33__macro(*_args, **_keys):
  __args1 = unstash(_args, _keys)
  def __f4(__x33=None):
    ____id5 = __x33
    __lh1 = has(____id5, 0)
    __rh1 = has(____id5, 1)
    def __f5(getter=None, setter=None):
      return setter(__rh1)
    return get_place(__lh1, __f5)
  return join(["%do"], map(__f4, pair(__args1)))

setenv("set!", macro=__set33__macro)
def __f6(setfn=None, *_args, **_keys):
  ____r20 = unstash(_args, _keys)
  __setfn1 = destash33(setfn, ____r20)
  ____id7 = ____r20
  __args3 = cut(____id7, 0)
  def __f7(c=None, L_str=None, pos=None):
    return ["set!", L_str, ["cat", ["clip", L_str, 0, pos], c, ["clip", L_str, ["+", pos, 1]]]]
  return define_setter("char", __f7, __setfn1, __args3)

setenv("char", place_expander=__f6)
def __set__macro(*_args, **_keys):
  __args5 = unstash(_args, _keys)
  def __f8(__x52=None):
    ____id9 = __x52
    __lh3 = has(____id9, 0)
    __rh3 = has(____id9, 1)
    __lh3 = macroexpand(__lh3)
    if not atom63(__lh3) and hd(__lh3) == "has":
      return ["%set", join(["%get"], tl(__lh3)), __rh3]
    else:
      return ["%set", __lh3, __rh3]
  return join(["%do"], map(__f8, pair(__args5)))

setenv("set", macro=__set__macro)
def __at__macro(l=None, i=None):
  if has(setenv("target", toplevel=True), "value") == "lua" and number63(i):
    i = i + 1
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      i = ["+", i, 1]
  return ["%get", l, i]

setenv("at", macro=__at__macro)
def __wipe__macro(place=None):
  if has(setenv("target", toplevel=True), "value") == "lua":
    return ["set", place, "nil"]
  else:
    return ["%delete", place]

setenv("wipe", macro=__wipe__macro)
def __list__macro(*_args, **_keys):
  __body6 = unstash(_args, _keys)
  if one63(__body6) and (hd63(__body6, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_args"
  else:
    if L_35(__body6) > 2 and (__body6[1] == "for" and __body6[3] == "in"):
      ____id13 = __body6
      __expr2 = has(____id13, 0)
      __body7 = cut(____id13, 1)
      __comps1 = []
      __cond1 = None
      while L_35(__body7) > 2 and (__body7[0] == "for" and __body7[2] == "in"):
        ____id14 = __body7
        ___for1 = has(____id14, 0)
        __names1 = has(____id14, 1)
        ___in1 = has(____id14, 2)
        __l2 = has(____id14, 3)
        __body12 = cut(____id14, 4)
        add(__comps1, [__names1, __l2])
        __body7 = __body12
      if hd(__body7) == "if":
        ____id15 = __body7
        ___if1 = has(____id15, 0)
        __expr3 = has(____id15, 1)
        __cond1 = __expr3
      return ["%list", __expr2, __comps1, __cond1]
    else:
      __x78 = unique("x")
      __l3 = {}
      __forms1 = []
      ____o1 = __body6
      __k2 = None
      for __k2 in indices(____o1):
        __v2 = ____o1[__k2]
        if number63(__k2):
          __l3[__k2] = __v2
        else:
          add(__forms1, ["%set", ["%get", __x78, ["quote", __k2]], __v2])
      if some63(__forms1):
        return join(["let", __x78, ["object", join(["%array"], __l3)]], __forms1, [__x78])
      else:
        return join(["%array"], __l3)

setenv("list", macro=__list__macro)
def __if__macro(*_args, **_keys):
  __branches1 = unstash(_args, _keys)
  return hd(expand_if(__branches1))

setenv("if", macro=__if__macro)
def __case__macro(expr=None, *_args, **_keys):
  ____r31 = unstash(_args, _keys)
  __expr5 = destash33(expr, ____r31)
  ____id18 = ____r31
  __e12 = None
  if nil63(has(____id18, "cmp")):
    __e12 = "="
  else:
    __e12 = has(____id18, "cmp")
  __cmp1 = __e12
  __clauses1 = cut(____id18, 0)
  __x100 = unique("x")
  def __f9(_=None):
    return [__cmp1, _, __x100]
  __eq1 = __f9
  def __f10(__x102=None):
    ____id19 = __x102
    __a1 = has(____id19, 0)
    __b1 = has(____id19, 1)
    if nil63(__b1):
      return [__a1]
    else:
      if string63(__a1) or number63(__a1):
        return [__eq1(__a1), __b1]
      else:
        if list63(__a1) and hd63(__a1, "quote"):
          return [__eq1(__a1), __b1]
        else:
          if one63(__a1):
            return [__eq1(hd(__a1)), __b1]
          else:
            if L_35(__a1) > 1:
              return [join(["or"], map(__eq1, __a1)), __b1]
  __cl1 = __f10
  return ["let", __x100, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]

setenv("case", macro=__case__macro)
def __of__macro(x=None, *_args, **_keys):
  ____r35 = unstash(_args, _keys)
  __x114 = destash33(x, ____r35)
  ____id21 = ____r35
  __values1 = cut(____id21, 0)
  return join(["case", __x114, __values1, True, False], props(__values1))

setenv("of", macro=__of__macro)
def __when__macro(cond=None, *_args, **_keys):
  ____r37 = unstash(_args, _keys)
  __cond3 = destash33(cond, ____r37)
  ____id23 = ____r37
  __body9 = cut(____id23, 0)
  return ["%if", __cond3, join(["%do"], __body9)]

setenv("when", macro=__when__macro)
def __unless__macro(cond=None, *_args, **_keys):
  ____r39 = unstash(_args, _keys)
  __cond5 = destash33(cond, ____r39)
  ____id25 = ____r39
  __body111 = cut(____id25, 0)
  return ["%if", ["%not", __cond5], join(["%do"], __body111)]

setenv("unless", macro=__unless__macro)
def __obj__macro(*_args, **_keys):
  __body14 = unstash(_args, _keys)
  if one63(__body14) and (hd63(__body14, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_keys"
  else:
    if L_35(__body14) > 2 and (__body14[1] == "for" and __body14[3] == "in"):
      ____id29 = __body14
      __expr8 = has(____id29, 0)
      __body15 = cut(____id29, 1)
      __comps3 = []
      __cond7 = None
      while L_35(__body15) > 2 and (__body15[0] == "for" and __body15[2] == "in"):
        ____id30 = __body15
        ___for3 = has(____id30, 0)
        __names3 = has(____id30, 1)
        ___in3 = has(____id30, 2)
        __l5 = has(____id30, 3)
        __body141 = cut(____id30, 4)
        add(__comps3, [__names3, __l5])
        __body15 = __body141
      if hd(__body15) == "if":
        ____id31 = __body15
        ___if3 = has(____id31, 0)
        __expr9 = has(____id31, 1)
        __cond7 = __expr9
      if list63(__expr8) and hd63(__expr8, ","):
        __expr8 = join([":"], tl(__expr8))
      ____x135 = object(["%list", __expr8, __comps3, __cond7])
      ____x135["kind"] = "object"
      return ____x135
    else:
      def __f11(x=None):
        return x
      return join(["%object"], mapo(__f11, __body14))

setenv("obj", macro=__obj__macro)
def __let__macro(bs=None, *_args, **_keys):
  ____r43 = unstash(_args, _keys)
  __bs11 = destash33(bs, ____r43)
  ____id36 = ____r43
  __body17 = cut(____id36, 0)
  if atom63(__bs11) or hd63(__bs11, ","):
    return join(["let", [__bs11, hd(__body17)]], tl(__body17))
  else:
    if none63(__bs11):
      return join(["%do"], __body17)
    else:
      ____id37 = __bs11
      __lh5 = has(____id37, 0)
      __rh5 = has(____id37, 1)
      __bs21 = cut(____id37, 2)
      ____id38 = bind(__lh5, __rh5)
      __id39 = has(____id38, 0)
      __val1 = has(____id38, 1)
      __bs12 = cut(____id38, 2)
      __renames1 = []
      if not id_literal63(__id39):
        __id121 = unique(__id39)
        __renames1 = [__id39, __id121]
        __id39 = __id121
      return ["%do", ["%local", __id39, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body17)]]

setenv("let", macro=__let__macro)
def __with__macro(x=None, v=None, *_args, **_keys):
  ____r45 = unstash(_args, _keys)
  __x162 = destash33(x, ____r45)
  __v4 = destash33(v, ____r45)
  ____id41 = ____r45
  __body19 = cut(____id41, 0)
  if __v4 == "as":
    return join(["%with", ["%as", __x162, hd(__body19)]], tl(__body19))
  else:
    if not atom63(__x162) or has(__body19, "async"):
      return join(["%with", __x162, __v4], __body19)
    else:
      return join(["let", [__x162, __v4]], __body19, [__x162])

setenv("with", macro=__with__macro)
def __let_when__macro(x=None, v=None, *_args, **_keys):
  ____r47 = unstash(_args, _keys)
  __x176 = destash33(x, ____r47)
  __v6 = destash33(v, ____r47)
  ____id43 = ____r47
  __body21 = cut(____id43, 0)
  __y1 = unique("y")
  return ["let", __y1, __v6, ["when", ["yes", __y1], join(["let", [__x176, __y1]], __body21)]]

setenv("let-when", macro=__let_when__macro)
def __define_macro__macro(name=None, args=None, *_args, **_keys):
  ____r49 = unstash(_args, _keys)
  __name3 = destash33(name, ____r49)
  __args7 = destash33(args, ____r49)
  ____id46 = ____r49
  __body23 = cut(____id46, 0)
  __id47 = unique(cat(__name3, "--macro"))
  ____x189 = object(["setenv", ["quote", __name3]])
  ____x189["macro"] = __id47
  __form3 = ["do", join(["define", __id47, __args7], __body23), ____x189]
  eval(__form3)
  return __form3

setenv("define-macro", macro=__define_macro__macro)
def __define_special__macro(name=None, args=None, *_args, **_keys):
  ____r51 = unstash(_args, _keys)
  __name5 = destash33(name, ____r51)
  __args9 = destash33(args, ____r51)
  ____id50 = ____r51
  __body25 = cut(____id50, 0)
  __id51 = unique(cat(__name5, "--special"))
  ____x198 = object(["setenv", ["quote", __name5]])
  ____x198["special"] = __id51
  __form5 = ["do", join(["define", __id51, __args9], __body25), join(____x198, props(__body25))]
  eval(__form5)
  return __form5

setenv("define-special", macro=__define_special__macro)
def __define_symbol__macro(name=None, expansion=None):
  setenv(name, symbol=expansion)
  ____x203 = object(["setenv", ["quote", name]])
  ____x203["symbol"] = ["quote", expansion]
  return ____x203

setenv("define-symbol", macro=__define_symbol__macro)
def __define_reader__macro(__x212=None, *_args, **_keys):
  ____r55 = unstash(_args, _keys)
  ____x212 = destash33(__x212, ____r55)
  ____id54 = ____x212
  __char1 = has(____id54, 0)
  __s1 = has(____id54, 1)
  ____id55 = ____r55
  __body27 = cut(____id55, 0)
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s1]], __body27)]

setenv("define-reader", macro=__define_reader__macro)
def __define__macro(name=None, x=None, *_args, **_keys):
  ____r57 = unstash(_args, _keys)
  __name7 = destash33(name, ____r57)
  __x221 = destash33(x, ____r57)
  ____id57 = ____r57
  __body29 = cut(____id57, 0)
  setenv(__name7, variable=True)
  if some63(__body29):
    return join(["%local-function", __name7], bind42(__x221, __body29), props(__body29))
  else:
    return join(["%local", __name7, __x221], props(__body29))

setenv("define", macro=__define__macro)
def __define_global__macro(name=None, x=None, *_args, **_keys):
  ____r59 = unstash(_args, _keys)
  __name9 = destash33(name, ____r59)
  __x228 = destash33(x, ____r59)
  ____id59 = ____r59
  __body31 = cut(____id59, 0)
  setenv(__name9, toplevel=True, variable=True)
  if some63(__body31):
    return join(["%global-function", __name9], bind42(__x228, __body31), props(__body31))
  else:
    return join(["set", __name9, __x228], props(__body31))

setenv("define-global", macro=__define_global__macro)
def __get_value__macro(x=None):
  ____x235 = object(["setenv", x])
  ____x235["toplevel"] = True
  return ["has", ____x235, ["quote", "value"]]

setenv("get-value", macro=__get_value__macro)
def __define_constant__macro(name=None, x=None):
  ____x246 = object(["setenv", ["quote", name]])
  ____x246["toplevel"] = True
  ____x246["value"] = either(x, ["get-value", ["quote", name]])
  return ["%do", ____x246, ["define-symbol", name, ["get-value", ["quote", name]]]]

setenv("define-constant", macro=__define_constant__macro)
def __define_variable__macro(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]

setenv("define-variable", macro=__define_variable__macro)
def __after__macro(x=None, *_args, **_keys):
  ____r68 = unstash(_args, _keys)
  __x275 = destash33(x, ____r68)
  ____id61 = ____r68
  __body33 = cut(____id61, 0)
  __ok1 = unique("ok")
  __r69 = unique("r")
  ____x276 = object(["target", ["try", __x275, join(["finally"], __body33)]])
  ____x276["lua"] = join(["let", [[__ok1, __r69], ["guard", __x275]]], __body33, [["if", __ok1, __r69, ["throw", __r69]]])
  return ____x276

setenv("after", macro=__after__macro)
def __with_frame__macro(*_args, **_keys):
  __body35 = unstash(_args, _keys)
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body35), ["drop", "environment"]]]

setenv("with-frame", macro=__with_frame__macro)
def __with_values__macro(*_args, **_keys):
  __body37 = unstash(_args, _keys)
  __forms3 = []
  ____o3 = __body37
  __k5 = None
  for __k5 in indices(____o3):
    __v8 = ____o3[__k5]
    if not number63(__k5):
      ____x304 = object(["setenv", ["quote", __k5]])
      ____x304["value"] = __v8
      add(__forms3, ____x304)
  return join(["with-frame"], __forms3)

setenv("with-values", macro=__with_values__macro)
def __with_bindings__macro(__x312=None, *_args, **_keys):
  ____r71 = unstash(_args, _keys)
  ____x312 = destash33(__x312, ____r71)
  ____id64 = ____x312
  __names5 = has(____id64, 0)
  ____id65 = ____r71
  __body39 = cut(____id65, 0)
  __x313 = unique("x")
  ____x316 = object(["setenv", __x313])
  ____x316["variable"] = True
  return join(["with-frame", ["each", __x313, __names5, ____x316]], __body39)

setenv("with-bindings", macro=__with_bindings__macro)
def __let_macro__macro(definitions=None, *_args, **_keys):
  ____r76 = unstash(_args, _keys)
  __definitions1 = destash33(definitions, ____r76)
  ____id67 = ____r76
  __body41 = cut(____id67, 0)
  add(environment, {})
  ____r78 = None
  try:
    def __f12(m=None):
      return macroexpand(join(["define-macro"], m))
    map(__f12, __definitions1)
    ____r78 = join(["%do"], macroexpand(__body41))
  finally:
    drop(environment)
  return ____r78

setenv("let-macro", macro=__let_macro__macro)
def __let_symbol__macro(expansions=None, *_args, **_keys):
  ____r84 = unstash(_args, _keys)
  __expansions1 = destash33(expansions, ____r84)
  ____id70 = ____r84
  __body43 = cut(____id70, 0)
  add(environment, {})
  ____r86 = None
  try:
    def __f13(__x326=None):
      ____id71 = __x326
      __name11 = has(____id71, 0)
      __exp1 = has(____id71, 1)
      return macroexpand(["define-symbol", __name11, __exp1])
    map(__f13, pair(__expansions1))
    ____r86 = join(["%do"], macroexpand(__body43))
  finally:
    drop(environment)
  return ____r86

setenv("let-symbol", macro=__let_symbol__macro)
def __let_unique__macro(names=None, *_args, **_keys):
  ____r90 = unstash(_args, _keys)
  __names7 = destash33(names, ____r90)
  ____id73 = ____r90
  __body45 = cut(____id73, 0)
  def __f14(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f14, __names7)
  return join(["let", apply(join, __bs3)], __body45)

setenv("let-unique", macro=__let_unique__macro)
def __fn__macro(args=None, *_args, **_keys):
  ____r93 = unstash(_args, _keys)
  __args11 = destash33(args, ____r93)
  ____id75 = ____r93
  __body47 = cut(____id75, 0)
  return join(["%function"], bind42(__args11, __body47), props(__body47))

setenv("fn", macro=__fn__macro)
def __apply__macro(f=None, *_args, **_keys):
  ____r95 = unstash(_args, _keys)
  __f1 = destash33(f, ____r95)
  ____id77 = ____r95
  __args13 = cut(____id77, 0)
  if L_35(__args13) > 1:
    return ["%call", "apply", __f1, ["join", join(["list"], almost(__args13)), last(__args13), join(["list"], props(__args13))]]
  else:
    if props63(__args13):
      return ["%call", "apply", __f1, join(["join"], __args13, [join(["list"], props(__args13))])]
    else:
      return join(["%call", "apply", __f1], __args13)

setenv("apply", macro=__apply__macro)
def __guard__macro(expr=None):
  ____x390 = object(["target", [["%function", join(), ["%try", ["list", True, expr]]]]])
  ____x402 = object(["obj"])
  ____x402["stack"] = [["idx", "debug", "traceback"]]
  ____x402["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
  ____x390["lua"] = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x402]]]]
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x390]

setenv("guard", macro=__guard__macro)
def __each__macro(x=None, t=None, *_args, **_keys):
  ____r99 = unstash(_args, _keys)
  __x430 = destash33(x, ____r99)
  __t1 = destash33(t, ____r99)
  ____id80 = ____r99
  __body49 = cut(____id80, 0)
  __o5 = unique("o")
  __n5 = unique("n")
  __i5 = unique("i")
  __e13 = None
  if atom63(__x430):
    __e13 = [__i5, __x430]
  else:
    __e14 = None
    if L_35(__x430) > 1:
      __e14 = __x430
    else:
      __e14 = [__i5, hd(__x430)]
    __e13 = __e14
  ____id81 = __e13
  __k7 = has(____id81, 0)
  __v10 = has(____id81, 1)
  ____x436 = object(["target", __o5])
  ____x436["py"] = ["indices", __o5]
  __e15 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e15 = __body49
  else:
    __e15 = [join(["let", __k7, ["if", ["numeric?", __k7], ["parseInt", __k7], __k7]], __body49)]
  return ["let", [__o5, __t1, __k7, "nil"], join(["%for", ____x436, __k7], props(__body49), [join(["let", [__v10, ["%get", __o5, __k7]]], __e15)])]

setenv("each", macro=__each__macro)
def __for__macro(i=None, to=None, *_args, **_keys):
  ____r101 = unstash(_args, _keys)
  __i7 = destash33(i, ____r101)
  __to1 = destash33(to, ____r101)
  ____id83 = ____r101
  __body51 = cut(____id83, 0)
  if __to1 == "in":
    return join(["%for", hd(__body51), __i7, join(["%do"], tl(__body51))], props(__body51))
  else:
    return ["let", __i7, 0, join(["while", ["<", __i7, __to1]], __body51, [["inc", __i7]])]

setenv("for", macro=__for__macro)
def __step__macro(v=None, t=None, *_args, **_keys):
  ____r103 = unstash(_args, _keys)
  __v12 = destash33(v, ____r103)
  __t3 = destash33(t, ____r103)
  ____id85 = ____r103
  __body53 = cut(____id85, 0)
  __x471 = unique("x")
  __i9 = unique("i")
  return ["let", [__x471, __t3], ["for", __i9, ["#", __x471], join(["let", [__v12, ["at", __x471, __i9]]], __body53)]]

setenv("step", macro=__step__macro)
def __set_of__macro(*_args, **_keys):
  __xs1 = unstash(_args, _keys)
  __l7 = {}
  ____o7 = __xs1
  ____i11 = None
  for ____i11 in indices(____o7):
    __x482 = ____o7[____i11]
    __l7[__x482] = True
  return join(["obj"], __l7)

setenv("set-of", macro=__set_of__macro)
def __target63__macro(x=None):
  return ["=", "target", x]

setenv("target?", macro=__target63__macro)
def __target__macro(*_args, **_keys):
  __clauses3 = unstash(_args, _keys)
  if has63(__clauses3, has(setenv("target", toplevel=True), "value")):
    return __clauses3[has(setenv("target", toplevel=True), "value")]
  else:
    return hd(__clauses3)

setenv("target", macro=__target__macro)
def __language__macro():
  return ["quote", has(setenv("target", toplevel=True), "value")]

setenv("language", macro=__language__macro)
def __join33__macro(a=None, *_args, **_keys):
  ____r109 = unstash(_args, _keys)
  __a3 = destash33(a, ____r109)
  ____id87 = ____r109
  __bs5 = cut(____id87, 0)
  return ["set", __a3, join(["join", __a3], __bs5)]

setenv("join!", macro=__join33__macro)
def __cat33__macro(a=None, *_args, **_keys):
  ____r111 = unstash(_args, _keys)
  __a5 = destash33(a, ____r111)
  ____id89 = ____r111
  __bs7 = cut(____id89, 0)
  return ["set", __a5, join(["cat", __a5], __bs7)]

setenv("cat!", macro=__cat33__macro)
def __inc__macro(n=None, by=None):
  __e16 = None
  if nil63(by):
    __e16 = 1
  else:
    __e16 = by
  return ["set", n, ["+", n, __e16]]

setenv("inc", macro=__inc__macro)
def __dec__macro(n=None, by=None):
  __e17 = None
  if nil63(by):
    __e17 = 1
  else:
    __e17 = by
  return ["set", n, ["-", n, __e17]]

setenv("dec", macro=__dec__macro)
def __with_indent__macro(form=None):
  __x512 = unique("x")
  return ["%do", ["inc", "indent-level"], ["with", __x512, form, ["dec", "indent-level"]]]

setenv("with-indent", macro=__with_indent__macro)
def __export__macro(*_args, **_keys):
  __names9 = unstash(_args, _keys)
  def __f15(k=None):
    if k == compile(k):
      return ["%set", ["idx", "exports", k], k]
    else:
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]]
  __forms5 = map(__f15, __names9)
  if has(setenv("target", toplevel=True), "value") == "js":
    return join(["%do"], __forms5)
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]])

setenv("export", macro=__export__macro)
def __when_compiling__macro(*_args, **_keys):
  __body55 = unstash(_args, _keys)
  return eval(join(["%do"], __body55))

setenv("when-compiling", macro=__when_compiling__macro)
def __during_compilation__macro(*_args, **_keys):
  __body57 = unstash(_args, _keys)
  __form7 = join(["%do"], __body57)
  eval(__form7)
  return __form7

setenv("during-compilation", macro=__during_compilation__macro)
def __def__macro(name=None, *_args, **_keys):
  ____r121 = unstash(_args, _keys)
  __name13 = destash33(name, ____r121)
  ____id91 = ____r121
  __body59 = cut(____id91, 0)
  return join(["define-global", __name13], __body59)

setenv("def", macro=__def__macro)
def __mac__macro(name=None, *_args, **_keys):
  ____r123 = unstash(_args, _keys)
  __name15 = destash33(name, ____r123)
  ____id93 = ____r123
  __body61 = cut(____id93, 0)
  return join(["define-macro", __name15], __body61)

setenv("mac", macro=__mac__macro)
def __defconst__macro(name=None, *_args, **_keys):
  ____r125 = unstash(_args, _keys)
  __name17 = destash33(name, ____r125)
  ____id95 = ____r125
  __value1 = cut(____id95, 0)
  return join(["def", __name17], __value1)

setenv("defconst", macro=__defconst__macro)
def __undefined63__macro(name=None):
  ____x570 = object(["target"])
  ____x570["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x570["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x570["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x570

setenv("undefined?", macro=__undefined63__macro)
def __defvar__macro(name=None, *_args, **_keys):
  ____r129 = unstash(_args, _keys)
  __name19 = destash33(name, ____r129)
  ____id97 = ____r129
  __value3 = cut(____id97, 0)
  ____x587 = object(["target"])
  ____x587["py"] = ["global", __name19]
  return ["when", ["undefined?", __name19], ____x587, join(["defconst", __name19], __value3)]

setenv("defvar", macro=__defvar__macro)
def __async__macro(keyword=None, *_args, **_keys):
  ____r131 = unstash(_args, _keys)
  __keyword1 = destash33(keyword, ____r131)
  ____id99 = ____r131
  __body63 = cut(____id99, 0)
  ____x592 = object([__keyword1])
  ____x592["async"] = True
  return join(____x592, __body63)

setenv("async", macro=__async__macro)
def __L_37read_from_file__macro(name=None):
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]]

setenv("%read-from-file", macro=__L_37read_from_file__macro)
def __the__macro(name=None):
  return ["getenv", ["quote", name], ["quote", "value"]]

setenv("the", macro=__the__macro)
def __cat__macro(a=None, *_args, **_keys):
  ____r137 = unstash(_args, _keys)
  __a7 = destash33(a, ____r137)
  ____id101 = ____r137
  __bs9 = cut(____id101, 0)
  if nil63(__a7):
    return ""
  else:
    if none63(__bs9):
      return __a7
    else:
      if one63(__bs9):
        ____x617 = object(["target", join(["%cat", __a7], __bs9)])
        ____x617["py"] = join(["%call", "cat", __a7], __bs9)
        return ____x617
      else:
        ____x620 = object(["target", ["%cat", __a7, join(["cat"], __bs9)]])
        ____x620["py"] = join(["%call", "cat", __a7], __bs9)
        return ____x620

setenv("cat", macro=__cat__macro)
def __L_43__macro(*_args, **_keys):
  __args15 = unstash(_args, _keys)
  if none63(__args15):
    return 0
  else:
    if one63(__args15):
      return hd(__args15)
    else:
      return join(["%add"], __args15)

setenv("+", macro=__L_43__macro)
def __L___macro(*_args, **_keys):
  __args17 = unstash(_args, _keys)
  if none63(__args17):
    return 0
  else:
    if one63(__args17):
      return ["%unm", hd(__args17)]
    else:
      return join(["%sub"], __args17)

setenv("-", macro=__L___macro)
def __L_42__macro(*_args, **_keys):
  __args19 = unstash(_args, _keys)
  if none63(__args19):
    return 1
  else:
    if one63(__args19):
      return hd(__args19)
    else:
      return join(["%mul"], __args19)

setenv("*", macro=__L_42__macro)
def __L_47__macro(*_args, **_keys):
  __args21 = unstash(_args, _keys)
  if none63(__args21):
    return 1
  else:
    if one63(__args21):
      return hd(__args21)
    else:
      return join(["%div"], __args21)

setenv("/", macro=__L_47__macro)
def __L_4747__macro(*_args, **_keys):
  __args23 = unstash(_args, _keys)
  if none63(__args23):
    return 1
  else:
    if one63(__args23):
      return hd(__args23)
    else:
      return join(["%idiv"], __args23)

setenv("//", macro=__L_4747__macro)
def __L_37__macro(*_args, **_keys):
  __args25 = unstash(_args, _keys)
  if none63(__args25):
    return 0
  else:
    if one63(__args25):
      return hd(__args25)
    else:
      return join(["%mod"], __args25)

setenv("%", macro=__L_37__macro)
def __L_60__macro(a=None, *_args, **_keys):
  ____r139 = unstash(_args, _keys)
  __a9 = destash33(a, ____r139)
  ____id103 = ____r139
  __bs111 = cut(____id103, 0)
  if none63(__bs111):
    return True
  else:
    if one63(__bs111):
      return join(["%lt", __a9], __bs111)
    else:
      return ["%and", ["%lt", __a9, hd(__bs111)], join(["<"], __bs111)]

setenv("<", macro=__L_60__macro)
def __L_6061__macro(a=None, *_args, **_keys):
  ____r141 = unstash(_args, _keys)
  __a11 = destash33(a, ____r141)
  ____id105 = ____r141
  __bs13 = cut(____id105, 0)
  if none63(__bs13):
    return True
  else:
    if one63(__bs13):
      return join(["%le", __a11], __bs13)
    else:
      return ["%and", ["%le", __a11, hd(__bs13)], join(["<="], __bs13)]

setenv("<=", macro=__L_6061__macro)
def __L_61__macro(a=None, *_args, **_keys):
  ____r143 = unstash(_args, _keys)
  __a13 = destash33(a, ____r143)
  ____id107 = ____r143
  __bs15 = cut(____id107, 0)
  if none63(__bs15):
    return True
  else:
    if one63(__bs15):
      return join(["%eq", __a13], __bs15)
    else:
      return ["%and", ["%eq", __a13, hd(__bs15)], join(["="], __bs15)]

setenv("=", macro=__L_61__macro)
def __L_6261__macro(a=None, *_args, **_keys):
  ____r145 = unstash(_args, _keys)
  __a15 = destash33(a, ____r145)
  ____id109 = ____r145
  __bs17 = cut(____id109, 0)
  if none63(__bs17):
    return True
  else:
    if one63(__bs17):
      return join(["%ge", __a15], __bs17)
    else:
      return ["%and", ["%ge", __a15, hd(__bs17)], join([">="], __bs17)]

setenv(">=", macro=__L_6261__macro)
def __L_62__macro(a=None, *_args, **_keys):
  ____r147 = unstash(_args, _keys)
  __a17 = destash33(a, ____r147)
  ____id1111 = ____r147
  __bs19 = cut(____id1111, 0)
  if none63(__bs19):
    return True
  else:
    if one63(__bs19):
      return join(["%gt", __a17], __bs19)
    else:
      return ["%and", ["%gt", __a17, hd(__bs19)], join([">"], __bs19)]

setenv(">", macro=__L_62__macro)
def __not__macro(*_args, **_keys):
  __args27 = unstash(_args, _keys)
  if none63(__args27):
    return False
  else:
    if one63(__args27):
      return join(["%not"], __args27)
    else:
      return ["%and", ["%not", hd(__args27)], join(["not"], tl(__args27))]

setenv("not", macro=__not__macro)
def __and__macro(a=None, *_args, **_keys):
  ____r149 = unstash(_args, _keys)
  __a19 = destash33(a, ____r149)
  ____id113 = ____r149
  __bs211 = cut(____id113, 0)
  if nil63(__a19):
    return True
  else:
    if none63(__bs211):
      return __a19
    else:
      if one63(__bs211):
        return join(["%and", __a19], __bs211)
      else:
        return ["%and", __a19, join(["and"], __bs211)]

setenv("and", macro=__and__macro)
def __or__macro(a=None, *_args, **_keys):
  ____r151 = unstash(_args, _keys)
  __a21 = destash33(a, ____r151)
  ____id115 = ____r151
  __bs23 = cut(____id115, 0)
  if nil63(__a21):
    return False
  else:
    if none63(__bs23):
      return __a21
    else:
      if one63(__bs23):
        return join(["%or", __a21], __bs23)
      else:
        return ["%or", __a21, join(["or"], __bs23)]

setenv("or", macro=__or__macro)
def __break__macro(*_args, **_keys):
  __args29 = unstash(_args, _keys)
  return join(["%break"], __args29)

setenv("break", macro=__break__macro)
def __return__macro(*_args, **_keys):
  __args31 = unstash(_args, _keys)
  return join(["%return"], __args31)

setenv("return", macro=__return__macro)
def __while__macro(c=None, *_args, **_keys):
  ____r153 = unstash(_args, _keys)
  __c1 = destash33(c, ____r153)
  ____id117 = ____r153
  __body65 = cut(____id117, 0)
  return join(["%while", __c1], __body65)

setenv("while", macro=__while__macro)
def __do__macro(*_args, **_keys):
  __body67 = unstash(_args, _keys)
  return join(["%do"], __body67)

setenv("do", macro=__do__macro)
def __get__macro(*_args, **_keys):
  __args33 = unstash(_args, _keys)
  return join(["%get"], __args33)

setenv("get", macro=__get__macro)
def __idx__macro(*_args, **_keys):
  __args35 = unstash(_args, _keys)
  return join(["%idx"], __args35)

setenv("idx", macro=__idx__macro)
def __new__macro(*_args, **_keys):
  __args37 = unstash(_args, _keys)
  return join(["%new"], __args37)

setenv("new", macro=__new__macro)
def __typeof__macro(*_args, **_keys):
  __args39 = unstash(_args, _keys)
  return join(["%typeof"], __args39)

setenv("typeof", macro=__typeof__macro)
def __error__macro(*_args, **_keys):
  __args41 = unstash(_args, _keys)
  return join(["%error"], __args41)

setenv("error", macro=__error__macro)
def __throw__macro(*_args, **_keys):
  __args43 = unstash(_args, _keys)
  return join(["%throw"], __args43)

setenv("throw", macro=__throw__macro)
def __raise__macro(*_args, **_keys):
  __args45 = unstash(_args, _keys)
  return join(["%throw"], __args45)

setenv("raise", macro=__raise__macro)
def __is__macro(*_args, **_keys):
  __args47 = unstash(_args, _keys)
  ____x749 = object(["target", join(["="], __args47)])
  ____x749["py"] = join(["%is"], __args47)
  return ____x749

setenv("is", macro=__is__macro)
def __in__macro(*_args, **_keys):
  __args49 = unstash(_args, _keys)
  return join(["%in"], __args49)

setenv("in", macro=__in__macro)
def __as__macro(*_args, **_keys):
  __args51 = unstash(_args, _keys)
  return join(["%as"], __args51)

setenv("as", macro=__as__macro)
def __L_37expand_case__macro(x=None, *_args, **_keys):
  ____r155 = unstash(_args, _keys)
  __x764 = destash33(x, ____r155)
  ____id120 = ____r155
  __body69 = cut(____id120, 0)
  __e18 = None
  if atom63(__x764):
    __e18 = [__x764]
  else:
    __e18 = __x764
  ____id1211 = __e18
  __a23 = has(____id1211, 0)
  __bs25 = cut(____id1211, 1)
  __e19 = None
  if none63(__bs25):
    __e19 = [["%literal"]]
  else:
    __e19 = __bs25
  return join(["%block", __a23], __e19, __body69)

setenv("%expand-case", macro=__L_37expand_case__macro)
def __L_37cases__macro(*_args, **_keys):
  __args53 = unstash(_args, _keys)
  if none63(__args53):
    return ["do"]
  else:
    if one63(__args53):
      return join(["%expand-case"], hd(__args53))
    else:
      __r158 = unique("r")
      def __f16(__x783=None):
        ____id123 = __x783
        __x784 = has(____id123, 0)
        __body71 = cut(____id123, 1)
        return ["%expand-case", __x784, ["%set", __r158, join(["%do"], __body71)]]
      return join(["with", __r158, "nil"], map(__f16, almost(__args53)), [join(["%expand-case"], last(__args53))])

setenv("%cases", macro=__L_37cases__macro)
def __try__macro(x=None, *_args, **_keys):
  ____r161 = unstash(_args, _keys)
  __x804 = destash33(x, ____r161)
  ____id128 = ____r161
  __cases1 = cut(____id128, 0)
  __fin1 = ["finally"]
  ____o9 = __cases1
  ____i14 = None
  for ____i14 in indices(____o9):
    __x806 = ____o9[____i14]
    if hd63(__x806, "finally"):
      __fin1 = __x806
  __forms7 = []
  ____x809 = __cases1
  ____i15 = 0
  while ____i15 < L_35(____x809):
    ____id129 = ____x809[____i15]
    __x810 = has(____id129, 0)
    __body75 = cut(____id129, 1)
    if __x810 == "finally":
      pass
    else:
      if __x810 == "except" and has(__body75, 1) == "as":
        ____id130 = __body75
        __kind2 = has(____id130, 0)
        ___1 = has(____id130, 1)
        __name21 = has(____id130, 2)
        __body76 = cut(____id130, 3)
        add(__forms7, join([[__x810, ["%as", __kind2, __name21]]], __body76))
      else:
        if __x810 == "except":
          ____id131 = __body75
          __kind3 = has(____id131, 0)
          __body77 = cut(____id131, 1)
          add(__forms7, join([[__x810, __kind3]], __body77))
        else:
          raise Exception("Unknown try clause")
    ____i15 = ____i15 + 1
  return join(["%cases", ["try", __x804]], __forms7, [__fin1])

setenv("try", macro=__try__macro)
def __errsafe__macro(x=None, L_else=None):
  if nil63(L_else):
    L_else = "nil"
  __ok7 = unique("ok")
  __v14 = unique("v")
  return ["let", [[__ok7, __v14], ["guard", x]], ["if", __ok7, __v14, L_else]]

setenv("errsafe", macro=__errsafe__macro)
def __dbg__macro():
  ____x833 = object(["target", ["do"]])
  ____x833["py"] = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]]
  return ____x833

setenv("dbg", macro=__dbg__macro)
def __see__macro(form=None):
  __form9 = expand(form)
  L_print(compile(expand(["%set", "lumen-result", __form9])))
  return __form9

setenv("see", macro=__see__macro)
