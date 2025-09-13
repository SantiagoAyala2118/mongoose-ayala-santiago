import { Router } from "express";

//-------------------RUTAS
import { userRoutes } from "./user.routes.js";
import { profileRoutes } from "./profile.routes.js";
import { groupRoutes } from "./group.routes.js";
import { userGroupRoutes } from "./user_group.routes.js";

export const routes = Router();

//RUTAS DE USER
routes.use(userRoutes);

//RUTAS DE PROFILE
routes.use(profileRoutes);

//RUTAS DE GROUP
routes.use(groupRoutes);

//RUTA DE USER-GROUP
routes.use(userGroupRoutes);
