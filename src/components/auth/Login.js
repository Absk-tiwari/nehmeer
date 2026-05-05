import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
    const savedRole = localStorage.getItem("userRole");

    if (savedMobile) {
      setMobile(savedMobile);
      setRemember(true);
    }

    if (savedRole) {
      setRole(savedRole); // ✅ restore role
    }
  }, []);

  const handleLogin = async () => {
    if (!mobile || !password) {
      return Swal.fire("Missing Fields", "All fields required!", "warning");
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return Swal.fire("Invalid Mobile", "Enter valid number", "error");
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

        // ✅ Save role for future
        localStorage.setItem("userRole", role);

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Login Successful (${role}) 🎉`,
          showConfirmButton: false,
          timer: 2000,
        });

        // ✅ ROLE BASED REDIRECT (INDUSTRY LEVEL)
        if (role === "worker") {
          navigate("/worker-dashboard"); // 👉 create later if not exist
        } else {
          navigate("/dashboard");
        }

      } else {
        Swal.fire("Login Failed", result.payload, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
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
            {loading ? "Logging in..." : (
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