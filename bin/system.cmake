function(read_file path)
  function(__f f)
    return(PROPAGATE f.read())
  endfunction()
  return(PROPAGATE call_with_file(__f path "r"))
endfunction()
function(write_file path data)
  function(__f1 f)
    return(PROPAGATE f.write(data))
  endfunction()
  return(PROPAGATE call_with_file(__f1 path "w"))
endfunction()
function(file_exists63 path)
endfunction()
function(directory_exists63 path)
endfunction()
set(path_separator "")
function(path_join ...)
  set(__parts unstash(...))
  function(__f2 x y)
    return(PROPAGATE _37cat(x _37cat(path_separator y)))
  endfunction()
  return(PROPAGATE reduce(__f2 __parts) OR "")
endfunction()
function(get_environment_variable name)
endfunction()
function(write x)
endfunction()
function(flush x)
endfunction()
function(remove_newline s)
  if(_37eq(char(s edge(s)) "\n"))
    set(s clip(s 0 edge(s)))
  endif()
  if(_37eq(char(s edge(s)) "\r"))
    set(s clip(s 0 edge(s)))
  endif()
  return(PROPAGATE s)
endfunction()
function(read_line on_ctrl_c)
endfunction()
function(exit code)
endfunction()
set(argv "")
function(reload module)
  delete 
  return(PROPAGATE require(module))
endfunction()
function(shell command)
endfunction()
