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
      var __e11 = undefined;
      if (numeric63(__k)) {
        __e11 = parseInt(__k);
      } else {
        __e11 = __k;
      }
      var __k1 = __e11;
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
      var __e12 = undefined;
      if (numeric63(__k2)) {
        __e12 = parseInt(__k2);
      } else {
        __e12 = __k2;
      }
      var __k3 = __e12;
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
    var __e13 = undefined;
    if (numeric63(__k4)) {
      __e13 = parseInt(__k4);
    } else {
      __e13 = __k4;
    }
    var __k5 = __e13;
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
  var __e14 = undefined;
  if (nil63(_from) || _from < 0) {
    __e14 = 0;
  } else {
    __e14 = _from;
  }
  var __i3 = __e14;
  var __n4 = _35(x);
  var __e15 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e15 = __n4;
  } else {
    __e15 = upto;
  }
  var __upto1 = __e15;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e16 = undefined;
    if (numeric63(__k6)) {
      __e16 = parseInt(__k6);
    } else {
      __e16 = __k6;
    }
    var __k7 = __e16;
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
    var __e17 = undefined;
    if (numeric63(__k8)) {
      __e17 = parseInt(__k8);
    } else {
      __e17 = __k8;
    }
    var __k9 = __e17;
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
        var __e18 = undefined;
        if (numeric63(__k10)) {
          __e18 = parseInt(__k10);
        } else {
          __e18 = __k10;
        }
        var __k11 = __e18;
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
    var __e19 = undefined;
    if (numeric63(____i9)) {
      __e19 = parseInt(____i9);
    } else {
      __e19 = ____i9;
    }
    var ____i91 = __e19;
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
    var __e20 = undefined;
    if (numeric63(__k12)) {
      __e20 = parseInt(__k12);
    } else {
      __e20 = __k12;
    }
    var __k13 = __e20;
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
    var __e21 = undefined;
    if (f) {
      __e21 = f(__v8);
    } else {
      __e21 = __v8;
    }
    var __y4 = __e21;
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
    var __e22 = undefined;
    if (numeric63(__k14)) {
      __e22 = parseInt(__k14);
    } else {
      __e22 = __k14;
    }
    var __k15 = __e22;
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
    var __e23 = undefined;
    if (numeric63(____i16)) {
      __e23 = parseInt(____i16);
    } else {
      __e23 = ____i16;
    }
    var ____i161 = __e23;
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
      var __e24 = undefined;
      if (numeric63(__k16)) {
        __e24 = parseInt(__k16);
      } else {
        __e24 = __k16;
      }
      var __k17 = __e24;
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
        var __e26 = undefined;
        if (numeric63(__k18)) {
          __e26 = parseInt(__k18);
        } else {
          __e26 = __k18;
        }
        var __k19 = __e26;
        if (!( __k19 === "_stash")) {
          __args1[__k19] = __v11;
        }
      }
      if (params) {
        var ____o12 = params;
        var __k20 = undefined;
        for (__k20 in ____o12) {
          var __v12 = ____o12[__k20];
          var __e27 = undefined;
          if (numeric63(__k20)) {
            __e27 = parseInt(__k20);
          } else {
            __e27 = __k20;
          }
          var __k21 = __e27;
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
          var __e25 = undefined;
          if (numeric63(__k22)) {
            __e25 = parseInt(__k22);
          } else {
            __e25 = __k22;
          }
          var __k23 = __e25;
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
      var __e28 = undefined;
      if (numeric63(__k24)) {
        __e28 = parseInt(__k24);
      } else {
        __e28 = __k24;
      }
      var __k25 = __e28;
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
  var __e29 = undefined;
  if (is63(pos)) {
    __e29 = clip(_str, pos);
  } else {
    __e29 = _str;
  }
  var ___str = __e29;
  if (_35(x) > _35(___str)) {
    return false;
  } else {
    return x === clip(___str, _35(___str) - _35(x));
  }
};
string_starts63 = function (_str, x, pos) {
  var __e30 = undefined;
  if (is63(pos)) {
    __e30 = clip(_str, pos);
  } else {
    __e30 = _str;
  }
  var ___str1 = __e30;
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
      var __e31 = undefined;
      if (__c1 === "\n") {
        __e31 = "\\n";
      } else {
        var __e32 = undefined;
        if (__c1 === "\r") {
          __e32 = "\\r";
        } else {
          var __e33 = undefined;
          if (__c1 === "\"") {
            __e33 = "\\\"";
          } else {
            var __e34 = undefined;
            if (__c1 === "\\") {
              __e34 = "\\\\";
            } else {
              __e34 = __c1;
            }
            __e33 = __e34;
          }
          __e32 = __e33;
        }
        __e31 = __e32;
      }
      var __c11 = __e31;
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
                        var __e35 = undefined;
                        if (numeric63(__k26)) {
                          __e35 = parseInt(__k26);
                        } else {
                          __e35 = __k26;
                        }
                        var __k27 = __e35;
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
    var __e36 = undefined;
    if (has63(__keys, "toplevel")) {
      __e36 = hd(environment);
    } else {
      __e36 = last(environment);
    }
    var __frame = __e36;
    var __e37 = undefined;
    if (has63(__frame, __k29)) {
      __e37 = __frame[__k29];
    } else {
      __e37 = {};
    }
    var __entry = __e37;
    var ____o16 = __keys;
    var __k30 = undefined;
    for (__k30 in ____o16) {
      var __v18 = ____o16[__k30];
      var __e38 = undefined;
      if (numeric63(__k30)) {
        __e38 = parseInt(__k30);
      } else {
        __e38 = __k30;
      }
      var __k31 = __e38;
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
  return join(["%do"], map(function (__x23) {
    var ____id6 = __x23;
    var __lh1 = has(____id6, 0);
    var __rh1 = has(____id6, 1);
    __lh1 = macroexpand(__lh1);
    if (! atom63(__lh1) && hd(__lh1) === "has") {
      return ["%set", join(["%get"], tl(__lh1)), __rh1];
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
  return ["%get", l, i];
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
    var __x48 = unique("x");
    var __l10 = [];
    var __forms1 = [];
    var ____o18 = __body2;
    var __k34 = undefined;
    for (__k34 in ____o18) {
      var __v20 = ____o18[__k34];
      var __e39 = undefined;
      if (numeric63(__k34)) {
        __e39 = parseInt(__k34);
      } else {
        __e39 = __k34;
      }
      var __k35 = __e39;
      if (number63(__k35)) {
        __l10[__k35] = __v20;
      } else {
        add(__forms1, ["%set", ["%get", __x48, ["quote", __k35]], __v20]);
      }
    }
    if (some63(__forms1)) {
      return join(["let", __x48, ["object", join(["%array"], __l10)]], __forms1, [__x48]);
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
  var ____r107 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expr5 = destash33(expr, ____r107);
  var ____id15 = ____r107;
  var __clauses1 = cut(____id15, 0);
  var __x68 = unique("x");
  var __eq1 = function (_) {
    return ["=", ["quote", _], __x68];
  };
  var __cl1 = function (__x71) {
    var ____id16 = __x71;
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
  return ["let", __x68, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
}});
setenv("when", {_stash: true, macro: function (cond) {
  var ____r111 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond3 = destash33(cond, ____r111);
  var ____id18 = ____r111;
  var __body5 = cut(____id18, 0);
  return ["%if", __cond3, join(["%do"], __body5)];
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var ____r113 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond5 = destash33(cond, ____r113);
  var ____id20 = ____r113;
  var __body7 = cut(____id20, 0);
  return ["%if", ["%not", __cond5], join(["%do"], __body7)];
}});
setenv("obj", {_stash: true, macro: function () {
  var __body9 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%object"], mapo(function (x) {
    return x;
  }, __body9));
}});
setenv("let", {_stash: true, macro: function (bs) {
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
}});
setenv("with", {_stash: true, macro: function (x, v) {
  var ____r119 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x114 = destash33(x, ____r119);
  var __v22 = destash33(v, ____r119);
  var ____id30 = ____r119;
  var __body13 = cut(____id30, 0);
  if (__v22 === "as") {
    return join(["%with", ["%as", __x114, hd(__body13)]], tl(__body13));
  } else {
    if (! atom63(__x114) || has(__body13, "async")) {
      return join(["%with", __x114, __v22], __body13);
    } else {
      return join(["let", [__x114, __v22]], __body13, [__x114]);
    }
  }
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var ____r121 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x127 = destash33(x, ____r121);
  var __v24 = destash33(v, ____r121);
  var ____id32 = ____r121;
  var __body15 = cut(____id32, 0);
  var __y6 = unique("y");
  return ["let", __y6, __v24, ["when", ["yes", __y6], join(["let", [__x127, __y6]], __body15)]];
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var ____r123 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name1 = destash33(name, ____r123);
  var __args5 = destash33(args, ____r123);
  var ____id34 = ____r123;
  var __body17 = cut(____id34, 0);
  var ____x136 = object(["setenv", ["quote", __name1]]);
  ____x136.macro = join(["fn", __args5], __body17);
  var __form1 = ____x136;
  _eval(__form1);
  return __form1;
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var ____r125 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name3 = destash33(name, ____r125);
  var __args7 = destash33(args, ____r125);
  var ____id36 = ____r125;
  var __body19 = cut(____id36, 0);
  var ____x142 = object(["setenv", ["quote", __name3]]);
  ____x142.special = join(["fn", __args7], __body19);
  var __form3 = join(____x142, keys(__body19));
  _eval(__form3);
  return __form3;
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var ____x148 = object(["setenv", ["quote", name]]);
  ____x148.symbol = ["quote", expansion];
  return ____x148;
}});
setenv("define-reader", {_stash: true, macro: function (__x156) {
  var ____r129 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x156 = destash33(__x156, ____r129);
  var ____id39 = ____x156;
  var __char1 = has(____id39, 0);
  var __s2 = has(____id39, 1);
  var ____id40 = ____r129;
  var __body21 = cut(____id40, 0);
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body21)];
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var ____r131 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name5 = destash33(name, ____r131);
  var __x164 = destash33(x, ____r131);
  var ____id42 = ____r131;
  var __body23 = cut(____id42, 0);
  setenv(__name5, {_stash: true, variable: true});
  if (some63(__body23)) {
    return join(["%local-function", __name5], bind42(__x164, __body23), keys(__body23));
  } else {
    return join(["%local", __name5, __x164], keys(__body23));
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var ____r133 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name7 = destash33(name, ____r133);
  var __x170 = destash33(x, ____r133);
  var ____id44 = ____r133;
  var __body25 = cut(____id44, 0);
  setenv(__name7, {_stash: true, toplevel: true, variable: true});
  if (some63(__body25)) {
    return join(["%global-function", __name7], bind42(__x170, __body25), keys(__body25));
  } else {
    return join(["set", __name7, __x170], keys(__body25));
  }
}});
setenv("get-value", {_stash: true, macro: function (x) {
  var ____x177 = object(["setenv", x]);
  ____x177.toplevel = true;
  return ["has", ____x177, ["quote", "value"]];
}});
setenv("define-constant", {_stash: true, macro: function (name, x) {
  var ____x188 = object(["setenv", ["quote", name]]);
  ____x188.toplevel = true;
  ____x188.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x188, ["define-symbol", name, ["get-value", ["quote", name]]]];
}});
setenv("define-variable", {_stash: true, macro: function (name, x) {
  if (is63(x)) {
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]];
  } else {
    return ["define-constant", name];
  }
}});
setenv("after", {_stash: true, macro: function (x) {
  var ____r142 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x219 = destash33(x, ____r142);
  var ____id46 = ____r142;
  var __body27 = cut(____id46, 0);
  var __ok1 = unique("ok");
  var __r143 = unique("r");
  var ____x220 = object(["target", ["with", __r143, "nil", ["%block", "try", "||", ["set", __r143, __x219]], ["%block", "finally", "||", join(["%do"], __body27)]]]);
  ____x220.lua = join(["let", [[__ok1, __r143], ["guard", __x219]]], __body27, [["if", __ok1, __r143, ["throw", __r143]]]);
  return ____x220;
}});
setenv("with-frame", {_stash: true, macro: function () {
  var __body29 = unstash(Array.prototype.slice.call(arguments, 0));
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body29), ["drop", "environment"]]];
}});
setenv("with-values", {_stash: true, macro: function () {
  var __body31 = unstash(Array.prototype.slice.call(arguments, 0));
  var __forms3 = [];
  var ____o20 = __body31;
  var __k38 = undefined;
  for (__k38 in ____o20) {
    var __v26 = ____o20[__k38];
    var __e40 = undefined;
    if (numeric63(__k38)) {
      __e40 = parseInt(__k38);
    } else {
      __e40 = __k38;
    }
    var __k39 = __e40;
    if (! number63(__k39)) {
      var ____x249 = object(["setenv", ["quote", __k39]]);
      ____x249.value = __v26;
      add(__forms3, ____x249);
    }
  }
  return join(["with-frame"], __forms3);
}});
setenv("with-bindings", {_stash: true, macro: function (__x256) {
  var ____r145 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x256 = destash33(__x256, ____r145);
  var ____id49 = ____x256;
  var __names3 = has(____id49, 0);
  var ____id50 = ____r145;
  var __body33 = cut(____id50, 0);
  var __x257 = unique("x");
  var ____x260 = object(["setenv", __x257]);
  ____x260.variable = true;
  return join(["with-frame", ["each", __x257, __names3, ____x260]], __body33);
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
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
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var ____r155 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expansions1 = destash33(expansions, ____r155);
  var ____id55 = ____r155;
  var __body37 = cut(____id55, 0);
  add(environment, {});
  var ____r156 = undefined;
  try{
    map(function (__x268) {
      var ____id56 = __x268;
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
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var ____r160 = unstash(Array.prototype.slice.call(arguments, 1));
  var __names5 = destash33(names, ____r160);
  var ____id58 = ____r160;
  var __body39 = cut(____id58, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names5);
  return join(["let", apply(join, __bs3)], __body39);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var ____r163 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args9 = destash33(args, ____r163);
  var ____id60 = ____r163;
  var __body41 = cut(____id60, 0);
  return join(["%function"], bind42(__args9, __body41), keys(__body41));
}});
setenv("apply", {_stash: true, macro: function (f) {
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
}});
setenv("guard", {_stash: true, macro: function (expr) {
  var ____x329 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x341 = object(["obj"]);
  ____x341.stack = [["idx", "debug", "traceback"]];
  ____x341.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x329.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x341]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x329];
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var ____r169 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x368 = destash33(x, ____r169);
  var __t3 = destash33(t, ____r169);
  var ____id65 = ____r169;
  var __body43 = cut(____id65, 0);
  var __o22 = unique("o");
  var __n30 = unique("n");
  var __i36 = unique("i");
  var __e41 = undefined;
  if (atom63(__x368)) {
    __e41 = [__i36, __x368];
  } else {
    var __e42 = undefined;
    if (_35(__x368) > 1) {
      __e42 = __x368;
    } else {
      __e42 = [__i36, hd(__x368)];
    }
    __e41 = __e42;
  }
  var ____id66 = __e41;
  var __k41 = has(____id66, 0);
  var __v28 = has(____id66, 1);
  var ____x374 = object(["target", __o22]);
  ____x374.py = ["indices", __o22];
  var __e43 = undefined;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e43 = __body43;
  } else {
    __e43 = [join(["let", __k41, ["if", ["numeric?", __k41], ["parseInt", __k41], __k41]], __body43)];
  }
  return ["let", [__o22, __t3, __k41, "nil"], join(["%for", ____x374, __k41], keys(__body43), [join(["let", [__v28, ["%get", __o22, __k41]]], __e43)])];
}});
setenv("for", {_stash: true, macro: function (i, to) {
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
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var ____r173 = unstash(Array.prototype.slice.call(arguments, 2));
  var __v30 = destash33(v, ____r173);
  var __t5 = destash33(t, ____r173);
  var ____id70 = ____r173;
  var __body47 = cut(____id70, 0);
  var __x407 = unique("x");
  var __i40 = unique("i");
  return ["let", [__x407, __t5], ["for", __i40, ["#", __x407], join(["let", [__v30, ["at", __x407, __i40]]], __body47)]];
}});
setenv("set-of", {_stash: true, macro: function () {
  var __xs13 = unstash(Array.prototype.slice.call(arguments, 0));
  var __l121 = [];
  var ____o24 = __xs13;
  var ____i42 = undefined;
  for (____i42 in ____o24) {
    var __x417 = ____o24[____i42];
    var __e44 = undefined;
    if (numeric63(____i42)) {
      __e44 = parseInt(____i42);
    } else {
      __e44 = ____i42;
    }
    var ____i421 = __e44;
    __l121[__x417] = true;
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
  var ____r179 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a6 = destash33(a, ____r179);
  var ____id72 = ____r179;
  var __bs5 = cut(____id72, 0);
  return ["set", __a6, join(["join", __a6], __bs5)];
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var ____r181 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a8 = destash33(a, ____r181);
  var ____id74 = ____r181;
  var __bs7 = cut(____id74, 0);
  return ["set", __a8, join(["cat", __a8], __bs7)];
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  var __e45 = undefined;
  if (nil63(by)) {
    __e45 = 1;
  } else {
    __e45 = by;
  }
  return ["set", n, ["+", n, __e45]];
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  var __e46 = undefined;
  if (nil63(by)) {
    __e46 = 1;
  } else {
    __e46 = by;
  }
  return ["set", n, ["-", n, __e46]];
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var __x444 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x444, form, ["dec", "indent-level"]]];
}});
setenv("export", {_stash: true, macro: function () {
  var __names7 = unstash(Array.prototype.slice.call(arguments, 0));
  var __forms5 = map(function (k) {
    if (k === compile(k)) {
      return ["%set", ["idx", "exports", k], k];
    } else {
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]];
    }
  }, __names7);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return join(["%do"], __forms5);
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms5, [["return", "exports"]]);
    }
  }
}});
setenv("when-compiling", {_stash: true, macro: function () {
  var __body49 = unstash(Array.prototype.slice.call(arguments, 0));
  return _eval(join(["%do"], __body49));
}});
setenv("during-compilation", {_stash: true, macro: function () {
  var __body51 = unstash(Array.prototype.slice.call(arguments, 0));
  var __form5 = join(["%do"], __body51);
  _eval(__form5);
  return __form5;
}});
setenv("def", {_stash: true, macro: function (name) {
  var ____r191 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name11 = destash33(name, ____r191);
  var ____id76 = ____r191;
  var __body53 = cut(____id76, 0);
  return join(["define-global", __name11], __body53);
}});
setenv("mac", {_stash: true, macro: function (name) {
  var ____r193 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name13 = destash33(name, ____r193);
  var ____id78 = ____r193;
  var __body55 = cut(____id78, 0);
  return join(["define-macro", __name13], __body55);
}});
setenv("defconst", {_stash: true, macro: function (name) {
  var ____r195 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name15 = destash33(name, ____r195);
  var ____id80 = ____r195;
  var __value1 = cut(____id80, 0);
  return join(["def", __name15], __value1);
}});
setenv("undefined?", {_stash: true, macro: function (name) {
  var ____x496 = object(["target"]);
  ____x496.js = ["=", ["typeof", name], "\"undefined\""];
  ____x496.lua = ["=", ["idx", "_G", name], "nil"];
  ____x496.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x496;
}});
setenv("defvar", {_stash: true, macro: function (name) {
  var ____r199 = unstash(Array.prototype.slice.call(arguments, 1));
  var __name17 = destash33(name, ____r199);
  var ____id82 = ____r199;
  var __value3 = cut(____id82, 0);
  var ____x512 = object(["target"]);
  ____x512.py = ["global", __name17];
  return ["when", ["undefined?", __name17], ____x512, join(["defconst", __name17], __value3)];
}});
setenv("async", {_stash: true, macro: function (keyword) {
  var ____r201 = unstash(Array.prototype.slice.call(arguments, 1));
  var __keyword1 = destash33(keyword, ____r201);
  var ____id84 = ____r201;
  var __body57 = cut(____id84, 0);
  var ____x516 = object([__keyword1]);
  ____x516.async = true;
  return join(____x516, __body57);
}});
setenv("%read-from-file", {_stash: true, macro: function (name) {
  return ["when-compiling", ["quasiquote", ["%do", ["unquote-splicing", ["read-from-file", name]]]]];
}});
setenv("the", {_stash: true, macro: function (name) {
  return ["getenv", ["quote", name], ["quote", "value"]];
}});
setenv("cat", {_stash: true, macro: function (a) {
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
        var ____x540 = object(["target", join(["%cat", __a10], __bs9)]);
        ____x540.py = join(["%call", "cat", __a10], __bs9);
        return ____x540;
      } else {
        var ____x543 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]]);
        ____x543.py = join(["%call", "cat", __a10], __bs9);
        return ____x543;
      }
    }
  }
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
setenv("//", {_stash: true, macro: function () {
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
}});
setenv("%", {_stash: true, macro: function () {
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
}});
setenv("<", {_stash: true, macro: function (a) {
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
}});
setenv("<=", {_stash: true, macro: function (a) {
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
}});
setenv("=", {_stash: true, macro: function (a) {
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
}});
setenv(">=", {_stash: true, macro: function (a) {
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
}});
setenv(">", {_stash: true, macro: function (a) {
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
}});
setenv("not", {_stash: true, macro: function () {
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
}});
setenv("and", {_stash: true, macro: function (a) {
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
}});
setenv("or", {_stash: true, macro: function (a) {
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
}});
setenv("break", {_stash: true, macro: function () {
  var __args27 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%break"], __args27);
}});
setenv("return", {_stash: true, macro: function () {
  var __args29 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%return"], __args29);
}});
setenv("while", {_stash: true, macro: function (c) {
  var ____r223 = unstash(Array.prototype.slice.call(arguments, 1));
  var __c3 = destash33(c, ____r223);
  var ____id102 = ____r223;
  var __body59 = cut(____id102, 0);
  return join(["%while", __c3], __body59);
}});
setenv("do", {_stash: true, macro: function () {
  var __body61 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%do"], __body61);
}});
setenv("get", {_stash: true, macro: function () {
  var __args31 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%get"], __args31);
}});
setenv("idx", {_stash: true, macro: function () {
  var __args33 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%idx"], __args33);
}});
setenv("new", {_stash: true, macro: function () {
  var __args35 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%new"], __args35);
}});
setenv("typeof", {_stash: true, macro: function () {
  var __args37 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%typeof"], __args37);
}});
setenv("error", {_stash: true, macro: function () {
  var __args39 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%error"], __args39);
}});
setenv("throw", {_stash: true, macro: function () {
  var __args41 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%throw"], __args41);
}});
setenv("raise", {_stash: true, macro: function () {
  var __args43 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%throw"], __args43);
}});
setenv("is", {_stash: true, macro: function () {
  var __args45 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%is"], __args45);
}});
setenv("in", {_stash: true, macro: function () {
  var __args47 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%in"], __args47);
}});
setenv("as", {_stash: true, macro: function () {
  var __args49 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%as"], __args49);
}});
setenv("%expand-case", {_stash: true, macro: function (x) {
  var ____r225 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x654 = destash33(x, ____r225);
  var ____id105 = ____r225;
  var __body63 = cut(____id105, 0);
  var __e47 = undefined;
  if (atom63(__x654)) {
    __e47 = [__x654];
  } else {
    __e47 = __x654;
  }
  var ____id106 = __e47;
  var __a26 = has(____id106, 0);
  var __bs25 = cut(____id106, 1);
  var __e48 = undefined;
  if (none63(__bs25)) {
    __e48 = [["%literal"]];
  } else {
    __e48 = __bs25;
  }
  return join(["%block", __a26], __e48, __body63);
}});
setenv("%cases", {_stash: true, macro: function () {
  var __args51 = unstash(Array.prototype.slice.call(arguments, 0));
  if (none63(__args51)) {
    return ["do"];
  } else {
    if (one63(__args51)) {
      return join(["%expand-case"], hd(__args51));
    } else {
      var __r228 = unique("r");
      return join(["with", __r228, "nil"], map(function (__x672) {
        var ____id108 = __x672;
        var __x673 = has(____id108, 0);
        var __body65 = cut(____id108, 1);
        return ["%expand-case", __x673, ["%set", __r228, join(["%do"], __body65)]];
      }, almost(__args51)), [join(["%expand-case"], last(__args51))]);
    }
  }
}});
setenv("try", {_stash: true, macro: function (x) {
  var ____r231 = unstash(Array.prototype.slice.call(arguments, 1));
  var __x692 = destash33(x, ____r231);
  var ____id113 = ____r231;
  var __cases1 = cut(____id113, 0);
  var __fin1 = ["finally"];
  var ____o26 = __cases1;
  var ____i45 = undefined;
  for (____i45 in ____o26) {
    var __x694 = ____o26[____i45];
    var __e49 = undefined;
    if (numeric63(____i45)) {
      __e49 = parseInt(____i45);
    } else {
      __e49 = ____i45;
    }
    var ____i451 = __e49;
    if (hd63(__x694, "finally")) {
      __fin1 = __x694;
    }
  }
  var __forms7 = [];
  var ____x697 = __cases1;
  var ____i46 = 0;
  while (____i46 < _35(____x697)) {
    var ____id114 = ____x697[____i46];
    var __x698 = has(____id114, 0);
    var __body69 = cut(____id114, 1);
    if (__x698 === "finally") {
    } else {
      if (__x698 === "except" && has(__body69, 1) === "as") {
        var ____id115 = __body69;
        var __kind2 = has(____id115, 0);
        var ___1 = has(____id115, 1);
        var __name19 = has(____id115, 2);
        var __body70 = cut(____id115, 3);
        add(__forms7, join([[__x698, ["%as", __kind2, __name19]]], __body70));
      } else {
        if (__x698 === "except") {
          var ____id116 = __body69;
          var __kind3 = has(____id116, 0);
          var __body71 = cut(____id116, 1);
          add(__forms7, join([[__x698, __kind3]], __body71));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i46 = ____i46 + 1;
  }
  return join(["%cases", ["try", __x692]], __forms7, [__fin1]);
}});
var reader = require("reader");
var compiler = require("compiler");
var system = require("system");
toplevel_repr = function (v) {
  return _str(v);
};
toplevel_print = function (v) {
  _print(toplevel_repr(v));
  return v;
};
print_exception = function (v, ex) {
  _print(v.stack);
  return undefined;
};
eval_print = function (form) {
  var ____id117 = (function () {
    try {
      return [true, compiler._eval(form)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok6 = has(____id117, 0);
  var __v31 = has(____id117, 1);
  var __ex = has(____id117, 2);
  if (! __ok6) {
    return print_exception(__v31, __ex);
  } else {
    if (is63(__v31)) {
      return toplevel_print(__v31);
    }
  }
};
var rep = function (s) {
  var __v32 = _eval(reader.read_string(s));
  if (is63(__v32)) {
    return toplevel_print(__v32);
  }
};
var repl = function () {
  var __o27 = {buf: ""};
  var rep1 = function (s) {
    __o27.buf = __o27.buf + s;
    var __more = [];
    var __form6 = reader.read_string(__o27.buf, __more);
    if (!( __form6 === __more)) {
      eval_print(__form6);
      __o27.buf = "";
      system.write("> ");
      return system.flush();
    }
  };
  system.write("> ");
  system.flush();
  var ___in2 = process.stdin;
  ___in2.setEncoding("utf8");
  return ___in2.on("data", rep1);
};
read_from_file = function (path) {
  var __s3 = reader.stream(system.read_file(path));
  return reader.read_all(__s3);
};
expand_file = function (path) {
  var __body72 = read_from_file(path);
  return compiler.expand(join(["do"], __body72));
};
compile_file = function (path) {
  var __form7 = expand_file(path);
  return compiler.compile(__form7, {_stash: true, stmt: true});
};
_load = function (path) {
  var __previous = has(setenv("target", {_stash: true, toplevel: true}), "value");
  var __previous_indent = has(setenv("indent-level", {_stash: true, toplevel: true}), "value");
  setenv("target", {_stash: true, toplevel: true}).value = "js";
  setenv("indent-level", {_stash: true, toplevel: true}).value = 0;
  var __code = compile_file(path);
  setenv("indent-level", {_stash: true, toplevel: true}).value = __previous_indent;
  setenv("target", {_stash: true, toplevel: true}).value = __previous;
  return compiler.run(__code);
};
var script_file63 = function (path) {
  return !( "-" === char(path, 0) || (".py" === clip(path, _35(path) - 3) || (".js" === clip(path, _35(path) - 3) || ".lua" === clip(path, _35(path) - 4))));
};
var run_file = function (path) {
  if (script_file63(path)) {
    return _load(path);
  } else {
    return compiler.run(system.read_file(path));
  }
};
var usage = function () {
  _print("usage: lumen [<file> <arguments> | options <object files>]");
  _print(" <file>\t\tProgram read from script file");
  _print(" <arguments>\tPassed to program in system.argv");
  _print(" <object files>\tLoaded before compiling <input>");
  _print("options:");
  _print(" -c <input>\tCompile input file");
  _print(" -o <output>\tOutput file");
  _print(" -t <target>\tTarget language (default: lua)");
  return _print(" -e <expr>\tExpression to evaluate");
};
var main = function (args) {
  var __arg = hd(args);
  if (__arg && script_file63(__arg)) {
    return _load(__arg);
  } else {
    if (__arg === "-h" || __arg === "--help") {
      return usage();
    } else {
      var __pre = [];
      var __input = undefined;
      var __output = undefined;
      var __target1 = undefined;
      var __expr6 = undefined;
      var __argv = system.argv;
      var __i47 = 0;
      while (__i47 < _35(__argv)) {
        var __a27 = __argv[__i47];
        if (__a27 === "-c" || (__a27 === "-o" || (__a27 === "-t" || __a27 === "-e"))) {
          if (__i47 === edge(__argv)) {
            _print("missing argument for " + __a27);
          } else {
            __i47 = __i47 + 1;
            var __val2 = __argv[__i47];
            if (__a27 === "-c") {
              __input = __val2;
            } else {
              if (__a27 === "-o") {
                __output = __val2;
              } else {
                if (__a27 === "-t") {
                  __target1 = __val2;
                } else {
                  if (__a27 === "-e") {
                    __expr6 = __val2;
                  }
                }
              }
            }
          }
        } else {
          if (!( "-" === char(__a27, 0))) {
            add(__pre, __a27);
          }
        }
        __i47 = __i47 + 1;
      }
      var ____x707 = __pre;
      var ____i48 = 0;
      while (____i48 < _35(____x707)) {
        var __file = ____x707[____i48];
        run_file(__file);
        ____i48 = ____i48 + 1;
      }
      if (nil63(__input)) {
        if (__expr6) {
          return rep(__expr6);
        } else {
          return repl();
        }
      } else {
        if (__target1) {
          setenv("target", {_stash: true, toplevel: true}).value = __target1;
        }
        var __code1 = compile_file(__input);
        if (nil63(__output) || __output === "-") {
          return _print(__code1);
        } else {
          return system.write_file(__output, __code1);
        }
      }
    }
  }
};
var main63 = function () {
  return !( typeof(require) === "undefined") && (!( typeof(module) === "undefined") && require.main === module);
};
if (main63()) {
  main(system.argv);
}
exports.main = main;
exports.reader = reader;
exports.compiler = compiler;
exports.system = system;
