.PHONY: gitlab neocities-supporter

gitlab:
	git push

neocities-supporter:
	rclone sync public bruhltd: -P
