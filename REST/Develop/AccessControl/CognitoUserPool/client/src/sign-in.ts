import { signIn, fetchAuthSession } from "aws-amplify/auth";
import { setConfig } from "./config.js";

setConfig();

const ENDPOINT = process.env.ENDPOINT;

if (!ENDPOINT) {
  console.error(
    "You need to set APIGateway endpoint in your environment value as 'ENDPOINT'"
  );
  process.exit(1);
}

(async () => {
  await signIn({
    username: "test-user",
    password: "Password1@",
    options: {
      authFlowType: "USER_SRP_AUTH",
    },
  });
  const { tokens } = await fetchAuthSession();
  if (!tokens?.idToken?.toString()) {
    console.warn("Can't get tokens");
    return;
  }
  console.log({
    accessToken: tokens.accessToken.toString(),
    idToken: tokens?.idToken?.toString(),
  });

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: tokens?.idToken?.toString(),
    },
  });
  if (!response.ok) {
    console.warn({
      status: response.status,
      message: await response.text(),
    });
  } else {
    console.log({
      status: response.status,
      message: await response.json(),
    });
  }
})().catch(console.error);
