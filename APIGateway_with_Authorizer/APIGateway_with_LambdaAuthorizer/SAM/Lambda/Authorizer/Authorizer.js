const crypto = require('crypto');

const cryptoConfig = {
    PASSWORD : process.env.PASSWORD,
    SALT : process.env.SALT
}

/**
 *
 * @param {string} password
 * @param {string} salt
 * @param {string} iv
 * @param {string} encryptedData
 */
const decrypt = (
    password,
    salt,
    iv,
    encryptedData
) => {
    const key = crypto
        .pbkdf2Sync(password, salt, 100000, 512, "sha512")
        .slice(0, 32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

    const decryptedData = Buffer.concat([
        decipher.update(encryptedData),
        decipher.final(),
    ]);

    return decryptedData.toString("utf-8");
}


exports.handler = async (event) => {
    console.dir(event);
    const config = JSON.parse(event.Authorization);

    // decrypt
    const decryptedData = decrypt(
        cryptoConfig.PASSWORD,
        cryptoConfig.SALT,
        Buffer.from(config.iv,"base64"),
        Buffer.from(config.encryptedData,"base64")
    );
    console.log('decryptedData : ' + decryptedData);

    if (decryptedData === "大家好！This is the test data. この文字が複合できればテストは成功です。") {
        console.log("Success");
        return generatePolicy('user', 'Allow', event.methodArn);
    } else {
        return generatePolicy('user', 'Deny', event.methodArn);
    }
};

const generatePolicy = (principalId, effect, resource) => ({
    principalId: principalId,
    policyDocument: {
        Version: '2012-10-17',
        Statement: [{
        	Action: 'execute-api:Invoke',
          	Effect: effect,
          	Resource: resource
        }]
      }
});
