import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ value, onChange }) => {
  return (
    <div className="fb-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className={value >= star ? "fb-star active" : "fb-star"}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
      ))}
    </div>
  );
};

export default StarRating;