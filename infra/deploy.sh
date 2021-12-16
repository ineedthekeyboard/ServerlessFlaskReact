#!/bin/bash

echo "Example usage: deploy.sh -env sandbox -plan <Y/N>"

while test $# -gt 0; do
           case "$1" in
                -env)
                    shift
                    environment=$1
                    shift
                    ;;
                -plan)
                    shift
                    to_plan=$1
                    shift
                    ;;
                *)
                   echo "$1 is not a recognized flag!"
                   return 1;
                   ;;
          esac
  done

  if [ -z "$environment" ]
  then
    echo "Must give an environment that corresponds to the tfvars files available."
    exit 1
  fi

  if [ "$to_plan" = 'Y' ] || [ "$to_plan" = 'y' ]
  then
    echo "doing terraform plan on: $environment environment.. (no lock here, add lock and dynamo eventually)"
    terraform plan -lock=false -input=false -var-file=./environments/env."$environment".tfvars
  else
    echo "Terraform apply not implemented yet."
  fi
