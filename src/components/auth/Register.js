import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ loader from redux
  const { loading } = useSelector((state) => state.auth);

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [role, setRole] = useState("employer"); // ✅ NEW

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (!mobile || !password || !confirmPassword) {
      return toast.error("All fields are required!");
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return toast.error("Enter valid 10-digit mobile number!");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (!terms) {
      return toast.error("Please accept Terms & Conditions");
    }

    try {
      const result = await dispatch(
        registerUser({ mobile, password, role })
      );

      if (registerUser.fulfilled.match(result)) {
        toast.success("Registration Successful!");
        setTimeout(() => {
          Navigate("/login");
        }, 1500);
      } else {
        toast.error(result.payload || "Signup failed");
      }
    } catch (err) {
      toast.error("Server error. Try again later!");
    }
  };

  return (
    <div className="login-page">
      {/* TOP SECTION */}
      <div className="login-top">
        <div className="logo-circle">
          <img src={logo} alt="ALLINEUP" />
        </div>
       <h2>
  Sign Up {role === "worker" ? "(Worker)" : "(Employer)"}
</h2>
      </div>

      {/* ROLE SWITCH (hidden logic, UI untouched) */}
      <div style={{ display: "none" }}>
        <button onClick={() => setRole("employer")}>Employer</button>
        <button onClick={() => setRole("worker")}>Worker</button>
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
          <button
            className="login-btn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing Up..." : <>Sign Up <FontAwesomeIcon icon={faArrowRight} /></>}
          </button>
        </div>
      </div>

      {/* WORKER */}
    <button
  className="worker-btn"
  onClick={() =>
    setRole(role === "worker" ? "employer" : "worker")
  }
>
  {role === "worker"
    ? "Register As Employer"
    : "Register As Worker"}
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