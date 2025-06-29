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

import Signup from "./Pages/Signup";
import LoginPage from "./Pages/LoginPage"; // ✅ Added LoginPage import
import Home from "./Pages/Home";
import Host from "./Pages/Host";
import Results from "./Pages/Filter";
import PropertyDetails from "./Pages/PropertyDetails";
import Payment from "./Pages/Payment";
import Accommodation from "./Pages/Accommodation";

// Layout component
const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login"; // ✅ Changed

  return (
    <div className="app-wrapper">
      {/* Conditionally render Header */}
      {!isAuthPage && <Header />}

      {/* Main Content */}
      <main className="app-main container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} /> {/* ✅ Default to login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} /> {/* ✅ Added login page */}

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
      {!isAuthPage && <Footer />}
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
