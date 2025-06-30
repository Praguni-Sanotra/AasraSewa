import { useState } from 'react'
import './App.css'

function App() {
  const [active, setActive] = useState('host-verification')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNavClick = (section) => {
    setActive(section)
    setSidebarOpen(false)
  }

  return (
    <div className="dashboard-container">
      <header className="mobile-header">
        <button
          className="hamburger"
          aria-label="Open sidebar"
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
              <span className="icon">👤</span> Active Users
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        <h1>Dashboard</h1>
        {active === 'host-verification' && (
          <section>
            <h2>Host Verification</h2>
            <p>This is the Host Verification section.</p>
            <div className="pdf-container">
              <iframe
                src="/sample-property-report.pdf"
                title="Property Analysis Report"
                width="100%"
                height="600px"
                style={{ border: '1px solid #ccc', borderRadius: '8px' }}
              />
            </div>
          </section>
        )}
        {active === 'active-hosts' && (
          <section>
            <h2>Active Hosts</h2>
            <p>This is the Active Hosts section.</p>
          </section>
        )}
        {active === 'messages' && (
          <section>
            <h2>Messages</h2>
            <p>This is the Messages section.</p>
          </section>
        )}
        {active === 'active-users' && (
          <section>
            <h2>Active Users</h2>
            <p>This is the Active Users section.</p>
          </section>
        )}
      </main>
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}

export default App
