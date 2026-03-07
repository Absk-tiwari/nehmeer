import React, { useState } from "react";


const CompleteProfile = ({ mode = "create" }) => {

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    gender: "",
    lookingFor: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {

    if (mode === "create") {
      console.log("Saving Profile", formData);
    } else {
      console.log("Updating Profile", formData);
    }

    // Future API
    // fetch("/api/profile", { method:"POST", body: JSON.stringify(formData) })
  };

  return (
    <div className="complete-profileP">

      <div className="complete-profile-card">

        <h2>Complete your Profile</h2>

        {/* Name */}
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
        />

        {/* Whatsapp */}
        <label>WhatsApp No.</label>
        <div className="whatsapp-input">
          <span>+91</span>
          <input
            type="text"
            name="whatsapp"
            placeholder="Enter WhatsApp Number"
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        {/* Looking For */}
        {mode === "create" && (
          <>
            <label>I Am Looking For</label>
            <input
              type="text"
              name="lookingFor"
              placeholder="A Cook, A Babysitter..."
              value={formData.lookingFor}
              onChange={handleChange}
            />
          </>
        )}

        {/* Location */}
        <label>Select Your Location</label>
        <input
          type="text"
          name="location"
          placeholder="Select"
          value={formData.location}
          onChange={handleChange}
        />

        {/* Buttons */}

        {mode === "create" ? (
          <>
            <button
              className="profile-primary-btn"
              onClick={handleSubmit}
            >
              Save Details
            </button>

            <button className="profile-secondary-btn">
              Skip for now
            </button>
          </>
        ) : (
          <button
            className="profile-primary-btn"
            onClick={handleSubmit}
          >
            Update Details
          </button>
        )}

      </div>

    </div>
  );
};

export default CompleteProfile;