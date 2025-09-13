import { Schema, Types, model } from "mongoose";

const profileSchema = new Schema(
  {
    profile_picture: {
      type: String,
      required: false,
    },
    biography: {
      type: String,
      required: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const ProfileModel = model("Profile", profileSchema);
