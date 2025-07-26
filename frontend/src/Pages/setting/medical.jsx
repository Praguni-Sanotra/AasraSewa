import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import "../../Styles/setting/medical.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Medical = () => {
  const [formData, setFormData] = useState({
    problem: "",
    doctor: "",
    medicines: "",
    allergies: "",
    chronicDiseases: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiService.getProfile().then(res => {
      if (res.success) {
        const user = res.data.user;
        setFormData({
          problem: user.medical?.problem || "",
          doctor: user.medical?.doctor || "",
          medicines: user.medical?.medicines || "",
          allergies: user.medical?.allergies || "",
          chronicDiseases: user.medical?.chronicDiseases || "",
        });
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await apiService.updateProfile({ medical: formData });
    setLoading(false);
    toast.success("Medical info saved for disaster response!");
    navigate("/settings");
  };

  return (
    <div className="medical-page">
      <h2 className="medical-heading">Medical Information</h2>
      <form className="medical-form" onSubmit={handleSubmit}>
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
