import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { forgotPassword } from './../../redux/slices/authSlice';

const ForgotPassword = () => {
  const Navigate = useNavigate();
  const [mobile, setMobile] = useState("");

const dispatch = useDispatch();

const handleSendOTP = async () => {
  if (!mobile) {
    Swal.fire({
      icon: "warning",
      title: "Missing Field",
      text: "Mobile number is required!",
    });
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Mobile",
      text: "Enter valid 10-digit mobile number!",
    });
    return;
  }

  try {
    const result = await dispatch(forgotPassword({ mobile }));

    if (forgotPassword.fulfilled.match(result)) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "OTP Sent 📱",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        Navigate("/otp");
      }, 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.payload || "Something went wrong!",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Unable to connect. Please try again!",
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
        <h2>Forgot Password</h2>
      </div>

      {/* CARD */}
      <div className="login-card">
        <label>Enter Mobile No.</label>
        <div className="input-box phone">
          <span>+91|</span>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <p className="info-text">
          We will send you an OTP to reset your password.
        </p>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={handleSendOTP}>
            Send OTP →
          </button>
        </div>
      </div>

      {/* WORKER */}
      <button
        className="worker-btn"
        onClick={() => Navigate("/worker-login")}
      >
        Login As Worker
      </button>

      {/* LOGIN */}
      <p className="signup-text">
        Remember password?{" "}
        <span onClick={() => Navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default ForgotPassword;