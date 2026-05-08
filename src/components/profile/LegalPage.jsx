import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const LegalPage = ({ title, content }) => {
  const navigate = useNavigate();

  return (
    <AppLayout header={<CommonHeader back title={title} />}>
      <div className="legal-page">
        <div className="legal-content">
          <h3>Gorem ipsum dolor sit amet</h3>
          {content.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        <footer className="legal-footer">
          © 2026 Allineup
        </footer>
      </div>
    </AppLayout>
  );
};

export default LegalPage;