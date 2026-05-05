import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import reviewOne from "../../assets/img/review-one.png";
import reviewTwo from "../../assets/img/review-two.png";
import VideoPlayer from "../common/VideoPlayer";

const reviews = [
  {
    name: "Piku Mondal",
    text:
      "Thank you, AllineUp, for helping me find the perfect house helper. The process was simple and very reliable.",
    rating: 5,
    image: reviewOne,
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
  },
  {
    name: "Anita Sharma",
    text:
      "Finding a reliable maid was so easy with this app. Highly recommended for busy professionals!",
    rating: 5,
    image: reviewTwo,
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
  },
  {
    name: "Rajesh Kumar",
    text:
      "Great experience! The workers are verified and professional. Will definitely use again.",
    rating: 5,
    image: reviewOne,
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
  },
  {
    name: "Priya Singh",
    text:
      "Love how simple the booking process is. Found a great babysitter within hours!",
    rating: 5,
    image: reviewTwo,
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
  },
];

const UserReviews = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const handlePlayVideo = (index) => {
    setActiveVideo(index);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <div className="user-reviews">
      <h3 className="section-title">What Our Users Say</h3>

      <div className="review-scroll">
        {reviews.map((item, index) => (
          <div className="review-card" key={index}>
            <div className="review-image">
              {activeVideo === index ? (
                <div className="review-video-player">
                  <VideoPlayer
                    url={item.videoUrl}
                    thumbnail={item.image}
                    light={false}
                    controls={true}
                  />
                  <button className="close-video-btn" onClick={handleCloseVideo}>
                    &times;
                  </button>
                </div>
              ) : (
                <>
                  <img src={item.image} alt={item.name} />
                  <button
                    className="play-overlay"
                    onClick={() => handlePlayVideo(index)}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </button>
                </>
              )}
            </div>

            <div className="review-content">
              <h4>{item.name}</h4>

              <div className="stars">
                {[...Array(item.rating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
                ))}
              </div>

              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {activeVideo !== null && (
        <div className="video-modal-overlay" onClick={handleCloseVideo}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseVideo}>
              &times;
            </button>
            <VideoPlayer
              url={reviews[activeVideo].videoUrl}
              light={false}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviews;
