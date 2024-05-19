import React from "react";
import "./WebGeneratorInput.css";
const WebGeneratorInput = ({
	placeholderText = "",
	subtitle = "",
	title = "",
	onChange = () => {},
	type = "text",
	min = 0,
	max = 100,
	value = "",
}) => {
	return (
		<div className="mb-4">
			<div className="WebgeneratorInput_label">
				{title} &nbsp;
				{subtitle !== "" ? <div>({subtitle})</div> : null}
			</div>
			<input
				className="Webgenerator_input"
				placeholder={placeholderText}
				onChange={onChange}
				required
				type={type}
				defaultValue={value}
				minLength={min}
				maxLength={max}
			></input>
		</div>
	);
};

export default WebGeneratorInput;
