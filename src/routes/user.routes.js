import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";

export const userRoutes = Router();

userRoutes.use("/users", createUser);
