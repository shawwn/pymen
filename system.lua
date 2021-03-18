local ____id = {xpcall(function ()
  return require("luv")
end, function (m)
  if obj63(m) then
    return m
  else
    local __e = nil
    if string63(m) then
      __e = clip(m, search(m, ": ") + 2)
    else
      local __e1 = nil
      if nil63(m) then
        __e1 = ""
      else
        __e1 = str(m)
      end
      __e = __e1
    end
    return {
      stack = debug.traceback(),
      message = __e
    }
  end
end)}
local ____ok = has(____id, 1)
local ____v = has(____id, 2)
local __e2 = nil
if ____ok then
  __e2 = ____v
else
  __e2 = nil
end
local uv = __e2
local function call_with_file(f, path, mode)
  local h,e = io.open(path, mode)
  if not h then
    error(e)
  end
  local __x3 = f(h)
  h.close(h)
  return __x3
end
local function read_file(path)
  return call_with_file(function (f)
    return f.read(f, "*a")
  end, path, "r")
end
local function write_file(path, data)
  return call_with_file(function (f)
    return f.write(f, data)
  end, path, "w")
end
local function file_exists63(path)
  local __f = io.open(path)
  local __id3 = is63(__f)
  local __e3 = nil
  if __id3 then
    local __r6 = is63(__f.read(__f, 0)) or 0 == __f.seek(__f, "end")
    __f.close(__f)
    __e3 = __r6
  else
    __e3 = __id3
  end
  return __e3
end
local function directory_exists63(path)
  local __f1 = io.open(path)
  local __id4 = is63(__f1)
  local __e4 = nil
  if __id4 then
    local __r8 = not __f1.read(__f1, 0) and not( 0 == __f1.seek(__f1, "end"))
    __f1.close(__f1)
    __e4 = __r8
  else
    __e4 = __id4
  end
  return __e4
end
local path_separator = char(_G.package.config, 0)
local function path_join(...)
  local __parts = unstash({...})
  return reduce(function (x, y)
    return x .. (path_separator .. y)
  end, __parts) or ""
end
local function get_environment_variable(name)
  return os.getenv(name)
end
local function write(x)
  return io.write(x)
end
local function flush(x)
end
local function remove_newline(s)
  if char(s, edge(s)) == "\n" then
    s = clip(s, 0, edge(s))
  end
  if char(s, edge(s)) == "\r" then
    s = clip(s, 0, edge(s))
  end
  return s
end
local function read_line(on_ctrl_c)
  return io.read()
end
local function exit(code)
  return os.exit(code)
end
local argv = nil
function _G.set_argv(l)
  argv = l
  return argv
end
function _G.get_argv()
  if nil63(argv) then
    set_argv(_G.arg or (_G.args or {}))
  end
  return argv
end
local function opt63(x)
  return string63(x) and (char(x, 0) == "-" and not( x == "-"))
end
function _G.parse_positional(args, pos)
  if nil63(pos) then
    pos = 0
  end
  return cut(args, either(pos, 0), first(opt63, args, pos))
end
function _G.parse_option(args)
  if opt63(hd(args)) then
    return {hd(args), parse_positional(args, 1)}
  end
end
function _G.parse_arguments(aliases, argv)
  local __l = argv or get_argv()
  local __a = aliases or {}
  local __r22 = parse_positional(__l)
  __l = cut(__l, _35(__r22))
  while true do
    local __p = parse_option(__l)
    if not __p then
      break
    end
    local ____y = __p
    if yes(____y) then
      local ____id1 = ____y
      local __op = has(____id1, 1)
      local __args2 = has(____id1, 2)
      if __op == "--" then
        __l = cut(__l, 1)
        break
      end
      __l = cut(__l, 1 + _35(__args2))
      local __e5 = nil
      if clip(__op, 0, 2) == "--" then
        __e5 = clip(__op, 2)
      else
        __e5 = clip(__op, 1)
      end
      local __k = __e5
      local __k1 = has(__a, __k, __k)
      local __e6 = nil
      if none63(__args2) then
        __e6 = true
      else
        __e6 = __args2
      end
      local __v1 = __e6
      __r22[__k1] = __v1
      add(__r22, {__k1, __v1})
    end
  end
  __r22.rest = __l
  set_argv(__r22.rest)
  return __r22
end
function _G.arguments(aliases, argv)
  local __argv = argv or get_argv()
  local __r24 = parse_arguments(__argv, aliases)
  set_argv(__r24.rest)
  __r24.rest = nil
  if not empty63(__r24) then
    return __r24
  end
end
local function realpath(filename)
  if uv and uv.fs_realpath then
    return uv.fs_realpath(filename)
  else
    return filename
  end
end
local function reload(module)
  local ____y1 = realpath(requireResolve(module))
  if yes(____y1) then
    local __file = ____y1
    package.loaded[__file] = nil
  end
  package.loaded[module] = nil
  return require(module)
end
local function shell(command)
  local __f2 = io.popen(command)
  local __x7 = __f2.read(__f2, "*all")
  __f2.close(__f2)
  return __x7
end
local function cwd()
  return uv.cwd()
end
local function chdir(path)
  return uv.chdir(path)
end
local function call_with_directory(path, f)
  if not directory_exists63(path) then
        local pdb = require("pdb")
    pdb.set_trace()
    error("Directory doesn't exist")
  end
  local __pwd = cwd()
  chdir(path)
  local ____id2 = {xpcall(function ()
    return f()
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e7 = nil
      if string63(m) then
        __e7 = clip(m, search(m, ": ") + 2)
      else
        local __e8 = nil
        if nil63(m) then
          __e8 = ""
        else
          __e8 = str(m)
        end
        __e7 = __e8
      end
      return {
        stack = debug.traceback(),
        message = __e7
      }
    end
  end)}
  local __ok1 = has(____id2, 1)
  local __v2 = has(____id2, 2)
  chdir(__pwd)
  if __ok1 then
    return __v2
  else
    error(__v2)
  end
end
local function dirname(filename)
  local __result = apply(path_join, almost(split(filename, path_separator)))
  if none63(__result) then
    return "."
  else
    return __result
  end
end
local function basename(filename)
  return last(split(filename, path_separator))
end
local function call_with_file_directory(file, f)
  if not file_exists63(file) then
        local pdb = require("pdb")
    pdb.set_trace()
    error("File doesn't exist")
  end
  return call_with_directory(dirname(file), f)
end
local __exports = exports or {}
__exports["read-file"] = read_file
__exports.read_file = read_file
__exports["write-file"] = write_file
__exports.write_file = write_file
__exports["file-exists?"] = file_exists63
__exports.file_exists63 = file_exists63
__exports["directory-exists?"] = directory_exists63
__exports.directory_exists63 = directory_exists63
__exports["path-separator"] = path_separator
__exports.path_separator = path_separator
__exports["path-join"] = path_join
__exports.path_join = path_join
__exports["get-environment-variable"] = get_environment_variable
__exports.get_environment_variable = get_environment_variable
__exports.write = write
__exports.flush = flush
__exports["read-line"] = read_line
__exports.read_line = read_line
__exports.exit = exit
__exports.argv = argv
__exports["set-argv"] = set_argv
__exports.set_argv = set_argv
__exports["get-argv"] = get_argv
__exports.get_argv = get_argv
__exports["parse-positional"] = parse_positional
__exports.parse_positional = parse_positional
__exports["parse-option"] = parse_option
__exports.parse_option = parse_option
__exports["parse-arguments"] = parse_arguments
__exports.parse_arguments = parse_arguments
__exports.arguments = arguments
__exports.reload = reload
__exports.shell = shell
__exports.cwd = cwd
__exports.chdir = chdir
__exports["call-with-directory"] = call_with_directory
__exports.call_with_directory = call_with_directory
__exports["call-with-file-directory"] = call_with_file_directory
__exports.call_with_file_directory = call_with_file_directory
__exports.dirname = dirname
__exports.basename = basename
__exports.realpath = realpath
return __exports
