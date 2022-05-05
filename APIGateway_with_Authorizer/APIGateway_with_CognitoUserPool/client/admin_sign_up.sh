#!/usr/bin/env bash
SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}


aws cognito-idp admin-create-user \
    --user-pool-id ${userPoolId} \
    --username ${userName} \
    --user-attributes [ { "Name": "email", "Value": input("Enter your email: ") } ] \
    --temporary-password "Temporary-Password01" \
    --message-action "SUPPRESS"
