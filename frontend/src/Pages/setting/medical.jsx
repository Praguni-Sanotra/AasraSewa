import React, { useState } from "react";
import "../../Styles/setting/medical.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Medical = () => {
  const [formData, setFormData] = useState({
    problem: "",
    doctor: "",
    medicines: "",
    age: "",
    bloodGroup: "",
    allergies: "",
    chronicDiseases: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ["problem", "doctor", "medicines", "age", "bloodGroup"];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    setLoading(true);

    const timestamp = new Date().toLocaleString();
    const savedData = {
      ...formData,
      savedAt: timestamp,
    };

    console.log("Medical Data Saved:", savedData);
    toast.success("Medical info saved for disaster response!");

    setTimeout(() => {
      setLoading(false);
      navigate("/settings");
    }, 2000);
  };

  return (
    <div className="medical-page">
      <h2 className="medical-heading">Medical Information</h2>
      <form className="medical-form" onSubmit={handleSubmit}>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          required
        />

        <label htmlFor="bloodGroup">Blood Group</label>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select your blood group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <label htmlFor="problem">Medical Problem</label>
        <textarea
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          placeholder="Describe medical issue (e.g. asthma)"
          required
        />

        <label htmlFor="doctor">Doctor's Info</label>
        <input
          type="text"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          placeholder="Name and contact (if available)"
          required
        />

        <label htmlFor="medicines">Medicines</label>
        <textarea
          name="medicines"
          value={formData.medicines}
          onChange={handleChange}
          placeholder="List regular or essential medicines"
          required
        />

        <label htmlFor="allergies">Allergies</label>
        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Mention known allergies"
        />

        <label htmlFor="chronicDiseases">Chronic Diseases</label>
        <textarea
          name="chronicDiseases"
          value={formData.chronicDiseases}
          onChange={handleChange}
          placeholder="e.g. Diabetes, Hypertension"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Details"}
        </button>
      </form>
    </div>
  );
};

export default Medical;
