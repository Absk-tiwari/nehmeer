import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/img/logo.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();

  return (
    <div className="login-page">
      {/* Top Section */}
      <div className="login-top">
        <div className="logo-circle">
          <img src={logo} alt="ALLINEUP" />
          {/* <span>ALLINEUP</span> */}
        </div>
        <h2>Login</h2>
      </div>

      {/* Card */}
      <div className="login-card">
        <label>Enter Mobile No.</label>
        <div className="input-box phone">
          <span>+91|</span>
          <input type="text" placeholder="Enter Phone Number" />
        </div>

        <label>Enter Password</label>
        <div className="input-box password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
          />
          <Icon
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="options">
          <div className="remember">
            <input type="checkbox" />
            <span>Remember Me</span>
          </div>
          <span className="forgot" onClick={()=>Navigate("/forgot-password")}>Forgot Password?</span>
        </div>

        {/* Attached Button */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={()=>Navigate("/dashboard")}> 
            Login <Icon icon="mdi:arrow-right" />
          </button>
        </div>
      </div>

      {/* Worker Button */}
      <button className="worker-btn" >Login As Worker</button>

      <p className="signup-text">
        Don't have an account? <span onClick={() => Navigate("/register")}>Sign Up Now</span>
      </p>
    </div>
  );
};

export default Login;
