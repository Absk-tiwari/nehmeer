import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserGroup,
  faFileLines,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faHouse} className="nav-icon" />
        <span>Home</span>
      </div>

      <div
        className={isActive("/manage-workers") ? "active" : ""}
        onClick={() => navigate("/manage-workers")}
      >
        <FontAwesomeIcon icon={faUserGroup} className="nav-icon" />
        <span>Manage Workers</span>
      </div>

      <div
        className={isActive("/all-posts") ? "active" : ""}
        onClick={() => navigate("/all-posts")}
      >
        <FontAwesomeIcon icon={faFileLines} className="nav-icon" />
        <span>My Posts</span>
      </div>

      <div
        className={isActive("/profile") ? "active" : ""}
        onClick={() => navigate("/profile")}
      >
        <FontAwesomeIcon icon={faUser} className="nav-icon" />
        <span>Profile</span>
      </div>
    </nav>
  );
};

export default BottomNav;