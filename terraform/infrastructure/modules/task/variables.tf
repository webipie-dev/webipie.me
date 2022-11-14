variable "aws_region" {
  description = "The AWS region things are created in"
}

variable "ecs_task_execution_role_name" {
  description = "ECS task execution role name"
}

variable "registry_name" {
  description = "The name of the ECR container registry"
}

variable "app_image" {
  description = "Docker image to run in the ECS cluster"
}

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
}

variable "cpu" {
  description = "Instance CPU units to provision (1 vCPU = 1024 CPU units)"
}

variable "memory" {
  description = "Instance memory to provision (in MiB)"
}

variable "project_name" {
  description = "Name of the project"
}

variable "container_name" {
  description = "Name of the container"
}

variable "stage" {
  description = "Stage name of the project"
}
