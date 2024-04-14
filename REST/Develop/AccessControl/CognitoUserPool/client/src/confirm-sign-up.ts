import { confirmSignUp } from "aws-amplify/auth";
import { setConfig } from "./config.js";

setConfig();

const confirmationCode = process.argv[2];
if (!confirmationCode) {
  console.error("You need to pass confirmationCode as a command line arg");
  process.exit(1);
}

(async () => {
  await confirmSignUp({
    username: "test-user",
    confirmationCode,
  });
})().catch(console.error);
