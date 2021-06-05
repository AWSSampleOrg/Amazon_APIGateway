import {SETTING} from "./setting.js";


/**
 * Invoke APIGateway
 * @param {string} idToken
 */
async function requestApi(idToken)
{
    try
    {
        const response = await fetch(SETTING.APIGatewayInvokeURL,{
            method: "POST",
            headers: {
                "Authorization" : idToken
            }
        })
        return await response.json();
    }
    catch (error)
    {
        window.alert(error.name,error.message);
        throw new Error("Failed to get response from Lambda");
    }
}

/**
 * sign in Cognito User Pool, then you can invoke Lambda through APIGateway
 */
function signIn(userSetting)
{
    // UserPool Setting
    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
        UserPoolId : SETTING.CognitoUserPoolId,
        ClientId : SETTING.CognitoAppClientId
    });

    // User Setting
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: userSetting.userName,
        Pool: userPool
    });

    //  Password Setting
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Password: userSetting.password
    });

    return new Promise((resolve,reject)=>{
        // Authenticated with UserPool, User and Password
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess(result)
            {
                //const accessToken = result.getAccessToken().getJwtToken();
                const idToken = result.getIdToken().getJwtToken();
                requestApi(idToken)
                    .then((response)=>{
                        resolve(response);
                    })
                    .catch((error)=>{
                        reject(error);
                    })
            },
            onFailure(err)
            {
                reject(err);
            },
            // Change Initialized password
            // newPasswordRequired(user_attributes, required_attributes){
            //     cognitoUser.completeNewPasswordChallenge(authenticationDetails.password, user_attributes, this);
            // }
        });
    })
}

/**
 * wait user input
 */
function checkInput()
{
    return new Promise(resolve=>{
        document.querySelector("#submit").addEventListener("click",function(){
            const userName = document.querySelector("#userName").value;
            const password = document.querySelector("#password").value;

            if(userName !== "" && password !== "")
            {
                resolve(
                    {userName: userName, password: password}
                );
            }
        });
    })
}

document.querySelector("#signIn").addEventListener("click", async function()
{
    document.querySelector(".main").style.visibility = "visible";
    document.querySelector(".emailGroup").style.visibility = "hidden";
    document.querySelector(".confirmationCodeGroup").style.visibility = "hidden";

    // wait user input
    const userSetting = await checkInput();

    // sign in
    const response = await signIn(userSetting);
    console.log(response);
});
