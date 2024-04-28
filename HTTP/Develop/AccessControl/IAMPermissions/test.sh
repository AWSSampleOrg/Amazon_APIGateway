endpoint=$(
    aws cloudformation describe-stacks \
        --stack-name HTTP-APIGateway-with-IAMAuth \
        --query "Stacks[0].Outputs[?OutputKey=='APIGatewayHttpApiEndpoint'].OutputValue" \
        --output text
)

AWS_REGION=$(aws configure get region)
AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)

curl -w '\n\n' \
    -v \
    $endpoint/test/lambda_handler
# 403 {"message":"Forbidden"}

curl -w '\n' \
    -v \
    --aws-sigv4 "aws:amz:${AWS_REGION}:execute-api" \
    --user ${AWS_ACCESS_KEY_ID}:${AWS_SECRET_ACCESS_KEY} \
    $endpoint/test/lambda_handler
# 200 {"message": "OK"}
