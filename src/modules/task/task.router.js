import { Router } from "express";
import * as taskController from "./controller/task.controller.js";
import { tokenCheck } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as taskValditor from "./taskValidation.js";
const router = Router();

router.post(
  "/addTask",
  validation(taskValditor.addTask),
  tokenCheck,
  taskController.addTask
);
router.get("/getAllTasks", taskController.getAllTasks);
router.get(
  "/getAllCreatedTasks",
  tokenCheck,
  taskController.getAllCreatedTasks
);
router.get(
  "/getAllAssignTasks",
  validation(userValditors.token),
  tokenCheck,
  taskController.getAllAssignTasks
);
router.get(
  "/allLateTasks",
  validation(userValditors.token),
  tokenCheck,
  taskController.allLateTasks
);
router.get(
  "/getTasksAssignToAnyUser/:id",
  validation(userValditors.token),
  tokenCheck,
  taskController.getTasksAssignToAnyUser
);

router.put(
  "/updateTask/:id",
  validation(userValditors.token),
  tokenCheck,
  validation(taskValditor.updateTask),

  taskController.updateTask
);

router.delete("/deleteTask/:id", tokenCheck, taskController.deleteTask);

export default router;
