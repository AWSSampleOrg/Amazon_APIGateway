# -*- encoding:utf-8 -*-
import json
import logging
import os

# logger setting
logger = logging.getLogger()
logger.setLevel(os.getenv("LOG_LEVEL", logging.DEBUG))

def lambda_handler(event, context):
    logger.info(json.dumps(event))
    return {
        "statusCode": 200,
        'headers': {
            'Access-Control-Allow-Headers': "*",
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': "*"
        },
        "body": json.dumps({"message": "OK"})
    }
