import React, { useState } from "react";
import Modal from "react-modal";
import "./OtpVerification.css";
import time from "../../assets/images/background/1Future.png";
import { sendMobileOTP, verifyMobileOTP } from "../../api/auth";
import useAppContext from "../context/AppContext";
import { initialState } from "../Authentication";
import Spinner from "../Spinner";
import CrossButton from "../CrossButton";

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

const OtpVerification = ({
  OtpVerificationModal,
  setOtpVerificationModal,
  phone,
  setIsOtpVerified,
}) => {
  const { setSnackbar } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(initialState.otp);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  async function onClickResendOtp() {
    setLoading(true);
    setOtp(initialState.otp);
    const responseData = await sendMobileOTP(phone);
    if (responseData) {
      setSnackbar({
        open: true,
        severity: "success",
        message: "OTP resend successfully",
      });
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Could not resend OTP",
      });
    }
    setLoading(false);
  }

  async function onClickVerify() {
    setLoading(true);
    //TODO: call delete clinic api
    const OTP = otp.join("");
    console.log("Delete Clinic verify OTP", phone, OTP);
    const responseData = await verifyMobileOTP(phone, OTP);
    if (responseData) {
      //   console.log("Delete Clinic OtpVerification", responseData);
      setIsOtpVerified(true);
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Could not verify OTP",
      });
    }
    setLoading(false);
  }

  function onClickCrossButton() {
    setOtpVerificationModal(false);
  }

  return (
    <Modal isOpen={OtpVerificationModal} style={customStyles}>
      <CrossButton onClick={onClickCrossButton} />
      <p class="o-text">Verification</p>
      <p class="o-text1">
        Enter the OTP which has been sent on to your registered Mobile Number.
      </p>

      <div className="o-details">
        <div>
          <p class="o-text2">+91-{phone}</p>
          <div className="o-sub-deatails">
            <img style={{ height: "fit-content" }} src={time} alt="clock" />
            <p class="o-text5">30s</p>
            <p class="o-text4" onClick={onClickResendOtp}>
              Resend OTP
            </p>
          </div>
        </div>

        {/* <p class="o-text3">Edit Number</p> */}
      </div>

      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-9 text-center">
            <div class="row">
              <div class="col-sm-12 mt-3 bgWhite"></div>
              <form>
                {otp.map((data, index) => {
                  return (
                    <input
                      className="verify_otp"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  );
                })}
              </form>
            </div>
          </div>
        </div>
      </div>

      <button class="o-btn" onClick={onClickVerify}>
        {loading ? <Spinner /> : "Verify"}
      </button>
    </Modal>
  );
};

export default OtpVerification;
