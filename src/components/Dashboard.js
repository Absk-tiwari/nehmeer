import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import banner1 from "../assets/img/banner-head.svg";
import banner2 from "../assets/img/banner-middle.svg";
import HeroCarousel from "./common/HeroCarousel";
import chef from "../assets/img/chef.svg";
import dog from "../assets/img/dog.svg";
import driver from "../assets/img/driver.svg";
import homeAide from "../assets/img/homeAide.svg";
import maid from "../assets/img/maid.svg";
import nurse from "../assets/img/nurse.svg";
import babysitter from "../assets/img/babyshitter.svg";
import allrounder from "../assets/img/allrounder.svg";

import NavTop from "./layouts/NavTop";
import MobileSidebar from "./layouts/MobileSidebar";
import SkeletonLoader from "./common/SkeletonLoader";

import { getNotifications } from "../redux/slices/notificationSlice";
import { getMyJobs } from "../redux/slices/jobSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimneyUser,
  faBaby,
  faBroom,
  faUserGear,
  faUserNurse,
  faUtensils,
  faDog,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { unreadCount: _unreadCount } = useSelector((state) => state.notifications);
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

  // ✅ API CALLS (only when logged in)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getNotifications());
      if (user?.role === "employer") {
        dispatch(getMyJobs());
      }
    }
  }, [dispatch, user?.role]);

  // // ✅ PROTECTED ROUTE
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate("/login");
  //   }
  // }, [user, loading, navigate]);
  const goToSearch = role => {
    if(user?.role!=='worker') {
      navigate("/search-results", {
        state: {
          search: "",
          categories: [role.trim()],
        },
      });
    } else {
      toast.error("Can't view profile as worker!")
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <SkeletonLoader type="profile" count={1} />
        <SkeletonLoader type="card" count={4} />
      </div>
    );
  }

  return (
    <div className="dashboard">

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <NavTop onMenuClick={() => setSidebarOpen(true)} />
      <div className="hero-card full-width">
        <HeroCarousel
          images={[
            { src: banner1, alt: "Find trusted domestic help" },
            { src: banner1, alt: "Find trusted domestic help" },
          ]}
          autoPlay={true}
          interval={3000}
          showArrows={false}
          showDots={true}
          infinite={true}
        />
      </div>

      <Suspense fallback={<SkeletonLoader type="profile" count={1} />}>
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
      <section className="services" style={{paddingTop:30}}>
        <h2>Housekeeping and Domestic Services</h2>

        <div className="service-grid">
          {services.map((item, i) => (
            <div
              className="service-item"
              key={i}
              onClick={() => goToSearch(item.name)}
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

      <Suspense fallback={<SkeletonLoader type="card" count={1} />}>
        <QuickGuide />
      </Suspense>

      <Suspense fallback={<SkeletonLoader type="card" count={3} />}>
        <UserReviews />
      </Suspense>

    </div>
  );
};

export default Dashboard;