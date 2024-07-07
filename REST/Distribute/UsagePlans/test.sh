restapi_id=$(
    aws cloudformation describe-stacks \
        --stack-name APIGateway-Usage-Plan \
        --query "Stacks[0].Outputs[?OutputKey=='APIGatewayRestApiId'].OutputValue" \
        --output text
)

AWS_REGION=$(aws configure get region)
endpoint=https://${restapi_id}.execute-api.${AWS_REGION}.amazonaws.com

curl -w '\n\n' \
    -v \
    $endpoint/test/lambda_handler
# 403 {"message":"Forbidden"}

API_KEY=''
curl -w '\n' \
    -v \
    -H "x-api-key: ${API_KEY}" \
    $endpoint/test/lambda_handler
# 200 {"message": "OK"}
