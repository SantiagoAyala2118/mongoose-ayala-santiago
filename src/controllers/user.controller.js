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

    if (users.length == 0) {
      return res.status(404).json({
        ok: false,
        message: "There is no users on the DB",
      });
    }
    //COMO NO TENGO REFERENCIA DIRECTA DE PROFILE EN EL ESQUEMA DE USER, HAGO LA CONSULTA MANUALMENTE

    /*Este bucle itera sobre la cantidad de usuarios que tenga en la base de datos. Tras cada iteración, consulta
    en el modelo de perfiles algún docunento que tenga referencia con el usuario de esa iteracíon y, en caso de 
    tener perfiles asociados, pushea ese documento al arreglo*/
    const userProfile = async () => {
      const profiles = [];
      for (let i = 0; i < users.length; i++) {
        let profile = await ProfileModel.find({ owner: users[i]._id });
        profiles.push(profile);
      }

      if (profiles.length == 0) {
        profiles.push("There is no profiles asociated");
      }

      return profiles;
    };

    //Llamo a esa función antes de dar el resultado al usuario
    const profile = await userProfile();

    return res.status(200).json({
      ok: true,
      message: "Here are the users",
      User: users,
      /*Esto mmuestra un arreglo con todos los perfiles que tengan una referencia a los usuarios encontrados,
      más no de forma precisa, el encargado tiene que estar buscando coincidencias. FALTA PULIR*/
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
    const { username, email, password, favorite_games } = req.body;
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
