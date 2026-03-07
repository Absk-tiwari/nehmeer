import { useState } from "react";
import AboutTab from "./AboutTab";
import SalaryTab from "./SalaryTab";

const ServiceTabs = ({ service }) => {
  const [tab, setTab] = useState("about");

  return (
    <>
      <div className="tab-buttons">
        <button
          className={tab === "about" ? "tab-btn active" : "tab-btn"}
          onClick={() => setTab("about")}
        >
          About me
        </button>
        <button
          className={tab === "salary" ? "tab-btn active" : "tab-btn"}
          onClick={() => setTab("salary")}
        >
          Salary & Availability
        </button>
      </div>
      {tab === "about" ? (
        <AboutTab service={service} />
      ) : (
        <SalaryTab service={service} />
      )}
    </>
  );
};

export default ServiceTabs;
