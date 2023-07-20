import express from "express";
import bootstrap from "./src/index.router.js";
const app = express();
const port = 3000;

bootstrap(app, express);

app.listen(port, () => console.log(`server is running on port ${port}`));
