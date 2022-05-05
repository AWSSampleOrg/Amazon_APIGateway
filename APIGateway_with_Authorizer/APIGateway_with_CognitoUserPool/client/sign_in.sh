#!/usr/bin/env bash
SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

challenge_parameters=$(aws cognito-idp initiate-auth \
	--auth-flow "USER_SRP_AUTH" \
	--auth-parameters { "USERNAME": ${userName}, "SRP_A": "*************TODO: to get SRP_A***************" } \
    --client-id ${clientId} | jq -r .ChallengeParameters)

aws cognito-idp respond-to-auth-challenge \
    --client-id ${clientId} \
    --challenge-name "PASSWORD_VERIFIER" \
    --challenge-responses "*********TODO: srp.process_challenge(challenge_parameters)***************"
