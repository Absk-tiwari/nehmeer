import { useParams, useNavigate } from "react-router-dom";
import { manageWorkersData } from "../data/manageWorkersData";


const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const worker = manageWorkersData.find(
    (item) => item.id === Number(id)
  );

  if (!worker) {
    return <h3>Worker not found</h3>;
  }

  return (
    <div className="wp-page">
      <div className="wp-container">

        <button className="wp-back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="wp-card">

          <div className="wp-image-box">
            <img src={worker.image} alt={worker.name} />
            {worker.verified && (
              <span className="wp-verified">✔ Verified</span>
            )}
          </div>

          <h2 className="wp-name">{worker.name}</h2>
          <p className="wp-role">{worker.role}</p>

          <div className="wp-rating">
            ⭐ {worker.rating} ({worker.reviews} reviews)
          </div>

          <div className="wp-info">
            <p><strong>Age:</strong> {worker.age}</p>
            <p><strong>Experience:</strong> {worker.experience}</p>
            <p><strong>Location:</strong> {worker.location}</p>
          </div>

          <div className="wp-about">
            <h3>About</h3>
            <p><strong>Language:</strong> {worker.about.language}</p>
            <p><strong>Education:</strong> {worker.about.education}</p>
            <p><strong>Religion:</strong> {worker.about.religion}</p>
            <p><strong>Status:</strong> {worker.about.status}</p>
            <p className="wp-description">{worker.about.description}</p>
          </div>

          <div className="wp-salary">
            <h3>Salary Details</h3>

            <div className="wp-salary-card">
              <h4>Part Time</h4>
              <p>{worker.salary.partTime.price}</p>
              <div className="wp-slots">
                {worker.salary.partTime.slots.map((slot, index) => (
                  <span key={index}>{slot}</span>
                ))}
              </div>
            </div>

            <div className="wp-salary-card">
              <h4>Full Time</h4>
              <p>{worker.salary.fullTime.price}</p>
              <div className="wp-slots">
                {worker.salary.fullTime.slots.map((slot, index) => (
                  <span key={index}>{slot}</span>
                ))}
              </div>
            </div>

          </div>
          <button
            className="wp-stop-btn"
            onClick={() => navigate(`/manage-workers/stop/${worker.id}`)}
          >
            Stop Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;