import { Router } from "express";
import { createUserGroup } from "../controllers/user_group.controller.js";

export const userGroupRoutes = Router();

//ENDPOINT PARA LA RELACIÓN DE MUCHOS A MUCHOS
userGroupRoutes.post("/user-groups/:id", createUserGroup);
