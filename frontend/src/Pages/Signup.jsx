import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../Styles/Signup.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    aadhaarImage: null,
    familyCount: "",
    aadhaarPreview: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "aadhaarImage") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        aadhaarImage: file,
        aadhaarPreview: file ? URL.createObjectURL(file) : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Details:", formData);
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image-container">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>
        <h2>AasraSewa - User SignUp</h2>
        <p>Enter your details to access emergency services</p>

        <form onSubmit={handleSubmit}>
          {[
            "name",
            "email",
            "password",
            "phone",
            "age",
            "bloodGroup",
            "address",
            "familyCount",
          ].map((field) => (
            <input
              key={field}
              type={
                field === "email"
                  ? "email"
                  : field === "password"
                  ? "password"
                  : field === "age" || field === "familyCount"
                  ? "number"
                  : "text"
              }
              name={field}
              placeholder={
                field === "familyCount"
                  ? "Total Family Members"
                  : field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
              }
              value={formData[field]}
              onChange={handleChange}
              className="login-input"
            />
          ))}

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="login-select"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Aadhaar Upload Section */}
          <div className="aadhaar-section">
            <label className="login-label">Upload Aadhaar Photo:</label>
            <div className="aadhaar-upload-area">
              <span className="aadhaar-instruction">Click or tap to upload</span>
              <input
                type="file"
                name="aadhaarImage"
                accept="image/*"
                onChange={handleChange}
                className="aadhaar-file-input"
              />
            </div>

            {formData.aadhaarPreview && (
              <img
                src={formData.aadhaarPreview}
                alt="Aadhaar Preview"
                className="aadhaar-preview-image"
              />
            )}
          </div>

          <button type="submit" className="login-button">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
