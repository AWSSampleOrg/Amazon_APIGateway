restapi_id=$(
    aws cloudformation describe-stacks \
        --stack-name APIGateway-with-LambdaAuthorizer \
        --query "Stacks[0].Outputs[?OutputKey=='APIGatewayRestApiId'].OutputValue" \
        --output text
)

AWS_REGION=$(aws configure get region)
endpoint=https://${restapi_id}.execute-api.${AWS_REGION}.amazonaws.com

curl -w '\n\n' -v -XPOST $endpoint/test/lambda_handler
# 401 {"message":"Unauthorized"}
curl -w '\n\n' -v -XPOST -H 'Authorization: 2' $endpoint/test/lambda_handler
# 403 {"Message":"User is not authorized to access this resource with an explicit deny"}
curl -w '\n' -v -XPOST -H 'Authorization: 1' $endpoint/test/lambda_handler
# 200 {"message": "OK"}
