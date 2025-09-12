import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const newUser = await UserModel.create({
      username,
      email,
      password,
      role,
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
