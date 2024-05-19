import React, { useState } from "react";
import "./Monitor.css";
import Requests from "../Request/Requests";
import Stats from "../stats/Stats";
import Appointments from "../AppointmentsList/Appointments";
const Monitor = () => {
  const [reloadAppointments, setReloadAppointments] = useState(false);
  const [viewAllRequests, setViewAllRequests] = useState(false);
  const [viewAllAppointments, setViewAllAppointments] = useState(false);
  return (
    <div className="monitor">
      <Stats />
      <div className="other">
        <Requests
          setReloadAppointments={setReloadAppointments}
          viewAll={viewAllRequests}
          setViewAll={setViewAllRequests}
        />
        <Appointments
          reLoadAppointments={reloadAppointments}
          setViewAll={setViewAllAppointments}
          viewAll={viewAllAppointments}
        />
      </div>
    </div>
  );
};

export default Monitor;
