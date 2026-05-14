import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTrash,
  faSpinner,
  faCloudArrowDown,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  getLocations,
  addLocation,
  deleteLocation,
} from "../../redux/slices/locationSlice";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const SavedLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { choosing, onSelect, goTo } = location.state || {};

  const { locations, loading, error } = useSelector((state) => state.locations);

  const [selectedLocation, setSelectedLocation] = useState({ address: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const handleAddNew = () => {
    navigate("/select-address", {
      state: {
        returnTo: "/saved-location",
        onSelectAction: "add",
      },
    });
  };

  useEffect(() => {
    if (location.state?.selectedAddress && location.state?.onSelectAction === "add") {
      const { lat, lng, address } = location.state.selectedAddress;
      setAdding(true);
      dispatch(
        addLocation({
          lat,
          lng,
          address: {
            ...address,
            formattedAddress: address.fullAddress,
            region: address.state_district,
            postalCode: address.postcode,
          }
        })
      ).then(() => {
        setAdding(false);
        navigate("/saved-location", { replace: true, state: { choosing } });
      });
    }
  }, [location.state?.selectedAddress]);

  const handleSelectLocation = (item) => {
    if (choosing) {
      setSelectedLocation(item);
    }
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await dispatch(deleteLocation(deleteId));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleConfirmLocation = () => {
    if (onSelect) {
      onSelect(selectedLocation);
    }

    // Build selectedAddress in the format CompleteProfile expects
    const selectedAddress = {
      lat: selectedLocation.latitude,
      lng: selectedLocation.longitude,
      address: {
        fullAddress: selectedLocation.address,
        city: selectedLocation.city || selectedLocation.area || "",
        state: selectedLocation.state || "",
      },
    };

    if (goTo) {
      navigate(goTo, { state: { selectedAddress } });
    } else {
      navigate(-1, { state: { selectedAddress } });
    }
  };

  const handleRetry = () => {
    dispatch(getLocations());
  };

  return (
    <AppLayout header={<CommonHeader back title="Saved Locations" />}>
      <div className="saved-location-container">

        {loading || adding ? (
          <div className="saved-location-loading">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
        ) : error ? (
          <div className="saved-location-error">
            <FontAwesomeIcon icon={faCloudArrowDown} className="error-icon" />
            <h3>Failed to load locations</h3>
            <p>Please check your internet connection</p>
            <button className="retry-btn" onClick={handleRetry}>
              <FontAwesomeIcon icon={faRotateRight} />
              <span>Retry</span>
            </button>
          </div>
        ) : (
          <div className="saved-location-list">
            <div className="add-new-btn" onClick={handleAddNew}>
              + Add New
            </div>

            {locations.length > 0 ? (
              locations.map((item) => (
                <div
                  key={item.id}
                  className={`location-card ${choosing && selectedLocation?.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleSelectLocation(item)}
                >
                  <div className="location-icon-box">
                    <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
                  </div>

                  <div className="location-content">
                    <h4 className="location-name">{item.city || item.name || "Location"}</h4>
                    <p className="location-address">{item.address}</p>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={(e) => handleDeleteClick(e, item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))
            ) : (
              <div className="no-locations">
                <FontAwesomeIcon icon={faLocationDot} className="no-locations-icon" />
                <h3>No locations saved!</h3>
                <p>Tap "Add New" to save a location</p>
              </div>
            )}
          </div>
        )}

        {choosing && (
          <div className="floating-card">
            <div className="selected-location-details">
              <div className="selected-icon-box">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={`selected-icon ${selectedLocation.address ? 'active' : ''}`}
                />
              </div>
              <div className="selected-info">
                <h4 className="selected-city">
                  {selectedLocation.city || selectedLocation.name || (selectedLocation.address ? "Selected Location" : "No location selected")}
                </h4>
                <p className="selected-address">
                  {selectedLocation.address || "Tap on a location above to select"}
                </p>
              </div>
            </div>
            <button
              className={`confirm-btn ${!selectedLocation.address ? 'disabled' : ''}`}
              onClick={handleConfirmLocation}
              disabled={!selectedLocation.address}
            >
              Confirm Location
            </button>
          </div>
        )}

        {showDeleteModal && (
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon warning">
                <FontAwesomeIcon icon={faTrash} />
              </div>
              <h3>Remove Location</h3>
              <p>Are you sure you want to remove this location?</p>
              <div className="modal-buttons">
                <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="confirm-btn danger" onClick={handleConfirmDelete} disabled={deleting}>
                  {deleting ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};

export default SavedLocation;
