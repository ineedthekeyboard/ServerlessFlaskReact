terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
  required_version = ">= 0.14.9"
}

terraform {
  backend "s3" {
  }
}

provider "aws" {
  region = var.aws_region
  shared_credentials_file = var.aws_creds_file_path
  profile                 = var.aws_profile_cred_name
}

data "aws_caller_identity" "current" {}

module "cognito" {
  source       = "./cognito"
  url          = var.root_domain
  project_name = var.project_name
}

module "s3_buckets" {
  source       = "./s3_buckets"
  project_name = var.project_name
  aws_region   = var.aws_region
  serverless_deploy_bucket = var.serverless_deploy_bucket
}
