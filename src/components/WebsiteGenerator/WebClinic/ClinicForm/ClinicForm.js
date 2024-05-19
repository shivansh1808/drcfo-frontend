import React from "react";
import { blobToBase64 } from "../../../../util";
import WebGeneratorInput from "../../components/WebGeneratorInput/WebGeneratorInput";
import AppointmentCard from "../../../ClinicStepper/AppointmentCard";
import WebClinicAvailability from "../WebClinicAvailability/WebClinicAvailability";

function ClinicForm({ clinic, updateClinics, setPageName }) {
	const [localClinic, setLocalClinic] = React.useState(clinic);
	const [currentTab, setCurrentTab] = React.useState("details"); // details, availability
	const [loading, setLoading] = React.useState(false);

	const [editAvailabilityIndex, setEditAvailabilityIndex] = React.useState(-1);

	React.useEffect(() => {
		console.log("Local Clinic form", localClinic);
	}, []);

	const onSubmit = () => {
		updateClinics(localClinic);
	};

	const onChangeInput = (name, value) => {
		setLocalClinic({
			...localClinic,
			[name]: value,
		});
	};

	const onChangeAddress = (name, value) => {
		setLocalClinic({
			...localClinic,
			address: {
				...(localClinic?.address ?? {}),
				[name]: value,
			},
		});
	};

	const onContinue = (e) => {
		e && e?.preventDefault();

		console.log("localClinic", localClinic);

		updateClinics(localClinic);

		setCurrentTab("availability");
	};

	const onAddBtnClickClinic = (e) => {
		e.preventDefault();

		console.log("localClinic", localClinic);

		localClinic["availabilities"] = [
			...(localClinic["availabilities"] ?? []),
			{
				days: [],
				startTime: "",
				endTime: "",
				maxAppointments: 0,
			},
		];
	};

	return (
		<div>
			<div className="patients_tab_header ms-3">
				<button
					className={
						currentTab === "details"
							? "WebClinic_tabs WebClinic_active-tabs"
							: "WebClinic_tabs"
					}
					onClick={() => setCurrentTab("details")}
				>
					Details
				</button>
				<button
					className={
						currentTab === "availability"
							? "WebClinic_tabs WebClinic_active-tabs"
							: "WebClinic_tabs"
					}
					onClick={() => setCurrentTab("availability")}
				>
					Availability
				</button>
			</div>

			{/* Clinic Details Tab */}
			<div
				className={
					currentTab === "details"
						? "WebClinic_content_tab  WebClinic_active_content"
						: "WebClinic_content_tab"
				}
			>
				<div className="web_clinic_tab_body">
					<div className="web_clinic_tab_content">
						<h1 className="web_profile_header">
							Fill in the information required below. It will just take few
							minutes.
						</h1>
						<div className="w-100">
							<form>
								<WebGeneratorInput
									title={"Name*"}
									subtitle={""}
									placeholderText={"Name of the clinic"}
									onChange={(e) => onChangeInput("name", e.target.value)}
									value={localClinic?.name}
								/>
								<div className="WebTreatment_image_uploader_box">
									<span className="WebgeneratorInput_label">
										Upload Picture
									</span>
									<input
										type="file"
										id="actual-btn"
										hidden
										onChange={async (e) =>
											onChangeInput(
												"picture",
												await blobToBase64(e.target.files[0])
											)
										}
									/>
									<label htmlFor="actual-btn">
										<svg width="35" height="35" viewBox="0 0 44 44" fill="none">
											<rect width="44" height="44" fill="url(#pattern0)" />
											<defs>
												<pattern
													id="pattern0"
													patternContentUnits="objectBoundingBox"
													width="1"
													height="1"
												>
													<use
														xlinkHref="#image0_338_576"
														transform="scale(0.0111111)"
													/>
												</pattern>
												<image
													id="image0_338_576"
													width="90"
													height="90"
													xlinkHref={
														localClinic?.picture
															? localClinic?.picture?.fileUrl
															: null
													}
												/>
											</defs>
										</svg>
									</label>
									{!localClinic?.picture && (
										<span id="file-chosen">No file Chosen</span>
									)}
								</div>
								<WebGeneratorInput
									title={"House/Street/Gali Number*"}
									subtitle={""}
									placeholderText={"Enter your House/Street/Gali Number"}
									onChange={(e) => onChangeAddress("street", e.target.value)}
									value={localClinic?.address.street}
								/>
								<WebGeneratorInput
									title={"Sec/Area/Locality*"}
									subtitle={""}
									placeholderText={"Enter your Sec/Area/Locality"}
									onChange={(e) => onChangeAddress("area", e.target.value)}
									value={localClinic?.address.area}
									required
								/>
								<WebGeneratorInput
									title={"City*"}
									subtitle={""}
									placeholderText={"Enter your City"}
									onChange={(e) => onChangeAddress("city", e.target.value)}
									value={localClinic?.address.city}
								/>
								<WebGeneratorInput
									title={"Pin Code*"}
									subtitle={""}
									type={"text"}
									min={"6"}
									placeholderText={"Enter the Pin code"}
									onChange={(e) => onChangeAddress("pincode", e.target.value)}
									value={localClinic?.address.pincode}
								/>
								<WebGeneratorInput
									title={"State*"}
									subtitle={""}
									placeholderText={"Enter your State"}
									onChange={(e) => onChangeAddress("state", e.target.value)}
									value={localClinic?.address.state}
								/>
								<WebGeneratorInput
									title={"Consultation Fees*"}
									subtitle={""}
									type={"number"}
									max={"6"}
									placeholderText={"Enter the Consultation fees"}
									onChange={(e) => onChangeInput("fees", e.target.value)}
									value={localClinic?.fees}
								/>

								<div className="save_next_cta">
									<button onClick={onContinue}>Continue</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* Availability Tab */}
			<div
				className={
					currentTab === "availability"
						? "WebClinic_content_tab  WebClinic_active_content"
						: "WebClinic_content_tab"
				}
			>
				<div>
					<div className="d-flex flex-wrap my-4">
						{localClinic?.availabilities &&
							localClinic?.availabilities?.length > 0 &&
							localClinic?.availabilities?.map((item, id) => (
								<AppointmentCard
									key={id}
									item={item}
									setEditAvailabilityIndex={() => setEditAvailabilityIndex(id)}
									deleteAvailability={() => {
										if (localClinic.availabilities.length === 1) {
											return;
										}
										setLocalClinic({
											...localClinic,
											availabilities: localClinic.availabilities.filter(
												(item, index) => index !== id
											),
										});
									}}
								/>
							))}
					</div>
					<div>
						{editAvailabilityIndex != -1 && (
							<WebClinicAvailability
								availability={
									localClinic?.availabilities[editAvailabilityIndex]
								}
								setAvailability={(availability) => {
									const availabilities = localClinic.availabilities;
									availabilities[editAvailabilityIndex] = availability;
									setLocalClinic({
										...localClinic,
										availabilities,
									});
								}}
								onNextClick={() => {
									onSubmit();
									setPageName(1);
								}}
								loading={loading}
								addmoreAvaiability={onAddBtnClickClinic}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ClinicForm;
