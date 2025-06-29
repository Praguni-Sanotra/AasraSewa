import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAllPropertiesWithOptionalFilters,
  getMyProperties,
  registerProperty,
  updateMyProperty,
} from "../controllers/property.controller.js";
const router = express.Router();

router.get("/all", isAuthenticated, getAllPropertiesWithOptionalFilters);
router.get("/my", isAuthenticated, getMyProperties);
router.post("/register", isAuthenticated, registerProperty);
router.put("/update/:id", isAuthenticated, updateMyProperty);

export default router;
