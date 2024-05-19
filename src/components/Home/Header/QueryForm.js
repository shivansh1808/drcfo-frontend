import axios from "axios";
import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import QueryConfirmModal from "./QueryConfirmModal";
import "./QueryForm.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};
const QueryForm = ({ open, setOpen }) => {
  const [patientType, setPatientTypeValue] = useState("");
  const [query, setQuery] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const getPatientTypeValue = (e) => {
    setPatientTypeValue(e.target.value);
  };
  const getQuery = (e) => {
    setQuery(e.target.value);
  };
  const getClinicName = (e) => {
    setClinicName(e.target.value);
  };
  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
    // console.log(inputValues);
  };
  const submitForm = () => {
    if (patientType == "Docter") {
      axios
        .post(`https://all-backend.vercel.app/user-testing-program`, {
          name: inputValues.name,
          email: inputValues.email,
          phone: inputValues.phone,
          clinicName: clinicName,
        })
        .then((data) => {
          if (data.data.message == "success") {
            setIsOpen(true);
          } else {
            alert("there was an error");
          }
          console.log(data);
        });
    } else if (patientType == "Other") {
      axios
        .post(`https://all-backend.vercel.app/user-testing-program`, {
          name: inputValues.name,
          email: inputValues.email,
          phone: inputValues.phone,
          query: query,
        })
        .then((data) => {
          if (data.data.message == "success") {
            setIsOpen(true);
          } else {
            alert("there was an error");
          }
        });
    } else {
      alert("please fill the form correctly");
    }
  };
  return (
    <Modal
      isOpen={open}
      style={customStyles}
      onRequestClose={() => setOpen(false)}
    >
      <div className="query_modal">
        <h1>Join the User Testing Program</h1>
        <div className="custom-field">
          <input
            type="text"
            className="clinic_input"
            name="name"
            onChange={handleInputChange}
          />
          <span className="placeholder">Name</span>
        </div>
        <div className="custom-field">
          <input
            type="text"
            className="clinic_input"
            name="email"
            onChange={handleInputChange}
          />
          <span className="placeholder">Email</span>
        </div>
        <div className="custom-field">
          <input
            type="text"
            className="clinic_input"
            name="phone"
            onChange={handleInputChange}
          />
          <span className="placeholder">Phone</span>
        </div>
        <p>I'm,</p>
        <div className="light query_radio_buttons">
          <label>
            <input
              type="radio"
              name="light"
              value="Docter"
              onChange={getPatientTypeValue}
            />
            <span className="design"></span>
            <span className="text">Docter</span>
          </label>
          <label>
            <input
              type="radio"
              name="light"
              value="Other"
              onChange={getPatientTypeValue}
            />
            <span className="design"></span>
            <span className="text">Other</span>
          </label>
        </div>{" "}
        <div className="query_options">
          {patientType === "Docter" ? (
            <div className="custom-field">
              <input
                type="text"
                className="clinic_input"
                name="name"
                onChange={getClinicName}
              />
              <span className="placeholder">Clinic Name</span>
            </div>
          ) : patientType === "Other" ? (
            <div className="custom-field">
              <input
                type="text"
                className="clinic_input"
                name="name"
                onChange={getQuery}
              />
              <span className="placeholder">Query</span>
            </div>
          ) : null}{" "}
        </div>
        <div className="query_modal_buttons">
          <button
            className="query_modal_cancel_buttons"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button className="query_modal_proceed_buttons" onClick={submitForm}>
            Proceed
          </button>
          <QueryConfirmModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            setOpen={setOpen}
          />
        </div>
      </div>
    </Modal>
  );
};

export default QueryForm;
