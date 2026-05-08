import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = () => {
    console.log("Call change password API here");
  };

  return (
    <AppLayout header={<CommonHeader back title="Change Password" />}>
      <div className="change-password-page">

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
            <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
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
            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
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
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </span>
        </div>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={handleChangePassword}>
            Change Password <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

      </div>
      </div>
    </AppLayout>
  );
};

export default ChangePassword;