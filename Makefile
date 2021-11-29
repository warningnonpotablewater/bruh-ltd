.PHONY: gitlab rsync archive

gitlab:
	git push

rsync:
	rsync -rtvzP public/ root@bruh.ltd:/var/www/bruh-ltd

archive:
	zip -r $$(date +"%F")-web.bruh.ltd.zip *
