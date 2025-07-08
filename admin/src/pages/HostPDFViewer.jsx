// src/pages/HostPDFViewer.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/HostVerification.css';

const dummyHosts = [
  {
    id: 1,
    name: 'Amit Sharma',
    email: 'amitsharma@gmail.com',
    pdf: '/sample-property-report.pdf', // path to the PDF
  },
  {
    id: 2,
    name: 'Ritika Verma',
    email: 'ritikaverma@yahoo.com',
    pdf: '/sample-property-report.pdf',
  },
];

const HostPDFViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Pending');

  const host = dummyHosts.find((h) => h.id === parseInt(id));

  if (!host) return <p>Host not found</p>;

  const handleToggleVerification = () => {
    if (status === 'Verified') {
      setStatus('Unverified');
      alert('Host marked as unverified.');
    } else {
      setStatus('Verified');
      alert('Host verified successfully.');
    }
  };

  return (
    <section className="host-verification-section">
      <h1 className="dashboard-title">Verify Host</h1>
      <p className="dashboard-subtitle">Verifying: {host.name} ({host.email})</p>

      <div className="pdf-container">
        <iframe
          className="pdf-viewer"
          src={host.pdf}
          title="Host Document"
          loading="lazy"
        >
          Your browser does not support iframes.{" "}
          <a href={host.pdf} target="_blank" rel="noopener noreferrer">Click here</a> to view.
        </iframe>
      </div>

      <div className="verification-actions">
        <button
          className={status === 'Verified' ? 'toggle-btn unverify' : 'toggle-btn verify'}
          onClick={handleToggleVerification}
        >
          {status === 'Verified' ? '❌ Unverify Host' : '✅ Verify Host'}
        </button>
        <p className="verification-status">
          Current Status: <strong>{status}</strong>
        </p>
        <button className="toggle-btn" onClick={() => navigate(-1)}>🔙 Go Back</button>
      </div>
    </section>
  );
};

export default HostPDFViewer;