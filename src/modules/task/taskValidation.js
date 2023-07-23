import joi from "joi";

export const addTask = joi
  .object({
    title: joi.string().min(3).max(25).required(),
    description: joi.string().min(3).max(250).required(),
    deadline: joi.string().min(10).max(10).required(),
    assignTo: joi.string().min(24).max(24).required(),
  })
  .required();

export const updateTask = joi
  .object({
    title: joi.string().min(3).max(25).required(),
    description: joi.string().min(3).max(250).required(),
    deadline: joi.string().min(10).max(10).required(),
    assignTo: joi.string().min(24).max(24).required(),
    status: joi.string().required(),
  })
  .required();
