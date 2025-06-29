import Property from "../models/property.model.js";
import mongoose from "mongoose";

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
      disasterFree,
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
      disasterFree,
      propertyImage, // optional
    });

    const savedProperty = await newProperty.save();

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

    // Apply filters only if at least one is passed
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

export const updateMyProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID." });
    }

    // Find property
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    // Check ownership
    if (property.createdBy.toString() !== req.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this property." });
    }

    // List of allowed fields to update
    const allowedUpdates = [
      "title",
      "landmark",
      "pincode",
      "fullAddress",
      "pricePerNight",
      "description",
      "capacity",
      "images",
      "disasterFree",
      "propertyImage",
    ];

    // Apply updates from request body
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        property[field] = req.body[field];
      }
    });
    // If property was approved earlier, reset status to pending
    if (property.status === "approved") {
      property.status = "pending";
    }
    // Save updated property
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
