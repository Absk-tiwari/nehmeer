const ServiceCard = ({ service, onClick }) => {
  return (
   <div className="provider-card">


      {/* IMAGE */}
      <div className="provider-image">

        <img src={service.image} alt="profile" />

        <button className="fav">♡</button>

        <button onClick={onClick} className="view-btn">
          View
        </button>
      </div>

      {/* INFO */}
    <div className="provider-info">

       <div className="provider-name-row">

          <h4>{service.name}</h4>
          <span className="verified">✔</span>
        </div>

        <p className="experience">Experience {service.experience}</p>
        <p className="sc-role">{service.role}</p>

        <div className="provider-rating-row">

          <span className="rating">★ {service.rating}</span>
          <span className="reviews">{service.reviews} Ratings</span>
        </div>

        <p className="age">Age - {service.age}</p>
        <p className="location">
          Location - {service.location}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
