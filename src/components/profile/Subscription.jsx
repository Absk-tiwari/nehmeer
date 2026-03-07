import React from "react";
import { useNavigate } from "react-router-dom";

const Subscription = () => {

  const navigate = useNavigate();

  // Dummy Data (Later replace with API)
  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      price: 299,
      features: [
        "Unlimited profile checking",
        "1 Hire Requests / month"
      ],
      active: true
    },
    {
      id: 2,
      name: "Standard Plan",
      price: 499,
      features: [
        "20 Custom Posts",
        "10 Custom Requests",
        "Unlimited profile checking",
        "10 Hire Requests / month"
      ],
      active: false
    },
    {
      id: 3,
      name: "Premium Plan",
      price: 899,
      features: [
        "40 Custom Posts",
        "20 Custom Requests",
        "Unlimited profile checking",
        "20 Hire Requests / month"
      ],
      active: false
    }
  ];

  const activePlan = plans.find(plan => plan.active);

  return (
    <div className="subscription-page">

      {/* HEADER */}
      <div className="subscription-header">
        <button
          className="subscription-back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h2>My Subscription</h2>
      </div>

      {/* CURRENT PLAN */}
      <div className="my-plan-section">

        <h3>My Plan</h3>

        <div className="my-plan-card">

          <div className="plan-icon">👤</div>

          <div className="plan-info">
            <h4>{activePlan.name}</h4>

            {activePlan.features.map((f, i) => (
              <p key={i}>✓ {f}</p>
            ))}

            <button className="manage-plan-btn">
              Manage Plan
            </button>
          </div>

        </div>

      </div>

      {/* ALL PLANS */}
      <div className="all-plans-section">

        <h3>All Plans</h3>

        <div className="plans-grid">

          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`plan-card plan-${index}`}
            >

              {plan.active && (
                <span className="active-badge">
                  Active Plan
                </span>
              )}

              <div className="plan-icon">💎</div>

              <h4>{plan.name}</h4>

              <h2>₹ {plan.price}</h2>

              <div className="plan-features">
                {plan.features.map((f, i) => (
                  <p key={i}>✓ {f}</p>
                ))}
              </div>

              {plan.active ? (
                <button className="plan-btn">
                  Manage Plan
                </button>
              ) : (
                <button className="plan-btn black">
                  Buy Plan
                </button>
              )}

            </div>
          ))}

        </div>

      </div>

      {/* WHY UPGRADE */}
      <div className="why-upgrade">

        <h4>Why Upgrade?</h4>

        <ul>
          <li>More hire requests</li>
          <li>Higher visibility</li>
          <li>Faster matching</li>
        </ul>

      </div>

      {/* HELP BOX */}
      <div className="help-box">

        <div>
          <p>Need help choosing a plan?</p>
          <button>Help & Support</button>
        </div>

      </div>

      <p className="subscription-footer">
        Secure payments · Instant activation · Cancel anytime
      </p>

    </div>
  );
};

export default Subscription;