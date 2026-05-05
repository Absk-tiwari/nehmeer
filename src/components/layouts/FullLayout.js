import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import DesktopHeader from "./DesktopHeader";

const FullLayout = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/otp"];
  const isAuthPage = authRoutes.includes(location.pathname);

  const showNav = token && !isAuthPage;

  return (
    <div className={`layout-wrapper ${!showNav ? 'no-nav' : ''}`}>
      {showNav && <DesktopHeader />}
      <div className="app-shell">
        <Outlet />
      </div>
      {showNav && <BottomNav />}
    </div>
  );
};

export default FullLayout;
