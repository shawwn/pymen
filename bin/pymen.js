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
      var __e41;
      if (numeric63(__k)) {
        __e41 = parseInt(__k);
      } else {
        __e41 = __k;
      }
      var __k1 = __e41;
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
      var __e42;
      if (numeric63(__k2)) {
        __e42 = parseInt(__k2);
      } else {
        __e42 = __k2;
      }
      var __k3 = __e42;
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
    var __e43;
    if (numeric63(__k4)) {
      __e43 = parseInt(__k4);
    } else {
      __e43 = __k4;
    }
    var __k5 = __e43;
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
  var __e44;
  if (nil63(_from) || _from < 0) {
    __e44 = 0;
  } else {
    __e44 = _from;
  }
  var __i3 = __e44;
  var __n4 = _35(x);
  var __e45;
  if (nil63(upto) || upto > __n4) {
    __e45 = __n4;
  } else {
    __e45 = upto;
  }
  var __upto1 = __e45;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e46;
    if (numeric63(__k6)) {
      __e46 = parseInt(__k6);
    } else {
      __e46 = __k6;
    }
    var __k7 = __e46;
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
    var __e47;
    if (numeric63(__k8)) {
      __e47 = parseInt(__k8);
    } else {
      __e47 = __k8;
    }
    var __k9 = __e47;
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
        var __e48;
        if (numeric63(__k10)) {
          __e48 = parseInt(__k10);
        } else {
          __e48 = __k10;
        }
        var __k11 = __e48;
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
    var __e49;
    if (numeric63(____i9)) {
      __e49 = parseInt(____i9);
    } else {
      __e49 = ____i9;
    }
    var ____i91 = __e49;
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
    var __e50;
    if (numeric63(__k12)) {
      __e50 = parseInt(__k12);
    } else {
      __e50 = __k12;
    }
    var __k13 = __e50;
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
    var __e51;
    if (f) {
      __e51 = f(__v8);
    } else {
      __e51 = __v8;
    }
    var __y4 = __e51;
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
    var __e52;
    if (numeric63(__k14)) {
      __e52 = parseInt(__k14);
    } else {
      __e52 = __k14;
    }
    var __k15 = __e52;
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
    var __e53;
    if (numeric63(____i16)) {
      __e53 = parseInt(____i16);
    } else {
      __e53 = ____i16;
    }
    var ____i161 = __e53;
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
      var __e54;
      if (numeric63(__k16)) {
        __e54 = parseInt(__k16);
      } else {
        __e54 = __k16;
      }
      var __k17 = __e54;
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
        var __e56;
        if (numeric63(__k18)) {
          __e56 = parseInt(__k18);
        } else {
          __e56 = __k18;
        }
        var __k19 = __e56;
        if (!( __k19 === "_stash")) {
          __args1[__k19] = __v11;
        }
      }
      if (params) {
        var ____o12 = params;
        var __k20 = undefined;
        for (__k20 in ____o12) {
          var __v12 = ____o12[__k20];
          var __e57;
          if (numeric63(__k20)) {
            __e57 = parseInt(__k20);
          } else {
            __e57 = __k20;
          }
          var __k21 = __e57;
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
          var __e55;
          if (numeric63(__k22)) {
            __e55 = parseInt(__k22);
          } else {
            __e55 = __k22;
          }
          var __k23 = __e55;
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
      var __e58;
      if (numeric63(__k24)) {
        __e58 = parseInt(__k24);
      } else {
        __e58 = __k24;
      }
      var __k25 = __e58;
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
      var __e59;
      if (__c1 === "\n") {
        __e59 = "\\n";
      } else {
        var __e60;
        if (__c1 === "\r") {
          __e60 = "\\r";
        } else {
          var __e61;
          if (__c1 === "\"") {
            __e61 = "\\\"";
          } else {
            var __e62;
            if (__c1 === "\\") {
              __e62 = "\\\\";
            } else {
              __e62 = __c1;
            }
            __e61 = __e62;
          }
          __e60 = __e61;
        }
        __e59 = __e60;
      }
      var __c11 = __e59;
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
                        var __e63;
                        if (numeric63(__k26)) {
                          __e63 = parseInt(__k26);
                        } else {
                          __e63 = __k26;
                        }
                        var __k27 = __e63;
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
    var __e64;
    if (has63(__keys, "toplevel")) {
      __e64 = hd(environment);
    } else {
      __e64 = last(environment);
    }
    var __frame = __e64;
    var __e65;
    if (has63(__frame, __k29)) {
      __e65 = __frame[__k29];
    } else {
      __e65 = {};
    }
    var __entry = __e65;
    var ____o16 = __keys;
    var __k30 = undefined;
    for (__k30 in ____o16) {
      var __v18 = ____o16[__k30];
      var __e66;
      if (numeric63(__k30)) {
        __e66 = parseInt(__k30);
      } else {
        __e66 = __k30;
      }
      var __k31 = __e66;
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
      var __e67;
      if (numeric63(__k34)) {
        __e67 = parseInt(__k34);
      } else {
        __e67 = __k34;
      }
      var __k35 = __e67;
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
  var ____id39 = __x157;
  var __char1 = has(____id39, 0);
  var __s2 = has(____id39, 1);
  var ____r127 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x157 = destash33(__x157, ____r127);
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
setenv("with-frame", {_stash: true, macro: function () {
  var __body27 = unstash(Array.prototype.slice.call(arguments, 0));
  var __x213 = unique("x");
  return ["do", ["add", "environment", ["obj"]], ["with", __x213, join(["do"], __body27), ["drop", "environment"]]];
}});
setenv("with-bindings", {_stash: true, macro: function (__x225) {
  var ____id47 = __x225;
  var __names3 = has(____id47, 0);
  var ____r139 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x225 = destash33(__x225, ____r139);
  var ____id48 = ____r139;
  var __body29 = cut(____id48, 0);
  var __x226 = unique("x");
  var ____x229 = object(["setenv", __x226]);
  ____x229.variable = true;
  return join(["with-frame", ["each", __x226, __names3, ____x229]], __body29);
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var ____r142 = unstash(Array.prototype.slice.call(arguments, 1));
  var __definitions1 = destash33(definitions, ____r142);
  var ____id50 = ____r142;
  var __body31 = cut(____id50, 0);
  add(environment, {});
  map(function (m) {
    return macroexpand(join(["define-macro"], m));
  }, __definitions1);
  var ____x233 = join(["do"], macroexpand(__body31));
  drop(environment);
  return ____x233;
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var ____r146 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expansions1 = destash33(expansions, ____r146);
  var ____id53 = ____r146;
  var __body33 = cut(____id53, 0);
  add(environment, {});
  map(function (__x241) {
    var ____id54 = __x241;
    var __name9 = has(____id54, 0);
    var __exp1 = has(____id54, 1);
    return macroexpand(["define-symbol", __name9, __exp1]);
  }, pair(__expansions1));
  var ____x240 = join(["do"], macroexpand(__body33));
  drop(environment);
  return ____x240;
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var ____r150 = unstash(Array.prototype.slice.call(arguments, 1));
  var __names5 = destash33(names, ____r150);
  var ____id56 = ____r150;
  var __body35 = cut(____id56, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names5);
  return join(["let", apply(join, __bs3)], __body35);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var ____r153 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args9 = destash33(args, ____r153);
  var ____id58 = ____r153;
  var __body37 = cut(____id58, 0);
  return join(["%function"], bind42(__args9, __body37), keys(__body37));
}});
setenv("apply", {_stash: true, macro: function (f) {
  var ____r155 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f3 = destash33(f, ____r155);
  var ____id60 = ____r155;
  var __args111 = cut(____id60, 0);
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
    var ____x304 = object(["obj"]);
    ____x304.stack = [["idx", "debug", "traceback"]];
    ____x304.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x304]]]];
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var ____r159 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x331 = destash33(x, ____r159);
  var __t3 = destash33(t, ____r159);
  var ____id63 = ____r159;
  var __body39 = cut(____id63, 0);
  var __o20 = unique("o");
  var __n28 = unique("n");
  var __i34 = unique("i");
  var __e68;
  if (atom63(__x331)) {
    __e68 = [__i34, __x331];
  } else {
    var __e69;
    if (_35(__x331) > 1) {
      __e69 = __x331;
    } else {
      __e69 = [__i34, hd(__x331)];
    }
    __e68 = __e69;
  }
  var ____id64 = __e68;
  var __k37 = has(____id64, 0);
  var __v26 = has(____id64, 1);
  var ____x337 = object(["target", __o20]);
  ____x337.py = ["indices", __o20];
  var __e70;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e70 = __body39;
  } else {
    __e70 = [join(["let", __k37, ["if", ["numeric?", __k37], ["parseInt", __k37], __k37]], __body39)];
  }
  return ["let", [__o20, __t3, __k37, "nil"], join(["%for", ____x337, __k37], keys(__body39), [join(["let", [__v26, ["get", __o20, __k37]]], __e70)])];
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var ____r161 = unstash(Array.prototype.slice.call(arguments, 2));
  var __i36 = destash33(i, ____r161);
  var __to1 = destash33(to, ____r161);
  var ____id66 = ____r161;
  var __body41 = cut(____id66, 0);
  if (__to1 === "in") {
    return join(["%for", hd(__body41), __i36, join(["do"], tl(__body41))], keys(__body41));
  } else {
    return ["let", __i36, 0, join(["while", ["<", __i36, __to1]], __body41, [["inc", __i36]])];
  }
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var ____r163 = unstash(Array.prototype.slice.call(arguments, 2));
  var __v28 = destash33(v, ____r163);
  var __t5 = destash33(t, ____r163);
  var ____id68 = ____r163;
  var __body43 = cut(____id68, 0);
  var __x370 = unique("x");
  var __i38 = unique("i");
  return ["let", [__x370, __t5], ["for", __i38, ["#", __x370], join(["let", [__v28, ["at", __x370, __i38]]], __body43)]];
}});
setenv("set-of", {_stash: true, macro: function () {
  var __xs13 = unstash(Array.prototype.slice.call(arguments, 0));
  var __l121 = [];
  var ____o22 = __xs13;
  var ____i40 = undefined;
  for (____i40 in ____o22) {
    var __x380 = ____o22[____i40];
    var __e71;
    if (numeric63(____i40)) {
      __e71 = parseInt(____i40);
    } else {
      __e71 = ____i40;
    }
    var ____i401 = __e71;
    __l121[__x380] = true;
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
  var ____r169 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a6 = destash33(a, ____r169);
  var ____id70 = ____r169;
  var __bs5 = cut(____id70, 0);
  return ["set", __a6, join(["join", __a6], __bs5)];
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var ____r171 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a8 = destash33(a, ____r171);
  var ____id72 = ____r171;
  var __bs7 = cut(____id72, 0);
  return ["set", __a8, join(["cat", __a8], __bs7)];
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  var __e72;
  if (nil63(by)) {
    __e72 = 1;
  } else {
    __e72 = by;
  }
  return ["set", n, ["+", n, __e72]];
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  var __e73;
  if (nil63(by)) {
    __e73 = 1;
  } else {
    __e73 = by;
  }
  return ["set", n, ["-", n, __e73]];
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var __x407 = unique("x");
  return ["do", ["inc", "indent-level"], ["with", __x407, form, ["dec", "indent-level"]]];
}});
setenv("export", {_stash: true, macro: function () {
  var __names7 = unstash(Array.prototype.slice.call(arguments, 0));
  var __forms3 = map(function (k) {
    if (k === compile(k)) {
      return ["set", ["idx", "exports", k], k];
    } else {
      return ["set", ["get", "exports", ["quote", k]], k, ["idx", "exports", k], k];
    }
  }, __names7);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return join(["do"], __forms3);
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms3, [["return", "exports"]]);
    }
  }
}});
setenv("when-compiling", {_stash: true, macro: function () {
  var __body45 = unstash(Array.prototype.slice.call(arguments, 0));
  return _eval(join(["do"], __body45));
}});
setenv("during-compilation", {_stash: true, macro: function () {
  var __body47 = unstash(Array.prototype.slice.call(arguments, 0));
  var __form5 = join(["do"], __body47);
  _eval(__form5);
  return __form5;
}});
setenv("def", {_stash: true, macro: function (name) {
  var ____r181 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name11 = destash33(name, ____r181);
  var ____id74 = ____r181;
  var __body49 = cut(____id74, 0);
  return join(["define-global", __name11], __body49);
}});
setenv("mac", {_stash: true, macro: function (name) {
  var ____r183 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name13 = destash33(name, ____r183);
  var ____id76 = ____r183;
  var __body51 = cut(____id76, 0);
  return join(["define-macro", __name13], __body51);
}});
setenv("defconst", {_stash: true, macro: function (name) {
  var ____r185 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name15 = destash33(name, ____r185);
  var ____id78 = ____r185;
  var __value1 = cut(____id78, 0);
  return join(["def", __name15], __value1);
}});
setenv("undefined?", {_stash: true, macro: function (name) {
  var ____x455 = object(["target"]);
  ____x455.js = ["=", ["typeof", name], "\"undefined\""];
  ____x455.lua = ["=", ["idx", "_G", name], "nil"];
  ____x455.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x455;
}});
setenv("defvar", {_stash: true, macro: function (name) {
  var ____r189 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name17 = destash33(name, ____r189);
  var ____id80 = ____r189;
  var __value3 = cut(____id80, 0);
  var ____x471 = object(["target"]);
  ____x471.py = ["global", __name17];
  return ["when", ["undefined?", __name17], ____x471, join(["defconst", __name17], __value3)];
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
  var ____r191 = unstash(Array.prototype.slice.call(arguments, 1));
  var __keyword1 = destash33(keyword, ____r191);
  var ____id82 = ____r191;
  var __body53 = cut(____id82, 0);
  var ____x485 = object([__keyword1]);
  ____x485.async = true;
  return join(____x485, __body53);
}});
setenv("%read-from-file", {_stash: true, macro: function (name) {
  return ["when-compiling", ["quasiquote", ["do", ["unquote-splicing", ["read-from-file", name]]]]];
}});
var __exports = {};
var __module = {exports: __exports};
var delimiters = {"(": true, ")": true, ";": true, ",": true, "\r": true, "\n": true};
var whitespace = {" ": true, "\t": true, "\r": true, "\n": true};
var stream = function (_str, more) {
  return {pos: 0, string: _str, len: _35(_str), more: more};
};
var peek_char = function (s) {
  var ____id83 = s;
  var __pos = has(____id83, "pos");
  var __len = has(____id83, "len");
  var __string = has(____id83, "string");
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
    var __r200 = [",", __form6];
    while (true) {
      read_char(s);
      __form6 = read_1(s);
      if (__form6 === eof) {
        return expected(s, "tuple");
      }
      add(__r200, __form6);
      if (!( "," === peek_char(s))) {
        break;
      }
    }
    return __r200;
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
  var __x498 = read(stream(_str, more));
  if (!( __x498 === eof)) {
    return __x498;
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
  var __e74;
  if (code(_str, 0) === 45) {
    __e74 = 1;
  } else {
    __e74 = 0;
  }
  var __i41 = __e74;
  var __id137 = code(_str, __i41) === 48;
  var __e75;
  if (__id137) {
    __i41 = __i41 + 1;
    var __n31 = code(_str, __i41);
    __e75 = __n31 === 120 || __n31 === 88;
  } else {
    __e75 = __id137;
  }
  return __e75;
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
      var __n32 = maybe_number(___str);
      if (real63(__n32)) {
        return __n32;
      } else {
        return ___str;
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var __r212 = undefined;
  var __l14 = [];
  while (nil63(__r212)) {
    skip_non_code(s);
    var __c6 = peek_char(s);
    if (__c6 === ")") {
      read_char(s);
      __r212 = __l14;
    } else {
      if (nil63(__c6)) {
        __r212 = expected(s, ")");
      } else {
        var __x500 = read(s);
        if (key63(__x500)) {
          var __k38 = clip(__x500, 0, edge(__x500));
          var __v29 = read(s);
          __l14 = object(__l14);
          __l14[__k38] = __v29;
        } else {
          if (flag63(__x500)) {
            __l14 = object(__l14);
            __l14[clip(__x500, 1)] = true;
          } else {
            add(__l14, __x500);
          }
        }
      }
    }
  }
  return __r212;
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
read_table["\""] = function (s) {
  var __i42 = s.pos;
  var __j1 = search(s.string, "\"", __i42 + 1);
  var __b5 = either(search(s.string, "\\", __i42 + 1), __j1);
  if (is63(__j1) && __j1 < s.len && __b5 >= __j1) {
    s.pos = __j1 + 1;
    return clip(s.string, __i42, __j1 + 1);
  } else {
    var __r215 = undefined;
    read_char(s);
    while (nil63(__r215)) {
      var __c7 = peek_char(s);
      if (__c7 === "\"") {
        read_char(s);
        __r215 = clip(s.string, __i42, s.pos);
      } else {
        if (nil63(__c7)) {
          __r215 = expected(s, "\"");
        } else {
          if (__c7 === "\\") {
            read_char(s);
          }
          read_char(s);
        }
      }
    }
    return __r215;
  }
};
read_table["|"] = function (s) {
  var __i43 = s.pos;
  var __j2 = search(s.string, "|", __i43 + 1);
  if (is63(__j2) && __j2 < s.len) {
    s.pos = __j2 + 1;
    return clip(s.string, __i43, __j2 + 1);
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
var getenv = function (k, p) {
  if (string63(k)) {
    var __i44 = edge(environment);
    while (__i44 >= 0) {
      if (has63(environment[__i44], k)) {
        var __b6 = environment[__i44][k];
        var __e76;
        if (p) {
          __e76 = has(__b6, p);
        } else {
          __e76 = __b6;
        }
        return __e76;
      } else {
        __i44 = __i44 - 1;
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
      var ____o23 = args;
      var __k39 = undefined;
      for (__k39 in ____o23) {
        var __v30 = ____o23[__k39];
        var __e78;
        if (numeric63(__k39)) {
          __e78 = parseInt(__k39);
        } else {
          __e78 = __k39;
        }
        var __k40 = __e78;
        if (! number63(__k40)) {
          add(__l15, ["%literal", "|" + __k40 + "=|", __v30]);
        }
      }
      return __l15;
    } else {
      var __l16 = ["%object", "\"_stash\"", true];
      var ____o24 = args;
      var __k41 = undefined;
      for (__k41 in ____o24) {
        var __v31 = ____o24[__k41];
        var __e77;
        if (numeric63(__k41)) {
          __e77 = parseInt(__k41);
        } else {
          __e77 = __k41;
        }
        var __k42 = __e77;
        if (! number63(__k42)) {
          add(__l16, literal(__k42));
          add(__l16, __v31);
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
    var __id84 = unique("id");
    var __bs8 = [__id84, rh];
    var ____o25 = lh;
    var __k43 = undefined;
    for (__k43 in ____o25) {
      var __v32 = ____o25[__k43];
      var __e79;
      if (numeric63(__k43)) {
        __e79 = parseInt(__k43);
      } else {
        __e79 = __k43;
      }
      var __k44 = __e79;
      var __e80;
      if (__k44 === "rest") {
        __e80 = ["cut", __id84, _35(lh)];
      } else {
        __e80 = ["has", __id84, ["quote", bias(__k44)]];
      }
      var __x508 = __e80;
      if (is63(__k44)) {
        var __e81;
        if (__v32 === true) {
          __e81 = __k44;
        } else {
          __e81 = __v32;
        }
        var __k45 = __e81;
        __bs8 = join(__bs8, bind(__k45, __x508));
      }
    }
    return __bs8;
  }
};
setenv("arguments%", {_stash: true, macro: function (_from) {
  var ____x519 = object(["target"]);
  ____x519.js = [["idx", ["idx", ["idx", "Array", "prototype"], "slice"], "call"], "arguments", _from];
  ____x519.py = ["|list|", "|_args|"];
  ____x519.lua = ["list", "|...|"];
  return ____x519;
}});
bind42 = function (args, body) {
  var __args131 = {};
  var rest = function () {
    __args131.rest = true;
    var ____x528 = object(["target"]);
    ____x528.py = "|_keys|";
    return ["unstash", ["arguments%", _35(__args131)], ____x528];
  };
  if (atom63(args)) {
    return [__args131, join(["let", [args, rest()]], body)];
  } else {
    var __bs9 = [];
    var __r239 = unique("r");
    var ____o26 = args;
    var __k46 = undefined;
    for (__k46 in ____o26) {
      var __v33 = ____o26[__k46];
      var __e82;
      if (numeric63(__k46)) {
        __e82 = parseInt(__k46);
      } else {
        __e82 = __k46;
      }
      var __k47 = __e82;
      if (number63(__k47)) {
        if (atom63(__v33)) {
          add(__args131, __v33);
        } else {
          var __x532 = unique("x");
          add(__args131, __x532);
          __bs9 = join(__bs9, [__v33, __x532]);
        }
      }
    }
    if (keys63(args)) {
      __bs9 = join(__bs9, [__r239, rest()]);
      var __n37 = _35(__args131);
      var __i49 = 0;
      while (__i49 < __n37) {
        var __v34 = __args131[__i49];
        __bs9 = join(__bs9, [__v34, ["destash!", __v34, __r239]]);
        __i49 = __i49 + 1;
      }
      __bs9 = join(__bs9, [keys(args), __r239]);
    }
    return [__args131, join(["let", __bs9], body)];
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
var expand_local = function (__x540) {
  var ____id85 = __x540;
  var __x541 = has(____id85, 0);
  var __name18 = has(____id85, 1);
  var __value4 = has(____id85, 2);
  setenv(__name18, {_stash: true, variable: true});
  return ["%local", __name18, macroexpand(__value4)];
};
var expand_function = function (__x543) {
  var ____id86 = __x543;
  var __x544 = has(____id86, 0);
  var __args20 = has(____id86, 1);
  var __body54 = cut(____id86, 2);
  add(environment, {});
  var ____o27 = __args20;
  var ____i50 = undefined;
  for (____i50 in ____o27) {
    var ____x545 = ____o27[____i50];
    var __e83;
    if (numeric63(____i50)) {
      __e83 = parseInt(____i50);
    } else {
      __e83 = ____i50;
    }
    var ____i501 = __e83;
    setenv(____x545, {_stash: true, variable: true});
  }
  var ____x546 = join(["%function", __args20], macroexpand(__body54));
  drop(environment);
  return ____x546;
};
var expand_definition = function (__x548) {
  var ____id87 = __x548;
  var __x549 = has(____id87, 0);
  var __name19 = has(____id87, 1);
  var __args21 = has(____id87, 2);
  var __body55 = cut(____id87, 3);
  add(environment, {});
  var ____o28 = __args21;
  var ____i51 = undefined;
  for (____i51 in ____o28) {
    var ____x550 = ____o28[____i51];
    var __e84;
    if (numeric63(____i51)) {
      __e84 = parseInt(____i51);
    } else {
      __e84 = ____i51;
    }
    var ____i511 = __e84;
    setenv(____x550, {_stash: true, variable: true});
  }
  var ____x551 = join([__x549, __name19, __args21], macroexpand(__body55));
  drop(environment);
  return ____x551;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x553) {
  var ____id88 = __x553;
  var __name20 = has(____id88, 0);
  var __body56 = cut(____id88, 1);
  return apply(macro_function(__name20), __body56);
};
real63 = function (x) {
  return number63(x) && ! nan63(x) && ! inf63(x);
};
valid_access63 = function (_str) {
  return _35(_str) > 2 && !( "." === char(_str, 0)) && !( "." === char(_str, edge(_str))) && ! search(_str, "..");
};
parse_access = function (_str) {
  return reduce(function (a, b) {
    var __n40 = number(a);
    if (is63(__n40)) {
      return ["at", b, __n40];
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
        var __x556 = hd(form);
        if (__x556 === "%local") {
          return expand_local(form);
        } else {
          if (__x556 === "%function") {
            return expand_function(form);
          } else {
            if (__x556 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x556 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x556 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x556)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x556)) {
                      return macroexpand(join([parse_access(__x556)], tl(form)));
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
  var ____o29 = form;
  var __k48 = undefined;
  for (__k48 in ____o29) {
    var __v35 = ____o29[__k48];
    var __e85;
    if (numeric63(__k48)) {
      __e85 = parseInt(__k48);
    } else {
      __e85 = __k48;
    }
    var __k49 = __e85;
    if (! number63(__k49)) {
      var __e86;
      if (quasisplice63(__v35, depth)) {
        __e86 = quasiexpand(__v35[1]);
      } else {
        __e86 = quasiexpand(__v35, depth);
      }
      var __v36 = __e86;
      last(__xs14)[__k49] = __v36;
    }
  }
  var ____x560 = form;
  var ____i53 = 0;
  while (____i53 < _35(____x560)) {
    var __x561 = ____x560[____i53];
    if (quasisplice63(__x561, depth)) {
      var __x562 = quasiexpand(__x561[1]);
      add(__xs14, __x562);
      add(__xs14, ["list"]);
    } else {
      add(last(__xs14), quasiexpand(__x561, depth));
    }
    ____i53 = ____i53 + 1;
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
expand_if = function (__x566) {
  var ____id89 = __x566;
  var __a9 = has(____id89, 0);
  var __b7 = has(____id89, 1);
  var __c9 = cut(____id89, 2);
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
  var __i54 = 0;
  while (__i54 < has(setenv("indent-level", {_stash: true, toplevel: true}), "value")) {
    __s3 = __s3 + "  ";
    __i54 = __i54 + 1;
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
    var __e87;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e87 = "L_";
    } else {
      __e87 = "_";
    }
    var __x572 = __e87;
    var __e88;
    if (number_code63(code(id, 0))) {
      __e88 = __x572;
    } else {
      __e88 = "";
    }
    var __id131 = __e88;
    var __i55 = 0;
    while (__i55 < _35(id)) {
      var __c10 = char(id, __i55);
      var __n42 = code(__c10);
      var __e89;
      if (__c10 === "-" && !( id === "-")) {
        var __e92;
        if (__i55 === 0) {
          __e92 = __x572;
        } else {
          __e92 = "_";
        }
        __e89 = __e92;
      } else {
        var __e90;
        if (valid_code63(__n42)) {
          __e90 = __c10;
        } else {
          var __e91;
          if (__i55 === 0) {
            __e91 = __x572 + __n42;
          } else {
            __e91 = __n42;
          }
          __e90 = __e91;
        }
        __e89 = __e90;
      }
      var __c12 = __e89;
      __id131 = __id131 + __c12;
      __i55 = __i55 + 1;
    }
    if (raw63) {
      return __id131;
    } else {
      if (reserved63(__id131)) {
        return __x572 + __id131;
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
  var __x573 = compile_id(x);
  if (has63(__names8, __x573)) {
    var __i56 = __names8[__x573];
    __names8[__x573] = __names8[__x573] + 1;
    return unique(__x573 + __i56);
  } else {
    __names8[__x573] = 1;
    return "__" + __x573;
  }
};
key = function (k) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return k;
  } else {
    var __i57 = inner(k);
    if (valid_id63(__i57)) {
      return __i57;
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
  var __o30 = [];
  var ____o31 = t;
  var __k50 = undefined;
  for (__k50 in ____o31) {
    var __v37 = ____o31[__k50];
    var __e93;
    if (numeric63(__k50)) {
      __e93 = parseInt(__k50);
    } else {
      __e93 = __k50;
    }
    var __k51 = __e93;
    var __x574 = f(__v37);
    if (is63(__x574)) {
      add(__o30, literal(__k51));
      add(__o30, __x574);
    }
  }
  return __o30;
};
var ____x576 = object([]);
var ____x577 = object([]);
____x577.js = "!";
____x577.lua = "not";
____x577.py = "not";
____x576["not"] = ____x577;
var ____x578 = object([]);
____x578.js = "!";
____x578.lua = "not";
____x578.py = "not";
____x576["%not"] = ____x578;
____x576["%unm"] = "-";
var ____x579 = object([]);
____x579["*"] = true;
____x579["/"] = true;
____x579["%"] = true;
____x579["%mul"] = "*";
____x579["%div"] = "/";
____x579["%mod"] = "%";
var ____x580 = object([]);
var ____x581 = object([]);
____x581.js = "+";
____x581.lua = "..";
____x580.cat = ____x581;
var ____x582 = object([]);
____x582.js = "+";
____x582.lua = "..";
____x580["%cat"] = ____x582;
var ____x583 = object([]);
____x583["+"] = true;
____x583["-"] = true;
____x583["%add"] = "+";
____x583["%sub"] = "-";
var ____x584 = object([]);
____x584["<"] = true;
____x584[">"] = true;
____x584["<="] = true;
____x584[">="] = true;
____x584["%lt"] = "<";
____x584["%gt"] = ">";
____x584["%le"] = "<=";
____x584["%ge"] = ">=";
var ____x585 = object([]);
var ____x586 = object([]);
____x586.js = "===";
____x586.lua = "==";
____x586.py = "==";
____x585["="] = ____x586;
var ____x587 = object([]);
____x587.js = "===";
____x587.lua = "==";
____x587.py = "==";
____x585["%eq"] = ____x587;
var ____x588 = object([]);
var ____x589 = object([]);
____x589.js = "&&";
____x589.lua = "and";
____x589.py = "and";
____x588["and"] = ____x589;
var ____x590 = object([]);
____x590.js = "&&";
____x590.lua = "and";
____x590.py = "and";
____x588["%and"] = ____x590;
var ____x591 = object([]);
var ____x592 = object([]);
____x592.js = "||";
____x592.lua = "or";
____x592.py = "or";
____x591["or"] = ____x592;
var ____x593 = object([]);
____x593.js = "||";
____x593.lua = "or";
____x593.py = "or";
____x591["%or"] = ____x593;
var infix = [____x576, ____x579, ____x580, ____x583, ____x584, ____x585, ____x588, ____x591];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["not", "-", "%not", "%unm"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    var ____o32 = infix;
    var __k52 = undefined;
    for (__k52 in ____o32) {
      var __v38 = ____o32[__k52];
      var __e94;
      if (numeric63(__k52)) {
        __e94 = parseInt(__k52);
      } else {
        __e94 = __k52;
      }
      var __k53 = __e94;
      if (has63(__v38, hd(form))) {
        return index(__k53);
      }
    }
  }
  return 0;
};
var getop = function (op) {
  return find(function (level) {
    var __x595 = has(level, op);
    if (__x595 === true) {
      return op;
    } else {
      if (string63(__x595)) {
        return __x595;
      } else {
        if (is63(__x595)) {
          return has(__x595, has(setenv("target", {_stash: true, toplevel: true}), "value"));
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
  var ____x596 = args;
  var ____i60 = 0;
  while (____i60 < _35(____x596)) {
    var __x597 = ____x596[____i60];
    __s4 = __s4 + __c111 + compile(__x597);
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && default63 && ! id_literal63(__x597)) {
      __s4 = __s4 + "=None";
    }
    __c111 = ", ";
    ____i60 = ____i60 + 1;
  }
  return __s4 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s12 = "";
    var __i61 = 0;
    while (__i61 < _35(s)) {
      var __c121 = char(s, __i61);
      var __e95;
      if (__c121 === "\n") {
        __e95 = "\\n";
      } else {
        var __e96;
        if (__c121 === "\r") {
          __e96 = "\\r";
        } else {
          __e96 = __c121;
        }
        __e95 = __e96;
      }
      __s12 = __s12 + __e95;
      __i61 = __i61 + 1;
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
  var ____id90 = form;
  var __x598 = has(____id90, 0);
  var __args22 = cut(____id90, 1);
  var ____id91 = getenv(__x598);
  var __special = has(____id91, "special");
  var __stmt = has(____id91, "stmt");
  var __self_tr63 = has(____id91, "tr");
  var __e97;
  if (stmt63 && ! __stmt) {
    __e97 = indentation();
  } else {
    __e97 = "";
  }
  var __p1 = __e97;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p1 + apply(__special, __args22) + __tr;
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
var method_call63 = function (form) {
  var __e98;
  if (list63(form)) {
    __e98 = hd(form);
  } else {
    __e98 = form;
  }
  var __x599 = __e98;
  return string63(__x599) && _35(__x599, 1) > 1 && char(__x599, 0) === ".";
};
var compile_call = function (form) {
  var __f4 = hd(form);
  var __f11 = compile(__f4);
  var __args23 = stash42(tl(form));
  var __e99;
  if (method_call63(hd(__args23))) {
    __e99 = mapcat(compile, __args23, "");
  } else {
    __e99 = compile_args(__args23);
  }
  var __args24 = __e99;
  if (parenthesize_call63(__f4)) {
    return "(" + __f11 + ")" + __args24;
  } else {
    return __f11 + __args24;
  }
};
var op_delims = function (parent, child) {
  var ____r285 = unstash(Array.prototype.slice.call(arguments, 2));
  var __parent = destash33(parent, ____r285);
  var __child = destash33(child, ____r285);
  var ____id92 = ____r285;
  var __right = has(____id92, "right");
  var __e100;
  if (__right) {
    __e100 = _6261;
  } else {
    __e100 = _62;
  }
  if (__e100(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id93 = form;
  var __op = has(____id93, 0);
  var ____id94 = cut(____id93, 1);
  var __a10 = has(____id94, 0);
  var __b8 = has(____id94, 1);
  var ____id95 = op_delims(form, __a10);
  var __ao = has(____id95, 0);
  var __ac = has(____id95, 1);
  var ____id96 = op_delims(form, __b8, {_stash: true, right: true});
  var __bo = has(____id96, 0);
  var __bc = has(____id96, 1);
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
  var ____x602 = compile(body, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __s5 = ____x602;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && none63(__s5)) {
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
    var ____x603 = indentation() + "pass\n";
    setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
    return ____x603;
  } else {
    return __s5;
  }
};
compile_function = function (args, body) {
  var ____r288 = unstash(Array.prototype.slice.call(arguments, 2));
  var __args25 = destash33(args, ____r288);
  var __body57 = destash33(body, ____r288);
  var ____id97 = ____r288;
  var __name21 = has(____id97, "name");
  var __prefix = has(____id97, "prefix");
  var __async = has(____id97, "async");
  var __e101;
  if (__name21) {
    __e101 = compile(__name21);
  } else {
    __e101 = "";
  }
  var __id98 = __e101;
  var __e102;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && has63(__args25, "rest")) {
    __e102 = join(__args25, ["|...|"]);
  } else {
    var __e103;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py" && has63(__args25, "rest")) {
      __e103 = join(__args25, ["|*_args|", "|**_keys|"]);
    } else {
      __e103 = __args25;
    }
    __e102 = __e103;
  }
  var __args141 = __e102;
  var __args26 = compile_args(__args141, true);
  var __body58 = compile_body(__body57);
  var __ind = indentation();
  var __e104;
  if (__prefix) {
    __e104 = __prefix + " ";
  } else {
    __e104 = "";
  }
  var __p2 = __e104;
  var __e105;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e105 = "";
  } else {
    __e105 = "end";
  }
  var __tr1 = __e105;
  var __e106;
  if (__async && !( has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua")) {
    __e106 = "async ";
  } else {
    __e106 = "";
  }
  var __a12 = __e106;
  if (__name21) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __a12 + "function " + __id98 + __args26 + " {\n" + __body58 + __ind + "}" + __tr1;
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __a12 + "def " + __id98 + __args26 + ":\n" + __body58;
    } else {
      return __p2 + "function " + __id98 + __args26 + "\n" + __body58 + __ind + __tr1;
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "return") && ! statement63(hd(form)));
};
compile = function (form) {
  var ____r290 = unstash(Array.prototype.slice.call(arguments, 1));
  var __form8 = destash33(form, ____r290);
  var ____id99 = ____r290;
  var __stmt1 = has(____id99, "stmt");
  if (nil63(__form8)) {
    return "";
  } else {
    if (special_form63(__form8)) {
      return compile_special(__form8, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e107;
      if (__stmt1) {
        __e107 = indentation();
      } else {
        __e107 = "";
      }
      var __ind1 = __e107;
      var __e108;
      if (atom63(__form8)) {
        __e108 = compile_atom(__form8);
      } else {
        var __e109;
        if (infix63(hd(__form8))) {
          __e109 = compile_infix(__form8);
        } else {
          __e109 = compile_call(__form8);
        }
        __e108 = __e109;
      }
      var __form9 = __e108;
      return __ind1 + __form9 + __tr2;
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e7 = lower(form, __hoist, true, tail63);
  var __e110;
  if (some63(__hoist) && is63(__e7)) {
    __e110 = join(["do"], __hoist, [__e7]);
  } else {
    var __e111;
    if (is63(__e7)) {
      __e111 = __e7;
    } else {
      var __e112;
      if (_35(__hoist) > 1) {
        __e112 = join(["do"], __hoist);
      } else {
        __e112 = hd(__hoist);
      }
      __e111 = __e112;
    }
    __e110 = __e111;
  }
  return either(__e110, ["do"]);
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
  var ____x611 = almost(args);
  var ____i62 = 0;
  while (____i62 < _35(____x611)) {
    var __x612 = ____x611[____i62];
    var ____y8 = lower(__x612, hoist, stmt63);
    if (yes(____y8)) {
      var __e8 = ____y8;
      if (standalone63(__e8)) {
        add(hoist, __e8);
      }
    }
    ____i62 = ____i62 + 1;
  }
  var __e9 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e9)) {
    return ["return", __e9];
  } else {
    return __e9;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id100 = args;
  var __lh4 = has(____id100, 0);
  var __rh4 = has(____id100, 1);
  add(hoist, ["%set", lower(__lh4, hoist), lower(__rh4, hoist)]);
  if (!( stmt63 && ! tail63)) {
    return __lh4;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id101 = args;
  var __cond6 = has(____id101, 0);
  var ___then = has(____id101, 1);
  var ___else = has(____id101, 2);
  if (stmt63) {
    var __e114;
    if (is63(___else)) {
      __e114 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond6, hoist), lower_body([___then], tail63)], __e114));
  } else {
    var __e10 = unique("e");
    add(hoist, ["%local", __e10]);
    var __e113;
    if (is63(___else)) {
      __e113 = [lower(["%set", __e10, ___else])];
    }
    add(hoist, join(["%if", lower(__cond6, hoist), lower(["%set", __e10, ___then])], __e113));
    return __e10;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id102 = args;
  var __a13 = has(____id102, 0);
  var __b10 = has(____id102, 1);
  var __hoist1 = [];
  var __b11 = lower(__b10, __hoist1);
  if (some63(__hoist1)) {
    var __id103 = unique("id");
    var __e115;
    if (x === "and") {
      __e115 = ["%if", __id103, __b10, __id103];
    } else {
      __e115 = ["%if", __id103, __id103, __b10];
    }
    return lower(["do", ["%local", __id103, __a13], __e115], hoist);
  } else {
    return [x, lower(__a13, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id104 = args;
  var __c13 = has(____id104, 0);
  var __body59 = cut(____id104, 1);
  var __pre = [];
  var __c14 = lower(__c13, __pre);
  var __e116;
  if (none63(__pre)) {
    __e116 = ["while", __c14, lower_body(__body59)];
  } else {
    __e116 = ["while", true, join(["do"], __pre, [["%if", ["not", __c14], ["break"]], lower_body(__body59)])];
  }
  return add(hoist, __e116);
};
var lower_for = function (args, hoist) {
  var ____id105 = args;
  var __t6 = has(____id105, 0);
  var __k54 = has(____id105, 1);
  var __body60 = cut(____id105, 2);
  return add(hoist, join(["%for", lower(__t6, hoist), __k54, lower_body(__body60)], keys(__body60)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id106 = args;
  var __t7 = has(____id106, 0);
  var __body61 = cut(____id106, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__t7, hoist), lower_body(__body61, tail63)], keys(__body61)));
  } else {
    var __e11 = unique("e");
    add(hoist, ["%local", __e11]);
    add(hoist, join(["%with", lower(__t7, hoist), lower(["%set", __e11, join(["do"], __body61)])], keys(__body61)));
    return __e11;
  }
};
var lower_block = function (args, hoist, stmt63, tail63) {
  var ____id107 = args;
  var __name22 = has(____id107, 0);
  var __t8 = has(____id107, 1);
  var __body62 = cut(____id107, 2);
  return add(hoist, ["%block", __name22, lower(__t8, hoist), lower_body(__body62, tail63)]);
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __f5 = unique("f");
    return lower(["do", join(["%local-function", __f5], args), __f5], hoist);
  } else {
    var ____id108 = args;
    var __a14 = has(____id108, 0);
    var __body63 = cut(____id108, 1);
    return join(["%function", __a14, lower_body(__body63, true)], keys(__body63));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id109 = args;
  var __name23 = has(____id109, 0);
  var __args27 = has(____id109, 1);
  var __body64 = cut(____id109, 2);
  return add(hoist, join([kind, __name23, __args27, lower_body(__body64, true)], keys(__body64)));
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
    var __e12 = [];
    var ____id110 = form;
    var __x649 = has(____id110, 0);
    var __args28 = cut(____id110, 1);
    reduce(function (a, b) {
      add(__e12, [__x649, a, b]);
      return a;
    }, __args28);
    return join(["and"], reverse(__e12));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form11 = lower_pairwise(form);
  var ____id1111 = __form11;
  var __x652 = has(____id1111, 0);
  var __args29 = cut(____id1111, 1);
  return lower(reduce(function (a, b) {
    return [__x652, b, a];
  }, reverse(__args29)), hoist);
};
var lower_special = function (form, hoist) {
  var __e13 = lower_call(form, hoist);
  if (__e13) {
    return add(hoist, __e13);
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
          var ____id112 = form;
          var __x655 = has(____id112, 0);
          var __args30 = cut(____id112, 1);
          if (__x655 === "do") {
            return lower_do(__args30, hoist, stmt63, tail63);
          } else {
            if (__x655 === "%call") {
              return lower(__args30, hoist, stmt63, tail63);
            } else {
              if (__x655 === "%set") {
                return lower_set(__args30, hoist, stmt63, tail63);
              } else {
                if (__x655 === "%if") {
                  return lower_if(__args30, hoist, stmt63, tail63);
                } else {
                  if (__x655 === "%try") {
                    return lower_try(__args30, hoist, tail63);
                  } else {
                    if (__x655 === "while") {
                      return lower_while(__args30, hoist);
                    } else {
                      if (__x655 === "%for") {
                        return lower_for(__args30, hoist);
                      } else {
                        if (__x655 === "%with") {
                          return lower_with(__args30, hoist, stmt63, tail63);
                        } else {
                          if (__x655 === "%block") {
                            return lower_block(__args30, hoist, stmt63, tail63);
                          } else {
                            if (__x655 === "%function") {
                              return lower_function(__args30, hoist);
                            } else {
                              if (__x655 === "%local-function" || __x655 === "%global-function") {
                                return lower_definition(__x655, __args30, hoist);
                              } else {
                                if (in63(__x655, ["and", "or"])) {
                                  return lower_short(__x655, __args30, hoist);
                                } else {
                                  if (statement63(__x655)) {
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
var __e117;
if (typeof(global) === "undefined") {
  var __e118;
  if (!( typeof(window) === "undefined")) {
    __e118 = window;
  } else {
    var __e119;
    if (!( typeof(self) === "undefined")) {
      __e119 = self;
    } else {
      __e119 = this;
    }
    __e118 = __e119;
  }
  global = __e118;
  __e117 = global;
}
var __e120;
if (!( typeof(require) === "undefined")) {
  global.require = require;
  global.require;
  var __e121;
  if (!( typeof(__module1) === "undefined")) {
    __module1.filename = require("path").resolve("repl");
    __module1.filename;
    __module1.paths = require("module")._nodeModulePaths(__module1.filename);
    __e121 = __module1.paths;
  }
  __e120 = __e121;
}
var run = function (code, context) {
  var __f6 = new Function("with(this) {\n" + code + "\n}");
  return __f6.call(either(context, global));
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
  var __forms5 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s7 = "";
  var ____x660 = __forms5;
  var ____i64 = 0;
  while (____i64 < _35(____x660)) {
    var __x661 = ____x660[____i64];
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" && immediate_call63(__x661) && "\n" === char(__s7, edge(__s7))) {
      __s7 = clip(__s7, 0, edge(__s7)) + ";\n";
    }
    __s7 = __s7 + compile(__x661, {_stash: true, stmt: true});
    if (! atom63(__x661)) {
      if (hd(__x661) === "return" || hd(__x661) === "break") {
        break;
      }
    }
    ____i64 = ____i64 + 1;
  }
  return __s7;
}, stmt: true, tr: true});
setenv("%if", {_stash: true, special: function (cond, cons, alt) {
  var __cond8 = compile(cond);
  var __cons1 = compile_body(cons);
  var __e122;
  if (alt) {
    __e122 = compile_body(alt);
  }
  var __alt1 = __e122;
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
  var __body66 = compile_body(form);
  var __ind5 = indentation();
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind5 + "while (" + __cond10 + ") {\n" + __body66 + __ind5 + "}\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind5 + "while " + __cond10 + ":\n" + __body66;
    } else {
      return __ind5 + "while " + __cond10 + " do\n" + __body66 + __ind5 + "end\n";
    }
  }
}, stmt: true, tr: true});
setenv("%for", {_stash: true, special: function (t, k, form) {
  var ____r326 = unstash(Array.prototype.slice.call(arguments, 3));
  var __t11 = destash33(t, ____r326);
  var __k57 = destash33(k, ____r326);
  var __form13 = destash33(form, ____r326);
  var ____id114 = ____r326;
  var __async2 = has(____id114, "async");
  var __t12 = compile(__t11);
  var __k58 = compile(__k57);
  var __ind7 = indentation();
  var __body68 = compile_body(__form13);
  var __e123;
  if (__async2) {
    __e123 = "async ";
  } else {
    __e123 = "";
  }
  var __a16 = __e123;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    return __ind7 + "for " + __k58 + " in next, " + __t12 + " do\n" + __body68 + __ind7 + "end\n";
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      return __ind7 + __a16 + "for " + __k58 + " in " + __t12 + ":\n" + __body68;
    } else {
      return __ind7 + "for (" + __k58 + " in " + __t12 + ") {\n" + __body68 + __ind7 + "}\n";
    }
  }
}, stmt: true, tr: true});
setenv("%with", {_stash: true, special: function (t, form) {
  var ____r328 = unstash(Array.prototype.slice.call(arguments, 2));
  var __t15 = destash33(t, ____r328);
  var __form15 = destash33(form, ____r328);
  var ____id116 = ____r328;
  var __async4 = has(____id116, "async");
  var __t16 = compile(__t15);
  var __ind9 = indentation();
  var __body70 = compile_body(__form15);
  var __e124;
  if (__async4) {
    __e124 = "async ";
  } else {
    __e124 = "";
  }
  var __a18 = __e124;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return __ind9 + __a18 + "with " + __t16 + ":\n" + __body70;
  } else {
    return "";
  }
}, stmt: true, tr: true});
setenv("%block", {_stash: true, special: function (name, t, form) {
  var __t18 = compile(t);
  var __ind11 = indentation();
  var __body72 = compile_body(form);
  var __e125;
  if (some63(__t18)) {
    __e125 = " ";
  } else {
    __e125 = "";
  }
  var __sep1 = __e125;
  return __ind11 + name + __sep1 + __t18 + ":\n" + __body72;
}, stmt: true, tr: true});
setenv("%try", {_stash: true, special: function (form) {
  var __ind13 = indentation();
  var __body74 = compile_body(form);
  var __e126;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e126 = ["do", ["import", "sys"], ["%local", "e", [["idx", "sys", "exc_info"]]], ["return", ["%array", false, ["get", "e", 1], "e"]]];
  } else {
    __e126 = ["return", ["%array", false, "e"]];
  }
  var __hf1 = __e126;
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") + 1;
  var ____x683 = compile(__hf1, {_stash: true, stmt: true});
  setenv("indent-level", {_stash: true, toplevel: true}).value = has(setenv("indent-level", {_stash: true, toplevel: true}), "value") - 1;
  var __h1 = ____x683;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return __ind13 + "try {\n" + __body74 + __ind13 + "}\n" + __ind13 + "catch (e) {\n" + __h1 + __ind13 + "}\n";
  } else {
    return __ind13 + "try:\n" + __body74 + __ind13 + "except:\n" + __h1;
  }
}, stmt: true, tr: true});
setenv("%delete", {_stash: true, special: function (place) {
  var __e127;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e127 = "del ";
  } else {
    __e127 = "delete ";
  }
  return indentation() + __e127 + compile(place);
}, stmt: true});
setenv("break", {_stash: true, special: function () {
  return indentation() + "break";
}, stmt: true});
setenv("%function", {_stash: true, special: function (args) {
  var ____r338 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args32 = destash33(args, ____r338);
  var ____id118 = ____r338;
  var __body76 = cut(____id118, 0);
  return apply(compile_function, join([__args32], __body76, []));
}});
setenv("%global-function", {_stash: true, special: function (name, args) {
  var ____r340 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name25 = destash33(name, ____r340);
  var __args34 = destash33(args, ____r340);
  var ____id120 = ____r340;
  var __body78 = cut(____id120, 0);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var ____x694 = object([__args34]);
    ____x694.name = __name25;
    var ____x695 = object([]);
    ____x695.name = __name25;
    var __x693 = apply(compile_function, join(____x694, __body78, ____x695));
    return indentation() + __x693;
  } else {
    return compile(["%set", __name25, join(["%function", __args34], __body78)], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("%local-function", {_stash: true, special: function (name, args) {
  var ____r342 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name27 = destash33(name, ____r342);
  var __args36 = destash33(args, ____r342);
  var ____id122 = ____r342;
  var __body80 = cut(____id122, 0);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var ____x704 = object([__args36]);
    ____x704.name = __name27;
    ____x704.prefix = "local";
    var ____x705 = object([]);
    ____x705.name = __name27;
    ____x705.prefix = "local";
    var __x703 = apply(compile_function, join(____x704, __body80, ____x705));
    return indentation() + __x703;
  } else {
    return compile(["%local", __name27, join(["%function", __args36], __body80)], {_stash: true, stmt: true});
  }
}, stmt: true, tr: true});
setenv("return", {_stash: true, special: function (x) {
  var __e128;
  if (nil63(x)) {
    __e128 = "return";
  } else {
    __e128 = "return " + compile(x);
  }
  var __x709 = __e128;
  return indentation() + __x709;
}, stmt: true});
setenv("new", {_stash: true, special: function (x) {
  return "new " + compile(x);
}});
setenv("typeof", {_stash: true, special: function (x) {
  return "typeof(" + compile(x) + ")";
}});
setenv("error", {_stash: true, special: function (x) {
  var __e129;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e129 = "throw " + compile(["new", ["Error", x]]);
  } else {
    var __e130;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e130 = "raise " + compile(["Exception", x]);
    } else {
      __e130 = "error(" + compile(x) + ")";
    }
    __e129 = __e130;
  }
  var __e24 = __e129;
  return indentation() + __e24;
}, stmt: true});
setenv("throw", {_stash: true, special: function (x) {
  var __e131;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e131 = "throw " + compile(x);
  } else {
    var __e132;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
      __e132 = "raise " + compile(x);
    } else {
      __e132 = "error(" + compile(x) + ")";
    }
    __e131 = __e132;
  }
  var __e28 = __e131;
  return indentation() + __e28;
}, stmt: true});
setenv("%local", {_stash: true, special: function (name, value) {
  if (nil63(value) && has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    value = "nil";
  }
  var __id124 = compile(name);
  var __value12 = compile(value);
  var __e133;
  if (is63(value)) {
    __e133 = " = " + __value12;
  } else {
    __e133 = "";
  }
  var __rh6 = __e133;
  var __e134;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    __e134 = "var ";
  } else {
    var __e135;
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      __e135 = "local ";
    } else {
      __e135 = "";
    }
    __e134 = __e135;
  }
  var __keyword3 = __e134;
  var __ind15 = indentation();
  return __ind15 + __keyword3 + __id124 + __rh6;
}, stmt: true});
setenv("%set", {_stash: true, special: function (lh, rh) {
  var __lh6 = compile(lh);
  var __e136;
  if (nil63(rh)) {
    __e136 = "nil";
  } else {
    __e136 = rh;
  }
  var __rh8 = compile(__e136);
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
  var __forms7 = unstash(Array.prototype.slice.call(arguments, 0));
  var __e137;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e137 = "{";
  } else {
    __e137 = "[";
  }
  var __open1 = __e137;
  var __e138;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e138 = "}";
  } else {
    __e138 = "]";
  }
  var __close1 = __e138;
  var __s111 = "";
  var __c16 = "";
  var ____o34 = __forms7;
  var __k61 = undefined;
  for (__k61 in ____o34) {
    var __v40 = ____o34[__k61];
    var __e139;
    if (numeric63(__k61)) {
      __e139 = parseInt(__k61);
    } else {
      __e139 = __k61;
    }
    var __k62 = __e139;
    if (number63(__k62)) {
      __s111 = __s111 + __c16 + compile(__v40);
      __c16 = ", ";
    }
  }
  return __open1 + __s111 + __close1;
}});
setenv("%object", {_stash: true, special: function () {
  var __forms9 = unstash(Array.prototype.slice.call(arguments, 0));
  var __s13 = "{";
  var __c18 = "";
  var __e140;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e140 = " = ";
  } else {
    __e140 = ": ";
  }
  var __sep3 = __e140;
  var ____o36 = pair(__forms9);
  var __k66 = undefined;
  for (__k66 in ____o36) {
    var __v43 = ____o36[__k66];
    var __e141;
    if (numeric63(__k66)) {
      __e141 = parseInt(__k66);
    } else {
      __e141 = __k66;
    }
    var __k67 = __e141;
    if (number63(__k67)) {
      var ____id126 = __v43;
      var __k68 = has(____id126, 0);
      var __v44 = has(____id126, 1);
      if (! string63(__k68)) {
        throw new Error("Illegal key: " + _str(__k68));
      }
      __s13 = __s13 + __c18 + key(__k68) + __sep3 + compile(__v44);
      __c18 = ", ";
    }
  }
  return __s13 + "}";
}});
setenv("%list", {_stash: true, special: function (form, comps, cond) {
  var __s15 = compile(form);
  var ____x717 = comps;
  var ____i70 = 0;
  while (____i70 < _35(____x717)) {
    var ____id128 = ____x717[____i70];
    var __k70 = has(____id128, 0);
    var __v46 = has(____id128, 1);
    __s15 = __s15 + " for " + compile(__k70) + " in " + compile(__v46);
    ____i70 = ____i70 + 1;
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
  var ____r366 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name29 = destash33(name, ____r366);
  var ____id1311 = ____r366;
  var __alias1 = cut(____id1311, 0);
  var __ind17 = indentation();
  var __e142;
  if (hd(__alias1) === "as") {
    __e142 = __alias1[1];
  } else {
    __e142 = hd(__alias1);
  }
  var __as1 = __e142;
  var __id132 = __as1 || __name29;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    var __s17 = __ind17 + "import " + compile(__name29);
    if (__as1) {
      __s17 = __s17 + " as " + compile(__id132);
    }
    return __s17;
  } else {
    return __ind17 + compile(["%local", __id132, ["require", escape(__name29)]]);
  }
}, stmt: true});
setenv("from", {_stash: true, special: function (name) {
  var ____r369 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name31 = destash33(name, ____r369);
  var ____id135 = ____r369;
  var __imports1 = cut(____id135, 0);
  var __ind19 = indentation();
  var __id136 = __name31;
  var __e143;
  if (hd(__imports1) === "import") {
    __e143 = tl(__imports1);
  } else {
    __e143 = __imports1;
  }
  var __names11 = __e143;
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
  var __e144;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
    __e144 = "";
  } else {
    __e144 = "await ";
  }
  var __a20 = __e144;
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
