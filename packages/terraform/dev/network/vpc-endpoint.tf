data "aws_region" "current" {}

resource "aws_security_group" "endpoint_security_group" {
  name   = "endpoint_security_group"
  vpc_id = var.vpc_id

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["172.16.40.0/24"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "endpoint_security_group"
  }
}

resource "aws_vpc_endpoint" "s3" {
  vpc_id            = var.vpc_id
  service_name      = "com.amazonaws.${data.aws_region.current.name}.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [var.route_table_id_private_subnet_1a]
  tags = {
    Name = "s3"
  }
}

resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.${data.aws_region.current.name}.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [var.private_subnet_1a_id]
  security_group_ids  = [aws_security_group.endpoint_security_group.id]
  private_dns_enabled = true
  tags = {
    Name = "ecr-dkr"
  }
}

resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.${data.aws_region.current.name}.ecr.api"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [var.private_subnet_1a_id]
  security_group_ids  = [aws_security_group.endpoint_security_group.id]
  private_dns_enabled = true
  tags = {
    Name = "ecr-api"
  }
}

resource "aws_vpc_endpoint" "logs" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.${data.aws_region.current.name}.logs"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [var.private_subnet_1a_id]
  security_group_ids  = [aws_security_group.endpoint_security_group.id]
  private_dns_enabled = true
  tags = {
    Name = "logs"
  }
}

resource "aws_vpc_endpoint" "ssm_messages" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.${data.aws_region.current.name}.ssmmessages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [var.private_subnet_1a_id]
  security_group_ids  = [aws_security_group.endpoint_security_group.id]
  private_dns_enabled = true
  tags = {
    Name = "ssm-massages"
  }
}

resource "aws_vpc_endpoint" "secretsmanager" {
  service_name        = "com.amazonaws.${data.aws_region.current.name}.secretsmanager"
  vpc_id              = var.vpc_id
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [var.private_subnet_1a_id]
  security_group_ids  = [aws_security_group.endpoint_security_group.id]
  private_dns_enabled = true
  policy = jsonencode(
    {
      Statement = [
        {
          Action    = "*"
          Effect    = "Allow"
          Principal = "*"
          Resource  = "*"
        },
      ]
    }
  )
  tags = {
    Name = "secrets-manager"
  }
}
