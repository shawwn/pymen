from .runtime import *
import sys
import os
def call_with_file(f=None, path=None, mode=None):
  __e = None
  with open(path, mode) as h:
    __e = f(h)
  return __e

def read_file(path=None):
  def __f(f=None):
    return f.read()
  return call_with_file(__f, path, "r")

def write_file(path=None, data=None):
  def __f1(f=None):
    return f.write(data)
  return call_with_file(__f1, path, "w")

def file_exists63(path=None):
  return os.path.isfile(path)

def directory_exists63(path=None):
  return os.path.isdir(path)

path_separator = os.path.sep
def path_join(*_args, **_keys):
  __parts = unstash(_args, _keys)
  def __f2(x=None, y=None):
    return cat(x, path_separator, y)
  return reduce(__f2, __parts) or ""

def get_environment_variable(name=None):
  return os.getenv(name)

def write(x=None):
  return sys.stdout.write(x)

def flush(x=None):
  return sys.stdout.flush()

def remove_newline(s=None):
  if char(s, edge(s)) == "\n":
    s = clip(s, 0, edge(s))
  if char(s, edge(s)) == "\r":
    s = clip(s, 0, edge(s))
  return s

def read_line(on_ctrl_c=None):
  ____r13 = None
  try:
    __line = sys.stdin.readline()
    __e1 = None
    if not( __line == ""):
      __e1 = remove_newline(__line)
    ____r13 = __e1
  except KeyboardInterrupt:
    __e2 = None
    if function63(on_ctrl_c):
      __e2 = on_ctrl_c()
    else:
      __e2 = on_ctrl_c
    ____r13 = __e2
  finally:
    pass
  return ____r13

def exit(code=None):
  pass

argv = cut(sys.argv, 1)
def reload(module=None):
  import importlib
  return importlib.reload(module)

def shell(command=None):
  pass

def cwd():
  return os.getcwd()

def chdir(path=None):
  return os.chdir(path)

def call_with_directory(path=None, f=None):
  if not directory_exists63(path):
    import pdb
    pdb.set_trace()
    raise Exception("Directory doesn't exist")
  __pwd = cwd()
  chdir(path)
  def __f3():
    try:
      return [True, f()]
    except:
      import sys
      e = sys.exc_info()
      return [False, e[1], e]
  ____id = __f3()
  __ok = has(____id, 0)
  __v = has(____id, 1)
  chdir(__pwd)
  if __ok:
    return __v
  else:
    raise __v

def dirname(filename=None):
  __result = apply(path_join, almost(split(filename, path_separator)))
  if none63(__result):
    return "."
  else:
    return __result

def basename(filename=None):
  return last(split(filename, path_separator))

def call_with_file_directory(file=None, f=None):
  if not file_exists63(file):
    import pdb
    pdb.set_trace()
    raise Exception("File doesn't exist")
  return call_with_directory(dirname(file), f)

