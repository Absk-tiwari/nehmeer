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

  const user = useSelector((state) => state.auth.user);
  const { role } = user || {};
  const isLoggedIn = !!user;
  const isEmp = role === "employer" || role === "admin";
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

      {isEmp && <div
        className={isActive("/manage-workers") ? "active" : ""}
        onClick={() => navigate("/manage-workers")}
      >
        <FontAwesomeIcon icon={faUserGroup} className="nav-icon fs-3" />
        <span style={{fontWeight:600}}>Manage Workers</span>
      </div>}

        <div
          className={isActive("/all-posts") ? "active" : ""}
          onClick={() => navigate("/all-posts")}
        >
          <FontAwesomeIcon icon={faFileLines} className="nav-icon fs-3" />
          <span style={{fontWeight:600}}>{role !== undefined && role !== 'worker' ? 'My Posts': "Posts"} </span>
        </div>

      <div
        className={isActive(isLoggedIn ? "/profile" : "/login") ? "active" : ""}
        onClick={() => navigate(isLoggedIn ? "/profile" : "/login")}
      >
        <FontAwesomeIcon icon={faUser} className="nav-icon fs-3" />
        <span style={{fontWeight:600}}>{isLoggedIn ? "Profile" : "Login"}</span>
      </div>
    </nav>
  );
};

export default BottomNav;