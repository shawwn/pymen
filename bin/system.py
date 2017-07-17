def read_file(path):
  pass
def write_file(path, data):
  pass
def file_exists63(path):
  pass
def directory_exists63(path):
  pass

def path_join():
  __parts = unstash([...])
  def __f(x, y):
    return cat(x, path_separator, y)
  return _or(reduce(__f, __parts), "")
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
return {"read-file": read_file, "write-file": write_file, "file-exists?": file_exists63, "directory-exists?": directory_exists63, "path-separator": path_separator, "path-join": path_join, "get-environment-variable": get_environment_variable, "write": write, "exit": exit, "argv": argv, "reload": reload, "run": run}
