import React, { useState } from "react";
import TestimonialQuestionBox from "./TestimonialQuestionBox/TestimonialQuestionBox";
import { AddTestimonialDetails } from "../../../api/WebGenerator";
import useAppContext from "../../context/AppContext";
import Spinner from "../../Spinner";
const WebTestimonial = ({ setActiveStep }) => {
	const [QuesCount, setQuesCount] = useState(0);
	const [formData, setFormData] = useState({});
	const [TestimonialData, setTestimonialData] = useState([{}]);
	const [loading, setLoading] = useState(false);
	const { setSnackbar } = useAppContext();

	const onAddBtnClick = () => {
		setQuesCount(QuesCount + 1);
		TestimonialData.push(formData);
		setTestimonialData([...TestimonialData]);
	};
	const onSubmit = async () => {
		setLoading(true);
		TestimonialData.splice(0, 1);
		const responseData = await AddTestimonialDetails({
			testimonials: TestimonialData,
		});
		if (responseData.status === 200) {
			console.log(responseData);
			setActiveStep(4);
		} else {
			setSnackbar({
				open: true,
				message: "Could not save treatment details",
				severity: "error",
			});
		}
		setLoading(false);
	};
	const onNextClick = () => {
		TestimonialData.push(formData);
		setTestimonialData([...TestimonialData]);
		onSubmit();
	};

	return (
		<div>
			<h1 className="QuestionAnswerBox_header">
				Fill in the information required below. It will just take few minutes.
			</h1>
			<div className="web_generator_container">
				{TestimonialData.length
					? TestimonialData.map((data, id) => (
							<TestimonialQuestionBox
								key={id}
								QuesCount={QuesCount}
								setFormData={setFormData}
							/>
					  ))
					: null}

				<button
					className="addQueston_box_cta"
					onClick={() => {
						onAddBtnClick();
					}}
				>
					Add More
				</button>
			</div>
			<div className="save_next_cta">
				<button
					onClick={() => onNextClick()}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						justifyContent: "center",
					}}
				>
					<span>Save & Next</span>
					{loading && <Spinner />}
				</button>
			</div>
		</div>
	);
};

export default WebTestimonial;
