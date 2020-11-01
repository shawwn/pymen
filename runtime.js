Dictator = function (x) {
  return Object.create(x);
};
dictator = function (x) {
  return Dictator(object(x));
};
mapping_new = function () {
  var __self = dictator(["%mapping"]);
  __self.map = new Map();
  return __self;
};
mapping63 = function (x) {
  return hd63(x, "%mapping");
};
mapping_get = function (self, k) {
  if (sym63(k)) {
    k = str(k);
  } else {
    if (var63(k)) {
      k = str(k);
    }
  }
  return self.map.get(k);
};
mapping_set = function (self, k, v) {
  if (sym63(k)) {
    k = str(k);
  } else {
    if (var63(k)) {
      k = str(k);
    }
  }
  return self.map.set(k, v);
};
mapping_has = function (self, k) {
  return self.map.has(k);
};
mapping_values = function (self) {
  var __l = [];
  var ____o = self.map;
  var __k = undefined;
  for (__k in ____o) {
    var __v = ____o[__k];
    var __e1 = undefined;
    if (numeric63(__k)) {
      __e1 = parseInt(__k);
    } else {
      __e1 = __k;
    }
    var __k1 = __e1;
    add(__l, __v);
  }
  return __l;
};
sym_new = function (meta, ns, name) {
  var __self1 = dictator(["%sym"]);
  __self1.meta = meta;
  __self1.ns = ns;
  __self1.name = name;
  return __self1;
};
sym63 = function (x) {
  return hd63(x, "%sym");
};
sym_to_primitive = function (self, hint) {
  if (self.ns) {
    return self.ns + ("/" + self.name);
  } else {
    return self.name;
  }
};
sym_to_string = function (self) {
  return sym_to_primitive(self, "str");
};
sym_compile = function (self) {
  return compile(sym_to_string(self));
};
sym_fqn63 = function (self) {
  return this.name && this.ns;
};
sym_eq = function (self, y) {
  return name(self) === name(y);
};
intern = function (ns, name, meta) {
  if (nil63(name)) {
    name = ns;
    ns = undefined;
  }
  return sym_new(meta, ns, name);
};
unbound_new = function (self) {
  return dictator(["%unbound"], {
    _stash: true,
    self: self
  });
};
unbound63 = function (x) {
  return hd63(x, "%unbound");
};
var_new = function (ns, sym, root) {
  var __self2 = dictator(["%var"]);
  __self2.ns = ns;
  __self2.sym = sym;
  var __e2 = undefined;
  if (is63(root)) {
    __e2 = root;
  } else {
    __e2 = unbound_new(__self2);
  }
  __self2.root = __e2;
  return __self2;
};
var63 = function (x) {
  return hd63(x, "%var");
};
var_has_root = function (self) {
  return ! unbound63(self.root);
};
var_bind_root = function (self, root, getter, setter) {
  self.getter = getter;
  self.setter = setter;
  self.root = root;
  return self.root;
};
var_unbind_root = function (self) {
  self.getter = undefined;
  self.setter = undefined;
  self.root = unbound_new(self);
  return self.root;
};
var_deref = function (self, ..._42args) {
  var __x4 = hd([..._42args]);
  if (none63([..._42args])) {
    var __b = var_get_thread_binding(self);
    if (is63(__b)) {
      return var_val(__b);
    } else {
      if (self.getter) {
        return self.getter();
      } else {
        return self.root;
      }
    }
  } else {
    if (self.setter) {
      return self.setter(__x4);
    } else {
      self.root = __x4;
      return self.root;
    }
  }
};
var_get = function (self) {
  return var_deref(self);
};
var_set = function (self, val) {
  var __b1 = var_get_thread_binding(self);
  if (is63(__b1)) {
    __b1.val = val;
    return __b1.val;
  }
  throw new Error("Can't change/establish root binding of: " + (var_fqn(self) + " with set"));
};
var_get_thread_binding = function (self) {
  var __fqn = var_fqn(self);
  return hd(_G.environment)[__fqn];
};
var_push_thread_bindings = function (bindings) {
  return add(_G.environment, bindings);
};
var_pop_thread_bindings = function () {
  return drop(_G.environment);
};
var_fqn = function (self) {
  return "#'" + (self.ns.name + ("/" + self.sym.name));
};
var_to_string = function (self) {
  return var_fqn(self);
};
namespace_new = function (name) {
  var __self3 = dictator(["%namespace"]);
  __self3.name = name;
  __self3.mappings = mapping_new();
  __self3.aliases = mapping_new();
  mapping_set(namespace_namespaces(), name, __self3);
  return __self3;
};
namespace63 = function (x) {
  return hd63(x, "%namespace");
};
namespace_namespaces = function () {
  var __id7 = _G.namespaces42;
  var __e3 = undefined;
  if (__id7) {
    __e3 = __id7;
  } else {
    _G.namespaces42 = mapping_new();
    __e3 = _G.namespaces42;
  }
  return __e3;
};
namespace_all = function () {
  return mapping_values(namespace_namespaces());
};
namespace_sym = function (s) {
  if (string63(s)) {
    var __i1 = search(s, "/");
    if (is63(__i1)) {
      s = sym_new(undefined, clip(s, 0, __i1), clip(s, __i1 + 1));
    } else {
      s = sym_new(undefined, undefined, s);
    }
  }
  return s;
};
namespace_find = function (name) {
  return mapping_get(namespace_namespaces(), namespace_sym(name));
};
namespace_find_or_create = function (name) {
  var __ns = namespace_find(name);
  return __ns || namespace_new(name);
};
namespace_intern = function (self, sym) {
  sym = namespace_sym(sym);
  if (sym.ns) {
    throw new Error("Can't intern namespace-qualified symbol");
  }
  var __m = self.mappings;
  var __o1 = undefined;
  var __v1 = undefined;
  while (true) {
    __o1 = mapping_get(__m, sym);
    if (! nil63(__o1)) {
      break;
    }
    if (nil63(__v1)) {
      __v1 = var_new(self, sym);
    }
    mapping_set(__m, sym, __v1);
  }
  if (var63(__v1) && __o1.ns === self) {
    return __o1;
  }
  if (nil63(__v1)) {
    __v1 = var_new(self, sym);
  }
  namespace_warn_or_fail_on_replace(self, sym, __o1, __v1);
  mapping_set(__m, sym, __v1);
  return __v1;
};
namespace_warn_or_fail_on_replace = function (self, sym, o, v) {
  if (var63(o)) {
    var __ns1 = o.ns;
    if (__ns1 === self || var63(v) && v.ns === _G.RT.LUMEN_NS) {
      return;
    }
    if (!( __ns1 === _G.RT.LUMEN_NS)) {
      throw new Error(str(sym) + (" already refers to: " + (str(o) + (" in namespace: " + str(name)))));
    }
  }
  return print(str(sym) + (" already refers to: " + (str(o) + (" in namespace: " + (str(name) + (", being replaced by: " + (_43 + str(v))))))));
};
compiler_ns = function () {
  return _G.RT.CURRENT_NS;
};
compiler_current_ns = function (..._42args) {
  var __x8 = hd([..._42args]);
  if (none63([..._42args])) {
    return var_deref(compiler_ns());
  } else {
    var __ns2 = namespace_find_or_create(__x8);
    return var_bind_root(compiler_ns(), __ns2);
  }
};
_G._42ns42 = compiler_current_ns;
current_ns = function (x) {
  if (nil63(x)) {
    return _G._42ns42();
  } else {
    return _G._42ns42(x);
  }
};
syms_of_namespace = function () {
  _G.RT = namespace_find_or_create("RT");
  _G.RT.CURRENT_NS = namespace_intern(_G.RT, "CURRENT_NS");
  _G._42ns42("lumen.runtime");
  _G._42ns42("lumen.macros");
  _G._42ns42("lumen.reader");
  _G._42ns42("lumen.compiler");
  _G._42ns42("lumen.system");
  _G._42ns42("lumen.main");
  return _G._42ns42("lumen.runtime");
};
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
    var __l1 = [];
    var ____o2 = x;
    var __k2 = undefined;
    for (__k2 in ____o2) {
      var __v2 = ____o2[__k2];
      var __e4 = undefined;
      if (numeric63(__k2)) {
        __e4 = parseInt(__k2);
      } else {
        __e4 = __k2;
      }
      var __k3 = __e4;
      if (number63(__k3)) {
        __l1[__k3] = __v2;
      }
    }
    return __l1;
  }
};
object = function (x) {
  if (array63(x)) {
    var __l2 = {};
    var ____o3 = x;
    var __k4 = undefined;
    for (__k4 in ____o3) {
      var __v3 = ____o3[__k4];
      var __e5 = undefined;
      if (numeric63(__k4)) {
        __e5 = parseInt(__k4);
      } else {
        __e5 = __k4;
      }
      var __k5 = __e5;
      __l2[__k5] = __v3;
    }
    return __l2;
  } else {
    return x;
  }
};
length = function (x, upto) {
  var __n3 = -1;
  var __upto = either(upto, inf);
  var ____o4 = x;
  var __k6 = undefined;
  for (__k6 in ____o4) {
    var __v4 = ____o4[__k6];
    var __e6 = undefined;
    if (numeric63(__k6)) {
      __e6 = parseInt(__k6);
    } else {
      __e6 = __k6;
    }
    var __k7 = __e6;
    if (number63(__k7)) {
      if (__k7 > __n3) {
        __n3 = __k7;
        if (__n3 >= __upto) {
          break;
        }
      }
    }
  }
  __n3 = __n3 + 1;
  return __n3;
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
  var __l3 = dupe(x);
  var __j = 0;
  var __e7 = undefined;
  if (nil63(from) || from < 0) {
    __e7 = 0;
  } else {
    __e7 = from;
  }
  var __i5 = __e7;
  var __n5 = _35(x);
  var __e8 = undefined;
  if (nil63(upto) || upto > __n5) {
    __e8 = __n5;
  } else {
    __e8 = upto;
  }
  var __upto1 = __e8;
  while (__i5 < __upto1) {
    __l3[__j] = x[__i5];
    __i5 = __i5 + 1;
    __j = __j + 1;
  }
  var ____o5 = x;
  var __k8 = undefined;
  for (__k8 in ____o5) {
    var __v5 = ____o5[__k8];
    var __e9 = undefined;
    if (numeric63(__k8)) {
      __e9 = parseInt(__k8);
    } else {
      __e9 = __k8;
    }
    var __k9 = __e9;
    if (! number63(__k9)) {
      __l3[__k9] = __v5;
    }
  }
  return __l3;
};
props = function (x) {
  var __t = {};
  var ____o6 = x;
  var __k10 = undefined;
  for (__k10 in ____o6) {
    var __v6 = ____o6[__k10];
    var __e10 = undefined;
    if (numeric63(__k10)) {
      __e10 = parseInt(__k10);
    } else {
      __e10 = __k10;
    }
    var __k11 = __e10;
    if (! number63(__k11)) {
      __t[__k11] = __v6;
    }
  }
  return __t;
};
values = function (x) {
  if (array63(x)) {
    return x;
  } else {
    var __t1 = {};
    var ____o7 = x;
    var __k12 = undefined;
    for (__k12 in ____o7) {
      var __v7 = ____o7[__k12];
      var __e11 = undefined;
      if (numeric63(__k12)) {
        __e11 = parseInt(__k12);
      } else {
        __e11 = __k12;
      }
      var __k13 = __e11;
      if (number63(__k13)) {
        __t1[__k13] = __v7;
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
    var __n9 = edge(l);
    if (__n9 >= 0) {
      var __r42 = l[__n9];
      delete l[__n9];
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
  var __i9 = edge(l);
  while (__i9 >= 0) {
    add(__l11, l[__i9]);
    __i9 = __i9 - 1;
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
  var ____x13 = __ls;
  var ____i10 = 0;
  while (____i10 < _35(____x13)) {
    var __l4 = ____x13[____i10];
    if (__l4) {
      var __n10 = _35(__r47);
      var ____o8 = __l4;
      var __k14 = undefined;
      for (__k14 in ____o8) {
        var __v8 = ____o8[__k14];
        var __e12 = undefined;
        if (numeric63(__k14)) {
          __e12 = parseInt(__k14);
        } else {
          __e12 = __k14;
        }
        var __k15 = __e12;
        if (number63(__k15)) {
          __k15 = __k15 + __n10;
        } else {
          __l4 = object(__l4);
        }
        __r47[__k15] = __v8;
      }
    }
    ____i10 = ____i10 + 1;
  }
  return __r47;
};
find = function (f, t) {
  var ____o9 = t;
  var ____i12 = undefined;
  for (____i12 in ____o9) {
    var __x14 = ____o9[____i12];
    var __e13 = undefined;
    if (numeric63(____i12)) {
      __e13 = parseInt(____i12);
    } else {
      __e13 = ____i12;
    }
    var ____i121 = __e13;
    var __y = f(__x14);
    if (__y) {
      return __y;
    }
  }
};
first = function (f, l) {
  var ____x15 = l;
  var ____i13 = 0;
  while (____i13 < _35(____x15)) {
    var __x16 = ____x15[____i13];
    var __y1 = f(__x16);
    if (__y1) {
      return __y1;
    }
    ____i13 = ____i13 + 1;
  }
};
in63 = function (x, t) {
  return find(function (y) {
    return x === y;
  }, t);
};
pair = function (l) {
  var __l12 = dupe(l);
  var __n13 = _35(l);
  var __i14 = 0;
  while (__i14 < __n13) {
    var __a = l[__i14];
    var __b2 = l[__i14 + 1];
    add(__l12, [__a, __b2]);
    __i14 = __i14 + 1;
    __i14 = __i14 + 1;
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
  var ____x18 = x;
  var ____i15 = 0;
  while (____i15 < _35(____x18)) {
    var __v9 = ____x18[____i15];
    var __y2 = f(__v9);
    if (is63(__y2)) {
      add(__t2, __y2);
    }
    ____i15 = ____i15 + 1;
  }
  var ____o10 = x;
  var __k16 = undefined;
  for (__k16 in ____o10) {
    var __v10 = ____o10[__k16];
    var __e14 = undefined;
    if (numeric63(__k16)) {
      __e14 = parseInt(__k16);
    } else {
      __e14 = __k16;
    }
    var __k17 = __e14;
    if (! number63(__k17)) {
      var __y3 = f(__v10);
      if (is63(__y3)) {
        __t2[__k17] = __y3;
      }
    }
  }
  return __t2;
};
mapcat = function (f, x, sep) {
  var __r58 = "";
  var __c = "";
  var ____x19 = x;
  var ____i17 = 0;
  while (____i17 < _35(____x19)) {
    var __v11 = ____x19[____i17];
    var __e15 = undefined;
    if (f) {
      __e15 = f(__v11);
    } else {
      __e15 = __v11;
    }
    var __y4 = __e15;
    if (is63(__y4)) {
      __r58 = __r58 + (__c + __y4);
      __c = sep || "";
    }
    ____i17 = ____i17 + 1;
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
  var ____o11 = t;
  var __k18 = undefined;
  for (__k18 in ____o11) {
    var __v12 = ____o11[__k18];
    var __e16 = undefined;
    if (numeric63(__k18)) {
      __e16 = parseInt(__k18);
    } else {
      __e16 = __k18;
    }
    var __k19 = __e16;
    if (! number63(__k19)) {
      return true;
    }
  }
  return false;
};
empty63 = function (t) {
  var ____o12 = t;
  var ____i19 = undefined;
  for (____i19 in ____o12) {
    var __x20 = ____o12[____i19];
    var __e17 = undefined;
    if (numeric63(____i19)) {
      __e17 = parseInt(____i19);
    } else {
      __e17 = ____i19;
    }
    var ____i191 = __e17;
    return false;
  }
  return true;
};
stash = function (args) {
  if (props63(args)) {
    var __p = {};
    var ____o13 = args;
    var __k20 = undefined;
    for (__k20 in ____o13) {
      var __v13 = ____o13[__k20];
      var __e18 = undefined;
      if (numeric63(__k20)) {
        __e18 = parseInt(__k20);
      } else {
        __e18 = __k20;
      }
      var __k21 = __e18;
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
    var __l5 = last(args);
    if (obj63(__l5) && has63(__l5, "_stash")) {
      var __args1 = object(almost(args));
      var ____o14 = __l5;
      var __k22 = undefined;
      for (__k22 in ____o14) {
        var __v14 = ____o14[__k22];
        var __e20 = undefined;
        if (numeric63(__k22)) {
          __e20 = parseInt(__k22);
        } else {
          __e20 = __k22;
        }
        var __k23 = __e20;
        if (!( __k23 === "_stash")) {
          __args1[__k23] = __v14;
        }
      }
      if (params) {
        var ____o15 = params;
        var __k24 = undefined;
        for (__k24 in ____o15) {
          var __v15 = ____o15[__k24];
          var __e21 = undefined;
          if (numeric63(__k24)) {
            __e21 = parseInt(__k24);
          } else {
            __e21 = __k24;
          }
          var __k25 = __e21;
          __args1[__k25] = __v15;
        }
      }
      return __args1;
    } else {
      if (params) {
        var __args11 = object(args);
        var ____o16 = params;
        var __k26 = undefined;
        for (__k26 in ____o16) {
          var __v16 = ____o16[__k26];
          var __e19 = undefined;
          if (numeric63(__k26)) {
            __e19 = parseInt(__k26);
          } else {
            __e19 = __k26;
          }
          var __k27 = __e19;
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
    var ____o17 = l;
    var __k28 = undefined;
    for (__k28 in ____o17) {
      var __v17 = ____o17[__k28];
      var __e22 = undefined;
      if (numeric63(__k28)) {
        __e22 = parseInt(__k28);
      } else {
        __e22 = __k28;
      }
      var __k29 = __e22;
      if (!( __k29 === "_stash")) {
        args1[__k29] = __v17;
      }
    }
  } else {
    return l;
  }
};
search = function (s, pattern, start) {
  var __i25 = s.indexOf(pattern, start);
  if (__i25 >= 0) {
    return __i25;
  }
};
string_ends63 = function (str, x, pos) {
  var __e23 = undefined;
  if (is63(pos)) {
    __e23 = clip(str, pos);
  } else {
    __e23 = str;
  }
  var __str = __e23;
  if (_35(x) > _35(__str)) {
    return false;
  } else {
    return x === clip(__str, _35(__str) - _35(x));
  }
};
string_starts63 = function (str, x, pos) {
  var __e24 = undefined;
  if (is63(pos)) {
    __e24 = clip(str, pos);
  } else {
    __e24 = str;
  }
  var __str1 = __e24;
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
    var __l6 = [];
    var __n22 = _35(sep);
    while (true) {
      var __i26 = search(s, sep);
      if (nil63(__i26)) {
        break;
      } else {
        add(__l6, clip(s, 0, __i26));
        s = clip(s, __i26 + __n22);
      }
    }
    add(__l6, s);
    return __l6;
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
  var __i27 = 0;
  while (__i27 < edge(xs)) {
    var __a1 = xs[__i27];
    var __b3 = xs[__i27 + 1];
    if (! f(__a1, __b3)) {
      return false;
    }
    __i27 = __i27 + 1;
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
  var __n23 = parseFloat(s);
  if (! isNaN(__n23)) {
    return __n23;
  }
};
numeric63 = function (s) {
  var __n24 = _35(s);
  var __i28 = 0;
  while (__i28 < __n24) {
    if (! number_code63(code(s, __i28))) {
      return false;
    }
    __i28 = __i28 + 1;
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
    var __i29 = 0;
    while (__i29 < _35(s)) {
      var __c1 = char(s, __i29);
      var __e25 = undefined;
      if (__c1 === "\n") {
        __e25 = "\\n";
      } else {
        var __e26 = undefined;
        if (__c1 === "\r") {
          __e26 = "\\r";
        } else {
          var __e27 = undefined;
          if (__c1 === "\"") {
            __e27 = "\\\"";
          } else {
            var __e28 = undefined;
            if (__c1 === "\\") {
              __e28 = "\\\\";
            } else {
              __e28 = __c1;
            }
            __e27 = __e28;
          }
          __e26 = __e27;
        }
        __e25 = __e26;
      }
      var __c11 = __e25;
      __s1 = __s1 + __c11;
      __i29 = __i29 + 1;
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
  var __e29 = undefined;
  if (____ok) {
    __e29 = ____v18;
  } else {
    __e29 = undefined;
  }
  var __r90 = __e29;
  if (__r90 === x) {
    return __r90;
  }
};
tostring = function (x) {
  return require("util").inspect(x);
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
                      if (sym63(x)) {
                        return "'" + sym_to_string(x);
                      } else {
                        if (var63(x)) {
                          return var_to_string(x);
                        } else {
                          if (x instanceof Map) {
                            return tostring(x);
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
                              var __l7 = stack || [];
                              add(__l7, x);
                              var ____o18 = x;
                              var __k30 = undefined;
                              for (__k30 in ____o18) {
                                var __v19 = ____o18[__k30];
                                var __e30 = undefined;
                                if (numeric63(__k30)) {
                                  __e30 = parseInt(__k30);
                                } else {
                                  __e30 = __k30;
                                }
                                var __k31 = __e30;
                                if (number63(__k31)) {
                                  __xs11[__k31] = str(__v19, repr, __l7);
                                } else {
                                  if (function63(__v19)) {
                                    add(__ks, ["." + __k31, ""]);
                                  } else {
                                    add(__ks, [__k31 + ": ", str(__v19, repr, __l7)]);
                                  }
                                }
                              }
                              sort(__ks, function (__x37, __x38) {
                                var ____id1 = __x37;
                                var __a2 = has(____id1, 0);
                                var ____id2 = __x38;
                                var __b4 = has(____id2, 0);
                                return __a2 < __b4;
                              });
                              drop(__l7);
                              var ____x39 = __xs11;
                              var ____i31 = 0;
                              while (____i31 < _35(____x39)) {
                                var __v20 = ____x39[____i31];
                                __s = __s + (__sp + __v20);
                                __sp = " ";
                                ____i31 = ____i31 + 1;
                              }
                              var ____x40 = __ks;
                              var ____i32 = 0;
                              while (____i32 < _35(____x40)) {
                                var ____id3 = ____x40[____i32];
                                var __k32 = has(____id3, 0);
                                var __v21 = has(____id3, 1);
                                __s = __s + (__sp + (__k32 + __v21));
                                __sp = " ";
                                ____i32 = ____i32 + 1;
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
      }
    }
  }
};
apply = function (f, args) {
  var __args2 = stash(args);
  return f.apply(f, __args2);
};
call = function (f, ..._42args) {
  var ____r95 = unstash([..._42args]);
  var __f1 = destash33(f, ____r95);
  var ____id4 = ____r95;
  var __args3 = cut(____id4, 0);
  return apply(__f1, __args3);
};
setenv = function (k, ..._42args) {
  var ____r96 = unstash([..._42args]);
  var __k33 = destash33(k, ____r96);
  var ____id5 = ____r96;
  var __keys = cut(____id5, 0);
  if (string63(__k33)) {
    var __e31 = undefined;
    if (has63(__keys, "toplevel")) {
      __e31 = hd(environment);
    } else {
      __e31 = last(environment);
    }
    var __frame = __e31;
    var __e32 = undefined;
    if (has63(__frame, __k33)) {
      __e32 = __frame[__k33];
    } else {
      __e32 = {};
    }
    var __entry = __e32;
    var ____o19 = __keys;
    var __k34 = undefined;
    for (__k34 in ____o19) {
      var __v22 = ____o19[__k34];
      var __e33 = undefined;
      if (numeric63(__k34)) {
        __e33 = parseInt(__k34);
      } else {
        __e33 = __k34;
      }
      var __k35 = __e33;
      if (!( __k35 === "toplevel")) {
        __entry[__k35] = __v22;
      }
    }
    __frame[__k33] = __entry;
    return __frame[__k33];
  }
};
fetchenv = function (k, ..._42args) {
  var ____r97 = unstash([..._42args]);
  var __k36 = destash33(k, ____r97);
  var ____id6 = ____r97;
  var __keys1 = cut(____id6, 0);
  if (sym63(__k36)) {
    __k36 = str(__k36);
  }
  if (string63(__k36)) {
    var __e34 = undefined;
    if (toplevel63) {
      __e34 = hd(_G.environment);
    } else {
      __e34 = last(_G.environment);
    }
    var __frame1 = __e34;
    var __entry1 = __frame1[__k36] || {};
    __frame1[__k36] = __entry1;
    return __frame1[__k36];
  }
};
assignenv = function (k, p, toplevel63) {
  if (sym63(k)) {
    k = str(k);
  }
  if (string63(k)) {
    var __e35 = undefined;
    if (toplevel63) {
      __e35 = hd(_G.environment);
    } else {
      __e35 = last(_G.environment);
    }
    var __frame2 = __e35;
    var __entry2 = __frame2[k] || {};
    __frame2[k] = p;
    return k;
  }
};
prn = function (x, ..._42args) {
  print(str([x, ..._42args]));
  return x;
};
putenv = function (name, kind, x, props, toplevel63) {
  if (nil63(props)) {
    props = {};
  }
  print(str(["putenv", name, kind, x, props, toplevel63]));
  if (sym63(name)) {
    name = str(name);
  }
  if (string63(name)) {
    var __p1 = prn(join({}, props, {[kind]: x}), "p");
    var __ns3 = prn(current_ns(), "current-ns");
    var __full = prn(__ns3.name + ("/" + name), "full");
    var __val = var_deref(prn(namespace_intern(__ns3, name), "interned"), __p1);
    _G.environment[edge(_G.environment)][__full] = __p1;
    return __p1;
  }
};
setenv37 = function (name, kind, x, props, toplevel63) {
  print(str(["setenv%", name, kind, x, props, toplevel63]));
  var __e = assignenv(name, putenv(name, kind, x, props, toplevel63), toplevel63);
  if (__e) {
    return namespace_intern(current_ns(), __e);
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
syms_of_namespace();

