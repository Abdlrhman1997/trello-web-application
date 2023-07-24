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
  validation(userValditors.token),
  tokenCheck,
  validation(userValditors.changePassword),
  userController.changePassword
);
router.put(
  "/update",
  validation(userValditors.token),
  tokenCheck,
  validation(userValditors.updateUser),
  userController.updateUser
);
router.delete(
  "/delete",
  validation(userValditors.token),
  tokenCheck,
  validation(userValditors.deleteUser),
  userController.deleteUser
);
router.patch(
  "/logout",
  validation(userValditors.token),
  tokenCheck,
  userController.logout
);
router.patch(
  "/softDelete",
  validation(userValditors.token),
  tokenCheck,
  validation(userValditors.softDelete),
  userController.softDelete
);

export default router;
