import { selectLocalPeerName } from "@100mslive/react-sdk";
import React from "react";
import { useState } from "react";
import calender from "../../assets/images/Calendar.png";
import time from "../../assets/images/Clock.png";
import "./AppointmentCard.css";
import MedicalHistoryForm from "./PatientTabs/MedicalHistoryForm/MedicalHistoryForm";

const AppointmentCompletedCard = ({ item }) => {
	var gsDayNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const datestring = item.appointmentSlot;
	const date = new Date(datestring.slice(0, -1));
	const followDateString = item?.prescription?.followUpdate;
	const followUpdate = new Date(followDateString.slice(0, -1));
	const followDateDay = followUpdate.getDate();
	const followDateYear = followUpdate.getFullYear();
	const followMonth = gsDayNames[followUpdate.getMonth()];
	const displayFollowUpdate =
		followMonth?.substring(0, 3) + " " + followDateDay + ", " + followDateYear;
	var monthName = gsDayNames[date.getMonth()];
	var day = date.getDate();
	if (day < 10) {
		day = "0" + day;
	}
	var year = date.getFullYear();
	const [open, setOpen] = useState(false);
	const displayDate = monthName.substring(0, 3) + " " + day + ", " + year;

	return (
		<div className="appointment_card">
			<div className="appointment_new_label">New</div>
			<div className="appointment_card_header">
				<div>
					<h1 className="appointment_card_name">
						{" "}
						{item.detials?.name ?? "Anonymous"}
					</h1>
					<h2 className="appointmnet_type_label">
						{item.booking ?? "Walk In"}
					</h2>
					<button
						className="general_Meical_certificate_cta"
						onClick={() => setOpen(true)}
					>
						Generate Medical Certificate
					</button>
					<MedicalHistoryForm open={open} setOpen={setOpen} item={item} />
				</div>
				<div className="appointment_card_details">
					<h4>
						Gender:{" "}
						<span className="appointment_card_details_value">
							{item?.detials?.gender ?? "none"}
						</span>
					</h4>
					<h4>
						Age:{" "}
						<span className="appointment_card_details_value">
							{item?.detials?.age ?? "00" < 10
								? `0${item?.detials?.age ?? "0"}`
								: item?.detials?.age ?? "00"}
						</span>
					</h4>
					<h4>
						Phone:{" "}
						<span className="appointment_card_details_phone_value">
							{item?.detials?.phone ?? "000-000-0000"}
						</span>
					</h4>
				</div>
			</div>
			<div className="appointment_booking_details">
				<div className="myappointment--card--detials--content">
					<h2>Booking: Date & Time</h2>
					<div className="myappointment--card--detials--content--time">
						<img
							style={{ height: "fit-content", marginRight: "0.5vw" }}
							src={calender}
							alt="calender"
						/>
						On {monthName.substring(0, 3)} {day >= 10 ? day : `0${day}`}, {year}
					</div>
					<div className="myappointment--card--detials--content--time">
						<img
							style={{ height: "fit-content", marginRight: "0.5vw" }}
							src={time}
							alt="time"
						/>

						{item.slot.time.substring(0, 8)}
					</div>
				</div>
				<div className="myappointment--card--detials--content">
					<h2>Follow up: Date & Time</h2>
					<div className="myappointment--card--detials--content--time">
						<img
							style={{ height: "fit-content", marginRight: "0.5vw" }}
							src={calender}
							alt="calender"
						/>
						On{" "}
						{!item.prescription.followUpdate
							? "No Followup"
							: displayFollowUpdate}
					</div>
					<div className="myappointment--card--detials--content--time">
						<img
							style={{ height: "fit-content", marginRight: "0.5vw" }}
							src={time}
							alt="time"
						/>
						NA
					</div>
				</div>
			</div>
			<div className="appointment_card_buttons">
				<button
					className="appointment_card_prescription_cta"
					onClick={() => {
						console.log({ cardData: item });
					}}
				>
					View Prescription
				</button>
				<button className="appointment_card_medical_history_cta">
					Booking Details
				</button>
			</div>
		</div>
	);
};

export default AppointmentCompletedCard;
