import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const UserModel = mongoose.model("User", userSchema);
