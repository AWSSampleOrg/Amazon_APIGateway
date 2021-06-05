const AWS = require('aws-sdk');
const crypto = require('crypto');
const fs = require("fs");
const setting = JSON.parse(fs.readFileSync(__dirname.split("/").slice(0,-1).join("/") + "/setting.json"));
const apigClientFactory = require('aws-api-gateway-client').default;


/**
 * 
 * @param {string} password Password
 * @param {string} salt Salt
 * @param {string} data Rawdata which would be encrypted
 * 
 * @returns {Buffer} iv,encryptedData
 */
function encrypt(password, salt, data) {
    const key = crypto.pbkdf2Sync(password,salt,100000, 512,'sha512').slice(0,32);
    
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encryptedData = cipher.update(data);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    return {iv, encryptedData}
}

(async function(){
    const apigClient = apigClientFactory.newClient({
        region: setting.region,
        invokeUrl: `https://${setting.RestApiID}.execute-api.${setting.region}.amazonaws.com/${setting.RestApiStage}`
    });
    const params = {
    };

    // encrypt
    let {iv, encryptedData} = encrypt(
        setting.CryptoConfig.PASSWORD,
        setting.CryptoConfig.SALT,
        Buffer.from("大家好！This is the test data. この文字が複合できればテストは成功です。")
    );
    

    const additionalParams = {
        headers: {
            Authorization: JSON.stringify(
                {
                    iv: Buffer.from(iv).toString("base64"),
                    encryptedData: Buffer.from(encryptedData).toString("base64")
                }
            )
        },
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
})();