#!/usr/bin/env bash
CFN_STACK_NAME="APIGateway-to-SQS"

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-0}) && pwd)
cd ${SOURCE_DIR}

#deploy
aws cloudformation deploy \
    --template-file template.yml \
    --stack-name ${CFN_STACK_NAME} \
    --parameter-overrides \
        APIGatewayStageName=test \
    --capabilities CAPABILITY_NAMED_IAM
