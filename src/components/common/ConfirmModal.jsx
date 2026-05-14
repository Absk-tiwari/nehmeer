import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTrash } from "@fortawesome/free-solid-svg-icons";

const ConfirmModal = ({
  visible,
  message,
  onCancel,
  onSuccess,
  icon = "logout",
  btnText = "Log Out",
}) => {
  if (!visible) return null;

  const getIcon = () => {
    switch (icon) {
      case "trash":
        return faTrash;
      case "logout":
      default:
        return faRightFromBracket;
    }
  };

  const getIconColor = () => {
    return icon === "trash" ? "#a98027" : "#FF3B30";
  };

  return (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal-card" onClick={(e) => e.stopPropagation()}>
        <div
          className="confirm-modal-icon"
          style={{ backgroundColor: getIconColor() }}
        >
          <FontAwesomeIcon icon={getIcon()} />
        </div>

        <p className="confirm-modal-message">{message}</p>

        <div className="confirm-modal-buttons">
          <button className="confirm-modal-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-modal-confirm" onClick={onSuccess}>
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
