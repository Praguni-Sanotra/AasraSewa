import React, { useState } from "react";
import "../../Styles/Setting/Account.css";

const Account = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    aadhaarPhoto: null,
    phone: "",
    email: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className="account-page">
      <h2>Edit Profile</h2>
      <form className="account-form">
        <label>Name<input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
        <label>Gender<select name="gender" value={formData.gender} onChange={handleChange}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></label>
        <label>Aadhaar Photo<input type="file" name="aadhaarPhoto" onChange={handleChange} /></label>
        <label>Phone<input type="tel" name="phone" value={formData.phone} onChange={handleChange} /></label>
        <label>Email<input type="email" name="email" value={formData.email} onChange={handleChange} /></label>
        <label>Date of Birth<input type="date" name="dob" value={formData.dob} onChange={handleChange} /></label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Account;