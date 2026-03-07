import React from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const Navigate = useNavigate();
  return (
    <div className="login-page">
      {/* TOP */}
      <div className="login-top">
        <div className="logo-circle">
          < img src={logo} alt="ALLINEUP" />
        </div>
        <h2>Forgot Password</h2>
      </div>

      {/* CARD */}
      <div className="login-card">
        <label>Enter Mobile No.</label>
        <div className="input-box phone">
          <span>+91|</span>
          <input type="text" placeholder="Enter Phone Number" />
        </div>

        <p className="info-text">
          We will send you an OTP to reset your password.
        </p>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={()=>Navigate("/otp")}>Send OTP →</button>
        </div>
      </div>

      {/* WORKER */}
      <button className="worker-btn">Login As Worker</button>

      {/* LOGIN */}
      <p className="signup-text">
        Remember password? <span onClick={()=>Navigate("/login")} >Login</span>
      </p>
    </div>
  );
};

export default ForgotPassword;
