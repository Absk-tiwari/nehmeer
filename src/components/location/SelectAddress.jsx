import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapSelector from "./MapSelector";

const SelectAddress = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [position, setPosition] = useState(null);

  // 👇 THIS IS YOUR FINAL DATA OBJECT
  const [selectedData, setSelectedData] = useState(null);

  // SEARCH ADDRESS
  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length < 3) {
      setResults([]);
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
    );
    const data = await res.json();
    setResults(data);
  };

  // REVERSE GEO (lat,lng → address)
  const fetchAddress = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();

    setSelectedData({
      address: data.display_name,
      lat,
      lng,
    });

    setQuery(data.display_name);
    setResults([]);
  };

  // SEARCH RESULT CLICK
  const selectResult = (item) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);

    setPosition([lat, lng]);
    setSelectedData({
      address: item.display_name,
      lat,
      lng,
    });

    setQuery(item.display_name);
    setResults([]);
  };

  // CURRENT LOCATION
  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng]);
        fetchAddress(lat, lng);
      },
      () => alert("Location permission denied")
    );
  };

  // SAVE ADDRESS (🔥 THIS IS WHAT YOU NEED FOR BACKEND)
  const handleSaveAddress = () => {
    console.log("Selected Address Data:", selectedData);

    /*
      🔥 FUTURE BACKEND API EXAMPLE 🔥

      axios.post("/api/save-address", selectedData)

      selectedData = {
        address: "...",
        lat: 23.67,
        lng: 87.68
      }
    */

    navigate("/dashboard");
  };

  return (
    <div className="address-page">
      {/* HEADER */}
      <div className="address-header">
        <span className="back-btn" onClick={() => navigate(-1)}>←</span>
        <h3>Select Address</h3>
      </div>

      {/* SEARCH */}
      <div className="address-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for area, locality.."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* SEARCH RESULTS */}
      {results.length > 0 && (
        <div className="search-results">
          {results.map((item, i) => (
            <div
              key={i}
              className="search-item"
              onClick={() => selectResult(item)}
            >
              📍 {item.display_name}
            </div>
          ))}
        </div>
      )}

      {/* MAP */}
      <div className="map-wrapper">
        <MapSelector
          position={position}
          onMapClick={(latlng) => {
            setPosition([latlng.lat, latlng.lng]);
            fetchAddress(latlng.lat, latlng.lng);
          }}
        />

        <button className="current-location-btn" onClick={useCurrentLocation}>
          ⦿ Use Current location
        </button>
      </div>

      {/* ADDRESS CARD */}
      {selectedData && (
        <div className="address-card">
          <div className="address-row">
            <span className="pin">📍</span>
            <p>{selectedData.address}</p>
            <span className="arrow">›</span>
          </div>

          <div className="address-warning">
            <p>This address may be far from your current location</p>
            <span className="use-current" onClick={useCurrentLocation}>
              Use Current location
            </span>
          </div>
        </div>
      )}

      {/* SAVE BUTTON */}
      <div className="address-footer">
        <button
          className="save-address-btn"
          disabled={!selectedData}
          onClick={handleSaveAddress}
        >
          Save address
        </button>
      </div>
    </div>
  );
};

export default SelectAddress;
