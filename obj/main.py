reader = require("reader")
compiler = require("compiler")
system = require("system")
def eval_print(form):
  def __f():
    return compiler["eval"](form)
  def __f1(m):
    if obj63(m):
      return m
    else:

      if string63(m):
        __e = clip(m, search(m, ": ") + 2)
      else:

        if nil63(m):
          __e1 = ""
        else:
          __e1 = str(m)
        __e = __e1
      return {"stack": debug["traceback"](), "message": __e}
  ____id = [xpcall(__f, __f1)]
  __ok = ____id[1]
  __v = ____id[2]
  if not __ok:
    if is63(__v):
      return print(str(__v))
def rep(s):
  return eval_print(reader["read-string"](s))
def repl():
  __buf = ""
  def rep1(s):
    __buf = cat(__buf, s)
    __more = []
    __form = reader["read-string"](__buf, __more)
    if not( __form == __more):
      eval_print(__form)
      __buf = ""
      return system["write"]("> ")
  return system["write"]("> ")
def compile_file(path):
  __s = reader["stream"](system["read-file"](path))
  __body = reader["read-all"](__s)
  __form1 = compiler["expand"](join(["do"], __body))
  return compiler["compile"](__form1, {"_stash": True, "stmt": True})
def _load(path):
  __previous = target
  target = "py"
  __code = compile_file(path)
  target = __previous
  return compiler["run"](__code)
def script_file63(path):
  return not( "-" == char(path, 0) or ".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4))
def run_file(path):
  if script_file63(path):
    return _load(path)
  else:
    return compiler["run"](system["read-file"](path))
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
  __arg = hd(system["argv"])
  if __arg and script_file63(__arg):
    return _load(__arg)
  else:
    if __arg == "-h" or __arg == "--help":
      return usage()
    else:
      __pre = []
      __input = None
      __output = None
      __target1 = None
      __expr = None
      __argv = system["argv"]
      __i = 0
      while __i < _35(__argv):
        __a = __argv[__i]
        if __a == "-c" or __a == "-o" or __a == "-t" or __a == "-e":
          if __i == edge(__argv):
            print(cat("missing argument for ", __a))
          else:
            __i = __i + 1
            __val = __argv[__i]
            if __a == "-c":
              __input = __val
            else:
              if __a == "-o":
                __output = __val
              else:
                if __a == "-t":
                  __target1 = __val
                else:
                  if __a == "-e":
                    __expr = __val
        else:
          if not( "-" == char(__a, 0)):
            add(__pre, __a)
        __i = __i + 1
      ____x2 = __pre
      ____i1 = 0
      while ____i1 < _35(____x2):
        __file = ____x2[____i1]
        run_file(__file)
        ____i1 = ____i1 + 1
      if nil63(__input):
        if __expr:
          return rep(__expr)
        else:
          return repl()
      else:
        if __target1:
          target = __target1
        __code1 = compile_file(__input)
        if nil63(__output) or __output == "-":
          return print(__code1)
        else:
          return system["write-file"](__output, __code1)
main()
