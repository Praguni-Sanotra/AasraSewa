import Property from "../models/property.model.js";
import mongoose from "mongoose";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ========================
// Register New Property
// ========================
export const registerProperty = async (req, res) => {
  try {
    const {
      title,
      landmark,
      pincode,
      fullAddress,
      pricePerNight,
      description,
      capacity,
      images,
      propertyImage,
    } = req.body;

    const createdBy = req.id;

    // Validate required fields
    if (
      !title ||
      !landmark ||
      !pincode ||
      !fullAddress ||
      !pricePerNight ||
      !description ||
      !capacity ||
      !images?.frontWall ||
      !images?.backWall ||
      !images?.leftWall ||
      !images?.rightWall
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    const newProperty = new Property({
      title,
      landmark,
      pincode,
      fullAddress,
      pricePerNight: Number(pricePerNight),
      description,
      capacity: Number(capacity),
      createdBy,
      images,
      propertyImage,
    });

    const savedProperty = await newProperty.save();

    // === 🔁 Trigger Python Script ===
    const scriptPath = path.join(
      __dirname,
      "../../building_health/building_health_report.py"
    );
    const imageJson = JSON.stringify(savedProperty.images);
    const propertyId = savedProperty._id.toString();

    const pythonProcess = spawn("python3", [scriptPath, imageJson, propertyId]);

    pythonProcess.stdout.on("data", (data) => {
      console.log(`📥 PYTHON STDOUT: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`❌ PYTHON ERROR: ${data}`);
    });

    res.status(201).json({
      message: "Property registered successfully.",
      property: savedProperty,
    });
  } catch (error) {
    console.error("Error registering property:", error);
    res
      .status(500)
      .json({ message: "Server error while registering property." });
  }
};

// ========================
// Get All Properties
// ========================
export const getAllPropertiesWithOptionalFilters = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      minCost,
      maxCost,
      members,
      sort = "asc",
    } = req.query;

    const filters = {};
    const shouldFilter = minCost || maxCost || members;

    if (shouldFilter) {
      filters.status = "approved";
      filters.isBooked = false;

      if (minCost || maxCost) {
        filters.pricePerNight = {};
        if (minCost) filters.pricePerNight.$gte = Number(minCost);
        if (maxCost) filters.pricePerNight.$lte = Number(maxCost);
      }

      if (members) {
        filters.capacity = { $gte: Number(members) };
      }
    }

    const sortOption = sort === "desc" ? -1 : 1;

    const total = await Property.countDocuments(filters);

    const properties = await Property.find(filters)
      .sort({ pricePerNight: sortOption })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      properties,
    });
  } catch (error) {
    console.error("Error in getAllPropertiesWithOptionalFilters:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching properties." });
  }
};

// ========================
// Get Properties By Logged-in User
// ========================
export const getMyProperties = async (req, res) => {
  try {
    if (!req.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User info missing" });
    }

    const userId = req.id;

    const properties = await Property.find({ createdBy: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      total: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Error in getMyProperties:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching your properties." });
  }
};

// ========================
// Update Property
// ========================
export const updateMyProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID." });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    if (property.createdBy.toString() !== req.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this property." });
    }

    const allowedUpdates = [
      "title",
      "landmark",
      "pincode",
      "fullAddress",
      "pricePerNight",
      "description",
      "capacity",
      "images",
      "propertyImage",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        property[field] = req.body[field];
      }
    });

    if (property.status === "approved") {
      property.status = "pending";
    }

    const updatedProperty = await property.save();

    res.status(200).json({
      message: "Property updated successfully.",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Server error while updating property." });
  }
};

// ========================
// Get Property By ID
// ========================
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID." });
    }

    const property = await Property.findById(id)
      .populate("createdBy", "fullName email phone")
      .select("-__v");

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({
      message: "Property retrieved successfully.",
      property,
    });
  } catch (error) {
    console.error("Error getting property:", error);
    res.status(500).json({ message: "Server error while getting property." });
  }
};
