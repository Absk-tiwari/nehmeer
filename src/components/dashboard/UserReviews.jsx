import React from "react";
import reviewOne from "../../assets/img/review-one.png";
import reviewTwo from "../../assets/img/review-two.png";


const reviews = [
  {
    name: "Piku Mondal",
    text:
      "Thank you, AllineUp, for helping me find the perfect house helper. The process was simple and very reliable.",
    rating: 5,
    image: reviewOne, // API later
  },
  {
    name: "Piku Mondal",
    text:
      "Thank you, AllineUp, for helping me find the perfect house helper. The process was simple and very reliable.",
    rating: 5,
    image: reviewTwo,
  },
    {
    name: "Piku Mondal",
    text:
      "Thank you, AllineUp, for helping me find the perfect house helper. The process was simple and very reliable.",
    rating: 5,
    image: reviewOne, // API later
  },
  {
    name: "Piku Mondal",
    text:
      "Thank you, AllineUp, for helping me find the perfect house helper. The process was simple and very reliable.",
    rating: 5,
    image: reviewTwo,
  },
];

const UserReviews = () => {
  return (
    <div className="user-reviews">
      <h3 className="section-title">What Our Users Say</h3>

      <div className="review-scroll">
        {reviews.map((item, index) => (
          <div className="review-card" key={index}>
            <div className="review-image">
              <img src={item.image} alt={item.name} />
              <button className="play-overlay">▶</button>
            </div>

            <div className="review-content">
              <h4>{item.name}</h4>

              <div className="stars">
                {"★".repeat(item.rating)}
              </div>

              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
