

resource "aws_elasticache_cluster" "kurakichi" {
  cluster_id               = "kurakichi"
  engine                   = "redis"
  node_type                = "cache.t4g.micro"
  num_cache_nodes          = 1
  parameter_group_name     = aws_elasticache_parameter_group.kurakichi.name
  engine_version           = "6.x"
  port                     = 6379
  snapshot_window          = "09:10-10:10"
  snapshot_retention_limit = 7
  maintenance_window       = "mon:10:40-mon:11:40"
  security_group_ids       = [module.redis_sg.security_group_id]
  subnet_group_name        = aws_elasticache_subnet_group.kurakichi.name
  apply_immediately        = false

}

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
  ]
}

module "redis_sg" {
  source      = "../sg"
  name        = "redis-sg"
  vpc_id      = var.vpc.id
  from_port   = 6379
  to_port     = 6379
  cidr_blocks = [var.vpc.cidr_block]
}
