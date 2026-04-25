import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addLocation,
  deleteLocation,
  setDefaultLocation,
} from "../../redux/slices/locationSlice";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const SavedLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { locations, defaultLocationId } = useSelector(
    (state) => state.locations
  );

  const [name, setName] = useState("");
  const [address, setAddress] = useState(null);

  // 📍 AUTO LOCATION (browser)
  const detectCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`;

        fetch(geoUrl)
          .then((res) => res.json())
          .then((data) => {
            const formatted =
              data.results?.[0]?.formatted_address;

            setAddress({
              label: formatted,
              value: formatted,
            });
          });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleAdd = () => {
    if (!name || !address?.label) return;

    dispatch(
      addLocation({
        name,
        address: address.label,
      })
    );

    setName("");
    setAddress(null);
  };

  return (
    <div className="saved-location-page">

      {/* HEADER */}
      <div className="saved-location-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h2>Saved Location</h2>
      </div>

      {/* ADD LOCATION */}
      <div style={{
        padding: 15,
        border: "1px solid #eee",
        borderRadius: 10,
        margin: 10,
      }}>

        <h4>Add Location</h4>

        {/* NAME */}
        <input
          placeholder="Home / Office"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />

        {/* 🧠 GOOGLE AUTOCOMPLETE */}
        <GooglePlacesAutocomplete
          apiKey="YOUR_GOOGLE_API_KEY"
          selectProps={{
            value: address,
            onChange: setAddress,
          }}
        />

        {/* 📍 CURRENT LOCATION */}
        <button
          onClick={detectCurrentLocation}
          style={{
            marginTop: 8,
            padding: 8,
            width: "100%",
          }}
        >
          📍 Use Current Location
        </button>

        {/* SAVE */}
        <button
          onClick={handleAdd}
          style={{
            marginTop: 10,
            width: "100%",
            padding: 10,
            background: "black",
            color: "white",
          }}
        >
          Save Location
        </button>
      </div>

      {/* LIST */}
      <div className="saved-location-list">

        {locations.map((loc) => (
          <div
            key={loc.id}
            style={{
              padding: 12,
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
            }}
          >

            <div>
              <h4>
                {loc.name}
                {defaultLocationId === loc.id && (
                  <span style={{ color: "green", marginLeft: 6 }}>
                    (Default)
                  </span>
                )}
              </h4>
              <p style={{ fontSize: 12 }}>{loc.address}</p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>

              {/* DEFAULT BUTTON */}
              <button
                onClick={() =>
                  dispatch(setDefaultLocation(loc.id))
                }
              >
                🏠
              </button>

              {/* DELETE */}
              <button
                onClick={() =>
                  dispatch(deleteLocation(loc.id))
                }
                style={{ color: "red" }}
              >
                ✕
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default SavedLocation;