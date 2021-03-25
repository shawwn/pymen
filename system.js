var fs = require("fs");
var child_process = require("child_process");
var read_file = function (path) {
  return fs.readFileSync(path, "utf8");
};
var write_file = function (path, data) {
  return fs.writeFileSync(path, data, "utf8");
};
var file_exists63 = function (path) {
  return fs.existsSync(path, "utf8") && fs.statSync(path).isFile();
};
var directory_exists63 = function (path) {
  return fs.existsSync(path, "utf8") && fs.statSync(path).isDirectory();
};
var path_separator = require("path").sep;
var path_join = function (..._42args) {
  var __parts = unstash([..._42args]);
  return reduce(function (x, y) {
    return x + (path_separator + y);
  }, __parts) || "";
};
var get_environment_variable = function (name) {
  return process.env[name];
};
var write = function (x) {
  var __out = process.stdout;
  return __out.write(x);
};
var flush = function (x) {
};
var remove_newline = function (s) {
  if (char(s, edge(s)) === "\n") {
    s = clip(s, 0, edge(s));
  }
  if (char(s, edge(s)) === "\r") {
    s = clip(s, 0, edge(s));
  }
  return s;
};
var read_line = function (on_ctrl_c) {
};
var exit = function (code) {
  return process.exit(code);
};
var argv = undefined;
set_argv = function (l) {
  argv = l;
  return argv;
};
set_argv = set_argv;
get_argv = function () {
  if (nil63(argv)) {
    set_argv(cut(process.argv, 2));
  }
  return argv;
};
get_argv = get_argv;
var opt63 = function (x) {
  return string63(x) && (char(x, 0) === "-" && !( x === "-"));
};
parse_positional = function (args, pos) {
  if (nil63(pos)) {
    pos = 0;
  }
  return cut(args, either(pos, 0), first(opt63, args, pos));
};
parse_positional = parse_positional;
parse_option = function (args) {
  if (opt63(hd(args))) {
    return [hd(args), parse_positional(args, 1)];
  }
};
parse_option = parse_option;
parse_arguments = function (aliases, argv) {
  var __l = argv || get_argv();
  var __a = aliases || {};
  var __r17 = parse_positional(__l);
  __l = cut(__l, _35(__r17));
  while (true) {
    var __p = parse_option(__l);
    if (! __p) {
      break;
    }
    var ____y = __p;
    if (yes(____y)) {
      var ____id = ____y;
      var __op = has(____id, 0);
      var __args = has(____id, 1);
      var __135 = has(____id, ":row");
      var __29 = has(____id, ":col");
      if (__op === "--") {
        __l = cut(__l, 1);
        break;
      }
      __l = cut(__l, 1 + _35(__args));
      var __e = undefined;
      if (clip(__op, 0, 2) === "--") {
        __e = clip(__op, 2);
      } else {
        __e = clip(__op, 1);
      }
      var __k = __e;
      var __k1 = has(__a, __k, __k);
      var __e1 = undefined;
      if (none63(__args)) {
        __e1 = true;
      } else {
        __e1 = __args;
      }
      var __v = __e1;
      __r17[__k1] = __v;
      add(__r17, [__k1, __v]);
    }
  }
  __r17.rest = __l;
  set_argv(__r17.rest);
  return __r17;
};
parse_arguments = parse_arguments;
arguments = function (aliases, argv) {
  var __argv = argv || get_argv();
  var __r19 = parse_arguments(__argv, aliases);
  set_argv(__r19.rest);
  delete __r19.rest;
  if (! empty63(__r19)) {
    return __r19;
  }
};
arguments = arguments;
var realpath = function (filename) {
  return fs.realpathSync(filename);
};
var reload = function (module) {
  delete require.cache[realpath(require.resolve(module))];
  return require(module);
};
var shell = function (command) {
  return child_process.execSync(command).toString();
};
var cwd = function () {
  return process.cwd();
};
var chdir = function (path) {
  return process.chdir(path);
};
var call_with_directory = function (path, f) {
  if (! directory_exists63(path)) {
        var pdb = require("pdb");
    pdb.set_trace();
    throw new Error("Directory doesn't exist");
  }
  var __pwd = cwd();
  chdir(path);
  var ____id1 = (function () {
    try {
      return [true, f()];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok = has(____id1, 0);
  var __v1 = has(____id1, 1);
  var __190 = has(____id1, ":row");
  var __16 = has(____id1, ":col");
  chdir(__pwd);
  if (__ok) {
    return __v1;
  } else {
    throw __v1;
  }
};
var dirname = function (filename) {
  var __result = apply(path_join, almost(split(filename, path_separator)));
  if (none63(__result)) {
    return ".";
  } else {
    return __result;
  }
};
var basename = function (filename) {
  return last(split(filename, path_separator));
};
var call_with_file_directory = function (file, f) {
  if (! file_exists63(file)) {
        var pdb = require("pdb");
    pdb.set_trace();
    throw new Error("File doesn't exist");
  }
  return call_with_directory(dirname(file), f);
};
exports["read-file"] = read_file;
exports.read_file = read_file;
exports["write-file"] = write_file;
exports.write_file = write_file;
exports["file-exists?"] = file_exists63;
exports.file_exists63 = file_exists63;
exports["directory-exists?"] = directory_exists63;
exports.directory_exists63 = directory_exists63;
exports["path-separator"] = path_separator;
exports.path_separator = path_separator;
exports["path-join"] = path_join;
exports.path_join = path_join;
exports["get-environment-variable"] = get_environment_variable;
exports.get_environment_variable = get_environment_variable;
exports.write = write;
exports.flush = flush;
exports["read-line"] = read_line;
exports.read_line = read_line;
exports.exit = exit;
exports.argv = argv;
exports["set-argv"] = set_argv;
exports.set_argv = set_argv;
exports["get-argv"] = get_argv;
exports.get_argv = get_argv;
exports["parse-positional"] = parse_positional;
exports.parse_positional = parse_positional;
exports["parse-option"] = parse_option;
exports.parse_option = parse_option;
exports["parse-arguments"] = parse_arguments;
exports.parse_arguments = parse_arguments;
exports.arguments = arguments;
exports.reload = reload;
exports.shell = shell;
exports.cwd = cwd;
exports.chdir = chdir;
exports["call-with-directory"] = call_with_directory;
exports.call_with_directory = call_with_directory;
exports["call-with-file-directory"] = call_with_file_directory;
exports.call_with_file_directory = call_with_file_directory;
exports.dirname = dirname;
exports.basename = basename;
exports.realpath = realpath;
