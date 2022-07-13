resource "aws_acm_certificate" "kurakichi" {
  domain_name       = aws_route53_record.kurakichi_top_level_domain.name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "kurakichi_certificate" {
  for_each = {
    for dvo in aws_acm_certificate.kurakichi.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  zone_id         = data.aws_route53_zone.kurakichi.id
  ttl             = 60
}

resource "aws_acm_certificate_validation" "kurakichi" {
  certificate_arn         = aws_acm_certificate.kurakichi.arn
  validation_record_fqdns = [for record in aws_route53_record.kurakichi_certificate : record.fqdn]
}