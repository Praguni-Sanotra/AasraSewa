import React from "react";
import { motion } from "framer-motion";
import Header from "../src/Components/Header";
import HeroSection from "../src/Components/HeroSection";
import Listings from "../src/Components/Listing";
import Footer from "../src/Components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <Listings />
      <Footer />
    </div>
  );
}

export default App;
