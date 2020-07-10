from lumen import *
import sys
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
  pass

def directory_exists63(path=None):
  pass

path_separator = None
def path_join(*_args, **_keys):
  __parts = unstash(_args, _keys)
  def __f2(x=None, y=None):
    return cat(x, path_separator, y)
  return reduce(__f2, __parts) or ""

def get_environment_variable(name=None):
  pass

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
  return 

def run(command=None):
  pass

