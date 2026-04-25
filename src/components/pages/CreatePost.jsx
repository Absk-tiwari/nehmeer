import { useState, useEffect } from "react";
import createPostOptions from "../data/createPostOptions";
import { useDispatch, useSelector } from "react-redux";
import { createPost, resetCreatePost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createLoading, createSuccess, createError } = useSelector(
    (state) => state.posts
  );

  const [policeVerification, setPoliceVerification] = useState(false);

  const [formData, setFormData] = useState({
    lookingFor: "",
    location: "",
    cookingType: "",
    mealPreference: "",
    experienceLevel: "",
    workingHours: "",
    duration: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 Validation (industry level)
    if (!formData.lookingFor || !formData.location) {
      return Swal.fire(
        "Missing Fields",
        "Please fill required fields",
        "warning"
      );
    }

    const finalData = {
      ...formData,
      policeVerification,
    };

    dispatch(createPost(finalData));
  };

  // ✅ SUCCESS HANDLING
  useEffect(() => {
    if (createSuccess) {
      Swal.fire({
        icon: "success",
        title: "Post Created 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/posts"); // change if route different
      dispatch(resetCreatePost());
    }
  }, [createSuccess, navigate, dispatch]);

  // ❌ ERROR HANDLING
  useEffect(() => {
    if (createError) {
      Swal.fire("Error", createError, "error");
    }
  }, [createError]);

  return (
    <div className="create-post-wrapper">
      <div className="create-post-container">

        <div className="page-header">
          <span className="back-arrow" onClick={() => navigate(-1)}>
            ←
          </span>
          <span>Create a new post</span>
        </div>

        <form className="form" onSubmit={handleSubmit}>

          {/* Looking For */}
          <div className="form-group">
            <label>I am looking for a</label>
            <select
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {createPostOptions.lookingFor.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where do you need the cook?"
            />
          </div>

          {/* Cooking Type */}
          <div className="form-group">
            <label>Type of Cooking</label>
            <select
              name="cookingType"
              value={formData.cookingType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {createPostOptions.cookingTypes.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Meal Preferences */}
          <div className="form-group">
            <label>Meal Preferences</label>
            <select
              name="mealPreference"
              value={formData.mealPreference}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {createPostOptions.mealPreferences.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Level */}
          <div className="form-group">
            <label>Experience Level</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {createPostOptions.experienceLevels.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Working Hours */}
          <div className="form-group">
            <label>Working Hours</label>
            <select
              name="workingHours"
              value={formData.workingHours}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {createPostOptions.workingHours.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="form-group">
            <label>Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {createPostOptions.durations.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your words"
            />
          </div>

          {/* Checkbox */}
          <div className="checkbox-row">
            <input
              type="checkbox"
              checked={policeVerification}
              onChange={() => setPoliceVerification((prev) => !prev)}
            />
            <span>Police verification required</span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="submit-btn"
            disabled={createLoading}
          >
            {createLoading ? "Posting..." : "Post Your Requirement"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePost;