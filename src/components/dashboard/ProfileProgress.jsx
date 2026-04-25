import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileProgress = ({ onCompleteClick }) => {
  const navigate = useNavigate();

  // ✅ Get profile from redux
  const { profile } = useSelector((state) => state.profile || {});

  // ✅ Calculate completion %
  const calculateProgress = () => {
    if (!profile) return 0;

    const fields = ["name", "whatsapp", "gender", "lookingFor", "location"];
    const filled = fields.filter((field) => profile[field]).length;

    return Math.round((filled / fields.length) * 100);
  };

  const percentage = calculateProgress();

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