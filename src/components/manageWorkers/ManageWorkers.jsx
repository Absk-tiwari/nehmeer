import { useState } from "react";
import JoinedWorkers from "./JoinedWorkers";
import WorkerHistory from "./WorkerHistory";

const ManageWorkers = () => {
  const [activeTab, setActiveTab] = useState("joined");

  return (
    <div className="manage-container">
      <div className="manage-header">
        <h2>Manage Workers</h2>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "joined" ? "active" : ""}
          onClick={() => setActiveTab("joined")}
        >
          Joined for work
        </button>

        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
      </div>

      {activeTab === "joined" ? <JoinedWorkers /> : <WorkerHistory />}
    </div>
  );
};

export default ManageWorkers;