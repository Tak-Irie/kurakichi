provider "aws" {
  profile = "dev"
  region  = "ap-northeast-1"
}

module "storage" {
  source            = "./storage"
  private_subnet_1a = module.network.private_subnet_1a
  private_subnet_1c = module.network.private_subnet_1c
  kms               = module.security.kms
  vpc               = module.network.vpc
}

module "security" {
  source              = "./security"
  docdb_cluster       = module.storage.docdb_cluster
  elasticache_cluster = module.storage.elasticache_cluster
}

module "network" {
  source = "./network"
  s3_log = module.storage.s3_log
}

module "container" {
  source            = "./container"
  vpc               = module.network.vpc
  private_subnet_1a = module.network.private_subnet_1a
  lb_target_group   = module.network.lb_target_group
}
