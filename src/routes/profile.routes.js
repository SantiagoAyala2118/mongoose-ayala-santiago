import { Router } from "express";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

export const profileRoutes = Router();

//CREAR PERFIL
profileRoutes.post("/profile", createProfile);

//TRAER TODOS LOS PERFILES
profileRoutes.get("/profile", getAllProfiles);

//TRAER UN SOLO PERFIL
profileRoutes.get("/profile/:id", getProfile);

//ACTUALIZAR UN PERFIL
profileRoutes.put("/profile/:id", updateProfile);

//ELIMINAR UN PERFIL
profileRoutes.delete("/profile/:id", deleteProfile);
