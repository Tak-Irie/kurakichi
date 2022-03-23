resource "aws_elasticache_parameter_group" "kurakichi" {
  name   = "kurakichi"
  family = "redis6.x"

  parameter {
    name  = "cluster-enabled"
    value = "no"
  }
}

resource "aws_elasticache_subnet_group" "kurakichi" {
  name = "kurakichi"
  subnet_ids = [
    var.private_subnet_1a.id,
    var.private_subnet_1c.id
  ]
}

resource "aws_elasticache_replication_group" "kurakichi-replica" {
  replication_group_id          = "kurakichi"
  replication_group_description = "Cluster Disabled"
  engine                        = "redis"
  engine_version                = "6.x"
  number_cache_clusters         = 2
  node_type                     = "cache.t4g.small"
  snapshot_window               = "09:10-10:10"
  snapshot_retention_limit      = 7
  maintenance_window            = "mon:10:40-mon:11:40"
  automatic_failover_enabled    = true
  port                          = 6379
  apply_immediately             = false
  security_group_ids            = [module.redis_sg.security_group_id]
  parameter_group_name          = aws_elasticache_parameter_group.kurakichi.name
  subnet_group_name             = aws_elasticache_subnet_group.kurakichi.name
}

module "redis_sg" {
  source      = "../sg"
  name        = "redis-sg"
  vpc_id      = var.vpc.id
  port        = 6379
  cidr_blocks = [var.vpc.cidr_block]
}
