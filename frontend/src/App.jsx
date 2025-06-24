import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";
import Login from "./Pages/login";
import Home from "./Pages/Home";
import Host from "./Pages/Host"; // ✅ Import the Host component

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Show Header only if not on login page */}
      {!isLoginPage && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <>
                <HeroSection />
                <Home />
              </>
            }
          />
          {/*  Added Host page route */}
          <Route path="/host" element={<Host />} />
        </Routes>
      </main>

      {/* Show Footer only if not on login page */}
      {!isLoginPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
