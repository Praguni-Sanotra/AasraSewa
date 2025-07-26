import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Setting/Setting.css";

const Setting = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const settingsOptions = [
    { label: "Account", path: "/account" },
    { label: "Emergency Contact", path: "/emergency-contact" },
    { label: "Location", path: "/location" },
    { label: "Medical", path: "/medical" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Optional: Filter based on search
  const filteredOptions = settingsOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>

      <div className="settings-search">
        <input
          type="text"
          placeholder="Search for a setting..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="settings-buttons">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <button
              key={index}
              className="settings-button"
              onClick={() => handleNavigation(option.path)}
            >
              {option.label} <span>&#8250;</span>
            </button>
          ))
        ) : (
          <p style={{ padding: "10px", color: "#999" }}>No matching settings found</p>
        )}
      </div>
    </div>
  );
};

export default Setting;
