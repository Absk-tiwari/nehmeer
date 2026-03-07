import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import ProfileProgress from "./dashboard/ProfileProgress";
import UserReviews from "./dashboard/UserReviews";
import QuickGuide from "./dashboard/QuickGuide";
import NavTop from "./layouts/NavTop";
const Dashboard = () => {
   const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
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
 useEffect(() => {
   
    setNotificationCount(5);
  }, []);
  return (
    <div className="dashboard">

     <NavTop notificationCount={notificationCount} />

      {/* HERO BANNER */}
      <div className="hero-card">
        <img src={banner1} alt="banner" />
        
      </div>
      <ProfileProgress percentage={60} />

      {/* SERVICES */}
      <section className="services">
        <h2>Housekeeping and Domestic Services</h2>
        <div className="service-grid">
          {services.map((item, i) => (
          <div
            className="service-item"
            key={i}
            onClick={() => navigate(`/services/${item.name.toLowerCase()}`)}
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

      {/* SECOND BANNER */}
      <div className="hero-card light">
        <img src={banner2} alt="banner" className="bannertwo"/>
        
      </div>
      <QuickGuide/>
      <UserReviews />
    </div>
  );
};

export default Dashboard;
