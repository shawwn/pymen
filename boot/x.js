macros={};current_target="js";function length(x){return(x.length);}function sub(x,from,upto){if(is_string(x)){return(x.substring(from,upto));}else{return(x.slice(from,upto));}}function push(arr,x){arr[length(arr)]=x;}function join(a1,a2){return(a1.concat(a2));}function char(str,n){return(str.charAt(n));}function find(str,pattern,start){var i=str.indexOf(pattern,start);return(((i>0)&&i));}fs=require("fs");function read_file(path){return(fs.readFileSync(path,"utf8"));}function write_file(path,data){return(fs.writeFileSync(path,data,"utf8"));}function print(x){return(console.log(x));}function write(x){return(process.stdout.write(x));}function exit(code){return(process.exit(code));}function is_string(x){return((type(x)=="string"));}function is_string_literal(x){return((is_string(x)&&(char(x,0)=="\"")));}function is_number(x){return((type(x)=="number"));}function is_boolean(x){return((type(x)=="boolean"));}function is_composite(x){return((type(x)=="object"));}function is_atom(x){return(!(is_composite(x)));}function is_table(x){return((is_composite(x)&&(x[0]==undefined)));}function is_list(x){return((is_composite(x)&&!((x[0]==undefined))));}function parse_number(str){var n=parseFloat(str);if(!(isNaN(n))){return(n);}}function to_string(x){if((x==undefined)){return("nil");}else if(is_boolean(x)){if(x){return("true");}else{return("false");}}else if(is_atom(x)){return((x+""));}else if(is_table(x)){return("#<table>");}else{var str="(";var i=0;var _5=x;while((i<length(_5))){var y=_5[i];str=(str+to_string(y));if((i<(length(x)-1))){str=(str+" ");}i=(i+1);}return((str+")"));}}function error(msg){throw(msg);return(undefined);}function type(x){return(typeof(x));}function apply(f,args){return(f.apply(f,args));}unique_counter=0;function make_unique(prefix){unique_counter=(unique_counter+1);return(("_"+(prefix||"")+unique_counter));}eval_result=undefined;delimiters={"(":true,")":true,";":true,"\n":true};eof={};delimiters[eof]=true;whitespace={" ":true,"\t":true,"\n":true};function make_stream(str){return({pos:0,string:str,len:length(str)});}function peek_char(s){if((s.pos<s.len)){return(char(s.string,s.pos));}else{return(eof);}}function read_char(s){var c=peek_char(s);if(c){s.pos=(s.pos+1);return(c);}}function skip_non_code(s){while(true){var c=peek_char(s);if(!(c)){break;}else if(whitespace[c]){read_char(s);}else if((c==";")){while((c&&!((c=="\n")))){c=read_char(s);}skip_non_code(s);}else{break;}}}function read_symbol(s){var str="";while(true){var c=peek_char(s);if((c&&(!(whitespace[c])&&!(delimiters[c])))){str=(str+c);read_char(s);}else{break;}}return(str);}function read_atom(s){var str=read_symbol(s);var n=parse_number(str);if((n==undefined)){return(str);}else{return(n);}}function read_list(s){read_char(s);var l=[];while(true){skip_non_code(s);var c=peek_char(s);if((c&&!((c==")")))){push(l,read(s));}else if(c){read_char(s);break;}else{error(("Expected ) at "+s.pos));}}return(l);}function read_string(s){read_char(s);var str="\"";while(true){var c=peek_char(s);if((c&&!((c=="\"")))){if((c=="\\")){str=(str+read_char(s));}str=(str+read_char(s));}else if(c){read_char(s);break;}else{error(("Expected \" at "+s.pos));}}return((str+"\""));}function read_quote(s){read_char(s);return(["quote",read(s)]);}function read_quasiquote(s){read_char(s);return(["quasiquote",read(s)]);}function read_unquote(s){read_char(s);if((peek_char(s)=="@")){read_char(s);return(["unquote-splicing",read(s)]);}else{return(["unquote",read(s)]);}}function read_eof(s){return(read_char(s));}function read_close_paren_error(s){return(error(("Unexpected ) at "+s.pos)));}read_table={"(":read_list,")":read_close_paren_error,"\"":read_string,"'":read_quote,"`":read_quasiquote,",":read_unquote,"":read_atom};read_table[eof]=read_eof;function read(s){skip_non_code(s);var c=peek_char(s);var f=(read_table[c]||read_table[""]);return(f(s));}function read_from_string(str){return(read(make_stream(str)));}operators={"common":{"+":"+","-":"-","*":"*","/":"/","<":"<",">":">","=":"==","<=":"<=",">=":">="},"js":{"and":"&&","or":"||","cat":"+"},"lua":{"and":" and ","or":" or ","cat":".."}};function get_op(op){return((operators["common"][op]||operators[current_target][op]));}function is_call(type,form){if(!(is_list(form))){return(false);}else if((type=="operator")){return(!((get_op(form[0])==undefined)));}else if((type=="special")){return(!((special[form[0]]==undefined)));}else if((type=="macro")){return(!((macros[form[0]]==undefined)));}else{return(false);}}function compile_args(forms,is_compile){var str="(";var i=0;var _6=forms;while((i<length(_6))){var x=_6[i];var x1=(function (){if(is_compile){return(compile(x));}else{return(normalize(x));}})();str=(str+x1);if((i<(length(forms)-1))){str=(str+",");}i=(i+1);}return((str+")"));}function compile_body(forms,is_tail){var str="";var i=0;var _7=forms;while((i<length(_7))){var x=_7[i];var is_t=(is_tail&&(i==(length(forms)-1)));str=(str+compile(x,true,is_t));i=(i+1);}return(str);}function normalize(id){var id2="";var i=0;while((i<length(id))){var c=char(id,i);if((c=="-")){c="_";}id2=(id2+c);i=(i+1);}var last=(length(id)-1);if((char(id,last)=="?")){var name=sub(id2,0,last);id2=("is_"+name);}return(id2);}function compile_atom(form){if((form=="nil")){if((current_target=="js")){return("undefined");}else{return("nil");}}else if((is_string(form)&&!(is_string_literal(form)))){return(normalize(form));}else{return(to_string(form));}}function compile_call(form){var fn=form[0];var fn1=compile(fn);var args=compile_args(sub(form,1),true);if(is_list(fn)){return(("("+fn1+")"+args));}else if(is_string(fn)){return((fn1+args));}else{return(error("Invalid function call"));}}function compile_operator(form){var str="(";var op=get_op(form[0]);var i=1;var _8=form;while((i<length(_8))){var arg=_8[i];str=(str+compile(arg));if((i<(length(form)-1))){str=(str+op);}i=(i+1);}return((str+")"));}function compile_do(forms,is_tail){return(compile_body(forms,is_tail));}function compile_set(form){if((length(form)<2)){error("Missing right-hand side in assignment");}var lh=compile(form[0]);var rh=compile(form[1]);return((lh+"="+rh));}function compile_branch(condition,body,is_first,is_last,is_tail){var cond1=compile(condition);var body1=compile(body,true,is_tail);var tr=(function (){if((is_last&&(current_target=="lua"))){return(" end ");}else{return("");}})();if((is_first&&(current_target=="js"))){return(("if("+cond1+"){"+body1+"}"));}else if(is_first){return(("if "+cond1+" then "+body1+tr));}else if(((condition==undefined)&&(current_target=="js"))){return(("else{"+body1+"}"));}else if((condition==undefined)){return((" else "+body1+" end "));}else if((current_target=="js")){return(("else if("+cond1+"){"+body1+"}"));}else{return((" elseif "+cond1+" then "+body1+tr));}}function compile_if(form,is_tail){var str="";var i=0;var _9=form;while((i<length(_9))){var condition=_9[i];var is_last=(i>=(length(form)-2));var is_else=(i==(length(form)-1));var is_first=(i==0);var body=form[(i+1)];if(is_else){body=condition;condition=undefined;}i=(i+1);str=(str+compile_branch(condition,body,is_first,is_last,is_tail));i=(i+1);}return(str);}function is_vararg(name){return((sub(name,(length(name)-3),length(name))=="..."));}function bind_arguments(args,body){var args1=[];var _10=0;var _11=args;while((_10<length(_11))){var arg=_11[_10];if(is_vararg(arg)){var name=sub(arg,0,(length(arg)-3));var expr=(function (){if((current_target=="js")){return(["Array.prototype.slice.call","arguments",length(args1)]);}else{push(args1,"...");return(["list","..."]);}})();body=join([["local",name,expr],],join(body,[]));break;}else{push(args1,arg);}_10=(_10+1);}return([args1,body]);}function compile_defun(form){var name=normalize(form[0]);var args=form[1];var body=sub(form,2);return(compile_function(args,body,name));}function compile_lambda(form){var args=form[0];var body=sub(form,1);return(compile_function(args,body));}function compile_function(args,body,name){name=(name||"");var expanded=bind_arguments(args,body);var args1=compile_args(expanded[0]);var body1=compile_body(expanded[1],true);if((current_target=="js")){return(("function "+name+args1+"{"+body1+"}"));}else{return(("function "+name+args1+body1+" end "));}}function compile_get(form){var object=compile(form[0]);var key=compile(form[1]);if(((current_target=="lua")&&(char(object,0)=="{"))){object=("("+object+")");}return((object+"["+key+"]"));}function compile_dot(form){var object=compile(form[0]);var key=normalize(form[1]);return((object+"."+key));}function compile_not(form){var expr=compile(form[0]);var open=(function (){if((current_target=="js")){return("!(");}else{return("(not ");}})();return((open+expr+")"));}function compile_local(form){var lh=compile(form[0]);var keyword=(function (){if((current_target=="js")){return("var ");}else{return("local ");}})();if((form[1]==undefined)){return((keyword+lh));}else{var rh=compile(form[1]);return((keyword+lh+"="+rh));}}function compile_while(form){var condition=compile(form[0]);var body=compile_body(sub(form,1));if((current_target=="js")){return(("while("+condition+"){"+body+"}"));}else{return(("while "+condition+" do "+body+" end "));}}function compile_list(forms,is_quoted,is_quasi){var open=(function (){if((current_target=="lua")){return("{");}else{return("[");}})();var close=(function (){if((current_target=="lua")){return("}");}else{return("]");}})();var str="";var i=0;var _12=forms;while((i<length(_12))){var x=_12[i];if((is_quasi&&is_list(x)&&(x[0]=="unquote-splicing"))){var x1=compile(x[1]);var x2=compile_list(sub(forms,(i+1)),true,is_quasi);open=("join("+open);close=(close+",join("+x1+","+x2+"))");break;}else{var x1=(function (){if(is_quoted){return(quote_form(x,is_quasi));}else{return(compile(x));}})();str=(str+x1);if((i<(length(forms)-1))){str=(str+",");}}i=(i+1);}return((open+str+close));}function compile_table(forms){var sep=(function (){if((current_target=="lua")){return("=");}else{return(":");}})();var str="{";var i=0;while((i<(length(forms)-1))){var k=compile(forms[i]);var v=compile(forms[(i+1)]);if(((current_target=="lua")&&is_string_literal(k))){k=("["+k+"]");}str=(str+k+sep+v);if((i<(length(forms)-2))){str=(str+",");}i=(i+2);}return((str+"}"));}function compile_each(forms){var args=forms[0];var t=args[0];var k=args[1];var v=args[2];var body=sub(forms,1);if((current_target=="lua")){var body1=compile_body(body);var t1=compile(t);return(("for "+k+","+v+" in pairs("+t1+") do "+body1+" end"));}else{var body1=compile_body(join([["set",v,["get",t,k]],],join(body,[])));return(("for("+k+" in "+t+"){"+body1+"}"));}}function quote_form(form,is_quasi){if(is_atom(form)){if(is_string_literal(form)){var str=sub(form,1,(length(form)-1));return(("\"\\\""+str+"\\\"\""));}else if(is_string(form)){return(("\""+form+"\""));}else{return(to_string(form));}}else if((is_quasi&&(form[0]=="unquote"))){return(compile(form[1]));}else{return(compile_list(form,true,is_quasi));}}function compile_quote(forms){return(quote_form(forms[0]));}function compile_quasiquote(forms){return(quote_form(forms[0],true));}function compile_defmacro(form){var name=form[0];var lambda=join(["lambda",],join(sub(form,1),[]));var register=["set",["get","macros",["quote",name]],lambda];eval(compile_for_target("js",register,true));return("");}function compile_special(form,is_stmt,is_tail){var name=form[0];var sp=special[name];if((!(is_stmt)&&sp["stmt?"])){return(compile([["lambda",[],form]],false,is_tail));}else{var is_tr=(is_stmt&&!(sp["self-tr"]));var tr=(function (){if(is_tr){return(";");}else{return("");}})();var fn=sp["compiler"];return((fn(sub(form,1),is_tail)+tr));}}special={"do":{"compiler":compile_do,"self-tr":true,"stmt?":true},"if":{"compiler":compile_if,"self-tr":true,"stmt?":true},"while":{"compiler":compile_while,"self-tr":true,"stmt?":true},"defun":{"compiler":compile_defun,"self-tr":true,"stmt?":true},"defmacro":{"compiler":compile_defmacro,"self-tr":true,"stmt?":true},"local":{"compiler":compile_local,"stmt?":true},"set":{"compiler":compile_set,"stmt?":true},"each":{"compiler":compile_each,"stmt?":true},"get":{"compiler":compile_get},"dot":{"compiler":compile_dot},"not":{"compiler":compile_not},"list":{"compiler":compile_list},"table":{"compiler":compile_table},"quote":{"compiler":compile_quote},"quasiquote":{"compiler":compile_quasiquote},"lambda":{"compiler":compile_lambda}};function is_can_return(form){if(is_call("macro",form)){return(false);}else if(is_call("special",form)){return(!(special[form[0]]["stmt?"]));}else{return(true);}}function compile(form,is_stmt,is_tail){var tr=(function (){if(is_stmt){return(";");}else{return("");}})();if((is_tail&&is_can_return(form))){form=["return",form];}if((form==undefined)){return("");}else if(is_atom(form)){return((compile_atom(form)+tr));}else if(is_call("operator",form)){return((compile_operator(form)+tr));}else if(is_call("special",form)){return(compile_special(form,is_stmt,is_tail));}else if(is_call("macro",form)){var fn=macros[form[0]];var form=apply(fn,sub(form,1));return(compile(form,is_stmt,is_tail));}else{return((compile_call(form)+tr));}}function compile_file(file){var form;var output="";var s=make_stream(read_file(file));while(true){form=read(s);if((form==eof)){break;}output=(output+compile(form,true));}return(output);}function compile_files(files){var output="";var _13=0;var _14=files;while((_13<length(_14))){var file=_14[_13];output=(output+compile_file(file));_13=(_13+1);}return(output);}function compile_for_target(target){var args=Array.prototype.slice.call(arguments,1);var previous_target=current_target;current_target=target;var result=apply(compile,args);current_target=previous_target;return(result);}function rep(str){return(print(to_string(eval(compile(read_from_string(str))))));}function repl(){var execute=function (str){rep(str);return(write("> "));};write("> ");process.stdin.resume();process.stdin.setEncoding("utf8");return(process.stdin.on("data",execute));}args=sub(process.argv,2);standard=["boot.x","lib.x","reader.x","compiler.x"];function usage(){print("usage: x [<inputs>] [-o <output>] [-t <target>] [-e <expr>]");return(exit());}dir=args[0];if(((args[1]=="-h")||(args[1]=="--help"))){usage();}var inputs=[];var output=undefined;var target=undefined;var expr=undefined;var i=1;var _15=args;while((i<length(_15))){var arg=_15[i];if(((arg=="-o")||(arg=="-t")||(arg=="-e"))){if((i==(length(args)-1))){print("missing argument for",arg);}else{i=(i+1);var arg2=args[i];if((arg=="-o")){output=arg2;}else if((arg=="-t")){target=arg2;}else if((arg=="-e")){expr=arg2;}}}else if(("-"==sub(arg,0,1))){print("unrecognized option:",arg);usage();}else{push(inputs,arg);}i=(i+1);}if(output){if(target){current_target=target;}write_file(output,compile_files(inputs));}else{var _16=0;var _17=standard;while((_16<length(_17))){var file=_17[_16];eval(compile_file((dir+"/"+file)));_16=(_16+1);}var _18=0;var _19=inputs;while((_18<length(_19))){var file=_19[_18];eval(compile_file(file));_18=(_18+1);}if(expr){rep(expr);}else{repl();}}