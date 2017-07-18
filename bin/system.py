def read_file(path=None):
  pass
def write_file(path=None, data=None):
  pass
def file_exists63(path=None):
  pass
def directory_exists63(path=None):
  pass

def path_join(*_rest, **_params):
  __parts = unstash(list(_rest))
  def __f(x=None, y=None):
    return cat(x, path_separator, y)
  return reduce(__f, __parts) or ""
def get_environment_variable(name=None):
  pass
def write(x=None):
  pass
def exit(code=None):
  pass

def reload(module=None):
  delete 
  return require(module)
def run(command=None):
  pass
