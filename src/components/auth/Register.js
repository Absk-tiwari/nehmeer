import React from "react";
import { Icon } from "@iconify/react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const Navigate = useNavigate();
  return (
    <div className="login-page">
      {/* TOP SECTION */}
      <div className="login-top">
        <div className="logo-circle">
         < img src={logo} alt="ALLINEUP" />
        </div>
        <h2>Sign Up</h2>
      </div>

      {/* CARD */}
      <div className="login-card">
        {/* MOBILE */}
        <label>Enter Mobile No.</label>
        <div className="input-box phone">
          <span>+91|</span>
          <input type="text" placeholder="Enter Phone Number" />
        </div>

        {/* PASSWORD */}
        <label>Set Password</label>
        <div className="input-box password">
          <input type="password" placeholder="Enter Password" />
          <Icon icon="mdi:eye-off-outline" />
        </div>

        {/* CONFIRM PASSWORD */}
        <label>Confirm Password</label>
        <div className="input-box password">
          <input type="password" placeholder="Re-Enter Password" />
          <Icon icon="mdi:eye-off-outline" />
        </div>

        {/* TERMS */}
        <div className="terms">
          <input type="checkbox" />
          <p>
            By Continuing, I Agree To The{" "}
            <span>Terms & Conditions</span> And{" "}
            <span>Privacy Policy</span>.
          </p>
        </div>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={()=>Navigate("/otp")}>Send OTP →</button>
        </div>
      </div>

      {/* WORKER */}
      <button className="worker-btn">Login As Worker</button>

      {/* LOGIN LINK */}
      <p className="signup-text">
        Already have an account? <span onClick={()=>Navigate("/login" )}>Login</span>
        
      </p>
    </div>
  );
};

export default Signup;
