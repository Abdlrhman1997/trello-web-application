import connectDB from "../DB/connection.js";
import userRouter from "./modules/user/user.router.js";
import taskRouter from "./modules/task/task.router.js";
import authRouter from "./modules/auth/auth.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";

const bootstrap = (app, express) => {
  app.use(express.json());

  app.use("/user", userRouter);
  app.use("/task", taskRouter);
  app.use("/auth", authRouter);
  app.use(globalErrorHandling);
  connectDB();
};

export default bootstrap;
