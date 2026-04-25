import React, { useState, useEffect } from "react";
import forgot from "../../assets/img/forgot.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "../../redux/slices/authSlice";
import { getUserMobile, maskMobile } from "../../utils/mobileHelper";

const mobile = getUserMobile();

const OtpVerify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  // ✅ 6 digit OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // ⏳ resend timer
  const [timer, setTimer] = useState(30);

  // 🔁 countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔢 handle input
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // 👉 auto focus next
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    // 🔥 auto submit when full
    if (newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  // ⬅️ backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // 📋 paste support
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    // focus last
    document.getElementById(`otp-${newOtp.length - 1}`)?.focus();

    if (newOtp.length === 6) {
      handleVerify(pasteData);
    }
  };

  // ✅ verify
  const handleVerify = async (autoOtp) => {
    const enteredOtp = autoOtp || otp.join("");

    if (enteredOtp.length !== 6) {
      return Swal.fire("Invalid OTP", "Enter 6-digit OTP", "warning");
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
          const isForgot = localStorage.getItem("resetMobile");

          if (isForgot) {
            navigate("/reset-password");
          } else {
            navigate("/complete-profile");
          }
        });
      } else {
        Swal.fire("Invalid OTP", result.payload, "error");
      }
    } catch {
      Swal.fire("Error", "Unable to verify OTP!", "error");
    }
  };

  // 🔁 resend
  const handleResend = async () => {
    if (timer > 0) return;

    try {
      const result = await dispatch(resendOtp());

      if (resendOtp.fulfilled.match(result)) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "OTP Resent 📱",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimer(30); // reset timer
      } else {
        Swal.fire("Error", result.payload, "error");
      }
    } catch {
      Swal.fire("Error", "Failed to resend OTP!", "error");
    }
  };

  return (
    <div className="login-page">

      {/* TOP */}
      <div className="login-top">
        <img src={forgot} alt="ALLINEUP" />
      </div>

      {/* CARD */}
      <div className="login-card otp-card">

        <p className="otp-text">
          We have sent OTP on your number <br />
          <strong>{maskMobile(mobile)}</strong>
        </p>

        {/* OTP INPUTS */}
        <div className="otp-inputs" onPaste={handlePaste}>
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

        {/* RESEND */}
        <p className="resend-text">
          Didn’t receive OTP?{" "}
          <span
            onClick={handleResend}
            style={{
              color: timer > 0 ? "gray" : "blue",
              cursor: timer > 0 ? "not-allowed" : "pointer",
            }}
          >
            {timer > 0 ? `Resend in ${timer}s` : "Resend"}
          </span>
        </p>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button
            className="login-btn"
            onClick={() => handleVerify()}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP →"}
          </button>
        </div>

      </div>

      {/* BACK */}
      <p className="signup-text">
        Back to{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default OtpVerify;