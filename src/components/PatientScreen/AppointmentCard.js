import React, { useEffect, useState } from "react";
import "./AppointmentCard.css";
import calender from "../../assets/images/Calendar.png";
import time from "../../assets/images/Clock.png";
import moment from "moment";
import { calculateAge } from "../../util";
import { appointmentStatus } from "../../util/constants";
import { useNavigate } from "react-router-dom";
import InvoiceModal from "./InvoiceModal/InvoiceModal";
import CertificateOptionsModal from "./PatientTabs/CertificateOptionsModal/CertificateOptionsModal";
import { COMPLETED, CONFIRMED, NO_SHOW } from "./PatientTabs/constants";

// NOTES:
// pending: Booking details, walk-in

const AppointmentCard = ({ appointment, type }) => {
	const navigate = useNavigate();
	// console.log(appointment);
	const isNew = moment(appointment?.createdAt).isSame(moment(), "day");
	const [isOpen, setIsOpen] = useState(false);
	const [isInvoiceOpen, setInvoiceModalOpen] = useState(false);
	const [data, setData] = useState({});

	function handleAppointment() {
		setData({
			patientName:
				appointment?.patient?.name || appointment?.unregisteredPatient?.name,
			patientGender:
				appointment?.unregisteredPatient?.gender ||
				appointment?.patient?.gender,
			patientAge: calculateAge(
				appointment?.unregisteredPatient?.dateOfBirth ||
					appointment?.patient?.dateOfBirth
			),
			patientPhone:
				appointment?.unregisteredPatient?.phone || appointment?.patient?.phone,
			patientEmail:
				appointment?.unregisteredPatient?.email || appointment?.patient?.email,
			appointmentStartTime: appointment?.time?.startTime,
			appointmentDate: moment(appointment?.date).format("MMM DD, yyyy"),
			appointmentStatus: appointment.status,
			appointmentFees: appointment?.fees,
			appoitmentSlot: `${moment(appointment?.time?.startTime, "HH:mm")?.format(
				"hh:mm A"
			)}${
				appointment?.time?.endTime
					? " - " +
					  moment(appointment?.time?.endTime, "HH:mm")?.format("hh:mm A")
					: ""
			}`,
		});
	}

	useEffect(() => {
		handleAppointment();
	}, [appointment]);

	return (
		<div className="appointment_card">
			{/* {isNew && <div className="appointment_new_label">New</div>} */}
			<div className="appointment_card_header">
				<div>
					<h1 className="appointment_card_name">{data?.patientName}</h1>
					<h2 className="appointmnet_type_label">
						{appointment?.parent != null
							? "Follow-up"
							: appointment?.patient == null
							? "Walk-in"
							: "MHV"}
					</h2>
				</div>
				<div className="appointment_card_details">
					<h4>
						Gender:{" "}
						<span className="appointment_card_details_value">
							{data?.patientGender}
						</span>
					</h4>
					<h4>
						Age:{" "}
						<span className="appointment_card_details_value">
							{data?.patientAge}
						</span>
					</h4>
					<h4>
						Phone:{" "}
						<span className="appointment_card_details_phone_value">
							{data?.patientPhone}
						</span>
					</h4>
				</div>
			</div>

			<div className="appointment_confirmed_booking_details">
				<div className="myappointment--card--detials--content">
					<h2>Booking: Date & Time</h2>
					<div className="myappointment--card--detials--content--time">
						<img
							style={{ height: "fit-content", marginRight: "0.5vw" }}
							src={calender}
							alt="calender"
						/>
						On {data?.appointmentDate}
					</div>
					<div className="myappointment--card--detials--content--time">
						<img
							style={{ height: "fit-content", marginRight: "0.5vw" }}
							src={time}
							alt="time"
						/>
						{data?.appoitmentSlot}
					</div>
				</div>

				{type === COMPLETED && (
					<>
						<button
							className="general_Meical_certificate_cta"
							onClick={() => setIsOpen(true)}
						>
							Generate Medical Certificate
						</button>

						<CertificateOptionsModal
							open={isOpen}
							setOpen={setIsOpen}
							appointment={appointment}
						/>
					</>
				)}
			</div>
			{type != NO_SHOW && (
				<div className="appointment_card_buttons">
					{data?.appointmentStatus === appointmentStatus.completed &&
						type === COMPLETED && (
							<>
								<button
									className="appointment_card_prescription_cta"
									onClick={() =>
										navigate("/prescriptionpdf/" + appointment?._id)
									}
								>
									View Prescription
								</button>
								<button
									className="appointment_card_medical_history_cta"
									onClick={() => setInvoiceModalOpen(true)}
								>
									Booking Details
								</button>
								<InvoiceModal
									isInvoiceOpen={isInvoiceOpen}
									setInvoiceModalOpen={setInvoiceModalOpen}
									appointment={appointment}
									data={data}
								/>
							</>
						)}
					{type === CONFIRMED && (
						<>
							<button
								className="appointments--card--button accept"
								onClick={() => navigate(`/prescription/${appointment._id}`)}
							>
								Diagnose
							</button>
							<InvoiceModal
								appointment={appointment}
								data={data}
								setInvoiceModalOpen={setInvoiceModalOpen}
								isInvoiceOpen={isInvoiceOpen}
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default AppointmentCard;
