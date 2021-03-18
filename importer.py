# -*- coding: utf-8 -*-

# (c) 2016 Marcos Dione <mdione@grulic.org.ar>

# This file is part of ayrton.
#
# ayrton is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# ayrton is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with ayrton.  If not, see <http://www.gnu.org/licenses/>.

import importlib
from importlib.abc import MetaPathFinder, Loader
try:
    # py3.4
    from importlib.machinery import ModuleSpec
except ImportError:  # pragma: no cover
    # py3.3
    pass  # sorry, no support

import sys
import os
import os.path

import logging
logger = logging.getLogger ('pymen.importer')
logger.setLevel(logging.DEBUG)

import os
import stat
import os.path

# these functions imitate the -* tests from [ (as per bash's man page)

def simple_stat (fname):
    try:
        return os.stat (fname)
    except (IOError, OSError):
        return None


class FalseBool:
    """This class is needed so file test X() can be called -X() and not break
    the semantics. The problem is that -True==-1 and -False==0. Also:
    TypeError: type 'bool' is not an acceptable base type."""

    def __init__ (self, value):
        if not isinstance (value, bool):
            raise ValueError

        self.value = value

    def __bool__ (self):
        return self.value

    def __neg__ (self):
        return self.value


def a (fname):
    return FalseBool (simple_stat (fname) is not None)

def b (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and stat.S_ISBLK (s.st_mode))

def c (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and stat.S_ISCHR (s.st_mode))

def d (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and stat.S_ISDIR (s.st_mode))

# both return the same thing!
e = a

def f (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and stat.S_ISREG (s.st_mode))

def g (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and (stat.S_IMODE (s.st_mode) & stat.S_ISGID)!=0)

def h (fname):
    return FalseBool (os.path.islink (fname))

def k (fname):
    s = simple_stat (fname)
    # VTX?!?
    return FalseBool (s is not None and (stat.S_IMODE (s.st_mode) & stat.S_ISVTX)!=0)

def p (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and stat.S_ISFIFO (s.st_mode))

def r (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and (stat.S_IMODE (s.st_mode) &
                                         (stat.S_IRUSR|stat.S_IRGRP|stat.S_IROTH))!=0)

def s (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and s.st_size>0)

# TODO: t
# os.isatty(fd)

def u (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and (stat.S_IMODE (s.st_mode) & stat.S_ISUID)!=0)

def w (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and (stat.S_IMODE (s.st_mode) &
                                         (stat.S_IWUSR|stat.S_IWGRP|stat.S_IWOTH))!=0)

def x (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and (stat.S_IMODE (s.st_mode) &
                                         (stat.S_IXUSR|stat.S_IXGRP|stat.S_IXOTH))!=0)

# TODO: G, O

L = h

def N (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and s.st_mtime_ns > s.st_atime_ns)

def S (fname):
    s = simple_stat (fname)
    return FalseBool (s is not None and stat.S_ISSOCK (s.st_mode))

# TODO: ef,

def nt (a, b):
    # file1 is newer (according to modification date) than file2, or if file1 exists and file2 does not.
    s1 = simple_stat (a)
    s2 = simple_stat (b)
    return FalseBool (   (s1 is not None and s2 is None)
                      or (s1.st_mtime_ns > s2.st_mtime_ns))

def ot (a, b):
    # file1 is older than file2, or if file2 exists and file1 does not.
    s1 = simple_stat (a)
    s2 = simple_stat (b)
    return FalseBool (   (s2 is not None and s1 is None)
                      or (s2.st_mtime_ns > s1.st_mtime_ns))

def z(value):
    ans = value is None or value == ''

    return FalseBool(ans)


import subprocess
from pprint import pformat as pps

lumen_bin = os.path.abspath(os.path.join(os.path.dirname(__file__), "bin", "lumen"))
# from distutils.spawn import find_executable
# lumen_bin = os.path.join(os.path.dirname(os.path.realpath(find_executable("pymen"))), "lumen")
assert len(lumen_bin) > 0

class PymenLoader (Loader):

    @staticmethod
    def compile_file(filename, outfile):
      outfile = os.path.abspath(outfile)
      cwd = os.getcwd()
      try:
        os.chdir(os.path.dirname(filename) or ".")
        p = subprocess.run(
            [lumen_bin,
              "-c", os.path.basename(filename),
              "-o", outfile,
              "-t", "py"],
            stdout = subprocess.PIPE,
            stderr = subprocess.STDOUT)
        out = p.stdout.decode('utf8')
        if p.returncode != 0:
          sys.stderr.write(out)
        p.check_returncode()
      finally:
        os.chdir(cwd)
      with open(outfile) as f:
        return f.read()

    # def get_code(self, fullname):
    #     import pdb; pdb.set_trace()
    #     path = self.get_filename(fullname)
    #     print('get_code(fullname={fullname!r}, self.path={path!r})'.format(fullname=fullname, path=path))
    #     #source = self.get_data(path)
    #     compiled = self.compile_file(path)
    #     code = self.source_to_code(compiled, self.path)
    #     return code

    def get_code(self, fullname):
        logger.debug('get_code(fullname={fullname!r})'.format(fullname=fullname))
        if fullname.endswith('.__main__'):
          basename = fullname.rpartition('.')[0]
          mod = sys.modules.get(basename)
          if mod is not None:
            if mod.__file__:
              load_path = os.path.join(os.path.dirname(mod.__file__), "__main__.l")
              if load_path.endswith('.l'):
                file_path = load_path.rpartition('.')[0] + '.py'
              else:
                file_path = load_path + '.py'
              source = self.compile_file(load_path, file_path)
              code = compile(source, file_path, 'exec', dont_inherit=True)
              return code
        raise ImportError(fullname)


    @classmethod
    def exec_module (klass, module):
        # module is a freshly created, empty module
        # «the loader should execute the module’s code
        # in the module’s global name space (module.__dict__).»
        load_path= module.__spec__.origin
        logger.debug ('loading %s [%s]', module, load_path)
        # I *need* to polute the globals, so modules can use any of ayrton's builtins
        #import pdb; pdb.set_trace()
        #loader= Ayrton (g=module.__dict__)
        #loader.run_file (load_path)
        if load_path.endswith('.l'):
          file_path = load_path.rpartition('.')[0] + '.py'
        else:
          file_path = load_path + '.py'
        source = klass.compile_file(load_path, file_path)
        code = compile(source, file_path, 'exec', dont_inherit=True)
        module.__file__ = os.path.abspath(load_path)
        module.__cached__ = importlib.util.cache_from_source(module.__file__)
        with open(file_path, 'w') as f:
          f.write(source)
        exec(code, module.__dict__, module.__dict__)

        # set the __path__
        # TODO: read PEP 420
        init_file_name= '__init__.l'
        if load_path.endswith (init_file_name):
            # also remove the '/'
            module.__path__ = [ load_path[:-len (init_file_name)-1] ]
            module.__package__ = module.__package__ or module.__name__

        #logger.debug ('module.__dict__: %s ', ayrton.utils.dump_dict (module.__dict__))
        logger.debug ('module.__dict__: %s ', pps (module.__dict__))


loader = PymenLoader ()


class PymenFinder (MetaPathFinder):

    @classmethod
    def find_spec (klass, full_name, paths=None, target=None):
        # full_name is the full python path (as in grandparent.parent.child)
        # and path is the path of the parent (in a list, see PEP 420);
        # if None, then we're loading a root module
        # let's start with a single file
        # TODO: read PEP 420 :)
        logger.debug ('searching for %s under %s for %s', full_name, paths, target)
        last_mile= full_name.split ('.')[-1]

        if paths is not None:
            python_path= paths  # search only there
        else:
            python_path= sys.path

        logger.debug (python_path)
        for path in python_path:
            for ending in ['index.l', '__init__.l']:
                full_path= os.path.join (path, last_mile)
                init_full_path= os.path.join (full_path, ending)
                module_full_path= full_path+'.l'

                logger.debug ('trying %s', init_full_path)
                if -d (full_path) and -a (init_full_path):
                    logger.debug ('found package %s', full_path)
                    return ModuleSpec (full_name, loader, origin=os.path.abspath(init_full_path))

                logger.debug ('trying %s', module_full_path)
                if -a (module_full_path):
                    logger.debug ('found module %s', module_full_path)
                    return ModuleSpec (full_name, loader, origin=os.path.abspath(module_full_path))

        logger.debug ('404 Not Found')
        return None


finder = PymenFinder ()

# must insert at the beginning so it goes before FileFinder
sys.meta_path.insert(0, finder)

if __name__ == "__main__":
  import main
  main.main(main.system.argv)
