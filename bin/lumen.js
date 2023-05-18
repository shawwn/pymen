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
      var __e = undefined;
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
      var __e1 = undefined;
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
length = function (x, upto) {
  var __n2 = -1;
  var __upto = either(upto, inf);
  var ____o2 = x;
  var __k4 = undefined;
  for (__k4 in ____o2) {
    var __v2 = ____o2[__k4];
    var __e2 = undefined;
    if (numeric63(__k4)) {
      __e2 = parseInt(__k4);
    } else {
      __e2 = __k4;
    }
    var __k5 = __e2;
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
  var __e3 = undefined;
  if (nil63(from) || from < 0) {
    __e3 = 0;
  } else {
    __e3 = from;
  }
  var __i3 = __e3;
  var __n4 = _35(x);
  var __e4 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e4 = __n4;
  } else {
    __e4 = upto;
  }
  var __upto1 = __e4;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e5 = undefined;
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
props = function (x) {
  var __t = {};
  var ____o4 = x;
  var __k8 = undefined;
  for (__k8 in ____o4) {
    var __v4 = ____o4[__k8];
    var __e6 = undefined;
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
values = function (x) {
  if (array63(x)) {
    return x;
  } else {
    var __t1 = {};
    var ____o5 = x;
    var __k10 = undefined;
    for (__k10 in ____o5) {
      var __v5 = ____o5[__k10];
      var __e7 = undefined;
      if (numeric63(__k10)) {
        __e7 = parseInt(__k10);
      } else {
        __e7 = __k10;
      }
      var __k11 = __e7;
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
        var __e8 = undefined;
        if (numeric63(__k12)) {
          __e8 = parseInt(__k12);
        } else {
          __e8 = __k12;
        }
        var __k13 = __e8;
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
    var __e9 = undefined;
    if (numeric63(____i10)) {
      __e9 = parseInt(____i10);
    } else {
      __e9 = ____i10;
    }
    var ____i101 = __e9;
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
    var __e10 = undefined;
    if (numeric63(__k14)) {
      __e10 = parseInt(__k14);
    } else {
      __e10 = __k14;
    }
    var __k15 = __e10;
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
    var __e11 = undefined;
    if (f) {
      __e11 = f(__v9);
    } else {
      __e11 = __v9;
    }
    var __y4 = __e11;
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
    var __e12 = undefined;
    if (numeric63(__k16)) {
      __e12 = parseInt(__k16);
    } else {
      __e12 = __k16;
    }
    var __k17 = __e12;
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
    var __e13 = undefined;
    if (numeric63(____i17)) {
      __e13 = parseInt(____i17);
    } else {
      __e13 = ____i17;
    }
    var ____i171 = __e13;
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
      var __e14 = undefined;
      if (numeric63(__k18)) {
        __e14 = parseInt(__k18);
      } else {
        __e14 = __k18;
      }
      var __k19 = __e14;
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
        var __e16 = undefined;
        if (numeric63(__k20)) {
          __e16 = parseInt(__k20);
        } else {
          __e16 = __k20;
        }
        var __k21 = __e16;
        if (!( __k21 === "_stash")) {
          __args1[__k21] = __v12;
        }
      }
      if (params) {
        var ____o13 = params;
        var __k22 = undefined;
        for (__k22 in ____o13) {
          var __v13 = ____o13[__k22];
          var __e17 = undefined;
          if (numeric63(__k22)) {
            __e17 = parseInt(__k22);
          } else {
            __e17 = __k22;
          }
          var __k23 = __e17;
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
          var __e15 = undefined;
          if (numeric63(__k24)) {
            __e15 = parseInt(__k24);
          } else {
            __e15 = __k24;
          }
          var __k25 = __e15;
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
      var __e18 = undefined;
      if (numeric63(__k26)) {
        __e18 = parseInt(__k26);
      } else {
        __e18 = __k26;
      }
      var __k27 = __e18;
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
  var __e19 = undefined;
  if (is63(pos)) {
    __e19 = clip(str, pos);
  } else {
    __e19 = str;
  }
  var __str = __e19;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_starts63 = function (str, x, pos) {
  var __e20 = undefined;
  if (is63(pos)) {
    __e20 = clip(str, pos);
  } else {
    __e20 = str;
  }
  var __str1 = __e20;
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
      var __e21 = undefined;
      if (__c1 === "\n") {
        __e21 = "\\n";
      } else {
        var __e22 = undefined;
        if (__c1 === "\r") {
          __e22 = "\\r";
        } else {
          var __e23 = undefined;
          if (__c1 === "\"") {
            __e23 = "\\\"";
          } else {
            var __e24 = undefined;
            if (__c1 === "\\") {
              __e24 = "\\\\";
            } else {
              __e24 = __c1;
            }
            __e23 = __e24;
          }
          __e22 = __e23;
        }
        __e21 = __e22;
      }
      var __c11 = __e21;
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
                          var __e25 = undefined;
                          if (numeric63(__k28)) {
                            __e25 = parseInt(__k28);
                          } else {
                            __e25 = __k28;
                          }
                          var __k29 = __e25;
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
    var __e26 = undefined;
    if (has63(__keys, "toplevel")) {
      __e26 = hd(environment);
    } else {
      __e26 = last(environment);
    }
    var __frame = __e26;
    var __e27 = undefined;
    if (has63(__frame, __k31)) {
      __e27 = __frame[__k31];
    } else {
      __e27 = {};
    }
    var __entry = __e27;
    var ____o17 = __keys;
    var __k32 = undefined;
    for (__k32 in ____o17) {
      var __v19 = ____o17[__k32];
      var __e28 = undefined;
      if (numeric63(__k32)) {
        __e28 = parseInt(__k32);
      } else {
        __e28 = __k32;
      }
      var __k33 = __e28;
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
  return join(["%do"], map(function (__x34) {
    var ____id5 = __x34;
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
      var __x45 = unique("x");
      var __l8 = [];
      var __forms = [];
      var ____o18 = __body;
      var __k34 = undefined;
      for (__k34 in ____o18) {
        var __v20 = ____o18[__k34];
        var __e29 = undefined;
        if (numeric63(__k34)) {
          __e29 = parseInt(__k34);
        } else {
          __e29 = __k34;
        }
        var __k35 = __e29;
        if (number63(__k35)) {
          __l8[__k35] = __v20;
        } else {
          add(__forms, ["%set", ["%get", __x45, ["quote", __k35]], __v20]);
        }
      }
      if (some63(__forms)) {
        return join(["let", __x45, ["object", join(["%array"], __l8)]], __forms, [__x45]);
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
  var __e30 = undefined;
  if (nil63(has(____id9, "cmp"))) {
    __e30 = "=";
  } else {
    __e30 = has(____id9, "cmp");
  }
  var __cmp = __e30;
  var __clauses = cut(____id9, 0);
  var __x58 = unique("x");
  var __eq = function (_) {
    return [__cmp, _, __x58];
  };
  var __cl = function (__x60) {
    var ____id10 = __x60;
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
  return ["let", __x58, __expr2, join(["if"], apply(join, map(__cl, pair(__clauses))))];
};
setenv("case", {
  _stash: true,
  macro: __case__macro
});
var __of__macro = function (x, ..._42args) {
  var ____r107 = unstash([..._42args]);
  var __x70 = destash33(x, ____r107);
  var ____id11 = ____r107;
  var __values = cut(____id11, 0);
  return join(["case", __x70, __values, true, false], props(__values));
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
      var ____x82 = object(["%list", __expr3, __comps1, __cond3]);
      ____x82.kind = "object";
      return ____x82;
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
  var __x100 = unique("x");
  return ["let", __prev, __name, ["set", __name, __value], ["let", [[__ok, __x100], ["guard", join(["%do"], __body8)]], ["set", __name, __prev], ["if", __ok, __x100, ["throw", __x100]]]];
};
setenv("let-global", {
  _stash: true,
  macro: __let_global__macro
});
var __with__macro = function (x, v, ..._42args) {
  var ____r114 = unstash([..._42args]);
  var __x112 = destash33(x, ____r114);
  var __v21 = destash33(v, ____r114);
  var ____id24 = ____r114;
  var __body9 = cut(____id24, 0);
  if (__v21 === "as") {
    return join(["%with", ["%as", __x112, hd(__body9)]], tl(__body9));
  } else {
    if (! atom63(__x112) || has(__body9, "async")) {
      return join(["%with", __x112, __v21], __body9);
    } else {
      return join(["let", [__x112, __v21]], __body9, [__x112]);
    }
  }
};
setenv("with", {
  _stash: true,
  macro: __with__macro
});
var __let_when__macro = function (x, v, ..._42args) {
  var ____r115 = unstash([..._42args]);
  var __x120 = destash33(x, ____r115);
  var __v22 = destash33(v, ____r115);
  var ____id25 = ____r115;
  var __body10 = cut(____id25, 0);
  var __y5 = unique("y");
  return ["let", __y5, __v22, ["when", ["yes", __y5], join(["let", [__x120, __y5]], __body10)]];
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
  var ____x129 = object(["setenv", ["quote", __name1]]);
  ____x129.macro = __id27;
  var __form = ["do", join(["define", __id27, __args4], __body111), ____x129];
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
  var ____x134 = object(["setenv", ["quote", __name2]]);
  ____x134.special = __id29;
  var __form1 = ["do", join(["define", __id29, __args5], __body121), join(____x134, props(__body121))];
  return __form1;
};
setenv("define-special", {
  _stash: true,
  macro: __define_special__macro
});
var __define_symbol__macro = function (name, expansion) {
  var ____x136 = object(["setenv", ["quote", name]]);
  ____x136.symbol = ["quote", expansion];
  return ____x136;
};
setenv("define-symbol", {
  _stash: true,
  macro: __define_symbol__macro
});
var __define_reader__macro = function (__x139, ..._42args) {
  var ____r119 = unstash([..._42args]);
  var ____x139 = destash33(__x139, ____r119);
  var ____id30 = ____x139;
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
  var __x146 = destash33(x, ____r120);
  var ____id32 = ____r120;
  var __body14 = cut(____id32, 0);
  setenv(__name3, {
    _stash: true,
    variable: true
  });
  if (some63(__body14)) {
    return join(["%local-function", __name3], bind42(__x146, __body14), props(__body14));
  } else {
    return join(["%local", __name3, __x146], props(__body14));
  }
};
setenv("define", {
  _stash: true,
  macro: __define__macro
});
var __define_global__macro = function (name, x, ..._42args) {
  var ____r121 = unstash([..._42args]);
  var __name4 = destash33(name, ____r121);
  var __x150 = destash33(x, ____r121);
  var ____id33 = ____r121;
  var __body15 = cut(____id33, 0);
  setenv(__name4, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body15)) {
    return join(["%global-function", __name4], bind42(__x150, __body15), props(__body15));
  } else {
    return join(["set", __name4, __x150], props(__body15));
  }
};
setenv("define-global", {
  _stash: true,
  macro: __define_global__macro
});
var __get_value__macro = function (x) {
  var ____x154 = object(["setenv", x]);
  ____x154.toplevel = true;
  return ["has", ____x154, ["quote", "value"]];
};
setenv("get-value", {
  _stash: true,
  macro: __get_value__macro
});
var __define_constant__macro = function (name, x) {
  var ____x157 = object(["setenv", ["quote", name]]);
  ____x157.toplevel = true;
  ____x157.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x157, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
  var __x170 = destash33(x, ____r125);
  var ____id34 = ____r125;
  var __body16 = cut(____id34, 0);
  var __ok1 = unique("ok");
  var __r126 = unique("r");
  var ____x171 = object(["target", ["try", __x170, join(["finally"], __body16)]]);
  ____x171.lua = join(["let", [[__ok1, __r126], ["guard", __x170]]], __body16, [["if", __ok1, __r126, ["throw", __r126]]]);
  return ____x171;
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
    var __e31 = undefined;
    if (numeric63(__k36)) {
      __e31 = parseInt(__k36);
    } else {
      __e31 = __k36;
    }
    var __k37 = __e31;
    if (! number63(__k37)) {
      var ____x190 = object(["setenv", ["quote", __k37]]);
      ____x190.value = __v23;
      add(__forms1, ____x190);
    }
  }
  return join(["with-frame"], __forms1);
};
setenv("with-values", {
  _stash: true,
  macro: __with_values__macro
});
var __with_bindings__macro = function (__x192, ..._42args) {
  var ____r127 = unstash([..._42args]);
  var ____x192 = destash33(__x192, ____r127);
  var ____id35 = ____x192;
  var __names2 = has(____id35, 0);
  var ____id36 = ____r127;
  var __body19 = cut(____id36, 0);
  var __x194 = unique("x");
  var ____x197 = object(["setenv", __x194]);
  ____x197.variable = true;
  return join(["with-frame", ["each", __x194, __names2, ____x197]], __body19);
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
      map(function (__x205) {
        var ____id39 = __x205;
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
  var ____x230 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x242 = object(["obj"]);
  ____x242.stack = [["idx", "debug", "traceback"]];
  ____x242.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x230.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x242]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x230];
};
setenv("guard", {
  _stash: true,
  macro: __guard__macro
});
var __each__macro = function (x, t, ..._42args) {
  var ____r141 = unstash([..._42args]);
  var __x253 = destash33(x, ____r141);
  var __t3 = destash33(t, ____r141);
  var ____id43 = ____r141;
  var __body24 = cut(____id43, 0);
  var __o20 = unique("o");
  var __n28 = unique("n");
  var __i34 = unique("i");
  var __e32 = undefined;
  if (atom63(__x253)) {
    __e32 = [__i34, __x253];
  } else {
    var __e33 = undefined;
    if (_35(__x253) > 1) {
      __e33 = __x253;
    } else {
      __e33 = [__i34, hd(__x253)];
    }
    __e32 = __e33;
  }
  var ____id44 = __e32;
  var __k38 = has(____id44, 0);
  var __v24 = has(____id44, 1);
  var ____x259 = object(["target", __o20]);
  ____x259.py = ["indices", __o20];
  var __e34 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e34 = __body24;
  } else {
    __e34 = [join(["let", __k38, ["if", ["numeric?", __k38], ["parseInt", __k38], __k38]], __body24)];
  }
  return ["let", [__o20, __t3, __k38, "nil"], join(["%for", ____x259, __k38], props(__body24), [join(["let", [__v24, ["%get", __o20, __k38]]], __e34)])];
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
  var __x279 = unique("x");
  var __i36 = unique("i");
  return ["let", [__x279, __t4], ["for", __i36, ["#", __x279], join(["let", [__v25, ["at", __x279, __i36]]], __body26)]];
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
    var __x288 = ____o21[____i37];
    var __e35 = undefined;
    if (numeric63(____i37)) {
      __e35 = parseInt(____i37);
    } else {
      __e35 = ____i37;
    }
    var ____i371 = __e35;
    __l10[__x288] = true;
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
  var __e36 = undefined;
  if (nil63(by)) {
    __e36 = 1;
  } else {
    __e36 = by;
  }
  return ["set", n, ["+", n, __e36]];
};
setenv("inc", {
  _stash: true,
  macro: __inc__macro
});
var __dec__macro = function (n, by) {
  var __e37 = undefined;
  if (nil63(by)) {
    __e37 = 1;
  } else {
    __e37 = by;
  }
  return ["set", n, ["-", n, __e37]];
};
setenv("dec", {
  _stash: true,
  macro: __dec__macro
});
var __with_indent__macro = function (form) {
  var __x303 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x303, form, ["dec", "indent-level"]]];
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
  var ____x333 = object(["target"]);
  ____x333.js = ["=", ["typeof", name], "\"undefined\""];
  ____x333.lua = ["=", ["idx", "_G", name], "nil"];
  ____x333.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x333;
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
  var ____x345 = object(["target"]);
  ____x345.py = ["global", __name9];
  return ["when", ["undefined?", __name9], ____x345, join(["defconst", __name9], __value2)];
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
  var ____x349 = object([__keyword]);
  ____x349.async = true;
  return join(____x349, __body31);
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
        var ____x359 = object(["target", join(["%cat", __a6], __bs5)]);
        ____x359.py = join(["%call", "cat", __a6], __bs5);
        ____x359.cmake = join(["%call", "cat", __a6], __bs5);
        return ____x359;
      } else {
        var ____x363 = object(["target", ["%cat", __a6, join(["cat"], __bs5)]]);
        ____x363.py = join(["%call", "cat", __a6], __bs5);
        ____x363.cmake = join(["%call", "cat", __a6], __bs5);
        return ____x363;
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
  var ____x442 = object(["target", join(["="], __args24)]);
  ____x442.py = join(["%is"], __args24);
  return ____x442;
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
  var __x450 = destash33(x, ____r169);
  var ____id63 = ____r169;
  var __body34 = cut(____id63, 0);
  var __e38 = undefined;
  if (atom63(__x450)) {
    __e38 = [__x450];
  } else {
    __e38 = __x450;
  }
  var ____id64 = __e38;
  var __a14 = has(____id64, 0);
  var __bs13 = cut(____id64, 1);
  var __e39 = undefined;
  if (none63(__bs13)) {
    __e39 = [["%literal"]];
  } else {
    __e39 = __bs13;
  }
  return join(["%block", __a14], __e39, __body34);
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
      return join(["with", __r170, "nil"], map(function (__x459) {
        var ____id65 = __x459;
        var __x460 = has(____id65, 0);
        var __body35 = cut(____id65, 1);
        return ["%expand-case", __x460, ["%set", __r170, join(["%do"], __body35)]];
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
  var __x467 = destash33(x, ____r172);
  var ____id66 = ____r172;
  var __cases = cut(____id66, 0);
  var __fin = ["finally"];
  var ____o22 = __cases;
  var ____i38 = undefined;
  for (____i38 in ____o22) {
    var __x469 = ____o22[____i38];
    var __e40 = undefined;
    if (numeric63(____i38)) {
      __e40 = parseInt(____i38);
    } else {
      __e40 = ____i38;
    }
    var ____i381 = __e40;
    if (hd63(__x469, "finally")) {
      __fin = __x469;
    }
  }
  var __forms3 = [];
  var ____x472 = __cases;
  var ____i39 = 0;
  while (____i39 < _35(____x472)) {
    var ____id67 = ____x472[____i39];
    var __x473 = has(____id67, 0);
    var __body36 = cut(____id67, 1);
    if (__x473 === "finally") {
    } else {
      if (__x473 === "except" && has(__body36, 1) === "as") {
        var ____id68 = __body36;
        var __kind = has(____id68, 0);
        var ___ = has(____id68, 1);
        var __name10 = has(____id68, 2);
        var __body37 = cut(____id68, 3);
        add(__forms3, join([[__x473, ["%as", __kind, __name10]]], __body37));
      } else {
        if (__x473 === "except") {
          var ____id69 = __body36;
          var __kind1 = has(____id69, 0);
          var __body38 = cut(____id69, 1);
          add(__forms3, join([[__x473, __kind1]], __body38));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i39 = ____i39 + 1;
  }
  return join(["%cases", ["try", __x467]], __forms3, [__fin]);
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
  var ____x490 = object(["target", ["do"]]);
  ____x490.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x490;
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
var reader = require("reader");
var compiler = require("compiler");
var system = require("system");
disp = function (str) {
  system.write(str);
  return system.flush();
};
pp = function (x) {
  if (list63(x) && _35(x) > 1) {
    var __c3 = "  ";
    var __nl = undefined;
    print("(");
    var ____x500 = x;
    var ____i40 = 0;
    while (____i40 < _35(____x500)) {
      var __v27 = ____x500[____i40];
      if (__nl) {
        print("");
      }
      disp(__c3);
      __nl = true;
      __c3 = "  ";
      print(str(__v27));
      ____i40 = ____i40 + 1;
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
  var __r185 = "";
  var __i41 = 0;
  while (__i41 < _35(s)) {
    var __c4 = char(s, __i41);
    if (__c4 === " ") {
      __r185 = __r185 + __c4;
    }
    __i41 = __i41 + 1;
  }
  return __r185;
};
strip_outer = function (s, lh, rh) {
  if (string_starts63(s, lh) && string_ends63(s, rh)) {
    return clip(clip(s, 0, _35(s) - _35(rh)), _35(lh));
  } else {
    return s;
  }
};
simple_id63 = function (x) {
  var ____id70 = (function () {
    try {
      return [true, reader.read_string(x)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var ____ok5 = has(____id70, 0);
  var ____v28 = has(____id70, 1);
  var __e41 = undefined;
  if (____ok5) {
    __e41 = ____v28;
  } else {
    __e41 = undefined;
  }
  var __r188 = __e41;
  if (__r188 === x) {
    return __r188;
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
  var __form4 = eval_self_form(form);
  var ____id71 = (function () {
    try {
      return [true, compiler.eval(__form4)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok6 = has(____id71, 0);
  var __v29 = has(____id71, 1);
  var __ex = has(____id71, 2);
  if (! __ok6) {
    return print_exception(__v29, __ex);
  } else {
    if (is63(__v29)) {
      return toplevel_print(__v29);
    }
  }
};
read_toplevel = function (str, more) {
  var __s2 = reader.stream(str, more);
  var ____id72 = (function () {
    try {
      return [true, reader.read_all(__s2)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var ____ok7 = has(____id72, 0);
  var ____v30 = has(____id72, 1);
  var __e42 = undefined;
  if (____ok7) {
    __e42 = ____v30;
  } else {
    __e42 = undefined;
  }
  var __x510 = __e42;
  if (__x510 === more) {
    return more;
  } else {
    if (nil63(__x510)) {
      return __x510;
    } else {
      if (one63(__x510)) {
        return hd(__x510);
      } else {
        return __x510;
      }
    }
  }
};
var rep = function (str) {
  var __v31 = _eval(read_toplevel(str));
  if (is63(__v31)) {
    return toplevel_print(__v31);
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
    var __form5 = read_toplevel(o.buf, __more);
    if (!( __form5 === __more)) {
      eval_print(__form5);
      return reset();
    }
  };
  reset();
  var ___in2 = process.stdin;
  ___in2.setEncoding("utf8");
  return ___in2.on("data", rep1);
};
read_file = function (path) {
  return system.read_file(path);
};
read_from_file = function (path) {
  var __s3 = reader.stream(read_file(path));
  return reader.read_all(__s3);
};
expand_file = function (path) {
  var __body39 = read_from_file(path);
  return compiler.expand(join(["do"], __body39));
};
compile_file = function (path) {
  var __form6 = expand_file(path);
  return compiler.compile(__form6, {
    _stash: true,
    stmt: true
  });
};
load = function (path) {
  var ____prev1 = has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value");
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = "js";
  var ____id73 = (function () {
    try {
      var ____prev2 = has(setenv("indent-level", {
        _stash: true,
        toplevel: true
      }), "value");
      setenv("indent-level", {
        _stash: true,
        toplevel: true
      }).value = 0;
      var ____id74 = (function () {
        try {
          return [true, compile_file(path)];
        }
        catch (e) {
          return [false, e];
        }
      })();
      var ____ok9 = has(____id74, 0);
      var ____x517 = has(____id74, 1);
      setenv("indent-level", {
        _stash: true,
        toplevel: true
      }).value = ____prev2;
      var __e43 = undefined;
      if (____ok9) {
        __e43 = ____x517;
      } else {
        throw ____x517;
        __e43 = undefined;
      }
      return [true, __e43];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var ____ok8 = has(____id73, 0);
  var ____x514 = has(____id73, 1);
  setenv("target", {
    _stash: true,
    toplevel: true
  }).value = ____prev1;
  var __e44 = undefined;
  if (____ok8) {
    __e44 = ____x514;
  } else {
    throw ____x514;
    __e44 = undefined;
  }
  var __code = __e44;
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
      var __expr5 = undefined;
      var __argv = system.argv;
      var __i42 = 0;
      while (__i42 < _35(__argv)) {
        var __a15 = __argv[__i42];
        if (__a15 === "-c" || (__a15 === "-o" || (__a15 === "-t" || __a15 === "-e"))) {
          if (__i42 === edge(__argv)) {
            print("missing argument for " + __a15);
          } else {
            __i42 = __i42 + 1;
            var __val1 = __argv[__i42];
            if (__a15 === "-c") {
              __input = __val1;
            } else {
              if (__a15 === "-o") {
                __output = __val1;
              } else {
                if (__a15 === "-t") {
                  __target1 = __val1;
                } else {
                  if (__a15 === "-e") {
                    __expr5 = __val1;
                  }
                }
              }
            }
          }
        } else {
          if (!( "-" === char(__a15, 0))) {
            add(__pre, __a15);
          }
        }
        __i42 = __i42 + 1;
      }
      var ____x520 = __pre;
      var ____i43 = 0;
      while (____i43 < _35(____x520)) {
        var __file = ____x520[____i43];
        run_file(__file);
        ____i43 = ____i43 + 1;
      }
      if (nil63(__input)) {
        if (__expr5) {
          return rep(__expr5);
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
