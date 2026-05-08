import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

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
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    console.log("Call delete account API here");
    setShowDeleteModal(false);
  };

  return (
    <AppLayout header={<CommonHeader back title="Settings" />}>
      <div className="settings-list">
        {settingsItems.map((item, index) => (
          <div
            key={index}
            className={`settings-item ${item.name === "Delete Account" ? "delete-item" : ""}`}
            onClick={() => handleClick(item)}
          >
            <span>{item.name}</span>
            <span className="settings-arrow">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        ))}
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Log Out</h3>
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn danger" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Account</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn danger" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Settings;
