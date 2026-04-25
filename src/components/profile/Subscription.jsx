import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlans,
  getActivePlan,
} from "../../redux/slices/subscriptionSlice";

const Subscription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { plans, activePlan, loading } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getActivePlan());
  }, [dispatch]);

  // 🔥 fallback plans (so UI never breaks)
  const fallbackPlans = [
    {
      id: 1,
      name: "Basic Plan",
      price: 299,
      features: [
        "Unlimited profile checking",
        "1 Hire Requests / month",
        "Basic support access",
      ],
    },
    {
      id: 2,
      name: "Standard Plan",
      price: 499,
      features: [
        "20 Custom Posts",
        "10 Custom Requests",
        "Unlimited profile checking",
        "10 Hire Requests / month",
        "Priority support",
      ],
    },
    {
      id: 3,
      name: "Premium Plan",
      price: 899,
      features: [
        "40 Custom Posts",
        "20 Custom Requests",
        "Unlimited profile checking",
        "20 Hire Requests / month",
        "Dedicated support",
        "Featured profile boost",
      ],
    },
  ];

  const safePlans =
    plans && plans.length > 0 ? plans : fallbackPlans;

  return (
    <div className="subscription-page">

      {/* HEADER */}
      <div className="subscription-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h2>My Subscription</h2>
      </div>

      {/* CURRENT PLAN */}
      <div className="my-plan-section">
        <h3>My Plan</h3>

        {activePlan ? (
          <div className="my-plan-card">
            <div className="plan-icon">👤</div>

            <div className="plan-info">
              <h4>{activePlan.name}</h4>

              {activePlan.features?.map((f, i) => (
                <p key={i}>✓ {f}</p>
              ))}

              <button className="manage-plan-btn">
                Manage Plan
              </button>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#999" }}>
            No active plan found
          </p>
        )}
      </div>

      {/* ALL PLANS */}
      <div className="all-plans-section">
        <h3>All Plans</h3>

        <div className="plans-grid">

          {loading ? (
            <p>Loading plans...</p>
          ) : (
            safePlans.map((plan, index) => (
              <div key={plan.id} className={`plan-card plan-${index}`}>

                <div className="plan-icon">💎</div>

                <h4>{plan.name}</h4>

                <h2>₹ {plan.price}</h2>

                <div className="plan-features">
                  {plan.features?.map((f, i) => (
                    <p key={i}>✓ {f}</p>
                  ))}
                </div>

                <button className="plan-btn black">
                  {activePlan?.id === plan.id
                    ? "Current Plan"
                    : "Buy Plan"}
                </button>

              </div>
            ))
          )}

        </div>
      </div>

      {/* ⭐ NEW SECTION (RECOMMENDED - INDUSTRY STANDARD) */}
  {/* ⭐ NEW SECTION (RECOMMENDED - INDUSTRY STANDARD) */}
<div
  className="all-plans-section"
  style={{
    marginTop: "30px",
    padding: "20px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #ffffff, #f7f9fc)",
    border: "1px solid #e6e6e6",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  }}
>
  <h3
    style={{
      marginBottom: "15px",
      fontSize: "18px",
      fontWeight: "600",
      color: "#222",
    }}
  >
    Recommended For You
  </h3>

  <div className="plans-grid">

    {fallbackPlans.slice(1).map((plan) => (
      <div
        key={plan.id}
        className="plan-card"
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "15px",
          border: "1px solid #eee",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >

        <div className="plan-icon">🔥</div>

        <h4 style={{ color: "#111", fontWeight: "600" }}>
          {plan.name}
        </h4>

        <h2 style={{ color: "#000" }}>₹ {plan.price}</h2>

        <div className="plan-features">
          {plan.features.map((f, i) => (
            <p
              key={i}
              style={{
                color: "#444",
                fontSize: "13px",
                margin: "4px 0",
              }}
            >
              ✓ {f}
            </p>
          ))}
        </div>

        <button className="plan-btn black">
          Upgrade Now
        </button>

      </div>
    ))}
  </div>
</div>
      {/* WHY UPGRADE */}
      <div className="why-upgrade">
        <h4>Why Upgrade?</h4>
        <ul>
          <li>More hire requests</li>
          <li>Higher visibility in search</li>
          <li>Faster job matching</li>
          <li>Priority customer support</li>
        </ul>
      </div>

      {/* HELP */}
      <div className="help-box">
        <div>
          <p>Need help choosing a plan?</p>
          <button onClick={() => navigate("/support")}>
            Help & Support
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <p className="subscription-footer">
        Secure payments · Instant activation · Cancel anytime
      </p>

    </div>
  );
};

export default Subscription;