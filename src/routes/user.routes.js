import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.controller.js";

export const userRoutes = Router();

//CREAR USUARIO
userRoutes.post("/users", createUser);

//TRAER USUARIOS
userRoutes.get("/users", getAllUsers);
