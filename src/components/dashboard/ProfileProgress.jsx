import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileProgress = ({
  percentage = 60,
  onCompleteClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="profile-progress-card">
      <div className="profile-progress-left">
        <h3>Complete your Profile</h3>

        <button
          className="complete-btn"
          onClick={onCompleteClick || (() => navigate("/complete-profile"))}
        >
          Complete
        </button>
      </div>

      <div className="profile-progress-right">
        <div
          className="progress-circle"
          style={{
            background: `conic-gradient(
              #f4b400 ${percentage * 3.6}deg,
              #eee ${percentage * 3.6}deg
            )`,
          }}
        >
          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileProgress;
