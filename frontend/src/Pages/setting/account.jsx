import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import cloudinaryService from "../../services/cloudinary";
import "../../Styles/setting/account.css";
import { FaLock } from "react-icons/fa";

const Account = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    aadhaarImage: "",
    phone: "",
    email: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    apiService.getProfile().then(res => {
      if (res.success) {
        const user = res.data.user;
        setFormData({
          fullName: user.fullName || "",
          gender: user.gender || "",
          aadhaarImage: user.aadhaarImage || "",
          phone: user.phone || "",
          email: user.email || "",
          age: user.age || "",
        });
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAadhaarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const result = await cloudinaryService.uploadImage(file, "aadhaar");
    setUploading(false);
    if (result.success) {
      setFormData({ ...formData, aadhaarImage: result.url });
    } else {
      setUploadError(result.error || "Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Exclude email from update
    const { email, ...dataToSend } = formData;
    await apiService.updateProfile(dataToSend);
    setLoading(false);
    navigate("/settings");
  };

  return (
    <div className="account-page">
      <h2>Edit Profile</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        </label>
        <label>
          Gender
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Aadhaar Photo
          <input type="file" accept="image/*" name="aadhaarImage" onChange={handleAadhaarChange} />
          {uploading && <span>Uploading...</span>}
          {uploadError && <span style={{color:'red'}}>{uploadError}</span>}
          {formData.aadhaarImage && (
            <div style={{marginTop:'8px'}}>
              <img src={formData.aadhaarImage} alt="Aadhaar Preview" style={{maxWidth:'200px', maxHeight:'120px', border:'1px solid #ccc'}} />
            </div>
          )}
        </label>
        <label>
          Phone
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Email
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="email" name="email" value={formData.email} readOnly style={{ background: '#f5f5f5' }} />
            <FaLock style={{ marginLeft: 8, color: '#888' }} title="Email cannot be changed" />
          </div>
        </label>
        <label>
          Age
          <input type="number" name="age" value={formData.age} onChange={handleChange} min={18} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default Account;
