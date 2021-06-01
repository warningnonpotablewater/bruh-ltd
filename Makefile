.PHONY: gitlab neocities neocities-supporter archive

gitlab:
	git push

neocities:
	neocities push public

neocities-supporter:
	rclone sync public bruhltd: -P

archive:
	zip -r $$(date +"%F")-web.bruh.ltd.zip *
