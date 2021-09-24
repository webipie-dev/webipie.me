locals {
  vars  = var.env[terraform.workspace]
  amis = var.amis
}

data "aws_caller_identity" "current" {}

module "network" {
  source       = "./modules/network"
  aws_region   = local.vars.aws_region
  app_port     = local.vars.app_port
  route53_zone = local.vars.network.route53_zone
  project_name = local.vars.project_name
  stage        = local.vars.stage

}

module "task" {
  source                       = "./modules/task"
  aws_region                   = local.vars.aws_region
  app_port                     = local.vars.app_port
  ecs_task_execution_role_name = local.vars.task.ecs_task_execution_role_name
  registry_name                = local.vars.task.registry_name
  app_image                    = local.vars.task.app_image
  cpu                  = local.vars.task.cpu
  memory               = local.vars.task.memory
  container_name               = local.vars.project_name
  project_name                 = local.vars.project_name
  stage                        = local.vars.stage

}


module "ecs" {
  source                               = "./modules/ecs"
  aws_region                           = local.vars.aws_region
  ami_id = lookup(local.amis, local.vars.aws_region)
  instance_type = local.vars.ecs.instance_type
  ssh_pubkey_file = local.vars.ecs.ssh_pubkey_file
  app_count                            = local.vars.ecs.app_count
  app_port                             = local.vars.app_port
  autoscaling_policy_name              = local.vars.ecs.autoscaling_policy_name
  autoscaling_request_per_target_value = local.vars.ecs.autoscaling_request_per_target_value
  health_check_path                    = local.vars.ecs.health_check_path
  task_definition_arn                  = module.task.task_definition_arn
  acm_certificate_arn                  = module.certificate_route53.acm_certificate_arn
  subnet1_id                           = module.network.subnet1_id
  subnet2_id                           = module.network.subnet2_id
  alb_sg_id                            = module.network.alb_sg_id
  sg_id                                = module.network.sg_id
  vpc_id                               = module.network.vpc_id
  healthy_threshold                    = local.vars.ecs.healthy_threshold
  unhealthy_threshold                  = local.vars.ecs.unhealthy_threshold
  health_check_timeout                 = local.vars.ecs.health_check_timeout
  health_check_interval                = local.vars.ecs.health_check_interval
  ecs_max_capacity                     = local.vars.ecs.max_capacity
  ecs_min_capacity                     = local.vars.ecs.min_capacity
  project_name                         = local.vars.project_name
  stage                                = local.vars.stage

}


module "certificate_route53" {
  source             = "./modules/certificate_route53"
  aws_region         = local.vars.aws_region
  certificate_domain = local.vars.certificate_route53.certificate_domain
  alb_endpoint       = module.ecs.alb_endpoint
  alb_zone_id        = module.ecs.alb_zone_id
  zone_id            = module.network.zone_id
  project_name       = local.vars.project_name
  stage              = local.vars.stage

}

module "website" {
  source              = "./modules/website"
  aws_region          = local.vars.aws_region
  website_bucket_name = local.vars.website.bucket_name
  website_domain_name = local.vars.website.domain_name
  zone_id             = module.network.zone_id
  project_name        = local.vars.project_name
  stage               = local.vars.stage
}

data "template_file" "index" {
  template = file("./templates/backend/index.js.tpl")

  vars = {
    aws_uploads_s3_bucket = local.vars.aws_uploads_s3_bucket
    aws_access_key = var.aws_access_key
    aws_secret_key = var.aws_secret_key
    aws_region = local.vars.aws_region
    twilio_account_sid = var.twilio_account_sid
    twilio_auth_token = var.twilio_auth_token
    mongo_db_url = var.mongo_db_url
    hosted_zone_id = module.network.zone_id
    cloudfront_domain_name = module.website.cloudfront_domain_name
    backend_hostname = local.vars.certificate_route53.certificate_domain
    backend_port = local.vars.app_port
    website_domain_name = local.vars.website.domain_name
    mailgun_api_key = var.mailgun_api_key
    mailgun_domain_name = var.mailgun_domain_name
  }
}

resource "null_resource" "index" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = "echo \"${data.template_file.index.rendered}\" > ../../backend/configuration/index.js"
  }
}

data "template_file" "set_config_to_github" {
  template = file("./templates/github/set_config_to_github.bash.tpl")

  vars = {
    cloudfront_distribution_id    = module.website.cloudfront_distribution_id
  }
}

resource "null_resource" "set_config_to_github" {

  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command     = "echo '${data.template_file.set_config_to_github.rendered}' > set_config_to_github.bash"
    interpreter = ["/bin/bash", "-c"]
  }
}

data "template_file" "task_definition" {
  template = file("./templates/task-definition/task-definition.json.tpl")

  vars = {
    aws_region     = local.vars.aws_region
    app_port       = local.vars.app_port
    repository_url = module.task.repository_url
    app_image      = local.vars.task.app_image
    cpu    = local.vars.task.cpu
    memory = local.vars.task.memory
    ecs_execution_role_arn = module.task.task_role_arn
    task_definition_arn = module.task.task_definition_arn
    task_role_arn = module.task.task_role_arn
    project_name   = local.vars.project_name
    stage = local.vars.stage

  }
}

resource "null_resource" "task_definition" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = "echo '${data.template_file.task_definition.rendered}' > ../../backend/task-definition.json"
  }
}
