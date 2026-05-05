import React from "react";
import VideoPlayer from "../common/VideoPlayer";

const QuickGuide = () => {
  const guideVideoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <div className="quick-guide">
      <h3 className="section-title">Quick App Guide</h3>

      <div className="guide-card">
        <VideoPlayer
          url={guideVideoUrl}
          title="How to use Nehmeer"
          light={true}
          controls={true}
        />
      </div>
    </div>
  );
};

export default QuickGuide;
