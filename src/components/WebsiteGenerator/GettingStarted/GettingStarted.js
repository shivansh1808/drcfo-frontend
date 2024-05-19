import React from "react";
import { NavLink } from "react-router-dom";
import "./GettingStarted.css";
import doctor from "../../../assets/images/Doctor.svg";
import { useEffect } from "react";
import { getWebgenDashboard } from "../../../api/WebGenerator";
import WebGeneratorDashboard from "../WebGeneratorDashboard/WebGeneratorDashboard";
import { useState } from "react";

const GettingStarted = () => {
	const [openDashBoard, setOpenDashboard] = useState(false);
	const [id, setId] = React.useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setId(JSON.parse(atob(token.split(".")[1]))?.id ?? null);
	}, [id]);

	const onLoad = async () => {
		const responseData = await getWebgenDashboard();
		console.log(responseData.success && responseData?.data?.contact != null);
		if (responseData.success && responseData?.data?.contact != null) {
			setOpenDashboard(true);
		} else {
			setOpenDashboard(false);
		}
	};
	useEffect(() => {
		onLoad();
	}, []);

	return (
		<>
			{openDashBoard ? (
				<WebGeneratorDashboard />
			) : (
				<div className="web_dash">
					<div className="web_dash_head">
						<div className="web_dash_title">
							Take your Medical Business to next level by building your Personal
							Doctor Website in Minutes{" "}
						</div>
						<div className="web_dash_desc">
							Publish your personal branded website in 2 minutes.{" "}
						</div>
						<div className="web_dash_features">
							Features
							<div className="web_dash_feature_list">
								<div>Feature 1</div>
								<div>Feature 2</div>
								<div>Feature 3</div>
								<div>Feature 4</div>
							</div>
						</div>
						<div className="web_dash_footer">
							<div className="web_dash_footer_head">
								Build your website Now!
							</div>
							<NavLink to="/dashboard/web">
								<div className="web_dash_footer_btn">Get Started</div>
							</NavLink>
						</div>
					</div>
					<div className="web_dash_banner">
						<img src={doctor} alt="doctor_image" />
					</div>
				</div>
			)}
		</>
	);
};

export default GettingStarted;
