// src/Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../Styles/login.css"; // Correct CSS import

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
    aadhaar: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <h2>AasraSewa - User Login</h2>
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
            "aadhaar",
          ].map((field) => (
            <input
              key={field}
              type={
                field === "email"
                  ? "email"
                  : field === "password"
                  ? "password"
                  : field === "age"
                  ? "number"
                  : "text"
              }
              name={field}
              placeholder={
                field.charAt(0).toUpperCase() +
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

          <button type="submit" className="login-button">
            Login & Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
