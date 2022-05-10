data "aws_region" "current" {}

resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.kurakichi.id
  service_name      = "com.amazonaws.${data.aws_region.current.name}.s3"
  vpc_endpoint_type = "Gateway"
  tags = {
    Name = "s3"
  }
}

resource "aws_vpc_endpoint_route_table_association" "private_s3" {
  vpc_endpoint_id = aws_vpc_endpoint.s3.id
  route_table_id  = aws_route_table.private_1a.id
}


resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id              = aws_vpc.kurakichi.id
  service_name        = "com.amazonaws.${data.aws_region.current.name}.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [aws_subnet.private_1a.id]
  security_group_ids  = [aws_security_group.endpoint_security_group.id]
  private_dns_enabled = true
  tags = {
    Name = "ecr-dkr"
  }
}

resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id              = aws_vpc.kurakichi.id
  service_name        = "com.amazonaws.${data.aws_region.current.name}.ecr.api"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [aws_subnet.private_1a.id]
  security_group_ids  = [aws_security_group.endpoint_security_group.id]
  private_dns_enabled = true
  tags = {
    Name = "ecr-api"
  }
}

resource "aws_vpc_endpoint" "logs" {
  vpc_id              = aws_vpc.kurakichi.id
  service_name        = "com.amazonaws.ap-northeast-1.logs"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [aws_subnet.private_1a.id]
  security_group_ids  = [aws_security_group.endpoint_security_group.id]
  private_dns_enabled = true
  tags = {
    Name = "logs"
  }
}

resource "aws_vpc_endpoint" "secretsmanager" {
  service_name       = "com.amazonaws.${data.aws_region.current.name}.secretsmanager"
  security_group_ids = [aws_security_group.endpoint_security_group.id]
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
  private_dns_enabled = true
  route_table_ids     = []
  subnet_ids          = [aws_subnet.private_1a.id]
  vpc_endpoint_type   = "Interface"
  vpc_id              = aws_vpc.kurakichi.id

  tags = {
    Name = "secrets-manager"
  }
}

resource "aws_security_group" "endpoint_security_group" {
  name   = "endpoint_security_group"
  vpc_id = aws_vpc.kurakichi.id

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    self        = false
  }
  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    self        = false
  }
  tags = {
    Name = "endpoint_security_group"
  }
}


resource "aws_security_group" "lambda" {
  name   = "secret-rotate-lambda"
  vpc_id = aws_vpc.kurakichi.id

  tags = {
    Name = "secret-rotate-lambda"
  }
}

resource "aws_security_group_rule" "lambda_egress" {
  type              = "egress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["10.0.0.0/16"]
  security_group_id = aws_security_group.lambda.id
}

resource "aws_security_group_rule" "lambda_ingress" {
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["10.0.0.0/16"]
  security_group_id = aws_security_group.lambda.id
}