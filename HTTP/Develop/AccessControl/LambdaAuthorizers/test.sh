endpoint=$(
    aws cloudformation describe-stacks \
        --stack-name APIGateway-HTTP-API-with-LambdaAuthorizer \
        --query "Stacks[0].Outputs[?OutputKey=='APIGatewayHttpApiEndpoint'].OutputValue" \
        --output text
)

curl -w '\n\n' -v $endpoint/test/lambda_handler
# 401 {"message":"Unauthorized"}
curl -w '\n\n' -v -H 'Auth: 2' $endpoint/test/lambda_handler
# 403 {"message":"Forbidden"}
curl -w '\n\n' -v -H 'Auth: 1' $endpoint/test/lambda_handler
# 200 {"message": "OK"}
curl -w '\n' -v $endpoint/test/dummy
# 404 {"message":"Not Found"}
