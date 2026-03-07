import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "12px", display: "flex", alignItems: "center" }}>
      <button onClick={() => navigate(-1)}>←</button>
      <h3 style={{ marginLeft: "12px" }}>{title}</h3>
    </div>
  );
};

export default Header;
