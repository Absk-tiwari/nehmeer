import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserGroup,
  faFileLines,
  faUser,
  faBell,
  faSearch,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/img/logo.svg";

const DesktopHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notifications);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", label: "Home", icon: faHouse },
    { path: "/manage-workers", label: "Manage Workers", icon: faUserGroup },
    { path: "/all-posts", label: "My Posts", icon: faFileLines },
    { path: "/profile", label: "Profile", icon: faUser },
  ];

  return (
    <header className="desktop-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo-wrapper" onClick={() => navigate("/dashboard")}>
            <img src={logo} alt="Nehmeer" className="desktop-logo" />
            <span className="logo-text">Nehmeer</span>
          </div>
        </div>

        <nav className="header-nav">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <FontAwesomeIcon icon={item.icon} className="nav-item-icon" />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="header-right">
          <div className="header-action" onClick={() => navigate("/search")}>
            <FontAwesomeIcon icon={faSearch} />
          </div>

          <div
            className="header-action notification-action"
            onClick={() => navigate("/notifications")}
          >
            <FontAwesomeIcon icon={faBell} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </div>

          {user && (
            <div className="user-menu">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="user-name">{user.name || "User"}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
