import React from "react";
import { useNavigate } from "react-router-dom";
import { serviceData } from "../data/serviceData";
import ServiceCard from "../service/ServiceCard";
import { useParams } from "react-router-dom";
const ServiceList = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const filteredServices = serviceData.filter(
  (service) => service.type === type
);
  return (
    <div className="app-shell">
      <div className="service-list">

       <div className="service-header">

      <div className="header-top">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

       <h2>{type} Near You</h2>

        <button className="sort-btn">
          ☰ Sort by
        </button>
      </div>

      <div className="location-row">
        <span className="location-icon">📍</span>
        <span className="location-text">
          Delhi, India delhi
        </span>
        <span className="sl-dropdown">⌄</span>
      </div>

    </div>

        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() =>
              navigate(`/services/${service.type}/${service.id}`)
            }
          />
        ))}

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



