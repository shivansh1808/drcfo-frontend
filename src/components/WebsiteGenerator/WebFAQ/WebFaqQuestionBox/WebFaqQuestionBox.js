import React from "react";
import WebGeneratorInput from "../../components/WebGeneratorInput/WebGeneratorInput";

const WebFaqQuestionBox = ({ QuesCount, setFormData }) => {
  function onChangeInput(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="w-100">
      <WebGeneratorInput
        title={`Question`}
        subtitle={""}
        placeholderText={"Enter the question"}
        onChange={(e) => onChangeInput("question", e.target.value)}
      />
      <WebGeneratorInput
        title={`Answer`}
        subtitle={""}
        placeholderText={"Enter the answer"}
        onChange={(e) => onChangeInput("answer", e.target.value)}
      />
    </div>
  );
};

export default WebFaqQuestionBox;
