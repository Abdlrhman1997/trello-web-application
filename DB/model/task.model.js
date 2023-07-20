import { Schema, model, Types } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "toDo",
    enum: ["toDo", "doing", "done"],
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  assignTo: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  deadline: {
    type: String,
    required: true,
  },
});

const taskModel = model("Task", taskSchema);

export default taskModel;
