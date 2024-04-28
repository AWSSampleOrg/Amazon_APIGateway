# How to set up resources

1. cd SAM/CloudFormation
2. change S3_BUCKET to yours
3. ./deploy.sh

# How to check client implementations

1. pnpm install
2. pnpm build
3. create `.env` file to set environmental values

```conf
ENDPOINT=https://<REST_API_ID>.execute-api.<AWS_REGION>.amazonaws.com/test/lambda_handler
USER_POOL_ID=<USER_POOL_ID>
APP_CLIENT_ID=<APP_CLIENT_ID>
```

4. ./dev.sh up <Your email address> to sign up
5. ./dev.sh con <Confirmation code you received on above email> to confirm sign up
6. ./dev.sh in
