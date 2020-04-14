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
      var __e50 = undefined;
      if (numeric63(__k)) {
        __e50 = parseInt(__k);
      } else {
        __e50 = __k;
      }
      var __k1 = __e50;
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
      var __e51 = undefined;
      if (numeric63(__k2)) {
        __e51 = parseInt(__k2);
      } else {
        __e51 = __k2;
      }
      var __k3 = __e51;
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
    var __e52 = undefined;
    if (numeric63(__k4)) {
      __e52 = parseInt(__k4);
    } else {
      __e52 = __k4;
    }
    var __k5 = __e52;
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
  var __e53 = undefined;
  if (nil63(from) || from < 0) {
    __e53 = 0;
  } else {
    __e53 = from;
  }
  var __i3 = __e53;
  var __n4 = _35(x);
  var __e54 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e54 = __n4;
  } else {
    __e54 = upto;
  }
  var __upto1 = __e54;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e55 = undefined;
    if (numeric63(__k6)) {
      __e55 = parseInt(__k6);
    } else {
      __e55 = __k6;
    }
    var __k7 = __e55;
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
    var __e56 = undefined;
    if (numeric63(__k8)) {
      __e56 = parseInt(__k8);
    } else {
      __e56 = __k8;
    }
    var __k9 = __e56;
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
      var __e57 = undefined;
      if (numeric63(__k10)) {
        __e57 = parseInt(__k10);
      } else {
        __e57 = __k10;
      }
      var __k11 = __e57;
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
reduce = function (f, x) {
  if (none63(x)) {
    return undefined;
  } else {
    if (one63(x)) {
      return hd(x);
    } else {
      return f(hd(x), reduce(f, tl(x)));
    }
  }
};
join = function () {
  var __ls = unstash(Array.prototype.slice.call(arguments, 0));
  var __r47 = [];
  var ____x2 = __ls;
  var ____i8 = 0;
  while (____i8 < _35(____x2)) {
    var __l3 = ____x2[____i8];
    if (__l3) {
      var __n9 = _35(__r47);
      var ____o6 = __l3;
      var __k12 = undefined;
      for (__k12 in ____o6) {
        var __v6 = ____o6[__k12];
        var __e58 = undefined;
        if (numeric63(__k12)) {
          __e58 = parseInt(__k12);
        } else {
          __e58 = __k12;
        }
        var __k13 = __e58;
        if (number63(__k13)) {
          __k13 = __k13 + __n9;
        } else {
          __l3 = object(__l3);
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
    var __x3 = ____o7[____i10];
    var __e59 = undefined;
    if (numeric63(____i10)) {
      __e59 = parseInt(____i10);
    } else {
      __e59 = ____i10;
    }
    var ____i101 = __e59;
    var __y = f(__x3);
    if (__y) {
      return __y;
    }
  }
};
first = function (f, l) {
  var ____x4 = l;
  var ____i11 = 0;
  while (____i11 < _35(____x4)) {
    var __x5 = ____x4[____i11];
    var __y1 = f(__x5);
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
  var ____x7 = x;
  var ____i13 = 0;
  while (____i13 < _35(____x7)) {
    var __v7 = ____x7[____i13];
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
    var __e60 = undefined;
    if (numeric63(__k14)) {
      __e60 = parseInt(__k14);
    } else {
      __e60 = __k14;
    }
    var __k15 = __e60;
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
  var ____x8 = x;
  var ____i15 = 0;
  while (____i15 < _35(____x8)) {
    var __v9 = ____x8[____i15];
    var __e61 = undefined;
    if (f) {
      __e61 = f(__v9);
    } else {
      __e61 = __v9;
    }
    var __y4 = __e61;
    if (is63(__y4)) {
      __r58 = __r58 + (__c + __y4);
      __c = sep || "";
    }
    ____i15 = ____i15 + 1;
  }
  return __r58;
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
    var __e62 = undefined;
    if (numeric63(__k16)) {
      __e62 = parseInt(__k16);
    } else {
      __e62 = __k16;
    }
    var __k17 = __e62;
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
    var __x9 = ____o10[____i17];
    var __e63 = undefined;
    if (numeric63(____i17)) {
      __e63 = parseInt(____i17);
    } else {
      __e63 = ____i17;
    }
    var ____i171 = __e63;
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
      var __e64 = undefined;
      if (numeric63(__k18)) {
        __e64 = parseInt(__k18);
      } else {
        __e64 = __k18;
      }
      var __k19 = __e64;
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
        var __e66 = undefined;
        if (numeric63(__k20)) {
          __e66 = parseInt(__k20);
        } else {
          __e66 = __k20;
        }
        var __k21 = __e66;
        if (!( __k21 === "_stash")) {
          __args1[__k21] = __v12;
        }
      }
      if (params) {
        var ____o13 = params;
        var __k22 = undefined;
        for (__k22 in ____o13) {
          var __v13 = ____o13[__k22];
          var __e67 = undefined;
          if (numeric63(__k22)) {
            __e67 = parseInt(__k22);
          } else {
            __e67 = __k22;
          }
          var __k23 = __e67;
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
          var __e65 = undefined;
          if (numeric63(__k24)) {
            __e65 = parseInt(__k24);
          } else {
            __e65 = __k24;
          }
          var __k25 = __e65;
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
      var __e68 = undefined;
      if (numeric63(__k26)) {
        __e68 = parseInt(__k26);
      } else {
        __e68 = __k26;
      }
      var __k27 = __e68;
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
  var __e69 = undefined;
  if (is63(pos)) {
    __e69 = clip(str, pos);
  } else {
    __e69 = str;
  }
  var __str = __e69;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_starts63 = function (str, x, pos) {
  var __e70 = undefined;
  if (is63(pos)) {
    __e70 = clip(str, pos);
  } else {
    __e70 = str;
  }
  var __str1 = __e70;
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
var tostr = function (x) {
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
cat = function () {
  var __xs = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (a, b) {
    return cat2(a, b);
  }, __xs), "");
};
_43 = function () {
  var __xs1 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (a, b) {
    return a + b;
  }, __xs1), 0);
};
_45 = function () {
  var __xs2 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (b, a) {
    return a - b;
  }, reverse(__xs2)), 0);
};
_42 = function () {
  var __xs3 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (a, b) {
    return a * b;
  }, __xs3), 1);
};
_47 = function () {
  var __xs4 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (b, a) {
    return a / b;
  }, reverse(__xs4)), 1);
};
_37 = function () {
  var __xs5 = unstash(Array.prototype.slice.call(arguments, 0));
  return either(reduce(function (b, a) {
    return a % b;
  }, reverse(__xs5)), 0);
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
_60 = function () {
  var __xs6 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a < b;
  }, __xs6);
};
_62 = function () {
  var __xs7 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a > b;
  }, __xs7);
};
_61 = function () {
  var __xs8 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a === b;
  }, __xs8);
};
_6061 = function () {
  var __xs9 = unstash(Array.prototype.slice.call(arguments, 0));
  return pairwise(function (a, b) {
    return a <= b;
  }, __xs9);
};
_6261 = function () {
  var __xs10 = unstash(Array.prototype.slice.call(arguments, 0));
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
escape = function (s) {
  if (nil63(search(s, "\n")) && (nil63(search(s, "\r")) && (nil63(search(s, "\"")) && nil63(search(s, "\\"))))) {
    return "\"" + (s + "\"");
  } else {
    var __s1 = "\"";
    var __i27 = 0;
    while (__i27 < _35(s)) {
      var __c1 = char(s, __i27);
      var __e71 = undefined;
      if (__c1 === "\n") {
        __e71 = "\\n";
      } else {
        var __e72 = undefined;
        if (__c1 === "\r") {
          __e72 = "\\r";
        } else {
          var __e73 = undefined;
          if (__c1 === "\"") {
            __e73 = "\\\"";
          } else {
            var __e74 = undefined;
            if (__c1 === "\\") {
              __e74 = "\\\\";
            } else {
              __e74 = __c1;
            }
            __e73 = __e74;
          }
          __e72 = __e73;
        }
        __e71 = __e72;
      }
      var __c11 = __e71;
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
                        var __e75 = undefined;
                        if (numeric63(__k28)) {
                          __e75 = parseInt(__k28);
                        } else {
                          __e75 = __k28;
                        }
                        var __k29 = __e75;
                        if (number63(__k29)) {
                          __xs11[__k29] = str(__v16, repr, __l6);
                        } else {
                          add(__ks, [__k29 + ":", str(__v16, repr, __l6)]);
                        }
                      }
                      sort(__ks, function (__x11, __x12) {
                        var ____id = __x11;
                        var __a2 = has(____id, 0);
                        var ____id1 = __x12;
                        var __b2 = has(____id1, 0);
                        return __a2 < __b2;
                      });
                      drop(__l6);
                      var ____x13 = __xs11;
                      var ____i29 = 0;
                      while (____i29 < _35(____x13)) {
                        var __v17 = ____x13[____i29];
                        __s = __s + (__sp + __v17);
                        __sp = " ";
                        ____i29 = ____i29 + 1;
                      }
                      var ____x14 = __ks;
                      var ____i30 = 0;
                      while (____i30 < _35(____x14)) {
                        var ____id2 = ____x14[____i30];
                        var __k30 = has(____id2, 0);
                        var __v18 = has(____id2, 1);
                        __s = __s + (__sp + (__k30 + (" " + __v18)));
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
};
apply = function (f, args) {
  var __args = stash(args);
  return f.apply(f, __args);
};
call = function (f) {
  var ____r92 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f1 = destash33(f, ____r92);
  var ____id3 = ____r92;
  var __args12 = cut(____id3, 0);
  return apply(__f1, __args12);
};
setenv = function (k) {
  var ____r93 = unstash(Array.prototype.slice.call(arguments, 1));
  var __k31 = destash33(k, ____r93);
  var ____id4 = ____r93;
  var __keys = cut(____id4, 0);
  if (string63(__k31)) {
    var __e76 = undefined;
    if (has63(__keys, "toplevel")) {
      __e76 = hd(environment);
    } else {
      __e76 = last(environment);
    }
    var __frame = __e76;
    var __e77 = undefined;
    if (has63(__frame, __k31)) {
      __e77 = __frame[__k31];
    } else {
      __e77 = {};
    }
    var __entry = __e77;
    var ____o17 = __keys;
    var __k32 = undefined;
    for (__k32 in ____o17) {
      var __v19 = ____o17[__k32];
      var __e78 = undefined;
      if (numeric63(__k32)) {
        __e78 = parseInt(__k32);
      } else {
        __e78 = __k32;
      }
      var __k33 = __e78;
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
setenv("quote", {
  _stash: true,
  macro: function (form) {
    return quoted(form);
  }
});
setenv("quasiquote", {
  _stash: true,
  macro: function (form) {
    return quasiexpand(form, 1);
  }
});
setenv("set", {
  _stash: true,
  macro: function () {
    var __args3 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%do"], map(function (__x24) {
      var ____id6 = __x24;
      var __lh1 = has(____id6, 0);
      var __rh1 = has(____id6, 1);
      __lh1 = macroexpand(__lh1);
      if (! atom63(__lh1) && hd(__lh1) === "has") {
        return ["%set", join(["%get"], tl(__lh1)), __rh1];
      } else {
        return ["%set", __lh1, __rh1];
      }
    }, pair(__args3)));
  }
});
setenv("at", {
  _stash: true,
  macro: function (l, i) {
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
  }
});
setenv("wipe", {
  _stash: true,
  macro: function (place) {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return ["set", place, "nil"];
    } else {
      return ["%delete", place];
    }
  }
});
setenv("list", {
  _stash: true,
  macro: function () {
    var __body2 = unstash(Array.prototype.slice.call(arguments, 0));
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
      var __x49 = unique("x");
      var __l10 = [];
      var __forms1 = [];
      var ____o19 = __body2;
      var __k36 = undefined;
      for (__k36 in ____o19) {
        var __v21 = ____o19[__k36];
        var __e79 = undefined;
        if (numeric63(__k36)) {
          __e79 = parseInt(__k36);
        } else {
          __e79 = __k36;
        }
        var __k37 = __e79;
        if (number63(__k37)) {
          __l10[__k37] = __v21;
        } else {
          add(__forms1, ["%set", ["%get", __x49, ["quote", __k37]], __v21]);
        }
      }
      if (some63(__forms1)) {
        return join(["let", __x49, ["object", join(["%array"], __l10)]], __forms1, [__x49]);
      } else {
        return join(["%array"], __l10);
      }
    }
  }
});
setenv("if", {
  _stash: true,
  macro: function () {
    var __branches1 = unstash(Array.prototype.slice.call(arguments, 0));
    return hd(expand_if(__branches1));
  }
});
setenv("case", {
  _stash: true,
  macro: function (expr) {
    var ____r107 = unstash(Array.prototype.slice.call(arguments, 1));
    var __expr5 = destash33(expr, ____r107);
    var ____id15 = ____r107;
    var __clauses1 = cut(____id15, 0);
    var __x69 = unique("x");
    var __eq1 = function (_) {
      return ["=", ["quote", _], __x69];
    };
    var __cl1 = function (__x72) {
      var ____id16 = __x72;
      var __a4 = has(____id16, 0);
      var __b4 = has(____id16, 1);
      if (nil63(__b4)) {
        return [__a4];
      } else {
        if (string63(__a4) || number63(__a4)) {
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
    };
    return ["let", __x69, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
  }
});
setenv("when", {
  _stash: true,
  macro: function (cond) {
    var ____r111 = unstash(Array.prototype.slice.call(arguments, 1));
    var __cond3 = destash33(cond, ____r111);
    var ____id18 = ____r111;
    var __body5 = cut(____id18, 0);
    return ["%if", __cond3, join(["%do"], __body5)];
  }
});
setenv("unless", {
  _stash: true,
  macro: function (cond) {
    var ____r113 = unstash(Array.prototype.slice.call(arguments, 1));
    var __cond5 = destash33(cond, ____r113);
    var ____id20 = ____r113;
    var __body7 = cut(____id20, 0);
    return ["%if", ["%not", __cond5], join(["%do"], __body7)];
  }
});
setenv("obj", {
  _stash: true,
  macro: function () {
    var __body9 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%object"], mapo(function (x) {
      return x;
    }, __body9));
  }
});
setenv("let", {
  _stash: true,
  macro: function (bs) {
    var ____r117 = unstash(Array.prototype.slice.call(arguments, 1));
    var __bs11 = destash33(bs, ____r117);
    var ____id25 = ____r117;
    var __body111 = cut(____id25, 0);
    if (atom63(__bs11) || hd63(__bs11, ",")) {
      return join(["let", [__bs11, hd(__body111)]], tl(__body111));
    } else {
      if (none63(__bs11)) {
        return join(["%do"], __body111);
      } else {
        var ____id26 = __bs11;
        var __lh3 = has(____id26, 0);
        var __rh3 = has(____id26, 1);
        var __bs21 = cut(____id26, 2);
        var ____id27 = bind(__lh3, __rh3);
        var __id28 = has(____id27, 0);
        var __val1 = has(____id27, 1);
        var __bs12 = cut(____id27, 2);
        var __renames1 = [];
        if (! id_literal63(__id28)) {
          var __id121 = unique(__id28);
          __renames1 = [__id28, __id121];
          __id28 = __id121;
        }
        return ["%do", ["%local", __id28, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body111)]];
      }
    }
  }
});
setenv("with", {
  _stash: true,
  macro: function (x, v) {
    var ____r119 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x115 = destash33(x, ____r119);
    var __v23 = destash33(v, ____r119);
    var ____id30 = ____r119;
    var __body13 = cut(____id30, 0);
    if (__v23 === "as") {
      return join(["%with", ["%as", __x115, hd(__body13)]], tl(__body13));
    } else {
      if (! atom63(__x115) || has(__body13, "async")) {
        return join(["%with", __x115, __v23], __body13);
      } else {
        return join(["let", [__x115, __v23]], __body13, [__x115]);
      }
    }
  }
});
setenv("let-when", {
  _stash: true,
  macro: function (x, v) {
    var ____r121 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x128 = destash33(x, ____r121);
    var __v25 = destash33(v, ____r121);
    var ____id32 = ____r121;
    var __body15 = cut(____id32, 0);
    var __y6 = unique("y");
    return ["let", __y6, __v25, ["when", ["yes", __y6], join(["let", [__x128, __y6]], __body15)]];
  }
});
setenv("define-macro", {
  _stash: true,
  macro: function (name, args) {
    var ____r123 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name1 = destash33(name, ____r123);
    var __args5 = destash33(args, ____r123);
    var ____id34 = ____r123;
    var __body17 = cut(____id34, 0);
    var ____x137 = object(["setenv", ["quote", __name1]]);
    ____x137.macro = join(["fn", __args5], __body17);
    var __form1 = ____x137;
    _eval(__form1);
    return __form1;
  }
});
setenv("define-special", {
  _stash: true,
  macro: function (name, args) {
    var ____r125 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name3 = destash33(name, ____r125);
    var __args7 = destash33(args, ____r125);
    var ____id36 = ____r125;
    var __body19 = cut(____id36, 0);
    var ____x143 = object(["setenv", ["quote", __name3]]);
    ____x143.special = join(["fn", __args7], __body19);
    var __form3 = join(____x143, props(__body19));
    _eval(__form3);
    return __form3;
  }
});
setenv("define-symbol", {
  _stash: true,
  macro: function (name, expansion) {
    setenv(name, {
      _stash: true,
      symbol: expansion
    });
    var ____x149 = object(["setenv", ["quote", name]]);
    ____x149.symbol = ["quote", expansion];
    return ____x149;
  }
});
setenv("define-reader", {
  _stash: true,
  macro: function (__x157) {
    var ____r129 = unstash(Array.prototype.slice.call(arguments, 1));
    var ____x157 = destash33(__x157, ____r129);
    var ____id39 = ____x157;
    var __char1 = has(____id39, 0);
    var __s2 = has(____id39, 1);
    var ____id40 = ____r129;
    var __body21 = cut(____id40, 0);
    return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body21)];
  }
});
setenv("define", {
  _stash: true,
  macro: function (name, x) {
    var ____r131 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name5 = destash33(name, ____r131);
    var __x165 = destash33(x, ____r131);
    var ____id42 = ____r131;
    var __body23 = cut(____id42, 0);
    setenv(__name5, {
      _stash: true,
      variable: true
    });
    if (some63(__body23)) {
      return join(["%local-function", __name5], bind42(__x165, __body23), props(__body23));
    } else {
      return join(["%local", __name5, __x165], props(__body23));
    }
  }
});
setenv("define-global", {
  _stash: true,
  macro: function (name, x) {
    var ____r133 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name7 = destash33(name, ____r133);
    var __x171 = destash33(x, ____r133);
    var ____id44 = ____r133;
    var __body25 = cut(____id44, 0);
    setenv(__name7, {
      _stash: true,
      toplevel: true,
      variable: true
    });
    if (some63(__body25)) {
      return join(["%global-function", __name7], bind42(__x171, __body25), props(__body25));
    } else {
      return join(["set", __name7, __x171], props(__body25));
    }
  }
});
setenv("get-value", {
  _stash: true,
  macro: function (x) {
    var ____x178 = object(["setenv", x]);
    ____x178.toplevel = true;
    return ["has", ____x178, ["quote", "value"]];
  }
});
setenv("define-constant", {
  _stash: true,
  macro: function (name, x) {
    var ____x189 = object(["setenv", ["quote", name]]);
    ____x189.toplevel = true;
    ____x189.value = either(x, ["get-value", ["quote", name]]);
    return ["%do", ____x189, ["define-symbol", name, ["get-value", ["quote", name]]]];
  }
});
setenv("define-variable", {
  _stash: true,
  macro: function (name, x) {
    if (is63(x)) {
      return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]];
    } else {
      return ["define-constant", name];
    }
  }
});
setenv("after", {
  _stash: true,
  macro: function (x) {
    var ____r142 = unstash(Array.prototype.slice.call(arguments, 1));
    var __x220 = destash33(x, ____r142);
    var ____id46 = ____r142;
    var __body27 = cut(____id46, 0);
    var __ok1 = unique("ok");
    var __r143 = unique("r");
    var ____x221 = object(["target", ["with", __r143, "nil", ["%block", "try", "||", ["set", __r143, __x220]], ["%block", "finally", "||", join(["%do"], __body27)]]]);
    ____x221.lua = join(["let", [[__ok1, __r143], ["guard", __x220]]], __body27, [["if", __ok1, __r143, ["throw", __r143]]]);
    return ____x221;
  }
});
setenv("with-frame", {
  _stash: true,
  macro: function () {
    var __body29 = unstash(Array.prototype.slice.call(arguments, 0));
    return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body29), ["drop", "environment"]]];
  }
});
setenv("with-values", {
  _stash: true,
  macro: function () {
    var __body31 = unstash(Array.prototype.slice.call(arguments, 0));
    var __forms3 = [];
    var ____o21 = __body31;
    var __k40 = undefined;
    for (__k40 in ____o21) {
      var __v27 = ____o21[__k40];
      var __e80 = undefined;
      if (numeric63(__k40)) {
        __e80 = parseInt(__k40);
      } else {
        __e80 = __k40;
      }
      var __k41 = __e80;
      if (! number63(__k41)) {
        var ____x250 = object(["setenv", ["quote", __k41]]);
        ____x250.value = __v27;
        add(__forms3, ____x250);
      }
    }
    return join(["with-frame"], __forms3);
  }
});
setenv("with-bindings", {
  _stash: true,
  macro: function (__x257) {
    var ____r145 = unstash(Array.prototype.slice.call(arguments, 1));
    var ____x257 = destash33(__x257, ____r145);
    var ____id49 = ____x257;
    var __names3 = has(____id49, 0);
    var ____id50 = ____r145;
    var __body33 = cut(____id50, 0);
    var __x258 = unique("x");
    var ____x261 = object(["setenv", __x258]);
    ____x261.variable = true;
    return join(["with-frame", ["each", __x258, __names3, ____x261]], __body33);
  }
});
setenv("let-macro", {
  _stash: true,
  macro: function (definitions) {
    var ____r149 = unstash(Array.prototype.slice.call(arguments, 1));
    var __definitions1 = destash33(definitions, ____r149);
    var ____id52 = ____r149;
    var __body35 = cut(____id52, 0);
    add(environment, {});
    var ____r150 = undefined;
    try{
      map(function (m) {
        return macroexpand(join(["define-macro"], m));
      }, __definitions1);
      ____r150 = join(["%do"], macroexpand(__body35));
    }
    finally{
      drop(environment);
    }
    return ____r150;
  }
});
setenv("let-symbol", {
  _stash: true,
  macro: function (expansions) {
    var ____r155 = unstash(Array.prototype.slice.call(arguments, 1));
    var __expansions1 = destash33(expansions, ____r155);
    var ____id55 = ____r155;
    var __body37 = cut(____id55, 0);
    add(environment, {});
    var ____r156 = undefined;
    try{
      map(function (__x269) {
        var ____id56 = __x269;
        var __name9 = has(____id56, 0);
        var __exp1 = has(____id56, 1);
        return macroexpand(["define-symbol", __name9, __exp1]);
      }, pair(__expansions1));
      ____r156 = join(["%do"], macroexpand(__body37));
    }
    finally{
      drop(environment);
    }
    return ____r156;
  }
});
setenv("let-unique", {
  _stash: true,
  macro: function (names) {
    var ____r160 = unstash(Array.prototype.slice.call(arguments, 1));
    var __names5 = destash33(names, ____r160);
    var ____id58 = ____r160;
    var __body39 = cut(____id58, 0);
    var __bs3 = map(function (n) {
      return [n, ["unique", ["quote", n]]];
    }, __names5);
    return join(["let", apply(join, __bs3)], __body39);
  }
});
setenv("fn", {
  _stash: true,
  macro: function (args) {
    var ____r163 = unstash(Array.prototype.slice.call(arguments, 1));
    var __args9 = destash33(args, ____r163);
    var ____id60 = ____r163;
    var __body41 = cut(____id60, 0);
    return join(["%function"], bind42(__args9, __body41), props(__body41));
  }
});
setenv("apply", {
  _stash: true,
  macro: function (f) {
    var ____r165 = unstash(Array.prototype.slice.call(arguments, 1));
    var __f3 = destash33(f, ____r165);
    var ____id62 = ____r165;
    var __args111 = cut(____id62, 0);
    if (_35(__args111) > 1) {
      return ["%call", "apply", __f3, ["join", join(["list"], almost(__args111)), last(__args111), join(["list"], props(__args111))]];
    } else {
      if (props63(__args111)) {
        return ["%call", "apply", __f3, join(["join"], __args111, [join(["list"], props(__args111))])];
      } else {
        return join(["%call", "apply", __f3], __args111);
      }
    }
  }
});
setenv("guard", {
  _stash: true,
  macro: function (expr) {
    var ____x330 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
    var ____x342 = object(["obj"]);
    ____x342.stack = [["idx", "debug", "traceback"]];
    ____x342.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
    ____x330.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x342]]]];
    return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x330];
  }
});
setenv("each", {
  _stash: true,
  macro: function (x, t) {
    var ____r169 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x369 = destash33(x, ____r169);
    var __t4 = destash33(t, ____r169);
    var ____id65 = ____r169;
    var __body43 = cut(____id65, 0);
    var __o23 = unique("o");
    var __n31 = unique("n");
    var __i37 = unique("i");
    var __e81 = undefined;
    if (atom63(__x369)) {
      __e81 = [__i37, __x369];
    } else {
      var __e82 = undefined;
      if (_35(__x369) > 1) {
        __e82 = __x369;
      } else {
        __e82 = [__i37, hd(__x369)];
      }
      __e81 = __e82;
    }
    var ____id66 = __e81;
    var __k43 = has(____id66, 0);
    var __v29 = has(____id66, 1);
    var ____x375 = object(["target", __o23]);
    ____x375.py = ["indices", __o23];
    var __e83 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e83 = __body43;
    } else {
      __e83 = [join(["let", __k43, ["if", ["numeric?", __k43], ["parseInt", __k43], __k43]], __body43)];
    }
    return ["let", [__o23, __t4, __k43, "nil"], join(["%for", ____x375, __k43], props(__body43), [join(["let", [__v29, ["%get", __o23, __k43]]], __e83)])];
  }
});
setenv("for", {
  _stash: true,
  macro: function (i, to) {
    var ____r171 = unstash(Array.prototype.slice.call(arguments, 2));
    var __i39 = destash33(i, ____r171);
    var __to1 = destash33(to, ____r171);
    var ____id68 = ____r171;
    var __body45 = cut(____id68, 0);
    if (__to1 === "in") {
      return join(["%for", hd(__body45), __i39, join(["%do"], tl(__body45))], props(__body45));
    } else {
      return ["let", __i39, 0, join(["while", ["<", __i39, __to1]], __body45, [["inc", __i39]])];
    }
  }
});
setenv("step", {
  _stash: true,
  macro: function (v, t) {
    var ____r173 = unstash(Array.prototype.slice.call(arguments, 2));
    var __v31 = destash33(v, ____r173);
    var __t6 = destash33(t, ____r173);
    var ____id70 = ____r173;
    var __body47 = cut(____id70, 0);
    var __x408 = unique("x");
    var __i41 = unique("i");
    return ["let", [__x408, __t6], ["for", __i41, ["#", __x408], join(["let", [__v31, ["at", __x408, __i41]]], __body47)]];
  }
});
setenv("set-of", {
  _stash: true,
  macro: function () {
    var __xs13 = unstash(Array.prototype.slice.call(arguments, 0));
    var __l121 = [];
    var ____o25 = __xs13;
    var ____i43 = undefined;
    for (____i43 in ____o25) {
      var __x418 = ____o25[____i43];
      var __e84 = undefined;
      if (numeric63(____i43)) {
        __e84 = parseInt(____i43);
      } else {
        __e84 = ____i43;
      }
      var ____i431 = __e84;
      __l121[__x418] = true;
    }
    return join(["obj"], __l121);
  }
});
setenv("target?", {
  _stash: true,
  macro: function (x) {
    return ["=", "target", x];
  }
});
setenv("target", {
  _stash: true,
  macro: function () {
    var __clauses3 = unstash(Array.prototype.slice.call(arguments, 0));
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
  }
});
setenv("language", {
  _stash: true,
  macro: function () {
    return ["quote", has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value")];
  }
});
setenv("join!", {
  _stash: true,
  macro: function (a) {
    var ____r179 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a6 = destash33(a, ____r179);
    var ____id72 = ____r179;
    var __bs5 = cut(____id72, 0);
    return ["set", __a6, join(["join", __a6], __bs5)];
  }
});
setenv("cat!", {
  _stash: true,
  macro: function (a) {
    var ____r181 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a8 = destash33(a, ____r181);
    var ____id74 = ____r181;
    var __bs7 = cut(____id74, 0);
    return ["set", __a8, join(["cat", __a8], __bs7)];
  }
});
setenv("inc", {
  _stash: true,
  macro: function (n, by) {
    var __e85 = undefined;
    if (nil63(by)) {
      __e85 = 1;
    } else {
      __e85 = by;
    }
    return ["set", n, ["+", n, __e85]];
  }
});
setenv("dec", {
  _stash: true,
  macro: function (n, by) {
    var __e86 = undefined;
    if (nil63(by)) {
      __e86 = 1;
    } else {
      __e86 = by;
    }
    return ["set", n, ["-", n, __e86]];
  }
});
setenv("with-indent", {
  _stash: true,
  macro: function (form) {
    var __x445 = unique("x");
    return ["%do", ["inc", "indent-level"], ["with", __x445, form, ["dec", "indent-level"]]];
  }
});
setenv("export", {
  _stash: true,
  macro: function () {
    var __names7 = unstash(Array.prototype.slice.call(arguments, 0));
    var __forms5 = map(function (k) {
      if (k === compile(k)) {
        return ["%set", ["idx", "exports", k], k];
      } else {
        return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]];
      }
    }, __names7);
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
  }
});
setenv("when-compiling", {
  _stash: true,
  macro: function () {
    var __body49 = unstash(Array.prototype.slice.call(arguments, 0));
    return _eval(join(["%do"], __body49));
  }
});
setenv("during-compilation", {
  _stash: true,
  macro: function () {
    var __body51 = unstash(Array.prototype.slice.call(arguments, 0));
    var __form5 = join(["%do"], __body51);
    _eval(__form5);
    return __form5;
  }
});
setenv("def", {
  _stash: true,
  macro: function (name) {
    var ____r191 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name11 = destash33(name, ____r191);
    var ____id76 = ____r191;
    var __body53 = cut(____id76, 0);
    return join(["define-global", __name11], __body53);
  }
});
setenv("mac", {
  _stash: true,
  macro: function (name) {
    var ____r193 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name13 = destash33(name, ____r193);
    var ____id78 = ____r193;
    var __body55 = cut(____id78, 0);
    return join(["define-macro", __name13], __body55);
  }
});
setenv("defconst", {
  _stash: true,
  macro: function (name) {
    var ____r195 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name15 = destash33(name, ____r195);
    var ____id80 = ____r195;
    var __value1 = cut(____id80, 0);
    return join(["def", __name15], __value1);
  }
});
setenv("undefined?", {
  _stash: true,
  macro: function (name) {
    var ____x497 = object(["target"]);
    ____x497.js = ["=", ["typeof", name], "\"undefined\""];
    ____x497.lua = ["=", ["idx", "_G", name], "nil"];
    ____x497.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
    return ____x497;
  }
});
setenv("defvar", {
  _stash: true,
  macro: function (name) {
    var ____r199 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name17 = destash33(name, ____r199);
    var ____id82 = ____r199;
    var __value3 = cut(____id82, 0);
    var ____x513 = object(["target"]);
    ____x513.py = ["global", __name17];
    return ["when", ["undefined?", __name17], ____x513, join(["defconst", __name17], __value3)];
  }
});
setenv("async", {
  _stash: true,
  macro: function (keyword) {
    var ____r201 = unstash(Array.prototype.slice.call(arguments, 1));
    var __keyword1 = destash33(keyword, ____r201);
    var ____id84 = ____r201;
    var __body57 = cut(____id84, 0);
    var ____x517 = object([__keyword1]);
    ____x517.async = true;
    return join(____x517, __body57);
  }
});
setenv("%read-from-file", {
  _stash: true,
  macro: function (name) {
    return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]];
  }
});
setenv("the", {
  _stash: true,
  macro: function (name) {
    return ["getenv", ["quote", name], ["quote", "value"]];
  }
});
setenv("cat", {
  _stash: true,
  macro: function (a) {
    var ____r207 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a10 = destash33(a, ____r207);
    var ____id86 = ____r207;
    var __bs9 = cut(____id86, 0);
    if (nil63(__a10)) {
      return "";
    } else {
      if (none63(__bs9)) {
        return __a10;
      } else {
        if (one63(__bs9)) {
          var ____x541 = object(["target", join(["%cat", __a10], __bs9)]);
          ____x541.py = join(["%call", "cat", __a10], __bs9);
          return ____x541;
        } else {
          var ____x544 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]]);
          ____x544.py = join(["%call", "cat", __a10], __bs9);
          return ____x544;
        }
      }
    }
  }
});
setenv("+", {
  _stash: true,
  macro: function () {
    var __args13 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args13)) {
      return 0;
    } else {
      if (one63(__args13)) {
        return hd(__args13);
      } else {
        return join(["%add"], __args13);
      }
    }
  }
});
setenv("-", {
  _stash: true,
  macro: function () {
    var __args15 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args15)) {
      return 0;
    } else {
      if (one63(__args15)) {
        return ["%unm", hd(__args15)];
      } else {
        return join(["%sub"], __args15);
      }
    }
  }
});
setenv("*", {
  _stash: true,
  macro: function () {
    var __args17 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args17)) {
      return 1;
    } else {
      if (one63(__args17)) {
        return hd(__args17);
      } else {
        return join(["%mul"], __args17);
      }
    }
  }
});
setenv("/", {
  _stash: true,
  macro: function () {
    var __args19 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args19)) {
      return 1;
    } else {
      if (one63(__args19)) {
        return hd(__args19);
      } else {
        return join(["%div"], __args19);
      }
    }
  }
});
setenv("//", {
  _stash: true,
  macro: function () {
    var __args21 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args21)) {
      return 1;
    } else {
      if (one63(__args21)) {
        return hd(__args21);
      } else {
        return join(["%idiv"], __args21);
      }
    }
  }
});
setenv("%", {
  _stash: true,
  macro: function () {
    var __args23 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args23)) {
      return 0;
    } else {
      if (one63(__args23)) {
        return hd(__args23);
      } else {
        return join(["%mod"], __args23);
      }
    }
  }
});
setenv("<", {
  _stash: true,
  macro: function (a) {
    var ____r209 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a12 = destash33(a, ____r209);
    var ____id88 = ____r209;
    var __bs111 = cut(____id88, 0);
    if (none63(__bs111)) {
      return true;
    } else {
      if (one63(__bs111)) {
        return join(["%lt", __a12], __bs111);
      } else {
        return ["%and", ["%lt", __a12, hd(__bs111)], join(["<"], __bs111)];
      }
    }
  }
});
setenv("<=", {
  _stash: true,
  macro: function (a) {
    var ____r211 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a14 = destash33(a, ____r211);
    var ____id90 = ____r211;
    var __bs13 = cut(____id90, 0);
    if (none63(__bs13)) {
      return true;
    } else {
      if (one63(__bs13)) {
        return join(["%le", __a14], __bs13);
      } else {
        return ["%and", ["%le", __a14, hd(__bs13)], join(["<="], __bs13)];
      }
    }
  }
});
setenv("=", {
  _stash: true,
  macro: function (a) {
    var ____r213 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a16 = destash33(a, ____r213);
    var ____id92 = ____r213;
    var __bs15 = cut(____id92, 0);
    if (none63(__bs15)) {
      return true;
    } else {
      if (one63(__bs15)) {
        return join(["%eq", __a16], __bs15);
      } else {
        return ["%and", ["%eq", __a16, hd(__bs15)], join(["="], __bs15)];
      }
    }
  }
});
setenv(">=", {
  _stash: true,
  macro: function (a) {
    var ____r215 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a18 = destash33(a, ____r215);
    var ____id94 = ____r215;
    var __bs17 = cut(____id94, 0);
    if (none63(__bs17)) {
      return true;
    } else {
      if (one63(__bs17)) {
        return join(["%ge", __a18], __bs17);
      } else {
        return ["%and", ["%ge", __a18, hd(__bs17)], join([">="], __bs17)];
      }
    }
  }
});
setenv(">", {
  _stash: true,
  macro: function (a) {
    var ____r217 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a20 = destash33(a, ____r217);
    var ____id96 = ____r217;
    var __bs19 = cut(____id96, 0);
    if (none63(__bs19)) {
      return true;
    } else {
      if (one63(__bs19)) {
        return join(["%gt", __a20], __bs19);
      } else {
        return ["%and", ["%gt", __a20, hd(__bs19)], join([">"], __bs19)];
      }
    }
  }
});
setenv("not", {
  _stash: true,
  macro: function () {
    var __args25 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args25)) {
      return false;
    } else {
      if (one63(__args25)) {
        return join(["%not"], __args25);
      } else {
        return ["%and", ["%not", hd(__args25)], join(["not"], tl(__args25))];
      }
    }
  }
});
setenv("and", {
  _stash: true,
  macro: function (a) {
    var ____r219 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a22 = destash33(a, ____r219);
    var ____id98 = ____r219;
    var __bs211 = cut(____id98, 0);
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
  }
});
setenv("or", {
  _stash: true,
  macro: function (a) {
    var ____r221 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a24 = destash33(a, ____r221);
    var ____id100 = ____r221;
    var __bs23 = cut(____id100, 0);
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
  }
});
setenv("break", {
  _stash: true,
  macro: function () {
    var __args27 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%break"], __args27);
  }
});
setenv("return", {
  _stash: true,
  macro: function () {
    var __args29 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%return"], __args29);
  }
});
setenv("while", {
  _stash: true,
  macro: function (c) {
    var ____r223 = unstash(Array.prototype.slice.call(arguments, 1));
    var __c3 = destash33(c, ____r223);
    var ____id102 = ____r223;
    var __body59 = cut(____id102, 0);
    return join(["%while", __c3], __body59);
  }
});
setenv("do", {
  _stash: true,
  macro: function () {
    var __body61 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%do"], __body61);
  }
});
setenv("get", {
  _stash: true,
  macro: function () {
    var __args31 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%get"], __args31);
  }
});
setenv("idx", {
  _stash: true,
  macro: function () {
    var __args33 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%idx"], __args33);
  }
});
setenv("new", {
  _stash: true,
  macro: function () {
    var __args35 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%new"], __args35);
  }
});
setenv("typeof", {
  _stash: true,
  macro: function () {
    var __args37 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%typeof"], __args37);
  }
});
setenv("error", {
  _stash: true,
  macro: function () {
    var __args39 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%error"], __args39);
  }
});
setenv("throw", {
  _stash: true,
  macro: function () {
    var __args41 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%throw"], __args41);
  }
});
setenv("raise", {
  _stash: true,
  macro: function () {
    var __args43 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%throw"], __args43);
  }
});
setenv("is", {
  _stash: true,
  macro: function () {
    var __args45 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%is"], __args45);
  }
});
setenv("in", {
  _stash: true,
  macro: function () {
    var __args47 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%in"], __args47);
  }
});
setenv("as", {
  _stash: true,
  macro: function () {
    var __args49 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%as"], __args49);
  }
});
setenv("%expand-case", {
  _stash: true,
  macro: function (x) {
    var ____r225 = unstash(Array.prototype.slice.call(arguments, 1));
    var __x655 = destash33(x, ____r225);
    var ____id105 = ____r225;
    var __body63 = cut(____id105, 0);
    var __e87 = undefined;
    if (atom63(__x655)) {
      __e87 = [__x655];
    } else {
      __e87 = __x655;
    }
    var ____id106 = __e87;
    var __a26 = has(____id106, 0);
    var __bs25 = cut(____id106, 1);
    var __e88 = undefined;
    if (none63(__bs25)) {
      __e88 = [["%literal"]];
    } else {
      __e88 = __bs25;
    }
    return join(["%block", __a26], __e88, __body63);
  }
});
setenv("%cases", {
  _stash: true,
  macro: function () {
    var __args51 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args51)) {
      return ["do"];
    } else {
      if (one63(__args51)) {
        return join(["%expand-case"], hd(__args51));
      } else {
        var __r228 = unique("r");
        return join(["with", __r228, "nil"], map(function (__x673) {
          var ____id108 = __x673;
          var __x674 = has(____id108, 0);
          var __body65 = cut(____id108, 1);
          return ["%expand-case", __x674, ["%set", __r228, join(["%do"], __body65)]];
        }, almost(__args51)), [join(["%expand-case"], last(__args51))]);
      }
    }
  }
});
setenv("try", {
  _stash: true,
  macro: function (x) {
    var ____r231 = unstash(Array.prototype.slice.call(arguments, 1));
    var __x693 = destash33(x, ____r231);
    var ____id113 = ____r231;
    var __cases1 = cut(____id113, 0);
    var __fin1 = ["finally"];
    var ____o27 = __cases1;
    var ____i46 = undefined;
    for (____i46 in ____o27) {
      var __x695 = ____o27[____i46];
      var __e89 = undefined;
      if (numeric63(____i46)) {
        __e89 = parseInt(____i46);
      } else {
        __e89 = ____i46;
      }
      var ____i461 = __e89;
      if (hd63(__x695, "finally")) {
        __fin1 = __x695;
      }
    }
    var __forms7 = [];
    var ____x698 = __cases1;
    var ____i47 = 0;
    while (____i47 < _35(____x698)) {
      var ____id114 = ____x698[____i47];
      var __x699 = has(____id114, 0);
      var __body69 = cut(____id114, 1);
      if (__x699 === "finally") {
      } else {
        if (__x699 === "except" && has(__body69, 1) === "as") {
          var ____id115 = __body69;
          var __kind2 = has(____id115, 0);
          var ___1 = has(____id115, 1);
          var __name19 = has(____id115, 2);
          var __body70 = cut(____id115, 3);
          add(__forms7, join([[__x699, ["%as", __kind2, __name19]]], __body70));
        } else {
          if (__x699 === "except") {
            var ____id116 = __body69;
            var __kind3 = has(____id116, 0);
            var __body71 = cut(____id116, 1);
            add(__forms7, join([[__x699, __kind3]], __body71));
          } else {
            throw new Error("Unknown try clause");
          }
        }
      }
      ____i47 = ____i47 + 1;
    }
    return join(["%cases", ["try", __x693]], __forms7, [__fin1]);
  }
});
var __exports = {};
var __module = {exports: __exports};
var delimiters = {
  "(": true,
  ")": true,
  ";": true,
  ",": true,
  "\r": true,
  "\n": true
};
var closing_delimiters = {")": true};
var whitespace = {
  " ": true,
  "\t": true,
  "\r": true,
  "\n": true
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
  var ____id117 = s;
  var __pos = has(____id117, "pos");
  var __len = has(____id117, "len");
  var __string = has(____id117, "string");
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
  var __form6 = read_1(s);
  if ("," === peek_char(s)) {
    var __r238 = [",", __form6];
    while (true) {
      read_char(s);
      __form6 = read_1(s);
      if (__form6 === eof) {
        return expected(s, "tuple");
      }
      add(__r238, __form6);
      if (!( "," === peek_char(s))) {
        break;
      }
    }
    return __r238;
  } else {
    return __form6;
  }
};
var read_all = function (s) {
  var __l13 = [];
  while (true) {
    var __form7 = read(s);
    if (__form7 === eof) {
      break;
    }
    add(__l13, __form7);
  }
  return __l13;
};
read_string = function (str, more) {
  var __x708 = read(stream(str, more));
  if (!( __x708 === eof)) {
    return __x708;
  }
};
var key63 = function (atom) {
  return string63(atom) && (_35(atom) > 1 && char(atom, edge(atom)) === ":");
};
var flag63 = function (atom) {
  return string63(atom) && (_35(atom) > 1 && char(atom, 0) === ":");
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
  if (__y7 === s.more) {
    return __y7;
  } else {
    return [x, __y7];
  }
};
var hex_prefix63 = function (str) {
  var __e90 = undefined;
  if (code(str, 0) === 45) {
    __e90 = 1;
  } else {
    __e90 = 0;
  }
  var __i48 = __e90;
  var __id176 = code(str, __i48) === 48;
  var __e91 = undefined;
  if (__id176) {
    __i48 = __i48 + 1;
    var __n36 = code(str, __i48);
    __e91 = __n36 === 120 || __n36 === 88;
  } else {
    __e91 = __id176;
  }
  return __e91;
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
  var __r250 = undefined;
  var __l14 = [];
  while (nil63(__r250)) {
    skip_non_code(s);
    var __c8 = peek_char(s);
    if (__c8 === ")") {
      read_char(s);
      __r250 = __l14;
    } else {
      if (nil63(__c8)) {
        __r250 = expected(s, ")");
      } else {
        var __x710 = read(s);
        if (key63(__x710)) {
          var __k44 = clip(__x710, 0, edge(__x710));
          var __v32 = read(s);
          __l14 = object(__l14);
          __l14[__k44] = __v32;
        } else {
          if (flag63(__x710)) {
            __l14 = object(__l14);
            __l14[clip(__x710, 1)] = true;
          } else {
            add(__l14, __x710);
          }
        }
      }
    }
  }
  return __r250;
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
var read_matching = function (opener, closer, s) {
  var __r253 = undefined;
  var __pos1 = s.pos;
  var __str3 = "";
  var __i49 = 0;
  while (__i49 < _35(opener)) {
    __str3 = __str3 + (read_char(s) || "");
    __i49 = __i49 + 1;
  }
  if (__str3 === opener) {
    while (nil63(__r253)) {
      if (clip(s.string, s.pos, s.pos + _35(closer)) === closer) {
        var __i50 = 0;
        while (__i50 < _35(closer)) {
          __str3 = __str3 + read_char(s);
          __i50 = __i50 + 1;
        }
        __r253 = __str3;
      } else {
        if (nil63(peek_char(s))) {
          __r253 = expected(s, closer);
        } else {
          __str3 = __str3 + read_char(s);
          if (peek_char(s) === "\\") {
            __str3 = __str3 + read_char(s);
          }
        }
      }
    }
  }
  return __r253;
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
      var __r255 = undefined;
      read_char(s);
      while (nil63(__r255)) {
        var __c9 = peek_char(s);
        if (__c9 === "\"") {
          read_char(s);
          __r255 = clip(s.string, __i51, s.pos);
        } else {
          if (nil63(__c9)) {
            __r255 = expected(s, "\"");
          } else {
            if (__c9 === "\\") {
              read_char(s);
            }
            read_char(s);
          }
        }
      }
      return __r255;
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
        var __e92 = undefined;
        if (p) {
          __e92 = has(__b6, p);
        } else {
          __e92 = __b6;
        }
        return __e92;
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
  if (props63(args)) {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __l15 = array(args);
      var ____o28 = args;
      var __k45 = undefined;
      for (__k45 in ____o28) {
        var __v33 = ____o28[__k45];
        var __e94 = undefined;
        if (numeric63(__k45)) {
          __e94 = parseInt(__k45);
        } else {
          __e94 = __k45;
        }
        var __k46 = __e94;
        if (! number63(__k46)) {
          add(__l15, ["%literal", __k46, "|=|", __v33]);
        }
      }
      return __l15;
    } else {
      var __l16 = ["%object", "\"_stash\"", true];
      var ____o29 = args;
      var __k47 = undefined;
      for (__k47 in ____o29) {
        var __v34 = ____o29[__k47];
        var __e93 = undefined;
        if (numeric63(__k47)) {
          __e93 = parseInt(__k47);
        } else {
          __e93 = __k47;
        }
        var __k48 = __e93;
        if (! number63(__k48)) {
          add(__l16, literal(__k48));
          add(__l16, __v34);
        }
      }
      return join(args, [__l16]);
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
        var ____id118 = lh;
        var ___2 = has(____id118, 0);
        var ___var = has(____id118, 1);
        var __val2 = has(____id118, 2);
        var __val3 = either(__val2, ___var);
        return bind(["o", ___var, ["the", __val3]], rh);
      } else {
        if (hd(lh) === "o") {
          var ____id119 = lh;
          var ___3 = has(____id119, 0);
          var ___var1 = has(____id119, 1);
          var __val4 = has(____id119, 2);
          return [___var1, ["if", ["nil?", rh], __val4, rh]];
        } else {
          var __id120 = unique("id");
          var __bs26 = [__id120, rh];
          var ____o30 = lh;
          var __k49 = undefined;
          for (__k49 in ____o30) {
            var __v35 = ____o30[__k49];
            var __e95 = undefined;
            if (numeric63(__k49)) {
              __e95 = parseInt(__k49);
            } else {
              __e95 = __k49;
            }
            var __k50 = __e95;
            var __e96 = undefined;
            if (__k50 === "rest") {
              __e96 = ["cut", __id120, _35(lh)];
            } else {
              __e96 = ["has", __id120, ["quote", bias(__k50)]];
            }
            var __x723 = __e96;
            if (is63(__k50)) {
              var __e97 = undefined;
              if (__v35 === true) {
                __e97 = __k50;
              } else {
                __e97 = __v35;
              }
              var __k51 = __e97;
              __bs26 = join(__bs26, bind(__k51, __x723));
            }
          }
          return __bs26;
        }
      }
    }
  }
};
setenv("arguments%", {
  _stash: true,
  macro: function (from) {
    var ____x734 = object(["target"]);
    ____x734.js = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", from];
    ____x734.py = ["|list|", "|_args|"];
    ____x734.lua = ["list", "|...|"];
    return ____x734;
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
  var __args131 = {};
  var rest = function () {
    __args131.rest = true;
    var ____x745 = object(["target"]);
    ____x745.py = "|_keys|";
    return ["unstash", ["arguments%", _35(__args131)], ____x745];
  };
  if (atom63(args)) {
    return [__args131, join(["let", [args, rest()]], body)];
  } else {
    var ____id1211 = body_docstring(body);
    var __doc = has(____id1211, 0);
    var __body72 = has(____id1211, 1);
    var __pre = [];
    var __bs27 = [];
    var __inits = [];
    var __r280 = unique("r");
    var ____o31 = args;
    var __k52 = undefined;
    for (__k52 in ____o31) {
      var __v36 = ____o31[__k52];
      var __e98 = undefined;
      if (numeric63(__k52)) {
        __e98 = parseInt(__k52);
      } else {
        __e98 = __k52;
      }
      var __k53 = __e98;
      if (number63(__k53)) {
        if (atom63(__v36)) {
          add(__args131, __v36);
        } else {
          if (hd(__v36) === "o") {
            var ____id122 = __v36;
            var ___4 = has(____id122, 0);
            var ___var2 = has(____id122, 1);
            var __val5 = has(____id122, 2);
            add(__args131, ___var2);
            add(__inits, ["%if", ["nil?", ___var2], ["%set", ___var2, __val5]]);
          } else {
            if (hd(__v36) === "t") {
              var ____id123 = __v36;
              var ___5 = has(____id123, 0);
              var ___var3 = has(____id123, 1);
              var __val6 = has(____id123, 2);
              var __val7 = either(__val6, ___var3);
              add(__args131, ___var3);
              add(__inits, ["%if", ["nil?", ___var3], ["%set", ___var3, ["the", __val7]]]);
            } else {
              var __x756 = unique("x");
              add(__args131, __x756);
              __bs27 = join(__bs27, [__v36, __x756]);
            }
          }
        }
      }
    }
    if (props63(args)) {
      __pre = join(__pre, [__r280, rest()]);
      var __n42 = _35(__args131);
      var __i58 = 0;
      while (__i58 < __n42) {
        var __v37 = __args131[__i58];
        __pre = join(__pre, [__v37, ["destash!", __v37, __r280]]);
        __i58 = __i58 + 1;
      }
      __bs27 = join(__bs27, [props(args), __r280]);
    }
    var __forms8 = join(["let", __pre], __inits, [join(["let", __bs27], __body72)]);
    var __e99 = undefined;
    if (is63(__doc)) {
      __e99 = ["do", __doc, __forms8];
    } else {
      __e99 = __forms8;
    }
    return [__args131, __e99];
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
var expand_local = function (__x767) {
  var ____id124 = __x767;
  var __x768 = has(____id124, 0);
  var __name20 = has(____id124, 1);
  var __value4 = has(____id124, 2);
  setenv(__name20, {
    _stash: true,
    variable: true
  });
  return ["%local", __name20, macroexpand(__value4)];
};
var expand_function = function (__x770) {
  var ____id125 = __x770;
  var __x771 = has(____id125, 0);
  var __args52 = has(____id125, 1);
  var __body73 = cut(____id125, 2);
  add(environment, {});
  var ____r287 = undefined;
  try{
    var ____o32 = __args52;
    var ____i59 = undefined;
    for (____i59 in ____o32) {
      var ____x772 = ____o32[____i59];
      var __e100 = undefined;
      if (numeric63(____i59)) {
        __e100 = parseInt(____i59);
      } else {
        __e100 = ____i59;
      }
      var ____i591 = __e100;
      setenv(____x772, {
        _stash: true,
        variable: true
      });
    }
    ____r287 = join(["%function", __args52], macroexpand(__body73));
  }
  finally{
    drop(environment);
  }
  return ____r287;
};
var expand_definition = function (__x774) {
  var ____id126 = __x774;
  var __x775 = has(____id126, 0);
  var __name21 = has(____id126, 1);
  var __args53 = has(____id126, 2);
  var __body74 = cut(____id126, 3);
  add(environment, {});
  var ____r289 = undefined;
  try{
    var ____o33 = __args53;
    var ____i60 = undefined;
    for (____i60 in ____o33) {
      var ____x776 = ____o33[____i60];
      var __e101 = undefined;
      if (numeric63(____i60)) {
        __e101 = parseInt(____i60);
      } else {
        __e101 = ____i60;
      }
      var ____i601 = __e101;
      setenv(____x776, {
        _stash: true,
        variable: true
      });
    }
    ____r289 = join([__x775, __name21, __args53], macroexpand(__body74));
  }
  finally{
    drop(environment);
  }
  return ____r289;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x778) {
  var ____id127 = __x778;
  var __name22 = has(____id127, 0);
  var __body75 = cut(____id127, 1);
  return apply(macro_function(__name22), __body75);
};
real63 = function (x) {
  return number63(x) && (! nan63(x) && ! inf63(x));
};
valid_access63 = function (str) {
  return _35(str) > 2 && (!( "." === char(str, 0)) && (!( "." === char(str, edge(str))) && ! search(str, "..")));
};
parse_access = function (str) {
  return reduce(function (a, b) {
    var __n45 = number(a);
    if (is63(__n45)) {
      return ["at", b, __n45];
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
        var __x781 = hd(form);
        if (__x781 === "%local") {
          return expand_local(form);
        } else {
          if (__x781 === "%function") {
            return expand_function(form);
          } else {
            if (__x781 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x781 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x781 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x781)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x781)) {
                      return macroexpand(join([parse_access(__x781)], tl(form)));
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
  var __xs14 = [["list"]];
  var ____o34 = form;
  var __k54 = undefined;
  for (__k54 in ____o34) {
    var __v38 = ____o34[__k54];
    var __e102 = undefined;
    if (numeric63(__k54)) {
      __e102 = parseInt(__k54);
    } else {
      __e102 = __k54;
    }
    var __k55 = __e102;
    if (! number63(__k55)) {
      var __e103 = undefined;
      if (quasisplice63(__v38, depth)) {
        __e103 = quasiexpand(__v38[1]);
      } else {
        __e103 = quasiexpand(__v38, depth);
      }
      var __v39 = __e103;
      last(__xs14)[__k55] = __v39;
    }
  }
  var ____x785 = form;
  var ____i62 = 0;
  while (____i62 < _35(____x785)) {
    var __x786 = ____x785[____i62];
    if (quasisplice63(__x786, depth)) {
      var __x787 = quasiexpand(__x786[1]);
      add(__xs14, __x787);
      add(__xs14, ["list"]);
    } else {
      add(last(__xs14), quasiexpand(__x786, depth));
    }
    ____i62 = ____i62 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || (!( hd(x) === "list") || props63(x));
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
expand_if = function (__x791) {
  var ____id128 = __x791;
  var __a27 = has(____id128, 0);
  var __b7 = has(____id128, 1);
  var __c111 = cut(____id128, 2);
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
  var __s3 = "";
  var __i63 = 0;
  while (__i63 < has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value")) {
    __s3 = __s3 + "  ";
    __i63 = __i63 + 1;
  }
  return __s3;
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
compile_id = function (id, raw63) {
  if (code(id, 0) === 46) {
    return "." + compile_id(clip(id, 1), true);
  } else {
    var __e104 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e104 = "L_";
    } else {
      __e104 = "_";
    }
    var __x797 = __e104;
    var __e105 = undefined;
    if (number_code63(code(id, 0))) {
      __e105 = __x797;
    } else {
      __e105 = "";
    }
    var __id131 = __e105;
    var __i64 = 0;
    while (__i64 < _35(id)) {
      var __c12 = char(id, __i64);
      var __n47 = code(__c12);
      var __e106 = undefined;
      if (__c12 === "-" && !( id === "-")) {
        var __e109 = undefined;
        if (__i64 === 0) {
          __e109 = __x797;
        } else {
          __e109 = "_";
        }
        __e106 = __e109;
      } else {
        var __e107 = undefined;
        if (valid_code63(__n47)) {
          __e107 = __c12;
        } else {
          var __e108 = undefined;
          if (__i64 === 0) {
            __e108 = __x797 + __n47;
          } else {
            __e108 = __n47;
          }
          __e107 = __e108;
        }
        __e106 = __e107;
      }
      var __c121 = __e106;
      __id131 = __id131 + __c121;
      __i64 = __i64 + 1;
    }
    if (raw63) {
      return __id131;
    } else {
      if (reserved63(__id131)) {
        return __x797 + __id131;
      } else {
        return __id131;
      }
    }
  }
};
valid_id63 = function (x) {
  return some63(x) && x === compile_id(x);
};
var __names8 = {};
unique = function (x) {
  var __x798 = compile_id(x);
  if (has63(__names8, __x798)) {
    var __i65 = __names8[__x798];
    __names8[__x798] = __names8[__x798] + 1;
    return unique(__x798 + __i65);
  } else {
    __names8[__x798] = 1;
    return "__" + __x798;
  }
};
key = function (k) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return k;
  } else {
    var __i66 = inner(k);
    if (valid_id63(__i66)) {
      return __i66;
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
  var __o35 = [];
  var ____o36 = t;
  var __k56 = undefined;
  for (__k56 in ____o36) {
    var __v40 = ____o36[__k56];
    var __e110 = undefined;
    if (numeric63(__k56)) {
      __e110 = parseInt(__k56);
    } else {
      __e110 = __k56;
    }
    var __k57 = __e110;
    var __x799 = f(__v40);
    if (is63(__x799)) {
      add(__o35, literal(__k57));
      add(__o35, __x799);
    }
  }
  return __o35;
};
var ____x801 = object([]);
var ____x802 = object([]);
____x802.js = "!";
____x802.lua = "not";
____x802.py = "not";
____x801["%not"] = ____x802;
____x801["%unm"] = "-";
var ____x803 = object([]);
____x803["%mul"] = "*";
____x803["%div"] = "/";
____x803["%idiv"] = "//";
____x803["%mod"] = "%";
var ____x804 = object([]);
var ____x805 = object([]);
____x805.js = "+";
____x805.lua = "..";
____x805.py = "+";
____x804["%cat"] = ____x805;
var ____x806 = object([]);
____x806["%add"] = "+";
____x806["%sub"] = "-";
var ____x807 = object([]);
____x807["%lt"] = "<";
____x807["%gt"] = ">";
____x807["%le"] = "<=";
____x807["%ge"] = ">=";
var ____x808 = object([]);
var ____x809 = object([]);
____x809.js = "===";
____x809.lua = "==";
____x809.py = "==";
____x808["%eq"] = ____x809;
var ____x810 = object([]);
var ____x811 = object([]);
____x811.py = "in";
____x810["%in"] = ____x811;
var ____x812 = object([]);
____x812.py = "is";
____x810["%is"] = ____x812;
var ____x813 = object([]);
var ____x814 = object([]);
____x814.js = "&&";
____x814.lua = "and";
____x814.py = "and";
____x813["%and"] = ____x814;
var ____x815 = object([]);
var ____x816 = object([]);
____x816.js = "||";
____x816.lua = "or";
____x816.py = "or";
____x815["%or"] = ____x816;
var infix = [____x801, ____x803, ____x804, ____x806, ____x807, ____x808, ____x810, ____x813, ____x815];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["%not", "%unm"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var ____o37 = infix;
    var __k58 = undefined;
    for (__k58 in ____o37) {
      var __v41 = ____o37[__k58];
      var __e111 = undefined;
      if (numeric63(__k58)) {
        __e111 = parseInt(__k58);
      } else {
        __e111 = __k58;
      }
      var __k59 = __e111;
      if (has63(__v41, hd(form))) {
        return index(__k59);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x818 = has(level, op);
    if (__x818 === true) {
      return op;
    } else {
      if (string63(__x818)) {
        return __x818;
      } else {
        if (is63(__x818)) {
          return has(__x818, has(setenv("target", {
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
  var __s4 = "(";
  var __c13 = "";
  var ____x819 = args;
  var ____i69 = 0;
  while (____i69 < _35(____x819)) {
    var __x820 = ____x819[____i69];
    __s4 = __s4 + (__c13 + compile(__x820));
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" && (default63 && ! id_literal63(__x820))) {
      __s4 = __s4 + "=None";
    }
    __c13 = ", ";
    ____i69 = ____i69 + 1;
  }
  return __s4 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s12 = "";
    var __i70 = 0;
    while (__i70 < _35(s)) {
      var __c14 = char(s, __i70);
      var __e112 = undefined;
      if (__c14 === "\n") {
        __e112 = "\\n";
      } else {
        var __e113 = undefined;
        if (__c14 === "\r") {
          __e113 = "\\r";
        } else {
          __e113 = __c14;
        }
        __e112 = __e113;
      }
      __s12 = __s12 + __e112;
      __i70 = __i70 + 1;
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
  var ____id129 = form;
  var __x821 = has(____id129, 0);
  var __args54 = cut(____id129, 1);
  var ____id130 = getenv(__x821);
  var __special = has(____id130, "special");
  var __stmt = has(____id130, "stmt");
  var __self_tr63 = has(____id130, "tr");
  var __e114 = undefined;
  if (stmt63 && ! __stmt) {
    __e114 = indentation();
  } else {
    __e114 = "";
  }
  var __p1 = __e114;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p1 + (apply(__special, __args54) + __tr);
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
method_call63 = function (form) {
  var __e115 = undefined;
  if (list63(form)) {
    __e115 = hd(form);
  } else {
    __e115 = form;
  }
  var __x822 = __e115;
  return string63(__x822) && (_35(__x822, 1) > 1 && char(__x822, 0) === ".");
};
var compile_call = function (form) {
  var __f4 = hd(form);
  var __f11 = compile(__f4);
  var __args55 = stash42(tl(form));
  var __e116 = undefined;
  if (method_call63(hd(__args55))) {
    __e116 = mapcat(compile, __args55, "");
  } else {
    __e116 = compile_args(__args55);
  }
  var __args56 = __e116;
  if (parenthesize_call63(__f4)) {
    return "(" + (__f11 + (")" + __args56));
  } else {
    return __f11 + __args56;
  }
};
var op_delims = function (parent, child) {
  var ____r331 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r331);
  var __child = destash33(child, ____r331);
  var ____id1311 = ____r331;
  var __right = has(____id1311, "right");
  var __e117 = undefined;
  if (__right) {
    __e117 = _6261;
  } else {
    __e117 = _62;
  }
  if (__e117(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id132 = form;
  var __op = has(____id132, 0);
  var ____id133 = cut(____id132, 1);
  var __a28 = has(____id133, 0);
  var __b8 = has(____id133, 1);
  var ____id134 = op_delims(form, __a28);
  var __ao = has(____id134, 0);
  var __ac = has(____id134, 1);
  var ____id135 = op_delims(form, __b8, {
    _stash: true,
    right: true
  });
  var __bo = has(____id135, 0);
  var __bc = has(____id135, 1);
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
  var ____x825 = compile(body, {
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
  var __s5 = ____x825;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py" && none63(__s5)) {
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x826 = indentation() + "pass\n";
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    return ____x826;
  } else {
    return __s5;
  }
};
compile_function = function (args, body) {
  var ____r334 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args57 = destash33(args, ____r334);
  var __body76 = destash33(body, ____r334);
  var ____id136 = ____r334;
  var __name23 = has(____id136, "name");
  var __prefix = has(____id136, "prefix");
  var __async = has(____id136, "async");
  var __e118 = undefined;
  if (__name23) {
    __e118 = compile(__name23);
  } else {
    __e118 = "";
  }
  var __id137 = __e118;
  var __e119 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && has63(__args57, "rest")) {
    __e119 = join(__args57, ["|...|"]);
  } else {
    var __e120 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" && has63(__args57, "rest")) {
      __e120 = join(__args57, ["|*_args|", "|**_keys|"]);
    } else {
      __e120 = __args57;
    }
    __e119 = __e120;
  }
  var __args141 = __e119;
  var __args58 = compile_args(__args141, true);
  var __body77 = compile_body(__body76);
  var __ind = indentation();
  var __e121 = undefined;
  if (__prefix) {
    __e121 = __prefix + " ";
  } else {
    __e121 = "";
  }
  var __p2 = __e121;
  var __e122 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e122 = "";
  } else {
    __e122 = "end";
  }
  var __tr1 = __e122;
  var __e123 = undefined;
  if (__async && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua")) {
    __e123 = "async ";
  } else {
    __e123 = "";
  }
  var __a30 = __e123;
  if (__name23) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __a30 + ("function " + (__id137 + (__args58 + (" {\n" + (__body77 + (__ind + ("}" + __tr1)))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __e124 = undefined;
      if (none63(__ind)) {
        __e124 = "\n";
      } else {
        __e124 = "";
      }
      var __ws = __e124;
      return __a30 + ("def " + (__id137 + (__args58 + (":\n" + (__body77 + __ws)))));
    } else {
      return __p2 + ("function " + (__id137 + (__args58 + ("\n" + (__body77 + (__ind + __tr1))))));
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "%return") && ! statement63(hd(form)));
};
compile = function (form, raw63) {
  var ____r336 = unstash(Array.prototype.slice.call(arguments, 2));
  var __form8 = destash33(form, ____r336);
  var __raw63 = destash33(raw63, ____r336);
  var ____id138 = ____r336;
  var __stmt1 = has(____id138, "stmt");
  if (nil63(__form8)) {
    return "";
  } else {
    if (special_form63(__form8)) {
      return compile_special(__form8, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e125 = undefined;
      if (__stmt1) {
        __e125 = indentation();
      } else {
        __e125 = "";
      }
      var __ind1 = __e125;
      var __e126 = undefined;
      if (atom63(__form8)) {
        __e126 = compile_atom(__form8, __raw63);
      } else {
        var __e127 = undefined;
        if (infix63(hd(__form8))) {
          __e127 = compile_infix(__form8);
        } else {
          __e127 = compile_call(__form8);
        }
        __e126 = __e127;
      }
      var __form9 = __e126;
      return __ind1 + (__form9 + __tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e11 = lower(form, __hoist, true, tail63);
  var __e128 = undefined;
  if (some63(__hoist) && is63(__e11)) {
    __e128 = join(["%do"], __hoist, [__e11]);
  } else {
    var __e129 = undefined;
    if (is63(__e11)) {
      __e129 = __e11;
    } else {
      var __e130 = undefined;
      if (_35(__hoist) > 1) {
        __e130 = join(["%do"], __hoist);
      } else {
        __e130 = hd(__hoist);
      }
      __e129 = __e130;
    }
    __e128 = __e129;
  }
  return either(__e128, ["%do"]);
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
  var ____x834 = almost(args);
  var ____i71 = 0;
  while (____i71 < _35(____x834)) {
    var __x835 = ____x834[____i71];
    var ____y8 = lower(__x835, hoist, stmt63);
    if (yes(____y8)) {
      var __e12 = ____y8;
      if (standalone63(__e12)) {
        add(hoist, __e12);
      }
    }
    ____i71 = ____i71 + 1;
  }
  var __e13 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e13)) {
    return ["%return", __e13];
  } else {
    return __e13;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id139 = args;
  var __lh4 = has(____id139, 0);
  var __rh4 = has(____id139, 1);
  var __lh11 = lower(__lh4, hoist);
  var __rh11 = lower(__rh4, hoist);
  add(hoist, ["%set", __lh11, __rh11]);
  if (!( stmt63 && ! tail63)) {
    return __lh11;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id140 = args;
  var __cond6 = has(____id140, 0);
  var __then = has(____id140, 1);
  var ___else = has(____id140, 2);
  if (stmt63) {
    var __e132 = undefined;
    if (is63(___else)) {
      __e132 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond6, hoist), lower_body([__then], tail63)], __e132));
  } else {
    var __e14 = unique("e");
    add(hoist, ["%local", __e14, "nil"]);
    var __e131 = undefined;
    if (is63(___else)) {
      __e131 = [lower(["%set", __e14, ___else])];
    }
    add(hoist, join(["%if", lower(__cond6, hoist), lower(["%set", __e14, __then])], __e131));
    return __e14;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id141 = args;
  var __a31 = has(____id141, 0);
  var __b10 = has(____id141, 1);
  var __hoist1 = [];
  var __b11 = lower(__b10, __hoist1);
  if (some63(__hoist1)) {
    var __id142 = unique("id");
    var __e133 = undefined;
    if (x === "%and") {
      __e133 = ["%if", __id142, __b10, __id142];
    } else {
      __e133 = ["%if", __id142, __id142, __b10];
    }
    return lower(["%do", ["%local", __id142, __a31], __e133], hoist);
  } else {
    return [x, lower(__a31, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id143 = args;
  var __c15 = has(____id143, 0);
  var __body78 = cut(____id143, 1);
  var __pre1 = [];
  var __c16 = lower(__c15, __pre1);
  var __e134 = undefined;
  if (none63(__pre1)) {
    __e134 = ["%while", __c16, lower_body(__body78)];
  } else {
    __e134 = ["%while", true, join(["%do"], __pre1, [["%if", ["%not", __c16], ["%break"]], lower_body(__body78)])];
  }
  return add(hoist, __e134);
};
var lower_for = function (args, hoist) {
  var ____id144 = args;
  var __h = has(____id144, 0);
  var __k60 = has(____id144, 1);
  var __body79 = cut(____id144, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k60, lower_body(__body79)], props(__body79)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id145 = args;
  var __h1 = has(____id145, 0);
  var __body80 = cut(____id145, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body80, tail63)], props(__body80)));
  } else {
    var __e15 = unique("e");
    add(hoist, ["%local", __e15]);
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e15, join(["%do"], __body80)])], props(__body80)));
    return __e15;
  }
};
var lower_block = function (args, hoist, stmt63, tail63) {
  var ____id146 = args;
  var __name24 = has(____id146, 0);
  var __h2 = has(____id146, 1);
  var __body81 = cut(____id146, 2);
  return add(hoist, ["%block", __name24, lower(__h2, hoist), lower_body(__body81, tail63)]);
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __f5 = unique("f");
    return lower(["%do", join(["%local-function", __f5], args), __f5], hoist);
  } else {
    var ____id147 = args;
    var __a32 = has(____id147, 0);
    var __body82 = cut(____id147, 1);
    return join(["%function", __a32, lower_body(__body82, true)], props(__body82));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id148 = args;
  var __name25 = has(____id148, 0);
  var __args59 = has(____id148, 1);
  var __body83 = cut(____id148, 2);
  return add(hoist, join([kind, __name25, __args59, lower_body(__body83, true)], props(__body83)));
};
var lower_call = function (form, hoist) {
  var __form10 = map(function (x) {
    return lower(x, hoist);
  }, form);
  if (some63(__form10)) {
    return __form10;
  }
};
var pairwise63 = function (form) {
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"]);
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e16 = [];
    var ____id149 = form;
    var __x872 = has(____id149, 0);
    var __args60 = cut(____id149, 1);
    reduce(function (a, b) {
      add(__e16, [__x872, a, b]);
      return a;
    }, __args60);
    return join(["%and"], reverse(__e16));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form11 = lower_pairwise(form);
  var ____id150 = __form11;
  var __x875 = has(____id150, 0);
  var __args61 = cut(____id150, 1);
  return lower(reduce(function (a, b) {
    return [__x875, b, a];
  }, reverse(__args61)), hoist);
};
var lower_special = function (form, hoist) {
  var __e17 = lower_call(form, hoist);
  if (__e17) {
    return add(hoist, __e17);
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
          var ____id151 = form;
          var __x878 = has(____id151, 0);
          var __args62 = cut(____id151, 1);
          if (__x878 === "%do") {
            return lower_do(__args62, hoist, stmt63, tail63);
          } else {
            if (__x878 === "%call") {
              return lower(__args62, hoist, stmt63, tail63);
            } else {
              if (__x878 === "%set") {
                return lower_set(__args62, hoist, stmt63, tail63);
              } else {
                if (__x878 === "%if") {
                  return lower_if(__args62, hoist, stmt63, tail63);
                } else {
                  if (__x878 === "%try") {
                    return lower_try(__args62, hoist, tail63);
                  } else {
                    if (__x878 === "%while") {
                      return lower_while(__args62, hoist);
                    } else {
                      if (__x878 === "%for") {
                        return lower_for(__args62, hoist);
                      } else {
                        if (__x878 === "%with") {
                          return lower_with(__args62, hoist, stmt63, tail63);
                        } else {
                          if (__x878 === "%block") {
                            return lower_block(__args62, hoist, stmt63, tail63);
                          } else {
                            if (__x878 === "%cases") {
                              return lower_cases(__args62, hoist, stmt63, tail63);
                            } else {
                              if (__x878 === "%function") {
                                return lower_function(__args62, hoist);
                              } else {
                                if (__x878 === "%local-function" || __x878 === "%global-function") {
                                  return lower_definition(__x878, __args62, hoist);
                                } else {
                                  if (in63(__x878, ["%and", "%or"])) {
                                    return lower_short(__x878, __args62, hoist);
                                  } else {
                                    if (statement63(__x878)) {
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
var __e135 = undefined;
if (typeof(global) === "undefined") {
  var __e136 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e136 = window;
  } else {
    var __e137 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e137 = self;
    } else {
      __e137 = this;
    }
    __e136 = __e137;
  }
  global = __e136;
  __e135 = global;
}
var __e138 = undefined;
if (!( typeof(require) === "undefined")) {
  global.require = require;
  global.require;
  var __e139 = undefined;
  if (!( typeof(__module1) === "undefined")) {
    __module1.filename = require("path").resolve("repl");
    __module1.filename;
    __module1.paths = require("module")._nodeModulePaths(__module1.filename);
    __e139 = __module1.paths;
  }
  __e138 = __e139;
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
setenv("%do", {
  _stash: true,
  special: function () {
    var __forms10 = unstash(Array.prototype.slice.call(arguments, 0));
    var __s7 = "";
    var ____x883 = __forms10;
    var ____i73 = 0;
    while (____i73 < _35(____x883)) {
      var __x884 = ____x883[____i73];
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua" && (immediate_call63(__x884) && "\n" === char(__s7, edge(__s7)))) {
        __s7 = clip(__s7, 0, edge(__s7)) + ";\n";
      }
      __s7 = __s7 + compile(__x884, {
        _stash: true,
        stmt: true
      });
      if (! atom63(__x884)) {
        if (hd(__x884) === "%return" || hd(__x884) === "%break") {
          break;
        }
      }
      ____i73 = ____i73 + 1;
    }
    return __s7;
  },
  stmt: true,
  tr: true
});
setenv("%if", {
  _stash: true,
  special: function (cond, cons, alt) {
    var __cond8 = compile(cond);
    var __cons1 = compile_body(cons);
    var __e140 = undefined;
    if (alt) {
      __e140 = compile_body(alt);
    }
    var __alt1 = __e140;
    var __ind3 = indentation();
    var __s9 = "";
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __s9 = __s9 + (__ind3 + ("if (" + (__cond8 + (") {\n" + (__cons1 + (__ind3 + "}"))))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __s9 = __s9 + (__ind3 + ("if " + (__cond8 + (":\n" + __cons1))));
      } else {
        __s9 = __s9 + (__ind3 + ("if " + (__cond8 + (" then\n" + __cons1))));
      }
    }
    if (__alt1 && has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __s9 = __s9 + (" else {\n" + (__alt1 + (__ind3 + "}")));
    } else {
      if (__alt1 && has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __s9 = __s9 + (__ind3 + ("else:\n" + __alt1));
      } else {
        if (__alt1) {
          __s9 = __s9 + (__ind3 + ("else\n" + __alt1));
        }
      }
    }
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return __s9 + (__ind3 + "end\n");
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "js") {
        return __s9 + "\n";
      } else {
        return __s9;
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%while", {
  _stash: true,
  special: function (cond, form) {
    var __cond10 = compile(cond);
    var __body85 = compile_body(form);
    var __ind5 = indentation();
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind5 + ("while (" + (__cond10 + (") {\n" + (__body85 + (__ind5 + "}\n")))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind5 + ("while " + (__cond10 + (":\n" + __body85)));
      } else {
        return __ind5 + ("while " + (__cond10 + (" do\n" + (__body85 + (__ind5 + "end\n")))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%for", {
  _stash: true,
  special: function (t, k, form) {
    var ____r372 = unstash(Array.prototype.slice.call(arguments, 3));
    var __t9 = destash33(t, ____r372);
    var __k63 = destash33(k, ____r372);
    var __form13 = destash33(form, ____r372);
    var ____id153 = ____r372;
    var __async2 = has(____id153, "async");
    var __t10 = compile(__t9);
    var __k64 = compile(__k63);
    var __ind7 = indentation();
    var __body87 = compile_body(__form13);
    var __e141 = undefined;
    if (__async2) {
      __e141 = "async ";
    } else {
      __e141 = "";
    }
    var __a34 = __e141;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return __ind7 + ("for " + (__k64 + (" in next, " + (__t10 + (" do\n" + (__body87 + (__ind7 + "end\n")))))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind7 + (__a34 + ("for " + (__k64 + (" in " + (__t10 + (":\n" + __body87))))));
      } else {
        return __ind7 + ("for (" + (__k64 + (" in " + (__t10 + (") {\n" + (__body87 + (__ind7 + "}\n")))))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%with", {
  _stash: true,
  special: function (t, form) {
    var ____r374 = unstash(Array.prototype.slice.call(arguments, 2));
    var __t13 = destash33(t, ____r374);
    var __form15 = destash33(form, ____r374);
    var ____id155 = ____r374;
    var __async4 = has(____id155, "async");
    var __t14 = compile(__t13);
    var __ind9 = indentation();
    var __body89 = compile_body(__form15);
    var __e142 = undefined;
    if (__async4) {
      __e142 = "async ";
    } else {
      __e142 = "";
    }
    var __a36 = __e142;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind9 + (__a36 + ("with " + (__t14 + (":\n" + __body89))));
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
    var __t16 = compile(t);
    var __ind11 = indentation();
    var __body91 = compile_body(form);
    var __e143 = undefined;
    if (some63(__t16)) {
      __e143 = " ";
    } else {
      __e143 = "";
    }
    var __sep1 = __e143;
    var __e144 = undefined;
    if (some63(__t16)) {
      __e144 = "(";
    } else {
      __e144 = "";
    }
    var __lh6 = __e144;
    var __e145 = undefined;
    if (some63(__t16)) {
      __e145 = ")";
    } else {
      __e145 = "";
    }
    var __rh6 = __e145;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind11 + (name + (__sep1 + (__t16 + (":\n" + __body91))));
    } else {
      return __ind11 + (name + (__sep1 + (__lh6 + (__t16 + (__rh6 + (__sep1 + ("{\n" + (__body91 + (__ind11 + "}\n")))))))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%try", {
  _stash: true,
  special: function (form) {
    var __ind13 = indentation();
    var __body93 = compile_body(form);
    var __e146 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e146 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", false, ["%get", "e", 1], "e"]]];
    } else {
      __e146 = ["%return", ["%array", false, "e"]];
    }
    var __hf1 = __e146;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x906 = compile(__hf1, {
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
    var __h4 = ____x906;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind13 + ("try {\n" + (__body93 + (__ind13 + ("}\n" + (__ind13 + ("catch (e) {\n" + (__h4 + (__ind13 + "}\n"))))))));
    } else {
      return __ind13 + ("try:\n" + (__body93 + (__ind13 + ("except:\n" + __h4))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%delete", {
  _stash: true,
  special: function (place) {
    var __e147 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e147 = "del ";
    } else {
      __e147 = "delete ";
    }
    return indentation() + (__e147 + compile(place));
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
    var ____r384 = unstash(Array.prototype.slice.call(arguments, 1));
    var __args64 = destash33(args, ____r384);
    var ____id157 = ____r384;
    var __body95 = cut(____id157, 0);
    return apply(compile_function, join([__args64], __body95, []));
  }
});
setenv("%global-function", {
  _stash: true,
  special: function (name, args) {
    var ____r386 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name27 = destash33(name, ____r386);
    var __args66 = destash33(args, ____r386);
    var ____id159 = ____r386;
    var __body97 = cut(____id159, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x917 = object([__args66]);
      ____x917.name = __name27;
      var ____x918 = object([]);
      ____x918.name = __name27;
      var __x916 = apply(compile_function, join(____x917, __body97, ____x918));
      return indentation() + __x916;
    } else {
      return compile(["%set", __name27, join(["%function", __args66], __body97)], {
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
    var ____r388 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name29 = destash33(name, ____r388);
    var __args68 = destash33(args, ____r388);
    var ____id161 = ____r388;
    var __body99 = cut(____id161, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x927 = object([__args68]);
      ____x927.name = __name29;
      ____x927.prefix = "local";
      var ____x928 = object([]);
      ____x928.name = __name29;
      ____x928.prefix = "local";
      var __x926 = apply(compile_function, join(____x927, __body99, ____x928));
      return indentation() + __x926;
    } else {
      return compile(["%local", __name29, join(["%function", __args68], __body99)], {
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
    var __e148 = undefined;
    if (nil63(x)) {
      __e148 = "return";
    } else {
      __e148 = "return " + compile(x);
    }
    var __x932 = __e148;
    return indentation() + __x932;
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
    var __e149 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e149 = "throw " + compile(["%new", ["Error", x]]);
    } else {
      var __e150 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e150 = "raise " + compile(["Exception", x]);
      } else {
        __e150 = "error(" + (compile(x) + ")");
      }
      __e149 = __e150;
    }
    var __e30 = __e149;
    return indentation() + __e30;
  },
  stmt: true
});
setenv("%throw", {
  _stash: true,
  special: function (x) {
    var __e151 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e151 = "throw " + compile(x);
    } else {
      var __e152 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e152 = "raise " + compile(x);
      } else {
        __e152 = "error(" + (compile(x) + ")");
      }
      __e151 = __e152;
    }
    var __e34 = __e151;
    return indentation() + __e34;
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
    var __id163 = compile(name);
    var __value12 = compile(value);
    var __e153 = undefined;
    if (is63(value)) {
      __e153 = " = " + __value12;
    } else {
      __e153 = "";
    }
    var __rh8 = __e153;
    var __e154 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e154 = "var ";
    } else {
      var __e155 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua") {
        __e155 = "local ";
      } else {
        __e155 = "";
      }
      __e154 = __e155;
    }
    var __keyword3 = __e154;
    var __ind15 = indentation();
    return __ind15 + (__keyword3 + (__id163 + __rh8));
  },
  stmt: true
});
setenv("%set", {
  _stash: true,
  special: function (lh, rh) {
    var __lh8 = compile(lh);
    var __e156 = undefined;
    if (nil63(rh)) {
      __e156 = "nil";
    } else {
      __e156 = rh;
    }
    var __rh10 = compile(__e156);
    return indentation() + (__lh8 + (" = " + __rh10));
  },
  stmt: true
});
setenv("%get", {
  _stash: true,
  special: function (t, k) {
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
  }
});
setenv("%idx", {
  _stash: true,
  special: function (t, k) {
    var __t141 = compile(t);
    var __k141 = compile(k, "raw");
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" && char(__t141, 0) === "{" || infix_operator63(t)) {
      __t141 = "(" + (__t141 + ")");
    }
    return __t141 + ("." + __k141);
  }
});
setenv("%array", {
  _stash: true,
  special: function () {
    var __forms12 = unstash(Array.prototype.slice.call(arguments, 0));
    var __e157 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e157 = "{";
    } else {
      __e157 = "[";
    }
    var __open1 = __e157;
    var __e158 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e158 = "}";
    } else {
      __e158 = "]";
    }
    var __close1 = __e158;
    var __s111 = "";
    var __c18 = "";
    var ____o39 = __forms12;
    var __k67 = undefined;
    for (__k67 in ____o39) {
      var __v43 = ____o39[__k67];
      var __e159 = undefined;
      if (numeric63(__k67)) {
        __e159 = parseInt(__k67);
      } else {
        __e159 = __k67;
      }
      var __k68 = __e159;
      if (number63(__k68)) {
        __s111 = __s111 + (__c18 + compile(__v43));
        __c18 = ", ";
      }
    }
    return __open1 + (__s111 + __close1);
  }
});
setenv("%object", {
  _stash: true,
  special: function () {
    var __forms14 = unstash(Array.prototype.slice.call(arguments, 0));
    var __s13 = "{";
    var __c20 = "";
    var __e160 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e160 = " = ";
    } else {
      __e160 = ": ";
    }
    var __sep3 = __e160;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x941 = indentation();
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    var __ind17 = ____x941;
    var __e161 = undefined;
    if (_35(__forms14) > 2) {
      __e161 = "\n" + __ind17;
    }
    var __pad1 = __e161;
    var __e162 = undefined;
    if (is63(__pad1)) {
      __e162 = "\n" + indentation();
    } else {
      __e162 = "";
    }
    var __end1 = __e162;
    __s13 = __s13 + either(__pad1, "");
    var ____o41 = pair(__forms14);
    var __k72 = undefined;
    for (__k72 in ____o41) {
      var __v46 = ____o41[__k72];
      var __e163 = undefined;
      if (numeric63(__k72)) {
        __e163 = parseInt(__k72);
      } else {
        __e163 = __k72;
      }
      var __k73 = __e163;
      if (number63(__k73)) {
        var ____id165 = __v46;
        var __k74 = has(____id165, 0);
        var __v47 = has(____id165, 1);
        if (! string63(__k74)) {
          throw new Error("Illegal key: " + str(__k74));
        }
        setenv("indent-level", {
          _stash: true,
          toplevel: true
        }).value = has(setenv("indent-level", {
          _stash: true,
          toplevel: true
        }), "value") + 1;
        var ____x942 = compile(__v47);
        setenv("indent-level", {
          _stash: true,
          toplevel: true
        }).value = has(setenv("indent-level", {
          _stash: true,
          toplevel: true
        }), "value") - 1;
        __s13 = __s13 + (__c20 + (key(__k74) + (__sep3 + ____x942)));
        __c20 = "," + either(__pad1, " ");
      }
    }
    return __s13 + (__end1 + "}");
  }
});
setenv("%list", {
  _stash: true,
  special: function (form, comps, cond) {
    var __s15 = compile(form);
    var ____x944 = comps;
    var ____i79 = 0;
    while (____i79 < _35(____x944)) {
      var ____id167 = ____x944[____i79];
      var __k76 = has(____id167, 0);
      var __v49 = has(____id167, 1);
      __s15 = __s15 + (" for " + (compile(__k76) + (" in " + compile(__v49))));
      ____i79 = ____i79 + 1;
    }
    if (is63(cond)) {
      __s15 = __s15 + (" if " + compile(cond));
    }
    return "[" + (__s15 + "]");
  }
});
setenv("%literal", {
  _stash: true,
  special: function () {
    var __args70 = unstash(Array.prototype.slice.call(arguments, 0));
    return apply(cat, map(compile, __args70));
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
    var ____r412 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name31 = destash33(name, ____r412);
    var ____id170 = ____r412;
    var __alias1 = cut(____id170, 0);
    var __ind19 = indentation();
    var __e164 = undefined;
    if (hd(__alias1) === "as") {
      __e164 = __alias1[1];
    } else {
      __e164 = hd(__alias1);
    }
    var __as1 = __e164;
    var __id171 = __as1 || __name31;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __s17 = __ind19 + ("import " + compile(__name31));
      if (__as1) {
        __s17 = __s17 + (" as " + compile(__id171));
      }
      return __s17;
    } else {
      return __ind19 + compile(["%local", __id171, ["require", escape(__name31)]]);
    }
  },
  stmt: true
});
setenv("from", {
  _stash: true,
  special: function (name) {
    var ____r416 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name33 = destash33(name, ____r416);
    var ____id174 = ____r416;
    var __imports1 = cut(____id174, 0);
    var __ind21 = indentation();
    var __id175 = __name33;
    var __r417 = undefined;
    __r417 = drop(__imports1);
    var __e165 = undefined;
    if (last(__imports1) === "as") {
      __e165 = drop(__imports1);
    } else {
      add(__imports1, __r417);
      __r417 = undefined;
      __e165 = __r417;
    }
    var __as3 = __r417;
    var __e166 = undefined;
    if (hd(__imports1) === "import") {
      __e166 = tl(__imports1);
    } else {
      __e166 = __imports1;
    }
    var __names11 = __e166;
    var __names12 = mapcat(function (x) {
      if (x === "*") {
        return x;
      } else {
        return compile(x);
      }
    }, __names11, ", ");
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __s19 = __ind21 + ("from " + (compile(__name33) + (" import " + __names12)));
      if (__as3) {
        __s19 = __s19 + (" as " + compile(__as3));
      }
      return __s19;
    } else {
      return "";
    }
  },
  stmt: true
});
setenv(",", {
  _stash: true,
  special: function () {
    var __args72 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args72)) {
      return ", ";
    } else {
      if (one63(__args72)) {
        return ", " + compile(hd(__args72));
      } else {
        return mapcat(compile, __args72, ", ");
      }
    }
  }
});
setenv(":", {
  _stash: true,
  special: function () {
    var __args74 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args74)) {
      return ":";
    } else {
      if (one63(__args74)) {
        return ":" + compile(hd(__args74));
      } else {
        return mapcat(compile, __args74, ":");
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
    var __args76 = unstash(Array.prototype.slice.call(arguments, 0));
    return indentation() + ("yield " + mapcat(compile, __args76, ", "));
  },
  stmt: true
});
setenv("await", {
  _stash: true,
  special: function (x) {
    var __e167 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e167 = "";
    } else {
      __e167 = "await ";
    }
    var __a38 = __e167;
    return __a38 + compile(x);
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
