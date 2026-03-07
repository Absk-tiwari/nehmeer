import React from "react";

const StarRating = ({ value, onChange }) => {
  return (
    <div className="fb-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className={value >= star ? "fb-star active" : "fb-star"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;