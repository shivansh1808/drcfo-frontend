import React from "react";
import Modal from "react-modal";
import Spinner from "../../../Spinner";
import "./ConfirmationModal.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "30vw",
		padding: "40px 0",
		borderRadius: "20px",
	},
};

const ConfirmationModal = ({
	title,
	modalIsOpen,
	setmodalIsOpen,
	onAccept,
	onReject,
	loading,
}) => {
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={() => setmodalIsOpen(false)}
			style={customStyles}
		>
			<div className="details_add_confimation_box">
				<h1>{title}</h1>
				<div className="d-flex justify-content-evenly align-items-center">
					<button className="details_add_rejected" onClick={onReject}>
						No
					</button>
					<button
						className="details_add_accepted"
						onClick={onAccept}
						style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}
					>
						<span>Yes</span>
						{loading && <Spinner />}
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmationModal;
