resource "aws_s3_bucket" "serverless_deploy_bucket" {
  bucket = var.serverless_deploy_bucket
  region = var.aws_region
  acl = "private"
}
