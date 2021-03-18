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
  var __parts1 = unstash([..._42args]);
  return reduce(function (x, y) {
    return x + (path_separator + y);
  }, __parts1) || "";
};
var get_environment_variable = function (name) {
  return process.env[name];
};
var write = function (x) {
  var __out1 = process.stdout;
  return __out1.write(x);
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
get_argv = function () {
  if (nil63(argv)) {
    set_argv(cut(process.argv, 2));
  }
  return argv;
};
var opt63 = function (x) {
  return string63(x) && (char(x, 0) === "-" && !( x === "-"));
};
parse_positional = function (args, pos) {
  if (nil63(pos)) {
    pos = 0;
  }
  return cut(args, either(pos, 0), first(opt63, args, pos));
};
parse_option = function (args) {
  if (opt63(hd(args))) {
    return [hd(args), parse_positional(args, 1)];
  }
};
parse_arguments = function (aliases, argv) {
  var __l1 = argv || get_argv();
  var __a1 = aliases || {};
  var __r46 = parse_positional(__l1);
  __l1 = cut(__l1, _35(__r46));
  while (true) {
    var __p1 = parse_option(__l1);
    if (! __p1) {
      break;
    }
    var ____y1 = __p1;
    if (yes(____y1)) {
      var ____id2 = ____y1;
      var __op1 = has(____id2, 0);
      var __args3 = has(____id2, 1);
      if (__op1 === "--") {
        __l1 = cut(__l1, 1);
        break;
      }
      __l1 = cut(__l1, 1 + _35(__args3));
      var __e2 = undefined;
      if (clip(__op1, 0, 2) === "--") {
        __e2 = clip(__op1, 2);
      } else {
        __e2 = clip(__op1, 1);
      }
      var __k2 = __e2;
      var __k3 = has(__a1, __k2, __k2);
      var __e3 = undefined;
      if (none63(__args3)) {
        __e3 = true;
      } else {
        __e3 = __args3;
      }
      var __v2 = __e3;
      __r46[__k3] = __v2;
      add(__r46, [__k3, __v2]);
    }
  }
  __r46.rest = __l1;
  set_argv(__r46.rest);
  return __r46;
};
arguments = function (aliases, argv) {
  var __argv1 = argv || get_argv();
  var __r48 = parse_arguments(__argv1, aliases);
  set_argv(__r48.rest);
  delete __r48.rest;
  if (! empty63(__r48)) {
    return __r48;
  }
};
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
  var __pwd1 = cwd();
  chdir(path);
  var ____id3 = (function () {
    try {
      return [true, f()];
    }
    catch (e) {
      return [false, e];
    }
  })();
  var __ok1 = has(____id3, 0);
  var __v3 = has(____id3, 1);
  chdir(__pwd1);
  if (__ok1) {
    return __v3;
  } else {
    throw __v3;
  }
};
var dirname = function (filename) {
  var __result1 = apply(path_join, almost(split(filename, path_separator)));
  if (none63(__result1)) {
    return ".";
  } else {
    return __result1;
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
