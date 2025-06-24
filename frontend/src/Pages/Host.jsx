import React, { useState } from "react";

export default function HostPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    price: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData, images);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    outline: "none",
    transition: "0.3s",
    background: "#ffffff",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        padding: "1rem",
        color: "#000000",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "2rem",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          border: "1px solid #e0e0e0",
          backdropFilter: "blur(6px)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            textAlign: "center",
            color: "#1e3a8a",
          }}
        >
          Become a <span style={{ color: "#3b82f6" }}>Host</span>
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "1.5rem",
            fontSize: "1rem",
          }}
        >
          Share your space, earn money, and join our hosting community.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Stacked inputs */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="location"
            placeholder="Property Location"
            value={formData.location}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="number"
            name="price"
            placeholder="Price per Night (₹)"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            style={inputStyle}
          />
          <textarea
            name="description"
            placeholder="Describe your property..."
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{
              ...inputStyle,
              resize: "none",
              marginBottom: "1.5rem",
            }}
          ></textarea>

          {/* Image Upload */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                fontWeight: "600",
                fontSize: "1rem",
                marginBottom: "0.5rem",
                display: "block",
                color: "#374151",
              }}
            >
              Upload up to 4 Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{
                marginBottom: "1rem",
                fontSize: "0.9rem",
                color: "#1f2937",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                gap: "1rem",
              }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <img
                    src={img.url}
                    alt={`preview-${index}`}
                    style={{
                      width: "100%",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      background: "#ffffffcc",
                      border: "none",
                      color: "#ef4444",
                      fontWeight: "bold",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "1rem",
                    }}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.85rem",
              background: "linear-gradient(to right, #2563eb, #3b82f6)",
              color: "white",
              fontWeight: "bold",
              borderRadius: "14px",
              fontSize: "1.1rem",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 4px 14px rgba(59,130,246,0.4)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #1d4ed8, #2563eb)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #2563eb, #3b82f6)")
            }
          >
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
}
