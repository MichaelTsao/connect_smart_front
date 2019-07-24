#!/bin/sh

docker build -t=connect-smart-front .
docker container stop "$(docker ps -q)"
docker run -d -p 1186:8080 connect-smart-front