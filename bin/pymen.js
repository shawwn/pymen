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
      var __e52 = undefined;
      if (numeric63(__k)) {
        __e52 = parseInt(__k);
      } else {
        __e52 = __k;
      }
      var __k1 = __e52;
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
      var __e53 = undefined;
      if (numeric63(__k2)) {
        __e53 = parseInt(__k2);
      } else {
        __e53 = __k2;
      }
      var __k3 = __e53;
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
    var __e54 = undefined;
    if (numeric63(__k4)) {
      __e54 = parseInt(__k4);
    } else {
      __e54 = __k4;
    }
    var __k5 = __e54;
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
  var __e55 = undefined;
  if (nil63(from) || from < 0) {
    __e55 = 0;
  } else {
    __e55 = from;
  }
  var __i3 = __e55;
  var __n4 = _35(x);
  var __e56 = undefined;
  if (nil63(upto) || upto > __n4) {
    __e56 = __n4;
  } else {
    __e56 = upto;
  }
  var __upto1 = __e56;
  while (__i3 < __upto1) {
    __l2[__j] = x[__i3];
    __i3 = __i3 + 1;
    __j = __j + 1;
  }
  var ____o3 = x;
  var __k6 = undefined;
  for (__k6 in ____o3) {
    var __v3 = ____o3[__k6];
    var __e57 = undefined;
    if (numeric63(__k6)) {
      __e57 = parseInt(__k6);
    } else {
      __e57 = __k6;
    }
    var __k7 = __e57;
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
    var __e58 = undefined;
    if (numeric63(__k8)) {
      __e58 = parseInt(__k8);
    } else {
      __e58 = __k8;
    }
    var __k9 = __e58;
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
      var __e59 = undefined;
      if (numeric63(__k10)) {
        __e59 = parseInt(__k10);
      } else {
        __e59 = __k10;
      }
      var __k11 = __e59;
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
        var __e60 = undefined;
        if (numeric63(__k12)) {
          __e60 = parseInt(__k12);
        } else {
          __e60 = __k12;
        }
        var __k13 = __e60;
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
    var __x4 = ____o7[____i10];
    var __e61 = undefined;
    if (numeric63(____i10)) {
      __e61 = parseInt(____i10);
    } else {
      __e61 = ____i10;
    }
    var ____i101 = __e61;
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
    var __e62 = undefined;
    if (numeric63(__k14)) {
      __e62 = parseInt(__k14);
    } else {
      __e62 = __k14;
    }
    var __k15 = __e62;
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
    var __e63 = undefined;
    if (f) {
      __e63 = f(__v9);
    } else {
      __e63 = __v9;
    }
    var __y4 = __e63;
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
    var __e64 = undefined;
    if (numeric63(__k16)) {
      __e64 = parseInt(__k16);
    } else {
      __e64 = __k16;
    }
    var __k17 = __e64;
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
    var __e65 = undefined;
    if (numeric63(____i17)) {
      __e65 = parseInt(____i17);
    } else {
      __e65 = ____i17;
    }
    var ____i171 = __e65;
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
      var __e66 = undefined;
      if (numeric63(__k18)) {
        __e66 = parseInt(__k18);
      } else {
        __e66 = __k18;
      }
      var __k19 = __e66;
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
        var __e68 = undefined;
        if (numeric63(__k20)) {
          __e68 = parseInt(__k20);
        } else {
          __e68 = __k20;
        }
        var __k21 = __e68;
        if (!( __k21 === "_stash")) {
          __args1[__k21] = __v12;
        }
      }
      if (params) {
        var ____o13 = params;
        var __k22 = undefined;
        for (__k22 in ____o13) {
          var __v13 = ____o13[__k22];
          var __e69 = undefined;
          if (numeric63(__k22)) {
            __e69 = parseInt(__k22);
          } else {
            __e69 = __k22;
          }
          var __k23 = __e69;
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
          var __e67 = undefined;
          if (numeric63(__k24)) {
            __e67 = parseInt(__k24);
          } else {
            __e67 = __k24;
          }
          var __k25 = __e67;
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
      var __e70 = undefined;
      if (numeric63(__k26)) {
        __e70 = parseInt(__k26);
      } else {
        __e70 = __k26;
      }
      var __k27 = __e70;
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
  var __e71 = undefined;
  if (is63(pos)) {
    __e71 = clip(str, pos);
  } else {
    __e71 = str;
  }
  var __str = __e71;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_starts63 = function (str, x, pos) {
  var __e72 = undefined;
  if (is63(pos)) {
    __e72 = clip(str, pos);
  } else {
    __e72 = str;
  }
  var __str1 = __e72;
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
escape = function (s) {
  if (nil63(search(s, "\n")) && (nil63(search(s, "\r")) && (nil63(search(s, "\"")) && nil63(search(s, "\\"))))) {
    return "\"" + (s + "\"");
  } else {
    var __s1 = "\"";
    var __i27 = 0;
    while (__i27 < _35(s)) {
      var __c1 = char(s, __i27);
      var __e73 = undefined;
      if (__c1 === "\n") {
        __e73 = "\\n";
      } else {
        var __e74 = undefined;
        if (__c1 === "\r") {
          __e74 = "\\r";
        } else {
          var __e75 = undefined;
          if (__c1 === "\"") {
            __e75 = "\\\"";
          } else {
            var __e76 = undefined;
            if (__c1 === "\\") {
              __e76 = "\\\\";
            } else {
              __e76 = __c1;
            }
            __e75 = __e76;
          }
          __e74 = __e75;
        }
        __e73 = __e74;
      }
      var __c11 = __e73;
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
                          var __e77 = undefined;
                          if (numeric63(__k28)) {
                            __e77 = parseInt(__k28);
                          } else {
                            __e77 = __k28;
                          }
                          var __k29 = __e77;
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
  var ____r92 = unstash([..._42args]);
  var __f1 = destash33(f, ____r92);
  var ____id3 = ____r92;
  var __args12 = cut(____id3, 0);
  return apply(__f1, __args12);
};
setenv = function (k, ..._42args) {
  var ____r93 = unstash([..._42args]);
  var __k31 = destash33(k, ____r93);
  var ____id4 = ____r93;
  var __keys = cut(____id4, 0);
  if (string63(__k31)) {
    var __e78 = undefined;
    if (has63(__keys, "toplevel")) {
      __e78 = hd(environment);
    } else {
      __e78 = last(environment);
    }
    var __frame = __e78;
    var __e79 = undefined;
    if (has63(__frame, __k31)) {
      __e79 = __frame[__k31];
    } else {
      __e79 = {};
    }
    var __entry = __e79;
    var ____o17 = __keys;
    var __k32 = undefined;
    for (__k32 in ____o17) {
      var __v19 = ____o17[__k32];
      var __e80 = undefined;
      if (numeric63(__k32)) {
        __e80 = parseInt(__k32);
      } else {
        __e80 = __k32;
      }
      var __k33 = __e80;
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
  macro: function (..._42args) {
    var __args3 = unstash([..._42args]);
    return join(["%do"], map(function (__x41) {
      var ____id6 = __x41;
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
  macro: function (..._42args) {
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
        var __x68 = unique("x");
        var __l10 = [];
        var __forms1 = [];
        var ____o19 = __body2;
        var __k36 = undefined;
        for (__k36 in ____o19) {
          var __v21 = ____o19[__k36];
          var __e81 = undefined;
          if (numeric63(__k36)) {
            __e81 = parseInt(__k36);
          } else {
            __e81 = __k36;
          }
          var __k37 = __e81;
          if (number63(__k37)) {
            __l10[__k37] = __v21;
          } else {
            add(__forms1, ["%set", ["%get", __x68, ["quote", __k37]], __v21]);
          }
        }
        if (some63(__forms1)) {
          return join(["let", __x68, ["object", join(["%array"], __l10)]], __forms1, [__x68]);
        } else {
          return join(["%array"], __l10);
        }
      }
    }
  }
});
setenv("if", {
  _stash: true,
  macro: function (..._42args) {
    var __branches1 = unstash([..._42args]);
    return hd(expand_if(__branches1));
  }
});
setenv("case", {
  _stash: true,
  macro: function (expr, ..._42args) {
    var ____r107 = unstash([..._42args]);
    var __expr5 = destash33(expr, ____r107);
    var ____id15 = ____r107;
    var __e82 = undefined;
    if (nil63(has(____id15, "cmp"))) {
      __e82 = "=";
    } else {
      __e82 = has(____id15, "cmp");
    }
    var __cmp1 = __e82;
    var __clauses1 = cut(____id15, 0);
    var __x92 = unique("x");
    var __eq1 = function (_) {
      return [__cmp1, _, __x92];
    };
    var __cl1 = function (__x94) {
      var ____id16 = __x94;
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
    return ["let", __x92, __expr5, join(["if"], apply(join, map(__cl1, pair(__clauses1))))];
  }
});
setenv("of", {
  _stash: true,
  macro: function (x, ..._42args) {
    var ____r111 = unstash([..._42args]);
    var __x107 = destash33(x, ____r111);
    var ____id18 = ____r111;
    var __values1 = cut(____id18, 0);
    return join(["case", __x107, __values1, true, false], props(__values1));
  }
});
setenv("when", {
  _stash: true,
  macro: function (cond, ..._42args) {
    var ____r113 = unstash([..._42args]);
    var __cond3 = destash33(cond, ____r113);
    var ____id20 = ____r113;
    var __body5 = cut(____id20, 0);
    return ["%if", __cond3, join(["%do"], __body5)];
  }
});
setenv("unless", {
  _stash: true,
  macro: function (cond, ..._42args) {
    var ____r115 = unstash([..._42args]);
    var __cond5 = destash33(cond, ____r115);
    var ____id22 = ____r115;
    var __body7 = cut(____id22, 0);
    return ["%if", ["%not", __cond5], join(["%do"], __body7)];
  }
});
setenv("obj", {
  _stash: true,
  macro: function (..._42args) {
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
        var ____x131 = object(["%list", __expr8, __comps3, __cond7]);
        ____x131.kind = "object";
        return ____x131;
      } else {
        return join(["%object"], mapo(function (x) {
          return x;
        }, __body10));
      }
    }
  }
});
setenv("let", {
  _stash: true,
  macro: function (bs, ..._42args) {
    var ____r119 = unstash([..._42args]);
    var __bs11 = destash33(bs, ____r119);
    var ____id33 = ____r119;
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
  }
});
setenv("with", {
  _stash: true,
  macro: function (x, v, ..._42args) {
    var ____r121 = unstash([..._42args]);
    var __x160 = destash33(x, ____r121);
    var __v23 = destash33(v, ____r121);
    var ____id38 = ____r121;
    var __body15 = cut(____id38, 0);
    if (__v23 === "as") {
      return join(["%with", ["%as", __x160, hd(__body15)]], tl(__body15));
    } else {
      if (! atom63(__x160) || has(__body15, "async")) {
        return join(["%with", __x160, __v23], __body15);
      } else {
        return join(["let", [__x160, __v23]], __body15, [__x160]);
      }
    }
  }
});
setenv("let-when", {
  _stash: true,
  macro: function (x, v, ..._42args) {
    var ____r123 = unstash([..._42args]);
    var __x175 = destash33(x, ____r123);
    var __v25 = destash33(v, ____r123);
    var ____id40 = ____r123;
    var __body17 = cut(____id40, 0);
    var __y6 = unique("y");
    return ["let", __y6, __v25, ["when", ["yes", __y6], join(["let", [__x175, __y6]], __body17)]];
  }
});
setenv("define-macro", {
  _stash: true,
  macro: function (name, args, ..._42args) {
    var ____r125 = unstash([..._42args]);
    var __name1 = destash33(name, ____r125);
    var __args5 = destash33(args, ____r125);
    var ____id42 = ____r125;
    var __body19 = cut(____id42, 0);
    var ____x186 = object(["setenv", ["quote", __name1]]);
    ____x186.macro = join(["fn", __args5], __body19);
    var __form1 = ____x186;
    _eval(__form1);
    return __form1;
  }
});
setenv("define-special", {
  _stash: true,
  macro: function (name, args, ..._42args) {
    var ____r127 = unstash([..._42args]);
    var __name3 = destash33(name, ____r127);
    var __args7 = destash33(args, ____r127);
    var ____id44 = ____r127;
    var __body21 = cut(____id44, 0);
    var ____x194 = object(["setenv", ["quote", __name3]]);
    ____x194.special = join(["fn", __args7], __body21);
    var __form3 = join(____x194, props(__body21));
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
    var ____x200 = object(["setenv", ["quote", name]]);
    ____x200.symbol = ["quote", expansion];
    return ____x200;
  }
});
setenv("define-reader", {
  _stash: true,
  macro: function (__x209, ..._42args) {
    var ____r131 = unstash([..._42args]);
    var ____x209 = destash33(__x209, ____r131);
    var ____id47 = ____x209;
    var __char1 = has(____id47, 0);
    var __s2 = has(____id47, 1);
    var ____id48 = ____r131;
    var __body23 = cut(____id48, 0);
    return ["%set", ["%get", "read-table", __char1], join(["fn", [__s2]], __body23)];
  }
});
setenv("define", {
  _stash: true,
  macro: function (name, x, ..._42args) {
    var ____r133 = unstash([..._42args]);
    var __name5 = destash33(name, ____r133);
    var __x220 = destash33(x, ____r133);
    var ____id50 = ____r133;
    var __body25 = cut(____id50, 0);
    setenv(__name5, {
      _stash: true,
      variable: true
    });
    if (some63(__body25)) {
      return join(["%local-function", __name5], bind42(__x220, __body25), props(__body25));
    } else {
      return join(["%local", __name5, __x220], props(__body25));
    }
  }
});
setenv("define-global", {
  _stash: true,
  macro: function (name, x, ..._42args) {
    var ____r135 = unstash([..._42args]);
    var __name7 = destash33(name, ____r135);
    var __x228 = destash33(x, ____r135);
    var ____id52 = ____r135;
    var __body27 = cut(____id52, 0);
    setenv(__name7, {
      _stash: true,
      toplevel: true,
      variable: true
    });
    if (some63(__body27)) {
      return join(["%global-function", __name7], bind42(__x228, __body27), props(__body27));
    } else {
      return join(["set", __name7, __x228], props(__body27));
    }
  }
});
setenv("get-value", {
  _stash: true,
  macro: function (x) {
    var ____x235 = object(["setenv", x]);
    ____x235.toplevel = true;
    return ["has", ____x235, ["quote", "value"]];
  }
});
setenv("define-constant", {
  _stash: true,
  macro: function (name, x) {
    var ____x246 = object(["setenv", ["quote", name]]);
    ____x246.toplevel = true;
    ____x246.value = either(x, ["get-value", ["quote", name]]);
    return ["%do", ____x246, ["define-symbol", name, ["get-value", ["quote", name]]]];
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
  macro: function (x, ..._42args) {
    var ____r144 = unstash([..._42args]);
    var __x276 = destash33(x, ____r144);
    var ____id54 = ____r144;
    var __body29 = cut(____id54, 0);
    var __ok1 = unique("ok");
    var __r145 = unique("r");
    var ____x277 = object(["target", ["try", __x276, join(["finally"], __body29)]]);
    ____x277.lua = join(["let", [[__ok1, __r145], ["guard", __x276]]], __body29, [["if", __ok1, __r145, ["throw", __r145]]]);
    return ____x277;
  }
});
setenv("with-frame", {
  _stash: true,
  macro: function (..._42args) {
    var __body31 = unstash([..._42args]);
    return ["%do", ["add", "environment", ["obj"]], ["after", join(["%do"], __body31), ["drop", "environment"]]];
  }
});
setenv("with-values", {
  _stash: true,
  macro: function (..._42args) {
    var __body33 = unstash([..._42args]);
    var __forms3 = [];
    var ____o21 = __body33;
    var __k40 = undefined;
    for (__k40 in ____o21) {
      var __v27 = ____o21[__k40];
      var __e83 = undefined;
      if (numeric63(__k40)) {
        __e83 = parseInt(__k40);
      } else {
        __e83 = __k40;
      }
      var __k41 = __e83;
      if (! number63(__k41)) {
        var ____x307 = object(["setenv", ["quote", __k41]]);
        ____x307.value = __v27;
        add(__forms3, ____x307);
      }
    }
    return join(["with-frame"], __forms3);
  }
});
setenv("with-bindings", {
  _stash: true,
  macro: function (__x315, ..._42args) {
    var ____r147 = unstash([..._42args]);
    var ____x315 = destash33(__x315, ____r147);
    var ____id57 = ____x315;
    var __names5 = has(____id57, 0);
    var ____id58 = ____r147;
    var __body35 = cut(____id58, 0);
    var __x317 = unique("x");
    var ____x320 = object(["setenv", __x317]);
    ____x320.variable = true;
    return join(["with-frame", ["each", __x317, __names5, ____x320]], __body35);
  }
});
setenv("let-macro", {
  _stash: true,
  macro: function (definitions, ..._42args) {
    var ____r152 = unstash([..._42args]);
    var __definitions1 = destash33(definitions, ____r152);
    var ____id60 = ____r152;
    var __body37 = cut(____id60, 0);
    add(environment, {});
    var ____r154 = undefined;
    try{
      map(function (m) {
        return macroexpand(join(["define-macro"], m));
      }, __definitions1);
      ____r154 = join(["%do"], macroexpand(__body37));
    }
    finally{
      drop(environment);
    }
    return ____r154;
  }
});
setenv("let-symbol", {
  _stash: true,
  macro: function (expansions, ..._42args) {
    var ____r160 = unstash([..._42args]);
    var __expansions1 = destash33(expansions, ____r160);
    var ____id63 = ____r160;
    var __body39 = cut(____id63, 0);
    add(environment, {});
    var ____r162 = undefined;
    try{
      map(function (__x332) {
        var ____id64 = __x332;
        var __name9 = has(____id64, 0);
        var __exp1 = has(____id64, 1);
        return macroexpand(["define-symbol", __name9, __exp1]);
      }, pair(__expansions1));
      ____r162 = join(["%do"], macroexpand(__body39));
    }
    finally{
      drop(environment);
    }
    return ____r162;
  }
});
setenv("let-unique", {
  _stash: true,
  macro: function (names, ..._42args) {
    var ____r166 = unstash([..._42args]);
    var __names7 = destash33(names, ____r166);
    var ____id66 = ____r166;
    var __body41 = cut(____id66, 0);
    var __bs3 = map(function (n) {
      return [n, ["unique", ["quote", n]]];
    }, __names7);
    return join(["let", apply(join, __bs3)], __body41);
  }
});
setenv("fn", {
  _stash: true,
  macro: function (args, ..._42args) {
    var ____r169 = unstash([..._42args]);
    var __args9 = destash33(args, ____r169);
    var ____id68 = ____r169;
    var __body43 = cut(____id68, 0);
    return join(["%function"], bind42(__args9, __body43), props(__body43));
  }
});
setenv("apply", {
  _stash: true,
  macro: function (f, ..._42args) {
    var ____r171 = unstash([..._42args]);
    var __f3 = destash33(f, ____r171);
    var ____id70 = ____r171;
    var __args111 = cut(____id70, 0);
    if (_35(__args111) > 1) {
      return ["%call", "apply", __f3, ["join", join(["list"], almost(__args111)), last(__args111), join(["list"], props(__args111))]];
    } else {
      if (props63(__args111)) {
        return ["%call", "apply", __f3, join(["join"], __args111, [join(["list"], props(__args111))])];
      } else {
        return join(["%call", "apply", __f3], __args111);
      }
    }
  }
});
setenv("guard", {
  _stash: true,
  macro: function (expr) {
    var ____x399 = object(["target", [["%function", join(), ["%try", ["list", true, expr]]]]]);
    var ____x411 = object(["obj"]);
    ____x411.stack = [["idx", "debug", "traceback"]];
    ____x411.message = ["if", ["string?", "m"], ["clip", "m", ["+", ["search", "m", "\": \""], 2]], ["nil?", "m"], "\"\"", ["str", "m"]];
    ____x399.lua = ["list", ["xpcall", ["%function", join(), expr], ["%function", ["m"], ["if", ["obj?", "m"], "m", ____x411]]]];
    return ["let-macro", [["%return", "args", ["error", "\"Can't return from guard\""]]], ____x399];
  }
});
setenv("each", {
  _stash: true,
  macro: function (x, t, ..._42args) {
    var ____r175 = unstash([..._42args]);
    var __x440 = destash33(x, ____r175);
    var __t4 = destash33(t, ____r175);
    var ____id73 = ____r175;
    var __body45 = cut(____id73, 0);
    var __o23 = unique("o");
    var __n31 = unique("n");
    var __i37 = unique("i");
    var __e84 = undefined;
    if (atom63(__x440)) {
      __e84 = [__i37, __x440];
    } else {
      var __e85 = undefined;
      if (_35(__x440) > 1) {
        __e85 = __x440;
      } else {
        __e85 = [__i37, hd(__x440)];
      }
      __e84 = __e85;
    }
    var ____id74 = __e84;
    var __k43 = has(____id74, 0);
    var __v29 = has(____id74, 1);
    var ____x446 = object(["target", __o23]);
    ____x446.py = ["indices", __o23];
    var __e86 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e86 = __body45;
    } else {
      __e86 = [join(["let", __k43, ["if", ["numeric?", __k43], ["parseInt", __k43], __k43]], __body45)];
    }
    return ["let", [__o23, __t4, __k43, "nil"], join(["%for", ____x446, __k43], props(__body45), [join(["let", [__v29, ["%get", __o23, __k43]]], __e86)])];
  }
});
setenv("for", {
  _stash: true,
  macro: function (i, to, ..._42args) {
    var ____r177 = unstash([..._42args]);
    var __i39 = destash33(i, ____r177);
    var __to1 = destash33(to, ____r177);
    var ____id76 = ____r177;
    var __body47 = cut(____id76, 0);
    if (__to1 === "in") {
      return join(["%for", hd(__body47), __i39, join(["%do"], tl(__body47))], props(__body47));
    } else {
      return ["let", __i39, 0, join(["while", ["<", __i39, __to1]], __body47, [["inc", __i39]])];
    }
  }
});
setenv("step", {
  _stash: true,
  macro: function (v, t, ..._42args) {
    var ____r179 = unstash([..._42args]);
    var __v31 = destash33(v, ____r179);
    var __t6 = destash33(t, ____r179);
    var ____id78 = ____r179;
    var __body49 = cut(____id78, 0);
    var __x483 = unique("x");
    var __i41 = unique("i");
    return ["let", [__x483, __t6], ["for", __i41, ["#", __x483], join(["let", [__v31, ["at", __x483, __i41]]], __body49)]];
  }
});
setenv("set-of", {
  _stash: true,
  macro: function (..._42args) {
    var __xs13 = unstash([..._42args]);
    var __l14 = [];
    var ____o25 = __xs13;
    var ____i43 = undefined;
    for (____i43 in ____o25) {
      var __x495 = ____o25[____i43];
      var __e87 = undefined;
      if (numeric63(____i43)) {
        __e87 = parseInt(____i43);
      } else {
        __e87 = ____i43;
      }
      var ____i431 = __e87;
      __l14[__x495] = true;
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
  macro: function (..._42args) {
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
  macro: function (a, ..._42args) {
    var ____r185 = unstash([..._42args]);
    var __a6 = destash33(a, ____r185);
    var ____id80 = ____r185;
    var __bs5 = cut(____id80, 0);
    return ["set", __a6, join(["join", __a6], __bs5)];
  }
});
setenv("cat!", {
  _stash: true,
  macro: function (a, ..._42args) {
    var ____r187 = unstash([..._42args]);
    var __a8 = destash33(a, ____r187);
    var ____id82 = ____r187;
    var __bs7 = cut(____id82, 0);
    return ["set", __a8, join(["cat", __a8], __bs7)];
  }
});
setenv("inc", {
  _stash: true,
  macro: function (n, by) {
    var __e88 = undefined;
    if (nil63(by)) {
      __e88 = 1;
    } else {
      __e88 = by;
    }
    return ["set", n, ["+", n, __e88]];
  }
});
setenv("dec", {
  _stash: true,
  macro: function (n, by) {
    var __e89 = undefined;
    if (nil63(by)) {
      __e89 = 1;
    } else {
      __e89 = by;
    }
    return ["set", n, ["-", n, __e89]];
  }
});
setenv("with-indent", {
  _stash: true,
  macro: function (form) {
    var __x528 = unique("x");
    return ["%do", ["inc", "indent-level"], ["with", __x528, form, ["dec", "indent-level"]]];
  }
});
setenv("export", {
  _stash: true,
  macro: function (..._42args) {
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
  }
});
setenv("when-compiling", {
  _stash: true,
  macro: function (..._42args) {
    var __body51 = unstash([..._42args]);
    return _eval(join(["%do"], __body51));
  }
});
setenv("during-compilation", {
  _stash: true,
  macro: function (..._42args) {
    var __body53 = unstash([..._42args]);
    var __form5 = join(["%do"], __body53);
    _eval(__form5);
    return __form5;
  }
});
setenv("def", {
  _stash: true,
  macro: function (name, ..._42args) {
    var ____r197 = unstash([..._42args]);
    var __name11 = destash33(name, ____r197);
    var ____id84 = ____r197;
    var __body55 = cut(____id84, 0);
    return join(["define-global", __name11], __body55);
  }
});
setenv("mac", {
  _stash: true,
  macro: function (name, ..._42args) {
    var ____r199 = unstash([..._42args]);
    var __name13 = destash33(name, ____r199);
    var ____id86 = ____r199;
    var __body57 = cut(____id86, 0);
    return join(["define-macro", __name13], __body57);
  }
});
setenv("defconst", {
  _stash: true,
  macro: function (name, ..._42args) {
    var ____r201 = unstash([..._42args]);
    var __name15 = destash33(name, ____r201);
    var ____id88 = ____r201;
    var __value1 = cut(____id88, 0);
    return join(["def", __name15], __value1);
  }
});
setenv("undefined?", {
  _stash: true,
  macro: function (name) {
    var ____x592 = object(["target"]);
    ____x592.js = ["=", ["typeof", name], "\"undefined\""];
    ____x592.lua = ["=", ["idx", "_G", name], "nil"];
    ____x592.py = ["not", ["%in", ["quote", compile(name)], ["globals"]]];
    return ____x592;
  }
});
setenv("defvar", {
  _stash: true,
  macro: function (name, ..._42args) {
    var ____r205 = unstash([..._42args]);
    var __name17 = destash33(name, ____r205);
    var ____id90 = ____r205;
    var __value3 = cut(____id90, 0);
    var ____x610 = object(["target"]);
    ____x610.py = ["global", __name17];
    return ["when", ["undefined?", __name17], ____x610, join(["defconst", __name17], __value3)];
  }
});
setenv("async", {
  _stash: true,
  macro: function (keyword, ..._42args) {
    var ____r207 = unstash([..._42args]);
    var __keyword1 = destash33(keyword, ____r207);
    var ____id92 = ____r207;
    var __body59 = cut(____id92, 0);
    var ____x616 = object([__keyword1]);
    ____x616.async = true;
    return join(____x616, __body59);
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
  macro: function (a, ..._42args) {
    var ____r213 = unstash([..._42args]);
    var __a10 = destash33(a, ____r213);
    var ____id94 = ____r213;
    var __bs9 = cut(____id94, 0);
    if (nil63(__a10)) {
      return "";
    } else {
      if (none63(__bs9)) {
        return __a10;
      } else {
        if (one63(__bs9)) {
          var ____x642 = object(["target", join(["%cat", __a10], __bs9)]);
          ____x642.py = join(["%call", "cat", __a10], __bs9);
          return ____x642;
        } else {
          var ____x645 = object(["target", ["%cat", __a10, join(["cat"], __bs9)]]);
          ____x645.py = join(["%call", "cat", __a10], __bs9);
          return ____x645;
        }
      }
    }
  }
});
setenv("+", {
  _stash: true,
  macro: function (..._42args) {
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
  }
});
setenv("-", {
  _stash: true,
  macro: function (..._42args) {
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
  }
});
setenv("*", {
  _stash: true,
  macro: function (..._42args) {
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
  }
});
setenv("/", {
  _stash: true,
  macro: function (..._42args) {
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
  }
});
setenv("//", {
  _stash: true,
  macro: function (..._42args) {
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
  }
});
setenv("%", {
  _stash: true,
  macro: function (..._42args) {
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
  }
});
setenv("<", {
  _stash: true,
  macro: function (a, ..._42args) {
    var ____r215 = unstash([..._42args]);
    var __a12 = destash33(a, ____r215);
    var ____id96 = ____r215;
    var __bs111 = cut(____id96, 0);
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
  macro: function (a, ..._42args) {
    var ____r217 = unstash([..._42args]);
    var __a14 = destash33(a, ____r217);
    var ____id98 = ____r217;
    var __bs13 = cut(____id98, 0);
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
  macro: function (a, ..._42args) {
    var ____r219 = unstash([..._42args]);
    var __a16 = destash33(a, ____r219);
    var ____id100 = ____r219;
    var __bs15 = cut(____id100, 0);
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
  macro: function (a, ..._42args) {
    var ____r221 = unstash([..._42args]);
    var __a18 = destash33(a, ____r221);
    var ____id102 = ____r221;
    var __bs17 = cut(____id102, 0);
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
  macro: function (a, ..._42args) {
    var ____r223 = unstash([..._42args]);
    var __a20 = destash33(a, ____r223);
    var ____id104 = ____r223;
    var __bs19 = cut(____id104, 0);
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
  macro: function (..._42args) {
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
  }
});
setenv("and", {
  _stash: true,
  macro: function (a, ..._42args) {
    var ____r225 = unstash([..._42args]);
    var __a22 = destash33(a, ____r225);
    var ____id106 = ____r225;
    var __bs211 = cut(____id106, 0);
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
  macro: function (a, ..._42args) {
    var ____r227 = unstash([..._42args]);
    var __a24 = destash33(a, ____r227);
    var ____id108 = ____r227;
    var __bs23 = cut(____id108, 0);
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
  macro: function (..._42args) {
    var __args27 = unstash([..._42args]);
    return join(["%break"], __args27);
  }
});
setenv("return", {
  _stash: true,
  macro: function (..._42args) {
    var __args29 = unstash([..._42args]);
    return join(["%return"], __args29);
  }
});
setenv("while", {
  _stash: true,
  macro: function (c, ..._42args) {
    var ____r229 = unstash([..._42args]);
    var __c3 = destash33(c, ____r229);
    var ____id110 = ____r229;
    var __body61 = cut(____id110, 0);
    return join(["%while", __c3], __body61);
  }
});
setenv("do", {
  _stash: true,
  macro: function (..._42args) {
    var __body63 = unstash([..._42args]);
    return join(["%do"], __body63);
  }
});
setenv("get", {
  _stash: true,
  macro: function (..._42args) {
    var __args31 = unstash([..._42args]);
    return join(["%get"], __args31);
  }
});
setenv("idx", {
  _stash: true,
  macro: function (..._42args) {
    var __args33 = unstash([..._42args]);
    return join(["%idx"], __args33);
  }
});
setenv("new", {
  _stash: true,
  macro: function (..._42args) {
    var __args35 = unstash([..._42args]);
    return join(["%new"], __args35);
  }
});
setenv("typeof", {
  _stash: true,
  macro: function (..._42args) {
    var __args37 = unstash([..._42args]);
    return join(["%typeof"], __args37);
  }
});
setenv("error", {
  _stash: true,
  macro: function (..._42args) {
    var __args39 = unstash([..._42args]);
    return join(["%error"], __args39);
  }
});
setenv("throw", {
  _stash: true,
  macro: function (..._42args) {
    var __args41 = unstash([..._42args]);
    return join(["%throw"], __args41);
  }
});
setenv("raise", {
  _stash: true,
  macro: function (..._42args) {
    var __args43 = unstash([..._42args]);
    return join(["%throw"], __args43);
  }
});
setenv("is", {
  _stash: true,
  macro: function (..._42args) {
    var __args45 = unstash([..._42args]);
    var ____x800 = object(["target", join(["="], __args45)]);
    ____x800.py = join(["%is"], __args45);
    return ____x800;
  }
});
setenv("in", {
  _stash: true,
  macro: function (..._42args) {
    var __args47 = unstash([..._42args]);
    return join(["%in"], __args47);
  }
});
setenv("as", {
  _stash: true,
  macro: function (..._42args) {
    var __args49 = unstash([..._42args]);
    return join(["%as"], __args49);
  }
});
setenv("%expand-case", {
  _stash: true,
  macro: function (x, ..._42args) {
    var ____r231 = unstash([..._42args]);
    var __x818 = destash33(x, ____r231);
    var ____id113 = ____r231;
    var __body65 = cut(____id113, 0);
    var __e90 = undefined;
    if (atom63(__x818)) {
      __e90 = [__x818];
    } else {
      __e90 = __x818;
    }
    var ____id114 = __e90;
    var __a26 = has(____id114, 0);
    var __bs25 = cut(____id114, 1);
    var __e91 = undefined;
    if (none63(__bs25)) {
      __e91 = [["%literal"]];
    } else {
      __e91 = __bs25;
    }
    return join(["%block", __a26], __e91, __body65);
  }
});
setenv("%cases", {
  _stash: true,
  macro: function (..._42args) {
    var __args51 = unstash([..._42args]);
    if (none63(__args51)) {
      return ["do"];
    } else {
      if (one63(__args51)) {
        return join(["%expand-case"], hd(__args51));
      } else {
        var __r234 = unique("r");
        return join(["with", __r234, "nil"], map(function (__x838) {
          var ____id116 = __x838;
          var __x839 = has(____id116, 0);
          var __body67 = cut(____id116, 1);
          return ["%expand-case", __x839, ["%set", __r234, join(["%do"], __body67)]];
        }, almost(__args51)), [join(["%expand-case"], last(__args51))]);
      }
    }
  }
});
setenv("try", {
  _stash: true,
  macro: function (x, ..._42args) {
    var ____r237 = unstash([..._42args]);
    var __x860 = destash33(x, ____r237);
    var ____id1211 = ____r237;
    var __cases1 = cut(____id1211, 0);
    var __fin1 = ["finally"];
    var ____o27 = __cases1;
    var ____i46 = undefined;
    for (____i46 in ____o27) {
      var __x862 = ____o27[____i46];
      var __e92 = undefined;
      if (numeric63(____i46)) {
        __e92 = parseInt(____i46);
      } else {
        __e92 = ____i46;
      }
      var ____i461 = __e92;
      if (hd63(__x862, "finally")) {
        __fin1 = __x862;
      }
    }
    var __forms7 = [];
    var ____x865 = __cases1;
    var ____i47 = 0;
    while (____i47 < _35(____x865)) {
      var ____id122 = ____x865[____i47];
      var __x866 = has(____id122, 0);
      var __body71 = cut(____id122, 1);
      if (__x866 === "finally") {
      } else {
        if (__x866 === "except" && has(__body71, 1) === "as") {
          var ____id123 = __body71;
          var __kind2 = has(____id123, 0);
          var ___1 = has(____id123, 1);
          var __name19 = has(____id123, 2);
          var __body72 = cut(____id123, 3);
          add(__forms7, join([[__x866, ["%as", __kind2, __name19]]], __body72));
        } else {
          if (__x866 === "except") {
            var ____id124 = __body71;
            var __kind3 = has(____id124, 0);
            var __body73 = cut(____id124, 1);
            add(__forms7, join([[__x866, __kind3]], __body73));
          } else {
            throw new Error("Unknown try clause");
          }
        }
      }
      ____i47 = ____i47 + 1;
    }
    return join(["%cases", ["try", __x860]], __forms7, [__fin1]);
  }
});
setenv("errsafe", {
  _stash: true,
  macro: function (x, _else) {
    if (nil63(_else)) {
      _else = "nil";
    }
    var __ok7 = unique("ok");
    var __v33 = unique("v");
    return ["let", [[__ok7, __v33], ["guard", x]], ["if", __ok7, __v33, _else]];
  }
});
setenv("dbg", {
  _stash: true,
  macro: function () {
    var ____x889 = object(["target", ["do"]]);
    ____x889.py = ["do", ["import", "pdb"], [["idx", "pdb", "set-trace"]]];
    return ____x889;
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
var stream = function (str, more) {
  return {
    pos: 0,
    string: str,
    len: _35(str),
    more: more
  };
};
var peek_char = function (s) {
  var ____id125 = s;
  var __pos = has(____id125, "pos");
  var __len = has(____id125, "len");
  var __string = has(____id125, "string");
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
var more63 = function (s, x) {
  return is63(s.more) && x === s.more;
};
var eof63 = function (s, x) {
  return x === eof || more63(s, x);
};
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
  var __form8 = read_1(s);
  if ("," === peek_char(s)) {
    var __r252 = [",", __form8];
    while (true) {
      read_char(s);
      __form8 = read_1(s);
      if (eof63(s, __form8)) {
        return expected(s, "tuple");
      }
      add(__r252, __form8);
      if (!( "," === peek_char(s))) {
        break;
      }
    }
    return __r252;
  } else {
    return __form8;
  }
};
var read_all = function (s) {
  var __r254 = undefined;
  var __l15 = [];
  while (nil63(__r254)) {
    var __form9 = read(s);
    if (more63(s, __form9)) {
      __r254 = s.more;
    } else {
      if (eof63(s, __form9)) {
        __r254 = __l15;
      } else {
        add(__l15, __form9);
      }
    }
  }
  return __r254;
};
read_string = function (str, more) {
  var __s3 = stream(str, more);
  var __x899 = read(__s3);
  if (!( __x899 === eof)) {
    return __x899;
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
  var __y7 = read(s);
  if (more63(s, __y7)) {
    return __y7;
  } else {
    return [x, __y7];
  }
};
var hex_prefix63 = function (str) {
  var __e93 = undefined;
  if (code(str, 0) === 45) {
    __e93 = 1;
  } else {
    __e93 = 0;
  }
  var __i48 = __e93;
  var __id192 = code(str, __i48) === 48;
  var __e94 = undefined;
  if (__id192) {
    __i48 = __i48 + 1;
    var __n36 = code(str, __i48);
    __e94 = __n36 === 120 || __n36 === 88;
  } else {
    __e94 = __id192;
  }
  return __e94;
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
    var __c7 = peek_char(s);
    if (__c7 && (! has63(whitespace, __c7) && ! has63(delimiters, __c7))) {
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
      var __n37 = maybe_number(__str2);
      if (real63(__n37)) {
        return __n37;
      } else {
        return __str2;
      }
    }
  }
};
read_table["("] = function (s) {
  read_char(s);
  var __r264 = undefined;
  var __l16 = [];
  while (nil63(__r264)) {
    skip_non_code(s);
    var __c8 = peek_char(s);
    if (__c8 === ")") {
      read_char(s);
      __r264 = __l16;
    } else {
      if (nil63(__c8)) {
        __r264 = expected(s, ")");
      } else {
        var __x901 = read(s);
        if (eof63(s, __x901)) {
          __r264 = expected(s, ")");
        } else {
          if (key63(__x901)) {
            var __k44 = clip(__x901, 0, edge(__x901));
            var __v34 = read(s);
            __l16 = object(__l16);
            __l16[__k44] = __v34;
          } else {
            add(__l16, __x901);
          }
        }
      }
    }
  }
  return __r264;
};
read_table[")"] = function (s) {
  throw new Error("Unexpected ) at " + s.pos);
};
var read_matching = function (opener, closer, s) {
  var __r267 = undefined;
  var __pos1 = s.pos;
  var __str3 = "";
  var __i49 = 0;
  while (__i49 < _35(opener)) {
    __str3 = __str3 + (read_char(s) || "");
    __i49 = __i49 + 1;
  }
  if (__str3 === opener) {
    while (nil63(__r267)) {
      if (clip(s.string, s.pos, s.pos + _35(closer)) === closer) {
        var __i50 = 0;
        while (__i50 < _35(closer)) {
          __str3 = __str3 + read_char(s);
          __i50 = __i50 + 1;
        }
        __r267 = __str3;
      } else {
        if (nil63(peek_char(s))) {
          __r267 = expected(s, closer);
        } else {
          __str3 = __str3 + read_char(s);
          if (peek_char(s) === "\\") {
            __str3 = __str3 + read_char(s);
          }
        }
      }
    }
  }
  return __r267;
};
read_table["\""] = function (s) {
  if (string_starts63(s.string, "\"\"\"", s.pos)) {
    return read_matching("\"\"\"", "\"\"\"", s);
  } else {
    var __i51 = s.pos;
    var __j1 = search(s.string, "\"", __i51 + 1);
    var __b5 = either(search(s.string, "\\", __i51 + 1), __j1);
    if (is63(__j1) && (__j1 < s.len && __b5 >= __j1)) {
      s.pos = __j1 + 1;
      return clip(s.string, __i51, __j1 + 1);
    } else {
      var __r269 = undefined;
      read_char(s);
      while (nil63(__r269)) {
        var __c9 = peek_char(s);
        if (__c9 === "\"") {
          read_char(s);
          __r269 = clip(s.string, __i51, s.pos);
        } else {
          if (nil63(__c9)) {
            __r269 = expected(s, "\"");
          } else {
            if (__c9 === "\\") {
              read_char(s);
            }
            read_char(s);
          }
        }
      }
      return __r269;
    }
  }
};
read_table["|"] = function (s) {
  var __i52 = s.pos;
  var __j2 = search(s.string, "|", __i52 + 1);
  if (is63(__j2) && __j2 < s.len) {
    s.pos = __j2 + 1;
    return clip(s.string, __i52, __j2 + 1);
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
    var __i53 = edge(environment);
    while (__i53 >= 0) {
      if (has63(environment[__i53], k)) {
        var __b6 = environment[__i53][k];
        var __e95 = undefined;
        if (p) {
          __e95 = has(__b6, p);
        } else {
          __e95 = __b6;
        }
        return __e95;
      } else {
        __i53 = __i53 - 1;
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
        return join(["list"], map(quoted, form));
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
      var __l17 = array(args);
      var ____o28 = args;
      var __k45 = undefined;
      for (__k45 in ____o28) {
        var __v35 = ____o28[__k45];
        var __e97 = undefined;
        if (numeric63(__k45)) {
          __e97 = parseInt(__k45);
        } else {
          __e97 = __k45;
        }
        var __k46 = __e97;
        if (! number63(__k46)) {
          add(__l17, ["%literal", __k46, "|=|", __v35]);
        }
      }
      return __l17;
    } else {
      var __l18 = ["%object", "\"_stash\"", true];
      var ____o29 = args;
      var __k47 = undefined;
      for (__k47 in ____o29) {
        var __v36 = ____o29[__k47];
        var __e96 = undefined;
        if (numeric63(__k47)) {
          __e96 = parseInt(__k47);
        } else {
          __e96 = __k47;
        }
        var __k48 = __e96;
        if (! number63(__k48)) {
          add(__l18, literal(__k48));
          add(__l18, __v36);
        }
      }
      return join(args, [__l18]);
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
        var ____id126 = lh;
        var ___2 = has(____id126, 0);
        var ___var = has(____id126, 1);
        var __val2 = has(____id126, 2);
        var __val3 = either(__val2, ___var);
        return bind(["o", ___var, ["the", __val3]], rh);
      } else {
        if (hd(lh) === "o") {
          var ____id127 = lh;
          var ___3 = has(____id127, 0);
          var ___var1 = has(____id127, 1);
          var __val4 = has(____id127, 2);
          return [___var1, ["if", ["nil?", rh], __val4, rh]];
        } else {
          var __id128 = unique("id");
          var __bs26 = [__id128, rh];
          var ____o30 = lh;
          var __k49 = undefined;
          for (__k49 in ____o30) {
            var __v37 = ____o30[__k49];
            var __e98 = undefined;
            if (numeric63(__k49)) {
              __e98 = parseInt(__k49);
            } else {
              __e98 = __k49;
            }
            var __k50 = __e98;
            var __e99 = undefined;
            if (__k50 === "rest") {
              __e99 = ["cut", __id128, _35(lh)];
            } else {
              __e99 = ["has", __id128, ["quote", bias(__k50)]];
            }
            var __x914 = __e99;
            if (is63(__k50)) {
              var __e100 = undefined;
              if (__v37 === true) {
                __e100 = __k50;
              } else {
                __e100 = __v37;
              }
              var __k51 = __e100;
              __bs26 = join(__bs26, bind(__k51, __x914));
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
  macro: function (from) {
    var ____x925 = object(["target"]);
    ____x925.js = [["%idx", ["%idx", ["%idx", "Array", "prototype"], "slice"], "call"], "arguments", from];
    ____x925.py = ["|list|", "|_args|"];
    ____x925.lua = ["list", "|...|"];
    return ____x925;
  }
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
    var ____x936 = object(["target"]);
    ____x936.py = ["obj", "..."];
    return ["unstash", ["list", "..."], ____x936];
  };
  if (atom63(args)) {
    return [__args131, join(["let", [args, rest()]], body)];
  } else {
    var ____id129 = body_docstring(body);
    var __doc = has(____id129, 0);
    var __body74 = has(____id129, 1);
    var __pre = [];
    var __bs27 = [];
    var __inits = [];
    var __r295 = unique("r");
    var ____o31 = args;
    var __k52 = undefined;
    for (__k52 in ____o31) {
      var __v38 = ____o31[__k52];
      var __e101 = undefined;
      if (numeric63(__k52)) {
        __e101 = parseInt(__k52);
      } else {
        __e101 = __k52;
      }
      var __k53 = __e101;
      if (number63(__k53)) {
        if (atom63(__v38)) {
          add(__args131, __v38);
        } else {
          if (hd(__v38) === "o") {
            var ____id130 = __v38;
            var ___4 = has(____id130, 0);
            var ___var2 = has(____id130, 1);
            var __val5 = has(____id130, 2);
            add(__args131, ___var2);
            add(__inits, ["%if", ["nil?", ___var2], ["%set", ___var2, __val5]]);
          } else {
            if (hd(__v38) === "t") {
              var ____id131 = __v38;
              var ___5 = has(____id131, 0);
              var ___var3 = has(____id131, 1);
              var __val6 = has(____id131, 2);
              var __val7 = either(__val6, ___var3);
              add(__args131, ___var3);
              add(__inits, ["%if", ["nil?", ___var3], ["%set", ___var3, ["the", __val7]]]);
            } else {
              var __x948 = unique("x");
              add(__args131, __x948);
              __bs27 = join(__bs27, [__v38, __x948]);
            }
          }
        }
      }
    }
    if (props63(args)) {
      __pre = join(__pre, [__r295, rest()]);
      var __n42 = _35(__args131);
      var __i58 = 0;
      while (__i58 < __n42) {
        var __v39 = __args131[__i58];
        __pre = join(__pre, [__v39, ["destash!", __v39, __r295]]);
        __i58 = __i58 + 1;
      }
      __bs27 = join(__bs27, [props(args), __r295]);
    }
    var __forms8 = join(["let", __pre], __inits, [join(["let", __bs27], __body74)]);
    var __e102 = undefined;
    if (is63(__doc)) {
      __e102 = ["do", __doc, __forms8];
    } else {
      __e102 = __forms8;
    }
    return [__args131, __e102];
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
var expand_local = function (__x959) {
  var ____id132 = __x959;
  var __x960 = has(____id132, 0);
  var __name20 = has(____id132, 1);
  var __value4 = has(____id132, 2);
  setenv(__name20, {
    _stash: true,
    variable: true
  });
  return ["%local", __name20, macroexpand(__value4)];
};
var expand_function = function (__x962) {
  var ____id133 = __x962;
  var __x963 = has(____id133, 0);
  var __args52 = has(____id133, 1);
  var __body75 = cut(____id133, 2);
  add(environment, {});
  var ____r303 = undefined;
  try{
    var ____o32 = __args52;
    var ____i59 = undefined;
    for (____i59 in ____o32) {
      var ____x964 = ____o32[____i59];
      var __e103 = undefined;
      if (numeric63(____i59)) {
        __e103 = parseInt(____i59);
      } else {
        __e103 = ____i59;
      }
      var ____i591 = __e103;
      setenv(____x964, {
        _stash: true,
        variable: true
      });
    }
    ____r303 = join(["%function", __args52], macroexpand(__body75));
  }
  finally{
    drop(environment);
  }
  return ____r303;
};
var expand_definition = function (__x966) {
  var ____id134 = __x966;
  var __x967 = has(____id134, 0);
  var __name21 = has(____id134, 1);
  var __args53 = has(____id134, 2);
  var __body76 = cut(____id134, 3);
  add(environment, {});
  var ____r306 = undefined;
  try{
    var ____o33 = __args53;
    var ____i60 = undefined;
    for (____i60 in ____o33) {
      var ____x968 = ____o33[____i60];
      var __e104 = undefined;
      if (numeric63(____i60)) {
        __e104 = parseInt(____i60);
      } else {
        __e104 = ____i60;
      }
      var ____i601 = __e104;
      setenv(____x968, {
        _stash: true,
        variable: true
      });
    }
    ____r306 = join([__x967, __name21, __args53], macroexpand(__body76));
  }
  finally{
    drop(environment);
  }
  return ____r306;
};
var expand_macro = function (form) {
  return macroexpand(expand1(form));
};
expand1 = function (__x970) {
  var ____id135 = __x970;
  var __name22 = has(____id135, 0);
  var __body77 = cut(____id135, 1);
  return apply(macro_function(__name22), __body77);
};
real63 = function (x) {
  return number63(x) && (! nan63(x) && ! inf63(x));
};
valid_access63 = function (str) {
  return _35(str) > 2 && (!( "." === char(str, 0)) && (!( "." === char(str, edge(str))) && ! search(str, "..")));
};
parse_access = function (str) {
  return reduce(function (a, b) {
    var __n45 = number(a);
    if (is63(__n45)) {
      return ["at", b, __n45];
    } else {
      return ["%idx", b, a];
    }
  }, reverse(split(str, ".")));
};
parse_access63 = function (form) {
  return string63(form) && (! string_literal63(form) && (! id_literal63(form) && (is63(search(form, ".")) && valid_access63(form))));
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
        var __x973 = hd(form);
        if (__x973 === "%local") {
          return expand_local(form);
        } else {
          if (__x973 === "%function") {
            return expand_function(form);
          } else {
            if (__x973 === "%global-function") {
              return expand_definition(form);
            } else {
              if (__x973 === "%local-function") {
                return expand_definition(form);
              } else {
                if (__x973 === "%expansion") {
                  return form[1];
                } else {
                  if (macro63(__x973)) {
                    return expand_macro(form);
                  } else {
                    if (parse_access63(__x973)) {
                      return macroexpand(join([parse_access(__x973)], tl(form)));
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
  var ____o34 = form;
  var __k54 = undefined;
  for (__k54 in ____o34) {
    var __v40 = ____o34[__k54];
    var __e105 = undefined;
    if (numeric63(__k54)) {
      __e105 = parseInt(__k54);
    } else {
      __e105 = __k54;
    }
    var __k55 = __e105;
    if (! number63(__k55)) {
      var __e106 = undefined;
      if (quasisplice63(__v40, depth)) {
        __e106 = quasiexpand(__v40[1]);
      } else {
        __e106 = quasiexpand(__v40, depth);
      }
      var __v41 = __e106;
      last(__xs14)[__k55] = __v41;
    }
  }
  var ____x977 = form;
  var ____i62 = 0;
  while (____i62 < _35(____x977)) {
    var __x978 = ____x977[____i62];
    if (quasisplice63(__x978, depth)) {
      var __x979 = quasiexpand(__x978[1]);
      add(__xs14, __x979);
      add(__xs14, ["list"]);
    } else {
      add(last(__xs14), quasiexpand(__x978, depth));
    }
    ____i62 = ____i62 + 1;
  }
  var __pruned = keep(function (x) {
    return _35(x) > 1 || (!( hd(x) === "list") || props63(x));
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
expand_if = function (__x983) {
  var ____id136 = __x983;
  var __a27 = has(____id136, 0);
  var __b7 = has(____id136, 1);
  var __c111 = cut(____id136, 2);
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
  var __s4 = "";
  var __i63 = 0;
  while (__i63 < has(setenv("indent-level", {
    _stash: true,
    toplevel: true
  }), "value")) {
    __s4 = __s4 + "  ";
    __i63 = __i63 + 1;
  }
  return __s4;
};
var reserved = {
  all: {
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
    ">=": true
  },
  js: {
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
    "with": true
  },
  lua: {
    and: true,
    end: true,
    "in": true,
    load: true,
    repeat: true,
    while: true,
    "break": true,
    false: true,
    local: true,
    "return": true,
    "do": true,
    "for": true,
    nil: true,
    then: true,
    "else": true,
    "function": true,
    not: true,
    true: true,
    elseif: true,
    "if": true,
    or: true,
    until: true
  },
  py: {
    and: true,
    except: true,
    lambda: true,
    "with": true,
    as: true,
    "finally": true,
    nonlocal: true,
    while: true,
    assert: true,
    false: true,
    None: true,
    yield: true,
    "break": true,
    "for": true,
    not: true,
    "class": true,
    from: true,
    or: true,
    "continue": true,
    global: true,
    pass: true,
    def: true,
    "if": true,
    raise: true,
    del: true,
    "import": true,
    "return": true,
    elif: true,
    "in": true,
    True: true,
    "else": true,
    is: true,
    "try": true,
    str: true,
    print: true
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
compile_id = function (id, raw63) {
  if (keyword63(id)) {
    return compile_keyword(id);
  } else {
    if (code(id, 0) === 46) {
      return "." + compile_id(clip(id, 1), true);
    } else {
      var __e107 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e107 = "L_";
      } else {
        __e107 = "_";
      }
      var __x989 = __e107;
      var __e108 = undefined;
      if (number_code63(code(id, 0))) {
        __e108 = __x989;
      } else {
        __e108 = "";
      }
      var __id1311 = __e108;
      var __i64 = 0;
      while (__i64 < _35(id)) {
        var __c12 = char(id, __i64);
        var __n47 = code(__c12);
        var __e109 = undefined;
        if (__c12 === "-" && !( id === "-")) {
          var __e112 = undefined;
          if (__i64 === 0) {
            __e112 = __x989;
          } else {
            __e112 = "_";
          }
          __e109 = __e112;
        } else {
          var __e110 = undefined;
          if (valid_code63(__n47)) {
            __e110 = __c12;
          } else {
            var __e111 = undefined;
            if (__i64 === 0) {
              __e111 = __x989 + __n47;
            } else {
              __e111 = __n47;
            }
            __e110 = __e111;
          }
          __e109 = __e110;
        }
        var __c121 = __e109;
        __id1311 = __id1311 + __c121;
        __i64 = __i64 + 1;
      }
      if (raw63) {
        return __id1311;
      } else {
        if (reserved63(__id1311)) {
          return __x989 + __id1311;
        } else {
          return __id1311;
        }
      }
    }
  }
};
valid_id63 = function (x) {
  return some63(x) && x === compile_id(x);
};
var __names10 = {};
unique = function (x) {
  var __x990 = compile_id(x);
  if (has63(__names10, __x990)) {
    var __i65 = __names10[__x990];
    __names10[__x990] = __names10[__x990] + 1;
    return unique(__x990 + __i65);
  } else {
    __names10[__x990] = 1;
    return "__" + __x990;
  }
};
key = function (k) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    return k;
  } else {
    var __i66 = inner(k);
    if (valid_id63(__i66)) {
      return __i66;
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
  var __o35 = [];
  var ____o36 = t;
  var __k56 = undefined;
  for (__k56 in ____o36) {
    var __v42 = ____o36[__k56];
    var __e113 = undefined;
    if (numeric63(__k56)) {
      __e113 = parseInt(__k56);
    } else {
      __e113 = __k56;
    }
    var __k57 = __e113;
    var __x991 = f(__v42);
    if (is63(__x991)) {
      add(__o35, literal(__k57));
      add(__o35, __x991);
    }
  }
  return __o35;
};
var ____x993 = object([]);
var ____x994 = object([]);
____x994.js = "!";
____x994.lua = "not";
____x994.py = "not";
____x993["%not"] = ____x994;
____x993["%unm"] = "-";
var ____x995 = object([]);
____x995["%mul"] = "*";
____x995["%div"] = "/";
____x995["%idiv"] = "//";
____x995["%mod"] = "%";
var ____x996 = object([]);
var ____x997 = object([]);
____x997.js = "+";
____x997.lua = "..";
____x997.py = "+";
____x996["%cat"] = ____x997;
var ____x998 = object([]);
____x998["%add"] = "+";
____x998["%sub"] = "-";
var ____x999 = object([]);
____x999["%lt"] = "<";
____x999["%gt"] = ">";
____x999["%le"] = "<=";
____x999["%ge"] = ">=";
var ____x1000 = object([]);
var ____x1001 = object([]);
____x1001.js = "===";
____x1001.lua = "==";
____x1001.py = "==";
____x1000["%eq"] = ____x1001;
var ____x1002 = object([]);
var ____x1003 = object([]);
____x1003.py = "in";
____x1002["%in"] = ____x1003;
var ____x1004 = object([]);
____x1004.py = "is";
____x1002["%is"] = ____x1004;
var ____x1005 = object([]);
var ____x1006 = object([]);
____x1006.js = "&&";
____x1006.lua = "and";
____x1006.py = "and";
____x1005["%and"] = ____x1006;
var ____x1007 = object([]);
var ____x1008 = object([]);
____x1008.js = "||";
____x1008.lua = "or";
____x1008.py = "or";
____x1007["%or"] = ____x1008;
var infix = [____x993, ____x995, ____x996, ____x998, ____x999, ____x1000, ____x1002, ____x1005, ____x1007];
var unary63 = function (form) {
  return two63(form) && in63(hd(form), ["%not", "%unm"]);
};
var index = function (k) {
  return k;
};
var precedence = function (form) {
  if (!( atom63(form) || unary63(form))) {
    if (atom63(hd(form))) {
      var ____o37 = infix;
      var __k58 = undefined;
      for (__k58 in ____o37) {
        var __v43 = ____o37[__k58];
        var __e114 = undefined;
        if (numeric63(__k58)) {
          __e114 = parseInt(__k58);
        } else {
          __e114 = __k58;
        }
        var __k59 = __e114;
        if (has63(__v43, hd(form))) {
          return index(__k59);
        }
      }
    }
  }
  return 0;
};
var getop = function (op) {
  if (string63(op)) {
    return find(function (level) {
      var __x1010 = has(level, op);
      if (__x1010 === true) {
        return op;
      } else {
        if (string63(__x1010)) {
          return __x1010;
        } else {
          if (is63(__x1010)) {
            return has(__x1010, has(setenv("target", {
              _stash: true,
              toplevel: true
            }), "value"));
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
  var __s5 = "(";
  var __c13 = "";
  var ____x1011 = args;
  var ____i69 = 0;
  while (____i69 < _35(____x1011)) {
    var __x1012 = ____x1011[____i69];
    __s5 = __s5 + (__c13 + compile(__x1012));
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py" && (default63 && (! id_literal63(__x1012) && !( __x1012 === "...")))) {
      __s5 = __s5 + "=None";
    }
    __c13 = ", ";
    ____i69 = ____i69 + 1;
  }
  return __s5 + ")";
};
var escape_newlines = function (s) {
  if (nil63(search(s, "\n")) && nil63(search(s, "\r"))) {
    return s;
  } else {
    var __s12 = "";
    var __i70 = 0;
    while (__i70 < _35(s)) {
      var __c14 = char(s, __i70);
      var __e115 = undefined;
      if (__c14 === "\n") {
        __e115 = "\\n";
      } else {
        var __e116 = undefined;
        if (__c14 === "\r") {
          __e116 = "\\r";
        } else {
          __e116 = __c14;
        }
        __e115 = __e116;
      }
      __s12 = __s12 + __e115;
      __i70 = __i70 + 1;
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
  var ____id137 = form;
  var __x1013 = has(____id137, 0);
  var __args54 = cut(____id137, 1);
  var ____id138 = getenv(__x1013);
  var __special = has(____id138, "special");
  var __stmt = has(____id138, "stmt");
  var __self_tr63 = has(____id138, "tr");
  var __e117 = undefined;
  if (stmt63 && ! __stmt) {
    __e117 = indentation();
  } else {
    __e117 = "";
  }
  var __p1 = __e117;
  var __tr = terminator(stmt63 && ! __self_tr63);
  return __p1 + (apply(__special, __args54) + __tr);
};
var parenthesize_call63 = function (x) {
  return ! atom63(x) && hd(x) === "%function" || precedence(x) > 0;
};
method_call63 = function (form) {
  var __e118 = undefined;
  if (list63(form)) {
    __e118 = hd(form);
  } else {
    __e118 = form;
  }
  var __x1014 = __e118;
  return string63(__x1014) && (_35(__x1014, 1) > 1 && char(__x1014, 0) === ".");
};
var compile_call = function (form) {
  var __f4 = hd(form);
  var __f11 = compile(__f4);
  var __args55 = stash42(tl(form));
  var __e119 = undefined;
  if (method_call63(hd(__args55))) {
    __e119 = mapcat(compile, __args55, "");
  } else {
    __e119 = compile_args(__args55);
  }
  var __args56 = __e119;
  if (parenthesize_call63(__f4)) {
    return "(" + (__f11 + (")" + __args56));
  } else {
    return __f11 + __args56;
  }
};
var op_delims = function (parent, child, ..._42args) {
  var ____r350 = unstash([..._42args]);
  var __parent = destash33(parent, ____r350);
  var __child = destash33(child, ____r350);
  var ____id139 = ____r350;
  var __right = has(____id139, "right");
  var __e120 = undefined;
  if (__right) {
    __e120 = _6261;
  } else {
    __e120 = _62;
  }
  if (__e120(precedence(__child), precedence(__parent))) {
    return ["(", ")"];
  } else {
    return ["", ""];
  }
};
var compile_infix = function (form) {
  var ____id140 = form;
  var __op = has(____id140, 0);
  var ____id141 = cut(____id140, 1);
  var __a28 = has(____id141, 0);
  var __b8 = has(____id141, 1);
  var ____id142 = op_delims(form, __a28);
  var __ao = has(____id142, 0);
  var __ac = has(____id142, 1);
  var ____id143 = op_delims(form, __b8, {
    _stash: true,
    right: true
  });
  var __bo = has(____id143, 0);
  var __bc = has(____id143, 1);
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
  var ____x1018 = compile(body, {
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
  var __s6 = ____x1018;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py" && none63(__s6)) {
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x1019 = indentation() + "pass\n";
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    return ____x1019;
  } else {
    return __s6;
  }
};
compile_function = function (args, body, ..._42args) {
  var ____r353 = unstash([..._42args]);
  var __args57 = destash33(args, ____r353);
  var __body78 = destash33(body, ____r353);
  var ____id144 = ____r353;
  var __name23 = has(____id144, "name");
  var __prefix = has(____id144, "prefix");
  var __async = has(____id144, "async");
  var __e121 = undefined;
  if (__name23) {
    __e121 = compile(__name23);
  } else {
    __e121 = "";
  }
  var __id145 = __e121;
  var __e122 = undefined;
  if (has(__args57, "rest")) {
    __e122 = join(__args57, ["..."]);
  } else {
    __e122 = __args57;
  }
  var __args141 = __e122;
  var __args58 = compile_args(__args141, true);
  var __body79 = compile_body(__body78);
  var __ind = indentation();
  var __e123 = undefined;
  if (__prefix) {
    __e123 = __prefix + " ";
  } else {
    __e123 = "";
  }
  var __p2 = __e123;
  var __e124 = undefined;
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    __e124 = "";
  } else {
    __e124 = "end";
  }
  var __tr1 = __e124;
  var __e125 = undefined;
  if (__async && !( has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "lua")) {
    __e125 = "async ";
  } else {
    __e125 = "";
  }
  var __a30 = __e125;
  if (__name23) {
    __tr1 = __tr1 + "\n";
  }
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "js") {
    return __a30 + ("function " + (__id145 + (__args58 + (" {\n" + (__body79 + (__ind + ("}" + __tr1)))))));
  } else {
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __e126 = undefined;
      if (none63(__ind)) {
        __e126 = "\n";
      } else {
        __e126 = "";
      }
      var __ws = __e126;
      return __a30 + ("def " + (__id145 + (__args58 + (":\n" + (__body79 + __ws)))));
    } else {
      return __p2 + ("function " + (__id145 + (__args58 + ("\n" + (__body79 + (__ind + __tr1))))));
    }
  }
};
var can_return63 = function (form) {
  return is63(form) && (atom63(form) || !( hd(form) === "%return") && ! statement63(hd(form)));
};
compile = function (form, raw63, ..._42args) {
  var ____r355 = unstash([..._42args]);
  var __form10 = destash33(form, ____r355);
  var __raw63 = destash33(raw63, ____r355);
  var ____id146 = ____r355;
  var __stmt1 = has(____id146, "stmt");
  if (nil63(__form10)) {
    return "";
  } else {
    if (special_form63(__form10)) {
      return compile_special(__form10, __stmt1);
    } else {
      var __tr2 = terminator(__stmt1);
      var __e127 = undefined;
      if (__stmt1) {
        __e127 = indentation();
      } else {
        __e127 = "";
      }
      var __ind1 = __e127;
      var __e128 = undefined;
      if (atom63(__form10)) {
        __e128 = compile_atom(__form10, __raw63);
      } else {
        var __e129 = undefined;
        if (infix63(hd(__form10))) {
          __e129 = compile_infix(__form10);
        } else {
          __e129 = compile_call(__form10);
        }
        __e128 = __e129;
      }
      var __form11 = __e128;
      return __ind1 + (__form11 + __tr2);
    }
  }
};
var lower_statement = function (form, tail63) {
  var __hoist = [];
  var __e12 = lower(form, __hoist, true, tail63);
  var __e130 = undefined;
  if (some63(__hoist) && is63(__e12)) {
    __e130 = join(["%do"], __hoist, [__e12]);
  } else {
    var __e131 = undefined;
    if (is63(__e12)) {
      __e131 = __e12;
    } else {
      var __e132 = undefined;
      if (_35(__hoist) > 1) {
        __e132 = join(["%do"], __hoist);
      } else {
        __e132 = hd(__hoist);
      }
      __e131 = __e132;
    }
    __e130 = __e131;
  }
  return either(__e130, ["%do"]);
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
  var ____x1028 = almost(args);
  var ____i71 = 0;
  while (____i71 < _35(____x1028)) {
    var __x1029 = ____x1028[____i71];
    var ____y8 = lower(__x1029, hoist, stmt63);
    if (yes(____y8)) {
      var __e13 = ____y8;
      if (standalone63(__e13)) {
        add(hoist, __e13);
      }
    }
    ____i71 = ____i71 + 1;
  }
  var __e14 = lower(last(args), hoist, stmt63, tail63);
  if (tail63 && can_return63(__e14)) {
    return ["%return", __e14];
  } else {
    return __e14;
  }
};
var lower_set = function (args, hoist, stmt63, tail63) {
  var ____id147 = args;
  var __lh4 = has(____id147, 0);
  var __rh4 = has(____id147, 1);
  var __lh11 = lower(__lh4, hoist);
  var __rh11 = lower(__rh4, hoist);
  add(hoist, ["%set", __lh11, __rh11]);
  if (!( stmt63 && ! tail63)) {
    return __lh11;
  }
};
var lower_if = function (args, hoist, stmt63, tail63) {
  var ____id148 = args;
  var __cond8 = has(____id148, 0);
  var __then = has(____id148, 1);
  var ___else = has(____id148, 2);
  if (stmt63) {
    var __e134 = undefined;
    if (is63(___else)) {
      __e134 = [lower_body([___else], tail63)];
    }
    return add(hoist, join(["%if", lower(__cond8, hoist), lower_body([__then], tail63)], __e134));
  } else {
    var __e15 = unique("e");
    add(hoist, ["%local", __e15, "nil"]);
    var __e133 = undefined;
    if (is63(___else)) {
      __e133 = [lower(["%set", __e15, ___else])];
    }
    add(hoist, join(["%if", lower(__cond8, hoist), lower(["%set", __e15, __then])], __e133));
    return __e15;
  }
};
var lower_short = function (x, args, hoist) {
  var ____id149 = args;
  var __a31 = has(____id149, 0);
  var __b10 = has(____id149, 1);
  var __hoist1 = [];
  var __b11 = lower(__b10, __hoist1);
  if (some63(__hoist1)) {
    var __id150 = unique("id");
    var __e135 = undefined;
    if (x === "%and") {
      __e135 = ["%if", __id150, __b10, __id150];
    } else {
      __e135 = ["%if", __id150, __id150, __b10];
    }
    return lower(["%do", ["%local", __id150, __a31], __e135], hoist);
  } else {
    return [x, lower(__a31, hoist), __b11];
  }
};
var lower_try = function (args, hoist, tail63) {
  return add(hoist, ["%try", lower_body(args, tail63)]);
};
var lower_while = function (args, hoist) {
  var ____id151 = args;
  var __c15 = has(____id151, 0);
  var __body80 = cut(____id151, 1);
  var __pre1 = [];
  var __c16 = lower(__c15, __pre1);
  var __e136 = undefined;
  if (none63(__pre1)) {
    __e136 = ["%while", __c16, lower_body(__body80)];
  } else {
    __e136 = ["%while", true, join(["%do"], __pre1, [["%if", ["%not", __c16], ["%break"]], lower_body(__body80)])];
  }
  return add(hoist, __e136);
};
var lower_for = function (args, hoist) {
  var ____id152 = args;
  var __h = has(____id152, 0);
  var __k60 = has(____id152, 1);
  var __body81 = cut(____id152, 2);
  return add(hoist, join(["%for", lower(__h, hoist), __k60, lower_body(__body81)], props(__body81)));
};
var lower_with = function (args, hoist, stmt63, tail63) {
  var ____id153 = args;
  var __h1 = has(____id153, 0);
  var __body82 = cut(____id153, 1);
  if (stmt63 && ! tail63) {
    return add(hoist, join(["%with", lower(__h1, hoist), lower_body(__body82, tail63)], props(__body82)));
  } else {
    var __e16 = unique("e");
    add(hoist, ["%local", __e16]);
    add(hoist, join(["%with", lower(__h1, hoist), lower(["%set", __e16, join(["%do"], __body82)])], props(__body82)));
    return __e16;
  }
};
var lower_block = function (args, hoist, stmt63, tail63) {
  var ____id154 = args;
  var __name24 = has(____id154, 0);
  var __h2 = has(____id154, 1);
  var __body83 = cut(____id154, 2);
  return add(hoist, ["%block", __name24, lower(__h2, hoist), lower_body(__body83, tail63)]);
};
var lower_from = function (args, hoist, stmt63, tail63) {
  var ____id155 = args;
  var __name25 = has(____id155, 0);
  var __import_ = has(____id155, 1);
  var __id156 = has(____id155, 2);
  var __as_ = has(____id155, 3);
  var __alias = has(____id155, 4);
  add(hoist, join(["from"], args));
  return __alias || __id156;
};
var lower_import = function (__x1062, hoist, stmt63, tail63) {
  var ____id157 = __x1062;
  var __name26 = has(____id157, 0);
  var __alias1 = cut(____id157, 1);
  var __e137 = undefined;
  if (hd(__alias1) === "as") {
    __e137 = __alias1[1];
  } else {
    __e137 = hd(__alias1);
  }
  var __as = __e137;
  var __id158 = __as || __name26;
  add(hoist, join(["import", __name26], __alias1));
  if (! stmt63) {
    return __id158;
  }
};
var lower_function = function (args, hoist) {
  if (has(setenv("target", {
    _stash: true,
    toplevel: true
  }), "value") === "py") {
    var __f5 = unique("f");
    return lower(["%do", join(["%local-function", __f5], args), __f5], hoist);
  } else {
    var ____id159 = args;
    var __a32 = has(____id159, 0);
    var __body84 = cut(____id159, 1);
    return join(["%function", __a32, lower_body(__body84, true)], props(__body84));
  }
};
var lower_definition = function (kind, args, hoist) {
  var ____id160 = args;
  var __name27 = has(____id160, 0);
  var __args59 = has(____id160, 1);
  var __body85 = cut(____id160, 2);
  return add(hoist, join([kind, __name27, __args59, lower_body(__body85, true)], props(__body85)));
};
var lower_call = function (form, hoist) {
  var __form12 = map(function (x) {
    return lower(x, hoist);
  }, form);
  if (some63(__form12)) {
    return __form12;
  }
};
var pairwise63 = function (form) {
  return in63(hd(form), ["%lt", "%le", "%eq", "%ge", "%gt"]);
};
var lower_pairwise = function (form) {
  if (pairwise63(form)) {
    var __e17 = [];
    var ____id161 = form;
    var __x1069 = has(____id161, 0);
    var __args60 = cut(____id161, 1);
    reduce(function (a, b) {
      add(__e17, [__x1069, a, b]);
      return a;
    }, __args60);
    return join(["%and"], reverse(__e17));
  } else {
    return form;
  }
};
var lower_infix63 = function (form) {
  return infix63(hd(form)) && _35(form) > 3;
};
var lower_infix = function (form, hoist) {
  var __form13 = lower_pairwise(form);
  var ____id162 = __form13;
  var __x1072 = has(____id162, 0);
  var __args61 = cut(____id162, 1);
  return lower(reduce(function (a, b) {
    return [__x1072, b, a];
  }, reverse(__args61)), hoist);
};
var lower_special = function (form, hoist) {
  var __e18 = lower_call(form, hoist);
  if (__e18) {
    return add(hoist, __e18);
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
          var ____id163 = form;
          var __x1075 = has(____id163, 0);
          var __args62 = cut(____id163, 1);
          if (__x1075 === "%do") {
            return lower_do(__args62, hoist, stmt63, tail63);
          } else {
            if (__x1075 === "%call") {
              return lower(__args62, hoist, stmt63, tail63);
            } else {
              if (__x1075 === "%set") {
                return lower_set(__args62, hoist, stmt63, tail63);
              } else {
                if (__x1075 === "%if") {
                  return lower_if(__args62, hoist, stmt63, tail63);
                } else {
                  if (__x1075 === "%try") {
                    return lower_try(__args62, hoist, tail63);
                  } else {
                    if (__x1075 === "%while") {
                      return lower_while(__args62, hoist);
                    } else {
                      if (__x1075 === "%for") {
                        return lower_for(__args62, hoist);
                      } else {
                        if (__x1075 === "%with") {
                          return lower_with(__args62, hoist, stmt63, tail63);
                        } else {
                          if (__x1075 === "%block") {
                            return lower_block(__args62, hoist, stmt63, tail63);
                          } else {
                            if (__x1075 === "%cases") {
                              return lower_cases(__args62, hoist, stmt63, tail63);
                            } else {
                              if (__x1075 === "import") {
                                return lower_import(__args62, hoist, stmt63, tail63);
                              } else {
                                if (__x1075 === "from") {
                                  return lower_from(__args62, hoist, stmt63, tail63);
                                } else {
                                  if (__x1075 === "%function") {
                                    return lower_function(__args62, hoist);
                                  } else {
                                    if (__x1075 === "%local-function" || __x1075 === "%global-function") {
                                      return lower_definition(__x1075, __args62, hoist);
                                    } else {
                                      if (in63(__x1075, ["%and", "%or"])) {
                                        return lower_short(__x1075, __args62, hoist);
                                      } else {
                                        if (statement63(__x1075)) {
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
var __e138 = undefined;
if (typeof(global) === "undefined") {
  var __e139 = undefined;
  if (!( typeof(window) === "undefined")) {
    __e139 = window;
  } else {
    var __e140 = undefined;
    if (!( typeof(self) === "undefined")) {
      __e140 = self;
    } else {
      __e140 = this;
    }
    __e139 = __e140;
  }
  global = __e139;
  __e138 = global;
}
var __e141 = undefined;
if (!( typeof(require) === "undefined")) {
  global.require = require;
  global.require;
  var __e142 = undefined;
  if (!( typeof(__module1) === "undefined")) {
    __module1.filename = require("path").resolve("repl");
    __module1.filename;
    __module1.paths = require("module")._nodeModulePaths(__module1.filename);
    __e142 = __module1.paths;
  }
  __e141 = __e142;
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
  special: function (..._42args) {
    var __forms10 = unstash([..._42args]);
    var __s8 = "";
    var ____x1082 = __forms10;
    var ____i73 = 0;
    while (____i73 < _35(____x1082)) {
      var __x1083 = ____x1082[____i73];
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua" && (immediate_call63(__x1083) && "\n" === char(__s8, edge(__s8)))) {
        __s8 = clip(__s8, 0, edge(__s8)) + ";\n";
      }
      __s8 = __s8 + compile(__x1083, {
        _stash: true,
        stmt: true
      });
      if (! atom63(__x1083)) {
        if (hd(__x1083) === "%return" || hd(__x1083) === "%break") {
          break;
        }
      }
      ____i73 = ____i73 + 1;
    }
    return __s8;
  },
  stmt: true,
  tr: true
});
setenv("%if", {
  _stash: true,
  special: function (cond, cons, alt) {
    var __cond10 = compile(cond);
    var __cons1 = compile_body(cons);
    var __e143 = undefined;
    if (alt) {
      __e143 = compile_body(alt);
    }
    var __alt1 = __e143;
    var __ind3 = indentation();
    var __s10 = "";
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __s10 = __s10 + (__ind3 + ("if (" + (__cond10 + (") {\n" + (__cons1 + (__ind3 + "}"))))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __s10 = __s10 + (__ind3 + ("if " + (__cond10 + (":\n" + __cons1))));
      } else {
        __s10 = __s10 + (__ind3 + ("if " + (__cond10 + (" then\n" + __cons1))));
      }
    }
    if (__alt1 && has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __s10 = __s10 + (" else {\n" + (__alt1 + (__ind3 + "}")));
    } else {
      if (__alt1 && has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __s10 = __s10 + (__ind3 + ("else:\n" + __alt1));
      } else {
        if (__alt1) {
          __s10 = __s10 + (__ind3 + ("else\n" + __alt1));
        }
      }
    }
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return __s10 + (__ind3 + "end\n");
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "js") {
        return __s10 + "\n";
      } else {
        return __s10;
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%while", {
  _stash: true,
  special: function (cond, form) {
    var __cond12 = compile(cond);
    var __body87 = compile_body(form);
    var __ind5 = indentation();
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind5 + ("while (" + (__cond12 + (") {\n" + (__body87 + (__ind5 + "}\n")))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind5 + ("while " + (__cond12 + (":\n" + __body87)));
      } else {
        return __ind5 + ("while " + (__cond12 + (" do\n" + (__body87 + (__ind5 + "end\n")))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%for", {
  _stash: true,
  special: function (t, k, form, ..._42args) {
    var ____r393 = unstash([..._42args]);
    var __t9 = destash33(t, ____r393);
    var __k63 = destash33(k, ____r393);
    var __form15 = destash33(form, ____r393);
    var ____id165 = ____r393;
    var __async2 = has(____id165, "async");
    var __t10 = compile(__t9);
    var __k64 = compile(__k63);
    var __ind7 = indentation();
    var __body89 = compile_body(__form15);
    var __e144 = undefined;
    if (__async2) {
      __e144 = "async ";
    } else {
      __e144 = "";
    }
    var __a34 = __e144;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      return __ind7 + ("for " + (__k64 + (" in next, " + (__t10 + (" do\n" + (__body89 + (__ind7 + "end\n")))))));
    } else {
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        return __ind7 + (__a34 + ("for " + (__k64 + (" in " + (__t10 + (":\n" + __body89))))));
      } else {
        return __ind7 + ("for (" + (__k64 + (" in " + (__t10 + (") {\n" + (__body89 + (__ind7 + "}\n")))))));
      }
    }
  },
  stmt: true,
  tr: true
});
setenv("%with", {
  _stash: true,
  special: function (t, form, ..._42args) {
    var ____r395 = unstash([..._42args]);
    var __t13 = destash33(t, ____r395);
    var __form17 = destash33(form, ____r395);
    var ____id167 = ____r395;
    var __async4 = has(____id167, "async");
    var __t14 = compile(__t13);
    var __ind9 = indentation();
    var __body91 = compile_body(__form17);
    var __e145 = undefined;
    if (__async4) {
      __e145 = "async ";
    } else {
      __e145 = "";
    }
    var __a36 = __e145;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind9 + (__a36 + ("with " + (__t14 + (":\n" + __body91))));
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
    var __t16 = compile(t);
    var __ind11 = indentation();
    var __body93 = compile_body(form);
    var __e146 = undefined;
    if (some63(__t16)) {
      __e146 = " ";
    } else {
      __e146 = "";
    }
    var __sep1 = __e146;
    var __e147 = undefined;
    if (some63(__t16)) {
      __e147 = "(";
    } else {
      __e147 = "";
    }
    var __lh6 = __e147;
    var __e148 = undefined;
    if (some63(__t16)) {
      __e148 = ")";
    } else {
      __e148 = "";
    }
    var __rh6 = __e148;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      return __ind11 + (name + (__sep1 + (__t16 + (":\n" + __body93))));
    } else {
      return __ind11 + (name + (__sep1 + (__lh6 + (__t16 + (__rh6 + (__sep1 + ("{\n" + (__body93 + (__ind11 + "}\n")))))))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%try", {
  _stash: true,
  special: function (form) {
    var __ind13 = indentation();
    var __body95 = compile_body(form);
    var __e149 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e149 = ["%do", ["import", "sys"], ["%local", "e", [["%idx", "sys", "exc_info"]]], ["%return", ["%array", false, ["%get", "e", 1], "e"]]];
    } else {
      __e149 = ["%return", ["%array", false, "e"]];
    }
    var __hf1 = __e149;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x1109 = compile(__hf1, {
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
    var __h4 = ____x1109;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      return __ind13 + ("try {\n" + (__body95 + (__ind13 + ("}\n" + (__ind13 + ("catch (e) {\n" + (__h4 + (__ind13 + "}\n"))))))));
    } else {
      return __ind13 + ("try:\n" + (__body95 + (__ind13 + ("except:\n" + __h4))));
    }
  },
  stmt: true,
  tr: true
});
setenv("%delete", {
  _stash: true,
  special: function (place) {
    var __e150 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      __e150 = "del ";
    } else {
      __e150 = "delete ";
    }
    return indentation() + (__e150 + compile(place));
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
  special: function (args, ..._42args) {
    var ____r405 = unstash([..._42args]);
    var __args64 = destash33(args, ____r405);
    var ____id169 = ____r405;
    var __body97 = cut(____id169, 0);
    return apply(compile_function, join([__args64], __body97, []));
  }
});
setenv("%global-function", {
  _stash: true,
  special: function (name, args, ..._42args) {
    var ____r407 = unstash([..._42args]);
    var __name29 = destash33(name, ____r407);
    var __args66 = destash33(args, ____r407);
    var ____id171 = ____r407;
    var __body99 = cut(____id171, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x1124 = object([__args66]);
      ____x1124.name = __name29;
      var ____x1125 = object([]);
      ____x1125.name = __name29;
      var __x1123 = apply(compile_function, join(____x1124, __body99, ____x1125));
      return indentation() + __x1123;
    } else {
      return compile(["%set", __name29, join(["%function", __args66], __body99)], {
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
  special: function (name, args, ..._42args) {
    var ____r409 = unstash([..._42args]);
    var __name31 = destash33(name, ____r409);
    var __args68 = destash33(args, ____r409);
    var ____id173 = ____r409;
    var __body101 = cut(____id173, 0);
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua" || has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var ____x1136 = object([__args68]);
      ____x1136.name = __name31;
      ____x1136.prefix = "local";
      var ____x1137 = object([]);
      ____x1137.name = __name31;
      ____x1137.prefix = "local";
      var __x1135 = apply(compile_function, join(____x1136, __body101, ____x1137));
      return indentation() + __x1135;
    } else {
      return compile(["%local", __name31, join(["%function", __args68], __body101)], {
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
    var __e151 = undefined;
    if (nil63(x)) {
      __e151 = "return";
    } else {
      __e151 = "return " + compile(x);
    }
    var __x1141 = __e151;
    return indentation() + __x1141;
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
    var __e152 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e152 = "throw " + compile(["%new", ["Error", x]]);
    } else {
      var __e153 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e153 = "raise " + compile(["Exception", x]);
      } else {
        __e153 = "error(" + (compile(x) + ")");
      }
      __e152 = __e153;
    }
    var __e31 = __e152;
    return indentation() + __e31;
  },
  stmt: true
});
setenv("%throw", {
  _stash: true,
  special: function (x) {
    var __e154 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e154 = "throw " + compile(x);
    } else {
      var __e155 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "py") {
        __e155 = "raise " + compile(x);
      } else {
        __e155 = "error(" + (compile(x) + ")");
      }
      __e154 = __e155;
    }
    var __e35 = __e154;
    return indentation() + __e35;
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
    var __id175 = compile(name);
    var __value12 = compile(value);
    var __e156 = undefined;
    if (is63(value)) {
      __e156 = " = " + __value12;
    } else {
      __e156 = "";
    }
    var __rh8 = __e156;
    var __e157 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "js") {
      __e157 = "var ";
    } else {
      var __e158 = undefined;
      if (has(setenv("target", {
        _stash: true,
        toplevel: true
      }), "value") === "lua") {
        __e158 = "local ";
      } else {
        __e158 = "";
      }
      __e157 = __e158;
    }
    var __keyword3 = __e157;
    var __ind15 = indentation();
    return __ind15 + (__keyword3 + (__id175 + __rh8));
  },
  stmt: true
});
setenv("%set", {
  _stash: true,
  special: function (lh, rh) {
    var __lh8 = compile(lh);
    var __e159 = undefined;
    if (nil63(rh)) {
      __e159 = "nil";
    } else {
      __e159 = rh;
    }
    var __rh10 = compile(__e159);
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
    var __k141 = compile(k, "raw");
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
  special: function (..._42args) {
    var __forms12 = unstash([..._42args]);
    var __e160 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e160 = "{";
    } else {
      __e160 = "[";
    }
    var __open1 = __e160;
    var __e161 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e161 = "}";
    } else {
      __e161 = "]";
    }
    var __close1 = __e161;
    var __s121 = "";
    var __c18 = "";
    var ____o39 = __forms12;
    var __k67 = undefined;
    for (__k67 in ____o39) {
      var __v45 = ____o39[__k67];
      var __e162 = undefined;
      if (numeric63(__k67)) {
        __e162 = parseInt(__k67);
      } else {
        __e162 = __k67;
      }
      var __k68 = __e162;
      if (number63(__k68)) {
        __s121 = __s121 + (__c18 + compile(__v45));
        __c18 = ", ";
      }
    }
    return __open1 + (__s121 + __close1);
  }
});
setenv("%object", {
  _stash: true,
  special: function (..._42args) {
    var __forms14 = unstash([..._42args]);
    var __s14 = "{";
    var __c20 = "";
    var __e163 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e163 = " = ";
    } else {
      __e163 = ": ";
    }
    var __sep3 = __e163;
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") + 1;
    var ____x1154 = indentation();
    setenv("indent-level", {
      _stash: true,
      toplevel: true
    }).value = has(setenv("indent-level", {
      _stash: true,
      toplevel: true
    }), "value") - 1;
    var __ind17 = ____x1154;
    var __e164 = undefined;
    if (_35(__forms14) > 2) {
      __e164 = "\n" + __ind17;
    }
    var __pad1 = __e164;
    var __e165 = undefined;
    if (is63(__pad1)) {
      __e165 = "\n" + indentation();
    } else {
      __e165 = "";
    }
    var __end1 = __e165;
    __s14 = __s14 + either(__pad1, "");
    var ____o41 = pair(__forms14);
    var __k72 = undefined;
    for (__k72 in ____o41) {
      var __v48 = ____o41[__k72];
      var __e166 = undefined;
      if (numeric63(__k72)) {
        __e166 = parseInt(__k72);
      } else {
        __e166 = __k72;
      }
      var __k73 = __e166;
      if (number63(__k73)) {
        var ____id177 = __v48;
        var __k74 = has(____id177, 0);
        var __v49 = has(____id177, 1);
        if (! string63(__k74)) {
          throw new Error("Illegal key: " + str(__k74));
        }
        setenv("indent-level", {
          _stash: true,
          toplevel: true
        }).value = has(setenv("indent-level", {
          _stash: true,
          toplevel: true
        }), "value") + 1;
        var ____x1155 = compile(__v49);
        setenv("indent-level", {
          _stash: true,
          toplevel: true
        }).value = has(setenv("indent-level", {
          _stash: true,
          toplevel: true
        }), "value") - 1;
        __s14 = __s14 + (__c20 + (key(__k74) + (__sep3 + ____x1155)));
        __c20 = "," + either(__pad1, " ");
      }
    }
    return __s14 + (__end1 + "}");
  }
});
setenv("%list", {
  _stash: true,
  special: function (form, comps, cond, ..._42args) {
    var ____r429 = unstash([..._42args]);
    var __form19 = destash33(form, ____r429);
    var __comps5 = destash33(comps, ____r429);
    var __cond14 = destash33(cond, ____r429);
    var ____id181 = ____r429;
    var __kind5 = has(____id181, "kind");
    var __s16 = compile(__form19);
    var __e167 = undefined;
    if (__kind5 === "object") {
      __e167 = ["{", "}"];
    } else {
      __e167 = ["[", "]"];
    }
    var ____id182 = __e167;
    var __lh10 = has(____id182, 0);
    var __rh12 = has(____id182, 1);
    if (!( __kind5 === "object")) {
      __s16 = "(" + (__s16 + ")");
    }
    var ____x1163 = __comps5;
    var ____i79 = 0;
    while (____i79 < _35(____x1163)) {
      var ____id183 = ____x1163[____i79];
      var __k76 = has(____id183, 0);
      var __v51 = has(____id183, 1);
      __s16 = __s16 + (" for " + (compile(__k76) + (" in " + compile(__v51))));
      ____i79 = ____i79 + 1;
    }
    if (is63(__cond14)) {
      __s16 = __s16 + (" if " + compile(__cond14));
    }
    return __lh10 + (__s16 + __rh12);
  }
});
setenv("%literal", {
  _stash: true,
  special: function (..._42args) {
    var __args70 = unstash([..._42args]);
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
  special: function (name, ..._42args) {
    var ____r433 = unstash([..._42args]);
    var __name33 = destash33(name, ____r433);
    var ____id186 = ____r433;
    var __alias3 = cut(____id186, 0);
    var __ind19 = indentation();
    var __e168 = undefined;
    if (hd(__alias3) === "as") {
      __e168 = __alias3[1];
    } else {
      __e168 = hd(__alias3);
    }
    var __as2 = __e168;
    var __id187 = __as2 || __name33;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __s18 = __ind19 + ("import " + compile(__name33));
      if (__as2) {
        __s18 = __s18 + (" as " + compile(__id187));
      }
      return __s18;
    } else {
      return __ind19 + compile(["%local", __id187, ["require", escape(__name33)]]);
    }
  },
  stmt: true
});
setenv("from", {
  _stash: true,
  special: function (name, ..._42args) {
    var ____r437 = unstash([..._42args]);
    var __name35 = destash33(name, ____r437);
    var ____id190 = ____r437;
    var __imports1 = cut(____id190, 0);
    var __ind21 = indentation();
    var __id191 = __name35;
    var __r438 = undefined;
    __r438 = drop(__imports1);
    var __e169 = undefined;
    if (last(__imports1) === "as") {
      __e169 = drop(__imports1);
    } else {
      add(__imports1, __r438);
      __r438 = undefined;
      __e169 = __r438;
    }
    var __as4 = __r438;
    var __e170 = undefined;
    if (hd(__imports1) === "import") {
      __e170 = tl(__imports1);
    } else {
      __e170 = __imports1;
    }
    var __names13 = __e170;
    var __names14 = mapcat(function (x) {
      if (x === "*") {
        return x;
      } else {
        return compile(x);
      }
    }, __names13, ", ");
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "py") {
      var __s20 = __ind21 + ("from " + (compile(__name35) + (" import " + __names14)));
      if (__as4) {
        __s20 = __s20 + (" as " + compile(__as4));
      }
      return __s20;
    } else {
      return "";
    }
  },
  stmt: true
});
setenv(",", {
  _stash: true,
  special: function (..._42args) {
    var __args72 = unstash([..._42args]);
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
  special: function (..._42args) {
    var __args74 = unstash([..._42args]);
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
  special: function (..._42args) {
    var __args76 = unstash([..._42args]);
    return indentation() + ("yield " + mapcat(compile, __args76, ", "));
  },
  stmt: true
});
setenv("await", {
  _stash: true,
  special: function (x) {
    var __e171 = undefined;
    if (has(setenv("target", {
      _stash: true,
      toplevel: true
    }), "value") === "lua") {
      __e171 = "";
    } else {
      __e171 = "await ";
    }
    var __a38 = __e171;
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
__exports1.eval = _eval;
__exports1.eval;
__exports1.expand = expand;
__exports1.expand;
__exports1.compile = compile;
__exports1.compile;
pymen.compiler = __exports1;
exports.pymen = pymen;
