import React, { useState } from 'react';
import '../styles/activehost.css';

const dummyHosts = [
  {
    id: 1,
    name: 'Amit Sharma',
    location: 'Delhi, India',
    email: 'amitsharma@gmail.com',
    status: 'Active',
    phone: '9876543210',
    joined: '2023-08-10',
    bloodGroup: 'B+',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    id: 2,
    name: 'Ritika Verma',
    location: 'Mumbai, India',
    email: 'ritikaverma@yahoo.com',
    status: 'Active',
    phone: '9090987876',
    joined: '2022-05-12',
    bloodGroup: 'O+',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 3,
    name: 'John Dsouza',
    location: 'Goa, India',
    email: 'john.d@email.com',
    status: 'Active',
    phone: '9812345678',
    joined: '2023-03-05',
    bloodGroup: 'AB-',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    id: 4,
    name: 'Nikhil Taneja',
    location: 'Chandigarh, India',
    email: 'nikhil.t@gmail.com',
    status: 'Active',
    phone: '9123456789',
    joined: '2023-01-25',
    bloodGroup: 'A+',
    image: 'https://randomuser.me/api/portraits/men/88.jpg',
  },
];

const ActiveHosts = () => {
  const [visibleHostId, setVisibleHostId] = useState(null);

  const toggleDetails = (id) => {
    setVisibleHostId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className="active-hosts-section">
      <div className="active-hosts-box">
        <h1 className="dashboard-title">Active Hosts</h1>
        <p className="dashboard-subtitle">
          Monitor currently listed hosts and their activity status.
        </p>

        <div className="active-host-list">
          {dummyHosts.map((host) => (
            <div key={host.id} className="active-host-card">
              <img src={host.image} alt={host.name} className="active-host-avatar" />
              <div className="active-host-info">
                <h3 className="active-host-name">{host.name}</h3>
                <p className="host-email">✉️ {host.email}</p>
                <p className="host-location">📍 {host.location}</p>
                <p className="active-host-status">
                  <span className="active-host-status-dot" />
                  {host.status}
                </p>

                <button
                  className="view-details-btn"
                  onClick={() => toggleDetails(host.id)}
                >
                  {visibleHostId === host.id ? 'Hide Details' : 'View Details'}
                </button>

                {visibleHostId === host.id && (
                  <div className="host-details">
                    <p><strong>Phone:</strong> 📞 {host.phone}</p>
                    <p><strong>Blood Group:</strong> 🩸 {host.bloodGroup}</p>
                    <p><strong>Joined:</strong> 📅 {host.joined}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveHosts;

