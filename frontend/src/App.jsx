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
import Results from "./Pages/Results";
import House from "./Pages/House";

// Layout component
const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // ✅ changed from "/"

  return (
    <div className="app-wrapper">
      {/* Conditionally render Header */}
      {!isLoginPage && <Header />}

      {/* Main Content */}
      <main className="app-main container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} /> {/* ✅ redirect root to /login */}
          <Route path="/login" element={<Login />} /> {/* ✅ moved login here */}

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

          {/* Redirect from old route */}
          <Route path="/explore" element={<Navigate to="/home" replace />} />

          {/* 404 Not Found */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>
            }
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
