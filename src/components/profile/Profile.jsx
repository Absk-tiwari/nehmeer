import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
import placeholderImage from "../../assets/img/avatar.jpg";
import { calculateProfileCompletion, getProgressColor } from "../../utils/profileUtils";
import { changeLanguage } from "../../i18n";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी (Hindi)" },
];

const Profile = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, workerProfile, availability, loading } = useSelector((state) => state.auth);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const currentLanguage = LANGUAGES.find((l) => l.code === i18n.language)?.label || "English";

  const ProfileProgress = calculateProfileCompletion({ user, workerProfile, availability });

  const menu = [
    { title: t("profile.favourites"), icon: faHeart, path: "/favourites" },
    { title: t("profile.my_subscription"), icon: faGem, path: "/subscription" },
    { title: t("location.saved_location"), icon: faLocationDot, path: "/saved-location" },
    { title: t("profile.language"), icon: faLanguage, action: "modal", right: currentLanguage },
    { title: t("profile.about_us"), icon: faCircleInfo, path: "/about" },
    { title: t("profile.terms_and_conditions"), icon: faFileLines, path: "/terms" },
    { title: t("navigation.help_support"), icon: faHeadset, path: "/support" },
    { title: t("profile.rate_us"), icon: faStar, path: "/rate" },
    { title: t("profile.settings"), icon: faGear, path: "/settings" },
  ];

  const handleMenuClick = (item) => {
    if (item.action === "modal") {
      setShowLanguageModal(true);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleLanguageSelect = (lang) => {
    changeLanguage(lang.code);
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
          title={t("profile.my_profile")}
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
                    backgroundColor: getProgressColor(ProfileProgress)
                  }}
                />
                <span className="profile-percent">{ProfileProgress}%</span>
              </div>
              <span className="profile-progress-text">{t("profile.profile_setup_in_progress")}</span>
            </>
          )}

          <button
            className="profile-complete-btn"
            onClick={() => navigate("/complete-profile")}
          >
            <span className="profile-complete-text">
              {ProfileProgress < 100 ? t("profile.complete") : t("profile.edit")} profile
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
              <span className="profile-sheet-title">{t("profile.language")}</span>
              <div onClick={() => setShowLanguageModal(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            {LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className={`profile-lang-row ${i18n.language === lang.code ? "active" : ""}`}
                onClick={() => handleLanguageSelect(lang)}
              >
                <span className="profile-lang-text">{lang.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Profile;
