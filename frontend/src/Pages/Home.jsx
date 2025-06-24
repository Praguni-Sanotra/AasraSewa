import React from "react";

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#1f2937",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', sans-serif",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      <section
        style={{
          width: "100%",
          padding: "4rem 1rem",
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 1rem",
          }}
        >
          {/* Map + Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "350px",
                height: "220px",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "1px solid #d1d5db",
                flexShrink: 0,
              }}
            >
              <iframe
                title="Aasra Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019504628447!2d-122.41941518468156!3d37.77492977975998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e2d6b1d4345%3A0xcee47c4f84e5b11e!2sShelter!5e0!3m2!1sen!2sin!4v1634200342789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div
              style={{
                textAlign: "center",
                maxWidth: "500px",
              }}
            >
              <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>
                AasraSewa
              </h2>
              <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>Smart Relief</p>
              <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>Safe Shelter</p>
              <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>Stronger Community</p>

              <button
                style={{
                  marginTop: "1.5rem",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#ef4444",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  border: "none",
                  touchAction: "manipulation",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#f87171")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
              >
                Explore
              </button>
            </div>
          </div>

          {/* Property Cards */}
          <div style={{ textAlign: "center", width: "100%" }}>
            <h3
              style={{
                fontSize: "clamp(1.5rem, 4vw, 1.875rem)",
                fontWeight: "bold",
                marginBottom: "1.5rem",
              }}
            >
              Our Top Rated Properties
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
                width: "100%",
              }}
            >
              {[
                {
                  img: "https://placehold.co/250x150?text=Property+1",
                  title: "Property 1",
                  location: "Mumbai, India",
                  rating: "★★★★☆ (4.5)",
                },
                {
                  img: "https://placehold.co/250x150?text=Property+2",
                  title: "Property 2",
                  location: "Delhi, India",
                  rating: "★★★☆☆ (3.8)",
                },
                {
                  img: "https://placehold.co/250x150?text=Property+3",
                  title: "Property 3",
                  location: "Bangalore, India",
                  rating: "★★★★★ (4.9)",
                },
              ].map((prop, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #d1d5db",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <img
                    src={prop.img}
                    alt={prop.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <h4 style={{ fontSize: "1.25rem", fontWeight: 600 }}>{prop.title}</h4>
                  <p>Location: {prop.location}</p>
                  <p>Rating: {prop.rating}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
