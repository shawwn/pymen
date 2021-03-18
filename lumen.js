if (typeof(environment) === "undefined") {
  environment = [{}];
}
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
  if (nil63(x)) {
    return 0;
  } else {
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
  }
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
  if (is63(l)) {
    return l[0];
  }
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
  if (is63(l)) {
    return cut(l, 1);
  }
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
testify = function (x, test) {
  if (function63(x)) {
    return x;
  } else {
    if (test) {
      return function (y) {
        return test(y, x);
      };
    } else {
      return function (y) {
        return x === y;
      };
    }
  }
};
find = function (x, t) {
  var __f = testify(x);
  var ____o7 = t;
  var ____i10 = undefined;
  for (____i10 in ____o7) {
    var __x4 = ____o7[____i10];
    var __e21 = undefined;
    if (numeric63(____i10)) {
      __e21 = parseInt(____i10);
    } else {
      __e21 = ____i10;
    }
    var ____i101 = __e21;
    var __y = __f(__x4);
    if (__y) {
      return __y;
    }
  }
};
first = function (x, l, pos) {
  var __f1 = testify(x);
  var __i11 = either(pos, 0);
  var __n12 = -1;
  var ____o8 = l;
  var __k14 = undefined;
  for (__k14 in ____o8) {
    var __v7 = ____o8[__k14];
    var __e22 = undefined;
    if (numeric63(__k14)) {
      __e22 = parseInt(__k14);
    } else {
      __e22 = __k14;
    }
    var __k15 = __e22;
    if (number63(__k15)) {
      __n12 = max(__n12, __k15);
    }
  }
  __n12 = __n12 + 1;
  while (__i11 < __n12) {
    var __v8 = l[__i11];
    var ____y1 = __f1(__v8);
    if (yes(____y1)) {
      var __y2 = ____y1;
      return __i11;
    }
    __i11 = __i11 + 1;
  }
};
in63 = function (x, t) {
  return find(testify(x), t);
};
pair = function (l) {
  var __l12 = dupe(l);
  var __n14 = _35(l);
  var __i13 = 0;
  while (__i13 < __n14) {
    var __a = l[__i13];
    var __b = l[__i13 + 1];
    add(__l12, [__a, __b]);
    __i13 = __i13 + 1;
    __i13 = __i13 + 1;
  }
  return __l12;
};
var sortfunc = function (f) {
  if (f) {
    var __f2 = function (a, b) {
      if (f(a, b)) {
        return -1;
      } else {
        return 1;
      }
    };
    return __f2;
  }
};
sort = function (l, f) {
  l.sort(sortfunc(f));
  return l;
};
map = function (f, x) {
  var __t2 = dupe(x);
  var ____x6 = x;
  var ____i14 = 0;
  while (____i14 < _35(____x6)) {
    var __v9 = ____x6[____i14];
    var __y3 = f(__v9);
    if (is63(__y3)) {
      add(__t2, __y3);
    }
    ____i14 = ____i14 + 1;
  }
  var ____o9 = x;
  var __k16 = undefined;
  for (__k16 in ____o9) {
    var __v10 = ____o9[__k16];
    var __e23 = undefined;
    if (numeric63(__k16)) {
      __e23 = parseInt(__k16);
    } else {
      __e23 = __k16;
    }
    var __k17 = __e23;
    if (! number63(__k17)) {
      var __y4 = f(__v10);
      if (is63(__y4)) {
        __t2[__k17] = __y4;
      }
    }
  }
  return __t2;
};
mapcat = function (f, x, sep) {
  var __r60 = "";
  var __c = "";
  var ____x7 = x;
  var ____i16 = 0;
  while (____i16 < _35(____x7)) {
    var __v11 = ____x7[____i16];
    var __e24 = undefined;
    if (f) {
      __e24 = f(__v11);
    } else {
      __e24 = __v11;
    }
    var __y5 = __e24;
    if (is63(__y5)) {
      __r60 = __r60 + (__c + __y5);
      __c = sep || "";
    }
    ____i16 = ____i16 + 1;
  }
  return __r60;
};
keep = function (f, x) {
  return map(function (v) {
    if (yes(f(v))) {
      return v;
    }
  }, x);
};
props63 = function (t) {
  var ____o10 = t;
  var __k18 = undefined;
  for (__k18 in ____o10) {
    var __v12 = ____o10[__k18];
    var __e25 = undefined;
    if (numeric63(__k18)) {
      __e25 = parseInt(__k18);
    } else {
      __e25 = __k18;
    }
    var __k19 = __e25;
    if (! number63(__k19)) {
      return true;
    }
  }
  return false;
};
empty63 = function (t) {
  var ____o11 = t;
  var ____i18 = undefined;
  for (____i18 in ____o11) {
    var __x8 = ____o11[____i18];
    var __e26 = undefined;
    if (numeric63(____i18)) {
      __e26 = parseInt(____i18);
    } else {
      __e26 = ____i18;
    }
    var ____i181 = __e26;
    return false;
  }
  return true;
};
stash = function (args) {
  if (props63(args)) {
    var __p = {};
    var ____o12 = args;
    var __k20 = undefined;
    for (__k20 in ____o12) {
      var __v13 = ____o12[__k20];
      var __e27 = undefined;
      if (numeric63(__k20)) {
        __e27 = parseInt(__k20);
      } else {
        __e27 = __k20;
      }
      var __k21 = __e27;
      if (! number63(__k21)) {
        __p[__k21] = __v13;
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
      var ____o13 = __l4;
      var __k22 = undefined;
      for (__k22 in ____o13) {
        var __v14 = ____o13[__k22];
        var __e29 = undefined;
        if (numeric63(__k22)) {
          __e29 = parseInt(__k22);
        } else {
          __e29 = __k22;
        }
        var __k23 = __e29;
        if (!( __k23 === "_stash")) {
          __args1[__k23] = __v14;
        }
      }
      if (params) {
        var ____o14 = params;
        var __k24 = undefined;
        for (__k24 in ____o14) {
          var __v15 = ____o14[__k24];
          var __e30 = undefined;
          if (numeric63(__k24)) {
            __e30 = parseInt(__k24);
          } else {
            __e30 = __k24;
          }
          var __k25 = __e30;
          __args1[__k25] = __v15;
        }
      }
      return __args1;
    } else {
      if (params) {
        var __args11 = object(args);
        var ____o15 = params;
        var __k26 = undefined;
        for (__k26 in ____o15) {
          var __v16 = ____o15[__k26];
          var __e28 = undefined;
          if (numeric63(__k26)) {
            __e28 = parseInt(__k26);
          } else {
            __e28 = __k26;
          }
          var __k27 = __e28;
          __args11[__k27] = __v16;
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
    var ____o16 = l;
    var __k28 = undefined;
    for (__k28 in ____o16) {
      var __v17 = ____o16[__k28];
      var __e31 = undefined;
      if (numeric63(__k28)) {
        __e31 = parseInt(__k28);
      } else {
        __e31 = __k28;
      }
      var __k29 = __e31;
      if (!( __k29 === "_stash")) {
        args1[__k29] = __v17;
      }
    }
  } else {
    return l;
  }
};
search = function (s, pattern, start) {
  var __i24 = s.indexOf(pattern, start);
  if (__i24 >= 0) {
    return __i24;
  }
};
string_ends63 = function (str, x, pos) {
  var __e32 = undefined;
  if (is63(pos)) {
    __e32 = clip(str, pos);
  } else {
    __e32 = str;
  }
  var __str = __e32;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_starts63 = function (str, x, pos) {
  var __e33 = undefined;
  if (is63(pos)) {
    __e33 = clip(str, pos);
  } else {
    __e33 = str;
  }
  var __str1 = __e33;
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
    var __n23 = _35(sep);
    while (true) {
      var __i25 = search(s, sep);
      if (nil63(__i25)) {
        break;
      } else {
        add(__l5, clip(s, 0, __i25));
        s = clip(s, __i25 + __n23);
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
  var __i26 = 0;
  while (__i26 < edge(xs)) {
    var __a1 = xs[__i26];
    var __b1 = xs[__i26 + 1];
    if (! f(__a1, __b1)) {
      return false;
    }
    __i26 = __i26 + 1;
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
  var __n24 = parseFloat(s);
  if (! isNaN(__n24)) {
    return __n24;
  }
};
numeric63 = function (s) {
  var __n25 = _35(s);
  var __i27 = 0;
  while (__i27 < __n25) {
    if (! number_code63(code(s, __i27))) {
      return false;
    }
    __i27 = __i27 + 1;
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
    var __i28 = 0;
    while (__i28 < _35(s)) {
      var __c1 = char(s, __i28);
      var __e34 = undefined;
      if (__c1 === "\n") {
        __e34 = "\\n";
      } else {
        var __e35 = undefined;
        if (__c1 === "\r") {
          __e35 = "\\r";
        } else {
          var __e36 = undefined;
          if (__c1 === "\"") {
            __e36 = "\\\"";
          } else {
            var __e37 = undefined;
            if (__c1 === "\\") {
              __e37 = "\\\\";
            } else {
              __e37 = __c1;
            }
            __e36 = __e37;
          }
          __e35 = __e36;
        }
        __e34 = __e35;
      }
      var __c11 = __e34;
      __s1 = __s1 + __c11;
      __i28 = __i28 + 1;
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
  var ____ok = has(____id, 0);
  var ____v18 = has(____id, 1);
  var __e38 = undefined;
  if (____ok) {
    __e38 = ____v18;
  } else {
    __e38 = undefined;
  }
  var __r92 = __e38;
  if (__r92 === x) {
    return __r92;
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
                        var ____o17 = x;
                        var __k30 = undefined;
                        for (__k30 in ____o17) {
                          var __v19 = ____o17[__k30];
                          var __e39 = undefined;
                          if (numeric63(__k30)) {
                            __e39 = parseInt(__k30);
                          } else {
                            __e39 = __k30;
                          }
                          var __k31 = __e39;
                          if (number63(__k31)) {
                            __xs11[__k31] = str(__v19, repr, __l6);
                          } else {
                            if (function63(__v19)) {
                              add(__ks, ["." + __k31, ""]);
                            } else {
                              add(__ks, [__k31 + ": ", str(__v19, repr, __l6)]);
                            }
                          }
                        }
                        sort(__ks, function (__x25, __x26) {
                          var ____id1 = __x25;
                          var __a2 = has(____id1, 0);
                          var ____id2 = __x26;
                          var __b2 = has(____id2, 0);
                          return __a2 < __b2;
                        });
                        drop(__l6);
                        var ____x27 = __xs11;
                        var ____i30 = 0;
                        while (____i30 < _35(____x27)) {
                          var __v20 = ____x27[____i30];
                          __s = __s + (__sp + __v20);
                          __sp = " ";
                          ____i30 = ____i30 + 1;
                        }
                        var ____x28 = __ks;
                        var ____i31 = 0;
                        while (____i31 < _35(____x28)) {
                          var ____id3 = ____x28[____i31];
                          var __k32 = has(____id3, 0);
                          var __v21 = has(____id3, 1);
                          __s = __s + (__sp + (__k32 + __v21));
                          __sp = " ";
                          ____i31 = ____i31 + 1;
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
call = function (f, ..._42args) {
  var ____r96 = unstash([..._42args]);
  var __f3 = destash33(f, ____r96);
  var ____id4 = ____r96;
  var __args3 = cut(____id4, 0);
  return apply(__f3, __args3);
};
setenv = function (k, ..._42args) {
  var ____r97 = unstash([..._42args]);
  var __k33 = destash33(k, ____r97);
  var ____id5 = ____r97;
  var __keys = cut(____id5, 0);
  if (string63(__k33)) {
    var __e40 = undefined;
    if (has63(__keys, "toplevel")) {
      __e40 = hd(environment);
    } else {
      __e40 = last(environment);
    }
    var __frame = __e40;
    var __e41 = undefined;
    if (has63(__frame, __k33)) {
      __e41 = __frame[__k33];
    } else {
      __e41 = {};
    }
    var __entry = __e41;
    var ____o18 = __keys;
    var __k34 = undefined;
    for (__k34 in ____o18) {
      var __v22 = ____o18[__k34];
      var __e42 = undefined;
      if (numeric63(__k34)) {
        __e42 = parseInt(__k34);
      } else {
        __e42 = __k34;
      }
      var __k35 = __e42;
      if (!( __k35 === "toplevel")) {
        __entry[__k35] = __v22;
      }
    }
    __frame[__k33] = __entry;
    return __frame[__k33];
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
get_place = function (place, setfn) {
  var __place = macroexpand(place);
  if (atom63(__place) || (hd(__place) === "get" && nil63(getenv("get", "place-expander")) || accessor_literal63(hd(tl(__place))))) {
    return setfn(__place, function (v) {
      return ["%set", __place, v];
    });
  } else {
    var __head = hd(__place);
    var __gf = getenv(__head, "place-expander");
    if (__gf) {
      return apply(__gf, join([setfn], tl(__place), []));
    } else {
      throw new Error(str(__place) + " is not a valid place expression");
    }
  }
};
var __let_place__macro = function (vars, place, ..._42args) {
  var ____r105 = unstash([..._42args]);
  var __vars1 = destash33(vars, ____r105);
  var __place2 = destash33(place, ____r105);
  var ____id7 = ____r105;
  var __body1 = cut(____id7, 0);
  return ["get-place", __place2, join(["fn", __vars1], __body1)];
};
setenv("let-place", {
  _stash: true,
  macro: __let_place__macro
});
var __define_expander__macro = function (name, handler) {
  var ____x44 = object(["setenv", ["quote", name]]);
  ____x44["place-expander"] = handler;
  var __form1 = ____x44;
  _eval(__form1);
  return __form1;
};
setenv("define-expander", {
  _stash: true,
  macro: __define_expander__macro
});
define_setter = function (name, setter, setfn, args, vars) {
  if (none63(args)) {
    var __vars2 = reverse(vars || []);
    return setfn(join([name], __vars2), function (v) {
      return apply(setter, join([v], __vars2, []));
    });
  } else {
    var __v23 = hd(args);
    return define_setter(name, setter, setfn, tl(args), join([__v23], vars));
  }
};
var __define_setter__macro = function (name, arglist, ..._42args) {
  var ____r111 = unstash([..._42args]);
  var __name1 = destash33(name, ____r111);
  var __arglist1 = destash33(arglist, ____r111);
  var ____id9 = ____r111;
  var __body3 = cut(____id9, 0);
  var ____x60 = object(["setfn"]);
  ____x60.rest = "args";
  return ["define-expander", __name1, ["fn", ____x60, ["%call", "define-setter", ["quote", __name1], join(["fn", __arglist1], __body3), "setfn", "args"]]];
};
setenv("define-setter", {
  _stash: true,
  macro: __define_setter__macro
});
var __set33__macro = function (..._42args) {
  var __args5 = unstash([..._42args]);
  return join(["%do"], map(function (__x69) {
    var ____id11 = __x69;
    var __lh1 = has(____id11, 0);
    var __rh1 = has(____id11, 1);
    return get_place(__lh1, function (getter, setter) {
      return setter(__rh1);
    });
  }, pair(__args5)));
};
setenv("set!", {
  _stash: true,
  macro: __set33__macro
});
var __set__macro = function (..._42args) {
  var __args7 = unstash([..._42args]);
  return join(["%do"], map(function (__x78) {
    var ____id13 = __x78;
    var __lh3 = has(____id13, 0);
    var __rh3 = has(____id13, 1);
    __lh3 = macroexpand(__lh3);
    if (! atom63(__lh3) && hd(__lh3) === "has") {
      return ["%set", join(["%get"], tl(__lh3)), __rh3];
    } else {
      return ["%set", __lh3, __rh3];
    }
  }, pair(__args7)));
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
var __list__macro = function (..._42args) {
  var __body6 = unstash([..._42args]);
  if (one63(__body6) && (hd63(__body6, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_args";
  } else {
    if (_35(__body6) > 2 && (__body6[1] === "for" && __body6[3] === "in")) {
      var ____id17 = __body6;
      var __expr2 = has(____id17, 0);
      var __body7 = cut(____id17, 1);
      var __comps1 = [];
      var __cond1 = undefined;
      while (_35(__body7) > 2 && (__body7[0] === "for" && __body7[2] === "in")) {
        var ____id18 = __body7;
        var ___for1 = has(____id18, 0);
        var __names1 = has(____id18, 1);
        var ___in1 = has(____id18, 2);
        var __l9 = has(____id18, 3);
        var __body12 = cut(____id18, 4);
        add(__comps1, [__names1, __l9]);
        __body7 = __body12;
      }
      if (hd(__body7) === "if") {
        var ____id19 = __body7;
        var ___if1 = has(____id19, 0);
        var __expr3 = has(____id19, 1);
        __cond1 = __expr3;
      }
      return ["%list", __expr2, __comps1, __cond1];
    } else {
      var __x105 = unique("x");
      var __l10 = [];
      var __forms1 = [];
      var ____o20 = __body6;
      var __k38 = undefined;
      for (__k38 in ____o20) {
        var __v25 = ____o20[__k38];
        var __e43 = undefined;
        if (numeric63(__k38)) {
          __e43 = parseInt(__k38);
        } else {
          __e43 = __k38;
        }
        var __k39 = __e43;
        if (number63(__k39)) {
          __l10[__k39] = __v25;
        } else {
          add(__forms1, ["%set", ["%get", __x105, ["quote", __k39]], __v25]);
        }
      }
      if (some63(__forms1)) {
        return join(["let", __x105, ["object", join(["%array"], __l10)]], __forms1, [__x105]);
      } else {
        return join(["%array"], __l10);
      }
    }
  }
};
setenv("list", {
  _stash: true,
  macro: __list__macro
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
  var ____r125 = unstash([..._42args]);
  var __expr5 = destash33(expr, ____r125);
  var ____id22 = ____r125;
  var __e44 = undefined;
  if (nil63(has(____id22, "cmp"))) {
    __e44 = "=";
  } else {
    __e44 = has(____id22, "cmp");
  }
  var __cmp1 = __e44;
  var __clauses1 = cut(____id22, 0);
  var __x129 = unique("x");
  var __eq1 = function (_) {
    return [__cmp1, _, __x129];
  };
  var __cl1 = function (__x131) {
    var ____id23 = __x131;
    var __a4 = has(____id23, 0);
    var __b4 = has(____id23, 1);
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
  return ["let", __x129, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
};
setenv("case", {
  _stash: true,
  macro: __case__macro
});
var __of__macro = function (x, ..._42args) {
  var ____r129 = unstash([..._42args]);
  var __x144 = destash33(x, ____r129);
  var ____id25 = ____r129;
  var __values1 = cut(____id25, 0);
  return join(["case", __x144, __values1, true, false], props(__values1));
};
setenv("of", {
  _stash: true,
  macro: __of__macro
});
var __when__macro = function (cond, ..._42args) {
  var ____r131 = unstash([..._42args]);
  var __cond3 = destash33(cond, ____r131);
  var ____id27 = ____r131;
  var __body9 = cut(____id27, 0);
  return ["%if", __cond3, join(["%do"], __body9)];
};
setenv("when", {
  _stash: true,
  macro: __when__macro
});
var __unless__macro = function (cond, ..._42args) {
  var ____r133 = unstash([..._42args]);
  var __cond5 = destash33(cond, ____r133);
  var ____id29 = ____r133;
  var __body111 = cut(____id29, 0);
  return ["%if", ["%not", __cond5], join(["%do"], __body111)];
};
setenv("unless", {
  _stash: true,
  macro: __unless__macro
});
var __obj__macro = function (..._42args) {
  var __body14 = unstash([..._42args]);
  if (one63(__body14) && (hd63(__body14, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_keys";
  } else {
    if (_35(__body14) > 2 && (__body14[1] === "for" && __body14[3] === "in")) {
      var ____id33 = __body14;
      var __expr8 = has(____id33, 0);
      var __body15 = cut(____id33, 1);
      var __comps3 = [];
      var __cond7 = undefined;
      while (_35(__body15) > 2 && (__body15[0] === "for" && __body15[2] === "in")) {
        var ____id34 = __body15;
        var ___for3 = has(____id34, 0);
        var __names3 = has(____id34, 1);
        var ___in3 = has(____id34, 2);
        var __l121 = has(____id34, 3);
        var __body141 = cut(____id34, 4);
        add(__comps3, [__names3, __l121]);
        __body15 = __body141;
      }
      if (hd(__body15) === "if") {
        var ____id35 = __body15;
        var ___if3 = has(____id35, 0);
        var __expr9 = has(____id35, 1);
        __cond7 = __expr9;
      }
      if (list63(__expr8) && hd63(__expr8, ",")) {
        __expr8 = join([":"], tl(__expr8));
      }
      var ____x168 = object(["%list", __expr8, __comps3, __cond7]);
      ____x168.kind = "object";
      return ____x168;
    } else {
      return join(["%object"], mapo(function (x) {
        return x;
      }, __body14));
    }
  }
};
setenv("obj", {
  _stash: true,
  macro: __obj__macro
});
var __let__macro = function (bs, ..._42args) {
  var ____r137 = unstash([..._42args]);
  var __bs11 = destash33(bs, ____r137);
  var ____id40 = ____r137;
  var __body17 = cut(____id40, 0);
  if (atom63(__bs11) || hd63(__bs11, ",")) {
    return join(["let", [__bs11, hd(__body17)]], tl(__body17));
  } else {
    if (none63(__bs11)) {
      return join(["%do"], __body17);
    } else {
      var ____id41 = __bs11;
      var __lh5 = has(____id41, 0);
      var __rh5 = has(____id41, 1);
      var __bs21 = cut(____id41, 2);
      var ____id42 = bind(__lh5, __rh5);
      var __id43 = has(____id42, 0);
      var __val1 = has(____id42, 1);
      var __bs12 = cut(____id42, 2);
      var __renames1 = [];
      if (! id_literal63(__id43)) {
        var __id121 = unique(__id43);
        __renames1 = [__id43, __id121];
        __id43 = __id121;
      }
      return ["%do", ["%local", __id43, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body17)]];
    }
  }
};
setenv("let", {
  _stash: true,
  macro: __let__macro
});
var __with__macro = function (x, v, ..._42args) {
  var ____r139 = unstash([..._42args]);
  var __x197 = destash33(x, ____r139);
  var __v27 = destash33(v, ____r139);
  var ____id45 = ____r139;
  var __body19 = cut(____id45, 0);
  if (__v27 === "as") {
    return join(["%with", ["%as", __x197, hd(__body19)]], tl(__body19));
  } else {
    if (! atom63(__x197) || has(__body19, "async")) {
      return join(["%with", __x197, __v27], __body19);
    } else {
      return join(["let", [__x197, __v27]], __body19, [__x197]);
    }
  }
};
setenv("with", {
  _stash: true,
  macro: __with__macro
});
var __let_when__macro = function (x, v, ..._42args) {
  var ____r141 = unstash([..._42args]);
  var __x212 = destash33(x, ____r141);
  var __v29 = destash33(v, ____r141);
  var ____id47 = ____r141;
  var __body21 = cut(____id47, 0);
  var __y7 = unique("y");
  return ["let", __y7, __v29, ["when", ["yes", __y7], join(["let", [__x212, __y7]], __body21)]];
};
setenv("let-when", {
  _stash: true,
  macro: __let_when__macro
});
var __define_macro__macro = function (name, args, ..._42args) {
  var ____r143 = unstash([..._42args]);
  var __name3 = destash33(name, ____r143);
  var __args9 = destash33(args, ____r143);
  var ____id50 = ____r143;
  var __body23 = cut(____id50, 0);
  var __id51 = unique(__name3 + "--macro");
  var ____x226 = object(["setenv", ["quote", __name3]]);
  ____x226.macro = __id51;
  var __form3 = ["do", join(["define", __id51, __args9], __body23), ____x226];
  _eval(__form3);
  return __form3;
};
setenv("define-macro", {
  _stash: true,
  macro: __define_macro__macro
});
var __define_special__macro = function (name, args, ..._42args) {
  var ____r145 = unstash([..._42args]);
  var __name5 = destash33(name, ____r145);
  var __args111 = destash33(args, ____r145);
  var ____id54 = ____r145;
  var __body25 = cut(____id54, 0);
  var __id55 = unique(__name5 + "--special");
  var ____x236 = object(["setenv", ["quote", __name5]]);
  ____x236.special = __id55;
  var __form5 = ["do", join(["define", __id55, __args111], __body25), join(____x236, props(__body25))];
  _eval(__form5);
  return __form5;
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
  var ____x241 = object(["setenv", ["quote", name]]);
  ____x241.symbol = ["quote", expansion];
  return ____x241;
};
setenv("define-symbol", {
  _stash: true,
  macro: __define_symbol__macro
});
var __define_reader__macro = function (__x250, ..._42args) {
  var ____r149 = unstash([..._42args]);
  var ____x250 = destash33(__x250, ____r149);
  var ____id58 = ____x250;
  var __char1 = has(____id58, 0);
  var __s2 = has(____id58, 1);
  var ____id59 = ____r149;
  var __body27 = cut(____id59, 0);
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body27)];
};
setenv("define-reader", {
  _stash: true,
  macro: __define_reader__macro
});
var __define__macro = function (name, x, ..._42args) {
  var ____r151 = unstash([..._42args]);
  var __name7 = destash33(name, ____r151);
  var __x261 = destash33(x, ____r151);
  var ____id61 = ____r151;
  var __body29 = cut(____id61, 0);
  setenv(__name7, {
    _stash: true,
    variable: true
  });
  if (some63(__body29)) {
    return join(["%local-function", __name7], bind42(__x261, __body29), props(__body29));
  } else {
    return join(["%local", __name7, __x261], props(__body29));
  }
};
setenv("define", {
  _stash: true,
  macro: __define__macro
});
var __define_global__macro = function (name, x, ..._42args) {
  var ____r153 = unstash([..._42args]);
  var __name9 = destash33(name, ____r153);
  var __x269 = destash33(x, ____r153);
  var ____id63 = ____r153;
  var __body31 = cut(____id63, 0);
  setenv(__name9, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body31)) {
    return join(["%global-function", __name9], bind42(__x269, __body31), props(__body31));
  } else {
    return join(["set", __name9, __x269], props(__body31));
  }
};
setenv("define-global", {
  _stash: true,
  macro: __define_global__macro
});
var __get_value__macro = function (x) {
  var ____x276 = object(["setenv", x]);
  ____x276.toplevel = true;
  return ["has", ____x276, ["quote", "value"]];
};
setenv("get-value", {
  _stash: true,
  macro: __get_value__macro
});
var __define_constant__macro = function (name, x) {
  var ____x287 = object(["setenv", ["quote", name]]);
  ____x287.toplevel = true;
  ____x287.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x287, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
  var ____r162 = unstash([..._42args]);
  var __x317 = destash33(x, ____r162);
  var ____id65 = ____r162;
  var __body33 = cut(____id65, 0);
  var __ok2 = unique("ok");
  var __r163 = unique("r");
  var ____x318 = object(["target", ["try", __x317, join(["finally"], __body33)]]);
  ____x318.lua = join(["let", [[__ok2, __r163], ["guard", __x317]]], __body33, [["if", __ok2, __r163, ["throw", __r163]]]);
  return ____x318;
};
setenv("after", {
  _stash: true,
  macro: __after__macro
});
var __with_frame__macro = function (..._42args) {
  var __body35 = unstash([..._42args]);
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body35), ["drop", "environment"]]];
};
setenv("with-frame", {
  _stash: true,
  macro: __with_frame__macro
});
var __with_values__macro = function (..._42args) {
  var __body37 = unstash([..._42args]);
  var __forms3 = [];
  var ____o22 = __body37;
  var __k42 = undefined;
  for (__k42 in ____o22) {
    var __v31 = ____o22[__k42];
    var __e45 = undefined;
    if (numeric63(__k42)) {
      __e45 = parseInt(__k42);
    } else {
      __e45 = __k42;
    }
    var __k43 = __e45;
    if (! number63(__k43)) {
      var ____x348 = object(["setenv", ["quote", __k43]]);
      ____x348.value = __v31;
      add(__forms3, ____x348);
    }
  }
  return join(["with-frame"], __forms3);
};
setenv("with-values", {
  _stash: true,
  macro: __with_values__macro
});
var __with_bindings__macro = function (__x356, ..._42args) {
  var ____r165 = unstash([..._42args]);
  var ____x356 = destash33(__x356, ____r165);
  var ____id68 = ____x356;
  var __names5 = has(____id68, 0);
  var ____id69 = ____r165;
  var __body39 = cut(____id69, 0);
  var __x358 = unique("x");
  var ____x361 = object(["setenv", __x358]);
  ____x361.variable = true;
  return join(["with-frame", ["each", __x358, __names5, ____x361]], __body39);
};
setenv("with-bindings", {
  _stash: true,
  macro: __with_bindings__macro
});
var __let_macro__macro = function (definitions, ..._42args) {
  var ____r170 = unstash([..._42args]);
  var __definitions1 = destash33(definitions, ____r170);
  var ____id71 = ____r170;
  var __body41 = cut(____id71, 0);
  add(environment, {});
  var ____r172 = undefined;
  try{
    map(function (m) {
      return macroexpand(join(["define-macro"], m));
    }, __definitions1);
    ____r172 = join(["%do"], macroexpand(__body41));
  }
  finally{
    drop(environment);
  }
  return ____r172;
};
setenv("let-macro", {
  _stash: true,
  macro: __let_macro__macro
});
var __let_symbol__macro = function (expansions, ..._42args) {
  var ____r178 = unstash([..._42args]);
  var __expansions1 = destash33(expansions, ____r178);
  var ____id74 = ____r178;
  var __body43 = cut(____id74, 0);
  add(environment, {});
  var ____r180 = undefined;
  try{
    map(function (__x373) {
      var ____id75 = __x373;
      var __name11 = has(____id75, 0);
      var __exp1 = has(____id75, 1);
      return macroexpand(["define-symbol", __name11, __exp1]);
    }, pair(__expansions1));
    ____r180 = join(["%do"], macroexpand(__body43));
  }
  finally{
    drop(environment);
  }
  return ____r180;
};
setenv("let-symbol", {
  _stash: true,
  macro: __let_symbol__macro
});
var __let_unique__macro = function (names, ..._42args) {
  var ____r184 = unstash([..._42args]);
  var __names7 = destash33(names, ____r184);
  var ____id77 = ____r184;
  var __body45 = cut(____id77, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names7);
  return join(["let", apply(join, __bs3)], __body45);
};
setenv("let-unique", {
  _stash: true,
  macro: __let_unique__macro
});
var __fn__macro = function (args, ..._42args) {
  var ____r187 = unstash([..._42args]);
  var __args13 = destash33(args, ____r187);
  var ____id79 = ____r187;
  var __body47 = cut(____id79, 0);
  return join(["%function"], bind42(__args13, __body47), props(__body47));
};
setenv("fn", {
  _stash: true,
  macro: __fn__macro
});
var __apply__macro = function (f, ..._42args) {
  var ____r189 = unstash([..._42args]);
  var __f5 = destash33(f, ____r189);
  var ____id81 = ____r189;
  var __args15 = cut(____id81, 0);
  if (_35(__args15) > 1) {
    return ["%call", "apply", __f5, ["join", join(["list"], almost(__args15)), last(__args15), join(["list"], props(__args15))]];
  } else {
    if (props63(__args15)) {
      return ["%call", "apply", __f5, join(["join"], __args15, [join(["list"], props(__args15))])];
    } else {
      return join(["%call", "apply", __f5], __args15);
    }
  }
};
setenv("apply", {
  _stash: true,
  macro: __apply__macro
});
var __guard__macro = function (expr) {
  var ____x440 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x452 = object(["obj"]);
  ____x452.stack = [["idx", "debug", "traceback"]];
  ____x452.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x440.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x452]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x440];
};
setenv("guard", {
  _stash: true,
  macro: __guard__macro
});
var __each__macro = function (x, t, ..._42args) {
  var ____r193 = unstash([..._42args]);
  var __x481 = destash33(x, ____r193);
  var __t4 = destash33(t, ____r193);
  var ____id84 = ____r193;
  var __body49 = cut(____id84, 0);
  var __o24 = unique("o");
  var __n33 = unique("n");
  var __i38 = unique("i");
  var __e46 = undefined;
  if (atom63(__x481)) {
    __e46 = [__i38, __x481];
  } else {
    var __e47 = undefined;
    if (_35(__x481) > 1) {
      __e47 = __x481;
    } else {
      __e47 = [__i38, hd(__x481)];
    }
    __e46 = __e47;
  }
  var ____id85 = __e46;
  var __k45 = has(____id85, 0);
  var __v33 = has(____id85, 1);
  var ____x487 = object(["target", __o24]);
  ____x487.py = ["indices", __o24];
  var __e48 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e48 = __body49;
  } else {
    __e48 = [join(["let", __k45, ["if", ["numeric?", __k45], ["parseInt", __k45], __k45]], __body49)];
  }
  return ["let", [__o24, __t4, __k45, "nil"], join(["%for", ____x487, __k45], props(__body49), [join(["let", [__v33, ["%get", __o24, __k45]]], __e48)])];
};
setenv("each", {
  _stash: true,
  macro: __each__macro
});
var __for__macro = function (i, to, ..._42args) {
  var ____r195 = unstash([..._42args]);
  var __i40 = destash33(i, ____r195);
  var __to1 = destash33(to, ____r195);
  var ____id87 = ____r195;
  var __body51 = cut(____id87, 0);
  if (__to1 === "in") {
    return join(["%for", hd(__body51), __i40, join(["%do"], tl(__body51))], props(__body51));
  } else {
    return ["let", __i40, 0, join(["while", ["<", __i40, __to1]], __body51, [["inc", __i40]])];
  }
};
setenv("for", {
  _stash: true,
  macro: __for__macro
});
var __step__macro = function (v, t, ..._42args) {
  var ____r197 = unstash([..._42args]);
  var __v35 = destash33(v, ____r197);
  var __t6 = destash33(t, ____r197);
  var ____id89 = ____r197;
  var __body53 = cut(____id89, 0);
  var __x524 = unique("x");
  var __i42 = unique("i");
  return ["let", [__x524, __t6], ["for", __i42, ["#", __x524], join(["let", [__v35, ["at", __x524, __i42]]], __body53)]];
};
setenv("step", {
  _stash: true,
  macro: __step__macro
});
var __set_of__macro = function (..._42args) {
  var __xs13 = unstash([..._42args]);
  var __l14 = [];
  var ____o26 = __xs13;
  var ____i44 = undefined;
  for (____i44 in ____o26) {
    var __x536 = ____o26[____i44];
    var __e49 = undefined;
    if (numeric63(____i44)) {
      __e49 = parseInt(____i44);
    } else {
      __e49 = ____i44;
    }
    var ____i441 = __e49;
    __l14[__x536] = true;
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
  var ____r203 = unstash([..._42args]);
  var __a6 = destash33(a, ____r203);
  var ____id91 = ____r203;
  var __bs5 = cut(____id91, 0);
  return ["set", __a6, join(["join", __a6], __bs5)];
};
setenv("join!", {
  _stash: true,
  macro: __join33__macro
});
var __cat33__macro = function (a, ..._42args) {
  var ____r205 = unstash([..._42args]);
  var __a8 = destash33(a, ____r205);
  var ____id93 = ____r205;
  var __bs7 = cut(____id93, 0);
  return ["set", __a8, join(["cat", __a8], __bs7)];
};
setenv("cat!", {
  _stash: true,
  macro: __cat33__macro
});
var __inc__macro = function (n, by) {
  var __e50 = undefined;
  if (nil63(by)) {
    __e50 = 1;
  } else {
    __e50 = by;
  }
  return ["set", n, ["+", n, __e50]];
};
setenv("inc", {
  _stash: true,
  macro: __inc__macro
});
var __dec__macro = function (n, by) {
  var __e51 = undefined;
  if (nil63(by)) {
    __e51 = 1;
  } else {
    __e51 = by;
  }
  return ["set", n, ["-", n, __e51]];
};
setenv("dec", {
  _stash: true,
  macro: __dec__macro
});
var __with_indent__macro = function (form) {
  var __x569 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x569, form, ["dec", "indent-level"]]];
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
  var __body55 = unstash([..._42args]);
  return _eval(join(["%do"], __body55));
};
setenv("when-compiling", {
  _stash: true,
  macro: __when_compiling__macro
});
var __during_compilation__macro = function (..._42args) {
  var __body57 = unstash([..._42args]);
  var __form7 = join(["%do"], __body57);
  _eval(__form7);
  return __form7;
};
setenv("during-compilation", {
  _stash: true,
  macro: __during_compilation__macro
});
var __def__macro = function (name, ..._42args) {
  var ____r215 = unstash([..._42args]);
  var __name13 = destash33(name, ____r215);
  var ____id95 = ____r215;
  var __body59 = cut(____id95, 0);
  return join(["define-global", __name13], __body59);
};
setenv("def", {
  _stash: true,
  macro: __def__macro
});
var __mac__macro = function (name, ..._42args) {
  var ____r217 = unstash([..._42args]);
  var __name15 = destash33(name, ____r217);
  var ____id97 = ____r217;
  var __body61 = cut(____id97, 0);
  return join(["define-macro", __name15], __body61);
};
setenv("mac", {
  _stash: true,
  macro: __mac__macro
});
var __defconst__macro = function (name, ..._42args) {
  var ____r219 = unstash([..._42args]);
  var __name17 = destash33(name, ____r219);
  var ____id99 = ____r219;
  var __value1 = cut(____id99, 0);
  return join(["def", __name17], __value1);
};
setenv("defconst", {
  _stash: true,
  macro: __defconst__macro
});
var __undefined63__macro = function (name) {
  var ____x633 = object(["target"]);
  ____x633.js = ["=", ["typeof", name], "\"undefined\""];
  ____x633.lua = ["=", ["idx", "_G", name], "nil"];
  ____x633.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x633;
};
setenv("undefined?", {
  _stash: true,
  macro: __undefined63__macro
});
var __defvar__macro = function (name, ..._42args) {
  var ____r223 = unstash([..._42args]);
  var __name19 = destash33(name, ____r223);
  var ____id101 = ____r223;
  var __value3 = cut(____id101, 0);
  var ____x651 = object(["target"]);
  ____x651.py = ["global", __name19];
  return ["when", ["undefined?", __name19], ____x651, join(["defconst", __name19], __value3)];
};
setenv("defvar", {
  _stash: true,
  macro: __defvar__macro
});
var __async__macro = function (keyword, ..._42args) {
  var ____r225 = unstash([..._42args]);
  var __keyword1 = destash33(keyword, ____r225);
  var ____id103 = ____r225;
  var __body63 = cut(____id103, 0);
  var ____x657 = object([__keyword1]);
  ____x657.async = true;
  return join(____x657, __body63);
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
  var ____r231 = unstash([..._42args]);
  var __a10 = destash33(a, ____r231);
  var ____id105 = ____r231;
  var __bs9 = cut(____id105, 0);
  if (nil63(__a10)) {
    return "";
  } else {
    if (none63(__bs9)) {
      return __a10;
    } else {
      if (one63(__bs9)) {
        var ____x683 = object(["target", join(["%cat", __a10], __bs9)]);
        ____x683.py = join(["%call", "cat", __a10], __bs9);
        return ____x683;
      } else {
        var ____x686 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]]);
        ____x686.py = join(["%call", "cat", __a10], __bs9);
        return ____x686;
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
  var ____r233 = unstash([..._42args]);
  var __a12 = destash33(a, ____r233);
  var ____id107 = ____r233;
  var __bs111 = cut(____id107, 0);
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
  var ____r235 = unstash([..._42args]);
  var __a14 = destash33(a, ____r235);
  var ____id109 = ____r235;
  var __bs13 = cut(____id109, 0);
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
  var ____r237 = unstash([..._42args]);
  var __a16 = destash33(a, ____r237);
  var ____id1111 = ____r237;
  var __bs15 = cut(____id1111, 0);
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
  var ____r239 = unstash([..._42args]);
  var __a18 = destash33(a, ____r239);
  var ____id113 = ____r239;
  var __bs17 = cut(____id113, 0);
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
  var ____r241 = unstash([..._42args]);
  var __a20 = destash33(a, ____r241);
  var ____id115 = ____r241;
  var __bs19 = cut(____id115, 0);
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
  var ____r243 = unstash([..._42args]);
  var __a22 = destash33(a, ____r243);
  var ____id117 = ____r243;
  var __bs211 = cut(____id117, 0);
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
  var ____r245 = unstash([..._42args]);
  var __a24 = destash33(a, ____r245);
  var ____id119 = ____r245;
  var __bs23 = cut(____id119, 0);
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
  var ____r247 = unstash([..._42args]);
  var __c3 = destash33(c, ____r247);
  var ____id1211 = ____r247;
  var __body65 = cut(____id1211, 0);
  return join(["%while", __c3], __body65);
};
setenv("while", {
  _stash: true,
  macro: __while__macro
});
var __do__macro = function (..._42args) {
  var __body67 = unstash([..._42args]);
  return join(["%do"], __body67);
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
  var ____x841 = object(["target", join(["="], __args49)]);
  ____x841.py = join(["%is"], __args49);
  return ____x841;
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
  var ____r249 = unstash([..._42args]);
  var __x859 = destash33(x, ____r249);
  var ____id124 = ____r249;
  var __body69 = cut(____id124, 0);
  var __e52 = undefined;
  if (atom63(__x859)) {
    __e52 = [__x859];
  } else {
    __e52 = __x859;
  }
  var ____id125 = __e52;
  var __a26 = has(____id125, 0);
  var __bs25 = cut(____id125, 1);
  var __e53 = undefined;
  if (none63(__bs25)) {
    __e53 = [["%literal"]];
  } else {
    __e53 = __bs25;
  }
  return join(["%block", __a26], __e53, __body69);
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
      var __r252 = unique("r");
      return join(["with", __r252, "nil"], map(function (__x879) {
        var ____id127 = __x879;
        var __x880 = has(____id127, 0);
        var __body71 = cut(____id127, 1);
        return ["%expand-case", __x880, ["%set", __r252, join(["%do"], __body71)]];
      }, almost(__args55)), [join(["%expand-case"], last(__args55))]);
    }
  }
};
setenv("%cases", {
  _stash: true,
  macro: ___37cases__macro
});
var __try__macro = function (x, ..._42args) {
  var ____r255 = unstash([..._42args]);
  var __x901 = destash33(x, ____r255);
  var ____id132 = ____r255;
  var __cases1 = cut(____id132, 0);
  var __fin1 = ["finally"];
  var ____o28 = __cases1;
  var ____i47 = undefined;
  for (____i47 in ____o28) {
    var __x903 = ____o28[____i47];
    var __e54 = undefined;
    if (numeric63(____i47)) {
      __e54 = parseInt(____i47);
    } else {
      __e54 = ____i47;
    }
    var ____i471 = __e54;
    if (hd63(__x903, "finally")) {
      __fin1 = __x903;
    }
  }
  var __forms7 = [];
  var ____x906 = __cases1;
  var ____i48 = 0;
  while (____i48 < _35(____x906)) {
    var ____id133 = ____x906[____i48];
    var __x907 = has(____id133, 0);
    var __body75 = cut(____id133, 1);
    if (__x907 === "finally") {
    } else {
      if (__x907 === "except" && has(__body75, 1) === "as") {
        var ____id134 = __body75;
        var __kind2 = has(____id134, 0);
        var ___1 = has(____id134, 1);
        var __name21 = has(____id134, 2);
        var __body76 = cut(____id134, 3);
        add(__forms7, join([[__x907, ["%as", __kind2, __name21]]], __body76));
      } else {
        if (__x907 === "except") {
          var ____id135 = __body75;
          var __kind3 = has(____id135, 0);
          var __body77 = cut(____id135, 1);
          add(__forms7, join([[__x907, __kind3]], __body77));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i48 = ____i48 + 1;
  }
  return join(["%cases", ["try", __x901]], __forms7, [__fin1]);
};
setenv("try", {
  _stash: true,
  macro: __try__macro
});
var __errsafe__macro = function (x, _else) {
  if (nil63(_else)) {
    _else = "nil";
  }
  var __ok8 = unique("ok");
  var __v37 = unique("v");
  return ["let", [[__ok8, __v37], ["guard", x]], ["if", __ok8, __v37, _else]];
};
setenv("errsafe", {
  _stash: true,
  macro: __errsafe__macro
});
var __dbg__macro = function () {
  var ____x930 = object(["target", ["do"]]);
  ____x930.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x930;
};
setenv("dbg", {
  _stash: true,
  macro: __dbg__macro
});
var __see__macro = function (form) {
  var __form9 = expand(form);
  print(compile(expand(["%set", "lumen-result", __form9])));
  return __form9;
};
setenv("see", {
  _stash: true,
  macro: __see__macro
});
require("./runtime");
require("./macros");
reader = require("./reader");
compiler = require("./compiler");
system = require("./system");
disp = function (str) {
  system.write(str);
  return system.flush();
};
pp = function (x) {
  if (list63(x) && _35(x) > 1) {
    var __c4 = "  ";
    var __nl = undefined;
    print("(");
    var ____x938 = x;
    var ____i49 = 0;
    while (____i49 < _35(____x938)) {
      var __v38 = ____x938[____i49];
      if (__nl) {
        print("");
      }
      disp(__c4);
      __nl = true;
      __c4 = "  ";
      print(str(__v38));
      ____i49 = ____i49 + 1;
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
  var __r267 = "";
  var __i50 = 0;
  while (__i50 < _35(s)) {
    var __c5 = char(s, __i50);
    if (__c5 === " ") {
      __r267 = __r267 + __c5;
    }
    __i50 = __i50 + 1;
  }
  return __r267;
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
  var __form10 = eval_self_form(form);
  var ____id136 = (function () {
    try {
      return [true, compiler.eval(__form10)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok9 = has(____id136, 0);
  var __v39 = has(____id136, 1);
  var __ex = has(____id136, 2);
  if (! __ok9) {
    return print_exception(__v39, __ex);
  } else {
    if (is63(__v39)) {
      return toplevel_print(__v39);
    }
  }
};
read_toplevel = function (str, more) {
  var __s3 = reader.stream(str, more);
  var ____id137 = (function () {
    try {
      return [true, reader.read_all(__s3)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var ____ok10 = has(____id137, 0);
  var ____v40 = has(____id137, 1);
  var __e55 = undefined;
  if (____ok10) {
    __e55 = ____v40;
  } else {
    __e55 = undefined;
  }
  var __x947 = __e55;
  if (__x947 === more) {
    return more;
  } else {
    if (nil63(__x947)) {
      return __x947;
    } else {
      if (one63(__x947)) {
        return hd(__x947);
      } else {
        return __x947;
      }
    }
  }
};
var rep = function (str) {
  var __v41 = _eval(read_toplevel(str));
  if (is63(__v41)) {
    return toplevel_print(__v41);
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
    var __form11 = read_toplevel(o.buf, __more);
    if (!( __form11 === __more)) {
      eval_print(__form11);
      return reset();
    }
  };
  reset();
  var ___in4 = process.stdin;
  ___in4.setEncoding("utf8");
  return ___in4.on("data", rep1);
};
var __with_file_directory__macro = function (file, name, ..._42args) {
  var ____r281 = unstash([..._42args]);
  var __file1 = destash33(file, ____r281);
  var __name23 = destash33(name, ____r281);
  var ____id139 = ____r281;
  var __body79 = cut(____id139, 0);
  var __cwd1 = unique("cwd");
  return ["let", [__cwd1, ["system", [".cwd"]], __name23, __file1, __name23, ["system", [".basename", __file1]]], ["system", [".chdir", ["system", [".dirname", __file1]]]], ["after", join(["do"], __body79), ["system", [".chdir", __cwd1]]]];
};
setenv("with-file-directory", {
  _stash: true,
  macro: __with_file_directory__macro
});
read_file = function (path) {
  var ____cwd2 = system.cwd();
  var __name24 = path;
  var __name25 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r284 = undefined;
  try{
    ____r284 = system.read_file(__name25);
  }
  finally{
    system.chdir(____cwd2);
  }
  return ____r284;
};
read_from_file = function (path) {
  var __data = read_file(path);
  var ____cwd3 = system.cwd();
  var __name26 = path;
  var __name27 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r287 = undefined;
  try{
    var __s4 = reader.stream(__data);
    ____r287 = reader.read_all(__s4);
  }
  finally{
    system.chdir(____cwd3);
  }
  return ____r287;
};
expand_file = function (path) {
  var __body80 = read_from_file(path);
  var ____cwd4 = system.cwd();
  var __name28 = path;
  var __name29 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r290 = undefined;
  try{
    ____r290 = compiler.expand(join(["do"], __body80));
  }
  finally{
    system.chdir(____cwd4);
  }
  return ____r290;
};
compile_file = function (path) {
  var __form12 = expand_file(path);
  var ____cwd5 = system.cwd();
  var __name30 = path;
  var __name31 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r293 = undefined;
  try{
    ____r293 = compiler.compile(__form12, {
      _stash: true,
      stmt: true
    });
  }
  finally{
    system.chdir(____cwd5);
  }
  return ____r293;
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
  var ____cwd6 = system.cwd();
  var __name32 = path;
  var __name33 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r296 = undefined;
  try{
    ____r296 = compiler.run(__code);
  }
  finally{
    system.chdir(____cwd6);
  }
  return ____r296;
};
run_script = function (path, argv) {
  if (nil63(argv)) {
    argv = [];
  }
  print(str(["run-script", path, argv]));
  system.set_argv(argv);
  _G.exports = {};
  load(path);
  if (has(_G.exports, "main")) {
    return _G.exports.main(argv);
  }
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
  print(str(args));
  var __arg = hd(args);
  if (__arg && script_file63(__arg)) {
    return run_script(__arg, tl(args));
  } else {
    if (__arg === "-h" || __arg === "--help") {
      return usage();
    } else {
      var __pre = [];
      var __input = undefined;
      var __output = undefined;
      var __target1 = undefined;
      var __expr10 = undefined;
      var __argv = args;
      var __i51 = 0;
      while (__i51 < _35(__argv)) {
        var __a27 = __argv[__i51];
        if (__a27 === "-c" || (__a27 === "-o" || (__a27 === "-t" || __a27 === "-e"))) {
          if (__i51 === edge(__argv)) {
            print("missing argument for " + __a27);
          } else {
            __i51 = __i51 + 1;
            var __val2 = __argv[__i51];
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
        __i51 = __i51 + 1;
      }
      var ____x983 = __pre;
      var ____i52 = 0;
      while (____i52 < _35(____x983)) {
        var __file2 = ____x983[____i52];
        run_file(__file2);
        ____i52 = ____i52 + 1;
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
  main(system.get_argv());
}
exports.main = main;
exports.reader = reader;
exports.compiler = compiler;
exports.system = system;
