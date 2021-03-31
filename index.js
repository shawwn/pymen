#!/usr/bin/env node
var _G = (typeof _G !== "undefined") ? _G
  : (typeof global !== "undefined") ? global
  : (typeof window !== "undefined") ? window
  : (typeof self !== "undefined") ? self : this;

_G._G = _G;
_G.require = _G.require || require
_G.fs = require('fs')
_G.path = require('path')

_G.shellquote = (x) => ("'" + x.replace(/[']/g, '\'\\\'\'') + "'")

var child_process = require('child_process')

var lumen_bin = _G.path.join(__dirname, "bin", "lumen-lua")

var shell = function (command, ...args) {
  var cmdline = command + ' ' + args.map(_G.shellquote).join(' ')
  return child_process.execSync(cmdline).toString();
};

_G.compile_file_2 = (filename) => {
  var pwd = process.cwd()
  console.log('compile-file', filename)
  try {
    process.chdir(_G.path.dirname(filename))
    return shell(lumen_bin, "-c", _G.path.basename(filename), "-t", "js")
  } finally {
    process.chdir(pwd)
  }
}

_G.require.extensions['.l'] = function (module, filename) {
  const source = _G.compile_file_2(filename)
  const filename2 = filename.replace(/[.]l$/, '') + '.js'
  _G.fs.writeFileSync(filename2, source)
  module.exports = _G.require(filename2)
  return module
  //return module._compile(source, filename);
}

//const path = _G.require('path');
process.env.NODE_PATH = (process.env.NODE_PATH || "") + path.delimiter + path.join(__dirname);
if (_G.require.main === module) {
  module.paths = _G.require('module').Module._nodeModulePaths(_G.path.resolve('repl'));
}
_G.require('module').Module._initPaths();

Object.assign(exports, _G.require("./main.js"));

if (_G.require.main === module) {
  exports.main(process.argv.slice(2));
}
