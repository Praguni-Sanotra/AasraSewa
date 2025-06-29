// pages/PropertyDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../Styles/PropertyDetails.css";

const dummyProperties = [
  {
    id: 1,
    title: "Villa Serenity",
    capacity: 3,
    location: "Delhi",
    area: "Green Park",
    pincode: "110016",
    img: "https://placehold.co/250x150?text=Villa+1",
    cost: 1500,
    description: "A peaceful and secure villa in Green Park.",
    distance: "5km"
  },
  {
    id: 2,
    title: "Haven Nest",
    capacity: 5,
    location: "Mumbai",
    area: "Bandra",
    pincode: "400050",
    img: "https://placehold.co/250x150?text=Villa+2",
    cost: 2200,
    description: "Spacious haven near the coast.",
    distance: "8km"
  },
  {
    id: 3,
    title: "Sunshine Home",
    capacity: 2,
    location: "Pune",
    area: "Kothrud",
    pincode: "411038",
    img: "https://placehold.co/250x150?text=Villa+3",
    cost: 0,
    description: "Budget-friendly small house.",
    distance: "3km"
  },
  {
    id: 4,
    title: "Harmony House",
    capacity: 6,
    location: "Chennai",
    area: "Adyar",
    pincode: "600020",
    img: "https://placehold.co/250x150?text=Villa+4",
    cost: 3000,
    description: "Large disaster-proof home in a calm neighborhood.",
    distance: "10km"
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = dummyProperties.find((prop) => prop.id === parseInt(id));

  if (!property) {
    return <h2 style={{ textAlign: "center" }}>Property not found</h2>;
  }

  const handleRentClick = () => {
    if (property.cost === 0) {
      alert("✅ Proceeding to accommodate in the shelter...");
      setTimeout(() => {
        navigate("/accommodation", { state: { property } });
      }, 1000);
    } else {
      navigate("/payment", { state: { property } });
    }
  };

  const handleTransportClick = () => {
    navigate("/transport");
  };

  return (
    <div className="property-details">
      <div className="spacer"></div>
      <div className="property-card">
        <img src={property.img} alt={property.title} className="property-img" />
        <div className="property-info">
          <h2>{property.title}</h2>
          <p><strong>📍 Location:</strong> {property.location}</p>
          <p><strong>🏘️ Area:</strong> {property.area}</p>
          <p><strong>📮 Pincode:</strong> {property.pincode}</p>
          <p><strong>👥 Capacity:</strong> {property.capacity} people</p>
          <p><strong>💰 Cost:</strong> ₹{property.cost === 0 ? "Free" : property.cost}</p>
          <p><strong>ℹ️ Description:</strong> {property.description}</p>
          <p><strong>📏 Distance from you:</strong> {property.distance}</p>
        </div>
      </div>

      <div className="action-buttons">
        <button className="rent-btn" onClick={handleRentClick}>
          Rent
        </button>
        <button className="transport-btn" onClick={handleTransportClick}>
          Transport Facility
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
