import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="login-page">
      {/* TOP */}
      <div className="login-top">
        <div className="logo-circle">
         <img src={logo} alt="ALLINEUP" />
        </div>
        <h2>Reset Password</h2>
      </div>

      {/* CARD */}
      <div className="login-card">
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
            placeholder="Re-Enter Password"
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
          <button className="login-btn">Update Password →</button>
        </div>
      </div>

      {/* WORKER */}
      <button className="worker-btn">Login As Worker</button>

      {/* LOGIN */}
      <p className="signup-text">
        Back to <span onClick={()=>navigate("/login" )}>Login</span>
      </p>
    </div>
  );
};

export default ResetPassword;
