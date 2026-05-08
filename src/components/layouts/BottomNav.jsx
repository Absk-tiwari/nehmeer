import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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

  const { role } = useSelector((state) => state.auth);
  const isWorker = role === "worker";

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <div
        className={isActive("/dashboard") ? "active" : ""}
        onClick={() => navigate("/dashboard")}
      >
        <FontAwesomeIcon icon={faHouse} className="nav-icon fs-3" />
        <span style={{fontWeight:600}}>Home</span>
      </div>

      <div
        className={isActive("/manage-workers") ? "active" : ""}
        onClick={() => navigate("/manage-workers")}
      >
        <FontAwesomeIcon icon={faUserGroup} className="nav-icon fs-3" />
        <span style={{fontWeight:600}}>Manage Workers</span>
      </div>

      {!isWorker && (
        <div
          className={isActive("/all-posts") ? "active" : ""}
          onClick={() => navigate("/all-posts")}
        >
          <FontAwesomeIcon icon={faFileLines} className="nav-icon fs-3" />
          <span style={{fontWeight:600}}>My Posts</span>
        </div>
      )}

      <div
        className={isActive("/profile") ? "active" : ""}
        onClick={() => navigate("/profile")}
      >
        <FontAwesomeIcon icon={faUser} className="nav-icon fs-3" />
        <span style={{fontWeight:600}}>Profile</span>
      </div>
    </nav>
  );
};

export default BottomNav;