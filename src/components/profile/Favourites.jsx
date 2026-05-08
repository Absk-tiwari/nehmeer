import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ServiceCard from "../service/ServiceCard";
import { getFavourites } from "../../redux/slices/favouriteSlice";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const Favourites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.favourites);

  useEffect(() => {
    dispatch(getFavourites());
  }, [dispatch]);

  if (loading) {
    return (
      <AppLayout header={<CommonHeader back title="Favourites" />}>
        <div className="page-loading">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout header={<CommonHeader back title="Favourites" />}>
      <div className="favourites-list">
        {list?.length > 0 ? (
          list.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => navigate(`/services/${service.type}/${service.id}`)}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h3>No Favourites Yet</h3>
            <p>Save your favourite services here for quick access.</p>
            <button className="empty-btn" onClick={() => navigate("/dashboard")}>
              Explore Services
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Favourites;
