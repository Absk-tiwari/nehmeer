import React from "react";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Post Submitted Successfully!",
    message:
      "Your babysitter requirement has been posted successfully. Sit back and let us find the perfect match for you!",
    time: "04:00pm",
    icon: "📝",
  },
  {
    id: 2,
    type: "offer",
    title: "Limited-Time Offer: 50% Off!",
    message:
      "Unlock premium features now with an exclusive 50% discount. Subscribe today and save big!",
    time: "04:00pm",
    icon: "⚙️",
  },
  {
    id: 3,
    type: "offer",
    title: "Limited-Time Offer: 50% Off!",
    message:
      "Unlock premium features now with an exclusive 50% discount. Subscribe today and save big!",
    time: "04:00pm",
    icon: "⚙️",
  },
  {
    id: 4,
    type: "info",
    title: "Requirement Successfully Posted.",
    message:
      "Our team has received your requirement and will contact you soon.",
    time: "04:00pm",
    icon: "📄",
  },
  {
    id: 5,
    type: "update",
    title: "Stay Updated!",
    message:
      "Don’t miss out on exciting updates, new features, and personalized recommendations just for you!",
    time: "04:00pm",
    icon: "🔄",
  },
];

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="notifications-page">

      {/* TOP HEADER */}
      <div className="notification-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          ←
        </span>
        <h2>Notification</h2>
      </div>

      {/* LIST */}
      <div className="notifications-wrapper">
        {notifications.map((item) => (
          <div className="notification-card" key={item.id}>
            <div className={`notification-icon ${item.type}`}>
              <span>{item.icon}</span>
            </div>

            <div className="notification-content">
              <h4>{item.title}</h4>
              <p>{item.message}</p>
            </div>

            <span className="notification-time">{item.time}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Notifications;
