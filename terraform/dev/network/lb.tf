
variable "s3_log" {}
resource "aws_lb" "kurakichi" {
  name               = "kurakichi-NLB"
  load_balancer_type = "network"
  internal           = false
  subnets = [
    aws_subnet.public_1a.id,
  ]
  tags = {
    ENV = "dev"
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.kurakichi.arn
  port              = 443
  protocol          = "TLS"
  certificate_arn   = aws_acm_certificate.kurakichi.arn
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.kurakichi.arn
  }
}

resource "aws_lb_target_group" "kurakichi" {
  name                 = "kurakichi"
  target_type          = "ip"
  vpc_id               = aws_vpc.kurakichi.id
  port                 = 80
  protocol             = "TCP"
  deregistration_delay = 300
  depends_on           = [aws_lb.kurakichi]
}

