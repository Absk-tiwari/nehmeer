import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { forgotPassword } from './../../redux/slices/authSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const Navigate = useNavigate();
  const [mobile, setMobile] = useState("");

const dispatch = useDispatch();

const handleSendOTP = async () => {
  if (!mobile) {
    return toast.error("Mobile number is required!");
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return toast.error("Enter valid 10-digit mobile number!");
  }

  try {
    const result = await dispatch(forgotPassword({ mobile }));

    if (forgotPassword.fulfilled.match(result)) {
      toast.success("OTP Sent!");
      setTimeout(() => {
        Navigate("/otp");
      }, 1500);
    } else {
      toast.error(result.payload || "Something went wrong!");
    }
  } catch (error) {
    toast.error("Unable to connect. Please try again!");
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
            Send OTP <FontAwesomeIcon icon={faArrowRight} />
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