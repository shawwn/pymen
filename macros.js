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
get_place = function (place, setfn) {
  var __place = macroexpand(place);
  if (atom63(__place) || (hd63(__place, "%get") && nil63(getenv("%get", "place-expander")) || (hd63(__place, "%idx") && nil63(getenv("%idx", "place-expander")) || accessor_literal63(hd(tl(__place)))))) {
    return setfn(__place, function (v) {
      return ["%set", __place, v];
    });
  } else {
    if (hd63(__place, "has") && nil63(getenv("has", "place-expander"))) {
      return setfn(__place, function (v) {
        return ["%set", join(["%get"], tl(__place)), v];
      });
    } else {
      var __head = hd(__place);
      var __gf = getenv(__head, "place-expander");
      if (__gf) {
        return apply(__gf, join([setfn], tl(__place), []));
      } else {
        throw new Error(str(__place) + (" is not a valid place expression: no place-expander for " + __head));
      }
    }
  }
};
var __let_place__macro = function (vars, place, ..._42args) {
  var ____r8 = unstash([..._42args]);
  var __vars1 = destash33(vars, ____r8);
  var __place2 = destash33(place, ____r8);
  var ____id1 = ____r8;
  var __body1 = cut(____id1, 0);
  return ["get-place", __place2, join(["fn", __vars1], __body1)];
};
setenv("let-place", {
  _stash: true,
  macro: __let_place__macro
});
var __define_expander__macro = function (name, handler) {
  var ____x13 = object(["setenv", ["quote", name]]);
  ____x13["place-expander"] = handler;
  var __form1 = ____x13;
  _eval(__form1);
  return __form1;
};
setenv("define-expander", {
  _stash: true,
  macro: __define_expander__macro
});
define_setter = function (name, setter, setfn, args, vars) {
  if (none63(args)) {
    var __vars2 = reverse(vars || []);
    return setfn(join([name], __vars2), function (v) {
      return apply(setter, join([v], __vars2, []));
    });
  } else {
    var __v = hd(args);
    return define_setter(name, setter, setfn, tl(args), join([__v], vars));
  }
};
var __define_setter__macro = function (name, arglist, ..._42args) {
  var ____r14 = unstash([..._42args]);
  var __name1 = destash33(name, ____r14);
  var __arglist1 = destash33(arglist, ____r14);
  var ____id3 = ____r14;
  var __body3 = cut(____id3, 0);
  var ____x29 = object(["setfn"]);
  ____x29.rest = "args";
  return ["define-expander", __name1, ["fn", ____x29, ["%call", "define-setter", ["quote", __name1], join(["fn", __arglist1], __body3), "setfn", "args"]]];
};
setenv("define-setter", {
  _stash: true,
  macro: __define_setter__macro
});
var __set__macro = function (..._42args) {
  var __args1 = unstash([..._42args]);
  return join(["%do"], map(function (__x38) {
    var ____id5 = __x38;
    var __lh1 = has(____id5, 0);
    var __rh1 = has(____id5, 1);
    return get_place(__lh1, function (getter, setter) {
      return setter(__rh1);
    });
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
  var __body6 = unstash([..._42args]);
  if (one63(__body6) && (hd63(__body6, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_args";
  } else {
    if (_35(__body6) > 2 && (__body6[1] === "for" && __body6[3] === "in")) {
      var ____id9 = __body6;
      var __expr2 = has(____id9, 0);
      var __body7 = cut(____id9, 1);
      var __comps1 = [];
      var __cond1 = undefined;
      while (_35(__body7) > 2 && (__body7[0] === "for" && __body7[2] === "in")) {
        var ____id10 = __body7;
        var ___for1 = has(____id10, 0);
        var __names1 = has(____id10, 1);
        var ___in1 = has(____id10, 2);
        var __l2 = has(____id10, 3);
        var __body12 = cut(____id10, 4);
        add(__comps1, [__names1, __l2]);
        __body7 = __body12;
      }
      if (hd(__body7) === "if") {
        var ____id11 = __body7;
        var ___if1 = has(____id11, 0);
        var __expr3 = has(____id11, 1);
        __cond1 = __expr3;
      }
      return ["%list", __expr2, __comps1, __cond1];
    } else {
      var __x62 = unique("x");
      var __l3 = [];
      var __forms1 = [];
      var ____o1 = __body6;
      var __k2 = undefined;
      for (__k2 in ____o1) {
        var __v2 = ____o1[__k2];
        var __e12 = undefined;
        if (numeric63(__k2)) {
          __e12 = parseInt(__k2);
        } else {
          __e12 = __k2;
        }
        var __k3 = __e12;
        if (number63(__k3)) {
          __l3[__k3] = __v2;
        } else {
          add(__forms1, ["%set", ["%get", __x62, ["quote", __k3]], __v2]);
        }
      }
      if (some63(__forms1)) {
        return join(["let", __x62, ["object", join(["%array"], __l3)]], __forms1, [__x62]);
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
  var ____r26 = unstash([..._42args]);
  var __expr5 = destash33(expr, ____r26);
  var ____id14 = ____r26;
  var __e13 = undefined;
  if (nil63(has(____id14, "cmp"))) {
    __e13 = "=";
  } else {
    __e13 = has(____id14, "cmp");
  }
  var __cmp1 = __e13;
  var __clauses1 = cut(____id14, 0);
  var __x86 = unique("x");
  var __eq1 = function (_) {
    return [__cmp1, _, __x86];
  };
  var __cl1 = function (__x88) {
    var ____id15 = __x88;
    var __a1 = has(____id15, 0);
    var __b1 = has(____id15, 1);
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
  return ["let", __x86, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
};
setenv("case", {
  _stash: true,
  macro: __case__macro
});
var __of__macro = function (x, ..._42args) {
  var ____r30 = unstash([..._42args]);
  var __x101 = destash33(x, ____r30);
  var ____id17 = ____r30;
  var __values1 = cut(____id17, 0);
  return join(["case", __x101, __values1, true, false], props(__values1));
};
setenv("of", {
  _stash: true,
  macro: __of__macro
});
var __when__macro = function (cond, ..._42args) {
  var ____r32 = unstash([..._42args]);
  var __cond3 = destash33(cond, ____r32);
  var ____id19 = ____r32;
  var __body9 = cut(____id19, 0);
  return ["%if", __cond3, join(["%do"], __body9)];
};
setenv("when", {
  _stash: true,
  macro: __when__macro
});
var __unless__macro = function (cond, ..._42args) {
  var ____r34 = unstash([..._42args]);
  var __cond5 = destash33(cond, ____r34);
  var ____id21 = ____r34;
  var __body111 = cut(____id21, 0);
  return ["%if", ["%not", __cond5], join(["%do"], __body111)];
};
setenv("unless", {
  _stash: true,
  macro: __unless__macro
});
var __obj__macro = function (..._42args) {
  var __body14 = unstash([..._42args]);
  if (one63(__body14) && (hd63(__body14, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_keys";
  } else {
    if (_35(__body14) > 2 && (__body14[1] === "for" && __body14[3] === "in")) {
      var ____id25 = __body14;
      var __expr8 = has(____id25, 0);
      var __body15 = cut(____id25, 1);
      var __comps3 = [];
      var __cond7 = undefined;
      while (_35(__body15) > 2 && (__body15[0] === "for" && __body15[2] === "in")) {
        var ____id26 = __body15;
        var ___for3 = has(____id26, 0);
        var __names3 = has(____id26, 1);
        var ___in3 = has(____id26, 2);
        var __l5 = has(____id26, 3);
        var __body141 = cut(____id26, 4);
        add(__comps3, [__names3, __l5]);
        __body15 = __body141;
      }
      if (hd(__body15) === "if") {
        var ____id27 = __body15;
        var ___if3 = has(____id27, 0);
        var __expr9 = has(____id27, 1);
        __cond7 = __expr9;
      }
      if (list63(__expr8) && hd63(__expr8, ",")) {
        __expr8 = join([":"], tl(__expr8));
      }
      var ____x125 = object(["%list", __expr8, __comps3, __cond7]);
      ____x125.kind = "object";
      return ____x125;
    } else {
      return join(["%object"], mapo(function (x) {
        return x;
      }, __body14));
    }
  }
};
setenv("obj", {
  _stash: true,
  macro: __obj__macro
});
var __let__macro = function (bs, ..._42args) {
  var ____r38 = unstash([..._42args]);
  var __bs11 = destash33(bs, ____r38);
  var ____id32 = ____r38;
  var __body17 = cut(____id32, 0);
  if (atom63(__bs11) || hd63(__bs11, ",")) {
    return join(["let", [__bs11, hd(__body17)]], tl(__body17));
  } else {
    if (none63(__bs11)) {
      return join(["%do"], __body17);
    } else {
      var ____id33 = __bs11;
      var __lh3 = has(____id33, 0);
      var __rh3 = has(____id33, 1);
      var __bs21 = cut(____id33, 2);
      var ____id34 = bind(__lh3, __rh3);
      var __id35 = has(____id34, 0);
      var __val1 = has(____id34, 1);
      var __bs12 = cut(____id34, 2);
      var __renames1 = [];
      if (! id_literal63(__id35)) {
        var __id121 = unique(__id35);
        __renames1 = [__id35, __id121];
        __id35 = __id121;
      }
      return ["%do", ["%local", __id35, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body17)]];
    }
  }
};
setenv("let", {
  _stash: true,
  macro: __let__macro
});
var __with__macro = function (x, v, ..._42args) {
  var ____r40 = unstash([..._42args]);
  var __x154 = destash33(x, ____r40);
  var __v4 = destash33(v, ____r40);
  var ____id37 = ____r40;
  var __body19 = cut(____id37, 0);
  if (__v4 === "as") {
    return join(["%with", ["%as", __x154, hd(__body19)]], tl(__body19));
  } else {
    if (! atom63(__x154) || has(__body19, "async")) {
      return join(["%with", __x154, __v4], __body19);
    } else {
      return join(["let", [__x154, __v4]], __body19, [__x154]);
    }
  }
};
setenv("with", {
  _stash: true,
  macro: __with__macro
});
var __let_when__macro = function (x, v, ..._42args) {
  var ____r42 = unstash([..._42args]);
  var __x169 = destash33(x, ____r42);
  var __v6 = destash33(v, ____r42);
  var ____id39 = ____r42;
  var __body21 = cut(____id39, 0);
  var __y1 = unique("y");
  return ["let", __y1, __v6, ["when", ["yes", __y1], join(["let", [__x169, __y1]], __body21)]];
};
setenv("let-when", {
  _stash: true,
  macro: __let_when__macro
});
var __define_macro__macro = function (name, args, ..._42args) {
  var ____r44 = unstash([..._42args]);
  var __name3 = destash33(name, ____r44);
  var __args3 = destash33(args, ____r44);
  var ____id42 = ____r44;
  var __body23 = cut(____id42, 0);
  var __id43 = unique(__name3 + "--macro");
  var ____x183 = object(["setenv", ["quote", __name3]]);
  ____x183.macro = __id43;
  var __form3 = ["do", join(["define", __id43, __args3], __body23), ____x183];
  _eval(__form3);
  return __form3;
};
setenv("define-macro", {
  _stash: true,
  macro: __define_macro__macro
});
var __define_special__macro = function (name, args, ..._42args) {
  var ____r46 = unstash([..._42args]);
  var __name5 = destash33(name, ____r46);
  var __args5 = destash33(args, ____r46);
  var ____id46 = ____r46;
  var __body25 = cut(____id46, 0);
  var __id47 = unique(__name5 + "--special");
  var ____x193 = object(["setenv", ["quote", __name5]]);
  ____x193.special = __id47;
  var __form5 = ["do", join(["define", __id47, __args5], __body25), join(____x193, props(__body25))];
  _eval(__form5);
  return __form5;
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
  var ____x198 = object(["setenv", ["quote", name]]);
  ____x198.symbol = ["quote", expansion];
  return ____x198;
};
setenv("define-symbol", {
  _stash: true,
  macro: __define_symbol__macro
});
var __define_reader__macro = function (__x207, ..._42args) {
  var ____r50 = unstash([..._42args]);
  var ____x207 = destash33(__x207, ____r50);
  var ____id50 = ____x207;
  var __char1 = has(____id50, 0);
  var __s1 = has(____id50, 1);
  var ____id51 = ____r50;
  var __body27 = cut(____id51, 0);
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s1]], __body27)];
};
setenv("define-reader", {
  _stash: true,
  macro: __define_reader__macro
});
var __define__macro = function (name, x, ..._42args) {
  var ____r52 = unstash([..._42args]);
  var __name7 = destash33(name, ____r52);
  var __x218 = destash33(x, ____r52);
  var ____id53 = ____r52;
  var __body29 = cut(____id53, 0);
  setenv(__name7, {
    _stash: true,
    variable: true
  });
  if (some63(__body29)) {
    return join(["%local-function", __name7], bind42(__x218, __body29), props(__body29));
  } else {
    return join(["%local", __name7, __x218], props(__body29));
  }
};
setenv("define", {
  _stash: true,
  macro: __define__macro
});
var __define_global__macro = function (name, x, ..._42args) {
  var ____r54 = unstash([..._42args]);
  var __name9 = destash33(name, ____r54);
  var __x226 = destash33(x, ____r54);
  var ____id55 = ____r54;
  var __body31 = cut(____id55, 0);
  setenv(__name9, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body31)) {
    return join(["%global-function", __name9], bind42(__x226, __body31), props(__body31));
  } else {
    return join(["set", __name9, __x226], props(__body31));
  }
};
setenv("define-global", {
  _stash: true,
  macro: __define_global__macro
});
var __get_value__macro = function (x) {
  var ____x233 = object(["setenv", x]);
  ____x233.toplevel = true;
  return ["has", ____x233, ["quote", "value"]];
};
setenv("get-value", {
  _stash: true,
  macro: __get_value__macro
});
var __define_constant__macro = function (name, x) {
  var ____x244 = object(["setenv", ["quote", name]]);
  ____x244.toplevel = true;
  ____x244.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x244, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
  var ____r63 = unstash([..._42args]);
  var __x274 = destash33(x, ____r63);
  var ____id57 = ____r63;
  var __body33 = cut(____id57, 0);
  var __ok1 = unique("ok");
  var __r64 = unique("r");
  var ____x275 = object(["target", ["try", __x274, join(["finally"], __body33)]]);
  ____x275.lua = join(["let", [[__ok1, __r64], ["guard", __x274]]], __body33, [["if", __ok1, __r64, ["throw", __r64]]]);
  return ____x275;
};
setenv("after", {
  _stash: true,
  macro: __after__macro
});
var __with_frame__macro = function (..._42args) {
  var __body35 = unstash([..._42args]);
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body35), ["drop", "environment"]]];
};
setenv("with-frame", {
  _stash: true,
  macro: __with_frame__macro
});
var __with_values__macro = function (..._42args) {
  var __body37 = unstash([..._42args]);
  var __forms3 = [];
  var ____o3 = __body37;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v8 = ____o3[__k6];
    var __e14 = undefined;
    if (numeric63(__k6)) {
      __e14 = parseInt(__k6);
    } else {
      __e14 = __k6;
    }
    var __k7 = __e14;
    if (! number63(__k7)) {
      var ____x305 = object(["setenv", ["quote", __k7]]);
      ____x305.value = __v8;
      add(__forms3, ____x305);
    }
  }
  return join(["with-frame"], __forms3);
};
setenv("with-values", {
  _stash: true,
  macro: __with_values__macro
});
var __with_bindings__macro = function (__x313, ..._42args) {
  var ____r66 = unstash([..._42args]);
  var ____x313 = destash33(__x313, ____r66);
  var ____id60 = ____x313;
  var __names5 = has(____id60, 0);
  var ____id61 = ____r66;
  var __body39 = cut(____id61, 0);
  var __x315 = unique("x");
  var ____x318 = object(["setenv", __x315]);
  ____x318.variable = true;
  return join(["with-frame", ["each", __x315, __names5, ____x318]], __body39);
};
setenv("with-bindings", {
  _stash: true,
  macro: __with_bindings__macro
});
var __let_macro__macro = function (definitions, ..._42args) {
  var ____r71 = unstash([..._42args]);
  var __definitions1 = destash33(definitions, ____r71);
  var ____id63 = ____r71;
  var __body41 = cut(____id63, 0);
  add(environment, {});
  var ____r73 = undefined;
  try{
    map(function (m) {
      return macroexpand(join(["define-macro"], m));
    }, __definitions1);
    ____r73 = join(["%do"], macroexpand(__body41));
  }
  finally{
    drop(environment);
  }
  return ____r73;
};
setenv("let-macro", {
  _stash: true,
  macro: __let_macro__macro
});
var __let_symbol__macro = function (expansions, ..._42args) {
  var ____r79 = unstash([..._42args]);
  var __expansions1 = destash33(expansions, ____r79);
  var ____id66 = ____r79;
  var __body43 = cut(____id66, 0);
  add(environment, {});
  var ____r81 = undefined;
  try{
    map(function (__x330) {
      var ____id67 = __x330;
      var __name11 = has(____id67, 0);
      var __exp1 = has(____id67, 1);
      return macroexpand(["define-symbol", __name11, __exp1]);
    }, pair(__expansions1));
    ____r81 = join(["%do"], macroexpand(__body43));
  }
  finally{
    drop(environment);
  }
  return ____r81;
};
setenv("let-symbol", {
  _stash: true,
  macro: __let_symbol__macro
});
var __let_unique__macro = function (names, ..._42args) {
  var ____r85 = unstash([..._42args]);
  var __names7 = destash33(names, ____r85);
  var ____id69 = ____r85;
  var __body45 = cut(____id69, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names7);
  return join(["let", apply(join, __bs3)], __body45);
};
setenv("let-unique", {
  _stash: true,
  macro: __let_unique__macro
});
var __fn__macro = function (args, ..._42args) {
  var ____r88 = unstash([..._42args]);
  var __args7 = destash33(args, ____r88);
  var ____id71 = ____r88;
  var __body47 = cut(____id71, 0);
  return join(["%function"], bind42(__args7, __body47), props(__body47));
};
setenv("fn", {
  _stash: true,
  macro: __fn__macro
});
var __apply__macro = function (f, ..._42args) {
  var ____r90 = unstash([..._42args]);
  var __f1 = destash33(f, ____r90);
  var ____id73 = ____r90;
  var __args9 = cut(____id73, 0);
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
  var ____x397 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x409 = object(["obj"]);
  ____x409.stack = [["idx", "debug", "traceback"]];
  ____x409.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x397.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x409]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x397];
};
setenv("guard", {
  _stash: true,
  macro: __guard__macro
});
var __each__macro = function (x, t, ..._42args) {
  var ____r94 = unstash([..._42args]);
  var __x438 = destash33(x, ____r94);
  var __t1 = destash33(t, ____r94);
  var ____id76 = ____r94;
  var __body49 = cut(____id76, 0);
  var __o5 = unique("o");
  var __n5 = unique("n");
  var __i5 = unique("i");
  var __e15 = undefined;
  if (atom63(__x438)) {
    __e15 = [__i5, __x438];
  } else {
    var __e16 = undefined;
    if (_35(__x438) > 1) {
      __e16 = __x438;
    } else {
      __e16 = [__i5, hd(__x438)];
    }
    __e15 = __e16;
  }
  var ____id77 = __e15;
  var __k9 = has(____id77, 0);
  var __v10 = has(____id77, 1);
  var ____x444 = object(["target", __o5]);
  ____x444.py = ["indices", __o5];
  var __e17 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e17 = __body49;
  } else {
    __e17 = [join(["let", __k9, ["if", ["numeric?", __k9], ["parseInt", __k9], __k9]], __body49)];
  }
  return ["let", [__o5, __t1, __k9, "nil"], join(["%for", ____x444, __k9], props(__body49), [join(["let", [__v10, ["%get", __o5, __k9]]], __e17)])];
};
setenv("each", {
  _stash: true,
  macro: __each__macro
});
var __for__macro = function (i, to, ..._42args) {
  var ____r96 = unstash([..._42args]);
  var __i7 = destash33(i, ____r96);
  var __to1 = destash33(to, ____r96);
  var ____id79 = ____r96;
  var __body51 = cut(____id79, 0);
  if (__to1 === "in") {
    return join(["%for", hd(__body51), __i7, join(["%do"], tl(__body51))], props(__body51));
  } else {
    return ["let", __i7, 0, join(["while", ["<", __i7, __to1]], __body51, [["inc", __i7]])];
  }
};
setenv("for", {
  _stash: true,
  macro: __for__macro
});
var __step__macro = function (v, t, ..._42args) {
  var ____r98 = unstash([..._42args]);
  var __v12 = destash33(v, ____r98);
  var __t3 = destash33(t, ____r98);
  var ____id81 = ____r98;
  var __body53 = cut(____id81, 0);
  var __x481 = unique("x");
  var __i9 = unique("i");
  return ["let", [__x481, __t3], ["for", __i9, ["#", __x481], join(["let", [__v12, ["at", __x481, __i9]]], __body53)]];
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
    var __x493 = ____o7[____i11];
    var __e18 = undefined;
    if (numeric63(____i11)) {
      __e18 = parseInt(____i11);
    } else {
      __e18 = ____i11;
    }
    var ____i111 = __e18;
    __l7[__x493] = true;
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
  var ____r104 = unstash([..._42args]);
  var __a3 = destash33(a, ____r104);
  var ____id83 = ____r104;
  var __bs5 = cut(____id83, 0);
  return ["set", __a3, join(["join", __a3], __bs5)];
};
setenv("join!", {
  _stash: true,
  macro: __join33__macro
});
var __cat33__macro = function (a, ..._42args) {
  var ____r106 = unstash([..._42args]);
  var __a5 = destash33(a, ____r106);
  var ____id85 = ____r106;
  var __bs7 = cut(____id85, 0);
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
  var __x526 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x526, form, ["dec", "indent-level"]]];
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
  var __body55 = unstash([..._42args]);
  return _eval(join(["%do"], __body55));
};
setenv("when-compiling", {
  _stash: true,
  macro: __when_compiling__macro
});
var __during_compilation__macro = function (..._42args) {
  var __body57 = unstash([..._42args]);
  var __form7 = join(["%do"], __body57);
  _eval(__form7);
  return __form7;
};
setenv("during-compilation", {
  _stash: true,
  macro: __during_compilation__macro
});
setenv("has", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r117 = unstash([..._42args]);
    var __setfn1 = destash33(setfn, ____r117);
    var ____id87 = ____r117;
    var __args11 = cut(____id87, 0);
    return define_setter("has", function (v, l, k) {
      return ["%set", ["%get", l, k], v];
    }, __setfn1, __args11);
  }
});
setenv("char", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r121 = unstash([..._42args]);
    var __setfn3 = destash33(setfn, ____r121);
    var ____id89 = ____r121;
    var __args13 = cut(____id89, 0);
    return define_setter("char", function (c, str, pos) {
      return ["set", str, ["cat", ["clip", str, 0, pos], c, ["clip", str, ["+", pos, 1]]]];
    }, __setfn3, __args13);
  }
});
setenv("clip", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r125 = unstash([..._42args]);
    var __setfn5 = destash33(setfn, ____r125);
    var ____id91 = ____r125;
    var __args15 = cut(____id91, 0);
    return define_setter("clip", function (c, str, from, upto) {
      return ["set", str, ["cat", ["clip", str, 0, from], c, ["clip", str, upto]]];
    }, __setfn5, __args15);
  }
});
setenv("inner", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r129 = unstash([..._42args]);
    var __setfn7 = destash33(setfn, ____r129);
    var ____id93 = ____r129;
    var __args17 = cut(____id93, 0);
    return define_setter("inner", function (c, str) {
      return ["set", str, ["cat", ["char", str, 0], c, ["char", str, ["edge", str]]]];
    }, __setfn7, __args17);
  }
});
setenv("cut", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r133 = unstash([..._42args]);
    var __setfn9 = destash33(setfn, ____r133);
    var ____id95 = ____r133;
    var __args19 = cut(____id95, 0);
    return define_setter("cut", function (v, l, from, upto) {
      return ["set", l, ["join", ["cut", l, 0, from], v, ["cut", l, either(upto, ["#", l])], ["keys", v]]];
    }, __setfn9, __args19);
  }
});
setenv("tl", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r137 = unstash([..._42args]);
    var __setfn11 = destash33(setfn, ____r137);
    var ____id97 = ____r137;
    var __args21 = cut(____id97, 0);
    return define_setter("tl", function (v, l, from) {
      return ["set", ["cut", l, either(from, 1)], v];
    }, __setfn11, __args21);
  }
});
setenv("hd", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r141 = unstash([..._42args]);
    var __setfn13 = destash33(setfn, ____r141);
    var ____id99 = ____r141;
    var __args23 = cut(____id99, 0);
    return define_setter("hd", function (v, l, n) {
      return ["set", ["at", l, either(n, 0)], v];
    }, __setfn13, __args23);
  }
});
setenv("last", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r145 = unstash([..._42args]);
    var __setfn15 = destash33(setfn, ____r145);
    var ____id101 = ____r145;
    var __args25 = cut(____id101, 0);
    return define_setter("last", function (v, l) {
      return ["set", ["at", l, ["edge", l]], v];
    }, __setfn15, __args25);
  }
});
var __def__macro = function (name, ..._42args) {
  var ____r148 = unstash([..._42args]);
  var __name13 = destash33(name, ____r148);
  var ____id103 = ____r148;
  var __body59 = cut(____id103, 0);
  return join(["define-global", __name13], __body59);
};
setenv("def", {
  _stash: true,
  macro: __def__macro
});
var __mac__macro = function (name, ..._42args) {
  var ____r150 = unstash([..._42args]);
  var __name15 = destash33(name, ____r150);
  var ____id105 = ____r150;
  var __body61 = cut(____id105, 0);
  return join(["define-macro", __name15], __body61);
};
setenv("mac", {
  _stash: true,
  macro: __mac__macro
});
var __defconst__macro = function (name, ..._42args) {
  var ____r152 = unstash([..._42args]);
  var __name17 = destash33(name, ____r152);
  var ____id107 = ____r152;
  var __value1 = cut(____id107, 0);
  return join(["def", __name17], __value1);
};
setenv("defconst", {
  _stash: true,
  macro: __defconst__macro
});
var __undefined63__macro = function (name) {
  var ____x664 = object(["target"]);
  ____x664.js = ["=", ["typeof", name], "\"undefined\""];
  ____x664.lua = ["=", ["idx", "_G", name], "nil"];
  ____x664.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x664;
};
setenv("undefined?", {
  _stash: true,
  macro: __undefined63__macro
});
var __defvar__macro = function (name, ..._42args) {
  var ____r156 = unstash([..._42args]);
  var __name19 = destash33(name, ____r156);
  var ____id109 = ____r156;
  var __value3 = cut(____id109, 0);
  var ____x682 = object(["target"]);
  ____x682.py = ["global", __name19];
  return ["when", ["undefined?", __name19], ____x682, join(["defconst", __name19], __value3)];
};
setenv("defvar", {
  _stash: true,
  macro: __defvar__macro
});
var __async__macro = function (keyword, ..._42args) {
  var ____r158 = unstash([..._42args]);
  var __keyword1 = destash33(keyword, ____r158);
  var ____id1111 = ____r158;
  var __body63 = cut(____id1111, 0);
  var ____x688 = object([__keyword1]);
  ____x688.async = true;
  return join(____x688, __body63);
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
  var ____r164 = unstash([..._42args]);
  var __a7 = destash33(a, ____r164);
  var ____id113 = ____r164;
  var __bs9 = cut(____id113, 0);
  if (nil63(__a7)) {
    return "";
  } else {
    if (none63(__bs9)) {
      return __a7;
    } else {
      if (one63(__bs9)) {
        var ____x714 = object(["target", join(["%cat", __a7], __bs9)]);
        ____x714.py = join(["%call", "cat", __a7], __bs9);
        return ____x714;
      } else {
        var ____x717 = object(["target", ["%cat", __a7, join(["cat"], __bs9)]]);
        ____x717.py = join(["%call", "cat", __a7], __bs9);
        return ____x717;
      }
    }
  }
};
setenv("cat", {
  _stash: true,
  macro: __cat__macro
});
var ___43__macro = function (..._42args) {
  var __args27 = unstash([..._42args]);
  if (none63(__args27)) {
    return 0;
  } else {
    if (one63(__args27)) {
      return hd(__args27);
    } else {
      return join(["%add"], __args27);
    }
  }
};
setenv("+", {
  _stash: true,
  macro: ___43__macro
});
var _____macro = function (..._42args) {
  var __args29 = unstash([..._42args]);
  if (none63(__args29)) {
    return 0;
  } else {
    if (one63(__args29)) {
      return ["%unm", hd(__args29)];
    } else {
      return join(["%sub"], __args29);
    }
  }
};
setenv("-", {
  _stash: true,
  macro: _____macro
});
var ___42__macro = function (..._42args) {
  var __args31 = unstash([..._42args]);
  if (none63(__args31)) {
    return 1;
  } else {
    if (one63(__args31)) {
      return hd(__args31);
    } else {
      return join(["%mul"], __args31);
    }
  }
};
setenv("*", {
  _stash: true,
  macro: ___42__macro
});
var ___47__macro = function (..._42args) {
  var __args33 = unstash([..._42args]);
  if (none63(__args33)) {
    return 1;
  } else {
    if (one63(__args33)) {
      return hd(__args33);
    } else {
      return join(["%div"], __args33);
    }
  }
};
setenv("/", {
  _stash: true,
  macro: ___47__macro
});
var ___4747__macro = function (..._42args) {
  var __args35 = unstash([..._42args]);
  if (none63(__args35)) {
    return 1;
  } else {
    if (one63(__args35)) {
      return hd(__args35);
    } else {
      return join(["%idiv"], __args35);
    }
  }
};
setenv("//", {
  _stash: true,
  macro: ___4747__macro
});
var ___37__macro = function (..._42args) {
  var __args37 = unstash([..._42args]);
  if (none63(__args37)) {
    return 0;
  } else {
    if (one63(__args37)) {
      return hd(__args37);
    } else {
      return join(["%mod"], __args37);
    }
  }
};
setenv("%", {
  _stash: true,
  macro: ___37__macro
});
var ___60__macro = function (a, ..._42args) {
  var ____r166 = unstash([..._42args]);
  var __a9 = destash33(a, ____r166);
  var ____id115 = ____r166;
  var __bs111 = cut(____id115, 0);
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
  var ____r168 = unstash([..._42args]);
  var __a11 = destash33(a, ____r168);
  var ____id117 = ____r168;
  var __bs13 = cut(____id117, 0);
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
  var ____r170 = unstash([..._42args]);
  var __a13 = destash33(a, ____r170);
  var ____id119 = ____r170;
  var __bs15 = cut(____id119, 0);
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
  var ____r172 = unstash([..._42args]);
  var __a15 = destash33(a, ____r172);
  var ____id1211 = ____r172;
  var __bs17 = cut(____id1211, 0);
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
  var ____r174 = unstash([..._42args]);
  var __a17 = destash33(a, ____r174);
  var ____id123 = ____r174;
  var __bs19 = cut(____id123, 0);
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
  var __args39 = unstash([..._42args]);
  if (none63(__args39)) {
    return false;
  } else {
    if (one63(__args39)) {
      return join(["%not"], __args39);
    } else {
      return ["%and", ["%not", hd(__args39)], join(["not"], tl(__args39))];
    }
  }
};
setenv("not", {
  _stash: true,
  macro: __not__macro
});
var __and__macro = function (a, ..._42args) {
  var ____r176 = unstash([..._42args]);
  var __a19 = destash33(a, ____r176);
  var ____id125 = ____r176;
  var __bs211 = cut(____id125, 0);
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
  var ____r178 = unstash([..._42args]);
  var __a21 = destash33(a, ____r178);
  var ____id127 = ____r178;
  var __bs23 = cut(____id127, 0);
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
  var __args41 = unstash([..._42args]);
  return join(["%break"], __args41);
};
setenv("break", {
  _stash: true,
  macro: __break__macro
});
var __return__macro = function (..._42args) {
  var __args43 = unstash([..._42args]);
  return join(["%return"], __args43);
};
setenv("return", {
  _stash: true,
  macro: __return__macro
});
var __while__macro = function (c, ..._42args) {
  var ____r180 = unstash([..._42args]);
  var __c1 = destash33(c, ____r180);
  var ____id129 = ____r180;
  var __body65 = cut(____id129, 0);
  return join(["%while", __c1], __body65);
};
setenv("while", {
  _stash: true,
  macro: __while__macro
});
var __do__macro = function (..._42args) {
  var __body67 = unstash([..._42args]);
  return join(["%do"], __body67);
};
setenv("do", {
  _stash: true,
  macro: __do__macro
});
var __get__macro = function (..._42args) {
  var __args45 = unstash([..._42args]);
  return join(["%get"], __args45);
};
setenv("get", {
  _stash: true,
  macro: __get__macro
});
var __idx__macro = function (..._42args) {
  var __args47 = unstash([..._42args]);
  return join(["%idx"], __args47);
};
setenv("idx", {
  _stash: true,
  macro: __idx__macro
});
var __new__macro = function (..._42args) {
  var __args49 = unstash([..._42args]);
  return join(["%new"], __args49);
};
setenv("new", {
  _stash: true,
  macro: __new__macro
});
var __typeof__macro = function (..._42args) {
  var __args51 = unstash([..._42args]);
  return join(["%typeof"], __args51);
};
setenv("typeof", {
  _stash: true,
  macro: __typeof__macro
});
var __error__macro = function (..._42args) {
  var __args53 = unstash([..._42args]);
  return join(["%error"], __args53);
};
setenv("error", {
  _stash: true,
  macro: __error__macro
});
var __throw__macro = function (..._42args) {
  var __args55 = unstash([..._42args]);
  return join(["%throw"], __args55);
};
setenv("throw", {
  _stash: true,
  macro: __throw__macro
});
var __raise__macro = function (..._42args) {
  var __args57 = unstash([..._42args]);
  return join(["%throw"], __args57);
};
setenv("raise", {
  _stash: true,
  macro: __raise__macro
});
var __is__macro = function (..._42args) {
  var __args59 = unstash([..._42args]);
  var ____x872 = object(["target", join(["="], __args59)]);
  ____x872.py = join(["%is"], __args59);
  return ____x872;
};
setenv("is", {
  _stash: true,
  macro: __is__macro
});
var __in__macro = function (..._42args) {
  var __args61 = unstash([..._42args]);
  return join(["%in"], __args61);
};
setenv("in", {
  _stash: true,
  macro: __in__macro
});
var __as__macro = function (..._42args) {
  var __args63 = unstash([..._42args]);
  return join(["%as"], __args63);
};
setenv("as", {
  _stash: true,
  macro: __as__macro
});
var ___37expand_case__macro = function (x, ..._42args) {
  var ____r182 = unstash([..._42args]);
  var __x890 = destash33(x, ____r182);
  var ____id132 = ____r182;
  var __body69 = cut(____id132, 0);
  var __e21 = undefined;
  if (atom63(__x890)) {
    __e21 = [__x890];
  } else {
    __e21 = __x890;
  }
  var ____id133 = __e21;
  var __a23 = has(____id133, 0);
  var __bs25 = cut(____id133, 1);
  var __e22 = undefined;
  if (none63(__bs25)) {
    __e22 = [["%literal"]];
  } else {
    __e22 = __bs25;
  }
  return join(["%block", __a23], __e22, __body69);
};
setenv("%expand-case", {
  _stash: true,
  macro: ___37expand_case__macro
});
var ___37cases__macro = function (..._42args) {
  var __args65 = unstash([..._42args]);
  if (none63(__args65)) {
    return ["do"];
  } else {
    if (one63(__args65)) {
      return join(["%expand-case"], hd(__args65));
    } else {
      var __r185 = unique("r");
      return join(["with", __r185, "nil"], map(function (__x910) {
        var ____id135 = __x910;
        var __x911 = has(____id135, 0);
        var __body71 = cut(____id135, 1);
        return ["%expand-case", __x911, ["%set", __r185, join(["%do"], __body71)]];
      }, almost(__args65)), [join(["%expand-case"], last(__args65))]);
    }
  }
};
setenv("%cases", {
  _stash: true,
  macro: ___37cases__macro
});
var __try__macro = function (x, ..._42args) {
  var ____r188 = unstash([..._42args]);
  var __x932 = destash33(x, ____r188);
  var ____id140 = ____r188;
  var __cases1 = cut(____id140, 0);
  var __fin1 = ["finally"];
  var ____o9 = __cases1;
  var ____i14 = undefined;
  for (____i14 in ____o9) {
    var __x934 = ____o9[____i14];
    var __e23 = undefined;
    if (numeric63(____i14)) {
      __e23 = parseInt(____i14);
    } else {
      __e23 = ____i14;
    }
    var ____i141 = __e23;
    if (hd63(__x934, "finally")) {
      __fin1 = __x934;
    }
  }
  var __forms7 = [];
  var ____x937 = __cases1;
  var ____i15 = 0;
  while (____i15 < _35(____x937)) {
    var ____id141 = ____x937[____i15];
    var __x938 = has(____id141, 0);
    var __body75 = cut(____id141, 1);
    if (__x938 === "finally") {
    } else {
      if (__x938 === "except" && has(__body75, 1) === "as") {
        var ____id142 = __body75;
        var __kind2 = has(____id142, 0);
        var ___1 = has(____id142, 1);
        var __name21 = has(____id142, 2);
        var __body76 = cut(____id142, 3);
        add(__forms7, join([[__x938, ["%as", __kind2, __name21]]], __body76));
      } else {
        if (__x938 === "except") {
          var ____id143 = __body75;
          var __kind3 = has(____id143, 0);
          var __body77 = cut(____id143, 1);
          add(__forms7, join([[__x938, __kind3]], __body77));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i15 = ____i15 + 1;
  }
  return join(["%cases", ["try", __x932]], __forms7, [__fin1]);
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
  var __v14 = unique("v");
  return ["let", [[__ok7, __v14], ["guard", x]], ["if", __ok7, __v14, _else]];
};
setenv("errsafe", {
  _stash: true,
  macro: __errsafe__macro
});
var __dbg__macro = function () {
  var ____x961 = object(["target", ["do"]]);
  ____x961.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x961;
};
setenv("dbg", {
  _stash: true,
  macro: __dbg__macro
});
var __see__macro = function (form) {
  var __form9 = expand(form);
  print(compile(expand(["%set", "lumen-result", __form9])));
  return __form9;
};
setenv("see", {
  _stash: true,
  macro: __see__macro
});
