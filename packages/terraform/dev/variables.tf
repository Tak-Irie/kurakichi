variable "domain_name" {
  description = "used for namaing ecs-cluster, ecs-family"
}

variable "cidr_block" {
  description = "used for sg on exoress"
}

variable "private_subnet_1a_id" {
  description = "used for ecs service"
}
variable "kms_arn" {
  description = "used for iam of ecs_task"
}
variable "secrets_manager_name" {
  description = "used for iam of ecs_task"
}
variable "domain_address" {
  description = "used for naming"
  default     = "kurakichi.org"
  type        = string

}
variable "vpc_id" {
  description = "used for network module"
  type        = string
}


variable "acm_arn" {
  description = "used for HTTPS"
  type        = string
}

variable "public_subnet_1a_id" {
  description = "It belongs with kurakichi VPC"
  type        = string
}
variable "public_subnet_1c_id" {
  description = "It belongs with kurakichi VPC"
  type        = string
}
variable "express_image" {
  description = "used as docker image for ecs"
}
variable "redis_image" {
  description = "used as docker image for ecs"

}
variable "psql_image" {
  description = "used as docker image for ecs"

}
variable "secret_manager_arn" {
  description = "used to fetch secret env at ecs task"
}

variable "route_table_id_private_subnet_1a" {
  description = "used for vpc endpoint at s3"
  type        = string
}