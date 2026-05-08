import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const LoginPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="login-prompt">
      <div className="login-prompt-content">
        <Icon icon="mdi:account-lock" className="login-prompt-icon" />
        <h2>Login Required</h2>
        <p>Please login to access this feature</p>
        <div className="login-prompt-buttons">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="btn-secondary" onClick={() => navigate("/register")}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;
