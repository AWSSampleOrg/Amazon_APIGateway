#-*- encoding:utf-8 -*-
import json
import os
import sys
#Third Party
import boto3
from warrant.aws_srp import AWSSRP

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
        self.__cognito_idp.sign_up(
            ClientId = SETTING["CognitoAppClientId"],
            Username = SETTING["CognitoUserName"],
            Password = SETTING["CognitoUserPassword"],
            UserAttributes = [
                {
                    'Name': 'email',
                    'Value': input('Enter your email: ')
                },
            ]
        )

        self.__cognito_idp.confirm_sign_up(
            ClientId = SETTING["CognitoAppClientId"],
            Username = SETTING["CognitoUserName"],
            ConfirmationCode = input('Enter the Verification Code: '),
        )
        print("Successfully Signup")

    def sign_in(self):
        srp = AWSSRP(
            username = SETTING["CognitoUserName"],
            password = SETTING["CognitoUserPassword"],
            pool_id = SETTING["CognitoUserPoolId"],
            client_id = SETTING["CognitoAppClientId"],
            client = self.__cognito_idp
        )

        response = self.__cognito_idp.initiate_auth(
            AuthFlow='USER_SRP_AUTH',
            AuthParameters={
                'USERNAME': SETTING["CognitoUserName"],
                'SRP_A': srp.get_auth_params()['SRP_A'],
            },
            ClientId = SETTING["CognitoAppClientId"],
        )

        self.__cognito_idp.respond_to_auth_challenge(
            ClientId = SETTING["CognitoAppClientId"],
            ChallengeName = 'PASSWORD_VERIFIER',
            ChallengeResponses = srp.process_challenge(response['ChallengeParameters'])
        )
        print("Successfully Signin")

if __name__ == "__main__":
    cognito = Cognito()
    cognito.sign_up()
    cognito.sign_in()
