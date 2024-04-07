endpoint_url=$(
    aws cloudformation describe-stacks \
        --stack APIGateway-to-DynamoDB \
        --query "Stacks[0].Outputs[?OutputKey=='APIGatewayEndpointUrl'].OutputValue" \
        --output text
)
echo ${endpoint_url}

case $1 in
"GET")
    curl -w '\n' \
        -X GET ${endpoint_url}/dragon/$2
    ;;
"POST") curl -w '\n' \
    -H "Content-Type: application/json" \
    -d '{"name":"Mushu","size":"small","color":"red","age":"123"}' \
    -X POST ${endpoint_url}/dragons ;;
"PUT")
    curl -w '\n' \
        -X PUT ${endpoint_url}/dragon/$2 \
        -H “Content-Type: application/json” \
        -d '{“name”:”Meatlug”}'
    ;;
*) curl -w '\n' \
    -X GET ${endpoint_url}/dragons ;;
esac
