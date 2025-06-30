import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import cloudinaryService from "../services/cloudinary.js";
import logo from "../assets/logo.png";
import { TbXboxX } from "react-icons/tb";

import "../Styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
  });
  const [aadhaarImage, setAadhaarImage] = useState(null);
  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAadhaarImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAadhaarImage(file);
      setAadhaarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    const requiredFields = [
      "fullName",
      "email",
      "password",
      "phone",
      "age",
      "gender",
      "bloodGroup",
      "address",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    if (!aadhaarImage) {
      setError("Please upload your Aadhaar image");
      return;
    }

    setLoading(true);

    try {
      // Upload aadhaar image to Cloudinary
      const uploadResult = await cloudinaryService.uploadImage(
        aadhaarImage,
        "aadhaar"
      );

      if (!uploadResult.success) {
        setError("Failed to upload Aadhaar image. Please try again.");
        setLoading(false);
        return;
      }

      // Prepare user data for registration
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
        aadhaarImage: uploadResult.url,
      };

      const result = await register(userData);
      console.log("Register result:", result);

      if (result.data.success) {
        // Registration successful, redirect to login
        navigate("/login", {
          state: {
            message: result.message || "Registration successful! Please login.",
          },
        });
      } else {
        // Registration failed, show error and DO NOT navigate
        setError(result.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image-container">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
        <h2>AasraSewa - User SignUp</h2>
        <p>Enter your details to access emergency services</p>

        {error && (
          <div
            className="error-message"
            style={{ color: "red", fontWeight: "bold", marginBottom: "1rem" }}
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { name: "fullName", type: "text", placeholder: "Name" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "password", type: "password", placeholder: "Password" },
            { name: "phone", type: "text", placeholder: "Phone" },
            { name: "age", type: "number", placeholder: "Age" },
            { name: "address", type: "text", placeholder: "Address" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="login-input"
              required
              disabled={loading}
            />
          ))}

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="login-select"
            required
            disabled={loading}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="login-select"
            required
            disabled={loading}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Aadhaar Upload Section */}
          <div className="aadhaar-section">
            <label className="login-label">
              Upload Aadhaar Photo (Required):
            </label>
            <div className="aadhaar-upload-area">
              {aadhaarPreview ? (
                <div className="aadhaar-preview-container">
                  <img
                    src={aadhaarPreview}
                    alt="Aadhaar Preview"
                    className="aadhaar-preview-image"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setAadhaarImage(null);
                      setAadhaarPreview(null);
                    }}
                    className="signup-remove-aadhaar-btn"
                    disabled={loading}
                    aria-label="Remove Aadhaar image"
                  >
                    <TbXboxX className="signup-remove-aadhaar-btn-icon" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="aadhaar-instruction">
                    Click or tap to upload
                  </span>
                  <input
                    type="file"
                    name="aadhaarImage"
                    accept="image/*"
                    onChange={handleAadhaarImageChange}
                    className="aadhaar-file-input"
                    disabled={loading}
                    required
                  />
                </>
              )}
            </div>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Creating Account..." : "SignUp"}
          </button>
        </form>

        <p className="signup-text">
          Already have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
