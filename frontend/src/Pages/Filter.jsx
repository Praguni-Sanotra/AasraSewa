// components/FilterControls.jsx
import React, { useState } from "react";
import "./../Styles/Filter.css";

const FilterControls = ({ onApply }) => {
  const [minMembers, setMinMembers] = useState(1);
  const [onlyDisasterFree, setOnlyDisasterFree] = useState(false);
  const [maxCost, setMaxCost] = useState(5000);
  const [onlyFree, setOnlyFree] = useState(false);
  const [sortByCost, setSortByCost] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleApplyFilters = () => {
    onApply({
      minMembers,
      onlyDisasterFree,
      maxCost,
      onlyFree,
      sortByCost,
    });
    setShowFilters(false);
  };

  return (
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
  );
};

export default FilterControls;
