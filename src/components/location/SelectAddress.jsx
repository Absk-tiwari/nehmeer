import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
  faLocationCrosshairs,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";
import MapSelector from "./MapSelector";

const SelectAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchTimeoutRef = useRef(null);

  const { lat, lng, viewOnly, address: passedAddress, returnTo, onSelectAction } = location.state || {};

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ fullAddress: "" });
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
      setSelectedCoords({ lat, lng });
      if (passedAddress) {
        setAddress({ fullAddress: passedAddress });
      }
    }
  }, [lat, lng, passedAddress]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (search.length > 2) {
      searchTimeoutRef.current = setTimeout(() => {
        searchLocation(search);
      }, 400);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  const searchLocation = async (query) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`,
        { headers: { "User-Agent": "nehmeer-web" } }
      );

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setSuggestions(data);
    } catch (e) {
      console.error(e);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = async (item) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);

    setMapCenter([lat, lng]);
    setSelectedCoords({ lat, lng });
    setSearch(item.display_name);
    setSuggestions([]);

    // Fetch full address details to get city
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        { headers: { "User-Agent": "nehmeer-web" } }
      );
      const data = await res.json();
      const addr = data.address || {};
      const city = addr.city || addr.town || addr.village || addr.county || addr.state || "";

      setAddress({
        fullAddress: item.display_name,
        city,
        state: addr.state || "",
        ...addr,
        latitude: lat,
        longitude: lng,
      });
    } catch (e) {
      setAddress({
        fullAddress: item.display_name,
        city: "",
        latitude: lat,
        longitude: lng,
      });
    }
  };

  const handleMapClick = async (latlng) => {
    if (viewOnly) return;

    setLoading(true);
    const { lat, lng } = latlng;
    setSelectedCoords({ lat, lng });

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        { headers: { "User-Agent": "nehmeer-web" } }
      );
      const data = await res.json();

      if (data.display_name) {
        const addr = data.address || {};
        const city = addr.city || addr.town || addr.village || addr.county || addr.state || "";

        setAddress({
          fullAddress: data.display_name,
          city,
          state: addr.state || "",
          ...addr,
          latitude: lat,
          longitude: lng,
        });
      } else {
        setAddress({
          fullAddress: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          city: "",
          latitude: lat,
          longitude: lng,
        });
      }
    } catch (e) {
      console.error(e);
      setAddress({
        fullAddress: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        city: "",
        latitude: lat,
        longitude: lng,
      });
    } finally {
      setLoading(false);
    }
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setMapCenter([latitude, longitude]);
        setSelectedCoords({ lat: latitude, lng: longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { "User-Agent": "nehmeer-web" } }
          );
          const data = await res.json();

          if (data.display_name) {
            const addr = data.address || {};
            const city = addr.city || addr.town || addr.village || addr.county || addr.state || "";

            setAddress({
              fullAddress: data.display_name,
              city,
              state: addr.state || "",
              ...addr,
              latitude,
              longitude,
            });
          } else {
            setAddress({
              fullAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              city: "",
              latitude,
              longitude,
            });
          }
        } catch (e) {
          console.error(e);
          setAddress({
            fullAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            city: "",
            latitude,
            longitude,
          });
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        toast.error("Unable to get your location. Please enable location access.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleConfirm = () => {
    if (!selectedCoords) {
      toast.error("Please select a location first");
      return;
    }

    const addressData = {
      lat: selectedCoords.lat,
      lng: selectedCoords.lng,
      address,
    };


    if (returnTo) {
      navigate(returnTo, { state: { selectedAddress: addressData, onSelectAction } });
    } else {
      navigate(-1);
    }
  };

  return (
    <AppLayout header={<CommonHeader back title="Select Location" />}>
      <div className="select-address-container">

        {!viewOnly && (
          <div className="search-container">
            <div className="search-box">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search area..."
                className="search-input"
              />
            </div>

            {search.length > 2 && (
              <div className="suggestions-container">
                {loading ? (
                  <div className="searching-container">
                    <FontAwesomeIcon icon={faSpinner} spin className="searching-spinner" />
                    <span className="searching-text">Searching...</span>
                  </div>
                ) : suggestions.length > 0 ? (
                  <div className="suggestions-list">
                    {suggestions.map((item, i) => (
                      <div
                        key={i}
                        className="suggestion-item"
                        onClick={() => handleSelectLocation(item)}
                      >
                        <FontAwesomeIcon icon={faLocationDot} className="suggestion-icon" />
                        <span className="suggestion-text">{item.display_name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-results">No locations found</div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="map-container">
          <MapSelector
            center={mapCenter}
            selectedCoords={selectedCoords}
            onMapClick={handleMapClick}
          />

          {!viewOnly && (
            <button className="current-location-btn" onClick={useCurrentLocation}>
              <FontAwesomeIcon icon={faLocationCrosshairs} className="current-location-icon" />
              <span>Use Current Location</span>
            </button>
          )}
        </div>

        <div className="floating-card">
          <div className="selected-location-details">
            <div className="selected-icon-box">
              <FontAwesomeIcon
                icon={faLocationDot}
                className={`selected-icon ${address.fullAddress ? 'active' : ''}`}
              />
            </div>
            <div className="selected-info">
              <h4 className="selected-city">
                {address.city || address.state || (address.fullAddress ? "Selected Location" : "No location selected")}
              </h4>
              <p className="selected-address">
                {address.fullAddress || "Tap on the map or search to select a location"}
              </p>
            </div>
          </div>

          <button
            className={`confirm-btn ${!selectedCoords ? 'disabled' : ''}`}
            onClick={handleConfirm}
            disabled={!selectedCoords || loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                <span>Loading...</span>
              </>
            ) : (
              <span>{viewOnly ? "Viewing Location" : "Confirm Location"}</span>
            )}
          </button>
        </div>

      </div>
    </AppLayout>
  );
};

export default SelectAddress;
