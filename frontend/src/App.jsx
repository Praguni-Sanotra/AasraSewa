import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext.jsx";

import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";

import Signup from "./Pages/Signup";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Host from "./Pages/Host";
import Results from "./Pages/Filter";
import PropertyDetails from "./Pages/PropertyDetails";
import Payment from "./Pages/Payment";
import Accommodation from "./Pages/Accommodation";
import ProtectedRoute from "./auth/ProtectedRoutes.jsx";

// Layout component
const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <div className="app-wrapper">
      {/* Conditionally render Header */}
      {!isAuthPage && <Header />}

      {/* Main Content */}
      <main className="app-main container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HeroSection />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/host"
            element={
              <ProtectedRoute>
                <Host />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route
            path="/property/:id"
            element={
              <ProtectedRoute>
                <PropertyDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accommodation"
            element={
              <ProtectedRoute>
                <Accommodation />
              </ProtectedRoute>
            }
          />
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
      {!isAuthPage && <Footer />}
    </div>
  );
};

// App wrapper
const App = () => (
  <AuthProvider>
    <Router>
      <Layout />
    </Router>
  </AuthProvider>
);

export default App;
