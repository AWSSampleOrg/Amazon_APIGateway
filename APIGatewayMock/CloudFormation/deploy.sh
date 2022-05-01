#!/usr/bin/env bash
STACK_NAME="APIGatewayMock"

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}


aws cloudformation deploy \
    --template-file template.yml \
    --stack-name ${STACK_NAME} \
    --parameter-overrides \
        APIGatewayStageName=test \
   --capabilities CAPABILITY_NAMED_IAM
