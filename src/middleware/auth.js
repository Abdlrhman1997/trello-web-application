import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";
import { asyncHandler } from "../utils/errorHandling.js";

export const tokenCheck = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer ")) {
    return next(
      new Error("authorization token required invalid bearer key", {
        cause: 400,
      })
    );
  }
  const token = authorization.split("Bearer ")[1];
  const decoded = jwt.verify(token, "sasadanceonmsasa");
  if (!decoded?.id) {
    return next(new Error("invalid token payload"));
  }

  const user = await userModel
    .findById(decoded.id)
    .select("userName email isOnline isDeleted role");
  if (!user) {
    return next(new Error("not registerd user", { cause: 404 }));
  }

  if (!user.isOnline) {
    return next(new Error("please login first", { cause: 401 }));
  }

  console.log(user.isDeleted);
  if (user.isDeleted) {
    return next(new Error("this email is deleted, please log in to activate"));
  }

  req.user = user;
  return next();
});
