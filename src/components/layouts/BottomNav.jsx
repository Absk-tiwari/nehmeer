import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <div
        className={isActive("/dashboard") ? "active" : ""}
        onClick={() => navigate("/dashboard")}
      >
        🏠<span>Home</span>
      </div>

       <div
        className={isActive("/manage-workers") ? "active" : ""}
        onClick={() => navigate("/manage-workers")}
      >
        👥<span>Manage Workers</span>
      </div>       

      <div onClick={() => navigate("/all-posts")}>
        📄<span>My Posts</span>
      </div>

      <div onClick={() => navigate("/profile")}>
        👤<span>Profile</span>
      </div>
    </nav>
  );
};

export default BottomNav;