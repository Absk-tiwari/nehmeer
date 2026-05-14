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
import toast from "react-hot-toast";
import {
  saveEmployerProfile,
  saveWorkerProfile,
  uploadAvatar,
} from "../redux/slices/profileSlice";
import { setUser, setWorkerProfile, setAvailability } from "../redux/slices/authSlice";
import AppLayout from "./layouts/AppLayout";
import CommonHeader from "./layouts/CommonHeader";
import placeholderImage from "../assets/img/avatar.jpg";
import Select from "react-select";

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

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const JOB_ROLE_OPTIONS = Object.entries(JOB_ROLES).map(([key, value]) => ({
  value: key,
  label: value,
}));

const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];

const AVAILABILITY_TYPE_OPTIONS = [
  { value: "part-time", label: "Part Time" },
  { value: "full-time", label: "Full Time" },
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "48px",
    borderRadius: "12px",
    border: state.isFocused ? "2px solid #7f9346" : "1px solid #e0e0e0",
    boxShadow: "none",
    backgroundColor: "#fff",
    "&:hover": {
      borderColor: "#7f9346",
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#7f9346" : state.isFocused ? "#f0f4e8" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    padding: "12px 16px",
    cursor: "pointer",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#999",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#333",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { user, workerProfile: wp, availability: stateAvailability } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);

  const workerProfile = wp || user?.workerProfile || {};
  const isWorker = user?.role === "worker";

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profile_photo ?? null
  );
  const [uploading, setUploading] = useState(false);

  const [fields, setFields] = useState({
    name: user?.name || "",
    whatsapp: user?.whatsapp || user?.mobile || "",
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

  const [availability, setAvailabilityState] = useState(
    stateAvailability?.length > 0 ? stateAvailability : []
  );

  // Prefill whatsapp from signup mobile if not set
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
        // Backend returns avatar URL in result.payload.data (relative path)
        const avatarPath = result.payload?.data;
        if (avatarPath && user) {
          dispatch(setUser({ ...user, profile_photo: avatarPath }));
          setAvatarPreview(avatarPath);
        }
        toast.success("Profile picture updated!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload picture");
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
    setAvailabilityState([...availability, { type: "", start_time: "", end_time: "" }]);
  };

  const removeAvailabilitySlot = (index) => {
    setAvailabilityState(availability.filter((_, i) => i !== index));
  };

  const updateAvailabilitySlot = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailabilityState(updated);
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
      return toast.error(error);
    }

    const integerFields = [
      "age", "experience", "part_time_salary", "full_time_salary",
      "hourly_rate", "monthly_rate", "service_radius_km"
    ];

    const transformPayload = (data) => {
      const transformed = { ...data };
      integerFields.forEach((field) => {
        if (transformed[field] === "" || transformed[field] === undefined) {
          transformed[field] = null;
        } else if (transformed[field] !== null) {
          transformed[field] = Number(transformed[field]) || null;
        }
      });
      return transformed;
    };

    const rawPayload = {
      ...fields,
      ...(isWorker ? { ...workerFields, availability } : {}),
    };

    const payload = transformPayload(rawPayload);

    try {
      const saveAction = isWorker ? saveWorkerProfile : saveEmployerProfile;
      const result = await dispatch(saveAction(payload));

      if (saveAction.fulfilled.match(result)) {
        const { user: updatedUser, workerProfile: updatedWp, availability: av } = result.payload?.data || {};
        if (updatedUser) {
          dispatch(setUser(updatedUser));
        }
        if (updatedWp) {
          dispatch(setWorkerProfile(updatedWp));
        }
        if (av) {
          dispatch(setAvailability(av));
        }

        toast.success("Profile saved!");
        setTimeout(() => navigate(-1), 1000);
      } else {
        toast.error(result.payload || "Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <AppLayout header={<CommonHeader back title="Complete Profile" />}>
      <div className="complete-profile-container">

        <div className="avatar-section" onClick={handleAvatarClick}>
          <div className="avatar-wrapper">
            <img
              src={avatarPreview || placeholderImage}
              alt="Avatar"
              className="avatar-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImage;
              }}
            />
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
          {isWorker && (
            <>
              <label className="form-label">Job Title</label>
              <Select
                options={JOB_ROLE_OPTIONS.map((opt) => ({ value: opt.label, label: opt.label }))}
                value={fields.title ? { value: fields.title, label: fields.title } : null}
                onChange={(selected) =>
                  setFields((prev) => ({ ...prev, title: selected?.value || "" }))
                }
                placeholder="Select Job Role"
                styles={selectStyles}
                isClearable
                isSearchable
              />
            </>
          )}
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
          <Select
            options={GENDER_OPTIONS}
            value={GENDER_OPTIONS.find((opt) => opt.value === fields.gender) || null}
            onChange={(selected) =>
              setFields((prev) => ({ ...prev, gender: selected?.value || "" }))
            }
            placeholder="Select Gender"
            styles={selectStyles}
            isClearable
          />

          {!isWorker && (
            <>
              <label className="form-label">I Am Looking For</label>
              <Select
                options={JOB_ROLE_OPTIONS}
                value={JOB_ROLE_OPTIONS.find((opt) => opt.value === fields.lookingFor) || null}
                onChange={(selected) =>
                  setFields((prev) => ({ ...prev, lookingFor: selected?.value || "" }))
                }
                placeholder="Select Role"
                styles={selectStyles}
                isClearable
                isSearchable
              />
            </>
          )}

          <label className="form-label">Select Your Location</label>
          <div className="form-location-btn" onClick={handleLocationSelect}>
            <span>
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
              <Select
                options={MARITAL_STATUS_OPTIONS}
                value={MARITAL_STATUS_OPTIONS.find((opt) => opt.value === fields.marital_status) || MARITAL_STATUS_OPTIONS[0]}
                onChange={(selected) =>
                  setFields((prev) => ({ ...prev, marital_status: selected?.value || "single" }))
                }
                placeholder="Select Status"
                styles={selectStyles}
              />

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
                type="text"
                name="experience"
                className="form-input"
                placeholder="Experience (years)"
                value={workerFields.experience}
                onChange={handleWorkerFieldChange}
              />


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
                  <Select
                    options={AVAILABILITY_TYPE_OPTIONS}
                    value={AVAILABILITY_TYPE_OPTIONS.find((opt) => opt.value === slot.type) || null}
                    onChange={(selected) => updateAvailabilitySlot(index, "type", selected?.value || "")}
                    placeholder="Select Type"
                    styles={selectStyles}
                  />

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
