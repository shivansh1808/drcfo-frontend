import React from "react";
import "./WebClinicSlots.css";
const WebClinicSlots = ({ availability }) => {
  console.log(availability.days);
  return (
    <div className="web_clinic_visiting_hours">
      <div className="web_clinic_visiting_time">
        {availability.startTime} - {availability.endTime}
      </div>
      <div className="web_clinic_visiting_days">
        {availability.days.length
          ? availability.days.map((item, id) => (
              <div key={id}>{item.substring(0, 3)}</div>
            ))
          : null}
      </div>
    </div>
  );
};

export default WebClinicSlots;
