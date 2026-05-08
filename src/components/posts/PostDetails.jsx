import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getJobById, applyToJob, closeJob } from "../../redux/slices/jobSlice";
import { getJobIcon } from "../../constants/jobIcons";
import { capitalFirst } from "../../helpers/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faStar,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import successEmoji from "../../assets/img/review-one.png";
import AppLayout from "../layouts/AppLayout";
import CommonHeader from "../layouts/CommonHeader";

const PostDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { selectedJob, loading } = useSelector((state) => state.jobs);

  const [job, setJob] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [applying, setApplying] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getJobById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedJob) {
      const answers = {};
      if (selectedJob.answers && Array.isArray(selectedJob.answers)) {
        selectedJob.answers.forEach((a) => {
          answers[a.question] = a.answer;
        });
      }

      setJob({
        ...selectedJob,
        title: `I am looking for a ${selectedJob.role || "Worker"}`,
        experience: answers["Experience Level"] || "",
        location: answers["Location"] || "",
        status: selectedJob.status,
        statusText: selectedJob.status === "active" ? "Open" : selectedJob.status,
        statusColor: selectedJob.status === "active" ? "#738F2D" : "red",
        icon: getJobIcon(selectedJob.role_id),
      });
    }
  }, [selectedJob]);

  const handleApply = async () => {
    if (job?.hasApplied) return;

    setApplying(true);
    try {
      const result = await dispatch(applyToJob({ jobId: id, applicationData: {} })).unwrap();
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Applied successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        setJob((prev) => ({ ...prev, hasApplied: true }));
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Error", error || "Failed to apply", "error");
    } finally {
      setApplying(false);
    }
  };

  const handleClosePost = (reason) => {
    setShowReasonModal(false);
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = async () => {
    setClosing(true);
    try {
      await dispatch(closeJob(id)).unwrap();
      setShowFeedbackModal(false);
      setShowSuccessModal(true);
      setJob((prev) => ({ ...prev, status: "closed" }));
    } catch (error) {
      Swal.fire("Error", "Failed to close post", "error");
    } finally {
      setClosing(false);
    }
  };

  const isOwner = user?.id === Number(job?.employer_id);
  const canApply = !isOwner && user?.role === "worker";

  if (loading && !job) {
    return (
      <AppLayout header={<CommonHeader back title="Post Info" />}>
        <div className="post-info-container">
          <div className="post-info-loading">
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!job && !loading) {
    return (
      <AppLayout header={<CommonHeader back title="Post Info" />}>
        <div className="post-info-container">
          <div className="post-not-found">
            <p>Post not found</p>
            <button onClick={() => navigate("/all-posts")}>Go Back to Posts</button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout header={<CommonHeader back title="Post Info" />}>
      <div className="post-info-container">

        {/* Title */}
        <div className="post-info-title">
          <h3>{job?.title}</h3>
        </div>

        {/* Answers/Details Section */}
        <div className="post-info-rows">
          {job?.answers &&
            [...job.answers].map((item) => (
              <div className="post-confirm-row" key={item.question}>
                <span className="post-confirm-label">{capitalFirst(item.question)}:</span>
                <span className="post-confirm-value">{item.answer}</span>
              </div>
            ))}

          {job?.description && (
            <div className="post-confirm-row">
              <span className="post-confirm-label">Description:</span>
              <span className="post-confirm-value">{job.description}</span>
            </div>
          )}
        </div>

        {/* Floating Actions */}
        <div className="post-info-actions">
          {isOwner ? (
            <>
              <button
                className="post-action-btn close-btn"
                onClick={() => setShowReasonModal(true)}
              >
                Close this post
              </button>
              <button
                className="post-action-btn view-btn"
                onClick={() => navigate(`/post/${id}/applicants`)}
              >
                View applicants
              </button>
            </>
          ) : canApply ? (
            <button
              className={`post-action-btn apply-btn ${job?.hasApplied ? "applied" : ""}`}
              onClick={handleApply}
              disabled={job?.hasApplied || applying}
            >
              {applying ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : job?.hasApplied ? (
                "Applied"
              ) : (
                "Apply for this job"
              )}
            </button>
          ) : null}
        </div>

      </div>

      {/* Reason Modal */}
      {showReasonModal && (
        <div className="post-modal-overlay" onClick={() => setShowReasonModal(false)}>
          <div className="post-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="post-modal-header">
              <button
                className="post-modal-close"
                onClick={() => setShowReasonModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <h3 className="post-modal-title">Your Feedback Matters</h3>

            <div className="post-reason-options">
              {[
                "Hired from the app.",
                "Hired from local contacts.",
                "Change of mind.",
              ].map((reason) => (
                <button
                  key={reason}
                  className="post-reason-btn"
                  onClick={() => handleClosePost(reason)}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="post-modal-overlay" onClick={() => setShowFeedbackModal(false)}>
          <div className="post-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="post-modal-header">
              <button
                className="post-modal-close"
                onClick={() => setShowFeedbackModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <h3 className="post-modal-title">Your Feedback Matters</h3>

            <div className="post-star-rating">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} className="post-star-btn" onClick={() => setRating(i)}>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`post-star-icon ${rating >= i ? "filled" : ""}`}
                  />
                </button>
              ))}
            </div>

            <p className="post-helper-text">Help us improve</p>

            <textarea
              className="post-feedback-input"
              placeholder="Write your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />

            <button
              className="post-submit-btn"
              onClick={handleSubmitFeedback}
              disabled={closing}
            >
              {closing ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="post-modal-overlay">
          <div className="post-modal-card success-modal">
            <img
              src={successEmoji}
              alt="Success"
              className="post-success-illustration"
            />
            <h3 className="post-success-title">Submission Successful</h3>
            <p className="post-success-sub">
              Thank you for taking the time to give feedback.
            </p>
            <button
              className="post-submit-btn"
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/all-posts");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default PostDetails;
