#-*- encoding:utf-8 -*-
import json
import os
import sys
#Third Party
import boto3

def lambda_handler(event,context):
    print(json.dumps(event))
    return {
        "statusCode": 200,
        "body": json.dumps({"message" : "OK"})
   }
