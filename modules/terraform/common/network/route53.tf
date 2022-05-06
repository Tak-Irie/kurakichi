data "aws_route53_zone" "kurakichi" {
  name = var.domain_address
}
