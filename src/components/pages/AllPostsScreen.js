import React, { useEffect, useState } from "react";
import PostCard from "../posts/PostCard";
import PostTabs from "../posts/PostTabs";
import RecommendedWorkerCard from "../../workers/RecommendedWorkerCard";
import SkeletonLoader from "../common/SkeletonLoader";
import { serviceData } from "../data/serviceData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../redux/slices/postSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
    setWorkers(serviceData);
  }, [dispatch]);

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

      <div className="headerRow">
        <h2>All Posts</h2>

        <button
          onClick={() => navigate("/create-post")}
          className="createPostBtn"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Create Post</span>
        </button>
      </div>

      <PostTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading ? (
        <div className="postList">
          <SkeletonLoader type="post" count={3} />
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <div className="postList">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} item={post} />
            ))
          ) : (
            <div className="empty-state">
              <p>No posts found</p>
            </div>
          )}
        </div>
      )}

      <h2 className="section-heading">
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
          <SkeletonLoader type="worker" count={2} />
        )}
      </div>
    </div>
  );
};

export default AllPostsScreen;