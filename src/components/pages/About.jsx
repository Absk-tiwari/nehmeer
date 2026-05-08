import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const About = () => {
  const navigate = useNavigate();

  return (
    <AppLayout header={<CommonHeader back title="About" />}>
      <div className="legal-page">

      <div className="legal-content" style={{ textAlign: "center", paddingTop: "60px" }}>
        <p style={{ fontSize: "18px", fontWeight: "500", color: "#333" }}>About content coming soon</p>
        <p style={{ fontSize: "14px", marginTop: "12px" }}>We're working on bringing you more information about Nehmeer.</p>
        <p style={{ fontSize: "14px", marginTop: "8px" }}>Check back later for updates.</p>
      </div>

      <footer className="legal-footer">
        © 2026 Allineup
      </footer>
      </div>
    </AppLayout>
  );
};

export default About;
