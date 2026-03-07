import React from "react";
import LegalPage from "./LegalPage";
import { legalText } from "../data/legalData";

const Terms = () => {

return (
<LegalPage
title="Terms of Use"
content={legalText}
/>
);

};

export default Terms;