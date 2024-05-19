import React, { useEffect } from "react";
import { useState } from "react";
import { getArticle } from "../../../../api/WebGenerator";
import useAppContext from "../../../context/AppContext";
import { initialClinicState } from "../WebClinic";
import WebClinicCard from "../WebClinicCard/WebClinicCard";

const ClinicPreview = ({
	setActiveStep,
	setCurrentTab,
	setPageName,
	clinics,
	setClinics,
	editableClinicIndex,
	setEditableClinicIndex,
}) => {
	const { setSnackbar } = useAppContext();

	return (
		<div>
			<h1 className="clinic_preview_header">Preview</h1>
			<div className="d-grid justify-content-center">
				{clinics && clinics.length > 0 && clinics?.length
					? clinics.map((item, id) => <WebClinicCard key={id} item={item} />)
					: null}
			</div>
			<div className="clinic_preview py-4">
				<button
					className="clinic_preview_button1"
					onClick={() => {
						if (clinics.length > 0) {
							setEditableClinicIndex(clinics?.length);
							setClinics((prev) => [...prev, { ...initialClinicState }]);
						} else {
							setClinics((prev) => [...prev, { ...initialClinicState }]);
							setEditableClinicIndex(0);
						}
						setCurrentTab("details");
						setPageName(2);
					}}
				>
					Add More Clinics
				</button>
				<button
					className="clinic_preview_button2"
					onClick={() => setActiveStep(3)}
				>
					Save & Next
				</button>
			</div>
		</div>
	);
};

export default ClinicPreview;
