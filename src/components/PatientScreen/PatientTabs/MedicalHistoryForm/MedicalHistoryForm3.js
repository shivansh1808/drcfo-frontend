import React, { useRef, useState } from "react";
import "./MedicalHistoryForm.css";
import Modal from "react-modal";
import { useEffect } from "react";
import moment from "moment/moment";
import { getDoctor } from "../../../../api/doctor";
import { updateHealthCertificate } from "../../../../api/appointment";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "60vw",
	},
	overlay: { zIndex: 1000 },
};

const MedicalHistoryForm3 = ({
	modalopen3,
	setmodalOpen3,
	appointment,
	certificates,
	setCertificates,
	type,
}) => {
	const [docter, setDocter] = useState({});
	const pdfRef = useRef();

	const onLoad = async () => {
		const doctorData = await getDoctor();
		if (doctorData) {
			setDocter(doctorData.data);
		}
	};

	useEffect(() => {
		onLoad();
	}, []);

	const generatePdf = async () => {
		if (pdfRef?.current == null) return;
		html2canvas(pdfRef.current).then((canvas) => {
			console.log(canvas);
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF();
			pdf.addImage(imgData, "PNG", 0, 0, 260, 245);
			pdf.save("certificate.pdf");
		});
	};

	const onSubmit = async (e, save = false) => {
		e.preventDefault();
		const res = await updateHealthCertificate({
			appointmentId: appointment?._id,
			certificates,
		});
		toast.info(res?.message || "Something went wrong");
		if (res?.data != null && save === true) {
			// download pdf
			generatePdf();
		}
	};

	return (
		<Modal
			isOpen={modalopen3}
			onRequestClose={() => setmodalOpen3(false)}
			style={customStyles}
		>
			<div className="medical_form" ref={pdfRef}>
				<svg
					onClick={() => setmodalOpen3(false)}
					width="30"
					height="30"
					viewBox="0 0 36 36"
					fill="none"
				>
					<path
						d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
						stroke="#232526"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M22.5 13.5L13.5 22.5"
						stroke="#232526"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M13.5 13.5L22.5 22.5"
						stroke="#232526"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>

				<h1>MEDICAL CERTIFICATE OF FITNESS TO RETURN TO DUTY</h1>
				<div>
					<p className="mb-3">
						Signature of the government servant
						<input type="text" className="thumb_impression" />
					</p>
					<div className="patient_description_form">
						I, Dr.{" "}
						<input
							type="text"
							className="patient_description_form_input"
							defaultValue={docter?.name}
							disabled
						/>{" "}
						after careful examination of the case certify hereby that Sh. / Smt.
						/Km.{" "}
						<input
							type="text"
							className="patient_description_form_input"
							defaultValue={
								appointment?.unregisteredPatient?.name ??
								appointment?.patient?.name
							}
							disabled
						/>{" "}
						signature is given above,and find that he/she recovered from his/her
						illness and is now fit to resume duties in Govt. Service. I also
						certify that before arriving at this decision I have examined the
						original medical certificate (s) and statement (s) of the case (or
						certified copies thereof) on which leave was granted or extended and
						have taken these into consideration in arriving at my decision.
					</div>
					<div className="patient_description_form_bottom">
						<p>
							Civil Surgeon/Staff Surgeon Authorized Medical Attendant
							Registered Medical Practitioner
						</p>
					</div>
					<div className="patient_description_form_bottom_date">
						<label htmlFor="Date">Date: </label>
						<input
							type="date"
							name="date"
							className="patient_description_form_input"
							onChange={(e) =>
								setCertificates((prevValues) => ({
									...prevValues,
									[type]: {
										date: e.target.value,
									},
								}))
							}
							value={moment(certificates[type]?.date ?? new Date()).format(
								"YYYY-MM-DD"
							)}
							pattern="\d{1,2}/\d{1,2}/\d{4}"
						/>
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-end patient_description_form_buttons">
				<button className="me-3" onClick={onSubmit}>
					Save
				</button>
				<button onClick={(e) => onSubmit(e, true)}>Save & Print</button>
			</div>
		</Modal>
	);
};

export default MedicalHistoryForm3;
