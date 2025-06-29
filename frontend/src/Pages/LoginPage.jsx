import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css";
import logo from "../assets/logo.png"; // ✅ Import logo

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    console.log("Login data submitted:", formData);
    // Store credentials in localStorage if rememberMe is checked (optional logic)
    if (formData.rememberMe) {
      localStorage.setItem("rememberedEmail", formData.email);
    }
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* ✅ Logo at top */}
        <div className="image-container">
          <img src={logo} alt="Logo" className="login-logo" />
        </div>

        <h2>Welcome Back!</h2>
        <p>Please login to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />

          {/* ✅ Remember me */}
          <label className="remember-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="remember-checkbox"
            />
            Remember Me
          </label>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            SignUp
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
