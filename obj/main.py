local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
local eval_print = function (form)
  local __f = function ()
    return compiler["eval"](form)
  end
  local __f1 = function (m)
    if obj63(m) then
      return m
    else
      local __e
      if string63(m) then
        __e = clip(m, search(m, ": ") + 2)
      else
        local __e1
        if nil63(m) then
          __e1 = ""
        else
          __e1 = str(m)

        __e = __e1

      return {"stack": debug.traceback(), "message": __e}

  end
  local ____id = [xpcall(__f, __f1)]
  local __ok = ____id[1]
  local __v = ____id[2]
  if _not(__ok) then
    if is63(__v) then
      return print(str(__v))


end
local rep = function (s)
  return eval_print(reader["read-string"](s))
end
local repl = function ()
  local __buf = ""
  local rep1 = function (s)
    __buf = cat(__buf, s)
    local __more = []
    local __form = reader["read-string"](__buf, __more)
    if _not(_61(__form, __more)) then
      eval_print(__form)
      __buf = ""
      return system.write("> ")

  end
  return system.write("> ")
end
compile_file = function (path)
  local __s = reader.stream(system["read-file"](path))
  local __body = reader["read-all"](__s)
  local __form1 = compiler.expand(join(["do"], __body))
  return compiler.compile(__form1, {"_stash": true, "stmt": true})
end
_load = function (path)
  local __previous = target
  target = "py"
  local __code = compile_file(path)
  target = __previous
  return compiler.run(__code)
end
local script_file63 = function (path)
  return _not(_or(_61("-", char(path, 0)), _61(".js", clip(path, _35(path) - 3))))
end
local run_file = function (path)
  if script_file63(path) then
    return _load(path)
  else
    return compiler.run(system["read-file"](path))

end
local usage = function ()
  print("usage: lumen [<file> <arguments> | options <object files>]")
  print(" <file>\t\tProgram read from script file")
  print(" <arguments>\tPassed to program in system.argv")
  print(" <object files>\tLoaded before compiling <input>")
  print("options:")
  print(" -c <input>\tCompile input file")
  print(" -o <output>\tOutput file")
  print(" -t <target>\tTarget language (default: lua)")
  return print(" -e <expr>\tExpression to evaluate")
end
local main = function ()
  local __arg = hd(system.argv)
  if _and(__arg, script_file63(__arg)) then
    return _load(__arg)
  else
    if _or(_61(__arg, "-h"), _61(__arg, "--help")) then
      return usage()
    else
      local __pre = []
      local __input = undefined
      local __output = undefined
      local __target1 = undefined
      local __expr = undefined
      local __argv = system.argv
      local __i = 0
      while __i < _35(__argv) do
        local __a = __argv[__i]
        if _or(_61(__a, "-c"), _61(__a, "-o")) then
          if _61(__i, edge(__argv)) then
            print(cat("missing argument for ", __a))
          else
            __i = __i + 1
            local __val = __argv[__i]
            if _61(__a, "-c") then
              __input = __val
            else
              if _61(__a, "-o") then
                __output = __val
              else
                if _61(__a, "-t") then
                  __target1 = __val
                else
                  if _61(__a, "-e") then
                    __expr = __val





        else
          if _not(_61("-", char(__a, 0))) then
            add(__pre, __a)


        __i = __i + 1
      end
      local ____x2 = __pre
      local ____i1 = 0
      while ____i1 < _35(____x2) do
        local __file = ____x2[____i1]
        run_file(__file)
        ____i1 = ____i1 + 1
      end
      if nil63(__input) then
        if __expr then
          return rep(__expr)
        else
          return repl()

      else
        if __target1 then
          target = __target1

        local __code1 = compile_file(__input)
        if _or(nil63(__output), _61(__output, "-")) then
          return print(__code1)
        else
          return system["write-file"](__output, __code1)




end
main()
