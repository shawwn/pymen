from pymen.main import load
load("lib.l")
def foo(a=None, *_args, **_keys):
  ____r = unstash(_args, _keys)
  __a = destash33(a, ____r)
  ____id = ____r
  __e = None
  if nil63(has(____id, "b")):
    __e = 42
  else:
    __e = has(____id, "b")
  __b = __e
  return __a + __b

