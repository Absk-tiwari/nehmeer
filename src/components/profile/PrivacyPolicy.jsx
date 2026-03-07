import React from "react";
import LegalPage from "./LegalPage";
import { legalText } from "../data/legalData";

const PrivacyPolicy = () => {

return (
<LegalPage
title="Privacy Policy"
content={legalText}
/>
);

};

export default PrivacyPolicy;