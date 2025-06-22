import React from "react";
import "../Styles/Footer.css"; 

export default function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} AasraSewa. Futuristic stays, made simple.</span>
    </footer>
  );
}