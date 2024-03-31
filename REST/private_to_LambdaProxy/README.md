1. Deploy CloudFormation Stack

This will deploy AWS resources written in template.yml using cloudformation stack.

```sh
./deploy.sh
```

2. Deploy your own API on the AWS console.

[Deploying a REST API from the API Gateway console](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-deploy-api-with-console.html)

3. Launch EC2 instance in the VPC you created previous section using CloudFormation.

4. Test

```sh
ssh -i ~/.ssh/<Key pair name> ec2-user@<public ip>
curl -w '\n' <API gateway endpoint>
```

**Just around one minute, APIGateway was still able to be connected even though the new resource policy which denies connection was attached.**

## if the resource policy denies or wrong, it will return you below error message.

```
{"Message":"User: anonymous is not authorized to perform: execute-api:Invoke on resource: arn:aws:execute-api:...........................}
```
