import React from "react";

const QuickGuide = () => {
  return (
    <div className="quick-guide">
      <h3 className="section-title">Quick App Guide</h3>

      <div className="guide-card">
        <video
          src={`${process.env.PUBLIC_URL}/videos/vid.mp4`}
          controls
          playsInline
          preload="metadata"
          style={{ width: "100%", height: "100%", borderRadius: "18px" }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default QuickGuide;
