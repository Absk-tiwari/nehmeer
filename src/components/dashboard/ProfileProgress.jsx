import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { calculateProfileCompletion, getProgressColor } from "../../utils/profileUtils";

const ProfileProgress = ({ onCompleteClick }) => {
  const navigate = useNavigate();

  const { user, workerProfile, availability } = useSelector((state) => state.auth);

  const percentage = calculateProfileCompletion({ user, workerProfile, availability });
  const progressColor = getProgressColor(percentage);

  return (
    <div className="profile-progress-card">
      <div className="profile-progress-left">
        <h3>Complete your Profile</h3>

        <button
          className="complete-btn"
          onClick={
            onCompleteClick || (() => navigate("/complete-profile"))
          }
        >
          Complete
        </button>
      </div>

      <div className="profile-progress-right">
        <div
          className="progress-circle"
          style={{
            background: `conic-gradient(
              ${progressColor} ${percentage * 3.6}deg,
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