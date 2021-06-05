const AWS = require('aws-sdk');
const fs = require("fs");

const setting = JSON.parse(fs.readFileSync(__dirname.split("/").slice(0,-1).join("/") + "/setting.json"));

const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: setting.CognitoIdentityPoolId
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
    };
});