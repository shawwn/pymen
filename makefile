.PHONY: all clean test

LUMEN_LUA  ?= lua
LUMEN_NODE ?= node
LUMEN_PYTHON ?= python3
LUMEN_HOST ?= $(LUMEN_NODE)

LUMEN := LUMEN_HOST="$(LUMEN_HOST)" bin/lumen

OBJS :=	runtime.o	\
	macros.o	\
	main.o

MODS := runtime.x	\
	macros.x	\
	reader.x	\
	compiler.x	\
	system.x	\
	main.x

all: $(MODS:.x=.js) $(MODS:.x=.lua) $(MODS:.x=.py) bin/pymen.js

clean:
	@git checkout -- $(MODS:.x=.js) $(MODS:.x=.lua) $(MODS:.x=.py)

./%.js : %.l
	@echo $@
	@$(LUMEN) -c $< -o $@ -t js

./%.lua : %.l
	@echo $@
	@$(LUMEN) -c $< -o $@ -t lua

./%.py : %.l
	@echo $@
	@$(LUMEN) -c $< -o $@ -t py

test: all
	@echo js:
	@LUMEN_HOST=$(LUMEN_NODE) ./test.l
	@echo lua:
	@LUMEN_HOST=$(LUMEN_LUA) ./test.l
	@echo py:
	@LUMEN_HOST=$(LUMEN_PYTHON) ./test.l
