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
      var __e9 = undefined;
      if (numeric63(__k)) {
        __e9 = parseInt(__k);
      } else {
        __e9 = __k;
      }
      var __k1 = __e9;
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
      var __e10 = undefined;
      if (numeric63(__k2)) {
        __e10 = parseInt(__k2);
      } else {
        __e10 = __k2;
      }
      var __k3 = __e10;
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
    var __e11 = undefined;
    if (numeric63(__k4)) {
      __e11 = parseInt(__k4);
    } else {
      __e11 = __k4;
    }
    var __k5 = __e11;
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
  var __e12 = undefined;
  if (nil63(from) || from < 0) {
    __e12 = 0;
  } else {
    __e12 = from;
  }
  var __i3 = __e12;
  var __n4 = _35(x);
  var __e13 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e13 = __n4;
  } else {
    __e13 = upto;
  }
  var __upto1 = __e13;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e14 = undefined;
    if (numeric63(__k6)) {
      __e14 = parseInt(__k6);
    } else {
      __e14 = __k6;
    }
    var __k7 = __e14;
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
    var __e15 = undefined;
    if (numeric63(__k8)) {
      __e15 = parseInt(__k8);
    } else {
      __e15 = __k8;
    }
    var __k9 = __e15;
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
      var __e16 = undefined;
      if (numeric63(__k10)) {
        __e16 = parseInt(__k10);
      } else {
        __e16 = __k10;
      }
      var __k11 = __e16;
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
        var __e17 = undefined;
        if (numeric63(__k12)) {
          __e17 = parseInt(__k12);
        } else {
          __e17 = __k12;
        }
        var __k13 = __e17;
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
    var __e18 = undefined;
    if (numeric63(____i10)) {
      __e18 = parseInt(____i10);
    } else {
      __e18 = ____i10;
    }
    var ____i101 = __e18;
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
    var __e19 = undefined;
    if (numeric63(__k14)) {
      __e19 = parseInt(__k14);
    } else {
      __e19 = __k14;
    }
    var __k15 = __e19;
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
    var __e20 = undefined;
    if (f) {
      __e20 = f(__v9);
    } else {
      __e20 = __v9;
    }
    var __y4 = __e20;
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
    var __e21 = undefined;
    if (numeric63(__k16)) {
      __e21 = parseInt(__k16);
    } else {
      __e21 = __k16;
    }
    var __k17 = __e21;
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
    var __e22 = undefined;
    if (numeric63(____i17)) {
      __e22 = parseInt(____i17);
    } else {
      __e22 = ____i17;
    }
    var ____i171 = __e22;
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
      var __e23 = undefined;
      if (numeric63(__k18)) {
        __e23 = parseInt(__k18);
      } else {
        __e23 = __k18;
      }
      var __k19 = __e23;
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
        var __e25 = undefined;
        if (numeric63(__k20)) {
          __e25 = parseInt(__k20);
        } else {
          __e25 = __k20;
        }
        var __k21 = __e25;
        if (!( __k21 === "_stash")) {
          __args1[__k21] = __v12;
        }
      }
      if (params) {
        var ____o13 = params;
        var __k22 = undefined;
        for (__k22 in ____o13) {
          var __v13 = ____o13[__k22];
          var __e26 = undefined;
          if (numeric63(__k22)) {
            __e26 = parseInt(__k22);
          } else {
            __e26 = __k22;
          }
          var __k23 = __e26;
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
          var __e24 = undefined;
          if (numeric63(__k24)) {
            __e24 = parseInt(__k24);
          } else {
            __e24 = __k24;
          }
          var __k25 = __e24;
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
      var __e27 = undefined;
      if (numeric63(__k26)) {
        __e27 = parseInt(__k26);
      } else {
        __e27 = __k26;
      }
      var __k27 = __e27;
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
  var __e28 = undefined;
  if (is63(pos)) {
    __e28 = clip(str, pos);
  } else {
    __e28 = str;
  }
  var __str = __e28;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_starts63 = function (str, x, pos) {
  var __e29 = undefined;
  if (is63(pos)) {
    __e29 = clip(str, pos);
  } else {
    __e29 = str;
  }
  var __str1 = __e29;
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
      var __e30 = undefined;
      if (__c1 === "\n") {
        __e30 = "\\n";
      } else {
        var __e31 = undefined;
        if (__c1 === "\r") {
          __e31 = "\\r";
        } else {
          var __e32 = undefined;
          if (__c1 === "\"") {
            __e32 = "\\\"";
          } else {
            var __e33 = undefined;
            if (__c1 === "\\") {
              __e33 = "\\\\";
            } else {
              __e33 = __c1;
            }
            __e32 = __e33;
          }
          __e31 = __e32;
        }
        __e30 = __e31;
      }
      var __c11 = __e30;
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
                          var __e34 = undefined;
                          if (numeric63(__k28)) {
                            __e34 = parseInt(__k28);
                          } else {
                            __e34 = __k28;
                          }
                          var __k29 = __e34;
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
    var __e35 = undefined;
    if (has63(__keys, "toplevel")) {
      __e35 = hd(environment);
    } else {
      __e35 = last(environment);
    }
    var __frame = __e35;
    var __e36 = undefined;
    if (has63(__frame, __k31)) {
      __e36 = __frame[__k31];
    } else {
      __e36 = {};
    }
    var __entry = __e36;
    var ____o17 = __keys;
    var __k32 = undefined;
    for (__k32 in ____o17) {
      var __v19 = ____o17[__k32];
      var __e37 = undefined;
      if (numeric63(__k32)) {
        __e37 = parseInt(__k32);
      } else {
        __e37 = __k32;
      }
      var __k33 = __e37;
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
  var __args2 = unstash([..._42args]);
  return join(["%do"], map(function (__x35) {
    var ____id5 = __x35;
    var __lh = has(____id5, 0);
    var __rh = has(____id5, 1);
    __lh = macroexpand(__lh);
    if (! atom63(__lh) && hd(__lh) === "has") {
      return ["%set", join(["%get"], tl(__lh)), __rh];
    } else {
      return ["%set", __lh, __rh];
    }
  }, pair(__args2)));
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
var __quasilist__macro = function (..._42args) {
  var __body = unstash([..._42args]);
  if (one63(__body) && (hd63(__body, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_args";
  } else {
    if (_35(__body) > 2 && (__body[1] === "for" && __body[3] === "in")) {
      var ____id6 = __body;
      var __expr = has(____id6, 0);
      var __body1 = cut(____id6, 1);
      var __comps = [];
      var __cond = undefined;
      while (_35(__body1) > 2 && (__body1[0] === "for" && __body1[2] === "in")) {
        var ____id7 = __body1;
        var ___for = has(____id7, 0);
        var __names = has(____id7, 1);
        var ___in = has(____id7, 2);
        var __l7 = has(____id7, 3);
        var __body11 = cut(____id7, 4);
        add(__comps, [__names, __l7]);
        __body1 = __body11;
      }
      if (hd(__body1) === "if") {
        var ____id8 = __body1;
        var ___if = has(____id8, 0);
        var __expr1 = has(____id8, 1);
        __cond = __expr1;
      }
      return ["%list", __expr, __comps, __cond];
    } else {
      var __x46 = unique("x");
      var __l8 = [];
      var __forms = [];
      var ____o18 = __body;
      var __k34 = undefined;
      for (__k34 in ____o18) {
        var __v20 = ____o18[__k34];
        var __e38 = undefined;
        if (numeric63(__k34)) {
          __e38 = parseInt(__k34);
        } else {
          __e38 = __k34;
        }
        var __k35 = __e38;
        if (number63(__k35)) {
          __l8[__k35] = __v20;
        } else {
          add(__forms, ["%set", ["%get", __x46, ["quote", __k35]], __v20]);
        }
      }
      if (some63(__forms)) {
        return join(["let", __x46, ["object", join(["%array"], __l8)]], __forms, [__x46]);
      } else {
        return join(["%array"], __l8);
      }
    }
  }
};
setenv("quasilist", {
  _stash: true,
  macro: __quasilist__macro
});
var __list__macro = function (..._42args) {
  var __args3 = unstash([..._42args]);
  return join(["quasilist"], __args3);
};
setenv("list", {
  _stash: true,
  macro: __list__macro
});
var __if__macro = function (..._42args) {
  var __branches = unstash([..._42args]);
  return hd(expand_if(__branches));
};
setenv("if", {
  _stash: true,
  macro: __if__macro
});
var __case__macro = function (expr, ..._42args) {
  var ____r104 = unstash([..._42args]);
  var __expr2 = destash33(expr, ____r104);
  var ____id9 = ____r104;
  var __e39 = undefined;
  if (nil63(has(____id9, "cmp"))) {
    __e39 = "=";
  } else {
    __e39 = has(____id9, "cmp");
  }
  var __cmp = __e39;
  var __clauses = cut(____id9, 0);
  var __x59 = unique("x");
  var __eq = function (_) {
    return [__cmp, _, __x59];
  };
  var __cl = function (__x61) {
    var ____id10 = __x61;
    var __a3 = has(____id10, 0);
    var __b3 = has(____id10, 1);
    if (nil63(__b3)) {
      return [__a3];
    } else {
      if (string63(__a3) || number63(__a3)) {
        return [__eq(__a3), __b3];
      } else {
        if (list63(__a3) && hd63(__a3, "quote")) {
          return [__eq(__a3), __b3];
        } else {
          if (one63(__a3)) {
            return [__eq(hd(__a3)), __b3];
          } else {
            if (_35(__a3) > 1) {
              return [join(["or"], map(__eq, __a3)), __b3];
            }
          }
        }
      }
    }
  };
  return ["let", __x59, __expr2, join(["if"], apply(join, map(__cl, pair(__clauses))))];
};
setenv("case", {
  _stash: true,
  macro: __case__macro
});
var __of__macro = function (x, ..._42args) {
  var ____r107 = unstash([..._42args]);
  var __x71 = destash33(x, ____r107);
  var ____id11 = ____r107;
  var __values = cut(____id11, 0);
  return join(["case", __x71, __values, true, false], props(__values));
};
setenv("of", {
  _stash: true,
  macro: __of__macro
});
var __when__macro = function (cond, ..._42args) {
  var ____r108 = unstash([..._42args]);
  var __cond1 = destash33(cond, ____r108);
  var ____id12 = ____r108;
  var __body2 = cut(____id12, 0);
  return ["%if", __cond1, join(["%do"], __body2)];
};
setenv("when", {
  _stash: true,
  macro: __when__macro
});
var __unless__macro = function (cond, ..._42args) {
  var ____r109 = unstash([..._42args]);
  var __cond2 = destash33(cond, ____r109);
  var ____id13 = ____r109;
  var __body3 = cut(____id13, 0);
  return ["%if", ["%not", __cond2], join(["%do"], __body3)];
};
setenv("unless", {
  _stash: true,
  macro: __unless__macro
});
var __obj__macro = function (..._42args) {
  var __body4 = unstash([..._42args]);
  if (one63(__body4) && (hd63(__body4, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_keys";
  } else {
    if (_35(__body4) > 2 && (__body4[1] === "for" && __body4[3] === "in")) {
      var ____id14 = __body4;
      var __expr3 = has(____id14, 0);
      var __body5 = cut(____id14, 1);
      var __comps1 = [];
      var __cond3 = undefined;
      while (_35(__body5) > 2 && (__body5[0] === "for" && __body5[2] === "in")) {
        var ____id15 = __body5;
        var ___for1 = has(____id15, 0);
        var __names1 = has(____id15, 1);
        var ___in1 = has(____id15, 2);
        var __l9 = has(____id15, 3);
        var __body12 = cut(____id15, 4);
        add(__comps1, [__names1, __l9]);
        __body5 = __body12;
      }
      if (hd(__body5) === "if") {
        var ____id16 = __body5;
        var ___if1 = has(____id16, 0);
        var __expr4 = has(____id16, 1);
        __cond3 = __expr4;
      }
      if (list63(__expr3) && hd63(__expr3, ",")) {
        __expr3 = join([":"], tl(__expr3));
      }
      var ____x83 = object(["%list", __expr3, __comps1, __cond3]);
      ____x83.kind = "object";
      return ____x83;
    } else {
      return join(["%object"], mapo(function (x) {
        return x;
      }, __body4));
    }
  }
};
setenv("obj", {
  _stash: true,
  macro: __obj__macro
});
var __let__macro = function (bs, ..._42args) {
  var ____r111 = unstash([..._42args]);
  var __bs = destash33(bs, ____r111);
  var ____id17 = ____r111;
  var __body6 = cut(____id17, 0);
  if (atom63(__bs) || hd63(__bs, ",")) {
    return join(["let", [__bs, hd(__body6)]], tl(__body6));
  } else {
    if (none63(__bs)) {
      return join(["%do"], __body6);
    } else {
      var ____id18 = __bs;
      var __lh1 = has(____id18, 0);
      var __rh1 = has(____id18, 1);
      var __bs2 = cut(____id18, 2);
      var ____id19 = bind(__lh1, __rh1);
      var __id20 = has(____id19, 0);
      var __val = has(____id19, 1);
      var __bs1 = cut(____id19, 2);
      var __id111 = unique(__id20);
      return ["%do", ["%local", __id111, __val], ["let-symbol", [__id20, __id111], join(["let", join(__bs1, __bs2)], __body6)]];
    }
  }
};
setenv("let", {
  _stash: true,
  macro: __let__macro
});
var __let42__macro = function (bs, ..._42args) {
  var ____r112 = unstash([..._42args]);
  var __bs11 = destash33(bs, ____r112);
  var ____id21 = ____r112;
  var __body7 = cut(____id21, 0);
  if (atom63(__bs11)) {
    return join(["let*", [__bs11, hd(__body7)]], tl(__body7));
  } else {
    if (none63(__bs11)) {
      return join(["%do"], __body7);
    } else {
      var ____id22 = __bs11;
      var __lh2 = has(____id22, 0);
      var __rh2 = has(____id22, 1);
      var __bs21 = cut(____id22, 2);
      return ["let-global", __lh2, __rh2, join(["let*", __bs21], __body7)];
    }
  }
};
setenv("let*", {
  _stash: true,
  macro: __let42__macro
});
var __let_global__macro = function (name, value, ..._42args) {
  var ____r113 = unstash([..._42args]);
  var __name = destash33(name, ____r113);
  var __value = destash33(value, ____r113);
  var ____id23 = ____r113;
  var __body8 = cut(____id23, 0);
  var __prev = unique("prev");
  var __ok = unique("ok");
  var __x101 = unique("x");
  return ["let", __prev, __name, ["set", __name, __value], ["let", [[__ok, __x101], ["guard", join(["%do"], __body8)]], ["set", __name, __prev], ["if", __ok, __x101, ["throw", __x101]]]];
};
setenv("let-global", {
  _stash: true,
  macro: __let_global__macro
});
var __with__macro = function (x, v, ..._42args) {
  var ____r114 = unstash([..._42args]);
  var __x113 = destash33(x, ____r114);
  var __v21 = destash33(v, ____r114);
  var ____id24 = ____r114;
  var __body9 = cut(____id24, 0);
  if (__v21 === "as") {
    return join(["%with", ["%as", __x113, hd(__body9)]], tl(__body9));
  } else {
    if (! atom63(__x113) || has(__body9, "async")) {
      return join(["%with", __x113, __v21], __body9);
    } else {
      return join(["let", [__x113, __v21]], __body9, [__x113]);
    }
  }
};
setenv("with", {
  _stash: true,
  macro: __with__macro
});
var __let_when__macro = function (x, v, ..._42args) {
  var ____r115 = unstash([..._42args]);
  var __x121 = destash33(x, ____r115);
  var __v22 = destash33(v, ____r115);
  var ____id25 = ____r115;
  var __body10 = cut(____id25, 0);
  var __y5 = unique("y");
  return ["let", __y5, __v22, ["when", ["yes", __y5], join(["let", [__x121, __y5]], __body10)]];
};
setenv("let-when", {
  _stash: true,
  macro: __let_when__macro
});
var __define_macro__macro = function (name, args, ..._42args) {
  var ____r116 = unstash([..._42args]);
  var __name1 = destash33(name, ____r116);
  var __args4 = destash33(args, ____r116);
  var ____id26 = ____r116;
  var __body111 = cut(____id26, 0);
  var __id27 = unique(__name1 + "--macro");
  var ____x130 = object(["setenv", ["quote", __name1]]);
  ____x130.macro = __id27;
  var __form = ["do", join(["define", __id27, __args4], __body111), ____x130];
  return __form;
};
setenv("define-macro", {
  _stash: true,
  macro: __define_macro__macro
});
var __define_special__macro = function (name, args, ..._42args) {
  var ____r117 = unstash([..._42args]);
  var __name2 = destash33(name, ____r117);
  var __args5 = destash33(args, ____r117);
  var ____id28 = ____r117;
  var __body121 = cut(____id28, 0);
  var __id29 = unique(__name2 + "--special");
  var ____x135 = object(["setenv", ["quote", __name2]]);
  ____x135.special = __id29;
  var __form1 = ["do", join(["define", __id29, __args5], __body121), join(____x135, props(__body121))];
  return __form1;
};
setenv("define-special", {
  _stash: true,
  macro: __define_special__macro
});
var __define_symbol__macro = function (name, expansion) {
  var ____x137 = object(["setenv", ["quote", name]]);
  ____x137.symbol = ["quote", expansion];
  return ____x137;
};
setenv("define-symbol", {
  _stash: true,
  macro: __define_symbol__macro
});
var __define_reader__macro = function (__x140, ..._42args) {
  var ____r119 = unstash([..._42args]);
  var ____x140 = destash33(__x140, ____r119);
  var ____id30 = ____x140;
  var __char = has(____id30, 0);
  var __s11 = has(____id30, 1);
  var ____id31 = ____r119;
  var __body13 = cut(____id31, 0);
  return ["%set", ["%get", "read-table", __char], join(["fn", [__s11]], __body13)];
};
setenv("define-reader", {
  _stash: true,
  macro: __define_reader__macro
});
var __define__macro = function (name, x, ..._42args) {
  var ____r120 = unstash([..._42args]);
  var __name3 = destash33(name, ____r120);
  var __x147 = destash33(x, ____r120);
  var ____id32 = ____r120;
  var __body14 = cut(____id32, 0);
  setenv(__name3, {
    _stash: true,
    variable: true
  });
  if (some63(__body14)) {
    return join(["%local-function", __name3], bind42(__x147, __body14), props(__body14));
  } else {
    return join(["%local", __name3, __x147], props(__body14));
  }
};
setenv("define", {
  _stash: true,
  macro: __define__macro
});
var __define_global__macro = function (name, x, ..._42args) {
  var ____r121 = unstash([..._42args]);
  var __name4 = destash33(name, ____r121);
  var __x151 = destash33(x, ____r121);
  var ____id33 = ____r121;
  var __body15 = cut(____id33, 0);
  setenv(__name4, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body15)) {
    return join(["%global-function", __name4], bind42(__x151, __body15), props(__body15));
  } else {
    return join(["set", __name4, __x151], props(__body15));
  }
};
setenv("define-global", {
  _stash: true,
  macro: __define_global__macro
});
var __get_value__macro = function (x) {
  var ____x155 = object(["setenv", x]);
  ____x155.toplevel = true;
  return ["has", ____x155, ["quote", "value"]];
};
setenv("get-value", {
  _stash: true,
  macro: __get_value__macro
});
var __define_constant__macro = function (name, x) {
  var ____x158 = object(["setenv", ["quote", name]]);
  ____x158.toplevel = true;
  ____x158.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x158, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
  var ____r125 = unstash([..._42args]);
  var __x171 = destash33(x, ____r125);
  var ____id34 = ____r125;
  var __body16 = cut(____id34, 0);
  var __ok1 = unique("ok");
  var __r126 = unique("r");
  var ____x172 = object(["target", ["try", __x171, join(["finally"], __body16)]]);
  ____x172.lua = join(["let", [[__ok1, __r126], ["guard", __x171]]], __body16, [["if", __ok1, __r126, ["throw", __r126]]]);
  return ____x172;
};
setenv("after", {
  _stash: true,
  macro: __after__macro
});
var __with_frame__macro = function (..._42args) {
  var __body17 = unstash([..._42args]);
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body17), ["drop", "environment"]]];
};
setenv("with-frame", {
  _stash: true,
  macro: __with_frame__macro
});
var __with_values__macro = function (..._42args) {
  var __body18 = unstash([..._42args]);
  var __forms1 = [];
  var ____o19 = __body18;
  var __k36 = undefined;
  for (__k36 in ____o19) {
    var __v23 = ____o19[__k36];
    var __e40 = undefined;
    if (numeric63(__k36)) {
      __e40 = parseInt(__k36);
    } else {
      __e40 = __k36;
    }
    var __k37 = __e40;
    if (! number63(__k37)) {
      var ____x191 = object(["setenv", ["quote", __k37]]);
      ____x191.value = __v23;
      add(__forms1, ____x191);
    }
  }
  return join(["with-frame"], __forms1);
};
setenv("with-values", {
  _stash: true,
  macro: __with_values__macro
});
var __with_bindings__macro = function (__x193, ..._42args) {
  var ____r127 = unstash([..._42args]);
  var ____x193 = destash33(__x193, ____r127);
  var ____id35 = ____x193;
  var __names2 = has(____id35, 0);
  var ____id36 = ____r127;
  var __body19 = cut(____id36, 0);
  var __x195 = unique("x");
  var ____x198 = object(["setenv", __x195]);
  ____x198.variable = true;
  return join(["with-frame", ["each", __x195, __names2, ____x198]], __body19);
};
setenv("with-bindings", {
  _stash: true,
  macro: __with_bindings__macro
});
var __let_macro__macro = function (definitions, ..._42args) {
  var ____r128 = unstash([..._42args]);
  var __definitions = destash33(definitions, ____r128);
  var ____id37 = ____r128;
  var __body20 = cut(____id37, 0);
  add(environment, {});
  var ____r130 = undefined;
  try{
    map(function (m) {
      return _eval(join(["define-macro"], m));
    }, __definitions);
    ____r130 = ["%expansion", join(["%do"], macroexpand(__body20))];
  }
  finally{
    drop(environment);
  }
  return ____r130;
};
setenv("let-macro", {
  _stash: true,
  macro: __let_macro__macro
});
var __let_symbol__macro = function (expansions, ..._42args) {
  var ____r132 = unstash([..._42args]);
  var __expansions = destash33(expansions, ____r132);
  var ____id38 = ____r132;
  var __body21 = cut(____id38, 0);
  if (atom63(__expansions)) {
    return join(["let-symbol", [__expansions, hd(__body21)]], tl(__body21));
  } else {
    add(environment, {});
    var ____r134 = undefined;
    try{
      map(function (__x206) {
        var ____id39 = __x206;
        var __name5 = has(____id39, 0);
        var __exp = has(____id39, 1);
        return _eval(["define-symbol", __name5, __exp]);
      }, pair(__expansions));
      ____r134 = ["%expansion", join(["%do"], macroexpand(__body21))];
    }
    finally{
      drop(environment);
    }
    return ____r134;
  }
};
setenv("let-symbol", {
  _stash: true,
  macro: __let_symbol__macro
});
var __let_unique__macro = function (names, ..._42args) {
  var ____r136 = unstash([..._42args]);
  var __names3 = destash33(names, ____r136);
  var ____id40 = ____r136;
  var __body22 = cut(____id40, 0);
  var __bs22 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names3);
  return join(["let", apply(join, __bs22)], __body22);
};
setenv("let-unique", {
  _stash: true,
  macro: __let_unique__macro
});
var __fn__macro = function (args, ..._42args) {
  var ____r138 = unstash([..._42args]);
  var __args6 = destash33(args, ____r138);
  var ____id41 = ____r138;
  var __body23 = cut(____id41, 0);
  return join(["%function"], bind42(__args6, __body23), props(__body23));
};
setenv("fn", {
  _stash: true,
  macro: __fn__macro
});
var __apply__macro = function (f, ..._42args) {
  var ____r139 = unstash([..._42args]);
  var __f2 = destash33(f, ____r139);
  var ____id42 = ____r139;
  var __args7 = cut(____id42, 0);
  if (_35(__args7) > 1) {
    return ["%call", "apply", __f2, ["join", join(["list"], almost(__args7)), last(__args7), join(["list"], props(__args7))]];
  } else {
    if (props63(__args7)) {
      return ["%call", "apply", __f2, join(["join"], __args7, [join(["list"], props(__args7))])];
    } else {
      return join(["%call", "apply", __f2], __args7);
    }
  }
};
setenv("apply", {
  _stash: true,
  macro: __apply__macro
});
var __guard__macro = function (expr) {
  var ____x231 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x243 = object(["obj"]);
  ____x243.stack = [["idx", "debug", "traceback"]];
  ____x243.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x231.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x243]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x231];
};
setenv("guard", {
  _stash: true,
  macro: __guard__macro
});
var __each__macro = function (x, t, ..._42args) {
  var ____r141 = unstash([..._42args]);
  var __x254 = destash33(x, ____r141);
  var __t3 = destash33(t, ____r141);
  var ____id43 = ____r141;
  var __body24 = cut(____id43, 0);
  var __o20 = unique("o");
  var __n28 = unique("n");
  var __i34 = unique("i");
  var __e41 = undefined;
  if (atom63(__x254)) {
    __e41 = [__i34, __x254];
  } else {
    var __e42 = undefined;
    if (_35(__x254) > 1) {
      __e42 = __x254;
    } else {
      __e42 = [__i34, hd(__x254)];
    }
    __e41 = __e42;
  }
  var ____id44 = __e41;
  var __k38 = has(____id44, 0);
  var __v24 = has(____id44, 1);
  var ____x260 = object(["target", __o20]);
  ____x260.py = ["indices", __o20];
  var __e43 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e43 = __body24;
  } else {
    __e43 = [join(["let", __k38, ["if", ["numeric?", __k38], ["parseInt", __k38], __k38]], __body24)];
  }
  return ["let", [__o20, __t3, __k38, "nil"], join(["%for", ____x260, __k38], props(__body24), [join(["let", [__v24, ["%get", __o20, __k38]]], __e43)])];
};
setenv("each", {
  _stash: true,
  macro: __each__macro
});
var __for__macro = function (i, to, ..._42args) {
  var ____r142 = unstash([..._42args]);
  var __i35 = destash33(i, ____r142);
  var __to = destash33(to, ____r142);
  var ____id45 = ____r142;
  var __body25 = cut(____id45, 0);
  if (__to === "in") {
    return join(["%for", hd(__body25), __i35, join(["%do"], tl(__body25))], props(__body25));
  } else {
    return ["let", __i35, 0, join(["while", ["<", __i35, __to]], __body25, [["inc", __i35]])];
  }
};
setenv("for", {
  _stash: true,
  macro: __for__macro
});
var __step__macro = function (v, t, ..._42args) {
  var ____r143 = unstash([..._42args]);
  var __v25 = destash33(v, ____r143);
  var __t4 = destash33(t, ____r143);
  var ____id46 = ____r143;
  var __body26 = cut(____id46, 0);
  var __x280 = unique("x");
  var __i36 = unique("i");
  return ["let", [__x280, __t4], ["for", __i36, ["#", __x280], join(["let", [__v25, ["at", __x280, __i36]]], __body26)]];
};
setenv("step", {
  _stash: true,
  macro: __step__macro
});
var __set_of__macro = function (..._42args) {
  var __xs12 = unstash([..._42args]);
  var __l10 = {};
  var ____o21 = __xs12;
  var ____i37 = undefined;
  for (____i37 in ____o21) {
    var __x289 = ____o21[____i37];
    var __e44 = undefined;
    if (numeric63(____i37)) {
      __e44 = parseInt(____i37);
    } else {
      __e44 = ____i37;
    }
    var ____i371 = __e44;
    __l10[__x289] = true;
  }
  return join(["obj"], __l10);
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
  var __clauses1 = unstash([..._42args]);
  if (has63(__clauses1, has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value"))) {
    return __clauses1[has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value")];
  } else {
    return hd(__clauses1);
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
  var ____r146 = unstash([..._42args]);
  var __a4 = destash33(a, ____r146);
  var ____id47 = ____r146;
  var __bs3 = cut(____id47, 0);
  return ["set", __a4, join(["join", __a4], __bs3)];
};
setenv("join!", {
  _stash: true,
  macro: __join33__macro
});
var __cat33__macro = function (a, ..._42args) {
  var ____r147 = unstash([..._42args]);
  var __a5 = destash33(a, ____r147);
  var ____id48 = ____r147;
  var __bs4 = cut(____id48, 0);
  return ["set", __a5, join(["cat", __a5], __bs4)];
};
setenv("cat!", {
  _stash: true,
  macro: __cat33__macro
});
var __inc__macro = function (n, by) {
  var __e45 = undefined;
  if (nil63(by)) {
    __e45 = 1;
  } else {
    __e45 = by;
  }
  return ["set", n, ["+", n, __e45]];
};
setenv("inc", {
  _stash: true,
  macro: __inc__macro
});
var __dec__macro = function (n, by) {
  var __e46 = undefined;
  if (nil63(by)) {
    __e46 = 1;
  } else {
    __e46 = by;
  }
  return ["set", n, ["-", n, __e46]];
};
setenv("dec", {
  _stash: true,
  macro: __dec__macro
});
var __with_indent__macro = function (form) {
  var __x304 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x304, form, ["dec", "indent-level"]]];
};
setenv("with-indent", {
  _stash: true,
  macro: __with_indent__macro
});
var __export__macro = function (..._42args) {
  var __names4 = unstash([..._42args]);
  var __forms2 = map(function (k) {
    if (k === compile(k)) {
      return ["%set", ["idx", "exports", k], k];
    } else {
      return ["%do", ["%set", ["%get", "exports", ["quote", k]], k], ["%set", ["idx", "exports", k], k]];
    }
  }, __names4);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return join(["%do"], __forms2);
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return join(["let", "exports", ["or", "exports", ["obj"]]], __forms2, [["return", "exports"]]);
    }
  }
};
setenv("export", {
  _stash: true,
  macro: __export__macro
});
var __when_compiling__macro = function (..._42args) {
  var __body27 = unstash([..._42args]);
  return _eval(join(["%do"], __body27));
};
setenv("when-compiling", {
  _stash: true,
  macro: __when_compiling__macro
});
var __during_compilation__macro = function (..._42args) {
  var __body28 = unstash([..._42args]);
  var __form2 = join(["%do"], __body28);
  _eval(__form2);
  return __form2;
};
setenv("during-compilation", {
  _stash: true,
  macro: __during_compilation__macro
});
var __def__macro = function (name, ..._42args) {
  var ____r152 = unstash([..._42args]);
  var __name6 = destash33(name, ____r152);
  var ____id49 = ____r152;
  var __body29 = cut(____id49, 0);
  return join(["define-global", __name6], __body29);
};
setenv("def", {
  _stash: true,
  macro: __def__macro
});
var __mac__macro = function (name, ..._42args) {
  var ____r153 = unstash([..._42args]);
  var __name7 = destash33(name, ____r153);
  var ____id50 = ____r153;
  var __body30 = cut(____id50, 0);
  return join(["define-macro", __name7], __body30);
};
setenv("mac", {
  _stash: true,
  macro: __mac__macro
});
var __defconst__macro = function (name, ..._42args) {
  var ____r154 = unstash([..._42args]);
  var __name8 = destash33(name, ____r154);
  var ____id51 = ____r154;
  var __value1 = cut(____id51, 0);
  return join(["def", __name8], __value1);
};
setenv("defconst", {
  _stash: true,
  macro: __defconst__macro
});
var __undefined63__macro = function (name) {
  var ____x334 = object(["target"]);
  ____x334.js = ["=", ["typeof", name], "\"undefined\""];
  ____x334.lua = ["=", ["idx", "_G", name], "nil"];
  ____x334.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x334;
};
setenv("undefined?", {
  _stash: true,
  macro: __undefined63__macro
});
var __defvar__macro = function (name, ..._42args) {
  var ____r156 = unstash([..._42args]);
  var __name9 = destash33(name, ____r156);
  var ____id52 = ____r156;
  var __value2 = cut(____id52, 0);
  var ____x346 = object(["target"]);
  ____x346.py = ["global", __name9];
  return ["when", ["undefined?", __name9], ____x346, join(["defconst", __name9], __value2)];
};
setenv("defvar", {
  _stash: true,
  macro: __defvar__macro
});
var __async__macro = function (keyword, ..._42args) {
  var ____r157 = unstash([..._42args]);
  var __keyword = destash33(keyword, ____r157);
  var ____id53 = ____r157;
  var __body31 = cut(____id53, 0);
  var ____x350 = object([__keyword]);
  ____x350.async = true;
  return join(____x350, __body31);
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
  var ____r160 = unstash([..._42args]);
  var __a6 = destash33(a, ____r160);
  var ____id54 = ____r160;
  var __bs5 = cut(____id54, 0);
  if (nil63(__a6)) {
    return "";
  } else {
    if (none63(__bs5)) {
      return __a6;
    } else {
      if (one63(__bs5)) {
        var ____x360 = object(["target", join(["%cat", __a6], __bs5)]);
        ____x360.py = join(["%call", "cat", __a6], __bs5);
        ____x360.cmake = join(["%call", "cat", __a6], __bs5);
        return ____x360;
      } else {
        var ____x364 = object(["target", ["%cat", __a6, join(["cat"], __bs5)]]);
        ____x364.py = join(["%call", "cat", __a6], __bs5);
        ____x364.cmake = join(["%call", "cat", __a6], __bs5);
        return ____x364;
      }
    }
  }
};
setenv("cat", {
  _stash: true,
  macro: __cat__macro
});
var ___43__macro = function (..._42args) {
  var __args8 = unstash([..._42args]);
  if (none63(__args8)) {
    return 0;
  } else {
    if (one63(__args8)) {
      return hd(__args8);
    } else {
      return join(["%add"], __args8);
    }
  }
};
setenv("+", {
  _stash: true,
  macro: ___43__macro
});
var _____macro = function (..._42args) {
  var __args9 = unstash([..._42args]);
  if (none63(__args9)) {
    return 0;
  } else {
    if (one63(__args9)) {
      return ["%unm", hd(__args9)];
    } else {
      return join(["%sub"], __args9);
    }
  }
};
setenv("-", {
  _stash: true,
  macro: _____macro
});
var ___42__macro = function (..._42args) {
  var __args10 = unstash([..._42args]);
  if (none63(__args10)) {
    return 1;
  } else {
    if (one63(__args10)) {
      return hd(__args10);
    } else {
      return join(["%mul"], __args10);
    }
  }
};
setenv("*", {
  _stash: true,
  macro: ___42__macro
});
var ___47__macro = function (..._42args) {
  var __args111 = unstash([..._42args]);
  if (none63(__args111)) {
    return 1;
  } else {
    if (one63(__args111)) {
      return hd(__args111);
    } else {
      return join(["%div"], __args111);
    }
  }
};
setenv("/", {
  _stash: true,
  macro: ___47__macro
});
var ___4747__macro = function (..._42args) {
  var __args121 = unstash([..._42args]);
  if (none63(__args121)) {
    return 1;
  } else {
    if (one63(__args121)) {
      return hd(__args121);
    } else {
      return join(["%idiv"], __args121);
    }
  }
};
setenv("//", {
  _stash: true,
  macro: ___4747__macro
});
var ___37__macro = function (..._42args) {
  var __args13 = unstash([..._42args]);
  if (none63(__args13)) {
    return 0;
  } else {
    if (one63(__args13)) {
      return hd(__args13);
    } else {
      return join(["%mod"], __args13);
    }
  }
};
setenv("%", {
  _stash: true,
  macro: ___37__macro
});
var ___60__macro = function (a, ..._42args) {
  var ____r161 = unstash([..._42args]);
  var __a7 = destash33(a, ____r161);
  var ____id55 = ____r161;
  var __bs6 = cut(____id55, 0);
  if (none63(__bs6)) {
    return true;
  } else {
    if (one63(__bs6)) {
      return join(["%lt", __a7], __bs6);
    } else {
      return ["%and", ["%lt", __a7, hd(__bs6)], join(["<"], __bs6)];
    }
  }
};
setenv("<", {
  _stash: true,
  macro: ___60__macro
});
var ___6061__macro = function (a, ..._42args) {
  var ____r162 = unstash([..._42args]);
  var __a8 = destash33(a, ____r162);
  var ____id56 = ____r162;
  var __bs7 = cut(____id56, 0);
  if (none63(__bs7)) {
    return true;
  } else {
    if (one63(__bs7)) {
      return join(["%le", __a8], __bs7);
    } else {
      return ["%and", ["%le", __a8, hd(__bs7)], join(["<="], __bs7)];
    }
  }
};
setenv("<=", {
  _stash: true,
  macro: ___6061__macro
});
var ___61__macro = function (a, ..._42args) {
  var ____r163 = unstash([..._42args]);
  var __a9 = destash33(a, ____r163);
  var ____id57 = ____r163;
  var __bs8 = cut(____id57, 0);
  if (none63(__bs8)) {
    return true;
  } else {
    if (one63(__bs8)) {
      return join(["%eq", __a9], __bs8);
    } else {
      return ["%and", ["%eq", __a9, hd(__bs8)], join(["="], __bs8)];
    }
  }
};
setenv("=", {
  _stash: true,
  macro: ___61__macro
});
var ___6261__macro = function (a, ..._42args) {
  var ____r164 = unstash([..._42args]);
  var __a10 = destash33(a, ____r164);
  var ____id58 = ____r164;
  var __bs9 = cut(____id58, 0);
  if (none63(__bs9)) {
    return true;
  } else {
    if (one63(__bs9)) {
      return join(["%ge", __a10], __bs9);
    } else {
      return ["%and", ["%ge", __a10, hd(__bs9)], join([">="], __bs9)];
    }
  }
};
setenv(">=", {
  _stash: true,
  macro: ___6261__macro
});
var ___62__macro = function (a, ..._42args) {
  var ____r165 = unstash([..._42args]);
  var __a11 = destash33(a, ____r165);
  var ____id59 = ____r165;
  var __bs10 = cut(____id59, 0);
  if (none63(__bs10)) {
    return true;
  } else {
    if (one63(__bs10)) {
      return join(["%gt", __a11], __bs10);
    } else {
      return ["%and", ["%gt", __a11, hd(__bs10)], join([">"], __bs10)];
    }
  }
};
setenv(">", {
  _stash: true,
  macro: ___62__macro
});
var __not__macro = function (..._42args) {
  var __args14 = unstash([..._42args]);
  if (none63(__args14)) {
    return false;
  } else {
    if (one63(__args14)) {
      return join(["%not"], __args14);
    } else {
      return ["%and", ["%not", hd(__args14)], join(["not"], tl(__args14))];
    }
  }
};
setenv("not", {
  _stash: true,
  macro: __not__macro
});
var __and__macro = function (a, ..._42args) {
  var ____r166 = unstash([..._42args]);
  var __a12 = destash33(a, ____r166);
  var ____id60 = ____r166;
  var __bs111 = cut(____id60, 0);
  if (nil63(__a12)) {
    return true;
  } else {
    if (none63(__bs111)) {
      return __a12;
    } else {
      if (one63(__bs111)) {
        return join(["%and", __a12], __bs111);
      } else {
        return ["%and", __a12, join(["and"], __bs111)];
      }
    }
  }
};
setenv("and", {
  _stash: true,
  macro: __and__macro
});
var __or__macro = function (a, ..._42args) {
  var ____r167 = unstash([..._42args]);
  var __a13 = destash33(a, ____r167);
  var ____id61 = ____r167;
  var __bs12 = cut(____id61, 0);
  if (nil63(__a13)) {
    return false;
  } else {
    if (none63(__bs12)) {
      return __a13;
    } else {
      if (one63(__bs12)) {
        return join(["%or", __a13], __bs12);
      } else {
        return ["%or", __a13, join(["or"], __bs12)];
      }
    }
  }
};
setenv("or", {
  _stash: true,
  macro: __or__macro
});
var __break__macro = function (..._42args) {
  var __args15 = unstash([..._42args]);
  return join(["%break"], __args15);
};
setenv("break", {
  _stash: true,
  macro: __break__macro
});
var __return__macro = function (..._42args) {
  var __args16 = unstash([..._42args]);
  return join(["%return"], __args16);
};
setenv("return", {
  _stash: true,
  macro: __return__macro
});
var __while__macro = function (c, ..._42args) {
  var ____r168 = unstash([..._42args]);
  var __c2 = destash33(c, ____r168);
  var ____id62 = ____r168;
  var __body32 = cut(____id62, 0);
  return join(["%while", __c2], __body32);
};
setenv("while", {
  _stash: true,
  macro: __while__macro
});
var __do__macro = function (..._42args) {
  var __body33 = unstash([..._42args]);
  return join(["%do"], __body33);
};
setenv("do", {
  _stash: true,
  macro: __do__macro
});
var __get__macro = function (..._42args) {
  var __args17 = unstash([..._42args]);
  return join(["%get"], __args17);
};
setenv("get", {
  _stash: true,
  macro: __get__macro
});
var __idx__macro = function (..._42args) {
  var __args18 = unstash([..._42args]);
  return join(["%idx"], __args18);
};
setenv("idx", {
  _stash: true,
  macro: __idx__macro
});
var __new__macro = function (..._42args) {
  var __args19 = unstash([..._42args]);
  return join(["%new"], __args19);
};
setenv("new", {
  _stash: true,
  macro: __new__macro
});
var __typeof__macro = function (..._42args) {
  var __args20 = unstash([..._42args]);
  return join(["%typeof"], __args20);
};
setenv("typeof", {
  _stash: true,
  macro: __typeof__macro
});
var __error__macro = function (..._42args) {
  var __args21 = unstash([..._42args]);
  return join(["%error"], __args21);
};
setenv("error", {
  _stash: true,
  macro: __error__macro
});
var __throw__macro = function (..._42args) {
  var __args22 = unstash([..._42args]);
  return join(["%throw"], __args22);
};
setenv("throw", {
  _stash: true,
  macro: __throw__macro
});
var __raise__macro = function (..._42args) {
  var __args23 = unstash([..._42args]);
  return join(["%throw"], __args23);
};
setenv("raise", {
  _stash: true,
  macro: __raise__macro
});
var __is__macro = function (..._42args) {
  var __args24 = unstash([..._42args]);
  var ____x443 = object(["target", join(["="], __args24)]);
  ____x443.py = join(["%is"], __args24);
  return ____x443;
};
setenv("is", {
  _stash: true,
  macro: __is__macro
});
var __in__macro = function (..._42args) {
  var __args25 = unstash([..._42args]);
  return join(["%in"], __args25);
};
setenv("in", {
  _stash: true,
  macro: __in__macro
});
var __as__macro = function (..._42args) {
  var __args26 = unstash([..._42args]);
  return join(["%as"], __args26);
};
setenv("as", {
  _stash: true,
  macro: __as__macro
});
var ___37expand_case__macro = function (x, ..._42args) {
  var ____r169 = unstash([..._42args]);
  var __x451 = destash33(x, ____r169);
  var ____id63 = ____r169;
  var __body34 = cut(____id63, 0);
  var __e47 = undefined;
  if (atom63(__x451)) {
    __e47 = [__x451];
  } else {
    __e47 = __x451;
  }
  var ____id64 = __e47;
  var __a14 = has(____id64, 0);
  var __bs13 = cut(____id64, 1);
  var __e48 = undefined;
  if (none63(__bs13)) {
    __e48 = [["%literal"]];
  } else {
    __e48 = __bs13;
  }
  return join(["%block", __a14], __e48, __body34);
};
setenv("%expand-case", {
  _stash: true,
  macro: ___37expand_case__macro
});
var ___37cases__macro = function (..._42args) {
  var __args27 = unstash([..._42args]);
  if (none63(__args27)) {
    return ["do"];
  } else {
    if (one63(__args27)) {
      return join(["%expand-case"], hd(__args27));
    } else {
      var __r170 = unique("r");
      return join(["with", __r170, "nil"], map(function (__x460) {
        var ____id65 = __x460;
        var __x461 = has(____id65, 0);
        var __body35 = cut(____id65, 1);
        return ["%expand-case", __x461, ["%set", __r170, join(["%do"], __body35)]];
      }, almost(__args27)), [join(["%expand-case"], last(__args27))]);
    }
  }
};
setenv("%cases", {
  _stash: true,
  macro: ___37cases__macro
});
var __try__macro = function (x, ..._42args) {
  var ____r172 = unstash([..._42args]);
  var __x468 = destash33(x, ____r172);
  var ____id66 = ____r172;
  var __cases = cut(____id66, 0);
  var __fin = ["finally"];
  var ____o22 = __cases;
  var ____i38 = undefined;
  for (____i38 in ____o22) {
    var __x470 = ____o22[____i38];
    var __e49 = undefined;
    if (numeric63(____i38)) {
      __e49 = parseInt(____i38);
    } else {
      __e49 = ____i38;
    }
    var ____i381 = __e49;
    if (hd63(__x470, "finally")) {
      __fin = __x470;
    }
  }
  var __forms3 = [];
  var ____x473 = __cases;
  var ____i39 = 0;
  while (____i39 < _35(____x473)) {
    var ____id67 = ____x473[____i39];
    var __x474 = has(____id67, 0);
    var __body36 = cut(____id67, 1);
    if (__x474 === "finally") {
    } else {
      if (__x474 === "except" && has(__body36, 1) === "as") {
        var ____id68 = __body36;
        var __kind = has(____id68, 0);
        var ___ = has(____id68, 1);
        var __name10 = has(____id68, 2);
        var __body37 = cut(____id68, 3);
        add(__forms3, join([[__x474, ["%as", __kind, __name10]]], __body37));
      } else {
        if (__x474 === "except") {
          var ____id69 = __body36;
          var __kind1 = has(____id69, 0);
          var __body38 = cut(____id69, 1);
          add(__forms3, join([[__x474, __kind1]], __body38));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i39 = ____i39 + 1;
  }
  return join(["%cases", ["try", __x468]], __forms3, [__fin]);
};
setenv("try", {
  _stash: true,
  macro: __try__macro
});
var __eif__macro = function (_var, expr, fail, ok) {
  if (nil63(expr)) {
    expr = "nil";
  }
  if (nil63(fail)) {
    fail = "nil";
  }
  if (nil63(ok)) {
    ok = "nil";
  }
  var __ok63 = unique("ok?");
  return ["let", [[__ok63, _var], ["guard", expr]], ["if", __ok63, ok, fail]];
};
setenv("eif", {
  _stash: true,
  macro: __eif__macro
});
var __errsafe__macro = function (x, _else) {
  if (nil63(_else)) {
    _else = "nil";
  }
  var __ok4 = unique("ok");
  var __v26 = unique("v");
  return ["let", [[__ok4, __v26], ["guard", x]], ["if", __ok4, __v26, _else]];
};
setenv("errsafe", {
  _stash: true,
  macro: __errsafe__macro
});
var __dbg__macro = function () {
  var ____x491 = object(["target", ["do"]]);
  ____x491.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x491;
};
setenv("dbg", {
  _stash: true,
  macro: __dbg__macro
});
prcode = function (form) {
  return print(str(expand(["%set", "lumen-result", form])));
};
var __see__macro = function (form) {
  var __form3 = expand(form);
  print(compile(expand(["%set", "lumen-result", __form3])));
  return __form3;
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
var ___37ampersand__macro = function (x) {
  return ["%ptr", x];
};
setenv("%ampersand", {
  _stash: true,
  macro: ___37ampersand__macro
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
  var ____id70 = s;
  var __pos = has(____id70, "pos");
  var __len = has(____id70, "len");
  var __string = has(____id70, "string");
  if (__pos < __len) {
    return char(__string, __pos);
  }
};
var read_char = function (s) {
  var __c3 = peek_char(s);
  if (__c3) {
    s.pos = s.pos + 1;
    return __c3;
  }
};
var skip_non_code = function (s) {
  while (true) {
    var __c4 = peek_char(s);
    if (nil63(__c4)) {
      break;
    } else {
      if (has63(whitespace, __c4)) {
        read_char(s);
      } else {
        if (__c4 === ";") {
          while (__c4 && !( __c4 === "\n")) {
            __c4 = read_char(s);
          }
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
  var __c5 = peek_char(s);
  if (is63(__c5)) {
    return (has(read_table, __c5) || has(read_table, ""))(s);
  } else {
    return eof;
  }
};
var read = function (s) {
  var __form4 = read_1(s);
  if ("," === peek_char(s)) {
    var __r188 = [",", __form4];
    while (true) {
      read_char(s);
      __form4 = read_1(s);
      if (eof63(s, __form4)) {
        return expected(s, "tuple");
      }
      add(__r188, __form4);
      if (!( "," === peek_char(s))) {
        break;
      }
    }
    return __r188;
  } else {
    return __form4;
  }
};
var read_all = function (s) {
  var __r190 = undefined;
  var __l111 = [];
  while (nil63(__r190)) {
    var __form5 = read(s);
    if (more63(s, __form5)) {
      __r190 = s.more;
    } else {
      if (eof63(s, __form5)) {
        __r190 = __l111;
      } else {
        add(__l111, __form5);
      }
    }
  }
  return __r190;
};
read_string = function (str, more) {
  var __s2 = stream(str, more);
  var __x503 = read(__s2);
  if (!( __x503 === eof)) {
    return __x503;
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
  var __y6 = read(s);
  if (more63(s, __y6)) {
    return __y6;
  } else {
    return [x, __y6];
  }
};
var hex_prefix63 = function (str) {
  var __e50 = undefined;
  if (code(str, 0) === 45) {
    __e50 = 1;
  } else {
    __e50 = 0;
  }
  var __i40 = __e50;
  var __id125 = code(str, __i40) === 48;
  var __e51 = undefined;
  if (__id125) {
    __i40 = __i40 + 1;
    var __n31 = code(str, __i40);
    __e51 = __n31 === 120 || __n31 === 88;
  } else {
    __e51 = __id125;
  }
  return __e51;
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
    var __c6 = peek_char(s);
    if (__c6 && (! has63(whitespace, __c6) && ! has63(delimiters, __c6))) {
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
      var __n32 = maybe_number(__str2);
      if (real63(__n32)) {
        return __n32;
      } else {
        return __str2;
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var __r200 = undefined;
  var __l121 = [];
  while (nil63(__r200)) {
    skip_non_code(s);
    var __c7 = peek_char(s);
    if (__c7 === ")") {
      read_char(s);
      __r200 = __l121;
    } else {
      if (nil63(__c7)) {
        __r200 = expected(s, ")");
      } else {
        var __x505 = read(s);
        if (eof63(s, __x505)) {
          __r200 = expected(s, ")");
        } else {
          if (key63(__x505)) {
            var __k39 = clip(__x505, 0, edge(__x505));
            var __v27 = read(s);
            __l121 = object(__l121);
            __l121[__k39] = __v27;
          } else {
            add(__l121, __x505);
          }
        }
      }
    }
  }
  return __r200;
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
var read_matching = function (opener, closer, s) {
  var __r203 = undefined;
  var __pos1 = s.pos;
  var __str3 = "";
  var __i41 = 0;
  while (__i41 < _35(opener)) {
    __str3 = __str3 + (read_char(s) || "");
    __i41 = __i41 + 1;
  }
  if (__str3 === opener) {
    while (nil63(__r203)) {
      if (clip(s.string, s.pos, s.pos + _35(closer)) === closer) {
        var __i42 = 0;
        while (__i42 < _35(closer)) {
          __str3 = __str3 + read_char(s);
          __i42 = __i42 + 1;
        }
        __r203 = __str3;
      } else {
        if (nil63(peek_char(s))) {
          __r203 = expected(s, closer);
        } else {
          __str3 = __str3 + read_char(s);
          if (peek_char(s) === "\\") {
            __str3 = __str3 + read_char(s);
          }
        }
      }
    }
  }
  return __r203;
};
read_table["\""] = function (s) {
  if (string_starts63(s.string, "\"\"\"", s.pos)) {
    return read_matching("\"\"\"", "\"\"\"", s);
  } else {
    var __i43 = s.pos;
    var __j1 = search(s.string, "\"", __i43 + 1);
    var __b4 = either(search(s.string, "\\", __i43 + 1), __j1);
    if (is63(__j1) && (__j1 < s.len && __b4 >= __j1)) {
      s.pos = __j1 + 1;
      return clip(s.string, __i43, __j1 + 1);
    } else {
      var __r205 = undefined;
      read_char(s);
      while (nil63(__r205)) {
        var __c8 = peek_char(s);
        if (__c8 === "\"") {
          read_char(s);
          __r205 = clip(s.string, __i43, s.pos);
        } else {
          if (nil63(__c8)) {
            __r205 = expected(s, "\"");
          } else {
            if (__c8 === "\\") {
              read_char(s);
            }
            read_char(s);
          }
        }
      }
      return __r205;
    }
  }
};
read_table["|"] = function (s) {
  var __i44 = s.pos;
  var __j2 = search(s.string, "|", __i44 + 1);
  if (is63(__j2) && __j2 < s.len) {
    s.pos = __j2 + 1;
    return clip(s.string, __i44, __j2 + 1);
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
  var __c9 = peek_char(s);
  if (nil63(__c9) || (has63(whitespace, __c9) || has63(closing_delimiters, __c9))) {
    return ",";
  } else {
    if (__c9 === "@") {
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
read_table["&"] = function (s) {
  read_char(s);
  return wrap(s, "%ampersand");
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
    var __i45 = edge(environment);
    while (__i45 >= 0) {
      if (has63(environment[__i45], k)) {
        var __b5 = environment[__i45][k];
        var __e52 = undefined;
        if (p) {
          __e52 = has(__b5, p);
        } else {
          __e52 = __b5;
        }
        return __e52;
      } else {
        __i45 = __i45 - 1;
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
      var __l13 = array(args);
      var ____o23 = args;
      var __k40 = undefined;
      for (__k40 in ____o23) {
        var __v28 = ____o23[__k40];
        var __e55 = undefined;
        if (numeric63(__k40)) {
          __e55 = parseInt(__k40);
        } else {
          __e55 = __k40;
        }
        var __k41 = __e55;
        if (! number63(__k41)) {
          add(__l13, ["%compile", __k41, "|=|", __v28]);
        }
      }
      return __l13;
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        var __l14 = array(args);
        var ____o24 = args;
        var __k42 = undefined;
        for (__k42 in ____o24) {
          var __v29 = ____o24[__k42];
          var __e54 = undefined;
          if (numeric63(__k42)) {
            __e54 = parseInt(__k42);
          } else {
            __e54 = __k42;
          }
          var __k43 = __e54;
          if (! number63(__k43)) {
            add(__l14, ["%compile", __k43, "| |", __v29]);
          }
        }
        return __l14;
      } else {
        var __l15 = ["%object", "\"_stash\"", true];
        var ____o25 = args;
        var __k44 = undefined;
        for (__k44 in ____o25) {
          var __v30 = ____o25[__k44];
          var __e53 = undefined;
          if (numeric63(__k44)) {
            __e53 = parseInt(__k44);
          } else {
            __e53 = __k44;
          }
          var __k45 = __e53;
          if (! number63(__k45)) {
            add(__l15, literal(__k45));
            add(__l15, __v30);
          }
        }
        return join({}, args, [__l15]);
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
        var ____id71 = lh;
        var ___1 = has(____id71, 0);
        var ___var = has(____id71, 1);
        var __val1 = has(____id71, 2);
        var __val2 = either(__val1, ___var);
        return bind(["o", ___var, ["the", __val2]], rh);
      } else {
        if (hd(lh) === "o") {
          var ____id72 = lh;
          var ___2 = has(____id72, 0);
          var ___var1 = has(____id72, 1);
          var __val3 = has(____id72, 2);
          return [___var1, ["if", ["nil?", rh], __val3, rh]];
        } else {
          var __id73 = unique("id");
          var __bs14 = [__id73, rh];
          var ____o26 = lh;
          var __k46 = undefined;
          for (__k46 in ____o26) {
            var __v31 = ____o26[__k46];
            var __e56 = undefined;
            if (numeric63(__k46)) {
              __e56 = parseInt(__k46);
            } else {
              __e56 = __k46;
            }
            var __k47 = __e56;
            var __e57 = undefined;
            if (__k47 === "rest") {
              __e57 = ["cut", __id73, _35(lh)];
            } else {
              __e57 = ["has", __id73, ["quote", bias(__k47)]];
            }
            var __x519 = __e57;
            if (is63(__k47)) {
              var __e58 = undefined;
              if (__v31 === true) {
                __e58 = __k47;
              } else {
                __e58 = __v31;
              }
              var __k48 = __e58;
              __bs14 = join(__bs14, bind(__k48, __x519));
            }
          }
          return __bs14;
        }
      }
    }
  }
};
var __arguments37__macro = function (from) {
  var ____x523 = object(["target"]);
  ____x523.js = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", from];
  ____x523.py = ["list", "|_args|"];
  ____x523.lua = ["quasilist", "|...|"];
  ____x523.cmake = ["%ref", "ARGN"];
  return ____x523;
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
    var ____x535 = object(["target"]);
    ____x535.py = ["obj", "..."];
    return ["unstash", ["quasilist", "..."], ____x535];
  };
  if (atom63(args)) {
    return [__args131, join(["let", [args, rest()]], body)];
  } else {
    var ____id74 = body_docstring(body);
    var __doc = has(____id74, 0);
    var __body39 = has(____id74, 1);
    var __pre = [];
    var __bs15 = [];
    var __inits = [];
    var __r232 = unique("r");
    var ____o27 = args;
    var __k49 = undefined;
    for (__k49 in ____o27) {
      var __v32 = ____o27[__k49];
      var __e59 = undefined;
      if (numeric63(__k49)) {
        __e59 = parseInt(__k49);
      } else {
        __e59 = __k49;
      }
      var __k50 = __e59;
      if (number63(__k50)) {
        if (atom63(__v32)) {
          add(__args131, __v32);
        } else {
          if (hd(__v32) === "o") {
            var ____id75 = __v32;
            var ___3 = has(____id75, 0);
            var ___var2 = has(____id75, 1);
            var __val4 = has(____id75, 2);
            add(__args131, ___var2);
            add(__inits, ["%if", ["nil?", ___var2], ["%set", ___var2, __val4]]);
          } else {
            if (hd(__v32) === "t") {
              var ____id76 = __v32;
              var ___4 = has(____id76, 0);
              var ___var3 = has(____id76, 1);
              var __val5 = has(____id76, 2);
              var __val6 = either(__val5, ___var3);
              add(__args131, ___var3);
              add(__inits, ["%if", ["nil?", ___var3], ["%set", ___var3, ["the", __val6]]]);
            } else {
              var __x547 = unique("x");
              add(__args131, __x547);
              __bs15 = join(__bs15, [__v32, __x547]);
            }
          }
        }
      }
    }
    if (props63(args)) {
      __pre = join(__pre, [__r232, rest()]);
      var __n38 = _35(__args131);
      var __i51 = 0;
      while (__i51 < __n38) {
        var __v33 = __args131[__i51];
        __pre = join(__pre, [__v33, ["destash!", __v33, __r232]]);
        __i51 = __i51 + 1;
      }
      __bs15 = join(__bs15, [props(args), __r232]);
    }
    var __forms4 = join(["let", __pre], __inits, [join(["let", __bs15], __body39)]);
    var __e60 = undefined;
    if (is63(__doc)) {
      __e60 = ["do", __doc, __forms4];
    } else {
      __e60 = __forms4;
    }
    return [__args131, __e60];
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
var expand_local = function (__x558) {
  var ____id77 = __x558;
  var __x559 = has(____id77, 0);
  var __name11 = has(____id77, 1);
  var __value3 = has(____id77, 2);
  setenv(__name11, {
    _stash: true,
    variable: true
  });
  return ["%local", __name11, macroexpand(__value3)];
};
var expand_function = function (__x561) {
  var ____id78 = __x561;
  var __x562 = has(____id78, 0);
  var __args28 = has(____id78, 1);
  var __body40 = cut(____id78, 2);
  add(environment, {});
  var ____r240 = undefined;
  try{
    var ____o28 = __args28;
    var ____i52 = undefined;
    for (____i52 in ____o28) {
      var ____x563 = ____o28[____i52];
      var __e61 = undefined;
      if (numeric63(____i52)) {
        __e61 = parseInt(____i52);
      } else {
        __e61 = ____i52;
      }
      var ____i521 = __e61;
      setenv(____x563, {
        _stash: true,
        variable: true
      });
    }
    ____r240 = join(["%function", __args28], macroexpand(__body40));
  }
  finally{
    drop(environment);
  }
  return ____r240;
};
var expand_definition = function (__x565) {
  var ____id79 = __x565;
  var __x566 = has(____id79, 0);
  var __name12 = has(____id79, 1);
  var __args29 = has(____id79, 2);
  var __body41 = cut(____id79, 3);
  add(environment, {});
  var ____r243 = undefined;
  try{
    var ____o29 = __args29;
    var ____i53 = undefined;
    for (____i53 in ____o29) {
      var ____x567 = ____o29[____i53];
      var __e62 = undefined;
      if (numeric63(____i53)) {
        __e62 = parseInt(____i53);
      } else {
        __e62 = ____i53;
      }
      var ____i531 = __e62;
      setenv(____x567, {
        _stash: true,
        variable: true
      });
    }
    ____r243 = join([__x566, __name12, __args29], macroexpand(__body41));
  }
  finally{
    drop(environment);
  }
  return ____r243;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x569) {
  var ____id80 = __x569;
  var __name13 = has(____id80, 0);
  var __body42 = cut(____id80, 1);
  return apply(macro_function(__name13), __body42);
};
real63 = function (x) {
  return number63(x) && (! nan63(x) && ! inf63(x));
};
valid_access63 = function (str) {
  return _35(str) > 2 && (!( "." === char(str, 0)) && (!( "." === char(str, edge(str))) && ! search(str, "..")));
};
parse_access = function (str) {
  return reduce(function (a, b) {
    var __n41 = number(a);
    if (is63(__n41)) {
      return ["at", b, __n41];
    } else {
      return ["%idx", b, a];
    }
  }, reverse(split(str, ".")));
};
parse_access63 = function (form) {
  return string63(form) && (! string_literal63(form) && (! id_literal63(form) && (is63(search(form, ".")) && valid_access63(form))));
};
expand_access = function (form) {
  if (parse_access63(form)) {
    return parse_access(form);
  }
};
expand_atom_functions42 = [];
add(expand_atom_functions42, expand_access);
expand_atom = function (form) {
  var ____x572 = expand_atom_functions42;
  var ____i54 = 0;
  while (____i54 < _35(____x572)) {
    var __f3 = ____x572[____i54];
    var __x573 = __f3(form);
    if (!( __x573 === undefined)) {
      return __x573;
    }
    ____i54 = ____i54 + 1;
  }
  return form;
};
macroexpand_atom = function (form) {
  if (symbol63(form)) {
    return macroexpand(symbol_expansion(form));
  } else {
    var __expr5 = expand_atom(form);
    if (__expr5 === form) {
      return __expr5;
    } else {
      return macroexpand(__expr5);
    }
  }
};
macroexpand = function (form) {
  if (atom63(form)) {
    return macroexpand_atom(form);
  } else {
    if (none63(form)) {
      return map(macroexpand, form);
    } else {
      var __x574 = macroexpand(hd(form));
      var __args30 = tl(form);
      if (nil63(__x574)) {
        return macroexpand(__args30);
      } else {
        if (__x574 === "%local") {
          return expand_local(form);
        } else {
          if (__x574 === "%function") {
            return expand_function(form);
          } else {
            if (__x574 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x574 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x574 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x574)) {
                    return expand_macro(form);
                  } else {
                    return join([__x574], map(macroexpand, __args30));
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
macroexpand = function (form) {
  print(str(["macroexpand", form]));
  if (parse_access63(form)) {
    return macroexpand(parse_access(form));
  } else {
    if (symbol63(form)) {
      return macroexpand(symbol_expansion(form));
    } else {
      if (atom63(form)) {
        return form;
      } else {
        if (none63(form)) {
          return map(macroexpand, form);
        } else {
          var __x577 = macroexpand(hd(form));
          var __args31 = tl(form);
          var __form6 = join([__x577], __args31);
          if (__x577 === undefined) {
            return macroexpand(__args31);
          } else {
            if (__x577 === "%local") {
              return expand_local(__form6);
            } else {
              if (__x577 === "%function") {
                return expand_function(__form6);
              } else {
                if (__x577 === "%global-function") {
                  return expand_definition(__form6);
                } else {
                  if (__x577 === "%local-function") {
                    return expand_definition(__form6);
                  } else {
                    if (__x577 === "%expansion") {
                      return __form6[1];
                    } else {
                      if (macro63(__x577)) {
                        return expand_macro(__form6);
                      } else {
                        return join([__x577], map(macroexpand, __args31));
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
        var __x580 = hd(form);
        if (__x580 === "%local") {
          return expand_local(form);
        } else {
          if (__x580 === "%function") {
            return expand_function(form);
          } else {
            if (__x580 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x580 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x580 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x580)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x580)) {
                      return macroexpand(join([parse_access(__x580)], tl(form)));
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
  var __xs13 = [["quasilist"]];
  var ____o30 = form;
  var __k51 = undefined;
  for (__k51 in ____o30) {
    var __v34 = ____o30[__k51];
    var __e63 = undefined;
    if (numeric63(__k51)) {
      __e63 = parseInt(__k51);
    } else {
      __e63 = __k51;
    }
    var __k52 = __e63;
    if (! number63(__k52)) {
      var __e64 = undefined;
      if (quasisplice63(__v34, depth)) {
        __e64 = quasiexpand(__v34[1]);
      } else {
        __e64 = quasiexpand(__v34, depth);
      }
      var __v35 = __e64;
      last(__xs13)[__k52] = __v35;
    }
  }
  var ____x584 = form;
  var ____i56 = 0;
  while (____i56 < _35(____x584)) {
    var __x585 = ____x584[____i56];
    if (quasisplice63(__x585, depth)) {
      var __x586 = quasiexpand(__x585[1]);
      add(__xs13, __x586);
      add(__xs13, ["quasilist"]);
    } else {
      add(last(__xs13), quasiexpand(__x585, depth));
    }
    ____i56 = ____i56 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || (!( hd(x) === "quasilist") || props63(x));
  }, __xs13);
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
expand_if = function (__x590) {
  var ____id81 = __x590;
  var __a15 = has(____id81, 0);
  var __b6 = has(____id81, 1);
  var __c10 = cut(____id81, 2);
  if (is63(__b6)) {
    return [join(["%if", __a15, __b6], expand_if(__c10))];
  } else {
    if (is63(__a15)) {
      return [__a15];
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
  var __i57 = 0;
  while (__i57 < has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value")) {
    __s3 = __s3 + "  ";
    __i57 = __i57 + 1;
  }
  return __s3;
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
      var __e65 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e65 = "L_";
      } else {
        __e65 = "_";
      }
      var __x596 = __e65;
      var __e66 = undefined;
      if (number_code63(code(id, 0))) {
        __e66 = __x596;
      } else {
        __e66 = "";
      }
      var __id121 = __e66;
      var __i58 = 0;
      while (__i58 < _35(id)) {
        var __c111 = char(id, __i58);
        var __n43 = code(__c111);
        var __e67 = undefined;
        if (__c111 === "-" && !( id === "-")) {
          var __e70 = undefined;
          if (__i58 === 0) {
            __e70 = __x596;
          } else {
            __e70 = "_";
          }
          __e67 = __e70;
        } else {
          var __e68 = undefined;
          if (valid_code63(__n43)) {
            __e68 = __c111;
          } else {
            var __e69 = undefined;
            if (__i58 === 0) {
              __e69 = __x596 + __n43;
            } else {
              __e69 = __n43;
            }
            __e68 = __e69;
          }
          __e67 = __e68;
        }
        var __c12 = __e67;
        __id121 = __id121 + __c12;
        __i58 = __i58 + 1;
      }
      if (raw63) {
        return __id121;
      } else {
        if (reserved63(__id121)) {
          return __x596 + __id121;
        } else {
          return __id121;
        }
      }
    }
  }
};
valid_id63 = function (x) {
  return some63(x) && x === compile_id(x);
};
var __names5 = {};
unique = function (x) {
  var __x597 = compile_id(x);
  if (has63(__names5, __x597)) {
    var __i59 = __names5[__x597];
    __names5[__x597] = __names5[__x597] + 1;
    return unique(__x597 + __i59);
  } else {
    __names5[__x597] = 1;
    return "__" + __x597;
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
      var __i60 = inner(k);
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        var __e71 = undefined;
        if (valid_id63(__i60)) {
          __e71 = __i60;
        } else {
          __e71 = k;
        }
        return screamcase(__e71);
      } else {
        if (valid_id63(__i60)) {
          return __i60;
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
  var __o31 = [];
  var ____o32 = t;
  var __k53 = undefined;
  for (__k53 in ____o32) {
    var __v36 = ____o32[__k53];
    var __e72 = undefined;
    if (numeric63(__k53)) {
      __e72 = parseInt(__k53);
    } else {
      __e72 = __k53;
    }
    var __k54 = __e72;
    var __x598 = f(__v36);
    if (is63(__x598)) {
      add(__o31, literal(__k54));
      add(__o31, __x598);
    }
  }
  return __o31;
};
var ____x600 = object([]);
var ____x601 = object([]);
____x601.js = "!";
____x601.lua = "not";
____x601.py = "not";
____x601.cmake = "NOT";
____x600["%not"] = ____x601;
____x600["%unm"] = "-";
var ____x602 = object([]);
____x602["%mul"] = "*";
____x602["%div"] = "/";
____x602["%idiv"] = "//";
____x602["%mod"] = "%";
var ____x603 = object([]);
var ____x604 = object([]);
____x604.js = "+";
____x604.lua = "..";
____x604.py = "+";
____x603["%cat"] = ____x604;
var ____x605 = object([]);
____x605["%add"] = "+";
____x605["%sub"] = "-";
var ____x606 = object([]);
var ____x607 = object([]);
____x607.cmake = "LESS";
____x607.all = "<";
____x606["%lt"] = ____x607;
var ____x608 = object([]);
____x608.cmake = "GREATER";
____x608.all = ">";
____x606["%gt"] = ____x608;
var ____x609 = object([]);
____x609.cmake = "LESS_EQUAL";
____x609.all = "<=";
____x606["%le"] = ____x609;
var ____x610 = object([]);
____x610.cmake = "GREATER_EQUAL";
____x610.all = ">=";
____x606["%ge"] = ____x610;
var ____x611 = object([]);
var ____x612 = object([]);
____x612.js = "===";
____x612.lua = "==";
____x612.py = "==";
____x611["%eq"] = ____x612;
var ____x613 = object([]);
var ____x614 = object([]);
____x614.py = "in";
____x613["%in"] = ____x614;
var ____x615 = object([]);
____x615.py = "is";
____x613["%is"] = ____x615;
var ____x616 = object([]);
var ____x617 = object([]);
____x617.js = "&&";
____x617.lua = "and";
____x617.py = "and";
____x617.cmake = "AND";
____x616["%and"] = ____x617;
var ____x618 = object([]);
var ____x619 = object([]);
____x619.js = "||";
____x619.lua = "or";
____x619.py = "or";
____x619.cmake = "OR";
____x618["%or"] = ____x619;
var infix = [____x600, ____x602, ____x603, ____x605, ____x606, ____x611, ____x613, ____x616, ____x618];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["%not", "%unm"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    if (atom63(hd(form))) {
      var ____o33 = infix;
      var __k55 = undefined;
      for (__k55 in ____o33) {
        var __v37 = ____o33[__k55];
        var __e73 = undefined;
        if (numeric63(__k55)) {
          __e73 = parseInt(__k55);
        } else {
          __e73 = __k55;
        }
        var __k56 = __e73;
        if (has63(__v37, hd(form))) {
          return index(__k56);
        }
      }
    }
  }
  return 0;
};
var getop = function (op) {
  if (string63(op)) {
    return find(function (level) {
      var __x621 = has(level, op);
      if (__x621 === true) {
        return op;
      } else {
        if (string63(__x621)) {
          return __x621;
        } else {
          if (is63(__x621)) {
            return has(__x621, has(setenv("target", {
              _stash: true,
              toplevel: true
            }), "value")) || has(__x621, "all");
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
  var __s4 = "(";
  var __c121 = "";
  var ____x622 = args;
  var ____i63 = 0;
  while (____i63 < _35(____x622)) {
    var __x623 = ____x622[____i63];
    __s4 = __s4 + (__c121 + compile(__x623));
    if ((has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") && (default63 && (! id_literal63(__x623) && !( __x623 === "...")))) {
      var __e74 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        __e74 = "";
      } else {
        __e74 = "=None";
      }
      __s4 = __s4 + __e74;
    }
    var __e75 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e75 = " ";
    } else {
      __e75 = ", ";
    }
    __c121 = __e75;
    ____i63 = ____i63 + 1;
  }
  return __s4 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s12 = "";
    var __i64 = 0;
    while (__i64 < _35(s)) {
      var __c13 = char(s, __i64);
      var __e76 = undefined;
      if (__c13 === "\n") {
        __e76 = "\\n";
      } else {
        var __e77 = undefined;
        if (__c13 === "\r") {
          __e77 = "\\r";
        } else {
          __e77 = __c13;
        }
        __e76 = __e77;
      }
      __s12 = __s12 + __e76;
      __i64 = __i64 + 1;
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
  var ____id82 = form;
  var __x624 = has(____id82, 0);
  var __args32 = cut(____id82, 1);
  var ____id83 = getenv(__x624);
  var __special = has(____id83, "special");
  var __stmt = has(____id83, "stmt");
  var __self_tr63 = has(____id83, "tr");
  var __e78 = undefined;
  if (stmt63 && ! __stmt) {
    __e78 = indentation();
  } else {
    __e78 = "";
  }
  var __p1 = __e78;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p1 + (apply(__special, __args32) + __tr);
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
method_call63 = function (form) {
  var __e79 = undefined;
  if (list63(form)) {
    __e79 = hd(form);
  } else {
    __e79 = form;
  }
  var __x625 = __e79;
  return string63(__x625) && (_35(__x625, 1) > 1 && char(__x625, 0) === ".");
};
var compile_call = function (form) {
  var __f4 = hd(form);
  var __f11 = compile_name(__f4);
  var __args33 = stash42(tl(form));
  var __e80 = undefined;
  if (method_call63(hd(__args33))) {
    __e80 = mapcat(compile, __args33, "");
  } else {
    __e80 = compile_args(__args33);
  }
  var __args34 = __e80;
  if (parenthesize_call63(__f4)) {
    return "(" + (__f11 + (")" + __args34));
  } else {
    return __f11 + __args34;
  }
};
var op_delims = function (parent, child, ..._42args) {
  var ____r293 = unstash([..._42args]);
  var __parent = destash33(parent, ____r293);
  var __child = destash33(child, ____r293);
  var ____id84 = ____r293;
  var __right = has(____id84, "right");
  var __e81 = undefined;
  if (__right) {
    __e81 = _6261;
  } else {
    __e81 = _62;
  }
  if (__e81(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id85 = form;
  var __op = has(____id85, 0);
  var ____id86 = cut(____id85, 1);
  var __a16 = has(____id86, 0);
  var __b7 = has(____id86, 1);
  var ____id87 = op_delims(form, __a16);
  var __ao = has(____id87, 0);
  var __ac = has(____id87, 1);
  var ____id88 = op_delims(form, __b7, {
    _stash: true,
    right: true
  });
  var __bo = has(____id88, 0);
  var __bc = has(____id88, 1);
  var __a17 = compile(__a16);
  var __b8 = compile(__b7);
  var __op1 = getop(__op);
  if (unary63(form)) {
    return __op1 + (__ao + (" " + (__a17 + __ac)));
  } else {
    return __ao + (__a17 + (__ac + (" " + (__op1 + (" " + (__bo + (__b8 + __bc)))))));
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
  var ____x629 = compile(body, {
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
  var __s5 = ____x629;
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
    var ____x630 = indentation() + "pass\n";
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    return ____x630;
  } else {
    return __s5;
  }
};
compile_function = function (args, body, ..._42args) {
  var ____r296 = unstash([..._42args]);
  var __args35 = destash33(args, ____r296);
  var __body43 = destash33(body, ____r296);
  var ____id89 = ____r296;
  var __name14 = has(____id89, "name");
  var __prefix = has(____id89, "prefix");
  var __async = has(____id89, "async");
  var __e82 = undefined;
  if (__name14) {
    __e82 = compile_name(__name14);
  } else {
    __e82 = "";
  }
  var __id90 = __e82;
  var __e83 = undefined;
  if (has(__args35, "rest")) {
    __e83 = join(__args35, ["..."]);
  } else {
    __e83 = __args35;
  }
  var __args141 = __e83;
  var __e84 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e84 = compile_args(join([["%compile", __id90]], __args141), true);
  } else {
    __e84 = compile_args(__args141, true);
  }
  var __args36 = __e84;
  var __body44 = compile_body(__body43);
  var __ind = indentation();
  var __e85 = undefined;
  if (__prefix) {
    __e85 = __prefix + " ";
  } else {
    __e85 = "";
  }
  var __p2 = __e85;
  var __e86 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e86 = "";
  } else {
    var __e87 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e87 = "endfunction()";
    } else {
      __e87 = "end";
    }
    __e86 = __e87;
  }
  var __tr1 = __e86;
  var __e88 = undefined;
  if (__async && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua")) {
    __e88 = "async ";
  } else {
    __e88 = "";
  }
  var __a18 = __e88;
  if (__name14) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __a18 + ("function " + (__id90 + (__args36 + (" {\n" + (__body44 + (__ind + ("}" + __tr1)))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __e89 = undefined;
      if (none63(__ind)) {
        __e89 = "\n";
      } else {
        __e89 = "";
      }
      var __ws = __e89;
      return __a18 + ("def " + (__id90 + (__args36 + (":\n" + (__body44 + __ws)))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        return __a18 + ("function" + (__args36 + ("\n" + (__body44 + (__ind + __tr1)))));
      } else {
        return __p2 + ("function " + (__id90 + (__args36 + ("\n" + (__body44 + (__ind + __tr1))))));
      }
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "%return") && ! statement63(hd(form)));
};
compile = function (form, raw63, ..._42args) {
  var ____r298 = unstash([..._42args]);
  var __form7 = destash33(form, ____r298);
  var __raw63 = destash33(raw63, ____r298);
  var ____id91 = ____r298;
  var __stmt1 = has(____id91, "stmt");
  if (nil63(__form7)) {
    return "";
  } else {
    if (special_form63(__form7)) {
      return compile_special(__form7, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e90 = undefined;
      if (__stmt1) {
        __e90 = indentation();
      } else {
        __e90 = "";
      }
      var __ind1 = __e90;
      var __e91 = undefined;
      if (atom63(__form7)) {
        __e91 = compile_atom(__form7, __raw63);
      } else {
        var __e92 = undefined;
        if (infix63(hd(__form7))) {
          __e92 = compile_infix(__form7);
        } else {
          __e92 = compile_call(__form7);
        }
        __e91 = __e92;
      }
      var __form8 = __e91;
      return __ind1 + (__form8 + __tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e = lower(form, __hoist, true, tail63);
  var __e93 = undefined;
  if (some63(__hoist) && is63(__e)) {
    __e93 = join(["%do"], __hoist, [__e]);
  } else {
    var __e94 = undefined;
    if (is63(__e)) {
      __e94 = __e;
    } else {
      var __e95 = undefined;
      if (_35(__hoist) > 1) {
        __e95 = join(["%do"], __hoist);
      } else {
        __e95 = hd(__hoist);
      }
      __e94 = __e95;
    }
    __e93 = __e94;
  }
  return either(__e93, ["%do"]);
};
var lower_body = function (body, tail63) {
  return lower_statement(join(["%do"], body), tail63);
};
var literal63 = function (form) {
  return atom63(form) || (hd(form) === "%array" || (hd(form) === "%object" || (hd(form) === "%list" || (hd(form) === "%ptr" || (hd(form) === "%id" || (hd(form) === "%ref" || hd(form) === ","))))));
};
var standalone63 = function (form) {
  return !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") && string_literal63(form) || (! atom63(form) && (! infix63(hd(form)) && (! literal63(form) && !( "%get" === hd(form)))) || id_literal63(form));
};
var lower_do = function (args, hoist, stmt63, tail63) {
  var ____x641 = almost(args);
  var ____i65 = 0;
  while (____i65 < _35(____x641)) {
    var __x642 = ____x641[____i65];
    var ____y7 = lower(__x642, hoist, stmt63);
    if (yes(____y7)) {
      var __e1 = ____y7;
      if (standalone63(__e1)) {
        add(hoist, __e1);
      }
    }
    ____i65 = ____i65 + 1;
  }
  var __e2 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e2)) {
    return ["%return", __e2];
  } else {
    return __e2;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id92 = args;
  var __lh3 = has(____id92, 0);
  var __rh3 = has(____id92, 1);
  var __lh11 = lower(__lh3, hoist);
  var __rh11 = lower(__rh3, hoist);
  add(hoist, ["%set", __lh11, __rh11]);
  if (!( stmt63 && ! tail63 || false)) {
    return __lh11;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id93 = args;
  var __cond4 = has(____id93, 0);
  var __then = has(____id93, 1);
  var ___else = has(____id93, 2);
  if (stmt63) {
    var __e97 = undefined;
    if (is63(___else)) {
      __e97 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond4, hoist), lower_body([__then], tail63)], __e97));
  } else {
    var __e3 = unique("e");
    add(hoist, ["%local", __e3, "nil"]);
    var __e96 = undefined;
    if (is63(___else)) {
      __e96 = [lower(["%set", __e3, ___else])];
    }
    add(hoist, join(["%if", lower(__cond4, hoist), lower(["%set", __e3, __then])], __e96));
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      return ["%id", __e3];
    } else {
      return __e3;
    }
  }
};
var lower_short = function (x, args, hoist) {
  var ____id94 = args;
  var __a19 = has(____id94, 0);
  var __b9 = has(____id94, 1);
  var __hoist1 = [];
  var __b11 = lower(__b9, __hoist1);
  if (some63(__hoist1)) {
    var __id95 = unique("id");
    var __e98 = undefined;
    if (x === "%and") {
      __e98 = ["%if", __id95, __b9, __id95];
    } else {
      __e98 = ["%if", __id95, __id95, __b9];
    }
    return lower(["%do", ["%local", __id95, __a19], __e98], hoist);
  } else {
    return [x, lower(__a19, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id96 = args;
  var __c14 = has(____id96, 0);
  var __body45 = cut(____id96, 1);
  var __pre1 = [];
  var __c15 = lower(__c14, __pre1);
  var __e99 = undefined;
  if (none63(__pre1)) {
    __e99 = ["%while", __c15, lower_body(__body45)];
  } else {
    __e99 = ["%while", true, join(["%do"], __pre1, [["%if", ["%not", __c15], ["%break"]], lower_body(__body45)])];
  }
  return add(hoist, __e99);
};
var lower_for = function (args, hoist) {
  var ____id97 = args;
  var __h = has(____id97, 0);
  var __k57 = has(____id97, 1);
  var __body46 = cut(____id97, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k57, lower_body(__body46)], props(__body46)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id98 = args;
  var __h1 = has(____id98, 0);
  var __body47 = cut(____id98, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body47, tail63)], props(__body47)));
  } else {
    var __e4 = unique("e");
    add(hoist, ["%local", __e4]);
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e4, join(["%do"], __body47)])], props(__body47)));
    return __e4;
  }
};
var lower_block = function (kind, args, hoist, stmt63, tail63) {
  var ____id99 = args;
  var __name15 = has(____id99, 0);
  var __h2 = has(____id99, 1);
  var __body48 = cut(____id99, 2);
  return add(hoist, [kind, __name15, lower(__h2, hoist), lower_body(__body48, tail63)]);
};
var lower_from = function (args, hoist, stmt63, tail63) {
  var ____id100 = args;
  var __name16 = has(____id100, 0);
  var __import_ = has(____id100, 1);
  var __id101 = has(____id100, 2);
  var __as_ = has(____id100, 3);
  var __alias = has(____id100, 4);
  add(hoist, join(["from"], args));
  return __alias || __id101;
};
var lower_import = function (__x676, hoist, stmt63, tail63) {
  var ____id102 = __x676;
  var __name17 = has(____id102, 0);
  var __alias1 = cut(____id102, 1);
  var __e100 = undefined;
  if (hd(__alias1) === "as") {
    __e100 = __alias1[1];
  } else {
    __e100 = hd(__alias1);
  }
  var __as = __e100;
  var __id103 = __as || __name17;
  add(hoist, join(["import", __name17], __alias1));
  if (! stmt63) {
    return __id103;
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
    var ____id104 = args;
    var __a20 = has(____id104, 0);
    var __body49 = cut(____id104, 1);
    return join(["%function", __a20, lower_body(__body49, true)], props(__body49));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id105 = args;
  var __name18 = has(____id105, 0);
  var __args37 = has(____id105, 1);
  var __body50 = cut(____id105, 2);
  return add(hoist, join([kind, __name18, __args37, lower_body(__body50, true)], props(__body50)));
};
ref63 = function (x) {
  return list63(x) && hd63(x, "%ref");
};
id63 = function (x) {
  return list63(x) && hd63(x, "%id");
};
ptr63 = function (x) {
  return list63(x) && hd63(x, "%ptr");
};
reference63 = function (x) {
  return ref63(x) || (id63(x) || ptr63(x));
};
ptr_name = function (x) {
  return x[1];
};
ptr_decay = function (x) {
  var __x684 = ptr_name(x);
  if (id63(__x684)) {
    return __x684;
  } else {
    if (ref63(__x684)) {
      return __x684;
    } else {
      return ["%id", __x684];
    }
  }
};
ptr_decay = function (x) {
  return x;
};
var lower_invoke = function (form, hoist) {
  var __ptr = undefined;
  var lower_ptr = function (x) {
    if (ptr63(x)) {
      __ptr = ptr_decay(x);
      x = ptr_name(x);
    }
    return x;
  };
  var __form9 = map(lower_ptr, form);
  if (is63(__ptr) && ! literal63(__form9)) {
    add(hoist, __form9);
  } else {
    __ptr = __form9;
  }
  return __ptr;
};
var lower_call = function (form, hoist) {
  var __form10 = map(function (x) {
    return lower(x, hoist);
  }, form);
  if (some63(__form10)) {
    return lower_invoke(__form10, hoist);
  }
};
var pairwise63 = function (form) {
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"]);
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e5 = [];
    var ____id106 = form;
    var __x687 = has(____id106, 0);
    var __args38 = cut(____id106, 1);
    reduce(function (a, b) {
      add(__e5, [__x687, a, b]);
      return a;
    }, __args38);
    return join(["%and"], reverse(__e5));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form11 = lower_pairwise(form);
  var ____id107 = __form11;
  var __x690 = has(____id107, 0);
  var __args39 = cut(____id107, 1);
  return lower(reduce(function (a, b) {
    return [__x690, b, a];
  }, reverse(__args39)), hoist);
};
var lower_special = function (form, hoist) {
  var __e6 = lower_call(form, hoist);
  if (__e6) {
    return add(hoist, __e6);
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
          var ____id108 = form;
          var __x693 = has(____id108, 0);
          var __args40 = cut(____id108, 1);
          if (__x693 === "%do") {
            return lower_do(__args40, hoist, stmt63, tail63);
          } else {
            if (__x693 === "%call") {
              return lower(__args40, hoist, stmt63, tail63);
            } else {
              if (__x693 === "%set") {
                return lower_set(__args40, hoist, stmt63, tail63);
              } else {
                if (__x693 === "%if") {
                  return lower_if(__args40, hoist, stmt63, tail63);
                } else {
                  if (__x693 === "%try") {
                    return lower_try(__args40, hoist, tail63);
                  } else {
                    if (__x693 === "%while") {
                      return lower_while(__args40, hoist);
                    } else {
                      if (__x693 === "%for") {
                        return lower_for(__args40, hoist);
                      } else {
                        if (__x693 === "%with") {
                          return lower_with(__args40, hoist, stmt63, tail63);
                        } else {
                          if (__x693 === "%block") {
                            return lower_block("%block", __args40, hoist, stmt63, tail63);
                          } else {
                            if (__x693 === "%cases") {
                              return lower_cases(__args40, hoist, stmt63, tail63);
                            } else {
                              if (__x693 === "import") {
                                return lower_import(__args40, hoist, stmt63, tail63);
                              } else {
                                if (__x693 === "from") {
                                  return lower_from(__args40, hoist, stmt63, tail63);
                                } else {
                                  if (__x693 === "%function") {
                                    return lower_function(__args40, hoist);
                                  } else {
                                    if (__x693 === "%local-function" || __x693 === "%global-function") {
                                      return lower_definition(__x693, __args40, hoist);
                                    } else {
                                      if (in63(__x693, ["%and", "%or"])) {
                                        return lower_short(__x693, __args40, hoist);
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
      }
    }
  }
};
expand = function (form) {
  return lower(macroexpand(form));
};
var __e101 = undefined;
if (typeof(global) === "undefined") {
  var __e102 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e102 = window;
  } else {
    var __e103 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e103 = self;
    } else {
      __e103 = this;
    }
    __e102 = __e103;
  }
  global = __e102;
  __e101 = global;
}
var __e104 = undefined;
if (!( typeof(require) === "undefined")) {
  global.require = require;
  global.require;
  var __e105 = undefined;
  if (!( typeof(__module1) === "undefined")) {
    __module1.filename = require("path").resolve("repl");
    __module1.filename;
    __module1.paths = require("module")._nodeModulePaths(__module1.filename);
    __e105 = __module1.paths;
  }
  __e104 = __e105;
}
var run = function (code, context) {
  var __f6 = new Function("with(this) {\n" + (code + "\n}"));
  return __f6.call(either(context, global));
};
var eval_result = function (globals, locals) {
  return lumen_result;
};
_eval = function (form, globals, locals) {
  var ____prev1 = has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value");
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = "js";
  var ____id109 = (function () {
    try {
      var ____prev2 = has(setenv("indent-level", {
        _stash: true,
        toplevel: true
      }), "value");
      setenv("indent-level", {
        _stash: true,
        toplevel: true
      }).value = 0;
      var ____id110 = (function () {
        try {
          return [true, compile(expand(["%set", "lumen-result", form]))];
        }
        catch (e) {
          return [false, e];
        }
      })();
      var ____ok8 = has(____id110, 0);
      var ____x698 = has(____id110, 1);
      setenv("indent-level", {
        _stash: true,
        toplevel: true
      }).value = ____prev2;
      var __e106 = undefined;
      if (____ok8) {
        __e106 = ____x698;
      } else {
        throw ____x698;
        __e106 = undefined;
      }
      return [true, __e106];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var ____ok7 = has(____id109, 0);
  var ____x695 = has(____id109, 1);
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = ____prev1;
  var __e107 = undefined;
  if (____ok7) {
    __e107 = ____x695;
  } else {
    throw ____x695;
    __e107 = undefined;
  }
  var __code = __e107;
  run(__code, globals, locals);
  return eval_result(globals, locals);
};
immediate_call63 = function (x) {
  return ! atom63(x) && (! atom63(hd(x)) && hd(hd(x)) === "%function");
};
var ___37do__special = function (..._42args) {
  var __forms5 = unstash([..._42args]);
  var __s6 = "";
  var ____x703 = __forms5;
  var ____i66 = 0;
  while (____i66 < _35(____x703)) {
    var __x704 = ____x703[____i66];
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" && (immediate_call63(__x704) && "\n" === char(__s6, edge(__s6)))) {
      __s6 = clip(__s6, 0, edge(__s6)) + ";\n";
    }
    __s6 = __s6 + compile(__x704, {
      _stash: true,
      stmt: true
    });
    if (! atom63(__x704)) {
      if (hd(__x704) === "%return" || hd(__x704) === "%break") {
        break;
      }
    }
    ____i66 = ____i66 + 1;
  }
  return __s6;
};
setenv("%do", {
  _stash: true,
  special: ___37do__special,
  stmt: true,
  tr: true
});
var ___37cmake_block__special = function (body) {
  var __ind2 = indentation();
  var __s7 = "";
  __s7 = __s7 + (__ind2 + "block(SCOPE_FOR VARIABLES)\n");
  __s7 = __s7 + compile_body(body);
  __s7 = __s7 + (__ind2 + "endblock()\n");
  return __s7;
};
setenv("%cmake-block", {
  _stash: true,
  special: ___37cmake_block__special,
  stmt: true,
  tr: true
});
var ___37if__special = function (cond, cons, alt) {
  var __cond5 = compile(cond);
  var __cons = compile_body(cons);
  var __e108 = undefined;
  if (alt) {
    __e108 = compile_body(alt);
  }
  var __alt = __e108;
  var __ind3 = indentation();
  var __s8 = "";
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __s8 = __s8 + (__ind3 + ("if (" + (__cond5 + (") {\n" + (__cons + (__ind3 + "}"))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __s8 = __s8 + (__ind3 + ("if " + (__cond5 + (":\n" + __cons))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        __s8 = __s8 + (__ind3 + ("if(" + (__cond5 + (")\n" + __cons))));
      } else {
        __s8 = __s8 + (__ind3 + ("if " + (__cond5 + (" then\n" + __cons))));
      }
    }
  }
  if (__alt && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __s8 = __s8 + (" else {\n" + (__alt + (__ind3 + "}")));
  } else {
    if (__alt && has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __s8 = __s8 + (__ind3 + ("else:\n" + __alt));
    } else {
      if (__alt && has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        __s8 = __s8 + (__ind3 + ("else()\n" + __alt));
      } else {
        if (__alt) {
          __s8 = __s8 + (__ind3 + ("else\n" + __alt));
        }
      }
    }
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    return __s8 + (__ind3 + "end\n");
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __s8 + "\n";
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        return __s8 + (__ind3 + "endif()\n");
      } else {
        return __s8;
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
  var __cond6 = compile(cond);
  var __body51 = compile_body(form);
  var __ind4 = indentation();
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __ind4 + ("while (" + (__cond6 + (") {\n" + (__body51 + (__ind4 + "}\n")))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind4 + ("while " + (__cond6 + (":\n" + __body51)));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "cmake") {
        return __ind4 + ("while(" + (__cond6 + (")\n" + (__body51 + (__ind4 + "endwhile()\n")))));
      } else {
        return __ind4 + ("while " + (__cond6 + (" do\n" + (__body51 + (__ind4 + "end\n")))));
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
  var ____r350 = unstash([..._42args]);
  var __t5 = destash33(t, ____r350);
  var __k58 = destash33(k, ____r350);
  var __form12 = destash33(form, ____r350);
  var ____id1111 = ____r350;
  var __async1 = has(____id1111, "async");
  var __t6 = compile(__t5);
  var __k59 = compile(__k58);
  var __ind5 = indentation();
  var __body52 = compile_body(__form12);
  var __e109 = undefined;
  if (__async1) {
    __e109 = "async ";
  } else {
    __e109 = "";
  }
  var __a21 = __e109;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    return __ind5 + ("for " + (__k59 + (" in next, " + (__t6 + (" do\n" + (__body52 + (__ind5 + "end\n")))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind5 + (__a21 + ("for " + (__k59 + (" in " + (__t6 + (":\n" + __body52))))));
    } else {
      return __ind5 + ("for (" + (__k59 + (" in " + (__t6 + (") {\n" + (__body52 + (__ind5 + "}\n")))))));
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
  var ____r351 = unstash([..._42args]);
  var __t7 = destash33(t, ____r351);
  var __form13 = destash33(form, ____r351);
  var ____id112 = ____r351;
  var __async2 = has(____id112, "async");
  var __t8 = compile(__t7);
  var __ind6 = indentation();
  var __body53 = compile_body(__form13);
  var __e110 = undefined;
  if (__async2) {
    __e110 = "async ";
  } else {
    __e110 = "";
  }
  var __a22 = __e110;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return __ind6 + (__a22 + ("with " + (__t8 + (":\n" + __body53))));
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
  var __t9 = compile(t);
  var __ind7 = indentation();
  var __body54 = compile_body(form);
  var __e111 = undefined;
  if (some63(__t9)) {
    __e111 = " ";
  } else {
    __e111 = "";
  }
  var __sep = __e111;
  var __e112 = undefined;
  if (some63(__t9)) {
    __e112 = "(";
  } else {
    __e112 = "";
  }
  var __lh4 = __e112;
  var __e113 = undefined;
  if (some63(__t9)) {
    __e113 = ")";
  } else {
    __e113 = "";
  }
  var __rh4 = __e113;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return __ind7 + (name + (__sep + (__t9 + (":\n" + __body54))));
  } else {
    return __ind7 + (name + (__sep + (__lh4 + (__t9 + (__rh4 + (__sep + ("{\n" + (__body54 + (__ind7 + "}\n")))))))));
  }
};
setenv("%block", {
  _stash: true,
  special: ___37block__special,
  stmt: true,
  tr: true
});
var ___37try__special = function (form) {
  var __ind8 = indentation();
  var __body55 = compile_body(form);
  var __e114 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e114 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", false, ["%get", "e", 1], "e"]]];
  } else {
    __e114 = ["%return", ["%array", false, "e"]];
  }
  var __hf = __e114;
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") + 1;
  var ____x717 = compile(__hf, {
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
  var __h3 = ____x717;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __ind8 + ("try {\n" + (__body55 + (__ind8 + ("}\n" + (__ind8 + ("catch (e) {\n" + (__h3 + (__ind8 + "}\n"))))))));
  } else {
    return __ind8 + ("try:\n" + (__body55 + (__ind8 + ("except:\n" + __h3))));
  }
};
setenv("%try", {
  _stash: true,
  special: ___37try__special,
  stmt: true,
  tr: true
});
var ___37delete__special = function (place) {
  var __e115 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e115 = "del ";
  } else {
    __e115 = "delete ";
  }
  return indentation() + (__e115 + compile(place));
};
setenv("%delete", {
  _stash: true,
  special: ___37delete__special,
  stmt: true
});
var ___37break__special = function () {
  var __e116 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e116 = "()";
  } else {
    __e116 = "";
  }
  return indentation() + ("break" + __e116);
};
setenv("%break", {
  _stash: true,
  special: ___37break__special,
  stmt: true
});
var ___37function__special = function (args, ..._42args) {
  var ____r356 = unstash([..._42args]);
  var __args43 = destash33(args, ____r356);
  var ____id113 = ____r356;
  var __body56 = cut(____id113, 0);
  return apply(compile_function, join([__args43], __body56, []));
};
setenv("%function", {
  _stash: true,
  special: ___37function__special
});
var ___37global_function__special = function (name, args, ..._42args) {
  var ____r357 = unstash([..._42args]);
  var __name19 = destash33(name, ____r357);
  var __args44 = destash33(args, ____r357);
  var ____id114 = ____r357;
  var __body57 = cut(____id114, 0);
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
    var ____x723 = object([__args44]);
    ____x723.name = __name19;
    var ____x724 = object([]);
    ____x724.name = __name19;
    var __x722 = apply(compile_function, join(____x723, __body57, ____x724));
    return indentation() + __x722;
  } else {
    return compile(["%set", __name19, join(["%function", __args44], __body57)], {
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
  var ____r358 = unstash([..._42args]);
  var __name20 = destash33(name, ____r358);
  var __args45 = destash33(args, ____r358);
  var ____id115 = ____r358;
  var __body58 = cut(____id115, 0);
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
    var ____x729 = object([__args45]);
    ____x729.name = __name20;
    ____x729.prefix = "local";
    var ____x730 = object([]);
    ____x730.name = __name20;
    ____x730.prefix = "local";
    var __x728 = apply(compile_function, join(____x729, __body58, ____x730));
    return indentation() + __x728;
  } else {
    return compile(["%local", __name20, join(["%function", __args45], __body58)], {
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
  if (id63(variable)) {
    return compile(variable);
  } else {
    return "${" + (compile(variable) + "}");
  }
};
setenv("%ref", {
  _stash: true,
  special: ___37ref__special
});
var ___37id__special = function (x) {
  return escape(compile(["%ptr", x]));
};
setenv("%id", {
  _stash: true,
  special: ___37id__special
});
var ___37ptr__special = function (x) {
  var __e117 = undefined;
  if (reference63(x)) {
    __e117 = x;
  } else {
    __e117 = ["%ref", x];
  }
  return compile(__e117);
};
setenv("%ptr", {
  _stash: true,
  special: ___37ptr__special
});
var ___37return__special = function (x) {
  var __e118 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    var __e120 = undefined;
    if (nil63(x)) {
      __e120 = ["return"];
    } else {
      __e120 = ["return", "PROPAGATE", x];
    }
    __e118 = compile(__e120);
  } else {
    var __e119 = undefined;
    if (nil63(x)) {
      __e119 = "return";
    } else {
      __e119 = "return " + compile(x);
    }
    __e118 = __e119;
  }
  return indentation() + __e118;
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
  var __e121 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e121 = "throw " + compile(["%new", ["Error", x]]);
  } else {
    var __e122 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e122 = "raise " + compile(["Exception", x]);
    } else {
      __e122 = "error(" + (compile(x) + ")");
    }
    __e121 = __e122;
  }
  var __e7 = __e121;
  return indentation() + __e7;
};
setenv("%error", {
  _stash: true,
  special: ___37error__special,
  stmt: true
});
var ___37throw__special = function (x) {
  var __e123 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e123 = "throw " + compile(x);
  } else {
    var __e124 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e124 = "raise " + compile(x);
    } else {
      __e124 = "error(" + (compile(x) + ")");
    }
    __e123 = __e124;
  }
  var __e8 = __e123;
  return indentation() + __e8;
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
  var __id116 = compile(name);
  var __value11 = compile(value);
  var __e125 = undefined;
  if (is63(value)) {
    __e125 = " = " + __value11;
  } else {
    __e125 = "";
  }
  var __rh5 = __e125;
  var __e126 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e126 = "var ";
  } else {
    var __e127 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e127 = "local ";
    } else {
      __e127 = "";
    }
    __e126 = __e127;
  }
  var __keyword1 = __e126;
  var __ind9 = indentation();
  return __ind9 + (__keyword1 + (__id116 + __rh5));
};
setenv("%local", {
  _stash: true,
  special: ___37local__special,
  stmt: true
});
var ___37set__special = function (lh, rh) {
  var __lh5 = compile(lh);
  var __e128 = undefined;
  if (nil63(rh)) {
    __e128 = "nil";
  } else {
    __e128 = rh;
  }
  var __rh6 = compile(__e128);
  var __ind10 = indentation();
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    return indentation() + ("set(" + (__lh5 + (" " + (__rh6 + ")"))));
  } else {
    return indentation() + (__lh5 + (" = " + __rh6));
  }
};
setenv("%set", {
  _stash: true,
  special: ___37set__special,
  stmt: true
});
var ___37get__special = function (t, k) {
  var __t11 = compile(t);
  var __k111 = compile(k);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && char(__t11, 0) === "{" || infix_operator63(t)) {
    __t11 = "(" + (__t11 + ")");
  }
  if (string_literal63(k) && (valid_id63(inner(k)) && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py"))) {
    return __t11 + ("." + inner(k));
  } else {
    return __t11 + ("[" + (__k111 + "]"));
  }
};
setenv("%get", {
  _stash: true,
  special: ___37get__special
});
var ___37idx__special = function (t, k) {
  var __t12 = compile(t);
  var __k121 = compile(k, "raw");
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" && char(__t12, 0) === "{" || infix_operator63(t)) {
    __t12 = "(" + (__t12 + ")");
  }
  return __t12 + ("." + __k121);
};
setenv("%idx", {
  _stash: true,
  special: ___37idx__special
});
var ___37array__special = function (..._42args) {
  var __forms6 = unstash([..._42args]);
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    return mapcat(compile, __forms6, " ");
  } else {
    var __e129 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e129 = "{";
    } else {
      __e129 = "[";
    }
    var __open = __e129;
    var __e130 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e130 = "}";
    } else {
      __e130 = "]";
    }
    var __close = __e130;
    var __s9 = "";
    var __c16 = "";
    var ____o34 = __forms6;
    var __k60 = undefined;
    for (__k60 in ____o34) {
      var __v38 = ____o34[__k60];
      var __e131 = undefined;
      if (numeric63(__k60)) {
        __e131 = parseInt(__k60);
      } else {
        __e131 = __k60;
      }
      var __k61 = __e131;
      if (number63(__k61)) {
        __s9 = __s9 + (__c16 + compile(__v38));
        __c16 = ", ";
      }
    }
    return __open + (__s9 + __close);
  }
};
setenv("%array", {
  _stash: true,
  special: ___37array__special
});
var ___37object__special = function (..._42args) {
  var __forms7 = unstash([..._42args]);
  var __e132 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e132 = "";
  } else {
    __e132 = "{";
  }
  var __s10 = __e132;
  var __c17 = "";
  var __e133 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    __e133 = " = ";
  } else {
    var __e134 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e134 = " ";
    } else {
      __e134 = ": ";
    }
    __e133 = __e134;
  }
  var __sep1 = __e133;
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") + 1;
  var ____x743 = indentation();
  setenv("indent-level", {
    _stash: true,
    toplevel: true
  }).value = has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value") - 1;
  var __ind11 = ____x743;
  var __e135 = undefined;
  if (_35(__forms7) > 2) {
    __e135 = "\n" + __ind11;
  }
  var __pad = __e135;
  var __e136 = undefined;
  if (is63(__pad)) {
    __e136 = "\n" + indentation();
  } else {
    __e136 = "";
  }
  var __end = __e136;
  __s10 = __s10 + either(__pad, "");
  var ____x744 = pair(__forms7);
  var ____i68 = 0;
  while (____i68 < _35(____x744)) {
    var ____id117 = ____x744[____i68];
    var __k62 = has(____id117, 0);
    var __v39 = has(____id117, 1);
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x745 = compile(__v39);
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    __s10 = __s10 + (__c17 + (key(__k62) + (__sep1 + ____x745)));
    var __e137 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "cmake") {
      __e137 = "";
    } else {
      __e137 = ",";
    }
    __c17 = __e137 + either(__pad, " ");
    ____i68 = ____i68 + 1;
  }
  var __e138 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "cmake") {
    __e138 = "";
  } else {
    __e138 = "}";
  }
  return __s10 + (__end + __e138);
};
setenv("%object", {
  _stash: true,
  special: ___37object__special
});
var ___37list__special = function (form, comps, cond, ..._42args) {
  var ____r371 = unstash([..._42args]);
  var __form14 = destash33(form, ____r371);
  var __comps2 = destash33(comps, ____r371);
  var __cond7 = destash33(cond, ____r371);
  var ____id118 = ____r371;
  var __kind2 = has(____id118, "kind");
  var __s111 = compile(__form14);
  var __e139 = undefined;
  if (__kind2 === "object") {
    __e139 = ["{", "}"];
  } else {
    __e139 = ["[", "]"];
  }
  var ____id119 = __e139;
  var __lh6 = has(____id119, 0);
  var __rh7 = has(____id119, 1);
  if (!( __kind2 === "object")) {
    __s111 = "(" + (__s111 + ")");
  }
  var ____x749 = __comps2;
  var ____i69 = 0;
  while (____i69 < _35(____x749)) {
    var ____id120 = ____x749[____i69];
    var __k63 = has(____id120, 0);
    var __v40 = has(____id120, 1);
    __s111 = __s111 + (" for " + (compile(__k63) + (" in " + compile(__v40))));
    ____i69 = ____i69 + 1;
  }
  if (is63(__cond7)) {
    __s111 = __s111 + (" if " + compile(__cond7));
  }
  return __lh6 + (__s111 + __rh7);
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
  var __args46 = unstash([..._42args]);
  return mapcat(compile_literal, __args46);
};
setenv("%literal", {
  _stash: true,
  special: ___37literal__special
});
var ___37compile__special = function (..._42args) {
  var __args47 = unstash([..._42args]);
  return mapcat(compile, __args47);
};
setenv("%compile", {
  _stash: true,
  special: ___37compile__special
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
  var ____r374 = unstash([..._42args]);
  var __name21 = destash33(name, ____r374);
  var ____id1211 = ____r374;
  var __alias2 = cut(____id1211, 0);
  var __ind12 = indentation();
  var __e140 = undefined;
  if (hd(__alias2) === "as") {
    __e140 = __alias2[1];
  } else {
    __e140 = hd(__alias2);
  }
  var __as1 = __e140;
  var __id122 = __as1 || __name21;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __s121 = __ind12 + ("import " + compile(__name21));
    if (__as1) {
      __s121 = __s121 + (" as " + compile(__id122));
    }
    return __s121;
  } else {
    return __ind12 + compile(["%local", __id122, ["require", escape(__name21)]]);
  }
};
setenv("import", {
  _stash: true,
  special: __import__special,
  stmt: true
});
var __from__special = function (name, ..._42args) {
  var ____r375 = unstash([..._42args]);
  var __name22 = destash33(name, ____r375);
  var ____id123 = ____r375;
  var __imports = cut(____id123, 0);
  var __ind13 = indentation();
  var __id124 = __name22;
  var __r376 = undefined;
  __r376 = drop(__imports);
  var __e141 = undefined;
  if (last(__imports) === "as") {
    __e141 = drop(__imports);
  } else {
    add(__imports, __r376);
    __r376 = undefined;
    __e141 = __r376;
  }
  var __as2 = __r376;
  var __e142 = undefined;
  if (hd(__imports) === "import") {
    __e142 = tl(__imports);
  } else {
    __e142 = __imports;
  }
  var __names6 = __e142;
  var __names7 = mapcat(function (x) {
    if (x === "*") {
      return x;
    } else {
      return compile(x);
    }
  }, __names6, ", ");
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __s13 = __ind13 + ("from " + (compile(__name22) + (" import " + __names7)));
    if (__as2) {
      __s13 = __s13 + (" as " + compile(__as2));
    }
    return __s13;
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
  var __args48 = unstash([..._42args]);
  if (none63(__args48)) {
    return ", ";
  } else {
    if (one63(__args48)) {
      return ", " + compile(hd(__args48));
    } else {
      return mapcat(compile, __args48, ", ");
    }
  }
};
setenv(",", {
  _stash: true,
  special: ___44__special
});
var __3458__special34 = function (..._42args) {
  var __args49 = unstash([..._42args]);
  if (none63(__args49)) {
    return ":";
  } else {
    if (one63(__args49)) {
      return ":" + compile(hd(__args49));
    } else {
      return mapcat(compile, __args49, ":");
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
  var __args50 = unstash([..._42args]);
  return indentation() + ("yield " + mapcat(compile, __args50, ", "));
};
setenv("yield", {
  _stash: true,
  special: __yield__special,
  stmt: true
});
var __await__special = function (x) {
  var __e143 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua") {
    __e143 = "";
  } else {
    __e143 = "await ";
  }
  var __a23 = __e143;
  return __a23 + compile(x);
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
