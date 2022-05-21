
variable "vpc" {}
variable "private_subnet_1a" {}
variable "lb_target_group" {}

resource "aws_ecs_cluster" "kurakichi" {
  name = "kurakichi"
}

resource "aws_ecs_task_definition" "kurakichi" {
  family                   = "kurakichi"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions    = file("${path.module}/ecs-def.json")
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
}

resource "aws_ecs_service" "kurakichi" {
  name                              = "kurakichi"
  launch_type                       = "FARGATE"
  platform_version                  = "1.4.0"
  health_check_grace_period_seconds = 60
  desired_count                     = 1
  cluster                           = aws_ecs_cluster.kurakichi.arn
  task_definition                   = aws_ecs_task_definition.kurakichi.arn

  network_configuration {
    assign_public_ip = false
    security_groups  = [module.backend_sg.security_group_id]

    subnets = [
      var.private_subnet_1a.id,
    ]
  }

  load_balancer {
    target_group_arn = var.lb_target_group.arn
    container_name   = "kurakichi"
    container_port   = 80
  }

  lifecycle {
    ignore_changes = [task_definition]
  }
}

module "backend_sg" {
  source      = "../sg"
  name        = "backend-sg"
  vpc_id      = var.vpc.id
  from_port   = 80
  to_port     = 80
  cidr_blocks = [var.vpc.cidr_block]
}

resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/kurakichi"
  retention_in_days = 180
}

data "aws_iam_policy" "ecs_task_execution_role_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "ecs_task_execution" {
  source_json = data.aws_iam_policy.ecs_task_execution_role_policy.policy

  statement {
    effect    = "Allow"
    actions   = ["secretsmanager:GetSecretValue", "kms:Decrypt"]
    resources = ["*"]
  }
}

module "ecs_task_execution_role" {
  source     = "../iam"
  name       = "ecs-task-execution"
  identifier = "ecs-tasks.amazonaws.com"
  policy     = data.aws_iam_policy_document.ecs_task_execution.json
}
