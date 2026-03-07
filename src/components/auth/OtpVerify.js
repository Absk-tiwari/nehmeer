import React, { useState } from "react";
import forgot from "../../assets/img/forgot.svg";
import { useNavigate } from "react-router-dom";

const OtpVerify = () => {
  const navigate = useNavigate();

  // 🔮 Future Redux/API ready
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);

    // 🔮 FUTURE
    // dispatch(verifyOtp({ otp: enteredOtp }))
    navigate("/reset-password");
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
          <strong>**********3453</strong>
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
            />
          ))}
        </div>

        <p className="resend-text">
          Didn’t receive OTP? <span>Resend</span>
        </p>

        {/* BUTTON */}
        <div className="login-btn-wrapper">
          <button className="login-btn" onClick={handleVerify}>
            Verify OTP →
          </button>
        </div>
      </div>

      {/* WORKER */}
      <button className="worker-btn">Login As Worker</button>

      {/* BACK */}
      <p className="signup-text">
        Back to <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default OtpVerify;
