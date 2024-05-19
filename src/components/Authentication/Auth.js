import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import banner from "../../assets/images/banner.png";
import logo from "../../assets/images/logo.png";
import google from "../../assets/images/g-icon.png";
import timer from "../../assets/images/Future (1).png";

import "./Login.css";
import "./OtpForm.css";
import "../Authentication.css";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { sendMobileOTP } from "../../api/auth";
import useAppContext from "../context/AppContext";

const initialState = {
	otp: new Array(6).fill(""),
};

const Login = () => {
	const navigate = useNavigate();
	const { verifyMobilOtpWithBackend } = useAuth();
	const { setSnackbar } = useAppContext();

	const [otp, setOtp] = useState(new Array(6).fill(""));
	const [error, setError] = useState("");
	const [number, setNumber] = useState("");
	const [result, setResult] = useState("");
	const [status, setStatus] = useState("login");
	const [loader, setLoader] = useState(false);
	const [loading, setLoading] = useState(false);
	const [secs, setSecs] = useState(30);
	const [reSentMobileOtp, setReSentMobileOtp] = useState(false);

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

	// Handle enter key press
	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			onClickLogin();
		}
	};

	// Handle enter key press
	const handleVerifyKeyPress = async (e) => {
		if (e.key === "Enter") {
			// await verifyOtp();
		}
	};

	async function onClickLogin() {
		if (reSentMobileOtp) {
			openErrorSnackBar("Try again after sometime");
			return;
		}
		setLoading(true);
		const responseData = await sendMobileOTP(number);
		if (responseData) {
			setStatus("otp");
		} else {
			openErrorSnackBar("Could not send OTP!");
		}
		setLoading(false);
	}

	async function onClickVerify() {
		setLoading(true);
		const OTP = otp?.join("");
		const responseData = await verifyMobilOtpWithBackend(number, OTP);
		if (responseData && responseData?.type === "LOGIN") {
			navigate("/dashboard");
		} else if (responseData && responseData?.type === "SIGNUP") {
			navigate("/regno");
		} else {
			openErrorSnackBar("Could not verify OTP!");
		}
		setLoading(false);
	}

	function onClickEditMobileNumber() {
		setStatus("login");
		setReSentMobileOtp(false);
		setOtp(initialState.otp);
		document.getElementById("number").focus();
	}

	async function onClickReSendMobileOTP() {
		setReSentMobileOtp(true);
		await onClickLogin();
	}

	useEffect(() => {
		if (status == "otp") {
			let timer = setInterval(() => {
				setSecs(secs - 1);
				if (secs === 0) {
					setSecs(0);
				}
			}, 1000);
			return () => clearInterval(timer);
		}
	});

	return (
		<section className="login_screen">
			<div className="">
				<img
					className="login_logo"
					src={logo}
					alt="logo"
					onClick={() => navigate("/")}
				/>
				<div className="login_content">
					{status === "login" && (
						<>
							{/* <div className="col-md-6 mb-4"> */}
							<div className="login_left">
								<div className="login_form_header">Welcome Back!</div>

								<p className="login_sub_heading">
									Sign In entering the information below
								</p>
								<div>
									<input
										type="text"
										name="number"
										id="number"
										className="number_input"
										placeholder="Enter your Mobile Number or Email ID "
										value={number}
										onChange={(e) => setNumber(e.target.value)}
										onKeyDown={handleKeyPress}
										autoFocus={number ? "autofocus" : "autofocus"}
									/>
									<div id="recaptcha-container" />
									<div className="auth_form">
										<div className="login_btn" onClick={onClickLogin}>
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
												"Log In"
											)}
										</div>
										<p>
											Don't have an account?{" "}
											<Link to="/signup" className="login_link">
												Sign Up
											</Link>
										</p>
									</div>
								</div>
							</div>
							<div className="login_banner ">
								<img src={banner} alt="" />
								<div className="login_desc">
									An integrated platform for virtual medical practice
								</div>
							</div>
						</>
					)}
					{status === "otp" && (
						<>
							<div className="otp_login_left">
								<div className="auth_form">
									<h1>Welcome Back!</h1>
									<p>
										Enter the OTP
										<br />
										<span>
											(OTP has been sent to you both on your registered Mobile
											Number & Email ID)
										</span>
									</p>
									<div>
										<div className="auth_change_details">
											<div>
												<div className="auth_num">+91-{number}</div>
												<div className="d-flex">
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
										<div className="w-100 otp_box">
											{otp.map((data, index) => {
												return (
													<input
														autoFocus={index == 0 ? true : false}
														className="verify_otp"
														type="text"
														name="otp"
														maxLength="1"
														key={index}
														value={data}
														onChange={(e) => handleChange(e.target, index)}
														onFocus={(e) => e.target.select()}
														onKeyDown={handleVerifyKeyPress}
													/>
												);
											})}
										</div>
										<div id="recaptcha-container" />
										<div className="">
											<button className="login_btn2" onClick={onClickVerify}>
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
													"Verify OTP"
												)}
											</button>
											{/* <h3 className="resend_btn">
												Didn't recieve the OTP?{" "}
												<span
													onClick={resendOTP}
													className={secs === 0 ? "resend active" : "resend"}
												>
													{secs === 0
														? "Resend OTP"
														: `Resend OTP in ${secs} seconds`}
												</span>
											</h3> */}
										</div>
									</div>
								</div>
							</div>
							<div className="login_banner mt-3">
								<img src={banner} alt="" />
								<div className="login_desc">
									An integrated platform for virtual medical practice
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default Login;
