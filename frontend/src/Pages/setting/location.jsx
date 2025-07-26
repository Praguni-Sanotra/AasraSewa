import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import "../../Styles/setting/location.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const Location = () => {
  const [locationData, setLocationData] = useState({
    house: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
    landmark: "",
    coordinates: "",
    sharing: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [autoMessage, setAutoMessage] = useState("");

  useEffect(() => {
    apiService.getProfile().then(res => {
      if (res.success) {
        setLocationData(prev => ({
          ...prev,
          ...res.data.user.location,
        }));
      }
    });
  }, []);

  const handleChange = (field, value) => {
    setLocationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveLocation = async (e) => {
    e.preventDefault();
    setLoading(true);
    await apiService.updateProfile({ location: locationData });
    setLoading(false);
    navigate("/settings");
  };

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      setAutoMessage("Detecting location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `Lat: ${position.coords.latitude.toFixed(6)}, Long: ${position.coords.longitude.toFixed(6)}`;
          setLocationData((prev) => ({ ...prev, coordinates: coords }));
          setAutoMessage("Location auto-detected!");
        },
        (error) => {
          setAutoMessage("Unable to detect location. Please allow location access.");
        }
      );
    } else {
      setAutoMessage("Geolocation not supported by your browser.");
    }
  };

  return (
    <div className="location-section-page">
      <h2 className="location-section-heading">Where are you right now?</h2>
      <p className="location-section-subheading">
        Let us detect or enter your location to show nearby help
      </p>
      <div className="location-section-options">
        <button
          type="button"
          className="location-section-btn"
          onClick={handleAutoDetect}
          style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '1rem' }}
        >
          <FaMapMarkerAlt style={{ color: '#2563eb', fontSize: '1.2em' }} />
          Auto Detect Location
        </button>
        {autoMessage && (
          <p className="location-section-status">{autoMessage}</p>
        )}
        <input
          type="text"
          placeholder="House / Flat Number"
          value={locationData.house}
          onChange={e => handleChange("house", e.target.value)}
        />
        <input
          type="text"
          placeholder="Street Name / Road"
          value={locationData.street}
          onChange={e => handleChange("street", e.target.value)}
        />
        <input
          type="text"
          placeholder="Area / Locality"
          value={locationData.area}
          onChange={e => handleChange("area", e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={locationData.city}
          onChange={e => handleChange("city", e.target.value)}
        />
        <input
          type="number"
          placeholder="Pincode"
          value={locationData.pincode}
          onChange={e => handleChange("pincode", e.target.value)}
        />
        <input
          type="text"
          placeholder="Nearby Landmark (optional)"
          value={locationData.landmark}
          onChange={e => handleChange("landmark", e.target.value)}
        />
        <input
          type="text"
          placeholder="Coordinates (auto or manual, e.g. Lat: 28.6139, Long: 77.2090)"
          value={locationData.coordinates}
          onChange={e => handleChange("coordinates", e.target.value)}
        />
        <div className="location-section-toggle">
          <label htmlFor="locationToggle">Enable Location Sharing</label>
          <input
            id="locationToggle"
            type="checkbox"
            checked={locationData.sharing}
            onChange={() => handleChange("sharing", !locationData.sharing)}
          />
        </div>
        <button
          className="location-save-section-btn"
          disabled={loading}
          onClick={handleSaveLocation}
        >
          {loading ? "Saving..." : "Save Location"}
        </button>
      </div>
    </div>
  );
};

export default Location;
