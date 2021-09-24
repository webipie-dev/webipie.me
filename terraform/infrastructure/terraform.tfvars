env = {
  default = {

    ecs = {
      app_count                            = 1
      instance_type = "t2.small"
      ssh_pubkey_file = "id_rsa.pub"
      autoscaling_policy_name              = "ecs_autoscaling"
      autoscaling_request_per_target_value = "250"
      health_check_path                    = "/health_check/"
      healthy_threshold                    = "5"
      unhealthy_threshold                  = "2"
      health_check_interval                = "20"
      health_check_timeout                 = "5"
      min_capacity                         = 1
      max_capacity                         = 3

    }

    network = {
      route53_zone = "devwebipie.me"
    }

    task = {
      ecs_task_execution_role_name = "webipiemeEcsTaskExecutionRole"
      registry_name                = "webipiemeecr"
      app_image                    = "latest"
      cpu                  = "256"
      memory               = "256"
    }

    certificate_route53 = {
      certificate_domain = "api.devwebipie.me"
    }

    website = {
      bucket_name = "devwebipie.me"
      domain_name = "devwebipie.me"
    }

    app_port       = 8000
    aws_region     = "eu-west-1"
    project_name   = "devwebipieme"
    aws_uploads_s3_bucket = "devwebipie.me-uploads"
    stage = "dev"

  }

  prod = {

    ecs = {
      app_count                            = 1
      instance_type = "t2.small"
      ssh_pubkey_file = "id_rsa.pub"
      autoscaling_policy_name              = "ecs_autoscaling"
      autoscaling_request_per_target_value = "250"
      health_check_path                    = "/health_check/"
      healthy_threshold                    = "5"
      unhealthy_threshold                  = "2"
      health_check_interval                = "300"
      health_check_timeout                 = "5"
      min_capacity                         = 1
      max_capacity                         = 3

    }

    network = {
      route53_zone = "webipie.me"
    }

    task = {
      ecs_task_execution_role_name = "webipiemeEcsTaskExecutionRole"
      registry_name                = "webipiemeecr"
      app_image                    = "latest"
      cpu                  = "256"
      memory               = "256"
    }

    certificate_route53 = {
      certificate_domain = "api.webipie.me"
    }

    website = {
      bucket_name = "webipie.me"
      domain_name = "webipie.me"
    }

    app_port       = 8000
    aws_region     = "eu-central-1"
    project_name   = "webipieme"
    aws_uploads_s3_bucket = "webipie.me-uploads"
    stage = "prod"

  }
}
