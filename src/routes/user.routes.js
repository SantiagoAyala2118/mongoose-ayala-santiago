import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

export const userRoutes = Router();

//CREAR USUARIO
userRoutes.post("/users", createUser);

//TRAER USUARIOS
userRoutes.get("/users", getAllUsers);

//TRAER UN USUARIO
userRoutes.get("/users/:id", getUser);

//ACTUALIZAR UN USUARIO
userRoutes.put("/users/:id", updateUser);

//BORRAR UN USUARIO
userRoutes.delete("/users/:id", deleteUser);
