# terraform@dev

動作確認を目的とした最低限の構成を構築するもの

## 構成

- root

  - main: 各Moduleの呼び出し

  - versions: terraform及びAWS ProviderのVersion指定

- container

  - ecr: -

  - ecs: -

  - ecs-def: 初期設定であり、GitHubActionsで上書きされる

- iam

  - 切り出し

- network

  - acm: Cert

  - alb: 開発環境のためNLB

  - route53: Web用サブドメイン取得

  - vpc: -

- security

  - kms: -

  - ssm: aws-cliかコンソールから上書き

- sg

  - 切り出し

- storage

  - docDB: -

  - elastiCache: ClusterDisabled Redis

  - s3: パブリック・プライベート・ログの三種
