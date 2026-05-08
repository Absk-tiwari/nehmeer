import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const ALL_SUGGESTIONS = [
  "Babysitter",
  "Baby Caretaker",
  "Cook",
  "Chef",
  "Maid",
  "House Maid",
  "Driver",
  "Personal Driver",
  "Nurse",
  "Home Nurse",
  "Dog Sitter",
  "Pet Caretaker",
  "Home Aide",
  "All Rounder",
  "Gardener",
  "Security Guard",
  "Elderly Care",
  "Tutor",
  "Cleaner",
  "Laundry Helper",
];

const SEARCH_CATEGORIES = [
  "Home Aide",
  "Babysitter",
  "Maid",
  "All rounders",
  "Nurse",
  "Cooks/Chef",
  "Dog Sitter",
  "Driver",
];

const RECENT_SEARCHES_KEY = "recent_searches";

const Search = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const isTyping = search.trim().length > 0;
  const showSuggestions = search.length <= 3;

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  const suggestions = useMemo(() => {
    if (!isTyping) return [];
    return ALL_SUGGESTIONS.filter((item) =>
      item.toLowerCase().startsWith(search.toLowerCase())
    );
  }, [search, isTyping]);

  const saveSearch = (term) => {
    if (!term.trim()) return;

    let updated = [term, ...recentSearches.filter((i) => i !== term)];
    updated = updated.slice(0, 5);

    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const removeRecent = (item) => {
    const updated = recentSearches.filter((i) => i !== item);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const clearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const onSelectSuggestion = (item) => {
    setSearch(item);
    saveSearch(item);
  };

  const onSelectCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSearch = () => {
    if (!search.trim() && selectedCategories.length === 0) return;

    if (search.trim()) {
      saveSearch(search);
    }

    navigate("/search-results", {
      state: {
        search: search.trim(),
        categories: selectedCategories,
      },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <AppLayout header={<CommonHeader back title="Search" />}>
      <div className="search-page">

      {/* SEARCH INPUT */}
      <div className="search-box">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          placeholder="Find area for service, workers category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {search && (
          <button className="clear-input" onClick={() => setSearch("")}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>

      {/* SUGGESTIONS */}
      {isTyping && showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((item, index) => (
            <div
              key={item + index}
              className="suggestion-item"
              onClick={() => onSelectSuggestion(item)}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="suggestion-icon" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {/* RECENT SEARCHES */}
      {!isTyping && recentSearches.length > 0 && (
        <div className="recent-search">
          <div className="recent-header">
            <h4>Recent Searches</h4>
            <span onClick={clearSearches}>Clear All</span>
          </div>

          {recentSearches.map((item, i) => (
            <div
              className="recent-item"
              key={i}
              onClick={() => setSearch(item)}
            >
              <span className="recent-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} /> {item}
              </span>
              <button
                className="remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeRecent(item);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CATEGORIES */}
      <div className="search-categories">
        <h4>Categories</h4>
        <div className="category-list">
          {SEARCH_CATEGORIES.map((cat, i) => (
            <button
              key={i}
              className={`category-chip ${
                selectedCategories.includes(cat) ? "selected" : ""
              }`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <div className="search-footer">
        <button
          className="search-btn"
          onClick={handleSearch}
          disabled={!search.trim() && selectedCategories.length === 0}
        >
          Search
        </button>
      </div>
      </div>
    </AppLayout>
  );
};

export default Search;
