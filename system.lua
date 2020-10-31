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
  local __id2 = is63(__f)
  local __e3 = nil
  if __id2 then
    local __r6 = is63(__f.read(__f, 0)) or 0 == __f.seek(__f, "end")
    __f.close(__f)
    __e3 = __r6
  else
    __e3 = __id2
  end
  return __e3
end
local function directory_exists63(path)
  local __f1 = io.open(path)
  local __id3 = is63(__f1)
  local __e4 = nil
  if __id3 then
    local __r8 = not __f1.read(__f1, 0) and not( 0 == __f1.seek(__f1, "end"))
    __f1.close(__f1)
    __e4 = __r8
  else
    __e4 = __id3
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
local argv = arg
local function realpath(filename)
  if uv and uv.fs_realpath then
    return uv.fs_realpath(filename)
  else
    return filename
  end
end
local function reload(module)
  local ____y = realpath(requireResolve(module))
  if yes(____y) then
    local __file = ____y
    package.loaded[__file] = nil
  end
  package.loaded[module] = nil
  return require(module)
end
local function shell(command)
  local __f2 = io.popen(command)
  local __x5 = __f2.read(__f2, "*all")
  __f2.close(__f2)
  return __x5
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
  local ____id1 = {xpcall(function ()
    return f()
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e5 = nil
      if string63(m) then
        __e5 = clip(m, search(m, ": ") + 2)
      else
        local __e6 = nil
        if nil63(m) then
          __e6 = ""
        else
          __e6 = str(m)
        end
        __e5 = __e6
      end
      return {
        stack = debug.traceback(),
        message = __e5
      }
    end
  end)}
  local __ok1 = has(____id1, 1)
  local __v1 = has(____id1, 2)
  chdir(__pwd)
  if __ok1 then
    return __v1
  else
    error(__v1)
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
return __exports
