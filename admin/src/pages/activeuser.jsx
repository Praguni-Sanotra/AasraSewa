// src/pages/Activeuser.jsx
import React, { useEffect, useState } from 'react';
import '../styles/activeuser.css';

const ActiveUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Placeholder for backend fetch
    const fetchUsers = async () => {
      const dummyUsers = [
        {
          id: 1,
          name: 'Amit Sharma',
          location: 'Delhi, India',
          email: 'amitsharma@gmail.com',
          status: 'Active',
        },
        {
          id: 2,
          name: 'Ritika Verma',
          location: 'Mumbai, India',
          email: 'ritikaverma@yahoo.com',
          status: 'Active',
        },
        {
          id: 3,
          name: 'Rajeev Ranjan',
          location: 'Bangalore, India',
          email: 'rajeev.ranjan@gmail.com',
          status: 'Active',
        },
        {
          id: 4,
          name: 'Meena Iyer',
          location: 'Chennai, India',
          email: 'meenaiyer@gmail.com',
          status: 'Active',
        },
        {
          id: 5,
          name: 'Saurav Patel',
          location: 'Ahmedabad, India',
          email: 'sauravpatel@gmail.com',
          status: 'Active',
        },
      ];

      setUsers(dummyUsers);
    };

    fetchUsers();
  }, []);

  return (
    <section className="active-hosts-section">
      <div className="active-hosts-wrapper">
        <div className="active-hosts-box">
          <h1 className="dashboard-title">Active Users</h1>
          <p className="dashboard-subtitle">
            View and manage currently active users in the system.
          </p>

          {users.length === 0 ? (
            <p className="loading-text">Loading users...</p>
          ) : (
            <div className="host-list">
              {users.map((user) => (
                <div className="host-card" key={user.id}>
                  <div className="host-info">
                    <h3 className="host-name">👤 {user.name}</h3>
                    <p className="host-location">📍 {user.location}</p>
                    <p className="host-email">✉️ {user.email}</p>
                  </div>
                  <div className="host-status-chip">
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActiveUser;