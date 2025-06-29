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
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Host from "./Pages/Host";
import Filter from "./Pages/Filter"; // ✅ Using your existing page
import ResultsPage from "./Pages/Property"; // ✅ Separate results display
import PropertyDetails from "./Pages/PropertyDetails";
import Payment from "./Pages/Payment";
import Accommodation from "./Pages/Accommodation";
import Transport from "./Pages/Transport";

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

  return (
    <div className="app-wrapper">
      {!isAuthPage && <Header />}

      <main className="app-main container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />

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
          <Route path="/filter" element={<Filter />} /> {/* ✅ Filter Page */}
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/transport" element={<Transport />} />

          <Route path="/explore" element={<Navigate to="/home" replace />} />

          <Route
            path="*"
            element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>}
          />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
