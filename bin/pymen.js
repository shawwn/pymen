if (typeof(pymen) === "undefined") {
  pymen = {};
}
environment = [{}];
nil63 = function (x) {
  return x === undefined || x === null;
};
is63 = function (x) {
  return ! nil63(x);
};
no = function (x) {
  return nil63(x) || x === false;
};
yes = function (x) {
  return ! no(x);
};
either = function (x, y) {
  if (is63(x)) {
    return x;
  } else {
    return y;
  }
};
has63 = function (l, k) {
  return l.hasOwnProperty(k);
};
has = function (l, k, _else) {
  if (has63(l, k)) {
    return l[k];
  } else {
    return _else;
  }
};
array63 = function (x) {
  return Array.isArray(x);
};
array = function (x) {
  if (array63(x)) {
    return x;
  } else {
    var __l = [];
    var ____o = x;
    var __k = undefined;
    for (__k in ____o) {
      var __v = ____o[__k];
      var __e58 = undefined;
      if (numeric63(__k)) {
        __e58 = parseInt(__k);
      } else {
        __e58 = __k;
      }
      var __k1 = __e58;
      if (number63(__k1)) {
        __l[__k1] = __v;
      }
    }
    return __l;
  }
};
object = function (x) {
  if (array63(x)) {
    var __l1 = {};
    var ____o1 = x;
    var __k2 = undefined;
    for (__k2 in ____o1) {
      var __v1 = ____o1[__k2];
      var __e59 = undefined;
      if (numeric63(__k2)) {
        __e59 = parseInt(__k2);
      } else {
        __e59 = __k2;
      }
      var __k3 = __e59;
      __l1[__k3] = __v1;
    }
    return __l1;
  } else {
    return x;
  }
};
length = function (x, upto) {
  var __n2 = -1;
  var __upto = either(upto, inf);
  var ____o2 = x;
  var __k4 = undefined;
  for (__k4 in ____o2) {
    var __v2 = ____o2[__k4];
    var __e60 = undefined;
    if (numeric63(__k4)) {
      __e60 = parseInt(__k4);
    } else {
      __e60 = __k4;
    }
    var __k5 = __e60;
    if (number63(__k5)) {
      if (__k5 > __n2) {
        __n2 = __k5;
        if (__n2 >= __upto) {
          break;
        }
      }
    }
  }
  __n2 = __n2 + 1;
  return __n2;
};
_35 = function (x, upto) {
  if (string63(x) || array63(x)) {
    return x.length;
  } else {
    return length(x, upto);
  }
};
none63 = function (x) {
  return _35(x, 0) === 0;
};
some63 = function (x) {
  return _35(x, 0) > 0;
};
one63 = function (x) {
  return _35(x, 1) === 1;
};
two63 = function (x) {
  return _35(x, 2) === 2;
};
hd = function (l) {
  return l[0];
};
type = function (x) {
  return typeof(x);
};
string63 = function (x) {
  return type(x) === "string";
};
number63 = function (x) {
  return type(x) === "number";
};
boolean63 = function (x) {
  return type(x) === "boolean";
};
function63 = function (x) {
  return type(x) === "function";
};
obj63 = function (x) {
  return is63(x) && type(x) === "object";
};
list63 = function (x) {
  return obj63(x) || array63(x);
};
atom63 = function (x) {
  return nil63(x) || (string63(x) || (number63(x) || boolean63(x)));
};
hd63 = function (l, x) {
  if (function63(x)) {
    return x(hd(l));
  } else {
    if (nil63(x)) {
      return some63(l);
    } else {
      return x === hd(l);
    }
  }
};
nan = 0 / 0;
inf = 1 / 0;
_inf = - inf;
nan63 = function (n) {
  return !( n === n);
};
inf63 = function (n) {
  return n === inf || n === _inf;
};
clip = function (s, from, upto) {
  return s.substring(from, upto);
};
dupe = function (x) {
  if (array63(x)) {
    return [];
  } else {
    return {};
  }
};
cut = function (x, from, upto) {
  var __l2 = dupe(x);
  var __j = 0;
  var __e61 = undefined;
  if (nil63(from) || from < 0) {
    __e61 = 0;
  } else {
    __e61 = from;
  }
  var __i3 = __e61;
  var __n4 = _35(x);
  var __e62 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e62 = __n4;
  } else {
    __e62 = upto;
  }
  var __upto1 = __e62;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e63 = undefined;
    if (numeric63(__k6)) {
      __e63 = parseInt(__k6);
    } else {
      __e63 = __k6;
    }
    var __k7 = __e63;
    if (! number63(__k7)) {
      __l2[__k7] = __v3;
    }
  }
  return __l2;
};
props = function (x) {
  var __t = {};
  var ____o4 = x;
  var __k8 = undefined;
  for (__k8 in ____o4) {
    var __v4 = ____o4[__k8];
    var __e64 = undefined;
    if (numeric63(__k8)) {
      __e64 = parseInt(__k8);
    } else {
      __e64 = __k8;
    }
    var __k9 = __e64;
    if (! number63(__k9)) {
      __t[__k9] = __v4;
    }
  }
  return __t;
};
values = function (x) {
  if (array63(x)) {
    return x;
  } else {
    var __t1 = {};
    var ____o5 = x;
    var __k10 = undefined;
    for (__k10 in ____o5) {
      var __v5 = ____o5[__k10];
      var __e65 = undefined;
      if (numeric63(__k10)) {
        __e65 = parseInt(__k10);
      } else {
        __e65 = __k10;
      }
      var __k11 = __e65;
      if (number63(__k11)) {
        __t1[__k11] = __v5;
      }
    }
    return array(__t1);
  }
};
edge = function (x) {
  return _35(x) - 1;
};
inner = function (x) {
  return clip(x, 1, edge(x));
};
tl = function (l) {
  return cut(l, 1);
};
char = function (s, n) {
  return s.charAt(n);
};
code = function (s, n) {
  return s.charCodeAt(n);
};
string_literal63 = function (x) {
  return string63(x) && char(x, 0) === "\"";
};
id_literal63 = function (x) {
  return string63(x) && char(x, 0) === "|";
};
add = function (l, x) {
  if (array63(l)) {
    l.push(x);
  } else {
    l[_35(l)] = x;
  }
  return undefined;
};
drop = function (l) {
  if (array63(l)) {
    if (some63(l)) {
      return l.pop();
    }
  } else {
    var __n8 = edge(l);
    if (__n8 >= 0) {
      var __r42 = l[__n8];
      delete l[__n8];
      return __r42;
    }
  }
};
last = function (l) {
  return l[edge(l)];
};
almost = function (l) {
  return cut(l, 0, edge(l));
};
reverse = function (l) {
  var __l11 = props(l);
  var __i7 = edge(l);
  while (__i7 >= 0) {
    add(__l11, l[__i7]);
    __i7 = __i7 - 1;
  }
  return __l11;
};
reduce = function (f, x, _else) {
  if (none63(x)) {
    return _else;
  } else {
    if (one63(x)) {
      return hd(x);
    } else {
      return f(hd(x), reduce(f, tl(x)));
    }
  }
};
join = function (..._42args) {
  var __ls = unstash([..._42args]);
  var __r47 = [];
  var ____x3 = __ls;
  var ____i8 = 0;
  while (____i8 < _35(____x3)) {
    var __l3 = ____x3[____i8];
    if (__l3) {
      var __n9 = _35(__r47);
      var ____o6 = __l3;
      var __k12 = undefined;
      for (__k12 in ____o6) {
        var __v6 = ____o6[__k12];
        var __e66 = undefined;
        if (numeric63(__k12)) {
          __e66 = parseInt(__k12);
        } else {
          __e66 = __k12;
        }
        var __k13 = __e66;
        if (number63(__k13)) {
          __k13 = __k13 + __n9;
        } else {
          __l3 = object(__l3);
        }
        if (__k13 === "length") {
          if (has(setenv("target", {
            _stash: true,
            toplevel: true
          }), "value") === "cmake") {
            __k13 = "LENGTH";
          } else {
            throw new Error("Can't use 'length' as an array key for this target");
          }
        }
        __r47[__k13] = __v6;
      }
    }
    ____i8 = ____i8 + 1;
  }
  return __r47;
};
find = function (f, t) {
  var ____o7 = t;
  var ____i10 = undefined;
  for (____i10 in ____o7) {
    var __x4 = ____o7[____i10];
    var __e67 = undefined;
    if (numeric63(____i10)) {
      __e67 = parseInt(____i10);
    } else {
      __e67 = ____i10;
    }
    var ____i101 = __e67;
    var __y = f(__x4);
    if (__y) {
      return __y;
    }
  }
};
first = function (f, l) {
  var ____x5 = l;
  var ____i11 = 0;
  while (____i11 < _35(____x5)) {
    var __x6 = ____x5[____i11];
    var __y1 = f(__x6);
    if (__y1) {
      return __y1;
    }
    ____i11 = ____i11 + 1;
  }
};
in63 = function (x, t) {
  return find(function (y) {
    return x === y;
  }, t);
};
pair = function (l) {
  var __l12 = dupe(l);
  var __n12 = _35(l);
  var __i12 = 0;
  while (__i12 < __n12) {
    var __a = l[__i12];
    var __b = l[__i12 + 1];
    add(__l12, [__a, __b]);
    __i12 = __i12 + 1;
    __i12 = __i12 + 1;
  }
  return __l12;
};
var sortfunc = function (f) {
  if (f) {
    var __f = function (a, b) {
      if (f(a, b)) {
        return -1;
      } else {
        return 1;
      }
    };
    return __f;
  }
};
sort = function (l, f) {
  l.sort(sortfunc(f));
  return l;
};
map = function (f, x) {
  var __t2 = dupe(x);
  var ____x8 = x;
  var ____i13 = 0;
  while (____i13 < _35(____x8)) {
    var __v7 = ____x8[____i13];
    var __y2 = f(__v7);
    if (is63(__y2)) {
      add(__t2, __y2);
    }
    ____i13 = ____i13 + 1;
  }
  var ____o8 = x;
  var __k14 = undefined;
  for (__k14 in ____o8) {
    var __v8 = ____o8[__k14];
    var __e68 = undefined;
    if (numeric63(__k14)) {
      __e68 = parseInt(__k14);
    } else {
      __e68 = __k14;
    }
    var __k15 = __e68;
    if (! number63(__k15)) {
      var __y3 = f(__v8);
      if (is63(__y3)) {
        __t2[__k15] = __y3;
      }
    }
  }
  return __t2;
};
mapcat = function (f, x, sep) {
  var __r58 = "";
  var __c = "";
  var ____x9 = x;
  var ____i15 = 0;
  while (____i15 < _35(____x9)) {
    var __v9 = ____x9[____i15];
    var __e69 = undefined;
    if (f) {
      __e69 = f(__v9);
    } else {
      __e69 = __v9;
    }
    var __y4 = __e69;
    if (is63(__y4)) {
      __r58 = __r58 + (__c + __y4);
      __c = sep || "";
    }
    ____i15 = ____i15 + 1;
  }
  return __r58;
};
concat = function (sep, x, f) {
  return mapcat(f, x, sep);
};
keep = function (f, x) {
  return map(function (v) {
    if (yes(f(v))) {
      return v;
    }
  }, x);
};
props63 = function (t) {
  var ____o9 = t;
  var __k16 = undefined;
  for (__k16 in ____o9) {
    var __v10 = ____o9[__k16];
    var __e70 = undefined;
    if (numeric63(__k16)) {
      __e70 = parseInt(__k16);
    } else {
      __e70 = __k16;
    }
    var __k17 = __e70;
    if (! number63(__k17)) {
      return true;
    }
  }
  return false;
};
empty63 = function (t) {
  var ____o10 = t;
  var ____i17 = undefined;
  for (____i17 in ____o10) {
    var __x10 = ____o10[____i17];
    var __e71 = undefined;
    if (numeric63(____i17)) {
      __e71 = parseInt(____i17);
    } else {
      __e71 = ____i17;
    }
    var ____i171 = __e71;
    return false;
  }
  return true;
};
stash = function (args) {
  if (props63(args)) {
    var __p = {};
    var ____o11 = args;
    var __k18 = undefined;
    for (__k18 in ____o11) {
      var __v11 = ____o11[__k18];
      var __e72 = undefined;
      if (numeric63(__k18)) {
        __e72 = parseInt(__k18);
      } else {
        __e72 = __k18;
      }
      var __k19 = __e72;
      if (! number63(__k19)) {
        __p[__k19] = __v11;
      }
    }
    __p._stash = true;
    add(args, __p);
  }
  if (array63(args)) {
    return args;
  } else {
    return array(args);
  }
};
unstash = function (args, params) {
  if (none63(args)) {
    return params || {};
  } else {
    var __l4 = last(args);
    if (obj63(__l4) && has63(__l4, "_stash")) {
      var __args1 = object(almost(args));
      var ____o12 = __l4;
      var __k20 = undefined;
      for (__k20 in ____o12) {
        var __v12 = ____o12[__k20];
        var __e74 = undefined;
        if (numeric63(__k20)) {
          __e74 = parseInt(__k20);
        } else {
          __e74 = __k20;
        }
        var __k21 = __e74;
        if (!( __k21 === "_stash")) {
          __args1[__k21] = __v12;
        }
      }
      if (params) {
        var ____o13 = params;
        var __k22 = undefined;
        for (__k22 in ____o13) {
          var __v13 = ____o13[__k22];
          var __e75 = undefined;
          if (numeric63(__k22)) {
            __e75 = parseInt(__k22);
          } else {
            __e75 = __k22;
          }
          var __k23 = __e75;
          __args1[__k23] = __v13;
        }
      }
      return __args1;
    } else {
      if (params) {
        var __args11 = object(args);
        var ____o14 = params;
        var __k24 = undefined;
        for (__k24 in ____o14) {
          var __v14 = ____o14[__k24];
          var __e73 = undefined;
          if (numeric63(__k24)) {
            __e73 = parseInt(__k24);
          } else {
            __e73 = __k24;
          }
          var __k25 = __e73;
          __args11[__k25] = __v14;
        }
        return __args11;
      } else {
        return args;
      }
    }
  }
};
destash33 = function (l, args1) {
  if (obj63(l) && has63(l, "_stash")) {
    var ____o15 = l;
    var __k26 = undefined;
    for (__k26 in ____o15) {
      var __v15 = ____o15[__k26];
      var __e76 = undefined;
      if (numeric63(__k26)) {
        __e76 = parseInt(__k26);
      } else {
        __e76 = __k26;
      }
      var __k27 = __e76;
      if (!( __k27 === "_stash")) {
        args1[__k27] = __v15;
      }
    }
  } else {
    return l;
  }
};
search = function (s, pattern, start) {
  var __i23 = s.indexOf(pattern, start);
  if (__i23 >= 0) {
    return __i23;
  }
};
string_ends63 = function (str, x, pos) {
  var __e77 = undefined;
  if (is63(pos)) {
    __e77 = clip(str, pos);
  } else {
    __e77 = str;
  }
  var __str = __e77;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_starts63 = function (str, x, pos) {
  var __e78 = undefined;
  if (is63(pos)) {
    __e78 = clip(str, pos);
  } else {
    __e78 = str;
  }
  var __str1 = __e78;
  if (_35(x) > _35(__str1)) {
    return false;
  } else {
    return x === clip(__str1, 0, _35(x));
  }
};
split = function (s, sep) {
  if (s === "" || sep === "") {
    return [];
  } else {
    var __l5 = [];
    var __n21 = _35(sep);
    while (true) {
      var __i24 = search(s, sep);
      if (nil63(__i24)) {
        break;
      } else {
        add(__l5, clip(s, 0, __i24));
        s = clip(s, __i24 + __n21);
      }
    }
    add(__l5, s);
    return __l5;
  }
};
tostr = function (x) {
  if (string63(x)) {
    return x;
  } else {
    if (nil63(x)) {
      return "";
    } else {
      return str(x);
    }
  }
};
var cat2 = function (a, b) {
  return a + b;
};
cat = function (..._42args) {
  var __xs = unstash([..._42args]);
  return reduce(function (a, b) {
    return cat2(a, b);
  }, __xs, "");
};
_43 = function (..._42args) {
  var __xs1 = unstash([..._42args]);
  return reduce(function (a, b) {
    return a + b;
  }, __xs1, 0);
};
_45 = function (..._42args) {
  var __xs2 = unstash([..._42args]);
  return reduce(function (b, a) {
    return a - b;
  }, reverse(__xs2), 0);
};
_42 = function (..._42args) {
  var __xs3 = unstash([..._42args]);
  return reduce(function (a, b) {
    return a * b;
  }, __xs3, 1);
};
_47 = function (..._42args) {
  var __xs4 = unstash([..._42args]);
  return reduce(function (b, a) {
    return a / b;
  }, reverse(__xs4), 1);
};
_37 = function (..._42args) {
  var __xs5 = unstash([..._42args]);
  return reduce(function (b, a) {
    return a % b;
  }, reverse(__xs5), 1);
};
var pairwise = function (f, xs) {
  var __i25 = 0;
  while (__i25 < edge(xs)) {
    var __a1 = xs[__i25];
    var __b1 = xs[__i25 + 1];
    if (! f(__a1, __b1)) {
      return false;
    }
    __i25 = __i25 + 1;
  }
  return true;
};
_60 = function (..._42args) {
  var __xs6 = unstash([..._42args]);
  return pairwise(function (a, b) {
    return a < b;
  }, __xs6);
};
_62 = function (..._42args) {
  var __xs7 = unstash([..._42args]);
  return pairwise(function (a, b) {
    return a > b;
  }, __xs7);
};
_61 = function (..._42args) {
  var __xs8 = unstash([..._42args]);
  return pairwise(function (a, b) {
    return a === b;
  }, __xs8);
};
_6061 = function (..._42args) {
  var __xs9 = unstash([..._42args]);
  return pairwise(function (a, b) {
    return a <= b;
  }, __xs9);
};
_6261 = function (..._42args) {
  var __xs10 = unstash([..._42args]);
  return pairwise(function (a, b) {
    return a >= b;
  }, __xs10);
};
number_code63 = function (n) {
  return n > 47 && n < 58;
};
number = function (s) {
  var __n22 = parseFloat(s);
  if (! isNaN(__n22)) {
    return __n22;
  }
};
numeric63 = function (s) {
  var __n23 = _35(s);
  var __i26 = 0;
  while (__i26 < __n23) {
    if (! number_code63(code(s, __i26))) {
      return false;
    }
    __i26 = __i26 + 1;
  }
  return some63(s);
};
var tostring = function (x) {
  return x.toString();
};
uppercase = function (x) {
  return x.toUpperCase();
};
lowercase = function (x) {
  return x.toLowerCase();
};
dashcase = function (x) {
  return mapcat(lowercase, split(x, "_"), "-");
};
screamcase = function (x) {
  return mapcat(uppercase, split(x, "-"), "_");
};
escape = function (s) {
  if (nil63(search(s, "\n")) && (nil63(search(s, "\r")) && (nil63(search(s, "\"")) && nil63(search(s, "\\"))))) {
    return "\"" + (s + "\"");
  } else {
    var __s1 = "\"";
    var __i27 = 0;
    while (__i27 < _35(s)) {
      var __c1 = char(s, __i27);
      var __e79 = undefined;
      if (__c1 === "\n") {
        __e79 = "\\n";
      } else {
        var __e80 = undefined;
        if (__c1 === "\r") {
          __e80 = "\\r";
        } else {
          var __e81 = undefined;
          if (__c1 === "\"") {
            __e81 = "\\\"";
          } else {
            var __e82 = undefined;
            if (__c1 === "\\") {
              __e82 = "\\\\";
            } else {
              __e82 = __c1;
            }
            __e81 = __e82;
          }
          __e80 = __e81;
        }
        __e79 = __e80;
      }
      var __c11 = __e79;
      __s1 = __s1 + __c11;
      __i27 = __i27 + 1;
    }
    return __s1 + "\"";
  }
};
str = function (x, repr, stack) {
  if (nil63(x)) {
    return "nil";
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
          if (boolean63(x)) {
            if (x) {
              return "true";
            } else {
              return "false";
            }
          } else {
            if (simple_id63(x)) {
              return x;
            } else {
              if (string63(x)) {
                return escape(x);
              } else {
                if (atom63(x)) {
                  return tostring(x);
                } else {
                  if (function63(x)) {
                    return "function";
                  } else {
                    if (stack && in63(x, stack)) {
                      return "circular";
                    } else {
                      if (false) {
                        if (repr) {
                          return repr(x);
                        } else {
                          return "|" + (tostring(x) + "|");
                        }
                      } else {
                        var __s = "(";
                        var __sp = "";
                        var __xs11 = {};
                        var __ks = [];
                        var __l6 = stack || [];
                        add(__l6, x);
                        var ____o16 = x;
                        var __k28 = undefined;
                        for (__k28 in ____o16) {
                          var __v16 = ____o16[__k28];
                          var __e83 = undefined;
                          if (numeric63(__k28)) {
                            __e83 = parseInt(__k28);
                          } else {
                            __e83 = __k28;
                          }
                          var __k29 = __e83;
                          if (number63(__k29)) {
                            __xs11[__k29] = str(__v16, repr, __l6);
                          } else {
                            if (function63(__v16)) {
                              add(__ks, ["." + __k29, ""]);
                            } else {
                              add(__ks, [__k29 + ": ", str(__v16, repr, __l6)]);
                            }
                          }
                        }
                        sort(__ks, function (__x24, __x25) {
                          var ____id = __x24;
                          var __a2 = has(____id, 0);
                          var ____id1 = __x25;
                          var __b2 = has(____id1, 0);
                          return __a2 < __b2;
                        });
                        drop(__l6);
                        var ____x26 = __xs11;
                        var ____i29 = 0;
                        while (____i29 < _35(____x26)) {
                          var __v17 = ____x26[____i29];
                          __s = __s + (__sp + __v17);
                          __sp = " ";
                          ____i29 = ____i29 + 1;
                        }
                        var ____x27 = __ks;
                        var ____i30 = 0;
                        while (____i30 < _35(____x27)) {
                          var ____id2 = ____x27[____i30];
                          var __k30 = has(____id2, 0);
                          var __v18 = has(____id2, 1);
                          __s = __s + (__sp + (__k30 + __v18));
                          __sp = " ";
                          ____i30 = ____i30 + 1;
                        }
                        return __s + ")";
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
apply = function (f, args) {
  var __args = stash(args);
  return f.apply(f, __args);
};
call = function (f, ..._42args) {
  var ____r97 = unstash([..._42args]);
  var __f1 = destash33(f, ____r97);
  var ____id3 = ____r97;
  var __args12 = cut(____id3, 0);
  return apply(__f1, __args12);
};
setenv = function (k, ..._42args) {
  var ____r98 = unstash([..._42args]);
  var __k31 = destash33(k, ____r98);
  var ____id4 = ____r98;
  var __keys = cut(____id4, 0);
  if (string63(__k31)) {
    var __e84 = undefined;
    if (has63(__keys, "toplevel")) {
      __e84 = hd(environment);
    } else {
      __e84 = last(environment);
    }
    var __frame = __e84;
    var __e85 = undefined;
    if (has63(__frame, __k31)) {
      __e85 = __frame[__k31];
    } else {
      __e85 = {};
    }
    var __entry = __e85;
    var ____o17 = __keys;
    var __k32 = undefined;
    for (__k32 in ____o17) {
      var __v19 = ____o17[__k32];
      var __e86 = undefined;
      if (numeric63(__k32)) {
        __e86 = parseInt(__k32);
      } else {
        __e86 = __k32;
      }
      var __k33 = __e86;
      if (!( __k33 === "toplevel")) {
        __entry[__k33] = __v19;
      }
    }
    __frame[__k31] = __entry;
    return __frame[__k31];
  }
};
print = console.log;
var math = Math;
abs = math.abs;
acos = math.acos;
asin = math.asin;
atan = math.atan;
atan2 = math.atan2;
ceil = math.ceil;
cos = math.cos;
floor = math.floor;
log = math.log;
log10 = math.log10;
max = math.max;
min = math.min;
pow = math.pow;
random = math.random;
sin = math.sin;
sinh = math.sinh;
sqrt = math.sqrt;
tan = math.tan;
tanh = math.tanh;
trunc = math.floor;
setenv("target", {
  _stash: true,
  toplevel: true,
  value: either(has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value"), "js")
});
setenv("target", {
  _stash: true,
  symbol: ["get-value", ["quote", "target"]]
});
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
  var __args3 = unstash([..._42args]);
  return join(["%do"], map(function (__x41) {
    var ____id6 = __x41;
    var __lh1 = has(____id6, 0);
    var __rh1 = has(____id6, 1);
    __lh1 = macroexpand(__lh1);
    if (! atom63(__lh1) && hd(__lh1) === "has") {
      return ["%set", join(["%get"], tl(__lh1)), __rh1];
    } else {
      return ["%set", __lh1, __rh1];
    }
  }, pair(__args3)));
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
var __lumen_list__macro = function (..._42args) {
  var __body2 = unstash([..._42args]);
  if (one63(__body2) && (hd63(__body2, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_args";
  } else {
    if (_35(__body2) > 2 && (__body2[1] === "for" && __body2[3] === "in")) {
      var ____id10 = __body2;
      var __expr2 = has(____id10, 0);
      var __body3 = cut(____id10, 1);
      var __comps1 = [];
      var __cond1 = undefined;
      while (_35(__body3) > 2 && (__body3[0] === "for" && __body3[2] === "in")) {
        var ____id11 = __body3;
        var ___for1 = has(____id11, 0);
        var __names1 = has(____id11, 1);
        var ___in1 = has(____id11, 2);
        var __l9 = has(____id11, 3);
        var __body12 = cut(____id11, 4);
        add(__comps1, [__names1, __l9]);
        __body3 = __body12;
      }
      if (hd(__body3) === "if") {
        var ____id12 = __body3;
        var ___if1 = has(____id12, 0);
        var __expr3 = has(____id12, 1);
        __cond1 = __expr3;
      }
      return ["%list", __expr2, __comps1, __cond1];
    } else {
      var __x68 = unique("x");
      var __l10 = [];
      var __forms1 = [];
      var ____o19 = __body2;
      var __k36 = undefined;
      for (__k36 in ____o19) {
        var __v21 = ____o19[__k36];
        var __e87 = undefined;
        if (numeric63(__k36)) {
          __e87 = parseInt(__k36);
        } else {
          __e87 = __k36;
        }
        var __k37 = __e87;
        if (number63(__k37)) {
          __l10[__k37] = __v21;
        } else {
          add(__forms1, ["%set", ["%get", __x68, ["quote", __k37]], __v21]);
        }
      }
      if (some63(__forms1)) {
        return join(["let", __x68, ["object", join(["%array"], __l10)]], __forms1, [__x68]);
      } else {
        return join(["%array"], __l10);
      }
    }
  }
};
setenv("lumen-list", {
  _stash: true,
  macro: __lumen_list__macro
});
var __list__macro = function (..._42args) {
  var __args5 = unstash([..._42args]);
  return join(["lumen-list"], __args5);
};
setenv("list", {
  _stash: true,
  macro: __list__macro
});
var __quasilist__macro = function (..._42args) {
  var __args7 = unstash([..._42args]);
  return join(["lumen-list"], __args7);
};
setenv("quasilist", {
  _stash: true,
  macro: __quasilist__macro
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
  var ____r112 = unstash([..._42args]);
  var __expr5 = destash33(expr, ____r112);
  var ____id15 = ____r112;
  var __e88 = undefined;
  if (nil63(has(____id15, "cmp"))) {
    __e88 = "=";
  } else {
    __e88 = has(____id15, "cmp");
  }
  var __cmp1 = __e88;
  var __clauses1 = cut(____id15, 0);
  var __x100 = unique("x");
  var __eq1 = function (_) {
    return [__cmp1, _, __x100];
  };
  var __cl1 = function (__x102) {
    var ____id16 = __x102;
    var __a4 = has(____id16, 0);
    var __b4 = has(____id16, 1);
    if (nil63(__b4)) {
      return [__a4];
    } else {
      if (string63(__a4) || number63(__a4)) {
        return [__eq1(__a4), __b4];
      } else {
        if (list63(__a4) && hd63(__a4, "quote")) {
          return [__eq1(__a4), __b4];
        } else {
          if (one63(__a4)) {
            return [__eq1(hd(__a4)), __b4];
          } else {
            if (_35(__a4) > 1) {
              return [join(["or"], map(__eq1, __a4)), __b4];
            }
          }
        }
      }
    }
  };
  return ["let", __x100, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
};
setenv("case", {
  _stash: true,
  macro: __case__macro
});
var __of__macro = function (x, ..._42args) {
  var ____r116 = unstash([..._42args]);
  var __x115 = destash33(x, ____r116);
  var ____id18 = ____r116;
  var __values1 = cut(____id18, 0);
  return join(["case", __x115, __values1, true, false], props(__values1));
};
setenv("of", {
  _stash: true,
  macro: __of__macro
});
var __when__macro = function (cond, ..._42args) {
  var ____r118 = unstash([..._42args]);
  var __cond3 = destash33(cond, ____r118);
  var ____id20 = ____r118;
  var __body5 = cut(____id20, 0);
  return ["%if", __cond3, join(["%do"], __body5)];
};
setenv("when", {
  _stash: true,
  macro: __when__macro
});
var __unless__macro = function (cond, ..._42args) {
  var ____r120 = unstash([..._42args]);
  var __cond5 = destash33(cond, ____r120);
  var ____id22 = ____r120;
  var __body7 = cut(____id22, 0);
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
      var ____id26 = __body10;
      var __expr8 = has(____id26, 0);
      var __body111 = cut(____id26, 1);
      var __comps3 = [];
      var __cond7 = undefined;
      while (_35(__body111) > 2 && (__body111[0] === "for" && __body111[2] === "in")) {
        var ____id27 = __body111;
        var ___for3 = has(____id27, 0);
        var __names3 = has(____id27, 1);
        var ___in3 = has(____id27, 2);
        var __l121 = has(____id27, 3);
        var __body14 = cut(____id27, 4);
        add(__comps3, [__names3, __l121]);
        __body111 = __body14;
      }
      if (hd(__body111) === "if") {
        var ____id28 = __body111;
        var ___if3 = has(____id28, 0);
        var __expr9 = has(____id28, 1);
        __cond7 = __expr9;
      }
      if (list63(__expr8) && hd63(__expr8, ",")) {
        __expr8 = join([":"], tl(__expr8));
      }
      var ____x139 = object(["%list", __expr8, __comps3, __cond7]);
      ____x139.kind = "object";
      return ____x139;
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
  var ____r124 = unstash([..._42args]);
  var __bs11 = destash33(bs, ____r124);
  var ____id33 = ____r124;
  var __body131 = cut(____id33, 0);
  if (atom63(__bs11) || hd63(__bs11, ",")) {
    return join(["let", [__bs11, hd(__body131)]], tl(__body131));
  } else {
    if (none63(__bs11)) {
      return join(["%do"], __body131);
    } else {
      var ____id34 = __bs11;
      var __lh3 = has(____id34, 0);
      var __rh3 = has(____id34, 1);
      var __bs21 = cut(____id34, 2);
      var ____id35 = bind(__lh3, __rh3);
      var __id36 = has(____id35, 0);
      var __val1 = has(____id35, 1);
      var __bs12 = cut(____id35, 2);
      var __renames1 = [];
      if (! id_literal63(__id36)) {
        var __id121 = unique(__id36);
        __renames1 = [__id36, __id121];
        __id36 = __id121;
      }
      return ["%do", ["%local", __id36, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body131)]];
    }
  }
};
setenv("let", {
  _stash: true,
  macro: __let__macro
});
var __with__macro = function (x, v, ..._42args) {
  var ____r126 = unstash([..._42args]);
  var __x168 = destash33(x, ____r126);
  var __v23 = destash33(v, ____r126);
  var ____id38 = ____r126;
  var __body15 = cut(____id38, 0);
  if (__v23 === "as") {
    return join(["%with", ["%as", __x168, hd(__body15)]], tl(__body15));
  } else {
    if (! atom63(__x168) || has(__body15, "async")) {
      return join(["%with", __x168, __v23], __body15);
    } else {
      return join(["let", [__x168, __v23]], __body15, [__x168]);
    }
  }
};
setenv("with", {
  _stash: true,
  macro: __with__macro
});
var __let_when__macro = function (x, v, ..._42args) {
  var ____r128 = unstash([..._42args]);
  var __x183 = destash33(x, ____r128);
  var __v25 = destash33(v, ____r128);
  var ____id40 = ____r128;
  var __body17 = cut(____id40, 0);
  var __y6 = unique("y");
  return ["let", __y6, __v25, ["when", ["yes", __y6], join(["let", [__x183, __y6]], __body17)]];
};
setenv("let-when", {
  _stash: true,
  macro: __let_when__macro
});
var __define_macro__macro = function (name, args, ..._42args) {
  var ____r130 = unstash([..._42args]);
  var __name1 = destash33(name, ____r130);
  var __args9 = destash33(args, ____r130);
  var ____id43 = ____r130;
  var __body19 = cut(____id43, 0);
  var __id44 = unique(__name1 + "--macro");
  var ____x197 = object(["setenv", ["quote", __name1]]);
  ____x197.macro = __id44;
  var __form1 = ["do", join(["define", __id44, __args9], __body19), ____x197];
  _eval(__form1);
  return __form1;
};
setenv("define-macro", {
  _stash: true,
  macro: __define_macro__macro
});
var __define_special__macro = function (name, args, ..._42args) {
  var ____r132 = unstash([..._42args]);
  var __name3 = destash33(name, ____r132);
  var __args111 = destash33(args, ____r132);
  var ____id47 = ____r132;
  var __body21 = cut(____id47, 0);
  var __id48 = unique(__name3 + "--special");
  var ____x207 = object(["setenv", ["quote", __name3]]);
  ____x207.special = __id48;
  var __form3 = ["do", join(["define", __id48, __args111], __body21), join(____x207, props(__body21))];
  _eval(__form3);
  return __form3;
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
  var ____x212 = object(["setenv", ["quote", name]]);
  ____x212.symbol = ["quote", expansion];
  return ____x212;
};
setenv("define-symbol", {
  _stash: true,
  macro: __define_symbol__macro
});
var __define_reader__macro = function (__x221, ..._42args) {
  var ____r136 = unstash([..._42args]);
  var ____x221 = destash33(__x221, ____r136);
  var ____id51 = ____x221;
  var __char1 = has(____id51, 0);
  var __s2 = has(____id51, 1);
  var ____id52 = ____r136;
  var __body23 = cut(____id52, 0);
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body23)];
};
setenv("define-reader", {
  _stash: true,
  macro: __define_reader__macro
});
var __define__macro = function (name, x, ..._42args) {
  var ____r138 = unstash([..._42args]);
  var __name5 = destash33(name, ____r138);
  var __x232 = destash33(x, ____r138);
  var ____id54 = ____r138;
  var __body25 = cut(____id54, 0);
  setenv(__name5, {
    _stash: true,
    variable: true
  });
  if (some63(__body25)) {
    return join(["%local-function", __name5], bind42(__x232, __body25), props(__body25));
  } else {
    return join(["%local", __name5, __x232], props(__body25));
  }
};
setenv("define", {
  _stash: true,
  macro: __define__macro
});
var __define_global__macro = function (name, x, ..._42args) {
  var ____r140 = unstash([..._42args]);
  var __name7 = destash33(name, ____r140);
  var __x240 = destash33(x, ____r140);
  var ____id56 = ____r140;
  var __body27 = cut(____id56, 0);
  setenv(__name7, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body27)) {
    return join(["%global-function", __name7], bind42(__x240, __body27), props(__body27));
  } else {
    return join(["set", __name7, __x240], props(__body27));
  }
};
setenv("define-global", {
  _stash: true,
  macro: __define_global__macro
});
var __get_value__macro = function (x) {
  var ____x247 = object(["setenv", x]);
  ____x247.toplevel = true;
  return ["has", ____x247, ["quote", "value"]];
};
setenv("get-value", {
  _stash: true,
  macro: __get_value__macro
});
var __define_constant__macro = function (name, x) {
  var ____x258 = object(["setenv", ["quote", name]]);
  ____x258.toplevel = true;
  ____x258.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x258, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
  var ____r149 = unstash([..._42args]);
  var __x288 = destash33(x, ____r149);
  var ____id58 = ____r149;
  var __body29 = cut(____id58, 0);
  var __ok1 = unique("ok");
  var __r150 = unique("r");
  var ____x289 = object(["target", ["try", __x288, join(["finally"], __body29)]]);
  ____x289.lua = join(["let", [[__ok1, __r150], ["guard", __x288]]], __body29, [["if", __ok1, __r150, ["throw", __r150]]]);
  return ____x289;
};
setenv("after", {
  _stash: true,
  macro: __after__macro
});
var __with_frame__macro = function (..._42args) {
  var __body31 = unstash([..._42args]);
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body31), ["drop", "environment"]]];
};
setenv("with-frame", {
  _stash: true,
  macro: __with_frame__macro
});
var __with_values__macro = function (..._42args) {
  var __body33 = unstash([..._42args]);
  var __forms3 = [];
  var ____o21 = __body33;
  var __k40 = undefined;
  for (__k40 in ____o21) {
    var __v27 = ____o21[__k40];
    var __e89 = undefined;
    if (numeric63(__k40)) {
      __e89 = parseInt(__k40);
    } else {
      __e89 = __k40;
    }
    var __k41 = __e89;
    if (! number63(__k41)) {
      var ____x319 = object(["setenv", ["quote", __k41]]);
      ____x319.value = __v27;
      add(__forms3, ____x319);
    }
  }
  return join(["with-frame"], __forms3);
};
setenv("with-values", {
  _stash: true,
  macro: __with_values__macro
});
var __with_bindings__macro = function (__x327, ..._42args) {
  var ____r152 = unstash([..._42args]);
  var ____x327 = destash33(__x327, ____r152);
  var ____id61 = ____x327;
  var __names5 = has(____id61, 0);
  var ____id62 = ____r152;
  var __body35 = cut(____id62, 0);
  var __x329 = unique("x");
  var ____x332 = object(["setenv", __x329]);
  ____x332.variable = true;
  return join(["with-frame", ["each", __x329, __names5, ____x332]], __body35);
};
setenv("with-bindings", {
  _stash: true,
  macro: __with_bindings__macro
});
var __let_macro__macro = function (definitions, ..._42args) {
  var ____r157 = unstash([..._42args]);
  var __definitions1 = destash33(definitions, ____r157);
  var ____id64 = ____r157;
  var __body37 = cut(____id64, 0);
  add(environment, {});
  var ____r159 = undefined;
  try{
    map(function (m) {
      return macroexpand(join(["define-macro"], m));
    }, __definitions1);
    ____r159 = join(["%do"], macroexpand(__body37));
  }
  finally{
    drop(environment);
  }
  return ____r159;
};
setenv("let-macro", {
  _stash: true,
  macro: __let_macro__macro
});
var __let_symbol__macro = function (expansions, ..._42args) {
  var ____r165 = unstash([..._42args]);
  var __expansions1 = destash33(expansions, ____r165);
  var ____id67 = ____r165;
  var __body39 = cut(____id67, 0);
  add(environment, {});
  var ____r167 = undefined;
  try{
    map(function (__x344) {
      var ____id68 = __x344;
      var __name9 = has(____id68, 0);
      var __exp1 = has(____id68, 1);
      return macroexpand(["define-symbol", __name9, __exp1]);
    }, pair(__expansions1));
    ____r167 = join(["%do"], macroexpand(__body39));
  }
  finally{
    drop(environment);
  }
  return ____r167;
};
setenv("let-symbol", {
  _stash: true,
  macro: __let_symbol__macro
});
var __let_unique__macro = function (names, ..._42args) {
  var ____r171 = unstash([..._42args]);
  var __names7 = destash33(names, ____r171);
  var ____id70 = ____r171;
  var __body41 = cut(____id70, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names7);
  return join(["let", apply(join, __bs3)], __body41);
};
setenv("let-unique", {
  _stash: true,
  macro: __let_unique__macro
});
var __fn__macro = function (args, ..._42args) {
  var ____r174 = unstash([..._42args]);
  var __args13 = destash33(args, ____r174);
  var ____id72 = ____r174;
  var __body43 = cut(____id72, 0);
  return join(["%function"], bind42(__args13, __body43), props(__body43));
};
setenv("fn", {
  _stash: true,
  macro: __fn__macro
});
var __apply__macro = function (f, ..._42args) {
  var ____r176 = unstash([..._42args]);
  var __f3 = destash33(f, ____r176);
  var ____id74 = ____r176;
  var __args15 = cut(____id74, 0);
  if (_35(__args15) > 1) {
    return ["%call", "apply", __f3, ["join", join(["list"], almost(__args15)), last(__args15), join(["list"], props(__args15))]];
  } else {
    if (props63(__args15)) {
      return ["%call", "apply", __f3, join(["join"], __args15, [join(["list"], props(__args15))])];
    } else {
      return join(["%call", "apply", __f3], __args15);
    }
  }
};
setenv("apply", {
  _stash: true,
  macro: __apply__macro
});
var __guard__macro = function (expr) {
  var ____x411 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x423 = object(["obj"]);
  ____x423.stack = [["idx", "debug", "traceback"]];
  ____x423.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x411.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x423]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x411];
};
setenv("guard", {
  _stash: true,
  macro: __guard__macro
});
var __each__macro = function (x, t, ..._42args) {
  var ____r180 = unstash([..._42args]);
  var __x452 = destash33(x, ____r180);
  var __t4 = destash33(t, ____r180);
  var ____id77 = ____r180;
  var __body45 = cut(____id77, 0);
  var __o23 = unique("o");
  var __n31 = unique("n");
  var __i37 = unique("i");
  var __e90 = undefined;
  if (atom63(__x452)) {
    __e90 = [__i37, __x452];
  } else {
    var __e91 = undefined;
    if (_35(__x452) > 1) {
      __e91 = __x452;
    } else {
      __e91 = [__i37, hd(__x452)];
    }
    __e90 = __e91;
  }
  var ____id78 = __e90;
  var __k43 = has(____id78, 0);
  var __v29 = has(____id78, 1);
  var ____x458 = object(["target", __o23]);
  ____x458.py = ["indices", __o23];
  var __e92 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e92 = __body45;
  } else {
    __e92 = [join(["let", __k43, ["if", ["numeric?", __k43], ["parseInt", __k43], __k43]], __body45)];
  }
  return ["let", [__o23, __t4, __k43, "nil"], join(["%for", ____x458, __k43], props(__body45), [join(["let", [__v29, ["%get", __o23, __k43]]], __e92)])];
};
setenv("each", {
  _stash: true,
  macro: __each__macro
});
var __for__macro = function (i, to, ..._42args) {
  var ____r182 = unstash([..._42args]);
  var __i39 = destash33(i, ____r182);
  var __to1 = destash33(to, ____r182);
  var ____id80 = ____r182;
  var __body47 = cut(____id80, 0);
  if (__to1 === "in") {
    return join(["%for", hd(__body47), __i39, join(["%do"], tl(__body47))], props(__body47));
  } else {
    return ["let", __i39, 0, join(["while", ["<", __i39, __to1]], __body47, [["inc", __i39]])];
  }
};
setenv("for", {
  _stash: true,
  macro: __for__macro
});
var __step__macro = function (v, t, ..._42args) {
  var ____r184 = unstash([..._42args]);
  var __v31 = destash33(v, ____r184);
  var __t6 = destash33(t, ____r184);
  var ____id82 = ____r184;
  var __body49 = cut(____id82, 0);
  var __x495 = unique("x");
  var __i41 = unique("i");
  return ["let", [__x495, __t6], ["for", __i41, ["#", __x495], join(["let", [__v31, ["at", __x495, __i41]]], __body49)]];
};
setenv("step", {
  _stash: true,
  macro: __step__macro
});
var __set_of__macro = function (..._42args) {
  var __xs13 = unstash([..._42args]);
  var __l14 = {};
  var ____o25 = __xs13;
  var ____i43 = undefined;
  for (____i43 in ____o25) {
    var __x507 = ____o25[____i43];
    var __e93 = undefined;
    if (numeric63(____i43)) {
      __e93 = parseInt(____i43);
    } else {
      __e93 = ____i43;
    }
    var ____i431 = __e93;
    __l14[__x507] = true;
  }
  return join(["obj"], __l14);
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
  var ____r190 = unstash([..._42args]);
  var __a6 = destash33(a, ____r190);
  var ____id84 = ____r190;
  var __bs5 = cut(____id84, 0);
  return ["set", __a6, join(["join", __a6], __bs5)];
};
setenv("join!", {
  _stash: true,
  macro: __join33__macro
});
var __cat33__macro = function (a, ..._42args) {
  var ____r192 = unstash([..._42args]);
  var __a8 = destash33(a, ____r192);
  var ____id86 = ____r192;
  var __bs7 = cut(____id86, 0);
  return ["set", __a8, join(["cat", __a8], __bs7)];
};
setenv("cat!", {
  _stash: true,
  macro: __cat33__macro
});
var __inc__macro = function (n, by) {
  var __e94 = undefined;
  if (nil63(by)) {
    __e94 = 1;
  } else {
    __e94 = by;
  }
  return ["set", n, ["+", n, __e94]];
};
setenv("inc", {
  _stash: true,
  macro: __inc__macro
});
var __dec__macro = function (n, by) {
  var __e95 = undefined;
  if (nil63(by)) {
    __e95 = 1;
  } else {
    __e95 = by;
  }
  return ["set", n, ["-", n, __e95]];
};
setenv("dec", {
  _stash: true,
  macro: __dec__macro
});
var __with_indent__macro = function (form) {
  var __x540 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x540, form, ["dec", "indent-level"]]];
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
  var __body51 = unstash([..._42args]);
  return _eval(join(["%do"], __body51));
};
setenv("when-compiling", {
  _stash: true,
  macro: __when_compiling__macro
});
var __during_compilation__macro = function (..._42args) {
  var __body53 = unstash([..._42args]);
  var __form5 = join(["%do"], __body53);
  _eval(__form5);
  return __form5;
};
setenv("during-compilation", {
  _stash: true,
  macro: __during_compilation__macro
});
var __def__macro = function (name, ..._42args) {
  var ____r202 = unstash([..._42args]);
  var __name11 = destash33(name, ____r202);
  var ____id88 = ____r202;
  var __body55 = cut(____id88, 0);
  return join(["define-global", __name11], __body55);
};
setenv("def", {
  _stash: true,
  macro: __def__macro
});
var __mac__macro = function (name, ..._42args) {
  var ____r204 = unstash([..._42args]);
  var __name13 = destash33(name, ____r204);
  var ____id90 = ____r204;
  var __body57 = cut(____id90, 0);
  return join(["define-macro", __name13], __body57);
};
setenv("mac", {
  _stash: true,
  macro: __mac__macro
});
var __defconst__macro = function (name, ..._42args) {
  var ____r206 = unstash([..._42args]);
  var __name15 = destash33(name, ____r206);
  var ____id92 = ____r206;
  var __value1 = cut(____id92, 0);
  return join(["def", __name15], __value1);
};
setenv("defconst", {
  _stash: true,
  macro: __defconst__macro
});
var __undefined63__macro = function (name) {
  var ____x604 = object(["target"]);
  ____x604.js = ["=", ["typeof", name], "\"undefined\""];
  ____x604.lua = ["=", ["idx", "_G", name], "nil"];
  ____x604.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x604;
};
setenv("undefined?", {
  _stash: true,
  macro: __undefined63__macro
});
var __defvar__macro = function (name, ..._42args) {
  var ____r210 = unstash([..._42args]);
  var __name17 = destash33(name, ____r210);
  var ____id94 = ____r210;
  var __value3 = cut(____id94, 0);
  var ____x622 = object(["target"]);
  ____x622.py = ["global", __name17];
  return ["when", ["undefined?", __name17], ____x622, join(["defconst", __name17], __value3)];
};
setenv("defvar", {
  _stash: true,
  macro: __defvar__macro
});
var __async__macro = function (keyword, ..._42args) {
  var ____r212 = unstash([..._42args]);
  var __keyword1 = destash33(keyword, ____r212);
  var ____id96 = ____r212;
  var __body59 = cut(____id96, 0);
  var ____x628 = object([__keyword1]);
  ____x628.async = true;
  return join(____x628, __body59);
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
  var ____r218 = unstash([..._42args]);
  var __a10 = destash33(a, ____r218);
  var ____id98 = ____r218;
  var __bs9 = cut(____id98, 0);
  if (nil63(__a10)) {
    return "";
  } else {
    if (none63(__bs9)) {
      return __a10;
    } else {
      if (one63(__bs9)) {
        var ____x654 = object(["target", join(["%cat", __a10], __bs9)]);
        ____x654.py = join(["%call", "cat", __a10], __bs9);
        return ____x654;
      } else {
        var ____x657 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]]);
        ____x657.py = join(["%call", "cat", __a10], __bs9);
        return ____x657;
      }
    }
  }
};
setenv("cat", {
  _stash: true,
  macro: __cat__macro
});
var ___43__macro = function (..._42args) {
  var __args17 = unstash([..._42args]);
  if (none63(__args17)) {
    return 0;
  } else {
    if (one63(__args17)) {
      return hd(__args17);
    } else {
      return join(["%add"], __args17);
    }
  }
};
setenv("+", {
  _stash: true,
  macro: ___43__macro
});
var _____macro = function (..._42args) {
  var __args19 = unstash([..._42args]);
  if (none63(__args19)) {
    return 0;
  } else {
    if (one63(__args19)) {
      return ["%unm", hd(__args19)];
    } else {
      return join(["%sub"], __args19);
    }
  }
};
setenv("-", {
  _stash: true,
  macro: _____macro
});
var ___42__macro = function (..._42args) {
  var __args21 = unstash([..._42args]);
  if (none63(__args21)) {
    return 1;
  } else {
    if (one63(__args21)) {
      return hd(__args21);
    } else {
      return join(["%mul"], __args21);
    }
  }
};
setenv("*", {
  _stash: true,
  macro: ___42__macro
});
var ___47__macro = function (..._42args) {
  var __args23 = unstash([..._42args]);
  if (none63(__args23)) {
    return 1;
  } else {
    if (one63(__args23)) {
      return hd(__args23);
    } else {
      return join(["%div"], __args23);
    }
  }
};
setenv("/", {
  _stash: true,
  macro: ___47__macro
});
var ___4747__macro = function (..._42args) {
  var __args25 = unstash([..._42args]);
  if (none63(__args25)) {
    return 1;
  } else {
    if (one63(__args25)) {
      return hd(__args25);
    } else {
      return join(["%idiv"], __args25);
    }
  }
};
setenv("//", {
  _stash: true,
  macro: ___4747__macro
});
var ___37__macro = function (..._42args) {
  var __args27 = unstash([..._42args]);
  if (none63(__args27)) {
    return 0;
  } else {
    if (one63(__args27)) {
      return hd(__args27);
    } else {
      return join(["%mod"], __args27);
    }
  }
};
setenv("%", {
  _stash: true,
  macro: ___37__macro
});
var ___60__macro = function (a, ..._42args) {
  var ____r220 = unstash([..._42args]);
  var __a12 = destash33(a, ____r220);
  var ____id100 = ____r220;
  var __bs111 = cut(____id100, 0);
  if (none63(__bs111)) {
    return true;
  } else {
    if (one63(__bs111)) {
      return join(["%lt", __a12], __bs111);
    } else {
      return ["%and", ["%lt", __a12, hd(__bs111)], join(["<"], __bs111)];
    }
  }
};
setenv("<", {
  _stash: true,
  macro: ___60__macro
});
var ___6061__macro = function (a, ..._42args) {
  var ____r222 = unstash([..._42args]);
  var __a14 = destash33(a, ____r222);
  var ____id102 = ____r222;
  var __bs13 = cut(____id102, 0);
  if (none63(__bs13)) {
    return true;
  } else {
    if (one63(__bs13)) {
      return join(["%le", __a14], __bs13);
    } else {
      return ["%and", ["%le", __a14, hd(__bs13)], join(["<="], __bs13)];
    }
  }
};
setenv("<=", {
  _stash: true,
  macro: ___6061__macro
});
var ___61__macro = function (a, ..._42args) {
  var ____r224 = unstash([..._42args]);
  var __a16 = destash33(a, ____r224);
  var ____id104 = ____r224;
  var __bs15 = cut(____id104, 0);
  if (none63(__bs15)) {
    return true;
  } else {
    if (one63(__bs15)) {
      return join(["%eq", __a16], __bs15);
    } else {
      return ["%and", ["%eq", __a16, hd(__bs15)], join(["="], __bs15)];
    }
  }
};
setenv("=", {
  _stash: true,
  macro: ___61__macro
});
var ___6261__macro = function (a, ..._42args) {
  var ____r226 = unstash([..._42args]);
  var __a18 = destash33(a, ____r226);
  var ____id106 = ____r226;
  var __bs17 = cut(____id106, 0);
  if (none63(__bs17)) {
    return true;
  } else {
    if (one63(__bs17)) {
      return join(["%ge", __a18], __bs17);
    } else {
      return ["%and", ["%ge", __a18, hd(__bs17)], join([">="], __bs17)];
    }
  }
};
setenv(">=", {
  _stash: true,
  macro: ___6261__macro
});
var ___62__macro = function (a, ..._42args) {
  var ____r228 = unstash([..._42args]);
  var __a20 = destash33(a, ____r228);
  var ____id108 = ____r228;
  var __bs19 = cut(____id108, 0);
  if (none63(__bs19)) {
    return true;
  } else {
    if (one63(__bs19)) {
      return join(["%gt", __a20], __bs19);
    } else {
      return ["%and", ["%gt", __a20, hd(__bs19)], join([">"], __bs19)];
    }
  }
};
setenv(">", {
  _stash: true,
  macro: ___62__macro
});
var __not__macro = function (..._42args) {
  var __args29 = unstash([..._42args]);
  if (none63(__args29)) {
    return false;
  } else {
    if (one63(__args29)) {
      return join(["%not"], __args29);
    } else {
      return ["%and", ["%not", hd(__args29)], join(["not"], tl(__args29))];
    }
  }
};
setenv("not", {
  _stash: true,
  macro: __not__macro
});
var __and__macro = function (a, ..._42args) {
  var ____r230 = unstash([..._42args]);
  var __a22 = destash33(a, ____r230);
  var ____id110 = ____r230;
  var __bs211 = cut(____id110, 0);
  if (nil63(__a22)) {
    return true;
  } else {
    if (none63(__bs211)) {
      return __a22;
    } else {
      if (one63(__bs211)) {
        return join(["%and", __a22], __bs211);
      } else {
        return ["%and", __a22, join(["and"], __bs211)];
      }
    }
  }
};
setenv("and", {
  _stash: true,
  macro: __and__macro
});
var __or__macro = function (a, ..._42args) {
  var ____r232 = unstash([..._42args]);
  var __a24 = destash33(a, ____r232);
  var ____id112 = ____r232;
  var __bs23 = cut(____id112, 0);
  if (nil63(__a24)) {
    return false;
  } else {
    if (none63(__bs23)) {
      return __a24;
    } else {
      if (one63(__bs23)) {
        return join(["%or", __a24], __bs23);
      } else {
        return ["%or", __a24, join(["or"], __bs23)];
      }
    }
  }
};
setenv("or", {
  _stash: true,
  macro: __or__macro
});
var __break__macro = function (..._42args) {
  var __args31 = unstash([..._42args]);
  return join(["%break"], __args31);
};
setenv("break", {
  _stash: true,
  macro: __break__macro
});
var __return__macro = function (..._42args) {
  var __args33 = unstash([..._42args]);
  return join(["%return"], __args33);
};
setenv("return", {
  _stash: true,
  macro: __return__macro
});
var __while__macro = function (c, ..._42args) {
  var ____r234 = unstash([..._42args]);
  var __c3 = destash33(c, ____r234);
  var ____id114 = ____r234;
  var __body61 = cut(____id114, 0);
  return join(["%while", __c3], __body61);
};
setenv("while", {
  _stash: true,
  macro: __while__macro
});
var __do__macro = function (..._42args) {
  var __body63 = unstash([..._42args]);
  return join(["%do"], __body63);
};
setenv("do", {
  _stash: true,
  macro: __do__macro
});
var __get__macro = function (..._42args) {
  var __args35 = unstash([..._42args]);
  return join(["%get"], __args35);
};
setenv("get", {
  _stash: true,
  macro: __get__macro
});
var __idx__macro = function (..._42args) {
  var __args37 = unstash([..._42args]);
  return join(["%idx"], __args37);
};
setenv("idx", {
  _stash: true,
  macro: __idx__macro
});
var __new__macro = function (..._42args) {
  var __args39 = unstash([..._42args]);
  return join(["%new"], __args39);
};
setenv("new", {
  _stash: true,
  macro: __new__macro
});
var __typeof__macro = function (..._42args) {
  var __args41 = unstash([..._42args]);
  return join(["%typeof"], __args41);
};
setenv("typeof", {
  _stash: true,
  macro: __typeof__macro
});
var __error__macro = function (..._42args) {
  var __args43 = unstash([..._42args]);
  return join(["%error"], __args43);
};
setenv("error", {
  _stash: true,
  macro: __error__macro
});
var __throw__macro = function (..._42args) {
  var __args45 = unstash([..._42args]);
  return join(["%throw"], __args45);
};
setenv("throw", {
  _stash: true,
  macro: __throw__macro
});
var __raise__macro = function (..._42args) {
  var __args47 = unstash([..._42args]);
  return join(["%throw"], __args47);
};
setenv("raise", {
  _stash: true,
  macro: __raise__macro
});
var __is__macro = function (..._42args) {
  var __args49 = unstash([..._42args]);
  var ____x812 = object(["target", join(["="], __args49)]);
  ____x812.py = join(["%is"], __args49);
  return ____x812;
};
setenv("is", {
  _stash: true,
  macro: __is__macro
});
var __in__macro = function (..._42args) {
  var __args51 = unstash([..._42args]);
  return join(["%in"], __args51);
};
setenv("in", {
  _stash: true,
  macro: __in__macro
});
var __as__macro = function (..._42args) {
  var __args53 = unstash([..._42args]);
  return join(["%as"], __args53);
};
setenv("as", {
  _stash: true,
  macro: __as__macro
});
var ___37expand_case__macro = function (x, ..._42args) {
  var ____r236 = unstash([..._42args]);
  var __x830 = destash33(x, ____r236);
  var ____id117 = ____r236;
  var __body65 = cut(____id117, 0);
  var __e96 = undefined;
  if (atom63(__x830)) {
    __e96 = [__x830];
  } else {
    __e96 = __x830;
  }
  var ____id118 = __e96;
  var __a26 = has(____id118, 0);
  var __bs25 = cut(____id118, 1);
  var __e97 = undefined;
  if (none63(__bs25)) {
    __e97 = [["%literal"]];
  } else {
    __e97 = __bs25;
  }
  return join(["%block", __a26], __e97, __body65);
};
setenv("%expand-case", {
  _stash: true,
  macro: ___37expand_case__macro
});
var ___37cases__macro = function (..._42args) {
  var __args55 = unstash([..._42args]);
  if (none63(__args55)) {
    return ["do"];
  } else {
    if (one63(__args55)) {
      return join(["%expand-case"], hd(__args55));
    } else {
      var __r239 = unique("r");
      return join(["with", __r239, "nil"], map(function (__x850) {
        var ____id120 = __x850;
        var __x851 = has(____id120, 0);
        var __body67 = cut(____id120, 1);
        return ["%expand-case", __x851, ["%set", __r239, join(["%do"], __body67)]];
      }, almost(__args55)), [join(["%expand-case"], last(__args55))]);
    }
  }
};
setenv("%cases", {
  _stash: true,
  macro: ___37cases__macro
});
var __try__macro = function (x, ..._42args) {
  var ____r242 = unstash([..._42args]);
  var __x872 = destash33(x, ____r242);
  var ____id125 = ____r242;
  var __cases1 = cut(____id125, 0);
  var __fin1 = ["finally"];
  var ____o27 = __cases1;
  var ____i46 = undefined;
  for (____i46 in ____o27) {
    var __x874 = ____o27[____i46];
    var __e98 = undefined;
    if (numeric63(____i46)) {
      __e98 = parseInt(____i46);
    } else {
      __e98 = ____i46;
    }
    var ____i461 = __e98;
    if (hd63(__x874, "finally")) {
      __fin1 = __x874;
    }
  }
  var __forms7 = [];
  var ____x877 = __cases1;
  var ____i47 = 0;
  while (____i47 < _35(____x877)) {
    var ____id126 = ____x877[____i47];
    var __x878 = has(____id126, 0);
    var __body71 = cut(____id126, 1);
    if (__x878 === "finally") {
    } else {
      if (__x878 === "except" && has(__body71, 1) === "as") {
        var ____id127 = __body71;
        var __kind2 = has(____id127, 0);
        var ___1 = has(____id127, 1);
        var __name19 = has(____id127, 2);
        var __body72 = cut(____id127, 3);
        add(__forms7, join([[__x878, ["%as", __kind2, __name19]]], __body72));
      } else {
        if (__x878 === "except") {
          var ____id128 = __body71;
          var __kind3 = has(____id128, 0);
          var __body73 = cut(____id128, 1);
          add(__forms7, join([[__x878, __kind3]], __body73));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i47 = ____i47 + 1;
  }
  return join(["%cases", ["try", __x872]], __forms7, [__fin1]);
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
  var __v33 = unique("v");
  return ["let", [[__ok7, __v33], ["guard", x]], ["if", __ok7, __v33, _else]];
};
setenv("errsafe", {
  _stash: true,
  macro: __errsafe__macro
});
var __dbg__macro = function () {
  var ____x901 = object(["target", ["do"]]);
  ____x901.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x901;
};
setenv("dbg", {
  _stash: true,
  macro: __dbg__macro
});
var __see__macro = function (form) {
  var __form7 = expand(form);
  print(compile(expand(["%set", "lumen-result", __form7])));
  return __form7;
};
setenv("see", {
  _stash: true,
  macro: __see__macro
});
var ___37dollar__macro = function (x) {
  return ["%id", x];
};
setenv("%dollar", {
  _stash: true,
  macro: ___37dollar__macro
});
var __exports = {};
var __module = {exports: __exports};
var delimiters = {
  ["("]: true,
  [")"]: true,
  [";"]: true,
  [","]: true,
  ["\r"]: true,
  ["\n"]: true
};
var closing_delimiters = {[")"]: true};
var whitespace = {
  [" "]: true,
  ["\t"]: true,
  ["\r"]: true,
  ["\n"]: true
};
var stream = function (str, more) {
  return {
    pos: 0,
    string: str,
    len: _35(str),
    more: more
  };
};
var peek_char = function (s) {
  var ____id129 = s;
  var __pos = has(____id129, "pos");
  var __len = has(____id129, "len");
  var __string = has(____id129, "string");
  if (__pos < __len) {
    return char(__string, __pos);
  }
};
var read_char = function (s) {
  var __c4 = peek_char(s);
  if (__c4) {
    s.pos = s.pos + 1;
    return __c4;
  }
};
var skip_non_code = function (s) {
  while (true) {
    var __c5 = peek_char(s);
    if (nil63(__c5)) {
      break;
    } else {
      if (has63(whitespace, __c5)) {
        read_char(s);
      } else {
        if (__c5 === ";") {
          while (__c5 && !( __c5 === "\n")) {
            __c5 = read_char(s);
          }
          skip_non_code(s);
        } else {
          break;
        }
      }
    }
  }
};
var read_table = {};
var eof = {};
var more63 = function (s, x) {
  return is63(s.more) && x === s.more;
};
var eof63 = function (s, x) {
  return x === eof || more63(s, x);
};
var read_1 = function (s) {
  skip_non_code(s);
  var __c6 = peek_char(s);
  if (is63(__c6)) {
    return (has(read_table, __c6) || has(read_table, ""))(s);
  } else {
    return eof;
  }
};
var read = function (s) {
  var __form8 = read_1(s);
  if ("," === peek_char(s)) {
    var __r259 = [",", __form8];
    while (true) {
      read_char(s);
      __form8 = read_1(s);
      if (eof63(s, __form8)) {
        return expected(s, "tuple");
      }
      add(__r259, __form8);
      if (!( "," === peek_char(s))) {
        break;
      }
    }
    return __r259;
  } else {
    return __form8;
  }
};
var read_all = function (s) {
  var __r261 = undefined;
  var __l15 = [];
  while (nil63(__r261)) {
    var __form9 = read(s);
    if (more63(s, __form9)) {
      __r261 = s.more;
    } else {
      if (eof63(s, __form9)) {
        __r261 = __l15;
      } else {
        add(__l15, __form9);
      }
    }
  }
  return __r261;
};
read_string = function (str, more) {
  var __s3 = stream(str, more);
  var __x913 = read(__s3);
  if (!( __x913 === eof)) {
    return __x913;
  }
};
var key63 = function (atom) {
  return string63(atom) && (_35(atom) > 1 && char(atom, edge(atom)) === ":");
};
var expected = function (s, c) {
  if (is63(s.more)) {
    return s.more;
  } else {
    throw new Error("Expected " + (c + (" at " + s.pos)));
  }
};
var wrap = function (s, x) {
  var __y7 = read(s);
  if (more63(s, __y7)) {
    return __y7;
  } else {
    return [x, __y7];
  }
};
var hex_prefix63 = function (str) {
  var __e99 = undefined;
  if (code(str, 0) === 45) {
    __e99 = 1;
  } else {
    __e99 = 0;
  }
  var __i48 = __e99;
  var __id196 = code(str, __i48) === 48;
  var __e100 = undefined;
  if (__id196) {
    __i48 = __i48 + 1;
    var __n36 = code(str, __i48);
    __e100 = __n36 === 120 || __n36 === 88;
  } else {
    __e100 = __id196;
  }
  return __e100;
};
var maybe_number = function (str) {
  if (hex_prefix63(str)) {
    return parseInt(str, 16);
  } else {
    if (number_code63(code(str, edge(str)))) {
      return number(str);
    }
  }
};
var real63 = function (x) {
  return number63(x) && (! nan63(x) && ! inf63(x));
};
read_table[""] = function (s) {
  var __str2 = "";
  while (true) {
    var __c7 = peek_char(s);
    if (__c7 && (! has63(whitespace, __c7) && ! has63(delimiters, __c7))) {
      __str2 = __str2 + read_char(s);
    } else {
      break;
    }
  }
  if (__str2 === "true") {
    return true;
  } else {
    if (__str2 === "false") {
      return false;
    } else {
      var __n37 = maybe_number(__str2);
      if (real63(__n37)) {
        return __n37;
      } else {
        return __str2;
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var __r271 = undefined;
  var __l16 = [];
  while (nil63(__r271)) {
    skip_non_code(s);
    var __c8 = peek_char(s);
    if (__c8 === ")") {
      read_char(s);
      __r271 = __l16;
    } else {
      if (nil63(__c8)) {
        __r271 = expected(s, ")");
      } else {
        var __x915 = read(s);
        if (eof63(s, __x915)) {
          __r271 = expected(s, ")");
        } else {
          if (key63(__x915)) {
            var __k44 = clip(__x915, 0, edge(__x915));
            var __v34 = read(s);
            __l16 = object(__l16);
            __l16[__k44] = __v34;
          } else {
            add(__l16, __x915);
          }
        }
      }
    }
  }
  return __r271;
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
var read_matching = function (opener, closer, s) {
  var __r274 = undefined;
  var __pos1 = s.pos;
  var __str3 = "";
  var __i49 = 0;
  while (__i49 < _35(opener)) {
    __str3 = __str3 + (read_char(s) || "");
    __i49 = __i49 + 1;
  }
  if (__str3 === opener) {
    while (nil63(__r274)) {
      if (clip(s.string, s.pos, s.pos + _35(closer)) === closer) {
        var __i50 = 0;
        while (__i50 < _35(closer)) {
          __str3 = __str3 + read_char(s);
          __i50 = __i50 + 1;
        }
        __r274 = __str3;
      } else {
        if (nil63(peek_char(s))) {
          __r274 = expected(s, closer);
        } else {
          __str3 = __str3 + read_char(s);
          if (peek_char(s) === "\\") {
            __str3 = __str3 + read_char(s);
          }
        }
      }
    }
  }
  return __r274;
};
read_table["\""] = function (s) {
  if (string_starts63(s.string, "\"\"\"", s.pos)) {
    return read_matching("\"\"\"", "\"\"\"", s);
  } else {
    var __i51 = s.pos;
    var __j1 = search(s.string, "\"", __i51 + 1);
    var __b5 = either(search(s.string, "\\", __i51 + 1), __j1);
    if (is63(__j1) && (__j1 < s.len && __b5 >= __j1)) {
      s.pos = __j1 + 1;
      return clip(s.string, __i51, __j1 + 1);
    } else {
      var __r276 = undefined;
      read_char(s);
      while (nil63(__r276)) {
        var __c9 = peek_char(s);
        if (__c9 === "\"") {
          read_char(s);
          __r276 = clip(s.string, __i51, s.pos);
        } else {
          if (nil63(__c9)) {
            __r276 = expected(s, "\"");
          } else {
            if (__c9 === "\\") {
              read_char(s);
            }
            read_char(s);
          }
        }
      }
      return __r276;
    }
  }
};
read_table["|"] = function (s) {
  var __i52 = s.pos;
  var __j2 = search(s.string, "|", __i52 + 1);
  if (is63(__j2) && __j2 < s.len) {
    s.pos = __j2 + 1;
    return clip(s.string, __i52, __j2 + 1);
  } else {
    return expected(s, "|");
  }
};
read_table["'"] = function (s) {
  read_char(s);
  return wrap(s, "quote");
};
read_table["`"] = function (s) {
  read_char(s);
  return wrap(s, "quasiquote");
};
read_table[","] = function (s) {
  read_char(s);
  var __c10 = peek_char(s);
  if (nil63(__c10) || (has63(whitespace, __c10) || has63(closing_delimiters, __c10))) {
    return ",";
  } else {
    if (__c10 === "@") {
      read_char(s);
      return wrap(s, "unquote-splicing");
    } else {
      return wrap(s, "unquote");
    }
  }
};
read_table["$"] = function (s) {
  read_char(s);
  return wrap(s, "%dollar");
};
__exports.stream = stream;
__exports.stream;
__exports.read = read;
__exports.read;
__exports["read-all"] = read_all;
__exports.read_all = read_all;
__exports.read_all;
__exports["read-string"] = read_string;
__exports.read_string = read_string;
__exports.read_string;
__exports["read-table"] = read_table;
__exports.read_table = read_table;
__exports.read_table;
pymen.reader = __exports;
var __exports1 = {};
var __module1 = {exports: __exports1};
getenv = function (k, p) {
  if (string63(k)) {
    var __i53 = edge(environment);
    while (__i53 >= 0) {
      if (has63(environment[__i53], k)) {
        var __b6 = environment[__i53][k];
        var __e101 = undefined;
        if (p) {
          __e101 = has(__b6, p);
        } else {
          __e101 = __b6;
        }
        return __e101;
      } else {
        __i53 = __i53 - 1;
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
      var __l17 = array(args);
      var ____o28 = args;
      var __k45 = undefined;
      for (__k45 in ____o28) {
        var __v35 = ____o28[__k45];
        var __e104 = undefined;
        if (numeric63(__k45)) {
          __e104 = parseInt(__k45);
        } else {
          __e104 = __k45;
        }
        var __k46 = __e104;
        if (! number63(__k46)) {
          add(__l17, ["%literal", __k46, "|=|", __v35]);
        }
      }
      return __l17;
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        var __l18 = array(args);
        var ____o29 = args;
        var __k47 = undefined;
        for (__k47 in ____o29) {
          var __v36 = ____o29[__k47];
          var __e103 = undefined;
          if (numeric63(__k47)) {
            __e103 = parseInt(__k47);
          } else {
            __e103 = __k47;
          }
          var __k48 = __e103;
          if (! number63(__k48)) {
            add(__l18, ["%literal", __k48, "| |", __v36]);
          }
        }
        return __l18;
      } else {
        var __l19 = ["%object", "\"_stash\"", true];
        var ____o30 = args;
        var __k49 = undefined;
        for (__k49 in ____o30) {
          var __v37 = ____o30[__k49];
          var __e102 = undefined;
          if (numeric63(__k49)) {
            __e102 = parseInt(__k49);
          } else {
            __e102 = __k49;
          }
          var __k50 = __e102;
          if (! number63(__k50)) {
            add(__l19, literal(__k50));
            add(__l19, __v37);
          }
        }
        return join({}, args, [__l19]);
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
        var ____id130 = lh;
        var ___2 = has(____id130, 0);
        var ___var = has(____id130, 1);
        var __val2 = has(____id130, 2);
        var __val3 = either(__val2, ___var);
        return bind(["o", ___var, ["the", __val3]], rh);
      } else {
        if (hd(lh) === "o") {
          var ____id131 = lh;
          var ___3 = has(____id131, 0);
          var ___var1 = has(____id131, 1);
          var __val4 = has(____id131, 2);
          return [___var1, ["if", ["nil?", rh], __val4, rh]];
        } else {
          var __id132 = unique("id");
          var __bs26 = [__id132, rh];
          var ____o31 = lh;
          var __k51 = undefined;
          for (__k51 in ____o31) {
            var __v38 = ____o31[__k51];
            var __e105 = undefined;
            if (numeric63(__k51)) {
              __e105 = parseInt(__k51);
            } else {
              __e105 = __k51;
            }
            var __k52 = __e105;
            var __e106 = undefined;
            if (__k52 === "rest") {
              __e106 = ["cut", __id132, _35(lh)];
            } else {
              __e106 = ["has", __id132, ["quote", bias(__k52)]];
            }
            var __x929 = __e106;
            if (is63(__k52)) {
              var __e107 = undefined;
              if (__v38 === true) {
                __e107 = __k52;
              } else {
                __e107 = __v38;
              }
              var __k53 = __e107;
              __bs26 = join(__bs26, bind(__k53, __x929));
            }
          }
          return __bs26;
        }
      }
    }
  }
};
var __arguments37__macro = function (from) {
  var ____x941 = object(["target"]);
  ____x941.js = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", from];
  ____x941.py = ["list", "|_args|"];
  ____x941.lua = ["quasilist", "|...|"];
  ____x941.cmake = ["%ref", "ARGN"];
  return ____x941;
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
  var __args131 = {};
  var rest = function () {
    __args131.rest = true;
    var ____x953 = object(["target"]);
    ____x953.py = ["obj", "..."];
    return ["unstash", ["quasilist", "..."], ____x953];
  };
  if (atom63(args)) {
    return [__args131, join(["let", [args, rest()]], body)];
  } else {
    var ____id133 = body_docstring(body);
    var __doc = has(____id133, 0);
    var __body74 = has(____id133, 1);
    var __pre = [];
    var __bs27 = [];
    var __inits = [];
    var __r303 = unique("r");
    var ____o32 = args;
    var __k54 = undefined;
    for (__k54 in ____o32) {
      var __v39 = ____o32[__k54];
      var __e108 = undefined;
      if (numeric63(__k54)) {
        __e108 = parseInt(__k54);
      } else {
        __e108 = __k54;
      }
      var __k55 = __e108;
      if (number63(__k55)) {
        if (atom63(__v39)) {
          add(__args131, __v39);
        } else {
          if (hd(__v39) === "o") {
            var ____id134 = __v39;
            var ___4 = has(____id134, 0);
            var ___var2 = has(____id134, 1);
            var __val5 = has(____id134, 2);
            add(__args131, ___var2);
            add(__inits, ["%if", ["nil?", ___var2], ["%set", ___var2, __val5]]);
          } else {
            if (hd(__v39) === "t") {
              var ____id135 = __v39;
              var ___5 = has(____id135, 0);
              var ___var3 = has(____id135, 1);
              var __val6 = has(____id135, 2);
              var __val7 = either(__val6, ___var3);
              add(__args131, ___var3);
              add(__inits, ["%if", ["nil?", ___var3], ["%set", ___var3, ["the", __val7]]]);
            } else {
              var __x965 = unique("x");
              add(__args131, __x965);
              __bs27 = join(__bs27, [__v39, __x965]);
            }
          }
        }
      }
    }
    if (props63(args)) {
      __pre = join(__pre, [__r303, rest()]);
      var __n43 = _35(__args131);
      var __i59 = 0;
      while (__i59 < __n43) {
        var __v40 = __args131[__i59];
        __pre = join(__pre, [__v40, ["destash!", __v40, __r303]]);
        __i59 = __i59 + 1;
      }
      __bs27 = join(__bs27, [props(args), __r303]);
    }
    var __forms8 = join(["let", __pre], __inits, [join(["let", __bs27], __body74)]);
    var __e109 = undefined;
    if (is63(__doc)) {
      __e109 = ["do", __doc, __forms8];
    } else {
      __e109 = __forms8;
    }
    return [__args131, __e109];
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
var expand_local = function (__x976) {
  var ____id136 = __x976;
  var __x977 = has(____id136, 0);
  var __name20 = has(____id136, 1);
  var __value4 = has(____id136, 2);
  setenv(__name20, {
    _stash: true,
    variable: true
  });
  return ["%local", __name20, macroexpand(__value4)];
};
var expand_function = function (__x979) {
  var ____id137 = __x979;
  var __x980 = has(____id137, 0);
  var __args56 = has(____id137, 1);
  var __body75 = cut(____id137, 2);
  add(environment, {});
  var ____r311 = undefined;
  try{
    var ____o33 = __args56;
    var ____i60 = undefined;
    for (____i60 in ____o33) {
      var ____x981 = ____o33[____i60];
      var __e110 = undefined;
      if (numeric63(____i60)) {
        __e110 = parseInt(____i60);
      } else {
        __e110 = ____i60;
      }
      var ____i601 = __e110;
      setenv(____x981, {
        _stash: true,
        variable: true
      });
    }
    ____r311 = join(["%function", __args56], macroexpand(__body75));
  }
  finally{
    drop(environment);
  }
  return ____r311;
};
var expand_definition = function (__x983) {
  var ____id138 = __x983;
  var __x984 = has(____id138, 0);
  var __name21 = has(____id138, 1);
  var __args57 = has(____id138, 2);
  var __body76 = cut(____id138, 3);
  add(environment, {});
  var ____r314 = undefined;
  try{
    var ____o34 = __args57;
    var ____i61 = undefined;
    for (____i61 in ____o34) {
      var ____x985 = ____o34[____i61];
      var __e111 = undefined;
      if (numeric63(____i61)) {
        __e111 = parseInt(____i61);
      } else {
        __e111 = ____i61;
      }
      var ____i611 = __e111;
      setenv(____x985, {
        _stash: true,
        variable: true
      });
    }
    ____r314 = join([__x984, __name21, __args57], macroexpand(__body76));
  }
  finally{
    drop(environment);
  }
  return ____r314;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x987) {
  var ____id139 = __x987;
  var __name22 = has(____id139, 0);
  var __body77 = cut(____id139, 1);
  return apply(macro_function(__name22), __body77);
};
real63 = function (x) {
  return number63(x) && (! nan63(x) && ! inf63(x));
};
valid_access63 = function (str) {
  return _35(str) > 2 && (!( "." === char(str, 0)) && (!( "." === char(str, edge(str))) && ! search(str, "..")));
};
parse_access = function (str) {
  return reduce(function (a, b) {
    var __n46 = number(a);
    if (is63(__n46)) {
      return ["at", b, __n46];
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
        var __x990 = hd(form);
        if (__x990 === "%local") {
          return expand_local(form);
        } else {
          if (__x990 === "%function") {
            return expand_function(form);
          } else {
            if (__x990 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x990 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x990 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x990)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x990)) {
                      return macroexpand(join([parse_access(__x990)], tl(form)));
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
  var __xs14 = [["quasilist"]];
  var ____o35 = form;
  var __k56 = undefined;
  for (__k56 in ____o35) {
    var __v41 = ____o35[__k56];
    var __e112 = undefined;
    if (numeric63(__k56)) {
      __e112 = parseInt(__k56);
    } else {
      __e112 = __k56;
    }
    var __k57 = __e112;
    if (! number63(__k57)) {
      var __e113 = undefined;
      if (quasisplice63(__v41, depth)) {
        __e113 = quasiexpand(__v41[1]);
      } else {
        __e113 = quasiexpand(__v41, depth);
      }
      var __v42 = __e113;
      last(__xs14)[__k57] = __v42;
    }
  }
  var ____x994 = form;
  var ____i63 = 0;
  while (____i63 < _35(____x994)) {
    var __x995 = ____x994[____i63];
    if (quasisplice63(__x995, depth)) {
      var __x996 = quasiexpand(__x995[1]);
      add(__xs14, __x996);
      add(__xs14, ["quasilist"]);
    } else {
      add(last(__xs14), quasiexpand(__x995, depth));
    }
    ____i63 = ____i63 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || (!( hd(x) === "quasilist") || props63(x));
  }, __xs14);
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
expand_if = function (__x1000) {
  var ____id140 = __x1000;
  var __a27 = has(____id140, 0);
  var __b7 = has(____id140, 1);
  var __c111 = cut(____id140, 2);
  if (is63(__b7)) {
    return [join(["%if", __a27, __b7], expand_if(__c111))];
  } else {
    if (is63(__a27)) {
      return [__a27];
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
  var __s4 = "";
  var __i64 = 0;
  while (__i64 < has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value")) {
    __s4 = __s4 + "  ";
    __i64 = __i64 + 1;
  }
  return __s4;
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
      var __e114 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e114 = "L_";
      } else {
        __e114 = "_";
      }
      var __x1006 = __e114;
      var __e115 = undefined;
      if (number_code63(code(id, 0))) {
        __e115 = __x1006;
      } else {
        __e115 = "";
      }
      var __id1311 = __e115;
      var __i65 = 0;
      while (__i65 < _35(id)) {
        var __c12 = char(id, __i65);
        var __n48 = code(__c12);
        var __e116 = undefined;
        if (__c12 === "-" && !( id === "-")) {
          var __e119 = undefined;
          if (__i65 === 0) {
            __e119 = __x1006;
          } else {
            __e119 = "_";
          }
          __e116 = __e119;
        } else {
          var __e117 = undefined;
          if (valid_code63(__n48)) {
            __e117 = __c12;
          } else {
            var __e118 = undefined;
            if (__i65 === 0) {
              __e118 = __x1006 + __n48;
            } else {
              __e118 = __n48;
            }
            __e117 = __e118;
          }
          __e116 = __e117;
        }
        var __c121 = __e116;
        __id1311 = __id1311 + __c121;
        __i65 = __i65 + 1;
      }
      if (raw63) {
        return __id1311;
      } else {
        if (reserved63(__id1311)) {
          return __x1006 + __id1311;
        } else {
          return __id1311;
        }
      }
    }
  }
};
valid_id63 = function (x) {
  return some63(x) && x === compile_id(x);
};
var __names10 = {};
unique = function (x) {
  var __x1007 = compile_id(x);
  if (has63(__names10, __x1007)) {
    var __i66 = __names10[__x1007];
    __names10[__x1007] = __names10[__x1007] + 1;
    return unique(__x1007 + __i66);
  } else {
    __names10[__x1007] = 1;
    return "__" + __x1007;
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
      var __i67 = inner(k);
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        var __e120 = undefined;
        if (valid_id63(__i67)) {
          __e120 = __i67;
        } else {
          __e120 = k;
        }
        return screamcase(__e120);
      } else {
        if (valid_id63(__i67)) {
          return __i67;
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
  var __o36 = [];
  var ____o37 = t;
  var __k58 = undefined;
  for (__k58 in ____o37) {
    var __v43 = ____o37[__k58];
    var __e121 = undefined;
    if (numeric63(__k58)) {
      __e121 = parseInt(__k58);
    } else {
      __e121 = __k58;
    }
    var __k59 = __e121;
    var __x1008 = f(__v43);
    if (is63(__x1008)) {
      add(__o36, literal(__k59));
      add(__o36, __x1008);
    }
  }
  return __o36;
};
var ____x1010 = object([]);
var ____x1011 = object([]);
____x1011.js = "!";
____x1011.lua = "not";
____x1011.py = "not";
____x1011.cmake = "NOT";
____x1010["%not"] = ____x1011;
____x1010["%unm"] = "-";
var ____x1012 = object([]);
____x1012["%mul"] = "*";
____x1012["%div"] = "/";
____x1012["%idiv"] = "//";
____x1012["%mod"] = "%";
var ____x1013 = object([]);
var ____x1014 = object([]);
____x1014.js = "+";
____x1014.lua = "..";
____x1014.py = "+";
____x1013["%cat"] = ____x1014;
var ____x1015 = object([]);
____x1015["%add"] = "+";
____x1015["%sub"] = "-";
var ____x1016 = object([]);
var ____x1017 = object([]);
____x1017.cmake = "LESS";
____x1017.all = "<";
____x1016["%lt"] = ____x1017;
var ____x1018 = object([]);
____x1018.cmake = "GREATER";
____x1018.all = ">";
____x1016["%gt"] = ____x1018;
var ____x1019 = object([]);
____x1019.cmake = "LESS_EQUAL";
____x1019.all = "<=";
____x1016["%le"] = ____x1019;
var ____x1020 = object([]);
____x1020.cmake = "GREATER_EQUAL";
____x1020.all = ">=";
____x1016["%ge"] = ____x1020;
var ____x1021 = object([]);
var ____x1022 = object([]);
____x1022.js = "===";
____x1022.lua = "==";
____x1022.py = "==";
____x1021["%eq"] = ____x1022;
var ____x1023 = object([]);
var ____x1024 = object([]);
____x1024.py = "in";
____x1023["%in"] = ____x1024;
var ____x1025 = object([]);
____x1025.py = "is";
____x1023["%is"] = ____x1025;
var ____x1026 = object([]);
var ____x1027 = object([]);
____x1027.js = "&&";
____x1027.lua = "and";
____x1027.py = "and";
____x1027.cmake = "AND";
____x1026["%and"] = ____x1027;
var ____x1028 = object([]);
var ____x1029 = object([]);
____x1029.js = "||";
____x1029.lua = "or";
____x1029.py = "or";
____x1029.cmake = "OR";
____x1028["%or"] = ____x1029;
var infix = [____x1010, ____x1012, ____x1013, ____x1015, ____x1016, ____x1021, ____x1023, ____x1026, ____x1028];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["%not", "%unm"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    if (atom63(hd(form))) {
      var ____o38 = infix;
      var __k60 = undefined;
      for (__k60 in ____o38) {
        var __v44 = ____o38[__k60];
        var __e122 = undefined;
        if (numeric63(__k60)) {
          __e122 = parseInt(__k60);
        } else {
          __e122 = __k60;
        }
        var __k61 = __e122;
        if (has63(__v44, hd(form))) {
          return index(__k61);
        }
      }
    }
  }
  return 0;
};
var getop = function (op) {
  if (string63(op)) {
    return find(function (level) {
      var __x1031 = has(level, op);
      if (__x1031 === true) {
        return op;
      } else {
        if (string63(__x1031)) {
          return __x1031;
        } else {
          if (is63(__x1031)) {
            return has(__x1031, has(setenv("target", {
              _stash: true,
              toplevel: true
            }), "value")) || has(__x1031, "all");
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
  var __s5 = "(";
  var __c13 = "";
  var ____x1032 = args;
  var ____i70 = 0;
  while (____i70 < _35(____x1032)) {
    var __x1033 = ____x1032[____i70];
    __s5 = __s5 + (__c13 + compile(__x1033));
    if ((has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") && (default63 && (! id_literal63(__x1033) && !( __x1033 === "...")))) {
      var __e123 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        __e123 = "";
      } else {
        __e123 = "=None";
      }
      __s5 = __s5 + __e123;
    }
    var __e124 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e124 = " ";
    } else {
      __e124 = ", ";
    }
    __c13 = __e124;
    ____i70 = ____i70 + 1;
  }
  return __s5 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s12 = "";
    var __i71 = 0;
    while (__i71 < _35(s)) {
      var __c14 = char(s, __i71);
      var __e125 = undefined;
      if (__c14 === "\n") {
        __e125 = "\\n";
      } else {
        var __e126 = undefined;
        if (__c14 === "\r") {
          __e126 = "\\r";
        } else {
          __e126 = __c14;
        }
        __e125 = __e126;
      }
      __s12 = __s12 + __e125;
      __i71 = __i71 + 1;
    }
    return __s12;
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
  var ____id141 = form;
  var __x1034 = has(____id141, 0);
  var __args58 = cut(____id141, 1);
  var ____id142 = getenv(__x1034);
  var __special = has(____id142, "special");
  var __stmt = has(____id142, "stmt");
  var __self_tr63 = has(____id142, "tr");
  var __e127 = undefined;
  if (stmt63 && ! __stmt) {
    __e127 = indentation();
  } else {
    __e127 = "";
  }
  var __p1 = __e127;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p1 + (apply(__special, __args58) + __tr);
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
method_call63 = function (form) {
  var __e128 = undefined;
  if (list63(form)) {
    __e128 = hd(form);
  } else {
    __e128 = form;
  }
  var __x1035 = __e128;
  return string63(__x1035) && (_35(__x1035, 1) > 1 && char(__x1035, 0) === ".");
};
var compile_call = function (form) {
  var __f4 = hd(form);
  var __f11 = compile_name(__f4);
  var __args59 = stash42(tl(form));
  var __e129 = undefined;
  if (method_call63(hd(__args59))) {
    __e129 = mapcat(compile, __args59, "");
  } else {
    __e129 = compile_args(__args59);
  }
  var __args60 = __e129;
  if (parenthesize_call63(__f4)) {
    return "(" + (__f11 + (")" + __args60));
  } else {
    return __f11 + __args60;
  }
};
var op_delims = function (parent, child, ..._42args) {
  var ____r359 = unstash([..._42args]);
  var __parent = destash33(parent, ____r359);
  var __child = destash33(child, ____r359);
  var ____id143 = ____r359;
  var __right = has(____id143, "right");
  var __e130 = undefined;
  if (__right) {
    __e130 = _6261;
  } else {
    __e130 = _62;
  }
  if (__e130(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id144 = form;
  var __op = has(____id144, 0);
  var ____id145 = cut(____id144, 1);
  var __a28 = has(____id145, 0);
  var __b8 = has(____id145, 1);
  var ____id146 = op_delims(form, __a28);
  var __ao = has(____id146, 0);
  var __ac = has(____id146, 1);
  var ____id147 = op_delims(form, __b8, {
    _stash: true,
    right: true
  });
  var __bo = has(____id147, 0);
  var __bc = has(____id147, 1);
  var __a29 = compile(__a28);
  var __b9 = compile(__b8);
  var __op1 = getop(__op);
  if (unary63(form)) {
    return __op1 + (__ao + (" " + (__a29 + __ac)));
  } else {
    return __ao + (__a29 + (__ac + (" " + (__op1 + (" " + (__bo + (__b9 + __bc)))))));
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
  var ____x1039 = compile(body, {
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
  var __s6 = ____x1039;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py" && none63(__s6)) {
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x1040 = indentation() + "pass\n";
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    return ____x1040;
  } else {
    return __s6;
  }
};
compile_function = function (args, body, ..._42args) {
  var ____r362 = unstash([..._42args]);
  var __args61 = destash33(args, ____r362);
  var __body78 = destash33(body, ____r362);
  var ____id148 = ____r362;
  var __name23 = has(____id148, "name");
  var __prefix = has(____id148, "prefix");
  var __async = has(____id148, "async");
  var __e131 = undefined;
  if (__name23) {
    __e131 = compile_name(__name23);
  } else {
    __e131 = "";
  }
  var __id149 = __e131;
  var __e132 = undefined;
  if (has(__args61, "rest")) {
    __e132 = join(__args61, ["..."]);
  } else {
    __e132 = __args61;
  }
  var __args141 = __e132;
  var __e133 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e133 = compile_args(join([["%literal", __id149]], __args141), true);
  } else {
    __e133 = compile_args(__args141, true);
  }
  var __args62 = __e133;
  var __body79 = compile_body(__body78);
  var __ind = indentation();
  var __e134 = undefined;
  if (__prefix) {
    __e134 = __prefix + " ";
  } else {
    __e134 = "";
  }
  var __p2 = __e134;
  var __e135 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e135 = "";
  } else {
    var __e136 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e136 = "endfunction()";
    } else {
      __e136 = "end";
    }
    __e135 = __e136;
  }
  var __tr1 = __e135;
  var __e137 = undefined;
  if (__async && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua")) {
    __e137 = "async ";
  } else {
    __e137 = "";
  }
  var __a30 = __e137;
  if (__name23) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __a30 + ("function " + (__id149 + (__args62 + (" {\n" + (__body79 + (__ind + ("}" + __tr1)))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __e138 = undefined;
      if (none63(__ind)) {
        __e138 = "\n";
      } else {
        __e138 = "";
      }
      var __ws = __e138;
      return __a30 + ("def " + (__id149 + (__args62 + (":\n" + (__body79 + __ws)))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        return __a30 + ("function" + (__args62 + ("\n" + (__body79 + (__ind + __tr1)))));
      } else {
        return __p2 + ("function " + (__id149 + (__args62 + ("\n" + (__body79 + (__ind + __tr1))))));
      }
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "%return") && ! statement63(hd(form)));
};
compile = function (form, raw63, ..._42args) {
  var ____r364 = unstash([..._42args]);
  var __form10 = destash33(form, ____r364);
  var __raw63 = destash33(raw63, ____r364);
  var ____id150 = ____r364;
  var __stmt1 = has(____id150, "stmt");
  if (nil63(__form10)) {
    return "";
  } else {
    if (special_form63(__form10)) {
      return compile_special(__form10, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e139 = undefined;
      if (__stmt1) {
        __e139 = indentation();
      } else {
        __e139 = "";
      }
      var __ind1 = __e139;
      var __e140 = undefined;
      if (atom63(__form10)) {
        __e140 = compile_atom(__form10, __raw63);
      } else {
        var __e141 = undefined;
        if (infix63(hd(__form10))) {
          __e141 = compile_infix(__form10);
        } else {
          __e141 = compile_call(__form10);
        }
        __e140 = __e141;
      }
      var __form11 = __e140;
      return __ind1 + (__form11 + __tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e12 = lower(form, __hoist, true, tail63);
  var __e142 = undefined;
  if (some63(__hoist) && is63(__e12)) {
    __e142 = join(["%do"], __hoist, [__e12]);
  } else {
    var __e143 = undefined;
    if (is63(__e12)) {
      __e143 = __e12;
    } else {
      var __e144 = undefined;
      if (_35(__hoist) > 1) {
        __e144 = join(["%do"], __hoist);
      } else {
        __e144 = hd(__hoist);
      }
      __e143 = __e144;
    }
    __e142 = __e143;
  }
  return either(__e142, ["%do"]);
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
  var ____x1051 = almost(args);
  var ____i72 = 0;
  while (____i72 < _35(____x1051)) {
    var __x1052 = ____x1051[____i72];
    var ____y8 = lower(__x1052, hoist, stmt63);
    if (yes(____y8)) {
      var __e13 = ____y8;
      if (standalone63(__e13)) {
        add(hoist, __e13);
      }
    }
    ____i72 = ____i72 + 1;
  }
  var __e14 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e14)) {
    return ["%return", __e14];
  } else {
    return __e14;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id151 = args;
  var __lh4 = has(____id151, 0);
  var __rh4 = has(____id151, 1);
  var __lh11 = lower(__lh4, hoist);
  var __rh11 = lower(__rh4, hoist);
  add(hoist, ["%set", __lh11, __rh11]);
  if (!( stmt63 && ! tail63 || false)) {
    return __lh11;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id152 = args;
  var __cond8 = has(____id152, 0);
  var __then = has(____id152, 1);
  var ___else = has(____id152, 2);
  if (stmt63) {
    var __e146 = undefined;
    if (is63(___else)) {
      __e146 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond8, hoist), lower_body([__then], tail63)], __e146));
  } else {
    var __e15 = unique("e");
    add(hoist, ["%local", __e15, "nil"]);
    var __e145 = undefined;
    if (is63(___else)) {
      __e145 = [lower(["%set", __e15, ___else])];
    }
    add(hoist, join(["%if", lower(__cond8, hoist), lower(["%set", __e15, __then])], __e145));
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      return ["%id", __e15];
    } else {
      return __e15;
    }
  }
};
var lower_short = function (x, args, hoist) {
  var ____id153 = args;
  var __a31 = has(____id153, 0);
  var __b10 = has(____id153, 1);
  var __hoist1 = [];
  var __b11 = lower(__b10, __hoist1);
  if (some63(__hoist1)) {
    var __id154 = unique("id");
    var __e147 = undefined;
    if (x === "%and") {
      __e147 = ["%if", __id154, __b10, __id154];
    } else {
      __e147 = ["%if", __id154, __id154, __b10];
    }
    return lower(["%do", ["%local", __id154, __a31], __e147], hoist);
  } else {
    return [x, lower(__a31, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id155 = args;
  var __c15 = has(____id155, 0);
  var __body80 = cut(____id155, 1);
  var __pre1 = [];
  var __c16 = lower(__c15, __pre1);
  var __e148 = undefined;
  if (none63(__pre1)) {
    __e148 = ["%while", __c16, lower_body(__body80)];
  } else {
    __e148 = ["%while", true, join(["%do"], __pre1, [["%if", ["%not", __c16], ["%break"]], lower_body(__body80)])];
  }
  return add(hoist, __e148);
};
var lower_for = function (args, hoist) {
  var ____id156 = args;
  var __h = has(____id156, 0);
  var __k62 = has(____id156, 1);
  var __body81 = cut(____id156, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k62, lower_body(__body81)], props(__body81)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id157 = args;
  var __h1 = has(____id157, 0);
  var __body82 = cut(____id157, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body82, tail63)], props(__body82)));
  } else {
    var __e16 = unique("e");
    add(hoist, ["%local", __e16]);
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e16, join(["%do"], __body82)])], props(__body82)));
    return __e16;
  }
};
var lower_block = function (kind, args, hoist, stmt63, tail63) {
  var ____id158 = args;
  var __name24 = has(____id158, 0);
  var __h2 = has(____id158, 1);
  var __body83 = cut(____id158, 2);
  return add(hoist, [kind, __name24, lower(__h2, hoist), lower_body(__body83, tail63)]);
};
var lower_from = function (args, hoist, stmt63, tail63) {
  var ____id159 = args;
  var __name25 = has(____id159, 0);
  var __import_ = has(____id159, 1);
  var __id160 = has(____id159, 2);
  var __as_ = has(____id159, 3);
  var __alias = has(____id159, 4);
  add(hoist, join(["from"], args));
  return __alias || __id160;
};
var lower_import = function (__x1086, hoist, stmt63, tail63) {
  var ____id161 = __x1086;
  var __name26 = has(____id161, 0);
  var __alias1 = cut(____id161, 1);
  var __e149 = undefined;
  if (hd(__alias1) === "as") {
    __e149 = __alias1[1];
  } else {
    __e149 = hd(__alias1);
  }
  var __as = __e149;
  var __id162 = __as || __name26;
  add(hoist, join(["import", __name26], __alias1));
  if (! stmt63) {
    return __id162;
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
    var __f5 = unique("f");
    return lower(["%do", join(["%local-function", __f5], args), __f5], hoist);
  } else {
    var ____id163 = args;
    var __a32 = has(____id163, 0);
    var __body84 = cut(____id163, 1);
    return join(["%function", __a32, lower_body(__body84, true)], props(__body84));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id164 = args;
  var __name27 = has(____id164, 0);
  var __args63 = has(____id164, 1);
  var __body85 = cut(____id164, 2);
  return add(hoist, join([kind, __name27, __args63, lower_body(__body85, true)], props(__body85)));
};
var lower_call = function (form, hoist) {
  var __form12 = map(function (x) {
    return lower(x, hoist);
  }, form);
  if (some63(__form12)) {
    return __form12;
  }
};
var pairwise63 = function (form) {
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"]);
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e17 = [];
    var ____id165 = form;
    var __x1093 = has(____id165, 0);
    var __args64 = cut(____id165, 1);
    reduce(function (a, b) {
      add(__e17, [__x1093, a, b]);
      return a;
    }, __args64);
    return join(["%and"], reverse(__e17));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form13 = lower_pairwise(form);
  var ____id166 = __form13;
  var __x1096 = has(____id166, 0);
  var __args65 = cut(____id166, 1);
  return lower(reduce(function (a, b) {
    return [__x1096, b, a];
  }, reverse(__args65)), hoist);
};
var lower_special = function (form, hoist) {
  var __e18 = lower_call(form, hoist);
  if (__e18) {
    return add(hoist, __e18);
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
          var ____id167 = form;
          var __x1099 = has(____id167, 0);
          var __args66 = cut(____id167, 1);
          if (__x1099 === "%do") {
            return lower_do(__args66, hoist, stmt63, tail63);
          } else {
            if (__x1099 === "%call") {
              return lower(__args66, hoist, stmt63, tail63);
            } else {
              if (__x1099 === "%set") {
                return lower_set(__args66, hoist, stmt63, tail63);
              } else {
                if (__x1099 === "%if") {
                  return lower_if(__args66, hoist, stmt63, tail63);
                } else {
                  if (__x1099 === "%try") {
                    return lower_try(__args66, hoist, tail63);
                  } else {
                    if (__x1099 === "%while") {
                      return lower_while(__args66, hoist);
                    } else {
                      if (__x1099 === "%for") {
                        return lower_for(__args66, hoist);
                      } else {
                        if (__x1099 === "%with") {
                          return lower_with(__args66, hoist, stmt63, tail63);
                        } else {
                          if (__x1099 === "%block") {
                            return lower_block("%block", __args66, hoist, stmt63, tail63);
                          } else {
                            if (__x1099 === "%cases") {
                              return lower_cases(__args66, hoist, stmt63, tail63);
                            } else {
                              if (__x1099 === "import") {
                                return lower_import(__args66, hoist, stmt63, tail63);
                              } else {
                                if (__x1099 === "from") {
                                  return lower_from(__args66, hoist, stmt63, tail63);
                                } else {
                                  if (__x1099 === "%function") {
                                    return lower_function(__args66, hoist);
                                  } else {
                                    if (__x1099 === "%local-function" || __x1099 === "%global-function") {
                                      return lower_definition(__x1099, __args66, hoist);
                                    } else {
                                      if (in63(__x1099, ["%and", "%or"])) {
                                        return lower_short(__x1099, __args66, hoist);
                                      } else {
                                        if (statement63(__x1099)) {
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
var __e150 = undefined;
if (typeof(global) === "undefined") {
  var __e151 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e151 = window;
  } else {
    var __e152 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e152 = self;
    } else {
      __e152 = this;
    }
    __e151 = __e152;
  }
  global = __e151;
  __e150 = global;
}
var __e153 = undefined;
if (!( typeof(require) === "undefined")) {
  global.require = require;
  global.require;
  var __e154 = undefined;
  if (!( typeof(__module1) === "undefined")) {
    __module1.filename = require("path").resolve("repl");
    __module1.filename;
    __module1.paths = require("module")._nodeModulePaths(__module1.filename);
    __e154 = __module1.paths;
  }
  __e153 = __e154;
}
var run = function (code, context) {
  var __f6 = new Function("with(this) {\n" + (code + "\n}"));
  return __f6.call(either(context, global));
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
var ___37do__special = function (..._42args) {
  var __forms10 = unstash([..._42args]);
  var __s8 = "";
  var ____x1106 = __forms10;
  var ____i74 = 0;
  while (____i74 < _35(____x1106)) {
    var __x1107 = ____x1106[____i74];
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" && (immediate_call63(__x1107) && "\n" === char(__s8, edge(__s8)))) {
      __s8 = clip(__s8, 0, edge(__s8)) + ";\n";
    }
    __s8 = __s8 + compile(__x1107, {
      _stash: true,
      stmt: true
    });
    if (! atom63(__x1107)) {
      if (hd(__x1107) === "%return" || hd(__x1107) === "%break") {
        break;
      }
    }
    ____i74 = ____i74 + 1;
  }
  return __s8;
};
setenv("%do", {
  _stash: true,
  special: ___37do__special,
  stmt: true,
  tr: true
});
var ___37cmake_block__special = function (body) {
  var __ind3 = indentation();
  var __s10 = "";
  __s10 = __s10 + (__ind3 + "block(SCOPE_FOR VARIABLES)\n");
  __s10 = __s10 + compile_body(body);
  __s10 = __s10 + (__ind3 + "endblock()\n");
  return __s10;
};
setenv("%cmake-block", {
  _stash: true,
  special: ___37cmake_block__special,
  stmt: true,
  tr: true
});
var ___37if__special = function (cond, cons, alt) {
  var __cond10 = compile(cond);
  var __cons1 = compile_body(cons);
  var __e155 = undefined;
  if (alt) {
    __e155 = compile_body(alt);
  }
  var __alt1 = __e155;
  var __ind5 = indentation();
  var __s121 = "";
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __s121 = __s121 + (__ind5 + ("if (" + (__cond10 + (") {\n" + (__cons1 + (__ind5 + "}"))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __s121 = __s121 + (__ind5 + ("if " + (__cond10 + (":\n" + __cons1))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        __s121 = __s121 + (__ind5 + ("if(" + (__cond10 + (")\n" + __cons1))));
      } else {
        __s121 = __s121 + (__ind5 + ("if " + (__cond10 + (" then\n" + __cons1))));
      }
    }
  }
  if (__alt1 && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __s121 = __s121 + (" else {\n" + (__alt1 + (__ind5 + "}")));
  } else {
    if (__alt1 && has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __s121 = __s121 + (__ind5 + ("else:\n" + __alt1));
    } else {
      if (__alt1 && has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        __s121 = __s121 + (__ind5 + ("else()\n" + __alt1));
      } else {
        if (__alt1) {
          __s121 = __s121 + (__ind5 + ("else\n" + __alt1));
        }
      }
    }
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    return __s121 + (__ind5 + "end\n");
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __s121 + "\n";
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        return __s121 + (__ind5 + "endif()\n");
      } else {
        return __s121;
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
  var __cond12 = compile(cond);
  var __body87 = compile_body(form);
  var __ind7 = indentation();
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __ind7 + ("while (" + (__cond12 + (") {\n" + (__body87 + (__ind7 + "}\n")))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind7 + ("while " + (__cond12 + (":\n" + __body87)));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        return __ind7 + ("while(" + (__cond12 + (")\n" + (__body87 + (__ind7 + "endwhile()\n")))));
      } else {
        return __ind7 + ("while " + (__cond12 + (" do\n" + (__body87 + (__ind7 + "end\n")))));
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
  var ____r404 = unstash([..._42args]);
  var __t9 = destash33(t, ____r404);
  var __k65 = destash33(k, ____r404);
  var __form15 = destash33(form, ____r404);
  var ____id169 = ____r404;
  var __async2 = has(____id169, "async");
  var __t10 = compile(__t9);
  var __k66 = compile(__k65);
  var __ind9 = indentation();
  var __body89 = compile_body(__form15);
  var __e156 = undefined;
  if (__async2) {
    __e156 = "async ";
  } else {
    __e156 = "";
  }
  var __a34 = __e156;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    return __ind9 + ("for " + (__k66 + (" in next, " + (__t10 + (" do\n" + (__body89 + (__ind9 + "end\n")))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind9 + (__a34 + ("for " + (__k66 + (" in " + (__t10 + (":\n" + __body89))))));
    } else {
      return __ind9 + ("for (" + (__k66 + (" in " + (__t10 + (") {\n" + (__body89 + (__ind9 + "}\n")))))));
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
  var ____r406 = unstash([..._42args]);
  var __t13 = destash33(t, ____r406);
  var __form17 = destash33(form, ____r406);
  var ____id171 = ____r406;
  var __async4 = has(____id171, "async");
  var __t14 = compile(__t13);
  var __ind11 = indentation();
  var __body91 = compile_body(__form17);
  var __e157 = undefined;
  if (__async4) {
    __e157 = "async ";
  } else {
    __e157 = "";
  }
  var __a36 = __e157;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return __ind11 + (__a36 + ("with " + (__t14 + (":\n" + __body91))));
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
  var __t16 = compile(t);
  var __ind13 = indentation();
  var __body93 = compile_body(form);
  var __e158 = undefined;
  if (some63(__t16)) {
    __e158 = " ";
  } else {
    __e158 = "";
  }
  var __sep1 = __e158;
  var __e159 = undefined;
  if (some63(__t16)) {
    __e159 = "(";
  } else {
    __e159 = "";
  }
  var __lh6 = __e159;
  var __e160 = undefined;
  if (some63(__t16)) {
    __e160 = ")";
  } else {
    __e160 = "";
  }
  var __rh6 = __e160;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return __ind13 + (name + (__sep1 + (__t16 + (":\n" + __body93))));
  } else {
    return __ind13 + (name + (__sep1 + (__lh6 + (__t16 + (__rh6 + (__sep1 + ("{\n" + (__body93 + (__ind13 + "}\n")))))))));
  }
};
setenv("%block", {
  _stash: true,
  special: ___37block__special,
  stmt: true,
  tr: true
});
var ___37try__special = function (form) {
  var __ind15 = indentation();
  var __body95 = compile_body(form);
  var __e161 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e161 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", false, ["%get", "e", 1], "e"]]];
  } else {
    __e161 = ["%return", ["%array", false, "e"]];
  }
  var __hf1 = __e161;
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") + 1;
  var ____x1133 = compile(__hf1, {
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
  var __h4 = ____x1133;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __ind15 + ("try {\n" + (__body95 + (__ind15 + ("}\n" + (__ind15 + ("catch (e) {\n" + (__h4 + (__ind15 + "}\n"))))))));
  } else {
    return __ind15 + ("try:\n" + (__body95 + (__ind15 + ("except:\n" + __h4))));
  }
};
setenv("%try", {
  _stash: true,
  special: ___37try__special,
  stmt: true,
  tr: true
});
var ___37delete__special = function (place) {
  var __e162 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e162 = "del ";
  } else {
    __e162 = "delete ";
  }
  return indentation() + (__e162 + compile(place));
};
setenv("%delete", {
  _stash: true,
  special: ___37delete__special,
  stmt: true
});
var ___37break__special = function () {
  var __e163 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e163 = "()";
  } else {
    __e163 = "";
  }
  return indentation() + ("break" + __e163);
};
setenv("%break", {
  _stash: true,
  special: ___37break__special,
  stmt: true
});
var ___37function__special = function (args, ..._42args) {
  var ____r416 = unstash([..._42args]);
  var __args68 = destash33(args, ____r416);
  var ____id173 = ____r416;
  var __body97 = cut(____id173, 0);
  return apply(compile_function, join([__args68], __body97, []));
};
setenv("%function", {
  _stash: true,
  special: ___37function__special
});
var ___37global_function__special = function (name, args, ..._42args) {
  var ____r418 = unstash([..._42args]);
  var __name29 = destash33(name, ____r418);
  var __args70 = destash33(args, ____r418);
  var ____id175 = ____r418;
  var __body99 = cut(____id175, 0);
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
    var ____x1148 = object([__args70]);
    ____x1148.name = __name29;
    var ____x1149 = object([]);
    ____x1149.name = __name29;
    var __x1147 = apply(compile_function, join(____x1148, __body99, ____x1149));
    return indentation() + __x1147;
  } else {
    return compile(["%set", __name29, join(["%function", __args70], __body99)], {
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
  var ____r420 = unstash([..._42args]);
  var __name31 = destash33(name, ____r420);
  var __args72 = destash33(args, ____r420);
  var ____id177 = ____r420;
  var __body101 = cut(____id177, 0);
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
    var ____x1160 = object([__args72]);
    ____x1160.name = __name31;
    ____x1160.prefix = "local";
    var ____x1161 = object([]);
    ____x1161.name = __name31;
    ____x1161.prefix = "local";
    var __x1159 = apply(compile_function, join(____x1160, __body101, ____x1161));
    return indentation() + __x1159;
  } else {
    return compile(["%local", __name31, join(["%function", __args72], __body101)], {
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
  return "${" + (compile_id(tostr(variable)) + "}");
};
setenv("%ref", {
  _stash: true,
  special: ___37ref__special
});
var ___37id__special = function (variable) {
  return escape(compile(["%ref", variable]));
};
setenv("%id", {
  _stash: true,
  special: ___37id__special
});
var ___37return__special = function (x) {
  var __e164 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    var __e166 = undefined;
    if (nil63(x)) {
      __e166 = ["return"];
    } else {
      __e166 = ["return", "PROPAGATE", x];
    }
    __e164 = compile(__e166);
  } else {
    var __e165 = undefined;
    if (nil63(x)) {
      __e165 = "return";
    } else {
      __e165 = "return " + compile(x);
    }
    __e164 = __e165;
  }
  return indentation() + __e164;
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
  var __e167 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e167 = "throw " + compile(["%new", ["Error", x]]);
  } else {
    var __e168 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e168 = "raise " + compile(["Exception", x]);
    } else {
      __e168 = "error(" + (compile(x) + ")");
    }
    __e167 = __e168;
  }
  var __e34 = __e167;
  return indentation() + __e34;
};
setenv("%error", {
  _stash: true,
  special: ___37error__special,
  stmt: true
});
var ___37throw__special = function (x) {
  var __e169 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e169 = "throw " + compile(x);
  } else {
    var __e170 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e170 = "raise " + compile(x);
    } else {
      __e170 = "error(" + (compile(x) + ")");
    }
    __e169 = __e170;
  }
  var __e38 = __e169;
  return indentation() + __e38;
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
  var __id179 = compile(name);
  var __value12 = compile(value);
  var __e171 = undefined;
  if (is63(value)) {
    __e171 = " = " + __value12;
  } else {
    __e171 = "";
  }
  var __rh8 = __e171;
  var __e172 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e172 = "var ";
  } else {
    var __e173 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e173 = "local ";
    } else {
      __e173 = "";
    }
    __e172 = __e173;
  }
  var __keyword3 = __e172;
  var __ind17 = indentation();
  return __ind17 + (__keyword3 + (__id179 + __rh8));
};
setenv("%local", {
  _stash: true,
  special: ___37local__special,
  stmt: true
});
var ___37set__special = function (lh, rh) {
  var __lh8 = compile(lh);
  var __e174 = undefined;
  if (nil63(rh)) {
    __e174 = "nil";
  } else {
    __e174 = rh;
  }
  var __rh10 = compile(__e174);
  var __ind19 = indentation();
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    return indentation() + ("set(" + (__lh8 + (" " + (__rh10 + ")"))));
  } else {
    return indentation() + (__lh8 + (" = " + __rh10));
  }
};
setenv("%set", {
  _stash: true,
  special: ___37set__special,
  stmt: true
});
var ___37get__special = function (t, k) {
  var __t121 = compile(t);
  var __k121 = compile(k);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && char(__t121, 0) === "{" || infix_operator63(t)) {
    __t121 = "(" + (__t121 + ")");
  }
  if (string_literal63(k) && (valid_id63(inner(k)) && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py"))) {
    return __t121 + ("." + inner(k));
  } else {
    return __t121 + ("[" + (__k121 + "]"));
  }
};
setenv("%get", {
  _stash: true,
  special: ___37get__special
});
var ___37idx__special = function (t, k) {
  var __t141 = compile(t);
  var __k141 = compile(k, "raw");
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && char(__t141, 0) === "{" || infix_operator63(t)) {
    __t141 = "(" + (__t141 + ")");
  }
  return __t141 + ("." + __k141);
};
setenv("%idx", {
  _stash: true,
  special: ___37idx__special
});
var ___37array__special = function (..._42args) {
  var __forms12 = unstash([..._42args]);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    return mapcat(compile, __forms12, " ");
  } else {
    var __e175 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e175 = "{";
    } else {
      __e175 = "[";
    }
    var __open1 = __e175;
    var __e176 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e176 = "}";
    } else {
      __e176 = "]";
    }
    var __close1 = __e176;
    var __s14 = "";
    var __c18 = "";
    var ____o40 = __forms12;
    var __k69 = undefined;
    for (__k69 in ____o40) {
      var __v46 = ____o40[__k69];
      var __e177 = undefined;
      if (numeric63(__k69)) {
        __e177 = parseInt(__k69);
      } else {
        __e177 = __k69;
      }
      var __k70 = __e177;
      if (number63(__k70)) {
        __s14 = __s14 + (__c18 + compile(__v46));
        __c18 = ", ";
      }
    }
    return __open1 + (__s14 + __close1);
  }
};
setenv("%array", {
  _stash: true,
  special: ___37array__special
});
var ___37object__special = function (..._42args) {
  var __forms14 = unstash([..._42args]);
  var __e178 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e178 = "";
  } else {
    __e178 = "{";
  }
  var __s16 = __e178;
  var __c20 = "";
  var __e179 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    __e179 = " = ";
  } else {
    var __e180 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e180 = " ";
    } else {
      __e180 = ": ";
    }
    __e179 = __e180;
  }
  var __sep3 = __e179;
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") + 1;
  var ____x1185 = indentation();
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") - 1;
  var __ind21 = ____x1185;
  var __e181 = undefined;
  if (_35(__forms14) > 2) {
    __e181 = "\n" + __ind21;
  }
  var __pad1 = __e181;
  var __e182 = undefined;
  if (is63(__pad1)) {
    __e182 = "\n" + indentation();
  } else {
    __e182 = "";
  }
  var __end1 = __e182;
  __s16 = __s16 + either(__pad1, "");
  var ____x1186 = pair(__forms14);
  var ____i78 = 0;
  while (____i78 < _35(____x1186)) {
    var ____id181 = ____x1186[____i78];
    var __k72 = has(____id181, 0);
    var __v48 = has(____id181, 1);
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x1187 = compile(__v48);
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    __s16 = __s16 + (__c20 + (key(__k72) + (__sep3 + ____x1187)));
    var __e183 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e183 = "";
    } else {
      __e183 = ",";
    }
    __c20 = __e183 + either(__pad1, " ");
    ____i78 = ____i78 + 1;
  }
  var __e184 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e184 = "";
  } else {
    __e184 = "}";
  }
  return __s16 + (__end1 + __e184);
};
setenv("%object", {
  _stash: true,
  special: ___37object__special
});
var ___37list__special = function (form, comps, cond, ..._42args) {
  var ____r444 = unstash([..._42args]);
  var __form19 = destash33(form, ____r444);
  var __comps5 = destash33(comps, ____r444);
  var __cond14 = destash33(cond, ____r444);
  var ____id185 = ____r444;
  var __kind5 = has(____id185, "kind");
  var __s18 = compile(__form19);
  var __e185 = undefined;
  if (__kind5 === "object") {
    __e185 = ["{", "}"];
  } else {
    __e185 = ["[", "]"];
  }
  var ____id186 = __e185;
  var __lh10 = has(____id186, 0);
  var __rh12 = has(____id186, 1);
  if (!( __kind5 === "object")) {
    __s18 = "(" + (__s18 + ")");
  }
  var ____x1195 = __comps5;
  var ____i80 = 0;
  while (____i80 < _35(____x1195)) {
    var ____id187 = ____x1195[____i80];
    var __k74 = has(____id187, 0);
    var __v50 = has(____id187, 1);
    __s18 = __s18 + (" for " + (compile(__k74) + (" in " + compile(__v50))));
    ____i80 = ____i80 + 1;
  }
  if (is63(__cond14)) {
    __s18 = __s18 + (" if " + compile(__cond14));
  }
  return __lh10 + (__s18 + __rh12);
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
  var __args74 = unstash([..._42args]);
  return mapcat(compile_literal, __args74);
};
setenv("%literal", {
  _stash: true,
  special: ___37literal__special
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
  var ____r449 = unstash([..._42args]);
  var __name33 = destash33(name, ____r449);
  var ____id190 = ____r449;
  var __alias3 = cut(____id190, 0);
  var __ind23 = indentation();
  var __e186 = undefined;
  if (hd(__alias3) === "as") {
    __e186 = __alias3[1];
  } else {
    __e186 = hd(__alias3);
  }
  var __as2 = __e186;
  var __id191 = __as2 || __name33;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __s20 = __ind23 + ("import " + compile(__name33));
    if (__as2) {
      __s20 = __s20 + (" as " + compile(__id191));
    }
    return __s20;
  } else {
    return __ind23 + compile(["%local", __id191, ["require", escape(__name33)]]);
  }
};
setenv("import", {
  _stash: true,
  special: __import__special,
  stmt: true
});
var __from__special = function (name, ..._42args) {
  var ____r453 = unstash([..._42args]);
  var __name35 = destash33(name, ____r453);
  var ____id194 = ____r453;
  var __imports1 = cut(____id194, 0);
  var __ind25 = indentation();
  var __id195 = __name35;
  var __r454 = undefined;
  __r454 = drop(__imports1);
  var __e187 = undefined;
  if (last(__imports1) === "as") {
    __e187 = drop(__imports1);
  } else {
    add(__imports1, __r454);
    __r454 = undefined;
    __e187 = __r454;
  }
  var __as4 = __r454;
  var __e188 = undefined;
  if (hd(__imports1) === "import") {
    __e188 = tl(__imports1);
  } else {
    __e188 = __imports1;
  }
  var __names13 = __e188;
  var __names14 = mapcat(function (x) {
    if (x === "*") {
      return x;
    } else {
      return compile(x);
    }
  }, __names13, ", ");
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __s22 = __ind25 + ("from " + (compile(__name35) + (" import " + __names14)));
    if (__as4) {
      __s22 = __s22 + (" as " + compile(__as4));
    }
    return __s22;
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
  var __args76 = unstash([..._42args]);
  if (none63(__args76)) {
    return ", ";
  } else {
    if (one63(__args76)) {
      return ", " + compile(hd(__args76));
    } else {
      return mapcat(compile, __args76, ", ");
    }
  }
};
setenv(",", {
  _stash: true,
  special: ___44__special
});
var __3458__special34 = function (..._42args) {
  var __args78 = unstash([..._42args]);
  if (none63(__args78)) {
    return ":";
  } else {
    if (one63(__args78)) {
      return ":" + compile(hd(__args78));
    } else {
      return mapcat(compile, __args78, ":");
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
  var __args80 = unstash([..._42args]);
  return indentation() + ("yield " + mapcat(compile, __args80, ", "));
};
setenv("yield", {
  _stash: true,
  special: __yield__special,
  stmt: true
});
var __await__special = function (x) {
  var __e189 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    __e189 = "";
  } else {
    __e189 = "await ";
  }
  var __a38 = __e189;
  return __a38 + compile(x);
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
__exports1.run = run;
__exports1.run;
__exports1["eval"] = _eval;
__exports1.eval = _eval;
__exports1.eval;
__exports1.expand = expand;
__exports1.expand;
__exports1.compile = compile;
__exports1.compile;
pymen.compiler = __exports1;
exports.pymen = pymen;
