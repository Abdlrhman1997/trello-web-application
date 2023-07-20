import { Schema, Types, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["male", "female"],
    },
    phone: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

export default userModel;
