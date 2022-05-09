data "aws_route53_zone" "kurakichi" {
  name = var.domain_address
}

resource "aws_route53_record" "kurakichi_next_sub_domain" {
  zone_id = data.aws_route53_zone.kurakichi.zone_id
  name    = "www"
  type    = "CNAME"
  ttl     = "60"
  records = ["cname.vercel-dns.com"]
}