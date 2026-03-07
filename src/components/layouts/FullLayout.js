import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const FullLayout = () => {
  return (
    <div className="layout-wrapper">
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default FullLayout;