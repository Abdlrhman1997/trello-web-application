import userModel from "../../../../DB/model/user.model.js";
import taskModel from "../../../../DB/model/task.model.js";
import bcrypt from "bcryptjs";
import cryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../../utils/errorHandling.js";

const compareDate = (date) => {
  const dateArray = date.split("-");
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  if (dateArray[1] < month || dateArray[0] < year || dateArray[2] < day) {
    return false;
  }
  return true;
};

export const addTask = asyncHandler(async (req, res, next) => {
  const { title, description, deadline, assignTo } = req.body;
  if (!compareDate(deadline)) {
    return next(new Error("you entered an old date"));
  }
  //   console.log(req.user._id);
  //   console.log({ title, description, deadline, assignTo });

  const user = await userModel.findById(assignTo);
  if (!user) {
    return next(
      new Error("the user you want to give this task to doesnt exist")
    );
  }
  const task = await taskModel.create({
    title,
    description,
    deadline,
    assignTo,
    userId: req.user._id,
  });

  return res.json({ message: `new task added successfully`, task });
});

export const getAllTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel
    .find()
    .populate("userId", "userName email")
    .populate("assignTo", "userName email");
  return res.json({ tasks });
});

export const getAllCreatedTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel.find({ userId: req.user._id });
  return res.json({ tasks });
});

export const getAllAssignTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel.find({ assignTo: req.user._id });
  return res.json({ tasks });
});

export const allLateTasks = asyncHandler(async (req, res, next) => {
  const tasks = await taskModel.find();

  const result = tasks.filter((task) => {
    return !compareDate(task.deadline);
  });
  return res.json({ result });
});

export const getTasksAssignToAnyUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const tasks = await taskModel.find({ assignTo: id });
  return tasks.length
    ? res.json({ tasks })
    : next(new Error("this user doesnt exist"));
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const { title, description, deadline, status, assignTo } = req.body;
  const { id } = req.params;
  if (!compareDate(deadline)) {
    return next(new Error("you entered an old date"));
  }
  console.log(status);
  if (status !== "toDo" || status !== "done" || status !== "doing") {
    return next(new Error("please enter a vaild status"));
  }

  const checkUser = await taskModel.findOne({ userId: req.user._id });
  const checkTask = await taskModel.findOne({ _id: id });

  console.log(checkTask);
  if (!checkTask) {
    return next(new Error("this task doesnt exist"));
  }
  if (!checkUser) {
    return next(new Error("you are not allowed to edit this task!"));
  }

  const task = await taskModel.create({
    title,
    description,
    deadline,
    status,
    assignTo,
    userId: req.user._id,
  });
  return res.json({ message: `task updated successfully`, task });
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const checkTask = await taskModel.findOne({ _id: id });

  console.log(checkTask);
  if (!checkTask) {
    return next(new Error("this task doesnt exist"));
  }
  const checkUser = await taskModel.findOne({ userId: req.user._id });
  if (!checkUser) {
    return next(new Error("you are not allowed to edit this task!"));
  }
  await taskModel.findByIdAndDelete(id);
  return res.json({ message: `task deleted successfully` });
});
