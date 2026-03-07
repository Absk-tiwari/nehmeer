import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/img/search-not-found.png"; // add image here

const categories = [
  "Home Aide",
  "Babysitter",
  "Maid",
  "All rounders",
  "Nurse",
  "Cooks/Chef",
  "Dog Sitter",
  "Driver",
];

const Search = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Babysitter",
    "Cook",
  ]);

  // Later this will come from API
  const hasResults = false; // toggle this after API integration

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  return (
    <div className="search-page">
      {/* HEADER */}
      <div className="search-header">
        <span className="back" onClick={() => navigate(-1)}>←</span>
        <span className="location">Delhi, India</span>
      </div>

      {/* SEARCH INPUT */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Find area for service, workers category"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* ================= EMPTY STATE ================= */}
      {!hasResults && query && (
        <div className="search-empty">
          <img src={notFound} alt="Not Found" />
          <p className="empty-title">Sorry nothing found!</p>
          <p className="empty-sub">
            Try entering the right keyword
          </p>
        </div>
      )}

      {/* ================= SUGGESTION STATE ================= */}
      {!query && (
        <>
          {/* RECENT SEARCH */}
          {recentSearches.length > 0 && (
            <div className="recent-search">
              <div className="recent-header">
                <h4>Recent Searches</h4>
                <span onClick={handleClearAll}>Clear All</span>
              </div>

              {recentSearches.map((item, i) => (
                <div className="recent-item" key={i}>
                  <span>🔍 {item}</span>
                  <span className="remove">×</span>
                </div>
              ))}
            </div>
          )}

          {/* CATEGORIES */}
          <div className="search-categories">
            <h4>Categories</h4>
            <div className="category-list">
              {categories.map((cat, i) => (
                <span className="category-chip" key={i}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
