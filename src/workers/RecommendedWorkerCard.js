import { useNavigate } from "react-router-dom";
import userImage from "../assets/img/user1.png";

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
          src={worker?.image || userImage}
          alt={worker?.name}
          className="worker-img"
        />

        <button className="rec-view-btn" onClick={handleView}>
          View
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="content-section">
        <div className="name-row">
          <h3>{worker?.name}</h3>
          {worker?.verified && <span className="verified-badge">✔</span>}
        </div>

        <p className="experience">
          Experience {worker?.experience}
        </p>

        <p className="role">{worker?.role}</p>

        <div className="rating-row">
          <span className="rating-box">
            ★ {worker?.rating}
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