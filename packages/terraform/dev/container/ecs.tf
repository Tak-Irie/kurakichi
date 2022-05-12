resource "aws_ecs_cluster" "this" {
  name = var.domain_name
}

resource "aws_ecs_task_definition" "this" {
  family                   = var.domain_name
  cpu                      = "512"
  memory                   = "1024"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions = templatefile("${path.module}/dev-container-definition.json", {
    express_image      = var.express_image
    redis_image        = var.redis_image
    psql_image         = var.psql_image
    secret_manager_arn = var.secret_manager_arn
  })
  execution_role_arn = module.ecs_task_execution_role.iam_role_arn
}

resource "aws_ecs_service" "this" {
  name                              = var.domain_name
  cluster                           = aws_ecs_cluster.this.arn
  task_definition                   = aws_ecs_task_definition.this.arn
  desired_count                     = 1
  launch_type                       = "FARGATE"
  health_check_grace_period_seconds = 60

  network_configuration {
    assign_public_ip = false
    security_groups  = [module.express_sg.security_group_id]

    subnets = [
      var.private_subnet_1a_id,
    ]
  }

  load_balancer {
    target_group_arn = var.lb_target_group.arn
    container_name   = "express"
    container_port   = 80
  }
}

module "express_sg" {
  source            = "../../shared/sg"
  sg_name           = "express-sg"
  vpc_id            = var.vpc_id
  ingress_from_port = 80
  ingress_to_port   = 80
  cidr_blocks       = [var.cidr_block]
}

resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/kurakichi"
  retention_in_days = 180
}

module "ecs_task_execution_role" {
  source     = "../iam"
  name       = "dev-ecs-task-execution"
  identifier = "ecs-tasks.amazonaws.com"
  policy     = data.aws_iam_policy_document.ecs_task_execution.json
}
data "aws_iam_policy" "ecs_task_execution_role_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy_document" "ecs_task_execution" {
  source_policy_documents = [data.aws_iam_policy.ecs_task_execution_role_policy.policy]

  statement {
    effect    = "Allow"
    actions   = ["kms:Decrypt", "secretsmanager:GetSecretValue"]
    resources = ["*"]
  }
  statement {
    sid       = "AccessToSpecificBucketOnly"
    actions   = ["s3:GetObject"]
    effect    = "Allow"
    resources = ["arn:aws:s3:::prod-ap-northeast-1-starport-layer-bucket/*"]
  }
}