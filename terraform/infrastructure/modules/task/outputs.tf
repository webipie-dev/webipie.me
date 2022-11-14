output "task_definition_arn" {
  value = aws_ecs_task_definition.this.arn
}

output "repository_url" {
  value = aws_ecr_repository.this.repository_url
}

output "container_name" {
  value = var.container_name
}

output "task_role_arn" {
  value = aws_iam_role.this.arn
}
