output "repository_url" {
  value = module.task.repository_url
}

output "alb_endpoint" {
  value = module.ecs.alb_endpoint
}
