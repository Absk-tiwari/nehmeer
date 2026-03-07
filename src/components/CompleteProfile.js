import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();

  // 🔮 Future /API ready state
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    gender: "",
    lookingFor: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Profile Data:", formData);

    // 🔮 FUTURE
    // dispatch(saveProfile(formData))
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      {/* CONTENT */}
      <div className="profile-page">
        <h2 className="profile-title">Complete your Profile</h2>

        {/* NAME */}
        <label>Name</label>
        <div className="input-box">
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* WHATSAPP */}
        <label>WhatsApp No.</label>
        <div className="input-box phone">
          <span>+91</span>
          <input
            type="tel"
            name="whatsapp"
            placeholder="Enter WhatsApp Number"
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </div>

        {/* GENDER */}
        <label>Gender</label>
        <div className="input-box select-box">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* LOOKING FOR */}
        <label>I Am Looking For</label>
        <div className="input-box">
          <input
            type="text"
            name="lookingFor"
            placeholder="A Cook, A Babysitter..."
            value={formData.lookingFor}
            onChange={handleChange}
          />
        </div>

        {/* LOCATION */}
        <label>Select Your Location</label>
        <div className="input-box select-box">
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
          </select>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="profile-actions">
        <button className="login-btn full-btn" onClick={handleSave}>
          Save Details
        </button>

        <button
          className="skip-btn"
          onClick={() => navigate("/dashboard")}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default CompleteProfile;
