import React, { useEffect, useState } from "react";
import PostCard from "../posts/PostCard";
import PostTabs from "../posts/PostTabs";
import RecommendedWorkerCard from "../../workers/RecommendedWorkerCard";
import SkeletonLoader from "../common/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../redux/slices/jobSlice";
import { getSearchWorkers } from "../../redux/slices/workerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const AllPostsScreen = () => {
  const [activeTab, setActiveTab] = useState("All Posts");
  const [sortBy, setSortBy] = useState("Newest First");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: posts, loading, error, total } = useSelector(
    (state) => state.jobs
  );

  const { recommendedWorkers, recommendedLoading } = useSelector(
    (state) => state.workers
  );

  const getTabValue = (tab) => {
    switch (tab) {
      case "Active Posts":
        return "active";
      case "Closed Posts":
        return "closed";
      default:
        return "all";
    }
  };

  useEffect(() => {
    dispatch(
      getAllJobs({
        tab: getTabValue(activeTab),
        pagination: { page: 1, limit: 20 },
        filters: {},
        sortBy,
      })
    );
  }, [dispatch, activeTab, sortBy]);

  useEffect(() => {
    dispatch(getSearchWorkers({ limit: 10 }));
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AppLayout header={<CommonHeader title="My Posts" />}>
      <div className="allPostsContainer">

        {/* <div className="headerRow">
          <button
            onClick={() => navigate("/create-post")}
            className="createPostBtn"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Create Post</span>
          </button>
        </div> */}

      <PostTabs activeTab={activeTab} setActiveTab={handleTabChange} />

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
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id || post._id} item={post} />
            ))
          ) : (
            <div className="empty-state">
              <p>No posts found</p>
            </div>
          )}
        </div>
      )}

      {total > 0 && (
        <p className="total-count pt-3">
          Showing {posts.length} of {total} posts
        </p>
      )}

      <h2 className="section-heading">
        Recommended Workers for you
      </h2>

      <div className="recommended-list">
        {recommendedLoading ? (
          <SkeletonLoader type="worker" count={2} />
        ) : recommendedWorkers.length > 0 ? (
          recommendedWorkers.map((worker) => (
            <RecommendedWorkerCard
              key={worker.id}
              worker={worker}
            />
          ))
        ) : (
          <div className="no-data">No recommended workers found</div>
        )}
      </div>
      </div>
    </AppLayout>
  );
};

export default AllPostsScreen;
