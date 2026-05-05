import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyWorkers } from "../../redux/slices/workerSlice";
import SkeletonLoader from "../common/SkeletonLoader";


const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector((state) => state.workers);

  // ✅ Refresh safe (agar direct page open ho)
  useEffect(() => {
    if (!list.length) {
      dispatch(getMyWorkers());
    }
  }, [dispatch, list.length]);

  // ✅ Find worker from Redux
  const worker = list.find(
    (item) => String(item.id) === String(id)
  );

  // 🔄 Loader
  if (loading) {
    return <SkeletonLoader type="profile" count={1} />;
  }

  // ❌ Error
  if (error) {
    return <div className="error">{error}</div>;
  }

  // ❌ Not found
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

          {/* IMAGE */}
          <div className="wp-image-box">
            <img
              src={worker.profile_photo || "/default.png"}
              alt={worker.name}
            />
            {worker.verified && (
              <span className="wp-verified">✔ Verified</span>
            )}
          </div>

          {/* BASIC INFO */}
          <h2 className="wp-name">{worker.name || "No Name"}</h2>
          <p className="wp-role">{worker.role || "Worker"}</p>

          <div className="wp-rating">
            ⭐ {worker.rating || 0} ({worker.reviews || 0} reviews)
          </div>

          <div className="wp-info">
            <p><strong>Age:</strong> {worker.age || "N/A"}</p>
            <p><strong>Experience:</strong> {worker.experience || "N/A"}</p>
            <p><strong>Location:</strong> {worker.location || "N/A"}</p>
          </div>

          {/* ABOUT */}
          {worker.about && (
            <div className="wp-about">
              <h3>About</h3>
              <p><strong>Language:</strong> {worker.about.language || "N/A"}</p>
              <p><strong>Education:</strong> {worker.about.education || "N/A"}</p>
              <p><strong>Religion:</strong> {worker.about.religion || "N/A"}</p>
              <p><strong>Status:</strong> {worker.about.status || "N/A"}</p>
              <p className="wp-description">
                {worker.about.description || ""}
              </p>
            </div>
          )}

          {/* SALARY */}
          <div className="wp-salary">
            <h3>Salary Details</h3>

            {worker.salary?.partTime && (
              <div className="wp-salary-card">
                <h4>Part Time</h4>
                <p>{worker.salary.partTime.price}</p>
                <div className="wp-slots">
                  {worker.salary.partTime.slots?.map((slot, index) => (
                    <span key={index}>{slot}</span>
                  ))}
                </div>
              </div>
            )}

            {worker.salary?.fullTime && (
              <div className="wp-salary-card">
                <h4>Full Time</h4>
                <p>{worker.salary.fullTime.price}</p>
                <div className="wp-slots">
                  {worker.salary.fullTime.slots?.map((slot, index) => (
                    <span key={index}>{slot}</span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ACTION */}
          <button
            className="wp-stop-btn"
            onClick={() =>
              navigate(`/manage-workers/stop/${worker.id}`)
            }
          >
            Stop Service
          </button>

        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;