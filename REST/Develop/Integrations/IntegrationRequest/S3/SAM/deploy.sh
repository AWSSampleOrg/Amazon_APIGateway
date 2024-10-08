#!/usr/bin/env bash

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

. ../config.sh

aws cloudformation package \
    --template-file template.yml \
    --s3-bucket ${S3_BUCKET} \
    --output-template-file packaged_template.yml

aws cloudformation deploy \
    --template-file packaged_template.yml \
    --stack-name ${STACK_NAME} \
    --parameter-overrides \
    APIGatewayStageName=test \
    S3Bucket=${S3_BUCKET} \
    --capabilities CAPABILITY_NAMED_IAM
