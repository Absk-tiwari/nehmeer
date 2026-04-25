import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/slices/notificationSlice";

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, unreadCount } = useSelector(
    (state) => state.notifications
  );

  const { loading } = useSelector((state) => state.auth); // reuse loader

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="notifications-page">

      {/* HEADER */}
      <div className="notification-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          ←
        </span>
        <h2>
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </h2>
      </div>

      {/* LIST */}
      <div className="notifications-wrapper">

        {list?.length > 0 ? (
  list.map((item) => (
    <div className="notification-card" key={item._id || item.id}>

      <div className={`notification-icon ${item.type || "info"}`}>
        <span>
          {item.type === "success"
            ? "📝"
            : item.type === "offer"
            ? "⚙️"
            : item.type === "update"
            ? "🔄"
            : "📄"}
        </span>
      </div>

      <div className="notification-content">
        <h4>{item.title}</h4>
        <p>{item.message}</p>
      </div>

      <span className="notification-time">
        {item.time || "Now"}
      </span>

    </div>
  ))
) : (
  /* ✅ NEW EMPTY STATE UI */
  <div
    style={{
      textAlign: "center",
      marginTop: "80px",
      padding: "20px",
    }}
  >
    <div style={{ fontSize: "60px" }}>🔔</div>

    <h3 style={{ marginTop: "10px", color: "#333" }}>
      No Notifications Yet
    </h3>

    <p style={{ color: "#777", fontSize: "14px" }}>
      You’re all caught up! We’ll notify you when something new arrives.
    </p>

    <button
      onClick={() => navigate("/dashboard")}
      style={{
        marginTop: "15px",
        padding: "10px 18px",
        border: "none",
        borderRadius: "8px",
        background: "#000",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Go to Dashboard
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default Notifications;