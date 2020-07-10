local function call_with_file(f, path, mode)
  local h,e = io.open(path, mode)
  if not h then
    error(e)
  end
  local __x = f(h)
  h.close(h)
  return __x
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
  local __id = is63(__f)
  local __e = nil
  if __id then
    local __r6 = is63(__f.read(__f, 0)) or 0 == __f.seek(__f, "end")
    __f.close(__f)
    __e = __r6
  else
    __e = __id
  end
  return __e
end
local function directory_exists63(path)
  local __f1 = io.open(path)
  local __id1 = is63(__f1)
  local __e1 = nil
  if __id1 then
    local __r8 = not __f1.read(__f1, 0) and not( 0 == __f1.seek(__f1, "end"))
    __f1.close(__f1)
    __e1 = __r8
  else
    __e1 = __id1
  end
  return __e1
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
local function reload(module)
  package.loaded[module] = nil
  return require(module)
end
local function run(command)
  local __f2 = io.popen(command)
  local __x2 = __f2.read(__f2, "*all")
  __f2.close(__f2)
  return __x2
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
__exports.run = run
return __exports
