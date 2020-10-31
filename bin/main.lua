local runtime = require("runtime")
local macros = require("macros")
local reader = require("reader")
local compiler = require("compiler")
local system = require("system")
function _G.disp(str)
  system.write(str)
  return system.flush()
end
function _G.pp(x)
  if list63(x) and _35(x) > 1 then
    local __c = "  "
    local __nl = nil
    print("(")
    local ____x = x
    local ____i = 0
    while ____i < _35(____x) do
      local __v = ____x[____i + 1]
      if __nl then
        print("")
      end
      disp(__c)
      __nl = true
      __c = "  "
      print(str(__v))
      ____i = ____i + 1
    end
    return print(")")
  else
    return print(str(x))
  end
end
function _G.dir(x)
  local __r3 = {}
  local ____o = x
  local __k = nil
  for __k in next, ____o do
    local __v1 = ____o[__k]
    add(__r3, __k)
  end
  return __r3
end
function _G.lines(x)
  return split(x, "\n")
end
function _G.get_indentation(s)
  local __r6 = ""
  local __i2 = 0
  while __i2 < _35(s) do
    local __c1 = char(s, __i2)
    if __c1 == " " then
      __r6 = __r6 .. __c1
    end
    __i2 = __i2 + 1
  end
  return __r6
end
function _G.strip_outer(s, lh, rh)
  if string_starts63(s, lh) and string_ends63(s, rh) then
    return clip(clip(s, 0, _35(s) - _35(rh)), _35(lh))
  else
    return s
  end
end
function _G.toplevel_print(v)
  return pp(v)
end
function _G.print_exception(v, ex)
  print("error: " .. (v.message .. ("\n" .. v.stack)))
  return nil
end
_37self = reader
local function accessor_literal63(form)
  return string63(form) and (not string_literal63(form) and (not id_literal63(form) and (char(form, 0) == "." and (not( clip(form, 0, 2) == "..") and _35(form) > 1))))
end
function _G.eval_self_form(form)
  if form == "." then
    return "%self"
  else
    if accessor_literal63(form) then
      return {"%self", form}
    else
      if not list63(form) then
        return form
      else
        if hd63(form, "%self") and _35(form) > 1 then
          return {"%set", "%self", form[2]}
        else
          if hd63(form, "import") or hd63(form, "from") and has(form, 2) == "import" then
            return {"%do", form, {"%set", "%self", last(form)}}
          else
            if accessor_literal63(hd(form)) then
              return join({"%self"}, form)
            else
              return form
            end
          end
        end
      end
    end
  end
end
function _G.eval_print(form)
  local __form = eval_self_form(form)
  local ____id = {xpcall(function ()
    return compiler.eval(__form)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e = nil
      if string63(m) then
        __e = clip(m, search(m, ": ") + 2)
      else
        local __e1 = nil
        if nil63(m) then
          __e1 = ""
        else
          __e1 = str(m)
        end
        __e = __e1
      end
      return {
        stack = debug.traceback(),
        message = __e
      }
    end
  end)}
  local __ok = has(____id, 1)
  local __v2 = has(____id, 2)
  local __ex = has(____id, 3)
  if not __ok then
    return print_exception(__v2, __ex)
  else
    if is63(__v2) then
      return toplevel_print(__v2)
    end
  end
end
function _G.read_toplevel(str, more)
  local __s = reader.stream(str, more)
  local ____id1 = {xpcall(function ()
    return reader.read_all(__s)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e2 = nil
      if string63(m) then
        __e2 = clip(m, search(m, ": ") + 2)
      else
        local __e3 = nil
        if nil63(m) then
          __e3 = ""
        else
          __e3 = str(m)
        end
        __e2 = __e3
      end
      return {
        stack = debug.traceback(),
        message = __e2
      }
    end
  end)}
  local ____ok1 = has(____id1, 1)
  local ____v3 = has(____id1, 2)
  local __e4 = nil
  if ____ok1 then
    __e4 = ____v3
  else
    __e4 = nil
  end
  local __x9 = __e4
  if __x9 == more then
    return more
  else
    if nil63(__x9) then
      return __x9
    else
      if one63(__x9) then
        return hd(__x9)
      else
        return __x9
      end
    end
  end
end
local function rep(str)
  local __v4 = eval(read_toplevel(str))
  if is63(__v4) then
    return toplevel_print(__v4)
  end
end
local function repl()
  local o = {buf = ""}
  local function reset()
    o.buf = ""
    return disp("> ")
  end
  local function ctrl_c()
    print("")
    reset()
    return ctrl_c
  end
  local function rep1(s)
    o.buf = o.buf .. s
    local __more = {}
    local __form1 = read_toplevel(o.buf, __more)
    if not( __form1 == __more) then
      eval_print(__form1)
      return reset()
    end
  end
  reset()
  while true do
    local __s1 = system.read_line(ctrl_c)
    if not( __s1 == ctrl_c) then
      if is63(__s1) then
        rep1(__s1 .. "\n")
      else
        break
      end
    end
  end
end
local function __with_file_directory__macro(file, name, ...)
  local ____r20 = unstash({...})
  local __file1 = destash33(file, ____r20)
  local __name1 = destash33(name, ____r20)
  local ____id3 = ____r20
  local __body1 = cut(____id3, 0)
  local __cwd1 = unique("cwd")
  return {"let", {__cwd1, {"system", {".cwd"}}, __name1, __file1, __name1, {"system", {".basename", __file1}}}, {"system", {".chdir", {"system", {".dirname", __file1}}}}, {"after", join({"do"}, __body1), {"system", {".chdir", __cwd1}}}}
end
setenv("with-file-directory", {
  _stash = true,
  macro = __with_file_directory__macro
})
function _G.read_file(path)
  local ____cwd2 = system.cwd()
  local __name2 = path
  local __name3 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id4 = {xpcall(function ()
    return system.read_file(__name3)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e5 = nil
      if string63(m) then
        __e5 = clip(m, search(m, ": ") + 2)
      else
        local __e6 = nil
        if nil63(m) then
          __e6 = ""
        else
          __e6 = str(m)
        end
        __e5 = __e6
      end
      return {
        stack = debug.traceback(),
        message = __e5
      }
    end
  end)}
  local ____ok2 = has(____id4, 1)
  local ____r22 = has(____id4, 2)
  system.chdir(____cwd2)
  if ____ok2 then
    return ____r22
  else
    error(____r22)
  end
end
function _G.read_from_file(path)
  local __data = read_file(path)
  local ____cwd3 = system.cwd()
  local __name4 = path
  local __name5 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id5 = {xpcall(function ()
    local __s2 = reader.stream(__data)
    return reader.read_all(__s2)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e7 = nil
      if string63(m) then
        __e7 = clip(m, search(m, ": ") + 2)
      else
        local __e8 = nil
        if nil63(m) then
          __e8 = ""
        else
          __e8 = str(m)
        end
        __e7 = __e8
      end
      return {
        stack = debug.traceback(),
        message = __e7
      }
    end
  end)}
  local ____ok3 = has(____id5, 1)
  local ____r24 = has(____id5, 2)
  system.chdir(____cwd3)
  if ____ok3 then
    return ____r24
  else
    error(____r24)
  end
end
function _G.expand_file(path)
  local __body2 = read_from_file(path)
  local ____cwd4 = system.cwd()
  local __name6 = path
  local __name7 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id6 = {xpcall(function ()
    return compiler.expand(join({"do"}, __body2))
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e9 = nil
      if string63(m) then
        __e9 = clip(m, search(m, ": ") + 2)
      else
        local __e10 = nil
        if nil63(m) then
          __e10 = ""
        else
          __e10 = str(m)
        end
        __e9 = __e10
      end
      return {
        stack = debug.traceback(),
        message = __e9
      }
    end
  end)}
  local ____ok4 = has(____id6, 1)
  local ____r26 = has(____id6, 2)
  system.chdir(____cwd4)
  if ____ok4 then
    return ____r26
  else
    error(____r26)
  end
end
function _G.compile_file(path)
  local __form2 = expand_file(path)
  local ____cwd5 = system.cwd()
  local __name8 = path
  local __name9 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id7 = {xpcall(function ()
    return compiler.compile(__form2, {
      _stash = true,
      stmt = true
    })
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e11 = nil
      if string63(m) then
        __e11 = clip(m, search(m, ": ") + 2)
      else
        local __e12 = nil
        if nil63(m) then
          __e12 = ""
        else
          __e12 = str(m)
        end
        __e11 = __e12
      end
      return {
        stack = debug.traceback(),
        message = __e11
      }
    end
  end)}
  local ____ok5 = has(____id7, 1)
  local ____r28 = has(____id7, 2)
  system.chdir(____cwd5)
  if ____ok5 then
    return ____r28
  else
    error(____r28)
  end
end
function _G.load(path)
  local __previous = has(setenv("target", {
    _stash = true,
    toplevel = true
  }), "value")
  local __previous_indent = has(setenv("indent-level", {
    _stash = true,
    toplevel = true
  }), "value")
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = "lua"
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = 0
  local __code = compile_file(path)
  setenv("indent-level", {
    _stash = true,
    toplevel = true
  }).value = __previous_indent
  setenv("target", {
    _stash = true,
    toplevel = true
  }).value = __previous
  local ____cwd6 = system.cwd()
  local __name10 = path
  local __name11 = system.basename(path)
  system.chdir(system.dirname(path))
  local ____id8 = {xpcall(function ()
    return compiler.run(__code)
  end, function (m)
    if obj63(m) then
      return m
    else
      local __e13 = nil
      if string63(m) then
        __e13 = clip(m, search(m, ": ") + 2)
      else
        local __e14 = nil
        if nil63(m) then
          __e14 = ""
        else
          __e14 = str(m)
        end
        __e13 = __e14
      end
      return {
        stack = debug.traceback(),
        message = __e13
      }
    end
  end)}
  local ____ok6 = has(____id8, 1)
  local ____r30 = has(____id8, 2)
  system.chdir(____cwd6)
  if ____ok6 then
    return ____r30
  else
    error(____r30)
  end
end
local function script_file63(path)
  return not( "-" == char(path, 0) or (".py" == clip(path, _35(path) - 3) or (".js" == clip(path, _35(path) - 3) or ".lua" == clip(path, _35(path) - 4))))
end
local function run_file(path)
  if script_file63(path) then
    return load(path)
  else
    return compiler.run(system.read_file(path))
  end
end
local function usage()
  print("usage: lumen [<file> <arguments> | options <object files>]")
  print(" <file>\t\tProgram read from script file")
  print(" <arguments>\tPassed to program in system.argv")
  print(" <object files>\tLoaded before compiling <input>")
  print("options:")
  print(" -c <input>\tCompile input file")
  print(" -o <output>\tOutput file")
  print(" -t <target>\tTarget language (default: lua)")
  return print(" -e <expr>\tExpression to evaluate")
end
local function main(args)
  local __arg = hd(args)
  if __arg and script_file63(__arg) then
    return load(__arg)
  else
    if __arg == "-h" or __arg == "--help" then
      return usage()
    else
      local __pre = {}
      local __input = nil
      local __output = nil
      local __target1 = nil
      local __expr = nil
      local __argv = system.argv
      local __i3 = 0
      while __i3 < _35(__argv) do
        local __a = __argv[__i3 + 1]
        if __a == "-c" or (__a == "-o" or (__a == "-t" or __a == "-e")) then
          if __i3 == edge(__argv) then
            print("missing argument for " .. __a)
          else
            __i3 = __i3 + 1
            local __val = __argv[__i3 + 1]
            if __a == "-c" then
              __input = __val
            else
              if __a == "-o" then
                __output = __val
              else
                if __a == "-t" then
                  __target1 = __val
                else
                  if __a == "-e" then
                    __expr = __val
                  end
                end
              end
            end
          end
        else
          if not( "-" == char(__a, 0)) then
            add(__pre, __a)
          end
        end
        __i3 = __i3 + 1
      end
      local ____x59 = __pre
      local ____i4 = 0
      while ____i4 < _35(____x59) do
        local __file2 = ____x59[____i4 + 1]
        run_file(__file2)
        ____i4 = ____i4 + 1
      end
      if nil63(__input) then
        if __expr then
          return rep(__expr)
        else
          return repl()
        end
      else
        if __target1 then
          setenv("target", {
            _stash = true,
            toplevel = true
          }).value = __target1
        end
        local __code1 = compile_file(__input)
        if nil63(__output) or __output == "-" then
          return print(__code1)
        else
          return system.write_file(__output, __code1)
        end
      end
    end
  end
end
local function main63()
  return true
end
if main63() then
  main(system.argv)
end
local __exports = exports or {}
__exports.main = main
__exports.reader = reader
__exports.compiler = compiler
__exports.system = system
return __exports
