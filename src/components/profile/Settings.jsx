import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";
import ConfirmModal from "../common/ConfirmModal";
import { logout } from "../../redux/slices/authSlice";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    setShowLogoutModal(false);
    dispatch(logout());
    toast.success("Logged out successfully!");
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

      <ConfirmModal
        visible={showLogoutModal}
        message="Are you sure you want to log out of your account?"
        onCancel={() => setShowLogoutModal(false)}
        onSuccess={handleLogout}
        icon="logout"
        btnText="Log Out"
      />

      <ConfirmModal
        visible={showDeleteModal}
        message="You will lose access permanently"
        onCancel={() => setShowDeleteModal(false)}
        onSuccess={handleDeleteAccount}
        icon="trash"
        btnText="Delete Account"
      />
    </AppLayout>
  );
};

export default Settings;
