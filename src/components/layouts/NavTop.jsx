import { useNavigate } from "react-router-dom";
import navlogo from "../../assets/img/nav-logo.svg";
import { useSelector } from "react-redux";

const NavTop = () => {
  const navigate = useNavigate();

  const { unreadCount } = useSelector(
    (state) => state.notifications
  );

  return (
    <header className="top-header">

      <div className="left">
        <span className="menu">☰</span>
        <img src={navlogo} alt="ALLINEUP" className="header-logo" />
      </div>

      <div className="right">

        <span
          className="icon"
          onClick={() => navigate("/search")}
        >
          🔍
        </span>

        {/* NOTIFICATION */}
        <div
          className="notification"
          onClick={() => navigate("/notifications")}
        >
          🔔

          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </div>

      </div>
    </header>
  );
};

export default NavTop;