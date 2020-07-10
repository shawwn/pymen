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
      var __e51 = undefined;
      if (numeric63(__k)) {
        __e51 = parseInt(__k);
      } else {
        __e51 = __k;
      }
      var __k1 = __e51;
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
      var __e52 = undefined;
      if (numeric63(__k2)) {
        __e52 = parseInt(__k2);
      } else {
        __e52 = __k2;
      }
      var __k3 = __e52;
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
    var __e53 = undefined;
    if (numeric63(__k4)) {
      __e53 = parseInt(__k4);
    } else {
      __e53 = __k4;
    }
    var __k5 = __e53;
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
  var __e54 = undefined;
  if (nil63(from) || from < 0) {
    __e54 = 0;
  } else {
    __e54 = from;
  }
  var __i3 = __e54;
  var __n4 = _35(x);
  var __e55 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e55 = __n4;
  } else {
    __e55 = upto;
  }
  var __upto1 = __e55;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e56 = undefined;
    if (numeric63(__k6)) {
      __e56 = parseInt(__k6);
    } else {
      __e56 = __k6;
    }
    var __k7 = __e56;
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
    var __e57 = undefined;
    if (numeric63(__k8)) {
      __e57 = parseInt(__k8);
    } else {
      __e57 = __k8;
    }
    var __k9 = __e57;
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
      var __e58 = undefined;
      if (numeric63(__k10)) {
        __e58 = parseInt(__k10);
      } else {
        __e58 = __k10;
      }
      var __k11 = __e58;
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
        var __e59 = undefined;
        if (numeric63(__k12)) {
          __e59 = parseInt(__k12);
        } else {
          __e59 = __k12;
        }
        var __k13 = __e59;
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
    var __e60 = undefined;
    if (numeric63(____i10)) {
      __e60 = parseInt(____i10);
    } else {
      __e60 = ____i10;
    }
    var ____i101 = __e60;
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
    var __e61 = undefined;
    if (numeric63(__k14)) {
      __e61 = parseInt(__k14);
    } else {
      __e61 = __k14;
    }
    var __k15 = __e61;
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
    var __e62 = undefined;
    if (f) {
      __e62 = f(__v9);
    } else {
      __e62 = __v9;
    }
    var __y4 = __e62;
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
    var __e63 = undefined;
    if (numeric63(__k16)) {
      __e63 = parseInt(__k16);
    } else {
      __e63 = __k16;
    }
    var __k17 = __e63;
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
    var __e64 = undefined;
    if (numeric63(____i17)) {
      __e64 = parseInt(____i17);
    } else {
      __e64 = ____i17;
    }
    var ____i171 = __e64;
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
      var __e65 = undefined;
      if (numeric63(__k18)) {
        __e65 = parseInt(__k18);
      } else {
        __e65 = __k18;
      }
      var __k19 = __e65;
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
        var __e67 = undefined;
        if (numeric63(__k20)) {
          __e67 = parseInt(__k20);
        } else {
          __e67 = __k20;
        }
        var __k21 = __e67;
        if (!( __k21 === "_stash")) {
          __args1[__k21] = __v12;
        }
      }
      if (params) {
        var ____o13 = params;
        var __k22 = undefined;
        for (__k22 in ____o13) {
          var __v13 = ____o13[__k22];
          var __e68 = undefined;
          if (numeric63(__k22)) {
            __e68 = parseInt(__k22);
          } else {
            __e68 = __k22;
          }
          var __k23 = __e68;
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
          var __e66 = undefined;
          if (numeric63(__k24)) {
            __e66 = parseInt(__k24);
          } else {
            __e66 = __k24;
          }
          var __k25 = __e66;
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
      var __e69 = undefined;
      if (numeric63(__k26)) {
        __e69 = parseInt(__k26);
      } else {
        __e69 = __k26;
      }
      var __k27 = __e69;
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
  var __e70 = undefined;
  if (is63(pos)) {
    __e70 = clip(str, pos);
  } else {
    __e70 = str;
  }
  var __str = __e70;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_starts63 = function (str, x, pos) {
  var __e71 = undefined;
  if (is63(pos)) {
    __e71 = clip(str, pos);
  } else {
    __e71 = str;
  }
  var __str1 = __e71;
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
      var __e72 = undefined;
      if (__c1 === "\n") {
        __e72 = "\\n";
      } else {
        var __e73 = undefined;
        if (__c1 === "\r") {
          __e73 = "\\r";
        } else {
          var __e74 = undefined;
          if (__c1 === "\"") {
            __e74 = "\\\"";
          } else {
            var __e75 = undefined;
            if (__c1 === "\\") {
              __e75 = "\\\\";
            } else {
              __e75 = __c1;
            }
            __e74 = __e75;
          }
          __e73 = __e74;
        }
        __e72 = __e73;
      }
      var __c11 = __e72;
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
                        var __e76 = undefined;
                        if (numeric63(__k28)) {
                          __e76 = parseInt(__k28);
                        } else {
                          __e76 = __k28;
                        }
                        var __k29 = __e76;
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
    var __e77 = undefined;
    if (has63(__keys, "toplevel")) {
      __e77 = hd(environment);
    } else {
      __e77 = last(environment);
    }
    var __frame = __e77;
    var __e78 = undefined;
    if (has63(__frame, __k31)) {
      __e78 = __frame[__k31];
    } else {
      __e78 = {};
    }
    var __entry = __e78;
    var ____o17 = __keys;
    var __k32 = undefined;
    for (__k32 in ____o17) {
      var __v19 = ____o17[__k32];
      var __e79 = undefined;
      if (numeric63(__k32)) {
        __e79 = parseInt(__k32);
      } else {
        __e79 = __k32;
      }
      var __k33 = __e79;
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
        var __e80 = undefined;
        if (numeric63(__k36)) {
          __e80 = parseInt(__k36);
        } else {
          __e80 = __k36;
        }
        var __k37 = __e80;
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
    var __body10 = unstash(Array.prototype.slice.call(arguments, 0));
    if (_35(__body10) > 2 && (__body10[1] === "for" && __body10[3] === "in")) {
      var ____id24 = __body10;
      var __expr8 = has(____id24, 0);
      var __body111 = cut(____id24, 1);
      var __comps3 = [];
      var __cond7 = undefined;
      while (_35(__body111) > 2 && (__body111[0] === "for" && __body111[2] === "in")) {
        var ____id25 = __body111;
        var ___for3 = has(____id25, 0);
        var __names3 = has(____id25, 1);
        var ___in3 = has(____id25, 2);
        var __l121 = has(____id25, 3);
        var __body14 = cut(____id25, 4);
        add(__comps3, [__names3, __l121]);
        __body111 = __body14;
      }
      if (hd(__body111) === "if") {
        var ____id26 = __body111;
        var ___if3 = has(____id26, 0);
        var __expr9 = has(____id26, 1);
        __cond7 = __expr9;
      }
      if (list63(__expr8) && hd63(__expr8, ",")) {
        __expr8 = join([":"], tl(__expr8));
      }
      var ____x96 = object(["%list", __expr8, __comps3, __cond7]);
      ____x96.kind = "object";
      return ____x96;
    } else {
      return join(["%object"], mapo(function (x) {
        return x;
      }, __body10));
    }
  }
});
setenv("let", {
  _stash: true,
  macro: function (bs) {
    var ____r117 = unstash(Array.prototype.slice.call(arguments, 1));
    var __bs11 = destash33(bs, ____r117);
    var ____id31 = ____r117;
    var __body131 = cut(____id31, 0);
    if (atom63(__bs11) || hd63(__bs11, ",")) {
      return join(["let", [__bs11, hd(__body131)]], tl(__body131));
    } else {
      if (none63(__bs11)) {
        return join(["%do"], __body131);
      } else {
        var ____id32 = __bs11;
        var __lh3 = has(____id32, 0);
        var __rh3 = has(____id32, 1);
        var __bs21 = cut(____id32, 2);
        var ____id33 = bind(__lh3, __rh3);
        var __id34 = has(____id33, 0);
        var __val1 = has(____id33, 1);
        var __bs12 = cut(____id33, 2);
        var __renames1 = [];
        if (! id_literal63(__id34)) {
          var __id121 = unique(__id34);
          __renames1 = [__id34, __id121];
          __id34 = __id121;
        }
        return ["%do", ["%local", __id34, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body131)]];
      }
    }
  }
});
setenv("with", {
  _stash: true,
  macro: function (x, v) {
    var ____r119 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x121 = destash33(x, ____r119);
    var __v23 = destash33(v, ____r119);
    var ____id36 = ____r119;
    var __body15 = cut(____id36, 0);
    if (__v23 === "as") {
      return join(["%with", ["%as", __x121, hd(__body15)]], tl(__body15));
    } else {
      if (! atom63(__x121) || has(__body15, "async")) {
        return join(["%with", __x121, __v23], __body15);
      } else {
        return join(["let", [__x121, __v23]], __body15, [__x121]);
      }
    }
  }
});
setenv("let-when", {
  _stash: true,
  macro: function (x, v) {
    var ____r121 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x134 = destash33(x, ____r121);
    var __v25 = destash33(v, ____r121);
    var ____id38 = ____r121;
    var __body17 = cut(____id38, 0);
    var __y6 = unique("y");
    return ["let", __y6, __v25, ["when", ["yes", __y6], join(["let", [__x134, __y6]], __body17)]];
  }
});
setenv("define-macro", {
  _stash: true,
  macro: function (name, args) {
    var ____r123 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name1 = destash33(name, ____r123);
    var __args5 = destash33(args, ____r123);
    var ____id40 = ____r123;
    var __body19 = cut(____id40, 0);
    var ____x143 = object(["setenv", ["quote", __name1]]);
    ____x143.macro = join(["fn", __args5], __body19);
    var __form1 = ____x143;
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
    var ____id42 = ____r125;
    var __body21 = cut(____id42, 0);
    var ____x149 = object(["setenv", ["quote", __name3]]);
    ____x149.special = join(["fn", __args7], __body21);
    var __form3 = join(____x149, props(__body21));
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
    var ____x155 = object(["setenv", ["quote", name]]);
    ____x155.symbol = ["quote", expansion];
    return ____x155;
  }
});
setenv("define-reader", {
  _stash: true,
  macro: function (__x163) {
    var ____r129 = unstash(Array.prototype.slice.call(arguments, 1));
    var ____x163 = destash33(__x163, ____r129);
    var ____id45 = ____x163;
    var __char1 = has(____id45, 0);
    var __s2 = has(____id45, 1);
    var ____id46 = ____r129;
    var __body23 = cut(____id46, 0);
    return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body23)];
  }
});
setenv("define", {
  _stash: true,
  macro: function (name, x) {
    var ____r131 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name5 = destash33(name, ____r131);
    var __x171 = destash33(x, ____r131);
    var ____id48 = ____r131;
    var __body25 = cut(____id48, 0);
    setenv(__name5, {
      _stash: true,
      variable: true
    });
    if (some63(__body25)) {
      return join(["%local-function", __name5], bind42(__x171, __body25), props(__body25));
    } else {
      return join(["%local", __name5, __x171], props(__body25));
    }
  }
});
setenv("define-global", {
  _stash: true,
  macro: function (name, x) {
    var ____r133 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name7 = destash33(name, ____r133);
    var __x177 = destash33(x, ____r133);
    var ____id50 = ____r133;
    var __body27 = cut(____id50, 0);
    setenv(__name7, {
      _stash: true,
      toplevel: true,
      variable: true
    });
    if (some63(__body27)) {
      return join(["%global-function", __name7], bind42(__x177, __body27), props(__body27));
    } else {
      return join(["set", __name7, __x177], props(__body27));
    }
  }
});
setenv("get-value", {
  _stash: true,
  macro: function (x) {
    var ____x184 = object(["setenv", x]);
    ____x184.toplevel = true;
    return ["has", ____x184, ["quote", "value"]];
  }
});
setenv("define-constant", {
  _stash: true,
  macro: function (name, x) {
    var ____x195 = object(["setenv", ["quote", name]]);
    ____x195.toplevel = true;
    ____x195.value = either(x, ["get-value", ["quote", name]]);
    return ["%do", ____x195, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
    var __x223 = destash33(x, ____r142);
    var ____id52 = ____r142;
    var __body29 = cut(____id52, 0);
    var __ok1 = unique("ok");
    var __r143 = unique("r");
    var ____x224 = object(["target", ["try", __x223, join(["finally"], __body29)]]);
    ____x224.lua = join(["let", [[__ok1, __r143], ["guard", __x223]]], __body29, [["if", __ok1, __r143, ["throw", __r143]]]);
    return ____x224;
  }
});
setenv("with-frame", {
  _stash: true,
  macro: function () {
    var __body31 = unstash(Array.prototype.slice.call(arguments, 0));
    return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body31), ["drop", "environment"]]];
  }
});
setenv("with-values", {
  _stash: true,
  macro: function () {
    var __body33 = unstash(Array.prototype.slice.call(arguments, 0));
    var __forms3 = [];
    var ____o21 = __body33;
    var __k40 = undefined;
    for (__k40 in ____o21) {
      var __v27 = ____o21[__k40];
      var __e81 = undefined;
      if (numeric63(__k40)) {
        __e81 = parseInt(__k40);
      } else {
        __e81 = __k40;
      }
      var __k41 = __e81;
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
    var ____id55 = ____x257;
    var __names5 = has(____id55, 0);
    var ____id56 = ____r145;
    var __body35 = cut(____id56, 0);
    var __x258 = unique("x");
    var ____x261 = object(["setenv", __x258]);
    ____x261.variable = true;
    return join(["with-frame", ["each", __x258, __names5, ____x261]], __body35);
  }
});
setenv("let-macro", {
  _stash: true,
  macro: function (definitions) {
    var ____r150 = unstash(Array.prototype.slice.call(arguments, 1));
    var __definitions1 = destash33(definitions, ____r150);
    var ____id58 = ____r150;
    var __body37 = cut(____id58, 0);
    add(environment, {});
    var ____r152 = undefined;
    try{
      map(function (m) {
        return macroexpand(join(["define-macro"], m));
      }, __definitions1);
      ____r152 = join(["%do"], macroexpand(__body37));
    }
    finally{
      drop(environment);
    }
    return ____r152;
  }
});
setenv("let-symbol", {
  _stash: true,
  macro: function (expansions) {
    var ____r158 = unstash(Array.prototype.slice.call(arguments, 1));
    var __expansions1 = destash33(expansions, ____r158);
    var ____id61 = ____r158;
    var __body39 = cut(____id61, 0);
    add(environment, {});
    var ____r160 = undefined;
    try{
      map(function (__x269) {
        var ____id62 = __x269;
        var __name9 = has(____id62, 0);
        var __exp1 = has(____id62, 1);
        return macroexpand(["define-symbol", __name9, __exp1]);
      }, pair(__expansions1));
      ____r160 = join(["%do"], macroexpand(__body39));
    }
    finally{
      drop(environment);
    }
    return ____r160;
  }
});
setenv("let-unique", {
  _stash: true,
  macro: function (names) {
    var ____r164 = unstash(Array.prototype.slice.call(arguments, 1));
    var __names7 = destash33(names, ____r164);
    var ____id64 = ____r164;
    var __body41 = cut(____id64, 0);
    var __bs3 = map(function (n) {
      return [n, ["unique", ["quote", n]]];
    }, __names7);
    return join(["let", apply(join, __bs3)], __body41);
  }
});
setenv("fn", {
  _stash: true,
  macro: function (args) {
    var ____r167 = unstash(Array.prototype.slice.call(arguments, 1));
    var __args9 = destash33(args, ____r167);
    var ____id66 = ____r167;
    var __body43 = cut(____id66, 0);
    return join(["%function"], bind42(__args9, __body43), props(__body43));
  }
});
setenv("apply", {
  _stash: true,
  macro: function (f) {
    var ____r169 = unstash(Array.prototype.slice.call(arguments, 1));
    var __f3 = destash33(f, ____r169);
    var ____id68 = ____r169;
    var __args111 = cut(____id68, 0);
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
    var ____r173 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x369 = destash33(x, ____r173);
    var __t4 = destash33(t, ____r173);
    var ____id71 = ____r173;
    var __body45 = cut(____id71, 0);
    var __o23 = unique("o");
    var __n31 = unique("n");
    var __i37 = unique("i");
    var __e82 = undefined;
    if (atom63(__x369)) {
      __e82 = [__i37, __x369];
    } else {
      var __e83 = undefined;
      if (_35(__x369) > 1) {
        __e83 = __x369;
      } else {
        __e83 = [__i37, hd(__x369)];
      }
      __e82 = __e83;
    }
    var ____id72 = __e82;
    var __k43 = has(____id72, 0);
    var __v29 = has(____id72, 1);
    var ____x375 = object(["target", __o23]);
    ____x375.py = ["indices", __o23];
    var __e84 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e84 = __body45;
    } else {
      __e84 = [join(["let", __k43, ["if", ["numeric?", __k43], ["parseInt", __k43], __k43]], __body45)];
    }
    return ["let", [__o23, __t4, __k43, "nil"], join(["%for", ____x375, __k43], props(__body45), [join(["let", [__v29, ["%get", __o23, __k43]]], __e84)])];
  }
});
setenv("for", {
  _stash: true,
  macro: function (i, to) {
    var ____r175 = unstash(Array.prototype.slice.call(arguments, 2));
    var __i39 = destash33(i, ____r175);
    var __to1 = destash33(to, ____r175);
    var ____id74 = ____r175;
    var __body47 = cut(____id74, 0);
    if (__to1 === "in") {
      return join(["%for", hd(__body47), __i39, join(["%do"], tl(__body47))], props(__body47));
    } else {
      return ["let", __i39, 0, join(["while", ["<", __i39, __to1]], __body47, [["inc", __i39]])];
    }
  }
});
setenv("step", {
  _stash: true,
  macro: function (v, t) {
    var ____r177 = unstash(Array.prototype.slice.call(arguments, 2));
    var __v31 = destash33(v, ____r177);
    var __t6 = destash33(t, ____r177);
    var ____id76 = ____r177;
    var __body49 = cut(____id76, 0);
    var __x408 = unique("x");
    var __i41 = unique("i");
    return ["let", [__x408, __t6], ["for", __i41, ["#", __x408], join(["let", [__v31, ["at", __x408, __i41]]], __body49)]];
  }
});
setenv("set-of", {
  _stash: true,
  macro: function () {
    var __xs13 = unstash(Array.prototype.slice.call(arguments, 0));
    var __l14 = [];
    var ____o25 = __xs13;
    var ____i43 = undefined;
    for (____i43 in ____o25) {
      var __x418 = ____o25[____i43];
      var __e85 = undefined;
      if (numeric63(____i43)) {
        __e85 = parseInt(____i43);
      } else {
        __e85 = ____i43;
      }
      var ____i431 = __e85;
      __l14[__x418] = true;
    }
    return join(["obj"], __l14);
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
    var ____r183 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a6 = destash33(a, ____r183);
    var ____id78 = ____r183;
    var __bs5 = cut(____id78, 0);
    return ["set", __a6, join(["join", __a6], __bs5)];
  }
});
setenv("cat!", {
  _stash: true,
  macro: function (a) {
    var ____r185 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a8 = destash33(a, ____r185);
    var ____id80 = ____r185;
    var __bs7 = cut(____id80, 0);
    return ["set", __a8, join(["cat", __a8], __bs7)];
  }
});
setenv("inc", {
  _stash: true,
  macro: function (n, by) {
    var __e86 = undefined;
    if (nil63(by)) {
      __e86 = 1;
    } else {
      __e86 = by;
    }
    return ["set", n, ["+", n, __e86]];
  }
});
setenv("dec", {
  _stash: true,
  macro: function (n, by) {
    var __e87 = undefined;
    if (nil63(by)) {
      __e87 = 1;
    } else {
      __e87 = by;
    }
    return ["set", n, ["-", n, __e87]];
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
    var __names9 = unstash(Array.prototype.slice.call(arguments, 0));
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
  }
});
setenv("when-compiling", {
  _stash: true,
  macro: function () {
    var __body51 = unstash(Array.prototype.slice.call(arguments, 0));
    return _eval(join(["%do"], __body51));
  }
});
setenv("during-compilation", {
  _stash: true,
  macro: function () {
    var __body53 = unstash(Array.prototype.slice.call(arguments, 0));
    var __form5 = join(["%do"], __body53);
    _eval(__form5);
    return __form5;
  }
});
setenv("def", {
  _stash: true,
  macro: function (name) {
    var ____r195 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name11 = destash33(name, ____r195);
    var ____id82 = ____r195;
    var __body55 = cut(____id82, 0);
    return join(["define-global", __name11], __body55);
  }
});
setenv("mac", {
  _stash: true,
  macro: function (name) {
    var ____r197 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name13 = destash33(name, ____r197);
    var ____id84 = ____r197;
    var __body57 = cut(____id84, 0);
    return join(["define-macro", __name13], __body57);
  }
});
setenv("defconst", {
  _stash: true,
  macro: function (name) {
    var ____r199 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name15 = destash33(name, ____r199);
    var ____id86 = ____r199;
    var __value1 = cut(____id86, 0);
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
    var ____r203 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name17 = destash33(name, ____r203);
    var ____id88 = ____r203;
    var __value3 = cut(____id88, 0);
    var ____x513 = object(["target"]);
    ____x513.py = ["global", __name17];
    return ["when", ["undefined?", __name17], ____x513, join(["defconst", __name17], __value3)];
  }
});
setenv("async", {
  _stash: true,
  macro: function (keyword) {
    var ____r205 = unstash(Array.prototype.slice.call(arguments, 1));
    var __keyword1 = destash33(keyword, ____r205);
    var ____id90 = ____r205;
    var __body59 = cut(____id90, 0);
    var ____x517 = object([__keyword1]);
    ____x517.async = true;
    return join(____x517, __body59);
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
    var ____r211 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a10 = destash33(a, ____r211);
    var ____id92 = ____r211;
    var __bs9 = cut(____id92, 0);
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
    var ____r213 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a12 = destash33(a, ____r213);
    var ____id94 = ____r213;
    var __bs111 = cut(____id94, 0);
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
    var ____r215 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a14 = destash33(a, ____r215);
    var ____id96 = ____r215;
    var __bs13 = cut(____id96, 0);
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
    var ____r217 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a16 = destash33(a, ____r217);
    var ____id98 = ____r217;
    var __bs15 = cut(____id98, 0);
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
    var ____r219 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a18 = destash33(a, ____r219);
    var ____id100 = ____r219;
    var __bs17 = cut(____id100, 0);
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
    var ____r221 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a20 = destash33(a, ____r221);
    var ____id102 = ____r221;
    var __bs19 = cut(____id102, 0);
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
    var ____r223 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a22 = destash33(a, ____r223);
    var ____id104 = ____r223;
    var __bs211 = cut(____id104, 0);
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
    var ____r225 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a24 = destash33(a, ____r225);
    var ____id106 = ____r225;
    var __bs23 = cut(____id106, 0);
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
    var ____r227 = unstash(Array.prototype.slice.call(arguments, 1));
    var __c3 = destash33(c, ____r227);
    var ____id108 = ____r227;
    var __body61 = cut(____id108, 0);
    return join(["%while", __c3], __body61);
  }
});
setenv("do", {
  _stash: true,
  macro: function () {
    var __body63 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%do"], __body63);
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
    var ____r229 = unstash(Array.prototype.slice.call(arguments, 1));
    var __x655 = destash33(x, ____r229);
    var ____id1111 = ____r229;
    var __body65 = cut(____id1111, 0);
    var __e88 = undefined;
    if (atom63(__x655)) {
      __e88 = [__x655];
    } else {
      __e88 = __x655;
    }
    var ____id112 = __e88;
    var __a26 = has(____id112, 0);
    var __bs25 = cut(____id112, 1);
    var __e89 = undefined;
    if (none63(__bs25)) {
      __e89 = [["%literal"]];
    } else {
      __e89 = __bs25;
    }
    return join(["%block", __a26], __e89, __body65);
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
        var __r232 = unique("r");
        return join(["with", __r232, "nil"], map(function (__x673) {
          var ____id114 = __x673;
          var __x674 = has(____id114, 0);
          var __body67 = cut(____id114, 1);
          return ["%expand-case", __x674, ["%set", __r232, join(["%do"], __body67)]];
        }, almost(__args51)), [join(["%expand-case"], last(__args51))]);
      }
    }
  }
});
setenv("try", {
  _stash: true,
  macro: function (x) {
    var ____r235 = unstash(Array.prototype.slice.call(arguments, 1));
    var __x693 = destash33(x, ____r235);
    var ____id119 = ____r235;
    var __cases1 = cut(____id119, 0);
    var __fin1 = ["finally"];
    var ____o27 = __cases1;
    var ____i46 = undefined;
    for (____i46 in ____o27) {
      var __x695 = ____o27[____i46];
      var __e90 = undefined;
      if (numeric63(____i46)) {
        __e90 = parseInt(____i46);
      } else {
        __e90 = ____i46;
      }
      var ____i461 = __e90;
      if (hd63(__x695, "finally")) {
        __fin1 = __x695;
      }
    }
    var __forms7 = [];
    var ____x698 = __cases1;
    var ____i47 = 0;
    while (____i47 < _35(____x698)) {
      var ____id120 = ____x698[____i47];
      var __x699 = has(____id120, 0);
      var __body71 = cut(____id120, 1);
      if (__x699 === "finally") {
      } else {
        if (__x699 === "except" && has(__body71, 1) === "as") {
          var ____id1211 = __body71;
          var __kind2 = has(____id1211, 0);
          var ___1 = has(____id1211, 1);
          var __name19 = has(____id1211, 2);
          var __body72 = cut(____id1211, 3);
          add(__forms7, join([[__x699, ["%as", __kind2, __name19]]], __body72));
        } else {
          if (__x699 === "except") {
            var ____id122 = __body71;
            var __kind3 = has(____id122, 0);
            var __body73 = cut(____id122, 1);
            add(__forms7, join([[__x699, __kind3]], __body73));
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
setenv("errsafe", {
  _stash: true,
  macro: function (x, _else) {
    if (nil63(_else)) {
      _else = "nil";
    }
    return ["let", [["ok", "v"], ["guard", x]], ["if", "ok", "v", _else]];
  }
});
setenv("dbg", {
  _stash: true,
  macro: function () {
    var ____x722 = object(["target", ["do"]]);
    ____x722.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
    return ____x722;
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
  var ____id123 = s;
  var __pos = has(____id123, "pos");
  var __len = has(____id123, "len");
  var __string = has(____id123, "string");
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
  var __form6 = read_1(s);
  if ("," === peek_char(s)) {
    var __r248 = [",", __form6];
    while (true) {
      read_char(s);
      __form6 = read_1(s);
      if (eof63(s, __form6)) {
        return expected(s, "tuple");
      }
      add(__r248, __form6);
      if (!( "," === peek_char(s))) {
        break;
      }
    }
    return __r248;
  } else {
    return __form6;
  }
};
var read_all = function (s) {
  var __r250 = undefined;
  var __l15 = [];
  while (nil63(__r250)) {
    var __form7 = read(s);
    if (more63(s, __form7)) {
      __r250 = s.more;
    } else {
      if (eof63(s, __form7)) {
        __r250 = __l15;
      } else {
        add(__l15, __form7);
      }
    }
  }
  return __r250;
};
read_string = function (str, more) {
  var __s3 = stream(str, more);
  var __x730 = read(__s3);
  if (!( __x730 === eof)) {
    return __x730;
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
  if (more63(s, __y7)) {
    return __y7;
  } else {
    return [x, __y7];
  }
};
var hex_prefix63 = function (str) {
  var __e91 = undefined;
  if (code(str, 0) === 45) {
    __e91 = 1;
  } else {
    __e91 = 0;
  }
  var __i48 = __e91;
  var __id186 = code(str, __i48) === 48;
  var __e92 = undefined;
  if (__id186) {
    __i48 = __i48 + 1;
    var __n36 = code(str, __i48);
    __e92 = __n36 === 120 || __n36 === 88;
  } else {
    __e92 = __id186;
  }
  return __e92;
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
  var __r261 = undefined;
  var __l16 = [];
  while (nil63(__r261)) {
    skip_non_code(s);
    var __c8 = peek_char(s);
    if (__c8 === ")") {
      read_char(s);
      __r261 = __l16;
    } else {
      if (nil63(__c8)) {
        __r261 = expected(s, ")");
      } else {
        var __x732 = read(s);
        if (eof63(s, __x732)) {
          __r261 = expected(s, ")");
        } else {
          if (key63(__x732)) {
            var __k44 = clip(__x732, 0, edge(__x732));
            var __v32 = read(s);
            __l16 = object(__l16);
            __l16[__k44] = __v32;
          } else {
            if (flag63(__x732)) {
              __l16 = object(__l16);
              __l16[clip(__x732, 1)] = true;
            } else {
              add(__l16, __x732);
            }
          }
        }
      }
    }
  }
  return __r261;
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
var read_matching = function (opener, closer, s) {
  var __r264 = undefined;
  var __pos1 = s.pos;
  var __str3 = "";
  var __i49 = 0;
  while (__i49 < _35(opener)) {
    __str3 = __str3 + (read_char(s) || "");
    __i49 = __i49 + 1;
  }
  if (__str3 === opener) {
    while (nil63(__r264)) {
      if (clip(s.string, s.pos, s.pos + _35(closer)) === closer) {
        var __i50 = 0;
        while (__i50 < _35(closer)) {
          __str3 = __str3 + read_char(s);
          __i50 = __i50 + 1;
        }
        __r264 = __str3;
      } else {
        if (nil63(peek_char(s))) {
          __r264 = expected(s, closer);
        } else {
          __str3 = __str3 + read_char(s);
          if (peek_char(s) === "\\") {
            __str3 = __str3 + read_char(s);
          }
        }
      }
    }
  }
  return __r264;
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
      var __r266 = undefined;
      read_char(s);
      while (nil63(__r266)) {
        var __c9 = peek_char(s);
        if (__c9 === "\"") {
          read_char(s);
          __r266 = clip(s.string, __i51, s.pos);
        } else {
          if (nil63(__c9)) {
            __r266 = expected(s, "\"");
          } else {
            if (__c9 === "\\") {
              read_char(s);
            }
            read_char(s);
          }
        }
      }
      return __r266;
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
        var __e93 = undefined;
        if (p) {
          __e93 = has(__b6, p);
        } else {
          __e93 = __b6;
        }
        return __e93;
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
      var __l17 = array(args);
      var ____o28 = args;
      var __k45 = undefined;
      for (__k45 in ____o28) {
        var __v33 = ____o28[__k45];
        var __e95 = undefined;
        if (numeric63(__k45)) {
          __e95 = parseInt(__k45);
        } else {
          __e95 = __k45;
        }
        var __k46 = __e95;
        if (! number63(__k46)) {
          add(__l17, ["%literal", __k46, "|=|", __v33]);
        }
      }
      return __l17;
    } else {
      var __l18 = ["%object", "\"_stash\"", true];
      var ____o29 = args;
      var __k47 = undefined;
      for (__k47 in ____o29) {
        var __v34 = ____o29[__k47];
        var __e94 = undefined;
        if (numeric63(__k47)) {
          __e94 = parseInt(__k47);
        } else {
          __e94 = __k47;
        }
        var __k48 = __e94;
        if (! number63(__k48)) {
          add(__l18, literal(__k48));
          add(__l18, __v34);
        }
      }
      return join(args, [__l18]);
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
        var ____id124 = lh;
        var ___2 = has(____id124, 0);
        var ___var = has(____id124, 1);
        var __val2 = has(____id124, 2);
        var __val3 = either(__val2, ___var);
        return bind(["o", ___var, ["the", __val3]], rh);
      } else {
        if (hd(lh) === "o") {
          var ____id125 = lh;
          var ___3 = has(____id125, 0);
          var ___var1 = has(____id125, 1);
          var __val4 = has(____id125, 2);
          return [___var1, ["if", ["nil?", rh], __val4, rh]];
        } else {
          var __id126 = unique("id");
          var __bs26 = [__id126, rh];
          var ____o30 = lh;
          var __k49 = undefined;
          for (__k49 in ____o30) {
            var __v35 = ____o30[__k49];
            var __e96 = undefined;
            if (numeric63(__k49)) {
              __e96 = parseInt(__k49);
            } else {
              __e96 = __k49;
            }
            var __k50 = __e96;
            var __e97 = undefined;
            if (__k50 === "rest") {
              __e97 = ["cut", __id126, _35(lh)];
            } else {
              __e97 = ["has", __id126, ["quote", bias(__k50)]];
            }
            var __x745 = __e97;
            if (is63(__k50)) {
              var __e98 = undefined;
              if (__v35 === true) {
                __e98 = __k50;
              } else {
                __e98 = __v35;
              }
              var __k51 = __e98;
              __bs26 = join(__bs26, bind(__k51, __x745));
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
    var ____x756 = object(["target"]);
    ____x756.js = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", from];
    ____x756.py = ["|list|", "|_args|"];
    ____x756.lua = ["list", "|...|"];
    return ____x756;
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
    var ____x767 = object(["target"]);
    ____x767.py = "|_keys|";
    return ["unstash", ["arguments%", _35(__args131)], ____x767];
  };
  if (atom63(args)) {
    return [__args131, join(["let", [args, rest()]], body)];
  } else {
    var ____id127 = body_docstring(body);
    var __doc = has(____id127, 0);
    var __body74 = has(____id127, 1);
    var __pre = [];
    var __bs27 = [];
    var __inits = [];
    var __r291 = unique("r");
    var ____o31 = args;
    var __k52 = undefined;
    for (__k52 in ____o31) {
      var __v36 = ____o31[__k52];
      var __e99 = undefined;
      if (numeric63(__k52)) {
        __e99 = parseInt(__k52);
      } else {
        __e99 = __k52;
      }
      var __k53 = __e99;
      if (number63(__k53)) {
        if (atom63(__v36)) {
          add(__args131, __v36);
        } else {
          if (hd(__v36) === "o") {
            var ____id128 = __v36;
            var ___4 = has(____id128, 0);
            var ___var2 = has(____id128, 1);
            var __val5 = has(____id128, 2);
            add(__args131, ___var2);
            add(__inits, ["%if", ["nil?", ___var2], ["%set", ___var2, __val5]]);
          } else {
            if (hd(__v36) === "t") {
              var ____id129 = __v36;
              var ___5 = has(____id129, 0);
              var ___var3 = has(____id129, 1);
              var __val6 = has(____id129, 2);
              var __val7 = either(__val6, ___var3);
              add(__args131, ___var3);
              add(__inits, ["%if", ["nil?", ___var3], ["%set", ___var3, ["the", __val7]]]);
            } else {
              var __x778 = unique("x");
              add(__args131, __x778);
              __bs27 = join(__bs27, [__v36, __x778]);
            }
          }
        }
      }
    }
    if (props63(args)) {
      __pre = join(__pre, [__r291, rest()]);
      var __n42 = _35(__args131);
      var __i58 = 0;
      while (__i58 < __n42) {
        var __v37 = __args131[__i58];
        __pre = join(__pre, [__v37, ["destash!", __v37, __r291]]);
        __i58 = __i58 + 1;
      }
      __bs27 = join(__bs27, [props(args), __r291]);
    }
    var __forms8 = join(["let", __pre], __inits, [join(["let", __bs27], __body74)]);
    var __e100 = undefined;
    if (is63(__doc)) {
      __e100 = ["do", __doc, __forms8];
    } else {
      __e100 = __forms8;
    }
    return [__args131, __e100];
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
var expand_local = function (__x789) {
  var ____id130 = __x789;
  var __x790 = has(____id130, 0);
  var __name20 = has(____id130, 1);
  var __value4 = has(____id130, 2);
  setenv(__name20, {
    _stash: true,
    variable: true
  });
  return ["%local", __name20, macroexpand(__value4)];
};
var expand_function = function (__x792) {
  var ____id131 = __x792;
  var __x793 = has(____id131, 0);
  var __args52 = has(____id131, 1);
  var __body75 = cut(____id131, 2);
  add(environment, {});
  var ____r299 = undefined;
  try{
    var ____o32 = __args52;
    var ____i59 = undefined;
    for (____i59 in ____o32) {
      var ____x794 = ____o32[____i59];
      var __e101 = undefined;
      if (numeric63(____i59)) {
        __e101 = parseInt(____i59);
      } else {
        __e101 = ____i59;
      }
      var ____i591 = __e101;
      setenv(____x794, {
        _stash: true,
        variable: true
      });
    }
    ____r299 = join(["%function", __args52], macroexpand(__body75));
  }
  finally{
    drop(environment);
  }
  return ____r299;
};
var expand_definition = function (__x796) {
  var ____id132 = __x796;
  var __x797 = has(____id132, 0);
  var __name21 = has(____id132, 1);
  var __args53 = has(____id132, 2);
  var __body76 = cut(____id132, 3);
  add(environment, {});
  var ____r302 = undefined;
  try{
    var ____o33 = __args53;
    var ____i60 = undefined;
    for (____i60 in ____o33) {
      var ____x798 = ____o33[____i60];
      var __e102 = undefined;
      if (numeric63(____i60)) {
        __e102 = parseInt(____i60);
      } else {
        __e102 = ____i60;
      }
      var ____i601 = __e102;
      setenv(____x798, {
        _stash: true,
        variable: true
      });
    }
    ____r302 = join([__x797, __name21, __args53], macroexpand(__body76));
  }
  finally{
    drop(environment);
  }
  return ____r302;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x800) {
  var ____id133 = __x800;
  var __name22 = has(____id133, 0);
  var __body77 = cut(____id133, 1);
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
        var __x803 = hd(form);
        if (__x803 === "%local") {
          return expand_local(form);
        } else {
          if (__x803 === "%function") {
            return expand_function(form);
          } else {
            if (__x803 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x803 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x803 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x803)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x803)) {
                      return macroexpand(join([parse_access(__x803)], tl(form)));
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
    var __e103 = undefined;
    if (numeric63(__k54)) {
      __e103 = parseInt(__k54);
    } else {
      __e103 = __k54;
    }
    var __k55 = __e103;
    if (! number63(__k55)) {
      var __e104 = undefined;
      if (quasisplice63(__v38, depth)) {
        __e104 = quasiexpand(__v38[1]);
      } else {
        __e104 = quasiexpand(__v38, depth);
      }
      var __v39 = __e104;
      last(__xs14)[__k55] = __v39;
    }
  }
  var ____x807 = form;
  var ____i62 = 0;
  while (____i62 < _35(____x807)) {
    var __x808 = ____x807[____i62];
    if (quasisplice63(__x808, depth)) {
      var __x809 = quasiexpand(__x808[1]);
      add(__xs14, __x809);
      add(__xs14, ["list"]);
    } else {
      add(last(__xs14), quasiexpand(__x808, depth));
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
expand_if = function (__x813) {
  var ____id134 = __x813;
  var __a27 = has(____id134, 0);
  var __b7 = has(____id134, 1);
  var __c111 = cut(____id134, 2);
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
  var __i63 = 0;
  while (__i63 < has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value")) {
    __s4 = __s4 + "  ";
    __i63 = __i63 + 1;
  }
  return __s4;
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
    var __e105 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e105 = "L_";
    } else {
      __e105 = "_";
    }
    var __x819 = __e105;
    var __e106 = undefined;
    if (number_code63(code(id, 0))) {
      __e106 = __x819;
    } else {
      __e106 = "";
    }
    var __id1311 = __e106;
    var __i64 = 0;
    while (__i64 < _35(id)) {
      var __c12 = char(id, __i64);
      var __n47 = code(__c12);
      var __e107 = undefined;
      if (__c12 === "-" && !( id === "-")) {
        var __e110 = undefined;
        if (__i64 === 0) {
          __e110 = __x819;
        } else {
          __e110 = "_";
        }
        __e107 = __e110;
      } else {
        var __e108 = undefined;
        if (valid_code63(__n47)) {
          __e108 = __c12;
        } else {
          var __e109 = undefined;
          if (__i64 === 0) {
            __e109 = __x819 + __n47;
          } else {
            __e109 = __n47;
          }
          __e108 = __e109;
        }
        __e107 = __e108;
      }
      var __c121 = __e107;
      __id1311 = __id1311 + __c121;
      __i64 = __i64 + 1;
    }
    if (raw63) {
      return __id1311;
    } else {
      if (reserved63(__id1311)) {
        return __x819 + __id1311;
      } else {
        return __id1311;
      }
    }
  }
};
valid_id63 = function (x) {
  return some63(x) && x === compile_id(x);
};
var __names10 = {};
unique = function (x) {
  var __x820 = compile_id(x);
  if (has63(__names10, __x820)) {
    var __i65 = __names10[__x820];
    __names10[__x820] = __names10[__x820] + 1;
    return unique(__x820 + __i65);
  } else {
    __names10[__x820] = 1;
    return "__" + __x820;
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
    var __e111 = undefined;
    if (numeric63(__k56)) {
      __e111 = parseInt(__k56);
    } else {
      __e111 = __k56;
    }
    var __k57 = __e111;
    var __x821 = f(__v40);
    if (is63(__x821)) {
      add(__o35, literal(__k57));
      add(__o35, __x821);
    }
  }
  return __o35;
};
var ____x823 = object([]);
var ____x824 = object([]);
____x824.js = "!";
____x824.lua = "not";
____x824.py = "not";
____x823["%not"] = ____x824;
____x823["%unm"] = "-";
var ____x825 = object([]);
____x825["%mul"] = "*";
____x825["%div"] = "/";
____x825["%idiv"] = "//";
____x825["%mod"] = "%";
var ____x826 = object([]);
var ____x827 = object([]);
____x827.js = "+";
____x827.lua = "..";
____x827.py = "+";
____x826["%cat"] = ____x827;
var ____x828 = object([]);
____x828["%add"] = "+";
____x828["%sub"] = "-";
var ____x829 = object([]);
____x829["%lt"] = "<";
____x829["%gt"] = ">";
____x829["%le"] = "<=";
____x829["%ge"] = ">=";
var ____x830 = object([]);
var ____x831 = object([]);
____x831.js = "===";
____x831.lua = "==";
____x831.py = "==";
____x830["%eq"] = ____x831;
var ____x832 = object([]);
var ____x833 = object([]);
____x833.py = "in";
____x832["%in"] = ____x833;
var ____x834 = object([]);
____x834.py = "is";
____x832["%is"] = ____x834;
var ____x835 = object([]);
var ____x836 = object([]);
____x836.js = "&&";
____x836.lua = "and";
____x836.py = "and";
____x835["%and"] = ____x836;
var ____x837 = object([]);
var ____x838 = object([]);
____x838.js = "||";
____x838.lua = "or";
____x838.py = "or";
____x837["%or"] = ____x838;
var infix = [____x823, ____x825, ____x826, ____x828, ____x829, ____x830, ____x832, ____x835, ____x837];
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
      var __e112 = undefined;
      if (numeric63(__k58)) {
        __e112 = parseInt(__k58);
      } else {
        __e112 = __k58;
      }
      var __k59 = __e112;
      if (has63(__v41, hd(form))) {
        return index(__k59);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x840 = has(level, op);
    if (__x840 === true) {
      return op;
    } else {
      if (string63(__x840)) {
        return __x840;
      } else {
        if (is63(__x840)) {
          return has(__x840, has(setenv("target", {
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
  var __s5 = "(";
  var __c13 = "";
  var ____x841 = args;
  var ____i69 = 0;
  while (____i69 < _35(____x841)) {
    var __x842 = ____x841[____i69];
    __s5 = __s5 + (__c13 + compile(__x842));
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" && (default63 && ! id_literal63(__x842))) {
      __s5 = __s5 + "=None";
    }
    __c13 = ", ";
    ____i69 = ____i69 + 1;
  }
  return __s5 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s12 = "";
    var __i70 = 0;
    while (__i70 < _35(s)) {
      var __c14 = char(s, __i70);
      var __e113 = undefined;
      if (__c14 === "\n") {
        __e113 = "\\n";
      } else {
        var __e114 = undefined;
        if (__c14 === "\r") {
          __e114 = "\\r";
        } else {
          __e114 = __c14;
        }
        __e113 = __e114;
      }
      __s12 = __s12 + __e113;
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
  var ____id135 = form;
  var __x843 = has(____id135, 0);
  var __args54 = cut(____id135, 1);
  var ____id136 = getenv(__x843);
  var __special = has(____id136, "special");
  var __stmt = has(____id136, "stmt");
  var __self_tr63 = has(____id136, "tr");
  var __e115 = undefined;
  if (stmt63 && ! __stmt) {
    __e115 = indentation();
  } else {
    __e115 = "";
  }
  var __p1 = __e115;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p1 + (apply(__special, __args54) + __tr);
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
method_call63 = function (form) {
  var __e116 = undefined;
  if (list63(form)) {
    __e116 = hd(form);
  } else {
    __e116 = form;
  }
  var __x844 = __e116;
  return string63(__x844) && (_35(__x844, 1) > 1 && char(__x844, 0) === ".");
};
var compile_call = function (form) {
  var __f4 = hd(form);
  var __f11 = compile(__f4);
  var __args55 = stash42(tl(form));
  var __e117 = undefined;
  if (method_call63(hd(__args55))) {
    __e117 = mapcat(compile, __args55, "");
  } else {
    __e117 = compile_args(__args55);
  }
  var __args56 = __e117;
  if (parenthesize_call63(__f4)) {
    return "(" + (__f11 + (")" + __args56));
  } else {
    return __f11 + __args56;
  }
};
var op_delims = function (parent, child) {
  var ____r344 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r344);
  var __child = destash33(child, ____r344);
  var ____id137 = ____r344;
  var __right = has(____id137, "right");
  var __e118 = undefined;
  if (__right) {
    __e118 = _6261;
  } else {
    __e118 = _62;
  }
  if (__e118(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id138 = form;
  var __op = has(____id138, 0);
  var ____id139 = cut(____id138, 1);
  var __a28 = has(____id139, 0);
  var __b8 = has(____id139, 1);
  var ____id140 = op_delims(form, __a28);
  var __ao = has(____id140, 0);
  var __ac = has(____id140, 1);
  var ____id141 = op_delims(form, __b8, {
    _stash: true,
    right: true
  });
  var __bo = has(____id141, 0);
  var __bc = has(____id141, 1);
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
  var ____x847 = compile(body, {
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
  var __s6 = ____x847;
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
    var ____x848 = indentation() + "pass\n";
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    return ____x848;
  } else {
    return __s6;
  }
};
compile_function = function (args, body) {
  var ____r347 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args57 = destash33(args, ____r347);
  var __body78 = destash33(body, ____r347);
  var ____id142 = ____r347;
  var __name23 = has(____id142, "name");
  var __prefix = has(____id142, "prefix");
  var __async = has(____id142, "async");
  var __e119 = undefined;
  if (__name23) {
    __e119 = compile(__name23);
  } else {
    __e119 = "";
  }
  var __id143 = __e119;
  var __e120 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && has63(__args57, "rest")) {
    __e120 = join(__args57, ["|...|"]);
  } else {
    var __e121 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" && has63(__args57, "rest")) {
      __e121 = join(__args57, ["|*_args|", "|**_keys|"]);
    } else {
      __e121 = __args57;
    }
    __e120 = __e121;
  }
  var __args141 = __e120;
  var __args58 = compile_args(__args141, true);
  var __body79 = compile_body(__body78);
  var __ind = indentation();
  var __e122 = undefined;
  if (__prefix) {
    __e122 = __prefix + " ";
  } else {
    __e122 = "";
  }
  var __p2 = __e122;
  var __e123 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e123 = "";
  } else {
    __e123 = "end";
  }
  var __tr1 = __e123;
  var __e124 = undefined;
  if (__async && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua")) {
    __e124 = "async ";
  } else {
    __e124 = "";
  }
  var __a30 = __e124;
  if (__name23) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __a30 + ("function " + (__id143 + (__args58 + (" {\n" + (__body79 + (__ind + ("}" + __tr1)))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __e125 = undefined;
      if (none63(__ind)) {
        __e125 = "\n";
      } else {
        __e125 = "";
      }
      var __ws = __e125;
      return __a30 + ("def " + (__id143 + (__args58 + (":\n" + (__body79 + __ws)))));
    } else {
      return __p2 + ("function " + (__id143 + (__args58 + ("\n" + (__body79 + (__ind + __tr1))))));
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "%return") && ! statement63(hd(form)));
};
compile = function (form, raw63) {
  var ____r349 = unstash(Array.prototype.slice.call(arguments, 2));
  var __form8 = destash33(form, ____r349);
  var __raw63 = destash33(raw63, ____r349);
  var ____id144 = ____r349;
  var __stmt1 = has(____id144, "stmt");
  if (nil63(__form8)) {
    return "";
  } else {
    if (special_form63(__form8)) {
      return compile_special(__form8, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e126 = undefined;
      if (__stmt1) {
        __e126 = indentation();
      } else {
        __e126 = "";
      }
      var __ind1 = __e126;
      var __e127 = undefined;
      if (atom63(__form8)) {
        __e127 = compile_atom(__form8, __raw63);
      } else {
        var __e128 = undefined;
        if (infix63(hd(__form8))) {
          __e128 = compile_infix(__form8);
        } else {
          __e128 = compile_call(__form8);
        }
        __e127 = __e128;
      }
      var __form9 = __e127;
      return __ind1 + (__form9 + __tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e11 = lower(form, __hoist, true, tail63);
  var __e129 = undefined;
  if (some63(__hoist) && is63(__e11)) {
    __e129 = join(["%do"], __hoist, [__e11]);
  } else {
    var __e130 = undefined;
    if (is63(__e11)) {
      __e130 = __e11;
    } else {
      var __e131 = undefined;
      if (_35(__hoist) > 1) {
        __e131 = join(["%do"], __hoist);
      } else {
        __e131 = hd(__hoist);
      }
      __e130 = __e131;
    }
    __e129 = __e130;
  }
  return either(__e129, ["%do"]);
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
  var ____x856 = almost(args);
  var ____i71 = 0;
  while (____i71 < _35(____x856)) {
    var __x857 = ____x856[____i71];
    var ____y8 = lower(__x857, hoist, stmt63);
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
  var ____id145 = args;
  var __lh4 = has(____id145, 0);
  var __rh4 = has(____id145, 1);
  var __lh11 = lower(__lh4, hoist);
  var __rh11 = lower(__rh4, hoist);
  add(hoist, ["%set", __lh11, __rh11]);
  if (!( stmt63 && ! tail63)) {
    return __lh11;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id146 = args;
  var __cond8 = has(____id146, 0);
  var __then = has(____id146, 1);
  var ___else = has(____id146, 2);
  if (stmt63) {
    var __e133 = undefined;
    if (is63(___else)) {
      __e133 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond8, hoist), lower_body([__then], tail63)], __e133));
  } else {
    var __e14 = unique("e");
    add(hoist, ["%local", __e14, "nil"]);
    var __e132 = undefined;
    if (is63(___else)) {
      __e132 = [lower(["%set", __e14, ___else])];
    }
    add(hoist, join(["%if", lower(__cond8, hoist), lower(["%set", __e14, __then])], __e132));
    return __e14;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id147 = args;
  var __a31 = has(____id147, 0);
  var __b10 = has(____id147, 1);
  var __hoist1 = [];
  var __b11 = lower(__b10, __hoist1);
  if (some63(__hoist1)) {
    var __id148 = unique("id");
    var __e134 = undefined;
    if (x === "%and") {
      __e134 = ["%if", __id148, __b10, __id148];
    } else {
      __e134 = ["%if", __id148, __id148, __b10];
    }
    return lower(["%do", ["%local", __id148, __a31], __e134], hoist);
  } else {
    return [x, lower(__a31, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id149 = args;
  var __c15 = has(____id149, 0);
  var __body80 = cut(____id149, 1);
  var __pre1 = [];
  var __c16 = lower(__c15, __pre1);
  var __e135 = undefined;
  if (none63(__pre1)) {
    __e135 = ["%while", __c16, lower_body(__body80)];
  } else {
    __e135 = ["%while", true, join(["%do"], __pre1, [["%if", ["%not", __c16], ["%break"]], lower_body(__body80)])];
  }
  return add(hoist, __e135);
};
var lower_for = function (args, hoist) {
  var ____id150 = args;
  var __h = has(____id150, 0);
  var __k60 = has(____id150, 1);
  var __body81 = cut(____id150, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k60, lower_body(__body81)], props(__body81)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id151 = args;
  var __h1 = has(____id151, 0);
  var __body82 = cut(____id151, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body82, tail63)], props(__body82)));
  } else {
    var __e15 = unique("e");
    add(hoist, ["%local", __e15]);
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e15, join(["%do"], __body82)])], props(__body82)));
    return __e15;
  }
};
var lower_block = function (args, hoist, stmt63, tail63) {
  var ____id152 = args;
  var __name24 = has(____id152, 0);
  var __h2 = has(____id152, 1);
  var __body83 = cut(____id152, 2);
  return add(hoist, ["%block", __name24, lower(__h2, hoist), lower_body(__body83, tail63)]);
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __f5 = unique("f");
    return lower(["%do", join(["%local-function", __f5], args), __f5], hoist);
  } else {
    var ____id153 = args;
    var __a32 = has(____id153, 0);
    var __body84 = cut(____id153, 1);
    return join(["%function", __a32, lower_body(__body84, true)], props(__body84));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id154 = args;
  var __name25 = has(____id154, 0);
  var __args59 = has(____id154, 1);
  var __body85 = cut(____id154, 2);
  return add(hoist, join([kind, __name25, __args59, lower_body(__body85, true)], props(__body85)));
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
    var ____id155 = form;
    var __x894 = has(____id155, 0);
    var __args60 = cut(____id155, 1);
    reduce(function (a, b) {
      add(__e16, [__x894, a, b]);
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
  var ____id156 = __form11;
  var __x897 = has(____id156, 0);
  var __args61 = cut(____id156, 1);
  return lower(reduce(function (a, b) {
    return [__x897, b, a];
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
          var ____id157 = form;
          var __x900 = has(____id157, 0);
          var __args62 = cut(____id157, 1);
          if (__x900 === "%do") {
            return lower_do(__args62, hoist, stmt63, tail63);
          } else {
            if (__x900 === "%call") {
              return lower(__args62, hoist, stmt63, tail63);
            } else {
              if (__x900 === "%set") {
                return lower_set(__args62, hoist, stmt63, tail63);
              } else {
                if (__x900 === "%if") {
                  return lower_if(__args62, hoist, stmt63, tail63);
                } else {
                  if (__x900 === "%try") {
                    return lower_try(__args62, hoist, tail63);
                  } else {
                    if (__x900 === "%while") {
                      return lower_while(__args62, hoist);
                    } else {
                      if (__x900 === "%for") {
                        return lower_for(__args62, hoist);
                      } else {
                        if (__x900 === "%with") {
                          return lower_with(__args62, hoist, stmt63, tail63);
                        } else {
                          if (__x900 === "%block") {
                            return lower_block(__args62, hoist, stmt63, tail63);
                          } else {
                            if (__x900 === "%cases") {
                              return lower_cases(__args62, hoist, stmt63, tail63);
                            } else {
                              if (__x900 === "%function") {
                                return lower_function(__args62, hoist);
                              } else {
                                if (__x900 === "%local-function" || __x900 === "%global-function") {
                                  return lower_definition(__x900, __args62, hoist);
                                } else {
                                  if (in63(__x900, ["%and", "%or"])) {
                                    return lower_short(__x900, __args62, hoist);
                                  } else {
                                    if (statement63(__x900)) {
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
var __e136 = undefined;
if (typeof(global) === "undefined") {
  var __e137 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e137 = window;
  } else {
    var __e138 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e138 = self;
    } else {
      __e138 = this;
    }
    __e137 = __e138;
  }
  global = __e137;
  __e136 = global;
}
var __e139 = undefined;
if (!( typeof(require) === "undefined")) {
  global.require = require;
  global.require;
  var __e140 = undefined;
  if (!( typeof(__module1) === "undefined")) {
    __module1.filename = require("path").resolve("repl");
    __module1.filename;
    __module1.paths = require("module")._nodeModulePaths(__module1.filename);
    __e140 = __module1.paths;
  }
  __e139 = __e140;
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
    var __s8 = "";
    var ____x905 = __forms10;
    var ____i73 = 0;
    while (____i73 < _35(____x905)) {
      var __x906 = ____x905[____i73];
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua" && (immediate_call63(__x906) && "\n" === char(__s8, edge(__s8)))) {
        __s8 = clip(__s8, 0, edge(__s8)) + ";\n";
      }
      __s8 = __s8 + compile(__x906, {
        _stash: true,
        stmt: true
      });
      if (! atom63(__x906)) {
        if (hd(__x906) === "%return" || hd(__x906) === "%break") {
          break;
        }
      }
      ____i73 = ____i73 + 1;
    }
    return __s8;
  },
  stmt: true,
  tr: true
});
setenv("%if", {
  _stash: true,
  special: function (cond, cons, alt) {
    var __cond10 = compile(cond);
    var __cons1 = compile_body(cons);
    var __e141 = undefined;
    if (alt) {
      __e141 = compile_body(alt);
    }
    var __alt1 = __e141;
    var __ind3 = indentation();
    var __s10 = "";
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __s10 = __s10 + (__ind3 + ("if (" + (__cond10 + (") {\n" + (__cons1 + (__ind3 + "}"))))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __s10 = __s10 + (__ind3 + ("if " + (__cond10 + (":\n" + __cons1))));
      } else {
        __s10 = __s10 + (__ind3 + ("if " + (__cond10 + (" then\n" + __cons1))));
      }
    }
    if (__alt1 && has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __s10 = __s10 + (" else {\n" + (__alt1 + (__ind3 + "}")));
    } else {
      if (__alt1 && has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __s10 = __s10 + (__ind3 + ("else:\n" + __alt1));
      } else {
        if (__alt1) {
          __s10 = __s10 + (__ind3 + ("else\n" + __alt1));
        }
      }
    }
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return __s10 + (__ind3 + "end\n");
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "js") {
        return __s10 + "\n";
      } else {
        return __s10;
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%while", {
  _stash: true,
  special: function (cond, form) {
    var __cond12 = compile(cond);
    var __body87 = compile_body(form);
    var __ind5 = indentation();
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind5 + ("while (" + (__cond12 + (") {\n" + (__body87 + (__ind5 + "}\n")))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind5 + ("while " + (__cond12 + (":\n" + __body87)));
      } else {
        return __ind5 + ("while " + (__cond12 + (" do\n" + (__body87 + (__ind5 + "end\n")))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%for", {
  _stash: true,
  special: function (t, k, form) {
    var ____r385 = unstash(Array.prototype.slice.call(arguments, 3));
    var __t9 = destash33(t, ____r385);
    var __k63 = destash33(k, ____r385);
    var __form13 = destash33(form, ____r385);
    var ____id159 = ____r385;
    var __async2 = has(____id159, "async");
    var __t10 = compile(__t9);
    var __k64 = compile(__k63);
    var __ind7 = indentation();
    var __body89 = compile_body(__form13);
    var __e142 = undefined;
    if (__async2) {
      __e142 = "async ";
    } else {
      __e142 = "";
    }
    var __a34 = __e142;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return __ind7 + ("for " + (__k64 + (" in next, " + (__t10 + (" do\n" + (__body89 + (__ind7 + "end\n")))))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind7 + (__a34 + ("for " + (__k64 + (" in " + (__t10 + (":\n" + __body89))))));
      } else {
        return __ind7 + ("for (" + (__k64 + (" in " + (__t10 + (") {\n" + (__body89 + (__ind7 + "}\n")))))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%with", {
  _stash: true,
  special: function (t, form) {
    var ____r387 = unstash(Array.prototype.slice.call(arguments, 2));
    var __t13 = destash33(t, ____r387);
    var __form15 = destash33(form, ____r387);
    var ____id161 = ____r387;
    var __async4 = has(____id161, "async");
    var __t14 = compile(__t13);
    var __ind9 = indentation();
    var __body91 = compile_body(__form15);
    var __e143 = undefined;
    if (__async4) {
      __e143 = "async ";
    } else {
      __e143 = "";
    }
    var __a36 = __e143;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind9 + (__a36 + ("with " + (__t14 + (":\n" + __body91))));
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
    var __body93 = compile_body(form);
    var __e144 = undefined;
    if (some63(__t16)) {
      __e144 = " ";
    } else {
      __e144 = "";
    }
    var __sep1 = __e144;
    var __e145 = undefined;
    if (some63(__t16)) {
      __e145 = "(";
    } else {
      __e145 = "";
    }
    var __lh6 = __e145;
    var __e146 = undefined;
    if (some63(__t16)) {
      __e146 = ")";
    } else {
      __e146 = "";
    }
    var __rh6 = __e146;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind11 + (name + (__sep1 + (__t16 + (":\n" + __body93))));
    } else {
      return __ind11 + (name + (__sep1 + (__lh6 + (__t16 + (__rh6 + (__sep1 + ("{\n" + (__body93 + (__ind11 + "}\n")))))))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%try", {
  _stash: true,
  special: function (form) {
    var __ind13 = indentation();
    var __body95 = compile_body(form);
    var __e147 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e147 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", false, ["%get", "e", 1], "e"]]];
    } else {
      __e147 = ["%return", ["%array", false, "e"]];
    }
    var __hf1 = __e147;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x928 = compile(__hf1, {
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
    var __h4 = ____x928;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind13 + ("try {\n" + (__body95 + (__ind13 + ("}\n" + (__ind13 + ("catch (e) {\n" + (__h4 + (__ind13 + "}\n"))))))));
    } else {
      return __ind13 + ("try:\n" + (__body95 + (__ind13 + ("except:\n" + __h4))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%delete", {
  _stash: true,
  special: function (place) {
    var __e148 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e148 = "del ";
    } else {
      __e148 = "delete ";
    }
    return indentation() + (__e148 + compile(place));
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
    var ____r397 = unstash(Array.prototype.slice.call(arguments, 1));
    var __args64 = destash33(args, ____r397);
    var ____id163 = ____r397;
    var __body97 = cut(____id163, 0);
    return apply(compile_function, join([__args64], __body97, []));
  }
});
setenv("%global-function", {
  _stash: true,
  special: function (name, args) {
    var ____r399 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name27 = destash33(name, ____r399);
    var __args66 = destash33(args, ____r399);
    var ____id165 = ____r399;
    var __body99 = cut(____id165, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x939 = object([__args66]);
      ____x939.name = __name27;
      var ____x940 = object([]);
      ____x940.name = __name27;
      var __x938 = apply(compile_function, join(____x939, __body99, ____x940));
      return indentation() + __x938;
    } else {
      return compile(["%set", __name27, join(["%function", __args66], __body99)], {
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
    var ____r401 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name29 = destash33(name, ____r401);
    var __args68 = destash33(args, ____r401);
    var ____id167 = ____r401;
    var __body101 = cut(____id167, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x949 = object([__args68]);
      ____x949.name = __name29;
      ____x949.prefix = "local";
      var ____x950 = object([]);
      ____x950.name = __name29;
      ____x950.prefix = "local";
      var __x948 = apply(compile_function, join(____x949, __body101, ____x950));
      return indentation() + __x948;
    } else {
      return compile(["%local", __name29, join(["%function", __args68], __body101)], {
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
    var __e149 = undefined;
    if (nil63(x)) {
      __e149 = "return";
    } else {
      __e149 = "return " + compile(x);
    }
    var __x954 = __e149;
    return indentation() + __x954;
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
    var __e150 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e150 = "throw " + compile(["%new", ["Error", x]]);
    } else {
      var __e151 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e151 = "raise " + compile(["Exception", x]);
      } else {
        __e151 = "error(" + (compile(x) + ")");
      }
      __e150 = __e151;
    }
    var __e30 = __e150;
    return indentation() + __e30;
  },
  stmt: true
});
setenv("%throw", {
  _stash: true,
  special: function (x) {
    var __e152 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e152 = "throw " + compile(x);
    } else {
      var __e153 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e153 = "raise " + compile(x);
      } else {
        __e153 = "error(" + (compile(x) + ")");
      }
      __e152 = __e153;
    }
    var __e34 = __e152;
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
    var __id169 = compile(name);
    var __value12 = compile(value);
    var __e154 = undefined;
    if (is63(value)) {
      __e154 = " = " + __value12;
    } else {
      __e154 = "";
    }
    var __rh8 = __e154;
    var __e155 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e155 = "var ";
    } else {
      var __e156 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua") {
        __e156 = "local ";
      } else {
        __e156 = "";
      }
      __e155 = __e156;
    }
    var __keyword3 = __e155;
    var __ind15 = indentation();
    return __ind15 + (__keyword3 + (__id169 + __rh8));
  },
  stmt: true
});
setenv("%set", {
  _stash: true,
  special: function (lh, rh) {
    var __lh8 = compile(lh);
    var __e157 = undefined;
    if (nil63(rh)) {
      __e157 = "nil";
    } else {
      __e157 = rh;
    }
    var __rh10 = compile(__e157);
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
    var __e158 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e158 = "{";
    } else {
      __e158 = "[";
    }
    var __open1 = __e158;
    var __e159 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e159 = "}";
    } else {
      __e159 = "]";
    }
    var __close1 = __e159;
    var __s121 = "";
    var __c18 = "";
    var ____o39 = __forms12;
    var __k67 = undefined;
    for (__k67 in ____o39) {
      var __v43 = ____o39[__k67];
      var __e160 = undefined;
      if (numeric63(__k67)) {
        __e160 = parseInt(__k67);
      } else {
        __e160 = __k67;
      }
      var __k68 = __e160;
      if (number63(__k68)) {
        __s121 = __s121 + (__c18 + compile(__v43));
        __c18 = ", ";
      }
    }
    return __open1 + (__s121 + __close1);
  }
});
setenv("%object", {
  _stash: true,
  special: function () {
    var __forms14 = unstash(Array.prototype.slice.call(arguments, 0));
    var __s14 = "{";
    var __c20 = "";
    var __e161 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e161 = " = ";
    } else {
      __e161 = ": ";
    }
    var __sep3 = __e161;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x963 = indentation();
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    var __ind17 = ____x963;
    var __e162 = undefined;
    if (_35(__forms14) > 2) {
      __e162 = "\n" + __ind17;
    }
    var __pad1 = __e162;
    var __e163 = undefined;
    if (is63(__pad1)) {
      __e163 = "\n" + indentation();
    } else {
      __e163 = "";
    }
    var __end1 = __e163;
    __s14 = __s14 + either(__pad1, "");
    var ____o41 = pair(__forms14);
    var __k72 = undefined;
    for (__k72 in ____o41) {
      var __v46 = ____o41[__k72];
      var __e164 = undefined;
      if (numeric63(__k72)) {
        __e164 = parseInt(__k72);
      } else {
        __e164 = __k72;
      }
      var __k73 = __e164;
      if (number63(__k73)) {
        var ____id171 = __v46;
        var __k74 = has(____id171, 0);
        var __v47 = has(____id171, 1);
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
        var ____x964 = compile(__v47);
        setenv("indent-level", {
          _stash: true,
          toplevel: true
        }).value = has(setenv("indent-level", {
          _stash: true,
          toplevel: true
        }), "value") - 1;
        __s14 = __s14 + (__c20 + (key(__k74) + (__sep3 + ____x964)));
        __c20 = "," + either(__pad1, " ");
      }
    }
    return __s14 + (__end1 + "}");
  }
});
setenv("%list", {
  _stash: true,
  special: function (form, comps, cond) {
    var ____r421 = unstash(Array.prototype.slice.call(arguments, 3));
    var __form17 = destash33(form, ____r421);
    var __comps5 = destash33(comps, ____r421);
    var __cond14 = destash33(cond, ____r421);
    var ____id175 = ____r421;
    var __kind5 = has(____id175, "kind");
    var __s16 = compile(__form17);
    var __e165 = undefined;
    if (__kind5 === "object") {
      __e165 = ["{", "}"];
    } else {
      __e165 = ["[", "]"];
    }
    var ____id176 = __e165;
    var __lh10 = has(____id176, 0);
    var __rh12 = has(____id176, 1);
    if (!( __kind5 === "object")) {
      __s16 = "(" + (__s16 + ")");
    }
    var ____x970 = __comps5;
    var ____i79 = 0;
    while (____i79 < _35(____x970)) {
      var ____id177 = ____x970[____i79];
      var __k76 = has(____id177, 0);
      var __v49 = has(____id177, 1);
      __s16 = __s16 + (" for " + (compile(__k76) + (" in " + compile(__v49))));
      ____i79 = ____i79 + 1;
    }
    if (is63(__cond14)) {
      __s16 = __s16 + (" if " + compile(__cond14));
    }
    return __lh10 + (__s16 + __rh12);
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
    var ____r425 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name31 = destash33(name, ____r425);
    var ____id180 = ____r425;
    var __alias1 = cut(____id180, 0);
    var __ind19 = indentation();
    var __e166 = undefined;
    if (hd(__alias1) === "as") {
      __e166 = __alias1[1];
    } else {
      __e166 = hd(__alias1);
    }
    var __as1 = __e166;
    var __id181 = __as1 || __name31;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __s18 = __ind19 + ("import " + compile(__name31));
      if (__as1) {
        __s18 = __s18 + (" as " + compile(__id181));
      }
      return __s18;
    } else {
      return __ind19 + compile(["%local", __id181, ["require", escape(__name31)]]);
    }
  },
  stmt: true
});
setenv("from", {
  _stash: true,
  special: function (name) {
    var ____r429 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name33 = destash33(name, ____r429);
    var ____id184 = ____r429;
    var __imports1 = cut(____id184, 0);
    var __ind21 = indentation();
    var __id185 = __name33;
    var __r430 = undefined;
    __r430 = drop(__imports1);
    var __e167 = undefined;
    if (last(__imports1) === "as") {
      __e167 = drop(__imports1);
    } else {
      add(__imports1, __r430);
      __r430 = undefined;
      __e167 = __r430;
    }
    var __as3 = __r430;
    var __e168 = undefined;
    if (hd(__imports1) === "import") {
      __e168 = tl(__imports1);
    } else {
      __e168 = __imports1;
    }
    var __names13 = __e168;
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
      var __s20 = __ind21 + ("from " + (compile(__name33) + (" import " + __names14)));
      if (__as3) {
        __s20 = __s20 + (" as " + compile(__as3));
      }
      return __s20;
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
    var __e169 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e169 = "";
    } else {
      __e169 = "await ";
    }
    var __a38 = __e169;
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
