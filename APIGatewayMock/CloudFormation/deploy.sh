#!/bin/bash
StackName="APIGatewayMock"

#deploy
aws cloudformation deploy \
    --template-file template.yml \
    --stack-name ${StackName} \
    --parameter-overrides \
        APIGatewayStageName=test \
   --capabilities CAPABILITY_IAM
