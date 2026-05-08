import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faChevronDown,
  faSpinner,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
  saveEmployerProfile,
  saveWorkerProfile,
  uploadAvatar,
} from "../redux/slices/profileSlice";
import { setUser } from "../redux/slices/authSlice";
import AppLayout from "./layouts/AppLayout";
import CommonHeader from "./layouts/CommonHeader";

const JOB_ROLES = {
  1: "Cook",
  2: "Driver",
  3: "Babysitter",
  4: "Dogsitter",
  5: "Nurse",
  11: "Home Aide",
  12: "Maid",
  13: "All-Rounder",
};

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { user, role } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);

  const workerProfile = user?.workerProfile || {};
  const isWorker = role === "worker";

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.profile_photo || null);
  const [uploading, setUploading] = useState(false);

  const [fields, setFields] = useState({
    name: user?.name || "",
    whatsapp: user?.whatsapp || "",
    email: user?.email || "",
    gender: user?.gender || "",
    lookingFor: user?.lookingFor || "",
    location: workerProfile.location || "",
    title: workerProfile.title || "",
    marital_status: workerProfile.marital_status || "single",
  });

  const [workerFields, setWorkerFields] = useState({
    age: workerProfile.age?.toString() || "",
    education: workerProfile.education || "",
    language: workerProfile.language || "",
    religion: workerProfile.religion || "",
    description: workerProfile.description || "",
    experience: workerProfile.experience?.toString() || "",
    part_time_salary: workerProfile.part_time_salary?.toString() || "",
    full_time_salary: workerProfile.full_time_salary?.toString() || "",
    hourly_rate: workerProfile.hourly_rate?.toString() || "",
    monthly_rate: workerProfile.monthly_rate?.toString() || "",
    is_part_time_available: Boolean(workerProfile.is_part_time_available),
    is_full_time_available: Boolean(workerProfile.is_full_time_available),
    is_available: Boolean(workerProfile.is_available),
    city: workerProfile.city || "",
    latitude: workerProfile.latitude || null,
    longitude: workerProfile.longitude || null,
    service_radius_km: workerProfile.service_radius_km?.toString() || "",
  });

  const [availability, setAvailability] = useState(
    user?.availability || [{ type: "", start_time: "", end_time: "" }]
  );

  useEffect(() => {
    const mobile = localStorage.getItem("signupMobile");
    if (mobile && !fields.whatsapp) {
      setFields((prev) => ({ ...prev, whatsapp: mobile }));
    }
  }, []);

  useEffect(() => {
    if (location.state?.selectedAddress) {
      const { address, lat, lng } = location.state.selectedAddress;
      setFields((prev) => ({ ...prev, location: address.fullAddress }));
      setWorkerFields((prev) => ({
        ...prev,
        city: address.city || address.state || "",
        latitude: lat,
        longitude: lng,
      }));
    }
  }, [location.state?.selectedAddress]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkerFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkerFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));
    setAvatar(file);

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      const result = await dispatch(uploadAvatar(formData));
      if (uploadAvatar.fulfilled.match(result)) {
        Swal.fire({
          icon: "success",
          title: "Profile picture updated!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleLocationSelect = () => {
    navigate("/saved-location", {
      state: {
        choosing: true,
        goTo: "/complete-profile",
      },
    });
  };

  const addAvailabilitySlot = () => {
    setAvailability([...availability, { type: "", start_time: "", end_time: "" }]);
  };

  const removeAvailabilitySlot = (index) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const updateAvailabilitySlot = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const validateForm = () => {
    if (!fields.name?.trim()) return "Name is required";
    if (!fields.whatsapp || !/^[6-9]\d{9}$/.test(fields.whatsapp)) {
      return "Enter valid WhatsApp number";
    }
    return null;
  };

  const handleSave = async () => {
    const error = validateForm();
    if (error) {
      return Swal.fire("Validation Error", error, "warning");
    }

    const payload = {
      ...fields,
      ...(isWorker ? { ...workerFields, availability } : {}),
    };

    try {
      const saveAction = isWorker ? saveWorkerProfile : saveEmployerProfile;
      const result = await dispatch(saveAction(payload));

      if (saveAction.fulfilled.match(result)) {
        const { user: updatedUser, workerProfile: wp, availability: av } = result.payload?.data || {};
        if (updatedUser) {
          dispatch(setUser({ ...updatedUser, workerProfile: wp, availability: av }));
        }

        Swal.fire({
          icon: "success",
          title: "Profile saved!",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => navigate(-1), 1500);
      } else {
        Swal.fire("Error", result.payload || "Something went wrong", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <AppLayout header={<CommonHeader back title="Complete Profile" />}>
      <div className="complete-profile-container">

        <div className="avatar-section" onClick={handleAvatarClick}>
          <div className="avatar-wrapper">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                <FontAwesomeIcon icon={faCamera} />
              </div>
            )}
            <div className="avatar-edit">
              <FontAwesomeIcon icon={uploading ? faSpinner : faCamera} spin={uploading} />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="form-section">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter Your Name"
            value={fields.name}
            onChange={handleFieldChange}
          />

          <label className="form-label">WhatsApp No.</label>
          <div className="form-input-row">
            <span className="country-code">+91</span>
            <input
              type="tel"
              name="whatsapp"
              className="form-input-flex"
              placeholder="Enter WhatsApp Number"
              value={fields.whatsapp}
              onChange={handleFieldChange}
              maxLength={10}
            />
          </div>

          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter email"
            value={fields.email}
            onChange={handleFieldChange}
          />

          <label className="form-label">Gender</label>
          <select
            name="gender"
            className="form-select"
            value={fields.gender}
            onChange={handleFieldChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {!isWorker && (
            <>
              <label className="form-label">I Am Looking For</label>
              <select
                name="lookingFor"
                className="form-select"
                value={fields.lookingFor}
                onChange={handleFieldChange}
              >
                <option value="">Select</option>
                {Object.entries(JOB_ROLES).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </>
          )}

          <label className="form-label">Select Your Location</label>
          <div className="form-location-btn" onClick={handleLocationSelect}>
            <span className={fields.location ? "" : "placeholder"}>
              {fields.location || "Select"}
            </span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>

          {isWorker && (
            <>
              <h3 className="section-title">Basic Info</h3>

              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="form-input"
                placeholder="Age"
                value={workerFields.age}
                onChange={handleWorkerFieldChange}
              />

              <label className="form-label">Education</label>
              <input
                type="text"
                name="education"
                className="form-input"
                placeholder="Education"
                value={workerFields.education}
                onChange={handleWorkerFieldChange}
              />

              <label className="form-label">Language</label>
              <input
                type="text"
                name="language"
                className="form-input"
                placeholder="Language"
                value={workerFields.language}
                onChange={handleWorkerFieldChange}
              />

              <label className="form-label">Religion</label>
              <input
                type="text"
                name="religion"
                className="form-input"
                placeholder="Religion"
                value={workerFields.religion}
                onChange={handleWorkerFieldChange}
              />

              <label className="form-label">Marital Status</label>
              <select
                name="marital_status"
                className="form-select"
                value={fields.marital_status}
                onChange={handleFieldChange}
              >
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>

              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-textarea"
                placeholder="Description"
                value={workerFields.description}
                onChange={handleWorkerFieldChange}
                rows={3}
              />

              <h3 className="section-title">Work Info</h3>

              <label className="form-label">Experience (years)</label>
              <input
                type="number"
                name="experience"
                className="form-input"
                placeholder="Experience (years)"
                value={workerFields.experience}
                onChange={handleWorkerFieldChange}
              />

              <label className="form-label">Job Title</label>
              <select
                name="title"
                className="form-select"
                value={fields.title}
                onChange={handleFieldChange}
              >
                <option value="">Select Job Role</option>
                {Object.entries(JOB_ROLES).map(([key, value]) => (
                  <option key={key} value={value}>{value}</option>
                ))}
              </select>

              <label className="form-label">Part-time Salary</label>
              <input
                type="number"
                name="part_time_salary"
                className="form-input"
                placeholder="Part-time Salary"
                value={workerFields.part_time_salary}
                onChange={handleWorkerFieldChange}
              />

              <label className="form-label">Full-time Salary</label>
              <input
                type="number"
                name="full_time_salary"
                className="form-input"
                placeholder="Full-time Salary"
                value={workerFields.full_time_salary}
                onChange={handleWorkerFieldChange}
              />

              <label className="form-label">Hourly Rate</label>
              <input
                type="number"
                name="hourly_rate"
                className="form-input"
                placeholder="Hourly Rate"
                value={workerFields.hourly_rate}
                onChange={handleWorkerFieldChange}
              />

              <label className="form-label">Monthly Rate</label>
              <input
                type="number"
                name="monthly_rate"
                className="form-input"
                placeholder="Monthly Rate"
                value={workerFields.monthly_rate}
                onChange={handleWorkerFieldChange}
              />

              <h3 className="section-title">Availability</h3>

              <div className="switch-row">
                <span>Part-time Available</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="is_part_time_available"
                    checked={workerFields.is_part_time_available}
                    onChange={handleWorkerFieldChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="switch-row">
                <span>Full-time Available</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="is_full_time_available"
                    checked={workerFields.is_full_time_available}
                    onChange={handleWorkerFieldChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="switch-row">
                <span>Currently Available</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={workerFields.is_available}
                    onChange={handleWorkerFieldChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <h3 className="section-title">Location</h3>

              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-input"
                placeholder="City"
                value={workerFields.city}
                onChange={handleWorkerFieldChange}
              />

              <label className="form-label">Service Radius (km)</label>
              <input
                type="number"
                name="service_radius_km"
                className="form-input"
                placeholder="Service Radius (km)"
                value={workerFields.service_radius_km}
                onChange={handleWorkerFieldChange}
              />

              <h3 className="section-title">Time Availability</h3>

              {availability.map((slot, index) => (
                <div key={index} className="availability-slot">
                  <select
                    className="form-select"
                    value={slot.type}
                    onChange={(e) => updateAvailabilitySlot(index, "type", e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="part-time">Part Time</option>
                    <option value="full-time">Full Time</option>
                  </select>

                  <input
                    type="text"
                    className="form-input"
                    placeholder="Start Time (e.g. 09:00)"
                    value={slot.start_time}
                    onChange={(e) => updateAvailabilitySlot(index, "start_time", e.target.value)}
                  />

                  <input
                    type="text"
                    className="form-input"
                    placeholder="End Time (e.g. 18:00)"
                    value={slot.end_time}
                    onChange={(e) => updateAvailabilitySlot(index, "end_time", e.target.value)}
                  />

                  <button
                    type="button"
                    className="remove-slot-btn"
                    onClick={() => removeAvailabilitySlot(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Remove
                  </button>
                </div>
              ))}

              <button type="button" className="add-slot-btn" onClick={addAvailabilitySlot}>
                <FontAwesomeIcon icon={faPlus} /> Add Time Slot
              </button>
            </>
          )}
        </div>

        <div className="form-actions">
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Save Details"
            )}
          </button>

          <button className="skip-btn" onClick={() => navigate("/dashboard")}>
            Skip for now
          </button>
        </div>

      </div>
    </AppLayout>
  );
};

export default CompleteProfile;
