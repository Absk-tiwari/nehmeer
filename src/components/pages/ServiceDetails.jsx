import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ServiceTabs from "../service/ServiceTabs";
import placeholderImage from "../../assets/img/placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faHeart, faCheck, faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

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
    return (
      <AppLayout header={<CommonHeader back title="Loading..." />}>
        <div className="loader">Loading...</div>
      </AppLayout>
    );
  }

  // ❌ NOT FOUND
  if (!service) {
    return (
      <AppLayout header={<CommonHeader back title="Not Found" />}>
        <div className="no-data">Service not found</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout header={<CommonHeader back title={service.title || "Service"} />}>
      <div className="details-page">

      {/* PROFILE */}
      <div className="profile-section">

        <img
          src={service.profile_photo || placeholderImage}
          alt={service.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />

        <div className="profile-info">

          <div className="name-row">
            <h2>{service.name || "No Name"}</h2>

            {service.is_verified && (
              <span className="verified"><FontAwesomeIcon icon={faCheck} /></span>
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
              <FontAwesomeIcon icon={faStar} /> {service.rating || "0"}
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
            <FontAwesomeIcon icon={faLocationDot} /> Locate
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
    </AppLayout>
  );
};

export default ServiceDetails;