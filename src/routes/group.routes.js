import { Router } from "express";
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroup,
  updateGroup,
} from "../controllers/group.controller.js";

export const groupRoutes = Router();

//CREAR UN GRUPO
groupRoutes.post("/groups", createGroup);

//TRAER TODOS LOS GRUPOS
groupRoutes.get("/groups", getAllGroups);

//TRAER UN GRUPO
groupRoutes.get("/groups/:id", getGroup);

//ACTUALIZAR UN GRUPO
groupRoutes.put("/groups/:id", updateGroup);

//ELIMINAR UN GRUPO
groupRoutes.delete("/groups/:id", deleteGroup);
