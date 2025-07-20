import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "../services/api";
import "./../Styles/Filter.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Property = () => {
  const query = useQuery();
  const navigate = useNavigate();

  // Set filters from URL query params, fallback to wide defaults for demo:
  const filters = {
    minMembers: parseInt(query.get("members")) || 1,
    maxCost: parseInt(query.get("maxCost")) || 10000, // higher max cost so more results
    onlyDisasterFree: query.get("disasterFree") === "1",
    onlyFree: query.get("free") === "1",
    sortByCost: query.get("sort") || "",
  };

  const itemsPerPage = 10;
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 if filters change (avoid empty page)
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.minMembers, filters.maxCost, filters.onlyDisasterFree, filters.onlyFree, filters.sortByCost]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError("");
      try {
        const params = {
          members: filters.minMembers,
          maxCost: filters.maxCost,
          minCost: 0,
          sort: filters.sortByCost,
          onlyFree: filters.onlyFree,
        };
        const result = await apiService.getApprovedProperties(params);
        if (result.success) {
          setProperties(result.data.properties || []);
        } else {
          setError(result.error || "Failed to load properties");
        }
      } catch (err) {
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [filters.minMembers, filters.maxCost, filters.onlyDisasterFree, filters.onlyFree, filters.sortByCost]);

  // Pagination slice
  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="results">
      <h2>Filtered Property Results</h2>

      {loading ? (
        <div>Loading properties...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="results-grid">
          {paginatedProperties.length > 0 ? (
            paginatedProperties.map((prop, idx) => (
              <div
                key={prop._id}
                className="result-card"
                style={{ cursor: "pointer" }}
              >
                <img src={prop.propertyImage || "https://placehold.co/250x150?text=Property"} alt={prop.title} />
                <h3>{prop.title}
                  <span className={`status-badge ${prop.isBooked ? "booked" : "free"}`} style={{ marginLeft: 10 }}>
                    {prop.isBooked ? "Booked" : "Available"}
                  </span>
                </h3>
                <p>Location: {prop.landmark}</p>
                <p>Capacity: {prop.capacity} people</p>
                <p>Cost: ₹{prop.pricePerNight === 0 ? "Free" : prop.pricePerNight}</p>
                {!prop.isBooked && (
                  <button className="rent-btn" onClick={() => handleCardClick(prop._id)}>
                    Rent
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No suitable properties found.</p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div
          className="pagination"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={{ marginRight: "10px" }}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ marginLeft: "10px" }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Property;
