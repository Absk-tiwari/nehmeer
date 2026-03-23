import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CustomRequirements = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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

  const toggleDuty = (key) => {
    setDuties({ ...duties, [key]: !duties[key] });
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
  <span
    className={step === 1 ? "active" : ""}
    onClick={() => navigate("/custom-requirements")}
  >
    Requirement details
  </span>

  <span
    className={step === 2 ? "active" : ""}
    onClick={() => navigate("/custom-duties")}
  >
    Duties
  </span>

  <span
    className={step === 3 ? "active" : ""}
    onClick={() => navigate("/custom-submit")}
  >
    Submit
  </span>
</div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="req-body">

          <label>I am looking for a</label>
          <select>
            <option>Babysitter</option>
            <option>Cook</option>
            <option>Driver</option>
          </select>

          <label>Location</label>
          <div className="location-box">
            Bolpur, Nayek Para, Birbhum, Pin - 731204
            <span>CHANGE</span>
          </div>

          <label>Availability</label>
          <div className="chips">
            <button className="chip">Full-time</button>
            <button className="chip active">Part-time</button>
            <button className="chip">On-call/Occasional</button>
          </div>

          <label>Shift Divisions</label>
          <div className="radio-group">
            <label><input type="radio" name="shift" /> Morning Shift: 6 AM – 10 AM</label>
            <label><input type="radio" name="shift" defaultChecked/> Midday Shift: 11 AM – 2 PM</label>
            <label><input type="radio" name="shift" /> Evening Shift: 5 PM – 9 PM</label>
            <label><input type="radio" name="shift" /> Night Shift: 9 PM – 12 AM</label>
          </div>

          <label>Experience of worker</label>
          <div className="radio-group">
            <label><input type="radio" name="exp"/> Beginner (0-1 years)</label>
            <label><input type="radio" name="exp" defaultChecked/> Intermediate (2-5 years)</label>
            <label><input type="radio" name="exp"/> Experienced (5+ years)</label>
          </div>

          <button className="next-btn" onClick={() => setStep(2)}>
            Next →
          </button>

        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="req-body">

          <div className="duty">
            <span>Baby food preparing</span>
            <input type="checkbox" checked={duties.food} onChange={() => toggleDuty("food")} />
          </div>

          <div className="duty">
            <span>Baby feeding</span>
            <input type="checkbox" checked={duties.feeding} onChange={() => toggleDuty("feeding")} />
          </div>

          <div className="duty">
            <span>Baby Bathing</span>
            <input type="checkbox" checked={duties.bathing} onChange={() => toggleDuty("bathing")} />
          </div>

          <div className="duty">
            <span>Pickup for school</span>
            <input type="checkbox" checked={duties.pickup} onChange={() => toggleDuty("pickup")} />
          </div>

          <div className="duty">
            <span>Changing diaper</span>
            <input type="checkbox" checked={duties.diaper} onChange={() => toggleDuty("diaper")} />
          </div>

          <div className="duty">
            <span>Cleaning utensils of baby</span>
            <input type="checkbox" checked={duties.cleaning} onChange={() => toggleDuty("cleaning")} />
          </div>

          <div className="duty">
            <span>Taking baby for walk</span>
            <input type="checkbox" checked={duties.walk} onChange={() => toggleDuty("walk")} />
          </div>

          <div className="duty">
            <span>Preparing baby for sleep</span>
            <input type="checkbox" checked={duties.sleep} onChange={() => toggleDuty("sleep")} />
          </div>

          <div className="duty">
            <span>Baby related all work</span>
            <input type="checkbox" checked={duties.related} onChange={() => toggleDuty("related")} />
          </div>

          <label>Add more details</label>
          <textarea placeholder="Write..." />

          <button className="next-btn" onClick={() => setStep(3)}>
            Next →
          </button>

        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="req-body summary">

          <p><strong>I am looking for a</strong><br/>Babysitter</p>

          <p><strong>Location</strong><br/>Delhi, India</p>

          <p><strong>Availability</strong><br/>Part-time</p>

          <p><strong>Shift Divisions</strong><br/>11 AM–2 PM</p>

          <p><strong>Experience</strong><br/>Intermediate (2-5 years)</p>

          <p><strong>Language Proficiency</strong><br/>Bengali</p>

          <p><strong>Religion Preference</strong><br/>Hindu</p>

          <p><strong>Gender Preference</strong><br/>Female</p>

          <p><strong>Age Preference</strong><br/>Adult (21–40)</p>

          <p><strong>Salary preference</strong><br/>Monthly</p>

          <button className="next-btn">
            Confirm & Submit
          </button>

        </div>
      )}

    </div>
  );
};

export default CustomRequirements;