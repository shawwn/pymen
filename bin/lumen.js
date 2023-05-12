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
    var __e21 = undefined;
    if (numeric63(____i10)) {
      __e21 = parseInt(____i10);
    } else {
      __e21 = ____i10;
    }
    var ____i101 = __e21;
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
  var ____x9 = x;
  var ____i15 = 0;
  while (____i15 < _35(____x9)) {
    var __v9 = ____x9[____i15];
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
    var __x10 = ____o10[____i17];
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
                          var __e37 = undefined;
                          if (numeric63(__k28)) {
                            __e37 = parseInt(__k28);
                          } else {
                            __e37 = __k28;
                          }
                          var __k29 = __e37;
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
    var __e38 = undefined;
    if (has63(__keys, "toplevel")) {
      __e38 = hd(environment);
    } else {
      __e38 = last(environment);
    }
    var __frame = __e38;
    var __e39 = undefined;
    if (has63(__frame, __k31)) {
      __e39 = __frame[__k31];
    } else {
      __e39 = {};
    }
    var __entry = __e39;
    var ____o17 = __keys;
    var __k32 = undefined;
    for (__k32 in ____o17) {
      var __v19 = ____o17[__k32];
      var __e40 = undefined;
      if (numeric63(__k32)) {
        __e40 = parseInt(__k32);
      } else {
        __e40 = __k32;
      }
      var __k33 = __e40;
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
  var __args3 = unstash([..._42args]);
  return join(["%do"], map(function (__x40) {
    var ____id6 = __x40;
    var __lh1 = has(____id6, 0);
    var __rh1 = has(____id6, 1);
    __lh1 = macroexpand(__lh1);
    if (! atom63(__lh1) && hd(__lh1) === "has") {
      return ["%set", join(["%get"], tl(__lh1)), __rh1];
    } else {
      return ["%set", __lh1, __rh1];
    }
  }, pair(__args3)));
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
  var __body2 = unstash([..._42args]);
  if (one63(__body2) && (hd63(__body2, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_args";
  } else {
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
      var __x67 = unique("x");
      var __l10 = [];
      var __forms1 = [];
      var ____o19 = __body2;
      var __k36 = undefined;
      for (__k36 in ____o19) {
        var __v21 = ____o19[__k36];
        var __e41 = undefined;
        if (numeric63(__k36)) {
          __e41 = parseInt(__k36);
        } else {
          __e41 = __k36;
        }
        var __k37 = __e41;
        if (number63(__k37)) {
          __l10[__k37] = __v21;
        } else {
          add(__forms1, ["%set", ["%get", __x67, ["quote", __k37]], __v21]);
        }
      }
      if (some63(__forms1)) {
        return join(["let", __x67, ["object", join(["%array"], __l10)]], __forms1, [__x67]);
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
  var ____r112 = unstash([..._42args]);
  var __expr5 = destash33(expr, ____r112);
  var ____id15 = ____r112;
  var __e42 = undefined;
  if (nil63(has(____id15, "cmp"))) {
    __e42 = "=";
  } else {
    __e42 = has(____id15, "cmp");
  }
  var __cmp1 = __e42;
  var __clauses1 = cut(____id15, 0);
  var __x91 = unique("x");
  var __eq1 = function (_) {
    return [__cmp1, _, __x91];
  };
  var __cl1 = function (__x93) {
    var ____id16 = __x93;
    var __a4 = has(____id16, 0);
    var __b4 = has(____id16, 1);
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
  return ["let", __x91, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
};
setenv("case", {
  _stash: true,
  macro: __case__macro
});
var __of__macro = function (x, ..._42args) {
  var ____r116 = unstash([..._42args]);
  var __x106 = destash33(x, ____r116);
  var ____id18 = ____r116;
  var __values1 = cut(____id18, 0);
  return join(["case", __x106, __values1, true, false], props(__values1));
};
setenv("of", {
  _stash: true,
  macro: __of__macro
});
var __when__macro = function (cond, ..._42args) {
  var ____r118 = unstash([..._42args]);
  var __cond3 = destash33(cond, ____r118);
  var ____id20 = ____r118;
  var __body5 = cut(____id20, 0);
  return ["%if", __cond3, join(["%do"], __body5)];
};
setenv("when", {
  _stash: true,
  macro: __when__macro
});
var __unless__macro = function (cond, ..._42args) {
  var ____r120 = unstash([..._42args]);
  var __cond5 = destash33(cond, ____r120);
  var ____id22 = ____r120;
  var __body7 = cut(____id22, 0);
  return ["%if", ["%not", __cond5], join(["%do"], __body7)];
};
setenv("unless", {
  _stash: true,
  macro: __unless__macro
});
var __obj__macro = function (..._42args) {
  var __body10 = unstash([..._42args]);
  if (one63(__body10) && (hd63(__body10, "...") && has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py")) {
    return "_keys";
  } else {
    if (_35(__body10) > 2 && (__body10[1] === "for" && __body10[3] === "in")) {
      var ____id26 = __body10;
      var __expr8 = has(____id26, 0);
      var __body111 = cut(____id26, 1);
      var __comps3 = [];
      var __cond7 = undefined;
      while (_35(__body111) > 2 && (__body111[0] === "for" && __body111[2] === "in")) {
        var ____id27 = __body111;
        var ___for3 = has(____id27, 0);
        var __names3 = has(____id27, 1);
        var ___in3 = has(____id27, 2);
        var __l121 = has(____id27, 3);
        var __body14 = cut(____id27, 4);
        add(__comps3, [__names3, __l121]);
        __body111 = __body14;
      }
      if (hd(__body111) === "if") {
        var ____id28 = __body111;
        var ___if3 = has(____id28, 0);
        var __expr9 = has(____id28, 1);
        __cond7 = __expr9;
      }
      if (list63(__expr8) && hd63(__expr8, ",")) {
        __expr8 = join([":"], tl(__expr8));
      }
      var ____x130 = object(["%list", __expr8, __comps3, __cond7]);
      ____x130.kind = "object";
      return ____x130;
    } else {
      return join(["%object"], mapo(function (x) {
        return x;
      }, __body10));
    }
  }
};
setenv("obj", {
  _stash: true,
  macro: __obj__macro
});
var __let__macro = function (bs, ..._42args) {
  var ____r124 = unstash([..._42args]);
  var __bs11 = destash33(bs, ____r124);
  var ____id33 = ____r124;
  var __body131 = cut(____id33, 0);
  if (atom63(__bs11) || hd63(__bs11, ",")) {
    return join(["let", [__bs11, hd(__body131)]], tl(__body131));
  } else {
    if (none63(__bs11)) {
      return join(["%do"], __body131);
    } else {
      var ____id34 = __bs11;
      var __lh3 = has(____id34, 0);
      var __rh3 = has(____id34, 1);
      var __bs21 = cut(____id34, 2);
      var ____id35 = bind(__lh3, __rh3);
      var __id36 = has(____id35, 0);
      var __val1 = has(____id35, 1);
      var __bs12 = cut(____id35, 2);
      var __renames1 = [];
      if (! id_literal63(__id36)) {
        var __id121 = unique(__id36);
        __renames1 = [__id36, __id121];
        __id36 = __id121;
      }
      return ["%do", ["%local", __id36, __val1], ["let-symbol", __renames1, join(["let", join(__bs12, __bs21)], __body131)]];
    }
  }
};
setenv("let", {
  _stash: true,
  macro: __let__macro
});
var __with__macro = function (x, v, ..._42args) {
  var ____r126 = unstash([..._42args]);
  var __x159 = destash33(x, ____r126);
  var __v23 = destash33(v, ____r126);
  var ____id38 = ____r126;
  var __body15 = cut(____id38, 0);
  if (__v23 === "as") {
    return join(["%with", ["%as", __x159, hd(__body15)]], tl(__body15));
  } else {
    if (! atom63(__x159) || has(__body15, "async")) {
      return join(["%with", __x159, __v23], __body15);
    } else {
      return join(["let", [__x159, __v23]], __body15, [__x159]);
    }
  }
};
setenv("with", {
  _stash: true,
  macro: __with__macro
});
var __let_when__macro = function (x, v, ..._42args) {
  var ____r128 = unstash([..._42args]);
  var __x174 = destash33(x, ____r128);
  var __v25 = destash33(v, ____r128);
  var ____id40 = ____r128;
  var __body17 = cut(____id40, 0);
  var __y6 = unique("y");
  return ["let", __y6, __v25, ["when", ["yes", __y6], join(["let", [__x174, __y6]], __body17)]];
};
setenv("let-when", {
  _stash: true,
  macro: __let_when__macro
});
var __define_macro__macro = function (name, args, ..._42args) {
  var ____r130 = unstash([..._42args]);
  var __name1 = destash33(name, ____r130);
  var __args5 = destash33(args, ____r130);
  var ____id43 = ____r130;
  var __body19 = cut(____id43, 0);
  var __id44 = unique(__name1 + "--macro");
  var ____x188 = object(["setenv", ["quote", __name1]]);
  ____x188.macro = __id44;
  var __form1 = ["do", join(["define", __id44, __args5], __body19), ____x188];
  _eval(__form1);
  return __form1;
};
setenv("define-macro", {
  _stash: true,
  macro: __define_macro__macro
});
var __define_special__macro = function (name, args, ..._42args) {
  var ____r132 = unstash([..._42args]);
  var __name3 = destash33(name, ____r132);
  var __args7 = destash33(args, ____r132);
  var ____id47 = ____r132;
  var __body21 = cut(____id47, 0);
  var __id48 = unique(__name3 + "--special");
  var ____x198 = object(["setenv", ["quote", __name3]]);
  ____x198.special = __id48;
  var __form3 = ["do", join(["define", __id48, __args7], __body21), join(____x198, props(__body21))];
  _eval(__form3);
  return __form3;
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
  var ____x203 = object(["setenv", ["quote", name]]);
  ____x203.symbol = ["quote", expansion];
  return ____x203;
};
setenv("define-symbol", {
  _stash: true,
  macro: __define_symbol__macro
});
var __define_reader__macro = function (__x212, ..._42args) {
  var ____r136 = unstash([..._42args]);
  var ____x212 = destash33(__x212, ____r136);
  var ____id51 = ____x212;
  var __char1 = has(____id51, 0);
  var __s2 = has(____id51, 1);
  var ____id52 = ____r136;
  var __body23 = cut(____id52, 0);
  return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body23)];
};
setenv("define-reader", {
  _stash: true,
  macro: __define_reader__macro
});
var __define__macro = function (name, x, ..._42args) {
  var ____r138 = unstash([..._42args]);
  var __name5 = destash33(name, ____r138);
  var __x223 = destash33(x, ____r138);
  var ____id54 = ____r138;
  var __body25 = cut(____id54, 0);
  setenv(__name5, {
    _stash: true,
    variable: true
  });
  if (some63(__body25)) {
    return join(["%local-function", __name5], bind42(__x223, __body25), props(__body25));
  } else {
    return join(["%local", __name5, __x223], props(__body25));
  }
};
setenv("define", {
  _stash: true,
  macro: __define__macro
});
var __define_global__macro = function (name, x, ..._42args) {
  var ____r140 = unstash([..._42args]);
  var __name7 = destash33(name, ____r140);
  var __x231 = destash33(x, ____r140);
  var ____id56 = ____r140;
  var __body27 = cut(____id56, 0);
  setenv(__name7, {
    _stash: true,
    toplevel: true,
    variable: true
  });
  if (some63(__body27)) {
    return join(["%global-function", __name7], bind42(__x231, __body27), props(__body27));
  } else {
    return join(["set", __name7, __x231], props(__body27));
  }
};
setenv("define-global", {
  _stash: true,
  macro: __define_global__macro
});
var __get_value__macro = function (x) {
  var ____x238 = object(["setenv", x]);
  ____x238.toplevel = true;
  return ["has", ____x238, ["quote", "value"]];
};
setenv("get-value", {
  _stash: true,
  macro: __get_value__macro
});
var __define_constant__macro = function (name, x) {
  var ____x249 = object(["setenv", ["quote", name]]);
  ____x249.toplevel = true;
  ____x249.value = either(x, ["get-value", ["quote", name]]);
  return ["%do", ____x249, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
  var ____r149 = unstash([..._42args]);
  var __x279 = destash33(x, ____r149);
  var ____id58 = ____r149;
  var __body29 = cut(____id58, 0);
  var __ok1 = unique("ok");
  var __r150 = unique("r");
  var ____x280 = object(["target", ["try", __x279, join(["finally"], __body29)]]);
  ____x280.lua = join(["let", [[__ok1, __r150], ["guard", __x279]]], __body29, [["if", __ok1, __r150, ["throw", __r150]]]);
  return ____x280;
};
setenv("after", {
  _stash: true,
  macro: __after__macro
});
var __with_frame__macro = function (..._42args) {
  var __body31 = unstash([..._42args]);
  return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body31), ["drop", "environment"]]];
};
setenv("with-frame", {
  _stash: true,
  macro: __with_frame__macro
});
var __with_values__macro = function (..._42args) {
  var __body33 = unstash([..._42args]);
  var __forms3 = [];
  var ____o21 = __body33;
  var __k40 = undefined;
  for (__k40 in ____o21) {
    var __v27 = ____o21[__k40];
    var __e43 = undefined;
    if (numeric63(__k40)) {
      __e43 = parseInt(__k40);
    } else {
      __e43 = __k40;
    }
    var __k41 = __e43;
    if (! number63(__k41)) {
      var ____x310 = object(["setenv", ["quote", __k41]]);
      ____x310.value = __v27;
      add(__forms3, ____x310);
    }
  }
  return join(["with-frame"], __forms3);
};
setenv("with-values", {
  _stash: true,
  macro: __with_values__macro
});
var __with_bindings__macro = function (__x318, ..._42args) {
  var ____r152 = unstash([..._42args]);
  var ____x318 = destash33(__x318, ____r152);
  var ____id61 = ____x318;
  var __names5 = has(____id61, 0);
  var ____id62 = ____r152;
  var __body35 = cut(____id62, 0);
  var __x320 = unique("x");
  var ____x323 = object(["setenv", __x320]);
  ____x323.variable = true;
  return join(["with-frame", ["each", __x320, __names5, ____x323]], __body35);
};
setenv("with-bindings", {
  _stash: true,
  macro: __with_bindings__macro
});
var __let_macro__macro = function (definitions, ..._42args) {
  var ____r157 = unstash([..._42args]);
  var __definitions1 = destash33(definitions, ____r157);
  var ____id64 = ____r157;
  var __body37 = cut(____id64, 0);
  add(environment, {});
  var ____r159 = undefined;
  try{
    map(function (m) {
      return macroexpand(join(["define-macro"], m));
    }, __definitions1);
    ____r159 = join(["%do"], macroexpand(__body37));
  }
  finally{
    drop(environment);
  }
  return ____r159;
};
setenv("let-macro", {
  _stash: true,
  macro: __let_macro__macro
});
var __let_symbol__macro = function (expansions, ..._42args) {
  var ____r165 = unstash([..._42args]);
  var __expansions1 = destash33(expansions, ____r165);
  var ____id67 = ____r165;
  var __body39 = cut(____id67, 0);
  add(environment, {});
  var ____r167 = undefined;
  try{
    map(function (__x335) {
      var ____id68 = __x335;
      var __name9 = has(____id68, 0);
      var __exp1 = has(____id68, 1);
      return macroexpand(["define-symbol", __name9, __exp1]);
    }, pair(__expansions1));
    ____r167 = join(["%do"], macroexpand(__body39));
  }
  finally{
    drop(environment);
  }
  return ____r167;
};
setenv("let-symbol", {
  _stash: true,
  macro: __let_symbol__macro
});
var __let_unique__macro = function (names, ..._42args) {
  var ____r171 = unstash([..._42args]);
  var __names7 = destash33(names, ____r171);
  var ____id70 = ____r171;
  var __body41 = cut(____id70, 0);
  var __bs3 = map(function (n) {
    return [n, ["unique", ["quote", n]]];
  }, __names7);
  return join(["let", apply(join, __bs3)], __body41);
};
setenv("let-unique", {
  _stash: true,
  macro: __let_unique__macro
});
var __fn__macro = function (args, ..._42args) {
  var ____r174 = unstash([..._42args]);
  var __args9 = destash33(args, ____r174);
  var ____id72 = ____r174;
  var __body43 = cut(____id72, 0);
  return join(["%function"], bind42(__args9, __body43), props(__body43));
};
setenv("fn", {
  _stash: true,
  macro: __fn__macro
});
var __apply__macro = function (f, ..._42args) {
  var ____r176 = unstash([..._42args]);
  var __f3 = destash33(f, ____r176);
  var ____id74 = ____r176;
  var __args111 = cut(____id74, 0);
  if (_35(__args111) > 1) {
    return ["%call", "apply", __f3, ["join", join(["list"], almost(__args111)), last(__args111), join(["list"], props(__args111))]];
  } else {
    if (props63(__args111)) {
      return ["%call", "apply", __f3, join(["join"], __args111, [join(["list"], props(__args111))])];
    } else {
      return join(["%call", "apply", __f3], __args111);
    }
  }
};
setenv("apply", {
  _stash: true,
  macro: __apply__macro
});
var __guard__macro = function (expr) {
  var ____x402 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
  var ____x414 = object(["obj"]);
  ____x414.stack = [["idx", "debug", "traceback"]];
  ____x414.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
  ____x402.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x414]]]];
  return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x402];
};
setenv("guard", {
  _stash: true,
  macro: __guard__macro
});
var __each__macro = function (x, t, ..._42args) {
  var ____r180 = unstash([..._42args]);
  var __x443 = destash33(x, ____r180);
  var __t4 = destash33(t, ____r180);
  var ____id77 = ____r180;
  var __body45 = cut(____id77, 0);
  var __o23 = unique("o");
  var __n31 = unique("n");
  var __i37 = unique("i");
  var __e44 = undefined;
  if (atom63(__x443)) {
    __e44 = [__i37, __x443];
  } else {
    var __e45 = undefined;
    if (_35(__x443) > 1) {
      __e45 = __x443;
    } else {
      __e45 = [__i37, hd(__x443)];
    }
    __e44 = __e45;
  }
  var ____id78 = __e44;
  var __k43 = has(____id78, 0);
  var __v29 = has(____id78, 1);
  var ____x449 = object(["target", __o23]);
  ____x449.py = ["indices", __o23];
  var __e46 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua" || has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    __e46 = __body45;
  } else {
    __e46 = [join(["let", __k43, ["if", ["numeric?", __k43], ["parseInt", __k43], __k43]], __body45)];
  }
  return ["let", [__o23, __t4, __k43, "nil"], join(["%for", ____x449, __k43], props(__body45), [join(["let", [__v29, ["%get", __o23, __k43]]], __e46)])];
};
setenv("each", {
  _stash: true,
  macro: __each__macro
});
var __for__macro = function (i, to, ..._42args) {
  var ____r182 = unstash([..._42args]);
  var __i39 = destash33(i, ____r182);
  var __to1 = destash33(to, ____r182);
  var ____id80 = ____r182;
  var __body47 = cut(____id80, 0);
  if (__to1 === "in") {
    return join(["%for", hd(__body47), __i39, join(["%do"], tl(__body47))], props(__body47));
  } else {
    return ["let", __i39, 0, join(["while", ["<", __i39, __to1]], __body47, [["inc", __i39]])];
  }
};
setenv("for", {
  _stash: true,
  macro: __for__macro
});
var __step__macro = function (v, t, ..._42args) {
  var ____r184 = unstash([..._42args]);
  var __v31 = destash33(v, ____r184);
  var __t6 = destash33(t, ____r184);
  var ____id82 = ____r184;
  var __body49 = cut(____id82, 0);
  var __x486 = unique("x");
  var __i41 = unique("i");
  return ["let", [__x486, __t6], ["for", __i41, ["#", __x486], join(["let", [__v31, ["at", __x486, __i41]]], __body49)]];
};
setenv("step", {
  _stash: true,
  macro: __step__macro
});
var __set_of__macro = function (..._42args) {
  var __xs13 = unstash([..._42args]);
  var __l14 = {};
  var ____o25 = __xs13;
  var ____i43 = undefined;
  for (____i43 in ____o25) {
    var __x498 = ____o25[____i43];
    var __e47 = undefined;
    if (numeric63(____i43)) {
      __e47 = parseInt(____i43);
    } else {
      __e47 = ____i43;
    }
    var ____i431 = __e47;
    __l14[__x498] = true;
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
  var ____r190 = unstash([..._42args]);
  var __a6 = destash33(a, ____r190);
  var ____id84 = ____r190;
  var __bs5 = cut(____id84, 0);
  return ["set", __a6, join(["join", __a6], __bs5)];
};
setenv("join!", {
  _stash: true,
  macro: __join33__macro
});
var __cat33__macro = function (a, ..._42args) {
  var ____r192 = unstash([..._42args]);
  var __a8 = destash33(a, ____r192);
  var ____id86 = ____r192;
  var __bs7 = cut(____id86, 0);
  return ["set", __a8, join(["cat", __a8], __bs7)];
};
setenv("cat!", {
  _stash: true,
  macro: __cat33__macro
});
var __inc__macro = function (n, by) {
  var __e48 = undefined;
  if (nil63(by)) {
    __e48 = 1;
  } else {
    __e48 = by;
  }
  return ["set", n, ["+", n, __e48]];
};
setenv("inc", {
  _stash: true,
  macro: __inc__macro
});
var __dec__macro = function (n, by) {
  var __e49 = undefined;
  if (nil63(by)) {
    __e49 = 1;
  } else {
    __e49 = by;
  }
  return ["set", n, ["-", n, __e49]];
};
setenv("dec", {
  _stash: true,
  macro: __dec__macro
});
var __with_indent__macro = function (form) {
  var __x531 = unique("x");
  return ["%do", ["inc", "indent-level"], ["with", __x531, form, ["dec", "indent-level"]]];
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
  var __body51 = unstash([..._42args]);
  return _eval(join(["%do"], __body51));
};
setenv("when-compiling", {
  _stash: true,
  macro: __when_compiling__macro
});
var __during_compilation__macro = function (..._42args) {
  var __body53 = unstash([..._42args]);
  var __form5 = join(["%do"], __body53);
  _eval(__form5);
  return __form5;
};
setenv("during-compilation", {
  _stash: true,
  macro: __during_compilation__macro
});
var __def__macro = function (name, ..._42args) {
  var ____r202 = unstash([..._42args]);
  var __name11 = destash33(name, ____r202);
  var ____id88 = ____r202;
  var __body55 = cut(____id88, 0);
  return join(["define-global", __name11], __body55);
};
setenv("def", {
  _stash: true,
  macro: __def__macro
});
var __mac__macro = function (name, ..._42args) {
  var ____r204 = unstash([..._42args]);
  var __name13 = destash33(name, ____r204);
  var ____id90 = ____r204;
  var __body57 = cut(____id90, 0);
  return join(["define-macro", __name13], __body57);
};
setenv("mac", {
  _stash: true,
  macro: __mac__macro
});
var __defconst__macro = function (name, ..._42args) {
  var ____r206 = unstash([..._42args]);
  var __name15 = destash33(name, ____r206);
  var ____id92 = ____r206;
  var __value1 = cut(____id92, 0);
  return join(["def", __name15], __value1);
};
setenv("defconst", {
  _stash: true,
  macro: __defconst__macro
});
var __undefined63__macro = function (name) {
  var ____x595 = object(["target"]);
  ____x595.js = ["=", ["typeof", name], "\"undefined\""];
  ____x595.lua = ["=", ["idx", "_G", name], "nil"];
  ____x595.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
  return ____x595;
};
setenv("undefined?", {
  _stash: true,
  macro: __undefined63__macro
});
var __defvar__macro = function (name, ..._42args) {
  var ____r210 = unstash([..._42args]);
  var __name17 = destash33(name, ____r210);
  var ____id94 = ____r210;
  var __value3 = cut(____id94, 0);
  var ____x613 = object(["target"]);
  ____x613.py = ["global", __name17];
  return ["when", ["undefined?", __name17], ____x613, join(["defconst", __name17], __value3)];
};
setenv("defvar", {
  _stash: true,
  macro: __defvar__macro
});
var __async__macro = function (keyword, ..._42args) {
  var ____r212 = unstash([..._42args]);
  var __keyword1 = destash33(keyword, ____r212);
  var ____id96 = ____r212;
  var __body59 = cut(____id96, 0);
  var ____x619 = object([__keyword1]);
  ____x619.async = true;
  return join(____x619, __body59);
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
  var ____r218 = unstash([..._42args]);
  var __a10 = destash33(a, ____r218);
  var ____id98 = ____r218;
  var __bs9 = cut(____id98, 0);
  if (nil63(__a10)) {
    return "";
  } else {
    if (none63(__bs9)) {
      return __a10;
    } else {
      if (one63(__bs9)) {
        var ____x645 = object(["target", join(["%cat", __a10], __bs9)]);
        ____x645.py = join(["%call", "cat", __a10], __bs9);
        return ____x645;
      } else {
        var ____x648 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]]);
        ____x648.py = join(["%call", "cat", __a10], __bs9);
        return ____x648;
      }
    }
  }
};
setenv("cat", {
  _stash: true,
  macro: __cat__macro
});
var ___43__macro = function (..._42args) {
  var __args13 = unstash([..._42args]);
  if (none63(__args13)) {
    return 0;
  } else {
    if (one63(__args13)) {
      return hd(__args13);
    } else {
      return join(["%add"], __args13);
    }
  }
};
setenv("+", {
  _stash: true,
  macro: ___43__macro
});
var _____macro = function (..._42args) {
  var __args15 = unstash([..._42args]);
  if (none63(__args15)) {
    return 0;
  } else {
    if (one63(__args15)) {
      return ["%unm", hd(__args15)];
    } else {
      return join(["%sub"], __args15);
    }
  }
};
setenv("-", {
  _stash: true,
  macro: _____macro
});
var ___42__macro = function (..._42args) {
  var __args17 = unstash([..._42args]);
  if (none63(__args17)) {
    return 1;
  } else {
    if (one63(__args17)) {
      return hd(__args17);
    } else {
      return join(["%mul"], __args17);
    }
  }
};
setenv("*", {
  _stash: true,
  macro: ___42__macro
});
var ___47__macro = function (..._42args) {
  var __args19 = unstash([..._42args]);
  if (none63(__args19)) {
    return 1;
  } else {
    if (one63(__args19)) {
      return hd(__args19);
    } else {
      return join(["%div"], __args19);
    }
  }
};
setenv("/", {
  _stash: true,
  macro: ___47__macro
});
var ___4747__macro = function (..._42args) {
  var __args21 = unstash([..._42args]);
  if (none63(__args21)) {
    return 1;
  } else {
    if (one63(__args21)) {
      return hd(__args21);
    } else {
      return join(["%idiv"], __args21);
    }
  }
};
setenv("//", {
  _stash: true,
  macro: ___4747__macro
});
var ___37__macro = function (..._42args) {
  var __args23 = unstash([..._42args]);
  if (none63(__args23)) {
    return 0;
  } else {
    if (one63(__args23)) {
      return hd(__args23);
    } else {
      return join(["%mod"], __args23);
    }
  }
};
setenv("%", {
  _stash: true,
  macro: ___37__macro
});
var ___60__macro = function (a, ..._42args) {
  var ____r220 = unstash([..._42args]);
  var __a12 = destash33(a, ____r220);
  var ____id100 = ____r220;
  var __bs111 = cut(____id100, 0);
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
  var ____r222 = unstash([..._42args]);
  var __a14 = destash33(a, ____r222);
  var ____id102 = ____r222;
  var __bs13 = cut(____id102, 0);
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
  var ____r224 = unstash([..._42args]);
  var __a16 = destash33(a, ____r224);
  var ____id104 = ____r224;
  var __bs15 = cut(____id104, 0);
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
  var ____r226 = unstash([..._42args]);
  var __a18 = destash33(a, ____r226);
  var ____id106 = ____r226;
  var __bs17 = cut(____id106, 0);
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
  var ____r228 = unstash([..._42args]);
  var __a20 = destash33(a, ____r228);
  var ____id108 = ____r228;
  var __bs19 = cut(____id108, 0);
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
  var __args25 = unstash([..._42args]);
  if (none63(__args25)) {
    return false;
  } else {
    if (one63(__args25)) {
      return join(["%not"], __args25);
    } else {
      return ["%and", ["%not", hd(__args25)], join(["not"], tl(__args25))];
    }
  }
};
setenv("not", {
  _stash: true,
  macro: __not__macro
});
var __and__macro = function (a, ..._42args) {
  var ____r230 = unstash([..._42args]);
  var __a22 = destash33(a, ____r230);
  var ____id110 = ____r230;
  var __bs211 = cut(____id110, 0);
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
  var ____r232 = unstash([..._42args]);
  var __a24 = destash33(a, ____r232);
  var ____id112 = ____r232;
  var __bs23 = cut(____id112, 0);
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
  var __args27 = unstash([..._42args]);
  return join(["%break"], __args27);
};
setenv("break", {
  _stash: true,
  macro: __break__macro
});
var __return__macro = function (..._42args) {
  var __args29 = unstash([..._42args]);
  return join(["%return"], __args29);
};
setenv("return", {
  _stash: true,
  macro: __return__macro
});
var __while__macro = function (c, ..._42args) {
  var ____r234 = unstash([..._42args]);
  var __c3 = destash33(c, ____r234);
  var ____id114 = ____r234;
  var __body61 = cut(____id114, 0);
  return join(["%while", __c3], __body61);
};
setenv("while", {
  _stash: true,
  macro: __while__macro
});
var __do__macro = function (..._42args) {
  var __body63 = unstash([..._42args]);
  return join(["%do"], __body63);
};
setenv("do", {
  _stash: true,
  macro: __do__macro
});
var __get__macro = function (..._42args) {
  var __args31 = unstash([..._42args]);
  return join(["%get"], __args31);
};
setenv("get", {
  _stash: true,
  macro: __get__macro
});
var __idx__macro = function (..._42args) {
  var __args33 = unstash([..._42args]);
  return join(["%idx"], __args33);
};
setenv("idx", {
  _stash: true,
  macro: __idx__macro
});
var __new__macro = function (..._42args) {
  var __args35 = unstash([..._42args]);
  return join(["%new"], __args35);
};
setenv("new", {
  _stash: true,
  macro: __new__macro
});
var __typeof__macro = function (..._42args) {
  var __args37 = unstash([..._42args]);
  return join(["%typeof"], __args37);
};
setenv("typeof", {
  _stash: true,
  macro: __typeof__macro
});
var __error__macro = function (..._42args) {
  var __args39 = unstash([..._42args]);
  return join(["%error"], __args39);
};
setenv("error", {
  _stash: true,
  macro: __error__macro
});
var __throw__macro = function (..._42args) {
  var __args41 = unstash([..._42args]);
  return join(["%throw"], __args41);
};
setenv("throw", {
  _stash: true,
  macro: __throw__macro
});
var __raise__macro = function (..._42args) {
  var __args43 = unstash([..._42args]);
  return join(["%throw"], __args43);
};
setenv("raise", {
  _stash: true,
  macro: __raise__macro
});
var __is__macro = function (..._42args) {
  var __args45 = unstash([..._42args]);
  var ____x803 = object(["target", join(["="], __args45)]);
  ____x803.py = join(["%is"], __args45);
  return ____x803;
};
setenv("is", {
  _stash: true,
  macro: __is__macro
});
var __in__macro = function (..._42args) {
  var __args47 = unstash([..._42args]);
  return join(["%in"], __args47);
};
setenv("in", {
  _stash: true,
  macro: __in__macro
});
var __as__macro = function (..._42args) {
  var __args49 = unstash([..._42args]);
  return join(["%as"], __args49);
};
setenv("as", {
  _stash: true,
  macro: __as__macro
});
var ___37expand_case__macro = function (x, ..._42args) {
  var ____r236 = unstash([..._42args]);
  var __x821 = destash33(x, ____r236);
  var ____id117 = ____r236;
  var __body65 = cut(____id117, 0);
  var __e50 = undefined;
  if (atom63(__x821)) {
    __e50 = [__x821];
  } else {
    __e50 = __x821;
  }
  var ____id118 = __e50;
  var __a26 = has(____id118, 0);
  var __bs25 = cut(____id118, 1);
  var __e51 = undefined;
  if (none63(__bs25)) {
    __e51 = [["%literal"]];
  } else {
    __e51 = __bs25;
  }
  return join(["%block", __a26], __e51, __body65);
};
setenv("%expand-case", {
  _stash: true,
  macro: ___37expand_case__macro
});
var ___37cases__macro = function (..._42args) {
  var __args51 = unstash([..._42args]);
  if (none63(__args51)) {
    return ["do"];
  } else {
    if (one63(__args51)) {
      return join(["%expand-case"], hd(__args51));
    } else {
      var __r239 = unique("r");
      return join(["with", __r239, "nil"], map(function (__x841) {
        var ____id120 = __x841;
        var __x842 = has(____id120, 0);
        var __body67 = cut(____id120, 1);
        return ["%expand-case", __x842, ["%set", __r239, join(["%do"], __body67)]];
      }, almost(__args51)), [join(["%expand-case"], last(__args51))]);
    }
  }
};
setenv("%cases", {
  _stash: true,
  macro: ___37cases__macro
});
var __try__macro = function (x, ..._42args) {
  var ____r242 = unstash([..._42args]);
  var __x863 = destash33(x, ____r242);
  var ____id125 = ____r242;
  var __cases1 = cut(____id125, 0);
  var __fin1 = ["finally"];
  var ____o27 = __cases1;
  var ____i46 = undefined;
  for (____i46 in ____o27) {
    var __x865 = ____o27[____i46];
    var __e52 = undefined;
    if (numeric63(____i46)) {
      __e52 = parseInt(____i46);
    } else {
      __e52 = ____i46;
    }
    var ____i461 = __e52;
    if (hd63(__x865, "finally")) {
      __fin1 = __x865;
    }
  }
  var __forms7 = [];
  var ____x868 = __cases1;
  var ____i47 = 0;
  while (____i47 < _35(____x868)) {
    var ____id126 = ____x868[____i47];
    var __x869 = has(____id126, 0);
    var __body71 = cut(____id126, 1);
    if (__x869 === "finally") {
    } else {
      if (__x869 === "except" && has(__body71, 1) === "as") {
        var ____id127 = __body71;
        var __kind2 = has(____id127, 0);
        var ___1 = has(____id127, 1);
        var __name19 = has(____id127, 2);
        var __body72 = cut(____id127, 3);
        add(__forms7, join([[__x869, ["%as", __kind2, __name19]]], __body72));
      } else {
        if (__x869 === "except") {
          var ____id128 = __body71;
          var __kind3 = has(____id128, 0);
          var __body73 = cut(____id128, 1);
          add(__forms7, join([[__x869, __kind3]], __body73));
        } else {
          throw new Error("Unknown try clause");
        }
      }
    }
    ____i47 = ____i47 + 1;
  }
  return join(["%cases", ["try", __x863]], __forms7, [__fin1]);
};
setenv("try", {
  _stash: true,
  macro: __try__macro
});
var __errsafe__macro = function (x, _else) {
  if (nil63(_else)) {
    _else = "nil";
  }
  var __ok7 = unique("ok");
  var __v33 = unique("v");
  return ["let", [[__ok7, __v33], ["guard", x]], ["if", __ok7, __v33, _else]];
};
setenv("errsafe", {
  _stash: true,
  macro: __errsafe__macro
});
var __dbg__macro = function () {
  var ____x892 = object(["target", ["do"]]);
  ____x892.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
  return ____x892;
};
setenv("dbg", {
  _stash: true,
  macro: __dbg__macro
});
var __see__macro = function (form) {
  var __form7 = expand(form);
  print(compile(expand(["%set", "lumen-result", __form7])));
  return __form7;
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
    var ____x902 = x;
    var ____i48 = 0;
    while (____i48 < _35(____x902)) {
      var __v34 = ____x902[____i48];
      if (__nl) {
        print("");
      }
      disp(__c4);
      __nl = true;
      __c4 = "  ";
      print(str(__v34));
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
  var __r256 = "";
  var __i49 = 0;
  while (__i49 < _35(s)) {
    var __c5 = char(s, __i49);
    if (__c5 === " ") {
      __r256 = __r256 + __c5;
    }
    __i49 = __i49 + 1;
  }
  return __r256;
};
strip_outer = function (s, lh, rh) {
  if (string_starts63(s, lh) && string_ends63(s, rh)) {
    return clip(clip(s, 0, _35(s) - _35(rh)), _35(lh));
  } else {
    return s;
  }
};
simple_id63 = function (x) {
  var ____id129 = (function () {
    try {
      return [true, reader.read_string(x)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var ____ok8 = has(____id129, 0);
  var ____v35 = has(____id129, 1);
  var __e53 = undefined;
  if (____ok8) {
    __e53 = ____v35;
  } else {
    __e53 = undefined;
  }
  var __r259 = __e53;
  if (__r259 === x) {
    return __r259;
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
  var ____id130 = (function () {
    try {
      return [true, compiler.eval(__form8)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok9 = has(____id130, 0);
  var __v36 = has(____id130, 1);
  var __ex = has(____id130, 2);
  if (! __ok9) {
    return print_exception(__v36, __ex);
  } else {
    if (is63(__v36)) {
      return toplevel_print(__v36);
    }
  }
};
read_toplevel = function (str, more) {
  var __s3 = reader.stream(str, more);
  var ____id131 = (function () {
    try {
      return [true, reader.read_all(__s3)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var ____ok10 = has(____id131, 0);
  var ____v37 = has(____id131, 1);
  var __e54 = undefined;
  if (____ok10) {
    __e54 = ____v37;
  } else {
    __e54 = undefined;
  }
  var __x914 = __e54;
  if (__x914 === more) {
    return more;
  } else {
    if (nil63(__x914)) {
      return __x914;
    } else {
      if (one63(__x914)) {
        return hd(__x914);
      } else {
        return __x914;
      }
    }
  }
};
var rep = function (str) {
  var __v38 = _eval(read_toplevel(str));
  if (is63(__v38)) {
    return toplevel_print(__v38);
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
      var ____x919 = __pre;
      var ____i51 = 0;
      while (____i51 < _35(____x919)) {
        var __file = ____x919[____i51];
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
