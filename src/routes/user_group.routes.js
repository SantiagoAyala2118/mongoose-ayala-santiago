import { Router } from "express";

//-------------------CONTROLADORES
import { createUserGroup } from "../controllers/user_group.controller.js";

//-------------------MIDDLEWARES
import { createUserGroupValidations } from "../middlewares/validations/user_group.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const userGroupRoutes = Router();

//ENDPOINT PARA LA RELACIÓN DE MUCHOS A MUCHOS
userGroupRoutes.post(
  "/user-groups/:id",
  createUserGroupValidations,
  applyValidations,
  createUserGroup
);
