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
def __define_transformer__macro(name=None, args=None, *_args, **_keys):
  ____r46 = unstash(_args, _keys)
  __name5 = destash33(name, ____r46)
  __args5 = destash33(args, ____r46)
  ____id46 = ____r46
  __body25 = cut(____id46, 0)
  __id47 = unique(cat(__name5, "--transformer"))
  ____x178 = object(["setenv", ["quote", __name5]])
  ____x178["transformer"] = __id47
  __form5 = ["do", join(["define", __id47, __args5], __body25), ____x178]
  return __form5

setenv("define-transformer", macro=__define_transformer__macro)
def __define_special__macro(name=None, args=None, *_args, **_keys):
  ____r48 = unstash(_args, _keys)
  __name7 = destash33(name, ____r48)
  __args7 = destash33(args, ____r48)
  ____id50 = ____r48
  __body27 = cut(____id50, 0)
  __id51 = unique(cat(__name7, "--special"))
  ____x187 = object(["setenv", ["quote", __name7]])
  ____x187["special"] = __id51
  __form7 = ["do", join(["define", __id51, __args7], __body27), join(____x187, props(__body27))]
  eval(__form7)
  return __form7

setenv("define-special", macro=__define_special__macro)
def __define_symbol__macro(name=None, expansion=None):
  setenv(name, symbol=expansion)
  ____x192 = object(["setenv", ["quote", name]])
  ____x192["symbol"] = ["quote", expansion]
  return ____x192

setenv("define-symbol", macro=__define_symbol__macro)
def __define_reader__macro(__x201=None, *_args, **_keys):
  ____r52 = unstash(_args, _keys)
  ____x201 = destash33(__x201, ____r52)
  ____id54 = ____x201
  __char1 = has(____id54, 0)
  __s1 = has(____id54, 1)
  ____id55 = ____r52
  __body29 = cut(____id55, 0)
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s1]], __body29)]

setenv("define-reader", macro=__define_reader__macro)
def __define__macro(name=None, x=None, *_args, **_keys):
  ____r54 = unstash(_args, _keys)
  __name9 = destash33(name, ____r54)
  __x210 = destash33(x, ____r54)
  ____id57 = ____r54
  __body31 = cut(____id57, 0)
  setenv(__name9, variable=True)
  if some63(__body31):
    return join(["%local-function", __name9], bind42(__x210, __body31), props(__body31))
  else:
    return join(["%local", __name9, __x210], props(__body31))

setenv("define", macro=__define__macro)
def __define_global__macro(name=None, x=None, *_args, **_keys):
  ____r56 = unstash(_args, _keys)
  __name11 = destash33(name, ____r56)
  __x217 = destash33(x, ____r56)
  ____id59 = ____r56
  __body33 = cut(____id59, 0)
  setenv(__name11, toplevel=True, variable=True)
  if some63(__body33):
    return join(["%global-function", __name11], bind42(__x217, __body33), props(__body33))
  else:
    return join(["set", __name11, __x217], props(__body33))

setenv("define-global", macro=__define_global__macro)
def __get_value__macro(x=None):
  ____x224 = object(["setenv", x])
  ____x224["toplevel"] = True
  return ["has", ____x224, ["quote", "value"]]

setenv("get-value", macro=__get_value__macro)
def __define_constant__macro(name=None, x=None):
  ____x235 = object(["setenv", ["quote", name]])
  ____x235["toplevel"] = True
  ____x235["value"] = either(x, ["get-value", ["quote", name]])
  return ["%do", ____x235, ["define-symbol", name, ["get-value", ["quote", name]]]]

setenv("define-constant", macro=__define_constant__macro)
def __define_variable__macro(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]

setenv("define-variable", macro=__define_variable__macro)
def __after__macro(x=None, *_args, **_keys):
  ____r65 = unstash(_args, _keys)
  __x264 = destash33(x, ____r65)
  ____id61 = ____r65
  __body35 = cut(____id61, 0)
  __ok1 = unique("ok")
  __r66 = unique("r")
  ____x265 = object(["target", ["try", __x264, join(["finally"], __body35)]])
  ____x265["lua"] = join(["let", [[__ok1, __r66], ["guard", __x264]]], __body35, [["if", __ok1, __r66, ["throw", __r66]]])
  return ____x265

setenv("after", macro=__after__macro)
def __with_frame__macro(*_args, **_keys):
  __body37 = unstash(_args, _keys)
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body37), ["drop", "environment"]]]

setenv("with-frame", macro=__with_frame__macro)
def __with_values__macro(*_args, **_keys):
  __body39 = unstash(_args, _keys)
  __forms3 = []
  ____o3 = __body39
  __k5 = None
  for __k5 in indices(____o3):
    __v8 = ____o3[__k5]
    if not number63(__k5):
      ____x293 = object(["setenv", ["quote", __k5]])
      ____x293["value"] = __v8
      add(__forms3, ____x293)
  return join(["with-frame"], __forms3)

setenv("with-values", macro=__with_values__macro)
def __with_bindings__macro(__x301=None, *_args, **_keys):
  ____r68 = unstash(_args, _keys)
  ____x301 = destash33(__x301, ____r68)
  ____id64 = ____x301
  __names5 = has(____id64, 0)
  ____id65 = ____r68
  __body41 = cut(____id65, 0)
  __x302 = unique("x")
  ____x305 = object(["setenv", __x302])
  ____x305["variable"] = True
  return join(["with-frame", ["each", __x302, __names5, ____x305]], __body41)

setenv("with-bindings", macro=__with_bindings__macro)
def __let_macro__macro(definitions=None, *_args, **_keys):
  ____r73 = unstash(_args, _keys)
  __definitions1 = destash33(definitions, ____r73)
  ____id67 = ____r73
  __body43 = cut(____id67, 0)
  add(environment, {})
  ____r75 = None
  try:
    def __f10(m=None):
      return macroexpand(join(["define-macro"], m))
    map(__f10, __definitions1)
    ____r75 = join(["%do"], macroexpand(__body43))
  finally:
    drop(environment)
  return ____r75

setenv("let-macro", macro=__let_macro__macro)
def __let_symbol__macro(expansions=None, *_args, **_keys):
  ____r81 = unstash(_args, _keys)
  __expansions1 = destash33(expansions, ____r81)
  ____id70 = ____r81
  __body45 = cut(____id70, 0)
  add(environment, {})
  ____r83 = None
  try:
    def __f11(__x315=None):
      ____id71 = __x315
      __name13 = has(____id71, 0)
      __exp1 = has(____id71, 1)
      return macroexpand(["define-symbol", __name13, __exp1])
    map(__f11, pair(__expansions1))
    ____r83 = join(["%do"], macroexpand(__body45))
  finally:
    drop(environment)
  return ____r83

setenv("let-symbol", macro=__let_symbol__macro)
def __let_unique__macro(names=None, *_args, **_keys):
  ____r87 = unstash(_args, _keys)
  __names7 = destash33(names, ____r87)
  ____id73 = ____r87
  __body47 = cut(____id73, 0)
  def __f12(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f12, __names7)
  return join(["let", apply(join, __bs3)], __body47)

setenv("let-unique", macro=__let_unique__macro)
def __fn__macro(args=None, *_args, **_keys):
  ____r90 = unstash(_args, _keys)
  __args9 = destash33(args, ____r90)
  ____id75 = ____r90
  __body49 = cut(____id75, 0)
  return join(["%function"], bind42(__args9, __body49), props(__body49))

setenv("fn", macro=__fn__macro)
def __apply__macro(f=None, *_args, **_keys):
  ____r92 = unstash(_args, _keys)
  __f1 = destash33(f, ____r92)
  ____id77 = ____r92
  __args11 = cut(____id77, 0)
  if L_35(__args11) > 1:
    return ["%call", "apply", __f1, ["join", join(["list"], almost(__args11)), last(__args11), join(["list"], props(__args11))]]
  else:
    if props63(__args11):
      return ["%call", "apply", __f1, join(["join"], __args11, [join(["list"], props(__args11))])]
    else:
      return join(["%call", "apply", __f1], __args11)

setenv("apply", macro=__apply__macro)
def __guard__macro(expr=None):
  ____x379 = object(["target", [["%function", join(), ["%try", ["list", True, expr]]]]])
  ____x391 = object(["obj"])
  ____x391["stack"] = [["idx", "debug", "traceback"]]
  ____x391["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
  ____x379["lua"] = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x391]]]]
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x379]

setenv("guard", macro=__guard__macro)
def __each__macro(x=None, t=None, *_args, **_keys):
  ____r96 = unstash(_args, _keys)
  __x419 = destash33(x, ____r96)
  __t1 = destash33(t, ____r96)
  ____id80 = ____r96
  __body51 = cut(____id80, 0)
  __o5 = unique("o")
  __n5 = unique("n")
  __i5 = unique("i")
  __e13 = None
  if atom63(__x419):
    __e13 = [__i5, __x419]
  else:
    __e14 = None
    if L_35(__x419) > 1:
      __e14 = __x419
    else:
      __e14 = [__i5, hd(__x419)]
    __e13 = __e14
  ____id81 = __e13
  __k7 = has(____id81, 0)
  __v10 = has(____id81, 1)
  ____x425 = object(["target", __o5])
  ____x425["py"] = ["indices", __o5]
  __e15 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e15 = __body51
  else:
    __e15 = [join(["let", __k7, ["if", ["numeric?", __k7], ["parseInt", __k7], __k7]], __body51)]
  return ["let", [__o5, __t1, __k7, "nil"], join(["%for", ____x425, __k7], props(__body51), [join(["let", [__v10, ["%get", __o5, __k7]]], __e15)])]

setenv("each", macro=__each__macro)
def __for__macro(i=None, to=None, *_args, **_keys):
  ____r98 = unstash(_args, _keys)
  __i7 = destash33(i, ____r98)
  __to1 = destash33(to, ____r98)
  ____id83 = ____r98
  __body53 = cut(____id83, 0)
  if __to1 == "in":
    return join(["%for", hd(__body53), __i7, join(["%do"], tl(__body53))], props(__body53))
  else:
    return ["let", __i7, 0, join(["while", ["<", __i7, __to1]], __body53, [["inc", __i7]])]

setenv("for", macro=__for__macro)
def __step__macro(v=None, t=None, *_args, **_keys):
  ____r100 = unstash(_args, _keys)
  __v12 = destash33(v, ____r100)
  __t3 = destash33(t, ____r100)
  ____id85 = ____r100
  __body55 = cut(____id85, 0)
  __x460 = unique("x")
  __i9 = unique("i")
  return ["let", [__x460, __t3], ["for", __i9, ["#", __x460], join(["let", [__v12, ["at", __x460, __i9]]], __body55)]]

setenv("step", macro=__step__macro)
def __set_of__macro(*_args, **_keys):
  __xs1 = unstash(_args, _keys)
  __l7 = {}
  ____o7 = __xs1
  ____i11 = None
  for ____i11 in indices(____o7):
    __x471 = ____o7[____i11]
    __l7[__x471] = True
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
  ____r106 = unstash(_args, _keys)
  __a3 = destash33(a, ____r106)
  ____id87 = ____r106
  __bs5 = cut(____id87, 0)
  return ["set", __a3, join(["join", __a3], __bs5)]

setenv("join!", macro=__join33__macro)
def __cat33__macro(a=None, *_args, **_keys):
  ____r108 = unstash(_args, _keys)
  __a5 = destash33(a, ____r108)
  ____id89 = ____r108
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
  __x501 = unique("x")
  return ["%do", ["inc", "indent-level"], ["with", __x501, form, ["dec", "indent-level"]]]

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
  __body57 = unstash(_args, _keys)
  return eval(join(["%do"], __body57))

setenv("when-compiling", macro=__when_compiling__macro)
def __during_compilation__macro(*_args, **_keys):
  __body59 = unstash(_args, _keys)
  __form9 = join(["%do"], __body59)
  eval(__form9)
  return __form9

setenv("during-compilation", macro=__during_compilation__macro)
def __f14(setfn=None, *_args, **_keys):
  ____r119 = unstash(_args, _keys)
  __setfn1 = destash33(setfn, ____r119)
  ____id91 = ____r119
  __args13 = cut(____id91, 0)
  def __f15(v=None, l=None, k=None):
    return ["%set", ["%get", l, k], v]
  return define_setter("has", __f15, __setfn1, __args13)

setenv("has", place_expander=__f14)
def __f16(setfn=None, *_args, **_keys):
  ____r123 = unstash(_args, _keys)
  __setfn3 = destash33(setfn, ____r123)
  ____id93 = ____r123
  __args15 = cut(____id93, 0)
  def __f17(c=None, L_str=None, pos=None):
    return ["set", L_str, ["cat", ["clip", L_str, 0, pos], c, ["clip", L_str, ["+", pos, 1]]]]
  return define_setter("char", __f17, __setfn3, __args15)

setenv("char", place_expander=__f16)
def __f18(setfn=None, *_args, **_keys):
  ____r127 = unstash(_args, _keys)
  __setfn5 = destash33(setfn, ____r127)
  ____id95 = ____r127
  __args17 = cut(____id95, 0)
  def __f19(c=None, L_str=None, L_from=None, upto=None):
    return ["set", L_str, ["cat", ["clip", L_str, 0, L_from], c, ["clip", L_str, upto]]]
  return define_setter("clip", __f19, __setfn5, __args17)

setenv("clip", place_expander=__f18)
def __f20(setfn=None, *_args, **_keys):
  ____r131 = unstash(_args, _keys)
  __setfn7 = destash33(setfn, ____r131)
  ____id97 = ____r131
  __args19 = cut(____id97, 0)
  def __f21(c=None, L_str=None):
    return ["set", L_str, ["cat", ["char", L_str, 0], c, ["char", L_str, ["edge", L_str]]]]
  return define_setter("inner", __f21, __setfn7, __args19)

setenv("inner", place_expander=__f20)
def __f22(setfn=None, *_args, **_keys):
  ____r135 = unstash(_args, _keys)
  __setfn9 = destash33(setfn, ____r135)
  ____id99 = ____r135
  __args21 = cut(____id99, 0)
  def __f23(v=None, l=None, L_from=None, upto=None):
    return ["set", l, ["join", ["cut", l, 0, L_from], v, ["cut", l, either(upto, ["#", l])], ["keys", v]]]
  return define_setter("cut", __f23, __setfn9, __args21)

setenv("cut", place_expander=__f22)
def __f24(setfn=None, *_args, **_keys):
  ____r139 = unstash(_args, _keys)
  __setfn11 = destash33(setfn, ____r139)
  ____id101 = ____r139
  __args23 = cut(____id101, 0)
  def __f25(v=None, l=None, L_from=None):
    return ["set", ["cut", l, either(L_from, 1)], v]
  return define_setter("tl", __f25, __setfn11, __args23)

setenv("tl", place_expander=__f24)
def __f26(setfn=None, *_args, **_keys):
  ____r143 = unstash(_args, _keys)
  __setfn13 = destash33(setfn, ____r143)
  ____id103 = ____r143
  __args25 = cut(____id103, 0)
  def __f27(v=None, l=None, n=None):
    return ["set", ["at", l, either(n, 0)], v]
  return define_setter("hd", __f27, __setfn13, __args25)

setenv("hd", place_expander=__f26)
def __f28(setfn=None, *_args, **_keys):
  ____r147 = unstash(_args, _keys)
  __setfn15 = destash33(setfn, ____r147)
  ____id105 = ____r147
  __args27 = cut(____id105, 0)
  def __f29(v=None, l=None):
    return ["set", ["at", l, ["edge", l]], v]
  return define_setter("last", __f29, __setfn15, __args27)

setenv("last", place_expander=__f28)
def __def__macro(name=None, *_args, **_keys):
  ____r150 = unstash(_args, _keys)
  __name15 = destash33(name, ____r150)
  ____id107 = ____r150
  __body61 = cut(____id107, 0)
  return join(["define-global", __name15], __body61)

setenv("def", macro=__def__macro)
def __mac__macro(name=None, *_args, **_keys):
  ____r152 = unstash(_args, _keys)
  __name17 = destash33(name, ____r152)
  ____id109 = ____r152
  __body63 = cut(____id109, 0)
  return join(["define-macro", __name17], __body63)

setenv("mac", macro=__mac__macro)
def __defconst__macro(name=None, *_args, **_keys):
  ____r154 = unstash(_args, _keys)
  __name19 = destash33(name, ____r154)
  ____id1111 = ____r154
  __value1 = cut(____id1111, 0)
  return join(["def", __name19], __value1)

setenv("defconst", macro=__defconst__macro)
def __undefined63__macro(name=None):
  ____x625 = object(["target"])
  ____x625["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x625["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x625["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x625

setenv("undefined?", macro=__undefined63__macro)
def __defvar__macro(name=None, *_args, **_keys):
  ____r158 = unstash(_args, _keys)
  __name21 = destash33(name, ____r158)
  ____id113 = ____r158
  __value3 = cut(____id113, 0)
  ____x642 = object(["target"])
  ____x642["py"] = ["global", __name21]
  return ["when", ["undefined?", __name21], ____x642, join(["defconst", __name21], __value3)]

setenv("defvar", macro=__defvar__macro)
def __async__macro(keyword=None, *_args, **_keys):
  ____r160 = unstash(_args, _keys)
  __keyword1 = destash33(keyword, ____r160)
  ____id115 = ____r160
  __body65 = cut(____id115, 0)
  ____x647 = object([__keyword1])
  ____x647["async"] = True
  return join(____x647, __body65)

setenv("async", macro=__async__macro)
def __L_37read_from_file__macro(name=None):
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]]

setenv("%read-from-file", macro=__L_37read_from_file__macro)
def __the__macro(name=None):
  return ["getenv", ["quote", name], ["quote", "value"]]

setenv("the", macro=__the__macro)
def __cat__macro(a=None, *_args, **_keys):
  ____r166 = unstash(_args, _keys)
  __a7 = destash33(a, ____r166)
  ____id117 = ____r166
  __bs9 = cut(____id117, 0)
  if nil63(__a7):
    return ""
  else:
    if none63(__bs9):
      return __a7
    else:
      if one63(__bs9):
        ____x672 = object(["target", join(["%cat", __a7], __bs9)])
        ____x672["py"] = join(["%call", "cat", __a7], __bs9)
        return ____x672
      else:
        ____x675 = object(["target", ["%cat", __a7, join(["cat"], __bs9)]])
        ____x675["py"] = join(["%call", "cat", __a7], __bs9)
        return ____x675

setenv("cat", macro=__cat__macro)
def __L_43__macro(*_args, **_keys):
  __args29 = unstash(_args, _keys)
  if none63(__args29):
    return 0
  else:
    if one63(__args29):
      return hd(__args29)
    else:
      return join(["%add"], __args29)

setenv("+", macro=__L_43__macro)
def __L___macro(*_args, **_keys):
  __args31 = unstash(_args, _keys)
  if none63(__args31):
    return 0
  else:
    if one63(__args31):
      return ["%unm", hd(__args31)]
    else:
      return join(["%sub"], __args31)

setenv("-", macro=__L___macro)
def __L_42__macro(*_args, **_keys):
  __args33 = unstash(_args, _keys)
  if none63(__args33):
    return 1
  else:
    if one63(__args33):
      return hd(__args33)
    else:
      return join(["%mul"], __args33)

setenv("*", macro=__L_42__macro)
def __L_47__macro(*_args, **_keys):
  __args35 = unstash(_args, _keys)
  if none63(__args35):
    return 1
  else:
    if one63(__args35):
      return hd(__args35)
    else:
      return join(["%div"], __args35)

setenv("/", macro=__L_47__macro)
def __L_4747__macro(*_args, **_keys):
  __args37 = unstash(_args, _keys)
  if none63(__args37):
    return 1
  else:
    if one63(__args37):
      return hd(__args37)
    else:
      return join(["%idiv"], __args37)

setenv("//", macro=__L_4747__macro)
def __L_37__macro(*_args, **_keys):
  __args39 = unstash(_args, _keys)
  if none63(__args39):
    return 0
  else:
    if one63(__args39):
      return hd(__args39)
    else:
      return join(["%mod"], __args39)

setenv("%", macro=__L_37__macro)
def __L_60__macro(a=None, *_args, **_keys):
  ____r168 = unstash(_args, _keys)
  __a9 = destash33(a, ____r168)
  ____id119 = ____r168
  __bs111 = cut(____id119, 0)
  if none63(__bs111):
    return True
  else:
    if one63(__bs111):
      return join(["%lt", __a9], __bs111)
    else:
      return ["%and", ["%lt", __a9, hd(__bs111)], join(["<"], __bs111)]

setenv("<", macro=__L_60__macro)
def __L_6061__macro(a=None, *_args, **_keys):
  ____r170 = unstash(_args, _keys)
  __a11 = destash33(a, ____r170)
  ____id1211 = ____r170
  __bs13 = cut(____id1211, 0)
  if none63(__bs13):
    return True
  else:
    if one63(__bs13):
      return join(["%le", __a11], __bs13)
    else:
      return ["%and", ["%le", __a11, hd(__bs13)], join(["<="], __bs13)]

setenv("<=", macro=__L_6061__macro)
def __L_61__macro(a=None, *_args, **_keys):
  ____r172 = unstash(_args, _keys)
  __a13 = destash33(a, ____r172)
  ____id123 = ____r172
  __bs15 = cut(____id123, 0)
  if none63(__bs15):
    return True
  else:
    if one63(__bs15):
      return join(["%eq", __a13], __bs15)
    else:
      return ["%and", ["%eq", __a13, hd(__bs15)], join(["="], __bs15)]

setenv("=", macro=__L_61__macro)
def __L_6261__macro(a=None, *_args, **_keys):
  ____r174 = unstash(_args, _keys)
  __a15 = destash33(a, ____r174)
  ____id125 = ____r174
  __bs17 = cut(____id125, 0)
  if none63(__bs17):
    return True
  else:
    if one63(__bs17):
      return join(["%ge", __a15], __bs17)
    else:
      return ["%and", ["%ge", __a15, hd(__bs17)], join([">="], __bs17)]

setenv(">=", macro=__L_6261__macro)
def __L_62__macro(a=None, *_args, **_keys):
  ____r176 = unstash(_args, _keys)
  __a17 = destash33(a, ____r176)
  ____id127 = ____r176
  __bs19 = cut(____id127, 0)
  if none63(__bs19):
    return True
  else:
    if one63(__bs19):
      return join(["%gt", __a17], __bs19)
    else:
      return ["%and", ["%gt", __a17, hd(__bs19)], join([">"], __bs19)]

setenv(">", macro=__L_62__macro)
def __not__macro(*_args, **_keys):
  __args41 = unstash(_args, _keys)
  if none63(__args41):
    return False
  else:
    if one63(__args41):
      return join(["%not"], __args41)
    else:
      return ["%and", ["%not", hd(__args41)], join(["not"], tl(__args41))]

setenv("not", macro=__not__macro)
def __and__macro(a=None, *_args, **_keys):
  ____r178 = unstash(_args, _keys)
  __a19 = destash33(a, ____r178)
  ____id129 = ____r178
  __bs211 = cut(____id129, 0)
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
  ____r180 = unstash(_args, _keys)
  __a21 = destash33(a, ____r180)
  ____id131 = ____r180
  __bs23 = cut(____id131, 0)
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
  __args43 = unstash(_args, _keys)
  return join(["%break"], __args43)

setenv("break", macro=__break__macro)
def __return__macro(*_args, **_keys):
  __args45 = unstash(_args, _keys)
  return join(["%return"], __args45)

setenv("return", macro=__return__macro)
def __while__macro(c=None, *_args, **_keys):
  ____r182 = unstash(_args, _keys)
  __c1 = destash33(c, ____r182)
  ____id133 = ____r182
  __body67 = cut(____id133, 0)
  return join(["%while", __c1], __body67)

setenv("while", macro=__while__macro)
def __do__macro(*_args, **_keys):
  __body69 = unstash(_args, _keys)
  return join(["%do"], __body69)

setenv("do", macro=__do__macro)
def __get__macro(*_args, **_keys):
  __args47 = unstash(_args, _keys)
  return join(["%get"], __args47)

setenv("get", macro=__get__macro)
def __idx__macro(*_args, **_keys):
  __args49 = unstash(_args, _keys)
  return join(["%idx"], __args49)

setenv("idx", macro=__idx__macro)
def __new__macro(*_args, **_keys):
  __args51 = unstash(_args, _keys)
  return join(["%new"], __args51)

setenv("new", macro=__new__macro)
def __typeof__macro(*_args, **_keys):
  __args53 = unstash(_args, _keys)
  return join(["%typeof"], __args53)

setenv("typeof", macro=__typeof__macro)
def __error__macro(*_args, **_keys):
  __args55 = unstash(_args, _keys)
  return join(["%error"], __args55)

setenv("error", macro=__error__macro)
def __throw__macro(*_args, **_keys):
  __args57 = unstash(_args, _keys)
  return join(["%throw"], __args57)

setenv("throw", macro=__throw__macro)
def __raise__macro(*_args, **_keys):
  __args59 = unstash(_args, _keys)
  return join(["%throw"], __args59)

setenv("raise", macro=__raise__macro)
def __is__macro(*_args, **_keys):
  __args61 = unstash(_args, _keys)
  ____x804 = object(["target", join(["="], __args61)])
  ____x804["py"] = join(["%is"], __args61)
  return ____x804

setenv("is", macro=__is__macro)
def __in__macro(*_args, **_keys):
  __args63 = unstash(_args, _keys)
  return join(["%in"], __args63)

setenv("in", macro=__in__macro)
def __as__macro(*_args, **_keys):
  __args65 = unstash(_args, _keys)
  return join(["%as"], __args65)

setenv("as", macro=__as__macro)
def __L_37expand_case__macro(x=None, *_args, **_keys):
  ____r184 = unstash(_args, _keys)
  __x819 = destash33(x, ____r184)
  ____id136 = ____r184
  __body71 = cut(____id136, 0)
  __e18 = None
  if atom63(__x819):
    __e18 = [__x819]
  else:
    __e18 = __x819
  ____id137 = __e18
  __a23 = has(____id137, 0)
  __bs25 = cut(____id137, 1)
  __e19 = None
  if none63(__bs25):
    __e19 = [["%literal"]]
  else:
    __e19 = __bs25
  return join(["%block", __a23], __e19, __body71)

setenv("%expand-case", macro=__L_37expand_case__macro)
def __L_37cases__macro(*_args, **_keys):
  __args67 = unstash(_args, _keys)
  if none63(__args67):
    return ["do"]
  else:
    if one63(__args67):
      return join(["%expand-case"], hd(__args67))
    else:
      __r187 = unique("r")
      def __f30(__x838=None):
        ____id139 = __x838
        __x839 = has(____id139, 0)
        __body73 = cut(____id139, 1)
        return ["%expand-case", __x839, ["%set", __r187, join(["%do"], __body73)]]
      return join(["with", __r187, "nil"], map(__f30, almost(__args67)), [join(["%expand-case"], last(__args67))])

setenv("%cases", macro=__L_37cases__macro)
def __try__macro(x=None, *_args, **_keys):
  ____r190 = unstash(_args, _keys)
  __x859 = destash33(x, ____r190)
  ____id144 = ____r190
  __cases1 = cut(____id144, 0)
  __fin1 = ["finally"]
  ____o9 = __cases1
  ____i14 = None
  for ____i14 in indices(____o9):
    __x861 = ____o9[____i14]
    if hd63(__x861, "finally"):
      __fin1 = __x861
  __forms7 = []
  ____x864 = __cases1
  ____i15 = 0
  while ____i15 < L_35(____x864):
    ____id145 = ____x864[____i15]
    __x865 = has(____id145, 0)
    __body77 = cut(____id145, 1)
    if __x865 == "finally":
      pass
    else:
      if __x865 == "except" and has(__body77, 1) == "as":
        ____id146 = __body77
        __kind2 = has(____id146, 0)
        ___1 = has(____id146, 1)
        __name23 = has(____id146, 2)
        __body78 = cut(____id146, 3)
        add(__forms7, join([[__x865, ["%as", __kind2, __name23]]], __body78))
      else:
        if __x865 == "except":
          ____id147 = __body77
          __kind3 = has(____id147, 0)
          __body79 = cut(____id147, 1)
          add(__forms7, join([[__x865, __kind3]], __body79))
        else:
          raise Exception("Unknown try clause")
    ____i15 = ____i15 + 1
  return join(["%cases", ["try", __x859]], __forms7, [__fin1])

setenv("try", macro=__try__macro)
def __errsafe__macro(x=None, L_else=None):
  if nil63(L_else):
    L_else = "nil"
  __ok7 = unique("ok")
  __v14 = unique("v")
  return ["let", [[__ok7, __v14], ["guard", x]], ["if", __ok7, __v14, L_else]]

setenv("errsafe", macro=__errsafe__macro)
def __dbg__macro():
  ____x888 = object(["target", ["do"]])
  ____x888["py"] = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]]
  return ____x888

setenv("dbg", macro=__dbg__macro)
def __see__macro(form=None):
  __form11 = expand(form)
  L_print(compile(expand(["%set", "lumen-result", __form11])))
  return __form11

setenv("see", macro=__see__macro)
def __class__macro(name=None, *_args, **_keys):
  ____r198 = unstash(_args, _keys)
  __name25 = destash33(name, ____r198)
  ____id149 = ____r198
  __body81 = cut(____id149, 0)
  return join(["%block", "class", __name25], __body81)

setenv("class", macro=__class__macro)
def __expansion__transformer(__x899=None, form=None):
  ____id150 = __x899
  __expansion = has(____id150, 0)
  return form

setenv("expansion", transformer=__expansion__transformer)
def __compose__transformer(__x900=None, *_args, **_keys):
  ____r200 = unstash(_args, _keys)
  ____x900 = destash33(__x900, ____r200)
  ____id151 = ____x900
  __compose = has(____id151, 0)
  __fns = cut(____id151, 1)
  ____id152 = ____r200
  __body82 = cut(____id152, 0)
  __e20 = None
  if none63(__fns):
    __e20 = unquote_splicing(__body82)
  else:
    __e21 = None
    if one63(__fns):
      __e21 = join(__fns, __body82)
    else:
      __e21 = [join([__compose], almost(__fns)), join([last(__fns)], __body82)]
    __e20 = __e21
  return macroexpand(__e20)

setenv("compose", transformer=__compose__transformer)
def __complement__transformer(__x904=None, *_args, **_keys):
  ____r201 = unstash(_args, _keys)
  ____x904 = destash33(__x904, ____r201)
  ____id153 = ____x904
  __complement = has(____id153, 0)
  __form12 = has(____id153, 1)
  ____id154 = ____r201
  __body83 = cut(____id154, 0)
  __e22 = None
  if hd63(__form12, "complement"):
    __e22 = join([__form12[1]], __body83)
  else:
    __e22 = ["no", join([__form12], __body83)]
  return macroexpand(__e22)

setenv("complement", transformer=__complement__transformer)
def __L_37brackets__transformer(__x908=None, *_args, **_keys):
  ____r202 = unstash(_args, _keys)
  ____x908 = destash33(__x908, ____r202)
  ____id155 = ____x908
  __L_37brackets = has(____id155, 0)
  ____id156 = ____r202
  __body84 = cut(____id156, 0)
  return macroexpand(["%function", ["%1", "%2"], ["let-symbol", ["_", "%1"], __body84]])

setenv("%brackets", transformer=__L_37brackets__transformer)
def __L_37braces__transformer(__x913=None, *_args, **_keys):
  ____r203 = unstash(_args, _keys)
  ____x913 = destash33(__x913, ____r203)
  ____id157 = ____x913
  __L_37braces = has(____id157, 0)
  ____id158 = ____r203
  __body85 = cut(____id158, 0)
  return macroexpand(join(["%object"], __body85))

setenv("%braces", transformer=__L_37braces__transformer)
