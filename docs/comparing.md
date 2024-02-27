[Choosing between REST APIs and HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)

# endpoint types

|          | REST | HTTP | WebSocket |
| -------- | ---- | ---- | --------- |
| edge     | y    |      |           |
| regional | y    | y    | y         |
| private  | y    |      |           |

# Security

|                                         | REST | HTTP |
| --------------------------------------- | ---- | ---- |
| Mutual TLS authentication               | y    | y    |
| Certificates for backend authentication | y    |      |
| AWS WAF                                 | y    |      |

# Authorization

|                                  | REST | HTTP    |
| -------------------------------- | ---- | ------- |
| IAM                              | y    | y       |
| Resource policies                | y    |         |
| Cognito                          | y    | y **1** |
| Custom authorization with Lambda | y    | y       |
| JWT **2**                        |      | y       |

1. You can use Amazon Cognito with a JWT authorizer.
2. You can use a Lambda authorizer to validate JWTs for REST APIs.

# API management

|                                | REST | HTTP |
| ------------------------------ | ---- | ---- |
| Custom domains                 | y    | y    |
| API keys                       | y    |      |
| Per-client rate limiting       | y    |      |
| Per-client resource throttling | y    |      |

# Development

|                                  | REST | HTTP |
| -------------------------------- | ---- | ---- |
| CORS configuration               | y    | y    |
| Test invocations                 | y    |      |
| Caching                          | y    |      |
| User-controlled deployments      | y    | y    |
| Automatic deployments            |      | y    |
| Custom gateway responses         | y    |      |
| Canary release deployments       | y    |      |
| Request validation               | y    |      |
| Request parameter transformation | y    | y    |
| Request body transformation      | y    |      |

# Monitoring

|                                     | REST | HTTP |
| ----------------------------------- | ---- | ---- |
| CloudWatch metrics                  | y    | y    |
| Access logs to CloudWatch Logs      | y    | y    |
| Access logs to Amazon Data Firehose | y    |      |
| Execution logs                      | y    |      |
| AWS X-Ray tracing                   | y    |      |

# Integrations

|                                    | REST | HTTP |
| ---------------------------------- | ---- | ---- |
| public HTTP endpoints              | y    | y    |
| AWS services                       | y    | y    |
| Lambda                             | y    | y    |
| Private integrations with NLB      | y    | y    |
| Private integrations with ALB      |      | y    |
| Private integrations with CloudMap |      | y    |
| Mock integrations                  | y    |      |
