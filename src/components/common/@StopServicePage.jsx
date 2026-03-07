// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// // import axios from "axios"; // later for API

// const StopServicePage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // worker id (important for backend)

//   const [selectedReason, setSelectedReason] = useState("");
//   const [otherReason, setOtherReason] = useState("");

//   const reasons = [
//     "Service no longer required",
//     "Not satisfied with the worker’s performance",
//     "Worker not available regularly",
//     "Found another worker",
//     "Salary / charges are too high",
//     "Timing not suitable",
//     "Behaviour issue",
//     "Work quality not good",
//     "Temporary break",
//     "Other reason"
//   ];

//   const handleSubmit = async () => {
//     if (!selectedReason) {
//       alert("Please select a reason");
//       return;
//     }

//     const payload = {
//       workerId: id,
//       reason: selectedReason,
//       description: selectedReason === "Other reason" ? otherReason : ""
//     };

//     console.log("Stop Service Payload:", payload);

//     /*
//     🔥 LATER BACKEND INTEGRATION

//     await axios.post("/api/service/stop", payload);
//     */

//     navigate(-1);
//   };

//   return (
//     <div className="ss-page">
//       <div className="ss-card">

//         <div className="ss-header">
//           <h2>Stop Service</h2>
//           <span className="ss-close" onClick={() => navigate(-1)}>✕</span>
//         </div>

//         <p className="ss-subtitle">
//           Please Let Us Know Why You Want To Stop This Service.
//         </p>

//         <div className="ss-options">
//           {reasons.map((reason, index) => (
//             <label key={index} className="ss-option">
//               <span>{reason}</span>
//               <input
//                 type="radio"
//                 name="stopReason"
//                 value={reason}
//                 checked={selectedReason === reason}
//                 onChange={() => setSelectedReason(reason)}
//               />
//               <span className="ss-radio"></span>
//             </label>
//           ))}
//         </div>

//         <textarea
//           className="ss-textarea"
//           placeholder="Write your reason here..."
//           value={otherReason}
//           onChange={(e) => setOtherReason(e.target.value)}
//         />

//         <button className="ss-submit" onClick={handleSubmit}>
//           Submit
//         </button>

//       </div>
//     </div>
//   );
// };

// export default StopServicePage;