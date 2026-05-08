import React from "react";
import { useNavigate } from "react-router-dom";
import { getJobIcon } from "../../constants/jobIcons";

const PostCard = ({ item }) => {
  const navigate = useNavigate();

  if (!item) return null;

  const jobIcon = item.icon || getJobIcon(item.role_id || item.job_role_id);

  const handleClick = () => {
    navigate(`/post/${item.id}`);
  };

  return (
    <div className="postCard" onClick={handleClick}>
      {/* IMAGE */}
      <div className="postImageWrapper">
        <img
          src={jobIcon}
          alt={item.title || "post"}
          className="postImage"
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div className="postContent">
        <h3>
          I am looking for a{" "}
          <span>{item.title || "Worker"}</span>
        </h3>

        <p>
          Experience:{" "}
          <strong>{item.experience || "N/A"}</strong>
        </p>

        <p>
          Location:{" "}
          <strong>{item.location || "Unknown"}</strong>
        </p>

        <p
          className={item.status === "Open" ? "openStatus" : "closedStatus"}
          style={{ color: item.statusColor }}
        >
          {item.status || "Open"}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="postArrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  );
};

export default React.memo(PostCard);
