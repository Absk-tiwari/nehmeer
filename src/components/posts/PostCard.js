import React from "react";

const PostCard = ({ item }) => {
  return (
    <div className="postCard">
      {/* Dummy Placeholder Image */}
      <img
        src="https://picsum.photos/200/300"
        alt="post"
        className="postImage"
      />

      <div className="postContent">
        <h3>I am looking for a {item.title}</h3>
        <p>Experience {item.experience}</p>
        <p>Location - {item.location}</p>

        <p className={item.status === "Open" ? "openStatus" : "closedStatus"}>
          {item.status}. {item.extra}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
