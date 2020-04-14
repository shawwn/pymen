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
      var __e49 = undefined;
      if (numeric63(__k)) {
        __e49 = parseInt(__k);
      } else {
        __e49 = __k;
      }
      var __k1 = __e49;
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
      var __e50 = undefined;
      if (numeric63(__k2)) {
        __e50 = parseInt(__k2);
      } else {
        __e50 = __k2;
      }
      var __k3 = __e50;
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
    var __e51 = undefined;
    if (numeric63(__k4)) {
      __e51 = parseInt(__k4);
    } else {
      __e51 = __k4;
    }
    var __k5 = __e51;
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
clip = function (s, _from, upto) {
  return s.substring(_from, upto);
};
dupe = function (x) {
  if (array63(x)) {
    return [];
  } else {
    return {};
  }
};
cut = function (x, _from, upto) {
  var __l2 = dupe(x);
  var __j = 0;
  var __e52 = undefined;
  if (nil63(_from) || _from < 0) {
    __e52 = 0;
  } else {
    __e52 = _from;
  }
  var __i3 = __e52;
  var __n4 = _35(x);
  var __e53 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e53 = __n4;
  } else {
    __e53 = upto;
  }
  var __upto1 = __e53;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e54 = undefined;
    if (numeric63(__k6)) {
      __e54 = parseInt(__k6);
    } else {
      __e54 = __k6;
    }
    var __k7 = __e54;
    if (! number63(__k7)) {
      __l2[__k7] = __v3;
    }
  }
  return __l2;
};
keys = function (x) {
  var __t = dupe(x);
  var ____o4 = x;
  var __k8 = undefined;
  for (__k8 in ____o4) {
    var __v4 = ____o4[__k8];
    var __e55 = undefined;
    if (numeric63(__k8)) {
      __e55 = parseInt(__k8);
    } else {
      __e55 = __k8;
    }
    var __k9 = __e55;
    if (! number63(__k9)) {
      __t[__k9] = __v4;
    }
  }
  return __t;
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
    var __n7 = edge(l);
    if (__n7 >= 0) {
      var __r41 = l[__n7];
      delete l[__n7];
      return __r41;
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
  var __l11 = keys(l);
  var __i6 = edge(l);
  while (__i6 >= 0) {
    add(__l11, l[__i6]);
    __i6 = __i6 - 1;
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
  var __r46 = [];
  var ____x2 = __ls;
  var ____i7 = 0;
  while (____i7 < _35(____x2)) {
    var __l3 = ____x2[____i7];
    if (__l3) {
      var __n8 = _35(__r46);
      var ____o5 = __l3;
      var __k10 = undefined;
      for (__k10 in ____o5) {
        var __v5 = ____o5[__k10];
        var __e56 = undefined;
        if (numeric63(__k10)) {
          __e56 = parseInt(__k10);
        } else {
          __e56 = __k10;
        }
        var __k11 = __e56;
        if (number63(__k11)) {
          __k11 = __k11 + __n8;
        } else {
          __l3 = object(__l3);
        }
        __r46[__k11] = __v5;
      }
    }
    ____i7 = ____i7 + 1;
  }
  return __r46;
};
find = function (f, t) {
  var ____o6 = t;
  var ____i9 = undefined;
  for (____i9 in ____o6) {
    var __x3 = ____o6[____i9];
    var __e57 = undefined;
    if (numeric63(____i9)) {
      __e57 = parseInt(____i9);
    } else {
      __e57 = ____i9;
    }
    var ____i91 = __e57;
    var __y = f(__x3);
    if (__y) {
      return __y;
    }
  }
};
first = function (f, l) {
  var ____x4 = l;
  var ____i10 = 0;
  while (____i10 < _35(____x4)) {
    var __x5 = ____x4[____i10];
    var __y1 = f(__x5);
    if (__y1) {
      return __y1;
    }
    ____i10 = ____i10 + 1;
  }
};
in63 = function (x, t) {
  return find(function (y) {
    return x === y;
  }, t);
};
pair = function (l) {
  var __l12 = dupe(l);
  var __n11 = _35(l);
  var __i11 = 0;
  while (__i11 < __n11) {
    var __a = l[__i11];
    var __b = l[__i11 + 1];
    add(__l12, [__a, __b]);
    __i11 = __i11 + 1;
    __i11 = __i11 + 1;
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
  var __t1 = dupe(x);
  var ____x7 = x;
  var ____i12 = 0;
  while (____i12 < _35(____x7)) {
    var __v6 = ____x7[____i12];
    var __y2 = f(__v6);
    if (is63(__y2)) {
      add(__t1, __y2);
    }
    ____i12 = ____i12 + 1;
  }
  var ____o7 = x;
  var __k12 = undefined;
  for (__k12 in ____o7) {
    var __v7 = ____o7[__k12];
    var __e58 = undefined;
    if (numeric63(__k12)) {
      __e58 = parseInt(__k12);
    } else {
      __e58 = __k12;
    }
    var __k13 = __e58;
    if (! number63(__k13)) {
      var __y3 = f(__v7);
      if (is63(__y3)) {
        __t1[__k13] = __y3;
      }
    }
  }
  return __t1;
};
mapcat = function (f, x, sep) {
  var __r57 = "";
  var __c = "";
  var ____x8 = x;
  var ____i14 = 0;
  while (____i14 < _35(____x8)) {
    var __v8 = ____x8[____i14];
    var __e59 = undefined;
    if (f) {
      __e59 = f(__v8);
    } else {
      __e59 = __v8;
    }
    var __y4 = __e59;
    if (is63(__y4)) {
      __r57 = __r57 + (__c + __y4);
      __c = sep || "";
    }
    ____i14 = ____i14 + 1;
  }
  return __r57;
};
keep = function (f, x) {
  return map(function (v) {
    if (yes(f(v))) {
      return v;
    }
  }, x);
};
keys63 = function (t) {
  var ____o8 = t;
  var __k14 = undefined;
  for (__k14 in ____o8) {
    var __v9 = ____o8[__k14];
    var __e60 = undefined;
    if (numeric63(__k14)) {
      __e60 = parseInt(__k14);
    } else {
      __e60 = __k14;
    }
    var __k15 = __e60;
    if (! number63(__k15)) {
      return true;
    }
  }
  return false;
};
empty63 = function (t) {
  var ____o9 = t;
  var ____i16 = undefined;
  for (____i16 in ____o9) {
    var __x9 = ____o9[____i16];
    var __e61 = undefined;
    if (numeric63(____i16)) {
      __e61 = parseInt(____i16);
    } else {
      __e61 = ____i16;
    }
    var ____i161 = __e61;
    return false;
  }
  return true;
};
stash = function (args) {
  if (keys63(args)) {
    var __p = {};
    var ____o10 = args;
    var __k16 = undefined;
    for (__k16 in ____o10) {
      var __v10 = ____o10[__k16];
      var __e62 = undefined;
      if (numeric63(__k16)) {
        __e62 = parseInt(__k16);
      } else {
        __e62 = __k16;
      }
      var __k17 = __e62;
      if (! number63(__k17)) {
        __p[__k17] = __v10;
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
      var ____o11 = __l4;
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
        if (!( __k19 === "_stash")) {
          __args1[__k19] = __v11;
        }
      }
      if (params) {
        var ____o12 = params;
        var __k20 = undefined;
        for (__k20 in ____o12) {
          var __v12 = ____o12[__k20];
          var __e65 = undefined;
          if (numeric63(__k20)) {
            __e65 = parseInt(__k20);
          } else {
            __e65 = __k20;
          }
          var __k21 = __e65;
          __args1[__k21] = __v12;
        }
      }
      return __args1;
    } else {
      if (params) {
        var __args11 = object(args);
        var ____o13 = params;
        var __k22 = undefined;
        for (__k22 in ____o13) {
          var __v13 = ____o13[__k22];
          var __e63 = undefined;
          if (numeric63(__k22)) {
            __e63 = parseInt(__k22);
          } else {
            __e63 = __k22;
          }
          var __k23 = __e63;
          __args11[__k23] = __v13;
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
    var ____o14 = l;
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
      if (!( __k25 === "_stash")) {
        args1[__k25] = __v14;
      }
    }
  } else {
    return l;
  }
};
search = function (s, pattern, start) {
  var __i22 = s.indexOf(pattern, start);
  if (__i22 >= 0) {
    return __i22;
  }
};
string_ends63 = function (_str, x, pos) {
  var __e67 = undefined;
  if (is63(pos)) {
    __e67 = clip(_str, pos);
  } else {
    __e67 = _str;
  }
  var ___str = __e67;
  if (_35(x) > _35(___str)) {
    return false;
  } else {
    return x === clip(___str, _35(___str) - _35(x));
  }
};
string_starts63 = function (_str, x, pos) {
  var __e68 = undefined;
  if (is63(pos)) {
    __e68 = clip(_str, pos);
  } else {
    __e68 = _str;
  }
  var ___str1 = __e68;
  if (_35(x) > _35(___str1)) {
    return false;
  } else {
    return x === clip(___str1, 0, _35(x));
  }
};
split = function (s, sep) {
  if (s === "" || sep === "") {
    return [];
  } else {
    var __l5 = [];
    var __n20 = _35(sep);
    while (true) {
      var __i23 = search(s, sep);
      if (nil63(__i23)) {
        break;
      } else {
        add(__l5, clip(s, 0, __i23));
        s = clip(s, __i23 + __n20);
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
      return _str(x);
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
  var __i24 = 0;
  while (__i24 < edge(xs)) {
    var __a1 = xs[__i24];
    var __b1 = xs[__i24 + 1];
    if (! f(__a1, __b1)) {
      return false;
    }
    __i24 = __i24 + 1;
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
  var __n21 = parseFloat(s);
  if (! isNaN(__n21)) {
    return __n21;
  }
};
numeric63 = function (s) {
  var __n22 = _35(s);
  var __i25 = 0;
  while (__i25 < __n22) {
    if (! number_code63(code(s, __i25))) {
      return false;
    }
    __i25 = __i25 + 1;
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
    var __i26 = 0;
    while (__i26 < _35(s)) {
      var __c1 = char(s, __i26);
      var __e69 = undefined;
      if (__c1 === "\n") {
        __e69 = "\\n";
      } else {
        var __e70 = undefined;
        if (__c1 === "\r") {
          __e70 = "\\r";
        } else {
          var __e71 = undefined;
          if (__c1 === "\"") {
            __e71 = "\\\"";
          } else {
            var __e72 = undefined;
            if (__c1 === "\\") {
              __e72 = "\\\\";
            } else {
              __e72 = __c1;
            }
            __e71 = __e72;
          }
          __e70 = __e71;
        }
        __e69 = __e70;
      }
      var __c11 = __e69;
      __s1 = __s1 + __c11;
      __i26 = __i26 + 1;
    }
    return __s1 + "\"";
  }
};
_str = function (x, repr, stack) {
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
                      var ____o15 = x;
                      var __k26 = undefined;
                      for (__k26 in ____o15) {
                        var __v15 = ____o15[__k26];
                        var __e73 = undefined;
                        if (numeric63(__k26)) {
                          __e73 = parseInt(__k26);
                        } else {
                          __e73 = __k26;
                        }
                        var __k27 = __e73;
                        if (number63(__k27)) {
                          __xs11[__k27] = _str(__v15, repr, __l6);
                        } else {
                          add(__ks, [__k27 + ":", _str(__v15, repr, __l6)]);
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
                      var ____i28 = 0;
                      while (____i28 < _35(____x13)) {
                        var __v16 = ____x13[____i28];
                        __s = __s + (__sp + __v16);
                        __sp = " ";
                        ____i28 = ____i28 + 1;
                      }
                      var ____x14 = __ks;
                      var ____i29 = 0;
                      while (____i29 < _35(____x14)) {
                        var ____id2 = ____x14[____i29];
                        var __k28 = has(____id2, 0);
                        var __v17 = has(____id2, 1);
                        __s = __s + (__sp + (__k28 + (" " + __v17)));
                        __sp = " ";
                        ____i29 = ____i29 + 1;
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
  var ____r91 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f1 = destash33(f, ____r91);
  var ____id3 = ____r91;
  var __args12 = cut(____id3, 0);
  return apply(__f1, __args12);
};
setenv = function (k) {
  var ____r92 = unstash(Array.prototype.slice.call(arguments, 1));
  var __k29 = destash33(k, ____r92);
  var ____id4 = ____r92;
  var __keys = cut(____id4, 0);
  if (string63(__k29)) {
    var __e74 = undefined;
    if (has63(__keys, "toplevel")) {
      __e74 = hd(environment);
    } else {
      __e74 = last(environment);
    }
    var __frame = __e74;
    var __e75 = undefined;
    if (has63(__frame, __k29)) {
      __e75 = __frame[__k29];
    } else {
      __e75 = {};
    }
    var __entry = __e75;
    var ____o16 = __keys;
    var __k30 = undefined;
    for (__k30 in ____o16) {
      var __v18 = ____o16[__k30];
      var __e76 = undefined;
      if (numeric63(__k30)) {
        __e76 = parseInt(__k30);
      } else {
        __e76 = __k30;
      }
      var __k31 = __e76;
      if (!( __k31 === "toplevel")) {
        __entry[__k31] = __v18;
      }
    }
    __frame[__k29] = __entry;
    return __frame[__k29];
  }
};
_print = function (x) {
  return console.log(x);
};
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
      var ____o18 = __body2;
      var __k34 = undefined;
      for (__k34 in ____o18) {
        var __v20 = ____o18[__k34];
        var __e77 = undefined;
        if (numeric63(__k34)) {
          __e77 = parseInt(__k34);
        } else {
          __e77 = __k34;
        }
        var __k35 = __e77;
        if (number63(__k35)) {
          __l10[__k35] = __v20;
        } else {
          add(__forms1, ["%set", ["%get", __x49, ["quote", __k35]], __v20]);
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
    var __v22 = destash33(v, ____r119);
    var ____id30 = ____r119;
    var __body13 = cut(____id30, 0);
    if (__v22 === "as") {
      return join(["%with", ["%as", __x115, hd(__body13)]], tl(__body13));
    } else {
      if (! atom63(__x115) || has(__body13, "async")) {
        return join(["%with", __x115, __v22], __body13);
      } else {
        return join(["let", [__x115, __v22]], __body13, [__x115]);
      }
    }
  }
});
setenv("let-when", {
  _stash: true,
  macro: function (x, v) {
    var ____r121 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x128 = destash33(x, ____r121);
    var __v24 = destash33(v, ____r121);
    var ____id32 = ____r121;
    var __body15 = cut(____id32, 0);
    var __y6 = unique("y");
    return ["let", __y6, __v24, ["when", ["yes", __y6], join(["let", [__x128, __y6]], __body15)]];
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
    var __form3 = join(____x143, keys(__body19));
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
      return join(["%local-function", __name5], bind42(__x165, __body23), keys(__body23));
    } else {
      return join(["%local", __name5, __x165], keys(__body23));
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
      return join(["%global-function", __name7], bind42(__x171, __body25), keys(__body25));
    } else {
      return join(["set", __name7, __x171], keys(__body25));
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
    var ____o20 = __body31;
    var __k38 = undefined;
    for (__k38 in ____o20) {
      var __v26 = ____o20[__k38];
      var __e78 = undefined;
      if (numeric63(__k38)) {
        __e78 = parseInt(__k38);
      } else {
        __e78 = __k38;
      }
      var __k39 = __e78;
      if (! number63(__k39)) {
        var ____x250 = object(["setenv", ["quote", __k39]]);
        ____x250.value = __v26;
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
    return join(["%function"], bind42(__args9, __body41), keys(__body41));
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
      return ["%call", "apply", __f3, ["join", join(["list"], almost(__args111)), last(__args111), join(["list"], keys(__args111))]];
    } else {
      if (keys63(__args111)) {
        return ["%call", "apply", __f3, join(["join"], __args111, [join(["list"], keys(__args111))])];
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
    var __t3 = destash33(t, ____r169);
    var ____id65 = ____r169;
    var __body43 = cut(____id65, 0);
    var __o22 = unique("o");
    var __n30 = unique("n");
    var __i36 = unique("i");
    var __e79 = undefined;
    if (atom63(__x369)) {
      __e79 = [__i36, __x369];
    } else {
      var __e80 = undefined;
      if (_35(__x369) > 1) {
        __e80 = __x369;
      } else {
        __e80 = [__i36, hd(__x369)];
      }
      __e79 = __e80;
    }
    var ____id66 = __e79;
    var __k41 = has(____id66, 0);
    var __v28 = has(____id66, 1);
    var ____x375 = object(["target", __o22]);
    ____x375.py = ["indices", __o22];
    var __e81 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e81 = __body43;
    } else {
      __e81 = [join(["let", __k41, ["if", ["numeric?", __k41], ["parseInt", __k41], __k41]], __body43)];
    }
    return ["let", [__o22, __t3, __k41, "nil"], join(["%for", ____x375, __k41], keys(__body43), [join(["let", [__v28, ["%get", __o22, __k41]]], __e81)])];
  }
});
setenv("for", {
  _stash: true,
  macro: function (i, to) {
    var ____r171 = unstash(Array.prototype.slice.call(arguments, 2));
    var __i38 = destash33(i, ____r171);
    var __to1 = destash33(to, ____r171);
    var ____id68 = ____r171;
    var __body45 = cut(____id68, 0);
    if (__to1 === "in") {
      return join(["%for", hd(__body45), __i38, join(["%do"], tl(__body45))], keys(__body45));
    } else {
      return ["let", __i38, 0, join(["while", ["<", __i38, __to1]], __body45, [["inc", __i38]])];
    }
  }
});
setenv("step", {
  _stash: true,
  macro: function (v, t) {
    var ____r173 = unstash(Array.prototype.slice.call(arguments, 2));
    var __v30 = destash33(v, ____r173);
    var __t5 = destash33(t, ____r173);
    var ____id70 = ____r173;
    var __body47 = cut(____id70, 0);
    var __x408 = unique("x");
    var __i40 = unique("i");
    return ["let", [__x408, __t5], ["for", __i40, ["#", __x408], join(["let", [__v30, ["at", __x408, __i40]]], __body47)]];
  }
});
setenv("set-of", {
  _stash: true,
  macro: function () {
    var __xs13 = unstash(Array.prototype.slice.call(arguments, 0));
    var __l121 = [];
    var ____o24 = __xs13;
    var ____i42 = undefined;
    for (____i42 in ____o24) {
      var __x418 = ____o24[____i42];
      var __e82 = undefined;
      if (numeric63(____i42)) {
        __e82 = parseInt(____i42);
      } else {
        __e82 = ____i42;
      }
      var ____i421 = __e82;
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
    var __e83 = undefined;
    if (nil63(by)) {
      __e83 = 1;
    } else {
      __e83 = by;
    }
    return ["set", n, ["+", n, __e83]];
  }
});
setenv("dec", {
  _stash: true,
  macro: function (n, by) {
    var __e84 = undefined;
    if (nil63(by)) {
      __e84 = 1;
    } else {
      __e84 = by;
    }
    return ["set", n, ["-", n, __e84]];
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
    var __e85 = undefined;
    if (atom63(__x655)) {
      __e85 = [__x655];
    } else {
      __e85 = __x655;
    }
    var ____id106 = __e85;
    var __a26 = has(____id106, 0);
    var __bs25 = cut(____id106, 1);
    var __e86 = undefined;
    if (none63(__bs25)) {
      __e86 = [["%literal"]];
    } else {
      __e86 = __bs25;
    }
    return join(["%block", __a26], __e86, __body63);
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
    var ____o26 = __cases1;
    var ____i45 = undefined;
    for (____i45 in ____o26) {
      var __x695 = ____o26[____i45];
      var __e87 = undefined;
      if (numeric63(____i45)) {
        __e87 = parseInt(____i45);
      } else {
        __e87 = ____i45;
      }
      var ____i451 = __e87;
      if (hd63(__x695, "finally")) {
        __fin1 = __x695;
      }
    }
    var __forms7 = [];
    var ____x698 = __cases1;
    var ____i46 = 0;
    while (____i46 < _35(____x698)) {
      var ____id114 = ____x698[____i46];
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
      ____i46 = ____i46 + 1;
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
var stream = function (_str, more) {
  return {
    pos: 0,
    string: _str,
    len: _35(_str),
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
read_string = function (_str, more) {
  var __x708 = read(stream(_str, more));
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
var hex_prefix63 = function (_str) {
  var __e88 = undefined;
  if (code(_str, 0) === 45) {
    __e88 = 1;
  } else {
    __e88 = 0;
  }
  var __i47 = __e88;
  var __id175 = code(_str, __i47) === 48;
  var __e89 = undefined;
  if (__id175) {
    __i47 = __i47 + 1;
    var __n35 = code(_str, __i47);
    __e89 = __n35 === 120 || __n35 === 88;
  } else {
    __e89 = __id175;
  }
  return __e89;
};
var maybe_number = function (_str) {
  if (hex_prefix63(_str)) {
    return parseInt(_str, 16);
  } else {
    if (number_code63(code(_str, edge(_str)))) {
      return number(_str);
    }
  }
};
var real63 = function (x) {
  return number63(x) && (! nan63(x) && ! inf63(x));
};
read_table[""] = function (s) {
  var ___str2 = "";
  while (true) {
    var __c7 = peek_char(s);
    if (__c7 && (! has63(whitespace, __c7) && ! has63(delimiters, __c7))) {
      ___str2 = ___str2 + read_char(s);
    } else {
      break;
    }
  }
  if (___str2 === "true") {
    return true;
  } else {
    if (___str2 === "false") {
      return false;
    } else {
      var __n36 = maybe_number(___str2);
      if (real63(__n36)) {
        return __n36;
      } else {
        return ___str2;
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
          var __k42 = clip(__x710, 0, edge(__x710));
          var __v31 = read(s);
          __l14 = object(__l14);
          __l14[__k42] = __v31;
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
  var ___str3 = "";
  var __i48 = 0;
  while (__i48 < _35(opener)) {
    ___str3 = ___str3 + (read_char(s) || "");
    __i48 = __i48 + 1;
  }
  if (___str3 === opener) {
    while (nil63(__r253)) {
      if (clip(s.string, s.pos, s.pos + _35(closer)) === closer) {
        var __i49 = 0;
        while (__i49 < _35(closer)) {
          ___str3 = ___str3 + read_char(s);
          __i49 = __i49 + 1;
        }
        __r253 = ___str3;
      } else {
        if (nil63(peek_char(s))) {
          __r253 = expected(s, closer);
        } else {
          ___str3 = ___str3 + read_char(s);
          if (peek_char(s) === "\\") {
            ___str3 = ___str3 + read_char(s);
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
    var __i50 = s.pos;
    var __j1 = search(s.string, "\"", __i50 + 1);
    var __b5 = either(search(s.string, "\\", __i50 + 1), __j1);
    if (is63(__j1) && (__j1 < s.len && __b5 >= __j1)) {
      s.pos = __j1 + 1;
      return clip(s.string, __i50, __j1 + 1);
    } else {
      var __r255 = undefined;
      read_char(s);
      while (nil63(__r255)) {
        var __c9 = peek_char(s);
        if (__c9 === "\"") {
          read_char(s);
          __r255 = clip(s.string, __i50, s.pos);
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
  var __i51 = s.pos;
  var __j2 = search(s.string, "|", __i51 + 1);
  if (is63(__j2) && __j2 < s.len) {
    s.pos = __j2 + 1;
    return clip(s.string, __i51, __j2 + 1);
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
    var __i52 = edge(environment);
    while (__i52 >= 0) {
      if (has63(environment[__i52], k)) {
        var __b6 = environment[__i52][k];
        var __e90 = undefined;
        if (p) {
          __e90 = has(__b6, p);
        } else {
          __e90 = __b6;
        }
        return __e90;
      } else {
        __i52 = __i52 - 1;
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
  if (keys63(args)) {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __l15 = array(args);
      var ____o27 = args;
      var __k43 = undefined;
      for (__k43 in ____o27) {
        var __v32 = ____o27[__k43];
        var __e92 = undefined;
        if (numeric63(__k43)) {
          __e92 = parseInt(__k43);
        } else {
          __e92 = __k43;
        }
        var __k44 = __e92;
        if (! number63(__k44)) {
          add(__l15, ["%literal", __k44, "|=|", __v32]);
        }
      }
      return __l15;
    } else {
      var __l16 = ["%object", "\"_stash\"", true];
      var ____o28 = args;
      var __k45 = undefined;
      for (__k45 in ____o28) {
        var __v33 = ____o28[__k45];
        var __e91 = undefined;
        if (numeric63(__k45)) {
          __e91 = parseInt(__k45);
        } else {
          __e91 = __k45;
        }
        var __k46 = __e91;
        if (! number63(__k46)) {
          add(__l16, literal(__k46));
          add(__l16, __v33);
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
          var ____o29 = lh;
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
            var __e94 = undefined;
            if (__k48 === "rest") {
              __e94 = ["cut", __id120, _35(lh)];
            } else {
              __e94 = ["has", __id120, ["quote", bias(__k48)]];
            }
            var __x723 = __e94;
            if (is63(__k48)) {
              var __e95 = undefined;
              if (__v34 === true) {
                __e95 = __k48;
              } else {
                __e95 = __v34;
              }
              var __k49 = __e95;
              __bs26 = join(__bs26, bind(__k49, __x723));
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
  macro: function (_from) {
    var ____x734 = object(["target"]);
    ____x734.js = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", _from];
    ____x734.py = ["|list|", "|_args|"];
    ____x734.lua = ["list", "|...|"];
    return ____x734;
  }
});
bind42 = function (args, body) {
  var __args131 = {};
  var rest = function () {
    __args131.rest = true;
    var ____x743 = object(["target"]);
    ____x743.py = "|_keys|";
    return ["unstash", ["arguments%", _35(__args131)], ____x743];
  };
  if (atom63(args)) {
    return [__args131, join(["let", [args, rest()]], body)];
  } else {
    var __pre = [];
    var __bs27 = [];
    var __inits = [];
    var __r279 = unique("r");
    var ____o30 = args;
    var __k50 = undefined;
    for (__k50 in ____o30) {
      var __v35 = ____o30[__k50];
      var __e96 = undefined;
      if (numeric63(__k50)) {
        __e96 = parseInt(__k50);
      } else {
        __e96 = __k50;
      }
      var __k51 = __e96;
      if (number63(__k51)) {
        if (atom63(__v35)) {
          add(__args131, __v35);
        } else {
          if (hd(__v35) === "o") {
            var ____id1211 = __v35;
            var ___4 = has(____id1211, 0);
            var ___var2 = has(____id1211, 1);
            var __val5 = has(____id1211, 2);
            add(__args131, ___var2);
            add(__inits, ["%if", ["nil?", ___var2], ["%set", ___var2, __val5]]);
          } else {
            if (hd(__v35) === "t") {
              var ____id122 = __v35;
              var ___5 = has(____id122, 0);
              var ___var3 = has(____id122, 1);
              var __val6 = has(____id122, 2);
              var __val7 = either(__val6, ___var3);
              add(__args131, ___var3);
              add(__inits, ["%if", ["nil?", ___var3], ["%set", ___var3, ["the", __val7]]]);
            } else {
              var __x754 = unique("x");
              add(__args131, __x754);
              __bs27 = join(__bs27, [__v35, __x754]);
            }
          }
        }
      }
    }
    if (keys63(args)) {
      __pre = join(__pre, [__r279, rest()]);
      var __n41 = _35(__args131);
      var __i57 = 0;
      while (__i57 < __n41) {
        var __v36 = __args131[__i57];
        __pre = join(__pre, [__v36, ["destash!", __v36, __r279]]);
        __i57 = __i57 + 1;
      }
      __bs27 = join(__bs27, [keys(args), __r279]);
    }
    return [__args131, join(["let", __pre], __inits, [join(["let", __bs27], body)])];
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
var expand_local = function (__x764) {
  var ____id123 = __x764;
  var __x765 = has(____id123, 0);
  var __name20 = has(____id123, 1);
  var __value4 = has(____id123, 2);
  setenv(__name20, {
    _stash: true,
    variable: true
  });
  return ["%local", __name20, macroexpand(__value4)];
};
var expand_function = function (__x767) {
  var ____id124 = __x767;
  var __x768 = has(____id124, 0);
  var __args52 = has(____id124, 1);
  var __body72 = cut(____id124, 2);
  add(environment, {});
  var ____r286 = undefined;
  try{
    var ____o31 = __args52;
    var ____i58 = undefined;
    for (____i58 in ____o31) {
      var ____x769 = ____o31[____i58];
      var __e97 = undefined;
      if (numeric63(____i58)) {
        __e97 = parseInt(____i58);
      } else {
        __e97 = ____i58;
      }
      var ____i581 = __e97;
      setenv(____x769, {
        _stash: true,
        variable: true
      });
    }
    ____r286 = join(["%function", __args52], macroexpand(__body72));
  }
  finally{
    drop(environment);
  }
  return ____r286;
};
var expand_definition = function (__x771) {
  var ____id125 = __x771;
  var __x772 = has(____id125, 0);
  var __name21 = has(____id125, 1);
  var __args53 = has(____id125, 2);
  var __body73 = cut(____id125, 3);
  add(environment, {});
  var ____r288 = undefined;
  try{
    var ____o32 = __args53;
    var ____i59 = undefined;
    for (____i59 in ____o32) {
      var ____x773 = ____o32[____i59];
      var __e98 = undefined;
      if (numeric63(____i59)) {
        __e98 = parseInt(____i59);
      } else {
        __e98 = ____i59;
      }
      var ____i591 = __e98;
      setenv(____x773, {
        _stash: true,
        variable: true
      });
    }
    ____r288 = join([__x772, __name21, __args53], macroexpand(__body73));
  }
  finally{
    drop(environment);
  }
  return ____r288;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x775) {
  var ____id126 = __x775;
  var __name22 = has(____id126, 0);
  var __body74 = cut(____id126, 1);
  return apply(macro_function(__name22), __body74);
};
real63 = function (x) {
  return number63(x) && (! nan63(x) && ! inf63(x));
};
valid_access63 = function (_str) {
  return _35(_str) > 2 && (!( "." === char(_str, 0)) && (!( "." === char(_str, edge(_str))) && ! search(_str, "..")));
};
parse_access = function (_str) {
  return reduce(function (a, b) {
    var __n44 = number(a);
    if (is63(__n44)) {
      return ["at", b, __n44];
    } else {
      return ["%idx", b, a];
    }
  }, reverse(split(_str, ".")));
};
parse_access63 = function (form) {
  return string63(form) && (! string_literal63(form) && (! id_literal63(form) && (search(form, ".") && valid_access63(form))));
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
        var __x778 = hd(form);
        if (__x778 === "%local") {
          return expand_local(form);
        } else {
          if (__x778 === "%function") {
            return expand_function(form);
          } else {
            if (__x778 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x778 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x778 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x778)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x778)) {
                      return macroexpand(join([parse_access(__x778)], tl(form)));
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
  var ____o33 = form;
  var __k52 = undefined;
  for (__k52 in ____o33) {
    var __v37 = ____o33[__k52];
    var __e99 = undefined;
    if (numeric63(__k52)) {
      __e99 = parseInt(__k52);
    } else {
      __e99 = __k52;
    }
    var __k53 = __e99;
    if (! number63(__k53)) {
      var __e100 = undefined;
      if (quasisplice63(__v37, depth)) {
        __e100 = quasiexpand(__v37[1]);
      } else {
        __e100 = quasiexpand(__v37, depth);
      }
      var __v38 = __e100;
      last(__xs14)[__k53] = __v38;
    }
  }
  var ____x782 = form;
  var ____i61 = 0;
  while (____i61 < _35(____x782)) {
    var __x783 = ____x782[____i61];
    if (quasisplice63(__x783, depth)) {
      var __x784 = quasiexpand(__x783[1]);
      add(__xs14, __x784);
      add(__xs14, ["list"]);
    } else {
      add(last(__xs14), quasiexpand(__x783, depth));
    }
    ____i61 = ____i61 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || (!( hd(x) === "list") || keys63(x));
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
expand_if = function (__x788) {
  var ____id127 = __x788;
  var __a27 = has(____id127, 0);
  var __b7 = has(____id127, 1);
  var __c111 = cut(____id127, 2);
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
  var __i62 = 0;
  while (__i62 < has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value")) {
    __s3 = __s3 + "  ";
    __i62 = __i62 + 1;
  }
  return __s3;
};
var reserved = {
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
  ">=": true,
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
  "with": true,
  "and": true,
  "end": true,
  "load": true,
  "repeat": true,
  "while": true,
  "false": true,
  "local": true,
  "nil": true,
  "then": true,
  "not": true,
  "true": true,
  "elseif": true,
  "or": true,
  "until": true,
  "from": true,
  "str": true,
  "print": true
};
reserved63 = function (x) {
  return has63(reserved, x);
};
var valid_code63 = function (n) {
  return number_code63(n) || (n > 64 && n < 91 || (n > 96 && n < 123 || n === 95));
};
compile_id = function (id, raw63) {
  if (code(id, 0) === 46) {
    return "." + compile_id(clip(id, 1), true);
  } else {
    var __e101 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e101 = "L_";
    } else {
      __e101 = "_";
    }
    var __x794 = __e101;
    var __e102 = undefined;
    if (number_code63(code(id, 0))) {
      __e102 = __x794;
    } else {
      __e102 = "";
    }
    var __id131 = __e102;
    var __i63 = 0;
    while (__i63 < _35(id)) {
      var __c12 = char(id, __i63);
      var __n46 = code(__c12);
      var __e103 = undefined;
      if (__c12 === "-" && !( id === "-")) {
        var __e106 = undefined;
        if (__i63 === 0) {
          __e106 = __x794;
        } else {
          __e106 = "_";
        }
        __e103 = __e106;
      } else {
        var __e104 = undefined;
        if (valid_code63(__n46)) {
          __e104 = __c12;
        } else {
          var __e105 = undefined;
          if (__i63 === 0) {
            __e105 = __x794 + __n46;
          } else {
            __e105 = __n46;
          }
          __e104 = __e105;
        }
        __e103 = __e104;
      }
      var __c121 = __e103;
      __id131 = __id131 + __c121;
      __i63 = __i63 + 1;
    }
    if (raw63) {
      return __id131;
    } else {
      if (reserved63(__id131)) {
        return __x794 + __id131;
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
  var __x795 = compile_id(x);
  if (has63(__names8, __x795)) {
    var __i64 = __names8[__x795];
    __names8[__x795] = __names8[__x795] + 1;
    return unique(__x795 + __i64);
  } else {
    __names8[__x795] = 1;
    return "__" + __x795;
  }
};
key = function (k) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return k;
  } else {
    var __i65 = inner(k);
    if (valid_id63(__i65)) {
      return __i65;
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
  var __o34 = [];
  var ____o35 = t;
  var __k54 = undefined;
  for (__k54 in ____o35) {
    var __v39 = ____o35[__k54];
    var __e107 = undefined;
    if (numeric63(__k54)) {
      __e107 = parseInt(__k54);
    } else {
      __e107 = __k54;
    }
    var __k55 = __e107;
    var __x796 = f(__v39);
    if (is63(__x796)) {
      add(__o34, literal(__k55));
      add(__o34, __x796);
    }
  }
  return __o34;
};
var ____x798 = object([]);
var ____x799 = object([]);
____x799.js = "!";
____x799.lua = "not";
____x799.py = "not";
____x798["%not"] = ____x799;
____x798["%unm"] = "-";
var ____x800 = object([]);
____x800["%mul"] = "*";
____x800["%div"] = "/";
____x800["%idiv"] = "//";
____x800["%mod"] = "%";
var ____x801 = object([]);
var ____x802 = object([]);
____x802.js = "+";
____x802.lua = "..";
____x802.py = "+";
____x801["%cat"] = ____x802;
var ____x803 = object([]);
____x803["%add"] = "+";
____x803["%sub"] = "-";
var ____x804 = object([]);
____x804["%lt"] = "<";
____x804["%gt"] = ">";
____x804["%le"] = "<=";
____x804["%ge"] = ">=";
var ____x805 = object([]);
var ____x806 = object([]);
____x806.js = "===";
____x806.lua = "==";
____x806.py = "==";
____x805["%eq"] = ____x806;
var ____x807 = object([]);
var ____x808 = object([]);
____x808.py = "in";
____x807["%in"] = ____x808;
var ____x809 = object([]);
____x809.py = "is";
____x807["%is"] = ____x809;
var ____x810 = object([]);
var ____x811 = object([]);
____x811.js = "&&";
____x811.lua = "and";
____x811.py = "and";
____x810["%and"] = ____x811;
var ____x812 = object([]);
var ____x813 = object([]);
____x813.js = "||";
____x813.lua = "or";
____x813.py = "or";
____x812["%or"] = ____x813;
var infix = [____x798, ____x800, ____x801, ____x803, ____x804, ____x805, ____x807, ____x810, ____x812];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["%not", "%unm"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var ____o36 = infix;
    var __k56 = undefined;
    for (__k56 in ____o36) {
      var __v40 = ____o36[__k56];
      var __e108 = undefined;
      if (numeric63(__k56)) {
        __e108 = parseInt(__k56);
      } else {
        __e108 = __k56;
      }
      var __k57 = __e108;
      if (has63(__v40, hd(form))) {
        return index(__k57);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x815 = has(level, op);
    if (__x815 === true) {
      return op;
    } else {
      if (string63(__x815)) {
        return __x815;
      } else {
        if (is63(__x815)) {
          return has(__x815, has(setenv("target", {
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
  var ____x816 = args;
  var ____i68 = 0;
  while (____i68 < _35(____x816)) {
    var __x817 = ____x816[____i68];
    __s4 = __s4 + (__c13 + compile(__x817));
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" && (default63 && ! id_literal63(__x817))) {
      __s4 = __s4 + "=None";
    }
    __c13 = ", ";
    ____i68 = ____i68 + 1;
  }
  return __s4 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s12 = "";
    var __i69 = 0;
    while (__i69 < _35(s)) {
      var __c14 = char(s, __i69);
      var __e109 = undefined;
      if (__c14 === "\n") {
        __e109 = "\\n";
      } else {
        var __e110 = undefined;
        if (__c14 === "\r") {
          __e110 = "\\r";
        } else {
          __e110 = __c14;
        }
        __e109 = __e110;
      }
      __s12 = __s12 + __e109;
      __i69 = __i69 + 1;
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
var compile_atom = function (x) {
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
  var ____id128 = form;
  var __x818 = has(____id128, 0);
  var __args54 = cut(____id128, 1);
  var ____id129 = getenv(__x818);
  var __special = has(____id129, "special");
  var __stmt = has(____id129, "stmt");
  var __self_tr63 = has(____id129, "tr");
  var __e111 = undefined;
  if (stmt63 && ! __stmt) {
    __e111 = indentation();
  } else {
    __e111 = "";
  }
  var __p1 = __e111;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p1 + (apply(__special, __args54) + __tr);
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
var method_call63 = function (form) {
  var __e112 = undefined;
  if (list63(form)) {
    __e112 = hd(form);
  } else {
    __e112 = form;
  }
  var __x819 = __e112;
  return string63(__x819) && (_35(__x819, 1) > 1 && char(__x819, 0) === ".");
};
var compile_call = function (form) {
  var __f4 = hd(form);
  var __f11 = compile(__f4);
  var __args55 = stash42(tl(form));
  var __e113 = undefined;
  if (method_call63(hd(__args55))) {
    __e113 = mapcat(compile, __args55, "");
  } else {
    __e113 = compile_args(__args55);
  }
  var __args56 = __e113;
  if (parenthesize_call63(__f4)) {
    return "(" + (__f11 + (")" + __args56));
  } else {
    return __f11 + __args56;
  }
};
var op_delims = function (parent, child) {
  var ____r330 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r330);
  var __child = destash33(child, ____r330);
  var ____id130 = ____r330;
  var __right = has(____id130, "right");
  var __e114 = undefined;
  if (__right) {
    __e114 = _6261;
  } else {
    __e114 = _62;
  }
  if (__e114(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id1311 = form;
  var __op = has(____id1311, 0);
  var ____id132 = cut(____id1311, 1);
  var __a28 = has(____id132, 0);
  var __b8 = has(____id132, 1);
  var ____id133 = op_delims(form, __a28);
  var __ao = has(____id133, 0);
  var __ac = has(____id133, 1);
  var ____id134 = op_delims(form, __b8, {
    _stash: true,
    right: true
  });
  var __bo = has(____id134, 0);
  var __bc = has(____id134, 1);
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
  var ____x822 = compile(body, {
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
  var __s5 = ____x822;
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
    var ____x823 = indentation() + "pass\n";
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    return ____x823;
  } else {
    return __s5;
  }
};
compile_function = function (args, body) {
  var ____r333 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args57 = destash33(args, ____r333);
  var __body75 = destash33(body, ____r333);
  var ____id135 = ____r333;
  var __name23 = has(____id135, "name");
  var __prefix = has(____id135, "prefix");
  var __async = has(____id135, "async");
  var __e115 = undefined;
  if (__name23) {
    __e115 = compile(__name23);
  } else {
    __e115 = "";
  }
  var __id136 = __e115;
  var __e116 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && has63(__args57, "rest")) {
    __e116 = join(__args57, ["|...|"]);
  } else {
    var __e117 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" && has63(__args57, "rest")) {
      __e117 = join(__args57, ["|*_args|", "|**_keys|"]);
    } else {
      __e117 = __args57;
    }
    __e116 = __e117;
  }
  var __args141 = __e116;
  var __args58 = compile_args(__args141, true);
  var __body76 = compile_body(__body75);
  var __ind = indentation();
  var __e118 = undefined;
  if (__prefix) {
    __e118 = __prefix + " ";
  } else {
    __e118 = "";
  }
  var __p2 = __e118;
  var __e119 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e119 = "";
  } else {
    __e119 = "end";
  }
  var __tr1 = __e119;
  var __e120 = undefined;
  if (__async && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua")) {
    __e120 = "async ";
  } else {
    __e120 = "";
  }
  var __a30 = __e120;
  if (__name23) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __a30 + ("function " + (__id136 + (__args58 + (" {\n" + (__body76 + (__ind + ("}" + __tr1)))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __e121 = undefined;
      if (none63(__ind)) {
        __e121 = "\n";
      } else {
        __e121 = "";
      }
      var __ws = __e121;
      return __a30 + ("def " + (__id136 + (__args58 + (":\n" + (__body76 + __ws)))));
    } else {
      return __p2 + ("function " + (__id136 + (__args58 + ("\n" + (__body76 + (__ind + __tr1))))));
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "%return") && ! statement63(hd(form)));
};
compile = function (form) {
  var ____r335 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form8 = destash33(form, ____r335);
  var ____id137 = ____r335;
  var __stmt1 = has(____id137, "stmt");
  if (nil63(__form8)) {
    return "";
  } else {
    if (special_form63(__form8)) {
      return compile_special(__form8, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e122 = undefined;
      if (__stmt1) {
        __e122 = indentation();
      } else {
        __e122 = "";
      }
      var __ind1 = __e122;
      var __e123 = undefined;
      if (atom63(__form8)) {
        __e123 = compile_atom(__form8);
      } else {
        var __e124 = undefined;
        if (infix63(hd(__form8))) {
          __e124 = compile_infix(__form8);
        } else {
          __e124 = compile_call(__form8);
        }
        __e123 = __e124;
      }
      var __form9 = __e123;
      return __ind1 + (__form9 + __tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e11 = lower(form, __hoist, true, tail63);
  var __e125 = undefined;
  if (some63(__hoist) && is63(__e11)) {
    __e125 = join(["%do"], __hoist, [__e11]);
  } else {
    var __e126 = undefined;
    if (is63(__e11)) {
      __e126 = __e11;
    } else {
      var __e127 = undefined;
      if (_35(__hoist) > 1) {
        __e127 = join(["%do"], __hoist);
      } else {
        __e127 = hd(__hoist);
      }
      __e126 = __e127;
    }
    __e125 = __e126;
  }
  return either(__e125, ["%do"]);
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
  var ____x831 = almost(args);
  var ____i70 = 0;
  while (____i70 < _35(____x831)) {
    var __x832 = ____x831[____i70];
    var ____y8 = lower(__x832, hoist, stmt63);
    if (yes(____y8)) {
      var __e12 = ____y8;
      if (standalone63(__e12)) {
        add(hoist, __e12);
      }
    }
    ____i70 = ____i70 + 1;
  }
  var __e13 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e13)) {
    return ["%return", __e13];
  } else {
    return __e13;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id138 = args;
  var __lh4 = has(____id138, 0);
  var __rh4 = has(____id138, 1);
  var __lh11 = lower(__lh4, hoist);
  var __rh11 = lower(__rh4, hoist);
  add(hoist, ["%set", __lh11, __rh11]);
  if (!( stmt63 && ! tail63)) {
    return __lh11;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id139 = args;
  var __cond6 = has(____id139, 0);
  var ___then = has(____id139, 1);
  var ___else = has(____id139, 2);
  if (stmt63) {
    var __e129 = undefined;
    if (is63(___else)) {
      __e129 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond6, hoist), lower_body([___then], tail63)], __e129));
  } else {
    var __e14 = unique("e");
    add(hoist, ["%local", __e14, "nil"]);
    var __e128 = undefined;
    if (is63(___else)) {
      __e128 = [lower(["%set", __e14, ___else])];
    }
    add(hoist, join(["%if", lower(__cond6, hoist), lower(["%set", __e14, ___then])], __e128));
    return __e14;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id140 = args;
  var __a31 = has(____id140, 0);
  var __b10 = has(____id140, 1);
  var __hoist1 = [];
  var __b11 = lower(__b10, __hoist1);
  if (some63(__hoist1)) {
    var __id141 = unique("id");
    var __e130 = undefined;
    if (x === "%and") {
      __e130 = ["%if", __id141, __b10, __id141];
    } else {
      __e130 = ["%if", __id141, __id141, __b10];
    }
    return lower(["%do", ["%local", __id141, __a31], __e130], hoist);
  } else {
    return [x, lower(__a31, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id142 = args;
  var __c15 = has(____id142, 0);
  var __body77 = cut(____id142, 1);
  var __pre1 = [];
  var __c16 = lower(__c15, __pre1);
  var __e131 = undefined;
  if (none63(__pre1)) {
    __e131 = ["%while", __c16, lower_body(__body77)];
  } else {
    __e131 = ["%while", true, join(["%do"], __pre1, [["%if", ["%not", __c16], ["%break"]], lower_body(__body77)])];
  }
  return add(hoist, __e131);
};
var lower_for = function (args, hoist) {
  var ____id143 = args;
  var __h = has(____id143, 0);
  var __k58 = has(____id143, 1);
  var __body78 = cut(____id143, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k58, lower_body(__body78)], keys(__body78)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id144 = args;
  var __h1 = has(____id144, 0);
  var __body79 = cut(____id144, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body79, tail63)], keys(__body79)));
  } else {
    var __e15 = unique("e");
    add(hoist, ["%local", __e15]);
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e15, join(["%do"], __body79)])], keys(__body79)));
    return __e15;
  }
};
var lower_block = function (args, hoist, stmt63, tail63) {
  var ____id145 = args;
  var __name24 = has(____id145, 0);
  var __h2 = has(____id145, 1);
  var __body80 = cut(____id145, 2);
  return add(hoist, ["%block", __name24, lower(__h2, hoist), lower_body(__body80, tail63)]);
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __f5 = unique("f");
    return lower(["%do", join(["%local-function", __f5], args), __f5], hoist);
  } else {
    var ____id146 = args;
    var __a32 = has(____id146, 0);
    var __body81 = cut(____id146, 1);
    return join(["%function", __a32, lower_body(__body81, true)], keys(__body81));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id147 = args;
  var __name25 = has(____id147, 0);
  var __args59 = has(____id147, 1);
  var __body82 = cut(____id147, 2);
  return add(hoist, join([kind, __name25, __args59, lower_body(__body82, true)], keys(__body82)));
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
    var ____id148 = form;
    var __x869 = has(____id148, 0);
    var __args60 = cut(____id148, 1);
    reduce(function (a, b) {
      add(__e16, [__x869, a, b]);
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
  var ____id149 = __form11;
  var __x872 = has(____id149, 0);
  var __args61 = cut(____id149, 1);
  return lower(reduce(function (a, b) {
    return [__x872, b, a];
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
          var ____id150 = form;
          var __x875 = has(____id150, 0);
          var __args62 = cut(____id150, 1);
          if (__x875 === "%do") {
            return lower_do(__args62, hoist, stmt63, tail63);
          } else {
            if (__x875 === "%call") {
              return lower(__args62, hoist, stmt63, tail63);
            } else {
              if (__x875 === "%set") {
                return lower_set(__args62, hoist, stmt63, tail63);
              } else {
                if (__x875 === "%if") {
                  return lower_if(__args62, hoist, stmt63, tail63);
                } else {
                  if (__x875 === "%try") {
                    return lower_try(__args62, hoist, tail63);
                  } else {
                    if (__x875 === "%while") {
                      return lower_while(__args62, hoist);
                    } else {
                      if (__x875 === "%for") {
                        return lower_for(__args62, hoist);
                      } else {
                        if (__x875 === "%with") {
                          return lower_with(__args62, hoist, stmt63, tail63);
                        } else {
                          if (__x875 === "%block") {
                            return lower_block(__args62, hoist, stmt63, tail63);
                          } else {
                            if (__x875 === "%cases") {
                              return lower_cases(__args62, hoist, stmt63, tail63);
                            } else {
                              if (__x875 === "%function") {
                                return lower_function(__args62, hoist);
                              } else {
                                if (__x875 === "%local-function" || __x875 === "%global-function") {
                                  return lower_definition(__x875, __args62, hoist);
                                } else {
                                  if (in63(__x875, ["%and", "%or"])) {
                                    return lower_short(__x875, __args62, hoist);
                                  } else {
                                    if (statement63(__x875)) {
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
var __e132 = undefined;
if (typeof(global) === "undefined") {
  var __e133 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e133 = window;
  } else {
    var __e134 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e134 = self;
    } else {
      __e134 = this;
    }
    __e133 = __e134;
  }
  global = __e133;
  __e132 = global;
}
var __e135 = undefined;
if (!( typeof(require) === "undefined")) {
  global.require = require;
  global.require;
  var __e136 = undefined;
  if (!( typeof(__module1) === "undefined")) {
    __module1.filename = require("path").resolve("repl");
    __module1.filename;
    __module1.paths = require("module")._nodeModulePaths(__module1.filename);
    __e136 = __module1.paths;
  }
  __e135 = __e136;
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
    var __forms9 = unstash(Array.prototype.slice.call(arguments, 0));
    var __s7 = "";
    var ____x880 = __forms9;
    var ____i72 = 0;
    while (____i72 < _35(____x880)) {
      var __x881 = ____x880[____i72];
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua" && (immediate_call63(__x881) && "\n" === char(__s7, edge(__s7)))) {
        __s7 = clip(__s7, 0, edge(__s7)) + ";\n";
      }
      __s7 = __s7 + compile(__x881, {
        _stash: true,
        stmt: true
      });
      if (! atom63(__x881)) {
        if (hd(__x881) === "%return" || hd(__x881) === "%break") {
          break;
        }
      }
      ____i72 = ____i72 + 1;
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
    var __e137 = undefined;
    if (alt) {
      __e137 = compile_body(alt);
    }
    var __alt1 = __e137;
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
    var __body84 = compile_body(form);
    var __ind5 = indentation();
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind5 + ("while (" + (__cond10 + (") {\n" + (__body84 + (__ind5 + "}\n")))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind5 + ("while " + (__cond10 + (":\n" + __body84)));
      } else {
        return __ind5 + ("while " + (__cond10 + (" do\n" + (__body84 + (__ind5 + "end\n")))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%for", {
  _stash: true,
  special: function (t, k, form) {
    var ____r371 = unstash(Array.prototype.slice.call(arguments, 3));
    var __t8 = destash33(t, ____r371);
    var __k61 = destash33(k, ____r371);
    var __form13 = destash33(form, ____r371);
    var ____id152 = ____r371;
    var __async2 = has(____id152, "async");
    var __t9 = compile(__t8);
    var __k62 = compile(__k61);
    var __ind7 = indentation();
    var __body86 = compile_body(__form13);
    var __e138 = undefined;
    if (__async2) {
      __e138 = "async ";
    } else {
      __e138 = "";
    }
    var __a34 = __e138;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return __ind7 + ("for " + (__k62 + (" in next, " + (__t9 + (" do\n" + (__body86 + (__ind7 + "end\n")))))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind7 + (__a34 + ("for " + (__k62 + (" in " + (__t9 + (":\n" + __body86))))));
      } else {
        return __ind7 + ("for (" + (__k62 + (" in " + (__t9 + (") {\n" + (__body86 + (__ind7 + "}\n")))))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%with", {
  _stash: true,
  special: function (t, form) {
    var ____r373 = unstash(Array.prototype.slice.call(arguments, 2));
    var __t12 = destash33(t, ____r373);
    var __form15 = destash33(form, ____r373);
    var ____id154 = ____r373;
    var __async4 = has(____id154, "async");
    var __t13 = compile(__t12);
    var __ind9 = indentation();
    var __body88 = compile_body(__form15);
    var __e139 = undefined;
    if (__async4) {
      __e139 = "async ";
    } else {
      __e139 = "";
    }
    var __a36 = __e139;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind9 + (__a36 + ("with " + (__t13 + (":\n" + __body88))));
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
    var __t15 = compile(t);
    var __ind11 = indentation();
    var __body90 = compile_body(form);
    var __e140 = undefined;
    if (some63(__t15)) {
      __e140 = " ";
    } else {
      __e140 = "";
    }
    var __sep1 = __e140;
    var __e141 = undefined;
    if (some63(__t15)) {
      __e141 = "(";
    } else {
      __e141 = "";
    }
    var __lh6 = __e141;
    var __e142 = undefined;
    if (some63(__t15)) {
      __e142 = ")";
    } else {
      __e142 = "";
    }
    var __rh6 = __e142;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind11 + (name + (__sep1 + (__t15 + (":\n" + __body90))));
    } else {
      return __ind11 + (name + (__sep1 + (__lh6 + (__t15 + (__rh6 + (__sep1 + ("{\n" + (__body90 + (__ind11 + "}\n")))))))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%try", {
  _stash: true,
  special: function (form) {
    var __ind13 = indentation();
    var __body92 = compile_body(form);
    var __e143 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e143 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", false, ["%get", "e", 1], "e"]]];
    } else {
      __e143 = ["%return", ["%array", false, "e"]];
    }
    var __hf1 = __e143;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x903 = compile(__hf1, {
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
    var __h4 = ____x903;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind13 + ("try {\n" + (__body92 + (__ind13 + ("}\n" + (__ind13 + ("catch (e) {\n" + (__h4 + (__ind13 + "}\n"))))))));
    } else {
      return __ind13 + ("try:\n" + (__body92 + (__ind13 + ("except:\n" + __h4))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%delete", {
  _stash: true,
  special: function (place) {
    var __e144 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e144 = "del ";
    } else {
      __e144 = "delete ";
    }
    return indentation() + (__e144 + compile(place));
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
    var ____r383 = unstash(Array.prototype.slice.call(arguments, 1));
    var __args64 = destash33(args, ____r383);
    var ____id156 = ____r383;
    var __body94 = cut(____id156, 0);
    return apply(compile_function, join([__args64], __body94, []));
  }
});
setenv("%global-function", {
  _stash: true,
  special: function (name, args) {
    var ____r385 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name27 = destash33(name, ____r385);
    var __args66 = destash33(args, ____r385);
    var ____id158 = ____r385;
    var __body96 = cut(____id158, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x914 = object([__args66]);
      ____x914.name = __name27;
      var ____x915 = object([]);
      ____x915.name = __name27;
      var __x913 = apply(compile_function, join(____x914, __body96, ____x915));
      return indentation() + __x913;
    } else {
      return compile(["%set", __name27, join(["%function", __args66], __body96)], {
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
    var ____r387 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name29 = destash33(name, ____r387);
    var __args68 = destash33(args, ____r387);
    var ____id160 = ____r387;
    var __body98 = cut(____id160, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x924 = object([__args68]);
      ____x924.name = __name29;
      ____x924.prefix = "local";
      var ____x925 = object([]);
      ____x925.name = __name29;
      ____x925.prefix = "local";
      var __x923 = apply(compile_function, join(____x924, __body98, ____x925));
      return indentation() + __x923;
    } else {
      return compile(["%local", __name29, join(["%function", __args68], __body98)], {
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
    var __e145 = undefined;
    if (nil63(x)) {
      __e145 = "return";
    } else {
      __e145 = "return " + compile(x);
    }
    var __x929 = __e145;
    return indentation() + __x929;
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
    var __e146 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e146 = "throw " + compile(["%new", ["Error", x]]);
    } else {
      var __e147 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e147 = "raise " + compile(["Exception", x]);
      } else {
        __e147 = "error(" + (compile(x) + ")");
      }
      __e146 = __e147;
    }
    var __e30 = __e146;
    return indentation() + __e30;
  },
  stmt: true
});
setenv("%throw", {
  _stash: true,
  special: function (x) {
    var __e148 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e148 = "throw " + compile(x);
    } else {
      var __e149 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e149 = "raise " + compile(x);
      } else {
        __e149 = "error(" + (compile(x) + ")");
      }
      __e148 = __e149;
    }
    var __e34 = __e148;
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
    var __id162 = compile(name);
    var __value12 = compile(value);
    var __e150 = undefined;
    if (is63(value)) {
      __e150 = " = " + __value12;
    } else {
      __e150 = "";
    }
    var __rh8 = __e150;
    var __e151 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e151 = "var ";
    } else {
      var __e152 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua") {
        __e152 = "local ";
      } else {
        __e152 = "";
      }
      __e151 = __e152;
    }
    var __keyword3 = __e151;
    var __ind15 = indentation();
    return __ind15 + (__keyword3 + (__id162 + __rh8));
  },
  stmt: true
});
setenv("%set", {
  _stash: true,
  special: function (lh, rh) {
    var __lh8 = compile(lh);
    var __e153 = undefined;
    if (nil63(rh)) {
      __e153 = "nil";
    } else {
      __e153 = rh;
    }
    var __rh10 = compile(__e153);
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
    var __k141 = compile(k);
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
    var __forms11 = unstash(Array.prototype.slice.call(arguments, 0));
    var __e154 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e154 = "{";
    } else {
      __e154 = "[";
    }
    var __open1 = __e154;
    var __e155 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e155 = "}";
    } else {
      __e155 = "]";
    }
    var __close1 = __e155;
    var __s111 = "";
    var __c18 = "";
    var ____o38 = __forms11;
    var __k65 = undefined;
    for (__k65 in ____o38) {
      var __v42 = ____o38[__k65];
      var __e156 = undefined;
      if (numeric63(__k65)) {
        __e156 = parseInt(__k65);
      } else {
        __e156 = __k65;
      }
      var __k66 = __e156;
      if (number63(__k66)) {
        __s111 = __s111 + (__c18 + compile(__v42));
        __c18 = ", ";
      }
    }
    return __open1 + (__s111 + __close1);
  }
});
setenv("%object", {
  _stash: true,
  special: function () {
    var __forms13 = unstash(Array.prototype.slice.call(arguments, 0));
    var __s13 = "{";
    var __c20 = "";
    var __e157 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e157 = " = ";
    } else {
      __e157 = ": ";
    }
    var __sep3 = __e157;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x938 = indentation();
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    var __ind17 = ____x938;
    var __e158 = undefined;
    if (_35(__forms13) > 2) {
      __e158 = "\n" + __ind17;
    }
    var __pad1 = __e158;
    var __e159 = undefined;
    if (is63(__pad1)) {
      __e159 = "\n" + indentation();
    } else {
      __e159 = "";
    }
    var ___end1 = __e159;
    __s13 = __s13 + either(__pad1, "");
    var ____o40 = pair(__forms13);
    var __k70 = undefined;
    for (__k70 in ____o40) {
      var __v45 = ____o40[__k70];
      var __e160 = undefined;
      if (numeric63(__k70)) {
        __e160 = parseInt(__k70);
      } else {
        __e160 = __k70;
      }
      var __k71 = __e160;
      if (number63(__k71)) {
        var ____id164 = __v45;
        var __k72 = has(____id164, 0);
        var __v46 = has(____id164, 1);
        if (! string63(__k72)) {
          throw new Error("Illegal key: " + _str(__k72));
        }
        setenv("indent-level", {
          _stash: true,
          toplevel: true
        }).value = has(setenv("indent-level", {
          _stash: true,
          toplevel: true
        }), "value") + 1;
        var ____x939 = compile(__v46);
        setenv("indent-level", {
          _stash: true,
          toplevel: true
        }).value = has(setenv("indent-level", {
          _stash: true,
          toplevel: true
        }), "value") - 1;
        __s13 = __s13 + (__c20 + (key(__k72) + (__sep3 + ____x939)));
        __c20 = "," + either(__pad1, " ");
      }
    }
    return __s13 + (___end1 + "}");
  }
});
setenv("%list", {
  _stash: true,
  special: function (form, comps, cond) {
    var __s15 = compile(form);
    var ____x941 = comps;
    var ____i78 = 0;
    while (____i78 < _35(____x941)) {
      var ____id166 = ____x941[____i78];
      var __k74 = has(____id166, 0);
      var __v48 = has(____id166, 1);
      __s15 = __s15 + (" for " + (compile(__k74) + (" in " + compile(__v48))));
      ____i78 = ____i78 + 1;
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
    var ____r411 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name31 = destash33(name, ____r411);
    var ____id169 = ____r411;
    var __alias1 = cut(____id169, 0);
    var __ind19 = indentation();
    var __e161 = undefined;
    if (hd(__alias1) === "as") {
      __e161 = __alias1[1];
    } else {
      __e161 = hd(__alias1);
    }
    var __as1 = __e161;
    var __id170 = __as1 || __name31;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __s17 = __ind19 + ("import " + compile(__name31));
      if (__as1) {
        __s17 = __s17 + (" as " + compile(__id170));
      }
      return __s17;
    } else {
      return __ind19 + compile(["%local", __id170, ["require", escape(__name31)]]);
    }
  },
  stmt: true
});
setenv("from", {
  _stash: true,
  special: function (name) {
    var ____r414 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name33 = destash33(name, ____r414);
    var ____id173 = ____r414;
    var __imports1 = cut(____id173, 0);
    var __ind21 = indentation();
    var __id174 = __name33;
    var __e162 = undefined;
    if (hd(__imports1) === "import") {
      __e162 = tl(__imports1);
    } else {
      __e162 = __imports1;
    }
    var __names11 = __e162;
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
      return __ind21 + ("from " + (compile(__name33) + (" import " + __names12)));
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
    var __e163 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e163 = "";
    } else {
      __e163 = "await ";
    }
    var __a38 = __e163;
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
__exports1._eval = _eval;
__exports1._eval;
__exports1.expand = expand;
__exports1.expand;
__exports1.compile = compile;
__exports1.compile;
pymen.compiler = __exports1;
exports.pymen = pymen;
