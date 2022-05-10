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