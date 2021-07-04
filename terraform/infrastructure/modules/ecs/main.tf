locals {
  tags = {
    project_name = var.project_name
    stage = var.stage
  }
}

resource "aws_ecs_cluster" "this" {
  name = var.project_name
  tags = local.tags

}

resource "aws_iam_role" "this" {
    name = "ecs_host_role_webipie_me"
    assume_role_policy = file("policies/ecs-role.json")
}

resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "this" {
    name = "${var.project_name}-ecs-instance-profile"
    path = "/"
    roles = [aws_iam_role.this.name]
}

resource "aws_autoscaling_group" "this" {
    availability_zones = ["${var.aws_region}a"]
    name = "ECS ${aws_ecs_cluster.this.name}"
    min_size = "1"
    max_size = "1"
    desired_capacity = "1"
    health_check_type = "EC2"
    launch_configuration = aws_launch_configuration.this.name
    vpc_zone_identifier = [var.subnet1_id, var.subnet2_id]
}

resource "aws_key_pair" "this" {
    key_name = "${var.project_name}-key"
    public_key = file(var.ssh_pubkey_file)
}

data "aws_ssm_parameter" "ecs_optimized_ami_recommended" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

resource "aws_launch_configuration" "this" {
    name_prefix = "${var.project_name}-lc" 
    image_id = data.aws_ssm_parameter.ecs_optimized_ami_recommended.value
    instance_type = var.instance_type
    security_groups = [var.sg_id]
    iam_instance_profile = aws_iam_instance_profile.this.name
    key_name = aws_key_pair.this.key_name
    associate_public_ip_address = true
    user_data = "#!/bin/bash\necho ECS_CLUSTER='${aws_ecs_cluster.this.name}' > /etc/ecs/ecs.config"

    lifecycle {
      create_before_destroy = true
    }
}

resource "aws_ecs_service" "this" {
  name            = var.project_name
  cluster         = aws_ecs_cluster.this.id
  task_definition = var.task_definition_arn
  launch_type = "EC2"
  force_new_deployment = true

  desired_count   = var.app_count
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent = 200

  # network_configuration {
  #   security_groups  = [var.sg_id]
  #   subnets          = [var.subnet1_id, var.subnet2_id]
  #   # assign_public_ip = true
  # }

  load_balancer {
    target_group_arn = aws_alb_target_group.this.id
    container_name   = var.project_name
    container_port   = var.app_port
  }

  ordered_placement_strategy {
    field = "memory"
    type  = "binpack"
  }

  depends_on = [aws_alb_listener.this]

}

resource "aws_appautoscaling_target" "this" {
  service_namespace  = "ecs"
  resource_id        = "service/${aws_ecs_cluster.this.name}/${aws_ecs_service.this.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  min_capacity       = var.ecs_min_capacity
  max_capacity       = var.ecs_max_capacity
}

resource "aws_appautoscaling_policy" "this" {
  policy_type        = "TargetTrackingScaling"
  name               = "${var.autoscaling_policy_name}_${var.stage}"
  service_namespace  = "ecs"
  resource_id        = "service/${aws_ecs_cluster.this.name}/${aws_ecs_service.this.name}"
  scalable_dimension = "ecs:service:DesiredCount"

  target_tracking_scaling_policy_configuration {
    target_value       = var.autoscaling_request_per_target_value
    scale_in_cooldown  = 300
    scale_out_cooldown = 300

    predefined_metric_specification {
      predefined_metric_type = "ALBRequestCountPerTarget"
      resource_label         = "${aws_alb.this.arn_suffix}/${aws_alb_target_group.this.arn_suffix}"
    }
  }
}

resource "aws_alb" "this" {
  name            = var.project_name
  subnets         = [var.subnet1_id, var.subnet2_id]
  security_groups = [var.alb_sg_id]
  tags            = local.tags

}

resource "aws_alb_target_group" "this" {
  name        = var.project_name
  port        = var.app_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "instance"

  health_check {
    port                = "traffic-port"
    healthy_threshold   = var.healthy_threshold
    interval            = var.health_check_interval
    protocol            = "HTTP"
    matcher             = "200-304"
    timeout             = var.health_check_timeout
    path                = var.health_check_path
    unhealthy_threshold = var.unhealthy_threshold
  }

  tags = local.tags

}


resource "aws_alb_listener" "this" {
  load_balancer_arn = aws_alb.this.id
  port              = var.app_port
  protocol          = "HTTPS"
  certificate_arn   = var.acm_certificate_arn
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  default_action {
    target_group_arn = aws_alb_target_group.this.id
    type             = "forward"
  }
}
