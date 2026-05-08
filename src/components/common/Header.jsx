import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "12px", display: "flex", alignItems: "center" }}>
      <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
      <h3 style={{ marginLeft: "12px" }}>{title}</h3>
    </div>
  );
};

export default Header;
