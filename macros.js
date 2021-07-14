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
var __define_transformer__macro = function (name, args, ..._42args) {
  var ____r46 = unstash([..._42args]);
  var __name5 = destash33(name, ____r46);
  var __args5 = destash33(args, ____r46);
  var ____id46 = ____r46;
  var __body25 = cut(____id46, 0);
  var __id47 = unique(__name5 + "--transformer");
  var ____x193 = object(["setenv", ["quote", __name5]]);
  ____x193.transformer = __id47;
  var __form5 = ["do", join(["define", __id47, __args5], __body25), ____x193];
  return __form5;
};
setenv("define-transformer", {
  _stash: true,
  macro: __define_transformer__macro
});
var __define_special__macro = function (name, args, ..._42args) {
  var ____r48 = unstash([..._42args]);
  var __name7 = destash33(name, ____r48);
  var __args7 = destash33(args, ____r48);
  var ____id50 = ____r48;
  var __body27 = cut(____id50, 0);
  var __id51 = unique(__name7 + "--special");
  var ____x203 = object(["setenv", ["quote", __name7]]);
  ____x203.special = __id51;
  var __form7 = ["do", join(["define", __id51, __args7], __body27), join(____x203, props(__body27))];
  _eval(__form7);
  return __form7;
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
  var ____x208 = object(["setenv", ["quote", name]]);
  ____x208.symbol = ["quote", expansion];
  return ____x208;
};
setenv("define-symbol", {
  _stash: true,
  macro: __define_symbol__macro
});
var __define_reader__macro = function (__x217, ..._42args) {
  var ____r52 = unstash([..._42args]);
  var ____x217 = destash33(__x217, ____r52);
  var ____id54 = ____x217;
  var __char1 = has(____id54, 0);
  var __s1 = has(____id54, 1);
  var ____id55 = ____r52;
  var __body29 = cut(____id55, 0);
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s1]], __body29)];
};
setenv("define-reader", {
  _stash: true,
  macro: __define_reader__macro
});
var __define__macro = function (name, x, ..._42args) {
  var ____r54 = unstash([..._42args]);
  var __name9 = destash33(name, ____r54);
  var __x228 = destash33(x, ____r54);
  var ____id57 = ____r54;
  var __body31 = cut(____id57, 0);
  setenv(__name9, {
    _stash: true,
    variable: true
  });
  if (some63(__body31)) {
    return join(["%local-function", __name9], bind42(__x228, __body31), props(__body31));
  } else {
    return join(["%local", __name9, __x228], props(__body31));
  }
};
setenv("define", {
  _stash: true,
  macro: __define__macro
});
var __define_global__macro = function (name, x, ..._42args) {
  var ____r56 = unstash([..._42args]);
  var __name11 = destash33(name, ____r56);
  var __x236 = destash33(x, ____r56);
  var ____id59 = ____r56;
  var __body33 = cut(____id59, 0);
  setenv(__name11, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body33)) {
    return join(["%global-function", __name11], bind42(__x236, __body33), props(__body33));
  } else {
    return join(["set", __name11, __x236], props(__body33));
  }
};
setenv("define-global", {
  _stash: true,
  macro: __define_global__macro
});
var __get_value__macro = function (x) {
  var ____x243 = object(["setenv", x]);
  ____x243.toplevel = true;
  return ["has", ____x243, ["quote", "value"]];
};
setenv("get-value", {
  _stash: true,
  macro: __get_value__macro
});
var __define_constant__macro = function (name, x) {
  var ____x254 = object(["setenv", ["quote", name]]);
  ____x254.toplevel = true;
  ____x254.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x254, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
  var ____r65 = unstash([..._42args]);
  var __x284 = destash33(x, ____r65);
  var ____id61 = ____r65;
  var __body35 = cut(____id61, 0);
  var __ok1 = unique("ok");
  var __r66 = unique("r");
  var ____x285 = object(["target", ["try", __x284, join(["finally"], __body35)]]);
  ____x285.lua = join(["let", [[__ok1, __r66], ["guard", __x284]]], __body35, [["if", __ok1, __r66, ["throw", __r66]]]);
  return ____x285;
};
setenv("after", {
  _stash: true,
  macro: __after__macro
});
var __with_frame__macro = function (..._42args) {
  var __body37 = unstash([..._42args]);
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body37), ["drop", "environment"]]];
};
setenv("with-frame", {
  _stash: true,
  macro: __with_frame__macro
});
var __with_values__macro = function (..._42args) {
  var __body39 = unstash([..._42args]);
  var __forms3 = [];
  var ____o3 = __body39;
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
      var ____x315 = object(["setenv", ["quote", __k7]]);
      ____x315.value = __v8;
      add(__forms3, ____x315);
    }
  }
  return join(["with-frame"], __forms3);
};
setenv("with-values", {
  _stash: true,
  macro: __with_values__macro
});
var __with_bindings__macro = function (__x323, ..._42args) {
  var ____r68 = unstash([..._42args]);
  var ____x323 = destash33(__x323, ____r68);
  var ____id64 = ____x323;
  var __names5 = has(____id64, 0);
  var ____id65 = ____r68;
  var __body41 = cut(____id65, 0);
  var __x325 = unique("x");
  var ____x328 = object(["setenv", __x325]);
  ____x328.variable = true;
  return join(["with-frame", ["each", __x325, __names5, ____x328]], __body41);
};
setenv("with-bindings", {
  _stash: true,
  macro: __with_bindings__macro
});
var __let_macro__macro = function (definitions, ..._42args) {
  var ____r73 = unstash([..._42args]);
  var __definitions1 = destash33(definitions, ____r73);
  var ____id67 = ____r73;
  var __body43 = cut(____id67, 0);
  add(environment, {});
  var ____r75 = undefined;
  try{
    map(function (m) {
      return macroexpand(join(["define-macro"], m));
    }, __definitions1);
    ____r75 = join(["%do"], macroexpand(__body43));
  }
  finally{
    drop(environment);
  }
  return ____r75;
};
setenv("let-macro", {
  _stash: true,
  macro: __let_macro__macro
});
var __let_symbol__macro = function (expansions, ..._42args) {
  var ____r81 = unstash([..._42args]);
  var __expansions1 = destash33(expansions, ____r81);
  var ____id70 = ____r81;
  var __body45 = cut(____id70, 0);
  add(environment, {});
  var ____r83 = undefined;
  try{
    map(function (__x340) {
      var ____id71 = __x340;
      var __name13 = has(____id71, 0);
      var __exp1 = has(____id71, 1);
      return macroexpand(["define-symbol", __name13, __exp1]);
    }, pair(__expansions1));
    ____r83 = join(["%do"], macroexpand(__body45));
  }
  finally{
    drop(environment);
  }
  return ____r83;
};
setenv("let-symbol", {
  _stash: true,
  macro: __let_symbol__macro
});
var __let_unique__macro = function (names, ..._42args) {
  var ____r87 = unstash([..._42args]);
  var __names7 = destash33(names, ____r87);
  var ____id73 = ____r87;
  var __body47 = cut(____id73, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names7);
  return join(["let", apply(join, __bs3)], __body47);
};
setenv("let-unique", {
  _stash: true,
  macro: __let_unique__macro
});
var __fn__macro = function (args, ..._42args) {
  var ____r90 = unstash([..._42args]);
  var __args9 = destash33(args, ____r90);
  var ____id75 = ____r90;
  var __body49 = cut(____id75, 0);
  return join(["%function"], bind42(__args9, __body49), props(__body49));
};
setenv("fn", {
  _stash: true,
  macro: __fn__macro
});
var __apply__macro = function (f, ..._42args) {
  var ____r92 = unstash([..._42args]);
  var __f1 = destash33(f, ____r92);
  var ____id77 = ____r92;
  var __args11 = cut(____id77, 0);
  if (_35(__args11) > 1) {
    return ["%call", "apply", __f1, ["join", join(["list"], almost(__args11)), last(__args11), join(["list"], props(__args11))]];
  } else {
    if (props63(__args11)) {
      return ["%call", "apply", __f1, join(["join"], __args11, [join(["list"], props(__args11))])];
    } else {
      return join(["%call", "apply", __f1], __args11);
    }
  }
};
setenv("apply", {
  _stash: true,
  macro: __apply__macro
});
var __guard__macro = function (expr) {
  var ____x407 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x419 = object(["obj"]);
  ____x419.stack = [["idx", "debug", "traceback"]];
  ____x419.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x407.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x419]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x407];
};
setenv("guard", {
  _stash: true,
  macro: __guard__macro
});
var __each__macro = function (x, t, ..._42args) {
  var ____r96 = unstash([..._42args]);
  var __x448 = destash33(x, ____r96);
  var __t1 = destash33(t, ____r96);
  var ____id80 = ____r96;
  var __body51 = cut(____id80, 0);
  var __o5 = unique("o");
  var __n5 = unique("n");
  var __i5 = unique("i");
  var __e15 = undefined;
  if (atom63(__x448)) {
    __e15 = [__i5, __x448];
  } else {
    var __e16 = undefined;
    if (_35(__x448) > 1) {
      __e16 = __x448;
    } else {
      __e16 = [__i5, hd(__x448)];
    }
    __e15 = __e16;
  }
  var ____id81 = __e15;
  var __k9 = has(____id81, 0);
  var __v10 = has(____id81, 1);
  var ____x454 = object(["target", __o5]);
  ____x454.py = ["indices", __o5];
  var __e17 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e17 = __body51;
  } else {
    __e17 = [join(["let", __k9, ["if", ["numeric?", __k9], ["parseInt", __k9], __k9]], __body51)];
  }
  return ["let", [__o5, __t1, __k9, "nil"], join(["%for", ____x454, __k9], props(__body51), [join(["let", [__v10, ["%get", __o5, __k9]]], __e17)])];
};
setenv("each", {
  _stash: true,
  macro: __each__macro
});
var __for__macro = function (i, to, ..._42args) {
  var ____r98 = unstash([..._42args]);
  var __i7 = destash33(i, ____r98);
  var __to1 = destash33(to, ____r98);
  var ____id83 = ____r98;
  var __body53 = cut(____id83, 0);
  if (__to1 === "in") {
    return join(["%for", hd(__body53), __i7, join(["%do"], tl(__body53))], props(__body53));
  } else {
    return ["let", __i7, 0, join(["while", ["<", __i7, __to1]], __body53, [["inc", __i7]])];
  }
};
setenv("for", {
  _stash: true,
  macro: __for__macro
});
var __step__macro = function (v, t, ..._42args) {
  var ____r100 = unstash([..._42args]);
  var __v12 = destash33(v, ____r100);
  var __t3 = destash33(t, ____r100);
  var ____id85 = ____r100;
  var __body55 = cut(____id85, 0);
  var __x491 = unique("x");
  var __i9 = unique("i");
  return ["let", [__x491, __t3], ["for", __i9, ["#", __x491], join(["let", [__v12, ["at", __x491, __i9]]], __body55)]];
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
    var __x503 = ____o7[____i11];
    var __e18 = undefined;
    if (numeric63(____i11)) {
      __e18 = parseInt(____i11);
    } else {
      __e18 = ____i11;
    }
    var ____i111 = __e18;
    __l7[__x503] = true;
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
  var ____r106 = unstash([..._42args]);
  var __a3 = destash33(a, ____r106);
  var ____id87 = ____r106;
  var __bs5 = cut(____id87, 0);
  return ["set", __a3, join(["join", __a3], __bs5)];
};
setenv("join!", {
  _stash: true,
  macro: __join33__macro
});
var __cat33__macro = function (a, ..._42args) {
  var ____r108 = unstash([..._42args]);
  var __a5 = destash33(a, ____r108);
  var ____id89 = ____r108;
  var __bs7 = cut(____id89, 0);
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
  var __x536 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x536, form, ["dec", "indent-level"]]];
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
  var __body57 = unstash([..._42args]);
  return _eval(join(["%do"], __body57));
};
setenv("when-compiling", {
  _stash: true,
  macro: __when_compiling__macro
});
var __during_compilation__macro = function (..._42args) {
  var __body59 = unstash([..._42args]);
  var __form9 = join(["%do"], __body59);
  _eval(__form9);
  return __form9;
};
setenv("during-compilation", {
  _stash: true,
  macro: __during_compilation__macro
});
setenv("has", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r119 = unstash([..._42args]);
    var __setfn1 = destash33(setfn, ____r119);
    var ____id91 = ____r119;
    var __args13 = cut(____id91, 0);
    return define_setter("has", function (v, l, k) {
      return ["%set", ["%get", l, k], v];
    }, __setfn1, __args13);
  }
});
setenv("char", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r123 = unstash([..._42args]);
    var __setfn3 = destash33(setfn, ____r123);
    var ____id93 = ____r123;
    var __args15 = cut(____id93, 0);
    return define_setter("char", function (c, str, pos) {
      return ["set", str, ["cat", ["clip", str, 0, pos], c, ["clip", str, ["+", pos, 1]]]];
    }, __setfn3, __args15);
  }
});
setenv("clip", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r127 = unstash([..._42args]);
    var __setfn5 = destash33(setfn, ____r127);
    var ____id95 = ____r127;
    var __args17 = cut(____id95, 0);
    return define_setter("clip", function (c, str, from, upto) {
      return ["set", str, ["cat", ["clip", str, 0, from], c, ["clip", str, upto]]];
    }, __setfn5, __args17);
  }
});
setenv("inner", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r131 = unstash([..._42args]);
    var __setfn7 = destash33(setfn, ____r131);
    var ____id97 = ____r131;
    var __args19 = cut(____id97, 0);
    return define_setter("inner", function (c, str) {
      return ["set", str, ["cat", ["char", str, 0], c, ["char", str, ["edge", str]]]];
    }, __setfn7, __args19);
  }
});
setenv("cut", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r135 = unstash([..._42args]);
    var __setfn9 = destash33(setfn, ____r135);
    var ____id99 = ____r135;
    var __args21 = cut(____id99, 0);
    return define_setter("cut", function (v, l, from, upto) {
      return ["set", l, ["join", ["cut", l, 0, from], v, ["cut", l, either(upto, ["#", l])], ["keys", v]]];
    }, __setfn9, __args21);
  }
});
setenv("tl", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r139 = unstash([..._42args]);
    var __setfn11 = destash33(setfn, ____r139);
    var ____id101 = ____r139;
    var __args23 = cut(____id101, 0);
    return define_setter("tl", function (v, l, from) {
      return ["set", ["cut", l, either(from, 1)], v];
    }, __setfn11, __args23);
  }
});
setenv("hd", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r143 = unstash([..._42args]);
    var __setfn13 = destash33(setfn, ____r143);
    var ____id103 = ____r143;
    var __args25 = cut(____id103, 0);
    return define_setter("hd", function (v, l, n) {
      return ["set", ["at", l, either(n, 0)], v];
    }, __setfn13, __args25);
  }
});
setenv("last", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r147 = unstash([..._42args]);
    var __setfn15 = destash33(setfn, ____r147);
    var ____id105 = ____r147;
    var __args27 = cut(____id105, 0);
    return define_setter("last", function (v, l) {
      return ["set", ["at", l, ["edge", l]], v];
    }, __setfn15, __args27);
  }
});
var __def__macro = function (name, ..._42args) {
  var ____r150 = unstash([..._42args]);
  var __name15 = destash33(name, ____r150);
  var ____id107 = ____r150;
  var __body61 = cut(____id107, 0);
  return join(["define-global", __name15], __body61);
};
setenv("def", {
  _stash: true,
  macro: __def__macro
});
var __mac__macro = function (name, ..._42args) {
  var ____r152 = unstash([..._42args]);
  var __name17 = destash33(name, ____r152);
  var ____id109 = ____r152;
  var __body63 = cut(____id109, 0);
  return join(["define-macro", __name17], __body63);
};
setenv("mac", {
  _stash: true,
  macro: __mac__macro
});
var __defconst__macro = function (name, ..._42args) {
  var ____r154 = unstash([..._42args]);
  var __name19 = destash33(name, ____r154);
  var ____id1111 = ____r154;
  var __value1 = cut(____id1111, 0);
  return join(["def", __name19], __value1);
};
setenv("defconst", {
  _stash: true,
  macro: __defconst__macro
});
var __undefined63__macro = function (name) {
  var ____x674 = object(["target"]);
  ____x674.js = ["=", ["typeof", name], "\"undefined\""];
  ____x674.lua = ["=", ["idx", "_G", name], "nil"];
  ____x674.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x674;
};
setenv("undefined?", {
  _stash: true,
  macro: __undefined63__macro
});
var __defvar__macro = function (name, ..._42args) {
  var ____r158 = unstash([..._42args]);
  var __name21 = destash33(name, ____r158);
  var ____id113 = ____r158;
  var __value3 = cut(____id113, 0);
  var ____x692 = object(["target"]);
  ____x692.py = ["global", __name21];
  return ["when", ["undefined?", __name21], ____x692, join(["defconst", __name21], __value3)];
};
setenv("defvar", {
  _stash: true,
  macro: __defvar__macro
});
var __async__macro = function (keyword, ..._42args) {
  var ____r160 = unstash([..._42args]);
  var __keyword1 = destash33(keyword, ____r160);
  var ____id115 = ____r160;
  var __body65 = cut(____id115, 0);
  var ____x698 = object([__keyword1]);
  ____x698.async = true;
  return join(____x698, __body65);
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
  var ____r166 = unstash([..._42args]);
  var __a7 = destash33(a, ____r166);
  var ____id117 = ____r166;
  var __bs9 = cut(____id117, 0);
  if (nil63(__a7)) {
    return "";
  } else {
    if (none63(__bs9)) {
      return __a7;
    } else {
      if (one63(__bs9)) {
        var ____x724 = object(["target", join(["%cat", __a7], __bs9)]);
        ____x724.py = join(["%call", "cat", __a7], __bs9);
        return ____x724;
      } else {
        var ____x727 = object(["target", ["%cat", __a7, join(["cat"], __bs9)]]);
        ____x727.py = join(["%call", "cat", __a7], __bs9);
        return ____x727;
      }
    }
  }
};
setenv("cat", {
  _stash: true,
  macro: __cat__macro
});
var ___43__macro = function (..._42args) {
  var __args29 = unstash([..._42args]);
  if (none63(__args29)) {
    return 0;
  } else {
    if (one63(__args29)) {
      return hd(__args29);
    } else {
      return join(["%add"], __args29);
    }
  }
};
setenv("+", {
  _stash: true,
  macro: ___43__macro
});
var _____macro = function (..._42args) {
  var __args31 = unstash([..._42args]);
  if (none63(__args31)) {
    return 0;
  } else {
    if (one63(__args31)) {
      return ["%unm", hd(__args31)];
    } else {
      return join(["%sub"], __args31);
    }
  }
};
setenv("-", {
  _stash: true,
  macro: _____macro
});
var ___42__macro = function (..._42args) {
  var __args33 = unstash([..._42args]);
  if (none63(__args33)) {
    return 1;
  } else {
    if (one63(__args33)) {
      return hd(__args33);
    } else {
      return join(["%mul"], __args33);
    }
  }
};
setenv("*", {
  _stash: true,
  macro: ___42__macro
});
var ___47__macro = function (..._42args) {
  var __args35 = unstash([..._42args]);
  if (none63(__args35)) {
    return 1;
  } else {
    if (one63(__args35)) {
      return hd(__args35);
    } else {
      return join(["%div"], __args35);
    }
  }
};
setenv("/", {
  _stash: true,
  macro: ___47__macro
});
var ___4747__macro = function (..._42args) {
  var __args37 = unstash([..._42args]);
  if (none63(__args37)) {
    return 1;
  } else {
    if (one63(__args37)) {
      return hd(__args37);
    } else {
      return join(["%idiv"], __args37);
    }
  }
};
setenv("//", {
  _stash: true,
  macro: ___4747__macro
});
var ___37__macro = function (..._42args) {
  var __args39 = unstash([..._42args]);
  if (none63(__args39)) {
    return 0;
  } else {
    if (one63(__args39)) {
      return hd(__args39);
    } else {
      return join(["%mod"], __args39);
    }
  }
};
setenv("%", {
  _stash: true,
  macro: ___37__macro
});
var ___60__macro = function (a, ..._42args) {
  var ____r168 = unstash([..._42args]);
  var __a9 = destash33(a, ____r168);
  var ____id119 = ____r168;
  var __bs111 = cut(____id119, 0);
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
  var ____r170 = unstash([..._42args]);
  var __a11 = destash33(a, ____r170);
  var ____id1211 = ____r170;
  var __bs13 = cut(____id1211, 0);
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
  var ____r172 = unstash([..._42args]);
  var __a13 = destash33(a, ____r172);
  var ____id123 = ____r172;
  var __bs15 = cut(____id123, 0);
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
  var ____r174 = unstash([..._42args]);
  var __a15 = destash33(a, ____r174);
  var ____id125 = ____r174;
  var __bs17 = cut(____id125, 0);
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
  var ____r176 = unstash([..._42args]);
  var __a17 = destash33(a, ____r176);
  var ____id127 = ____r176;
  var __bs19 = cut(____id127, 0);
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
  var __args41 = unstash([..._42args]);
  if (none63(__args41)) {
    return false;
  } else {
    if (one63(__args41)) {
      return join(["%not"], __args41);
    } else {
      return ["%and", ["%not", hd(__args41)], join(["not"], tl(__args41))];
    }
  }
};
setenv("not", {
  _stash: true,
  macro: __not__macro
});
var __and__macro = function (a, ..._42args) {
  var ____r178 = unstash([..._42args]);
  var __a19 = destash33(a, ____r178);
  var ____id129 = ____r178;
  var __bs211 = cut(____id129, 0);
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
  var ____r180 = unstash([..._42args]);
  var __a21 = destash33(a, ____r180);
  var ____id131 = ____r180;
  var __bs23 = cut(____id131, 0);
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
  var __args43 = unstash([..._42args]);
  return join(["%break"], __args43);
};
setenv("break", {
  _stash: true,
  macro: __break__macro
});
var __return__macro = function (..._42args) {
  var __args45 = unstash([..._42args]);
  return join(["%return"], __args45);
};
setenv("return", {
  _stash: true,
  macro: __return__macro
});
var __while__macro = function (c, ..._42args) {
  var ____r182 = unstash([..._42args]);
  var __c1 = destash33(c, ____r182);
  var ____id133 = ____r182;
  var __body67 = cut(____id133, 0);
  return join(["%while", __c1], __body67);
};
setenv("while", {
  _stash: true,
  macro: __while__macro
});
var __do__macro = function (..._42args) {
  var __body69 = unstash([..._42args]);
  return join(["%do"], __body69);
};
setenv("do", {
  _stash: true,
  macro: __do__macro
});
var __get__macro = function (..._42args) {
  var __args47 = unstash([..._42args]);
  return join(["%get"], __args47);
};
setenv("get", {
  _stash: true,
  macro: __get__macro
});
var __idx__macro = function (..._42args) {
  var __args49 = unstash([..._42args]);
  return join(["%idx"], __args49);
};
setenv("idx", {
  _stash: true,
  macro: __idx__macro
});
var __new__macro = function (..._42args) {
  var __args51 = unstash([..._42args]);
  return join(["%new"], __args51);
};
setenv("new", {
  _stash: true,
  macro: __new__macro
});
var __typeof__macro = function (..._42args) {
  var __args53 = unstash([..._42args]);
  return join(["%typeof"], __args53);
};
setenv("typeof", {
  _stash: true,
  macro: __typeof__macro
});
var __error__macro = function (..._42args) {
  var __args55 = unstash([..._42args]);
  return join(["%error"], __args55);
};
setenv("error", {
  _stash: true,
  macro: __error__macro
});
var __throw__macro = function (..._42args) {
  var __args57 = unstash([..._42args]);
  return join(["%throw"], __args57);
};
setenv("throw", {
  _stash: true,
  macro: __throw__macro
});
var __raise__macro = function (..._42args) {
  var __args59 = unstash([..._42args]);
  return join(["%throw"], __args59);
};
setenv("raise", {
  _stash: true,
  macro: __raise__macro
});
var __is__macro = function (..._42args) {
  var __args61 = unstash([..._42args]);
  var ____x882 = object(["target", join(["="], __args61)]);
  ____x882.py = join(["%is"], __args61);
  return ____x882;
};
setenv("is", {
  _stash: true,
  macro: __is__macro
});
var __in__macro = function (..._42args) {
  var __args63 = unstash([..._42args]);
  return join(["%in"], __args63);
};
setenv("in", {
  _stash: true,
  macro: __in__macro
});
var __as__macro = function (..._42args) {
  var __args65 = unstash([..._42args]);
  return join(["%as"], __args65);
};
setenv("as", {
  _stash: true,
  macro: __as__macro
});
var ___37expand_case__macro = function (x, ..._42args) {
  var ____r184 = unstash([..._42args]);
  var __x900 = destash33(x, ____r184);
  var ____id136 = ____r184;
  var __body71 = cut(____id136, 0);
  var __e21 = undefined;
  if (atom63(__x900)) {
    __e21 = [__x900];
  } else {
    __e21 = __x900;
  }
  var ____id137 = __e21;
  var __a23 = has(____id137, 0);
  var __bs25 = cut(____id137, 1);
  var __e22 = undefined;
  if (none63(__bs25)) {
    __e22 = [["%literal"]];
  } else {
    __e22 = __bs25;
  }
  return join(["%block", __a23], __e22, __body71);
};
setenv("%expand-case", {
  _stash: true,
  macro: ___37expand_case__macro
});
var ___37cases__macro = function (..._42args) {
  var __args67 = unstash([..._42args]);
  if (none63(__args67)) {
    return ["do"];
  } else {
    if (one63(__args67)) {
      return join(["%expand-case"], hd(__args67));
    } else {
      var __r187 = unique("r");
      return join(["with", __r187, "nil"], map(function (__x920) {
        var ____id139 = __x920;
        var __x921 = has(____id139, 0);
        var __body73 = cut(____id139, 1);
        return ["%expand-case", __x921, ["%set", __r187, join(["%do"], __body73)]];
      }, almost(__args67)), [join(["%expand-case"], last(__args67))]);
    }
  }
};
setenv("%cases", {
  _stash: true,
  macro: ___37cases__macro
});
var __try__macro = function (x, ..._42args) {
  var ____r190 = unstash([..._42args]);
  var __x942 = destash33(x, ____r190);
  var ____id144 = ____r190;
  var __cases1 = cut(____id144, 0);
  var __fin1 = ["finally"];
  var ____o9 = __cases1;
  var ____i14 = undefined;
  for (____i14 in ____o9) {
    var __x944 = ____o9[____i14];
    var __e23 = undefined;
    if (numeric63(____i14)) {
      __e23 = parseInt(____i14);
    } else {
      __e23 = ____i14;
    }
    var ____i141 = __e23;
    if (hd63(__x944, "finally")) {
      __fin1 = __x944;
    }
  }
  var __forms7 = [];
  var ____x947 = __cases1;
  var ____i15 = 0;
  while (____i15 < _35(____x947)) {
    var ____id145 = ____x947[____i15];
    var __x948 = has(____id145, 0);
    var __body77 = cut(____id145, 1);
    if (__x948 === "finally") {
    } else {
      if (__x948 === "except" && has(__body77, 1) === "as") {
        var ____id146 = __body77;
        var __kind2 = has(____id146, 0);
        var ___1 = has(____id146, 1);
        var __name23 = has(____id146, 2);
        var __body78 = cut(____id146, 3);
        add(__forms7, join([[__x948, ["%as", __kind2, __name23]]], __body78));
      } else {
        if (__x948 === "except") {
          var ____id147 = __body77;
          var __kind3 = has(____id147, 0);
          var __body79 = cut(____id147, 1);
          add(__forms7, join([[__x948, __kind3]], __body79));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i15 = ____i15 + 1;
  }
  return join(["%cases", ["try", __x942]], __forms7, [__fin1]);
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
  var ____x971 = object(["target", ["do"]]);
  ____x971.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x971;
};
setenv("dbg", {
  _stash: true,
  macro: __dbg__macro
});
var __see__macro = function (form) {
  var __form11 = expand(form);
  print(compile(expand(["%set", "lumen-result", __form11])));
  return __form11;
};
setenv("see", {
  _stash: true,
  macro: __see__macro
});
var __class__macro = function (name, ..._42args) {
  var ____r198 = unstash([..._42args]);
  var __name25 = destash33(name, ____r198);
  var ____id149 = ____r198;
  var __body81 = cut(____id149, 0);
  return join(["%block", "class", __name25], __body81);
};
setenv("class", {
  _stash: true,
  macro: __class__macro
});
var __expansion__transformer = function (__x983, form) {
  var ____id150 = __x983;
  var __expansion = has(____id150, 0);
  return form;
};
setenv("expansion", {
  _stash: true,
  transformer: __expansion__transformer
});
var __compose__transformer = function (__x984, ..._42args) {
  var ____r200 = unstash([..._42args]);
  var ____x984 = destash33(__x984, ____r200);
  var ____id151 = ____x984;
  var __compose = has(____id151, 0);
  var __fns = cut(____id151, 1);
  var ____id152 = ____r200;
  var __body82 = cut(____id152, 0);
  var __e24 = undefined;
  if (none63(__fns)) {
    __e24 = unquote_splicing(__body82);
  } else {
    var __e25 = undefined;
    if (one63(__fns)) {
      __e25 = join(__fns, __body82);
    } else {
      __e25 = [join([__compose], almost(__fns)), join([last(__fns)], __body82)];
    }
    __e24 = __e25;
  }
  return macroexpand(__e24);
};
setenv("compose", {
  _stash: true,
  transformer: __compose__transformer
});
var __complement__transformer = function (__x989, ..._42args) {
  var ____r201 = unstash([..._42args]);
  var ____x989 = destash33(__x989, ____r201);
  var ____id153 = ____x989;
  var __complement = has(____id153, 0);
  var __form12 = has(____id153, 1);
  var ____id154 = ____r201;
  var __body83 = cut(____id154, 0);
  var __e26 = undefined;
  if (hd63(__form12, "complement")) {
    __e26 = join([__form12[1]], __body83);
  } else {
    __e26 = ["no", join([__form12], __body83)];
  }
  return macroexpand(__e26);
};
setenv("complement", {
  _stash: true,
  transformer: __complement__transformer
});
var ___37brackets__transformer = function (__x994, ..._42args) {
  var ____r202 = unstash([..._42args]);
  var ____x994 = destash33(__x994, ____r202);
  var ____id155 = ____x994;
  var ___37brackets = has(____id155, 0);
  var ____id156 = ____r202;
  var __body84 = cut(____id156, 0);
  return macroexpand(["%function", ["%1", "%2"], ["let-symbol", ["_", "%1"], __body84]]);
};
setenv("%brackets", {
  _stash: true,
  transformer: ___37brackets__transformer
});
var ___37braces__transformer = function (__x1000, ..._42args) {
  var ____r203 = unstash([..._42args]);
  var ____x1000 = destash33(__x1000, ____r203);
  var ____id157 = ____x1000;
  var ___37braces = has(____id157, 0);
  var ____id158 = ____r203;
  var __body85 = cut(____id158, 0);
  return macroexpand(join(["%object"], __body85));
};
setenv("%braces", {
  _stash: true,
  transformer: ___37braces__transformer
});
