#!/bin/bash
readonly S3_Bucket="your-bucket-name" 2> /dev/null
StackName="WebSocket-to-LambdaProxy"

#package
aws cloudformation package \
    --template-file template.yml \
    --s3-bucket ${S3_Bucket} \
    --output-template-file packaged_template.yml

#deploy
aws cloudformation deploy \
    --template-file packaged_template.yml \
    --stack-name ${StackName} \
    --parameter-overrides \
        APIGatewayStageName=test \
    --capabilities CAPABILITY_NAMED_IAM
