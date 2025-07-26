import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/setting/location.css";

const Location = () => {
  const [locationData, setLocationData] = useState({
    house: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
    landmark: "",
    coordinates: "",
  });

  const [sharing, setSharing] = useState(false);
  const [autoMessage, setAutoMessage] = useState("");
  const [loading, setLoading] = useState(false); // For saving animation
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setLocationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      setAutoMessage("Detecting location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`;
          handleChange("coordinates", coords);
          setAutoMessage("Location auto-detected!");
        },
        () => {
          setAutoMessage("Unable to detect location.");
        }
      );
    } else {
      setAutoMessage("Geolocation not supported by your browser.");
    }
  };

  const isFormComplete =
    locationData.house &&
    locationData.area &&
    locationData.city &&
    locationData.pincode;

  const handleSaveLocation = (e) => {
    e.preventDefault();
    setLoading(true);

    const timestamp = new Date().toLocaleString();

    const savedData = {
      ...locationData,
      sharing,
      savedAt: timestamp,
    };

    console.log("Location Saved:", savedData);

    setTimeout(() => {
      setLoading(false);
      navigate("/settings");
    }, 2000);
  };

  return (
    <div className="location-section-page">
      <h2 className="location-section-heading">Where are you right now?</h2>
      <p className="location-section-subheading">
        Let us detect or enter your location to show nearby help
      </p>

      <div className="location-section-options">
        <button className="location-section-btn" onClick={handleAutoDetect}>
          📍 Auto Detect Location
        </button>
        {autoMessage && (
          <p className="location-section-status">{autoMessage}</p>
        )}

        <input
          type="text"
          placeholder="House / Flat Number"
          value={locationData.house}
          onChange={(e) => handleChange("house", e.target.value)}
        />
        <input
          type="text"
          placeholder="Street Name / Road"
          value={locationData.street}
          onChange={(e) => handleChange("street", e.target.value)}
        />
        <input
          type="text"
          placeholder="Area / Locality"
          value={locationData.area}
          onChange={(e) => handleChange("area", e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={locationData.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />
        <input
          type="number"
          placeholder="Pincode"
          value={locationData.pincode}
          onChange={(e) => handleChange("pincode", e.target.value)}
        />
        <input
          type="text"
          placeholder="Nearby Landmark (optional)"
          value={locationData.landmark}
          onChange={(e) => handleChange("landmark", e.target.value)}
        />
        <input
          type="text"
          placeholder="Coordinates (auto or manual)"
          value={locationData.coordinates}
          onChange={(e) => handleChange("coordinates", e.target.value)}
        />

        <div className="location-section-toggle">
          <label htmlFor="locationToggle">Enable Location Sharing</label>
          <input
            id="locationToggle"
            type="checkbox"
            checked={sharing}
            onChange={() => setSharing(!sharing)}
          />
        </div>

        <button
          className="location-section-btn"
          disabled={!isFormComplete || loading}
          onClick={handleSaveLocation}
        >
          {loading ? "Saving..." : "Save Location"}
        </button>
      </div>
    </div>
  );
};

export default Location;
