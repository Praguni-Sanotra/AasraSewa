// pages/Payment.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api.js";
import "./../Styles/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get property details from backend
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const result = await apiService.getPropertyById(id);
        
        if (result.success) {
          setProperty(result.data.property);
        } else {
          setError(result.error || "Property not found");
        }
      } catch (error) {
        setError("Failed to load property details");
        console.error("Property fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetails();
    } else {
      // Fallback to state if no ID in URL
      const { property: stateProperty } = location.state || {};
      if (stateProperty) {
        setProperty(stateProperty);
        setLoading(false);
      } else {
        setError("No property selected for payment");
        setLoading(false);
      }
    }
  }, [id, location.state]);

  const handlePayment = () => {
    alert(`Payment successful for ₹${property.pricePerNight}`);
    navigate("/home", {
      state: {
        mapLocation: {
          area: property.landmark || "Unknown Area",
          city: property.fullAddress || "Unknown City",
          pincode: property.pincode || "000000"
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="payment-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="payment-page">
        <h2 style={{ textAlign: "center" }}>No property selected for payment.</h2>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h2>Confirm Your Payment</h2>
      <div className="payment-card">
        <img src={property.propertyImage} alt={property.title} />
        <h3>{property.title}</h3>
        <p><strong>Location:</strong> {property.landmark}</p>
        <p><strong>Cost:</strong> ₹{property.pricePerNight}</p>
        <button onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default Payment;
