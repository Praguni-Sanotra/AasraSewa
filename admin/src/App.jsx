// ✅ src/App.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, Outlet } from 'react-router-dom';
import './App.css';

import Login from './pages/Login.jsx';
import ActiveUser from './pages/activeuser.jsx';
import ActiveHost from './pages/activehost.jsx';
import HostVerification from './pages/HostVerification.jsx';
import HostDetails from './pages/HostDetails.jsx';
import HostPDFViewer from './pages/HostPDFViewer.jsx';
import Message from './pages/message.jsx';

// Auth context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Protected route component
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// Dashboard layout with sidebar
function DashboardLayout() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dashboard-layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button
          className="hamburger"
          aria-label="Toggle sidebar"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <span className="mobile-title">
          <span className="logo-dot" /> Admin
        </span>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>
      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <h2>
            <span className="logo-dot" /> Admin
          </h2>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} end>
                <span className="icon">🛡️</span> Host Verification
              </NavLink>
            </li>
            <li>
              <NavLink to="/activehost" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">🏠</span> Active Hosts
              </NavLink>
            </li>
            <li>
              <NavLink to="/activeuser" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">🧑‍💻</span> Active Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/message" className={({ isActive }) => isActive ? 'active' : ''}>
                <span className="icon">💬</span> Messages
              </NavLink>
            </li>
            <li>
              <button onClick={logout} className="sidebar-logout">🚪 Logout</button>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Content Area */}
      <main className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        <Outlet />
      </main>
      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => window.location.href = '/dashboard'} />} />
      <Route element={isLoggedIn ? <DashboardLayout /> : <></>}>
        <Route path="/dashboard" element={<ProtectedRoute><HostVerification /></ProtectedRoute>} />
        <Route path="/activehost" element={<ProtectedRoute><ActiveHost /></ProtectedRoute>} />
        <Route path="/activeuser" element={<ProtectedRoute><ActiveUser /></ProtectedRoute>} />
        <Route path="/host-verification" element={<ProtectedRoute><HostVerification /></ProtectedRoute>} />
        <Route path="/host-details/:id" element={<ProtectedRoute><HostDetails /></ProtectedRoute>} />
        <Route path="/host-pdf/:id" element={<ProtectedRoute><HostPDFViewer /></ProtectedRoute>} />
        <Route path="/message" element={<ProtectedRoute><Message /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
