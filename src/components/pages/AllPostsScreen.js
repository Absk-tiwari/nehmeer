import React, { useEffect, useState } from "react";
import PostCard from "../posts/PostCard";
import PostTabs from "../posts/PostTabs";
import RecommendedWorkerCard from "../../workers/RecommendedWorkerCard";
import SkeletonLoader from "../common/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, loadMoreJobs, resetJobsList } from "../../redux/slices/jobSlice";
import { getSearchWorkers, loadMoreSearchWorkers } from "../../redux/slices/workerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const POSTS_PER_PAGE = 10;
const WORKERS_PER_PAGE = 5;

const AllPostsScreen = () => {
  const [activeTab, setActiveTab] = useState("All Posts");
  const [sortBy, setSortBy] = useState("Newest First");
  const [visibleWorkersCount, setVisibleWorkersCount] = useState(WORKERS_PER_PAGE);
  const [loadingMoreWorkers, setLoadingMoreWorkers] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { forYou, list: posts, loading, error, total, currentPage, hasMore, loadingMore } = useSelector(
    (state) => state.jobs
  );
  const { user } = useSelector(s => s.auth) || {}

  const {
    recommendedWorkers,
    recommendedLoading,
    recommendedHasMore,
    recommendedPage,
    loadingMoreRecommended,
  } = useSelector((state) => state.workers);

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
    // dispatch(resetJobsList());
    dispatch(
      getAllJobs({
        tab: getTabValue(activeTab),
        pagination: { page: 1, limit: POSTS_PER_PAGE },
        filters: {},
        sortBy,
      })
    );
  }, [dispatch, activeTab, sortBy]);

  useEffect(() => {
    dispatch(getSearchWorkers({ limit: 20 }));
  }, [dispatch]);

  // When API fetches more workers, update visible count to show new ones
  useEffect(() => {
    if (recommendedWorkers.length > visibleWorkersCount && recommendedPage > 1) {
      setVisibleWorkersCount(recommendedWorkers.length);
    }
  }, [recommendedWorkers.length, recommendedPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;

    dispatch(
      loadMoreJobs({
        tab: getTabValue(activeTab),
        pagination: { page: currentPage + 1, limit: POSTS_PER_PAGE },
        filters: {},
        sortBy,
      })
    );
  };

  const handleLoadMoreWorkers = () => {
    if (loadingMoreWorkers || loadingMoreRecommended) return;

    const hasLocalWorkers = visibleWorkersCount < recommendedWorkers.length;

    if (hasLocalWorkers) {
      // Client-side pagination with 1.5s delay
      setLoadingMoreWorkers(true);
      setTimeout(() => {
        setVisibleWorkersCount((prev) => prev + WORKERS_PER_PAGE);
        setLoadingMoreWorkers(false);
      }, 1500);
    } else if (recommendedHasMore) {
      // Fetch more from API
      dispatch(
        loadMoreSearchWorkers({
          page: recommendedPage + 1,
          limit: 20,
        })
      );
    }
  };

  const visibleWorkers = recommendedWorkers.slice(0, visibleWorkersCount);
  const hasMoreWorkers = visibleWorkersCount < recommendedWorkers.length || recommendedHasMore;

  return (
    <AppLayout header={<CommonHeader title={user?.role !== undefined && user?.role !== 'worker' ? "My " : "Posts"} />}>
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
          <>
            {forYou.length > 0 ? (
              <>
                <h2 className="section-heading">Job postings for your role</h2>
                <div className="postList">
                  {forYou.map((post) => (
                    <PostCard key={post.id || post._id} item={post} />
                  ))}
                </div>
              </>
            ): (user?.job_title ? <h2 className="section-heading text-center mb-4 mt-4">No Job postings for {user.job_title}</h2>: null )}

            {user?.role && <h2 className="section-heading mt-2">Postings for other roles</h2>}

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
          </>
        )}

        {total > 0 && (
          <p className="total-count pt-3">
            Showing {forYou.length + posts.length} of {total} job posts
          </p>
        )}

        {hasMore && !loading && posts.length > 0 && (
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  <span>Loading jobs...</span>
                </>
              ) : (
                <span>Load More Jobs</span>
              )}
            </button>
          </div>
        )}

        {user?.role===undefined || user?.role !== 'worker' ? (<>
          <h2 className="section-heading">
            Recommended Workers for you
          </h2>

          <div className="recommended-list">
            {recommendedLoading ? (
              <SkeletonLoader type="worker" count={2} />
            ) : recommendedWorkers.length > 0 ? (
              visibleWorkers.map((worker) => (
                <RecommendedWorkerCard
                  key={worker.id}
                  user={user}
                  worker={worker}
                />
              ))
            ) : (
              <div className="no-data">No recommended workers found</div>
            )}
          </div>

          {hasMoreWorkers && !recommendedLoading && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={handleLoadMoreWorkers}
                disabled={loadingMoreWorkers || loadingMoreRecommended}
              >
                {loadingMoreWorkers || loadingMoreRecommended ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <span>Loading workers...</span>
                  </>
                ) : (
                  <span>Load More Workers</span>
                )}
              </button>
            </div>
          )}
        </>) : null}
      </div>
    </AppLayout>
  );
};

export default AllPostsScreen;
