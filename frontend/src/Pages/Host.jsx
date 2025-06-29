import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Host.css"; // Assuming you have a CSS file for styling

export default function HostPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    area: "",
    pincode: "",
    address: "",
    description: "",
    price: "",
  });

  const [wallImages, setWallImages] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWallImageUpload = (e, wall) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = {
      file,
      url: URL.createObjectURL(file),
    };

    setWallImages((prev) => ({
      ...prev,
      [wall]: imageData,
    }));
  };

  const removeWallImage = (wall) => {
    setWallImages((prev) => ({
      ...prev,
      [wall]: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!wallImages.front || !wallImages.back || !wallImages.left || !wallImages.right) {
      alert("Please upload images for all 4 walls.");
      return;
    }

    console.log("Form Submitted", formData, wallImages);

    // Navigate to property details and pass data
    navigate("/property/1", { state: { ...formData, wallImages } });
  };

  return (
    <div className="host-wrapper">
      <div className="host-container">
        <h2 className="host-title">
          Become a <span className="highlight">Host</span>
        </h2>
        <p className="host-subtitle">
          Share your space, earn money, and join our hosting community.
        </p>

        <form onSubmit={handleSubmit} className="host-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Property Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="area"
            placeholder="Area / Landmark"
            value={formData.area}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price per Night (₹)"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
          <textarea
            name="description"
            placeholder="Describe your property..."
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          ></textarea>

          <div className="image-upload-section">
            <label>Upload Images for Each Wall</label>
            {['front', 'back', 'left', 'right'].map((wall) => (
              <div key={wall} className="wall-upload-box">
                <label className="wall-label">{wall.charAt(0).toUpperCase() + wall.slice(1)} Wall:</label>
                {wallImages[wall] ? (
                  <div className="image-preview-box">
                    <img src={wallImages[wall].url} alt={`${wall} wall`} />
                    <button type="button" onClick={() => removeWallImage(wall)}>
                      ×
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleWallImageUpload(e, wall)}
                  />
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="submit-button">
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
}
