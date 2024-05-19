import React, { useRef, useState } from "react";
import "./MedicalHistoryForm.css";
import Modal from "react-modal";
import { useEffect } from "react";
import moment from "moment/moment";
import { getDoctor } from "../../../../api/doctor";
import { updateHealthCertificate } from "../../../../api/appointment";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

const MedicalHistoryForm2 = ({
	open,
	setOpen,
	appointment,
	title,
	thumbTitle,
	type,
	certificates,
	setCertificates,
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
		console.log(type, certificates);
		const res = await updateHealthCertificate({
			appointmentId: appointment?._id,
			certificates,
		});
		console.log(res);
		toast.info(res?.message || "Something went wrong");

		if (res?.data != null && save === true) {
			// download pdf
			generatePdf();
		}
	};

	return (
		<Modal
			isOpen={open}
			onRequestClose={() => setOpen(false)}
			style={customStyles}
		>
			<div className="medical_form" ref={pdfRef}>
				<svg
					onClick={() => setOpen(false)}
					width="30"
					height="30"
					viewBox="0 0 36 36"
					fill="none"
				>
					<path
						d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
						stroke="#232526"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M22.5 13.5L13.5 22.5"
						stroke="#232526"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M13.5 13.5L22.5 22.5"
						stroke="#232526"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<h1>{title}</h1>
				<form>
					<div>
						<p className="mb-3">
							Signature of the government servant
							<input type="text" className="thumb_impression" disabled />
						</p>
						<div className="patient_description_form">
							I, Dr.{" "}
							<input
								type="text"
								className="patient_description_form_input"
								defaultValue={docter?.name}
								disabled
							/>{" "}
							after careful examination of the case certify hereby that Sh. /
							Smt. /Km.{" "}
							<input
								type="text"
								className="patient_description_form_input"
								defaultValue={
									appointment?.unregisteredPatient?.name ??
									appointment?.patient?.name
								}
								disabled
							/>{" "}
							signature is given above, is suffering from{" "}
							<input
								type="text"
								name="disease"
								placeholder="Enter Disease"
								className="patient_description_form_input"
								value={certificates[type]?.disease ?? ""}
								onChange={(e) => {
									setCertificates((prevValues) => ({
										...prevValues,
										[type]: {
											...prevValues[type],
											disease: e.target.value,
										},
									}));
								}}
								required
							/>{" "}
							and I consider that a period of absence from duty of{" "}
							<input
								type="text"
								name="occupation"
								placeholder="Enter Occupation"
								className="patient_description_form_input"
								value={certificates[type]?.occupation ?? ""}
								onChange={(e) =>
									setCertificates((prevValues) => ({
										...prevValues,
										[type]: {
											...prevValues[type],
											occupation: e.target.value,
										},
									}))
								}
								required
							/>{" "}
							with effect from{" "}
							<input
								type="date"
								name="date"
								placeholder="DD/MM/YYYY"
								className="patient_description_form_input"
								required
								value={moment(certificates[type]?.from ?? new Date()).format(
									"YYYY-MM-DD"
								)}
								onChange={(e) =>
									setCertificates((prevValues) => ({
										...prevValues,
										[type]: {
											...prevValues[type],
											from: e.target.value,
										},
									}))
								}
								pattern="\d{1,2}/\d{1,2}/\d{4}"
							/>{" "}
							to is absolutely necessary for the restoration of his/her health.
						</div>
						<div className="patient_description_form_bottom">
							<p>{thumbTitle}</p>
						</div>
						<div className="patient_description_form_bottom_date">
							<label htmlFor="createdOn">Date: </label>
							<input
								type="date"
								defaultValue={certificates[type]?.date ?? new Date()}
								className="patient_description_form_input"
								required
								name="createdOn"
								onChange={(e) =>
									setCertificates((prevValues) => ({
										...prevValues,
										[type]: {
											...prevValues[type],
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
				</form>
			</div>
			<div className="d-flex justify-content-end patient_description_form_buttons">
				<button type="submit" className="me-3" onClick={onSubmit}>
					Save
				</button>
				<button onClick={(e) => onSubmit(e, true)}>Save & Print</button>
			</div>
		</Modal>
	);
};

export default MedicalHistoryForm2;
