import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/img/logo.svg";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleLogin = async () => {
    // ✅ Validation
    if (!mobile || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "All fields are required!",
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
      const result = await dispatch(
        loginUser({ mobile, password })
      ).unwrap();
      
      // ✅ Remember Me
      if (remember) {
        localStorage.setItem("userMobile", mobile);
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Login Successful 🎉",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error,
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-top">
        <div className="logo-circle">
          <img src={logo} alt="ALLINEUP" />
        </div>
        <h2>Login</h2>
      </div>

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

        <label>Enter Password</label>
        <div className="input-box password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Icon
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="options">
          <div className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <span>Remember Me</span>
          </div>
          <span
            className="forgot"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </div>

        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={handleLogin}>
            Login <Icon icon="mdi:arrow-right" />
          </button>
        </div>
      </div>

      <button
        className="worker-btn"
        onClick={() => navigate("/worker-login")}
      >
        Login As Worker
      </button>

      <p className="signup-text">
        Don't have an account?{" "}
        <span onClick={() => navigate("/register")}>
          Sign Up Now
        </span>
      </p>
    </div>
  );
};

export default Login;