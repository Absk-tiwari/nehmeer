import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faBell,
  faPlus,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "arrow-back": faArrowLeft,
  "search-outline": faSearch,
  "notifications-outline": faBell,
  "plus-square": faPlus,
  "forward": faChevronRight,
};

const CommonHeader = ({ back = false, title, data = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="common-header">
      {back && (
        <div className="common-header-back" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      )}
      <span className="common-header-title">{title}</span>
      <div className="common-header-right">
        {data.map((row, i) => (
          <div
            key={i}
            className="common-header-icon"
            onClick={() => navigate(row.path || `/${row.screen?.toLowerCase()}`)}
          >
            {row.img && (
              <img src={row.img} alt="" className="common-header-avatar" />
            )}
            {row.icon && (
              <FontAwesomeIcon icon={iconMap[row.icon] || faSearch} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonHeader;
