data "aws_route53_zone" "kurakichi" {
  name = "kurakichi.org"
}

resource "aws_route53_record" "kurakichi_top_level_domain" {
  zone_id = data.aws_route53_zone.kurakichi.zone_id
  name    = data.aws_route53_zone.kurakichi.name
  type    = "A"

  alias {
    name                   = aws_lb.kurakichi.dns_name
    zone_id                = aws_lb.kurakichi.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "kurakichi_nextjs_sub_domain" {
  zone_id = data.aws_route53_zone.kurakichi.zone_id
  name    = "www"
  type    = "CNAME"
  ttl     = "5"
  records = ["cname.vercel-dns.com"]
}
