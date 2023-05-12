cmake_policy(VERSION "3.25.0")
set(reserved 
  ALL 
    "=" ON
    "==" ON
    "+" ON
    "_" ON
    "%" ON
    "*" ON
    "/" ON
    "<" ON
    ">" ON
    "<=" ON
    ">=" ON
  
  JS 
    BREAK ON
    CASE ON
    CATCH ON
    CLASS ON
    CONST ON
    CONTINUE ON
    DEBUGGER ON
    DEFAULT ON
    DELETE ON
    DO ON
    ELSE ON
    EVAL ON
    FINALLY ON
    FOR ON
    FUNCTION ON
    IF ON
    IMPORT ON
    IN ON
    INSTANCEOF ON
    LET ON
    RETURN ON
    SWITCH ON
    THROW ON
    TRY ON
    TYPEOF ON
    VAR ON
    VOID ON
    WITH ON
  
  LUA 
    AND ON
    END ON
    IN ON
    LOAD ON
    REPEAT ON
    WHILE ON
    BREAK ON
    FALSE ON
    LOCAL ON
    RETURN ON
    DO ON
    FOR ON
    NIL ON
    THEN ON
    ELSE ON
    FUNCTION ON
    NOT ON
    TRUE ON
    ELSEIF ON
    IF ON
    OR ON
    UNTIL ON
  
  PY 
    AND ON
    EXCEPT ON
    LAMBDA ON
    WITH ON
    AS ON
    FINALLY ON
    NONLOCAL ON
    WHILE ON
    ASSERT ON
    FALSE ON
    NONE ON
    YIELD ON
    BREAK ON
    FOR ON
    NOT ON
    CLASS ON
    FROM ON
    OR ON
    CONTINUE ON
    GLOBAL ON
    PASS ON
    DEF ON
    IF ON
    RAISE ON
    DEL ON
    IMPORT ON
    RETURN ON
    ELIF ON
    IN ON
    TRUE ON
    ELSE ON
    IS ON
    TRY ON
    STR ON
    PRINT ON
  
  CMAKE 
    SET ON
    FOREACH ON
    ENDFOREACH ON
    WHILE ON
    ENDWHILE ON
    IF ON
    ELSEIF ON
    ELSE ON
    BLOCK ON
    ENDBLOCK ON
    MACRO ON
    ENDMACRO ON
    FUNCTION ON
    ENDFUNCTION ON
    BREAK ON
    RETURN ON
    CONTINUE ON
    "AND" ON
    "OR" ON
    "TRUE" ON
    "FALSE" ON
    "ON" ON
    "OFF" ON
    "Y" ON
    "N" ON
  
)
message("hi")
message("${reserved}")
message("${reserved}")
if(4 GREATER 3)
  message("yes")
else()
  message("no")
endif()
string(LENGTH "foo" _N)
message("${_N}")
function(foo VAR)
  set("${VAR}" 42)
  return(PROPAGATE "${VAR}")
endfunction()
foo(X)
message("${X}")
function(strlen x VAR)
  string(LENGTH "${x}" "${VAR}")
  return(PROPAGATE "${VAR}")
endfunction()
strlen("foobar" _N)
message("$N: " "${_N}")
unset(_N)
function(count x VAR)
  list(LENGTH x "${VAR}")
  return(PROPAGATE "${VAR}")
endfunction()
function(err)
  message(FATAL_ERROR ${ARGN})
  return()
endfunction()
set(l "a" "b" "c" "d" "e" "f" "g")
count("${l}" _N)
message("count: " "${_N}")
unset(_N)
set(__e2 "")
if(4 GREATER 3 AND 2)
  set(__e2 "yes")
else()
  set(__e2 "no")
endif()
message("${__e2}")
set(RGBA_LIST0 0 0 0 255 0 0 255 0 255 0 255 0 0 255 255 0)
message("${RGBA_LIST0}")
message("${RGBA_LIST0}")
set(RGBA_LIST0 0 0 0 255 0 0 255 0 255 0 255 0 0 255 255 0)
while(RGBA_LIST0)
  list(POP_FRONT RGBA_LIST0 R G B A)
  message(STATUS "R=${R}, G=${G}, B=${B}, A=${A}")
endwhile()
set(__step_v2 0 0 0 255 0 0 255 0 255 0 255 0 0 255 255 0)
while(__step_v2)
  list(POP_FRONT __step_v2 R G B A)
  message(STATUS "R=${R}, G=${G}, B=${B}, A=${A}")
endwhile()
set(__step_v3 "a" "b" "c" "d")
while(__step_v3)
  list(POP_FRONT __step_v3 x)
  message("${x}")
endwhile()
message("$ENV{PATH}")
function(replace input pattern replacement VAR)
  string(REPLACE "${pattern}" "${replacement}" "${VAR}" "${input}")
  return(PROPAGATE "${VAR}")
endfunction()
replace("$ENV{PATH}" ":" ";" PATH)
message("$PATH: " "${PATH}")
set(__step_v4 "${PATH}")
while(__step_v4)
  list(POP_FRONT __step_v4 x)
  message("PATH:" "${x}")
endwhile()
function(blank63 x VAR)
  if("${x}" STREQUAL "")
    set("${VAR}" ON)
  else()
    set("${VAR}" OFF)
  endif()
  return(PROPAGATE "${VAR}")
endfunction()
function(is63 x VAR)
  strlen("${x}" n)
  set(__e3 "")
  if("${n}" GREATER 0)
    set(__e3 ON)
  else()
    set(__e3 OFF)
  endif()
  set("${VAR}" "${__e3}")
  return(PROPAGATE "${VAR}")
endfunction()
set(SPEEDTREE_SOURCE_DIR "/Users/shawn/ml/noh4/lib/SpeedTree/source/SourceCode")
file(GLOB_RECURSE SpeedTree___cpp "${SPEEDTREE_SOURCE_DIR}/*.cpp")
set(__step_v5 "${SpeedTree___cpp}")
while(__step_v5)
  list(POP_FRONT __step_v5 x)
  message("${x}")
endwhile()
function(match63 input pattern VAR)
  string(REGEX MATCH "${pattern}" x "${input}")
  is63("${x}" "${VAR}")
  return(PROPAGATE "${VAR}")
endfunction()
file(GLOB_RECURSE files "*")
set(__step_v6 "${files}")
while(__step_v6)
  list(POP_FRONT __step_v6 x)
  match63("${x}" "[.]l$" ok)
  if("${ok}")
    message("${x}")
  endif()
endwhile()
blank63("foo" _)
message(STATUS "(blank? \"foo\"): " "${_}")
blank63("" _)
message(STATUS "(blank? \"\"): " "${_}")
function(call f)
  cmake_language(CALL "${f}" ${ARGN})
  return()
endfunction()
call(message "hi")
function(eval x)
  cmake_language(EVAL CODE "${x}")
  return()
endfunction()
eval("message(\"hi\")")
eval("message(\"hi\")")
