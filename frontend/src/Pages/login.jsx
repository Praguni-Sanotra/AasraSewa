import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    console.log("User Details (optional):", formData);
    navigate("/home"); // ✅ Direct navigation without validation
  };

  return (
    <div className="login-container">
      <style>{`
        * { box-sizing: border-box; }
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom right, #eff6ff, #e0f2fe, #fef3c7);
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
        }
        .login-card {
          width: 100%;
          max-width: 520px;
          background: #ffffff;
          padding: 3rem 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid #cbd5e1;
        }
        .login-card h2 {
          font-size: 2rem;
          color: #1d4ed8;
          font-weight: 800;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .login-card p {
          font-size: 0.9rem;
          color: #6b7280;
          text-align: center;
          margin-bottom: 2rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
        .login-input, .login-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 1rem;
          font-size: 1rem;
          color: #1f2937;
          background: #f3f4f6;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }
        .login-input:focus, .login-select:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.35);
          background-color: #fff;
        }
        .login-button {
          width: 100%;
          background-color: #f59e0b;
          color: white;
          padding: 0.75rem;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .login-button:hover {
          background-color: #d97706;
        }
        @media (max-width: 500px) {
          .login-card { padding: 2rem 1.5rem; }
          .login-input, .login-select {
            font-size: 0.95rem;
            padding: 0.65rem 0.9rem;
          }
        }
      `}</style>

      <div className="login-card">
        <h2>AasraSewa - User Login</h2>
        <p>Enter your details to access emergency services</p>

        <form onSubmit={handleSubmit}>
          {[
            { name: "name", placeholder: "Full Name" },
            { name: "email", type: "email", placeholder: "Email Address" },
            { name: "password", type: "password", placeholder: "Password" },
            { name: "phone", placeholder: "Phone Number" },
            { name: "age", type: "number", placeholder: "Age" },
            { name: "bloodGroup", placeholder: "Blood Group" },
            { name: "address", placeholder: "Address" },
            { name: "aadhaar", placeholder: "Aadhaar Number" },
          ].map(({ name, type = "text", placeholder }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
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
