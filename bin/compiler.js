var getenv = function (k, p) {
  if (string63(k)) {
    var __i = edge(environment);
    while (__i >= 0) {
      if (has63(environment[__i], k)) {
        var __b = environment[__i][k];
        var __e27;
        if (p) {
          __e27 = has(__b, p);
        } else {
          __e27 = __b;
        }
        return __e27;
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
        var __e29;
        if (numeric63(__k)) {
          __e29 = parseInt(__k);
        } else {
          __e29 = __k;
        }
        var __k1 = __e29;
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
        var __e28;
        if (numeric63(__k2)) {
          __e28 = parseInt(__k2);
        } else {
          __e28 = __k2;
        }
        var __k3 = __e28;
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
      var __e30;
      if (numeric63(__k4)) {
        __e30 = parseInt(__k4);
      } else {
        __e30 = __k4;
      }
      var __k5 = __e30;
      var __e31;
      if (__k5 === "rest") {
        __e31 = ["cut", __id, _35(lh)];
      } else {
        __e31 = ["has", __id, ["quote", bias(__k5)]];
      }
      var __x6 = __e31;
      if (is63(__k5)) {
        var __e32;
        if (__v2 === true) {
          __e32 = __k5;
        } else {
          __e32 = __v2;
        }
        var __k6 = __e32;
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
      var __e33;
      if (numeric63(__k7)) {
        __e33 = parseInt(__k7);
      } else {
        __e33 = __k7;
      }
      var __k8 = __e33;
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
    var __e34;
    if (numeric63(____i6)) {
      __e34 = parseInt(____i6);
    } else {
      __e34 = ____i6;
    }
    var ____i61 = __e34;
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
    var __e35;
    if (numeric63(____i7)) {
      __e35 = parseInt(____i7);
    } else {
      __e35 = ____i7;
    }
    var ____i71 = __e35;
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
};
var quasiquote_list = function (form, depth) {
  var __xs = [["list"]];
  var ____o6 = form;
  var __k9 = undefined;
  for (__k9 in ____o6) {
    var __v5 = ____o6[__k9];
    var __e36;
    if (numeric63(__k9)) {
      __e36 = parseInt(__k9);
    } else {
      __e36 = __k9;
    }
    var __k10 = __e36;
    if (! number63(__k10)) {
      var __e37;
      if (quasisplice63(__v5, depth)) {
        __e37 = quasiexpand(__v5[1]);
      } else {
        __e37 = quasiexpand(__v5, depth);
      }
      var __v6 = __e37;
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
var id = function (id) {
  var __e38;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e38 = "L_";
  } else {
    __e38 = "_";
  }
  var __x70 = __e38;
  var __e39;
  if (number_code63(code(id, 0))) {
    __e39 = __x70;
  } else {
    __e39 = "";
  }
  var __id11 = __e39;
  var __i11 = 0;
  while (__i11 < _35(id)) {
    var __c1 = char(id, __i11);
    var __n9 = code(__c1);
    var __e40;
    if (__c1 === "-" && !( id === "-")) {
      var __e43;
      if (__i11 === 0) {
        __e43 = __x70;
      } else {
        __e43 = "_";
      }
      __e40 = __e43;
    } else {
      var __e41;
      if (valid_code63(__n9)) {
        __e41 = __c1;
      } else {
        var __e42;
        if (__i11 === 0) {
          __e42 = __x70 + __n9;
        } else {
          __e42 = __n9;
        }
        __e41 = __e42;
      }
      __e40 = __e41;
    }
    var __c11 = __e40;
    __id11 = __id11 + __c11;
    __i11 = __i11 + 1;
  }
  if (reserved63(__id11)) {
    return __x70 + __id11;
  } else {
    return __id11;
  }
};
valid_id63 = function (x) {
  return some63(x) && x === id(x);
};
var __names = {};
unique = function (x) {
  var __x71 = id(x);
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
    var __e44;
    if (numeric63(__k11)) {
      __e44 = parseInt(__k11);
    } else {
      __e44 = __k11;
    }
    var __k12 = __e44;
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
____x76["*"] = true;
____x76["/"] = true;
____x76["%"] = true;
var ____x77 = object([]);
var ____x78 = object([]);
____x78.js = "+";
____x78.lua = "..";
____x77.cat = ____x78;
var ____x79 = object([]);
____x79["+"] = true;
____x79["-"] = true;
var ____x80 = object([]);
____x80["<"] = true;
____x80[">"] = true;
____x80["<="] = true;
____x80[">="] = true;
var ____x81 = object([]);
var ____x82 = object([]);
____x82.js = "===";
____x82.lua = "==";
____x82.py = "==";
____x81["="] = ____x82;
var ____x83 = object([]);
var ____x84 = object([]);
____x84.js = "&&";
____x84.lua = "and";
____x84.py = "and";
____x83["and"] = ____x84;
var ____x85 = object([]);
var ____x86 = object([]);
____x86.js = "||";
____x86.lua = "or";
____x86.py = "or";
____x85["or"] = ____x86;
var infix = [____x74, ____x76, ____x77, ____x79, ____x80, ____x81, ____x83, ____x85];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["not", "-"]);
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
      var __e45;
      if (numeric63(__k13)) {
        __e45 = parseInt(__k13);
      } else {
        __e45 = __k13;
      }
      var __k14 = __e45;
      if (has63(__v8, hd(form))) {
        return index(__k14);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x88 = has(level, op);
    if (__x88 === true) {
      return op;
    } else {
      if (is63(__x88)) {
        return has(__x88, has(setenv("target", {_stash: true, toplevel: true}), "value"));
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
  var ____x89 = args;
  var ____i16 = 0;
  while (____i16 < _35(____x89)) {
    var __x90 = ____x89[____i16];
    __s1 = __s1 + __c2 + compile(__x90);
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && default63 && ! id_literal63(__x90)) {
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
    var __e46;
    if (__c3 === "\n") {
      __e46 = "\\n";
    } else {
      var __e47;
      if (__c3 === "\r") {
        __e47 = "\\r";
      } else {
        __e47 = __c3;
      }
      __e46 = __e47;
    }
    __s11 = __s11 + __e46;
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
          return id(x);
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
  var __x91 = has(____id6, 0);
  var __args2 = cut(____id6, 1);
  var ____id7 = getenv(__x91);
  var __special = has(____id7, "special");
  var __stmt = has(____id7, "stmt");
  var __self_tr63 = has(____id7, "tr");
  var __tr = terminator(stmt63 && ! __self_tr63);
  return apply(__special, __args2) + __tr;
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
var compile_call = function (form) {
  var __f = hd(form);
  var __f1 = compile(__f);
  var __args3 = compile_args(stash42(tl(form)));
  if (parenthesize_call63(__f)) {
    return "(" + __f1 + ")" + __args3;
  } else {
    return __f1 + __args3;
  }
};
var op_delims = function (parent, child) {
  var ____r64 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r64);
  var __child = destash33(child, ____r64);
  var ____id8 = ____r64;
  var __right = has(____id8, "right");
  var __e48;
  if (__right) {
    __e48 = _6261;
  } else {
    __e48 = _62;
  }
  if (__e48(precedence(__child), precedence(__parent))) {
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
  var ____x94 = compile(body, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __s2 = ____x94;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && none63(__s2)) {
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
    var ____x95 = indentation() + "pass\n";
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
    return ____x95;
  } else {
    return __s2;
  }
};
compile_function = function (args, body) {
  var ____r67 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args4 = destash33(args, ____r67);
  var __body3 = destash33(body, ____r67);
  var ____id13 = ____r67;
  var __name3 = has(____id13, "name");
  var __prefix = has(____id13, "prefix");
  var __e49;
  if (__name3) {
    __e49 = compile(__name3);
  } else {
    __e49 = "";
  }
  var __id14 = __e49;
  var __e50;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && has63(__args4, "rest")) {
    __e50 = join(__args4, ["|...|"]);
  } else {
    var __e51;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && has63(__args4, "rest")) {
      __e51 = join(__args4, ["|*_args|", "|**_keys|"]);
    } else {
      __e51 = __args4;
    }
    __e50 = __e51;
  }
  var __args12 = __e50;
  var __args5 = compile_args(__args12, true);
  var __body4 = compile_body(__body3);
  var __ind = indentation();
  var __e52;
  if (__prefix) {
    __e52 = __prefix + " ";
  } else {
    __e52 = "";
  }
  var __p = __e52;
  var __e53;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e53 = "";
  } else {
    __e53 = "end";
  }
  var __tr1 = __e53;
  if (__name3) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return "function " + __id14 + __args5 + " {\n" + __body4 + __ind + "}" + __tr1;
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return "def " + __id14 + __args5 + ":\n" + __body4;
    } else {
      return __p + "function " + __id14 + __args5 + "\n" + __body4 + __ind + __tr1;
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
};
compile = function (form) {
  var ____r69 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form = destash33(form, ____r69);
  var ____id15 = ____r69;
  var __stmt1 = has(____id15, "stmt");
  if (nil63(__form)) {
    return "";
  } else {
    if (special_form63(__form)) {
      return compile_special(__form, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e54;
      if (__stmt1) {
        __e54 = indentation();
      } else {
        __e54 = "";
      }
      var __ind1 = __e54;
      var __e55;
      if (atom63(__form)) {
        __e55 = compile_atom(__form);
      } else {
        var __e56;
        if (infix63(hd(__form))) {
          __e56 = compile_infix(__form);
        } else {
          __e56 = compile_call(__form);
        }
        __e55 = __e56;
      }
      var __form1 = __e55;
      return __ind1 + __form1 + __tr2;
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e = lower(form, __hoist, true, tail63);
  var __e57;
  if (some63(__hoist) && is63(__e)) {
    __e57 = join(["do"], __hoist, [__e]);
  } else {
    var __e58;
    if (is63(__e)) {
      __e58 = __e;
    } else {
      var __e59;
      if (_35(__hoist) > 1) {
        __e59 = join(["do"], __hoist);
      } else {
        __e59 = hd(__hoist);
      }
      __e58 = __e59;
    }
    __e57 = __e58;
  }
  return either(__e57, ["do"]);
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
  var ____x103 = almost(args);
  var ____i18 = 0;
  while (____i18 < _35(____x103)) {
    var __x104 = ____x103[____i18];
    var ____y = lower(__x104, hoist, stmt63);
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
    var __e61;
    if (is63(___else)) {
      __e61 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([___then], tail63)], __e61));
  } else {
    var __e3 = unique("e");
    add(hoist, ["%local", __e3]);
    var __e60;
    if (is63(___else)) {
      __e60 = [lower(["%set", __e3, ___else])];
    }
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, ___then])], __e60));
    return __e3;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id18 = args;
  var __a3 = has(____id18, 0);
  var __b4 = has(____id18, 1);
  var __hoist1 = [];
  var __b11 = lower(__b4, __hoist1);
  if (some63(__hoist1)) {
    var __id19 = unique("id");
    var __e62;
    if (x === "and") {
      __e62 = ["%if", __id19, __b4, __id19];
    } else {
      __e62 = ["%if", __id19, __id19, __b4];
    }
    return lower(["do", ["%local", __id19, __a3], __e62], hoist);
  } else {
    return [x, lower(__a3, hoist), __b11];
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
  var __e63;
  if (none63(__pre)) {
    __e63 = ["while", __c5, lower_body(__body5)];
  } else {
    __e63 = ["while", true, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lower_body(__body5)])];
  }
  return add(hoist, __e63);
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
    var __a4 = has(____id23, 0);
    var __body8 = cut(____id23, 1);
    return ["%function", __a4, lower_body(__body8, true)];
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id24 = args;
  var __name4 = has(____id24, 0);
  var __args6 = has(____id24, 1);
  var __body9 = cut(____id24, 2);
  return add(hoist, [kind, __name4, __args6, lower_body(__body9, true)]);
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
    var __x140 = has(____id25, 0);
    var __args7 = cut(____id25, 1);
    reduce(function (a, b) {
      add(__e5, [__x140, a, b]);
      return a;
    }, __args7);
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
  var __x143 = has(____id26, 0);
  var __args8 = cut(____id26, 1);
  return lower(reduce(function (a, b) {
    return [__x143, b, a];
  }, reverse(__args8)), hoist);
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
          var __x146 = has(____id27, 0);
          var __args9 = cut(____id27, 1);
          if (__x146 === "do") {
            return lower_do(__args9, hoist, stmt63, tail63);
          } else {
            if (__x146 === "%set") {
              return lower_set(__args9, hoist, stmt63, tail63);
            } else {
              if (__x146 === "%if") {
                return lower_if(__args9, hoist, stmt63, tail63);
              } else {
                if (__x146 === "%try") {
                  return lower_try(__args9, hoist, tail63);
                } else {
                  if (__x146 === "while") {
                    return lower_while(__args9, hoist);
                  } else {
                    if (__x146 === "%for") {
                      return lower_for(__args9, hoist);
                    } else {
                      if (__x146 === "%with") {
                        return lower_with(__args9, hoist, stmt63, tail63);
                      } else {
                        if (__x146 === "%function") {
                          return lower_function(__args9, hoist);
                        } else {
                          if (__x146 === "%local-function" || __x146 === "%global-function") {
                            return lower_definition(__x146, __args9, hoist);
                          } else {
                            if (in63(__x146, ["and", "or"])) {
                              return lower_short(__x146, __args9, hoist);
                            } else {
                              if (statement63(__x146)) {
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
};
expand = function (form) {
  return lower(macroexpand(form));
};
global.require = require;
var run = eval;
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
  var ____x151 = __forms1;
  var ____i20 = 0;
  while (____i20 < _35(____x151)) {
    var __x152 = ____x151[____i20];
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && immediate_call63(__x152) && "\n" === char(__s4, edge(__s4))) {
      __s4 = clip(__s4, 0, edge(__s4)) + ";\n";
    }
    __s4 = __s4 + compile(__x152, {_stash: true, stmt: true});
    if (! atom63(__x152)) {
      if (hd(__x152) === "return" || hd(__x152) === "break") {
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
  var __e64;
  if (alt) {
    __e64 = compile_body(alt);
  }
  var __alt1 = __e64;
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
  var __ind7 = indentation();
  var __body13 = compile_body(form);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    return __ind7 + "for " + k + " in next, " + __t3 + " do\n" + __body13 + __ind7 + "end\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind7 + "for " + k + " in indices(" + __t3 + "):\n" + __body13;
    } else {
      return __ind7 + "for (" + k + " in " + __t3 + ") {\n" + __body13 + __ind7 + "}\n";
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
  var __e65;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e65 = ["do", ["import", "sys"], ["%local", "e", [["idx", "sys", "exc_info"]]], ["return", ["%array", false, ["get", "e", 1], "e"]]];
  } else {
    __e65 = ["return", ["%array", false, "e"]];
  }
  var __hf1 = __e65;
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
  var ____x174 = compile(__hf1, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __h1 = ____x174;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind11 + "try {\n" + __body17 + __ind11 + "}\n" + __ind11 + "catch (e) {\n" + __h1 + __ind11 + "}\n";
  } else {
    return __ind11 + "try:\n" + __body17 + __ind11 + "except:\n" + __h1;
  }
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  var __e66;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e66 = "del ";
  } else {
    __e66 = "delete ";
  }
  return indentation() + __e66 + compile(place);
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return indentation() + "break";
}, stmt: true});
setenv("%function", {_stash: true, special: function (args, body) {
  return compile_function(args, body);
}});
setenv("%global-function", {_stash: true, special: function (name, args, body) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __x178 = compile_function(args, body, {_stash: true, name: name});
    return indentation() + __x178;
  } else {
    return compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __x184 = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return indentation() + __x184;
  } else {
    return compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var __e67;
  if (nil63(x)) {
    __e67 = "return";
  } else {
    __e67 = "return " + compile(x);
  }
  var __x188 = __e67;
  return indentation() + __x188;
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return "new " + compile(x);
}});
setenv("typeof", {_stash: true, special: function (x) {
  return "typeof(" + compile(x) + ")";
}});
setenv("error", {_stash: true, special: function (x) {
  var __e68;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e68 = "throw " + compile(["new", ["Error", x]]);
  } else {
    var __e69;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e69 = "raise " + compile(["Exception", x]);
    } else {
      __e69 = "error(" + compile(x) + ")";
    }
    __e68 = __e69;
  }
  var __e14 = __e68;
  return indentation() + __e14;
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  if (nil63(value) && has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    value = "nil";
  }
  var __id29 = compile(name);
  var __value11 = compile(value);
  var __e70;
  if (is63(value)) {
    __e70 = " = " + __value11;
  } else {
    __e70 = "";
  }
  var __rh2 = __e70;
  var __e71;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e71 = "var ";
  } else {
    var __e72;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      __e72 = "local ";
    } else {
      __e72 = "";
    }
    __e71 = __e72;
  }
  var __keyword1 = __e71;
  var __ind13 = indentation();
  return __ind13 + __keyword1 + __id29 + __rh2;
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var __lh2 = compile(lh);
  var __e73;
  if (nil63(rh)) {
    __e73 = "nil";
  } else {
    __e73 = rh;
  }
  var __rh4 = compile(__e73);
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
  var __e74;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e74 = "{";
  } else {
    __e74 = "[";
  }
  var __open1 = __e74;
  var __e75;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e75 = "}";
  } else {
    __e75 = "]";
  }
  var __close1 = __e75;
  var __s8 = "";
  var __c7 = "";
  var ____o11 = __forms3;
  var __k18 = undefined;
  for (__k18 in ____o11) {
    var __v10 = ____o11[__k18];
    var __e76;
    if (numeric63(__k18)) {
      __e76 = parseInt(__k18);
    } else {
      __e76 = __k18;
    }
    var __k19 = __e76;
    if (number63(__k19)) {
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
  var __e77;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e77 = " = ";
  } else {
    __e77 = ": ";
  }
  var __sep1 = __e77;
  var ____o13 = pair(__forms5);
  var __k23 = undefined;
  for (__k23 in ____o13) {
    var __v13 = ____o13[__k23];
    var __e78;
    if (numeric63(__k23)) {
      __e78 = parseInt(__k23);
    } else {
      __e78 = __k23;
    }
    var __k24 = __e78;
    if (number63(__k24)) {
      var ____id31 = __v13;
      var __k25 = has(____id31, 0);
      var __v14 = has(____id31, 1);
      if (! string63(__k25)) {
        throw new Error("Illegal key: " + _str(__k25));
      }
      __s10 = __s10 + __c9 + key(__k25) + __sep1 + compile(__v14);
      __c9 = ", ";
    }
  }
  return __s10 + "}";
}});
setenv("%list", {_stash: true, special: function (form, comps, cond) {
  var __s12 = compile(form);
  var ____x196 = comps;
  var ____i26 = 0;
  while (____i26 < _35(____x196)) {
    var ____id33 = ____x196[____i26];
    var __k27 = has(____id33, 0);
    var __v16 = has(____id33, 1);
    var __e79;
    if (obj63(__k27)) {
      __e79 = mapcat(compile, __k27, ", ");
    } else {
      __e79 = compile(__k27);
    }
    var __k161 = __e79;
    __s12 = __s12 + " for " + __k161 + " in " + compile(__v16);
    ____i26 = ____i26 + 1;
  }
  if (is63(cond)) {
    __s12 = __s12 + " if " + compile(cond);
  }
  return "[" + __s12 + "]";
}});
setenv("%literal", {_stash: true, special: function () {
  var __args111 = unstash(Array.prototype.slice.call(arguments, 0));
  return apply(cat, map(compile, __args111));
}});
setenv("global", {_stash: true, special: function (x) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return indentation() + "global " + compile(x) + "\n";
  } else {
    return "";
  }
}, stmt: true, tr: true});
setenv("import", {_stash: true, special: function (name) {
  var ____r139 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name6 = destash33(name, ____r139);
  var ____id36 = ____r139;
  var __alias1 = cut(____id36, 0);
  var __ind15 = indentation();
  var __e80;
  if (hd(__alias1) === "as") {
    __e80 = __alias1[1];
  } else {
    __e80 = hd(__alias1);
  }
  var __as1 = __e80;
  var __id37 = __as1 || __name6;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __s14 = __ind15 + "import " + compile(__name6);
    if (__as1) {
      __s14 = __s14 + " as " + compile(__id37);
    }
    return __s14;
  } else {
    return __ind15 + compile(["%local", __id37, ["require", escape(__name6)]]);
  }
}, stmt: true});
setenv("from", {_stash: true, special: function (name) {
  var ____r142 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name8 = destash33(name, ____r142);
  var ____id40 = ____r142;
  var __imports1 = cut(____id40, 0);
  var __ind17 = indentation();
  var __id41 = __name8;
  var __e81;
  if (hd(__imports1) === "import") {
    __e81 = tl(__imports1);
  } else {
    __e81 = __imports1;
  }
  var __names3 = __e81;
  var __names4 = mapcat(function (x) {
    if (x === "*") {
      return x;
    } else {
      return compile(x);
    }
  }, __names3, ", ");
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return __ind17 + "from " + compile(__name8) + " import " + __names4;
  } else {
    return "";
  }
}, stmt: true});
setenv("\\,", {_stash: true, special: function () {
  var __args13 = unstash(Array.prototype.slice.call(arguments, 0));
  if (none63(__args13)) {
    return ",";
  } else {
    if (one63(__args13)) {
      return "," + compile(hd(__args13));
    } else {
      return mapcat(compile, __args13, ",");
    }
  }
}});
setenv(":", {_stash: true, special: function () {
  var __args15 = unstash(Array.prototype.slice.call(arguments, 0));
  if (none63(__args15)) {
    return ":";
  } else {
    if (one63(__args15)) {
      return ":" + compile(hd(__args15));
    } else {
      return mapcat(compile, __args15, ":");
    }
  }
}});
setenv("%as", {_stash: true, special: function (form, id) {
  return compile(form) + " as " + compile(id);
}});
exports.run = run;
exports["eval"] = _eval;
exports._eval = _eval;
exports.expand = expand;
exports.compile = compile;
