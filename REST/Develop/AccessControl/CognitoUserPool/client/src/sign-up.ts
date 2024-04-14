import { signUp } from "aws-amplify/auth";
import { setConfig } from "./config.js";

setConfig();

const EMAIL = process.argv[2];
if (!EMAIL) {
  console.error(
    "You need to set your email in your environment value as 'EMAIL'"
  );
  process.exit(1);
}

(async () => {
  await signUp({
    username: "test-user",
    password: "Password1@",
    options: {
      userAttributes: {
        email: EMAIL,
      },
    },
  });
})().catch(console.error);
