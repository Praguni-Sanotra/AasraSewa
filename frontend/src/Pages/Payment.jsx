// pages/Payment.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../Styles/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property } = location.state || {};

  if (!property) {
    return <h2 style={{ textAlign: "center" }}>No property selected for payment.</h2>;
  }

  const handlePayment = () => {
    alert(`Payment successful for ₹${property.cost}`);
    navigate("/home");
  };

  return (
    <div className="payment-page">
      <h2>Confirm Your Payment</h2>
      <div className="payment-card">
        <img src={property.img} alt={property.title} />
        <h3>{property.title}</h3>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Cost:</strong> ₹{property.cost}</p>
        <button onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default Payment; // Matches file name and import
