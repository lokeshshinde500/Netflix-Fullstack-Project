import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
const routes = Router();

// register
routes.post("/register", register);

// login
routes.post("/login", login);

// login
routes.post("/logout", logout);

export default routes;
