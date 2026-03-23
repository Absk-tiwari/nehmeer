import React from "react";
import { useNavigate } from "react-router-dom";


const CustomSubmit = () => {
  const navigate = useNavigate();

  const data = {
    role: "Babysitter",
    location: "Delhi, India",
    availability: "Part-time",
    shift: "11 AM-2PM",
    experience: "Intermediate (2-5 years)",
    language: "Bengali",
    religion: "Hindu",
    gender: "Female",
    age: "Adult (21-30)",
    salary: "Monthly",
  };

  const handleSubmit = () => {
    alert("Requirements Submitted Successfully");
    navigate("/dashboard");
  };

  return (
    <div className="submit-page">

      {/* HEADER */}
      <div className="submit-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>Custom Requirements</h3>
      </div>

      {/* TABS */}
      <div className="req-tabs">
        <span onClick={() => navigate("/custom-requirements")}>
          Requirement details
        </span>

        <span onClick={() => navigate("/custom-duties")}>
          Duties
        </span>

        <span className="active">
          Submit
        </span>
      </div>

      {/* SUMMARY */}
      <div className="submit-body">

        <div className="summary-item">
          <p className="title">I am looking for a</p>
          <p className="value">{data.role}</p>
        </div>

        <div className="summary-item">
          <p className="title">I am looking for a</p>
          <p className="value">{data.location}</p>
        </div>

        <div className="summary-item">
          <p className="title">Availability</p>
          <p className="value">{data.availability}</p>
        </div>

        <div className="summary-item">
          <p className="title">Shift Divisions</p>
          <p className="value">{data.shift}</p>
        </div>

        <div className="summary-item">
          <p className="title">Experience of work</p>
          <p className="value">{data.experience}</p>
        </div>

        <div className="summary-item">
          <p className="title">Language Proficiency</p>
          <p className="value">{data.language}</p>
        </div>

        <div className="summary-item">
          <p className="title">Religion Preference</p>
          <p className="value">{data.religion}</p>
        </div>

        <div className="summary-item">
          <p className="title">Gender Preference</p>
          <p className="value">{data.gender}</p>
        </div>

        <div className="summary-item">
          <p className="title">Age Preference</p>
          <p className="value">{data.age}</p>
        </div>

        <div className="summary-item">
          <p className="title">Salary preference(Monthly)</p>
          <p className="value">{data.salary}</p>
        </div>

      </div>

      {/* BUTTON */}
      <div className="submit-btn-wrapper">
        <button className="submit-btn" onClick={handleSubmit}>
          Confirm & Submit
        </button>
      </div>

    </div>
  );
};

export default CustomSubmit;