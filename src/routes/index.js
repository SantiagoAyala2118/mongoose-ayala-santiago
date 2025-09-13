import { Router } from "express";

//-------------------RUTAS
import { userRoutes } from "./user.routes.js";

export const routes = Router();

//RUTAS DE USER
routes.use(userRoutes);
