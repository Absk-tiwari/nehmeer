import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShare,
  faHeart,
  faCheck,
  faStar,
  faLocationDot,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
import { getWorkerInfo } from "../../redux/slices/workerSlice";
import { addFavourite, removeFavourite } from "../../redux/slices/favouriteSlice";
import placeholderImage from "../../assets/img/placeholder.png";
import AppLayout from "../layouts/AppLayout";

const SearchWorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const workerFromState = location.state?.worker;
  const [worker, setWorker] = useState(workerFromState || null);
  const [activeTab, setActiveTab] = useState("about");
  const [isFavourite, setIsFavourite] = useState(false);

  const { selectedWorker, loading } = useSelector((state) => state.workers);
  const { list: favourites } = useSelector((state) => state.favourites);

  useEffect(() => {
    if (id) {
      dispatch(getWorkerInfo(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedWorker) {
      setWorker((prev) => ({ ...prev, ...selectedWorker }));
    }
  }, [selectedWorker]);

  useEffect(() => {
    if (worker && favourites) {
      const isFav = favourites.some((f) => f.id === worker.id || f._id === worker._id);
      setIsFavourite(isFav);
    }
  }, [worker, favourites]);

  const handleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(worker.id || worker._id));
    } else {
      dispatch(addFavourite(worker));
    }
    setIsFavourite(!isFavourite);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: worker?.name || "Worker Profile",
          text: `Check out ${worker?.name} on Nehmeer`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    }
  };

  const handleHireRequest = () => {
    navigate("/create-post", { state: { worker } });
  };

  const handleLocate = () => {
    if (worker?.workerProfile?.latitude) {
      navigate("/select-address", {
        state: {
          viewOnly: true,
          lat: worker.workerProfile.latitude,
          lng: worker.workerProfile.longitude,
          address: worker.workerProfile.location,
        },
      });
    }
  };

  const capitalFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).replace("-", " ");
  };

  const getType = {
    "full-time": "full_time_salary",
    "part-time": "part_time_salary",
  };

  if (loading && !worker) {
    return (
      <AppLayout>
        <div className="worker-profile-loading">
          <Spinner style={{ width: "3rem", height: "3rem", color: "#7f9346" }} />
        </div>
      </AppLayout>
    );
  }

  if (!worker) {
    return (
      <AppLayout>
        <div className="worker-profile-container">
          <div className="profile-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h3>Worker Profile</h3>
            <div className="header-actions"></div>
          </div>
          <div className="worker-not-found">
            <h3>Worker not found</h3>
            <p>The worker profile you're looking for doesn't exist.</p>
            <button onClick={() => navigate("/search")}>Back to Search</button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const profile = worker.workerProfile || {};
  const profileImage = profile.profile_photo || worker.image || worker.profile_photo;

  return (
    <AppLayout>
      <div className="worker-profile-container">
        {/* Header */}
        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <h3>{worker.name || "Worker Profile"}</h3>
          <div className="header-actions">
            <button className="action-btn" onClick={handleShare}>
              <FontAwesomeIcon icon={faShare} />
            </button>
            <button
              className={`action-btn ${isFavourite ? "active" : ""}`}
              onClick={handleFavourite}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="worker-profile-card">
          <div className="profile-image-wrapper">
            {profileImage ? (
              <img
                src={profileImage}
                alt={worker.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImage;
                }}
              />
            ) : (
              <div className="profile-placeholder">
                <FontAwesomeIcon icon={faPerson} />
              </div>
            )}
            {profile.latitude && (
              <button className="locate-btn" onClick={handleLocate}>
                <FontAwesomeIcon icon={faLocationDot} /> Locate
              </button>
            )}
          </div>

          <div className="profile-details">
            <div className="name-row">
              <h2>{worker.name || "Worker"}</h2>
              {(worker.is_verified || worker.verified) && (
                <span className="verified-badge">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </div>

            <p className="experience">Experience {profile.experience || worker.experience || "N/A"}</p>
            <p className="role">{profile.title || worker.title || worker.role || "Job-Seeker"}</p>

            <div className="rating-row">
              <span className="rating-badge">
                <FontAwesomeIcon icon={faStar} /> {profile.rating || worker.rating || 0}
              </span>
              <span className="reviews">{profile.reviews || worker.reviews || 0} Ratings</span>
            </div>

            <p className="info-text">Age - {profile.age || worker.age || "N/A"}</p>
            <p className="info-text">
              Location - {profile.city || profile.location || worker.location || "N/A"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About me
          </button>
          <button
            className={`tab-btn ${activeTab === "salary" ? "active" : ""}`}
            onClick={() => setActiveTab("salary")}
          >
            Salary & Availability
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {loading ? (
            <div className="tab-loading">
              <Spinner style={{ color: "#7f9346" }} />
            </div>
          ) : activeTab === "about" ? (
            <div className="about-content">
              <div className="info-row">
                <span className="label">Name:</span>
                <span className="value">{worker.name || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="label">Role:</span>
                <span className="value">{profile.title || worker.title || worker.role || "N/A"}</span>
              </div>
              {worker.email && (
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{worker.email}</span>
                </div>
              )}
              <div className="info-row">
                <span className="label">Language:</span>
                <span className="value">{profile.language || worker.language || "Hindi"}</span>
              </div>
              {worker.whatsapp && (
                <div className="info-row">
                  <span className="label">Whatsapp:</span>
                  <span className="value">{worker.whatsapp}</span>
                </div>
              )}
              {profile && (
                <>
                  <div className="info-row">
                    <span className="label">Education:</span>
                    <span className="value">{profile.education || "8th pass"}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Experience:</span>
                    <span className="value">{profile.experience || "0 yrs"}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Marital Status:</span>
                    <span className="value">{profile.marital_status || "Single"}</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="salary-content">
              {worker.is_available && worker.availability?.length > 0 ? (
                worker.availability.map((a, index) => (
                  <div className="salary-card" key={index}>
                    <h4 className="salary-title">{capitalFirst(a.type)}</h4>
                    {profile[getType[a.type]] && (
                      <div className="salary-row">
                        <span className="label">Starting from:</span>
                        <span className="value highlight">
                          {profile[getType[a.type]]} / {a.type === "part-time" ? "monthly" : "hourly"}
                        </span>
                      </div>
                    )}
                    <div className="availability-section">
                      <h5>Availability</h5>
                      <div className="time-row">
                        <span className="label">Start Time:</span>
                        <span className="value">{a.start_time}</span>
                      </div>
                      <div className="time-row">
                        <span className="label">End Time:</span>
                        <span className="value">{a.end_time}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-availability">
                  <h4>{worker.availability?.length === 0 ? "Not set" : "Not available"}</h4>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hire Button */}
        <div className="hire-button-wrapper">
          <button className="hire-btn" onClick={handleHireRequest}>
            Send Hire Request
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SearchWorkerProfile;
