# How to call private API within/outside the VPC

| Call site                                                   | VPC endpoint Private DNS enabled | VPC endpoint Associated with the API | How to call private API |
| ----------------------------------------------------------- | -------------------------------- | ------------------------------------ | ----------------------- |
| Within the same VPC                                         | Enabled                          | Associated                           | 1, 2, 3                 |
| Within the same VPC                                         | Enabled                          | Disassociated                        | 1, 2                    |
| Within the same VPC                                         | Disabled                         | Associated                           | 2, 3                    |
| Within the same VPC                                         | Disabled                         | Disassociated                        | 2                       |
| DX/VPN                                                      | Enabled                          | Associated                           | 2, 3, 4                 |
| DX/VPN                                                      | Enabled                          | Disassociated                        | 2, 4                    |
| DX/VPN                                                      | Disabled                         | Associated                           | 2, 3                    |
| DX/VPN                                                      | Disabled                         | Disassociated                        | 2                       |
| Cross account (make sure to allow those in resource policy) | Enabled                          | Associated                           | 1, 2, 3                 |
| Cross account (make sure to allow those in resource policy) | Enabled                          | Disassociated                        | 1, 2                    |
| Cross account (make sure to allow those in resource policy) | Disabled                         | Associated                           | 2, 3                    |
| Cross account (make sure to allow those in resource policy) | Disabled                         | Disassociated                        | 2                       |

## 1. Invoking your private API using private DNS names

- Develop / Invoke / Invoking your private API using private DNS names
  https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html#w53aac15b9c29c27c11

```sh
{restapi-id}.execute-api.{region}.amazonaws.com
```

## 2. Invoking your private API using endpoint-specific public DNS hostnames

- Develop / Invoke / Invoking your private API using endpoint-specific public DNS hostnames
  https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html#apigateway-private-api-public-dns

Add **`Host`** header

```sh
curl -v https://vpce-def-01234567.execute-api.us-west-2.vpce.amazonaws.com/test/pets -H 'Host: abc1234.execute-api.us-west-2.amazonaws.com'
```

or with **`x-apigw-api-id`**

```sh
curl -v https://{public-dns-hostname}.execute-api.{region}.vpce.amazonaws.com/test -H'x-apigw-api-id:{api-id}'
```

## 3. Accessing your private API using a Route53 alias

- Develop / Invoke / Accessing your private API using a Route53 alias
  https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html#apigateway-private-api-route53-alias
- Protect / Private APIs / Associate or disassociate a VPC endpoint with a private REST API
  https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html#associate-private-api-with-vpc-endpoint

```sh
https://{rest-api-id}-{vpce-id}.execute-api.{region}.amazonaws.com/{stage}
```

## 4. Use Route 53 Inbound endpoint

- Develop / Invoke / Accessing your private API using AWS Direct Connect
  https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html#w53aac15b9c29c27c13
- Route 53 Resolver / Forwarding inbound DNS queries to your VPCs
  https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-inbound-queries.html

# How to call both Private and Public APIs

- When private DNS enabled

  Set up Route 53 outbound resolver.

- When private DNS disabled

  Nothing extras are needed to be done.

# How to set up custom domain to the Private API

Custom domain is not available for private API.

- Protect / Private APIs / Private API development considerations
  https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-apis.html#apigateway-private-api-design-considerations
  //=====
  Custom domain names are not supported for private APIs.
  =====//

Placing ALB/NLB attached custom domain in public subnets in front of VPC endpoint for API Gateway, and set up custom domain with API mapping to the private API Gateway.

- How can I invoke an API Gateway private API using an Application or Network Load balancer?
  https://repost.aws/knowledge-center/invoke-private-api-gateway

# How to call from another AWS account

https://repost.aws/knowledge-center/api-gateway-private-cross-account-vpce
