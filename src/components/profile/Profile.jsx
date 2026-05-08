import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faGem,
  faLocationDot,
  faLanguage,
  faCircleInfo,
  faFileLines,
  faHeadset,
  faStar,
  faGear,
  faUser,
  faChevronDown,
  faXmark,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";
import placeholderImage from "../../assets/img/placeholder.png";

const LANGUAGES = [
  "Arabic",
  "Bengali",
  "English",
  "French",
  "German",
  "Hindi",
  "Italian",
  "Japanese",
  "Javanese",
  "Korean",
  "Marathi",
  "Portuguese",
  "Russian",
  "Spanish"
];

const calculateProfileCompletion = (user) => {
  if (!user) return 0;
  const fields = ["name", "email", "profile_photo", "phone", "gender", "lookingFor"];
  let filled = 0;
  fields.forEach((field) => {
    if (user[field] !== null && user[field] !== "" && user[field] !== undefined) {
      filled++;
    }
  });
  return Math.round((filled / fields.length) * 100);
};

const giveMeColor = (progress) => {
  if (progress < 40) return "#f46565";
  if (progress < 80) return "#fcb353";
  return "#8AA05A";
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  const ProfileProgress = calculateProfileCompletion(user);

  const menu = [
    { title: "Favourites", icon: faHeart, path: "/favourites" },
    { title: "My Subscription", icon: faGem, path: "/subscription" },
    { title: "Saved Location", icon: faLocationDot, path: "/saved-location" },
    { title: "Language", icon: faLanguage, action: "modal", right: currentLanguage },
    { title: "About Us", icon: faCircleInfo, path: "/about" },
    { title: "Terms and Conditions", icon: faFileLines, path: "/terms" },
    { title: "Help & Support", icon: faHeadset, path: "/support" },
    { title: "Rate us", icon: faStar, path: "/rate" },
    { title: "Settings", icon: faGear, path: "/settings" },
  ];

  const handleMenuClick = (item) => {
    if (item.action === "modal") {
      setShowLanguageModal(true);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleLanguageSelect = (lang) => {
    setCurrentLanguage(lang);
    setShowLanguageModal(false);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
      </div>
    );
  }

  return (
    <AppLayout
      header={
        <CommonHeader
          title="My Profile"
          data={[
            { icon: "notifications-outline", path: "/notifications" }
          ]}
        />
      }
    >
      {/* Profile Card */}
      <div className="profile-card">
        {user?.profile_photo ? (
          <img
            src={user.profile_photo}
            alt={user?.name || "Profile"}
            className="profile-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholderImage;
            }}
          />
        ) : (
          <div className="profile-avatar profile-avatar-placeholder">
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}

        <div className="profile-info">
          <span className="profile-name">{user?.name || "Update Name"}</span>
          <span className="profile-email">{user?.email || "Update Email"}</span>

          {ProfileProgress < 100 && (
            <>
              <div className="profile-progress-bg">
                <div
                  className="profile-progress-fill"
                  style={{
                    width: `${ProfileProgress}%`,
                    backgroundColor: giveMeColor(ProfileProgress)
                  }}
                />
                <span className="profile-percent">{ProfileProgress}%</span>
              </div>
              <span className="profile-progress-text">Profile Setup In Progress</span>
            </>
          )}

          <button
            className="profile-complete-btn"
            onClick={() => navigate("/complete-profile")}
          >
            <span className="profile-complete-text">
              {ProfileProgress < 100 ? "Complete" : "Edit"} profile
            </span>
          </button>
        </div>
      </div>

      {/* Menu List */}
      <div className="profile-menu">
        {menu.map((item, index) => (
          <div
            key={index}
            className="profile-menu-item"
            onClick={() => handleMenuClick(item)}
          >
            <div className="profile-menu-left">
              {item.icon && <FontAwesomeIcon icon={item.icon} className="profile-menu-icon" />}
              <span className="profile-menu-text">{item.title}</span>
            </div>

            {item.right && (
              <div className="profile-menu-right">
                <span className="profile-lang">{item.right}</span>
                <FontAwesomeIcon icon={faChevronDown} className="profile-chevron" />
              </div>
            )}
          </div>
        ))}
        <div className="profile-menu-footer"></div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="profile-sheet-overlay" onClick={() => setShowLanguageModal(false)}>
          <div className="profile-filter-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="profile-sheet-header">
              <span className="profile-sheet-title">Language</span>
              <div onClick={() => setShowLanguageModal(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            {LANGUAGES.map((lang) => (
              <div
                key={lang}
                className="profile-lang-row"
                onClick={() => handleLanguageSelect(lang)}
              >
                <span className="profile-lang-text">{lang}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Profile;
