variable "docdb_cluster" {}

resource "aws_ssm_parameter" "db_username" {
  name        = "/db/username"
  value       = "bowlby"
  type        = "String"
  description = "くらきちmongoのユーザーネーム"
}

resource "aws_ssm_parameter" "db_password" {
  name        = "/db/password"
  value       = var.docdb_cluster.master_password
  type        = "SecureString"
  description = "くらきちDocumentDBのテラフォーム用ダミーパスワード。AWS-CLIで上書きして下さい"
  lifecycle {
    ignore_changes = [value]
  }
}
resource "aws_ssm_parameter" "db_init-db" {
  name        = "/db/init-db"
  value       = "tempolarydummy"
  type        = "String"
  description = "くらきちDocumentDBのデータベース名"
}
resource "aws_ssm_parameter" "db_uri" {
  name        = "/db/uri"
  value       = "tempolarydummy"
  type        = "String"
  description = "くらきちDocumentDBのAmazon Resource Name"
}
resource "aws_ssm_parameter" "redis_uri" {
  name        = "/redis/uri"
  value       = "tempolarydummy"
  type        = "String"
  description = "くらきちElastiCacheのURI"
}
