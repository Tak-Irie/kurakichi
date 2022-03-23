variable "private_subnet_1a" {}
variable "private_subnet_1c" {}
variable "kms" {}
variable "vpc" {}

resource "aws_docdb_cluster" "kurakichi" {
  cluster_identifier              = "kurakichi-docdb-cluster"
  engine                          = "docdb"
  engine_version                  = "4.0.0"
  master_username                 = "kurakichi"
  master_password                 = random_password.password.result
  backup_retention_period         = 5
  preferred_backup_window         = "07:00-09:00"
  skip_final_snapshot             = true
  db_cluster_parameter_group_name = aws_docdb_cluster_parameter_group.kurakichi_doc.name
  apply_immediately               = true
  db_subnet_group_name            = aws_docdb_subnet_group.kurakichi.name
  vpc_security_group_ids          = [module.docdb_sg.security_group_id]
}

resource "aws_docdb_cluster_instance" "cluster_instances" {
  count              = 1
  identifier         = "kurakichi-docdb-cluster-instance"
  cluster_identifier = aws_docdb_cluster.kurakichi.id
  instance_class     = "db.t3.medium"
}

resource "aws_docdb_cluster_parameter_group" "kurakichi_doc" {
  family = "docdb4.0"
  name   = "kurakichi-docdb"

  parameter {
    name  = "tls"
    value = "enabled"
  }
}

module "docdb_sg" {
  source      = "../sg"
  name        = "docdb-sg"
  vpc_id      = var.vpc.id
  from_port   = 27017
  to_port     = 27017
  cidr_blocks = [var.vpc.cidr_block]
}

resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "_-.!*"
}

resource "aws_docdb_subnet_group" "kurakichi" {
  name       = "kurakichi-docdb-subnet-group"
  subnet_ids = [var.private_subnet_1a.id, var.private_subnet_1c.id]

  tags = {
    Name = "kurakichi docdb-subnet-group"
  }
}