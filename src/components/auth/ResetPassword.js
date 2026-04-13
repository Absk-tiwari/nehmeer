import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    // ✅ Validation
    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "All fields are required!",
      });
      return;
    }

    // ✅ Password length
    if (newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters!",
      });
      return;
    }

    // ✅ Match check
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
      });
      return;
    }

    try {
      // 🔥 API Ready
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: data.message || "Password Updated 🎉",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to reset password!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Unable to update password!",
      });
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
            {showNewPassword ? "🙈" : "👁️"}
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
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={handleResetPassword}>
            Update Password →
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