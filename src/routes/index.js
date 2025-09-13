import { Router } from "express";

//-------------------RUTAS
import { userRoutes } from "./user.routes.js";
import { profileRoutes } from "./profile.routes.js";

export const routes = Router();

//RUTAS DE USER
routes.use(userRoutes);

//RUTAS DE PROFILE
routes.use(profileRoutes);
