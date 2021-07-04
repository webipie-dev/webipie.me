variable "aws_region" {
  description = "The AWS region things are created in"
}

variable "certificate_domain" {
  description = "The domain name of the backend associated with ACM certificate"
}

variable "zone_id" {
  description = "Route53 zone id"
}

variable "alb_endpoint" {
  description = "endpoint of the Load Balancer"
}

variable "alb_zone_id" {
  description = "Zone id of the Load Balancer"
}

variable "project_name" {
  description = "Name of the project"
}

variable "stage" {
  description = "Stage name of the project"
}
