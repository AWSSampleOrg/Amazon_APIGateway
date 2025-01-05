# Setting up custom domain names for REST APIs

## 1. Get your domain

## 2. Register your domain to Route53

- 2-1. Create Host Zone. specify your domain that you got in the section 1.
- 2-2. Check it out NS and SOA record is created automatically by Route 53.

## 3. Register "NS" record you got in the section 2. as the "Domain Server"

- ex) register NS record to the NameServer in which you got your domain. and there are usually four NS record.

## 4. Got the SSL/TLS certificate in ACM(AWS Certificate Manager).

- 4-1. If you set your endpoint for your custom domain as `Edge-optimized API` in the "section 5", you must request certificate in the `US East (N. Virginia)`, or if you set it as `Regional API`, you can request in `any regions`.
- 4-2. After you request certificate, you create Route53 record.
- 4-3. Check it out that CNAME record is created in the Host zone you created in the section 2.
- 4-4. wait for the certificate request is completed

## 5. Create Custom domain in the Amazon APIGateway

```
protocol : REST
domain name : 1. your domain
Security policy : TLSv1.2
endpoint : select `Edge-optimized API` or `Regional API`
ACM certificate : certificate you got in the section 4

save on and add base mapping
request to : your APIGateway API name
stage : your APIGateway stage name
path : don't need this time
```

## 6. Create A record in the Route53

- 6-1. select A in the Host zone you created in the section 2
- 6-2. Add `target name` which is created in the custom domain in the section 5 by AWS managed service to `alias`.
- 6-3. Check it out that A record `alias` is added to the Host Zone you created in the section 2.

## 7. Confirm it works

```
DOMAIN="your domain which you got in the section 1"
PATH="/example"

~$ sslscan "${DOMAIN}${PATH}"

    Supported Server Cipher
    Accepted TLSv1.2 128 bits ......
```
