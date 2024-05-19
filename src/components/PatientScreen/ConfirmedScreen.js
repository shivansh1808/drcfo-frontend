import React, { useState } from "react";
import docImage from "../../assets/images/patient_skull.png";
import "./AppointmentCard.css";
import calender from "../../assets/images/Calendar.png";
import time from "../../assets/images/Clock.png";
import MedicalHistoryForm from "./PatientTabs/MedicalHistoryForm/MedicalHistoryForm";
import RescheduleModal from "./RescheduleModal";
const ConfirmedScreen = ({ item }) => {
  // console.log(item);
  const [modalIsOpen, setIsOpen] = useState(false);
  const datestring = item?.appointmentSlot ?? "20201124";
  const date = new Date(datestring.slice(0, -1));
  var gsDayNames = [
    " ",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  var monthName = gsDayNames[month];
  const [open, setOpen] = useState(false);

  return (
    <div className="appointment_card">
      <div className="appointment_new_label">New</div>
      <div className="appointment_card_header">
        <div>
          <h1 className="appointment_card_name">
            {" "}
            {item.detials?.name ?? "Anonymous"}
          </h1>
          <h2 className="appointmnet_type_label">
            {item.booking ?? "Walk In"}
          </h2>
          <button
            className="general_Meical_certificate_cta"
            onClick={() => setOpen(true)}
          >
            Generate Medical Certificate
          </button>
          <MedicalHistoryForm open={open} setOpen={setOpen} item={item} />
        </div>
        <div className="appointment_card_details">
          <h4>
            Gender:{" "}
            <span className="appointment_card_details_value">
              {item?.detials?.gender ?? "none"}
            </span>
          </h4>
          <h4>
            Age:{" "}
            <span className="appointment_card_details_value">
              {item?.detials?.age ?? "00" < 10
                ? `0${item?.detials?.age ?? "0"}`
                : item?.detials?.age ?? "00"}
            </span>
          </h4>
          <h4>
            Phone:{" "}
            <span className="appointment_card_details_phone_value">
              {item?.detials?.phone ?? "000-000-0000"}
            </span>
          </h4>
        </div>
      </div>
      <div className="appointment_confirmed_booking_details">
        <div className="myappointment--card--detials--content">
          <h2>Booking: Date & Time</h2>
          <div className="myappointment--card--detials--content--time">
            <img
              style={{ height: "fit-content", marginRight: "0.5vw" }}
              src={calender}
              alt="calender"
            />
            On {monthName.substring(0, 3)} {day >= 10 ? day : `0${day}`}, 2023
          </div>
          <div className="myappointment--card--detials--content--time">
            <img
              style={{ height: "fit-content", marginRight: "0.5vw" }}
              src={time}
              alt="time"
            />

            {item.slot.time.substring(0, 8)}
          </div>
        </div>
      </div>
      <div className="appointment_card_buttons">
        {/* <button className="appointment_card_prescription_cta">
          View Prescription
        </button> */}
        <button className="appointment_card_medical_history_cta">
          Booking Details
        </button>
      </div>
    </div>
  );
};

export default ConfirmedScreen;
