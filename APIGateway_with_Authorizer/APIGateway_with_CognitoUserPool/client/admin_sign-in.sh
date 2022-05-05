#!/usr/bin/env bash
SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

session=$(aws cognito-idp admin-initiate-auth \
	--user-pool-id ${userPoolId} \
    --client-id ${clientId} \
    --auth-flow "ADMIN_NO_SRP_AUTH" \
    --auth-parameters { "USERNAME": ${userName}, "PASSWORD": "Temporary-Password01" } | jq -r .Session)


aws cognito-idp admin-respond-to-auth-challenge \
	--user-pool-id ${userPoolId} \
    --client-id ${clientId} \
    --challenge-name "NEW_PASSWORD" \
    --challenge-responses { "USERNAME": ${userName}, "NEW_PASSWORD": SETTING["CognitoUserPassword"] } \
    --session ${session}
