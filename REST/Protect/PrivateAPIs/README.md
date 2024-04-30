# How to call private API within/outside the VPC

| Call site                                         | VPC endpoint Private DNS enabled | How to call private API |
| ------------------------------------------------- | -------------------------------- | ----------------------- |
| Within the same VPC                               | Enabled                          | 1                       |
| Within the same VPC                               | Disabled                         | 2 or 3                  |
| on premise connected to the VPC by Direct Connect | Enabled                          | 4                       |
| on premise connected to the VPC by Direct Connect | Disabled                         | 2 or 3                  |

## Enable private DNS

1. Invoking your private API using private DNS names
   https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html#w53aac15b9c29c27c11

```sh
{restapi-id}.execute-api.{region}.amazonaws.com
```

## Disable private DNS

2. Accessing your private API using a Route53 alias
   https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html#apigateway-private-api-route53-alias

```sh
https://{rest-api-id}-{vpce-id}.execute-api.{region}.amazonaws.com/{stage}
```

3. Invoking your private API using endpoint-specific public DNS hostnames
   https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html#apigateway-private-api-public-dns

Add Host header

```sh
curl -v https://vpce-def-01234567.execute-api.us-west-2.vpce.amazonaws.com/test/pets -H 'Host: abc1234.execute-api.us-west-2.amazonaws.com'
```

or with x-apigw-api-id

```sh
curl -v https://{public-dns-hostname}.execute-api.{region}.vpce.amazonaws.com/test -H'x-apigw-api-id:{api-id}'
```

4. Use Route 53 Inbound endpoint

# How to call both Private and Public APIs

- When private DNS enabled

  Set up Route 53 outbound resolver.

- When private DNS disabled

  Nothing extras are needed to be done.

# How to set up custom domain to the Private API

Custom domain is not available for private API.

- https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html#apigateway-private-api-design-considerations
  //=====
  Custom domain names are not supported for private APIs.
  =====//

Placing ALB/NLB attached custom domain in public subnets in front of VPC endpoint for API Gateway, and set up custom domain with API mapping to the private API Gateway.

- https://repost.aws/knowledge-center/invoke-private-api-gateway
