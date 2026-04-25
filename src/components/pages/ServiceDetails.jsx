import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ServiceTabs from "../service/ServiceTabs";
import userImage from "../../assets/img/user1.png";

const ServiceDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const { list, loading } = useSelector((state) => state.jobs);

  // ✅ FIND FROM REDUX DATA
  const service = list.find(
    (item) => String(item.id) === id && item.type === type
  );

  // 🔄 LOADING
  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  // ❌ NOT FOUND
  if (!service) {
    return <div className="no-data">Service not found</div>;
  }

  return (
    <div className="details-page">

      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>{service.title || "Service"}</h3>

        <div className="header-icons">
          <span>↗</span>
          <span>♡</span>
        </div>
      </div>

      {/* PROFILE */}
      <div className="profile-section">

        <img
          src={service.profile_photo || userImage}
          alt={service.title}
        />

        <div className="profile-info">

          <div className="name-row">
            <h2>{service.name || "No Name"}</h2>

            {service.is_verified && (
              <span className="verified">✔</span>
            )}
          </div>

          <p className="experience">
            Experience {service.experience || "N/A"}
          </p>

          <p className="role">
            {service.role || type}
          </p>

          <div className="rating-row">
            <span className="rating">
              ★ {service.rating || "0"}
            </span>
            <span className="reviews">
              {service.reviews || 0} Ratings
            </span>
          </div>

          <p className="age">
            Age - {service.age || "N/A"}
          </p>

          <p className="location">
            Location - {service.location || "N/A"}
          </p>

          <button className="locate-btn">
            📍 Locate
          </button>

        </div>
      </div>

      {/* TABS */}
      <ServiceTabs service={service} />

      {/* BUTTON */}
      <div className="bottom-enquire">
        <button>Submit Enquire</button>
      </div>

    </div>
  );
};

export default ServiceDetails;