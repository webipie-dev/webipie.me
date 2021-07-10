terraform {
  backend "s3" {
    bucket = "terraform-webipieme-bucket"
    key    = "global/s3/terraform.tfstate"
    region = "eu-central-1"

    dynamodb_table = "terraform-webipieme-db"
    encrypt        = true
  }
}
