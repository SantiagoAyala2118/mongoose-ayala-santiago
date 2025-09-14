import { Router } from "express";
//------------------CONTROLADORES
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

//-------------------MIDDLEWARES
import {
  createUserValidations,
  getUserValidations,
  updateUserValidations,
  deleteUserValidations,
} from "../middlewares/validations/user.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const userRoutes = Router();

//CREAR USUARIO
userRoutes.post("/users", createUserValidations, applyValidations, createUser);

//TRAER USUARIOS
userRoutes.get("/users", getAllUsers);

//TRAER UN USUARIO
userRoutes.get("/users/:id", getUserValidations, applyValidations, getUser);

//ACTUALIZAR UN USUARIO
userRoutes.put(
  "/users/:id",
  updateUserValidations,
  applyValidations,
  updateUser
);

//BORRAR UN USUARIO
userRoutes.delete(
  "/users/:id",
  deleteUserValidations,
  applyValidations,
  deleteUser
);
