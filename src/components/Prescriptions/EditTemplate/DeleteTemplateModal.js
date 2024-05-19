import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import SuccessAnimation from "../SuccessAnimation";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "400px",
    width: "450px",
    transform: "translate(-50%, -50%)",
  },
};
const modalButton = {
  border: "none",
  padding: "8px 20px",
  marginTop: "30px",
  background: "#194af5",
  color: "#fff",
  borderRadius: "4px",
};
const modalH1 = {
  fontWeight: "500",
  fontSize: "18px",
  marginTop: "30px",
};
const DeleteTemplateModal = ({ deletemodalIsOpen }) => {
  return (
    <Modal
      isOpen={deletemodalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="d-flex justify-content-center flex-column align-items-center">
        <div>
          <SuccessAnimation />
          <h1 style={modalH1}>Template Deleted Succesfully</h1>
        </div>
        <Link to="/dashboard">
          <button style={modalButton}>Go to dashboard</button>
        </Link>
      </div>
    </Modal>
  );
};

export default DeleteTemplateModal;
