import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import HostVerification from './pages/HostVerification';
import ActiveHosts from './pages/activehost';
import Messages from './pages/message';
import ActiveUsers from './pages/activeuser';
import HostPDFViewer from './pages/HostPDFViewer';
import HostDetails from './pages/HostDetails'; // ✅ Added import

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [active, setActive] = useState('host-verification');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleNavClick = (section) => {
    setActive(section);
    setSidebarOpen(false);
  };

  const renderMainContent = () => {
    switch (active) {
      case 'host-verification':
        return <HostVerification />;
      case 'active-hosts':
        return <ActiveHosts />;
      case 'messages':
        return <Messages />;
      case 'active-users':
        return <ActiveUsers />;
      default:
        return <div>Page not found</div>;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLoginSuccess} />;
  }

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
            <li
              className={active === 'host-verification' ? 'active' : ''}
              onClick={() => handleNavClick('host-verification')}
            >
              <span className="icon">🛡️</span> Host Verification
            </li>
            <li
              className={active === 'active-hosts' ? 'active' : ''}
              onClick={() => handleNavClick('active-hosts')}
            >
              <span className="icon">🏠</span> Active Hosts
            </li>
            <li
              className={active === 'messages' ? 'active' : ''}
              onClick={() => handleNavClick('messages')}
            >
              <span className="icon">💬</span> Messages
            </li>
            <li
              className={active === 'active-users' ? 'active' : ''}
              onClick={() => handleNavClick('active-users')}
            >
              <span className="icon">🧑‍💻</span> Active Users
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area with Routes */}
      <main
        className="main-content"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        <Routes>
          <Route path="/" element={renderMainContent()} />
          <Route path="/host/:id/verify" element={<HostPDFViewer />} />
          <Route path="/host/:id/details" element={<HostDetails />} /> {/* ✅ Added */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </main>

      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
