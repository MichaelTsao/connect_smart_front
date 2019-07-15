#!/bin/sh

docker build -t=connect-smart-front .
id=`docker ps -q`
docker container stop ${id}
docker run -d -p 1186:8080 connect-smart-front