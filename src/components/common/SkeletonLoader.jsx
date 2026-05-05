import React from "react";

const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="skeleton-card">
            <div className="skeleton-image skeleton-animate"></div>
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-animate" style={{ width: "70%" }}></div>
              <div className="skeleton-line skeleton-animate" style={{ width: "50%" }}></div>
              <div className="skeleton-line skeleton-animate" style={{ width: "40%" }}></div>
            </div>
          </div>
        );

      case "post":
        return (
          <div className="skeleton-post">
            <div className="skeleton-post-image skeleton-animate"></div>
            <div className="skeleton-post-content">
              <div className="skeleton-line skeleton-animate" style={{ width: "80%" }}></div>
              <div className="skeleton-line skeleton-animate" style={{ width: "60%" }}></div>
              <div className="skeleton-line skeleton-animate" style={{ width: "45%" }}></div>
              <div className="skeleton-actions">
                <div className="skeleton-btn skeleton-animate"></div>
                <div className="skeleton-btn skeleton-animate"></div>
                <div className="skeleton-btn skeleton-animate"></div>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="skeleton-profile">
            <div className="skeleton-avatar skeleton-animate"></div>
            <div className="skeleton-profile-content">
              <div className="skeleton-line skeleton-animate" style={{ width: "60%" }}></div>
              <div className="skeleton-line skeleton-animate" style={{ width: "40%" }}></div>
            </div>
          </div>
        );

      case "worker":
        return (
          <div className="skeleton-worker">
            <div className="skeleton-worker-image skeleton-animate"></div>
            <div className="skeleton-worker-content">
              <div className="skeleton-line skeleton-animate" style={{ width: "70%" }}></div>
              <div className="skeleton-line skeleton-animate" style={{ width: "50%" }}></div>
              <div className="skeleton-line skeleton-animate" style={{ width: "55%" }}></div>
              <div className="skeleton-line skeleton-animate" style={{ width: "40%" }}></div>
            </div>
          </div>
        );

      case "text":
        return (
          <div className="skeleton-text">
            <div className="skeleton-line skeleton-animate" style={{ width: "100%" }}></div>
            <div className="skeleton-line skeleton-animate" style={{ width: "90%" }}></div>
            <div className="skeleton-line skeleton-animate" style={{ width: "80%" }}></div>
          </div>
        );

      default:
        return (
          <div className="skeleton-default skeleton-animate"></div>
        );
    }
  };

  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </div>
  );
};

export default SkeletonLoader;
