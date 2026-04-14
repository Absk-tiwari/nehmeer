import React from "react";
import user1 from "../../assets/img/user1.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = ({ notificationCount = 0 }) => {

  const navigate = useNavigate();

  // ✅ Get user from Redux
const { user, loading } = useSelector((state) => state.auth);

  const menuItems = [
    { name: "Favourites", path: "/favourites" },
    { name: "My Subscription", path: "/subscription" },
    { name: "Saved Location", path: "/saved-location" },
    { name: "Language", path: "/language" },
    { name: "About Us", path: "/about" },
    { name: "Terms and Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "License", path: "/license" },
    { name: "Help & Support", path: "/support" },
    { name: "Rate us", path: "/rate" },
    { name: "Settings", path: "/settings" }
  ];
if (loading) {
  return <div>Loading...</div>; // ya apna Loader component use karo
}
  return (
    <div className="user-profile-page">

      {/* HEADER */}
      <div className="user-profile-header">
        <h2>My Profile</h2>

        <div
          className="notification"
          onClick={() => navigate("/notifications")}
        >
          🔔
          {notificationCount > 0 && (
            <span className="badge">{notificationCount}</span>
          )}
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="user-profile-card">

        <div className="user-profile-top">

          <img
            src={user?.profile_photo || user1}
            alt="profile"
            className="user-profile-img"
          />

          <div className="user-profile-info">

            {/* ✅ Dynamic Name */}
          <h3>{user?.name ?? "User Name"}</h3>
<p>{user?.email ?? user?.phone ?? "No Data"}</p>

            {/* Progress Bar */}
            <div className="user-profile-progress-bar">
              <div
                className="user-profile-progress-fill"
                style={{ width: user?.name ? "100%" : "60%" }}
              ></div>
            </div>

            <span className="user-profile-progress-text">
              {user?.name ? "Profile Completed ✅" : "Profile Setup In Progress"}
            </span>

            <button
              className="user-profile-complete-btn"
              onClick={() => navigate("/complete-profile")}
            >
              {user?.name ? "Edit Profile" : "Complete Profile"}
            </button>

          </div>

        </div>

      </div>

      {/* MENU */}
      <div className="user-profile-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="user-profile-menu-item"
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Profile;