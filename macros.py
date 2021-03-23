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
  if atom63(__place) or (hd63(__place, "%get") and nil63(getenv("%get", "place-expander")) or (hd63(__place, "%idx") and nil63(getenv("%idx", "place-expander")) or accessor_literal63(hd(tl(__place))))):
    def __f3(v=None):
      return ["%set", __place, v]
    return setfn(__place, __f3)
  else:
    if hd63(__place, "has") and nil63(getenv("has", "place-expander")):
      def __f2(v=None):
        return ["%set", join(["%get"], tl(__place)), v]
      return setfn(__place, __f2)
    else:
      __head = hd(__place)
      __gf = getenv(__head, "place-expander")
      if __gf:
        return apply(__gf, join([setfn], tl(__place), []))
      else:
        raise Exception(cat(L_str(__place), " is not a valid place expression: no place-expander for ", __head))

def __let_place__macro(vars=None, place=None, *_args, **_keys):
  ____r8 = unstash(_args, _keys)
  __vars1 = destash33(vars, ____r8)
  __place2 = destash33(place, ____r8)
  ____id1 = ____r8
  __body1 = cut(____id1, 0)
  return ["get-place", __place2, join(["fn", __vars1], __body1)]

setenv("let-place", macro=__let_place__macro)
def __define_expander__macro(name=None, handler=None):
  ____x12 = object(["setenv", ["quote", name]])
  ____x12["place-expander"] = handler
  __form1 = ____x12
  eval(__form1)
  return __form1

setenv("define-expander", macro=__define_expander__macro)
def define_setter(name=None, setter=None, setfn=None, args=None, vars=None):
  if none63(args):
    __vars2 = reverse(vars or [])
    def __f4(v=None):
      return apply(setter, join([v], __vars2, []))
    return setfn(join([name], __vars2), __f4)
  else:
    __v = hd(args)
    return define_setter(name, setter, setfn, tl(args), join([__v], vars))

def __define_setter__macro(name=None, arglist=None, *_args, **_keys):
  ____r14 = unstash(_args, _keys)
  __name1 = destash33(name, ____r14)
  __arglist1 = destash33(arglist, ____r14)
  ____id3 = ____r14
  __body3 = cut(____id3, 0)
  ____x27 = object(["setfn"])
  ____x27["rest"] = "args"
  return ["define-expander", __name1, ["fn", ____x27, ["%call", "define-setter", ["quote", __name1], join(["fn", __arglist1], __body3), "setfn", "args"]]]

setenv("define-setter", macro=__define_setter__macro)
def __set__macro(*_args, **_keys):
  __args1 = unstash(_args, _keys)
  def __f5(__x35=None):
    ____id5 = __x35
    __lh1 = has(____id5, 0)
    __rh1 = has(____id5, 1)
    def __f6(getter=None, setter=None):
      return setter(__rh1)
    return get_place(__lh1, __f6)
  return join(["%do"], map(__f5, pair(__args1)))

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
      ____id9 = __body6
      __expr2 = has(____id9, 0)
      __body7 = cut(____id9, 1)
      __comps1 = []
      __cond1 = None
      while L_35(__body7) > 2 and (__body7[0] == "for" and __body7[2] == "in"):
        ____id10 = __body7
        ___for1 = has(____id10, 0)
        __names1 = has(____id10, 1)
        ___in1 = has(____id10, 2)
        __l2 = has(____id10, 3)
        __body12 = cut(____id10, 4)
        add(__comps1, [__names1, __l2])
        __body7 = __body12
      if hd(__body7) == "if":
        ____id11 = __body7
        ___if1 = has(____id11, 0)
        __expr3 = has(____id11, 1)
        __cond1 = __expr3
      return ["%list", __expr2, __comps1, __cond1]
    else:
      __x58 = unique("x")
      __l3 = {}
      __forms1 = []
      ____o1 = __body6
      __k2 = None
      for __k2 in indices(____o1):
        __v2 = ____o1[__k2]
        if number63(__k2):
          __l3[__k2] = __v2
        else:
          add(__forms1, ["%set", ["%get", __x58, ["quote", __k2]], __v2])
      if some63(__forms1):
        return join(["let", __x58, ["object", join(["%array"], __l3)]], __forms1, [__x58])
      else:
        return join(["%array"], __l3)

setenv("list", macro=__list__macro)
def __if__macro(*_args, **_keys):
  __branches1 = unstash(_args, _keys)
  return hd(expand_if(__branches1))

setenv("if", macro=__if__macro)
def __case__macro(expr=None, *_args, **_keys):
  ____r26 = unstash(_args, _keys)
  __expr5 = destash33(expr, ____r26)
  ____id14 = ____r26
  __e12 = None
  if nil63(has(____id14, "cmp")):
    __e12 = "="
  else:
    __e12 = has(____id14, "cmp")
  __cmp1 = __e12
  __clauses1 = cut(____id14, 0)
  __x80 = unique("x")
  def __f7(_=None):
    return [__cmp1, _, __x80]
  __eq1 = __f7
  def __f8(__x82=None):
    ____id15 = __x82
    __a1 = has(____id15, 0)
    __b1 = has(____id15, 1)
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
  __cl1 = __f8
  return ["let", __x80, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]

setenv("case", macro=__case__macro)
def __of__macro(x=None, *_args, **_keys):
  ____r30 = unstash(_args, _keys)
  __x94 = destash33(x, ____r30)
  ____id17 = ____r30
  __values1 = cut(____id17, 0)
  return join(["case", __x94, __values1, True, False], props(__values1))

setenv("of", macro=__of__macro)
def __when__macro(cond=None, *_args, **_keys):
  ____r32 = unstash(_args, _keys)
  __cond3 = destash33(cond, ____r32)
  ____id19 = ____r32
  __body9 = cut(____id19, 0)
  return ["%if", __cond3, join(["%do"], __body9)]

setenv("when", macro=__when__macro)
def __unless__macro(cond=None, *_args, **_keys):
  ____r34 = unstash(_args, _keys)
  __cond5 = destash33(cond, ____r34)
  ____id21 = ____r34
  __body111 = cut(____id21, 0)
  return ["%if", ["%not", __cond5], join(["%do"], __body111)]

setenv("unless", macro=__unless__macro)
def __obj__macro(*_args, **_keys):
  __body14 = unstash(_args, _keys)
  if one63(__body14) and (hd63(__body14, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_keys"
  else:
    if L_35(__body14) > 2 and (__body14[1] == "for" and __body14[3] == "in"):
      ____id25 = __body14
      __expr8 = has(____id25, 0)
      __body15 = cut(____id25, 1)
      __comps3 = []
      __cond7 = None
      while L_35(__body15) > 2 and (__body15[0] == "for" and __body15[2] == "in"):
        ____id26 = __body15
        ___for3 = has(____id26, 0)
        __names3 = has(____id26, 1)
        ___in3 = has(____id26, 2)
        __l5 = has(____id26, 3)
        __body141 = cut(____id26, 4)
        add(__comps3, [__names3, __l5])
        __body15 = __body141
      if hd(__body15) == "if":
        ____id27 = __body15
        ___if3 = has(____id27, 0)
        __expr9 = has(____id27, 1)
        __cond7 = __expr9
      if list63(__expr8) and hd63(__expr8, ","):
        __expr8 = join([":"], tl(__expr8))
      ____x115 = object(["%list", __expr8, __comps3, __cond7])
      ____x115["kind"] = "object"
      return ____x115
    else:
      def __f9(x=None):
        return x
      return join(["%object"], mapo(__f9, __body14))

setenv("obj", macro=__obj__macro)
def __let__macro(bs=None, *_args, **_keys):
  ____r38 = unstash(_args, _keys)
  __bs11 = destash33(bs, ____r38)
  ____id32 = ____r38
  __body17 = cut(____id32, 0)
  if atom63(__bs11) or hd63(__bs11, ","):
    return join(["let", [__bs11, hd(__body17)]], tl(__body17))
  else:
    if none63(__bs11):
      return join(["%do"], __body17)
    else:
      ____id33 = __bs11
      __lh3 = has(____id33, 0)
      __rh3 = has(____id33, 1)
      __bs21 = cut(____id33, 2)
      ____id34 = bind(__lh3, __rh3)
      __id35 = has(____id34, 0)
      __val1 = has(____id34, 1)
      __bs12 = cut(____id34, 2)
      __renames1 = []
      if not id_literal63(__id35):
        __id121 = unique(__id35)
        __renames1 = [__id35, __id121]
        __id35 = __id121
      return ["%do", ["%local", __id35, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body17)]]

setenv("let", macro=__let__macro)
def __with__macro(x=None, v=None, *_args, **_keys):
  ____r40 = unstash(_args, _keys)
  __x142 = destash33(x, ____r40)
  __v4 = destash33(v, ____r40)
  ____id37 = ____r40
  __body19 = cut(____id37, 0)
  if __v4 == "as":
    return join(["%with", ["%as", __x142, hd(__body19)]], tl(__body19))
  else:
    if not atom63(__x142) or has(__body19, "async"):
      return join(["%with", __x142, __v4], __body19)
    else:
      return join(["let", [__x142, __v4]], __body19, [__x142])

setenv("with", macro=__with__macro)
def __let_when__macro(x=None, v=None, *_args, **_keys):
  ____r42 = unstash(_args, _keys)
  __x156 = destash33(x, ____r42)
  __v6 = destash33(v, ____r42)
  ____id39 = ____r42
  __body21 = cut(____id39, 0)
  __y1 = unique("y")
  return ["let", __y1, __v6, ["when", ["yes", __y1], join(["let", [__x156, __y1]], __body21)]]

setenv("let-when", macro=__let_when__macro)
def __define_macro__macro(name=None, args=None, *_args, **_keys):
  ____r44 = unstash(_args, _keys)
  __name3 = destash33(name, ____r44)
  __args3 = destash33(args, ____r44)
  ____id42 = ____r44
  __body23 = cut(____id42, 0)
  __id43 = unique(cat(__name3, "--macro"))
  ____x169 = object(["setenv", ["quote", __name3]])
  ____x169["macro"] = __id43
  __form3 = ["do", join(["define", __id43, __args3], __body23), ____x169]
  eval(__form3)
  return __form3

setenv("define-macro", macro=__define_macro__macro)
def __define_special__macro(name=None, args=None, *_args, **_keys):
  ____r46 = unstash(_args, _keys)
  __name5 = destash33(name, ____r46)
  __args5 = destash33(args, ____r46)
  ____id46 = ____r46
  __body25 = cut(____id46, 0)
  __id47 = unique(cat(__name5, "--special"))
  ____x178 = object(["setenv", ["quote", __name5]])
  ____x178["special"] = __id47
  __form5 = ["do", join(["define", __id47, __args5], __body25), join(____x178, props(__body25))]
  eval(__form5)
  return __form5

setenv("define-special", macro=__define_special__macro)
def __define_symbol__macro(name=None, expansion=None):
  setenv(name, symbol=expansion)
  ____x183 = object(["setenv", ["quote", name]])
  ____x183["symbol"] = ["quote", expansion]
  return ____x183

setenv("define-symbol", macro=__define_symbol__macro)
def __define_reader__macro(__x192=None, *_args, **_keys):
  ____r50 = unstash(_args, _keys)
  ____x192 = destash33(__x192, ____r50)
  ____id50 = ____x192
  __char1 = has(____id50, 0)
  __s1 = has(____id50, 1)
  ____id51 = ____r50
  __body27 = cut(____id51, 0)
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s1]], __body27)]

setenv("define-reader", macro=__define_reader__macro)
def __define__macro(name=None, x=None, *_args, **_keys):
  ____r52 = unstash(_args, _keys)
  __name7 = destash33(name, ____r52)
  __x201 = destash33(x, ____r52)
  ____id53 = ____r52
  __body29 = cut(____id53, 0)
  setenv(__name7, variable=True)
  if some63(__body29):
    return join(["%local-function", __name7], bind42(__x201, __body29), props(__body29))
  else:
    return join(["%local", __name7, __x201], props(__body29))

setenv("define", macro=__define__macro)
def __define_global__macro(name=None, x=None, *_args, **_keys):
  ____r54 = unstash(_args, _keys)
  __name9 = destash33(name, ____r54)
  __x208 = destash33(x, ____r54)
  ____id55 = ____r54
  __body31 = cut(____id55, 0)
  setenv(__name9, toplevel=True, variable=True)
  if some63(__body31):
    return join(["%global-function", __name9], bind42(__x208, __body31), props(__body31))
  else:
    return join(["set", __name9, __x208], props(__body31))

setenv("define-global", macro=__define_global__macro)
def __get_value__macro(x=None):
  ____x215 = object(["setenv", x])
  ____x215["toplevel"] = True
  return ["has", ____x215, ["quote", "value"]]

setenv("get-value", macro=__get_value__macro)
def __define_constant__macro(name=None, x=None):
  ____x226 = object(["setenv", ["quote", name]])
  ____x226["toplevel"] = True
  ____x226["value"] = either(x, ["get-value", ["quote", name]])
  return ["%do", ____x226, ["define-symbol", name, ["get-value", ["quote", name]]]]

setenv("define-constant", macro=__define_constant__macro)
def __define_variable__macro(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]

setenv("define-variable", macro=__define_variable__macro)
def __after__macro(x=None, *_args, **_keys):
  ____r63 = unstash(_args, _keys)
  __x255 = destash33(x, ____r63)
  ____id57 = ____r63
  __body33 = cut(____id57, 0)
  __ok1 = unique("ok")
  __r64 = unique("r")
  ____x256 = object(["target", ["try", __x255, join(["finally"], __body33)]])
  ____x256["lua"] = join(["let", [[__ok1, __r64], ["guard", __x255]]], __body33, [["if", __ok1, __r64, ["throw", __r64]]])
  return ____x256

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
      ____x284 = object(["setenv", ["quote", __k5]])
      ____x284["value"] = __v8
      add(__forms3, ____x284)
  return join(["with-frame"], __forms3)

setenv("with-values", macro=__with_values__macro)
def __with_bindings__macro(__x292=None, *_args, **_keys):
  ____r66 = unstash(_args, _keys)
  ____x292 = destash33(__x292, ____r66)
  ____id60 = ____x292
  __names5 = has(____id60, 0)
  ____id61 = ____r66
  __body39 = cut(____id61, 0)
  __x293 = unique("x")
  ____x296 = object(["setenv", __x293])
  ____x296["variable"] = True
  return join(["with-frame", ["each", __x293, __names5, ____x296]], __body39)

setenv("with-bindings", macro=__with_bindings__macro)
def __let_macro__macro(definitions=None, *_args, **_keys):
  ____r71 = unstash(_args, _keys)
  __definitions1 = destash33(definitions, ____r71)
  ____id63 = ____r71
  __body41 = cut(____id63, 0)
  add(environment, {})
  ____r73 = None
  try:
    def __f10(m=None):
      return macroexpand(join(["define-macro"], m))
    map(__f10, __definitions1)
    ____r73 = join(["%do"], macroexpand(__body41))
  finally:
    drop(environment)
  return ____r73

setenv("let-macro", macro=__let_macro__macro)
def __let_symbol__macro(expansions=None, *_args, **_keys):
  ____r79 = unstash(_args, _keys)
  __expansions1 = destash33(expansions, ____r79)
  ____id66 = ____r79
  __body43 = cut(____id66, 0)
  add(environment, {})
  ____r81 = None
  try:
    def __f11(__x306=None):
      ____id67 = __x306
      __name11 = has(____id67, 0)
      __exp1 = has(____id67, 1)
      return macroexpand(["define-symbol", __name11, __exp1])
    map(__f11, pair(__expansions1))
    ____r81 = join(["%do"], macroexpand(__body43))
  finally:
    drop(environment)
  return ____r81

setenv("let-symbol", macro=__let_symbol__macro)
def __let_unique__macro(names=None, *_args, **_keys):
  ____r85 = unstash(_args, _keys)
  __names7 = destash33(names, ____r85)
  ____id69 = ____r85
  __body45 = cut(____id69, 0)
  def __f12(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f12, __names7)
  return join(["let", apply(join, __bs3)], __body45)

setenv("let-unique", macro=__let_unique__macro)
def __fn__macro(args=None, *_args, **_keys):
  ____r88 = unstash(_args, _keys)
  __args7 = destash33(args, ____r88)
  ____id71 = ____r88
  __body47 = cut(____id71, 0)
  return join(["%function"], bind42(__args7, __body47), props(__body47))

setenv("fn", macro=__fn__macro)
def __apply__macro(f=None, *_args, **_keys):
  ____r90 = unstash(_args, _keys)
  __f1 = destash33(f, ____r90)
  ____id73 = ____r90
  __args9 = cut(____id73, 0)
  if L_35(__args9) > 1:
    return ["%call", "apply", __f1, ["join", join(["list"], almost(__args9)), last(__args9), join(["list"], props(__args9))]]
  else:
    if props63(__args9):
      return ["%call", "apply", __f1, join(["join"], __args9, [join(["list"], props(__args9))])]
    else:
      return join(["%call", "apply", __f1], __args9)

setenv("apply", macro=__apply__macro)
def __guard__macro(expr=None):
  ____x370 = object(["target", [["%function", join(), ["%try", ["list", True, expr]]]]])
  ____x382 = object(["obj"])
  ____x382["stack"] = [["idx", "debug", "traceback"]]
  ____x382["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
  ____x370["lua"] = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x382]]]]
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x370]

setenv("guard", macro=__guard__macro)
def __each__macro(x=None, t=None, *_args, **_keys):
  ____r94 = unstash(_args, _keys)
  __x410 = destash33(x, ____r94)
  __t1 = destash33(t, ____r94)
  ____id76 = ____r94
  __body49 = cut(____id76, 0)
  __o5 = unique("o")
  __n5 = unique("n")
  __i5 = unique("i")
  __e13 = None
  if atom63(__x410):
    __e13 = [__i5, __x410]
  else:
    __e14 = None
    if L_35(__x410) > 1:
      __e14 = __x410
    else:
      __e14 = [__i5, hd(__x410)]
    __e13 = __e14
  ____id77 = __e13
  __k7 = has(____id77, 0)
  __v10 = has(____id77, 1)
  ____x416 = object(["target", __o5])
  ____x416["py"] = ["indices", __o5]
  __e15 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e15 = __body49
  else:
    __e15 = [join(["let", __k7, ["if", ["numeric?", __k7], ["parseInt", __k7], __k7]], __body49)]
  return ["let", [__o5, __t1, __k7, "nil"], join(["%for", ____x416, __k7], props(__body49), [join(["let", [__v10, ["%get", __o5, __k7]]], __e15)])]

setenv("each", macro=__each__macro)
def __for__macro(i=None, to=None, *_args, **_keys):
  ____r96 = unstash(_args, _keys)
  __i7 = destash33(i, ____r96)
  __to1 = destash33(to, ____r96)
  ____id79 = ____r96
  __body51 = cut(____id79, 0)
  if __to1 == "in":
    return join(["%for", hd(__body51), __i7, join(["%do"], tl(__body51))], props(__body51))
  else:
    return ["let", __i7, 0, join(["while", ["<", __i7, __to1]], __body51, [["inc", __i7]])]

setenv("for", macro=__for__macro)
def __step__macro(v=None, t=None, *_args, **_keys):
  ____r98 = unstash(_args, _keys)
  __v12 = destash33(v, ____r98)
  __t3 = destash33(t, ____r98)
  ____id81 = ____r98
  __body53 = cut(____id81, 0)
  __x451 = unique("x")
  __i9 = unique("i")
  return ["let", [__x451, __t3], ["for", __i9, ["#", __x451], join(["let", [__v12, ["at", __x451, __i9]]], __body53)]]

setenv("step", macro=__step__macro)
def __set_of__macro(*_args, **_keys):
  __xs1 = unstash(_args, _keys)
  __l7 = {}
  ____o7 = __xs1
  ____i11 = None
  for ____i11 in indices(____o7):
    __x462 = ____o7[____i11]
    __l7[__x462] = True
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
  ____r104 = unstash(_args, _keys)
  __a3 = destash33(a, ____r104)
  ____id83 = ____r104
  __bs5 = cut(____id83, 0)
  return ["set", __a3, join(["join", __a3], __bs5)]

setenv("join!", macro=__join33__macro)
def __cat33__macro(a=None, *_args, **_keys):
  ____r106 = unstash(_args, _keys)
  __a5 = destash33(a, ____r106)
  ____id85 = ____r106
  __bs7 = cut(____id85, 0)
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
  __x492 = unique("x")
  return ["%do", ["inc", "indent-level"], ["with", __x492, form, ["dec", "indent-level"]]]

setenv("with-indent", macro=__with_indent__macro)
def __export__macro(*_args, **_keys):
  __names9 = unstash(_args, _keys)
  def __f13(k=None):
    if k == compile(k):
      return ["%set", ["idx", "exports", k], k]
    else:
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]]
  __forms5 = map(__f13, __names9)
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
def __f14(setfn=None, *_args, **_keys):
  ____r117 = unstash(_args, _keys)
  __setfn1 = destash33(setfn, ____r117)
  ____id87 = ____r117
  __args11 = cut(____id87, 0)
  def __f15(v=None, l=None, k=None):
    return ["%set", ["%get", l, k], v]
  return define_setter("has", __f15, __setfn1, __args11)

setenv("has", place_expander=__f14)
def __f16(setfn=None, *_args, **_keys):
  ____r121 = unstash(_args, _keys)
  __setfn3 = destash33(setfn, ____r121)
  ____id89 = ____r121
  __args13 = cut(____id89, 0)
  def __f17(c=None, L_str=None, pos=None):
    return ["set", L_str, ["cat", ["clip", L_str, 0, pos], c, ["clip", L_str, ["+", pos, 1]]]]
  return define_setter("char", __f17, __setfn3, __args13)

setenv("char", place_expander=__f16)
def __f18(setfn=None, *_args, **_keys):
  ____r125 = unstash(_args, _keys)
  __setfn5 = destash33(setfn, ____r125)
  ____id91 = ____r125
  __args15 = cut(____id91, 0)
  def __f19(c=None, L_str=None, L_from=None, upto=None):
    return ["set", L_str, ["cat", ["clip", L_str, 0, L_from], c, ["clip", L_str, upto]]]
  return define_setter("clip", __f19, __setfn5, __args15)

setenv("clip", place_expander=__f18)
def __f20(setfn=None, *_args, **_keys):
  ____r129 = unstash(_args, _keys)
  __setfn7 = destash33(setfn, ____r129)
  ____id93 = ____r129
  __args17 = cut(____id93, 0)
  def __f21(c=None, L_str=None):
    return ["set", L_str, ["cat", ["char", L_str, 0], c, ["char", L_str, ["edge", L_str]]]]
  return define_setter("inner", __f21, __setfn7, __args17)

setenv("inner", place_expander=__f20)
def __f22(setfn=None, *_args, **_keys):
  ____r133 = unstash(_args, _keys)
  __setfn9 = destash33(setfn, ____r133)
  ____id95 = ____r133
  __args19 = cut(____id95, 0)
  def __f23(v=None, l=None, L_from=None, upto=None):
    return ["set", l, ["join", ["cut", l, 0, L_from], v, ["cut", l, either(upto, ["#", l])], ["keys", v]]]
  return define_setter("cut", __f23, __setfn9, __args19)

setenv("cut", place_expander=__f22)
def __f24(setfn=None, *_args, **_keys):
  ____r137 = unstash(_args, _keys)
  __setfn11 = destash33(setfn, ____r137)
  ____id97 = ____r137
  __args21 = cut(____id97, 0)
  def __f25(v=None, l=None, L_from=None):
    return ["set", ["cut", l, either(L_from, 1)], v]
  return define_setter("tl", __f25, __setfn11, __args21)

setenv("tl", place_expander=__f24)
def __f26(setfn=None, *_args, **_keys):
  ____r141 = unstash(_args, _keys)
  __setfn13 = destash33(setfn, ____r141)
  ____id99 = ____r141
  __args23 = cut(____id99, 0)
  def __f27(v=None, l=None, n=None):
    return ["set", ["at", l, either(n, 0)], v]
  return define_setter("hd", __f27, __setfn13, __args23)

setenv("hd", place_expander=__f26)
def __f28(setfn=None, *_args, **_keys):
  ____r145 = unstash(_args, _keys)
  __setfn15 = destash33(setfn, ____r145)
  ____id101 = ____r145
  __args25 = cut(____id101, 0)
  def __f29(v=None, l=None):
    return ["set", ["at", l, ["edge", l]], v]
  return define_setter("last", __f29, __setfn15, __args25)

setenv("last", place_expander=__f28)
def __def__macro(name=None, *_args, **_keys):
  ____r148 = unstash(_args, _keys)
  __name13 = destash33(name, ____r148)
  ____id103 = ____r148
  __body59 = cut(____id103, 0)
  return join(["define-global", __name13], __body59)

setenv("def", macro=__def__macro)
def __mac__macro(name=None, *_args, **_keys):
  ____r150 = unstash(_args, _keys)
  __name15 = destash33(name, ____r150)
  ____id105 = ____r150
  __body61 = cut(____id105, 0)
  return join(["define-macro", __name15], __body61)

setenv("mac", macro=__mac__macro)
def __defconst__macro(name=None, *_args, **_keys):
  ____r152 = unstash(_args, _keys)
  __name17 = destash33(name, ____r152)
  ____id107 = ____r152
  __value1 = cut(____id107, 0)
  return join(["def", __name17], __value1)

setenv("defconst", macro=__defconst__macro)
def __undefined63__macro(name=None):
  ____x616 = object(["target"])
  ____x616["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x616["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x616["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x616

setenv("undefined?", macro=__undefined63__macro)
def __defvar__macro(name=None, *_args, **_keys):
  ____r156 = unstash(_args, _keys)
  __name19 = destash33(name, ____r156)
  ____id109 = ____r156
  __value3 = cut(____id109, 0)
  ____x633 = object(["target"])
  ____x633["py"] = ["global", __name19]
  return ["when", ["undefined?", __name19], ____x633, join(["defconst", __name19], __value3)]

setenv("defvar", macro=__defvar__macro)
def __async__macro(keyword=None, *_args, **_keys):
  ____r158 = unstash(_args, _keys)
  __keyword1 = destash33(keyword, ____r158)
  ____id1111 = ____r158
  __body63 = cut(____id1111, 0)
  ____x638 = object([__keyword1])
  ____x638["async"] = True
  return join(____x638, __body63)

setenv("async", macro=__async__macro)
def __L_37read_from_file__macro(name=None):
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]]

setenv("%read-from-file", macro=__L_37read_from_file__macro)
def __the__macro(name=None):
  return ["getenv", ["quote", name], ["quote", "value"]]

setenv("the", macro=__the__macro)
def __cat__macro(a=None, *_args, **_keys):
  ____r164 = unstash(_args, _keys)
  __a7 = destash33(a, ____r164)
  ____id113 = ____r164
  __bs9 = cut(____id113, 0)
  if nil63(__a7):
    return ""
  else:
    if none63(__bs9):
      return __a7
    else:
      if one63(__bs9):
        ____x663 = object(["target", join(["%cat", __a7], __bs9)])
        ____x663["py"] = join(["%call", "cat", __a7], __bs9)
        return ____x663
      else:
        ____x666 = object(["target", ["%cat", __a7, join(["cat"], __bs9)]])
        ____x666["py"] = join(["%call", "cat", __a7], __bs9)
        return ____x666

setenv("cat", macro=__cat__macro)
def __L_43__macro(*_args, **_keys):
  __args27 = unstash(_args, _keys)
  if none63(__args27):
    return 0
  else:
    if one63(__args27):
      return hd(__args27)
    else:
      return join(["%add"], __args27)

setenv("+", macro=__L_43__macro)
def __L___macro(*_args, **_keys):
  __args29 = unstash(_args, _keys)
  if none63(__args29):
    return 0
  else:
    if one63(__args29):
      return ["%unm", hd(__args29)]
    else:
      return join(["%sub"], __args29)

setenv("-", macro=__L___macro)
def __L_42__macro(*_args, **_keys):
  __args31 = unstash(_args, _keys)
  if none63(__args31):
    return 1
  else:
    if one63(__args31):
      return hd(__args31)
    else:
      return join(["%mul"], __args31)

setenv("*", macro=__L_42__macro)
def __L_47__macro(*_args, **_keys):
  __args33 = unstash(_args, _keys)
  if none63(__args33):
    return 1
  else:
    if one63(__args33):
      return hd(__args33)
    else:
      return join(["%div"], __args33)

setenv("/", macro=__L_47__macro)
def __L_4747__macro(*_args, **_keys):
  __args35 = unstash(_args, _keys)
  if none63(__args35):
    return 1
  else:
    if one63(__args35):
      return hd(__args35)
    else:
      return join(["%idiv"], __args35)

setenv("//", macro=__L_4747__macro)
def __L_37__macro(*_args, **_keys):
  __args37 = unstash(_args, _keys)
  if none63(__args37):
    return 0
  else:
    if one63(__args37):
      return hd(__args37)
    else:
      return join(["%mod"], __args37)

setenv("%", macro=__L_37__macro)
def __L_60__macro(a=None, *_args, **_keys):
  ____r166 = unstash(_args, _keys)
  __a9 = destash33(a, ____r166)
  ____id115 = ____r166
  __bs111 = cut(____id115, 0)
  if none63(__bs111):
    return True
  else:
    if one63(__bs111):
      return join(["%lt", __a9], __bs111)
    else:
      return ["%and", ["%lt", __a9, hd(__bs111)], join(["<"], __bs111)]

setenv("<", macro=__L_60__macro)
def __L_6061__macro(a=None, *_args, **_keys):
  ____r168 = unstash(_args, _keys)
  __a11 = destash33(a, ____r168)
  ____id117 = ____r168
  __bs13 = cut(____id117, 0)
  if none63(__bs13):
    return True
  else:
    if one63(__bs13):
      return join(["%le", __a11], __bs13)
    else:
      return ["%and", ["%le", __a11, hd(__bs13)], join(["<="], __bs13)]

setenv("<=", macro=__L_6061__macro)
def __L_61__macro(a=None, *_args, **_keys):
  ____r170 = unstash(_args, _keys)
  __a13 = destash33(a, ____r170)
  ____id119 = ____r170
  __bs15 = cut(____id119, 0)
  if none63(__bs15):
    return True
  else:
    if one63(__bs15):
      return join(["%eq", __a13], __bs15)
    else:
      return ["%and", ["%eq", __a13, hd(__bs15)], join(["="], __bs15)]

setenv("=", macro=__L_61__macro)
def __L_6261__macro(a=None, *_args, **_keys):
  ____r172 = unstash(_args, _keys)
  __a15 = destash33(a, ____r172)
  ____id1211 = ____r172
  __bs17 = cut(____id1211, 0)
  if none63(__bs17):
    return True
  else:
    if one63(__bs17):
      return join(["%ge", __a15], __bs17)
    else:
      return ["%and", ["%ge", __a15, hd(__bs17)], join([">="], __bs17)]

setenv(">=", macro=__L_6261__macro)
def __L_62__macro(a=None, *_args, **_keys):
  ____r174 = unstash(_args, _keys)
  __a17 = destash33(a, ____r174)
  ____id123 = ____r174
  __bs19 = cut(____id123, 0)
  if none63(__bs19):
    return True
  else:
    if one63(__bs19):
      return join(["%gt", __a17], __bs19)
    else:
      return ["%and", ["%gt", __a17, hd(__bs19)], join([">"], __bs19)]

setenv(">", macro=__L_62__macro)
def __not__macro(*_args, **_keys):
  __args39 = unstash(_args, _keys)
  if none63(__args39):
    return False
  else:
    if one63(__args39):
      return join(["%not"], __args39)
    else:
      return ["%and", ["%not", hd(__args39)], join(["not"], tl(__args39))]

setenv("not", macro=__not__macro)
def __and__macro(a=None, *_args, **_keys):
  ____r176 = unstash(_args, _keys)
  __a19 = destash33(a, ____r176)
  ____id125 = ____r176
  __bs211 = cut(____id125, 0)
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
  ____r178 = unstash(_args, _keys)
  __a21 = destash33(a, ____r178)
  ____id127 = ____r178
  __bs23 = cut(____id127, 0)
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
  __args41 = unstash(_args, _keys)
  return join(["%break"], __args41)

setenv("break", macro=__break__macro)
def __return__macro(*_args, **_keys):
  __args43 = unstash(_args, _keys)
  return join(["%return"], __args43)

setenv("return", macro=__return__macro)
def __while__macro(c=None, *_args, **_keys):
  ____r180 = unstash(_args, _keys)
  __c1 = destash33(c, ____r180)
  ____id129 = ____r180
  __body65 = cut(____id129, 0)
  return join(["%while", __c1], __body65)

setenv("while", macro=__while__macro)
def __do__macro(*_args, **_keys):
  __body67 = unstash(_args, _keys)
  return join(["%do"], __body67)

setenv("do", macro=__do__macro)
def __get__macro(*_args, **_keys):
  __args45 = unstash(_args, _keys)
  return join(["%get"], __args45)

setenv("get", macro=__get__macro)
def __idx__macro(*_args, **_keys):
  __args47 = unstash(_args, _keys)
  return join(["%idx"], __args47)

setenv("idx", macro=__idx__macro)
def __new__macro(*_args, **_keys):
  __args49 = unstash(_args, _keys)
  return join(["%new"], __args49)

setenv("new", macro=__new__macro)
def __typeof__macro(*_args, **_keys):
  __args51 = unstash(_args, _keys)
  return join(["%typeof"], __args51)

setenv("typeof", macro=__typeof__macro)
def __error__macro(*_args, **_keys):
  __args53 = unstash(_args, _keys)
  return join(["%error"], __args53)

setenv("error", macro=__error__macro)
def __throw__macro(*_args, **_keys):
  __args55 = unstash(_args, _keys)
  return join(["%throw"], __args55)

setenv("throw", macro=__throw__macro)
def __raise__macro(*_args, **_keys):
  __args57 = unstash(_args, _keys)
  return join(["%throw"], __args57)

setenv("raise", macro=__raise__macro)
def __is__macro(*_args, **_keys):
  __args59 = unstash(_args, _keys)
  ____x795 = object(["target", join(["="], __args59)])
  ____x795["py"] = join(["%is"], __args59)
  return ____x795

setenv("is", macro=__is__macro)
def __in__macro(*_args, **_keys):
  __args61 = unstash(_args, _keys)
  return join(["%in"], __args61)

setenv("in", macro=__in__macro)
def __as__macro(*_args, **_keys):
  __args63 = unstash(_args, _keys)
  return join(["%as"], __args63)

setenv("as", macro=__as__macro)
def __L_37expand_case__macro(x=None, *_args, **_keys):
  ____r182 = unstash(_args, _keys)
  __x810 = destash33(x, ____r182)
  ____id132 = ____r182
  __body69 = cut(____id132, 0)
  __e18 = None
  if atom63(__x810):
    __e18 = [__x810]
  else:
    __e18 = __x810
  ____id133 = __e18
  __a23 = has(____id133, 0)
  __bs25 = cut(____id133, 1)
  __e19 = None
  if none63(__bs25):
    __e19 = [["%literal"]]
  else:
    __e19 = __bs25
  return join(["%block", __a23], __e19, __body69)

setenv("%expand-case", macro=__L_37expand_case__macro)
def __L_37cases__macro(*_args, **_keys):
  __args65 = unstash(_args, _keys)
  if none63(__args65):
    return ["do"]
  else:
    if one63(__args65):
      return join(["%expand-case"], hd(__args65))
    else:
      __r185 = unique("r")
      def __f30(__x829=None):
        ____id135 = __x829
        __x830 = has(____id135, 0)
        __body71 = cut(____id135, 1)
        return ["%expand-case", __x830, ["%set", __r185, join(["%do"], __body71)]]
      return join(["with", __r185, "nil"], map(__f30, almost(__args65)), [join(["%expand-case"], last(__args65))])

setenv("%cases", macro=__L_37cases__macro)
def __try__macro(x=None, *_args, **_keys):
  ____r188 = unstash(_args, _keys)
  __x850 = destash33(x, ____r188)
  ____id140 = ____r188
  __cases1 = cut(____id140, 0)
  __fin1 = ["finally"]
  ____o9 = __cases1
  ____i14 = None
  for ____i14 in indices(____o9):
    __x852 = ____o9[____i14]
    if hd63(__x852, "finally"):
      __fin1 = __x852
  __forms7 = []
  ____x855 = __cases1
  ____i15 = 0
  while ____i15 < L_35(____x855):
    ____id141 = ____x855[____i15]
    __x856 = has(____id141, 0)
    __body75 = cut(____id141, 1)
    if __x856 == "finally":
      pass
    else:
      if __x856 == "except" and has(__body75, 1) == "as":
        ____id142 = __body75
        __kind2 = has(____id142, 0)
        ___1 = has(____id142, 1)
        __name21 = has(____id142, 2)
        __body76 = cut(____id142, 3)
        add(__forms7, join([[__x856, ["%as", __kind2, __name21]]], __body76))
      else:
        if __x856 == "except":
          ____id143 = __body75
          __kind3 = has(____id143, 0)
          __body77 = cut(____id143, 1)
          add(__forms7, join([[__x856, __kind3]], __body77))
        else:
          raise Exception("Unknown try clause")
    ____i15 = ____i15 + 1
  return join(["%cases", ["try", __x850]], __forms7, [__fin1])

setenv("try", macro=__try__macro)
def __errsafe__macro(x=None, L_else=None):
  if nil63(L_else):
    L_else = "nil"
  __ok7 = unique("ok")
  __v14 = unique("v")
  return ["let", [[__ok7, __v14], ["guard", x]], ["if", __ok7, __v14, L_else]]

setenv("errsafe", macro=__errsafe__macro)
def __dbg__macro():
  ____x879 = object(["target", ["do"]])
  ____x879["py"] = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]]
  return ____x879

setenv("dbg", macro=__dbg__macro)
def __see__macro(form=None):
  __form9 = expand(form)
  L_print(compile(expand(["%set", "lumen-result", __form9])))
  return __form9

setenv("see", macro=__see__macro)
def __class__macro(name=None, *_args, **_keys):
  ____r196 = unstash(_args, _keys)
  __name23 = destash33(name, ____r196)
  ____id145 = ____r196
  __body79 = cut(____id145, 0)
  return join(["%block", "class", __name23], __body79)

setenv("class", macro=__class__macro)
