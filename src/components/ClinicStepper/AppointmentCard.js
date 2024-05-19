import React from "react";
import "./AppointmentCard.css";

const AppointmentCard = ({
	item,
	setEditAvailabilityIndex,
	deleteAvailability,
}) => {
	const handleClick = () => {
		if (setEditAvailabilityIndex != null) setEditAvailabilityIndex();
	};

	const deleteSlot = () => {
		if (deleteAvailability != null) deleteAvailability();
	};

	return (
		<div className="appt_card">
			<div>
				<h6 className="appt_time">
					{item?.startTime} - {item?.endTime}
				</h6>
				<div className="appt_days">
					<ul>
						{item?.days?.map((day, i) => (
							<li key={i}>{day?.substring(0, 3)}</li>
						))}
					</ul>
				</div>
			</div>
			<div>
				<button className="slot_edit_card" onClick={handleClick}>
					Edit
				</button>
				<button className="slot_delete_card" onClick={deleteSlot}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default AppointmentCard;
