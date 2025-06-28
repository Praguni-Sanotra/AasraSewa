import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./../Styles/HeroSection.css";

import earth from "../assets/earth.jpg";
import fire from "../assets/fire.jpg";
import flood from "../assets/flood.jpg";
import flood1 from "../assets/flood1.jpg";
import people from "../assets/people.jpg";

const images = [earth, fire, flood, flood1, people];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      <div className="hero-overlay"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="hero-heading">
          Find Your <span className="highlight">Aasra</span> with Sewa
        </h1>
        <p className="hero-subtitle">
          Discover futuristic stays, unique experiences, and seamless bookings with{" "}
          <span className="hero-brand">AasraSewa</span>.
        </p>
      </motion.div>
    </section>
  );
}
