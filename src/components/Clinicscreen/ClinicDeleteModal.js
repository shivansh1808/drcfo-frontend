import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ClinicVerification from "./ClinicVerification";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "auto",
    width: "30vw",
    paddingBottom: "3vw",
    transform: "translate(-50%, -50%)",
  },
};
const modalH1 = {
  fontWeight: "500",
  fontSize: "1.1vw",
  lineHeight: "22px",
  textAlign: "center",
  color: "#000",
};
const modalButton = {
  border: "none",
  padding: "0.5vw",
  background: "#FFE2E2",
  color: "#FF6767",
  fontWeight: "500",
  borderRadius: "2px",
  minWidth: "7vw",
};
const modalButton2 = {
  background: "#E6EBFF",
  border: "none",
  minWidth: "7vw",
  fontWeight: "500",
  color: "#194af5",
  padding: "0.5vw",
};

const ClinicDeleteModal = ({ isOpen, setIsOpen, setIsDeleteConfirmed }) => {
  const [verificationModal, setVerificationModal] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  // const [loading, setLoading] = useState()

  function handleIsOtpVerified() {
    if (isOtpVerified) {
      setIsDeleteConfirmed(true);
      setIsOpen(false);
    }
  }

  useEffect(() => {
    handleIsOtpVerified();
  }, [isOtpVerified]);

  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Example Modal">
      <div className="d-flex justify-content-center flex-column align-items-center">
        <div className="DeleteModal">
          <h1 style={modalH1}>Are you sure you want to delete the clinic?</h1>
        </div>
        <div className="DeleteModal_btn">
          <button style={modalButton2} onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button
            style={modalButton}
            onClick={() => {
              setVerificationModal(true);
            }}
          >
            Yes
          </button>
          <ClinicVerification
            verificationModal={verificationModal}
            setVerificationModal={setVerificationModal}
            isOtpVerified={isOtpVerified}
            setIsOtpVerified={setIsOtpVerified}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ClinicDeleteModal;
