# -*- encoding: utf-8 -*-
import json
import logging
import os

# logger setting
logger = logging.getLogger()
logger.setLevel(os.getenv("LOG_LEVEL", logging.DEBUG))



def lambda_handler(event, context):
    logger.info(json.dumps(event))

    if event["authorizationToken"] == "1":
        return generate_policy("Allow", event["methodArn"])
    else:
        return generate_policy("Deny", event["methodArn"])

def generate_policy(effect, resource):
    return {
        "principalId": "user",
        "policyDocument": {
            "Version": '2012-10-17',
            "Statement": [{
                "Action": 'execute-api:Invoke',
                "Effect": effect,
                "Resource": resource
            }]
        }
    }
