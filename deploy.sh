#!/bin/bash

# Node.jsサーバーのDockerイメージを、ECRにプッシュするスクリプト
# 引数は、1.AWSプロファイル名、2.イメージのタグ名、3.AWSアカウントID
# CDを整備するまでのつなぎ

yarn gen:gql
wait
yarn build
wait
yarn install
wait
docker build -t "$2" .
wait
export AWS_DEFAULT_PROFILE=$1
wait
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin "$3".dkr.ecr.ap-northeast-1.amazonaws.com
wait
imageId=$(docker images "$2" --format "{{.ID}}")
wait
docker tag "$imageId" "$3".dkr.ecr.ap-northeast-1.amazonaws.com/kurakichi:"$2"
wait
docker push "$3".dkr.ecr.ap-northeast-1.amazonaws.com/kurakichi:"$2"
wait
echo "deployment done!"
