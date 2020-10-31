function _G.foo(a, ...)
  local ____r3 = unstash({...})
  local __a1 = destash33(a, ____r3)
  local ____id1 = ____r3
  local __e1 = nil
  if nil63(has(____id1, "b")) then
    __e1 = 42
  else
    __e1 = has(____id1, "b")
  end
  local __b1 = __e1
  return __a1 + __b1 + 99
end
local __exports1 = exports or {}
__exports1.foo = foo
return __exports1
