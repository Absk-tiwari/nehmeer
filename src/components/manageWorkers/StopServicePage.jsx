import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const StopServicePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const serviceType = location.state?.serviceType || "HomeAide";

  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  // 🔥 Service Based Dynamic Reasons
  const serviceReasons = {
    HomeAide: [
      "Work not satisfactory",
      "Timing issue",
      "Found another helper",
      "Charges too high",
      "Temporary break",
      "Other reason"
    ],

    Babysitter: [
      "Child not comfortable",
      "Safety concerns",
      "Not punctual",
      "Found another babysitter",
      "Temporary break",
      "Other reason"
    ],

    Maid: [
      "Cleaning not proper",
      "Coming late regularly",
      "Behaviour issue",
      "Found another maid",
      "Temporary break",
      "Other reason"
    ],

    "All rounders": [
      "Multi-tasking not proper",
      "Work quality low",
      "Found another worker",
      "Charges high",
      "Temporary break",
      "Other reason"
    ],

    Nurse: [
      "Care not satisfactory",
      "Medical handling issue",
      "Found another nurse",
      "Charges too high",
      "Temporary break",
      "Other reason"
    ],

    "Cooks/Chef": [
      "Food taste not good",
      "Hygiene issue",
      "Timing mismatch",
      "Found another cook",
      "Temporary break",
      "Other reason"
    ],

    "Dog Sitter": [
      "Pet not comfortable",
      "Irregular visits",
      "Found another sitter",
      "Charges high",
      "Temporary break",
      "Other reason"
    ],

    Driver: [
      "Driving not safe",
      "Late arrival",
      "Found another driver",
      "Charges high",
      "Temporary break",
      "Other reason"
    ]
  };

  const reasons =
    serviceReasons[serviceType] || serviceReasons["HomeAide"];

  const handleSubmit = async () => {
    if (!selectedReason) {
      alert("Please select a reason");
      return;
    }

    const payload = {
      workerId: id,
      serviceType,
      reason: selectedReason,
      description:
        selectedReason === "Other reason" ? otherReason : ""
    };

    console.log("Stop Service Payload:", payload);

    // 🔥 Future Backend API
    // await axios.post("/api/service/stop", payload);

    navigate(`/manage-workers/feedback/${id}`);
  };

  return (
    <div className="ss-page">
      <div className="ss-card">

        <div className="ss-header">
          <h2>Stop {serviceType} Service</h2>
          <span className="ss-close" onClick={() => navigate(-1)}>✕</span>
        </div>

        <p className="ss-subtitle">
          Please Let Us Know Why You Want To Stop This Service.
        </p>

        <div className="ss-options">
          {reasons.map((reason, index) => (
            <label key={index} className="ss-option">
              <span>{reason}</span>
              <input
                type="radio"
                name="stopReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
              />
              <span className="ss-radio"></span>
            </label>
          ))}
        </div>

        {selectedReason === "Other reason" && (
          <textarea
            className="ss-textarea"
            placeholder="Write your reason here..."
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
          />
        )}

        <button className="ss-submit" onClick={handleSubmit}>
          Submit
        </button>

      </div>
    </div>
  );
};

export default StopServicePage;