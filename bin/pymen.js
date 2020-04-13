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
      var __e42 = undefined;
      if (numeric63(__k)) {
        __e42 = parseInt(__k);
      } else {
        __e42 = __k;
      }
      var __k1 = __e42;
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
      var __e43 = undefined;
      if (numeric63(__k2)) {
        __e43 = parseInt(__k2);
      } else {
        __e43 = __k2;
      }
      var __k3 = __e43;
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
    var __e44 = undefined;
    if (numeric63(__k4)) {
      __e44 = parseInt(__k4);
    } else {
      __e44 = __k4;
    }
    var __k5 = __e44;
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
  return nil63(x) || string63(x) || number63(x) || boolean63(x);
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
  var __e45 = undefined;
  if (nil63(_from) || _from < 0) {
    __e45 = 0;
  } else {
    __e45 = _from;
  }
  var __i3 = __e45;
  var __n4 = _35(x);
  var __e46 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e46 = __n4;
  } else {
    __e46 = upto;
  }
  var __upto1 = __e46;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e47 = undefined;
    if (numeric63(__k6)) {
      __e47 = parseInt(__k6);
    } else {
      __e47 = __k6;
    }
    var __k7 = __e47;
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
    var __e48 = undefined;
    if (numeric63(__k8)) {
      __e48 = parseInt(__k8);
    } else {
      __e48 = __k8;
    }
    var __k9 = __e48;
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
        var __e49 = undefined;
        if (numeric63(__k10)) {
          __e49 = parseInt(__k10);
        } else {
          __e49 = __k10;
        }
        var __k11 = __e49;
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
    var __e50 = undefined;
    if (numeric63(____i9)) {
      __e50 = parseInt(____i9);
    } else {
      __e50 = ____i9;
    }
    var ____i91 = __e50;
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
    var __e51 = undefined;
    if (numeric63(__k12)) {
      __e51 = parseInt(__k12);
    } else {
      __e51 = __k12;
    }
    var __k13 = __e51;
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
    var __e52 = undefined;
    if (f) {
      __e52 = f(__v8);
    } else {
      __e52 = __v8;
    }
    var __y4 = __e52;
    if (is63(__y4)) {
      __r57 = __r57 + __c + __y4;
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
    var __e53 = undefined;
    if (numeric63(__k14)) {
      __e53 = parseInt(__k14);
    } else {
      __e53 = __k14;
    }
    var __k15 = __e53;
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
    var __e54 = undefined;
    if (numeric63(____i16)) {
      __e54 = parseInt(____i16);
    } else {
      __e54 = ____i16;
    }
    var ____i161 = __e54;
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
      var __e55 = undefined;
      if (numeric63(__k16)) {
        __e55 = parseInt(__k16);
      } else {
        __e55 = __k16;
      }
      var __k17 = __e55;
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
        var __e57 = undefined;
        if (numeric63(__k18)) {
          __e57 = parseInt(__k18);
        } else {
          __e57 = __k18;
        }
        var __k19 = __e57;
        if (!( __k19 === "_stash")) {
          __args1[__k19] = __v11;
        }
      }
      if (params) {
        var ____o12 = params;
        var __k20 = undefined;
        for (__k20 in ____o12) {
          var __v12 = ____o12[__k20];
          var __e58 = undefined;
          if (numeric63(__k20)) {
            __e58 = parseInt(__k20);
          } else {
            __e58 = __k20;
          }
          var __k21 = __e58;
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
          var __e56 = undefined;
          if (numeric63(__k22)) {
            __e56 = parseInt(__k22);
          } else {
            __e56 = __k22;
          }
          var __k23 = __e56;
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
      var __e59 = undefined;
      if (numeric63(__k24)) {
        __e59 = parseInt(__k24);
      } else {
        __e59 = __k24;
      }
      var __k25 = __e59;
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
  if (nil63(search(s, "\n")) && nil63(search(s, "\r")) && nil63(search(s, "\"")) && nil63(search(s, "\\"))) {
    return "\"" + s + "\"";
  } else {
    var __s1 = "\"";
    var __i26 = 0;
    while (__i26 < _35(s)) {
      var __c1 = char(s, __i26);
      var __e60 = undefined;
      if (__c1 === "\n") {
        __e60 = "\\n";
      } else {
        var __e61 = undefined;
        if (__c1 === "\r") {
          __e61 = "\\r";
        } else {
          var __e62 = undefined;
          if (__c1 === "\"") {
            __e62 = "\\\"";
          } else {
            var __e63 = undefined;
            if (__c1 === "\\") {
              __e63 = "\\\\";
            } else {
              __e63 = __c1;
            }
            __e62 = __e63;
          }
          __e61 = __e62;
        }
        __e60 = __e61;
      }
      var __c11 = __e60;
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
                        return "|" + tostring(x) + "|";
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
                        var __e64 = undefined;
                        if (numeric63(__k26)) {
                          __e64 = parseInt(__k26);
                        } else {
                          __e64 = __k26;
                        }
                        var __k27 = __e64;
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
                        __s = __s + __sp + __v16;
                        __sp = " ";
                        ____i28 = ____i28 + 1;
                      }
                      var ____x14 = __ks;
                      var ____i29 = 0;
                      while (____i29 < _35(____x14)) {
                        var ____id2 = ____x14[____i29];
                        var __k28 = has(____id2, 0);
                        var __v17 = has(____id2, 1);
                        __s = __s + __sp + __k28 + " " + __v17;
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
  var ____r89 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f1 = destash33(f, ____r89);
  var ____id3 = ____r89;
  var __args12 = cut(____id3, 0);
  return apply(__f1, __args12);
};
setenv = function (k) {
  var ____r90 = unstash(Array.prototype.slice.call(arguments, 1));
  var __k29 = destash33(k, ____r90);
  var ____id4 = ____r90;
  var __keys = cut(____id4, 0);
  if (string63(__k29)) {
    var __e65 = undefined;
    if (has63(__keys, "toplevel")) {
      __e65 = hd(environment);
    } else {
      __e65 = last(environment);
    }
    var __frame = __e65;
    var __e66 = undefined;
    if (has63(__frame, __k29)) {
      __e66 = __frame[__k29];
    } else {
      __e66 = {};
    }
    var __entry = __e66;
    var ____o16 = __keys;
    var __k30 = undefined;
    for (__k30 in ____o16) {
      var __v18 = ____o16[__k30];
      var __e67 = undefined;
      if (numeric63(__k30)) {
        __e67 = parseInt(__k30);
      } else {
        __e67 = __k30;
      }
      var __k31 = __e67;
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
setenv("target", {_stash: true, toplevel: true, value: either(has(setenv("target", {_stash: true, toplevel: true}), "value"), "js")});
setenv("target", {_stash: true, symbol: ["get-value", ["quote", "target"]]});
setenv("quote", {_stash: true, macro: function (form) {
  return quoted(form);
}});
setenv("quasiquote", {_stash: true, macro: function (form) {
  return quasiexpand(form, 1);
}});
setenv("set", {_stash: true, macro: function () {
  var __args3 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["do"], map(function (__x24) {
    var ____id6 = __x24;
    var __lh1 = has(____id6, 0);
    var __rh1 = has(____id6, 1);
    __lh1 = macroexpand(__lh1);
    if (! atom63(__lh1) && hd(__lh1) === "has") {
      return ["%set", join(["get"], tl(__lh1)), __rh1];
    } else {
      return ["%set", __lh1, __rh1];
    }
  }, pair(__args3)));
}});
setenv("at", {_stash: true, macro: function (l, i) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && number63(i)) {
    i = i + 1;
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      i = ["+", i, 1];
    }
  }
  return ["get", l, i];
}});
setenv("wipe", {_stash: true, macro: function (place) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    return ["set", place, "nil"];
  } else {
    return ["%delete", place];
  }
}});
setenv("list", {_stash: true, macro: function () {
  var __body2 = unstash(Array.prototype.slice.call(arguments, 0));
  if (_35(__body2) > 2 && __body2[1] === "for" && __body2[3] === "in") {
    var ____id10 = __body2;
    var __expr2 = has(____id10, 0);
    var __body3 = cut(____id10, 1);
    var __comps1 = [];
    var __cond1 = undefined;
    while (_35(__body3) > 2 && __body3[0] === "for" && __body3[2] === "in") {
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
      var __e68 = undefined;
      if (numeric63(__k34)) {
        __e68 = parseInt(__k34);
      } else {
        __e68 = __k34;
      }
      var __k35 = __e68;
      if (number63(__k35)) {
        __l10[__k35] = __v20;
      } else {
        add(__forms1, ["set", ["get", __x49, ["quote", __k35]], __v20]);
      }
    }
    if (some63(__forms1)) {
      return join(["let", __x49, ["object", join(["%array"], __l10)]], __forms1, [__x49]);
    } else {
      return join(["%array"], __l10);
    }
  }
}});
setenv("if", {_stash: true, macro: function () {
  var __branches1 = unstash(Array.prototype.slice.call(arguments, 0));
  return hd(expand_if(__branches1));
}});
setenv("case", {_stash: true, macro: function (expr) {
  var ____r105 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expr5 = destash33(expr, ____r105);
  var ____id15 = ____r105;
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
}});
setenv("when", {_stash: true, macro: function (cond) {
  var ____r109 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond3 = destash33(cond, ____r109);
  var ____id18 = ____r109;
  var __body5 = cut(____id18, 0);
  return ["if", __cond3, join(["do"], __body5)];
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var ____r111 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond5 = destash33(cond, ____r111);
  var ____id20 = ____r111;
  var __body7 = cut(____id20, 0);
  return ["if", ["not", __cond5], join(["do"], __body7)];
}});
setenv("obj", {_stash: true, macro: function () {
  var __body9 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%object"], mapo(function (x) {
    return x;
  }, __body9));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var ____r115 = unstash(Array.prototype.slice.call(arguments, 1));
  var __bs11 = destash33(bs, ____r115);
  var ____id25 = ____r115;
  var __body111 = cut(____id25, 0);
  if (atom63(__bs11)) {
    return join(["let", [__bs11, hd(__body111)]], tl(__body111));
  } else {
    if (none63(__bs11)) {
      return join(["do"], __body111);
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
      return ["do", ["%local", __id28, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body111)]];
    }
  }
}});
setenv("with", {_stash: true, macro: function (x, v) {
  var ____r117 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x115 = destash33(x, ____r117);
  var __v22 = destash33(v, ____r117);
  var ____id30 = ____r117;
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
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var ____r119 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x128 = destash33(x, ____r119);
  var __v24 = destash33(v, ____r119);
  var ____id32 = ____r119;
  var __body15 = cut(____id32, 0);
  var __y6 = unique("y");
  return ["let", __y6, __v24, ["when", ["yes", __y6], join(["let", [__x128, __y6]], __body15)]];
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var ____r121 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name1 = destash33(name, ____r121);
  var __args5 = destash33(args, ____r121);
  var ____id34 = ____r121;
  var __body17 = cut(____id34, 0);
  var ____x137 = object(["setenv", ["quote", __name1]]);
  ____x137.macro = join(["fn", __args5], __body17);
  var __form1 = ____x137;
  _eval(__form1);
  return __form1;
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var ____r123 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name3 = destash33(name, ____r123);
  var __args7 = destash33(args, ____r123);
  var ____id36 = ____r123;
  var __body19 = cut(____id36, 0);
  var ____x143 = object(["setenv", ["quote", __name3]]);
  ____x143.special = join(["fn", __args7], __body19);
  var __form3 = join(____x143, keys(__body19));
  _eval(__form3);
  return __form3;
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var ____x149 = object(["setenv", ["quote", name]]);
  ____x149.symbol = ["quote", expansion];
  return ____x149;
}});
setenv("define-reader", {_stash: true, macro: function (__x157) {
  var ____r127 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x157 = destash33(__x157, ____r127);
  var ____id39 = ____x157;
  var __char1 = has(____id39, 0);
  var __s2 = has(____id39, 1);
  var ____id40 = ____r127;
  var __body21 = cut(____id40, 0);
  return ["set", ["get", "read-table", __char1], join(["fn", [__s2]], __body21)];
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var ____r129 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name5 = destash33(name, ____r129);
  var __x165 = destash33(x, ____r129);
  var ____id42 = ____r129;
  var __body23 = cut(____id42, 0);
  setenv(__name5, {_stash: true, variable: true});
  if (some63(__body23)) {
    return join(["%local-function", __name5], bind42(__x165, __body23), keys(__body23));
  } else {
    return join(["%local", __name5, __x165], keys(__body23));
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var ____r131 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name7 = destash33(name, ____r131);
  var __x171 = destash33(x, ____r131);
  var ____id44 = ____r131;
  var __body25 = cut(____id44, 0);
  setenv(__name7, {_stash: true, toplevel: true, variable: true});
  if (some63(__body25)) {
    return join(["%global-function", __name7], bind42(__x171, __body25), keys(__body25));
  } else {
    return join(["set", __name7, __x171], keys(__body25));
  }
}});
setenv("get-value", {_stash: true, macro: function (x) {
  var ____x178 = object(["setenv", x]);
  ____x178.toplevel = true;
  return ["has", ____x178, ["quote", "value"]];
}});
setenv("define-constant", {_stash: true, macro: function (name, x) {
  var ____x189 = object(["setenv", ["quote", name]]);
  ____x189.toplevel = true;
  ____x189.value = either(x, ["get-value", ["quote", name]]);
  return ["do", ____x189, ["define-symbol", name, ["get-value", ["quote", name]]]];
}});
setenv("define-variable", {_stash: true, macro: function (name, x) {
  if (is63(x)) {
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]];
  } else {
    return ["define-constant", name];
  }
}});
setenv("after", {_stash: true, macro: function (x) {
  var ____r140 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x212 = destash33(x, ____r140);
  var ____id46 = ____r140;
  var __body27 = cut(____id46, 0);
  var __r141 = unique("r");
  return ["with", __r141, "nil", ["%block", "try", "||", ["set", __r141, __x212]], ["%block", "finally", "||", join(["do"], __body27)]];
}});
setenv("with-frame", {_stash: true, macro: function () {
  var __body29 = unstash(Array.prototype.slice.call(arguments, 0));
  var __x228 = unique("x");
  var __forms3 = [];
  var ____o20 = __body29;
  var __k38 = undefined;
  for (__k38 in ____o20) {
    var __v26 = ____o20[__k38];
    var __e69 = undefined;
    if (numeric63(__k38)) {
      __e69 = parseInt(__k38);
    } else {
      __e69 = __k38;
    }
    var __k39 = __e69;
    if (! number63(__k39)) {
      var ____x232 = object(["setenv", ["quote", __k39]]);
      ____x232.value = __v26;
      add(__forms3, ____x232);
    }
  }
  return join(["do", ["add", "environment", ["obj"]]], __forms3, [["with", __x228, join(["do"], __body29), ["drop", "environment"]]]);
}});
setenv("with-bindings", {_stash: true, macro: function (__x243) {
  var ____r143 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x243 = destash33(__x243, ____r143);
  var ____id49 = ____x243;
  var __names3 = has(____id49, 0);
  var ____id50 = ____r143;
  var __body31 = cut(____id50, 0);
  var __x244 = unique("x");
  var ____x247 = object(["setenv", __x244]);
  ____x247.variable = true;
  return join(["with-frame", ["each", __x244, __names3, ____x247]], __body31);
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var ____r146 = unstash(Array.prototype.slice.call(arguments, 1));
  var __definitions1 = destash33(definitions, ____r146);
  var ____id52 = ____r146;
  var __body33 = cut(____id52, 0);
  add(environment, {});
  map(function (m) {
    return macroexpand(join(["define-macro"], m));
  }, __definitions1);
  var ____x251 = join(["do"], macroexpand(__body33));
  drop(environment);
  return ____x251;
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var ____r150 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expansions1 = destash33(expansions, ____r150);
  var ____id55 = ____r150;
  var __body35 = cut(____id55, 0);
  add(environment, {});
  map(function (__x259) {
    var ____id56 = __x259;
    var __name9 = has(____id56, 0);
    var __exp1 = has(____id56, 1);
    return macroexpand(["define-symbol", __name9, __exp1]);
  }, pair(__expansions1));
  var ____x258 = join(["do"], macroexpand(__body35));
  drop(environment);
  return ____x258;
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var ____r154 = unstash(Array.prototype.slice.call(arguments, 1));
  var __names5 = destash33(names, ____r154);
  var ____id58 = ____r154;
  var __body37 = cut(____id58, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names5);
  return join(["let", apply(join, __bs3)], __body37);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var ____r157 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args9 = destash33(args, ____r157);
  var ____id60 = ____r157;
  var __body39 = cut(____id60, 0);
  return join(["%function"], bind42(__args9, __body39), keys(__body39));
}});
setenv("apply", {_stash: true, macro: function (f) {
  var ____r159 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f3 = destash33(f, ____r159);
  var ____id62 = ____r159;
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
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  } else {
    var ____x322 = object(["obj"]);
    ____x322.stack = [["idx", "debug", "traceback"]];
    ____x322.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x322]]]];
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var ____r163 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x349 = destash33(x, ____r163);
  var __t3 = destash33(t, ____r163);
  var ____id65 = ____r163;
  var __body41 = cut(____id65, 0);
  var __o22 = unique("o");
  var __n30 = unique("n");
  var __i36 = unique("i");
  var __e70 = undefined;
  if (atom63(__x349)) {
    __e70 = [__i36, __x349];
  } else {
    var __e71 = undefined;
    if (_35(__x349) > 1) {
      __e71 = __x349;
    } else {
      __e71 = [__i36, hd(__x349)];
    }
    __e70 = __e71;
  }
  var ____id66 = __e70;
  var __k41 = has(____id66, 0);
  var __v28 = has(____id66, 1);
  var ____x355 = object(["target", __o22]);
  ____x355.py = ["indices", __o22];
  var __e72 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e72 = __body41;
  } else {
    __e72 = [join(["let", __k41, ["if", ["numeric?", __k41], ["parseInt", __k41], __k41]], __body41)];
  }
  return ["let", [__o22, __t3, __k41, "nil"], join(["%for", ____x355, __k41], keys(__body41), [join(["let", [__v28, ["get", __o22, __k41]]], __e72)])];
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var ____r165 = unstash(Array.prototype.slice.call(arguments, 2));
  var __i38 = destash33(i, ____r165);
  var __to1 = destash33(to, ____r165);
  var ____id68 = ____r165;
  var __body43 = cut(____id68, 0);
  if (__to1 === "in") {
    return join(["%for", hd(__body43), __i38, join(["do"], tl(__body43))], keys(__body43));
  } else {
    return ["let", __i38, 0, join(["while", ["<", __i38, __to1]], __body43, [["inc", __i38]])];
  }
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var ____r167 = unstash(Array.prototype.slice.call(arguments, 2));
  var __v30 = destash33(v, ____r167);
  var __t5 = destash33(t, ____r167);
  var ____id70 = ____r167;
  var __body45 = cut(____id70, 0);
  var __x388 = unique("x");
  var __i40 = unique("i");
  return ["let", [__x388, __t5], ["for", __i40, ["#", __x388], join(["let", [__v30, ["at", __x388, __i40]]], __body45)]];
}});
setenv("set-of", {_stash: true, macro: function () {
  var __xs13 = unstash(Array.prototype.slice.call(arguments, 0));
  var __l121 = [];
  var ____o24 = __xs13;
  var ____i42 = undefined;
  for (____i42 in ____o24) {
    var __x398 = ____o24[____i42];
    var __e73 = undefined;
    if (numeric63(____i42)) {
      __e73 = parseInt(____i42);
    } else {
      __e73 = ____i42;
    }
    var ____i421 = __e73;
    __l121[__x398] = true;
  }
  return join(["obj"], __l121);
}});
setenv("target?", {_stash: true, macro: function (x) {
  return ["=", "target", x];
}});
setenv("target", {_stash: true, macro: function () {
  var __clauses3 = unstash(Array.prototype.slice.call(arguments, 0));
  if (has63(__clauses3, has(setenv("target", {_stash: true, toplevel: true}), "value"))) {
    return __clauses3[has(setenv("target", {_stash: true, toplevel: true}), "value")];
  } else {
    return hd(__clauses3);
  }
}});
setenv("language", {_stash: true, macro: function () {
  return ["quote", has(setenv("target", {_stash: true, toplevel: true}), "value")];
}});
setenv("join!", {_stash: true, macro: function (a) {
  var ____r173 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a6 = destash33(a, ____r173);
  var ____id72 = ____r173;
  var __bs5 = cut(____id72, 0);
  return ["set", __a6, join(["join", __a6], __bs5)];
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var ____r175 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a8 = destash33(a, ____r175);
  var ____id74 = ____r175;
  var __bs7 = cut(____id74, 0);
  return ["set", __a8, join(["cat", __a8], __bs7)];
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  var __e74 = undefined;
  if (nil63(by)) {
    __e74 = 1;
  } else {
    __e74 = by;
  }
  return ["set", n, ["+", n, __e74]];
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  var __e75 = undefined;
  if (nil63(by)) {
    __e75 = 1;
  } else {
    __e75 = by;
  }
  return ["set", n, ["-", n, __e75]];
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var __x425 = unique("x");
  return ["do", ["inc", "indent-level"], ["with", __x425, form, ["dec", "indent-level"]]];
}});
setenv("export", {_stash: true, macro: function () {
  var __names7 = unstash(Array.prototype.slice.call(arguments, 0));
  var __forms5 = map(function (k) {
    if (k === compile(k)) {
      return ["set", ["idx", "exports", k], k];
    } else {
      return ["set", ["get", "exports", ["quote", k]], k, ["idx", "exports", k], k];
    }
  }, __names7);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return join(["do"], __forms5);
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]]);
    }
  }
}});
setenv("when-compiling", {_stash: true, macro: function () {
  var __body47 = unstash(Array.prototype.slice.call(arguments, 0));
  return _eval(join(["do"], __body47));
}});
setenv("during-compilation", {_stash: true, macro: function () {
  var __body49 = unstash(Array.prototype.slice.call(arguments, 0));
  var __form5 = join(["do"], __body49);
  _eval(__form5);
  return __form5;
}});
setenv("def", {_stash: true, macro: function (name) {
  var ____r185 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name11 = destash33(name, ____r185);
  var ____id76 = ____r185;
  var __body51 = cut(____id76, 0);
  return join(["define-global", __name11], __body51);
}});
setenv("mac", {_stash: true, macro: function (name) {
  var ____r187 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name13 = destash33(name, ____r187);
  var ____id78 = ____r187;
  var __body53 = cut(____id78, 0);
  return join(["define-macro", __name13], __body53);
}});
setenv("defconst", {_stash: true, macro: function (name) {
  var ____r189 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name15 = destash33(name, ____r189);
  var ____id80 = ____r189;
  var __value1 = cut(____id80, 0);
  return join(["def", __name15], __value1);
}});
setenv("undefined?", {_stash: true, macro: function (name) {
  var ____x473 = object(["target"]);
  ____x473.js = ["=", ["typeof", name], "\"undefined\""];
  ____x473.lua = ["=", ["idx", "_G", name], "nil"];
  ____x473.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x473;
}});
setenv("defvar", {_stash: true, macro: function (name) {
  var ____r193 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name17 = destash33(name, ____r193);
  var ____id82 = ____r193;
  var __value3 = cut(____id82, 0);
  var ____x489 = object(["target"]);
  ____x489.py = ["global", __name17];
  return ["when", ["undefined?", __name17], ____x489, join(["defconst", __name17], __value3)];
}});
setenv("+", {_stash: true, macro: function () {
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
}});
setenv("-", {_stash: true, macro: function () {
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
}});
setenv("*", {_stash: true, macro: function () {
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
}});
setenv("/", {_stash: true, macro: function () {
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
}});
setenv("async", {_stash: true, macro: function (keyword) {
  var ____r195 = unstash(Array.prototype.slice.call(arguments, 1));
  var __keyword1 = destash33(keyword, ____r195);
  var ____id84 = ____r195;
  var __body55 = cut(____id84, 0);
  var ____x503 = object([__keyword1]);
  ____x503.async = true;
  return join(____x503, __body55);
}});
setenv("%read-from-file", {_stash: true, macro: function (name) {
  return ["when-compiling", ["quasiquote", ["do", ["unquote-splicing", ["read-from-file", name]]]]];
}});
setenv("the", {_stash: true, macro: function (name) {
  return ["getenv", ["quote", name], ["quote", "value"]];
}});
var __exports = {};
var __module = {exports: __exports};
var delimiters = {"(": true, ")": true, ";": true, ",": true, "\r": true, "\n": true};
var whitespace = {" ": true, "\t": true, "\r": true, "\n": true};
var stream = function (_str, more) {
  return {pos: 0, string: _str, len: _35(_str), more: more};
};
var peek_char = function (s) {
  var ____id85 = s;
  var __pos = has(____id85, "pos");
  var __len = has(____id85, "len");
  var __string = has(____id85, "string");
  if (__pos < __len) {
    return char(__string, __pos);
  }
};
var read_char = function (s) {
  var __c2 = peek_char(s);
  if (__c2) {
    s.pos = s.pos + 1;
    return __c2;
  }
};
var skip_non_code = function (s) {
  while (true) {
    var __c3 = peek_char(s);
    if (nil63(__c3)) {
      break;
    } else {
      if (has63(whitespace, __c3)) {
        read_char(s);
      } else {
        if (__c3 === ";") {
          while (__c3 && !( __c3 === "\n")) {
            __c3 = read_char(s);
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
  var __c4 = peek_char(s);
  if (is63(__c4)) {
    return (has(read_table, __c4) || has(read_table, ""))(s);
  } else {
    return eof;
  }
};
var read = function (s) {
  var __form6 = read_1(s);
  if ("," === peek_char(s)) {
    var __r206 = [",", __form6];
    while (true) {
      read_char(s);
      __form6 = read_1(s);
      if (__form6 === eof) {
        return expected(s, "tuple");
      }
      add(__r206, __form6);
      if (!( "," === peek_char(s))) {
        break;
      }
    }
    return __r206;
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
  var __x522 = read(stream(_str, more));
  if (!( __x522 === eof)) {
    return __x522;
  }
};
var key63 = function (atom) {
  return string63(atom) && _35(atom) > 1 && char(atom, edge(atom)) === ":";
};
var flag63 = function (atom) {
  return string63(atom) && _35(atom) > 1 && char(atom, 0) === ":";
};
var expected = function (s, c) {
  if (is63(s.more)) {
    return s.more;
  } else {
    throw new Error("Expected " + c + " at " + s.pos);
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
  var __e76 = undefined;
  if (code(_str, 0) === 45) {
    __e76 = 1;
  } else {
    __e76 = 0;
  }
  var __i43 = __e76;
  var __id143 = code(_str, __i43) === 48;
  var __e77 = undefined;
  if (__id143) {
    __i43 = __i43 + 1;
    var __n33 = code(_str, __i43);
    __e77 = __n33 === 120 || __n33 === 88;
  } else {
    __e77 = __id143;
  }
  return __e77;
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
  return number63(x) && ! nan63(x) && ! inf63(x);
};
read_table[""] = function (s) {
  var ___str = "";
  while (true) {
    var __c5 = peek_char(s);
    if (__c5 && (! has63(whitespace, __c5) && ! has63(delimiters, __c5))) {
      ___str = ___str + read_char(s);
    } else {
      break;
    }
  }
  if (___str === "true") {
    return true;
  } else {
    if (___str === "false") {
      return false;
    } else {
      var __n34 = maybe_number(___str);
      if (real63(__n34)) {
        return __n34;
      } else {
        return ___str;
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var __r218 = undefined;
  var __l14 = [];
  while (nil63(__r218)) {
    skip_non_code(s);
    var __c6 = peek_char(s);
    if (__c6 === ")") {
      read_char(s);
      __r218 = __l14;
    } else {
      if (nil63(__c6)) {
        __r218 = expected(s, ")");
      } else {
        var __x524 = read(s);
        if (key63(__x524)) {
          var __k42 = clip(__x524, 0, edge(__x524));
          var __v31 = read(s);
          __l14 = object(__l14);
          __l14[__k42] = __v31;
        } else {
          if (flag63(__x524)) {
            __l14 = object(__l14);
            __l14[clip(__x524, 1)] = true;
          } else {
            add(__l14, __x524);
          }
        }
      }
    }
  }
  return __r218;
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
read_table["\""] = function (s) {
  var __i44 = s.pos;
  var __j1 = search(s.string, "\"", __i44 + 1);
  var __b5 = either(search(s.string, "\\", __i44 + 1), __j1);
  if (is63(__j1) && __j1 < s.len && __b5 >= __j1) {
    s.pos = __j1 + 1;
    return clip(s.string, __i44, __j1 + 1);
  } else {
    var __r221 = undefined;
    read_char(s);
    while (nil63(__r221)) {
      var __c7 = peek_char(s);
      if (__c7 === "\"") {
        read_char(s);
        __r221 = clip(s.string, __i44, s.pos);
      } else {
        if (nil63(__c7)) {
          __r221 = expected(s, "\"");
        } else {
          if (__c7 === "\\") {
            read_char(s);
          }
          read_char(s);
        }
      }
    }
    return __r221;
  }
};
read_table["|"] = function (s) {
  var __i45 = s.pos;
  var __j2 = search(s.string, "|", __i45 + 1);
  if (is63(__j2) && __j2 < s.len) {
    s.pos = __j2 + 1;
    return clip(s.string, __i45, __j2 + 1);
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
  var __c8 = peek_char(s);
  if (nil63(__c8) || has63(whitespace, __c8)) {
    return ",";
  } else {
    if (__c8 === "@") {
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
    var __i46 = edge(environment);
    while (__i46 >= 0) {
      if (has63(environment[__i46], k)) {
        var __b6 = environment[__i46][k];
        var __e78 = undefined;
        if (p) {
          __e78 = has(__b6, p);
        } else {
          __e78 = __b6;
        }
        return __e78;
      } else {
        __i46 = __i46 - 1;
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
      var __l15 = array(args);
      var ____o25 = args;
      var __k43 = undefined;
      for (__k43 in ____o25) {
        var __v32 = ____o25[__k43];
        var __e80 = undefined;
        if (numeric63(__k43)) {
          __e80 = parseInt(__k43);
        } else {
          __e80 = __k43;
        }
        var __k44 = __e80;
        if (! number63(__k44)) {
          add(__l15, ["%literal", "|" + __k44 + "=|", __v32]);
        }
      }
      return __l15;
    } else {
      var __l16 = ["%object", "\"_stash\"", true];
      var ____o26 = args;
      var __k45 = undefined;
      for (__k45 in ____o26) {
        var __v33 = ____o26[__k45];
        var __e79 = undefined;
        if (numeric63(__k45)) {
          __e79 = parseInt(__k45);
        } else {
          __e79 = __k45;
        }
        var __k46 = __e79;
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
    if (hd(lh) === "t") {
      var ____id86 = lh;
      var ___ = has(____id86, 0);
      var ___var = has(____id86, 1);
      var __val2 = has(____id86, 2);
      return bind(["o", ___var, ["the", __val2]], rh);
    } else {
      if (hd(lh) === "o") {
        var ____id87 = lh;
        var ___1 = has(____id87, 0);
        var ___var1 = has(____id87, 1);
        var __val3 = has(____id87, 2);
        return [___var1, ["if", ["nil?", rh], __val3, rh]];
      } else {
        var __id88 = unique("id");
        var __bs8 = [__id88, rh];
        var ____o27 = lh;
        var __k47 = undefined;
        for (__k47 in ____o27) {
          var __v34 = ____o27[__k47];
          var __e81 = undefined;
          if (numeric63(__k47)) {
            __e81 = parseInt(__k47);
          } else {
            __e81 = __k47;
          }
          var __k48 = __e81;
          var __e82 = undefined;
          if (__k48 === "rest") {
            __e82 = ["cut", __id88, _35(lh)];
          } else {
            __e82 = ["has", __id88, ["quote", bias(__k48)]];
          }
          var __x537 = __e82;
          if (is63(__k48)) {
            var __e83 = undefined;
            if (__v34 === true) {
              __e83 = __k48;
            } else {
              __e83 = __v34;
            }
            var __k49 = __e83;
            __bs8 = join(__bs8, bind(__k49, __x537));
          }
        }
        return __bs8;
      }
    }
  }
};
setenv("arguments%", {_stash: true, macro: function (_from) {
  var ____x548 = object(["target"]);
  ____x548.js = [["idx", ["idx", ["idx", "Array", "prototype"], "slice"], "call"], "arguments", _from];
  ____x548.py = ["|list|", "|_args|"];
  ____x548.lua = ["list", "|...|"];
  return ____x548;
}});
bind42 = function (args, body) {
  var __args131 = {};
  var rest = function () {
    __args131.rest = true;
    var ____x557 = object(["target"]);
    ____x557.py = "|_keys|";
    return ["unstash", ["arguments%", _35(__args131)], ____x557];
  };
  if (atom63(args)) {
    return [__args131, join(["let", [args, rest()]], body)];
  } else {
    var __pre = [];
    var __bs9 = [];
    var __inits = [];
    var __r245 = unique("r");
    var ____o28 = args;
    var __k50 = undefined;
    for (__k50 in ____o28) {
      var __v35 = ____o28[__k50];
      var __e84 = undefined;
      if (numeric63(__k50)) {
        __e84 = parseInt(__k50);
      } else {
        __e84 = __k50;
      }
      var __k51 = __e84;
      if (number63(__k51)) {
        if (atom63(__v35)) {
          add(__args131, __v35);
        } else {
          if (hd(__v35) === "o") {
            var ____id89 = __v35;
            var ___2 = has(____id89, 0);
            var ___var2 = has(____id89, 1);
            var __val4 = has(____id89, 2);
            add(__args131, ___var2);
            add(__inits, ["if", ["nil?", ___var2], ["%set", ___var2, __val4]]);
          } else {
            if (hd(__v35) === "t") {
              var ____id90 = __v35;
              var ___3 = has(____id90, 0);
              var ___var3 = has(____id90, 1);
              var __val5 = has(____id90, 2);
              add(__args131, ___var3);
              add(__inits, ["if", ["nil?", ___var3], ["%set", ___var3, ["the", __val5]]]);
            } else {
              var __x568 = unique("x");
              add(__args131, __x568);
              __bs9 = join(__bs9, [__v35, __x568]);
            }
          }
        }
      }
    }
    if (keys63(args)) {
      __pre = join(__pre, [__r245, rest()]);
      var __n39 = _35(__args131);
      var __i51 = 0;
      while (__i51 < __n39) {
        var __v36 = __args131[__i51];
        __pre = join(__pre, [__v36, ["destash!", __v36, __r245]]);
        __i51 = __i51 + 1;
      }
      __bs9 = join(__bs9, [keys(args), __r245]);
    }
    return [__args131, join(["let", __pre], __inits, [join(["let", __bs9], body)])];
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
var expand_local = function (__x578) {
  var ____id91 = __x578;
  var __x579 = has(____id91, 0);
  var __name18 = has(____id91, 1);
  var __value4 = has(____id91, 2);
  setenv(__name18, {_stash: true, variable: true});
  return ["%local", __name18, macroexpand(__value4)];
};
var expand_function = function (__x581) {
  var ____id92 = __x581;
  var __x582 = has(____id92, 0);
  var __args20 = has(____id92, 1);
  var __body56 = cut(____id92, 2);
  add(environment, {});
  var ____o29 = __args20;
  var ____i52 = undefined;
  for (____i52 in ____o29) {
    var ____x583 = ____o29[____i52];
    var __e85 = undefined;
    if (numeric63(____i52)) {
      __e85 = parseInt(____i52);
    } else {
      __e85 = ____i52;
    }
    var ____i521 = __e85;
    setenv(____x583, {_stash: true, variable: true});
  }
  var ____x584 = join(["%function", __args20], macroexpand(__body56));
  drop(environment);
  return ____x584;
};
var expand_definition = function (__x586) {
  var ____id93 = __x586;
  var __x587 = has(____id93, 0);
  var __name19 = has(____id93, 1);
  var __args21 = has(____id93, 2);
  var __body57 = cut(____id93, 3);
  add(environment, {});
  var ____o30 = __args21;
  var ____i53 = undefined;
  for (____i53 in ____o30) {
    var ____x588 = ____o30[____i53];
    var __e86 = undefined;
    if (numeric63(____i53)) {
      __e86 = parseInt(____i53);
    } else {
      __e86 = ____i53;
    }
    var ____i531 = __e86;
    setenv(____x588, {_stash: true, variable: true});
  }
  var ____x589 = join([__x587, __name19, __args21], macroexpand(__body57));
  drop(environment);
  return ____x589;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x591) {
  var ____id94 = __x591;
  var __name20 = has(____id94, 0);
  var __body58 = cut(____id94, 1);
  return apply(macro_function(__name20), __body58);
};
real63 = function (x) {
  return number63(x) && ! nan63(x) && ! inf63(x);
};
valid_access63 = function (_str) {
  return _35(_str) > 2 && !( "." === char(_str, 0)) && !( "." === char(_str, edge(_str))) && ! search(_str, "..");
};
parse_access = function (_str) {
  return reduce(function (a, b) {
    var __n42 = number(a);
    if (is63(__n42)) {
      return ["at", b, __n42];
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
        var __x594 = hd(form);
        if (__x594 === "%local") {
          return expand_local(form);
        } else {
          if (__x594 === "%function") {
            return expand_function(form);
          } else {
            if (__x594 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x594 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x594 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x594)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x594)) {
                      return macroexpand(join([parse_access(__x594)], tl(form)));
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
  var ____o31 = form;
  var __k52 = undefined;
  for (__k52 in ____o31) {
    var __v37 = ____o31[__k52];
    var __e87 = undefined;
    if (numeric63(__k52)) {
      __e87 = parseInt(__k52);
    } else {
      __e87 = __k52;
    }
    var __k53 = __e87;
    if (! number63(__k53)) {
      var __e88 = undefined;
      if (quasisplice63(__v37, depth)) {
        __e88 = quasiexpand(__v37[1]);
      } else {
        __e88 = quasiexpand(__v37, depth);
      }
      var __v38 = __e88;
      last(__xs14)[__k53] = __v38;
    }
  }
  var ____x598 = form;
  var ____i55 = 0;
  while (____i55 < _35(____x598)) {
    var __x599 = ____x598[____i55];
    if (quasisplice63(__x599, depth)) {
      var __x600 = quasiexpand(__x599[1]);
      add(__xs14, __x600);
      add(__xs14, ["list"]);
    } else {
      add(last(__xs14), quasiexpand(__x599, depth));
    }
    ____i55 = ____i55 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || !( hd(x) === "list") || keys63(x);
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
expand_if = function (__x604) {
  var ____id95 = __x604;
  var __a9 = has(____id95, 0);
  var __b7 = has(____id95, 1);
  var __c9 = cut(____id95, 2);
  if (is63(__b7)) {
    return [join(["%if", __a9, __b7], expand_if(__c9))];
  } else {
    if (is63(__a9)) {
      return [__a9];
    }
  }
};
setenv("indent-level", {_stash: true, toplevel: true, value: 0});
setenv("indent-level", {_stash: true, symbol: ["get-value", ["quote", "indent-level"]]});
indentation = function () {
  var __s3 = "";
  var __i56 = 0;
  while (__i56 < has(setenv("indent-level", {_stash: true, toplevel: true}), "value")) {
    __s3 = __s3 + "  ";
    __i56 = __i56 + 1;
  }
  return __s3;
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
    var __e89 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e89 = "L_";
    } else {
      __e89 = "_";
    }
    var __x610 = __e89;
    var __e90 = undefined;
    if (number_code63(code(id, 0))) {
      __e90 = __x610;
    } else {
      __e90 = "";
    }
    var __id131 = __e90;
    var __i57 = 0;
    while (__i57 < _35(id)) {
      var __c10 = char(id, __i57);
      var __n44 = code(__c10);
      var __e91 = undefined;
      if (__c10 === "-" && !( id === "-")) {
        var __e94 = undefined;
        if (__i57 === 0) {
          __e94 = __x610;
        } else {
          __e94 = "_";
        }
        __e91 = __e94;
      } else {
        var __e92 = undefined;
        if (valid_code63(__n44)) {
          __e92 = __c10;
        } else {
          var __e93 = undefined;
          if (__i57 === 0) {
            __e93 = __x610 + __n44;
          } else {
            __e93 = __n44;
          }
          __e92 = __e93;
        }
        __e91 = __e92;
      }
      var __c12 = __e91;
      __id131 = __id131 + __c12;
      __i57 = __i57 + 1;
    }
    if (raw63) {
      return __id131;
    } else {
      if (reserved63(__id131)) {
        return __x610 + __id131;
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
  var __x611 = compile_id(x);
  if (has63(__names8, __x611)) {
    var __i58 = __names8[__x611];
    __names8[__x611] = __names8[__x611] + 1;
    return unique(__x611 + __i58);
  } else {
    __names8[__x611] = 1;
    return "__" + __x611;
  }
};
key = function (k) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return k;
  } else {
    var __i59 = inner(k);
    if (valid_id63(__i59)) {
      return __i59;
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
  var __o32 = [];
  var ____o33 = t;
  var __k54 = undefined;
  for (__k54 in ____o33) {
    var __v39 = ____o33[__k54];
    var __e95 = undefined;
    if (numeric63(__k54)) {
      __e95 = parseInt(__k54);
    } else {
      __e95 = __k54;
    }
    var __k55 = __e95;
    var __x612 = f(__v39);
    if (is63(__x612)) {
      add(__o32, literal(__k55));
      add(__o32, __x612);
    }
  }
  return __o32;
};
var ____x614 = object([]);
var ____x615 = object([]);
____x615.js = "!";
____x615.lua = "not";
____x615.py = "not";
____x614["not"] = ____x615;
var ____x616 = object([]);
____x616.js = "!";
____x616.lua = "not";
____x616.py = "not";
____x614["%not"] = ____x616;
____x614["%unm"] = "-";
var ____x617 = object([]);
____x617["*"] = true;
____x617["/"] = true;
____x617["%"] = true;
____x617["%mul"] = "*";
____x617["%div"] = "/";
____x617["%mod"] = "%";
var ____x618 = object([]);
var ____x619 = object([]);
____x619.js = "+";
____x619.lua = "..";
____x618.cat = ____x619;
var ____x620 = object([]);
____x620.js = "+";
____x620.lua = "..";
____x618["%cat"] = ____x620;
var ____x621 = object([]);
____x621["+"] = true;
____x621["-"] = true;
____x621["%add"] = "+";
____x621["%sub"] = "-";
var ____x622 = object([]);
____x622["<"] = true;
____x622[">"] = true;
____x622["<="] = true;
____x622[">="] = true;
____x622["%lt"] = "<";
____x622["%gt"] = ">";
____x622["%le"] = "<=";
____x622["%ge"] = ">=";
var ____x623 = object([]);
var ____x624 = object([]);
____x624.js = "===";
____x624.lua = "==";
____x624.py = "==";
____x623["="] = ____x624;
var ____x625 = object([]);
____x625.js = "===";
____x625.lua = "==";
____x625.py = "==";
____x623["%eq"] = ____x625;
var ____x626 = object([]);
var ____x627 = object([]);
____x627.js = "&&";
____x627.lua = "and";
____x627.py = "and";
____x626["and"] = ____x627;
var ____x628 = object([]);
____x628.js = "&&";
____x628.lua = "and";
____x628.py = "and";
____x626["%and"] = ____x628;
var ____x629 = object([]);
var ____x630 = object([]);
____x630.js = "||";
____x630.lua = "or";
____x630.py = "or";
____x629["or"] = ____x630;
var ____x631 = object([]);
____x631.js = "||";
____x631.lua = "or";
____x631.py = "or";
____x629["%or"] = ____x631;
var infix = [____x614, ____x617, ____x618, ____x621, ____x622, ____x623, ____x626, ____x629];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["not", "-", "%not", "%unm"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var ____o34 = infix;
    var __k56 = undefined;
    for (__k56 in ____o34) {
      var __v40 = ____o34[__k56];
      var __e96 = undefined;
      if (numeric63(__k56)) {
        __e96 = parseInt(__k56);
      } else {
        __e96 = __k56;
      }
      var __k57 = __e96;
      if (has63(__v40, hd(form))) {
        return index(__k57);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x633 = has(level, op);
    if (__x633 === true) {
      return op;
    } else {
      if (string63(__x633)) {
        return __x633;
      } else {
        if (is63(__x633)) {
          return has(__x633, has(setenv("target", {_stash: true, toplevel: true}), "value"));
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
  var __c111 = "";
  var ____x634 = args;
  var ____i62 = 0;
  while (____i62 < _35(____x634)) {
    var __x635 = ____x634[____i62];
    __s4 = __s4 + __c111 + compile(__x635);
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && default63 && ! id_literal63(__x635)) {
      __s4 = __s4 + "=None";
    }
    __c111 = ", ";
    ____i62 = ____i62 + 1;
  }
  return __s4 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s12 = "";
    var __i63 = 0;
    while (__i63 < _35(s)) {
      var __c121 = char(s, __i63);
      var __e97 = undefined;
      if (__c121 === "\n") {
        __e97 = "\\n";
      } else {
        var __e98 = undefined;
        if (__c121 === "\r") {
          __e98 = "\\r";
        } else {
          __e98 = __c121;
        }
        __e97 = __e98;
      }
      __s12 = __s12 + __e97;
      __i63 = __i63 + 1;
    }
    return __s12;
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
  var ____id96 = form;
  var __x636 = has(____id96, 0);
  var __args22 = cut(____id96, 1);
  var ____id97 = getenv(__x636);
  var __special = has(____id97, "special");
  var __stmt = has(____id97, "stmt");
  var __self_tr63 = has(____id97, "tr");
  var __e99 = undefined;
  if (stmt63 && ! __stmt) {
    __e99 = indentation();
  } else {
    __e99 = "";
  }
  var __p1 = __e99;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p1 + apply(__special, __args22) + __tr;
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
var method_call63 = function (form) {
  var __e100 = undefined;
  if (list63(form)) {
    __e100 = hd(form);
  } else {
    __e100 = form;
  }
  var __x637 = __e100;
  return string63(__x637) && _35(__x637, 1) > 1 && char(__x637, 0) === ".";
};
var compile_call = function (form) {
  var __f4 = hd(form);
  var __f11 = compile(__f4);
  var __args23 = stash42(tl(form));
  var __e101 = undefined;
  if (method_call63(hd(__args23))) {
    __e101 = mapcat(compile, __args23, "");
  } else {
    __e101 = compile_args(__args23);
  }
  var __args24 = __e101;
  if (parenthesize_call63(__f4)) {
    return "(" + __f11 + ")" + __args24;
  } else {
    return __f11 + __args24;
  }
};
var op_delims = function (parent, child) {
  var ____r291 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r291);
  var __child = destash33(child, ____r291);
  var ____id98 = ____r291;
  var __right = has(____id98, "right");
  var __e102 = undefined;
  if (__right) {
    __e102 = _6261;
  } else {
    __e102 = _62;
  }
  if (__e102(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id99 = form;
  var __op = has(____id99, 0);
  var ____id100 = cut(____id99, 1);
  var __a10 = has(____id100, 0);
  var __b8 = has(____id100, 1);
  var ____id101 = op_delims(form, __a10);
  var __ao = has(____id101, 0);
  var __ac = has(____id101, 1);
  var ____id102 = op_delims(form, __b8, {_stash: true, right: true});
  var __bo = has(____id102, 0);
  var __bc = has(____id102, 1);
  var __a11 = compile(__a10);
  var __b9 = compile(__b8);
  var __op1 = getop(__op);
  if (unary63(form)) {
    return __op1 + __ao + " " + __a11 + __ac;
  } else {
    return __ao + __a11 + __ac + " " + __op1 + " " + __bo + __b9 + __bc;
  }
};
compile_body = function (body) {
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
  var ____x640 = compile(body, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __s5 = ____x640;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && none63(__s5)) {
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
    var ____x641 = indentation() + "pass\n";
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
    return ____x641;
  } else {
    return __s5;
  }
};
compile_function = function (args, body) {
  var ____r294 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args25 = destash33(args, ____r294);
  var __body59 = destash33(body, ____r294);
  var ____id103 = ____r294;
  var __name21 = has(____id103, "name");
  var __prefix = has(____id103, "prefix");
  var __async = has(____id103, "async");
  var __e103 = undefined;
  if (__name21) {
    __e103 = compile(__name21);
  } else {
    __e103 = "";
  }
  var __id104 = __e103;
  var __e104 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && has63(__args25, "rest")) {
    __e104 = join(__args25, ["|...|"]);
  } else {
    var __e105 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && has63(__args25, "rest")) {
      __e105 = join(__args25, ["|*_args|", "|**_keys|"]);
    } else {
      __e105 = __args25;
    }
    __e104 = __e105;
  }
  var __args141 = __e104;
  var __args26 = compile_args(__args141, true);
  var __body60 = compile_body(__body59);
  var __ind = indentation();
  var __e106 = undefined;
  if (__prefix) {
    __e106 = __prefix + " ";
  } else {
    __e106 = "";
  }
  var __p2 = __e106;
  var __e107 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e107 = "";
  } else {
    __e107 = "end";
  }
  var __tr1 = __e107;
  var __e108 = undefined;
  if (__async && !( has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua")) {
    __e108 = "async ";
  } else {
    __e108 = "";
  }
  var __a12 = __e108;
  if (__name21) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __a12 + "function " + __id104 + __args26 + " {\n" + __body60 + __ind + "}" + __tr1;
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __a12 + "def " + __id104 + __args26 + ":\n" + __body60;
    } else {
      return __p2 + "function " + __id104 + __args26 + "\n" + __body60 + __ind + __tr1;
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
};
compile = function (form) {
  var ____r296 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form8 = destash33(form, ____r296);
  var ____id105 = ____r296;
  var __stmt1 = has(____id105, "stmt");
  if (nil63(__form8)) {
    return "";
  } else {
    if (special_form63(__form8)) {
      return compile_special(__form8, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e109 = undefined;
      if (__stmt1) {
        __e109 = indentation();
      } else {
        __e109 = "";
      }
      var __ind1 = __e109;
      var __e110 = undefined;
      if (atom63(__form8)) {
        __e110 = compile_atom(__form8);
      } else {
        var __e111 = undefined;
        if (infix63(hd(__form8))) {
          __e111 = compile_infix(__form8);
        } else {
          __e111 = compile_call(__form8);
        }
        __e110 = __e111;
      }
      var __form9 = __e110;
      return __ind1 + __form9 + __tr2;
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e8 = lower(form, __hoist, true, tail63);
  var __e112 = undefined;
  if (some63(__hoist) && is63(__e8)) {
    __e112 = join(["do"], __hoist, [__e8]);
  } else {
    var __e113 = undefined;
    if (is63(__e8)) {
      __e113 = __e8;
    } else {
      var __e114 = undefined;
      if (_35(__hoist) > 1) {
        __e114 = join(["do"], __hoist);
      } else {
        __e114 = hd(__hoist);
      }
      __e113 = __e114;
    }
    __e112 = __e113;
  }
  return either(__e112, ["do"]);
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
  var ____x649 = almost(args);
  var ____i64 = 0;
  while (____i64 < _35(____x649)) {
    var __x650 = ____x649[____i64];
    var ____y8 = lower(__x650, hoist, stmt63);
    if (yes(____y8)) {
      var __e9 = ____y8;
      if (standalone63(__e9)) {
        add(hoist, __e9);
      }
    }
    ____i64 = ____i64 + 1;
  }
  var __e10 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e10)) {
    return ["return", __e10];
  } else {
    return __e10;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id106 = args;
  var __lh4 = has(____id106, 0);
  var __rh4 = has(____id106, 1);
  var __lh11 = lower(__lh4, hoist);
  var __rh11 = lower(__rh4, hoist);
  add(hoist, ["%set", __lh11, __rh11]);
  if (!( stmt63 && ! tail63)) {
    return __lh11;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id107 = args;
  var __cond6 = has(____id107, 0);
  var ___then = has(____id107, 1);
  var ___else = has(____id107, 2);
  if (stmt63) {
    var __e116 = undefined;
    if (is63(___else)) {
      __e116 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond6, hoist), lower_body([___then], tail63)], __e116));
  } else {
    var __e11 = unique("e");
    add(hoist, ["%local", __e11, "nil"]);
    var __e115 = undefined;
    if (is63(___else)) {
      __e115 = [lower(["%set", __e11, ___else])];
    }
    add(hoist, join(["%if", lower(__cond6, hoist), lower(["%set", __e11, ___then])], __e115));
    return __e11;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id108 = args;
  var __a13 = has(____id108, 0);
  var __b10 = has(____id108, 1);
  var __hoist1 = [];
  var __b11 = lower(__b10, __hoist1);
  if (some63(__hoist1)) {
    var __id109 = unique("id");
    var __e117 = undefined;
    if (x === "and") {
      __e117 = ["%if", __id109, __b10, __id109];
    } else {
      __e117 = ["%if", __id109, __id109, __b10];
    }
    return lower(["do", ["%local", __id109, __a13], __e117], hoist);
  } else {
    return [x, lower(__a13, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id110 = args;
  var __c13 = has(____id110, 0);
  var __body61 = cut(____id110, 1);
  var __pre1 = [];
  var __c14 = lower(__c13, __pre1);
  var __e118 = undefined;
  if (none63(__pre1)) {
    __e118 = ["while", __c14, lower_body(__body61)];
  } else {
    __e118 = ["while", true, join(["do"], __pre1, [["%if", ["not", __c14], ["break"]], lower_body(__body61)])];
  }
  return add(hoist, __e118);
};
var lower_for = function (args, hoist) {
  var ____id1111 = args;
  var __h = has(____id1111, 0);
  var __k58 = has(____id1111, 1);
  var __body62 = cut(____id1111, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k58, lower_body(__body62)], keys(__body62)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id112 = args;
  var __h1 = has(____id112, 0);
  var __body63 = cut(____id112, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body63, tail63)], keys(__body63)));
  } else {
    var __e12 = unique("e");
    add(hoist, ["%local", __e12]);
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e12, join(["do"], __body63)])], keys(__body63)));
    return __e12;
  }
};
var lower_block = function (args, hoist, stmt63, tail63) {
  var ____id113 = args;
  var __name22 = has(____id113, 0);
  var __h2 = has(____id113, 1);
  var __body64 = cut(____id113, 2);
  return add(hoist, ["%block", __name22, lower(__h2, hoist), lower_body(__body64, tail63)]);
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __f5 = unique("f");
    return lower(["do", join(["%local-function", __f5], args), __f5], hoist);
  } else {
    var ____id114 = args;
    var __a14 = has(____id114, 0);
    var __body65 = cut(____id114, 1);
    return join(["%function", __a14, lower_body(__body65, true)], keys(__body65));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id115 = args;
  var __name23 = has(____id115, 0);
  var __args27 = has(____id115, 1);
  var __body66 = cut(____id115, 2);
  return add(hoist, join([kind, __name23, __args27, lower_body(__body66, true)], keys(__body66)));
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
  return in63(hd(form), ["<", "<=", "=", ">=", ">"]);
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e13 = [];
    var ____id116 = form;
    var __x687 = has(____id116, 0);
    var __args28 = cut(____id116, 1);
    reduce(function (a, b) {
      add(__e13, [__x687, a, b]);
      return a;
    }, __args28);
    return join(["and"], reverse(__e13));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form11 = lower_pairwise(form);
  var ____id117 = __form11;
  var __x690 = has(____id117, 0);
  var __args29 = cut(____id117, 1);
  return lower(reduce(function (a, b) {
    return [__x690, b, a];
  }, reverse(__args29)), hoist);
};
var lower_special = function (form, hoist) {
  var __e14 = lower_call(form, hoist);
  if (__e14) {
    return add(hoist, __e14);
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
          var ____id118 = form;
          var __x693 = has(____id118, 0);
          var __args30 = cut(____id118, 1);
          if (__x693 === "do") {
            return lower_do(__args30, hoist, stmt63, tail63);
          } else {
            if (__x693 === "%call") {
              return lower(__args30, hoist, stmt63, tail63);
            } else {
              if (__x693 === "%set") {
                return lower_set(__args30, hoist, stmt63, tail63);
              } else {
                if (__x693 === "%if") {
                  return lower_if(__args30, hoist, stmt63, tail63);
                } else {
                  if (__x693 === "%try") {
                    return lower_try(__args30, hoist, tail63);
                  } else {
                    if (__x693 === "while") {
                      return lower_while(__args30, hoist);
                    } else {
                      if (__x693 === "%for") {
                        return lower_for(__args30, hoist);
                      } else {
                        if (__x693 === "%with") {
                          return lower_with(__args30, hoist, stmt63, tail63);
                        } else {
                          if (__x693 === "%block") {
                            return lower_block(__args30, hoist, stmt63, tail63);
                          } else {
                            if (__x693 === "%function") {
                              return lower_function(__args30, hoist);
                            } else {
                              if (__x693 === "%local-function" || __x693 === "%global-function") {
                                return lower_definition(__x693, __args30, hoist);
                              } else {
                                if (in63(__x693, ["and", "or"])) {
                                  return lower_short(__x693, __args30, hoist);
                                } else {
                                  if (statement63(__x693)) {
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
var __e119 = undefined;
if (typeof(global) === "undefined") {
  var __e120 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e120 = window;
  } else {
    var __e121 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e121 = self;
    } else {
      __e121 = this;
    }
    __e120 = __e121;
  }
  global = __e120;
  __e119 = global;
}
var __e122 = undefined;
if (!( typeof(require) === "undefined")) {
  global.require = require;
  global.require;
  var __e123 = undefined;
  if (!( typeof(__module1) === "undefined")) {
    __module1.filename = require("path").resolve("repl");
    __module1.filename;
    __module1.paths = require("module")._nodeModulePaths(__module1.filename);
    __e123 = __module1.paths;
  }
  __e122 = __e123;
}
var run = function (code, context) {
  var __f6 = new Function("with(this) {\n" + code + "\n}");
  return __f6.call(either(context, global));
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
  var __forms7 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s7 = "";
  var ____x698 = __forms7;
  var ____i66 = 0;
  while (____i66 < _35(____x698)) {
    var __x699 = ____x698[____i66];
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && immediate_call63(__x699) && "\n" === char(__s7, edge(__s7))) {
      __s7 = clip(__s7, 0, edge(__s7)) + ";\n";
    }
    __s7 = __s7 + compile(__x699, {_stash: true, stmt: true});
    if (! atom63(__x699)) {
      if (hd(__x699) === "return" || hd(__x699) === "break") {
        break;
      }
    }
    ____i66 = ____i66 + 1;
  }
  return __s7;
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var __cond8 = compile(cond);
  var __cons1 = compile_body(cons);
  var __e124 = undefined;
  if (alt) {
    __e124 = compile_body(alt);
  }
  var __alt1 = __e124;
  var __ind3 = indentation();
  var __s9 = "";
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __s9 = __s9 + __ind3 + "if (" + __cond8 + ") {\n" + __cons1 + __ind3 + "}";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __s9 = __s9 + __ind3 + "if " + __cond8 + ":\n" + __cons1;
    } else {
      __s9 = __s9 + __ind3 + "if " + __cond8 + " then\n" + __cons1;
    }
  }
  if (__alt1 && has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __s9 = __s9 + " else {\n" + __alt1 + __ind3 + "}";
  } else {
    if (__alt1 && has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __s9 = __s9 + __ind3 + "else:\n" + __alt1;
    } else {
      if (__alt1) {
        __s9 = __s9 + __ind3 + "else\n" + __alt1;
      }
    }
  }
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    return __s9 + __ind3 + "end\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
      return __s9 + "\n";
    } else {
      return __s9;
    }
  }
}, stmt: true, tr: true});
setenv("while", {_stash: true, special: function (cond, form) {
  var __cond10 = compile(cond);
  var __body68 = compile_body(form);
  var __ind5 = indentation();
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind5 + "while (" + __cond10 + ") {\n" + __body68 + __ind5 + "}\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind5 + "while " + __cond10 + ":\n" + __body68;
    } else {
      return __ind5 + "while " + __cond10 + " do\n" + __body68 + __ind5 + "end\n";
    }
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var ____r332 = unstash(Array.prototype.slice.call(arguments, 3));
  var __t8 = destash33(t, ____r332);
  var __k61 = destash33(k, ____r332);
  var __form13 = destash33(form, ____r332);
  var ____id120 = ____r332;
  var __async2 = has(____id120, "async");
  var __t9 = compile(__t8);
  var __k62 = compile(__k61);
  var __ind7 = indentation();
  var __body70 = compile_body(__form13);
  var __e125 = undefined;
  if (__async2) {
    __e125 = "async ";
  } else {
    __e125 = "";
  }
  var __a16 = __e125;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    return __ind7 + "for " + __k62 + " in next, " + __t9 + " do\n" + __body70 + __ind7 + "end\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind7 + __a16 + "for " + __k62 + " in " + __t9 + ":\n" + __body70;
    } else {
      return __ind7 + "for (" + __k62 + " in " + __t9 + ") {\n" + __body70 + __ind7 + "}\n";
    }
  }
}, stmt: true, tr: true});
setenv("%with", {_stash: true, special: function (t, form) {
  var ____r334 = unstash(Array.prototype.slice.call(arguments, 2));
  var __t12 = destash33(t, ____r334);
  var __form15 = destash33(form, ____r334);
  var ____id122 = ____r334;
  var __async4 = has(____id122, "async");
  var __t13 = compile(__t12);
  var __ind9 = indentation();
  var __body72 = compile_body(__form15);
  var __e126 = undefined;
  if (__async4) {
    __e126 = "async ";
  } else {
    __e126 = "";
  }
  var __a18 = __e126;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return __ind9 + __a18 + "with " + __t13 + ":\n" + __body72;
  } else {
    return "";
  }
}, stmt: true, tr: true});
setenv("%block", {_stash: true, special: function (name, t, form) {
  var __t15 = compile(t);
  var __ind11 = indentation();
  var __body74 = compile_body(form);
  var __e127 = undefined;
  if (some63(__t15)) {
    __e127 = " ";
  } else {
    __e127 = "";
  }
  var __sep1 = __e127;
  return __ind11 + name + __sep1 + __t15 + ":\n" + __body74;
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var __ind13 = indentation();
  var __body76 = compile_body(form);
  var __e128 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e128 = ["do", ["import", "sys"], ["%local", "e", [["idx", "sys", "exc_info"]]], ["return", ["%array", false, ["get", "e", 1], "e"]]];
  } else {
    __e128 = ["return", ["%array", false, "e"]];
  }
  var __hf1 = __e128;
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
  var ____x721 = compile(__hf1, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __h4 = ____x721;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind13 + "try {\n" + __body76 + __ind13 + "}\n" + __ind13 + "catch (e) {\n" + __h4 + __ind13 + "}\n";
  } else {
    return __ind13 + "try:\n" + __body76 + __ind13 + "except:\n" + __h4;
  }
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  var __e129 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e129 = "del ";
  } else {
    __e129 = "delete ";
  }
  return indentation() + __e129 + compile(place);
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return indentation() + "break";
}, stmt: true});
setenv("%function", {_stash: true, special: function (args) {
  var ____r344 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args32 = destash33(args, ____r344);
  var ____id124 = ____r344;
  var __body78 = cut(____id124, 0);
  return apply(compile_function, join([__args32], __body78, []));
}});
setenv("%global-function", {_stash: true, special: function (name, args) {
  var ____r346 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name25 = destash33(name, ____r346);
  var __args34 = destash33(args, ____r346);
  var ____id126 = ____r346;
  var __body80 = cut(____id126, 0);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var ____x732 = object([__args34]);
    ____x732.name = __name25;
    var ____x733 = object([]);
    ____x733.name = __name25;
    var __x731 = apply(compile_function, join(____x732, __body80, ____x733));
    return indentation() + __x731;
  } else {
    return compile(["%set", __name25, join(["%function", __args34], __body80)], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args) {
  var ____r348 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name27 = destash33(name, ____r348);
  var __args36 = destash33(args, ____r348);
  var ____id128 = ____r348;
  var __body82 = cut(____id128, 0);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var ____x742 = object([__args36]);
    ____x742.name = __name27;
    ____x742.prefix = "local";
    var ____x743 = object([]);
    ____x743.name = __name27;
    ____x743.prefix = "local";
    var __x741 = apply(compile_function, join(____x742, __body82, ____x743));
    return indentation() + __x741;
  } else {
    return compile(["%local", __name27, join(["%function", __args36], __body82)], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var __e130 = undefined;
  if (nil63(x)) {
    __e130 = "return";
  } else {
    __e130 = "return " + compile(x);
  }
  var __x747 = __e130;
  return indentation() + __x747;
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return "new " + compile(x);
}});
setenv("typeof", {_stash: true, special: function (x) {
  return "typeof(" + compile(x) + ")";
}});
setenv("error", {_stash: true, special: function (x) {
  var __e131 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e131 = "throw " + compile(["new", ["Error", x]]);
  } else {
    var __e132 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e132 = "raise " + compile(["Exception", x]);
    } else {
      __e132 = "error(" + compile(x) + ")";
    }
    __e131 = __e132;
  }
  var __e25 = __e131;
  return indentation() + __e25;
}, stmt: true});
setenv("throw", {_stash: true, special: function (x) {
  var __e133 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e133 = "throw " + compile(x);
  } else {
    var __e134 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e134 = "raise " + compile(x);
    } else {
      __e134 = "error(" + compile(x) + ")";
    }
    __e133 = __e134;
  }
  var __e29 = __e133;
  return indentation() + __e29;
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  if (nil63(value) && has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    value = "nil";
  }
  var __id130 = compile(name);
  var __value12 = compile(value);
  var __e135 = undefined;
  if (is63(value)) {
    __e135 = " = " + __value12;
  } else {
    __e135 = "";
  }
  var __rh6 = __e135;
  var __e136 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e136 = "var ";
  } else {
    var __e137 = undefined;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      __e137 = "local ";
    } else {
      __e137 = "";
    }
    __e136 = __e137;
  }
  var __keyword3 = __e136;
  var __ind15 = indentation();
  return __ind15 + __keyword3 + __id130 + __rh6;
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var __lh6 = compile(lh);
  var __e138 = undefined;
  if (nil63(rh)) {
    __e138 = "nil";
  } else {
    __e138 = rh;
  }
  var __rh8 = compile(__e138);
  return indentation() + __lh6 + " = " + __rh8;
}, stmt: true});
setenv("get", {_stash: true, special: function (t, k) {
  var __t121 = compile(t);
  var __k121 = compile(k);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && char(__t121, 0) === "{" || infix_operator63(t)) {
    __t121 = "(" + __t121 + ")";
  }
  if (string_literal63(k) && valid_id63(inner(k)) && !( has(setenv("target", {_stash: true, toplevel: true}), "value") === "py")) {
    return __t121 + "." + inner(k);
  } else {
    return __t121 + "[" + __k121 + "]";
  }
}});
setenv("idx", {_stash: true, special: function (t, k) {
  var __t141 = compile(t);
  var __k141 = compile(k);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && char(__t141, 0) === "{" || infix_operator63(t)) {
    __t141 = "(" + __t141 + ")";
  }
  return __t141 + "." + __k141;
}});
setenv("%array", {_stash: true, special: function () {
  var __forms9 = unstash(Array.prototype.slice.call(arguments, 0));
  var __e139 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e139 = "{";
  } else {
    __e139 = "[";
  }
  var __open1 = __e139;
  var __e140 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e140 = "}";
  } else {
    __e140 = "]";
  }
  var __close1 = __e140;
  var __s111 = "";
  var __c16 = "";
  var ____o36 = __forms9;
  var __k65 = undefined;
  for (__k65 in ____o36) {
    var __v42 = ____o36[__k65];
    var __e141 = undefined;
    if (numeric63(__k65)) {
      __e141 = parseInt(__k65);
    } else {
      __e141 = __k65;
    }
    var __k66 = __e141;
    if (number63(__k66)) {
      __s111 = __s111 + __c16 + compile(__v42);
      __c16 = ", ";
    }
  }
  return __open1 + __s111 + __close1;
}});
setenv("%object", {_stash: true, special: function () {
  var __forms11 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s13 = "{";
  var __c18 = "";
  var __e142 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e142 = " = ";
  } else {
    __e142 = ": ";
  }
  var __sep3 = __e142;
  var ____o38 = pair(__forms11);
  var __k70 = undefined;
  for (__k70 in ____o38) {
    var __v45 = ____o38[__k70];
    var __e143 = undefined;
    if (numeric63(__k70)) {
      __e143 = parseInt(__k70);
    } else {
      __e143 = __k70;
    }
    var __k71 = __e143;
    if (number63(__k71)) {
      var ____id132 = __v45;
      var __k72 = has(____id132, 0);
      var __v46 = has(____id132, 1);
      if (! string63(__k72)) {
        throw new Error("Illegal key: " + _str(__k72));
      }
      __s13 = __s13 + __c18 + key(__k72) + __sep3 + compile(__v46);
      __c18 = ", ";
    }
  }
  return __s13 + "}";
}});
setenv("%list", {_stash: true, special: function (form, comps, cond) {
  var __s15 = compile(form);
  var ____x755 = comps;
  var ____i72 = 0;
  while (____i72 < _35(____x755)) {
    var ____id134 = ____x755[____i72];
    var __k74 = has(____id134, 0);
    var __v48 = has(____id134, 1);
    __s15 = __s15 + " for " + compile(__k74) + " in " + compile(__v48);
    ____i72 = ____i72 + 1;
  }
  if (is63(cond)) {
    __s15 = __s15 + " if " + compile(cond);
  }
  return "[" + __s15 + "]";
}});
setenv("%literal", {_stash: true, special: function () {
  var __args38 = unstash(Array.prototype.slice.call(arguments, 0));
  return apply(cat, map(compile, __args38));
}});
setenv("global", {_stash: true, special: function (x) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return indentation() + "global " + compile(x) + "\n";
  } else {
    return "";
  }
}, stmt: true, tr: true});
setenv("import", {_stash: true, special: function (name) {
  var ____r372 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name29 = destash33(name, ____r372);
  var ____id137 = ____r372;
  var __alias1 = cut(____id137, 0);
  var __ind17 = indentation();
  var __e144 = undefined;
  if (hd(__alias1) === "as") {
    __e144 = __alias1[1];
  } else {
    __e144 = hd(__alias1);
  }
  var __as1 = __e144;
  var __id138 = __as1 || __name29;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __s17 = __ind17 + "import " + compile(__name29);
    if (__as1) {
      __s17 = __s17 + " as " + compile(__id138);
    }
    return __s17;
  } else {
    return __ind17 + compile(["%local", __id138, ["require", escape(__name29)]]);
  }
}, stmt: true});
setenv("from", {_stash: true, special: function (name) {
  var ____r375 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name31 = destash33(name, ____r375);
  var ____id141 = ____r375;
  var __imports1 = cut(____id141, 0);
  var __ind19 = indentation();
  var __id142 = __name31;
  var __e145 = undefined;
  if (hd(__imports1) === "import") {
    __e145 = tl(__imports1);
  } else {
    __e145 = __imports1;
  }
  var __names11 = __e145;
  var __names12 = mapcat(function (x) {
    if (x === "*") {
      return x;
    } else {
      return compile(x);
    }
  }, __names11, ", ");
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return __ind19 + "from " + compile(__name31) + " import " + __names12;
  } else {
    return "";
  }
}, stmt: true});
setenv(",", {_stash: true, special: function () {
  var __args40 = unstash(Array.prototype.slice.call(arguments, 0));
  if (none63(__args40)) {
    return ", ";
  } else {
    if (one63(__args40)) {
      return ", " + compile(hd(__args40));
    } else {
      return mapcat(compile, __args40, ", ");
    }
  }
}});
setenv(":", {_stash: true, special: function () {
  var __args42 = unstash(Array.prototype.slice.call(arguments, 0));
  if (none63(__args42)) {
    return ":";
  } else {
    if (one63(__args42)) {
      return ":" + compile(hd(__args42));
    } else {
      return mapcat(compile, __args42, ":");
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
  var __args44 = unstash(Array.prototype.slice.call(arguments, 0));
  return indentation() + "yield " + mapcat(compile, __args44, ", ");
}, stmt: true});
setenv("await", {_stash: true, special: function (x) {
  var __e146 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e146 = "";
  } else {
    __e146 = "await ";
  }
  var __a20 = __e146;
  return __a20 + compile(x);
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
