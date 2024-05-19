import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import SuccessAnimation from "../../Prescriptions/SuccessAnimation";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "400px",
    width: "500px",
    transform: "translate(-50%, -50%)",
  },
};
const modalButton = {
  border: "none",
  padding: "8px 20px",
  marginTop: "30px",
  background: "#194af5",
  color: "#fff",
};
const modalH1 = {
  fontWeight: "400",
  fontSize: "17px",
  marginTop: "30px",
};
const BankModal = ({ modalIsOpen }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="d-flex justify-content-center flex-column align-items-center">
        <div>
          <SuccessAnimation />
          <h1 style={modalH1}>Bank Account Added Successfully</h1>
        </div>
        <Link to="/openaccounts">
          <button style={modalButton}>View Details</button>
        </Link>
      </div>
    </Modal>
  );
};

export default BankModal;
