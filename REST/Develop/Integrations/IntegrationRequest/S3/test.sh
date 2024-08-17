#!/usr/bin/env bash

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

. config.sh

endpoint_url=$(
    aws cloudformation describe-stacks \
        --stack ${STACK_NAME} \
        --query "Stacks[0].Outputs[?OutputKey=='APIGatewayEndpointUrl'].OutputValue" \
        --output text
)

if [ -z $1 ]; then
    echo "S3 object key"
    exit 1
fi

key=$1

curl -XPUT ${endpoint_url}/$key -d @sample.json
curl -w '\n' ${endpoint_url}/$key
curl -I ${endpoint_url}/$key
curl -XDELETE ${endpoint_url}/$key
