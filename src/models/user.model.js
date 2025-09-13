import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorite_game: {
      name: {
        type: String,
        required: true,
      },
      genre: {
        type: String,
        required: true,
      },
      hours_played: {
        type: Number,
        required: false,
      },
    },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model("User", userSchema);
