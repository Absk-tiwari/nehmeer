import React, { useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import banner1 from "../assets/img/banner-head.svg";
import banner2 from "../assets/img/banner-middle.svg";
import chef from "../assets/img/chef.svg";
import dog from "../assets/img/dog.svg";
import driver from "../assets/img/driver.svg";
import homeAide from "../assets/img/homeAide.svg";
import maid from "../assets/img/maid.svg";
import nurse from "../assets/img/nurse.svg";
import babysitter from "../assets/img/babyshitter.svg";
import allrounder from "../assets/img/allrounder.svg";

import NavTop from "./layouts/NavTop";

import { getNotifications } from "../redux/slices/notificationSlice";
import { getMyJobs } from "../redux/slices/jobSlice";
import { getProfile } from "../redux/slices/authSlice";

// ✅ LAZY LOAD (Performance Boost)
const ProfileProgress = lazy(() =>
  import("./dashboard/ProfileProgress")
);
const UserReviews = lazy(() =>
  import("./dashboard/UserReviews")
);
const QuickGuide = lazy(() =>
  import("./dashboard/QuickGuide")
);

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { unreadCount } = useSelector((state) => state.notifications);
  const { user, loading } = useSelector((state) => state.auth);
  const { total: totalJobs } = useSelector((state) => state.jobs);

  const services = [
    { name: "HomeAide", icon: homeAide, type: "homeaide" },
    { name: "Babysitter", icon: babysitter, type: "babysitter" },
    { name: "Maid", icon: maid, type: "maid" },
    { name: "All rounders", icon: allrounder, type: "all-rounder" },
    { name: "Nurse", icon: nurse, type: "nurse" },
    { name: "Cooks/Chef", icon: chef, type: "cook" },
    { name: "Dog Sitter", icon: dog, type: "dog-sitter" },
    { name: "Driver", icon: driver, type: "driver" },
  ];

  // ✅ API CALLS
  useEffect(() => {
    dispatch(getNotifications());
    dispatch(getProfile());
    dispatch(getMyJobs());
  }, [dispatch]);

  // // ✅ PROTECTED ROUTE
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate("/login");
  //   }
  // }, [user, loading, navigate]);

  // ✅ GLOBAL LOADER
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* 🔔 Notifications */}
     <NavTop />

      {/* HERO */}
      <div className="hero-card">
        <img src={banner1} alt="banner" />
      </div>

      {/* 👤 Profile (LAZY + FALLBACK LOADER) */}
    {/* 👤 Profile */}
<Suspense fallback={<p>Loading profile...</p>}>
  {user && <ProfileProgress />}
</Suspense>

{/* ⚠️ PROFILE INCOMPLETE WARNING */}
{user && (!user?.name || user?.name?.trim() === "") && (
 <p
  onClick={() => navigate("/complete-profile")}
  style={{
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
    textAlign: "center",
    cursor: "pointer",
  }}
>
  Please complete your profile to unlock full features
</p>
)}

      {/* OPTIONAL INFO */}
      {console.log("TOTAL JOBS:", totalJobs)}

      {/* SERVICES */}
      <section className="services">
        <h2>Housekeeping and Domestic Services</h2>

        <div className="service-grid">
          {services.map((item, i) => (
            <div
              className="service-item"
              key={i}
              onClick={() => navigate(`/services/${item.type}`)}
            >
              <div className="service-card">
                <div className="service-icon">
                  <img src={item.icon} alt={item.name} />
                </div>
              </div>

              <p className="service-text">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <div className="hero-card light">
        <img src={banner2} alt="banner" className="bannertwo" />
      </div>

      {/* QUICK GUIDE */}
      <Suspense fallback={<p style={{ padding: "10px" }}>Loading guide...</p>}>
        <QuickGuide />
      </Suspense>

      {/* REVIEWS */}
      <Suspense fallback={<p style={{ padding: "10px" }}>Loading reviews...</p>}>
        <UserReviews />
      </Suspense>

    </div>
  );
};

export default Dashboard;