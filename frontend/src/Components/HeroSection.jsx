import React from "react";
import { motion } from "framer-motion";
import "../Styles/Hero.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <motion.div
        className="content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>
          Find Your <span className="highlight">Aasra</span> with Sewa
        </h1>
        <p>
          Discover futuristic stays, unique experiences, and seamless bookings with AasraSewa.
        </p>
        <motion.button
          whileHover={{ scale: 1.08, backgroundColor: "#00ffe7", color: "#1a2236" }}
          className="cta"
        >
          Start Exploring
        </motion.button>
      </motion.div>
    </section>
  );
}