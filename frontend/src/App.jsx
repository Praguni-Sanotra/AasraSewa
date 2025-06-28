// App.js or App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";

import Login from "./Pages/login";
import Home from "./Pages/Home";
import Host from "./Pages/Host";
import Results from "./Pages/Filter";
import House from "./Pages/House";
import PropertyDetails from "./Pages/PropertyDetails";
import Payment from "./Pages/Payment";
import Accommodation from "./Pages/Accommodation"; // ✅ Added Accommodation page

// Layout component
const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app-wrapper">
      {/* Conditionally render Header */}
      {!isLoginPage && <Header />}

      {/* Main Content */}
      <main className="app-main container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={
              <>
                <HeroSection />
                <Home />
              </>
            }
          />
          <Route path="/host" element={<Host />} />
          <Route path="/results" element={<Results />} />
          <Route path="/house" element={<House />} />

          {/* ✅ New Routes */}
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/accommodation" element={<Accommodation />} />

          {/* Redirect from old route */}
          <Route path="/explore" element={<Navigate to="/home" replace />} />

          {/* 404 Not Found */}
          <Route
            path="*"
            element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>}
          />
        </Routes>
      </main>

      {/* Conditionally render Footer */}
      {!isLoginPage && <Footer />}
    </div>
  );
};

// App wrapper
const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
