resource "aws_security_group" "this" {
  name   = var.sg_name
  vpc_id = var.vpc_id
  tags = {
    Name = var.sg_name
  }
}

resource "aws_security_group_rule" "ingress" {
  type              = "ingress"
  from_port         = var.ingress_from_port
  to_port           = var.ingress_to_port
  protocol          = "tcp"
  cidr_blocks       = var.cidr_blocks
  security_group_id = aws_security_group.this.id
}

resource "aws_security_group_rule" "egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.this.id
}
