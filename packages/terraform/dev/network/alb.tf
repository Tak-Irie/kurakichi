data "aws_s3_bucket" "log" {
  bucket = "kurakichi-log"
}

resource "aws_lb" "this" {
  name                       = "kurakichi"
  load_balancer_type         = "application"
  internal                   = false
  idle_timeout               = 60
  enable_deletion_protection = false
  subnets = [
    var.public_subnet_1a_id,
    var.public_subnet_1c_id,
  ]
  access_logs {
    bucket  = data.aws_s3_bucket.log.bucket
    enabled = true
  }
  security_groups = [
    module.http_sg.security_group_id,
    module.https_sg.security_group_id,
  ]
}


module "http_sg" {
  source            = "../../shared/sg"
  sg_name           = "http-sg"
  vpc_id            = var.vpc_id
  ingress_from_port = 80
  ingress_to_port   = 80
  egress_from_port  = 0
  egress_to_port    = 0
  cidr_blocks       = ["0.0.0.0/0"]
}
module "https_sg" {
  source            = "../../shared/sg"
  sg_name           = "https-sg"
  vpc_id            = var.vpc_id
  ingress_from_port = 443
  ingress_to_port   = 443
  egress_from_port  = 0
  egress_to_port    = 0
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.this.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = var.acm_arn
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
}

resource "aws_lb_listener" "redirect_http_to_https" {
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
resource "aws_lb_target_group" "this" {
  name                 = "kurakichi-dev"
  target_type          = "ip"
  vpc_id               = var.vpc_id
  port                 = 4000
  protocol             = "HTTP"
  deregistration_delay = 300
  health_check {
    path                = "/"
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    matcher             = 200
    port                = "traffic-port"
    protocol            = "HTTP"
  }
  depends_on = [aws_lb.this]
}

resource "aws_lb_listener_rule" "this" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 100
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}
