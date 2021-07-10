output "vpc_id" {
  value = data.aws_vpc.default_vpc.id
}

output "subnet1_id" {
  value = data.aws_subnet.subnet1.id
}

output "subnet2_id" {
  value = data.aws_subnet.subnet2.id
}

output "sg_id" {
  value = aws_security_group.sg.id
}

output "alb_sg_id" {
  value = aws_security_group.alb_sg.id
}

output "zone_id" {
  value = data.aws_route53_zone.this.zone_id
}
