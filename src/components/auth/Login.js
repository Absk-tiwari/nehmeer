import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [role, setRole] = useState("employer");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  // ✅ Autofill remembered mobile
  useEffect(() => {
    const savedMobile = localStorage.getItem("userMobile");

    if (savedMobile) {
      setMobile(savedMobile);
      setRemember(true);
    }

  }, []);

  const handleLogin = async () => {
    if (!mobile || !password) {
      return toast.error("All fields are required!");
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return toast.error("Enter a valid mobile number");
    }

    try {
      const result = await dispatch(
        loginUser({ mobile, password, role })
      );

      if (loginUser.fulfilled.match(result)) {

        // ✅ Remember Me
        if (remember) {
          localStorage.setItem("userMobile", mobile);
        } else {
          localStorage.removeItem("userMobile");
        }

        toast.success("Login Successful!");

        navigate("/dashboard");

      } else {
        toast.error(result.payload || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-top">
        <div className="logo-circle">
          <img src={logo} alt="ALLINEUP" />
        </div>

        <h2>
          Login {role === "worker" ? "" : ""}
        </h2>
      </div>

      {/* hidden role switch */}
      <div style={{ display: "none" }}>
        <button onClick={() => setRole("employer")}>Employer</button>
        <button onClick={() => setRole("worker")}>Worker</button>
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
            icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="options">
          <div className="remember">
            <input
              type="checkbox"
              checked={remember}
              style={{accentColor:'#7f9346'}}
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
          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <Icon icon="eos-icons:loading" className="btn-loader" />
            ) : (
              <>
                Login <Icon icon="mdi:arrow-right" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* ROLE TOGGLE */}
      <button
        className="worker-btn"
        onClick={() =>
          setRole(role === "worker" ? "employer" : "worker")
        }
      >
        {role === "worker"
          ? "Login As Employer"
          : "Login As Worker"}
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