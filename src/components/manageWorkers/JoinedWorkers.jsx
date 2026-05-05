import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyWorkers } from "../../redux/slices/workerSlice";
import SkeletonLoader from "../common/SkeletonLoader";

const JoinedWorkers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector((state) => state.workers);

  useEffect(() => {
    dispatch(getMyWorkers());
  }, [dispatch]);

  // ✅ Filter active workers
  const activeWorkers = list.filter((worker) => worker.status === "active");

  // 🔄 LOADER
  if (loading) {
    return <SkeletonLoader type="worker" count={3} />;
  }

  // ❌ ERROR
  if (error) {
    return <div className="error">{error}</div>;
  }

  // ❌ NO DATA
  if (activeWorkers.length === 0) {
    return <div className="no-data">No active workers found</div>;
  }

  return (
    <div className="worker-list">
      {activeWorkers.map((worker) => (
        <div
          className="worker-card"
          key={worker.id}
          onClick={() => navigate(`/manage-workers/profile/${worker.id}`)}
          style={{ cursor: "pointer" }}
        >
          <img src={worker.profile_photo || "/default.png"} alt={worker.name} />

          <div className="info">
            <h4>{worker.name || "No Name"}</h4>

            <p>Experience {worker.experience || "N/A"}</p>

            <p>{worker.role || "Worker"}</p>

            <p>
              {worker.salary?.partTime?.slots?.join(", ") || ""}{" "}
              {worker.salary?.partTime?.price || ""}
            </p>

            {/* OPTIONAL BUTTON (can keep or remove) */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // ⚠️ prevent double click trigger
                navigate(`/manage-workers/profile/${worker.id}`);
              }}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinedWorkers;
