# terraform@prod

../devをベースに一般公開を目的とした環境に最適化

マルチAZ化・ストレージのレプリケーションなどで可用性を向上

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

  - alb: ALB

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
