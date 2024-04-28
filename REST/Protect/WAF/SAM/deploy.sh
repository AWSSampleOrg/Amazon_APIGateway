#!/usr/bin/env bash
S3_BUCKET="your-bucket-name"
STACK_NAME="APIGateway-to-LambdaProxy-With-WAFv2WebACL"
API_GATEWAY_STAGE=test

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

aws cloudformation package \
    --template-file template.yml \
    --s3-bucket ${S3_BUCKET} \
    --output-template-file packaged_template.yml

aws cloudformation deploy \
    --template-file packaged_template.yml \
    --stack-name ${STACK_NAME} \
    --parameter-overrides \
    APIGatewayStageName=${API_GATEWAY_STAGE} \
    --capabilities CAPABILITY_NAMED_IAM

if [[ $? -eq 0 ]]; then
    restapi_id=$(
        aws cloudformation describe-stacks \
            --stack-name $STACK_NAME \
            --query "Stacks[0].Outputs[?OutputKey=='APIGatewayRestApiId'].OutputValue" \
            --output text
    )
    waf_v2_web_acl_arn=$(
        aws cloudformation describe-stacks \
            --stack-name $STACK_NAME \
            --query "Stacks[0].Outputs[?OutputKey=='WAFv2WebACLArn'].OutputValue" \
            --output text
    )

    AWS_REGION=$(aws configure get region)
    aws wafv2 associate-web-acl \
        --web-acl-arn $waf_v2_web_acl_arn \
        --resource-arn arn:aws:apigateway:${AWS_REGION}::/restapis/${restapi_id}/stages/${API_GATEWAY_STAGE}
fi
