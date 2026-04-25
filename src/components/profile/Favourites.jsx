import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ServiceCard from "../service/ServiceCard";
import { getFavourites } from "../../redux/slices/favouriteSlice";

const Favourites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading } = useSelector(
    (state) => state.favourites
  );

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        Loading favourites...
      </div>
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

            <h2>Favourites</h2>

          </div>
        </div>

        {/* LIST */}
        {list?.length > 0 ? (

          list.map((service) => (

            <ServiceCard
              key={service.id}
              service={service}
              onClick={() =>
                navigate(`/services/${service.type}/${service.id}`)
              }
            />

          ))

        ) : (

          /* ⭐ EMPTY STATE (INDUSTRY LEVEL) */
          <div
            style={{
              textAlign: "center",
              marginTop: "80px",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "60px" }}>❤️</div>

            <h3 style={{ marginTop: "10px" }}>
              No Favourites Yet
            </h3>

            <p style={{ color: "#777", fontSize: "14px" }}>
              Save your favourite services here for quick access.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              style={{
                marginTop: "15px",
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                background: "#000",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Explore Services
            </button>
          </div>

        )}

      </div>

    </div>
  );
};

export default Favourites;