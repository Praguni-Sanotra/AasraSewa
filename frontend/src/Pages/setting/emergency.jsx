import React, { useState } from "react";
import "../../Styles/Setting/Emergency.css";

const EmergencyContact = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="emergency-page">
      <h2>Emergency Contact</h2>
      <p>Add a phone number of your guardian or a family member in case of emergency:</p>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button>Add Contact</button>
    </div>
  );
};

export default EmergencyContact;
