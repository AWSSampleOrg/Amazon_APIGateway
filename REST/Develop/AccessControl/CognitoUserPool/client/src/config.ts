import { Amplify } from "aws-amplify";

const USER_POOL_ID = process.env.USER_POOL_ID;
if (!USER_POOL_ID) {
  console.error("USER_POOL_ID should be set in environment value");
  process.exit(1);
}
const APP_CLIENT_ID = process.env.APP_CLIENT_ID;
if (!APP_CLIENT_ID) {
  console.error("APP_CLIENT_ID should be set in environment value");
  process.exit(1);
}

export const setConfig = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: APP_CLIENT_ID,
        userPoolId: USER_POOL_ID,
      },
    },
  });
};
