import React from "react";
import WebClinicSlots from "../WebClinicSlots/WebClinicSlots";
import "./WebClinicCard.css";

const WebitemCard = ({ item }) => {
	console.log("WebitemCard", item);

	return (
		<div className="web_clinic_card">
			<div className="web_clinic_card_left">
				<div className="web_clinic_card_left_head">{item?.name}</div>
				<div className="web_clinic_card_left_image">
					<img
						src={item?.picture?.fileUrl}
						alt="Clinic Image"
						height="100%"
						width="100%"
					/>
				</div>
				<div className="web_clinic_card_left_details">
					<div className="web_clinic_card_left_location">
						<div className="web_clinic_card_left_location_head">Location</div>
						<div className="web_clinic_card_left_head_desc">
							{item?.address?.area}
						</div>
					</div>

					<div className="web_clinic_card_left_consultation">
						<div className="web_clinic_card_left_location_head">
							Consultation
						</div>
						<div className="web_clinic_card_left_head_desc">₹ {item?.fees}</div>
					</div>
				</div>
				<div className="treatment_card_options">
					<div className="treatment_card_edit_btn">Edit</div>
					<div className="treatment_card_delete_btn">Delete</div>
				</div>
			</div>
			<div className="web_clinic_card_right">
				<div className="web_clinic_card_right_head">Visiting Hours</div>
				{item?.availabilities?.map((availability, i) => {
					console.log("availability", availability);
					return <WebClinicSlots availability={availability} />;
				})}
			</div>
		</div>
	);
};

export default WebitemCard;
