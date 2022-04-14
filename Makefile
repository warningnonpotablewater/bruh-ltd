.PHONY: archive

archive:
	zip -r $$(date +"%F")-web.bruh.ltd.zip *
