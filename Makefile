.PHONY: gitlab neocities-supporter

gitlab:
	git push

neocities-supporter: build
	rclone sync public bruhltd: -P
