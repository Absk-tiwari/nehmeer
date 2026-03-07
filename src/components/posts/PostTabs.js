import React from "react";

const PostTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Posts", "Active Posts", "Closed Posts"];

  return (
    <div className="tabsContainer">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tabBtn ${activeTab === tab ? "activeTab" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default PostTabs;
