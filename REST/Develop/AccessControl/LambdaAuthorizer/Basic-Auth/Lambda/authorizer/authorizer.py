# -*- encoding: utf-8 -*-
import json
import logging
import os
import base64

# logger setting
logger = logging.getLogger()
logger.setLevel(os.getenv("LOG_LEVEL", logging.DEBUG))


def lambda_handler(event, context):
    logger.info(json.dumps(event))
    token = event["headers"]["Authorization"]

    if is_success_basic_auth(token):
        return {
            "principalId": "user",
            "policyDocument": {
                "Version": '2012-10-17',
                "Statement": [{
                    "Action": 'execute-api:Invoke',
                    "Effect": "Allow",
                    "Resource": event["methodArn"]
                }]
            }
        }
    else:
        return "Unauthorized"

def basic_auth(username: str, password: str):
    token = base64.b64decode(f"{username}:{password}".encode('utf-8')).decode("ascii")
    return f'Basic {token}'

def is_success_basic_auth(token):
    for d in [{"username": "username", "password": "password"}]:
        if basic_auth(d["username"], d["password"]) == token:
            return True
    return False
