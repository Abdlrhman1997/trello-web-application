import { Router } from "express";
import * as authController from "./controller/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./authValidation.js";
const router = Router();

router.post(
  "/signup/:flag",
  validation(validators.signup),
  authController.signup
);
router.post("/login", validation(validators.login), authController.login);
router.get("/confirmEmail/:token", authController.confirmEmail);
router.get("/resendConfirmEmail/:token", authController.resendConfirmEmail);

export default router;
