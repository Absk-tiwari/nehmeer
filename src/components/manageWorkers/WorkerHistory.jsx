import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { manageWorkersData } from "../data/manageWorkersData";

const WorkerHistory = () => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  return (
    <div className="worker-list">
      {manageWorkersData.map((worker) => (
        <div className="worker-card" key={worker.id}>
          
          <img src={worker.image} alt={worker.name} />

          <div className="info">
            <h4>{worker.name}</h4>
            <p>Experience {worker.experience}</p>
            <p>{worker.role}</p>
            <p>
              {worker.salary.partTime.slots.join(", ")}{" "}
              {worker.salary.partTime.price}
            </p>
            <div className="worker-rating">
              {"★".repeat(worker.rating)}
            </div>
          </div>

          {/* Three Dot */}
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