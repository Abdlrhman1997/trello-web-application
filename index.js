import dotenv from "dotenv";
dotenv.config();
import sendEmail from "./src/utils/email.js";
import express from "express";
import bootstrap from "./src/index.router.js";
const app = express();
const port = 3000;

await sendEmail({
  to: "abdlrhman.hegazy@yahoo.com",
  subject: "confirm email",
  html: "<a>confirm</a>",
});
bootstrap(app, express);

app.listen(port, () => console.log(`server is running on port ${port}`));
