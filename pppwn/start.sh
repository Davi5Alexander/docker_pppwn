#!/bin/sh
php-fpm -D
nginx
sh /docker_pppwn/pppwn/hack.sh >> /var/www/html/hack.log