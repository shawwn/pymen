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

argv = None
def set_argv(l=None):
  global argv
  argv = l
  return argv

set_argv = set_argv
def get_argv():
  if nil63(argv):
    set_argv(cut(sys.argv, 1))
  return argv

get_argv = get_argv
def opt63(x=None):
  return string63(x) and (char(x, 0) == "-" and not( x == "-"))

def parse_positional(args=None, pos=None):
  if nil63(pos):
    pos = 0
  return cut(args, either(pos, 0), first(opt63, args, pos))

parse_positional = parse_positional
def parse_option(args=None):
  if opt63(hd(args)):
    return [hd(args), parse_positional(args, 1)]

parse_option = parse_option
def parse_arguments(aliases=None, argv=None):
  __l = argv or get_argv()
  __a = aliases or {}
  __r21 = parse_positional(__l)
  __l = cut(__l, L_35(__r21))
  while True:
    __p = parse_option(__l)
    if not __p:
      break
    ____y = __p
    if yes(____y):
      ____id = ____y
      __op = has(____id, 0)
      __args = has(____id, 1)
      if __op == "--":
        __l = cut(__l, 1)
        break
      __l = cut(__l, 1 + L_35(__args))
      __e3 = None
      if clip(__op, 0, 2) == "--":
        __e3 = clip(__op, 2)
      else:
        __e3 = clip(__op, 1)
      __k = __e3
      __k1 = has(__a, __k, __k)
      __e4 = None
      if none63(__args):
        __e4 = True
      else:
        __e4 = __args
      __v = __e4
      __r21[__k1] = __v
      add(__r21, [__k1, __v])
  __r21["rest"] = __l
  set_argv(__r21["rest"])
  return __r21

parse_arguments = parse_arguments
def arguments(aliases=None, argv=None):
  __argv = argv or get_argv()
  __r23 = parse_arguments(__argv, aliases)
  set_argv(__r23["rest"])
  del __r23["rest"]
  if not empty63(__r23):
    return __r23

arguments = arguments
def realpath(filename=None):
  return fs.realpath(filename)

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
  ____id1 = __f3()
  __ok = has(____id1, 0)
  __v1 = has(____id1, 1)
  chdir(__pwd)
  if __ok:
    return __v1
  else:
    raise __v1

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

