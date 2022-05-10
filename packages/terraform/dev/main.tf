module "container" {
  source               = "./container"
  lb_target_group      = module.network.lb_target_group
  domain_name          = var.domain_name
  vpc_id               = var.vpc_id
  cidr_block           = var.cidr_block
  private_subnet_1a_id = var.private_subnet_1a_id
  kms_arn              = var.kms_arn
  secrets_manager_name = var.secrets_manager_name
}

module "network" {
  source              = "./network"
  domain_address      = var.domain_address
  vpc_id              = var.vpc_id
  acm_arn             = var.acm_arn
  public_subnet_1a_id = var.public_subnet_1a_id
  public_subnet_1c_id = var.public_subnet_1c_id
}

module "iam" {
  source     = "./iam"
  name       = "ecs-task-execution"
  identifier = "ecs-tasks.amazonaws.com"
  policy     = module.container.ecs_policy
}