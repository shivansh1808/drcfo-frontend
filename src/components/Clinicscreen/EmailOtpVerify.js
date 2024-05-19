import React from "react";
import Modal from "react-modal";
import time from "../../assets/images/background/1Future.png";
const customStyles = {
  content: {
    margin: "auto",
    paddingBottom: "5vw",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "auto",
    width: "45vw",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
  },
};
const EmailOtpVerify = ({ OtpVerificationModal, setOtpVerificationModal }) => {
  return (
    <Modal isOpen={OtpVerificationModal} style={customStyles}>
      <p class="o-text">Verification</p>
      <p class="o-text1">
        Enter the OTP which has been sent on to your registered Email Id.
      </p>

      <div className="o-details">
        <div>
          <p class="o-text2">unmoy@gowhut.in</p>
          <div className="o-sub-deatails">
            <img style={{ height: "fit-content" }} src={time} alt="clock" />
            <p class="o-text5">30s</p>
            <p class="o-text4">Resend OTP</p>
          </div>
        </div>

        <p class="o-text3">Edit Email</p>
      </div>

      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-9 text-center">
            <div class="row">
              <div class="col-sm-12 mt-3 bgWhite"></div>
              <form>
                <input
                  class="otp-verification"
                  type="text"
                  oninput="digitValidate(this)"
                  onkeyup="tabChange(1)"
                  maxlength="1"
                />
                <input
                  class="otp-verification"
                  type="text"
                  oninput="digitValidate(this)"
                  onkeyup="tabChange(2)"
                  maxlength="1"
                />
                <input
                  class="otp-verification"
                  type="text"
                  oninput="digitValidate(this)"
                  onkeyup="tabChange(3)"
                  maxlength="1"
                />
                <input
                  class="otp-verification"
                  type="text"
                  oninput="digitValidate(this)"
                  onkeyup="tabChange(4)"
                  maxlength="1"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <button class="o-btn" value="submit">
        Verify
      </button>
    </Modal>
  );
};

export default EmailOtpVerify;
