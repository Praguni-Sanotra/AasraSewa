import express from "express";
import {
  login,
  logout,
  register,
  updateUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.put("/update", isAuthenticated, updateUser);
router.route("/logout").post(isAuthenticated, logout);

export default router;
