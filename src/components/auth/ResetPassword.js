import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return toast.error("All fields are required!");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password Updated!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to reset password!");
      }
    } catch (error) {
      toast.error("Unable to update password!");
    }
  };

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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            placeholder="Re-Enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <button className="login-btn" onClick={handleResetPassword}>
            Update Password <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      {/* WORKER */}
      <button
        className="worker-btn"
        onClick={() => navigate("/worker-login")}
      >
        Login As Worker
      </button>

      {/* LOGIN */}
      <p className="signup-text">
        Back to <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default ResetPassword;