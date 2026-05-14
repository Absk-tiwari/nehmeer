import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserGroup,
  faFileLines,
  faUser,
  faHeart,
  faCreditCard,
  faLocationDot,
  faLanguage,
  faInfoCircle,
  faFileContract,
  faShieldHalved,
  faCertificate,
  faHeadset,
  faStar,
  faGear,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { logout } from "../../redux/slices/authSlice";
import ConfirmModal from "../common/ConfirmModal";
import placeholderImage from "../../assets/img/avatar.jpg";

const MobileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { user, role } = useSelector((state) => state.auth);
  const isLoggedIn = !!localStorage.getItem("token");

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    dispatch(logout());
    onClose();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const mainNavItems = [
    { path: "/dashboard", label: "Home", icon: faHouse },
    { path: "/manage-workers", label: "Manage Workers", icon: faUserGroup, requiresAuth: true },
    { path: "/all-posts", label: "My Posts", icon: faFileLines, hideForWorker: true, requiresAuth: true },
    { path: "/profile", label: "Profile", icon: faUser, requiresAuth: true },
  ].filter((item) => {
    if (item.hideForWorker && role === "worker") return false;
    if (item.requiresAuth && !isLoggedIn) return false;
    return true;
  });

  const menuItems = [
    { path: "/favourites", label: "Favourites", icon: faHeart, requiresAuth: true },
    { path: "/subscription", label: "My Subscription", icon: faCreditCard, requiresAuth: true },
    { path: "/saved-location", label: "Saved Location", icon: faLocationDot, requiresAuth: true },
    { path: "/language", label: "Language", icon: faLanguage, requiresAuth: true },
    { path: "/about", label: "About Us", icon: faInfoCircle },
    { path: "/terms", label: "Terms & Conditions", icon: faFileContract },
    { path: "/privacy-policy", label: "Privacy Policy", icon: faShieldHalved },
    { path: "/license", label: "License", icon: faCertificate },
    { path: "/support", label: "Help & Support", icon: faHeadset, requiresAuth: true },
    { path: "/rate", label: "Rate Us", icon: faStar },
    { path: "/settings", label: "Settings", icon: faGear, requiresAuth: true },
  ].filter((item) => !(item.requiresAuth && !isLoggedIn));

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />

      <aside className={`mobile-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          {isLoggedIn ? (
            <div className="sidebar-user" onClick={() => handleNavigate("/profile")}>
              <img
                src={user?.profile_photo ?? placeholderImage}
                alt="profile"
                className="sidebar-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImage;
                }}
              />
              <div className="sidebar-user-info">
                <h4>{user?.name || "User"}</h4>
                <p>{user?.phone || user?.email || "View Profile"}</p>
              </div>
            </div>
          ) : (
            <div className="sidebar-user" onClick={() => handleNavigate("/login")}>
              <div className="sidebar-avatar-placeholder">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="sidebar-user-info">
                <h4>Welcome</h4>
                <p>Login / Sign Up</p>
              </div>
            </div>
          )}

          <button className="sidebar-close" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <span className="sidebar-section-title">Navigation</span>
            {mainNavItems.map((item) => (
              <div
                key={item.path}
                className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
                onClick={() => handleNavigate(item.path)}
              >
                <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="sidebar-section">
            <span className="sidebar-section-title">More</span>
            {menuItems.map((item) => (
              <div
                key={item.path}
                className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
                onClick={() => handleNavigate(item.path)}
              >
                <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>

        {isLoggedIn && (
          <div className="sidebar-footer">
            <div className="sidebar-item logout" onClick={handleLogoutClick}>
              <FontAwesomeIcon icon={faRightFromBracket} className="sidebar-icon" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </aside>

      <ConfirmModal
        visible={showLogoutModal}
        message="Are you sure you want to log out of your account?"
        onCancel={() => setShowLogoutModal(false)}
        onSuccess={handleLogoutConfirm}
        icon="logout"
        btnText="Log Out"
      />
    </>
  );
};

export default MobileSidebar;
