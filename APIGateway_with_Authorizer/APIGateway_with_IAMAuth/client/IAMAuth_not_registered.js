const AWS = require("aws-sdk");

const setting = {
    CryptoConfig: {
        PASSWORD: "l+/MraaOI1yT3F1l15fJMcEKGiG3iWn7nOTmUS4fWk0=",
        SALT: "kr3dJJ1mPcIKisMOR4RO6w==",
    },
    region: "The AWS Region to deploy application",
    method: "POST or GET or something others",
    pathTemplate: "/lambda_handler",
    RestApiStage: "test or prod",
    CognitoUserPassword: "Cognito User Password",
    CognitoUserName: "Cognito User Name",
    CognitoUserGroupName: "User Group Name",

    CognitoUserGroupIamRoleArn: "Cognito User Group IAM Role ARN",
    CognitoAppClientId: "Cognito App Client ID",
    CognitoIdentityPoolId: "Cognito Identity PoolId",
    RestApiID: "Rest API ID",
    CognitoUserPoolId: "Cognito User PoolId",
};

const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: setting.CognitoIdentityPoolId,
});
AWS.config.update({
    credentials: credentials,
    region: setting.region,
});

const apigClientFactory = require("aws-api-gateway-client").default;

AWS.config.credentials.get(function (err) {
    if (!err) {
        const apigClient = apigClientFactory.newClient({
            accessKey: AWS.config.credentials.accessKeyId,
            secretKey: AWS.config.credentials.secretAccessKey,
            sessionToken: AWS.config.credentials.sessionToken,
            region: setting.region,
            invokeUrl: `https://${setting.RestApiID}.execute-api.${setting.region}.amazonaws.com/${setting.RestApiStage}`,
        });
        const params = {};

        const additionalParams = {
            queryParams: {},
        };

        const body = {};

        apigClient
            .invokeApi(
                params,
                setting.pathTemplate,
                setting.method,
                additionalParams,
                body
            )
            .then((result) => {
                console.log(result.data);
            })
            .catch((result) => {
                console.log(result);
            });
    } else {
        console.log(err);
    }
});
