// pages/Home.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mapLocation = location.state?.mapLocation;

  const handleExplore = () => {
    navigate("/results");
  };

  const handleEmergency = () => {
    navigate("/emergency");
  };

  const properties = [
    {
      img: "https://placehold.co/250x150?text=Property+1",
      title: "Shelter 1",
      location: "Mumbai, India",
      rating: "★★★★☆ (4.5)",
    },
    {
      img: "https://placehold.co/250x150?text=Property+2",
      title: "Shelter 2",
      location: "Delhi, India",
      rating: "★★★☆☆ (3.8)",
    },
    {
      img: "https://placehold.co/250x150?text=Property+3",
      title: "Shelter 3",
      location: "Bangalore, India",
      rating: "★★★★★ (4.9)",
    },
  ];

  const generateGoogleMapURL = () => {
    if (!mapLocation) return "https://www.google.com/maps/embed?pb=!1m18...";
    const query = `${mapLocation.area}, ${mapLocation.city}, ${mapLocation.pincode}`;
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  };

  return (
    <div className="home-page">
      <section className="home-section">
        <div className="home-container">
          <div className="home-map-wrapper">
            <div className="home-map">
              <iframe
                title="Aasra Map"
                src={generateGoogleMapURL()}
                className="home-iframe"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className="home-button-container">
              <button className="home-explore-button" onClick={handleExplore}>
                Explore
              </button>
              <button className="home-emergency-button" onClick={handleEmergency}>
                Emergency
              </button>
            </div>
          </div>

          <h3 className="home-properties-title">Our Top Rated Shelters</h3>

          <div className="home-properties-grid">
            {properties.map((prop, index) => (
              <div key={index} className="home-property-card">
                <img src={prop.img} alt={prop.title} />
                <h4>{prop.title}</h4>
                <p>Location: {prop.location}</p>
                <p>Rating: {prop.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
