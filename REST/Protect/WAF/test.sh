restapi_id=$(
    aws cloudformation describe-stacks \
        --stack-name APIGateway-to-LambdaProxy-With-WAFv2WebACL \
        --query "Stacks[0].Outputs[?OutputKey=='APIGatewayRestApiId'].OutputValue" \
        --output text
)

AWS_REGION=$(aws configure get region)
endpoint=https://${restapi_id}.execute-api.${AWS_REGION}.amazonaws.com

curl -w '\n' \
    -v \
    $endpoint/test/lambda_handler
# 200 {"message": "OK"}
