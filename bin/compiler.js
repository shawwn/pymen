getenv = function (k, p) {
  if (string63(k)) {
    var __i = edge(environment);
    while (__i >= 0) {
      if (has63(environment[__i], k)) {
        var __b = environment[__i][k];
        var __e9 = undefined;
        if (p) {
          __e9 = has(__b, p);
        } else {
          __e9 = __b;
        }
        return __e9;
      } else {
        __i = __i - 1;
      }
    }
  }
};
var macro_function = function (k) {
  return getenv(k, "macro");
};
var macro63 = function (k) {
  return is63(macro_function(k));
};
var special63 = function (k) {
  return is63(getenv(k, "special"));
};
var special_form63 = function (form) {
  return ! atom63(form) && special63(hd(form));
};
var statement63 = function (k) {
  return special63(k) && getenv(k, "stmt");
};
var symbol_expansion = function (k) {
  return getenv(k, "symbol");
};
var symbol63 = function (k) {
  return is63(symbol_expansion(k));
};
var variable63 = function (k) {
  return is63(getenv(k, "variable"));
};
bound63 = function (x) {
  return macro63(x) || (special63(x) || (symbol63(x) || variable63(x)));
};
keyword63 = function (atom) {
  return string63(atom) && (_35(atom) > 1 && char(atom, 0) === ":");
};
quoted = function (form) {
  if (keyword63(form)) {
    return form;
  } else {
    if (string63(form)) {
      return escape(form);
    } else {
      if (atom63(form)) {
        return form;
      } else {
        return join(["quasilist"], map(quoted, form));
      }
    }
  }
};
var literal = function (s) {
  if (string_literal63(s)) {
    return s;
  } else {
    return quoted(s);
  }
};
var stash42 = function (args) {
  if (props63(args)) {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __l = array(args);
      var ____o = args;
      var __k = undefined;
      for (__k in ____o) {
        var __v = ____o[__k];
        var __e12 = undefined;
        if (numeric63(__k)) {
          __e12 = parseInt(__k);
        } else {
          __e12 = __k;
        }
        var __k1 = __e12;
        if (! number63(__k1)) {
          add(__l, ["%compile", __k1, "|=|", __v]);
        }
      }
      return __l;
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        var __l1 = array(args);
        var ____o1 = args;
        var __k2 = undefined;
        for (__k2 in ____o1) {
          var __v1 = ____o1[__k2];
          var __e11 = undefined;
          if (numeric63(__k2)) {
            __e11 = parseInt(__k2);
          } else {
            __e11 = __k2;
          }
          var __k3 = __e11;
          if (! number63(__k3)) {
            add(__l1, ["%compile", __k3, "| |", __v1]);
          }
        }
        return __l1;
      } else {
        var __l2 = ["%object", "\"_stash\"", true];
        var ____o2 = args;
        var __k4 = undefined;
        for (__k4 in ____o2) {
          var __v2 = ____o2[__k4];
          var __e10 = undefined;
          if (numeric63(__k4)) {
            __e10 = parseInt(__k4);
          } else {
            __e10 = __k4;
          }
          var __k5 = __e10;
          if (! number63(__k5)) {
            add(__l2, literal(__k5));
            add(__l2, __v2);
          }
        }
        return join({}, args, [__l2]);
      }
    }
  } else {
    return args;
  }
};
var bias = function (k) {
  if (number63(k)) {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      k = k + 1;
    }
    return k;
  } else {
    return k;
  }
};
bind = function (lh, rh) {
  if (atom63(lh)) {
    return [lh, rh];
  } else {
    if (hd63(lh, ",")) {
      return bind(cut(lh, 1), rh);
    } else {
      if (hd(lh) === "t") {
        var ____id = lh;
        var ___ = has(____id, 0);
        var ___var = has(____id, 1);
        var __val = has(____id, 2);
        var __val1 = either(__val, ___var);
        return bind(["o", ___var, ["the", __val1]], rh);
      } else {
        if (hd(lh) === "o") {
          var ____id1 = lh;
          var ___1 = has(____id1, 0);
          var ___var1 = has(____id1, 1);
          var __val2 = has(____id1, 2);
          return [___var1, ["if", ["nil?", rh], __val2, rh]];
        } else {
          var __id2 = unique("id");
          var __bs = [__id2, rh];
          var ____o3 = lh;
          var __k6 = undefined;
          for (__k6 in ____o3) {
            var __v3 = ____o3[__k6];
            var __e13 = undefined;
            if (numeric63(__k6)) {
              __e13 = parseInt(__k6);
            } else {
              __e13 = __k6;
            }
            var __k7 = __e13;
            var __e14 = undefined;
            if (__k7 === "rest") {
              __e14 = ["cut", __id2, _35(lh)];
            } else {
              __e14 = ["has", __id2, ["quote", bias(__k7)]];
            }
            var __x12 = __e14;
            if (is63(__k7)) {
              var __e15 = undefined;
              if (__v3 === true) {
                __e15 = __k7;
              } else {
                __e15 = __v3;
              }
              var __k8 = __e15;
              __bs = join(__bs, bind(__k8, __x12));
            }
          }
          return __bs;
        }
      }
    }
  }
};
var __arguments37__macro = function (from) {
  var ____x16 = object(["target"]);
  ____x16.js = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", from];
  ____x16.py = ["list", "|_args|"];
  ____x16.lua = ["quasilist", "|...|"];
  ____x16.cmake = ["%ref", "ARGN"];
  return ____x16;
};
setenv("arguments%", {
  _stash: true,
  macro: __arguments37__macro
});
var body_docstring = function (body) {
  if (_35(body) > 1 && string_literal63(hd(body))) {
    return [hd(body), tl(body)];
  } else {
    return [[], body];
  }
};
bind42 = function (args, body) {
  var __args1 = {};
  var rest = function () {
    __args1.rest = true;
    var ____x28 = object(["target"]);
    ____x28.py = ["obj", "..."];
    return ["unstash", ["quasilist", "..."], ____x28];
  };
  if (atom63(args)) {
    return [__args1, join(["let", [args, rest()]], body)];
  } else {
    var ____id3 = body_docstring(body);
    var __doc = has(____id3, 0);
    var __body = has(____id3, 1);
    var __pre = [];
    var __bs1 = [];
    var __inits = [];
    var __r20 = unique("r");
    var ____o4 = args;
    var __k9 = undefined;
    for (__k9 in ____o4) {
      var __v4 = ____o4[__k9];
      var __e16 = undefined;
      if (numeric63(__k9)) {
        __e16 = parseInt(__k9);
      } else {
        __e16 = __k9;
      }
      var __k10 = __e16;
      if (number63(__k10)) {
        if (atom63(__v4)) {
          add(__args1, __v4);
        } else {
          if (hd(__v4) === "o") {
            var ____id4 = __v4;
            var ___2 = has(____id4, 0);
            var ___var2 = has(____id4, 1);
            var __val3 = has(____id4, 2);
            add(__args1, ___var2);
            add(__inits, ["%if", ["nil?", ___var2], ["%set", ___var2, __val3]]);
          } else {
            if (hd(__v4) === "t") {
              var ____id5 = __v4;
              var ___3 = has(____id5, 0);
              var ___var3 = has(____id5, 1);
              var __val4 = has(____id5, 2);
              var __val5 = either(__val4, ___var3);
              add(__args1, ___var3);
              add(__inits, ["%if", ["nil?", ___var3], ["%set", ___var3, ["the", __val5]]]);
            } else {
              var __x40 = unique("x");
              add(__args1, __x40);
              __bs1 = join(__bs1, [__v4, __x40]);
            }
          }
        }
      }
    }
    if (props63(args)) {
      __pre = join(__pre, [__r20, rest()]);
      var __n5 = _35(__args1);
      var __i6 = 0;
      while (__i6 < __n5) {
        var __v5 = __args1[__i6];
        __pre = join(__pre, [__v5, ["destash!", __v5, __r20]]);
        __i6 = __i6 + 1;
      }
      __bs1 = join(__bs1, [props(args), __r20]);
    }
    var __forms = join(["let", __pre], __inits, [join(["let", __bs1], __body)]);
    var __e17 = undefined;
    if (is63(__doc)) {
      __e17 = ["do", __doc, __forms];
    } else {
      __e17 = __forms;
    }
    return [__args1, __e17];
  }
};
var quoting63 = function (depth) {
  return number63(depth);
};
var quasiquoting63 = function (depth) {
  return quoting63(depth) && depth > 0;
};
var can_unquote63 = function (depth) {
  return quoting63(depth) && depth === 1;
};
var quasisplice63 = function (x, depth) {
  return can_unquote63(depth) && (! atom63(x) && hd(x) === "unquote-splicing");
};
var expand_local = function (__x51) {
  var ____id6 = __x51;
  var __x52 = has(____id6, 0);
  var __name = has(____id6, 1);
  var __value = has(____id6, 2);
  setenv(__name, {
    _stash: true,
    variable: true
  });
  return ["%local", __name, macroexpand(__value)];
};
var expand_function = function (__x54) {
  var ____id7 = __x54;
  var __x55 = has(____id7, 0);
  var __args = has(____id7, 1);
  var __body1 = cut(____id7, 2);
  add(environment, {});
  var ____r28 = undefined;
  try{
    var ____o5 = __args;
    var ____i7 = undefined;
    for (____i7 in ____o5) {
      var ____x56 = ____o5[____i7];
      var __e18 = undefined;
      if (numeric63(____i7)) {
        __e18 = parseInt(____i7);
      } else {
        __e18 = ____i7;
      }
      var ____i71 = __e18;
      setenv(____x56, {
        _stash: true,
        variable: true
      });
    }
    ____r28 = join(["%function", __args], macroexpand(__body1));
  }
  finally{
    drop(environment);
  }
  return ____r28;
};
var expand_definition = function (__x58) {
  var ____id8 = __x58;
  var __x59 = has(____id8, 0);
  var __name1 = has(____id8, 1);
  var __args11 = has(____id8, 2);
  var __body2 = cut(____id8, 3);
  add(environment, {});
  var ____r31 = undefined;
  try{
    var ____o6 = __args11;
    var ____i8 = undefined;
    for (____i8 in ____o6) {
      var ____x60 = ____o6[____i8];
      var __e19 = undefined;
      if (numeric63(____i8)) {
        __e19 = parseInt(____i8);
      } else {
        __e19 = ____i8;
      }
      var ____i81 = __e19;
      setenv(____x60, {
        _stash: true,
        variable: true
      });
    }
    ____r31 = join([__x59, __name1, __args11], macroexpand(__body2));
  }
  finally{
    drop(environment);
  }
  return ____r31;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x62) {
  var ____id9 = __x62;
  var __name2 = has(____id9, 0);
  var __body3 = cut(____id9, 1);
  return apply(macro_function(__name2), __body3);
};
real63 = function (x) {
  return number63(x) && (! nan63(x) && ! inf63(x));
};
valid_access63 = function (str) {
  return _35(str) > 2 && (!( "." === char(str, 0)) && (!( "." === char(str, edge(str))) && ! search(str, "..")));
};
parse_access = function (str) {
  return reduce(function (a, b) {
    var __n8 = number(a);
    if (is63(__n8)) {
      return ["at", b, __n8];
    } else {
      return ["%idx", b, a];
    }
  }, reverse(split(str, ".")));
};
parse_access63 = function (form) {
  return string63(form) && (! string_literal63(form) && (! id_literal63(form) && (is63(search(form, ".")) && valid_access63(form))));
};
expand_access = function (form) {
  if (parse_access63(form)) {
    return parse_access(form);
  }
};
expand_atom_functions42 = [];
add(expand_atom_functions42, expand_access);
expand_atom = function (form) {
  var ____x65 = expand_atom_functions42;
  var ____i9 = 0;
  while (____i9 < _35(____x65)) {
    var __f = ____x65[____i9];
    var __x66 = __f(form);
    if (!( __x66 === undefined)) {
      return __x66;
    }
    ____i9 = ____i9 + 1;
  }
  return form;
};
macroexpand_atom = function (form) {
  if (symbol63(form)) {
    return macroexpand(symbol_expansion(form));
  } else {
    var __expr = expand_atom(form);
    if (__expr === form) {
      return __expr;
    } else {
      return macroexpand(__expr);
    }
  }
};
macroexpand = function (form) {
  if (atom63(form)) {
    return macroexpand_atom(form);
  } else {
    if (none63(form)) {
      return map(macroexpand, form);
    } else {
      var __x67 = macroexpand(hd(form));
      var __args2 = tl(form);
      if (nil63(__x67)) {
        return macroexpand(__args2);
      } else {
        if (__x67 === "%local") {
          return expand_local(form);
        } else {
          if (__x67 === "%function") {
            return expand_function(form);
          } else {
            if (__x67 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x67 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x67 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x67)) {
                    return expand_macro(form);
                  } else {
                    return join([__x67], map(macroexpand, __args2));
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
macroexpand = function (form) {
  print(str(["macroexpand", form]));
  if (parse_access63(form)) {
    return macroexpand(parse_access(form));
  } else {
    if (symbol63(form)) {
      return macroexpand(symbol_expansion(form));
    } else {
      if (atom63(form)) {
        return form;
      } else {
        if (none63(form)) {
          return map(macroexpand, form);
        } else {
          var __x70 = macroexpand(hd(form));
          var __args3 = tl(form);
          var __form = join([__x70], __args3);
          if (__x70 === undefined) {
            return macroexpand(__args3);
          } else {
            if (__x70 === "%local") {
              return expand_local(__form);
            } else {
              if (__x70 === "%function") {
                return expand_function(__form);
              } else {
                if (__x70 === "%global-function") {
                  return expand_definition(__form);
                } else {
                  if (__x70 === "%local-function") {
                    return expand_definition(__form);
                  } else {
                    if (__x70 === "%expansion") {
                      return __form[1];
                    } else {
                      if (macro63(__x70)) {
                        return expand_macro(__form);
                      } else {
                        return join([__x70], map(macroexpand, __args3));
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
macroexpand = function (form) {
  if (parse_access63(form)) {
    return macroexpand(parse_access(form));
  } else {
    if (symbol63(form)) {
      return macroexpand(symbol_expansion(form));
    } else {
      if (atom63(form)) {
        return form;
      } else {
        var __x73 = hd(form);
        if (__x73 === "%local") {
          return expand_local(form);
        } else {
          if (__x73 === "%function") {
            return expand_function(form);
          } else {
            if (__x73 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x73 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x73 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x73)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x73)) {
                      return macroexpand(join([parse_access(__x73)], tl(form)));
                    } else {
                      return map(macroexpand, form);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
var quasiquote_list = function (form, depth) {
  var __xs = [["quasilist"]];
  var ____o7 = form;
  var __k11 = undefined;
  for (__k11 in ____o7) {
    var __v6 = ____o7[__k11];
    var __e20 = undefined;
    if (numeric63(__k11)) {
      __e20 = parseInt(__k11);
    } else {
      __e20 = __k11;
    }
    var __k12 = __e20;
    if (! number63(__k12)) {
      var __e21 = undefined;
      if (quasisplice63(__v6, depth)) {
        __e21 = quasiexpand(__v6[1]);
      } else {
        __e21 = quasiexpand(__v6, depth);
      }
      var __v7 = __e21;
      last(__xs)[__k12] = __v7;
    }
  }
  var ____x77 = form;
  var ____i11 = 0;
  while (____i11 < _35(____x77)) {
    var __x78 = ____x77[____i11];
    if (quasisplice63(__x78, depth)) {
      var __x79 = quasiexpand(__x78[1]);
      add(__xs, __x79);
      add(__xs, ["quasilist"]);
    } else {
      add(last(__xs), quasiexpand(__x78, depth));
    }
    ____i11 = ____i11 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || (!( hd(x) === "quasilist") || props63(x));
  }, __xs);
  if (one63(__pruned)) {
    return hd(__pruned);
  } else {
    return join(["join"], __pruned);
  }
};
quasiexpand = function (form, depth) {
  if (quasiquoting63(depth)) {
    if (atom63(form)) {
      return ["quote", form];
    } else {
      if (can_unquote63(depth) && hd(form) === "unquote") {
        return quasiexpand(form[1]);
      } else {
        if (hd(form) === "unquote" || hd(form) === "unquote-splicing") {
          return quasiquote_list(form, depth - 1);
        } else {
          if (hd(form) === "quasiquote") {
            return quasiquote_list(form, depth + 1);
          } else {
            return quasiquote_list(form, depth);
          }
        }
      }
    }
  } else {
    if (atom63(form)) {
      return form;
    } else {
      if (hd(form) === "quote") {
        return form;
      } else {
        if (hd(form) === "quasiquote") {
          return quasiexpand(form[1], 1);
        } else {
          return map(function (x) {
            return quasiexpand(x, depth);
          }, form);
        }
      }
    }
  }
};
expand_if = function (__x83) {
  var ____id10 = __x83;
  var __a = has(____id10, 0);
  var __b1 = has(____id10, 1);
  var __c = cut(____id10, 2);
  if (is63(__b1)) {
    return [join(["%if", __a, __b1], expand_if(__c))];
  } else {
    if (is63(__a)) {
      return [__a];
    }
  }
};
setenv("indent-level", {
  _stash: true,
  toplevel: true,
  value: 0
});
setenv("indent-level", {
  _stash: true,
  symbol: ["get-value", ["quote", "indent-level"]]
});
indentation = function () {
  var __s = "";
  var __i12 = 0;
  while (__i12 < has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value")) {
    __s = __s + "  ";
    __i12 = __i12 + 1;
  }
  return __s;
};
var reserved = {
  all: {
    ["="]: true,
    ["=="]: true,
    ["+"]: true,
    ["-"]: true,
    ["%"]: true,
    ["*"]: true,
    ["/"]: true,
    ["<"]: true,
    [">"]: true,
    ["<="]: true,
    [">="]: true
  },
  js: {
    ["break"]: true,
    ["case"]: true,
    ["catch"]: true,
    ["class"]: true,
    ["const"]: true,
    ["continue"]: true,
    ["debugger"]: true,
    ["default"]: true,
    ["delete"]: true,
    ["do"]: true,
    ["else"]: true,
    ["eval"]: true,
    ["finally"]: true,
    ["for"]: true,
    ["function"]: true,
    ["if"]: true,
    ["import"]: true,
    ["in"]: true,
    ["instanceof"]: true,
    ["let"]: true,
    ["return"]: true,
    ["switch"]: true,
    ["throw"]: true,
    ["try"]: true,
    ["typeof"]: true,
    ["var"]: true,
    ["void"]: true,
    ["with"]: true
  },
  lua: {
    and: true,
    end: true,
    ["in"]: true,
    load: true,
    repeat: true,
    while: true,
    ["break"]: true,
    false: true,
    local: true,
    ["return"]: true,
    ["do"]: true,
    ["for"]: true,
    nil: true,
    then: true,
    ["else"]: true,
    ["function"]: true,
    not: true,
    true: true,
    elseif: true,
    ["if"]: true,
    or: true,
    until: true
  },
  py: {
    and: true,
    except: true,
    lambda: true,
    ["with"]: true,
    as: true,
    ["finally"]: true,
    nonlocal: true,
    while: true,
    assert: true,
    false: true,
    None: true,
    yield: true,
    ["break"]: true,
    ["for"]: true,
    not: true,
    ["class"]: true,
    from: true,
    or: true,
    ["continue"]: true,
    global: true,
    pass: true,
    def: true,
    ["if"]: true,
    raise: true,
    del: true,
    ["import"]: true,
    ["return"]: true,
    elif: true,
    ["in"]: true,
    True: true,
    ["else"]: true,
    is: true,
    ["try"]: true,
    str: true,
    print: true
  },
  cmake: {
    AND: true,
    OR: true,
    TRUE: true,
    FALSE: true,
    ON: true,
    OFF: true,
    Y: true,
    N: true
  }
};
reserved63 = function (x) {
  return has63(reserved.all, x) || has63(reserved[has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value")], x);
};
var valid_code63 = function (n) {
  return number_code63(n) || (n > 64 && n < 91 || (n > 96 && n < 123 || n === 95));
};
var compile_keyword = function (x) {
  return escape(x);
};
compile_name = function (name) {
  if (keyword63(name)) {
    return compile(clip(name, 1));
  } else {
    return compile(name);
  }
};
compile_id = function (id, raw63) {
  if (keyword63(id)) {
    return compile_keyword(id);
  } else {
    if (code(id, 0) === 46) {
      return "." + compile_id(clip(id, 1), true);
    } else {
      var __e22 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e22 = "L_";
      } else {
        __e22 = "_";
      }
      var __x89 = __e22;
      var __e23 = undefined;
      if (number_code63(code(id, 0))) {
        __e23 = __x89;
      } else {
        __e23 = "";
      }
      var __id11 = __e23;
      var __i13 = 0;
      while (__i13 < _35(id)) {
        var __c1 = char(id, __i13);
        var __n10 = code(__c1);
        var __e24 = undefined;
        if (__c1 === "-" && !( id === "-")) {
          var __e27 = undefined;
          if (__i13 === 0) {
            __e27 = __x89;
          } else {
            __e27 = "_";
          }
          __e24 = __e27;
        } else {
          var __e25 = undefined;
          if (valid_code63(__n10)) {
            __e25 = __c1;
          } else {
            var __e26 = undefined;
            if (__i13 === 0) {
              __e26 = __x89 + __n10;
            } else {
              __e26 = __n10;
            }
            __e25 = __e26;
          }
          __e24 = __e25;
        }
        var __c11 = __e24;
        __id11 = __id11 + __c11;
        __i13 = __i13 + 1;
      }
      if (raw63) {
        return __id11;
      } else {
        if (reserved63(__id11)) {
          return __x89 + __id11;
        } else {
          return __id11;
        }
      }
    }
  }
};
valid_id63 = function (x) {
  return some63(x) && x === compile_id(x);
};
var __names = {};
unique = function (x) {
  var __x90 = compile_id(x);
  if (has63(__names, __x90)) {
    var __i14 = __names[__x90];
    __names[__x90] = __names[__x90] + 1;
    return unique(__x90 + __i14);
  } else {
    __names[__x90] = 1;
    return "__" + __x90;
  }
};
key = function (k) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return compile(k);
  } else {
    if (string_literal63(k)) {
      var __i15 = inner(k);
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        var __e28 = undefined;
        if (valid_id63(__i15)) {
          __e28 = __i15;
        } else {
          __e28 = k;
        }
        return screamcase(__e28);
      } else {
        if (valid_id63(__i15)) {
          return __i15;
        } else {
          return "[" + (k + "]");
        }
      }
    } else {
      return "[" + (compile(k) + "]");
    }
  }
};
mapo = function (f, t) {
  var __o8 = [];
  var ____o9 = t;
  var __k13 = undefined;
  for (__k13 in ____o9) {
    var __v8 = ____o9[__k13];
    var __e29 = undefined;
    if (numeric63(__k13)) {
      __e29 = parseInt(__k13);
    } else {
      __e29 = __k13;
    }
    var __k14 = __e29;
    var __x91 = f(__v8);
    if (is63(__x91)) {
      add(__o8, literal(__k14));
      add(__o8, __x91);
    }
  }
  return __o8;
};
var ____x93 = object([]);
var ____x94 = object([]);
____x94.js = "!";
____x94.lua = "not";
____x94.py = "not";
____x94.cmake = "NOT";
____x93["%not"] = ____x94;
____x93["%unm"] = "-";
var ____x95 = object([]);
____x95["%mul"] = "*";
____x95["%div"] = "/";
____x95["%idiv"] = "//";
____x95["%mod"] = "%";
var ____x96 = object([]);
var ____x97 = object([]);
____x97.js = "+";
____x97.lua = "..";
____x97.py = "+";
____x96["%cat"] = ____x97;
var ____x98 = object([]);
____x98["%add"] = "+";
____x98["%sub"] = "-";
var ____x99 = object([]);
var ____x100 = object([]);
____x100.cmake = "LESS";
____x100.all = "<";
____x99["%lt"] = ____x100;
var ____x101 = object([]);
____x101.cmake = "GREATER";
____x101.all = ">";
____x99["%gt"] = ____x101;
var ____x102 = object([]);
____x102.cmake = "LESS_EQUAL";
____x102.all = "<=";
____x99["%le"] = ____x102;
var ____x103 = object([]);
____x103.cmake = "GREATER_EQUAL";
____x103.all = ">=";
____x99["%ge"] = ____x103;
var ____x104 = object([]);
var ____x105 = object([]);
____x105.js = "===";
____x105.lua = "==";
____x105.py = "==";
____x104["%eq"] = ____x105;
var ____x106 = object([]);
var ____x107 = object([]);
____x107.py = "in";
____x106["%in"] = ____x107;
var ____x108 = object([]);
____x108.py = "is";
____x106["%is"] = ____x108;
var ____x109 = object([]);
var ____x110 = object([]);
____x110.js = "&&";
____x110.lua = "and";
____x110.py = "and";
____x110.cmake = "AND";
____x109["%and"] = ____x110;
var ____x111 = object([]);
var ____x112 = object([]);
____x112.js = "||";
____x112.lua = "or";
____x112.py = "or";
____x112.cmake = "OR";
____x111["%or"] = ____x112;
var infix = [____x93, ____x95, ____x96, ____x98, ____x99, ____x104, ____x106, ____x109, ____x111];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["%not", "%unm"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    if (atom63(hd(form))) {
      var ____o10 = infix;
      var __k15 = undefined;
      for (__k15 in ____o10) {
        var __v9 = ____o10[__k15];
        var __e30 = undefined;
        if (numeric63(__k15)) {
          __e30 = parseInt(__k15);
        } else {
          __e30 = __k15;
        }
        var __k16 = __e30;
        if (has63(__v9, hd(form))) {
          return index(__k16);
        }
      }
    }
  }
  return 0;
};
var getop = function (op) {
  if (string63(op)) {
    return find(function (level) {
      var __x114 = has(level, op);
      if (__x114 === true) {
        return op;
      } else {
        if (string63(__x114)) {
          return __x114;
        } else {
          if (is63(__x114)) {
            return has(__x114, has(setenv("target", {
              _stash: true,
              toplevel: true
            }), "value")) || has(__x114, "all");
          }
        }
      }
    }, infix);
  }
};
var infix63 = function (x) {
  return is63(getop(x));
};
infix_operator63 = function (x) {
  return ! atom63(x) && infix63(hd(x));
};
compile_args = function (args, default63) {
  var __s1 = "(";
  var __c2 = "";
  var ____x115 = args;
  var ____i18 = 0;
  while (____i18 < _35(____x115)) {
    var __x116 = ____x115[____i18];
    __s1 = __s1 + (__c2 + compile(__x116));
    if ((has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") && (default63 && (! id_literal63(__x116) && !( __x116 === "...")))) {
      var __e31 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        __e31 = "";
      } else {
        __e31 = "=None";
      }
      __s1 = __s1 + __e31;
    }
    var __e32 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e32 = " ";
    } else {
      __e32 = ", ";
    }
    __c2 = __e32;
    ____i18 = ____i18 + 1;
  }
  return __s1 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s11 = "";
    var __i19 = 0;
    while (__i19 < _35(s)) {
      var __c3 = char(s, __i19);
      var __e33 = undefined;
      if (__c3 === "\n") {
        __e33 = "\\n";
      } else {
        var __e34 = undefined;
        if (__c3 === "\r") {
          __e34 = "\\r";
        } else {
          __e34 = __c3;
        }
        __e33 = __e34;
      }
      __s11 = __s11 + __e33;
      __i19 = __i19 + 1;
    }
    return __s11;
  }
};
var compile_nil = function () {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return "None";
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      return "\"\"";
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua") {
        return "nil";
      } else {
        return "undefined";
      }
    }
  }
};
var compile_boolean = function (x) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    if (x) {
      return "True";
    } else {
      return "False";
    }
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      if (x) {
        return "ON";
      } else {
        return "OFF";
      }
    } else {
      if (x) {
        return "true";
      } else {
        return "false";
      }
    }
  }
};
var triple_quoted63 = function (x) {
  return string_literal63(x) && (string_literal63(inner(x)) && string_literal63(inner(inner(x))));
};
var un_triple_quote = function (x) {
  return escape(inner(inner(inner(x))));
};
var compile_string = function (x) {
  if (triple_quoted63(x)) {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return x;
    } else {
      return escape_newlines(un_triple_quote(x));
    }
  } else {
    return escape_newlines(x);
  }
};
var compile_rest = function () {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return "*_args, **_keys";
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return "..." + compile("*args");
    } else {
      return "...";
    }
  }
};
var compile_atom = function (x, raw63) {
  if (x === "nil") {
    return compile_nil();
  } else {
    if (x === "...") {
      return compile_rest();
    } else {
      if (id_literal63(x)) {
        return inner(x);
      } else {
        if (string_literal63(x)) {
          return compile_string(x);
        } else {
          if (string63(x)) {
            return compile_id(x, raw63);
          } else {
            if (boolean63(x)) {
              return compile_boolean(x);
            } else {
              if (nan63(x)) {
                return "nan";
              } else {
                if (x === inf) {
                  return "inf";
                } else {
                  if (x === _inf) {
                    return "-inf";
                  } else {
                    if (number63(x)) {
                      return x + "";
                    } else {
                      throw new Error("Cannot compile atom: " + str(x));
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
var terminator = function (stmt63) {
  if (! stmt63) {
    return "";
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return ";\n";
    } else {
      return "\n";
    }
  }
};
var compile_special = function (form, stmt63) {
  var ____id111 = form;
  var __x117 = has(____id111, 0);
  var __args4 = cut(____id111, 1);
  var ____id12 = getenv(__x117);
  var __special = has(____id12, "special");
  var __stmt = has(____id12, "stmt");
  var __self_tr63 = has(____id12, "tr");
  var __e35 = undefined;
  if (stmt63 && ! __stmt) {
    __e35 = indentation();
  } else {
    __e35 = "";
  }
  var __p = __e35;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p + (apply(__special, __args4) + __tr);
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
method_call63 = function (form) {
  var __e36 = undefined;
  if (list63(form)) {
    __e36 = hd(form);
  } else {
    __e36 = form;
  }
  var __x118 = __e36;
  return string63(__x118) && (_35(__x118, 1) > 1 && char(__x118, 0) === ".");
};
var compile_call = function (form) {
  var __f1 = hd(form);
  var __f11 = compile_name(__f1);
  var __args5 = stash42(tl(form));
  var __e37 = undefined;
  if (method_call63(hd(__args5))) {
    __e37 = mapcat(compile, __args5, "");
  } else {
    __e37 = compile_args(__args5);
  }
  var __args6 = __e37;
  if (parenthesize_call63(__f1)) {
    return "(" + (__f11 + (")" + __args6));
  } else {
    return __f11 + __args6;
  }
};
var op_delims = function (parent, child, ..._42args) {
  var ____r81 = unstash([..._42args]);
  var __parent = destash33(parent, ____r81);
  var __child = destash33(child, ____r81);
  var ____id13 = ____r81;
  var __right = has(____id13, "right");
  var __e38 = undefined;
  if (__right) {
    __e38 = _6261;
  } else {
    __e38 = _62;
  }
  if (__e38(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id14 = form;
  var __op = has(____id14, 0);
  var ____id15 = cut(____id14, 1);
  var __a1 = has(____id15, 0);
  var __b2 = has(____id15, 1);
  var ____id16 = op_delims(form, __a1);
  var __ao = has(____id16, 0);
  var __ac = has(____id16, 1);
  var ____id17 = op_delims(form, __b2, {
    _stash: true,
    right: true
  });
  var __bo = has(____id17, 0);
  var __bc = has(____id17, 1);
  var __a2 = compile(__a1);
  var __b3 = compile(__b2);
  var __op1 = getop(__op);
  if (unary63(form)) {
    return __op1 + (__ao + (" " + (__a2 + __ac)));
  } else {
    return __ao + (__a2 + (__ac + (" " + (__op1 + (" " + (__bo + (__b3 + __bc)))))));
  }
};
compile_body = function (body) {
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") + 1;
  var ____x122 = compile(body, {
    _stash: true,
    stmt: true
  });
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") - 1;
  var __s2 = ____x122;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py" && none63(__s2)) {
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x123 = indentation() + "pass\n";
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    return ____x123;
  } else {
    return __s2;
  }
};
compile_function = function (args, body, ..._42args) {
  var ____r84 = unstash([..._42args]);
  var __args7 = destash33(args, ____r84);
  var __body4 = destash33(body, ____r84);
  var ____id18 = ____r84;
  var __name3 = has(____id18, "name");
  var __prefix = has(____id18, "prefix");
  var __async = has(____id18, "async");
  var __e39 = undefined;
  if (__name3) {
    __e39 = compile_name(__name3);
  } else {
    __e39 = "";
  }
  var __id19 = __e39;
  var __e40 = undefined;
  if (has(__args7, "rest")) {
    __e40 = join(__args7, ["..."]);
  } else {
    __e40 = __args7;
  }
  var __args12 = __e40;
  var __e41 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e41 = compile_args(join([["%compile", __id19]], __args12), true);
  } else {
    __e41 = compile_args(__args12, true);
  }
  var __args8 = __e41;
  var __body5 = compile_body(__body4);
  var __ind = indentation();
  var __e42 = undefined;
  if (__prefix) {
    __e42 = __prefix + " ";
  } else {
    __e42 = "";
  }
  var __p1 = __e42;
  var __e43 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e43 = "";
  } else {
    var __e44 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e44 = "endfunction()";
    } else {
      __e44 = "end";
    }
    __e43 = __e44;
  }
  var __tr1 = __e43;
  var __e45 = undefined;
  if (__async && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua")) {
    __e45 = "async ";
  } else {
    __e45 = "";
  }
  var __a3 = __e45;
  if (__name3) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __a3 + ("function " + (__id19 + (__args8 + (" {\n" + (__body5 + (__ind + ("}" + __tr1)))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __e46 = undefined;
      if (none63(__ind)) {
        __e46 = "\n";
      } else {
        __e46 = "";
      }
      var __ws = __e46;
      return __a3 + ("def " + (__id19 + (__args8 + (":\n" + (__body5 + __ws)))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        return __a3 + ("function" + (__args8 + ("\n" + (__body5 + (__ind + __tr1)))));
      } else {
        return __p1 + ("function " + (__id19 + (__args8 + ("\n" + (__body5 + (__ind + __tr1))))));
      }
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "%return") && ! statement63(hd(form)));
};
compile = function (form, raw63, ..._42args) {
  var ____r86 = unstash([..._42args]);
  var __form1 = destash33(form, ____r86);
  var __raw63 = destash33(raw63, ____r86);
  var ____id20 = ____r86;
  var __stmt1 = has(____id20, "stmt");
  if (nil63(__form1)) {
    return "";
  } else {
    if (special_form63(__form1)) {
      return compile_special(__form1, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e47 = undefined;
      if (__stmt1) {
        __e47 = indentation();
      } else {
        __e47 = "";
      }
      var __ind1 = __e47;
      var __e48 = undefined;
      if (atom63(__form1)) {
        __e48 = compile_atom(__form1, __raw63);
      } else {
        var __e49 = undefined;
        if (infix63(hd(__form1))) {
          __e49 = compile_infix(__form1);
        } else {
          __e49 = compile_call(__form1);
        }
        __e48 = __e49;
      }
      var __form2 = __e48;
      return __ind1 + (__form2 + __tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e = lower(form, __hoist, true, tail63);
  var __e50 = undefined;
  if (some63(__hoist) && is63(__e)) {
    __e50 = join(["%do"], __hoist, [__e]);
  } else {
    var __e51 = undefined;
    if (is63(__e)) {
      __e51 = __e;
    } else {
      var __e52 = undefined;
      if (_35(__hoist) > 1) {
        __e52 = join(["%do"], __hoist);
      } else {
        __e52 = hd(__hoist);
      }
      __e51 = __e52;
    }
    __e50 = __e51;
  }
  return either(__e50, ["%do"]);
};
var lower_body = function (body, tail63) {
  return lower_statement(join(["%do"], body), tail63);
};
var literal63 = function (form) {
  return atom63(form) || (hd(form) === "%array" || (hd(form) === "%object" || (hd(form) === "%list" || (hd(form) === "%ptr" || (hd(form) === "%id" || (hd(form) === "%ref" || hd(form) === ","))))));
};
var standalone63 = function (form) {
  return !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") && string_literal63(form) || (! atom63(form) && (! infix63(hd(form)) && (! literal63(form) && !( "%get" === hd(form)))) || id_literal63(form));
};
var lower_do = function (args, hoist, stmt63, tail63) {
  var ____x134 = almost(args);
  var ____i20 = 0;
  while (____i20 < _35(____x134)) {
    var __x135 = ____x134[____i20];
    var ____y = lower(__x135, hoist, stmt63);
    if (yes(____y)) {
      var __e1 = ____y;
      if (standalone63(__e1)) {
        add(hoist, __e1);
      }
    }
    ____i20 = ____i20 + 1;
  }
  var __e2 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e2)) {
    return ["%return", __e2];
  } else {
    return __e2;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id21 = args;
  var __lh = has(____id21, 0);
  var __rh = has(____id21, 1);
  var __lh1 = lower(__lh, hoist);
  var __rh1 = lower(__rh, hoist);
  add(hoist, ["%set", __lh1, __rh1]);
  if (!( stmt63 && ! tail63 || false)) {
    return __lh1;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id22 = args;
  var __cond = has(____id22, 0);
  var __then = has(____id22, 1);
  var ___else = has(____id22, 2);
  if (stmt63) {
    var __e54 = undefined;
    if (is63(___else)) {
      __e54 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([__then], tail63)], __e54));
  } else {
    var __e3 = unique("e");
    add(hoist, ["%local", __e3, "nil"]);
    var __e53 = undefined;
    if (is63(___else)) {
      __e53 = [lower(["%set", __e3, ___else])];
    }
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, __then])], __e53));
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      return ["%id", __e3];
    } else {
      return __e3;
    }
  }
};
var lower_short = function (x, args, hoist) {
  var ____id23 = args;
  var __a4 = has(____id23, 0);
  var __b4 = has(____id23, 1);
  var __hoist1 = [];
  var __b11 = lower(__b4, __hoist1);
  if (some63(__hoist1)) {
    var __id24 = unique("id");
    var __e55 = undefined;
    if (x === "%and") {
      __e55 = ["%if", __id24, __b4, __id24];
    } else {
      __e55 = ["%if", __id24, __id24, __b4];
    }
    return lower(["%do", ["%local", __id24, __a4], __e55], hoist);
  } else {
    return [x, lower(__a4, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id25 = args;
  var __c4 = has(____id25, 0);
  var __body6 = cut(____id25, 1);
  var __pre1 = [];
  var __c5 = lower(__c4, __pre1);
  var __e56 = undefined;
  if (none63(__pre1)) {
    __e56 = ["%while", __c5, lower_body(__body6)];
  } else {
    __e56 = ["%while", true, join(["%do"], __pre1, [["%if", ["%not", __c5], ["%break"]], lower_body(__body6)])];
  }
  return add(hoist, __e56);
};
var lower_for = function (args, hoist) {
  var ____id26 = args;
  var __h = has(____id26, 0);
  var __k17 = has(____id26, 1);
  var __body7 = cut(____id26, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k17, lower_body(__body7)], props(__body7)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id27 = args;
  var __h1 = has(____id27, 0);
  var __body8 = cut(____id27, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body8, tail63)], props(__body8)));
  } else {
    var __e4 = unique("e");
    add(hoist, ["%local", __e4]);
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e4, join(["%do"], __body8)])], props(__body8)));
    return __e4;
  }
};
var lower_block = function (kind, args, hoist, stmt63, tail63) {
  var ____id28 = args;
  var __name4 = has(____id28, 0);
  var __h2 = has(____id28, 1);
  var __body9 = cut(____id28, 2);
  return add(hoist, [kind, __name4, lower(__h2, hoist), lower_body(__body9, tail63)]);
};
var lower_from = function (args, hoist, stmt63, tail63) {
  var ____id29 = args;
  var __name5 = has(____id29, 0);
  var __import_ = has(____id29, 1);
  var __id30 = has(____id29, 2);
  var __as_ = has(____id29, 3);
  var __alias = has(____id29, 4);
  add(hoist, join(["from"], args));
  return __alias || __id30;
};
var lower_import = function (__x169, hoist, stmt63, tail63) {
  var ____id31 = __x169;
  var __name6 = has(____id31, 0);
  var __alias1 = cut(____id31, 1);
  var __e57 = undefined;
  if (hd(__alias1) === "as") {
    __e57 = __alias1[1];
  } else {
    __e57 = hd(__alias1);
  }
  var __as = __e57;
  var __id32 = __as || __name6;
  add(hoist, join(["import", __name6], __alias1));
  if (! stmt63) {
    return __id32;
  }
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    var __f2 = unique("f");
    return lower(["%do", join(["%local-function", __f2], args), __f2], hoist);
  } else {
    var ____id33 = args;
    var __a5 = has(____id33, 0);
    var __body10 = cut(____id33, 1);
    return join(["%function", __a5, lower_body(__body10, true)], props(__body10));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id34 = args;
  var __name7 = has(____id34, 0);
  var __args9 = has(____id34, 1);
  var __body11 = cut(____id34, 2);
  return add(hoist, join([kind, __name7, __args9, lower_body(__body11, true)], props(__body11)));
};
ref63 = function (x) {
  return list63(x) && hd63(x, "%ref");
};
id63 = function (x) {
  return list63(x) && hd63(x, "%id");
};
ptr63 = function (x) {
  return list63(x) && hd63(x, "%ptr");
};
reference63 = function (x) {
  return ref63(x) || (id63(x) || ptr63(x));
};
ptr_name = function (x) {
  return x[1];
};
ptr_decay = function (x) {
  var __x177 = ptr_name(x);
  if (id63(__x177)) {
    return __x177;
  } else {
    if (ref63(__x177)) {
      return __x177;
    } else {
      return ["%id", __x177];
    }
  }
};
ptr_decay = function (x) {
  return x;
};
var lower_invoke = function (form, hoist) {
  var __ptr = undefined;
  var lower_ptr = function (x) {
    if (ptr63(x)) {
      __ptr = ptr_decay(x);
      x = ptr_name(x);
    }
    return x;
  };
  var __form3 = map(lower_ptr, form);
  if (is63(__ptr) && ! literal63(__form3)) {
    add(hoist, __form3);
  } else {
    __ptr = __form3;
  }
  return __ptr;
};
var lower_call = function (form, hoist) {
  var __form4 = map(function (x) {
    return lower(x, hoist);
  }, form);
  if (some63(__form4)) {
    return lower_invoke(__form4, hoist);
  }
};
var pairwise63 = function (form) {
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"]);
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e5 = [];
    var ____id35 = form;
    var __x180 = has(____id35, 0);
    var __args10 = cut(____id35, 1);
    reduce(function (a, b) {
      add(__e5, [__x180, a, b]);
      return a;
    }, __args10);
    return join(["%and"], reverse(__e5));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form5 = lower_pairwise(form);
  var ____id36 = __form5;
  var __x183 = has(____id36, 0);
  var __args111 = cut(____id36, 1);
  return lower(reduce(function (a, b) {
    return [__x183, b, a];
  }, reverse(__args111)), hoist);
};
var lower_special = function (form, hoist) {
  var __e6 = lower_call(form, hoist);
  if (__e6) {
    return add(hoist, __e6);
  }
};
lower = function (form, hoist, stmt63, tail63) {
  if (atom63(form)) {
    return form;
  } else {
    if (empty63(form)) {
      return ["%array"];
    } else {
      if (nil63(hoist)) {
        return lower_statement(form);
      } else {
        if (lower_infix63(form)) {
          return lower_infix(form, hoist);
        } else {
          var ____id37 = form;
          var __x186 = has(____id37, 0);
          var __args121 = cut(____id37, 1);
          if (__x186 === "%do") {
            return lower_do(__args121, hoist, stmt63, tail63);
          } else {
            if (__x186 === "%call") {
              return lower(__args121, hoist, stmt63, tail63);
            } else {
              if (__x186 === "%set") {
                return lower_set(__args121, hoist, stmt63, tail63);
              } else {
                if (__x186 === "%if") {
                  return lower_if(__args121, hoist, stmt63, tail63);
                } else {
                  if (__x186 === "%try") {
                    return lower_try(__args121, hoist, tail63);
                  } else {
                    if (__x186 === "%while") {
                      return lower_while(__args121, hoist);
                    } else {
                      if (__x186 === "%for") {
                        return lower_for(__args121, hoist);
                      } else {
                        if (__x186 === "%with") {
                          return lower_with(__args121, hoist, stmt63, tail63);
                        } else {
                          if (__x186 === "%block") {
                            return lower_block("%block", __args121, hoist, stmt63, tail63);
                          } else {
                            if (__x186 === "%cases") {
                              return lower_cases(__args121, hoist, stmt63, tail63);
                            } else {
                              if (__x186 === "import") {
                                return lower_import(__args121, hoist, stmt63, tail63);
                              } else {
                                if (__x186 === "from") {
                                  return lower_from(__args121, hoist, stmt63, tail63);
                                } else {
                                  if (__x186 === "%function") {
                                    return lower_function(__args121, hoist);
                                  } else {
                                    if (__x186 === "%local-function" || __x186 === "%global-function") {
                                      return lower_definition(__x186, __args121, hoist);
                                    } else {
                                      if (in63(__x186, ["%and", "%or"])) {
                                        return lower_short(__x186, __args121, hoist);
                                      } else {
                                        if (statement63(__x186)) {
                                          return lower_special(form, hoist);
                                        } else {
                                          return lower_call(form, hoist);
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
expand = function (form) {
  return lower(macroexpand(form));
};
if (typeof(global) === "undefined") {
  var __e58 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e58 = window;
  } else {
    var __e59 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e59 = self;
    } else {
      __e59 = this;
    }
    __e58 = __e59;
  }
  global = __e58;
}
if (!( typeof(require) === "undefined")) {
  global.require = require;
  if (!( typeof(module) === "undefined")) {
    module.filename = require("path").resolve("repl");
    module.paths = require("module")._nodeModulePaths(module.filename);
  }
}
var run = function (code, context) {
  var __f3 = new Function("with(this) {\n" + (code + "\n}"));
  return __f3.call(either(context, global));
};
var eval_result = function (globals, locals) {
  return lumen_result;
};
_eval = function (form, globals, locals) {
  var ____prev = has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value");
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = "js";
  var ____id38 = (function () {
    try {
      var ____prev1 = has(setenv("indent-level", {
        _stash: true,
        toplevel: true
      }), "value");
      setenv("indent-level", {
        _stash: true,
        toplevel: true
      }).value = 0;
      var ____id39 = (function () {
        try {
          return [true, compile(expand(["%set", "lumen-result", form]))];
        }
        catch (e) {
          return [false, e];
        }
      })();
      var ____ok3 = has(____id39, 0);
      var ____x191 = has(____id39, 1);
      setenv("indent-level", {
        _stash: true,
        toplevel: true
      }).value = ____prev1;
      var __e60 = undefined;
      if (____ok3) {
        __e60 = ____x191;
      } else {
        throw ____x191;
        __e60 = undefined;
      }
      return [true, __e60];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var ____ok2 = has(____id38, 0);
  var ____x188 = has(____id38, 1);
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = ____prev;
  var __e61 = undefined;
  if (____ok2) {
    __e61 = ____x188;
  } else {
    throw ____x188;
    __e61 = undefined;
  }
  var __code = __e61;
  run(__code, globals, locals);
  return eval_result(globals, locals);
};
immediate_call63 = function (x) {
  return ! atom63(x) && (! atom63(hd(x)) && hd(hd(x)) === "%function");
};
var ___37do__special = function (..._42args) {
  var __forms1 = unstash([..._42args]);
  var __s3 = "";
  var ____x196 = __forms1;
  var ____i21 = 0;
  while (____i21 < _35(____x196)) {
    var __x197 = ____x196[____i21];
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" && (immediate_call63(__x197) && "\n" === char(__s3, edge(__s3)))) {
      __s3 = clip(__s3, 0, edge(__s3)) + ";\n";
    }
    __s3 = __s3 + compile(__x197, {
      _stash: true,
      stmt: true
    });
    if (! atom63(__x197)) {
      if (hd(__x197) === "%return" || hd(__x197) === "%break") {
        break;
      }
    }
    ____i21 = ____i21 + 1;
  }
  return __s3;
};
setenv("%do", {
  _stash: true,
  special: ___37do__special,
  stmt: true,
  tr: true
});
var ___37cmake_block__special = function (body) {
  var __ind2 = indentation();
  var __s4 = "";
  __s4 = __s4 + (__ind2 + "block(SCOPE_FOR VARIABLES)\n");
  __s4 = __s4 + compile_body(body);
  __s4 = __s4 + (__ind2 + "endblock()\n");
  return __s4;
};
setenv("%cmake-block", {
  _stash: true,
  special: ___37cmake_block__special,
  stmt: true,
  tr: true
});
var ___37if__special = function (cond, cons, alt) {
  var __cond1 = compile(cond);
  var __cons = compile_body(cons);
  var __e62 = undefined;
  if (alt) {
    __e62 = compile_body(alt);
  }
  var __alt = __e62;
  var __ind3 = indentation();
  var __s5 = "";
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __s5 = __s5 + (__ind3 + ("if (" + (__cond1 + (") {\n" + (__cons + (__ind3 + "}"))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __s5 = __s5 + (__ind3 + ("if " + (__cond1 + (":\n" + __cons))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        __s5 = __s5 + (__ind3 + ("if(" + (__cond1 + (")\n" + __cons))));
      } else {
        __s5 = __s5 + (__ind3 + ("if " + (__cond1 + (" then\n" + __cons))));
      }
    }
  }
  if (__alt && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __s5 = __s5 + (" else {\n" + (__alt + (__ind3 + "}")));
  } else {
    if (__alt && has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __s5 = __s5 + (__ind3 + ("else:\n" + __alt));
    } else {
      if (__alt && has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        __s5 = __s5 + (__ind3 + ("else()\n" + __alt));
      } else {
        if (__alt) {
          __s5 = __s5 + (__ind3 + ("else\n" + __alt));
        }
      }
    }
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    return __s5 + (__ind3 + "end\n");
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __s5 + "\n";
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        return __s5 + (__ind3 + "endif()\n");
      } else {
        return __s5;
      }
    }
  }
};
setenv("%if", {
  _stash: true,
  special: ___37if__special,
  stmt: true,
  tr: true
});
var ___37while__special = function (cond, form) {
  var __cond2 = compile(cond);
  var __body12 = compile_body(form);
  var __ind4 = indentation();
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __ind4 + ("while (" + (__cond2 + (") {\n" + (__body12 + (__ind4 + "}\n")))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind4 + ("while " + (__cond2 + (":\n" + __body12)));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        return __ind4 + ("while(" + (__cond2 + (")\n" + (__body12 + (__ind4 + "endwhile()\n")))));
      } else {
        return __ind4 + ("while " + (__cond2 + (" do\n" + (__body12 + (__ind4 + "end\n")))));
      }
    }
  }
};
setenv("%while", {
  _stash: true,
  special: ___37while__special,
  stmt: true,
  tr: true
});
var ___37for__special = function (t, k, form, ..._42args) {
  var ____r138 = unstash([..._42args]);
  var __t = destash33(t, ____r138);
  var __k18 = destash33(k, ____r138);
  var __form6 = destash33(form, ____r138);
  var ____id40 = ____r138;
  var __async1 = has(____id40, "async");
  var __t1 = compile(__t);
  var __k19 = compile(__k18);
  var __ind5 = indentation();
  var __body13 = compile_body(__form6);
  var __e63 = undefined;
  if (__async1) {
    __e63 = "async ";
  } else {
    __e63 = "";
  }
  var __a6 = __e63;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    return __ind5 + ("for " + (__k19 + (" in next, " + (__t1 + (" do\n" + (__body13 + (__ind5 + "end\n")))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind5 + (__a6 + ("for " + (__k19 + (" in " + (__t1 + (":\n" + __body13))))));
    } else {
      return __ind5 + ("for (" + (__k19 + (" in " + (__t1 + (") {\n" + (__body13 + (__ind5 + "}\n")))))));
    }
  }
};
setenv("%for", {
  _stash: true,
  special: ___37for__special,
  stmt: true,
  tr: true
});
var ___37with__special = function (t, form, ..._42args) {
  var ____r139 = unstash([..._42args]);
  var __t2 = destash33(t, ____r139);
  var __form7 = destash33(form, ____r139);
  var ____id41 = ____r139;
  var __async2 = has(____id41, "async");
  var __t3 = compile(__t2);
  var __ind6 = indentation();
  var __body14 = compile_body(__form7);
  var __e64 = undefined;
  if (__async2) {
    __e64 = "async ";
  } else {
    __e64 = "";
  }
  var __a7 = __e64;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return __ind6 + (__a7 + ("with " + (__t3 + (":\n" + __body14))));
  } else {
    return "";
  }
};
setenv("%with", {
  _stash: true,
  special: ___37with__special,
  stmt: true,
  tr: true
});
var ___37block__special = function (name, t, form) {
  var __t4 = compile(t);
  var __ind7 = indentation();
  var __body15 = compile_body(form);
  var __e65 = undefined;
  if (some63(__t4)) {
    __e65 = " ";
  } else {
    __e65 = "";
  }
  var __sep = __e65;
  var __e66 = undefined;
  if (some63(__t4)) {
    __e66 = "(";
  } else {
    __e66 = "";
  }
  var __lh11 = __e66;
  var __e67 = undefined;
  if (some63(__t4)) {
    __e67 = ")";
  } else {
    __e67 = "";
  }
  var __rh11 = __e67;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return __ind7 + (name + (__sep + (__t4 + (":\n" + __body15))));
  } else {
    return __ind7 + (name + (__sep + (__lh11 + (__t4 + (__rh11 + (__sep + ("{\n" + (__body15 + (__ind7 + "}\n")))))))));
  }
};
setenv("%block", {
  _stash: true,
  special: ___37block__special,
  stmt: true,
  tr: true
});
var ___37try__special = function (form) {
  var __ind8 = indentation();
  var __body16 = compile_body(form);
  var __e68 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e68 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", false, ["%get", "e", 1], "e"]]];
  } else {
    __e68 = ["%return", ["%array", false, "e"]];
  }
  var __hf = __e68;
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") + 1;
  var ____x210 = compile(__hf, {
    _stash: true,
    stmt: true
  });
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") - 1;
  var __h3 = ____x210;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __ind8 + ("try {\n" + (__body16 + (__ind8 + ("}\n" + (__ind8 + ("catch (e) {\n" + (__h3 + (__ind8 + "}\n"))))))));
  } else {
    return __ind8 + ("try:\n" + (__body16 + (__ind8 + ("except:\n" + __h3))));
  }
};
setenv("%try", {
  _stash: true,
  special: ___37try__special,
  stmt: true,
  tr: true
});
var ___37delete__special = function (place) {
  var __e69 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e69 = "del ";
  } else {
    __e69 = "delete ";
  }
  return indentation() + (__e69 + compile(place));
};
setenv("%delete", {
  _stash: true,
  special: ___37delete__special,
  stmt: true
});
var ___37break__special = function () {
  var __e70 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e70 = "()";
  } else {
    __e70 = "";
  }
  return indentation() + ("break" + __e70);
};
setenv("%break", {
  _stash: true,
  special: ___37break__special,
  stmt: true
});
var ___37function__special = function (args, ..._42args) {
  var ____r144 = unstash([..._42args]);
  var __args15 = destash33(args, ____r144);
  var ____id42 = ____r144;
  var __body17 = cut(____id42, 0);
  return apply(compile_function, join([__args15], __body17, []));
};
setenv("%function", {
  _stash: true,
  special: ___37function__special
});
var ___37global_function__special = function (name, args, ..._42args) {
  var ____r145 = unstash([..._42args]);
  var __name8 = destash33(name, ____r145);
  var __args16 = destash33(args, ____r145);
  var ____id43 = ____r145;
  var __body18 = cut(____id43, 0);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake")) {
    var ____x216 = object([__args16]);
    ____x216.name = __name8;
    var ____x217 = object([]);
    ____x217.name = __name8;
    var __x215 = apply(compile_function, join(____x216, __body18, ____x217));
    return indentation() + __x215;
  } else {
    return compile(["%set", __name8, join(["%function", __args16], __body18)], {
      _stash: true,
      stmt: true
    });
  }
};
setenv("%global-function", {
  _stash: true,
  special: ___37global_function__special,
  stmt: true,
  tr: true
});
var ___37local_function__special = function (name, args, ..._42args) {
  var ____r146 = unstash([..._42args]);
  var __name9 = destash33(name, ____r146);
  var __args17 = destash33(args, ____r146);
  var ____id44 = ____r146;
  var __body19 = cut(____id44, 0);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake")) {
    var ____x222 = object([__args17]);
    ____x222.name = __name9;
    ____x222.prefix = "local";
    var ____x223 = object([]);
    ____x223.name = __name9;
    ____x223.prefix = "local";
    var __x221 = apply(compile_function, join(____x222, __body19, ____x223));
    return indentation() + __x221;
  } else {
    return compile(["%local", __name9, join(["%function", __args17], __body19)], {
      _stash: true,
      stmt: true
    });
  }
};
setenv("%local-function", {
  _stash: true,
  special: ___37local_function__special,
  stmt: true,
  tr: true
});
var ___37ref__special = function (variable) {
  if (id63(variable)) {
    return compile(variable);
  } else {
    return "${" + (compile(variable) + "}");
  }
};
setenv("%ref", {
  _stash: true,
  special: ___37ref__special
});
var ___37id__special = function (x) {
  return escape(compile(["%ptr", x]));
};
setenv("%id", {
  _stash: true,
  special: ___37id__special
});
var ___37ptr__special = function (x) {
  var __e71 = undefined;
  if (reference63(x)) {
    __e71 = x;
  } else {
    __e71 = ["%ref", x];
  }
  return compile(__e71);
};
setenv("%ptr", {
  _stash: true,
  special: ___37ptr__special
});
var ___37return__special = function (x) {
  var __e72 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    var __e74 = undefined;
    if (nil63(x)) {
      __e74 = ["return"];
    } else {
      __e74 = ["return", "PROPAGATE", x];
    }
    __e72 = compile(__e74);
  } else {
    var __e73 = undefined;
    if (nil63(x)) {
      __e73 = "return";
    } else {
      __e73 = "return " + compile(x);
    }
    __e72 = __e73;
  }
  return indentation() + __e72;
};
setenv("%return", {
  _stash: true,
  special: ___37return__special,
  stmt: true
});
var ___37new__special = function (x) {
  return "new " + compile(x);
};
setenv("%new", {
  _stash: true,
  special: ___37new__special
});
var ___37typeof__special = function (x) {
  return "typeof(" + (compile(x) + ")");
};
setenv("%typeof", {
  _stash: true,
  special: ___37typeof__special
});
var ___37error__special = function (x) {
  var __e75 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e75 = "throw " + compile(["%new", ["Error", x]]);
  } else {
    var __e76 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e76 = "raise " + compile(["Exception", x]);
    } else {
      __e76 = "error(" + (compile(x) + ")");
    }
    __e75 = __e76;
  }
  var __e7 = __e75;
  return indentation() + __e7;
};
setenv("%error", {
  _stash: true,
  special: ___37error__special,
  stmt: true
});
var ___37throw__special = function (x) {
  var __e77 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e77 = "throw " + compile(x);
  } else {
    var __e78 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e78 = "raise " + compile(x);
    } else {
      __e78 = "error(" + (compile(x) + ")");
    }
    __e77 = __e78;
  }
  var __e8 = __e77;
  return indentation() + __e8;
};
setenv("%throw", {
  _stash: true,
  special: ___37throw__special,
  stmt: true
});
var ___37local__special = function (name, value) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    return compile(["%set", name, value]);
  }
  if (nil63(value) && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    value = "nil";
  }
  var __id45 = compile(name);
  var __value1 = compile(value);
  var __e79 = undefined;
  if (is63(value)) {
    __e79 = " = " + __value1;
  } else {
    __e79 = "";
  }
  var __rh2 = __e79;
  var __e80 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e80 = "var ";
  } else {
    var __e81 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e81 = "local ";
    } else {
      __e81 = "";
    }
    __e80 = __e81;
  }
  var __keyword = __e80;
  var __ind9 = indentation();
  return __ind9 + (__keyword + (__id45 + __rh2));
};
setenv("%local", {
  _stash: true,
  special: ___37local__special,
  stmt: true
});
var ___37set__special = function (lh, rh) {
  var __lh2 = compile(lh);
  var __e82 = undefined;
  if (nil63(rh)) {
    __e82 = "nil";
  } else {
    __e82 = rh;
  }
  var __rh3 = compile(__e82);
  var __ind10 = indentation();
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    return indentation() + ("set(" + (__lh2 + (" " + (__rh3 + ")"))));
  } else {
    return indentation() + (__lh2 + (" = " + __rh3));
  }
};
setenv("%set", {
  _stash: true,
  special: ___37set__special,
  stmt: true
});
var ___37get__special = function (t, k) {
  var __t11 = compile(t);
  var __k111 = compile(k);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && char(__t11, 0) === "{" || infix_operator63(t)) {
    __t11 = "(" + (__t11 + ")");
  }
  if (string_literal63(k) && (valid_id63(inner(k)) && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py"))) {
    return __t11 + ("." + inner(k));
  } else {
    return __t11 + ("[" + (__k111 + "]"));
  }
};
setenv("%get", {
  _stash: true,
  special: ___37get__special
});
var ___37idx__special = function (t, k) {
  var __t12 = compile(t);
  var __k121 = compile(k, "raw");
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && char(__t12, 0) === "{" || infix_operator63(t)) {
    __t12 = "(" + (__t12 + ")");
  }
  return __t12 + ("." + __k121);
};
setenv("%idx", {
  _stash: true,
  special: ___37idx__special
});
var ___37array__special = function (..._42args) {
  var __forms2 = unstash([..._42args]);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    return mapcat(compile, __forms2, " ");
  } else {
    var __e83 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e83 = "{";
    } else {
      __e83 = "[";
    }
    var __open = __e83;
    var __e84 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e84 = "}";
    } else {
      __e84 = "]";
    }
    var __close = __e84;
    var __s6 = "";
    var __c6 = "";
    var ____o11 = __forms2;
    var __k20 = undefined;
    for (__k20 in ____o11) {
      var __v10 = ____o11[__k20];
      var __e85 = undefined;
      if (numeric63(__k20)) {
        __e85 = parseInt(__k20);
      } else {
        __e85 = __k20;
      }
      var __k21 = __e85;
      if (number63(__k21)) {
        __s6 = __s6 + (__c6 + compile(__v10));
        __c6 = ", ";
      }
    }
    return __open + (__s6 + __close);
  }
};
setenv("%array", {
  _stash: true,
  special: ___37array__special
});
var ___37object__special = function (..._42args) {
  var __forms3 = unstash([..._42args]);
  var __e86 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e86 = "";
  } else {
    __e86 = "{";
  }
  var __s7 = __e86;
  var __c7 = "";
  var __e87 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    __e87 = " = ";
  } else {
    var __e88 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e88 = " ";
    } else {
      __e88 = ": ";
    }
    __e87 = __e88;
  }
  var __sep1 = __e87;
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") + 1;
  var ____x236 = indentation();
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") - 1;
  var __ind11 = ____x236;
  var __e89 = undefined;
  if (_35(__forms3) > 2) {
    __e89 = "\n" + __ind11;
  }
  var __pad = __e89;
  var __e90 = undefined;
  if (is63(__pad)) {
    __e90 = "\n" + indentation();
  } else {
    __e90 = "";
  }
  var __end = __e90;
  __s7 = __s7 + either(__pad, "");
  var ____x237 = pair(__forms3);
  var ____i23 = 0;
  while (____i23 < _35(____x237)) {
    var ____id46 = ____x237[____i23];
    var __k22 = has(____id46, 0);
    var __v11 = has(____id46, 1);
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x238 = compile(__v11);
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    __s7 = __s7 + (__c7 + (key(__k22) + (__sep1 + ____x238)));
    var __e91 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e91 = "";
    } else {
      __e91 = ",";
    }
    __c7 = __e91 + either(__pad, " ");
    ____i23 = ____i23 + 1;
  }
  var __e92 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e92 = "";
  } else {
    __e92 = "}";
  }
  return __s7 + (__end + __e92);
};
setenv("%object", {
  _stash: true,
  special: ___37object__special
});
var ___37list__special = function (form, comps, cond, ..._42args) {
  var ____r159 = unstash([..._42args]);
  var __form8 = destash33(form, ____r159);
  var __comps = destash33(comps, ____r159);
  var __cond3 = destash33(cond, ____r159);
  var ____id47 = ____r159;
  var __kind = has(____id47, "kind");
  var __s8 = compile(__form8);
  var __e93 = undefined;
  if (__kind === "object") {
    __e93 = ["{", "}"];
  } else {
    __e93 = ["[", "]"];
  }
  var ____id48 = __e93;
  var __lh3 = has(____id48, 0);
  var __rh4 = has(____id48, 1);
  if (!( __kind === "object")) {
    __s8 = "(" + (__s8 + ")");
  }
  var ____x242 = __comps;
  var ____i24 = 0;
  while (____i24 < _35(____x242)) {
    var ____id49 = ____x242[____i24];
    var __k23 = has(____id49, 0);
    var __v12 = has(____id49, 1);
    __s8 = __s8 + (" for " + (compile(__k23) + (" in " + compile(__v12))));
    ____i24 = ____i24 + 1;
  }
  if (is63(__cond3)) {
    __s8 = __s8 + (" if " + compile(__cond3));
  }
  return __lh3 + (__s8 + __rh4);
};
setenv("%list", {
  _stash: true,
  special: ___37list__special
});
compile_literal = function (x) {
  if (string_literal63(x)) {
    return inner(x);
  } else {
    return compile(x);
  }
};
var ___37literal__special = function (..._42args) {
  var __args18 = unstash([..._42args]);
  return mapcat(compile_literal, __args18);
};
setenv("%literal", {
  _stash: true,
  special: ___37literal__special
});
var ___37compile__special = function (..._42args) {
  var __args19 = unstash([..._42args]);
  return mapcat(compile, __args19);
};
setenv("%compile", {
  _stash: true,
  special: ___37compile__special
});
var __global__special = function (x) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return indentation() + ("global " + (compile(x) + "\n"));
  } else {
    return "";
  }
};
setenv("global", {
  _stash: true,
  special: __global__special,
  stmt: true,
  tr: true
});
var __import__special = function (name, ..._42args) {
  var ____r162 = unstash([..._42args]);
  var __name10 = destash33(name, ____r162);
  var ____id50 = ____r162;
  var __alias2 = cut(____id50, 0);
  var __ind12 = indentation();
  var __e94 = undefined;
  if (hd(__alias2) === "as") {
    __e94 = __alias2[1];
  } else {
    __e94 = hd(__alias2);
  }
  var __as1 = __e94;
  var __id51 = __as1 || __name10;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __s9 = __ind12 + ("import " + compile(__name10));
    if (__as1) {
      __s9 = __s9 + (" as " + compile(__id51));
    }
    return __s9;
  } else {
    return __ind12 + compile(["%local", __id51, ["require", escape(__name10)]]);
  }
};
setenv("import", {
  _stash: true,
  special: __import__special,
  stmt: true
});
var __from__special = function (name, ..._42args) {
  var ____r163 = unstash([..._42args]);
  var __name11 = destash33(name, ____r163);
  var ____id52 = ____r163;
  var __imports = cut(____id52, 0);
  var __ind13 = indentation();
  var __id53 = __name11;
  var __r164 = undefined;
  __r164 = drop(__imports);
  var __e95 = undefined;
  if (last(__imports) === "as") {
    __e95 = drop(__imports);
  } else {
    add(__imports, __r164);
    __r164 = undefined;
    __e95 = __r164;
  }
  var __as2 = __r164;
  var __e96 = undefined;
  if (hd(__imports) === "import") {
    __e96 = tl(__imports);
  } else {
    __e96 = __imports;
  }
  var __names1 = __e96;
  var __names2 = mapcat(function (x) {
    if (x === "*") {
      return x;
    } else {
      return compile(x);
    }
  }, __names1, ", ");
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __s10 = __ind13 + ("from " + (compile(__name11) + (" import " + __names2)));
    if (__as2) {
      __s10 = __s10 + (" as " + compile(__as2));
    }
    return __s10;
  } else {
    return "";
  }
};
setenv("from", {
  _stash: true,
  special: __from__special,
  stmt: true
});
var ___44__special = function (..._42args) {
  var __args20 = unstash([..._42args]);
  if (none63(__args20)) {
    return ", ";
  } else {
    if (one63(__args20)) {
      return ", " + compile(hd(__args20));
    } else {
      return mapcat(compile, __args20, ", ");
    }
  }
};
setenv(",", {
  _stash: true,
  special: ___44__special
});
var __3458__special34 = function (..._42args) {
  var __args21 = unstash([..._42args]);
  if (none63(__args21)) {
    return ":";
  } else {
    if (one63(__args21)) {
      return ":" + compile(hd(__args21));
    } else {
      return mapcat(compile, __args21, ":");
    }
  }
};
setenv(":", {
  _stash: true,
  special: __3458__special34
});
var ___37as__special = function (form, id) {
  return compile(form) + (" as " + compile(id));
};
setenv("%as", {
  _stash: true,
  special: ___37as__special
});
var __yield__special = function (..._42args) {
  var __args22 = unstash([..._42args]);
  return indentation() + ("yield " + mapcat(compile, __args22, ", "));
};
setenv("yield", {
  _stash: true,
  special: __yield__special,
  stmt: true
});
var __await__special = function (x) {
  var __e97 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    __e97 = "";
  } else {
    __e97 = "await ";
  }
  var __a8 = __e97;
  return __a8 + compile(x);
};
setenv("await", {
  _stash: true,
  special: __await__special
});
var ___37b__special = function (x) {
  return "b" + compile(x);
};
setenv("%b", {
  _stash: true,
  special: ___37b__special
});
var ___37f__special = function (x) {
  return "f" + compile(x);
};
setenv("%f", {
  _stash: true,
  special: ___37f__special
});
var ___37r__special = function (x) {
  return "r" + compile(x);
};
setenv("%r", {
  _stash: true,
  special: ___37r__special
});
var ___64__special = function (x) {
  return indentation() + ("@" + compile(x));
};
setenv("@", {
  _stash: true,
  special: ___64__special,
  stmt: true
});
exports.run = run;
exports["eval"] = _eval;
exports.eval = _eval;
exports.expand = expand;
exports.compile = compile;
