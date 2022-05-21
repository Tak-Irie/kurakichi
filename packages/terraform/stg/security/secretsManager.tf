variable "docdb_cluster" {}
variable "elasticache_cluster" {}
variable "db_defaultdb_and_option" {
  type    = string
  default = null
}


locals {
  kurakichi_secrets = {
    db_user_name            = var.docdb_cluster.master_username
    db_password             = var.docdb_cluster.master_password
    db_uri                  = "${var.docdb_cluster.endpoint}:${var.docdb_cluster.port}"
    db_defaultdb_and_option = var.db_defaultdb_and_option
    elasticache_uri         = "${var.elasticache_cluster.cache_nodes[0].address}:${var.elasticache_cluster.cache_nodes[0].port}"
    web_uri                 = "https://www.kurakichi.org"
  }
}

resource "aws_secretsmanager_secret" "kurakichi" {
  name = "kurakichi-secrets-dev"
  depends_on = [
    var.docdb_cluster,
    var.elasticache_cluster
  ]
}

resource "aws_secretsmanager_secret_version" "kurakichi" {
  secret_id     = aws_secretsmanager_secret.kurakichi.id
  secret_string = jsonencode(local.kurakichi_secrets)
}
