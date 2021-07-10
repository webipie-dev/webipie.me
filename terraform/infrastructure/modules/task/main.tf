locals {
  tags = {
    project_name = var.project_name
    stage = var.stage
  }
}

data "aws_iam_policy_document" "this" {
  version = "2012-10-17"
  statement {
    sid     = ""
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "this" {
  name               = "${var.ecs_task_execution_role_name}_${var.stage}"
  assume_role_policy = data.aws_iam_policy_document.this.json

  tags = local.tags

}

resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecr_repository" "this" {
  name                 = "${var.registry_name}_${var.stage}"
  image_tag_mutability = "MUTABLE"

  tags = local.tags

}

data "template_file" "container_definitions" {
  template = file("./templates/ecs/container_definitions.json.tpl")

  vars = {
    app_image      = "${aws_ecr_repository.this.repository_url}:${var.app_image}"
    app_port       = var.app_port
    cpu    = var.cpu
    memory = var.memory
    aws_region     = var.aws_region
    container_name = var.container_name
    project_name = var.project_name
    stage = var.stage
  }
}

resource "aws_ecs_task_definition" "this" {
  family                   = var.project_name
  execution_role_arn       = aws_iam_role.this.arn
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  cpu                      = var.cpu
  memory                   = var.memory
  container_definitions    = data.template_file.container_definitions.rendered
  task_role_arn            = aws_iam_role.this.arn
  tags                     = local.tags

}

resource "aws_cloudwatch_log_group" "this" {
  name              = "/ecs/${var.project_name}/${var.stage}"
  retention_in_days = 30
  tags              = local.tags

}
