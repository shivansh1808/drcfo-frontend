import React, { useState } from "react";
import "./Authentication.css";
import banner from "../../assets/images/banner.png";
import logo from "../../assets/images/brand_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import timer from "../../assets/images/Future (1).png";
import {
  sendEmailOTP,
  sendMobileOTP,
  verifyEmailOTP,
  verifyMobileOTP,
} from "../../api/auth";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import useAppContext from "../context/AppContext";

/**
 * NOTES:
 * Medical Registration Number is not getting checked
 */

export const initialState = {
  otp: new Array(6).fill(""),
};

const Authentication = () => {
  const navigate = useNavigate();
  const { verifyMobilOtpWithBackend } = useAuth();
  const { setSnackbar } = useAppContext();

  const [formStatus, setFormStatus] = useState("mobile_form");
  const [otp, setOtp] = useState(initialState.otp);
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mrn, setMrn] = useState(""); // Medical Registration Number
  const [loading, setLoading] = useState(false);
  const [reSentMobileOtp, setReSentMobileOtp] = useState(false);
  const [reSentEmailOtp, setReSentEmailOtp] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  function openErrorSnackBar(message = "Something went wrong!") {
    setSnackbar({
      open: true,
      severity: "error",
      message: message,
    });
  }

  async function onClickSignUp() {
    if (reSentMobileOtp) {
      openErrorSnackBar("Try again after sometime");
      return;
    }
    setLoading(true);
    const responseData = await sendMobileOTP(mobileNumber);
    if (responseData) {
      setFormStatus("otp");
    } else {
      openErrorSnackBar("Could not send OTP!");
    }
    setLoading(false);
  }

  async function onClickReSendMobileOTP() {
    setReSentMobileOtp(true);
    await onClickSignUp();
  }

  function onClickEditMobileNumber() {
    setReSentMobileOtp(false);
    setFormStatus("mobile_form");
  }

  async function onClickVerifyOTP() {
    setLoading(true);
    const OTP = otp?.join("");
    const responseData = await verifyMobilOtpWithBackend(mobileNumber, OTP);
    if (responseData) {
      setOtp(initialState.otp);
      setFormStatus("email_form");
    } else {
      openErrorSnackBar("Could not verify OTP!");
    }
    setLoading(false);
  }

  async function onClickSendEmailOTP() {
    if (reSentEmailOtp) {
      openErrorSnackBar("Try again after sometime");
      return;
    }
    setLoading(true);
    const responseData = await sendEmailOTP(email);
    if (responseData) {
      setFormStatus("email_otp");
    } else {
      openErrorSnackBar("Could not send OTP!");
    }
    setLoading(false);
  }

  async function onClickReSendEmailOTP() {
    setReSentEmailOtp(true);
    await onClickSendEmailOTP();
  }

  function onClickEditEmail() {
    setReSentEmailOtp(false);
    setFormStatus("email_form");
  }

  async function onClickVerifyEmailOTP() {
    setLoading(true);
    const OTP = otp?.join("");
    const responseData = await verifyEmailOTP(OTP);
    if (responseData) {
      setOtp(initialState.otp);
      setFormStatus("medical_registration");
    } else {
      openErrorSnackBar("Could not verify OTP!");
    }
    setLoading(false);
  }

  async function onClickSubmit() {
    navigate("/clinicdetails", { state: { registrationNumber: mrn } });
  }

  return (
    <div className="auth_screen">
      <img
        src={logo}
        alt="logo"
        className="auth_form_logo"
        onClick={() => navigate("/")}
      />
      <div className="login_content">
        {/* <div className="login_body"> */}
        <div className="login_left">
          {formStatus === "mobile_form" ? (
            <div className="auth_form">
              <h1>Welcome!</h1>
              <p>Sign up by entering your Mobile Number</p>
              <input
                type="number"
                className="login_number_input"
                placeholder="Enter Phone Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <div>
                <button className="login_btn" onClick={onClickSignUp}>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress
                        sx={{ color: "white" }}
                        size="1.25rem"
                      />
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="login_link">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          ) : formStatus === "otp" ? (
            <div className="auth_form">
              <h1>Welcome!</h1>
              <p>Enter the OTP sent to you on your registered mobile number.</p>
              <div className="auth_change_details">
                <div>
                  <div className="auth_num">+91-{mobileNumber}</div>
                  <div className="d-flex justify">
                    <div className="auth_otp_timer">
                      <img src={timer} alt="timer" />
                      30s
                    </div>
                    <div
                      className={
                        reSentMobileOtp ? "auth_otp_timer" : "auth_resend"
                      }
                      onClick={onClickReSendMobileOTP}
                    >
                      Resend OTP
                    </div>
                  </div>
                </div>

                <div
                  className="auth_change_num"
                  onClick={onClickEditMobileNumber}
                >
                  Edit Phone Number
                </div>
              </div>
              <div className="w-75 otp_box d-flex justify-content-center ms-3">
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
              </div>
              <div className="">
                <button className="login_btn" onClick={onClickVerifyOTP}>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress
                        sx={{ color: "white" }}
                        size="1.25rem"
                      />
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </div>
          ) : formStatus === "email_form" ? (
            <div className="auth_form">
              <h1>Welcome!</h1>
              <p>Just few more steps to go!</p>
              <input
                type="text"
                className="login_number_input"
                placeholder="Enter your Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <button className="login_btn" onClick={onClickSendEmailOTP}>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress
                        sx={{ color: "white" }}
                        size="1.25rem"
                      />
                    </div>
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
            </div>
          ) : formStatus === "email_otp" ? (
            <div className="auth_form">
              <h1>Welcome!</h1>
              <p>Enter the OTP sent to you on your registered Email Id.</p>
              {/* <div className="w-75 d-flex justify-content-between mb-0"> */}
              <div className="auth_change_details">
                <div>
                  <div className="auth_num">{email}</div>
                  <div className="d-flex justify">
                    <div className="auth_otp_timer">
                      <img src={timer} alt="timer" />
                      30s
                    </div>
                    <div
                      className={
                        reSentEmailOtp ? "auth_otp_timer" : "auth_resend"
                      }
                      onClick={onClickReSendEmailOTP}
                    >
                      Resend OTP
                    </div>
                  </div>
                </div>

                <div className="auth_change_num" onClick={onClickEditEmail}>
                  Edit Email ID
                </div>
              </div>
              {/* </div> */}
              <div className="w-75 otp_box d-flex justify-content-center ms-3">
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
              </div>
              <div>
                <button className="login_btn" onClick={onClickVerifyEmailOTP}>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress
                        sx={{ color: "white" }}
                        size="1.25rem"
                      />
                    </div>
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
            </div>
          ) : formStatus === "medical_registration" ? (
            <div className="auth_form">
              <h1>Welcome!</h1>
              <p>Just few more steps to go!</p>
              <input
                type="text"
                className="login_number_input"
                placeholder="Enter your Medical Registration Number"
                value={mrn}
                onChange={(e) => setMrn(e.target.value)}
              />
              <div>
                <button className="login_btn" onClick={onClickSubmit}>
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress
                        sx={{ color: "white" }}
                        size="1.25rem"
                      />
                    </div>
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="login_banner">
          <img src={banner} alt="" />
          <div className="login_desc">
            An integrated platform for virtual medical practice
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Authentication;
