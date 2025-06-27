import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const houses = [
  {
    id: 1,
    name: "Modern Villa",
    capacity: 2,
    description: "Perfect for couples or small families.",
    image: "https://via.placeholder.com/400x250?text=Modern+Villa"
  },
  {
    id: 2,
    name: "Family Cottage",
    capacity: 4,
    description: "Comfortable space for a medium family.",
    image: "https://via.placeholder.com/400x250?text=Family+Cottage"
  },
  {
    id: 3,
    name: "Large Bungalow",
    capacity: 6,
    description: "Spacious home for larger families.",
    image: "https://via.placeholder.com/400x250?text=Large+Bungalow"
  },
  {
    id: 4,
    name: "Joint Family Mansion",
    capacity: 8,
    description: "Ideal for joint families.",
    image: "https://via.placeholder.com/400x250?text=Joint+Family+Mansion"
  }
];

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const House = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const members = parseInt(query.get("members")) || 0;

  const matchingHouses = houses.filter((house) => house.capacity >= members);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-800">
        Houses for {members} family members
      </h2>

      {matchingHouses.length === 0 ? (
        <p className="text-center text-gray-600">No suitable houses found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {matchingHouses.map((house) => (
            <div key={house.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={house.image}
                alt={house.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{house.name}</h3>
              <p className="text-gray-600 mb-2">{house.description}</p>
              <span className="text-sm text-gray-500">
                Capacity: {house.capacity} people
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/explore")}
        >
          Search Again
        </button>
      </div>
    </div>
  );
};

export default House;
