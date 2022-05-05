#!/usr/bin/env bash
SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

aws cognito-idp sign-up \
    --client-id ${clientId} \
    --username ${userName} \
    --password ${password} \
    --user-attributes [ { "Name": "email", "Value": ${email} } ]

aws cognito-idp confirm-sign-up \
    --client-id ${clientId} \
    --username ${userName} \
    --confirmation-code $1
