import React, { useEffect, useState } from "react";
import "./ClinicCard.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "../ClinicStepper/Availability.scss";
import ClinicDeleteModal from "./ClinicDeleteModal";
import useAppContext from "../context/AppContext";
import {
	changeClincStatus,
	deleteClinic,
	updateClinic,
} from "../../api/clinic";
import { clinicStatus } from "../../util/constants";
import { Switch } from "antd";
import { useAuth } from "../context/AuthContext";
import Spinner from "../Spinner";
import { useNavigate } from "react-router";

/**
 * NOTES:
 * clinic.doctor.speciality ???
 */

const ClinicCard = ({ clinic, setDeletedClinicId }) => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { setSnackbar, deviceLocation } = useAppContext();

	const [loadingToggle, setLoadingToggle] = useState(false);
	const [isClinicActive, setIsClinicActive] = useState(clinic.active);
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
	const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
	const [loadindDelete, setLoadingDelete] = useState(false);

	async function onChangeClinicStatus() {
		setLoadingToggle(true);
		const response = await updateClinic(clinic?._id, {
			// active: !isClinicActive,
		});
		if (response?.status === 200) {
			// console.log("onChangeClinicStatus", response.data.data?.active);
			setIsClinicActive(response.data.data?.active);
		} else {
			setSnackbar({
				open: true,
				severity: "error",
				message: response?.data?.message || "Error changing clinic status",
			});
		}
		setLoadingToggle(false);
	}

	function onClickGetDirections() {
		window.open(
			`https://www.google.com/maps/dir/${deviceLocation?.lat},${deviceLocation?.lng}/${clinic?.address?.location?.lat},${clinic?.address?.location?.lng}`,
			"_blank"
		);
	}

	function onClickViewDetails() {
		navigate("/dashboard/tabs", {
			state: { clinic },
		});
	}

	async function handleIsDeleteConfirmed() {
		setLoadingDelete(true);
		if (isDeleteConfirmed) {
			const responseData = await deleteClinic(clinic?._id);
			if (responseData) {
				setDeletedClinicId(clinic?._id);
				setSnackbar({
					open: true,
					severity: "success",
					message: `Successfully deleted clinic ${clinic?.name}`,
				});
			} else {
				setSnackbar({
					open: true,
					severity: "error",
					message: "Error deleting clinic",
				});
			}
		}
		setLoadingDelete(false);
	}

	useEffect(() => {
		handleIsDeleteConfirmed();
	}, [isDeleteConfirmed]);

	return (
		<div className="clinic_box">
			<div className="clinic_box_header">
				<div>
					<h1>{clinic?.name}</h1>
					<p>
						<span>{user?.speciality}</span>
						{user?._id === user?._id && <span>Own Clinic</span>}
					</p>
					<h6>{user?.experience} years experience overall</h6>
				</div>
				<div className="dates_dropdown_container">
					<div className="text-end mb-2">
						<span
							className={isClinicActive ? "clinic_active" : "clinic_not_active"}
						>
							{isClinicActive ? "Active" : "Inactive"}
						</span>
						<Switch
							onChange={onChangeClinicStatus}
							checked={isClinicActive}
							loading={loadingToggle}
							style={{
								backgroundColor: isClinicActive ? "green" : "grey",
								margin: "0 10px",
							}}
						/>
					</div>
				</div>
			</div>
			<div className="clinic_box_details">
				<div className="clinic_box_detail_col_1">
					<h5>Full name</h5>
					<p>{user?.name}</p>
					<h5>Phone Number</h5>
					<p>{user?.phone}</p>
				</div>
				<div>
					<h5>Address</h5>
					<p className="address">
						{clinic?.address?.street}, {clinic?.address?.area},{" "}
						{clinic?.address?.city}, {clinic?.address?.pincode},{" "}
						{clinic?.address?.state}
					</p>
					<div className="address-direction" onClick={onClickGetDirections}>
						Get Directions
					</div>
				</div>
			</div>
			<div className=" d-flex justify-content-end py-2">
				<button
					className="details_delete_cta"
					onClick={() => setIsOpenDeleteModal(true)}
				>
					{loadindDelete ? <Spinner /> : "Delete Clinic"}
				</button>
				<ClinicDeleteModal
					isOpen={isOpenDeleteModal}
					setIsOpen={setIsOpenDeleteModal}
					setIsDeleteConfirmed={setIsDeleteConfirmed}
				/>
				<button className="details_view_cta" onClick={onClickViewDetails}>
					View Details
				</button>
			</div>
		</div>
	);
};

export default ClinicCard;
