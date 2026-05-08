import React from "react";

const AppLayout = ({ children, header = null, scroll = false }) => {
  return (
    <div className="app-layout">
      {header}
      <div className={`app-layout-content ${scroll ? "app-layout-scroll" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
