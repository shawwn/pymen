reader = require("reader")
compiler = require("compiler")
system = require("system")
def eval_print(form):
  def __f():
    return compiler["eval"](form)
  def __f1(m):
    if obj63(m) then
      return m
    else

      if string63(m) then
        __e = clip(m, search(m, ": ") + 2)
      else

        if nil63(m) then
          __e1 = ""
        else
          __e1 = str(m)

        __e = __e1

      return {"stack": debug.traceback(), "message": __e}

  ____id = [xpcall(__f, __f1)]
  __ok = ____id[1]
  __v = ____id[2]
  if _not(__ok) then
    if is63(__v) then
      return print(str(__v))


def rep(s):
  return eval_print(reader["read-string"](s))
def repl():
  __buf = ""
  def rep1(s):
    __buf = cat(__buf, s)
    __more = []
    __form = reader["read-string"](__buf, __more)
    if _not(_61(__form, __more)) then
      eval_print(__form)
      __buf = ""
      return system.write("> ")

  return system.write("> ")
def compile_file(path):
  __s = reader.stream(system["read-file"](path))
  __body = reader["read-all"](__s)
  __form1 = compiler.expand(join(["do"], __body))
  return compiler.compile(__form1, {"_stash": True, "stmt": True})
def _load(path):
  __previous = target
  target = "py"
  __code = compile_file(path)
  target = __previous
  return compiler.run(__code)
def script_file63(path):
  return _not(_or(_61("-", char(path, 0)), _61(".js", clip(path, _35(path) - 3))))
def run_file(path):
  if script_file63(path) then
    return _load(path)
  else
    return compiler.run(system["read-file"](path))

def usage():
  print("usage: lumen [<file> <arguments> | options <object files>]")
  print(" <file>\t\tProgram read from script file")
  print(" <arguments>\tPassed to program in system.argv")
  print(" <object files>\tLoaded before compiling <input>")
  print("options:")
  print(" -c <input>\tCompile input file")
  print(" -o <output>\tOutput file")
  print(" -t <target>\tTarget language (default: lua)")
  return print(" -e <expr>\tExpression to evaluate")
def main():
  __arg = hd(system.argv)
  if _and(__arg, script_file63(__arg)) then
    return _load(__arg)
  else
    if _or(_61(__arg, "-h"), _61(__arg, "--help")) then
      return usage()
    else
      __pre = []
      __input = None
      __output = None
      __target1 = None
      __expr = None
      __argv = system.argv
      __i = 0
      while __i < _35(__argv) do
        __a = __argv[__i]
        if _or(_61(__a, "-c"), _61(__a, "-o")) then
          if _61(__i, edge(__argv)) then
            print(cat("missing argument for ", __a))
          else
            __i = __i + 1
            __val = __argv[__i]
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
      ____x2 = __pre
      ____i1 = 0
      while ____i1 < _35(____x2) do
        __file = ____x2[____i1]
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

        __code1 = compile_file(__input)
        if _or(nil63(__output), _61(__output, "-")) then
          return print(__code1)
        else
          return system["write-file"](__output, __code1)




main()
