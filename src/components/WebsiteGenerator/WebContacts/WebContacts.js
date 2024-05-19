import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WebGeneratorInput from "../components/WebGeneratorInput/WebGeneratorInput";
import { AddContactdetails } from "../../../api/WebGenerator";
import useAppContext from "../../context/AppContext";
import Spinner from "../../Spinner";
const WebContacts = ({ setActiveStep }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const { setSnackbar } = useAppContext();
	const [loading, setLoading] = useState(false);

	const contactInfo = {
		email: formData.email,
		number: {
			mobile: formData.mobileNumber,
			whatsapp: formData.whatsappNumber,
		},
		url: {
			linkedin: formData.linkedin,
			facebook: formData.facebook,
			twitter: formData.twitter,
			instagram: formData.instagram,
		},
	};

	function onChangeInput(name, value) {
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	const onSubmit = async (e) => {
		setLoading(true);
		e.preventDefault();
		const responseData = await AddContactdetails(contactInfo);
		if (responseData.status === 200) {
			navigate("/dashboard/generatorCompletion");
		} else {
			setSnackbar({
				open: true,
				message: "Could not save contact details",
				severity: "error",
			});
		}
		setLoading(false);
	};

	return (
		<>
			<div className="web_generator_container">
				<h1 className="web_profile_header">
					Fill in the information required below. It will just take few minutes.
				</h1>
				<div className="w-100 mt-4">
					<form>
						<WebGeneratorInput
							title={"Phone Number*"}
							subtitle={""}
							type={"number"}
							placeholderText={"Enter the Phone Number"}
							required={true}
							onChange={(e) => onChangeInput("mobileNumber", e.target.value)}
						/>
						<WebGeneratorInput
							title={"Whatsapp Number*"}
							subtitle={""}
							type={"number"}
							placeholderText={"Enter the Phone Number"}
							onChange={(e) => onChangeInput("whatsappNumber", e.target.value)}
						/>
						<WebGeneratorInput
							title={"Email ID*"}
							subtitle={""}
							type={"email"}
							placeholderText={"Enter the Email ID"}
							onChange={(e) => onChangeInput("email", e.target.value)}
						/>
						<WebGeneratorInput
							title={"Facebook Link"}
							subtitle={""}
							type={"url"}
							placeholderText={"Enter facebook link"}
							onChange={(e) => onChangeInput("facebook", e.target.value)}
						/>
						<WebGeneratorInput
							title={"Instagram Link"}
							subtitle={""}
							type={"url"}
							placeholderText={"Enter Instagram Link"}
							onChange={(e) => onChangeInput("instagram", e.target.value)}
						/>
						<WebGeneratorInput
							title={"Linkedin Link"}
							subtitle={""}
							type={"url"}
							placeholderText={"Enter Linkedin link"}
							onChange={(e) => onChangeInput("linkedin", e.target.value)}
						/>
						<WebGeneratorInput
							title={"Twitter Link"}
							subtitle={""}
							type={"url"}
							placeholderText={"Enter Twitter link"}
							onChange={(e) => onChangeInput("twitter", e.target.value)}
						/>
						<div className="save_next_cta">
							<button
								type="submit"
								onClick={onSubmit}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "10px",
									justifyContent: "center",
								}}
							>
								<span>Finish</span>
								{loading && <Spinner />}
							</button>
						</div>
					</form>
				</div>
			</div>{" "}
		</>
	);
};

export default WebContacts;
