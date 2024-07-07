restapi_id=$(
    aws cloudformation describe-stacks \
        --stack-name APIGateway-with-IAMAuth \
        --query "Stacks[0].Outputs[?OutputKey=='APIGatewayRestApiId'].OutputValue" \
        --output text
)

AWS_REGION=$(aws configure get region)
endpoint=https://${restapi_id}.execute-api.${AWS_REGION}.amazonaws.com

AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)

curl -w '\n\n' \
    -v \
    -XPOST \
    $endpoint/test/lambda_handler
# 403 {"message":"Missing Authentication Token"}

curl -w '\n\n' \
    -v \
    -XPOST \
    --aws-sigv4 "aws:amz:${AWS_REGION}:execute-api" \
    --user AccessKey:SecretKey \
    $endpoint/test/lambda_handler
# 403 {"message":"The security token included in the request is invalid."}

curl -w '\n' \
    -v \
    -XPOST \
    --aws-sigv4 "aws:amz:${AWS_REGION}:execute-api" \
    --user $(aws configure get aws_access_key_id):$(aws configure get aws_secret_access_key) \
    $endpoint/test/lambda_handler
# 200 {"message": "OK"}
