import express from "express";
console.log("[DEBUG] Loading property routes");
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAllPropertiesWithOptionalFilters,
  getMyProperties,
  registerProperty,
  updateMyProperty,
  getPropertyById,
} from "../controllers/property.controller.js";
const router = express.Router();

router.get("/all", isAuthenticated, getAllPropertiesWithOptionalFilters);
router.get("/my", isAuthenticated, getMyProperties);
router.get("/:id", isAuthenticated, getPropertyById);
router.post("/register", isAuthenticated, registerProperty);
router.put("/update/:id", isAuthenticated, updateMyProperty);

export default router;
