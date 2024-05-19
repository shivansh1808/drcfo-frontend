import "./Stats.css";
import patienticon from "../../../assets/images/background/patients.png";
import calendericon from "../../../assets/images/background/calender.png";
import clockicon from "../../../assets/images/background/clock.png";
import revenueicon from "../../../assets/images/background/revenue.png";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { getDoctorStatistics } from "../../../api/doctor";
import { toast } from "react-toastify";

function Stats() {
	const [stats, setStats] = useState({});

	useEffect(() => {
		getDoctorStatistics()
			.then((res) => {
				setStats(res);
			})
			.catch((err) => {
				console.log(err);
				toast.error("Could not get statistics");
			});
	}, []);

	return (
		<div className="stats--container">
			<div className="stat--card card--1">
				<span className="stat--icon--div icon--1">
					<img src={patienticon} alt="icon" className="stat--icon" />
				</span>
				<span className="stat--text">
					<span className="stat--heading">Today's closing</span>
					<span className="stat--value">
						{stats?.todayClosing != null ? (
							stats?.todayClosing
						) : (
							<Skeleton animation="wave" width={120} />
						)}
					</span>
				</span>
			</div>
			<div className="stat--card card--2">
				<span className="stat--icon--div icon--2">
					<img src={revenueicon} alt="icon" className="stat--icon" />
				</span>
				<span className="stat--text">
					<span className="stat--heading">Today's Revenue</span>
					<span className="stat--value">
						{stats?.todayRevenue != null ? (
							<span>&#8377; {stats?.todayRevenue}</span>
						) : (
							<Skeleton animation="wave" width={120} />
						)}
					</span>
				</span>
			</div>
			<div className="stat--card card--3">
				<span className="stat--icon--div icon--3">
					<img src={calendericon} alt="icon" className="stat--icon" />
				</span>
				<span className="stat--text">
					<span className="stat--heading">Monthly Revenue</span>
					<span className="stat--value">
						{/* &#8377; {stats?.revenue?.monthly} */}
						{stats?.thisMonthRevenue != null ? (
							<span>&#8377; {stats?.thisMonthRevenue}</span>
						) : (
							<Skeleton animation="wave" width={120} />
						)}
					</span>
				</span>
			</div>
			<div className="stat--card card--4">
				<span className="stat--icon--div icon--4">
					<img src={clockicon} alt="icon" className="stat--icon" />
				</span>
				<span className="stat--text">
					<span className="stat--heading">Yesterday's No-show</span>
					<span className="stat--value">
						{stats?.yesterdayNoShow != null ? (
							stats?.yesterdayNoShow
						) : (
							<Skeleton animation="wave" width={120} />
						)}
					</span>
				</span>
			</div>
		</div>
	);
}

export default Stats;
