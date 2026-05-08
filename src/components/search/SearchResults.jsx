import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faChevronDown,
  faArrowUpShortWide,
  faCheck,
  faStar,
  faXmark,
  faArrowLeft,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { getSearchWorkers } from "../../redux/slices/workerSlice";
import placeholderImage from "../../assets/img/placeholder.png";
import noResultsImg from "../../assets/img/search-not-found.png";
import AppLayout from "../layouts/AppLayout";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "rating", label: "Rating (High to Low)" },
  { value: "experience", label: "Experience" },
  { value: "newest", label: "Newest First" },
];

const wrapText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const initialFetchDone = useRef(false);

  const { recommendedWorkers, recommendedLoading } = useSelector(
    (state) => state.workers
  );
  const { selectedAddress } = useSelector((state) => state.locations);

  const { search: initialSearch, categories: initialCategories } =
    location.state || {};

  const [search, setSearch] = useState(initialSearch || "");
  const [categories, setCategories] = useState(initialCategories || []);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [showSortModal, setShowSortModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const address = selectedAddress || { fullAddress: "Delhi, India" };

  // Fetch results only on initial mount and when filters change explicitly
  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchResults(1);
    }
  }, []);

  // Refetch when search/categories change (user action)
  const fetchResults = async (pageNum = 1) => {
    const categoryStr = categories.join(",");

    try {
      const result = await dispatch(
        getSearchWorkers({
          search,
          category: categoryStr,
          address,
          page: pageNum,
          limit: 10,
        })
      ).unwrap();

      if (result?.data) {
        const mapped = result.data.map((item) => {
          const answers = {};
          item.answers?.forEach((a) => {
            answers[a.question] = a.answer;
          });

          const profile = item.workerProfile || {};

          return {
            id: item.id?.toString(),
            _id: item.id?.toString(),
            name: profile.name || item.name || "Worker",
            title: profile.title || item.role?.name || "Job-Seeker",
            role: profile.role || item.role?.name || "Worker",
            location: profile.city || answers["Location"] || item.location || "-",
            experience: profile.experience || answers["Experience Level"] || "-",
            age: profile.age || item.age || "-",
            rating: profile.rating || item.rating || 0,
            reviews: profile.reviews || item.reviews || 0,
            image: profile.profile_photo || item.profile_photo,
            verified: profile.verified || item.verified || false,
            status: item.status,
            createdAt: item.created_at,
          };
        });

        if (pageNum === 1) {
          setList(mapped);
        } else {
          setList((prev) => [...prev, ...mapped]);
        }
        setTotal(result.total || 0);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await fetchResults(1);
    setRefreshing(false);
  };

  const hasMore = list.length < total;

  const loadMore = () => {
    if (!recommendedLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchResults(nextPage);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !recommendedLoading && hasMore) {
      loadMore();
    }
  };

  const handleWorkerClick = (worker) => {
    navigate(`/worker-profile/${worker.id}`, { state: { worker } });
  };

  const sortedList = useMemo(() => {
    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "experience":
          const expA = parseInt(a.experience) || 0;
          const expB = parseInt(b.experience) || 0;
          return expB - expA;
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });
  }, [list, sortBy]);

  const removeCategory = (cat) => {
    const updated = categories.filter((c) => c !== cat);
    setCategories(updated);
    setPage(1);
    // Trigger refetch with updated categories
    setTimeout(() => {
      const categoryStr = updated.join(",");
      dispatch(
        getSearchWorkers({
          search,
          category: categoryStr,
          address,
          page: 1,
          limit: 10,
        })
      ).then((result) => {
        if (result.payload?.data) {
          setList(result.payload.data.map(mapWorker));
          setTotal(result.payload.total || 0);
        }
      });
    }, 0);
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
    setTimeout(() => {
      const categoryStr = categories.join(",");
      dispatch(
        getSearchWorkers({
          search: "",
          category: categoryStr,
          address,
          page: 1,
          limit: 10,
        })
      ).then((result) => {
        if (result.payload?.data) {
          setList(result.payload.data.map(mapWorker));
          setTotal(result.payload.total || 0);
        }
      });
    }, 0);
  };

  const mapWorker = (item) => {
    const answers = {};
    item.answers?.forEach((a) => {
      answers[a.question] = a.answer;
    });
    const profile = item.workerProfile || {};
    return {
      id: item.id?.toString(),
      name: profile.name || item.name || "Worker",
      title: profile.title || "Job-Seeker",
      role: profile.role || item.role?.name || "Worker",
      location: profile.city || answers["Location"] || "-",
      experience: profile.experience || answers["Experience Level"] || "-",
      age: profile.age || item.age || "-",
      rating: profile.rating || item.rating || 0,
      reviews: profile.reviews || item.reviews || 0,
      image: profile.profile_photo || item.profile_photo,
      verified: profile.verified || item.verified || false,
      createdAt: item.created_at,
    };
  };

  const getSearchTitle = () => {
    if (search) return `${search}s Near You`;
    if (categories.length === 1) return `${categories[0]}s Near You`;
    if (categories.length > 1) return "Workers Near You";
    return "Search Results";
  };

  return (
    <AppLayout>
      <div className="search-results-container">
        {/* Custom Header */}
        <div className="search-results-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="header-info">
              <h3 className="header-title">{getSearchTitle()}</h3>
              <button
                className="location-selector"
                onClick={() =>
                  navigate("/select-address", {
                    state: { returnTo: "/search-results" },
                  })
                }
              >
                <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
                <span>{wrapText(address.fullAddress, 15)}</span>
                <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />
              </button>
            </div>
          </div>

          <button className="sort-btn" onClick={() => setShowSortModal(true)}>
            <FontAwesomeIcon icon={faArrowUpShortWide} />
            <span>Sort by</span>
          </button>
        </div>

        {/* Active Filters */}
        {(search || categories.length > 0) && (
          <div className="active-filters">
            {search && (
              <span className="filter-chip">
                <span>{search}</span>
                <button onClick={clearSearch}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </span>
            )}
            {categories.map((cat) => (
              <span key={cat} className="filter-chip">
                <span>{cat}</span>
                <button onClick={() => removeCategory(cat)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="results-list" onScroll={handleScroll}>
          {recommendedLoading && page === 1 ? (
            <div className="loading-container">
              <FontAwesomeIcon icon={faSpinner} spin className="spinner" />
              <p>Loading results...</p>
            </div>
          ) : sortedList.length > 0 ? (
            <>
              {sortedList.map((worker) => (
                <div
                  key={worker.id}
                  className="worker-card"
                  onClick={() => handleWorkerClick(worker)}
                >
                  <div className="worker-image">
                    <img
                      src={worker.image || placeholderImage}
                      alt={worker.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImage;
                      }}
                    />
                    <button className="view-btn">View</button>
                  </div>

                  <div className="worker-info">
                    <div className="worker-name-row">
                      <h4>{worker.name}</h4>
                      {worker.verified && (
                        <span className="verified-badge">
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                      )}
                    </div>

                    <p className="worker-role">{worker.role}</p>
                    <p className="worker-detail">Experience: {worker.experience}</p>

                    <div className="worker-rating">
                      <span className="rating">
                        <FontAwesomeIcon icon={faStar} /> {worker.rating || 0}
                      </span>
                      <span className="reviews">{worker.reviews || 0} Ratings</span>
                    </div>

                    <p className="worker-detail">Age - {worker.age}</p>
                    <p className="worker-detail">Location - {worker.location}</p>
                  </div>
                </div>
              ))}

              {recommendedLoading && page > 1 && (
                <div className="loading-more">
                  <FontAwesomeIcon icon={faSpinner} spin />
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <img src={noResultsImg} alt="No Results" />
              <h3>No workers found</h3>
              <p>Try searching with different keywords</p>
              <button onClick={() => navigate("/search")} className="back-to-search">
                Back to Search
              </button>
            </div>
          )}
        </div>

        {/* Sort Modal */}
        {showSortModal && (
          <div className="sort-modal-overlay" onClick={() => setShowSortModal(false)}>
            <div className="sort-modal" onClick={(e) => e.stopPropagation()}>
              <div className="sort-modal-header">
                <h3>Sort By</h3>
                <button onClick={() => setShowSortModal(false)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <div className="sort-options">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    className={`sort-option ${sortBy === option.value ? "active" : ""}`}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortModal(false);
                    }}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.value && (
                      <FontAwesomeIcon icon={faCheck} className="check-icon" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SearchResults;
