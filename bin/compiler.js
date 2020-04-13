getenv = function (k, p) {
  if (string63(k)) {
    var __i = edge(environment);
    while (__i >= 0) {
      if (has63(environment[__i], k)) {
        var __b = environment[__i][k];
        var __e34 = undefined;
        if (p) {
          __e34 = has(__b, p);
        } else {
          __e34 = __b;
        }
        return __e34;
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
  return macro63(x) || special63(x) || symbol63(x) || variable63(x);
};
quoted = function (form) {
  if (string63(form)) {
    return escape(form);
  } else {
    if (atom63(form)) {
      return form;
    } else {
      return join(["list"], map(quoted, form));
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
  if (keys63(args)) {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      var __l = array(args);
      var ____o = args;
      var __k = undefined;
      for (__k in ____o) {
        var __v = ____o[__k];
        var __e36 = undefined;
        if (numeric63(__k)) {
          __e36 = parseInt(__k);
        } else {
          __e36 = __k;
        }
        var __k1 = __e36;
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
        var __e35 = undefined;
        if (numeric63(__k2)) {
          __e35 = parseInt(__k2);
        } else {
          __e35 = __k2;
        }
        var __k3 = __e35;
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
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
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
        return bind(["o", ___var, ["the", __val]], rh);
      } else {
        if (hd(lh) === "o") {
          var ____id1 = lh;
          var ___1 = has(____id1, 0);
          var ___var1 = has(____id1, 1);
          var __val1 = has(____id1, 2);
          return [___var1, ["if", ["nil?", rh], __val1, rh]];
        } else {
          var __id2 = unique("id");
          var __bs = [__id2, rh];
          var ____o2 = lh;
          var __k4 = undefined;
          for (__k4 in ____o2) {
            var __v2 = ____o2[__k4];
            var __e37 = undefined;
            if (numeric63(__k4)) {
              __e37 = parseInt(__k4);
            } else {
              __e37 = __k4;
            }
            var __k5 = __e37;
            var __e38 = undefined;
            if (__k5 === "rest") {
              __e38 = ["cut", __id2, _35(lh)];
            } else {
              __e38 = ["has", __id2, ["quote", bias(__k5)]];
            }
            var __x11 = __e38;
            if (is63(__k5)) {
              var __e39 = undefined;
              if (__v2 === true) {
                __e39 = __k5;
              } else {
                __e39 = __v2;
              }
              var __k6 = __e39;
              __bs = join(__bs, bind(__k6, __x11));
            }
          }
          return __bs;
        }
      }
    }
  }
};
setenv("arguments%", {_stash: true, macro: function (_from) {
  var ____x22 = object(["target"]);
  ____x22.js = [["idx", ["idx", ["idx", "Array", "prototype"], "slice"], "call"], "arguments", _from];
  ____x22.py = ["|list|", "|_args|"];
  ____x22.lua = ["list", "|...|"];
  return ____x22;
}});
bind42 = function (args, body) {
  var __args1 = {};
  var rest = function () {
    __args1.rest = true;
    var ____x31 = object(["target"]);
    ____x31.py = "|_keys|";
    return ["unstash", ["arguments%", _35(__args1)], ____x31];
  };
  if (atom63(args)) {
    return [__args1, join(["let", [args, rest()]], body)];
  } else {
    var __pre = [];
    var __bs1 = [];
    var __inits = [];
    var __r19 = unique("r");
    var ____o3 = args;
    var __k7 = undefined;
    for (__k7 in ____o3) {
      var __v3 = ____o3[__k7];
      var __e40 = undefined;
      if (numeric63(__k7)) {
        __e40 = parseInt(__k7);
      } else {
        __e40 = __k7;
      }
      var __k8 = __e40;
      if (number63(__k8)) {
        if (atom63(__v3)) {
          add(__args1, __v3);
        } else {
          if (hd(__v3) === "o") {
            var ____id3 = __v3;
            var ___2 = has(____id3, 0);
            var ___var2 = has(____id3, 1);
            var __val2 = has(____id3, 2);
            add(__args1, ___var2);
            add(__inits, ["if", ["nil?", ___var2], ["%set", ___var2, __val2]]);
          } else {
            if (hd(__v3) === "t") {
              var ____id4 = __v3;
              var ___3 = has(____id4, 0);
              var ___var3 = has(____id4, 1);
              var __val3 = has(____id4, 2);
              add(__args1, ___var3);
              add(__inits, ["if", ["nil?", ___var3], ["%set", ___var3, ["the", __val3]]]);
            } else {
              var __x42 = unique("x");
              add(__args1, __x42);
              __bs1 = join(__bs1, [__v3, __x42]);
            }
          }
        }
      }
    }
    if (keys63(args)) {
      __pre = join(__pre, [__r19, rest()]);
      var __n4 = _35(__args1);
      var __i5 = 0;
      while (__i5 < __n4) {
        var __v4 = __args1[__i5];
        __pre = join(__pre, [__v4, ["destash!", __v4, __r19]]);
        __i5 = __i5 + 1;
      }
      __bs1 = join(__bs1, [keys(args), __r19]);
    }
    return [__args1, join(["let", __pre], __inits, [join(["let", __bs1], body)])];
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
  return can_unquote63(depth) && ! atom63(x) && hd(x) === "unquote-splicing";
};
var expand_local = function (__x52) {
  var ____id5 = __x52;
  var __x53 = has(____id5, 0);
  var __name = has(____id5, 1);
  var __value = has(____id5, 2);
  setenv(__name, {_stash: true, variable: true});
  return ["%local", __name, macroexpand(__value)];
};
var expand_function = function (__x55) {
  var ____id6 = __x55;
  var __x56 = has(____id6, 0);
  var __args = has(____id6, 1);
  var __body = cut(____id6, 2);
  add(environment, {});
  var ____o4 = __args;
  var ____i6 = undefined;
  for (____i6 in ____o4) {
    var ____x57 = ____o4[____i6];
    var __e41 = undefined;
    if (numeric63(____i6)) {
      __e41 = parseInt(____i6);
    } else {
      __e41 = ____i6;
    }
    var ____i61 = __e41;
    setenv(____x57, {_stash: true, variable: true});
  }
  var ____x58 = join(["%function", __args], macroexpand(__body));
  drop(environment);
  return ____x58;
};
var expand_definition = function (__x60) {
  var ____id7 = __x60;
  var __x61 = has(____id7, 0);
  var __name1 = has(____id7, 1);
  var __args11 = has(____id7, 2);
  var __body1 = cut(____id7, 3);
  add(environment, {});
  var ____o5 = __args11;
  var ____i7 = undefined;
  for (____i7 in ____o5) {
    var ____x62 = ____o5[____i7];
    var __e42 = undefined;
    if (numeric63(____i7)) {
      __e42 = parseInt(____i7);
    } else {
      __e42 = ____i7;
    }
    var ____i71 = __e42;
    setenv(____x62, {_stash: true, variable: true});
  }
  var ____x63 = join([__x61, __name1, __args11], macroexpand(__body1));
  drop(environment);
  return ____x63;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x65) {
  var ____id8 = __x65;
  var __name2 = has(____id8, 0);
  var __body2 = cut(____id8, 1);
  return apply(macro_function(__name2), __body2);
};
real63 = function (x) {
  return number63(x) && ! nan63(x) && ! inf63(x);
};
valid_access63 = function (_str) {
  return _35(_str) > 2 && !( "." === char(_str, 0)) && !( "." === char(_str, edge(_str))) && ! search(_str, "..");
};
parse_access = function (_str) {
  return reduce(function (a, b) {
    var __n7 = number(a);
    if (is63(__n7)) {
      return ["at", b, __n7];
    } else {
      return ["idx", b, a];
    }
  }, reverse(split(_str, ".")));
};
parse_access63 = function (form) {
  return string63(form) && ! string_literal63(form) && ! id_literal63(form) && search(form, ".") && valid_access63(form);
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
        var __x68 = hd(form);
        if (__x68 === "%local") {
          return expand_local(form);
        } else {
          if (__x68 === "%function") {
            return expand_function(form);
          } else {
            if (__x68 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x68 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x68 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x68)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x68)) {
                      return macroexpand(join([parse_access(__x68)], tl(form)));
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
    var __e43 = undefined;
    if (numeric63(__k9)) {
      __e43 = parseInt(__k9);
    } else {
      __e43 = __k9;
    }
    var __k10 = __e43;
    if (! number63(__k10)) {
      var __e44 = undefined;
      if (quasisplice63(__v5, depth)) {
        __e44 = quasiexpand(__v5[1]);
      } else {
        __e44 = quasiexpand(__v5, depth);
      }
      var __v6 = __e44;
      last(__xs)[__k10] = __v6;
    }
  }
  var ____x72 = form;
  var ____i9 = 0;
  while (____i9 < _35(____x72)) {
    var __x73 = ____x72[____i9];
    if (quasisplice63(__x73, depth)) {
      var __x74 = quasiexpand(__x73[1]);
      add(__xs, __x74);
      add(__xs, ["list"]);
    } else {
      add(last(__xs), quasiexpand(__x73, depth));
    }
    ____i9 = ____i9 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || !( hd(x) === "list") || keys63(x);
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
expand_if = function (__x78) {
  var ____id9 = __x78;
  var __a = has(____id9, 0);
  var __b1 = has(____id9, 1);
  var __c = cut(____id9, 2);
  if (is63(__b1)) {
    return [join(["%if", __a, __b1], expand_if(__c))];
  } else {
    if (is63(__a)) {
      return [__a];
    }
  }
};
setenv("indent-level", {_stash: true, toplevel: true, value: 0});
setenv("indent-level", {_stash: true, symbol: ["get-value", ["quote", "indent-level"]]});
indentation = function () {
  var __s = "";
  var __i10 = 0;
  while (__i10 < has(setenv("indent-level", {_stash: true, toplevel: true}), "value")) {
    __s = __s + "  ";
    __i10 = __i10 + 1;
  }
  return __s;
};
var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "class": true, "const": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "eval": true, "finally": true, "for": true, "function": true, "if": true, "import": true, "in": true, "instanceof": true, "let": true, "return": true, "switch": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "load": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true, "from": true, "str": true, "print": true};
reserved63 = function (x) {
  return has63(reserved, x);
};
var valid_code63 = function (n) {
  return number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95;
};
compile_id = function (id, raw63) {
  if (code(id, 0) === 46) {
    return "." + compile_id(clip(id, 1), true);
  } else {
    var __e45 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e45 = "L_";
    } else {
      __e45 = "_";
    }
    var __x84 = __e45;
    var __e46 = undefined;
    if (number_code63(code(id, 0))) {
      __e46 = __x84;
    } else {
      __e46 = "";
    }
    var __id11 = __e46;
    var __i11 = 0;
    while (__i11 < _35(id)) {
      var __c1 = char(id, __i11);
      var __n9 = code(__c1);
      var __e47 = undefined;
      if (__c1 === "-" && !( id === "-")) {
        var __e50 = undefined;
        if (__i11 === 0) {
          __e50 = __x84;
        } else {
          __e50 = "_";
        }
        __e47 = __e50;
      } else {
        var __e48 = undefined;
        if (valid_code63(__n9)) {
          __e48 = __c1;
        } else {
          var __e49 = undefined;
          if (__i11 === 0) {
            __e49 = __x84 + __n9;
          } else {
            __e49 = __n9;
          }
          __e48 = __e49;
        }
        __e47 = __e48;
      }
      var __c11 = __e47;
      __id11 = __id11 + __c11;
      __i11 = __i11 + 1;
    }
    if (raw63) {
      return __id11;
    } else {
      if (reserved63(__id11)) {
        return __x84 + __id11;
      } else {
        return __id11;
      }
    }
  }
};
valid_id63 = function (x) {
  return some63(x) && x === compile_id(x);
};
var __names = {};
unique = function (x) {
  var __x85 = compile_id(x);
  if (has63(__names, __x85)) {
    var __i12 = __names[__x85];
    __names[__x85] = __names[__x85] + 1;
    return unique(__x85 + __i12);
  } else {
    __names[__x85] = 1;
    return "__" + __x85;
  }
};
key = function (k) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return k;
  } else {
    var __i13 = inner(k);
    if (valid_id63(__i13)) {
      return __i13;
    } else {
      if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
        return k;
      } else {
        return "[" + k + "]";
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
    var __e51 = undefined;
    if (numeric63(__k11)) {
      __e51 = parseInt(__k11);
    } else {
      __e51 = __k11;
    }
    var __k12 = __e51;
    var __x86 = f(__v7);
    if (is63(__x86)) {
      add(__o7, literal(__k12));
      add(__o7, __x86);
    }
  }
  return __o7;
};
var ____x88 = object([]);
var ____x89 = object([]);
____x89.js = "!";
____x89.lua = "not";
____x89.py = "not";
____x88["not"] = ____x89;
var ____x90 = object([]);
____x90.js = "!";
____x90.lua = "not";
____x90.py = "not";
____x88["%not"] = ____x90;
____x88["%unm"] = "-";
var ____x91 = object([]);
____x91["*"] = true;
____x91["/"] = true;
____x91["%"] = true;
____x91["%mul"] = "*";
____x91["%div"] = "/";
____x91["%idiv"] = "//";
____x91["%mod"] = "%";
var ____x92 = object([]);
var ____x93 = object([]);
____x93.js = "+";
____x93.lua = "..";
____x92.cat = ____x93;
var ____x94 = object([]);
____x94.js = "+";
____x94.lua = "..";
____x92["%cat"] = ____x94;
var ____x95 = object([]);
____x95["+"] = true;
____x95["-"] = true;
____x95["%add"] = "+";
____x95["%sub"] = "-";
var ____x96 = object([]);
____x96["<"] = true;
____x96[">"] = true;
____x96["<="] = true;
____x96[">="] = true;
____x96["%lt"] = "<";
____x96["%gt"] = ">";
____x96["%le"] = "<=";
____x96["%ge"] = ">=";
var ____x97 = object([]);
var ____x98 = object([]);
____x98.js = "===";
____x98.lua = "==";
____x98.py = "==";
____x97["="] = ____x98;
var ____x99 = object([]);
____x99.js = "===";
____x99.lua = "==";
____x99.py = "==";
____x97["%eq"] = ____x99;
var ____x100 = object([]);
var ____x101 = object([]);
____x101.js = "&&";
____x101.lua = "and";
____x101.py = "and";
____x100["and"] = ____x101;
var ____x102 = object([]);
____x102.js = "&&";
____x102.lua = "and";
____x102.py = "and";
____x100["%and"] = ____x102;
var ____x103 = object([]);
var ____x104 = object([]);
____x104.js = "||";
____x104.lua = "or";
____x104.py = "or";
____x103["or"] = ____x104;
var ____x105 = object([]);
____x105.js = "||";
____x105.lua = "or";
____x105.py = "or";
____x103["%or"] = ____x105;
var infix = [____x88, ____x91, ____x92, ____x95, ____x96, ____x97, ____x100, ____x103];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["not", "-", "%not", "%unm"]);
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
      var __e52 = undefined;
      if (numeric63(__k13)) {
        __e52 = parseInt(__k13);
      } else {
        __e52 = __k13;
      }
      var __k14 = __e52;
      if (has63(__v8, hd(form))) {
        return index(__k14);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x107 = has(level, op);
    if (__x107 === true) {
      return op;
    } else {
      if (string63(__x107)) {
        return __x107;
      } else {
        if (is63(__x107)) {
          return has(__x107, has(setenv("target", {_stash: true, toplevel: true}), "value"));
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
  var ____x108 = args;
  var ____i16 = 0;
  while (____i16 < _35(____x108)) {
    var __x109 = ____x108[____i16];
    __s1 = __s1 + __c2 + compile(__x109);
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && default63 && ! id_literal63(__x109)) {
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
      var __e53 = undefined;
      if (__c3 === "\n") {
        __e53 = "\\n";
      } else {
        var __e54 = undefined;
        if (__c3 === "\r") {
          __e54 = "\\r";
        } else {
          __e54 = __c3;
        }
        __e53 = __e54;
      }
      __s11 = __s11 + __e53;
      __i17 = __i17 + 1;
    }
    return __s11;
  }
};
var compile_nil = function () {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return "None";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      return "nil";
    } else {
      return "undefined";
    }
  }
};
var compile_boolean = function (x) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
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
var compile_atom = function (x) {
  if (x === "nil") {
    return compile_nil();
  } else {
    if (id_literal63(x)) {
      return inner(x);
    } else {
      if (string_literal63(x)) {
        return escape_newlines(x);
      } else {
        if (string63(x)) {
          return compile_id(x);
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
                    throw new Error("Cannot compile atom: " + _str(x));
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
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
      return ";\n";
    } else {
      return "\n";
    }
  }
};
var compile_special = function (form, stmt63) {
  var ____id10 = form;
  var __x110 = has(____id10, 0);
  var __args2 = cut(____id10, 1);
  var ____id111 = getenv(__x110);
  var __special = has(____id111, "special");
  var __stmt = has(____id111, "stmt");
  var __self_tr63 = has(____id111, "tr");
  var __e55 = undefined;
  if (stmt63 && ! __stmt) {
    __e55 = indentation();
  } else {
    __e55 = "";
  }
  var __p = __e55;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p + apply(__special, __args2) + __tr;
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
var method_call63 = function (form) {
  var __e56 = undefined;
  if (list63(form)) {
    __e56 = hd(form);
  } else {
    __e56 = form;
  }
  var __x111 = __e56;
  return string63(__x111) && _35(__x111, 1) > 1 && char(__x111, 0) === ".";
};
var compile_call = function (form) {
  var __f = hd(form);
  var __f1 = compile(__f);
  var __args3 = stash42(tl(form));
  var __e57 = undefined;
  if (method_call63(hd(__args3))) {
    __e57 = mapcat(compile, __args3, "");
  } else {
    __e57 = compile_args(__args3);
  }
  var __args4 = __e57;
  if (parenthesize_call63(__f)) {
    return "(" + __f1 + ")" + __args4;
  } else {
    return __f1 + __args4;
  }
};
var op_delims = function (parent, child) {
  var ____r65 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r65);
  var __child = destash33(child, ____r65);
  var ____id12 = ____r65;
  var __right = has(____id12, "right");
  var __e58 = undefined;
  if (__right) {
    __e58 = _6261;
  } else {
    __e58 = _62;
  }
  if (__e58(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id13 = form;
  var __op = has(____id13, 0);
  var ____id14 = cut(____id13, 1);
  var __a1 = has(____id14, 0);
  var __b2 = has(____id14, 1);
  var ____id15 = op_delims(form, __a1);
  var __ao = has(____id15, 0);
  var __ac = has(____id15, 1);
  var ____id16 = op_delims(form, __b2, {_stash: true, right: true});
  var __bo = has(____id16, 0);
  var __bc = has(____id16, 1);
  var __a2 = compile(__a1);
  var __b3 = compile(__b2);
  var __op1 = getop(__op);
  if (unary63(form)) {
    return __op1 + __ao + " " + __a2 + __ac;
  } else {
    return __ao + __a2 + __ac + " " + __op1 + " " + __bo + __b3 + __bc;
  }
};
compile_body = function (body) {
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
  var ____x114 = compile(body, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __s2 = ____x114;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && none63(__s2)) {
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
    var ____x115 = indentation() + "pass\n";
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
    return ____x115;
  } else {
    return __s2;
  }
};
compile_function = function (args, body) {
  var ____r68 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args5 = destash33(args, ____r68);
  var __body3 = destash33(body, ____r68);
  var ____id17 = ____r68;
  var __name3 = has(____id17, "name");
  var __prefix = has(____id17, "prefix");
  var __async = has(____id17, "async");
  var __e59 = undefined;
  if (__name3) {
    __e59 = compile(__name3);
  } else {
    __e59 = "";
  }
  var __id18 = __e59;
  var __e60 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && has63(__args5, "rest")) {
    __e60 = join(__args5, ["|...|"]);
  } else {
    var __e61 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && has63(__args5, "rest")) {
      __e61 = join(__args5, ["|*_args|", "|**_keys|"]);
    } else {
      __e61 = __args5;
    }
    __e60 = __e61;
  }
  var __args12 = __e60;
  var __args6 = compile_args(__args12, true);
  var __body4 = compile_body(__body3);
  var __ind = indentation();
  var __e62 = undefined;
  if (__prefix) {
    __e62 = __prefix + " ";
  } else {
    __e62 = "";
  }
  var __p1 = __e62;
  var __e63 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e63 = "";
  } else {
    __e63 = "end";
  }
  var __tr1 = __e63;
  var __e64 = undefined;
  if (__async && !( has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua")) {
    __e64 = "async ";
  } else {
    __e64 = "";
  }
  var __a3 = __e64;
  if (__name3) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __a3 + "function " + __id18 + __args6 + " {\n" + __body4 + __ind + "}" + __tr1;
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __a3 + "def " + __id18 + __args6 + ":\n" + __body4;
    } else {
      return __p1 + "function " + __id18 + __args6 + "\n" + __body4 + __ind + __tr1;
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
};
compile = function (form) {
  var ____r70 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form = destash33(form, ____r70);
  var ____id19 = ____r70;
  var __stmt1 = has(____id19, "stmt");
  if (nil63(__form)) {
    return "";
  } else {
    if (special_form63(__form)) {
      return compile_special(__form, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e65 = undefined;
      if (__stmt1) {
        __e65 = indentation();
      } else {
        __e65 = "";
      }
      var __ind1 = __e65;
      var __e66 = undefined;
      if (atom63(__form)) {
        __e66 = compile_atom(__form);
      } else {
        var __e67 = undefined;
        if (infix63(hd(__form))) {
          __e67 = compile_infix(__form);
        } else {
          __e67 = compile_call(__form);
        }
        __e66 = __e67;
      }
      var __form1 = __e66;
      return __ind1 + __form1 + __tr2;
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e = lower(form, __hoist, true, tail63);
  var __e68 = undefined;
  if (some63(__hoist) && is63(__e)) {
    __e68 = join(["do"], __hoist, [__e]);
  } else {
    var __e69 = undefined;
    if (is63(__e)) {
      __e69 = __e;
    } else {
      var __e70 = undefined;
      if (_35(__hoist) > 1) {
        __e70 = join(["do"], __hoist);
      } else {
        __e70 = hd(__hoist);
      }
      __e69 = __e70;
    }
    __e68 = __e69;
  }
  return either(__e68, ["do"]);
};
var lower_body = function (body, tail63) {
  return lower_statement(join(["do"], body), tail63);
};
var literal63 = function (form) {
  return atom63(form) || hd(form) === "%array" || hd(form) === "%object" || hd(form) === "%list" || hd(form) === ",";
};
var standalone63 = function (form) {
  return ! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && !( "get" === hd(form)) || id_literal63(form);
};
var lower_do = function (args, hoist, stmt63, tail63) {
  var ____x123 = almost(args);
  var ____i18 = 0;
  while (____i18 < _35(____x123)) {
    var __x124 = ____x123[____i18];
    var ____y = lower(__x124, hoist, stmt63);
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
    return ["return", __e2];
  } else {
    return __e2;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id20 = args;
  var __lh = has(____id20, 0);
  var __rh = has(____id20, 1);
  var __lh1 = lower(__lh, hoist);
  var __rh1 = lower(__rh, hoist);
  add(hoist, ["%set", __lh1, __rh1]);
  if (!( stmt63 && ! tail63)) {
    return __lh1;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id21 = args;
  var __cond = has(____id21, 0);
  var ___then = has(____id21, 1);
  var ___else = has(____id21, 2);
  if (stmt63) {
    var __e72 = undefined;
    if (is63(___else)) {
      __e72 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([___then], tail63)], __e72));
  } else {
    var __e3 = unique("e");
    add(hoist, ["%local", __e3, "nil"]);
    var __e71 = undefined;
    if (is63(___else)) {
      __e71 = [lower(["%set", __e3, ___else])];
    }
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, ___then])], __e71));
    return __e3;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id22 = args;
  var __a4 = has(____id22, 0);
  var __b4 = has(____id22, 1);
  var __hoist1 = [];
  var __b11 = lower(__b4, __hoist1);
  if (some63(__hoist1)) {
    var __id23 = unique("id");
    var __e73 = undefined;
    if (x === "and") {
      __e73 = ["%if", __id23, __b4, __id23];
    } else {
      __e73 = ["%if", __id23, __id23, __b4];
    }
    return lower(["do", ["%local", __id23, __a4], __e73], hoist);
  } else {
    return [x, lower(__a4, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id24 = args;
  var __c4 = has(____id24, 0);
  var __body5 = cut(____id24, 1);
  var __pre1 = [];
  var __c5 = lower(__c4, __pre1);
  var __e74 = undefined;
  if (none63(__pre1)) {
    __e74 = ["while", __c5, lower_body(__body5)];
  } else {
    __e74 = ["while", true, join(["do"], __pre1, [["%if", ["not", __c5], ["break"]], lower_body(__body5)])];
  }
  return add(hoist, __e74);
};
var lower_for = function (args, hoist) {
  var ____id25 = args;
  var __h = has(____id25, 0);
  var __k15 = has(____id25, 1);
  var __body6 = cut(____id25, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k15, lower_body(__body6)], keys(__body6)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id26 = args;
  var __h1 = has(____id26, 0);
  var __body7 = cut(____id26, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body7, tail63)], keys(__body7)));
  } else {
    var __e4 = unique("e");
    add(hoist, ["%local", __e4]);
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e4, join(["do"], __body7)])], keys(__body7)));
    return __e4;
  }
};
var lower_block = function (args, hoist, stmt63, tail63) {
  var ____id27 = args;
  var __name4 = has(____id27, 0);
  var __h2 = has(____id27, 1);
  var __body8 = cut(____id27, 2);
  return add(hoist, ["%block", __name4, lower(__h2, hoist), lower_body(__body8, tail63)]);
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __f11 = unique("f");
    return lower(["do", join(["%local-function", __f11], args), __f11], hoist);
  } else {
    var ____id28 = args;
    var __a5 = has(____id28, 0);
    var __body9 = cut(____id28, 1);
    return join(["%function", __a5, lower_body(__body9, true)], keys(__body9));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id29 = args;
  var __name5 = has(____id29, 0);
  var __args7 = has(____id29, 1);
  var __body10 = cut(____id29, 2);
  return add(hoist, join([kind, __name5, __args7, lower_body(__body10, true)], keys(__body10)));
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
  return in63(hd(form), ["<", "<=", "=", ">=", ">"]);
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e5 = [];
    var ____id30 = form;
    var __x161 = has(____id30, 0);
    var __args8 = cut(____id30, 1);
    reduce(function (a, b) {
      add(__e5, [__x161, a, b]);
      return a;
    }, __args8);
    return join(["and"], reverse(__e5));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form3 = lower_pairwise(form);
  var ____id31 = __form3;
  var __x164 = has(____id31, 0);
  var __args9 = cut(____id31, 1);
  return lower(reduce(function (a, b) {
    return [__x164, b, a];
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
          var ____id32 = form;
          var __x167 = has(____id32, 0);
          var __args10 = cut(____id32, 1);
          if (__x167 === "do") {
            return lower_do(__args10, hoist, stmt63, tail63);
          } else {
            if (__x167 === "%call") {
              return lower(__args10, hoist, stmt63, tail63);
            } else {
              if (__x167 === "%set") {
                return lower_set(__args10, hoist, stmt63, tail63);
              } else {
                if (__x167 === "%if") {
                  return lower_if(__args10, hoist, stmt63, tail63);
                } else {
                  if (__x167 === "%try") {
                    return lower_try(__args10, hoist, tail63);
                  } else {
                    if (__x167 === "while") {
                      return lower_while(__args10, hoist);
                    } else {
                      if (__x167 === "%for") {
                        return lower_for(__args10, hoist);
                      } else {
                        if (__x167 === "%with") {
                          return lower_with(__args10, hoist, stmt63, tail63);
                        } else {
                          if (__x167 === "%block") {
                            return lower_block(__args10, hoist, stmt63, tail63);
                          } else {
                            if (__x167 === "%function") {
                              return lower_function(__args10, hoist);
                            } else {
                              if (__x167 === "%local-function" || __x167 === "%global-function") {
                                return lower_definition(__x167, __args10, hoist);
                              } else {
                                if (in63(__x167, ["and", "or"])) {
                                  return lower_short(__x167, __args10, hoist);
                                } else {
                                  if (statement63(__x167)) {
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
};
expand = function (form) {
  return lower(macroexpand(form));
};
if (typeof(global) === "undefined") {
  var __e75 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e75 = window;
  } else {
    var __e76 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e76 = self;
    } else {
      __e76 = this;
    }
    __e75 = __e76;
  }
  global = __e75;
}
if (!( typeof(require) === "undefined")) {
  global.require = require;
  if (!( typeof(module) === "undefined")) {
    module.filename = require("path").resolve("repl");
    module.paths = require("module")._nodeModulePaths(module.filename);
  }
}
var run = function (code, context) {
  var __f2 = new Function("with(this) {\n" + code + "\n}");
  return __f2.call(either(context, global));
};
var eval_result = function (globals, locals) {
  return lumen_result;
};
_eval = function (form, globals, locals) {
  var __previous = has(setenv("target", {_stash: true, toplevel: true}), "value");
  setenv("target", {_stash: true, toplevel: true}).value = "js";
  var __code = compile(expand(["set", "lumen-result", form]));
  setenv("target", {_stash: true, toplevel: true}).value = __previous;
  run(__code, globals, locals);
  return eval_result(globals, locals);
};
immediate_call63 = function (x) {
  return ! atom63(x) && ! atom63(hd(x)) && hd(hd(x)) === "%function";
};
setenv("do", {_stash: true, special: function () {
  var __forms1 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s4 = "";
  var ____x172 = __forms1;
  var ____i20 = 0;
  while (____i20 < _35(____x172)) {
    var __x173 = ____x172[____i20];
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && immediate_call63(__x173) && "\n" === char(__s4, edge(__s4))) {
      __s4 = clip(__s4, 0, edge(__s4)) + ";\n";
    }
    __s4 = __s4 + compile(__x173, {_stash: true, stmt: true});
    if (! atom63(__x173)) {
      if (hd(__x173) === "return" || hd(__x173) === "break") {
        break;
      }
    }
    ____i20 = ____i20 + 1;
  }
  return __s4;
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var __cond2 = compile(cond);
  var __cons1 = compile_body(cons);
  var __e77 = undefined;
  if (alt) {
    __e77 = compile_body(alt);
  }
  var __alt1 = __e77;
  var __ind3 = indentation();
  var __s6 = "";
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __s6 = __s6 + __ind3 + "if (" + __cond2 + ") {\n" + __cons1 + __ind3 + "}";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __s6 = __s6 + __ind3 + "if " + __cond2 + ":\n" + __cons1;
    } else {
      __s6 = __s6 + __ind3 + "if " + __cond2 + " then\n" + __cons1;
    }
  }
  if (__alt1 && has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __s6 = __s6 + " else {\n" + __alt1 + __ind3 + "}";
  } else {
    if (__alt1 && has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __s6 = __s6 + __ind3 + "else:\n" + __alt1;
    } else {
      if (__alt1) {
        __s6 = __s6 + __ind3 + "else\n" + __alt1;
      }
    }
  }
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    return __s6 + __ind3 + "end\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
      return __s6 + "\n";
    } else {
      return __s6;
    }
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var __cond4 = compile(cond);
  var __body12 = compile_body(form);
  var __ind5 = indentation();
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind5 + "while (" + __cond4 + ") {\n" + __body12 + __ind5 + "}\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind5 + "while " + __cond4 + ":\n" + __body12;
    } else {
      return __ind5 + "while " + __cond4 + " do\n" + __body12 + __ind5 + "end\n";
    }
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var ____r106 = unstash(Array.prototype.slice.call(arguments, 3));
  var __t2 = destash33(t, ____r106);
  var __k18 = destash33(k, ____r106);
  var __form5 = destash33(form, ____r106);
  var ____id34 = ____r106;
  var __async2 = has(____id34, "async");
  var __t3 = compile(__t2);
  var __k19 = compile(__k18);
  var __ind7 = indentation();
  var __body14 = compile_body(__form5);
  var __e78 = undefined;
  if (__async2) {
    __e78 = "async ";
  } else {
    __e78 = "";
  }
  var __a7 = __e78;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    return __ind7 + "for " + __k19 + " in next, " + __t3 + " do\n" + __body14 + __ind7 + "end\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind7 + __a7 + "for " + __k19 + " in " + __t3 + ":\n" + __body14;
    } else {
      return __ind7 + "for (" + __k19 + " in " + __t3 + ") {\n" + __body14 + __ind7 + "}\n";
    }
  }
}, stmt: true, tr: true});
setenv("%with", {_stash: true, special: function (t, form) {
  var ____r108 = unstash(Array.prototype.slice.call(arguments, 2));
  var __t6 = destash33(t, ____r108);
  var __form7 = destash33(form, ____r108);
  var ____id36 = ____r108;
  var __async4 = has(____id36, "async");
  var __t7 = compile(__t6);
  var __ind9 = indentation();
  var __body16 = compile_body(__form7);
  var __e79 = undefined;
  if (__async4) {
    __e79 = "async ";
  } else {
    __e79 = "";
  }
  var __a9 = __e79;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return __ind9 + __a9 + "with " + __t7 + ":\n" + __body16;
  } else {
    return "";
  }
}, stmt: true, tr: true});
setenv("%block", {_stash: true, special: function (name, t, form) {
  var __t9 = compile(t);
  var __ind11 = indentation();
  var __body18 = compile_body(form);
  var __e80 = undefined;
  if (some63(__t9)) {
    __e80 = " ";
  } else {
    __e80 = "";
  }
  var __sep1 = __e80;
  return __ind11 + name + __sep1 + __t9 + ":\n" + __body18;
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var __ind13 = indentation();
  var __body20 = compile_body(form);
  var __e81 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e81 = ["do", ["import", "sys"], ["%local", "e", [["idx", "sys", "exc_info"]]], ["return", ["%array", false, ["get", "e", 1], "e"]]];
  } else {
    __e81 = ["return", ["%array", false, "e"]];
  }
  var __hf1 = __e81;
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
  var ____x195 = compile(__hf1, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __h4 = ____x195;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind13 + "try {\n" + __body20 + __ind13 + "}\n" + __ind13 + "catch (e) {\n" + __h4 + __ind13 + "}\n";
  } else {
    return __ind13 + "try:\n" + __body20 + __ind13 + "except:\n" + __h4;
  }
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  var __e82 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e82 = "del ";
  } else {
    __e82 = "delete ";
  }
  return indentation() + __e82 + compile(place);
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return indentation() + "break";
}, stmt: true});
setenv("%function", {_stash: true, special: function (args) {
  var ____r118 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args121 = destash33(args, ____r118);
  var ____id38 = ____r118;
  var __body22 = cut(____id38, 0);
  return apply(compile_function, join([__args121], __body22, []));
}});
setenv("%global-function", {_stash: true, special: function (name, args) {
  var ____r120 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name7 = destash33(name, ____r120);
  var __args14 = destash33(args, ____r120);
  var ____id40 = ____r120;
  var __body24 = cut(____id40, 0);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var ____x206 = object([__args14]);
    ____x206.name = __name7;
    var ____x207 = object([]);
    ____x207.name = __name7;
    var __x205 = apply(compile_function, join(____x206, __body24, ____x207));
    return indentation() + __x205;
  } else {
    return compile(["%set", __name7, join(["%function", __args14], __body24)], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args) {
  var ____r122 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name9 = destash33(name, ____r122);
  var __args16 = destash33(args, ____r122);
  var ____id42 = ____r122;
  var __body26 = cut(____id42, 0);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var ____x216 = object([__args16]);
    ____x216.name = __name9;
    ____x216.prefix = "local";
    var ____x217 = object([]);
    ____x217.name = __name9;
    ____x217.prefix = "local";
    var __x215 = apply(compile_function, join(____x216, __body26, ____x217));
    return indentation() + __x215;
  } else {
    return compile(["%local", __name9, join(["%function", __args16], __body26)], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var __e83 = undefined;
  if (nil63(x)) {
    __e83 = "return";
  } else {
    __e83 = "return " + compile(x);
  }
  var __x221 = __e83;
  return indentation() + __x221;
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return "new " + compile(x);
}});
setenv("typeof", {_stash: true, special: function (x) {
  return "typeof(" + compile(x) + ")";
}});
setenv("error", {_stash: true, special: function (x) {
  var __e84 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e84 = "throw " + compile(["new", ["Error", x]]);
  } else {
    var __e85 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e85 = "raise " + compile(["Exception", x]);
    } else {
      __e85 = "error(" + compile(x) + ")";
    }
    __e84 = __e85;
  }
  var __e17 = __e84;
  return indentation() + __e17;
}, stmt: true});
setenv("throw", {_stash: true, special: function (x) {
  var __e86 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e86 = "throw " + compile(x);
  } else {
    var __e87 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e87 = "raise " + compile(x);
    } else {
      __e87 = "error(" + compile(x) + ")";
    }
    __e86 = __e87;
  }
  var __e21 = __e86;
  return indentation() + __e21;
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  if (nil63(value) && has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    value = "nil";
  }
  var __id44 = compile(name);
  var __value11 = compile(value);
  var __e88 = undefined;
  if (is63(value)) {
    __e88 = " = " + __value11;
  } else {
    __e88 = "";
  }
  var __rh2 = __e88;
  var __e89 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e89 = "var ";
  } else {
    var __e90 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      __e90 = "local ";
    } else {
      __e90 = "";
    }
    __e89 = __e90;
  }
  var __keyword1 = __e89;
  var __ind15 = indentation();
  return __ind15 + __keyword1 + __id44 + __rh2;
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var __lh2 = compile(lh);
  var __e91 = undefined;
  if (nil63(rh)) {
    __e91 = "nil";
  } else {
    __e91 = rh;
  }
  var __rh4 = compile(__e91);
  return indentation() + __lh2 + " = " + __rh4;
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var __t12 = compile(t);
  var __k121 = compile(k);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && char(__t12, 0) === "{" || infix_operator63(t)) {
    __t12 = "(" + __t12 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k)) && !( has(setenv("target", {_stash: true, toplevel: true}), "value") === "py")) {
    return __t12 + "." + inner(k);
  } else {
    return __t12 + "[" + __k121 + "]";
  }
}});
setenv("idx", {_stash: true, special: function (t, k) {
  var __t14 = compile(t);
  var __k141 = compile(k);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && char(__t14, 0) === "{" || infix_operator63(t)) {
    __t14 = "(" + __t14 + ")";
  }
  return __t14 + "." + __k141;
}});
setenv("%array", {_stash: true, special: function () {
  var __forms3 = unstash(Array.prototype.slice.call(arguments, 0));
  var __e92 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e92 = "{";
  } else {
    __e92 = "[";
  }
  var __open1 = __e92;
  var __e93 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e93 = "}";
  } else {
    __e93 = "]";
  }
  var __close1 = __e93;
  var __s8 = "";
  var __c7 = "";
  var ____o11 = __forms3;
  var __k22 = undefined;
  for (__k22 in ____o11) {
    var __v10 = ____o11[__k22];
    var __e94 = undefined;
    if (numeric63(__k22)) {
      __e94 = parseInt(__k22);
    } else {
      __e94 = __k22;
    }
    var __k23 = __e94;
    if (number63(__k23)) {
      __s8 = __s8 + __c7 + compile(__v10);
      __c7 = ", ";
    }
  }
  return __open1 + __s8 + __close1;
}});
setenv("%object", {_stash: true, special: function () {
  var __forms5 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s10 = "{";
  var __c9 = "";
  var __e95 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e95 = " = ";
  } else {
    __e95 = ": ";
  }
  var __sep3 = __e95;
  var ____o13 = pair(__forms5);
  var __k27 = undefined;
  for (__k27 in ____o13) {
    var __v13 = ____o13[__k27];
    var __e96 = undefined;
    if (numeric63(__k27)) {
      __e96 = parseInt(__k27);
    } else {
      __e96 = __k27;
    }
    var __k28 = __e96;
    if (number63(__k28)) {
      var ____id46 = __v13;
      var __k29 = has(____id46, 0);
      var __v14 = has(____id46, 1);
      if (! string63(__k29)) {
        throw new Error("Illegal key: " + _str(__k29));
      }
      __s10 = __s10 + __c9 + key(__k29) + __sep3 + compile(__v14);
      __c9 = ", ";
    }
  }
  return __s10 + "}";
}});
setenv("%list", {_stash: true, special: function (form, comps, cond) {
  var __s12 = compile(form);
  var ____x229 = comps;
  var ____i26 = 0;
  while (____i26 < _35(____x229)) {
    var ____id48 = ____x229[____i26];
    var __k31 = has(____id48, 0);
    var __v16 = has(____id48, 1);
    __s12 = __s12 + " for " + compile(__k31) + " in " + compile(__v16);
    ____i26 = ____i26 + 1;
  }
  if (is63(cond)) {
    __s12 = __s12 + " if " + compile(cond);
  }
  return "[" + __s12 + "]";
}});
setenv("%literal", {_stash: true, special: function () {
  var __args18 = unstash(Array.prototype.slice.call(arguments, 0));
  return apply(cat, map(compile, __args18));
}});
setenv("global", {_stash: true, special: function (x) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return indentation() + "global " + compile(x) + "\n";
  } else {
    return "";
  }
}, stmt: true, tr: true});
setenv("import", {_stash: true, special: function (name) {
  var ____r146 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name11 = destash33(name, ____r146);
  var ____id51 = ____r146;
  var __alias1 = cut(____id51, 0);
  var __ind17 = indentation();
  var __e97 = undefined;
  if (hd(__alias1) === "as") {
    __e97 = __alias1[1];
  } else {
    __e97 = hd(__alias1);
  }
  var __as1 = __e97;
  var __id52 = __as1 || __name11;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __s14 = __ind17 + "import " + compile(__name11);
    if (__as1) {
      __s14 = __s14 + " as " + compile(__id52);
    }
    return __s14;
  } else {
    return __ind17 + compile(["%local", __id52, ["require", escape(__name11)]]);
  }
}, stmt: true});
setenv("from", {_stash: true, special: function (name) {
  var ____r149 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name13 = destash33(name, ____r149);
  var ____id55 = ____r149;
  var __imports1 = cut(____id55, 0);
  var __ind19 = indentation();
  var __id56 = __name13;
  var __e98 = undefined;
  if (hd(__imports1) === "import") {
    __e98 = tl(__imports1);
  } else {
    __e98 = __imports1;
  }
  var __names3 = __e98;
  var __names4 = mapcat(function (x) {
    if (x === "*") {
      return x;
    } else {
      return compile(x);
    }
  }, __names3, ", ");
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return __ind19 + "from " + compile(__name13) + " import " + __names4;
  } else {
    return "";
  }
}, stmt: true});
setenv(",", {_stash: true, special: function () {
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
}});
setenv(":", {_stash: true, special: function () {
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
}});
setenv("%as", {_stash: true, special: function (form, id) {
  return compile(form) + " as " + compile(id);
}});
setenv("%in", {_stash: true, special: function (x, l) {
  return compile(x) + " in " + compile(l);
}});
setenv("yield", {_stash: true, special: function () {
  var __args24 = unstash(Array.prototype.slice.call(arguments, 0));
  return indentation() + "yield " + mapcat(compile, __args24, ", ");
}, stmt: true});
setenv("await", {_stash: true, special: function (x) {
  var __e99 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e99 = "";
  } else {
    __e99 = "await ";
  }
  var __a11 = __e99;
  return __a11 + compile(x);
}});
setenv("%b", {_stash: true, special: function (x) {
  return "b" + compile(x);
}});
setenv("%f", {_stash: true, special: function (x) {
  return "f" + compile(x);
}});
setenv("%r", {_stash: true, special: function (x) {
  return "r" + compile(x);
}});
setenv("@", {_stash: true, special: function (x) {
  return indentation() + "@" + compile(x);
}, stmt: true});
exports.run = run;
exports["eval"] = _eval;
exports._eval = _eval;
exports.expand = expand;
exports.compile = compile;
