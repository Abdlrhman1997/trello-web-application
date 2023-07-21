import { Router } from "express";
import * as authController from "./controller/auth.controller.js";
const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/confirmEmail/:token", authController.confirmEmail);
router.get("/resendConfirmEmail/:token", authController.resendConfirmEmail);

export default router;
