import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlans,
  getMySubscription,
} from "../../redux/slices/subscriptionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCrown,
  faGem,
  faRocket,
  faStar,
  faHeadset,
  faEye,
  faBolt,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const Subscription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { plans, activePlan, loading } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getMySubscription());
  }, [dispatch]);

  const fallbackPlans = [
    {
      id: 1,
      name: "Basic",
      price: 299,
      period: "month",
      icon: faGem,
      features: [
        "Unlimited profile checking",
        "1 Hire Request / month",
        "Basic support access",
      ],
    },
    {
      id: 2,
      name: "Standard",
      price: 499,
      period: "month",
      icon: faRocket,
      popular: true,
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
      name: "Premium",
      price: 899,
      period: "month",
      icon: faCrown,
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

  const safePlans = plans && plans.length > 0 ? plans : fallbackPlans;

  const getPlanIcon = (index) => {
    const icons = [faGem, faRocket, faCrown];
    return icons[index] || faGem;
  };

  return (
    <AppLayout header={<CommonHeader back title="My Subscription" />}>
      <div className="subscription-page">
        {/* CURRENT PLAN BANNER */}
        {activePlan && (
          <div className="current-plan-banner">
            <div className="current-plan-badge">
              <FontAwesomeIcon icon={faStar} />
              <span>Active Plan</span>
            </div>
            <div className="current-plan-content">
              <div className="current-plan-left">
                <h3>{activePlan.name}</h3>
                <p className="current-plan-price">
                  ₹{activePlan.price}
                  <span>/month</span>
                </p>
              </div>
              <button className="manage-plan-btn">Manage</button>
            </div>
          </div>
        )}

        {/* PLANS SECTION */}
        <div className="plans-section">
          <div className="plans-header">
            <h2>Choose Your Plan</h2>
            <p>Select the plan that best fits your needs</p>
          </div>

          {loading ? (
            <div className="plans-loading">
              <div className="loading-spinner"></div>
              <p>Loading plans...</p>
            </div>
          ) : (
            <div className="plans-grid">
              {safePlans.map((plan, index) => {
                const isActive = activePlan?.id === plan.id;
                const isPopular = plan.popular || index === 1;

                return (
                  <div
                    key={plan.id}
                    className={`plan-card plan-${index} ${isActive ? "active" : ""} ${isPopular ? "popular" : ""}`}
                  >
                    {isPopular && (
                      <div className="popular-badge">
                        <FontAwesomeIcon icon={faStar} /> Most Popular
                      </div>
                    )}

                    {isActive && <div className="active-badge">Current</div>}

                    <div className="plan-icon">
                      <FontAwesomeIcon icon={plan.icon || getPlanIcon(index)} />
                    </div>

                    <h4 className="plan-name">{plan.name}</h4>

                    <div className="plan-price">
                      <span className="currency">₹</span>
                      <span className="amount">{plan.price}</span>
                      <span className="period">/{plan.period || "month"}</span>
                    </div>

                    <div className="plan-features">
                      {plan.features?.map((f, i) => (
                        <div key={i} className="feature-item">
                          <FontAwesomeIcon icon={faCheck} className="check-icon" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className={`plan-btn ${isActive ? "current" : ""}`}
                      disabled={isActive}
                    >
                      {isActive ? "Current Plan" : "Get Started"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* BENEFITS SECTION */}
        <div className="benefits-section">
          <h3>Why Upgrade?</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faRocket} />
              </div>
              <div className="benefit-text">
                <h4>More Requests</h4>
                <p>Send more hire requests monthly</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faEye} />
              </div>
              <div className="benefit-text">
                <h4>Higher Visibility</h4>
                <p>Stand out in search results</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <div className="benefit-text">
                <h4>Faster Matching</h4>
                <p>Get matched with jobs quickly</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <FontAwesomeIcon icon={faHeadset} />
              </div>
              <div className="benefit-text">
                <h4>Priority Support</h4>
                <p>24/7 dedicated assistance</p>
              </div>
            </div>
          </div>
        </div>

        {/* HELP SECTION */}
        <div className="help-section">
          <div className="help-content">
            <FontAwesomeIcon icon={faHeadset} className="help-icon" />
            <div className="help-text">
              <h4>Need help choosing?</h4>
              <p>Our team is here to assist you</p>
            </div>
          </div>
          <button className="help-btn" onClick={() => navigate("/support")}>
            Contact Support
          </button>
        </div>

        {/* TRUST BADGES */}
        <div className="trust-section">
          <div className="trust-item">
            <FontAwesomeIcon icon={faShieldAlt} />
            <span>Secure Payments</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <FontAwesomeIcon icon={faBolt} />
            <span>Instant Activation</span>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <FontAwesomeIcon icon={faCheck} />
            <span>Cancel Anytime</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Subscription;