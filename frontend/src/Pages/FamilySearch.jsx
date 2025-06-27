// src/Pages/FamilySearch.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/FamilySearch.css";

const FamilySearch = () => {
  const [members, setMembers] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (members) {
      navigate(`/results?members=${members}`);
    }
  };

  return (
    <div className="family-search-page">
      <h1>Find Shelter for Your Family</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="members">Number of Family Members:</label>
        <input
          type="number"
          id="members"
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          required
        />
        <button type="submit">Find</button>
      </form>
    </div>
  );
};

export default FamilySearch;
