# -*- encoding: utf-8 -*-
from logging import getLogger, StreamHandler, DEBUG
import os

# logger setting
logger = getLogger(__name__)
handler = StreamHandler()
handler.setLevel(DEBUG)
logger.setLevel(os.getenv("LOG_LEVEL", DEBUG))
logger.addHandler(handler)
logger.propagate = False



def lambda_handler(event, context):
    logger.info(event)

    if event["Authorization"] == "1":
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
