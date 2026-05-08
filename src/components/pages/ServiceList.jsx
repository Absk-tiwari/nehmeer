import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ServiceCard from "../service/ServiceCard";
import { getMyJobs } from "../../redux/slices/jobSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faBars, faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";


const ServiceList = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.jobs);
  const { role } = useSelector((state) => state.auth);

  // 🔥 STATE
  const [sortType, setSortType] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // 🔄 FETCH DATA (only for employers)
  useEffect(() => {
    if (role && role === "employer") {
      dispatch(getMyJobs());
    }
  }, [dispatch, role]);

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
    <AppLayout header={<CommonHeader back title={`${type} Near You`} />}>
      <div className="service-list">

        {/* FILTER ROW */}
        <div className="service-filter-row">
          <div className="location-row">
            <span className="location-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
            <input
              type="text"
              placeholder="Enter location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                flex: 1,
              }}
            />
            <span className="sl-dropdown"><FontAwesomeIcon icon={faChevronDown} /></span>
          </div>

          <button
            className="sort-btn"
            onClick={() =>
              setSortType(sortType === "latest" ? "oldest" : "latest")
            }
          >
            <FontAwesomeIcon icon={faBars} /> Sort by ({sortType || "none"})
          </button>
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
            <FontAwesomeIcon icon={faFilter} /> Filter by
          </button>
        </div>

      </div>
    </AppLayout>
  );
};

export default ServiceList;