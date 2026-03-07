import { useParams, useNavigate } from "react-router-dom";
import ServiceTabs from "../service/ServiceTabs";
import userImage from "../../assets/img/user1.png"; // fallback image
import { serviceData } from "../data/serviceData";

const ServiceDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  // Find worker by id + type
  const service = serviceData.find(
    
    (item) => item.id === Number(id) && item.type === type
    
  );
  console.log("gggggggg,",serviceData)
  console.log("URL type:", type);
console.log("URL id:", id);
console.log("All Data:", serviceData);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="details-page">

      {/* HEADER */}
      <div className="details-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>{service.name}</h3>
        <div className="header-icons">
          <span>↗</span>
          <span>♡</span>
        </div>
      </div>

      {/* PROFILE SECTION */}
      <div className="profile-section">
        <img src={service.image || userImage} alt={service.name} />

        <div className="profile-info">
          <div className="name-row">
            <h2>{service.name}</h2>
            {service.verified && <span className="verified">✔</span>}
          </div>

          <p className="experience">
            Experience {service.experience}
          </p>

          <p className="role">{service.role}</p>

          <div className="rating-row">
            <span className="rating">★ {service.rating}</span>
            <span className="reviews">
              {service.reviews} Ratings
            </span>
          </div>

          <p className="age">Age - {service.age}</p>
          <p className="location">
            Location - {service.location} · Distance 8Km
          </p>

          <button className="locate-btn">📍 Locate</button>
        </div>
      </div>

      {/* TABS */}
      <ServiceTabs service={service} />

      {/* BOTTOM BUTTON */}
      <div className="bottom-enquire">
        <button>Submit Enquire</button>
      </div>

    </div>
  );
};

export default ServiceDetails;