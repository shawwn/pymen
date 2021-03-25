if (typeof(environment) === "undefined") {
  environment = [{}];
}
nil63 = function (x) {
  return x === undefined || x === null;
};
nil63 = nil63;
is63 = function (x) {
  return ! nil63(x);
};
is63 = is63;
no = function (x) {
  return nil63(x) || x === false;
};
no = no;
yes = function (x) {
  return ! no(x);
};
yes = yes;
either = function (x, y) {
  if (is63(x)) {
    return x;
  } else {
    return y;
  }
};
either = either;
has63 = function (l, k) {
  return l.hasOwnProperty(k);
};
has63 = has63;
has = function (l, k, _else) {
  if (has63(l, k)) {
    return l[k];
  } else {
    return _else;
  }
};
has = has;
array63 = function (x) {
  return Array.isArray(x);
};
array63 = array63;
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
array = array;
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
object = object;
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
  }
};
length = length;
_35 = function (x, upto) {
  if (string63(x) || array63(x)) {
    return x.length;
  } else {
    return length(x, upto);
  }
};
_35 = _35;
none63 = function (x) {
  return _35(x, 0) === 0;
};
none63 = none63;
some63 = function (x) {
  return _35(x, 0) > 0;
};
some63 = some63;
one63 = function (x) {
  return _35(x, 1) === 1;
};
one63 = one63;
two63 = function (x) {
  return _35(x, 2) === 2;
};
two63 = two63;
hd = function (l) {
  if (is63(l)) {
    return l[0];
  }
};
hd = hd;
type = function (x) {
  return typeof(x);
};
type = type;
string63 = function (x) {
  return type(x) === "string";
};
string63 = string63;
number63 = function (x) {
  return type(x) === "number";
};
number63 = number63;
boolean63 = function (x) {
  return type(x) === "boolean";
};
boolean63 = boolean63;
function63 = function (x) {
  return type(x) === "function";
};
function63 = function63;
obj63 = function (x) {
  return is63(x) && type(x) === "object";
};
obj63 = obj63;
list63 = function (x) {
  return obj63(x) || array63(x);
};
list63 = list63;
atom63 = function (x) {
  return nil63(x) || (string63(x) || (number63(x) || boolean63(x)));
};
atom63 = atom63;
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
hd63 = hd63;
nan = 0 / 0;
inf = 1 / 0;
_inf = - inf;
nan63 = function (n) {
  return !( n === n);
};
nan63 = nan63;
inf63 = function (n) {
  return n === inf || n === _inf;
};
inf63 = inf63;
clip = function (s, from, upto) {
  return s.substring(from, upto);
};
clip = clip;
dupe = function (x) {
  if (array63(x)) {
    return [];
  } else {
    return {};
  }
};
dupe = dupe;
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
cut = cut;
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
props = props;
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
values = values;
edge = function (x) {
  return _35(x) - 1;
};
edge = edge;
inner = function (x) {
  return clip(x, 1, edge(x));
};
inner = inner;
tl = function (l) {
  if (is63(l)) {
    return cut(l, 1);
  }
};
tl = tl;
char = function (s, n) {
  return s.charAt(n);
};
char = char;
code = function (s, n) {
  return s.charCodeAt(n);
};
code = code;
string_literal63 = function (x) {
  return string63(x) && char(x, 0) === "\"";
};
string_literal63 = string_literal63;
id_literal63 = function (x) {
  return string63(x) && char(x, 0) === "|";
};
id_literal63 = id_literal63;
add = function (l, x) {
  if (array63(l)) {
    l.push(x);
  } else {
    l[_35(l)] = x;
  }
  return undefined;
};
add = add;
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
drop = drop;
last = function (l) {
  return l[edge(l)];
};
last = last;
almost = function (l) {
  return cut(l, 0, edge(l));
};
almost = almost;
reverse = function (l) {
  var __l11 = props(l);
  var __i7 = edge(l);
  while (__i7 >= 0) {
    add(__l11, l[__i7]);
    __i7 = __i7 - 1;
  }
  return __l11;
};
reverse = reverse;
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
reduce = reduce;
join = function (..._42args) {
  var __ls = unstash([..._42args]);
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
        __r47[__k13] = __v6;
      }
    }
    ____i8 = ____i8 + 1;
  }
  return __r47;
};
join = join;
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
testify = testify;
find = function (x, t) {
  var __f = testify(x);
  var ____o7 = t;
  var __k14 = undefined;
  for (__k14 in ____o7) {
    var __v7 = ____o7[__k14];
    var __e9 = undefined;
    if (numeric63(__k14)) {
      __e9 = parseInt(__k14);
    } else {
      __e9 = __k14;
    }
    var __k15 = __e9;
    var ____y = __f(__v7, __k15);
    if (yes(____y)) {
      var __y1 = ____y;
      return __k15;
    }
  }
};
find = find;
first = function (x, l, pos) {
  var __f1 = testify(x);
  var __i11 = either(pos, 0);
  var __n12 = -1;
  var ____o8 = l;
  var __k16 = undefined;
  for (__k16 in ____o8) {
    var __v8 = ____o8[__k16];
    var __e10 = undefined;
    if (numeric63(__k16)) {
      __e10 = parseInt(__k16);
    } else {
      __e10 = __k16;
    }
    var __k17 = __e10;
    if (number63(__k17)) {
      __n12 = max(__n12, __k17);
    }
  }
  __n12 = __n12 + 1;
  while (__i11 < __n12) {
    var __v9 = l[__i11];
    var ____y2 = __f1(__v9);
    if (yes(____y2)) {
      var __y3 = ____y2;
      return __i11;
    }
    __i11 = __i11 + 1;
  }
};
first = first;
in63 = function (x, t) {
  return yes(find(testify(x), t));
};
in63 = in63;
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
pair = pair;
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
sort = sort;
map = function (f, x) {
  var __t2 = dupe(x);
  var ____x4 = x;
  var ____i14 = 0;
  while (____i14 < _35(____x4)) {
    var __v10 = ____x4[____i14];
    var __y4 = f(__v10);
    if (is63(__y4)) {
      add(__t2, __y4);
    }
    ____i14 = ____i14 + 1;
  }
  var ____o9 = x;
  var __k18 = undefined;
  for (__k18 in ____o9) {
    var __v11 = ____o9[__k18];
    var __e11 = undefined;
    if (numeric63(__k18)) {
      __e11 = parseInt(__k18);
    } else {
      __e11 = __k18;
    }
    var __k19 = __e11;
    if (! number63(__k19)) {
      var __y5 = f(__v11);
      if (is63(__y5)) {
        __t2[__k19] = __y5;
      }
    }
  }
  return __t2;
};
map = map;
mapcat = function (f, x, sep) {
  var __r60 = "";
  var __c = "";
  var ____x5 = x;
  var ____i16 = 0;
  while (____i16 < _35(____x5)) {
    var __v12 = ____x5[____i16];
    var __e12 = undefined;
    if (f) {
      __e12 = f(__v12);
    } else {
      __e12 = __v12;
    }
    var __y6 = __e12;
    if (is63(__y6)) {
      __r60 = __r60 + (__c + __y6);
      __c = sep || "";
    }
    ____i16 = ____i16 + 1;
  }
  return __r60;
};
mapcat = mapcat;
keep = function (f, x) {
  return map(function (v) {
    if (yes(f(v))) {
      return v;
    }
  }, x);
};
keep = keep;
props63 = function (t) {
  var ____o10 = t;
  var __k20 = undefined;
  for (__k20 in ____o10) {
    var __v13 = ____o10[__k20];
    var __e13 = undefined;
    if (numeric63(__k20)) {
      __e13 = parseInt(__k20);
    } else {
      __e13 = __k20;
    }
    var __k21 = __e13;
    if (! number63(__k21)) {
      return true;
    }
  }
  return false;
};
props63 = props63;
empty63 = function (t) {
  var ____o11 = t;
  var ____i18 = undefined;
  for (____i18 in ____o11) {
    var __x6 = ____o11[____i18];
    var __e14 = undefined;
    if (numeric63(____i18)) {
      __e14 = parseInt(____i18);
    } else {
      __e14 = ____i18;
    }
    var ____i181 = __e14;
    return false;
  }
  return true;
};
empty63 = empty63;
stash = function (args) {
  if (props63(args)) {
    var __p = {};
    var ____o12 = args;
    var __k22 = undefined;
    for (__k22 in ____o12) {
      var __v14 = ____o12[__k22];
      var __e15 = undefined;
      if (numeric63(__k22)) {
        __e15 = parseInt(__k22);
      } else {
        __e15 = __k22;
      }
      var __k23 = __e15;
      if (! number63(__k23)) {
        __p[__k23] = __v14;
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
stash = stash;
unstash = function (args, params) {
  if (none63(args)) {
    return params || {};
  } else {
    var __l4 = last(args);
    if (obj63(__l4) && has63(__l4, "_stash")) {
      var __args1 = object(almost(args));
      var ____o13 = __l4;
      var __k24 = undefined;
      for (__k24 in ____o13) {
        var __v15 = ____o13[__k24];
        var __e17 = undefined;
        if (numeric63(__k24)) {
          __e17 = parseInt(__k24);
        } else {
          __e17 = __k24;
        }
        var __k25 = __e17;
        if (!( __k25 === "_stash")) {
          __args1[__k25] = __v15;
        }
      }
      if (params) {
        var ____o14 = params;
        var __k26 = undefined;
        for (__k26 in ____o14) {
          var __v16 = ____o14[__k26];
          var __e18 = undefined;
          if (numeric63(__k26)) {
            __e18 = parseInt(__k26);
          } else {
            __e18 = __k26;
          }
          var __k27 = __e18;
          __args1[__k27] = __v16;
        }
      }
      return __args1;
    } else {
      if (params) {
        var __args11 = object(args);
        var ____o15 = params;
        var __k28 = undefined;
        for (__k28 in ____o15) {
          var __v17 = ____o15[__k28];
          var __e16 = undefined;
          if (numeric63(__k28)) {
            __e16 = parseInt(__k28);
          } else {
            __e16 = __k28;
          }
          var __k29 = __e16;
          __args11[__k29] = __v17;
        }
        return __args11;
      } else {
        return args;
      }
    }
  }
};
unstash = unstash;
destash33 = function (l, args1) {
  if (obj63(l) && has63(l, "_stash")) {
    var ____o16 = l;
    var __k30 = undefined;
    for (__k30 in ____o16) {
      var __v18 = ____o16[__k30];
      var __e19 = undefined;
      if (numeric63(__k30)) {
        __e19 = parseInt(__k30);
      } else {
        __e19 = __k30;
      }
      var __k31 = __e19;
      if (!( __k31 === "_stash")) {
        args1[__k31] = __v18;
      }
    }
  } else {
    return l;
  }
};
destash33 = destash33;
search = function (s, pattern, start) {
  var __i24 = s.indexOf(pattern, start);
  if (__i24 >= 0) {
    return __i24;
  }
};
search = search;
string_ends63 = function (str, x, pos) {
  var __e20 = undefined;
  if (is63(pos)) {
    __e20 = clip(str, pos);
  } else {
    __e20 = str;
  }
  var __str = __e20;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_ends63 = string_ends63;
string_starts63 = function (str, x, pos) {
  var __e21 = undefined;
  if (is63(pos)) {
    __e21 = clip(str, pos);
  } else {
    __e21 = str;
  }
  var __str1 = __e21;
  if (_35(x) > _35(__str1)) {
    return false;
  } else {
    return x === clip(__str1, 0, _35(x));
  }
};
string_starts63 = string_starts63;
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
split = split;
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
cat = cat;
_43 = function (..._42args) {
  var __xs1 = unstash([..._42args]);
  return reduce(function (a, b) {
    return a + b;
  }, __xs1, 0);
};
_43 = _43;
_45 = function (..._42args) {
  var __xs2 = unstash([..._42args]);
  return reduce(function (b, a) {
    return a - b;
  }, reverse(__xs2), 0);
};
_45 = _45;
_42 = function (..._42args) {
  var __xs3 = unstash([..._42args]);
  return reduce(function (a, b) {
    return a * b;
  }, __xs3, 1);
};
_42 = _42;
_47 = function (..._42args) {
  var __xs4 = unstash([..._42args]);
  return reduce(function (b, a) {
    return a / b;
  }, reverse(__xs4), 1);
};
_47 = _47;
_37 = function (..._42args) {
  var __xs5 = unstash([..._42args]);
  return reduce(function (b, a) {
    return a % b;
  }, reverse(__xs5), 1);
};
_37 = _37;
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
_60 = _60;
_62 = function (..._42args) {
  var __xs7 = unstash([..._42args]);
  return pairwise(function (a, b) {
    return a > b;
  }, __xs7);
};
_62 = _62;
_61 = function (..._42args) {
  var __xs8 = unstash([..._42args]);
  return pairwise(function (a, b) {
    return a === b;
  }, __xs8);
};
_61 = _61;
_6061 = function (..._42args) {
  var __xs9 = unstash([..._42args]);
  return pairwise(function (a, b) {
    return a <= b;
  }, __xs9);
};
_6061 = _6061;
_6261 = function (..._42args) {
  var __xs10 = unstash([..._42args]);
  return pairwise(function (a, b) {
    return a >= b;
  }, __xs10);
};
_6261 = _6261;
number_code63 = function (n) {
  return n > 47 && n < 58;
};
number_code63 = number_code63;
number = function (s) {
  var __n24 = parseFloat(s);
  if (! isNaN(__n24)) {
    return __n24;
  }
};
number = number;
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
numeric63 = numeric63;
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
      var __e22 = undefined;
      if (__c1 === "\n") {
        __e22 = "\\n";
      } else {
        var __e23 = undefined;
        if (__c1 === "\r") {
          __e23 = "\\r";
        } else {
          var __e24 = undefined;
          if (__c1 === "\"") {
            __e24 = "\\\"";
          } else {
            var __e25 = undefined;
            if (__c1 === "\\") {
              __e25 = "\\\\";
            } else {
              __e25 = __c1;
            }
            __e24 = __e25;
          }
          __e23 = __e24;
        }
        __e22 = __e23;
      }
      var __c11 = __e22;
      __s1 = __s1 + __c11;
      __i28 = __i28 + 1;
    }
    return __s1 + "\"";
  }
};
escape = escape;
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
  var ____v19 = has(____id, 1);
  var __e26 = undefined;
  if (____ok) {
    __e26 = ____v19;
  } else {
    __e26 = undefined;
  }
  var __r92 = __e26;
  if (__r92 === x) {
    return __r92;
  }
};
simple_id63 = simple_id63;
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
                        var __k32 = undefined;
                        for (__k32 in ____o17) {
                          var __v20 = ____o17[__k32];
                          var __e27 = undefined;
                          if (numeric63(__k32)) {
                            __e27 = parseInt(__k32);
                          } else {
                            __e27 = __k32;
                          }
                          var __k33 = __e27;
                          if (number63(__k33)) {
                            __xs11[__k33] = str(__v20, repr, __l6);
                          } else {
                            if (function63(__v20)) {
                              add(__ks, ["." + __k33, ""]);
                            } else {
                              add(__ks, [__k33 + ": ", str(__v20, repr, __l6)]);
                            }
                          }
                        }
                        sort(__ks, function (__x23, __x24) {
                          var ____id1 = __x23;
                          var __a2 = has(____id1, 0);
                          var __526 = has(____id1, ":row");
                          var __23 = has(____id1, ":col");
                          var ____id2 = __x24;
                          var __b2 = has(____id2, 0);
                          var __527 = has(____id2, ":row");
                          var __27 = has(____id2, ":col");
                          return __a2 < __b2;
                        });
                        drop(__l6);
                        var ____x25 = __xs11;
                        var ____i30 = 0;
                        while (____i30 < _35(____x25)) {
                          var __v21 = ____x25[____i30];
                          __s = __s + (__sp + __v21);
                          __sp = " ";
                          ____i30 = ____i30 + 1;
                        }
                        var ____x26 = __ks;
                        var ____i31 = 0;
                        while (____i31 < _35(____x26)) {
                          var ____id3 = ____x26[____i31];
                          var __k34 = has(____id3, 0);
                          var __v22 = has(____id3, 1);
                          var __531 = has(____id3, ":row");
                          var __17 = has(____id3, ":col");
                          __s = __s + (__sp + (__k34 + __v22));
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
str = str;
apply = function (f, args) {
  var __args2 = stash(args);
  return f.apply(f, __args2);
};
apply = apply;
call = function (f, ..._42args) {
  var ____r96 = unstash([..._42args]);
  var __f3 = destash33(f, ____r96);
  var ____id4 = ____r96;
  var __args3 = cut(____id4, 0);
  return apply(__f3, __args3);
};
call = call;
identifier = function (k) {
  return reduce(function (a, b) {
    return a + ("_" + b);
  }, split(k, "-"));
};
identifier = identifier;
setenv = function (k, ..._42args) {
  var ____r99 = unstash([..._42args]);
  var __k35 = destash33(k, ____r99);
  var ____id5 = ____r99;
  var __keys = cut(____id5, 0);
  if (string63(__k35)) {
    var __e28 = undefined;
    if (has63(__keys, "toplevel")) {
      __e28 = hd(environment);
    } else {
      __e28 = last(environment);
    }
    var __frame = __e28;
    var __e29 = undefined;
    if (has63(__frame, __k35)) {
      __e29 = __frame[__k35];
    } else {
      __e29 = {};
    }
    var __entry = __e29;
    var ____o18 = __keys;
    var __k36 = undefined;
    for (__k36 in ____o18) {
      var __v23 = ____o18[__k36];
      var __e30 = undefined;
      if (numeric63(__k36)) {
        __e30 = parseInt(__k36);
      } else {
        __e30 = __k36;
      }
      var __k37 = __e30;
      var __k38 = identifier(__k37);
      if (!( __k38 === "toplevel")) {
        __entry[__k38] = __v23;
      }
    }
    __frame[__k35] = __entry;
    return __frame[__k35];
  }
};
setenv = setenv;
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
