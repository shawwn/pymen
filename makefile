.PHONY: all clean test

LUMEN_LUA  ?= lua
LUMEN_NODE ?= node
LUMEN_PYTHON ?= python3
LUMEN_HOST ?= $(LUMEN_NODE)

LUMEN := LUMEN_HOST="$(LUMEN_HOST)" bin/lumen

OBJS :=	runtime.o	\
	macros.o	\
	main.o

MODS := bin/lumen.x	\
	bin/reader.x	\
	bin/compiler.x	\
	bin/system.x

all: $(MODS:.x=.js) $(MODS:.x=.lua) $(MODS:.x=.py) bin/pymen.js

clean:
	@git checkout bin/*.js
	@git checkout bin/*.lua
	@git checkout bin/*.py

bin/lumen.js: $(OBJS:.o=.l)

bin/lumen.lua: $(OBJS:.o=.l)

bin/lumen.py: $(OBJS:.o=.l)

bin/%.js : %.l
	@echo $@
	@$(LUMEN) -c $< -o $@ -t js

bin/%.lua : %.l
	@echo $@
	@$(LUMEN) -c $< -o $@ -t lua

bin/%.py : %.l
	@echo $@
	@$(LUMEN) -c $< -o $@ -t py

test: all
	@echo js:
	@LUMEN_HOST=$(LUMEN_NODE) ./test.l
	@echo lua:
	@LUMEN_HOST=$(LUMEN_LUA) ./test.l
	@echo py:
	@LUMEN_HOST=$(LUMEN_PYTHON) ./test.l
