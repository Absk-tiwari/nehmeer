import { useState } from "react";
import createPostOptions from "../data/createPostOptions";

const CreatePost = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      policeVerification,
    };

    console.log("Submitting:", finalData);

    // Later you can send this to backend
    // fetch("/api/create-post", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(finalData),
    // });
  };

  return (
    <div className="create-post-wrapper">
      <div className="create-post-container">

        <div className="page-header">
          <span className="back-arrow">←</span>
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

          <button type="submit" className="submit-btn">
            Post Your Requirement
          </button>

        </form>
      </div>
    </div>
  );
};
export default CreatePost;
