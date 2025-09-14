import { Schema, Types, model } from "mongoose";

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  members: {
    type: [Types.ObjectId],
    ref: "User",
    required: false,
  },
});

export const GroupModel = model("Group", groupSchema);
