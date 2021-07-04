output "alb_endpoint" {
  value = aws_alb.this.dns_name
}

output "alb_zone_id" {
  value = aws_alb.this.zone_id
}

output "service_name" {
  value = aws_ecs_service.this.name
}

output "cluster_name" {
  value = aws_ecs_cluster.this.name
}

output "aws_arn_suffix" {
  value = aws_alb.this.arn_suffix
}
