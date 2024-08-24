#!/usr/bin/env bash
S3_BUCKET="your-bucket-name"
STACK_NAME="Private-APIGateway-to-LambdaProxy"

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
  ProjectPrefix="" \
  APIGatewayStageName=test \
  VpcId="" \
  PrivateSubnetA="" \
  PrivateSubnetC="" \
  --capabilities CAPABILITY_NAMED_IAM

OUTPUTS=$(aws cloudformation describe-stacks --stack-name ${STACK_NAME} | jq -rc .Stacks[0])

APIGATEWAY_ID=""
VPCENDPOINT_ID=""
for o in $(echo $OUTPUTS | jq -c '.Outputs[]'); do
  output_key=$(echo $o | jq -r .OutputKey)
  output_value=$(echo $o | jq -r .OutputValue)
  if [ ${output_key} = 'APIGatewayApiId' ]; then
    APIGATEWAY_ID=${output_value}
  elif [ ${output_key} = 'VPCEndpointId' ]; then
    VPCENDPOINT_ID=${output_value}
  fi
done

REGION=$(aws configure get region --output text)
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
POLICY=$(
  cat <<EOS
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:${REGION}:${ACCOUNT_ID}:${APIGATEWAY_ID}/*",
      "Condition": {
        "StringEquals": {
            "aws:sourceVpce": "${VPCENDPOINT_ID}"
        }
      }
    }
  ]
}
EOS
)

aws apigateway update-rest-api \
  --rest-api-id ${APIGATEWAY_ID} \
  --patch-operations op=replace,path=/policy,value=$(echo ${POLICY} | jq '@json')
