import { useNavigate } from "react-router-dom";
import placeholderImage from "../assets/img/placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";

const RecommendedWorkerCard = ({ worker }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/services/${worker?.type}/${worker?._id || worker?.id}`);
    console.log("test workerrrrrr",worker);
    console.log("Navigate URL:", `/services/${worker?.type}/${worker?.id}`);
  };

  return (
    <div className="recommended-card" onClick={handleView}>
      {/* LEFT IMAGE */}
      <div className="image-section">
        <img
          src={worker?.image || placeholderImage}
          alt={worker?.name}
          className="worker-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />

        <button className="rec-view-btn" onClick={handleView}>
          View
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="content-section">
        <div className="name-row">
          <h3>{worker?.name}</h3>
          {worker?.verified && <span className="verified-badge"><FontAwesomeIcon icon={faCheck} /></span>}
        </div>

        <p className="experience">
          Experience {worker?.experience}
        </p>

        <p className="role">{worker?.role}</p>

        <div className="rating-row">
          <span className="rating-box">
            <FontAwesomeIcon icon={faStar} /> {worker?.rating}
          </span>
          <span className="reviews">
            {worker?.reviews} Ratings
          </span>
        </div>

        <p>Age - {worker?.age}</p>
        <p>Location - {worker?.location}</p>
      </div>
    </div>
  );
};

export default RecommendedWorkerCard;