import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../redux/slices/profileSlice";


const CompleteProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ use profile loader (not auth)
  const { loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    gender: "",
    lookingFor: "",
    location: "",
  });

  // ✅ Auto-fill mobile
  useEffect(() => {
    const mobile = localStorage.getItem("signupMobile");

    if (mobile) {
      setFormData((prev) => ({
        ...prev,
        whatsapp: mobile,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Validation
  const validateForm = () => {
    const { name, whatsapp, gender, lookingFor, location } = formData;

    if (!name.trim()) return "Name is required";

    if (!/^[6-9]\d{9}$/.test(whatsapp)) {
      return "Enter valid WhatsApp number";
    }

    if (!gender) return "Please select gender";

    if (!lookingFor.trim()) {
      return "Please enter what you are looking for";
    }

    if (!location) return "Please select location";

    return null;
  };

  const handleSave = async () => {
    const error = validateForm();

    if (error) {
      return Swal.fire("Validation Error", error, "warning");
    }

    try {
      const role = localStorage.getItem("signupRole");

      const result = await dispatch(
        saveProfile({ ...formData, role })
      );

      if (saveProfile.fulfilled.match(result)) {
        Swal.fire({
          icon: "success",
          title: "Profile Completed 🎉",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/dashboard");
      } else {
        Swal.fire("Error", result.payload, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="login-page" >
      <div className="profile-page" style={{border: "1px solid #ccc", borderRadius:"6px"}}>
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

 <div className="profile-actions">
        <button
          className="login-btn full-btn"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Details"}
        </button>

        <button
          className="skip-btn"
          onClick={() => navigate("/dashboard")}
        >
          Skip for now
        </button>
      </div>

      </div>

      {/* ACTION BUTTONS */}
     
    </div>
  );
};

export default CompleteProfile;