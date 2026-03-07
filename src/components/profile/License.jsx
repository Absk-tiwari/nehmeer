import React from "react";
import LegalPage from "./LegalPage";
import { legalText } from "../data/legalData";

const License = () => {

return (
<LegalPage
title="License"
content={legalText}
/>
);

};

export default License;