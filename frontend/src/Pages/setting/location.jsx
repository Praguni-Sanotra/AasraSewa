import React, { useState } from "react";
import "../../Styles/Setting/Location.css";

const Location = () => {
  const [location, setLocation] = useState("");
  const [sharing, setSharing] = useState(false);

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`);
      });
    }
  };

  return (
    <div className="location-page">
      <h2>Location Settings</h2>
      <button onClick={handleAutoDetect}>Auto Detect Location</button>
      <input
        type="text"
        placeholder="Or enter manually"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="toggle-share">
        <label>
          <input
            type="checkbox"
            checked={sharing}
            onChange={() => setSharing(!sharing)}
          />
          Enable Location Sharing
        </label>
      </div>
    </div>
  );
};

export default Location;
