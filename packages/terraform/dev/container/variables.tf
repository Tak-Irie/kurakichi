variable "domain_name" {
  description = "used for namaing ecs-cluster, ecs-family"
}
variable "vpc_id" {
  description = "used for sg on express"
}

variable "cidr_block" {
  description = "used for sg on exoress"
}

variable "lb_target_group" {
  description = "used for ecs service"

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
