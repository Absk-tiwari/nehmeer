import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/slices/postSlice";


const CustomRequirements = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  // ✅ MAIN FORM STATE
  const [formData, setFormData] = useState({
    title: "Babysitter",
    location: "Delhi",
    availability: "Part-time",
    shift: "Midday",
    experience: "Intermediate",
    duties: [],
    description: "",
  });

  // ✅ DUTIES STATE
  const [duties, setDuties] = useState({
    food: true,
    feeding: true,
    bathing: true,
    pickup: false,
    diaper: true,
    cleaning: true,
    walk: false,
    sleep: true,
    related: true,
  });

  // 🔥 HANDLE DUTY (IMPORTANT FIX)
  const toggleDuty = (key) => {
    const updated = {
      ...duties,
      [key]: !duties[key],
    };

    setDuties(updated);

    const selected = Object.keys(updated).filter((k) => updated[k]);

    setFormData((prev) => ({
      ...prev,
      duties: selected,
    }));
  };

  // 🔥 HANDLE CHANGE
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (!formData.title || !formData.location) {
      return alert("Please fill required fields");
    }

    try {
      const result = await dispatch(createPost(formData));

      if (createPost.fulfilled.match(result)) {
        alert("Post Created Successfully ✅");
        navigate("/my-posts");
      } else {
        alert(result.payload);
      }
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <div className="requirement-page">

      {/* HEADER */}
      <div className="req-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>Custom Requirements</h3>
      </div>

      {/* STEP TABS */}
      <div className="req-tabs">
        <span className={step === 1 ? "active" : ""}>
          Requirement details
        </span>

        <span className={step === 2 ? "active" : ""}>
          Duties
        </span>

        <span className={step === 3 ? "active" : ""}>
          Submit
        </span>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="req-body">

          <label>I am looking for a</label>
          <select
            onChange={(e) => handleChange("title", e.target.value)}
          >
            <option>Babysitter</option>
            <option>Cook</option>
            <option>Driver</option>
          </select>

          <label>Location</label>
          <div className="location-box">
            {formData.location}
            <span>CHANGE</span>
          </div>

          <label>Availability</label>
          <div className="chips">
            <button
              className="chip"
              onClick={() => handleChange("availability", "Full-time")}
            >
              Full-time
            </button>

            <button
              className="chip active"
              onClick={() => handleChange("availability", "Part-time")}
            >
              Part-time
            </button>

            <button
              className="chip"
              onClick={() =>
                handleChange("availability", "On-call")
              }
            >
              On-call/Occasional
            </button>
          </div>

          <label>Shift Divisions</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="shift"
                onChange={() => handleChange("shift", "Morning")}
              />
              Morning Shift
            </label>

            <label>
              <input
                type="radio"
                name="shift"
                defaultChecked
                onChange={() => handleChange("shift", "Midday")}
              />
              Midday Shift
            </label>
          </div>

          <label>Experience of worker</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="exp"
                onChange={() =>
                  handleChange("experience", "Beginner")
                }
              />
              Beginner
            </label>

            <label>
              <input
                type="radio"
                name="exp"
                defaultChecked
                onChange={() =>
                  handleChange("experience", "Intermediate")
                }
              />
              Intermediate
            </label>
          </div>

          <button className="next-btn" onClick={() => setStep(2)}>
            Next →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="req-body">

          {Object.keys(duties).map((key) => (
            <div className="duty" key={key}>
              <span>{key}</span>
              <input
                type="checkbox"
                checked={duties[key]}
                onChange={() => toggleDuty(key)}
              />
            </div>
          ))}

          <label>Add more details</label>
          <textarea
            placeholder="Write..."
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
          />

          <button className="next-btn" onClick={() => setStep(3)}>
            Next →
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="req-body summary">

          <p>
            <strong>I am looking for a</strong>
            <br />
            {formData.title}
          </p>

          <p>
            <strong>Location</strong>
            <br />
            {formData.location}
          </p>

          <p>
            <strong>Availability</strong>
            <br />
            {formData.availability}
          </p>

          <p>
            <strong>Shift</strong>
            <br />
            {formData.shift}
          </p>

          <p>
            <strong>Experience</strong>
            <br />
            {formData.experience}
          </p>

          <button className="next-btn" onClick={handleSubmit}>
            Confirm & Submit
          </button>
        </div>
      )}

    </div>
  );
};

export default CustomRequirements;