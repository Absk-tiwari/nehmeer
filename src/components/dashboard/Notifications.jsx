import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/slices/notificationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faFileAlt, faGear, faRotate, faFile } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, unreadCount, loading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  if (loading) {
    return (
      <AppLayout header={<CommonHeader back title="Notifications" />}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}>
          <Spinner style={{ width: "3rem", height: "3rem", color: "#7f9346" }} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      header={
        <CommonHeader
          back
          title={`Notifications`}
        />
      }
    >
      <div className="notifications-wrapper">
        {list?.length > 0 ? (
          list.map((item) => (
            <div className="notification-card" key={item._id || item.id}>
              <div className={`notification-icon ${item.type || "info"}`}>
                <span>
                  <FontAwesomeIcon icon={
                    item.type === "success"
                      ? faFileAlt
                      : item.type === "offer"
                      ? faGear
                      : item.type === "update"
                      ? faRotate
                      : faFile
                  } />
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
          <div className="empty-state">
            <div className="empty-icon">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <h3>No Notifications Yet</h3>
            <p>You're all caught up! We'll notify you when something new arrives.</p>
            <button className="empty-btn" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Notifications;
