import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import axios from "../../axios";
import "./RescheduleModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "250px",
    width: "500px",
    transform: "translate(-50%, -50%)",
  },
};
const modalH1 = {
  fontWeight: "400",
  fontSize: "17px",
  lineHeight: "22px",
  textAlign: "center",
  color: "#7D818B",
};
const modalButton = {
  border: "none",
  padding: "8px 10px",
  background: "#E6EBFF",
  color: "#194af5",
  borderRadius: "4px",
  width: "150px",
};
const modalButton2 = {
  background: "none",
  border: "1px solid #e6ebff",
  width: "150px",
  color: "#194af5",
};

Modal.setAppElement("#root");

const RescheduleModal = ({ modalIsOpen, setIsOpen, item }) => {
  function closeModal() {
    console.log(item);
    console.log(item.docterId, item.slot.time, item.slot.date, item._id);
    // fetch(`https://drco-all-backend-617u.onrender.com/cancelAppointment`, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     docterId: item.docterId,
    //     time: item.slot.time,
    //     date: item.slot.date,
    //     id: item._id,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.message == "Appointment Cancelled!") {
    //       setIsOpen(false);
    //     }
    //   });
    axios
      .put(`/cancelAppointment`, {
        docterId: item.docterId,
        time: item.slot.time,
        date: item.slot.date,
        id: item._id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message == "Appointment Cancelled!") {
          setIsOpen(false);
        }
      });
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex justify-content-center flex-column align-items-center">
          <div className="RescheduleModal">
            <h1 style={modalH1}>
              Cancel your patient's appointment according to your availability.
            </h1>
          </div>
          <div className="RescheduleModal_btn">
            <button style={modalButton2} onClick={closeModal}>
              Cancel Booking
            </button>
            <button onClick={() => setIsOpen(false)} style={modalButton}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RescheduleModal;
