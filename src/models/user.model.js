import { Schema, Types, model } from "mongoose";

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
    favorite_games: [
      {
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
    ],
    groups: {
      type: [Types.ObjectId],
      ref: "Group",
      required: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model("User", userSchema);
