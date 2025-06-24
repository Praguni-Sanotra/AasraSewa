import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="min-h-screen w-full flex items-center justify-center px-6 bg-white text-black"
      style={{ paddingTop: "8rem" }} // Inline top padding to push content down
    >
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#a78bfa", // Light purple
          }}
        >
          Find Your <span className="text-blue-600">Aasra</span> with Sewa
        </h1>

        <p
          className="text-lg sm:text-xl text-gray-700 font-normal"
          style={{
            fontFamily: "'Inter', sans-serif",
            lineHeight: "1.6",
          }}
        >
          Discover futuristic stays, unique experiences, and seamless bookings with{" "}
          <span className="font-medium text-blue-500">AasraSewa</span>.
        </p>
      </motion.div>
    </section>
  );
}
