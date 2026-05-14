import { useNavigate } from "react-router-dom";
import placeholderImage from "../assets/img/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";

const RecommendedWorkerCard = ({ worker , user={}}) => {
  const navigate = useNavigate();

  const handleView = () => {
    const workerId = worker?._id || worker?.id;
    navigate(`/worker-profile/${workerId}`, { state: { worker } });
  };

  // if(parseInt(worker.id) === user?.id) return null;
  return (
    <div className="recommended-card" onClick={handleView}>
      {/* LEFT IMAGE */}
      <div className="image-section">
        <img
          src={worker?.profile_photo ?? placeholderImage}
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

        <p className="role">{worker.job_title?? worker.role}</p>

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