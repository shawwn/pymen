#!/usr/bin/env luajit

--[[

Copyright 2014-2016 The Luvit Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS-IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

]]
local argv

-- fix luvit require
if setfenv then
  _G._require = require
  setfenv(1, setmetatable({}, {__newindex = _G, __index = _G}))
  _G.usingLuvit = require ~= _G._require
  require = _G._require
  if _G.usingLuvit then
    argv = {select(2, unpack(args))}
  end
end
if not argv then
  argv = arg or args
end

-- fix ufo table.concat
local function concat(parts, sep, i, j)
  if i == nil and j == nil then
    return table.concat(parts, sep)
  elseif j == nil then
    return table.concat(parts, sep, i)
  else
    return table.concat(parts, sep, i, j)
  end
end

local hasLuvi, luvi = pcall(require, 'luvi')
local hasUv, bundle

if hasLuvi then
  bundle = luvi.bundle
end

if uv then
  hasUv = true
else
  hasUv, uv = pcall(require, 'uv')
  if not hasUv then
    hasUv, uv = pcall(require, 'luv')
  end
end

local getenv = require('os').getenv

local isWindows
if _G.jit then
  isWindows = _G.jit.os == "Windows"
else
  isWindows = not not package.path:match("\\")
end

local function run(command)
  local __f2 = io.popen(command)
  local __x4 = __f2.read(__f2, "*all")
  __f2.close(__f2)
  return __x4:sub(1, #__x4 - 1)
end

local cwd = run(isWindows and "echo %CD%" or "pwd")
local tmpBase = isWindows and (getenv("TMP") or cwd) or
                              (getenv("TMPDIR") or '/tmp')
local binExt = isWindows and ".dll" or ".so"

local getPrefix, splitPath, joinParts
if isWindows then
  -- Windows aware path utilities
  function getPrefix(path)
    return path:match("^%a:\\") or
           path:match("^/") or
           path:match("^\\+")
  end
  function splitPath(path)
    local parts = {}
    for part in string.gmatch(path, '([^/\\]+)') do
      table.insert(parts, part)
    end
    return parts
  end
  function joinParts(prefix, parts, i, j)
    if not prefix then
      return concat(parts, '/', i, j)
    elseif prefix ~= '/' then
      return prefix .. concat(parts, '\\', i, j)
    else
      return prefix .. concat(parts, '/', i, j)
    end
  end
else
  -- Simple optimized versions for UNIX systems
  function getPrefix(path)
    return path:match("^/")
  end
  function splitPath(path)
    local parts = {}
    for part in string.gmatch(path, '([^/]+)') do
      table.insert(parts, part)
    end
    return parts
  end
  function joinParts(prefix, parts, i, j)
    if prefix then
      return prefix .. concat(parts, '/', i, j)
    end
    return concat(parts, '/', i, j)
  end
end

local function pathJoin(...)
  local inputs = {...}
  local l = #inputs

  -- Find the last segment that is an absolute path
  -- Or if all are relative, prefix will be nil
  local i = l
  local prefix
  while true do
    prefix = getPrefix(inputs[i])
    if prefix or i <= 1 then break end
    i = i - 1
  end

  -- If there was one, remove its prefix from its segment
  if prefix then
    inputs[i] = inputs[i]:sub(#prefix)
  end

  -- Split all the paths segments into one large list
  local parts = {}
  while i <= l do
    local sub = splitPath(inputs[i])
    for j = 1, #sub do
      parts[#parts + 1] = sub[j]
    end
    i = i + 1
  end

  -- Evaluate special segments in reverse order.
  local skip = 0
  local reversed = {}
  for idx = #parts, 1, -1 do
    local part = parts[idx]
    if part ~= '.' then
      if part == '..' then
        skip = skip + 1
      elseif skip > 0 then
        skip = skip - 1
      else
        reversed[#reversed + 1] = part
      end
    end
  end

  -- Reverse the list again to get the correct order
  parts = reversed
  for idx = 1, #parts / 2 do
    local j = #parts - idx + 1
    parts[idx], parts[j] = parts[j], parts[idx]
  end

  local path = joinParts(prefix, parts)
  return path
end

local function file_exists63(path)
  local __f = io.open(path)
  local __id1 = (__f)
  local __e = nil
  if __id1 then
    local __r6 = (__f.read(__f, 0)) or 0 == __f.seek(__f, "end")
    __f.close(__f)
    __e = __r6
  else
    __e = __id1
  end
  return __e
end
local function directory_exists63(path)
  local __f1 = io.open(path)
  local __id2 = (__f1)
  local __e1 = nil
  if __id2 then
    local __r8 = not __f1.read(__f1, 0) and not( 0 == __f1.seek(__f1, "end"))
    __f1.close(__f1)
    __e1 = __r8
  else
    __e1 = __id2
  end
  return __e1
end

local function file_stat(path)
  if file_exists63(path) then
    return {type = "file"}
  elseif directory_exists63(path) then
    return {type = "dir"}
  end
end

local realpath = uv.fs_realpath or function (path) return path end

local function importfile(path)
  if path:match("[.]l$") then
    source = _G.compile_file(path)
    --print(source)
    path = path:sub(1, #path - 2) .. ".lua"
    _G.lumen.system.write_file(path, source)
    print("compiling " .. path)
  end
  return loadfile(path)
end

function _G.requireResolve(path, dir)
  if not dir then
    dir = "."
  end
  local errors = {}
  local fullPath
  local useBundle = bundleOnly
  local function try(tryPath)
    local prefix = useBundle and "bundle:" or ""
    local fileStat = useBundle and bundle.stat or uv.fs_stat or file_stat

    local newPath = tryPath
    local stat = fileStat(newPath)
    if stat and stat.type == "file" then
      fullPath = newPath
      return true
    end
    errors[#errors + 1] = "\n\tno file '" .. prefix .. newPath .. "'"

    newPath = tryPath .. ".l"
    stat = fileStat(newPath)
    if stat and stat.type == "file" then
      fullPath = newPath
      return true
    end
    errors[#errors + 1] = "\n\tno file '" .. prefix .. newPath .. "'"

    newPath = tryPath .. ".lua"
    stat = fileStat(newPath)
    if stat and stat.type == "file" then
      fullPath = newPath
      return true
    end
    errors[#errors + 1] = "\n\tno file '" .. prefix .. newPath .. "'"

    newPath = pathJoin(tryPath, "init.lua")
    stat = fileStat(newPath)
    if stat and stat.type == "file" then
      fullPath = newPath
      return true
    end
    errors[#errors + 1] = "\n\tno file '" .. prefix .. newPath .. "'"

  end
  if string.sub(path, 1, 1) == "." then
    -- Relative require
    if not try(pathJoin(dir, path)) then
      return concat(errors)
    end
  else
    while true do
      if try(pathJoin(dir, "deps", path)) or
         try(pathJoin(dir, "node_modules", path)) or
         try(pathJoin(dir, "libs", path)) then
        break
      end
      if dir == pathJoin(dir, "..") then
        return error(concat(errors))
      end
      dir = pathJoin(dir, "..")
    end
    -- Module require
  end
  return fullPath
end

local function loader(dir, path, bundleOnly)
  print("init loader dir=" .. dir .. " path=" .. path .. " bundleOnly=" .. (bundleOnly and "yes" or "no"))

  local errors = {}
  local fullPath
  local useBundle = bundleOnly
  local function try(tryPath)
    local prefix = useBundle and "bundle:" or ""
    local fileStat = useBundle and bundle.stat or uv.fs_stat or file_stat

    local newPath = tryPath
    local stat = fileStat(newPath)
    if stat and stat.type == "file" then
      fullPath = newPath
      return true
    end
    errors[#errors + 1] = "\n\tno file '" .. prefix .. newPath .. "'"

    newPath = tryPath .. ".l"
    stat = fileStat(newPath)
    if stat and stat.type == "file" then
      fullPath = newPath
      return true
    end
    errors[#errors + 1] = "\n\tno file '" .. prefix .. newPath .. "'"

    newPath = tryPath .. ".lua"
    stat = fileStat(newPath)
    if stat and stat.type == "file" then
      fullPath = newPath
      return true
    end
    errors[#errors + 1] = "\n\tno file '" .. prefix .. newPath .. "'"

    newPath = pathJoin(tryPath, "init.lua")
    stat = fileStat(newPath)
    if stat and stat.type == "file" then
      fullPath = newPath
      return true
    end
    errors[#errors + 1] = "\n\tno file '" .. prefix .. newPath .. "'"

  end
  if string.sub(path, 1, 1) == "." then
    -- Relative require
    if not try(pathJoin(dir, path)) then
      return concat(errors)
    end
  else
    while true do
      if try(pathJoin(dir, "deps", path)) or
         try(pathJoin(dir, "node_modules", path)) or
         try(pathJoin(dir, "libs", path)) then
        break
      end
      if dir == pathJoin(dir, "..") then
        return concat(errors)
      end
      dir = pathJoin(dir, "..")
    end
    -- Module require
  end
  if useBundle then
    local key = "bundle:" .. fullPath
    return function ()
      if package.loaded[key] then
        return package.loaded[key]
      end
      local code = bundle.readfile(fullPath)
      local module = loadstring(code, key)(key)
      package.loaded[key] = module
      return module
    end, key
  end
  fullPath = realpath(fullPath)
  return function ()
    if package.loaded[fullPath] then
      return package.loaded[fullPath]
    end
    local module = assert(importfile(fullPath))(fullPath)
    package.loaded[fullPath] = module
    return module
  end
end

-- Register as a normal lua package loader.
local lumen, json, ustring, bitops
if package.loaders then
  table.insert(package.loaders, 1, function (path)
    print("loader " .. path)

    -- Ignore built-in libraries with this loader.
    if path:match("^[a-z]+$") and package.preload[path] then
      return
    end

    local level, caller = 3
    -- Loop past any C functions to get to the real caller
    -- This avoids pcall(require, "path") getting "=C" as the source
    repeat
      caller = debug.getinfo(level, "S").source
      level = level + 1
    until caller ~= "=[C]"
    local module
    if string.sub(caller, 1, 1) == "@" then
      module = loader(pathJoin(cwd, caller:sub(2), ".."), path)
    elseif string.sub(caller, 1, 7) == "bundle:" then
      module = loader(pathJoin(caller:sub(8), ".."), path, true)
    end
    if module and type(module) ~= "string" then
      return module
    end
    return loader(cwd, path)
  end)
  _G.bit = (bit or bit32 or require("./deps/bindechex.lua"))
  _G.JSON = JSON or require("./deps/json.lua")
  _G.ustring = ustring or require("./deps/ustring.lua")
  _G.lumen = require("./main.lua")
else
  local fullPath = pathJoin(realpath(cwd), "bin", "?.lua")
  local depsPath = pathJoin(realpath(cwd), "deps", "?.lua")
  package.path = package.path .. ";;" .. fullPath .. ";;" .. depsPath
  _G.bit = (bit or bit32 or require("bindechex"))
  _G.JSON = JSON or require("json")
  _G.ustring = ustring or require("ustring")
  _G.lumen = require("lumen")
end
package.loaded.json = JSON
package.loaded.ustring = ustring
package.loaded.bindechex = bit
package.loaded.reader = _G.lumen.reader
package.loaded.compiler = _G.lumen.compiler
package.loaded.system = _G.lumen.system
package.loaded.lumen = _G.lumen
--return _G.lumen.main(_G.lumen.system.get_argv())
return _G.lumen.main(_G.lumen.system.argv)
