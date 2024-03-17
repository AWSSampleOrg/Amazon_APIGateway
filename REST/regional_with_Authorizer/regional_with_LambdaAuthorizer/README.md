- without authorization header

```sh
~ $ curl -v -w '\n' -XPOST https://xmufmbqdza.execute-api.us-east-1.amazonaws.com/test/lambda_handler
.
.
.
< HTTP/2 401
< content-type: application/json
< content-length: 26
.
.
.
{"message":"Unauthorized"}
```

- Wrong token

```sh
~ $ curl -v -w '\n' -XPOST https://xmufmbqdza.execute-api.us-east-1.amazonaws.com/test/lambda_handler -H 'Authorization: 2'
.
.
.
< HTTP/2 403
< content-type: application/json
< content-length: 82
.
.
.
{"Message":"User is not authorized to access this resource with an explicit deny"}
```

- Correct token

```sh
~ $ curl -v -w '\n' -XPOST https://xmufmbqdza.execute-api.us-east-1.amazonaws.com/test/lambda_handler -H 'Authorization: 1'
.
.
.
< HTTP/2 200
< content-type: application/json
< content-length: 17
.
.
.
{"message": "OK"}
```
