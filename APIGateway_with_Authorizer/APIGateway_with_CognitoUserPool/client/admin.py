#-*- encoding:utf-8 -*-
import json
import os
import sys
#Third Party
import boto3

SETTING = {
    "CryptoConfig": {
        "PASSWORD": "l+/MraaOI1yT3F1l15fJMcEKGiG3iWn7nOTmUS4fWk0=",
        "SALT": "kr3dJJ1mPcIKisMOR4RO6w=="
    },
    "region": "The AWS Region to deploy application",
    "method": "POST or GET or something others",
    "pathTemplate": "/lambda_handler",
    "RestApiStage": "test or prod",
    "CognitoUserPassword": "Cognito User Password",
    "CognitoUserName": "Cognito User Name",
    "CognitoUserGroupName" : "User Group Name",

    "CognitoUserGroupIamRoleArn": "Cognito User Group IAM Role ARN",
    "CognitoAppClientId": "Cognito App Client ID",
    "CognitoIdentityPoolId": "Cognito Identity PoolId",
    "RestApiID": "Rest API ID",
    "CognitoUserPoolId": "Cognito User PoolId"
}

class Cognito:
    def __init__(self):
        self.__cognito_idp = boto3.client("cognito-idp")

    def sign_up(self):
        self.__cognito_idp.admin_create_user(
            UserPoolId=SETTING["CognitoUserPoolId"],
            Username = SETTING["CognitoUserName"],
            UserAttributes = [
                {
                    'Name': 'email',
                    'Value': input('Enter your email: ')
                },
            ],
            TemporaryPassword = "Temporary-Password01",
            MessageAction = 'SUPPRESS'
        )

    def sign_in(self):
        response = self.__cognito_idp.admin_initiate_auth(
            UserPoolId=SETTING["CognitoUserPoolId"],
            ClientId = SETTING["CognitoAppClientId"],
            AuthFlow='ADMIN_NO_SRP_AUTH',
            AuthParameters={
                'USERNAME': SETTING["CognitoUserName"],
                'PASSWORD': "Temporary-Password01"
            }
        )

        self.__cognito_idp.admin_respond_to_auth_challenge(
            UserPoolId=SETTING["CognitoUserPoolId"],
            ClientId = SETTING["CognitoAppClientId"],
            ChallengeName = 'NEW_PASSWORD_REQUIRED',
            ChallengeResponses = {
                'USERNAME': SETTING["CognitoUserName"],
                'NEW_PASSWORD': SETTING["CognitoUserPassword"]
            },
            Session=response['Session']
        )
        print("Successfully Signin")

if __name__ == "__main__":
    cognito = Cognito()
    cognito.sign_up()
    cognito.sign_in()
