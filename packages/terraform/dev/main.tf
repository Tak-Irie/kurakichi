module "network" {
  source                           = "./network"
  domain_address                   = var.domain_address
  vpc_id                           = var.vpc_id
  acm_arn                          = var.acm_arn
  public_subnet_1a_id              = var.public_subnet_1a_id
  public_subnet_1c_id              = var.public_subnet_1c_id
  private_subnet_1a_id             = var.private_subnet_1a_id
  route_table_id_private_subnet_1a = var.route_table_id_private_subnet_1a
}


module "container" {
  source               = "./container"
  lb_target_group      = module.network.lb_target_group
  domain_name          = var.domain_name
  vpc_id               = var.vpc_id
  cidr_block           = var.cidr_block
  private_subnet_1a_id = var.private_subnet_1a_id
  kms_arn              = var.kms_arn
  secrets_manager_name = var.secrets_manager_name
  secret_manager_arn   = var.secret_manager_arn
  express_image        = var.express_image
  psql_image           = var.psql_image
  redis_image          = var.redis_image
}

