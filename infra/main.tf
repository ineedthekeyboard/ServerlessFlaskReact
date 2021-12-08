terraform {
  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}

data "aws_caller_identity" "current" {}

module "cognito" {
  source       = "./cognito"
  url          = module.api_gateway.flask_url
  project_name = var.project_name
}

module "s3_buckets" {
  source       = "./s3_buckets"
  project_name = var.project_name
  aws_region   = var.aws_region
  serverless_deploy_bucket = var.serverless_deploy_bucket
}
