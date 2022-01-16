#!/bin/bash
WORK_PATH='/usr/projects/learning'
cd $WORK_PATH
echo "先清除老代码"
git reset --hard origin/main
git clean -f
echo "拉取新代码"
git pull origin main
echo "打包"
npm run build
echo "开始执行构建"
docker build -t learning:1.0 .
echo "停止就容器并删除"
docker stop learning-container
docker rm learning-container
echo "启动新容器"
docker container run -p 80:80 --name learning-container -d learning:1.0