import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateRegistrationNumber } from "../../api/doctor";
import banner from "../../assets/images/banner.png";
import logo from "../../assets/images/logo.png";
const RegistraionNumberForm = () => {
	const navigate = useNavigate();
	const [number, setNumber] = React.useState("");

	const submit = () => {
		updateRegistrationNumber(number)
			.then((res) => {
				console.log(res);
				navigate("/dashboard/doctordetails");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<section className="login_screen">
			<div className="">
				<img className="login_logo" src={logo} alt="logo" />
				<div className="login_content">
					<div className="login_left">
						<div className="login_form_header">Welcome!</div>

						<p className="login_sub_heading">
							Sign In entering the information below
						</p>
						<div>
							<input
								type="text"
								name="number"
								id="number"
								className="number_input"
								placeholder="Enter your Medical Registration Number"
								value={number}
								onChange={(e) => setNumber(e.target.value)}
							/>
							<div id="recaptcha-container" />
							<div className="auth_form">
								<div className="login_btn" onClick={submit}>
									Next
								</div>
							</div>
						</div>
					</div>
					<div className="login_banner">
						<img src={banner} alt="" />
						<div className="login_desc">
							An integrated platform for virtual medical practice
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegistraionNumberForm;
