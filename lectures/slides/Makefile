# Makefile for compiling slides with Pandoc

# Get all new markdown files
SOURCE := $(wildcard *.md)

PANDOC_OPTS = -s \
			  -t revealjs \
			  --template=../html_srcs/templates/revealjs.md \
			  -L ../html_srcs/filters/revealjs-code.lua \
			  -L ../html_srcs/filters/inline_svg.lua \
			  -L ../html_srcs/filters/tikz.lua \
			  --mathjax=../html_srcs/reveal.js/plugin/math/mathjax/tex-mml-chtml.js

REVEAL_OPTS = -V revealjs-url=../html_srcs/reveal.js \
			  -V highlightjs \
			  -V center=false

# Pattern match to run if html is desired
%.html: %.md
	@pandoc $(PANDOC_OPTS) $(REVEAL_OPTS) $< -o $@
	@echo Compiling $<

# Default rule (convert all markdown to html)
default: $(SOURCE:.md=.html)

clean: 
	@rm *.html
	@echo All html files purged
