output "vpc" {
  value = aws_vpc.kurakichi
}

output "private_subnet_1a" {
  value = aws_subnet.private_1a
}
output "private_subnet_1c" {
  value = aws_subnet.private_1c
}



output "lb_target_group" {
  value = aws_lb_target_group.kurakichi
}

output "alb_dns" {
  value = aws_lb.kurakichi.dns_name
}

output "domain_name" {
  value = aws_route53_record.kurakichi_top_level_domain.name
}
