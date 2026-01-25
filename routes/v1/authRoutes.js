import { Router } from "express";
// import { register, login, refresh, logout } from "../controllers/authController";

const authRoutes = Router();

Router.post("/register", register)
Router.post("/login, login");
Router.post("/refresh", refresh);
Router.post("/logout", logout);


export default authRoutes;


