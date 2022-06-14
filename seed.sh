#!/bin/bash

# AWS上のPostgresサーバーにseedingするためのスクリプト
# 引数は、1.AWSプロファイル名、2.ECSクラスター名、3.ECSタスク名
# CDを整備するまでのつなぎ

export AWS_DEFAULT_PROFILE=$1
wait
aws ecs execute-command --cluster "$2" --task "$3" --container express --interactive --command "/bin/sh"
wait
yarn gen:prisma:migrate:prod
wait
yarn gen:prisma:seed:prod
