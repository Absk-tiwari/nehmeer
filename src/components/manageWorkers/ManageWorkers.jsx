import { useState, lazy, Suspense } from "react";
import SkeletonLoader from "../common/SkeletonLoader";

// 🔥 Lazy load (performance boost)
const JoinedWorkers = lazy(() => import("./JoinedWorkers"));
const WorkerHistory = lazy(() => import("./WorkerHistory"));

const ManageWorkers = () => {
  // 🔥 Persist tab (refresh pe same tab open hoga)
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("workerTab") || "joined"
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("workerTab", tab);
  };

  return (
    <div className="manage-container">
      <div className="manage-header">
        <h2>Manage Workers</h2>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === "joined" ? "active" : ""}
          onClick={() => handleTabChange("joined")}
        >
          Joined for work
        </button>

        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => handleTabChange("history")}
        >
          History
        </button>
      </div>

      {/* 🔄 LAZY LOADING */}
      <Suspense fallback={<SkeletonLoader type="worker" count={3} />}>
        {activeTab === "joined" && <JoinedWorkers />}
        {activeTab === "history" && <WorkerHistory />}
      </Suspense>
    </div>
  );
};

export default ManageWorkers;