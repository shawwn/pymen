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
      var __e;
      if (numeric63(__k)) {
        __e = parseInt(__k);
      } else {
        __e = __k;
      }
      var __k1 = __e;
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
      var __e1;
      if (numeric63(__k2)) {
        __e1 = parseInt(__k2);
      } else {
        __e1 = __k2;
      }
      var __k3 = __e1;
      __l1[__k3] = __v1;
    }
    return __l1;
  } else {
    return x;
  }
};
length = function (x) {
  var __n2 = -1;
  var ____o2 = x;
  var __k4 = undefined;
  for (__k4 in ____o2) {
    var __v2 = ____o2[__k4];
    var __e2;
    if (numeric63(__k4)) {
      __e2 = parseInt(__k4);
    } else {
      __e2 = __k4;
    }
    var __k5 = __e2;
    if (number63(__k5)) {
      if (__k5 > __n2) {
        __n2 = __k5;
      }
    }
  }
  __n2 = __n2 + 1;
  return __n2;
};
_35 = function (x) {
  if (string63(x) || array63(x)) {
    return x.length;
  } else {
    return length(x);
  }
};
none63 = function (x) {
  return _35(x) === 0;
};
some63 = function (x) {
  return _35(x) > 0;
};
one63 = function (x) {
  return _35(x) === 1;
};
two63 = function (x) {
  return _35(x) === 2;
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
atom63 = function (x) {
  return nil63(x) || string63(x) || number63(x) || boolean63(x);
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
  var __e3;
  if (nil63(_from) || _from < 0) {
    __e3 = 0;
  } else {
    __e3 = _from;
  }
  var __i3 = __e3;
  var __n4 = _35(x);
  var __e4;
  if (nil63(upto) || upto > __n4) {
    __e4 = __n4;
  } else {
    __e4 = upto;
  }
  var __upto = __e4;
  while (__i3 < __upto) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e5;
    if (numeric63(__k6)) {
      __e5 = parseInt(__k6);
    } else {
      __e5 = __k6;
    }
    var __k7 = __e5;
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
    var __e6;
    if (numeric63(__k8)) {
      __e6 = parseInt(__k8);
    } else {
      __e6 = __k8;
    }
    var __k9 = __e6;
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
      var __r39 = l[__n7];
      delete l[__n7];
      return __r39;
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
  var __r44 = [];
  var ____x1 = __ls;
  var ____i7 = 0;
  while (____i7 < _35(____x1)) {
    var __l3 = ____x1[____i7];
    if (__l3) {
      var __n8 = _35(__r44);
      var ____o5 = __l3;
      var __k10 = undefined;
      for (__k10 in ____o5) {
        var __v5 = ____o5[__k10];
        var __e7;
        if (numeric63(__k10)) {
          __e7 = parseInt(__k10);
        } else {
          __e7 = __k10;
        }
        var __k11 = __e7;
        if (number63(__k11)) {
          __k11 = __k11 + __n8;
        } else {
          __l3 = object(__l3);
        }
        __r44[__k11] = __v5;
      }
    }
    ____i7 = ____i7 + 1;
  }
  return __r44;
};
find = function (f, t) {
  var ____o6 = t;
  var ____i9 = undefined;
  for (____i9 in ____o6) {
    var __x2 = ____o6[____i9];
    var __e8;
    if (numeric63(____i9)) {
      __e8 = parseInt(____i9);
    } else {
      __e8 = ____i9;
    }
    var ____i91 = __e8;
    var __y = f(__x2);
    if (__y) {
      return __y;
    }
  }
};
first = function (f, l) {
  var ____x3 = l;
  var ____i10 = 0;
  while (____i10 < _35(____x3)) {
    var __x4 = ____x3[____i10];
    var __y1 = f(__x4);
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
  var ____x6 = x;
  var ____i12 = 0;
  while (____i12 < _35(____x6)) {
    var __v6 = ____x6[____i12];
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
    var __e9;
    if (numeric63(__k12)) {
      __e9 = parseInt(__k12);
    } else {
      __e9 = __k12;
    }
    var __k13 = __e9;
    if (! number63(__k13)) {
      var __y3 = f(__v7);
      if (is63(__y3)) {
        __t1[__k13] = __y3;
      }
    }
  }
  return __t1;
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
    var __v8 = ____o8[__k14];
    var __e10;
    if (numeric63(__k14)) {
      __e10 = parseInt(__k14);
    } else {
      __e10 = __k14;
    }
    var __k15 = __e10;
    if (! number63(__k15)) {
      return true;
    }
  }
  return false;
};
empty63 = function (t) {
  var ____o9 = t;
  var ____i15 = undefined;
  for (____i15 in ____o9) {
    var __x7 = ____o9[____i15];
    var __e11;
    if (numeric63(____i15)) {
      __e11 = parseInt(____i15);
    } else {
      __e11 = ____i15;
    }
    var ____i151 = __e11;
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
      var __v9 = ____o10[__k16];
      var __e12;
      if (numeric63(__k16)) {
        __e12 = parseInt(__k16);
      } else {
        __e12 = __k16;
      }
      var __k17 = __e12;
      if (! number63(__k17)) {
        __p[__k17] = __v9;
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
        var __v10 = ____o11[__k18];
        var __e14;
        if (numeric63(__k18)) {
          __e14 = parseInt(__k18);
        } else {
          __e14 = __k18;
        }
        var __k19 = __e14;
        if (!( __k19 === "_stash")) {
          __args1[__k19] = __v10;
        }
      }
      if (params) {
        var ____o12 = params;
        var __k20 = undefined;
        for (__k20 in ____o12) {
          var __v11 = ____o12[__k20];
          var __e15;
          if (numeric63(__k20)) {
            __e15 = parseInt(__k20);
          } else {
            __e15 = __k20;
          }
          var __k21 = __e15;
          __args1[__k21] = __v11;
        }
      }
      return __args1;
    } else {
      if (params) {
        var __args11 = object(args);
        var ____o13 = params;
        var __k22 = undefined;
        for (__k22 in ____o13) {
          var __v12 = ____o13[__k22];
          var __e13;
          if (numeric63(__k22)) {
            __e13 = parseInt(__k22);
          } else {
            __e13 = __k22;
          }
          var __k23 = __e13;
          __args11[__k23] = __v12;
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
      var __v13 = ____o14[__k24];
      var __e16;
      if (numeric63(__k24)) {
        __e16 = parseInt(__k24);
      } else {
        __e16 = __k24;
      }
      var __k25 = __e16;
      if (!( __k25 === "_stash")) {
        args1[__k25] = __v13;
      }
    }
  } else {
    return l;
  }
};
search = function (s, pattern, start) {
  var __i21 = s.indexOf(pattern, start);
  if (__i21 >= 0) {
    return __i21;
  }
};
split = function (s, sep) {
  if (s === "" || sep === "") {
    return [];
  } else {
    var __l5 = [];
    var __n20 = _35(sep);
    while (true) {
      var __i22 = search(s, sep);
      if (nil63(__i22)) {
        break;
      } else {
        add(__l5, clip(s, 0, __i22));
        s = clip(s, __i22 + __n20);
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
  var __i23 = 0;
  while (__i23 < edge(xs)) {
    var __a1 = xs[__i23];
    var __b1 = xs[__i23 + 1];
    if (! f(__a1, __b1)) {
      return false;
    }
    __i23 = __i23 + 1;
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
  var __i24 = 0;
  while (__i24 < __n22) {
    if (! number_code63(code(s, __i24))) {
      return false;
    }
    __i24 = __i24 + 1;
  }
  return some63(s);
};
var tostring = function (x) {
  return x.toString();
};
escape = function (s) {
  var __s1 = "\"";
  var __i25 = 0;
  while (__i25 < _35(s)) {
    var __c = char(s, __i25);
    var __e17;
    if (__c === "\n") {
      __e17 = "\\n";
    } else {
      var __e18;
      if (__c === "\r") {
        __e18 = "\\r";
      } else {
        var __e19;
        if (__c === "\"") {
          __e19 = "\\\"";
        } else {
          var __e20;
          if (__c === "\\") {
            __e20 = "\\\\";
          } else {
            __e20 = __c;
          }
          __e19 = __e20;
        }
        __e18 = __e19;
      }
      __e17 = __e18;
    }
    var __c1 = __e17;
    __s1 = __s1 + __c1;
    __i25 = __i25 + 1;
  }
  return __s1 + "\"";
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
                        var __v14 = ____o15[__k26];
                        var __e21;
                        if (numeric63(__k26)) {
                          __e21 = parseInt(__k26);
                        } else {
                          __e21 = __k26;
                        }
                        var __k27 = __e21;
                        if (number63(__k27)) {
                          __xs11[__k27] = _str(__v14, repr, __l6);
                        } else {
                          add(__ks, [__k27 + ":", _str(__v14, repr, __l6)]);
                        }
                      }
                      sort(__ks, function (__x9, __x10) {
                        var ____id = __x9;
                        var __a2 = has(____id, 0);
                        var ____id1 = __x10;
                        var __b2 = has(____id1, 0);
                        return __a2 < __b2;
                      });
                      drop(__l6);
                      var ____x11 = __xs11;
                      var ____i27 = 0;
                      while (____i27 < _35(____x11)) {
                        var __v15 = ____x11[____i27];
                        __s = __s + __sp + __v15;
                        __sp = " ";
                        ____i27 = ____i27 + 1;
                      }
                      var ____x12 = __ks;
                      var ____i28 = 0;
                      while (____i28 < _35(____x12)) {
                        var ____id2 = ____x12[____i28];
                        var __k28 = has(____id2, 0);
                        var __v16 = has(____id2, 1);
                        __s = __s + __sp + __k28 + " " + __v16;
                        __sp = " ";
                        ____i28 = ____i28 + 1;
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
  var ____r85 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f1 = destash33(f, ____r85);
  var ____id3 = ____r85;
  var __args12 = cut(____id3, 0);
  return apply(__f1, __args12);
};
setenv = function (k) {
  var ____r86 = unstash(Array.prototype.slice.call(arguments, 1));
  var __k29 = destash33(k, ____r86);
  var ____id4 = ____r86;
  var __keys = cut(____id4, 0);
  if (string63(__k29)) {
    var __e22;
    if (has63(__keys, "toplevel")) {
      __e22 = hd(environment);
    } else {
      __e22 = last(environment);
    }
    var __frame = __e22;
    var __e23;
    if (has63(__frame, __k29)) {
      __e23 = __frame[__k29];
    } else {
      __e23 = {};
    }
    var __entry = __e23;
    var ____o16 = __keys;
    var __k30 = undefined;
    for (__k30 in ____o16) {
      var __v17 = ____o16[__k30];
      var __e24;
      if (numeric63(__k30)) {
        __e24 = parseInt(__k30);
      } else {
        __e24 = __k30;
      }
      var __k31 = __e24;
      if (!( __k31 === "toplevel")) {
        __entry[__k31] = __v17;
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
  var __args1 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["do"], map(function (__x6) {
    var ____id1 = __x6;
    var __lh1 = has(____id1, 0);
    var __rh1 = has(____id1, 1);
    __lh1 = macroexpand(__lh1);
    if (! atom63(__lh1) && hd(__lh1) === "has") {
      return ["%set", join(["get"], tl(__lh1)), __rh1];
    } else {
      return ["%set", __lh1, __rh1];
    }
  }, pair(__args1)));
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
  var __body1 = unstash(Array.prototype.slice.call(arguments, 0));
  var __x27 = unique("x");
  var __l1 = [];
  var __forms1 = [];
  var ____o1 = __body1;
  var __k2 = undefined;
  for (__k2 in ____o1) {
    var __v1 = ____o1[__k2];
    var __e7;
    if (numeric63(__k2)) {
      __e7 = parseInt(__k2);
    } else {
      __e7 = __k2;
    }
    var __k3 = __e7;
    if (number63(__k3)) {
      __l1[__k3] = __v1;
    } else {
      add(__forms1, ["set", ["get", __x27, ["quote", __k3]], __v1]);
    }
  }
  if (some63(__forms1)) {
    return join(["let", __x27, ["object", join(["%array"], __l1)]], __forms1, [__x27]);
  } else {
    return join(["%array"], __l1);
  }
}});
setenv("if", {_stash: true, macro: function () {
  var __branches1 = unstash(Array.prototype.slice.call(arguments, 0));
  return hd(expand_if(__branches1));
}});
setenv("case", {_stash: true, macro: function (expr) {
  var ____r13 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expr1 = destash33(expr, ____r13);
  var ____id4 = ____r13;
  var __clauses1 = cut(____id4, 0);
  var __x47 = unique("x");
  var __eq1 = function (_) {
    return ["=", ["quote", _], __x47];
  };
  var __cl1 = function (__x50) {
    var ____id5 = __x50;
    var __a1 = has(____id5, 0);
    var __b1 = has(____id5, 1);
    if (nil63(__b1)) {
      return [__a1];
    } else {
      if (string63(__a1) || number63(__a1)) {
        return [__eq1(__a1), __b1];
      } else {
        if (one63(__a1)) {
          return [__eq1(hd(__a1)), __b1];
        } else {
          if (_35(__a1) > 1) {
            return [join(["or"], map(__eq1, __a1)), __b1];
          }
        }
      }
    }
  };
  return ["let", __x47, __expr1, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
}});
setenv("when", {_stash: true, macro: function (cond) {
  var ____r17 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond1 = destash33(cond, ____r17);
  var ____id7 = ____r17;
  var __body3 = cut(____id7, 0);
  return ["if", __cond1, join(["do"], __body3)];
}});
setenv("unless", {_stash: true, macro: function (cond) {
  var ____r19 = unstash(Array.prototype.slice.call(arguments, 1));
  var __cond3 = destash33(cond, ____r19);
  var ____id9 = ____r19;
  var __body5 = cut(____id9, 0);
  return ["if", ["not", __cond3], join(["do"], __body5)];
}});
setenv("obj", {_stash: true, macro: function () {
  var __body7 = unstash(Array.prototype.slice.call(arguments, 0));
  return join(["%object"], mapo(function (x) {
    return x;
  }, __body7));
}});
setenv("let", {_stash: true, macro: function (bs) {
  var ____r23 = unstash(Array.prototype.slice.call(arguments, 1));
  var __bs11 = destash33(bs, ____r23);
  var ____id14 = ____r23;
  var __body9 = cut(____id14, 0);
  if (atom63(__bs11)) {
    return join(["let", [__bs11, hd(__body9)]], tl(__body9));
  } else {
    if (none63(__bs11)) {
      return join(["do"], __body9);
    } else {
      var ____id15 = __bs11;
      var __lh3 = has(____id15, 0);
      var __rh3 = has(____id15, 1);
      var __bs21 = cut(____id15, 2);
      var ____id16 = bind(__lh3, __rh3);
      var __id17 = has(____id16, 0);
      var __val1 = has(____id16, 1);
      var __bs12 = cut(____id16, 2);
      var __renames1 = [];
      if (! id_literal63(__id17)) {
        var __id121 = unique(__id17);
        __renames1 = [__id17, __id121];
        __id17 = __id121;
      }
      return ["do", ["%local", __id17, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body9)]];
    }
  }
}});
setenv("with", {_stash: true, macro: function (x, v) {
  var ____r25 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x90 = destash33(x, ____r25);
  var __v3 = destash33(v, ____r25);
  var ____id19 = ____r25;
  var __body11 = cut(____id19, 0);
  return join(["let", [__x90, __v3]], __body11, [__x90]);
}});
setenv("let-when", {_stash: true, macro: function (x, v) {
  var ____r27 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x100 = destash33(x, ____r27);
  var __v5 = destash33(v, ____r27);
  var ____id21 = ____r27;
  var __body13 = cut(____id21, 0);
  var __y1 = unique("y");
  return ["let", __y1, __v5, ["when", ["yes", __y1], join(["let", [__x100, __y1]], __body13)]];
}});
setenv("define-macro", {_stash: true, macro: function (name, args) {
  var ____r29 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name1 = destash33(name, ____r29);
  var __args3 = destash33(args, ____r29);
  var ____id23 = ____r29;
  var __body15 = cut(____id23, 0);
  var ____x109 = object(["setenv", ["quote", __name1]]);
  ____x109.macro = join(["fn", __args3], __body15);
  var __form1 = ____x109;
  _eval(__form1);
  return __form1;
}});
setenv("define-special", {_stash: true, macro: function (name, args) {
  var ____r31 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name3 = destash33(name, ____r31);
  var __args5 = destash33(args, ____r31);
  var ____id25 = ____r31;
  var __body17 = cut(____id25, 0);
  var ____x115 = object(["setenv", ["quote", __name3]]);
  ____x115.special = join(["fn", __args5], __body17);
  var __form3 = join(____x115, keys(__body17));
  _eval(__form3);
  return __form3;
}});
setenv("define-symbol", {_stash: true, macro: function (name, expansion) {
  setenv(name, {_stash: true, symbol: expansion});
  var ____x121 = object(["setenv", ["quote", name]]);
  ____x121.symbol = ["quote", expansion];
  return ____x121;
}});
setenv("define-reader", {_stash: true, macro: function (__x129) {
  var ____id28 = __x129;
  var __char1 = has(____id28, 0);
  var __s1 = has(____id28, 1);
  var ____r35 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x129 = destash33(__x129, ____r35);
  var ____id29 = ____r35;
  var __body19 = cut(____id29, 0);
  return ["set", ["get", "read-table", __char1], join(["fn", [__s1]], __body19)];
}});
setenv("define", {_stash: true, macro: function (name, x) {
  var ____r37 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name5 = destash33(name, ____r37);
  var __x137 = destash33(x, ____r37);
  var ____id31 = ____r37;
  var __body21 = cut(____id31, 0);
  setenv(__name5, {_stash: true, variable: true});
  if (some63(__body21)) {
    return join(["%local-function", __name5], bind42(__x137, __body21));
  } else {
    return ["%local", __name5, __x137];
  }
}});
setenv("define-global", {_stash: true, macro: function (name, x) {
  var ____r39 = unstash(Array.prototype.slice.call(arguments, 2));
  var __name7 = destash33(name, ____r39);
  var __x143 = destash33(x, ____r39);
  var ____id33 = ____r39;
  var __body23 = cut(____id33, 0);
  setenv(__name7, {_stash: true, toplevel: true, variable: true});
  if (some63(__body23)) {
    return join(["%global-function", __name7], bind42(__x143, __body23));
  } else {
    return ["set", __name7, __x143];
  }
}});
setenv("get-value", {_stash: true, macro: function (x) {
  var ____x150 = object(["setenv", x]);
  ____x150.toplevel = true;
  return ["has", ____x150, ["quote", "value"]];
}});
setenv("define-constant", {_stash: true, macro: function (name, x) {
  var ____x161 = object(["setenv", ["quote", name]]);
  ____x161.toplevel = true;
  ____x161.value = either(x, ["get-value", ["quote", name]]);
  return ["do", ____x161, ["define-symbol", name, ["get-value", ["quote", name]]]];
}});
setenv("define-variable", {_stash: true, macro: function (name, x) {
  if (is63(x)) {
    return ["define-constant", name, ["either", ["get-value", ["quote", name]], x]];
  } else {
    return ["define-constant", name];
  }
}});
setenv("with-frame", {_stash: true, macro: function () {
  var __body25 = unstash(Array.prototype.slice.call(arguments, 0));
  var __x185 = unique("x");
  return ["do", ["add", "environment", ["obj"]], ["with", __x185, join(["do"], __body25), ["drop", "environment"]]];
}});
setenv("with-bindings", {_stash: true, macro: function (__x197) {
  var ____id36 = __x197;
  var __names1 = has(____id36, 0);
  var ____r47 = unstash(Array.prototype.slice.call(arguments, 1));
  var ____x197 = destash33(__x197, ____r47);
  var ____id37 = ____r47;
  var __body27 = cut(____id37, 0);
  var __x198 = unique("x");
  var ____x201 = object(["setenv", __x198]);
  ____x201.variable = true;
  return join(["with-frame", ["each", __x198, __names1, ____x201]], __body27);
}});
setenv("let-macro", {_stash: true, macro: function (definitions) {
  var ____r50 = unstash(Array.prototype.slice.call(arguments, 1));
  var __definitions1 = destash33(definitions, ____r50);
  var ____id39 = ____r50;
  var __body29 = cut(____id39, 0);
  add(environment, {});
  map(function (m) {
    return macroexpand(join(["define-macro"], m));
  }, __definitions1);
  var ____x205 = join(["do"], macroexpand(__body29));
  drop(environment);
  return ____x205;
}});
setenv("let-symbol", {_stash: true, macro: function (expansions) {
  var ____r54 = unstash(Array.prototype.slice.call(arguments, 1));
  var __expansions1 = destash33(expansions, ____r54);
  var ____id42 = ____r54;
  var __body31 = cut(____id42, 0);
  add(environment, {});
  map(function (__x213) {
    var ____id43 = __x213;
    var __name9 = has(____id43, 0);
    var __exp1 = has(____id43, 1);
    return macroexpand(["define-symbol", __name9, __exp1]);
  }, pair(__expansions1));
  var ____x212 = join(["do"], macroexpand(__body31));
  drop(environment);
  return ____x212;
}});
setenv("let-unique", {_stash: true, macro: function (names) {
  var ____r58 = unstash(Array.prototype.slice.call(arguments, 1));
  var __names3 = destash33(names, ____r58);
  var ____id45 = ____r58;
  var __body33 = cut(____id45, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names3);
  return join(["let", apply(join, __bs3)], __body33);
}});
setenv("fn", {_stash: true, macro: function (args) {
  var ____r61 = unstash(Array.prototype.slice.call(arguments, 1));
  var __args7 = destash33(args, ____r61);
  var ____id47 = ____r61;
  var __body35 = cut(____id47, 0);
  return join(["%function"], bind42(__args7, __body35));
}});
setenv("apply", {_stash: true, macro: function (f) {
  var ____r63 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f1 = destash33(f, ____r63);
  var ____id49 = ____r63;
  var __args9 = cut(____id49, 0);
  if (_35(__args9) > 1) {
    return [["do", "apply"], __f1, ["join", join(["list"], almost(__args9)), last(__args9)]];
  } else {
    return join([["do", "apply"], __f1], __args9);
  }
}});
setenv("guard", {_stash: true, macro: function (expr) {
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    return [["fn", join(), ["%try", ["list", true, expr]]]];
  } else {
    var ____x270 = object(["obj"]);
    ____x270.stack = [["idx", "debug", "traceback"]];
    ____x270.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
    return ["list", ["xpcall", ["fn", join(), expr], ["fn", ["m"], ["if", ["obj?", "m"], "m", ____x270]]]];
  }
}});
setenv("each", {_stash: true, macro: function (x, t) {
  var ____r67 = unstash(Array.prototype.slice.call(arguments, 2));
  var __x294 = destash33(x, ____r67);
  var __t1 = destash33(t, ____r67);
  var ____id52 = ____r67;
  var __body37 = cut(____id52, 0);
  var __o3 = unique("o");
  var __n3 = unique("n");
  var __i3 = unique("i");
  var __e8;
  if (atom63(__x294)) {
    __e8 = [__i3, __x294];
  } else {
    var __e9;
    if (_35(__x294) > 1) {
      __e9 = __x294;
    } else {
      __e9 = [__i3, hd(__x294)];
    }
    __e8 = __e9;
  }
  var ____id53 = __e8;
  var __k5 = has(____id53, 0);
  var __v7 = has(____id53, 1);
  var __e10;
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua" || has(setenv("target", {_stash: true, toplevel: true}), "value") === "py") {
    __e10 = __body37;
  } else {
    __e10 = [join(["let", __k5, ["if", ["numeric?", __k5], ["parseInt", __k5], __k5]], __body37)];
  }
  return ["let", [__o3, __t1, __k5, "nil"], ["%for", __o3, __k5, join(["let", [__v7, ["get", __o3, __k5]]], __e10)]];
}});
setenv("for", {_stash: true, macro: function (i, to) {
  var ____r69 = unstash(Array.prototype.slice.call(arguments, 2));
  var __i5 = destash33(i, ____r69);
  var __to1 = destash33(to, ____r69);
  var ____id55 = ____r69;
  var __body39 = cut(____id55, 0);
  return ["let", __i5, 0, join(["while", ["<", __i5, __to1]], __body39, [["inc", __i5]])];
}});
setenv("step", {_stash: true, macro: function (v, t) {
  var ____r71 = unstash(Array.prototype.slice.call(arguments, 2));
  var __v9 = destash33(v, ____r71);
  var __t3 = destash33(t, ____r71);
  var ____id57 = ____r71;
  var __body41 = cut(____id57, 0);
  var __x326 = unique("x");
  var __i7 = unique("i");
  return ["let", [__x326, __t3], ["for", __i7, ["#", __x326], join(["let", [__v9, ["at", __x326, __i7]]], __body41)]];
}});
setenv("set-of", {_stash: true, macro: function () {
  var __xs1 = unstash(Array.prototype.slice.call(arguments, 0));
  var __l3 = [];
  var ____o5 = __xs1;
  var ____i9 = undefined;
  for (____i9 in ____o5) {
    var __x336 = ____o5[____i9];
    var __e11;
    if (numeric63(____i9)) {
      __e11 = parseInt(____i9);
    } else {
      __e11 = ____i9;
    }
    var ____i91 = __e11;
    __l3[__x336] = true;
  }
  return join(["obj"], __l3);
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
  var ____r77 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a3 = destash33(a, ____r77);
  var ____id59 = ____r77;
  var __bs5 = cut(____id59, 0);
  return ["set", __a3, join(["join", __a3], __bs5)];
}});
setenv("cat!", {_stash: true, macro: function (a) {
  var ____r79 = unstash(Array.prototype.slice.call(arguments, 1));
  var __a5 = destash33(a, ____r79);
  var ____id61 = ____r79;
  var __bs7 = cut(____id61, 0);
  return ["set", __a5, join(["cat", __a5], __bs7)];
}});
setenv("inc", {_stash: true, macro: function (n, by) {
  var __e12;
  if (nil63(by)) {
    __e12 = 1;
  } else {
    __e12 = by;
  }
  return ["set", n, ["+", n, __e12]];
}});
setenv("dec", {_stash: true, macro: function (n, by) {
  var __e13;
  if (nil63(by)) {
    __e13 = 1;
  } else {
    __e13 = by;
  }
  return ["set", n, ["-", n, __e13]];
}});
setenv("with-indent", {_stash: true, macro: function (form) {
  var __x363 = unique("x");
  return ["do", ["inc", "indent-level"], ["with", __x363, form, ["dec", "indent-level"]]];
}});
setenv("export", {_stash: true, macro: function () {
  var __names5 = unstash(Array.prototype.slice.call(arguments, 0));
  var __forms3 = map(function (k) {
    if (k === compile(k)) {
      return ["set", ["idx", "exports", k], k];
    } else {
      return ["set", ["get", "exports", ["quote", k]], k, ["idx", "exports", k], k];
    }
  }, __names5);
  if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "js") {
    return join(["do"], __forms3);
  } else {
    if (has(setenv("target", {_stash: true, toplevel: true}), "value") === "lua") {
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms3, [["return", "exports"]]);
    }
  }
}});
setenv("when-compiling", {_stash: true, macro: function () {
  var __body43 = unstash(Array.prototype.slice.call(arguments, 0));
  return _eval(join(["do"], __body43));
}});
var reader = require("reader");
var compiler = require("compiler");
var system = require("system");
toplevel_repr = function (v) {
  return _str(v);
};
toplevel_print = function (v) {
  return _print(toplevel_repr(v));
};
var eval_print = function (form) {
  var ____id = (function () {
    try {
      return [true, compiler._eval(form)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok = has(____id, 0);
  var __v = has(____id, 1);
  var __ex = has(____id, 2);
  if (! __ok) {
    return _print(__v.stack);
  } else {
    if (is63(__v)) {
      return toplevel_print(__v);
    }
  }
};
var rep = function (s) {
  var __v1 = _eval(reader.read_string(s));
  if (is63(__v1)) {
    return toplevel_print(__v1);
  }
};
var repl = function () {
  var __o = {buf: ""};
  var rep1 = function (s) {
    __o.buf = __o.buf + s;
    var __more = [];
    var __form = reader.read_string(__o.buf, __more);
    if (!( __form === __more)) {
      eval_print(__form);
      __o.buf = "";
      system.write("> ");
      return system.flush();
    }
  };
  system.write("> ");
  system.flush();
  var ___in = process.stdin;
  ___in.setEncoding("utf8");
  return ___in.on("data", rep1);
};
compile_file = function (path) {
  var __s = reader.stream(system.read_file(path));
  var __body = reader.read_all(__s);
  var __form1 = compiler.expand(join(["do"], __body));
  return compiler.compile(__form1, {_stash: true, stmt: true});
};
_load = function (path) {
  var __previous = has(setenv("target", {_stash: true, toplevel: true}), "value");
  setenv("target", {_stash: true, toplevel: true}).value = "js";
  var __code = compile_file(path);
  setenv("target", {_stash: true, toplevel: true}).value = __previous;
  return compiler.run(__code);
};
var script_file63 = function (path) {
  return !( "-" === char(path, 0) || ".py" === clip(path, _35(path) - 3) || ".js" === clip(path, _35(path) - 3) || ".lua" === clip(path, _35(path) - 4));
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
var main = function () {
  var __arg = hd(system.argv);
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
      var __expr = undefined;
      var __argv = system.argv;
      var __i = 0;
      while (__i < _35(__argv)) {
        var __a = __argv[__i];
        if (__a === "-c" || __a === "-o" || __a === "-t" || __a === "-e") {
          if (__i === edge(__argv)) {
            _print("missing argument for " + __a);
          } else {
            __i = __i + 1;
            var __val = __argv[__i];
            if (__a === "-c") {
              __input = __val;
            } else {
              if (__a === "-o") {
                __output = __val;
              } else {
                if (__a === "-t") {
                  __target1 = __val;
                } else {
                  if (__a === "-e") {
                    __expr = __val;
                  }
                }
              }
            }
          }
        } else {
          if (!( "-" === char(__a, 0))) {
            add(__pre, __a);
          }
        }
        __i = __i + 1;
      }
      var ____x2 = __pre;
      var ____i1 = 0;
      while (____i1 < _35(____x2)) {
        var __file = ____x2[____i1];
        run_file(__file);
        ____i1 = ____i1 + 1;
      }
      if (nil63(__input)) {
        if (__expr) {
          return rep(__expr);
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
  return require.main === module;
};
if (main63()) {
  main();
}
