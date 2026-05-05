import { useNavigate } from "react-router-dom";
import navlogo from "../../assets/img/nav-logo.svg";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faBell } from "@fortawesome/free-solid-svg-icons";

const NavTop = () => {
  const navigate = useNavigate();

  const { unreadCount } = useSelector(
    (state) => state.notifications
  );

  return (
    <header className="top-header mobile-only">
      <div className="left">
        <span className="menu">
          <FontAwesomeIcon icon={faBars} />
        </span>
        <img src={navlogo} alt="ALLINEUP" className="header-logo" />
      </div>

      <div className="right">
        <span
          className="icon header-icon-btn"
          onClick={() => navigate("/search")}
        >
          <FontAwesomeIcon icon={faSearch} />
        </span>

        <div
          className="notification"
          onClick={() => navigate("/notifications")}
        >
          <FontAwesomeIcon icon={faBell} />

          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavTop;