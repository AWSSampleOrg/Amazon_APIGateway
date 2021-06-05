const crypto = require('crypto');

const cryptoConfig = {
    PASSWORD : process.env.PASSWORD,
    SALT : process.env.SALT
}

/**
 *
 * @param {*} password
 * @param {*} salt
 * @param {*} iv
 * @param {*} encryptedData
 */
function decrypt(password, salt, iv, encryptedData) {
    const key = crypto.pbkdf2Sync(password,salt,100000, 512,'sha512').slice(0,32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decryptedData = decipher.update(encryptedData);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);

    return decryptedData.toString('utf-8');
}

exports.handler = async (event) => {
    console.log(event);
    const config = JSON.parse(event.Authorization);

    // decrypt
    let decryptedData = decrypt(
        cryptoConfig.PASSWORD,
        cryptoConfig.SALT,
        Buffer.from(config.iv,"base64"),
        Buffer.from(config.encryptedData,"base64")
    );
    console.log('decryptedData : ' + decryptedData);


    // Authorization
    if (decryptedData === "大家好！This is the test data. この文字が複合できればテストは成功です。") {
        console.log("Success");
        return generatePolicy('user', 'Allow', event.methodArn);
    } else {
        return generatePolicy('user', 'Deny', event.methodArn);
    }
};

// return IAM Policy
var generatePolicy = function(principalId, effect, resource) {
    return {
      principalId: principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }]
      }
    };
 }
