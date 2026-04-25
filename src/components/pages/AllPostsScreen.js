import React, { useEffect, useState } from "react";
import PostCard from "../posts/PostCard";
import PostTabs from "../posts/PostTabs";
import RecommendedWorkerCard from "../../workers/RecommendedWorkerCard";
import { serviceData } from "../data/serviceData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../redux/slices/postSlice";

const AllPostsScreen = () => {
  const [activeTab, setActiveTab] = useState("All Posts");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: posts, loading, error } = useSelector(
    (state) => state.posts
  );

  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    dispatch(getMyPosts());
    setWorkers(serviceData); // later replace with API
  }, [dispatch]);

  // 🔥 FILTER LOGIC (same UI)
  const filteredPosts =
    activeTab === "All Posts"
      ? posts
      : posts.filter((post) =>
          activeTab === "Active Posts"
            ? post.status === "Open"
            : post.status === "Closed"
        );

  return (
    <div className="allPostsContainer">

      {/* HEADER */}
     <div
  className="headerRow"
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  }}
>
  <h2 style={{ margin: 0 }}>All Posts</h2>

  <button
    onClick={() => navigate("/create-post")}
    className="addBtn"
    style={{
      width:"10%",
    
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#000",
      color: "#fff",
      fontSize: "14px",
      cursor: "pointer",
    }}
  >
    <span style={{ fontSize: "14px", fontWeight: "bold", margin:"auto" }}> Create Post</span>
    
  </button>
</div>

      {/* TABS */}
      <PostTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* POSTS */}
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="postList">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} item={post} />
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      )}

      {/* RECOMMENDED */}
      <h2 style={{ marginTop: "40px" }}>
        Recommended Workers for you
      </h2>

      <div className="recommended-list">
        {workers.length > 0 ? (
          workers.map((worker) => (
            <RecommendedWorkerCard
              key={worker.id}
              worker={worker}
            />
          ))
        ) : (
          <p>No workers available</p>
        )}
      </div>
    </div>
  );
};

export default AllPostsScreen;