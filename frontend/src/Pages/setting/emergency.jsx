import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import "../../Styles/setting/emergency.css";

const EmergencyContact = () => {
  const [phone, setPhone] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getProfile().then(res => {
      if (res.success) {
        const user = res.data.user;
        setPhone(user.emergencyContact?.phone || "");
        setSelectedState(user.emergencyContact?.state || "");
      }
    });
  }, []);

  const handleAddContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    await apiService.updateProfile({
      emergencyContact: {
        phone,
        state: selectedState,
      },
    });
    setLoading(false);
    navigate("/settings");
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir",
    "Ladakh", "Puducherry", "Chandigarh", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu"
  ];

  return (
    <div className="emergency-wrapper">
      <div className="emergency-page">
        <h2>Emergency Contact</h2>
        <p>Add a phone number of your guardian or family member in case of emergency:</p>
        <input
          type="tel"
          placeholder="Enter 10-digit phone number"
          value={phone}
          onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="10"
        />
        <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
          <option value="">Select State</option>
          {indianStates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <button
          onClick={handleAddContact}
          disabled={loading || phone.length < 10 || selectedState === ""}
        >
          {loading ? "Saving..." : "Add Contact"}
        </button>
      </div>
    </div>
  );
};

export default EmergencyContact;
