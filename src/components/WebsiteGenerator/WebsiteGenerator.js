import React, { useEffect, useState } from "react";
import "./WebsiteGenerator.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

// Components from Material UI
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

// Components
import WebProfile from "./WebProfile/WebProfile";
import WebTreatment from "./WebTreatment/WebTreatment";
import WebClinic from "./WebClinic/WebClinic";
import WebTestimonial from "./WebTestimonial/WebTestimonial";
import WebFAQ from "./WebFAQ/WebFAQ";
import WebBlogs from "./WebBlogs/WebBlogs";
import WebContacts from "./WebContacts/WebContacts";
import { getWebgenDashboard } from "../../api/WebGenerator";

const steps = [
	"Personal Details",
	"Treatment",
	"Clinic",
	"Testimonials",
	"FAQ",
	"Blog",
	"Contact Details",
];

const WebsiteGenerator = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [webData, setWebData] = useState({});
	const [activeStep, setActiveStep] = useState(
		parseInt(location.state?.step || 0)
	);

	useEffect(() => {
		getLastStepOfUserInOnBoarding();
	}, []);

	async function getLastStepOfUserInOnBoarding() {
		const data = await getWebgenDashboard();
		console.log("data", data);
		setWebData(data?.data);
		if (data?.data?.personalInfo == null) {
			setActiveStep(0);
		} else if (
			data?.data?.treatments?.length == 0 &&
			data?.data?.clinics?.length == 0
		) {
			setActiveStep(1);
		} else if (
			data?.data?.clinics?.length == 0 &&
			data?.data?.testimonials?.length == 0
		) {
			setActiveStep(2);
		} else if (
			data?.data?.testimonials?.length == 0 &&
			data?.data?.qnas?.length == 0
		) {
			setActiveStep(3);
		} else if (data?.data?.qnas?.length == 0 && data?.data?.blog?.length == 0) {
			setActiveStep(4);
		} else if (data?.data?.blog?.length == 0 && data?.data?.contact == null) {
			setActiveStep(5);
		} else if (data?.data?.contact == null) {
			setActiveStep(6);
		} else {
			// navigate("/dashboard/getStarted");
			setActiveStep(2);
		}
	}

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <WebProfile setActiveStep={setActiveStep} />;
			case 1:
				return <WebTreatment setActiveStep={setActiveStep} />;
			case 2:
				return (
					<WebClinic setActiveStep={setActiveStep} clinics={webData.clinics} />
				);
			case 3:
				return <WebTestimonial setActiveStep={setActiveStep} />;
			case 4:
				return <WebFAQ setActiveStep={setActiveStep} />;
			case 5:
				return <WebBlogs setActiveStep={setActiveStep} />;
			case 6:
				return <WebContacts setActiveStep={setActiveStep} />;
			default:
				return "Page Not Available";
		}
	}

	return (
		<div className="WebsiteGenerator_screen">
			<h1 className="webScreen_header">Setting up your website</h1>
			<Box>
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				{activeStep === steps.length ? (
					<>
						<Navigate to="/dashboard" />
					</>
				) : (
					<>{getStepContent(activeStep)}</>
				)}
			</Box>
		</div>
	);
};

export default WebsiteGenerator;
