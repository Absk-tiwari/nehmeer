import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CustomDuties = () => {
  const navigate = useNavigate();

  const [duties, setDuties] = useState({
    massage: true,
    food: true,
    feeding: true,
    bathing: false,
    pickup: false,
    diaper: true,
    cleaning: true,
    walk: false,
    sleep: true,
    related: true,
  });

  const toggleDuty = (key) => {
    setDuties({
      ...duties,
      [key]: !duties[key],
    });
  };

  return (
    <div className="duties-page">

      {/* HEADER */}
      <div className="duties-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>Custom Requirements</h3>
      </div>

      {/* TABS */}
      <div className="duties-tabs">
        <span>Requirement details</span>
        <span className="active">Duties</span>
        <span>Submit</span>
      </div>

      {/* DUTIES LIST */}
      <div className="duties-body">

        <div className="duty-item">
          <span>Baby message</span>
          <label className="switch">
            <input type="checkbox" checked={duties.massage} onChange={()=>toggleDuty("massage")}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="duty-item">
          <span>Baby food preparing</span>
          <label className="switch">
            <input type="checkbox" checked={duties.food} onChange={()=>toggleDuty("food")}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="duty-item">
          <span>Baby feeding</span>
          <label className="switch">
            <input type="checkbox" checked={duties.feeding} onChange={()=>toggleDuty("feeding")}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="duty-item">
          <span>Baby Bathing</span>
          <label className="switch">
            <input type="checkbox" checked={duties.bathing} onChange={()=>toggleDuty("bathing")}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="duty-item">
          <span>Pickup for school</span>
          <label className="switch">
            <input type="checkbox" checked={duties.pickup} onChange={()=>toggleDuty("pickup")}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="duty-item">
          <span>Changing diaper</span>
          <label className="switch">
            <input type="checkbox" checked={duties.diaper} onChange={()=>toggleDuty("diaper")}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="duty-item">
          <span>Cleaning Utensils of baby</span>
          <label className="switch">
            <input type="checkbox" checked={duties.cleaning} onChange={()=>toggleDuty("cleaning")}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="duty-item">
          <span>Taking baby for walk</span>
          <label className="switch">
            <input type="checkbox" checked={duties.walk} onChange={()=>toggleDuty("walk")}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="duty-item">
          <span>Preparing baby for sleep</span>
          <label className="switch">
            <input type="checkbox" checked={duties.sleep} onChange={()=>toggleDuty("sleep")}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="duty-item">
          <span>Baby related all work</span>
          <label className="switch">
            <input type="checkbox" checked={duties.related} onChange={()=>toggleDuty("related")}/>
            <span className="slider"></span>
          </label>
        </div>

        {/* ADD DETAILS */}

        <label className="details-label">Add more details</label>

        <textarea
          className="details-input"
          placeholder="Write"
        />

        {/* NEXT BUTTON */}

        <button
          className="next-btn"
          onClick={() => navigate("/custom-submit")}
        >
          Next →
        </button>

      </div>
    </div>
  );
};

export default CustomDuties;