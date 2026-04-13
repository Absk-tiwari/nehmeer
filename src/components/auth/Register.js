import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";

const Signup = () => {
  const Navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

const handleSignup = async () => {
  if (!mobile || !password || !confirmPassword) {
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

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Password Mismatch",
      text: "Passwords do not match!",
    });
    return;
  }

  if (!terms) {
    Swal.fire({
      icon: "warning",
      title: "Accept Terms",
      text: "Please accept Terms & Conditions",
    });
    return;
  }

  try {
    const result = await dispatch(
      registerUser({ mobile, password })
    );

    if (registerUser.fulfilled.match(result)) {
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
        title: "Signup Failed",
        text: result.payload,
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Try again later!",
    });
  }
};

  return (
    <div className="login-page">
      {/* TOP SECTION */}
      <div className="login-top">
        <div className="logo-circle">
          <img src={logo} alt="ALLINEUP" />
        </div>
        <h2>Sign Up</h2>
      </div>

      {/* CARD */}
      <div className="login-card">
        {/* MOBILE */}
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

        {/* PASSWORD */}
        <label>Set Password</label>
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

        {/* CONFIRM PASSWORD */}
        <label>Confirm Password</label>
        <div className="input-box password">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-Enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Icon
            icon={showConfirmPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />
        </div>

        {/* TERMS */}
        <div className="terms">
          <input
            type="checkbox"
            checked={terms}
            onChange={() => setTerms(!terms)}
          />
          <p>
            By Continuing, I Agree To The{" "}
            <span>Terms & Conditions</span> And{" "}
            <span>Privacy Policy</span>.
          </p>
        </div>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={handleSignup}>
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

      {/* LOGIN LINK */}
      <p className="signup-text">
        Already have an account?{" "}
        <span onClick={() => Navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default Signup;