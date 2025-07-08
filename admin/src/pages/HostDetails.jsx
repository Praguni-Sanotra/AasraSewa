import React, { useState } from 'react';
import '../styles/HostDetails.css';
import { useParams } from 'react-router-dom';
import { FiDownload, FiEye, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const hostDetails = {
  id: 1,
  name: 'Amit Sharma',
  email: 'amitsharma@gmail.com',
  phone: '+91 9876543210',
  city: 'Delhi',
  address: '123 Green Street, Delhi',
  gender: 'Male',
  age: 42,
  languages: 'Hindi, English',
  description: 'In case of Emergency, this place is available for booking.',
  propertyTitle: 'Cozy Apartment near Metro Station',
  landmark: 'Near Saket Metro Station',
  pincode: '110030',
  fullAddress: '123 Green Street, Saket, Delhi - 110030',
  pricePerNight: 1200,
  capacity: 4,
  propertyDescription: 'A comfortable 2BHK with Wi-Fi, AC, and kitchen, ideal for travelers and families.',
  report: '/sample-property-report.pdf',
};

const HostDetails = () => {
  const { id } = useParams();
  const [isVerified, setIsVerified] = useState(false);

  const handleToggleVerification = () => {
    setIsVerified(!isVerified);
  };

  return (
    <section className="host-details-section">
      <h1 className="host-details-title">Host Details</h1>
      <p className="host-details-subtitle">Verified host and property details</p>

      <div className="host-details-card">
        {/* Host Info */}
        <div className="host-info-pair"><strong>Name:</strong><span>{hostDetails.name}</span></div>
        <div className="host-info-pair"><strong>Email:</strong><span>{hostDetails.email}</span></div>
        <div className="host-info-pair"><strong>Phone:</strong><span>{hostDetails.phone}</span></div>
        <div className="host-info-pair"><strong>City:</strong><span>{hostDetails.city}</span></div>
        <div className="host-info-pair"><strong>Address:</strong><span>{hostDetails.address}</span></div>
        <div className="host-info-pair"><strong>Gender:</strong><span>{hostDetails.gender}</span></div>
        <div className="host-info-pair"><strong>Age:</strong><span>{hostDetails.age}</span></div>
        <div className="host-info-pair"><strong>Languages:</strong><span>{hostDetails.languages}</span></div>

        <div className="host-description">
          <strong>Host Bio:</strong>
          <p>{hostDetails.description}</p>
        </div>

        <hr style={{ margin: '2rem 0', borderColor: '#ccc' }} />

        {/* Property Info */}
        <div className="host-info-pair"><strong>Property Title:</strong><span>{hostDetails.propertyTitle}</span></div>
        <div className="host-info-pair"><strong>Landmark:</strong><span>{hostDetails.landmark}</span></div>
        <div className="host-info-pair"><strong>Pincode:</strong><span>{hostDetails.pincode}</span></div>
        <div className="host-info-pair"><strong>Full Address:</strong><span>{hostDetails.fullAddress}</span></div>
        <div className="host-info-pair"><strong>Price/Night:</strong><span>₹{hostDetails.pricePerNight}</span></div>
        <div className="host-info-pair"><strong>Capacity:</strong><span>{hostDetails.capacity} People</span></div>

        <div className="host-description">
          <strong>Property Description:</strong>
          <p>{hostDetails.propertyDescription}</p>
        </div>

        {/* PDF + Verify Buttons */}
        <div className="pdf-section">
          <span className="label">Property Report (PDF):</span>
          <div className="pdf-buttons">
            <a
              href={hostDetails.report}
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-btn view"
              title="View Report"
            >
              <FiEye style={{ marginRight: '8px' }} /> View
            </a>
            <a
              href={hostDetails.report}
              download
              className="pdf-btn download"
              title="Download Report"
            >
              <FiDownload style={{ marginRight: '8px' }} /> Download
            </a>
            <button
              onClick={handleToggleVerification}
              className={`pdf-btn verify ${isVerified ? 'verified' : 'unverified'}`}
              title={isVerified ? 'Mark as Unverified' : 'Mark as Verified'}
            >
              {isVerified ? (
                <>
                  <FiXCircle style={{ marginRight: '8px' }} /> Unverify
                </>
              ) : (
                <>
                  <FiCheckCircle style={{ marginRight: '8px' }} /> Verify
                </>
              )}
            </button>
          </div>

          <iframe
            src={hostDetails.report}
            className="pdf-viewer"
            title="Property Report"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default HostDetails;
