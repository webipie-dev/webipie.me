variable "aws_region" {
  description = "The AWS region things are created in"
}

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
}

variable "route53_zone" {
  description = "Route53 Zone"
}

variable "project_name" {
  description = "Name of the project"
}

variable "stage" {
  description = "Stage name of the project"
}
