local read_file = function (path)
end
local write_file = function (path, data)
end
local file_exists63 = function (path)
end
local directory_exists63 = function (path)
end
local path_separator
local path_join = function ()
  local __parts = unstash([...])
  local __f = function (x, y)
    return cat(x, path_separator, y)
  end
  return _or(reduce(__f, __parts), "")
end
local get_environment_variable = function (name)
end
local write = function (x)
end
local exit = function (code)
end
local argv
local reload = function (module)
  delete 
  return require(module)
end
local run = function (command)
end
return {"read-file": read_file, "write-file": write_file, "file-exists?": file_exists63, "directory-exists?": directory_exists63, "path-separator": path_separator, "path-join": path_join, "get-environment-variable": get_environment_variable, "write": write, "exit": exit, "argv": argv, "reload": reload, "run": run}
