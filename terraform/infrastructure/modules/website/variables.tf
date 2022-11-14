variable "aws_region" {
  description = "The AWS region things are created in"
}

variable "website_bucket_name" {
  description = "The bucket name of the frontend static website"
}

variable "website_domain_name" {
  description = "The domain name of the website"
}

variable "zone_id" {
  description = "Route53 zone id"
}

variable "project_name" {
  description = "Name of the project"
}

variable "stage" {
  description = "Stage name of the project"
}
