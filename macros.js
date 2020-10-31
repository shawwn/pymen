var __quote__macro = function (form) {
  return quoted(form);
};
setenv("quote", {
  _stash: true,
  macro: __quote__macro
});
var __quasiquote__macro = function (form) {
  return quasiexpand(form, 1);
};
setenv("quasiquote", {
  _stash: true,
  macro: __quasiquote__macro
});
var __set__macro = function (..._42args) {
  var __args1 = unstash([..._42args]);
  return join(["%do"], map(function (__x8) {
    var ____id1 = __x8;
    var __lh1 = has(____id1, 0);
    var __rh1 = has(____id1, 1);
    __lh1 = macroexpand(__lh1);
    if (! atom63(__lh1) && hd(__lh1) === "has") {
      return ["%set", join(["%get"], tl(__lh1)), __rh1];
    } else {
      return ["%set", __lh1, __rh1];
    }
  }, pair(__args1)));
};
setenv("set", {
  _stash: true,
  macro: __set__macro
});
var __at__macro = function (l, i) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && number63(i)) {
    i = i + 1;
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      i = ["+", i, 1];
    }
  }
  return ["%get", l, i];
};
setenv("at", {
  _stash: true,
  macro: __at__macro
});
var __wipe__macro = function (place) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    return ["set", place, "nil"];
  } else {
    return ["%delete", place];
  }
};
setenv("wipe", {
  _stash: true,
  macro: __wipe__macro
});
var __list__macro = function (..._42args) {
  var __body2 = unstash([..._42args]);
  if (one63(__body2) && (hd63(__body2, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_args";
  } else {
    if (_35(__body2) > 2 && (__body2[1] === "for" && __body2[3] === "in")) {
      var ____id5 = __body2;
      var __expr2 = has(____id5, 0);
      var __body3 = cut(____id5, 1);
      var __comps1 = [];
      var __cond1 = undefined;
      while (_35(__body3) > 2 && (__body3[0] === "for" && __body3[2] === "in")) {
        var ____id6 = __body3;
        var ___for1 = has(____id6, 0);
        var __names1 = has(____id6, 1);
        var ___in1 = has(____id6, 2);
        var __l2 = has(____id6, 3);
        var __body12 = cut(____id6, 4);
        add(__comps1, [__names1, __l2]);
        __body3 = __body12;
      }
      if (hd(__body3) === "if") {
        var ____id7 = __body3;
        var ___if1 = has(____id7, 0);
        var __expr3 = has(____id7, 1);
        __cond1 = __expr3;
      }
      return ["%list", __expr2, __comps1, __cond1];
    } else {
      var __x35 = unique("x");
      var __l3 = [];
      var __forms1 = [];
      var ____o1 = __body2;
      var __k2 = undefined;
      for (__k2 in ____o1) {
        var __v1 = ____o1[__k2];
        var __e12 = undefined;
        if (numeric63(__k2)) {
          __e12 = parseInt(__k2);
        } else {
          __e12 = __k2;
        }
        var __k3 = __e12;
        if (number63(__k3)) {
          __l3[__k3] = __v1;
        } else {
          add(__forms1, ["%set", ["%get", __x35, ["quote", __k3]], __v1]);
        }
      }
      if (some63(__forms1)) {
        return join(["let", __x35, ["object", join(["%array"], __l3)]], __forms1, [__x35]);
      } else {
        return join(["%array"], __l3);
      }
    }
  }
};
setenv("list", {
  _stash: true,
  macro: __list__macro
});
var __if__macro = function (..._42args) {
  var __branches1 = unstash([..._42args]);
  return hd(expand_if(__branches1));
};
setenv("if", {
  _stash: true,
  macro: __if__macro
});
var __case__macro = function (expr, ..._42args) {
  var ____r13 = unstash([..._42args]);
  var __expr5 = destash33(expr, ____r13);
  var ____id10 = ____r13;
  var __e13 = undefined;
  if (nil63(has(____id10, "cmp"))) {
    __e13 = "=";
  } else {
    __e13 = has(____id10, "cmp");
  }
  var __cmp1 = __e13;
  var __clauses1 = cut(____id10, 0);
  var __x59 = unique("x");
  var __eq1 = function (_) {
    return [__cmp1, _, __x59];
  };
  var __cl1 = function (__x61) {
    var ____id11 = __x61;
    var __a1 = has(____id11, 0);
    var __b1 = has(____id11, 1);
    if (nil63(__b1)) {
      return [__a1];
    } else {
      if (string63(__a1) || number63(__a1)) {
        return [__eq1(__a1), __b1];
      } else {
        if (list63(__a1) && hd63(__a1, "quote")) {
          return [__eq1(__a1), __b1];
        } else {
          if (one63(__a1)) {
            return [__eq1(hd(__a1)), __b1];
          } else {
            if (_35(__a1) > 1) {
              return [join(["or"], map(__eq1, __a1)), __b1];
            }
          }
        }
      }
    }
  };
  return ["let", __x59, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
};
setenv("case", {
  _stash: true,
  macro: __case__macro
});
var __of__macro = function (x, ..._42args) {
  var ____r17 = unstash([..._42args]);
  var __x74 = destash33(x, ____r17);
  var ____id13 = ____r17;
  var __values1 = cut(____id13, 0);
  return join(["case", __x74, __values1, true, false], props(__values1));
};
setenv("of", {
  _stash: true,
  macro: __of__macro
});
var __when__macro = function (cond, ..._42args) {
  var ____r19 = unstash([..._42args]);
  var __cond3 = destash33(cond, ____r19);
  var ____id15 = ____r19;
  var __body5 = cut(____id15, 0);
  return ["%if", __cond3, join(["%do"], __body5)];
};
setenv("when", {
  _stash: true,
  macro: __when__macro
});
var __unless__macro = function (cond, ..._42args) {
  var ____r21 = unstash([..._42args]);
  var __cond5 = destash33(cond, ____r21);
  var ____id17 = ____r21;
  var __body7 = cut(____id17, 0);
  return ["%if", ["%not", __cond5], join(["%do"], __body7)];
};
setenv("unless", {
  _stash: true,
  macro: __unless__macro
});
var __obj__macro = function (..._42args) {
  var __body10 = unstash([..._42args]);
  if (one63(__body10) && (hd63(__body10, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_keys";
  } else {
    if (_35(__body10) > 2 && (__body10[1] === "for" && __body10[3] === "in")) {
      var ____id21 = __body10;
      var __expr8 = has(____id21, 0);
      var __body111 = cut(____id21, 1);
      var __comps3 = [];
      var __cond7 = undefined;
      while (_35(__body111) > 2 && (__body111[0] === "for" && __body111[2] === "in")) {
        var ____id22 = __body111;
        var ___for3 = has(____id22, 0);
        var __names3 = has(____id22, 1);
        var ___in3 = has(____id22, 2);
        var __l5 = has(____id22, 3);
        var __body14 = cut(____id22, 4);
        add(__comps3, [__names3, __l5]);
        __body111 = __body14;
      }
      if (hd(__body111) === "if") {
        var ____id23 = __body111;
        var ___if3 = has(____id23, 0);
        var __expr9 = has(____id23, 1);
        __cond7 = __expr9;
      }
      if (list63(__expr8) && hd63(__expr8, ",")) {
        __expr8 = join([":"], tl(__expr8));
      }
      var ____x98 = object(["%list", __expr8, __comps3, __cond7]);
      ____x98.kind = "object";
      return ____x98;
    } else {
      return join(["%object"], mapo(function (x) {
        return x;
      }, __body10));
    }
  }
};
setenv("obj", {
  _stash: true,
  macro: __obj__macro
});
var __let__macro = function (bs, ..._42args) {
  var ____r25 = unstash([..._42args]);
  var __bs11 = destash33(bs, ____r25);
  var ____id28 = ____r25;
  var __body131 = cut(____id28, 0);
  if (atom63(__bs11) || hd63(__bs11, ",")) {
    return join(["let", [__bs11, hd(__body131)]], tl(__body131));
  } else {
    if (none63(__bs11)) {
      return join(["%do"], __body131);
    } else {
      var ____id29 = __bs11;
      var __lh3 = has(____id29, 0);
      var __rh3 = has(____id29, 1);
      var __bs21 = cut(____id29, 2);
      var ____id30 = bind(__lh3, __rh3);
      var __id31 = has(____id30, 0);
      var __val1 = has(____id30, 1);
      var __bs12 = cut(____id30, 2);
      var __renames1 = [];
      if (! id_literal63(__id31)) {
        var __id121 = unique(__id31);
        __renames1 = [__id31, __id121];
        __id31 = __id121;
      }
      return ["%do", ["%local", __id31, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body131)]];
    }
  }
};
setenv("let", {
  _stash: true,
  macro: __let__macro
});
var __with__macro = function (x, v, ..._42args) {
  var ____r27 = unstash([..._42args]);
  var __x127 = destash33(x, ____r27);
  var __v3 = destash33(v, ____r27);
  var ____id33 = ____r27;
  var __body15 = cut(____id33, 0);
  if (__v3 === "as") {
    return join(["%with", ["%as", __x127, hd(__body15)]], tl(__body15));
  } else {
    if (! atom63(__x127) || has(__body15, "async")) {
      return join(["%with", __x127, __v3], __body15);
    } else {
      return join(["let", [__x127, __v3]], __body15, [__x127]);
    }
  }
};
setenv("with", {
  _stash: true,
  macro: __with__macro
});
var __let_when__macro = function (x, v, ..._42args) {
  var ____r29 = unstash([..._42args]);
  var __x142 = destash33(x, ____r29);
  var __v5 = destash33(v, ____r29);
  var ____id35 = ____r29;
  var __body17 = cut(____id35, 0);
  var __y1 = unique("y");
  return ["let", __y1, __v5, ["when", ["yes", __y1], join(["let", [__x142, __y1]], __body17)]];
};
setenv("let-when", {
  _stash: true,
  macro: __let_when__macro
});
var __define_macro__macro = function (name, args, ..._42args) {
  var ____r31 = unstash([..._42args]);
  var __name1 = destash33(name, ____r31);
  var __args3 = destash33(args, ____r31);
  var ____id38 = ____r31;
  var __body19 = cut(____id38, 0);
  var __id39 = unique(__name1 + "--macro");
  var ____x156 = object(["setenv", ["quote", __name1]]);
  ____x156.macro = __id39;
  var __form1 = ["do", join(["define", __id39, __args3], __body19), ____x156];
  _eval(__form1);
  return __form1;
};
setenv("define-macro", {
  _stash: true,
  macro: __define_macro__macro
});
var __define_special__macro = function (name, args, ..._42args) {
  var ____r33 = unstash([..._42args]);
  var __name3 = destash33(name, ____r33);
  var __args5 = destash33(args, ____r33);
  var ____id42 = ____r33;
  var __body21 = cut(____id42, 0);
  var __id43 = unique(__name3 + "--special");
  var ____x166 = object(["setenv", ["quote", __name3]]);
  ____x166.special = __id43;
  var __form3 = ["do", join(["define", __id43, __args5], __body21), join(____x166, props(__body21))];
  _eval(__form3);
  return __form3;
};
setenv("define-special", {
  _stash: true,
  macro: __define_special__macro
});
var __define_symbol__macro = function (name, expansion) {
  setenv(name, {
    _stash: true,
    symbol: expansion
  });
  var ____x171 = object(["setenv", ["quote", name]]);
  ____x171.symbol = ["quote", expansion];
  return ____x171;
};
setenv("define-symbol", {
  _stash: true,
  macro: __define_symbol__macro
});
var __define_reader__macro = function (__x180, ..._42args) {
  var ____r37 = unstash([..._42args]);
  var ____x180 = destash33(__x180, ____r37);
  var ____id46 = ____x180;
  var __char1 = has(____id46, 0);
  var __s1 = has(____id46, 1);
  var ____id47 = ____r37;
  var __body23 = cut(____id47, 0);
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s1]], __body23)];
};
setenv("define-reader", {
  _stash: true,
  macro: __define_reader__macro
});
var __define__macro = function (name, x, ..._42args) {
  var ____r39 = unstash([..._42args]);
  var __name5 = destash33(name, ____r39);
  var __x191 = destash33(x, ____r39);
  var ____id49 = ____r39;
  var __body25 = cut(____id49, 0);
  setenv(__name5, {
    _stash: true,
    variable: true
  });
  if (some63(__body25)) {
    return join(["%local-function", __name5], bind42(__x191, __body25), props(__body25));
  } else {
    return join(["%local", __name5, __x191], props(__body25));
  }
};
setenv("define", {
  _stash: true,
  macro: __define__macro
});
var __define_global__macro = function (name, x, ..._42args) {
  var ____r41 = unstash([..._42args]);
  var __name7 = destash33(name, ____r41);
  var __x199 = destash33(x, ____r41);
  var ____id51 = ____r41;
  var __body27 = cut(____id51, 0);
  setenv(__name7, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body27)) {
    return join(["%global-function", __name7], bind42(__x199, __body27), props(__body27));
  } else {
    return join(["set", __name7, __x199], props(__body27));
  }
};
setenv("define-global", {
  _stash: true,
  macro: __define_global__macro
});
var __get_value__macro = function (x) {
  var ____x206 = object(["setenv", x]);
  ____x206.toplevel = true;
  return ["has", ____x206, ["quote", "value"]];
};
setenv("get-value", {
  _stash: true,
  macro: __get_value__macro
});
var __define_constant__macro = function (name, x) {
  var ____x217 = object(["setenv", ["quote", name]]);
  ____x217.toplevel = true;
  ____x217.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x217, ["define-symbol", name, ["get-value", ["quote", name]]]];
};
setenv("define-constant", {
  _stash: true,
  macro: __define_constant__macro
});
var __define_variable__macro = function (name, x) {
  if (is63(x)) {
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]];
  } else {
    return ["define-constant", name];
  }
};
setenv("define-variable", {
  _stash: true,
  macro: __define_variable__macro
});
var __after__macro = function (x, ..._42args) {
  var ____r50 = unstash([..._42args]);
  var __x247 = destash33(x, ____r50);
  var ____id53 = ____r50;
  var __body29 = cut(____id53, 0);
  var __ok1 = unique("ok");
  var __r51 = unique("r");
  var ____x248 = object(["target", ["try", __x247, join(["finally"], __body29)]]);
  ____x248.lua = join(["let", [[__ok1, __r51], ["guard", __x247]]], __body29, [["if", __ok1, __r51, ["throw", __r51]]]);
  return ____x248;
};
setenv("after", {
  _stash: true,
  macro: __after__macro
});
var __with_frame__macro = function (..._42args) {
  var __body31 = unstash([..._42args]);
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body31), ["drop", "environment"]]];
};
setenv("with-frame", {
  _stash: true,
  macro: __with_frame__macro
});
var __with_values__macro = function (..._42args) {
  var __body33 = unstash([..._42args]);
  var __forms3 = [];
  var ____o3 = __body33;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v7 = ____o3[__k6];
    var __e14 = undefined;
    if (numeric63(__k6)) {
      __e14 = parseInt(__k6);
    } else {
      __e14 = __k6;
    }
    var __k7 = __e14;
    if (! number63(__k7)) {
      var ____x278 = object(["setenv", ["quote", __k7]]);
      ____x278.value = __v7;
      add(__forms3, ____x278);
    }
  }
  return join(["with-frame"], __forms3);
};
setenv("with-values", {
  _stash: true,
  macro: __with_values__macro
});
var __with_bindings__macro = function (__x286, ..._42args) {
  var ____r53 = unstash([..._42args]);
  var ____x286 = destash33(__x286, ____r53);
  var ____id56 = ____x286;
  var __names5 = has(____id56, 0);
  var ____id57 = ____r53;
  var __body35 = cut(____id57, 0);
  var __x288 = unique("x");
  var ____x291 = object(["setenv", __x288]);
  ____x291.variable = true;
  return join(["with-frame", ["each", __x288, __names5, ____x291]], __body35);
};
setenv("with-bindings", {
  _stash: true,
  macro: __with_bindings__macro
});
var __let_macro__macro = function (definitions, ..._42args) {
  var ____r58 = unstash([..._42args]);
  var __definitions1 = destash33(definitions, ____r58);
  var ____id59 = ____r58;
  var __body37 = cut(____id59, 0);
  add(environment, {});
  var ____r60 = undefined;
  try{
    map(function (m) {
      return macroexpand(join(["define-macro"], m));
    }, __definitions1);
    ____r60 = join(["%do"], macroexpand(__body37));
  }
  finally{
    drop(environment);
  }
  return ____r60;
};
setenv("let-macro", {
  _stash: true,
  macro: __let_macro__macro
});
var __let_symbol__macro = function (expansions, ..._42args) {
  var ____r66 = unstash([..._42args]);
  var __expansions1 = destash33(expansions, ____r66);
  var ____id62 = ____r66;
  var __body39 = cut(____id62, 0);
  add(environment, {});
  var ____r68 = undefined;
  try{
    map(function (__x303) {
      var ____id63 = __x303;
      var __name9 = has(____id63, 0);
      var __exp1 = has(____id63, 1);
      return macroexpand(["define-symbol", __name9, __exp1]);
    }, pair(__expansions1));
    ____r68 = join(["%do"], macroexpand(__body39));
  }
  finally{
    drop(environment);
  }
  return ____r68;
};
setenv("let-symbol", {
  _stash: true,
  macro: __let_symbol__macro
});
var __let_unique__macro = function (names, ..._42args) {
  var ____r72 = unstash([..._42args]);
  var __names7 = destash33(names, ____r72);
  var ____id65 = ____r72;
  var __body41 = cut(____id65, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names7);
  return join(["let", apply(join, __bs3)], __body41);
};
setenv("let-unique", {
  _stash: true,
  macro: __let_unique__macro
});
var __fn__macro = function (args, ..._42args) {
  var ____r75 = unstash([..._42args]);
  var __args7 = destash33(args, ____r75);
  var ____id67 = ____r75;
  var __body43 = cut(____id67, 0);
  return join(["%function"], bind42(__args7, __body43), props(__body43));
};
setenv("fn", {
  _stash: true,
  macro: __fn__macro
});
var __apply__macro = function (f, ..._42args) {
  var ____r77 = unstash([..._42args]);
  var __f1 = destash33(f, ____r77);
  var ____id69 = ____r77;
  var __args9 = cut(____id69, 0);
  if (_35(__args9) > 1) {
    return ["%call", "apply", __f1, ["join", join(["list"], almost(__args9)), last(__args9), join(["list"], props(__args9))]];
  } else {
    if (props63(__args9)) {
      return ["%call", "apply", __f1, join(["join"], __args9, [join(["list"], props(__args9))])];
    } else {
      return join(["%call", "apply", __f1], __args9);
    }
  }
};
setenv("apply", {
  _stash: true,
  macro: __apply__macro
});
var __guard__macro = function (expr) {
  var ____x370 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x382 = object(["obj"]);
  ____x382.stack = [["idx", "debug", "traceback"]];
  ____x382.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x370.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x382]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x370];
};
setenv("guard", {
  _stash: true,
  macro: __guard__macro
});
var __each__macro = function (x, t, ..._42args) {
  var ____r81 = unstash([..._42args]);
  var __x411 = destash33(x, ____r81);
  var __t1 = destash33(t, ____r81);
  var ____id72 = ____r81;
  var __body45 = cut(____id72, 0);
  var __o5 = unique("o");
  var __n5 = unique("n");
  var __i5 = unique("i");
  var __e15 = undefined;
  if (atom63(__x411)) {
    __e15 = [__i5, __x411];
  } else {
    var __e16 = undefined;
    if (_35(__x411) > 1) {
      __e16 = __x411;
    } else {
      __e16 = [__i5, hd(__x411)];
    }
    __e15 = __e16;
  }
  var ____id73 = __e15;
  var __k9 = has(____id73, 0);
  var __v9 = has(____id73, 1);
  var ____x417 = object(["target", __o5]);
  ____x417.py = ["indices", __o5];
  var __e17 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e17 = __body45;
  } else {
    __e17 = [join(["let", __k9, ["if", ["numeric?", __k9], ["parseInt", __k9], __k9]], __body45)];
  }
  return ["let", [__o5, __t1, __k9, "nil"], join(["%for", ____x417, __k9], props(__body45), [join(["let", [__v9, ["%get", __o5, __k9]]], __e17)])];
};
setenv("each", {
  _stash: true,
  macro: __each__macro
});
var __for__macro = function (i, to, ..._42args) {
  var ____r83 = unstash([..._42args]);
  var __i7 = destash33(i, ____r83);
  var __to1 = destash33(to, ____r83);
  var ____id75 = ____r83;
  var __body47 = cut(____id75, 0);
  if (__to1 === "in") {
    return join(["%for", hd(__body47), __i7, join(["%do"], tl(__body47))], props(__body47));
  } else {
    return ["let", __i7, 0, join(["while", ["<", __i7, __to1]], __body47, [["inc", __i7]])];
  }
};
setenv("for", {
  _stash: true,
  macro: __for__macro
});
var __step__macro = function (v, t, ..._42args) {
  var ____r85 = unstash([..._42args]);
  var __v11 = destash33(v, ____r85);
  var __t3 = destash33(t, ____r85);
  var ____id77 = ____r85;
  var __body49 = cut(____id77, 0);
  var __x454 = unique("x");
  var __i9 = unique("i");
  return ["let", [__x454, __t3], ["for", __i9, ["#", __x454], join(["let", [__v11, ["at", __x454, __i9]]], __body49)]];
};
setenv("step", {
  _stash: true,
  macro: __step__macro
});
var __set_of__macro = function (..._42args) {
  var __xs1 = unstash([..._42args]);
  var __l7 = [];
  var ____o7 = __xs1;
  var ____i11 = undefined;
  for (____i11 in ____o7) {
    var __x466 = ____o7[____i11];
    var __e18 = undefined;
    if (numeric63(____i11)) {
      __e18 = parseInt(____i11);
    } else {
      __e18 = ____i11;
    }
    var ____i111 = __e18;
    __l7[__x466] = true;
  }
  return join(["obj"], __l7);
};
setenv("set-of", {
  _stash: true,
  macro: __set_of__macro
});
var __target63__macro = function (x) {
  return ["=", "target", x];
};
setenv("target?", {
  _stash: true,
  macro: __target63__macro
});
var __target__macro = function (..._42args) {
  var __clauses3 = unstash([..._42args]);
  if (has63(__clauses3, has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value"))) {
    return __clauses3[has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value")];
  } else {
    return hd(__clauses3);
  }
};
setenv("target", {
  _stash: true,
  macro: __target__macro
});
var __language__macro = function () {
  return ["quote", has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value")];
};
setenv("language", {
  _stash: true,
  macro: __language__macro
});
var __join33__macro = function (a, ..._42args) {
  var ____r91 = unstash([..._42args]);
  var __a3 = destash33(a, ____r91);
  var ____id79 = ____r91;
  var __bs5 = cut(____id79, 0);
  return ["set", __a3, join(["join", __a3], __bs5)];
};
setenv("join!", {
  _stash: true,
  macro: __join33__macro
});
var __cat33__macro = function (a, ..._42args) {
  var ____r93 = unstash([..._42args]);
  var __a5 = destash33(a, ____r93);
  var ____id81 = ____r93;
  var __bs7 = cut(____id81, 0);
  return ["set", __a5, join(["cat", __a5], __bs7)];
};
setenv("cat!", {
  _stash: true,
  macro: __cat33__macro
});
var __inc__macro = function (n, by) {
  var __e19 = undefined;
  if (nil63(by)) {
    __e19 = 1;
  } else {
    __e19 = by;
  }
  return ["set", n, ["+", n, __e19]];
};
setenv("inc", {
  _stash: true,
  macro: __inc__macro
});
var __dec__macro = function (n, by) {
  var __e20 = undefined;
  if (nil63(by)) {
    __e20 = 1;
  } else {
    __e20 = by;
  }
  return ["set", n, ["-", n, __e20]];
};
setenv("dec", {
  _stash: true,
  macro: __dec__macro
});
var __with_indent__macro = function (form) {
  var __x499 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x499, form, ["dec", "indent-level"]]];
};
setenv("with-indent", {
  _stash: true,
  macro: __with_indent__macro
});
var __export__macro = function (..._42args) {
  var __names9 = unstash([..._42args]);
  var __forms5 = map(function (k) {
    if (k === compile(k)) {
      return ["%set", ["idx", "exports", k], k];
    } else {
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]];
    }
  }, __names9);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return join(["%do"], __forms5);
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]]);
    }
  }
};
setenv("export", {
  _stash: true,
  macro: __export__macro
});
var __when_compiling__macro = function (..._42args) {
  var __body51 = unstash([..._42args]);
  return _eval(join(["%do"], __body51));
};
setenv("when-compiling", {
  _stash: true,
  macro: __when_compiling__macro
});
var __during_compilation__macro = function (..._42args) {
  var __body53 = unstash([..._42args]);
  var __form5 = join(["%do"], __body53);
  _eval(__form5);
  return __form5;
};
setenv("during-compilation", {
  _stash: true,
  macro: __during_compilation__macro
});
var __def__macro = function (name, ..._42args) {
  var ____r103 = unstash([..._42args]);
  var __name11 = destash33(name, ____r103);
  var ____id83 = ____r103;
  var __body55 = cut(____id83, 0);
  return join(["define-global", __name11], __body55);
};
setenv("def", {
  _stash: true,
  macro: __def__macro
});
var __mac__macro = function (name, ..._42args) {
  var ____r105 = unstash([..._42args]);
  var __name13 = destash33(name, ____r105);
  var ____id85 = ____r105;
  var __body57 = cut(____id85, 0);
  return join(["define-macro", __name13], __body57);
};
setenv("mac", {
  _stash: true,
  macro: __mac__macro
});
var __defconst__macro = function (name, ..._42args) {
  var ____r107 = unstash([..._42args]);
  var __name15 = destash33(name, ____r107);
  var ____id87 = ____r107;
  var __value1 = cut(____id87, 0);
  return join(["def", __name15], __value1);
};
setenv("defconst", {
  _stash: true,
  macro: __defconst__macro
});
var __undefined63__macro = function (name) {
  var ____x563 = object(["target"]);
  ____x563.js = ["=", ["typeof", name], "\"undefined\""];
  ____x563.lua = ["=", ["idx", "_G", name], "nil"];
  ____x563.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x563;
};
setenv("undefined?", {
  _stash: true,
  macro: __undefined63__macro
});
var __defvar__macro = function (name, ..._42args) {
  var ____r111 = unstash([..._42args]);
  var __name17 = destash33(name, ____r111);
  var ____id89 = ____r111;
  var __value3 = cut(____id89, 0);
  var ____x581 = object(["target"]);
  ____x581.py = ["global", __name17];
  return ["when", ["undefined?", __name17], ____x581, join(["defconst", __name17], __value3)];
};
setenv("defvar", {
  _stash: true,
  macro: __defvar__macro
});
var __async__macro = function (keyword, ..._42args) {
  var ____r113 = unstash([..._42args]);
  var __keyword1 = destash33(keyword, ____r113);
  var ____id91 = ____r113;
  var __body59 = cut(____id91, 0);
  var ____x587 = object([__keyword1]);
  ____x587.async = true;
  return join(____x587, __body59);
};
setenv("async", {
  _stash: true,
  macro: __async__macro
});
var ___37read_from_file__macro = function (name) {
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]];
};
setenv("%read-from-file", {
  _stash: true,
  macro: ___37read_from_file__macro
});
var __the__macro = function (name) {
  return ["getenv", ["quote", name], ["quote", "value"]];
};
setenv("the", {
  _stash: true,
  macro: __the__macro
});
var __cat__macro = function (a, ..._42args) {
  var ____r119 = unstash([..._42args]);
  var __a7 = destash33(a, ____r119);
  var ____id93 = ____r119;
  var __bs9 = cut(____id93, 0);
  if (nil63(__a7)) {
    return "";
  } else {
    if (none63(__bs9)) {
      return __a7;
    } else {
      if (one63(__bs9)) {
        var ____x613 = object(["target", join(["%cat", __a7], __bs9)]);
        ____x613.py = join(["%call", "cat", __a7], __bs9);
        return ____x613;
      } else {
        var ____x616 = object(["target", ["%cat", __a7, join(["cat"], __bs9)]]);
        ____x616.py = join(["%call", "cat", __a7], __bs9);
        return ____x616;
      }
    }
  }
};
setenv("cat", {
  _stash: true,
  macro: __cat__macro
});
var ___43__macro = function (..._42args) {
  var __args11 = unstash([..._42args]);
  if (none63(__args11)) {
    return 0;
  } else {
    if (one63(__args11)) {
      return hd(__args11);
    } else {
      return join(["%add"], __args11);
    }
  }
};
setenv("+", {
  _stash: true,
  macro: ___43__macro
});
var _____macro = function (..._42args) {
  var __args13 = unstash([..._42args]);
  if (none63(__args13)) {
    return 0;
  } else {
    if (one63(__args13)) {
      return ["%unm", hd(__args13)];
    } else {
      return join(["%sub"], __args13);
    }
  }
};
setenv("-", {
  _stash: true,
  macro: _____macro
});
var ___42__macro = function (..._42args) {
  var __args15 = unstash([..._42args]);
  if (none63(__args15)) {
    return 1;
  } else {
    if (one63(__args15)) {
      return hd(__args15);
    } else {
      return join(["%mul"], __args15);
    }
  }
};
setenv("*", {
  _stash: true,
  macro: ___42__macro
});
var ___47__macro = function (..._42args) {
  var __args17 = unstash([..._42args]);
  if (none63(__args17)) {
    return 1;
  } else {
    if (one63(__args17)) {
      return hd(__args17);
    } else {
      return join(["%div"], __args17);
    }
  }
};
setenv("/", {
  _stash: true,
  macro: ___47__macro
});
var ___4747__macro = function (..._42args) {
  var __args19 = unstash([..._42args]);
  if (none63(__args19)) {
    return 1;
  } else {
    if (one63(__args19)) {
      return hd(__args19);
    } else {
      return join(["%idiv"], __args19);
    }
  }
};
setenv("//", {
  _stash: true,
  macro: ___4747__macro
});
var ___37__macro = function (..._42args) {
  var __args21 = unstash([..._42args]);
  if (none63(__args21)) {
    return 0;
  } else {
    if (one63(__args21)) {
      return hd(__args21);
    } else {
      return join(["%mod"], __args21);
    }
  }
};
setenv("%", {
  _stash: true,
  macro: ___37__macro
});
var ___60__macro = function (a, ..._42args) {
  var ____r121 = unstash([..._42args]);
  var __a9 = destash33(a, ____r121);
  var ____id95 = ____r121;
  var __bs111 = cut(____id95, 0);
  if (none63(__bs111)) {
    return true;
  } else {
    if (one63(__bs111)) {
      return join(["%lt", __a9], __bs111);
    } else {
      return ["%and", ["%lt", __a9, hd(__bs111)], join(["<"], __bs111)];
    }
  }
};
setenv("<", {
  _stash: true,
  macro: ___60__macro
});
var ___6061__macro = function (a, ..._42args) {
  var ____r123 = unstash([..._42args]);
  var __a11 = destash33(a, ____r123);
  var ____id97 = ____r123;
  var __bs13 = cut(____id97, 0);
  if (none63(__bs13)) {
    return true;
  } else {
    if (one63(__bs13)) {
      return join(["%le", __a11], __bs13);
    } else {
      return ["%and", ["%le", __a11, hd(__bs13)], join(["<="], __bs13)];
    }
  }
};
setenv("<=", {
  _stash: true,
  macro: ___6061__macro
});
var ___61__macro = function (a, ..._42args) {
  var ____r125 = unstash([..._42args]);
  var __a13 = destash33(a, ____r125);
  var ____id99 = ____r125;
  var __bs15 = cut(____id99, 0);
  if (none63(__bs15)) {
    return true;
  } else {
    if (one63(__bs15)) {
      return join(["%eq", __a13], __bs15);
    } else {
      return ["%and", ["%eq", __a13, hd(__bs15)], join(["="], __bs15)];
    }
  }
};
setenv("=", {
  _stash: true,
  macro: ___61__macro
});
var ___6261__macro = function (a, ..._42args) {
  var ____r127 = unstash([..._42args]);
  var __a15 = destash33(a, ____r127);
  var ____id101 = ____r127;
  var __bs17 = cut(____id101, 0);
  if (none63(__bs17)) {
    return true;
  } else {
    if (one63(__bs17)) {
      return join(["%ge", __a15], __bs17);
    } else {
      return ["%and", ["%ge", __a15, hd(__bs17)], join([">="], __bs17)];
    }
  }
};
setenv(">=", {
  _stash: true,
  macro: ___6261__macro
});
var ___62__macro = function (a, ..._42args) {
  var ____r129 = unstash([..._42args]);
  var __a17 = destash33(a, ____r129);
  var ____id103 = ____r129;
  var __bs19 = cut(____id103, 0);
  if (none63(__bs19)) {
    return true;
  } else {
    if (one63(__bs19)) {
      return join(["%gt", __a17], __bs19);
    } else {
      return ["%and", ["%gt", __a17, hd(__bs19)], join([">"], __bs19)];
    }
  }
};
setenv(">", {
  _stash: true,
  macro: ___62__macro
});
var __not__macro = function (..._42args) {
  var __args23 = unstash([..._42args]);
  if (none63(__args23)) {
    return false;
  } else {
    if (one63(__args23)) {
      return join(["%not"], __args23);
    } else {
      return ["%and", ["%not", hd(__args23)], join(["not"], tl(__args23))];
    }
  }
};
setenv("not", {
  _stash: true,
  macro: __not__macro
});
var __and__macro = function (a, ..._42args) {
  var ____r131 = unstash([..._42args]);
  var __a19 = destash33(a, ____r131);
  var ____id105 = ____r131;
  var __bs211 = cut(____id105, 0);
  if (nil63(__a19)) {
    return true;
  } else {
    if (none63(__bs211)) {
      return __a19;
    } else {
      if (one63(__bs211)) {
        return join(["%and", __a19], __bs211);
      } else {
        return ["%and", __a19, join(["and"], __bs211)];
      }
    }
  }
};
setenv("and", {
  _stash: true,
  macro: __and__macro
});
var __or__macro = function (a, ..._42args) {
  var ____r133 = unstash([..._42args]);
  var __a21 = destash33(a, ____r133);
  var ____id107 = ____r133;
  var __bs23 = cut(____id107, 0);
  if (nil63(__a21)) {
    return false;
  } else {
    if (none63(__bs23)) {
      return __a21;
    } else {
      if (one63(__bs23)) {
        return join(["%or", __a21], __bs23);
      } else {
        return ["%or", __a21, join(["or"], __bs23)];
      }
    }
  }
};
setenv("or", {
  _stash: true,
  macro: __or__macro
});
var __break__macro = function (..._42args) {
  var __args25 = unstash([..._42args]);
  return join(["%break"], __args25);
};
setenv("break", {
  _stash: true,
  macro: __break__macro
});
var __return__macro = function (..._42args) {
  var __args27 = unstash([..._42args]);
  return join(["%return"], __args27);
};
setenv("return", {
  _stash: true,
  macro: __return__macro
});
var __while__macro = function (c, ..._42args) {
  var ____r135 = unstash([..._42args]);
  var __c1 = destash33(c, ____r135);
  var ____id109 = ____r135;
  var __body61 = cut(____id109, 0);
  return join(["%while", __c1], __body61);
};
setenv("while", {
  _stash: true,
  macro: __while__macro
});
var __do__macro = function (..._42args) {
  var __body63 = unstash([..._42args]);
  return join(["%do"], __body63);
};
setenv("do", {
  _stash: true,
  macro: __do__macro
});
var __get__macro = function (..._42args) {
  var __args29 = unstash([..._42args]);
  return join(["%get"], __args29);
};
setenv("get", {
  _stash: true,
  macro: __get__macro
});
var __idx__macro = function (..._42args) {
  var __args31 = unstash([..._42args]);
  return join(["%idx"], __args31);
};
setenv("idx", {
  _stash: true,
  macro: __idx__macro
});
var __new__macro = function (..._42args) {
  var __args33 = unstash([..._42args]);
  return join(["%new"], __args33);
};
setenv("new", {
  _stash: true,
  macro: __new__macro
});
var __typeof__macro = function (..._42args) {
  var __args35 = unstash([..._42args]);
  return join(["%typeof"], __args35);
};
setenv("typeof", {
  _stash: true,
  macro: __typeof__macro
});
var __error__macro = function (..._42args) {
  var __args37 = unstash([..._42args]);
  return join(["%error"], __args37);
};
setenv("error", {
  _stash: true,
  macro: __error__macro
});
var __throw__macro = function (..._42args) {
  var __args39 = unstash([..._42args]);
  return join(["%throw"], __args39);
};
setenv("throw", {
  _stash: true,
  macro: __throw__macro
});
var __raise__macro = function (..._42args) {
  var __args41 = unstash([..._42args]);
  return join(["%throw"], __args41);
};
setenv("raise", {
  _stash: true,
  macro: __raise__macro
});
var __is__macro = function (..._42args) {
  var __args43 = unstash([..._42args]);
  var ____x771 = object(["target", join(["="], __args43)]);
  ____x771.py = join(["%is"], __args43);
  return ____x771;
};
setenv("is", {
  _stash: true,
  macro: __is__macro
});
var __in__macro = function (..._42args) {
  var __args45 = unstash([..._42args]);
  return join(["%in"], __args45);
};
setenv("in", {
  _stash: true,
  macro: __in__macro
});
var __as__macro = function (..._42args) {
  var __args47 = unstash([..._42args]);
  return join(["%as"], __args47);
};
setenv("as", {
  _stash: true,
  macro: __as__macro
});
var ___37expand_case__macro = function (x, ..._42args) {
  var ____r137 = unstash([..._42args]);
  var __x789 = destash33(x, ____r137);
  var ____id112 = ____r137;
  var __body65 = cut(____id112, 0);
  var __e21 = undefined;
  if (atom63(__x789)) {
    __e21 = [__x789];
  } else {
    __e21 = __x789;
  }
  var ____id113 = __e21;
  var __a23 = has(____id113, 0);
  var __bs25 = cut(____id113, 1);
  var __e22 = undefined;
  if (none63(__bs25)) {
    __e22 = [["%literal"]];
  } else {
    __e22 = __bs25;
  }
  return join(["%block", __a23], __e22, __body65);
};
setenv("%expand-case", {
  _stash: true,
  macro: ___37expand_case__macro
});
var ___37cases__macro = function (..._42args) {
  var __args49 = unstash([..._42args]);
  if (none63(__args49)) {
    return ["do"];
  } else {
    if (one63(__args49)) {
      return join(["%expand-case"], hd(__args49));
    } else {
      var __r140 = unique("r");
      return join(["with", __r140, "nil"], map(function (__x809) {
        var ____id115 = __x809;
        var __x810 = has(____id115, 0);
        var __body67 = cut(____id115, 1);
        return ["%expand-case", __x810, ["%set", __r140, join(["%do"], __body67)]];
      }, almost(__args49)), [join(["%expand-case"], last(__args49))]);
    }
  }
};
setenv("%cases", {
  _stash: true,
  macro: ___37cases__macro
});
var __try__macro = function (x, ..._42args) {
  var ____r143 = unstash([..._42args]);
  var __x831 = destash33(x, ____r143);
  var ____id120 = ____r143;
  var __cases1 = cut(____id120, 0);
  var __fin1 = ["finally"];
  var ____o9 = __cases1;
  var ____i14 = undefined;
  for (____i14 in ____o9) {
    var __x833 = ____o9[____i14];
    var __e23 = undefined;
    if (numeric63(____i14)) {
      __e23 = parseInt(____i14);
    } else {
      __e23 = ____i14;
    }
    var ____i141 = __e23;
    if (hd63(__x833, "finally")) {
      __fin1 = __x833;
    }
  }
  var __forms7 = [];
  var ____x836 = __cases1;
  var ____i15 = 0;
  while (____i15 < _35(____x836)) {
    var ____id1211 = ____x836[____i15];
    var __x837 = has(____id1211, 0);
    var __body71 = cut(____id1211, 1);
    if (__x837 === "finally") {
    } else {
      if (__x837 === "except" && has(__body71, 1) === "as") {
        var ____id122 = __body71;
        var __kind2 = has(____id122, 0);
        var ___1 = has(____id122, 1);
        var __name19 = has(____id122, 2);
        var __body72 = cut(____id122, 3);
        add(__forms7, join([[__x837, ["%as", __kind2, __name19]]], __body72));
      } else {
        if (__x837 === "except") {
          var ____id123 = __body71;
          var __kind3 = has(____id123, 0);
          var __body73 = cut(____id123, 1);
          add(__forms7, join([[__x837, __kind3]], __body73));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i15 = ____i15 + 1;
  }
  return join(["%cases", ["try", __x831]], __forms7, [__fin1]);
};
setenv("try", {
  _stash: true,
  macro: __try__macro
});
var __errsafe__macro = function (x, _else) {
  if (nil63(_else)) {
    _else = "nil";
  }
  var __ok7 = unique("ok");
  var __v13 = unique("v");
  return ["let", [[__ok7, __v13], ["guard", x]], ["if", __ok7, __v13, _else]];
};
setenv("errsafe", {
  _stash: true,
  macro: __errsafe__macro
});
var __dbg__macro = function () {
  var ____x860 = object(["target", ["do"]]);
  ____x860.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x860;
};
setenv("dbg", {
  _stash: true,
  macro: __dbg__macro
});
var __see__macro = function (form) {
  var __form7 = expand(form);
  print(compile(expand(["%set", "lumen-result", __form7])));
  return __form7;
};
setenv("see", {
  _stash: true,
  macro: __see__macro
});
