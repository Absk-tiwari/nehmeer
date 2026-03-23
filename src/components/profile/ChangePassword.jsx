import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = () => {
    console.log("Call change password API here");
  };

  return (
    <div className="login-page">

      {/* TOP */}
      <div className="login-top">
        <div className="logo-circle">
          <img src={logo} alt="ALLINEUP" />
        </div>
        <h2>Change Password</h2>
      </div>

      {/* CARD */}
      <div className="login-card">

        {/* CURRENT PASSWORD */}
        <label>Current Password</label>
        <div className="input-box password">
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter Current Password"
          />
          <span
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            style={{ cursor: "pointer" }}
          >
            {showCurrentPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* NEW PASSWORD */}
        <label>New Password</label>
        <div className="input-box password">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter New Password"
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            style={{ cursor: "pointer" }}
          >
            {showNewPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <label>Confirm Password</label>
        <div className="input-box password">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter Password"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ cursor: "pointer" }}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={handleChangePassword}>
            Change Password →
          </button>
        </div>

      </div>

      {/* BACK */}
      <p className="signup-text">
        Back to <span onClick={() => navigate("/settings")}>Settings</span>
      </p>

    </div>
  );
};

export default ChangePassword;