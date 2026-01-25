import express from "express";
import { registerUser, loginUser } from "../../controllers/userController.js";
const userRouter = express.Router();

// api for register
userRouter.post("/register", registerUser);

// api for logging in user
userRouter.post("/login", loginUser);

export default userRouter;
