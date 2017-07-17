read_file = function (path)
end
write_file = function (path, data)
end
file_exists63 = function (path)
end
directory_exists63 = function (path)
end

path_join = function ()
  __parts = unstash([...])
  __f = function (x, y)
    return cat(x, path_separator, y)
  end
  return _or(reduce(__f, __parts), "")
end
get_environment_variable = function (name)
end
write = function (x)
end
exit = function (code)
end

reload = function (module)
  delete 
  return require(module)
end
run = function (command)
end
return {"read-file": read_file, "write-file": write_file, "file-exists?": file_exists63, "directory-exists?": directory_exists63, "path-separator": path_separator, "path-join": path_join, "get-environment-variable": get_environment_variable, "write": write, "exit": exit, "argv": argv, "reload": reload, "run": run}
