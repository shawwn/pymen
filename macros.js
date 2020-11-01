var __ns__macro = function (name) {
  return ["current-ns", escape(name)];
};
setenv("ns", {
  _stash: true,
  macro: __ns__macro
});
current_ns("lumen.macros");
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
  return join(["%do"], map(function (__x10) {
    var ____id1 = __x10;
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
      var __x37 = unique("x");
      var __l3 = [];
      var __forms1 = [];
      var ____o1 = __body2;
      var __k2 = undefined;
      for (__k2 in ____o1) {
        var __v1 = ____o1[__k2];
        var __e2 = undefined;
        if (numeric63(__k2)) {
          __e2 = parseInt(__k2);
        } else {
          __e2 = __k2;
        }
        var __k3 = __e2;
        if (number63(__k3)) {
          __l3[__k3] = __v1;
        } else {
          add(__forms1, ["%set", ["%get", __x37, ["quote", __k3]], __v1]);
        }
      }
      if (some63(__forms1)) {
        return join(["let", __x37, ["object", join(["%array"], __l3)]], __forms1, [__x37]);
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
  var ____r15 = unstash([..._42args]);
  var __expr5 = destash33(expr, ____r15);
  var ____id10 = ____r15;
  var __e3 = undefined;
  if (nil63(has(____id10, "cmp"))) {
    __e3 = "=";
  } else {
    __e3 = has(____id10, "cmp");
  }
  var __cmp1 = __e3;
  var __clauses1 = cut(____id10, 0);
  var __x61 = unique("x");
  var __eq1 = function (_) {
    return [__cmp1, _, __x61];
  };
  var __cl1 = function (__x63) {
    var ____id11 = __x63;
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
  return ["let", __x61, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
};
setenv("case", {
  _stash: true,
  macro: __case__macro
});
var __of__macro = function (x, ..._42args) {
  var ____r19 = unstash([..._42args]);
  var __x76 = destash33(x, ____r19);
  var ____id13 = ____r19;
  var __values1 = cut(____id13, 0);
  return join(["case", __x76, __values1, true, false], props(__values1));
};
setenv("of", {
  _stash: true,
  macro: __of__macro
});
var __when__macro = function (cond, ..._42args) {
  var ____r21 = unstash([..._42args]);
  var __cond3 = destash33(cond, ____r21);
  var ____id15 = ____r21;
  var __body5 = cut(____id15, 0);
  return ["%if", __cond3, join(["%do"], __body5)];
};
setenv("when", {
  _stash: true,
  macro: __when__macro
});
var __unless__macro = function (cond, ..._42args) {
  var ____r23 = unstash([..._42args]);
  var __cond5 = destash33(cond, ____r23);
  var ____id17 = ____r23;
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
      var ____x100 = object(["%list", __expr8, __comps3, __cond7]);
      ____x100.kind = "object";
      return ____x100;
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
  var ____r27 = unstash([..._42args]);
  var __bs11 = destash33(bs, ____r27);
  var ____id28 = ____r27;
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
  var ____r29 = unstash([..._42args]);
  var __x129 = destash33(x, ____r29);
  var __v3 = destash33(v, ____r29);
  var ____id33 = ____r29;
  var __body15 = cut(____id33, 0);
  if (__v3 === "as") {
    return join(["%with", ["%as", __x129, hd(__body15)]], tl(__body15));
  } else {
    if (! atom63(__x129) || has(__body15, "async")) {
      return join(["%with", __x129, __v3], __body15);
    } else {
      return join(["let", [__x129, __v3]], __body15, [__x129]);
    }
  }
};
setenv("with", {
  _stash: true,
  macro: __with__macro
});
var __let_when__macro = function (x, v, ..._42args) {
  var ____r31 = unstash([..._42args]);
  var __x144 = destash33(x, ____r31);
  var __v5 = destash33(v, ____r31);
  var ____id35 = ____r31;
  var __body17 = cut(____id35, 0);
  var __y1 = unique("y");
  return ["let", __y1, __v5, ["when", ["yes", __y1], join(["let", [__x144, __y1]], __body17)]];
};
setenv("let-when", {
  _stash: true,
  macro: __let_when__macro
});
var __void__macro = function (..._42args) {
  var __body19 = unstash([..._42args]);
  return join(["do"], __body19, [["do"]]);
};
setenv("void", {
  _stash: true,
  macro: __void__macro
});
var ___37setenv__macro = function (name, kind, ..._42args) {
  var ____r33 = unstash([..._42args]);
  var __name1 = destash33(name, ____r33);
  var __kind1 = destash33(kind, ____r33);
  var ____id37 = ____r33;
  var __keys1 = cut(____id37, 0);
  var __ks1 = cut(__keys1);
  delete __ks1[__kind1];
  return ["void", join(["setenv%", ["quote", __name1], ["quote", __kind1], __keys1[__kind1]], __ks1)];
};
setenv("%setenv", {
  _stash: true,
  macro: ___37setenv__macro
});
var __define_macro__macro = function (name, args, ..._42args) {
  var ____r35 = unstash([..._42args]);
  var __name3 = destash33(name, ____r35);
  var __args3 = destash33(args, ____r35);
  var ____id40 = ____r35;
  var __body21 = cut(____id40, 0);
  var __id41 = unique(__name3 + "--macro");
  var ____x175 = object(["%setenv", __name3, "macro"]);
  ____x175.macro = __id41;
  var __form1 = ["do", join(["define", __id41, __args3], __body21), ____x175];
  return __form1;
};
setenv("define-macro", {
  _stash: true,
  macro: __define_macro__macro
});
var __define_special__macro = function (name, args, ..._42args) {
  var ____r36 = unstash([..._42args]);
  var __name4 = destash33(name, ____r36);
  var __args4 = destash33(args, ____r36);
  var ____id42 = ____r36;
  var __body22 = cut(____id42, 0);
  var __id43 = unique(__name4 + "--special");
  var ____x179 = object(["setenv", ["quote", __name4]]);
  ____x179.special = __id43;
  var __form2 = ["do", join(["define", __id43, __args4], __body22), join(____x179, props(__body22))];
  return __form2;
};
setenv37("define-special", "macro", __define_special__macro);
var __define_symbol__macro = function (name, expansion) {
  setenv(name, {
    _stash: true,
    symbol: expansion
  });
  var ____x181 = object(["setenv", ["quote", name]]);
  ____x181.symbol = ["quote", expansion];
  return ____x181;
};
setenv37("define-symbol", "macro", __define_symbol__macro);
var __define_reader__macro = function (__x184, ..._42args) {
  var ____r38 = unstash([..._42args]);
  var ____x184 = destash33(__x184, ____r38);
  var ____id44 = ____x184;
  var __char = has(____id44, 0);
  var __s = has(____id44, 1);
  var ____id45 = ____r38;
  var __body23 = cut(____id45, 0);
  return ["%set", ["%get", "read-table", __char], join(["fn", [__s]], __body23)];
};
setenv37("define-reader", "macro", __define_reader__macro);
var __define__macro = function (name, x, ..._42args) {
  var ____r39 = unstash([..._42args]);
  var __name5 = destash33(name, ____r39);
  var __x191 = destash33(x, ____r39);
  var ____id46 = ____r39;
  var __body24 = cut(____id46, 0);
  setenv(__name5, {
    _stash: true,
    variable: true
  });
  if (some63(__body24)) {
    return join(["%local-function", __name5], bind42(__x191, __body24), props(__body24));
  } else {
    return join(["%local", __name5, __x191], props(__body24));
  }
};
setenv37("define", "macro", __define__macro);
var __define_global__macro = function (name, x, ..._42args) {
  var ____r40 = unstash([..._42args]);
  var __name6 = destash33(name, ____r40);
  var __x195 = destash33(x, ____r40);
  var ____id47 = ____r40;
  var __body25 = cut(____id47, 0);
  setenv(__name6, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body25)) {
    return join(["%global-function", __name6], bind42(__x195, __body25), props(__body25));
  } else {
    return join(["set", __name6, __x195], props(__body25));
  }
};
setenv37("define-global", "macro", __define_global__macro);
var __get_value__macro = function (x) {
  var ____x199 = object(["setenv", x]);
  ____x199.toplevel = true;
  return ["has", ____x199, ["quote", "value"]];
};
setenv37("get-value", "macro", __get_value__macro);
var __define_constant__macro = function (name, x) {
  var ____x202 = object(["setenv", ["quote", name]]);
  ____x202.toplevel = true;
  ____x202.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x202, ["define-symbol", name, ["get-value", ["quote", name]]]];
};
setenv37("define-constant", "macro", __define_constant__macro);
var __define_variable__macro = function (name, x) {
  if (is63(x)) {
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]];
  } else {
    return ["define-constant", name];
  }
};
setenv37("define-variable", "macro", __define_variable__macro);
var __after__macro = function (x, ..._42args) {
  var ____r44 = unstash([..._42args]);
  var __x215 = destash33(x, ____r44);
  var ____id48 = ____r44;
  var __body26 = cut(____id48, 0);
  var __ok = unique("ok");
  var __r45 = unique("r");
  var ____x216 = object(["target", ["try", __x215, join(["finally"], __body26)]]);
  ____x216.lua = join(["let", [[__ok, __r45], ["guard", __x215]]], __body26, [["if", __ok, __r45, ["throw", __r45]]]);
  return ____x216;
};
setenv37("after", "macro", __after__macro);
var __with_frame__macro = function (..._42args) {
  var __body27 = unstash([..._42args]);
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body27), ["drop", "environment"]]];
};
setenv37("with-frame", "macro", __with_frame__macro);
var __with_values__macro = function (..._42args) {
  var __body28 = unstash([..._42args]);
  var __forms2 = [];
  var ____o2 = __body28;
  var __k4 = undefined;
  for (__k4 in ____o2) {
    var __v6 = ____o2[__k4];
    var __e4 = undefined;
    if (numeric63(__k4)) {
      __e4 = parseInt(__k4);
    } else {
      __e4 = __k4;
    }
    var __k5 = __e4;
    if (! number63(__k5)) {
      var ____x235 = object(["setenv", ["quote", __k5]]);
      ____x235.value = __v6;
      add(__forms2, ____x235);
    }
  }
  return join(["with-frame"], __forms2);
};
setenv37("with-values", "macro", __with_values__macro);
var __with_bindings__macro = function (__x237, ..._42args) {
  var ____r46 = unstash([..._42args]);
  var ____x237 = destash33(__x237, ____r46);
  var ____id49 = ____x237;
  var __names4 = has(____id49, 0);
  var ____id50 = ____r46;
  var __body29 = cut(____id50, 0);
  var __x239 = unique("x");
  var ____x242 = object(["setenv", __x239]);
  ____x242.variable = true;
  return join(["with-frame", ["each", __x239, __names4, ____x242]], __body29);
};
setenv37("with-bindings", "macro", __with_bindings__macro);
var __let_macro__macro = function (definitions, ..._42args) {
  var ____r47 = unstash([..._42args]);
  var __definitions = destash33(definitions, ____r47);
  var ____id51 = ____r47;
  var __body30 = cut(____id51, 0);
  add(environment, {});
  var ____r49 = undefined;
  try{
    map(function (m) {
      return macroexpand(join(["define-macro"], m));
    }, __definitions);
    ____r49 = join(["%do"], macroexpand(__body30));
  }
  finally{
    drop(environment);
  }
  return ____r49;
};
setenv37("let-macro", "macro", __let_macro__macro);
var __let_symbol__macro = function (expansions, ..._42args) {
  var ____r51 = unstash([..._42args]);
  var __expansions = destash33(expansions, ____r51);
  var ____id52 = ____r51;
  var __body31 = cut(____id52, 0);
  add(environment, {});
  var ____r53 = undefined;
  try{
    map(function (__x247) {
      var ____id53 = __x247;
      var __name7 = has(____id53, 0);
      var __exp = has(____id53, 1);
      return macroexpand(["define-symbol", __name7, __exp]);
    }, pair(__expansions));
    ____r53 = join(["%do"], macroexpand(__body31));
  }
  finally{
    drop(environment);
  }
  return ____r53;
};
setenv37("let-symbol", "macro", __let_symbol__macro);
var __let_unique__macro = function (names, ..._42args) {
  var ____r55 = unstash([..._42args]);
  var __names5 = destash33(names, ____r55);
  var ____id54 = ____r55;
  var __body32 = cut(____id54, 0);
  var __bs22 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names5);
  return join(["let", apply(join, __bs22)], __body32);
};
setenv37("let-unique", "macro", __let_unique__macro);
var __fn__macro = function (args, ..._42args) {
  var ____r57 = unstash([..._42args]);
  var __args5 = destash33(args, ____r57);
  var ____id55 = ____r57;
  var __body33 = cut(____id55, 0);
  return join(["%function"], bind42(__args5, __body33), props(__body33));
};
setenv37("fn", "macro", __fn__macro);
var __apply__macro = function (f, ..._42args) {
  var ____r58 = unstash([..._42args]);
  var __f = destash33(f, ____r58);
  var ____id56 = ____r58;
  var __args6 = cut(____id56, 0);
  if (_35(__args6) > 1) {
    return ["%call", "apply", __f, ["join", join(["list"], almost(__args6)), last(__args6), join(["list"], props(__args6))]];
  } else {
    if (props63(__args6)) {
      return ["%call", "apply", __f, join(["join"], __args6, [join(["list"], props(__args6))])];
    } else {
      return join(["%call", "apply", __f], __args6);
    }
  }
};
setenv37("apply", "macro", __apply__macro);
var __guard__macro = function (expr) {
  var ____x271 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x283 = object(["obj"]);
  ____x283.stack = [["idx", "debug", "traceback"]];
  ____x283.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x271.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x283]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x271];
};
setenv37("guard", "macro", __guard__macro);
var __each__macro = function (x, t, ..._42args) {
  var ____r60 = unstash([..._42args]);
  var __x294 = destash33(x, ____r60);
  var __t = destash33(t, ____r60);
  var ____id57 = ____r60;
  var __body34 = cut(____id57, 0);
  var __o3 = unique("o");
  var __n3 = unique("n");
  var __i3 = unique("i");
  var __e5 = undefined;
  if (atom63(__x294)) {
    __e5 = [__i3, __x294];
  } else {
    var __e6 = undefined;
    if (_35(__x294) > 1) {
      __e6 = __x294;
    } else {
      __e6 = [__i3, hd(__x294)];
    }
    __e5 = __e6;
  }
  var ____id58 = __e5;
  var __k6 = has(____id58, 0);
  var __v7 = has(____id58, 1);
  var ____x300 = object(["target", __o3]);
  ____x300.py = ["indices", __o3];
  var __e7 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e7 = __body34;
  } else {
    __e7 = [join(["let", __k6, ["if", ["numeric?", __k6], ["parseInt", __k6], __k6]], __body34)];
  }
  return ["let", [__o3, __t, __k6, "nil"], join(["%for", ____x300, __k6], props(__body34), [join(["let", [__v7, ["%get", __o3, __k6]]], __e7)])];
};
setenv37("each", "macro", __each__macro);
var __for__macro = function (i, to, ..._42args) {
  var ____r61 = unstash([..._42args]);
  var __i4 = destash33(i, ____r61);
  var __to = destash33(to, ____r61);
  var ____id59 = ____r61;
  var __body35 = cut(____id59, 0);
  if (__to === "in") {
    return join(["%for", hd(__body35), __i4, join(["%do"], tl(__body35))], props(__body35));
  } else {
    return ["let", __i4, 0, join(["while", ["<", __i4, __to]], __body35, [["inc", __i4]])];
  }
};
setenv37("for", "macro", __for__macro);
var __step__macro = function (v, t, ..._42args) {
  var ____r62 = unstash([..._42args]);
  var __v8 = destash33(v, ____r62);
  var __t1 = destash33(t, ____r62);
  var ____id60 = ____r62;
  var __body36 = cut(____id60, 0);
  var __x320 = unique("x");
  var __i5 = unique("i");
  return ["let", [__x320, __t1], ["for", __i5, ["#", __x320], join(["let", [__v8, ["at", __x320, __i5]]], __body36)]];
};
setenv37("step", "macro", __step__macro);
var __set_of__macro = function (..._42args) {
  var __xs = unstash([..._42args]);
  var __l6 = [];
  var ____o4 = __xs;
  var ____i6 = undefined;
  for (____i6 in ____o4) {
    var __x329 = ____o4[____i6];
    var __e8 = undefined;
    if (numeric63(____i6)) {
      __e8 = parseInt(____i6);
    } else {
      __e8 = ____i6;
    }
    var ____i61 = __e8;
    __l6[__x329] = true;
  }
  return join(["obj"], __l6);
};
setenv37("set-of", "macro", __set_of__macro);
var __target63__macro = function (x) {
  return ["=", "target", x];
};
setenv37("target?", "macro", __target63__macro);
var __target__macro = function (..._42args) {
  var __clauses2 = unstash([..._42args]);
  if (has63(__clauses2, has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value"))) {
    return __clauses2[has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value")];
  } else {
    return hd(__clauses2);
  }
};
setenv37("target", "macro", __target__macro);
var __language__macro = function () {
  return ["quote", has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value")];
};
setenv37("language", "macro", __language__macro);
var __join33__macro = function (a, ..._42args) {
  var ____r65 = unstash([..._42args]);
  var __a2 = destash33(a, ____r65);
  var ____id61 = ____r65;
  var __bs3 = cut(____id61, 0);
  return ["set", __a2, join(["join", __a2], __bs3)];
};
setenv37("join!", "macro", __join33__macro);
var __cat33__macro = function (a, ..._42args) {
  var ____r66 = unstash([..._42args]);
  var __a3 = destash33(a, ____r66);
  var ____id62 = ____r66;
  var __bs4 = cut(____id62, 0);
  return ["set", __a3, join(["cat", __a3], __bs4)];
};
setenv37("cat!", "macro", __cat33__macro);
var __inc__macro = function (n, by) {
  var __e9 = undefined;
  if (nil63(by)) {
    __e9 = 1;
  } else {
    __e9 = by;
  }
  return ["set", n, ["+", n, __e9]];
};
setenv37("inc", "macro", __inc__macro);
var __dec__macro = function (n, by) {
  var __e10 = undefined;
  if (nil63(by)) {
    __e10 = 1;
  } else {
    __e10 = by;
  }
  return ["set", n, ["-", n, __e10]];
};
setenv37("dec", "macro", __dec__macro);
var __with_indent__macro = function (form) {
  var __x344 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x344, form, ["dec", "indent-level"]]];
};
setenv37("with-indent", "macro", __with_indent__macro);
var __export__macro = function (..._42args) {
  var __names6 = unstash([..._42args]);
  var __forms3 = map(function (k) {
    if (k === compile(k)) {
      return ["%set", ["idx", "exports", k], k];
    } else {
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]];
    }
  }, __names6);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return join(["%do"], __forms3);
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms3, [["return", "exports"]]);
    }
  }
};
setenv37("export", "macro", __export__macro);
var __when_compiling__macro = function (..._42args) {
  var __body37 = unstash([..._42args]);
  return _eval(join(["%do"], __body37));
};
setenv37("when-compiling", "macro", __when_compiling__macro);
var __during_compilation__macro = function (..._42args) {
  var __body38 = unstash([..._42args]);
  var __form3 = join(["%do"], __body38);
  _eval(__form3);
  return __form3;
};
setenv37("during-compilation", "macro", __during_compilation__macro);
var __def__macro = function (name, ..._42args) {
  var ____r71 = unstash([..._42args]);
  var __name8 = destash33(name, ____r71);
  var ____id63 = ____r71;
  var __body39 = cut(____id63, 0);
  return join(["define-global", __name8], __body39);
};
setenv37("def", "macro", __def__macro);
var __mac__macro = function (name, ..._42args) {
  var ____r72 = unstash([..._42args]);
  var __name9 = destash33(name, ____r72);
  var ____id64 = ____r72;
  var __body40 = cut(____id64, 0);
  return join(["define-macro", __name9], __body40);
};
setenv37("mac", "macro", __mac__macro);
var __defconst__macro = function (name, ..._42args) {
  var ____r73 = unstash([..._42args]);
  var __name10 = destash33(name, ____r73);
  var ____id65 = ____r73;
  var __value = cut(____id65, 0);
  return join(["def", __name10], __value);
};
setenv37("defconst", "macro", __defconst__macro);
var __undefined63__macro = function (name) {
  var ____x374 = object(["target"]);
  ____x374.js = ["=", ["typeof", name], "\"undefined\""];
  ____x374.lua = ["=", ["idx", "_G", name], "nil"];
  ____x374.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x374;
};
setenv37("undefined?", "macro", __undefined63__macro);
var __defvar__macro = function (name, ..._42args) {
  var ____r75 = unstash([..._42args]);
  var __name11 = destash33(name, ____r75);
  var ____id66 = ____r75;
  var __value1 = cut(____id66, 0);
  var ____x386 = object(["target"]);
  ____x386.py = ["global", __name11];
  return ["when", ["undefined?", __name11], ____x386, join(["defconst", __name11], __value1)];
};
setenv37("defvar", "macro", __defvar__macro);
var __async__macro = function (keyword, ..._42args) {
  var ____r76 = unstash([..._42args]);
  var __keyword = destash33(keyword, ____r76);
  var ____id67 = ____r76;
  var __body41 = cut(____id67, 0);
  var ____x390 = object([__keyword]);
  ____x390.async = true;
  return join(____x390, __body41);
};
setenv37("async", "macro", __async__macro);
var ___37read_from_file__macro = function (name) {
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]];
};
setenv37("%read-from-file", "macro", ___37read_from_file__macro);
var __the__macro = function (name) {
  return ["getenv", ["quote", name], ["quote", "value"]];
};
setenv37("the", "macro", __the__macro);
var __cat__macro = function (a, ..._42args) {
  var ____r79 = unstash([..._42args]);
  var __a4 = destash33(a, ____r79);
  var ____id68 = ____r79;
  var __bs5 = cut(____id68, 0);
  if (nil63(__a4)) {
    return "";
  } else {
    if (none63(__bs5)) {
      return __a4;
    } else {
      if (one63(__bs5)) {
        var ____x400 = object(["target", join(["%cat", __a4], __bs5)]);
        ____x400.py = join(["%call", "cat", __a4], __bs5);
        return ____x400;
      } else {
        var ____x403 = object(["target", ["%cat", __a4, join(["cat"], __bs5)]]);
        ____x403.py = join(["%call", "cat", __a4], __bs5);
        return ____x403;
      }
    }
  }
};
setenv37("cat", "macro", __cat__macro);
var ___43__macro = function (..._42args) {
  var __args7 = unstash([..._42args]);
  if (none63(__args7)) {
    return 0;
  } else {
    if (one63(__args7)) {
      return hd(__args7);
    } else {
      return join(["%add"], __args7);
    }
  }
};
setenv37("+", "macro", ___43__macro);
var _____macro = function (..._42args) {
  var __args8 = unstash([..._42args]);
  if (none63(__args8)) {
    return 0;
  } else {
    if (one63(__args8)) {
      return ["%unm", hd(__args8)];
    } else {
      return join(["%sub"], __args8);
    }
  }
};
setenv37("-", "macro", _____macro);
var ___42__macro = function (..._42args) {
  var __args9 = unstash([..._42args]);
  if (none63(__args9)) {
    return 1;
  } else {
    if (one63(__args9)) {
      return hd(__args9);
    } else {
      return join(["%mul"], __args9);
    }
  }
};
setenv37("*", "macro", ___42__macro);
var ___47__macro = function (..._42args) {
  var __args10 = unstash([..._42args]);
  if (none63(__args10)) {
    return 1;
  } else {
    if (one63(__args10)) {
      return hd(__args10);
    } else {
      return join(["%div"], __args10);
    }
  }
};
setenv37("/", "macro", ___47__macro);
var ___4747__macro = function (..._42args) {
  var __args11 = unstash([..._42args]);
  if (none63(__args11)) {
    return 1;
  } else {
    if (one63(__args11)) {
      return hd(__args11);
    } else {
      return join(["%idiv"], __args11);
    }
  }
};
setenv37("//", "macro", ___4747__macro);
var ___37__macro = function (..._42args) {
  var __args12 = unstash([..._42args]);
  if (none63(__args12)) {
    return 0;
  } else {
    if (one63(__args12)) {
      return hd(__args12);
    } else {
      return join(["%mod"], __args12);
    }
  }
};
setenv37("%", "macro", ___37__macro);
var ___60__macro = function (a, ..._42args) {
  var ____r80 = unstash([..._42args]);
  var __a5 = destash33(a, ____r80);
  var ____id69 = ____r80;
  var __bs6 = cut(____id69, 0);
  if (none63(__bs6)) {
    return true;
  } else {
    if (one63(__bs6)) {
      return join(["%lt", __a5], __bs6);
    } else {
      return ["%and", ["%lt", __a5, hd(__bs6)], join(["<"], __bs6)];
    }
  }
};
setenv37("<", "macro", ___60__macro);
var ___6061__macro = function (a, ..._42args) {
  var ____r81 = unstash([..._42args]);
  var __a6 = destash33(a, ____r81);
  var ____id70 = ____r81;
  var __bs7 = cut(____id70, 0);
  if (none63(__bs7)) {
    return true;
  } else {
    if (one63(__bs7)) {
      return join(["%le", __a6], __bs7);
    } else {
      return ["%and", ["%le", __a6, hd(__bs7)], join(["<="], __bs7)];
    }
  }
};
setenv37("<=", "macro", ___6061__macro);
var ___61__macro = function (a, ..._42args) {
  var ____r82 = unstash([..._42args]);
  var __a7 = destash33(a, ____r82);
  var ____id71 = ____r82;
  var __bs8 = cut(____id71, 0);
  if (none63(__bs8)) {
    return true;
  } else {
    if (one63(__bs8)) {
      return join(["%eq", __a7], __bs8);
    } else {
      return ["%and", ["%eq", __a7, hd(__bs8)], join(["="], __bs8)];
    }
  }
};
setenv37("=", "macro", ___61__macro);
var ___6261__macro = function (a, ..._42args) {
  var ____r83 = unstash([..._42args]);
  var __a8 = destash33(a, ____r83);
  var ____id72 = ____r83;
  var __bs9 = cut(____id72, 0);
  if (none63(__bs9)) {
    return true;
  } else {
    if (one63(__bs9)) {
      return join(["%ge", __a8], __bs9);
    } else {
      return ["%and", ["%ge", __a8, hd(__bs9)], join([">="], __bs9)];
    }
  }
};
setenv37(">=", "macro", ___6261__macro);
var ___62__macro = function (a, ..._42args) {
  var ____r84 = unstash([..._42args]);
  var __a9 = destash33(a, ____r84);
  var ____id73 = ____r84;
  var __bs10 = cut(____id73, 0);
  if (none63(__bs10)) {
    return true;
  } else {
    if (one63(__bs10)) {
      return join(["%gt", __a9], __bs10);
    } else {
      return ["%and", ["%gt", __a9, hd(__bs10)], join([">"], __bs10)];
    }
  }
};
setenv37(">", "macro", ___62__macro);
var __not__macro = function (..._42args) {
  var __args13 = unstash([..._42args]);
  if (none63(__args13)) {
    return false;
  } else {
    if (one63(__args13)) {
      return join(["%not"], __args13);
    } else {
      return ["%and", ["%not", hd(__args13)], join(["not"], tl(__args13))];
    }
  }
};
setenv37("not", "macro", __not__macro);
var __and__macro = function (a, ..._42args) {
  var ____r85 = unstash([..._42args]);
  var __a10 = destash33(a, ____r85);
  var ____id74 = ____r85;
  var __bs111 = cut(____id74, 0);
  if (nil63(__a10)) {
    return true;
  } else {
    if (none63(__bs111)) {
      return __a10;
    } else {
      if (one63(__bs111)) {
        return join(["%and", __a10], __bs111);
      } else {
        return ["%and", __a10, join(["and"], __bs111)];
      }
    }
  }
};
setenv37("and", "macro", __and__macro);
var __or__macro = function (a, ..._42args) {
  var ____r86 = unstash([..._42args]);
  var __a11 = destash33(a, ____r86);
  var ____id75 = ____r86;
  var __bs121 = cut(____id75, 0);
  if (nil63(__a11)) {
    return false;
  } else {
    if (none63(__bs121)) {
      return __a11;
    } else {
      if (one63(__bs121)) {
        return join(["%or", __a11], __bs121);
      } else {
        return ["%or", __a11, join(["or"], __bs121)];
      }
    }
  }
};
setenv37("or", "macro", __or__macro);
var __break__macro = function (..._42args) {
  var __args14 = unstash([..._42args]);
  return join(["%break"], __args14);
};
setenv37("break", "macro", __break__macro);
var __return__macro = function (..._42args) {
  var __args15 = unstash([..._42args]);
  return join(["%return"], __args15);
};
setenv37("return", "macro", __return__macro);
var __while__macro = function (c, ..._42args) {
  var ____r87 = unstash([..._42args]);
  var __c = destash33(c, ____r87);
  var ____id76 = ____r87;
  var __body42 = cut(____id76, 0);
  return join(["%while", __c], __body42);
};
setenv37("while", "macro", __while__macro);
var __do__macro = function (..._42args) {
  var __body43 = unstash([..._42args]);
  return join(["%do"], __body43);
};
setenv37("do", "macro", __do__macro);
var __get__macro = function (..._42args) {
  var __args16 = unstash([..._42args]);
  return join(["%get"], __args16);
};
setenv37("get", "macro", __get__macro);
var __idx__macro = function (..._42args) {
  var __args17 = unstash([..._42args]);
  return join(["%idx"], __args17);
};
setenv37("idx", "macro", __idx__macro);
var __new__macro = function (..._42args) {
  var __args18 = unstash([..._42args]);
  return join(["%new"], __args18);
};
setenv37("new", "macro", __new__macro);
var __typeof__macro = function (..._42args) {
  var __args19 = unstash([..._42args]);
  return join(["%typeof"], __args19);
};
setenv37("typeof", "macro", __typeof__macro);
var __error__macro = function (..._42args) {
  var __args20 = unstash([..._42args]);
  return join(["%error"], __args20);
};
setenv37("error", "macro", __error__macro);
var __throw__macro = function (..._42args) {
  var __args21 = unstash([..._42args]);
  return join(["%throw"], __args21);
};
setenv37("throw", "macro", __throw__macro);
var __raise__macro = function (..._42args) {
  var __args22 = unstash([..._42args]);
  return join(["%throw"], __args22);
};
setenv37("raise", "macro", __raise__macro);
var __is__macro = function (..._42args) {
  var __args23 = unstash([..._42args]);
  var ____x481 = object(["target", join(["="], __args23)]);
  ____x481.py = join(["%is"], __args23);
  return ____x481;
};
setenv37("is", "macro", __is__macro);
var __in__macro = function (..._42args) {
  var __args24 = unstash([..._42args]);
  return join(["%in"], __args24);
};
setenv37("in", "macro", __in__macro);
var __as__macro = function (..._42args) {
  var __args25 = unstash([..._42args]);
  return join(["%as"], __args25);
};
setenv37("as", "macro", __as__macro);
var ___37expand_case__macro = function (x, ..._42args) {
  var ____r88 = unstash([..._42args]);
  var __x489 = destash33(x, ____r88);
  var ____id77 = ____r88;
  var __body44 = cut(____id77, 0);
  var __e11 = undefined;
  if (atom63(__x489)) {
    __e11 = [__x489];
  } else {
    __e11 = __x489;
  }
  var ____id78 = __e11;
  var __a12 = has(____id78, 0);
  var __bs13 = cut(____id78, 1);
  var __e12 = undefined;
  if (none63(__bs13)) {
    __e12 = [["%literal"]];
  } else {
    __e12 = __bs13;
  }
  return join(["%block", __a12], __e12, __body44);
};
setenv37("%expand-case", "macro", ___37expand_case__macro);
var ___37cases__macro = function (..._42args) {
  var __args26 = unstash([..._42args]);
  if (none63(__args26)) {
    return ["do"];
  } else {
    if (one63(__args26)) {
      return join(["%expand-case"], hd(__args26));
    } else {
      var __r89 = unique("r");
      return join(["with", __r89, "nil"], map(function (__x498) {
        var ____id79 = __x498;
        var __x499 = has(____id79, 0);
        var __body45 = cut(____id79, 1);
        return ["%expand-case", __x499, ["%set", __r89, join(["%do"], __body45)]];
      }, almost(__args26)), [join(["%expand-case"], last(__args26))]);
    }
  }
};
setenv37("%cases", "macro", ___37cases__macro);
var __try__macro = function (x, ..._42args) {
  var ____r91 = unstash([..._42args]);
  var __x506 = destash33(x, ____r91);
  var ____id80 = ____r91;
  var __cases = cut(____id80, 0);
  var __fin = ["finally"];
  var ____o5 = __cases;
  var ____i7 = undefined;
  for (____i7 in ____o5) {
    var __x508 = ____o5[____i7];
    var __e13 = undefined;
    if (numeric63(____i7)) {
      __e13 = parseInt(____i7);
    } else {
      __e13 = ____i7;
    }
    var ____i71 = __e13;
    if (hd63(__x508, "finally")) {
      __fin = __x508;
    }
  }
  var __forms4 = [];
  var ____x511 = __cases;
  var ____i8 = 0;
  while (____i8 < _35(____x511)) {
    var ____id81 = ____x511[____i8];
    var __x512 = has(____id81, 0);
    var __body46 = cut(____id81, 1);
    if (__x512 === "finally") {
    } else {
      if (__x512 === "except" && has(__body46, 1) === "as") {
        var ____id82 = __body46;
        var __kind2 = has(____id82, 0);
        var ___ = has(____id82, 1);
        var __name12 = has(____id82, 2);
        var __body47 = cut(____id82, 3);
        add(__forms4, join([[__x512, ["%as", __kind2, __name12]]], __body47));
      } else {
        if (__x512 === "except") {
          var ____id83 = __body46;
          var __kind3 = has(____id83, 0);
          var __body48 = cut(____id83, 1);
          add(__forms4, join([[__x512, __kind3]], __body48));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i8 = ____i8 + 1;
  }
  return join(["%cases", ["try", __x506]], __forms4, [__fin]);
};
setenv37("try", "macro", __try__macro);
var __errsafe__macro = function (x, _else) {
  if (nil63(_else)) {
    _else = "nil";
  }
  var __ok3 = unique("ok");
  var __v9 = unique("v");
  return ["let", [[__ok3, __v9], ["guard", x]], ["if", __ok3, __v9, _else]];
};
setenv37("errsafe", "macro", __errsafe__macro);
var __dbg__macro = function () {
  var ____x524 = object(["target", ["do"]]);
  ____x524.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x524;
};
setenv37("dbg", "macro", __dbg__macro);
var __see__macro = function (form) {
  var __form4 = expand(form);
  print(compile(expand(["%set", "lumen-result", __form4])));
  return __form4;
};
setenv37("see", "macro", __see__macro);

