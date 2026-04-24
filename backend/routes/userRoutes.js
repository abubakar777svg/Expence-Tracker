import express from "express";
import {
  loginUser,
  registerUser,
  getUser,
} from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// protected routes
userRouter.get("/me", authMiddleware, getUser);

export default userRouter;
