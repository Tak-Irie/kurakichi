module "network" {
  source         = "./network"
  domain_name    = var.domain_name
  domain_address = var.domain_address
}
module "container" {
  source = "./container"
}
module "security" {
  source = "./security"
}
module "storage" {
  source = "./storage"
  kms    = module.security.kms
}