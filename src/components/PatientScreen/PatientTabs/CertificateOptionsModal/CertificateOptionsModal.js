import React, { useState } from "react";
import Modal from "react-modal";
import MedicalHistoryForm2 from "../MedicalHistoryForm/MedicalHistoryForm2";
import "./CertificateOptionsModal.css";
import MedicalHistoryForm3 from "../MedicalHistoryForm/MedicalHistoryForm3";
const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		background: "#F6F6F7",
		borderRadius: "10px",
		width: "35vw",
	},
	overlay: { zIndex: 1000 },
};

const CertificateOptionsModal = ({ open, setOpen, appointment }) => {
	const [modalopen1, setmodalOpen1] = useState(false);
	const [modalopen2, setmodalOpen2] = useState(false);
	const [modalopen3, setmodalOpen3] = useState(false);
	const [certificates, setCertificates] = useState(
		appointment?.certificates ?? {}
	);

	return (
		<Modal
			isOpen={open}
			onRequestClose={() => setOpen(false)}
			style={customStyles}
		>
			<div className="CertificateOptionsModal">
				<h1>Select the form to generate Medical Certificate</h1>
				<div
					className="CertificateOptionsCard"
					onClick={() => setmodalOpen1(true)}
				>
					<p>For leave or extension of leave or comumunications of leave</p>
					<svg width="9" height="16" viewBox="0 0 9 16" fill="none">
						<path
							d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L6.58579 8L0.928932 13.6569C0.538408 14.0474 0.538408 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM6 9H8V7H6V9Z"
							fill="#4C4C4C"
						/>
					</svg>
				</div>
				<MedicalHistoryForm2
					appointment={appointment}
					setOpen={setmodalOpen1}
					open={modalopen1}
					title="MEDICAL CERTIFICATE FOR LEAVE OR EXTENTION OF LEAVE OR COMMUTATION OF LEAVE"
					thumbTitle="Authorized Medical Attendant Hospital/Dispensary Or other Registered Medical Practitioner"
					type="leaveMedicalAttendant"
					certificates={certificates}
					setCertificates={setCertificates}
				/>
				<div
					className="CertificateOptionsCard"
					onClick={() => setmodalOpen2(true)}
				>
					<p>
						For gazetted officers recommended leave or extension of <br /> leave
						or commutation of leave
					</p>
					<svg width="9" height="16" viewBox="0 0 9 16" fill="none">
						<path
							d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L6.58579 8L0.928932 13.6569C0.538408 14.0474 0.538408 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM6 9H8V7H6V9Z"
							fill="#4C4C4C"
						/>
					</svg>
				</div>
				<MedicalHistoryForm2
					appointment={appointment}
					setOpen={setmodalOpen2}
					open={modalopen2}
					title="MEDICAL CERTIFICATE FOR GAZETTED OFFICERS RECOMMENDED LEAVE OR EXTENTION OF LEAVE OR COMMUTATION OF LEAVE"
					thumbTitle="Civil Surgeon/Staff Surgeon Authorized Medical Attendant Hospital/Dispensary"
					type="leaveGazettedOfficer"
					certificates={certificates}
					setCertificates={setCertificates}
				/>
				<div
					className="CertificateOptionsCard"
					onClick={() => setmodalOpen3(true)}
				>
					<p>Of fitness to retun to duty</p>
					<svg width="9" height="16" viewBox="0 0 9 16" fill="none">
						<path
							d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L6.58579 8L0.928932 13.6569C0.538408 14.0474 0.538408 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM6 9H8V7H6V9Z"
							fill="#4C4C4C"
						/>
					</svg>
				</div>
				<MedicalHistoryForm3
					appointment={appointment}
					setmodalOpen3={setmodalOpen3}
					modalopen3={modalopen3}
					type="fitness"
					certificates={certificates}
					setCertificates={setCertificates}
				/>
			</div>
		</Modal>
	);
};

export default CertificateOptionsModal;
