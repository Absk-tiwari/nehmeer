import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../../components/StarRating";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";


const FeedbackPage = () => {
  const navigate = useNavigate();

  const [ratings, setRatings] = useState({
    overall: 0,
    taste: 0,
    cleanliness: 0,
    time: 0,
    variety: 0,
    behavior: 0,
  });

  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    const feedbackData = {
      ...ratings,
      comment,
    };

    console.log("Submitting Feedback:", feedbackData);

    // 🔥 Later you will replace console.log with API call
    // await axios.post("/api/feedback", feedbackData)

    navigate(-1);
  };

  return (
    <AppLayout header={<CommonHeader back title="Feedback" />}>
      <div className="fb-page">
        <div className="fb-card">
          <h2 className="fb-title">Share your experience</h2>

        {/* Overall Rating */}
        <StarRating
          value={ratings.overall}
          onChange={(val) => setRatings({ ...ratings, overall: val })}
        />
        <p className="fb-subtitle">Share ratings</p>

        <hr />

        <h4>Tell us what you like about Antara</h4>

        <div className="fb-row">
          <span>Taste of Food</span>
          <StarRating
            value={ratings.taste}
            onChange={(val) => setRatings({ ...ratings, taste: val })}
          />
        </div>

        <div className="fb-row">
          <span>Cleanliness and Hygiene</span>
          <StarRating
            value={ratings.cleanliness}
            onChange={(val) => setRatings({ ...ratings, cleanliness: val })}
          />
        </div>

        <div className="fb-row">
          <span>Time Management</span>
          <StarRating
            value={ratings.time}
            onChange={(val) => setRatings({ ...ratings, time: val })}
          />
        </div>

        <div className="fb-row">
          <span>Variety in Cooking</span>
          <StarRating
            value={ratings.variety}
            onChange={(val) => setRatings({ ...ratings, variety: val })}
          />
        </div>

        <div className="fb-row">
          <span>Behavior and Professionalism</span>
          <StarRating
            value={ratings.behavior}
            onChange={(val) => setRatings({ ...ratings, behavior: val })}
          />
        </div>

        <h4>Tell us more</h4>
        <textarea
          className="fb-textarea"
          placeholder="Really well behaved. Really cooks food well."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="fb-submit" onClick={handleSubmit}>
          Submit
        </button>

        </div>
      </div>
    </AppLayout>
  );
};

export default FeedbackPage;