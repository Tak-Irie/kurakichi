output "ecs_policy" {
  value = data.aws_iam_policy_document.ecs_task_execution.json
}