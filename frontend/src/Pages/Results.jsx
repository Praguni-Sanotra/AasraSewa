import React from "react";
import { useLocation } from "react-router-dom";
import "./../Styles/Results.css";

const dummyProperties = [
  { title: "Villa Serenity", capacity: 3, disasterFree: true, location: "Delhi", img: "https://placehold.co/250x150?text=Villa+1" },
  { title: "Haven Nest", capacity: 5, disasterFree: true, location: "Mumbai", img: "https://placehold.co/250x150?text=Villa+2" },
  { title: "Sunshine Home", capacity: 2, disasterFree: false, location: "Pune", img: "https://placehold.co/250x150?text=Villa+3" },
  { title: "Harmony House", capacity: 6, disasterFree: true, location: "Chennai", img: "https://placehold.co/250x150?text=Villa+4" }
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Results = () => {
  const query = useQuery();
  const members = parseInt(query.get("members"));

  const filtered = dummyProperties.filter(
    (house) => house.capacity >= members && house.disasterFree
  );

  return (
    <div className="results">
      <h2>Houses suitable for {members} members</h2>
      <div className="results-grid">
        {filtered.length > 0 ? (
          filtered.map((prop, idx) => (
            <div key={idx} className="result-card">
              <img src={prop.img} alt={prop.title} />
              <h3>{prop.title}</h3>
              <p>Location: {prop.location}</p>
              <p>Capacity: {prop.capacity} people</p>
              <p>Disaster-Free ✅</p>
            </div>
          ))
        ) : (
          <p>No suitable properties found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
