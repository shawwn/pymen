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
  if (atom63(__place) || (hd(__place) === "get" && nil63(getenv("get", "place-expander")) || accessor_literal63(hd(tl(__place))))) {
    return setfn(__place, function (v) {
      return ["%set", __place, v];
    });
  } else {
    var __head = hd(__place);
    var __gf = getenv(__head, "place-expander");
    if (__gf) {
      return apply(__gf, join([setfn], tl(__place), []));
    } else {
      throw new Error(str(__place) + " is not a valid place expression");
    }
  }
};
var __let_place__macro = function (vars, place, ..._42args) {
  var ____r7 = unstash([..._42args]);
  var __vars1 = destash33(vars, ____r7);
  var __place2 = destash33(place, ____r7);
  var ____id1 = ____r7;
  var __body1 = cut(____id1, 0);
  return ["get-place", __place2, join(["fn", __vars1], __body1)];
};
setenv("let-place", {
  _stash: true,
  macro: __let_place__macro
});
var __define_expander__macro = function (name, handler) {
  var ____x11 = object(["setenv", ["quote", name]]);
  ____x11["place-expander"] = handler;
  var __form1 = ____x11;
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
  var ____r13 = unstash([..._42args]);
  var __name1 = destash33(name, ____r13);
  var __arglist1 = destash33(arglist, ____r13);
  var ____id3 = ____r13;
  var __body3 = cut(____id3, 0);
  var ____x27 = object(["setfn"]);
  ____x27.rest = "args";
  return ["define-expander", __name1, ["fn", ____x27, ["%call", "define-setter", ["quote", __name1], join(["fn", __arglist1], __body3), "setfn", "args"]]];
};
setenv("define-setter", {
  _stash: true,
  macro: __define_setter__macro
});
var __set33__macro = function (..._42args) {
  var __args1 = unstash([..._42args]);
  return join(["%do"], map(function (__x36) {
    var ____id5 = __x36;
    var __lh1 = has(____id5, 0);
    var __rh1 = has(____id5, 1);
    return get_place(__lh1, function (getter, setter) {
      return setter(__rh1);
    });
  }, pair(__args1)));
};
setenv("set!", {
  _stash: true,
  macro: __set33__macro
});
setenv("char", {
  _stash: true,
  ["place-expander"]: function (setfn, ..._42args) {
    var ____r20 = unstash([..._42args]);
    var __setfn1 = destash33(setfn, ____r20);
    var ____id7 = ____r20;
    var __args3 = cut(____id7, 0);
    return define_setter("char", function (c, str, pos) {
      return ["set!", str, ["cat", ["clip", str, 0, pos], c, ["clip", str, ["+", pos, 1]]]];
    }, __setfn1, __args3);
  }
});
var __set__macro = function (..._42args) {
  var __args5 = unstash([..._42args]);
  return join(["%do"], map(function (__x57) {
    var ____id9 = __x57;
    var __lh3 = has(____id9, 0);
    var __rh3 = has(____id9, 1);
    __lh3 = macroexpand(__lh3);
    if (! atom63(__lh3) && hd(__lh3) === "has") {
      return ["%set", join(["%get"], tl(__lh3)), __rh3];
    } else {
      return ["%set", __lh3, __rh3];
    }
  }, pair(__args5)));
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
      var ____id13 = __body6;
      var __expr2 = has(____id13, 0);
      var __body7 = cut(____id13, 1);
      var __comps1 = [];
      var __cond1 = undefined;
      while (_35(__body7) > 2 && (__body7[0] === "for" && __body7[2] === "in")) {
        var ____id14 = __body7;
        var ___for1 = has(____id14, 0);
        var __names1 = has(____id14, 1);
        var ___in1 = has(____id14, 2);
        var __l2 = has(____id14, 3);
        var __body12 = cut(____id14, 4);
        add(__comps1, [__names1, __l2]);
        __body7 = __body12;
      }
      if (hd(__body7) === "if") {
        var ____id15 = __body7;
        var ___if1 = has(____id15, 0);
        var __expr3 = has(____id15, 1);
        __cond1 = __expr3;
      }
      return ["%list", __expr2, __comps1, __cond1];
    } else {
      var __x84 = unique("x");
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
          add(__forms1, ["%set", ["%get", __x84, ["quote", __k3]], __v2]);
        }
      }
      if (some63(__forms1)) {
        return join(["let", __x84, ["object", join(["%array"], __l3)]], __forms1, [__x84]);
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
  var ____r31 = unstash([..._42args]);
  var __expr5 = destash33(expr, ____r31);
  var ____id18 = ____r31;
  var __e13 = undefined;
  if (nil63(has(____id18, "cmp"))) {
    __e13 = "=";
  } else {
    __e13 = has(____id18, "cmp");
  }
  var __cmp1 = __e13;
  var __clauses1 = cut(____id18, 0);
  var __x108 = unique("x");
  var __eq1 = function (_) {
    return [__cmp1, _, __x108];
  };
  var __cl1 = function (__x110) {
    var ____id19 = __x110;
    var __a1 = has(____id19, 0);
    var __b1 = has(____id19, 1);
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
  return ["let", __x108, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
};
setenv("case", {
  _stash: true,
  macro: __case__macro
});
var __of__macro = function (x, ..._42args) {
  var ____r35 = unstash([..._42args]);
  var __x123 = destash33(x, ____r35);
  var ____id21 = ____r35;
  var __values1 = cut(____id21, 0);
  return join(["case", __x123, __values1, true, false], props(__values1));
};
setenv("of", {
  _stash: true,
  macro: __of__macro
});
var __when__macro = function (cond, ..._42args) {
  var ____r37 = unstash([..._42args]);
  var __cond3 = destash33(cond, ____r37);
  var ____id23 = ____r37;
  var __body9 = cut(____id23, 0);
  return ["%if", __cond3, join(["%do"], __body9)];
};
setenv("when", {
  _stash: true,
  macro: __when__macro
});
var __unless__macro = function (cond, ..._42args) {
  var ____r39 = unstash([..._42args]);
  var __cond5 = destash33(cond, ____r39);
  var ____id25 = ____r39;
  var __body111 = cut(____id25, 0);
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
      var ____id29 = __body14;
      var __expr8 = has(____id29, 0);
      var __body15 = cut(____id29, 1);
      var __comps3 = [];
      var __cond7 = undefined;
      while (_35(__body15) > 2 && (__body15[0] === "for" && __body15[2] === "in")) {
        var ____id30 = __body15;
        var ___for3 = has(____id30, 0);
        var __names3 = has(____id30, 1);
        var ___in3 = has(____id30, 2);
        var __l5 = has(____id30, 3);
        var __body141 = cut(____id30, 4);
        add(__comps3, [__names3, __l5]);
        __body15 = __body141;
      }
      if (hd(__body15) === "if") {
        var ____id31 = __body15;
        var ___if3 = has(____id31, 0);
        var __expr9 = has(____id31, 1);
        __cond7 = __expr9;
      }
      if (list63(__expr8) && hd63(__expr8, ",")) {
        __expr8 = join([":"], tl(__expr8));
      }
      var ____x147 = object(["%list", __expr8, __comps3, __cond7]);
      ____x147.kind = "object";
      return ____x147;
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
  var ____r43 = unstash([..._42args]);
  var __bs11 = destash33(bs, ____r43);
  var ____id36 = ____r43;
  var __body17 = cut(____id36, 0);
  if (atom63(__bs11) || hd63(__bs11, ",")) {
    return join(["let", [__bs11, hd(__body17)]], tl(__body17));
  } else {
    if (none63(__bs11)) {
      return join(["%do"], __body17);
    } else {
      var ____id37 = __bs11;
      var __lh5 = has(____id37, 0);
      var __rh5 = has(____id37, 1);
      var __bs21 = cut(____id37, 2);
      var ____id38 = bind(__lh5, __rh5);
      var __id39 = has(____id38, 0);
      var __val1 = has(____id38, 1);
      var __bs12 = cut(____id38, 2);
      var __renames1 = [];
      if (! id_literal63(__id39)) {
        var __id121 = unique(__id39);
        __renames1 = [__id39, __id121];
        __id39 = __id121;
      }
      return ["%do", ["%local", __id39, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body17)]];
    }
  }
};
setenv("let", {
  _stash: true,
  macro: __let__macro
});
var __with__macro = function (x, v, ..._42args) {
  var ____r45 = unstash([..._42args]);
  var __x176 = destash33(x, ____r45);
  var __v4 = destash33(v, ____r45);
  var ____id41 = ____r45;
  var __body19 = cut(____id41, 0);
  if (__v4 === "as") {
    return join(["%with", ["%as", __x176, hd(__body19)]], tl(__body19));
  } else {
    if (! atom63(__x176) || has(__body19, "async")) {
      return join(["%with", __x176, __v4], __body19);
    } else {
      return join(["let", [__x176, __v4]], __body19, [__x176]);
    }
  }
};
setenv("with", {
  _stash: true,
  macro: __with__macro
});
var __let_when__macro = function (x, v, ..._42args) {
  var ____r47 = unstash([..._42args]);
  var __x191 = destash33(x, ____r47);
  var __v6 = destash33(v, ____r47);
  var ____id43 = ____r47;
  var __body21 = cut(____id43, 0);
  var __y1 = unique("y");
  return ["let", __y1, __v6, ["when", ["yes", __y1], join(["let", [__x191, __y1]], __body21)]];
};
setenv("let-when", {
  _stash: true,
  macro: __let_when__macro
});
var __define_macro__macro = function (name, args, ..._42args) {
  var ____r49 = unstash([..._42args]);
  var __name3 = destash33(name, ____r49);
  var __args7 = destash33(args, ____r49);
  var ____id46 = ____r49;
  var __body23 = cut(____id46, 0);
  var __id47 = unique(__name3 + "--macro");
  var ____x205 = object(["setenv", ["quote", __name3]]);
  ____x205.macro = __id47;
  var __form3 = ["do", join(["define", __id47, __args7], __body23), ____x205];
  _eval(__form3);
  return __form3;
};
setenv("define-macro", {
  _stash: true,
  macro: __define_macro__macro
});
var __define_special__macro = function (name, args, ..._42args) {
  var ____r51 = unstash([..._42args]);
  var __name5 = destash33(name, ____r51);
  var __args9 = destash33(args, ____r51);
  var ____id50 = ____r51;
  var __body25 = cut(____id50, 0);
  var __id51 = unique(__name5 + "--special");
  var ____x215 = object(["setenv", ["quote", __name5]]);
  ____x215.special = __id51;
  var __form5 = ["do", join(["define", __id51, __args9], __body25), join(____x215, props(__body25))];
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
  var ____x220 = object(["setenv", ["quote", name]]);
  ____x220.symbol = ["quote", expansion];
  return ____x220;
};
setenv("define-symbol", {
  _stash: true,
  macro: __define_symbol__macro
});
var __define_reader__macro = function (__x229, ..._42args) {
  var ____r55 = unstash([..._42args]);
  var ____x229 = destash33(__x229, ____r55);
  var ____id54 = ____x229;
  var __char1 = has(____id54, 0);
  var __s1 = has(____id54, 1);
  var ____id55 = ____r55;
  var __body27 = cut(____id55, 0);
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s1]], __body27)];
};
setenv("define-reader", {
  _stash: true,
  macro: __define_reader__macro
});
var __define__macro = function (name, x, ..._42args) {
  var ____r57 = unstash([..._42args]);
  var __name7 = destash33(name, ____r57);
  var __x240 = destash33(x, ____r57);
  var ____id57 = ____r57;
  var __body29 = cut(____id57, 0);
  setenv(__name7, {
    _stash: true,
    variable: true
  });
  if (some63(__body29)) {
    return join(["%local-function", __name7], bind42(__x240, __body29), props(__body29));
  } else {
    return join(["%local", __name7, __x240], props(__body29));
  }
};
setenv("define", {
  _stash: true,
  macro: __define__macro
});
var __define_global__macro = function (name, x, ..._42args) {
  var ____r59 = unstash([..._42args]);
  var __name9 = destash33(name, ____r59);
  var __x248 = destash33(x, ____r59);
  var ____id59 = ____r59;
  var __body31 = cut(____id59, 0);
  setenv(__name9, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body31)) {
    return join(["%global-function", __name9], bind42(__x248, __body31), props(__body31));
  } else {
    return join(["set", __name9, __x248], props(__body31));
  }
};
setenv("define-global", {
  _stash: true,
  macro: __define_global__macro
});
var __get_value__macro = function (x) {
  var ____x255 = object(["setenv", x]);
  ____x255.toplevel = true;
  return ["has", ____x255, ["quote", "value"]];
};
setenv("get-value", {
  _stash: true,
  macro: __get_value__macro
});
var __define_constant__macro = function (name, x) {
  var ____x266 = object(["setenv", ["quote", name]]);
  ____x266.toplevel = true;
  ____x266.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x266, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
  var ____r68 = unstash([..._42args]);
  var __x296 = destash33(x, ____r68);
  var ____id61 = ____r68;
  var __body33 = cut(____id61, 0);
  var __ok1 = unique("ok");
  var __r69 = unique("r");
  var ____x297 = object(["target", ["try", __x296, join(["finally"], __body33)]]);
  ____x297.lua = join(["let", [[__ok1, __r69], ["guard", __x296]]], __body33, [["if", __ok1, __r69, ["throw", __r69]]]);
  return ____x297;
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
      var ____x327 = object(["setenv", ["quote", __k7]]);
      ____x327.value = __v8;
      add(__forms3, ____x327);
    }
  }
  return join(["with-frame"], __forms3);
};
setenv("with-values", {
  _stash: true,
  macro: __with_values__macro
});
var __with_bindings__macro = function (__x335, ..._42args) {
  var ____r71 = unstash([..._42args]);
  var ____x335 = destash33(__x335, ____r71);
  var ____id64 = ____x335;
  var __names5 = has(____id64, 0);
  var ____id65 = ____r71;
  var __body39 = cut(____id65, 0);
  var __x337 = unique("x");
  var ____x340 = object(["setenv", __x337]);
  ____x340.variable = true;
  return join(["with-frame", ["each", __x337, __names5, ____x340]], __body39);
};
setenv("with-bindings", {
  _stash: true,
  macro: __with_bindings__macro
});
var __let_macro__macro = function (definitions, ..._42args) {
  var ____r76 = unstash([..._42args]);
  var __definitions1 = destash33(definitions, ____r76);
  var ____id67 = ____r76;
  var __body41 = cut(____id67, 0);
  add(environment, {});
  var ____r78 = undefined;
  try{
    map(function (m) {
      return macroexpand(join(["define-macro"], m));
    }, __definitions1);
    ____r78 = join(["%do"], macroexpand(__body41));
  }
  finally{
    drop(environment);
  }
  return ____r78;
};
setenv("let-macro", {
  _stash: true,
  macro: __let_macro__macro
});
var __let_symbol__macro = function (expansions, ..._42args) {
  var ____r84 = unstash([..._42args]);
  var __expansions1 = destash33(expansions, ____r84);
  var ____id70 = ____r84;
  var __body43 = cut(____id70, 0);
  add(environment, {});
  var ____r86 = undefined;
  try{
    map(function (__x352) {
      var ____id71 = __x352;
      var __name11 = has(____id71, 0);
      var __exp1 = has(____id71, 1);
      return macroexpand(["define-symbol", __name11, __exp1]);
    }, pair(__expansions1));
    ____r86 = join(["%do"], macroexpand(__body43));
  }
  finally{
    drop(environment);
  }
  return ____r86;
};
setenv("let-symbol", {
  _stash: true,
  macro: __let_symbol__macro
});
var __let_unique__macro = function (names, ..._42args) {
  var ____r90 = unstash([..._42args]);
  var __names7 = destash33(names, ____r90);
  var ____id73 = ____r90;
  var __body45 = cut(____id73, 0);
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
  var ____r93 = unstash([..._42args]);
  var __args11 = destash33(args, ____r93);
  var ____id75 = ____r93;
  var __body47 = cut(____id75, 0);
  return join(["%function"], bind42(__args11, __body47), props(__body47));
};
setenv("fn", {
  _stash: true,
  macro: __fn__macro
});
var __apply__macro = function (f, ..._42args) {
  var ____r95 = unstash([..._42args]);
  var __f1 = destash33(f, ____r95);
  var ____id77 = ____r95;
  var __args13 = cut(____id77, 0);
  if (_35(__args13) > 1) {
    return ["%call", "apply", __f1, ["join", join(["list"], almost(__args13)), last(__args13), join(["list"], props(__args13))]];
  } else {
    if (props63(__args13)) {
      return ["%call", "apply", __f1, join(["join"], __args13, [join(["list"], props(__args13))])];
    } else {
      return join(["%call", "apply", __f1], __args13);
    }
  }
};
setenv("apply", {
  _stash: true,
  macro: __apply__macro
});
var __guard__macro = function (expr) {
  var ____x419 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x431 = object(["obj"]);
  ____x431.stack = [["idx", "debug", "traceback"]];
  ____x431.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x419.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x431]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x419];
};
setenv("guard", {
  _stash: true,
  macro: __guard__macro
});
var __each__macro = function (x, t, ..._42args) {
  var ____r99 = unstash([..._42args]);
  var __x460 = destash33(x, ____r99);
  var __t1 = destash33(t, ____r99);
  var ____id80 = ____r99;
  var __body49 = cut(____id80, 0);
  var __o5 = unique("o");
  var __n5 = unique("n");
  var __i5 = unique("i");
  var __e15 = undefined;
  if (atom63(__x460)) {
    __e15 = [__i5, __x460];
  } else {
    var __e16 = undefined;
    if (_35(__x460) > 1) {
      __e16 = __x460;
    } else {
      __e16 = [__i5, hd(__x460)];
    }
    __e15 = __e16;
  }
  var ____id81 = __e15;
  var __k9 = has(____id81, 0);
  var __v10 = has(____id81, 1);
  var ____x466 = object(["target", __o5]);
  ____x466.py = ["indices", __o5];
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
  return ["let", [__o5, __t1, __k9, "nil"], join(["%for", ____x466, __k9], props(__body49), [join(["let", [__v10, ["%get", __o5, __k9]]], __e17)])];
};
setenv("each", {
  _stash: true,
  macro: __each__macro
});
var __for__macro = function (i, to, ..._42args) {
  var ____r101 = unstash([..._42args]);
  var __i7 = destash33(i, ____r101);
  var __to1 = destash33(to, ____r101);
  var ____id83 = ____r101;
  var __body51 = cut(____id83, 0);
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
  var ____r103 = unstash([..._42args]);
  var __v12 = destash33(v, ____r103);
  var __t3 = destash33(t, ____r103);
  var ____id85 = ____r103;
  var __body53 = cut(____id85, 0);
  var __x503 = unique("x");
  var __i9 = unique("i");
  return ["let", [__x503, __t3], ["for", __i9, ["#", __x503], join(["let", [__v12, ["at", __x503, __i9]]], __body53)]];
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
    var __x515 = ____o7[____i11];
    var __e18 = undefined;
    if (numeric63(____i11)) {
      __e18 = parseInt(____i11);
    } else {
      __e18 = ____i11;
    }
    var ____i111 = __e18;
    __l7[__x515] = true;
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
  var ____r109 = unstash([..._42args]);
  var __a3 = destash33(a, ____r109);
  var ____id87 = ____r109;
  var __bs5 = cut(____id87, 0);
  return ["set", __a3, join(["join", __a3], __bs5)];
};
setenv("join!", {
  _stash: true,
  macro: __join33__macro
});
var __cat33__macro = function (a, ..._42args) {
  var ____r111 = unstash([..._42args]);
  var __a5 = destash33(a, ____r111);
  var ____id89 = ____r111;
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
  var __x548 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x548, form, ["dec", "indent-level"]]];
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
var __def__macro = function (name, ..._42args) {
  var ____r121 = unstash([..._42args]);
  var __name13 = destash33(name, ____r121);
  var ____id91 = ____r121;
  var __body59 = cut(____id91, 0);
  return join(["define-global", __name13], __body59);
};
setenv("def", {
  _stash: true,
  macro: __def__macro
});
var __mac__macro = function (name, ..._42args) {
  var ____r123 = unstash([..._42args]);
  var __name15 = destash33(name, ____r123);
  var ____id93 = ____r123;
  var __body61 = cut(____id93, 0);
  return join(["define-macro", __name15], __body61);
};
setenv("mac", {
  _stash: true,
  macro: __mac__macro
});
var __defconst__macro = function (name, ..._42args) {
  var ____r125 = unstash([..._42args]);
  var __name17 = destash33(name, ____r125);
  var ____id95 = ____r125;
  var __value1 = cut(____id95, 0);
  return join(["def", __name17], __value1);
};
setenv("defconst", {
  _stash: true,
  macro: __defconst__macro
});
var __undefined63__macro = function (name) {
  var ____x612 = object(["target"]);
  ____x612.js = ["=", ["typeof", name], "\"undefined\""];
  ____x612.lua = ["=", ["idx", "_G", name], "nil"];
  ____x612.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x612;
};
setenv("undefined?", {
  _stash: true,
  macro: __undefined63__macro
});
var __defvar__macro = function (name, ..._42args) {
  var ____r129 = unstash([..._42args]);
  var __name19 = destash33(name, ____r129);
  var ____id97 = ____r129;
  var __value3 = cut(____id97, 0);
  var ____x630 = object(["target"]);
  ____x630.py = ["global", __name19];
  return ["when", ["undefined?", __name19], ____x630, join(["defconst", __name19], __value3)];
};
setenv("defvar", {
  _stash: true,
  macro: __defvar__macro
});
var __async__macro = function (keyword, ..._42args) {
  var ____r131 = unstash([..._42args]);
  var __keyword1 = destash33(keyword, ____r131);
  var ____id99 = ____r131;
  var __body63 = cut(____id99, 0);
  var ____x636 = object([__keyword1]);
  ____x636.async = true;
  return join(____x636, __body63);
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
  var ____r137 = unstash([..._42args]);
  var __a7 = destash33(a, ____r137);
  var ____id101 = ____r137;
  var __bs9 = cut(____id101, 0);
  if (nil63(__a7)) {
    return "";
  } else {
    if (none63(__bs9)) {
      return __a7;
    } else {
      if (one63(__bs9)) {
        var ____x662 = object(["target", join(["%cat", __a7], __bs9)]);
        ____x662.py = join(["%call", "cat", __a7], __bs9);
        return ____x662;
      } else {
        var ____x665 = object(["target", ["%cat", __a7, join(["cat"], __bs9)]]);
        ____x665.py = join(["%call", "cat", __a7], __bs9);
        return ____x665;
      }
    }
  }
};
setenv("cat", {
  _stash: true,
  macro: __cat__macro
});
var ___43__macro = function (..._42args) {
  var __args15 = unstash([..._42args]);
  if (none63(__args15)) {
    return 0;
  } else {
    if (one63(__args15)) {
      return hd(__args15);
    } else {
      return join(["%add"], __args15);
    }
  }
};
setenv("+", {
  _stash: true,
  macro: ___43__macro
});
var _____macro = function (..._42args) {
  var __args17 = unstash([..._42args]);
  if (none63(__args17)) {
    return 0;
  } else {
    if (one63(__args17)) {
      return ["%unm", hd(__args17)];
    } else {
      return join(["%sub"], __args17);
    }
  }
};
setenv("-", {
  _stash: true,
  macro: _____macro
});
var ___42__macro = function (..._42args) {
  var __args19 = unstash([..._42args]);
  if (none63(__args19)) {
    return 1;
  } else {
    if (one63(__args19)) {
      return hd(__args19);
    } else {
      return join(["%mul"], __args19);
    }
  }
};
setenv("*", {
  _stash: true,
  macro: ___42__macro
});
var ___47__macro = function (..._42args) {
  var __args21 = unstash([..._42args]);
  if (none63(__args21)) {
    return 1;
  } else {
    if (one63(__args21)) {
      return hd(__args21);
    } else {
      return join(["%div"], __args21);
    }
  }
};
setenv("/", {
  _stash: true,
  macro: ___47__macro
});
var ___4747__macro = function (..._42args) {
  var __args23 = unstash([..._42args]);
  if (none63(__args23)) {
    return 1;
  } else {
    if (one63(__args23)) {
      return hd(__args23);
    } else {
      return join(["%idiv"], __args23);
    }
  }
};
setenv("//", {
  _stash: true,
  macro: ___4747__macro
});
var ___37__macro = function (..._42args) {
  var __args25 = unstash([..._42args]);
  if (none63(__args25)) {
    return 0;
  } else {
    if (one63(__args25)) {
      return hd(__args25);
    } else {
      return join(["%mod"], __args25);
    }
  }
};
setenv("%", {
  _stash: true,
  macro: ___37__macro
});
var ___60__macro = function (a, ..._42args) {
  var ____r139 = unstash([..._42args]);
  var __a9 = destash33(a, ____r139);
  var ____id103 = ____r139;
  var __bs111 = cut(____id103, 0);
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
  var ____r141 = unstash([..._42args]);
  var __a11 = destash33(a, ____r141);
  var ____id105 = ____r141;
  var __bs13 = cut(____id105, 0);
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
  var ____r143 = unstash([..._42args]);
  var __a13 = destash33(a, ____r143);
  var ____id107 = ____r143;
  var __bs15 = cut(____id107, 0);
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
  var ____r145 = unstash([..._42args]);
  var __a15 = destash33(a, ____r145);
  var ____id109 = ____r145;
  var __bs17 = cut(____id109, 0);
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
  var ____r147 = unstash([..._42args]);
  var __a17 = destash33(a, ____r147);
  var ____id1111 = ____r147;
  var __bs19 = cut(____id1111, 0);
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
  var __args27 = unstash([..._42args]);
  if (none63(__args27)) {
    return false;
  } else {
    if (one63(__args27)) {
      return join(["%not"], __args27);
    } else {
      return ["%and", ["%not", hd(__args27)], join(["not"], tl(__args27))];
    }
  }
};
setenv("not", {
  _stash: true,
  macro: __not__macro
});
var __and__macro = function (a, ..._42args) {
  var ____r149 = unstash([..._42args]);
  var __a19 = destash33(a, ____r149);
  var ____id113 = ____r149;
  var __bs211 = cut(____id113, 0);
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
  var ____r151 = unstash([..._42args]);
  var __a21 = destash33(a, ____r151);
  var ____id115 = ____r151;
  var __bs23 = cut(____id115, 0);
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
  var __args29 = unstash([..._42args]);
  return join(["%break"], __args29);
};
setenv("break", {
  _stash: true,
  macro: __break__macro
});
var __return__macro = function (..._42args) {
  var __args31 = unstash([..._42args]);
  return join(["%return"], __args31);
};
setenv("return", {
  _stash: true,
  macro: __return__macro
});
var __while__macro = function (c, ..._42args) {
  var ____r153 = unstash([..._42args]);
  var __c1 = destash33(c, ____r153);
  var ____id117 = ____r153;
  var __body65 = cut(____id117, 0);
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
  var __args33 = unstash([..._42args]);
  return join(["%get"], __args33);
};
setenv("get", {
  _stash: true,
  macro: __get__macro
});
var __idx__macro = function (..._42args) {
  var __args35 = unstash([..._42args]);
  return join(["%idx"], __args35);
};
setenv("idx", {
  _stash: true,
  macro: __idx__macro
});
var __new__macro = function (..._42args) {
  var __args37 = unstash([..._42args]);
  return join(["%new"], __args37);
};
setenv("new", {
  _stash: true,
  macro: __new__macro
});
var __typeof__macro = function (..._42args) {
  var __args39 = unstash([..._42args]);
  return join(["%typeof"], __args39);
};
setenv("typeof", {
  _stash: true,
  macro: __typeof__macro
});
var __error__macro = function (..._42args) {
  var __args41 = unstash([..._42args]);
  return join(["%error"], __args41);
};
setenv("error", {
  _stash: true,
  macro: __error__macro
});
var __throw__macro = function (..._42args) {
  var __args43 = unstash([..._42args]);
  return join(["%throw"], __args43);
};
setenv("throw", {
  _stash: true,
  macro: __throw__macro
});
var __raise__macro = function (..._42args) {
  var __args45 = unstash([..._42args]);
  return join(["%throw"], __args45);
};
setenv("raise", {
  _stash: true,
  macro: __raise__macro
});
var __is__macro = function (..._42args) {
  var __args47 = unstash([..._42args]);
  var ____x820 = object(["target", join(["="], __args47)]);
  ____x820.py = join(["%is"], __args47);
  return ____x820;
};
setenv("is", {
  _stash: true,
  macro: __is__macro
});
var __in__macro = function (..._42args) {
  var __args49 = unstash([..._42args]);
  return join(["%in"], __args49);
};
setenv("in", {
  _stash: true,
  macro: __in__macro
});
var __as__macro = function (..._42args) {
  var __args51 = unstash([..._42args]);
  return join(["%as"], __args51);
};
setenv("as", {
  _stash: true,
  macro: __as__macro
});
var ___37expand_case__macro = function (x, ..._42args) {
  var ____r155 = unstash([..._42args]);
  var __x838 = destash33(x, ____r155);
  var ____id120 = ____r155;
  var __body69 = cut(____id120, 0);
  var __e21 = undefined;
  if (atom63(__x838)) {
    __e21 = [__x838];
  } else {
    __e21 = __x838;
  }
  var ____id1211 = __e21;
  var __a23 = has(____id1211, 0);
  var __bs25 = cut(____id1211, 1);
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
  var __args53 = unstash([..._42args]);
  if (none63(__args53)) {
    return ["do"];
  } else {
    if (one63(__args53)) {
      return join(["%expand-case"], hd(__args53));
    } else {
      var __r158 = unique("r");
      return join(["with", __r158, "nil"], map(function (__x858) {
        var ____id123 = __x858;
        var __x859 = has(____id123, 0);
        var __body71 = cut(____id123, 1);
        return ["%expand-case", __x859, ["%set", __r158, join(["%do"], __body71)]];
      }, almost(__args53)), [join(["%expand-case"], last(__args53))]);
    }
  }
};
setenv("%cases", {
  _stash: true,
  macro: ___37cases__macro
});
var __try__macro = function (x, ..._42args) {
  var ____r161 = unstash([..._42args]);
  var __x880 = destash33(x, ____r161);
  var ____id128 = ____r161;
  var __cases1 = cut(____id128, 0);
  var __fin1 = ["finally"];
  var ____o9 = __cases1;
  var ____i14 = undefined;
  for (____i14 in ____o9) {
    var __x882 = ____o9[____i14];
    var __e23 = undefined;
    if (numeric63(____i14)) {
      __e23 = parseInt(____i14);
    } else {
      __e23 = ____i14;
    }
    var ____i141 = __e23;
    if (hd63(__x882, "finally")) {
      __fin1 = __x882;
    }
  }
  var __forms7 = [];
  var ____x885 = __cases1;
  var ____i15 = 0;
  while (____i15 < _35(____x885)) {
    var ____id129 = ____x885[____i15];
    var __x886 = has(____id129, 0);
    var __body75 = cut(____id129, 1);
    if (__x886 === "finally") {
    } else {
      if (__x886 === "except" && has(__body75, 1) === "as") {
        var ____id130 = __body75;
        var __kind2 = has(____id130, 0);
        var ___1 = has(____id130, 1);
        var __name21 = has(____id130, 2);
        var __body76 = cut(____id130, 3);
        add(__forms7, join([[__x886, ["%as", __kind2, __name21]]], __body76));
      } else {
        if (__x886 === "except") {
          var ____id131 = __body75;
          var __kind3 = has(____id131, 0);
          var __body77 = cut(____id131, 1);
          add(__forms7, join([[__x886, __kind3]], __body77));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i15 = ____i15 + 1;
  }
  return join(["%cases", ["try", __x880]], __forms7, [__fin1]);
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
  var ____x909 = object(["target", ["do"]]);
  ____x909.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x909;
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
