variable "app_count" {
  description = "Number of docker containers to run"
}

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
}

variable "autoscaling_policy_name" {
  description = "Name of the service autoscaling policy"
}

variable "autoscaling_request_per_target_value" {
  description = "The service autoscaling target requests per container"
}

variable "health_check_path" {
  description = "The backend path for health checks"
}

variable "aws_region" {
  description = "The AWS region things are created in"
}

variable "task_definition_arn" {
  description = "ARN of the created task definition"
}

variable "acm_certificate_arn" {
  description = "ARN of backend's SSL certificate"
}

variable "subnet1_id" {
  description = "Id of subnet 1"
}

variable "subnet2_id" {
  description = "Id of subnet 2"
}

variable "alb_sg_id" {
  description = "Id of the ALB's security group"
}

variable "sg_id" {
  description = "Id of the ECS service's security group"
}

variable "vpc_id" {
  description = "Id of the used VPC"
}

variable "project_name" {
  description = "Name of the project"
}

variable "healthy_threshold" {
  description = "Healthy Threshold"
}

variable "unhealthy_threshold" {
  description = "Unhealthy Threshold"
}

variable "health_check_interval" {
  description = "Health check interval"
}

variable "health_check_timeout" {
  description = "Health check timeout"
}

variable "ecs_max_capacity" {
  description = "ECS maximum capacity"
}

variable "ecs_min_capacity" {
  description = "ECS minimum capacity"
}

variable "stage" {
  description = "Stage name of the project"
}

variable "instance_type" {
  description = "Type of the instance to use"
}

variable "ami_id" {
  description = "Instance AMI ID"
}

variable "ssh_pubkey_file" {
  description = "SSH public key file"
}
