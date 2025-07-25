import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/setting/emergency.css";

const EmergencyContact = () => {
  const [phone, setPhone] = useState("");
  const [selectedState, setSelectedState] = useState(""); // New state field
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [stateError, setStateError] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    setPhone(onlyDigits);
    setIsValid(onlyDigits.length === 10);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setStateError(false);
  };

  const handleAddContact = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setIsValid(false);
      return;
    }

    if (selectedState === "") {
      setStateError(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/settings");
    }, 2000);
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
          onChange={handlePhoneChange}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength="10"
        />
        {!isValid && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
            Please enter a valid 10-digit phone number.
          </p>
        )}

        <select value={selectedState} onChange={handleStateChange}>
          <option value="">Select State</option>
          {indianStates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {stateError && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
            Please select your state.
          </p>
        )}

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
