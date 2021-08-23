locals {
  tags = {
    project_name = var.project_name
  }
}

resource "aws_dynamodb_table" "table" {
  name         = "terraform-${var.project_name}-db"
  hash_key     = "LockID"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = local.tags
}

resource "aws_s3_bucket" "bucket" {
    bucket = "terraform-${var.project_name}-bucket"
    versioning {
        enabled = true
    }
    object_lock_configuration {
        object_lock_enabled = "Enabled"
    }
    tags = local.tags
}
