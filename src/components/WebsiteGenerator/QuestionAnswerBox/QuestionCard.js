import React from "react";
import WebGeneratorInput from "../components/WebGeneratorInput/WebGeneratorInput";

const QuestionCard = ({ QuesCount }) => {
  function onChangeInput(name, value) {
    // setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="w-100">
      <WebGeneratorInput
        title={`Question`}
        subtitle={""}
        placeholderText={"Enter the Question"}
        onChange={(e) => onChangeInput("exp", e.target.value)}
      />
      <WebGeneratorInput
        title={`Answer`}
        subtitle={""}
        placeholderText={"Enter the Answer"}
        onChange={(e) => onChangeInput("exp", e.target.value)}
      />
    </div>
  );
};

export default QuestionCard;
