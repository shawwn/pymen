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
      var __e12 = undefined;
      if (numeric63(__k)) {
        __e12 = parseInt(__k);
      } else {
        __e12 = __k;
      }
      var __k1 = __e12;
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
      var __e13 = undefined;
      if (numeric63(__k2)) {
        __e13 = parseInt(__k2);
      } else {
        __e13 = __k2;
      }
      var __k3 = __e13;
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
    var __e14 = undefined;
    if (numeric63(__k4)) {
      __e14 = parseInt(__k4);
    } else {
      __e14 = __k4;
    }
    var __k5 = __e14;
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
  var __e15 = undefined;
  if (nil63(from) || from < 0) {
    __e15 = 0;
  } else {
    __e15 = from;
  }
  var __i3 = __e15;
  var __n4 = _35(x);
  var __e16 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e16 = __n4;
  } else {
    __e16 = upto;
  }
  var __upto1 = __e16;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e17 = undefined;
    if (numeric63(__k6)) {
      __e17 = parseInt(__k6);
    } else {
      __e17 = __k6;
    }
    var __k7 = __e17;
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
    var __e18 = undefined;
    if (numeric63(__k8)) {
      __e18 = parseInt(__k8);
    } else {
      __e18 = __k8;
    }
    var __k9 = __e18;
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
      var __e19 = undefined;
      if (numeric63(__k10)) {
        __e19 = parseInt(__k10);
      } else {
        __e19 = __k10;
      }
      var __k11 = __e19;
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
        var __e20 = undefined;
        if (numeric63(__k12)) {
          __e20 = parseInt(__k12);
        } else {
          __e20 = __k12;
        }
        var __k13 = __e20;
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
    var __e21 = undefined;
    if (numeric63(____i10)) {
      __e21 = parseInt(____i10);
    } else {
      __e21 = ____i10;
    }
    var ____i101 = __e21;
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
    var __e22 = undefined;
    if (numeric63(__k14)) {
      __e22 = parseInt(__k14);
    } else {
      __e22 = __k14;
    }
    var __k15 = __e22;
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
    var __e23 = undefined;
    if (f) {
      __e23 = f(__v9);
    } else {
      __e23 = __v9;
    }
    var __y4 = __e23;
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
    var __e24 = undefined;
    if (numeric63(__k16)) {
      __e24 = parseInt(__k16);
    } else {
      __e24 = __k16;
    }
    var __k17 = __e24;
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
    var __e25 = undefined;
    if (numeric63(____i17)) {
      __e25 = parseInt(____i17);
    } else {
      __e25 = ____i17;
    }
    var ____i171 = __e25;
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
      var __e26 = undefined;
      if (numeric63(__k18)) {
        __e26 = parseInt(__k18);
      } else {
        __e26 = __k18;
      }
      var __k19 = __e26;
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
        var __e28 = undefined;
        if (numeric63(__k20)) {
          __e28 = parseInt(__k20);
        } else {
          __e28 = __k20;
        }
        var __k21 = __e28;
        if (!( __k21 === "_stash")) {
          __args1[__k21] = __v12;
        }
      }
      if (params) {
        var ____o13 = params;
        var __k22 = undefined;
        for (__k22 in ____o13) {
          var __v13 = ____o13[__k22];
          var __e29 = undefined;
          if (numeric63(__k22)) {
            __e29 = parseInt(__k22);
          } else {
            __e29 = __k22;
          }
          var __k23 = __e29;
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
          var __e27 = undefined;
          if (numeric63(__k24)) {
            __e27 = parseInt(__k24);
          } else {
            __e27 = __k24;
          }
          var __k25 = __e27;
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
      var __e30 = undefined;
      if (numeric63(__k26)) {
        __e30 = parseInt(__k26);
      } else {
        __e30 = __k26;
      }
      var __k27 = __e30;
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
  var __e31 = undefined;
  if (is63(pos)) {
    __e31 = clip(str, pos);
  } else {
    __e31 = str;
  }
  var __str = __e31;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_starts63 = function (str, x, pos) {
  var __e32 = undefined;
  if (is63(pos)) {
    __e32 = clip(str, pos);
  } else {
    __e32 = str;
  }
  var __str1 = __e32;
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
      var __e33 = undefined;
      if (__c1 === "\n") {
        __e33 = "\\n";
      } else {
        var __e34 = undefined;
        if (__c1 === "\r") {
          __e34 = "\\r";
        } else {
          var __e35 = undefined;
          if (__c1 === "\"") {
            __e35 = "\\\"";
          } else {
            var __e36 = undefined;
            if (__c1 === "\\") {
              __e36 = "\\\\";
            } else {
              __e36 = __c1;
            }
            __e35 = __e36;
          }
          __e34 = __e35;
        }
        __e33 = __e34;
      }
      var __c11 = __e33;
      __s1 = __s1 + __c11;
      __i27 = __i27 + 1;
    }
    return __s1 + "\"";
  }
};
simple_id63 = function (x) {
  var ____id = (function () {
    try {
      return [true, read_string(x)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok = has(____id, 0);
  var __v16 = has(____id, 1);
  var __e37 = undefined;
  if (__ok) {
    __e37 = __v16;
  } else {
    __e37 = undefined;
  }
  var __r90 = __e37;
  if (__r90 === x) {
    return __r90;
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
                          var __v17 = ____o16[__k28];
                          var __e38 = undefined;
                          if (numeric63(__k28)) {
                            __e38 = parseInt(__k28);
                          } else {
                            __e38 = __k28;
                          }
                          var __k29 = __e38;
                          if (number63(__k29)) {
                            __xs11[__k29] = str(__v17, repr, __l6);
                          } else {
                            if (function63(__v17)) {
                              add(__ks, ["." + __k29, ""]);
                            } else {
                              add(__ks, [__k29 + ": ", str(__v17, repr, __l6)]);
                            }
                          }
                        }
                        sort(__ks, function (__x13, __x14) {
                          var ____id1 = __x13;
                          var __a2 = has(____id1, 0);
                          var ____id2 = __x14;
                          var __b2 = has(____id2, 0);
                          return __a2 < __b2;
                        });
                        drop(__l6);
                        var ____x15 = __xs11;
                        var ____i29 = 0;
                        while (____i29 < _35(____x15)) {
                          var __v18 = ____x15[____i29];
                          __s = __s + (__sp + __v18);
                          __sp = " ";
                          ____i29 = ____i29 + 1;
                        }
                        var ____x16 = __ks;
                        var ____i30 = 0;
                        while (____i30 < _35(____x16)) {
                          var ____id3 = ____x16[____i30];
                          var __k30 = has(____id3, 0);
                          var __v19 = has(____id3, 1);
                          __s = __s + (__sp + (__k30 + __v19));
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
  var __args2 = stash(args);
  return f.apply(f, __args2);
};
call = function (f) {
  var ____r94 = unstash(Array.prototype.slice.call(arguments, 1));
  var __f1 = destash33(f, ____r94);
  var ____id4 = ____r94;
  var __args3 = cut(____id4, 0);
  return apply(__f1, __args3);
};
setenv = function (k) {
  var ____r95 = unstash(Array.prototype.slice.call(arguments, 1));
  var __k31 = destash33(k, ____r95);
  var ____id5 = ____r95;
  var __keys = cut(____id5, 0);
  if (string63(__k31)) {
    var __e39 = undefined;
    if (has63(__keys, "toplevel")) {
      __e39 = hd(environment);
    } else {
      __e39 = last(environment);
    }
    var __frame = __e39;
    var __e40 = undefined;
    if (has63(__frame, __k31)) {
      __e40 = __frame[__k31];
    } else {
      __e40 = {};
    }
    var __entry = __e40;
    var ____o17 = __keys;
    var __k32 = undefined;
    for (__k32 in ____o17) {
      var __v20 = ____o17[__k32];
      var __e41 = undefined;
      if (numeric63(__k32)) {
        __e41 = parseInt(__k32);
      } else {
        __e41 = __k32;
      }
      var __k33 = __e41;
      if (!( __k33 === "toplevel")) {
        __entry[__k33] = __v20;
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
    var __args5 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%do"], map(function (__x25) {
      var ____id7 = __x25;
      var __lh1 = has(____id7, 0);
      var __rh1 = has(____id7, 1);
      __lh1 = macroexpand(__lh1);
      if (! atom63(__lh1) && hd(__lh1) === "has") {
        return ["%set", join(["%get"], tl(__lh1)), __rh1];
      } else {
        return ["%set", __lh1, __rh1];
      }
    }, pair(__args5)));
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
      var ____id11 = __body2;
      var __expr2 = has(____id11, 0);
      var __body3 = cut(____id11, 1);
      var __comps1 = [];
      var __cond1 = undefined;
      while (_35(__body3) > 2 && (__body3[0] === "for" && __body3[2] === "in")) {
        var ____id12 = __body3;
        var ___for1 = has(____id12, 0);
        var __names1 = has(____id12, 1);
        var ___in1 = has(____id12, 2);
        var __l9 = has(____id12, 3);
        var __body12 = cut(____id12, 4);
        add(__comps1, [__names1, __l9]);
        __body3 = __body12;
      }
      if (hd(__body3) === "if") {
        var ____id13 = __body3;
        var ___if1 = has(____id13, 0);
        var __expr3 = has(____id13, 1);
        __cond1 = __expr3;
      }
      return ["%list", __expr2, __comps1, __cond1];
    } else {
      var __x50 = unique("x");
      var __l10 = [];
      var __forms1 = [];
      var ____o19 = __body2;
      var __k36 = undefined;
      for (__k36 in ____o19) {
        var __v22 = ____o19[__k36];
        var __e42 = undefined;
        if (numeric63(__k36)) {
          __e42 = parseInt(__k36);
        } else {
          __e42 = __k36;
        }
        var __k37 = __e42;
        if (number63(__k37)) {
          __l10[__k37] = __v22;
        } else {
          add(__forms1, ["%set", ["%get", __x50, ["quote", __k37]], __v22]);
        }
      }
      if (some63(__forms1)) {
        return join(["let", __x50, ["object", join(["%array"], __l10)]], __forms1, [__x50]);
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
    var ____r109 = unstash(Array.prototype.slice.call(arguments, 1));
    var __expr5 = destash33(expr, ____r109);
    var ____id16 = ____r109;
    var __e43 = undefined;
    if (nil63(has(____id16, "cmp"))) {
      __e43 = "=";
    } else {
      __e43 = has(____id16, "cmp");
    }
    var __cmp1 = __e43;
    var __clauses1 = cut(____id16, 0);
    var __x70 = unique("x");
    var __eq1 = function (_) {
      return [__cmp1, _, __x70];
    };
    var __cl1 = function (__x72) {
      var ____id17 = __x72;
      var __a4 = has(____id17, 0);
      var __b4 = has(____id17, 1);
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
    return ["let", __x70, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
  }
});
setenv("of", {
  _stash: true,
  macro: function (x) {
    var ____r113 = unstash(Array.prototype.slice.call(arguments, 1));
    var __x83 = destash33(x, ____r113);
    var ____id19 = ____r113;
    var __values1 = cut(____id19, 0);
    return join(["case", __x83, __values1, true, false], props(__values1));
  }
});
setenv("when", {
  _stash: true,
  macro: function (cond) {
    var ____r115 = unstash(Array.prototype.slice.call(arguments, 1));
    var __cond3 = destash33(cond, ____r115);
    var ____id21 = ____r115;
    var __body5 = cut(____id21, 0);
    return ["%if", __cond3, join(["%do"], __body5)];
  }
});
setenv("unless", {
  _stash: true,
  macro: function (cond) {
    var ____r117 = unstash(Array.prototype.slice.call(arguments, 1));
    var __cond5 = destash33(cond, ____r117);
    var ____id23 = ____r117;
    var __body7 = cut(____id23, 0);
    return ["%if", ["%not", __cond5], join(["%do"], __body7)];
  }
});
setenv("obj", {
  _stash: true,
  macro: function () {
    var __body10 = unstash(Array.prototype.slice.call(arguments, 0));
    if (_35(__body10) > 2 && (__body10[1] === "for" && __body10[3] === "in")) {
      var ____id27 = __body10;
      var __expr8 = has(____id27, 0);
      var __body111 = cut(____id27, 1);
      var __comps3 = [];
      var __cond7 = undefined;
      while (_35(__body111) > 2 && (__body111[0] === "for" && __body111[2] === "in")) {
        var ____id28 = __body111;
        var ___for3 = has(____id28, 0);
        var __names3 = has(____id28, 1);
        var ___in3 = has(____id28, 2);
        var __l121 = has(____id28, 3);
        var __body14 = cut(____id28, 4);
        add(__comps3, [__names3, __l121]);
        __body111 = __body14;
      }
      if (hd(__body111) === "if") {
        var ____id29 = __body111;
        var ___if3 = has(____id29, 0);
        var __expr9 = has(____id29, 1);
        __cond7 = __expr9;
      }
      if (list63(__expr8) && hd63(__expr8, ",")) {
        __expr8 = join([":"], tl(__expr8));
      }
      var ____x101 = object(["%list", __expr8, __comps3, __cond7]);
      ____x101.kind = "object";
      return ____x101;
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
    var ____r121 = unstash(Array.prototype.slice.call(arguments, 1));
    var __bs11 = destash33(bs, ____r121);
    var ____id34 = ____r121;
    var __body131 = cut(____id34, 0);
    if (atom63(__bs11) || hd63(__bs11, ",")) {
      return join(["let", [__bs11, hd(__body131)]], tl(__body131));
    } else {
      if (none63(__bs11)) {
        return join(["%do"], __body131);
      } else {
        var ____id35 = __bs11;
        var __lh3 = has(____id35, 0);
        var __rh3 = has(____id35, 1);
        var __bs21 = cut(____id35, 2);
        var ____id36 = bind(__lh3, __rh3);
        var __id37 = has(____id36, 0);
        var __val1 = has(____id36, 1);
        var __bs12 = cut(____id36, 2);
        var __renames1 = [];
        if (! id_literal63(__id37)) {
          var __id121 = unique(__id37);
          __renames1 = [__id37, __id121];
          __id37 = __id121;
        }
        return ["%do", ["%local", __id37, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body131)]];
      }
    }
  }
});
setenv("with", {
  _stash: true,
  macro: function (x, v) {
    var ____r123 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x126 = destash33(x, ____r123);
    var __v24 = destash33(v, ____r123);
    var ____id39 = ____r123;
    var __body15 = cut(____id39, 0);
    if (__v24 === "as") {
      return join(["%with", ["%as", __x126, hd(__body15)]], tl(__body15));
    } else {
      if (! atom63(__x126) || has(__body15, "async")) {
        return join(["%with", __x126, __v24], __body15);
      } else {
        return join(["let", [__x126, __v24]], __body15, [__x126]);
      }
    }
  }
});
setenv("let-when", {
  _stash: true,
  macro: function (x, v) {
    var ____r125 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x139 = destash33(x, ____r125);
    var __v26 = destash33(v, ____r125);
    var ____id41 = ____r125;
    var __body17 = cut(____id41, 0);
    var __y6 = unique("y");
    return ["let", __y6, __v26, ["when", ["yes", __y6], join(["let", [__x139, __y6]], __body17)]];
  }
});
setenv("define-macro", {
  _stash: true,
  macro: function (name, args) {
    var ____r127 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name1 = destash33(name, ____r127);
    var __args7 = destash33(args, ____r127);
    var ____id43 = ____r127;
    var __body19 = cut(____id43, 0);
    var ____x148 = object(["setenv", ["quote", __name1]]);
    ____x148.macro = join(["fn", __args7], __body19);
    var __form1 = ____x148;
    _eval(__form1);
    return __form1;
  }
});
setenv("define-special", {
  _stash: true,
  macro: function (name, args) {
    var ____r129 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name3 = destash33(name, ____r129);
    var __args9 = destash33(args, ____r129);
    var ____id45 = ____r129;
    var __body21 = cut(____id45, 0);
    var ____x154 = object(["setenv", ["quote", __name3]]);
    ____x154.special = join(["fn", __args9], __body21);
    var __form3 = join(____x154, props(__body21));
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
    var ____x160 = object(["setenv", ["quote", name]]);
    ____x160.symbol = ["quote", expansion];
    return ____x160;
  }
});
setenv("define-reader", {
  _stash: true,
  macro: function (__x168) {
    var ____r133 = unstash(Array.prototype.slice.call(arguments, 1));
    var ____x168 = destash33(__x168, ____r133);
    var ____id48 = ____x168;
    var __char1 = has(____id48, 0);
    var __s2 = has(____id48, 1);
    var ____id49 = ____r133;
    var __body23 = cut(____id49, 0);
    return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body23)];
  }
});
setenv("define", {
  _stash: true,
  macro: function (name, x) {
    var ____r135 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name5 = destash33(name, ____r135);
    var __x176 = destash33(x, ____r135);
    var ____id51 = ____r135;
    var __body25 = cut(____id51, 0);
    setenv(__name5, {
      _stash: true,
      variable: true
    });
    if (some63(__body25)) {
      return join(["%local-function", __name5], bind42(__x176, __body25), props(__body25));
    } else {
      return join(["%local", __name5, __x176], props(__body25));
    }
  }
});
setenv("define-global", {
  _stash: true,
  macro: function (name, x) {
    var ____r137 = unstash(Array.prototype.slice.call(arguments, 2));
    var __name7 = destash33(name, ____r137);
    var __x182 = destash33(x, ____r137);
    var ____id53 = ____r137;
    var __body27 = cut(____id53, 0);
    setenv(__name7, {
      _stash: true,
      toplevel: true,
      variable: true
    });
    if (some63(__body27)) {
      return join(["%global-function", __name7], bind42(__x182, __body27), props(__body27));
    } else {
      return join(["set", __name7, __x182], props(__body27));
    }
  }
});
setenv("get-value", {
  _stash: true,
  macro: function (x) {
    var ____x189 = object(["setenv", x]);
    ____x189.toplevel = true;
    return ["has", ____x189, ["quote", "value"]];
  }
});
setenv("define-constant", {
  _stash: true,
  macro: function (name, x) {
    var ____x200 = object(["setenv", ["quote", name]]);
    ____x200.toplevel = true;
    ____x200.value = either(x, ["get-value", ["quote", name]]);
    return ["%do", ____x200, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
    var ____r146 = unstash(Array.prototype.slice.call(arguments, 1));
    var __x228 = destash33(x, ____r146);
    var ____id55 = ____r146;
    var __body29 = cut(____id55, 0);
    var __ok2 = unique("ok");
    var __r147 = unique("r");
    var ____x229 = object(["target", ["try", __x228, join(["finally"], __body29)]]);
    ____x229.lua = join(["let", [[__ok2, __r147], ["guard", __x228]]], __body29, [["if", __ok2, __r147, ["throw", __r147]]]);
    return ____x229;
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
      var __v28 = ____o21[__k40];
      var __e44 = undefined;
      if (numeric63(__k40)) {
        __e44 = parseInt(__k40);
      } else {
        __e44 = __k40;
      }
      var __k41 = __e44;
      if (! number63(__k41)) {
        var ____x255 = object(["setenv", ["quote", __k41]]);
        ____x255.value = __v28;
        add(__forms3, ____x255);
      }
    }
    return join(["with-frame"], __forms3);
  }
});
setenv("with-bindings", {
  _stash: true,
  macro: function (__x262) {
    var ____r149 = unstash(Array.prototype.slice.call(arguments, 1));
    var ____x262 = destash33(__x262, ____r149);
    var ____id58 = ____x262;
    var __names5 = has(____id58, 0);
    var ____id59 = ____r149;
    var __body35 = cut(____id59, 0);
    var __x263 = unique("x");
    var ____x266 = object(["setenv", __x263]);
    ____x266.variable = true;
    return join(["with-frame", ["each", __x263, __names5, ____x266]], __body35);
  }
});
setenv("let-macro", {
  _stash: true,
  macro: function (definitions) {
    var ____r154 = unstash(Array.prototype.slice.call(arguments, 1));
    var __definitions1 = destash33(definitions, ____r154);
    var ____id61 = ____r154;
    var __body37 = cut(____id61, 0);
    add(environment, {});
    var ____r156 = undefined;
    try{
      map(function (m) {
        return macroexpand(join(["define-macro"], m));
      }, __definitions1);
      ____r156 = join(["%do"], macroexpand(__body37));
    }
    finally{
      drop(environment);
    }
    return ____r156;
  }
});
setenv("let-symbol", {
  _stash: true,
  macro: function (expansions) {
    var ____r162 = unstash(Array.prototype.slice.call(arguments, 1));
    var __expansions1 = destash33(expansions, ____r162);
    var ____id64 = ____r162;
    var __body39 = cut(____id64, 0);
    add(environment, {});
    var ____r164 = undefined;
    try{
      map(function (__x274) {
        var ____id65 = __x274;
        var __name9 = has(____id65, 0);
        var __exp1 = has(____id65, 1);
        return macroexpand(["define-symbol", __name9, __exp1]);
      }, pair(__expansions1));
      ____r164 = join(["%do"], macroexpand(__body39));
    }
    finally{
      drop(environment);
    }
    return ____r164;
  }
});
setenv("let-unique", {
  _stash: true,
  macro: function (names) {
    var ____r168 = unstash(Array.prototype.slice.call(arguments, 1));
    var __names7 = destash33(names, ____r168);
    var ____id67 = ____r168;
    var __body41 = cut(____id67, 0);
    var __bs3 = map(function (n) {
      return [n, ["unique", ["quote", n]]];
    }, __names7);
    return join(["let", apply(join, __bs3)], __body41);
  }
});
setenv("fn", {
  _stash: true,
  macro: function (args) {
    var ____r171 = unstash(Array.prototype.slice.call(arguments, 1));
    var __args111 = destash33(args, ____r171);
    var ____id69 = ____r171;
    var __body43 = cut(____id69, 0);
    return join(["%function"], bind42(__args111, __body43), props(__body43));
  }
});
setenv("apply", {
  _stash: true,
  macro: function (f) {
    var ____r173 = unstash(Array.prototype.slice.call(arguments, 1));
    var __f3 = destash33(f, ____r173);
    var ____id71 = ____r173;
    var __args13 = cut(____id71, 0);
    if (_35(__args13) > 1) {
      return ["%call", "apply", __f3, ["join", join(["list"], almost(__args13)), last(__args13), join(["list"], props(__args13))]];
    } else {
      if (props63(__args13)) {
        return ["%call", "apply", __f3, join(["join"], __args13, [join(["list"], props(__args13))])];
      } else {
        return join(["%call", "apply", __f3], __args13);
      }
    }
  }
});
setenv("guard", {
  _stash: true,
  macro: function (expr) {
    var ____x335 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
    var ____x347 = object(["obj"]);
    ____x347.stack = [["idx", "debug", "traceback"]];
    ____x347.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
    ____x335.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x347]]]];
    return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x335];
  }
});
setenv("each", {
  _stash: true,
  macro: function (x, t) {
    var ____r177 = unstash(Array.prototype.slice.call(arguments, 2));
    var __x374 = destash33(x, ____r177);
    var __t4 = destash33(t, ____r177);
    var ____id74 = ____r177;
    var __body45 = cut(____id74, 0);
    var __o23 = unique("o");
    var __n31 = unique("n");
    var __i37 = unique("i");
    var __e45 = undefined;
    if (atom63(__x374)) {
      __e45 = [__i37, __x374];
    } else {
      var __e46 = undefined;
      if (_35(__x374) > 1) {
        __e46 = __x374;
      } else {
        __e46 = [__i37, hd(__x374)];
      }
      __e45 = __e46;
    }
    var ____id75 = __e45;
    var __k43 = has(____id75, 0);
    var __v30 = has(____id75, 1);
    var ____x380 = object(["target", __o23]);
    ____x380.py = ["indices", __o23];
    var __e47 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e47 = __body45;
    } else {
      __e47 = [join(["let", __k43, ["if", ["numeric?", __k43], ["parseInt", __k43], __k43]], __body45)];
    }
    return ["let", [__o23, __t4, __k43, "nil"], join(["%for", ____x380, __k43], props(__body45), [join(["let", [__v30, ["%get", __o23, __k43]]], __e47)])];
  }
});
setenv("for", {
  _stash: true,
  macro: function (i, to) {
    var ____r179 = unstash(Array.prototype.slice.call(arguments, 2));
    var __i39 = destash33(i, ____r179);
    var __to1 = destash33(to, ____r179);
    var ____id77 = ____r179;
    var __body47 = cut(____id77, 0);
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
    var ____r181 = unstash(Array.prototype.slice.call(arguments, 2));
    var __v32 = destash33(v, ____r181);
    var __t6 = destash33(t, ____r181);
    var ____id79 = ____r181;
    var __body49 = cut(____id79, 0);
    var __x413 = unique("x");
    var __i41 = unique("i");
    return ["let", [__x413, __t6], ["for", __i41, ["#", __x413], join(["let", [__v32, ["at", __x413, __i41]]], __body49)]];
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
      var __x423 = ____o25[____i43];
      var __e48 = undefined;
      if (numeric63(____i43)) {
        __e48 = parseInt(____i43);
      } else {
        __e48 = ____i43;
      }
      var ____i431 = __e48;
      __l14[__x423] = true;
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
    var ____r187 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a6 = destash33(a, ____r187);
    var ____id81 = ____r187;
    var __bs5 = cut(____id81, 0);
    return ["set", __a6, join(["join", __a6], __bs5)];
  }
});
setenv("cat!", {
  _stash: true,
  macro: function (a) {
    var ____r189 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a8 = destash33(a, ____r189);
    var ____id83 = ____r189;
    var __bs7 = cut(____id83, 0);
    return ["set", __a8, join(["cat", __a8], __bs7)];
  }
});
setenv("inc", {
  _stash: true,
  macro: function (n, by) {
    var __e49 = undefined;
    if (nil63(by)) {
      __e49 = 1;
    } else {
      __e49 = by;
    }
    return ["set", n, ["+", n, __e49]];
  }
});
setenv("dec", {
  _stash: true,
  macro: function (n, by) {
    var __e50 = undefined;
    if (nil63(by)) {
      __e50 = 1;
    } else {
      __e50 = by;
    }
    return ["set", n, ["-", n, __e50]];
  }
});
setenv("with-indent", {
  _stash: true,
  macro: function (form) {
    var __x450 = unique("x");
    return ["%do", ["inc", "indent-level"], ["with", __x450, form, ["dec", "indent-level"]]];
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
    var ____r199 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name11 = destash33(name, ____r199);
    var ____id85 = ____r199;
    var __body55 = cut(____id85, 0);
    return join(["define-global", __name11], __body55);
  }
});
setenv("mac", {
  _stash: true,
  macro: function (name) {
    var ____r201 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name13 = destash33(name, ____r201);
    var ____id87 = ____r201;
    var __body57 = cut(____id87, 0);
    return join(["define-macro", __name13], __body57);
  }
});
setenv("defconst", {
  _stash: true,
  macro: function (name) {
    var ____r203 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name15 = destash33(name, ____r203);
    var ____id89 = ____r203;
    var __value1 = cut(____id89, 0);
    return join(["def", __name15], __value1);
  }
});
setenv("undefined?", {
  _stash: true,
  macro: function (name) {
    var ____x502 = object(["target"]);
    ____x502.js = ["=", ["typeof", name], "\"undefined\""];
    ____x502.lua = ["=", ["idx", "_G", name], "nil"];
    ____x502.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
    return ____x502;
  }
});
setenv("defvar", {
  _stash: true,
  macro: function (name) {
    var ____r207 = unstash(Array.prototype.slice.call(arguments, 1));
    var __name17 = destash33(name, ____r207);
    var ____id91 = ____r207;
    var __value3 = cut(____id91, 0);
    var ____x518 = object(["target"]);
    ____x518.py = ["global", __name17];
    return ["when", ["undefined?", __name17], ____x518, join(["defconst", __name17], __value3)];
  }
});
setenv("async", {
  _stash: true,
  macro: function (keyword) {
    var ____r209 = unstash(Array.prototype.slice.call(arguments, 1));
    var __keyword1 = destash33(keyword, ____r209);
    var ____id93 = ____r209;
    var __body59 = cut(____id93, 0);
    var ____x522 = object([__keyword1]);
    ____x522.async = true;
    return join(____x522, __body59);
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
    var ____r215 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a10 = destash33(a, ____r215);
    var ____id95 = ____r215;
    var __bs9 = cut(____id95, 0);
    if (nil63(__a10)) {
      return "";
    } else {
      if (none63(__bs9)) {
        return __a10;
      } else {
        if (one63(__bs9)) {
          var ____x546 = object(["target", join(["%cat", __a10], __bs9)]);
          ____x546.py = join(["%call", "cat", __a10], __bs9);
          return ____x546;
        } else {
          var ____x549 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]]);
          ____x549.py = join(["%call", "cat", __a10], __bs9);
          return ____x549;
        }
      }
    }
  }
});
setenv("+", {
  _stash: true,
  macro: function () {
    var __args15 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args15)) {
      return 0;
    } else {
      if (one63(__args15)) {
        return hd(__args15);
      } else {
        return join(["%add"], __args15);
      }
    }
  }
});
setenv("-", {
  _stash: true,
  macro: function () {
    var __args17 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args17)) {
      return 0;
    } else {
      if (one63(__args17)) {
        return ["%unm", hd(__args17)];
      } else {
        return join(["%sub"], __args17);
      }
    }
  }
});
setenv("*", {
  _stash: true,
  macro: function () {
    var __args19 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args19)) {
      return 1;
    } else {
      if (one63(__args19)) {
        return hd(__args19);
      } else {
        return join(["%mul"], __args19);
      }
    }
  }
});
setenv("/", {
  _stash: true,
  macro: function () {
    var __args21 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args21)) {
      return 1;
    } else {
      if (one63(__args21)) {
        return hd(__args21);
      } else {
        return join(["%div"], __args21);
      }
    }
  }
});
setenv("//", {
  _stash: true,
  macro: function () {
    var __args23 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args23)) {
      return 1;
    } else {
      if (one63(__args23)) {
        return hd(__args23);
      } else {
        return join(["%idiv"], __args23);
      }
    }
  }
});
setenv("%", {
  _stash: true,
  macro: function () {
    var __args25 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args25)) {
      return 0;
    } else {
      if (one63(__args25)) {
        return hd(__args25);
      } else {
        return join(["%mod"], __args25);
      }
    }
  }
});
setenv("<", {
  _stash: true,
  macro: function (a) {
    var ____r217 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a12 = destash33(a, ____r217);
    var ____id97 = ____r217;
    var __bs111 = cut(____id97, 0);
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
    var ____r219 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a14 = destash33(a, ____r219);
    var ____id99 = ____r219;
    var __bs13 = cut(____id99, 0);
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
    var ____r221 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a16 = destash33(a, ____r221);
    var ____id101 = ____r221;
    var __bs15 = cut(____id101, 0);
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
    var ____r223 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a18 = destash33(a, ____r223);
    var ____id103 = ____r223;
    var __bs17 = cut(____id103, 0);
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
    var ____r225 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a20 = destash33(a, ____r225);
    var ____id105 = ____r225;
    var __bs19 = cut(____id105, 0);
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
    var __args27 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args27)) {
      return false;
    } else {
      if (one63(__args27)) {
        return join(["%not"], __args27);
      } else {
        return ["%and", ["%not", hd(__args27)], join(["not"], tl(__args27))];
      }
    }
  }
});
setenv("and", {
  _stash: true,
  macro: function (a) {
    var ____r227 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a22 = destash33(a, ____r227);
    var ____id107 = ____r227;
    var __bs211 = cut(____id107, 0);
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
    var ____r229 = unstash(Array.prototype.slice.call(arguments, 1));
    var __a24 = destash33(a, ____r229);
    var ____id109 = ____r229;
    var __bs23 = cut(____id109, 0);
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
    var __args29 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%break"], __args29);
  }
});
setenv("return", {
  _stash: true,
  macro: function () {
    var __args31 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%return"], __args31);
  }
});
setenv("while", {
  _stash: true,
  macro: function (c) {
    var ____r231 = unstash(Array.prototype.slice.call(arguments, 1));
    var __c3 = destash33(c, ____r231);
    var ____id1111 = ____r231;
    var __body61 = cut(____id1111, 0);
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
    var __args33 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%get"], __args33);
  }
});
setenv("idx", {
  _stash: true,
  macro: function () {
    var __args35 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%idx"], __args35);
  }
});
setenv("new", {
  _stash: true,
  macro: function () {
    var __args37 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%new"], __args37);
  }
});
setenv("typeof", {
  _stash: true,
  macro: function () {
    var __args39 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%typeof"], __args39);
  }
});
setenv("error", {
  _stash: true,
  macro: function () {
    var __args41 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%error"], __args41);
  }
});
setenv("throw", {
  _stash: true,
  macro: function () {
    var __args43 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%throw"], __args43);
  }
});
setenv("raise", {
  _stash: true,
  macro: function () {
    var __args45 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%throw"], __args45);
  }
});
setenv("is", {
  _stash: true,
  macro: function () {
    var __args47 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%is"], __args47);
  }
});
setenv("in", {
  _stash: true,
  macro: function () {
    var __args49 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%in"], __args49);
  }
});
setenv("as", {
  _stash: true,
  macro: function () {
    var __args51 = unstash(Array.prototype.slice.call(arguments, 0));
    return join(["%as"], __args51);
  }
});
setenv("%expand-case", {
  _stash: true,
  macro: function (x) {
    var ____r233 = unstash(Array.prototype.slice.call(arguments, 1));
    var __x660 = destash33(x, ____r233);
    var ____id114 = ____r233;
    var __body65 = cut(____id114, 0);
    var __e51 = undefined;
    if (atom63(__x660)) {
      __e51 = [__x660];
    } else {
      __e51 = __x660;
    }
    var ____id115 = __e51;
    var __a26 = has(____id115, 0);
    var __bs25 = cut(____id115, 1);
    var __e52 = undefined;
    if (none63(__bs25)) {
      __e52 = [["%literal"]];
    } else {
      __e52 = __bs25;
    }
    return join(["%block", __a26], __e52, __body65);
  }
});
setenv("%cases", {
  _stash: true,
  macro: function () {
    var __args53 = unstash(Array.prototype.slice.call(arguments, 0));
    if (none63(__args53)) {
      return ["do"];
    } else {
      if (one63(__args53)) {
        return join(["%expand-case"], hd(__args53));
      } else {
        var __r236 = unique("r");
        return join(["with", __r236, "nil"], map(function (__x678) {
          var ____id117 = __x678;
          var __x679 = has(____id117, 0);
          var __body67 = cut(____id117, 1);
          return ["%expand-case", __x679, ["%set", __r236, join(["%do"], __body67)]];
        }, almost(__args53)), [join(["%expand-case"], last(__args53))]);
      }
    }
  }
});
setenv("try", {
  _stash: true,
  macro: function (x) {
    var ____r239 = unstash(Array.prototype.slice.call(arguments, 1));
    var __x698 = destash33(x, ____r239);
    var ____id122 = ____r239;
    var __cases1 = cut(____id122, 0);
    var __fin1 = ["finally"];
    var ____o27 = __cases1;
    var ____i46 = undefined;
    for (____i46 in ____o27) {
      var __x700 = ____o27[____i46];
      var __e53 = undefined;
      if (numeric63(____i46)) {
        __e53 = parseInt(____i46);
      } else {
        __e53 = ____i46;
      }
      var ____i461 = __e53;
      if (hd63(__x700, "finally")) {
        __fin1 = __x700;
      }
    }
    var __forms7 = [];
    var ____x703 = __cases1;
    var ____i47 = 0;
    while (____i47 < _35(____x703)) {
      var ____id123 = ____x703[____i47];
      var __x704 = has(____id123, 0);
      var __body71 = cut(____id123, 1);
      if (__x704 === "finally") {
      } else {
        if (__x704 === "except" && has(__body71, 1) === "as") {
          var ____id124 = __body71;
          var __kind2 = has(____id124, 0);
          var ___1 = has(____id124, 1);
          var __name19 = has(____id124, 2);
          var __body72 = cut(____id124, 3);
          add(__forms7, join([[__x704, ["%as", __kind2, __name19]]], __body72));
        } else {
          if (__x704 === "except") {
            var ____id125 = __body71;
            var __kind3 = has(____id125, 0);
            var __body73 = cut(____id125, 1);
            add(__forms7, join([[__x704, __kind3]], __body73));
          } else {
            throw new Error("Unknown try clause");
          }
        }
      }
      ____i47 = ____i47 + 1;
    }
    return join(["%cases", ["try", __x698]], __forms7, [__fin1]);
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
    var ____x727 = object(["target", ["do"]]);
    ____x727.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
    return ____x727;
  }
});
setenv("see", {
  _stash: true,
  macro: function (form) {
    var __form7 = expand(form);
    print(compile(expand(["%set", "lumen-result", __form7])));
    return __form7;
  }
});
var reader = require("reader");
var compiler = require("compiler");
var system = require("system");
disp = function (str) {
  system.write(str);
  return system.flush();
};
pp = function (x) {
  if (list63(x) && _35(x) > 1) {
    var __c4 = "  ";
    var __nl = undefined;
    print("(");
    var ____x735 = x;
    var ____i48 = 0;
    while (____i48 < _35(____x735)) {
      var __v33 = ____x735[____i48];
      if (__nl) {
        print("");
      }
      disp(__c4);
      __nl = true;
      __c4 = "  ";
      print(str(__v33));
      ____i48 = ____i48 + 1;
    }
    return print(")");
  } else {
    return print(str(x));
  }
};
dir = function (x) {
  return Object.getOwnPropertyNames(x);
};
lines = function (x) {
  return split(x, "\n");
};
get_indentation = function (s) {
  var __r251 = "";
  var __i49 = 0;
  while (__i49 < _35(s)) {
    var __c5 = char(s, __i49);
    if (__c5 === " ") {
      __r251 = __r251 + __c5;
    }
    __i49 = __i49 + 1;
  }
  return __r251;
};
strip_outer = function (s, lh, rh) {
  if (string_starts63(s, lh) && string_ends63(s, rh)) {
    return clip(clip(s, 0, _35(s) - _35(rh)), _35(lh));
  } else {
    return s;
  }
};
toplevel_print = function (v) {
  return pp(v);
};
print_exception = function (v, ex) {
  print(v.stack);
  return undefined;
};
_37self = reader;
var accessor_literal63 = function (form) {
  return string63(form) && (! string_literal63(form) && (! id_literal63(form) && (char(form, 0) === "." && (!( clip(form, 0, 2) === "..") && _35(form) > 1))));
};
eval_self_form = function (form) {
  if (form === ".") {
    return "%self";
  } else {
    if (accessor_literal63(form)) {
      return ["%self", form];
    } else {
      if (! list63(form)) {
        return form;
      } else {
        if (hd63(form, "%self") && _35(form) > 1) {
          return ["%set", "%self", form[1]];
        } else {
          if (hd63(form, "import") || hd63(form, "from") && has(form, 2) === "import") {
            return ["%do", form, ["%set", "%self", last(form)]];
          } else {
            if (accessor_literal63(hd(form))) {
              return join(["%self"], form);
            } else {
              return form;
            }
          }
        }
      }
    }
  }
};
eval_print = function (form) {
  var __form8 = eval_self_form(form);
  var ____id126 = (function () {
    try {
      return [true, compiler.eval(__form8)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok7 = has(____id126, 0);
  var __v34 = has(____id126, 1);
  var __ex = has(____id126, 2);
  if (! __ok7) {
    return print_exception(__v34, __ex);
  } else {
    if (is63(__v34)) {
      return toplevel_print(__v34);
    }
  }
};
read_toplevel = function (str, more) {
  var __s3 = reader.stream(str, more);
  var ____id127 = (function () {
    try {
      return [true, reader.read_all(__s3)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok8 = has(____id127, 0);
  var __v35 = has(____id127, 1);
  var __e54 = undefined;
  if (__ok8) {
    __e54 = __v35;
  } else {
    __e54 = undefined;
  }
  var __x742 = __e54;
  if (__x742 === more) {
    return more;
  } else {
    if (nil63(__x742)) {
      return __x742;
    } else {
      if (one63(__x742)) {
        return hd(__x742);
      } else {
        return __x742;
      }
    }
  }
};
var rep = function (str) {
  var __v36 = _eval(read_toplevel(str));
  if (is63(__v36)) {
    return toplevel_print(__v36);
  }
};
var repl = function () {
  var o = {buf: ""};
  var reset = function () {
    o.buf = "";
    return disp("> ");
  };
  var ctrl_c = function () {
    print("");
    reset();
    return ctrl_c;
  };
  var rep1 = function (s) {
    o.buf = o.buf + s;
    var __more = [];
    var __form9 = read_toplevel(o.buf, __more);
    if (!( __form9 === __more)) {
      eval_print(__form9);
      return reset();
    }
  };
  reset();
  var ___in4 = process.stdin;
  ___in4.setEncoding("utf8");
  return ___in4.on("data", rep1);
};
read_file = function (path) {
  return system.read_file(path);
};
read_from_file = function (path) {
  var __s4 = reader.stream(read_file(path));
  return reader.read_all(__s4);
};
expand_file = function (path) {
  var __body74 = read_from_file(path);
  return compiler.expand(join(["do"], __body74));
};
compile_file = function (path) {
  var __form10 = expand_file(path);
  return compiler.compile(__form10, {
    _stash: true,
    stmt: true
  });
};
load = function (path) {
  var __previous = has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value");
  var __previous_indent = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value");
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = "js";
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = 0;
  var __code = compile_file(path);
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = __previous_indent;
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = __previous;
  return compiler.run(__code);
};
var script_file63 = function (path) {
  return !( "-" === char(path, 0) || (".py" === clip(path, _35(path) - 3) || (".js" === clip(path, _35(path) - 3) || ".lua" === clip(path, _35(path) - 4))));
};
var run_file = function (path) {
  if (script_file63(path)) {
    return load(path);
  } else {
    return compiler.run(system.read_file(path));
  }
};
var usage = function () {
  print("usage: lumen [<file> <arguments> | options <object files>]");
  print(" <file>\t\tProgram read from script file");
  print(" <arguments>\tPassed to program in system.argv");
  print(" <object files>\tLoaded before compiling <input>");
  print("options:");
  print(" -c <input>\tCompile input file");
  print(" -o <output>\tOutput file");
  print(" -t <target>\tTarget language (default: lua)");
  return print(" -e <expr>\tExpression to evaluate");
};
var main = function (args) {
  var __arg = hd(args);
  if (__arg && script_file63(__arg)) {
    return load(__arg);
  } else {
    if (__arg === "-h" || __arg === "--help") {
      return usage();
    } else {
      var __pre = [];
      var __input = undefined;
      var __output = undefined;
      var __target1 = undefined;
      var __expr10 = undefined;
      var __argv = system.argv;
      var __i50 = 0;
      while (__i50 < _35(__argv)) {
        var __a27 = __argv[__i50];
        if (__a27 === "-c" || (__a27 === "-o" || (__a27 === "-t" || __a27 === "-e"))) {
          if (__i50 === edge(__argv)) {
            print("missing argument for " + __a27);
          } else {
            __i50 = __i50 + 1;
            var __val2 = __argv[__i50];
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
                    __expr10 = __val2;
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
        __i50 = __i50 + 1;
      }
      var ____x745 = __pre;
      var ____i51 = 0;
      while (____i51 < _35(____x745)) {
        var __file = ____x745[____i51];
        run_file(__file);
        ____i51 = ____i51 + 1;
      }
      if (nil63(__input)) {
        if (__expr10) {
          return rep(__expr10);
        } else {
          return repl();
        }
      } else {
        if (__target1) {
          setenv("target", {
            _stash: true,
            toplevel: true
          }).value = __target1;
        }
        var __code1 = compile_file(__input);
        if (nil63(__output) || __output === "-") {
          return print(__code1);
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
