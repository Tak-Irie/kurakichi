output "iam_role_arn" {
  value       = aws_iam_role.dev_kurakichi.arn
  description = "arn of "
}

output "iam_role_name" {
  value       = aws_iam_role.dev_kurakichi.name
  description = "arn-name of "
}
