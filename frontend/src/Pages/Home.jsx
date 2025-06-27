import React from "react";
import { useNavigate } from "react-router-dom";
import "./../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/explore");
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

  return (
    <div className="home-page">
      <section className="home-section">
        <div className="home-container">
          <div className="home-map-wrapper">
            <div className="home-map">
              <iframe
                title="Aasra Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019504628447!2d-122.41941518468156!3d37.77492977975998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e2d6b1d4345%3A0xcee47c4f84e5b11e!2sShelter!5e0!3m2!1sen!2sin!4v1634200342789!5m2!1sen!2sin"
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
