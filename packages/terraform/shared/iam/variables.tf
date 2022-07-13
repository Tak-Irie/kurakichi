variable "name" {
  description = "name of iam role"
  type        = string
}
variable "policy" {
  description = "iam policy"
  type        = string
}
variable "identifier" {
  description = "identifier of principals in policy_document/statement "
}