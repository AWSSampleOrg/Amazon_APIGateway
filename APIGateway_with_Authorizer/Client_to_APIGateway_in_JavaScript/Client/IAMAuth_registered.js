global.fetch = require("node-fetch");
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const fs = require("fs");

const setting = JSON.parse(fs.readFileSync(__dirname.split("/").slice(0,-1).join("/") + "/setting.json"));


// UserPool Setting
const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId : setting.CognitoUserPoolId,
    ClientId : setting.CognitoAppClientId
});

// User Setting
const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: setting.CognitoUserName,
    Pool: userPool
});

//  Password Setting
const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Password: setting.CognitoUserPassword
});

// Authenticated with UserPool, User and Password
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess(result){
        // Web APIを認証/認可サーバで保護して他のアプリケーションに公開する場合、アクセストークンを使用する
        // Web APIを自分のアプリケーションの一部(バックエンドサービス)として作成して保護する場合、IDトークンを使用する
        //const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();
        requestApi(idToken);
    },
    onFailure(err){
        console.error(err);
        throw err;
    },
    // Change Initialized password
    newPasswordRequired(user_attributes, required_attributes){
        cognitoUser.completeNewPasswordChallenge(authenticationDetails.password, user_attributes, this);
    }
});


const requestApi = (idToken) => {
    const AWS = require('aws-sdk');
    const credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: setting.CognitoIdentityPoolId,
        Logins: { 
            //You can specify object key as the variable. the following is specified as the string variable.
            [`cognito-idp.${setting.region}.amazonaws.com/${setting.CognitoUserPoolId}`] : idToken
        }
    });
    AWS.config.update({
      credentials: credentials,
      region: setting.region
    });

    const apigClientFactory = require('aws-api-gateway-client').default;

    AWS.config.credentials.get(function(err){
        if(!err){
            const apigClient = apigClientFactory.newClient({
                accessKey: AWS.config.credentials.accessKeyId,
                secretKey: AWS.config.credentials.secretAccessKey,
                sessionToken: AWS.config.credentials.sessionToken,
                region: setting.region,
                invokeUrl: `https://${setting.RestApiID}.execute-api.${setting.region}.amazonaws.com/${setting.RestApiStage}`
            });
            const params = {
            };
            
            const additionalParams = {
                queryParams: {
                }
            };

            const body = {
            };

            apigClient.invokeApi(params, setting.pathTemplate, setting.method, additionalParams, body)
                .then(function(result){
                    console.log(result.data);
                })
                .catch(function(result){
                    console.log(result);
                });
        }else{
            console.log(err);
        }
    });
};