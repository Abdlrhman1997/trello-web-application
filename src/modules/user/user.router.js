import { Router } from "express";
import * as userController from "./controller/user.controller.js";
import { tokenCheck } from "../../middleware/auth.js";
import * as userValditors from "./userValidation.js";
import { validation } from "../../middleware/validation.js";
const router = Router();

// router.post("/signUp", userController.signup);
// router.post("/login", userController.login);
router.patch(
  "/changePassword",
  tokenCheck,
  validation(userValditors.changePassword),
  userController.changePassword
);
router.put(
  "/update",
  validation(userValditors.updateUser),
  tokenCheck,
  userController.updateUser
);
router.delete("/delete", tokenCheck, userController.deleteUser);
router.patch("/logout", tokenCheck, userController.logout);
router.patch("/softDelete", tokenCheck, userController.softDelete);

export default router;
