/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_cognito_identity_pool_id": "us-west-2:e5901e39-06dc-42ba-b418-7ee6bb58623f",
    "aws_cognito_region": "us-west-2",
    "aws_user_pools_id": "us-west-2_xXvqUfIcX",
    "aws_user_pools_web_client_id": "3dhjbv1ts48lqj9ej4d66burse",
    "oauth": {
        "domain": "amplifyflask.auth.us-west-2.amazoncognito.com",
        "scope": [
            "email",
            "openid"
        ],
        "redirectSignIn": "localhost:3000/loggedin",
        "redirectSignOut": "localhost:3000",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": [
            "REQUIRES_LOWERCASE",
            "REQUIRES_UPPERCASE",
            "REQUIRES_NUMBERS",
            "REQUIRES_SYMBOLS"
        ]
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_cloud_logic_custom": [
        {
            "name": "uiAPI",
            "endpoint": "https://3myg2932d6.execute-api.us-west-2.amazonaws.com/staging",
            "region": "us-west-2"
        }
    ]
};


export default awsmobile;
