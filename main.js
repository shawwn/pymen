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
var __with_file_directory__macro = function (file, name, ..._42args) {
  var ____r19 = unstash([..._42args]);
  var __file1 = destash33(file, ____r19);
  var __name1 = destash33(name, ____r19);
  var ____id3 = ____r19;
  var __body1 = cut(____id3, 0);
  var __cwd1 = unique("cwd");
  return ["let", [__cwd1, ["system", [".cwd"]], __name1, __file1, __name1, ["system", [".basename", __file1]]], ["system", [".chdir", ["system", [".dirname", __file1]]]], ["after", join(["do"], __body1), ["system", [".chdir", __cwd1]]]];
};
setenv("with-file-directory", {
  _stash: true,
  macro: __with_file_directory__macro
});
read_file = function (path) {
  var ____cwd2 = system.cwd();
  var __name2 = path;
  var __name3 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r22 = undefined;
  try{
    ____r22 = system.read_file(__name3);
  }
  finally{
    system.chdir(____cwd2);
  }
  return ____r22;
};
read_from_file = function (path) {
  var __data = read_file(path);
  var ____cwd3 = system.cwd();
  var __name4 = path;
  var __name5 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r25 = undefined;
  try{
    var __s1 = reader.stream(__data);
    ____r25 = reader.read_all(__s1);
  }
  finally{
    system.chdir(____cwd3);
  }
  return ____r25;
};
expand_file = function (path) {
  var __body2 = read_from_file(path);
  var ____cwd4 = system.cwd();
  var __name6 = path;
  var __name7 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r28 = undefined;
  try{
    ____r28 = compiler.expand(join(["do"], __body2));
  }
  finally{
    system.chdir(____cwd4);
  }
  return ____r28;
};
compile_file = function (path) {
  var __form2 = expand_file(path);
  var ____cwd5 = system.cwd();
  var __name8 = path;
  var __name9 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r31 = undefined;
  try{
    ____r31 = compiler.compile(__form2, {
      _stash: true,
      stmt: true
    });
  }
  finally{
    system.chdir(____cwd5);
  }
  return ____r31;
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
  var __name10 = path;
  var __name11 = system.basename(path);
  system.chdir(system.dirname(path));
  var ____r34 = undefined;
  try{
    ____r34 = compiler.run(__code);
  }
  finally{
    system.chdir(____cwd6);
  }
  return ____r34;
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
      var __expr = undefined;
      var __argv = args;
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
      var ____x45 = __pre;
      var ____i3 = 0;
      while (____i3 < _35(____x45)) {
        var __file2 = ____x45[____i3];
        run_file(__file2);
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
  main(system.get_argv());
}
exports.main = main;
exports.reader = reader;
exports.compiler = compiler;
exports.system = system;
