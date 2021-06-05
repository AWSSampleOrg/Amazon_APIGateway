import {aws as AWS, SETTING} from "./setting.js";

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

function checkConfirmationToken()
{
    return new Promise((resolve)=>{
        document.querySelector("#submit").addEventListener("click",resolve);
    })
}
/**
 * sign in Cognito User Pool, then you can invoke Lambda through APIGateway
 */
async function signUp(userSetting)
{
    await cognitoidentityserviceprovider.signUp({
        ClientId: SETTING.CognitoAppClientId,
        Password: userSetting.password,
        Username: userSetting.userName,
        UserAttributes: [
            {
                Name: 'email',
                Value: userSetting.email
            }
        ]
    }).promise();

    // change confirm button visible
    document.querySelector(".confirmationCodeGroup").style.visibility = "visible";

    await checkConfirmationToken();

    const confirmationCode = document.querySelector("#confirmationCode").value;

    await cognitoidentityserviceprovider.confirmSignUp({
        ClientId: SETTING.CognitoAppClientId,
        ConfirmationCode: confirmationCode,
        Username: userSetting.userName
    }).promise();
    window.alert("Successfully Sign up");
}

/**
 * wait user input
 */
function checkUserSetting()
{
    return new Promise(resolve=>{
        document.querySelector("#submit").addEventListener("click",function(){
            const userName = document.querySelector("#userName").value;
            const password = document.querySelector("#password").value;
            const email = document.querySelector("#email").value;

            if(userName !== "" && password !== "" && email !== "")
            {
                resolve(
                    {userName: userName, password: password, email: email}
                );
            }
        });
    })
}

document.querySelector("#signUp").addEventListener("click", async function(){
    document.querySelector(".main").style.visibility = "visible";
    document.querySelector(".emailGroup").style.visibility = "visible";
    document.querySelector(".confirmationCodeGroup").style.visibility = "hidden";

    // wait user input
    const userSetting = await checkUserSetting();

    await signUp(userSetting);
});
