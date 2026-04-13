import React, { useState } from "react";
import forgot from "../../assets/img/forgot.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resendOtp, verifyOtp } from "../../redux/slices/authSlice";
import { getUserMobile, maskMobile } from "../../utils/mobileHelper";

const mobile = getUserMobile();


const OtpVerify = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // 👉 auto focus next
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // 👉 backspace focus previous
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

 const dispatch = useDispatch();

const handleVerify = async () => {
  const enteredOtp = otp.join("");

  if (enteredOtp.length !== 4) {
    Swal.fire({
      icon: "warning",
      title: "Invalid OTP",
      text: "Please enter complete 4-digit OTP!",
    });
    return;
  }

  try {
    const result = await dispatch(verifyOtp({ otp: enteredOtp }));

    if (verifyOtp.fulfilled.match(result)) {
      Swal.fire({
        icon: "success",
        title: "OTP Verified ✅",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // 🔥 Flow handle
        const isForgot = localStorage.getItem("resetMobile");

        if (isForgot) {
          navigate("/reset-password");
        } else {
          navigate("/complete-profile");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: result.payload,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Unable to verify OTP!",
    });
  }
};

const handleResend = async () => {
  try {
    const result = await dispatch(resendOtp());

    if (resendOtp.fulfilled.match(result)) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "OTP Resent 📱",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.payload,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to resend OTP!",
    });
  }
};

  return (
    <div className="login-page">
      {/* TOP */}
      <div className="login-top">
        <div>
          <img src={forgot} alt="ALLINEUP" />
        </div>
      </div>

      {/* CARD */}
      <div className="login-card otp-card">
        <p className="otp-text">
          We have sent OTP on your number
          <br />
          <strong>{maskMobile(mobile)}</strong>
        </p>

        {/* OTP INPUTS */}
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <p className="resend-text">
          Didn’t receive OTP?{" "}
          <span onClick={handleResend}>Resend</span>
        </p>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={handleVerify}>
            Verify OTP →
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

      {/* BACK */}
      <p className="signup-text">
        Back to{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default OtpVerify;