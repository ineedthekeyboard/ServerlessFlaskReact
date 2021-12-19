resource "aws_cognito_user_pool" "user_pool" {
  name                     = "${var.project_name}-pool"
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  username_configuration {
    case_sensitive = false
  }

  admin_create_user_config {
    invite_message_template {
      email_subject = "Your super secret temporary password"
      email_message = "{username} your temp password is {####}"
      sms_message   = "{username} your temp password is {####}"
    }
  }
  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_message        = "Verification code: {####}"
    email_subject        = "Cognito verification code"
  }
  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_uppercase                = true
    require_numbers                  = true
    require_symbols                  = true
    temporary_password_validity_days = 7
  }
  device_configuration {
    device_only_remembered_on_user_prompt = true
    challenge_required_on_new_device      = true
  }
}

resource "aws_cognito_identity_pool" "main" {
  identity_pool_name               = "${var.project_name}-identity-pool"
  allow_unauthenticated_identities = false
  allow_classic_flow               = false

  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.web_client.id
    provider_name           = aws_cognito_user_pool.user_pool.endpoint
    server_side_token_check = true
  }
  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.native_client.id
    provider_name           = aws_cognito_user_pool.user_pool.endpoint
    server_side_token_check = true
  }
#  supported_login_providers = {
#    "graph.facebook.com"  = "7346241598935552"
#    "accounts.google.com" = "123456789012.apps.googleusercontent.com"
#  }

#  saml_provider_arns           = [aws_iam_saml_provider.default.arn]
#  openid_connect_provider_arns = ["arn:aws:iam::123456789012:oidc-provider/id.example.com"]
}

resource "aws_cognito_user_pool_client" "web_client" {
  name                                 = "${var.project_name}-web-client"
  user_pool_id                         = aws_cognito_user_pool.user_pool.id
  generate_secret                      = false
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  allowed_oauth_scopes                 = ["email", "openid"]
  prevent_user_existence_errors        = "ENABLED"
  supported_identity_providers         = ["COGNITO"]
  # TODO: What if prod is on a custom domain?
  callback_urls = [join("", [var.url, "/loggedin"])]
  logout_urls   = [var.url]
}

resource "aws_cognito_user_pool_client" "native_client" {
  name                                 = "${var.project_name}-native-client"
  user_pool_id                         = aws_cognito_user_pool.user_pool.id
  generate_secret                      = true
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code", "implicit"]
  explicit_auth_flows                  = ["ADMIN_NO_SRP_AUTH"]
  allowed_oauth_scopes                 = ["email", "openid"]
  prevent_user_existence_errors        = "ENABLED"
  supported_identity_providers         = ["COGNITO"]
  # TODO: What if prod is on a custom domain?
  callback_urls                        = [join("", [var.url, "/loggedin"])]
  logout_urls                          = [var.url]
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = var.project_name
  user_pool_id = aws_cognito_user_pool.user_pool.id

}

resource "aws_cognito_identity_pool_roles_attachment" "idp_roles_attachment" {
  identity_pool_id = aws_cognito_identity_pool.main.id

  roles = {
    authenticated   = aws_iam_role.auth_iam_role.arn
    unauthenticated = aws_iam_role.unauth_iam_role.arn
  }
}

resource "aws_iam_role" "auth_iam_role" {
  name               = "auth_iam_role"
  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
         {
              "Action": "sts:AssumeRole",
              "Principal": {
                   "Federated": "cognito-identity.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
         },
          {
              "Sid": "",
              "Effect": "Allow",
              "Principal": {
                "Federated": "cognito-identity.amazonaws.com"
              },
              "Action": "sts:AssumeRoleWithWebIdentity"
          }
    ]
}
EOF
}

resource "aws_iam_role" "unauth_iam_role" {
  name               = "unauth_iam_role"
  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
         {
              "Action": "sts:AssumeRole",
              "Principal": {
                   "Federated": "cognito-identity.amazonaws.com"
              },
              "Effect": "Allow",
              "Sid": ""
         }
    ]
}
EOF
}

resource "aws_iam_role_policy" "web_iam_unauth_role_policy" {
  name   = "web_iam_unauth_role_policy"
  role   = aws_iam_role.unauth_iam_role.id
  policy = <<EOF
{
"Version": "2012-10-17",
"Statement": [
    {
        "Sid": "",
        "Action": "*",
        "Effect": "Deny",
        "Resource": "*"
    }
  ]
}
EOF
}
resource "aws_iam_role_policy" "api_iam_auth_all_policy" {
  name   = "api_iam_auth_all_policy"
  role   = aws_iam_role.auth_iam_role.id
  policy = <<EOF
{
"Version": "2012-10-17",
"Statement": [
    {
        "Sid": "",
        "Action": "execute-api:Invoke",
        "Effect": "Allow",
        "Resource": "*"
    }
  ]
}
EOF
}
