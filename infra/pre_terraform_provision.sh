#!/bin/bash
#THIS SHOULD ONLY BE RUN TO BOOTSTRAP A NEW TERRAFORM ENV + Backend
echo "Example usage(All params needed): ./pre_terraform_provision.sh -bucket <bucket_name> -region <region> -profile <aws_profile> -env <environment>"
echo "Ignore errors if assets exist in most cases. Robustatude needed later."
while test $# -gt 0; do
           case "$1" in
                -bucket)
                    shift
                    bucket_name=$1
                    shift
                    ;;
                -region)
                    shift
                    aws_region=$1
                    shift
                    ;;
                -profile)
                    shift
                    aws_profile=$1
                    shift
                    ;;
                -env)
                    shift
                    environment=$1
                    shift
                    ;;
                *)
                   echo "$1 is not a recognized flag!"
                   return 1;
                   ;;
          esac
  done
echo "s3://$bucket_name in $aws_region with profile=$aws_profile"
if [ -z "$bucket_name" ] || [ -z "$aws_region" ] || [ -z "$aws_profile" ] || [ -z "$environment" ]
then
  echo "missing an input param"
  exit 1
fi

echo "Making terraform state bucket: s3://$bucket_name in $aws_region with profile=$aws_profile"
aws s3 mb --profile "$aws_profile" --region "$aws_region" s3://"$bucket_name"

echo "Setting up principle role for terraform"
aws iam create-role --profile "$aws_profile" --region "$aws_region" --role-name terraform_bucket_role --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

#echo "Setting up write perm for terraform role"
iam_policy_json='{  "Version": "2012-10-17",  "Statement": [    {      "Effect": "Allow",      "Action": "s3:ListBucket",      "Resource": "arn:aws:s3:::'"$bucket_name"'"    },    {      "Effect": "Allow",      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],      "Resource": "arn:aws:s3:::'"$bucket_name"'"    }  ]}'
echo "$iam_policy_json"
aws iam put-role-policy --profile "$aws_profile" --region "$aws_region" --role-name terraform_bucket_role --policy-name terraform_bucket_write_policy --policy-document "$iam_policy_json"

echo "Setting up terraform now"
terraform init -backend-config=environments/terraform."$environment".backend.tfvars
