import sys, importlib
from pathlib import Path


def import_parents(level=1):
    global __package__
    file = Path(__file__).resolve()
    parent, top = file.parent, file.parents[level]
    
    sys.path.append(str(top))
    try:
        sys.path.remove(str(parent))
    except ValueError: # already removed
        pass

    __package__ = '.'.join(parent.parts[len(top.parts):])
    return importlib.import_module(__package__) # won't be needed after that


if __name__ == '__main__' and not __package__:
    pymen = import_parents(level=1)
    sys.modules['pymen'] = pymen
    pymen.main.main(pymen.system.argv)
