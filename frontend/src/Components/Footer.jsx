import React from "react";

export default function Footer() {
  return (
    <footer className="w-full text-center py-4 bg-blue-100 text-gray-700 text-sm border-t">
      © {new Date().getFullYear()} <span className="font-semibold">AasraSewa</span>. Futuristic stays, made simple.
    </footer>
  );
}
