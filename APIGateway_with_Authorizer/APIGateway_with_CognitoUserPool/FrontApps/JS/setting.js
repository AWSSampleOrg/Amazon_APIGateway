export const SETTING = {
    region: "",
    APIGatewayInvokeURL: "",

    CognitoUserPoolId: "",
    CognitoAppClientId: ""
};
AWS.config.update({
    region: SETTING.region
});
export const aws = AWS;
