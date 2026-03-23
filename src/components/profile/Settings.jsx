import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const settingsItems = [
    { name: "Notifications", path: "/notifications" },
    { name: "Change Password", path: "/change-password" },
    { name: "Log Out", action: "logout" },
    { name: "Delete Account", action: "delete" },
  ];

  const handleClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }

    if (item.action === "logout") {
      setShowLogoutModal(true);
    }

    if (item.action === "delete") {
      setShowDeleteModal(true);
    }
  };

  const handleLogout = () => {
    console.log("Call logout API here");

    // Example
    localStorage.removeItem("token");

    navigate("/login");
  };

  const handleDeleteAccount = () => {
    console.log("Call delete account API here");
    setShowDeleteModal(false);
  };

  return (
    <div className="settings-page">

      {/* HEADER */}
      <div className="settings-header">
        <button className="settings-back" onClick={() => navigate(-1)}>
          ←
        </button>
        <h2>Settings</h2>
      </div>

      {/* SETTINGS LIST */}
      <div className="settings-list">
        {settingsItems.map((item, index) => (
          <div
            key={index}
            className={`settings-item ${
              item.name === "Delete Account" ? "delete-item" : ""
            }`}
            onClick={() => handleClick(item)}
          >
            <span>{item.name}</span>
            <span className="settings-arrow">›</span>
          </div>
        ))}
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">

            <h3>Log Out</h3>

            <p>Are you sure you want to log out?</p>

            <div className="delete-modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                onClick={handleLogout}
              >
                Log Out
              </button>

            </div>

          </div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">

            <h3>Delete Account</h3>

            <p>
              Are you sure you want to delete your account?
              This action cannot be undone.
            </p>

            <div className="delete-modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="delete-btn"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;