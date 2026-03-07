import { useNavigate } from "react-router-dom";
import navlogo from "../../assets/img/nav-logo.svg";


const NavTop = ({ notificationCount }) => {
  const navigate = useNavigate();

  return (
    <header className="top-header">
      <div className="left">
        <span className="menu">☰</span>
        <img src={navlogo} alt="ALLINEUP" className="header-logo" />
      </div>

      <div className="right">
        <span className="icon" onClick={()=>navigate("/search")}>🔍</span>

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
    </header>
  );
};

export default NavTop;
