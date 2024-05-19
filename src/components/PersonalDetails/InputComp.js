import React from "react";
import "./InputComp.css";

const InputComp = ({ title, placeholderText }) => {
  return (
    <div>
      <div className="details_input_title">{title}</div>
      <input
        className="details_input"
        placeholder={placeholderText}
        required
      ></input>
    </div>
  );
};

export default InputComp;
