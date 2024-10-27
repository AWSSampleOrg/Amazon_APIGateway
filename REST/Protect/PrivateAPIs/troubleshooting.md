# Invoke public APIs with VPC endpoint for API Gateway

- If private DNS is enabled.
  https://repost.aws/knowledge-center/api-gateway-vpc-connections
  The reason why you can't invoke is that all requests from the VPC to API Gateway APIs resolve to that interface VPC endpoint ip address.

  - invoke private APIs
    don't need to set up special things
  - invoke public APIs
    - set up `edge-optimized custom domain` names or `regional custom domain` names to connect to your public APIs.
    - Create Route 53 alias record for Public API (Edge Optimized) or Public API (Regional)

- if private DNS is not enabled.
  - invoke public APIs
    don't need to set up special things
  - invoke private APIs
    - Use Route 53 Private Hosted Zone
      don't need to set up special things
    - Don't use Route 53 Private Hosted Zone
      Specify `Host` or `x-apigw-api-id` headers
