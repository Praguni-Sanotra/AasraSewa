import React, { useState } from "react";
import "../../Styles/Setting/Medical.css";

const Medical = () => {
  const [formData, setFormData] = useState({
    problem: "",
    doctor: "",
    medicines: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="medical-page">
      <h2>Medical Details</h2>
      <form>
        <label>Problem<textarea name="problem" value={formData.problem} onChange={handleChange} /></label>
        <label>Doctor Info<input type="text" name="doctor" value={formData.doctor} onChange={handleChange} /></label>
        <label>Medicines<textarea name="medicines" value={formData.medicines} onChange={handleChange} /></label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Medical;
