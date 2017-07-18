var getenv = function (k, p) {
  if (string63(k)) {
    var __i = edge(environment);
    while (__i >= 0) {
      if (has63(environment[__i], k)) {
        var __b = environment[__i][k];
        var __e25;
        if (p) {
          __e25 = has(__b, p);
        } else {
          __e25 = __b;
        }
        return __e25;
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
    var __l = ["%object", "\"_stash\"", true];
    var ____o = args;
    var __k = undefined;
    for (__k in ____o) {
      var __v = ____o[__k];
      var __e26;
      if (numeric63(__k)) {
        __e26 = parseInt(__k);
      } else {
        __e26 = __k;
      }
      var __k1 = __e26;
      if (! number63(__k1)) {
        add(__l, literal(__k1));
        add(__l, __v);
      }
    }
    return join(args, [__l]);
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
    var ____o1 = lh;
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
      var __e28;
      if (__k3 === "rest") {
        __e28 = ["cut", __id, _35(lh)];
      } else {
        __e28 = ["has", __id, ["quote", bias(__k3)]];
      }
      var __x5 = __e28;
      if (is63(__k3)) {
        var __e29;
        if (__v1 === true) {
          __e29 = __k3;
        } else {
          __e29 = __v1;
        }
        var __k4 = __e29;
        __bs = join(__bs, bind(__k4, __x5));
      }
    }
    return __bs;
  }
};
setenv("arguments%", {_stash: true, macro: function (_from) {
  var ____x16 = object(["target"]);
  ____x16.js = [["idx", ["idx", ["idx", "Array", "prototype"], "slice"], "call"], "arguments", _from];
  ____x16.py = ["|list|", "|_rest|"];
  ____x16.lua = ["list", "|...|"];
  return ____x16;
}});
bind42 = function (args, body) {
  var __args1 = {};
  var rest = function () {
    __args1.rest = true;
    return ["unstash", ["arguments%", _35(__args1)]];
  };
  if (atom63(args)) {
    return [__args1, join(["let", [args, rest()]], body)];
  } else {
    var __bs1 = [];
    var __r19 = unique("r");
    var ____o2 = args;
    var __k5 = undefined;
    for (__k5 in ____o2) {
      var __v2 = ____o2[__k5];
      var __e30;
      if (numeric63(__k5)) {
        __e30 = parseInt(__k5);
      } else {
        __e30 = __k5;
      }
      var __k6 = __e30;
      if (number63(__k6)) {
        if (atom63(__v2)) {
          add(__args1, __v2);
        } else {
          var __x28 = unique("x");
          add(__args1, __x28);
          __bs1 = join(__bs1, [__v2, __x28]);
        }
      }
    }
    if (keys63(args)) {
      __bs1 = join(__bs1, [__r19, rest()]);
      var __n3 = _35(__args1);
      var __i4 = 0;
      while (__i4 < __n3) {
        var __v3 = __args1[__i4];
        __bs1 = join(__bs1, [__v3, ["destash!", __v3, __r19]]);
        __i4 = __i4 + 1;
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
var expand_local = function (__x36) {
  var ____id1 = __x36;
  var __x37 = has(____id1, 0);
  var __name = has(____id1, 1);
  var __value = has(____id1, 2);
  setenv(__name, {_stash: true, variable: true});
  return ["%local", __name, macroexpand(__value)];
};
var expand_function = function (__x39) {
  var ____id2 = __x39;
  var __x40 = has(____id2, 0);
  var __args = has(____id2, 1);
  var __body = cut(____id2, 2);
  add(environment, {});
  var ____o3 = __args;
  var ____i5 = undefined;
  for (____i5 in ____o3) {
    var ____x41 = ____o3[____i5];
    var __e31;
    if (numeric63(____i5)) {
      __e31 = parseInt(____i5);
    } else {
      __e31 = ____i5;
    }
    var ____i51 = __e31;
    setenv(____x41, {_stash: true, variable: true});
  }
  var ____x42 = join(["%function", __args], macroexpand(__body));
  drop(environment);
  return ____x42;
};
var expand_definition = function (__x44) {
  var ____id3 = __x44;
  var __x45 = has(____id3, 0);
  var __name1 = has(____id3, 1);
  var __args11 = has(____id3, 2);
  var __body1 = cut(____id3, 3);
  add(environment, {});
  var ____o4 = __args11;
  var ____i6 = undefined;
  for (____i6 in ____o4) {
    var ____x46 = ____o4[____i6];
    var __e32;
    if (numeric63(____i6)) {
      __e32 = parseInt(____i6);
    } else {
      __e32 = ____i6;
    }
    var ____i61 = __e32;
    setenv(____x46, {_stash: true, variable: true});
  }
  var ____x47 = join([__x45, __name1, __args11], macroexpand(__body1));
  drop(environment);
  return ____x47;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x49) {
  var ____id4 = __x49;
  var __name2 = has(____id4, 0);
  var __body2 = cut(____id4, 1);
  return apply(macro_function(__name2), __body2);
};
macroexpand = function (form) {
  if (symbol63(form)) {
    return macroexpand(symbol_expansion(form));
  } else {
    if (atom63(form)) {
      return form;
    } else {
      var __x50 = hd(form);
      if (__x50 === "%local") {
        return expand_local(form);
      } else {
        if (__x50 === "%function") {
          return expand_function(form);
        } else {
          if (__x50 === "%global-function") {
            return expand_definition(form);
          } else {
            if (__x50 === "%local-function") {
              return expand_definition(form);
            } else {
              if (macro63(__x50)) {
                return expand_macro(form);
              } else {
                return map(macroexpand, form);
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
  var ____o5 = form;
  var __k7 = undefined;
  for (__k7 in ____o5) {
    var __v4 = ____o5[__k7];
    var __e33;
    if (numeric63(__k7)) {
      __e33 = parseInt(__k7);
    } else {
      __e33 = __k7;
    }
    var __k8 = __e33;
    if (! number63(__k8)) {
      var __e34;
      if (quasisplice63(__v4, depth)) {
        __e34 = quasiexpand(__v4[1]);
      } else {
        __e34 = quasiexpand(__v4, depth);
      }
      var __v5 = __e34;
      last(__xs)[__k8] = __v5;
    }
  }
  var ____x53 = form;
  var ____i8 = 0;
  while (____i8 < _35(____x53)) {
    var __x54 = ____x53[____i8];
    if (quasisplice63(__x54, depth)) {
      var __x55 = quasiexpand(__x54[1]);
      add(__xs, __x55);
      add(__xs, ["list"]);
    } else {
      add(last(__xs), quasiexpand(__x54, depth));
    }
    ____i8 = ____i8 + 1;
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
expand_if = function (__x59) {
  var ____id5 = __x59;
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
  var __i9 = 0;
  while (__i9 < has(setenv("indent-level", {_stash: true, toplevel: true}), "value")) {
    __s = __s + "  ";
    __i9 = __i9 + 1;
  }
  return __s;
};
var reserved = {"=": true, "==": true, "+": true, "-": true, "%": true, "*": true, "/": true, "<": true, ">": true, "<=": true, ">=": true, "break": true, "case": true, "catch": true, "class": true, "const": true, "continue": true, "debugger": true, "default": true, "delete": true, "do": true, "else": true, "eval": true, "finally": true, "for": true, "function": true, "if": true, "import": true, "in": true, "instanceof": true, "let": true, "new": true, "return": true, "switch": true, "throw": true, "try": true, "typeof": true, "var": true, "void": true, "with": true, "and": true, "end": true, "load": true, "repeat": true, "while": true, "false": true, "local": true, "nil": true, "then": true, "not": true, "true": true, "elseif": true, "or": true, "until": true, "from": true, "str": true, "print": true};
reserved63 = function (x) {
  return has63(reserved, x);
};
var valid_code63 = function (n) {
  return number_code63(n) || n > 64 && n < 91 || n > 96 && n < 123 || n === 95;
};
var id = function (id) {
  var __e35;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e35 = "L_";
  } else {
    __e35 = "_";
  }
  var __x65 = __e35;
  var __e36;
  if (number_code63(code(id, 0))) {
    __e36 = __x65;
  } else {
    __e36 = "";
  }
  var __id11 = __e36;
  var __i10 = 0;
  while (__i10 < _35(id)) {
    var __c1 = char(id, __i10);
    var __n7 = code(__c1);
    var __e37;
    if (__c1 === "-" && !( id === "-")) {
      var __e40;
      if (__i10 === 0) {
        __e40 = __x65;
      } else {
        __e40 = "_";
      }
      __e37 = __e40;
    } else {
      var __e38;
      if (valid_code63(__n7)) {
        __e38 = __c1;
      } else {
        var __e39;
        if (__i10 === 0) {
          __e39 = __x65 + __n7;
        } else {
          __e39 = __n7;
        }
        __e38 = __e39;
      }
      __e37 = __e38;
    }
    var __c11 = __e37;
    __id11 = __id11 + __c11;
    __i10 = __i10 + 1;
  }
  if (reserved63(__id11)) {
    return __x65 + __id11;
  } else {
    return __id11;
  }
};
valid_id63 = function (x) {
  return some63(x) && x === id(x);
};
var __names = {};
unique = function (x) {
  var __x66 = id(x);
  if (has63(__names, __x66)) {
    var __i11 = __names[__x66];
    __names[__x66] = __names[__x66] + 1;
    return unique(__x66 + __i11);
  } else {
    __names[__x66] = 1;
    return "__" + __x66;
  }
};
key = function (k) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return k;
  } else {
    var __i12 = inner(k);
    if (valid_id63(__i12)) {
      return __i12;
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
  var __o6 = [];
  var ____o7 = t;
  var __k9 = undefined;
  for (__k9 in ____o7) {
    var __v6 = ____o7[__k9];
    var __e41;
    if (numeric63(__k9)) {
      __e41 = parseInt(__k9);
    } else {
      __e41 = __k9;
    }
    var __k10 = __e41;
    var __x67 = f(__v6);
    if (is63(__x67)) {
      add(__o6, literal(__k10));
      add(__o6, __x67);
    }
  }
  return __o6;
};
var ____x69 = object([]);
var ____x70 = object([]);
____x70.js = "!";
____x70.lua = "not";
____x70.py = "not";
____x69["not"] = ____x70;
var ____x71 = object([]);
____x71["*"] = true;
____x71["/"] = true;
____x71["%"] = true;
var ____x72 = object([]);
var ____x73 = object([]);
____x73.js = "+";
____x73.lua = "..";
____x72.cat = ____x73;
var ____x74 = object([]);
____x74["+"] = true;
____x74["-"] = true;
var ____x75 = object([]);
____x75["<"] = true;
____x75[">"] = true;
____x75["<="] = true;
____x75[">="] = true;
var ____x76 = object([]);
var ____x77 = object([]);
____x77.js = "===";
____x77.lua = "==";
____x77.py = "==";
____x76["="] = ____x77;
var ____x78 = object([]);
var ____x79 = object([]);
____x79.js = "&&";
____x79.lua = "and";
____x79.py = "and";
____x78["and"] = ____x79;
var ____x80 = object([]);
var ____x81 = object([]);
____x81.js = "||";
____x81.lua = "or";
____x81.py = "or";
____x80["or"] = ____x81;
var infix = [____x69, ____x71, ____x72, ____x74, ____x75, ____x76, ____x78, ____x80];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["not", "-"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var ____o8 = infix;
    var __k11 = undefined;
    for (__k11 in ____o8) {
      var __v7 = ____o8[__k11];
      var __e42;
      if (numeric63(__k11)) {
        __e42 = parseInt(__k11);
      } else {
        __e42 = __k11;
      }
      var __k12 = __e42;
      if (has63(__v7, hd(form))) {
        return index(__k12);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x83 = has(level, op);
    if (__x83 === true) {
      return op;
    } else {
      if (is63(__x83)) {
        return has(__x83, has(setenv("target", {_stash: true, toplevel: true}), "value"));
      }
    }
  }, infix);
};
var infix63 = function (x) {
  return is63(getop(x));
};
infix_operator63 = function (x) {
  return obj63(x) && infix63(hd(x));
};
compile_args = function (args, default63) {
  var __s1 = "(";
  var __c2 = "";
  var ____x84 = args;
  var ____i15 = 0;
  while (____i15 < _35(____x84)) {
    var __x85 = ____x84[____i15];
    __s1 = __s1 + __c2 + compile(__x85);
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && default63 && ! id_literal63(__x85)) {
      __s1 = __s1 + "=None";
    }
    __c2 = ", ";
    ____i15 = ____i15 + 1;
  }
  return __s1 + ")";
};
var escape_newlines = function (s) {
  var __s11 = "";
  var __i16 = 0;
  while (__i16 < _35(s)) {
    var __c3 = char(s, __i16);
    var __e43;
    if (__c3 === "\n") {
      __e43 = "\\n";
    } else {
      var __e44;
      if (__c3 === "\r") {
        __e44 = "\\r";
      } else {
        __e44 = __c3;
      }
      __e43 = __e44;
    }
    __s11 = __s11 + __e43;
    __i16 = __i16 + 1;
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
  var __x86 = has(____id6, 0);
  var __args2 = cut(____id6, 1);
  var ____id7 = getenv(__x86);
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
  var ____r59 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r59);
  var __child = destash33(child, ____r59);
  var ____id8 = ____r59;
  var __right = has(____id8, "right");
  var __e45;
  if (__right) {
    __e45 = _6261;
  } else {
    __e45 = _62;
  }
  if (__e45(precedence(__child), precedence(__parent))) {
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
  var ____x89 = compile(body, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __s2 = ____x89;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && none63(__s2)) {
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
    var ____x90 = indentation() + "pass\n";
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
    return ____x90;
  } else {
    return __s2;
  }
};
compile_function = function (args, body) {
  var ____r62 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args4 = destash33(args, ____r62);
  var __body3 = destash33(body, ____r62);
  var ____id13 = ____r62;
  var __name3 = has(____id13, "name");
  var __prefix = has(____id13, "prefix");
  var __e46;
  if (__name3) {
    __e46 = compile(__name3);
  } else {
    __e46 = "";
  }
  var __id14 = __e46;
  var __e47;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && has63(__args4, "rest")) {
    __e47 = join(__args4, ["|...|"]);
  } else {
    var __e48;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && has63(__args4, "rest")) {
      __e48 = join(__args4, ["|*_rest|", "|**_params|"]);
    } else {
      __e48 = __args4;
    }
    __e47 = __e48;
  }
  var __args12 = __e47;
  var __args5 = compile_args(__args12, true);
  var __body4 = compile_body(__body3);
  var __ind = indentation();
  var __e49;
  if (__prefix) {
    __e49 = __prefix + " ";
  } else {
    __e49 = "";
  }
  var __p = __e49;
  var __e50;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e50 = "";
  } else {
    __e50 = "end";
  }
  var __tr1 = __e50;
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
  var ____r64 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form = destash33(form, ____r64);
  var ____id15 = ____r64;
  var __stmt1 = has(____id15, "stmt");
  if (nil63(__form)) {
    return "";
  } else {
    if (special_form63(__form)) {
      return compile_special(__form, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e51;
      if (__stmt1) {
        __e51 = indentation();
      } else {
        __e51 = "";
      }
      var __ind1 = __e51;
      var __e52;
      if (atom63(__form)) {
        __e52 = compile_atom(__form);
      } else {
        var __e53;
        if (infix63(hd(__form))) {
          __e53 = compile_infix(__form);
        } else {
          __e53 = compile_call(__form);
        }
        __e52 = __e53;
      }
      var __form1 = __e52;
      return __ind1 + __form1 + __tr2;
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e = lower(form, __hoist, true, tail63);
  var __e54;
  if (some63(__hoist) && is63(__e)) {
    __e54 = join(["do"], __hoist, [__e]);
  } else {
    var __e55;
    if (is63(__e)) {
      __e55 = __e;
    } else {
      var __e56;
      if (_35(__hoist) > 1) {
        __e56 = join(["do"], __hoist);
      } else {
        __e56 = hd(__hoist);
      }
      __e55 = __e56;
    }
    __e54 = __e55;
  }
  return either(__e54, ["do"]);
};
var lower_body = function (body, tail63) {
  return lower_statement(join(["do"], body), tail63);
};
var literal63 = function (form) {
  return atom63(form) || hd(form) === "%array" || hd(form) === "%object";
};
var standalone63 = function (form) {
  return ! atom63(form) && ! infix63(hd(form)) && ! literal63(form) && !( "get" === hd(form)) || id_literal63(form);
};
var lower_do = function (args, hoist, stmt63, tail63) {
  var ____x98 = almost(args);
  var ____i17 = 0;
  while (____i17 < _35(____x98)) {
    var __x99 = ____x98[____i17];
    var ____y = lower(__x99, hoist, stmt63);
    if (yes(____y)) {
      var __e1 = ____y;
      if (standalone63(__e1)) {
        add(hoist, __e1);
      }
    }
    ____i17 = ____i17 + 1;
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
    var __e58;
    if (is63(___else)) {
      __e58 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond, hoist), lower_body([___then], tail63)], __e58));
  } else {
    var __e3 = unique("e");
    add(hoist, ["%local", __e3]);
    var __e57;
    if (is63(___else)) {
      __e57 = [lower(["%set", __e3, ___else])];
    }
    add(hoist, join(["%if", lower(__cond, hoist), lower(["%set", __e3, ___then])], __e57));
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
    var __e59;
    if (x === "and") {
      __e59 = ["%if", __id19, __b4, __id19];
    } else {
      __e59 = ["%if", __id19, __id19, __b4];
    }
    return lower(["do", ["%local", __id19, __a3], __e59], hoist);
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
  var __e60;
  if (none63(__pre)) {
    __e60 = ["while", __c5, lower_body(__body5)];
  } else {
    __e60 = ["while", true, join(["do"], __pre, [["%if", ["not", __c5], ["break"]], lower_body(__body5)])];
  }
  return add(hoist, __e60);
};
var lower_for = function (args, hoist) {
  var ____id21 = args;
  var __t = has(____id21, 0);
  var __k13 = has(____id21, 1);
  var __body6 = cut(____id21, 2);
  return add(hoist, ["%for", lower(__t, hoist), __k13, lower_body(__body6)]);
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __f11 = unique("f");
    return lower(["do", join(["%local-function", __f11], args), __f11], hoist);
  } else {
    var ____id22 = args;
    var __a4 = has(____id22, 0);
    var __body7 = cut(____id22, 1);
    return ["%function", __a4, lower_body(__body7, true)];
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id23 = args;
  var __name4 = has(____id23, 0);
  var __args6 = has(____id23, 1);
  var __body8 = cut(____id23, 2);
  return add(hoist, [kind, __name4, __args6, lower_body(__body8, true)]);
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
    var __e4 = [];
    var ____id24 = form;
    var __x130 = has(____id24, 0);
    var __args7 = cut(____id24, 1);
    reduce(function (a, b) {
      add(__e4, [__x130, a, b]);
      return a;
    }, __args7);
    return join(["and"], reverse(__e4));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form3 = lower_pairwise(form);
  var ____id25 = __form3;
  var __x133 = has(____id25, 0);
  var __args8 = cut(____id25, 1);
  return lower(reduce(function (a, b) {
    return [__x133, b, a];
  }, reverse(__args8)), hoist);
};
var lower_special = function (form, hoist) {
  var __e5 = lower_call(form, hoist);
  if (__e5) {
    return add(hoist, __e5);
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
          var ____id26 = form;
          var __x136 = has(____id26, 0);
          var __args9 = cut(____id26, 1);
          if (__x136 === "do") {
            return lower_do(__args9, hoist, stmt63, tail63);
          } else {
            if (__x136 === "%set") {
              return lower_set(__args9, hoist, stmt63, tail63);
            } else {
              if (__x136 === "%if") {
                return lower_if(__args9, hoist, stmt63, tail63);
              } else {
                if (__x136 === "%try") {
                  return lower_try(__args9, hoist, tail63);
                } else {
                  if (__x136 === "while") {
                    return lower_while(__args9, hoist);
                  } else {
                    if (__x136 === "%for") {
                      return lower_for(__args9, hoist);
                    } else {
                      if (__x136 === "%function") {
                        return lower_function(__args9, hoist);
                      } else {
                        if (__x136 === "%local-function" || __x136 === "%global-function") {
                          return lower_definition(__x136, __args9, hoist);
                        } else {
                          if (in63(__x136, ["and", "or"])) {
                            return lower_short(__x136, __args9, hoist);
                          } else {
                            if (statement63(__x136)) {
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
  return obj63(x) && obj63(hd(x)) && hd(hd(x)) === "%function";
};
setenv("do", {_stash: true, special: function () {
  var __forms1 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s4 = "";
  var ____x141 = __forms1;
  var ____i19 = 0;
  while (____i19 < _35(____x141)) {
    var __x142 = ____x141[____i19];
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && immediate_call63(__x142) && "\n" === char(__s4, edge(__s4))) {
      __s4 = clip(__s4, 0, edge(__s4)) + ";\n";
    }
    __s4 = __s4 + compile(__x142, {_stash: true, stmt: true});
    if (! atom63(__x142)) {
      if (hd(__x142) === "return" || hd(__x142) === "break") {
        break;
      }
    }
    ____i19 = ____i19 + 1;
  }
  return __s4;
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var __cond2 = compile(cond);
  var __cons1 = compile_body(cons);
  var __e61;
  if (alt) {
    __e61 = compile_body(alt);
  }
  var __alt1 = __e61;
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
  var __body10 = compile_body(form);
  var __ind5 = indentation();
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind5 + "while (" + __cond4 + ") {\n" + __body10 + __ind5 + "}\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind5 + "while " + __cond4 + ":\n" + __body10;
    } else {
      return __ind5 + "while " + __cond4 + " do\n" + __body10 + __ind5 + "end\n";
    }
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var __t2 = compile(t);
  var __ind7 = indentation();
  var __body12 = compile_body(form);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    return __ind7 + "for " + k + " in next, " + __t2 + " do\n" + __body12 + __ind7 + "end\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind7 + "for " + k + " in indices(" + __t2 + "):\n" + __body12;
    } else {
      return __ind7 + "for (" + k + " in " + __t2 + ") {\n" + __body12 + __ind7 + "}\n";
    }
  }
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var __e9 = unique("e");
  var __ind9 = indentation();
  var __body14 = compile_body(form);
  var __e62;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e62 = ["do", ["import", "sys"], ["return", ["%array", false, __e9, [["idx", "sys", "exc_info"]]]]];
  } else {
    __e62 = ["return", ["%array", false, __e9]];
  }
  var __hf1 = __e62;
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
  var ____x160 = compile(__hf1, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __h1 = ____x160;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind9 + "try {\n" + __body14 + __ind9 + "}\n" + __ind9 + "catch (" + __e9 + ") {\n" + __h1 + __ind9 + "}\n";
  } else {
    return __ind9 + "try:\n" + __body14 + __ind9 + "except Exception as " + __e9 + ":\n" + __h1;
  }
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  var __e63;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e63 = "del ";
  } else {
    __e63 = "delete ";
  }
  return indentation() + __e63 + compile(place);
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return indentation() + "break";
}, stmt: true});
setenv("%function", {_stash: true, special: function (args, body) {
  return compile_function(args, body);
}});
setenv("%global-function", {_stash: true, special: function (name, args, body) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __x164 = compile_function(args, body, {_stash: true, name: name});
    return indentation() + __x164;
  } else {
    return compile(["%set", name, ["%function", args, body]], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args, body) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __x170 = compile_function(args, body, {_stash: true, name: name, prefix: "local"});
    return indentation() + __x170;
  } else {
    return compile(["%local", name, ["%function", args, body]], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var __e64;
  if (nil63(x)) {
    __e64 = "return";
  } else {
    __e64 = "return " + compile(x);
  }
  var __x174 = __e64;
  return indentation() + __x174;
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return "new " + compile(x);
}});
setenv("typeof", {_stash: true, special: function (x) {
  return "typeof(" + compile(x) + ")";
}});
setenv("error", {_stash: true, special: function (x) {
  var __e65;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e65 = "throw " + compile(["new", ["Error", x]]);
  } else {
    var __e66;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e66 = "raise " + compile(["Exception", x]);
    } else {
      __e66 = "error(" + compile(x) + ")";
    }
    __e65 = __e66;
  }
  var __e15 = __e65;
  return indentation() + __e15;
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  if (nil63(value) && has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return "";
  } else {
    var __id28 = compile(name);
    var __value11 = compile(value);
    var __e67;
    if (is63(value)) {
      __e67 = " = " + __value11;
    } else {
      __e67 = "";
    }
    var __rh2 = __e67;
    var __e68;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
      __e68 = "var ";
    } else {
      var __e69;
      if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
        __e69 = "local ";
      } else {
        __e69 = "";
      }
      __e68 = __e69;
    }
    var __keyword1 = __e68;
    var __ind11 = indentation();
    return __ind11 + __keyword1 + __id28 + __rh2;
  }
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var __lh2 = compile(lh);
  var __e70;
  if (nil63(rh)) {
    __e70 = "nil";
  } else {
    __e70 = rh;
  }
  var __rh4 = compile(__e70);
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
  var __k14 = compile(k);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && char(__t14, 0) === "{" || infix_operator63(t)) {
    __t14 = "(" + __t14 + ")";
  }
  return __t14 + "." + __k14;
}});
setenv("%array", {_stash: true, special: function () {
  var __forms3 = unstash(Array.prototype.slice.call(arguments, 0));
  var __e71;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e71 = "{";
  } else {
    __e71 = "[";
  }
  var __open1 = __e71;
  var __e72;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e72 = "}";
  } else {
    __e72 = "]";
  }
  var __close1 = __e72;
  var __s8 = "";
  var __c7 = "";
  var ____o10 = __forms3;
  var __k16 = undefined;
  for (__k16 in ____o10) {
    var __v9 = ____o10[__k16];
    var __e73;
    if (numeric63(__k16)) {
      __e73 = parseInt(__k16);
    } else {
      __e73 = __k16;
    }
    var __k17 = __e73;
    if (number63(__k17)) {
      __s8 = __s8 + __c7 + compile(__v9);
      __c7 = ", ";
    }
  }
  return __open1 + __s8 + __close1;
}});
setenv("%object", {_stash: true, special: function () {
  var __forms5 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s10 = "{";
  var __c9 = "";
  var __e74;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e74 = " = ";
  } else {
    __e74 = ": ";
  }
  var __sep1 = __e74;
  var ____o12 = pair(__forms5);
  var __k21 = undefined;
  for (__k21 in ____o12) {
    var __v12 = ____o12[__k21];
    var __e75;
    if (numeric63(__k21)) {
      __e75 = parseInt(__k21);
    } else {
      __e75 = __k21;
    }
    var __k22 = __e75;
    if (number63(__k22)) {
      var ____id30 = __v12;
      var __k23 = has(____id30, 0);
      var __v13 = has(____id30, 1);
      if (! string63(__k23)) {
        throw new Error("Illegal key: " + _str(__k23));
      }
      __s10 = __s10 + __c9 + key(__k23) + __sep1 + compile(__v13);
      __c9 = ", ";
    }
  }
  return __s10 + "}";
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
setenv("import", {_stash: true, special: function (x) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return indentation() + "import " + compile(x);
  } else {
    return indentation() + compile(["%local", x, ["require", escape(x)]]);
  }
}, stmt: true});
exports.run = run;
exports["eval"] = _eval;
exports._eval = _eval;
exports.expand = expand;
exports.compile = compile;
