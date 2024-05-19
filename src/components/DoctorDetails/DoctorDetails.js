import React, { createRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./DoctorDetails.css";
import CreatableSelect from "react-select/creatable";
import specialitiesData from "../../assets/data/specialities.json";
import { getDoctor, updateDoctor } from "../../api/doctor";

const DoctorDetails = () => {
	const imageRef = createRef();
	const [doctorDetails, setDoctorDetails] = useState({});
	const [image, setImage] = useState(null);

	useEffect(() => {
		getDoctor()
			.then((res) => {
				console.log("DoctorDetails", res.data);
				setDoctorDetails(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const [isEditEnabled, setIsEditEnabled] = useState(false);

	function onChangeInput(e) {
		const name = e.target.name;
		if (name === "image") {
			setImage(e.target.files[0]);
		} else {
			const value = e.target.value;
			setDoctorDetails((prev) => {
				return {
					...(prev != null ? prev : doctorDetails),
					[name]: value,
				};
			});
		}
	}

	useEffect(() => {
		console.log("Updated Doctor Details", doctorDetails);
	}, [doctorDetails]);

	function onClickUploadPic(e) {
		e.preventDefault();
		imageRef.current.click();
	}

	function onClickDeletePic(e) {
		e.preventDefault();
		setImage(null);
	}

	function onClickEdit() {
		const { _id, registrationNumber, phone, email, experience, __v, ...data } =
			doctorDetails;

		if (isEditEnabled === true) {
			// update doctor details
			console.log("update doctor details");

			let b64 = null;
			if (image) {
				const reader = new FileReader();
				reader.readAsDataURL(image);
				reader.onload = function () {
					b64 = reader.result;
					console.log("b64", b64);
					update(b64);
				};
				reader.onerror = function (error) {
					console.log("Error: ", error);
				};
			} else {
				update(b64);
			}

			function update(b64) {
				if (image == null) {
					delete data.image;
				}

				updateDoctor({
					...data,
					totalExperience: experience,
					...(b64 && { image: b64.split(",")[1] }),
				})
					.then((res) => {
						console.log("updateDoctor", res);
						toast.success(res?.message);
					})
					.catch((err) => {
						console.log(err);
						toast.error(err);
					});
			}
		}
		setIsEditEnabled((prev) => !prev);
	}

	return (
		<div className="d-flex">
			<div className="doctor_details_wrapper">
				<div>
					<form
						className="doctor_image_box"
						encType="multipart/form-data"
						name="image"
					>
						<div className="wrapper">
							<div className="file-upload">
								<input
									name="image"
									type="file"
									ref={imageRef}
									onChange={onChangeInput}
								/>
								{doctorDetails?.image ? (
									<img
										src={
											image
												? URL.createObjectURL(image)
												: doctorDetails?.image?.fileUrl
										}
										alt="doctor profile"
									/>
								) : (
									<svg
										className="upload_svg"
										width="50"
										height="30"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
										/>
									</svg>
								)}
							</div>
						</div>

						{isEditEnabled && (
							<>
								<div className="doctor_image_content">
									<p>Upload an image from your computer</p>
									<p>Minimum size 100 x 100 px</p>
									<div
										style={{
											display: "flex",
											margin: "auto",
											justifyContent: "center",
										}}
									>
										<div
											style={{
												position: "relative",
												overflow: "hidden",
												display: "inline-block",
											}}
										>
											<button
												className={
													true
														? "image_upload_cta loader_true "
														: "image_upload_cta"
												}
												onClick={onClickUploadPic}
											>
												Upload
											</button>
										</div>

										<button
											className="image_delete_cta"
											onClick={onClickDeletePic}
										>
											Delete
										</button>
									</div>
								</div>
							</>
						)}
					</form>
				</div>
				<div className="doctor_details_content">
					<div className="doctor_column1">
						<h6>Name:</h6>
						{isEditEnabled ? (
							<input
								className="doctor_name"
								name="name"
								type="text"
								placeholder="Enter your Name"
								value={doctorDetails?.name}
								onChange={onChangeInput}
							/>
						) : (
							<span>{doctorDetails?.name}</span>
						)}
						<h6>Phone:</h6>
						<span>{doctorDetails?.phone}</span>
						<h6>Email Id:</h6>
						<span>{doctorDetails?.email ?? "-"}</span>
						<h6>Total Experience:</h6>
						{isEditEnabled ? (
							<input
								className="doctor_name"
								name="experience"
								type="text"
								placeholder="Enter your Experience"
								value={
									doctorDetails?.totalExperience ?? doctorDetails?.experience
								}
								onChange={onChangeInput}
							/>
						) : (
							<span>
								{doctorDetails?.totalExperience ??
									doctorDetails?.experience ??
									"-"}
							</span>
						)}
					</div>
				</div>
			</div>
			<div className="docter_details_information">
				<div className="doctor_column2">
					<h6>Add Specialities*</h6>
					{isEditEnabled ? (
						<CreatableSelect
							isClearable
							isMulti
							options={(specialitiesData || []).map((item) => ({
								label: item,
								value: item,
							}))}
							onChange={(event) => {
								setDoctorDetails((prev) => {
									return {
										...prev,
										specialities: event.map((item) => item.value),
									};
								});
							}}
							placeholder="Type to Major Specialities"
							value={
								doctorDetails?.specialities?.length > 0
									? doctorDetails?.specialities?.map((item) => ({
											label: item,
											value: item,
									  }))
									: []
							}
						/>
					) : (
						<span>
							{doctorDetails?.specialities?.length > 0
								? doctorDetails?.specialities?.join(", ")
								: ""}
						</span>
					)}

					<h6>Add Bio*</h6>
					{isEditEnabled ? (
						<textarea
							className="doctor_bio"
							name="bio"
							type="text"
							placeholder="Enter your Bio"
							value={doctorDetails?.bio}
							onChange={onChangeInput}
						></textarea>
					) : (
						<span>{doctorDetails?.bio}</span>
					)}

					<h6>Education & Training</h6>
					{isEditEnabled ? (
						<input
							className="doctor_education"
							name="education"
							type="text"
							placeholder="Enter your Education"
							value={doctorDetails?.education}
							onChange={onChangeInput}
						></input>
					) : (
						<span>{doctorDetails?.education}</span>
					)}
				</div>
				<div
					className={`${
						isEditEnabled ? "details_save_cta" : "details_edit_cta"
					} d-flex justify-content-end align-items-end`}
				>
					<button onClick={onClickEdit}>
						{isEditEnabled ? "Save" : "Edit"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DoctorDetails;
