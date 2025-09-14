import { GroupModel } from "../models/group.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { username, email, password, favorite_games } = req.body;
  try {
    const newUser = await UserModel.create({
      username,
      email,
      password,
      favorite_games,
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
    const users = await UserModel.find({ deletedAt: null });

    //COMO NO TENGO REFERENCIA DIRECTA DE PROFILE EN EL ESQUEMA DE USER, HAGO LA CONSULTA MANUALMENTE
    // const userProfile = await ProfileModel.find({ owner: users[0]._id });
    const userProfile = async () => {
      const profiles = [];
      for (let i = 0; i < users.length; i++) {
        let profile = await ProfileModel.find({ owner: users[i]._id });
        profiles.push(profile);
      }
      return profiles;
    };

    const profile = await userProfile();

    return res.status(200).json({
      ok: true,
      message: "Here are the users",
      User: users,
      Profiles: profile,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).jon({
      ok: false,
      message: "Server error",
    });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({
      _id: id,
      deletedAt: null,
    });

    //COMO NO TENGO REFERENCIA DIRECTA DE PROFILE EN EL ESQUEMA DE USER, HAGO LA CONSULTA MANUALMENTE
    const userProfile = await ProfileModel.findOne({ owner: id });

    return res.status(200).json({
      ok: true,
      message: "Here is the user",
      User: user,
      Profile: userProfile,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, favorite_game } = req.body;
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      username,
      email,
      password,
      favorite_games
    );

    return res.status(200).json({
      opk: true,
      message: "User updated",
      User: updateUser,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    //BORRO DE FORMA LÓGICA UN USUARIO
    const deleteUser = await UserModel.findByIdAndUpdate(
      id,
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      }
    );

    //AUTOMÁTIAMENTE LO BORRO DE LOS CAMPOS EN DONDE SE REFERENCIA EN LA COLECCIÓN GRUPOS
    await GroupModel.updateMany({ members: id }, { $pull: { members: id } });

    //Y BORRO EL PERFIL ASOCIADO
    await ProfileModel.findOneAndDelete({ owner: id });

    return res.status(200).json({
      ok: true,
      message: "User deleted",
      user_deleted: deleteUser,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
