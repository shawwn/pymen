read_file = function (path)
  return call_with_file(function (f)
    return f.read()
  end, path, "r")
end
write_file = function (path, data)
  return call_with_file(function (f)
    return f.write(data)
  end, path, "w")
end
file_exists63 = function (path)
end
directory_exists63 = function (path)
end
path_separator
path_join = function (...)
  __parts = unstash([...])
  return _37or(reduce(function (x, y)
    return _37cat(x, _37cat(path_separator, y))
  end, __parts), "")
end
get_environment_variable = function (name)
end
write = function (x)
end
flush = function (x)
end
remove_newline = function (s)
  if _37eq(char(s, edge(s)), "\n") then
    s = clip(s, 0, edge(s))
  if _37eq(char(s, edge(s)), "\r") then
    s = clip(s, 0, edge(s))
  return s
end
read_line = function (on_ctrl_c)
end
exit = function (code)
end
argv
reload = function (module)
  delete 
  return require(module)
end
shell = function (command)
end
