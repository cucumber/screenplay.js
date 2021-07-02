ASSEMBLY_SCRIPTS = $(wildcard features/assembly-diagram-scripts/*.txt)
ASSEMBLY_SVGS    = $(patsubst features/assembly-diagram-scripts/%.txt,images/%.svg,$(ASSEMBLY_SCRIPTS))

svgs: $(ASSEMBLY_SVGS)
.PHONY: svgs

images/%.svg: features/assembly-diagram-scripts/%.txt
	mkdir -p $(@D)
	./node_modules/.bin/assembly-diagrams $< --stroke-width 16 > $@
