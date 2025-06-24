import React, { useState } from "react";
import { FaGlobe, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function HostButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 16px",
        fontSize: "14px",
        fontWeight: 600,
        color: "#000",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "9999px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.target.style.color = "#2563eb";
        e.target.style.border = "1px solid #93c5fd";
        e.target.style.backgroundColor = "#f1f5f9";
      }}
      onMouseOut={(e) => {
        e.target.style.color = "#000";
        e.target.style.border = "1px solid #ccc";
        e.target.style.backgroundColor = "#fff";
      }}
    >
      Host
    </button>
  );
}

function LanguageButton() {
  return (
    <button
      style={{
        width: "36px",
        height: "36px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "9999px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.target.style.border = "1px solid #93c5fd";
        e.target.style.backgroundColor = "#f1f5f9";
      }}
      onMouseOut={(e) => {
        e.target.style.border = "1px solid #ccc";
        e.target.style.backgroundColor = "#fff";
      }}
    >
      <FaGlobe style={{ color: "#000", fontSize: "16px" }} />
    </button>
  );
}

function DropdownButton({ open, setOpen }) {
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "9999px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.border = "1px solid #93c5fd";
          e.target.style.backgroundColor = "#f1f5f9";
        }}
        onMouseOut={(e) => {
          e.target.style.border = "1px solid #ccc";
          e.target.style.backgroundColor = "#fff";
        }}
      >
        <FaBars style={{ color: "#000", fontSize: "16px" }} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "8px",
            width: "180px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: "none", padding: "8px 0", margin: 0 }}>
            <li
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#111",
              }}
              onClick={() => setOpen(false)}
              onMouseOver={(e) => (e.target.style.background = "#f9fafb")}
              onMouseOut={(e) => (e.target.style.background = "transparent")}
            >
              Help Center
            </li>
            <li
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#111",
              }}
              onClick={() => setOpen(false)}
              onMouseOver={(e) => (e.target.style.background = "#f9fafb")}
              onMouseOut={(e) => (e.target.style.background = "transparent")}
            >
              Settings
            </li>
            <li
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#dc2626",
              }}
              onClick={() => setOpen(false)}
              onMouseOver={(e) => (e.target.style.background = "#fef2f2")}
              onMouseOut={(e) => (e.target.style.background = "transparent")}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleHostClick = () => {
    navigate("/host");
  };

  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        position: "fixed",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
        }}
      >
        {/* Logo + Brand */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "contain",
              marginRight: "10px",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#000" }}>
            AasraSewa
          </span>
        </div>

        {/* Buttons on the Right */}
        <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
          <HostButton onClick={handleHostClick} />
          <LanguageButton />
          <DropdownButton open={dropdownOpen} setOpen={setDropdownOpen} />
        </div>
      </div>
    </header>
  );
}
