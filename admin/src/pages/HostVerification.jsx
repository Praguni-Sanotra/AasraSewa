// src/pages/HostVerification.jsx
import React, { useState } from 'react';
import '../styles/HostVerification.css';
import { useNavigate } from 'react-router-dom';
import {
  FiSearch,
  FiEye,
  FiTrash2,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';

const dummyHosts = [
  {
    id: 1,
    name: 'Amit Sharma',
    email: 'amitsharma@gmail.com',
    status: 'Pending',
    verified: false,
    phone: '9876543210',
    city: 'Delhi',
    address: '123 Sector 21, Dwarka',
    gender: 'Male',
    age: 45,
    experience: '5 years',
    language: 'Hindi, English',
    description: 'I have been hosting travelers and volunteers for years.',
    report: '/sample-property-report.pdf',
  },
  {
    id: 2,
    name: 'Ritika Verma',
    email: 'ritikaverma@yahoo.com',
    status: 'Pending',
    verified: true,
    phone: '9876501234',
    city: 'Mumbai',
    address: 'Flat 202, Andheri West',
    gender: 'Female',
    age: 38,
    experience: '3 years',
    language: 'English, Marathi',
    description: 'Warm and friendly host with clean property.',
    report: '/sample-property-report.pdf',
  },
];

const HostVerification = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hosts, setHosts] = useState(dummyHosts);
  const navigate = useNavigate();

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const toggleVerification = (id) => {
    setHosts((prev) =>
      prev.map((host) =>
        host.id === id ? { ...host, verified: !host.verified } : host
      )
    );
  };

  const deleteHost = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this host?'
    );
    if (confirmDelete) {
      setHosts((prev) => prev.filter((host) => host.id !== id));
    }
  };

  const filteredHosts = hosts.filter((host) =>
    host.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="host-verification-section">
      <h1 className="dashboard-title">Host Verification</h1>
      <p className="dashboard-subtitle">
        Review pending host verification requests. Search and manage actions
        below.
      </p>

      <div className="search-bar">
        <FiSearch size={18} />
        <input
          type="text"
          placeholder="Search hosts by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="host-list">
        {filteredHosts.map((host) => (
          <div
            key={host.id}
            className="host-card"
            onClick={() => navigate(`/host/${host.id}/details`)} // ✅ FIXED here
          >
            <div className="host-info">
              <h3 className="host-name">{host.name}</h3>
              <p className="host-email">{host.email}</p>
            </div>
            <div className="host-actions" onClick={(e) => e.stopPropagation()}>
              <a
                href={host.report}
                target="_blank"
                rel="noopener noreferrer"
                title="View PDF"
              >
                <FiEye />
              </a>
              <a href={host.report} download title="Download PDF">
                <FiDownload />
              </a>
              <button onClick={() => deleteHost(host.id)} title="Delete Host">
                <FiTrash2 />
              </button>
              <button
                onClick={() => toggleVerification(host.id)}
                title={host.verified ? 'Unverify' : 'Verify'}
              >
                {host.verified ? <FiXCircle /> : <FiCheckCircle />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HostVerification;
