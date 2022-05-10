variable "sg_name" {
  description = "name of security group"
  type = string
}
variable "vpc_id" {
  description = "security group attaches to this vpc"
  type = string
}
variable "ingress_from_port" {
  type = number
}
variable "ingress_to_port" {
  type = number
}
variable "cidr_blocks" {
  description = "these attach to ingress"
  type = list(string)
}