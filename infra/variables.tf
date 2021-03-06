variable "aws_region" {
  type = string
}

variable "environment" {
  type = string
}

variable "tfstate_bucket" {
  type = string
}

variable "tfstate_bucket_region" {
  type = string
}

variable "serverless_deploy_bucket" {
  type = string
}

variable "project_name" {
  type = string
}

variable "stage_name" {
  type = string
}

variable "aws_profile_cred_name" {
  type = string
}

variable "aws_creds_file_path" {
  type = string
}
