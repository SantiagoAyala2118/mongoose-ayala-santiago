import { Router } from "express";

//-------------------------CONTROLADORES
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

//---------------------------MIDDLEWARES
import {
  createProfileValidations,
  getProfileValidations,
  updateProfileValidations,
  deleteProfileValidations,
} from "../middlewares/validations/profile.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const profileRoutes = Router();

//CREAR PERFIL
profileRoutes.post(
  "/profile",
  createProfileValidations,
  applyValidations,
  createProfile
);

//TRAER TODOS LOS PERFILES
profileRoutes.get("/profile", getAllProfiles);

//TRAER UN SOLO PERFIL
profileRoutes.get(
  "/profile/:id",
  getProfileValidations,
  applyValidations,
  getProfile
);

//ACTUALIZAR UN PERFIL
profileRoutes.put(
  "/profile/:id",
  updateProfileValidations,
  applyValidations,
  updateProfile
);

//ELIMINAR UN PERFIL
profileRoutes.delete(
  "/profile/:id",
  deleteProfileValidations,
  applyValidations,
  deleteProfile
);
