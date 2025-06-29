import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../Styles/Filter.css";

const dummyProperties = [
  {
    id: 1,
    title: "Villa Serenity",
    capacity: 3,
    disasterFree: true,
    location: "Delhi",
    img: "https://placehold.co/250x150?text=Villa+1",
    cost: 1500,
  },
  {
    id: 2,
    title: "Haven Nest",
    capacity: 5,
    disasterFree: true,
    location: "Mumbai",
    img: "https://placehold.co/250x150?text=Villa+2",
    cost: 2200,
  },
  {
    id: 3,
    title: "Sunshine Home",
    capacity: 2,
    disasterFree: false,
    location: "Pune",
    img: "https://placehold.co/250x150?text=Villa+3",
    cost: 0,
  },
  {
    id: 4,
    title: "Harmony House",
    capacity: 6,
    disasterFree: true,
    location: "Chennai",
    img: "https://placehold.co/250x150?text=Villa+4",
    cost: 3000,
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Results = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const defaultMembers = parseInt(query.get("members")) || 0;

  const [minMembers, setMinMembers] = useState(defaultMembers);
  const [onlyDisasterFree, setOnlyDisasterFree] = useState(false);
  const [maxCost, setMaxCost] = useState(5000);
  const [onlyFree, setOnlyFree] = useState(false);
  const [sortByCost, setSortByCost] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState(dummyProperties);

  const handleApplyFilters = () => {
    let filtered = dummyProperties.filter((house) => {
      const isFreeMatch = !onlyFree || house.cost === 0;
      return (
        house.capacity >= minMembers &&
        house.cost <= maxCost &&
        (!onlyDisasterFree || house.disasterFree) &&
        isFreeMatch
      );
    });

    if (sortByCost === "low") {
      filtered.sort((a, b) => a.cost - b.cost);
    } else if (sortByCost === "high") {
      filtered.sort((a, b) => b.cost - a.cost);
    }

    setFilteredProperties(filtered);
    setShowFilters(false);
  };

  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="results">
      <h2>Filter and View Properties</h2>

      <div className="filter-container">
        <div className="filter-toggle">
          <button onClick={() => setShowFilters(!showFilters)} className="dropdown-toggle-btn">
            Filter ▾
          </button>
          {showFilters && (
            <div className="filter-dropdown">
              <label>Members: {minMembers}+</label>
              <input
                type="range"
                min="1"
                max="10"
                value={minMembers}
                onChange={(e) => setMinMembers(parseInt(e.target.value))}
              />

              <label>Max Cost: ₹{maxCost}</label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={maxCost}
                onChange={(e) => setMaxCost(parseInt(e.target.value))}
              />

              <label>
                <input
                  type="checkbox"
                  checked={onlyDisasterFree}
                  onChange={(e) => setOnlyDisasterFree(e.target.checked)}
                />
                Show Safe Houses 
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={onlyFree}
                  onChange={(e) => setOnlyFree(e.target.checked)}
                />
                Show only Free of Cost Houses
              </label>

              <label>Sort by Cost:</label>
              <select value={sortByCost} onChange={(e) => setSortByCost(e.target.value)}>
                <option value="">None</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>

              <button className="apply-btn" onClick={handleApplyFilters}>
                Apply Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="results-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="result-card"
              onClick={() => handleCardClick(prop.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={prop.img} alt={prop.title} />
              <h3>{prop.title}</h3>
              <p>Location: {prop.location}</p>
              <p>Capacity: {prop.capacity} people</p>
              <p>Cost: ₹{prop.cost}</p>
            
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
