import { useNavigate } from "react-router-dom";
import { manageWorkersData } from "../data/manageWorkersData";

const JoinedWorkers = () => {
  const navigate = useNavigate();

  // show only active workers
  const activeWorkers = manageWorkersData.filter(
    (worker) => worker.status === "active"
  );

  return (
    <div className="worker-list">
      {activeWorkers.map((worker) => 
     (
       
        <div className="worker-card" key={worker.id}>
            { console.log("workerrrrrrrr",worker)}
          <img src={worker.image} alt={worker.name} />

          <div className="info">
            <h4>{worker.name}</h4>
            <p>Experience {worker.experience}</p>
            <p>{worker.role}</p>
            <p>{worker.salary.partTime.slots.join(", ")} {worker.salary.partTime.price}</p>

            <button
              onClick={() =>
              navigate(`/manage-workers/profile/${worker.id}`)
              }
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