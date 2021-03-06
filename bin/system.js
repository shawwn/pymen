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
var argv = cut(process.argv, 2);
var reload = function (module) {
  delete require.cache[require.resolve(module)];
  return require(module);
};
var shell = function (command) {
  return child_process.execSync(command).toString();
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
exports.reload = reload;
exports.shell = shell;
