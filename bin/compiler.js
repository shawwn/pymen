getenv = function (k, p) {
  if (string63(k)) {
    var __i = edge(environment);
    while (__i >= 0) {
      if (has63(environment[__i], k)) {
        var __b = environment[__i][k];
        var __e40 = undefined;
        if (p) {
          __e40 = has(__b, p);
        } else {
          __e40 = __b;
        }
        return __e40;
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
        return join(["list"], map(quoted, form));
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
        var __e42 = undefined;
        if (numeric63(__k)) {
          __e42 = parseInt(__k);
        } else {
          __e42 = __k;
        }
        var __k1 = __e42;
        if (! number63(__k1)) {
          add(__l, ["%literal", __k1, "|=|", __v]);
        }
      }
      return __l;
    } else {
      var __l1 = ["%object", "\"_stash\"", true];
      var ____o1 = args;
      var __k2 = undefined;
      for (__k2 in ____o1) {
        var __v1 = ____o1[__k2];
        var __e41 = undefined;
        if (numeric63(__k2)) {
          __e41 = parseInt(__k2);
        } else {
          __e41 = __k2;
        }
        var __k3 = __e41;
        if (! number63(__k3)) {
          add(__l1, literal(__k3));
          add(__l1, __v1);
        }
      }
      return join(args, [__l1]);
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
          var ____o2 = lh;
          var __k4 = undefined;
          for (__k4 in ____o2) {
            var __v2 = ____o2[__k4];
            var __e43 = undefined;
            if (numeric63(__k4)) {
              __e43 = parseInt(__k4);
            } else {
              __e43 = __k4;
            }
            var __k5 = __e43;
            var __e44 = undefined;
            if (__k5 === "rest") {
              __e44 = ["cut", __id2, _35(lh)];
            } else {
              __e44 = ["has", __id2, ["quote", bias(__k5)]];
            }
            var __x11 = __e44;
            if (is63(__k5)) {
              var __e45 = undefined;
              if (__v2 === true) {
                __e45 = __k5;
              } else {
                __e45 = __v2;
              }
              var __k6 = __e45;
              __bs = join(__bs, bind(__k6, __x11));
            }
          }
          return __bs;
        }
      }
    }
  }
};
setenv("arguments%", {
  _stash: true,
  macro: function (from) {
    var ____x22 = object(["target"]);
    ____x22.js = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", from];
    ____x22.py = ["|list|", "|_args|"];
    ____x22.lua = ["list", "|...|"];
    return ____x22;
  }
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
    var ____x33 = object(["target"]);
    ____x33.py = "|_keys|";
    return ["unstash", ["arguments%", _35(__args1)], ____x33];
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
    var __r21 = unique("r");
    var ____o3 = args;
    var __k7 = undefined;
    for (__k7 in ____o3) {
      var __v3 = ____o3[__k7];
      var __e46 = undefined;
      if (numeric63(__k7)) {
        __e46 = parseInt(__k7);
      } else {
        __e46 = __k7;
      }
      var __k8 = __e46;
      if (number63(__k8)) {
        if (atom63(__v3)) {
          add(__args1, __v3);
        } else {
          if (hd(__v3) === "o") {
            var ____id4 = __v3;
            var ___2 = has(____id4, 0);
            var ___var2 = has(____id4, 1);
            var __val3 = has(____id4, 2);
            add(__args1, ___var2);
            add(__inits, ["%if", ["nil?", ___var2], ["%set", ___var2, __val3]]);
          } else {
            if (hd(__v3) === "t") {
              var ____id5 = __v3;
              var ___3 = has(____id5, 0);
              var ___var3 = has(____id5, 1);
              var __val4 = has(____id5, 2);
              var __val5 = either(__val4, ___var3);
              add(__args1, ___var3);
              add(__inits, ["%if", ["nil?", ___var3], ["%set", ___var3, ["the", __val5]]]);
            } else {
              var __x44 = unique("x");
              add(__args1, __x44);
              __bs1 = join(__bs1, [__v3, __x44]);
            }
          }
        }
      }
    }
    if (props63(args)) {
      __pre = join(__pre, [__r21, rest()]);
      var __n4 = _35(__args1);
      var __i5 = 0;
      while (__i5 < __n4) {
        var __v4 = __args1[__i5];
        __pre = join(__pre, [__v4, ["destash!", __v4, __r21]]);
        __i5 = __i5 + 1;
      }
      __bs1 = join(__bs1, [props(args), __r21]);
    }
    var __forms = join(["let", __pre], __inits, [join(["let", __bs1], __body)]);
    var __e47 = undefined;
    if (is63(__doc)) {
      __e47 = ["do", __doc, __forms];
    } else {
      __e47 = __forms;
    }
    return [__args1, __e47];
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
var expand_local = function (__x55) {
  var ____id6 = __x55;
  var __x56 = has(____id6, 0);
  var __name = has(____id6, 1);
  var __value = has(____id6, 2);
  setenv(__name, {
    _stash: true,
    variable: true
  });
  return ["%local", __name, macroexpand(__value)];
};
var expand_function = function (__x58) {
  var ____id7 = __x58;
  var __x59 = has(____id7, 0);
  var __args = has(____id7, 1);
  var __body1 = cut(____id7, 2);
  add(environment, {});
  var ____r29 = undefined;
  try{
    var ____o4 = __args;
    var ____i6 = undefined;
    for (____i6 in ____o4) {
      var ____x60 = ____o4[____i6];
      var __e48 = undefined;
      if (numeric63(____i6)) {
        __e48 = parseInt(____i6);
      } else {
        __e48 = ____i6;
      }
      var ____i61 = __e48;
      setenv(____x60, {
        _stash: true,
        variable: true
      });
    }
    ____r29 = join(["%function", __args], macroexpand(__body1));
  }
  finally{
    drop(environment);
  }
  return ____r29;
};
var expand_definition = function (__x62) {
  var ____id8 = __x62;
  var __x63 = has(____id8, 0);
  var __name1 = has(____id8, 1);
  var __args11 = has(____id8, 2);
  var __body2 = cut(____id8, 3);
  add(environment, {});
  var ____r32 = undefined;
  try{
    var ____o5 = __args11;
    var ____i7 = undefined;
    for (____i7 in ____o5) {
      var ____x64 = ____o5[____i7];
      var __e49 = undefined;
      if (numeric63(____i7)) {
        __e49 = parseInt(____i7);
      } else {
        __e49 = ____i7;
      }
      var ____i71 = __e49;
      setenv(____x64, {
        _stash: true,
        variable: true
      });
    }
    ____r32 = join([__x63, __name1, __args11], macroexpand(__body2));
  }
  finally{
    drop(environment);
  }
  return ____r32;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x66) {
  var ____id9 = __x66;
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
    var __n7 = number(a);
    if (is63(__n7)) {
      return ["at", b, __n7];
    } else {
      return ["%idx", b, a];
    }
  }, reverse(split(str, ".")));
};
parse_access63 = function (form) {
  return string63(form) && (! string_literal63(form) && (! id_literal63(form) && (is63(search(form, ".")) && valid_access63(form))));
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
        var __x69 = hd(form);
        if (__x69 === "%local") {
          return expand_local(form);
        } else {
          if (__x69 === "%function") {
            return expand_function(form);
          } else {
            if (__x69 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x69 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x69 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x69)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x69)) {
                      return macroexpand(join([parse_access(__x69)], tl(form)));
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
  var __xs = [["list"]];
  var ____o6 = form;
  var __k9 = undefined;
  for (__k9 in ____o6) {
    var __v5 = ____o6[__k9];
    var __e50 = undefined;
    if (numeric63(__k9)) {
      __e50 = parseInt(__k9);
    } else {
      __e50 = __k9;
    }
    var __k10 = __e50;
    if (! number63(__k10)) {
      var __e51 = undefined;
      if (quasisplice63(__v5, depth)) {
        __e51 = quasiexpand(__v5[1]);
      } else {
        __e51 = quasiexpand(__v5, depth);
      }
      var __v6 = __e51;
      last(__xs)[__k10] = __v6;
    }
  }
  var ____x73 = form;
  var ____i9 = 0;
  while (____i9 < _35(____x73)) {
    var __x74 = ____x73[____i9];
    if (quasisplice63(__x74, depth)) {
      var __x75 = quasiexpand(__x74[1]);
      add(__xs, __x75);
      add(__xs, ["list"]);
    } else {
      add(last(__xs), quasiexpand(__x74, depth));
    }
    ____i9 = ____i9 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || (!( hd(x) === "list") || props63(x));
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
expand_if = function (__x79) {
  var ____id10 = __x79;
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
  var __i10 = 0;
  while (__i10 < has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value")) {
    __s = __s + "  ";
    __i10 = __i10 + 1;
  }
  return __s;
};
var reserved = {
  all: {
    "=": true,
    "==": true,
    "+": true,
    "-": true,
    "%": true,
    "*": true,
    "/": true,
    "<": true,
    ">": true,
    "<=": true,
    ">=": true
  },
  js: {
    "break": true,
    "case": true,
    "catch": true,
    "class": true,
    "const": true,
    "continue": true,
    "debugger": true,
    "default": true,
    "delete": true,
    "do": true,
    "else": true,
    "eval": true,
    "finally": true,
    "for": true,
    "function": true,
    "if": true,
    "import": true,
    "in": true,
    "instanceof": true,
    "let": true,
    "return": true,
    "switch": true,
    "throw": true,
    "try": true,
    "typeof": true,
    "var": true,
    "void": true,
    "with": true
  },
  lua: {
    and: true,
    end: true,
    "in": true,
    load: true,
    repeat: true,
    while: true,
    "break": true,
    false: true,
    local: true,
    "return": true,
    "do": true,
    "for": true,
    nil: true,
    then: true,
    "else": true,
    "function": true,
    not: true,
    true: true,
    elseif: true,
    "if": true,
    or: true,
    until: true
  },
  py: {
    and: true,
    except: true,
    lambda: true,
    "with": true,
    as: true,
    "finally": true,
    nonlocal: true,
    while: true,
    assert: true,
    false: true,
    None: true,
    yield: true,
    "break": true,
    "for": true,
    not: true,
    "class": true,
    from: true,
    or: true,
    "continue": true,
    global: true,
    pass: true,
    def: true,
    "if": true,
    raise: true,
    del: true,
    "import": true,
    "return": true,
    elif: true,
    "in": true,
    True: true,
    "else": true,
    is: true,
    "try": true,
    str: true,
    print: true
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
compile_id = function (id, raw63) {
  if (keyword63(id)) {
    return compile_keyword(id);
  } else {
    if (code(id, 0) === 46) {
      return "." + compile_id(clip(id, 1), true);
    } else {
      var __e52 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e52 = "L_";
      } else {
        __e52 = "_";
      }
      var __x85 = __e52;
      var __e53 = undefined;
      if (number_code63(code(id, 0))) {
        __e53 = __x85;
      } else {
        __e53 = "";
      }
      var __id11 = __e53;
      var __i11 = 0;
      while (__i11 < _35(id)) {
        var __c1 = char(id, __i11);
        var __n9 = code(__c1);
        var __e54 = undefined;
        if (__c1 === "-" && !( id === "-")) {
          var __e57 = undefined;
          if (__i11 === 0) {
            __e57 = __x85;
          } else {
            __e57 = "_";
          }
          __e54 = __e57;
        } else {
          var __e55 = undefined;
          if (valid_code63(__n9)) {
            __e55 = __c1;
          } else {
            var __e56 = undefined;
            if (__i11 === 0) {
              __e56 = __x85 + __n9;
            } else {
              __e56 = __n9;
            }
            __e55 = __e56;
          }
          __e54 = __e55;
        }
        var __c11 = __e54;
        __id11 = __id11 + __c11;
        __i11 = __i11 + 1;
      }
      if (raw63) {
        return __id11;
      } else {
        if (reserved63(__id11)) {
          return __x85 + __id11;
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
  var __x86 = compile_id(x);
  if (has63(__names, __x86)) {
    var __i12 = __names[__x86];
    __names[__x86] = __names[__x86] + 1;
    return unique(__x86 + __i12);
  } else {
    __names[__x86] = 1;
    return "__" + __x86;
  }
};
key = function (k) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return k;
  } else {
    var __i13 = inner(k);
    if (valid_id63(__i13)) {
      return __i13;
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "js") {
        return k;
      } else {
        return "[" + (k + "]");
      }
    }
  }
};
mapo = function (f, t) {
  var __o7 = [];
  var ____o8 = t;
  var __k11 = undefined;
  for (__k11 in ____o8) {
    var __v7 = ____o8[__k11];
    var __e58 = undefined;
    if (numeric63(__k11)) {
      __e58 = parseInt(__k11);
    } else {
      __e58 = __k11;
    }
    var __k12 = __e58;
    var __x87 = f(__v7);
    if (is63(__x87)) {
      add(__o7, literal(__k12));
      add(__o7, __x87);
    }
  }
  return __o7;
};
var ____x89 = object([]);
var ____x90 = object([]);
____x90.js = "!";
____x90.lua = "not";
____x90.py = "not";
____x89["%not"] = ____x90;
____x89["%unm"] = "-";
var ____x91 = object([]);
____x91["%mul"] = "*";
____x91["%div"] = "/";
____x91["%idiv"] = "//";
____x91["%mod"] = "%";
var ____x92 = object([]);
var ____x93 = object([]);
____x93.js = "+";
____x93.lua = "..";
____x93.py = "+";
____x92["%cat"] = ____x93;
var ____x94 = object([]);
____x94["%add"] = "+";
____x94["%sub"] = "-";
var ____x95 = object([]);
____x95["%lt"] = "<";
____x95["%gt"] = ">";
____x95["%le"] = "<=";
____x95["%ge"] = ">=";
var ____x96 = object([]);
var ____x97 = object([]);
____x97.js = "===";
____x97.lua = "==";
____x97.py = "==";
____x96["%eq"] = ____x97;
var ____x98 = object([]);
var ____x99 = object([]);
____x99.py = "in";
____x98["%in"] = ____x99;
var ____x100 = object([]);
____x100.py = "is";
____x98["%is"] = ____x100;
var ____x101 = object([]);
var ____x102 = object([]);
____x102.js = "&&";
____x102.lua = "and";
____x102.py = "and";
____x101["%and"] = ____x102;
var ____x103 = object([]);
var ____x104 = object([]);
____x104.js = "||";
____x104.lua = "or";
____x104.py = "or";
____x103["%or"] = ____x104;
var infix = [____x89, ____x91, ____x92, ____x94, ____x95, ____x96, ____x98, ____x101, ____x103];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["%not", "%unm"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var ____o9 = infix;
    var __k13 = undefined;
    for (__k13 in ____o9) {
      var __v8 = ____o9[__k13];
      var __e59 = undefined;
      if (numeric63(__k13)) {
        __e59 = parseInt(__k13);
      } else {
        __e59 = __k13;
      }
      var __k14 = __e59;
      if (has63(__v8, hd(form))) {
        return index(__k14);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x106 = has(level, op);
    if (__x106 === true) {
      return op;
    } else {
      if (string63(__x106)) {
        return __x106;
      } else {
        if (is63(__x106)) {
          return has(__x106, has(setenv("target", {
            _stash: true,
            toplevel: true
          }), "value"));
        }
      }
    }
  }, infix);
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
  var ____x107 = args;
  var ____i16 = 0;
  while (____i16 < _35(____x107)) {
    var __x108 = ____x107[____i16];
    __s1 = __s1 + (__c2 + compile(__x108));
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" && (default63 && ! id_literal63(__x108))) {
      __s1 = __s1 + "=None";
    }
    __c2 = ", ";
    ____i16 = ____i16 + 1;
  }
  return __s1 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s11 = "";
    var __i17 = 0;
    while (__i17 < _35(s)) {
      var __c3 = char(s, __i17);
      var __e60 = undefined;
      if (__c3 === "\n") {
        __e60 = "\\n";
      } else {
        var __e61 = undefined;
        if (__c3 === "\r") {
          __e61 = "\\r";
        } else {
          __e61 = __c3;
        }
        __e60 = __e61;
      }
      __s11 = __s11 + __e60;
      __i17 = __i17 + 1;
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
    }), "value") === "lua") {
      return "nil";
    } else {
      return "undefined";
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
    if (x) {
      return "true";
    } else {
      return "false";
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
var compile_atom = function (x, raw63) {
  if (x === "nil") {
    return compile_nil();
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
  var __x109 = has(____id111, 0);
  var __args2 = cut(____id111, 1);
  var ____id12 = getenv(__x109);
  var __special = has(____id12, "special");
  var __stmt = has(____id12, "stmt");
  var __self_tr63 = has(____id12, "tr");
  var __e62 = undefined;
  if (stmt63 && ! __stmt) {
    __e62 = indentation();
  } else {
    __e62 = "";
  }
  var __p = __e62;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p + (apply(__special, __args2) + __tr);
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
method_call63 = function (form) {
  var __e63 = undefined;
  if (list63(form)) {
    __e63 = hd(form);
  } else {
    __e63 = form;
  }
  var __x110 = __e63;
  return string63(__x110) && (_35(__x110, 1) > 1 && char(__x110, 0) === ".");
};
var compile_call = function (form) {
  var __f = hd(form);
  var __f1 = compile(__f);
  var __args3 = stash42(tl(form));
  var __e64 = undefined;
  if (method_call63(hd(__args3))) {
    __e64 = mapcat(compile, __args3, "");
  } else {
    __e64 = compile_args(__args3);
  }
  var __args4 = __e64;
  if (parenthesize_call63(__f)) {
    return "(" + (__f1 + (")" + __args4));
  } else {
    return __f1 + __args4;
  }
};
var op_delims = function (parent, child) {
  var ____r75 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r75);
  var __child = destash33(child, ____r75);
  var ____id13 = ____r75;
  var __right = has(____id13, "right");
  var __e65 = undefined;
  if (__right) {
    __e65 = _6261;
  } else {
    __e65 = _62;
  }
  if (__e65(precedence(__child), precedence(__parent))) {
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
  var ____x113 = compile(body, {
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
  var __s2 = ____x113;
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
    var ____x114 = indentation() + "pass\n";
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    return ____x114;
  } else {
    return __s2;
  }
};
compile_function = function (args, body) {
  var ____r78 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args5 = destash33(args, ____r78);
  var __body4 = destash33(body, ____r78);
  var ____id18 = ____r78;
  var __name3 = has(____id18, "name");
  var __prefix = has(____id18, "prefix");
  var __async = has(____id18, "async");
  var __e66 = undefined;
  if (__name3) {
    __e66 = compile(__name3);
  } else {
    __e66 = "";
  }
  var __id19 = __e66;
  var __e67 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && has63(__args5, "rest")) {
    __e67 = join(__args5, ["|...|"]);
  } else {
    var __e68 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" && has63(__args5, "rest")) {
      __e68 = join(__args5, ["|*_args|", "|**_keys|"]);
    } else {
      __e68 = __args5;
    }
    __e67 = __e68;
  }
  var __args12 = __e67;
  var __args6 = compile_args(__args12, true);
  var __body5 = compile_body(__body4);
  var __ind = indentation();
  var __e69 = undefined;
  if (__prefix) {
    __e69 = __prefix + " ";
  } else {
    __e69 = "";
  }
  var __p1 = __e69;
  var __e70 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e70 = "";
  } else {
    __e70 = "end";
  }
  var __tr1 = __e70;
  var __e71 = undefined;
  if (__async && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua")) {
    __e71 = "async ";
  } else {
    __e71 = "";
  }
  var __a3 = __e71;
  if (__name3) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __a3 + ("function " + (__id19 + (__args6 + (" {\n" + (__body5 + (__ind + ("}" + __tr1)))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __e72 = undefined;
      if (none63(__ind)) {
        __e72 = "\n";
      } else {
        __e72 = "";
      }
      var __ws = __e72;
      return __a3 + ("def " + (__id19 + (__args6 + (":\n" + (__body5 + __ws)))));
    } else {
      return __p1 + ("function " + (__id19 + (__args6 + ("\n" + (__body5 + (__ind + __tr1))))));
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "%return") && ! statement63(hd(form)));
};
compile = function (form, raw63) {
  var ____r80 = unstash(Array.prototype.slice.call(arguments, 2));
  var __form = destash33(form, ____r80);
  var __raw63 = destash33(raw63, ____r80);
  var ____id20 = ____r80;
  var __stmt1 = has(____id20, "stmt");
  if (nil63(__form)) {
    return "";
  } else {
    if (special_form63(__form)) {
      return compile_special(__form, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e73 = undefined;
      if (__stmt1) {
        __e73 = indentation();
      } else {
        __e73 = "";
      }
      var __ind1 = __e73;
      var __e74 = undefined;
      if (atom63(__form)) {
        __e74 = compile_atom(__form, __raw63);
      } else {
        var __e75 = undefined;
        if (infix63(hd(__form))) {
          __e75 = compile_infix(__form);
        } else {
          __e75 = compile_call(__form);
        }
        __e74 = __e75;
      }
      var __form1 = __e74;
      return __ind1 + (__form1 + __tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e = lower(form, __hoist, true, tail63);
  var __e76 = undefined;
  if (some63(__hoist) && is63(__e)) {
    __e76 = join(["%do"], __hoist, [__e]);
  } else {
    var __e77 = undefined;
    if (is63(__e)) {
      __e77 = __e;
    } else {
      var __e78 = undefined;
      if (_35(__hoist) > 1) {
        __e78 = join(["%do"], __hoist);
      } else {
        __e78 = hd(__hoist);
      }
      __e77 = __e78;
    }
    __e76 = __e77;
  }
  return either(__e76, ["%do"]);
};
var lower_body = function (body, tail63) {
  return lower_statement(join(["%do"], body), tail63);
};
var literal63 = function (form) {
  return atom63(form) || (hd(form) === "%array" || (hd(form) === "%object" || (hd(form) === "%list" || hd(form) === ",")));
};
var standalone63 = function (form) {
  return !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") && string_literal63(form) || (! atom63(form) && (! infix63(hd(form)) && (! literal63(form) && !( "%get" === hd(form)))) || id_literal63(form));
};
var lower_do = function (args, hoist, stmt63, tail63) {
  var ____x122 = almost(args);
  var ____i18 = 0;
  while (____i18 < _35(____x122)) {
    var __x123 = ____x122[____i18];
    var ____y = lower(__x123, hoist, stmt63);
    if (yes(____y)) {
      var __e1 = ____y;
      if (standalone63(__e1)) {
        add(hoist, __e1);
      }
    }
    ____i18 = ____i18 + 1;
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
  if (!( stmt63 && ! tail63)) {
    return __lh1;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id22 = args;
  var __cond = has(____id22, 0);
  var __then = has(____id22, 1);
  var ___else = has(____id22, 2);
  if (stmt63) {
    var __e80 = undefined;
    if (is63(___else)) {
      __e80 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([__then], tail63)], __e80));
  } else {
    var __e3 = unique("e");
    add(hoist, ["%local", __e3, "nil"]);
    var __e79 = undefined;
    if (is63(___else)) {
      __e79 = [lower(["%set", __e3, ___else])];
    }
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, __then])], __e79));
    return __e3;
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
    var __e81 = undefined;
    if (x === "%and") {
      __e81 = ["%if", __id24, __b4, __id24];
    } else {
      __e81 = ["%if", __id24, __id24, __b4];
    }
    return lower(["%do", ["%local", __id24, __a4], __e81], hoist);
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
  var __e82 = undefined;
  if (none63(__pre1)) {
    __e82 = ["%while", __c5, lower_body(__body6)];
  } else {
    __e82 = ["%while", true, join(["%do"], __pre1, [["%if", ["%not", __c5], ["%break"]], lower_body(__body6)])];
  }
  return add(hoist, __e82);
};
var lower_for = function (args, hoist) {
  var ____id26 = args;
  var __h = has(____id26, 0);
  var __k15 = has(____id26, 1);
  var __body7 = cut(____id26, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k15, lower_body(__body7)], props(__body7)));
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
var lower_block = function (args, hoist, stmt63, tail63) {
  var ____id28 = args;
  var __name4 = has(____id28, 0);
  var __h2 = has(____id28, 1);
  var __body9 = cut(____id28, 2);
  return add(hoist, ["%block", __name4, lower(__h2, hoist), lower_body(__body9, tail63)]);
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __f11 = unique("f");
    return lower(["%do", join(["%local-function", __f11], args), __f11], hoist);
  } else {
    var ____id29 = args;
    var __a5 = has(____id29, 0);
    var __body10 = cut(____id29, 1);
    return join(["%function", __a5, lower_body(__body10, true)], props(__body10));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id30 = args;
  var __name5 = has(____id30, 0);
  var __args7 = has(____id30, 1);
  var __body11 = cut(____id30, 2);
  return add(hoist, join([kind, __name5, __args7, lower_body(__body11, true)], props(__body11)));
};
var lower_call = function (form, hoist) {
  var __form2 = map(function (x) {
    return lower(x, hoist);
  }, form);
  if (some63(__form2)) {
    return __form2;
  }
};
var pairwise63 = function (form) {
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"]);
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e5 = [];
    var ____id31 = form;
    var __x160 = has(____id31, 0);
    var __args8 = cut(____id31, 1);
    reduce(function (a, b) {
      add(__e5, [__x160, a, b]);
      return a;
    }, __args8);
    return join(["%and"], reverse(__e5));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form3 = lower_pairwise(form);
  var ____id32 = __form3;
  var __x163 = has(____id32, 0);
  var __args9 = cut(____id32, 1);
  return lower(reduce(function (a, b) {
    return [__x163, b, a];
  }, reverse(__args9)), hoist);
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
          var ____id33 = form;
          var __x166 = has(____id33, 0);
          var __args10 = cut(____id33, 1);
          if (__x166 === "%do") {
            return lower_do(__args10, hoist, stmt63, tail63);
          } else {
            if (__x166 === "%call") {
              return lower(__args10, hoist, stmt63, tail63);
            } else {
              if (__x166 === "%set") {
                return lower_set(__args10, hoist, stmt63, tail63);
              } else {
                if (__x166 === "%if") {
                  return lower_if(__args10, hoist, stmt63, tail63);
                } else {
                  if (__x166 === "%try") {
                    return lower_try(__args10, hoist, tail63);
                  } else {
                    if (__x166 === "%while") {
                      return lower_while(__args10, hoist);
                    } else {
                      if (__x166 === "%for") {
                        return lower_for(__args10, hoist);
                      } else {
                        if (__x166 === "%with") {
                          return lower_with(__args10, hoist, stmt63, tail63);
                        } else {
                          if (__x166 === "%block") {
                            return lower_block(__args10, hoist, stmt63, tail63);
                          } else {
                            if (__x166 === "%cases") {
                              return lower_cases(__args10, hoist, stmt63, tail63);
                            } else {
                              if (__x166 === "%function") {
                                return lower_function(__args10, hoist);
                              } else {
                                if (__x166 === "%local-function" || __x166 === "%global-function") {
                                  return lower_definition(__x166, __args10, hoist);
                                } else {
                                  if (in63(__x166, ["%and", "%or"])) {
                                    return lower_short(__x166, __args10, hoist);
                                  } else {
                                    if (statement63(__x166)) {
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
};
expand = function (form) {
  return lower(macroexpand(form));
};
if (typeof(global) === "undefined") {
  var __e83 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e83 = window;
  } else {
    var __e84 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e84 = self;
    } else {
      __e84 = this;
    }
    __e83 = __e84;
  }
  global = __e83;
}
if (!( typeof(require) === "undefined")) {
  global.require = require;
  if (!( typeof(module) === "undefined")) {
    module.filename = require("path").resolve("repl");
    module.paths = require("module")._nodeModulePaths(module.filename);
  }
}
var run = function (code, context) {
  var __f2 = new Function("with(this) {\n" + (code + "\n}"));
  return __f2.call(either(context, global));
};
var eval_result = function (globals, locals) {
  return lumen_result;
};
_eval = function (form, globals, locals) {
  var __previous = has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value");
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = "js";
  var __code = compile(expand(["%set", "lumen-result", form]));
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = __previous;
  run(__code, globals, locals);
  return eval_result(globals, locals);
};
immediate_call63 = function (x) {
  return ! atom63(x) && (! atom63(hd(x)) && hd(hd(x)) === "%function");
};
setenv("%do", {
  _stash: true,
  special: function () {
    var __forms2 = unstash(Array.prototype.slice.call(arguments, 0));
    var __s4 = "";
    var ____x171 = __forms2;
    var ____i20 = 0;
    while (____i20 < _35(____x171)) {
      var __x172 = ____x171[____i20];
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua" && (immediate_call63(__x172) && "\n" === char(__s4, edge(__s4)))) {
        __s4 = clip(__s4, 0, edge(__s4)) + ";\n";
      }
      __s4 = __s4 + compile(__x172, {
        _stash: true,
        stmt: true
      });
      if (! atom63(__x172)) {
        if (hd(__x172) === "%return" || hd(__x172) === "%break") {
          break;
        }
      }
      ____i20 = ____i20 + 1;
    }
    return __s4;
  },
  stmt: true,
  tr: true
});
setenv("%if", {
  _stash: true,
  special: function (cond, cons, alt) {
    var __cond2 = compile(cond);
    var __cons1 = compile_body(cons);
    var __e85 = undefined;
    if (alt) {
      __e85 = compile_body(alt);
    }
    var __alt1 = __e85;
    var __ind3 = indentation();
    var __s6 = "";
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __s6 = __s6 + (__ind3 + ("if (" + (__cond2 + (") {\n" + (__cons1 + (__ind3 + "}"))))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __s6 = __s6 + (__ind3 + ("if " + (__cond2 + (":\n" + __cons1))));
      } else {
        __s6 = __s6 + (__ind3 + ("if " + (__cond2 + (" then\n" + __cons1))));
      }
    }
    if (__alt1 && has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __s6 = __s6 + (" else {\n" + (__alt1 + (__ind3 + "}")));
    } else {
      if (__alt1 && has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __s6 = __s6 + (__ind3 + ("else:\n" + __alt1));
      } else {
        if (__alt1) {
          __s6 = __s6 + (__ind3 + ("else\n" + __alt1));
        }
      }
    }
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return __s6 + (__ind3 + "end\n");
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "js") {
        return __s6 + "\n";
      } else {
        return __s6;
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%while", {
  _stash: true,
  special: function (cond, form) {
    var __cond4 = compile(cond);
    var __body13 = compile_body(form);
    var __ind5 = indentation();
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind5 + ("while (" + (__cond4 + (") {\n" + (__body13 + (__ind5 + "}\n")))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind5 + ("while " + (__cond4 + (":\n" + __body13)));
      } else {
        return __ind5 + ("while " + (__cond4 + (" do\n" + (__body13 + (__ind5 + "end\n")))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%for", {
  _stash: true,
  special: function (t, k, form) {
    var ____r116 = unstash(Array.prototype.slice.call(arguments, 3));
    var __t2 = destash33(t, ____r116);
    var __k18 = destash33(k, ____r116);
    var __form5 = destash33(form, ____r116);
    var ____id35 = ____r116;
    var __async2 = has(____id35, "async");
    var __t3 = compile(__t2);
    var __k19 = compile(__k18);
    var __ind7 = indentation();
    var __body15 = compile_body(__form5);
    var __e86 = undefined;
    if (__async2) {
      __e86 = "async ";
    } else {
      __e86 = "";
    }
    var __a7 = __e86;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return __ind7 + ("for " + (__k19 + (" in next, " + (__t3 + (" do\n" + (__body15 + (__ind7 + "end\n")))))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind7 + (__a7 + ("for " + (__k19 + (" in " + (__t3 + (":\n" + __body15))))));
      } else {
        return __ind7 + ("for (" + (__k19 + (" in " + (__t3 + (") {\n" + (__body15 + (__ind7 + "}\n")))))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%with", {
  _stash: true,
  special: function (t, form) {
    var ____r118 = unstash(Array.prototype.slice.call(arguments, 2));
    var __t6 = destash33(t, ____r118);
    var __form7 = destash33(form, ____r118);
    var ____id37 = ____r118;
    var __async4 = has(____id37, "async");
    var __t7 = compile(__t6);
    var __ind9 = indentation();
    var __body17 = compile_body(__form7);
    var __e87 = undefined;
    if (__async4) {
      __e87 = "async ";
    } else {
      __e87 = "";
    }
    var __a9 = __e87;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind9 + (__a9 + ("with " + (__t7 + (":\n" + __body17))));
    } else {
      return "";
    }
  },
  stmt: true,
  tr: true
});
setenv("%block", {
  _stash: true,
  special: function (name, t, form) {
    var __t9 = compile(t);
    var __ind11 = indentation();
    var __body19 = compile_body(form);
    var __e88 = undefined;
    if (some63(__t9)) {
      __e88 = " ";
    } else {
      __e88 = "";
    }
    var __sep1 = __e88;
    var __e89 = undefined;
    if (some63(__t9)) {
      __e89 = "(";
    } else {
      __e89 = "";
    }
    var __lh2 = __e89;
    var __e90 = undefined;
    if (some63(__t9)) {
      __e90 = ")";
    } else {
      __e90 = "";
    }
    var __rh2 = __e90;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind11 + (name + (__sep1 + (__t9 + (":\n" + __body19))));
    } else {
      return __ind11 + (name + (__sep1 + (__lh2 + (__t9 + (__rh2 + (__sep1 + ("{\n" + (__body19 + (__ind11 + "}\n")))))))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%try", {
  _stash: true,
  special: function (form) {
    var __ind13 = indentation();
    var __body21 = compile_body(form);
    var __e91 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e91 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", false, ["%get", "e", 1], "e"]]];
    } else {
      __e91 = ["%return", ["%array", false, "e"]];
    }
    var __hf1 = __e91;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x194 = compile(__hf1, {
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
    var __h4 = ____x194;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind13 + ("try {\n" + (__body21 + (__ind13 + ("}\n" + (__ind13 + ("catch (e) {\n" + (__h4 + (__ind13 + "}\n"))))))));
    } else {
      return __ind13 + ("try:\n" + (__body21 + (__ind13 + ("except:\n" + __h4))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%delete", {
  _stash: true,
  special: function (place) {
    var __e92 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e92 = "del ";
    } else {
      __e92 = "delete ";
    }
    return indentation() + (__e92 + compile(place));
  },
  stmt: true
});
setenv("%break", {
  _stash: true,
  special: function () {
    return indentation() + "break";
  },
  stmt: true
});
setenv("%function", {
  _stash: true,
  special: function (args) {
    var ____r128 = unstash(Array.prototype.slice.call(arguments, 1));
    var __args121 = destash33(args, ____r128);
    var ____id39 = ____r128;
    var __body23 = cut(____id39, 0);
    return apply(compile_function, join([__args121], __body23, []));
  }
});
setenv("%global-function", {
  _stash: true,
  special: function (name, args) {
    var ____r130 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name7 = destash33(name, ____r130);
    var __args14 = destash33(args, ____r130);
    var ____id41 = ____r130;
    var __body25 = cut(____id41, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x205 = object([__args14]);
      ____x205.name = __name7;
      var ____x206 = object([]);
      ____x206.name = __name7;
      var __x204 = apply(compile_function, join(____x205, __body25, ____x206));
      return indentation() + __x204;
    } else {
      return compile(["%set", __name7, join(["%function", __args14], __body25)], {
        _stash: true,
        stmt: true
      });
    }
  },
  stmt: true,
  tr: true
});
setenv("%local-function", {
  _stash: true,
  special: function (name, args) {
    var ____r132 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name9 = destash33(name, ____r132);
    var __args16 = destash33(args, ____r132);
    var ____id43 = ____r132;
    var __body27 = cut(____id43, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x215 = object([__args16]);
      ____x215.name = __name9;
      ____x215.prefix = "local";
      var ____x216 = object([]);
      ____x216.name = __name9;
      ____x216.prefix = "local";
      var __x214 = apply(compile_function, join(____x215, __body27, ____x216));
      return indentation() + __x214;
    } else {
      return compile(["%local", __name9, join(["%function", __args16], __body27)], {
        _stash: true,
        stmt: true
      });
    }
  },
  stmt: true,
  tr: true
});
setenv("%return", {
  _stash: true,
  special: function (x) {
    var __e93 = undefined;
    if (nil63(x)) {
      __e93 = "return";
    } else {
      __e93 = "return " + compile(x);
    }
    var __x220 = __e93;
    return indentation() + __x220;
  },
  stmt: true
});
setenv("%new", {
  _stash: true,
  special: function (x) {
    return "new " + compile(x);
  }
});
setenv("%typeof", {
  _stash: true,
  special: function (x) {
    return "typeof(" + (compile(x) + ")");
  }
});
setenv("%error", {
  _stash: true,
  special: function (x) {
    var __e94 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e94 = "throw " + compile(["%new", ["Error", x]]);
    } else {
      var __e95 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e95 = "raise " + compile(["Exception", x]);
      } else {
        __e95 = "error(" + (compile(x) + ")");
      }
      __e94 = __e95;
    }
    var __e19 = __e94;
    return indentation() + __e19;
  },
  stmt: true
});
setenv("%throw", {
  _stash: true,
  special: function (x) {
    var __e96 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e96 = "throw " + compile(x);
    } else {
      var __e97 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e97 = "raise " + compile(x);
      } else {
        __e97 = "error(" + (compile(x) + ")");
      }
      __e96 = __e97;
    }
    var __e23 = __e96;
    return indentation() + __e23;
  },
  stmt: true
});
setenv("%local", {
  _stash: true,
  special: function (name, value) {
    if (nil63(value) && has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      value = "nil";
    }
    var __id45 = compile(name);
    var __value11 = compile(value);
    var __e98 = undefined;
    if (is63(value)) {
      __e98 = " = " + __value11;
    } else {
      __e98 = "";
    }
    var __rh4 = __e98;
    var __e99 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e99 = "var ";
    } else {
      var __e100 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua") {
        __e100 = "local ";
      } else {
        __e100 = "";
      }
      __e99 = __e100;
    }
    var __keyword1 = __e99;
    var __ind15 = indentation();
    return __ind15 + (__keyword1 + (__id45 + __rh4));
  },
  stmt: true
});
setenv("%set", {
  _stash: true,
  special: function (lh, rh) {
    var __lh4 = compile(lh);
    var __e101 = undefined;
    if (nil63(rh)) {
      __e101 = "nil";
    } else {
      __e101 = rh;
    }
    var __rh6 = compile(__e101);
    return indentation() + (__lh4 + (" = " + __rh6));
  },
  stmt: true
});
setenv("%get", {
  _stash: true,
  special: function (t, k) {
    var __t12 = compile(t);
    var __k121 = compile(k);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" && char(__t12, 0) === "{" || infix_operator63(t)) {
      __t12 = "(" + (__t12 + ")");
    }
    if (string_literal63(k) && (valid_id63(inner(k)) && !( has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py"))) {
      return __t12 + ("." + inner(k));
    } else {
      return __t12 + ("[" + (__k121 + "]"));
    }
  }
});
setenv("%idx", {
  _stash: true,
  special: function (t, k) {
    var __t14 = compile(t);
    var __k141 = compile(k, "raw");
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" && char(__t14, 0) === "{" || infix_operator63(t)) {
      __t14 = "(" + (__t14 + ")");
    }
    return __t14 + ("." + __k141);
  }
});
setenv("%array", {
  _stash: true,
  special: function () {
    var __forms4 = unstash(Array.prototype.slice.call(arguments, 0));
    var __e102 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e102 = "{";
    } else {
      __e102 = "[";
    }
    var __open1 = __e102;
    var __e103 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e103 = "}";
    } else {
      __e103 = "]";
    }
    var __close1 = __e103;
    var __s8 = "";
    var __c7 = "";
    var ____o11 = __forms4;
    var __k22 = undefined;
    for (__k22 in ____o11) {
      var __v10 = ____o11[__k22];
      var __e104 = undefined;
      if (numeric63(__k22)) {
        __e104 = parseInt(__k22);
      } else {
        __e104 = __k22;
      }
      var __k23 = __e104;
      if (number63(__k23)) {
        __s8 = __s8 + (__c7 + compile(__v10));
        __c7 = ", ";
      }
    }
    return __open1 + (__s8 + __close1);
  }
});
setenv("%object", {
  _stash: true,
  special: function () {
    var __forms6 = unstash(Array.prototype.slice.call(arguments, 0));
    var __s10 = "{";
    var __c9 = "";
    var __e105 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e105 = " = ";
    } else {
      __e105 = ": ";
    }
    var __sep3 = __e105;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x229 = indentation();
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    var __ind17 = ____x229;
    var __e106 = undefined;
    if (_35(__forms6) > 2) {
      __e106 = "\n" + __ind17;
    }
    var __pad1 = __e106;
    var __e107 = undefined;
    if (is63(__pad1)) {
      __e107 = "\n" + indentation();
    } else {
      __e107 = "";
    }
    var __end1 = __e107;
    __s10 = __s10 + either(__pad1, "");
    var ____o13 = pair(__forms6);
    var __k27 = undefined;
    for (__k27 in ____o13) {
      var __v13 = ____o13[__k27];
      var __e108 = undefined;
      if (numeric63(__k27)) {
        __e108 = parseInt(__k27);
      } else {
        __e108 = __k27;
      }
      var __k28 = __e108;
      if (number63(__k28)) {
        var ____id47 = __v13;
        var __k29 = has(____id47, 0);
        var __v14 = has(____id47, 1);
        if (! string63(__k29)) {
          throw new Error("Illegal key: " + str(__k29));
        }
        setenv("indent-level", {
          _stash: true,
          toplevel: true
        }).value = has(setenv("indent-level", {
          _stash: true,
          toplevel: true
        }), "value") + 1;
        var ____x230 = compile(__v14);
        setenv("indent-level", {
          _stash: true,
          toplevel: true
        }).value = has(setenv("indent-level", {
          _stash: true,
          toplevel: true
        }), "value") - 1;
        __s10 = __s10 + (__c9 + (key(__k29) + (__sep3 + ____x230)));
        __c9 = "," + either(__pad1, " ");
      }
    }
    return __s10 + (__end1 + "}");
  }
});
setenv("%list", {
  _stash: true,
  special: function (form, comps, cond) {
    var ____r152 = unstash(Array.prototype.slice.call(arguments, 3));
    var __form9 = destash33(form, ____r152);
    var __comps1 = destash33(comps, ____r152);
    var __cond6 = destash33(cond, ____r152);
    var ____id51 = ____r152;
    var __kind1 = has(____id51, "kind");
    var __s12 = compile(__form9);
    var __e109 = undefined;
    if (__kind1 === "object") {
      __e109 = ["{", "}"];
    } else {
      __e109 = ["[", "]"];
    }
    var ____id52 = __e109;
    var __lh6 = has(____id52, 0);
    var __rh8 = has(____id52, 1);
    if (!( __kind1 === "object")) {
      __s12 = "(" + (__s12 + ")");
    }
    var ____x236 = __comps1;
    var ____i26 = 0;
    while (____i26 < _35(____x236)) {
      var ____id53 = ____x236[____i26];
      var __k31 = has(____id53, 0);
      var __v16 = has(____id53, 1);
      __s12 = __s12 + (" for " + (compile(__k31) + (" in " + compile(__v16))));
      ____i26 = ____i26 + 1;
    }
    if (is63(__cond6)) {
      __s12 = __s12 + (" if " + compile(__cond6));
    }
    return __lh6 + (__s12 + __rh8);
  }
});
setenv("%literal", {
  _stash: true,
  special: function () {
    var __args18 = unstash(Array.prototype.slice.call(arguments, 0));
    return apply(cat, map(compile, __args18));
  }
});
setenv("global", {
  _stash: true,
  special: function (x) {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return indentation() + ("global " + (compile(x) + "\n"));
    } else {
      return "";
    }
  },
  stmt: true,
  tr: true
});
setenv("import", {
  _stash: true,
  special: function (name) {
    var ____r156 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name11 = destash33(name, ____r156);
    var ____id56 = ____r156;
    var __alias1 = cut(____id56, 0);
    var __ind19 = indentation();
    var __e110 = undefined;
    if (hd(__alias1) === "as") {
      __e110 = __alias1[1];
    } else {
      __e110 = hd(__alias1);
    }
    var __as1 = __e110;
    var __id57 = __as1 || __name11;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __s14 = __ind19 + ("import " + compile(__name11));
      if (__as1) {
        __s14 = __s14 + (" as " + compile(__id57));
      }
      return __s14;
    } else {
      return __ind19 + compile(["%local", __id57, ["require", escape(__name11)]]);
    }
  },
  stmt: true
});
setenv("from", {
  _stash: true,
  special: function (name) {
    var ____r160 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name13 = destash33(name, ____r160);
    var ____id60 = ____r160;
    var __imports1 = cut(____id60, 0);
    var __ind21 = indentation();
    var __id61 = __name13;
    var __r161 = undefined;
    __r161 = drop(__imports1);
    var __e111 = undefined;
    if (last(__imports1) === "as") {
      __e111 = drop(__imports1);
    } else {
      add(__imports1, __r161);
      __r161 = undefined;
      __e111 = __r161;
    }
    var __as3 = __r161;
    var __e112 = undefined;
    if (hd(__imports1) === "import") {
      __e112 = tl(__imports1);
    } else {
      __e112 = __imports1;
    }
    var __names3 = __e112;
    var __names4 = mapcat(function (x) {
      if (x === "*") {
        return x;
      } else {
        return compile(x);
      }
    }, __names3, ", ");
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __s16 = __ind21 + ("from " + (compile(__name13) + (" import " + __names4)));
      if (__as3) {
        __s16 = __s16 + (" as " + compile(__as3));
      }
      return __s16;
    } else {
      return "";
    }
  },
  stmt: true
});
setenv(",", {
  _stash: true,
  special: function () {
    var __args20 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args20)) {
      return ", ";
    } else {
      if (one63(__args20)) {
        return ", " + compile(hd(__args20));
      } else {
        return mapcat(compile, __args20, ", ");
      }
    }
  }
});
setenv(":", {
  _stash: true,
  special: function () {
    var __args22 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args22)) {
      return ":";
    } else {
      if (one63(__args22)) {
        return ":" + compile(hd(__args22));
      } else {
        return mapcat(compile, __args22, ":");
      }
    }
  }
});
setenv("%as", {
  _stash: true,
  special: function (form, id) {
    return compile(form) + (" as " + compile(id));
  }
});
setenv("yield", {
  _stash: true,
  special: function () {
    var __args24 = unstash(Array.prototype.slice.call(arguments, 0));
    return indentation() + ("yield " + mapcat(compile, __args24, ", "));
  },
  stmt: true
});
setenv("await", {
  _stash: true,
  special: function (x) {
    var __e113 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e113 = "";
    } else {
      __e113 = "await ";
    }
    var __a11 = __e113;
    return __a11 + compile(x);
  }
});
setenv("%b", {
  _stash: true,
  special: function (x) {
    return "b" + compile(x);
  }
});
setenv("%f", {
  _stash: true,
  special: function (x) {
    return "f" + compile(x);
  }
});
setenv("%r", {
  _stash: true,
  special: function (x) {
    return "r" + compile(x);
  }
});
setenv("@", {
  _stash: true,
  special: function (x) {
    return indentation() + ("@" + compile(x));
  },
  stmt: true
});
exports.run = run;
exports["eval"] = _eval;
exports.eval = _eval;
exports.expand = expand;
exports.compile = compile;
