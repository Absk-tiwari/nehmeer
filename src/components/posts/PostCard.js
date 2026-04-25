import React from "react";

const PostCard = ({ item, onView, onEdit, onDelete }) => {
  if (!item) return null;

  return (
    <div className="postCard">

      {/* IMAGE */}
      <img
        src={item.image || "https://picsum.photos/200/300"}
        alt={item.title || "post"}
        className="postImage"
        loading="lazy" // ✅ performance boost
      />

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
          className={
            item.status === "Open"
              ? "openStatus"
              : "closedStatus"
          }
        >
          {item.status || "Open"}{" "}
          {item.extra ? `• ${item.extra}` : ""}
        </p>

        {/* ACTION BUTTONS (VERY IMPORTANT 🔥) */}
        <div className="postActions">

          <button
            onClick={() => onView?.(item)}
            className="viewBtn"
          >
            View
          </button>

          <button
            onClick={() => onEdit?.(item)}
            className="editBtn"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete?.(item._id)}
            className="deleteBtn"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
};

export default React.memo(PostCard); // ✅ performance optimization