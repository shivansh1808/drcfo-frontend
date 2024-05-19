import React from "react";
import "./SuggestionPane.css";
import { appointmentStatus } from "../../../../util/constants";
const SuggestionPane = ({ suggestions }) => {
  // console.log("SuggestionsPane", suggestions);
  return (
    <div className="SuggestionPane">
      {suggestions?.map((suggestion) => {
        return (
          <div className="suggestion_card">
            <h2>
              {suggestion?.patient?.name ||
                suggestion?.unregisteredPatient?.name}
            </h2>
            <h2>
              +91{" "}
              {suggestion?.patient?.phone ||
                suggestion?.unregisteredPatient?.phone}
            </h2>
            {suggestion?.status === appointmentStatus.pending ? (
              <button className="pending_cta">{suggestion?.status}</button>
            ) : suggestion?.status === appointmentStatus.confirmed ? (
              <button className="Upcoming_cta">{suggestion?.status}</button>
            ) : (
              <button className="completed_cta">{suggestion?.status}</button>
            )}
          </div>
        );
      })}
      {/* <div className="suggestion_card">
        <h2>Karan Sharma</h2>
        <h2>+91 6738239293</h2>
        <button className="pending_cta">Pending</button>
      </div>
      <div className="suggestion_card">
        <h2>Karan Sharma</h2>
        <h2>+91 6738239293</h2>
        <button className="Upcoming_cta">Upcoming</button>
      </div>
      <div className="suggestion_card">
        <h2>Karan Sharma</h2>
        <h2>+91 6738239293</h2>
        <button className="completed_cta">Completed</button>
      </div> */}
    </div>
  );
};

export default SuggestionPane;
