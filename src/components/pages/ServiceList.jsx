import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ServiceCard from "../service/ServiceCard";
import { getMyJobs } from "../../redux/slices/jobSlice";


const ServiceList = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.jobs);

  // 🔥 STATE
  const [sortType, setSortType] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // 🔄 FETCH DATA
  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  // ✅ FILTER BY TYPE
  let filteredServices = list.filter(
    (item) => item.type === type
  );

  // ✅ FILTER BY LOCATION
  if (locationFilter) {
    filteredServices = filteredServices.filter(
      (item) =>
        item.location?.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }

  // ✅ SORT
  if (sortType === "latest") {
    filteredServices.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (sortType === "oldest") {
    filteredServices.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  return (
    <div className="app-shell">
      <div className="service-list">

        {/* HEADER */}
        <div className="service-header">

          <div className="header-top">
            <button
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              ←
            </button>

            <h2>{type} Near You</h2>

            {/* 🔥 SORT BUTTON */}
            <button
              className="sort-btn"
              onClick={() =>
                setSortType(sortType === "latest" ? "oldest" : "latest")
              }
            >
              ☰ Sort by ({sortType || "none"})
            </button>
          </div>

          {/* 🔥 LOCATION FILTER */}
          <div className="location-row">
            <span className="location-icon">📍</span>

            <input
              type="text"
              placeholder="Enter location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
              }}
            />

            <span className="sl-dropdown">⌄</span>
          </div>

        </div>

        {/* 🔄 LOADER */}
        {loading && <div className="loader">Loading...</div>}

        {/* ❌ NO DATA */}
        {!loading && filteredServices.length === 0 && (
          <div className="no-data">
            No services available
          </div>
        )}

        {/* ✅ LIST */}
        <div className="providers-grid">
          {!loading &&
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() =>
                  navigate(`/services/${service.type}/${service.id}`)
                }
              />
            ))}
        </div>

        {/* FILTER BUTTON (optional future) */}
        <div className="filter-btn-wrapper">
          <button className="filter-btn">
            ☰ Filter by
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceList;