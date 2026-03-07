import React from "react";
import { useNavigate } from "react-router-dom";

const LegalPage = ({ title, content }) => {

const navigate = useNavigate();

return (

<div className="legal-page">

{/* HEADER */}

<div className="legal-header">

<button
className="legal-back-btn"
onClick={() => navigate(-1)}
>
←
</button>

<h2>{title}</h2>

</div>

{/* CONTENT */}

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

);
};

export default LegalPage;