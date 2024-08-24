#!/usr/bin/env bash
STACK_NAME="VPC"

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

aws cloudformation deploy \
    --template-file vpc.yml \
    --stack-name ${STACK_NAME} \
    --capabilities CAPABILITY_NAMED_IAM
