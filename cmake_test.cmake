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
function(len x VAR)
  return(PROPAGATE string(LENGTH x VAR))
endfunction()
len("foo" _N)
message("${_N}")
set(__e "")
if(4 GREATER 3 AND 2)
  set(__e "yes")
else()
  set(__e "no")
endif()
message("${__e}")
