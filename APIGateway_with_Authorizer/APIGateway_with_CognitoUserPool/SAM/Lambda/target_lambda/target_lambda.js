exports.handler = async (event,context) => {
    console.log(JSON.stringify(event));

    return {
        statusCode: 200,
        headers : {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods" : "*",
          "Access-Control-Allow-Headers": "*"
        },
        body:  JSON.stringify({"message" : "OK"})
    };
};
