data "aws_route53_zone" "this" {
  name = var.domain_address
}

resource "aws_route53_record" "dev" {
  zone_id = data.aws_route53_zone.this.zone_id
  name    = "dev.kurakichi.org"
  type    = "A"
  alias {
    name                   = aws_lb.this.dns_name
    zone_id                = aws_lb.this.zone_id
    evaluate_target_health = true
  }
}