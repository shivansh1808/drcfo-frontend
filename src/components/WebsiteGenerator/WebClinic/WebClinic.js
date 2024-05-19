import React, { useEffect, useState } from "react";
import { webgenAddClinics } from "../../../api/WebGenerator";
import useAppContext from "../../context/AppContext";
import ClinicPreview from "./ClinicPreview/ClinicPreview";
import "./WebClinic.css";
import ClinicForm from "./ClinicForm/ClinicForm";

export const initialClinicState = {
	availabilities: [
		{
			days: [],
			startTime: "",
			endTime: "",
			maxAppointments: 0,
		},
	],
	name: "",
	picture: "",
	fees: "",
	address: {
		area: "",
		street: "",
		city: "",
		state: "",
		pincode: "",
	},
};

const WebClinic = ({ setActiveStep, clinics }) => {
	const [currentTab, setCurrentTab] = useState("details");
	const { setSnackbar } = useAppContext();
	const [pageName, setPageName] = useState(1);
	const [loading, setLoading] = useState(false);
	const [localClinics, setLocalClinics] = useState(
		clinics ?? [initialClinicState]
	);
  const [editableClinicIndex, setEditableClinicIndex] = useState(0);
  
  useEffect(() => {
    console.log("update localClinics", localClinics);
  }, [localClinics])

	const uploadClinics = async () => {
		console.log("localClinics", localClinics);
		setLoading(true);

		// picture?.split(",")[1],

		const response = await webgenAddClinics(localClinics);
		if (response.status === 200) {
			console.log(response?.data);
			setPageName(2);
		} else {
			setSnackbar({
				open: true,
				message: "Could not save clinic details",
				severity: "error",
			});
		}
		setLoading(false);
	};

	return (
		<>
			{pageName == 1 ? (
				<ClinicPreview
					clinics={localClinics}
					setClinics={setLocalClinics}
					setActiveStep={setActiveStep}
					setCurrentTab={setCurrentTab}
					setPageName={setPageName}
					setEditableClinicIndex={setEditableClinicIndex}
					editableClinicIndex={editableClinicIndex}
				/>
			) : pageName == 2 ? (
				<ClinicForm
					clinic={
						editableClinicIndex > -1
							? localClinics[editableClinicIndex]
							: initialClinicState
					}
					updateClinics={(clinic) => {
						if (editableClinicIndex === -1) {
							setLocalClinics([...localClinics, clinic]);
							return;
						}
						const newClinics = [...localClinics];
						newClinics[editableClinicIndex] = clinic;
						setLocalClinics(newClinics);
					}}
					setPageName={setPageName}
				/>
			) : null}
		</>
	);
};

export default WebClinic;
