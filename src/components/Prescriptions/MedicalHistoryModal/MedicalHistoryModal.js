import moment from "moment";
import React, { useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import TestReportModal from "../TestReportModal/TestReportModal";
import "./MedicalHistoryModal.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		height: "70vh",
		width: "60vw",
		transform: "translate(-50%, -50%)",
		background: "#F7F8F9",
		borderRadius: " 4px",
		fontSize: "16px",
	},
};

const MedicalHistoryModal = ({ open, setOpen, medicalHistory, patient }) => {
	const navigate = useNavigate();
	const [patientRecords, setPatientRecords] = React.useState([]);
	const [testmodalOpen, setTestModalOpen] = React.useState(true);

	useEffect(() => {
		if (medicalHistory == null || medicalHistory?.length == 0) {
			return;
		}
		let parentAppointments = medicalHistory?.filter(
			(item) => item?.parent == null
		);
		const childrenAppointments = medicalHistory?.filter(
			(item) => item?.parent != null
		);

		if (parentAppointments?.length == 0) {
			setPatientRecords([]);
			return;
		}

		//  go thru each parent and find its children, if any and add them to the parent
		//  doesn't work for now, because child field is not set in some of old appointments
		/*
		parentAppointments.forEach((parent) => {
			let children = [];
			let childId = parent.child;
			console.log("child", childId);
			while (childId) {
				const child = childrenAppointments.find(
					(item) => item?.parent == childId
				);
				if (child) {
					children.push(child);
				} else {
					childId = null;
					parent["children"] = children;
					children = [];
					break;
				}
				if (child.child == null) {
					childId = null;
					parent["children"] = children;
					children = [];
					break;
				}
				childId = child.child;
			}
    });
    */

		//  go thru each child and find its parent, if any and add them to the child
		childrenAppointments.forEach((child) => {
			const parentId = child.parent;
			if (parentId == null) return;
			const parent = parentAppointments.find((item) => item?._id == parentId);
			console.log("parent", parent);
			if (parent) {
				parent["children"] = parent["children"] || [];
				parent["children"].push(child);

				console.log("found parent 1", parent);

				//  update the parentsAppointments array with this updated parent
				parentAppointments.forEach((item, index) => {
					if (item.id == parent.id) {
						console.log("found parent", parent);
						parentAppointments[index] = parent;
					}
				});
			}
		});

		console.log({ parentAppointments, childrenAppointments });
		setPatientRecords(parentAppointments);
	}, [medicalHistory]);

	return (
		<Modal
			isOpen={open}
			style={customStyles}
			contentLabel="Example Modal"
			onRequestClose={() => setOpen(false)}
		>
			<div className="history_modal_header">
				<svg
					width={20}
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					/>
				</svg>
				Medical History
			</div>

			<div className="history_profile">
				<div className="appointment--card--profile me-2">UB</div>
				<p>{patient?.name ?? "unknown"}</p>
				<p>{moment().diff(moment(patient?.dateOfBirth), "years")} years</p>
				<p>
					{patient?.gender?.charAt(0)?.toUpperCase() +
						String(patient?.gender)?.slice(1)?.toLowerCase()}
				</p>
				<p>+91 {patient?.phone}</p>
			</div>
			<ul class="legal_responsive_table">
				<li class="table-header">
					<div class="history_modal_col_1">S. No.</div>
					<div class="history_modal_col_2">Date</div>
					<div class="history_modal_col_3">Treated By</div>
					<div class="history_modal_col_4">Prescription</div>
					<div class="history_modal_col_5">Test Report</div>
				</li>
				{patientRecords?.map((item, index) => {
					return (
						<li class="table-row" key={index}>
							<div class="history_modal_col_1">{index + 1}</div>
							<div class="history_modal_col_2">
								{moment(item?.date).format("DD-MM-YYYY")}
							</div>
							<div class="history_modal_col_3">
								{item?.doctor?.name ?? "-"}{" "}
							</div>
							<div
								class="history_modal_col_4 history_modal_view_cta"
								onClick={() => navigate("/prescriptionpdf/" + item?._id)}
							>
								View
							</div>
							<div
								class="history_modal_col_5 history_modal_view_cta"
								onClick={() => setTestModalOpen(true)}
							>
								Edit
							</div>
							<TestReportModal
								setTestModalOpen={setTestModalOpen}
								testmodalOpen={testmodalOpen}
							/>
						</li>
					);
				})}
			</ul>
		</Modal>
	);
};

export default MedicalHistoryModal;
