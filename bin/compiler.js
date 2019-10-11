var getenv = function (k, p) {
  if (string63(k)) {
    var __i = edge(environment);
    while (__i >= 0) {
      if (has63(environment[__i], k)) {
        var __b = environment[__i][k];
        var __e26;
        if (p) {
          __e26 = has(__b, p);
        } else {
          __e26 = __b;
        }
        return __e26;
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
        var __e28;
        if (numeric63(__k)) {
          __e28 = parseInt(__k);
        } else {
          __e28 = __k;
        }
        var __k1 = __e28;
        if (! number63(__k1)) {
          add(__l, ["%literal", "|" + __k1 + "=|", __v]);
        }
      }
      return __l;
    } else {
      var __l1 = ["%object", "\"_stash\"", true];
      var ____o1 = args;
      var __k2 = undefined;
      for (__k2 in ____o1) {
        var __v1 = ____o1[__k2];
        var __e27;
        if (numeric63(__k2)) {
          __e27 = parseInt(__k2);
        } else {
          __e27 = __k2;
        }
        var __k3 = __e27;
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
    var __id = unique("id");
    var __bs = [__id, rh];
    var ____o2 = lh;
    var __k4 = undefined;
    for (__k4 in ____o2) {
      var __v2 = ____o2[__k4];
      var __e29;
      if (numeric63(__k4)) {
        __e29 = parseInt(__k4);
      } else {
        __e29 = __k4;
      }
      var __k5 = __e29;
      var __e30;
      if (__k5 === "rest") {
        __e30 = ["cut", __id, _35(lh)];
      } else {
        __e30 = ["has", __id, ["quote", bias(__k5)]];
      }
      var __x6 = __e30;
      if (is63(__k5)) {
        var __e31;
        if (__v2 === true) {
          __e31 = __k5;
        } else {
          __e31 = __v2;
        }
        var __k6 = __e31;
        __bs = join(__bs, bind(__k6, __x6));
      }
    }
    return __bs;
  }
};
setenv("arguments%", {_stash: true, macro: function (_from) {
  var ____x17 = object(["target"]);
  ____x17.js = [["idx", ["idx", ["idx", "Array", "prototype"], "slice"], "call"], "arguments", _from];
  ____x17.py = ["|list|", "|_args|"];
  ____x17.lua = ["list", "|...|"];
  return ____x17;
}});
bind42 = function (args, body) {
  var __args1 = {};
  var rest = function () {
    __args1.rest = true;
    var ____x26 = object(["target"]);
    ____x26.py = "|_keys|";
    return ["unstash", ["arguments%", _35(__args1)], ____x26];
  };
  if (atom63(args)) {
    return [__args1, join(["let", [args, rest()]], body)];
  } else {
    var __bs1 = [];
    var __r19 = unique("r");
    var ____o3 = args;
    var __k7 = undefined;
    for (__k7 in ____o3) {
      var __v3 = ____o3[__k7];
      var __e32;
      if (numeric63(__k7)) {
        __e32 = parseInt(__k7);
      } else {
        __e32 = __k7;
      }
      var __k8 = __e32;
      if (number63(__k8)) {
        if (atom63(__v3)) {
          add(__args1, __v3);
        } else {
          var __x30 = unique("x");
          add(__args1, __x30);
          __bs1 = join(__bs1, [__v3, __x30]);
        }
      }
    }
    if (keys63(args)) {
      __bs1 = join(__bs1, [__r19, rest()]);
      var __n4 = _35(__args1);
      var __i5 = 0;
      while (__i5 < __n4) {
        var __v4 = __args1[__i5];
        __bs1 = join(__bs1, [__v4, ["destash!", __v4, __r19]]);
        __i5 = __i5 + 1;
      }
      __bs1 = join(__bs1, [keys(args), __r19]);
    }
    return [__args1, join(["let", __bs1], body)];
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
var expand_local = function (__x38) {
  var ____id1 = __x38;
  var __x39 = has(____id1, 0);
  var __name = has(____id1, 1);
  var __value = has(____id1, 2);
  setenv(__name, {_stash: true, variable: true});
  return ["%local", __name, macroexpand(__value)];
};
var expand_function = function (__x41) {
  var ____id2 = __x41;
  var __x42 = has(____id2, 0);
  var __args = has(____id2, 1);
  var __body = cut(____id2, 2);
  add(environment, {});
  var ____o4 = __args;
  var ____i6 = undefined;
  for (____i6 in ____o4) {
    var ____x43 = ____o4[____i6];
    var __e33;
    if (numeric63(____i6)) {
      __e33 = parseInt(____i6);
    } else {
      __e33 = ____i6;
    }
    var ____i61 = __e33;
    setenv(____x43, {_stash: true, variable: true});
  }
  var ____x44 = join(["%function", __args], macroexpand(__body));
  drop(environment);
  return ____x44;
};
var expand_definition = function (__x46) {
  var ____id3 = __x46;
  var __x47 = has(____id3, 0);
  var __name1 = has(____id3, 1);
  var __args11 = has(____id3, 2);
  var __body1 = cut(____id3, 3);
  add(environment, {});
  var ____o5 = __args11;
  var ____i7 = undefined;
  for (____i7 in ____o5) {
    var ____x48 = ____o5[____i7];
    var __e34;
    if (numeric63(____i7)) {
      __e34 = parseInt(____i7);
    } else {
      __e34 = ____i7;
    }
    var ____i71 = __e34;
    setenv(____x48, {_stash: true, variable: true});
  }
  var ____x49 = join([__x47, __name1, __args11], macroexpand(__body1));
  drop(environment);
  return ____x49;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x51) {
  var ____id4 = __x51;
  var __name2 = has(____id4, 0);
  var __body2 = cut(____id4, 1);
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
        var __x54 = hd(form);
        if (__x54 === "%local") {
          return expand_local(form);
        } else {
          if (__x54 === "%function") {
            return expand_function(form);
          } else {
            if (__x54 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x54 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x54 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x54)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x54)) {
                      return macroexpand(join([parse_access(__x54)], tl(form)));
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
    var __e35;
    if (numeric63(__k9)) {
      __e35 = parseInt(__k9);
    } else {
      __e35 = __k9;
    }
    var __k10 = __e35;
    if (! number63(__k10)) {
      var __e36;
      if (quasisplice63(__v5, depth)) {
        __e36 = quasiexpand(__v5[1]);
      } else {
        __e36 = quasiexpand(__v5, depth);
      }
      var __v6 = __e36;
      last(__xs)[__k10] = __v6;
    }
  }
  var ____x58 = form;
  var ____i9 = 0;
  while (____i9 < _35(____x58)) {
    var __x59 = ____x58[____i9];
    if (quasisplice63(__x59, depth)) {
      var __x60 = quasiexpand(__x59[1]);
      add(__xs, __x60);
      add(__xs, ["list"]);
    } else {
      add(last(__xs), quasiexpand(__x59, depth));
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
expand_if = function (__x64) {
  var ____id5 = __x64;
  var __a = has(____id5, 0);
  var __b1 = has(____id5, 1);
  var __c = cut(____id5, 2);
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
    var __e37;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e37 = "L_";
    } else {
      __e37 = "_";
    }
    var __x70 = __e37;
    var __e38;
    if (number_code63(code(id, 0))) {
      __e38 = __x70;
    } else {
      __e38 = "";
    }
    var __id11 = __e38;
    var __i11 = 0;
    while (__i11 < _35(id)) {
      var __c1 = char(id, __i11);
      var __n9 = code(__c1);
      var __e39;
      if (__c1 === "-" && !( id === "-")) {
        var __e42;
        if (__i11 === 0) {
          __e42 = __x70;
        } else {
          __e42 = "_";
        }
        __e39 = __e42;
      } else {
        var __e40;
        if (valid_code63(__n9)) {
          __e40 = __c1;
        } else {
          var __e41;
          if (__i11 === 0) {
            __e41 = __x70 + __n9;
          } else {
            __e41 = __n9;
          }
          __e40 = __e41;
        }
        __e39 = __e40;
      }
      var __c11 = __e39;
      __id11 = __id11 + __c11;
      __i11 = __i11 + 1;
    }
    if (raw63) {
      return __id11;
    } else {
      if (reserved63(__id11)) {
        return __x70 + __id11;
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
  var __x71 = compile_id(x);
  if (has63(__names, __x71)) {
    var __i12 = __names[__x71];
    __names[__x71] = __names[__x71] + 1;
    return unique(__x71 + __i12);
  } else {
    __names[__x71] = 1;
    return "__" + __x71;
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
    var __e43;
    if (numeric63(__k11)) {
      __e43 = parseInt(__k11);
    } else {
      __e43 = __k11;
    }
    var __k12 = __e43;
    var __x72 = f(__v7);
    if (is63(__x72)) {
      add(__o7, literal(__k12));
      add(__o7, __x72);
    }
  }
  return __o7;
};
var ____x74 = object([]);
var ____x75 = object([]);
____x75.js = "!";
____x75.lua = "not";
____x75.py = "not";
____x74["not"] = ____x75;
var ____x76 = object([]);
____x76.js = "!";
____x76.lua = "not";
____x76.py = "not";
____x74["%not"] = ____x76;
____x74["%unm"] = "-";
var ____x77 = object([]);
____x77["*"] = true;
____x77["/"] = true;
____x77["%"] = true;
____x77["%mul"] = "*";
____x77["%div"] = "/";
____x77["%mod"] = "%";
var ____x78 = object([]);
var ____x79 = object([]);
____x79.js = "+";
____x79.lua = "..";
____x78.cat = ____x79;
var ____x80 = object([]);
____x80.js = "+";
____x80.lua = "..";
____x78["%cat"] = ____x80;
var ____x81 = object([]);
____x81["+"] = true;
____x81["-"] = true;
____x81["%add"] = "+";
____x81["%sub"] = "-";
var ____x82 = object([]);
____x82["<"] = true;
____x82[">"] = true;
____x82["<="] = true;
____x82[">="] = true;
____x82["%lt"] = "<";
____x82["%gt"] = ">";
____x82["%le"] = "<=";
____x82["%ge"] = ">=";
var ____x83 = object([]);
var ____x84 = object([]);
____x84.js = "===";
____x84.lua = "==";
____x84.py = "==";
____x83["="] = ____x84;
var ____x85 = object([]);
____x85.js = "===";
____x85.lua = "==";
____x85.py = "==";
____x83["%eq"] = ____x85;
var ____x86 = object([]);
var ____x87 = object([]);
____x87.js = "&&";
____x87.lua = "and";
____x87.py = "and";
____x86["and"] = ____x87;
var ____x88 = object([]);
____x88.js = "&&";
____x88.lua = "and";
____x88.py = "and";
____x86["%and"] = ____x88;
var ____x89 = object([]);
var ____x90 = object([]);
____x90.js = "||";
____x90.lua = "or";
____x90.py = "or";
____x89["or"] = ____x90;
var ____x91 = object([]);
____x91.js = "||";
____x91.lua = "or";
____x91.py = "or";
____x89["%or"] = ____x91;
var infix = [____x74, ____x77, ____x78, ____x81, ____x82, ____x83, ____x86, ____x89];
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
      var __e44;
      if (numeric63(__k13)) {
        __e44 = parseInt(__k13);
      } else {
        __e44 = __k13;
      }
      var __k14 = __e44;
      if (has63(__v8, hd(form))) {
        return index(__k14);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x93 = has(level, op);
    if (__x93 === true) {
      return op;
    } else {
      if (string63(__x93)) {
        return __x93;
      } else {
        if (is63(__x93)) {
          return has(__x93, has(setenv("target", {_stash: true, toplevel: true}), "value"));
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
  var ____x94 = args;
  var ____i16 = 0;
  while (____i16 < _35(____x94)) {
    var __x95 = ____x94[____i16];
    __s1 = __s1 + __c2 + compile(__x95);
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && default63 && ! id_literal63(__x95)) {
      __s1 = __s1 + "=None";
    }
    __c2 = ", ";
    ____i16 = ____i16 + 1;
  }
  return __s1 + ")";
};
var escape_newlines = function (s) {
  var __s11 = "";
  var __i17 = 0;
  while (__i17 < _35(s)) {
    var __c3 = char(s, __i17);
    var __e45;
    if (__c3 === "\n") {
      __e45 = "\\n";
    } else {
      var __e46;
      if (__c3 === "\r") {
        __e46 = "\\r";
      } else {
        __e46 = __c3;
      }
      __e45 = __e46;
    }
    __s11 = __s11 + __e45;
    __i17 = __i17 + 1;
  }
  return __s11;
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
  var ____id6 = form;
  var __x96 = has(____id6, 0);
  var __args2 = cut(____id6, 1);
  var ____id7 = getenv(__x96);
  var __special = has(____id7, "special");
  var __stmt = has(____id7, "stmt");
  var __self_tr63 = has(____id7, "tr");
  var __e47;
  if (stmt63 && ! __stmt) {
    __e47 = indentation();
  } else {
    __e47 = "";
  }
  var __p = __e47;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p + apply(__special, __args2) + __tr;
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
var method_call63 = function (form) {
  var __e48;
  if (list63(form)) {
    __e48 = hd(form);
  } else {
    __e48 = form;
  }
  var __x97 = __e48;
  return string63(__x97) && _35(__x97, 1) > 1 && char(__x97, 0) === ".";
};
var compile_call = function (form) {
  var __f = hd(form);
  var __f1 = compile(__f);
  var __args3 = stash42(tl(form));
  var __e49;
  if (method_call63(hd(__args3))) {
    __e49 = mapcat(compile, __args3, "");
  } else {
    __e49 = compile_args(__args3);
  }
  var __args4 = __e49;
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
  var ____id8 = ____r65;
  var __right = has(____id8, "right");
  var __e50;
  if (__right) {
    __e50 = _6261;
  } else {
    __e50 = _62;
  }
  if (__e50(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id9 = form;
  var __op = has(____id9, 0);
  var ____id10 = cut(____id9, 1);
  var __a1 = has(____id10, 0);
  var __b2 = has(____id10, 1);
  var ____id111 = op_delims(form, __a1);
  var __ao = has(____id111, 0);
  var __ac = has(____id111, 1);
  var ____id12 = op_delims(form, __b2, {_stash: true, right: true});
  var __bo = has(____id12, 0);
  var __bc = has(____id12, 1);
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
  var ____x100 = compile(body, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __s2 = ____x100;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && none63(__s2)) {
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
    var ____x101 = indentation() + "pass\n";
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
    return ____x101;
  } else {
    return __s2;
  }
};
compile_function = function (args, body) {
  var ____r68 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args5 = destash33(args, ____r68);
  var __body3 = destash33(body, ____r68);
  var ____id13 = ____r68;
  var __name3 = has(____id13, "name");
  var __prefix = has(____id13, "prefix");
  var __async = has(____id13, "async");
  var __e51;
  if (__name3) {
    __e51 = compile(__name3);
  } else {
    __e51 = "";
  }
  var __id14 = __e51;
  var __e52;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && has63(__args5, "rest")) {
    __e52 = join(__args5, ["|...|"]);
  } else {
    var __e53;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && has63(__args5, "rest")) {
      __e53 = join(__args5, ["|*_args|", "|**_keys|"]);
    } else {
      __e53 = __args5;
    }
    __e52 = __e53;
  }
  var __args12 = __e52;
  var __args6 = compile_args(__args12, true);
  var __body4 = compile_body(__body3);
  var __ind = indentation();
  var __e54;
  if (__prefix) {
    __e54 = __prefix + " ";
  } else {
    __e54 = "";
  }
  var __p1 = __e54;
  var __e55;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e55 = "";
  } else {
    __e55 = "end";
  }
  var __tr1 = __e55;
  var __e56;
  if (__async && !( has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua")) {
    __e56 = "async ";
  } else {
    __e56 = "";
  }
  var __a3 = __e56;
  if (__name3) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __a3 + "function " + __id14 + __args6 + " {\n" + __body4 + __ind + "}" + __tr1;
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __a3 + "def " + __id14 + __args6 + ":\n" + __body4;
    } else {
      return __p1 + "function " + __id14 + __args6 + "\n" + __body4 + __ind + __tr1;
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
};
compile = function (form) {
  var ____r70 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form = destash33(form, ____r70);
  var ____id15 = ____r70;
  var __stmt1 = has(____id15, "stmt");
  if (nil63(__form)) {
    return "";
  } else {
    if (special_form63(__form)) {
      return compile_special(__form, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e57;
      if (__stmt1) {
        __e57 = indentation();
      } else {
        __e57 = "";
      }
      var __ind1 = __e57;
      var __e58;
      if (atom63(__form)) {
        __e58 = compile_atom(__form);
      } else {
        var __e59;
        if (infix63(hd(__form))) {
          __e59 = compile_infix(__form);
        } else {
          __e59 = compile_call(__form);
        }
        __e58 = __e59;
      }
      var __form1 = __e58;
      return __ind1 + __form1 + __tr2;
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e = lower(form, __hoist, true, tail63);
  var __e60;
  if (some63(__hoist) && is63(__e)) {
    __e60 = join(["do"], __hoist, [__e]);
  } else {
    var __e61;
    if (is63(__e)) {
      __e61 = __e;
    } else {
      var __e62;
      if (_35(__hoist) > 1) {
        __e62 = join(["do"], __hoist);
      } else {
        __e62 = hd(__hoist);
      }
      __e61 = __e62;
    }
    __e60 = __e61;
  }
  return either(__e60, ["do"]);
};
var lower_body = function (body, tail63) {
  return lower_statement(join(["do"], body), tail63);
};
var literal63 = function (form) {
  return atom63(form) || hd(form) === "%array" || hd(form) === "%object" || hd(form) === "%list";
};
var standalone63 = function (form) {
  return ! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && !( "get" === hd(form)) || id_literal63(form);
};
var lower_do = function (args, hoist, stmt63, tail63) {
  var ____x109 = almost(args);
  var ____i18 = 0;
  while (____i18 < _35(____x109)) {
    var __x110 = ____x109[____i18];
    var ____y = lower(__x110, hoist, stmt63);
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
  var ____id16 = args;
  var __lh = has(____id16, 0);
  var __rh = has(____id16, 1);
  add(hoist, ["%set", lower(__lh, hoist), lower(__rh, hoist)]);
  if (!( stmt63 && ! tail63)) {
    return __lh;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id17 = args;
  var __cond = has(____id17, 0);
  var ___then = has(____id17, 1);
  var ___else = has(____id17, 2);
  if (stmt63) {
    var __e64;
    if (is63(___else)) {
      __e64 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([___then], tail63)], __e64));
  } else {
    var __e3 = unique("e");
    add(hoist, ["%local", __e3]);
    var __e63;
    if (is63(___else)) {
      __e63 = [lower(["%set", __e3, ___else])];
    }
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, ___then])], __e63));
    return __e3;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id18 = args;
  var __a4 = has(____id18, 0);
  var __b4 = has(____id18, 1);
  var __hoist1 = [];
  var __b11 = lower(__b4, __hoist1);
  if (some63(__hoist1)) {
    var __id19 = unique("id");
    var __e65;
    if (x === "and") {
      __e65 = ["%if", __id19, __b4, __id19];
    } else {
      __e65 = ["%if", __id19, __id19, __b4];
    }
    return lower(["do", ["%local", __id19, __a4], __e65], hoist);
  } else {
    return [x, lower(__a4, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id20 = args;
  var __c4 = has(____id20, 0);
  var __body5 = cut(____id20, 1);
  var __pre = [];
  var __c5 = lower(__c4, __pre);
  var __e66;
  if (none63(__pre)) {
    __e66 = ["while", __c5, lower_body(__body5)];
  } else {
    __e66 = ["while", true, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lower_body(__body5)])];
  }
  return add(hoist, __e66);
};
var lower_for = function (args, hoist) {
  var ____id21 = args;
  var __t = has(____id21, 0);
  var __k15 = has(____id21, 1);
  var __body6 = cut(____id21, 2);
  return add(hoist, ["%for", lower(__t, hoist), __k15, lower_body(__body6)]);
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id22 = args;
  var __t1 = has(____id22, 0);
  var __body7 = cut(____id22, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, ["%with", lower(__t1, hoist), lower_body(__body7, tail63)]);
  } else {
    var __e4 = unique("e");
    add(hoist, ["%local", __e4]);
    add(hoist, ["%with", lower(__t1, hoist), lower(["%set", __e4, join(["do"], __body7)])]);
    return __e4;
  }
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __f11 = unique("f");
    return lower(["do", join(["%local-function", __f11], args), __f11], hoist);
  } else {
    var ____id23 = args;
    var __a5 = has(____id23, 0);
    var __body8 = cut(____id23, 1);
    return join(["%function", __a5, lower_body(__body8, true)], keys(__body8));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id24 = args;
  var __name4 = has(____id24, 0);
  var __args7 = has(____id24, 1);
  var __body9 = cut(____id24, 2);
  return add(hoist, join([kind, __name4, __args7, lower_body(__body9, true)], keys(__body9)));
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
    var ____id25 = form;
    var __x146 = has(____id25, 0);
    var __args8 = cut(____id25, 1);
    reduce(function (a, b) {
      add(__e5, [__x146, a, b]);
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
  var ____id26 = __form3;
  var __x149 = has(____id26, 0);
  var __args9 = cut(____id26, 1);
  return lower(reduce(function (a, b) {
    return [__x149, b, a];
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
          var ____id27 = form;
          var __x152 = has(____id27, 0);
          var __args10 = cut(____id27, 1);
          if (__x152 === "do") {
            return lower_do(__args10, hoist, stmt63, tail63);
          } else {
            if (__x152 === "%call") {
              return lower(__args10, hoist, stmt63, tail63);
            } else {
              if (__x152 === "%set") {
                return lower_set(__args10, hoist, stmt63, tail63);
              } else {
                if (__x152 === "%if") {
                  return lower_if(__args10, hoist, stmt63, tail63);
                } else {
                  if (__x152 === "%try") {
                    return lower_try(__args10, hoist, tail63);
                  } else {
                    if (__x152 === "while") {
                      return lower_while(__args10, hoist);
                    } else {
                      if (__x152 === "%for") {
                        return lower_for(__args10, hoist);
                      } else {
                        if (__x152 === "%with") {
                          return lower_with(__args10, hoist, stmt63, tail63);
                        } else {
                          if (__x152 === "%function") {
                            return lower_function(__args10, hoist);
                          } else {
                            if (__x152 === "%local-function" || __x152 === "%global-function") {
                              return lower_definition(__x152, __args10, hoist);
                            } else {
                              if (in63(__x152, ["and", "or"])) {
                                return lower_short(__x152, __args10, hoist);
                              } else {
                                if (statement63(__x152)) {
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
};
expand = function (form) {
  return lower(macroexpand(form));
};
if (typeof(global) === "undefined") {
  var __e67;
  if (!( typeof(window) === "undefined")) {
    __e67 = window;
  } else {
    var __e68;
    if (!( typeof(self) === "undefined")) {
      __e68 = self;
    } else {
      __e68 = this;
    }
    __e67 = __e68;
  }
  global = __e67;
}
if (!( typeof(require) === "undefined")) {
  global.require = require;
}
var run = function (code, context) {
  var __f2 = new Function("with(this) {\n" + code + "\n}");
  __f2.call(context || global);
  return __f2;
};
var eval_result = function (globals) {
  return lumen_result;
};
_eval = function (form, globals) {
  var __previous = has(setenv("target", {_stash: true, toplevel: true}), "value");
  setenv("target", {_stash: true, toplevel: true}).value = "js";
  var __code = compile(expand(["set", "lumen-result", form]));
  setenv("target", {_stash: true, toplevel: true}).value = __previous;
  run(__code, globals);
  return eval_result(globals);
};
immediate_call63 = function (x) {
  return ! atom63(x) && ! atom63(hd(x)) && hd(hd(x)) === "%function";
};
setenv("do", {_stash: true, special: function () {
  var __forms1 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s4 = "";
  var ____x157 = __forms1;
  var ____i20 = 0;
  while (____i20 < _35(____x157)) {
    var __x158 = ____x157[____i20];
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && immediate_call63(__x158) && "\n" === char(__s4, edge(__s4))) {
      __s4 = clip(__s4, 0, edge(__s4)) + ";\n";
    }
    __s4 = __s4 + compile(__x158, {_stash: true, stmt: true});
    if (! atom63(__x158)) {
      if (hd(__x158) === "return" || hd(__x158) === "break") {
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
  var __e69;
  if (alt) {
    __e69 = compile_body(alt);
  }
  var __alt1 = __e69;
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
  var __body11 = compile_body(form);
  var __ind5 = indentation();
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind5 + "while (" + __cond4 + ") {\n" + __body11 + __ind5 + "}\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind5 + "while " + __cond4 + ":\n" + __body11;
    } else {
      return __ind5 + "while " + __cond4 + " do\n" + __body11 + __ind5 + "end\n";
    }
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var __t3 = compile(t);
  var __k17 = compile(k);
  var __ind7 = indentation();
  var __body13 = compile_body(form);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    return __ind7 + "for " + __k17 + " in next, " + __t3 + " do\n" + __body13 + __ind7 + "end\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind7 + "for " + __k17 + " in " + __t3 + ":\n" + __body13;
    } else {
      return __ind7 + "for (" + __k17 + " in " + __t3 + ") {\n" + __body13 + __ind7 + "}\n";
    }
  }
}, stmt: true, tr: true});
setenv("%with", {_stash: true, special: function (t, form) {
  var __t5 = compile(t);
  var __ind9 = indentation();
  var __body15 = compile_body(form);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return __ind9 + "with " + __t5 + ":\n" + __body15;
  } else {
    return "";
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var __ind11 = indentation();
  var __body17 = compile_body(form);
  var __e70;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e70 = ["do", ["import", "sys"], ["%local", "e", [["idx", "sys", "exc_info"]]], ["return", ["%array", false, ["get", "e", 1], "e"]]];
  } else {
    __e70 = ["return", ["%array", false, "e"]];
  }
  var __hf1 = __e70;
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
  var ____x180 = compile(__hf1, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __h1 = ____x180;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind11 + "try {\n" + __body17 + __ind11 + "}\n" + __ind11 + "catch (e) {\n" + __h1 + __ind11 + "}\n";
  } else {
    return __ind11 + "try:\n" + __body17 + __ind11 + "except:\n" + __h1;
  }
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  var __e71;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e71 = "del ";
  } else {
    __e71 = "delete ";
  }
  return indentation() + __e71 + compile(place);
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return indentation() + "break";
}, stmt: true});
setenv("%function", {_stash: true, special: function (args) {
  var ____r115 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args121 = destash33(args, ____r115);
  var ____id29 = ____r115;
  var __body19 = cut(____id29, 0);
  return apply(compile_function, join([__args121], __body19, []));
}});
setenv("%global-function", {_stash: true, special: function (name, args) {
  var ____r117 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name6 = destash33(name, ____r117);
  var __args14 = destash33(args, ____r117);
  var ____id31 = ____r117;
  var __body21 = cut(____id31, 0);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var ____x191 = object([__args14]);
    ____x191.name = __name6;
    var ____x192 = object([]);
    ____x192.name = __name6;
    var __x190 = apply(compile_function, join(____x191, __body21, ____x192));
    return indentation() + __x190;
  } else {
    return compile(["%set", __name6, join(["%function", __args14], __body21)], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args) {
  var ____r119 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name8 = destash33(name, ____r119);
  var __args16 = destash33(args, ____r119);
  var ____id33 = ____r119;
  var __body23 = cut(____id33, 0);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var ____x201 = object([__args16]);
    ____x201.name = __name8;
    ____x201.prefix = "local";
    var ____x202 = object([]);
    ____x202.name = __name8;
    ____x202.prefix = "local";
    var __x200 = apply(compile_function, join(____x201, __body23, ____x202));
    return indentation() + __x200;
  } else {
    return compile(["%local", __name8, join(["%function", __args16], __body23)], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var __e72;
  if (nil63(x)) {
    __e72 = "return";
  } else {
    __e72 = "return " + compile(x);
  }
  var __x206 = __e72;
  return indentation() + __x206;
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return "new " + compile(x);
}});
setenv("typeof", {_stash: true, special: function (x) {
  return "typeof(" + compile(x) + ")";
}});
setenv("error", {_stash: true, special: function (x) {
  var __e73;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e73 = "throw " + compile(["new", ["Error", x]]);
  } else {
    var __e74;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e74 = "raise " + compile(["Exception", x]);
    } else {
      __e74 = "error(" + compile(x) + ")";
    }
    __e73 = __e74;
  }
  var __e14 = __e73;
  return indentation() + __e14;
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  if (nil63(value) && has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    value = "nil";
  }
  var __id35 = compile(name);
  var __value11 = compile(value);
  var __e75;
  if (is63(value)) {
    __e75 = " = " + __value11;
  } else {
    __e75 = "";
  }
  var __rh2 = __e75;
  var __e76;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e76 = "var ";
  } else {
    var __e77;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      __e77 = "local ";
    } else {
      __e77 = "";
    }
    __e76 = __e77;
  }
  var __keyword1 = __e76;
  var __ind13 = indentation();
  return __ind13 + __keyword1 + __id35 + __rh2;
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var __lh2 = compile(lh);
  var __e78;
  if (nil63(rh)) {
    __e78 = "nil";
  } else {
    __e78 = rh;
  }
  var __rh4 = compile(__e78);
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
  var __e79;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e79 = "{";
  } else {
    __e79 = "[";
  }
  var __open1 = __e79;
  var __e80;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e80 = "}";
  } else {
    __e80 = "]";
  }
  var __close1 = __e80;
  var __s8 = "";
  var __c7 = "";
  var ____o11 = __forms3;
  var __k20 = undefined;
  for (__k20 in ____o11) {
    var __v10 = ____o11[__k20];
    var __e81;
    if (numeric63(__k20)) {
      __e81 = parseInt(__k20);
    } else {
      __e81 = __k20;
    }
    var __k21 = __e81;
    if (number63(__k21)) {
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
  var __e82;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e82 = " = ";
  } else {
    __e82 = ": ";
  }
  var __sep1 = __e82;
  var ____o13 = pair(__forms5);
  var __k25 = undefined;
  for (__k25 in ____o13) {
    var __v13 = ____o13[__k25];
    var __e83;
    if (numeric63(__k25)) {
      __e83 = parseInt(__k25);
    } else {
      __e83 = __k25;
    }
    var __k26 = __e83;
    if (number63(__k26)) {
      var ____id37 = __v13;
      var __k27 = has(____id37, 0);
      var __v14 = has(____id37, 1);
      if (! string63(__k27)) {
        throw new Error("Illegal key: " + _str(__k27));
      }
      __s10 = __s10 + __c9 + key(__k27) + __sep1 + compile(__v14);
      __c9 = ", ";
    }
  }
  return __s10 + "}";
}});
setenv("%list", {_stash: true, special: function (form, comps, cond) {
  var __s12 = compile(form);
  var ____x214 = comps;
  var ____i26 = 0;
  while (____i26 < _35(____x214)) {
    var ____id39 = ____x214[____i26];
    var __k29 = has(____id39, 0);
    var __v16 = has(____id39, 1);
    __s12 = __s12 + " for " + compile(__k29) + " in " + compile(__v16);
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
  var ____r141 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name10 = destash33(name, ____r141);
  var ____id42 = ____r141;
  var __alias1 = cut(____id42, 0);
  var __ind15 = indentation();
  var __e84;
  if (hd(__alias1) === "as") {
    __e84 = __alias1[1];
  } else {
    __e84 = hd(__alias1);
  }
  var __as1 = __e84;
  var __id43 = __as1 || __name10;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __s14 = __ind15 + "import " + compile(__name10);
    if (__as1) {
      __s14 = __s14 + " as " + compile(__id43);
    }
    return __s14;
  } else {
    return __ind15 + compile(["%local", __id43, ["require", escape(__name10)]]);
  }
}, stmt: true});
setenv("from", {_stash: true, special: function (name) {
  var ____r144 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name12 = destash33(name, ____r144);
  var ____id46 = ____r144;
  var __imports1 = cut(____id46, 0);
  var __ind17 = indentation();
  var __id47 = __name12;
  var __e85;
  if (hd(__imports1) === "import") {
    __e85 = tl(__imports1);
  } else {
    __e85 = __imports1;
  }
  var __names3 = __e85;
  var __names4 = mapcat(function (x) {
    if (x === "*") {
      return x;
    } else {
      return compile(x);
    }
  }, __names3, ", ");
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return __ind17 + "from " + compile(__name12) + " import " + __names4;
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
  return "await " + compile(x);
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
exports.run = run;
exports["eval"] = _eval;
exports._eval = _eval;
exports.expand = expand;
exports.compile = compile;
