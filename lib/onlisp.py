def __defmacro__macro(name=None, args=None, *_args, **_keys):
  ____r1 = unstash(_args, _keys)
  __name1 = destash33(name, ____r1)
  __args1 = destash33(args, ____r1)
  ____id2 = ____r1
  __body1 = cut(____id2, 0)
  __id3 = unique(cat(__name1, "--macro"))
  ____x6 = object(["setenv", ["quote", __name1]])
  ____x6["macro"] = __id3
  __form1 = ["do", join(["define", __id3, __args1], __body1), ____x6]
  return __form1

setenv("defmacro", macro=__defmacro__macro)
def identity(*args):
  if one63(args):
    return hd(args)
  else:
    return args

L_42cont42 = identity
def __L_61lambda__macro1(parms=None, *_args, **_keys):
  ____r9 = unstash(_args, _keys)
  __parms3 = destash33(parms, ____r9)
  ____id9 = ____r9
  __body5 = cut(____id9, 0)
  return join(["fn", join(["*cont*"], __parms3)], __body5)

setenv("=lambda", macro=__L_61lambda__macro1)
def __L_61defun__macro1(name=None, parms=None, *_args, **_keys):
  ____r10 = unstash(_args, _keys)
  __name3 = destash33(name, ____r10)
  __parms4 = destash33(parms, ____r10)
  ____id10 = ____r10
  __body6 = cut(____id10, 0)
  __f1 = cat("=", __name3)
  return ["during-compilation", ["defmacro", __name3, __parms4, join(["list", ["quote", __f1], ["quote", "*cont*"]], __parms4)], join(["define-global", __f1, join(["*cont*"], __parms4)], __body6)]

setenv("=defun", macro=__L_61defun__macro1)
def __L_61bind__macro1(parms=None, expr=None, *_args, **_keys):
  ____r11 = unstash(_args, _keys)
  __parms5 = destash33(parms, ____r11)
  __expr1 = destash33(expr, ____r11)
  ____id11 = ____r11
  __body7 = cut(____id11, 0)
  return ["let", "*cont*", join(["fn", __parms5], __body7), __expr1]

setenv("=bind", macro=__L_61bind__macro1)
def __L_61values__macro1(*_args, **_keys):
  __retvals1 = unstash(_args, _keys)
  return join(["*cont*"], __retvals1)

setenv("=values", macro=__L_61values__macro1)
def __L_61funcall__macro1(fn=None, *_args, **_keys):
  ____r12 = unstash(_args, _keys)
  __fn2 = destash33(fn, ____r12)
  ____id12 = ____r12
  __args4 = cut(____id12, 0)
  return join([__fn2, "*cont*"], __args4)

setenv("=funcall", macro=__L_61funcall__macro1)
def __L_61apply__macro1(fn=None, *_args, **_keys):
  ____r13 = unstash(_args, _keys)
  __fn3 = destash33(fn, ____r13)
  ____id13 = ____r13
  __args5 = cut(____id13, 0)
  return join(["apply", __fn3, "*cont*"], __args5)

setenv("=apply", macro=__L_61apply__macro1)
def __message__macro1():
  return ["=message", "*cont*"]

setenv("message", macro=__message__macro1)
def L_61message(L_42cont42=None):
  return L_42cont42("hello", "there")

def __baz__macro1():
  return ["=baz", "*cont*"]

setenv("baz", macro=__baz__macro1)
def L_61baz(L_42cont42=None):
  def __f38(m=None, n=None):
    return L_42cont42([m, n])
  __L_42cont421 = __f38
  return L_61message(__L_42cont421)

def __add1__macro1(x=None):
  return ["=add1", "*cont*", x]

setenv("add1", macro=__add1__macro1)
def L_61add1(L_42cont42=None, x=None):
  return L_42cont42(x + 1)

def __push__macro(x=None, place=None):
  def __f39(getter=None, setter=None):
    return setter(["join", ["list", x], getter])
  return get_place(place, __f39)

setenv("push", macro=__push__macro)
def __pull__macro(x=None, place=None, test=None):
  if nil63(test):
    test = None
  def __f40(getter=None, setter=None):
    return setter(["delete", x, getter, test])
  return get_place(place, __f40)

setenv("pull", macro=__pull__macro)
def find(x=None, lst=None, test=None):
  if nil63(test):
    test = equal63
  ____o = lst
  ____i = None
  for ____i in indices(____o):
    __y = ____o[____i]
    if test(x, __y):
      return __y

def member(x=None, lst=None, test=None):
  if nil63(test):
    test = equal63
  return find(x, lst, test)

def delete(item=None, sequence=None, test=None):
  if nil63(test):
    test = equal63
  def __f41(x=None):
    return not test(x, item)
  return keep(__f41, sequence)

def eq63(a=None, b=None):
  return a == b

def equal63(a=None, b=None):
  return L_str(a) == L_str(b)

from argparse import Namespace
if not( "Proc" in globals()):
  class Proc(Namespace):
    pass
def make_proc(pri=None, state=None, wait=None):
  if nil63(pri):
    pri = 0
  __p = Proc()
  __p.pri = pri
  __p.state = state
  __p.wait = wait
  return __p

def proc_pri(p=None):
  return p.pri

def proc_state(p=None):
  return p.state

def proc_wait(p=None):
  return p.wait

def __f42(setfn=None, *_args, **_keys):
  ____r48 = unstash(_args, _keys)
  __setfn1 = destash33(setfn, ____r48)
  ____id15 = ____r48
  __args7 = cut(____id15, 0)
  def __f43(v=None, p=None):
    return ["set", ["idx", p, "pri"], v]
  return define_setter("proc-pri", __f43, __setfn1, __args7)

setenv("proc-pri", place_expander=__f42)
def __f44(setfn=None, *_args, **_keys):
  ____r52 = unstash(_args, _keys)
  __setfn3 = destash33(setfn, ____r52)
  ____id17 = ____r52
  __args9 = cut(____id17, 0)
  def __f45(v=None, p=None):
    return ["set", ["idx", p, "state"], v]
  return define_setter("proc-state", __f45, __setfn3, __args9)

setenv("proc-state", place_expander=__f44)
def __f46(setfn=None, *_args, **_keys):
  ____r56 = unstash(_args, _keys)
  __setfn5 = destash33(setfn, ____r56)
  ____id19 = ____r56
  __args11 = cut(____id19, 0)
  def __f47(v=None, p=None):
    return ["set", ["idx", p, "wait"], v]
  return define_setter("proc-wait", __f47, __setfn5, __args11)

setenv("proc-wait", place_expander=__f46)
L_42procs42 = []
L_42proc42 = None
import time
import pymen.reader
import pymen.system
def write(x=None):
  pymen.system.write(x)
  return None

def read():
  return pymen.reader.read_string(input())

def princ(x=None):
  return L_print(L_str(x))

def __f48(x=None):
  print("default proc", x)
  write(">> ")
  princ(eval(read()))
  return pick_process()

L_42default_proc42 = make_proc(state=__f48)
def __do1__macro(expr=None, *_args, **_keys):
  ____r63 = unstash(_args, _keys)
  __expr3 = destash33(expr, ____r63)
  ____id21 = ____r63
  __args13 = cut(____id21, 0)
  __x65 = unique("x")
  return join(["with", __x65, __expr3], __args13)

setenv("do1", macro=__do1__macro)
def __fork__macro(expr=None, pri=None):
  ____x77 = object(["make-proc"])
  ____x77["state"] = ["fn", [unique("id")], expr, ["pick-process"]]
  ____x77["pri"] = pri
  return ["do1", ["quote", expr], ["push", ____x77, "*procs*"]]

setenv("fork", macro=__fork__macro)
if not( "Halt" in globals()):
  class Halt(Exception):
    pass
L_42halt42 = Halt
def throw(to=None, value=None):
  __e = to()
  __e.value = value
  raise __e

def __throw__macro(*_args, **_keys):
  __args15 = unstash(_args, _keys)
  return join(["%call", "throw"], __args15)

setenv("throw", macro=__throw__macro)
def __catch__macro(x=None, *_args, **_keys):
  ____r67 = unstash(_args, _keys)
  __x83 = destash33(x, ____r67)
  ____id22 = ____r67
  __body8 = cut(____id22, 0)
  return ["try", join(["do"], __body8), ["except", __x83, "as", "e", "e.value"]]

setenv("catch", macro=__catch__macro)
def __loop__macro(*_args, **_keys):
  __body10 = unstash(_args, _keys)
  return ["while", ["is?", join(["do"], __body10)]]

setenv("loop", macro=__loop__macro)
def __program__macro(name=None, args=None, *_args, **_keys):
  ____r69 = unstash(_args, _keys)
  __name5 = destash33(name, ____r69)
  __args17 = destash33(args, ____r69)
  ____id24 = ____r69
  __body12 = cut(____id24, 0)
  return join(["=defun", __name5, __args17, ["global", "*procs*"], ["set", "*procs*", "nil"]], __body12, [["catch", "*halt*", ["loop", ["print", ["quote", "looping"]], ["time.sleep", 0.5], ["pick-process"]]]])

setenv("program", macro=__program__macro)
def pick_process():
  ____id25 = most_urgent_process()
  __p1 = has(____id25, 0)
  __val = has(____id25, 1)
  global L_42proc42, L_42procs42
  L_42proc42 = __p1
  L_42procs42 = delete(__p1, L_42procs42)
  return proc_state(__p1)(__val)

def most_urgent_process():
  __proc1 = L_42default_proc42
  __max = -1
  __val1 = True
  ____o1 = L_42procs42
  ____i1 = None
  for ____i1 in indices(____o1):
    __p2 = ____o1[____i1]
    __pri = proc_pri(__p2)
    if __pri > __max:
      ____y1 = nil63(proc_wait(__p2)) or proc_wait(__p2)()
      if yes(____y1):
        __val11 = ____y1
        __proc1 = __p2
        __max = __pri
        __val1 = __val11
  return __proc1, __val1

def arbitrator(test=None, cont=None):
  global L_42procs42
  L_42proc42.state = cont
  L_42proc42.wait = test
  L_42procs42 = join([L_42proc42], L_42procs42)
  return pick_process()

def __wait__macro(parm=None, test=None, *_args, **_keys):
  ____r74 = unstash(_args, _keys)
  __parm1 = destash33(parm, ____r74)
  __test1 = destash33(test, ____r74)
  ____id27 = ____r74
  __body14 = cut(____id27, 0)
  return ["arbitrator", ["fn", join(), __test1], join(["fn", [__parm1]], __body14)]

setenv("wait", macro=__wait__macro)
def __yielding__macro(*_args, **_keys):
  __body16 = unstash(_args, _keys)
  return ["arbitrator", "nil", join(["fn", [unique("id")]], __body16)]

setenv("yielding", macro=__yielding__macro)
def setpri(n=None):
  L_42proc42.pri = n
  return L_42proc42.pri

def halt(val=None):
  if nil63(val):
    val = None
  return throw(L_42halt42, val)

def kill(obj=None, *_args, **_keys):
  ____r77 = unstash(_args, obj*_args, **_keys)
  __obj = destash33(obj, ____r77)
  if nil63(__obj):
    __obj = None
  ____id28 = ____r77
  __args18 = cut(____id28, 0)
  global L_42procs42
  if is63(__obj):
    L_42procs42 = apply(delete, join([__obj, L_42procs42], __args18, []))
    return L_42procs42
  else:
    return pick_process()

if not( "L_42open_doors42" in globals()):
  global L_42open_doors42
  L_42open_doors42 = None
def __pedestrian__macro1():
  return ["=pedestrian", "*cont*"]

setenv("pedestrian", macro=__pedestrian__macro1)
def L_61pedestrian(L_42cont42=None):
  def __f49():
    return hd(L_42open_doors42)
  def __f50(d=None):
    return L_print("Entering {}".format(d))
  return arbitrator(__f49, __f50)

def __ped__macro1():
  return ["=ped", "*cont*"]

setenv("ped", macro=__ped__macro1)
def L_61ped(L_42cont42=None):
  global L_42procs42
  L_42procs42 = None
  ____x137 = ["pedestrian"]
  def __f51(__id30=None):
    L_61pedestrian(L_42cont42)
    return pick_process()
  L_42procs42 = join([make_proc(state=__f51, pri=1)], L_42procs42)
  while True:
    L_print("looping")
    time.sleep(0.5)
    if not is63(pick_process()):
      break
  return catch(L_42halt42)

def __foo__macro1(x=None):
  return ["=foo", "*cont*", x]

setenv("foo", macro=__foo__macro1)
def L_61foo(L_42cont42=None, x=None):
  L_print("Foo was called with {}".format(x))
  __e20 = None
  if is63(x):
    __e20 = x + 1
  return L_42cont42(__e20)

def __two_foos__macro1(a=None, b=None):
  return ["=two-foos", "*cont*", a, b]

setenv("two-foos", macro=__two_foos__macro1)
def L_61two_foos(L_42cont42=None, a=None, b=None):
  global L_42procs42
  L_42procs42 = None
  ____x150 = ["foo", "a"]
  def __f52(__id33=None):
    L_61foo(L_42cont42, a)
    return pick_process()
  L_42procs42 = join([make_proc(state=__f52, pri=99)], L_42procs42)
  ____x153 = ["foo", "b"]
  def __f53(__id34=None):
    L_61foo(L_42cont42, b)
    return pick_process()
  L_42procs42 = join([make_proc(state=__f53, pri=99)], L_42procs42)
  while True:
    L_print("looping")
    time.sleep(0.5)
    if not is63(pick_process()):
      break
  return catch(L_42halt42)

bboard42 = []
def claim(*_args, **_keys):
  __f16 = unstash(_args, _keys)
  global bboard42
  bboard42 = join([__f16], bboard42)
  return bboard42

def unclaim(*_args, **_keys):
  __f17 = unstash(_args, _keys)
  global bboard42
  bboard42 = delete(__f17, bboard42)
  return bboard42

def check(*_args, **_keys):
  __f18 = unstash(_args, _keys)
  return find(__f18, bboard42, test=equal63)

def __visitor__macro1(door=None):
  return ["=visitor", "*cont*", door]

setenv("visitor", macro=__visitor__macro1)
def L_61visitor(L_42cont42=None, door=None):
  write("Approach {}. ".format(door))
  claim("knock", door)
  def __f54():
    return check("open", door)
  def __f55(d=None):
    write("Enter {}. ".format(door))
    unclaim("knock", door)
    return claim("inside", door)
  return arbitrator(__f54, __f55)

def __host__macro1(door=None):
  return ["=host", "*cont*", door]

setenv("host", macro=__host__macro1)
def L_61host(L_42cont42=None, door=None):
  def __f56():
    return check("knock", door)
  def __f57(k=None):
    write("Open {}. ".format(door))
    claim("open", door)
    def __f58():
      return check("inside", door)
    def __f59(g=None):
      L_print("Close {}.".format(door))
      return unclaim("open", door)
    return arbitrator(__f58, __f59)
  return arbitrator(__f56, __f57)

def __ballet__macro1():
  return ["=ballet", "*cont*"]

setenv("ballet", macro=__ballet__macro1)
def L_61ballet(L_42cont42=None):
  global L_42procs42
  L_42procs42 = None
  ____x179 = ["visitor", ["quote", "door1"]]
  def __f60(__id39=None):
    L_61visitor(L_42cont42, "door1")
    return pick_process()
  L_42procs42 = join([make_proc(state=__f60, pri=1)], L_42procs42)
  ____x183 = ["host", ["quote", "door1"]]
  def __f61(__id40=None):
    L_61host(L_42cont42, "door1")
    return pick_process()
  L_42procs42 = join([make_proc(state=__f61, pri=1)], L_42procs42)
  ____x187 = ["visitor", ["quote", "door2"]]
  def __f62(__id41=None):
    L_61visitor(L_42cont42, "door2")
    return pick_process()
  L_42procs42 = join([make_proc(state=__f62, pri=1)], L_42procs42)
  ____x191 = ["host", ["quote", "door2"]]
  def __f63(__id42=None):
    L_61host(L_42cont42, "door2")
    return pick_process()
  L_42procs42 = join([make_proc(state=__f63, pri=1)], L_42procs42)
  while True:
    L_print("looping")
    time.sleep(0.5)
    if not is63(pick_process()):
      break
  return catch(L_42halt42)

def __capture__macro1(city=None):
  return ["=capture", "*cont*", city]

setenv("capture", macro=__capture__macro1)
def L_61capture(L_42cont42=None, city=None):
  take(city)
  setpri(1)
  def __f64(__id44=None):
    return fortify(city)
  return arbitrator(None, __f64)

def __plunder__macro1(city=None):
  return ["=plunder", "*cont*", city]

setenv("plunder", macro=__plunder__macro1)
def L_61plunder(L_42cont42=None, city=None):
  loot(city)
  return ransom(city)

def take(c=None):
  return L_print("Liberating {}.".format(c))

def fortify(c=None):
  return L_print("Rebuilding {}.".format(c))

def loot(c=None):
  return L_print("Nationalizing {}.".format(c))

def ransom(c=None):
  return L_print("Refinancing {}.".format(c))

def __barbarians__macro1():
  return ["=barbarians", "*cont*"]

setenv("barbarians", macro=__barbarians__macro1)
def L_61barbarians(L_42cont42=None):
  global L_42procs42
  L_42procs42 = None
  ____x209 = ["capture", ["quote", "rome"]]
  def __f65(__id47=None):
    L_61capture(L_42cont42, "rome")
    return pick_process()
  L_42procs42 = join([make_proc(state=__f65, pri=100)], L_42procs42)
  ____x213 = ["plunder", ["quote", "rome"]]
  def __f66(__id48=None):
    L_61plunder(L_42cont42, "rome")
    return pick_process()
  L_42procs42 = join([make_proc(state=__f66, pri=98)], L_42procs42)
  while True:
    L_print("looping")
    time.sleep(0.5)
    if not is63(pick_process()):
      break
  return catch(L_42halt42)

paths42 = []
failsym = "@"
def __fail__macro1():
  return ["=fail", "*cont*"]

setenv("fail", macro=__fail__macro1)
def L_61fail(L_42cont42=None):
  global paths42
  if none63(paths42):
    return L_42cont42(failsym)
  else:
    __p12 = hd(paths42)
    paths42 = tl(paths42)
    return __p12()

def __choose__macro1(choices=None):
  return ["=choose", "*cont*", choices]

setenv("choose", macro=__choose__macro1)
def L_61choose(L_42cont42=None, choices=None):
  global paths42
  def __f67(choice=None):
    def __f68():
      return L_42cont42(choice)
    return __f68
  paths42 = join(paths42, map(__f67, choices))
  return L_61fail(L_42cont42)

def null63(x=None):
  return no(x) or list63(x) and none63(x)

def __path__macro1(node1=None, node2=None):
  return ["=path", "*cont*", node1, node2]

setenv("path", macro=__path__macro1)
def L_61path(L_42cont42=None, node1=None, node2=None):
  if null63(neighbors(node1)):
    return L_61fail(L_42cont42)
  else:
    if node2 in neighbors(node1):
      return L_42cont42([node2])
    else:
      def __f69(n=None):
        def __f70(m=None):
          return L_42cont42(join([n], m))
        __L_42cont425 = __f70
        return L_61path(__L_42cont425, n, node2)
      __L_42cont424 = __f69
      return L_61choose(__L_42cont424, neighbors(node1))

nodes42 = {
  "a": ["b", "d"],
  "b": ["c"],
  "c": ["a"],
  "d": ["e"],
  "e": []
}
def neighbors(n=None):
  return nodes42[n]

def cons(a=None, b=None):
  if null63(b):
    return [a]
  else:
    if list63(b):
      return join([a], b)
    else:
      ____x238 = object([a])
      ____x238["rest"] = b
      return ____x238

def car(a=None):
  if null63(a):
    return a
  else:
    return hd(a)

def cdr(a=None):
  if null63(a):
    return a
  else:
    __x239 = tl(a)
    if none63(__x239):
      return has(__x239, "rest")
    else:
      return __x239

def assoc(x=None, values=None, test=None):
  if nil63(test):
    test = equal63
  def __f71(entry=None):
    return test(car(entry), x)
  ____y3 = first(__f71, values)
  if yes(____y3):
    __pos1 = ____y3
    return values[__pos1]

def nth(n=None, lst=None):
  if n < len(lst):
    return lst[n]

def __defnode__macro1(name=None, *_args, **_keys):
  ____r204 = unstash(_args, _keys)
  __name7 = destash33(name, ____r204)
  ____id54 = ____r204
  __body22 = cut(____id54, 0)
  return ["=defun", __name7, ["pos", "regs"], ["choose", join(["list"], __body22)]]

setenv("defnode", macro=__defnode__macro1)
def __down__macro1(sub=None, next=None, *_args, **_keys):
  ____r205 = unstash(_args, _keys)
  __sub1 = destash33(sub, ____r205)
  __next3 = destash33(next, ____r205)
  ____id55 = ____r205
  __body23 = cut(____id55, 0)
  return ["=bind", ["*", "pos", "regs"], [__sub1, "pos", ["cons", "nil", "regs"]], [__next3, "pos", compile_cmds(__body23)]]

setenv("down", macro=__down__macro1)
def __cate__macro1(category=None, next=None, *_args, **_keys):
  ____r206 = unstash(_args, _keys)
  __category1 = destash33(category, ____r206)
  __next4 = destash33(next, ____r206)
  ____id56 = ____r206
  __body24 = cut(____id56, 0)
  return ["if", ["=", ["len", "*sent*"], "pos"], ["fail"], ["let", "*", ["nth", "pos", "*sent*"], ["if", ["member", ["quote", __category1], ["types", "*"]], [__next4, ["+", "pos", 1], compile_cmds(__body24)], ["fail"]]]]

setenv("cate", macro=__cate__macro1)
def __jump__macro1(next=None, *_args, **_keys):
  ____r207 = unstash(_args, _keys)
  __next5 = destash33(next, ____r207)
  ____id57 = ____r207
  __body25 = cut(____id57, 0)
  return [__next5, "pos", compile_cmds(__body25)]

setenv("jump", macro=__jump__macro1)
def compile_cmds(cmds=None):
  if null63(cmds):
    return "regs"
  else:
    return join(car(cmds), [compile_cmds(cdr(cmds))])

def __up__macro1(expr=None):
  return ["let", "*", ["nth", "pos", "*sent*"], ["=values", expr, "pos", ["cdr", "regs"]]]

setenv("up", macro=__up__macro1)
def __getr__macro1(key=None, regs=None):
  if nil63(regs):
    regs = "regs"
  return ["let", "result", ["cdr", ["assoc", ["quote", key], ["car", regs]]], ["if", ["null?", ["cdr", "result"]], ["car", "result"], "result"]]

setenv("getr", macro=__getr__macro1)
def __set_register__macro1(key=None, val=None, regs=None):
  return ["cons", ["cons", ["cons", key, val], ["car", regs]], ["cdr", regs]]

setenv("set-register", macro=__set_register__macro1)
def __setr__macro1(key=None, val=None, regs=None):
  return ["set-register", ["quote", key], ["list", val], regs]

setenv("setr", macro=__setr__macro1)
def __pushr__macro1(key=None, val=None, regs=None):
  return ["set-register", ["quote", key], ["cons", val, ["cdr", ["assoc", ["quote", key], ["car", regs]]]], regs]

setenv("pushr", macro=__pushr__macro1)
def __with_parses__macro1(node=None, sent=None, *_args, **_keys):
  ____r214 = unstash(_args, _keys)
  __node1 = destash33(node, ____r214)
  __sent1 = destash33(sent, ____r214)
  ____id58 = ____r214
  __body26 = cut(____id58, 0)
  __pos3 = unique("pos")
  __regs1 = unique("regs")
  return ["do", ["global", "*sent*"], ["global", "*paths*"], ["set", "*sent*", __sent1], ["set", "*paths*", join()], ["=bind", ["parse", __pos3, __regs1], [__node1, 0, ["quote", [join()]]], ["if", ["=", __pos3, ["len", "*sent*"]], join(["do"], __body26, [["fail"]]), ["fail"]]]]

setenv("with-parses", macro=__with_parses__macro1)
L_42sent42 = []
def __s__macro3(pos=None, regs=None):
  return ["=s", "*cont*", pos, regs]

setenv("s", macro=__s__macro3)
def L_61s(L_42cont42=None, pos=None, regs=None):
  __e21 = None
  if len(L_42sent42) == pos:
    __e21 = L_61fail(L_42cont42)
  else:
    __L_427 = nth(pos, L_42sent42)
    __e22 = None
    if member("noun", types(__L_427)):
      L_print("Setting subj to {}".format(L_str(__L_427)))
      __e22 = L_61s2(L_42cont42, pos + 1, cons(cons(cons("subj", [__L_427]), car(regs)), cdr(regs)))
    else:
      __e22 = L_61fail(L_42cont42)
    __e21 = __e22
  return L_61choose(L_42cont42, [__e21])

def __s2__macro3(pos=None, regs=None):
  return ["=s2", "*cont*", pos, regs]

setenv("s2", macro=__s2__macro3)
def L_61s2(L_42cont42=None, pos=None, regs=None):
  __e23 = None
  if len(L_42sent42) == pos:
    __e23 = L_61fail(L_42cont42)
  else:
    __L_429 = nth(pos, L_42sent42)
    __e24 = None
    if member("verb", types(__L_429)):
      L_print("Setting v to {}".format(L_str(__L_429)))
      __e24 = L_61s3(L_42cont42, pos + 1, cons(cons(cons("v", [__L_429]), car(regs)), cdr(regs)))
    else:
      __e24 = L_61fail(L_42cont42)
    __e23 = __e24
  return L_61choose(L_42cont42, [__e23])

def __s3__macro3(pos=None, regs=None):
  return ["=s3", "*cont*", pos, regs]

setenv("s3", macro=__s3__macro3)
def L_61s3(L_42cont42=None, pos=None, regs=None):
  __L_4211 = nth(pos, L_42sent42)
  __result6 = cdr(assoc("subj", car(regs)))
  __e25 = None
  if null63(cdr(__result6)):
    __e25 = car(__result6)
  else:
    __e25 = __result6
  __result7 = cdr(assoc("v", car(regs)))
  __e26 = None
  if null63(cdr(__result7)):
    __e26 = car(__result7)
  else:
    __e26 = __result7
  return L_61choose(L_42cont42, [L_42cont42(["sentence", ["subject", __e25], ["verb", __e26]], pos, cdr(regs))])

def types(w=None):
  return cdr(assoc(w, [["spot", "noun"], ["runs", "verb"]]))

def parse_test():
  global L_42sent42
  global L_42paths42
  L_42sent42 = ["spot", "runs"]
  L_42paths42 = []
  def __f72(parse=None, __pos4=None, __regs2=None):
    if __pos4 == len(L_42sent42):
      L_print("Parsing: {}".format(parse))
      return L_61fail(L_42cont42)
    else:
      return L_61fail(L_42cont42)
  __L_42cont426 = __f72
  L_61s(__L_42cont426, 0, [[]])
  return None

def __choose_bind__macro1(var=None, binds=None, *_args, **_keys):
  ____r243 = unstash(_args, _keys)
  __var1 = destash33(var, ____r243)
  __binds1 = destash33(binds, ____r243)
  ____id60 = ____r243
  __body28 = cut(____id60, 0)
  return join(["=bind", [__var1], ["choose", __binds1]], __body28)

setenv("choose-bind", macro=__choose_bind__macro1)
def __choose_bind_test__macro1():
  return ["=choose-bind-test", "*cont*"]

setenv("choose-bind-test", macro=__choose_bind_test__macro1)
def L_61choose_bind_test(L_42cont42=None):
  def __f73(x=None):
    write(L_str(x))
    if x == 6:
      return x
    else:
      return L_61fail(L_42cont42)
  __L_42cont428 = __f73
  return L_61choose(__L_42cont428, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

