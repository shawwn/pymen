var reader = require("reader");
var compiler = require("compiler");
var system = require("system");
disp = function (str) {
  system.write(str);
  return system.flush();
};
pp = function (x) {
  if (list63(x) && _35(x) > 1) {
    var __c = "  ";
    var __nl = undefined;
    print("(");
    var ____x = x;
    var ____i = 0;
    while (____i < _35(____x)) {
      var __v = ____x[____i];
      if (__nl) {
        print("");
      }
      disp(__c);
      __nl = true;
      __c = "  ";
      print(str(__v));
      ____i = ____i + 1;
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
  var __r5 = "";
  var __i1 = 0;
  while (__i1 < _35(s)) {
    var __c1 = char(s, __i1);
    if (__c1 === " ") {
      __r5 = __r5 + __c1;
    }
    __i1 = __i1 + 1;
  }
  return __r5;
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
  var __form = eval_self_form(form);
  var ____id = (function () {
    try {
      return [true, compiler.eval(__form)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok = has(____id, 0);
  var __v1 = has(____id, 1);
  var __ex = has(____id, 2);
  if (! __ok) {
    return print_exception(__v1, __ex);
  } else {
    if (is63(__v1)) {
      return toplevel_print(__v1);
    }
  }
};
read_toplevel = function (str, more) {
  var __s = reader.stream(str, more);
  var ____id1 = (function () {
    try {
      return [true, reader.read_all(__s)];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var ____ok1 = has(____id1, 0);
  var ____v2 = has(____id1, 1);
  var __e = undefined;
  if (____ok1) {
    __e = ____v2;
  } else {
    __e = undefined;
  }
  var __x9 = __e;
  if (__x9 === more) {
    return more;
  } else {
    if (nil63(__x9)) {
      return __x9;
    } else {
      if (one63(__x9)) {
        return hd(__x9);
      } else {
        return __x9;
      }
    }
  }
};
var rep = function (str) {
  var __v3 = _eval(read_toplevel(str));
  if (is63(__v3)) {
    return toplevel_print(__v3);
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
    var __form1 = read_toplevel(o.buf, __more);
    if (!( __form1 === __more)) {
      eval_print(__form1);
      return reset();
    }
  };
  reset();
  var ___in = process.stdin;
  ___in.setEncoding("utf8");
  return ___in.on("data", rep1);
};
read_file = function (path) {
  return system.read_file(path);
};
read_from_file = function (path) {
  var __s1 = reader.stream(read_file(path));
  return reader.read_all(__s1);
};
expand_file = function (path) {
  var __body = read_from_file(path);
  return compiler.expand(join(["do"], __body));
};
compile_file = function (path) {
  var __form2 = expand_file(path);
  return compiler.compile(__form2, {
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
      var __expr = undefined;
      var __argv = system.argv;
      var __i2 = 0;
      while (__i2 < _35(__argv)) {
        var __a = __argv[__i2];
        if (__a === "-c" || (__a === "-o" || (__a === "-t" || __a === "-e"))) {
          if (__i2 === edge(__argv)) {
            print("missing argument for " + __a);
          } else {
            __i2 = __i2 + 1;
            var __val = __argv[__i2];
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
        __i2 = __i2 + 1;
      }
      var ____x14 = __pre;
      var ____i3 = 0;
      while (____i3 < _35(____x14)) {
        var __file = ____x14[____i3];
        run_file(__file);
        ____i3 = ____i3 + 1;
      }
      if (nil63(__input)) {
        if (__expr) {
          return rep(__expr);
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

