output "iam_role_arn" {
  value       = aws_iam_role.kurakichi.arn
  description = "arn of "
}

output "iam_role_name" {
  value       = aws_iam_role.kurakichi.name
  description = "arn-name of "
}
