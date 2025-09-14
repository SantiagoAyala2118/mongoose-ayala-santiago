import { Router } from "express";

//-----------------------CONTROLADORES
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroup,
  updateGroup,
} from "../controllers/group.controller.js";

//------------------------MIDDLEWARES
import {
  createGroupValidations,
  getGroupValidations,
  updateGroupValidations,
  deleteGroupValidations,
} from "../middlewares/validations/group.validations.js";
import { applyValidations } from "../middlewares/validator.js";

export const groupRoutes = Router();

//CREAR UN GRUPO
groupRoutes.post(
  "/groups",
  createGroupValidations,
  applyValidations,
  createGroup
);

//TRAER TODOS LOS GRUPOS
groupRoutes.get("/groups", getAllGroups);

//TRAER UN GRUPO
groupRoutes.get("/groups/:id", getGroupValidations, applyValidations, getGroup);

//ACTUALIZAR UN GRUPO
groupRoutes.put(
  "/groups/:id",
  updateGroupValidations,
  applyValidations,
  updateGroup
);

//ELIMINAR UN GRUPO
groupRoutes.delete(
  "/groups/:id",
  deleteGroupValidations,
  applyValidations,
  deleteGroup
);
