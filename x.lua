macros={};macros["at"]=function (arr,i)if ((current_target=="lua") and is_number(i)) then i=(i+1); elseif (current_target=="lua") then i={"+",i,1}; end return({"get",arr,i}); end ;macros["across"]=function (args,...)local body={...};local l=args[1];local v=args[2];local i=(args[3] or make_unique());local o=(args[4] or 0);local l1=make_unique();return({"do",{"local",i,o},{"local",l1,l},join({"while",{"<",i,{"length",l1}},{"local",v,{"at",l1,i}},},join(body,{{"set",i,{"+",i,1}}}))}); end ;macros["make-set"]=function (...)local elements={...};local form={"table"};local _1=0;local _2=elements;while (_1<length(_2)) do local x=_2[(_1+1)];push(form,x);push(form,true);_1=(_1+1); end return(form); end ;current_target="js";macros["target"]=function (...)local clauses={...};local _3=0;local _4=clauses;while (_3<length(_4)) do local clause=_4[(_3+1)];if (clause[1]==current_target) then return(clause[2]); end _3=(_3+1); end  end ;current_language="lua";function length(x)return(#x); end function sub(x,from,upto)if is_string(x) then return(string.sub(x,(from+1),upto)); else upto=(upto or length(x));local i=from;local j=0;local x2={};while (i<upto) do x2[(j+1)]=x[(i+1)];i=(i+1);j=(j+1); end return(x2); end  end function push(arr,x)arr[(length(arr)+1)]=x; end function join(a1,a2)local a3={};local i=0;local len=length(a1);while (i<len) do a3[(i+1)]=a1[(i+1)];i=(i+1); end while (i<(len+length(a2))) do a3[(i+1)]=a2[((i-len)+1)];i=(i+1); end return(a3); end function char(str,n)return(sub(str,n,(n+1))); end function find(str,pattern,start)if start then start=(start+1); end local i=string.find(str,pattern,start,true);return((i and (i-1))); end function read_file(path)local f=io.open(path);return(f:read("*a")); end function write_file(path,data)local f=io.open(path,"w");return(f:write(data)); end function write(x)return(io.write(x)); end function exit(code)return(os.exit(code)); end function is_string(x)return((type(x)=="string")); end function is_string_literal(x)return((is_string(x) and (char(x,0)=="\""))); end function is_number(x)return((type(x)=="number")); end function is_boolean(x)return((type(x)=="boolean")); end function is_composite(x)return((type(x)=="table")); end function is_atom(x)return((not is_composite(x))); end function is_table(x)return((is_composite(x) and (x[1]==nil))); end function is_list(x)return((is_composite(x) and (not (x[1]==nil)))); end function parse_number(str)return(tonumber(str)); end function to_string(x)if (x==nil) then return("nil"); elseif is_boolean(x) then if x then return("true"); else return("false"); end  elseif is_atom(x) then return((x.."")); else local str="(";local i=0;local _5=x;while (i<length(_5)) do local y=_5[(i+1)];str=(str..to_string(y));if (i<(length(x)-1)) then str=(str.." "); end i=(i+1); end return((str..")")); end  end function apply(f,args)return(f(unpack(args))); end unique_counter=0;function make_unique(prefix)unique_counter=(unique_counter+1);return(("_"..(prefix or "")..unique_counter)); end eval_result=nil;function eval(x)local y=("eval_result="..x);local f=load(y);if f then f();return(eval_result); else local f=load(x);return((f and f())); end  end delimiters={["("]=true,[")"]=true,[";"]=true,["\n"]=true};eof={};delimiters[eof]=true;whitespace={[" "]=true,["\t"]=true,["\n"]=true};function make_stream(str)return({pos=0,string=str,len=length(str)}); end function peek_char(s)if (s.pos<s.len) then return(char(s.string,s.pos)); else return(eof); end  end function read_char(s)local c=peek_char(s);if c then s.pos=(s.pos+1);return(c); end  end function skip_non_code(s)while true do local c=peek_char(s);if (not c) then break; elseif whitespace[c] then read_char(s); elseif (c==";") then while (c and (not (c=="\n"))) do c=read_char(s); end skip_non_code(s); else break; end  end  end function read_symbol(s)local str="";while true do local c=peek_char(s);if (c and ((not whitespace[c]) and (not delimiters[c]))) then str=(str..c);read_char(s); else break; end  end return(str); end function read_atom(s)local str=read_symbol(s);local n=parse_number(str);if (n==nil) then return(str); else return(n); end  end function read_list(s)read_char(s);local l={};while true do skip_non_code(s);local c=peek_char(s);if (c and (not (c==")"))) then push(l,read(s)); elseif c then read_char(s);break; else error(("Expected ) at "..s.pos)); end  end return(l); end function read_string(s)read_char(s);local str="\"";while true do local c=peek_char(s);if (c and (not (c=="\""))) then if (c=="\\") then str=(str..read_char(s)); end str=(str..read_char(s)); elseif c then read_char(s);break; else error(("Expected \" at "..s.pos)); end  end return((str.."\"")); end function read_quote(s)read_char(s);return({"quote",read(s)}); end function read_unquote(s)read_char(s);if (peek_char(s)=="@") then read_char(s);return({"unquote-splicing",read(s)}); else return({"unquote",read(s)}); end  end function read_eof(s)return(read_char(s)); end function read_close_paren_error(s)return(error(("Unexpected ) at "..s.pos))); end read_table={["("]=read_list,[")"]=read_close_paren_error,["\""]=read_string,["'"]=read_quote,[","]=read_unquote,[""]=read_atom};read_table[eof]=read_eof;function read(s)skip_non_code(s);local c=peek_char(s);local f=(read_table[c] or read_table[""]);return(f(s)); end function read_from_string(str)return(read(make_stream(str))); end operators={["common"]={["+"]="+",["-"]="-",["*"]="*",["/"]="/",["<"]="<",[">"]=">",["="]="==",["<="]="<=",[">="]=">="},["js"]={["and"]="&&",["or"]="||",["cat"]="+"},["lua"]={["and"]=" and ",["or"]=" or ",["cat"]=".."}};is_preserve_macros=true;function get_op(op)return((operators["common"][op] or operators[current_target][op])); end function is_call(type,form)if (not is_list(form)) then return(false); elseif (type=="operator") then return((not (get_op(form[1])==nil))); elseif (type=="special") then return((not (special[form[1]]==nil))); elseif (type=="macro") then return((not (macros[form[1]]==nil))); else return(false); end  end function compile_args(forms,is_compile)local str="(";local i=0;local _6=forms;while (i<length(_6)) do local x=_6[(i+1)];local x1=(function ()if is_compile then return(compile(x)); else return(normalize(x)); end  end )();str=(str..x1);if (i<(length(forms)-1)) then str=(str..","); end i=(i+1); end return((str..")")); end function compile_body(forms,is_tail)local str="";local i=0;local _7=forms;while (i<length(_7)) do local x=_7[(i+1)];local is_t=(is_tail and (i==(length(forms)-1)));str=(str..compile(x,true,is_t));i=(i+1); end return(str); end function normalize(id)local id2="";local i=0;while (i<length(id)) do local c=char(id,i);if (c=="-") then c="_"; end id2=(id2..c);i=(i+1); end local last=(length(id)-1);if (char(id,last)=="?") then local name=sub(id2,0,last);id2=("is_"..name); end return(id2); end function compile_atom(form)if (form=="nil") then if (current_target=="js") then return("undefined"); else return("nil"); end  elseif (is_string(form) and (not is_string_literal(form))) then return(normalize(form)); else return(to_string(form)); end  end function compile_call(form)local fn=form[1];local fn1=compile(fn);local args=compile_args(sub(form,1),true);if is_list(fn) then return(("("..fn1..")"..args)); elseif is_string(fn) then return((fn1..args)); else return(error("Invalid function call")); end  end function compile_operator(form)local str="(";local op=get_op(form[1]);local i=1;local _8=form;while (i<length(_8)) do local arg=_8[(i+1)];str=(str..compile(arg));if (i<(length(form)-1)) then str=(str..op); end i=(i+1); end return((str..")")); end function compile_do(forms,is_tail)return(compile_body(forms,is_tail)); end function compile_set(form)if (length(form)<2) then error("Missing right-hand side in assignment"); end local lh=compile(form[1]);local rh=compile(form[2]);return((lh.."="..rh)); end function compile_branch(condition,body,is_first,is_last,is_tail)local cond1=compile(condition);local body1=compile(body,true,is_tail);local tr=(function ()if (is_last and (current_target=="lua")) then return(" end "); else return(""); end  end )();if (is_first and (current_target=="js")) then return(("if("..cond1.."){"..body1.."}")); elseif is_first then return(("if "..cond1.." then "..body1..tr)); elseif ((condition==nil) and (current_target=="js")) then return(("else{"..body1.."}")); elseif (condition==nil) then return((" else "..body1.." end ")); elseif (current_target=="js") then return(("else if("..cond1.."){"..body1.."}")); else return((" elseif "..cond1.." then "..body1..tr)); end  end function compile_if(form,is_tail)local str="";local i=0;local _9=form;while (i<length(_9)) do local condition=_9[(i+1)];local is_last=(i>=(length(form)-2));local is_else=(i==(length(form)-1));local is_first=(i==0);local body=form[((i+1)+1)];if is_else then body=condition;condition=nil; end i=(i+1);str=(str..compile_branch(condition,body,is_first,is_last,is_tail));i=(i+1); end return(str); end function is_vararg(name)return((sub(name,(length(name)-3),length(name))=="...")); end function bind_arguments(args,body)local args1={};local _10=0;local _11=args;while (_10<length(_11)) do local arg=_11[(_10+1)];if is_vararg(arg) then local name=sub(arg,0,(length(arg)-3));local expr=(function ()if (current_target=="js") then return({"Array.prototype.slice.call","arguments",length(args1)}); else push(args1,"...");return({"list","..."}); end  end )();body=join({{"local",name,expr},},join(body,{}));break; else push(args1,arg); end _10=(_10+1); end return({args1,body}); end function compile_defun(form)local name=normalize(form[1]);local args=form[2];local body=sub(form,2);return(compile_function(args,body,name)); end function compile_lambda(form)local args=form[1];local body=sub(form,1);return(compile_function(args,body)); end function compile_function(args,body,name)name=(name or "");local expanded=bind_arguments(args,body);local args1=compile_args(expanded[1]);local body1=compile_body(expanded[2],true);if (current_target=="js") then return(("function "..name..args1.."{"..body1.."}")); else return(("function "..name..args1..body1.." end ")); end  end function compile_get(form)local object=compile(form[1]);local key=compile(form[2]);if ((current_target=="lua") and (char(object,0)=="{")) then object=("("..object..")"); end return((object.."["..key.."]")); end function compile_dot(form)local object=compile(form[1]);local key=normalize(form[2]);return((object.."."..key)); end function compile_not(form)local expr=compile(form[1]);local open=(function ()if (current_target=="js") then return("!("); else return("(not "); end  end )();return((open..expr..")")); end function compile_local(form)local lh=compile(form[1]);local keyword=(function ()if (current_target=="js") then return("var "); else return("local "); end  end )();if (form[2]==nil) then return((keyword..lh)); else local rh=compile(form[2]);return((keyword..lh.."="..rh)); end  end function compile_while(form)local condition=compile(form[1]);local body=compile_body(sub(form,1));if (current_target=="js") then return(("while("..condition.."){"..body.."}")); else return(("while "..condition.." do "..body.." end ")); end  end function compile_list(forms,is_quoted)local open=(function ()if (current_target=="lua") then return("{"); else return("["); end  end )();local close=(function ()if (current_target=="lua") then return("}"); else return("]"); end  end )();local str="";local i=0;local _12=forms;while (i<length(_12)) do local x=_12[(i+1)];if (is_list(x) and (x[1]=="unquote-splicing")) then local x1=compile(x[2]);local x2=compile_list(sub(forms,(i+1)),true);open=("join("..open);close=(close..",join("..x1..","..x2.."))");break; else local x1=(function ()if is_quoted then return(quote_form(x)); else return(compile(x)); end  end )();str=(str..x1);if (i<(length(forms)-1)) then str=(str..","); end  end i=(i+1); end return((open..str..close)); end function compile_table(forms)local sep=(function ()if (current_target=="lua") then return("="); else return(":"); end  end )();local str="{";local i=0;while (i<(length(forms)-1)) do local k=compile(forms[(i+1)]);local v=compile(forms[((i+1)+1)]);if ((current_target=="lua") and is_string_literal(k)) then k=("["..k.."]"); end str=(str..k..sep..v);if (i<(length(forms)-2)) then str=(str..","); end i=(i+2); end return((str.."}")); end function compile_each(forms)local args=forms[1];local t=args[1];local k=args[2];local v=args[3];local body=sub(forms,1);if (current_target=="lua") then local body1=compile_body(body);local t1=compile(t);return(("for "..k..","..v.." in pairs("..t1..") do "..body1.." end")); else local body1=compile_body(join({{"set",v,{"get",t,k}},},join(body,{})));return(("for("..k.." in "..t.."){"..body1.."}")); end  end macros["unquote"]=function ()return(error("UNQUOTE not inside QUOTE")); end ;macros["unquote-splicing"]=function ()return(error("UNQUOTE-SPLICING not inside QUOTE")); end ;function compile_to_string(form)if is_string_literal(form) then local str=sub(form,1,(length(form)-1));return(("\"\\\""..str.."\\\"\"")); elseif is_string(form) then return(("\""..form.."\"")); else return(to_string(form)); end  end function quote_form(form)if is_atom(form) then return(compile_to_string(form)); elseif (form[1]=="unquote") then return(compile(form[2])); else return(compile_list(form,true)); end  end function compile_quote(forms)return(quote_form(forms[1])); end function compile_defmacro(form)local name=form[1];local lambda=join({"lambda",},join(sub(form,1),{}));local register={"set",{"get","macros",compile_to_string(name)},lambda};local compiled=compile_for_target(current_language,register,true);eval(compiled);if (not is_preserve_macros) then return(""); elseif (not (current_language==current_target)) then return(compile(register,true)); else return(compiled); end  end function compile_special(form,is_stmt,is_tail)local name=form[1];local sp=special[name];if ((not is_stmt) and sp["stmt?"]) then return(compile({{"lambda",{},form}},false,is_tail)); else local is_tr=(is_stmt and (not sp["self-tr"]));local tr=(function ()if is_tr then return(";"); else return(""); end  end )();local fn=sp["compiler"];return((fn(sub(form,1),is_tail)..tr)); end  end special={["do"]={["compiler"]=compile_do,["self-tr"]=true,["stmt?"]=true},["if"]={["compiler"]=compile_if,["self-tr"]=true,["stmt?"]=true},["while"]={["compiler"]=compile_while,["self-tr"]=true,["stmt?"]=true},["defun"]={["compiler"]=compile_defun,["self-tr"]=true,["stmt?"]=true},["defmacro"]={["compiler"]=compile_defmacro,["self-tr"]=true,["stmt?"]=true},["local"]={["compiler"]=compile_local,["stmt?"]=true},["set"]={["compiler"]=compile_set,["stmt?"]=true},["each"]={["compiler"]=compile_each,["stmt?"]=true},["get"]={["compiler"]=compile_get},["dot"]={["compiler"]=compile_dot},["not"]={["compiler"]=compile_not},["list"]={["compiler"]=compile_list},["table"]={["compiler"]=compile_table},["quote"]={["compiler"]=compile_quote},["lambda"]={["compiler"]=compile_lambda}};function is_can_return(form)if is_call("macro",form) then return(false); elseif is_call("special",form) then return((not special[form[1]]["stmt?"])); else return(true); end  end function compile(form,is_stmt,is_tail)local tr=(function ()if is_stmt then return(";"); else return(""); end  end )();if (is_tail and is_can_return(form)) then form={"return",form}; end if (form==nil) then return(""); elseif is_atom(form) then return((compile_atom(form)..tr)); elseif is_call("operator",form) then return((compile_operator(form)..tr)); elseif is_call("special",form) then return(compile_special(form,is_stmt,is_tail)); elseif is_call("macro",form) then local fn=macros[form[1]];local form=apply(fn,sub(form,1));return(compile(form,is_stmt,is_tail)); else return((compile_call(form)..tr)); end  end function compile_file(file)local form;local output="";local s=make_stream(read_file(file));while true do form=read(s);if (form==eof) then break; end output=(output..compile(form,true)); end return(output); end function compile_files(files)local output="";local _13=0;local _14=files;while (_13<length(_14)) do local file=_14[(_13+1)];output=(output..compile_file(file));_13=(_13+1); end return(output); end function compile_for_target(target,...)local args={...};local previous_target=current_target;current_target=target;local result=apply(compile,args);current_target=previous_target;return(result); end passed=0;function assert_equal(a,b)local sa=to_string(a);local sb=to_string(b);if (not (sa==sb)) then return(error((" failed: expected "..sa.." was "..sb))); else passed=(passed+1); end  end function run_tests()print(" running tests...");assert_equal(18,18);assert_equal(123,123);assert_equal(0.123,0.123);assert_equal(17,(16+1));assert_equal(4,(7-3));assert_equal(5,(10/2));assert_equal(6,(2*3));assert_equal(true,(not false));assert_equal(true,(true or false));assert_equal(false,(true and false));assert_equal(17,(function ()if true then return(17); else return(18); end  end )());assert_equal(18,(function ()if false then return(17); else return(18); end  end )());assert_equal("foo","foo");assert_equal("\"bar\"","\"bar\"");assert_equal(1,length("\""));assert_equal(2,length("a\""));assert_equal("foobar",("foo".."bar"));assert_equal(2,length(("\"".."\"")));assert_equal("a","a");assert_equal("a","a");assert_equal("a",char("bar",1));assert_equal("uu",sub("quux",1,3));assert_equal({},{});assert_equal({1},{1});assert_equal({"a"},{"a"});assert_equal({"a"},{"a"});assert_equal(false,({"a"}=={"\"a\""}));assert_equal(5,length({1,2,3,4,5}));assert_equal(3,length({1,{2,3,4},5}));assert_equal(3,length(({1,{2,3,4},5})[2]));local a="bar";assert_equal({1,2,"bar"},{1,2,a});assert_equal({{"bar"}},{{a}});assert_equal(false,("\"a\""=="a"));assert_equal(false,({"a"}=={"\"a\""}));assert_equal({"a",{2,3,7,"b"}},{"a",{2,3,7,"b"}});assert_equal({1,2,3},join({1},{2,3}));assert_equal({1,2,3,4},join({1},join({2},{3,4})));a={2,3};assert_equal({1,2,3,4},join({1,},join(a,{4})));assert_equal({1,2,3,4},join({1,},join({2,3},{4})));assert_equal({1,2,3},join({1,},join(a,{})));assert_equal({2,3},join({},join(a,{})));assert_equal(4,eval(compile({"+",2,2})));assert_equal("foo",eval(compile({"quote","foo"})));assert_equal({2,3},apply(join,{{2},{3}}));apply(assert_equal,{4,4});local f=function (x)return((x+1)); end ;assert_equal(2,f(1));assert_equal(3,apply(function (a,b)return((a+b)); end ,{1,2}));assert_equal({1,2},apply(function (...)local a={...};return(a); end ,{1,2}));assert_equal({{1,2}},apply(function (...)local a={...};return({a}); end ,{1,2}));assert_equal({1,2},apply(function (...)local a={...};return(join({},join(a,{}))); end ,{1,2}));f=function (...)local a={...};return(a); end ;assert_equal({"a","b"},f("a","b"));assert_equal(42,(function ()return(42); end )());local t={};t["foo"]=17;assert_equal({foo=17},t);t["bar"]=42;assert_equal({foo=17,["bar"]=42},t);local s={a=true,b=true,c=true};assert_equal(true,s["a"]);assert_equal(true,s["c"]);assert_equal(nil,s["x"]);local x=0;local l={1,2,3,4,5};local _15=0;local _16=l;while (_15<length(_16)) do local v=_16[(_15+1)];x=(x+v);_15=(_15+1); end assert_equal(x,15);local l2={};local i=0;local _17=l;while (i<length(_17)) do local v=_17[(i+1)];l2[(i+1)]=v;i=(i+1); end assert_equal(l,l2);x=0;t={foo=10,bar=100};for k,v in pairs(t) do if (k=="foo") then x=(x+v+1); else x=(x+v+10); end  end;assert_equal(x,121);return(print((" "..passed.." passed"))); end function eval_string(str)local form=read_from_string(str);return(eval(compile_for_target(current_language,form))); end function interactive()local execute=function (str)print(to_string(eval_string(str)));return(write("> ")); end ;write("> ");while true do local str=io.stdin:read();if str then execute(str); else break; end  end  end args=arg;function usage()print("usage: x [<inputs>] [-o <output>] [-l <language>] [-e <expr>]");return(exit()); end if ((args[1]=="-h") or (args[1]=="--help")) then usage(); end local inputs={};local output=nil;local expr=nil;local i=0;local _18=args;while (i<length(_18)) do local arg=_18[(i+1)];if ((arg=="-o") or (arg=="-l") or (arg=="-e")) then if (i==(length(args)-1)) then print("missing argument for",arg); else i=(i+1);local arg2=args[(i+1)];if (arg=="-o") then output=arg2; elseif (arg=="-l") then current_target=arg2; elseif (arg=="-e") then expr=arg2; end  end  elseif ("-"==sub(arg,0,1)) then print("unrecognized option:",arg);usage(); else push(inputs,arg); end i=(i+1); end local compiled=compile_files(inputs);if output then write_file(output,compiled); else eval(compiled);if expr then print(to_string(eval_string(expr))); else interactive(); end  end 