import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { sendMobileOTP } from "../../api/auth";
import useAppContext from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import CrossButton from "../CrossButton";
import Spinner from "../Spinner";
import "./ClinicVerification.css";
import OtpVerification from "./OtpVerification";

const customStyles = {
  content: {
    margin: "auto",
    paddingBottom: "5vw",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "auto",
    width: "50vw",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
  },
};
// const modalH1 = {
//   fontWeight: "500",
//   fontSize: "1.5vw",
//   lineHeight: "22px",
//   textAlign: "center",
//   color: "#000",
// };
// const modalButton = {
//   border: "none",
//   padding: "8px",
//   background: "#FFE2E2",
//   color: "#FF6767",
//   borderRadius: "2px",
//   width: "100px",
// };
// const modalButton2 = {
//   background: "#E6EBFF",
//   border: "none",
//   width: "100px",
//   color: "#194af5",
//   padding: "8px",
// };

const ClinicVerification = ({
  verificationModal,
  setVerificationModal,
  isOtpVerified,
  setIsOtpVerified,
}) => {
  const { user } = useAuth();
  const { setSnackbar } = useAppContext();
  const [OtpVerificationModal, setOtpVerificationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onClickNext() {
    setLoading(true);
    // TODO: send OTP to registered mobile number
    const responseData = await sendMobileOTP(user.phone);
    if (responseData) {
      setOtpVerificationModal(true);
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Could not send OTP",
      });
    }
    setLoading(false);
  }

  function handleIsOtpVerified() {
    if (isOtpVerified) {
      setVerificationModal(false);
    }
  }

  function onClickCrossButton() {
    setVerificationModal(false);
  }

  useEffect(() => {
    handleIsOtpVerified();
  }, [isOtpVerified]);

  return (
    <Modal isOpen={verificationModal} style={customStyles}>
      <CrossButton onClick={onClickCrossButton} />
      <p className="v-text">Verification</p>
      <p className="v-text1">Enter your registered Mobile Number or Email.</p>

      <input
        type="text"
        className="v-input"
        placeholder="Enter Phone Number or Email ID"
        defaultValue={user?.phone}
        disabled
      />
      <br />
      <button className="v-btn" value="submit" onClick={onClickNext}>
        {loading ? <Spinner /> : "Next"}
      </button>

      <OtpVerification
        phone={user?.phone}
        setOtpVerificationModal={setOtpVerificationModal}
        OtpVerificationModal={OtpVerificationModal}
        setIsOtpVerified={setIsOtpVerified}
      />
    </Modal>
  );
};

export default ClinicVerification;
