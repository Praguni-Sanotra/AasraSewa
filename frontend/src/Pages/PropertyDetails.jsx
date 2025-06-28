// pages/PropertyDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../Styles/PropertyDetails.css";

const dummyProperties = [
  {
    id: 1,
    title: "Villa Serenity",
    capacity: 3,
    disasterFree: true,
    location: "Delhi",
    img: "https://placehold.co/250x150?text=Villa+1",
    cost: 1500,
  },
  {
    id: 2,
    title: "Haven Nest",
    capacity: 5,
    disasterFree: true,
    location: "Mumbai",
    img: "https://placehold.co/250x150?text=Villa+2",
    cost: 2200,
  },
  {
    id: 3,
    title: "Sunshine Home",
    capacity: 2,
    disasterFree: false,
    location: "Pune",
    img: "https://placehold.co/250x150?text=Villa+3",
    cost: 0,
  },
  {
    id: 4,
    title: "Harmony House",
    capacity: 6,
    disasterFree: true,
    location: "Chennai",
    img: "https://placehold.co/250x150?text=Villa+4",
    cost: 3000,
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
          <p><strong>👥 Capacity:</strong> {property.capacity} people</p>
          <p><strong>💰 Cost:</strong> ₹{property.cost}</p>
          <p>{property.disasterFree ? "✅ Disaster-Free" : "⚠ Not Disaster-Free"}</p>
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
