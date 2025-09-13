import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { username, email, password, favorite_game } = req.body;
  try {
    const newUser = await UserModel.create({
      username,
      email,
      password,
      favorite_game,
    });

    return res.status(201).json({
      ok: true,
      message: "User created",
      User: newUser,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      ok: true,
      message: "Here are the users",
      User: users,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).jon({
      ok: false,
      message: "Server error",
    });
  }
};
