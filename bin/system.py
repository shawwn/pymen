def read_file(path):
  pass
def write_file(path, data):
  pass
def file_exists63(path):
  pass
def directory_exists63(path):
  pass

def path_join(*_rest, **_params):
  __parts = unstash(_rest)
  def __f(x, y):
    return cat(x, path_separator, y)
  return reduce(__f, __parts) or ""
def get_environment_variable(name):
  pass
def write(x):
  pass
def exit(code):
  pass

def reload(module):
  delete 
  return require(module)
def run(command):
  pass
