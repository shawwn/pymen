from .runtime import *
from .macros import *
from . import reader
from . import compiler
from . import system
import traceback
____r = None
try:
  import numpy as np
  ____r = np
except ImportError:
  ____r = None
finally:
  pass
from types import ModuleType as module
def module63(x=None):
  return isinstance(x, module)

import inspect
def class63(x=None):
  return inspect.isclass(x)

def disp(L_str=None):
  system.write(L_str)
  return system.flush()

from pprint import pprint as pp
def entries(x=None):
  __r5 = []
  __mods = []
  ____x = dir(x)
  ____i = 0
  while ____i < L_35(____x):
    __k = ____x[____i]
    if not( clip(__k, 0, 2) == "__"):
      __v = getattr(x, __k)
      if function63(__v):
        add(__r5, __k)
      else:
        if module63(__v):
          add(__mods, cat(".", __k))
        else:
          add(__r5, [__k, __v])
    ____i = ____i + 1
  ____x2 = __mods
  ____i1 = 0
  while ____i1 < L_35(____x2):
    __x3 = ____x2[____i1]
    add(__r5, __x3)
    ____i1 = ____i1 + 1
  return __r5

from io import StringIO
def pp_to_string(x=None):
  __r7 = StringIO()
  pp(x, __r7)
  return __r7.getvalue()

def lines(x=None):
  return split(x, "\n")

def get_indentation(s=None):
  __r10 = ""
  __i2 = 0
  while __i2 < L_35(s):
    __c = char(s, __i2)
    if __c == " ":
      __r10 = cat(__r10, __c)
    __i2 = __i2 + 1
  return __r10

def strip_outer(s=None, lh=None, rh=None):
  if string_starts63(s, lh) and string_ends63(s, rh):
    return clip(clip(s, 0, L_35(s) - L_35(rh)), L_35(lh))
  else:
    return s

def pp_obj(x=None):
  s = pp_to_string(entries(x))
  s = s.rstrip()
  s = strip_outer(s, "[", "]")
  s = cat(" ", s)
  ____x4 = lines(s)
  ____i3 = 0
  while ____i3 < L_35(____x4):
    __x5 = ____x4[____i3]
    __ind = get_indentation(__x5)
    __x5 = __x5.rstrip(",")
    __id = simple_id63(strip_outer(__x5.strip(), "'", "'"))
    __e = None
    if __id:
      __e = cat(__ind, __id)
    else:
      __e = __x5
    L_print(__e)
    ____i3 = ____i3 + 1
  return L_print(repr(x))

def pp_doc(x=None):
  __doc = docstring(x)
  if __doc:
    return L_print(cat("\n\"\"\"\n", __doc.strip(), "\n\"\"\""))

def pp_toplevel(x=None):
  pp_doc(x)
  if module63(x) or class63(x):
    return pp_obj(x)
  else:
    return pp(x)

def docstring(x=None):
  def __f():
    try:
      __x8 = x.__doc__
      __e1 = None
      if string63(__x8):
        __e1 = __x8
      else:
        __e1 = L_str(__x8)
      return [True, __e1]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id1 = __f()
  ____ok = has(____id1, 0)
  ____v1 = has(____id1, 1)
  if ____ok:
    return ____v1
  else:
    return None

def lumen_set_globals(x=None):
  compiler.lumen_globals = x
  return compiler.lumen_globals

def toplevel_print(v=None):
  return pp_toplevel(v)

def print_exception(v=None, ex=None):
  traceback.print_exception(*ex)
  return None

L_37self = reader
def accessor_literal63(form=None):
  return string63(form) and (not string_literal63(form) and (not id_literal63(form) and (char(form, 0) == "." and (not( clip(form, 0, 2) == "..") and L_35(form) > 1))))

def eval_self_form(form=None):
  if form == ".":
    return "%self"
  else:
    if accessor_literal63(form):
      return ["%self", form]
    else:
      if not list63(form):
        return form
      else:
        if hd63(form, "%self") and L_35(form) > 1:
          return ["%set", "%self", form[1]]
        else:
          if hd63(form, "import") or hd63(form, "from") and has(form, 2) == "import":
            return ["%do", form, ["%set", "%self", last(form)]]
          else:
            if accessor_literal63(hd(form)):
              return join(["%self"], form)
            else:
              return form

def eval_print(form=None):
  __form = eval_self_form(form)
  def __f1():
    try:
      return [True, compiler.eval(__form)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id2 = __f1()
  __ok1 = has(____id2, 0)
  __v2 = has(____id2, 1)
  __ex = has(____id2, 2)
  if not __ok1:
    return print_exception(__v2, __ex)
  else:
    if is63(__v2):
      return toplevel_print(__v2)

def read_toplevel(L_str=None, more=None):
  __s = reader.stream(L_str, more)
  def __f2():
    try:
      return [True, reader.read_all(__s)]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id3 = __f2()
  ____ok2 = has(____id3, 0)
  ____v3 = has(____id3, 1)
  __e2 = None
  if ____ok2:
    __e2 = ____v3
  else:
    __e2 = None
  __x16 = __e2
  if __x16 == more:
    return more
  else:
    if nil63(__x16):
      return __x16
    else:
      if one63(__x16):
        return hd(__x16)
      else:
        return __x16

def rep(L_str=None):
  __v4 = eval(read_toplevel(L_str))
  if is63(__v4):
    return toplevel_print(__v4)

def repl():
  o = {"buf": ""}
  def reset():
    o["buf"] = ""
    return disp("> ")
  def ctrl_c():
    traceback.print_exc()
    reset()
    return ctrl_c
  def rep1(s=None):
    o["buf"] = cat(o["buf"], s)
    __more = []
    __form1 = read_toplevel(o["buf"], __more)
    if not( __form1 == __more):
      eval_print(__form1)
      return reset()
  reset()
  while True:
    __s1 = system.read_line(ctrl_c)
    if not( __s1 == ctrl_c):
      if is63(__s1):
        rep1(cat(__s1, "\n"))
      else:
        break

def __with_file_directory__macro(file=None, name=None, *_args, **_keys):
  ____r29 = unstash(_args, _keys)
  __file1 = destash33(file, ____r29)
  __name1 = destash33(name, ____r29)
  ____id5 = ____r29
  __body1 = cut(____id5, 0)
  __cwd1 = unique("cwd")
  return ["let", [__cwd1, ["system", [".cwd"]], __name1, __file1, __name1, ["system", [".basename", __file1]]], ["system", [".chdir", ["system", [".dirname", __file1]]]], ["after", join(["do"], __body1), ["system", [".chdir", __cwd1]]]]

setenv("with-file-directory", macro=__with_file_directory__macro)
def read_file(path=None):
  ____cwd2 = system.cwd()
  __name2 = path
  __name3 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r32 = None
  try:
    ____r32 = system.read_file(__name3)
  finally:
    system.chdir(____cwd2)
  return ____r32

def read_from_file(path=None):
  __data = read_file(path)
  ____cwd3 = system.cwd()
  __name4 = path
  __name5 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r35 = None
  try:
    __s2 = reader.stream(__data)
    ____r35 = reader.read_all(__s2)
  finally:
    system.chdir(____cwd3)
  return ____r35

def expand_file(path=None):
  __body2 = read_from_file(path)
  ____cwd4 = system.cwd()
  __name6 = path
  __name7 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r38 = None
  try:
    ____r38 = compiler.expand(join(["do"], __body2))
  finally:
    system.chdir(____cwd4)
  return ____r38

def compile_file(path=None):
  __form2 = expand_file(path)
  ____cwd5 = system.cwd()
  __name8 = path
  __name9 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r41 = None
  try:
    ____r41 = compiler.compile(__form2, stmt=True)
  finally:
    system.chdir(____cwd5)
  return ____r41

def load(path=None):
  __previous = has(setenv("target", toplevel=True), "value")
  __previous_indent = has(setenv("indent-level", toplevel=True), "value")
  setenv("target", toplevel=True)["value"] = "py"
  setenv("indent-level", toplevel=True)["value"] = 0
  __code = compile_file(path)
  setenv("indent-level", toplevel=True)["value"] = __previous_indent
  setenv("target", toplevel=True)["value"] = __previous
  ____cwd6 = system.cwd()
  __name10 = path
  __name11 = system.basename(path)
  system.chdir(system.dirname(path))
  ____r44 = None
  try:
    ____r44 = compiler.run(__code)
  finally:
    system.chdir(____cwd6)
  return ____r44

def run_script(path=None, argv=None):
  if nil63(argv):
    argv = []
  L_print(L_str(["run-script", path, argv]))
  system.set_argv(argv)
  _G.exports = {}
  load(path)
  if _G.exports.main:
    return _G.exports.main(argv)

def script_file63(path=None):
  return not( "-" == char(path, 0) or (".py" == clip(path, L_35(path) - 3) or (".js" == clip(path, L_35(path) - 3) or ".lua" == clip(path, L_35(path) - 4))))

def run_file(path=None):
  if script_file63(path):
    return load(path)
  else:
    return compiler.run(system.read_file(path))

def usage():
  L_print("usage: lumen [<file> <arguments> | options <object files>]")
  L_print(" <file>\t\tProgram read from script file")
  L_print(" <arguments>\tPassed to program in system.argv")
  L_print(" <object files>\tLoaded before compiling <input>")
  L_print("options:")
  L_print(" -c <input>\tCompile input file")
  L_print(" -o <output>\tOutput file")
  L_print(" -t <target>\tTarget language (default: lua)")
  return L_print(" -e <expr>\tExpression to evaluate")

def main(args=None):
  L_print(L_str(args))
  __arg = hd(args)
  if __arg and script_file63(__arg):
    return run_script(__arg, tl(args))
  else:
    if __arg == "-h" or __arg == "--help":
      return usage()
    else:
      __pre = []
      __input = None
      __output = None
      __target1 = None
      __expr = None
      __argv = args
      __i4 = 0
      while __i4 < L_35(__argv):
        __a = __argv[__i4]
        if __a == "-c" or (__a == "-o" or (__a == "-t" or __a == "-e")):
          if __i4 == edge(__argv):
            L_print(cat("missing argument for ", __a))
          else:
            __i4 = __i4 + 1
            __val = __argv[__i4]
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
        __i4 = __i4 + 1
      ____x50 = __pre
      ____i5 = 0
      while ____i5 < L_35(____x50):
        __file2 = ____x50[____i5]
        run_file(__file2)
        ____i5 = ____i5 + 1
      if nil63(__input):
        if __expr:
          return rep(__expr)
        else:
          return repl()
      else:
        if __target1:
          setenv("target", toplevel=True)["value"] = __target1
        __code1 = compile_file(__input)
        if nil63(__output) or __output == "-":
          return L_print(__code1)
        else:
          return system.write_file(__output, __code1)

def main63():
  return __name__ == "__main__"

if main63():
  main(system.get_argv())
