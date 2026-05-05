import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyWorkers } from "../../redux/slices/workerSlice";
import SkeletonLoader from "../common/SkeletonLoader";


const WorkerHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.workers);

  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    dispatch(getMyWorkers());
  }, [dispatch]);

  const handleMenuToggle = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  // ✅ FILTER HISTORY WORKERS
  const historyWorkers = list.filter(
    (worker) => worker.status !== "active"
  );

  if (loading) return <SkeletonLoader type="worker" count={3} />;

  if (!historyWorkers.length) {
    return <div>No worker history found</div>;
  }

  return (
    <div className="worker-list">
      {historyWorkers.map((worker) => (
        <div className="worker-card" key={worker.id}>

          <img
            src={worker.profile_photo || "/default.png"}
            alt={worker.name}
          />

          <div className="info">
            <h4>{worker.name || "No Name"}</h4>

            <p>Experience {worker.experience || "N/A"}</p>

            <p>{worker.role || "Worker"}</p>

            <p>
              {worker.salary?.partTime?.slots?.join(", ") || ""}
              {" "}
              {worker.salary?.partTime?.price || ""}
            </p>

            <div className="worker-rating">
              ⭐ {worker.rating || 0}
            </div>
          </div>

          {/* 3 DOT MENU */}
          <div className="menu-wrapper">
            <span
              className="three-dot-btn"
              onClick={() => handleMenuToggle(worker.id)}
            >
              ⋮
            </span>

            {openMenuId === worker.id && (
              <div className="dropdown">
                <div
                  onClick={() =>
                    navigate(`/manage-workers/feedback/${worker.id}`)
                  }
                >
                  Write Review
                </div>

                <div
                  onClick={() =>
                    navigate(`/manage-workers/stop/${worker.id}`)
                  }
                >
                  Stop Service
                </div>
              </div>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

export default WorkerHistory;