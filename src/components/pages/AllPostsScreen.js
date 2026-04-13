import React, { useEffect, useState } from "react";
import PostCard from "../posts/PostCard";
import PostTabs from "../posts/PostTabs";
import RecommendedWorkerCard from "../../workers/RecommendedWorkerCard";
import { serviceData } from "../data/serviceData";
import { useNavigate } from "react-router-dom";
// import RecommendedWorkerCard from "../workers/RecommendedWorkerCard"; // ✅ fixed path if inside components

const AllPostsScreen = () => {
  const [activeTab, setActiveTab] = useState("All Posts");
  const [posts, setPosts] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 🔹 Dummy Posts
      const dummyPosts = [
        {
          id: 1,
          title: "Cook",
          experience: "3 Years",
          location: "Noida sector 78",
          status: "Open",
          extra: "6 Contacts for you",
        },
        {
          id: 2,
          title: "Dog sitter",
          experience: "1 Years",
          location: "Noida sector 78",
          status: "Closed",
          extra: "1 Hired . 22 Jun, 2024",
        },
        {
          id: 3,
          title: "Driver",
          experience: "1 Years",
          location: "Noida sector 78",
          status: "Closed",
          extra: "1 Hired . 12 Feb",
        },
      ];

      // 🔹 Dummy Workers
 

      // 🔥 When API comes:
      // const postRes = await fetch("/api/posts");
      // const postData = await postRes.json();
      // setPosts(postData);

      // const workerRes = await fetch("/api/workers");
      // const workerData = await workerRes.json();
      // setWorkers(workerData);

      setPosts(dummyPosts);
      setWorkers(serviceData);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="headerRow">
        <h2>All Posts</h2>
        <button onClick={()=>Navigate("/create-post")} className="addBtn">+</button>
      </div>

      {/* TABS */}
      <PostTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* POSTS */}
      {loading ? (
        <p>Loading posts...</p>
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

      {/* RECOMMENDED SECTION */}
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
