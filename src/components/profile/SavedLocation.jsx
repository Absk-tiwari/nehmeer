import React from "react";
import { useNavigate } from "react-router-dom";

const SavedLocation = () => {

  const navigate = useNavigate();

  // Dummy data (later this will come from API)
  const locations = [
    {
      id: 1,
      name: "Home",
      address: "Indus, Birbhum, 731303, West Bengal"
    },
    {
      id: 2,
      name: "Office",
      address: "Sector 62, Noida, Uttar Pradesh"
    },
     {
      id: 3,
      name: "Home",
      address: "Indus, Birbhum, 731303, West Bengal"
    },
    {
      id: 4,
      name: "Office",
      address: "Sector 42, Noida, Uttar Pradesh"
    }
  ];

  return (
    <div className="saved-location-page">

      {/* HEADER */}
      <div className="saved-location-header">

        <button
          className="saved-location-back"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h2>Saved Location</h2>

      </div>

      {/* LOCATION LIST */}
      <div className="saved-location-list">

        {locations.map((loc) => (
          <div key={loc.id} className="saved-location-card">

            <div className="saved-location-icon">
              📍
            </div>

            <div className="saved-location-info">
              <h4>{loc.name}</h4>
              <p>{loc.address}</p>
            </div>

          </div>
        ))}

      </div>

      {/* ADD LOCATION BUTTON */}

      <button
        className="saved-location-add-btn"
        onClick={() => navigate("/select-address")}
      >
        + Add New Location
      </button>

    </div>
  );
};

export default SavedLocation;