from .runtime import *
from .compiler import *
def __quote__macro(form=None):
  return quoted(form)

setenv("quote", macro=__quote__macro)
def __quasiquote__macro(form=None):
  return quasiexpand(form, 1)

setenv("quasiquote", macro=__quasiquote__macro)
def __set__macro(*_args, **_keys):
  __args1 = unstash(_args, _keys)
  def __f2(__x7=None):
    ____id1 = __x7
    __lh1 = has(____id1, 0)
    __rh1 = has(____id1, 1)
    __lh1 = macroexpand(__lh1)
    if not atom63(__lh1) and hd(__lh1) == "has":
      return ["%set", join(["%get"], tl(__lh1)), __rh1]
    else:
      return ["%set", __lh1, __rh1]
  return join(["%do"], map(__f2, pair(__args1)))

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
  __body2 = unstash(_args, _keys)
  if one63(__body2) and (hd63(__body2, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_args"
  else:
    if L_35(__body2) > 2 and (__body2[1] == "for" and __body2[3] == "in"):
      ____id5 = __body2
      __expr2 = has(____id5, 0)
      __body3 = cut(____id5, 1)
      __comps1 = []
      __cond1 = None
      while L_35(__body3) > 2 and (__body3[0] == "for" and __body3[2] == "in"):
        ____id6 = __body3
        ___for1 = has(____id6, 0)
        __names1 = has(____id6, 1)
        ___in1 = has(____id6, 2)
        __l2 = has(____id6, 3)
        __body12 = cut(____id6, 4)
        add(__comps1, [__names1, __l2])
        __body3 = __body12
      if hd(__body3) == "if":
        ____id7 = __body3
        ___if1 = has(____id7, 0)
        __expr3 = has(____id7, 1)
        __cond1 = __expr3
      return ["%list", __expr2, __comps1, __cond1]
    else:
      __x33 = unique("x")
      __l3 = {}
      __forms1 = []
      ____o1 = __body2
      __k2 = None
      for __k2 in indices(____o1):
        __v1 = ____o1[__k2]
        if number63(__k2):
          __l3[__k2] = __v1
        else:
          add(__forms1, ["%set", ["%get", __x33, ["quote", __k2]], __v1])
      if some63(__forms1):
        return join(["let", __x33, ["object", join(["%array"], __l3)]], __forms1, [__x33])
      else:
        return join(["%array"], __l3)

setenv("list", macro=__list__macro)
def __if__macro(*_args, **_keys):
  __branches1 = unstash(_args, _keys)
  return hd(expand_if(__branches1))

setenv("if", macro=__if__macro)
def __case__macro(expr=None, *_args, **_keys):
  ____r13 = unstash(_args, _keys)
  __expr5 = destash33(expr, ____r13)
  ____id10 = ____r13
  __e12 = None
  if nil63(has(____id10, "cmp")):
    __e12 = "="
  else:
    __e12 = has(____id10, "cmp")
  __cmp1 = __e12
  __clauses1 = cut(____id10, 0)
  __x55 = unique("x")
  def __f3(_=None):
    return [__cmp1, _, __x55]
  __eq1 = __f3
  def __f4(__x57=None):
    ____id11 = __x57
    __a1 = has(____id11, 0)
    __b1 = has(____id11, 1)
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
  __cl1 = __f4
  return ["let", __x55, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))]

setenv("case", macro=__case__macro)
def __of__macro(x=None, *_args, **_keys):
  ____r17 = unstash(_args, _keys)
  __x69 = destash33(x, ____r17)
  ____id13 = ____r17
  __values1 = cut(____id13, 0)
  return join(["case", __x69, __values1, True, False], props(__values1))

setenv("of", macro=__of__macro)
def __when__macro(cond=None, *_args, **_keys):
  ____r19 = unstash(_args, _keys)
  __cond3 = destash33(cond, ____r19)
  ____id15 = ____r19
  __body5 = cut(____id15, 0)
  return ["%if", __cond3, join(["%do"], __body5)]

setenv("when", macro=__when__macro)
def __unless__macro(cond=None, *_args, **_keys):
  ____r21 = unstash(_args, _keys)
  __cond5 = destash33(cond, ____r21)
  ____id17 = ____r21
  __body7 = cut(____id17, 0)
  return ["%if", ["%not", __cond5], join(["%do"], __body7)]

setenv("unless", macro=__unless__macro)
def __obj__macro(*_args, **_keys):
  __body10 = unstash(_args, _keys)
  if one63(__body10) and (hd63(__body10, "...") and has(setenv("target", toplevel=True), "value") == "py"):
    return "_keys"
  else:
    if L_35(__body10) > 2 and (__body10[1] == "for" and __body10[3] == "in"):
      ____id21 = __body10
      __expr8 = has(____id21, 0)
      __body111 = cut(____id21, 1)
      __comps3 = []
      __cond7 = None
      while L_35(__body111) > 2 and (__body111[0] == "for" and __body111[2] == "in"):
        ____id22 = __body111
        ___for3 = has(____id22, 0)
        __names3 = has(____id22, 1)
        ___in3 = has(____id22, 2)
        __l5 = has(____id22, 3)
        __body14 = cut(____id22, 4)
        add(__comps3, [__names3, __l5])
        __body111 = __body14
      if hd(__body111) == "if":
        ____id23 = __body111
        ___if3 = has(____id23, 0)
        __expr9 = has(____id23, 1)
        __cond7 = __expr9
      if list63(__expr8) and hd63(__expr8, ","):
        __expr8 = join([":"], tl(__expr8))
      ____x90 = object(["%list", __expr8, __comps3, __cond7])
      ____x90["kind"] = "object"
      return ____x90
    else:
      def __f5(x=None):
        return x
      return join(["%object"], mapo(__f5, __body10))

setenv("obj", macro=__obj__macro)
def __let__macro(bs=None, *_args, **_keys):
  ____r25 = unstash(_args, _keys)
  __bs11 = destash33(bs, ____r25)
  ____id28 = ____r25
  __body131 = cut(____id28, 0)
  if atom63(__bs11) or hd63(__bs11, ","):
    return join(["let", [__bs11, hd(__body131)]], tl(__body131))
  else:
    if none63(__bs11):
      return join(["%do"], __body131)
    else:
      ____id29 = __bs11
      __lh3 = has(____id29, 0)
      __rh3 = has(____id29, 1)
      __bs21 = cut(____id29, 2)
      ____id30 = bind(__lh3, __rh3)
      __id31 = has(____id30, 0)
      __val1 = has(____id30, 1)
      __bs12 = cut(____id30, 2)
      __renames1 = []
      if not id_literal63(__id31):
        __id121 = unique(__id31)
        __renames1 = [__id31, __id121]
        __id31 = __id121
      return ["%do", ["%local", __id31, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body131)]]

setenv("let", macro=__let__macro)
def __with__macro(x=None, v=None, *_args, **_keys):
  ____r27 = unstash(_args, _keys)
  __x117 = destash33(x, ____r27)
  __v3 = destash33(v, ____r27)
  ____id33 = ____r27
  __body15 = cut(____id33, 0)
  if __v3 == "as":
    return join(["%with", ["%as", __x117, hd(__body15)]], tl(__body15))
  else:
    if not atom63(__x117) or has(__body15, "async"):
      return join(["%with", __x117, __v3], __body15)
    else:
      return join(["let", [__x117, __v3]], __body15, [__x117])

setenv("with", macro=__with__macro)
def __let_when__macro(x=None, v=None, *_args, **_keys):
  ____r29 = unstash(_args, _keys)
  __x131 = destash33(x, ____r29)
  __v5 = destash33(v, ____r29)
  ____id35 = ____r29
  __body17 = cut(____id35, 0)
  __y1 = unique("y")
  return ["let", __y1, __v5, ["when", ["yes", __y1], join(["let", [__x131, __y1]], __body17)]]

setenv("let-when", macro=__let_when__macro)
def __define_macro__macro(name=None, args=None, *_args, **_keys):
  ____r31 = unstash(_args, _keys)
  __name1 = destash33(name, ____r31)
  __args3 = destash33(args, ____r31)
  ____id38 = ____r31
  __body19 = cut(____id38, 0)
  __id39 = unique(cat(__name1, "--macro"))
  ____x144 = object(["setenv", ["quote", __name1]])
  ____x144["macro"] = __id39
  __form1 = ["do", join(["define", __id39, __args3], __body19), ____x144]
  eval(__form1)
  return __form1

setenv("define-macro", macro=__define_macro__macro)
def __define_special__macro(name=None, args=None, *_args, **_keys):
  ____r33 = unstash(_args, _keys)
  __name3 = destash33(name, ____r33)
  __args5 = destash33(args, ____r33)
  ____id42 = ____r33
  __body21 = cut(____id42, 0)
  __id43 = unique(cat(__name3, "--special"))
  ____x153 = object(["setenv", ["quote", __name3]])
  ____x153["special"] = __id43
  __form3 = ["do", join(["define", __id43, __args5], __body21), join(____x153, props(__body21))]
  eval(__form3)
  return __form3

setenv("define-special", macro=__define_special__macro)
def __define_symbol__macro(name=None, expansion=None):
  setenv(name, symbol=expansion)
  ____x158 = object(["setenv", ["quote", name]])
  ____x158["symbol"] = ["quote", expansion]
  return ____x158

setenv("define-symbol", macro=__define_symbol__macro)
def __define_reader__macro(__x167=None, *_args, **_keys):
  ____r37 = unstash(_args, _keys)
  ____x167 = destash33(__x167, ____r37)
  ____id46 = ____x167
  __char1 = has(____id46, 0)
  __s1 = has(____id46, 1)
  ____id47 = ____r37
  __body23 = cut(____id47, 0)
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s1]], __body23)]

setenv("define-reader", macro=__define_reader__macro)
def __define__macro(name=None, x=None, *_args, **_keys):
  ____r39 = unstash(_args, _keys)
  __name5 = destash33(name, ____r39)
  __x176 = destash33(x, ____r39)
  ____id49 = ____r39
  __body25 = cut(____id49, 0)
  setenv(__name5, variable=True)
  if some63(__body25):
    return join(["%local-function", __name5], bind42(__x176, __body25), props(__body25))
  else:
    return join(["%local", __name5, __x176], props(__body25))

setenv("define", macro=__define__macro)
def __define_global__macro(name=None, x=None, *_args, **_keys):
  ____r41 = unstash(_args, _keys)
  __name7 = destash33(name, ____r41)
  __x183 = destash33(x, ____r41)
  ____id51 = ____r41
  __body27 = cut(____id51, 0)
  setenv(__name7, toplevel=True, variable=True)
  if some63(__body27):
    return join(["%global-function", __name7], bind42(__x183, __body27), props(__body27))
  else:
    return join(["set", __name7, __x183], props(__body27))

setenv("define-global", macro=__define_global__macro)
def __get_value__macro(x=None):
  ____x190 = object(["setenv", x])
  ____x190["toplevel"] = True
  return ["has", ____x190, ["quote", "value"]]

setenv("get-value", macro=__get_value__macro)
def __define_constant__macro(name=None, x=None):
  ____x201 = object(["setenv", ["quote", name]])
  ____x201["toplevel"] = True
  ____x201["value"] = either(x, ["get-value", ["quote", name]])
  return ["%do", ____x201, ["define-symbol", name, ["get-value", ["quote", name]]]]

setenv("define-constant", macro=__define_constant__macro)
def __define_variable__macro(name=None, x=None):
  if is63(x):
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]]
  else:
    return ["define-constant", name]

setenv("define-variable", macro=__define_variable__macro)
def __after__macro(x=None, *_args, **_keys):
  ____r50 = unstash(_args, _keys)
  __x230 = destash33(x, ____r50)
  ____id53 = ____r50
  __body29 = cut(____id53, 0)
  __ok1 = unique("ok")
  __r51 = unique("r")
  ____x231 = object(["target", ["try", __x230, join(["finally"], __body29)]])
  ____x231["lua"] = join(["let", [[__ok1, __r51], ["guard", __x230]]], __body29, [["if", __ok1, __r51, ["throw", __r51]]])
  return ____x231

setenv("after", macro=__after__macro)
def __with_frame__macro(*_args, **_keys):
  __body31 = unstash(_args, _keys)
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body31), ["drop", "environment"]]]

setenv("with-frame", macro=__with_frame__macro)
def __with_values__macro(*_args, **_keys):
  __body33 = unstash(_args, _keys)
  __forms3 = []
  ____o3 = __body33
  __k5 = None
  for __k5 in indices(____o3):
    __v7 = ____o3[__k5]
    if not number63(__k5):
      ____x259 = object(["setenv", ["quote", __k5]])
      ____x259["value"] = __v7
      add(__forms3, ____x259)
  return join(["with-frame"], __forms3)

setenv("with-values", macro=__with_values__macro)
def __with_bindings__macro(__x267=None, *_args, **_keys):
  ____r53 = unstash(_args, _keys)
  ____x267 = destash33(__x267, ____r53)
  ____id56 = ____x267
  __names5 = has(____id56, 0)
  ____id57 = ____r53
  __body35 = cut(____id57, 0)
  __x268 = unique("x")
  ____x271 = object(["setenv", __x268])
  ____x271["variable"] = True
  return join(["with-frame", ["each", __x268, __names5, ____x271]], __body35)

setenv("with-bindings", macro=__with_bindings__macro)
def __let_macro__macro(definitions=None, *_args, **_keys):
  ____r58 = unstash(_args, _keys)
  __definitions1 = destash33(definitions, ____r58)
  ____id59 = ____r58
  __body37 = cut(____id59, 0)
  add(environment, {})
  ____r60 = None
  try:
    def __f6(m=None):
      return macroexpand(join(["define-macro"], m))
    map(__f6, __definitions1)
    ____r60 = join(["%do"], macroexpand(__body37))
  finally:
    drop(environment)
  return ____r60

setenv("let-macro", macro=__let_macro__macro)
def __let_symbol__macro(expansions=None, *_args, **_keys):
  ____r66 = unstash(_args, _keys)
  __expansions1 = destash33(expansions, ____r66)
  ____id62 = ____r66
  __body39 = cut(____id62, 0)
  add(environment, {})
  ____r68 = None
  try:
    def __f7(__x281=None):
      ____id63 = __x281
      __name9 = has(____id63, 0)
      __exp1 = has(____id63, 1)
      return macroexpand(["define-symbol", __name9, __exp1])
    map(__f7, pair(__expansions1))
    ____r68 = join(["%do"], macroexpand(__body39))
  finally:
    drop(environment)
  return ____r68

setenv("let-symbol", macro=__let_symbol__macro)
def __let_unique__macro(names=None, *_args, **_keys):
  ____r72 = unstash(_args, _keys)
  __names7 = destash33(names, ____r72)
  ____id65 = ____r72
  __body41 = cut(____id65, 0)
  def __f8(n=None):
    return [n, ["unique", ["quote", n]]]
  __bs3 = map(__f8, __names7)
  return join(["let", apply(join, __bs3)], __body41)

setenv("let-unique", macro=__let_unique__macro)
def __fn__macro(args=None, *_args, **_keys):
  ____r75 = unstash(_args, _keys)
  __args7 = destash33(args, ____r75)
  ____id67 = ____r75
  __body43 = cut(____id67, 0)
  return join(["%function"], bind42(__args7, __body43), props(__body43))

setenv("fn", macro=__fn__macro)
def __apply__macro(f=None, *_args, **_keys):
  ____r77 = unstash(_args, _keys)
  __f1 = destash33(f, ____r77)
  ____id69 = ____r77
  __args9 = cut(____id69, 0)
  if L_35(__args9) > 1:
    return ["%call", "apply", __f1, ["join", join(["list"], almost(__args9)), last(__args9), join(["list"], props(__args9))]]
  else:
    if props63(__args9):
      return ["%call", "apply", __f1, join(["join"], __args9, [join(["list"], props(__args9))])]
    else:
      return join(["%call", "apply", __f1], __args9)

setenv("apply", macro=__apply__macro)
def __guard__macro(expr=None):
  ____x345 = object(["target", [["%function", join(), ["%try", ["list", True, expr]]]]])
  ____x357 = object(["obj"])
  ____x357["stack"] = [["idx", "debug", "traceback"]]
  ____x357["message"] = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]]
  ____x345["lua"] = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x357]]]]
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x345]

setenv("guard", macro=__guard__macro)
def __each__macro(x=None, t=None, *_args, **_keys):
  ____r81 = unstash(_args, _keys)
  __x385 = destash33(x, ____r81)
  __t1 = destash33(t, ____r81)
  ____id72 = ____r81
  __body45 = cut(____id72, 0)
  __o5 = unique("o")
  __n5 = unique("n")
  __i5 = unique("i")
  __e13 = None
  if atom63(__x385):
    __e13 = [__i5, __x385]
  else:
    __e14 = None
    if L_35(__x385) > 1:
      __e14 = __x385
    else:
      __e14 = [__i5, hd(__x385)]
    __e13 = __e14
  ____id73 = __e13
  __k7 = has(____id73, 0)
  __v9 = has(____id73, 1)
  ____x391 = object(["target", __o5])
  ____x391["py"] = ["indices", __o5]
  __e15 = None
  if has(setenv("target", toplevel=True), "value") == "lua" or has(setenv("target", toplevel=True), "value") == "py":
    __e15 = __body45
  else:
    __e15 = [join(["let", __k7, ["if", ["numeric?", __k7], ["parseInt", __k7], __k7]], __body45)]
  return ["let", [__o5, __t1, __k7, "nil"], join(["%for", ____x391, __k7], props(__body45), [join(["let", [__v9, ["%get", __o5, __k7]]], __e15)])]

setenv("each", macro=__each__macro)
def __for__macro(i=None, to=None, *_args, **_keys):
  ____r83 = unstash(_args, _keys)
  __i7 = destash33(i, ____r83)
  __to1 = destash33(to, ____r83)
  ____id75 = ____r83
  __body47 = cut(____id75, 0)
  if __to1 == "in":
    return join(["%for", hd(__body47), __i7, join(["%do"], tl(__body47))], props(__body47))
  else:
    return ["let", __i7, 0, join(["while", ["<", __i7, __to1]], __body47, [["inc", __i7]])]

setenv("for", macro=__for__macro)
def __step__macro(v=None, t=None, *_args, **_keys):
  ____r85 = unstash(_args, _keys)
  __v11 = destash33(v, ____r85)
  __t3 = destash33(t, ____r85)
  ____id77 = ____r85
  __body49 = cut(____id77, 0)
  __x426 = unique("x")
  __i9 = unique("i")
  return ["let", [__x426, __t3], ["for", __i9, ["#", __x426], join(["let", [__v11, ["at", __x426, __i9]]], __body49)]]

setenv("step", macro=__step__macro)
def __set_of__macro(*_args, **_keys):
  __xs1 = unstash(_args, _keys)
  __l7 = {}
  ____o7 = __xs1
  ____i11 = None
  for ____i11 in indices(____o7):
    __x437 = ____o7[____i11]
    __l7[__x437] = True
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
  ____r91 = unstash(_args, _keys)
  __a3 = destash33(a, ____r91)
  ____id79 = ____r91
  __bs5 = cut(____id79, 0)
  return ["set", __a3, join(["join", __a3], __bs5)]

setenv("join!", macro=__join33__macro)
def __cat33__macro(a=None, *_args, **_keys):
  ____r93 = unstash(_args, _keys)
  __a5 = destash33(a, ____r93)
  ____id81 = ____r93
  __bs7 = cut(____id81, 0)
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
  __x467 = unique("x")
  return ["%do", ["inc", "indent-level"], ["with", __x467, form, ["dec", "indent-level"]]]

setenv("with-indent", macro=__with_indent__macro)
def __export__macro(*_args, **_keys):
  __names9 = unstash(_args, _keys)
  def __f9(k=None):
    if k == compile(k):
      return ["%set", ["idx", "exports", k], k]
    else:
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]]
  __forms5 = map(__f9, __names9)
  if has(setenv("target", toplevel=True), "value") == "js":
    return join(["%do"], __forms5)
  else:
    if has(setenv("target", toplevel=True), "value") == "lua":
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]])

setenv("export", macro=__export__macro)
def __when_compiling__macro(*_args, **_keys):
  __body51 = unstash(_args, _keys)
  return eval(join(["%do"], __body51))

setenv("when-compiling", macro=__when_compiling__macro)
def __during_compilation__macro(*_args, **_keys):
  __body53 = unstash(_args, _keys)
  __form5 = join(["%do"], __body53)
  eval(__form5)
  return __form5

setenv("during-compilation", macro=__during_compilation__macro)
def __def__macro(name=None, *_args, **_keys):
  ____r103 = unstash(_args, _keys)
  __name11 = destash33(name, ____r103)
  ____id83 = ____r103
  __body55 = cut(____id83, 0)
  return join(["define-global", __name11], __body55)

setenv("def", macro=__def__macro)
def __mac__macro(name=None, *_args, **_keys):
  ____r105 = unstash(_args, _keys)
  __name13 = destash33(name, ____r105)
  ____id85 = ____r105
  __body57 = cut(____id85, 0)
  return join(["define-macro", __name13], __body57)

setenv("mac", macro=__mac__macro)
def __defconst__macro(name=None, *_args, **_keys):
  ____r107 = unstash(_args, _keys)
  __name15 = destash33(name, ____r107)
  ____id87 = ____r107
  __value1 = cut(____id87, 0)
  return join(["def", __name15], __value1)

setenv("defconst", macro=__defconst__macro)
def __undefined63__macro(name=None):
  ____x525 = object(["target"])
  ____x525["js"] = ["=", ["typeof", name], "\"undefined\""]
  ____x525["lua"] = ["=", ["idx", "_G", name], "nil"]
  ____x525["py"] = ["not", ["%in", ["quote", compile(name)], ["globals"]]]
  return ____x525

setenv("undefined?", macro=__undefined63__macro)
def __defvar__macro(name=None, *_args, **_keys):
  ____r111 = unstash(_args, _keys)
  __name17 = destash33(name, ____r111)
  ____id89 = ____r111
  __value3 = cut(____id89, 0)
  ____x542 = object(["target"])
  ____x542["py"] = ["global", __name17]
  return ["when", ["undefined?", __name17], ____x542, join(["defconst", __name17], __value3)]

setenv("defvar", macro=__defvar__macro)
def __async__macro(keyword=None, *_args, **_keys):
  ____r113 = unstash(_args, _keys)
  __keyword1 = destash33(keyword, ____r113)
  ____id91 = ____r113
  __body59 = cut(____id91, 0)
  ____x547 = object([__keyword1])
  ____x547["async"] = True
  return join(____x547, __body59)

setenv("async", macro=__async__macro)
def __L_37read_from_file__macro(name=None):
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]]

setenv("%read-from-file", macro=__L_37read_from_file__macro)
def __the__macro(name=None):
  return ["getenv", ["quote", name], ["quote", "value"]]

setenv("the", macro=__the__macro)
def __cat__macro(a=None, *_args, **_keys):
  ____r119 = unstash(_args, _keys)
  __a7 = destash33(a, ____r119)
  ____id93 = ____r119
  __bs9 = cut(____id93, 0)
  if nil63(__a7):
    return ""
  else:
    if none63(__bs9):
      return __a7
    else:
      if one63(__bs9):
        ____x572 = object(["target", join(["%cat", __a7], __bs9)])
        ____x572["py"] = join(["%call", "cat", __a7], __bs9)
        return ____x572
      else:
        ____x575 = object(["target", ["%cat", __a7, join(["cat"], __bs9)]])
        ____x575["py"] = join(["%call", "cat", __a7], __bs9)
        return ____x575

setenv("cat", macro=__cat__macro)
def __L_43__macro(*_args, **_keys):
  __args11 = unstash(_args, _keys)
  if none63(__args11):
    return 0
  else:
    if one63(__args11):
      return hd(__args11)
    else:
      return join(["%add"], __args11)

setenv("+", macro=__L_43__macro)
def __L___macro(*_args, **_keys):
  __args13 = unstash(_args, _keys)
  if none63(__args13):
    return 0
  else:
    if one63(__args13):
      return ["%unm", hd(__args13)]
    else:
      return join(["%sub"], __args13)

setenv("-", macro=__L___macro)
def __L_42__macro(*_args, **_keys):
  __args15 = unstash(_args, _keys)
  if none63(__args15):
    return 1
  else:
    if one63(__args15):
      return hd(__args15)
    else:
      return join(["%mul"], __args15)

setenv("*", macro=__L_42__macro)
def __L_47__macro(*_args, **_keys):
  __args17 = unstash(_args, _keys)
  if none63(__args17):
    return 1
  else:
    if one63(__args17):
      return hd(__args17)
    else:
      return join(["%div"], __args17)

setenv("/", macro=__L_47__macro)
def __L_4747__macro(*_args, **_keys):
  __args19 = unstash(_args, _keys)
  if none63(__args19):
    return 1
  else:
    if one63(__args19):
      return hd(__args19)
    else:
      return join(["%idiv"], __args19)

setenv("//", macro=__L_4747__macro)
def __L_37__macro(*_args, **_keys):
  __args21 = unstash(_args, _keys)
  if none63(__args21):
    return 0
  else:
    if one63(__args21):
      return hd(__args21)
    else:
      return join(["%mod"], __args21)

setenv("%", macro=__L_37__macro)
def __L_60__macro(a=None, *_args, **_keys):
  ____r121 = unstash(_args, _keys)
  __a9 = destash33(a, ____r121)
  ____id95 = ____r121
  __bs111 = cut(____id95, 0)
  if none63(__bs111):
    return True
  else:
    if one63(__bs111):
      return join(["%lt", __a9], __bs111)
    else:
      return ["%and", ["%lt", __a9, hd(__bs111)], join(["<"], __bs111)]

setenv("<", macro=__L_60__macro)
def __L_6061__macro(a=None, *_args, **_keys):
  ____r123 = unstash(_args, _keys)
  __a11 = destash33(a, ____r123)
  ____id97 = ____r123
  __bs13 = cut(____id97, 0)
  if none63(__bs13):
    return True
  else:
    if one63(__bs13):
      return join(["%le", __a11], __bs13)
    else:
      return ["%and", ["%le", __a11, hd(__bs13)], join(["<="], __bs13)]

setenv("<=", macro=__L_6061__macro)
def __L_61__macro(a=None, *_args, **_keys):
  ____r125 = unstash(_args, _keys)
  __a13 = destash33(a, ____r125)
  ____id99 = ____r125
  __bs15 = cut(____id99, 0)
  if none63(__bs15):
    return True
  else:
    if one63(__bs15):
      return join(["%eq", __a13], __bs15)
    else:
      return ["%and", ["%eq", __a13, hd(__bs15)], join(["="], __bs15)]

setenv("=", macro=__L_61__macro)
def __L_6261__macro(a=None, *_args, **_keys):
  ____r127 = unstash(_args, _keys)
  __a15 = destash33(a, ____r127)
  ____id101 = ____r127
  __bs17 = cut(____id101, 0)
  if none63(__bs17):
    return True
  else:
    if one63(__bs17):
      return join(["%ge", __a15], __bs17)
    else:
      return ["%and", ["%ge", __a15, hd(__bs17)], join([">="], __bs17)]

setenv(">=", macro=__L_6261__macro)
def __L_62__macro(a=None, *_args, **_keys):
  ____r129 = unstash(_args, _keys)
  __a17 = destash33(a, ____r129)
  ____id103 = ____r129
  __bs19 = cut(____id103, 0)
  if none63(__bs19):
    return True
  else:
    if one63(__bs19):
      return join(["%gt", __a17], __bs19)
    else:
      return ["%and", ["%gt", __a17, hd(__bs19)], join([">"], __bs19)]

setenv(">", macro=__L_62__macro)
def __not__macro(*_args, **_keys):
  __args23 = unstash(_args, _keys)
  if none63(__args23):
    return False
  else:
    if one63(__args23):
      return join(["%not"], __args23)
    else:
      return ["%and", ["%not", hd(__args23)], join(["not"], tl(__args23))]

setenv("not", macro=__not__macro)
def __and__macro(a=None, *_args, **_keys):
  ____r131 = unstash(_args, _keys)
  __a19 = destash33(a, ____r131)
  ____id105 = ____r131
  __bs211 = cut(____id105, 0)
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
  ____r133 = unstash(_args, _keys)
  __a21 = destash33(a, ____r133)
  ____id107 = ____r133
  __bs23 = cut(____id107, 0)
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
  __args25 = unstash(_args, _keys)
  return join(["%break"], __args25)

setenv("break", macro=__break__macro)
def __return__macro(*_args, **_keys):
  __args27 = unstash(_args, _keys)
  return join(["%return"], __args27)

setenv("return", macro=__return__macro)
def __while__macro(c=None, *_args, **_keys):
  ____r135 = unstash(_args, _keys)
  __c1 = destash33(c, ____r135)
  ____id109 = ____r135
  __body61 = cut(____id109, 0)
  return join(["%while", __c1], __body61)

setenv("while", macro=__while__macro)
def __do__macro(*_args, **_keys):
  __body63 = unstash(_args, _keys)
  return join(["%do"], __body63)

setenv("do", macro=__do__macro)
def __get__macro(*_args, **_keys):
  __args29 = unstash(_args, _keys)
  return join(["%get"], __args29)

setenv("get", macro=__get__macro)
def __idx__macro(*_args, **_keys):
  __args31 = unstash(_args, _keys)
  return join(["%idx"], __args31)

setenv("idx", macro=__idx__macro)
def __new__macro(*_args, **_keys):
  __args33 = unstash(_args, _keys)
  return join(["%new"], __args33)

setenv("new", macro=__new__macro)
def __typeof__macro(*_args, **_keys):
  __args35 = unstash(_args, _keys)
  return join(["%typeof"], __args35)

setenv("typeof", macro=__typeof__macro)
def __error__macro(*_args, **_keys):
  __args37 = unstash(_args, _keys)
  return join(["%error"], __args37)

setenv("error", macro=__error__macro)
def __throw__macro(*_args, **_keys):
  __args39 = unstash(_args, _keys)
  return join(["%throw"], __args39)

setenv("throw", macro=__throw__macro)
def __raise__macro(*_args, **_keys):
  __args41 = unstash(_args, _keys)
  return join(["%throw"], __args41)

setenv("raise", macro=__raise__macro)
def __is__macro(*_args, **_keys):
  __args43 = unstash(_args, _keys)
  ____x704 = object(["target", join(["="], __args43)])
  ____x704["py"] = join(["%is"], __args43)
  return ____x704

setenv("is", macro=__is__macro)
def __in__macro(*_args, **_keys):
  __args45 = unstash(_args, _keys)
  return join(["%in"], __args45)

setenv("in", macro=__in__macro)
def __as__macro(*_args, **_keys):
  __args47 = unstash(_args, _keys)
  return join(["%as"], __args47)

setenv("as", macro=__as__macro)
def __L_37expand_case__macro(x=None, *_args, **_keys):
  ____r137 = unstash(_args, _keys)
  __x719 = destash33(x, ____r137)
  ____id112 = ____r137
  __body65 = cut(____id112, 0)
  __e18 = None
  if atom63(__x719):
    __e18 = [__x719]
  else:
    __e18 = __x719
  ____id113 = __e18
  __a23 = has(____id113, 0)
  __bs25 = cut(____id113, 1)
  __e19 = None
  if none63(__bs25):
    __e19 = [["%literal"]]
  else:
    __e19 = __bs25
  return join(["%block", __a23], __e19, __body65)

setenv("%expand-case", macro=__L_37expand_case__macro)
def __L_37cases__macro(*_args, **_keys):
  __args49 = unstash(_args, _keys)
  if none63(__args49):
    return ["do"]
  else:
    if one63(__args49):
      return join(["%expand-case"], hd(__args49))
    else:
      __r140 = unique("r")
      def __f10(__x738=None):
        ____id115 = __x738
        __x739 = has(____id115, 0)
        __body67 = cut(____id115, 1)
        return ["%expand-case", __x739, ["%set", __r140, join(["%do"], __body67)]]
      return join(["with", __r140, "nil"], map(__f10, almost(__args49)), [join(["%expand-case"], last(__args49))])

setenv("%cases", macro=__L_37cases__macro)
def __try__macro(x=None, *_args, **_keys):
  ____r143 = unstash(_args, _keys)
  __x759 = destash33(x, ____r143)
  ____id120 = ____r143
  __cases1 = cut(____id120, 0)
  __fin1 = ["finally"]
  ____o9 = __cases1
  ____i14 = None
  for ____i14 in indices(____o9):
    __x761 = ____o9[____i14]
    if hd63(__x761, "finally"):
      __fin1 = __x761
  __forms7 = []
  ____x764 = __cases1
  ____i15 = 0
  while ____i15 < L_35(____x764):
    ____id1211 = ____x764[____i15]
    __x765 = has(____id1211, 0)
    __body71 = cut(____id1211, 1)
    if __x765 == "finally":
      pass
    else:
      if __x765 == "except" and has(__body71, 1) == "as":
        ____id122 = __body71
        __kind2 = has(____id122, 0)
        ___1 = has(____id122, 1)
        __name19 = has(____id122, 2)
        __body72 = cut(____id122, 3)
        add(__forms7, join([[__x765, ["%as", __kind2, __name19]]], __body72))
      else:
        if __x765 == "except":
          ____id123 = __body71
          __kind3 = has(____id123, 0)
          __body73 = cut(____id123, 1)
          add(__forms7, join([[__x765, __kind3]], __body73))
        else:
          raise Exception("Unknown try clause")
    ____i15 = ____i15 + 1
  return join(["%cases", ["try", __x759]], __forms7, [__fin1])

setenv("try", macro=__try__macro)
def __errsafe__macro(x=None, L_else=None):
  if nil63(L_else):
    L_else = "nil"
  __ok7 = unique("ok")
  __v13 = unique("v")
  return ["let", [[__ok7, __v13], ["guard", x]], ["if", __ok7, __v13, L_else]]

setenv("errsafe", macro=__errsafe__macro)
def __dbg__macro():
  ____x788 = object(["target", ["do"]])
  ____x788["py"] = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]]
  return ____x788

setenv("dbg", macro=__dbg__macro)
def __see__macro(form=None):
  __form7 = expand(form)
  L_print(compile(expand(["%set", "lumen-result", __form7])))
  return __form7

setenv("see", macro=__see__macro)
