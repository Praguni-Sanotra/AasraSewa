import React from "react";
import { motion } from "framer-motion";
import "../Styles/Header.css"; // ✅ Correct for regular CSS

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      <div className="logo">AasraSewa</div>
      <nav>
        <a href="#">Home</a>
        <a href="#">Explore</a>
        <a href="#">About</a>
        <a href="#">Login</a>
      </nav>
    </motion.header>
  );
}